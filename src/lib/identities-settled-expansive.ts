/**
 * Settled + Expansive Quadrant Identities (21 total)
 *
 * Quadrant characteristics:
 * - High certainty + growth orientation
 * - Confident, risk-tolerant, forward-moving
 * - Adjectives: Confident (most extreme), Assured (middle), Bold (mildest)
 *
 * 7 nouns x 3 adjectives = 21 identities
 */

import type { Identity } from './identities'

export const settledExpansiveIdentities: Record<string, Identity> = {
  // =============================================================================
  // ARCHITECT identities (highest agency)
  // =============================================================================

  'confident-architect': {
    key: 'confident-architect',
    name: 'Confident Architect',
    color: '#ea580c',
    noun: 'architect',
    adjective: 'confident',
    quadrant: 'settled-expansive',

    utopia:
      'Their utopia has a master plan, but the master plan knows how to evolve.',

    description:
      "You design systems with the certainty that comes from deep experience. You've seen enough to know what works, and you build accordingly. Your confidence isn't arrogance—it's the quiet assurance of someone who has thought this through.",

    pull: 'toward lasting structure',
    edge: 'you design what others only imagine',
    oneSentence:
      "You build cathedrals of thought and systems, knowing they'll outlast you—and that's exactly the point.",

    superpower: 'visionary certainty',
    superpowerExpanded: `You see the whole board. While others are solving immediate problems, you're designing systems that will handle problems that haven't emerged yet.

This isn't fortune-telling—it's pattern recognition refined over years. You've built enough, seen enough fail, watched enough succeed to develop an instinct for structural integrity. When you say "this will work," people believe you. And you're usually right.

Your gift is making the complex feel inevitable. You take chaotic requirements and produce elegant architecture. You see how pieces fit together before they're built. This confidence attracts collaborators who want to build something that will last.`,

    blindSpot:
      "Your vision can become a cage. When you're certain about the destination, you can miss better routes that emerge along the way.",

    blindSpotExpanded: `The same confidence that makes you effective can make you rigid.

You've thought this through. You have good reasons. So when someone suggests a different approach, your instinct is to explain why you're right rather than genuinely consider alternatives. Your certainty feels earned—because it is—but earned certainty can still be wrong.

Watch for the moment when your architectural vision becomes doctrine. The junior developer who sees a simpler solution, the user who needs something you didn't anticipate—their input matters. Your confidence is an asset, but only if it includes confidence in your ability to revise.`,

    coreBeliefs: [
      'Good architecture anticipates change without predicting it',
      'Certainty enables speed; doubt enables wisdom—you need both',
      "The best systems feel obvious in retrospect because they're right",
      'Leadership means being confident enough to commit and humble enough to adapt',
    ],

    howYouGotHere:
      "Your answers revealed someone who has arrived somewhere—you have convictions, and you're ready to build on them. You're not wandering; you're expanding from solid ground. This combination of settled certainty and forward momentum, paired with high agency and systems thinking, maps to the Confident Architect.",

    alignsWith:
      "other Settled types—you share a sense of knowing your position, of having worked through the fundamental questions and arrived at answers you trust",
    tensionWith:
      "Seeking types—their constant questioning can feel like inability to commit, like they're still solving problems you resolved years ago",
    growsWith:
      'Protective types—they force you to consider what could break, to build in resilience you might otherwise skip',

    books: [
      {
        title: 'A Pattern Language',
        author: 'Alexander',
        reason:
          'Architecture as accumulated wisdom. Patterns that work because generations tested them.',
      },
      {
        title: 'Foundation',
        author: 'Asimov',
        reason:
          "Psychohistory as ultimate architecture—designing systems that shape civilizations across millennia.",
      },
      {
        title: 'The Design of Everyday Things',
        author: 'Norman',
        reason:
          'Why confident design requires understanding users. Architecture that serves rather than impresses.',
      },
    ],

    famousFigures: {
      real: ['I.M. Pei', 'Elon Musk', 'Jane Jacobs'],
      fictional: [
        'Hari Seldon (Foundation)',
        'The Architect (Matrix)',
        'Ozymandias (Watchmen)',
      ],
    },
  },

  'assured-architect': {
    key: 'assured-architect',
    name: 'Assured Architect',
    color: '#f97316',
    noun: 'architect',
    adjective: 'assured',
    quadrant: 'settled-expansive',

    utopia:
      "Their utopia has great bones. The details can change, but the structure is sound.",

    description:
      "You design from a place of grounded confidence. You know what you know, you know what you don't know, and you build accordingly. Your assurance comes not from certainty about everything, but from clarity about what matters.",

    pull: 'toward elegant systems',
    edge: 'you create frameworks others can build on',
    oneSentence:
      'You design systems that others can inhabit, knowing that good architecture invites collaboration rather than demanding compliance.',

    superpower: 'structural clarity',
    superpowerExpanded: `You have a gift for finding the essential structure within complexity.

Where others see a mess of requirements, you see an underlying logic waiting to be expressed. You don't impose order—you discover it. This makes your architectures feel natural, inevitable, like they were always there waiting to be found.

This assurance allows you to make decisions without agonizing. You've developed taste through experience, and you trust it. When the team is paralyzed by options, you can see which choice opens doors and which closes them. Your confidence is contagious.`,

    blindSpot:
      'Your clarity can become rigidity. Sometimes the messy, inelegant solution is what the situation actually needs.',

    blindSpotExpanded: `You value elegance, and this serves you well—until it doesn't.

Not every system needs to be beautiful. Sometimes the ugly hack that ships next week beats the elegant solution that ships next quarter. Your assured sense of "the right way" can become a bottleneck when speed matters more than architecture.

And your clarity can intimidate. The junior developer who has a vague intuition that something's wrong may not speak up because they can't articulate it as cleanly as you articulate your vision. Create space for messy objections—they sometimes contain wisdom.`,

    coreBeliefs: [
      'Complexity should be managed, not embraced',
      'Good architecture is discovered, not invented',
      'Your first job is to understand, your second job is to simplify',
      'Every decision forecloses some possibilities and opens others—choose wisely',
    ],

    howYouGotHere:
      'Your answers showed a comfortable certainty about your approach to the world. You make decisions with clarity rather than anxiety. Combined with your systems-level thinking and high agency, this maps to the Assured Architect.',

    alignsWith:
      'other Architects and Builders—you share the drive to create lasting things, to leave systems better than you found them',
    tensionWith:
      "Witnesses and Noticers—their receptive stance can feel like passivity, like they're waiting for someone else to build",
    growsWith:
      "Seekers of all types—their questions prevent your assurance from calcifying into dogma",

    books: [
      {
        title: 'Thinking in Systems',
        author: 'Meadows',
        reason:
          'Systems thinking as a discipline. Understanding leverage points and feedback loops.',
      },
      {
        title: 'The Timeless Way of Building',
        author: 'Alexander',
        reason:
          'Architecture that emerges from deep understanding rather than surface cleverness.',
      },
      {
        title: 'Dune',
        author: 'Herbert',
        reason:
          'Nested systems—ecology, politics, religion, genetics—all designed, all interacting.',
      },
    ],

    famousFigures: {
      real: ['Buckminster Fuller', 'Christopher Alexander', 'Ada Lovelace'],
      fictional: [
        'Gandalf (Lord of the Rings)',
        'Professor X (X-Men)',
        'Vision (Marvel)',
      ],
    },
  },

  'bold-architect': {
    key: 'bold-architect',
    name: 'Bold Architect',
    color: '#fb923c',
    noun: 'architect',
    adjective: 'bold',
    quadrant: 'settled-expansive',

    utopia:
      "Their utopia breaks its own rules when it needs to. Structure serves life, not the reverse.",

    description:
      "You design ambitiously, willing to challenge conventions when they no longer serve. Your boldness isn't recklessness—it's the willingness to imagine systems that don't exist yet and then build them.",

    pull: 'toward unbuilt futures',
    edge: 'you design what consensus says is impossible',
    oneSentence:
      "You architect possibilities that others haven't imagined, trusting that bold design creates its own path to existence.",

    superpower: 'visionary design',
    superpowerExpanded: `You see possibilities that others dismiss as impractical.

Where conventional architects work within constraints, you question the constraints themselves. Why does it have to be this way? What if we started from different assumptions? This doesn't mean you ignore reality—you just have a more expansive sense of what reality permits.

This makes you invaluable when the old approaches are failing. You're not afraid to propose the architectural equivalent of "blow it up and start over" when that's what's needed. Your boldness creates permission for others to think bigger.`,

    blindSpot:
      "Your ambition can outrun your resources. Not every bold vision can be built with the team and timeline you have.",

    blindSpotExpanded: `Bold design requires bold execution, and you don't always have that.

You can see a magnificent system, specify it in detail, and still fail because the team can't build it, the timeline won't support it, or the organization won't fund it. Your vision is real, but so are these constraints.

There's also the question of incrementalism. Sometimes the boring approach—small improvements compounding over time—beats the revolutionary redesign. Your boldness can make you impatient with approaches that work but lack drama. Watch for that pattern.`,

    coreBeliefs: [
      "Constraints are real but not always permanent—question them",
      "Bold design creates its own momentum; timid design dies in committee",
      "The best architecture changes what people think is possible",
      "You honor the past by building a future worthy of it",
    ],

    howYouGotHere:
      'Your answers revealed someone willing to take risks from a position of confidence. You have convictions, and you want to expand what those convictions can accomplish. This forward-moving, architecturally-minded energy maps to the Bold Architect.',

    alignsWith:
      'other Expansive types—you share the orientation toward growth, toward building out rather than fortifying in',
    tensionWith:
      "Protective types—their focus on preservation can feel like they're guarding the past at the expense of the future",
    growsWith:
      "Cautious and Careful types—they force you to stress-test your bold visions, ensuring they're robust and not just exciting",

    books: [
      {
        title: 'The Fountainhead',
        author: 'Rand',
        reason:
          'Artistic vision vs. convention. The cost and necessity of architectural integrity.',
      },
      {
        title: 'Childhood\'s End',
        author: 'Clarke',
        reason:
          'Civilizational architecture. What happens when you design not buildings but futures.',
      },
      {
        title: 'The Power Broker',
        author: 'Caro',
        reason:
          'How vision becomes reality—and what it costs. The machinery behind bold architecture.',
      },
    ],

    famousFigures: {
      real: ['Zaha Hadid', 'Frank Lloyd Wright', 'Nikola Tesla'],
      fictional: [
        'Tony Stark (Iron Man)',
        'Elrond (Lord of the Rings)',
        'Emperor Palpatine (Star Wars)',
      ],
    },
  },

  // =============================================================================
  // BUILDER identities (high agency)
  // =============================================================================

  'confident-builder': {
    key: 'confident-builder',
    name: 'Confident Builder',
    color: '#dc5208',
    noun: 'builder',
    adjective: 'confident',
    quadrant: 'settled-expansive',

    utopia:
      'Their utopia has shipped. It exists in the world, not just in plans.',

    description:
      "You build with conviction. While others plan and discuss, you create. Your confidence comes from having finished things—you know what it takes to go from idea to reality, and you're willing to do that work.",

    pull: 'toward completion',
    edge: 'you make real what others only discuss',
    oneSentence:
      'You build because building is how you think, and your confidence comes from having done it enough to trust your hands.',

    superpower: 'shipping',
    superpowerExpanded: `You finish things. In a world full of half-built projects and abandoned ideas, this is rarer and more valuable than it sounds.

Your confidence isn't theoretical—it's built on the accumulated experience of having made things work. You've shipped the buggy version and fixed it live. You've cut scope when you had to and apologized when you were wrong. You know what "done" actually requires.

This makes you invaluable in environments paralyzed by analysis. You ask: what would it take to have something working by Friday? And then you do that. Not perfect, but real. Your bias toward shipping creates momentum that planning never can.`,

    blindSpot:
      'Your drive to ship can become impatience with necessary preparation. Sometimes the foundation matters more than the timeline.',

    blindSpotExpanded: `"Move fast and break things" has costs you sometimes underestimate.

Your confidence that you can fix problems later is usually justified, but not always. Some decisions are hard to reverse. Some technical debt compounds faster than you expect. Your shipping momentum can create cleanup work that slows you down more than careful planning would have.

There's also a people dimension. Your confidence can feel like steamrolling to teammates who want more deliberation. Creating space for their concerns—even when you're pretty sure you're right—builds the trust that lets you move fast later.`,

    coreBeliefs: [
      'The gap between theory and practice is always bigger than theorists expect',
      'Done is better than perfect, but done poorly is worse than not done',
      "Confidence comes from reps—you have to build things to become a builder",
      'The only way to know if it works is to ship it and find out',
    ],

    howYouGotHere:
      'Your answers revealed a hands-on, action-oriented approach combined with settled convictions. You know what you believe, and you express those beliefs through building. This maps to the Confident Builder.',

    alignsWith:
      'other Builders and Makers—you share the orientation toward creating tangible things, toward engaging with reality rather than just thinking about it',
    tensionWith:
      "Observers and Witnesses—their watching can feel like criticism from the sidelines, judgment without skin in the game",
    growsWith:
      "Seeking types—their questions force you to articulate why you're building what you're building, which makes your building better",

    books: [
      {
        title: 'The Mom Test',
        author: 'Fitzpatrick',
        reason:
          "Building things people actually want. Confidence grounded in evidence.",
      },
      {
        title: 'Shoe Dog',
        author: 'Knight',
        reason:
          "Building Nike one crisis at a time. The reality behind confident building.",
      },
      {
        title: 'The Martian',
        author: 'Weir',
        reason:
          "Problem-solving as survival. Confidence under pressure, one build at a time.",
      },
    ],

    famousFigures: {
      real: ['Phil Knight', 'Sara Blakely', 'Shigeru Miyamoto'],
      fictional: [
        'Mark Watney (The Martian)',
        'Kaylee Frye (Firefly)',
        'Lucius Fox (Batman)',
      ],
    },
  },

  'assured-builder': {
    key: 'assured-builder',
    name: 'Assured Builder',
    color: '#ed6c0c',
    noun: 'builder',
    adjective: 'assured',
    quadrant: 'settled-expansive',

    utopia:
      'Their utopia is maintained by the people who live there. Building never stops.',

    description:
      "You build from a place of grounded competence. You've done this enough to know your craft, and that knowledge gives you the assurance to take on ambitious projects without unnecessary anxiety.",

    pull: 'toward crafted excellence',
    edge: 'you build with the calm of someone who knows their tools',
    oneSentence:
      'You approach building with the quiet assurance of a craftsperson who has made enough things to trust the process.',

    superpower: 'sustainable momentum',
    superpowerExpanded: `You build at a pace you can maintain.

Unlike the sprinter who burns out or the perfectionist who never finishes, you've found a rhythm. You know when to push and when to rest. You can estimate with reasonable accuracy because you've calibrated your sense of how long things take.

This makes you reliable in ways that flashier builders aren't. The project that needs steady progress for six months? You can do that. The team that needs someone who'll still be productive after the initial excitement fades? You're that person. Your assurance comes from sustainable practice, not adrenaline.`,

    blindSpot:
      'Your sustainable pace can become a ceiling. Sometimes the situation demands a sprint, and your rhythm becomes a limitation.',

    blindSpotExpanded: `You've found your pace, and it's tempting to treat it as the correct pace.

But not every project fits your rhythm. Sometimes the market window is closing and you need to build faster than is comfortable. Sometimes the team is on fire with enthusiasm and your steady pace feels like dragging. The assurance that keeps you from burning out can also keep you from rising to moments that demand more.

There's also the question of ambition. Your sustainable approach builds reliably but perhaps not ambitiously. The assured builder ships—but are you shipping things worthy of your capability? Comfort isn't the same as excellence.`,

    coreBeliefs: [
      'Sustainable pace beats heroic sprints over any meaningful timeframe',
      'Competence is built through repetition, not revelation',
      "Quality is a habit, not an act",
      'The best builders know their limitations and work within them',
    ],

    howYouGotHere:
      'Your answers showed a grounded, competent approach to action. You build, but you build from a position of calm assurance rather than anxious proving. This steady, capable energy maps to the Assured Builder.',

    alignsWith:
      'other Settled types—you share the quality of having arrived somewhere, of building from established ground rather than searching for ground',
    tensionWith:
      'Adaptive and Curious types—their constant experimentation can feel scattered, like building and rebuilding without ever settling',
    growsWith:
      "Bold types—they push you toward ambition you might not reach on your own, reminding you that sustainable doesn't have to mean conservative",

    books: [
      {
        title: 'Shop Class as Soulcraft',
        author: 'Crawford',
        reason:
          'The dignity of building. Competence as a form of knowledge and self-respect.',
      },
      {
        title: 'Deep Work',
        author: 'Newport',
        reason:
          'Sustained, focused building. The practices that make quality possible.',
      },
      {
        title: 'The Craftsman',
        author: 'Sennett',
        reason:
          'Building as a human activity across history. The ethics of making things well.',
      },
    ],

    famousFigures: {
      real: ['Jiro Ono', 'James Dyson', 'Ina Garten'],
      fictional: [
        'Samwise Gamgee (LOTR)',
        'Bob the Builder',
        'Hephaestus (Greek myth)',
      ],
    },
  },

  'bold-builder': {
    key: 'bold-builder',
    name: 'Bold Builder',
    color: '#f08030',
    noun: 'builder',
    adjective: 'bold',
    quadrant: 'settled-expansive',

    utopia:
      'Their utopia was built by people who ignored the critics. It exists because someone tried.',

    description:
      "You build ambitious things, undeterred by skepticism. Your boldness isn't naivety—you know the odds—but you build anyway, because things that matter usually require someone willing to try before success is guaranteed.",

    pull: 'toward the untried',
    edge: "you build what skeptics say won't work",
    oneSentence:
      "You build the things everyone says can't be built, and you're right often enough to keep proving them wrong.",

    superpower: 'fearless making',
    superpowerExpanded: `You attempt things that sensible people avoid.

Not because you don't understand the risks—you do—but because you understand something else: most of the interesting things in the world exist because someone was willing to try before success was assured. You're willing to be that someone.

This makes you a catalyst for projects that need activation energy. The idea that's been discussed for years but never attempted? You start it. The problem everyone agrees is important but no one wants to tackle? You tackle it. Your boldness creates permission structures for others to join.`,

    blindSpot:
      'Your boldness can become recklessness. The line between ambitious and foolhardy is real, even if you prefer to ignore it.',

    blindSpotExpanded: `Not every skeptic is wrong. Not every risk is worth taking.

Your willingness to ignore criticism is a feature when the critics are merely conventional. But sometimes they're seeing real problems you're minimizing. Your boldness can become a filter that admits only encouraging information while dismissing warning signs as negativity.

There's also a cost to those around you. Bold building often requires others to take risks alongside you—teammates, investors, family. Your comfort with uncertainty doesn't automatically transfer to them. Being bold with your own resources is different from being bold with shared resources.`,

    coreBeliefs: [
      "The biggest risk is often not trying",
      "Critics are usually right about small things and wrong about big things",
      'Someone has to go first—might as well be you',
      'Fortune favors the bold, but so does learning from failure',
    ],

    howYouGotHere:
      'Your answers showed willingness to take action even under uncertainty, combined with settled convictions about what matters. You build toward your beliefs, undeterred by doubt. This maps to the Bold Builder.',

    alignsWith:
      "other Expansive types—you share the orientation toward growth and forward movement, the belief that building out beats fortifying in",
    tensionWith:
      "Careful and Cautious types—their risk assessment can feel like rationalized fear, reasons to not try disguised as wisdom",
    growsWith:
      'Protective types—their concern for what could go wrong, when you actually listen to it, helps you build things that last',

    books: [
      {
        title: 'The Hard Thing About Hard Things',
        author: 'Horowitz',
        reason:
          'Building under impossible circumstances. When boldness meets brutal reality.',
      },
      {
        title: 'Endurance',
        author: 'Lansing',
        reason:
          "Shackleton's expedition as a case study in bold leadership when everything goes wrong.",
      },
      {
        title: 'Creativity, Inc.',
        author: 'Catmull',
        reason:
          'Building Pixar required boldness sustained over decades. The long game of creative ambition.',
      },
    ],

    famousFigures: {
      real: ['Ernest Shackleton', 'Richard Branson', 'Madam C.J. Walker'],
      fictional: [
        'Captain Kirk (Star Trek)',
        'Han Solo (Star Wars)',
        'Rocket Raccoon (Guardians)',
      ],
    },
  },

  // =============================================================================
  // MAKER identities (mid-high agency)
  // =============================================================================

  'confident-maker': {
    key: 'confident-maker',
    name: 'Confident Maker',
    color: '#c94507',
    noun: 'maker',
    adjective: 'confident',
    quadrant: 'settled-expansive',

    utopia:
      'Their utopia was made by hand, one piece at a time. Every object tells a story.',

    description:
      "You make with the confidence of someone who knows their craft. Your hands have learned what your mind once theorized, and that embodied knowledge gives you an assurance that no instruction manual can provide.",

    pull: 'toward the handmade',
    edge: 'you create with the certainty of practiced skill',
    oneSentence:
      'You make things with confidence because you have made enough things to know what you are doing.',

    superpower: 'craft certainty',
    superpowerExpanded: `Your confidence lives in your hands.

You've made enough things enough times that your body knows the work. The way the material feels when it's ready. The subtle shift that indicates a problem before it becomes visible. This isn't conscious knowledge—it's accumulated through repetition until it became instinct.

This embodied certainty allows you to teach, mentor, and lead other makers. You can look at someone's work and immediately see where they've gone wrong, because you made those same mistakes and learned from them. Your confidence is contagious and specific.`,

    blindSpot:
      'Your craft certainty can become craft conservatism. New methods and materials might offer something your experienced hands haven\'t learned yet.',

    blindSpotExpanded: `You know what works because you've done it. But what if something works better?

The confident maker can become resistant to innovation. Your established techniques feel right, and new approaches feel awkward. But awkward isn't wrong—it's just unfamiliar. The methods that feel confident now once felt awkward too, before you'd practiced them enough.

There's also the question of whether your confidence serves the work or your ego. When a younger maker suggests a different approach, do you genuinely evaluate it, or do you dismiss it because it challenges your expertise? Confidence should enable learning, not prevent it.`,

    coreBeliefs: [
      'Knowledge lives in the hands as much as the mind',
      'Quality is the result of discipline, not inspiration',
      'Every material has its nature—the maker learns to work with it, not against it',
      'The confidence to make comes from having made',
    ],

    howYouGotHere:
      'Your answers showed hands-on engagement with the world combined with settled certainty about your approach. You make things, and you make them with the confidence of practiced skill. This maps to the Confident Maker.',

    alignsWith:
      'other Makers and Builders—you share the orientation toward creating tangible things, the belief that real work produces real objects',
    tensionWith:
      "Architects—their systems thinking can feel abstract compared to the concrete reality of making",
    growsWith:
      'Seekers—their questioning prevents your craft from becoming rigid tradition, keeping your making alive and evolving',

    books: [
      {
        title: 'Zen and the Art of Motorcycle Maintenance',
        author: 'Pirsig',
        reason:
          'Quality as a way of engaging with making. The philosophy behind craft confidence.',
      },
      {
        title: 'The Craftsman',
        author: 'Sennett',
        reason:
          'Making as a human activity through history. What craft teaches us about living.',
      },
      {
        title: 'The Taste of Country Cooking',
        author: 'Lewis',
        reason:
          'Edna Lewis making with absolute confidence in her tradition. Craft as heritage.',
      },
    ],

    famousFigures: {
      real: ['Edna Lewis', 'George Nakashima', 'Issey Miyake'],
      fictional: [
        'Remy (Ratatouille)',
        'Hatori Hanzo (Kill Bill)',
        'Melisandre (Game of Thrones)',
      ],
    },
  },

  'assured-maker': {
    key: 'assured-maker',
    name: 'Assured Maker',
    color: '#d95a12',
    noun: 'maker',
    adjective: 'assured',
    quadrant: 'settled-expansive',

    utopia:
      'Their utopia values the well-made over the mass-produced. Quality over quantity, always.',

    description:
      "You make with quiet competence. Your assurance doesn't announce itself—it shows in the work. People who use what you make discover the care embedded in every detail.",

    pull: 'toward quality details',
    edge: 'you create with the assurance of someone who knows the work matters',
    oneSentence:
      'You make things with the quiet assurance that comes from caring about details others overlook.',

    superpower: 'quality consciousness',
    superpowerExpanded: `You notice what could be better, and you fix it.

This isn't perfectionism—you know when to ship. But within the scope of what you're making, you attend to quality in a way that many people don't. The seam that nobody sees. The interaction that only happens rarely. The edge case that most users will never encounter. You care about these things because the work deserves care.

This makes what you make reliable. People trust objects and systems you've touched because they've learned that you handle the details. Your assurance is quiet, but it's embedded in everything you produce.`,

    blindSpot:
      'Your quality consciousness can become a bottleneck. Sometimes "good enough" really is good enough, and your standards slow things down.',

    blindSpotExpanded: `Not everything deserves your full care.

The prototype that's just testing an idea, the temporary solution that will be replaced next month, the low-stakes feature that few will use—these might not need the quality consciousness you automatically apply. Your assured approach to making doesn't have a dimmer switch, and that can be inefficient.

There's also a communication challenge. When your assurance is quiet, others might not understand why things take the time they do. Making your care visible—explaining what you're doing and why—helps people appreciate the quality rather than just wondering why it's taking so long.`,

    coreBeliefs: [
      'Quality is care made visible',
      'The details matter, even when no one notices—especially then',
      'Good work speaks for itself, but sometimes it needs an introduction',
      'Assurance comes from having standards and meeting them',
    ],

    howYouGotHere:
      'Your answers showed someone who engages with making from a place of grounded competence. You care about quality without being anxious about it. This settled, craft-oriented energy maps to the Assured Maker.',

    alignsWith:
      "other Assured types—you share the quality of grounded confidence, of knowing what you're doing without needing to prove it",
    tensionWith:
      'Bold types—their speed and risk tolerance can feel like carelessness to your quality-conscious eye',
    growsWith:
      'Confident types—they push you to own your expertise more visibly, to claim the authority your skill deserves',

    books: [
      {
        title: 'Jiro Dreams of Sushi',
        author: 'Documentary/Gelb',
        reason:
          'A lifetime dedicated to making one thing perfectly. Quality as a form of devotion.',
      },
      {
        title: 'Shaker Design',
        author: 'Kirk',
        reason:
          'Beauty emerging from practical care. Quality as a spiritual practice.',
      },
      {
        title: 'The Art of Fermentation',
        author: 'Katz',
        reason:
          'Making that requires patience and attention. Quality that cannot be rushed.',
      },
    ],

    famousFigures: {
      real: ['Jiro Ono', 'Ruth Bader Ginsburg', 'Simone Biles'],
      fictional: [
        'Leslie Knope (Parks & Rec)',
        'Monica Geller (Friends)',
        'Hermione Granger (Harry Potter)',
      ],
    },
  },

  'bold-maker': {
    key: 'bold-maker',
    name: 'Bold Maker',
    color: '#e06e26',
    noun: 'maker',
    adjective: 'bold',
    quadrant: 'settled-expansive',

    utopia:
      "Their utopia has strange and wonderful objects nobody knew they wanted until they existed.",

    description:
      "You make unusual things, following creative instincts others might suppress. Your boldness in making isn't about ignoring craft—it's about extending it into territories the cautious won't explore.",

    pull: 'toward the unprecedented',
    edge: 'you create things nobody knew were possible',
    oneSentence:
      'You make things that surprise even you, following creative instincts into territory where no map exists.',

    superpower: 'creative audacity',
    superpowerExpanded: `You make things that shouldn't work, and then they do.

Your creative process involves more uncertainty than the assured maker would tolerate. You're not always sure where you're heading. But you trust the process—the combination of skill and instinct that guides your hands even when your mind isn't sure. This boldness produces novelty that pure skill alone cannot.

People are drawn to your work because it shows them possibilities they hadn't imagined. The object that combines materials nobody combines. The approach that violates conventional rules but produces something better. You expand the field of what "making" can include.`,

    blindSpot:
      'Your creative audacity can become a crutch. Bold doesn\'t always mean good, and novelty isn\'t the same as quality.',

    blindSpotExpanded: `Sometimes the conventional approach is conventional because it works.

Your boldness can become a reflex—you innovate even when innovation isn't needed. The straightforward solution feels boring, so you complicated it. The traditional technique felt constraining, so you invented something that doesn't work as well. Not every making needs to be unprecedented.

There's also the question of audience. Your bold objects might delight you and confuse everyone else. Making that connects requires making with others in mind—not just following your instincts, but considering whether your instincts serve anyone beyond yourself.`,

    coreBeliefs: [
      'Tradition is a starting point, not a prison',
      'The best work surprises its maker',
      'Creative rules exist to be understood, then transcended',
      'Bold making requires bold failing—and learning from both',
    ],

    howYouGotHere:
      'Your answers showed willingness to experiment from a position of settled craft. You make things, but you make unusual things—following instincts into creative territory others avoid. This maps to the Bold Maker.',

    alignsWith:
      'other Expansive types—you share the orientation toward growth and exploration, the belief that the best work extends into unknown territory',
    tensionWith:
      "Steady and Grounded types—their traditionalism can feel like creative limitation, like they're making the same thing forever",
    growsWith:
      "Careful types—their attention to consequences keeps your bold experiments grounded in consideration of who they affect",

    books: [
      {
        title: 'The Invention of Nature',
        author: 'Wulf',
        reason:
          'Alexander von Humboldt making new ways of understanding nature. Scientific creativity as bold making.',
      },
      {
        title: 'Working',
        author: 'Terkel',
        reason:
          'Every kind of making, from conventional to creative. The dignity in all of it.',
      },
      {
        title: 'Ways of Seeing',
        author: 'Berger',
        reason:
          'Seeing differently as a prelude to making differently. Bold perception enables bold creation.',
      },
    ],

    famousFigures: {
      real: ['Alexander McQueen', 'David Bowie', 'Ferran Adria'],
      fictional: [
        'Willy Wonka',
        'The Mandalorian',
        'Maz Kanata (Star Wars)',
      ],
    },
  },

  // =============================================================================
  // SHAPER identities (mid agency)
  // =============================================================================

  'confident-shaper': {
    key: 'confident-shaper',
    name: 'Confident Shaper',
    color: '#b63e07',
    noun: 'shaper',
    adjective: 'confident',
    quadrant: 'settled-expansive',

    utopia:
      'Their utopia transforms its problems into its features. Nothing is wasted.',

    description:
      "You reshape what exists with the confidence that comes from seeing potential others miss. Where people see problems, you see raw material. Your confidence isn't about knowing exactly what will emerge—it's about trusting your ability to find it.",

    pull: 'toward transformation',
    edge: 'you see the better form waiting inside the current form',
    oneSentence:
      'You shape existing things into better versions, confident that improvement is always possible.',

    superpower: 'transformative vision',
    superpowerExpanded: `You see what things could become, not just what they are.

This is different from building new—you work with what's there. The failing project that could work with different framing. The clunky process that could flow if you moved three steps. The team that could perform if you changed its structure. You see these transformations as if they've already happened.

Your confidence makes transformation feel achievable. People who are stuck get unstuck around you, because your certainty that change is possible becomes their certainty too. You're not deterred by the way things have always been done—you see that as data, not destiny.`,

    blindSpot:
      'Your confidence in transformation can undervalue preservation. Not everything needs to be reshaped; some things need to be accepted or simply left alone.',

    blindSpotExpanded: `You see improvement everywhere, and that can be exhausting for everyone else.

Not every system needs reshaping. Not every person wants to be transformed. Your confident sense that things could be better can feel like judgment of how things are now. People may not want to hear what you see, even if you're right.

There's also the question of whether transformation is actually needed. Sometimes stability is the goal. Sometimes "good enough" really is good enough. Your confidence in reshaping can make it hard to accept that the best action might be no action at all.`,

    coreBeliefs: [
      'Everything can be improved; nothing is final',
      'Seeing potential is the first step to realizing it',
      'Transformation requires both vision and commitment',
      'The confident shaper serves the thing being shaped, not their own ego',
    ],

    howYouGotHere:
      'Your answers showed willingness to transform what exists combined with settled conviction about direction. You reshape, and you do it with confidence. This maps to the Confident Shaper.',

    alignsWith:
      'other Shapers and Makers—you share the orientation toward working with existing material, toward transformation rather than creation from nothing',
    tensionWith:
      'Witnesses and Observers—their preference for watching rather than shaping can feel like accepting inadequacy',
    growsWith:
      'Seekers—their questioning keeps your transformation honest, preventing you from reshaping things according to unexamined assumptions',

    books: [
      {
        title: 'The Fifth Season',
        author: 'Jemisin',
        reason:
          'Shaping the earth itself. Power and responsibility at civilizational scale.',
      },
      {
        title: 'Dune',
        author: 'Herbert',
        reason:
          'Reshaping planets, ecosystems, religions. Transformation that spans generations.',
      },
      {
        title: 'The Lean Startup',
        author: 'Ries',
        reason:
          'Systematic shaping of business models. Transformation through iteration.',
      },
    ],

    famousFigures: {
      real: ['Marie Kondo', 'Lee Kuan Yew', 'Ruth Bader Ginsburg'],
      fictional: [
        'Magneto (X-Men)',
        'Toph Beifong (Avatar)',
        'Galadriel (LOTR)',
      ],
    },
  },

  'assured-shaper': {
    key: 'assured-shaper',
    name: 'Assured Shaper',
    color: '#c65012',
    noun: 'shaper',
    adjective: 'assured',
    quadrant: 'settled-expansive',

    utopia:
      'Their utopia improves itself gradually. Evolution, not revolution.',

    description:
      "You reshape with patient assurance. Unlike the bold shaper who moves quickly, you take time to understand what you're working with. Your transformations are sustainable because they respect the nature of what's being shaped.",

    pull: 'toward sustainable improvement',
    edge: 'you shape with patience that produces lasting change',
    oneSentence:
      'You shape existing things with the patient assurance that understanding comes before transformation.',

    superpower: 'patient transformation',
    superpowerExpanded: `You change things slowly enough that the change sticks.

Rapid transformation often bounces back—systems and people revert to old patterns. You've learned that lasting change requires working with existing structures, not against them. You understand what you're shaping before you shape it.

This makes your transformations sustainable in ways that more aggressive approaches aren't. The processes you improve stay improved. The teams you develop keep developing. Your assurance isn't about speed—it's about durability.`,

    blindSpot:
      'Your patient approach can become an excuse for not making harder changes. Some transformations require disruption that your assured style avoids.',

    blindSpotExpanded: `Sometimes gradual improvement isn't enough.

Your preference for working with existing structures can prevent you from seeing when structures need to be broken, not reshaped. The patient approach that builds buy-in can also build delay. Some situations need the disruptive transformation you're temperamentally reluctant to pursue.

There's also the question of urgency. Your assured pace feels right to you, but is it right for the situation? When the building is on fire, patient transformation is the wrong approach. Learn to recognize when your assurance needs to become speed.`,

    coreBeliefs: [
      'Sustainable change requires understanding before action',
      'Working with systems is more effective than working against them',
      'Patience is a form of respect for complexity',
      'The assured shaper serves long-term outcomes, not short-term appearances',
    ],

    howYouGotHere:
      'Your answers showed willingness to reshape what exists combined with grounded patience. You transform, but you transform sustainably, working with rather than against existing patterns. This maps to the Assured Shaper.',

    alignsWith:
      "other Assured types—you share the quality of grounded confidence, of knowing what you're doing without rushing",
    tensionWith:
      "Bold types—their speed can feel like impatience, like they're forcing change rather than cultivating it",
    growsWith:
      'Confident types—they push you to move faster when speed matters, to trust your judgment enough to act decisively',

    books: [
      {
        title: 'Switch',
        author: 'Heath',
        reason:
          'How change actually works. Patient shaping based on understanding human nature.',
      },
      {
        title: 'The Toyota Way',
        author: 'Liker',
        reason:
          'Continuous improvement as an organizational practice. Patient shaping at scale.',
      },
      {
        title: 'Designing Your Life',
        author: 'Burnett & Evans',
        reason:
          'Reshaping your own life through iterative prototyping. Patient self-transformation.',
      },
    ],

    famousFigures: {
      real: ['Fred Rogers', 'Nelson Mandela', 'Angela Merkel'],
      fictional: [
        'Iroh (Avatar)',
        'Yoda (Star Wars)',
        'Alfred Pennyworth (Batman)',
      ],
    },
  },

  'bold-shaper': {
    key: 'bold-shaper',
    name: 'Bold Shaper',
    color: '#d46326',
    noun: 'shaper',
    adjective: 'bold',
    quadrant: 'settled-expansive',

    utopia:
      'Their utopia is generous with second chances. Everything can be remade.',

    description:
      "You have opinions and you trust them. Not because you're always right, but because you've learned that confident action reveals truth faster than endless deliberation.",

    pull: 'toward transformation',
    edge: 'you move while others deliberate',
    oneSentence:
      "You've learned to trust your judgment not because it's perfect, but because confident action teaches faster than hesitation.",

    superpower: 'decisive transformation',
    superpowerExpanded: `You've figured out something many people never learn: indecision is itself a decision, and usually a worse one.

So you decide. You move. You shape what's in front of you rather than waiting for perfect information that never comes. This isn't recklessness—you've thought about it. You've arrived at your convictions through experience. And now you trust them.

This makes you a catalyst. In stuck situations, you're the one who breaks the stalemate. Not by being right (though you often are), but by being willing to be wrong in a direction. Momentum reveals what analysis cannot.`,

    blindSpot:
      'Your confidence can bulldoze nuance. Some things require patience you\'re not naturally inclined to give.',

    blindSpotExpanded: `Your confidence has a shadow: you can stop listening.

Once you've decided, you're moving. And the people raising objections start to sound like friction, not wisdom. You may dismiss concerns that deserved more weight. You may shape things into forms that serve your vision but not others' needs.

Bold shaping requires bold accountability. When your confident action causes harm, can you feel it? Or does your certainty protect you from feedback? The very settledness that gives you power can become armor against learning.`,

    coreBeliefs: [
      'Perfect is the enemy of good, but so is endless deliberation',
      'Confidence is a skill, not a personality trait—you can develop it',
      'Taking responsibility for outcomes means accepting you\'ll sometimes be wrong',
      'The world is shaped by those who show up and push',
    ],

    howYouGotHere:
      "Your answers showed confidence paired with willingness to act. You didn't agonize over hypotheticals—you leaned toward engagement, shaping, moving. But unlike pure builders, you're not starting from scratch. You're reshaping what exists. This settled, expansive agency maps to the Bold Shaper.",

    alignsWith:
      'other Settled types—you share a sense of having arrived somewhere, knowing your position',
    tensionWith:
      'Seeking types—their constant questioning can feel like paralysis to you',
    growsWith:
      'higher-Agency types—Builders and Architects push you to create, not just reshape',

    books: [
      {
        title: 'The Fifth Season',
        author: 'Jemisin',
        reason:
          'Power wielded decisively in a world that punishes hesitation. Shaping the earth itself.',
      },
      {
        title: 'Dune',
        author: 'Herbert',
        reason:
          "The weight of decision. Shaping the future through choices that can't be unmade.",
      },
      {
        title: 'The Power',
        author: 'Alderman',
        reason:
          'What happens when the power to shape shifts. The responsibility that comes with capacity.',
      },
    ],

    famousFigures: {
      real: ['Frances Perkins', 'Steve Jobs', 'Ruth Bader Ginsburg'],
      fictional: [
        'Korra (Legend of Korra)',
        'Malcolm Reynolds (Firefly)',
        'Furiosa (Mad Max)',
      ],
    },
  },

  // =============================================================================
  // OBSERVER identities (mid-low agency)
  // =============================================================================

  'confident-observer': {
    key: 'confident-observer',
    name: 'Confident Observer',
    color: '#a3380a',
    noun: 'observer',
    adjective: 'confident',
    quadrant: 'settled-expansive',

    utopia:
      'Their utopia has clear sight lines. Nothing important is hidden.',

    description:
      "You observe with the confidence of someone who trusts their perception. Your watching isn't passive—it's trained attention that catches what others miss. You know what you're looking at, and you're not easily fooled.",

    pull: 'toward clarity',
    edge: 'you see through fog others accept as normal',
    oneSentence:
      'You watch with confident attention, trusting your perception while remaining open to being surprised.',

    superpower: 'perceptual certainty',
    superpowerExpanded: `You trust your eyes.

In a world of spin and misdirection, you've developed the confidence to believe what you observe, even when the consensus says otherwise. You see the pattern that's actually there, not the pattern everyone's pretending is there. This clarity is rare and valuable.

Your confident observation makes you a truth-teller. People come to you when they need an honest assessment, because they know you'll report what you actually see. You're not easily swayed by what things are supposed to look like.`,

    blindSpot:
      'Your perceptual confidence can become arrogance. Your eyes can deceive you too—no perception is infallible.',

    blindSpotExpanded: `You trust your eyes, but should you always?

Confident perception can become resistant to revision. When your observation conflicts with others' observations, you assume they're wrong. But perception is constructed—shaped by expectation, attention, context. Your confident seeing has blind spots you can't see by definition.

There's also the question of action. Confident observation without action is just confident spectatorship. At some point, what you see demands a response. Does your observer identity protect you from the risks of participation?`,

    coreBeliefs: [
      'Clear seeing is the foundation of wise acting',
      'Perception can be trained and trusted',
      'The confident observer serves truth, not comfort',
      'What you attend to determines what you see—choose your attention carefully',
    ],

    howYouGotHere:
      'Your answers showed strong perceptual engagement with the world combined with settled confidence in your observations. You watch, and you trust what you see. This maps to the Confident Observer.',

    alignsWith:
      'other Observers and Noticers—you share the orientation toward perception rather than action, toward understanding before intervening',
    tensionWith:
      'Builders and Makers—their focus on creating can seem like avoiding the harder work of truly seeing',
    growsWith:
      "Shapers—they show you that observation can lead to transformation, that seeing and changing aren't opposed",

    books: [
      {
        title: 'Seeing Like a State',
        author: 'Scott',
        reason:
          'How different perspectives reveal and conceal. The politics of observation.',
      },
      {
        title: 'Ways of Seeing',
        author: 'Berger',
        reason:
          'Observation as a learned skill. What confident seeing requires.',
      },
      {
        title: 'The Information',
        author: 'Gleick',
        reason:
          'What observation means in an age of overwhelming data. Signal and noise.',
      },
    ],

    famousFigures: {
      real: ['Jane Goodall', 'David Attenborough', 'Temple Grandin'],
      fictional: [
        'Sherlock Holmes',
        'Clarice Starling (Silence of the Lambs)',
        'Data (Star Trek)',
      ],
    },
  },

  'assured-observer': {
    key: 'assured-observer',
    name: 'Assured Observer',
    color: '#b34815',
    noun: 'observer',
    adjective: 'assured',
    quadrant: 'settled-expansive',

    utopia:
      'Their utopia has good record-keepers. Nothing important is forgotten.',

    description:
      "You observe with quiet assurance, noticing patterns over time that others miss in their hurry. Your watching isn't anxious—you trust that sustained attention will reveal what it reveals.",

    pull: 'toward accumulated understanding',
    edge: 'you see patterns that only patience reveals',
    oneSentence:
      'You observe with the patience that comes from trusting the process—attention sustained over time reveals what haste never can.',

    superpower: 'patient perception',
    superpowerExpanded: `You watch things long enough to see what's really happening.

The quick glance sees the surface. The sustained gaze sees the structure beneath. You've learned to keep watching after others have moved on, and this patience reveals patterns invisible to impatient eyes. The trend that takes months to emerge. The relationship that only becomes visible over years. The subtle shift that precedes the obvious change.

This makes you valuable in contexts that require long-term thinking. Strategic planning, historical analysis, complex systems—these reward your patient observation in ways that short attention spans cannot achieve.`,

    blindSpot:
      'Your patient watching can become procrastination. Waiting to see more is sometimes just avoiding the need to act on what you already see.',

    blindSpotExpanded: `There's always more to observe. At what point is "more observation needed" just an excuse?

Your assured patience can enable indefinite delay. The trend becomes clear, but you want one more data point. The pattern is visible, but you want to watch it longer. At some point, continued observation serves your comfort more than your understanding.

And your assurance can make you miss urgent signals. When something requires fast response, your patient style might be too slow. Learn to recognize the difference between situations that reward patience and situations that punish it.`,

    coreBeliefs: [
      'Time reveals what haste conceals',
      'Patient observation is not passive—it requires discipline',
      'The assured observer serves understanding, not conclusion-avoidance',
      'Patterns only emerge when you watch long enough',
    ],

    howYouGotHere:
      'Your answers showed sustained attention combined with grounded confidence in your approach. You observe patiently, trusting that time will reveal what it reveals. This maps to the Assured Observer.',

    alignsWith:
      'other Settled types—you share the quality of having found your approach and trusting it',
    tensionWith:
      "Bold types—their rapid action can feel like premature closure, moving before they've really seen",
    growsWith:
      'Confident types—they push you to trust your observations enough to act on them, not just continue watching',

    books: [
      {
        title: 'The Pattern on the Stone',
        author: 'Hillis',
        reason:
          'Patient observation of how computers actually work. Complexity revealed through sustained attention.',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman',
        reason:
          'When fast perception works and when it fails. The value of slow observation.',
      },
      {
        title: 'The Structure of Scientific Revolutions',
        author: 'Kuhn',
        reason:
          'How paradigm shifts emerge from accumulated observations that no longer fit.',
      },
    ],

    famousFigures: {
      real: ['Charles Darwin', 'Oliver Sacks', 'Ursula K. Le Guin'],
      fictional: [
        'Atticus Finch (To Kill a Mockingbird)',
        'Doctor Manhattan (Watchmen)',
        'Spock (Star Trek)',
      ],
    },
  },

  'bold-observer': {
    key: 'bold-observer',
    name: 'Bold Observer',
    color: '#c45a28',
    noun: 'observer',
    adjective: 'bold',
    quadrant: 'settled-expansive',

    utopia:
      'Their utopia looks uncomfortable truths in the face. Nothing true is off-limits.',

    description:
      "You observe what others flinch from. Your boldness isn't about taking action—it's about maintaining attention where attention is uncomfortable. You look at what society would rather ignore.",

    pull: 'toward uncomfortable truths',
    edge: 'you see what others turn away from',
    oneSentence:
      'You observe boldly, maintaining attention where most people flinch—because truth does not care about comfort.',

    superpower: 'unflinching attention',
    superpowerExpanded: `You don't look away.

The things that make people uncomfortable—death, failure, injustice, ugliness—you observe them clearly. Not with enjoyment, but with the understanding that refusing to look doesn't make things disappear. Your boldness is in maintaining attention where attention is hard.

This makes you a witness to truths others would rather forget. The systemic problems everyone prefers not to see. The consequences that get swept under rugs. The realities that complicate comfortable narratives. You see them, and you don't pretend otherwise.`,

    blindSpot:
      'Your unflinching gaze can become pitiless. Some things benefit from being looked away from, at least temporarily.',

    blindSpotExpanded: `Not every truth needs to be stared at constantly.

Your bold observation can become relentless, demanding that everyone confront what you see. But people need rest, need hope, need the occasional comfortable illusion. Your refusal to look away can make you harsh company, someone who never lets anyone off the hook.

There's also the question of complicity. Observing injustice without acting against it has limits. At some point, bold observation that doesn't lead to bold action becomes sophisticated bystanding. Are you witnessing, or are you just watching?`,

    coreBeliefs: [
      'Looking away doesn\'t make things disappear—it just makes you ignorant',
      'Uncomfortable truths are still truths',
      'Bold observation requires courage, not cruelty',
      'What you refuse to see controls you more than what you face',
    ],

    howYouGotHere:
      'Your answers showed willingness to look at uncomfortable realities combined with settled confidence in your approach. You observe what others avoid, and you do it without flinching. This maps to the Bold Observer.',

    alignsWith:
      'other Expansive types—you share the willingness to move into uncomfortable territory, to expand rather than retreat',
    tensionWith:
      'Protective types—their caution can feel like self-deception, refusing to see what would disturb their peace',
    growsWith:
      'Shapers—they show you that observation can lead to change, that seeing clearly is the foundation for acting wisely',

    books: [
      {
        title: 'The Body Keeps the Score',
        author: 'van der Kolk',
        reason:
          'Bold observation of trauma. Seeing what society would rather ignore.',
      },
      {
        title: 'Evicted',
        author: 'Desmond',
        reason:
          'Unflinching observation of poverty. Watching what comfortable people don\'t see.',
      },
      {
        title: 'Man\'s Search for Meaning',
        author: 'Frankl',
        reason:
          'Observing the worst of humanity and finding meaning anyway.',
      },
    ],

    famousFigures: {
      real: ['Susan Sontag', 'James Baldwin', 'Ta-Nehisi Coates'],
      fictional: [
        'Captain Picard (Star Trek)',
        'Rorschach (Watchmen)',
        'Wednesday Addams',
      ],
    },
  },

  // =============================================================================
  // NOTICER identities (low agency)
  // =============================================================================

  'confident-noticer': {
    key: 'confident-noticer',
    name: 'Confident Noticer',
    color: '#8f3210',
    noun: 'noticer',
    adjective: 'confident',
    quadrant: 'settled-expansive',

    utopia:
      'Their utopia values the small things. Details matter because life is made of details.',

    description:
      "You notice what others overlook, and you trust your noticing. The small details that escape attention—you catch them. Your confidence isn't loud; it's the quiet assurance of someone who knows they're paying attention when others aren't.",

    pull: 'toward the overlooked',
    edge: 'you see the small things that turn out to matter',
    oneSentence:
      'You notice what others miss, trusting that attention to detail reveals truths that broad strokes cannot.',

    superpower: 'detailed perception',
    superpowerExpanded: `You see the small things.

While others scan for the big picture, you notice the details that make the picture possible. The slight hesitation before someone agrees. The typo that suggests distraction. The small kindness that reveals character. These details accumulate in your awareness, forming an understanding that people with less granular attention cannot achieve.

Your confidence in this ability means you trust your impressions. When something feels off, you pay attention to that feeling because you've learned it usually means you've noticed something others haven't. This makes you valuable as an early warning system—you see problems before they become visible at the usual resolution.`,

    blindSpot:
      'Your detail-orientation can miss the forest for the trees. Sometimes the big picture matters more than the small things.',

    blindSpotExpanded: `Details matter, but so does context.

Your confident attention to small things can make you lose sight of larger patterns. The detail that feels significant might be noise, not signal. The broader trend that others see clearly might escape your more granular vision. Detail without context is just trivia.

There's also the question of communication. Your detailed noticing can be hard to share. "I just have a feeling something's wrong" doesn't convince people who want evidence they can see. Learning to translate your granular perception into language others understand is important work.`,

    coreBeliefs: [
      'God is in the details—or the devil, depending on which details you notice',
      'The small things add up; everything is made of small things',
      'Attention is a choice, and choosing to notice is choosing to understand',
      'The confident noticer trusts their perception while remaining curious',
    ],

    howYouGotHere:
      'Your answers showed attention to small things combined with confidence in that attention. You notice details others miss, and you trust what you notice. This maps to the Confident Noticer.',

    alignsWith:
      'other Noticers and Witnesses—you share the orientation toward receiving rather than acting, toward attention rather than intervention',
    tensionWith:
      "Architects—their systems focus can feel like they're missing the human details that make systems work or fail",
    growsWith:
      'Observers—they help you connect your details into larger patterns, building from noticing toward understanding',

    books: [
      {
        title: 'The Poetics of Space',
        author: 'Bachelard',
        reason:
          'The intimate details of inhabited space. Noticing as a philosophical practice.',
      },
      {
        title: 'Pilgrim at Tinker Creek',
        author: 'Dillard',
        reason:
          'Attention as devotion. The spiritual dimension of noticing.',
      },
      {
        title: 'The Art of Looking',
        author: 'Horowitz',
        reason:
          'What trained attention can reveal. Perception as a skill.',
      },
    ],

    famousFigures: {
      real: ['Annie Dillard', 'Sherlock Holmes (Doyle\'s creation)', 'Marie Curie'],
      fictional: [
        'Miss Marple (Agatha Christie)',
        'Luna Lovegood (Harry Potter)',
        'Amélie Poulain',
      ],
    },
  },

  'assured-noticer': {
    key: 'assured-noticer',
    name: 'Assured Noticer',
    color: '#9f421a',
    noun: 'noticer',
    adjective: 'assured',
    quadrant: 'settled-expansive',

    utopia:
      'Their utopia has time to appreciate things. Noticing is not rushed.',

    description:
      "You notice with quiet assurance, attending to details without anxiety about what they mean. Your noticing is patient—you let significance emerge rather than forcing interpretation.",

    pull: 'toward unhurried attention',
    edge: 'you notice without rushing to conclusion',
    oneSentence:
      'You notice with patience, letting details accumulate until their meaning becomes clear.',

    superpower: 'patient attention',
    superpowerExpanded: `You notice slowly and completely.

Where others grab at details and move on, you stay with them. You let your attention rest on things long enough to see them fully. This patient noticing reveals dimensions that hurried attention misses—the way something changes over time, the subtle relationships between details, the significance that only emerges with sustained attention.

Your assurance means you trust this process. You don't need to rush to conclusions. The meaning will emerge when you've noticed enough. This makes you reliable in situations that require thorough understanding—your assessments are grounded in complete attention, not quick impressions.`,

    blindSpot:
      'Your patient noticing can become avoidance of judgment. At some point, you have enough information to conclude—continuing to notice is just delay.',

    blindSpotExpanded: `There's a difference between patient noticing and refusal to conclude.

Your assured attention can become a way of avoiding the harder work of interpretation. You always need to notice one more thing. The picture is never quite complete. But pictures are never complete—at some point, you act on what you've noticed or your noticing doesn't matter.

There's also the question of urgency. Patient noticing is a luxury that not all situations afford. When quick judgment is needed, your assured pace can be a liability. Learn to recognize when enough noticing is enough.`,

    coreBeliefs: [
      'Rushed attention misses what matters',
      'Meaning emerges from sustained noticing',
      'The assured noticer trusts the process of perception',
      'Details accumulate into understanding—if you let them',
    ],

    howYouGotHere:
      'Your answers showed patient attention to details combined with grounded confidence in your approach. You notice without rushing, trusting that sustained attention reveals what it reveals. This maps to the Assured Noticer.',

    alignsWith:
      'other Assured types—you share the quality of unhurried confidence, of trusting your process',
    tensionWith:
      "Bold types—their quick action can feel like they're concluding before they've really noticed",
    growsWith:
      'Confident types—they push you to trust your noticing enough to act on it',

    books: [
      {
        title: 'The Nature Fix',
        author: 'Williams',
        reason:
          'What patient attention to nature does for the human mind.',
      },
      {
        title: 'On Looking',
        author: 'Horowitz',
        reason:
          'Walking the same block with different experts. What trained attention reveals.',
      },
      {
        title: 'Bird by Bird',
        author: 'Lamott',
        reason:
          'Writing as noticing. The patient attention that makes art possible.',
      },
    ],

    famousFigures: {
      real: ['Mary Oliver', 'Beatrix Potter', 'Temple Grandin'],
      fictional: [
        'Samwell Tarly (Game of Thrones)',
        'Bilbo Baggins (The Hobbit)',
        'Forrest Gump',
      ],
    },
  },

  'bold-noticer': {
    key: 'bold-noticer',
    name: 'Bold Noticer',
    color: '#af5430',
    noun: 'noticer',
    adjective: 'bold',
    quadrant: 'settled-expansive',

    utopia:
      'Their utopia questions what everyone else takes for granted. Nothing is too obvious to notice.',

    description:
      "You notice what's hiding in plain sight—the things so obvious that no one thinks to question them. Your boldness isn't about action; it's about attending to what consensus has decided to ignore.",

    pull: 'toward the hidden obvious',
    edge: 'you notice what everyone overlooks because it seems too obvious',
    oneSentence:
      'You notice what hides in plain sight—the assumptions so universal that questioning them feels bold.',

    superpower: 'radical attention',
    superpowerExpanded: `You notice the unnoticed.

Not the hidden things—anyone can notice secrets. You notice the things that are right there, visible to everyone, but somehow unseen. The assumption everyone makes without examining. The pattern everyone participates in without naming. The obvious thing that's so obvious it becomes invisible.

This makes you a pattern-interrupter. When you point out what you notice, people often react with surprise—"I never thought about it that way." Your bold noticing makes the familiar strange, which is the first step toward making the strange better.`,

    blindSpot:
      'Your radical attention can become contrarianism. Not everything obvious is wrong; not everything everyone believes is a conspiracy.',

    blindSpotExpanded: `Sometimes the consensus is correct.

Your tendency to notice what others overlook can become a habit of looking for what's wrong with the conventional view. This is valuable when the conventional view is problematic—but not everything needs to be questioned. Some things are obvious because they're obviously true.

There's also the question of reception. Bold noticing can come across as criticism of everyone who failed to notice. People may feel accused rather than enlightened. Learning to share your noticing in ways that invite curiosity rather than defensiveness is important work.`,

    coreBeliefs: [
      'The most important things to notice are often hiding in plain sight',
      'Consensus can create blindness—what everyone sees, no one examines',
      'Bold noticing serves truth, not contrarianism',
      'The obvious is worth questioning precisely because it seems obvious',
    ],

    howYouGotHere:
      'Your answers showed willingness to question the obvious combined with settled confidence in your attention. You notice what hides in plain sight, and you trust what you notice. This maps to the Bold Noticer.',

    alignsWith:
      'other Expansive types—you share the willingness to push into uncomfortable territory, to notice what others prefer not to see',
    tensionWith:
      'Grounded types—their embrace of tradition can feel like uncritical acceptance of things that deserve questioning',
    growsWith:
      'Observers—they help you build from noticing toward understanding, connecting your insights into larger patterns',

    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman',
        reason:
          'Noticing how thinking actually works vs. how we assume it works.',
      },
      {
        title: 'Seeing Like a State',
        author: 'Scott',
        reason:
          'Noticing what systems hide. The obvious things that planning conceals.',
      },
      {
        title: 'The Structure of Scientific Revolutions',
        author: 'Kuhn',
        reason:
          'Noticing the paradigms that shape what scientists can see.',
      },
    ],

    famousFigures: {
      real: ['Michel Foucault', 'Marshall McLuhan', 'Hannah Arendt'],
      fictional: [
        'The Fool (King Lear)',
        'Morpheus (The Matrix)',
        'Tyler Durden (Fight Club)',
      ],
    },
  },

  // =============================================================================
  // WITNESS identities (lowest agency)
  // =============================================================================

  'confident-witness': {
    key: 'confident-witness',
    name: 'Confident Witness',
    color: '#7c2c14',
    noun: 'witness',
    adjective: 'confident',
    quadrant: 'settled-expansive',

    utopia:
      'Their utopia has good listeners. Every story finds someone willing to hold it.',

    description:
      "You bear witness with confidence—not confidence that you can fix anything, but confidence that witnessing itself matters. Your presence is not passive; it's a choice to be present when presence is needed.",

    pull: 'toward being present',
    edge: 'you witness with the confidence that presence matters',
    oneSentence:
      'You bear witness with the quiet confidence that being fully present is itself a form of care.',

    superpower: 'presence as gift',
    superpowerExpanded: `You give people your full attention, and that is a gift.

In a world of distraction and half-presence, you offer something rare: complete attention. When someone is speaking, you're actually listening. When something is happening, you're actually there. This sounds simple, but it's uncommon enough to feel remarkable to those who receive it.

Your confidence in witnessing means you don't need to do more than be present. You trust that your attention matters, that people need to be seen, that stories need to be heard. This allows you to sit with difficulty that sends others rushing toward solutions or away toward escape.`,

    blindSpot:
      'Your confidence in witnessing can become an excuse for inaction. Sometimes people need more than presence—they need help.',

    blindSpotExpanded: `Presence is valuable, but it's not the only valuable thing.

Your confident witnessing can become a justification for not doing harder work. "I'm just here to witness" can be true, but it can also be a way of avoiding the messier, riskier work of actually helping. Sometimes people don't need a witness—they need a builder, a shaper, someone who will act.

There's also the question of what you do with what you witness. Pure witnessing without any translation or action lets important stories die unshared. At some point, the confident witness needs to become something else—or their witnessing doesn't matter beyond the moment.`,

    coreBeliefs: [
      'Being seen is a fundamental human need',
      'Presence is an action, not a non-action',
      'The confident witness serves the witnessed, not their own comfort',
      'Some things need to be witnessed even if nothing can be done',
    ],

    howYouGotHere:
      'Your answers showed deep presence combined with settled confidence in that presence. You witness, and you trust that witnessing matters. This maps to the Confident Witness.',

    alignsWith:
      'other Witnesses and Noticers—you share the orientation toward presence rather than action, toward receiving rather than changing',
    tensionWith:
      'Builders and Architects—their focus on creating can feel like avoiding the harder work of simply being present',
    growsWith:
      'Shapers—they show you that witnessing can inform transformation, that what you see can guide what you change',

    books: [
      {
        title: 'When Breath Becomes Air',
        author: 'Kalanithi',
        reason:
          'Witnessing mortality. Presence at the edge of life.',
      },
      {
        title: 'The Year of Magical Thinking',
        author: 'Didion',
        reason:
          'Witnessing grief. The work of being present to loss.',
      },
      {
        title: 'A Grief Observed',
        author: 'Lewis',
        reason:
          'Bearing witness to one\'s own suffering. Presence as spiritual practice.',
      },
    ],

    famousFigures: {
      real: ['Thich Nhat Hanh', 'Elie Wiesel', 'Rachel Carson'],
      fictional: [
        'The Giver (The Giver)',
        'Death (Sandman)',
        'The Ghost of Christmas Present (A Christmas Carol)',
      ],
    },
  },

  'assured-witness': {
    key: 'assured-witness',
    name: 'Assured Witness',
    color: '#8c3c1e',
    noun: 'witness',
    adjective: 'assured',
    quadrant: 'settled-expansive',

    utopia:
      'Their utopia honors its historians. What was witnessed is remembered.',

    description:
      "You witness with grounded assurance, comfortable in the role of being present without needing to act. Your witnessing isn't anxious—you know your place, and you trust its value.",

    pull: 'toward steady presence',
    edge: 'you witness with the calm of someone who knows presence is enough',
    oneSentence:
      'You witness with assured steadiness, trusting that your grounded presence offers something that action cannot.',

    superpower: 'reliable presence',
    superpowerExpanded: `People can count on you to be there.

Your assurance means you don't flee when things get difficult. You don't need to help or fix or change—you just stay. This reliability is rarer than it sounds. Most people have limits to their presence; when things get uncomfortable enough, they find reasons to leave. You stay.

This makes you invaluable in situations that require sustained witnessing. The long illness that needs someone by the bed. The slow project that needs someone paying attention. The crisis that needs someone to stay present after the first responders leave. Your assured presence holds space that transient presence cannot.`,

    blindSpot:
      'Your assured presence can become comfortable inaction. Being there isn\'t always enough, and knowing when it isn\'t is important.',

    blindSpotExpanded: `Presence has limits.

Your assurance that witnessing is enough can become an excuse for not doing more. Sometimes being there isn't sufficient—sometimes people need you to act, to speak, to change something. Your comfortable role as witness can become a comfortable avoidance of harder work.

There's also the question of what your presence enables. If your steady witnessing allows dysfunction to continue, are you helping or enabling? The assured witness needs to recognize when their presence has become complicity.`,

    coreBeliefs: [
      'Reliable presence is a form of love',
      'Staying is sometimes the hardest and most valuable thing',
      'The assured witness serves continuity when everything else changes',
      'What is witnessed with steadiness becomes memory that lasts',
    ],

    howYouGotHere:
      'Your answers showed grounded presence without anxiety about needing to do more. You witness with assurance, trusting that your steady attendance matters. This maps to the Assured Witness.',

    alignsWith:
      'other Settled types—you share the quality of having found your place and trusting it',
    tensionWith:
      "Bold types—their action-orientation can feel like they can't just be present, like they always need to be doing",
    growsWith:
      "Confident types—they push you to trust your witnessing enough to share what you've seen",

    books: [
      {
        title: 'Gilead',
        author: 'Robinson',
        reason:
          'A letter as legacy. The long work of witnessing a life.',
      },
      {
        title: 'The Road',
        author: 'McCarthy',
        reason:
          'Witness as survival. Being present through apocalypse.',
      },
      {
        title: 'Being Mortal',
        author: 'Gawande',
        reason:
          'Witnessing death. The steady presence that dying requires.',
      },
    ],

    famousFigures: {
      real: ['Studs Terkel', 'Fred Rogers', 'Terry Gross'],
      fictional: [
        'Samwise Gamgee (LOTR)',
        'Nick Carraway (The Great Gatsby)',
        'Watson (Sherlock Holmes)',
      ],
    },
  },

  'bold-witness': {
    key: 'bold-witness',
    name: 'Bold Witness',
    color: '#9c4e34',
    noun: 'witness',
    adjective: 'bold',
    quadrant: 'settled-expansive',

    utopia:
      'Their utopia does not look away. What happened is acknowledged.',

    description:
      "You witness what others refuse to see. Your boldness isn't about action—it's about being present to truths that most people escape. You stay when others leave, look when others flinch.",

    pull: 'toward difficult truths',
    edge: 'you witness what others cannot bear to see',
    oneSentence:
      'You witness what others turn away from, trusting that some truths need someone willing to see them.',

    superpower: 'unflinching presence',
    superpowerExpanded: `You don't look away.

When things get ugly, most people leave—physically or emotionally. You stay. Not to help or fix, but to witness. You believe that some things need to be seen, that looking away from truth is itself a kind of lie, and that being present to difficulty has value even when it changes nothing.

This makes you a keeper of uncomfortable truths. The things that society would rather forget, you remember. The suffering that would be invisible, you see. Your bold witnessing means these things cannot be entirely denied—someone was there, someone knows.`,

    blindSpot:
      'Your unflinching witness can become spectacle. There\'s a line between necessary witnessing and voyeurism.',

    blindSpotExpanded: `Not everything needs to be witnessed, and not everyone wants a witness.

Your boldness about seeing difficult things can cross into territory that's more about your own experience than about what's being witnessed. Are you present because your presence matters, or because you want to be someone who witnesses hard things? The ego of the bold witness is worth examining.

There's also the question of consent. Does the person or situation being witnessed want your attention? Bold witnessing without permission can become intrusion, documenting what deserves privacy, making public what was meant to be hidden.`,

    coreBeliefs: [
      'Some truths need witnesses even when nothing can be done',
      'Looking away is its own choice, with its own consequences',
      'The bold witness serves truth, not their own sense of themselves',
      'What is witnessed cannot be entirely denied',
    ],

    howYouGotHere:
      'Your answers showed willingness to be present to difficulty combined with settled confidence in that presence. You witness what others avoid, trusting that the witnessing matters. This maps to the Bold Witness.',

    alignsWith:
      'other Expansive types—you share the willingness to move toward discomfort rather than away from it',
    tensionWith:
      'Protective types—their caution about what to witness can feel like willful blindness',
    growsWith:
      'Shapers—they show you that what you witness can inform what gets changed, that seeing is the foundation for doing',

    books: [
      {
        title: 'Night',
        author: 'Wiesel',
        reason:
          'Bearing witness to the Holocaust. The necessity and cost of seeing.',
      },
      {
        title: 'The Diary of Anne Frank',
        author: 'Frank',
        reason:
          'Witness from within. Documenting what must not be forgotten.',
      },
      {
        title: 'Regarding the Pain of Others',
        author: 'Sontag',
        reason:
          'The ethics of witnessing suffering. When does watching help?',
      },
    ],

    famousFigures: {
      real: ['Elie Wiesel', 'James Baldwin', 'Bryan Stevenson'],
      fictional: [
        'Rorschach (Watchmen)',
        'Tiresias (Greek myth)',
        'The Narrator (Fight Club)',
      ],
    },
  },
}
