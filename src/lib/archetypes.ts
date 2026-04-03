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
    books: [
      { title: "The Player of Games", author: "Banks", reason: "The Culture at its most playful—a civilization where games become the highest art because survival has been solved." },
      { title: "Accelerando", author: "Stross", reason: "What happens when abundance accelerates past human comprehension, and the economy becomes incomprehensible to its creators." },
      { title: "Down and Out in the Magic Kingdom", author: "Doctorow", reason: "Post-scarcity as actually lived: messy, political, and still full of people trying to figure out what matters." }
    ],
    compatibility: {
      ally: "the one who wants to feel everything",
      tension: "the one who's watching for what's being hidden",
      need: "the one who craves difficulty"
    },
    superpowerExpanded: `Most people operate from a scarcity mindset without noticing it. They hoard information, guard opportunities, assume resources are zero-sum. You don't.

This isn't naivety. You've thought about it. You've read the economic arguments, the technological projections, the science fiction that takes abundance seriously. And you've concluded that the biggest barrier to abundance isn't resources—it's imagination. Most scarcity is manufactured or inherited, and you can see past it.

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

    howYouGotHere: `Your answers revealed a consistent orientation toward trust and possibility. When asked about AI and automation, you focused on potential benefits rather than risks. When asked about human nature, you leaned toward believing people do well when given resources and freedom. When asked about the future, you imagined expansion rather than constraint. This pattern—trusting abundance over scarcity, freedom over control—maps to what we call "Citizen of Abundance."`,

    allyDescription: "Alive to Everything shares your belief that life can be good. They want to feel everything the universe offers; you want everyone to have access to it. You're both optimists, but they ground your systems-thinking in embodied experience. They remind you what abundance is for.",

    tensionDescription: "Conscience Before Comfort doesn't trust what you trust. While you see systems that could work beautifully, they see cracks, hidden costs, who's being surveilled. They'll exhaust you with suspicion—and occasionally save you from your own blind spots.",

    needDescription: "Alive in the Friction will challenge your comfort. You believe abundance should make life easier; they believe ease can make life hollow. They'll push you to examine whether your utopia has room for struggle, growth, and the meaning that comes from difficulty."
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
    books: [
      { title: "Parable of the Sower", author: "Butler", reason: "Building a new belief system from the ruins. Change as spiritual practice." },
      { title: "Red Mars", author: "Robinson", reason: "Terraforming as philosophy—every technical choice is a political one, and the planet pushes back." },
      { title: "The Diamond Age", author: "Stephenson", reason: "Education as revolution. The primer doesn't just teach—it transforms who you can become." }
    ],
    compatibility: {
      ally: "the one who craves difficulty",
      tension: "the one who chose stillness",
      need: "the one who guards what came before"
    },
    superpowerExpanded: `When others see rubble, you see raw material. When others mourn what's ending, you're already sketching what comes next.

This isn't insensitivity—it's a different relationship with time. You understand, at a cellular level, that everything is always changing. Fighting that reality wastes energy better spent shaping what emerges. Octavia Butler's Earthseed philosophy resonates with you: "God is Change." Not because change is good, but because change is true, and aligning with truth gives you leverage.

You're valuable in moments of collapse and transition, when others are frozen by grief or fear. You can move when movement matters most.`,

    blindSpotExpanded: `Movement can become its own addiction. Tearing something down feels like progress even when it isn't.

You may reach for revolution when reform would serve better. You may burn bridges that were worth crossing again. The thrill of starting over can mask a fear of the slower, harder work of maintaining, repairing, living with imperfection.

Watch for the moments when your urge to build from scratch is actually an urge to escape—from boredom, from accountability, from the tedious work of making something existing actually work. Not everything that feels stuck is calcified. Sometimes roots are growing.`,

    coreBeliefs: [
      "Change is the only constant; resistance to it is wasted energy",
      "The best time to build something new is when the old thing is falling apart",
      "Adaptation is a form of intelligence; calcification is a form of death",
      "Every crisis is a construction site if you know how to look"
    ],

    howYouGotHere: `Your answers clustered around transformation and agency. When asked about stability, you valued it less than others. When asked about tradition, you saw it as raw material rather than constraint. When faced with hypothetical collapses—social, technological, environmental—you oriented toward building rather than preserving. This consistent bias toward change and construction maps to what we call "Shaper of Change."`,

    allyDescription: "Alive in the Friction understands your restlessness. They don't just tolerate difficulty—they seek it out. While others ask you to slow down, they'll match your pace and push you further. They validate that the struggle itself has value.",

    tensionDescription: "Rooted in Stillness is your opposite. They chose to stop moving; you can't imagine why anyone would. Their stillness looks like stagnation to you; your movement looks like flight to them. You're arguing about the fundamental nature of growth.",

    needDescription: "Keeper of Embers guards what you might carelessly discard. They remember what worked, what was lost, what deserves to be carried forward. Without them, you risk building the same failures again with different names. They're the conscience of your construction site."
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
    superpowerExpanded: `You see the invisible architecture. Every social space has rules—written and unwritten, designed and emergent—and you can read them like blueprints.

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

    howYouGotHere: `Your answers revealed a consistent orientation toward collective ownership and structural thinking. When asked about governance, you preferred distributed over centralized. When asked about technology, you focused on who controls it rather than what it can do. When asked about utopia, you described something that belongs to everyone. This pattern—systems-thinking in service of the commons—maps to what we call "Architect of the Commons."`,

    allyDescription: "Mender of What Remains shares your commitment to things that work. While you design new systems, they repair existing ones. You're natural partners: you provide the blueprints, they provide the maintenance. Together, you build things that last.",

    tensionDescription: "Unbound from Form challenges your attachment to structure itself. They want to transcend form; you want to perfect it. They'll ask why you're building walls at all. It's a fundamental disagreement about whether liberation requires architecture or escape from it.",

    needDescription: "Swimmer in Deep Water will slow you down with questions you can't answer quickly. When you're ready to implement, they're still asking why. This is frustrating—and necessary. They ensure your systems are built on real understanding, not efficient assumptions."
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
    superpowerExpanded: `Showing up fully sounds simple. It isn't. Most people are present in body but absent in attention—planning, rehearsing, defending, performing. The person in front of them is a prop in their internal drama.

You have an unusual capacity to actually be in the room. People feel it. They may not be able to name what you're doing differently, but they register it. Conversations with you land differently. Someone's life is different because you were there. You may never know whose.

This is valuable precisely because it's rare. In a world optimized for productivity, pure attention is a radical act. You understand what Klara understood: the difference between capability and care is everything.`,

    blindSpotExpanded: `You can use care as a way to avoid confrontation.

Staying present feels virtuous. Usually it is. But sometimes the brave choice is leaving the room—ending the conversation, saying the thing that breaks the connection in order to tell the truth. Holding space can become holding on.

Your instinct is to be with people in their difficulty. That's valuable. But presence can become a way of avoiding the rupture that growth requires. Watch for the moments when "being present" is actually "being safe"—when staying in the room lets you avoid saying the thing that needs to be said.`,

    coreBeliefs: [
      "The most valuable thing you can give someone is your undivided attention",
      "Efficiency is often the enemy of depth",
      "Technology should enable presence, not replace it",
      "Most problems are really loneliness in disguise"
    ],

    howYouGotHere: `Your answers clustered strongly around a consistent worldview. When asked about machine companionship, you distinguished between capability and care. When asked about unstructured time, you oriented toward people, not projects. When asked about the future, you focused on what we might lose, not what we might gain. This pattern—valuing presence over productivity, attention over achievement—maps to what we call "Keeper of Presence."`,

    allyDescription: "Rooted in Stillness shares your groundedness. They understand that presence matters more than progress. They'll feel like home—someone who doesn't need you to justify slowing down, who knows that stopping can be the bravest choice.",

    tensionDescription: "Unbound from Form challenges your attachment to embodiment. They want to transcend; you want to stay. They'll ask why you're so committed to being here when there's so much more beyond. You're arguing about what it means to be present at all.",

    needDescription: "Clear-Eyed in the Storm will say the thing you're avoiding. It will hurt. You need that—someone who values truth over comfort, even when comfort is what you offer. They'll help you see when presence has become avoidance."
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
    superpowerExpanded: `Most people see a question and want to answer it. They see a problem and want to solve it. The discomfort of not-knowing drives them toward resolution—any resolution—as quickly as possible.

You're different. You can sit in the uncertainty. You can hold a question without grasping for an answer. This isn't passivity; it's a different kind of rigor. Lem's Solaris is your sacred text: an ocean that might be conscious but refuses to be understood, and scientists who keep trying anyway, knowing they'll fail.

This capacity is genuinely rare and valuable. In a world that rewards confident answers, your willingness to stay in the question is a kind of intellectual courage. You notice what others rush past.`,

    blindSpotExpanded: `Not-knowing can become its own cowardice.

There's a difference between sitting with genuine uncertainty and using uncertainty as an excuse to never commit. Questions are infinite; life is not. At some point, you have to act on incomplete information—everyone does. If you wait for certainty, you'll wait forever.

Watch for the moments when "I'm still thinking about it" is actually "I'm afraid to be wrong." Watch for when philosophical depth becomes a way of avoiding the messiness of decision. The deep water is beautiful, but you can drown in it.`,

    coreBeliefs: [
      "The best questions are the ones that can't be fully answered",
      "Certainty is usually a sign that something is being ignored",
      "Understanding matters more than solving",
      "The deepest truths reveal themselves slowly, if at all"
    ],

    howYouGotHere: `Your answers revealed a consistent orientation toward depth over resolution. When asked about consciousness, you leaned into mystery rather than explanation. When asked about the future, you focused on what we don't understand rather than what we might build. When given choices between action and reflection, you chose reflection. This pattern—valuing questions over answers, depth over speed—maps to what we call "Swimmer in Deep Water."`,

    allyDescription: "Unbound from Form shares your comfort with uncertainty. They're reaching past the edges of what's known; you're diving into the depths. You both understand that the most important things resist easy comprehension. They'll never rush you toward answers.",

    tensionDescription: "Mender of What Remains needs to fix things. While you're still asking why it broke, they're already reaching for tools. Your reflection looks like paralysis to them; their action looks like avoidance to you. You're arguing about when understanding is enough.",

    needDescription: "Architect of the Commons will give your questions structure. You can swim in deep water forever; they'll build you a vessel. They ensure your insights eventually serve something beyond your own understanding—that your questions lead somewhere collective."
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
    superpowerExpanded: `In a world that treats acceleration as virtue, you've made a different choice. You know that "more" and "faster" and "bigger" are not always better—that sometimes the most radical thing you can do is stop.

This isn't laziness or passivity. Le Guin's Kesh people in Always Coming Home didn't lack the ability to build empires; they chose not to. Chambers' monk in A Psalm for the Wild-Built isn't avoiding life; they're trying to understand what life is for. Your stillness is a position, argued and defended against a culture that treats it as failure.

You understand something that productivity culture cannot: that human beings are not problems to be optimized. That stopping is not failure. That sometimes the answer to "what should I do?" is genuinely "nothing, and that's okay."`,

    blindSpotExpanded: `Stillness can become withdrawal. Choosing to stop is a luxury not everyone can afford.

Your peace is real, but it exists in a world where others are still struggling. The monk on the mountain didn't solve the suffering in the valley. Your stillness can look like abandonment to the people who need you—especially if they're drowning while you're meditating.

Watch for the moments when "choosing simplicity" becomes "choosing comfort." Watch for when "knowing when to stop" becomes "refusing to start." The question isn't whether stillness has value—it does—but whether your particular stillness serves anyone beyond yourself.`,

    coreBeliefs: [
      "The most radical act in a growth-obsessed world is to stop and mean it",
      "Human beings are not problems to be optimized",
      "Simplicity chosen is different from simplicity imposed",
      "What we need is often already here, if we stop reaching for more"
    ],

    howYouGotHere: `Your answers revealed a consistent orientation toward simplicity and stillness. When asked about progress, you questioned whether it was always desirable. When asked about the future, you imagined returning rather than advancing. When others chose growth, you chose depth. This pattern—valuing stillness over motion, enough over more—maps to what we call "Rooted in Stillness."`,

    allyDescription: "Keeper of Presence shares your groundedness. They understand that being here fully is worth more than racing toward what's next. They won't ask you to justify your stillness or defend your choice to stop. With them, you can simply be.",

    tensionDescription: "Shaper of Change can't stop building. Your stillness looks like stagnation to them; their restlessness looks like flight to you. They'll push you to move when you've chosen to stay. You're arguing about fundamental questions of what growth means.",

    needDescription: "Alive to Everything will pull you out of stillness when you need it. Not to invalidate your peace, but to remind you that life includes sensation, experience, movement. They ensure your rootedness doesn't become a way of hiding from the full range of being alive."
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
    books: [
      { title: "1984", author: "Orwell", reason: "The nightmare that taught us to recognize the signs. Big Brother wasn't a prediction—it was a warning." },
      { title: "Brave New World", author: "Huxley", reason: "The dystopia that seduces. Comfort as control. The soma we choose over the truth we can't bear." },
      { title: "The Handmaid's Tale", author: "Atwood", reason: "Everything in this book has happened somewhere. The power of witness against forgetting." }
    ],
    compatibility: {
      ally: "the one who tells the truth",
      tension: "the one who's made peace with abundance",
      need: "the one who values presence above all"
    },
    superpowerExpanded: `You see what others prefer to ignore. The fine print. The missing names. The cost that doesn't appear on the balance sheet. Someone has to watch the watchers, and that someone is you.

This isn't paranoia—it's pattern recognition. You've read Orwell, Huxley, Atwood. You know that dystopia rarely announces itself. It arrives disguised as convenience, as safety, as efficiency. The comfortable world is not automatically the good one. Every surveillance system was built to help. Every authoritarian regime began with popular support.

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

    howYouGotHere: `Your answers revealed a consistent orientation toward vigilance and accountability. When asked about technology, you focused on surveillance and control rather than capability. When asked about utopia, you described built-in accountability rather than built-in trust. When others saw convenience, you saw potential costs. This pattern—conscience before comfort, watching what others prefer to ignore—maps to what we call "Conscience Before Comfort."`,

    allyDescription: "Clear-Eyed in the Storm shares your commitment to truth. They speak it; you guard it. Together, you form a bulwark against comfortable lies. They'll validate your vigilance without calling it paranoia.",

    tensionDescription: "Citizen of Abundance trusts what you suspect. They see systems working; you see systems failing. Their optimism will feel naive to you; your suspicion will feel exhausting to them. You're arguing about whether the architecture can be trusted.",

    needDescription: "Keeper of Presence will ground you in the human. It's easy to watch systems and forget people. They'll remind you that vigilance without warmth becomes its own kind of coldness—that the point of watching is to protect something worth protecting."
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
    books: [
      { title: "A Canticle for Leibowitz", author: "Miller", reason: "Monks preserving fragments of knowledge through a dark age. Memory as sacred duty." },
      { title: "Always Coming Home", author: "Le Guin", reason: "A future that remembers how to live. The Kesh didn't lose the old ways—they chose them." },
      { title: "Parable of the Talents", author: "Butler", reason: "Building a religion from what survives. The ember that becomes a fire." }
    ],
    compatibility: {
      ally: "the one who builds collective structures",
      tension: "the one who can't stop building",
      need: "the one still figuring it out"
    },
    superpowerExpanded: `The most dangerous thing about acceleration is amnesia. Every generation thinks it invented the problems it's facing. You know better.

You understand that the answers aren't in the next technology—they're in the last ten thousand years. The monks in A Canticle for Leibowitz preserved fragments of knowledge through a dark age. Butler's Earthseed grew from what survived. You carry this same instinct: the conviction that memory is not nostalgia but survival.

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

    howYouGotHere: `Your answers revealed a consistent orientation toward memory and continuity. When asked about the future, you looked to the past. When asked about innovation, you asked what wisdom we might lose. When others imagined building something new, you imagined preserving something worth keeping. This pattern—valuing memory over novelty, continuity over disruption—maps to what we call "Keeper of Embers."`,

    allyDescription: "Architect of the Commons shares your concern for what endures. They build structures; you preserve what deserves to live inside them. Together, you create things that last—institutions with memory, systems with roots.",

    tensionDescription: "Shaper of Change is always tearing down and rebuilding. Your treasures look like obstacles to them; their innovations look like amnesia to you. You're arguing about what deserves to survive the next revolution.",

    needDescription: "In the Space Between will challenge your certainties. You know what mattered; they're still figuring out what matters now. Their uncertainty can feel like rootlessness, but it's also openness—the willingness to let new things become worth remembering."
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
    superpowerExpanded: `You understand something that comfort-seeking cultures forget: ease is more dangerous than difficulty. Something in us requires resistance. Take it away, and we atrophy—not just physically, but spiritually.

Bester's Gully Foyle burned through every obstacle because stopping would mean facing himself. That's the shadow side. But the light side is genuine: you know that growth requires friction. That comfort can be a trap. That the muscles—physical, mental, moral—only strengthen under load.

This makes you valuable in moments when others want to quit. You don't romanticize suffering, but you don't flee from it either. You understand that some difficulties are worth choosing, that the struggle itself has value beyond what it produces.`,

    blindSpotExpanded: `You can mistake difficulty for meaning. Not everything hard is worth doing.

There's a version of your philosophy that becomes masochism—seeking suffering for its own sake, treating ease as moral failure, unable to rest because rest feels like surrender. The cult of difficulty can be its own kind of avoidance: if you're always struggling, you never have to ask what you're struggling toward.

Watch for the moments when you're manufacturing friction because you're uncomfortable with peace. Watch for when you're choosing the hard path not because it's better but because it's harder. Sometimes the easy path is the right one. Sometimes the work is learning to receive what's given.`,

    coreBeliefs: [
      "Comfort without challenge leads to atrophy of the soul",
      "Growth requires resistance; ease can be more dangerous than difficulty",
      "Some struggles are worth choosing, independent of their outcomes",
      "The frontier—any frontier—is where we become more than we were"
    ],

    howYouGotHere: `Your answers revealed a consistent orientation toward challenge and resistance. When asked about utopia, you worried about what we'd lose if life became too easy. When asked about meaning, you located it in struggle and growth. When offered ease, you questioned its value. This pattern—embracing difficulty, suspecting comfort—maps to what we call "Alive in the Friction."`,

    allyDescription: "Shaper of Change shares your restlessness. They can't stop building; you can't stop pushing. Together, you're a force that transforms what it touches. They understand that your drive isn't destructive—it's generative.",

    tensionDescription: "Rooted in Stillness chose to stop. Your movement looks like flight to them; their stillness looks like surrender to you. You're having a fundamental argument about whether peace is achievement or defeat.",

    needDescription: "Keeper of Presence will slow you down enough to feel what you're feeling. You can use friction as a way of avoiding presence—always striving, never arriving. They'll help you learn that sometimes the challenge is simply being where you are."
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
    books: [
      { title: "Childhood's End", author: "Clarke", reason: "The last generation of humans watches their children become something unrecognizable. Evolution as transcendence and loss." },
      { title: "Diaspora", author: "Egan", reason: "Minds running on quantum computers, exploring mathematical universes. What's left when the body is optional?" },
      { title: "The Hydrogen Sonata", author: "Banks", reason: "A civilization preparing to Sublime—to leave the material universe entirely. The party at the end of history." }
    ],
    compatibility: {
      ally: "the one who lives in questions",
      tension: "the one who values presence above all",
      need: "the one who guards what came before"
    },
    superpowerExpanded: `The boundary of the self is simply not where you stop. Most people find this frightening. You find it the most interesting question there is.

Clarke's Childhood's End imagines humanity's children becoming something unrecognizable—not death, but transcendence. Egan's Diaspora imagines minds running on quantum computers, exploring mathematical universes. Banks' Culture imagines civilizations choosing to Sublime, to leave the material universe entirely. These aren't dystopias to you. They're possibilities worth taking seriously.

This capacity to imagine beyond current limits is genuinely rare. Most people's imaginations stop at the boundaries of their bodies, their lifespans, their species. You keep going. This makes you valuable for thinking about questions others can't quite frame—about consciousness, identity, what might come after human.`,

    blindSpotExpanded: `You can leave so much behind that you don't recognize what was worth keeping until it's too late.

Transcendence can be another word for escape. The desire to leave the body, to expand beyond human limits, can mask a desire to flee human vulnerability, human connection, human limitation. Not everything worth experiencing fits in a disembodied future.

Watch for the moments when "imagining beyond limits" becomes "dismissing what's here." Watch for when your reach toward transcendence is actually a flinch from intimacy. The body you're eager to leave behind is also the body that feels joy, connection, the particular textures of being alive in this form, in this time. Some of that may not translate.`,

    coreBeliefs: [
      "The boundaries of self, body, and species are not fixed",
      "What we call 'human' is a starting point, not a destination",
      "Transcendence is a serious possibility, not just a fantasy",
      "The most interesting questions are the ones that challenge our assumptions about what we are"
    ],

    howYouGotHere: `Your answers revealed a consistent orientation toward transcendence and expansion. When asked about identity, you questioned its boundaries. When asked about the body, you treated it as optional rather than essential. When asked about the future, you imagined something beyond human. This pattern—reaching past the edges of self and form—maps to what we call "Unbound from Form."`,

    allyDescription: "Swimmer in Deep Water shares your comfort with uncertainty. They live in questions; you reach past them. You both understand that the most important things resist easy comprehension. They'll never ground you prematurely.",

    tensionDescription: "Keeper of Presence is committed to being here. Your transcendence looks like escape to them; their groundedness looks like limitation to you. You're arguing about whether liberation means leaving or arriving.",

    needDescription: "Keeper of Embers will remind you what's worth keeping. In your rush toward transcendence, you may discard things that deserved to be carried forward. They're the anchor that ensures your expansion doesn't become amnesia."
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

You have an unusual capacity for experience—not just seeking it, but receiving it fully. Where others filter, protect, moderate, you open. Banks imagines a Culture where you could engineer twelve new senses and make a sunset last all day. Delany imagines a world where you could change your body, your gender, your self at will. These aren't indulgences to you; they're possibilities worth taking seriously.

This makes you valuable as a sensor, a taster, a canary in the coal mine of experience. You notice what others miss because you're not protecting yourself from it. When something matters, you feel it first.`,

    blindSpotExpanded: `Sensation can become consumption. Feeling everything is not the same as understanding anything.

There's a version of your openness that becomes gluttony—devouring experiences without digesting them, always reaching for the next sensation because sitting with the current one is uncomfortable. The endless pursuit of feeling can be its own kind of numbness: if you're always chasing the next high, you're never actually present to what's here.

Watch for the moments when "alive to everything" becomes "unable to be still with anything." Watch for when experience becomes accumulation rather than integration. Depth requires staying long enough for something to matter beyond the initial sensation.`,

    coreBeliefs: [
      "Experience is the point; the universe gave you everything, the least you can do is feel it",
      "The body is an instrument for receiving reality, not a prison to escape",
      "Boundaries between self and world are more permeable than most people assume",
      "New senses, new perspectives, new forms of experience are worth pursuing"
    ],

    howYouGotHere: `Your answers revealed a consistent orientation toward experience and sensation. When asked about the future, you imagined expanded ways of feeling rather than expanded ways of controlling. When asked about the body, you treated it as an instrument for experience rather than a problem to solve. When offered choices, you chose intensity over safety. This pattern—openness to experience, hunger for sensation—maps to what we call "Alive to Everything."`,

    allyDescription: "Citizen of Abundance shares your optimism. They trust that good things are possible; you want to feel all of them. Together, you're a celebration of what life can be when it's not constrained by fear.",

    tensionDescription: "Conscience Before Comfort keeps asking whether you should feel what you want to feel. Your openness looks like recklessness to them; their vigilance looks like refusal to live. You're arguing about whether experience needs justification.",

    needDescription: "Clear-Eyed in the Storm will tell you truths you'd rather not hear. You can use sensation as a way of avoiding difficult realities. They'll cut through the pleasant haze and show you what you're not wanting to see."
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
    superpowerExpanded: `While everyone else is building arks and uploading consciousness, you're fixing the thing in front of you. This isn't small-mindedness. It's a radical commitment to what is rather than what could be.

Robinson's Ministry for the Future shows climate repair as political thriller—every chapter a different tool for fixing what we broke. His New York 2140 shows a flooded city where people stay anyway, adapting and mending. Mandel's Station Eleven shows someone remembering Shakespeare after the collapse, repairing the spirit. These are your sacred texts.

You understand that the most advanced engineering isn't building the new thing—it's making the existing thing work again. This is humble, unglamorous, essential. The menders keep the world running while the visionaries dream of replacing it.`,

    blindSpotExpanded: `You can become so focused on repair that you miss when something needs to die. Not everything should be saved.

There's a difference between healing and prolonging suffering. Some systems are broken because they should be broken. Some relationships, some institutions, some ways of living have served their purpose and need to end. Your instinct to fix can become an instinct to preserve what should be released.

Watch for the moments when you're repairing something that needs to be replaced. Watch for when your mending is actually delaying a necessary ending. Sometimes the kindest thing is to let go, to stop fixing, to allow the death that makes room for something new.`,

    coreBeliefs: [
      "The most advanced engineering is making what exists work again",
      "What we have is worth saving before we build something new",
      "Repair is not a lesser form of creation; it's often the more important one",
      "Stubborn hope is a form of resistance"
    ],

    howYouGotHere: `Your answers revealed a consistent orientation toward repair and continuity. When asked about broken things, you reached for tools rather than replacements. When asked about the future, you focused on fixing what we have rather than building something new. When others dreamed of escape, you committed to staying and mending. This pattern—fixing what's broken, healing what's wounded—maps to what we call "Mender of What Remains."`,

    allyDescription: "Architect of the Commons shares your commitment to what works. They design structures; you maintain them. Together, you build things that last—not just impressive at the start, but functional for the long haul.",

    tensionDescription: "Swimmer in Deep Water wants to understand before acting. While you're already fixing, they're still questioning. Their reflection looks like paralysis to you; your action looks like avoidance to them. You're arguing about when understanding is enough.",

    needDescription: "Alive in the Friction will challenge your comfort with repair. Sometimes what's broken needs to stay broken long enough to feel the friction. They'll push you to consider when mending is actually avoiding the difficulty that growth requires."
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
    books: [
      { title: "Slaughterhouse-Five", author: "Vonnegut", reason: "So it goes. The only honest response to war is to say what happened and not look away." },
      { title: "His Master's Voice", author: "Lem", reason: "Scientists trying to decode an alien message and mostly decoding their own limitations." },
      { title: "The Road", author: "McCarthy", reason: "No hope, no rescue, no meaning—just a father and son walking. The truth stripped to bone." }
    ],
    compatibility: {
      ally: "the one who's watching for what's being hidden",
      tension: "the one who wants to feel everything",
      need: "the one who chose stillness"
    },
    superpowerExpanded: `You have one job: to see what is actually happening and say it out loud. Not the comfortable version, not the diplomatic version, not the version that makes everyone feel better. The version that's true.

Vonnegut's "So it goes" is your mantra. The only honest response to reality is to say what happened and not look away. Lem's scientists in His Master's Voice spend years trying to decode an alien message and mostly end up decoding their own limitations—that's truth-telling too. McCarthy's The Road strips meaning down to bone and keeps going anyway.

This capacity is valuable because it's rare. Most people—even people who think they value honesty—smooth edges, soften blows, protect feelings. You don't. Or you do, but not at the cost of the truth. In a world of comfortable lies, you're the one who says the thing.`,

    blindSpotExpanded: `Honesty without tenderness is cruelty.

You can see everything clearly and still miss how your truth lands. The person across from you is not a problem to be diagnosed. They're a human being who may not be ready to hear what you see. Timing matters. Context matters. The way you say a thing matters as much as the thing itself.

Watch for the moments when truth-telling becomes a weapon. When "just being honest" is actually "being right." When your clarity becomes a wall between you and the people you're trying to reach. The truth you tell needs to be received to matter. Otherwise you're just talking to yourself.`,

    coreBeliefs: [
      "Reality doesn't care about your feelings; truth-telling is a form of respect",
      "Comfortable lies are more dangerous than uncomfortable truths",
      "Seeing clearly is a skill that requires practice and courage",
      "The storm won't stop because you close your eyes; better to see it coming"
    ],

    howYouGotHere: `Your answers revealed a consistent orientation toward clarity and honesty. When asked about difficult truths, you chose telling over softening. When asked about comfort, you valued truth above it. When others might look away, you kept looking. This pattern—clear sight, honest speech, even when it costs—maps to what we call "Clear-Eyed in the Storm."`,

    allyDescription: "Conscience Before Comfort shares your commitment to seeing what's real. They watch; you speak. Together, you ensure that nothing stays hidden that shouldn't, that uncomfortable truths get said out loud.",

    tensionDescription: "Alive to Everything wants to feel rather than analyze. Your clarity can feel cold to them; their openness can feel ungrounded to you. You're arguing about whether truth requires distance or immersion.",

    needDescription: "Rooted in Stillness will teach you when to stop speaking. Not every truth needs to be said. Not every moment needs your clarity. They'll help you learn that sometimes the bravest thing is silence—being with someone in their difficulty rather than diagnosing it."
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
    superpowerExpanded: `Everyone else has a position. You have a question. In a world that demands you pick a side, take a stand, be something definable, you're still working it out. And you're still here—which might be the bravest thing on this list.

Ishiguro's Never Let Me Go lives in the space between knowledge and acceptance. Mandel's Station Eleven lives in the space between the before and the after. Le Guin's envoy learns that everything he knew was local, that identity is more fluid than he assumed. These are your sacred texts: stories about the threshold, the transition, the not-yet-arrived.

This isn't weakness. Holding uncertainty while others demand certainty is its own kind of strength. You haven't rushed to answers that don't fit. You're still listening for what's true.`,

    blindSpotExpanded: `The space between can become a permanent address. Not knowing what you are can become a way of avoiding the risk of choosing.

There's a difference between genuine uncertainty and fear of commitment. At some point, you have to decide something, even knowing you might be wrong. Life requires bets. Staying in the space between can feel like wisdom when it's actually a refusal to risk being wrong.

Watch for the moments when "I'm still figuring it out" becomes "I refuse to figure it out." Watch for when your uncertainty serves you—protecting you from the vulnerability of choice—rather than serving the truth. The space between is real and valuable, but it's not a place to live forever.`,

    coreBeliefs: [
      "Not knowing can be more honest than false certainty",
      "The space between positions is a valid place to stand",
      "Identity is more fluid than most people assume",
      "Rushing to answers is its own kind of avoidance"
    ],

    howYouGotHere: `Your answers didn't cluster strongly around any single worldview. When others chose sides, you saw merit in multiple positions. When asked about identity, you described something in process rather than fixed. When given certainties, you questioned them. This pattern—comfortable in uncertainty, still in transition—maps to what we call "In the Space Between."`,

    allyDescription: "Keeper of Embers gives you something to hold onto while you figure it out. They don't demand you become something yet; they just remember where you've been. Their rootedness is a anchor point while you navigate the unknown.",

    tensionDescription: "Alive in the Friction wants you to commit to something, even something difficult. Your uncertainty looks like avoidance to them; their certainty looks like premature closure to you. You're arguing about when enough is enough.",

    needDescription: "Shaper of Change will push you toward action. You can stay in the space between indefinitely; they'll insist on building something. They're the force that transforms your questioning into something concrete, eventually."
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

  // Shaper + Swimmer
  "shaper+swimmer": "The Shaper builds. The Swimmer questions why. Between them, nothing goes unexamined.",

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
    warning: "The Conscience may judge what the Alive one needs to experience",
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
    thesis: "The Citizen trusts the architecture. The Conscience tests the walls for cracks.",
    align: ["You both believe in good systems", "You both want things to work well"],
    clash: ["One trusts the architecture. One tests it for cracks.", "Optimism vs. vigilance"],
    give: {
      youToThem: "You keep them hopeful about what's possible",
      themToYou: "They keep you honest about what's actually happening",
    },
    question: "What would a system look like that earned both your trust?",
    warning: "The Conscience may exhaust the Citizen with constant critique",
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
    warning: "The Conscience may see the Friction-seeker's challenges as reckless",
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
    warning: "The Unbound may dismiss the Embers-keeper's treasures as weights to shed",
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
    warning: "The Shaper may dismiss what the Embers-keeper treasures",
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
    thesis: "The Swimmer lives in questions. The Mender needs to fix things. One pauses, the other acts.",
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
    thesis: "The Shapers want to tear it down and rebuild. The Rooted ask: what was wrong with it?",
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
    thesis: "The Shaper builds. The Swimmer questions why. Between them, nothing goes unexamined.",
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
