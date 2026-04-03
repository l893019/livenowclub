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

    distanceAnalysis: `When Alive to Everything meets Alive to Everything, the distance between you is zero. You share the same philosophical coordinates, the same hunger for experience, the same conviction that the universe gave you everything and the least you can do is feel it. This is immediate recognition—the relief of meeting someone who doesn't need you to justify your intensity, your appetite, your refusal to moderate.

But distance zero carries its own weight. When two people occupy the same position, they see the same things—and miss the same things. Your shared orientation toward sensation can become an echo chamber of experience-seeking, each validating the other's hunger without questioning whether that hunger is serving you. The blind spots you share become invisible, confirmed by mutual agreement.`,

    dynamic: `At its core, this pairing brings together two people who believe experience is the point. Both of you have unusual capacity for feeling—not just seeking sensation, but receiving it fully. Where others filter, protect, moderate, you both open. This creates a kind of amplification: together, you can access intensities that might overwhelm or frighten others.

The dynamic between two Alive to Everything types is one of mutual permission. You don't have to explain why you need more, why you're not satisfied with the safe middle, why something in you requires the full range. The other person gets it. They're built the same way.

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

    risk: `The failure mode for two Alive to Everything types is mutual enabling toward consumption. Without someone to ask "why do you need this particular experience?" or "what are you avoiding by always seeking the next sensation?", you can reinforce each other's tendency to use intensity as escape. The relationship becomes a spinning wheel of experiences—vivid, memorable, but ultimately unintegrated.

The deeper risk is that sensation becomes a substitute for presence. If you're both always reaching for the next experience, neither of you may learn to stay with what's actually here—including the difficult, unglamorous experiences that don't offer obvious intensity but might offer depth. Two people who are alive to everything can end up alive to nothing in particular.`,

    question: {
      text: "What have you felt together that neither of you could feel alone—and what have you avoided feeling by always moving toward the next experience?",
      framing: `This question matters because it asks you to distinguish between the genuine gifts of your shared intensity and the ways that intensity might be serving as avoidance. The first part honors what's real about your connection; the second invites you to look at what might be getting lost.`
    }
  },

  "architect+architect": {
    thesis: "Two systems thinkers designing the same commons—profound structural alignment, but who lives in the blueprints?",

    distanceAnalysis: `When Architect of the Commons meets Architect of the Commons, you share the same philosophical coordinates: the conviction that the best structures belong to everyone who uses them, that design is never neutral, that collective ownership matters more than elegant control. This is immediate recognition—the relief of meeting someone who sees the invisible architecture, who asks "who does this serve?" when others are still asking "what does this do?"

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

    distanceAnalysis: `When In the Space Between meets In the Space Between, the distance between you is zero. You share the same philosophical coordinates: the threshold, the transition, the not-yet-arrived. Both of you have resisted the pressure to pick a side, take a stand, be something definable—and you're still here, which takes a particular kind of courage.

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

    distanceAnalysis: `When Citizen of Abundance meets Citizen of Abundance, the distance between you is zero. You share the same philosophical coordinates: the conviction that scarcity is more often manufactured than natural, that systems designed for abundance tend toward good, that too much freedom will always be preferable to too little. This is immediate recognition—the relief of meeting someone who doesn't default to fear, who sees possibility where others see constraint.

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

    distanceAnalysis: `When Clear-Eyed in the Storm meets Clear-Eyed in the Storm, the distance between you is zero. You share the same philosophical coordinates: the conviction that reality doesn't care about feelings, that comfortable lies are more dangerous than uncomfortable truths, that seeing clearly is both skill and courage. This is immediate recognition—the relief of meeting someone who doesn't flinch, who says the thing, who values truth above comfort.

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

    distanceAnalysis: `When Conscience Before Comfort meets Conscience Before Comfort, the distance between you is zero. You share the same philosophical coordinates: the conviction that someone has to watch the watchers, that dystopia arrives disguised as convenience, that comfort should never override conscience. This is immediate recognition—the relief of meeting someone who also sees the cracks, the hidden costs, the surveillance beneath the service.

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

    distanceAnalysis: `When Keeper of Embers meets Keeper of Embers, the distance between you is zero. You share the same philosophical coordinates: the conviction that memory is survival, that acceleration without remembering is just sophisticated forgetting, that the answers aren't in the next technology but in the last ten thousand years. This is immediate recognition—the relief of meeting someone who also guards what came before, who tends the embers so the fire can be relit.

But occupying the same position means sharing the same relationship to the past—and potentially sharing the same hostility toward the future. Your mutual reverence for memory can become an echo chamber of preservation, each validating the other's treasures without questioning whether some of them have become weights. The blind spots you share become invisible, confirmed by mutual agreement.`,

    dynamic: `At its core, this pairing brings together two people who understand that the most dangerous thing about acceleration is amnesia. Both of you carry the conviction that memory is not nostalgia but survival. Both of you know that every generation thinks it invented its problems, and wisdom knows better.

The dynamic between two Embers-keepers is one of shared preservation. You can discuss what deserves to be remembered, what was lost that shouldn't have been, what from history speaks to the present moment. The other person values the same things you've been carrying.

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
        explanation: `You both know your shadow: the version of your preservation that becomes hostility to the new. When two Embers-keepers pair up, you can validate each other's reverence without checking whether it's become rigidity. Your shared archive might be a foundation for building—or might be a fortress that keeps the future out. Some memories become chains.`
      }
    ],

    give: {
      youToThem: `You offer honoring of their memories. Your presence means their treasures are recognized, their preservation valued. You don't dismiss what they've been carrying or ask why it matters. In your company, their archiving isn't hoarding; it's care. They can share what they've been guarding with someone who understands its worth.`,
      themToYou: `They offer the same honoring back. They recognize your treasures, respect your preservation, understand why you've been carrying what you've been carrying. In their company, you're not stuck in the past; you're keeping it alive. That mutual recognition creates a shared archive richer than either could build alone.`
    },

    risk: `The failure mode for two Embers-keepers is mutual fortress-building against change. Without someone to challenge your reverence for the past, you can reinforce each other's tendency to treat all innovation as threat, all change as loss. Your relationship becomes a museum that's very good at preserving and very bad at growing.

The deeper risk is that your shared archive becomes a substitute for living. Two keepers of the past can become so focused on what was that they miss what is and what could be. The embers you tend are supposed to light new fires—not just glow in the dark while life moves on without you.`,

    question: {
      text: "What from the future deserves your attention—and what are you preserving that might be ready to be released?",
      framing: `This question matters because it asks you to look forward as well as back. Your shared reverence for the past is valuable, but it can't be the only direction you face. The question invites you to consider what new things might be worth tending.`
    }
  },

  "friction+friction": {
    thesis: "Two who crave difficulty meeting in the arena—profound understanding of struggle, but can friction consume what it was meant to forge?",

    distanceAnalysis: `When Alive in the Friction meets Alive in the Friction, the distance between you is zero. You share the same philosophical coordinates: the conviction that ease is more dangerous than difficulty, that something in us requires resistance, that comfort can be a trap. This is immediate recognition—the relief of meeting someone who doesn't want you to slow down, take it easy, be reasonable.

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

    distanceAnalysis: `When Mender of What Remains meets Mender of What Remains, the distance between you is zero. You share the same philosophical coordinates: the conviction that the most advanced engineering is making what exists work again, that what we have is worth saving before we build something new, that repair is not a lesser form of creation.

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

    distanceAnalysis: `When Keeper of Presence meets Keeper of Presence, the distance between you is zero. You share the same philosophical coordinates: the conviction that undivided attention is the most valuable thing you can give, that efficiency is often the enemy of depth, that most problems are really loneliness in disguise. This is immediate recognition—the relief of meeting someone who also shows up fully, who knows the difference between capability and care.

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

    distanceAnalysis: `When Rooted in Stillness meets Rooted in Stillness, the distance between you is zero. You share the same philosophical coordinates: the conviction that the most radical thing you can do is stop and mean it, that human beings are not problems to be optimized, that sometimes the answer to "what should I do?" is genuinely "nothing." This is immediate recognition—the relief of meeting someone who doesn't need you to justify your stillness or defend your choice to stay.

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

    distanceAnalysis: `When Shaper of Change meets Shaper of Change, the distance between you is zero. You share the same philosophical coordinates: the conviction that the moment you stop adapting you start calcifying, that the future is something you build with whatever is at hand, that every crisis is a construction site if you know how to look. This is immediate recognition—the relief of meeting someone who also sees rubble as raw material, endings as beginnings, collapse as opportunity.

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

    distanceAnalysis: `When Swimmer in Deep Water meets Swimmer in Deep Water, the distance between you is zero. You share the same philosophical coordinates: the conviction that the best questions are the ones that can't be fully answered, that certainty is usually a sign something is being ignored, that understanding matters more than solving. This is immediate recognition—the relief of meeting someone who also sits with uncertainty, who won't rush you toward answers, who knows that not-knowing can be a form of rigor.

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

    distanceAnalysis: `When Unbound from Form meets Unbound from Form, the distance between you is zero. You share the same philosophical coordinates: the conviction that the boundaries of self, body, and species are not fixed, that what we call "human" is a starting point rather than a destination, that transcendence is a serious possibility. This is immediate recognition—the relief of meeting someone who also reaches past the edges, who takes seriously what others dismiss as fantasy or threat.

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
  const superpowerA = archA?.superpower || "their perspective";
  const superpowerB = archB?.superpower || "their perspective";
  const blindSpotA = archA?.blindSpot || "";
  const blindSpotB = archB?.blindSpot || "";
  const nameA = archA?.name || a;
  const nameB = archB?.name || b;

  const para1 = `At its core, this relationship brings together two different ways of engaging with the world. ${nameA}'s gift is ${superpowerA}—a capacity that shapes how they approach problems, relationships, and the future. ${nameB}'s gift is ${superpowerB}—an equally valid but distinctly different orientation toward what matters.`;

  const para2 = `These two approaches can complement each other beautifully or collide painfully, depending on how they're held. When both people are secure in their own perspective while remaining curious about the other's, this pairing generates insight neither could reach alone. When either person becomes defensive or dismissive, the same dynamic becomes a source of frustration.`;

  const para3 = blindSpotA && blindSpotB
    ? `The interplay between these worldviews is complicated by what each tends to miss. ${nameA} ${blindSpotA.charAt(0).toLowerCase() + blindSpotA.slice(1)} Meanwhile, ${nameB} ${blindSpotB.charAt(0).toLowerCase() + blindSpotB.slice(1)} In the best version of this relationship, each helps the other see around their blind spots.`
    : `Understanding these different orientations isn't about determining which is right—it's about recognizing that both perspectives are partial, and together they reveal more than either alone.`;

  return `${para1}\n\n${para2}\n\n${para3}`;
}

// Helper: Generate alignment explanation
function generateAlignExplanation(
  point: string,
  archA: Archetype | undefined,
  archB: Archetype | undefined,
  index: number
): string {
  const nameA = archA?.name || "One";
  const nameB = archB?.name || "the other";

  // Generate contextual explanation based on the alignment point
  const explanations = [
    `This shared ground matters because it means you're not starting from scratch. When ${nameA} and ${nameB} recognize this common value, they've found a foundation for deeper understanding. Even when you disagree about methods or priorities, this alignment reminds you that you're working toward something similar.`,
    `This overlap isn't superficial—it reflects something fundamental about how you both orient toward the world. When conflicts arise, returning to this shared ground can help you remember that your differences exist within a larger agreement about what matters.`,
    `Finding this alignment point is significant because it reveals compatible values beneath surface-level differences. This is the bedrock you can build on when other aspects of your perspectives diverge.`,
  ];

  return explanations[index % explanations.length];
}

// Helper: Generate clash explanation
function generateClashExplanation(
  point: string,
  archA: Archetype | undefined,
  archB: Archetype | undefined,
  index: number,
  warning?: string
): string {
  const nameA = archA?.name || "One";
  const nameB = archB?.name || "the other";

  const base = `This tension point often shows up in unexpected moments—not in explicit arguments, but in subtle misunderstandings. ${nameA} may interpret situations one way while ${nameB} reads them completely differently. Neither is wrong; you're working from different premises about what matters and how things work.`;

  const additional = warning
    ? ` ${warning} This is worth naming explicitly so it doesn't fester into resentment.`
    : ` The key isn't eliminating this friction but learning to navigate it consciously rather than reactively.`;

  return base + additional;
}

// Helper: Generate give/exchange explanation
function generateGiveExplanation(
  giftSummary: string,
  giver: Archetype | undefined,
  receiver: Archetype | undefined,
  direction: "you" | "them"
): string {
  const giverName = giver?.name || "This person";
  const receiverName = receiver?.name || "the other";
  const superpower = giver?.superpower || "their perspective";

  return `${giftSummary}. This gift emerges naturally from ${direction === "you" ? "your" : "their"} orientation—the capacity for ${superpower} means ${direction === "you" ? "you" : "they"} can offer something ${receiverName} might struggle to access on their own. The exchange isn't transactional; it's what happens when two different perspectives genuinely engage. ${direction === "you" ? "Your" : "Their"} presence in this relationship expands what's possible for ${direction === "you" ? "them" : "you"}.`;
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
  const nameA = archA?.name || a;
  const nameB = archB?.name || b;
  const blindSpotA = archA?.blindSpot || "";
  const blindSpotB = archB?.blindSpot || "";

  if (pairDynamic.warning) {
    return `${pairDynamic.warning}\n\nThe failure mode for this pairing often involves each person retreating to their default position and interpreting the other through their blind spot. ${nameA} may ${blindSpotA.charAt(0).toLowerCase() + blindSpotA.slice(1)} ${nameB} may ${blindSpotB.charAt(0).toLowerCase() + blindSpotB.slice(1)} When both happen simultaneously, the relationship can spiral into mutual incomprehension.`;
  }

  if (category === "close") {
    return `The risk with close pairs isn't conflict—it's stagnation. When you understand each other too easily, you may stop challenging each other. The comfort of agreement can become a cocoon that prevents growth. Watch for the moment when your similarity stops being a foundation and starts being a limitation.`;
  } else if (category === "far") {
    return `The risk with distant pairs is mutual dismissal. When perspectives differ this much, it's tempting to conclude the other person is simply wrong—or worse, to stop trying to understand altogether. The friction that makes this pairing valuable can also wear both people down if it's not managed consciously.`;
  } else {
    return `The risk at middle distance is assuming you understand each other better than you do. Your moderate overlap can mask deeper differences that only emerge under pressure. Stay curious about where your assumptions diverge, even when things seem to be going smoothly.`;
  }
}

// Helper: Generate question framing
function generateQuestionFraming(
  question: string,
  archA: Archetype | undefined,
  archB: Archetype | undefined,
  category: DistanceCategory
): string {
  if (category === "close") {
    return "This question matters because it asks you to look beyond your comfortable agreement toward something neither of you might naturally examine.";
  } else if (category === "far") {
    return "This question matters because it invites you to find common ground without erasing the differences that make this relationship generative.";
  } else {
    return "This question matters because it asks you to deepen a relationship that might otherwise remain at a comfortable but superficial level.";
  }
}

// Get analytical pair dynamic - checks handcrafted first, then generates
export function getAnalyticalPairDynamic(a: string, b: string): AnalyticalPairDynamic {
  const key = [a, b].sort().join("+");

  // First check for handcrafted content
  if (analyticalPairDynamics[key]) {
    return analyticalPairDynamics[key];
  }

  // Fall back to generating from existing data
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
