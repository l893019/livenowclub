/**
 * Seeking + Expansive Quadrant Identities (21 total)
 *
 * Quadrant characteristics:
 * - Questioning + growth orientation
 * - Curious, experimental, open to change
 * - Adjectives: Adaptive (most extreme), Curious (middle), Open (mildest)
 *
 * 7 nouns x 3 adjectives = 21 identities
 */

import type { Identity } from './identities'

export const seekingExpansiveIdentities: Record<string, Identity> = {
  // =============================================================================
  // ARCHITECT identities (highest agency)
  // =============================================================================

  'adaptive-architect': {
    key: 'adaptive-architect',
    name: 'Adaptive Architect',
    color: '#7c3aed',
    noun: 'architect',
    adjective: 'adaptive',
    quadrant: 'seeking-expansive',

    utopia:
      'Their utopia redesigns itself in real-time. The architecture is always learning.',

    description:
      "You design systems that can evolve. Unlike architects who build for permanence, you build for change—creating structures that can reshape themselves as conditions shift. Your adaptability isn't uncertainty; it's the sophisticated understanding that good architecture anticipates its own transformation.",

    pull: 'toward living systems',
    edge: 'you design structures that can evolve',
    oneSentence:
      'You architect for change itself, building systems that learn and adapt rather than merely endure.',

    superpower: 'evolutionary design',
    superpowerExpanded: `You see architecture as a living process, not a final product.

Where other architects design for permanence, you design for adaptation. Your systems include their own mechanisms for change—feedback loops, modularity, graceful degradation. You know that the world will shift, and you build accordingly.

This makes you invaluable in uncertain environments. When requirements evolve, when contexts shift, when yesterday's solutions become today's problems—your adaptive architecture flexes rather than breaks. You don't just tolerate change; you design for it.`,

    blindSpot:
      'Your comfort with change can prevent you from committing. Sometimes a system needs to be finished, not eternally adaptable.',

    blindSpotExpanded: `There's a point where adaptability becomes avoidance.

Your architecture can always be improved, always evolve, always respond to new information. But at some point, something needs to ship. Your comfort with ongoing change can prevent you from declaring anything done, from making the hard commitment to a specific form.

There's also the complexity cost. Systems designed for maximum adaptability are often more complicated than systems designed for specific purposes. Sometimes the simple, rigid solution serves better than the clever, flexible one.`,

    coreBeliefs: [
      'The only constant is change—design for it',
      'Rigid systems are fragile systems',
      'Every architecture encodes assumptions—make them explicit and revisable',
      'The best designs include their own capacity for evolution',
    ],

    howYouGotHere:
      "Your answers revealed someone who designs at the systems level while remaining fundamentally open to new information. You don't just tolerate uncertainty—you build it into your architecture. This combination of high agency and adaptive questioning maps to the Adaptive Architect.",

    alignsWith:
      'other Seekers—you share the orientation toward questioning and discovery, the sense that answers are provisional and worth revisiting',
    tensionWith:
      "Settled types—their certainty can feel premature, like they've stopped asking questions that still matter",
    growsWith:
      'Protective types—they force you to consider what could go wrong with your adaptive systems, building in necessary constraints',

    books: [
      {
        title: 'Permutation City',
        author: 'Egan',
        reason:
          'Consciousness uploads into self-modifying virtual realities. Architecture that evolves its own substrate.',
      },
      {
        title: 'A Fire Upon the Deep',
        author: 'Vinge',
        reason:
          'A galaxy organized into zones of thought, each with different rules. Adaptive architecture at cosmic scale.',
      },
      {
        title: 'The Player of Games',
        author: 'Banks',
        reason:
          'The Culture\'s post-scarcity society constantly reshapes itself. Systems that embrace their own evolution.',
      },
    ],

    famousFigures: {
      real: ['Stewart Brand', 'Donella Meadows', 'Cedric Price'],
      fictional: [
        'The Doctor (Doctor Who)',
        'Data (Star Trek)',
        'Ender Wiggin (Ender\'s Game)',
      ],
    },
  },

  'curious-architect': {
    key: 'curious-architect',
    name: 'Curious Architect',
    color: '#8b5cf6',
    noun: 'architect',
    adjective: 'curious',
    quadrant: 'seeking-expansive',

    utopia:
      'Their utopia is an experiment that keeps surprising its designers.',

    description:
      "You don't build to arrive somewhere—you build to discover what's possible. Every system is a hypothesis, every structure a question asked in steel and code. Your architecture is an inquiry.",

    pull: 'toward undiscovered structure',
    edge: "you see systems others haven't imagined",
    oneSentence:
      'You architect as exploration, letting each system teach you something about what systems can be.',

    superpower: 'building as exploration',
    superpowerExpanded: `For you, architecture is a form of research.

You don't design because you know what should exist—you design to discover what could exist. Each project is an experiment, each structure a hypothesis about how things might work. This curiosity-driven approach produces architectures that surprise even you.

This makes you especially valuable at the frontier. When nobody knows what the right approach is, your willingness to build exploratory structures—to learn by making—generates possibilities that planning alone cannot. You think with your designs.`,

    blindSpot:
      "You start more than you finish. The next possibility is always more interesting than the current reality.",

    blindSpotExpanded: `Curiosity pulls you forward, but completion requires staying.

Every project reaches a point where the exploration is mostly done and only execution remains. That's when you're most tempted to move on—when the interesting questions are answered and only the grind remains. But unfinished architectures don't serve anyone.

There's also the question of depth versus breadth. Your curiosity drives you to explore many possibilities, but mastery often requires staying with one approach long enough to truly understand it. The architectures you abandon may have had more to teach you.`,

    coreBeliefs: [
      'Every system encodes assumptions—find the assumptions and you find the leverage',
      'Premature optimization is the root of all evil, but premature exploration is the root of all discovery',
      'The map is never the territory, so keep redrawing maps',
      'Constraints are design materials, not obstacles',
    ],

    howYouGotHere:
      "Your answers showed someone who designs systems while remaining genuinely curious about what's possible. You haven't stopped asking questions at the architectural level—you build to discover. This maps to the Curious Architect.",

    alignsWith:
      'other Curious types—you share the drive to explore, to ask questions even when answers seem settled',
    tensionWith:
      "Confident types—their certainty can feel like they've stopped being curious about alternatives",
    growsWith:
      'Settled types—they push you to commit to architectures rather than endlessly exploring, showing you the value of conviction',

    books: [
      {
        title: 'Schismatrix Plus',
        author: 'Sterling',
        reason:
          'Humanity splinters into thousands of experimental forms. Architecture as inquiry into what we could become.',
      },
      {
        title: 'Diaspora',
        author: 'Egan',
        reason:
          'Post-human intelligences explore the universe\'s deepest structures. Curiosity as civilization\'s driving force.',
      },
      {
        title: 'House of Suns',
        author: 'Reynolds',
        reason:
          'Immortal clones circumnavigate the galaxy, cataloging wonders. Exploration as a way of life.',
      },
    ],

    famousFigures: {
      real: ['Buckminster Fuller', 'Ada Lovelace', 'Neri Oxman'],
      fictional: [
        'Hermione Granger (Harry Potter)',
        'Bruce Banner (Marvel)',
        'The Curious Incident\'s Christopher',
      ],
    },
  },

  'open-architect': {
    key: 'open-architect',
    name: 'Open Architect',
    color: '#a78bfa',
    noun: 'architect',
    adjective: 'open',
    quadrant: 'seeking-expansive',

    utopia:
      'Their utopia invites participation. The architecture welcomes new contributors.',

    description:
      "You design systems that remain open—to modification, to input, to perspectives you haven't imagined yet. Your openness isn't indecision; it's the understanding that the best architectures create space for what's yet to come.",

    pull: 'toward inclusive design',
    edge: 'you create architectures that others can extend',
    oneSentence:
      'You architect open systems, designing structures that welcome contributions from sources you cannot yet imagine.',

    superpower: 'participatory design',
    superpowerExpanded: `You create architectures that invite collaboration.

Your systems aren't closed boxes—they're platforms for participation. You design with extension points, with clear interfaces, with deliberate space for future contributors. This openness multiplies what your architecture can accomplish beyond what you alone could build.

This makes you effective at building community around your designs. People feel welcome to contribute because your architecture clearly makes space for them. Your openness becomes generative, attracting collaborators who extend your vision in directions you couldn't have anticipated.`,

    blindSpot:
      'Your openness can become lack of direction. Not every input improves the system; some contributions need to be declined.',

    blindSpotExpanded: `Open systems still need coherence.

Your welcoming stance can make it hard to say no. Every suggestion seems worth considering, every contribution worth including. But architecture requires choice—not everything can fit, and trying to include everything produces bloated systems that serve no one well.

There's also the question of vision. Open systems still need someone making decisions about direction. Your openness can defer that responsibility, hoping that the right path will emerge from participation. Sometimes it does. Sometimes someone needs to choose.`,

    coreBeliefs: [
      'Good architecture makes space for what cannot yet be imagined',
      'Openness is a design choice, not an absence of design',
      'The best systems grow beyond their original architects',
      'Every closed door is a future that cannot happen',
    ],

    howYouGotHere:
      'Your answers showed someone who designs systems while remaining genuinely open to new input and direction. You architect with welcome rather than walls. This combination of high agency and receptive openness maps to the Open Architect.',

    alignsWith:
      'other Open types—you share the welcoming stance, the sense that good things come from remaining receptive',
    tensionWith:
      "Confident types—their certainty about direction can feel like premature closure, shutting doors that should stay open",
    growsWith:
      'Decisive types—they help you find the backbone within your openness, the core that remains stable while the edges flex',

    books: [
      {
        title: 'The Dispossessed',
        author: 'Le Guin',
        reason:
          'An anarchist society built on open cooperation. Architecture as radical participation.',
      },
      {
        title: 'A Door Into Ocean',
        author: 'Slonczewski',
        reason:
          'An ocean world governed by consensus and sharing. Open systems as the foundation of life.',
      },
      {
        title: 'Walkaway',
        author: 'Doctorow',
        reason:
          'Open-source everything: fabricators, buildings, communities. Architecture that anyone can fork.',
      },
    ],

    famousFigures: {
      real: ['Tim Berners-Lee', 'Ward Cunningham', 'Mitch Kapor'],
      fictional: [
        'Charles Xavier (X-Men)',
        'Padmé Amidala (Star Wars)',
        'Dumbledore (Harry Potter)',
      ],
    },
  },

  // =============================================================================
  // BUILDER identities (high agency)
  // =============================================================================

  'adaptive-builder': {
    key: 'adaptive-builder',
    name: 'Adaptive Builder',
    color: '#7034d6',
    noun: 'builder',
    adjective: 'adaptive',
    quadrant: 'seeking-expansive',

    utopia:
      'Their utopia was built by iterating. The first version was just the beginning.',

    description:
      "You build in iterations, treating each version as a learning opportunity. Your adaptability isn't lack of vision—it's the understanding that building teaches you what to build next. You ship to learn.",

    pull: 'toward iterative creation',
    edge: 'you learn faster because you build faster',
    oneSentence:
      'You build to learn, treating every iteration as information about what the next iteration should be.',

    superpower: 'rapid iteration',
    superpowerExpanded: `You build, learn, and rebuild at a pace others find disorienting.

Where cautious builders plan extensively before starting, you start and let the building teach you. Each version reveals what the next version needs. This tight feedback loop between building and learning produces results that pure planning cannot achieve.

This makes you invaluable in uncertain environments. When requirements are unclear or shifting, your willingness to build provisional versions—to learn by making—generates clarity that analysis alone cannot. You think with your hands.`,

    blindSpot:
      'Your rapid iteration can become thrashing. Sometimes you need to stay with a version long enough to actually learn from it.',

    blindSpotExpanded: `Speed has costs.

Your adaptability means you're always ready to change direction, but changing direction takes energy. Constant pivoting can exhaust teams and resources. At some point, commitment—staying with an approach long enough to see it through—produces more than continuous adaptation.

There's also depth versus breadth. Your rapid iteration produces many versions but may not produce deep understanding of any. Sometimes the slower path that really explores one approach teaches more than the fast path that touches many.`,

    coreBeliefs: [
      'Building is thinking—you learn by making',
      'Plans are guesses; builds are tests',
      'The faster you iterate, the faster you learn',
      'Done is a waypoint, not a destination',
    ],

    howYouGotHere:
      'Your answers showed a hands-on builder orientation combined with high adaptability. You make things, and you adjust rapidly based on what the making teaches you. This maps to the Adaptive Builder.',

    alignsWith:
      'other Seekers—you share the fundamental openness to new information, the willingness to change based on what you learn',
    tensionWith:
      "Settled types—their commitment to plans can feel like rigidity, like they're building what they decided to build rather than what needs to be built",
    growsWith:
      'Protective types—they help you recognize when to stop iterating and defend what you\'ve built',

    books: [
      {
        title: 'The Martian',
        author: 'Weir',
        reason:
          'Survival through relentless iteration. Each problem solved reveals the next one to solve.',
      },
      {
        title: 'Project Hail Mary',
        author: 'Weir',
        reason:
          'Improvisation saves humanity. Building solutions with whatever you have, adapting as you learn.',
      },
      {
        title: 'All Systems Red',
        author: 'Wells',
        reason:
          'A security bot constantly adapts to chaos. Iteration as survival strategy.',
      },
    ],

    famousFigures: {
      real: ['Reid Hoffman', 'Brian Chesky', 'Sara Blakely'],
      fictional: [
        'MacGyver',
        'Tony Stark (Iron Man)',
        'Rocket Raccoon (Guardians)',
      ],
    },
  },

  'curious-builder': {
    key: 'curious-builder',
    name: 'Curious Builder',
    color: '#8050e5',
    noun: 'builder',
    adjective: 'curious',
    quadrant: 'seeking-expansive',

    utopia:
      'Their utopia is full of prototypes. Every object is a question about what objects could be.',

    description:
      "You build to explore. Each project is a question you're asking with your hands—what if this existed? What if it worked this way? Your curiosity drives you to make things that nobody asked for but everyone needed.",

    pull: 'toward unexplored making',
    edge: 'you build things that ask interesting questions',
    oneSentence:
      'You build because building is how you explore—each project a question asked in material form.',

    superpower: 'exploratory making',
    superpowerExpanded: `You don't build to requirements—you build to discover what the requirements should be.

Your curiosity about what's possible drives you to make things that don't fit existing categories. You prototype ideas that might be useless but might be revolutionary. This willingness to build speculatively produces innovations that planning cannot anticipate.

This makes you valuable as a scout. When teams need to understand what's possible, your curious building explores the frontier. Your prototypes become tangible questions that advance everyone's understanding of what could be built.`,

    blindSpot:
      'Your exploratory building can lack follow-through. Interesting prototypes need to become useful products, and that requires a different kind of work.',

    blindSpotExpanded: `Exploration is not enough.

Your curiosity pulls you toward the next interesting question before the current one is fully answered. The prototype that could become a product gets abandoned for the next prototype. Your workshop fills with interesting beginnings that never became interesting ends.

There's also the question of utility. Building that answers interesting questions is valuable, but at some point, building needs to serve someone beyond the builder. Your curious making can become self-indulgent—interesting to you but useful to no one.`,

    coreBeliefs: [
      'The best way to predict the future is to build it',
      'Every prototype teaches something that planning cannot',
      'Curiosity is a productive force, not just a feeling',
      "You don't know what you can build until you try building it",
    ],

    howYouGotHere:
      'Your answers showed a hands-on builder orientation combined with deep curiosity. You make things to find out what can be made. This maps to the Curious Builder.',

    alignsWith:
      'other Curious types—you share the drive to explore, to ask questions through whatever medium you work in',
    tensionWith:
      "Steady types—their consistency can feel like they've stopped asking what else they could build",
    growsWith:
      'Confident types—they help you commit to builds long enough to see them through, turning curious starts into finished works',

    books: [
      {
        title: 'The Diamond Age',
        author: 'Stephenson',
        reason:
          'Nanotechnology enables infinite tinkering. Building as exploration of possibility.',
      },
      {
        title: 'Anathem',
        author: 'Stephenson',
        reason:
          'Mathematician-monks who build theories and technologies. Curiosity as monastic practice.',
      },
      {
        title: 'Ready Player One',
        author: 'Cline',
        reason:
          'A virtual world built from endless curiosity about what came before. Building as treasure hunt.',
      },
    ],

    famousFigures: {
      real: ['James Dyson', 'Dean Kamen', 'Simone Giertz'],
      fictional: [
        'Doc Brown (Back to the Future)',
        'Kaylee Frye (Firefly)',
        'Q (James Bond)',
      ],
    },
  },

  'open-builder': {
    key: 'open-builder',
    name: 'Open Builder',
    color: '#9a7af3',
    noun: 'builder',
    adjective: 'open',
    quadrant: 'seeking-expansive',

    utopia:
      'Their utopia was built together. The makers share tools and teach each other.',

    description:
      "You build with welcome—open to collaborators, open to suggestions, open to better ideas from any source. Your openness isn't weakness; it's the understanding that the best building happens when many hands and minds contribute.",

    pull: 'toward collective making',
    edge: 'you build in ways that others can join',
    oneSentence:
      'You build with open hands, welcoming contributions and knowing that the best work comes from many sources.',

    superpower: 'collaborative construction',
    superpowerExpanded: `You turn building into a collective activity.

Your natural openness invites others into your process. You share plans, accept suggestions, celebrate contributions. This collaborative approach produces builds that exceed what any individual could accomplish—including you.

This makes you a catalyst for teams. Your openness creates psychological safety for others to contribute their best ideas. People want to build with you because you make them feel their contributions matter. Your open building becomes generative.`,

    blindSpot:
      'Your collaborative stance can diffuse responsibility. When everyone is building together, it can be unclear who ensures quality or makes final decisions.',

    blindSpotExpanded: `Collaboration has coordination costs.

Your openness to contributions means managing many inputs, and not all inputs improve the build. Someone needs to maintain coherence, to say "this doesn't fit." Your welcoming nature can make that role uncomfortable, leading to builds that try to include everything and serve no one well.

There's also the question of vision. Open building can become building by committee, where the path of least resistance replaces the path of most excellence. Your openness needs a backbone—some core principles that hold even as everything else flexes.`,

    coreBeliefs: [
      'Many hands make light work—and better work',
      'Openness creates community around what you build',
      'The best ideas can come from anywhere',
      'Building together teaches things building alone cannot',
    ],

    howYouGotHere:
      'Your answers showed a hands-on builder orientation combined with genuine openness to others. You make things, and you make them with and for others. This maps to the Open Builder.',

    alignsWith:
      'other Open types—you share the welcoming stance that makes space for contribution',
    tensionWith:
      'Confident types—their certainty about how to build can feel like it leaves no room for other approaches',
    growsWith:
      'Decisive types—they help you maintain direction within your openness, ensuring collective building produces coherent results',

    books: [
      {
        title: 'Makers',
        author: 'Doctorow',
        reason:
          'Open-source fabrication creates new communities. Building together as revolution.',
      },
      {
        title: 'Rainbows End',
        author: 'Vinge',
        reason:
          'Collaborative augmented reality built by everyone. The world as shared construction project.',
      },
      {
        title: 'The Long Way to a Small, Angry Planet',
        author: 'Chambers',
        reason:
          'A misfit crew that builds wormholes together. Construction as found family.',
      },
    ],

    famousFigures: {
      real: ['Linus Torvalds', 'Jimmy Wales', 'Limor Fried'],
      fictional: [
        'Bob the Builder',
        'Fix-It Felix Jr. (Wreck-It Ralph)',
        'Sokka (Avatar: The Last Airbender)',
      ],
    },
  },

  // =============================================================================
  // MAKER identities (mid-high agency)
  // =============================================================================

  'adaptive-maker': {
    key: 'adaptive-maker',
    name: 'Adaptive Maker',
    color: '#642ebf',
    noun: 'maker',
    adjective: 'adaptive',
    quadrant: 'seeking-expansive',

    utopia:
      'Their utopia repurposes everything. Nothing is waste; everything is material.',

    description:
      "You make with whatever's at hand, adapting your craft to available materials and changing conditions. Your adaptability isn't lack of standards—it's the creative understanding that making works with constraints rather than against them.",

    pull: 'toward resourceful creation',
    edge: 'you make from whatever exists',
    oneSentence:
      'You make by adapting—treating every constraint as a creative opportunity and every material as potential.',

    superpower: 'material flexibility',
    superpowerExpanded: `You can make with almost anything.

Where other makers wait for perfect materials, you work with what's available. Your adaptability extends to process, tools, conditions—you reshape your making to fit circumstances rather than demanding circumstances fit your making.

This makes you invaluable in resource-constrained environments. When the ideal materials aren't available, you find alternatives. When the usual tools break, you improvise. Your adaptive making produces results that more rigid makers cannot achieve because they cannot adapt.`,

    blindSpot:
      'Your adaptability can lower your standards. Sometimes "making do" produces work that\'s not worth making.',

    blindSpotExpanded: `Constraints can become excuses.

Your comfort working with less-than-ideal materials can normalize accepting less-than-ideal results. "Given the constraints, this is good enough" can justify work that doesn't deserve justification. Your adaptability should serve quality, not replace it.

There's also the question of when to insist on better conditions rather than adapting to poor ones. Your flexibility can enable dysfunction—if you'll always make do, there's no pressure to provide what you actually need. Sometimes the adaptive maker should be less adaptive.`,

    coreBeliefs: [
      'Constraints are creative catalysts, not obstacles',
      'Everything is material if you know how to use it',
      'Adaptability is a skill that can be practiced',
      'The adaptive maker serves the making, not their preferences',
    ],

    howYouGotHere:
      "Your answers showed a hands-on maker orientation combined with high adaptability. You create things, and you're remarkably flexible about how. This maps to the Adaptive Maker.",

    alignsWith:
      'other Seekers—you share the openness to changing conditions, the willingness to adjust based on circumstances',
    tensionWith:
      "Settled types—their insistence on specific methods can feel like they've stopped seeing alternatives",
    growsWith:
      'Confident types—they help you recognize when your adaptability should give way to insistence on what you actually need',

    books: [
      {
        title: 'A Door Into Ocean',
        author: 'Slonczewski',
        reason:
          'Ocean-dwellers who craft everything from living organisms. Making with what the world provides.',
      },
      {
        title: 'Semiosis',
        author: 'Burke',
        reason:
          'Colonists adapt to an alien planet by learning to work with its ecology, not against it.',
      },
      {
        title: 'The Word for World Is Forest',
        author: 'Le Guin',
        reason:
          'Indigenous adaptation versus extractive making. Craft in harmony with environment.',
      },
    ],

    famousFigures: {
      real: ['Martha Stewart', 'Tim Gunn', 'Patagonia founders'],
      fictional: [
        'Professor McGonagall (Harry Potter)',
        'The Mandalorian',
        'Moana',
      ],
    },
  },

  'curious-maker': {
    key: 'curious-maker',
    name: 'Curious Maker',
    color: '#7444ce',
    noun: 'maker',
    adjective: 'curious',
    quadrant: 'seeking-expansive',

    utopia:
      'Their utopia has makerspaces on every corner. Tools are shared; knowledge is free.',

    description:
      "You make to explore—each project a question about what's possible with your hands and materials. Your curiosity drives you to try techniques you haven't mastered and materials you don't understand yet.",

    pull: 'toward experimental craft',
    edge: 'you make things that teach you how to make',
    oneSentence:
      'You make as exploration, letting each project teach you something new about what making can be.',

    superpower: 'craft exploration',
    superpowerExpanded: `You treat making as an ongoing investigation.

Every project is a learning opportunity. You deliberately choose challenges that stretch your skills, materials you haven't worked with, techniques you haven't tried. This curiosity-driven making continuously expands what you're capable of.

This makes you a perpetual student of your craft. While others settle into comfortable competence, you keep pushing into unfamiliar territory. Your willingness to be a beginner repeatedly produces a breadth of capability that specialists often lack.`,

    blindSpot:
      "Your curiosity can prevent mastery. If you're always moving to the next technique, you may never deeply understand any.",

    blindSpotExpanded: `Breadth has costs.

Your curious exploration of many approaches can come at the expense of deep expertise in any. The maker who has tried everything may be worse at specific tasks than the maker who has done one thing thousands of times. Curiosity keeps you learning, but mastery requires staying.

There's also the question of finishing. Curious making often loses interest when the interesting learning is done but the project isn't. Your workshop may be full of 80%-complete projects—the last 20% wasn't interesting enough to hold your attention.`,

    coreBeliefs: [
      'Every material has secrets; curiosity reveals them',
      "The curious maker is always a beginner at something",
      'Making is learning made tangible',
      'The question "what if I tried..." is the start of every interesting project',
    ],

    howYouGotHere:
      'Your answers showed a hands-on maker orientation combined with deep curiosity about possibilities. You make to explore what making can be. This maps to the Curious Maker.',

    alignsWith:
      'other Curious types—you share the drive to explore, to ask questions through whatever medium you work in',
    tensionWith:
      "Steady types—their consistency in methods can feel like they've stopped being curious about alternatives",
    growsWith:
      'Confident types—they help you commit to projects long enough to finish them, completing the learning cycle',

    books: [
      {
        title: 'Piranesi',
        author: 'Clarke',
        reason:
          'A man catalogs an infinite house, making sense of wonder through careful attention.',
      },
      {
        title: 'Stories of Your Life and Others',
        author: 'Chiang',
        reason:
          'Each story explores a different way of making sense of reality. Curiosity as craft.',
      },
      {
        title: 'The Diamond Age',
        author: 'Stephenson',
        reason:
          'An interactive book teaches a girl to think, create, and question. Curiosity as education.',
      },
    ],

    famousFigures: {
      real: ['Leonardo da Vinci', 'Mary Jackson', 'Adam Savage'],
      fictional: [
        'Belle (Beauty and the Beast)',
        'Hiro Hamada (Big Hero 6)',
        'Flint Lockwood (Cloudy with a Chance of Meatballs)',
      ],
    },
  },

  'open-maker': {
    key: 'open-maker',
    name: 'Open Maker',
    color: '#8d68e6',
    noun: 'maker',
    adjective: 'open',
    quadrant: 'seeking-expansive',

    utopia:
      'Their utopia shares patterns freely. Knowledge multiplies when given away.',

    description:
      "You make with openness—sharing your techniques, welcoming feedback, learning from other makers. Your openness isn't naivety; it's the understanding that craft improves through community and exchange.",

    pull: 'toward shared craft',
    edge: 'you make in ways that others can learn from',
    oneSentence:
      'You make with open hands and open process, knowing that shared craft improves all makers.',

    superpower: 'craft generosity',
    superpowerExpanded: `You share what you learn without reservation.

Your techniques, discoveries, and even mistakes become resources for other makers. This generosity creates community around your craft—people want to learn from you because you teach freely. And in teaching, you learn: explaining your process often reveals its hidden assumptions.

This makes you a node in a network of makers. Your openness attracts connection. People bring you their questions and their discoveries, creating flows of knowledge that improve everyone's making—including yours.`,

    blindSpot:
      'Your openness can devalue your expertise. Not everyone deserves equal access to what you\'ve worked hard to learn.',

    blindSpotExpanded: `Generosity can be exploited.

Your willingness to share can be taken advantage of by those who take without reciprocating. The craft knowledge you developed through years of practice has value, and giving it away freely may not serve you or your craft.

There's also the question of craft secrets. Some knowledge is protected for reasons—safety, tradition, respect for teachers. Your openness can transgress boundaries that exist for good reasons. Not everything needs to be shared with everyone.`,

    coreBeliefs: [
      'Knowledge multiplies when shared',
      'Teaching is a form of learning',
      'Community makes craft better for everyone',
      'Openness creates connection; hoarding creates isolation',
    ],

    howYouGotHere:
      'Your answers showed a hands-on maker orientation combined with genuine openness to sharing and learning from others. You make with community in mind. This maps to the Open Maker.',

    alignsWith:
      'other Open types—you share the generous stance that makes space for connection',
    tensionWith:
      "Protective types—their guarding of techniques can feel like it keeps craft from growing",
    growsWith:
      'Confident types—they help you recognize when your expertise deserves to be valued, not just given away',

    books: [
      {
        title: 'Walkaway',
        author: 'Doctorow',
        reason:
          'Post-scarcity makers who share everything. Craft without ownership.',
      },
      {
        title: 'Down and Out in the Magic Kingdom',
        author: 'Doctorow',
        reason:
          'A reputation economy where creativity is shared freely. Making for love, not profit.',
      },
      {
        title: 'A Psalm for the Wild-Built',
        author: 'Chambers',
        reason:
          'A monk who makes tea and a robot who asks questions. Craft as service and connection.',
      },
    ],

    famousFigures: {
      real: ['Bob Ross', 'Joanna Gaines', 'Martha Stewart'],
      fictional: [
        'Mr. Rogers',
        'Julia Child (as character)',
        'Ratatouille\'s Gusteau',
      ],
    },
  },

  // =============================================================================
  // SHAPER identities (mid agency)
  // =============================================================================

  'adaptive-shaper': {
    key: 'adaptive-shaper',
    name: 'Adaptive Shaper',
    color: '#5828a8',
    noun: 'shaper',
    adjective: 'adaptive',
    quadrant: 'seeking-expansive',

    utopia:
      'Their utopia evolves constantly. What worked yesterday is material for tomorrow.',

    description:
      "You reshape what exists, adapting your approach to whatever the situation needs. Your adaptability isn't lack of direction—it's the sophisticated understanding that transformation must meet things where they are.",

    pull: 'toward responsive transformation',
    edge: 'you shape what exists by working with its nature',
    oneSentence:
      'You shape by adapting, meeting each situation on its own terms and transforming it from within.',

    superpower: 'contextual transformation',
    superpowerExpanded: `You reshape things by first understanding their nature.

Where rigid shapers force their vision onto what exists, you work with existing dynamics. You read situations, understand their internal logic, and then shape them in ways that align with that logic while moving toward something better.

This makes your transformations stick. Because you work with rather than against existing patterns, the changes you introduce feel natural rather than imposed. People and systems accept your shaping because it respects what they already are.`,

    blindSpot:
      'Your adaptive shaping can be too accommodating. Sometimes transformation requires imposing change, not just adapting to context.',

    blindSpotExpanded: `There are times when working with isn't enough.

Your responsiveness to context can become a limitation when the context itself is the problem. If you only shape in ways the situation permits, you may never achieve the more radical transformations that are sometimes needed.

There's also the question of direction. Adaptive shaping can become reactive—always responding to conditions rather than steering toward a vision. Your flexibility is a strength, but it needs the backbone of knowing what you're shaping toward.`,

    coreBeliefs: [
      'Good transformation meets things where they are',
      'Contexts shape what shaping is possible',
      'Adaptability serves change, not replaces it',
      'The adaptive shaper reads before reshaping',
    ],

    howYouGotHere:
      "Your answers showed willingness to transform what exists combined with high adaptability. You reshape, but you reshape responsively—adjusting your approach to what each situation needs. This maps to the Adaptive Shaper.",

    alignsWith:
      'other Seekers—you share the openness to adjusting based on what you learn',
    tensionWith:
      "Confident types—their certainty about how to shape can feel like it ignores context",
    growsWith:
      'Settled types—they help you maintain direction through your adaptations, ensuring flexibility serves vision',

    books: [
      {
        title: 'Parable of the Sower',
        author: 'Butler',
        reason:
          'Survival requires adapting to each new threat. Shaping community through constant change.',
      },
      {
        title: 'Dawn',
        author: 'Butler',
        reason:
          'Humanity must adapt to alien rescuers or perish. Transformation that meets you where you are.',
      },
      {
        title: 'The Fifth Season',
        author: 'Jemisin',
        reason:
          'People who shape the earth must constantly adapt to its responses. Power through responsiveness.',
      },
    ],

    famousFigures: {
      real: ['Angela Merkel', 'Satya Nadella', 'Ruth Bader Ginsburg'],
      fictional: [
        'Mystique (X-Men)',
        'Odo (Star Trek: DS9)',
        'Katara (Avatar: The Last Airbender)',
      ],
    },
  },

  'curious-shaper': {
    key: 'curious-shaper',
    name: 'Curious Shaper',
    color: '#6838b7',
    noun: 'shaper',
    adjective: 'curious',
    quadrant: 'seeking-expansive',

    utopia:
      'Their utopia experiments with its own form. Structure is hypothesis.',

    description:
      "You reshape what exists as a form of inquiry—curious about what this could become, what that transformation might reveal. Your shaping isn't about arriving somewhere; it's about discovering what's possible.",

    pull: 'toward transformative discovery',
    edge: 'you reshape to find out what reshaping reveals',
    oneSentence:
      'You shape as exploration, curious about what transformations might reveal about what things could become.',

    superpower: 'transformative inquiry',
    superpowerExpanded: `You reshape things to understand them.

Your curiosity drives you to ask: what would happen if this changed? What could this become? You experiment with transformation, treating each change as information about possibilities. This inquiry-driven shaping produces discoveries that planning alone cannot achieve.

This makes you valuable when change itself is the question. When organizations or systems need to evolve but don't know in what direction, your curious shaping explores the space of possibilities. You try things to find out what's worth trying.`,

    blindSpot:
      'Your curious shaping can disrupt what was working. Not everything benefits from being transformed.',

    blindSpotExpanded: `Curiosity without caution can harm.

Your drive to explore through transformation can ignore the value of stability. The system that was working fine gets reshaped because you were curious, and now it's worse. Your inquiry serves learning, but the thing being transformed may not want to be a laboratory.

There's also the question of consent. Curious shaping often happens to people and systems who didn't ask to be experimented on. Your inquiry may be fascinating to you and disruptive to them.`,

    coreBeliefs: [
      'Transformation reveals what stasis conceals',
      "Every shape is temporary; curiosity explores what's next",
      'Shaping is a form of asking questions',
      'The curious shaper learns from what changes and what resists',
    ],

    howYouGotHere:
      'Your answers showed willingness to transform what exists combined with deep curiosity. You reshape as exploration. This maps to the Curious Shaper.',

    alignsWith:
      'other Curious types—you share the drive to explore through whatever medium you work in',
    tensionWith:
      'Steady types—their preference for stability can feel like lack of curiosity about alternatives',
    growsWith:
      'Protective types—they help you consider what could be lost to your transformations',

    books: [
      {
        title: 'Kindred',
        author: 'Butler',
        reason:
          'Time travel forces confrontation with history. Transformation through understanding the past.',
      },
      {
        title: 'Wild Seed',
        author: 'Butler',
        reason:
          'Two immortals explore what power and change mean across centuries. Shaping as exploration.',
      },
      {
        title: 'The Lathe of Heaven',
        author: 'Le Guin',
        reason:
          'Dreams reshape reality, but curiosity about consequences matters. Transformation requires wisdom.',
      },
    ],

    famousFigures: {
      real: ['Steve Jobs', 'Coco Chanel', 'David Bowie'],
      fictional: [
        'Elsa (Frozen)',
        'Doctor Strange',
        'Willow Rosenberg (Buffy)',
      ],
    },
  },

  'open-shaper': {
    key: 'open-shaper',
    name: 'Open Shaper',
    color: '#8056d8',
    noun: 'shaper',
    adjective: 'open',
    quadrant: 'seeking-expansive',

    utopia:
      'Their utopia invites its citizens to reshape it. Transformation is participatory.',

    description:
      "You reshape what exists in collaboration with others, open to input about both direction and method. Your openness isn't indecision; it's the understanding that the best transformations include many perspectives.",

    pull: 'toward collective transformation',
    edge: 'you shape in ways that include affected voices',
    oneSentence:
      'You shape with open hands, inviting others into the transformation process because change should include those it affects.',

    superpower: 'participatory transformation',
    superpowerExpanded: `You make shaping a collective process.

Rather than imposing your vision of how things should change, you invite participation. The people and systems being reshaped have voice in the shaping. This openness produces transformations that stick because they're owned by everyone involved.

This makes you effective at change that requires buy-in. When transformation needs to be adopted rather than just implemented, your participatory approach builds the ownership that makes adoption possible.`,

    blindSpot:
      'Your participatory approach can slow necessary change. Sometimes transformation needs to happen faster than inclusive process allows.',

    blindSpotExpanded: `Participation has costs.

Including many voices takes time and energy. When change is urgent, your open process can delay it unacceptably. Sometimes the shaper needs to shape, and asking everyone's opinion is itself a failure of responsibility.

There's also the question of expertise. Openness to all input can mean giving equal weight to uninformed opinions. Your welcoming stance can undervalue the expertise that knows what transformation is actually needed.`,

    coreBeliefs: [
      'Those affected by change should shape it',
      'Participation creates ownership',
      'Openness makes transformation sustainable',
      'The best reshaping is co-created',
    ],

    howYouGotHere:
      'Your answers showed willingness to transform what exists combined with genuine openness to others. You reshape, but you reshape collaboratively. This maps to the Open Shaper.',

    alignsWith:
      'other Open types—you share the welcoming stance that makes space for participation',
    tensionWith:
      'Confident types—their certainty about direction can feel like it excludes other voices',
    growsWith:
      'Decisive types—they help you recognize when open process needs to yield to clear action',

    books: [
      {
        title: 'The Dispossessed',
        author: 'Le Guin',
        reason:
          'Revolution built on consensus and participation. Transformation that includes everyone.',
      },
      {
        title: 'Always Coming Home',
        author: 'Le Guin',
        reason:
          'A future society told through many voices. Change as collective story.',
      },
      {
        title: 'Woman on the Edge of Time',
        author: 'Piercy',
        reason:
          'A utopia built on participatory decision-making. Shaping tomorrow together.',
      },
    ],

    famousFigures: {
      real: ['Desmond Tutu', 'Eleanor Roosevelt', 'Barack Obama'],
      fictional: [
        'Aang (Avatar: The Last Airbender)',
        'T\'Challa (Black Panther)',
        'Jean-Luc Picard (Star Trek)',
      ],
    },
  },

  // =============================================================================
  // OBSERVER identities (mid-low agency)
  // =============================================================================

  'adaptive-observer': {
    key: 'adaptive-observer',
    name: 'Adaptive Observer',
    color: '#4c2291',
    noun: 'observer',
    adjective: 'adaptive',
    quadrant: 'seeking-expansive',

    utopia:
      'Their utopia has many vantage points. No single perspective is privileged.',

    description:
      "You observe by adapting your perspective—moving from view to view, refusing to settle into one way of seeing. Your adaptability isn't restlessness; it's the understanding that different vantage points reveal different truths.",

    pull: 'toward multiple perspectives',
    edge: 'you see from angles others don\'t think to try',
    oneSentence:
      'You observe by shifting perspective, knowing that different vantage points reveal different truths.',

    superpower: 'perspective mobility',
    superpowerExpanded: `You see from many angles.

Where others observe from fixed positions, you move. You try different perspectives, different frames, different assumptions. This mobility reveals aspects of reality that single-perspective observation misses.

This makes you valuable as a translator between viewpoints. You can understand why people who see things differently are all partially right. Your adaptive observation builds bridges between perspectives that others can't even see are different.`,

    blindSpot:
      'Your perspective mobility can prevent depth. Seeing from many angles is different from seeing deeply from any.',

    blindSpotExpanded: `Breadth of perspective can come at the cost of depth.

Your constant moving between viewpoints means you don't stay long with any. The understanding that comes from sustained attention—from really sitting with one way of seeing—may elude you. You know many perspectives but may not know any deeply.

There's also the question of commitment. Adaptive observation can become a way of avoiding the responsibility that comes from taking a position. If you're always shifting perspective, you never have to defend any particular view.`,

    coreBeliefs: [
      'Every perspective reveals something and conceals something',
      'Mobility between viewpoints is itself a form of understanding',
      'The adaptive observer serves truth by refusing to settle',
      'What you see depends on where you stand—so move',
    ],

    howYouGotHere:
      "Your answers showed an observational orientation combined with high adaptability. You watch, but you watch from many angles. This maps to the Adaptive Observer.",

    alignsWith:
      'other Seekers—you share the openness to changing positions, the willingness to question what you thought you knew',
    tensionWith:
      'Settled types—their fixed viewpoints can feel like they\'ve stopped looking from new angles',
    growsWith:
      'Confident types—they help you commit to perspectives long enough to develop real depth',

    books: [
      {
        title: 'Embassytown',
        author: 'Miéville',
        reason:
          'Language shapes perception so profoundly that translation requires two speakers. Perspective as prison and key.',
      },
      {
        title: 'Story of Your Life',
        author: 'Chiang',
        reason:
          'Learning an alien language restructures how you perceive time. Observation transforms the observer.',
      },
      {
        title: 'Solaris',
        author: 'Lem',
        reason:
          'An ocean planet that can\'t be understood from any single perspective. The limits of human observation.',
      },
    ],

    famousFigures: {
      real: ['Ursula K. Le Guin', 'Anthony Bourdain', 'Werner Herzog'],
      fictional: [
        'The Doctor (Doctor Who)',
        'Arya Stark (Game of Thrones)',
        'Samwise Gamgee (LOTR)',
      ],
    },
  },

  'curious-observer': {
    key: 'curious-observer',
    name: 'Curious Observer',
    color: '#5c2ca0',
    noun: 'observer',
    adjective: 'curious',
    quadrant: 'seeking-expansive',

    utopia:
      'Their utopia is full of questions. Knowing something only opens more doors.',

    description:
      "You observe with insatiable curiosity—every pattern suggesting more patterns beneath, every answer generating new questions. Your watching is active, driven by wonder about what you might see next.",

    pull: 'toward endless discovery',
    edge: 'you observe with wonder that keeps finding more to wonder at',
    oneSentence:
      'You observe with curiosity that transforms everything you see into questions worth asking.',

    superpower: 'wonder-driven attention',
    superpowerExpanded: `Your curiosity makes everything interesting.

Where others see ordinary surfaces, your curious observation finds depths. You notice the thing behind the thing, the pattern within the pattern. This wonder-driven attention produces insights that incurious observation cannot achieve.

This makes you a natural discoverer. Your curiosity drives you to look where others don't think to look, to ask questions others don't think to ask. The observations that seem obvious to you are revelations to those with less curious eyes.`,

    blindSpot:
      'Your endless curiosity can prevent conclusion. At some point, you know enough—but there\'s always more to wonder about.',

    blindSpotExpanded: `Curiosity can become avoidance.

Your drive to discover more can become a way of never having to conclude anything. There's always another question, another angle, another layer to explore. At some point, observation needs to yield to understanding, and understanding needs to yield to action.

There's also the question of relevance. Not every curious investigation is worth pursuing. Your wonder can lead you down paths that are interesting but useless, fascinating but disconnected from anything that matters.`,

    coreBeliefs: [
      'Curiosity transforms ordinary into fascinating',
      'Every answer is a door to more questions',
      'Wonder is a form of attention',
      'The curious observer never runs out of things to see',
    ],

    howYouGotHere:
      'Your answers showed an observational orientation combined with deep curiosity. You watch, and your watching is driven by wonder. This maps to the Curious Observer.',

    alignsWith:
      'other Curious types—you share the drive to keep asking questions, to let wonder guide attention',
    tensionWith:
      'Steady types—their comfort with settled knowledge can feel like curiosity that died',
    growsWith:
      'Confident types—they help you trust your observations enough to conclude, to know when wondering should yield to knowing',

    books: [
      {
        title: 'Contact',
        author: 'Sagan',
        reason:
          'A scientist\'s lifelong curiosity finally receives an answer from the stars. Wonder rewarded.',
      },
      {
        title: 'The Sparrow',
        author: 'Russell',
        reason:
          'A Jesuit mission to an alien world driven by pure wonder. Curiosity as sacred calling.',
      },
      {
        title: 'Semiosis',
        author: 'Burke',
        reason:
          'Each generation discovers more about their alien world\'s intelligence. Curiosity across lifetimes.',
      },
    ],

    famousFigures: {
      real: ['Carl Sagan', 'Jane Goodall', 'David Attenborough'],
      fictional: [
        'Sherlock Holmes',
        'Lisa Simpson',
        'Hermione Granger (Harry Potter)',
      ],
    },
  },

  'open-observer': {
    key: 'open-observer',
    name: 'Open Observer',
    color: '#7344ca',
    noun: 'observer',
    adjective: 'open',
    quadrant: 'seeking-expansive',

    utopia:
      'Their utopia makes space for different ways of seeing. Every perspective has standing.',

    description:
      "You observe with radical openness—receptive to what you might see without predetermining it, letting reality surprise you. Your openness isn't passivity; it's the active choice to see without forcing what you see into familiar categories.",

    pull: 'toward receptive seeing',
    edge: 'you observe what others filter out',
    oneSentence:
      'You observe with openness that allows you to see what more filtered attention would miss.',

    superpower: 'unfiltered perception',
    superpowerExpanded: `You see without forcing.

Where others observe through lenses of expectation and category, you try to let reality present itself unfiltered. This openness reveals aspects of what you're observing that more structured attention misses—the anomalies, the exceptions, the things that don't fit.

This makes you valuable when established frameworks are failing. When the standard ways of seeing stop producing insight, your open observation notices what more filtered attention cannot. You see the black swans that category-bound observers define away.`,

    blindSpot:
      'Your openness can become formlessness. Without some structure, observation drowns in undifferentiated input.',

    blindSpotExpanded: `Total openness is impossible—and undesirable.

Your commitment to unfiltered perception is itself a filter. And some filtering is necessary—without categories and frames, observation becomes chaos. Your openness needs enough structure to produce insight, not just impressions.

There's also the question of integration. Open observation that never synthesizes produces experience without understanding. At some point, what you've openly received needs to be organized, interpreted, made meaningful.`,

    coreBeliefs: [
      'Expectations shape what we can see—question them',
      'Reality exceeds categories—stay open to the excess',
      'Receptive attention reveals what forcing conceals',
      'The open observer serves truth by not predetermining it',
    ],

    howYouGotHere:
      'Your answers showed an observational orientation combined with genuine openness. You watch, and you watch without forcing what you see into predetermined shapes. This maps to the Open Observer.',

    alignsWith:
      'other Open types—you share the receptive stance that welcomes what comes',
    tensionWith:
      'Confident types—their certainty about what they\'re seeing can feel like premature closure',
    growsWith:
      'Settled types—they help you integrate your open observations into frameworks that enable action',

    books: [
      {
        title: 'Solaris',
        author: 'Lem',
        reason:
          'An alien ocean defies all attempts at categorization. The humility of open observation.',
      },
      {
        title: 'Annihilation',
        author: 'VanderMeer',
        reason:
          'A biologist enters a zone that defies understanding. Perception without filters.',
      },
      {
        title: 'Babel-17',
        author: 'Delany',
        reason:
          'A language that restructures consciousness. What you see depends on how you can see.',
      },
    ],

    famousFigures: {
      real: ['Mary Oliver', 'Oliver Sacks', 'Annie Dillard'],
      fictional: [
        'Luna Lovegood (Harry Potter)',
        'The Childlike Empress (NeverEnding Story)',
        'Seven of Nine (Star Trek)',
      ],
    },
  },

  // =============================================================================
  // NOTICER identities (low agency)
  // =============================================================================

  'adaptive-noticer': {
    key: 'adaptive-noticer',
    name: 'Adaptive Noticer',
    color: '#401c7a',
    noun: 'noticer',
    adjective: 'adaptive',
    quadrant: 'seeking-expansive',

    utopia:
      'Their utopia values peripheral vision. The edges matter as much as the center.',

    description:
      "You notice by adapting your attention—following where significance leads, adjusting what you're looking for based on what you find. Your adaptability isn't distraction; it's responsiveness to what the situation is trying to show you.",

    pull: 'toward responsive noticing',
    edge: 'you notice what the situation is trying to reveal',
    oneSentence:
      'You notice by following what calls for attention, adapting to what each moment is trying to show you.',

    superpower: 'responsive attention',
    superpowerExpanded: `Your noticing follows the signal.

Where others notice according to predetermined priorities, you let significance guide you. Your attention adapts to what the situation offers, catching what it's trying to reveal rather than what you decided in advance to look for.

This makes you excellent at finding the unexpected. Your adaptive noticing catches the things that weren't on anyone's list but turn out to matter most. The anomaly that reveals the pattern, the detail that changes everything—you notice these.`,

    blindSpot:
      'Your responsive noticing can be directionless. If you only follow what calls attention, you may miss what\'s important but quiet.',

    blindSpotExpanded: `Some things need to be looked for.

Your adaptability means you notice what's salient—but not everything important is salient. The slow trend, the subtle shift, the thing that's significant precisely because it doesn't call attention to itself—these can escape your responsive attention.

There's also the question of manipulation. Your attention follows what's calling it, but some things call attention precisely to distract from other things. Your adaptive noticing can be led.`,

    coreBeliefs: [
      'The situation knows what it wants to show you—follow it',
      'Responsive attention catches what fixed attention misses',
      'What calls for noticing matters more than what you planned to notice',
      'The adaptive noticer serves revelation',
    ],

    howYouGotHere:
      'Your answers showed a noticing orientation combined with high adaptability. You attend to details, but which details you attend to adapts to what the situation offers. This maps to the Adaptive Noticer.',

    alignsWith:
      'other Seekers—you share the openness to following where things lead rather than predetermining the path',
    tensionWith:
      'Settled types—their fixed priorities for noticing can feel like they miss what the moment is offering',
    growsWith:
      'Confident types—they help you notice with purpose, combining your responsiveness with direction',

    books: [
      {
        title: 'Arrival',
        author: 'Chiang',
        reason:
          'A linguist learns to perceive time differently. Attention that adapts to alien logic.',
      },
      {
        title: 'Blindsight',
        author: 'Watts',
        reason:
          'First contact challenges every assumption about consciousness. Noticing what we take for granted.',
      },
      {
        title: 'Dark Intelligence',
        author: 'Asher',
        reason:
          'An AI notices patterns across centuries. Responsive attention at inhuman scale.',
      },
    ],

    famousFigures: {
      real: ['Jane Goodall', 'Temple Grandin', 'Octavia Butler'],
      fictional: [
        'Eleven (Stranger Things)',
        'River Tam (Firefly)',
        'Wednesday Addams',
      ],
    },
  },

  'curious-noticer': {
    key: 'curious-noticer',
    name: 'Curious Noticer',
    color: '#502688',
    noun: 'noticer',
    adjective: 'curious',
    quadrant: 'seeking-expansive',

    utopia:
      'Their utopia is full of small wonders. Nothing is too ordinary to be interesting.',

    description:
      "You notice with curiosity that makes the ordinary fascinating. The details others overlook become, in your attention, doorways to wonder. Your noticing isn't about surveillance; it's about appreciation.",

    pull: 'toward small wonders',
    edge: 'you notice the miracle in the mundane',
    oneSentence:
      'You notice with curiosity that transforms everyday details into small wonders worth attending to.',

    superpower: 'appreciative attention',
    superpowerExpanded: `Your curiosity makes details precious.

Where others rush past the ordinary, your curious noticing finds it extraordinary. The pattern in the grain of wood, the rhythm of someone's speech, the particular quality of light at this hour—these details that others dismiss become, in your attention, sources of genuine wonder.

This makes you a guardian of significance. You notice and appreciate what would otherwise go unregarded. Your curious attention preserves and honors the small things that make life rich.`,

    blindSpot:
      'Your appreciative noticing can miss what\'s wrong. Wonder can become blindness to problems hiding in the details.',

    blindSpotExpanded: `Appreciation isn't assessment.

Your tendency to find wonder in details can make you miss warning signs. The pattern that's beautiful is also the pattern that indicates decay. The detail that fascinates you is also the detail that signals danger. Curious noticing needs to include noticing what's wrong.

There's also the question of action. Appreciating details isn't the same as doing something about them. Your curious noticing can become an end in itself, a form of aesthetic engagement that never translates into change.`,

    coreBeliefs: [
      'Everything rewards close attention',
      'Curiosity transforms ordinary into extraordinary',
      'Details are where the texture of life lives',
      'Noticing with wonder is a form of gratitude',
    ],

    howYouGotHere:
      'Your answers showed a noticing orientation combined with deep curiosity. You attend to details, and your attention is driven by wonder. This maps to the Curious Noticer.',

    alignsWith:
      'other Curious types—you share the wonder-driven attention that finds fascination everywhere',
    tensionWith:
      'Confident types—their certainty about what matters can feel like it dismisses the significance of small things',
    growsWith:
      'Protective types—they help you notice what\'s wrong as well as what\'s wondrous',

    books: [
      {
        title: 'The Long Way to a Small, Angry Planet',
        author: 'Chambers',
        reason:
          'Every species has wonders to notice. Curiosity across difference.',
      },
      {
        title: 'A Memory Called Empire',
        author: 'Martine',
        reason:
          'An ambassador notices the poetry in imperial culture. Appreciative attention in dangerous places.',
      },
      {
        title: 'Piranesi',
        author: 'Clarke',
        reason:
          'A man catalogs an infinite house with wonder. Small wonders in vast mysteries.',
      },
    ],

    famousFigures: {
      real: ['Mary Oliver', 'Beatrix Potter', 'John Muir'],
      fictional: [
        'Amélie Poulain',
        'Anne of Green Gables',
        'Eleven (Stranger Things)',
      ],
    },
  },

  'open-noticer': {
    key: 'open-noticer',
    name: 'Open Noticer',
    color: '#6638bb',
    noun: 'noticer',
    adjective: 'open',
    quadrant: 'seeking-expansive',

    utopia:
      'Their utopia welcomes all kinds of seeing. There is no one right way to notice.',

    description:
      "You notice with radical openness—receptive to whatever details present themselves, not filtering for particular kinds of significance. Your openness isn't lack of focus; it's the understanding that significance might come from anywhere.",

    pull: 'toward receptive detail',
    edge: 'you notice what filters would exclude',
    oneSentence:
      'You notice with openness that catches details others filter out before seeing.',

    superpower: 'unfilteted detail',
    superpowerExpanded: `You notice without predetermining what's noticeable.

Your openness allows details to register that more filtered attention would exclude before awareness. The thing that doesn't fit the category, the anomaly that contradicts expectations, the detail that seems irrelevant—you notice these.

This makes you valuable when established ways of noticing are missing something. Your unfiltered attention catches what structured attention can't see precisely because it's not looking for it.`,

    blindSpot:
      'Your unfiltered noticing can overwhelm you. Without some filtering, every detail demands equal attention.',

    blindSpotExpanded: `Total openness is overwhelm.

Your commitment to noticing without filtering can become exhausting. Not every detail deserves attention, and some filtering is necessary to function. Your openness needs enough structure to remain sustainable.

There's also the question of synthesis. Open noticing that never organizes produces a flood of details without pattern. At some point, what you've openly noticed needs to be made sense of.`,

    coreBeliefs: [
      'Filters exclude before we know what\'s excluded',
      'Open noticing catches the unexpected',
      'Significance can come from anywhere—stay receptive',
      'The open noticer serves what wants to be seen',
    ],

    howYouGotHere:
      'Your answers showed a noticing orientation combined with genuine openness. You attend to details without predetermining which details matter. This maps to the Open Noticer.',

    alignsWith:
      'other Open types—you share the receptive stance that welcomes what comes',
    tensionWith:
      'Confident types—their certainty about what\'s noticeable can feel like it excludes important details',
    growsWith:
      'Settled types—they help you organize your open noticing into patterns that enable understanding',

    books: [
      {
        title: 'Annihilation',
        author: 'VanderMeer',
        reason:
          'A biologist records everything without judgment. Open noticing of the incomprehensible.',
      },
      {
        title: 'The Book of the New Sun',
        author: 'Wolfe',
        reason:
          'A narrator notices everything but understands little. Unfiltered observation in a strange world.',
      },
      {
        title: 'Borne',
        author: 'VanderMeer',
        reason:
          'A scavenger finds wonder in ruins. Noticing what others discard.',
      },
    ],

    famousFigures: {
      real: ['John Cage', 'Agnes Martin', 'Robin Wall Kimmerer'],
      fictional: [
        'Luna Lovegood (Harry Potter)',
        'Dory (Finding Nemo)',
        'Momo (Momo)',
      ],
    },
  },

  // =============================================================================
  // WITNESS identities (lowest agency)
  // =============================================================================

  'adaptive-witness': {
    key: 'adaptive-witness',
    name: 'Adaptive Witness',
    color: '#341664',
    noun: 'witness',
    adjective: 'adaptive',
    quadrant: 'seeking-expansive',

    utopia:
      'Their utopia makes space for many kinds of presence. Witnessing takes many forms.',

    description:
      "You bear witness by adapting—adjusting how you're present to what each situation needs. Your adaptability isn't lack of presence; it's the sophisticated understanding that different moments require different kinds of witnessing.",

    pull: 'toward responsive presence',
    edge: 'you witness in whatever way the moment needs',
    oneSentence:
      'You witness by adapting your presence to what each situation requires, knowing that one way of attending cannot fit all.',

    superpower: 'versatile presence',
    superpowerExpanded: `You show up differently based on what's needed.

Your presence isn't one-size-fits-all. You read what's required—silent presence or active listening, physical nearness or respectful distance, bearing witness to pain or celebrating joy—and you adapt. This versatility means your witnessing actually serves what's being witnessed.

This makes you valuable across contexts that need different kinds of presence. The dying person who needs silent company, the celebrating friend who needs enthusiastic witness, the traumatized survivor who needs careful attention—you can be present to all of them appropriately.`,

    blindSpot:
      'Your adaptive witnessing can lack center. If you\'re always adjusting to others, where is your own presence?',

    blindSpotExpanded: `Constant adaptation can erode self.

Your commitment to being what each situation needs can mean never being simply yourself. Your presence becomes reactive, shaped entirely by external demands. But authentic witnessing requires you to bring something—not just absorb and reflect what's there.

There's also the question of limits. Adaptive witnessing can mean never setting boundaries about what you're willing to witness. But some things cost too much to see; some presences take too much. Your adaptability needs limits to remain sustainable.`,

    coreBeliefs: [
      'Different moments need different witnesses',
      'Presence is not one thing—it adapts',
      'The adaptive witness serves what is witnessed',
      'Being present means meeting the situation where it is',
    ],

    howYouGotHere:
      'Your answers showed a witnessing orientation combined with high adaptability. You are present, but how you are present adapts to what is needed. This maps to the Adaptive Witness.',

    alignsWith:
      'other Seekers—you share the openness to changing how you show up based on what you encounter',
    tensionWith:
      'Settled types—their fixed way of being present can feel like it serves their comfort rather than what\'s witnessed',
    growsWith:
      'Confident types—they help you bring your own presence rather than only adapting to others',

    books: [
      {
        title: 'The Sparrow',
        author: 'Russell',
        reason:
          'A priest adapts his witness to alien culture. Presence that crosses impossible distances.',
      },
      {
        title: 'Children of Time',
        author: 'Tchaikovsky',
        reason:
          'Consciousness evolves in many forms, each requiring different ways of being present.',
      },
      {
        title: 'Never Let Me Go',
        author: 'Ishiguro',
        reason:
          'Witnessing lives shaped by terrible purpose. Adapting presence to unbearable truths.',
      },
    ],

    famousFigures: {
      real: ['Mr. Rogers', 'Terry Gross', 'Pema Chödrön'],
      fictional: [
        'Mary Poppins',
        'Iroh (Avatar: The Last Airbender)',
        'The Childlike Empress (NeverEnding Story)',
      ],
    },
  },

  'curious-witness': {
    key: 'curious-witness',
    name: 'Curious Witness',
    color: '#442070',
    noun: 'witness',
    adjective: 'curious',
    quadrant: 'seeking-expansive',

    utopia:
      'Their utopia listens to every story. No experience is too ordinary to witness.',

    description:
      "You bear witness with genuine curiosity—wanting to understand what you're seeing, not just see it. Your curiosity isn't intrusion; it's the desire to truly comprehend what you're being shown.",

    pull: 'toward understanding presence',
    edge: 'you witness with the depth that comes from wanting to understand',
    oneSentence:
      'You witness with curiosity that deepens your presence, wanting to truly understand what you are privileged to see.',

    superpower: 'comprehending presence',
    superpowerExpanded: `You don't just witness—you seek to understand.

Your curiosity drives you beyond surface presence into genuine comprehension. You want to know what it's like, what it means, how it fits together. This understanding-seeking presence makes your witnessing more meaningful to both you and what you witness.

This makes you a witness who truly holds what is witnessed. Because you've tried to understand, your witnessing has depth. The story you've heard doesn't just pass through you—you've genuinely received it.`,

    blindSpot:
      'Your curious witnessing can become intrusive. Sometimes presence doesn\'t need to understand—it just needs to be there.',

    blindSpotExpanded: `Curiosity can be a form of demand.

Your desire to understand can make your witnessing feel like work for the person being witnessed. They have to explain, to help you comprehend. Sometimes that's welcome; sometimes it's burden. Your curiosity should serve the witnessed, not just your own understanding.

There's also the question of limits. Not everything can or should be understood. Some experiences exceed comprehension; some stories resist explanation. Your curious drive to understand can become frustration when understanding isn't available.`,

    coreBeliefs: [
      'Witnessing with understanding is witnessing fully',
      'Curiosity is a form of respect for what you see',
      'Understanding deepens presence',
      'The curious witness holds what is witnessed with care',
    ],

    howYouGotHere:
      'Your answers showed a witnessing orientation combined with deep curiosity. You are present, and your presence is driven by genuine desire to understand. This maps to the Curious Witness.',

    alignsWith:
      'other Curious types—you share the drive to understand, to go deeper than surface engagement',
    tensionWith:
      'Bold types—their focus on action can feel like it rushes past understanding',
    growsWith:
      'Open types—they help you be present without needing to understand, accepting mystery',

    books: [
      {
        title: 'The Sparrow',
        author: 'Russell',
        reason:
          'Curiosity drives a mission to understand alien song. Witnessing that needs to comprehend.',
      },
      {
        title: 'Contact',
        author: 'Sagan',
        reason:
          'A scientist witnesses humanity\'s first message from the stars. Curiosity as reverence.',
      },
      {
        title: 'Lilith\'s Brood',
        author: 'Butler',
        reason:
          'Witnessing alien ways of being with deep curiosity. Understanding across unbridgeable difference.',
      },
    ],

    famousFigures: {
      real: ['Studs Terkel', 'Terry Gross', 'Krista Tippett'],
      fictional: [
        'Samwell Tarly (Game of Thrones)',
        'The Doctor (Doctor Who)',
        'Frodo Baggins (LOTR)',
      ],
    },
  },

  'open-witness': {
    key: 'open-witness',
    name: 'Open Witness',
    color: '#5a2cac',
    noun: 'witness',
    adjective: 'open',
    quadrant: 'seeking-expansive',

    utopia:
      'Their utopia is held by those willing to see. Every experience finds a witness.',

    description:
      "You bear witness with radical openness—receptive to whatever you're shown, not filtering or judging what you see. Your openness isn't passivity; it's the active choice to receive without condition.",

    pull: 'toward unconditional presence',
    edge: 'you witness what others cannot bear to see',
    oneSentence:
      'You witness with openness that receives whatever is shown, holding space without judgment or condition.',

    superpower: 'unconditional reception',
    superpowerExpanded: `You receive without requiring.

Your witnessing makes no demands on what is witnessed. You don't need it to be beautiful, or understandable, or justified. You simply receive it, holding space for whatever appears. This unconditional quality makes your presence a true gift.

This makes you invaluable for those who have things to share that usually get judged or rejected. The experiences too shameful to tell, the truths too ugly to admit, the realities too strange to be believed—you witness these with openness that allows them to be told.`,

    blindSpot:
      'Your unconditional witnessing can fail to protect you. Some things witnessed leave marks; some presences cost too much.',

    blindSpotExpanded: `Openness needs limits to remain sustainable.

Your commitment to receiving whatever appears can overwhelm you. Not everything should be witnessed, at least not by you, at least not now. Your unconditional openness can be exploited by those who want a dumping ground rather than a true witness.

There's also the question of discernment. Open witnessing that never judges can fail to distinguish between what needs to be held with compassion and what needs to be named as harmful. Some things, once witnessed, deserve response.`,

    coreBeliefs: [
      'Everyone deserves to be witnessed',
      'Unconditional presence is a profound gift',
      'Openness creates space for what would otherwise go unseen',
      'The open witness holds without needing to fix',
    ],

    howYouGotHere:
      'Your answers showed a witnessing orientation combined with genuine openness. You are present without conditions, receiving whatever appears. This maps to the Open Witness.',

    alignsWith:
      'other Open types—you share the receptive stance that welcomes what comes',
    tensionWith:
      'Confident types—their judgments about what they see can feel like closure that excludes',
    growsWith:
      'Protective types—they help you maintain boundaries within your openness, ensuring sustainable presence',

    books: [
      {
        title: 'The Left Hand of Darkness',
        author: 'Le Guin',
        reason:
          'Witnessing an alien gender without judgment. Unconditional presence across difference.',
      },
      {
        title: 'Never Let Me Go',
        author: 'Ishiguro',
        reason:
          'Witnessing lives that exist for others. Presence without needing to fix.',
      },
      {
        title: 'The Giver',
        author: 'Lowry',
        reason:
          'One person holds all memory of joy and suffering. The weight of unconditional witness.',
      },
    ],

    famousFigures: {
      real: ['Thich Nhat Hanh', 'Ram Dass', 'Elizabeth Kübler-Ross'],
      fictional: [
        'The Giver (The Giver)',
        'Death (Sandman)',
        'Amma (Encanto)',
      ],
    },
  },
}
