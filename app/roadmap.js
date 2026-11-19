// Roadmap to the platinum for GTA VI (PS5), built only from the official trophy descriptions.
// Order: story chapters first, missable stranger strands interleaved before the finale,
// then completion / collectibles / activities mop-up, 100% completion, and the platinum last.
// Counts below are the counts the official descriptions (and the starter list) state:
// 250 stunts, 42 Shooting Range challenges, 14 drone race locations, 20 different races,
// 18 meditation spots, 3 card sets, 100 WAiNK locations, 50 challenges, 100 vehicles,
// 52 areas of Leonida, 9 gangs, 8 stranger strands, 8 garage properties,
// $250,000 laundered Marked Bills, $100,000 shop spending, 10 Scooter Bros registrations.
export const ROADMAP_SOURCE = 'PlayStation official trophy list (official descriptions and counts); GTA Wiki — GTA VI trophies; PowerPyx-style trophy roadmap conventions for stage ordering';

export const ROADMAP_STAGES = [
  {
    id: 'stage-1-story-opening',
    title: 'Stage 1 — Story opening: Gone Fishing and Chapter 1',
    goal: 'Start the campaign and bank the first story trophies. Keep a save at the start of every chapter from here on.',
    trophies: ['Just Like Paradise', 'Paradise Lost'],
    notes: 'Gone Fishing is the opening mission; Chapter 1 completion follows it. Both are flagged missable in this guide: secure them on a first playthrough.'
  },
  {
    id: 'stage-2-chapters',
    title: 'Stage 2 — Chapters 2 to 4 and the named story missions',
    goal: 'Play Chapters 2, 3 and 4 in order, completing the named missions as they appear: Breakfast Run, The Cartel Heist, Child\'s Play, Headliners, VCIA Takedown and Operation Savage Glory.',
    trophies: ['T**s Ass Drug Money', 'Vice City, Baby!', 'Top Of The World, Ma', 'Trust', 'Break the Bank', 'Family Matters', 'DWNFALL', 'Hi-Jacked', 'Snow Storm'],
    notes: 'While at VCIA for VCIA Takedown, note the location for Catch Me If You Can later. Sample every new activity type once for Master of None (9 types) as they appear.'
  },
  {
    id: 'stage-3-strands',
    title: 'Stage 3 — MISSABLE: stranger strands interleaved before the finale',
    goal: 'Before the final mission, finish 8 stranger strands across Leonida, including the named strand finals for Andy, Kenton, Billy, Randy and Tyrone, and make choices deliberately for the choice-linked trophy.',
    trophies: ['Road to Rehabilitation', 'This Was No Boat Accident', 'The Lone Rider', 'Supply & Demand', 'Spin On This!', 'Strangers & Freaks', 'Actions Speak Louder', 'Fair Game'],
    notes: 'Every trophy in this stage carries a MISSABLE flag in the checklist. Do not start the final mission until this stage is fully ticked. Bret\'s hunt (Fair Game) is picked up here alongside the strands.'
  },
  {
    id: 'stage-4-finale',
    title: 'Stage 4 — The final mission',
    goal: 'Make a protected save, then complete the final mission for the story gold.',
    trophies: ['You Gotta Know When to Get Off'],
    notes: 'Gold trophy. The pre-finale save is your insurance for anything in Stages 1-3 that was missed.'
  },
  {
    id: 'stage-5-collectibles',
    title: 'Stage 5 — Mop-up A: collectibles and exploration',
    goal: 'Sweep Leonida region by region: 100 WAiNK locations, 3 Collectible Card sets, 18 meditation spots, 100 vehicles discovered, all 52 areas explored, and 10 vehicles registered to the Scooter Bros app.',
    trophies: ['You WAiNKer!', "Don't Touch My Deck", 'Positive Mental Attitude', 'Whip It Good', 'The Goodtime State', 'On the Spot'],
    notes: 'These hunts overlap: one regional sweep advances WAiNK spots, cards, meditation spots, vehicles and map coverage at the same time.'
  },
  {
    id: 'stage-6-activities',
    title: 'Stage 6 — Mop-up B: activities, challenges and robberies',
    goal: 'Clear the structured activities: 250 stunts, gold in all 42 Shooting Range challenges, drone race wins at 14 locations, 20 different race wins, 50 challenges, 5 Bank Vaults robbed with escapes, and one Illegal Operation robbed for each of the 9 gangs.',
    trophies: ['Cunning Stunts', 'The Shootist', 'Top Fun', 'Earn Cash, Not Kudos', 'One Last Thing', 'Maximum Withdrawal', 'Pest Control', 'Baited My Tackle', 'Stick Fiddler', 'Let’s Go Bowling', 'Master of None'],
    notes: 'Retry-based trophies (Bad Luck, I Guess) usually unlock incidentally during this stage\'s medal and race chasing.'
  },
  {
    id: 'stage-7-freeroam',
    title: 'Stage 7 — Mop-up C: free-roam feats and partner trophies',
    goal: 'Set up the one-off feats: partner wanted-level escapes, the jewelry store stealth robbery, the armored truck, VCIA departure, showroom smash-out, Ocean Beach cocktail, Combat Focus takedowns, melee drive-by and the strange event.',
    trophies: ['Hot Together', 'Retail Therapy', 'Sneakthief', 'A Classic Blitz Play', 'Catch Me If You Can', 'Capital Offense', 'In The Beginning…', 'Gunslinger', 'Ten Pin', 'Challenging Tank', 'Personal Best', 'Bad Luck, I Guess', 'The Truth Is Out There'],
    notes: 'Keep a save before provoking heavy heat for the Rhino encounter (Challenging Tank). Partner trophies need your partner present from the start of each attempt.'
  },
  {
    id: 'stage-8-economy',
    title: 'Stage 8 — Economy and 100% completion',
    goal: 'Close the money totals ($250,000 laundered Marked Bills through contacts, $100,000 spent across all shops), buy all 8 garage properties, then push the in-game completion counter to 100%.',
    trophies: ['Dime on the Dollar', 'Treat Yo Self', 'Little Boxes', 'A Long Road'],
    notes: 'A Long Road is the second gold. Use the tracker summary: any trophy family still open is what stands between you and 100%.'
  },
  {
    id: 'stage-9-platinum',
    title: 'Stage 9 — Platinum',
    goal: 'With the other 54 trophies earned, the platinum unlocks automatically.',
    trophies: ['Vice Got a Price!'],
    notes: 'Congratulations! You\'re a Leonida Legend — the official description of the platinum itself.'
  }
];
