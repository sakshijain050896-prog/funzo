// Comprehensive Mystery Cases, Crime Scenes, and Detective Riddles

export interface CrimeHotspot {
  id: string;
  name: string;
  location: string;
  clue: string;
}

export interface Suspect {
  id: string;
  name: string;
  role: string;
  wearing: string;
  alibi: string;
  isKiller: boolean;
  motive: string;
}

export interface CrimeCase {
  caseId: string;
  title: string;
  subtitle: string;
  story: string;
  victim: string;
  hotspots: CrimeHotspot[];
  suspects: Suspect[];
  solutionExplanation: string;
  rewardIQ: number;
}

export const CRIME_CASES: CrimeCase[] = [
  {
    caseId: 'case-101',
    title: 'The Penthouse Poisoning',
    subtitle: 'Midnight Cyanide Mystery',
    story: 'Lord Sterling was found deceased on his luxury penthouse floor at midnight. The balcony door was ajar, and an expensive bottle of Burgundy was half-finished.',
    victim: 'Lord Arthur Sterling (Age 54, Tycoon)',
    hotspots: [
      {
        id: 'wine',
        name: '🍷 Spilled Wine Goblet',
        location: 'Dining Table',
        clue: 'Traces of bitter almond residue detected inside the crystal glass. Cyanide poisoning confirmed.',
      },
      {
        id: 'clock',
        name: '🕰️ Smashed Grandfather Clock',
        location: 'Living Hall',
        clue: 'The pendulum was struck by a heavy object, freezing the time exactly at 11:42 PM.',
      },
      {
        id: 'footprint',
        name: '👠 Muddy Red Stiletto Mark',
        location: 'Balcony Door',
        clue: 'Size 6 Italian designer heel footprint entering from the fire escape balcony.',
      },
      {
        id: 'letter',
        name: '✉️ Burned Will Fragment',
        location: 'Fireplace Hearth',
        clue: 'A piece of paper reads: "...everything leaves to my sister, Victoria shall receive zero cents."',
      },
    ],
    suspects: [
      {
        id: 'victoria',
        name: 'Victoria Vance',
        role: 'Business Partner',
        wearing: 'Black evening dress, Red Christian Louboutin Stilettos (Size 6).',
        alibi: 'Claims she was at the jazz club until 1:00 AM, but bartender says she vanished for an hour at 11:30 PM.',
        isKiller: true,
        motive: 'Victim was auditing the company books and caught her embezzling $2.4M.',
      },
      {
        id: 'arthur',
        name: 'Arthur Jr.',
        role: 'Estranged Brother',
        wearing: 'Tweed blazer, leather loafers.',
        alibi: 'Was seen arguing loudly with the victim at 9:00 PM, but left by taxi at 9:45 PM (CCTV confirms).',
        isKiller: false,
        motive: 'Angry about being disinherited, but possesses a solid alibi for 11:42 PM.',
      },
      {
        id: 'elena',
        name: 'Elena Rostova',
        role: 'Personal Assistant',
        wearing: 'Sneakers and rain trench coat.',
        alibi: 'Was stocking the cellar until 11:15 PM, then went home on the subway.',
        isKiller: false,
        motive: 'Loyal to the victim for 8 years, had no financial dispute.',
      },
    ],
    solutionExplanation: 'Victoria Vance wore the exact Size 6 red Louboutin stilettos matching the balcony footprint, slipped cyanide into his glass, and fled right as the grandfather clock stopped at 11:42 PM!',
    rewardIQ: 15,
  },
  {
    caseId: 'case-102',
    title: 'The Stolen Royal Diamond',
    subtitle: 'Midnight Museum Heist',
    story: 'The priceless "Star of Cairo" blue diamond was stolen from the central vault of the National Gallery during a violent thunderstorm.',
    victim: 'National Museum Vault (Value: $18,000,000)',
    hotspots: [
      {
        id: 'glass',
        name: '💎 Sliced Display Glass',
        location: 'Display Pedestal',
        clue: 'Cut with high-precision diamond laser from the inside of the security perimeter.',
      },
      {
        id: 'gloves',
        name: '🧤 Latex Glove Fragment',
        location: 'Air Vent Grate',
        clue: 'Coated in photographic chemical developer residue and silver nitrate.',
      },
      {
        id: 'power',
        name: '⚡ Severed Security Cable',
        location: 'Basement Junction Box',
        clue: 'Cut cleanly using left-handed electrician shears at 01:14 AM.',
      },
      {
        id: 'audio',
        name: '📼 Security Audio Tape',
        location: 'Guard Room',
        clue: 'The guard room microphone picked up a distinct metallic limp sound as the thief fled.',
      },
    ],
    suspects: [
      {
        id: 'marcus',
        name: 'Marcus Bell',
        role: 'Head Conservator & Photographer',
        wearing: 'Limping on right leg with steel brace, left-handed, hands smell of chemical developer.',
        alibi: 'Claims he was in the darkroom printing catalogs all night alone.',
        isKiller: true,
        motive: 'Facing $3M in offshore gambling debts.',
      },
      {
        id: 'nathan',
        name: 'Nathan Drake',
        role: 'Night Security Guard',
        wearing: 'Uniform, heavy boots, right-handed.',
        alibi: 'Was patrolling the east gallery when the alarm tripped.',
        isKiller: false,
        motive: 'Had vault access keys, but shears were left-handed and he has no limp.',
      },
      {
        id: 'clara',
        name: 'Clara Oswald',
        role: 'Jewelry Specialist',
        wearing: 'Sneakers, right-handed.',
        alibi: 'Was attending an art auction in Vienna, boarding pass verified.',
        isKiller: false,
        motive: 'Appraised the diamond last week, but was out of the country.',
      },
    ],
    solutionExplanation: 'Marcus Bell had access to photographic developer found on the glove, is left-handed matching the shear cuts, and his steel leg brace matched the audio recording of the limping thief!',
    rewardIQ: 20,
  },
  {
    caseId: 'case-103',
    title: 'The Luxury Yacht Murder',
    subtitle: 'High Seas Champagne Poisoning',
    story: 'During a billionaires\' gala on the open sea, tech mogul Roman Thorne collapsed over the railing after a celebratory midnight toast.',
    victim: 'Roman Thorne (Age 42, AI Billionaire)',
    hotspots: [
      {
        id: 'champagne',
        name: '🍾 Vintage Crystal Flute',
        location: 'Captain\'s Deck',
        clue: 'The rim contains colorless, odorless venom from a blue-ringed octopus.',
      },
      {
        id: 'chain',
        name: '⚓ Anchor Windlass Rope',
        location: 'Bow Foredeck',
        clue: 'A silk handkerchief with embroidered monogram "S.K." caught in the pulley.',
      },
      {
        id: 'phone',
        name: '📱 Victim\'s Waterlogged Phone',
        location: 'Main Salon Floor',
        clue: 'Last text message received: "Sign the merger before midnight or you won\'t see tomorrow."',
      },
      {
        id: 'diving',
        name: '🤿 Wet Scuba Tank',
        location: 'Lower Swim Platform',
        clue: 'The oxygen tank was used for 20 minutes between 11:30 PM and midnight.',
      },
    ],
    suspects: [
      {
        id: 'sebastian',
        name: 'Sebastian Kane (S.K.)',
        role: 'Marine Biologist & Rival Investor',
        wearing: 'Tuxedo over damp dive rashguard, expert in tropical marine venoms.',
        alibi: 'Claims he was stargazing alone on the upper observation roof.',
        isKiller: true,
        motive: 'Roman stole his oceanic patent and drove his research lab into bankruptcy.',
      },
      {
        id: 'chloe',
        name: 'Chloe Thorne',
        role: 'Spouse & Heir',
        wearing: 'Silk gown, diamond necklace.',
        alibi: 'Was dancing with 20 guests on the ballroom dance floor at midnight.',
        isKiller: false,
        motive: 'Inherits his fortune, but was under public view of 20 witnesses.',
      },
      {
        id: 'captain',
        name: 'Captain Vance',
        role: 'Yacht Commander',
        wearing: 'White naval uniform.',
        alibi: 'Was at the radar bridge steering the vessel through coastal fog.',
        isKiller: false,
        motive: 'Employed by Roman for 12 years with clean service record.',
      },
    ],
    solutionExplanation: 'Sebastian Kane (monogram S.K. on the handkerchief) used his marine biology expertise to acquire octopus venom, used the scuba gear to board the private deck unseen, and poisoned the glass!',
    rewardIQ: 20,
  },
];

export interface DetectiveRiddle {
  title: string;
  story: string;
  options: string[];
  correctOptionIndex: number;
  clue1: string;
  clue2: string;
  solution: string;
  rewardIQ: number;
}

export const DETECTIVE_RIDDLES: DetectiveRiddle[] = [
  {
    title: 'The Poisoned Ice Cubes',
    story: 'Two ladies enter a cocktail lounge on a scorching 40°C afternoon. Both order the identical iced lemon iced-tea drink. Sarah drinks hers in under 30 seconds because she is intensely thirsty. Emily sips hers slowly over 45 minutes while texting. Emily collapses and dies of poison, while Sarah is completely unharmed. How did Emily die if both drinks were poured from the exact same pitcher?',
    options: [
      'The poison was smeared only on the second glass rim.',
      'The poison was frozen inside the ice cubes, which melted and dissolved as Emily waited.',
      'Emily had a severe allergic reaction to lemon pulp in the second glass.',
      'Sarah was secretly immune to cyanide poison through daily microdoses.'
    ],
    correctOptionIndex: 1,
    clue1: 'The poison was not on the glass rim or in the liquid tea pitcher itself.',
    clue2: 'Think about what happens to ice cubes over 45 minutes versus 30 seconds.',
    solution: 'The poison was frozen inside the ice cubes! Sarah drank hers so fast the ice cubes didn\'t melt. Emily let her drink sit for 45 minutes, allowing the poisoned ice cubes to dissolve into her glass.',
    rewardIQ: 15,
  },
  {
    title: 'The Snowy Cabin Mystery',
    story: 'A hermit is found dead in his remote mountain cabin after a 3-day blizzard. The police arrive and find all doors and windows locked from the inside. There are only two sets of footprints in the deep snow: the milkman who arrived this morning and discovered the body, and the mail carrier who delivered a parcel yesterday. Yet the detective arrests the milkman immediately. Why?',
    options: [
      'The milkman was wearing boots matching a footprint found on the ceiling.',
      'The milkman had walked backwards in his own tracks to pretend he never entered.',
      'The mail carrier had a verified GPS tracking tag on his delivery vehicle.',
      'The milkman was carrying a stolen set of mountain cabin keys in his apron.'
    ],
    correctOptionIndex: 1,
    clue1: 'Look at the footprints leading TO and FROM the cabin door.',
    clue2: 'How could someone lock a door from the inside if they walked away?',
    solution: 'The milkman claimed he only walked to the door and peered through the window. But the snow tracks showed one set going IN, and zero sets leaving—the milkman had walked backwards in his own footsteps to deceive police!',
    rewardIQ: 15,
  },
  {
    title: 'The Frozen Watch Alibi',
    story: 'A wealthy art collector was found dead in his private cold-storage vault (-15°C). The collector\'s luxury mechanical wristwatch stopped at exactly 03:15. The suspect claimed he had an ironclad alibi at 03:15 AM because he was seen at an all-night diner 5 miles away. The detective instantly arrested the suspect on the spot. How did the detective know the alibi was fraudulent?',
    options: [
      'In a -15°C vault, mechanical watch oil freezes 2-3 hours AFTER death, making the real crime time 12:30 AM (no alibi!).',
      'The wristwatch had a quartz digital battery that never stops from cold.',
      'The suspect was caught on camera setting the collector\'s watch hands forward.',
      'The diner was closed for cleaning between 03:00 AM and 04:00 AM.'
    ],
    correctOptionIndex: 0,
    clue1: 'What happens to mechanical lubricated watches inside a sub-zero freezer?',
    clue2: 'Did the watch stop when the victim died, or hours later?',
    solution: 'In a -15°C sub-zero vault, mechanical watch lubricating oil freezes and causes the gears to stop running 2 to 3 hours AFTER the door is sealed. The murder occurred at 12:30 AM when the suspect had NO alibi!',
    rewardIQ: 20,
  },
  {
    title: 'The Left-Handed Suicide',
    story: 'A man is found dead in his study slumped over his mahogany desk. A gun is in his right hand, and an audio cassette recorder sits on the desk. When the detective presses PLAY, they hear the man\'s voice: "I cannot go on any longer, life has lost all meaning..." followed by the sound of a gunshot. The detective immediately declares it a homicide, not a suicide. Why?',
    options: [
      'The man was left-handed and would not hold a gun in his right hand.',
      'If the man died immediately from the gunshot, he could not have rewound the cassette tape for the detective to hit PLAY.',
      'The gunshot audio acoustics sounded like an outdoor firing range.',
      'The cassette recorder had batteries from a different manufacturer.'
    ],
    correctOptionIndex: 1,
    clue1: 'Think about how a cassette tape recorder functions mechanically.',
    clue2: 'Who pressed the REWIND button so the detective could press PLAY?',
    solution: 'If the man shot himself while recording, who rewound the cassette tape back to the beginning so the detective could hit play? The killer rewound the tape before fleeing!',
    rewardIQ: 15,
  },
  {
    title: 'The Emergency Surgeon',
    story: 'A father and son are in a catastrophic car crash. The father dies on the spot. The son is rushed to the emergency room in critical condition. The surgeon looks at the boy on the operating table and gasps: "I cannot operate on this boy, he is my son!" How is this possible if the father died at the scene?',
    options: [
      'The surgeon is the boy\'s biological MOTHER.',
      'The father in the car was an adoptive father, and the surgeon is his biological father.',
      'The surgeon was confused due to extreme hospital exhaustion.',
      'The boy was cloned in a medical laboratory.'
    ],
    correctOptionIndex: 0,
    clue1: 'Think about family relationships beyond father and son.',
    clue2: 'Who else can be a parent?',
    solution: 'The surgeon is the boy\'s MOTHER! Traditional gender assumptions frequently deceive the brain.',
    rewardIQ: 10,
  },
  {
    title: 'The Wet Umbrella Dilemma',
    story: 'A thief broke into a jewelry estate during a midnight rainstorm. Detectives bring in three suspects found nearby. Suspect A has soaking wet shoes and a dry coat. Suspect B has a completely dry coat and shoes, but his umbrella in the foyer is dripping water. Suspect C is soaking wet from head to toe. Why did the detective arrest Suspect B?',
    options: [
      'Suspect B was wearing rubber galoshes matching muddy tracks.',
      'Suspect B left his wet umbrella outside while hiding inside the dry estate robbing jewels, keeping his clothes dry!',
      'Suspect A had a receipt for a nearby taxi ride.',
      'Suspect C had water in his lungs indicating he fell in a pond.'
    ],
    correctOptionIndex: 1,
    clue1: 'How could someone be in a rainstorm without getting their clothes wet?',
    clue2: 'Where was the thief standing while committing the burglary?',
    solution: 'Suspect B entered the mansion, left his umbrella dripping, and stayed inside out of the rain while looting the safe, keeping his clothing dry!',
    rewardIQ: 15,
  }
];
