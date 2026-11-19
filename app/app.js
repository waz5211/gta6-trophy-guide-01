// Leonida Legend — GTA VI trophy guide & tracker.
// Checklist with localStorage progress, export/import, kind + grade filters, text search,
// a spoiler shield for story trophies, a detail panel with the full cited guide, and a roadmap view.
import { ROADMAP_STAGES, ROADMAP_SOURCE } from './roadmap.js';

const STORAGE_KEY = 'leonida-legend-progress-v1';
const SPOILER_KEY = 'leonida-legend-spoiler-v1';
const rowsEl = document.getElementById('rows');
const detailEl = document.getElementById('detail');
const searchEl = document.getElementById('search');
const kindEl = document.getElementById('kind');
const gradeEl = document.getElementById('grade');
const missableEl = document.getElementById('only-missable');
const spoilerEl = document.getElementById('spoiler');
const hideEarnedEl = document.getElementById('hide-earned');

let earned = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]'));
spoilerEl.checked = (localStorage.getItem(SPOILER_KEY) ?? 'on') === 'on';
let selectedName = null;

const doc = await (await fetch('data/trophies.json')).json();
const trophies = doc.trophies;
const byName = new Map(trophies.map((t) => [t.name, t]));

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...earned]));
}

function isHiddenBySpoiler(t) {
  return spoilerEl.checked && t.kind === 'story' && !earned.has(t.name);
}

function displayName(t) {
  return isHiddenBySpoiler(t) ? '??? — hidden story trophy (spoiler shield on)' : t.name;
}

function displayDescription(t) {
  return isHiddenBySpoiler(t) ? 'Earn this story trophy or turn off the spoiler shield to reveal it.' : t.description;
}

function matchesFilters(t) {
  if (gradeEl.value !== 'all' && t.grade !== gradeEl.value) return false;
  if (kindEl.value === 'missable') { if (!t.missable) return false; }
  else if (kindEl.value !== 'all' && t.kind !== kindEl.value) return false;
  if (missableEl.checked && !t.missable) return false;
  if (hideEarnedEl.checked && earned.has(t.name)) return false;
  const q = searchEl.value.trim().toLowerCase();
  if (q) {
    const hay = `${t.name} ${t.description} ${t.guide} ${t.kind} ${t.grade}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

function renderSummary() {
  const grades = { platinum: 0, gold: 0, silver: 0, bronze: 0 };
  const totals = { platinum: 0, gold: 0, silver: 0, bronze: 0 };
  const missableEarned = [];
  for (const t of trophies) {
    totals[t.grade] += 1;
    if (earned.has(t.name)) grades[t.grade] += 1;
    if (t.missable && earned.has(t.name)) missableEarned.push(t.name);
  }
  const missableTotal = trophies.filter((t) => t.missable).length;
  document.getElementById('progress-big').textContent = `${earned.size} / ${trophies.length} earned`;
  document.getElementById('progress-grades').textContent =
    `platinum ${grades.platinum}/${totals.platinum} · gold ${grades.gold}/${totals.gold} · silver ${grades.silver}/${totals.silver} · bronze ${grades.bronze}/${totals.bronze}`;
  document.getElementById('progress-kinds').textContent =
    `missable secured ${missableEarned.length}/${missableTotal} — clear every MISSABLE flag before the final mission`;
  document.getElementById('bar-fill').style.width = `${(earned.size / trophies.length) * 100}%`;
}

function renderDetail(t) {
  detailEl.replaceChildren();
  const title = document.createElement('h3');
  title.textContent = displayName(t);
  const meta = document.createElement('p');
  meta.className = 'detail-meta';
  meta.textContent = `${t.grade.toUpperCase()} · kind: ${t.kind}${t.missable ? ' · MISSABLE' : ''}`;
  const desc = document.createElement('p');
  desc.className = 'detail-desc';
  desc.textContent = `Official description: “${displayDescription(t)}”`;
  const guide = document.createElement('p');
  guide.className = 'detail-guide';
  guide.textContent = isHiddenBySpoiler(t) ? 'Guide hidden by the spoiler shield until this story trophy is earned.' : t.guide;
  detailEl.append(title, meta, desc, guide);
  if (t.missable && t.missableNote) {
    const note = document.createElement('p');
    note.className = 'missable-note';
    note.textContent = `⚠ Missable: ${t.missableNote}`;
    detailEl.append(note);
  }
  if (Array.isArray(t.steps) && t.steps.length && !isHiddenBySpoiler(t)) {
    const h = document.createElement('h4');
    h.textContent = 'Steps';
    const ol = document.createElement('ol');
    for (const s of t.steps) {
      const li = document.createElement('li');
      li.textContent = s;
      ol.append(li);
    }
    detailEl.append(h, ol);
  }
  const src = document.createElement('p');
  src.className = 'detail-source';
  src.textContent = `Sources: ${t.source}`;
  detailEl.append(src);
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.textContent = earned.has(t.name) ? 'Mark as not earned' : 'Mark as earned';
  toggle.addEventListener('click', () => {
    if (earned.has(t.name)) earned.delete(t.name); else earned.add(t.name);
    saveProgress();
    render();
  });
  detailEl.append(toggle);
}

function renderRows() {
  rowsEl.replaceChildren();
  let shown = 0;
  for (const t of trophies) {
    if (!matchesFilters(t)) continue;
    shown += 1;
    const tr = document.createElement('tr');
    if (selectedName === t.name) tr.className = 'selected';
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = earned.has(t.name);
    box.setAttribute('aria-label', `earned: ${t.name}`);
    box.addEventListener('change', () => {
      if (box.checked) earned.add(t.name); else earned.delete(t.name);
      saveProgress();
      render();
    });
    const tdBox = document.createElement('td');
    tdBox.append(box);
    const tdName = document.createElement('td');
    const nameEl = document.createElement('strong');
    nameEl.textContent = displayName(t);
    const descEl = document.createElement('span');
    descEl.className = 'desc';
    descEl.textContent = displayDescription(t);
    tdName.append(nameEl, document.createElement('br'), descEl);
    tdName.addEventListener('click', () => { selectedName = t.name; render(); });
    const tdGrade = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = `badge grade-${t.grade}`;
    badge.textContent = t.grade;
    tdGrade.append(badge);
    const tdKind = document.createElement('td');
    tdKind.textContent = t.kind;
    const tdFlag = document.createElement('td');
    if (t.missable) {
      const flag = document.createElement('span');
      flag.className = 'missable-flag';
      flag.textContent = 'MISSABLE';
      tdFlag.append(flag);
    }
    tr.append(tdBox, tdName, tdGrade, tdKind, tdFlag);
    rowsEl.append(tr);
  }
  document.getElementById('empty').hidden = shown !== 0;
  document.getElementById('showing').textContent = `Showing ${shown} of ${trophies.length} trophies`;
  if (selectedName && byName.has(selectedName)) renderDetail(byName.get(selectedName));
}

function renderRoadmap() {
  document.getElementById('roadmap-source').textContent = `Roadmap sources: ${ROADMAP_SOURCE}`;
  const wrap = document.getElementById('stages');
  wrap.replaceChildren();
  for (const stage of ROADMAP_STAGES) {
    const card = document.createElement('article');
    card.className = 'stage';
    const h = document.createElement('h3');
    h.textContent = stage.title;
    const goal = document.createElement('p');
    goal.textContent = stage.goal;
    const list = document.createElement('ul');
    for (const name of stage.trophies) {
      const t = byName.get(name);
      const li = document.createElement('li');
      const done = t && earned.has(t.name) ? '✓ ' : '';
      li.textContent = `${done}${name}${t ? ` (${t.grade})` : ''}`;
      if (t && t.missable) {
        const flag = document.createElement('span');
        flag.className = 'missable-flag';
        flag.textContent = ' MISSABLE';
        li.append(flag);
      }
      li.addEventListener('click', () => {
        selectedName = name;
        showChecklist();
        render();
      });
      list.append(li);
    }
    const notes = document.createElement('p');
    notes.className = 'stage-notes';
    notes.textContent = stage.notes;
    card.append(h, goal, list, notes);
    wrap.append(card);
  }
}

function render() {
  renderSummary();
  renderRows();
  renderRoadmap();
}

function showChecklist() {
  document.getElementById('view-checklist').hidden = false;
  document.getElementById('view-roadmap').hidden = true;
  document.getElementById('tab-checklist').classList.add('active');
  document.getElementById('tab-roadmap').classList.remove('active');
}

function showRoadmap() {
  document.getElementById('view-checklist').hidden = true;
  document.getElementById('view-roadmap').hidden = false;
  document.getElementById('tab-roadmap').classList.add('active');
  document.getElementById('tab-checklist').classList.remove('active');
}

document.getElementById('tab-checklist').addEventListener('click', showChecklist);
document.getElementById('tab-roadmap').addEventListener('click', showRoadmap);
document.getElementById('export').addEventListener('click', () => {
  const payload = JSON.stringify({ app: 'leonida-legend', earned: [...earned] }, null, 2);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([payload], { type: 'application/json' }));
  a.download = 'gta6-trophy-progress.json';
  a.click();
  URL.revokeObjectURL(a.href);
});
document.getElementById('import').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const parsed = JSON.parse(await file.text());
  const list = Array.isArray(parsed) ? parsed : parsed.earned;
  earned = new Set((list ?? []).filter((n) => byName.has(n)));
  saveProgress();
  render();
});
for (const el of [searchEl, kindEl, gradeEl, missableEl, hideEarnedEl]) {
  el.addEventListener('input', renderRows);
  el.addEventListener('change', renderRows);
}
spoilerEl.addEventListener('change', () => {
  localStorage.setItem(SPOILER_KEY, spoilerEl.checked ? 'on' : 'off');
  render();
});

// Preselect a guide-rich trophy so the detail panel demonstrates a full cited guide.
selectedName = 'Strangers & Freaks';
render();
