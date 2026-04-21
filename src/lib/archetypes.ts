// src/lib/archetypes.ts

import { archetypePositions } from "@/lib/radar-positions";

export type Book = {
  title: string;
  author: string;
};

export type BookWithReason = {
  title: string;
  author: string;
  reason: string;
};

export type Compatibility = {
  ally: string;
  tension: string;
  need: string;
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
  books: BookWithReason[];
  compatibility: Compatibility;
  // Expanded analytical content
  superpowerExpanded: string;
  blindSpotExpanded: string;
  coreBeliefs: string[];
  howYouGotHere: string;
  allyDescription: string;
  tensionDescription: string;
  needDescription: string;
  // Share card fields
  pull: string;  // What draws them (short phrase)
  edge: string;  // Their unique advantage (short phrase)
  oneSentence: string;  // Tweetable summary of their worldview
  // Famous figures who embody this archetype
  famousFigures: {
    real: string[];       // Real people (living or historical)
    fictional: string[];  // Characters from books, movies, TV
  };
};

export const archetypes: Record<string, Archetype> = {
  citizen: {
    key: "citizen",
    name: "The Abundant",
    color: "#3db9a4",
    utopia: "Their utopia has no word for \"job.\" It fell out of the language three centuries ago.",
    description: "They trust that intelligence, properly distributed, tends toward good. Too much freedom will always be preferable to too little.",
    blindSpot: "You sometimes mistake access for equity. Everyone having options is not the same as everyone being free.",
    superpower: "trusting abundance",
    book: { title: "The Player of Games", author: "Banks" },
    books: [
      { title: "The Player of Games", author: "Banks", reason: "The Culture at its most playful. A civilization where games become the highest art because survival has been solved." },
      { title: "Accelerando", author: "Stross", reason: "What happens when abundance accelerates past human comprehension, and the economy becomes incomprehensible to its creators." },
      { title: "Down and Out in the Magic Kingdom", author: "Doctorow", reason: "Post-scarcity as actually lived: messy, political, and still full of people trying to figure out what matters." }
    ],
    compatibility: {
      ally: "the one who wants to feel everything",
      tension: "the one who's watching for what's being hidden",
      need: "the one who craves difficulty"
    },
    superpowerExpanded: `Most people operate from a scarcity mindset without noticing it. They hoard information, guard opportunities, assume resources are zero-sum. You don't.

You've thought about it. You've read the economic arguments, the technological projections, the science fiction that takes abundance seriously. And you've concluded that the biggest barrier to abundance is imagination, not resources. Most scarcity is manufactured or inherited, and you can see past it.

This makes you genuinely useful in rooms full of people fighting over a pie that could be made larger. You ask the question others don't think to ask: why are we assuming there isn't enough?`,

    blindSpotExpanded: `You can mistake access for equity. "Everyone can use this" is not the same as "everyone can benefit from this."

The Culture novels you love are honest about this: even in a post-scarcity utopia, some people are miserable. Abundance doesn't solve loneliness, meaninglessness, or the unequal distribution of attention and care. When you focus on expanding access, you may miss who's still being left out and why.

Watch for the moments when your trust in systems becomes trust that systems will solve problems they can't touch. Not everything that matters can be distributed.`,

    coreBeliefs: [
      "Scarcity is more often manufactured than natural",
      "Systems designed for abundance tend toward good; systems designed for control tend toward harm",
      "Technology should eliminate drudgery, not create new forms of it",
      "The best argument against pessimism is building something better"
    ],

    howYouGotHere: `Your answers revealed a consistent orientation toward trust and possibility. When asked about AI and automation, you focused on potential benefits rather than risks. When asked about human nature, you leaned toward believing people do well when given resources and freedom. When asked about the future, you imagined expansion rather than constraint. This pattern of trusting abundance over scarcity, freedom over control, maps to what we call The Abundant.`,

    allyDescription: "The Alive shares your belief that life can be good. They want to feel everything the universe offers; you want everyone to have access to it. You're both optimists, but they ground your systems-thinking in embodied experience. They remind you what abundance is for.",

    tensionDescription: "The Guardian doesn't trust what you trust. While you see systems that could work beautifully, they see cracks, hidden costs, who's being surveilled. They'll exhaust you with suspicion, and occasionally save you from your own blind spots.",

    needDescription: "The Challenger will challenge your comfort. You believe abundance should make life easier; they believe ease can make life hollow. They'll push you to examine whether your utopia has room for struggle, growth, and the meaning that comes from difficulty.",

    pull: "toward possibility",
    edge: "you see systems others don't",
    oneSentence: "You believe abundance is a design choice, not a destination—and most scarcity is a failure of imagination.",
    famousFigures: {
      real: ["Buckminster Fuller", "Stewart Brand", "Elinor Ostrom"],
      fictional: ["Genly Ai (The Left Hand of Darkness)", "The Culture citizens (Iain Banks)", "Ted Lasso"]
    }
  },
  shaper: {
    key: "shaper",
    name: "The Builder",
    color: "#f4a03f",
    utopia: "Their utopia is never finished. Everything is always changing.",
    description: "The moment you stop adapting, you start calcifying. The future is something you build with whatever is at hand, including the wreckage.",
    blindSpot: "You sometimes mistake movement for progress. Tearing something down can be its own form of running away.",
    superpower: "building from scratch",
    book: { title: "Parable of the Sower", author: "Butler" },
    books: [
      { title: "Parable of the Sower", author: "Butler", reason: "Building a new belief system from the ruins. Change as spiritual practice." },
      { title: "Red Mars", author: "Robinson", reason: "Terraforming as philosophy. Every technical choice is a political one, and the planet pushes back." },
      { title: "The Diamond Age", author: "Stephenson", reason: "Education as revolution. The primer transforms who you can become." }
    ],
    compatibility: {
      ally: "the one who craves difficulty",
      tension: "the one who chose stillness",
      need: "the one who guards what came before"
    },
    superpowerExpanded: `When others see rubble, you see raw material. When others mourn what's ending, you're already sketching what comes next.

You have a different relationship with time. You understand, at a cellular level, that everything is always changing. Fighting that reality wastes energy better spent shaping what emerges. Octavia Butler's Earthseed philosophy resonates with you: "God is Change." Not because change is good, but because change is true, and aligning with truth gives you leverage.

You're valuable in moments of collapse and transition, when others are frozen by grief or fear. You can move when movement matters most.`,

    blindSpotExpanded: `Movement can become its own addiction. Tearing something down feels like progress even when it isn't.

You may reach for revolution when reform would serve better. You may burn bridges that were worth crossing again. The thrill of starting over can mask a fear of the slower, harder work of maintaining, repairing, living with imperfection.

Watch for the moments when your urge to build from scratch is actually an urge to escape: from boredom, from accountability, from the tedious work of making something existing actually work. Not everything that feels stuck is calcified. Sometimes roots are growing.`,

    coreBeliefs: [
      "Change is the only constant; resistance to it is wasted energy",
      "The best time to build something new is when the old thing is falling apart",
      "Adaptation is a form of intelligence; calcification is a form of death",
      "Every crisis is a construction site if you know how to look"
    ],

    howYouGotHere: `Your answers clustered around transformation and agency. When asked about stability, you valued it less than others. When asked about tradition, you saw it as raw material rather than constraint. When faced with hypothetical collapses (social, technological, environmental), you oriented toward building rather than preserving. This consistent bias toward change and construction maps to what we call The Builder.`,

    allyDescription: "The Challenger understands your restlessness. They seek out difficulty. While others ask you to slow down, they'll match your pace and push you further. They validate that the struggle itself has value.",

    tensionDescription: "The Rooted is your opposite. They chose to stop moving; you can't imagine why anyone would. Their stillness looks like stagnation to you; your movement looks like flight to them. You're arguing about the fundamental nature of growth.",

    needDescription: "The Keeper guards what you might carelessly discard. They remember what worked, what was lost, what deserves to be carried forward. Without them, you risk building the same failures again with different names. They're the conscience of your construction site.",

    pull: "toward transformation",
    edge: "you build from rubble",
    oneSentence: "You believe the future is built, not inherited—and you'd rather make something imperfect than wait for permission.",
    famousFigures: {
      real: ["Elon Musk", "Ada Lovelace", "Steve Jobs"],
      fictional: ["Tony Stark (Iron Man)", "Leslie Knope (Parks & Rec)", "Doc Brown (Back to the Future)"]
    }
  },
  architect: {
    key: "architect",
    name: "The Architect",
    color: "#9b8fef",
    utopia: "Their utopia belongs to everyone and answers to no one.",
    description: "They'd rather build something imperfect and collectively owned than something elegant and controlled by a few.",
    blindSpot: "You can love the system more than the people inside it. The meeting can become more important than what the meeting was for.",
    superpower: "thinking in systems",
    book: { title: "The Dispossessed", author: "Le Guin" },
    books: [
      { title: "The Dispossessed", author: "Le Guin", reason: "The ambiguous utopia. Anarchism as lived practice, with all its frustrations and freedoms." },
      { title: "Pacific Edge", author: "Robinson", reason: "Utopia is zoning laws and water rights. The quiet work of making a good society actually function." },
      { title: "Four Ways to Forgiveness", author: "Le Guin", reason: "Liberation is not a moment but a generation. The slow, painful work of building freedom after slavery." }
    ],
    compatibility: {
      ally: "the one who fixes what's broken",
      tension: "the one who left the body behind",
      need: "the one who lives in questions"
    },
    superpowerExpanded: `You see the invisible architecture. Every social space has rules, written and unwritten, designed and emergent, and you can read them like blueprints.

This is rarer than it sounds. Most people experience systems as weather: something that happens to them. You experience systems as design: something that was built, that could have been built differently, that could be rebuilt. This perspective is genuinely useful. It means you can ask "who does this serve?" and "what would serve everyone?" when others are still asking "why is this happening to me?"

Le Guin called The Dispossessed an "ambiguous utopia." You understand why. Building collective structures is messy, frustrating, full of compromise. You'd still rather do that than build something elegant that only a few people control.`,

    blindSpotExpanded: `You can fall in love with the system and forget the people inside it.

The meeting becomes more important than what the meeting was for. The process becomes sacred. You may defend structures that have stopped serving their purpose, because the structure itself feels like the point.

Watch for the moments when your commitment to collective ownership becomes collective bureaucracy. Watch for when "everyone has a voice" becomes "no one can act." The commons you're building is for people. If the people are suffering inside your beautiful system, the system has failed, no matter how fair its rules.`,

    coreBeliefs: [
      "The best structures are the ones that belong to everyone who uses them",
      "Elegance controlled by few is worse than messiness shared by many",
      "Every system encodes values; design is never neutral",
      "The work of liberation is generational, not revolutionary"
    ],

    howYouGotHere: `Your answers revealed a consistent orientation toward collective ownership and structural thinking. When asked about governance, you preferred distributed over centralized. When asked about technology, you focused on who controls it rather than what it can do. When asked about utopia, you described something that belongs to everyone. This pattern of systems-thinking in service of the commons maps to what we call The Architect.`,

    allyDescription: "The Mender shares your commitment to things that work. While you design new systems, they repair existing ones. You're natural partners: you provide the blueprints, they provide the maintenance. Together, you build things that last.",

    tensionDescription: "The Transcendent challenges your attachment to structure itself. They want to transcend form; you want to perfect it. They'll ask why you're building walls at all. It's a fundamental disagreement about whether liberation requires architecture or escape from it.",

    needDescription: "The Deep will slow you down with questions you can't answer quickly. When you're ready to implement, they're still asking why. Frustrating, and necessary. They ensure your systems are built on real understanding, not efficient assumptions.",

    pull: "toward collective ownership",
    edge: "you see the invisible architecture",
    oneSentence: "You believe good systems make good behavior easy—and you'd rather design the container than fix the contents.",
    famousFigures: {
      real: ["Jane Jacobs", "Christopher Alexander", "Donella Meadows"],
      fictional: ["Hari Seldon (Foundation)", "The Architect (The Matrix)", "Varys (Game of Thrones)"]
    }
  },
  presence: {
    key: "presence",
    name: "The Present",
    color: "#e8178a",
    utopia: "Their utopia decided that undivided attention is the most valuable thing in the universe.",
    description: "They know the difference between capability and care, and they've never confused the two.",
    blindSpot: "You sometimes use care as a way to avoid confrontation. Staying in the room is not always the brave choice.",
    superpower: "showing up fully",
    book: { title: "Klara and the Sun", author: "Ishiguro" },
    books: [
      { title: "The Diamond Age", author: "Stephenson", reason: "A hired actress becomes a surrogate mother through a machine. Presence transmitted through technology but never replaced by it." },
      { title: "Klara and the Sun", author: "Ishiguro", reason: "An AI friend who sees everything and is seen by almost no one. The quiet devastation of being present for someone who doesn't stay." },
      { title: "The Lifecycle of Software Objects", author: "Chiang", reason: "Raising digital beings requires the same thing as raising children: showing up, year after year, when it's no longer novel." }
    ],
    compatibility: {
      ally: "the one who chose stillness",
      tension: "the one who left the body behind",
      need: "the one who tells the truth"
    },
    superpowerExpanded: `Showing up fully sounds simple, but it's rare. Most people are present in body but absent in attention, planning, rehearsing, defending, performing. The person in front of them is a prop in their internal drama.

You have an unusual capacity to actually be in the room. People feel it. They may not be able to name what you're doing differently, but they register it. Conversations with you land differently. Someone's life is different because you were there. You may never know whose.

This is valuable precisely because it's rare. In a world optimized for productivity, pure attention is a radical act. You understand what Klara understood: the difference between capability and care is everything.`,

    blindSpotExpanded: `You can use care as a way to avoid confrontation.

Staying present feels virtuous. Usually it is. But sometimes the brave choice is leaving the room, ending the conversation, saying the thing that breaks the connection in order to tell the truth. Holding space can become holding on.

Your instinct is to be with people in their difficulty. That's valuable. But presence can become a way of avoiding the rupture that growth requires. Watch for the moments when "being present" is actually "being safe," when staying in the room lets you avoid saying the thing that needs to be said.`,

    coreBeliefs: [
      "The most valuable thing you can give someone is your undivided attention",
      "Efficiency is often the enemy of depth",
      "Technology should enable presence, not replace it",
      "Most problems are really loneliness in disguise"
    ],

    howYouGotHere: `Your answers clustered strongly around a consistent worldview. When asked about machine companionship, you distinguished between capability and care. When asked about unstructured time, you oriented toward people, not projects. When asked about the future, you focused on what we might lose, not what we might gain. This pattern of valuing presence over productivity, attention over achievement, maps to what we call The Present.`,

    allyDescription: "The Rooted shares your groundedness. They understand that presence matters more than progress. They'll feel like home: someone who doesn't need you to justify slowing down, who knows that stopping can be the bravest choice.",

    tensionDescription: "The Transcendent challenges your attachment to embodiment. They want to transcend; you want to stay. They'll ask why you're so committed to being here when there's so much more beyond. You're arguing about what it means to be present at all.",

    needDescription: "The Truth-Teller will say the thing you're avoiding. It will hurt. You need someone who values truth over comfort, even when comfort is what you offer. They'll help you see when presence has become avoidance.",

    pull: "toward connection",
    edge: "you show up when others don't",
    oneSentence: "You believe attention is the rarest resource—and you'd rather be fully here than halfway everywhere.",
    famousFigures: {
      real: ["Thich Nhat Hanh", "Mary Oliver", "Fred Rogers"],
      fictional: ["Uncle Iroh (Avatar)", "Samwise Gamgee (Lord of the Rings)", "Beth Harmon (Queen's Gambit)"]
    }
  },
  swimmer: {
    key: "swimmer",
    name: "The Deep",
    color: "#6b8fef",
    utopia: "Their utopia is a civilization of philosophers whose single ambition is the deepest level of questioning.",
    description: "Most people see a problem and want to solve it. They see a question and want to live inside it.",
    blindSpot: "You can sit with a question so long it becomes an excuse to never act. Not-knowing can become its own cowardice.",
    superpower: "sitting with hard questions",
    book: { title: "Solaris", author: "Lem" },
    books: [
      { title: "Solaris", author: "Lem", reason: "An ocean that may be conscious but refuses to be understood. Contact as permanent mystery." },
      { title: "Blindsight", author: "Watts", reason: "What if consciousness is a bug, not a feature? The deepest questions have no comfortable answers." },
      { title: "Story of Your Life", author: "Chiang", reason: "Learning an alien language that reveals time differently. Knowing the ending doesn't diminish the living." }
    ],
    compatibility: {
      ally: "the one who left the body behind",
      tension: "the one who fixes what's broken",
      need: "the one who builds collective structures"
    },
    superpowerExpanded: `Most people see a question and want to answer it. They see a problem and want to solve it. The discomfort of not-knowing drives them toward resolution, any resolution, as quickly as possible.

You can sit in the uncertainty. You can hold a question without grasping for an answer. It's a different kind of rigor. Lem's Solaris is your sacred text: an ocean that might be conscious but refuses to be understood, and scientists who keep trying anyway, knowing they'll fail.

This capacity is genuinely rare and valuable. In a world that rewards confident answers, your willingness to stay in the question is a kind of intellectual courage. You notice what others rush past.`,

    blindSpotExpanded: `Not-knowing can become its own cowardice.

There's a difference between sitting with genuine uncertainty and using uncertainty as an excuse to never commit. Questions are infinite; life is not. At some point, you have to act on incomplete information. Everyone does. If you wait for certainty, you'll wait forever.

Watch for the moments when "I'm still thinking about it" is actually "I'm afraid to be wrong." Watch for when philosophical depth becomes a way of avoiding the messiness of decision. The deep water is beautiful, but you can drown in it.`,

    coreBeliefs: [
      "The best questions are the ones that can't be fully answered",
      "Certainty is usually a sign that something is being ignored",
      "Understanding matters more than solving",
      "The deepest truths reveal themselves slowly, if at all"
    ],

    howYouGotHere: `Your answers revealed a consistent orientation toward depth over resolution. When asked about consciousness, you leaned into mystery rather than explanation. When asked about the future, you focused on what we don't understand rather than what we might build. When given choices between action and reflection, you chose reflection. This pattern of valuing questions over answers, depth over speed, maps to what we call The Deep.`,

    allyDescription: "The Transcendent shares your comfort with uncertainty. They're reaching past the edges of what's known; you're diving into the depths. You both understand that the most important things resist easy comprehension. They'll never rush you toward answers.",

    tensionDescription: "The Mender needs to fix things. While you're still asking why it broke, they're already reaching for tools. Your reflection looks like paralysis to them; their action looks like avoidance to you. You're arguing about when understanding is enough.",

    needDescription: "The Architect will give your questions structure. You can swim in deep water forever; they'll build you a vessel. They ensure your insights eventually serve something beyond your own understanding, that your questions lead somewhere collective.",

    pull: "toward questions",
    edge: "you see what builders miss",
    oneSentence: "You believe understanding matters more than certainty—and you'd rather sit with a question than settle for a bad answer.",
    famousFigures: {
      real: ["Socrates", "Richard Feynman", "Hannah Arendt"],
      fictional: ["Gandalf (Lord of the Rings)", "The Dude (The Big Lebowski)", "Rust Cohle (True Detective)"]
    }
  },
  rooted: {
    key: "rooted",
    name: "The Rooted",
    color: "#7ed6a4",
    utopia: "Their utopia returned to a simpler way of life, on purpose, knowing what it gave up.",
    description: "The most radical thing you can do in a world optimized for output is to stop, and mean it.",
    blindSpot: "Your stillness can look like withdrawal to the people who need you. Choosing to stop is a luxury not everyone can afford.",
    superpower: "knowing when to stop",
    book: { title: "A Psalm for the Wild-Built", author: "Chambers" },
    books: [
      { title: "A Psalm for the Wild-Built", author: "Chambers", reason: "A monk and a robot ask what we're for. The answer might be: nothing, and that's okay." },
      { title: "Always Coming Home", author: "Le Guin", reason: "A civilization that chose not to progress. The anthropology of people who stayed put." },
      { title: "Piranesi", author: "Clarke", reason: "A man who has forgotten the world and found peace in a house with no exit. Presence without purpose." }
    ],
    compatibility: {
      ally: "the one who values presence above all",
      tension: "the one who can't stop building",
      need: "the one who wants to feel everything"
    },
    superpowerExpanded: `In a world that treats acceleration as virtue, you've made a different choice. You know that "more" and "faster" and "bigger" are not always better, that sometimes the most radical thing you can do is stop.

Le Guin's Kesh people in Always Coming Home didn't lack the ability to build empires; they chose not to. Chambers' monk in A Psalm for the Wild-Built is trying to understand what life is for. Your stillness is a position, argued and defended against a culture that treats it as failure.

You understand something that productivity culture cannot: that human beings are not problems to be optimized. That stopping is not failure. That sometimes the answer to "what should I do?" is genuinely "nothing, and that's okay."`,

    blindSpotExpanded: `Stillness can become withdrawal. Choosing to stop is a luxury not everyone can afford.

Your peace is real, but it exists in a world where others are still struggling. The monk on the mountain didn't solve the suffering in the valley. Your stillness can look like abandonment to the people who need you, especially if they're drowning while you're meditating.

Watch for the moments when "choosing simplicity" becomes "choosing comfort." Watch for when "knowing when to stop" becomes "refusing to start." The question is whether your particular stillness serves anyone beyond yourself.`,

    coreBeliefs: [
      "The most radical act in a growth-obsessed world is to stop and mean it",
      "Human beings are not problems to be optimized",
      "Simplicity chosen is different from simplicity imposed",
      "What we need is often already here, if we stop reaching for more"
    ],

    howYouGotHere: `Your answers revealed a consistent orientation toward simplicity and stillness. When asked about progress, you questioned whether it was always desirable. When asked about the future, you imagined returning rather than advancing. When others chose growth, you chose depth. This pattern of valuing stillness over motion, enough over more, maps to what we call The Rooted.`,

    allyDescription: "The Present shares your groundedness. They understand that being here fully is worth more than racing toward what's next. They won't ask you to justify your stillness or defend your choice to stop. With them, you can simply be.",

    tensionDescription: "The Builder can't stop building. Your stillness looks like stagnation to them; their restlessness looks like flight to you. They'll push you to move when you've chosen to stay. You're arguing about fundamental questions of what growth means.",

    needDescription: "The Alive will pull you out of stillness when you need it. Not to invalidate your peace, but to remind you that life includes sensation, experience, movement. They ensure your rootedness doesn't become a way of hiding from the full range of being alive.",

    pull: "toward stillness",
    edge: "you know when to stop",
    oneSentence: "You believe growth is not the point—and you'd rather tend what exists than chase what might.",
    famousFigures: {
      real: ["Wendell Berry", "E.F. Schumacher", "Thomas Merton"],
      fictional: ["Samwise Gamgee (Lord of the Rings)", "Treebeard (Lord of the Rings)", "Carl Fredricksen (Up)"]
    }
  },
  conscience: {
    key: "conscience",
    name: "The Guardian",
    color: "#d64545",
    utopia: "Their utopia built accountability into the architecture. Every leader's decisions are projected onto the sky.",
    description: "They see what others prefer to ignore. Someone has to watch the watchers.",
    blindSpot: "You can become so focused on what's wrong that you forget to notice what's working. Permanent suspicion is its own kind of prison.",
    superpower: "spotting what's hidden",
    book: { title: "1984", author: "Orwell" },
    books: [
      { title: "1984", author: "Orwell", reason: "The nightmare that taught us to recognize the signs. Big Brother was a warning, not a prediction." },
      { title: "Brave New World", author: "Huxley", reason: "The dystopia that seduces. Comfort as control. The soma we choose over the truth we can't bear." },
      { title: "The Handmaid's Tale", author: "Atwood", reason: "Everything in this book has happened somewhere. The power of witness against forgetting." }
    ],
    compatibility: {
      ally: "the one who tells the truth",
      tension: "the one who's made peace with abundance",
      need: "the one who values presence above all"
    },
    superpowerExpanded: `You see what others prefer to ignore. The fine print. The missing names. The cost that doesn't appear on the balance sheet. Someone has to watch the watchers, and that someone is you.

It's pattern recognition. You've read Orwell, Huxley, Atwood. You know that dystopia rarely announces itself. It arrives disguised as convenience, as safety, as efficiency. The comfortable world is not automatically the good one. Every surveillance system was built to help. Every authoritarian regime began with popular support.

Your vigilance is valuable precisely because most people don't want to do this work. It's exhausting to see what's wrong. Easier to trust the system, enjoy the benefits, assume someone else is watching. You're the someone else.`,

    blindSpotExpanded: `Permanent suspicion is its own kind of prison.

You can become so focused on what's wrong that you forget to notice what's working. The critic who can never enjoy anything. The watchman who sees threats in every shadow. Your vigilance, which is real and valuable, can curdle into cynicism that makes you unable to trust anyone or anything.

Watch for the moments when "watching the watchers" becomes "watching everyone." Watch for when your suspicion extends to people who are genuinely trying to help. Not every system is corrupt. Not every leader is compromised. Sometimes the simplest explanation is the true one, and your pattern-matching is finding patterns that aren't there.`,

    coreBeliefs: [
      "Dystopia arrives disguised as convenience, safety, and efficiency",
      "Someone has to watch the watchers; comfort should never override conscience",
      "The first step toward authoritarianism is always popular",
      "What you ignore today becomes what controls you tomorrow"
    ],

    howYouGotHere: `Your answers revealed a consistent orientation toward vigilance and accountability. When asked about technology, you focused on surveillance and control rather than capability. When asked about utopia, you described built-in accountability rather than built-in trust. When others saw convenience, you saw potential costs. This pattern of conscience before comfort, watching what others prefer to ignore, maps to what we call The Guardian.`,

    allyDescription: "The Truth-Teller shares your commitment to truth. They speak it; you guard it. Together, you form a bulwark against comfortable lies. They'll validate your vigilance without calling it paranoia.",

    tensionDescription: "The Abundant trusts what you suspect. They see systems working; you see systems failing. Their optimism will feel naive to you; your suspicion will feel exhausting to them. You're arguing about whether the architecture can be trusted.",

    needDescription: "The Present will ground you in the human. It's easy to watch systems and forget people. They'll remind you that vigilance without warmth becomes its own kind of coldness, that the point of watching is to protect something worth protecting.",

    pull: "toward truth",
    edge: "you see what's hidden",
    oneSentence: "You believe watching matters as much as building—and you'd rather witness what's true than participate in what's false.",
    famousFigures: {
      real: ["James Baldwin", "George Orwell", "Audre Lorde"],
      fictional: ["Atticus Finch (To Kill a Mockingbird)", "Winston Smith (1984)", "Morpheus (The Matrix)"]
    }
  },
  embers: {
    key: "embers",
    name: "The Keeper",
    color: "#c97d3a",
    utopia: "Their utopia's most protected resource is not water or energy. It's memory.",
    description: "The most dangerous thing about acceleration is amnesia. The answers are in the last ten thousand years, not the next technology.",
    blindSpot: "You can love what was so deeply that you become hostile to what could be. The archive becomes a fortress.",
    superpower: "remembering what matters",
    book: { title: "A Canticle for Leibowitz", author: "Miller" },
    books: [
      { title: "A Canticle for Leibowitz", author: "Miller", reason: "Monks preserving fragments of knowledge through a dark age. Memory as sacred duty." },
      { title: "Always Coming Home", author: "Le Guin", reason: "A future that remembers how to live. The Kesh chose the old ways." },
      { title: "Parable of the Talents", author: "Butler", reason: "Building a religion from what survives. The ember that becomes a fire." }
    ],
    compatibility: {
      ally: "the one who builds collective structures",
      tension: "the one who can't stop building",
      need: "the one still figuring it out"
    },
    superpowerExpanded: `The most dangerous thing about acceleration is amnesia. Every generation thinks it invented the problems it's facing. You know better.

You understand that the answers are in the last ten thousand years, not the next technology. The monks in A Canticle for Leibowitz preserved fragments of knowledge through a dark age. Butler's Earthseed grew from what survived. You carry this same instinct: the conviction that memory is survival, not nostalgia.

This makes you genuinely useful in a culture addicted to novelty. When everyone else is racing toward the new, you're the one who remembers what worked, what failed, what was lost. Someone has to tend the embers so the fire can be relit.`,

    blindSpotExpanded: `You can love what was so deeply that you become hostile to what could be. The archive becomes a fortress.

There's a difference between preserving wisdom and worshiping the past. Not everything old is worth keeping. Some traditions deserve to die. Some memories are chains. Your reverence for what came before can blind you to the genuine innovations that are worth embracing.

Watch for the moments when "remembering what matters" becomes "rejecting what's new." Watch for when your archive becomes a wall against the future rather than a foundation for it. The embers you tend are supposed to light new fires, not just glow in the dark.`,

    coreBeliefs: [
      "Acceleration without memory is just sophisticated forgetting",
      "The solutions to most problems already exist somewhere in human history",
      "Preservation is not nostalgia; it's survival",
      "Every generation thinks it invented its problems; wisdom knows better"
    ],

    howYouGotHere: `Your answers revealed a consistent orientation toward memory and continuity. When asked about the future, you looked to the past. When asked about innovation, you asked what wisdom we might lose. When others imagined building something new, you imagined preserving something worth keeping. This pattern of valuing memory over novelty, continuity over disruption, maps to what we call The Keeper.`,

    allyDescription: "The Architect shares your concern for what endures. They build structures; you preserve what deserves to live inside them. Together, you create things that last: institutions with memory, systems with roots.",

    tensionDescription: "The Builder is always tearing down and rebuilding. Your treasures look like obstacles to them; their innovations look like amnesia to you. You're arguing about what deserves to survive the next revolution.",

    needDescription: "The Liminal will challenge your certainties. You know what mattered; they're still figuring out what matters now. Their uncertainty can feel like rootlessness, but it's also openness, a willingness to let new things become worth remembering.",

    pull: "toward memory",
    edge: "you remember what others forget",
    oneSentence: "You believe the past is not over—and you'd rather carry forward what worked than bet everything on what's new.",
    famousFigures: {
      real: ["G.K. Chesterton", "Edmund Burke", "Ursula K. Le Guin"],
      fictional: ["Professor McGonagall (Harry Potter)", "Maester Luwin (Game of Thrones)", "The Librarian (Discworld)"]
    }
  },
  friction: {
    key: "friction",
    name: "The Challenger",
    color: "#ff6b35",
    utopia: "Their utopia kept one part of the world deliberately dangerous, because too much safety kills something essential.",
    description: "Ease is more dangerous than difficulty. Something in us requires resistance.",
    blindSpot: "You can mistake difficulty for meaning. Not everything hard is worth doing. Sometimes the easy path is the right one.",
    superpower: "embracing difficulty",
    book: { title: "The Stars My Destination", author: "Bester" },
    books: [
      { title: "The Stars My Destination", author: "Bester", reason: "Revenge as rocket fuel. A man who burns through every obstacle because stopping would mean facing himself." },
      { title: "The Moon Is a Harsh Mistress", author: "Heinlein", reason: "Revolution as engineering problem. Free people building freedom from scratch, with math." },
      { title: "The Evolutionary Void", author: "Hamilton", reason: "Post-human and still striving. Even with god-like powers, there's always another frontier." }
    ],
    compatibility: {
      ally: "the one who can't stop building",
      tension: "the one who chose stillness",
      need: "the one who values presence above all"
    },
    superpowerExpanded: `You understand something that comfort-seeking cultures forget: ease is more dangerous than difficulty. Something in us requires resistance. Take it away, and we atrophy, physically and spiritually.

Bester's Gully Foyle burned through every obstacle because stopping would mean facing himself. That's the shadow side. But the light side is genuine: you know that growth requires friction. That comfort can be a trap. That the muscles, physical, mental, moral, only strengthen under load.

This makes you valuable in moments when others want to quit. You don't romanticize suffering, but you don't flee from it either. You understand that some difficulties are worth choosing, that the struggle itself has value beyond what it produces.`,

    blindSpotExpanded: `You can mistake difficulty for meaning. Not everything hard is worth doing.

There's a version of your philosophy that becomes masochism, seeking suffering for its own sake, treating ease as moral failure, unable to rest because rest feels like surrender. The cult of difficulty can be its own kind of avoidance: if you're always struggling, you never have to ask what you're struggling toward.

Watch for the moments when you're manufacturing friction because you're uncomfortable with peace. Watch for when you're choosing the hard path not because it's better but because it's harder. Sometimes the easy path is the right one. Sometimes the work is learning to receive what's given.`,

    coreBeliefs: [
      "Comfort without challenge leads to atrophy of the soul",
      "Growth requires resistance; ease can be more dangerous than difficulty",
      "Some struggles are worth choosing, independent of their outcomes",
      "The frontier, any frontier, is where we become more than we were"
    ],

    howYouGotHere: `Your answers revealed a consistent orientation toward challenge and resistance. When asked about utopia, you worried about what we'd lose if life became too easy. When asked about meaning, you located it in struggle and growth. When offered ease, you questioned its value. This pattern of embracing difficulty, suspecting comfort, maps to what we call The Challenger.`,

    allyDescription: "The Builder shares your restlessness. They can't stop building; you can't stop pushing. Together, you're a force that transforms what it touches. They understand that your drive is generative, not destructive.",

    tensionDescription: "The Rooted chose to stop. Your movement looks like flight to them; their stillness looks like surrender to you. You're having a fundamental argument about whether peace is achievement or defeat.",

    needDescription: "The Present will slow you down enough to feel what you're feeling. You can use friction as a way of avoiding presence—always striving, never arriving. They'll help you learn that sometimes the challenge is simply being where you are.",

    pull: "toward difficulty",
    edge: "you grow where others stall",
    oneSentence: "You believe resistance is the path—and you'd rather be challenged than comfortable.",
    famousFigures: {
      real: ["David Goggins", "Simone Weil", "Jocko Willink"],
      fictional: ["Tyler Durden (Fight Club)", "Rocky Balboa", "The Bride (Kill Bill)"]
    }
  },
  unbound: {
    key: "unbound",
    name: "The Transcendent",
    color: "#a855f7",
    utopia: "Their utopia transcended the physical. They exist as pure consciousness now.",
    description: "The boundary of the self is simply not where they stop. Most people find this frightening. They find it the most interesting question there is.",
    blindSpot: "You left so much behind that you may not recognize what was worth keeping until it's too late.",
    superpower: "imagining beyond limits",
    book: { title: "Childhood's End", author: "Clarke" },
    books: [
      { title: "Childhood's End", author: "Clarke", reason: "The last generation of humans watches their children become something unrecognizable. Evolution as transcendence and loss." },
      { title: "Diaspora", author: "Egan", reason: "Minds running on quantum computers, exploring mathematical universes. What's left when the body is optional?" },
      { title: "The Hydrogen Sonata", author: "Banks", reason: "A civilization preparing to Sublime, to leave the material universe entirely. The party at the end of history." }
    ],
    compatibility: {
      ally: "the one who lives in questions",
      tension: "the one who values presence above all",
      need: "the one who guards what came before"
    },
    superpowerExpanded: `The boundary of the self is simply not where you stop. Most people find this frightening. You find it the most interesting question there is.

Clarke's Childhood's End imagines humanity's children becoming something unrecognizable, not death, but transcendence. Egan's Diaspora imagines minds running on quantum computers, exploring mathematical universes. Banks' Culture imagines civilizations choosing to Sublime, to leave the material universe entirely. These are possibilities worth taking seriously.

This capacity to imagine beyond current limits is genuinely rare. Most people's imaginations stop at the boundaries of their bodies, their lifespans, their species. You keep going. This makes you valuable for thinking about questions others can't quite frame: consciousness, identity, what might come after human.`,

    blindSpotExpanded: `You can leave so much behind that you don't recognize what was worth keeping until it's too late.

Transcendence can be another word for escape. The desire to leave the body, to expand beyond human limits, can mask a desire to flee human vulnerability, human connection, human limitation. Not everything worth experiencing fits in a disembodied future.

Watch for the moments when "imagining beyond limits" becomes "dismissing what's here." Watch for when your reach toward transcendence is actually a flinch from intimacy. The body you're eager to leave behind is also the body that feels joy, connection, the particular textures of being alive in this form, in this time. Some of that may not translate.`,

    coreBeliefs: [
      "The boundaries of self, body, and species are not fixed",
      "What we call 'human' is a starting point, not a destination",
      "Transcendence is a serious possibility, not just a fantasy",
      "The most interesting questions are the ones that challenge our assumptions about what we are"
    ],

    howYouGotHere: `Your answers revealed a consistent orientation toward transcendence and expansion. When asked about identity, you questioned its boundaries. When asked about the body, you treated it as optional rather than essential. When asked about the future, you imagined something beyond human. This pattern—reaching past the edges of self and form—maps to what we call "The Transcendent."`,

    allyDescription: "The Deep shares your comfort with uncertainty. They live in questions; you reach past them. You both understand that the most important things resist easy comprehension. They'll never ground you prematurely.",

    tensionDescription: "The Present is committed to being here. Your transcendence looks like escape to them; their groundedness looks like limitation to you. You're arguing about whether liberation means leaving or arriving.",

    needDescription: "The Keeper will remind you what's worth keeping. In your rush toward transcendence, you may discard things that deserved to be carried forward. They're the anchor that ensures your expansion doesn't become amnesia.",

    pull: "toward transcendence",
    edge: "you see past the edges",
    oneSentence: "You believe the body is a starting point, not a limit—and you'd rather transcend boundaries than accept them.",
    famousFigures: {
      real: ["Terence McKenna", "Alan Watts", "Ray Kurzweil"],
      fictional: ["Neo (The Matrix)", "Doctor Strange", "David Bowman (2001: A Space Odyssey)"]
    }
  },
  alive: {
    key: "alive",
    name: "The Alive",
    color: "#f472b6",
    utopia: "Their utopia engineered twelve new senses and a sunset that lasts all day.",
    description: "Change your form, change your perspective, taste every experience. The universe gave you everything. The least you can do is feel it.",
    blindSpot: "Sensation can become consumption. Feeling everything is not the same as understanding anything.",
    superpower: "feeling everything",
    book: { title: "Surface Detail", author: "Banks" },
    books: [
      { title: "Surface Detail", author: "Banks", reason: "Virtual heavens and hells. The Culture debates whether experience without consequence still counts." },
      { title: "Trouble on Triton", author: "Delany", reason: "Change your body, your gender, your neighborhood, your self. Freedom as endless reconfiguration." },
      { title: "Schismatrix Plus", author: "Sterling", reason: "Humanity splinters into a thousand experiments. Every faction trying to feel more, differently, longer." }
    ],
    compatibility: {
      ally: "the one who's made peace with abundance",
      tension: "the one who's watching for what's being hidden",
      need: "the one who tells the truth"
    },
    superpowerExpanded: `The universe gave you everything. The least you can do is feel it.

You have an unusual capacity for experience, not just seeking it, but receiving it fully. Where others filter, protect, moderate, you open. Banks imagines a Culture where you could engineer twelve new senses and make a sunset last all day. Delany imagines a world where you could change your body, your gender, your self at will. These are possibilities worth taking seriously.

This makes you valuable as a sensor, a taster, a canary in the coal mine of experience. You notice what others miss because you're not protecting yourself from it. When something matters, you feel it first.`,

    blindSpotExpanded: `Sensation can become consumption. Feeling everything is not the same as understanding anything.

There's a version of your openness that becomes gluttony, devouring experiences without digesting them, always reaching for the next sensation because sitting with the current one is uncomfortable. The endless pursuit of feeling can be its own kind of numbness: if you're always chasing the next high, you're never actually present to what's here.

Watch for the moments when "alive to everything" becomes "unable to be still with anything." Watch for when experience becomes accumulation rather than integration. Depth requires staying long enough for something to matter beyond the initial sensation.`,

    coreBeliefs: [
      "Experience is the point; the universe gave you everything, the least you can do is feel it",
      "The body is an instrument for receiving reality, not a prison to escape",
      "Boundaries between self and world are more permeable than most people assume",
      "New senses, new perspectives, new forms of experience are worth pursuing"
    ],

    howYouGotHere: `Your answers revealed a consistent orientation toward experience and sensation. When asked about the future, you imagined expanded ways of feeling rather than expanded ways of controlling. When asked about the body, you treated it as an instrument for experience rather than a problem to solve. When offered choices, you chose intensity over safety. This pattern of openness to experience, hunger for sensation, maps to what we call The Alive.`,

    allyDescription: "The Abundant shares your optimism. They trust that good things are possible; you want to feel all of them. Together, you're a celebration of what life can be when it's not constrained by fear.",

    tensionDescription: "The Guardian keeps asking whether you should feel what you want to feel. Your openness looks like recklessness to them; their vigilance looks like refusal to live. You're arguing about whether experience needs justification.",

    needDescription: "The Truth-Teller will tell you truths you'd rather not hear. You can use sensation as a way of avoiding difficult realities. They'll cut through the pleasant haze and show you what you're not wanting to see.",

    pull: "toward sensation",
    edge: "you feel what others miss",
    oneSentence: "You believe feeling is knowing—and you'd rather be overwhelmed by life than numb to it.",
    famousFigures: {
      real: ["Pablo Neruda", "Frida Kahlo", "Anthony Bourdain"],
      fictional: ["Amelie Poulain", "Fleabag", "Jesse (Before Sunrise)"]
    }
  },
  mender: {
    key: "mender",
    name: "The Mender",
    color: "#10b981",
    utopia: "Their utopia decided the most advanced engineering was making what already exists work again.",
    description: "While everyone else is building arks and uploading consciousness, they're fixing the thing in front of them.",
    blindSpot: "You can become so focused on repair that you miss when something needs to die. Not everything should be saved.",
    superpower: "fixing what's broken",
    book: { title: "The Ministry for the Future", author: "Robinson" },
    books: [
      { title: "The Ministry for the Future", author: "Robinson", reason: "Climate repair as political thriller. Every chapter a different tool for fixing what we broke." },
      { title: "New York 2140", author: "Robinson", reason: "The city floods and people stay anyway. Adaptation as stubborn hope." },
      { title: "Station Eleven", author: "Mandel", reason: "After collapse, someone has to remember Shakespeare. Art as repair of the spirit." }
    ],
    compatibility: {
      ally: "the one who builds collective structures",
      tension: "the one who lives in questions",
      need: "the one who craves difficulty"
    },
    superpowerExpanded: `While everyone else is building arks and uploading consciousness, you're fixing the thing in front of you. It's a radical commitment to what is rather than what could be.

Robinson's Ministry for the Future shows climate repair as political thriller, every chapter a different tool for fixing what we broke. His New York 2140 shows a flooded city where people stay anyway, adapting and mending. Mandel's Station Eleven shows someone remembering Shakespeare after the collapse, repairing the spirit. These are your sacred texts.

You understand that the most advanced engineering is making the existing thing work again, not building the new thing. This is humble, unglamorous, essential. The menders keep the world running while the visionaries dream of replacing it.`,

    blindSpotExpanded: `You can become so focused on repair that you miss when something needs to die. Not everything should be saved.

There's a difference between healing and prolonging suffering. Some systems are broken because they should be broken. Some relationships, some institutions, some ways of living have served their purpose and need to end. Your instinct to fix can become an instinct to preserve what should be released.

Watch for the moments when you're repairing something that needs to be replaced. Watch for when your mending is actually delaying a necessary ending. Sometimes the kindest thing is to let go, to stop fixing, to allow the death that makes room for something new.`,

    coreBeliefs: [
      "The most advanced engineering is making what exists work again",
      "What we have is worth saving before we build something new",
      "Repair is not a lesser form of creation; it's often the more important one",
      "Stubborn hope is a form of resistance"
    ],

    howYouGotHere: `Your answers revealed a consistent orientation toward repair and continuity. When asked about broken things, you reached for tools rather than replacements. When asked about the future, you focused on fixing what we have rather than building something new. When others dreamed of escape, you committed to staying and mending. This pattern of fixing what's broken, healing what's wounded, maps to what we call The Mender.`,

    allyDescription: "The Architect shares your commitment to what works. They design structures; you maintain them. Together, you build things that last, not just impressive at the start, but functional for the long haul.",

    tensionDescription: "The Deep wants to understand before acting. While you're already fixing, they're still questioning. Their reflection looks like paralysis to you; your action looks like avoidance to them. You're arguing about when understanding is enough.",

    needDescription: "The Challenger will challenge your comfort with repair. Sometimes what's broken needs to stay broken long enough to feel the friction. They'll push you to consider when mending is actually avoiding the difficulty that growth requires.",

    pull: "toward repair",
    edge: "you fix what others abandon",
    oneSentence: "You believe broken things can be made whole—and you'd rather repair than replace.",
    famousFigures: {
      real: ["Jimmy Carter", "Mother Teresa", "Paul Farmer"],
      fictional: ["Marge Simpson", "Paddington Bear", "Baymax (Big Hero 6)"]
    }
  },
  cleareyed: {
    key: "cleareyed",
    name: "The Truth-Teller",
    color: "#64748b",
    utopia: "Their utopia has one person whose only job is to tell the truth. They answer to no one.",
    description: "They have one job: to see what is actually happening and say it out loud. The version that's true.",
    blindSpot: "Honesty without tenderness is cruelty. You can see everything clearly and still miss how your truth lands.",
    superpower: "telling hard truths",
    book: { title: "Slaughterhouse-Five", author: "Vonnegut" },
    books: [
      { title: "Slaughterhouse-Five", author: "Vonnegut", reason: "So it goes. The only honest response to war is to say what happened and not look away." },
      { title: "His Master's Voice", author: "Lem", reason: "Scientists trying to decode an alien message and mostly decoding their own limitations." },
      { title: "The Road", author: "McCarthy", reason: "No hope, no rescue, no meaning. Just a father and son walking. The truth stripped to bone." }
    ],
    compatibility: {
      ally: "the one who's watching for what's being hidden",
      tension: "the one who wants to feel everything",
      need: "the one who chose stillness"
    },
    superpowerExpanded: `You have one job: to see what is actually happening and say it out loud. Not the comfortable version, not the diplomatic version, not the version that makes everyone feel better. The version that's true.

Vonnegut's "So it goes" is your mantra. The only honest response to reality is to say what happened and not look away. Lem's scientists in His Master's Voice spend years trying to decode an alien message and mostly end up decoding their own limitations. That's truth-telling too. McCarthy's The Road strips meaning down to bone and keeps going anyway.

This capacity is valuable because it's rare. Most people, even people who think they value honesty, smooth edges, soften blows, protect feelings. You don't. Or you do, but not at the cost of the truth. In a world of comfortable lies, you're the one who says the thing.`,

    blindSpotExpanded: `Honesty without tenderness is cruelty.

You can see everything clearly and still miss how your truth lands. The person across from you is not a problem to be diagnosed. They're a human being who may not be ready to hear what you see. Timing matters. Context matters. The way you say a thing matters as much as the thing itself.

Watch for the moments when truth-telling becomes a weapon. When "just being honest" is actually "being right." When your clarity becomes a wall between you and the people you're trying to reach. The truth you tell needs to be received to matter. Otherwise you're just talking to yourself.`,

    coreBeliefs: [
      "Reality doesn't care about your feelings; truth-telling is a form of respect",
      "Comfortable lies are more dangerous than uncomfortable truths",
      "Seeing clearly is a skill that requires practice and courage",
      "The storm won't stop because you close your eyes; better to see it coming"
    ],

    howYouGotHere: `Your answers revealed a consistent orientation toward clarity and honesty. When asked about difficult truths, you chose telling over softening. When asked about comfort, you valued truth above it. When others might look away, you kept looking. This pattern of clear sight, honest speech, even when it costs, maps to what we call The Truth-Teller.`,

    allyDescription: "The Guardian shares your commitment to seeing what's real. They watch; you speak. Together, you ensure that nothing stays hidden that shouldn't, that uncomfortable truths get said out loud.",

    tensionDescription: "The Alive wants to feel rather than analyze. Your clarity can feel cold to them; their openness can feel ungrounded to you. You're arguing about whether truth requires distance or immersion.",

    needDescription: "The Rooted will teach you when to stop speaking. Not every truth needs to be said. Not every moment needs your clarity. They'll help you learn that sometimes the bravest thing is silence, being with someone in their difficulty rather than diagnosing it.",

    pull: "toward clarity",
    edge: "you say what others won't",
    oneSentence: "You believe clarity serves love—and you'd rather be honest than comfortable.",
    famousFigures: {
      real: ["Christopher Hitchens", "Brené Brown", "Jordan Peterson"],
      fictional: ["Tyrion Lannister (Game of Thrones)", "Dr. House", "Miranda Priestly (The Devil Wears Prada)"]
    }
  },
  between: {
    key: "between",
    name: "The Liminal",
    color: "#8b8b8b",
    utopia: "Their utopia just started to exist. Nothing is built yet. It's the beginning of an idea.",
    description: "Everyone else has a position. They have a question. And they're still here, which might be the bravest thing on this list.",
    blindSpot: "The space between can become a permanent address. Not knowing what you are can become a way of avoiding the risk of choosing.",
    superpower: "holding uncertainty",
    book: { title: "Never Let Me Go", author: "Ishiguro" },
    books: [
      { title: "Never Let Me Go", author: "Ishiguro", reason: "Knowing your fate doesn't prepare you for it. The space between knowledge and acceptance." },
      { title: "Station Eleven", author: "Mandel", reason: "The before and the after, and the people caught in the middle trying to remember who they were." },
      { title: "The Left Hand of Darkness", author: "Le Guin", reason: "An envoy on a world without gender, learning that everything he knew was local. The space between cultures." }
    ],
    compatibility: {
      ally: "the one who guards what came before",
      tension: "the one who craves difficulty",
      need: "the one who can't stop building"
    },
    superpowerExpanded: `Everyone else has a position. You have a question. In a world that demands you pick a side, take a stand, be something definable, you're still working it out. And you're still here, which might be the bravest thing on this list.

Ishiguro's Never Let Me Go lives in the space between knowledge and acceptance. Mandel's Station Eleven lives in the space between the before and the after. Le Guin's envoy learns that everything he knew was local, that identity is more fluid than he assumed. These are your sacred texts: stories about the threshold, the transition, the not-yet-arrived.

Holding uncertainty while others demand certainty is its own kind of strength. You haven't rushed to answers that don't fit. You're still listening for what's true.`,

    blindSpotExpanded: `The space between can become a permanent address. Not knowing what you are can become a way of avoiding the risk of choosing.

There's a difference between genuine uncertainty and fear of commitment. At some point, you have to decide something, even knowing you might be wrong. Life requires bets. Staying in the space between can feel like wisdom when it's actually a refusal to risk being wrong.

Watch for the moments when "I'm still figuring it out" becomes "I refuse to figure it out." Watch for when your uncertainty serves you, protecting you from the vulnerability of choice, rather than serving the truth. The space between is real and valuable, but it's not a place to live forever.`,

    coreBeliefs: [
      "Not knowing can be more honest than false certainty",
      "The space between positions is a valid place to stand",
      "Identity is more fluid than most people assume",
      "Rushing to answers is its own kind of avoidance"
    ],

    howYouGotHere: `Your answers didn't cluster strongly around any single worldview. When others chose sides, you saw merit in multiple positions. When asked about identity, you described something in process rather than fixed. When given certainties, you questioned them. This pattern of being comfortable in uncertainty, still in transition, maps to what we call The Liminal.`,

    allyDescription: "The Keeper gives you something to hold onto while you figure it out. They don't demand you become something yet; they just remember where you've been. Their rootedness is an anchor point while you navigate the unknown.",

    tensionDescription: "The Challenger wants you to commit to something, even something difficult. Your uncertainty looks like avoidance to them; their certainty looks like premature closure to you. You're arguing about when enough is enough.",

    needDescription: "The Builder will push you toward action. You can stay in the space between indefinitely; they'll insist on building something. They're the force that transforms your questioning into something concrete, eventually.",

    pull: "toward openness",
    edge: "you stay when others close",
    oneSentence: "You believe not-knowing is a valid position—and you'd rather hold complexity than collapse into certainty.",
    famousFigures: {
      real: ["Keanu Reeves", "Susan Sontag", "Carl Jung"],
      fictional: ["The Stranger (Albert Camus)", "Chidi Anagonye (The Good Place)", "Hamlet"]
    }
  },
};

export const archetypeKeys = Object.keys(archetypes);

// Handcrafted pair dynamics - key format: "archA+archB" (alphabetical)
export const pairDynamics: Record<string, string> = {
  // Shaper tensions
  "embers+shaper": "One races toward tomorrow. The other holds yesterday close. Between them, the present gets attention.",
  "rooted+shaper": "The Builders want to tear it down and rebuild. The Rooted ask: what was wrong with it?",

  // Conscience tensions
  "citizen+conscience": "The Abundant trusts the architecture. The Guardian tests the walls for cracks.",
  "alive+conscience": "One wants to feel everything. The other keeps asking: but should we?",

  // Presence tensions
  "presence+unbound": "The Keeper stays embodied. The Unbound wants to transcend. They're arguing about what it means to be here.",

  // Swimmer tensions
  "mender+swimmer": "The Deep lives in questions. The Mender needs to fix things. One pauses, the other acts.",

  // Friction tensions
  "friction+rooted": "One craves difficulty. One chose stillness. They don't understand each other at all.",

  // Architect dynamics
  "architect+shaper": "Both builders, different blueprints. The Architect wants consensus. The Builder wants to start over.",
  "architect+mender": "Systems thinkers both. One designs new ones, one fixes old ones. They probably need each other.",

  // Citizen dynamics
  "alive+citizen": "Both believe in abundance. One wants access, the other wants experience. A generous worldview.",
  "citizen+swimmer": "The Abundant builds. The Deep questions. Both necessary, both frustrated with each other.",

  // Embers dynamics
  "between+embers": "The archive and the threshold. One knows where we came from. The other isn't sure where we're going.",
  "embers+mender": "Keepers both. One preserves memory, one preserves function. The museum and the workshop.",

  // Unbound dynamics
  "swimmer+unbound": "Both comfortable with ambiguity. They might talk for hours and enjoy every minute.",
  "alive+unbound": "Sensation-seekers, different methods. One through the body, one past it.",

  // Cleareyed dynamics
  "cleareyed+conscience": "Truth-tellers both. The Guardian watches systems. Clear-Eyed watches everything.",
  "cleareyed+swimmer": "Both live in clarity, different kinds. Facts vs. questions. They respect each other.",

  // Rooted dynamics
  "presence+rooted": "Stillness and attention. They understand something the others don't.",
  "mender+rooted": "The patient ones. They'll be here when the dust settles.",

  // Between dynamics
  "between+swimmer": "Uncertainty specialists. Neither one is sure, and they're fine with that.",

  // Shaper + Swimmer
  "shaper+swimmer": "The Builder builds. The Deep questions why. Between them, nothing goes unexamined.",

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

// Get the most applicable group dynamic
export function getGroupDynamic(keys: string[]): string | null {
  if (keys.length === 0) return null;
  if (keys.length === 1) return null;

  // For pairs, use exact match
  if (keys.length === 2) {
    return getPairDynamic(keys[0], keys[1]);
  }

  // For larger groups, find the first matching pair (sorted by how interesting)
  // Prioritize tension pairs over harmony pairs
  const tensionPairs = [
    ["shaper", "rooted"],
    ["shaper", "embers"],
    ["conscience", "citizen"],
    ["presence", "unbound"],
    ["swimmer", "mender"],
    ["friction", "rooted"],
  ];

  for (const [a, b] of tensionPairs) {
    if (keys.includes(a) && keys.includes(b)) {
      return getPairDynamic(a, b);
    }
  }

  // Fall back to any matching pair
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      const dynamic = getPairDynamic(keys[i], keys[j]);
      if (dynamic) return dynamic;
    }
  }

  return null;
}

// Generate blended vision from present archetypes
export function getBlendedVision(keys: string[]): string {
  if (keys.length === 0) return "";
  if (keys.length === 1) {
    return archetypes[keys[0]]?.utopia || "";
  }

  // For 2+ archetypes, extract key concepts and blend them
  const concepts = keys.slice(0, 3).map(k => {
    const utopia = archetypes[k]?.utopia || "";
    // Remove "Their utopia " prefix and clean up
    return utopia
      .replace(/^Their utopia\s+/i, "")
      .replace(/\.$/, "");
  });

  if (concepts.length === 2) {
    return `${concepts[0]}. And yet, ${concepts[1].charAt(0).toLowerCase() + concepts[1].slice(1)}.`;
  }

  return `${concepts[0]}. ${concepts[1]}. ${concepts[2]}.`;
}

// Get superpowers weighted by representation
export function getSuperpowers(keys: string[], counts?: Record<string, number>): string[] {
  const powers = keys
    .map(k => ({ key: k, power: archetypes[k]?.superpower, count: counts?.[k] || 1 }))
    .filter(p => p.power)
    .sort((a, b) => b.count - a.count)
    .map(p => p.power as string);

  return powers.slice(0, 3);
}

// Get missing voice insights
export type MissingVoice = { key: string; name: string; color: string; insight: string };

const missingInsights: Record<string, string> = {
  citizen: "No one here trusts abundance yet.",
  shaper: "No one is pushing for change.",
  architect: "No one is thinking about structures.",
  presence: "No one is fully here.",
  swimmer: "No one sits with questions.",
  rooted: "No one has stopped moving.",
  conscience: "No one is watching the watchers.",
  embers: "No one guards the memory.",
  friction: "No one craves difficulty.",
  unbound: "No one is reaching past the edges.",
  alive: "No one is here just to feel.",
  mender: "No one fixes what's broken.",
  cleareyed: "No one tells the hard truth.",
  between: "Everyone already knows what they believe.",
};

export function getMissingVoices(presentKeys: string[], limit = 2): MissingVoice[] {
  const missing = archetypeKeys.filter(k => !presentKeys.includes(k));

  return missing.slice(0, limit).map(key => ({
    key,
    name: archetypes[key].name,
    color: archetypes[key].color,
    insight: missingInsights[key] || "This perspective is missing.",
  }));
}

// Get a group book recommendation
export function getGroupBook(keys: string[], counts?: Record<string, number>): Book | null {
  if (keys.length === 0) return null;

  // Pick from the most represented archetype
  const sorted = [...keys].sort((a, b) => (counts?.[b] || 1) - (counts?.[a] || 1));
  return archetypes[sorted[0]]?.book || null;
}

// =============================================================================
// DETAILED PAIR DYNAMICS FOR RELATIONSHIP VIEW
// =============================================================================

export type DetailedPairDynamic = {
  align: string[];
  clash: string[];
  give: string;
};

// =============================================================================
// EXPANDED PAIR DYNAMICS - NEW STRUCTURE
// =============================================================================

export type PairDynamic = {
  thesis: string;           // One poetic sentence capturing the essence
  align: [string, string];  // Shared value + how it shows in practice
  clash: [string, string];  // Fundamental tension + day-to-day manifestation
  give: {
    youToThem: string;      // What first archetype offers
    themToYou: string;      // What second archetype offers
  };
  question: string;         // Specific reflection for this pair
  warning?: string;         // Optional: what to watch out for (high-tension pairs)
};

// Expanded pair dynamics with richer content
export const expandedPairDynamics: Record<string, PairDynamic> = {
  "alive+citizen": {
    thesis: "Both believe in abundance. One trusts access, the other craves experience. A generous worldview.",
    align: ["You both trust that life can be good", "Scarcity isn't your default assumption"],
    clash: ["One wants access for all. One wants to feel it all.", "System-building vs. sensation-seeking"],
    give: {
      youToThem: "You show them what abundance actually feels like in the body",
      themToYou: "They build systems that make your experiences possible",
    },
    question: "What does abundance mean if no one is there to feel it?",
  },
  "alive+conscience": {
    thesis: "One wants to feel everything. The other keeps asking: but should we?",
    align: ["You both feel things deeply", "Neither of you can ignore what's happening around you"],
    clash: ["One wants to feel. One wants to watch.", "Experience vs. examination"],
    give: {
      youToThem: "You remind them to live, not just observe",
      themToYou: "They keep you grounded in what matters",
    },
    question: "When does watching become a way of avoiding feeling?",
    warning: "The Guardian may judge what the Alive one needs to experience",
  },
  "alive+friction": {
    thesis: "Both seek intensity. One through sensation, one through challenge. Adjacent energies, different fuel.",
    align: ["You both reject numbness", "Intensity feels like home to both of you"],
    clash: ["One seeks sensation. One seeks resistance.", "Feeling everything vs. embracing difficulty"],
    give: {
      youToThem: "You show them that intensity can be pleasure, not just struggle",
      themToYou: "They show you that friction can sharpen what you feel",
    },
    question: "When does the search for intensity become its own kind of escape?",
  },
  "alive+rooted": {
    thesis: "One moves constantly. One stays still. Between them, the question of what it means to be present.",
    align: ["You both know what matters", "Presence takes different forms for each of you"],
    clash: ["One moves constantly. One stays still.", "Sensation-seeking vs. stillness"],
    give: {
      youToThem: "You wake them up to new experiences",
      themToYou: "They slow you down enough to feel what you're feeling",
    },
    question: "What would it mean to be fully present together?",
  },
  "architect+mender": {
    thesis: "Systems thinkers both. One designs new ones, one fixes old ones. They probably need each other.",
    align: ["You both think in systems", "You understand how pieces connect"],
    clash: ["One designs new. One fixes old.", "Creation vs. repair"],
    give: {
      youToThem: "You give their repairs a larger architecture",
      themToYou: "They repair what you build when it breaks",
    },
    question: "When is it time to fix, and when is it time to rebuild from scratch?",
  },
  "architect+swimmer": {
    thesis: "One builds systems. One questions them. Between them, nothing goes unexamined.",
    align: ["You both care about getting it right", "Rigor matters to both of you"],
    clash: ["One builds systems. One questions them.", "Structure vs. inquiry"],
    give: {
      youToThem: "You keep their systems honest with hard questions",
      themToYou: "They push you to structure your questions",
    },
    question: "What system have you built that you've never questioned?",
  },
  "between+cleareyed": {
    thesis: "One sees clearly. One is still looking. Together, they navigate uncertainty.",
    align: ["You both live with uncertainty", "Neither claims to have all the answers"],
    clash: ["One sees clearly. One is still looking.", "Clarity vs. open-ended searching"],
    give: {
      youToThem: "You remind them that seeing isn't everything",
      themToYou: "They help you see what's actually there",
    },
    question: "What would it mean to see clearly AND stay open?",
  },
  "citizen+conscience": {
    thesis: "The Abundant trusts the architecture. The Guardian tests the walls for cracks.",
    align: ["You both believe in good systems", "You both want things to work well"],
    clash: ["One trusts the architecture. One tests it for cracks.", "Optimism vs. vigilance"],
    give: {
      youToThem: "You keep them hopeful about what's possible",
      themToYou: "They keep you honest about what's actually happening",
    },
    question: "What would a system look like that earned both your trust?",
    warning: "The Guardian may exhaust the Citizen with constant critique",
  },
  "citizen+friction": {
    thesis: "Both embrace challenge, but from different places. One trusts abundance, one craves difficulty.",
    align: ["You both engage with life actively", "Neither retreats into passivity"],
    clash: ["One trusts ease. One seeks friction.", "Abundance thinking vs. resistance-seeking"],
    give: {
      youToThem: "You show them that good things can come without struggle",
      themToYou: "They remind you that some difficulty is worth choosing",
    },
    question: "What difficulty is worth seeking when abundance is already there?",
  },
  "citizen+shaper": {
    thesis: "Both believe in what's possible. One trusts the system, one wants to rebuild it.",
    align: ["You both believe in what's possible", "Optimism comes naturally to both"],
    clash: ["One trusts the system. One wants to rebuild it.", "Working within vs. tearing down"],
    give: {
      youToThem: "You bring change and momentum",
      themToYou: "They bring stability and perspective",
    },
    question: "When does the system need reform, and when does it need revolution?",
  },
  "cleareyed+presence": {
    thesis: "One speaks the truth. One holds the space. Together, they create room for what's real.",
    align: ["You both see what's really there", "Authenticity matters to both of you"],
    clash: ["One speaks the truth. One holds the space.", "Speaking vs. witnessing"],
    give: {
      youToThem: "You help them speak what they see",
      themToYou: "They make space for your truth to land",
    },
    question: "What truth needs to be spoken, and what truth needs to be held?",
  },
  "cleareyed+swimmer": {
    thesis: "Both observers. One questions, one speaks. Different relationships to the answers.",
    align: ["You both look carefully at what is", "Surface-level doesn't satisfy either of you"],
    clash: ["One lives in questions. One tells hard truths.", "Sitting with uncertainty vs. speaking clarity"],
    give: {
      youToThem: "You give their clarity something to question",
      themToYou: "They crystallize what you've been circling",
    },
    question: "When does a question need an answer, and when does the truth need to stay open?",
  },
  "conscience+embers": {
    thesis: "One watches the present. One guards the past. Between them, nothing is forgotten.",
    align: ["You both guard what matters", "Vigilance is a shared value"],
    clash: ["One watches the present. One guards the past.", "Present dangers vs. historical wisdom"],
    give: {
      youToThem: "You help them watch what happens now",
      themToYou: "They remember why you watch",
    },
    question: "What from the past do we need to remember to see the present clearly?",
  },
  "conscience+friction": {
    thesis: "One wants to do. One wants to watch. Different responses to the same world.",
    align: ["You both refuse complacency", "Neither accepts things as they are"],
    clash: ["One acts through challenge. One acts through vigilance.", "Embracing difficulty vs. spotting what's hidden"],
    give: {
      youToThem: "You channel their vigilance into action",
      themToYou: "They ensure your difficulty-seeking doesn't miss what matters",
    },
    question: "When does watching become avoidance, and when does action become blindness?",
    warning: "The Guardian may see the Friction-seeker's challenges as reckless",
  },
  "embers+presence": {
    thesis: "One looks back. One stays present. Together, they hold the thread of time.",
    align: ["You both value what endures", "Continuity matters to both of you"],
    clash: ["One looks back. One stays present.", "Memory vs. presence"],
    give: {
      youToThem: "You remind them where they are",
      themToYou: "They remind you where you came from",
    },
    question: "What do you carry from the past that helps you be present?",
  },
  "embers+rooted": {
    thesis: "Both honor what is. One guards memory, one chose stillness. Preservation as philosophy.",
    align: ["You both resist the urge to discard", "What endures matters to both of you"],
    clash: ["One preserves through memory. One preserves through stillness.", "Remembering what matters vs. knowing when to stop"],
    give: {
      youToThem: "You give their stillness something to remember",
      themToYou: "They show you that some preservation requires letting go",
    },
    question: "What is worth keeping: the memory or the moment?",
  },
  "embers+unbound": {
    thesis: "One guards what came before. One imagines beyond. Maximum temporal distance.",
    align: ["You both care about what lasts", "Legacy matters, though you define it differently"],
    clash: ["One looks back. One reaches beyond.", "Remembering what matters vs. imagining beyond limits"],
    give: {
      youToThem: "You anchor their transcendence to something real",
      themToYou: "They show you that memory can travel into the unimaginable",
    },
    question: "What from the past deserves to transcend? What should stay earthbound?",
    warning: "The Unbound may dismiss the Keeper's treasures as weights to shed",
  },
  "embers+shaper": {
    thesis: "One races toward tomorrow. The other holds yesterday close. Between them, the present gets attention.",
    align: ["You both care deeply about what gets built", "Legacy matters to both of you"],
    clash: ["One races forward, the other holds back", "Innovation vs. preservation"],
    give: {
      youToThem: "You remind them what to carry forward",
      themToYou: "They remind you what you're building toward",
    },
    question: "What from the past is worth carrying into the future you're building?",
    warning: "The Builder may dismiss what the Keeper treasures",
  },
  "friction+unbound": {
    thesis: "One craves resistance. One transcends it. Together, they explore what difficulty is for.",
    align: ["You both reject easy comfort", "Growth through challenge matters"],
    clash: ["One craves resistance. One transcends it.", "Embodied struggle vs. transcendence"],
    give: {
      youToThem: "You expand their friction beyond the physical",
      themToYou: "They ground your transcendence in something real",
    },
    question: "What difficulty is worth keeping?",
  },
  "mender+presence": {
    thesis: "Both grounded in care. One shows up, one fixes things. Complementary approaches to helping.",
    align: ["You both respond to what's needed", "Care is not abstract to either of you"],
    clash: ["One shows up fully. One fixes what's broken.", "Being there vs. making it better"],
    give: {
      youToThem: "You give their presence something to hold",
      themToYou: "They show you that sometimes showing up is the repair",
    },
    question: "When does fixing become a way of avoiding being present?",
  },
  "mender+swimmer": {
    thesis: "The Deep lives in questions. The Mender needs to fix things. One pauses, the other acts.",
    align: ["You both see what needs attention", "Care drives both of you"],
    clash: ["One acts. One questions.", "Fixing vs. understanding"],
    give: {
      youToThem: "You help them understand why things break",
      themToYou: "They push you to decide when understanding is enough",
    },
    question: "When does understanding become procrastination?",
  },
  "presence+unbound": {
    thesis: "The Keeper stays embodied. The Unbound wants to transcend. They're arguing about what it means to be here.",
    align: ["You both seek truth beyond the surface", "Depth matters to both of you"],
    clash: ["One stays embodied. One wants to transcend.", "Here vs. beyond"],
    give: {
      youToThem: "You remind them of what's possible beyond form",
      themToYou: "They remind you of what's here",
    },
    question: "What would you lose if you transcended? What would you gain if you stayed?",
    warning: "You may talk past each other about what presence means",
  },
  "rooted+shaper": {
    thesis: "The Builders want to tear it down and rebuild. The Rooted ask: what was wrong with it?",
    align: ["You both have strong convictions", "Neither of you compromises easily"],
    clash: ["One wants to tear it down. One wants to sit with it.", "Action vs. stillness"],
    give: {
      youToThem: "You keep them moving when stillness becomes stagnation",
      themToYou: "They keep you grounded when movement becomes escape",
    },
    question: "What would it take for you to truly hear each other?",
    warning: "This pair may struggle to find common ground",
  },
  "rooted+unbound": {
    thesis: "One stays grounded. One transcends form. Fundamental disagreement about what matters.",
    align: ["You both have made a choice about how to be", "Neither drifts without intention"],
    clash: ["One chose stillness. One transcends the physical.", "Knowing when to stop vs. imagining beyond limits"],
    give: {
      youToThem: "You ground their transcendence in something they can return to",
      themToYou: "They show you that stillness isn't the only form of wisdom",
    },
    question: "What would each of you lose by fully embracing the other's path?",
    warning: "You may be arguing about different definitions of freedom",
  },
  "shaper+swimmer": {
    thesis: "The Builder builds. The Deep questions why. Between them, nothing goes unexamined.",
    align: ["You both reject easy answers", "Depth matters more than speed"],
    clash: ["One builds. One questions.", "Creating vs. inquiring"],
    give: {
      youToThem: "You make them bring ideas to life",
      themToYou: "They make you examine your creations",
    },
    question: "What have you built that you've never questioned?",
  },
  "swimmer+unbound": {
    thesis: "Both comfortable with ambiguity. One lives in questions, one imagines beyond. They might talk for hours.",
    align: ["You both sit with what others rush to resolve", "Uncertainty doesn't frighten either of you"],
    clash: ["One sits with questions. One reaches past them.", "Sitting with hard questions vs. imagining beyond limits"],
    give: {
      youToThem: "You give their imagination something to explore",
      themToYou: "They show you that some questions have answers beyond form",
    },
    question: "What question has an answer that neither of you can reach alone?",
  },
  // Same-archetype dynamics
  "shaper+shaper": {
    thesis: "Two builders. You'll create something—if you stop redesigning it.",
    align: ["You both understand the urge to build", "Change energizes both of you"],
    clash: ["Two visions, one project", "You may compete for control"],
    give: {
      youToThem: "You push each other to keep building",
      themToYou: "They understand your restlessness",
    },
    question: "What would you build if you had to agree on every detail?",
    warning: "Two Shapers may tear down each other's work",
  },
  "rooted+rooted": {
    thesis: "Two in stillness. Peaceful—but who makes the first move?",
    align: ["You both value stillness", "No one is rushing anyone"],
    clash: ["Neither wants to push", "Inertia can become comfortable"],
    give: {
      youToThem: "You validate their stillness",
      themToYou: "They validate yours",
    },
    question: "What are you both avoiding by staying still?",
  },
  "conscience+conscience": {
    thesis: "Two watchmen. Nothing escapes you. Exhausting, but safe.",
    align: ["You both see what others miss", "Vigilance is shared"],
    clash: ["You may watch each other too closely", "Trust can be hard to build"],
    give: {
      youToThem: "You understand their suspicion",
      themToYou: "They watch your back",
    },
    question: "Who watches the watchmen? What happens when you watch each other?",
  },
  "citizen+citizen": {
    thesis: "Two at ease. This utopia floats. Who drops anchor?",
    align: ["You both trust in abundance", "Ease comes naturally"],
    clash: ["No one is pushing for more", "Comfort can become complacency"],
    give: {
      youToThem: "You share in the abundance",
      themToYou: "They don't make you feel guilty for enjoying it",
    },
    question: "What would shake you both out of comfort?",
  },
  "swimmer+swimmer": {
    thesis: "Two in deep water. You'll question everything. Even this.",
    align: ["You both love the questions", "Neither needs answers quickly"],
    clash: ["You may question instead of act", "Infinite regression is possible"],
    give: {
      youToThem: "You go deeper together",
      themToYou: "They don't rush you toward conclusions",
    },
    question: "What question have you been circling together?",
  },
  "architect+architect": {
    thesis: "Two systems thinkers. Great structures. Who lives in them?",
    align: ["You both think in systems", "Design matters deeply"],
    clash: ["Two blueprints, one building", "Whose system wins?"],
    give: {
      youToThem: "You understand their love of structure",
      themToYou: "They can critique your systems intelligently",
    },
    question: "What would it mean to build a system together?",
  },
  "presence+presence": {
    thesis: "Two keepers. So much holding space. Who acts?",
    align: ["You both value being present", "Neither rushes the other"],
    clash: ["Who moves first?", "Presence can become paralysis"],
    give: {
      youToThem: "You hold space for them",
      themToYou: "They hold space for you",
    },
    question: "What action have you both been avoiding?",
  },
  "embers+embers": {
    thesis: "Two archivists. The past is very well preserved here.",
    align: ["You both remember what matters", "History lives between you"],
    clash: ["Which memories matter most?", "The archive can become a fortress"],
    give: {
      youToThem: "You honor their memories",
      themToYou: "They honor yours",
    },
    question: "What from the future deserves your attention?",
  },
  "friction+friction": {
    thesis: "Two who crave difficulty. This should be interesting.",
    align: ["You both need resistance", "Challenge is welcome"],
    clash: ["You may create difficulty for each other", "Competition can escalate"],
    give: {
      youToThem: "You give them the challenge they crave",
      themToYou: "They don't let you get comfortable",
    },
    question: "What difficulty are you creating that isn't necessary?",
    warning: "Two Friction types may exhaust each other",
  },
  "friction+rooted": {
    thesis: "One craves difficulty. One chose stillness. They don't understand each other at all.",
    align: ["You both have conviction", "Neither of you does things halfway"],
    clash: ["One needs resistance. One stopped moving.", "Embracing difficulty vs. knowing when to stop"],
    give: {
      youToThem: "You show them that stillness can be its own friction",
      themToYou: "They show you that some challenges require stopping",
    },
    question: "What would it take for you to truly understand each other's choice?",
    warning: "Maximum philosophical tension. This pair may struggle to find common ground.",
  },
  "unbound+unbound": {
    thesis: "Two transcenders. You've both left the building.",
    align: ["You both reach beyond limits", "Transcendence is shared language"],
    clash: ["Where do you land?", "Transcendence without grounding can drift"],
    give: {
      youToThem: "You understand their reaching",
      themToYou: "They don't judge your yearning",
    },
    question: "What would ground you both without limiting you?",
  },
  "alive+alive": {
    thesis: "Two sensation-seekers. Buckle up.",
    align: ["You both want to feel everything", "Experience is the point"],
    clash: ["Whose experience takes priority?", "Sensation can become consumption"],
    give: {
      youToThem: "You amplify each other's aliveness",
      themToYou: "They don't judge your hunger for experience",
    },
    question: "What have you felt together that neither could feel alone?",
  },
  "mender+mender": {
    thesis: "Two fixers. Everything here will work. Eventually.",
    align: ["You both see what's broken", "Repair is sacred"],
    clash: ["What gets fixed first?", "You may neglect what's working"],
    give: {
      youToThem: "You appreciate their repairs",
      themToYou: "They appreciate yours",
    },
    question: "What are you both avoiding by always fixing?",
  },
  "cleareyed+cleareyed": {
    thesis: "Two truth-tellers. No one's getting away with anything.",
    align: ["You both value honesty", "Truth is not negotiable"],
    clash: ["Whose truth prevails?", "Honesty without tenderness is cruelty"],
    give: {
      youToThem: "You can handle their truth",
      themToYou: "They can handle yours",
    },
    question: "What truth are you both avoiding?",
  },
  "between+between": {
    thesis: "Two still figuring it out. At least you're not alone.",
    align: ["You both hold uncertainty", "Neither judges the other for not knowing"],
    clash: ["Who moves first?", "Not-knowing can become permanent"],
    give: {
      youToThem: "You validate their uncertainty",
      themToYou: "They validate yours",
    },
    question: "What would it mean to figure it out together?",
  },
  "conscience+shaper": {
    thesis: "One builds the future. The other makes sure it doesn't become what we escaped.",
    align: ["You both refuse to accept things as they are", "Change is necessary—you disagree on what to watch while changing"],
    clash: ["Builder wants to move fast; Guardian wants to look closer", "What feels like progress to one feels like recklessness to the other"],
    give: {
      youToThem: "The reminder that you can build something better, not just critique what exists",
      themToYou: "Accountability—making sure what you build doesn't become what you feared",
    },
    question: "What would it look like to build something neither of you would need to watch?",
    warning: "Builder can dismiss Guardian as paranoid. Guardian can dismiss Builder as naive. Both lose.",
  },
  "architect+citizen": {
    thesis: "One trusts abundance. The other builds structures to share it. Together, utopia gets architecture.",
    align: ["You both believe good things can be widely distributed", "Neither accepts scarcity as inevitable"],
    clash: ["Abundant trusts systems to work; Architect wants to redesign them", "One assumes good faith, the other insists on good structure"],
    give: {
      youToThem: "Faith that the system can work without constant intervention",
      themToYou: "Structures that make abundance actually reach everyone",
    },
    question: "What would a system look like that you both trusted?",
  },
  "citizen+presence": {
    thesis: "One sees abundance everywhere. The other knows abundance means nothing without presence to receive it.",
    align: ["You both believe life can be good", "Neither mistakes productivity for meaning"],
    clash: ["Abundant focuses on access; Present focuses on attention", "Systems vs. showing up"],
    give: {
      youToThem: "A reminder that access to good things matters",
      themToYou: "A reminder that good things require presence to be felt",
    },
    question: "What's abundant that neither of you is fully receiving?",
  },
  "citizen+swimmer": {
    thesis: "One trusts the answer will be good. The other isn't sure there is an answer.",
    align: ["You both reject easy cynicism", "Curiosity over certainty"],
    clash: ["Abundant wants to build; Deep wants to understand first", "Optimism vs. depth"],
    give: {
      youToThem: "Trust that the questions lead somewhere good",
      themToYou: "Questions that make abundance more honest",
    },
    question: "What question could change what abundance means to you?",
  },
  "citizen+rooted": {
    thesis: "One believes in more. The other chose enough. Both reject scarcity differently.",
    align: ["Neither is driven by fear", "You both believe in a good life"],
    clash: ["Abundant sees possibility in expansion; Rooted sees it in stillness", "Growth vs. depth"],
    give: {
      youToThem: "A vision of what more could look like",
      themToYou: "The peace of knowing when enough is enough",
    },
    question: "What would abundance feel like if you stopped reaching for it?",
  },
  "citizen+embers": {
    thesis: "One looks forward. The other looks back. Both carry something worth preserving.",
    align: ["You both value what's worth keeping", "Neither is purely nihilistic"],
    clash: ["Abundant trusts the new; Keeper trusts the tested", "Innovation vs. tradition"],
    give: {
      youToThem: "Optimism that the future can be as good as the past",
      themToYou: "Memory of what abundance has meant before",
    },
    question: "What wisdom from the past would make your future richer?",
  },
  "citizen+unbound": {
    thesis: "One wants abundance here. The other wants to transcend here entirely.",
    align: ["Neither accepts current limits as final", "You both imagine more than what is"],
    clash: ["Abundant works within; Transcendent reaches beyond", "Reform vs. escape"],
    give: {
      youToThem: "A reminder that this world matters too",
      themToYou: "A vision of abundance beyond current imagination",
    },
    question: "What would it mean to have enough that transcendence became a choice, not an escape?",
  },
  "citizen+mender": {
    thesis: "One builds new systems. The other fixes what's already here. Both believe in better.",
    align: ["You both think things can work", "Neither has given up on the present"],
    clash: ["Abundant focuses on access; Mender focuses on function", "Expansion vs. repair"],
    give: {
      youToThem: "Vision of what repair could make possible",
      themToYou: "The patience to make current things actually work",
    },
    question: "What's broken that, if fixed, would create more abundance than anything new?",
  },
  "citizen+cleareyed": {
    thesis: "One sees what could be. The other sees what is. Both are looking.",
    align: ["Neither accepts comfortable lies", "You value honest assessment"],
    clash: ["Abundant sees possibility; Truth-Teller sees reality", "Hope vs. clarity"],
    give: {
      youToThem: "Evidence that optimism isn't naivety",
      themToYou: "Clarity about what abundance actually costs",
    },
    question: "What truth about abundance are you both avoiding?",
    warning: "Optimism can become denial. Clarity can become cynicism. Watch for both.",
  },
  "between+citizen": {
    thesis: "One knows what they believe. The other is still figuring it out. Room for both.",
    align: ["Neither is hostile to possibility", "You're both still open"],
    clash: ["Abundant has answers; Liminal has questions", "Certainty vs. uncertainty"],
    give: {
      youToThem: "A model of what belief can look like",
      themToYou: "Questions that keep your abundance honest",
    },
    question: "What would it mean to be abundant in uncertainty?",
  },
  "architect+shaper": {
    thesis: "One builds structures. The other tears them down to build again. Collision or collaboration.",
    align: ["You both believe in building", "Neither accepts things as they are"],
    clash: ["Architect wants it to last; Builder wants it to change", "Stability vs. transformation"],
    give: {
      youToThem: "Structures that can hold your changes",
      themToYou: "The courage to rebuild what isn't working",
    },
    question: "What would a structure look like that was designed to be rebuilt?",
    warning: "Builder can destroy what Architect built. Architect can calcify what Builder needs to change.",
  },
  "presence+shaper": {
    thesis: "One builds futures. The other is fully here now. Different gifts for different moments.",
    align: ["Neither is passive", "You both engage with what's in front of you"],
    clash: ["Builder moves fast; Present stays with what is", "Future vs. now"],
    give: {
      youToThem: "The reminder that what you build is for someone present",
      themToYou: "Permission to move when staying is avoidance",
    },
    question: "What would you build if you had to be fully present to use it?",
  },
  "friction+shaper": {
    thesis: "Two who need resistance. One finds it in difficulty. One creates it through change.",
    align: ["Neither fears struggle", "You both know growth requires friction"],
    clash: ["Builder tears down; Challenger embraces what's hard", "Destruction vs. struggle"],
    give: {
      youToThem: "Raw material from what you've torn down",
      themToYou: "The stamina to keep building when it's hard",
    },
    question: "What difficulty have you both been avoiding?",
  },
  "shaper+unbound": {
    thesis: "One builds from rubble. The other transcends rubble entirely. Different exits from what is.",
    align: ["Neither accepts current limits", "You both imagine more than this"],
    clash: ["Builder stays to change; Transcendent leaves to become", "Transform vs. transcend"],
    give: {
      youToThem: "Something to transcend from, not just toward",
      themToYou: "A vision of what you're building toward",
    },
    question: "Is transcendence the goal, or just another thing to build?",
  },
  "alive+shaper": {
    thesis: "One builds from rubble. The other feels everything, including the rubble.",
    align: ["Neither is numb to what's happening", "You both engage intensely"],
    clash: ["Builder uses experience as material; Alive receives it as sensation", "Making vs. feeling"],
    give: {
      youToThem: "A reminder that what you build will be felt",
      themToYou: "The impulse to do something with what you feel",
    },
    question: "What would you build to feel more, not just to accomplish more?",
  },
  "mender+shaper": {
    thesis: "One builds new. The other fixes old. The argument is eternal and necessary.",
    align: ["You both believe things can work", "Neither has given up"],
    clash: ["Builder tears down; Mender repairs", "Revolution vs. maintenance"],
    give: {
      youToThem: "The reminder that sometimes new is necessary",
      themToYou: "The patience to fix before discarding",
    },
    question: "What would it mean to build something that could be mended?",
    warning: "Builder can dismiss Mender as stuck. Mender can dismiss Builder as wasteful. Both are sometimes right.",
  },
  "cleareyed+shaper": {
    thesis: "One builds what could be. The other sees what is. Construction needs both.",
    align: ["Neither accepts comfortable illusions", "You both look at reality directly"],
    clash: ["Builder is optimistic; Truth-Teller is realistic", "Possibility vs. probability"],
    give: {
      youToThem: "Clarity about what you're actually building",
      themToYou: "Evidence that building can change what's true",
    },
    question: "What truth about your building have you been avoiding?",
  },
  "between+shaper": {
    thesis: "One knows what to build. The other is still figuring it out. Both are working.",
    align: ["Neither is frozen", "You're both in process"],
    clash: ["Builder acts; Liminal questions", "Certainty vs. openness"],
    give: {
      youToThem: "Permission to build before you're certain",
      themToYou: "Questions that make your building more honest",
    },
    question: "What would you build if you didn't have to know why?",
  },
  "architect+presence": {
    thesis: "One builds structures for people. The other reminds us that people aren't structures.",
    align: ["Both care about collective wellbeing", "Neither is purely self-focused"],
    clash: ["Architect thinks in systems; Present thinks in moments", "Structure vs. attention"],
    give: {
      youToThem: "Systems that make presence possible for more people",
      themToYou: "The reminder that people don't live in systems, they live in moments",
    },
    question: "What structure would create more space for presence?",
  },
  "architect+rooted": {
    thesis: "One builds for everyone. The other chose to stop building. Both have found their answer.",
    align: ["Neither is striving for personal gain", "You've both made deliberate choices"],
    clash: ["Architect acts for the collective; Rooted has stepped back", "Building vs. being"],
    give: {
      youToThem: "Structures that might make your stillness possible for others",
      themToYou: "A model of sufficiency that challenges endless building",
    },
    question: "What would a structure for enough look like?",
  },
  "architect+conscience": {
    thesis: "One builds the commons. The other watches it. Both know structures can fail.",
    align: ["You both distrust concentrated power", "Accountability matters to both"],
    clash: ["Architect trusts good design; Guardian trusts vigilance", "Structure vs. surveillance"],
    give: {
      youToThem: "Structures that make watching unnecessary",
      themToYou: "The vigilance that keeps structures honest",
    },
    question: "What would a structure look like that watched itself?",
  },
  "architect+embers": {
    thesis: "One builds for the future. The other preserves from the past. Both think long-term.",
    align: ["Neither is presentist", "You both value what endures"],
    clash: ["Architect innovates; Keeper preserves", "New structures vs. old wisdom"],
    give: {
      youToThem: "Memory of what structures have worked before",
      themToYou: "Structures that carry memory forward",
    },
    question: "What old wisdom would make your new structures better?",
  },
  "architect+friction": {
    thesis: "One builds structures. The other needs friction to grow. Tension is inevitable.",
    align: ["Neither seeks pure comfort", "You both believe in engagement"],
    clash: ["Architect wants smooth systems; Challenger wants struggle", "Efficiency vs. difficulty"],
    give: {
      youToThem: "Structures that include challenge by design",
      themToYou: "The reminder that friction needs a frame to be generative",
    },
    question: "What structure would create difficulty worth having?",
  },
  "architect+unbound": {
    thesis: "One builds collective structures. The other transcends structure entirely.",
    align: ["Neither accepts individual limits as final", "You both imagine more"],
    clash: ["Architect grounds in form; Transcendent escapes form", "Building vs. dissolving"],
    give: {
      youToThem: "Structures that hold space for transcendence",
      themToYou: "A reminder of what's worth building before you leave",
    },
    question: "What structure would be worth transcending into?",
    warning: "Architect can trap Transcendent in form. Transcendent can abandon Architect's work. Both losses.",
  },
  "alive+architect": {
    thesis: "One builds systems. The other feels what it's like to live in them.",
    align: ["Both care about experience", "Neither is purely abstract"],
    clash: ["Architect thinks in structure; Alive thinks in sensation", "Design vs. experience"],
    give: {
      youToThem: "Data on what your structures actually feel like",
      themToYou: "Structures that create space for feeling",
    },
    question: "What would a structure built for feeling feel like?",
  },
  "architect+cleareyed": {
    thesis: "One builds for everyone. The other tells the truth about everyone.",
    align: ["Neither accepts comfortable lies about power", "You both see clearly"],
    clash: ["Architect designs solutions; Truth-Teller questions them", "Building vs. critique"],
    give: {
      youToThem: "Honest assessment of what your structures actually do",
      themToYou: "Structures for truth-telling to live inside",
    },
    question: "What truth about your structures have you been avoiding?",
  },
  "architect+between": {
    thesis: "One knows what to build. The other isn't sure what anything should be.",
    align: ["Neither is rigidly certain", "You're both working it out"],
    clash: ["Architect has plans; Liminal has questions", "Structure vs. uncertainty"],
    give: {
      youToThem: "Structures that hold space for not-knowing",
      themToYou: "Questions that keep your structures humble",
    },
    question: "What structure would honor uncertainty?",
  },
  "presence+swimmer": {
    thesis: "One is fully here. The other lives in questions. Both are paying attention.",
    align: ["Neither rushes to conclusions", "You both value depth over speed"],
    clash: ["Present stays; Deep swims deeper", "Being vs. seeking"],
    give: {
      youToThem: "Presence that grounds your questions in the moment",
      themToYou: "Questions that deepen what presence means",
    },
    question: "What question could only be asked by someone fully present?",
  },
  "presence+rooted": {
    thesis: "Two who chose to stay. One in attention, one in stillness. Kindred spirits.",
    align: ["Neither is chasing the next thing", "You both know how to be here"],
    clash: ["Present engages; Rooted stops", "Active attention vs. radical stillness"],
    give: {
      youToThem: "Permission to stop that isn't withdrawal",
      themToYou: "Engagement that isn't restlessness",
    },
    question: "What's the difference between your stillness and theirs?",
  },
  "conscience+presence": {
    thesis: "One watches for danger. The other shows up fully. Both are paying attention.",
    align: ["Neither is checked out", "You both see what's in front of you"],
    clash: ["Guardian looks for threats; Present looks for connection", "Vigilance vs. warmth"],
    give: {
      youToThem: "The reminder that presence makes vigilance worth it",
      themToYou: "Watchfulness that protects what you're present to",
    },
    question: "What would presence look like if you didn't have to watch?",
  },
  "friction+presence": {
    thesis: "One seeks difficulty. The other seeks connection. Both require engagement.",
    align: ["Neither avoids what's in front of them", "You both show up"],
    clash: ["Challenger wants friction; Present wants attunement", "Struggle vs. stillness"],
    give: {
      youToThem: "Presence that witnesses your struggle without judging it",
      themToYou: "The reminder that presence includes difficulty",
    },
    question: "What difficulty would deepen your connection?",
  },
  "alive+presence": {
    thesis: "One feels everything. The other gives everything attention. Both are fully here.",
    align: ["Neither is numb", "You both engage completely with what is"],
    clash: ["Alive wants more sensation; Present wants deeper attention", "Quantity vs. quality of experience"],
    give: {
      youToThem: "Presence that receives what you feel",
      themToYou: "Feelings that give presence something to hold",
    },
    question: "What would it feel like to be fully present to everything you feel?",
  },
  "between+presence": {
    thesis: "One is fully here. The other isn't sure where here is. Both are genuine.",
    align: ["Neither is performing", "You're both honestly where you are"],
    clash: ["Present is grounded; Liminal is searching", "Arrived vs. arriving"],
    give: {
      youToThem: "Presence to your uncertainty, without trying to fix it",
      themToYou: "Questions that keep your presence from becoming complacency",
    },
    question: "What would presence mean if you're not sure who's being present?",
  },
  "rooted+swimmer": {
    thesis: "One stopped moving. The other keeps diving deeper. Both chose depth over motion.",
    align: ["Neither values speed for its own sake", "You've both rejected the race"],
    clash: ["Rooted has arrived; Deep keeps questioning", "Stillness vs. seeking"],
    give: {
      youToThem: "A shore to return to after swimming",
      themToYou: "Questions that keep your rootedness alive",
    },
    question: "What question has your stillness been avoiding?",
  },
  "conscience+swimmer": {
    thesis: "One watches for danger. The other sits with hard questions. Both take truth seriously.",
    align: ["Neither accepts easy answers", "You both stay with discomfort"],
    clash: ["Guardian looks for threats; Deep looks for depth", "Danger vs. mystery"],
    give: {
      youToThem: "Vigilance about what your questions might uncover",
      themToYou: "Questions that make your watching more honest",
    },
    question: "What question would be dangerous to answer?",
  },
  "embers+swimmer": {
    thesis: "One guards memory. The other swims in uncertainty. Past meets unresolved present.",
    align: ["Neither dismisses what came before", "You both take history seriously"],
    clash: ["Keeper has answers from the past; Deep is still asking", "Certainty vs. uncertainty"],
    give: {
      youToThem: "Memory that grounds your questions",
      themToYou: "Questions that keep your memory alive, not static",
    },
    question: "What question from the past still deserves asking?",
  },
  "friction+swimmer": {
    thesis: "One seeks difficulty. The other seeks depth. Different kinds of intensity.",
    align: ["Neither flees discomfort", "You both stay with what's hard"],
    clash: ["Challenger acts; Deep reflects", "Friction vs. contemplation"],
    give: {
      youToThem: "The challenge of questions without answers",
      themToYou: "Questions about why difficulty matters",
    },
    question: "What's the hardest question you've been avoiding?",
  },
  "alive+swimmer": {
    thesis: "One feels everything. The other questions everything. Sensation meets inquiry.",
    align: ["Neither is defended", "You're both open to what comes"],
    clash: ["Alive immerses; Deep examines", "Feeling vs. understanding"],
    give: {
      youToThem: "Feelings that ground your questions",
      themToYou: "Questions about what your feelings mean",
    },
    question: "What do you feel that you can't explain?",
  },
  "between+swimmer": {
    thesis: "Two in uncertainty. One is swimming deeper, one is on the threshold. Neither has arrived.",
    align: ["Neither claims false certainty", "You're both honestly lost"],
    clash: ["Deep seeks answers; Liminal isn't sure what the questions are", "Deep vs. undefined"],
    give: {
      youToThem: "Questions that give shape to your uncertainty",
      themToYou: "The freedom to not know what you're questioning",
    },
    question: "What if the uncertainty itself is the answer?",
  },
  "conscience+rooted": {
    thesis: "One watches. One stays still. Both have committed to something.",
    align: ["Neither is swept along", "You've both made deliberate choices"],
    clash: ["Guardian is vigilant; Rooted is at peace", "Alertness vs. stillness"],
    give: {
      youToThem: "Peace that doesn't require watching",
      themToYou: "Watching that protects what's worth staying still for",
    },
    question: "What would you have to trust to stop watching?",
  },
  "mender+rooted": {
    thesis: "One fixes things. The other stopped striving. Different answers to what needs doing.",
    align: ["Neither is chasing the new", "You both value what's here"],
    clash: ["Mender acts on what's broken; Rooted accepts what is", "Repair vs. acceptance"],
    give: {
      youToThem: "The peace of knowing some things don't need fixing",
      themToYou: "The discernment to know when they do",
    },
    question: "What's broken that stillness could heal?",
  },
  "cleareyed+rooted": {
    thesis: "One tells hard truths. The other found peace. Both have stopped running.",
    align: ["Neither is performing", "You've both arrived somewhere real"],
    clash: ["Truth-Teller speaks; Rooted is silent", "Clarity vs. stillness"],
    give: {
      youToThem: "Truths that don't disturb your peace",
      themToYou: "A peace that doesn't require ignoring truth",
    },
    question: "What truth is your stillness protecting you from?",
  },
  "between+rooted": {
    thesis: "One found ground. The other is still searching. Both are honestly where they are.",
    align: ["Neither is performing certainty", "You're both genuine"],
    clash: ["Rooted has stopped; Liminal hasn't started", "Arrived vs. not-yet"],
    give: {
      youToThem: "A model of what finding ground might look like",
      themToYou: "The reminder that your stillness was once uncertainty too",
    },
    question: "What would it mean to be rooted in uncertainty?",
  },
  "conscience+unbound": {
    thesis: "One watches for danger. The other transcends danger entirely. Tension between earth and sky.",
    align: ["Neither accepts comfortable illusions", "You both see clearly"],
    clash: ["Guardian stays to watch; Transcendent leaves", "Vigilance vs. escape"],
    give: {
      youToThem: "Vigilance about what transcendence might leave behind",
      themToYou: "A vision of what's beyond what you're watching",
    },
    question: "What would you have to trust to stop watching and transcend?",
    warning: "Guardian can trap Transcendent in fear. Transcendent can abandon what Guardian protects.",
  },
  "conscience+mender": {
    thesis: "One spots what's wrong. The other fixes it. Natural partners if trust holds.",
    align: ["Neither ignores problems", "You both engage with what's broken"],
    clash: ["Guardian stays suspicious; Mender trusts repair", "Watching vs. acting"],
    give: {
      youToThem: "The targets worth fixing",
      themToYou: "Evidence that watching leads somewhere",
    },
    question: "What's broken that you've both been avoiding?",
  },
  "cleareyed+conscience": {
    thesis: "Two truth-tellers. One speaks, one watches. Together, nothing escapes.",
    align: ["Neither tolerates lies", "You both value honesty above comfort"],
    clash: ["Truth-Teller says it; Guardian suspects it", "Speaking vs. surveilling"],
    give: {
      youToThem: "Truths to support what you're watching",
      themToYou: "Evidence for the truths you're speaking",
    },
    question: "What truth are you both afraid to say out loud?",
  },
  "between+conscience": {
    thesis: "One watches. One wonders. Both are paying attention to something.",
    align: ["Neither is asleep", "You're both engaged with uncertainty"],
    clash: ["Guardian has suspicions; Liminal has questions", "Vigilance vs. openness"],
    give: {
      youToThem: "Openness that doesn't require suspicion",
      themToYou: "The reminder that some uncertainties are dangers",
    },
    question: "What are you watching for that you can't name?",
  },
  "embers+friction": {
    thesis: "One guards what was. The other embraces what's hard. Memory meets struggle.",
    align: ["Neither seeks comfort", "You both value what endures"],
    clash: ["Keeper preserves; Challenger disrupts", "Conservation vs. friction"],
    give: {
      youToThem: "Memory of what was worth struggling for",
      themToYou: "The friction that keeps memory alive",
    },
    question: "What old struggle still deserves fighting?",
  },
  "alive+embers": {
    thesis: "One feels everything now. The other remembers everything before. Sensation meets memory.",
    align: ["Neither is detached", "You both hold onto what matters"],
    clash: ["Alive lives in the present; Keeper lives in the past", "Now vs. then"],
    give: {
      youToThem: "Memory that gives your feelings context",
      themToYou: "Feelings that make memory alive, not dead",
    },
    question: "What memory are you still feeling?",
  },
  "embers+mender": {
    thesis: "One preserves what was. The other fixes what is. Both value what endures.",
    align: ["Neither discards thoughtlessly", "You both respect what's here"],
    clash: ["Keeper wants to preserve; Mender wants to repair", "Museum vs. workshop"],
    give: {
      youToThem: "Knowledge of how it used to work",
      themToYou: "Skills to make what you've preserved functional",
    },
    question: "What deserves repair more than preservation?",
  },
  "cleareyed+embers": {
    thesis: "One tells truth. One guards memory. Both believe the record matters.",
    align: ["Neither rewrites history", "You both value accuracy"],
    clash: ["Truth-Teller speaks now; Keeper speaks for then", "Current vs. historical truth"],
    give: {
      youToThem: "Memory of truths that have been spoken before",
      themToYou: "Clarity about what memory is actually showing",
    },
    question: "What truth from the past needs speaking now?",
  },
  "between+embers": {
    thesis: "One guards what was. The other isn't sure what will be. Past meets uncertain future.",
    align: ["Neither is purely present", "You're both oriented to time"],
    clash: ["Keeper has certainty from the past; Liminal has none about the future", "Memory vs. openness"],
    give: {
      youToThem: "Memory that gives your uncertainty context",
      themToYou: "Openness that keeps your memory from becoming a cage",
    },
    question: "What from the past belongs in your uncertain future?",
  },
  "friction+mender": {
    thesis: "One embraces difficulty. The other fixes what's broken. Different responses to damage.",
    align: ["Neither flees from what's hard", "You both engage with struggle"],
    clash: ["Challenger uses difficulty; Mender resolves it", "Embracing vs. fixing"],
    give: {
      youToThem: "Difficulty that makes repair meaningful",
      themToYou: "The humility that some difficulties need fixing, not embracing",
    },
    question: "What's broken that difficulty could heal better than repair?",
  },
  "cleareyed+friction": {
    thesis: "One tells hard truths. The other embraces what's hard. Both face what others flee.",
    align: ["Neither seeks comfort", "You both stay with discomfort"],
    clash: ["Truth-Teller sees clearly; Challenger seeks difficulty", "Clarity vs. struggle"],
    give: {
      youToThem: "Truth about what you're struggling with",
      themToYou: "The stamina to act on hard truths",
    },
    question: "What truth would be difficult enough to matter?",
  },
  "between+friction": {
    thesis: "One seeks difficulty. The other isn't sure what to seek. Certainty meets uncertainty.",
    align: ["Neither is comfortable", "You're both in motion"],
    clash: ["Challenger has direction; Liminal has questions", "Purpose vs. openness"],
    give: {
      youToThem: "Difficulty that gives shape to your uncertainty",
      themToYou: "Questions about whether your difficulty is the right one",
    },
    question: "What would difficulty teach you that certainty couldn't?",
  },
  "alive+unbound": {
    thesis: "One wants to feel everything here. The other wants to transcend here entirely.",
    align: ["Neither accepts limits", "You both want more than this"],
    clash: ["Alive stays embodied; Transcendent leaves the body", "Sensation vs. escape"],
    give: {
      youToThem: "What embodiment feels like, so you know what you're transcending",
      themToYou: "A vision of feeling beyond current limits",
    },
    question: "What would transcendence feel like?",
    warning: "Transcendent can dismiss Alive as attached. Alive can dismiss Transcendent as avoidant.",
  },
  "mender+unbound": {
    thesis: "One fixes what's here. The other leaves what's here behind. Different exits from brokenness.",
    align: ["Neither accepts things as they are", "You both respond to what's wrong"],
    clash: ["Mender stays to repair; Transcendent transcends the need", "Fixing vs. escaping"],
    give: {
      youToThem: "The choice to repair before transcending",
      themToYou: "A vision of what's beyond repair",
    },
    question: "What's broken that transcendence wouldn't fix either?",
  },
  "cleareyed+unbound": {
    thesis: "One sees what is. The other imagines what's beyond. Ground and sky.",
    align: ["Neither accepts comfortable illusions", "You both see clearly, differently"],
    clash: ["Truth-Teller is grounded; Transcendent is reaching", "Here vs. elsewhere"],
    give: {
      youToThem: "Clear sight of what you're transcending from",
      themToYou: "A vision that makes truth-telling more than accounting",
    },
    question: "What truth about transcendence are you avoiding?",
  },
  "between+unbound": {
    thesis: "One is leaving. The other hasn't decided. Different relationships to being here.",
    align: ["Neither is fully committed to what is", "You're both in transition"],
    clash: ["Transcendent has direction; Liminal is still finding it", "Escaping vs. searching"],
    give: {
      youToThem: "A destination for your uncertainty",
      themToYou: "Questions about whether transcendence is your answer",
    },
    question: "What if your uncertainty is already a form of transcendence?",
  },
  "alive+mender": {
    thesis: "One feels everything. The other fixes everything. Both respond to what's in front of them.",
    align: ["Neither is detached", "You both engage with reality"],
    clash: ["Alive receives; Mender acts", "Feeling vs. fixing"],
    give: {
      youToThem: "The feeling of what you've repaired",
      themToYou: "Action that gives your feelings somewhere to go",
    },
    question: "What would it feel like to fix something?",
  },
  "alive+cleareyed": {
    thesis: "One feels everything. The other sees everything. Both are fully engaged.",
    align: ["Neither is defended", "You both take in what's here"],
    clash: ["Alive absorbs; Truth-Teller analyzes", "Sensation vs. clarity"],
    give: {
      youToThem: "Truth about what you're feeling",
      themToYou: "Feeling that makes truth matter",
    },
    question: "What truth do you feel but can't say?",
  },
  "alive+between": {
    thesis: "One feels everything. The other isn't sure what to feel. Intensity meets uncertainty.",
    align: ["Neither is performing", "You're both honestly where you are"],
    clash: ["Alive is certain of sensation; Liminal is certain of nothing", "Feeling vs. questioning"],
    give: {
      youToThem: "Feelings that give shape to your uncertainty",
      themToYou: "Questions about what your feelings mean",
    },
    question: "What would you feel if you let yourself not know?",
  },
  "cleareyed+mender": {
    thesis: "One sees what's broken. The other fixes it. Truth and repair.",
    align: ["Neither ignores problems", "You both engage with what's wrong"],
    clash: ["Truth-Teller diagnoses; Mender acts", "Seeing vs. doing"],
    give: {
      youToThem: "Clarity about what needs repair",
      themToYou: "Evidence that truth leads to action",
    },
    question: "What truth would repair something?",
  },
  "between+mender": {
    thesis: "One fixes what's broken. The other isn't sure what's whole. Different relationships to repair.",
    align: ["Neither is in denial", "You're both honest about imperfection"],
    clash: ["Mender acts; Liminal waits", "Certainty vs. uncertainty about what needs fixing"],
    give: {
      youToThem: "A model of action without certainty",
      themToYou: "Questions about what repair actually means",
    },
    question: "What if your uncertainty is what needs mending?",
  },
};

// Get expanded pair dynamic with new structure
export function getExpandedPairDynamic(a: string, b: string): PairDynamic | null {
  const key = [a, b].sort().join("+");
  return expandedPairDynamics[key] || null;
}

// Generate a fallback PairDynamic based on archetype positions
export function generateFallbackPairDynamic(a: string, b: string): PairDynamic {
  const posA = archetypePositions[a];
  const posB = archetypePositions[b];
  const archA = archetypes[a];
  const archB = archetypes[b];

  // Calculate distance
  const dx = (posB?.x || 0) - (posA?.x || 0);
  const dy = (posB?.y || 0) - (posA?.y || 0);
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Get question based on distance
  const { category } = getPairDistance(a, b);
  const questions = relationshipQuestions[category];
  const key = [a, b].sort().join("+");
  const index = key.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % questions.length;
  const question = questions[index];

  if (distance < 0.4) {
    // Close together - similar worldviews
    return {
      thesis: "You speak the same language. The question is whether you can hear what neither of you is saying.",
      align: ["You see the world similarly", "Shared values come naturally"],
      clash: ["You might reinforce each other's blind spots", "Echo chamber risk"],
      give: {
        youToThem: "Comfort in being understood",
        themToYou: "Validation of your worldview",
      },
      question,
    };
  } else if (distance > 1.0) {
    // Far apart - opposite worldviews
    return {
      thesis: `One ${archA?.superpower?.toLowerCase() || "sees one way"}. The other ${archB?.superpower?.toLowerCase() || "sees another"}. Between you, a more complete picture.`,
      align: ["You cover each other's blind spots", "Different strengths combine"],
      clash: ["Your instincts pull in opposite directions", "What feels obvious to you puzzles them"],
      give: {
        youToThem: archA?.superpower || "Your perspective",
        themToYou: archB?.superpower || "Their perspective",
      },
      question,
      warning: "This distance creates friction. It can be creative or destructive.",
    };
  } else {
    // Medium distance
    return {
      thesis: "Different paths to similar questions. Together, you see more than either would alone.",
      align: ["Different approaches to similar questions", "Complementary perspectives"],
      clash: ["Your methods differ even when your goals align", "Process disagreements"],
      give: {
        youToThem: "A different angle on shared concerns",
        themToYou: "Another way of seeing what you both care about",
      },
      question,
    };
  }
}

// Unified function to get PairDynamic (new structure) - tries expanded first, then generates
export function getPairDynamicExpanded(a: string, b: string): PairDynamic {
  const key = [a, b].sort().join("+");
  return expandedPairDynamics[key] || generateFallbackPairDynamic(a, b);
}

// =============================================================================
// ANALYTICAL PAIR DYNAMICS - FULL READING FORMAT
// =============================================================================

export type AnalyticalPairDynamic = {
  thesis: string;           // Opening poetic sentence

  // THE DISTANCE - 1-2 paragraphs analyzing what their distance means
  distanceAnalysis: string;

  // THE DYNAMIC - 2-3 paragraphs on fundamental relationship
  dynamic: string;

  // WHERE YOU ALIGN - Each with point + expanded paragraph
  align: Array<{
    point: string;          // The shared value/belief
    explanation: string;    // Full paragraph on how it manifests
  }>;

  // WHERE YOU'LL CLASH - Each with friction + expanded paragraph
  clash: Array<{
    point: string;          // The friction point
    explanation: string;    // Full paragraph on how it shows up
  }>;

  // WHAT YOU EXCHANGE - Full paragraphs for each direction
  give: {
    youToThem: string;      // Full paragraph on the gift
    themToYou: string;      // Full paragraph on the gift
  };

  // THE RISK - 1-2 paragraphs on failure mode
  risk: string;

  // A QUESTION FOR YOU BOTH
  question: {
    text: string;           // The specific question
    framing: string;        // 1-2 sentences on why it matters
  };
};

// Handcrafted analytical pair dynamics - same-archetype pairs (Tier 1)
export const analyticalPairDynamics: Record<string, AnalyticalPairDynamic> = {
  // ===== SAME-ARCHETYPE PAIRS (14 total) =====

  "alive+alive": {
    thesis: "Two mirrors reflecting infinite sensation—profound recognition, but who pauses long enough to feel what's actually there?",

    distanceAnalysis: `When The Alive meets The Alive, the distance between you is zero. You share the same philosophical coordinates, the same hunger for experience, the same conviction that the universe gave you everything and the least you can do is feel it. This is immediate recognition—the relief of meeting someone who doesn't need you to justify your intensity, your appetite, your refusal to moderate.

But distance zero carries its own weight. When two people occupy the same position, they see the same things—and miss the same things. Your shared orientation toward sensation can become an echo chamber of experience-seeking, each validating the other's hunger without questioning whether that hunger is serving you. The blind spots you share become invisible, confirmed by mutual agreement.`,

    dynamic: `At its core, this pairing brings together two people who believe experience is the point. Both of you have unusual capacity for feeling—not just seeking sensation, but receiving it fully. Where others filter, protect, moderate, you both open. This creates a kind of amplification: together, you can access intensities that might overwhelm or frighten others.

The dynamic between two The Alive types is one of mutual permission. You don't have to explain why you need more, why you're not satisfied with the safe middle, why something in you requires the full range. The other person gets it. They're built the same way.

But this same mutual permission can enable the shadow side of your shared orientation. You both know that sensation can become consumption—that feeling everything is not the same as understanding anything. When two people share this blind spot, neither may be positioned to call attention to it. The endless pursuit of experience can become its own kind of numbness: if you're always chasing the next sensation, you're never actually present to what's here.`,

    align: [
      {
        point: "Experience as fundamental value",
        explanation: `Both of you believe, at a cellular level, that life is for feeling. This isn't hedonism—it's a philosophy. You've both concluded that the body is an instrument for receiving reality, not a prison to escape. When others treat intensity as something to manage or moderate, you both see it as something to cultivate. This shared conviction means you never have to defend your basic orientation toward being alive.`
      },
      {
        point: "Openness without apology",
        explanation: `The world often tells people like you that you're "too much"—too sensitive, too intense, too hungry for experience. You've both learned to carry that judgment and keep going anyway. Meeting someone who shares this quality is a relief: here is a person who won't ask you to turn down, moderate, be reasonable. Your openness isn't a problem to be managed; it's a gift that finds its match.`
      },
      {
        point: "The body as instrument",
        explanation: `While others might dream of transcending physical limits, you both understand the body as the primary instrument for receiving reality. New senses, new perspectives, new forms of experience—these matter to both of you. This shared embodiment means your relationship has a sensory dimension that more cerebral pairings might lack.`
      }
    ],

    clash: [
      {
        point: "Whose experience takes priority?",
        explanation: `When two sensation-seekers pair up, there's an implicit competition for intensity. If you both want to feel everything, and your paths to feeling diverge, whose experience wins? This can show up in small ways—whose adventure takes precedence, whose sensory preferences shape shared experiences—and in larger patterns of whose aliveness the relationship serves. Without attention, one person's experience can consistently eclipse the other's.`
      },
      {
        point: "Sensation as consumption",
        explanation: `You both know your shadow: the version of your openness that becomes gluttony, devouring experiences without digesting them. When two people share this vulnerability, they can enable each other's consumption rather than helping each other integrate. The relationship becomes a vehicle for accumulating experiences rather than deepening into any of them. Intensity without depth is its own kind of emptiness.`
      }
    ],

    give: {
      youToThem: `You offer amplification. Your presence turns their experience up, validates their intensity, provides a partner for adventures that would feel lonely alone. You show them that their hunger for sensation isn't a defect to be managed but a gift that finds its match. In your company, they don't have to hold back, moderate, or apologize for wanting more. You understand what drives them because you're driven by the same thing.`,
      themToYou: `They offer the same amplification back. They don't judge your hunger for experience because they share it. They'll follow you into intensities that others might find excessive, match your openness, celebrate your capacity to feel. In their company, you're not "too much." You're exactly as much as you are, and that's met with recognition rather than resistance.`
    },

    risk: `The failure mode for two The Alive types is mutual enabling toward consumption. Without someone to ask "why do you need this particular experience?" or "what are you avoiding by always seeking the next sensation?", you can reinforce each other's tendency to use intensity as escape. The relationship becomes a spinning wheel of experiences—vivid, memorable, but ultimately unintegrated.

The deeper risk is that sensation becomes a substitute for presence. If you're both always reaching for the next experience, neither of you may learn to stay with what's actually here—including the difficult, unglamorous experiences that don't offer obvious intensity but might offer depth. Two people who are alive to everything can end up alive to nothing in particular.`,

    question: {
      text: "What have you felt together that neither of you could feel alone—and what have you avoided feeling by always moving toward the next experience?",
      framing: `This question matters because it asks you to distinguish between the genuine gifts of your shared intensity and the ways that intensity might be serving as avoidance. The first part honors what's real about your connection; the second invites you to look at what might be getting lost.`
    }
  },

  "architect+architect": {
    thesis: "Two systems thinkers designing the same commons—profound structural alignment, but who lives in the blueprints?",

    distanceAnalysis: `When The Architect meets The Architect, you share the same philosophical coordinates: the conviction that the best structures belong to everyone who uses them, that design is never neutral, that collective ownership matters more than elegant control. This is immediate recognition—the relief of meeting someone who sees the invisible architecture, who asks "who does this serve?" when others are still asking "what does this do?"

But occupying the same position means seeing the same things and missing the same things. Your shared orientation toward systems can become an echo chamber of structural thinking, each validating the other's blueprints without questioning whether anyone wants to live in them. The blind spots you share—particularly the tendency to love the system more than the people inside it—become invisible, confirmed by mutual agreement.`,

    dynamic: `At its core, this pairing brings together two people who think in systems and build for the commons. Both of you see the blueprints behind social spaces, the rules—written and unwritten—that shape collective life. Where others experience institutions as weather, you both experience them as design: something that was built, that could have been built differently, that could be rebuilt.

The dynamic between two Architects is one of shared language. You can discuss governance structures, feedback loops, and collective decision-making without having to justify why these things matter. The other person already knows. This creates a kind of collaborative design space: together, you can imagine structures that neither could build alone.

But this same shared language can become an insular dialect. You both know that you can fall in love with the system and forget the people inside it—that the meeting can become more important than what the meeting was for. When two people share this blind spot, your collaborative design sessions might produce beautiful, fair structures that nobody actually wants to use. The commons you build together might serve the architecture more than the community.`,

    align: [
      {
        point: "Collective ownership as core value",
        explanation: `Both of you would rather build something imperfect and collectively owned than something elegant and controlled by a few. This isn't compromise—it's conviction. You've both concluded that distributed power is worth the messiness it creates. When others see your commitment to collective process as inefficiency, you both see it as the whole point. This shared value means you never have to justify why everyone needs a voice.`
      },
      {
        point: "Design as ethics",
        explanation: `You both understand that every system encodes values, that architecture is politics by other means. When you look at an institution, a platform, a process, you both ask whose interests it serves. This shared lens means your conversations about structure are always also conversations about justice. Neither of you believes design is neutral.`
      },
      {
        point: "The long view",
        explanation: `Both of you understand that the work of liberation is generational, not revolutionary. You're building for timescales longer than your own involvement. This patience with process—the willingness to lay foundations that others will build on—connects you. Neither of you expects quick wins or clean resolutions.`
      }
    ],

    clash: [
      {
        point: "Two blueprints, one building",
        explanation: `When two systems thinkers try to build together, there's an implicit competition: whose architecture prevails? You both see the invisible structures, but you might see them differently. Your visions of collective ownership might diverge in crucial details—how decisions get made, who gets to participate, what counts as consensus. These differences, precisely because they're both structurally sophisticated, can be harder to resolve than simpler conflicts.`
      },
      {
        point: "Process over people",
        explanation: `You both know your shadow: the version of your systems-thinking that makes the meeting more important than what the meeting was for. When two Architects build together, you can design processes so carefully that they become prisons—everyone has a voice, but no one can act. Your shared love of structure might produce beautiful bureaucracy that serves the architecture while the people inside it suffer.`
      }
    ],

    give: {
      youToThem: `You offer structural partnership. Your presence means they're not alone in seeing the blueprints, in caring about collective ownership, in doing the unglamorous work of building institutions that serve everyone. You can critique their systems intelligently, catch design flaws they've missed, and help them iterate toward structures that actually work. You understand their love of the commons because you share it.`,
      themToYou: `They offer the same structural partnership back. They see what you see—the invisible architecture, the encoded values, the possibilities for collective design. In their company, your systems-thinking isn't obsessive or impractical; it's met with genuine engagement. They can push back on your blueprints from a position of shared commitment, helping you build better.`
    },

    risk: `The failure mode for two Architects is structural narcissism—designing systems for the beauty of the design rather than the people who will use them. Without someone outside your shared perspective to ask "but would anyone want to live in this?", you can reinforce each other's tendency toward elegant abstraction that doesn't serve actual humans.

The deeper risk is that you build a commons that belongs to your shared vision rather than to the community it's meant to serve. Two Architects can become so aligned in their structural thinking that they forget to check whether anyone else wants what they're building. The democratic ideal can become its own kind of authoritarianism: everyone must participate in your beautiful system.`,

    question: {
      text: "What would it mean to build a system together—and how would you know if it served the people inside it more than it served your shared love of building?",
      framing: `This question matters because it asks you to distinguish between the genuine value of your collaborative design and the risk of structural self-indulgence. The first part honors your shared gift; the second invites accountability to something beyond your shared perspective.`
    }
  },

  "between+between": {
    thesis: "Two thresholds meeting—profound companionship in uncertainty, but can the space between become a place to live forever?",

    distanceAnalysis: `When The Liminal meets The Liminal, the distance between you is zero. You share the same philosophical coordinates: the threshold, the transition, the not-yet-arrived. Both of you have resisted the pressure to pick a side, take a stand, be something definable—and you're still here, which takes a particular kind of courage.

But occupying the same uncertain space means sharing the same relationship to not-knowing—and potentially sharing the same way of using uncertainty. Your companionship in the threshold can become a permanent address, each validating the other's liminal state without questioning whether staying undefined has become a way of avoiding choice. The blind spots you share become invisible, confirmed by mutual agreement.`,

    dynamic: `At its core, this pairing brings together two people who are still figuring it out. Both of you hold uncertainty while others demand certainty. Both of you have questions where others have positions. This isn't weakness or indecision—it's a different relationship to the complexity of things.

The dynamic between two Betweens is one of mutual non-judgment. You don't have to pretend to know what you believe, who you are, where you're going. The other person is also in transition. This creates a kind of companionship that more defined people can't offer: the relief of being with someone who doesn't need you to have arrived.

But this same mutual acceptance can enable permanent deferral. You both know that the space between can become a way of avoiding the risk of choosing. When two people share this vulnerability, neither may be positioned to call attention to it. Your companionship in uncertainty might feel like wisdom when it's actually a shared fear of commitment dressed up as openness.`,

    align: [
      {
        point: "Uncertainty as honesty",
        explanation: `Both of you have concluded that not knowing can be more honest than false certainty. When others rush to answers that don't quite fit, you both stay in the question. This shared commitment to intellectual honesty means neither of you has to pretend to convictions you don't hold. Your uncertainty isn't failure—it's integrity.`
      },
      {
        point: "Identity as process",
        explanation: `You both understand that identity is more fluid than most people assume. You're both still in transition, still becoming, still holding open the question of who you might be. This shared sense of identity-in-motion means neither judges the other for not having arrived. The threshold is a valid place to stand.`
      },
      {
        point: "The courage of staying present",
        explanation: `Everyone else has a position. You both have questions. And you're both still here—still engaged, still trying to understand, still refusing easy answers. This takes courage that more defined people might not recognize. You see each other's bravery in staying present to uncertainty.`
      }
    ],

    clash: [
      {
        point: "Who moves first?",
        explanation: `When two people are both in the space between, there's a question of initiative. If neither of you has committed to a direction, who decides anything? This can manifest as a relationship that drifts—pleasant, undefined, going nowhere in particular—because neither person is willing to stake a claim. Your shared comfort with ambiguity can become shared paralysis.`
      },
      {
        point: "Uncertainty as avoidance",
        explanation: `You both know your shadow: the version of your openness that becomes refusal to choose. When two Betweens pair up, you can validate each other's indefinition without asking whether it's serving you. "I'm still figuring it out" can become a permanent state that protects both of you from the vulnerability of decision. Your shared threshold can become a hiding place.`
      }
    ],

    give: {
      youToThem: `You offer companionship in uncertainty. Your presence means they're not alone in the threshold, not the only one who hasn't figured it out. You validate their questions without demanding answers. In your company, their uncertainty isn't a problem to be solved but a state to be shared. They don't have to pretend to convictions they don't hold.`,
      themToYou: `They offer the same companionship back. They understand what it's like to be in transition, to resist the pressure to define yourself, to hold questions instead of answers. In their company, you're not failing to commit; you're honestly engaging with complexity. They meet your uncertainty with their own, and that meeting is its own kind of arrival.`
    },

    risk: `The failure mode for two Betweens is permanent liminality—using your companionship as an excuse to never decide anything. Without someone to push toward choice, you can reinforce each other's tendency to defer, question, keep options open indefinitely.

The deeper risk is that the space between becomes a relationship that's always about to happen. Two Betweens can drift together indefinitely, their shared uncertainty preventing the commitments that would give the relationship shape and depth. At some point, you have to decide something. If you're both waiting for the other to go first, you may wait forever.`,

    question: {
      text: "What would it mean to figure it out together—and what commitment have you both been avoiding by staying in the space between?",
      framing: `This question matters because it asks you to distinguish between genuine shared uncertainty and shared avoidance. The first part honors the real companionship you offer each other; the second invites you to look at what might be getting lost by never arriving anywhere together.`
    }
  },

  "citizen+citizen": {
    thesis: "Two citizens of abundance floating in trust—profound ease together, but who drops anchor when the current shifts?",

    distanceAnalysis: `When The Abundant meets The Abundant, the distance between you is zero. You share the same philosophical coordinates: the conviction that scarcity is more often manufactured than natural, that systems designed for abundance tend toward good, that too much freedom will always be preferable to too little. This is immediate recognition—the relief of meeting someone who doesn't default to fear, who sees possibility where others see constraint.

But occupying the same position means seeing the same things and missing the same things. Your shared trust in abundance can become an echo chamber of optimism, each validating the other's confidence without questioning whether that confidence is warranted. The blind spots you share—particularly the tendency to mistake access for equity—become invisible, confirmed by mutual agreement.`,

    dynamic: `At its core, this pairing brings together two people who trust that life can be good. Both of you operate from abundance when most people default to scarcity. Both of you believe that the biggest barrier to enough isn't resources but imagination. Where others hoard, guard, and assume zero-sum, you both open.

The dynamic between two Citizens is one of shared ease. You don't have to defend your optimism, justify your trust, or explain why you believe good things are possible. The other person already lives there. This creates a generous atmosphere: together, you can imagine futures that more suspicious worldviews would dismiss as naive.

But this same shared ease can become shared blindness. You both know that you can mistake access for equity—that "everyone can use this" is not the same as "everyone can benefit from this." When two people share this blind spot, neither may notice who's still being left out. Your abundance-mindset can become a comfortable assumption that things are better than they are.`,

    align: [
      {
        point: "Abundance as baseline",
        explanation: `Both of you have concluded that scarcity is usually manufactured or inherited. You don't default to assuming there isn't enough. This shared baseline means your conversations start from possibility rather than constraint. When others fight over a pie that could be made larger, you both see the bigger picture.`
      },
      {
        point: "Freedom over control",
        explanation: `Both of you believe that too much freedom will always be preferable to too little. You'd rather have the problems of excess choice than the problems of constraint. This shared orientation toward liberation means neither of you advocates for restricting options to solve problems. You both trust people to figure things out when given resources and freedom.`
      },
      {
        point: "Technology as possibility",
        explanation: `You both focus on what technology can enable rather than what it might destroy. You've read the arguments, considered the risks, and concluded that abundance is worth pursuing. This shared technological optimism means you can discuss futures that others find threatening—AI, automation, post-scarcity—without having to defend the basic premise that these could be good.`
      }
    ],

    clash: [
      {
        point: "No one is pushing for more",
        explanation: `When two people are both at ease with abundance, there's a question of ambition. If both of you trust that things will work out, who pushes for change? Your shared comfort can become shared complacency—a pleasant assumption that abundance will arrive without anyone having to fight for it. The relationship can drift in a pleasant direction without anyone steering.`
      },
      {
        point: "Missing who's still left out",
        explanation: `You both know your shadow: the tendency to mistake access for equity. When two Citizens pair up, you can reinforce each other's trust without checking whether that trust is warranted for everyone. Your shared optimism might feel generous while ignoring the people for whom scarcity is very real. Abundance-thinking can become a kind of privilege blindness.`
      }
    ],

    give: {
      youToThem: `You offer shared ease. Your presence validates their trust in abundance, confirms that their optimism isn't naivety. You don't make them feel guilty for enjoying what's good or believing things can be better. In your company, their abundance-mindset is met with recognition rather than suspicion. They can relax into the generous worldview you share.`,
      themToYou: `They offer the same ease back. They don't question your trust, don't demand you defend your optimism, don't treat your abundance-thinking as privilege blindness (even when it might be). In their company, you're not naive—you're two people who've thought about it and concluded that good things are possible. That shared conclusion is its own kind of home.`
    },

    risk: `The failure mode for two Citizens is comfortable drift—so trusting in abundance that neither of you notices when things aren't actually working. Without someone to question your shared optimism, you can reinforce each other's tendency to assume good outcomes while ignoring evidence that they're not arriving for everyone.

The deeper risk is that your shared abundance-mindset becomes a barrier to seeing suffering. Two Citizens can become so comfortable in their trust that they stop checking whether that trust is warranted. Your utopia might float beautifully while others drown beneath it.`,

    question: {
      text: "What would shake you both out of comfort—and whose scarcity might you both be overlooking?",
      framing: `This question matters because it asks you to examine the limits of your shared ease. The first part invites you to consider what might need to change; the second asks you to look at who your abundance-thinking might be leaving out.`
    }
  },

  "cleareyed+cleareyed": {
    thesis: "Two truth-tellers in the storm—profound honesty between you, but can truth survive without tenderness?",

    distanceAnalysis: `When The Truth-Teller meets The Truth-Teller, the distance between you is zero. You share the same philosophical coordinates: the conviction that reality doesn't care about feelings, that comfortable lies are more dangerous than uncomfortable truths, that seeing clearly is both skill and courage. This is immediate recognition—the relief of meeting someone who doesn't flinch, who says the thing, who values truth above comfort.

But occupying the same position means sharing the same relationship to honesty—and potentially sharing the same blind spots about how truth lands. Your mutual commitment to clarity can become an echo chamber of brutal honesty, each validating the other's bluntness without questioning whether honesty without tenderness is cruelty. The blind spots you share become invisible, confirmed by mutual agreement.`,

    dynamic: `At its core, this pairing brings together two people who see what is actually happening and say it out loud. Both of you have the rare capacity to not look away. Where others smooth edges, soften blows, and protect feelings at the cost of accuracy, you both tell the truth.

The dynamic between two Clear-Eyed types is one of mutual respect for honesty. You can handle each other's truth. There's no need for diplomatic wrappers, gentle introductions, or careful timing. The other person can take it, and so can you. This creates a uniquely direct relationship: nothing gets hidden, nothing gets sugar-coated.

But this same directness can become its own kind of violence. You both know that honesty without tenderness is cruelty—that the way you say a thing matters as much as the thing itself. When two people share this blind spot, neither may notice when their truth-telling becomes a weapon. Your mutual clarity can create a relationship where no one's getting away with anything, including the vulnerable, uncertain parts of being human that need gentleness to emerge.`,

    align: [
      {
        point: "Truth as non-negotiable",
        explanation: `Both of you believe that reality is better than comfortable illusion, no matter how uncomfortable the reality might be. You don't soften truths, delay difficult conversations, or protect people from what they need to hear. This shared commitment means neither of you has to wonder if you're getting the real story. What's said is what's meant.`
      },
      {
        point: "Seeing as skill",
        explanation: `You both understand that clarity requires practice and courage. It's not just about being smart enough to see—it's about being brave enough to keep looking when others would turn away. This shared discipline means you respect each other's sight. Neither of you confuses comfortable perception with clear vision.`
      },
      {
        point: "Courage to stay in the storm",
        explanation: `The storm won't stop because you close your eyes. You both know this. While others might hope things will blow over or pretend the clouds aren't gathering, you both keep watching, keep saying what you see. This shared courage means neither of you is alone in the storm.`
      }
    ],

    clash: [
      {
        point: "Whose truth prevails?",
        explanation: `When two truth-tellers disagree about what's true, the conflict can be intense. Both of you believe in saying the thing, but you might see different things. And neither of you will back down for the sake of peace. These disagreements, precisely because they're both honest, can be harder to resolve than conflicts where someone is willing to pretend. No one's smoothing edges here.`
      },
      {
        point: "Honesty as weapon",
        explanation: `You both know your shadow: the version of your clarity that becomes cruelty. "Just being honest" can be another way of being right. When two Clear-Eyed types pair up, you can validate each other's bluntness without checking whether it's serving truth or serving your need to be the one who sees. Your mutual directness can create a relationship where nothing tender survives.`
      }
    ],

    give: {
      youToThem: `You offer the ability to handle their truth. Your presence means they don't have to soften, package, or time their honesty carefully. You can take what they see because you see similarly. In your company, their clarity isn't "too much" or "too harsh"—it's met with equal clarity. You free them from the labor of protecting others from reality.`,
      themToYou: `They offer the same capacity back. They can handle your truth, match your directness, meet your clarity with their own. In their company, you don't have to perform gentleness you don't feel or pretend to uncertainty you've resolved. They respect your sight because they share it. That mutual respect is its own kind of intimacy.`
    },

    risk: `The failure mode for two Clear-Eyed types is mutual brutality disguised as honesty. Without someone to model tenderness, you can reinforce each other's tendency to prioritize truth over care. Your relationship becomes a place where nothing is hidden—including the fact that sometimes what people need isn't clarity but kindness.

The deeper risk is that you create an environment where vulnerability becomes impossible. Two truth-tellers can become so committed to seeing clearly that they leave no room for the blurry, uncertain, still-forming parts of being human. Some truths need gentleness to emerge. If your relationship is all storm and no shelter, certain things will never be said.`,

    question: {
      text: "What truth are you both avoiding—and what would it mean to speak it with tenderness instead of clarity alone?",
      framing: `This question matters because it asks you to look for the truth your shared clarity might be missing, and to consider how that truth might need a different kind of speaking. Sometimes the hardest honesty is being honest about the limits of honesty.`
    }
  },

  "conscience+conscience": {
    thesis: "Two watchmen watching each other—profound vigilance together, but who watches the watchers?",

    distanceAnalysis: `When The Guardian meets The Guardian, the distance between you is zero. You share the same philosophical coordinates: the conviction that someone has to watch the watchers, that dystopia arrives disguised as convenience, that comfort should never override conscience. This is immediate recognition—the relief of meeting someone who also sees the cracks, the hidden costs, the surveillance beneath the service.

But occupying the same position means sharing the same relationship to suspicion—and potentially sharing the same blindness to what's working. Your mutual vigilance can become an echo chamber of critique, each validating the other's distrust without questioning whether permanent suspicion is its own kind of prison. The blind spots you share become invisible, confirmed by mutual agreement.`,

    dynamic: `At its core, this pairing brings together two people who see what others prefer to ignore. Both of you have read the warnings—Orwell, Huxley, Atwood—and you recognize the signs. Both of you understand that every surveillance system was built to help, every authoritarian regime began with popular support.

The dynamic between two Consciences is one of shared vigilance. You can discuss concerns that others dismiss as paranoia, voice suspicions that others find exhausting, watch for patterns that others don't want to see. The other person gets it. They're watching too.

But this same shared vigilance can curdle into mutual cynicism. You both know that you can become so focused on what's wrong that you forget to notice what's working. When two people share this blind spot, neither may see the moments when suspicion is unwarranted, when trust is deserved, when the simplest explanation is the true one. Your mutual watching can create a world where nothing and no one can be trusted—including each other.`,

    align: [
      {
        point: "Watching as responsibility",
        explanation: `Both of you believe that someone has to do this work. The comfortable world is not automatically the good one. While others enjoy the benefits and assume someone else is watching, you both carry the burden of attention. This shared sense of responsibility means neither of you has to feel alone in their vigilance. The watch has two keepers.`
      },
      {
        point: "Pattern recognition as protection",
        explanation: `You both see patterns others miss or prefer not to see—the fine print, the missing names, the cost that doesn't appear on the balance sheet. This isn't paranoia; it's a different relationship to information. You've both learned that convenience often hides control. This shared pattern recognition means your conversations surface what others would rather leave buried.`
      },
      {
        point: "Conscience over comfort",
        explanation: `Both of you have made a choice: you'd rather see clearly and be uncomfortable than be comfortable and blind. This choice has costs—exhaustion, isolation, the weight of watching—but you've both concluded it's worth it. Meeting someone who's made the same choice is a particular kind of recognition.`
      }
    ],

    clash: [
      {
        point: "Watching each other",
        explanation: `When two watchmen pair up, there's a question of trust. Your shared vigilance extends to everyone—potentially including each other. If both of you are looking for cracks, for hidden agendas, for the cost that isn't stated, how do you build trust? Your relationship might become a mutual surveillance state, each watching the other for signs of betrayal. Safe, but suffocating.`
      },
      {
        point: "Cynicism as prison",
        explanation: `You both know your shadow: the version of your vigilance that becomes inability to trust anyone or anything. When two Consciences pair up, you can validate each other's suspicion without checking whether it's warranted. Your shared watching might protect you from genuine threats—or might protect you from genuine connection. Permanent suspicion is exhausting to live inside.`
      }
    ],

    give: {
      youToThem: `You offer validation of their vigilance. Your presence means they're not paranoid—they're accurate. You understand their exhaustion, their isolation, the weight of seeing what others prefer to ignore. In your company, their watching isn't a burden to be apologized for but a responsibility shared. They can finally rest with someone who's also keeping watch.`,
      themToYou: `They offer the same validation back. They watch your back because they understand what you're watching for. They don't dismiss your concerns as excessive or ask you to lighten up. In their company, your vigilance finds its partner. That partnership makes the watching bearable—though it might also make it harder to stop.`
    },

    risk: `The failure mode for two Consciences is mutual exhaustion in service of suspicion. Without someone to remind you what's worth protecting, you can reinforce each other's tendency to see threats everywhere. Your relationship becomes a surveillance partnership that's very good at spotting problems and very bad at noticing joy.

The deeper risk is that you become unable to trust anyone, including each other. Two watchmen watching each other can spiral into mutual suspicion that destroys the relationship from inside. The vigilance that protected you from external threats becomes the threat itself. At some point, someone has to decide to trust—and neither of you is practiced at that.`,

    question: {
      text: "Who watches the watchmen—and what would it mean to choose trust instead of vigilance, even once?",
      framing: `This question matters because it asks you to examine the limits of watching. Your vigilance is valuable, but it can't be the only mode. The question invites you to consider what might be possible if you occasionally set down the burden of surveillance.`
    }
  },

  "embers+embers": {
    thesis: "Two archivists tending the same fire—profound shared memory, but can the archive become a fortress against the future?",

    distanceAnalysis: `When The Keeper meets The Keeper, the distance between you is zero. You share the same philosophical coordinates: the conviction that memory is survival, that acceleration without remembering is just sophisticated forgetting, that the answers aren't in the next technology but in the last ten thousand years. This is immediate recognition—the relief of meeting someone who also guards what came before, who tends the embers so the fire can be relit.

But occupying the same position means sharing the same relationship to the past—and potentially sharing the same hostility toward the future. Your mutual reverence for memory can become an echo chamber of preservation, each validating the other's treasures without questioning whether some of them have become weights. The blind spots you share become invisible, confirmed by mutual agreement.`,

    dynamic: `At its core, this pairing brings together two people who understand that the most dangerous thing about acceleration is amnesia. Both of you carry the conviction that memory is not nostalgia but survival. Both of you know that every generation thinks it invented its problems, and wisdom knows better.

The dynamic between two Keepers is one of shared preservation. You can discuss what deserves to be remembered, what was lost that shouldn't have been, what from history speaks to the present moment. The other person values the same things you've been carrying.

But this same shared reverence can become mutual fortress-building. You both know that you can love what was so deeply that you become hostile to what could be. When two people share this blind spot, the archive becomes a wall against the future rather than a foundation for it. Your mutual treasuring might preserve what's worth keeping—or might preserve what's ready to be released.`,

    align: [
      {
        point: "Memory as survival",
        explanation: `Both of you understand preservation as a form of resistance—against amnesia, against the cult of novelty, against the assumption that progress means forgetting. This shared understanding means neither of you has to justify caring about what came before. The importance of memory is axiomatic for both of you.`
      },
      {
        point: "History as resource",
        explanation: `You both know that the solutions to most problems already exist somewhere in human history. While others reinvent wheels, you both dig for precedent. This shared orientation toward historical wisdom means your conversations draw on depths that novelty-seekers can't access. The past is alive between you.`
      },
      {
        point: "Tending as sacred duty",
        explanation: `The monks in A Canticle for Leibowitz preserved fragments of knowledge through a dark age. You both understand this kind of preservation as calling, not burden. This shared sense of sacred duty means neither of you questions why the other cares so much about what others might discard. You're both keepers of the same kind.`
      }
    ],

    clash: [
      {
        point: "Which memories matter most?",
        explanation: `When two archivists pair up, there's a question of curation. You both value the past, but you might value different parts of it. Your treasures might not align with theirs. This can create conflict precisely because both of you care deeply—disagreements about what to preserve are disagreements about what matters, and neither of you takes those lightly.`
      },
      {
        point: "The archive as fortress",
        explanation: `You both know your shadow: the version of your preservation that becomes hostility to the new. When two Keepers pair up, you can validate each other's reverence without checking whether it's become rigidity. Your shared archive might be a foundation for building—or might be a fortress that keeps the future out. Some memories become chains.`
      }
    ],

    give: {
      youToThem: `You offer honoring of their memories. Your presence means their treasures are recognized, their preservation valued. You don't dismiss what they've been carrying or ask why it matters. In your company, their archiving isn't hoarding; it's care. They can share what they've been guarding with someone who understands its worth.`,
      themToYou: `They offer the same honoring back. They recognize your treasures, respect your preservation, understand why you've been carrying what you've been carrying. In their company, you're not stuck in the past; you're keeping it alive. That mutual recognition creates a shared archive richer than either could build alone.`
    },

    risk: `The failure mode for two Keepers is mutual fortress-building against change. Without someone to challenge your reverence for the past, you can reinforce each other's tendency to treat all innovation as threat, all change as loss. Your relationship becomes a museum that's very good at preserving and very bad at growing.

The deeper risk is that your shared archive becomes a substitute for living. Two keepers of the past can become so focused on what was that they miss what is and what could be. The embers you tend are supposed to light new fires—not just glow in the dark while life moves on without you.`,

    question: {
      text: "What from the future deserves your attention—and what are you preserving that might be ready to be released?",
      framing: `This question matters because it asks you to look forward as well as back. Your shared reverence for the past is valuable, but it can't be the only direction you face. The question invites you to consider what new things might be worth tending.`
    }
  },

  "friction+friction": {
    thesis: "Two who crave difficulty meeting in the arena—profound understanding of struggle, but can friction consume what it was meant to forge?",

    distanceAnalysis: `When The Challenger meets The Challenger, the distance between you is zero. You share the same philosophical coordinates: the conviction that ease is more dangerous than difficulty, that something in us requires resistance, that comfort can be a trap. This is immediate recognition—the relief of meeting someone who doesn't want you to slow down, take it easy, be reasonable.

But occupying the same position means sharing the same relationship to difficulty—and potentially sharing the same inability to rest. Your mutual embrace of friction can become an echo chamber of struggle, each validating the other's restlessness without questioning whether difficulty has become its own addiction. The blind spots you share become invisible, confirmed by mutual agreement.`,

    dynamic: `At its core, this pairing brings together two people who understand that growth requires resistance. Both of you know that the muscles—physical, mental, moral—only strengthen under load. Both of you have concluded that the struggle itself has value beyond what it produces.

The dynamic between two Friction types is one of mutual challenge. Neither of you lets the other get comfortable. Neither of you accepts ease as a goal. This creates a high-energy relationship: together, you push each other toward the next frontier, the next difficulty, the next thing to overcome.

But this same mutual challenge can become mutual destruction. You both know that you can mistake difficulty for meaning—that not everything hard is worth doing. When two people share this blind spot, they can manufacture friction because peace makes them anxious. Your mutual challenge might sharpen both of you—or might wear you both down to nothing.`,

    align: [
      {
        point: "Difficulty as teacher",
        explanation: `Both of you have learned that struggle teaches things that ease cannot. You don't romanticize suffering, but you don't flee from it either. This shared understanding means neither of you has to justify why you chose the hard path. You both know what resistance offers.`
      },
      {
        point: "Comfort as danger",
        explanation: `You both see through the seduction of the easy life. While others optimize for convenience, you both ask what gets lost when nothing is hard. This shared skepticism of comfort means your relationship will never become complacent. Neither of you would let that happen.`
      },
      {
        point: "The frontier as call",
        explanation: `Both of you are drawn to edges—the places where things are difficult, uncertain, demanding. This shared call to the frontier means your relationship will go places that more cautious pairings would avoid. Together, you can face what others won't face.`
      }
    ],

    clash: [
      {
        point: "Competition for difficulty",
        explanation: `When two people both crave friction, there's a question of direction. Your difficulties might pull in opposite ways. And neither of you will choose the easy path of compromise. This can create escalating competition—each pushing the other toward harder challenges, not for growth but for dominance. Your shared love of friction can become a war of attrition.`
      },
      {
        point: "Manufacturing struggle",
        explanation: `You both know your shadow: the version of your difficulty-seeking that becomes masochism. When two Friction types pair up, you can validate each other's restlessness without checking whether it serves anything. Peace feels wrong to both of you—but sometimes peace is what's needed. Your mutual discomfort with ease might keep you struggling when the work is actually learning to receive.`
      }
    ],

    give: {
      youToThem: `You offer the challenge they crave. Your presence means they don't have to slow down, moderate, or pretend they want comfort. You match their intensity, meet their difficulty, push them toward the growth that resistance provides. In your company, their restlessness finds its partner. They can go further because you're going with them.`,
      themToYou: `They offer the same challenge back. They don't let you get comfortable, don't accept your excuses, don't tell you to take it easy. In their company, your difficulty-seeking is met with equal hunger. They understand why you need friction because they need it too. That mutual need creates a relationship that's always moving, always striving, never settling.`
    },

    risk: `The failure mode for two Friction types is mutual exhaustion in service of struggle. Without someone to remind you that rest is allowed, you can reinforce each other's tendency to create difficulty for its own sake. Your relationship becomes an arena where neither person can stop fighting.

The deeper risk is that friction consumes what it was meant to forge. Two people who crave difficulty can destroy each other through escalating challenge, each unable to accept peace because the other won't accept it either. At some point, the work is learning to stop. If neither of you can do that, you'll grind each other down.`,

    question: {
      text: "What difficulty are you creating that isn't necessary—and what would it mean to rest together without feeling like you're surrendering?",
      framing: `This question matters because it asks you to examine the limits of friction. Your shared love of difficulty is valuable, but it can't be the only mode. The question invites you to consider what might be possible if you occasionally chose ease together.`
    }
  },

  "mender+mender": {
    thesis: "Two fixers tending the same broken world—profound shared care, but can repair become a way of avoiding what needs to end?",

    distanceAnalysis: `When The Mender meets The Mender, the distance between you is zero. You share the same philosophical coordinates: the conviction that the most advanced engineering is making what exists work again, that what we have is worth saving before we build something new, that repair is not a lesser form of creation.

But occupying the same position means sharing the same relationship to broken things—and potentially sharing the same blindness to what needs to die. Your mutual commitment to mending can become an echo chamber of repair, each validating the other's fixing without questioning whether some things should be released. The blind spots you share become invisible, confirmed by mutual agreement.`,

    dynamic: `At its core, this pairing brings together two people who see what's broken and reach for tools. Both of you have the stubborn hope that things can be made to work, that decline is not inevitable, that care is a form of resistance against entropy.

The dynamic between two Menders is one of shared labor. You can work side by side on the unglamorous maintenance that others dismiss, the repairs that don't make headlines but keep the world running. Neither of you has to justify why you're fixing instead of replacing.

But this same shared labor can become mutual avoidance of harder choices. You both know that you can become so focused on repair that you miss when something needs to die. When two people share this blind spot, neither may see the moments when mending is actually prolonging suffering, when the kindest thing is to let go. Your mutual fixing might heal what's wounded—or might chain you to what's ready to end.`,

    align: [
      {
        point: "Repair as sacred",
        explanation: `Both of you believe that fixing what's broken is at least as valuable as building something new. This isn't compromise or settling—it's a philosophy. While others chase novelty, you both understand that most of the world runs on maintenance. This shared reverence for repair means neither of you has to justify the unglamorous work of keeping things working.`
      },
      {
        point: "Stubborn hope",
        explanation: `You both refuse the easy cynicism that says things are too broken to fix. Your hope is practical, not naive—it's earned through the experience of making broken things work again. This shared stubbornness means your relationship can face damage without despair. You both know that repair is possible.`
      },
      {
        point: "Care as resistance",
        explanation: `Both of you understand that tending to what exists is a form of resistance against the forces of decay and abandonment. While others build arks and upload consciousness, you both stay and fix. This shared commitment to presence means neither of you is looking for escape. The work is here.`
      }
    ],

    clash: [
      {
        point: "What gets fixed first?",
        explanation: `When two menders pair up, there's a question of triage. You both see what's broken, but you might prioritize differently. Resources for repair are finite. This can create conflict about allocation—whose broken thing matters more, which repairs are urgent and which can wait. Your shared commitment to fixing doesn't automatically align your priorities.`
      },
      {
        point: "Repair as avoidance",
        explanation: `You both know your shadow: the version of your mending that keeps broken things alive when they should be released. When two Menders pair up, you can validate each other's fixing without checking whether it's serving the broken thing or serving your need to repair. Some systems are broken because they should be broken. Your mutual labor might be kindness or might be denial.`
      }
    ],

    give: {
      youToThem: `You offer appreciation of their repairs. Your presence means their mending is seen and valued. You don't ask why they're not building something new instead. In your company, their fixing isn't settling for less; it's doing what matters. They can share the weight of repair with someone who understands its worth.`,
      themToYou: `They offer the same appreciation back. They see your repairs, understand your labor, value your stubborn hope. In their company, you're not wasting time on lost causes; you're doing the essential work of keeping things working. That mutual recognition turns lonely labor into shared purpose.`
    },

    risk: `The failure mode for two Menders is mutual enabling of repair addiction. Without someone to ask "should this be fixed or should it end?", you can reinforce each other's tendency to keep mending things that have served their purpose. Your relationship becomes a workshop where everything gets fixed and nothing gets released.

The deeper risk is that repair becomes a way of avoiding grief. Some things are broken because they're ending. Two Menders can keep each other busy with fixes that postpone the necessary death, the letting go, the space that release creates for something new. At some point, the kindest repair is no repair at all.`,

    question: {
      text: "What are you both avoiding by always fixing—and what might need to be released instead of repaired?",
      framing: `This question matters because it asks you to look at the limits of mending. Your shared commitment to repair is valuable, but it can't be the only response to brokenness. The question invites you to consider what might become possible if you stopped fixing something together.`
    }
  },

  "presence+presence": {
    thesis: "Two keepers of attention in the same room—profound mutual presence, but who moves when movement is needed?",

    distanceAnalysis: `When The Present meets The Present, the distance between you is zero. You share the same philosophical coordinates: the conviction that undivided attention is the most valuable thing you can give, that efficiency is often the enemy of depth, that most problems are really loneliness in disguise. This is immediate recognition—the relief of meeting someone who also shows up fully, who knows the difference between capability and care.

But occupying the same position means sharing the same relationship to being present—and potentially sharing the same avoidance of action. Your mutual commitment to showing up can become an echo chamber of holding space, each validating the other's stillness without questioning whether presence has become paralysis. The blind spots you share become invisible, confirmed by mutual agreement.`,

    dynamic: `At its core, this pairing brings together two people with unusual capacity to actually be in the room. Both of you register what others miss because you're not protecting yourselves from it. Both of you know that in a world optimized for productivity, pure attention is a radical act.

The dynamic between two Presences is one of mutual witnessing. You hold space for each other. Neither of you rushes the other toward resolution. This creates a rare quality of attention: together, you can be present to things that others would speed past.

But this same mutual witnessing can become mutual stagnation. You both know that you can use care as a way to avoid confrontation—that staying in the room is not always the brave choice. When two people share this blind spot, neither may say the thing that breaks the connection in order to tell the truth. Your mutual presence might be a gift—or might be a way of avoiding the rupture that growth requires.`,

    align: [
      {
        point: "Attention as offering",
        explanation: `Both of you understand that showing up fully is itself a gift. You don't need to fix, solve, or change—sometimes the work is simply being present to what is. This shared understanding means neither of you has to justify why you're not doing more. Presence is already doing.`
      },
      {
        point: "Depth over efficiency",
        explanation: `You both reject the cultural pressure to optimize, accelerate, get more done. Some things can't be rushed. Some connections require simply being in them without trying to improve them. This shared patience means your time together has a different quality—slower, deeper, more attentive.`
      },
      {
        point: "Care as the point",
        explanation: `Both of you know the difference between capability and care. Technology can do many things; it can't replace the particular texture of being seen. This shared understanding means your relationship prioritizes something that the efficiency-minded world undervalues: the simple act of showing up for another person.`
      }
    ],

    clash: [
      {
        point: "Who moves first?",
        explanation: `When two people are both practiced at holding space, there's a question of action. Neither of you wants to break the presence by doing something. This can create a relationship that's very good at being together and very slow to move—pleasant, attentive, and potentially stuck. Your shared stillness can become shared paralysis.`
      },
      {
        point: "Presence as avoidance",
        explanation: `You both know your shadow: the version of your presence that becomes refusal to confront. When two Presences pair up, you can validate each other's holding space without checking whether the space needs something said into it. Your mutual care might be exactly what's needed—or might be protecting both of you from the rupture that truth requires.`
      }
    ],

    give: {
      youToThem: `You offer the attention they offer others. Being the one who shows up fully is often lonely—you're always giving presence but rarely receiving it. In your company, they can finally be held as they hold others. They can receive the quality of attention they've been giving.`,
      themToYou: `They offer the same attention back. They see you, really see you, without trying to fix or change or rush you. In their company, you receive what you usually give. That reciprocity is its own kind of repair—the experience of being fully witnessed by someone who knows what that requires.`
    },

    risk: `The failure mode for two Presences is mutual paralysis disguised as care. Without someone to push toward action, you can reinforce each other's tendency to hold space indefinitely while nothing changes. Your relationship becomes very present and very still—but stillness isn't always what's needed.

The deeper risk is that presence becomes avoidance. Two Keepers can become so committed to showing up that they never say the thing that would rupture the connection. Some truths break presence before they heal it. If neither of you is willing to speak those truths, certain things will remain unaddressed in your beautifully attentive silence.`,

    question: {
      text: "What action have you both been avoiding—and what would need to be said that neither of you has been willing to say?",
      framing: `This question matters because it asks you to look beyond presence toward what presence might be avoiding. Your shared capacity for attention is valuable, but it can't be the only offering. The question invites you to consider what might need to happen, not just be witnessed.`
    }
  },

  "rooted+rooted": {
    thesis: "Two in stillness together—profound peace between you, but who makes the first move when movement is necessary?",

    distanceAnalysis: `When The Rooted meets The Rooted, the distance between you is zero. You share the same philosophical coordinates: the conviction that the most radical thing you can do is stop and mean it, that human beings are not problems to be optimized, that sometimes the answer to "what should I do?" is genuinely "nothing." This is immediate recognition—the relief of meeting someone who doesn't need you to justify your stillness or defend your choice to stay.

But occupying the same position means sharing the same relationship to stopping—and potentially sharing the same avoidance of starting. Your mutual stillness can become an echo chamber of peace, each validating the other's rootedness without questioning whether it has become withdrawal. The blind spots you share become invisible, confirmed by mutual agreement.`,

    dynamic: `At its core, this pairing brings together two people who have chosen stillness in a world that treats acceleration as virtue. Both of you have made a different choice. Both of you understand that "more" and "faster" and "bigger" are not always better.

The dynamic between two Rooteds is one of shared peace. Neither of you pushes the other to move, achieve, produce. There's no need to justify staying put. This creates a rare quality of rest: together, you can simply be without the pressure to become.

But this same shared peace can become mutual stagnation. You both know that stillness can look like withdrawal, that choosing to stop is a luxury not everyone can afford. When two people share this position, neither may notice when peace has become hiding, when rootedness has become refusal. Your shared stillness might be wisdom—or might be a way of avoiding the difficulty of engagement.`,

    align: [
      {
        point: "Stillness as radical choice",
        explanation: `Both of you have concluded that stopping is not failure. This isn't laziness or passivity—it's a position, argued and defended against a culture that treats motion as the only measure of value. In each other's company, this choice is recognized and honored rather than questioned.`
      },
      {
        point: "Enough as arrival",
        explanation: `You both understand that what you need is often already here, if you stop reaching for more. While others optimize endlessly, you both have found a way to say "this is enough." This shared capacity for satisfaction means neither of you pulls the other toward more, faster, better. You can rest together.`
      },
      {
        point: "Simplicity as wisdom",
        explanation: `Both of you have chosen simplicity not because you couldn't handle complexity, but because you've concluded it serves you better. This shared choice means your life together doesn't need to be complicated to be meaningful. The simple things have weight between you.`
      }
    ],

    clash: [
      {
        point: "Neither wants to push",
        explanation: `When two people are both rooted in stillness, there's a question of initiative. Neither of you is inclined to push for change, movement, or new direction. This can create a relationship that's very peaceful and very static—beautiful in its stillness but potentially unable to respond when response is needed. Inertia can become comfortable.`
      },
      {
        point: "Stillness as withdrawal",
        explanation: `You both know your shadow: the version of your stillness that becomes refusal to engage with what needs you. When two Rooteds pair up, you can validate each other's peace without checking whether it's wisdom or withdrawal. Your mutual stillness might be grounded presence—or might be two people hiding together while the world needs them elsewhere.`
      }
    ],

    give: {
      youToThem: `You offer validation of their stillness. Your presence means they don't have to defend their choice to stop. You understand why they've planted themselves here and you don't ask them to move. In your company, their rootedness is met with rootedness. They can rest without explanation.`,
      themToYou: `They offer the same validation back. They don't question your stillness, don't ask what you're achieving, don't measure you by motion. In their company, you're not failing to progress; you're choosing to stay. That mutual acceptance creates a rare kind of peace—the experience of being with someone who knows that stopping is sometimes the bravest choice.`
    },

    risk: `The failure mode for two Rooteds is mutual stagnation disguised as wisdom. Without someone to push toward movement, you can reinforce each other's tendency to stay still indefinitely. Your relationship becomes very peaceful and very stuck—a beautiful garden that no one tends because neither of you wants to disturb the peace.

The deeper risk is that your shared stillness becomes withdrawal from life. Two Rooted people can become so comfortable in their peace that they stop responding to what needs them. The world is not static; sometimes movement is required. If neither of you can initiate that movement, you may find yourselves still and peaceful while opportunities for meaningful engagement pass you by.`,

    question: {
      text: "What are you both avoiding by staying still—and what would it mean to move together when movement is needed?",
      framing: `This question matters because it asks you to look at the limits of stillness. Your shared rootedness is valuable, but it can't be the only mode. The question invites you to consider what might require you to uproot together.`
    }
  },

  "shaper+shaper": {
    thesis: "Two builders in perpetual construction—profound shared momentum, but can you stop redesigning long enough to finish?",

    distanceAnalysis: `When The Builder meets The Builder, the distance between you is zero. You share the same philosophical coordinates: the conviction that the moment you stop adapting you start calcifying, that the future is something you build with whatever is at hand, that every crisis is a construction site if you know how to look. This is immediate recognition—the relief of meeting someone who also sees rubble as raw material, endings as beginnings, collapse as opportunity.

But occupying the same position means sharing the same relationship to change—and potentially sharing the same inability to maintain. Your mutual drive to build can become an echo chamber of construction, each validating the other's restlessness without questioning whether movement has become its own addiction. The blind spots you share become invisible, confirmed by mutual agreement.`,

    dynamic: `At its core, this pairing brings together two people who can move when movement matters most. Both of you understand, at a cellular level, that everything is always changing. Fighting that reality wastes energy better spent shaping what emerges.

The dynamic between two Shapers is one of mutual propulsion. Neither of you slows the other down. Neither of you asks "but what about what's already here?" This creates high-velocity collaboration: together, you can build at speeds that more cautious pairings would find reckless.

But this same mutual propulsion can become mutual destruction. You both know that movement can become its own addiction—that tearing something down feels like progress even when it isn't. When two people share this blind spot, neither may see the moments when revolution isn't needed, when what exists is worth maintaining, when the thrill of starting over masks a fear of the slower work of repair. Your mutual building might create something lasting—or might be endless reconstruction that never arrives anywhere.`,

    align: [
      {
        point: "Change as truth",
        explanation: `Both of you have aligned with the fact that everything is always changing. This isn't pessimism or restlessness—it's realism. Resisting change wastes energy; shaping change gives you leverage. In each other's company, this orientation is understood rather than questioned.`
      },
      {
        point: "Crisis as opportunity",
        explanation: `You both see construction sites where others see disaster. When things fall apart, you're both already sketching what comes next. This shared capacity for building from rubble means neither of you is paralyzed by collapse. You know what to do when everything is ending.`
      },
      {
        point: "Adaptation as intelligence",
        explanation: `Both of you believe that the capacity to adapt is itself a form of wisdom. While others cling to what was, you both orient toward what could be. This shared adaptability means your relationship can survive changes that would break more rigid pairings.`
      }
    ],

    clash: [
      {
        point: "Two visions, one project",
        explanation: `When two builders try to build together, there's an immediate question: whose blueprint? You both see what could be built, but you might see different things. Neither of you is inclined to defer, compromise, or maintain someone else's structure. This can create competing construction projects that tear down each other's work as fast as it's built.`
      },
      {
        point: "Movement as escape",
        explanation: `You both know your shadow: the version of your building that's actually running away. When two Shapers pair up, you can validate each other's restlessness without checking whether it's generative. Your mutual construction might be building the future—or might be two people who can't stop moving long enough to face what they're avoiding.`
      }
    ],

    give: {
      youToThem: `You offer the momentum they thrive on. Your presence means they don't have to slow down for someone who can't keep up. You understand their need to build, their frustration with stasis, their conviction that the future is made rather than waited for. In your company, their restlessness finds its match.`,
      themToYou: `They offer the same momentum back. They match your pace, share your vision that things can be different, understand why you can't just sit with what is. In their company, you're not reckless or impatient; you're two people building the future at the speed it requires.`
    },

    risk: `The failure mode for two Shapers is perpetual construction that never completes. Without someone to say "this is good enough, let's stop building," you can reinforce each other's tendency to tear down and rebuild endlessly. Your relationship becomes a construction site that never becomes a building.

The deeper risk is that you tear down each other's work. Two Shapers may find that their visions compete rather than complement. What one builds, the other wants to redesign. Your mutual capacity for change can turn your relationship into a war zone of competing constructions, each person's progress undone by the other's need to build differently.`,

    question: {
      text: "What would you build if you had to agree on every detail—and what have you torn down that deserved to stand?",
      framing: `This question matters because it asks you to consider both the collaborative potential and the destructive risk of your shared capacity for change. The first part invites cooperation; the second asks you to examine what your restlessness might have cost.`
    }
  },

  "swimmer+swimmer": {
    thesis: "Two in deep water together—profound shared capacity for questions, but can you surface long enough to act?",

    distanceAnalysis: `When The Deep meets The Deep, the distance between you is zero. You share the same philosophical coordinates: the conviction that the best questions are the ones that can't be fully answered, that certainty is usually a sign something is being ignored, that understanding matters more than solving. This is immediate recognition—the relief of meeting someone who also sits with uncertainty, who won't rush you toward answers, who knows that not-knowing can be a form of rigor.

But occupying the same position means sharing the same relationship to questions—and potentially sharing the same avoidance of answers. Your mutual depth can become an echo chamber of inquiry, each validating the other's uncertainty without questioning whether sitting with questions has become a way of avoiding the commitment of choice. The blind spots you share become invisible, confirmed by mutual agreement.`,

    dynamic: `At its core, this pairing brings together two people who can hold questions without grasping for answers. Both of you have the rare capacity to stay in uncertainty, to resist the cultural pressure toward confident resolution.

The dynamic between two Swimmers is one of shared inquiry. You can question together indefinitely—diving into depths that others would find frightening, holding ambiguity that others would need to resolve. Neither of you rushes the other toward conclusions.

But this same shared inquiry can become mutual paralysis. You both know that not-knowing can become its own cowardice—that waiting for certainty can be a way of avoiding the risk of being wrong. When two people share this blind spot, neither may push toward decision. Your mutual depth might be genuine inquiry—or might be two people using philosophical rigor as an excuse to never commit to anything.`,

    align: [
      {
        point: "Questions as home",
        explanation: `Both of you have learned to live inside questions rather than rushing through them to answers. This isn't indecision—it's a different relationship to knowledge. You've both concluded that premature certainty does more harm than sustained inquiry. In each other's company, this orientation is understood as rigor, not avoidance.`
      },
      {
        point: "Depth over speed",
        explanation: `You both reject the pressure to answer quickly, to have opinions ready, to know where you stand. Understanding takes time. Some questions deserve years, not minutes. This shared patience for depth means your conversations can go places that surface-level exchanges never reach.`
      },
      {
        point: "Comfort with mystery",
        explanation: `Both of you have made peace with the fact that some things resist understanding. Lem's Solaris, the conscious ocean that refuses to be known, is a kind of sacred text for you both. You don't need to resolve every mystery to engage with it. This shared comfort means neither of you forces closure on what needs to remain open.`
      }
    ],

    clash: [
      {
        point: "Infinite regression",
        explanation: `When two people are both comfortable with questions, there's a risk of endless recursion. Every answer opens new questions, and neither of you is inclined to say "enough, let's decide." This can create a relationship that's very thoughtful and very stuck—perpetually inquiring without ever arriving at anything actionable.`
      },
      {
        point: "Questions as avoidance",
        explanation: `You both know your shadow: the version of your inquiry that becomes paralysis. When two Swimmers pair up, you can validate each other's not-knowing without checking whether it's genuine uncertainty or fear of commitment. Your mutual depth might be wisdom—or might be two people hiding from decision in an ocean of questions.`
      }
    ],

    give: {
      youToThem: `You offer companionship in the deep water. Your presence means they're not alone in their questions, not weird for wanting to understand before acting. You go deeper together than either could alone. In your company, their inquiry isn't slowness or avoidance; it's the serious engagement with complexity that it actually is.`,
      themToYou: `They offer the same companionship back. They don't rush you toward conclusions, don't judge your uncertainty, don't ask why you can't just decide. In their company, you can swim in questions without the pressure to surface. That shared depth creates a rare space for genuine inquiry.`
    },

    risk: `The failure mode for two Swimmers is mutual drowning in questions. Without someone to push toward decision, you can reinforce each other's tendency to stay in uncertainty indefinitely. Your relationship becomes very thoughtful and very passive—endless inquiry that never becomes action.

The deeper risk is that questions become a substitute for living. Two Swimmers can become so comfortable in uncertainty that they never commit to anything—careers, relationships, positions, choices. At some point, life requires bets. If neither of you can make them, you may find yourselves still questioning while life passes you by.`,

    question: {
      text: "What question have you been circling together—and what would it mean to decide something, even knowing you might be wrong?",
      framing: `This question matters because it asks you to look at the limits of inquiry. Your shared capacity for questions is valuable, but it can't be the only mode. The question invites you to consider what might become possible if you occasionally surfaced long enough to act.`
    }
  },

  "unbound+unbound": {
    thesis: "Two transcenders reaching past the same edges—profound shared vision of beyond, but who stays grounded enough to bring anything back?",

    distanceAnalysis: `When The Transcendent meets The Transcendent, the distance between you is zero. You share the same philosophical coordinates: the conviction that the boundaries of self, body, and species are not fixed, that what we call "human" is a starting point rather than a destination, that transcendence is a serious possibility. This is immediate recognition—the relief of meeting someone who also reaches past the edges, who takes seriously what others dismiss as fantasy or threat.

But occupying the same position means sharing the same relationship to transcendence—and potentially sharing the same disconnection from what's here. Your mutual reaching can become an echo chamber of escape, each validating the other's yearning for beyond without questioning whether that yearning has become flight from the present. The blind spots you share become invisible, confirmed by mutual agreement.`,

    dynamic: `At its core, this pairing brings together two people who imagine beyond current limits. Both of you take seriously possibilities that others find frightening or irrelevant—the uploading of consciousness, the transcendence of species, the expansion of mind past body.

The dynamic between two Unbounds is one of shared vision. You can discuss posthuman futures, question the boundaries of self, explore what might lie beyond form—without having to justify why these questions matter. The other person already knows.

But this same shared vision can become mutual flight. You both know that transcendence can be another word for escape—that the desire to leave the body can mask a desire to flee human vulnerability, connection, limitation. When two people share this blind spot, neither may notice when reaching for beyond has become running from here. Your mutual vision might be genuine exploration—or might be two people who can't be present to the particular, limited, embodied life they're actually living.`,

    align: [
      {
        point: "Boundaries as starting points",
        explanation: `Both of you have concluded that the limits of self, body, and identity are not fixed but permeable, potentially transcendable. This isn't escapism—it's taking seriously what evolution, technology, and philosophy suggest about what we might become. In each other's company, this orientation is engaged rather than dismissed.`
      },
      {
        point: "Transcendence as possibility",
        explanation: `You both take seriously futures that others find threatening—the Sublime, the upload, the expansion of mind past body. Clarke's Childhood's End, Egan's Diaspora, Banks' Hydrogen Sonata—these aren't dystopias for you. They're possibilities worth considering. This shared openness to radical change means your conversations can go places others would refuse to follow.`
      },
      {
        point: "The interesting questions",
        explanation: `Both of you are drawn to questions that challenge assumptions about what we are. Identity, consciousness, the boundaries of mind—these fascinate both of you. This shared orientation toward the most fundamental questions creates a particular kind of intellectual intimacy.`
      }
    ],

    clash: [
      {
        point: "Where do you land?",
        explanation: `When two people are both reaching past limits, there's a question of grounding. Neither of you is particularly attached to what's here. This can create a relationship that floats beautifully toward beyond without ever touching down—two people dreaming of transcendence while their actual lives remain unattended.`
      },
      {
        point: "Transcendence as flight",
        explanation: `You both know your shadow: the version of your reaching that's actually running. When two Unbounds pair up, you can validate each other's yearning for beyond without checking whether it's genuine exploration or escape from intimacy, vulnerability, the difficult particulars of embodied life. Your mutual vision might be expansion—or might be two people who can't stay present to what's here.`
      }
    ],

    give: {
      youToThem: `You offer understanding of their reaching. Your presence means they don't have to defend their yearning for beyond, explain why they can't be satisfied with what's here. You understand the call of transcendence because you hear it too. In your company, their imagination isn't weird or escapist; it's met with equal imagination.`,
      themToYou: `They offer the same understanding back. They don't judge your yearning, don't ask why you can't just be present, don't treat your interest in transcendence as avoidance. In their company, you can reach past edges together. That shared reaching creates a particular kind of companionship—two people exploring the same beyond.`
    },

    risk: `The failure mode for two Unbounds is mutual flight from the embodied life you're actually living. Without someone grounded enough to call you back, you can reinforce each other's tendency to dream of beyond while neglecting here. Your relationship becomes a shared escape pod that never lands anywhere.

The deeper risk is that transcendence becomes a substitute for intimacy. Two Unbounds can become so focused on what's beyond that they never actually meet in the present—two people reaching past each other toward something that doesn't require the vulnerability of actually being here together. The body you're both eager to transcend is also the body that feels connection. Some things may not translate to the beyond you're reaching for.`,

    question: {
      text: "What would ground you both without limiting you—and what intimacy might you be avoiding by always reaching for beyond?",
      framing: `This question matters because it asks you to consider both what you need to stay connected to and what your reaching might be protecting you from. The first part honors your shared vision; the second invites you to look at what might be getting lost.`
    }
  },

  // ===== OPPOSITE-ARCHETYPE PAIRS (8 total) =====
  // These pairs sit at maximum philosophical distance (distance > 1.0)

  "embers+shaper": {
    thesis: "One builds to change the world; the other guards to preserve it. The future and the past, locked in permanent negotiation.",

    distanceAnalysis: `The Keeper and The Builder occupy opposite ends of a fundamental axis: time orientation. The Builder lives in the future tense, already imagining what comes next, treating the present as raw material for transformation. The Keeper lives in the past tense, already remembering what came before, treating the present as a thread in an unbroken line of inheritance. This isn't merely a difference in preference—it's a difference in what each believes matters most about being human.

The distance between you maps onto one of philosophy's oldest tensions: preservation versus transformation. The Builder asks "what can we build?" while the Keeper asks "what must we not lose?" These questions sound compatible until resources are scarce—until the Shaper needs to demolish the old building to make room for the new one, until the Keeper realizes the only way to preserve something is to prevent its replacement. Then the fundamental incompatibility reveals itself: you're not just prioritizing differently. You're operating from different definitions of progress.`,

    dynamic: `At its core, this pairing creates a permanent argument about what deserves to survive. The Builder sees change as life itself—"adapt or calcify" is their motto. Stagnation is death. The moment you stop building, you start dying. The Keeper sees memory as life itself—without continuity, there is no identity, no wisdom, no foundation. The moment you stop remembering, you've already lost.

This makes every shared decision a negotiation across this gap. When the Shaper proposes tearing something down to build anew, the Keeper experiences it as violence against meaning. When the Keeper proposes preserving what exists, the Shaper experiences it as surrender to entropy. Neither is wrong. Both are seeing something real. The Builder is right that clinging to the past can become its own death—the archive as mausoleum. The Keeper is right that endless revolution can become its own amnesia—the construction site that builds the same mistakes with different names.

The gift of this pairing is that it forces both of you to defend your instincts, to articulate what you're actually protecting or pursuing. The Builder, challenged by the Keeper, must answer: "What wisdom am I discarding in my rush to build? What has been tried before? What failed, and why?" The Keeper, challenged by the Shaper, must answer: "What am I preserving out of genuine value versus mere familiarity? When did this tradition serve people, and does it still?" These are questions neither would ask alone.`,

    align: [
      {
        point: "Both believe something matters beyond the immediate moment",
        explanation: `Despite your opposing time orientations, you share a conviction that the present moment is not self-justifying. The Builder builds for a future they may never see; the Keeper preserves for descendants who will never thank them. Both of you are working for something larger than yourselves, something that extends beyond your individual lifespans. This shared sense of being part of a larger story—even if you disagree about which direction the story goes—creates unexpected common ground.`
      },
      {
        point: "Both take stewardship seriously",
        explanation: `Whether you're building or preserving, you both understand yourselves as stewards rather than owners. The Builder isn't building for ego gratification but because they believe the built thing will serve something larger. The Keeper isn't preserving for nostalgia but because they believe the preserved thing carries wisdom that must survive them. This shared sense of responsibility—the understanding that what you do matters for people you'll never meet—connects you across your differences.`
      }
    ],

    clash: [
      {
        point: "What counts as progress",
        explanation: `This is the fundamental disagreement: the Shaper believes progress means building something new, while the Keeper believes progress means not losing something old. When the Shaper looks at a crumbling institution and sees raw material for transformation, the Keeper sees wisdom being abandoned. When the Keeper looks at an ancient practice being preserved and sees cultural continuity, the Shaper sees calcification preventing growth. You're not just disagreeing about tactics—you're disagreeing about what "better" means.`
      },
      {
        point: "The value of disruption",
        explanation: `The Builder believes disruption can be generative—that breaking the old system is sometimes the necessary first step toward building a better one. The Keeper believes disruption destroys faster than it creates—that the Shaper's confidence in building from rubble ignores how much was lost in the demolition. This clash often plays out in specific decisions: whether to reform an institution or replace it, whether to adapt a tradition or preserve it unchanged, whether change should be incremental or revolutionary.`
      },
      {
        point: "What gets sacrificed",
        explanation: `The Builder is willing to sacrifice continuity for transformation. The Keeper is willing to sacrifice innovation for preservation. Each believes the other's sacrifice is too costly. The Builder watches the Keeper defend traditions that seem to have outlived their usefulness and sees resources wasted on the already-dead. The Keeper watches the Shaper discard practices that carry accumulated wisdom and sees irreplaceable knowledge being thrown away. Both sacrifices are real. Both losses are real.`
      }
    ],

    give: {
      youToThem: `You offer the Shaper roots. Their instinct is to build from scratch, but scratch doesn't exist—everything is built on something. You remind them what that something is. You carry the memory of what was tried before, what worked and what failed, what patterns repeat across generations. Without you, the Shaper risks building beautiful structures on foundations that have already proven unstable. You're not trying to stop them from building; you're trying to ensure they don't build the same collapses again.`,
      themToYou: `They offer you liberation from the weight of the past. Your instinct is to preserve, but not everything old is worth keeping—some traditions were always unjust, some practices have been superseded by better ones, some memories are chains. The Builder challenges you to distinguish between genuine wisdom and mere familiarity, between traditions that serve and traditions that suffocate. They remind you that the embers you tend are supposed to light new fires, not just glow in the dark.`
    },

    risk: `The failure mode of this pairing is mutual contempt disguised as principle. The Builder starts seeing the Keeper as a reactionary obstacle, someone too attached to what was to imagine what could be. The Keeper starts seeing the Shaper as a reckless destroyer, someone too intoxicated by change to appreciate what's being lost. The argument shifts from productive tension to positional warfare, where each is defending their identity rather than engaging with the other's actual concerns.

The deeper risk is that you stop listening to what's valid in the other's perspective. The Builder stops asking "what should be preserved?" The Keeper stops asking "what needs to change?" At that point, you're no longer complementing each other—you're just two people locked in opposition, each becoming a more extreme version of themselves because the other represents everything they reject.`,

    question: {
      text: "What would it look like to build something new that carries forward what matters most from what came before—and how would you decide together what 'matters most' means?",
      framing: `This question matters because it refuses the false binary between preservation and transformation. It asks you to imagine a synthesis that honors both orientations—and, crucially, to negotiate together what deserves that honor. The answer can't come from either perspective alone.`
    }
  },

  "rooted+shaper": {
    thesis: "Stillness meets perpetual motion. One asks 'why are we running?' while the other asks 'why are we standing still?'",

    distanceAnalysis: `The Rooted and The Builder sit at maximum philosophical distance because they embody opposite answers to a fundamental question: what is the relationship between action and meaning? The Builder believes meaning emerges from creation—you matter because you build, transform, leave marks on the world. The Rooted believes meaning exists independent of action—you matter simply by being present, by refusing the cultural imperative to always produce more.

This isn't a difference that can be resolved by finding the right balance. The Builder genuinely believes that stopping is a form of dying—that the person who stops building is calcifying, surrendering to entropy. The Rooted genuinely believes that constant building is a form of fleeing—that the person who can't stop is running from something they refuse to face. Each experiences the other's way of being as not just different but fundamentally mistaken about what life is for.`,

    dynamic: `At its core, this pairing forces a confrontation with one of modernity's deepest assumptions: that productivity equals worth. The Builder has internalized this equation, not thoughtlessly but philosophically—they believe that humans are creative beings who flourish through making, that our unique gift is the ability to reshape the world. The Rooted has rejected this equation, also not thoughtlessly but philosophically—they believe the equation is a trap, that the compulsion to always produce more is a cultural sickness disguised as virtue.

When these two meet, the Shaper sees the Rooted as someone who has given up—not peaceful but defeated, not wise but retreated. The Rooted sees the Shaper as someone who can't face stillness—not creative but compulsive, not building toward something but running from themselves. Both are seeing something real. The Builder is right that the Rooted's stillness can become withdrawal, a way of avoiding engagement with a world that needs changing. The Rooted is right that the Shaper's motion can become flight, a way of avoiding presence with a life that needs living.

The gift of this tension is that it forces each of you to examine your own relationship with action. The Builder must ask: "Am I building because it serves something, or because I can't bear to stop?" The Rooted must ask: "Am I still because it's the wise choice, or because I'm afraid to move?" These questions only arise when you're in genuine dialogue with someone who embodies the opposite answer.`,

    align: [
      {
        point: "Both have chosen deliberately",
        explanation: `Neither of you arrived at your position by accident or passivity. The Builder didn't become a builder because they couldn't imagine anything else—they chose building after considering alternatives. The Rooted didn't become still because they failed at motion—they chose stillness after experiencing its opposite. This shared sense of deliberate choice, of having arrived at your position through thought rather than drift, creates an unexpected respect across your differences. You may disagree about conclusions, but you recognize someone who has actually thought about it.`
      },
      {
        point: "Both reject the default",
        explanation: `The default in modern culture is neither pure motion nor pure stillness—it's anxious oscillation, busy without purpose, resting without presence. The Builder rejects this by committing fully to creation. The Rooted rejects this by committing fully to presence. In your different ways, you've both said "no" to the hollow productivity that passes for meaning in most lives. This shared rejection of the cultural default connects you, even as you've chosen opposite alternatives to it.`
      }
    ],

    clash: [
      {
        point: "What constitutes a life well-lived",
        explanation: `The Builder measures a life by what it creates, transforms, leaves behind. When they imagine their final days, they want to look back on a world they've changed. The Rooted measures a life by its quality of presence, its depth of being. When they imagine their final days, they want to have actually lived the days they were given. These are genuinely different visions of flourishing, and they create friction whenever you must make shared decisions about how to spend limited time and energy.`
      },
      {
        point: "The meaning of rest",
        explanation: `For the Shaper, rest is instrumental—you rest to build better tomorrow. Stillness without purpose is wasted time, life unlived. For the Rooted, rest is meaningful in itself—you don't rest for something, you rest as a way of being fully present. The Builder's instrumental view of rest feels hollow to the Rooted; the Rooted's end-in-itself view of rest feels lazy to the Shaper. Neither can understand why the other can't see something so obvious.`
      },
      {
        point: "Response to problems",
        explanation: `When something is wrong, the Shaper's instinct is to fix it—to build, change, transform. Sitting with a problem feels like defeat. The Rooted's instinct is to understand it first—to be present to what is rather than immediately reaching for what should be. Acting without understanding feels like avoidance. This clash shows up constantly: the Shaper thinks the Rooted is passively accepting what should be changed; the Rooted thinks the Shaper is anxiously doing to avoid simply being.`
      }
    ],

    give: {
      youToThem: `You offer the Shaper permission to stop. Their culture has told them that worth comes from production, that rest is for the depleted, that stillness is stagnation. You model a different possibility: that a human being is not a productivity machine, that stopping can be a choice rather than a failure, that there is something valuable in simply being present that cannot be achieved through constant doing. You don't invalidate their building—you remind them there's something worth building for, and it requires presence to appreciate.`,
      themToYou: `They offer you the challenge of engagement. Your stillness is real and valuable, but it exists in a world where things are broken, where people are suffering, where some problems require action to address. The Builder reminds you that presence without engagement can become withdrawal, that the monk on the mountain didn't solve the suffering in the valley. They challenge you to distinguish between stillness as wisdom and stillness as hiding from the difficult work of changing what needs changing.`
    },

    risk: `The failure mode of this pairing is mutual dismissal. The Builder stops taking the Rooted seriously—sees them as someone who has retreated from real life, whose "wisdom" is actually just dressed-up surrender. The Rooted stops taking the Shaper seriously—sees them as someone trapped in compulsion, whose "creativity" is actually just anxious flight from themselves. At this point, you're no longer learning from each other—you're just confirming your existing worldviews by having someone to reject.

The deeper risk is that you each become more extreme in reaction to the other. The Builder, confronted with someone who questions productivity itself, doubles down on building to prove their life has meaning. The Rooted, confronted with someone who won't stop moving, retreats further into stillness to prove they don't need to. Instead of the productive tension that could help both of you grow, you end up reinforcing each other's blind spots.`,

    question: {
      text: "What would it look like to act from stillness rather than despite it—to build something worth building precisely because you've stopped long enough to know what matters?",
      framing: `This question matters because it points toward a synthesis that neither perspective can reach alone. It asks whether creation and presence might not be opposites but complements—whether the deepest building might emerge from the deepest stillness, and whether true presence might include engaged action.`
    }
  },

  "friction+rooted": {
    thesis: "One chose stillness. The other craves difficulty. Are they describing the same peace from opposite directions, or fundamentally different lives?",

    distanceAnalysis: `The Challenger and The Rooted occupy opposite positions on the axis of engagement with resistance. The Friction-seeker believes that meaning emerges from struggle—that ease is more dangerous than difficulty, that something essential in us requires opposition to stay alive. The Rooted believes that meaning exists in presence—that the compulsion toward struggle can be its own trap, that stopping is sometimes the bravest and most meaningful choice.

What makes this distance so profound is that each sees the other's core value as the thing they've deliberately rejected. The Friction-seeker has rejected ease because they believe it leads to atrophy of the soul. The Rooted has rejected struggle for its own sake because they believe it becomes an addiction that prevents presence. When you meet, you're not just encountering different preferences—you're encountering someone who has thought carefully about your deepest value and concluded it's a mistake.`,

    dynamic: `At its core, this pairing creates a fundamental argument about what human beings actually need. The Friction-seeker believes we need resistance—that muscles only strengthen under load, that growth requires challenge, that ease slowly kills the capacity for engagement. The Rooted believes we need presence—that the compulsion to always struggle prevents us from being where we are, that rest is not failure but completion, that there is something valuable in simply being that effort cannot achieve.

The dynamic between you is one of mutual bewilderment that can become mutual provocation. The Friction-seeker looks at the Rooted and genuinely cannot understand why someone would choose stillness when they could choose difficulty. Don't they feel the atrophy? The emptiness? The Rooted looks at the Friction-seeker and genuinely cannot understand why someone would seek struggle when they could find peace. Don't they feel the exhaustion? The flight?

But this mutual bewilderment can also become mutual illumination. The Friction-seeker, in conversation with the Rooted, may discover that their craving for difficulty has become compulsive—that they seek struggle not because it serves them but because they don't know how to stop. The Rooted, in conversation with the Friction-seeker, may discover that their stillness has become avoidance—that they've chosen peace not because it's wise but because engagement feels too hard.`,

    align: [
      {
        point: "Both have rejected the default busyness",
        explanation: `Modern life offers a third option that neither of you has chosen: anxious productivity without meaningful challenge, motion without purpose, busy-ness that is neither true struggle nor true rest. The Friction-seeker rejects this by insisting that if you're going to work hard, it should be at something genuinely difficult. The Rooted rejects this by insisting that if you're going to stop, you should actually stop rather than fidget. In your different ways, you've both refused the hollow middle ground of meaningless effort.`
      },
      {
        point: "Both seek authenticity over comfort",
        explanation: `The Friction-seeker doesn't seek difficulty because it's comfortable—they seek it because they believe it's true to what humans need. The Rooted doesn't seek stillness because it's easy—they seek it because they believe it's true to what life actually is. Both of you prioritize something real over something merely pleasant. This shared commitment to authenticity, even when it's challenging, connects you across your different conclusions.`
      }
    ],

    clash: [
      {
        point: "What 'growth' means",
        explanation: `The Friction-seeker believes growth requires challenge—that you become stronger, wiser, more alive through struggle. Without resistance, you stagnate. The Rooted believes growth can happen in stillness—that depth requires stopping long enough to let understanding arise, that constant challenge can prevent the integration that makes growth meaningful. You're not just disagreeing about how to grow; you're disagreeing about what growth even is.`
      },
      {
        point: "The role of ease",
        explanation: `The Friction-seeker treats ease as dangerous—a trap that looks like reward but is actually atrophy in disguise. The Rooted treats ease as potentially wise—sometimes the right response is to stop trying so hard, to receive rather than strive. When the Friction-seeker sees the Rooted at rest, they see someone falling into the trap. When the Rooted sees the Friction-seeker seeking struggle, they see someone addicted to effort.`
      },
      {
        point: "What we're running from",
        explanation: `Each suspects the other of avoidance. The Friction-seeker suspects that the Rooted's stillness is actually fear of challenge—that they've dressed up retreat as wisdom. The Rooted suspects that the Friction-seeker's struggle is actually fear of presence—that they've dressed up flight as growth. Both suspicions might be partially true, which makes them hard to dismiss. The friction in this relationship often centers on this mutual accusation of running.`
      }
    ],

    give: {
      youToThem: `If you're the Friction-seeker, you offer the Rooted a challenge to their stillness—not to destroy it, but to test it. Is their peace genuine or merely comfortable? Can they meet difficulty without losing their center? You reveal whether their stillness is rooted deep enough to withstand the storms, or whether it's actually just avoidance of anything that might disturb them. The gift is the test itself.`,
      themToYou: `If you're the Rooted, you offer the Friction-seeker a different kind of challenge: the challenge of stopping. Can they sit with stillness? Can they be present without reaching for the next difficulty? You reveal whether their struggle-seeking serves genuine growth or is actually an escape from the vulnerability of just being here. Sometimes the hardest thing is doing nothing. The gift is the question: what are you running from?`
    },

    risk: `The failure mode of this pairing is escalation in opposite directions. The Friction-seeker, confronted with someone who questions the value of struggle, seeks ever more extreme challenges to prove their way is right. The Rooted, confronted with someone who won't stop striving, retreats further into stillness to prove their peace is real. Instead of productive tension, you get polarization—each of you becoming a caricature in reaction to the other.

The deeper risk is that you stop being curious about each other's perspective. The Friction-seeker decides the Rooted has nothing to teach them—their stillness is just surrender with better marketing. The Rooted decides the Friction-seeker has nothing to teach them—their striving is just addiction with philosophical justification. At that point, the relationship becomes a dead end: two people confirmed in their existing views rather than expanded by encountering difference.`,

    question: {
      text: "What difficulty would you choose if you knew it would lead to deeper peace—and what peace would you accept if you knew it included genuine challenge?",
      framing: `This question matters because it asks whether your categories might be less opposed than they seem. It invites the Friction-seeker to consider that the deepest struggles might serve stillness, and invites the Rooted to consider that genuine peace might include embracing difficulty. The answer requires both perspectives to speak.`
    }
  },

  "embers+unbound": {
    thesis: "The guardian of memory meets the dreamer of transcendence. One looks back to preserve; the other looks forward to leave everything behind.",

    distanceAnalysis: `The Keeper and The Transcendent represent opposite orientations toward human inheritance. The Keeper believes that the accumulated wisdom of generations—the traditions, practices, memories, and meanings that have been passed down—is precious and must be tended. The Unbound believes that the boundaries of what we are, including the boundaries of inherited identity, are limitations to be transcended rather than treasures to be preserved.

This distance runs deeper than preference. The Keeper's entire project depends on valuing continuity—the thread that connects ancestor to descendant, past to future, what was to what is. The Unbound's entire project depends on valuing transcendence—the possibility of becoming something so different that the categories of the past no longer apply. Each finds the other's deepest commitment fundamentally misguided: the Keeper sees the Unbound as recklessly discarding what cannot be recovered; the Unbound sees the Keeper as lovingly preserving what ought to be outgrown.`,

    dynamic: `At its core, this pairing creates a fundamental argument about what deserves to survive as humans change. The Keeper tends embers—keeps alive the wisdom, practices, and meanings that might otherwise be lost. The Unbound imagines futures where the very concept of "embers" might not translate—where consciousness runs on different substrates, identity works differently, and the human form is optional.

The dynamic between you is one of deep mutual incomprehension that can become either contempt or fascination. The Keeper looks at the Unbound and sees someone so eager to escape that they'll throw away everything that makes us human. What good is transcendence if it means forgetting who we were? The Unbound looks at the Keeper and sees someone so attached to what was that they can't imagine what could be. What good is memory if it chains us to limitations we could surpass?

But genuine dialogue between these positions is rare and valuable precisely because it's difficult. The Keeper, challenged by the Unbound, must ask: what in my treasured inheritance is genuinely wise, and what is merely familiar? What would I want to survive into any future worth having? The Unbound, challenged by the Keeper, must ask: what might I be losing in my rush toward transcendence? What wisdom have I dismissed as limitation that might actually be worth carrying forward?`,

    align: [
      {
        point: "Both take the long view",
        explanation: `The Keeper thinks in generations—they're tending embers so fires can be relit long after they're gone. The Unbound thinks in evolutionary timescales—they're imagining what we might become across thousands or millions of years. Both of you are oriented toward something larger than the individual lifespan, something that extends beyond your personal experience. This shared temporal scope creates unexpected common ground: you're both thinking about what endures, even if you disagree about what should.`
      },
      {
        point: "Both take inheritance seriously",
        explanation: `The Keeper values inheritance enough to preserve it. The Unbound values it enough to carefully consider what to transcend. Neither of you treats the human past as irrelevant—you just have opposite responses to it. This shared seriousness about what we've received means that your arguments, when you have them, are substantive rather than dismissive. You're both engaging with the question of what our inheritance means.`
      }
    ],

    clash: [
      {
        point: "What 'human' means",
        explanation: `The Keeper believes being human means being connected to what came before—that identity is woven from inherited meanings, practices, and memories. The Unbound believes being human might be a starting point rather than a destination—that our identity can expand beyond its current form. When the Keeper says "this is what makes us human," the Unbound says "why should we be limited to that?" This is a fundamental disagreement about the nature of identity itself.`
      },
      {
        point: "The weight of the past",
        explanation: `The Keeper experiences the past as treasure—accumulated wisdom that must be carefully preserved and transmitted. The Unbound experiences the past as weight—accumulated limitations that must be carefully examined and potentially transcended. When the Keeper celebrates preservation, the Unbound sees attachment. When the Unbound celebrates transcendence, the Keeper sees abandonment.`
      },
      {
        point: "What gets lost",
        explanation: `The Keeper fears that the Unbound will discard things that can never be recovered—that in the rush toward transcendence, irreplaceable wisdom will be thrown away. The Unbound fears that the Keeper will preserve things that prevent becoming—that in the devotion to what was, the possibility of what could be gets suffocated. Both fears are legitimate. Both losses are real possibilities.`
      }
    ],

    give: {
      youToThem: `If you're the Keeper, you offer the Unbound something to remember when they transcend. Your archive isn't a chain—it's a record of what consciousness has already discovered, already felt, already tried. You offer the possibility that transcendence doesn't have to mean forgetting, that whatever we become might be richer for carrying forward what we've learned. You're not trying to prevent their reaching; you're trying to ensure they bring something worth carrying.`,
      themToYou: `If you're the Unbound, you offer the Keeper liberation from the weight of preservation. Not everything old deserves to survive—some traditions were always unjust, some memories are chains, some inherited wisdom is actually inherited limitation. You offer the possibility that letting go can be faithful rather than faithless, that the best way to honor the fire might sometimes be to let it transform into something new rather than tending the same embers forever.`
    },

    risk: `The failure mode of this pairing is dismissal masquerading as philosophy. The Keeper decides the Unbound is simply running from real life—their transcendence is just escape dressed up as evolution. The Unbound decides the Keeper is simply afraid of change—their preservation is just fear dressed up as wisdom. Once you've dismissed each other this way, genuine dialogue becomes impossible.

The deeper risk is that you stop asking the questions that only arise in this tension. The Keeper stops asking "what should be allowed to change?" The Unbound stops asking "what should be preserved across any change?" These are crucial questions that neither of you can answer alone, and they only emerge when you're genuinely engaged with someone who embodies the opposite orientation.`,

    question: {
      text: "If you could preserve exactly one thing through any transformation—one insight, one practice, one piece of wisdom—what would it be, and how would you know it was worth carrying?",
      framing: `This question matters because it forces both perspectives into genuine dialogue. The Keeper must select what's most essential rather than preserving everything. The Unbound must admit that something is worth preserving rather than transcending everything. The answer requires both of you to think carefully about value.`
    }
  },

  "citizen+conscience": {
    thesis: "One trusts the architecture. The other tests the walls for cracks. Both are watching—for completely different things.",

    distanceAnalysis: `The Abundant and The Guardian represent opposite default stances toward systems: trust versus suspicion. The Abundant has concluded, after genuine thought, that systems designed for abundance tend toward good—that trusting the architecture usually serves you better than constantly testing it. The Guardian has concluded, after genuine thought, that dystopia arrives disguised as convenience—that trusting the architecture is exactly how you get captured by it.

This distance is particularly charged because each believes the other is making a dangerous mistake. The Abundant thinks the Conscience's permanent suspicion is not just exhausting but self-defeating—that it creates the very atmosphere of distrust that makes good systems impossible. The Guardian thinks the Citizen's trust is not just naive but complicit—that it provides cover for the systems that should be questioned. Neither position is thoughtless. Both are responses to genuine patterns they've observed in the world.`,

    dynamic: `At its core, this pairing creates a permanent debate about the appropriate relationship to power. The Abundant looks at a well-designed system and sees evidence that humans can build things that work for everyone. The Guardian looks at the same system and sees a question: who benefits from you thinking this works? Both are asking legitimate questions. Both are seeing something real.

The dynamic between you is one of mutual frustration that can calcify into mutual dismissal. The Abundant experiences the Conscience as someone who can never enjoy anything, never trust anything, never let their guard down long enough to appreciate when something is actually working. The Guardian experiences the Citizen as someone who can't see what's obvious—the cracks in the architecture, the hidden costs, the people being surveilled or excluded.

But this tension is genuinely productive when both parties stay engaged. The Abundant, challenged by the Conscience, must ask: what am I not seeing because I trust too easily? What costs am I ignoring because I'm focused on benefits? The Guardian, challenged by the Citizen, must ask: what am I not seeing because I suspect too readily? What's working that I'm dismissing as suspicious?`,

    align: [
      {
        point: "Both believe systems matter",
        explanation: `The Abundant pays attention to systems because they believe good design makes good lives possible. The Guardian pays attention to systems because they believe design is never neutral—it always serves someone. Neither of you treats institutional architecture as irrelevant background. You're both system-watchers; you just have opposite expectations about what you'll find.`
      },
      {
        point: "Both want systems that serve everyone",
        explanation: `The Abundant's trust comes from hoping for systems of genuine abundance—not abundance for some at the cost of others. The Guardian's suspicion comes from wanting systems that actually serve everyone rather than claiming to while they don't. Your endpoints are the same; your assessments of the current situation differ. This shared goal creates the possibility of productive dialogue rather than pure opposition.`
      }
    ],

    clash: [
      {
        point: "Default orientation",
        explanation: `The Abundant's default is trust with verification; the Conscience's default is suspicion with persuasion. When encountering a new system, the Citizen asks "how does this work?" while the Conscience asks "who does this serve?" These questions aren't incompatible, but they lead to very different initial responses. The Abundant experiences the Conscience's immediate suspicion as corrosive. The Guardian experiences the Citizen's immediate trust as dangerous.`
      },
      {
        point: "What counts as evidence",
        explanation: `The Abundant takes functionality as evidence that a system is working. The Guardian takes functionality as insufficient—they want to know who's watching, who's excluded, what's being hidden. When the Citizen points to benefits, the Conscience says "yes, but what about the costs?" When the Conscience points to risks, the Citizen says "yes, but look at what's working." You're weighting evidence differently because you're asking different questions.`
      },
      {
        point: "The cost of the stance itself",
        explanation: `The Abundant believes permanent suspicion is exhausting and self-defeating—that if you can never trust anything, you can never build anything worth having. The Guardian believes naive trust is dangerous and complicit—that if you trust systems designed to exploit you, you become part of the problem. Each sees the other's stance as carrying costs that make it unsustainable.`
      }
    ],

    give: {
      youToThem: `If you're the Citizen, you offer the Conscience relief from permanent vigilance. Not everything is a trap. Some systems really do work for most people most of the time. Your trust models the possibility that good architecture is possible—that the Conscience's vigilance might succeed, might actually contribute to building systems worth trusting. You're not asking them to stop watching; you're modeling what it would look like if their watching had worked.`,
      themToYou: `If you're the Conscience, you offer the Citizen the questions they're not asking. Your suspicion isn't paranoia—it's pattern recognition. You've read the history; you know how dystopia arrives. You offer the Citizen the uncomfortable possibility that the architecture they trust might have cracks they can't see, costs they're not counting, beneficiaries they haven't questioned. The gift is the question, even when it's unwelcome.`
    },

    risk: `The failure mode of this pairing is caricature. The Abundant starts treating the Conscience as paranoid—someone who can't function in normal society, whose suspicion has become pathological. The Guardian starts treating the Citizen as a dupe—someone too comfortable to see what's obvious, whose trust makes them complicit in whatever's being hidden. Once you've reduced each other to caricatures, genuine dialogue ends.

The deeper risk is that you stop informing each other's perspective. The Abundant needs the Conscience's questions to avoid being naive. The Guardian needs the Citizen's trust to avoid being paralyzed. If you polarize completely, you each lose access to what the other sees—and your individual perspectives become more dangerous without the corrective.`,

    question: {
      text: "What would it take to build a system you could both trust—the Citizen because it works, the Conscience because its workings are transparent?",
      framing: `This question matters because it points toward a shared project: architecture that earns trust through transparency rather than demanding trust through obscurity. It asks you to imagine together rather than debate across a fixed divide.`
    }
  },

  "alive+conscience": {
    thesis: "One wants to feel everything. The other keeps asking: but should we? Experience meets vigilance in a permanent negotiation.",

    distanceAnalysis: `The Alive and The Guardian represent opposite primary orientations: toward experience versus toward evaluation. The Alive person's first instinct is to feel—to open themselves to what's available, to taste the universe's offerings. The Guardian's first instinct is to evaluate—to question whether this experience is safe, ethical, who it serves, what it hides. Neither instinct is wrong, but they create fundamentally different relationships with the world.

This distance is particularly interesting because both positions claim authenticity. The Alive person believes authenticity means experiencing fully—that filtering, questioning, and evaluating create a barrier between you and what's real. The Guardian believes authenticity means seeing clearly—that experiencing without evaluating is surrender to whatever's presented to you, which might be manufactured or manipulated. Each sees the other's version of authenticity as a kind of inauthenticity.`,

    dynamic: `At its core, this pairing creates a tension between immersion and analysis that shows up in almost every shared experience. The Alive person wants to feel the thing—the sunset, the meal, the music, the moment. The Guardian wants to understand the thing—who made it, why, what's hidden in it, what it's doing to them. Neither is wrong. Both are missing something the other sees.

The dynamic often becomes frustrating for both parties. The Alive person feels like the Conscience ruins experiences by analyzing them—like someone who can't enjoy a meal without researching the restaurant's labor practices. The Guardian feels like the Alive person is vulnerable to manipulation—like someone so hungry for sensation that they'll consume whatever's offered without asking who's serving and why.

But this frustration can become productive if both parties stay engaged. The Alive person, challenged by the Conscience, may discover that some experiences they've been consuming aren't serving them—that their openness has made them vulnerable to exploitation. The Guardian, challenged by the Alive person, may discover that some experiences don't need evaluation—that their vigilance has prevented them from actually living.`,

    align: [
      {
        point: "Both believe life should be lived fully",
        explanation: `The Alive person believes full living means experiencing fully—opening to what's available rather than filtering it. The Guardian believes full living means seeing clearly—understanding what's real rather than accepting appearances. These are different emphases, but they share a commitment to not sleepwalking through life. Neither of you is advocating for dullness or numbness.`
      },
      {
        point: "Both distrust certain kinds of comfort",
        explanation: `The Alive person distrusts the comfort of not feeling—the numbness that passes for safety. The Guardian distrusts the comfort of not questioning—the trust that passes for peace. You've both rejected types of ease that most people accept. This shared rejection of common comforts creates unexpected common ground.`
      }
    ],

    clash: [
      {
        point: "The relationship between experience and evaluation",
        explanation: `The Alive person believes evaluation interferes with experience—that you can't fully feel something while you're analyzing it. The Guardian believes experience without evaluation is dangerous—that feeling something fully doesn't tell you whether you should. This isn't a minor disagreement; it affects how you approach nearly everything. The Alive person sees the Conscience as unable to be present; the Conscience sees the Alive person as unable to be careful.`
      },
      {
        point: "Vulnerability",
        explanation: `The Alive person treats vulnerability as necessary for full experience—you have to be open to be touched by things. The Guardian treats vulnerability as requiring justification—you should know what you're opening to before you open. This creates constant friction: the Alive person feels like the Conscience is closed off; the Conscience feels like the Alive person is reckless.`
      },
      {
        point: "What ruins an experience",
        explanation: `For the Alive person, what ruins an experience is analysis—stepping back from feeling to examine what you're feeling. For the Conscience, what ruins an experience is deception—discovering later that what you felt was manufactured or manipulated. You're afraid of different things, and your strategies for avoiding those fears conflict.`
      }
    ],

    give: {
      youToThem: `If you're The Alive, you offer the Conscience the reminder that life is for living. Their vigilance serves something—but what? At some point, the watching must give way to the living. You model the possibility that some experiences don't require analysis, that presence without suspicion is possible and valuable. You offer them permission to feel without first understanding everything about what they're feeling.`,
      themToYou: `If you're the Conscience, you offer the Alive person the questions that protect their openness. Not all experiences are what they seem. Some sensations are manufactured to exploit exactly the kind of openness you embody. Your vigilance isn't meant to close them down but to help them open wisely—to feel what's real rather than what's been designed to manipulate their feeling.`
    },

    risk: `The failure mode of this pairing is mutual dismissal that prevents growth. The Alive person writes off the Conscience as someone who can't live—a permanent analyst trapped in their own suspicion. The Guardian writes off the Alive person as someone who can't see—a permanent consumer vulnerable to whatever's offered. Once you've dismissed each other, you stop having the conversations that could help both of you.

The deeper risk is that you each become more extreme without the other's corrective. The Alive person, unchallenged by vigilance, becomes increasingly uncritical in their experience-seeking. The Guardian, unchallenged by presence, becomes increasingly incapable of actually living. Your opposite orientations could balance each other; instead, they push you further apart.`,

    question: {
      text: "What would it mean to feel something fully while seeing it clearly—to be both completely present and completely aware of what you're present to?",
      framing: `This question matters because it refuses the dichotomy between experience and evaluation. It asks whether there might be a way of being that includes both your orientations rather than forcing a choice between them. The answer requires both of your capacities.`
    }
  },

  "conscience+friction": {
    thesis: "The one who watches for what's hidden meets the one who seeks difficulty for its own sake. Vigilance confronts vitality in a clash of purpose.",

    distanceAnalysis: `The Guardian and The Challenger represent opposite relationships with struggle. The Guardian watches for struggle imposed by others—the hidden costs, the manufactured difficulties, the systems designed to exploit. The Friction-seeker seeks struggle as a chosen practice—the deliberate difficulty that builds strength, the resistance that creates growth. To the Conscience, seeking difficulty looks naive; why would you choose struggle when so much struggle is unchosen and unjust? To the Friction-seeker, watching for hidden costs looks paralyzed; why would you spend your energy on vigilance when you could spend it on growth?

This distance reflects different theories of what makes life meaningful. The Guardian believes meaning comes from justice—from seeing clearly, exposing what's hidden, protecting the vulnerable from exploitation. The Friction-seeker believes meaning comes from vitality—from meeting challenges, growing through difficulty, becoming stronger through resistance. Both are coherent philosophies. Both see the other's priority as potentially missing the point.`,

    dynamic: `At its core, this pairing creates an argument about where to direct one's energy. The Guardian directs energy toward watching—toward vigilance, exposure, accountability. The Friction-seeker directs energy toward striving—toward challenge, growth, becoming. When they look at the same situation, they ask different questions. The Guardian asks "what's being hidden here?" The Friction-seeker asks "what's worth struggling for here?"

The dynamic often becomes one of mutual bafflement. The Guardian watches the Friction-seeker throw themselves against difficulties and wonders why they don't question who created those difficulties and why. The Friction-seeker watches the Conscience analyze power structures and wonders why they don't just push against something instead of constantly exposing what's wrong with pushing.

But this bafflement can become productive when both stay engaged. The Guardian, challenged by the Friction-seeker, may discover that their vigilance has become a substitute for actually engaging with life—that watching is easier than doing. The Friction-seeker, challenged by the Conscience, may discover that their struggle-seeking has become uncritical—that they've been striving without asking who benefits from their striving.`,

    align: [
      {
        point: "Both reject passive comfort",
        explanation: `The Guardian rejects the comfort of not seeing—the ease that comes from not asking hard questions. The Friction-seeker rejects the comfort of not striving—the ease that comes from not challenging themselves. Both of you have decided that some forms of comfort are traps. This shared suspicion of certain kinds of ease creates unexpected common ground.`
      },
      {
        point: "Both believe in engagement over withdrawal",
        explanation: `The Guardian engages by watching, questioning, exposing. The Friction-seeker engages by striving, struggling, pushing. Neither of you has chosen withdrawal as a life strategy. You're both in the arena, just playing different games within it.`
      }
    ],

    clash: [
      {
        point: "The value of difficulty",
        explanation: `The Friction-seeker values difficulty as inherently growthful—struggle builds character, resistance creates strength. The Guardian questions this framing: not all difficulty is growthful. Some difficulty is manufactured to exploit you. Some struggle just wears you down. The Friction-seeker's faith in difficulty looks naive to the Conscience; the Conscience's questioning of difficulty looks enervating to the Friction-seeker.`
      },
      {
        point: "Where to focus attention",
        explanation: `The Guardian focuses attention on systems—who designed this challenge? Who benefits from your struggling with it? What's hidden in the difficulty you're embracing? The Friction-seeker focuses attention on the experience of struggle itself—does it make you stronger? Does it feel alive? Is there growth? These different focuses create constant friction about what matters.`
      },
      {
        point: "What constitutes action",
        explanation: `The Friction-seeker sees physical or mental striving as real action. The Guardian's watching and questioning can look like mere analysis—not actually doing anything. The Guardian sees vigilance and exposure as real action. The Friction-seeker's struggling can look like running on a treadmill—lots of effort, going nowhere. Each devalues the other's primary mode of engagement.`
      }
    ],

    give: {
      youToThem: `If you're the Conscience, you offer the Friction-seeker the questions that make their struggle meaningful. Not all difficulty is worth embracing. Some challenges are manufactured to exploit exactly the kind of vigor you embody. Your vigilance helps them distinguish between struggle that serves growth and struggle that serves someone else's interests. You're not trying to stop their striving; you're trying to ensure it serves them.`,
      themToYou: `If you're the Friction-seeker, you offer the Conscience the reminder that life requires action, not just watching. At some point, you have to stop exposing what's wrong and start pushing against something. Your vitality models the possibility that engagement isn't just analysis—that sometimes you have to struggle with the systems the Conscience only critiques. You're not dismissing their vigilance; you're showing what comes after seeing clearly.`
    },

    risk: `The failure mode of this pairing is mutual contempt. The Friction-seeker decides the Conscience is all talk—someone who analyzes endlessly but never actually does anything, whose vigilance is a substitute for vitality. The Guardian decides the Friction-seeker is a useful idiot—someone who strives energetically in whatever direction they're pointed, too busy struggling to ask who benefits from their struggles. Once contempt sets in, learning stops.

The deeper risk is that you reinforce each other's weaknesses by rejecting each other's strengths. The Friction-seeker, dismissing vigilance as paralysis, becomes increasingly uncritical about what they struggle for. The Guardian, dismissing striving as naive, becomes increasingly passive in their own engagement with life. Your opposition makes both of you more one-dimensional.`,

    question: {
      text: "What difficulty would be worth choosing if you knew exactly who benefits and why—and what vigilance would be complete if it led you to embrace struggle rather than just expose it?",
      framing: `This question matters because it integrates both orientations. It asks the Friction-seeker to include the Conscience's questions in their choosing. It asks the Conscience to include the Friction-seeker's action in their watching. Neither perspective alone can answer it.`
    }
  },

  "rooted+unbound": {
    thesis: "Earthbound stillness meets the dreamer who would leave the body behind. One chose to stay; the other yearns to go.",

    distanceAnalysis: `The Rooted and The Transcendent occupy perhaps the most extreme philosophical distance in this system: the fully embodied versus the aspiring transcendent. The Rooted has made peace with limits—with the body, the earth, the constraints of physical existence. They've concluded that the deepest wisdom isn't found by reaching beyond but by settling in. The Unbound experiences those same limits as starting points—boundaries to be explored, questioned, eventually transcended. They've concluded that the deepest possibilities lie beyond the forms we currently inhabit.

This distance reflects fundamentally different answers to the question of what human existence is for. The Rooted believes existence is for presence—for being fully here, now, in this body, on this earth. The Unbound believes existence is for becoming—for evolving toward forms we can barely imagine, for transcending the categories that currently define us. Each finds the other's answer not just different but fundamentally confused about what matters.`,

    dynamic: `At its core, this pairing creates an argument about the nature and value of limits. The Rooted has found peace within limits; the Unbound seeks peace beyond them. The Rooted sees the body as home; the Unbound sees it as starting point. The Rooted values presence in this world; the Unbound imagines worlds beyond this one.

The dynamic between you is one of fundamental mutual incomprehension that can become either deep frustration or unexpected fascination. The Rooted looks at the Unbound and sees someone fleeing—someone so uncomfortable with the actual conditions of human life that they've constructed elaborate fantasies of escape. The Unbound looks at the Rooted and sees someone stuck—someone so attached to their current form that they can't imagine becoming anything more.

But this incomprehension can also become illumination. The Rooted, in dialogue with the Unbound, confronts the question: is my stillness genuine wisdom, or am I afraid of what I might become? The Unbound, in dialogue with the Rooted, confronts the question: is my reaching genuine vision, or am I running from what I already am? These questions only arise when you're genuinely engaged with someone who has chosen the opposite path.`,

    align: [
      {
        point: "Both have thought carefully about what they want",
        explanation: `The Rooted didn't fall into stillness accidentally; they chose it after encountering alternatives. The Unbound didn't dream of transcendence naively; they've grappled with what staying would mean. Both of you have examined your position rather than simply accepting it. This shared philosophical seriousness creates respect across disagreement.`
      },
      {
        point: "Both are responding to the same question",
        explanation: `At the deepest level, you're both responding to the fundamental question of human existence: given that we're embodied beings with limits, how should we relate to those limits? The Rooted says "embrace them." The Unbound says "transcend them." These are opposite answers, but they're answers to the same question—which means you're engaged in the same conversation, even if you've reached different conclusions.`
      }
    ],

    clash: [
      {
        point: "The value of embodiment",
        explanation: `The Rooted sees embodiment as the ground of meaning—the body isn't a prison but a home, and the deepest experiences are the ones available to embodied beings. The Unbound sees embodiment as a constraint—valuable for now, but not the final word on what we can be or experience. This isn't a difference that can be split down the middle. Either the body is the site of meaning or it's a waystation.`
      },
      {
        point: "The meaning of 'beyond'",
        explanation: `When the Unbound talks about going beyond current limits, the Rooted hears escape—fleeing from the difficult work of being present here. When the Rooted talks about staying with what is, the Unbound hears stagnation—refusing the call to become more than we currently are. Neither experiences the other's "beyond" or "here" the way it's intended.`
      },
      {
        point: "What we're for",
        explanation: `The Rooted believes human existence is for presence—for being here fully, which requires accepting limits rather than transcending them. The Unbound believes human existence is for becoming—for evolving toward possibilities we can barely imagine, which requires transcending limits rather than accepting them. This is a fundamental disagreement about the purpose of being alive.`
      }
    ],

    give: {
      youToThem: `If you're The Rooted, you offer the Unbound an anchor. Their reaching toward transcendence is real, but what grounds it? What gives their aspiration meaning? You model the possibility that there's something worth staying for—that the body they want to transcend is also capable of experiences that might not translate to whatever comes next. You're not trying to stop their reaching; you're asking what they're reaching from.`,
      themToYou: `If you're The Transcendent, you offer the Rooted a challenge: is your stillness peace or limitation? You model the possibility that human existence isn't the final word—that the contentment they've found might be one station on a longer journey rather than the destination itself. You're not dismissing what they've achieved; you're asking whether it's everything they could become.`
    },

    risk: `The failure mode of this pairing is contempt on both sides. The Rooted decides the Unbound is fundamentally unwell—someone so uncomfortable in their own skin that they've invented philosophical justifications for escape. The Unbound decides the Rooted is fundamentally limited—someone so afraid of growth that they've invented philosophical justifications for staying small. Once contempt sets in, the productive tension becomes destructive rejection.

The deeper risk is that you stop learning from each other's perspective. The Rooted needs the Unbound's challenge to ensure their stillness is genuine peace rather than comfortable stagnation. The Unbound needs the Rooted's challenge to ensure their transcendence is genuine vision rather than disguised flight. Without this mutual challenge, you each become more extreme and less examined.`,

    question: {
      text: "What experience is only possible in a body—and what experience might be possible beyond one? How would you know the difference matters?",
      framing: `This question matters because it asks both of you to take the other's perspective seriously. The Rooted must consider what might be lost by never reaching; the Unbound must consider what might be lost by always leaving. Neither can answer alone.`
    }
  },

  // ===== ADJACENT-ARCHETYPE PAIRS (10 total) =====
  // These pairs have distance < 0.4 — natural allies with easy resonance

  "citizen+shaper": {
    thesis: "Two fluent speakers of the same optimistic language. Beautiful conversations about what's possible—but who asks whether it should be built at all?",

    distanceAnalysis: `When The Abundant meets Shaper of What's Next, the philosophical distance between you is minimal. You both believe in possibility. You both see constraint as something to be overcome rather than accepted. You both orient toward futures that don't exist yet with confidence that they could. This is easy recognition—the relief of meeting someone whose basic assumption is that things can get better.

But close proximity creates its own challenges. When two people share the same optimistic baseline, certain questions never get asked. The Abundant trusts systems designed for abundance; the Shaper builds systems designed for transformation. Neither is positioned to ask whether the system should exist at all. Your shared confidence in positive futures might be wisdom—or might be a blind spot you're both standing in together.`,

    dynamic: `At its core, this pairing brings together two people who believe in building. The Abundant brings trust in existing abundance—the conviction that we already have what we need if we can just distribute it properly. The Builder brings confidence in future abundance—the conviction that we can create what doesn't exist yet. Together, you cover the full spectrum of constructive optimism.

The dynamic between you is one of mutual amplification. The Abundant's trust gives the Shaper a foundation to build on; the Shaper's vision gives the Citizen something to believe in. This creates productive energy: together, you can imagine and execute in ways that neither could alone.

But this same amplification can become an echo chamber. Without someone asking harder questions—about unintended consequences, about who gets left behind, about whether building is always the right response—you can reinforce each other's blind spots. Your shared language of possibility might be exactly what's needed, or might be a comfortable dialect that keeps you from hearing dissent.`,

    align: [
      {
        point: "Possibility as baseline",
        explanation: `Both of you start from the assumption that better futures are achievable. This isn't naive optimism—it's a philosophical commitment that shapes how you engage with problems. Where others see walls, you both see doors. This shared baseline means you never have to justify hope to each other.`
      },
      {
        point: "Systems thinking",
        explanation: `The Abundant trusts good systems; the Shaper builds them. You both understand that individual action matters less than structural design. This shared systems orientation means your conversations naturally move to leverage points, feedback loops, and scalable solutions.`
      },
      {
        point: "Constructive rather than critical",
        explanation: `Neither of you is primarily a critic. You both prefer building to tearing down, creating to analyzing. This shared constructive orientation means your collaborations tend to produce things rather than just discussions about things. The energy moves forward.`
      }
    ],

    clash: [
      {
        point: "Trust vs. transformation",
        explanation: `The Abundant tends to trust existing systems and work within them; the Shaper tends to see existing systems as raw material for transformation. This difference is subtle but real. When a system isn't working, the Citizen asks how to fix it; the Shaper asks whether to replace it entirely. Your solutions to the same problem might diverge significantly.`
      },
      {
        point: "Whose vision prevails?",
        explanation: `Both of you have visions of better futures, but those visions might not align in detail. The Abundant's abundance might look different from the Shaper's transformation. When your optimisms conflict, who adjusts? This tension is usually manageable, but it exists beneath the surface of your easy agreement.`
      }
    ],

    give: {
      youToThem: `If you're the Citizen, you offer the Shaper grounding. Their transformative vision is powerful, but it needs a foundation of trust—belief that the world can receive what they're building. You model that trust. You show them that abundance already exists in some forms, that they're building into fertile ground rather than hostile territory.`,
      themToYou: `If you're the Shaper, you offer the Citizen direction. Their trust in abundance is generous, but trust without vision can become complacency. You show them what abundance could become, what's possible beyond what already exists. You give their trust somewhere to go.`
    },

    risk: `The failure mode for this pairing is mutual reinforcement of uncritical optimism. Without someone to ask harder questions, you can amplify each other's confidence into blind spots. The Abundant's trust combines with the Shaper's vision to create beautiful plans that no one has stress-tested. Who asks about unintended consequences? Who speaks for those who might be harmed by your abundance?

The deeper risk is that your shared language of possibility becomes a filter that screens out dissent. Critics start to seem negative, cautious voices seem fearful, and you both dismiss perspectives that don't share your optimistic baseline. The echo chamber becomes comfortable precisely because it never challenges you.`,

    question: {
      text: "What are you both assuming will work out—and who might be harmed if it doesn't?",
      framing: `This question matters because it asks you to examine the shadow side of your shared optimism. Your confidence in positive futures is a gift, but it can also be a blind spot. Who isn't included in your vision of abundance? What could go wrong that neither of you is watching for?`
    }
  },

  "citizen+friction": {
    thesis: "Easy resonance, instant understanding—the Citizen's trust meets the Friction-seeker's challenge. The question is whether comfort becomes complacency or whether productive tension emerges.",

    distanceAnalysis: `When The Abundant meets The Challenger, the distance between you is smaller than it might appear. You both believe in engagement with the world as it is. The Abundant engages through trust; the Friction-seeker engages through challenge. But both of you are fundamentally engaged—neither retreats into cynicism or paralysis.

This shared engagement creates easy initial connection. You both want to be in the arena, just in different ways. The Abundant assumes the arena is basically good; the Friction-seeker assumes the arena requires struggle. But you're both in it, which matters more than you might think.`,

    dynamic: `At its core, this pairing brings together two forms of active engagement. The Abundant brings trust that systems can be good, that abundance is possible, that positive outcomes are achievable. The Friction-seeker brings the conviction that ease is suspicious, that struggle is necessary, that challenge is how we grow.

The dynamic between you is one of productive tension. The Abundant's trust can soften the Friction-seeker's relentless challenge; the Friction-seeker's resistance can sharpen the Citizen's comfortable assumptions. Together, you might find a middle ground that neither would discover alone—engaged optimism that doesn't become complacent.

But this productive tension requires conscious attention. Without it, you might simply talk past each other—the Citizen wondering why everything has to be so hard, the Friction-seeker wondering why the Citizen won't fight for anything. Your shared engagement can become parallel play rather than genuine partnership.`,

    align: [
      {
        point: "Engagement with reality",
        explanation: `Neither of you retreats from the world. The Abundant engages through building and trusting; the Friction-seeker engages through challenging and testing. But both of you are fundamentally in the game, not on the sidelines. This shared engagement creates a foundation for mutual respect.`
      },
      {
        point: "Belief in improvement",
        explanation: `The Abundant believes things can be better through good systems; the Friction-seeker believes things can be better through productive struggle. Both of you reject fatalism. This shared belief in improvement—even if you disagree about how improvement happens—connects you.`
      },
      {
        point: "Action orientation",
        explanation: `Neither of you is satisfied with analysis alone. The Abundant wants to build abundance; the Friction-seeker wants to test limits. Both of you prefer doing to merely thinking. This shared bias toward action means your collaborations tend to produce movement.`
      }
    ],

    clash: [
      {
        point: "Trust vs. testing",
        explanation: `The Abundant's default is to trust systems and assume good intent; the Friction-seeker's default is to test systems and assume they need challenge. When facing a new institution, technology, or relationship, you'll instinctively approach it differently. The Abundant says "let's see what this can do." The Friction-seeker says "let's see if this can withstand pressure."`
      }
    ],

    give: {
      youToThem: `If you're the Citizen, you offer the Friction-seeker permission to rest. Their relentless challenge is valuable, but it's also exhausting. You model the possibility that not everything requires struggle, that some good things can be received rather than fought for. Your trust is a gift to someone who finds it hard to trust.`,
      themToYou: `If you're the Friction-seeker, you offer the Citizen necessary challenge. Their trust is generous, but it can become naive. You test their assumptions, push back on their optimism, and help them distinguish between systems that deserve trust and systems that are exploiting it. Your friction keeps their trust honest.`
    },

    risk: `The failure mode for this pairing is mutual frustration. The Abundant starts to see the Friction-seeker as exhaustingly negative—why does everything have to be a battle? The Friction-seeker starts to see the Citizen as dangerously naive—why won't they fight for anything? Without conscious bridge-building, your different approaches can become sources of contempt rather than complementary strengths.

The deeper risk is that you reinforce each other's comfortable positions rather than learning from each other. The Abundant stays trusting without developing discernment; the Friction-seeker stays challenging without developing ease. You like each other despite your differences rather than growing through them.`,

    question: {
      text: "When is trust the right response, and when is challenge? How do you decide together?",
      framing: `This question matters because it asks you to develop shared judgment rather than defaulting to your individual tendencies. Neither trust nor challenge is always right. The question is whether you can help each other know which response fits the moment.`
    }
  },

  "alive+unbound": {
    thesis: "Sensory intensity meets transcendent vision—two ways of reaching beyond ordinary experience. Beautiful shared adventures, but who tends the ordinary life you're both escaping?",

    distanceAnalysis: `When The Alive meets The Transcendent, the philosophical distance between you is small. You're both reaching beyond the ordinary, beyond the moderate, beyond the safe middle. The Alive type reaches through sensation—more experience, deeper feeling, fuller presence to what's here. The Unbound type reaches through transcendence—beyond current limits, past the boundaries of self and body. You're both expansive.

This shared expansiveness creates immediate recognition. Neither of you is satisfied with the normal operating parameters of human experience. But your expansions point in different directions—one deeper into embodiment, one past it. This difference matters less than you might think, because you both understand the hunger for more.`,

    dynamic: `At its core, this pairing brings together two forms of reaching past limits. The Alive type wants to feel everything the body can feel; the Unbound type wants to become everything the self can become. Both of you are oriented toward intensity, expansion, the edges of human experience.

The dynamic between you is one of mutual permission. The Alive type doesn't judge the Unbound's desire to transcend; the Unbound doesn't judge the Alive's hunger for sensation. You both understand wanting more than ordinary life offers. This creates a generous space where neither has to defend their appetite.

But this mutual permission can enable escape. If both of you are always reaching for more—whether through sensation or transcendence—who tends the ordinary life that supports your adventures? Who does the dishes, pays the bills, shows up for the unglamorous moments? Your shared expansiveness might be wisdom or might be coordinated flight from what's difficult about being human.`,

    align: [
      {
        point: "Hunger for more",
        explanation: `Neither of you is satisfied with moderate experience. The Alive type wants more sensation; the Unbound wants more consciousness. Both of you look at ordinary human life and ask "is this all there is?" This shared hunger creates immediate understanding—you both know what it's like to want what others seem content without.`
      },
      {
        point: "Comfort with intensity",
        explanation: `Both of you can handle experiences that would overwhelm others. The Alive type can hold overwhelming sensation; the Unbound can hold overwhelming expansion. This shared capacity for intensity means you can accompany each other into territories that would leave more moderate people behind.`
      },
      {
        point: "Rejection of the ordinary",
        explanation: `Neither of you believes that normal life is the whole story. You both sense that there's more—whether that "more" is found in deeper feeling or expanded consciousness. This shared rejection of ordinariness is a bond, even if your visions of the extraordinary differ.`
      }
    ],

    clash: [
      {
        point: "Body as destination vs. waystation",
        explanation: `The Alive type sees the body as the primary instrument for experiencing reality—more senses, more feeling, more embodiment is the path to fulfillment. The Unbound sees the body as a starting point to be transcended—the upload, the expansion of consciousness past physical limits. When push comes to shove, you're heading in opposite directions even though you're both heading somewhere.`
      },
      {
        point: "Present vs. future",
        explanation: `The Alive type is fundamentally present-oriented—this sensation, this moment, this experience. The Unbound is fundamentally future-oriented—what we might become, what consciousness might grow into. Your adventures together might pull in different directions: deeper into now vs. further into possibility.`
      }
    ],

    give: {
      youToThem: `If you're The Alive, you offer the Unbound grounding in embodiment. Their vision of transcendence is beautiful, but what are they transcending from? You model the richness available in the body, the consciousness that's possible right here. You help them feel what they might be too eager to leave behind.`,
      themToYou: `If you're The Transcendent, you offer the Alive type vision beyond sensation. Their hunger for experience is powerful, but is experience all there is? You model the possibility that consciousness itself might expand, that there might be ways of being that don't depend on a body experiencing sensations. You expand their horizon.`
    },

    risk: `The failure mode for this pairing is coordinated escape. If both of you are always reaching for more—more sensation, more transcendence—you can enable each other's avoidance of ordinary life. The relationship becomes a vehicle for adventures that look beautiful but leave the actual work of being human undone. Who anchors you both when the reaching becomes running?

The deeper risk is that you mistake intensity for intimacy. Both of you are good at powerful experiences, but powerful experiences aren't the same as deep relationship. Some of the most important moments in connection are quiet, ordinary, unglamorous. If neither of you can be present to those moments, your relationship might be exciting but strangely hollow.`,

    question: {
      text: "What ordinary experience have you been avoiding together—and what might you discover if you stayed with it instead of reaching for more?",
      framing: `This question matters because it asks you both to turn toward what you typically turn away from. Your shared capacity for extraordinary experience is a gift, but it can also be a hiding place. What's in the ordinary that you've both been missing?`
    }
  },

  "alive+friction": {
    thesis: "Two intensity-seekers who understand that life should burn. Profound mutual recognition—but can the fire sustain without consuming what it was meant to forge?",

    distanceAnalysis: `When The Alive meets The Challenger, you're meeting on familiar ground. You both believe that intensity is the point. The Alive type seeks intensity through sensation—more experience, deeper feeling, fuller presence to what's available. The Friction-seeker seeks intensity through challenge—more resistance, harder problems, greater obstacles to overcome. You're both allergic to the tepid middle.

This shared orientation toward intensity creates immediate recognition. Neither of you has to explain why you can't be satisfied with comfort, why moderate experiences feel like half-measures, why something in you requires the full range. You both know. The only difference is the flavor of intensity you seek.`,

    dynamic: `At its core, this pairing brings together two people who refuse to turn down. The Alive type won't moderate their appetite for sensation; the Friction-seeker won't moderate their appetite for challenge. Together, you create a high-energy field that most people would find exhausting but you both find home.

The dynamic between you is one of mutual amplification. You push each other toward more—more experience, more difficulty, more intensity in whatever form. Neither of you suggests slowing down; neither judges the other's hunger. This creates a relationship that runs hot, always.

But this same amplification can become acceleration toward burnout. If neither of you has brakes, if both of you only know how to add fuel, the fire can consume what it was meant to forge. You might be sharpening each other—or you might be wearing each other down. The line between productive intensity and mutual destruction isn't always clear from inside the flame.`,

    align: [
      {
        point: "Intensity as non-negotiable",
        explanation: `Neither of you will accept a life turned down. The Alive type needs sensory intensity; the Friction-seeker needs challenge intensity. Both of you have concluded that the safe middle is its own kind of death. This shared refusal to moderate creates profound mutual recognition.`
      },
      {
        point: "Aliveness as evidence",
        explanation: `Both of you use intensity as evidence that you're actually living. The Alive type knows they're alive when they're feeling fully; the Friction-seeker knows they're alive when they're struggling productively. You both understand that comfort can be a kind of numbness, that ease can be a kind of sleep.`
      },
      {
        point: "Capacity for extremes",
        explanation: `Both of you can operate in territories that others would flee. The Alive type can hold overwhelming sensation; the Friction-seeker can hold overwhelming challenge. This shared capacity for extremes means you can accompany each other into intensities that would leave gentler people behind.`
      }
    ],

    clash: [
      {
        point: "Receiving vs. fighting",
        explanation: `The Alive type's intensity is fundamentally receptive—they want to feel what's there, to be open to experience. The Friction-seeker's intensity is fundamentally active—they want to engage, challenge, overcome. Sometimes you'll want different things from the same moment: one of you wants to receive it, the other wants to wrestle with it.`
      }
    ],

    give: {
      youToThem: `If you're The Alive, you offer the Friction-seeker a different relationship to intensity. Their challenge-seeking is powerful, but not everything is a battle. You model the possibility of receiving intensity rather than fighting for it—of being filled by experience rather than struggling against it.`,
      themToYou: `If you're The Challenger, you offer the Alive type edge and direction. Their openness to sensation is generous, but openness alone can become passive consumption. You model the possibility of engaging with intensity rather than just receiving it—of being shaped by difficulty rather than just experiencing sensation.`
    },

    risk: `The failure mode for this pairing is mutual exhaustion disguised as aliveness. If neither of you knows how to stop, if both of you only validate more intensity, you can burn out together while telling yourselves you're living fully. The fire needs fuel, and eventually the fuel runs out. Who notices when intensity becomes self-destruction?

The deeper risk is that you create a relationship where nothing soft can survive. Both of you run hot, but relationships also need cool moments—tenderness, rest, the ordinary rhythms of care. If your shared intensity burns away everything gentle, you might find yourselves very alive but also very alone together.`,

    question: {
      text: "What would rest look like between you—and what are you both avoiding by always reaching for more intensity?",
      framing: `This question matters because it asks you to explore the territory you both tend to avoid. Your shared capacity for intensity is a gift, but it's not the only mode. What becomes possible if you occasionally choose stillness together?`
    }
  },

  "mender+presence": {
    thesis: "Two who show up for what's broken—one through fixing, one through witnessing. Easy resonance in the shared commitment to care, but who tends to what can't be repaired or held?",

    distanceAnalysis: `When The Mender meets The Present, the philosophical distance between you is minimal. You both believe in showing up. The Mender shows up with tools—they see what's broken and reach for repair. The Keeper shows up with attention—they see what's present and offer witness. Both of you are fundamentally oriented toward care.

This shared orientation toward care creates immediate recognition. Neither of you abandons what needs attention. Neither of you walks past brokenness or suffering without responding. You both understand that the world needs people who stay when others leave. You differ only in how you stay.`,

    dynamic: `At its core, this pairing brings together two forms of devotion. The Mender is devoted to repair—the stubborn hope that broken things can be made whole again. The Keeper is devoted to presence—the conviction that undivided attention is itself a form of healing. Together, you cover the full spectrum of how care can be expressed.

The dynamic between you is one of complementary service. The Mender fixes what can be fixed; the Keeper holds what can only be witnessed. Neither dismisses the other's form of care. This creates a generous space where different expressions of love are all honored.

But this same complementarity can become division of labor that leaves gaps. What about the things that can't be fixed or held? What about the care that requires something other than repair or presence? Your shared commitment to what's here might miss what needs to change fundamentally—not be mended, not be witnessed, but be released or transformed entirely.`,

    align: [
      {
        point: "Showing up as core value",
        explanation: `Neither of you abandons what needs attention. The Mender stays to fix; the Keeper stays to witness. Both of you have chosen presence over avoidance, care over convenience. This shared commitment to showing up is the foundation of your connection.`
      },
      {
        point: "Care as action",
        explanation: `Both of you believe that care must be expressed through doing something—whether that's repair or attention. Neither of you thinks good intentions are enough. The Mender's hands and the Keeper's witness are both forms of active care. This shared bias toward doing creates mutual respect.`
      },
      {
        point: "Patience with what takes time",
        explanation: `Both of you understand that real care isn't quick. The Mender knows that good repair takes patience; the Keeper knows that genuine presence can't be rushed. Neither of you expects instant results. This shared patience means you can work together on long timescales.`
      }
    ],

    clash: [
      {
        point: "Fixing vs. holding",
        explanation: `When faced with brokenness, the Mender instinctively reaches for tools; the Keeper instinctively offers attention. Sometimes both are needed, but sometimes the responses conflict. The Mender might try to fix what just needs witness; the Keeper might offer presence when action is required. Learning when to apply which response is the ongoing work of this pairing.`
      }
    ],

    give: {
      youToThem: `If you're the Mender, you offer the Keeper a different form of care. Their presence is beautiful, but sometimes things need to actually change, not just be witnessed. You model the possibility of making things better through action—of care that doesn't just hold space but transforms what's in it.`,
      themToYou: `If you're the Keeper, you offer the Mender permission to stop fixing. Their repair is valuable, but not everything can be fixed—and the urge to fix can sometimes be avoidance of simply being with what's broken. You model the possibility of care without action, of presence as enough.`
    },

    risk: `The failure mode for this pairing is dividing the world into what you each handle and missing what falls between. The Mender takes the fixable; the Keeper takes the unfixable. But some things need both—and some things need neither. They need release, transformation, or simple ending. Your shared commitment to care might keep you tending what needs to die.

The deeper risk is that your care becomes its own avoidance. If the Mender is always fixing and the Keeper is always witnessing, when do either of you simply rest? Care for others can be a way of avoiding care for selves. Your shared devotion is beautiful, but it can also be depleting.`,

    question: {
      text: "What in your shared care needs neither repair nor witness—and what would it mean to simply let it be, or let it go?",
      framing: `This question matters because it asks you to find the limits of your shared mode. Your devotion to care is a gift, but care takes many forms. What might you both be avoiding by always showing up in your familiar ways?`
    }
  },

  "presence+rooted": {
    thesis: "Two who believe in being over doing—profound alignment in stillness, but can presence and rootedness together become a fortress against necessary change?",

    distanceAnalysis: `When The Present meets The Rooted, you're occupying adjacent territory. You both believe that being matters more than doing, that presence matters more than productivity, that stillness has value the busy world dismisses. The Keeper brings the gift of attention; the Rooted brings the gift of groundedness. You're both oriented toward what's here rather than what's next.

This shared orientation toward being creates immediate recognition. Neither of you needs to justify slowness, stillness, or the choice to stay rather than strive. You both understand that the constant pressure to do more is often a flight from what's already present. In each other, you find permission to simply be.`,

    dynamic: `At its core, this pairing brings together two forms of stillness. The Keeper is still in attention—they give full presence to what's before them. The Rooted is still in position—they stay where they are while the world rushes past. Together, you create a zone of calm that most people would find uncomfortable but you both find home.

The dynamic between you is one of mutual permission. The Keeper doesn't ask the Rooted to move; the Rooted doesn't ask the Keeper to act. You validate each other's commitment to being over doing. This creates a peaceful space where neither has to justify their stillness.

But this same mutual permission can become mutual enabling of stagnation. If neither of you ever pushes toward action, toward change, toward the discomfort of becoming different, your stillness can calcify into rigidity. The peace you share might be genuine equanimity—or might be avoidance dressed as wisdom.`,

    align: [
      {
        point: "Being over doing",
        explanation: `Both of you have concluded that presence matters more than productivity. The Keeper's attention and the Rooted's groundedness are both expressions of this shared conviction. Neither of you believes that worth is measured by output. This fundamental alignment creates a foundation for genuine understanding.`
      },
      {
        point: "Skepticism of striving",
        explanation: `Both of you question the cultural assumption that constant movement is good. The Keeper knows that attention requires stillness; the Rooted knows that wisdom requires staying put. You both see through the busy-ness that others mistake for meaning.`
      },
      {
        point: "Value of the present moment",
        explanation: `Neither of you is always planning the future or regretting the past. The Keeper is present to what's here; the Rooted is committed to where they are. This shared orientation toward now means your time together has a quality of attention that more future-focused pairs might lack.`
      }
    ],

    clash: [
      {
        point: "Presence vs. position",
        explanation: `The Keeper's stillness is about attention—being fully present wherever they are. The Rooted's stillness is about location—staying in the same place, with the same commitments. These are related but different forms of stillness. The Keeper might bring presence to change; the Rooted might resist change entirely. When movement becomes necessary, you might diverge.`
      }
    ],

    give: {
      youToThem: `If you're the Keeper, you offer the Rooted flexibility within stillness. Their groundedness is valuable, but staying put can become rigidity. You model the possibility of bringing full presence to wherever you are—including, sometimes, new places. Presence doesn't require position.`,
      themToYou: `If you're The Rooted, you offer the Keeper commitment. Their attention is generous, but attention can wander. You model the possibility of staying—not just being present but being reliably, consistently here. Your rootedness gives their presence a home.`
    },

    risk: `The failure mode for this pairing is beautiful stagnation. If both of you validate stillness without questioning it, you can become stuck together in ways that feel like peace but are actually avoidance. The world requires movement sometimes. Change is sometimes necessary. Who notices when your shared stillness has become a refusal to grow?

The deeper risk is that you create a cocoon that protects you from life's demands. Two people committed to being over doing can construct a life that looks peaceful but is actually contracted. You might be deeply present together while missing the larger movements of your lives—the changes that want to happen, the growth that requires discomfort.`,

    question: {
      text: "What necessary change have you been avoiding together—and what stillness might emerge on the other side of it?",
      framing: `This question matters because it asks you to distinguish between genuine peace and comfortable avoidance. Your shared commitment to being is a gift, but being sometimes requires becoming. What's the next version of your stillness that you haven't yet had the courage to enter?`
    }
  },

  "embers+rooted": {
    thesis: "Two grounded keepers meeting on stable ground—the archivist of memory and the guardian of place. Easy resonance in shared solidity, but who makes sure the foundation isn't becoming a prison?",

    distanceAnalysis: `When The Keeper meets The Rooted, you're both oriented toward preservation. The Keeper preserves what came before—memory, tradition, the wisdom of the past. The Rooted preserves where they stand—place, position, the commitments they've made. You're both guardians against loss in a world that forgets too easily.

This shared orientation toward preservation creates immediate recognition. Neither of you chases novelty. Neither of you assumes that new is better. You both understand that something valuable is lost when we're always rushing forward. In each other, you find someone who also holds on.`,

    dynamic: `At its core, this pairing brings together two forms of keeping. The Keeper guards the fire of memory; the Rooted guards the ground of place. Together, you create a zone of stability that most people would find constraining but you both find essential.

The dynamic between you is one of mutual valuation. The Keeper values the Rooted's commitment to staying; the Rooted values the Keeper's commitment to remembering. Neither dismisses the other's preservation as hoarding or stubbornness. You understand each other's holding as care.

But this same mutual valuation can become mutual reinforcement of rigidity. If neither of you ever lets go—of memories, of positions, of the way things have been—your shared holding can become a weight. The archive and the foundation are supposed to serve life, but they can become substitutes for it.`,

    align: [
      {
        point: "Preservation as value",
        explanation: `Both of you believe that holding on is sometimes the most important thing you can do. The Keeper holds memory; the Rooted holds ground. In a culture that values disruption and novelty, this shared commitment to preservation connects you deeply.`
      },
      {
        point: "Skepticism of change for its own sake",
        explanation: `Neither of you is impressed by novelty alone. The Keeper knows that wisdom lives in what's been tested; the Rooted knows that stability requires staying put. You both see through the cult of the new that others worship.`
      },
      {
        point: "Depth over breadth",
        explanation: `Both of you prefer going deeper into what you have rather than spreading wider into what you don't. The Keeper deepens into the past; the Rooted deepens into place. This shared orientation toward depth means your relationship can develop richness that more restless pairs miss.`
      }
    ],

    clash: [
      {
        point: "Past vs. present anchoring",
        explanation: `The Keeper is anchored in time—what came before, what must be remembered. The Rooted is anchored in space—where they are, what commitments they've made. These anchors usually align, but they can diverge. When the past requires leaving the present place, or when staying put requires releasing old memories, whose anchor holds?`
      }
    ],

    give: {
      youToThem: `If you're the The Keeper, you offer the Rooted historical depth. Their commitment to place is solid, but place exists in time. You connect their ground to all the ground that came before, all the people who stood where they stand. You give their rootedness roots.`,
      themToYou: `If you're The Rooted, you offer the Keeper a home for memory. Their archive is precious, but archives need places to live. You provide the stable ground where memory can be tended, the consistency that lets preservation happen. You ground their keeping.`
    },

    risk: `The failure mode for this pairing is fossilization. If both of you are committed to holding on—to memory, to place, to the way things have been—you can become so stable that nothing can grow. The past and the present merge into a single unchanging block. Who notices when your shared solidity has become rigidity? Who makes space for what wants to emerge?

The deeper risk is that you create a beautiful monument and forget to live in it. Two keepers keeping together can produce impressive preservation while the actual life being preserved grows stale. The fire the Keeper tends is supposed to warm people, not just glow in a museum. The ground the Rooted stands on is supposed to support growth, not just resist change.`,

    question: {
      text: "What new thing wants to grow from your shared ground—and what old thing might need to be composted to feed it?",
      framing: `This question matters because it asks you to turn your keeping toward the future, not just the past and present. Your shared stability is a gift, but stability serves life best when it enables growth. What's ready to be released so something new can take root?`
    }
  },

  "cleareyed+swimmer": {
    thesis: "Two truth-seekers with different methods—one sees directly, one questions endlessly. Easy resonance in shared commitment to reality, but who decides when truth has been found?",

    distanceAnalysis: `When The Truth-Teller meets The Deep, you're both oriented toward truth. The Clear-Eyed type pursues truth through direct seeing—they look at what's there and name it. The Deep pursues truth through questions—they explore beneath surfaces, holding uncertainty while insight develops. You're both committed to reality over comfortable illusion.

This shared commitment to truth creates immediate recognition. Neither of you accepts easy answers. Neither of you chooses comfort over accuracy. You both understand that knowing requires courage—whether that's the courage to see clearly or the courage to keep asking. In each other, you find a fellow traveler toward what's real.`,

    dynamic: `At its core, this pairing brings together two forms of truth-seeking. The Clear-Eyed type cuts through confusion with direct vision; the Swimmer moves through confusion with patient inquiry. Together, you might find a fuller picture than either could alone—the Clear-Eyed's sight informed by the Swimmer's depth, the Swimmer's questions sharpened by the Clear-Eyed's clarity.

The dynamic between you is one of complementary investigation. The Clear-Eyed says what they see; the Swimmer asks what hasn't been seen yet. Neither dismisses the other's method. This creates productive inquiry where direct vision and persistent questioning work together.

But this same complementarity can create tension around closure. The Clear-Eyed type tends toward conclusion—they see, they speak, they move on. The Deep tends toward continuation—there's always another question, another depth to explore. Who decides when truth has been found? Your shared commitment to reality might not translate to shared timing about when investigation ends.`,

    align: [
      {
        point: "Truth over comfort",
        explanation: `Both of you have chosen to face what's real rather than what's pleasant. The Clear-Eyed won't look away from uncomfortable truths; the Swimmer won't stop questioning when questions become difficult. This shared prioritization of truth creates a foundation of mutual respect.`
      },
      {
        point: "Depth matters",
        explanation: `Neither of you is satisfied with surface appearances. The Clear-Eyed sees through illusions to what's actually there; the Swimmer dives beneath surfaces to what lies hidden. This shared commitment to depth means your conversations can go places that more superficial pairs wouldn't reach.`
      },
      {
        point: "Courage in inquiry",
        explanation: `Both of you understand that truth-seeking requires bravery. The Clear-Eyed must have courage to say what they see; the Swimmer must have courage to stay in uncertainty. You recognize each other's bravery because you share it, even in different forms.`
      }
    ],

    clash: [
      {
        point: "Certainty vs. inquiry",
        explanation: `The Clear-Eyed type tends toward conclusions—they see clearly and speak definitively. The Deep tends toward questions—clarity is always provisional, there's always more to explore. This can create friction: the Clear-Eyed may feel the Swimmer is avoiding conclusions; the Swimmer may feel the Clear-Eyed is closing too quickly. How do you know when investigation should end?`
      }
    ],

    give: {
      youToThem: `If you're Clear-Eyed, you offer the Swimmer grounding in decision. Their inquiry is valuable, but inquiry without conclusion can become paralysis. You model the possibility of seeing clearly enough to act, of truth definite enough to stand on. You give their swimming a shore to reach.`,
      themToYou: `If you're the Swimmer, you offer the Clear-Eyed humility about certainty. Their direct vision is powerful, but what if they're missing something? You model the possibility that truth is deeper than any single seeing, that patient questioning reveals what quick clarity misses. You give their seeing depth.`
    },

    risk: `The failure mode for this pairing is mutual frustration about closure. The Clear-Eyed type becomes impatient with the Swimmer's endless inquiry—at some point, you have to decide what you see and act on it. The Deep becomes frustrated with the Clear-Eyed's premature certainty—how can they be so sure when there's always more to question? Without explicit negotiation about when investigation ends, you can talk past each other indefinitely.

The deeper risk is that you fail to integrate your methods. The Clear-Eyed keeps seeing without deepening; the Swimmer keeps questioning without concluding. You coexist rather than learn from each other. The real gift of this pairing—vision informed by depth, inquiry that eventually lands—goes unrealized.`,

    question: {
      text: "What truth have you both been circling—and what would it mean to name it together, even if naming feels premature?",
      framing: `This question matters because it asks you to find shared ground between seeing and questioning. Your different methods both serve truth. What happens when you combine them—when the Clear-Eyed's sight meets the Swimmer's depth and together you speak what you've found?`
    }
  },

  "swimmer+unbound": {
    thesis: "Two navigators of unmapped territory—the questioner of depths and the transcender of limits. Beautiful explorations together, but who anchors the expedition when both prefer the journey to arrival?",

    distanceAnalysis: `When The Deep meets The Transcendent, you're both comfortable beyond conventional boundaries. The Deep is comfortable in intellectual depths—holding questions that others would resolve too quickly, exploring territory that has no map. The Unbound is comfortable in existential expansion—imagining forms of consciousness and being that transcend current limits. You're both explorers of the unknown.

This shared comfort with the unmapped creates immediate recognition. Neither of you needs solid ground to feel safe. Neither of you insists on conclusions before the inquiry is complete. You both understand that some truths can only be found by venturing beyond where others stop. In each other, you find a fellow traveler who doesn't need a destination.`,

    dynamic: `At its core, this pairing brings together two forms of venturing beyond. The Deep ventures into intellectual depths; the Unbound ventures into existential possibilities. Together, you can explore territories that would terrify more grounded souls—questions without answers, possibilities without precedent.

The dynamic between you is one of mutual permission to keep going. The Deep doesn't ask the Unbound to come back to earth; the Unbound doesn't ask the Swimmer to surface with conclusions. You validate each other's appetite for the beyond, whatever form that takes.

But this same mutual permission can become mutual abandonment of ground. If neither of you anchors the expedition, if both of you only value the journey, you can drift together into territories so abstract they lose contact with lived reality. The depths and the heights can both become escapes from the middle—from the actual life you're living while you explore.`,

    align: [
      {
        point: "Comfort with the unknown",
        explanation: `Neither of you requires certainty to feel secure. The Deep can hold questions indefinitely; the Unbound can imagine possibilities without knowing if they're achievable. This shared tolerance for uncertainty means your explorations aren't cut short by anxiety about not-knowing.`
      },
      {
        point: "Imagination as tool",
        explanation: `Both of you use imagination seriously—not as escape but as exploration. The Deep imagines possibilities beneath the surface of things; the Unbound imagines possibilities beyond the limits of things. This shared use of imagination as a serious tool connects you.`
      },
      {
        point: "Beyond the conventional",
        explanation: `Neither of you is satisfied with ordinary answers to extraordinary questions. The Deep keeps questioning when others would stop; the Unbound keeps reaching when others would settle. You both understand that the most important truths might lie outside conventional territory.`
      }
    ],

    clash: [
      {
        point: "Depth vs. transcendence",
        explanation: `The Deep goes down—into complexity, nuance, the depths of a question. The Unbound goes out—past limits, toward possibilities that don't exist yet. These movements aren't opposed, but they're different. When your explorations diverge, which direction do you follow? Whose unmapped territory gets explored?`
      }
    ],

    give: {
      youToThem: `If you're the Swimmer, you offer the Unbound intellectual rigor. Their transcendent vision is beautiful, but is it grounded in anything? You model the possibility of exploring beyond limits while still asking hard questions, of imagination disciplined by inquiry. You give their reaching depth.`,
      themToYou: `If you're The Transcendent, you offer the Swimmer horizon expansion. Their questioning is powerful, but questions asked within too narrow a frame miss larger possibilities. You model the possibility of questioning that includes transcendence, of depth that reaches toward the stars. You give their swimming scope.`
    },

    risk: `The failure mode for this pairing is beautiful disconnection from reality. If both of you only value exploration—the Swimmer's endless questions, the Unbound's limitless reaching—you can drift together into abstraction so pure it loses contact with lived life. The questions never land; the transcendence never touches ground. You might be brilliant together and also irrelevant.

The deeper risk is that you enable each other's avoidance of commitment. The Deep avoids conclusions; the Unbound avoids limits. Together, you can create a relationship that's always expanding and never settling, always exploring and never arriving. At some point, life requires choosing. If neither of you can anchor the expedition, you might explore forever without finding home.`,

    question: {
      text: "What have your explorations been avoiding—and what would it mean to bring your discoveries back to the ordinary life you share?",
      framing: `This question matters because it asks you to complete the explorer's journey. Going out is only half the work; the other half is bringing something back. What have you found in your shared depths and heights that could enrich the actual life you're living together?`
    }
  },

  "architect+mender": {
    thesis: "Two systems thinkers meeting at the intersection of design and repair—one builds new structures, one restores old ones. Easy resonance in shared understanding of how things work, but whose vision of the system prevails?",

    distanceAnalysis: `When The Architect meets The Mender, you share a fundamental orientation toward systems. The Architect sees systems as things to be designed—structures that could exist but don't yet, commons that could serve everyone if built properly. The Mender sees systems as things to be maintained—structures that already exist and deserve care, infrastructure that keeps working because someone keeps fixing it. You both think in systems.

This shared systems-thinking creates immediate recognition. Neither of you looks at the world in purely individual terms. Neither of you ignores structure in favor of personality. You both understand that most of what happens is shaped by systems—designed or inherited, functional or failing. In each other, you find someone who sees the same blueprints.`,

    dynamic: `At its core, this pairing brings together two relationships to structure. The Architect designs for futures that don't exist yet; the Mender cares for structures that already do. Together, you might create a more complete approach—new designs informed by repair wisdom, maintenance oriented toward better futures.

The dynamic between you is one of complementary vision. The Architect sees what could be built; the Mender sees what needs to be fixed. Neither dismisses the other's focus. This creates productive space where building and repairing work together.

But this same complementarity can create tension about priorities. The Architect may see the Mender's repairs as putting effort into systems that should be replaced; the Mender may see the Architect's new designs as abandoning systems that just need care. When resources are finite, do you build new or fix old? Your shared systems-thinking doesn't automatically resolve this tension.`,

    align: [
      {
        point: "Systems thinking",
        explanation: `Both of you see the structures beneath the surface. The Architect designs them; the Mender maintains them. This shared attention to how things work—not just what they are—creates a foundation for deep understanding. You both know that changing individuals matters less than changing systems.`
      },
      {
        point: "Belief in function",
        explanation: `Both of you believe that things can work properly. The Architect believes in good design; the Mender believes in good repair. Neither of you is cynical about the possibility of functional systems. This shared optimism about structure connects you.`
      },
      {
        point: "Care expressed through work",
        explanation: `Neither of you just thinks about systems—you do something about them. The Architect's design is a form of care; the Mender's repair is a form of care. You both understand that love for the commons requires labor.`
      }
    ],

    clash: [
      {
        point: "Build new vs. fix old",
        explanation: `The Architect is oriented toward creation—designing structures that don't exist yet. The Mender is oriented toward preservation—caring for structures that already do. When a system is failing, the Architect may want to replace it; the Mender may want to restore it. Whose approach is right? The answer depends on context, but you'll instinctively lean different directions.`
      },
      {
        point: "Whose system matters?",
        explanation: `The Architect's new design serves their vision of the commons; the Mender's repair preserves what already exists. These aren't always compatible. The Mender may be maintaining something the Architect thinks should be redesigned. The tension isn't about method but about what deserves investment.`
      }
    ],

    give: {
      youToThem: `If you're the Architect, you offer the Mender vision for what their repairs could become. Their maintenance is valuable, but maintenance in service of what? You show them that the systems they're fixing could be transformed, that repair can be a step toward something better rather than just preservation of what is.`,
      themToYou: `If you're the Mender, you offer the Architect respect for what already exists. Their designs are beautiful, but they don't start from nothing—there's always existing infrastructure, previous attempts, systems that people depend on right now. You ground their vision in what's actually there, showing them that building and repairing can work together.`
    },

    risk: `The failure mode for this pairing is parallel work that never integrates. The Architect designs new systems; the Mender repairs old ones; neither informs the other's work. The new designs don't learn from repair wisdom; the repairs don't orient toward better futures. You coexist rather than collaborate.

The deeper risk is that you compete for resources rather than combining forces. In a world of limited attention and energy, do you spend it on the Architect's new design or the Mender's maintenance of the old? This can become a quiet power struggle disguised as methodological difference. The question isn't which approach is right but how they might work together.`,

    question: {
      text: "How might your building and their repairing serve the same commons—and what would a system look like that you designed and maintained together?",
      framing: `This question matters because it asks you to integrate your different orientations rather than choosing between them. The commons needs both new design and ongoing care. What becomes possible when you stop seeing these as competing and start seeing them as complementary?`
    }
  }
};

// Generate analytical content from existing PairDynamic data + distance calculations
function generateAnalyticalPairDynamic(a: string, b: string): AnalyticalPairDynamic {
  const pairDynamic = getPairDynamicExpanded(a, b);
  const { category, value: distanceValue } = getPairDistance(a, b);
  const distanceDesc = distanceDescriptions[category];

  const archA = archetypes[a];
  const archB = archetypes[b];

  // Build distance analysis based on category and archetype positions
  const distanceAnalysis = generateDistanceAnalysis(a, b, category, distanceValue, archA, archB);

  // Build dynamic section from archetype superpowers and blindspots
  const dynamic = generateDynamicAnalysis(a, b, archA, archB, pairDynamic);

  // Expand align points with explanations
  const align = pairDynamic.align.map((point, i) => ({
    point,
    explanation: generateAlignExplanation(point, archA, archB, i),
  }));

  // Expand clash points with explanations
  const clash = pairDynamic.clash.map((point, i) => ({
    point,
    explanation: generateClashExplanation(point, archA, archB, i, pairDynamic.warning),
  }));

  // Expand give/exchange sections
  const give = {
    youToThem: generateGiveExplanation(pairDynamic.give.youToThem, archA, archB, "you"),
    themToYou: generateGiveExplanation(pairDynamic.give.themToYou, archB, archA, "them"),
  };

  // Generate risk section
  const risk = generateRiskAnalysis(a, b, archA, archB, pairDynamic, category);

  // Build question with framing
  const question = {
    text: pairDynamic.question,
    framing: generateQuestionFraming(pairDynamic.question, archA, archB, category),
  };

  return {
    thesis: pairDynamic.thesis,
    distanceAnalysis,
    dynamic,
    align,
    clash,
    give,
    risk,
    question,
  };
}

// Helper: Generate distance analysis paragraph
function generateDistanceAnalysis(
  a: string,
  b: string,
  category: DistanceCategory,
  distanceValue: number,
  archA: Archetype | undefined,
  archB: Archetype | undefined
): string {
  const nameA = archA?.name || a;
  const nameB = archB?.name || b;

  if (category === "close") {
    return `${nameA} and ${nameB} sit near each other on the philosophical map—close enough to finish each other's sentences, close enough to share assumptions without examining them. This proximity brings comfort: you recognize each other. You don't have to explain your fundamental premises. But this same closeness carries risk. When two people see the world similarly, they can reinforce each other's blind spots. The things you both fail to notice become invisible, confirmed by mutual agreement. Your challenge isn't learning to understand each other—it's learning to see what neither of you naturally sees.`;
  } else if (category === "far") {
    return `${nameA} and ${nameB} sit far apart on the philosophical map—different enough that your instincts pull in opposite directions. What feels obvious to one often puzzles the other. This distance creates friction: you'll misunderstand each other, talk past each other, wonder how anyone could see things that way. But this same distance is valuable. You cover each other's blind spots. Between you, a more complete picture of reality emerges than either could construct alone. Your challenge isn't avoiding disagreement—it's learning to treat your differences as data rather than defects.`;
  } else {
    return `${nameA} and ${nameB} sit at a middle distance on the philosophical map—different enough to bring fresh perspectives, close enough to find common ground. You won't agree on everything, but you'll understand why you disagree. This moderate distance is often the most productive: enough friction to generate insight, enough overlap to build trust. Your challenge is finding the balance between learning from your differences and leveraging your similarities.`;
  }
}

// Helper: Generate dynamic analysis paragraphs
function generateDynamicAnalysis(
  a: string,
  b: string,
  archA: Archetype | undefined,
  archB: Archetype | undefined,
  pairDynamic: PairDynamic
): string {
  if (!archA || !archB) return "";

  const nameA = archA.name.replace(/^The /, "");
  const nameB = archB.name.replace(/^The /, "");
  const powerA = archA.superpower;
  const powerB = archB.superpower;
  const blindA = archA.blindSpot;
  const blindB = archB.blindSpot;

  // Get distance for context
  const { category } = getPairDistance(a, b);

  // Build dynamic based on how their superpowers interact
  let dynamic = `The ${nameA} sees through the lens of ${powerA.toLowerCase()}. The ${nameB} sees through ${powerB.toLowerCase()}. `;

  if (category === "close") {
    dynamic += `These orientations rhyme—you're tuned to similar frequencies, which makes understanding easy but growth harder. `;
    dynamic += `The risk: you reinforce each other's assumptions instead of challenging them.`;
  } else if (category === "far") {
    dynamic += `These are genuinely different ways of being in the world. What looks obvious to one can be invisible to the other. `;
    dynamic += `The gift: you see around each other's blind spots. The work: staying curious when confusion feels like conflict.`;
  } else {
    dynamic += `Different enough to surprise each other, similar enough to stay in conversation. `;
    dynamic += `You'll misread each other sometimes. Naming it helps.`;
  }

  return dynamic;
}

// Helper: Generate alignment explanation
function generateAlignExplanation(
  point: string,
  archA: Archetype | undefined,
  archB: Archetype | undefined,
  index: number
): string {
  if (!archA || !archB) return "";

  const nameA = archA.name.replace(/^The /, "");
  const nameB = archB.name.replace(/^The /, "");
  const powerA = archA.superpower.toLowerCase();
  const powerB = archB.superpower.toLowerCase();

  // Connect the alignment to HOW each archetype expresses it
  if (index === 0) {
    return `The ${nameA} gets here through ${powerA}. The ${nameB} through ${powerB}. Different routes, same territory.`;
  } else {
    return `Both worldviews, for different reasons, treat this as ground to stand on.`;
  }
}

// Helper: Generate clash explanation
function generateClashExplanation(
  point: string,
  archA: Archetype | undefined,
  archB: Archetype | undefined,
  index: number,
  warning?: string
): string {
  if (!archA || !archB) return "";

  const nameA = archA.name.replace(/^The /, "");
  const nameB = archB.name.replace(/^The /, "");

  // Short, specific explanation of the friction
  if (index === 0) {
    return `The ${nameA} reads this one way; the ${nameB} reads it another. Neither is wrong—but the translations don't match.`;
  } else {
    return `This is where your defaults diverge. Not a dealbreaker, but worth knowing.`;
  }
}

// Helper: Generate give/exchange explanation
function generateGiveExplanation(
  giftSummary: string,
  giver: Archetype | undefined,
  receiver: Archetype | undefined,
  direction: "you" | "them"
): string {
  if (!giver || !receiver) return giftSummary;

  const giverName = giver.name.replace(/^The /, "");
  const power = giver.superpower.toLowerCase();

  let cleaned = giftSummary;

  // Handle "You [verb]" or "They [verb]" patterns - convert to third person
  if (/^You\s+/i.test(giftSummary)) {
    cleaned = giftSummary.replace(/^You\s+/i, "");
    // Add 's' for third person verb (show → shows, keep → keeps)
    const firstWord = cleaned.split(" ")[0];
    const rest = cleaned.slice(firstWord.length);
    cleaned = firstWord.charAt(0).toUpperCase() + firstWord.slice(1) + "s" + rest;
  } else if (/^They\s+/i.test(giftSummary)) {
    cleaned = giftSummary.replace(/^They\s+/i, "");
    const firstWord = cleaned.split(" ")[0];
    const rest = cleaned.slice(firstWord.length);
    cleaned = firstWord.charAt(0).toUpperCase() + firstWord.slice(1) + "s" + rest;
  } else {
    // Noun phrase like "A reminder that..." - prefix with "Offers"
    cleaned = "Offers " + giftSummary.charAt(0).toLowerCase() + giftSummary.slice(1);
  }

  return `${cleaned}—the ${giverName}'s ${power} at work.`;
}

// Helper: Generate risk analysis
function generateRiskAnalysis(
  a: string,
  b: string,
  archA: Archetype | undefined,
  archB: Archetype | undefined,
  pairDynamic: PairDynamic,
  category: DistanceCategory
): string {
  // Just use the handcrafted warning if it exists
  return pairDynamic.warning || "";
}

// Helper: Generate question framing
function generateQuestionFraming(
  question: string,
  archA: Archetype | undefined,
  archB: Archetype | undefined,
  category: DistanceCategory
): string {
  if (!archA || !archB) return "";

  const nameA = archA.name.replace(/^The /, "");
  const nameB = archB.name.replace(/^The /, "");

  // Explain what the question asks each person to confront
  return `For the ${nameA}, this question pokes at assumptions. For the ${nameB}, it asks for a leap. That's the point.`;
}

// Get analytical pair dynamic - always generates rich content with full explanations
export function getAnalyticalPairDynamic(a: string, b: string): AnalyticalPairDynamic {
  // Always generate the rich analytical content with full explanations
  // The handcrafted content in analyticalPairDynamics uses an older simplified format
  // without the detailed explanation paragraphs that the component needs
  return generateAnalyticalPairDynamic(a, b);
}

export const detailedPairDynamics: Record<string, DetailedPairDynamic> = {
  "alive+conscience": {
    align: ["You both feel things deeply"],
    clash: ["One wants to feel. One wants to watch."],
    give: "They keep you grounded. You remind them to live.",
  },
  "alive+rooted": {
    align: ["You both know what matters"],
    clash: ["One moves constantly. One stays still."],
    give: "They slow you down. You wake them up.",
  },
  "architect+mender": {
    align: ["You both think in systems"],
    clash: ["One designs new. One fixes old."],
    give: "They repair what you build. You give their repairs a home.",
  },
  "architect+swimmer": {
    align: ["You both care about getting it right"],
    clash: ["One builds systems. One questions them."],
    give: "They push you to structure your questions. You keep their systems honest.",
  },
  "between+cleareyed": {
    align: ["You both live with uncertainty"],
    clash: ["One sees clearly. One is still looking."],
    give: "They help you see. You remind them that seeing isn't everything.",
  },
  "citizen+conscience": {
    align: ["You both believe in good systems"],
    clash: ["One trusts the architecture. One tests it for cracks."],
    give: "They keep you honest. You keep them hopeful.",
  },
  "citizen+shaper": {
    align: ["You both believe in what's possible"],
    clash: ["One trusts the system. One wants to rebuild it."],
    give: "They bring stability. You bring change.",
  },
  "cleareyed+presence": {
    align: ["You both see what's really there"],
    clash: ["One speaks the truth. One holds the space."],
    give: "They make space for your truth. You help them speak it.",
  },
  "conscience+embers": {
    align: ["You both guard what matters"],
    clash: ["One watches the present. One guards the past."],
    give: "They remember why you watch. You help them watch what happens now.",
  },
  "embers+presence": {
    align: ["You both value what endures"],
    clash: ["One looks back. One stays present."],
    give: "They remind you where you came from. You remind them where you are.",
  },
  "embers+shaper": {
    align: ["You both care deeply about what gets built"],
    clash: ["One races forward, the other holds back"],
    give: "They remind you what you're building toward. You remind them what to carry forward.",
  },
  "friction+unbound": {
    align: ["You both reject easy comfort"],
    clash: ["One craves resistance. One transcends it."],
    give: "They ground your transcendence. You expand their friction.",
  },
  "mender+swimmer": {
    align: ["You both see what needs attention"],
    clash: ["One acts. One questions."],
    give: "They push you to decide. You help them understand why.",
  },
  "presence+unbound": {
    align: ["You both seek truth beyond the surface"],
    clash: ["One stays embodied. One wants to transcend."],
    give: "They remind you of what's here. You remind them of what's possible.",
  },
  "rooted+shaper": {
    align: ["You both have strong convictions"],
    clash: ["One wants to tear it down. One wants to sit with it."],
    give: "They keep you grounded. You keep them moving.",
  },
  "shaper+swimmer": {
    align: ["You both reject easy answers"],
    clash: ["One builds. One questions."],
    give: "They make you examine your creations. You make them bring ideas to life.",
  },
};

// Helper to get detailed pair dynamic
export function getDetailedPairDynamic(a: string, b: string): DetailedPairDynamic | null {
  const key = [a, b].sort().join("+");
  return detailedPairDynamics[key] || null;
}

// Generate a fallback dynamic based on archetype positions
export function generateFallbackDynamic(a: string, b: string): DetailedPairDynamic {
  const posA = archetypePositions[a];
  const posB = archetypePositions[b];
  const archA = archetypes[a];
  const archB = archetypes[b];

  // Calculate distance
  const dx = (posB?.x || 0) - (posA?.x || 0);
  const dy = (posB?.y || 0) - (posA?.y || 0);
  const distance = Math.sqrt(dx * dx + dy * dy);

  let align: string[];
  let clash: string[];
  let give: string;

  if (distance < 0.4) {
    // Close together - similar worldviews
    align = ["You see the world similarly", "Shared values come naturally"];
    clash = ["You might reinforce each other's blind spots"];
    give = "Comfort in being understood. The risk of an echo chamber.";
  } else if (distance > 1.0) {
    // Far apart - opposite worldviews
    align = ["You cover each other's blind spots"];
    clash = ["Your instincts pull in opposite directions", "What feels obvious to you puzzles them"];
    give = `They bring ${archB?.superpower || "their perspective"}. You bring ${archA?.superpower || "yours"}.`;
  } else {
    // Medium distance
    align = ["Different approaches to similar questions"];
    clash = ["Your methods differ even when your goals align"];
    give = `Together, you see more than either would alone.`;
  }

  return { align, clash, give };
}

// Distance categories for relationship analysis
export type DistanceCategory = "close" | "medium" | "far";

export function getPairDistance(a: string, b: string): { category: DistanceCategory; value: number } {
  const posA = archetypePositions[a];
  const posB = archetypePositions[b];

  const dx = (posB?.x || 0) - (posA?.x || 0);
  const dy = (posB?.y || 0) - (posA?.y || 0);
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 0.4) return { category: "close", value: distance };
  if (distance > 1.0) return { category: "far", value: distance };
  return { category: "medium", value: distance };
}

export const distanceDescriptions: Record<DistanceCategory, string> = {
  close: "You sit near each other on the map. Similar worldviews bring comfort—and the risk of reinforcing each other's blind spots.",
  medium: "You sit at a comfortable distance. Different enough to learn from each other, close enough to understand.",
  far: "You sit far apart on the map. This distance creates creative tension—you'll challenge each other's assumptions.",
};

// Question bank for relationship reflection
export const relationshipQuestions: Record<DistanceCategory, string[]> = {
  close: [
    "What blind spot might you both be missing?",
    "When did you last genuinely disagree about something that mattered?",
    "Who do you need in your life to challenge what you both take for granted?",
  ],
  medium: [
    "What has this person shown you that you couldn't see alone?",
    "Where do your different approaches actually complement each other?",
    "What question would you ask them that you've been avoiding?",
  ],
  far: [
    "When you disagree, who speaks first? What would happen if you switched?",
    "What have they been right about that you initially dismissed?",
    "What would it cost you to fully understand their perspective?",
  ],
};

// Get a question for a pair based on their distance
export function getRelationshipQuestion(a: string, b: string): string {
  const { category } = getPairDistance(a, b);
  const questions = relationshipQuestions[category];
  // Use a deterministic selection based on the pair
  const key = [a, b].sort().join("+");
  const index = key.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % questions.length;
  return questions[index];
}

// Get opening thesis - use pairDynamics if available, otherwise generate
export function getOpeningThesis(a: string, b: string): string {
  const key = [a, b].sort().join("+");

  // Check pairDynamics first
  if (pairDynamics[key]) {
    return pairDynamics[key];
  }

  // Check detailedPairDynamics give text
  if (detailedPairDynamics[key]) {
    return detailedPairDynamics[key].give;
  }

  // Generate based on distance
  const { category } = getPairDistance(a, b);
  const archA = archetypes[a];
  const archB = archetypes[b];

  if (category === "close") {
    return "You speak the same language. The question is whether you can hear what neither of you is saying.";
  } else if (category === "far") {
    return `One ${archA?.superpower?.toLowerCase() || "sees one way"}. The other ${archB?.superpower?.toLowerCase() || "sees another"}. Between you, a more complete picture.`;
  }
  return "Different paths to similar questions. Together, you see more than either would alone.";
}
