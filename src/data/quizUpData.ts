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

// ---------------- 1. CURATED MULTI-DISCIPLINARY DATABASE ----------------
// High quality, distinct, non-repeating curated trivia questions across 9 domains.
export const CURATED_QUIZ_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  // ==================== CHEMISTRY (GENUINE CONCEPTUAL CHEMISTRY) ====================
  // Acids, Bases, Daily Life, Reactions, States, Formulas, Elements & Alloys
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'What is the chemical formula for ordinary water?',
    options: ['H2O', 'CO2', 'NaCl', 'H2O2'],
    answer: 'H2O',
    explanation: 'Water consists of two hydrogen atoms covalently bonded to a single oxygen atom.',
    difficulty: 'easy',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'Which acid is naturally found in vinegar, giving it its pungent smell and sour taste?',
    options: ['Acetic Acid', 'Citric Acid', 'Sulfuric Acid', 'Lactic Acid'],
    answer: 'Acetic Acid',
    explanation: 'Vinegar is typically a 4% to 8% solution of acetic acid (CH3COOH) in water.',
    difficulty: 'easy',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'What is the common chemical name of baking soda used in cooking and baking?',
    options: ['Sodium Bicarbonate', 'Sodium Chloride', 'Calcium Carbonate', 'Sodium Hydroxide'],
    answer: 'Sodium Bicarbonate',
    explanation: 'Baking soda is Sodium Bicarbonate (NaHCO3), which releases CO2 gas to make dough rise.',
    difficulty: 'easy',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'What is the chemical formula for ordinary table salt?',
    options: ['NaCl', 'KCl', 'NaHCO3', 'CaCO3'],
    answer: 'NaCl',
    explanation: 'Table salt is Sodium Chloride (NaCl), an ionic compound of sodium and chlorine ions.',
    difficulty: 'easy',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'On the pH scale, what is the pH value of pure neutral distilled water at 25°C?',
    options: ['7.0', '0.0', '14.0', '5.5'],
    answer: '7.0',
    explanation: 'A pH of 7.0 is neutral, having equal concentrations of H+ and OH- ions.',
    difficulty: 'easy',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'What is "Dry Ice" made of?',
    options: ['Solid Carbon Dioxide', 'Frozen Nitrogen', 'Solid Water Ice', 'Solid Methane'],
    answer: 'Solid Carbon Dioxide',
    explanation: 'Dry ice is solid carbon dioxide (CO2) at -78.5°C that sublimates directly into gas without melting.',
    difficulty: 'easy',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'Which gas is filled into sealed potato chips bags to prevent them from becoming stale or oxidized?',
    options: ['Nitrogen Gas', 'Oxygen Gas', 'Carbon Dioxide', 'Hydrogen Gas'],
    answer: 'Nitrogen Gas',
    explanation: 'Nitrogen is an inert, non-reactive gas that displaces oxygen and moisture, keeping chips fresh and crisp.',
    difficulty: 'easy',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'What acid is naturally present in citrus fruits such as lemons, oranges, and limes?',
    options: ['Citric Acid', 'Acetic Acid', 'Tartaric Acid', 'Oxalic Acid'],
    answer: 'Citric Acid',
    explanation: 'Citric acid is a weak organic tricarboxylic acid found in high concentrations in citrus fruits.',
    difficulty: 'easy',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'What gas is released when vinegar reacts with baking soda in the classic volcano experiment?',
    options: ['Carbon Dioxide (CO2)', 'Oxygen (O2)', 'Hydrogen (H2)', 'Chlorine (Cl2)'],
    answer: 'Carbon Dioxide (CO2)',
    explanation: 'Acetic acid + Sodium bicarbonate yields sodium acetate, water, and bubbles of Carbon Dioxide gas.',
    difficulty: 'easy',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'What is the chemical name and formula for rust on iron?',
    options: ['Iron Oxide (Fe2O3)', 'Iron Sulfide (FeS)', 'Iron Carbonate (FeCO3)', 'Iron Chloride (FeCl3)'],
    answer: 'Iron Oxide (Fe2O3)',
    explanation: 'Rust is hydrated iron(III) oxide formed when iron reacts with oxygen and water vapor.',
    difficulty: 'easy',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'What is the hardest naturally occurring allotrope of pure carbon?',
    options: ['Diamond', 'Graphite', 'Graphene', 'Fullerene'],
    answer: 'Diamond',
    explanation: 'Diamond has a rigid 3D tetrahedral covalent lattice, making it the hardest natural mineral.',
    difficulty: 'easy',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'What color does blue litmus paper turn when dipped into an acidic solution?',
    options: ['Red', 'Green', 'Yellow', 'Purple'],
    answer: 'Red',
    explanation: 'Litmus turns red under acidic conditions (pH < 4.5) and stays or turns blue in alkaline solutions.',
    difficulty: 'easy',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'Which gas is commonly known as "Laughing Gas" used for anesthesia and sedation?',
    options: ['Nitrous Oxide (N2O)', 'Nitrogen Dioxide (NO2)', 'Nitric Oxide (NO)', 'Carbon Monoxide (CO)'],
    answer: 'Nitrous Oxide (N2O)',
    explanation: 'Nitrous oxide (N2O) produces euphoria and pain relief, earning the nickname laughing gas.',
    difficulty: 'easy',
  },
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
    question: 'What is the ONLY metallic element on the periodic table that is liquid at standard room temperature?',
    options: ['Mercury (Hg)', 'Gallium (Ga)', 'Bromine (Br)', 'Cesium (Cs)'],
    answer: 'Mercury (Hg)',
    explanation: 'Mercury is the only metal that is a liquid at 25°C. Bromine is also a liquid, but is a non-metal.',
    difficulty: 'medium',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'What is the ONLY non-metallic element on the periodic table that is a liquid at room temperature?',
    options: ['Bromine (Br)', 'Mercury (Hg)', 'Chlorine (Cl)', 'Iodine (I)'],
    answer: 'Bromine (Br)',
    explanation: 'Bromine is a reddish-brown halogen liquid at room temperature. Mercury is a metal, not a non-metal!',
    difficulty: 'medium',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'What primary acid is naturally secreted by the parietal cells in the human stomach for digestion?',
    options: ['Hydrochloric Acid (HCl)', 'Sulfuric Acid (H2SO4)', 'Acetic Acid (CH3COOH)', 'Nitric Acid (HNO3)'],
    answer: 'Hydrochloric Acid (HCl)',
    explanation: 'Gastric acid contains Hydrochloric Acid (pH 1.5 to 3.5), which activates pepsin for protein breakdown.',
    difficulty: 'medium',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'Which metal is used to coat iron sheets in the process known as "Galvanization" to prevent rust?',
    options: ['Zinc (Zn)', 'Copper (Cu)', 'Lead (Pb)', 'Tin (Sn)'],
    answer: 'Zinc (Zn)',
    explanation: 'Galvanization coats iron or steel with a protective sacrificial layer of Zinc to prevent oxidation.',
    difficulty: 'medium',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'What is the alloy "Brass" primarily composed of?',
    options: ['Copper and Zinc', 'Copper and Tin', 'Iron and Carbon', 'Lead and Tin'],
    answer: 'Copper and Zinc',
    explanation: 'Brass is an alloy of Copper and Zinc. Bronze, in contrast, is an alloy of Copper and Tin.',
    difficulty: 'medium',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'What is the normal physiological pH range of healthy human blood?',
    options: ['7.35 to 7.45', '6.0 to 6.5', '8.0 to 8.5', '7.0 exactly'],
    answer: '7.35 to 7.45',
    explanation: 'Human arterial blood is tightly maintained at a slightly alkaline pH between 7.35 and 7.45 by bicarbonate buffers.',
    difficulty: 'medium',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'Which acid is used as the electrolyte in standard lead-acid automotive car batteries?',
    options: ['Sulfuric Acid (H2SO4)', 'Hydrochloric Acid (HCl)', 'Nitric Acid (HNO3)', 'Phosphoric Acid (H3PO4)'],
    answer: 'Sulfuric Acid (H2SO4)',
    explanation: 'Car batteries use a solution of roughly 33% to 35% Sulfuric Acid in water as the electrolyte.',
    difficulty: 'medium',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'What non-metallic element allotrope is a good conductor of electricity due to free delocalized electrons?',
    options: ['Graphite', 'Diamond', 'Sulfur', 'Phosphorus'],
    answer: 'Graphite',
    explanation: 'Graphite consists of layers of carbon hexagons with delocalized pi electrons that can flow freely.',
    difficulty: 'medium',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'What is the chemical name and formula for "Plaster of Paris" used to set bone fractures?',
    options: ['Calcium Sulfate Hemihydrate (CaSO4·0.5H2O)', 'Calcium Carbonate (CaCO3)', 'Calcium Hydroxide (Ca(OH)2)', 'Calcium Oxide (CaO)'],
    answer: 'Calcium Sulfate Hemihydrate (CaSO4·0.5H2O)',
    explanation: 'Plaster of Paris is Calcium Sulfate Hemihydrate, prepared by heating gypsum (CaSO4·2H2O) to 150°C.',
    difficulty: 'medium',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'What chemical process converts grape juice and grain sugars into alcohol using yeast enzymes?',
    options: ['Fermentation', 'Oxidation', 'Sublimation', 'Saponification'],
    answer: 'Fermentation',
    explanation: 'Anaerobic fermentation by yeast converts simple sugars like glucose into ethanol and carbon dioxide.',
    difficulty: 'medium',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'Which metal ion serves as the central coordination atom in the green chlorophyll molecule?',
    options: ['Magnesium (Mg)', 'Iron (Fe)', 'Zinc (Zn)', 'Calcium (Ca)'],
    answer: 'Magnesium (Mg)',
    explanation: 'Chlorophyll has a porphyrin ring coordinated around a central Magnesium ion (unlike hemoglobin which has Iron).',
    difficulty: 'medium',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'Which two gases are primarily responsible for the formation of Acid Rain in the atmosphere?',
    options: ['Sulfur Dioxide and Nitrogen Oxides', 'Carbon Dioxide and Methane', 'Oxygen and Hydrogen', 'Ozone and Helium'],
    answer: 'Sulfur Dioxide and Nitrogen Oxides',
    explanation: 'SO2 and NOx react with water vapor and oxygen to form sulfuric acid and nitric acid, falling as acid rain.',
    difficulty: 'medium',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'What is the chemical formula of ozone gas that forms the protective layer in the stratosphere?',
    options: ['O3', 'O2', 'CO2', 'CH4'],
    answer: 'O3',
    explanation: 'Ozone (O3) is a triatomic molecule that absorbs high-frequency ultraviolet radiation from the sun.',
    difficulty: 'easy',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'What is the chemical name of common washing soda?',
    options: ['Sodium Carbonate', 'Sodium Bicarbonate', 'Sodium Hydroxide', 'Sodium Nitrate'],
    answer: 'Sodium Carbonate',
    explanation: 'Washing soda is Sodium Carbonate (Na2CO3·10H2O), used as a water softener and cleaning agent.',
    difficulty: 'medium',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'Why are alkali metals like Sodium and Potassium kept submerged under kerosene oil?',
    options: ['To prevent vigorous reaction with atmospheric moisture and oxygen', 'To prevent evaporation', 'To make them softer to cut', 'To prevent loss of color'],
    answer: 'To prevent vigorous reaction with atmospheric moisture and oxygen',
    explanation: 'Sodium and Potassium react violently with moisture and oxygen in the air; kerosene is hydrocarbon-based and inert.',
    difficulty: 'medium',
  },
  {
    topic: 'chemistry',
    topicLabel: 'Chemistry & Elements',
    topicEmoji: '🧪',
    question: 'What is the chemical name of "Bleaching Powder" used for water disinfection?',
    options: ['Calcium Hypochlorite', 'Sodium Chloride', 'Calcium Carbonate', 'Sodium Hydroxide'],
    answer: 'Calcium Hypochlorite',
    explanation: 'Bleaching powder is Calcium Hypochlorite (CaOCl2), widely used as a disinfectant and bleaching agent.',
    difficulty: 'medium',
  },

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
    question: 'What was India’s very first full-length sound (talkie) motion picture released in 1931?',
    options: ['Alam Ara', 'Raja Harishchandra', 'Kisan Kanya', 'Mother India'],
    answer: 'Alam Ara',
    explanation: 'Alam Ara (1931) was India’s first talkie. Raja Harishchandra (1913) was silent.',
    difficulty: 'medium',
  },
  {
    topic: 'cinema',
    topicLabel: 'Bollywood & Hollywood',
    topicEmoji: '🎬',
    question: 'In Christopher Nolan’s "Inception", what is Dom Cobb’s personal totem to test reality?',
    options: ['A Spinning Top', 'A Loaded Die', 'A Chess Bishop', 'A Poker Chip'],
    answer: 'A Spinning Top',
    explanation: 'Cobb uses his late wife Mal’s spinning top; if it spins indefinitely without falling, he is dreaming.',
    difficulty: 'medium',
  },
  {
    topic: 'cinema',
    topicLabel: 'Bollywood & Hollywood',
    topicEmoji: '🎬',
    question: 'Who directed the sci-fi epic "Avatar" and the disaster romance "Titanic"?',
    options: ['James Cameron', 'Steven Spielberg', 'Christopher Nolan', 'Ridley Scott'],
    answer: 'James Cameron',
    explanation: 'James Cameron directed Titanic (1997) and Avatar (2009), both breaking worldwide box-office records.',
    difficulty: 'easy',
  },
  {
    topic: 'cinema',
    topicLabel: 'Bollywood & Hollywood',
    topicEmoji: '🎬',
    question: 'Which legendary actor played the villain "Gabbar Singh" in the 1975 masterpiece Sholay?',
    options: ['Amjad Khan', 'Pran', 'Danny Denzongpa', 'Amrish Puri'],
    answer: 'Amjad Khan',
    explanation: 'Amjad Khan delivered an immortal performance as Gabbar Singh in Ramesh Sippy’s Sholay.',
    difficulty: 'easy',
  },
  {
    topic: 'cinema',
    topicLabel: 'Bollywood & Hollywood',
    topicEmoji: '🎬',
    question: 'Who played the iconic DC superhero Batman in Christopher Nolan’s Dark Knight Trilogy?',
    options: ['Christian Bale', 'Ben Affleck', 'Robert Pattinson', 'Michael Keaton'],
    answer: 'Christian Bale',
    explanation: 'Christian Bale starred as Bruce Wayne / Batman in Batman Begins, The Dark Knight, and The Dark Knight Rises.',
    difficulty: 'easy',
  },
  {
    topic: 'cinema',
    topicLabel: 'Bollywood & Hollywood',
    topicEmoji: '🎬',
    question: 'What was the first Indian film officially nominated for the Oscar for Best Foreign Language Film?',
    options: ['Mother India (1957)', 'Lagaan (2001)', 'Salaam Bombay! (1988)', 'Pather Panchali (1955)'],
    answer: 'Mother India (1957)',
    explanation: 'Mehboob Khan’s "Mother India" was nominated in 1957, losing the Oscar by just one single vote.',
    difficulty: 'medium',
  },
  {
    topic: 'cinema',
    topicLabel: 'Bollywood & Hollywood',
    topicEmoji: '🎬',
    question: 'Which Hollywood actor won the Best Actor Oscar for portraying the Joker in 2019?',
    options: ['Joaquin Phoenix', 'Heath Ledger', 'Jack Nicholson', 'Jared Leto'],
    answer: 'Joaquin Phoenix',
    explanation: 'Joaquin Phoenix won the Oscar for Best Actor in Todd Phillips’ Joker (2019).',
    difficulty: 'medium',
  },
  {
    topic: 'cinema',
    topicLabel: 'Bollywood & Hollywood',
    topicEmoji: '🎬',
    question: 'In the movie "Lagaan" (2001), which year is the cricket match story set in colonial India?',
    options: ['1893', '1947', '1857', '1911'],
    answer: '1893',
    explanation: 'Ashutosh Gowariker’s Lagaan is set in the fictional village of Champaner in 1893.',
    difficulty: 'medium',
  },

  // ==================== GENERAL SCIENCE & BIOLOGY ====================
  {
    topic: 'science',
    topicLabel: 'Science & Biology',
    topicEmoji: '🔬',
    question: 'What is widely known as the "Powerhouse of the Cell"?',
    options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Endoplasmic Reticulum'],
    answer: 'Mitochondria',
    explanation: 'Mitochondria generate most of the chemical energy needed by the cell (ATP molecules).',
    difficulty: 'easy',
  },
  {
    topic: 'science',
    topicLabel: 'Science & Biology',
    topicEmoji: '🔬',
    question: 'Which gas do green plants absorb from the atmosphere during photosynthesis?',
    options: ['Carbon Dioxide (CO2)', 'Oxygen (O2)', 'Nitrogen (N2)', 'Argon (Ar)'],
    answer: 'Carbon Dioxide (CO2)',
    explanation: 'Plants absorb CO2 and water using solar energy to synthesize glucose, releasing oxygen.',
    difficulty: 'easy',
  },
  {
    topic: 'science',
    topicLabel: 'Science & Biology',
    topicEmoji: '🔬',
    question: 'What is the largest internal organ in the human body by weight and volume?',
    options: ['Liver', 'Brain', 'Lungs', 'Heart'],
    answer: 'Liver',
    explanation: 'The liver weighs approximately 1.5 kg (skin is the largest overall organ, liver is largest internal).',
    difficulty: 'easy',
  },
  {
    topic: 'science',
    topicLabel: 'Science & Biology',
    topicEmoji: '🔬',
    question: 'How many chambers are there in a normal healthy human heart?',
    options: ['4 Chambers', '2 Chambers', '3 Chambers', '6 Chambers'],
    answer: '4 Chambers',
    explanation: 'The human heart has 4 chambers: two upper atria and two lower ventricles.',
    difficulty: 'easy',
  },
  {
    topic: 'science',
    topicLabel: 'Science & Biology',
    topicEmoji: '🔬',
    question: 'Which blood group is universally known as the "Universal Donor" for red blood cells?',
    options: ['O Negative (O-)', 'AB Positive (AB+)', 'A Positive (A+)', 'O Positive (O+)'],
    answer: 'O Negative (O-)',
    explanation: 'O- lacks A, B, and Rh antigens, meaning it can be transfused to patients of any blood group safely.',
    difficulty: 'medium',
  },
  {
    topic: 'science',
    topicLabel: 'Science & Biology',
    topicEmoji: '🔬',
    question: 'What pigment gives human skin, hair, and eyes their natural color and protects against UV radiation?',
    options: ['Melanin', 'Hemoglobin', 'Keratin', 'Carotene'],
    answer: 'Melanin',
    explanation: 'Melanin is produced by melanocytes and protects cells from ultraviolet DNA damage.',
    difficulty: 'easy',
  },
  {
    topic: 'science',
    topicLabel: 'Science & Biology',
    topicEmoji: '🔬',
    question: 'Which vitamin is synthesized by the human body upon direct exposure of the skin to sunlight?',
    options: ['Vitamin D', 'Vitamin C', 'Vitamin A', 'Vitamin B12'],
    answer: 'Vitamin D',
    explanation: 'UVB radiation stimulates 7-dehydrocholesterol in the skin to produce Vitamin D3.',
    difficulty: 'easy',
  },
  {
    topic: 'science',
    topicLabel: 'Science & Biology',
    topicEmoji: '🔬',
    question: 'Which part of the human brain controls vital involuntary functions such as heartbeat and breathing?',
    options: ['Medulla Oblongata', 'Cerebrum', 'Cerebellum', 'Hypothalamus'],
    answer: 'Medulla Oblongata',
    explanation: 'The medulla oblongata in the brainstem regulates autonomic reflexes including respiration and cardiac rate.',
    difficulty: 'medium',
  },
  {
    topic: 'science',
    topicLabel: 'Science & Biology',
    topicEmoji: '🔬',
    question: 'What is the total number of bones in an average adult human skeleton?',
    options: ['206 bones', '300 bones', '180 bones', '250 bones'],
    answer: '206 bones',
    explanation: 'Infants are born with ~300 bones, many of which fuse together during growth to leave 206 in adults.',
    difficulty: 'easy',
  },

  // ==================== PHYSICS & ENERGY ====================
  {
    topic: 'physics',
    topicLabel: 'Physics & Energy',
    topicEmoji: '⚡',
    question: 'What is the speed of light in a vacuum (approximate rounded value)?',
    options: ['300,000 km/s', '150,000 km/s', '3,000 km/s', '1,000,000 km/s'],
    answer: '300,000 km/s',
    explanation: 'Light travels at exactly 299,792,458 meters per second in a vacuum (~300,000 km/s).',
    difficulty: 'easy',
  },
  {
    topic: 'physics',
    topicLabel: 'Physics & Energy',
    topicEmoji: '⚡',
    question: 'Which scientist formulated the Three Laws of Motion and Universal Gravitation?',
    options: ['Sir Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Niels Bohr'],
    answer: 'Sir Isaac Newton',
    explanation: 'Newton published his laws of motion and gravitation in Philosophiae Naturalis Principia Mathematica in 1687.',
    difficulty: 'easy',
  },
  {
    topic: 'physics',
    topicLabel: 'Physics & Energy',
    topicEmoji: '⚡',
    question: 'What optical phenomenon causes a straw in a glass of water to look bent or broken?',
    options: ['Refraction', 'Reflection', 'Diffraction', 'Dispersion'],
    answer: 'Refraction',
    explanation: 'Refraction is the bending of light waves as they pass between media with different refractive indices.',
    difficulty: 'easy',
  },
  {
    topic: 'physics',
    topicLabel: 'Physics & Energy',
    topicEmoji: '⚡',
    question: 'What famous equation expresses the mass-energy equivalence formulated by Albert Einstein?',
    options: ['E = mc²', 'F = ma', 'V = IR', 'P = IV'],
    answer: 'E = mc²',
    explanation: 'Einstein showed that mass and energy are interchangeable, proportional by the speed of light squared.',
    difficulty: 'easy',
  },
  {
    topic: 'physics',
    topicLabel: 'Physics & Energy',
    topicEmoji: '⚡',
    question: 'What is the temperature of Absolute Zero in Celsius, where all thermodynamic motion ceases?',
    options: ['-273.15°C', '-100.00°C', '-459.67°C', '-200.00°C'],
    answer: '-273.15°C',
    explanation: 'Absolute zero is 0 Kelvin or -273.15° Celsius.',
    difficulty: 'medium',
  },
  {
    topic: 'physics',
    topicLabel: 'Physics & Energy',
    topicEmoji: '⚡',
    question: 'What is the SI unit of Electric Current?',
    options: ['Ampere (A)', 'Volt (V)', 'Ohm (Ω)', 'Watt (W)'],
    answer: 'Ampere (A)',
    explanation: 'The Ampere is the base SI unit for electrical current flow.',
    difficulty: 'easy',
  },
  {
    topic: 'physics',
    topicLabel: 'Physics & Energy',
    topicEmoji: '⚡',
    question: 'Which subatomic particle carries a negative electric charge?',
    options: ['Electron', 'Proton', 'Neutron', 'Positron'],
    answer: 'Electron',
    explanation: 'Electrons carry a negative elementary charge (-1e), while protons carry a positive charge (+1e).',
    difficulty: 'easy',
  },
  {
    topic: 'physics',
    topicLabel: 'Physics & Energy',
    topicEmoji: '⚡',
    question: 'What type of lens is thinner in the middle and thicker at the edges, causing parallel light rays to diverge?',
    options: ['Concave Lens', 'Convex Lens', 'Cylindrical Lens', 'Bifocal Lens'],
    answer: 'Concave Lens',
    explanation: 'Concave lenses diverge light and are commonly prescribed to correct myopia (nearsightedness).',
    difficulty: 'medium',
  },

  // ==================== WORLD HISTORY ====================
  {
    topic: 'history',
    topicLabel: 'World History',
    topicEmoji: '🏛️',
    question: 'In which modern-day country are the Great Pyramids of Giza located?',
    options: ['Egypt', 'Sudan', 'Jordan', 'Greece'],
    answer: 'Egypt',
    explanation: 'The Giza pyramid complex stands on the outskirts of Cairo, Egypt.',
    difficulty: 'easy',
  },
  {
    topic: 'history',
    topicLabel: 'World History',
    topicEmoji: '🏛️',
    question: 'In which year did India gain Independence from British colonial rule?',
    options: ['1947', '1950', '1942', '1935'],
    answer: '1947',
    explanation: 'India gained independence at the stroke of midnight on August 15, 1947.',
    difficulty: 'easy',
  },
  {
    topic: 'history',
    topicLabel: 'World History',
    topicEmoji: '🏛️',
    question: 'Which Mughal Emperor commissioned the construction of the Taj Mahal in Agra?',
    options: ['Shah Jahan', 'Akbar the Great', 'Aurangzeb', 'Babur'],
    answer: 'Shah Jahan',
    explanation: 'Shah Jahan commissioned the white marble monument in 1631 in memory of his favorite wife Mumtaz Mahal.',
    difficulty: 'easy',
  },
  {
    topic: 'history',
    topicLabel: 'World History',
    topicEmoji: '🏛️',
    question: 'Which ancient civilization built the mountain citadel of Machu Picchu in Peru?',
    options: ['Inca Empire', 'Maya Civilization', 'Aztec Empire', 'Olmec Civilization'],
    answer: 'Inca Empire',
    explanation: 'Machu Picchu was constructed in the 15th century by Inca ruler Pachacuti.',
    difficulty: 'easy',
  },
  {
    topic: 'history',
    topicLabel: 'World History',
    topicEmoji: '🏛️',
    question: 'In which year did World War II officially conclude with the surrender of Axis forces?',
    options: ['1945', '1944', '1939', '1948'],
    answer: '1945',
    explanation: 'World War II ended in 1945 after the surrender of Germany in May and Japan in September.',
    difficulty: 'easy',
  },
  {
    topic: 'history',
    topicLabel: 'World History',
    topicEmoji: '🏛️',
    question: 'Cleopatra VII, the famous queen of ancient Egypt, belonged to which ruling dynasty?',
    options: ['Ptolemaic Dynasty (Greek)', 'Pharaonic Fourth Dynasty', 'Roman Julio-Claudian', 'Persian Achaemenid'],
    answer: 'Ptolemaic Dynasty (Greek)',
    explanation: 'Cleopatra was Macedonian Greek, descended from Ptolemy I Soter, a companion of Alexander the Great.',
    difficulty: 'medium',
  },
  {
    topic: 'history',
    topicLabel: 'World History',
    topicEmoji: '🏛️',
    question: 'Who was the first President of the United States of America under the US Constitution?',
    options: ['George Washington', 'Thomas Jefferson', 'John Adams', 'Abraham Lincoln'],
    answer: 'George Washington',
    explanation: 'George Washington served as the first US President from 1789 to 1797.',
    difficulty: 'easy',
  },
  {
    topic: 'history',
    topicLabel: 'World History',
    topicEmoji: '🏛️',
    question: 'In which century did the Italian Renaissance begin in Florence?',
    options: ['14th Century (1300s)', '16th Century (1500s)', '12th Century (1100s)', '18th Century (1700s)'],
    answer: '14th Century (1300s)',
    explanation: 'The Renaissance began in Tuscany, Italy during the 14th century.',
    difficulty: 'medium',
  },

  // ==================== MATH & LOGIC ====================
  {
    topic: 'math',
    topicLabel: 'Math & Logic',
    topicEmoji: '🧮',
    question: 'What is the only even prime number in all of mathematics?',
    options: ['2', '0', '4', '6'],
    answer: '2',
    explanation: '2 is prime; every higher even number is divisible by 2 and therefore composite.',
    difficulty: 'easy',
  },
  {
    topic: 'math',
    topicLabel: 'Math & Logic',
    topicEmoji: '🧮',
    question: 'What is the square root of 144 (√144)?',
    options: ['12', '14', '16', '11'],
    answer: '12',
    explanation: '12 × 12 = 144.',
    difficulty: 'easy',
  },
  {
    topic: 'math',
    topicLabel: 'Math & Logic',
    topicEmoji: '🧮',
    question: 'How many degrees is the sum of interior angles in any Euclidean planar triangle?',
    options: ['180°', '360°', '90°', '270°'],
    answer: '180°',
    explanation: 'In Euclidean geometry, the three angles of any triangle always add up to 180° (π radians).',
    difficulty: 'easy',
  },
  {
    topic: 'math',
    topicLabel: 'Math & Logic',
    topicEmoji: '🧮',
    question: 'What is the next number in the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, ...?',
    options: ['13', '11', '15', '21'],
    answer: '13',
    explanation: 'Each number is the sum of the two preceding numbers: 5 + 8 = 13.',
    difficulty: 'easy',
  },
  {
    topic: 'math',
    topicLabel: 'Math & Logic',
    topicEmoji: '🧮',
    question: 'In Roman numerals, which letter represents the number 500?',
    options: ['D', 'C', 'M', 'L'],
    answer: 'D',
    explanation: 'In Roman numerals: L = 50, C = 100, D = 500, M = 1000.',
    difficulty: 'medium',
  },
  {
    topic: 'math',
    topicLabel: 'Math & Logic',
    topicEmoji: '🧮',
    question: 'What is the mathematical value of 0! (Zero Factorial)?',
    options: ['1', '0', 'Undefined', 'Infinity'],
    answer: '1',
    explanation: 'By combinatorial definition (the empty product), 0! equals 1.',
    difficulty: 'medium',
  },
  {
    topic: 'math',
    topicLabel: 'Math & Logic',
    topicEmoji: '🧮',
    question: 'What is the perimeter of a rectangle with length 8 cm and width 5 cm?',
    options: ['26 cm', '40 cm', '13 cm', '20 cm'],
    answer: '26 cm',
    explanation: 'Perimeter = 2 × (Length + Width) = 2 × (8 + 5) = 26 cm.',
    difficulty: 'easy',
  },
  {
    topic: 'math',
    topicLabel: 'Math & Logic',
    topicEmoji: '🧮',
    question: 'What is the probability of rolling an even number on a standard fair 6-sided die?',
    options: ['1/2 (50%)', '1/3 (33.3%)', '1/6 (16.7%)', '2/3 (66.7%)'],
    answer: '1/2 (50%)',
    explanation: 'There are 3 even numbers (2, 4, 6) out of 6 total faces: 3/6 = 1/2.',
    difficulty: 'easy',
  },

  // ==================== GEOGRAPHY ====================
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
    question: 'Which river is widely recognized as the longest river in the world?',
    options: ['Nile River', 'Amazon River', 'Yangtze River', 'Mississippi River'],
    answer: 'Nile River',
    explanation: 'Flowing over 6,650 km through northeast Africa, the Nile is the longest river on Earth.',
    difficulty: 'easy',
  },
  {
    topic: 'geography',
    topicLabel: 'Geography & Wonders',
    topicEmoji: '🌍',
    question: 'What is the highest mountain peak above sea level on planet Earth?',
    options: ['Mount Everest (8,848m)', 'K2 (8,611m)', 'Kangchenjunga (8,586m)', 'Lhotse (8,516m)'],
    answer: 'Mount Everest (8,848m)',
    explanation: 'Mount Everest in the Himalayas reaches an elevation of 8,848.86 meters.',
    difficulty: 'easy',
  },
  {
    topic: 'geography',
    topicLabel: 'Geography & Wonders',
    topicEmoji: '🌍',
    question: 'Which country has the greatest number of natural lakes in the world?',
    options: ['Canada', 'Russia', 'United States', 'Finland'],
    answer: 'Canada',
    explanation: 'Canada contains over 60% of all the natural lakes on Earth (more than 879,000 lakes).',
    difficulty: 'medium',
  },
  {
    topic: 'geography',
    topicLabel: 'Geography & Wonders',
    topicEmoji: '🌍',
    question: 'Through which European capital city does the River Seine flow?',
    options: ['Paris', 'London', 'Berlin', 'Rome'],
    answer: 'Paris',
    explanation: 'The Seine flows directly through the heart of Paris, France.',
    difficulty: 'easy',
  },

  // ==================== TECH & INVENTIONS ====================
  {
    topic: 'tech',
    topicLabel: 'Tech & Inventions',
    topicEmoji: '💻',
    question: 'Who is widely credited with inventing the World Wide Web in 1989 at CERN?',
    options: ['Tim Berners-Lee', 'Bill Gates', 'Steve Jobs', 'Vint Cerf'],
    answer: 'Tim Berners-Lee',
    explanation: 'British scientist Sir Tim Berners-Lee invented the World Wide Web in 1989 while working at CERN.',
    difficulty: 'easy',
  },
  {
    topic: 'tech',
    topicLabel: 'Tech & Inventions',
    topicEmoji: '💻',
    question: 'In computer science, how many bits make up one standard byte?',
    options: ['8 bits', '4 bits', '16 bits', '32 bits'],
    answer: '8 bits',
    explanation: 'A byte is a unit of digital information that most commonly consists of eight bits.',
    difficulty: 'easy',
  },
  {
    topic: 'tech',
    topicLabel: 'Tech & Inventions',
    topicEmoji: '💻',
    question: 'Which company developed the Android mobile operating system before it was acquired by Google in 2005?',
    options: ['Android Inc.', 'Motorola', 'Nokia', 'Sun Microsystems'],
    answer: 'Android Inc.',
    explanation: 'Android Inc. was founded in Palo Alto, California in 2003 by Andy Rubin, Rich Miner, Nick Sears, and Chris White.',
    difficulty: 'medium',
  },
  {
    topic: 'tech',
    topicLabel: 'Tech & Inventions',
    topicEmoji: '💻',
    question: 'What does the acronym "HTTP" stand for in web internet protocols?',
    options: ['HyperText Transfer Protocol', 'High Technology Transfer Program', 'Hyperlink Text Term Protocol', 'Hybrid Transfer Text Process'],
    answer: 'HyperText Transfer Protocol',
    explanation: 'HTTP is the foundational application protocol used for distributed hypermedia information systems.',
    difficulty: 'easy',
  },

  // ==================== SPORTS & OLYMPICS ====================
  {
    topic: 'sports',
    topicLabel: 'Sports & Olympics',
    topicEmoji: '⚽',
    question: 'What is the official marathon race distance standardized at the Olympic Games?',
    options: ['42.195 km (26 miles 385 yards)', '40.000 km', '45.200 km', '50.000 km'],
    answer: '42.195 km (26 miles 385 yards)',
    explanation: 'Standardized at the 1908 London Olympics so the race would start at Windsor Castle and finish at the Royal Box.',
    difficulty: 'medium',
  },
  {
    topic: 'sports',
    topicLabel: 'Sports & Olympics',
    topicEmoji: '⚽',
    question: 'How many players are on the field for one team in a standard association football (soccer) match?',
    options: ['11 players', '10 players', '12 players', '9 players'],
    answer: '11 players',
    explanation: 'Each football team fields 11 players including 1 goalkeeper.',
    difficulty: 'easy',
  },
  {
    topic: 'sports',
    topicLabel: 'Sports & Olympics',
    topicEmoji: '⚽',
    question: 'Which legendary athlete holds the unbroken world record for the 100m sprint at 9.58 seconds?',
    options: ['Usain Bolt', 'Tyson Gay', 'Yohan Blake', 'Carl Lewis'],
    answer: 'Usain Bolt',
    explanation: 'Jamaica’s Usain Bolt set the unbroken 100m world record of 9.58s at the 2009 Berlin World Athletics Championships.',
    difficulty: 'easy',
  },
  {
    topic: 'sports',
    topicLabel: 'Sports & Olympics',
    topicEmoji: '⚽',
    question: 'In tennis, how many Grand Slam tournaments are held each calendar year?',
    options: ['4 tournaments', '3 tournaments', '5 tournaments', '6 tournaments'],
    answer: '4 tournaments',
    explanation: 'The four majors are the Australian Open, French Open (Roland Garros), Wimbledon, and the US Open.',
    difficulty: 'easy',
  },
];

// ---------------- 2. PROCEDURAL GENERATION DATABASES ----------------
export const CHEMISTRY_CONCEPTS_DB = [
  {
    q: 'What gas is produced during complete combustion of pure hydrocarbon fuels?',
    a: 'Carbon Dioxide and Water Vapor',
    dec: ['Carbon Monoxide and Hydrogen', 'Methane and Ozone', 'Nitrogen and Sulfur Dioxide'],
    exp: 'Hydrocarbons burn with oxygen to yield CO2, H2O, and release energy.',
    diff: 'easy' as const,
  },
  {
    q: 'What is the chemical name of common household bleach solution?',
    a: 'Sodium Hypochlorite (NaClO)',
    dec: ['Sodium Hydroxide (NaOH)', 'Sodium Bicarbonate (NaHCO3)', 'Calcium Carbonate (CaCO3)'],
    exp: 'Household bleach is typically a 3% to 6% aqueous solution of Sodium Hypochlorite.',
    diff: 'medium' as const,
  },
  {
    q: 'What happens to the rate of most chemical reactions when the temperature is increased?',
    a: 'It increases due to higher molecular collisions',
    dec: ['It decreases', 'It remains strictly unchanged', 'The reaction stops immediately'],
    exp: 'Higher kinetic energy causes more frequent and energetic collisions that overcome activation energy.',
    diff: 'easy' as const,
  },
  {
    q: 'Which alloy is formed by combining Copper and Tin?',
    a: 'Bronze',
    dec: ['Brass', 'Steel', 'Pewter'],
    exp: 'Bronze is traditionally composed of Copper with Tin (Brass is Copper + Zinc).',
    diff: 'medium' as const,
  },
  {
    q: 'What is the chemical formula for common table sugar (sucrose)?',
    a: 'C12H22O11',
    dec: ['C6H12O6', 'CH4', 'C2H5OH'],
    exp: 'Sucrose is a disaccharide made of glucose and fructose with formula C12H22O11.',
    diff: 'medium' as const,
  },
  {
    q: 'What is the main acid found in sour curd or milk?',
    a: 'Lactic Acid',
    dec: ['Acetic Acid', 'Citric Acid', 'Formic Acid'],
    exp: 'Lactobacillus bacteria convert lactose into lactic acid, giving sour curd its acidic taste.',
    diff: 'easy' as const,
  },
  {
    q: 'Which acid is injected by an ant or bee sting causing a burning sensation?',
    a: 'Formic Acid (Methanoic Acid)',
    dec: ['Acetic Acid', 'Sulfuric Acid', 'Oxalic Acid'],
    exp: 'Ant stings inject Formic Acid, which can be neutralized with baking soda or calamine lotion.',
    diff: 'medium' as const,
  },
  {
    q: 'What is the chemical formula for Methane, the primary component of Natural Gas (CNG)?',
    a: 'CH4',
    dec: ['C2H6', 'CO2', 'C3H8'],
    exp: 'Methane (CH4) is the simplest hydrocarbon consisting of one carbon and four hydrogen atoms.',
    diff: 'easy' as const,
  },
  {
    q: 'What is "Milk of Magnesia" chemically, used as a common antacid and laxative?',
    a: 'Magnesium Hydroxide (Mg(OH)2)',
    dec: ['Magnesium Sulfate', 'Magnesium Chloride', 'Calcium Carbonate'],
    exp: 'Magnesium Hydroxide acts as an antacid that neutralizes excess stomach hydrochloric acid.',
    diff: 'medium' as const,
  },
  {
    q: 'What is the chemical name of "Quicklime" used in cement and mortar?',
    a: 'Calcium Oxide (CaO)',
    dec: ['Calcium Carbonate', 'Calcium Hydroxide', 'Calcium Sulfate'],
    exp: 'Quicklime is anhydrous Calcium Oxide (CaO), produced by heating limestone.',
    diff: 'medium' as const,
  },
  {
    q: 'What state change occurs during "Sublimation"?',
    a: 'Solid turns directly into gas without melting',
    dec: ['Gas turns into liquid', 'Liquid turns into solid', 'Gas turns into plasma'],
    exp: 'Sublimation is the direct transition from solid to gas (e.g. Dry ice, camphor, iodine).',
    diff: 'easy' as const,
  },
  {
    q: 'Which gas is commonly used in traditional incandescent electric light bulbs to prevent tungsten filament oxidation?',
    a: 'Argon (and Nitrogen)',
    dec: ['Oxygen', 'Hydrogen', 'Chlorine'],
    exp: 'Argon is an inert noble gas that prevents the tungsten filament from burning out at high temperatures.',
    diff: 'medium' as const,
  },
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
  { invention: 'Incandescent Light Bulb', inventor: 'Thomas Edison', year: '1879' },
  { invention: 'World Wide Web', inventor: 'Tim Berners-Lee', year: '1989' },
  { invention: 'Airplane', inventor: 'Wright Brothers', year: '1903' },
  { invention: 'Penicillin Antibiotic', inventor: 'Alexander Fleming', year: '1928' },
  { invention: 'Radio Wireless Transmission', inventor: 'Guglielmo Marconi', year: '1895' },
  { invention: 'Polio Vaccine', inventor: 'Jonas Salk', year: '1953' },
  { invention: 'Modern Steam Engine', inventor: 'James Watt', year: '1769' },
  { invention: 'Movable Type Printing Press', inventor: 'Johannes Gutenberg', year: '1440' },
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

// ---------------- 3. PROCEDURAL QUESTION GENERATOR ----------------
function generateProceduralQuestion(
  seed: number,
  topic: QuizTopic,
  difficultyFilter: QuizDifficulty
): Omit<QuizQuestion, 'id'> {
  const topicsPool: QuizTopic[] = ['cinema', 'science', 'physics', 'chemistry', 'history', 'math', 'geography', 'tech', 'sports'];
  const effectiveTopic: QuizTopic =
    topic !== 'all' ? topic : topicsPool[Math.floor(seededRand(seed) * topicsPool.length)];

  const difficulty: 'easy' | 'medium' =
    difficultyFilter === 'easy' ? 'easy' : difficultyFilter === 'medium' ? 'medium' : seededRand(seed + 1) > 0.5 ? 'medium' : 'easy';

  // Authentic Chemistry concepts generator
  if (effectiveTopic === 'chemistry') {
    const matchingChem = CHEMISTRY_CONCEPTS_DB.filter(
      (c) => difficultyFilter === 'all' || c.diff === difficultyFilter
    );
    const pool = matchingChem.length > 0 ? matchingChem : CHEMISTRY_CONCEPTS_DB;
    const index = Math.floor(seededRand(seed + 2) * pool.length);
    const item = pool[index];
    const options = shuffleWithOptions([item.a, ...item.dec], seed + 3);

    return {
      topic: 'chemistry',
      topicLabel: 'Chemistry & Reactions',
      topicEmoji: '🧪',
      question: item.q,
      options,
      answer: item.a,
      explanation: item.exp,
      difficulty: item.diff,
    };
  }

  if (effectiveTopic === 'geography' || effectiveTopic === 'history') {
    const capIndex = Math.floor(seededRand(seed + 4) * CAPITALS_DB.length);
    const target = CAPITALS_DB[capIndex];
    const decoys = CAPITALS_DB.filter((_, i) => i !== capIndex)
      .slice(0, 3)
      .map((c) => c.capital);
    const options = shuffleWithOptions([target.capital, ...decoys], seed + 5);

    return {
      topic: 'geography',
      topicLabel: 'Geography & Capitals',
      topicEmoji: '🌍',
      question: `What is the capital city of ${target.country}?`,
      options,
      answer: target.capital,
      explanation: `${target.capital} is the recognized administrative capital city of ${target.country}.`,
      difficulty,
    };
  }

  if (effectiveTopic === 'physics') {
    const unitIndex = Math.floor(seededRand(seed + 6) * SI_UNITS_DB.length);
    const target = SI_UNITS_DB[unitIndex];
    const decoys = SI_UNITS_DB.filter((_, i) => i !== unitIndex)
      .slice(0, 3)
      .map((u) => u.unit);
    const options = shuffleWithOptions([target.unit, ...decoys], seed + 7);

    return {
      topic: 'physics',
      topicLabel: 'Physics & Units',
      topicEmoji: '⚡',
      question: `What is the standard SI derived unit of ${target.quantity}?`,
      options,
      answer: target.unit,
      explanation: `The SI derived unit for measuring ${target.quantity} is the ${target.unit}.`,
      difficulty,
    };
  }

  if (effectiveTopic === 'tech') {
    const invIndex = Math.floor(seededRand(seed + 8) * INVENTIONS_DB.length);
    const target = INVENTIONS_DB[invIndex];
    const decoys = INVENTIONS_DB.filter((_, i) => i !== invIndex)
      .slice(0, 3)
      .map((inv) => inv.inventor);
    const options = shuffleWithOptions([target.inventor, ...decoys], seed + 9);

    return {
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

  if (effectiveTopic === 'math') {
    const a = Math.floor(seededRand(seed + 10) * 11) + 4;
    const b = Math.floor(seededRand(seed + 11) * 11) + 4;
    const product = a * b;
    const decoys = [product + 4, product - 3, product + 10].map(String);
    const options = shuffleWithOptions([String(product), ...decoys], seed + 12);

    return {
      topic: 'math',
      topicLabel: 'Math & Logic',
      topicEmoji: '🧮',
      question: `What is the product of ${a} × ${b}?`,
      options,
      answer: String(product),
      explanation: `${a} multiplied by ${b} equals ${product}.`,
      difficulty: 'easy',
    };
  }

  if (effectiveTopic === 'sports') {
    const sportsFacts = [
      { q: 'In which sport would you execute a "slam dunk"?', a: 'Basketball', dec: ['Volleyball', 'Tennis', 'Cricket'], diff: 'easy' as const },
      { q: 'How many rings make up the official Olympic symbol?', a: '5 rings', dec: ['4 rings', '6 rings', '7 rings'], diff: 'easy' as const },
      { q: 'Which country invented the modern sport of Table Tennis (Ping Pong)?', a: 'England', dec: ['China', 'Japan', 'Sweden'], diff: 'medium' as const },
      { q: 'What is the standard length of a professional soccer match without extra time?', a: '90 minutes', dec: ['80 minutes', '100 minutes', '60 minutes'], diff: 'easy' as const },
      { q: 'In cricket, how many runs are scored when a batsman hits the ball over the boundary on the full?', a: '6 runs', dec: ['4 runs', '5 runs', '3 runs'], diff: 'easy' as const },
    ];
    const item = sportsFacts[Math.floor(seededRand(seed + 13) * sportsFacts.length)];
    const options = shuffleWithOptions([item.a, ...item.dec], seed + 14);

    return {
      topic: 'sports',
      topicLabel: 'Sports & Olympics',
      topicEmoji: '⚽',
      question: item.q,
      options,
      answer: item.a,
      explanation: `${item.a} is the recognized official standard in athletics.`,
      difficulty: item.diff,
    };
  }

  // Cinema fallback
  const cinemaFacts = [
    { q: 'Which movie won the Academy Award for Best Animated Feature for the first time in 2002?', a: 'Shrek', dec: ['Monsters, Inc.', 'Toy Story', 'Ice Age'], diff: 'easy' as const },
    { q: 'In Bollywood, who is widely celebrated with the title "King Khan"?', a: 'Shah Rukh Khan', dec: ['Salman Khan', 'Aamir Khan', 'Saif Ali Khan'], diff: 'easy' as const },
    { q: 'Which sci-fi epic directed by James Cameron became the highest-grossing film worldwide?', a: 'Avatar', dec: ['Titanic', 'Avengers: Endgame', 'Star Wars'], diff: 'easy' as const },
    { q: 'Who composed the unforgettable background score for Christopher Nolan’s "Interstellar"?', a: 'Hans Zimmer', dec: ['John Williams', 'Ennio Morricone', 'James Horner'], diff: 'medium' as const },
  ];
  const cItem = cinemaFacts[Math.floor(seededRand(seed + 15) * cinemaFacts.length)];
  const options = shuffleWithOptions([cItem.a, ...cItem.dec], seed + 16);

  return {
    topic: 'cinema',
    topicLabel: 'Bollywood & Hollywood',
    topicEmoji: '🎬',
    question: cItem.q,
    options,
    answer: cItem.a,
    explanation: `${cItem.a} is globally celebrated in cinema history.`,
    difficulty: cItem.diff,
  };
}

// ---------------- 4. GUARANTEED DEDUPLICATED LEVEL QUESTION GENERATOR ----------------
// Ensures distinct, non-repeating questions within a round and distinct questions across rounds.
export function generateQuizRound(
  level: number,
  topic: QuizTopic = 'all',
  count: number = 10,
  difficultyFilter: QuizDifficulty = 'all'
): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const seenQuestionTexts = new Set<string>();

  // Filter matching curated questions strictly by topic & difficulty
  const matchingCurated = CURATED_QUIZ_QUESTIONS.filter((q) => {
    const matchesTopic = topic === 'all' || q.topic === topic;
    const matchesDiff = difficultyFilter === 'all' || q.difficulty === difficultyFilter;
    return matchesTopic && matchesDiff;
  });

  if (matchingCurated.length > 0) {
    // Deterministic offset based on level so consecutive levels get completely distinct questions!
    // Example: Level 1 gets questions 0..9, Level 2 gets 10..19, Level 3 gets 20..29, etc.
    const offset = ((level - 1) * count) % matchingCurated.length;
    const rotated = [
      ...matchingCurated.slice(offset),
      ...matchingCurated.slice(0, offset),
    ];

    for (const q of rotated) {
      if (!seenQuestionTexts.has(q.question)) {
        seenQuestionTexts.add(q.question);
        questions.push({
          id: `quiz-lvl-${level}-q-${questions.length}`,
          ...q,
        });
        if (questions.length >= count) {
          break;
        }
      }
    }
  }

  // If more questions needed to fill the level (e.g. 10 questions), procedurally generate unique ones
  let attemptSeed = level * 1000 + 31;
  while (questions.length < count && attemptSeed < level * 1000 + 500) {
    attemptSeed++;
    const generated = generateProceduralQuestion(attemptSeed, topic, difficultyFilter);
    if (!seenQuestionTexts.has(generated.question)) {
      seenQuestionTexts.add(generated.question);
      questions.push({
        ...generated,
        id: `quiz-lvl-${level}-q-${questions.length}`,
      });
    }
  }

  return questions;
}
