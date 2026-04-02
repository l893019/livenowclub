// src/lib/archetypes.ts

export type Book = {
  title: string;
  author: string;
};

export type Archetype = {
  key: string;
  name: string;
  color: string;
  utopia: string;
  description: string;
  blindSpot: string;
  superpower: string;
  book: Book;
};

export const archetypes: Record<string, Archetype> = {
  citizen: {
    key: "citizen",
    name: "Citizen of Abundance",
    color: "#3db9a4",
    utopia: "Their utopia has no word for \"job.\" It fell out of the language three centuries ago.",
    description: "They trust that intelligence, properly distributed, tends toward good. Too much freedom will always be preferable to too little.",
    blindSpot: "They sometimes mistake access for equity. Everyone having options is not the same as everyone being free.",
    superpower: "trusting abundance",
    book: { title: "The Player of Games", author: "Banks" },
  },
  shaper: {
    key: "shaper",
    name: "Shaper of Change",
    color: "#f4a03f",
    utopia: "Their utopia is never finished. Everything is always changing.",
    description: "The moment you stop adapting, you start calcifying. The future is something you build with whatever is at hand, including the wreckage.",
    blindSpot: "They sometimes mistake movement for progress. Tearing something down can be its own form of running away.",
    superpower: "building from scratch",
    book: { title: "Parable of the Sower", author: "Butler" },
  },
  architect: {
    key: "architect",
    name: "Architect of the Commons",
    color: "#9b8fef",
    utopia: "Their utopia belongs to everyone and answers to no one.",
    description: "They'd rather build something imperfect and collectively owned than something elegant and controlled by a few.",
    blindSpot: "They can love the system more than the people inside it. The meeting can become more important than what the meeting was for.",
    superpower: "thinking in systems",
    book: { title: "The Dispossessed", author: "Le Guin" },
  },
  presence: {
    key: "presence",
    name: "Keeper of Presence",
    color: "#e8178a",
    utopia: "Their utopia decided that undivided attention is the most valuable thing in the universe.",
    description: "They know the difference between capability and care, and they've never confused the two.",
    blindSpot: "They sometimes use care as a way to avoid confrontation. Staying in the room is not always the brave choice.",
    superpower: "showing up fully",
    book: { title: "Klara and the Sun", author: "Ishiguro" },
  },
  swimmer: {
    key: "swimmer",
    name: "Swimmer in Deep Water",
    color: "#6b8fef",
    utopia: "Their utopia is a civilization of philosophers whose single ambition is the deepest level of questioning.",
    description: "Most people see a problem and want to solve it. They see a question and want to live inside it.",
    blindSpot: "They can sit with a question so long it becomes an excuse to never act. Not-knowing can become its own cowardice.",
    superpower: "sitting with hard questions",
    book: { title: "Solaris", author: "Lem" },
  },
  rooted: {
    key: "rooted",
    name: "Rooted in Stillness",
    color: "#7ed6a4",
    utopia: "Their utopia returned to a simpler way of life, on purpose, knowing what it gave up.",
    description: "The most radical thing you can do in a world optimized for output is to stop, and mean it.",
    blindSpot: "Their stillness can look like withdrawal to the people who need them. Choosing to stop is a luxury not everyone can afford.",
    superpower: "knowing when to stop",
    book: { title: "A Psalm for the Wild-Built", author: "Chambers" },
  },
  conscience: {
    key: "conscience",
    name: "Conscience Before Comfort",
    color: "#d64545",
    utopia: "Their utopia built accountability into the architecture. Every leader's decisions are projected onto the sky.",
    description: "They see what others prefer to ignore. Someone has to watch the watchers.",
    blindSpot: "They can become so focused on what's wrong that they forget to notice what's working. Permanent suspicion is its own kind of prison.",
    superpower: "spotting what's hidden",
    book: { title: "1984", author: "Orwell" },
  },
  embers: {
    key: "embers",
    name: "Keeper of Embers",
    color: "#c97d3a",
    utopia: "Their utopia's most protected resource is not water or energy. It's memory.",
    description: "The most dangerous thing about acceleration is amnesia. The answers aren't in the next technology—they're in the last ten thousand years.",
    blindSpot: "They can love what was so deeply that they become hostile to what could be. The archive becomes a fortress.",
    superpower: "remembering what matters",
    book: { title: "A Canticle for Leibowitz", author: "Miller" },
  },
  friction: {
    key: "friction",
    name: "Alive in the Friction",
    color: "#ff6b35",
    utopia: "Their utopia kept one part of the world deliberately dangerous, because too much safety kills something essential.",
    description: "Ease is more dangerous than difficulty. Something in us requires resistance.",
    blindSpot: "They can mistake difficulty for meaning. Not everything hard is worth doing. Sometimes the easy path is the right one.",
    superpower: "embracing difficulty",
    book: { title: "The Stars My Destination", author: "Bester" },
  },
  unbound: {
    key: "unbound",
    name: "Unbound from Form",
    color: "#a855f7",
    utopia: "Their utopia transcended the physical. They exist as pure consciousness now.",
    description: "The boundary of the self is simply not where they stop. Most people find this frightening. They find it the most interesting question there is.",
    blindSpot: "They left so much behind that they may not recognize what was worth keeping until it's too late.",
    superpower: "imagining beyond limits",
    book: { title: "Childhood's End", author: "Clarke" },
  },
  alive: {
    key: "alive",
    name: "Alive to Everything",
    color: "#f472b6",
    utopia: "Their utopia engineered twelve new senses and a sunset that lasts all day.",
    description: "Change your form, change your perspective, taste every experience. The universe gave you everything. The least you can do is feel it.",
    blindSpot: "Sensation can become consumption. Feeling everything is not the same as understanding anything.",
    superpower: "feeling everything",
    book: { title: "Surface Detail", author: "Banks" },
  },
  mender: {
    key: "mender",
    name: "Mender of What Remains",
    color: "#10b981",
    utopia: "Their utopia decided the most advanced engineering was making what already exists work again.",
    description: "While everyone else is building arks and uploading consciousness, they're fixing the thing in front of them.",
    blindSpot: "They can become so focused on repair that they miss when something needs to die. Not everything should be saved.",
    superpower: "fixing what's broken",
    book: { title: "The Ministry for the Future", author: "Robinson" },
  },
  cleareyed: {
    key: "cleareyed",
    name: "Clear-Eyed in the Storm",
    color: "#64748b",
    utopia: "Their utopia has one person whose only job is to tell the truth. They answer to no one.",
    description: "They have one job: to see what is actually happening and say it out loud. The version that's true.",
    blindSpot: "Honesty without tenderness is cruelty. They can see everything clearly and still miss how their truth lands.",
    superpower: "telling hard truths",
    book: { title: "Slaughterhouse-Five", author: "Vonnegut" },
  },
  between: {
    key: "between",
    name: "In the Space Between",
    color: "#8b8b8b",
    utopia: "Their utopia just started to exist. Nothing is built yet. It's the beginning of an idea.",
    description: "Everyone else has a position. They have a question. And they're still here, which might be the bravest thing on this list.",
    blindSpot: "The space between can become a permanent address. Not knowing what you are can become a way of avoiding the risk of choosing.",
    superpower: "holding uncertainty",
    book: { title: "Never Let Me Go", author: "Ishiguro" },
  },
};

export const archetypeKeys = Object.keys(archetypes);

// Handcrafted pair dynamics - key format: "archA+archB" (alphabetical)
export const pairDynamics: Record<string, string> = {
  // Shaper tensions
  "embers+shaper": "One races toward tomorrow. The other holds yesterday close. Between them, the present gets attention.",
  "rooted+shaper": "The Shapers want to tear it down and rebuild. The Rooted ask: what was wrong with it?",

  // Conscience tensions
  "citizen+conscience": "The Citizen trusts the architecture. The Conscience tests the walls for cracks.",
  "alive+conscience": "One wants to feel everything. The other keeps asking: but should we?",

  // Presence tensions
  "presence+unbound": "The Keeper stays embodied. The Unbound wants to transcend. They're arguing about what it means to be here.",

  // Swimmer tensions
  "mender+swimmer": "The Swimmer lives in questions. The Mender needs to fix things. One pauses, the other acts.",

  // Friction tensions
  "friction+rooted": "One craves difficulty. One chose stillness. They don't understand each other at all.",

  // Architect dynamics
  "architect+shaper": "Both builders, different blueprints. The Architect wants consensus. The Shaper wants to start over.",
  "architect+mender": "Systems thinkers both. One designs new ones, one fixes old ones. They probably need each other.",

  // Citizen dynamics
  "alive+citizen": "Both believe in abundance. One wants access, the other wants experience. A generous worldview.",
  "citizen+swimmer": "The Citizen builds. The Swimmer questions. Both necessary, both frustrated with each other.",

  // Embers dynamics
  "between+embers": "The archive and the threshold. One knows where we came from. The other isn't sure where we're going.",
  "embers+mender": "Keepers both. One preserves memory, one preserves function. The museum and the workshop.",

  // Unbound dynamics
  "swimmer+unbound": "Both comfortable with ambiguity. They might talk for hours and enjoy every minute.",
  "alive+unbound": "Sensation-seekers, different methods. One through the body, one past it.",

  // Cleareyed dynamics
  "cleareyed+conscience": "Truth-tellers both. The Conscience watches systems. Clear-Eyed watches everything.",
  "cleareyed+swimmer": "Both live in clarity, different kinds. Facts vs. questions. They respect each other.",

  // Rooted dynamics
  "presence+rooted": "Stillness and attention. They understand something the others don't.",
  "mender+rooted": "The patient ones. They'll be here when the dust settles.",

  // Between dynamics
  "between+swimmer": "Uncertainty specialists. Neither one is sure, and they're fine with that.",

  // Same-archetype dynamics
  "shaper+shaper": "Two builders. You'll create something—if you stop redesigning it.",
  "rooted+rooted": "Two in stillness. Peaceful—but who makes the first move?",
  "conscience+conscience": "Two watchmen. Nothing escapes you. Exhausting, but safe.",
  "citizen+citizen": "Two at ease. This utopia floats. Who drops anchor?",
  "swimmer+swimmer": "Two in deep water. You'll question everything. Even this.",
  "architect+architect": "Two systems thinkers. Great structures. Who lives in them?",
  "presence+presence": "Two keepers. So much holding space. Who acts?",
  "embers+embers": "Two archivists. The past is very well preserved here.",
  "friction+friction": "Two who crave difficulty. This should be interesting.",
  "unbound+unbound": "Two transcenders. You've both left the building.",
  "alive+alive": "Two sensation-seekers. Buckle up.",
  "mender+mender": "Two fixers. Everything here will work. Eventually.",
  "cleareyed+cleareyed": "Two truth-tellers. No one's getting away with anything.",
  "between+between": "Two still figuring it out. At least you're not alone.",
};

// Helper to get pair key (alphabetically sorted)
function getPairKey(a: string, b: string): string {
  return [a, b].sort().join("+");
}

// Get dynamic for a pair of archetypes
export function getPairDynamic(a: string, b: string): string | null {
  const key = getPairKey(a, b);
  return pairDynamics[key] || null;
}
