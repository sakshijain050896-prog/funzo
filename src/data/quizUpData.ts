// Quiz Up - Comprehensive Trivia & Knowledge Engine
// Covers Cinema (Bollywood & Hollywood), Science, Physics, Chemistry, History, Math, Geography, Tech, and Sports.

export type QuizTopic =
  | 'all'
  | 'cinema'
  | 'science'
  | 'physics'
  | 'chemistry'
  | 'history'
  | 'math'
  | 'geography'
  | 'tech'
  | 'sports';

export type QuizDifficulty = 'all' | 'easy' | 'medium' | 'hard';

export interface QuizQuestion {
  id: string;
  topic: QuizTopic;
  topicLabel: string;
  topicEmoji: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// ---------------- 1. CURATED QUESTIONS (INCLUDING TRICKY QUESTIONS) ----------------
export const CURATED_QUIZ_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  // ==================== CINEMA (BOLLYWOOD & HOLLYWOOD) ====================
  {
    topic: 'cinema',
    topicLabel: 'Bollywood & Hollywood',
    topicEmoji: '🎬',
    question: 'In the iconic Bollywood film "Dilwale Dulhania Le Jayenge" (DDLJ), who played Raj Malhotra?',
    options: ['Shah Rukh Khan', 'Salman Khan', 'Aamir Khan', 'Akshay Kumar'],
    answer: 'Shah Rukh Khan',
    explanation: 'Shah Rukh Khan portrayed Raj Malhotra in the 1995 cult classic directed by Aditya Chopra.',
    difficulty: 'easy',
  },
  {
    topic: 'cinema',
    topicLabel: 'Bollywood & Hollywood',
    topicEmoji: '🎬',
    question: 'Which Indian song won the Academy Award (Oscar) for Best Original Song in 2023?',
    options: ['Naatu Naatu (RRR)', 'Jai Ho (Slumdog Millionaire)', 'Chhaiya Chhaiya (Dil Se)', 'Kesariya (Brahmastra)'],
    answer: 'Naatu Naatu (RRR)',
    explanation: 'Composed by M. M. Keeravani with lyrics by Chandrabose, Naatu Naatu won the Oscar for RRR.',
    difficulty: 'easy',
  },
  {
    topic: 'cinema',
    topicLabel: 'Bollywood & Hollywood',
    topicEmoji: '🎬',
    question: 'Who played Tony Stark / Iron Man in the Marvel Cinematic Universe starting in 2008?',
    options: ['Robert Downey Jr.', 'Chris Evans', 'Chris Hemsworth', 'Christian Bale'],
    answer: 'Robert Downey Jr.',
    explanation: 'Robert Downey Jr. launched the MCU with Iron Man (2008) and played the hero for over a decade.',
    difficulty: 'easy',
  },
  {
    topic: 'cinema',
    topicLabel: 'Bollywood & Hollywood',
    topicEmoji: '🎬',
    question: 'In the classic movie "3 Idiots", what was Rancho’s real legal identity revealed to be?',
    options: ['Phunsukh Wangdu', 'Chhote Lal', 'Ranchhoddas Chanchad', 'Manmohan'],
    answer: 'Phunsukh Wangdu',
    explanation: 'Rancho was actually Phunsukh Wangdu, a genius scientist living in Ladakh with 400 patents.',
    difficulty: 'easy',
  },
  {
    topic: 'cinema',
    topicLabel: 'Bollywood & Hollywood',
    topicEmoji: '🎬',
    question: 'TRICKY: What was India’s very first full-length sound (talkie) motion picture in 1931?',
    options: ['Alam Ara', 'Raja Harishchandra', 'Kisan Kanya', 'Mother India'],
    answer: 'Alam Ara',
    explanation: 'Alam Ara (1931) was India’s first talkie. Raja Harishchandra (1913) was the first feature film, but was silent.',
    difficulty: 'medium',
  },
  {
    topic: 'cinema',
    topicLabel: 'Bollywood & Hollywood',
    topicEmoji: '🎬',
    question: 'TRICKY: In Christopher Nolan’s "Inception", what is Dom Cobb’s personal totem to test reality?',
    options: ['A Spinning Top', 'A Loaded Die', 'A Chess Bishop', 'A Poker Chip'],
    answer: 'A Spinning Top',
    explanation: 'Cobb uses his late wife Mal’s spinning top; if it spins indefinitely without falling, he is dreaming.',
    difficulty: 'medium',
  },
  {
    topic: 'cinema',
    topicLabel: 'Bollywood & Hollywood',
    topicEmoji: '🎬',
    question: 'TRICKY: Who is the only male actor to win three Academy Awards for Best Actor in a Leading Role?',
    options: ['Daniel Day-Lewis', 'Jack Nicholson', 'Marlon Brando', 'Tom Hanks'],
    answer: 'Daniel Day-Lewis',
    explanation: 'Daniel Day-Lewis won Lead Actor for My Left Foot (1989), There Will Be Blood (2007), and Lincoln (2012).',
    difficulty: 'medium',
  },
  {
    topic: 'cinema',
    topicLabel: 'Bollywood & Hollywood',
    topicEmoji: '🎬',
    question: 'TRICKY: What was the first Indian film ever officially nominated for the Academy Award for Best Foreign Language Film?',
    options: ['Mother India (1957)', 'Lagaan (2001)', 'Salaam Bombay! (1988)', 'Pather Panchali (1955)'],
    answer: 'Mother India (1957)',
    explanation: 'Mehboob Khan’s "Mother India" was nominated in 1957, losing the Oscar by just one single vote!',
    difficulty: 'medium',
  },

  // ==================== TRICKY SCIENCE & BIOLOGY ====================
  {
    topic: 'science',
    topicLabel: 'Science & Nature',
    topicEmoji: '🔬',
    question: 'What organelle is widely known as the powerhouse of the cell?',
    options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Endoplasmic Reticulum'],
    answer: 'Mitochondria',
    explanation: 'Mitochondria produce ATP (adenosine triphosphate) through cellular respiration.',
    difficulty: 'easy',
  },
  {
    topic: 'science',
    topicLabel: 'Science & Nature',
    topicEmoji: '🔬',
    question: 'What is the most abundant gas in planet Earth’s atmosphere?',
    options: ['Nitrogen (~78%)', 'Oxygen (~21%)', 'Argon (~0.9%)', 'Carbon Dioxide (~0.04%)'],
    answer: 'Nitrogen (~78%)',
    explanation: 'Nitrogen makes up approximately 78% of dry atmosphere by volume, while oxygen is roughly 21%.',
    difficulty: 'easy',
  },
  {
    topic: 'science',
    topicLabel: 'Science & Nature',
    topicEmoji: '🔬',
    question: 'TRICKY: Which human organ has the unique biological capability to regenerate its tissue back to full mass after partial removal?',
    options: ['Liver', 'Kidney', 'Spleen', 'Pancreas'],
    answer: 'Liver',
    explanation: 'The liver is the only visceral human organ capable of natural tissue regeneration from as little as 25-30% remaining tissue.',
    difficulty: 'medium',
  },
  {
    topic: 'science',
    topicLabel: 'Science & Nature',
    topicEmoji: '🔬',
    question: 'TRICKY: Approximately how many bones is a human baby born with before many fuse together in adulthood?',
    options: ['Around 270–300 bones', 'Exactly 206 bones', 'Around 150 bones', 'Around 380 bones'],
    answer: 'Around 270–300 bones',
    explanation: 'Babies are born with ~270 to 300 bones, which gradually fuse into the 206 bones found in an adult skeleton.',
    difficulty: 'medium',
  },
  {
    topic: 'science',
    topicLabel: 'Science & Nature',
    topicEmoji: '🔬',
    question: 'TRICKY: Botanically speaking, which of the following is classified as a Fruit rather than a vegetable?',
    options: ['Tomato', 'Carrot', 'Spinach', 'Potato'],
    answer: 'Tomato',
    explanation: 'Botanically, tomatoes, cucumbers, and bell peppers are fruits because they develop from the flower ovary and contain seeds.',
    difficulty: 'easy',
  },
  {
    topic: 'science',
    topicLabel: 'Science & Nature',
    topicEmoji: '🔬',
    question: 'TRICKY: What color does pure liquid oxygen exhibit under atmospheric condensation?',
    options: ['Pale Blue', 'Colorless / Clear', 'Light Amber', 'Pale Violet'],
    answer: 'Pale Blue',
    explanation: 'Liquid oxygen is paramagnetically distinct and has a characteristic pale sky-blue color due to red light absorption.',
    difficulty: 'medium',
  },

  // ==================== TRICKY PHYSICS ====================
  {
    topic: 'physics',
    topicLabel: 'Physics & Energy',
    topicEmoji: '⚡',
    question: 'What is the speed of light in a vacuum (rounded)?',
    options: ['300,000 km/s', '150,000 km/s', '30,000 km/s', '1,000,000 km/s'],
    answer: '300,000 km/s',
    explanation: 'Light travels at exactly 299,792 km/s in a vacuum.',
    difficulty: 'easy',
  },
  {
    topic: 'physics',
    topicLabel: 'Physics & Energy',
    topicEmoji: '⚡',
    question: 'What is the standard SI unit of electrical resistance?',
    options: ['Ohm (Ω)', 'Volt (V)', 'Ampere (A)', 'Watt (W)'],
    answer: 'Ohm (Ω)',
    explanation: 'The Ohm is named after physicist Georg Simon Ohm.',
    difficulty: 'easy',
  },
  {
    topic: 'physics',
    topicLabel: 'Physics & Energy',
    topicEmoji: '⚡',
    question: 'TRICKY: If an astronaut drops a heavy hammer and a light feather together in the lunar vacuum, what happens?',
    options: ['Both hit the surface simultaneously', 'Hammer hits first due to mass', 'Feather hits first due to air drag', 'Both float away without landing'],
    answer: 'Both hit the surface simultaneously',
    explanation: 'In the vacuum of space, all objects accelerate at the exact same rate regardless of mass, famously demonstrated on Apollo 15.',
    difficulty: 'medium',
  },
  {
    topic: 'physics',
    topicLabel: 'Physics & Energy',
    topicEmoji: '⚡',
    question: 'TRICKY: Can mechanical sound waves propagate across outer space?',
    options: ['No, sound requires a material medium to propagate', 'Yes, but sound travels at light speed in space', 'Yes, but only ultrasonic frequencies can travel', 'Only near planetary magnetic fields'],
    answer: 'No, sound requires a material medium to propagate',
    explanation: 'Mechanical sound waves require vibrating particles (air, liquid, or solid). In vacuum, sound cannot travel.',
    difficulty: 'easy',
  },
  {
    topic: 'physics',
    topicLabel: 'Physics & Energy',
    topicEmoji: '⚡',
    question: 'TRICKY: When a flat metal disc with a hole in the middle is uniformly heated, what happens to the hole?',
    options: ['The hole gets bigger (expands)', 'The hole gets smaller (contracts)', 'The hole stays the exact same diameter', 'The hole warps into an ellipse'],
    answer: 'The hole gets bigger (expands)',
    explanation: 'Thermal expansion acts like photographic enlargement: every linear dimension, including internal cavities and holes, expands.',
    difficulty: 'medium',
  },
  {
    topic: 'physics',
    topicLabel: 'Physics & Energy',
    topicEmoji: '⚡',
    question: 'TRICKY: What phenomenon causes a straight stick to appear bent when partially placed in water?',
    options: ['Refraction', 'Reflection', 'Diffraction', 'Dispersion'],
    answer: 'Refraction',
    explanation: 'Light changes speed and bends when passing between media of differing refractive indices (air to water).',
    difficulty: 'easy',
  },

  // ==================== TRICKY CHEMISTRY ====================
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'What is the chemical symbol for Gold on the periodic table?',
    options: ['Au', 'Ag', 'Fe', 'Gd'],
    answer: 'Au',
    explanation: 'Au comes from the Latin word "Aurum", which translates to shining dawn.',
    difficulty: 'easy',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'What is the chemical formula for ordinary table salt?',
    options: ['NaCl', 'KCl', 'NaHCO3', 'CaCO3'],
    answer: 'NaCl',
    explanation: 'Table salt is Sodium Chloride (NaCl), an ionic compound of sodium and chlorine.',
    difficulty: 'easy',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'TRICKY: What is the ONLY metallic element that remains liquid at standard room temperature and pressure?',
    options: ['Mercury (Hg)', 'Gallium (Ga)', 'Bromine (Br)', 'Cesium (Cs)'],
    answer: 'Mercury (Hg)',
    explanation: 'Mercury is the only metal that is liquid at standard room conditions (Gallium melts in your hand at ~30°C).',
    difficulty: 'medium',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'TRICKY: What is the ONLY non-metallic element on the periodic table that is a liquid at room temperature?',
    options: ['Bromine (Br)', 'Mercury (Hg)', 'Chlorine (Cl)', 'Iodine (I)'],
    answer: 'Bromine (Br)',
    explanation: 'Bromine is a reddish-brown liquid at standard room temperature. Mercury is a metal, not a non-metal!',
    difficulty: 'medium',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'TRICKY: What primary acid is naturally secreted by the parietal cells in the human stomach for digestion?',
    options: ['Hydrochloric Acid (HCl)', 'Sulfuric Acid (H2SO4)', 'Acetic Acid (CH3COOH)', 'Nitric Acid (HNO3)'],
    answer: 'Hydrochloric Acid (HCl)',
    explanation: 'Gastric acid contains Hydrochloric Acid (pH 1.5 to 3.5), which activates pepsin for protein digestion.',
    difficulty: 'medium',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'TRICKY: Diamond, Graphite, and Graphene are all allotropes composed entirely of which single chemical element?',
    options: ['Carbon', 'Silicon', 'Boron', 'Germanium'],
    answer: 'Carbon',
    explanation: 'Diamond and graphite are pure elemental carbon with different crystalline lattices and bonding arrangements.',
    difficulty: 'easy',
  },

  // ==================== TRICKY HISTORY ====================
  {
    topic: 'history',
    topicLabel: 'World History',
    topicEmoji: '🏛️',
    question: 'In which modern-day country are the Great Pyramids of Giza located?',
    options: ['Egypt', 'Sudan', 'Jordan', 'Greece'],
    answer: 'Egypt',
    explanation: 'The Giza pyramids stand near Cairo, Egypt, constructed during the Old Kingdom period.',
    difficulty: 'easy',
  },
  {
    topic: 'history',
    topicLabel: 'World History',
    topicEmoji: '🏛️',
    question: 'In which year did India gain Independence from British colonial rule?',
    options: ['1947', '1950', '1942', '1935'],
    answer: '1947',
    explanation: 'India gained independence on August 15, 1947, through the Indian Independence Act.',
    difficulty: 'easy',
  },
  {
    topic: 'history',
    topicLabel: 'World History',
    topicEmoji: '🏛️',
    question: 'TRICKY: Cleopatra VII, the famous final ruler of Ptolemaic Egypt, was of which ethnic origin?',
    options: ['Macedonian Greek', 'Native Egyptian', 'Roman', 'Persian'],
    answer: 'Macedonian Greek',
    explanation: 'Cleopatra was of Macedonian Greek ancestry, descended from Ptolemy I Soter, a general of Alexander the Great.',
    difficulty: 'medium',
  },
  {
    topic: 'history',
    topicLabel: 'World History',
    topicEmoji: '🏛️',
    question: 'TRICKY: How many years did the famous "Hundred Years’ War" between England and France actually last?',
    options: ['116 years (1337–1453)', 'Exactly 100 years', '96 years', '105 years'],
    answer: '116 years (1337–1453)',
    explanation: 'The conflict spanned 116 years with several truces, concluding in 1453 with the Battle of Castillon.',
    difficulty: 'medium',
  },
  {
    topic: 'history',
    topicLabel: 'World History',
    topicEmoji: '🏛️',
    question: 'TRICKY: What was the shortest recorded war in world history (the Anglo-Zanzibar War of 1896)?',
    options: ['Between 38 and 45 minutes', '3 days', '24 hours', '2 weeks'],
    answer: 'Between 38 and 45 minutes',
    explanation: 'Fought on 27 August 1896, the conflict ended after British naval bombardment in under 45 minutes.',
    difficulty: 'medium',
  },
  {
    topic: 'history',
    topicLabel: 'World History',
    topicEmoji: '🏛️',
    question: 'TRICKY: Which pre-Columbian civilization built the mountain citadel of Machu Picchu in Peru?',
    options: ['Inca Empire', 'Maya Civilization', 'Aztec Empire', 'Olmec Civilization'],
    answer: 'Inca Empire',
    explanation: 'Machu Picchu was built in the 15th century by the Inca emperor Pachacuti in the Cusco Region.',
    difficulty: 'easy',
  },

  // ==================== TRICKY MATHEMATICS ====================
  {
    topic: 'math',
    topicLabel: 'Math & Logic',
    topicEmoji: '🧮',
    question: 'What is the only even prime number in all of mathematics?',
    options: ['2', '0', '4', '6'],
    answer: '2',
    explanation: '2 is the only even prime because any larger even number is divisible by 2.',
    difficulty: 'easy',
  },
  {
    topic: 'math',
    topicLabel: 'Math & Logic',
    topicEmoji: '🧮',
    question: 'What is the principal square root of 144 (√144)?',
    options: ['12', '14', '16', '11'],
    answer: '12',
    explanation: '12 × 12 = 144.',
    difficulty: 'easy',
  },
  {
    topic: 'math',
    topicLabel: 'Math & Logic',
    topicEmoji: '🧮',
    question: 'TRICKY: What is the mathematical value of 0! (Zero Factorial)?',
    options: ['1', '0', 'Undefined', 'Infinity'],
    answer: '1',
    explanation: 'By convention and combinatorial definition (the number of ways to arrange 0 items is 1), 0! = 1.',
    difficulty: 'medium',
  },
  {
    topic: 'math',
    topicLabel: 'Math & Logic',
    topicEmoji: '🧮',
    question: 'TRICKY: A right-angled triangle has legs of length 3 cm and 4 cm. What is the length of its hypotenuse?',
    options: ['5 cm', '6 cm', '7 cm', '4.5 cm'],
    answer: '5 cm',
    explanation: 'By Pythagorean theorem: 3² + 4² = 9 + 16 = 25, and √25 = 5 cm.',
    difficulty: 'easy',
  },
  {
    topic: 'math',
    topicLabel: 'Math & Logic',
    topicEmoji: '🧮',
    question: 'TRICKY: Which number is neither considered positive nor negative?',
    options: ['0 (Zero)', '1', '-1', '0.5'],
    answer: '0 (Zero)',
    explanation: 'Zero is the neutral boundary separating positive and negative numbers on the real number line.',
    difficulty: 'easy',
  },
  {
    topic: 'math',
    topicLabel: 'Math & Logic',
    topicEmoji: '🧮',
    question: 'TRICKY: How many degrees is the sum of interior angles in any Euclidean triangle?',
    options: ['180°', '360°', '90°', '270°'],
    answer: '180°',
    explanation: 'In Euclidean planar geometry, the sum of three interior angles in any triangle is always exactly 180° (π radians).',
    difficulty: 'easy',
  },

  // ==================== GEOGRAPHY & WORLD WONDERS ====================
  {
    topic: 'geography',
    topicLabel: 'Geography & Wonders',
    topicEmoji: '🌍',
    question: 'What is the largest ocean on planet Earth by surface area?',
    options: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
    answer: 'Pacific Ocean',
    explanation: 'The Pacific Ocean covers over 30% of Earth’s surface, larger than all of Earth’s land area combined.',
    difficulty: 'easy',
  },
  {
    topic: 'geography',
    topicLabel: 'Geography & Wonders',
    topicEmoji: '🌍',
    question: 'What is the federal capital city of Australia?',
    options: ['Canberra', 'Sydney', 'Melbourne', 'Brisbane'],
    answer: 'Canberra',
    explanation: 'Canberra was chosen as the compromise capital in 1908 to resolve the rivalry between Sydney and Melbourne.',
    difficulty: 'easy',
  },
  {
    topic: 'geography',
    topicLabel: 'Geography & Wonders',
    topicEmoji: '🌍',
    question: 'TRICKY: What is the largest desert in the entire world by geographic surface area?',
    options: ['Antarctic Polar Desert', 'Sahara Desert', 'Arabian Desert', 'Gobi Desert'],
    answer: 'Antarctic Polar Desert',
    explanation: 'A desert is defined by low precipitation (<250mm/yr). Antarctica (~14.2 million km²) is the largest desert on Earth!',
    difficulty: 'medium',
  },
  {
    topic: 'geography',
    topicLabel: 'Geography & Wonders',
    topicEmoji: '🌍',
    question: 'TRICKY: Which country in the world contains the highest number of natural lakes?',
    options: ['Canada', 'Finland', 'Russia', 'United States'],
    answer: 'Canada',
    explanation: 'Canada holds over 60% of all the world’s natural lakes (over 879,000 lakes).',
    difficulty: 'medium',
  },
  {
    topic: 'geography',
    topicLabel: 'Geography & Wonders',
    topicEmoji: '🌍',
    question: 'TRICKY: In which European capital city is the iconic ancient Flavian Amphitheatre (Colosseum) located?',
    options: ['Rome', 'Athens', 'Madrid', 'Florence'],
    answer: 'Rome',
    explanation: 'The Colosseum was commissioned by Emperor Vespasian in AD 72 in the heart of Rome, Italy.',
    difficulty: 'easy',
  },

  // ==================== TECH & INVENTIONS ====================
  {
    topic: 'tech',
    topicLabel: 'Tech & Inventions',
    topicEmoji: '💻',
    question: 'What does the abbreviation "WWW" stand for in web internet addresses?',
    options: ['World Wide Web', 'World Wide Windows', 'Wide World Web', 'Web World Wide'],
    answer: 'World Wide Web',
    explanation: 'Sir Tim Berners-Lee invented the World Wide Web in 1989 while working at CERN.',
    difficulty: 'easy',
  },
  {
    topic: 'tech',
    topicLabel: 'Tech & Inventions',
    topicEmoji: '💻',
    question: 'Who co-founded Apple Computers in 1976 alongside Steve Wozniak in a garage?',
    options: ['Steve Jobs', 'Bill Gates', 'Paul Allen', 'Elon Musk'],
    answer: 'Steve Jobs',
    explanation: 'Steve Jobs, Steve Wozniak, and Ronald Wayne founded Apple Computer on April 1, 1976.',
    difficulty: 'easy',
  },
  {
    topic: 'tech',
    topicLabel: 'Tech & Inventions',
    topicEmoji: '💻',
    question: 'TRICKY: What was Google’s original research project name when Larry Page and Sergey Brin started it at Stanford?',
    options: ['BackRub', 'Googolplex', 'PageRanker', 'SearchMatrix'],
    answer: 'BackRub',
    explanation: 'The search engine was originally nicknamed "BackRub" because the system analyzed web backlinks.',
    difficulty: 'medium',
  },
  {
    topic: 'tech',
    topicLabel: 'Tech & Inventions',
    topicEmoji: '💻',
    question: 'TRICKY: Which ubiquitous web programming language was created in just 10 days in May 1995 by Brendan Eich?',
    options: ['JavaScript', 'Python', 'Java', 'PHP'],
    answer: 'JavaScript',
    explanation: 'Brendan Eich designed JavaScript in only 10 days while at Netscape Communications.',
    difficulty: 'medium',
  },
  {
    topic: 'tech',
    topicLabel: 'Tech & Inventions',
    topicEmoji: '💻',
    question: 'TRICKY: What material was the world’s very first computer mouse made out of by Douglas Engelbart in 1964?',
    options: ['Wood', 'Plastic', 'Aluminum', 'Bakelite'],
    answer: 'Wood',
    explanation: 'The first computer mouse prototype was hand-carved out of a block of wood with two metal wheels.',
    difficulty: 'medium',
  },

  // ==================== SPORTS & ATHLETICS ====================
  {
    topic: 'sports',
    topicLabel: 'Sports & Olympics',
    topicEmoji: '⚽',
    question: 'How many players are on the field for one team in a standard Cricket match?',
    options: ['11 players', '9 players', '10 players', '12 players'],
    answer: '11 players',
    explanation: 'A cricket side consists of eleven active players, including one designated captain and wicket-keeper.',
    difficulty: 'easy',
  },
  {
    topic: 'sports',
    topicLabel: 'Sports & Olympics',
    topicEmoji: '⚽',
    question: 'Which country has won the FIFA Men’s World Cup the most times in history (5 titles)?',
    options: ['Brazil', 'Germany', 'Italy', 'Argentina'],
    answer: 'Brazil',
    explanation: 'Brazil has won 5 FIFA World Cups (1958, 1962, 1970, 1994, 2002).',
    difficulty: 'easy',
  },
  {
    topic: 'sports',
    topicLabel: 'Sports & Olympics',
    topicEmoji: '⚽',
    question: 'TRICKY: What is the ONLY sport ever played on the surface of the Moon (by astronaut Alan Shepard during Apollo 14)?',
    options: ['Golf', 'Baseball', 'Tennis', 'Javelin'],
    answer: 'Golf',
    explanation: 'Astronaut Alan Shepard famously hit two golf balls on the lunar surface using a makeshift 6-iron club in 1971.',
    difficulty: 'medium',
  },
  {
    topic: 'sports',
    topicLabel: 'Sports & Olympics',
    topicEmoji: '⚽',
    question: 'TRICKY: What is the exact official distance of a standard Olympic marathon race?',
    options: ['42.195 km (26 miles 385 yards)', '40.000 km', '45.200 km', '50.000 km'],
    answer: '42.195 km (26 miles 385 yards)',
    explanation: 'Standardized at the 1908 London Olympics so the race would start at Windsor Castle and finish in front of the Royal Box.',
    difficulty: 'medium',
  },
];

// ---------------- 2. FACTUAL DATABASE ARRAYS FOR EXTENSIVE QUESTION POOLS ----------------
export const ELEMENTS_DB = [
  { name: 'Hydrogen', symbol: 'H', number: 1, mass: '1.008' },
  { name: 'Helium', symbol: 'He', number: 2, mass: '4.002' },
  { name: 'Lithium', symbol: 'Li', number: 3, mass: '6.94' },
  { name: 'Beryllium', symbol: 'Be', number: 4, mass: '9.012' },
  { name: 'Boron', symbol: 'B', number: 5, mass: '10.81' },
  { name: 'Carbon', symbol: 'C', number: 6, mass: '12.011' },
  { name: 'Nitrogen', symbol: 'N', number: 7, mass: '14.007' },
  { name: 'Oxygen', symbol: 'O', number: 8, mass: '15.999' },
  { name: 'Fluorine', symbol: 'F', number: 9, mass: '18.998' },
  { name: 'Neon', symbol: 'Ne', number: 10, mass: '20.180' },
  { name: 'Sodium', symbol: 'Na', number: 11, mass: '22.990' },
  { name: 'Magnesium', symbol: 'Mg', number: 12, mass: '24.305' },
  { name: 'Aluminum', symbol: 'Al', number: 13, mass: '26.982' },
  { name: 'Silicon', symbol: 'Si', number: 14, mass: '28.085' },
  { name: 'Phosphorus', symbol: 'P', number: 15, mass: '30.974' },
  { name: 'Sulfur', symbol: 'S', number: 16, mass: '32.06' },
  { name: 'Chlorine', symbol: 'Cl', number: 17, mass: '35.45' },
  { name: 'Argon', symbol: 'Ar', number: 18, mass: '39.948' },
  { name: 'Potassium', symbol: 'K', number: 19, mass: '39.098' },
  { name: 'Calcium', symbol: 'Ca', number: 20, mass: '40.078' },
  { name: 'Titanium', symbol: 'Ti', number: 22, mass: '47.867' },
  { name: 'Iron', symbol: 'Fe', number: 26, mass: '55.845' },
  { name: 'Copper', symbol: 'Cu', number: 29, mass: '63.546' },
  { name: 'Zinc', symbol: 'Zn', number: 30, mass: '65.38' },
  { name: 'Silver', symbol: 'Ag', number: 47, mass: '107.87' },
  { name: 'Tin', symbol: 'Sn', number: 50, mass: '118.71' },
  { name: 'Iodine', symbol: 'I', number: 53, mass: '126.90' },
  { name: 'Platinum', symbol: 'Pt', number: 78, mass: '195.08' },
  { name: 'Gold', symbol: 'Au', number: 79, mass: '196.97' },
  { name: 'Lead', symbol: 'Pb', number: 82, mass: '207.2' },
  { name: 'Uranium', symbol: 'U', number: 92, mass: '238.03' },
];

export const CAPITALS_DB = [
  { country: 'Japan', capital: 'Tokyo' },
  { country: 'France', capital: 'Paris' },
  { country: 'United Kingdom', capital: 'London' },
  { country: 'Germany', capital: 'Berlin' },
  { country: 'India', capital: 'New Delhi' },
  { country: 'Canada', capital: 'Ottawa' },
  { country: 'Australia', capital: 'Canberra' },
  { country: 'Brazil', capital: 'Brasília' },
  { country: 'Egypt', capital: 'Cairo' },
  { country: 'Italy', capital: 'Rome' },
  { country: 'Spain', capital: 'Madrid' },
  { country: 'South Korea', capital: 'Seoul' },
  { country: 'Argentina', capital: 'Buenos Aires' },
  { country: 'Mexico', capital: 'Mexico City' },
  { country: 'Turkey', capital: 'Ankara' },
  { country: 'South Africa', capital: 'Pretoria' },
  { country: 'Thailand', capital: 'Bangkok' },
  { country: 'New Zealand', capital: 'Wellington' },
  { country: 'Norway', capital: 'Oslo' },
  { country: 'Sweden', capital: 'Stockholm' },
  { country: 'Switzerland', capital: 'Bern' },
  { country: 'Netherlands', capital: 'Amsterdam' },
  { country: 'Greece', capital: 'Athens' },
  { country: 'Portugal', capital: 'Lisbon' },
  { country: 'Vietnam', capital: 'Hanoi' },
];

export const INVENTIONS_DB = [
  { invention: 'Telephone', inventor: 'Alexander Graham Bell', year: '1876' },
  { invention: 'Light Bulb', inventor: 'Thomas Edison', year: '1879' },
  { invention: 'World Wide Web', inventor: 'Tim Berners-Lee', year: '1989' },
  { invention: 'Airplane', inventor: 'Wright Brothers', year: '1903' },
  { invention: 'Penicillin', inventor: 'Alexander Fleming', year: '1928' },
  { invention: 'Radio', inventor: 'Guglielmo Marconi', year: '1895' },
  { invention: 'Polio Vaccine', inventor: 'Jonas Salk', year: '1953' },
  { invention: 'Steam Engine', inventor: 'James Watt', year: '1769' },
  { invention: 'Telescope', inventor: 'Hans Lippershey', year: '1608' },
  { invention: 'Printing Press', inventor: 'Johannes Gutenberg', year: '1440' },
];

export const SI_UNITS_DB = [
  { quantity: 'Force', unit: 'Newton (N)' },
  { quantity: 'Energy or Work', unit: 'Joule (J)' },
  { quantity: 'Power', unit: 'Watt (W)' },
  { quantity: 'Pressure', unit: 'Pascal (Pa)' },
  { quantity: 'Frequency', unit: 'Hertz (Hz)' },
  { quantity: 'Electric Potential', unit: 'Volt (V)' },
  { quantity: 'Electric Charge', unit: 'Coulomb (C)' },
  { quantity: 'Electric Capacitance', unit: 'Farad (F)' },
  { quantity: 'Magnetic Flux Density', unit: 'Tesla (T)' },
  { quantity: 'Inductance', unit: 'Henry (H)' },
  { quantity: 'Luminous Flux', unit: 'Lumen (lm)' },
  { quantity: 'Illuminance', unit: 'Lux (lx)' },
];

// Deterministic PRNG
function seededRand(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Deterministic Shuffle
function shuffleWithOptions<T>(array: T[], seed: number): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(seededRand(seed + i * 17) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// ---------------- 3. PROCEDURAL QUESTION GENERATION ENGINE ----------------
export function getQuizQuestionById(
  index: number,
  topic: QuizTopic = 'all',
  difficultyFilter: QuizDifficulty = 'all'
): QuizQuestion {
  // If requesting curated question
  const matchingCurated = CURATED_QUIZ_QUESTIONS.filter((q) => {
    const matchesTopic = topic === 'all' || q.topic === topic;
    const matchesDiff = difficultyFilter === 'all' || q.difficulty === difficultyFilter;
    return matchesTopic && matchesDiff;
  });

  if (matchingCurated.length > 0 && index < matchingCurated.length) {
    const item = matchingCurated[index % matchingCurated.length];
    return {
      id: `quiz-curated-${index}`,
      ...item,
    };
  }

  // Procedural generator
  const seed = index * 997 + 13;
  const chosenTopic: QuizTopic =
    topic !== 'all'
      ? topic
      : (['cinema', 'science', 'physics', 'chemistry', 'history', 'math', 'geography', 'tech', 'sports'] as QuizTopic[])[
          Math.floor(seededRand(seed) * 9)
        ];

  const difficulty: 'easy' | 'medium' = seededRand(seed + 1) > 0.5 ? 'medium' : 'easy';

  if (chosenTopic === 'chemistry') {
    const elIndex = Math.floor(seededRand(seed + 2) * ELEMENTS_DB.length);
    const target = ELEMENTS_DB[elIndex];
    const decoys = ELEMENTS_DB.filter((_, i) => i !== elIndex)
      .slice(0, 3)
      .map((e) => e.symbol);
    const options = shuffleWithOptions([target.symbol, ...decoys], seed + 3);

    return {
      id: `quiz-gen-${index}`,
      topic: 'chemistry',
      topicLabel: 'Chemistry & Elements',
      topicEmoji: '🧪',
      question: `What is the chemical symbol for ${target.name} (Atomic number ${target.number})?`,
      options,
      answer: target.symbol,
      explanation: `${target.name} has atomic number ${target.number} and chemical symbol ${target.symbol}.`,
      difficulty,
    };
  }

  if (chosenTopic === 'geography' || chosenTopic === 'history') {
    const capIndex = Math.floor(seededRand(seed + 4) * CAPITALS_DB.length);
    const target = CAPITALS_DB[capIndex];
    const decoys = CAPITALS_DB.filter((_, i) => i !== capIndex)
      .slice(0, 3)
      .map((c) => c.capital);
    const options = shuffleWithOptions([target.capital, ...decoys], seed + 5);

    return {
      id: `quiz-gen-${index}`,
      topic: 'geography',
      topicLabel: 'Geography & Capitals',
      topicEmoji: '🌍',
      question: `What is the capital city of ${target.country}?`,
      options,
      answer: target.capital,
      explanation: `${target.capital} is the recognized administrative capital of ${target.country}.`,
      difficulty,
    };
  }

  if (chosenTopic === 'physics') {
    const unitIndex = Math.floor(seededRand(seed + 6) * SI_UNITS_DB.length);
    const target = SI_UNITS_DB[unitIndex];
    const decoys = SI_UNITS_DB.filter((_, i) => i !== unitIndex)
      .slice(0, 3)
      .map((u) => u.unit);
    const options = shuffleWithOptions([target.unit, ...decoys], seed + 7);

    return {
      id: `quiz-gen-${index}`,
      topic: 'physics',
      topicLabel: 'Physics & Units',
      topicEmoji: '⚡',
      question: `What is the standard SI derived unit of ${target.quantity}?`,
      options,
      answer: target.unit,
      explanation: `The SI unit for ${target.quantity} is the ${target.unit}.`,
      difficulty,
    };
  }

  if (chosenTopic === 'tech') {
    const invIndex = Math.floor(seededRand(seed + 8) * INVENTIONS_DB.length);
    const target = INVENTIONS_DB[invIndex];
    const decoys = INVENTIONS_DB.filter((_, i) => i !== invIndex)
      .slice(0, 3)
      .map((inv) => inv.inventor);
    const options = shuffleWithOptions([target.inventor, ...decoys], seed + 9);

    return {
      id: `quiz-gen-${index}`,
      topic: 'tech',
      topicLabel: 'Tech & Inventions',
      topicEmoji: '💻',
      question: `Who is historically credited with the invention of the ${target.invention} (${target.year})?`,
      options,
      answer: target.inventor,
      explanation: `${target.inventor} pioneered the ${target.invention} around ${target.year}.`,
      difficulty,
    };
  }

  if (chosenTopic === 'math') {
    const a = Math.floor(seededRand(seed + 10) * 12) + 3;
    const b = Math.floor(seededRand(seed + 11) * 12) + 3;
    const product = a * b;
    const decoys = [product + 4, product - 3, product + 10].map(String);
    const options = shuffleWithOptions([String(product), ...decoys], seed + 12);

    return {
      id: `quiz-gen-${index}`,
      topic: 'math',
      topicLabel: 'Math & Logic',
      topicEmoji: '🧮',
      question: `What is the value of ${a} × ${b}?`,
      options,
      answer: String(product),
      explanation: `Calculation: ${a} × ${b} = ${product}.`,
      difficulty: 'easy',
    };
  }

  // Fallback: Cinema & Pop Culture trivia
  const cinemaTrivia = [
    { q: 'Which movie won the Oscar for Best Animated Feature for the first time in 2002?', a: 'Shrek', dec: ['Monsters, Inc.', 'Toy Story', 'Ice Age'] },
    { q: 'In Bollywood, who is widely celebrated with the title "King Khan"?', a: 'Shah Rukh Khan', dec: ['Salman Khan', 'Aamir Khan', 'Saif Ali Khan'] },
    { q: 'Which sci-fi epic directed by James Cameron became the highest grossing film worldwide?', a: 'Avatar', dec: ['Titanic', 'Avengers: Endgame', 'Star Wars'] },
    { q: 'Who portrayed the legendary Batman in Christopher Nolan’s Dark Knight Trilogy?', a: 'Christian Bale', dec: ['Ben Affleck', 'Michael Keaton', 'Robert Pattinson'] },
  ];
  const item = cinemaTrivia[Math.floor(seededRand(seed + 14) * cinemaTrivia.length)];
  const options = shuffleWithOptions([item.a, ...item.dec], seed + 15);

  return {
    id: `quiz-gen-${index}`,
    topic: 'cinema',
    topicLabel: 'Bollywood & Hollywood',
    topicEmoji: '🎬',
    question: item.q,
    options,
    answer: item.a,
    explanation: `${item.a} is globally celebrated in cinema history.`,
    difficulty: 'easy',
  };
}

// ---------------- 4. ROUND GENERATOR ----------------
export function generateQuizRound(
  roundNumber: number,
  topic: QuizTopic = 'all',
  count: number = 10,
  difficultyFilter: QuizDifficulty = 'all'
): QuizQuestion[] {
  const startIndex = (roundNumber - 1) * count;
  const questions: QuizQuestion[] = [];
  for (let i = 0; i < count; i++) {
    questions.push(getQuizQuestionById(startIndex + i, topic, difficultyFilter));
  }
  return questions;
}
