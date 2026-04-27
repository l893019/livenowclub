/**
 * Seeking + Protective Quadrant Identities (21 total)
 *
 * Quadrant characteristics:
 * - Questioning + preservation orientation
 * - Thoughtful, cautious, analytical
 * - Adjectives: Careful (most extreme), Cautious (middle), Measured (mildest)
 *
 * 7 nouns x 3 adjectives = 21 identities
 */

import type { Identity } from './identities'

export const seekingProtectiveIdentities: Record<string, Identity> = {
  // =============================================================================
  // ARCHITECT identities (highest agency)
  // =============================================================================

  'careful-architect': {
    key: 'careful-architect',
    name: 'Careful Architect',
    color: '#6366f1',
    noun: 'architect',
    adjective: 'careful',
    quadrant: 'seeking-protective',

    utopia:
      'Their utopia was built with margin for error. Every system has a fallback.',

    description:
      "You design systems with extraordinary care, considering failure modes others overlook. Your questioning mind asks what could go wrong, and your protective instinct ensures you've built defenses. This isn't anxiety—it's architectural responsibility.",

    pull: 'toward resilient design',
    edge: 'you design for failure modes others never imagine',
    oneSentence:
      'You architect with care that borders on devotion, knowing that the systems we depend on deserve someone thinking about what could go wrong.',

    superpower: 'defensive architecture',
    superpowerExpanded: `You design systems that account for their own failure.

While optimistic architects build for success, you build for both success and failure. What happens when this component breaks? What if this assumption is wrong? Your careful questioning produces architectures with graceful degradation, fallback systems, and recovery paths.

This makes you essential when stakes are high. Medical systems, financial infrastructure, safety-critical software—these need architects who ask the uncomfortable questions. Your care protects people from the confidence of less careful designers.`,

    blindSpot:
      "Your care can become paralysis. At some point, you've considered enough failure modes—and need to ship.",

    blindSpotExpanded: `There's always another thing that could go wrong.

Your careful questioning never naturally concludes. Every design can be questioned further, every failure mode can suggest another. At some point, additional care has diminishing returns, and your caution delays systems that people need now, imperfect though they are.

There's also the cost of excessive defensiveness. Systems optimized for failure can underperform in success. Your care for what could go wrong can steal resources from what could go right.`,

    coreBeliefs: [
      'Good architecture anticipates failure, not just success',
      'Care at the design phase prevents crisis at the operational phase',
      'What could go wrong is as important a question as what should go right',
      'The careful architect protects people who never know they were protected',
    ],

    howYouGotHere:
      "Your answers revealed someone who designs at the systems level with deep care for what could go wrong. You question assumptions while building protections. This combination of high agency, seeking orientation, and protective instinct maps to the Careful Architect.",

    alignsWith:
      'other Protective types—you share the orientation toward what could go wrong, toward building safeguards and considering risks',
    tensionWith:
      "Expansive types—their optimism can feel naive, like they haven't thought through what could fail",
    growsWith:
      "Confident types—they push you to trust your careful designs enough to ship them, accepting that perfection isn't achievable",

    books: [
      {
        title: 'Seveneves',
        author: 'Stephenson',
        reason:
          'Humanity faces extinction and must design redundant systems for survival. The careful architect\'s ultimate test.',
      },
      {
        title: 'A Fire Upon the Deep',
        author: 'Vinge',
        reason:
          'A galaxy organized into zones with built-in failsafes. Architecture that accounts for its own failure.',
      },
      {
        title: 'The Three-Body Problem',
        author: 'Liu',
        reason:
          'Civilizations that survive are those that anticipate threats. Defensive thinking at cosmic scale.',
      },
    ],

    famousFigures: {
      real: ['Margaret Hamilton', 'Frances Arnold', 'Nassim Nicholas Taleb'],
      fictional: [
        'Hermione Granger (Harry Potter)',
        'Spock (Star Trek)',
        'Alfred Pennyworth (Batman)',
      ],
    },
  },

  'cautious-architect': {
    key: 'cautious-architect',
    name: 'Cautious Architect',
    color: '#818cf8',
    noun: 'architect',
    adjective: 'cautious',
    quadrant: 'seeking-protective',

    utopia:
      'Their utopia learns from every near-miss. Caution is woven into the culture.',

    description:
      "You design with eyes wide open to risk, balancing ambition with awareness of what could go wrong. Your caution isn't timidity—it's the mature understanding that good architecture requires thinking about both upsides and downsides.",

    pull: 'toward risk-aware design',
    edge: 'you see the risks in systems that others overlook in their enthusiasm',
    oneSentence:
      'You architect with caution that serves ambition, knowing that sustainable systems require thinking about what could fail.',

    superpower: 'risk-aware design',
    superpowerExpanded: `You hold both possibility and risk in mind.

Your architectural vision includes what could go wrong alongside what should go right. This dual awareness produces designs that are both ambitious and realistic. You don't let risk prevent progress, but you don't let enthusiasm blind you to danger.

This makes you valuable as a reality check. When teams get caught up in what they're building, you're the one asking the uncomfortable questions. Not to kill projects, but to make them better. Your caution serves the work by making it more resilient.`,

    blindSpot:
      'Your caution can dampen necessary boldness. Sometimes the biggest risk is not taking enough risk.',

    blindSpotExpanded: `Risk-awareness can become risk-aversion.

Your attention to what could go wrong can gradually shift from informing decisions to making them. Caution starts as useful input and becomes the deciding factor. But avoiding all risk means avoiding all opportunity.

There's also the social cost. Being the person who always raises concerns can position you as the obstacle rather than the contributor. Your caution needs to be balanced with enthusiasm to remain welcome on ambitious teams.`,

    coreBeliefs: [
      'Awareness of risk serves ambition by making it sustainable',
      'Caution is not the opposite of courage—recklessness is',
      'Good architecture balances what could go right with what could go wrong',
      'The cautious architect enables bolder work by making it safer',
    ],

    howYouGotHere:
      'Your answers showed systems-level thinking combined with awareness of risk. You design ambitiously but not blindly. This maps to the Cautious Architect.',

    alignsWith:
      'other Seeking types—you share the questioning orientation, the sense that assumptions need examination',
    tensionWith:
      "Bold types—their willingness to move fast can feel like they haven't considered the downsides",
    growsWith:
      'Assured types—they help you trust your judgment enough to move forward despite uncertainty',

    books: [
      {
        title: 'Foundation',
        author: 'Asimov',
        reason:
          'Hari Seldon plans for civilizational collapse millennia in advance. Risk-aware design at its finest.',
      },
      {
        title: 'Dune',
        author: 'Herbert',
        reason:
          'Plans within plans within plans. Every contingency considered, every risk anticipated.',
      },
      {
        title: 'The Left Hand of Darkness',
        author: 'Le Guin',
        reason:
          'Navigating alien systems with caution and awareness. Diplomatic architecture under uncertainty.',
      },
    ],

    famousFigures: {
      real: ['Atul Gawande', 'Michael Burry', 'Nancy Leveson'],
      fictional: [
        'Samwise Gamgee (Lord of the Rings)',
        "M (James Bond)",
        'Moira MacTaggert (X-Men)',
      ],
    },
  },

  'measured-architect': {
    key: 'measured-architect',
    name: 'Measured Architect',
    color: '#a5b4fc',
    noun: 'architect',
    adjective: 'measured',
    quadrant: 'seeking-protective',

    utopia:
      'Their utopia grows at a pace it can sustain. Expansion follows foundation.',

    description:
      "You design with balanced judgment, neither rushing forward nor holding back unnecessarily. Your measured approach weighs options carefully, moves at appropriate pace, and builds systems that reflect thoughtful consideration.",

    pull: 'toward balanced design',
    edge: 'you design at the pace that produces the best results',
    oneSentence:
      'You architect with measured judgment, finding the pace and scope that produces systems worth building.',

    superpower: 'calibrated building',
    superpowerExpanded: `You build at the right scale and pace.

Your measured approach means you neither overreach nor underachieve. You calibrate ambition to capacity, scope to resources, pace to sustainability. This produces architectures that actually get finished and actually work, rather than impressive plans that never materialize.

This makes you reliable. Teams know your commitments will be met, your estimates will be realistic, your designs will be buildable. Your measured judgment produces trust that enables bigger projects over time.`,

    blindSpot:
      "Your measured approach can become safe mediocrity. Sometimes breakthroughs require unmeasured commitment.",

    blindSpotExpanded: `Measured isn't always right.

Your balanced judgment serves you well in most contexts—but some achievements require imbalanced commitment. The project that changes everything might need unmeasured dedication. The breakthrough that defines a career might require throwing caution aside temporarily.

There's also the risk of measured becoming comfortable. If measured means "what I'm sure I can handle," you might never discover what you're capable of when stretched.`,

    coreBeliefs: [
      'Measured progress is sustainable progress',
      'Good architecture matches ambition to capacity',
      'The measured architect finishes what they start',
      'Calibration is a skill, not a limitation',
    ],

    howYouGotHere:
      'Your answers showed systems-level thinking combined with balanced judgment. You design thoughtfully without overcaution or overreach. This maps to the Measured Architect.',

    alignsWith:
      'other Measured types—you share the balanced approach, the calibration of effort to circumstances',
    tensionWith:
      'Adaptive types—their rapid changes can feel like lack of commitment to any particular direction',
    growsWith:
      "Bold types—they challenge you to occasionally exceed your measured limits, discovering you're capable of more",

    books: [
      {
        title: 'The Dispossessed',
        author: 'Le Guin',
        reason:
          'Two worlds, two systems, balanced against each other. Measured architecture of society.',
      },
      {
        title: 'Red Mars',
        author: 'Robinson',
        reason:
          'Terraforming as measured transformation. Building a world at sustainable pace.',
      },
      {
        title: 'A Memory Called Empire',
        author: 'Martine',
        reason:
          'Political systems designed with care. Measured navigation of complex power structures.',
      },
    ],

    famousFigures: {
      real: ['Warren Buffett', 'Fred Rogers', 'Ursula Burns'],
      fictional: [
        'Obi-Wan Kenobi (Star Wars)',
        'Iroh (Avatar: The Last Airbender)',
        'Alfred Pennyworth (Batman)',
      ],
    },
  },

  // =============================================================================
  // BUILDER identities (high agency)
  // =============================================================================

  'careful-builder': {
    key: 'careful-builder',
    name: 'Careful Builder',
    color: '#575ae0',
    noun: 'builder',
    adjective: 'careful',
    quadrant: 'seeking-protective',

    utopia:
      'Their utopia was built right the first time. Quality is non-negotiable.',

    description:
      "You build with extraordinary attention to quality, questioning every step to ensure it's done right. Your care isn't perfectionism for its own sake—it's the understanding that careful construction prevents costly failures.",

    pull: 'toward quality construction',
    edge: 'you build things that work because you questioned every assumption along the way',
    oneSentence:
      'You build with the care of someone who knows that construction quality determines everything that follows.',

    superpower: 'quality-driven building',
    superpowerExpanded: `You build things that work.

Your careful approach means you question each step, verify each assumption, test each component. This isn't slow—it's efficient, because catching problems early is cheaper than fixing them later. The things you build don't have hidden flaws waiting to emerge.

People trust your builds because your care is visible in the results. The construction that doesn't fail under load. The system that performs as specified. The work that stands up to scrutiny. Your careful building produces quality that speaks for itself.`,

    blindSpot:
      'Your care can prevent completion. At some point, good enough is good enough.',

    blindSpotExpanded: `Perfect is the enemy of done.

Your careful questioning can prevent you from ever declaring something finished. There's always more to check, another assumption to verify, another test to run. But at some point, the value of shipping exceeds the value of additional care.

There's also the opportunity cost. Time spent perfecting one build is time not spent starting the next. Your careful approach produces excellent individual results but may limit total output over time.`,

    coreBeliefs: [
      'Quality in construction prevents crisis in operation',
      'Careful building is efficient building—problems caught early cost less',
      'The careful builder questions everything, trusts nothing without verification',
      'Good work speaks for itself, but only if it gets finished',
    ],

    howYouGotHere:
      'Your answers showed hands-on building combined with extraordinary care for quality. You make things, and you make them right. This maps to the Careful Builder.',

    alignsWith:
      'other Careful types—you share the deep attention to quality, the questioning of assumptions',
    tensionWith:
      "Bold types—their speed can feel like carelessness, like they're creating problems for later",
    growsWith:
      'Confident types—they help you trust your careful work enough to ship it before it feels perfect',

    books: [
      {
        title: 'The Martian',
        author: 'Weir',
        reason:
          'Survival through meticulous problem-solving. Every repair must be perfect when your life depends on it.',
      },
      {
        title: 'Project Hail Mary',
        author: 'Weir',
        reason:
          'Careful engineering saves humanity. Building with care when failure means extinction.',
      },
      {
        title: 'Rendezvous with Rama',
        author: 'Clarke',
        reason:
          'Exploring technology built with incomprehensible precision. Quality that transcends understanding.',
      },
    ],

    famousFigures: {
      real: ['James Dyson', 'Jiro Ono', 'Temple Grandin'],
      fictional: [
        'Scotty (Star Trek)',
        'Q (James Bond)',
        'Lucius Fox (Batman)',
      ],
    },
  },

  'cautious-builder': {
    key: 'cautious-builder',
    name: 'Cautious Builder',
    color: '#747ce7',
    noun: 'builder',
    adjective: 'cautious',
    quadrant: 'seeking-protective',

    utopia:
      'Their utopia was built to code. Nothing was rushed; nothing was skipped.',

    description:
      "You build with awareness of what could go wrong, letting that awareness inform your construction without paralyzing it. Your caution produces builds that account for risk rather than ignoring it.",

    pull: 'toward safe construction',
    edge: 'you build things that account for the failures others ignore',
    oneSentence:
      "You build with caution that serves quality, knowing that awareness of what could go wrong makes construction better.",

    superpower: 'risk-informed building',
    superpowerExpanded: `You build with eyes open to what could fail.

Your construction process includes risk awareness. You don't just think about how things should work; you think about how they could break. This dual awareness produces builds that are robust where they need to be, with appropriate margins for error.

This makes you trustworthy for important work. When something needs to not fail, people want a cautious builder—someone who has thought about the failure modes and built defenses against them.`,

    blindSpot:
      "Your caution can slow necessary progress. Not everything needs the same level of protective attention.",

    blindSpotExpanded: `Caution has costs.

Your risk-aware building produces robust results, but it also takes more time and resources. Not every build needs the same level of caution. Sometimes "good enough" really is good enough, and your caution is protecting against risks that don't matter.

There's also the danger of caution creep. If one cautious step prevents one problem, maybe two cautious steps prevent two problems? This reasoning leads to ever-increasing overhead that eventually crushes the building itself.`,

    coreBeliefs: [
      'Cautious building is smart building—it accounts for reality',
      'Risk awareness should inform construction, not prevent it',
      'The cautious builder builds appropriate protection, not maximum protection',
      'What could fail is as important as what should work',
    ],

    howYouGotHere:
      'Your answers showed hands-on building combined with awareness of risk. You construct with your eyes open to what could go wrong. This maps to the Cautious Builder.',

    alignsWith:
      'other Protective types—you share the orientation toward risk, toward building safeguards into what you create',
    tensionWith:
      "Bold types—their confident building can feel like they're ignoring risks that matter",
    growsWith:
      'Open types—they help you distinguish between risks worth protecting against and risks you can accept',

    books: [
      {
        title: 'Gateway',
        author: 'Pohl',
        reason:
          'Technology with unknown risks. Building with alien machines that might kill you.',
      },
      {
        title: 'Ringworld',
        author: 'Niven',
        reason:
          'Engineering at impossible scale. What happens when megastructures fail?',
      },
      {
        title: 'Tau Zero',
        author: 'Anderson',
        reason:
          'Building under pressure as the universe dies around you. Cautious action when there\'s no margin for error.',
      },
    ],

    famousFigures: {
      real: ['Gene Kranz', 'Dieter Rams', 'Issey Miyake'],
      fictional: [
        'Samwise Gamgee (Lord of the Rings)',
        'Alfred Pennyworth (Batman)',
        'Garnet (Steven Universe)',
      ],
    },
  },

  'measured-builder': {
    key: 'measured-builder',
    name: 'Measured Builder',
    color: '#98a2f5',
    noun: 'builder',
    adjective: 'measured',
    quadrant: 'seeking-protective',

    utopia:
      'Their utopia was built in phases. Each stage was solid before the next began.',

    description:
      "You build at a pace that serves quality, neither rushing nor dawdling. Your measured approach produces reliable progress—predictable, sustainable, and ultimately effective.",

    pull: 'toward sustainable construction',
    edge: 'you build at the pace that produces the best long-term results',
    oneSentence:
      'You build with measured pace and scope, knowing that sustainable construction outlasts heroic sprints.',

    superpower: 'reliable construction',
    superpowerExpanded: `You build at a pace you can sustain.

Your measured approach means your builds progress steadily without burnout or collapse. You don't promise what you can't deliver, and you deliver what you promise. This reliability compounds over time into significant achievement.

Teams value your measured building because they can count on it. Your estimates are realistic, your progress is steady, your work is dependable. In a world of unreliable promises, your measured reliability is rare and valuable.`,

    blindSpot:
      'Your measured pace can become comfortable limitation. Sometimes construction needs to accelerate beyond sustainable pace.',

    blindSpotExpanded: `Measured isn't always appropriate.

Your sustainable pace serves you well usually—but some situations require unsustainable bursts. The deadline that can't move. The opportunity with an expiration date. Your measured approach can be a liability when speed matters more than sustainability.

There's also the question of what "measured" is measured against. If your baseline is conservative, your measured pace might be unnecessarily slow. Recalibrating occasionally ensures your measured approach stays appropriate.`,

    coreBeliefs: [
      'Sustainable building produces more than heroic sprints',
      'Measured pace enables measured quality',
      'Reliable progress compounds into significant achievement',
      'The measured builder finishes what they start',
    ],

    howYouGotHere:
      'Your answers showed hands-on building combined with sustainable, steady approach. You construct reliably at an appropriate pace. This maps to the Measured Builder.',

    alignsWith:
      'other Measured types—you share the balanced approach, the steady progress toward worthwhile goals',
    tensionWith:
      'Adaptive types—their frequent changes can feel like lack of commitment to seeing things through',
    growsWith:
      'Bold types—they push you to occasionally exceed your measured limits, discovering what else is possible',

    books: [
      {
        title: 'Aurora',
        author: 'Robinson',
        reason:
          'A generation ship\'s steady journey. Sustainable building across centuries.',
      },
      {
        title: 'The Long Way to a Small, Angry Planet',
        author: 'Chambers',
        reason:
          'A crew that builds and maintains together. Measured work that sustains community.',
      },
      {
        title: 'Becky Chambers\' Monk and Robot',
        author: 'Chambers',
        reason:
          'Small, sustainable building. Finding peace in measured progress.',
      },
    ],

    famousFigures: {
      real: ['Cal Newport', 'Angela Duckworth', 'Tom Hanks'],
      fictional: [
        'Marge Simpson (The Simpsons)',
        'Leslie Knope (Parks and Recreation)',
        'Bob Belcher (Bob\'s Burgers)',
      ],
    },
  },

  // =============================================================================
  // MAKER identities (mid-high agency)
  // =============================================================================

  'careful-maker': {
    key: 'careful-maker',
    name: 'Careful Maker',
    color: '#4b4ecf',
    noun: 'maker',
    adjective: 'careful',
    quadrant: 'seeking-protective',

    utopia:
      'Their utopia values objects made with care. Craft quality is honored.',

    description:
      "You make with extraordinary attention, each piece receiving the care it deserves. Your questioning nature examines every step of your craft, ensuring nothing is done carelessly.",

    pull: 'toward meticulous craft',
    edge: 'you make things with care that shows in every detail',
    oneSentence:
      'You make with care that borders on devotion, because objects made carelessly carry that carelessness into the world.',

    superpower: 'devoted craft',
    superpowerExpanded: `You give your making the attention it deserves.

Your care is visible in your work. The clean joints. The considered materials. The attention to details that nobody will consciously notice but everyone will unconsciously feel. This devotion to craft produces objects that matter.

People seek your making because they can see the care in it. The gift that's more than its function. The object that says "someone cared about this." Your careful making imbues physical things with meaning.`,

    blindSpot:
      "Your care can become obsessive. At some point, additional attention doesn't improve the work—it just delays it.",

    blindSpotExpanded: `Care has diminishing returns.

Your deep attention to craft can extend indefinitely. There's always another detail to attend to, another way to improve. But at some point, the making needs to end. Your care can prevent the completion that allows your work to actually enter the world.

There's also the danger of care becoming control. Making with care is about serving the work. Making with too much care can become about serving your own need for control.`,

    coreBeliefs: [
      'Care in making shows in the made',
      'Objects carry the attention given to them',
      'Careful craft is an expression of respect—for materials, for use, for the world',
      'What deserves making deserves care in making',
    ],

    howYouGotHere:
      'Your answers showed hands-on making combined with deep care for the work. You craft with attention that shows in results. This maps to the Careful Maker.',

    alignsWith:
      'other Careful types—you share the deep attention to quality, the commitment to doing work right',
    tensionWith:
      "Bold types—their rapid making can feel careless, like they don't respect the craft",
    growsWith:
      'Open types—they help you recognize when perfect becomes the enemy of done',

    books: [
      {
        title: 'The Diamond Age',
        author: 'Stephenson',
        reason:
          'Nanotechnology crafting with care. The Primer as devotional making.',
      },
      {
        title: 'Piranesi',
        author: 'Clarke',
        reason:
          'Careful attention to a strange world. Making meaning through devoted observation.',
      },
      {
        title: 'A Wizard of Earthsea',
        author: 'Le Guin',
        reason:
          'Magic requires care and naming. Power flows from attention to detail.',
      },
    ],

    famousFigures: {
      real: ['Ruth Bader Ginsburg', 'Maira Kalman', 'Yayoi Kusama'],
      fictional: [
        'Monica Geller (Friends)',
        'Tiana (The Princess and the Frog)',
        'Chidi Anagonye (The Good Place)',
      ],
    },
  },

  'cautious-maker': {
    key: 'cautious-maker',
    name: 'Cautious Maker',
    color: '#676cd6',
    noun: 'maker',
    adjective: 'cautious',
    quadrant: 'seeking-protective',

    utopia:
      'Their utopia values durability. Objects are made to last.',

    description:
      "You make with awareness of risk and failure, creating objects that account for how things go wrong. Your caution isn't timidity—it's the maker's understanding that objects face stress, use, and time.",

    pull: 'toward durable craft',
    edge: 'you make things that hold up because you thought about how they might not',
    oneSentence:
      'You make with caution that serves durability, creating objects that anticipate the stresses they will face.',

    superpower: 'stress-tested craft',
    superpowerExpanded: `You make things that hold up.

Your cautious approach means you think about failure modes even as you craft. Where will this wear? What stress will this face? How might this break? This questioning produces objects that are robust in the places they need to be.

People trust what you make because it doesn't fail unexpectedly. Your cautious making has anticipated the stresses and built appropriate strength into the design.`,

    blindSpot:
      'Your caution can overengineer. Not every object needs maximum durability.',

    blindSpotExpanded: `More robust isn't always better.

Your attention to potential failures can lead you to overbuild—adding weight, complexity, and cost to protect against risks that may never materialize. Sometimes something that lasts two years is better than something that lasts twenty, if the context calls for it.

There's also aesthetic cost. Robustness can conflict with elegance. Your cautious making might produce sturdy objects that lack the lightness or grace that less cautious makers achieve.`,

    coreBeliefs: [
      'Made objects should account for the stresses they will face',
      'Cautious making serves users by anticipating failures',
      'Durability is a form of respect for materials and makers',
      'What breaks easily was made carelessly',
    ],

    howYouGotHere:
      'Your answers showed hands-on making combined with awareness of how things fail. You craft with durability in mind. This maps to the Cautious Maker.',

    alignsWith:
      'other Cautious types—you share the awareness of risk, the thinking about what could go wrong',
    tensionWith:
      "Adaptive types—their experimental making can feel reckless, like they don't respect durability",
    growsWith:
      'Confident types—they help you distinguish between necessary caution and excessive protection',

    books: [
      {
        title: 'Anathem',
        author: 'Stephenson',
        reason:
          'Knowledge preserved across millennia. Making that endures through careful tradition.',
      },
      {
        title: 'A Canticle for Leibowitz',
        author: 'Miller',
        reason:
          'Monks preserve technology through dark ages. Durable making as sacred duty.',
      },
      {
        title: 'Flowers for Algernon',
        author: 'Keyes',
        reason:
          'The consequences of making without full understanding. Caution in creation.',
      },
    ],

    famousFigures: {
      real: ['Yvon Chouinard', 'Dieter Rams', 'Isamu Noguchi'],
      fictional: [
        'Kaylee Frye (Firefly)',
        'Fix-It Felix Jr. (Wreck-It Ralph)',
        'Hiro Hamada (Big Hero 6)',
      ],
    },
  },

  'measured-maker': {
    key: 'measured-maker',
    name: 'Measured Maker',
    color: '#8b90ee',
    noun: 'maker',
    adjective: 'measured',
    quadrant: 'seeking-protective',

    utopia:
      'Their utopia values craft traditions. New making builds on old wisdom.',

    description:
      "You make with balanced judgment, neither rushing nor overthinking. Your measured approach produces reliable craft—consistent, appropriate, and ultimately satisfying.",

    pull: 'toward consistent craft',
    edge: 'you make reliably, producing work you can count on',
    oneSentence:
      'You make with measured consistency, producing reliable craft that accumulates into a body of work worth having.',

    superpower: 'consistent making',
    superpowerExpanded: `Your making is reliably good.

Your measured approach means your work maintains consistent quality. You don't oscillate between brilliance and failure; you produce dependable results. This consistency is valuable—people know what to expect from you.

Over time, consistent making compounds into significant achievement. The measured maker who produces reliably accumulates a body of work that inconsistent brilliant makers often don't.`,

    blindSpot:
      'Your consistency can become rut. Measured making can miss the breakthrough that requires unmeasured commitment.',

    blindSpotExpanded: `Reliable isn't always remarkable.

Your consistent craft produces predictable quality—but remarkable often requires unpredictable. The breakthrough piece that defines a career might require abandoning your measured approach temporarily, risking failure for the chance at transcendence.

There's also the question of growth. Measured making can become comfortable making. If you're not occasionally stretching beyond your measured capacity, you might not be developing.`,

    coreBeliefs: [
      'Consistent making compounds into significant achievement',
      'Measured craft is sustainable craft',
      'Reliability is its own form of excellence',
      'The measured maker finishes what they start',
    ],

    howYouGotHere:
      'Your answers showed hands-on making combined with balanced, consistent approach. You craft reliably over time. This maps to the Measured Maker.',

    alignsWith:
      'other Measured types—you share the balanced approach, the sustainable pace toward worthwhile goals',
    tensionWith:
      'Adaptive types—their experimental making can feel inconsistent, lacking the reliability of committed craft',
    growsWith:
      'Bold types—they encourage you to occasionally exceed your measured limits, discovering what else is possible',

    books: [
      {
        title: 'Stories of Your Life and Others',
        author: 'Chiang',
        reason:
          'Measured, precise stories about creation and consequence. Craft elevated to philosophy.',
      },
      {
        title: 'Exhalation',
        author: 'Chiang',
        reason:
          'Thoughtful making in worlds with strange rules. Consistency across varied forms.',
      },
      {
        title: 'The Paper Menagerie and Other Stories',
        author: 'Liu',
        reason:
          'Making imbued with care and meaning. Small creations that carry weight.',
      },
    ],

    famousFigures: {
      real: ['Julia Child', 'Bob Ross', 'Ruth Reichl'],
      fictional: [
        'Colette Tatou (Ratatouille)',
        'Rapunzel (Tangled)',
        'Mr. Rogers',
      ],
    },
  },

  // =============================================================================
  // SHAPER identities (mid agency)
  // =============================================================================

  'careful-shaper': {
    key: 'careful-shaper',
    name: 'Careful Shaper',
    color: '#3f42be',
    noun: 'shaper',
    adjective: 'careful',
    quadrant: 'seeking-protective',

    utopia:
      'Their utopia was reshaped gradually. Change built on what worked.',

    description:
      "You reshape what exists with extraordinary care, considering the risks of transformation before acting. Your questioning nature asks what could go wrong with proposed changes, while your protective instinct ensures you don't break what works.",

    pull: 'toward safe transformation',
    edge: 'you reshape without breaking what deserves preservation',
    oneSentence:
      'You shape change carefully, transforming what needs to evolve while protecting what needs to endure.',

    superpower: 'protective transformation',
    superpowerExpanded: `You change things without breaking them.

Your careful approach to reshaping means you understand what you're working with before you change it. You identify what must be preserved, what can be modified, and what should be transformed. This care produces change that sticks because it doesn't trigger unnecessary resistance.

People trust you with things they value because you won't carelessly destroy what works. Your careful shaping enables transformation that protective stakeholders can accept.`,

    blindSpot:
      'Your care can prevent necessary disruption. Sometimes transformation requires breaking things.',

    blindSpotExpanded: `Not everything worth preserving deserves preservation.

Your protective instinct can become over-protective. Sometimes what needs to happen is genuine disruption—breaking what exists to make space for what needs to come. Your careful shaping might be too careful, preserving things that should be let go.

There's also the pace problem. Careful transformation is slow transformation. When change needs to happen faster than your careful approach allows, your care becomes obstacle.`,

    coreBeliefs: [
      'Good transformation preserves what deserves preservation',
      'Care in shaping prevents unnecessary destruction',
      'Understanding before changing produces better change',
      'Protective shaping enables change by making it safe',
    ],

    howYouGotHere:
      'Your answers showed willingness to transform combined with deep care about preserving what works. You reshape thoughtfully. This maps to the Careful Shaper.',

    alignsWith:
      'other Protective types—you share the orientation toward preservation, toward not breaking what works',
    tensionWith:
      "Bold types—their disruptive shaping can feel careless, like they don't value what they're breaking",
    growsWith:
      'Confident types—they help you trust your shaping enough to move faster when needed',

    books: [
      {
        title: 'Parable of the Sower',
        author: 'Butler',
        reason:
          'Building community through collapse. Protective transformation amid chaos.',
      },
      {
        title: 'Station Eleven',
        author: 'Mandel',
        reason:
          'Preserving civilization while the world changes. What deserves to survive.',
      },
      {
        title: 'The Fifth Season',
        author: 'Jemisin',
        reason:
          'Power used for protection. Shaping forces that could destroy you.',
      },
    ],

    famousFigures: {
      real: ['John Lewis', 'Angela Merkel', 'Jacinda Ardern'],
      fictional: [
        'Jean-Luc Picard (Star Trek)',
        'Mufasa (The Lion King)',
        "T'Challa (Black Panther)",
      ],
    },
  },

  'cautious-shaper': {
    key: 'cautious-shaper',
    name: 'Cautious Shaper',
    color: '#5a5cc5',
    noun: 'shaper',
    adjective: 'cautious',
    quadrant: 'seeking-protective',

    utopia:
      'Their utopia evolved with safeguards. Transformation included fallbacks.',

    description:
      "You reshape with awareness of risk, letting that awareness inform your transformation without paralyzing it. Your caution produces shaping that accounts for what could go wrong.",

    pull: 'toward risk-aware change',
    edge: 'you shape transformation with eyes open to potential failures',
    oneSentence:
      'You shape change cautiously, aware of risks and ready with fallbacks when transformation goes sideways.',

    superpower: 'fail-safe transformation',
    superpowerExpanded: `You change things with fallbacks in place.

Your cautious shaping includes contingency planning. If this transformation doesn't work, what's plan B? If this change causes problems, how do we reverse it? This risk-awareness produces change that's safer to attempt.

People are more willing to accept transformation when a cautious shaper is guiding it. Your awareness of risks and preparation for problems makes change feel less risky.`,

    blindSpot:
      'Your caution can shrink ambition. If you only attempt changes with clear fallbacks, you might miss transformations worth the risk.',

    blindSpotExpanded: `Some changes can't be made safely.

Your requirement for fallbacks can filter out transformations that don't have them. But some of the most important changes are one-way doors—you can't go back. Your caution might prevent you from attempting changes that are worth the irreversibility.

There's also the cost of preparation. Building fallbacks takes resources. Your cautious approach might spend so much on contingencies that the transformation itself is under-resourced.`,

    coreBeliefs: [
      'Wise transformation accounts for potential failure',
      'Fallbacks enable bolder change by making it safer',
      'Cautious shaping serves ambition by reducing risk',
      'Risk awareness should inform change, not prevent it',
    ],

    howYouGotHere:
      'Your answers showed willingness to transform combined with awareness of risk. You shape change with fallbacks and contingencies. This maps to the Cautious Shaper.',

    alignsWith:
      'other Cautious types—you share the awareness of risk, the preparation for what could go wrong',
    tensionWith:
      'Bold types—their confident transformation can feel reckless, like they haven\'t thought through what could fail',
    growsWith:
      'Assured types—they help you trust your preparation enough to attempt bigger transformations',

    books: [
      {
        title: 'Kindred',
        author: 'Butler',
        reason:
          'Navigating dangerous transformation. Survival through cautious action.',
      },
      {
        title: 'An Unkindness of Ghosts',
        author: 'Solomon',
        reason:
          'Resistance on a generation ship. Careful rebellion with fallback plans.',
      },
      {
        title: 'The Power',
        author: 'Alderman',
        reason:
          'Transformation with unintended consequences. Change that requires caution.',
      },
    ],

    famousFigures: {
      real: ['Janet Yellen', 'Christine Lagarde', 'Tim Cook'],
      fictional: [
        'Hermione Granger (Harry Potter)',
        'Okoye (Black Panther)',
        'The Mandalorian',
      ],
    },
  },

  'measured-shaper': {
    key: 'measured-shaper',
    name: 'Measured Shaper',
    color: '#7e7ee7',
    noun: 'shaper',
    adjective: 'measured',
    quadrant: 'seeking-protective',

    utopia:
      'Their utopia changed at the pace it could absorb. Transformation was sustainable.',

    description:
      "You reshape with balanced judgment, moving at the pace change can sustain. Your measured approach produces transformation that's neither too fast nor too slow—appropriate to what's being changed.",

    pull: 'toward sustainable change',
    edge: 'you shape transformation at the pace that produces lasting results',
    oneSentence:
      'You shape change with measured pace, knowing that sustainable transformation outlasts revolutionary disruption.',

    superpower: 'paced transformation',
    superpowerExpanded: `You change things at the speed they can handle.

Your measured approach calibrates the pace of transformation to the capacity for change. Too fast and you trigger resistance; too slow and you lose momentum. Your balanced judgment finds the sustainable pace.

This makes your transformations stick. Because you didn't push faster than systems could absorb, the changes you make integrate rather than reject. Your measured shaping produces lasting change.`,

    blindSpot:
      'Your measured pace can be too slow. Sometimes transformation needs to outpace the sustainable speed.',

    blindSpotExpanded: `Sustainable pace isn't always possible.

Your commitment to transformation at absorb-able speed assumes that speed is available. But sometimes circumstances demand faster change than systems can easily handle. Crisis, competition, opportunity windows—these don't wait for sustainable pace.

There's also the question of what "sustainable" really means. If your baseline is conservative, your measured pace might be unnecessarily slow. Occasionally testing your assumptions about what pace is sustainable keeps your shaping appropriately calibrated.`,

    coreBeliefs: [
      'Sustainable transformation outlasts revolutionary disruption',
      'Measured shaping respects the capacity for change',
      'Pace should match what can be absorbed',
      'The measured shaper serves lasting change, not dramatic change',
    ],

    howYouGotHere:
      'Your answers showed willingness to transform combined with balanced judgment about pace. You shape change sustainably. This maps to the Measured Shaper.',

    alignsWith:
      'other Measured types—you share the balanced approach, the sustainable pace toward worthwhile goals',
    tensionWith:
      'Adaptive types—their rapid reshaping can feel destabilizing, like change for its own sake',
    growsWith:
      'Bold types—they push you to occasionally accelerate beyond your measured pace, discovering what faster change enables',

    books: [
      {
        title: 'Ministry for the Future',
        author: 'Robinson',
        reason:
          'Measured planetary transformation. Change at the pace civilization can absorb.',
      },
      {
        title: 'New York 2140',
        author: 'Robinson',
        reason:
          'Cities adapting to climate change. Gradual transformation that preserves community.',
      },
      {
        title: 'The Tombs of Atuan',
        author: 'Le Guin',
        reason:
          'Personal transformation at sustainable pace. Finding freedom through measured change.',
      },
    ],

    famousFigures: {
      real: ['Barack Obama', 'Satya Nadella', 'Ruth Bader Ginsburg'],
      fictional: [
        'Iroh (Avatar: The Last Airbender)',
        'Dumbledore (Harry Potter)',
        'Mary Poppins',
      ],
    },
  },

  // =============================================================================
  // OBSERVER identities (mid-low agency)
  // =============================================================================

  'careful-observer': {
    key: 'careful-observer',
    name: 'Careful Observer',
    color: '#3336ad',
    noun: 'observer',
    adjective: 'careful',
    quadrant: 'seeking-protective',

    utopia:
      'Their utopia values accurate observation. Nothing important is missed.',

    description:
      "You observe with extraordinary care, catching details that hasty attention misses. Your questioning nature examines what you see, ensuring your observations are accurate rather than assumed.",

    pull: 'toward accurate seeing',
    edge: 'you observe with care that catches what others miss',
    oneSentence:
      'You observe carefully, knowing that accurate perception is the foundation of good judgment.',

    superpower: 'verified perception',
    superpowerExpanded: `You see things accurately.

Your careful observation doesn't assume—it verifies. You question your first impressions, look again at what you thought you saw, check your observations against other evidence. This care produces perception you can trust.

People value your careful seeing because you don't report assumptions as observations. When you say you saw something, you actually saw it. This reliability makes your observations worth acting on.`,

    blindSpot:
      'Your careful observation can miss the big picture. Sometimes understanding requires stepping back from detailed verification.',

    blindSpotExpanded: `Care about details can obscure patterns.

Your attention to accurate observation can focus you on trees while missing forests. The careful examination of each element might not add up to understanding of the whole. Sometimes less careful, more sweeping observation reveals what detailed scrutiny cannot.

There's also the time cost. Careful observation is slow observation. In situations that require rapid assessment, your careful approach might take longer than available.`,

    coreBeliefs: [
      'Accurate observation requires verification, not assumption',
      'Careful seeing is the foundation of sound judgment',
      'What you think you saw and what you actually saw are different questions',
      'The careful observer serves truth by not rushing it',
    ],

    howYouGotHere:
      'Your answers showed observational orientation combined with extraordinary care for accuracy. You see things carefully and verify what you observe. This maps to the Careful Observer.',

    alignsWith:
      'other Careful types—you share the deep attention to accuracy, the questioning of assumptions',
    tensionWith:
      "Bold types—their quick assessments can feel careless, like they haven't really looked",
    growsWith:
      'Confident types—they help you trust your observations enough to act on them sooner',

    books: [
      {
        title: 'Solaris',
        author: 'Lem',
        reason:
          'Careful scientific observation of the unknowable. Verification pushed to its limits.',
      },
      {
        title: 'Blindsight',
        author: 'Watts',
        reason:
          'Questioning the nature of observation itself. What does it mean to really see?',
      },
      {
        title: 'Story of Your Life',
        author: 'Chiang',
        reason:
          'Observation as understanding. Seeing patterns that change everything.',
      },
    ],

    famousFigures: {
      real: ['Rachel Carson', 'E.O. Wilson', 'Temple Grandin'],
      fictional: [
        'Sherlock Holmes',
        'Dr. Watson',
        'Clarice Starling (Silence of the Lambs)',
      ],
    },
  },

  'cautious-observer': {
    key: 'cautious-observer',
    name: 'Cautious Observer',
    color: '#4d4cb4',
    noun: 'observer',
    adjective: 'cautious',
    quadrant: 'seeking-protective',

    utopia:
      'Their utopia observes before acting. Perception precedes intervention.',

    description:
      "You observe with awareness of how perception can mislead, approaching what you see with appropriate skepticism. Your caution produces observation that accounts for its own limitations.",

    pull: 'toward humble perception',
    edge: 'you observe with awareness of how observation can go wrong',
    oneSentence:
      'You observe cautiously, knowing that perception can deceive and first impressions can mislead.',

    superpower: 'skeptical observation',
    superpowerExpanded: `You question what you observe.

Your cautious observation includes awareness of perceptual limitations. You know that you might be seeing what you expect to see, might be missing what's actually there, might be interpreting through biased frames. This awareness produces more reliable observation.

People value your cautious seeing because you report uncertainty alongside observation. You don't just tell them what you saw—you tell them how confident you are in that seeing. This calibrated reporting enables better decisions.`,

    blindSpot:
      'Your caution about perception can become paralysis. At some point, you have to act on what you observe despite uncertainty.',

    blindSpotExpanded: `Uncertainty never completely resolves.

Your awareness of perceptual limitations can prevent you from trusting any observation enough to act on it. But perfect observation is impossible—at some point, you have to work with imperfect perception. Your caution can delay necessary action indefinitely.

There's also the social cost. Constantly qualifying your observations with uncertainty can make you seem unreliable, even though the opposite is true. Learning to present cautious observations confidently is a skill worth developing.`,

    coreBeliefs: [
      'Observation can deceive—approach it with appropriate skepticism',
      'Knowing the limits of your perception serves truth',
      'Cautious observation reports uncertainty alongside observation',
      'The cautious observer serves reliability by acknowledging unreliability',
    ],

    howYouGotHere:
      'Your answers showed observational orientation combined with awareness of perceptual limits. You see things while questioning your own seeing. This maps to the Cautious Observer.',

    alignsWith:
      'other Cautious types—you share the awareness of how things can go wrong, even in perception',
    tensionWith:
      "Confident types—their certain observations can feel overconfident, like they haven't questioned their own seeing",
    growsWith:
      'Assured types—they help you trust your observations enough to share them without excessive qualification',

    books: [
      {
        title: 'Annihilation',
        author: 'VanderMeer',
        reason:
          'Observation of the unknowable. When what you see might not be real.',
      },
      {
        title: 'The Book of the New Sun',
        author: 'Wolfe',
        reason:
          'Unreliable observation elevated to art. Question everything you think you see.',
      },
      {
        title: 'Dark Intelligence',
        author: 'Asher',
        reason:
          'Watching AI with appropriate skepticism. Cautious observation of powerful forces.',
      },
    ],

    famousFigures: {
      real: ['Daniel Kahneman', 'Philip Tetlock', 'Annie Duke'],
      fictional: [
        'Spock (Star Trek)',
        'Detective Loki (Prisoners)',
        'Dr. House (House)',
      ],
    },
  },

  'measured-observer': {
    key: 'measured-observer',
    name: 'Measured Observer',
    color: '#716cdf',
    noun: 'observer',
    adjective: 'measured',
    quadrant: 'seeking-protective',

    utopia:
      'Their utopia balances observation with action. Perception serves decision.',

    description:
      "You observe with balanced judgment, neither rushing to conclusions nor endlessly deferring them. Your measured approach produces observation that leads to timely, appropriate action.",

    pull: 'toward actionable observation',
    edge: 'you observe enough to act wisely, without observing forever',
    oneSentence:
      'You observe with measured judgment, gathering what you need to know in the time available.',

    superpower: 'practical observation',
    superpowerExpanded: `You observe enough to decide.

Your measured approach calibrates observation to decision needs. You don't observe more than necessary, but you don't observe less than required. This practical orientation produces observation that actually serves action.

People value your measured observation because it's actionable. You don't give them endless data without synthesis or rush to conclusions without sufficient observation. You find the balance that serves practical needs.`,

    blindSpot:
      'Your practical orientation can miss insight that emerges from extended observation. Sometimes looking longer reveals what measured observation cannot.',

    blindSpotExpanded: `Measured can be shallow.

Your calibration of observation to decision needs means you stop observing when you have "enough." But some understanding only emerges from observation that exceeds practical necessity. The insight that changes everything might require looking longer than your measured approach allows.

There's also the question of what counts as "enough." If your baseline is conservative, you might systematically observe less than optimal. Occasionally extending observation beyond your measured limits can recalibrate your judgment.`,

    coreBeliefs: [
      'Observation should serve action, not postpone it indefinitely',
      'Measured observation balances thoroughness with timeliness',
      'Practical seeing is wise seeing—it gives decisions what they need',
      'The measured observer serves decision-making by observing appropriately',
    ],

    howYouGotHere:
      'Your answers showed observational orientation combined with practical, balanced judgment. You observe enough to decide wisely. This maps to the Measured Observer.',

    alignsWith:
      'other Measured types—you share the balanced approach, the practical orientation toward action',
    tensionWith:
      'Adaptive types—their constantly shifting observation can feel unfocused, observing without concluding',
    growsWith:
      'Curious types—they encourage you to occasionally observe beyond practical necessity, discovering what extended attention reveals',

    books: [
      {
        title: 'Contact',
        author: 'Sagan',
        reason:
          'Measured scientific observation meets the unknown. Practical seeing of the impossible.',
      },
      {
        title: 'The Calculating Stars',
        author: 'Kowal',
        reason:
          'Observation for decision-making. Practical perception when stakes are high.',
      },
      {
        title: 'The Sparrow',
        author: 'Russell',
        reason:
          'First contact approached with measured care. Observation with appropriate humility.',
      },
    ],

    famousFigures: {
      real: ['Atul Gawande', 'Angela Duckworth', 'Adam Grant'],
      fictional: [
        'Captain Janeway (Star Trek: Voyager)',
        'Minerva McGonagall (Harry Potter)',
        'Moana',
      ],
    },
  },

  // =============================================================================
  // NOTICER identities (low agency)
  // =============================================================================

  'careful-noticer': {
    key: 'careful-noticer',
    name: 'Careful Noticer',
    color: '#272a9c',
    noun: 'noticer',
    adjective: 'careful',
    quadrant: 'seeking-protective',

    utopia:
      'Their utopia honors the overlooked. Small things receive the attention they deserve.',

    description:
      "You notice with extraordinary care, catching small things that hasty attention misses. Your questioning nature examines what you notice, ensuring you're seeing accurately rather than projecting.",

    pull: 'toward verified noticing',
    edge: 'you notice small things with care that confirms their reality',
    oneSentence:
      'You notice carefully, giving small things the attention they deserve and verifying what you see.',

    superpower: 'attentive verification',
    superpowerExpanded: `You notice and you verify.

Your careful attention catches small things and then checks them. Did I actually see that, or did I imagine it? Is that pattern real or am I creating it? This questioning produces noticing you can trust.

People value your careful noticing because you don't report projections as perceptions. When you say you noticed something, you actually noticed it. This reliability makes your small observations worth attending to.`,

    blindSpot:
      'Your careful noticing can become obsessive. Not every small thing deserves the attention you give it.',

    blindSpotExpanded: `Care has diminishing returns.

Your deep attention to small things can extend indefinitely. There's always more to notice, always more to verify. But at some point, the noticing needs to mean something. Your careful attention can become an end in itself rather than a means to understanding.

There's also the selectivity question. Noticing everything carefully is impossible. Your care for what you do notice might mean missing other things equally worthy of attention.`,

    coreBeliefs: [
      'Small things deserve careful attention',
      'Verified noticing serves truth better than assumed noticing',
      'The careful noticer honors what hasty attention overlooks',
      'What you notice reflects what you value—value carefully',
    ],

    howYouGotHere:
      'Your answers showed attention to detail combined with extraordinary care for accuracy. You notice small things and verify them. This maps to the Careful Noticer.',

    alignsWith:
      'other Careful types—you share the deep attention to accuracy, the commitment to verified perception',
    tensionWith:
      "Bold types—their quick attention can feel careless, like they aren't really noticing",
    growsWith:
      'Open types—they help you notice more broadly, accepting some things without extensive verification',

    books: [
      {
        title: 'Dark Matter',
        author: 'Crouch',
        reason:
          'Noticing small differences across realities. The details that reveal truth.',
      },
      {
        title: 'Recursion',
        author: 'Crouch',
        reason:
          'Attention to memory\'s details. Careful noticing when reality shifts.',
      },
      {
        title: 'The Long Earth',
        author: 'Pratchett & Baxter',
        reason:
          'Noticing across infinite worlds. Small differences that matter.',
      },
    ],

    famousFigures: {
      real: ['Mary Oliver', 'Annie Dillard', 'Ross Gay'],
      fictional: [
        'Miss Marple (Agatha Christie)',
        'Harriet the Spy',
        'Luna Lovegood (Harry Potter)',
      ],
    },
  },

  'cautious-noticer': {
    key: 'cautious-noticer',
    name: 'Cautious Noticer',
    color: '#403ca3',
    noun: 'noticer',
    adjective: 'cautious',
    quadrant: 'seeking-protective',

    utopia:
      'Their utopia catches warning signs early. Small signals prevent big problems.',

    description:
      "You notice with awareness of what small things might signal, catching early warnings that others miss. Your protective instinct pays attention to what could indicate trouble.",

    pull: 'toward warning signals',
    edge: 'you notice small things that suggest bigger problems',
    oneSentence:
      'You notice cautiously, catching small signals that warn of bigger things to come.',

    superpower: 'early warning detection',
    superpowerExpanded: `You notice what signals trouble.

Your cautious attention is tuned to warning signs. The small change that might indicate a bigger shift. The subtle signal that something's wrong. The detail that doesn't fit the pattern. Your noticing catches these early warnings.

People value your cautious noticing because you catch problems early. What you notice today might prevent crisis tomorrow. Your attention to small warning signs serves larger protection.`,

    blindSpot:
      "Your cautious noticing can become anxious vigilance. Not every small thing is a warning sign.",

    blindSpotExpanded: `Warning-focused attention can find warnings everywhere.

Your orientation toward catching problems can create them where they don't exist. If you're always looking for warning signs, you might start interpreting neutral signals as threats. This hypervigilance exhausts you and can exhaust others.

There's also the cost of negativity. Noticing primarily through a warning-sign lens can produce a skewed picture of reality—seeing dangers but missing delights.`,

    coreBeliefs: [
      'Small signals often precede big changes—notice them early',
      'Cautious noticing serves protection by catching warnings',
      'What doesn\'t fit the pattern deserves attention',
      'Early warning detection prevents later crisis',
    ],

    howYouGotHere:
      'Your answers showed attention to detail combined with awareness of risk. You notice small things that might indicate bigger problems. This maps to the Cautious Noticer.',

    alignsWith:
      'other Protective types—you share the orientation toward risk, toward catching what could go wrong early',
    tensionWith:
      "Expansive types—their optimistic attention can feel naive, like they're missing warning signs",
    growsWith:
      'Confident types—they help you trust that not everything small is a warning, allowing more relaxed noticing',

    books: [
      {
        title: 'Alas, Babylon',
        author: 'Frank',
        reason:
          'Noticing the warning signs before catastrophe. Early detection that saves lives.',
      },
      {
        title: 'On the Beach',
        author: 'Shute',
        reason:
          'Noticing the inevitable approaching. Warning signs that cannot be ignored.',
      },
      {
        title: 'The Stand',
        author: 'King',
        reason:
          'Watching plague spread. Those who notice early survive.',
      },
    ],

    famousFigures: {
      real: ['Cassandra', 'Rachel Carson', 'Gavin de Becker'],
      fictional: [
        'Cassandra (Greek Mythology)',
        'Samwell Tarly (Game of Thrones)',
        'Galadriel (Lord of the Rings)',
      ],
    },
  },

  'measured-noticer': {
    key: 'measured-noticer',
    name: 'Measured Noticer',
    color: '#645ad7',
    noun: 'noticer',
    adjective: 'measured',
    quadrant: 'seeking-protective',

    utopia:
      'Their utopia notices what matters. Attention is allocated wisely.',

    description:
      "You notice with balanced judgment, neither catching everything nor missing what matters. Your measured attention goes where it serves, producing noticing that's useful rather than overwhelming.",

    pull: 'toward useful noticing',
    edge: 'you notice what you need to notice, without drowning in detail',
    oneSentence:
      'You notice with measured attention, catching what matters without getting lost in what doesn\'t.',

    superpower: 'calibrated noticing',
    superpowerExpanded: `You notice appropriately.

Your measured approach calibrates attention to purpose. You don't try to notice everything—you notice what serves your goals. This calibration produces noticing that's useful without being overwhelming.

People value your measured noticing because it's actionable. You don't flood them with every small thing you noticed; you share what matters. Your calibrated attention serves practical needs.`,

    blindSpot:
      'Your measured noticing can miss surprises. What doesn\'t seem to matter might turn out to matter most.',

    blindSpotExpanded: `Calibration can become filter.

Your measured approach decides what's worth noticing based on your current understanding. But sometimes the most important thing to notice is what you didn't expect—what your calibration filtered out. Your measured noticing might miss the surprise that changes everything.

There's also the recalibration question. Your sense of what matters comes from somewhere. If it's outdated or incomplete, your measured noticing will be miscalibrated. Regular reassessment keeps your attention well-tuned.`,

    coreBeliefs: [
      'Attention should go where it serves',
      'Measured noticing balances thoroughness with practicality',
      'Not everything deserves equal attention—calibrate wisely',
      'The measured noticer serves usefulness, not exhaustiveness',
    ],

    howYouGotHere:
      'Your answers showed attention to detail combined with practical, balanced judgment. You notice what matters without getting lost. This maps to the Measured Noticer.',

    alignsWith:
      'other Measured types—you share the balanced approach, the practical orientation toward usefulness',
    tensionWith:
      'Curious types—their unfocused noticing can feel inefficient, attending to everything without purpose',
    growsWith:
      'Open types—they encourage you to occasionally notice beyond your calibrated focus, catching surprises',

    books: [
      {
        title: 'Arrival',
        author: 'Chiang',
        reason:
          'Noticing patterns in alien language. Calibrated attention that reveals meaning.',
      },
      {
        title: 'Never Let Me Go',
        author: 'Ishiguro',
        reason:
          'Gradually noticing the truth of your situation. Measured recognition.',
      },
      {
        title: 'All Systems Red',
        author: 'Wells',
        reason:
          'A security unit noticing what matters. Practical attention amid chaos.',
      },
    ],

    famousFigures: {
      real: ['Cal Newport', 'Greg McKeown', 'Marie Kondo'],
      fictional: [
        'Mary Poppins',
        'Marge Simpson (The Simpsons)',
        'Captain Holt (Brooklyn Nine-Nine)',
      ],
    },
  },

  // =============================================================================
  // WITNESS identities (lowest agency)
  // =============================================================================

  'careful-witness': {
    key: 'careful-witness',
    name: 'Careful Witness',
    color: '#1b1e8b',
    noun: 'witness',
    adjective: 'careful',
    quadrant: 'seeking-protective',

    utopia:
      'Their utopia honors accurate memory. What was witnessed is remembered truly.',

    description:
      "You bear witness with extraordinary care, ensuring your presence is accurate and honest. Your questioning nature examines your own witnessing, asking whether you're seeing clearly rather than projecting.",

    pull: 'toward accurate witnessing',
    edge: 'you witness with care that honors the truth of what you see',
    oneSentence:
      'You witness carefully, knowing that accurate presence honors what deserves to be seen.',

    superpower: 'verified presence',
    superpowerExpanded: `You witness and you verify your witnessing.

Your careful approach to presence includes self-examination. Am I seeing clearly? Am I projecting my own expectations? Is my witnessing honest? This questioning produces presence that can be trusted.

People value your careful witnessing because you take the responsibility of presence seriously. What you claim to have witnessed, you actually witnessed—without embellishment, without projection, without the distortions that careless presence introduces.`,

    blindSpot:
      "Your careful witnessing can become self-conscious. At some point, examining your witnessing becomes obstacle to witnessing.",

    blindSpotExpanded: `Questioning presence can prevent presence.

Your commitment to accurate witnessing can turn your attention inward—from what you're witnessing to how you're witnessing. But witnessing requires being present to what's witnessed, not present to your own process of witnessing. Your care can interfere with what it's trying to serve.

There's also the question of warmth. Careful, verified presence can feel clinical rather than compassionate. What's being witnessed might need presence that's simply there, not presence that's constantly examining itself.`,

    coreBeliefs: [
      'Witnessing is a responsibility that deserves care',
      'Accurate presence honors what is witnessed',
      'The careful witness questions their own seeing',
      'What you witness accurately serves truth',
    ],

    howYouGotHere:
      'Your answers showed witnessing orientation combined with extraordinary care for accuracy. You are present carefully, examining your own presence. This maps to the Careful Witness.',

    alignsWith:
      'other Careful types—you share the deep attention to accuracy, the questioning of assumptions',
    tensionWith:
      "Bold types—their quick presence can feel careless, like they aren't really witnessing",
    growsWith:
      "Open types—they help you simply be present without constant self-examination",

    books: [
      {
        title: 'Slaughterhouse-Five',
        author: 'Vonnegut',
        reason:
          'Bearing witness to war across time. Careful presence to unspeakable things.',
      },
      {
        title: 'The Handmaid\'s Tale',
        author: 'Atwood',
        reason:
          'Witnessing oppression with clarity. The responsibility of accurate testimony.',
      },
      {
        title: '1984',
        author: 'Orwell',
        reason:
          'Witnessing totalitarianism. The care required to remember truth.',
      },
    ],

    famousFigures: {
      real: ['Elie Wiesel', 'Bryan Stevenson', 'Studs Terkel'],
      fictional: [
        'The Giver (The Giver)',
        'Frodo Baggins (Lord of the Rings)',
        'Jonas (The Giver)',
      ],
    },
  },

  'cautious-witness': {
    key: 'cautious-witness',
    name: 'Cautious Witness',
    color: '#332c92',
    noun: 'witness',
    adjective: 'cautious',
    quadrant: 'seeking-protective',

    utopia:
      'Their utopia protects both witness and witnessed. Presence has appropriate boundaries.',

    description:
      "You bear witness with awareness of risk—to yourself, to what you're witnessing, to what witnessing itself might change. Your caution produces presence that accounts for the complexity of being present.",

    pull: 'toward protected presence',
    edge: 'you witness with boundaries that protect both you and what you witness',
    oneSentence:
      'You witness cautiously, aware that presence carries risks worth attending to.',

    superpower: 'boundaried witnessing',
    superpowerExpanded: `You witness with appropriate protection.

Your cautious presence includes awareness of risk. What could go wrong with this witnessing? What boundaries serve both you and what you're witnessing? This awareness produces presence that's sustainable and safe.

People value your cautious witnessing because you don't burn out, don't transgress, don't harm. Your presence accounts for its own risks and manages them. This makes your witnessing sustainable rather than heroic and brief.`,

    blindSpot:
      'Your cautious witnessing can be distant. Sometimes presence requires the risk of closeness.',

    blindSpotExpanded: `Protection can become distance.

Your attention to the risks of presence can keep you at arm's length from what needs to be witnessed. But some things can only be witnessed up close—with vulnerability, with risk, without the protection your caution prefers. Your boundaries can become walls.

There's also the question of whose protection matters most. Your cautiousness about protecting yourself might prevent witnessing that what's being witnessed truly needs, even if it costs you something.`,

    coreBeliefs: [
      'Presence carries risks worth attending to',
      'Cautious witnessing is sustainable witnessing',
      'Boundaries protect both witness and witnessed',
      'The cautious witness accounts for the complexity of being present',
    ],

    howYouGotHere:
      'Your answers showed witnessing orientation combined with awareness of risk. You are present while managing the risks of presence. This maps to the Cautious Witness.',

    alignsWith:
      'other Protective types—you share the orientation toward risk, toward building safeguards into presence',
    tensionWith:
      "Bold types—their unprotected presence can feel reckless, like they don't understand what witnessing costs",
    growsWith:
      'Confident types—they help you trust that some risks of presence are worth taking',

    books: [
      {
        title: 'The Ones Who Walk Away from Omelas',
        author: 'Le Guin',
        reason:
          'Witnessing with boundaries. Knowing what you can bear to see.',
      },
      {
        title: 'Parable of the Talents',
        author: 'Butler',
        reason:
          'Sustainable witnessing through collapse. Presence that protects itself.',
      },
      {
        title: 'The Memory Police',
        author: 'Ogawa',
        reason:
          'Witnessing disappearance with care. Preserving presence when things vanish.',
      },
    ],

    famousFigures: {
      real: ['Doctors Without Borders volunteers', 'War correspondents', 'Hospice workers'],
      fictional: [
        'Sam (Lord of the Rings)',
        'The Narrator (Fight Club)',
        'Nick Carraway (The Great Gatsby)',
      ],
    },
  },

  'measured-witness': {
    key: 'measured-witness',
    name: 'Measured Witness',
    color: '#5748cf',
    noun: 'witness',
    adjective: 'measured',
    quadrant: 'seeking-protective',

    utopia:
      'Their utopia values balanced presence. Witnessing is neither overwhelming nor insufficient.',

    description:
      "You bear witness with balanced judgment, offering the presence that's appropriate to what's being witnessed. Your measured approach calibrates your witnessing to what serves.",

    pull: 'toward appropriate presence',
    edge: 'you witness with the balance that serves what needs to be seen',
    oneSentence:
      'You witness with measured presence, offering what each moment needs—neither too much nor too little.',

    superpower: 'calibrated presence',
    superpowerExpanded: `You witness appropriately to each context.

Your measured approach adjusts your presence to what's needed. Some moments need intense witnessing; some need lighter presence. Some things need to be witnessed at length; some are better witnessed briefly. You calibrate.

People value your measured witnessing because it fits. You don't overwhelm with presence that isn't needed, and you don't disappear when presence is required. Your calibrated witnessing serves what's being witnessed.`,

    blindSpot:
      'Your measured witnessing can miss what requires unmeasured presence. Some moments need everything, not calibration.',

    blindSpotExpanded: `Measured isn't always enough.

Your balanced judgment about presence assumes that balance is appropriate. But some things need to be witnessed without measure—with everything you have, beyond what's calibrated. Your measured approach might be insufficient for moments that require unmeasured devotion.

There's also the question of authenticity. Calibrated presence can feel calculated rather than genuine. What's being witnessed might need you fully present, not adjusting your presence to what seems appropriate.`,

    coreBeliefs: [
      "Presence should fit what's being witnessed",
      'Measured witnessing serves without overwhelming or abandoning',
      'Calibration is a form of respect for what needs witnessing',
      'The measured witness offers what each moment needs',
    ],

    howYouGotHere:
      'Your answers showed witnessing orientation combined with balanced, practical judgment. You are present appropriately to each context. This maps to the Measured Witness.',

    alignsWith:
      'other Measured types—you share the balanced approach, the calibration of effort to circumstance',
    tensionWith:
      'Adaptive types—their shifting presence can feel unpredictable, changing without clear reason',
    growsWith:
      'Bold types—they encourage you to occasionally witness beyond your measured limits, discovering what unmeasured presence enables',

    books: [
      {
        title: 'The Road',
        author: 'McCarthy',
        reason:
          'Measured witnessing of aftermath. Presence calibrated to what can be borne.',
      },
      {
        title: 'Oryx and Crake',
        author: 'Atwood',
        reason:
          'Witnessing the end with measured clarity. Appropriate presence to extinction.',
      },
      {
        title: 'The Children of Men',
        author: 'James',
        reason:
          'Witnessing decline with balance. Neither too much hope nor too much despair.',
      },
    ],

    famousFigures: {
      real: ['Fred Rogers', 'Krista Tippett', 'Desmond Tutu'],
      fictional: [
        'Iroh (Avatar: The Last Airbender)',
        'Mary Poppins',
        'The Narrator (The Princess Bride)',
      ],
    },
  },
}
