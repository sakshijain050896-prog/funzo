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

export const TOPICS_CONFIG: {
  id: QuizTopic;
  label: string;
  emoji: string;
  desc: string;
  bg: string;
  text: string;
  border: string;
}[] = [
  { id: 'all', label: 'All Topics', emoji: '🌟', desc: 'Mix of every domain', bg: 'bg-amber-100 dark:bg-amber-950/40', text: 'text-amber-800 dark:text-amber-300', border: 'border-amber-300' },
  { id: 'cinema', label: 'Cinema (Bolly/Holly)', emoji: '🎬', desc: 'Movies, Directors, Actors & Oscars', bg: 'bg-rose-100 dark:bg-rose-950/40', text: 'text-rose-800 dark:text-rose-300', border: 'border-rose-300' },
  { id: 'science', label: 'Science & Biology', emoji: '🔬', desc: 'Living organisms, human body & nature', bg: 'bg-emerald-100 dark:bg-emerald-950/40', text: 'text-emerald-800 dark:text-emerald-300', border: 'border-emerald-300' },
  { id: 'physics', label: 'Physics & Energy', emoji: '⚡', desc: 'Forces, motion, light, astronomy & laws', bg: 'bg-cyan-100 dark:bg-cyan-950/40', text: 'text-cyan-800 dark:text-cyan-300', border: 'border-cyan-300' },
  { id: 'chemistry', label: 'Chemistry & Elements', emoji: '🧪', desc: 'Acids, bases, reactions & formulas', bg: 'bg-indigo-100 dark:bg-indigo-950/40', text: 'text-indigo-800 dark:text-indigo-300', border: 'border-indigo-300' },
  { id: 'history', label: 'World History', emoji: '🏛️', desc: 'Empires, wars, leaders & ancient wonders', bg: 'bg-amber-100 dark:bg-amber-950/40', text: 'text-amber-800 dark:text-amber-300', border: 'border-amber-300' },
  { id: 'math', label: 'Math & Logic', emoji: '🧮', desc: 'Numbers, algebra, geometry & patterns', bg: 'bg-purple-100 dark:bg-purple-950/40', text: 'text-purple-800 dark:text-purple-300', border: 'border-purple-300' },
  { id: 'geography', label: 'Geography & Wonders', emoji: '🌍', desc: 'Countries, oceans, rivers & capitals', bg: 'bg-teal-100 dark:bg-teal-950/40', text: 'text-teal-800 dark:text-teal-300', border: 'border-teal-300' },
  { id: 'tech', label: 'Tech & Inventions', emoji: '💻', desc: 'Computers, AI, internet & pioneers', bg: 'bg-sky-100 dark:bg-sky-950/40', text: 'text-sky-800 dark:text-sky-300', border: 'border-sky-300' },
  { id: 'sports', label: 'Sports & Olympics', emoji: '⚽', desc: 'Cricket, Football, Tennis & records', bg: 'bg-orange-100 dark:bg-orange-950/40', text: 'text-orange-800 dark:text-orange-300', border: 'border-orange-300' },
];

// ---------------- 1. CURATED MULTI-DISCIPLINARY DATABASE ----------------
// High quality, distinct, non-repeating curated trivia questions across 9 domains.
// Partitioned by 10 questions per level:
// Level 1: [0..9], Level 2: [10..19], Level 3: [20..29], Level 4: [30..39]
export const CURATED_QUIZ_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "In the iconic Bollywood film 'Dilwale Dulhania Le Jayenge' (DDLJ), who played Raj Malhotra?",
    "options": [
      "Shah Rukh Khan",
      "Salman Khan",
      "Aamir Khan",
      "Akshay Kumar"
    ],
    "answer": "Shah Rukh Khan",
    "explanation": "Shah Rukh Khan portrayed Raj Malhotra in the 1995 cult classic directed by Aditya Chopra.",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Which Indian song won the Academy Award (Oscar) for Best Original Song in 2023?",
    "options": [
      "Naatu Naatu (RRR)",
      "Jai Ho (Slumdog Millionaire)",
      "Chhaiya Chhaiya (Dil Se)",
      "Kesariya (Brahmastra)"
    ],
    "answer": "Naatu Naatu (RRR)",
    "explanation": "Composed by M. M. Keeravani with lyrics by Chandrabose, Naatu Naatu won the Oscar for RRR.",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Who played Tony Stark / Iron Man in the Marvel Cinematic Universe starting in 2008?",
    "options": [
      "Robert Downey Jr.",
      "Chris Evans",
      "Chris Hemsworth",
      "Christian Bale"
    ],
    "answer": "Robert Downey Jr.",
    "explanation": "Robert Downey Jr. launched the MCU with Iron Man (2008) and played the hero for over a decade.",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "In the classic movie '3 Idiots', what was Rancho\u2019s real legal identity revealed to be?",
    "options": [
      "Phunsukh Wangdu",
      "Chhote Lal",
      "Ranchhoddas Chanchad",
      "Manmohan"
    ],
    "answer": "Phunsukh Wangdu",
    "explanation": "Rancho was actually Phunsukh Wangdu, a genius scientist living in Ladakh with 400 patents.",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "What was India\u2019s very first full-length sound (talkie) motion picture released in 1931?",
    "options": [
      "Alam Ara",
      "Raja Harishchandra",
      "Kisan Kanya",
      "Mother India"
    ],
    "answer": "Alam Ara",
    "explanation": "Alam Ara (1931) was India\u2019s first talkie. Raja Harishchandra (1913) was silent.",
    "difficulty": "medium"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "In Christopher Nolan\u2019s 'Inception', what is Dom Cobb\u2019s personal totem to test reality?",
    "options": [
      "A Spinning Top",
      "A Loaded Die",
      "A Chess Bishop",
      "A Poker Chip"
    ],
    "answer": "A Spinning Top",
    "explanation": "Cobb uses his late wife Mal\u2019s spinning top; if it spins indefinitely without falling, he is dreaming.",
    "difficulty": "medium"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Who directed the sci-fi epic 'Avatar' and the disaster romance 'Titanic'?",
    "options": [
      "James Cameron",
      "Steven Spielberg",
      "Christopher Nolan",
      "Ridley Scott"
    ],
    "answer": "James Cameron",
    "explanation": "James Cameron directed Titanic (1997) and Avatar (2009), both breaking worldwide box-office records.",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Which legendary actor played the villain 'Gabbar Singh' in the 1975 masterpiece Sholay?",
    "options": [
      "Amjad Khan",
      "Pran",
      "Danny Denzongpa",
      "Amrish Puri"
    ],
    "answer": "Amjad Khan",
    "explanation": "Amjad Khan delivered an immortal performance as Gabbar Singh in Ramesh Sippy\u2019s Sholay.",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Who played the DC superhero Batman in Christopher Nolan\u2019s Dark Knight Trilogy?",
    "options": [
      "Christian Bale",
      "Ben Affleck",
      "Robert Pattinson",
      "Michael Keaton"
    ],
    "answer": "Christian Bale",
    "explanation": "Christian Bale starred as Bruce Wayne / Batman in Batman Begins, The Dark Knight, and The Dark Knight Rises.",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "What was the first Indian film officially nominated for the Oscar for Best Foreign Language Film?",
    "options": [
      "Mother India (1957)",
      "Lagaan (2001)",
      "Salaam Bombay! (1988)",
      "Pather Panchali (1955)"
    ],
    "answer": "Mother India (1957)",
    "explanation": "Mehboob Khan\u2019s 'Mother India' was nominated in 1957, losing the Oscar by just one single vote.",
    "difficulty": "medium"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Which Hollywood actor won the Best Actor Oscar for portraying Arthur Fleck in Joker (2019)?",
    "options": [
      "Joaquin Phoenix",
      "Heath Ledger",
      "Jack Nicholson",
      "Jared Leto"
    ],
    "answer": "Joaquin Phoenix",
    "explanation": "Joaquin Phoenix won the Oscar for Best Actor in Todd Phillips\u2019 Joker (2019).",
    "difficulty": "medium"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "In the movie 'Lagaan' (2001), which year is the cricket match story set in colonial India?",
    "options": [
      "1893",
      "1947",
      "1857",
      "1911"
    ],
    "answer": "1893",
    "explanation": "Ashutosh Gowariker\u2019s Lagaan is set in the fictional village of Champaner in 1893.",
    "difficulty": "medium"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "In 'Dangal' (2016), which real-life wrestling coach and father was portrayed by Aamir Khan?",
    "options": [
      "Mahavir Singh Phogat",
      "Satpal Singh",
      "Chandgi Ram",
      "Bishambar Singh"
    ],
    "answer": "Mahavir Singh Phogat",
    "explanation": "Aamir Khan portrayed Mahavir Singh Phogat, who trained his daughters Geeta and Babita to become Commonwealth champions.",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "In 'Star Wars: The Empire Strikes Back', who speaks the iconic line 'No, I am your father'?",
    "options": [
      "Darth Vader",
      "Obi-Wan Kenobi",
      "Yoda",
      "Emperor Palpatine"
    ],
    "answer": "Darth Vader",
    "explanation": "Darth Vader reveals this stunning truth to Luke Skywalker during their climactic duel in Cloud City.",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Who played Neo (Thomas Anderson) in the groundbreaking sci-fi film 'The Matrix' (1999)?",
    "options": [
      "Keanu Reeves",
      "Laurence Fishburne",
      "Hugo Weaving",
      "Brad Pitt"
    ],
    "answer": "Keanu Reeves",
    "explanation": "Keanu Reeves played Neo, the prophesied 'One' who awakens from the simulated reality of the Matrix.",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Which visionary Indian filmmaker directed the pan-India blockbuster franchise 'Baahubali'?",
    "options": [
      "S. S. Rajamouli",
      "Prashanth Neel",
      "Mani Ratnam",
      "Shankar"
    ],
    "answer": "S. S. Rajamouli",
    "explanation": "S. S. Rajamouli directed Baahubali: The Beginning and Baahubali: The Conclusion, setting Indian cinema milestones.",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Which legendary actor played Don Vito Corleone in Francis Ford Coppola\u2019s 'The Godfather' (1972)?",
    "options": [
      "Marlon Brando",
      "Al Pacino",
      "Robert De Niro",
      "James Caan"
    ],
    "answer": "Marlon Brando",
    "explanation": "Marlon Brando won the Academy Award for Best Actor for his portrayal of the Corleone family patriarch.",
    "difficulty": "medium"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "What was the first full-length cel-animated feature film in history, released by Walt Disney in 1937?",
    "options": [
      "Snow White and the Seven Dwarfs",
      "Pinocchio",
      "Fantasia",
      "Bambi"
    ],
    "answer": "Snow White and the Seven Dwarfs",
    "explanation": "Released in December 1937, Snow White was Disney\u2019s pioneering feature animation achievement.",
    "difficulty": "medium"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Which Bollywood film holds the record for the longest continuous theatrical run at Mumbai\u2019s Maratha Mandir?",
    "options": [
      "Dilwale Dulhania Le Jayenge",
      "Sholay",
      "Mughal-e-Azam",
      "Hum Aapke Hain Koun..!"
    ],
    "answer": "Dilwale Dulhania Le Jayenge",
    "explanation": "DDLJ has been screening continuously at Maratha Mandir theater in Mumbai for over 28 years since October 1995.",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Who directed the dinosaur thriller masterpiece 'Jurassic Park' (1993)?",
    "options": [
      "Steven Spielberg",
      "George Lucas",
      "James Cameron",
      "Peter Jackson"
    ],
    "answer": "Steven Spielberg",
    "explanation": "Steven Spielberg directed Jurassic Park, revolutionizing visual effects and computer-generated imagery in cinema.",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Who composed the unforgettable background score for Christopher Nolan\u2019s 'Interstellar'?",
    "options": [
      "Hans Zimmer",
      "John Williams",
      "Ennio Morricone",
      "James Horner"
    ],
    "answer": "Hans Zimmer",
    "explanation": "Hans Zimmer composed the iconic pipe-organ score for Interstellar, recorded at Temple Church in London.",
    "difficulty": "medium"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Which Indian screen legend is celebrated across the nation with the honorific 'Big B' and 'Shahenshah'?",
    "options": [
      "Amitabh Bachchan",
      "Dharmendra",
      "Rajesh Khanna",
      "Vinod Khanna"
    ],
    "answer": "Amitabh Bachchan",
    "explanation": "Amitabh Bachchan has dominated Indian cinema for over five decades since rising to fame in the 1970s.",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Who directed the cult classic films 'Pulp Fiction' (1994) and 'Kill Bill' (2003)?",
    "options": [
      "Quentin Tarantino",
      "Martin Scorsese",
      "David Fincher",
      "Coen Brothers"
    ],
    "answer": "Quentin Tarantino",
    "explanation": "Quentin Tarantino is celebrated for his nonlinear storytelling and stylized dialogue in Pulp Fiction and Kill Bill.",
    "difficulty": "medium"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Who was the first Indian ever to win an Academy Award (Oscar), awarded for Costume Design in 'Gandhi' (1982)?",
    "options": [
      "Bhanu Athaiya",
      "Satyajit Ray",
      "A. R. Rahman",
      "Resul Pookutty"
    ],
    "answer": "Bhanu Athaiya",
    "explanation": "Bhanu Athaiya won the Best Costume Design Oscar in 1983 for Richard Attenborough\u2019s biographical film Gandhi.",
    "difficulty": "medium"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Which British actor portrayed the title boy wizard in all eight 'Harry Potter' films?",
    "options": [
      "Daniel Radcliffe",
      "Rupert Grint",
      "Tom Felton",
      "Eddie Redmayne"
    ],
    "answer": "Daniel Radcliffe",
    "explanation": "Daniel Radcliffe starred as Harry Potter from The Philosopher\u2019s Stone (2001) to Deathly Hallows Part 2 (2011).",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "In the acclaimed film 'Taare Zameen Par' (2007), what specific learning disability did 8-year-old Ishaan struggle with?",
    "options": [
      "Dyslexia",
      "ADHD",
      "Dyscalculia",
      "Autism Spectrum"
    ],
    "answer": "Dyslexia",
    "explanation": "Ishaan had dyslexia, and art teacher Ram Shankar Nikumbh (Aamir Khan) helped him discover his artistic genius.",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Which fantasy epic swept all 11 Academy Awards it was nominated for in 2004, including Best Picture?",
    "options": [
      "The Lord of the Rings: The Return of the King",
      "Gladiator",
      "Braveheart",
      "Titanic"
    ],
    "answer": "The Lord of the Rings: The Return of the King",
    "explanation": "Peter Jackson\u2019s The Return of the King tied Titanic and Ben-Hur with an all-time record of 11 Oscar wins.",
    "difficulty": "medium"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "In the 1987 sci-fi superhero classic 'Mr. India', which villain famously delivered the line 'Mogambo Khush Hua'?",
    "options": [
      "Amrish Puri",
      "Prem Chopra",
      "Kulbhushan Kharbanda",
      "Sadashiv Amrapurkar"
    ],
    "answer": "Amrish Puri",
    "explanation": "Amrish Puri\u2019s villainous character Mogambo became one of the most quotable antagonists in Indian cinema history.",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Which Irish actor won the Best Actor Oscar for playing J. Robert Oppenheimer in Christopher Nolan\u2019s 'Oppenheimer' (2023)?",
    "options": [
      "Cillian Murphy",
      "Robert Downey Jr.",
      "Matt Damon",
      "Kenneth Branagh"
    ],
    "answer": "Cillian Murphy",
    "explanation": "Cillian Murphy earned widespread acclaim and the Academy Award for portraying the 'Father of the Atomic Bomb'.",
    "difficulty": "medium"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Which Indian cinematic master directed 'Pather Panchali' (1955) and received an honorary lifetime Oscar in 1992?",
    "options": [
      "Satyajit Ray",
      "Ritwik Ghatak",
      "Mrinal Sen",
      "Guru Dutt"
    ],
    "answer": "Satyajit Ray",
    "explanation": "Satyajit Ray was awarded an Honorary Academy Award in 1992 in recognition of his rare mastery of the art of motion pictures.",
    "difficulty": "medium"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Who became the youngest person to win the Academy Award for Best Director at age 32 for 'La La Land'?",
    "options": [
      "Damien Chazelle",
      "Christopher Nolan",
      "Greta Gerwig",
      "Jordan Peele"
    ],
    "answer": "Damien Chazelle",
    "explanation": "Damien Chazelle won Best Director for the musical La La Land (2016) at 32 years of age.",
    "difficulty": "medium"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Which Bollywood espionage action film launched the YRF Spy Universe in 2012 starring Salman Khan and Katrina Kaif?",
    "options": [
      "Ek Tha Tiger",
      "War",
      "Pathaan",
      "Tiger Zinda Hai"
    ],
    "answer": "Ek Tha Tiger",
    "explanation": "Kabir Khan\u2019s Ek Tha Tiger introduced RAW agent Tiger and ISI agent Zoya, launching the interconnected franchise.",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "In the 1994 classic 'Forrest Gump', which actor won back-to-back Best Actor Oscars playing Forrest?",
    "options": [
      "Tom Hanks",
      "Robin Williams",
      "Kevin Costner",
      "Denzel Washington"
    ],
    "answer": "Tom Hanks",
    "explanation": "Tom Hanks won Best Actor for Philadelphia in 1993 and Forrest Gump in 1994.",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Who directed the gritty two-part Indian crime saga 'Gangs of Wasseypur' (2012)?",
    "options": [
      "Anurag Kashyap",
      "Vishal Bhardwaj",
      "Ram Gopal Varma",
      "Dibakar Banerjee"
    ],
    "answer": "Anurag Kashyap",
    "explanation": "Anurag Kashyap directed the sprawling coal-mafia drama Gangs of Wasseypur, screened at Cannes Film Festival.",
    "difficulty": "medium"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "In 'The Shawshank Redemption' (1994), what tool did Andy Dufresne use over 19 years to dig through his prison cell wall?",
    "options": [
      "A Small Rock Hammer",
      "A Kitchen Spoon",
      "An Iron Chisel",
      "A Screwdriver"
    ],
    "answer": "A Small Rock Hammer",
    "explanation": "Andy requested a small rock hammer from Red, concealing his tunnel behind posters of Rita Hayworth and Raquel Welch.",
    "difficulty": "medium"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "In the sports drama 'Chak De! India' (2007), Shah Rukh Khan coached which national sports squad?",
    "options": [
      "Indian Women\u2019s National Field Hockey Team",
      "Indian National Cricket Team",
      "Indian Women\u2019s Football Team",
      "Indian Badminton Squad"
    ],
    "answer": "Indian Women\u2019s National Field Hockey Team",
    "explanation": "Kabir Khan (SRK) coached the underdog Indian women\u2019s hockey team to the World Cup championship in Australia.",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "Who starred as the Roman general turned gladiator Maximus Decimus Meridius in Ridley Scott\u2019s 'Gladiator' (2000)?",
    "options": [
      "Russell Crowe",
      "Joaquin Phoenix",
      "Mel Gibson",
      "Gerard Butler"
    ],
    "answer": "Russell Crowe",
    "explanation": "Russell Crowe won the Best Actor Oscar for his unforgettable performance as Maximus.",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "In the 2014 comedy-drama 'Queen', to which European cities does Rani (Kangana Ranaut) travel solo on her honeymoon?",
    "options": [
      "Paris and Amsterdam",
      "London and Rome",
      "Berlin and Vienna",
      "Madrid and Barcelona"
    ],
    "answer": "Paris and Amsterdam",
    "explanation": "After being abandoned before her wedding, Rani embarks on her honeymoon to Paris and Amsterdam, rediscovering herself.",
    "difficulty": "easy"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "In David Fincher\u2019s 'Fight Club' (1999), who played the soap salesman and rebellious anarchist Tyler Durden?",
    "options": [
      "Brad Pitt",
      "Edward Norton",
      "Jared Leto",
      "Christian Bale"
    ],
    "answer": "Brad Pitt",
    "explanation": "Brad Pitt starred as Tyler Durden alongside Edward Norton\u2019s unnamed Narrator.",
    "difficulty": "medium"
  },
  {
    "topic": "cinema",
    "topicLabel": "Bollywood & Hollywood",
    "topicEmoji": "\ud83c\udfac",
    "question": "In the 1975 classic 'Deewaar', who delivered the iconic punchline 'Mere paas maa hai'?",
    "options": [
      "Shashi Kapoor (playing Ravi)",
      "Amitabh Bachchan (playing Vijay)",
      "Nirupa Roy",
      "Sanjeev Kumar"
    ],
    "answer": "Shashi Kapoor (playing Ravi)",
    "explanation": "When Vijay boasts of his skyscrapers and wealth, policeman brother Ravi silences him with 'Mere paas maa hai'.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "What is widely known as the 'Powerhouse of the Cell'?",
    "options": [
      "Mitochondria",
      "Nucleus",
      "Ribosome",
      "Endoplasmic Reticulum"
    ],
    "answer": "Mitochondria",
    "explanation": "Mitochondria generate most of the chemical energy needed by the cell (ATP molecules).",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Which gas do green plants absorb from the atmosphere during photosynthesis?",
    "options": [
      "Carbon Dioxide (CO2)",
      "Oxygen (O2)",
      "Nitrogen (N2)",
      "Argon (Ar)"
    ],
    "answer": "Carbon Dioxide (CO2)",
    "explanation": "Plants absorb CO2 and water using solar energy to synthesize glucose, releasing oxygen.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "What is the largest internal organ in the human body by weight and volume?",
    "options": [
      "Liver",
      "Brain",
      "Lungs",
      "Heart"
    ],
    "answer": "Liver",
    "explanation": "The liver weighs approximately 1.5 kg (skin is the largest overall organ, liver is largest internal).",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "How many chambers are there in a normal healthy human heart?",
    "options": [
      "4 Chambers",
      "2 Chambers",
      "3 Chambers",
      "6 Chambers"
    ],
    "answer": "4 Chambers",
    "explanation": "The human heart has 4 chambers: two upper atria and two lower ventricles.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Which blood group is universally known as the 'Universal Donor' for red blood cells?",
    "options": [
      "O Negative (O-)",
      "AB Positive (AB+)",
      "A Positive (A+)",
      "O Positive (O+)"
    ],
    "answer": "O Negative (O-)",
    "explanation": "O- lacks A, B, and Rh antigens, meaning it can be transfused to patients of any blood group safely.",
    "difficulty": "medium"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "What pigment gives human skin, hair, and eyes their natural color and protects against UV radiation?",
    "options": [
      "Melanin",
      "Hemoglobin",
      "Keratin",
      "Carotene"
    ],
    "answer": "Melanin",
    "explanation": "Melanin is produced by melanocytes and protects cells from ultraviolet DNA damage.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Which vitamin is synthesized by the human body upon direct exposure of the skin to sunlight?",
    "options": [
      "Vitamin D",
      "Vitamin C",
      "Vitamin A",
      "Vitamin B12"
    ],
    "answer": "Vitamin D",
    "explanation": "UVB radiation stimulates 7-dehydrocholesterol in the skin to produce Vitamin D3.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Which part of the human brain controls vital involuntary functions such as heartbeat and breathing?",
    "options": [
      "Medulla Oblongata",
      "Cerebrum",
      "Cerebellum",
      "Hypothalamus"
    ],
    "answer": "Medulla Oblongata",
    "explanation": "The medulla oblongata in the brainstem regulates autonomic reflexes including respiration and cardiac rate.",
    "difficulty": "medium"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "What is the total number of bones in an average adult human skeleton?",
    "options": [
      "206 bones",
      "300 bones",
      "180 bones",
      "250 bones"
    ],
    "answer": "206 bones",
    "explanation": "Infants are born with ~300 bones, many of which fuse together during growth to leave 206 in adults.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Which iron-rich protein in red blood cells binds to oxygen and carries it throughout the body?",
    "options": [
      "Hemoglobin",
      "Myoglobin",
      "Albumin",
      "Fibrinogen"
    ],
    "answer": "Hemoglobin",
    "explanation": "Hemoglobin contains four heme groups with iron that reversibly bind oxygen molecules.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Which cellular organelle in green plant cells contains chlorophyll and carries out photosynthesis?",
    "options": [
      "Chloroplast",
      "Mitochondria",
      "Vacuole",
      "Golgi Apparatus"
    ],
    "answer": "Chloroplast",
    "explanation": "Chloroplasts capture light energy via thylakoid membranes to synthesize sugars.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Who discovered the structural double-helix model of DNA in 1953 alongside Rosalind Franklin\u2019s X-ray data?",
    "options": [
      "James Watson and Francis Crick",
      "Gregor Mendel",
      "Louis Pasteur",
      "Alexander Fleming"
    ],
    "answer": "James Watson and Francis Crick",
    "explanation": "Watson and Crick published the iconic double-helix model of DNA in Nature in April 1953.",
    "difficulty": "medium"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "What is the largest known single biological cell in the animal kingdom?",
    "options": [
      "Ostrich Egg",
      "Human Ovum",
      "Giraffe Nerve Cell",
      "Amoeba"
    ],
    "answer": "Ostrich Egg",
    "explanation": "An unfertilized ostrich egg is a single cell weighing around 1.4 kilograms.",
    "difficulty": "medium"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Which digestive enzyme in human saliva begins the breakdown of complex starches into simple maltose?",
    "options": [
      "Salivary Amylase (Ptyalin)",
      "Pepsin",
      "Lipase",
      "Trypsin"
    ],
    "answer": "Salivary Amylase (Ptyalin)",
    "explanation": "Amylase in saliva initiates carbohydrate digestion in the mouth.",
    "difficulty": "medium"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Which component of human blood is primarily responsible for defending against infectious diseases and foreign pathogens?",
    "options": [
      "White Blood Cells (Leukocytes)",
      "Red Blood Cells (Erythrocytes)",
      "Platelets (Thrombocytes)",
      "Plasma Proteins"
    ],
    "answer": "White Blood Cells (Leukocytes)",
    "explanation": "Leukocytes include neutrophils, lymphocytes, and macrophages that form the immune defense.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Which pea-sized master endocrine gland at the base of the brain regulates growth and other hormone glands?",
    "options": [
      "Pituitary Gland",
      "Thyroid Gland",
      "Adrenal Gland",
      "Pineal Gland"
    ],
    "answer": "Pituitary Gland",
    "explanation": "The pituitary gland secretes hormones that control the thyroid, adrenal cortex, and gonads.",
    "difficulty": "medium"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "What is the longest and strongest bone in the human body, situated in the upper leg?",
    "options": [
      "Femur (Thigh Bone)",
      "Tibia (Shin Bone)",
      "Humerus (Upper Arm)",
      "Fibula"
    ],
    "answer": "Femur (Thigh Bone)",
    "explanation": "The femur supports significant weight and is both the longest and strongest human bone.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "By what process do plants lose water vapor into the atmosphere primarily through leaf stomata?",
    "options": [
      "Transpiration",
      "Respiration",
      "Osmosis",
      "Gutting"
    ],
    "answer": "Transpiration",
    "explanation": "Transpiration creates the negative pressure pull that draws water from roots to treetops.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Which vector insect is exclusively responsible for transmitting the malaria parasite Plasmodium to humans?",
    "options": [
      "Female Anopheles Mosquito",
      "Male Aedes Mosquito",
      "Tsetse Fly",
      "Housefly"
    ],
    "answer": "Female Anopheles Mosquito",
    "explanation": "Female Anopheles mosquitoes require blood meals to nurture their eggs, transmitting Plasmodium sporozoites.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "What is the fundamental functional and structural filtration unit of the human kidney?",
    "options": [
      "Nephron",
      "Neuron",
      "Alveolus",
      "Villus"
    ],
    "answer": "Nephron",
    "explanation": "Each human kidney contains roughly one million microscopic nephrons that filter blood into urine.",
    "difficulty": "medium"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Which four nitrogenous bases make up the genetic code in double-stranded DNA?",
    "options": [
      "Adenine, Thymine, Cytosine, Guanine",
      "Adenine, Uracil, Cytosine, Guanine",
      "Thymine, Uracil, Cytosine, Guanine",
      "Adenine, Thymine, Uracil, Lysine"
    ],
    "answer": "Adenine, Thymine, Cytosine, Guanine",
    "explanation": "A pairs with T and C pairs with G in DNA. Uracil replaces Thymine only in RNA.",
    "difficulty": "medium"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Severe dietary deficiency of Vitamin C leads to which historic nutritional deficiency disorder?",
    "options": [
      "Scurvy",
      "Rickets",
      "Beriberi",
      "Pellagra"
    ],
    "answer": "Scurvy",
    "explanation": "Vitamin C is required for collagen synthesis; its lack leads to bleeding gums, skin spots, and lethargy.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "What dense fibrous connective tissue anchors skeletal muscles securely to bones?",
    "options": [
      "Tendon",
      "Ligament",
      "Cartilage",
      "Fascia"
    ],
    "answer": "Tendon",
    "explanation": "Tendons connect muscle to bone, whereas ligaments connect bone to bone across joints.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "What is considered the normal average resting core body temperature in healthy human adults in Celsius?",
    "options": [
      "37.0\u00b0C (98.6\u00b0F)",
      "35.5\u00b0C (95.9\u00b0F)",
      "39.0\u00b0C (102.2\u00b0F)",
      "38.2\u00b0C (100.8\u00b0F)"
    ],
    "answer": "37.0\u00b0C (98.6\u00b0F)",
    "explanation": "Human core body temperature is homeostatically regulated around 36.5\u00b0C to 37.5\u00b0C.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Which class of cold-blooded vertebrates begins life as aquatic larvae breathing with gills and matures into air-breathing adults?",
    "options": [
      "Amphibians",
      "Reptiles",
      "Fish",
      "Crustaceans"
    ],
    "answer": "Amphibians",
    "explanation": "Amphibians like frogs and salamanders undergo metamorphosis from aquatic tadpoles to terrestrial adults.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "A lichen is a classic mutualistic symbiotic organism composed of a fungus and which partner?",
    "options": [
      "Alga or Cyanobacteria",
      "Fern",
      "Moss",
      "Virus"
    ],
    "answer": "Alga or Cyanobacteria",
    "explanation": "The fungus provides structural shelter and moisture, while photosynthetic algae supply carbohydrates.",
    "difficulty": "medium"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Which vital peptide hormone produced by the beta cells of the pancreas facilitates cellular glucose uptake?",
    "options": [
      "Insulin",
      "Glucagon",
      "Adrenaline",
      "Thyroxine"
    ],
    "answer": "Insulin",
    "explanation": "Insulin allows cells in muscles and adipose tissue to absorb circulating glucose from blood.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Severe deficiency of Vitamin A in children primarily impairs vision, causing which condition?",
    "options": [
      "Night Blindness (Nyctalopia)",
      "Color Blindness",
      "Cataracts",
      "Glaucoma"
    ],
    "answer": "Night Blindness (Nyctalopia)",
    "explanation": "Vitamin A is essential for rhodopsin synthesis in retina rod cells responsible for low-light vision.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "What is the biological term for organisms that manufacture their own food from sunlight and inorganic substances?",
    "options": [
      "Autotrophs (Producers)",
      "Heterotrophs",
      "Saprotrophs",
      "Decomposers"
    ],
    "answer": "Autotrophs (Producers)",
    "explanation": "Autotrophs such as green plants and algae synthesize organic molecules using photosynthesis.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Which specialized microscopic air sacs in the human lungs are the primary site of gas exchange with capillaries?",
    "options": [
      "Alveoli",
      "Bronchioles",
      "Trachea",
      "Pleura"
    ],
    "answer": "Alveoli",
    "explanation": "Over 400 million alveoli provide ~100 square meters of surface area for oxygen and CO2 diffusion.",
    "difficulty": "medium"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "What is the largest artery in the human body, carrying oxygenated blood straight from the left ventricle?",
    "options": [
      "Aorta",
      "Carotid Artery",
      "Femoral Artery",
      "Pulmonary Artery"
    ],
    "answer": "Aorta",
    "explanation": "The aorta distributes oxygen-rich blood to all systemic circulatory branches throughout the body.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "In which primary organ of the human digestive tract does approximately 90% of food nutrient absorption occur?",
    "options": [
      "Small Intestine",
      "Stomach",
      "Large Intestine",
      "Esophagus"
    ],
    "answer": "Small Intestine",
    "explanation": "The villi and microvilli of the duodenum, jejunum, and ileum absorb amino acids, sugars, and fatty acids.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "What type of synovial joint in the human shoulder and hip affords the widest range of rotational motion?",
    "options": [
      "Ball and Socket Joint",
      "Hinge Joint",
      "Pivot Joint",
      "Saddle Joint"
    ],
    "answer": "Ball and Socket Joint",
    "explanation": "The spherical head of the humerus/femur rests inside a cup-like socket allowing triaxial motion.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Dietary deficiency of elemental Iron results in reduced hemoglobin synthesis, causing which medical disorder?",
    "options": [
      "Anemia",
      "Goiter",
      "Osteoporosis",
      "Rickets"
    ],
    "answer": "Anemia",
    "explanation": "Iron-deficiency anemia leads to fatigue, pale complexion, and reduced blood oxygen transport capacity.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Which are the only mammals on Earth capable of true, sustained self-powered flapping flight?",
    "options": [
      "Bats",
      "Flying Squirrels",
      "Sugar Gliders",
      "Colugos"
    ],
    "answer": "Bats",
    "explanation": "Bats (order Chiroptera) have webbed forelimbs functioning as true wings; other mammals only glide.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Which colored circular muscle of the human eye expands and contracts to regulate the diameter of the pupil?",
    "options": [
      "Iris",
      "Cornea",
      "Retina",
      "Sclera"
    ],
    "answer": "Iris",
    "explanation": "The iris controls the amount of light entering through the pupil into the inner eye.",
    "difficulty": "easy"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Which symbiotic bacteria inhabit root nodules of leguminous plants and fix atmospheric nitrogen into nitrates?",
    "options": [
      "Rhizobium",
      "Escherichia coli",
      "Lactobacillus",
      "Streptococcus"
    ],
    "answer": "Rhizobium",
    "explanation": "Rhizobia provide nitrogenous nutrients to legumes in exchange for plant carbon and shelter.",
    "difficulty": "medium"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Which fat-soluble vitamin plays an indispensable role in blood coagulation and clotting factor synthesis?",
    "options": [
      "Vitamin K",
      "Vitamin E",
      "Vitamin D",
      "Vitamin B6"
    ],
    "answer": "Vitamin K",
    "explanation": "Vitamin K is a cofactor for enzymes modifying prothrombin and blood clotting factors VII, IX, and X.",
    "difficulty": "medium"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "What is the biological process called where cells self-destruct in a programmed, organized manner?",
    "options": [
      "Apoptosis",
      "Necrosis",
      "Phagocytosis",
      "Mitosis"
    ],
    "answer": "Apoptosis",
    "explanation": "Apoptosis is programmed cell death critical for tissue sculpting, immune regulation, and cancer prevention.",
    "difficulty": "medium"
  },
  {
    "topic": "science",
    "topicLabel": "Science & Biology",
    "topicEmoji": "\ud83d\udd2c",
    "question": "Which plant hormone gas promotes the ripening of climacteric fruits such as bananas, apples, and tomatoes?",
    "options": [
      "Ethylene (C2H4)",
      "Auxin",
      "Gibberellin",
      "Cytokinin"
    ],
    "answer": "Ethylene (C2H4)",
    "explanation": "Ethylene triggers enzymatic softening, starch-to-sugar conversion, and color changes during fruit ripening.",
    "difficulty": "medium"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "What is the speed of light in a vacuum (approximate rounded value)?",
    "options": [
      "300,000 km/s",
      "150,000 km/s",
      "3,000 km/s",
      "1,000,000 km/s"
    ],
    "answer": "300,000 km/s",
    "explanation": "Light travels at exactly 299,792,458 meters per second in a vacuum (~300,000 km/s).",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "Which scientist formulated the Three Laws of Motion and Universal Gravitation?",
    "options": [
      "Sir Isaac Newton",
      "Albert Einstein",
      "Galileo Galilei",
      "Niels Bohr"
    ],
    "answer": "Sir Isaac Newton",
    "explanation": "Newton published his laws of motion and gravitation in Philosophiae Naturalis Principia Mathematica in 1687.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "What optical phenomenon causes a straw in a glass of water to look bent or broken?",
    "options": [
      "Refraction",
      "Reflection",
      "Diffraction",
      "Dispersion"
    ],
    "answer": "Refraction",
    "explanation": "Refraction is the bending of light waves as they pass between media with different refractive indices.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "What famous equation expresses the mass-energy equivalence formulated by Albert Einstein?",
    "options": [
      "E = mc\u00b2",
      "F = ma",
      "V = IR",
      "P = IV"
    ],
    "answer": "E = mc\u00b2",
    "explanation": "Einstein showed that mass and energy are interchangeable, proportional by the speed of light squared.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "What is the temperature of Absolute Zero in Celsius, where all thermodynamic motion ceases?",
    "options": [
      "-273.15\u00b0C",
      "-100.00\u00b0C",
      "-459.67\u00b0C",
      "-200.00\u00b0C"
    ],
    "answer": "-273.15\u00b0C",
    "explanation": "Absolute zero is 0 Kelvin or -273.15\u00b0 Celsius.",
    "difficulty": "medium"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "What is the SI unit of Electric Current?",
    "options": [
      "Ampere (A)",
      "Volt (V)",
      "Ohm (\u03a9)",
      "Watt (W)"
    ],
    "answer": "Ampere (A)",
    "explanation": "The Ampere is the base SI unit for electrical current flow.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "Which subatomic particle carries a negative electric charge?",
    "options": [
      "Electron",
      "Proton",
      "Neutron",
      "Positron"
    ],
    "answer": "Electron",
    "explanation": "Electrons carry a negative elementary charge (-1e), while protons carry a positive charge (+1e).",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "What type of lens is thinner in the middle and thicker at the edges, causing parallel light rays to diverge?",
    "options": [
      "Concave Lens",
      "Convex Lens",
      "Cylindrical Lens",
      "Bifocal Lens"
    ],
    "answer": "Concave Lens",
    "explanation": "Concave lenses diverge light and are commonly prescribed to correct myopia (nearsightedness).",
    "difficulty": "medium"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "According to Ohm's Law, what is the formula connecting Voltage (V), Current (I), and Resistance (R)?",
    "options": [
      "V = I \u00d7 R",
      "V = I / R",
      "V = R / I",
      "V = I + R"
    ],
    "answer": "V = I \u00d7 R",
    "explanation": "Ohm's law states that current through a conductor is directly proportional to voltage across it: V = IR.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "What is the standard acceleration due to Earth's gravity (g) near sea level?",
    "options": [
      "9.8 m/s\u00b2",
      "8.9 m/s\u00b2",
      "10.8 m/s\u00b2",
      "6.4 m/s\u00b2"
    ],
    "answer": "9.8 m/s\u00b2",
    "explanation": "Standard Earth gravitational acceleration is approximately 9.80665 m/s\u00b2.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "Which principle states that an upward buoyant force on a submerged body equals the weight of fluid displaced?",
    "options": [
      "Archimedes' Principle",
      "Pascal's Law",
      "Bernoulli's Principle",
      "Hooke's Law"
    ],
    "answer": "Archimedes' Principle",
    "explanation": "Archimedes discovered that buoyancy equals the weight of displaced fluid, explaining why ships float.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "What effect causes the apparent change in frequency or pitch of sound as a moving siren approaches and passes?",
    "options": [
      "Doppler Effect",
      "Tyndall Effect",
      "Compton Effect",
      "Raman Effect"
    ],
    "answer": "Doppler Effect",
    "explanation": "The Doppler effect describes the frequency shift resulting from relative motion between source and observer.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "Which scientific instrument was invented by Evangelista Torricelli in 1643 to measure atmospheric air pressure?",
    "options": [
      "Barometer",
      "Manometer",
      "Hygrometer",
      "Anemometer"
    ],
    "answer": "Barometer",
    "explanation": "Torricelli used a column of liquid mercury to create the first practical mercury barometer.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "What is the standard derived SI unit of Electrical Resistance?",
    "options": [
      "Ohm (\u03a9)",
      "Siemens",
      "Henry",
      "Tesla"
    ],
    "answer": "Ohm (\u03a9)",
    "explanation": "Named after Georg Ohm, one Ohm equals one Volt per Ampere (V/A).",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "Which of these wave types requires a material medium to propagate and cannot travel through empty vacuum?",
    "options": [
      "Sound Waves",
      "Light Waves",
      "X-Rays",
      "Radio Waves"
    ],
    "answer": "Sound Waves",
    "explanation": "Sound is a mechanical longitudinal compression wave requiring matter (solids, liquids, or gases) to travel.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "Which color of visible light in the optical spectrum has the shortest wavelength and highest photon energy?",
    "options": [
      "Violet",
      "Red",
      "Green",
      "Yellow"
    ],
    "answer": "Violet",
    "explanation": "Violet light has a wavelength around 380-450 nm, while red has the longest wavelength around 700 nm.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "What mode of thermal energy transfer occurs by direct microscopic contact between adjacent atoms in solids?",
    "options": [
      "Conduction",
      "Convection",
      "Radiation",
      "Advection"
    ],
    "answer": "Conduction",
    "explanation": "Thermal conduction occurs through vibrational lattice energy transfer across physical contact.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "Which law states that the total energy in an isolated physical system remains constant over time?",
    "options": [
      "Law of Conservation of Energy",
      "Second Law of Thermodynamics",
      "Lenz's Law",
      "Coulomb's Law"
    ],
    "answer": "Law of Conservation of Energy",
    "explanation": "Energy cannot be created or destroyed; it only transforms between kinetic, potential, thermal, and chemical forms.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "Which electrical transformer device increases AC voltage while simultaneously decreasing current?",
    "options": [
      "Step-Up Transformer",
      "Step-Down Transformer",
      "Inverter",
      "Rectifier"
    ],
    "answer": "Step-Up Transformer",
    "explanation": "Step-up transformers have more secondary coil windings, raising voltage for efficient long-distance power grid transmission.",
    "difficulty": "medium"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "The separation of visible white sunlight into its constituent spectral rainbow colors by a glass prism is called?",
    "options": [
      "Dispersion",
      "Diffraction",
      "Interference",
      "Polarization"
    ],
    "answer": "Dispersion",
    "explanation": "Dispersion happens because different colors of light refract by slightly different amounts based on refractive index.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "What is the minimum escape velocity needed for an unpropelled projectile to break free from Earth's gravity?",
    "options": [
      "11.2 km/s (~40,320 km/h)",
      "7.9 km/s",
      "15.0 km/s",
      "25.4 km/s"
    ],
    "answer": "11.2 km/s (~40,320 km/h)",
    "explanation": "Earth escape velocity is approximately 11.2 km/s; 7.9 km/s is low Earth orbital velocity.",
    "difficulty": "medium"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "What is the primary physical principle that enables light signals to bounce inside modern glass Fiber Optic cables?",
    "options": [
      "Total Internal Reflection",
      "Light Dispersion",
      "Diffraction Grating",
      "Wave Polarization"
    ],
    "answer": "Total Internal Reflection",
    "explanation": "When light hits the core-cladding boundary at an angle greater than critical angle, 100% of light is reflected internally.",
    "difficulty": "medium"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "Newton's Third Law of Motion states that for every action force, there is what?",
    "options": [
      "An equal and opposite reaction force",
      "A greater perpendicular reaction",
      "A delayed frictional counterforce",
      "A net acceleration forward"
    ],
    "answer": "An equal and opposite reaction force",
    "explanation": "Forces always occur in matched action-reaction pairs acting on two different interacting bodies.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "Which subatomic constituent of the atomic nucleus possesses mass but exactly zero net electric charge?",
    "options": [
      "Neutron",
      "Proton",
      "Positron",
      "Quark"
    ],
    "answer": "Neutron",
    "explanation": "Discovered by James Chadwick in 1932, neutrons have neutral charge and roughly equal proton mass.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "What phenomenon occurs when a material conducts electric current with absolutely zero electrical resistance below a critical temperature?",
    "options": [
      "Superconductivity",
      "Semiconduction",
      "Dielectric Breakdown",
      "Ferromagnetism"
    ],
    "answer": "Superconductivity",
    "explanation": "Superconductors expel magnetic fields (Meissner effect) and conduct DC electricity with zero resistive power loss.",
    "difficulty": "medium"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "What is the standard derived SI unit of Magnetic Flux Density?",
    "options": [
      "Tesla (T)",
      "Weber (Wb)",
      "Henry (H)",
      "Gauss"
    ],
    "answer": "Tesla (T)",
    "explanation": "One Tesla equals one Weber per square meter, named after electrical pioneer Nikola Tesla.",
    "difficulty": "medium"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "Which type of optical lens is thicker in the middle and causes incoming parallel rays of light to converge to a real focal point?",
    "options": [
      "Convex Lens",
      "Concave Lens",
      "Plano-Concave Lens",
      "Diverging Lens"
    ],
    "answer": "Convex Lens",
    "explanation": "Convex lenses converge light rays and are commonly used as magnifying glasses and camera objectives.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "Which planet in the Solar System possesses the strongest surface gravitational field and largest magnetic field?",
    "options": [
      "Jupiter",
      "Saturn",
      "Neptune",
      "Earth"
    ],
    "answer": "Jupiter",
    "explanation": "Jupiter's massive bulk produces surface gravity 2.5 times that of Earth (approx 24.8 m/s\u00b2).",
    "difficulty": "medium"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "What is the SI unit for the activity of a radioactive decay source, measuring decays per second?",
    "options": [
      "Becquerel (Bq)",
      "Curie (Ci)",
      "Sievert (Sv)",
      "Gray (Gy)"
    ],
    "answer": "Becquerel (Bq)",
    "explanation": "One Becquerel represents one atomic nuclear disintegration per second.",
    "difficulty": "medium"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "Which astronomical law discovered by Johannes Kepler states that planetary orbits are ellipses with the Sun at one focus?",
    "options": [
      "Kepler's First Law (Law of Ellipses)",
      "Kepler's Second Law",
      "Kepler's Third Law",
      "Newton's Orbital Law"
    ],
    "answer": "Kepler's First Law (Law of Ellipses)",
    "explanation": "Kepler proved in 1609 that planetary orbits around the Sun are ellipses rather than perfect circles.",
    "difficulty": "medium"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "Which quantum phenomenon, explained by Einstein in 1905, involves electrons ejecting from metal surfaces when illuminated by light?",
    "options": [
      "Photoelectric Effect",
      "Compton Scattering",
      "Bremsstrahlung",
      "Zeeman Effect"
    ],
    "answer": "Photoelectric Effect",
    "explanation": "Einstein won the 1921 Nobel Prize in Physics for explaining the photoelectric effect using quantized light photons.",
    "difficulty": "medium"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "What is the acoustic term for an object traveling through a medium at a speed exceeding the local speed of sound (Mach > 1)?",
    "options": [
      "Supersonic",
      "Subsonic",
      "Hypersonic",
      "Ultrasonic"
    ],
    "answer": "Supersonic",
    "explanation": "Speeds faster than sound create sonic booms and shock waves known as supersonic flight.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "Which type of mirror is installed as the side-view mirror on automobiles to furnish an upright, wider field of view?",
    "options": [
      "Convex Mirror",
      "Concave Mirror",
      "Plane Mirror",
      "Parabolic Mirror"
    ],
    "answer": "Convex Mirror",
    "explanation": "Convex mirrors diverge light, forming diminished virtual images covering a significantly wider panoramic angle.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "What is the derived SI unit of frequency, representing one complete oscillation cycle per second?",
    "options": [
      "Hertz (Hz)",
      "Radian",
      "Decibel",
      "Baud"
    ],
    "answer": "Hertz (Hz)",
    "explanation": "Named in honor of Heinrich Hertz, one Hertz equals 1 s\u207b\u00b9.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "What mode of heat transfer involves bulk macroscopic fluid movement caused by density differences in warm and cold liquid/gas?",
    "options": [
      "Convection",
      "Conduction",
      "Radiation",
      "Sublimation"
    ],
    "answer": "Convection",
    "explanation": "Warm fluid expands and rises while cooler denser fluid sinks, driving natural convection currents.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "What force pulls an object toward the center of rotation to sustain its circular path (e.g. Earth orbiting the Sun)?",
    "options": [
      "Centripetal Force",
      "Centrifugal Force",
      "Friction Force",
      "Coriolis Force"
    ],
    "answer": "Centripetal Force",
    "explanation": "Centripetal force is directed inward toward the curvature center (gravity acts as the centripetal force for orbits).",
    "difficulty": "medium"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "Which of the four fundamental forces of nature is responsible for radioactive beta decay in atomic nuclei?",
    "options": [
      "Weak Nuclear Force",
      "Strong Nuclear Force",
      "Electromagnetic Force",
      "Gravitational Force"
    ],
    "answer": "Weak Nuclear Force",
    "explanation": "The weak force mediates flavor transitions converting neutrons to protons via W and Z bosons.",
    "difficulty": "medium"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "What type of mechanical energy is stored within an object due to its elevated vertical position in a gravitational field?",
    "options": [
      "Gravitational Potential Energy",
      "Kinetic Energy",
      "Thermal Energy",
      "Elastic Energy"
    ],
    "answer": "Gravitational Potential Energy",
    "explanation": "Gravitational potential energy equals mass \u00d7 gravity \u00d7 height (mgh).",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "What was the name of the first human-made artificial satellite launched into Earth orbit by the Soviet Union in October 1957?",
    "options": [
      "Sputnik 1",
      "Explorer 1",
      "Vostok 1",
      "Apollo 11"
    ],
    "answer": "Sputnik 1",
    "explanation": "Sputnik 1 orbited Earth every 96 minutes, transmitting radio beeps and igniting the Space Race.",
    "difficulty": "easy"
  },
  {
    "topic": "physics",
    "topicLabel": "Physics & Energy",
    "topicEmoji": "\u26a1",
    "question": "Which principle states that an increase in the speed of a fluid occurs simultaneously with a decrease in static pressure?",
    "options": [
      "Bernoulli's Principle",
      "Pascal's Principle",
      "Archimedes' Principle",
      "Reynolds Principle"
    ],
    "answer": "Bernoulli's Principle",
    "explanation": "Bernoulli's principle explains aerodynamic lift over airplane wings and atomizer sprayers.",
    "difficulty": "medium"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What is the chemical formula for ordinary water?",
    "options": [
      "H2O",
      "CO2",
      "NaCl",
      "H2O2"
    ],
    "answer": "H2O",
    "explanation": "Water consists of two hydrogen atoms covalently bonded to a single oxygen atom.",
    "difficulty": "easy"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "Which acid is naturally found in vinegar, giving it its pungent smell and sour taste?",
    "options": [
      "Acetic Acid",
      "Citric Acid",
      "Sulfuric Acid",
      "Lactic Acid"
    ],
    "answer": "Acetic Acid",
    "explanation": "Vinegar is typically a 4% to 8% solution of acetic acid (CH3COOH) in water.",
    "difficulty": "easy"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What is the common chemical name of baking soda used in cooking and baking?",
    "options": [
      "Sodium Bicarbonate",
      "Sodium Chloride",
      "Calcium Carbonate",
      "Sodium Hydroxide"
    ],
    "answer": "Sodium Bicarbonate",
    "explanation": "Baking soda is Sodium Bicarbonate (NaHCO3), which releases CO2 gas to make dough rise.",
    "difficulty": "easy"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What is the chemical formula for ordinary table salt?",
    "options": [
      "NaCl",
      "KCl",
      "NaHCO3",
      "CaCO3"
    ],
    "answer": "NaCl",
    "explanation": "Table salt is Sodium Chloride (NaCl), an ionic compound of sodium and chlorine ions.",
    "difficulty": "easy"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "On the pH scale, what is the pH value of pure neutral distilled water at 25\u00b0C?",
    "options": [
      "7.0",
      "0.0",
      "14.0",
      "5.5"
    ],
    "answer": "7.0",
    "explanation": "A pH of 7.0 is neutral, having equal concentrations of H+ and OH- ions.",
    "difficulty": "easy"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What is 'Dry Ice' made of?",
    "options": [
      "Solid Carbon Dioxide",
      "Frozen Nitrogen",
      "Solid Water Ice",
      "Solid Methane"
    ],
    "answer": "Solid Carbon Dioxide",
    "explanation": "Dry ice is solid carbon dioxide (CO2) at -78.5\u00b0C that sublimates directly into gas without melting.",
    "difficulty": "easy"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "Which gas is filled into sealed potato chips bags to prevent them from becoming stale or oxidized?",
    "options": [
      "Nitrogen Gas",
      "Oxygen Gas",
      "Carbon Dioxide",
      "Hydrogen Gas"
    ],
    "answer": "Nitrogen Gas",
    "explanation": "Nitrogen is an inert, non-reactive gas that displaces oxygen and moisture, keeping chips fresh and crisp.",
    "difficulty": "easy"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What acid is naturally present in citrus fruits such as lemons, oranges, and limes?",
    "options": [
      "Citric Acid",
      "Acetic Acid",
      "Tartaric Acid",
      "Oxalic Acid"
    ],
    "answer": "Citric Acid",
    "explanation": "Citric acid is a weak organic tricarboxylic acid found in high concentrations in citrus fruits.",
    "difficulty": "easy"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What gas is released when vinegar reacts with baking soda in the classic volcano experiment?",
    "options": [
      "Carbon Dioxide (CO2)",
      "Oxygen (O2)",
      "Hydrogen (H2)",
      "Chlorine (Cl2)"
    ],
    "answer": "Carbon Dioxide (CO2)",
    "explanation": "Acetic acid + Sodium bicarbonate yields sodium acetate, water, and bubbles of Carbon Dioxide gas.",
    "difficulty": "easy"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What is the chemical name and formula for rust on iron?",
    "options": [
      "Iron Oxide (Fe2O3)",
      "Iron Sulfide (FeS)",
      "Iron Carbonate (FeCO3)",
      "Iron Chloride (FeCl3)"
    ],
    "answer": "Iron Oxide (Fe2O3)",
    "explanation": "Rust is hydrated iron(III) oxide formed when iron reacts with oxygen and water vapor.",
    "difficulty": "easy"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What is the hardest naturally occurring allotrope of pure carbon?",
    "options": [
      "Diamond",
      "Graphite",
      "Graphene",
      "Fullerene"
    ],
    "answer": "Diamond",
    "explanation": "Diamond has a rigid 3D tetrahedral covalent lattice, making it the hardest natural mineral.",
    "difficulty": "easy"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What color does blue litmus paper turn when dipped into an acidic solution?",
    "options": [
      "Red",
      "Green",
      "Yellow",
      "Purple"
    ],
    "answer": "Red",
    "explanation": "Litmus turns red under acidic conditions (pH < 4.5) and stays or turns blue in alkaline solutions.",
    "difficulty": "easy"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "Which gas is commonly known as 'Laughing Gas' used for anesthesia and sedation?",
    "options": [
      "Nitrous Oxide (N2O)",
      "Nitrogen Dioxide (NO2)",
      "Nitric Oxide (NO)",
      "Carbon Monoxide (CO)"
    ],
    "answer": "Nitrous Oxide (N2O)",
    "explanation": "Nitrous oxide (N2O) produces euphoria and pain relief, earning the nickname laughing gas.",
    "difficulty": "easy"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What is the chemical symbol for Gold on the periodic table?",
    "options": [
      "Au",
      "Ag",
      "Fe",
      "Gd"
    ],
    "answer": "Au",
    "explanation": "Au comes from the Latin word 'Aurum', which translates to shining dawn.",
    "difficulty": "easy"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What is the ONLY metallic element on the periodic table that is liquid at standard room temperature?",
    "options": [
      "Mercury (Hg)",
      "Gallium (Ga)",
      "Bromine (Br)",
      "Cesium (Cs)"
    ],
    "answer": "Mercury (Hg)",
    "explanation": "Mercury is the only metal that is a liquid at 25\u00b0C. Bromine is also a liquid, but is a non-metal.",
    "difficulty": "medium"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What is the ONLY non-metallic element on the periodic table that is a liquid at room temperature?",
    "options": [
      "Bromine (Br)",
      "Mercury (Hg)",
      "Chlorine (Cl)",
      "Iodine (I)"
    ],
    "answer": "Bromine (Br)",
    "explanation": "Bromine is a reddish-brown halogen liquid at room temperature. Mercury is a metal, not a non-metal!",
    "difficulty": "medium"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What primary acid is naturally secreted by the parietal cells in the human stomach for digestion?",
    "options": [
      "Hydrochloric Acid (HCl)",
      "Sulfuric Acid (H2SO4)",
      "Acetic Acid (CH3COOH)",
      "Nitric Acid (HNO3)"
    ],
    "answer": "Hydrochloric Acid (HCl)",
    "explanation": "Gastric acid contains Hydrochloric Acid (pH 1.5 to 3.5), which activates pepsin for protein breakdown.",
    "difficulty": "medium"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "Which metal is used to coat iron sheets in the process known as 'Galvanization' to prevent rust?",
    "options": [
      "Zinc (Zn)",
      "Copper (Cu)",
      "Lead (Pb)",
      "Tin (Sn)"
    ],
    "answer": "Zinc (Zn)",
    "explanation": "Galvanization coats iron or steel with a protective sacrificial layer of Zinc to prevent oxidation.",
    "difficulty": "medium"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What is the alloy 'Brass' primarily composed of?",
    "options": [
      "Copper and Zinc",
      "Copper and Tin",
      "Iron and Carbon",
      "Lead and Tin"
    ],
    "answer": "Copper and Zinc",
    "explanation": "Brass is an alloy of Copper and Zinc. Bronze, in contrast, is an alloy of Copper and Tin.",
    "difficulty": "medium"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What is the normal physiological pH range of healthy human blood?",
    "options": [
      "7.35 to 7.45",
      "6.0 to 6.5",
      "8.0 to 8.5",
      "7.0 exactly"
    ],
    "answer": "7.35 to 7.45",
    "explanation": "Human arterial blood is tightly maintained at a slightly alkaline pH between 7.35 and 7.45 by bicarbonate buffers.",
    "difficulty": "medium"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "Which acid is used as the electrolyte in standard lead-acid automotive car batteries?",
    "options": [
      "Sulfuric Acid (H2SO4)",
      "Hydrochloric Acid (HCl)",
      "Nitric Acid (HNO3)",
      "Phosphoric Acid (H3PO4)"
    ],
    "answer": "Sulfuric Acid (H2SO4)",
    "explanation": "Car batteries use a solution of roughly 33% to 35% Sulfuric Acid in water as the electrolyte.",
    "difficulty": "medium"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What non-metallic element allotrope is a good conductor of electricity due to free delocalized electrons?",
    "options": [
      "Graphite",
      "Diamond",
      "Sulfur",
      "Phosphorus"
    ],
    "answer": "Graphite",
    "explanation": "Graphite consists of layers of carbon hexagons with delocalized pi electrons that can flow freely.",
    "difficulty": "medium"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What is the chemical name and formula for 'Plaster of Paris' used to set bone fractures?",
    "options": [
      "Calcium Sulfate Hemihydrate (CaSO4\u00b70.5H2O)",
      "Calcium Carbonate (CaCO3)",
      "Calcium Hydroxide (Ca(OH)2)",
      "Calcium Oxide (CaO)"
    ],
    "answer": "Calcium Sulfate Hemihydrate (CaSO4\u00b70.5H2O)",
    "explanation": "Plaster of Paris is Calcium Sulfate Hemihydrate, prepared by heating gypsum (CaSO4\u00b72H2O) to 150\u00b0C.",
    "difficulty": "medium"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What chemical process converts grape juice and grain sugars into alcohol using yeast enzymes?",
    "options": [
      "Fermentation",
      "Oxidation",
      "Sublimation",
      "Saponification"
    ],
    "answer": "Fermentation",
    "explanation": "Anaerobic fermentation by yeast converts simple sugars like glucose into ethanol and carbon dioxide.",
    "difficulty": "medium"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "Which metal ion serves as the central coordination atom in the green chlorophyll molecule?",
    "options": [
      "Magnesium (Mg)",
      "Iron (Fe)",
      "Zinc (Zn)",
      "Calcium (Ca)"
    ],
    "answer": "Magnesium (Mg)",
    "explanation": "Chlorophyll has a porphyrin ring coordinated around a central Magnesium ion (unlike hemoglobin which has Iron).",
    "difficulty": "medium"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "Which two gases are primarily responsible for the formation of Acid Rain in the atmosphere?",
    "options": [
      "Sulfur Dioxide and Nitrogen Oxides",
      "Carbon Dioxide and Methane",
      "Oxygen and Hydrogen",
      "Ozone and Helium"
    ],
    "answer": "Sulfur Dioxide and Nitrogen Oxides",
    "explanation": "SO2 and NOx react with water vapor and oxygen to form sulfuric acid and nitric acid, falling as acid rain.",
    "difficulty": "medium"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What is the chemical formula of ozone gas that forms the protective layer in the stratosphere?",
    "options": [
      "O3",
      "O2",
      "CO2",
      "CH4"
    ],
    "answer": "O3",
    "explanation": "Ozone (O3) is a triatomic molecule that absorbs high-frequency ultraviolet radiation from the sun.",
    "difficulty": "easy"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What is the chemical name of common washing soda?",
    "options": [
      "Sodium Carbonate",
      "Sodium Bicarbonate",
      "Sodium Hydroxide",
      "Sodium Nitrate"
    ],
    "answer": "Sodium Carbonate",
    "explanation": "Washing soda is Sodium Carbonate (Na2CO3\u00b710H2O), used as a water softener and cleaning agent.",
    "difficulty": "medium"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "Why are alkali metals like Sodium and Potassium kept submerged under kerosene oil?",
    "options": [
      "To prevent vigorous reaction with atmospheric moisture and oxygen",
      "To prevent evaporation",
      "To make them softer to cut",
      "To prevent loss of color"
    ],
    "answer": "To prevent vigorous reaction with atmospheric moisture and oxygen",
    "explanation": "Sodium and Potassium react violently with moisture and oxygen in the air; kerosene is hydrocarbon-based and inert.",
    "difficulty": "medium"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What is the chemical name of 'Bleaching Powder' used for water disinfection?",
    "options": [
      "Calcium Hypochlorite",
      "Sodium Chloride",
      "Calcium Carbonate",
      "Sodium Hydroxide"
    ],
    "answer": "Calcium Hypochlorite",
    "explanation": "Bleaching powder is Calcium Hypochlorite (CaOCl2), widely used as a disinfectant and bleaching agent.",
    "difficulty": "medium"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What is the primary hydrocarbon component of Compressed Natural Gas (CNG)?",
    "options": [
      "Methane (CH4)",
      "Propane (C3H8)",
      "Butane (C4H10)",
      "Ethane (C2H6)"
    ],
    "answer": "Methane (CH4)",
    "explanation": "Methane constitutes 70% to 90% of natural gas and CNG.",
    "difficulty": "easy"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "Which acid is injected by an ant sting causing a sharp burning irritation?",
    "options": [
      "Formic Acid (Methanoic Acid)",
      "Acetic Acid",
      "Lactic Acid",
      "Oxalic Acid"
    ],
    "answer": "Formic Acid (Methanoic Acid)",
    "explanation": "Ant stings inject Formic Acid (HCOOH), which can be neutralized by mild alkaline baking soda or calamine.",
    "difficulty": "easy"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What is 'Quicklime' chemically, used extensively in mortar and cement manufacture?",
    "options": [
      "Calcium Oxide (CaO)",
      "Calcium Carbonate (CaCO3)",
      "Calcium Hydroxide (Ca(OH)2)",
      "Calcium Sulfate (CaSO4)"
    ],
    "answer": "Calcium Oxide (CaO)",
    "explanation": "Quicklime is anhydrous Calcium Oxide (CaO) produced by heating limestone.",
    "difficulty": "medium"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What is the active chemical agent in common liquid household bleach?",
    "options": [
      "Sodium Hypochlorite (NaClO)",
      "Sodium Chloride",
      "Sodium Hydroxide",
      "Hydrogen Peroxide"
    ],
    "answer": "Sodium Hypochlorite (NaClO)",
    "explanation": "Household bleach is typically a 3% to 6% solution of Sodium Hypochlorite in water.",
    "difficulty": "medium"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "Which historic metal alloy is created by melting together Copper and Tin?",
    "options": [
      "Bronze",
      "Brass",
      "Solder",
      "Pewter"
    ],
    "answer": "Bronze",
    "explanation": "Bronze is traditionally Copper alloyed with Tin; Brass is Copper alloyed with Zinc.",
    "difficulty": "medium"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What is the molecular formula of ordinary granulated table sugar (sucrose)?",
    "options": [
      "C12H22O11",
      "C6H12O6",
      "C6H6",
      "C2H5OH"
    ],
    "answer": "C12H22O11",
    "explanation": "Sucrose is a disaccharide made of glucose and fructose with the molecular formula C12H22O11.",
    "difficulty": "medium"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What acid is naturally produced when milk curdles into yogurt or cheese?",
    "options": [
      "Lactic Acid",
      "Citric Acid",
      "Acetic Acid",
      "Tartaric Acid"
    ],
    "answer": "Lactic Acid",
    "explanation": "Lactobacillus bacteria ferment lactose into Lactic Acid, giving curd its sour taste and thicker consistency.",
    "difficulty": "easy"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What physical phase transition takes place during 'Sublimation'?",
    "options": [
      "Solid changes directly to gas",
      "Gas condenses to liquid",
      "Liquid evaporates to gas",
      "Gas changes directly to liquid"
    ],
    "answer": "Solid changes directly to gas",
    "explanation": "Sublimation is the direct transition from the solid phase to the gas phase without passing through liquid (e.g. Camphor, dry ice).",
    "difficulty": "easy"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "What is 'Milk of Magnesia' chemically, used as an antacid to relieve stomach heartburn?",
    "options": [
      "Magnesium Hydroxide (Mg(OH)2)",
      "Magnesium Carbonate",
      "Magnesium Sulfate",
      "Calcium Carbonate"
    ],
    "answer": "Magnesium Hydroxide (Mg(OH)2)",
    "explanation": "Magnesium Hydroxide neutralizes excess hydrochloric acid in the gastric juice.",
    "difficulty": "medium"
  },
  {
    "topic": "chemistry",
    "topicLabel": "Chemistry & Elements",
    "topicEmoji": "\ud83e\uddea",
    "question": "Which inert noble gas is commonly sealed inside traditional filament light bulbs?",
    "options": [
      "Argon",
      "Oxygen",
      "Chlorine",
      "Helium"
    ],
    "answer": "Argon",
    "explanation": "Argon is chemically unreactive and prevents the hot tungsten filament from oxidizing and burning out.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "In which modern-day country are the Great Pyramids of Giza located?",
    "options": [
      "Egypt",
      "Sudan",
      "Jordan",
      "Greece"
    ],
    "answer": "Egypt",
    "explanation": "The Giza pyramid complex stands on the outskirts of Cairo, Egypt.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "In which year did India gain Independence from British colonial rule?",
    "options": [
      "1947",
      "1950",
      "1942",
      "1935"
    ],
    "answer": "1947",
    "explanation": "India gained independence at the stroke of midnight on August 15, 1947.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Which Mughal Emperor commissioned the construction of the Taj Mahal in Agra?",
    "options": [
      "Shah Jahan",
      "Akbar the Great",
      "Aurangzeb",
      "Babur"
    ],
    "answer": "Shah Jahan",
    "explanation": "Shah Jahan commissioned the white marble monument in 1631 in memory of his favorite wife Mumtaz Mahal.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Which ancient civilization built the mountain citadel of Machu Picchu in Peru?",
    "options": [
      "Inca Empire",
      "Maya Civilization",
      "Aztec Empire",
      "Olmec Civilization"
    ],
    "answer": "Inca Empire",
    "explanation": "Machu Picchu was constructed in the 15th century by Inca ruler Pachacuti.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "In which year did World War II officially conclude with the surrender of Axis forces?",
    "options": [
      "1945",
      "1944",
      "1939",
      "1948"
    ],
    "answer": "1945",
    "explanation": "World War II ended in 1945 after the surrender of Germany in May and Japan in September.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Cleopatra VII, the famous queen of ancient Egypt, belonged to which ruling dynasty?",
    "options": [
      "Ptolemaic Dynasty (Greek)",
      "Pharaonic Fourth Dynasty",
      "Roman Julio-Claudian",
      "Persian Achaemenid"
    ],
    "answer": "Ptolemaic Dynasty (Greek)",
    "explanation": "Cleopatra was Macedonian Greek, descended from Ptolemy I Soter, a companion of Alexander the Great.",
    "difficulty": "medium"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Who was the first President of the United States of America under the US Constitution?",
    "options": [
      "George Washington",
      "Thomas Jefferson",
      "John Adams",
      "Abraham Lincoln"
    ],
    "answer": "George Washington",
    "explanation": "George Washington served as the first US President from 1789 to 1797.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "In which century did the Italian Renaissance begin in Florence?",
    "options": [
      "14th Century (1300s)",
      "16th Century (1500s)",
      "12th Century (1100s)",
      "18th Century (1700s)"
    ],
    "answer": "14th Century (1300s)",
    "explanation": "The Renaissance began in Tuscany, Italy during the 14th century.",
    "difficulty": "medium"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "In 1215, English barons forced King John to seal which historic charter granting basic legal rights?",
    "options": [
      "Magna Carta",
      "Bill of Rights",
      "Treaty of Utrecht",
      "Edict of Nantes"
    ],
    "answer": "Magna Carta",
    "explanation": "Magna Carta established the historic principle that everyone, even the monarch, is subject to the rule of law.",
    "difficulty": "medium"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "In which year did the historic Fall of the Berlin Wall occur, signaling the collapse of the Cold War divide in Europe?",
    "options": [
      "1989",
      "1991",
      "1985",
      "1975"
    ],
    "answer": "1989",
    "explanation": "On November 9, 1989, East and West Berliners breached the wall, leading to German reunification in 1990.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "What ancient wedge-shaped script, developed by Sumerians around 3200 BC, is one of the earliest writing systems?",
    "options": [
      "Cuneiform",
      "Hieroglyphics",
      "Phoenician Alphabet",
      "Brahmi Script"
    ],
    "answer": "Cuneiform",
    "explanation": "Sumerians inscribed cuneiform wedge symbols into soft clay tablets with reed styluses.",
    "difficulty": "medium"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "In which year did the storming of the Bastille prison ignite the French Revolution?",
    "options": [
      "1789",
      "1776",
      "1799",
      "1804"
    ],
    "answer": "1789",
    "explanation": "Parisian revolutionaries stormed the Bastille on July 14, 1789, commemorated as Bastille Day.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Which third Mauryan Emperor embraced Buddhism and renounced warfare following the bloody Kalinga War in 261 BC?",
    "options": [
      "Ashoka the Great",
      "Chandragupta Maurya",
      "Bindusara",
      "Harsha"
    ],
    "answer": "Ashoka the Great",
    "explanation": "Ashoka adopted Dhamma and non-violence, erecting stone edicts and pillars across the subcontinent.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Which Roman general and dictator was assassinated in the Senate on the Ides of March (44 BC)?",
    "options": [
      "Julius Caesar",
      "Mark Antony",
      "Augustus",
      "Nero"
    ],
    "answer": "Julius Caesar",
    "explanation": "Julius Caesar was stabbed 23 times by a conspiracy of Roman senators led by Brutus and Cassius.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Who became the first human being to step foot on the Moon on July 20, 1969?",
    "options": [
      "Neil Armstrong",
      "Buzz Aldrin",
      "Yuri Gagarin",
      "Michael Collins"
    ],
    "answer": "Neil Armstrong",
    "explanation": "Commander Neil Armstrong declared 'That's one small step for man, one giant leap for mankind'.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "In which year did World War I break out following the assassination of Archduke Franz Ferdinand?",
    "options": [
      "1914",
      "1912",
      "1918",
      "1939"
    ],
    "answer": "1914",
    "explanation": "The Great War began in July 1914 and concluded in November 1918 with the armistice.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "What was the primary military defensive purpose of the Great Wall of China throughout successive dynasties?",
    "options": [
      "Defending against northern nomadic cavalry invasions",
      "Flood defense",
      "Collecting customs duties only",
      "Marking religious borders"
    ],
    "answer": "Defending against northern nomadic cavalry invasions",
    "explanation": "The wall defended sedentary Chinese agricultural empires against northern nomadic confederations (Xiongnu, Mongols).",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Who spearheaded the non-violent Satyagraha movement leading to Indian independence?",
    "options": [
      "Mahatma Gandhi",
      "Jawaharlal Nehru",
      "Subhas Chandra Bose",
      "Sardar Patel"
    ],
    "answer": "Mahatma Gandhi",
    "explanation": "Mahatma Gandhi championed non-violent civil disobedience, the Salt March, and the Quit India Movement.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "What was the name of the ship that transported the English Separatist Pilgrims to Plymouth Rock in 1620?",
    "options": [
      "Mayflower",
      "Santa Maria",
      "Beagle",
      "Endeavour"
    ],
    "answer": "Mayflower",
    "explanation": "The Mayflower carried 102 passengers across the Atlantic to establish Plymouth Colony.",
    "difficulty": "medium"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Which Portuguese explorer pioneered the direct ocean route from Europe to Calicut, India in May 1498?",
    "options": [
      "Vasco da Gama",
      "Christopher Columbus",
      "Ferdinand Magellan",
      "Bartolomeu Dias"
    ],
    "answer": "Vasco da Gama",
    "explanation": "Vasco da Gama sailed around the Cape of Good Hope, establishing the Portuguese spice trade in India.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Which ancient Roman city was buried and preserved under volcanic ash by Mount Vesuvius in 79 AD?",
    "options": [
      "Pompeii",
      "Herculaneum only",
      "Ostia",
      "Ravenna"
    ],
    "answer": "Pompeii",
    "explanation": "The eruption of Mount Vesuvius buried Pompeii under meters of ash and pumice, preserving buildings and artifacts.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Who was the first female Prime Minister of the United Kingdom, known as the 'Iron Lady'?",
    "options": [
      "Margaret Thatcher",
      "Theresa May",
      "Queen Elizabeth II",
      "Indira Gandhi"
    ],
    "answer": "Margaret Thatcher",
    "explanation": "Margaret Thatcher served as Conservative Prime Minister of the UK from 1979 to 1990.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Which medieval conqueror founded and unified the Mongol Empire in the early 13th century?",
    "options": [
      "Genghis Khan (Tem\u00fcjin)",
      "Kublai Khan",
      "Tamerlane",
      "Attila the Hun"
    ],
    "answer": "Genghis Khan (Tem\u00fcjin)",
    "explanation": "Genghis Khan united nomadic tribes to forge the largest contiguous land empire in world history.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Which peace treaty, signed in the Hall of Mirrors in 1919, officially ended World War I?",
    "options": [
      "Treaty of Versailles",
      "Treaty of Paris",
      "Treaty of Ghent",
      "Congress of Vienna"
    ],
    "answer": "Treaty of Versailles",
    "explanation": "The Treaty of Versailles reassigned German borders and established the League of Nations in 1919.",
    "difficulty": "medium"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "In which year was the United Nations (UN) charter officially signed in San Francisco by 50 nations?",
    "options": [
      "1945",
      "1948",
      "1939",
      "1950"
    ],
    "answer": "1945",
    "explanation": "The UN was founded on October 24, 1945 to replace the League of Nations and foster international peace.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Which twin archaeological city sites were the earliest excavated urban centers of the Bronze Age Indus Valley Civilization?",
    "options": [
      "Harappa and Mohenjo-daro",
      "Lothal and Kalibangan",
      "Babylon and Ur",
      "Memphis and Thebes"
    ],
    "answer": "Harappa and Mohenjo-daro",
    "explanation": "Excavated in the 1920s in modern Pakistan, Harappa and Mohenjo-daro showcased advanced urban grid planning.",
    "difficulty": "medium"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Whose Spanish expedition completed the first successful global maritime circumnavigation of Earth (1519-1522)?",
    "options": [
      "Ferdinand Magellan (completed by Juan Sebasti\u00e1n Elcano)",
      "Francis Drake",
      "Amerigo Vespucci",
      "James Cook"
    ],
    "answer": "Ferdinand Magellan (completed by Juan Sebasti\u00e1n Elcano)",
    "explanation": "Magellan was killed in the Philippines, but Elcano navigated the Victoria safely back to Spain.",
    "difficulty": "medium"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Which French military leader crowned himself Emperor of the French at Notre-Dame in 1804?",
    "options": [
      "Napoleon Bonaparte",
      "Louis XIV",
      "Charles de Gaulle",
      "Robespierre"
    ],
    "answer": "Napoleon Bonaparte",
    "explanation": "Napoleon dominated European continental affairs during the Napoleonic Wars until defeat at Waterloo in 1815.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Nelson Mandela was imprisoned for 27 years before being elected President and dismantling which system in South Africa?",
    "options": [
      "Apartheid",
      "Colonial Monarchy",
      "Caste Segregation",
      "Feudal Serfdom"
    ],
    "answer": "Apartheid",
    "explanation": "Mandela won the Nobel Peace Prize in 1993 for peacefully ending institutional racial segregation (Apartheid).",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Which Russian imperial dynasty, reigning for over 300 years, was overthrown in the 1917 Bolshevik Revolution?",
    "options": [
      "Romanov Dynasty",
      "Rurik Dynasty",
      "Habsburg Dynasty",
      "Bourbon Dynasty"
    ],
    "answer": "Romanov Dynasty",
    "explanation": "Tsar Nicholas II and the Romanov royal family were overthrown and executed during the Russian Civil War.",
    "difficulty": "medium"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Which ancient Asian civilization is credited with inventing papermaking, gunpowder, the compass, and printing?",
    "options": [
      "Ancient China",
      "Ancient India",
      "Mesopotamia",
      "Ancient Egypt"
    ],
    "answer": "Ancient China",
    "explanation": "These are celebrated as the 'Four Great Inventions' of ancient Chinese science and civilization.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Which 16th US President issued the Emancipation Proclamation in 1863 declaring enslaved people free?",
    "options": [
      "Abraham Lincoln",
      "Ulysses S. Grant",
      "Andrew Jackson",
      "Theodore Roosevelt"
    ],
    "answer": "Abraham Lincoln",
    "explanation": "Lincoln led the Union through the American Civil War, preserving the nation and ending slavery.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Which classical Greek philosopher was the personal tutor to Alexander the Great and studied under Plato?",
    "options": [
      "Aristotle",
      "Socrates",
      "Pythagoras",
      "Epicurus"
    ],
    "answer": "Aristotle",
    "explanation": "Aristotle taught young Alexander in Macedonia before establishing his own Lyceum academy in Athens.",
    "difficulty": "medium"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "In which tragic year did the British passenger ocean liner RMS Titanic strike an iceberg and sink on its maiden voyage?",
    "options": [
      "1912",
      "1905",
      "1914",
      "1920"
    ],
    "answer": "1912",
    "explanation": "The Titanic sank on the night of April 14-15, 1912 in the North Atlantic, with the loss of over 1,500 lives.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Which mutual defense treaty organization was established in Washington, D.C. in 1949 by Western nations?",
    "options": [
      "NATO (North Atlantic Treaty Organization)",
      "Warsaw Pact",
      "SEATO",
      "League of Nations"
    ],
    "answer": "NATO (North Atlantic Treaty Organization)",
    "explanation": "NATO was founded to provide collective security against potential Soviet Union expansionism.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Which 1757 battle established British East India Company territorial rule in Bengal, led by Robert Clive?",
    "options": [
      "Battle of Plassey",
      "Battle of Buxar",
      "Battle of Panipat",
      "Battle of Haldighati"
    ],
    "answer": "Battle of Plassey",
    "explanation": "Clive defeated Nawab Siraj-ud-Daulah at Plassey (Palashi) after Mir Jafar defected.",
    "difficulty": "medium"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Which ancient cradle of civilization flourished in the fertile river valleys between the Tigris and Euphrates?",
    "options": [
      "Mesopotamia",
      "Mesoamerica",
      "Indus Valley",
      "Nubia"
    ],
    "answer": "Mesopotamia",
    "explanation": "Mesopotamia (modern Iraq) was home to Sumer, Akkad, Babylonia, and Assyria.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Which South American military leader, known as 'El Libertador', liberated Venezuela, Colombia, Ecuador, Peru, and Bolivia?",
    "options": [
      "Sim\u00f3n Bol\u00edvar",
      "Jos\u00e9 de San Mart\u00edn",
      "Bernardo O'Higgins",
      "Che Guevara"
    ],
    "answer": "Sim\u00f3n Bol\u00edvar",
    "explanation": "Bol\u00edvar played a monumental role in Hispanic America's independence from the Spanish Empire.",
    "difficulty": "medium"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "The famous legal code featuring the principle of 'an eye for an eye' was promulgated by which Babylonian king?",
    "options": [
      "Hammurabi",
      "Nebuchadnezzar II",
      "Sargon of Akkad",
      "Gilgamesh"
    ],
    "answer": "Hammurabi",
    "explanation": "The Code of Hammurabi (c. 1750 BC) is one of the earliest and most complete written legal codes carved on basalt.",
    "difficulty": "easy"
  },
  {
    "topic": "history",
    "topicLabel": "World History",
    "topicEmoji": "\ud83c\udfdb\ufe0f",
    "question": "Who was the longest-reigning female monarch in Russian history, expanding the empire during the Russian Enlightenment?",
    "options": [
      "Catherine the Great (Catherine II)",
      "Empress Elizabeth",
      "Anna of Russia",
      "Catherine I"
    ],
    "answer": "Catherine the Great (Catherine II)",
    "explanation": "Catherine the Great ruled Russia from 1762 to 1796, modernizing administration and colonizing Crimea.",
    "difficulty": "medium"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the only even prime number in all of mathematics?",
    "options": [
      "2",
      "0",
      "4",
      "6"
    ],
    "answer": "2",
    "explanation": "2 is prime; every higher even number is divisible by 2 and therefore composite.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the square root of 144 (\u221a144)?",
    "options": [
      "12",
      "14",
      "16",
      "11"
    ],
    "answer": "12",
    "explanation": "12 \u00d7 12 = 144.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "How many degrees is the sum of interior angles in any Euclidean planar triangle?",
    "options": [
      "180\u00b0",
      "360\u00b0",
      "90\u00b0",
      "270\u00b0"
    ],
    "answer": "180\u00b0",
    "explanation": "In Euclidean geometry, the three angles of any triangle always add up to 180\u00b0 (\u03c0 radians).",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the next number in the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, ...?",
    "options": [
      "13",
      "11",
      "15",
      "21"
    ],
    "answer": "13",
    "explanation": "Each number is the sum of the two preceding numbers: 5 + 8 = 13.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "In Roman numerals, which letter represents the number 500?",
    "options": [
      "D",
      "C",
      "M",
      "L"
    ],
    "answer": "D",
    "explanation": "In Roman numerals: L = 50, C = 100, D = 500, M = 1000.",
    "difficulty": "medium"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the mathematical value of 0! (Zero Factorial)?",
    "options": [
      "1",
      "0",
      "Undefined",
      "Infinity"
    ],
    "answer": "1",
    "explanation": "By combinatorial definition (the empty product), 0! equals 1.",
    "difficulty": "medium"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the perimeter of a rectangle with length 8 cm and width 5 cm?",
    "options": [
      "26 cm",
      "40 cm",
      "13 cm",
      "20 cm"
    ],
    "answer": "26 cm",
    "explanation": "Perimeter = 2 \u00d7 (Length + Width) = 2 \u00d7 (8 + 5) = 26 cm.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the probability of rolling an even number on a standard fair 6-sided die?",
    "options": [
      "1/2 (50%)",
      "1/3 (33.3%)",
      "1/6 (16.7%)",
      "2/3 (66.7%)"
    ],
    "answer": "1/2 (50%)",
    "explanation": "There are 3 even numbers (2, 4, 6) out of 6 total faces: 3/6 = 1/2.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the value of Pi (\u03c0) rounded to two decimal places?",
    "options": [
      "3.14",
      "3.41",
      "3.12",
      "3.16"
    ],
    "answer": "3.14",
    "explanation": "Pi is the irrational mathematical constant approximating the ratio of a circle's circumference to diameter.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is an angle called that measures strictly greater than 90\u00b0 and strictly less than 180\u00b0?",
    "options": [
      "Obtuse Angle",
      "Acute Angle",
      "Right Angle",
      "Reflex Angle"
    ],
    "answer": "Obtuse Angle",
    "explanation": "Acute angles are <90\u00b0, right angles are 90\u00b0, and obtuse angles are between 90\u00b0 and 180\u00b0.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "In a right-angled triangle with leg lengths 3 cm and 4 cm, what is the length of the hypotenuse (c\u00b2 = a\u00b2 + b\u00b2)?",
    "options": [
      "5 cm",
      "6 cm",
      "7 cm",
      "4.5 cm"
    ],
    "answer": "5 cm",
    "explanation": "By the Pythagorean theorem: 3\u00b2 + 4\u00b2 = 9 + 16 = 25, and \u221a25 = 5 cm.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "How many flat planar square faces make up a regular 3D geometric cube?",
    "options": [
      "6 faces",
      "8 faces",
      "12 faces",
      "4 faces"
    ],
    "answer": "6 faces",
    "explanation": "A cube has 6 congruent square faces, 12 straight edges, and 8 corner vertices.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "If 3x - 7 = 14, what is the exact algebraic value of x?",
    "options": [
      "x = 7",
      "x = 5",
      "x = 8",
      "x = 6"
    ],
    "answer": "x = 7",
    "explanation": "Add 7 to both sides: 3x = 21. Divide by 3: x = 7.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the Lowest Common Multiple (LCM) of the numbers 4 and 6?",
    "options": [
      "12",
      "24",
      "18",
      "8"
    ],
    "answer": "12",
    "explanation": "Multiples of 4 are 4, 8, 12, 16... Multiples of 6 are 6, 12, 18... Smallest common is 12.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the geometric name for a polygon possessing exactly eight sides and eight interior angles?",
    "options": [
      "Octagon",
      "Heptagon",
      "Hexagon",
      "Nonagon"
    ],
    "answer": "Octagon",
    "explanation": "An octagon is an 8-sided polygon whose interior angles sum to 1,080\u00b0.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the mathematical value of 2 raised to the fifth power (2\u2075)?",
    "options": [
      "32",
      "64",
      "16",
      "25"
    ],
    "answer": "32",
    "explanation": "2 \u00d7 2 \u00d7 2 \u00d7 2 \u00d7 2 = 32.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is 25% of 240?",
    "options": [
      "60",
      "50",
      "75",
      "48"
    ],
    "answer": "60",
    "explanation": "25% is one-quarter (1/4); 240 / 4 = 60.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "How many seconds are there in one complete 60-minute hour?",
    "options": [
      "3,600 seconds",
      "600 seconds",
      "1,800 seconds",
      "4,200 seconds"
    ],
    "answer": "3,600 seconds",
    "explanation": "60 minutes \u00d7 60 seconds per minute = 3,600 seconds.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the sum of angles surrounding a single point in a full complete planar circle?",
    "options": [
      "360\u00b0",
      "180\u00b0",
      "720\u00b0",
      "540\u00b0"
    ],
    "answer": "360\u00b0",
    "explanation": "A full revolution around any point measures exactly 360\u00b0 (2\u03c0 radians).",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the cube root of 64 (\u221b64)?",
    "options": [
      "4",
      "8",
      "16",
      "2"
    ],
    "answer": "4",
    "explanation": "4 \u00d7 4 \u00d7 4 = 64, so the cube root is 4.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "In standard Roman numerals, which letter signifies the integer number 1,000?",
    "options": [
      "M",
      "C",
      "D",
      "K"
    ],
    "answer": "M",
    "explanation": "M originates from the Latin word 'Mille' meaning one thousand.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the geometric formula for the area of a circle with radius r?",
    "options": [
      "\u03c0r\u00b2",
      "2\u03c0r",
      "\u03c0d",
      "4\u03c0r\u00b2"
    ],
    "answer": "\u03c0r\u00b2",
    "explanation": "Area = \u03c0 \u00d7 radius\u00b2; 2\u03c0r is the formula for the circumference.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "If a fair coin is flipped 3 consecutive times, how many total possible sequence outcomes exist?",
    "options": [
      "8 outcomes",
      "6 outcomes",
      "9 outcomes",
      "12 outcomes"
    ],
    "answer": "8 outcomes",
    "explanation": "Each flip has 2 independent choices: 2 \u00d7 2 \u00d7 2 = 2\u00b3 = 8 possible outcomes.",
    "difficulty": "medium"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the arithmetic mean (average) of the dataset numbers: 10, 20, 30, 40, and 50?",
    "options": [
      "30",
      "25",
      "35",
      "28"
    ],
    "answer": "30",
    "explanation": "Sum = 150. Count = 5. Average = 150 / 5 = 30.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is a triangle called whose all three sides and all three interior angles (each 60\u00b0) are identical?",
    "options": [
      "Equilateral Triangle",
      "Isosceles Triangle",
      "Scalene Triangle",
      "Right Triangle"
    ],
    "answer": "Equilateral Triangle",
    "explanation": "An equilateral triangle has 3 equal sides and 3 equal 60\u00b0 angles.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the mathematical product of multiplying two negative integers: (-5) \u00d7 (-4)?",
    "options": [
      "+20",
      "-20",
      "-9",
      "+1"
    ],
    "answer": "+20",
    "explanation": "The product of two negative numbers is always positive: (-5) \u00d7 (-4) = +20.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "Which real number is defined as neither strictly positive nor strictly negative?",
    "options": [
      "Zero (0)",
      "One (1)",
      "-1",
      "Infinity"
    ],
    "answer": "Zero (0)",
    "explanation": "Zero sits precisely at the origin boundary on the real number line.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the mathematical ratio of a circle's circumference to its diameter (C / d)?",
    "options": [
      "Pi (\u03c0)",
      "Euler's number (e)",
      "Golden Ratio (\u03c6)",
      "2\u03c0"
    ],
    "answer": "Pi (\u03c0)",
    "explanation": "By definition, the constant Pi is the exact ratio of any circle's circumference to its diameter.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "How many total vertices (corners) does a conventional solid cube have?",
    "options": [
      "8 vertices",
      "6 vertices",
      "12 vertices",
      "16 vertices"
    ],
    "answer": "8 vertices",
    "explanation": "A cube has 8 corner points where 3 edges meet at right angles.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the decimal number 0.75 expressed as a simplified vulgar fraction in lowest terms?",
    "options": [
      "3/4",
      "7/10",
      "4/5",
      "2/3"
    ],
    "answer": "3/4",
    "explanation": "75/100 simplified by dividing numerator and denominator by 25 yields 3/4.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the very next prime number immediately following 29?",
    "options": [
      "31",
      "33",
      "37",
      "35"
    ],
    "answer": "31",
    "explanation": "31 is prime (divisible only by 1 and itself); 33 = 3\u00d711 and 35 = 5\u00d77.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the product of 15 multiplied by 15 (15\u00b2)?",
    "options": [
      "225",
      "215",
      "245",
      "195"
    ],
    "answer": "225",
    "explanation": "15 \u00d7 15 = 225.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the median value of the ordered numerical dataset: [3, 7, 9, 15, 21]?",
    "options": [
      "9",
      "11",
      "7",
      "15"
    ],
    "answer": "9",
    "explanation": "The median of 5 sorted numbers is the middle (3rd) item, which is 9.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the geometrical name for a two-dimensional polygon with exactly five straight sides?",
    "options": [
      "Pentagon",
      "Hexagon",
      "Heptagon",
      "Quadrilateral"
    ],
    "answer": "Pentagon",
    "explanation": "A pentagon has 5 straight sides and interior angles summing to 540\u00b0.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "If an item's retail price rises from $100 to $120, what is the exact percentage increase?",
    "options": [
      "20%",
      "25%",
      "15%",
      "12%"
    ],
    "answer": "20%",
    "explanation": "Increase = $20. ($20 / $100) \u00d7 100% = 20%.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "In exponent rules, what is the value of any non-zero number raised to the zero power (e.g. 10\u2070)?",
    "options": [
      "1",
      "0",
      "10",
      "Undefined"
    ],
    "answer": "1",
    "explanation": "Any non-zero base raised to the power of zero equals 1 (x\u2070 = 1).",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the sum of interior angles in any planar 4-sided quadrilateral (e.g. rectangle or trapezoid)?",
    "options": [
      "360\u00b0",
      "180\u00b0",
      "540\u00b0",
      "720\u00b0"
    ],
    "answer": "360\u00b0",
    "explanation": "Formula: (n - 2) \u00d7 180\u00b0 = (4 - 2) \u00d7 180\u00b0 = 360\u00b0.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the multiplicative reciprocal of the fraction 4/5?",
    "options": [
      "5/4",
      "-4/5",
      "1/4",
      "5/8"
    ],
    "answer": "5/4",
    "explanation": "The reciprocal swaps the numerator and denominator: (4/5) \u00d7 (5/4) = 1.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "How many degrees does a perpendicular right angle measure?",
    "options": [
      "90\u00b0",
      "45\u00b0",
      "180\u00b0",
      "60\u00b0"
    ],
    "answer": "90\u00b0",
    "explanation": "A right angle is exactly one quarter of a full 360\u00b0 revolution: 90\u00b0.",
    "difficulty": "easy"
  },
  {
    "topic": "math",
    "topicLabel": "Math & Logic",
    "topicEmoji": "\ud83e\uddee",
    "question": "What is the Greatest Common Divisor (GCD / HCF) of the integers 18 and 24?",
    "options": [
      "6",
      "12",
      "3",
      "8"
    ],
    "answer": "6",
    "explanation": "Divisors of 18: 1, 2, 3, 6, 9, 18. Divisors of 24: 1, 2, 3, 4, 6, 8, 12, 24. Greatest common is 6.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "What is the largest ocean on planet Earth by surface area?",
    "options": [
      "Pacific Ocean",
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean"
    ],
    "answer": "Pacific Ocean",
    "explanation": "The Pacific Ocean covers over 30% of Earth\u2019s surface, larger than all of Earth\u2019s land area combined.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "What is the federal capital city of Australia?",
    "options": [
      "Canberra",
      "Sydney",
      "Melbourne",
      "Brisbane"
    ],
    "answer": "Canberra",
    "explanation": "Canberra was chosen as the compromise capital in 1908 to resolve the rivalry between Sydney and Melbourne.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "Which river is widely recognized as the longest river in the world?",
    "options": [
      "Nile River",
      "Amazon River",
      "Yangtze River",
      "Mississippi River"
    ],
    "answer": "Nile River",
    "explanation": "Flowing over 6,650 km through northeast Africa, the Nile is the longest river on Earth.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "What is the highest mountain peak above sea level on planet Earth?",
    "options": [
      "Mount Everest (8,848m)",
      "K2 (8,611m)",
      "Kangchenjunga (8,586m)",
      "Lhotse (8,516m)"
    ],
    "answer": "Mount Everest (8,848m)",
    "explanation": "Mount Everest in the Himalayas reaches an elevation of 8,848.86 meters.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "Which country has the greatest number of natural lakes in the world?",
    "options": [
      "Canada",
      "Russia",
      "United States",
      "Finland"
    ],
    "answer": "Canada",
    "explanation": "Canada contains over 60% of all the natural lakes on Earth (more than 879,000 lakes).",
    "difficulty": "medium"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "Through which European capital city does the River Seine flow?",
    "options": [
      "Paris",
      "London",
      "Berlin",
      "Rome"
    ],
    "answer": "Paris",
    "explanation": "The Seine flows directly through the heart of Paris, France.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "Which hot desert in northern Africa is the largest non-polar desert on planet Earth?",
    "options": [
      "Sahara Desert",
      "Gobi Desert",
      "Kalahari Desert",
      "Arabian Desert"
    ],
    "answer": "Sahara Desert",
    "explanation": "The Sahara spans over 9.2 million square kilometers, comparable in size to China or the United States.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "What is the deepest oceanic trench on Earth, situated in the western Pacific Ocean?",
    "options": [
      "Mariana Trench (~11,034m)",
      "Puerto Rico Trench",
      "Java Trench",
      "Tonga Trench"
    ],
    "answer": "Mariana Trench (~11,034m)",
    "explanation": "Challenger Deep within the Mariana Trench reaches nearly 11 kilometers below sea level.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "Which is the only continent on Earth that contains no native human population and no sovereign nations?",
    "options": [
      "Antarctica",
      "Australia",
      "Greenland",
      "Arctic"
    ],
    "answer": "Antarctica",
    "explanation": "Antarctica is governed internationally by the Antarctic Treaty System exclusively for scientific research.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "Which line of 0\u00b0 latitude divides Earth into the Northern and Southern Hemispheres?",
    "options": [
      "Equator",
      "Prime Meridian",
      "Tropic of Cancer",
      "Tropic of Capricorn"
    ],
    "answer": "Equator",
    "explanation": "The Equator is an imaginary line around the middle of Earth, spanning roughly 40,075 kilometers.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "What is the national capital city of Canada?",
    "options": [
      "Ottawa",
      "Toronto",
      "Vancouver",
      "Montreal"
    ],
    "answer": "Ottawa",
    "explanation": "Ottawa in Ontario was designated Canada's capital by Queen Victoria in 1857.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "Which country is the largest in the world by total geographical land area?",
    "options": [
      "Russia",
      "Canada",
      "China",
      "United States"
    ],
    "answer": "Russia",
    "explanation": "Russia spans over 17 million square kilometers, covering more than one-eighth of Earth's inhabited land area.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "Which river carries the greatest volumetric discharge of water into the ocean, far surpassing all others?",
    "options": [
      "Amazon River",
      "Congo River",
      "Nile River",
      "Yangtze River"
    ],
    "answer": "Amazon River",
    "explanation": "The Amazon accounts for roughly 20% of the world's total river flow into oceans.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "Which narrow maritime strait connects the Atlantic Ocean directly to the Mediterranean Sea?",
    "options": [
      "Strait of Gibraltar",
      "Bosphorus Strait",
      "Strait of Hormuz",
      "Strait of Malacca"
    ],
    "answer": "Strait of Gibraltar",
    "explanation": "The Strait of Gibraltar separates Spain from Morocco by only 13 kilometers at its narrowest point.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "What is the world's highest uninterrupted waterfall, cascading 979 meters in Venezuela?",
    "options": [
      "Angel Falls",
      "Niagara Falls",
      "Victoria Falls",
      "Iguazu Falls"
    ],
    "answer": "Angel Falls",
    "explanation": "Angel Falls (Salto \u00c1ngel) plunges from the edge of the Auy\u00e1n-tepui mountain in Canaima National Park.",
    "difficulty": "medium"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "What is the capital city of New Zealand?",
    "options": [
      "Wellington",
      "Auckland",
      "Christchurch",
      "Queenstown"
    ],
    "answer": "Wellington",
    "explanation": "Wellington is the world's southernmost sovereign national capital city.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "What is the largest island in the world that is not classified as a continental landmass?",
    "options": [
      "Greenland",
      "New Guinea",
      "Borneo",
      "Madagascar"
    ],
    "answer": "Greenland",
    "explanation": "Greenland spans 2.16 million km\u00b2, an autonomous territory of Denmark covered predominantly by an ice sheet.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "Which mountain range traditionally forms the geographic boundary between the continents of Europe and Asia?",
    "options": [
      "Ural Mountains",
      "Alps",
      "Himalayas",
      "Caucasus Mountains"
    ],
    "answer": "Ural Mountains",
    "explanation": "The Ural Mountains run north-south through western Russia from the Arctic Ocean to the Ural River.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "Which country possesses the longest overall marine coastline in the world (over 202,000 km)?",
    "options": [
      "Canada",
      "Norway",
      "Indonesia",
      "Australia"
    ],
    "answer": "Canada",
    "explanation": "Canada's jagged Arctic and oceanic coastlines total approximately 202,080 kilometers.",
    "difficulty": "medium"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "What is the lowest natural dry land elevation point on Earth's surface (-430 meters below sea level)?",
    "options": [
      "Shores of the Dead Sea",
      "Death Valley",
      "Lake Eyre",
      "Danakil Depression"
    ],
    "answer": "Shores of the Dead Sea",
    "explanation": "The hypersaline Dead Sea between Jordan and Israel sits over 430 meters below global mean sea level.",
    "difficulty": "medium"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "What is the federal de facto administrative capital city of Switzerland?",
    "options": [
      "Bern",
      "Zurich",
      "Geneva",
      "Basel"
    ],
    "answer": "Bern",
    "explanation": "Bern serves as the Swiss Federal City where the parliament and federal council reside.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "Which massive tropical rainforest in South America produces substantial global oxygen and biodiversity?",
    "options": [
      "Amazon Rainforest",
      "Congo Rainforest",
      "Daintree Rainforest",
      "Southeast Asian Rainforest"
    ],
    "answer": "Amazon Rainforest",
    "explanation": "The Amazon covers roughly 5.5 million km\u00b2 across 9 South American nations, predominantly Brazil.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "Which country spans the greatest number of contiguous time zones across a single landmass (11 time zones)?",
    "options": [
      "Russia",
      "United States",
      "Canada",
      "China"
    ],
    "answer": "Russia",
    "explanation": "Russia spans from UTC+2 in Kaliningrad to UTC+12 in Kamchatka across 11 consecutive time zones.",
    "difficulty": "medium"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "Off the coast of which nation is the Great Barrier Reef, the largest coral reef system on Earth, located?",
    "options": [
      "Australia",
      "Indonesia",
      "Fiji",
      "Philippines"
    ],
    "answer": "Australia",
    "explanation": "The reef stretches over 2,300 km along the coast of Queensland in northeast Australia.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "What is the national capital city of Egypt?",
    "options": [
      "Cairo",
      "Alexandria",
      "Giza",
      "Luxor"
    ],
    "answer": "Cairo",
    "explanation": "Cairo is the largest metropolitan city in the Arab world, located along the Nile River.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "Through which major historic European capital city does the River Thames flow?",
    "options": [
      "London",
      "Dublin",
      "Edinburgh",
      "Cardiff"
    ],
    "answer": "London",
    "explanation": "The River Thames flows through the centre of London into the North Sea.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "What is the smallest internationally recognized sovereign independent state in the world by area and population?",
    "options": [
      "Vatican City",
      "Monaco",
      "Nauru",
      "San Marino"
    ],
    "answer": "Vatican City",
    "explanation": "Vatican City is an enclave in Rome covering only 0.49 square kilometers (121 acres).",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "Which artificial maritime waterway opened in 1914 connects the Atlantic Ocean to the Pacific Ocean through Central America?",
    "options": [
      "Panama Canal",
      "Suez Canal",
      "Kiel Canal",
      "Erie Canal"
    ],
    "answer": "Panama Canal",
    "explanation": "The 82-km canal cuts across the Isthmus of Panama, eliminating the hazardous Cape Horn navigation.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "Which lake in Siberia is both the deepest freshwater lake (1,642m) and the oldest lake in the world?",
    "options": [
      "Lake Baikal",
      "Lake Superior",
      "Lake Victoria",
      "Caspian Sea"
    ],
    "answer": "Lake Baikal",
    "explanation": "Lake Baikal contains more than 20% of the world's unfrozen surface freshwater.",
    "difficulty": "medium"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "In which Southeast Asian country are the famous ancient temple ruins of Angkor Wat situated?",
    "options": [
      "Cambodia",
      "Thailand",
      "Vietnam",
      "Laos"
    ],
    "answer": "Cambodia",
    "explanation": "Built in the 12th century by the Khmer Empire, Angkor Wat is the largest religious structure in the world.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "What is the capital city of South Korea?",
    "options": [
      "Seoul",
      "Busan",
      "Incheon",
      "Daegu"
    ],
    "answer": "Seoul",
    "explanation": "Seoul has been the historic capital of Korea for over six centuries.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "Which Scandinavian country is famous for its dramatic coastal fjords and is known as the 'Land of the Midnight Sun'?",
    "options": [
      "Norway",
      "Sweden",
      "Finland",
      "Denmark"
    ],
    "answer": "Norway",
    "explanation": "Norway features deep glacial fjords (like Geirangerfjord) and prolonged continuous daylight in summer.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "Which non-polar coastal desert in Chile is recognized by climatologists as the driest place on planet Earth?",
    "options": [
      "Atacama Desert",
      "Namib Desert",
      "Mojave Desert",
      "Sonoran Desert"
    ],
    "answer": "Atacama Desert",
    "explanation": "Certain weather stations in the Atacama Desert have never recorded a single drop of rain in history.",
    "difficulty": "medium"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "What is the planned modernist federal capital city of Brazil, inaugurated in 1960?",
    "options": [
      "Bras\u00edlia",
      "Rio de Janeiro",
      "S\u00e3o Paulo",
      "Salvador"
    ],
    "answer": "Bras\u00edlia",
    "explanation": "Bras\u00edlia was designed by urban planner L\u00facio Costa and architect Oscar Niemeyer to move the capital inland.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "Which enclave kingdom in southern Africa is completely surrounded on all sides by the Republic of South Africa?",
    "options": [
      "Lesotho",
      "Eswatini (Swaziland)",
      "Botswana",
      "Namibia"
    ],
    "answer": "Lesotho",
    "explanation": "Lesotho is one of only three sovereign nations completely encircled by a single other country (along with Vatican and San Marino).",
    "difficulty": "medium"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "What is the highest and most iconic active stratovolcano peak in Japan, sacred to Shinto culture?",
    "options": [
      "Mount Fuji (3,776m)",
      "Mount Aso",
      "Mount Ontake",
      "Mount Hiei"
    ],
    "answer": "Mount Fuji (3,776m)",
    "explanation": "Mount Fuji is an exceptionally symmetrical volcanic cone located southwest of Tokyo.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "What hypersaline landlocked body of water has water so dense that swimmers naturally float without effort?",
    "options": [
      "Dead Sea",
      "Red Sea",
      "Black Sea",
      "Caspian Sea"
    ],
    "answer": "Dead Sea",
    "explanation": "With salinity over 34%, the Dead Sea is roughly 9.6 times saltier than the ocean, yielding buoyant lift.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "What is the coastal capital city of Portugal, located where the Tagus River meets the Atlantic Ocean?",
    "options": [
      "Lisbon",
      "Porto",
      "Coimbra",
      "Braga"
    ],
    "answer": "Lisbon",
    "explanation": "Lisbon is one of the oldest cities in Western Europe, predating London, Paris, and Rome.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "Which continent contains the largest total number of sovereign independent countries (54 nations)?",
    "options": [
      "Africa",
      "Asia",
      "Europe",
      "Americas"
    ],
    "answer": "Africa",
    "explanation": "Africa has 54 fully recognized UN member states, followed by Asia with 49.",
    "difficulty": "easy"
  },
  {
    "topic": "geography",
    "topicLabel": "Geography & Wonders",
    "topicEmoji": "\ud83c\udf0d",
    "question": "What is the capital city of Turkey, designated in 1923 to replace Istanbul by Mustafa Kemal Atat\u00fcrk?",
    "options": [
      "Ankara",
      "Istanbul",
      "Izmir",
      "Antalya"
    ],
    "answer": "Ankara",
    "explanation": "Ankara was chosen as the capital of the new Turkish Republic due to its central Anatolian strategic position.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Who is widely credited with inventing the World Wide Web in 1989 at CERN?",
    "options": [
      "Tim Berners-Lee",
      "Bill Gates",
      "Steve Jobs",
      "Vint Cerf"
    ],
    "answer": "Tim Berners-Lee",
    "explanation": "British scientist Sir Tim Berners-Lee invented the World Wide Web in 1989 while working at CERN.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "In computer science, how many bits make up one standard byte?",
    "options": [
      "8 bits",
      "4 bits",
      "16 bits",
      "32 bits"
    ],
    "answer": "8 bits",
    "explanation": "A byte is a unit of digital information that most commonly consists of eight bits.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Which company developed the Android mobile operating system before it was acquired by Google in 2005?",
    "options": [
      "Android Inc.",
      "Motorola",
      "Nokia",
      "Sun Microsystems"
    ],
    "answer": "Android Inc.",
    "explanation": "Android Inc. was founded in Palo Alto, California in 2003 by Andy Rubin, Rich Miner, Nick Sears, and Chris White.",
    "difficulty": "medium"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "What does the acronym 'HTTP' stand for in web internet protocols?",
    "options": [
      "HyperText Transfer Protocol",
      "High Technology Transfer Program",
      "Hyperlink Text Term Protocol",
      "Hybrid Transfer Text Process"
    ],
    "answer": "HyperText Transfer Protocol",
    "explanation": "HTTP is the foundational application protocol used for distributed hypermedia information systems.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Who is historically credited with the patent and invention of the practical telephone in 1876?",
    "options": [
      "Alexander Graham Bell",
      "Thomas Edison",
      "Nikola Tesla",
      "Guglielmo Marconi"
    ],
    "answer": "Alexander Graham Bell",
    "explanation": "Bell was granted US patent 174,465 for the acoustic electric telegraph and telephone.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Who invented the long-lasting practical incandescent electric light bulb and the phonograph?",
    "options": [
      "Thomas Edison",
      "Benjamin Franklin",
      "Michael Faraday",
      "James Watt"
    ],
    "answer": "Thomas Edison",
    "explanation": "Edison developed a carbonized bamboo filament bulb burning over 1,200 hours in 1879.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Which aviation pioneers made the first powered, controlled, sustained airplane flights at Kitty Hawk in 1903?",
    "options": [
      "Orville and Wilbur Wright (Wright Brothers)",
      "Glenn Curtiss",
      "Alberto Santos-Dumont",
      "Charles Lindbergh"
    ],
    "answer": "Orville and Wilbur Wright (Wright Brothers)",
    "explanation": "The Wright brothers achieved first flight on December 17, 1903 with their Wright Flyer biplane.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Who is celebrated as the world's very first computer programmer for her 1843 algorithm for Babbage's Analytical Engine?",
    "options": [
      "Ada Lovelace",
      "Grace Hopper",
      "Margaret Hamilton",
      "Alan Turing"
    ],
    "answer": "Ada Lovelace",
    "explanation": "Lovelace recognized that Babbage's engine had applications beyond pure calculation, authoring the first algorithm.",
    "difficulty": "medium"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Who co-founded Apple Computer in 1976 alongside Steve Jobs, hand-building the Apple I computer?",
    "options": [
      "Steve Wozniak",
      "Ronald Wayne",
      "Bill Gates",
      "Tim Cook"
    ],
    "answer": "Steve Wozniak",
    "explanation": "Steve 'Woz' Wozniak designed and assembled both the Apple I and Apple II personal computers.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Which Finnish computer scientist created the free and open-source Linux kernel in 1991?",
    "options": [
      "Linus Torvalds",
      "Richard Stallman",
      "Bjarne Stroustrup",
      "Ken Thompson"
    ],
    "answer": "Linus Torvalds",
    "explanation": "Linus Torvalds created Linux while a student at the University of Helsinki, and also later developed Git.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Which widely-used programming language was created by Guido van Rossum and named after a BBC comedy sketch show?",
    "options": [
      "Python",
      "Java",
      "Ruby",
      "Perl"
    ],
    "answer": "Python",
    "explanation": "Guido van Rossum named Python after 'Monty Python's Flying Circus' to make coding fun.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Which British mathematician and cryptanalyst is revered as the father of modern computing for cracking the Enigma cipher?",
    "options": [
      "Alan Turing",
      "Charles Babbage",
      "John von Neumann",
      "Claude Shannon"
    ],
    "answer": "Alan Turing",
    "explanation": "Alan Turing designed the Bombe decryption machines at Bletchley Park and formalized Turing machines.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "What does the abbreviation 'CPU' stand for in computer hardware architecture?",
    "options": [
      "Central Processing Unit",
      "Core Power Unit",
      "Computer Program Utility",
      "Central Performance Ultra"
    ],
    "answer": "Central Processing Unit",
    "explanation": "The CPU is the electronic circuitry that executes instructions comprising a computer program.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "What type of computer memory is volatile, temporarily storing active programs and wiping clear on shutdown?",
    "options": [
      "RAM (Random Access Memory)",
      "ROM (Read-Only Memory)",
      "SSD",
      "Hard Disk Drive"
    ],
    "answer": "RAM (Random Access Memory)",
    "explanation": "RAM offers high-speed read/write access for running operating systems and applications, but requires power to retain state.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Which programming language was created in only 10 days in May 1995 by Brendan Eich at Netscape?",
    "options": [
      "JavaScript",
      "Python",
      "PHP",
      "Java"
    ],
    "answer": "JavaScript",
    "explanation": "JavaScript was developed under the codename Mocha to provide dynamic scripts in Netscape Navigator.",
    "difficulty": "medium"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "What standard language is used worldwide to manage, query, and manipulate data in relational databases?",
    "options": [
      "SQL (Structured Query Language)",
      "HTML",
      "JSON",
      "Bash"
    ],
    "answer": "SQL (Structured Query Language)",
    "explanation": "SQL handles tabular relational operations including SELECT, INSERT, UPDATE, and DELETE across tables.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "In computer data storage, exactly how many bytes make up one standard binary Kibibyte / Kilobyte (2\u00b9\u2070)?",
    "options": [
      "1,024 bytes",
      "1,000 bytes",
      "512 bytes",
      "2,048 bytes"
    ],
    "answer": "1,024 bytes",
    "explanation": "In binary digital computing, 2\u00b9\u2070 = 1,024 bytes.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Whose law observed in 1965 that the number of transistors on a microchip doubles approximately every two years?",
    "options": [
      "Moore's Law (Gordon Moore)",
      "Metcalfe's Law",
      "Amdahl's Law",
      "Bell's Law"
    ],
    "answer": "Moore's Law (Gordon Moore)",
    "explanation": "Intel co-founder Gordon Moore noted this exponential trajectory in microchip density and computing efficiency.",
    "difficulty": "medium"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Which short-range wireless networking technology was named after the 10th-century Scandinavian King Harald?",
    "options": [
      "Bluetooth",
      "Wi-Fi",
      "Zigbee",
      "NFC"
    ],
    "answer": "Bluetooth",
    "explanation": "King Harald Bluetooth united Scandinavian tribes, just as the standard unites PCs, phones, and peripherals.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "What does the 'S' designate in the secure internet web browsing protocol 'HTTPS'?",
    "options": [
      "Secure (SSL / TLS)",
      "System",
      "Server",
      "Speed"
    ],
    "answer": "Secure (SSL / TLS)",
    "explanation": "HTTPS encrypts communications between client and server using Transport Layer Security (TLS).",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "What does the acronym 'USB' stand for in standard hardware peripheral connectors?",
    "options": [
      "Universal Serial Bus",
      "United System Board",
      "Universal Speed Byte",
      "Unified Socket Bridge"
    ],
    "answer": "Universal Serial Bus",
    "explanation": "USB was developed in 1996 by a consortium of Compaq, DEC, IBM, Intel, Microsoft, and NEC.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Which tech company launched the Windows graphical operating system for personal computers in November 1985?",
    "options": [
      "Microsoft",
      "Apple",
      "IBM",
      "Xerox"
    ],
    "answer": "Microsoft",
    "explanation": "Bill Gates and Paul Allen's Microsoft released Windows 1.0 as a graphical shell for MS-DOS.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "In artificial intelligence, what does the 'GPT' acronym in OpenAI's ChatGPT stand for?",
    "options": [
      "Generative Pre-trained Transformer",
      "General Processing Tool",
      "Graphic Protocol Technology",
      "Global Programmable Tensor"
    ],
    "answer": "Generative Pre-trained Transformer",
    "explanation": "GPT relies on the transformer neural network architecture introduced by Google researchers in 2017.",
    "difficulty": "medium"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Which legacy universal file system format is universally recognized across Windows, macOS, Linux, and gaming consoles?",
    "options": [
      "FAT32 / exFAT",
      "NTFS",
      "APFS",
      "ext4"
    ],
    "answer": "FAT32 / exFAT",
    "explanation": "File Allocation Table (FAT32) remains universally supported on USB drives and SD memory cards.",
    "difficulty": "medium"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "What primary markup language invented by Tim Berners-Lee formats headings, paragraphs, and links on web pages?",
    "options": [
      "HTML (HyperText Markup Language)",
      "CSS",
      "XML",
      "Markdown"
    ],
    "answer": "HTML (HyperText Markup Language)",
    "explanation": "HTML defines the structural semantic skeleton of all websites on the World Wide Web.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "What specialized processor with thousands of cores is designed for rapid mathematical rendering and AI training?",
    "options": [
      "GPU (Graphics Processing Unit)",
      "CPU",
      "APU",
      "BIOS"
    ],
    "answer": "GPU (Graphics Processing Unit)",
    "explanation": "GPUs excel at massive parallel matrix calculations essential for modern 3D gaming and neural networks.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "What does 'URL' stand for in global web address navigation (e.g. https://www.example.com)?",
    "options": [
      "Uniform Resource Locator",
      "Universal Routing Link",
      "Unified Resource Link",
      "User Reference Location"
    ],
    "answer": "Uniform Resource Locator",
    "explanation": "A URL specifies the unique web location and protocol to access an online resource.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "What malicious software category encrypts a victim's files and demands digital ransom payments to restore decryption keys?",
    "options": [
      "Ransomware",
      "Trojan Horse",
      "Spyware",
      "Adware"
    ],
    "answer": "Ransomware",
    "explanation": "Ransomware like WannaCry and LockBit holds data hostage using military-grade cryptographic algorithms.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Which open-source distributed version control system was created by Linus Torvalds in 2005 to manage kernel code?",
    "options": [
      "Git",
      "Subversion (SVN)",
      "Mercurial",
      "CVS"
    ],
    "answer": "Git",
    "explanation": "Git allows branch tracking, commits, and collaborative merges across millions of software projects.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Which American computer scientist popularized the term 'debugging' after finding a real moth trapped in the Harvard Mark II?",
    "options": [
      "Grace Hopper",
      "Margaret Hamilton",
      "Barbara Liskov",
      "Frances Allen"
    ],
    "answer": "Grace Hopper",
    "explanation": "Rear Admiral Grace Hopper taped the moth into her logbook with the notation 'First actual case of bug being found'.",
    "difficulty": "medium"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Which private space exploration company was founded by Elon Musk in 2002 to pioneer reusable orbital rockets?",
    "options": [
      "SpaceX",
      "Blue Origin",
      "Virgin Galactic",
      "Rocket Lab"
    ],
    "answer": "SpaceX",
    "explanation": "SpaceX developed Falcon 9, the first orbital class rocket capable of vertical propulsive landing and reuse.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "What does the abbreviation 'SSD' stand for in modern non-mechanical flash storage drives?",
    "options": [
      "Solid State Drive",
      "Super Speed Disk",
      "System Storage Device",
      "Static Serial Drive"
    ],
    "answer": "Solid State Drive",
    "explanation": "SSDs use NAND flash memory chips with no moving parts, delivering vastly faster read/write speeds than HDDs.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Which object-oriented programming language was developed by James Gosling at Sun Microsystems with the slogan 'Write Once, Run Anywhere'?",
    "options": [
      "Java",
      "C++",
      "C#",
      "Kotlin"
    ],
    "answer": "Java",
    "explanation": "Java programs compile to bytecode executed across platforms by the Java Virtual Machine (JVM).",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Which search engine company was founded in September 1998 by Stanford Ph.D. students Larry Page and Sergey Brin?",
    "options": [
      "Google",
      "Yahoo!",
      "AltaVista",
      "Lycos"
    ],
    "answer": "Google",
    "explanation": "Page and Brin invented the PageRank algorithm, organizing global web search from a Menlo Park garage.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "What vital network system serves as the internet's phone book, translating human-friendly domain names into numerical IP addresses?",
    "options": [
      "DNS (Domain Name System)",
      "DHCP",
      "FTP",
      "SNMP"
    ],
    "answer": "DNS (Domain Name System)",
    "explanation": "DNS maps web URLs like funzo.app to machine routable IP addresses like 192.0.2.1.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "What is the single smallest indivisible unit of digital data in binary computing, representing either 0 or 1?",
    "options": [
      "Bit",
      "Byte",
      "Nibble",
      "Pixel"
    ],
    "answer": "Bit",
    "explanation": "Short for 'binary digit', a bit represents an electrical on/off or true/false state.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Who invented the computer mouse, demonstrating it alongside hypertext and windows in 'The Mother of All Demos' in 1968?",
    "options": [
      "Douglas Engelbart",
      "Alan Kay",
      "Bill Atkinson",
      "Steve Jobs"
    ],
    "answer": "Douglas Engelbart",
    "explanation": "Douglas Engelbart constructed the first wooden computer mouse prototype at Stanford Research Institute.",
    "difficulty": "medium"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "In which landmark year did Steve Jobs unveil the original revolutionary iPhone to the world?",
    "options": [
      "2007",
      "2005",
      "2009",
      "2006"
    ],
    "answer": "2007",
    "explanation": "Jobs introduced the iPhone at Macworld on January 9, 2007, merging an iPod, phone, and internet communicator.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "Which cloud computing infrastructure platform was launched by Amazon in 2006, pioneering modern on-demand cloud servers?",
    "options": [
      "AWS (Amazon Web Services)",
      "Microsoft Azure",
      "Google Cloud Platform",
      "IBM Cloud"
    ],
    "answer": "AWS (Amazon Web Services)",
    "explanation": "AWS launched S3 storage and EC2 compute instances in 2006, creating the global cloud infrastructure paradigm.",
    "difficulty": "easy"
  },
  {
    "topic": "tech",
    "topicLabel": "Tech & Inventions",
    "topicEmoji": "\ud83d\udcbb",
    "question": "What is the cryptographic consensus mechanism invented by Satoshi Nakamoto to secure Bitcoin blockchain transactions?",
    "options": [
      "Proof of Work (PoW)",
      "Proof of Stake (PoS)",
      "Delegated Proof of Stake",
      "Proof of Authority"
    ],
    "answer": "Proof of Work (PoW)",
    "explanation": "Proof of work requires miners to expend computational energy solving SHA-256 cryptographic hashes.",
    "difficulty": "medium"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "What is the official marathon race distance standardized at the Olympic Games?",
    "options": [
      "42.195 km (26 miles 385 yards)",
      "40.000 km",
      "45.200 km",
      "50.000 km"
    ],
    "answer": "42.195 km (26 miles 385 yards)",
    "explanation": "Standardized at the 1908 London Olympics so the race would start at Windsor Castle and finish at the Royal Box.",
    "difficulty": "medium"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "How many players are on the field for one team in a standard association football (soccer) match?",
    "options": [
      "11 players",
      "10 players",
      "12 players",
      "9 players"
    ],
    "answer": "11 players",
    "explanation": "Each football team fields 11 players including 1 goalkeeper.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "Which legendary athlete holds the unbroken world record for the 100m sprint at 9.58 seconds?",
    "options": [
      "Usain Bolt",
      "Tyson Gay",
      "Yohan Blake",
      "Carl Lewis"
    ],
    "answer": "Usain Bolt",
    "explanation": "Jamaica\u2019s Usain Bolt set the unbroken 100m world record of 9.58s at the 2009 Berlin World Athletics Championships.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "In tennis, how many Grand Slam tournaments are held each calendar year?",
    "options": [
      "4 tournaments",
      "3 tournaments",
      "5 tournaments",
      "6 tournaments"
    ],
    "answer": "4 tournaments",
    "explanation": "The four majors are the Australian Open, French Open (Roland Garros), Wimbledon, and the US Open.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "How many interlocking colored rings constitute the official worldwide Olympic Games symbol?",
    "options": [
      "5 rings",
      "4 rings",
      "6 rings",
      "7 rings"
    ],
    "answer": "5 rings",
    "explanation": "The five rings (blue, yellow, black, green, red) represent the five inhabited continents united in athletics.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "Which country is credited with inventing the modern sport of Table Tennis (Ping Pong) in the late 19th century?",
    "options": [
      "England",
      "China",
      "Japan",
      "Sweden"
    ],
    "answer": "England",
    "explanation": "Victorian upper-class gentlemen in England improvised table tennis after dinner using books and champagne corks.",
    "difficulty": "medium"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "In cricket, how many runs are awarded when a batter hits the ball over the boundary rope on the full without bouncing?",
    "options": [
      "6 runs",
      "4 runs",
      "5 runs",
      "8 runs"
    ],
    "answer": "6 runs",
    "explanation": "A boundary hit on the full scores 6 runs; bouncing before touching the boundary scores 4.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "In which popular sport would you execute an alley-oop or slam dunk?",
    "options": [
      "Basketball",
      "Volleyball",
      "Tennis",
      "Handball"
    ],
    "answer": "Basketball",
    "explanation": "An alley-oop is an offensive basketball play where a player tosses the ball near the basket for a teammate to dunk.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "Every how many years is the FIFA Men's World Cup football tournament normally staged?",
    "options": [
      "4 years",
      "2 years",
      "3 years",
      "5 years"
    ],
    "answer": "4 years",
    "explanation": "The FIFA World Cup has been contested every four years since 1930 (except during WWII in 1942 and 1946).",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "Which legendary American swimmer won a historic all-time record of 23 Olympic Gold medals?",
    "options": [
      "Michael Phelps",
      "Mark Spitz",
      "Ryan Lochte",
      "Caeleb Dressel"
    ],
    "answer": "Michael Phelps",
    "explanation": "Michael Phelps won 28 total Olympic medals (23 gold, 3 silver, 2 bronze) across five Summer Olympic Games.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "Which South American nation hosted and won the inaugural FIFA World Cup tournament in 1930?",
    "options": [
      "Uruguay",
      "Brazil",
      "Argentina",
      "Chile"
    ],
    "answer": "Uruguay",
    "explanation": "Uruguay defeated neighboring Argentina 4-2 in the final at Estadio Centenario in Montevideo.",
    "difficulty": "medium"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "In cricket, what is the term for a bowler who dismisses three opposing batsmen on three consecutive deliveries?",
    "options": [
      "Hat-trick",
      "Triple Strike",
      "Googly",
      "Maiden"
    ],
    "answer": "Hat-trick",
    "explanation": "The term originated when bowler H.H. Stephenson took three wickets in 1858 and was awarded a new hat.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "Which prestigious tennis Grand Slam tournament is famously contested on traditional red clay courts in Paris?",
    "options": [
      "French Open (Roland Garros)",
      "Wimbledon",
      "Australian Open",
      "US Open"
    ],
    "answer": "French Open (Roland Garros)",
    "explanation": "Roland Garros features slow red clay courts that generate high ball bounce, testing endurance.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "What is the official regulation height of an NBA basketball rim above the court floor?",
    "options": [
      "10 feet (3.048 meters)",
      "9.5 feet",
      "11 feet",
      "10.5 feet"
    ],
    "answer": "10 feet (3.048 meters)",
    "explanation": "James Naismith nailed peach baskets 10 feet up to the gymnasium running track balcony in 1891.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "In which historic city were the first modern Olympic Games celebrated in April 1896?",
    "options": [
      "Athens, Greece",
      "Paris, France",
      "London, England",
      "Rome, Italy"
    ],
    "answer": "Athens, Greece",
    "explanation": "Organized by Pierre de Coubertin, 241 athletes from 14 nations competed at the Panathenaic Stadium in Athens.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "Which Indian cricket icon is the only cricketer in history to score 100 international centuries across Tests and ODIs?",
    "options": [
      "Sachin Tendulkar",
      "Virat Kohli",
      "Rohit Sharma",
      "Sunil Gavaskar"
    ],
    "answer": "Sachin Tendulkar",
    "explanation": "Sachin Tendulkar scored 51 Test centuries and 49 ODI centuries over his illustrious 24-year international career.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "Which Formula 1 racing driver shares the record of seven World Drivers' Championships with Michael Schumacher?",
    "options": [
      "Lewis Hamilton",
      "Max Verstappen",
      "Sebastian Vettel",
      "Fernando Alonso"
    ],
    "answer": "Lewis Hamilton",
    "explanation": "British driver Sir Lewis Hamilton won titles in 2008, 2014, 2015, 2017, 2018, 2019, and 2020.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "What is the high-drag, conical feathered projectile struck back and forth in a badminton match called?",
    "options": [
      "Shuttlecock (Birdie)",
      "Puck",
      "Ball",
      "Dart"
    ],
    "answer": "Shuttlecock (Birdie)",
    "explanation": "A traditional badminton shuttlecock consists of 16 goose or duck feathers embedded into a rounded cork base.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "How many regulation holes are played in a standard full championship round of professional golf?",
    "options": [
      "18 holes",
      "9 holes",
      "24 holes",
      "12 holes"
    ],
    "answer": "18 holes",
    "explanation": "The Old Course at St Andrews standardized golf to an 18-hole format in 1764.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "Which heavyweight boxing icon, born Cassius Clay, proclaimed 'Float like a butterfly, sting like a bee'?",
    "options": [
      "Muhammad Ali",
      "Mike Tyson",
      "Joe Frazier",
      "George Foreman"
    ],
    "answer": "Muhammad Ali",
    "explanation": "Muhammad Ali won the World Heavyweight Championship three times and remains one of the most celebrated figures in sports.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "Which national football team has won the FIFA Men's World Cup championship trophy the most times (5 titles)?",
    "options": [
      "Brazil",
      "Germany",
      "Italy",
      "Argentina"
    ],
    "answer": "Brazil",
    "explanation": "Brazil won the World Cup in 1958, 1962, 1970, 1994, and 2002, earning their fifth star.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "In cricket, what is the exact standardized length of the central pitch between the bowling creases at both ends?",
    "options": [
      "22 yards (66 feet / 20.12m)",
      "20 yards",
      "24 yards",
      "18 yards"
    ],
    "answer": "22 yards (66 feet / 20.12m)",
    "explanation": "The 22-yard pitch distance is equal to one traditional surveying chain.",
    "difficulty": "medium"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "Which Spanish tennis superstar won an all-time record 14 French Open singles titles, earning the moniker 'King of Clay'?",
    "options": [
      "Rafael Nadal",
      "Carlos Alcaraz",
      "Novak Djokovic",
      "Roger Federer"
    ],
    "answer": "Rafael Nadal",
    "explanation": "Rafael Nadal amassed an astounding 112 wins against just 4 losses on the red clay of Roland Garros.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "In American football, how many points is an offensive touchdown worth before attempting any extra point or conversion?",
    "options": [
      "6 points",
      "7 points",
      "3 points",
      "5 points"
    ],
    "answer": "6 points",
    "explanation": "A touchdown scores 6 points, followed by a 1-point PAT kick or a 2-point offensive conversion attempt.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "In competitive chess, what is the special rule allowing the King to move two squares while the Rook hops adjacent?",
    "options": [
      "Castling",
      "En Passant",
      "Promotion",
      "Fianchetto"
    ],
    "answer": "Castling",
    "explanation": "Castling safeguards the King into a corner while activating the Rook toward the center files.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "Which Indian field hockey wizard captained India to Olympic golds in 1928, 1932, and 1936, scoring over 570 international goals?",
    "options": [
      "Major Dhyan Chand",
      "Balbir Singh Sr.",
      "K. D. Singh",
      "Dhanraj Pillay"
    ],
    "answer": "Major Dhyan Chand",
    "explanation": "Dhyan Chand's ball control was so uncanny that authorities in Netherlands snapped his stick to check for glue.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "Which Grand Slam tennis championship, founded in 1877, is the oldest in the world and played on lush natural grass?",
    "options": [
      "Wimbledon (The Championships)",
      "French Open",
      "US Open",
      "Australian Open"
    ],
    "answer": "Wimbledon (The Championships)",
    "explanation": "Wimbledon takes place at the All England Club in London, observing an iconic all-white player dress code.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "What is the standard length of an Olympic regulation competition swimming pool?",
    "options": [
      "50 meters (Long Course)",
      "25 meters",
      "100 meters",
      "75 meters"
    ],
    "answer": "50 meters (Long Course)",
    "explanation": "Olympic pools are 50 meters long by 25 meters wide, containing approximately 2.5 million liters of water.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "In athletics, how many hurdles must a runner clear in a standard 110-meter men's or 100-meter women's hurdles race?",
    "options": [
      "10 hurdles",
      "8 hurdles",
      "12 hurdles",
      "9 hurdles"
    ],
    "answer": "10 hurdles",
    "explanation": "In standard sprint and 400m hurdle events, runners must negotiate exactly 10 hurdles evenly spaced on the track.",
    "difficulty": "medium"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "In snooker, what is the maximum possible break achievable in a standard frame under normal conditions without fouls?",
    "options": [
      "147 points",
      "155 points",
      "140 points",
      "150 points"
    ],
    "answer": "147 points",
    "explanation": "A 147 maximum break requires potting all 15 red balls with the black ball (15\u00d78 = 120), then potting all 6 colors (27).",
    "difficulty": "medium"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "The biennial Ryder Cup competition is contested between men's teams representing the United States and Europe in which sport?",
    "options": [
      "Golf",
      "Tennis",
      "Sailing",
      "Polo"
    ],
    "answer": "Golf",
    "explanation": "Named after Samuel Ryder, the Ryder Cup is among the most prestigious match-play team events in golf.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "In baseball, what is the achievement called when a batter hits a home run with all three bases occupied by runners?",
    "options": [
      "Grand Slam",
      "Triple Play",
      "Clean Sweep",
      "Golden Slam"
    ],
    "answer": "Grand Slam",
    "explanation": "A grand slam scores four runs for the batting team on a single swing of the bat.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "Who was the legendary captain who led the underdog Indian cricket team to its historic first Cricket World Cup win in 1983?",
    "options": [
      "Kapil Dev",
      "Sunil Gavaskar",
      "Mohinder Amarnath",
      "Ravi Shastri"
    ],
    "answer": "Kapil Dev",
    "explanation": "Kapil Dev led India to a stunning victory over the two-time reigning champion West Indies at Lord's.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "Which European city hosted the 2024 Summer Olympic Games, staging the Opening Ceremony along the River Seine?",
    "options": [
      "Paris, France",
      "London, England",
      "Rome, Italy",
      "Madrid, Spain"
    ],
    "answer": "Paris, France",
    "explanation": "Paris joined London as only the second city to host the Summer Olympic Games three times (1900, 1924, 2024).",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "How many active players per side are on the court at any one time in a standard competitive indoor volleyball match?",
    "options": [
      "6 players",
      "5 players",
      "7 players",
      "8 players"
    ],
    "answer": "6 players",
    "explanation": "Indoor volleyball teams field 6 players arranged in front and back row rotational positions.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "Which Argentine forward scored twice in the 2022 FIFA World Cup final in Qatar and won the Golden Ball as champion?",
    "options": [
      "Lionel Messi",
      "Kylian Mbapp\u00e9",
      "\u00c1ngel Di Mar\u00eda",
      "Lautaro Mart\u00ednez"
    ],
    "answer": "Lionel Messi",
    "explanation": "Lionel Messi captained Argentina to their third World Cup title, scoring 7 goals during the tournament.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "In cricket umpiring rules, what does the dismissal acronym 'LBW' stand for?",
    "options": [
      "Leg Before Wicket",
      "Leg Boundary Wide",
      "Left Ball Warning",
      "Line Behind Wicket"
    ],
    "answer": "Leg Before Wicket",
    "explanation": "LBW is governed by Law 36 when the ball strikes the batsman's pad/body instead of bat in line with stumps.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "What is the exact official distance of a standard road running Half Marathon?",
    "options": [
      "21.0975 km (13 miles 192.5 yards)",
      "20.0000 km",
      "25.0000 km",
      "18.5000 km"
    ],
    "answer": "21.0975 km (13 miles 192.5 yards)",
    "explanation": "A half marathon is exactly one-half of the standard 42.195 km marathon distance.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "Which Portuguese football superstar holds the all-time world record for most international goals scored in men's football?",
    "options": [
      "Cristiano Ronaldo",
      "Ali Daei",
      "Lionel Messi",
      "Pel\u00e9"
    ],
    "answer": "Cristiano Ronaldo",
    "explanation": "Cristiano Ronaldo has scored over 130 international goals for Portugal since his national debut in 2003.",
    "difficulty": "easy"
  },
  {
    "topic": "sports",
    "topicLabel": "Sports & Olympics",
    "topicEmoji": "\u26bd",
    "question": "In badminton or tennis, what is a score of 40-40 called requiring a player to gain a two-point margin to win the game?",
    "options": [
      "Deuce",
      "Tie-break",
      "Advantage",
      "Fault"
    ],
    "answer": "Deuce",
    "explanation": "At deuce, a player must score the next point to gain 'Advantage', then score again to win the game.",
    "difficulty": "easy"
  }
];

// ---------------- 2. PROCEDURAL GENERATION DATABASES (FOR HIGHER LEVELS) ----------------
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
  { country: 'Ireland', capital: 'Dublin' },
  { country: 'Austria', capital: 'Vienna' },
  { country: 'Poland', capital: 'Warsaw' },
  { country: 'Czech Republic', capital: 'Prague' },
  { country: 'Hungary', capital: 'Budapest' },
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
  { invention: 'Telescope Refractor', inventor: 'Hans Lippershey', year: '1608' },
  { invention: 'Mercury Thermometer', inventor: 'Daniel Gabriel Fahrenheit', year: '1714' },
  { invention: 'Battery Electrochemical Cell', inventor: 'Alessandro Volta', year: '1800' },
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
  { quantity: 'Luminous Intensity', unit: 'Candela (cd)' },
  { quantity: 'Amount of Substance', unit: 'Mole (mol)' },
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

  if (effectiveTopic === 'geography' || effectiveTopic === 'history') {
    const capIndex = Math.floor(seededRand(seed + 4) * CAPITALS_DB.length);
    const target = CAPITALS_DB[capIndex];
    const decoys = CAPITALS_DB.filter((_, i) => i !== capIndex)
      .slice(0, 3)
      .map((c) => c.capital);
    const options = shuffleWithOptions([target.capital, ...decoys], seed + 5);

    return {
      topic: 'geography',
      topicLabel: 'Geography & Wonders',
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
      topicLabel: 'Physics & Energy',
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

  // Math procedural fallback
  const a = Math.floor(seededRand(seed + 10) * 12) + 5;
  const b = Math.floor(seededRand(seed + 11) * 12) + 5;
  const product = a * b;
  const decoys = [product + 6, product - 4, product + 12].map(String);
  const options = shuffleWithOptions([String(product), ...decoys], seed + 12);

  return {
    topic: 'math',
    topicLabel: 'Math & Logic',
    topicEmoji: '🧮',
    question: `What is the mathematical product of ${a} × ${b}?`,
    options,
    answer: String(product),
    explanation: `${a} multiplied by ${b} equals ${product}.`,
    difficulty: 'easy',
  };
}

// ---------------- 4. GUARANTEED ZERO-REPETITION LEVEL QUESTION GENERATOR ----------------
// RULES:
// 1. Within any level: 10 distinct questions (zero intra-level repeats).
// 2. Across different levels (Level 1 vs Level 2 vs Level 3 etc.): STRICTLY ZERO REPEATS!
//    Level 1 draws indices [0..9], Level 2 draws indices [10..19], Level 3 draws [20..29], Level 4 draws [30..39].
// 3. Retrying the SAME level (e.g. failing Level 1 and clicking Retry):
//    Deterministically yields the same level's questions so the player can learn and pass!
// Curated questions for a topic, with the chosen difficulty FIRST (stable order).
// Difficulty is a preference, not a hard filter: some topics have very few
// medium questions, and a hard filter would pad rounds with off-topic
// procedural maths. Ordering keeps every level on-topic and level slices disjoint.
function curatedForTopic(topic: QuizTopic, difficultyFilter: QuizDifficulty) {
  const pool = CURATED_QUIZ_QUESTIONS.filter((q) => q.topic === topic);
  if (difficultyFilter === 'all') return pool;
  return [
    ...pool.filter((q) => q.difficulty === difficultyFilter),
    ...pool.filter((q) => q.difficulty !== difficultyFilter),
  ];
}

export function generateQuizRound(
  level: number,
  topic: QuizTopic = 'all',
  count: number = 10,
  difficultyFilter: QuizDifficulty = 'all'
): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const seenTexts = new Set<string>();

  if (topic !== 'all') {
    // A) SPECIFIC TOPIC MODE
    const topicCurated = curatedForTopic(topic, difficultyFilter);
    
    // Calculate strictly disjoint level slice
    // Level 1: 0..9, Level 2: 10..19, Level 3: 20..29, Level 4: 30..39
    const startIndex = (level - 1) * count;
    const endIndex = startIndex + count;

    if (topicCurated.length >= endIndex) {
      const slice = topicCurated.slice(startIndex, endIndex);
      for (const q of slice) {
        if (!seenTexts.has(q.question)) {
          seenTexts.add(q.question);
          questions.push({
            id: `quiz-${topic}-lvl-${level}-q-${questions.length + 1}`,
            ...q,
          });
        }
      }
    } else {
      // For levels exceeding curated bank (e.g. Level 5+)
      // Draw available slice without wrapping back into lower levels
      if (startIndex < topicCurated.length) {
        const slice = topicCurated.slice(startIndex, startIndex + count);
        for (const q of slice) {
          if (!seenTexts.has(q.question)) {
            seenTexts.add(q.question);
            questions.push({
              id: `quiz-${topic}-lvl-${level}-q-${questions.length + 1}`,
              ...q,
            });
          }
        }
      }
      // Fill remainder with strictly level-partitioned procedural generation
      let seed = level * 1000 + 43;
      while (questions.length < count && seed < level * 1000 + 600) {
        seed++;
        const proc = generateProceduralQuestion(seed, topic, difficultyFilter);
        if (!seenTexts.has(proc.question)) {
          seenTexts.add(proc.question);
          questions.push({
            id: `quiz-${topic}-lvl-${level}-q-${questions.length + 1}`,
            ...proc,
          });
        }
      }
    }
  } else {
    // B) ALL TOPICS MIXED MODE
    // Picks distinct questions across the 9 topics strictly partitioned by level!
    // Level 1: index 0 from each topic + 1 extra
    // Level 2: index 1 from each topic + 1 extra
    // Level 3: index 2 from each topic + 1 extra
    // Level 4: index 3 from each topic + 1 extra
    // Therefore, cross-level overlap is MATHEMATICALLY ZERO!
    const allTopicsList: QuizTopic[] = [
      'cinema',
      'science',
      'physics',
      'chemistry',
      'history',
      'math',
      'geography',
      'tech',
      'sports',
    ];

    for (let i = 0; i < count; i++) {
      const currentTopic = allTopicsList[i % allTopicsList.length];
      const topicCurated = curatedForTopic(currentTopic, difficultyFilter);
      
      // Index partitioned strictly by level so Level 1 and Level 2 never share any question!
      const levelOffset = (level - 1) * 2 + Math.floor(i / allTopicsList.length);
      const chosen = topicCurated[levelOffset % topicCurated.length];
      
      if (chosen && !seenTexts.has(chosen.question)) {
        seenTexts.add(chosen.question);
        questions.push({
          id: `quiz-all-lvl-${level}-q-${questions.length + 1}`,
          ...chosen,
        });
      }
    }

    // Fill remainder if needed
    let seed = level * 2000 + 91;
    while (questions.length < count && seed < level * 2000 + 600) {
      seed++;
      const proc = generateProceduralQuestion(seed, 'all', difficultyFilter);
      if (!seenTexts.has(proc.question)) {
        seenTexts.add(proc.question);
        questions.push({
          id: `quiz-all-lvl-${level}-q-${questions.length + 1}`,
          ...proc,
        });
      }
    }
  }

  // Shuffle answer positions so the correct option isn't always first.
  // (Curated questions store the answer as options[0].) Fresh shuffle on
  // every round start, so retrying a level can't be passed by memorising A/B/C/D.
  return questions.map((q) => ({ ...q, options: shuffleOptionsRandom(q.options) }));
}

function shuffleOptionsRandom<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
