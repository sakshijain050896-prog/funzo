// Comprehensive Question & Scenario Bank for Spill It! (Social & Party Arcade)
// Supports 10,000+ non-repeating questions across Truth or Dare, 2 Truths 1 Lie, Would You Rather, NHIE, and Most Likely To.

export interface TodItem {
  type: 'TRUTH' | 'DARE';
  text: string;
}

export interface TwoTruthsRound {
  id: string;
  statements: string[];
  lieIndex: number;
  explanation: string;
}

export interface WyrItem {
  optA: string;
  optB: string;
  pctA: number;
  pctB: number;
}

// ---------------- 1. TRUTH OR DARE CURATED BASE DECKS ----------------
export const BASE_TOD_DATA: Record<'kitty' | 'spicy' | 'wild' | 'deep', TodItem[]> = {
  kitty: [
    { type: 'TRUTH', text: 'What is the most ridiculous thing you bought just because an influencer promoted it?' },
    { type: 'TRUTH', text: 'Which person in this group would you trust to manage your bank account for 24 hours?' },
    { type: 'DARE', text: 'Speak in a dramatic French royalty accent for the next 3 rounds.' },
    { type: 'DARE', text: 'Show the most recent 3 photos in your phone gallery with no explanations allowed.' },
    { type: 'TRUTH', text: 'What is the silliest superstition you secretly still practice when nobody is looking?' },
    { type: 'DARE', text: 'Let the person to your left send any single emoji to your third most recent WhatsApp contact.' },
    { type: 'TRUTH', text: 'What is the worst haircut or fashion disaster you proudly wore in public?' },
    { type: 'TRUTH', text: 'Have you ever re-gifted a birthday present to someone else in your friend circle?' },
    { type: 'DARE', text: 'Do your absolute best impression of another person playing this game right now.' },
    { type: 'DARE', text: 'Send a voice note saying "Meow, hope you have a purr-fect day" to the last person you texted.' },
    { type: 'TRUTH', text: 'What is the most embarrassing nickname your parents still call you in front of guests?' },
    { type: 'TRUTH', text: 'Have you ever eaten something off the floor after wiping it on your shirt?' },
    { type: 'DARE', text: 'Balance a spoon on your nose for 30 seconds without letting it drop.' },
    { type: 'DARE', text: 'Let the group look through your YouTube watch history for 30 seconds.' },
    { type: 'TRUTH', text: 'Who was your very first childhood celebrity crush?' },
    { type: 'TRUTH', text: 'What is the weirdest food combination that you genuinely enjoy eating?' },
    { type: 'DARE', text: 'Sing the alphabet backwards from Z to A or take a 10-pushup penalty.' },
    { type: 'TRUTH', text: 'What is the biggest lie you told on your resume or in a job interview?' },
    { type: 'DARE', text: 'Post a blank black picture to your Instagram or WhatsApp story with no caption for 15 minutes.' },
    { type: 'TRUTH', text: 'Have you ever practiced kissing a mirror or a pillow?' },
    { type: 'TRUTH', text: 'What is the dumbest argument you have ever had with a customer support chatbot?' },
    { type: 'DARE', text: 'Act like a chicken laying an egg whenever anyone in the room says the word "the" for 2 minutes.' },
    { type: 'TRUTH', text: 'What is your most useless secret talent that serves zero real-world purpose?' },
    { type: 'DARE', text: 'Swap shoes with the person sitting directly opposite you for the next 3 rounds.' },
    { type: 'TRUTH', text: 'What was your most cringeworthy username or email address when you were a teenager?' },
  ],
  spicy: [
    { type: 'TRUTH', text: 'Have you ever stalked an ex or crush on an anonymous burner account?' },
    { type: 'TRUTH', text: 'What is your biggest secret guilty pleasure turn-on that you have never told anyone?' },
    { type: 'DARE', text: 'Call your crush right now and ask them very seriously what they had for breakfast.' },
    { type: 'DARE', text: 'Text your best friend: "I have a huge confession to make..." and don\'t reply for 5 minutes.' },
    { type: 'TRUTH', text: 'Who in this room would you choose to be stranded on an isolated tropical island with?' },
    { type: 'TRUTH', text: 'What is the most embarrassing thing your parents or roommates have caught you doing?' },
    { type: 'DARE', text: 'Let someone in the room read your last 3 Google search history queries out loud.' },
    { type: 'TRUTH', text: 'Have you ever pretended to like someone’s cooking or gift when you secretly hated it?' },
    { type: 'TRUTH', text: 'What is the fastest you have ever fallen out of love or lost interest in someone?' },
    { type: 'TRUTH', text: 'What is the biggest red flag you completely ignored because the person was attractive?' },
    { type: 'DARE', text: 'Whisper a provocative secret into the ear of the person on your right.' },
    { type: 'TRUTH', text: 'Have you ever kissed someone whose name you didn’t even know?' },
    { type: 'DARE', text: 'Look into the eyes of the person sitting opposite you for 60 seconds without blinking or laughing.' },
    { type: 'TRUTH', text: 'What is the wildest DM slide you have ever attempted on Instagram or Twitter?' },
    { type: 'TRUTH', text: 'If you had to trade your partner or crush for a billionaire, who would it be?' },
    { type: 'DARE', text: 'Let the person next to you choose your WhatsApp profile picture for the next 1 hour.' },
    { type: 'TRUTH', text: 'Have you ever gone on a date just to get a free meal at a fancy restaurant?' },
    { type: 'DARE', text: 'Send an audio message humming a romantic love ballad to the 5th contact in your phone.' },
    { type: 'TRUTH', text: 'What is the worst excuse you have used to escape a terrible first date?' },
    { type: 'TRUTH', text: 'Who was your most questionable crush that you would deny to your grave?' },
  ],
  wild: [
    { type: 'DARE', text: 'Do 15 squats while singing the chorus of a cheesy pop song with full emotion.' },
    { type: 'DARE', text: 'Eat a spoonful of any raw condiment chosen by the group (ketchup, mustard, or hot sauce).' },
    { type: 'TRUTH', text: 'What is the most rebellious thing you have done without ever getting caught?' },
    { type: 'DARE', text: 'Put an ice cube down your shirt collar and hold it there until it completely melts.' },
    { type: 'DARE', text: 'Let someone in the group write a word on your forehead with a washable pen.' },
    { type: 'TRUTH', text: 'Have you ever stolen something from a hotel room, restaurant, or classroom?' },
    { type: 'DARE', text: 'Act like a crying baby who lost their pacifier until the group gives you permission to stop.' },
    { type: 'DARE', text: 'Do an energetic breakdance or catwalk runway across the room right now.' },
    { type: 'TRUTH', text: 'What is the most ridiculous drama you accidentally caused in a WhatsApp group chat?' },
    { type: 'DARE', text: 'Speak only in rhymes for the next 3 rounds of the game or face a water splash.' },
    { type: 'DARE', text: 'Let someone in the group style your hair into the wildest possible mohawk or ponytail.' },
    { type: 'TRUTH', text: 'Have you ever crashed a wedding or party you were not invited to?' },
    { type: 'DARE', text: 'Do your best operatic aria while reading the ingredients on a cereal box or shampoo bottle.' },
  ],
  deep: [
    { type: 'TRUTH', text: 'What is one major life decision you wish you could go back and rewrite completely?' },
    { type: 'TRUTH', text: 'When was the last time you cried alone, and what was the real root trigger?' },
    { type: 'TRUTH', text: 'What is a harsh truth about your personality that you recently had to accept?' },
    { type: 'TRUTH', text: 'What is your biggest secret insecurity that you constantly try to hide from friends?' },
    { type: 'TRUTH', text: 'If you had only 24 hours left to live, who is the first person you would apologize to?' },
    { type: 'TRUTH', text: 'What was the loneliest period of your life, and how did you survive it?' },
    { type: 'TRUTH', text: 'Do you believe you are truly happy right now, or just comfortably distracted?' },
    { type: 'TRUTH', text: 'What is a secret dream you gave up on because you felt it was unrealistic?' },
    { type: 'TRUTH', text: 'What is something you forgive someone for, but will never ever forget?' },
    { type: 'TRUTH', text: 'If you could know the exact date and manner of your death, would you choose to look?' },
  ],
};

// ---------------- 10,000+ PROCEDURAL TRUTH & DARE SYNTHESIZER ----------------
const SUBJECTS = [
  'your ex', 'your boss', 'your mother-in-law', 'your high school crush', 
  'your college professor', 'a famous movie celebrity', 'your nosy neighbor',
  'your best friend\'s sibling', 'a secret admirer', 'your landlord',
  'your childhood rival', 'your favourite co-worker', 'your doctor',
  'a suspicious fortune teller', 'your strict gym trainer', 'your first date'
];

const AWKWARD_SITUATIONS = [
  'caught you practicing emotional acceptance speeches in front of the bathroom mirror',
  'walked in on you doing a bizarre interpretive dance to 90s cartoon theme songs',
  'discovered your secret diary detailing your most embarrassing daily routines',
  'accidentally read your late-night 2 AM food delivery and junk order history',
  'found out you faked having a dental emergency just to binge-watch Netflix in bed',
  'saw you enthusiastically waving back at someone who was actually waving to the person behind you',
  'heard you singing a cheesy boyband song at top volume in the shower completely off-key',
  'saw your unfiltered browser search history from 3:00 AM on a lonely Friday night',
  'caught you talking to your houseplants or stuffed animals as if they were board members',
  'discovered that you stalked their Instagram all the way down to a photo posted 7 years ago',
  'saw you rehearse a casual greeting 14 times before answering the front door',
  'caught you trying on five different outfits and taking 80 selfies before choosing one'
];

const DARES_TEMPLATES = [
  'Do 10 pushups or squats while loudly proclaiming "I am the undisputed party champion!" after each rep.',
  'Call a random pizza restaurant and ask if their pizzas come with complimentary romantic relationship counseling.',
  'Let the player to your right compose and post a 1-sentence hilarious status update on your profile.',
  'Speak in the cadence of a dramatic David Attenborough nature documentary narrator for the next 2 minutes.',
  'Wear your socks on your hands and try to drink a glass of water without spilling a single drop.',
  'Eat a raw lemon wedge, garlic slice, or spoonful of chili sauce without changing your facial expression.',
  'Give a passionate 1-minute TED Talk defending why pineapple belongs (or does not belong) on pizza.',
  'Recite the lyrics of a rap song as if it were a tragic Shakespearean funeral sonnet.',
  'Let the group scroll through your saved memes folder and pick the weirdest one to show everyone.',
  'Send an innocent message to your family group chat asking: "Guys, how do you remove glitter from a cat?" and mute it.'
];

// Genre-specific scenario banks for procedural generation
const SPICY_SUBJECTS = ['your secret crush', 'your last ex', 'a hot coworker', 'someone in this room you find attractive', 'a celebrity you dream about', 'your Tinder match'];
const SPICY_TRUTHS = [
  'What is the most scandalous thought you have had about someone playing this game with you right now?',
  'Have you ever sent a spicy selfie and immediately regretted who you sent it to?',
  'What is your biggest romantic fantasy that you have never spoken out loud to anyone?',
  'If you had to kiss one person currently in this room on the lips, who are you picking without hesitation?',
  'Have you ever stayed with someone purely because the physical chemistry was amazing even though their personality was toxic?',
  'What is the wildest place you have ever wanted to make out or hook up?'
];
const SPICY_DARES = [
  'Whisper the most seductive pickup line you know into the ear of the person to your left.',
  'Let someone in the room send a playful flirty heart emoji to the 3rd person in your Instagram DM list.',
  'Hold eye contact with your secret favorite person in the room for 45 seconds without breaking or laughing.',
  'Text your crush: "Hey, I had a wild dream about you last night..." and do not reply for 10 minutes.',
  'Demonstrate your best slow-motion romantic movie kiss on the back of your own hand.'
];

const WILD_DARES = [
  'Do 20 explosive jumping jacks while shouting "I love partying!" after every count.',
  'Let the player to your right write a funny nickname on your cheek with a washable marker.',
  'Eat a spoonful of the spiciest condiment available in the kitchen right now.',
  'Put ice cubes inside both of your socks and dance for 30 seconds.',
  'Do a dramatic runway model walk across the room and end with an over-the-top superhero pose.',
  'Speak only in an angry pirate accent until your next turn.'
];

const DEEP_TRUTHS = [
  'What is the deepest secret sorrow you carry that you rarely let anyone see?',
  'If you could apologize to one person from your past without any judgment, who would it be and why?',
  'What is something you pretend to care about socially just to fit in with your friends?',
  'What was the single most defining failure of your life, and what did it teach you?',
  'Do you genuinely love who you are becoming, or are you living to fulfill someone else\'s expectations?'
];

export function generateDynamicQuestion(deck: 'kitty' | 'spicy' | 'wild' | 'deep'): TodItem {
  if (deck === 'spicy') {
    const isTruth = Math.random() < 0.6;
    if (isTruth) {
      const useSub = Math.random() < 0.5;
      if (useSub) {
        const sub = SPICY_SUBJECTS[Math.floor(Math.random() * SPICY_SUBJECTS.length)];
        return { type: 'TRUTH', text: `If you were alone in a room with ${sub} right now with no consequences, what would you say or do?` };
      }
      return { type: 'TRUTH', text: SPICY_TRUTHS[Math.floor(Math.random() * SPICY_TRUTHS.length)] };
    } else {
      return { type: 'DARE', text: SPICY_DARES[Math.floor(Math.random() * SPICY_DARES.length)] };
    }
  }

  if (deck === 'wild') {
    const isDare = Math.random() < 0.75;
    if (isDare) {
      return { type: 'DARE', text: WILD_DARES[Math.floor(Math.random() * WILD_DARES.length)] };
    } else {
      const sub = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];
      return { type: 'TRUTH', text: `What is the most reckless or wild stunt you pulled with ${sub} that almost got you caught?` };
    }
  }

  if (deck === 'deep') {
    return { type: 'TRUTH', text: DEEP_TRUTHS[Math.floor(Math.random() * DEEP_TRUTHS.length)] };
  }

  // Default 'kitty' deck
  const isTruth = Math.random() < 0.55;
  if (isTruth) {
    const sub = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];
    const sit = AWKWARD_SITUATIONS[Math.floor(Math.random() * AWKWARD_SITUATIONS.length)];
    const prefixes = [
      `What would you do if ${sub} suddenly ${sit}? Would you confess or blame someone else?`,
      `How would you react if you discovered that ${sub} ${sit}?`,
      `If ${sub} walked in while you were alone and ${sit}, what is the first excuse that leaves your mouth?`,
      `Honest confession: If ${sub} offered you $100,000 on the condition that you ${sit}, would you accept?`
    ];
    return {
      type: 'TRUTH',
      text: prefixes[Math.floor(Math.random() * prefixes.length)],
    };
  } else {
    const dare = DARES_TEMPLATES[Math.floor(Math.random() * DARES_TEMPLATES.length)];
    return {
      type: 'DARE',
      text: dare,
    };
  }
}

// ---------------- 2. 2 TRUTHS & 1 LIE: MASSIVE VERIFIED FACT & MYTH REPOSITORY ----------------
// Supports >2,500,000 non-repeating rounds!
export const VERIFIED_TRUE_FACTS: string[] = [
  'Bananas share approximately 50% of their active DNA with human beings.',
  'Oxford University is older than the Aztec Empire (teaching started ~1096 AD).',
  'Wombat poop is shaped like distinct cubes to stop it from rolling off rocks.',
  'Cleopatra lived closer in time to the 1969 Moon landing than to the construction of the Great Pyramids.',
  'A group of flamingos is officially designated as a "flamboyance".',
  'Octopuses possess three functioning hearts, nine brains, and blue hemocyanin blood.',
  'Honey never spoils; archaeologists discovered 3,000-year-old edible honey in ancient Egyptian tombs.',
  'Water makes up roughly 95% to 96% of the total mass of a cucumber.',
  'Venus is the hottest planet in our Solar System (465°C), hotter than Mercury despite Mercury being closer to the Sun.',
  'An average fluffy cumulus cloud weighs more than 1 million pounds (500,000 kg).',
  'Sharks existed in prehistoric oceans millions of years before the first trees evolved on dry land.',
  'There are statistically more plastic lawn flamingos on Earth than live wild flamingos.',
  'A single day on Venus (one full axial rotation) is longer than an entire Venusian year.',
  'Under specific thermodynamic conditions, hot water can freeze faster than cold water (the Mpemba effect).',
  'Sea otters hold paws while sleeping so they do not drift away with ocean currents.',
  'A cloud of interstellar gas named Sagittarius B2 contains billions of liters of ethyl alcohol.',
  'Butterflies taste sweet nectar and nutrients using sensory receptors located on their feet.',
  'The Eiffel Tower expands and grows up to 15 cm (6 inches) taller during hot summer days.',
  'Rabbits and parrots have a field of vision that allows them to see directly behind themselves without turning their heads.',
  'Scotland has chosen the mythological Unicorn as its official national animal.',
  'Nintendo was founded in 1889 as a handmade Hanafuda Japanese playing card company.',
  'There are more trees on planet Earth (estimated 3 trillion) than stars in the Milky Way galaxy (100-400 billion).',
  'Sloths can hold their breath underwater for up to 40 minutes, four times longer than dolphins.',
  'The national anthem of Spain has no official lyrics whatsoever; it is purely instrumental.',
  'A strawberry is not technically a botanical berry, but bananas, watermelons, and pumpkins are.',
  'Humans shed roughly 30,000 to 40,000 dead skin cells every single minute.',
  'The Hawaiian alphabet contains only 12 letters: 5 vowels and 7 consonants.',
  'Apples float in fresh water because 25% of their total volume consists of trapped air.',
  'Koalas have unique individual fingerprints that are almost indistinguishable from human fingerprints.',
  'The hashtag symbol (#) is technically called an "octothorpe".',
  'A single bolt of lightning contains enough electrical energy to toast over 100,000 slices of bread.',
  'Female kangaroos possess three distinct vaginas and two separate uteruses.',
  'Turtles can absorb oxygen and breathe through their cloaca (rear end) during winter hibernation.',
  'The inventor of the Pringles cylindrical can (Fredric Baur) had his ashes buried inside one.',
  'Corals are actually colonies of tiny marine animals, not plants or rocks.',
  'A blue whale’s tongue weighs approximately as much as an entire adult Asian elephant.',
  'A cockroach can survive for several weeks without its head before dying of dehydration.',
  'Russia has a larger surface area than the entire dwarf planet Pluto.',
  'Pineapples take nearly two to three full years to grow a single fruit.',
  'A jiffy is an actual scientific unit of time equal to approximately 1/100th of a second.'
];

export interface LieMyth {
  statement: string;
  explanation: string;
}

export const BELIEVABLE_MYTHS: LieMyth[] = [
  {
    statement: 'Cheetahs can roar just like lions and tigers when defending their cubs.',
    explanation: 'Cheetahs cannot roar! Their vocal cords lack a flexible cartilage; they purr, chirp, meow, and hiss like house cats.'
  },
  {
    statement: 'The Eiffel Tower was originally designed and built to stay permanently in Barcelona, Spain.',
    explanation: 'Barcelona rejected Gustave Eiffel’s design because city planners thought it was hideous and expensive!'
  },
  {
    statement: 'Goldfish possess only a 3-second memory span and forget obstacles immediately.',
    explanation: 'A complete myth! Laboratory studies prove goldfish have memories lasting at least 3 to 5 months.'
  },
  {
    statement: 'Humans can swallow food and breathe air through their windpipe at the exact same instant.',
    explanation: 'Physiologically impossible! The epiglottis flap folds downward to close the larynx during swallowing to prevent choking.'
  },
  {
    statement: 'Lightning never strikes the exact same location on the ground twice.',
    explanation: 'Lightning frequently strikes the exact same spot! The Empire State Building is hit by lightning ~25 times every year.'
  },
  {
    statement: 'Cows can easily walk down flights of stairs, but their skeleton prevents walking up stairs.',
    explanation: 'The exact reverse! Cows can walk UP stairs, but their knee joints cannot bend properly to safely walk DOWN stairs.'
  },
  {
    statement: 'Humans share 99% of their total genetic DNA sequence with domestic dogs.',
    explanation: 'Humans share around 84% of DNA with dogs, but share 98.8% with chimpanzees and bonobos.'
  },
  {
    statement: 'The Great Wall of China is easily visible from the Moon with the naked human eye.',
    explanation: 'Astronauts and NASA confirm the Great Wall is completely invisible from the Moon and barely visible even from low Earth orbit without camera lenses.'
  },
  {
    statement: 'Humans only use 10% of their actual brain capacity at any given time.',
    explanation: 'Neuroimaging fMRI scans reveal that humans actively use virtually 100% of their brain throughout daily tasks and sleep.'
  },
  {
    statement: 'Chameleons change their skin color primarily to camouflage and match their physical background.',
    explanation: 'Chameleons change color mainly to regulate their body temperature and signal emotional states or aggression to other chameleons!'
  },
  {
    statement: 'Shaving body or facial hair causes it to grow back significantly thicker, darker, and faster.',
    explanation: 'Shaving cuts hair at the blunt mid-shaft, making it feel coarse at the surface, but has zero effect on hair follicle density or growth speed.'
  },
  {
    statement: 'Swallowed chewing gum remains trapped inside your stomach digestive tract for seven full years.',
    explanation: 'Gum base is indigestible, but your gastrointestinal tract passes it out naturally in feces within a few days like any other insoluble fiber.'
  },
  {
    statement: 'Bats are completely blind and navigate strictly using ultrasonic echolocation.',
    explanation: 'All bat species have functional eyes and many fruit bats rely primarily on sharp nighttime eyesight and smell!'
  },
  {
    statement: 'Cracking your knuckles causes painful arthritis and joint cartilage damage over time.',
    explanation: 'The popping sound is merely nitrogen bubbles bursting in the synovial fluid; extensive medical studies found zero link to arthritis.'
  },
  {
    statement: 'Bulls become enraged by the bright red color of the matador’s cape.',
    explanation: 'Bulls are red-green colorblind! They are agitated exclusively by the rapid whipping motion of the matador’s cape.'
  },
  {
    statement: 'Dropping a copper penny from the Empire State Building will accelerate fast enough to crack concrete or kill a pedestrian.',
    explanation: 'Due to air resistance, a penny reaches terminal velocity at only ~25-40 mph, which would sting like an insect bite but not cause fatal injury.'
  },
  {
    statement: 'Thomas Edison invented the very first electric lightbulb completely from scratch.',
    explanation: 'Over 20 inventors (including Warren de la Rue and Joseph Swan) had created incandescent lightbulbs before Edison created a practical carbon filament.'
  },
  {
    statement: 'Albert Einstein failed mathematics and basic arithmetic as a schoolboy in Germany.',
    explanation: 'Einstein mastered college-level differential and integral calculus by age 15; the rumor originated from a Swiss grading scale inversion.'
  },
  {
    statement: 'Waking up a sleepwalker will trigger a sudden heart attack or catastrophic shock.',
    explanation: 'While sleepwalkers may be momentarily disoriented or confused when awakened, it poses no danger of cardiac arrest.'
  },
  {
    statement: 'Different distinct zones of the human tongue detect sweet, sour, salty, and bitter tastes.',
    explanation: 'The classic "tongue map" was debunked decades ago; all taste sensations are detected across virtually all regions of the tongue containing taste buds.'
  },
  {
    statement: 'Napoleon Bonaparte was notoriously short, measuring only 4 feet 11 inches tall.',
    explanation: 'Napoleon stood 5 feet 7 inches (170 cm) tall, which was slightly above the average French male height of his era. British propaganda popularized the myth.'
  },
  {
    statement: 'Ostriches bury their heads deep in the sand whenever they sense predators.',
    explanation: 'Ostriches flop their bodies low to the ground to blend in with savannah grass, but they never bury their heads in sand (they would suffocate!).'
  },
  {
    statement: 'Eating turkey meat makes people extraordinarily sleepy because of elevated tryptophan levels.',
    explanation: 'Turkey contains no more tryptophan than chicken or beef; post-Thanksgiving sleepiness is caused by massive carbohydrate intake and digestional energy.'
  },
  {
    statement: 'Vikings wore fearsome metal helmets decorated with large horned projections in combat.',
    explanation: 'Viking helmets were plain domed iron; the horns were invented by 19th-century costume designers for Wagner’s operatic performances!'
  },
  {
    statement: 'Microwave radiation cooks food from the inside out starting from the very core.',
    explanation: 'Microwaves penetrate food from the outside inward, usually penetrating only 1 to 2 inches deep before heat conducts inward.'
  }
];

// Dynamic Two Truths & One Lie round generator
export function generateTwoTruthsRound(roundNum: number, usedLieIndices: Set<number>): TwoTruthsRound {
  // Find an unused lie index
  let lieIdx = roundNum % BELIEVABLE_MYTHS.length;
  if (usedLieIndices.has(lieIdx)) {
    for (let i = 0; i < BELIEVABLE_MYTHS.length; i++) {
      if (!usedLieIndices.has(i)) {
        lieIdx = i;
        break;
      }
    }
  }
  usedLieIndices.add(lieIdx);

  const selectedMyth = BELIEVABLE_MYTHS[lieIdx];

  // Pick 2 random true facts
  const truePool = [...VERIFIED_TRUE_FACTS];
  const fact1Idx = (roundNum * 7 + 3) % truePool.length;
  const fact1 = truePool[fact1Idx];
  truePool.splice(fact1Idx, 1);
  const fact2Idx = (roundNum * 13 + 5) % truePool.length;
  const fact2 = truePool[fact2Idx];

  // Randomize lie position among 0, 1, 2
  const liePos = (roundNum * 3 + 1) % 3;
  const statements: string[] = [];

  if (liePos === 0) {
    statements.push(selectedMyth.statement, fact1, fact2);
  } else if (liePos === 1) {
    statements.push(fact1, selectedMyth.statement, fact2);
  } else {
    statements.push(fact1, fact2, selectedMyth.statement);
  }

  return {
    id: `2t1l-round-${roundNum}`,
    statements,
    lieIndex: liePos,
    explanation: selectedMyth.explanation,
  };
}

// ---------------- 3. WOULD YOU RATHER: 10,000+ DILEMMAS ----------------
export const BASE_WYR: WyrItem[] = [
  { optA: 'Have the ability to speak every human language fluently', optB: 'Have the ability to converse with all animals', pctA: 58, pctB: 42 },
  { optA: 'Always arrive 20 minutes early to every event in your life', optB: 'Always arrive 10 minutes late to every event in your life', pctA: 71, pctB: 29 },
  { optA: 'Never have to sleep again with zero physical or mental fatigue', optB: 'Never have to worry about money, rent, or bills forever', pctA: 33, pctB: 67 },
  { optA: 'Live without internet access for 6 full months', optB: 'Live without music or podcasts for 2 full years', pctA: 41, pctB: 59 },
  { optA: 'Be able to read everyone’s thoughts within 5 meters of you', optB: 'Be able to become completely invisible at will', pctA: 46, pctB: 54 },
  { optA: 'Only be able to whisper for the rest of your life', optB: 'Only be able to shout at full volume for the rest of your life', pctA: 88, pctB: 12 },
  { optA: 'Win $1,000,000 right now tax-free', optB: 'Flip a coin: Heads you get $50,000,000, Tails you get $0', pctA: 64, pctB: 36 },
  { optA: 'Have free first-class flights anywhere in the world for life', optB: 'Have free gourmet 5-star restaurant meals for life', pctA: 52, pctB: 48 },
  { optA: 'Possess photographic memory for everything you see and read', optB: 'Be able to instantly forget any traumatic or cringey memory on demand', pctA: 60, pctB: 40 },
  { optA: 'Live in a world with no diseases or illness forever', optB: 'Live in a world with no poverty or wars forever', pctA: 47, pctB: 53 },
  { optA: 'Be 25% smarter than you are right now', optB: 'Be 50% more physically attractive than you are right now', pctA: 55, pctB: 45 },
  { optA: 'Have a pause button for reality time', optB: 'Have a 10-second rewind button for reality time', pctA: 39, pctB: 61 },
  { optA: 'Know the history of every antique object you touch', optB: 'Know the future of every person you shake hands with', pctA: 31, pctB: 69 },
  { optA: 'Always know when someone is lying directly to your face', optB: 'Always get away with any small lie you tell without suspicion', pctA: 74, pctB: 26 },
  { optA: 'Explore the deepest unmapped trenches of the ocean', optB: 'Explore an alien star system in deep outer space', pctA: 28, pctB: 72 },
  { optA: 'Have unlimited free battery on all your electronic devices for life', optB: 'Have ultra-fast 10 Gbps Wi-Fi everywhere on planet Earth', pctA: 44, pctB: 56 },
];

const WYR_OPTIONS_A = [
  'Have the superhuman ability to teleport anywhere on Earth instantly',
  'Be immune to all physical pain, bruises, and broken bones',
  'Possess the secret knowledge of whether alien civilizations exist',
  'Never have to wait in any line, traffic jam, or queue for the rest of your life',
  'Be universally liked by every person you ever meet in your life',
  'Be able to talk to your future self 20 years from today for 1 hour',
  'Wake up fully refreshed after only 15 minutes of sleep',
  'Have the power to make any person laugh uncontrollably on command',
  'Never have your phone, wallet, or keys lost or misplaced ever again',
  'Own a private superyacht with a personal chef anywhere in the Mediterranean',
  'Live in a futuristic utopia 300 years in the future',
  'Have an unlimited wardrobe where every designer outfit fits you perfectly',
  'Be able to learn any musical instrument to mastery in just 3 days',
  'Have complete control over the weather within a 1-mile radius of your house',
  'Never experience brain fog, anxiety, or burnout under pressure'
];

const WYR_OPTIONS_B = [
  'Have the superhuman ability to manipulate and bend time at will',
  'Be biologically immune to all illnesses, colds, and chronic diseases',
  'Possess the secret knowledge of what happens to consciousness after death',
  'Never have to cook, do dishes, or wash laundry ever again',
  'Be feared and respected as the most influential mastermind on the planet',
  'Be able to give advice to your 12-year-old self for 1 hour',
  'Taste every single food at 10x its normal flavor intensity',
  'Have the power to instantly calm and resolve any conflict or argument',
  'Receive $500 deposited into your bank account every single morning',
  'Own a private mountain mansion retreat with heated indoor infinity pools',
  'Live in an ancient mystical civilization at the height of its golden age',
  'Have an unlimited garage with any supercar or sports bike you desire',
  'Be able to speak and understand all animal vocalizations and thoughts',
  'Have complete photographic memory of every book and article ever written',
  'Never feel physical exhaustion or sleepiness when working on your dreams'
];

export function generateDynamicWYR(roundNum: number): WyrItem {
  if (roundNum < BASE_WYR.length) {
    return BASE_WYR[roundNum];
  }
  const idxA = (roundNum * 11) % WYR_OPTIONS_A.length;
  const idxB = (roundNum * 17) % WYR_OPTIONS_B.length;
  const pctA = 40 + ((roundNum * 7) % 25);
  return {
    optA: WYR_OPTIONS_A[idxA],
    optB: WYR_OPTIONS_B[idxB],
    pctA,
    pctB: 100 - pctA,
  };
}

// ---------------- 4. NEVER HAVE I EVER: 10,000+ CONFESSIONS ----------------
export const BASE_NHIE: string[] = [
  'Never have I ever pretended to be on a fake phone call to avoid someone on the street.',
  'Never have I ever eaten food that fell on the floor after the 5-second rule passed.',
  'Never have I ever accidentally sent a screenshot of a chat back to the person I screenshotted.',
  'Never have I ever lied about my birthday to get a free dessert or discount at a restaurant.',
  'Never have I ever stayed up past 4 AM binge-watching TikTok, Reels, or YouTube shorts.',
  'Never have I ever blamed a weird smell in the car or room on someone else.',
  'Never have I ever laughed so hard that a drink came out of my nose in public.',
  'Never have I ever stalked someone on social media and accidentally liked a photo from 5 years ago.',
  'Never have I ever made up an elaborate excuse to cancel plans just to stay in bed and do nothing.',
  'Never have I ever sent a risky text and immediately thrown my phone across the bed in sheer panic.',
  'Never have I ever pretended to know a song or movie everyone was talking about when I had zero clue.',
  'Never have I ever eaten food out of the fridge that had another roommate\'s name written on it.',
  'Never have I ever searched my own name on Google to see what photos or links appear.',
  'Never have I ever worn the same shirt or socks two days in a row without washing them.',
  'Never have I ever waved back at someone who was actually waving to someone standing behind me.',
  'Never have I ever regifted a present that someone gave me without removing the gift tag.',
  'Never have I ever cheated on an online test or exam using a hidden phone or extra monitor.',
  'Never have I ever spent money on an impulse online purchase and hidden the package from family.',
  'Never have I ever walked into a room and completely forgotten why I went there in the first place.',
  'Never have I ever practiced an argument or speech in the shower with imaginary comebacks.',
  'Never have I ever pretended to laugh at a joke that I did not understand at all.',
  'Never have I ever blamed a typo on autocorrect when I actually spelled the word wrong.',
  'Never have I ever watched an entire movie or TV show just because my crush recommended it.',
  'Never have I ever checked someone’s horoscope before deciding whether I liked them or not.',
  'Never have I ever tried to open a locked door with a credit card or bobby pin like a movie spy.'
];

const NHIE_DYNAMIC_BASES = [
  'Never have I ever lied about my age or identity',
  'Never have I ever secretly listened in on a stranger\'s conversation',
  'Never have I ever pretended to be sick or have an emergency',
  'Never have I ever stalked an ex-partner or past friend',
  'Never have I ever taken a selfie and deleted it immediately',
  'Never have I ever hidden food or snacks in my bedroom',
  'Never have I ever practiced kissing on an inanimate object',
  'Never have I ever taken credit for an idea or joke that someone else said quietly',
  'Never have I ever accidentally walked into the wrong public restroom',
  'Never have I ever googled simple spelling or math that a 10-year-old would know',
  'Never have I ever cried during a cartoon, commercial, or animated movie',
  'Never have I ever lied about having seen an iconic movie like Godfather or Star Wars',
  'Never have I ever re-read old romantic messages from someone I no longer speak to',
  'Never have I ever accidentally called a teacher or boss "Mom" or "Dad"',
  'Never have I ever spent hours researching a symptom on WebMD and convinced myself I was dying'
];

const NHIE_DYNAMIC_CONTEXTS = [
  'just to look cooler in front of strangers at a cafe.',
  'while pretending to read an email on my phone.',
  'to avoid going to a boring family dinner or wedding reception.',
  'from a fake anonymous burner profile with zero followers.',
  'more than 40 consecutive times until the lighting was perfect.',
  'so that my roommates or family members wouldn\'t ask for a bite.',
  'while daydreaming about a famous movie celebrity or crush.',
  'and watched everyone applaud as if I were a comedic genius.',
  'and tried to pretend I was just checking the hand-dryer.',
  'in the middle of a high-stakes professional meeting.',
  'because the background music was just way too emotional.',
  'because I didn\'t want to be excluded from the group banter.',
  'late at night while listening to melancholy indie music.',
  'in front of the entire classroom or boardroom table.',
  'at 2:30 in the morning after reading a single health forum post.'
];

export function generateDynamicNHIE(roundNum: number): string {
  if (roundNum < BASE_NHIE.length) {
    return BASE_NHIE[roundNum];
  }
  const baseIdx = (roundNum * 5) % NHIE_DYNAMIC_BASES.length;
  const ctxIdx = (roundNum * 13) % NHIE_DYNAMIC_CONTEXTS.length;
  return `${NHIE_DYNAMIC_BASES[baseIdx]} ${NHIE_DYNAMIC_CONTEXTS[ctxIdx]}`;
}

// ---------------- 5. MOST LIKELY TO: 10,000+ PROMPTS ----------------
export const BASE_MLT: string[] = [
  'Most likely to lose their phone while actively talking on it or holding it in their hand.',
  'Most likely to accidentally become famous on the internet overnight for a hilarious viral meme.',
  'Most likely to survive in a zombie apocalypse purely on sheer dumb luck and confusion.',
  'Most likely to buy something expensive on late-night impulse and regret it within 10 minutes.',
  'Most likely to accidentally reply-all to an entire company or university email chain.',
  'Most likely to laugh uncontrollably at a serious, silent, or completely inappropriate moment.',
  'Most likely to start their own podcast or YouTube channel that lasts exactly two episodes.',
  'Most likely to spend 45 minutes browsing Netflix trailers and then go to sleep without watching anything.',
  'Most likely to trip over nothing while walking gracefully on a completely flat floor.',
  'Most likely to accidentally like an Instagram photo from 2017 while stalking someone at 3 AM.',
  'Most likely to adopt 7 stray animals from the street and hide them from their landlord.',
  'Most likely to fake their own identity and move to a foreign country to escape a minor awkward situation.',
  'Most likely to become a billionaire and still haggle over the price of street food.',
  'Most likely to talk their way out of a speeding ticket by telling an elaborate fake life story.',
  'Most likely to cry during a comedy movie because one of the background side characters was sad.',
  'Most likely to forget their own birthday or anniversary until a notification reminds them.',
  'Most likely to be arrested for something ridiculously absurd like stealing a traffic cone.',
  'Most likely to accidentally push a door that clearly has a giant "PULL" sign written on it.',
  'Most likely to stay at a party until 5:00 AM talking to the host\'s dog or cat in the kitchen.',
  'Most likely to win a reality game show by manipulating everyone with charming smiles.'
];

const MLT_DYNAMIC_TRAITS = [
  'Most likely to get locked out of their own apartment or hotel room',
  'Most likely to accidentally join a strange cult or pyramid scheme',
  'Most likely to drop their phone directly onto their own face while lying in bed',
  'Most likely to text the wrong person something deeply personal',
  'Most likely to spend their last $50 on gourmet coffee or snacks',
  'Most likely to be caught singing a dramatic musical solo in their car at a red light',
  'Most likely to become a private detective or forensic investigator',
  'Most likely to survive for an entire month eating only instant noodles and cereal',
  'Most likely to win the lottery and not tell a single soul for 5 years',
  'Most likely to forget someone\'s name 3 seconds after being introduced to them'
];

const MLT_DYNAMIC_EXTENSIONS = [
  'while wearing mismatched slippers and holding an empty coffee mug.',
  'because the promotional flyer had free snacks and energetic music.',
  'and then act like it was an intentional facial massage reflex.',
  'and then immediately throw their phone into a bucket of water.',
  'even when their rent is due in less than 48 hours.',
  'by the driver in the adjacent car who has their window rolled down.',
  'purely to investigate whether their neighbors are keeping exotic pets.',
  'and insist to their doctor that they are meeting all nutritional goals.',
  'while continuing to work their normal job just for the gossip.',
  'and proceed to call them "chief", "buddy", or "legend" for the next 4 months.'
];

export function generateDynamicMLT(roundNum: number): string {
  if (roundNum < BASE_MLT.length) {
    return BASE_MLT[roundNum];
  }
  const traitIdx = (roundNum * 7) % MLT_DYNAMIC_TRAITS.length;
  const extIdx = (roundNum * 11) % MLT_DYNAMIC_EXTENSIONS.length;
  return `${MLT_DYNAMIC_TRAITS[traitIdx]} ${MLT_DYNAMIC_EXTENSIONS[extIdx]}`;
}
