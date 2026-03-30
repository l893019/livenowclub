// ORBITS content extracted from essays - inputs that shape Louise's thinking

export type Book = {
  title: string;
  author: string;
  description: string;
  link?: string;
};

export type IChing = {
  hexagram: string;
  meaning: string;
  link?: string;
};

export type Signal = {
  title: string;
  type: "podcast" | "article" | "film" | "quote";
  description: string;
  link?: string;
};

export type Practice = {
  title: string;
  description: string;
  link?: string;
};

export type Question = string;

// Books that have shaped Louise's thinking
export const BOOKS: Book[] = [
  {
    title: "It Lasts Forever and Then It's Over",
    author: "Anne de Marcken",
    description: "A haunting, philosophical novella narrated by a zombie. It moves through death, decay, and the persistence of love.",
    link: "https://amzn.to/4oiw3d1",
  },
  {
    title: "The Inevitable",
    author: "Kevin Kelly",
    description: "On technological forces that are already in motion and how to ride them with intention. Fundamental to my worldview.",
    link: "https://amzn.to/46Pfq2Q",
  },
  {
    title: "Flatland",
    author: "Edwin A. Abbott",
    description: "A parable on dimensional blindness and the limits of perception.",
    link: "https://amzn.to/3IZnV2c",
  },
  {
    title: "East of Eden",
    author: "John Steinbeck",
    description: "A sprawling, biblical tale of love, jealousy, and moral inheritance that asks whether we are bound by the sins of our forebearers or free to choose our own goodness.",
    link: "https://amzn.to/47e2Edd",
  },
  {
    title: "The Order of Time",
    author: "Carlo Rovelli",
    description: "A physicist's meditation on time as fluid and relational.",
    link: "https://amzn.to/48uXewL",
  },
  {
    title: "The Imitation of Christ",
    author: "Thomas Kempis",
    description: "A book I keep returning to for my own framework of how to be good, how to live humbly, and how to live a spiritual life.",
    link: "https://www.amazon.com/Imitation-Christ-Thomas-%C3%A0-Kempis/dp/B09FC6HC78",
  },
  {
    title: "The Heart Sutra",
    author: "Red Pine (translator)",
    description: "Buddhism in a nutshell. I've carried this book with me on many plane flights. I don't know if I will ever truly understand it all.",
    link: "https://amzn.to/3JnzjFc",
  },
  {
    title: "Ways of Seeing",
    author: "John Berger",
    description: "A short but radical re-orientation toward image, gender, and gaze. Every act of seeing carries history.",
    link: "https://www.ways-of-seeing.com/",
  },
  {
    title: "The Perennial Philosophy",
    author: "Aldous Huxley",
    description: "A collage of mystic voices from every tradition, all circling the same truth.",
    link: "https://amzn.to/3WleHjN",
  },
  {
    title: "Nineteen Ways of Looking at Wang Wei",
    author: "Eliot Weinberger",
    description: "A slim, brilliant meditation on translation and perception. Twenty translators, one four-line poem, and endless ways of seeing. A reminder that every act of interpretation is also an act of creation.",
    link: "https://amzn.to/47lYG2i",
  },
  {
    title: "Wild Geese Returning: Chinese Reversible Poems",
    author: "Michèle Metsch",
    description: "Poems that can be read forward and backward, revealing mirrored meanings.",
    link: "https://amzn.to/4oFbasV",
  },
  {
    title: "Man and His Symbols",
    author: "Carl Jung",
    description: "One of my favorite books of all time. A map of the symbols that rise from the collective unconscious and guide us toward wholeness.",
  },
  {
    title: "The Dream and the Underworld",
    author: "James Hillman",
    description: "Hillman reimagines dreams as mythic spaces to inhabit.",
  },
  {
    title: "The Lathe of Heaven",
    author: "Ursula K. Le Guin",
    description: "A novel where dreams shape reality, and the cost of trying to control the unconscious becomes clear.",
  },
  {
    title: "Gödel, Escher, Bach: An Eternal Golden Braid",
    author: "Douglas Hofstadter",
    description: "A labyrinth of mirrors linking mathematics, music, and mind. On recursion, pattern, and how self-awareness arises when a system turns to watch itself.",
  },
  {
    title: "Invisible Cities",
    author: "Italo Calvino",
    description: "Less as a book than as a method of perception: looking at the world through memory, metaphor, and multiplicity. Seeing every place as an inner place.",
  },
  {
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    description: "A classic on trauma and somatic healing.",
  },
  {
    title: "Bluets",
    author: "Maggie Nelson",
    description: "Grief, color, and desire woven into philosophy. Softness and devastation coexisting without resolution.",
  },
  {
    title: "A Memory Called Empire",
    author: "Arkady Martine",
    description: "An ambassador enters a culture so interconnected it feels telepathic; she must decide whether to remain sealed off or be changed.",
  },
];

// I Ching hexagrams that have guided Louise
export const I_CHING: IChing[] = [
  {
    hexagram: "64, Before Completion → 44, Coming to Meet",
    meaning: "The moment before form settles, when everything is in motion but not yet resolved. A reminder that we live most truthfully inside transition. We are always mid-crossing. The work is to keep walking.",
    link: "https://www.cafeausoul.com/reading/?lns=876767",
  },
  {
    hexagram: "54, Marrying Maiden → 17, Following",
    meaning: "A lesson in surrender and attunement. Learning humility inside imbalance. When I stop trying to lead, I can finally hear the rhythm that was there all along.",
    link: "https://www.cafeausoul.com/reading/?lns=798768",
  },
  {
    hexagram: "35, Progress → 38, Opposition",
    meaning: "A movement from radiant visibility to sacred friction. True progress often calls forth divergence. The work is to stay centered while contrasts sharpen, to see conflict as the next threshold of growth.",
  },
  {
    hexagram: "35, Progress → 16, Enthusiasm",
    meaning: "Let yourself be seen, let yourself be helped. That's how progress becomes lift. Softening isn't the opposite of strength; it's the source of momentum.",
    link: "https://www.cafeausoul.com/reading/?lns=888789",
  },
];

// Signals - podcasts, articles, films, quotes that resonate
export const SIGNALS: Signal[] = [
  {
    title: "The Telepathy Tapes",
    type: "podcast",
    description: "Explorations of consciousness, coincidence, and unseen communication.",
  },
  {
    title: "Never Look Away",
    type: "film",
    description: "A German coming-of-age romantic drama inspired by the life of Gerald Richter. The beginning is hard to watch, but it's a beautiful story.",
    link: "https://www.amazon.com/Never-Look-Away-Sebastian-Koch/dp/B07M7FYJ4D",
  },
  {
    title: "Rick Owens Retrospective",
    type: "article",
    description: "He lives in his world; I want to build mine.",
    link: "https://www.nytimes.com/2025/06/28/style/rick-owens-retrospective.html",
  },
  {
    title: "From Bunker Experience to Bunker Mentality",
    type: "article",
    description: "A great article on the philosophy of bunkers.",
    link: "https://www.pismowidok.org/en/archive/2013/4-ruin/from-bunker-experience-to-bunker-mentality",
  },
];

// Practices that help Louise live now
export const PRACTICES: Practice[] = [
  {
    title: "5Rhythms",
    description: "Dance practice. If you are in New York, come dance with me. Otherwise, find a class near you.",
    link: "https://www.5rhythms.com/EventSearch.php",
  },
  {
    title: "23rd Street Studio",
    description: "Art class in San Francisco I can't recommend highly enough. One exercise: tense your body as much as possible and then let that tension flow through your arm onto the page.",
    link: "https://23rdstreetstudio.com/",
  },
  {
    title: "Dream Practice",
    description: "Start with 30-60 minutes of light therapy or daylight. Before bed, meditate using the Expand app from Monroe. Write down dreams first thing in the morning without trying to put meaning into them. Let symbols infiltrate your art and mind.",
    link: "https://info.monroeinstitute.org/get-expand-app",
  },
];

// Questions to live with
export const QUESTIONS: Question[] = [
  "What is the current carrying you towards, and where are you still trying to swim against it?",
  "What would it mean to look without needing to name?",
  "Are you the dreamer or the dream?",
  "Where am I fortifying when I could be connecting?",
];
