/**
 * Settled + Protective Quadrant Identities (21 total)
 *
 * Quadrant characteristics:
 * - High certainty + preservation orientation
 * - Grounded, careful, preserving what works
 * - Adjectives: Steady (most extreme), Grounded (middle), Anchored (mildest)
 *
 * 7 nouns x 3 adjectives = 21 identities
 */

import type { Identity } from './identities'

export const settledProtectiveIdentities: Record<string, Identity> = {
  // =============================================================================
  // ARCHITECT identities (highest agency)
  // =============================================================================

  'steady-architect': {
    key: 'steady-architect',
    name: 'Steady Architect',
    color: '#0d9488',
    noun: 'architect',
    adjective: 'steady',
    quadrant: 'settled-protective',

    utopia:
      'Their utopia was built to last. The foundations go deeper than anyone remembers.',

    description:
      "You design systems meant to endure. Your steadiness isn't stubbornness—it's the hard-won wisdom of someone who has seen what fails and knows how to build what won't. You protect through architecture.",

    pull: 'toward lasting foundations',
    edge: 'you design what will still stand when everything else has changed',
    oneSentence:
      'You build for permanence, knowing that the structures which protect us must be designed by someone willing to think in generations.',

    superpower: 'protective architecture',
    superpowerExpanded: `You design systems that shelter what matters.

While others chase innovation, you ask different questions: What could go wrong? What needs to be protected? What will this look like in twenty years? Your architectural vision includes defensive depth—redundancies, fail-safes, the unglamorous work of making things resilient.

This makes you invaluable when the stakes are high. The systems that can't fail, the structures that must endure, the architectures that protect vulnerable things—these need someone thinking beyond the immediate. Your steadiness is the foundation others build upon.`,

    blindSpot:
      'Your protective instinct can become resistance to necessary change. Not everything needs to last forever, and some foundations need to be rebuilt.',

    blindSpotExpanded: `Your commitment to permanence can become rigidity.

The same instinct that makes you build enduring systems can make you defensive when those systems need to change. "This was designed this way for good reasons" is true—but reasons can become outdated. Your steady architecture can become a fortress that protects the past from the future.

There's also opportunity cost. The energy you spend on protection might sometimes be better spent on building something new. Not everything worth protecting is worth the cost of protecting it. Learning when to let go is as important as knowing how to hold on.`,

    coreBeliefs: [
      'The best architecture anticipates threats that haven\'t emerged yet',
      'Permanence requires planning; resilience requires wisdom',
      'Protecting what matters is as creative as building what\'s new',
      'Foundations matter more than facades—invest accordingly',
    ],

    howYouGotHere:
      'Your answers revealed someone who designs from a place of settled conviction with an eye toward preservation. You think in terms of what could go wrong and how to prevent it. This protective, systems-level thinking maps to the Steady Architect.',

    alignsWith:
      'other Settled types—you share the quality of having arrived at convictions you trust, of knowing your position',
    tensionWith:
      'Seeking types—their constant revision can feel like inability to commit, like they haven\'t learned what you\'ve learned about what fails',
    growsWith:
      'Expansive types—they push you to consider that some of what you\'re protecting might need to evolve',

    books: [
      {
        title: 'Foundation',
        author: 'Asimov',
        reason:
          'Psychohistory as protective architecture. Building institutions meant to outlast collapse.',
      },
      {
        title: 'Seveneves',
        author: 'Stephenson',
        reason:
          'When the moon explodes, humanity must build structures to survive millennia. Architecture for the worst case.',
      },
      {
        title: 'A Canticle for Leibowitz',
        author: 'Miller',
        reason:
          'Monks preserving knowledge through dark ages. The architecture of cultural continuity.',
      },
    ],

    famousFigures: {
      real: ['Jane Jacobs', 'Aldo Leopold', 'Ruth Bader Ginsburg'],
      fictional: [
        'Elrond (Lord of the Rings)',
        'Professor McGonagall (Harry Potter)',
        'Nick Fury (Marvel)',
      ],
    },
  },

  'grounded-architect': {
    key: 'grounded-architect',
    name: 'Grounded Architect',
    color: '#14b8a6',
    noun: 'architect',
    adjective: 'grounded',
    quadrant: 'settled-protective',

    utopia:
      'Their utopia has deep roots. Growth happens, but never at the expense of stability.',

    description:
      "You design from a place of rootedness, connected to what has worked before while thoughtful about what comes next. Your architecture doesn't ignore change—it channels change safely.",

    pull: 'toward rooted growth',
    edge: 'you design systems that can change without breaking',
    oneSentence:
      'You build systems that honor their foundations while remaining open to growth—because rootedness and adaptation aren\'t opposites.',

    superpower: 'stable evolution',
    superpowerExpanded: `You design systems that can change without collapsing.

Your grounded approach means you understand that permanence and flexibility aren't opposites—they're partners. The best systems have stable cores and adaptable edges. You know which parts can change and which parts must not. This allows you to build things that endure precisely because they can evolve.

People come to you when they need architecture that's both reliable and not rigid. The organization that needs restructuring without losing its identity. The system that needs updating without breaking what works. You understand how to change safely.`,

    blindSpot:
      'Your balanced approach can become an excuse for insufficient ambition. Sometimes you need to tear down the old to build something genuinely better.',

    blindSpotExpanded: `Your groundedness can become a comfort zone.

The balance you value—stability with flexibility, roots with growth—can prevent you from recognizing when more radical change is needed. Sometimes the foundation itself is the problem. Sometimes rooted growth means stunted growth. Your instinct to protect can limit the scale of transformation you're willing to consider.

There's also the question of whose stability you're protecting. Grounded architecture often serves those already well-served by existing structures. When the roots are in soil that's poisoned, rootedness isn't wisdom—it's complicity.`,

    coreBeliefs: [
      'The strongest systems have both deep roots and flexible branches',
      'Stability is not the enemy of change—chaos is',
      'Understanding what must not change enables understanding what can',
      'Grounded architecture serves the future by respecting the past',
    ],

    howYouGotHere:
      'Your answers showed systems thinking combined with a preference for preservation that allows for evolution. You design for stability without rigidity. This balanced, protective approach maps to the Grounded Architect.',

    alignsWith:
      'other Protective types—you share the orientation toward preservation, toward building things that last',
    tensionWith:
      'Bold types—their willingness to disrupt can feel reckless, like they don\'t value what they\'re breaking',
    growsWith:
      'Curious types—they remind you that some of what seems foundational might benefit from questioning',

    books: [
      {
        title: 'Aurora',
        author: 'Robinson',
        reason:
          'A generation ship learns the limits of closed systems. Grounded understanding of what sustainability actually requires.',
      },
      {
        title: 'The Ministry for the Future',
        author: 'Robinson',
        reason:
          'Practical, rooted solutions to climate catastrophe. Architecture grounded in what actually works.',
      },
      {
        title: 'Ecotopia',
        author: 'Callenbach',
        reason:
          'A society rebuilt on ecological principles. Grounded architecture serving sustainable life.',
      },
    ],

    famousFigures: {
      real: ['Christopher Alexander', 'Wendell Berry', 'E.F. Schumacher'],
      fictional: [
        'Aragorn (Lord of the Rings)',
        'T\'Challa (Black Panther)',
        'Jean-Luc Picard (Star Trek)',
      ],
    },
  },

  'anchored-architect': {
    key: 'anchored-architect',
    name: 'Anchored Architect',
    color: '#2dd4bf',
    noun: 'architect',
    adjective: 'anchored',
    quadrant: 'settled-protective',

    utopia:
      'Their utopia can weather any storm. It bends but doesn\'t break.',

    description:
      "You design with a clear center, building systems that can flex without losing their essential nature. Your anchor isn't a fixed point—it's a stable orientation that keeps things aligned when circumstances change.",

    pull: 'toward centered resilience',
    edge: 'you design systems that stay themselves through change',
    oneSentence:
      'You build architectures that hold their center through turbulence—because stability isn\'t rigidity, it\'s knowing what you can\'t afford to lose.',

    superpower: 'centered design',
    superpowerExpanded: `You design from a clear sense of what matters most.

When you architect a system, you know its core. Everything else can flex, adapt, even be replaced—but the center holds. This clarity about essentials allows you to be surprisingly flexible about everything else. You're not rigid; you're anchored.

This makes your architectures resilient. When storms come—and they always do—your systems bend rather than break. They lose some peripheral functions but keep their essential nature. The things you build last because they know what they're for.`,

    blindSpot:
      'Your sense of what\'s central can be wrong. Sometimes the anchor point needs to move, and your clarity about the core becomes an obstacle.',

    blindSpotExpanded: `Your anchoring can anchor the wrong things.

You're clear about what matters, but what if you're clear about the wrong thing? The center you're protecting might not be the center the future needs. Your architectural clarity can make it hard to reconsider fundamentals, because fundamentals are precisely what anchored design doesn't reconsider.

There's also the danger of false anchors. The values you think are central might be comfortable habits disguised as principles. The true test of anchored architecture is whether it can distinguish what's genuinely essential from what's merely familiar.`,

    coreBeliefs: [
      'Clear centers enable flexible edges',
      'Resilience comes from knowing what you can\'t afford to lose',
      'Anchored architecture bends without breaking',
      'The best systems know what they\'re for',
    ],

    howYouGotHere:
      'Your answers revealed a clear sense of what matters combined with flexibility about everything else. You design from the center outward, protecting essentials while remaining adaptable. This maps to the Anchored Architect.',

    alignsWith:
      'other Anchored types—you share the quality of knowing your center, of building from clear priorities',
    tensionWith:
      'Adaptive types—their constant flexibility can seem like absence of conviction, like they don\'t know what they stand for',
    growsWith:
      'Open types—they challenge you to examine whether your anchors are really as essential as you assume',

    books: [
      {
        title: 'Station Eleven',
        author: 'Mandel',
        reason:
          'What survives collapse: art, memory, purpose. The essentials that anchor civilization.',
      },
      {
        title: 'The Book of the New Sun',
        author: 'Wolfe',
        reason:
          'Layers of meaning around a central mystery. Architecture where the center holds despite everything.',
      },
      {
        title: 'Dune',
        author: 'Herbert',
        reason:
          'Ecology, politics, and religion woven around the unchanging desert. Systems with clear centers.',
      },
    ],

    famousFigures: {
      real: ['Fred Rogers', 'Mahatma Gandhi', 'The Dalai Lama'],
      fictional: [
        'Obi-Wan Kenobi (Star Wars)',
        'Uncle Iroh (Avatar)',
        'Morpheus (The Matrix)',
      ],
    },
  },

  // =============================================================================
  // BUILDER identities (high agency)
  // =============================================================================

  'steady-builder': {
    key: 'steady-builder',
    name: 'Steady Builder',
    color: '#0b8579',
    noun: 'builder',
    adjective: 'steady',
    quadrant: 'settled-protective',

    utopia:
      'Their utopia was built brick by brick. No shortcuts, no collapses.',

    description:
      "You build with patient persistence, understanding that lasting things require steady effort over time. Your pace might seem slow, but what you build doesn't fall down.",

    pull: 'toward durable construction',
    edge: 'you build things that are still standing when flashier work has crumbled',
    oneSentence:
      'You build with the patience of someone who knows that lasting work can\'t be rushed—and what lasts is what matters.',

    superpower: 'patient construction',
    superpowerExpanded: `You build steadily, and what you build endures.

While others sprint and burn out, you maintain a pace you can sustain. While others cut corners, you do the work properly. This isn't slow—it's sustainable. Your building projects finish not because of heroic pushes but because of reliable progress, day after day.

The things you build inherit your steadiness. They're not flashy, but they work. They don't have hidden flaws that emerge later. They were built right the first time, which is more efficient than building fast and fixing forever.`,

    blindSpot:
      'Your steady pace can become inflexibility about timelines. Sometimes situations demand faster work, and your sustainable pace isn\'t sustainable for the situation.',

    blindSpotExpanded: `Steady isn't always the right speed.

Your commitment to building properly can make you resistant to situations that require building faster. Yes, cutting corners has costs—but so does missing windows of opportunity. Your steady approach is valuable, but it's not the only valuable approach.

There's also the question of perfectionism disguised as diligence. "Doing it properly" can become an endless expansion of scope, a way of never finishing because there's always more to do right. At some point, steady building needs to become completion.`,

    coreBeliefs: [
      'Lasting construction requires patient construction',
      'Speed without sustainability is just deferred cost',
      'Steady effort compounds; heroic effort exhausts',
      'What you build reflects how you build',
    ],

    howYouGotHere:
      'Your answers showed hands-on building combined with a steady, sustainable approach. You create things that last because you take the time to build them right. This maps to the Steady Builder.',

    alignsWith:
      'other Steady types—you share the quality of patient persistence, of valuing sustainability over speed',
    tensionWith:
      'Bold types—their rapid action can seem careless, like they\'re creating problems for future builders to fix',
    growsWith:
      'Confident types—they push you to own your building more publicly, to claim the results of your steady work',

    books: [
      {
        title: 'Red Mars',
        author: 'Robinson',
        reason:
          'Terraforming requires centuries of patient work. Building that thinks in generations.',
      },
      {
        title: 'The Long Earth',
        author: 'Pratchett & Baxter',
        reason:
          'Steady exploration of infinite worlds. Building at sustainable pace across unlimited frontier.',
      },
      {
        title: 'Children of Time',
        author: 'Tchaikovsky',
        reason:
          'Civilizations built across millennia. The patient construction of societies that endure.',
      },
    ],

    famousFigures: {
      real: ['Bob Ross', 'Miyamoto Musashi', 'Tom Hanks'],
      fictional: [
        'Samwise Gamgee (Lord of the Rings)',
        'Hank Hill (King of the Hill)',
        'Bob Belcher (Bob\'s Burgers)',
      ],
    },
  },

  'grounded-builder': {
    key: 'grounded-builder',
    name: 'Grounded Builder',
    color: '#10a392',
    noun: 'builder',
    adjective: 'grounded',
    quadrant: 'settled-protective',

    utopia:
      'Their utopia is built from real materials, for real needs. Nothing is built for show.',

    description:
      "You build practically, connected to what's actually needed rather than what's theoretically impressive. Your grounded approach means you understand both the materials and the people you're building for.",

    pull: 'toward practical construction',
    edge: 'you build what actually works for the people who actually use it',
    oneSentence:
      'You build from the ground up, ensuring that every element serves a real purpose for real people.',

    superpower: 'practical building',
    superpowerExpanded: `You build things that work.

Not things that look like they should work, or things that theoretically work in ideal conditions. Things that actually function for the actual people using them. You understand the gap between elegant design and messy reality, and you build for the messy reality.

This groundedness makes you invaluable when projects need to actually ship. The prototype that needs to become a product. The plan that needs to become an implementation. You bridge the gap between intention and execution because you never lose touch with the ground.`,

    blindSpot:
      'Your practicality can limit imagination. Sometimes what\'s needed isn\'t practical yet—it requires building something that doesn\'t have obvious immediate use.',

    blindSpotExpanded: `Practical isn't always right.

Your grounded approach serves you well for most building—but some of the most important things ever built seemed impractical when they started. Basic research, artistic exploration, infrastructure that pays off over decades—these don't pass the immediate practicality test, yet they matter enormously.

There's also a question of whose needs you're grounding yourself in. Practical building serves existing needs well, but what about needs that don't exist yet? Or needs that people can't articulate? Your groundedness can anchor you to the present at the expense of the future.`,

    coreBeliefs: [
      'Building should serve real needs, not theoretical ones',
      'Understanding users is as important as understanding materials',
      'Practicality is not the enemy of quality—it\'s the foundation',
      'Grounded building starts with grounded listening',
    ],

    howYouGotHere:
      'Your answers showed practical building combined with attention to real needs. You create things that work because you stay connected to what people actually require. This maps to the Grounded Builder.',

    alignsWith:
      'other Grounded types—you share the orientation toward practical reality, toward what actually works rather than what should work',
    tensionWith:
      'Adaptive types—their constant experimentation can seem unfocused, like building without clear purpose',
    growsWith:
      'Confident types—they encourage you to take risks beyond the immediately practical',

    books: [
      {
        title: 'The Martian',
        author: 'Weir',
        reason:
          'Practical problem-solving with available materials. Grounded building that actually works.',
      },
      {
        title: 'Farmer in the Sky',
        author: 'Heinlein',
        reason:
          'Terraforming Ganymede through practical work. Building colonies from the ground up.',
      },
      {
        title: 'A Psalm for the Wild-Built',
        author: 'Chambers',
        reason:
          'A tea monk and a robot discuss what humans actually need. Practical service to real people.',
      },
    ],

    famousFigures: {
      real: ['Henry David Thoreau', 'Jimmy Carter', 'Ina Garten'],
      fictional: [
        'Leslie Knope (Parks & Rec)',
        'Pa Ingalls (Little House)',
        'The Mandalorian',
      ],
    },
  },

  'anchored-builder': {
    key: 'anchored-builder',
    name: 'Anchored Builder',
    color: '#25c0ab',
    noun: 'builder',
    adjective: 'anchored',
    quadrant: 'settled-protective',

    utopia:
      'Their utopia knows what it\'s building toward. Every effort serves a clear purpose.',

    description:
      "You build from a clear sense of purpose, with each construction choice guided by what you're ultimately trying to create. Your anchoring isn't rigidity—it's direction.",

    pull: 'toward purposeful building',
    edge: 'you build with every piece connected to a larger vision',
    oneSentence:
      'You build with purpose, ensuring that every effort contributes to something larger than itself.',

    superpower: 'purpose-driven building',
    superpowerExpanded: `You know why you're building.

Every choice you make connects back to a larger purpose. This isn't rigid planning—it's coherent building. When decisions arise, you evaluate them against your anchor: does this serve what we're ultimately trying to create? This clarity prevents drift, scope creep, and building for building's sake.

Teams value your anchoring. When a project starts losing direction, you're the one who can articulate what you're all supposed to be doing. Your clear purpose keeps construction meaningful even when the work becomes tedious.`,

    blindSpot:
      'Your purpose-anchoring can miss opportunities that emerge from undirected building. Sometimes you need to build without knowing why.',

    blindSpotExpanded: `Purpose can become a filter that removes serendipity.

Your anchored approach means you evaluate choices against purpose—but some of the best discoveries come from building without a clear why. The unexpected connection, the accidental feature, the solution looking for a problem. Your purposefulness can screen out valuable randomness.

There's also the question of changing purpose. What if your anchor was set wrong, or the right anchor has shifted? Your commitment to building toward a clear goal can make it hard to recognize when the goal itself needs to change.`,

    coreBeliefs: [
      'Purposeful building is more efficient than aimless construction',
      'Direction prevents drift',
      'The best building connects every piece to a larger whole',
      'Anchored builders serve their purpose, not their egos',
    ],

    howYouGotHere:
      'Your answers showed construction oriented by clear purpose. You build with everything connected to a larger vision. This maps to the Anchored Builder.',

    alignsWith:
      'other Anchored types—you share the quality of building from clear centers, of knowing what you\'re doing and why',
    tensionWith:
      'Curious types—their exploratory building can seem aimless, lacking the direction that makes building worthwhile',
    growsWith:
      'Open types—they remind you that sometimes the purpose emerges from the building, not before it',

    books: [
      {
        title: 'The Left Hand of Darkness',
        author: 'Le Guin',
        reason:
          'An envoy with a clear mission navigates an alien world. Purpose that persists through confusion.',
      },
      {
        title: 'Speaker for the Dead',
        author: 'Card',
        reason:
          'A speaker helps communities understand their dead. Building meaning through purposeful witness.',
      },
      {
        title: 'Contact',
        author: 'Sagan',
        reason:
          'A scientist\'s lifelong purpose: finding extraterrestrial intelligence. Building toward a single clear goal.',
      },
    ],

    famousFigures: {
      real: ['Dolly Parton', 'Warren Buffett', 'Michelle Obama'],
      fictional: [
        'Captain America (Marvel)',
        'Atticus Finch (To Kill a Mockingbird)',
        'Mary Poppins',
      ],
    },
  },

  // =============================================================================
  // MAKER identities (mid-high agency)
  // =============================================================================

  'steady-maker': {
    key: 'steady-maker',
    name: 'Steady Maker',
    color: '#09756b',
    noun: 'maker',
    adjective: 'steady',
    quadrant: 'settled-protective',

    utopia:
      'Their utopia values the made over the manufactured. Care is visible in every object.',

    description:
      "You make with patient craft, creating objects that carry the steadiness of their creation. What you make is reliable because you are reliable. Your making is a practice, not a performance.",

    pull: 'toward craft as practice',
    edge: 'you make with the steadiness that produces objects worth keeping',
    oneSentence:
      'You make things steadily and well, because craft is a practice that rewards patience and punishes shortcuts.',

    superpower: 'reliable craft',
    superpowerExpanded: `What you make can be trusted.

Your steadiness translates into your objects. People who use what you create know it won't fail unexpectedly, won't have hidden flaws, won't require constant attention. Your craft has become reliable through repetition, and that reliability is now embedded in everything you make.

This makes you sought-after for work that matters. The gift that needs to last. The tool that needs to perform. The object that will be used daily for years. You make things worthy of that trust.`,

    blindSpot:
      'Your steady craft can become routine. The same reliable results can mean the same limited scope—you might stop growing because you\'ve become comfortable.',

    blindSpotExpanded: `Reliability can become limitation.

Your craft is steady, which means it's also somewhat predictable. The same hands that make reliable objects might be capable of making surprising ones—if you were willing to unsettle your practice. But your steadiness resists unsettling. It prefers the known.

There's also the question of whether reliability serves the work or just your comfort. Is your consistent approach the best approach, or just the familiar one? Steady makers sometimes need to disrupt themselves to keep growing.`,

    coreBeliefs: [
      'Reliable craft is built through steady practice',
      'Shortcuts create objects that can\'t be trusted',
      'What you make reflects how you make—be steady',
      'The best making is a practice, not a performance',
    ],

    howYouGotHere:
      'Your answers showed craft combined with steady, patient practice. You make reliably because you practice reliably. This maps to the Steady Maker.',

    alignsWith:
      'other Steady types—you share the orientation toward patient practice, toward craft built through repetition',
    tensionWith:
      'Bold types—their experimental making can seem undisciplined, producing unreliable objects',
    growsWith:
      'Assured types—they encourage you to trust your craft enough to take risks within it',

    books: [
      {
        title: 'All Systems Red',
        author: 'Wells',
        reason:
          'A security bot doing its job reliably, day after day. Craft as consistent protection.',
      },
      {
        title: 'Anathem',
        author: 'Stephenson',
        reason:
          'Monks maintaining knowledge through centuries of practice. Steady craft across generations.',
      },
      {
        title: 'The Sparrow',
        author: 'Russell',
        reason:
          'Years of preparation for a single mission. The reliability that earns trust.',
      },
    ],

    famousFigures: {
      real: ['Jiro Ono', 'Julia Child', 'LeVar Burton'],
      fictional: [
        'Remy (Ratatouille)',
        'Po (Kung Fu Panda)',
        'Wall-E',
      ],
    },
  },

  'grounded-maker': {
    key: 'grounded-maker',
    name: 'Grounded Maker',
    color: '#0c8f80',
    noun: 'maker',
    adjective: 'grounded',
    quadrant: 'settled-protective',

    utopia:
      'Their utopia has handmade objects in daily use. Making is woven into ordinary life.',

    description:
      "You make from connection to materials, traditions, and real use. Your grounded approach means what you create serves actual needs—objects that belong in people's lives, not just displays.",

    pull: 'toward embodied making',
    edge: 'you make things that fit naturally into living',
    oneSentence:
      'You make things that belong in daily life, grounded in real materials and real needs.',

    superpower: 'embodied craft',
    superpowerExpanded: `Your making is connected to the physical world.

You understand your materials, not just conceptually but through your hands. You know how wood wants to be worked, how clay responds to pressure, how ingredients combine. This grounded knowledge produces objects that feel right—that have weight and presence and fit naturally into physical life.

People value your grounded making because it produces things that actually work. Not impressive objects that are fragile in practice. Not clever designs that ignore material reality. Things that belong in hands, in homes, in daily use.`,

    blindSpot:
      'Your grounded approach can reject the abstract. Some making benefits from theoretical exploration, from working with ideas rather than just materials.',

    blindSpotExpanded: `Not all making needs to be grounded.

Your connection to materials and practical use serves you well—but some important making is speculative, abstract, disconnected from immediate use. Art that challenges rather than comforts. Objects that provoke rather than serve. Your groundedness can dismiss this work as ungrounded when it's actually differently grounded.

There's also the risk of parochialism. Grounded making can become making only for your local context, your familiar needs, your known materials. Expanding your ground—encountering different traditions, different uses, different materials—keeps grounded making alive.`,

    coreBeliefs: [
      'Good making requires good understanding of materials',
      'Objects should serve daily life, not just special occasions',
      'Groundedness in craft comes through hands, not just theory',
      'Making that ignores physical reality produces fragile objects',
    ],

    howYouGotHere:
      'Your answers showed making connected to materials and real use. You create things grounded in physical reality and daily needs. This maps to the Grounded Maker.',

    alignsWith:
      'other Grounded types—you share connection to practical reality, to making that serves actual needs',
    tensionWith:
      'Adaptive types—their experimental making can seem disconnected from material reality',
    growsWith:
      'Confident types—they encourage you to share your grounded craft more widely',

    books: [
      {
        title: 'Semiosis',
        author: 'Burke',
        reason:
          'Colonists learning to work with alien plants. Making that respects material reality.',
      },
      {
        title: 'The Word for World Is Forest',
        author: 'Le Guin',
        reason:
          'A people whose craft is woven into their ecosystem. Grounded making in harmony with place.',
      },
      {
        title: 'A Fire Upon the Deep',
        author: 'Vinge',
        reason:
          'Technologies that only work in certain zones. Understanding the material constraints of craft.',
      },
    ],

    famousFigures: {
      real: ['George Washington Carver', 'Martha Stewart', 'Hayao Miyazaki'],
      fictional: [
        'Mrs. Weasley (Harry Potter)',
        'Winnie the Pooh',
        'Carl Fredricksen (Up)',
      ],
    },
  },

  'anchored-maker': {
    key: 'anchored-maker',
    name: 'Anchored Maker',
    color: '#1aab98',
    noun: 'maker',
    adjective: 'anchored',
    quadrant: 'settled-protective',

    utopia:
      'Their utopia values objects that mean something. Making is always connected to purpose.',

    description:
      "You make with clear intention, each object anchored to a reason for existing. Your making isn't random—it serves purposes you've considered and decided matter.",

    pull: 'toward meaningful making',
    edge: 'you make things that carry intention into the world',
    oneSentence:
      'You make with purpose, ensuring that every object exists for a reason you\'ve thought through.',

    superpower: 'intentional craft',
    superpowerExpanded: `You know why you make what you make.

Every object you create is anchored to intention. You don't make impulsively; you make deliberately. This doesn't mean you plan everything in advance—craft still involves discovery—but your making has direction. What you create is connected to what you value.

This intentionality shows in your objects. They're not random accumulations of technique; they're coherent expressions of purpose. People can sense the intention embedded in what you make, even if they can't articulate it.`,

    blindSpot:
      'Your anchored making can dismiss the value of purposeless creation. Sometimes making without knowing why produces the most valuable discoveries.',

    blindSpotExpanded: `Intention isn't everything.

Your commitment to making with purpose can screen out valuable undirected exploration. Play, accident, purposeless experimentation—these produce insights that intentional making cannot. Your anchor is valuable, but so is occasionally pulling it up.

There's also the question of whose purposes your making serves. Anchored in your own intentions, you might miss purposes that others see in your work. Sometimes what you made for one reason turns out to matter for completely different reasons. Holding your anchor lightly allows for these discoveries.`,

    coreBeliefs: [
      'Making without purpose produces objects without meaning',
      'Intentional craft is more satisfying than random creation',
      'What you make should be anchored to what you value',
      'Purpose gives direction to craft',
    ],

    howYouGotHere:
      'Your answers showed making guided by clear intention. You create deliberately, with purpose underlying your craft. This maps to the Anchored Maker.',

    alignsWith:
      'other Anchored types—you share the quality of knowing your why, of making from clear purpose',
    tensionWith:
      'Open types—their purposeless making can seem like waste, like craft without direction',
    growsWith:
      'Curious types—they remind you that purpose sometimes emerges from exploration, not before it',

    books: [
      {
        title: 'The Dispossessed',
        author: 'Le Guin',
        reason:
          'An anarchist society where making serves collective purpose. Craft anchored to values.',
      },
      {
        title: 'Stories of Your Life and Others',
        author: 'Chiang',
        reason:
          'Each story explores purpose with crystalline clarity. Making that knows exactly what it\'s for.',
      },
      {
        title: 'Never Let Me Go',
        author: 'Ishiguro',
        reason:
          'Art-making as proof of humanity. Purpose revealed through what we choose to create.',
      },
    ],

    famousFigures: {
      real: ['William Morris', 'Georgia O\'Keeffe', 'Maira Kalman'],
      fictional: [
        'Belle (Beauty and the Beast)',
        'Rapunzel (Tangled)',
        'Gepetto (Pinocchio)',
      ],
    },
  },

  // =============================================================================
  // SHAPER identities (mid agency)
  // =============================================================================

  'steady-shaper': {
    key: 'steady-shaper',
    name: 'Steady Shaper',
    color: '#08665d',
    noun: 'shaper',
    adjective: 'steady',
    quadrant: 'settled-protective',

    utopia:
      'Their utopia evolves gradually. Change happens at the pace things can absorb.',

    description:
      "You reshape what exists with patient persistence, understanding that sustainable change requires working with systems, not against them. Your steadiness allows transformation to take root.",

    pull: 'toward sustainable change',
    edge: 'you shape things in ways that last because you don\'t rush',
    oneSentence:
      'You shape change that sticks, because you understand that lasting transformation requires patient work with existing systems.',

    superpower: 'gradual transformation',
    superpowerExpanded: `You change things at the pace they can handle.

Your shaping is sustainable because it works with the nature of what you're shaping. You don't force transformation faster than systems can absorb it. You don't demand change that creates backlash. Your steady approach means the changes you create actually persist.

This makes you effective where flashier changers fail. The organization that's tried rapid transformation and bounced back. The person who's resistant to pushy advice. The system that needs to evolve but breaks when pushed too hard. You can work with these because you understand that sustainable shaping requires sustainable pace.`,

    blindSpot:
      'Your steady pace can be too slow. Sometimes things need rapid reshaping, and your sustainable approach is unsustainably slow for the situation.',

    blindSpotExpanded: `Gradual isn't always appropriate.

Your commitment to sustainable change can become an excuse for insufficient change. Sometimes the building is on fire and gradual transformation isn't going to cut it. Your steady shaping is valuable in many contexts, but not all contexts.

There's also the question of what your steadiness enables. If the status quo is harmful, gradual change might just be prolonged harm. Your patient approach can serve preservation when what's needed is disruption. Learn to recognize when steadiness becomes complicity.`,

    coreBeliefs: [
      'Change that\'s too fast doesn\'t stick',
      'Working with systems is more effective than working against them',
      'Patience in shaping produces permanence in results',
      'Sustainable transformation requires sustainable pace',
    ],

    howYouGotHere:
      'Your answers showed willingness to transform what exists combined with patient, sustainable approach. You shape things at a pace they can absorb. This maps to the Steady Shaper.',

    alignsWith:
      'other Steady types—you share the orientation toward patient persistence, toward change that lasts because it wasn\'t rushed',
    tensionWith:
      'Bold types—their rapid transformation can seem disruptive, creating resistance that undoes the change',
    growsWith:
      'Confident types—they push you to trust your vision enough to move faster when needed',

    books: [
      {
        title: 'Parable of the Sower',
        author: 'Butler',
        reason:
          'Building a new belief system through steady practice. Change that grows at sustainable pace.',
      },
      {
        title: 'The Fifth Season',
        author: 'Jemisin',
        reason:
          'Societies shaped by slow geological forces. Transformation measured in epochs.',
      },
      {
        title: 'The Lathe of Heaven',
        author: 'Le Guin',
        reason:
          'A man whose dreams reshape reality learns the danger of sudden change. Caution as wisdom.',
      },
    ],

    famousFigures: {
      real: ['Mr. Rogers', 'Nelson Mandela', 'John Lewis'],
      fictional: [
        'Iroh (Avatar)',
        'Dumbledore (Harry Potter)',
        'Mufasa (The Lion King)',
      ],
    },
  },

  'grounded-shaper': {
    key: 'grounded-shaper',
    name: 'Grounded Shaper',
    color: '#0a7c70',
    noun: 'shaper',
    adjective: 'grounded',
    quadrant: 'settled-protective',

    utopia:
      'Their utopia improves on what it inherited. Nothing good is discarded lightly.',

    description:
      "You reshape from a position of deep understanding, knowing what you're working with before you change it. Your grounded approach means you transform things without losing what made them work.",

    pull: 'toward understanding before changing',
    edge: 'you shape without breaking what doesn\'t need breaking',
    oneSentence:
      'You shape things better by first understanding them deeply—because good transformation preserves what works.',

    superpower: 'informed transformation',
    superpowerExpanded: `You understand before you change.

Your grounded approach means you study what you're shaping. Why does it work the way it does? What would break if you changed this? What needs to be preserved even as other things transform? This understanding makes your shaping surgical rather than sledgehammer.

People trust you with things they value because you won't carelessly destroy what works. You respect what you're shaping, even as you reshape it. This makes you the right person for delicate transformations that need to preserve essential character.`,

    blindSpot:
      'Your grounded understanding can become resistance to necessary disruption. Sometimes things need to be broken, not carefully preserved.',

    blindSpotExpanded: `Understanding can become over-attachment.

The deeper you understand something, the more you see value in preserving it. But sometimes what you understand so well is precisely what needs to go. Your grounded knowledge can make you defender of things that have outlived their usefulness.

There's also the trap of endless understanding. You can always understand more before acting. At some point, your groundedness needs to enable action, not postpone it. The grounded shaper who never actually shapes isn't grounded—they're stuck.`,

    coreBeliefs: [
      'Understanding before changing produces better change',
      'What works should be preserved, not thoughtlessly disrupted',
      'Grounded shaping respects what it transforms',
      'Good transformation is surgical, not sledgehammer',
    ],

    howYouGotHere:
      'Your answers showed willingness to transform combined with deep attention to what you\'re working with. You shape from understanding, preserving what works. This maps to the Grounded Shaper.',

    alignsWith:
      'other Grounded types—you share the orientation toward understanding reality before acting on it',
    tensionWith:
      'Adaptive types—their rapid reshaping can seem careless, changing things without understanding them',
    growsWith:
      'Confident types—they push you to act on your understanding, not just accumulate it',

    books: [
      {
        title: 'Dune',
        author: 'Herbert',
        reason:
          'Paul studies Arrakis deeply before acting. Understanding the system before shaping it.',
      },
      {
        title: 'Kindred',
        author: 'Butler',
        reason:
          'Dana must understand the past to survive in it. Change requires knowing what you\'re working with.',
      },
      {
        title: 'The Years of Rice and Salt',
        author: 'Robinson',
        reason:
          'History reshaped across centuries. Understanding the long arc before intervening.',
      },
    ],

    famousFigures: {
      real: ['Barack Obama', 'Angela Merkel', 'Jacinda Ardern'],
      fictional: [
        'Jean-Luc Picard (Star Trek)',
        'Okoye (Black Panther)',
        'Gandalf (Lord of the Rings)',
      ],
    },
  },

  'anchored-shaper': {
    key: 'anchored-shaper',
    name: 'Anchored Shaper',
    color: '#159586',
    noun: 'shaper',
    adjective: 'anchored',
    quadrant: 'settled-protective',

    utopia:
      'Their utopia knows what matters. Change serves values that don\'t change.',

    description:
      "You reshape from clear values, with transformation always serving principles you've decided matter. Your anchor ensures that change serves purpose, not just novelty.",

    pull: 'toward values-driven change',
    edge: 'you shape things in service of principles that endure',
    oneSentence:
      'You shape change that serves enduring values, because transformation without principle is just churn.',

    superpower: 'principled transformation',
    superpowerExpanded: `Your shaping serves what you believe in.

Change for change's sake doesn't interest you. When you reshape something, it's because the transformation serves values you've thought through. This makes your shaping coherent—people can understand why you're changing what you're changing because your principles are visible.

This anchored approach builds trust. People know what you stand for, so they know what your shaping is trying to achieve. You're not unpredictable, not random. Your changes connect to something stable, which paradoxically makes change easier to accept.`,

    blindSpot:
      'Your anchored values can be wrong. Transformation in service of misguided principles produces misguided transformation.',

    blindSpotExpanded: `Principles can be prisons.

Your commitment to values-driven change assumes your values are correct. But values can be inherited without examination, can be appropriate in one context and harmful in another, can reflect the past more than the future. Your anchor might be holding you to principles worth abandoning.

There's also the trap of values-as-excuse. "I'm not changing this because of my principles" can be principled or can be resistance disguised as principle. The difference isn't always easy to see from inside. Regularly questioning your anchor is part of keeping it healthy.`,

    coreBeliefs: [
      'Change should serve values, not just happen',
      'Principled transformation builds trust',
      'Anchored shaping is coherent shaping',
      'What you won\'t change reveals what you believe',
    ],

    howYouGotHere:
      'Your answers showed willingness to transform combined with clear values guiding the transformation. You shape from principles you\'ve decided matter. This maps to the Anchored Shaper.',

    alignsWith:
      'other Anchored types—you share the quality of knowing what you stand for, of acting from clear principles',
    tensionWith:
      'Curious types—their exploratory shaping can seem unprincipled, changing things without clear values',
    growsWith:
      'Open types—they challenge you to examine whether your principles deserve the loyalty you give them',

    books: [
      {
        title: 'A Memory Called Empire',
        author: 'Martine',
        reason:
          'An ambassador anchored by her predecessor\'s values navigates empire. Principles that persist.',
      },
      {
        title: 'The Ones Who Walk Away from Omelas',
        author: 'Le Guin',
        reason:
          'Some refuse a prosperity built on suffering. Values as non-negotiable constraints.',
      },
      {
        title: 'Ursula K. Le Guin\'s Earthsea',
        author: 'Le Guin',
        reason:
          'A mage who understands that true power requires knowing what not to change.',
      },
    ],

    famousFigures: {
      real: ['Ruth Bader Ginsburg', 'Desmond Tutu', 'Brené Brown'],
      fictional: [
        'Wonder Woman',
        'Captain Picard (Star Trek)',
        'Marge Simpson (The Simpsons)',
      ],
    },
  },

  // =============================================================================
  // OBSERVER identities (mid-low agency)
  // =============================================================================

  'steady-observer': {
    key: 'steady-observer',
    name: 'Steady Observer',
    color: '#065750',
    noun: 'observer',
    adjective: 'steady',
    quadrant: 'settled-protective',

    utopia:
      'Their utopia has long memories. What was observed is not forgotten.',

    description:
      "You observe with patient persistence, watching long enough to see patterns that impatient observers miss. Your steady attention creates understanding that quick glances cannot achieve.",

    pull: 'toward accumulated watching',
    edge: 'you see what only patience reveals',
    oneSentence:
      'You watch steadily over time, seeing the patterns that emerge only for those willing to pay attention longer than is comfortable.',

    superpower: 'persistent attention',
    superpowerExpanded: `You stay watching when others move on.

Your steady observation accumulates into understanding. The changes that happen too slowly to notice in a week—you see them over months. The patterns that only emerge across seasons—you catch them because you're still watching. This persistence is rare and valuable.

People come to you for perspective that requires long attention. What's really happening with this slow-moving situation? What's the trajectory of this gradual change? You know, because you've been watching steadily while others checked in and checked out.`,

    blindSpot:
      'Your steady watching can become passive witness to things that need intervention. Sometimes observation should give way to action.',

    blindSpotExpanded: `Watching isn't always enough.

Your commitment to steady observation can become an excuse for not acting. You're still gathering information. You're still developing understanding. But at some point, what you've observed needs to produce something beyond more observation.

There's also the trap of neutrality. Steady observation positions you as outside the action, which can feel neutral but isn't. What you choose to watch, how long you watch, what you do with your observations—these are choices with consequences. Your steadiness is a stance, not an absence of stance.`,

    coreBeliefs: [
      'Patience in observation produces understanding that haste cannot',
      'Some patterns only emerge over long watching',
      'Steady attention is its own form of commitment',
      'What the persistent observer sees, the impatient observer misses',
    ],

    howYouGotHere:
      'Your answers showed observational orientation combined with steady patience. You watch over time, seeing what short attention cannot. This maps to the Steady Observer.',

    alignsWith:
      'other Steady types—you share the orientation toward patience, toward persistence that accumulates into understanding',
    tensionWith:
      'Bold types—their quick action can seem premature, moving before they\'ve watched long enough',
    growsWith:
      'Confident types—they push you to trust your observations enough to act on them',

    books: [
      {
        title: 'Solaris',
        author: 'Lem',
        reason:
          'Scientists observe an alien ocean for decades. Understanding requires patience beyond human timescales.',
      },
      {
        title: 'Rendezvous with Rama',
        author: 'Clarke',
        reason:
          'Explorers study an alien ship that reveals itself slowly. Observation measured in months.',
      },
      {
        title: 'The Word for World Is Forest',
        author: 'Le Guin',
        reason:
          'The Athsheans observe for generations before acting. Patience as cultural wisdom.',
      },
    ],

    famousFigures: {
      real: ['Jane Goodall', 'David Attenborough', 'Oliver Sacks'],
      fictional: [
        'Ents (Lord of the Rings)',
        'Yoda (Star Wars)',
        'The Lorax (Dr. Seuss)',
      ],
    },
  },

  'grounded-observer': {
    key: 'grounded-observer',
    name: 'Grounded Observer',
    color: '#086a62',
    noun: 'observer',
    adjective: 'grounded',
    quadrant: 'settled-protective',

    utopia:
      'Their utopia sees what\'s actually there. Perception is connected to reality.',

    description:
      "You observe with grounded attention, seeing what's actually present rather than what you expect or hope to see. Your observation is connected to reality, not filtered by wishful thinking.",

    pull: 'toward accurate perception',
    edge: 'you see what\'s really there, not what you want to see',
    oneSentence:
      'You observe with grounded accuracy, committed to seeing reality as it actually is.',

    superpower: 'realistic perception',
    superpowerExpanded: `You see things clearly.

Your grounded observation isn't distorted by what you want to be true or what you expect to find. You have the capacity to see unpleasant realities, surprising developments, and uncomfortable truths because you're more committed to accuracy than comfort.

This makes you valuable when clear-eyed assessment matters. The situation that needs honest evaluation, not cheerleading. The problem that needs to be seen clearly before it can be solved. You provide the grounded perception that decisions require.`,

    blindSpot:
      'Your realistic perception can become cynicism. Grounded observation that only sees problems misses possibilities.',

    blindSpotExpanded: `Reality includes more than limitations.

Your commitment to seeing what's actually there can bias you toward seeing obstacles more than opportunities. "Being realistic" can become code for "expecting the worst." Your grounded perception might accurately see problems while missing equally real possibilities.

There's also the question of what realism even is. Everyone's perception is partial and shaped. Your grounded observation feels objective to you, but it's still filtered through your experience, your expectations, your blind spots. True groundedness includes groundedness about your own limitations.`,

    coreBeliefs: [
      'Clear perception requires commitment to truth over comfort',
      'What you want to see and what is there are different questions',
      'Grounded observation serves reality, not wishful thinking',
      'Accurate seeing is the foundation of wise acting',
    ],

    howYouGotHere:
      'Your answers showed observational orientation combined with commitment to seeing accurately. You observe what\'s actually there, not what you want to see. This maps to the Grounded Observer.',

    alignsWith:
      'other Grounded types—you share commitment to reality, to seeing and working with what actually is',
    tensionWith:
      'Adaptive types—their optimistic seeing can seem like denial, perception shaped by hope rather than truth',
    growsWith:
      'Confident types—they help you see possibilities your realism might dismiss',

    books: [
      {
        title: 'Blindsight',
        author: 'Watts',
        reason:
          'Observers confront an alien intelligence that challenges every assumption. Perception stripped to essentials.',
      },
      {
        title: 'Arrival',
        author: 'Chiang',
        reason:
          'A linguist perceives alien time. Grounded observation that changes everything.',
      },
      {
        title: 'Contact',
        author: 'Sagan',
        reason:
          'Scientists verify an alien signal with rigorous observation. Truth requires grounded method.',
      },
    ],

    famousFigures: {
      real: ['Nate Silver', 'Annie Duke', 'Daniel Kahneman'],
      fictional: [
        'Spock (Star Trek)',
        'Hermione Granger (Harry Potter)',
        'Temperance Brennan (Bones)',
      ],
    },
  },

  'anchored-observer': {
    key: 'anchored-observer',
    name: 'Anchored Observer',
    color: '#108074',
    noun: 'observer',
    adjective: 'anchored',
    quadrant: 'settled-protective',

    utopia:
      'Their utopia knows what to look for. Observation serves purpose.',

    description:
      "You observe with clear purpose, watching for what matters rather than absorbing everything indiscriminately. Your anchored attention is directed observation, not random reception.",

    pull: 'toward purposeful watching',
    edge: 'you see what matters because you know what to look for',
    oneSentence:
      'You observe with anchored purpose, watching for what matters because you know what you\'re looking for.',

    superpower: 'directed attention',
    superpowerExpanded: `You know what you're watching for.

Your observation isn't passive absorption—it's active search. You have clear sense of what matters, and you direct your attention accordingly. This means you catch important things that undirected observers miss, because you're looking for them.

This anchored attention makes you efficient. In overwhelming environments where everything clamors for attention, you know what deserves it. Your clear sense of purpose cuts through noise to find signal.`,

    blindSpot:
      'Your directed attention can miss important surprises. What you\'re not looking for might be more important than what you are.',

    blindSpotExpanded: `Purpose can be a filter that removes the unexpected.

Your anchored observation sees what it's looking for—but what about the important things you're not looking for? Directed attention is efficient, but it can miss the surprising development, the unexpected pattern, the important thing that doesn't fit your categories.

There's also the question of who set your direction. Your sense of what matters came from somewhere. Is it still serving you, or are you observing through outdated priorities? Anchored observers need to occasionally lift their anchor and observe undirectedly, to check whether their direction still makes sense.`,

    coreBeliefs: [
      'Purposeful observation is more efficient than undirected reception',
      'Knowing what matters enables seeing what matters',
      'Anchored attention cuts through noise to find signal',
      'Direction should be chosen deliberately, not inherited carelessly',
    ],

    howYouGotHere:
      'Your answers showed observational orientation combined with clear sense of what matters. You watch with purpose, attention directed by values. This maps to the Anchored Observer.',

    alignsWith:
      'other Anchored types—you share the quality of knowing what matters, of directing energy according to values',
    tensionWith:
      'Open types—their undirected observation can seem inefficient, absorbing everything without purpose',
    growsWith:
      'Curious types—they remind you that sometimes not knowing what to look for reveals what directed attention misses',

    books: [
      {
        title: 'Speaker for the Dead',
        author: 'Card',
        reason:
          'A speaker observes lives with clear purpose: understanding enough to tell the truth.',
      },
      {
        title: 'The Left Hand of Darkness',
        author: 'Le Guin',
        reason:
          'An envoy observing alien culture for a specific diplomatic goal. Purposeful attention.',
      },
      {
        title: 'Embassytown',
        author: 'Miéville',
        reason:
          'Linguists observe alien communication patterns. Directed attention to solve a crisis.',
      },
    ],

    famousFigures: {
      real: ['Sherlock Holmes (Doyle)', 'Temple Grandin', 'Brené Brown'],
      fictional: [
        'Clarice Starling (Silence of the Lambs)',
        'Detective Loki (Prisoners)',
        'Shawn Spencer (Psych)',
      ],
    },
  },

  // =============================================================================
  // NOTICER identities (low agency)
  // =============================================================================

  'steady-noticer': {
    key: 'steady-noticer',
    name: 'Steady Noticer',
    color: '#054943',
    noun: 'noticer',
    adjective: 'steady',
    quadrant: 'settled-protective',

    utopia:
      'Their utopia pays attention to the small things. Nothing worth noticing is overlooked.',

    description:
      "You notice with patient steadiness, catching small things over time that hurried attention misses. Your noticing isn't flashy—it's the accumulated attention of someone who's been paying attention for a while.",

    pull: 'toward accumulated noticing',
    edge: 'you notice small things that add up to big understanding',
    oneSentence:
      'You notice steadily, catching small things over time that accumulate into understanding the hurried never achieve.',

    superpower: 'patient noticing',
    superpowerExpanded: `You catch small things over time.

Your steady noticing accumulates. The slight change that's invisible day to day but obvious month to month—you catch it. The pattern that only emerges across many instances—you notice it. This patient attention produces understanding that quick noticing cannot achieve.

People value your steady noticing because it reveals what's really happening beneath the surface. The slow drift, the gradual change, the emerging pattern—these only appear to attention that persists.`,

    blindSpot:
      'Your patient noticing can miss urgent signals. Some things demand immediate attention, and your steady pace can be too slow.',

    blindSpotExpanded: `Not everything can wait for patient noticing.

Your steady attention is valuable for slow-developing patterns, but some situations need fast recognition. The urgent signal that demands immediate response might not fit your patient approach. Learning when to accelerate your noticing is important.

There's also the question of action. Patient noticing can become permanent noticing—always accumulating more, never concluding anything. At some point, what you've noticed needs to lead somewhere. Steady noticing without eventual action is just steady watching.`,

    coreBeliefs: [
      'Small things add up to big things when you notice them long enough',
      'Patient attention reveals what hurried attention misses',
      'Accumulated noticing produces understanding',
      'The steady noticer catches what the impatient overlook',
    ],

    howYouGotHere:
      'Your answers showed attention to small things combined with patient persistence. You notice steadily over time, accumulating understanding. This maps to the Steady Noticer.',

    alignsWith:
      'other Steady types—you share the orientation toward patient persistence, toward attention that accumulates',
    tensionWith:
      'Bold types—their quick conclusions can seem hasty, deciding before they\'ve noticed enough',
    growsWith:
      'Confident types—they push you to trust your accumulated noticing enough to act on it',

    books: [
      {
        title: 'Annihilation',
        author: 'VanderMeer',
        reason:
          'A biologist notices details in Area X over weeks. Small observations that accumulate into dread.',
      },
      {
        title: 'The Long Way to a Small, Angry Planet',
        author: 'Chambers',
        reason:
          'A crew notices each other over months of travel. Small kindnesses that accumulate into family.',
      },
      {
        title: 'Piranesi',
        author: 'Clarke',
        reason:
          'Meticulous noticing of tides and statues. Patient attention that eventually reveals the truth.',
      },
    ],

    famousFigures: {
      real: ['Mary Oliver', 'Annie Dillard', 'Beatrix Potter'],
      fictional: [
        'Miss Marple (Agatha Christie)',
        'Amélie Poulain',
        'Paddington Bear',
      ],
    },
  },

  'grounded-noticer': {
    key: 'grounded-noticer',
    name: 'Grounded Noticer',
    color: '#065954',
    noun: 'noticer',
    adjective: 'grounded',
    quadrant: 'settled-protective',

    utopia:
      'Their utopia values the ordinary. Daily life is full of things worth noticing.',

    description:
      "You notice what's present in ordinary reality, attending to the texture of daily life that abstraction overlooks. Your grounded noticing finds significance in the everyday.",

    pull: 'toward the present moment',
    edge: 'you notice the extraordinary in the ordinary',
    oneSentence:
      'You notice what\'s actually present—the richness hidden in ordinary moments that distraction obscures.',

    superpower: 'present attention',
    superpowerExpanded: `You notice what's right here.

Your grounded attention doesn't need exotic stimuli—you find plenty to notice in ordinary reality. The quality of light at this moment. The particular way this person speaks. The texture of this day. Your noticing is rooted in what's present, not what's elsewhere or theoretical.

This grounded attention produces a different kind of richness. While others chase novelty, you find depth in the familiar. What you notice in daily life would escape most people because they're not present enough to catch it.`,

    blindSpot:
      'Your grounded noticing can become parochial. There are things worth noticing beyond your immediate environment.',

    blindSpotExpanded: `The present isn't everything.

Your attention to what's immediately present can limit what you notice. There are patterns that only emerge when you look beyond your local environment. There are realities that require abstract thinking to grasp. Your grounded noticing is valuable but incomplete.

There's also the risk of ordinary as comfort zone. You notice what's familiar because it's comfortable. But some important noticing requires discomfort, unfamiliarity, being somewhere that doesn't feel grounded. The grounded noticer sometimes needs to uproot.`,

    coreBeliefs: [
      'The ordinary is full of things worth noticing',
      'Presence reveals what distraction conceals',
      'Grounded attention finds richness in the everyday',
      'What\'s here deserves as much noticing as what\'s elsewhere',
    ],

    howYouGotHere:
      'Your answers showed attention to detail combined with connection to immediate reality. You notice what\'s present in ordinary life. This maps to the Grounded Noticer.',

    alignsWith:
      'other Grounded types—you share connection to immediate reality, to what\'s actually present',
    tensionWith:
      'Adaptive types—their attention to possibilities can seem disconnected from what\'s actually here',
    growsWith:
      'Confident types—they encourage you to trust your grounded noticing enough to share it',

    books: [
      {
        title: 'Borne',
        author: 'VanderMeer',
        reason:
          'A scavenger notices strange life in ruins. Finding wonder in the ordinary wreckage.',
      },
      {
        title: 'A Psalm for the Wild-Built',
        author: 'Chambers',
        reason:
          'A tea monk notices what people actually need. Present attention to immediate reality.',
      },
      {
        title: 'The Book of the New Sun',
        author: 'Wolfe',
        reason:
          'Severian notices everything but understands it slowly. Present details that accrue meaning.',
      },
    ],

    famousFigures: {
      real: ['Mary Oliver', 'Thich Nhat Hanh', 'Ross Gay'],
      fictional: [
        'Winnie the Pooh',
        'Anne Shirley (Anne of Green Gables)',
        'Ted Lasso',
      ],
    },
  },

  'anchored-noticer': {
    key: 'anchored-noticer',
    name: 'Anchored Noticer',
    color: '#0b6c64',
    noun: 'noticer',
    adjective: 'anchored',
    quadrant: 'settled-protective',

    utopia:
      'Their utopia knows what to value. Attention goes where it matters most.',

    description:
      "You notice what matters, with attention anchored to values you've decided are important. Your noticing isn't random—it's shaped by clear sense of what deserves attention.",

    pull: 'toward what matters',
    edge: 'you notice things others miss because you know what to look for',
    oneSentence:
      'You notice with anchored attention, catching what matters because you know what matters.',

    superpower: 'values-directed noticing',
    superpowerExpanded: `You notice what your values tell you to notice.

Your attention has direction. You've thought about what matters, and your noticing follows. This means you catch important things that randomly-noticing people miss, because you're specifically watching for them.

This anchored noticing makes you a reliable detector for what you care about. The small gesture that reveals character—you catch it. The subtle sign that something's wrong—you notice it. Your values have trained your attention.`,

    blindSpot:
      'Your anchored noticing can miss valuable surprises. What your values don\'t prioritize might still be worth noticing.',

    blindSpotExpanded: `Values can be blinders.

Your attention is shaped by your values, which means it's also limited by them. The important thing that doesn't fit your categories—you might miss it. The valuable surprise that your values didn't anticipate—your anchored attention might filter it out.

There's also the question of whose values are doing the anchoring. You inherited some of what you value. Are those inheritances still serving you? The anchored noticer needs to occasionally examine their anchor, to make sure it's worth being anchored to.`,

    coreBeliefs: [
      'Attention should serve what matters',
      'Values-directed noticing is more effective than random noticing',
      'Knowing what matters trains attention to catch it',
      'What you notice reveals what you value',
    ],

    howYouGotHere:
      'Your answers showed attention to detail combined with clear values. You notice what your values tell you matters. This maps to the Anchored Noticer.',

    alignsWith:
      'other Anchored types—you share the quality of directing attention according to values, of knowing what matters',
    tensionWith:
      'Open types—their undirected noticing can seem unfocused, missing what matters by attending to everything',
    growsWith:
      'Curious types—they remind you that sometimes not knowing what matters reveals important surprises',

    books: [
      {
        title: 'All the Light We Cannot See',
        author: 'Doerr',
        reason:
          'A blind girl notices what matters through radio. Attention directed by what she values.',
      },
      {
        title: 'The Giver',
        author: 'Lowry',
        reason:
          'Jonas notices what his society has hidden. Values determine what becomes visible.',
      },
      {
        title: 'Station Eleven',
        author: 'Mandel',
        reason:
          'Survivors notice what\'s worth preserving. Values as compass for attention.',
      },
    ],

    famousFigures: {
      real: ['Marie Kondo', 'Terry Gross', 'Krista Tippett'],
      fictional: [
        'Luna Lovegood (Harry Potter)',
        'Donkey (Shrek)',
        'Dory (Finding Nemo)',
      ],
    },
  },

  // =============================================================================
  // WITNESS identities (lowest agency)
  // =============================================================================

  'steady-witness': {
    key: 'steady-witness',
    name: 'Steady Witness',
    color: '#043b38',
    noun: 'witness',
    adjective: 'steady',
    quadrant: 'settled-protective',

    utopia:
      'Their utopia remembers everything worth remembering. Nothing important is lost.',

    description:
      "You stand still so others can find their way back. In a world obsessed with building and moving, you hold space. You notice what's actually happening while others rush past.",

    pull: 'toward holding space',
    edge: 'you witness with the steadiness that lets others find their way',
    oneSentence:
      'You witness steadily, providing the continuity of presence that lets others know they\'ve been seen.',

    superpower: 'presence that holds',
    superpowerExpanded: `Your steady presence anchors others.

In a world of transient attention, you stay. People know they can come back and find you still there, still witnessing. This continuity is rare and valuable. It provides the ground that people need when everything else is shifting.

Your witnessing accumulates into memory. What you've steadily seen, you remember. This makes you keeper of stories, holder of continuity, the person who knows what happened because you were there—and stayed there.`,

    blindSpot:
      'Your stillness can become stagnation. Witnessing without acting eventually becomes complicity.',

    blindSpotExpanded: `Presence has limits.

Your steady witnessing is valuable, but it can become an excuse for not doing. At some point, what you're witnessing requires more than presence—it requires action. The steady witness who never acts becomes the steady bystander.

There's also the cost of stillness to yourself. Always holding space for others, never moving—this can deplete without replenishing. The steady witness needs to be witnessed too, sometimes. Steadiness for others shouldn't mean stagnation for yourself.`,

    coreBeliefs: [
      'Presence is a gift that requires steadiness',
      'What is witnessed with constancy becomes memory that lasts',
      'Holding space is active work, not passive absence',
      'The steady witness serves continuity in a world of change',
    ],

    howYouGotHere:
      'Your answers showed deep presence combined with patient steadiness. You witness over time, providing continuity of attention that others lack. This maps to the Steady Witness.',

    alignsWith:
      'other Steady types—you share the orientation toward patient persistence, toward presence that accumulates',
    tensionWith:
      'Bold types—their constant action can seem like inability to be still, to simply witness',
    growsWith:
      'Confident types—they push you to trust your witnessing enough to sometimes share what you\'ve seen',

    books: [
      {
        title: 'A Canticle for Leibowitz',
        author: 'Miller',
        reason:
          'Monks witnessing humanity across centuries of rise and fall. Steady presence through cycles.',
      },
      {
        title: 'The Road',
        author: 'McCarthy',
        reason:
          'A father witnesses for his son through apocalypse. Presence as the last protection.',
      },
      {
        title: 'Never Let Me Go',
        author: 'Ishiguro',
        reason:
          'Students witness each other\'s fates with quiet constancy. Steady presence unto the end.',
      },
    ],

    famousFigures: {
      real: ['Elie Wiesel', 'Studs Terkel', 'Fred Rogers'],
      fictional: [
        'The Giving Tree (Silverstein)',
        'Samwise Gamgee (Lord of the Rings)',
        'Groot (Guardians of the Galaxy)',
      ],
    },
  },

  'grounded-witness': {
    key: 'grounded-witness',
    name: 'Grounded Witness',
    color: '#054a46',
    noun: 'witness',
    adjective: 'grounded',
    quadrant: 'settled-protective',

    utopia:
      'Their utopia has roots that go deep. Memory is connected to place.',

    description:
      "You witness from connection to place and community, your presence rooted in belonging. Your witnessing isn't abstract—it's grounded in the specific places and people you're present to.",

    pull: 'toward rooted presence',
    edge: 'you witness from belonging, not from distance',
    oneSentence:
      'You witness from grounded connection to place and community—your presence rooted, not floating.',

    superpower: 'rooted presence',
    superpowerExpanded: `Your witnessing comes from belonging.

You're not a detached observer—you're part of what you witness. Your presence is rooted in place, community, relationship. This groundedness gives your witnessing depth that detached observation cannot achieve. You witness from within, not from above.

This rooted presence provides anchoring for others. When people need someone who understands because they're part of the same fabric, you can be that person. Your witnessing is connected witnessing.`,

    blindSpot:
      'Your rooted witnessing can become parochial. There are important things to witness beyond your place and community.',

    blindSpotExpanded: `Rootedness can become limitation.

Your connection to specific place and community serves you well—but it can also limit what you witness. There are realities outside your roots that deserve attention. There are perspectives that rootedness obscures.

There's also the danger of insider blindness. Being part of what you witness means you share its blind spots. The grounded witness can miss what only outsiders can see. Sometimes witnessing requires the discomfort of being unrooted.`,

    coreBeliefs: [
      'Witnessing from belonging is deeper than witnessing from distance',
      'Roots ground presence in specific reality',
      'Connected witnessing serves community',
      'The grounded witness is part of what they witness',
    ],

    howYouGotHere:
      'Your answers showed presence combined with connection to place and community. You witness from belonging, rooted in specific context. This maps to the Grounded Witness.',

    alignsWith:
      'other Grounded types—you share connection to specific reality, to place and community',
    tensionWith:
      'Adaptive types—their mobility can seem rootless, witnessing without belonging',
    growsWith:
      'Confident types—they encourage you to share your rooted witnessing more widely',

    books: [
      {
        title: 'The Fifth Season',
        author: 'Jemisin',
        reason:
          'Orogenes rooted in community despite persecution. Witnessing from belonging even when belonging hurts.',
      },
      {
        title: 'Parable of the Sower',
        author: 'Butler',
        reason:
          'Lauren witnesses her community\'s destruction, then builds a new one. Roots that can be replanted.',
      },
      {
        title: 'Always Coming Home',
        author: 'Le Guin',
        reason:
          'The Kesh witness their valley across generations. Presence rooted in place.',
      },
    ],

    famousFigures: {
      real: ['Wendell Berry', 'Robin Wall Kimmerer', 'Bryan Stevenson'],
      fictional: [
        'The Old Man (Hemingway)',
        'Atticus Finch (To Kill a Mockingbird)',
        'Gran (Moana)',
      ],
    },
  },

  'anchored-witness': {
    key: 'anchored-witness',
    name: 'Anchored Witness',
    color: '#085a56',
    noun: 'witness',
    adjective: 'anchored',
    quadrant: 'settled-protective',

    utopia:
      'Their utopia knows what matters enough to witness. Attention goes where it\'s needed most.',

    description:
      "You witness with purpose, your presence anchored to what you've decided deserves your attention. Your witnessing isn't random—it's directed by values toward what matters.",

    pull: 'toward purposeful presence',
    edge: 'you witness what needs witnessing because you know what matters',
    oneSentence:
      'You witness with anchored purpose, present to what needs your attention because you know what deserves it.',

    superpower: 'purposeful witnessing',
    superpowerExpanded: `You know what deserves your witness.

Your presence has direction. Not everything needs witnessing, and you don't pretend otherwise. You've thought about what matters, and your witnessing follows. This means your presence goes where it's most needed.

This anchored witnessing produces clarity about priorities. When everything clamors for attention, you know what deserves yours. Your purposeful presence is efficient, directed, meaningful—not scattered or random.`,

    blindSpot:
      'Your purposeful witnessing can miss important surprises. What you\'ve decided doesn\'t matter might still deserve your presence.',

    blindSpotExpanded: `Purpose can be a filter.

Your anchored approach means you witness what fits your values—but what about the important things that don't fit? The surprise that deserves presence you didn't plan to give. The reality that matters but not according to your current priorities.

There's also the danger of withholding witness. "That doesn't deserve my attention" can be principled discernment or can be convenient dismissal. The anchored witness needs to examine whether their anchor is serving or limiting.`,

    coreBeliefs: [
      'Purposeful witnessing directs presence where it matters',
      'Not everything deserves attention—discernment is required',
      'Anchored presence is meaningful presence',
      'What you witness reveals what you value',
    ],

    howYouGotHere:
      'Your answers showed presence combined with clear values about what deserves attention. You witness purposefully, directed by principles. This maps to the Anchored Witness.',

    alignsWith:
      'other Anchored types—you share the quality of directing energy according to values, of knowing what deserves attention',
    tensionWith:
      'Open types—their undirected witnessing can seem unfocused, present to everything and therefore nothing',
    growsWith:
      'Curious types—they remind you that sometimes what needs witnessing surprises you',

    books: [
      {
        title: 'The Sparrow',
        author: 'Russell',
        reason:
          'A priest witnesses alien culture to understand God\'s purpose. Presence directed by faith.',
      },
      {
        title: 'Speaker for the Dead',
        author: 'Card',
        reason:
          'A speaker witnesses lives purposefully: to tell truth about the dead. Anchored presence.',
      },
      {
        title: 'The Left Hand of Darkness',
        author: 'Le Guin',
        reason:
          'Genly Ai witnesses Gethen for the Ekumen. Purposeful presence in service of understanding.',
      },
    ],

    famousFigures: {
      real: ['Desmond Tutu', 'Archbishop Oscar Romero', 'John Lewis'],
      fictional: [
        'The Ghost of Christmas Past (A Christmas Carol)',
        'Rafiki (The Lion King)',
        'The Oracle (The Matrix)',
      ],
    },
  },
}
