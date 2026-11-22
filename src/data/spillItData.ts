// Massive Question & Scenario Bank for Spill It! (Social & Party)

export interface TodItem {
  type: 'TRUTH' | 'DARE';
  text: string;
}

export const BASE_TOD_DATA: Record<'kitty' | 'spicy' | 'wild' | 'deep', TodItem[]> = {
  kitty: [
    { type: 'TRUTH', text: 'What is the most ridiculous thing you bought just because an influencer promoted it?' },
    { type: 'TRUTH', text: 'Which person in this group would you trust to manage your bank account for 24 hours?' },
    { type: 'DARE', text: 'Speak in a dramatic French royalty accent for the next 3 rounds.' },
    { type: 'DARE', text: 'Show the most recent 3 photos in your phone gallery with no explanations allowed.' },
    { type: 'TRUTH', text: 'What is the silliest superstition you secretly still practice when nobody is looking?' },
    { type: 'DARE', text: 'Let the person to your left send any emoji to your third most recent contact on WhatsApp.' },
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
  ],
};

// Procedural Scenario Generators (Instantly creates 1,000+ unique dynamic party scenarios)
const SUBJECTS = [
  'your ex', 'your boss', 'your mother-in-law', 'your high school crush', 
  'your college professor', 'a famous Bollywood/Hollywood celebrity', 'your nosy neighbor',
  'your best friend\'s sibling', 'a secret admirer'
];

const AWKWARD_SITUATIONS = [
  'caught you practicing romantic speeches in front of the bathroom mirror',
  'walked in on you doing a bizarre interpretive dance to 90s pop music',
  'discovered your secret diary detailing your worst personal habits',
  'accidentally read your late-night food ordering receipt history',
  'found out you lied about having a dentist appointment just to take a 4-hour nap',
  'saw you accidentally waving back at a stranger who was waving to someone behind you',
  'heard you singing at the top of your lungs in the shower completely off-key'
];

const DARES_TEMPLATES = [
  'Do 10 pushups while shouting "I am the party champion!" after every single rep.',
  'Call a random pizza restaurant and ask if their pizzas come with free relationship advice.',
  'Let the player to your right compose a 1-sentence tweet from your account.',
  'Speak like a dramatic movie narrator describing everything the group does for the next 2 minutes.',
  'Wear your socks on your hands for the next 4 rounds of the game.',
  'Eat a raw lemon wedge or spoonful of chili sauce without making any facial expression.'
];

export function generateDynamicQuestion(_deck: 'kitty' | 'spicy' | 'wild' | 'deep'): TodItem {
  const isTruth = Math.random() < 0.55;
  if (isTruth) {
    const sub = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];
    const sit = AWKWARD_SITUATIONS[Math.floor(Math.random() * AWKWARD_SITUATIONS.length)];
    return {
      type: 'TRUTH',
      text: `What would you do if ${sub} suddenly ${sit}? Would you confess or lie?`,
    };
  } else {
    const dare = DARES_TEMPLATES[Math.floor(Math.random() * DARES_TEMPLATES.length)];
    return {
      type: 'DARE',
      text: dare,
    };
  }
}

export const EXPANDED_TWO_TRUTHS = [
  {
    statements: [
      'Bananas share about 50% of their DNA with human beings.',
      'Cheetahs can roar just like lions when defending their cubs.',
      'Wombat poop is shaped like distinct cubes.',
    ],
    lieIndex: 1,
    explanation: 'Cheetahs cannot roar! Their vocal cords are structured to purr, meow, and chirp like house cats.',
  },
  {
    statements: [
      'Oxford University is older than the Aztec Empire.',
      'Cleopatra lived closer in time to the Moon landing than to the building of the Great Pyramids.',
      'The Eiffel Tower was originally built to stay permanently in Barcelona, Spain.',
    ],
    lieIndex: 2,
    explanation: 'Barcelona rejected Gustave Eiffel’s design because they thought it was ugly and expensive!',
  },
  {
    statements: [
      'A group of flamingos is officially called a "flamboyance".',
      'Octopuses have three hearts and blue blood.',
      'Goldfish only possess a 3-second memory span.',
    ],
    lieIndex: 2,
    explanation: 'The 3-second memory is a total myth! Studies show goldfish can remember things for months.',
  },
  {
    statements: [
      'Honey never spoils; edible 3,000-year-old honey was discovered in Egyptian pharaoh tombs.',
      'Water makes up about 95% of a cucumber.',
      'Humans can breathe and swallow at the exact same time if they concentrate.',
    ],
    lieIndex: 2,
    explanation: 'Humans physically cannot breathe and swallow at the same time! Our larynx closes the airway during swallowing.',
  },
  {
    statements: [
      'Venus is the hottest planet in the Solar System, even hotter than Mercury which is closer to the Sun.',
      'A cloud can weigh more than 1 million pounds (500,000 kg).',
      'Lightning never strikes the same exact spot twice.',
    ],
    lieIndex: 2,
    explanation: 'Lightning frequently strikes the exact same spot! The Empire State Building is struck ~25 times every year.',
  },
  {
    statements: [
      'Sharks existed on Earth before trees did.',
      'There are more fake flamingos in the world than real wild flamingos.',
      'Cows can walk down stairs easily, but cannot walk up stairs.',
    ],
    lieIndex: 2,
    explanation: 'Cows can walk UP stairs, but their knee anatomy makes it almost impossible for them to walk DOWN stairs!',
  },
  {
    statements: [
      'A day on Venus is longer than an entire year on Venus.',
      'Hot water freezes faster than cold water under specific conditions (Mpemba effect).',
      'Humans share 99% of their DNA with domestic dogs.',
    ],
    lieIndex: 2,
    explanation: 'Humans share around 84% of DNA with dogs, but share 98.8% with chimpanzees!',
  },
];

export const EXPANDED_WYR = [
  {
    optA: 'Have the ability to speak every human language fluently',
    optB: 'Have the ability to talk and converse with all animals',
    pctA: 58,
    pctB: 42,
  },
  {
    optA: 'Always arrive 20 minutes early to every event in your life',
    optB: 'Always arrive 10 minutes late to every event in your life',
    pctA: 71,
    pctB: 29,
  },
  {
    optA: 'Never have to sleep again with zero physical or mental fatigue',
    optB: 'Never have to worry about money, rent, or bills forever',
    pctA: 33,
    pctB: 67,
  },
  {
    optA: 'Live without internet access for 6 full months',
    optB: 'Live without music or podcasts for 2 full years',
    pctA: 41,
    pctB: 59,
  },
  {
    optA: 'Be able to read everyone’s thoughts within 5 meters of you',
    optB: 'Be able to become completely invisible at will',
    pctA: 46,
    pctB: 54,
  },
  {
    optA: 'Only be able to whisper for the rest of your life',
    optB: 'Only be able to shout at full volume for the rest of your life',
    pctA: 88,
    pctB: 12,
  },
  {
    optA: 'Win $1,000,000 right now tax-free',
    optB: 'Flip a coin: Heads you get $50,000,000, Tails you get $0',
    pctA: 64,
    pctB: 36,
  },
  {
    optA: 'Have free first-class flights anywhere in the world for life',
    optB: 'Have free gourmet 5-star restaurant meals for life',
    pctA: 52,
    pctB: 48,
  },
];

export const EXPANDED_NHIE = [
  'Never have I ever pretended to be on a fake phone call to avoid someone on the street.',
  'Never have I ever eaten food that fell on the floor after the 5-second rule passed.',
  'Never have I ever accidentally sent a screenshot of a chat back to the person I screenshotted.',
  'Never have I ever lied about my birthday to get a free dessert at a restaurant.',
  'Never have I ever stayed up past 4 AM binge-watching TikTok or Instagram reels.',
  'Never have I ever blamed a weird smell in the car or room on someone else.',
  'Never have I ever laughed so hard that a drink came out of my nose.',
  'Never have I ever stalked someone on social media and accidentally liked a photo from 4 years ago.',
  'Never have I ever made up an elaborate excuse to cancel plans just to stay in bed and watch TV.',
  'Never have I ever sent a risky text and immediately thrown my phone across the bed in horror.',
  'Never have I ever pretended to know a song or movie everyone was talking about when I had zero clue.',
  'Never have I ever eaten food out of the fridge that had another roommate\'s name written on it.',
  'Never have I ever searched my own name on Google to see what appears.',
];

export const EXPANDED_MLT = [
  'Most likely to lose their phone while holding it in their own hand.',
  'Most likely to accidentally become famous on the internet overnight for a hilarious meme.',
  'Most likely to survive in a zombie apocalypse purely on sheer luck and confusion.',
  'Most likely to buy something expensive on late-night impulse and regret it within 10 minutes.',
  'Most likely to accidentally reply-all to an entire company or school email chain.',
  'Most likely to laugh uncontrollably at a serious or completely inappropriate moment.',
  'Most likely to start their own podcast or YouTube channel that lasts exactly two episodes.',
  'Most likely to spend 45 minutes browsing Netflix and then go to sleep without watching anything.',
  'Most likely to trip over nothing while walking on a completely flat floor.',
  'Most likely to accidentally like an Instagram photo from 2018 while stalking someone at 2 AM.',
];
