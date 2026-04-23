// src/lib/combination-content.ts
// Unique content for each Primary + Shadow combination

type CombinationContent = {
  tagline: string;
  blindSpot: string;
};

// Key format: "primary-shadow" (e.g., "citizen-alive")
// Each combination gets a unique tagline and personalized blind spot

export const combinationContent: Record<string, CombinationContent> = {
  // ==========================================
  // THE ABUNDANT (citizen) combinations
  // ==========================================
  "citizen-alive": {
    tagline: "You trust abundance—and you want to feel all of it",
    blindSpot:
      "Your optimism about systems and your hunger for experience can blind you to those who have access to neither. The party isn't universal until everyone's invited.",
  },
  "citizen-shaper": {
    tagline: "You trust abundance—and you're already building toward it",
    blindSpot:
      "Your confidence in both systems and your own capacity to build can make you impatient with those who move slower. Not everyone processes possibility at your speed.",
  },
  "citizen-architect": {
    tagline: "You trust abundance—and you're designing systems to share it",
    blindSpot:
      "Your love of elegant systems can make you forget that people don't always behave rationally. The perfect structure still needs imperfect humans to live in it.",
  },
  "citizen-presence": {
    tagline: "You trust abundance—and you've found it in the present moment",
    blindSpot:
      "Your satisfaction with what is can prevent you from seeing what's missing for others. Not everyone has the luxury of presence.",
  },
  "citizen-swimmer": {
    tagline: "You trust abundance—and you're still asking hard questions about it",
    blindSpot:
      "Your questioning mind in a trusting heart creates cognitive dissonance you may not acknowledge. You believe in the system but keep testing it.",
  },
  "citizen-rooted": {
    tagline: "You trust abundance—but you've planted yourself somewhere specific",
    blindSpot:
      "Your faith in universal systems and your attachment to place create tension. You believe in everywhere but live somewhere.",
  },
  "citizen-conscience": {
    tagline: "You trust abundance—but you're watching for its costs",
    blindSpot:
      "You want to believe in the good, but you can't stop noticing the shadows. This inner conflict can make you seem inconsistent to others.",
  },
  "citizen-embers": {
    tagline: "You trust abundance—but you carry what was lost to get here",
    blindSpot:
      "Your optimism about the future and your grief for the past create a bittersweet lens. You celebrate progress while mourning what it replaced.",
  },
  "citizen-friction": {
    tagline: "You trust abundance—and you want to make sure it costs something",
    blindSpot:
      "You believe life should be easier and also meaningful through struggle. This contradiction is real, and you'll need to hold both.",
  },
  "citizen-unbound": {
    tagline: "You trust abundance—and you want to transcend its limits",
    blindSpot:
      "Your faith in material abundance and your longing for the transcendent don't always align. You may seek escape from the very world you're building.",
  },
  "citizen-mender": {
    tagline: "You trust abundance—and you're fixing what's broken along the way",
    blindSpot:
      "You believe in the system but keep finding things to repair. This tension between trust and maintenance is your particular burden.",
  },
  "citizen-cleareyed": {
    tagline: "You trust abundance—but you insist on seeing clearly",
    blindSpot:
      "Your optimism and your truthtelling don't always coexist peacefully. You want to believe and you refuse to pretend.",
  },
  "citizen-between": {
    tagline: "You trust abundance—but you're still figuring out where you stand",
    blindSpot:
      "You believe in the good but haven't committed to a path. Your openness is also your uncertainty.",
  },

  // ==========================================
  // THE BUILDER (shaper) combinations
  // ==========================================
  "shaper-citizen": {
    tagline: "You build from rubble—toward something everyone can share",
    blindSpot:
      "Your drive to build and your faith in abundance can make destruction feel noble. Not everyone needs you to tear down their walls.",
  },
  "shaper-alive": {
    tagline: "You build from rubble—and you feel every brick",
    blindSpot:
      "Your intensity about both creation and experience can burn you out. You feel everything while building everything.",
  },
  "shaper-architect": {
    tagline: "You build from rubble—with blueprints for the collective",
    blindSpot:
      "You want to build fast and build for everyone. These impulses can conflict when speed requires centralized decisions.",
  },
  "shaper-presence": {
    tagline: "You build from rubble—while staying grounded in now",
    blindSpot:
      "Your forward momentum and your present-moment awareness create whiplash. You're building the future while trying to be here.",
  },
  "shaper-swimmer": {
    tagline: "You build from rubble—while questioning what you're building",
    blindSpot:
      "Your hands build while your mind doubts. This tension either refines your work or paralyzes it.",
  },
  "shaper-rooted": {
    tagline: "You build from rubble—but you've chosen where to build",
    blindSpot:
      "You want to transform everything but you've committed to somewhere. This limits your scope but deepens your work.",
  },
  "shaper-conscience": {
    tagline: "You build from rubble—while watching who gets hurt",
    blindSpot:
      "Your drive to transform and your vigilance about harm create difficult tradeoffs. Building always displaces something.",
  },
  "shaper-embers": {
    tagline: "You build from rubble—carrying memory of what was",
    blindSpot:
      "You tear down and build up while holding grief for what's lost. This weight can slow your hands or deepen your work.",
  },
  "shaper-friction": {
    tagline: "You build from rubble—and you want the building to be hard",
    blindSpot:
      "You love the struggle of creation for its own sake. This can make you extend the chaos longer than necessary.",
  },
  "shaper-unbound": {
    tagline: "You build from rubble—toward something beyond material",
    blindSpot:
      "You're building in the world while dreaming beyond it. This split focus can make your projects feel unfinished.",
  },
  "shaper-mender": {
    tagline: "You build from rubble—but sometimes you just need to repair",
    blindSpot:
      "Your instinct to start fresh and your instinct to fix what's broken are in constant negotiation. Both are needed.",
  },
  "shaper-cleareyed": {
    tagline: "You build from rubble—and you see clearly what needs to go",
    blindSpot:
      "Your clarity about what's broken can make you ruthless. Truth-telling about decay can become an excuse for destruction.",
  },
  "shaper-between": {
    tagline: "You build from rubble—while still finding your vision",
    blindSpot:
      "You know you want to transform things but you're still discovering what you're building toward. The process is clarifying it.",
  },

  // ==========================================
  // THE ARCHITECT (architect) combinations
  // ==========================================
  "architect-citizen": {
    tagline: "You design for the collective—and you trust it will flourish",
    blindSpot:
      "Your faith in both systems and abundance can make you overlook power dynamics. Who maintains the commons still matters.",
  },
  "architect-shaper": {
    tagline: "You design for the collective—and you're ready to build it yourself",
    blindSpot:
      "Your systems-thinking and your bias toward action can conflict. Collective design requires patience you may not have.",
  },
  "architect-alive": {
    tagline: "You design for the collective—without forgetting the body",
    blindSpot:
      "Your love of structure and your hunger for experience are in tension. The system must serve pleasure, not suppress it.",
  },
  "architect-presence": {
    tagline: "You design for the collective—grounded in what is",
    blindSpot:
      "Your future-orientation and your present-awareness balance each other, but can also create internal friction about urgency.",
  },
  "architect-swimmer": {
    tagline: "You design for the collective—while questioning the blueprints",
    blindSpot:
      "You build structures while doubting them. This makes you a thoughtful architect but a slow one.",
  },
  "architect-rooted": {
    tagline: "You design for the collective—starting from where you are",
    blindSpot:
      "Your universal ideals and your local commitments don't always align. Global systems need local implementation.",
  },
  "architect-conscience": {
    tagline: "You design for the collective—while guarding against its failures",
    blindSpot:
      "Your optimism about collective structures and your vigilance about their misuse create productive tension. Use it.",
  },
  "architect-embers": {
    tagline: "You design for the collective—carrying forward what worked before",
    blindSpot:
      "You're building new structures while honoring old ones. This can make you conservative in ways you don't recognize.",
  },
  "architect-friction": {
    tagline: "You design for the collective—but you want it to push back",
    blindSpot:
      "You want systems that challenge people, not just serve them. This can make your structures uncomfortable to live in.",
  },
  "architect-unbound": {
    tagline: "You design for the collective—reaching toward something beyond it",
    blindSpot:
      "Your commitment to material systems and your draw toward transcendence pull in different directions. Ground the vision.",
  },
  "architect-mender": {
    tagline: "You design for the collective—and you maintain what you build",
    blindSpot:
      "You create structures and repair them. This makes you patient but sometimes too attached to your own designs.",
  },
  "architect-cleareyed": {
    tagline: "You design for the collective—and you see its flaws clearly",
    blindSpot:
      "Your love for collective structures and your clear sight of their failures can make you seem hypocritical. You believe despite seeing.",
  },
  "architect-between": {
    tagline: "You design for the collective—while still finding your place in it",
    blindSpot:
      "You build structures you're not sure you fit into. This outsider-insider position shapes your designs.",
  },

  // ==========================================
  // THE PRESENT (presence) combinations
  // ==========================================
  "presence-citizen": {
    tagline: "You chose presence—and you trust the abundance around you",
    blindSpot:
      "Your contentment with now and your faith in systems can make you complacent. The present is enough, but is it enough for everyone?",
  },
  "presence-shaper": {
    tagline: "You chose presence—but your hands still want to build",
    blindSpot:
      "Your stillness and your creative impulse are in conversation. You're present but not passive—this confuses people.",
  },
  "presence-architect": {
    tagline: "You chose presence—while holding space for the collective",
    blindSpot:
      "Your individual peace and your care for systems create interesting tension. You're calm about yourself, concerned about the whole.",
  },
  "presence-alive": {
    tagline: "You chose presence—and you feel it all right here",
    blindSpot:
      "Your stillness and your intensity aren't opposites—they're both forms of full attention. But others may find this combination overwhelming.",
  },
  "presence-swimmer": {
    tagline: "You chose presence—and you're still asking why",
    blindSpot:
      "Your acceptance of what is and your questioning mind create productive tension. You're peaceful but not unquestioning.",
  },
  "presence-rooted": {
    tagline: "You chose presence—in a specific place you've committed to",
    blindSpot:
      "Your temporal presence and your spatial rootedness reinforce each other. But this stability can become rigidity.",
  },
  "presence-conscience": {
    tagline: "You chose presence—while keeping watch",
    blindSpot:
      "Your peace and your vigilance seem contradictory but aren't. You're calm and alert. This can be exhausting to maintain.",
  },
  "presence-embers": {
    tagline: "You chose presence—carrying what came before",
    blindSpot:
      "You're here now and you hold the past. This makes you a bridge but can divide your attention.",
  },
  "presence-friction": {
    tagline: "You chose presence—and you want it to challenge you",
    blindSpot:
      "You've found peace but you don't want comfort. This paradox is your practice.",
  },
  "presence-unbound": {
    tagline: "You chose presence—as a doorway to something beyond",
    blindSpot:
      "Your groundedness and your transcendence are one path. But others may see only the stillness, missing the depth.",
  },
  "presence-mender": {
    tagline: "You chose presence—and you repair what's near you",
    blindSpot:
      "Your peace comes partly from small acts of repair. The danger is that fixing things becomes your way of avoiding them.",
  },
  "presence-cleareyed": {
    tagline: "You chose presence—with eyes wide open",
    blindSpot:
      "You're at peace but not deluded. This clear-eyed presence can seem cold to those who want comfort.",
  },
  "presence-between": {
    tagline: "You chose presence—while still becoming",
    blindSpot:
      "You've found presence but not certainty. This is actually advanced practice—being here while still unfolding.",
  },

  // ==========================================
  // THE DEEP (swimmer) combinations
  // ==========================================
  "swimmer-citizen": {
    tagline: "You swim in questions—but you trust the surface will hold",
    blindSpot:
      "Your depth and your optimism create interesting cognitive dissonance. You see complexity but believe in solutions.",
  },
  "swimmer-shaper": {
    tagline: "You swim in questions—and you build with what you find",
    blindSpot:
      "Your contemplative nature and your drive to build are in constant dialogue. Depth doesn't always translate to action quickly.",
  },
  "swimmer-architect": {
    tagline: "You swim in questions—about how we live together",
    blindSpot:
      "You question everything, including the systems you want to build. This makes you a thoughtful designer but a hesitant one.",
  },
  "swimmer-presence": {
    tagline: "You swim in questions—while staying present to what is",
    blindSpot:
      "Your depth-seeking and your presence practice balance each other. But you can lose yourself in either direction.",
  },
  "swimmer-alive": {
    tagline: "You swim in questions—and you feel them in your body",
    blindSpot:
      "Your intellectual depth and your sensory intensity feed each other. This can be too much for people who want simple answers.",
  },
  "swimmer-rooted": {
    tagline: "You swim in questions—but you've anchored somewhere",
    blindSpot:
      "Your questioning mind and your commitment to place seem contradictory. You've chosen to go deep right where you are.",
  },
  "swimmer-conscience": {
    tagline: "You swim in questions—always asking who benefits",
    blindSpot:
      "Your depth and your vigilance reinforce each other. But you can question things to death, including your own capacity to act.",
  },
  "swimmer-embers": {
    tagline: "You swim in questions—carrying what others have forgotten",
    blindSpot:
      "Your questioning and your memory-keeping are related. You ask why we forgot, what was lost, what we're missing.",
  },
  "swimmer-friction": {
    tagline: "You swim in questions—and you want them to be hard",
    blindSpot:
      "You seek difficult questions deliberately. This can become a way of avoiding answers you're afraid of.",
  },
  "swimmer-unbound": {
    tagline: "You swim in questions—reaching toward something beyond language",
    blindSpot:
      "Your intellectual depth and your mystical leanings are one quest. But words are your medium, even when they fail.",
  },
  "swimmer-mender": {
    tagline: "You swim in questions—and you repair what understanding breaks",
    blindSpot:
      "Your questioning breaks things apart; your mending instinct puts them back. This cycle is your practice.",
  },
  "swimmer-cleareyed": {
    tagline: "You swim in questions—and you tell the truth about what you find",
    blindSpot:
      "Your depth and your honesty are aligned. But truth from the deep can be too much for those swimming at the surface.",
  },
  "swimmer-between": {
    tagline: "You swim in questions—still finding your way",
    blindSpot:
      "You're deep in uncertainty, and you're honest about it. This is actually a form of integrity.",
  },

  // ==========================================
  // THE ROOTED (rooted) combinations
  // ==========================================
  "rooted-citizen": {
    tagline: "You chose stillness—trusting abundance will find you here",
    blindSpot:
      "Your commitment to place and your faith in universal systems can conflict. The local and the global need different things.",
  },
  "rooted-shaper": {
    tagline: "You chose stillness—but you're transforming where you are",
    blindSpot:
      "You've stopped moving but not stopped building. Your transformation is depth, not distance.",
  },
  "rooted-architect": {
    tagline: "You chose stillness—while building structures for your community",
    blindSpot:
      "Your local commitment and your systems-thinking create useful tension. You're designing for here, not everywhere.",
  },
  "rooted-presence": {
    tagline: "You chose stillness—and presence found you there",
    blindSpot:
      "Your spatial and temporal commitments reinforce each other. But this stability can become inflexibility.",
  },
  "rooted-swimmer": {
    tagline: "You chose stillness—and you're going deep where you are",
    blindSpot:
      "You've traded horizontal exploration for vertical. Some people will never understand why you stopped moving.",
  },
  "rooted-alive": {
    tagline: "You chose stillness—and you feel this place fully",
    blindSpot:
      "Your rootedness and your sensory intensity make you intimate with one place. But you may romanticize what you know.",
  },
  "rooted-conscience": {
    tagline: "You chose stillness—while watching over your corner",
    blindSpot:
      "You're committed to place and vigilant about its wellbeing. This can make you territorial in ways that limit you.",
  },
  "rooted-embers": {
    tagline: "You chose stillness—carrying the memory of this place",
    blindSpot:
      "Your rootedness and your memory-keeping make you the historian of somewhere. But history can become a cage.",
  },
  "rooted-friction": {
    tagline: "You chose stillness—and you want it to be hard",
    blindSpot:
      "You stayed because it's difficult, not despite it. This can make you dismiss those who chose easier paths.",
  },
  "rooted-unbound": {
    tagline: "You chose stillness—as a path to something beyond it",
    blindSpot:
      "Your rootedness is a spiritual practice, not just a location. But others may see only the limitation.",
  },
  "rooted-mender": {
    tagline: "You chose stillness—and you repair what's around you",
    blindSpot:
      "You stay and you fix. This is quietly radical, but it can become a way of avoiding larger questions.",
  },
  "rooted-cleareyed": {
    tagline: "You chose stillness—with clear eyes about this place",
    blindSpot:
      "You love somewhere and you see it clearly. This unsentimental attachment is rare.",
  },
  "rooted-between": {
    tagline: "You chose stillness—while still becoming who you are",
    blindSpot:
      "You've committed to a place but not a final self. Growth happens in depth now, not in distance.",
  },

  // ==========================================
  // THE GUARDIAN (conscience) combinations
  // ==========================================
  "conscience-citizen": {
    tagline: "You watch for what's hidden—while hoping you're wrong",
    blindSpot:
      "Your vigilance and your optimism are in constant tension. You want to trust systems and you can't stop scanning for their failures.",
  },
  "conscience-shaper": {
    tagline: "You watch for what's hidden—and you build alternatives",
    blindSpot:
      "Your vigilance drives your building. But sometimes you tear down what could have been repaired.",
  },
  "conscience-architect": {
    tagline: "You watch for what's hidden—especially in our own structures",
    blindSpot:
      "You want collective systems and you're suspicious of them. This makes you the architect who stress-tests everything.",
  },
  "conscience-presence": {
    tagline: "You watch for what's hidden—while staying grounded here",
    blindSpot:
      "Your vigilance and your presence are both forms of attention. But they pull in different directions.",
  },
  "conscience-swimmer": {
    tagline: "You watch for what's hidden—and you're asking hard questions",
    blindSpot:
      "Your vigilance and your questioning reinforce each other. You may never stop investigating.",
  },
  "conscience-alive": {
    tagline: "You watch for what's hidden—and you feel it in your body",
    blindSpot:
      "Your vigilance is embodied. You sense danger before you can name it. This can make you seem paranoid.",
  },
  "conscience-rooted": {
    tagline: "You watch for what's hidden—in the place you've committed to",
    blindSpot:
      "You're the guardian of somewhere specific. This gives your vigilance focus but can make it territorial.",
  },
  "conscience-embers": {
    tagline: "You watch for what's hidden—especially what history forgot",
    blindSpot:
      "Your vigilance extends to the past. You're watching for the return of old harms.",
  },
  "conscience-friction": {
    tagline: "You watch for what's hidden—and you're willing to fight it",
    blindSpot:
      "Your vigilance is backed by willingness to struggle. But you can become the conflict you're watching for.",
  },
  "conscience-unbound": {
    tagline: "You watch for what's hidden—including hidden truths",
    blindSpot:
      "Your vigilance extends to the invisible. You're watching both for harm and for revelation.",
  },
  "conscience-mender": {
    tagline: "You watch for what's hidden—and you repair what you find",
    blindSpot:
      "Your vigilance leads to repair. You see what's broken and you fix it. This is quietly heroic.",
  },
  "conscience-cleareyed": {
    tagline: "You watch for what's hidden—and you name what you see",
    blindSpot:
      "Your vigilance and your truthtelling reinforce each other. But constant warning can make people stop listening.",
  },
  "conscience-between": {
    tagline: "You watch for what's hidden—still figuring out what to do about it",
    blindSpot:
      "You see clearly but act uncertain. This isn't weakness—it's honest about the complexity of response.",
  },

  // ==========================================
  // THE KEEPER (embers) combinations
  // ==========================================
  "embers-citizen": {
    tagline: "You carry what was lost—trusting we can build again",
    blindSpot:
      "Your memory and your optimism create a bittersweet faith. You grieve what's gone while believing in what's coming.",
  },
  "embers-shaper": {
    tagline: "You carry what was lost—and you're building from the ashes",
    blindSpot:
      "Your memory informs your building. But you can be too attached to rebuilding the old instead of imagining the new.",
  },
  "embers-architect": {
    tagline: "You carry what was lost—designing systems to prevent losing again",
    blindSpot:
      "Your memory drives your structures. But preventing all loss can prevent all change.",
  },
  "embers-presence": {
    tagline: "You carry what was lost—while staying here now",
    blindSpot:
      "Your memory and your presence hold each other. You're in the present, holding the past. This is a practice.",
  },
  "embers-swimmer": {
    tagline: "You carry what was lost—and you're still asking what it meant",
    blindSpot:
      "Your memory fuels your questions. You won't let the past be simplified.",
  },
  "embers-alive": {
    tagline: "You carry what was lost—and you feel it fully",
    blindSpot:
      "Your grief is embodied and present, not abstract. This makes you a powerful witness but can be heavy.",
  },
  "embers-rooted": {
    tagline: "You carry what was lost—in the place it happened",
    blindSpot:
      "You're the memory of somewhere. This grounds your grief but can trap you in it.",
  },
  "embers-conscience": {
    tagline: "You carry what was lost—watching for what could be lost again",
    blindSpot:
      "Your memory and your vigilance feed each other. You remember harm and you watch for its return.",
  },
  "embers-friction": {
    tagline: "You carry what was lost—and you won't let it be easy",
    blindSpot:
      "Your grief includes the struggle that created it. You want memory to have weight.",
  },
  "embers-unbound": {
    tagline: "You carry what was lost—reaching for what cannot be lost",
    blindSpot:
      "Your grief points you toward the eternal. Loss is a teacher about what matters.",
  },
  "embers-mender": {
    tagline: "You carry what was lost—and you repair what can be saved",
    blindSpot:
      "Your memory and your repair work are related. You fix things partly to honor what couldn't be fixed.",
  },
  "embers-cleareyed": {
    tagline: "You carry what was lost—and you tell the truth about it",
    blindSpot:
      "Your memory is unsentimental. You hold what was lost without romanticizing it.",
  },
  "embers-between": {
    tagline: "You carry what was lost—still finding what it means",
    blindSpot:
      "You hold grief and uncertainty together. The past is clear; its meaning is still unfolding.",
  },

  // ==========================================
  // THE CHALLENGER (friction) combinations
  // ==========================================
  "friction-citizen": {
    tagline: "You crave difficulty—but you believe abundance is possible",
    blindSpot:
      "Your desire for struggle and your trust in ease create productive tension. You want meaningful difficulty, not unnecessary suffering.",
  },
  "friction-shaper": {
    tagline: "You crave difficulty—and you're building something hard",
    blindSpot:
      "Your love of challenge drives your creation. But you can make things harder than they need to be.",
  },
  "friction-architect": {
    tagline: "You crave difficulty—in service of the collective",
    blindSpot:
      "You want structures that challenge people to grow. But comfort has value too.",
  },
  "friction-presence": {
    tagline: "You crave difficulty—while staying present to it",
    blindSpot:
      "Your embrace of struggle and your presence are compatible. Difficulty is easier when you're actually here for it.",
  },
  "friction-swimmer": {
    tagline: "You crave difficulty—especially the hard questions",
    blindSpot:
      "Your love of challenge extends to the intellectual. You want answers that resist you.",
  },
  "friction-alive": {
    tagline: "You crave difficulty—and you feel it all",
    blindSpot:
      "Your love of struggle and your sensory intensity combine into a particular kind of aliveness. It's not for everyone.",
  },
  "friction-rooted": {
    tagline: "You crave difficulty—and you found it where you stayed",
    blindSpot:
      "You chose a hard place and you stayed. This is a specific kind of courage.",
  },
  "friction-conscience": {
    tagline: "You crave difficulty—especially the moral kind",
    blindSpot:
      "Your love of challenge extends to ethical struggle. You want to be tested.",
  },
  "friction-embers": {
    tagline: "You crave difficulty—because you've seen what ease can cost",
    blindSpot:
      "Your love of struggle is informed by loss. You know what happens when things are too easy.",
  },
  "friction-unbound": {
    tagline: "You crave difficulty—as a path to transcendence",
    blindSpot:
      "Your struggle is spiritual. You seek difficulty that transforms, not just tests.",
  },
  "friction-mender": {
    tagline: "You crave difficulty—and you repair what the struggle breaks",
    blindSpot:
      "You create challenges and clean up after them. This is a complex relationship with destruction.",
  },
  "friction-cleareyed": {
    tagline: "You crave difficulty—and you're honest about why",
    blindSpot:
      "Your love of struggle is conscious and examined. You know what you're doing and why.",
  },
  "friction-between": {
    tagline: "You crave difficulty—while still figuring out what kind",
    blindSpot:
      "You know you want to be challenged but you're still discovering the right challenges.",
  },

  // ==========================================
  // THE TRANSCENDENT (unbound) combinations
  // ==========================================
  "unbound-citizen": {
    tagline: "You reach beyond limits—trusting the ground you left behind",
    blindSpot:
      "Your transcendence and your trust in systems seem contradictory. You've left the game but you still believe in its value.",
  },
  "unbound-shaper": {
    tagline: "You reach beyond limits—and you're building the ladder",
    blindSpot:
      "Your transcendence includes creating paths for others. But you can forget that not everyone wants to climb.",
  },
  "unbound-architect": {
    tagline: "You reach beyond limits—while designing for those still here",
    blindSpot:
      "You're building structures you've transcended. This can make you a wise architect or a detached one.",
  },
  "unbound-presence": {
    tagline: "You reach beyond limits—through being fully here",
    blindSpot:
      "Your transcendence comes through presence, not escape. This is advanced practice.",
  },
  "unbound-swimmer": {
    tagline: "You reach beyond limits—still asking questions from the heights",
    blindSpot:
      "Your transcendence includes intellectual curiosity. You've gone beyond but you haven't stopped wondering.",
  },
  "unbound-alive": {
    tagline: "You reach beyond limits—feeling every dimension",
    blindSpot:
      "Your transcendence is embodied and sensory. This is rare—most transcendence is about leaving the body behind.",
  },
  "unbound-rooted": {
    tagline: "You reach beyond limits—from a place you've committed to",
    blindSpot:
      "You transcend from somewhere specific. Your rootedness is your launch pad.",
  },
  "unbound-conscience": {
    tagline: "You reach beyond limits—watching for spiritual bypassing",
    blindSpot:
      "Your transcendence is ethical. You won't use the beyond to avoid responsibility here.",
  },
  "unbound-embers": {
    tagline: "You reach beyond limits—carrying what cannot be transcended",
    blindSpot:
      "Your transcendence includes grief. Some things you carry all the way through.",
  },
  "unbound-friction": {
    tagline: "You reach beyond limits—through struggle, not around it",
    blindSpot:
      "Your transcendence is earned. You want the difficult path to enlightenment.",
  },
  "unbound-mender": {
    tagline: "You reach beyond limits—and you repair what transcendence breaks",
    blindSpot:
      "You go beyond and you return to fix things. This cycle is your service.",
  },
  "unbound-cleareyed": {
    tagline: "You reach beyond limits—with clear eyes about what you're doing",
    blindSpot:
      "Your transcendence is examined and honest. You won't pretend you're beyond when you're not.",
  },
  "unbound-between": {
    tagline: "You reach beyond limits—still finding the way",
    blindSpot:
      "You sense something beyond but you haven't arrived. This seeking is itself a practice.",
  },

  // ==========================================
  // THE ALIVE (alive) combinations
  // ==========================================
  "alive-citizen": {
    tagline: "You want to feel everything—trusting there's enough to go around",
    blindSpot:
      "Your sensory hunger and your faith in abundance align. But access to experience isn't equally distributed.",
  },
  "alive-shaper": {
    tagline: "You want to feel everything—and you're building toward more",
    blindSpot:
      "Your intensity and your creativity feed each other. You feel and you make. But you can burn hot.",
  },
  "alive-architect": {
    tagline: "You want to feel everything—within structures that let everyone feel",
    blindSpot:
      "Your sensory aliveness and your collective thinking combine into a particular vision: systems that serve pleasure.",
  },
  "alive-presence": {
    tagline: "You want to feel everything—especially what's here now",
    blindSpot:
      "Your intensity and your presence are both about full attention. You're intensely here.",
  },
  "alive-swimmer": {
    tagline: "You want to feel everything—including the questions",
    blindSpot:
      "Your sensory intensity and your intellectual depth aren't separate. You feel your way into questions.",
  },
  "alive-rooted": {
    tagline: "You want to feel everything—in the place you've chosen",
    blindSpot:
      "Your aliveness is local and specific. You feel this place fully.",
  },
  "alive-conscience": {
    tagline: "You want to feel everything—including what's wrong",
    blindSpot:
      "Your sensory awareness includes danger. You feel harm before you see it.",
  },
  "alive-embers": {
    tagline: "You want to feel everything—including the grief",
    blindSpot:
      "Your aliveness includes loss. You feel what's gone as much as what's here.",
  },
  "alive-friction": {
    tagline: "You want to feel everything—especially what's hard",
    blindSpot:
      "Your intensity extends to difficulty. You want to feel the struggle, not just the pleasure.",
  },
  "alive-unbound": {
    tagline: "You want to feel everything—reaching for what's beyond feeling",
    blindSpot:
      "Your sensory intensity points toward transcendence. Feeling fully leads somewhere.",
  },
  "alive-mender": {
    tagline: "You want to feel everything—and you repair what you feel",
    blindSpot:
      "Your sensitivity leads to repair. You feel what's broken and you fix it.",
  },
  "alive-cleareyed": {
    tagline: "You want to feel everything—and you're honest about what you feel",
    blindSpot:
      "Your intensity is examined and named. You feel fully and you tell the truth about it.",
  },
  "alive-between": {
    tagline: "You want to feel everything—still finding out who you are",
    blindSpot:
      "Your intensity drives your becoming. You feel your way into yourself.",
  },

  // ==========================================
  // THE MENDER (mender) combinations
  // ==========================================
  "mender-citizen": {
    tagline: "You fix what's broken—trusting the whole will hold",
    blindSpot:
      "Your repair work and your systemic trust are aligned. You fix the parts, trusting the system.",
  },
  "mender-shaper": {
    tagline: "You fix what's broken—and sometimes you build it better",
    blindSpot:
      "Your repair instinct and your creative drive negotiate constantly. Fix or rebuild? The answer varies.",
  },
  "mender-architect": {
    tagline: "You fix what's broken—including the systems that broke it",
    blindSpot:
      "Your repair work is structural. You don't just fix things—you fix why things break.",
  },
  "mender-presence": {
    tagline: "You fix what's broken—staying present to the work",
    blindSpot:
      "Your repair practice is meditative. The fixing is its own form of presence.",
  },
  "mender-swimmer": {
    tagline: "You fix what's broken—asking why it broke",
    blindSpot:
      "Your repair work includes understanding. You can't fix without knowing.",
  },
  "mender-alive": {
    tagline: "You fix what's broken—feeling every repair",
    blindSpot:
      "Your repair work is embodied and sensory. You feel the wholeness returning.",
  },
  "mender-rooted": {
    tagline: "You fix what's broken—right where you are",
    blindSpot:
      "Your repair work is local and specific. You fix this place, these things, these people.",
  },
  "mender-conscience": {
    tagline: "You fix what's broken—watching for what breaks next",
    blindSpot:
      "Your repair work and your vigilance work together. You fix and you prevent.",
  },
  "mender-embers": {
    tagline: "You fix what's broken—honoring what can't be fixed",
    blindSpot:
      "Your repair work includes grief. Some things can only be honored, not restored.",
  },
  "mender-friction": {
    tagline: "You fix what's broken—knowing some breaking is necessary",
    blindSpot:
      "Your repair ethic includes understanding productive destruction. Not all breaking is bad.",
  },
  "mender-unbound": {
    tagline: "You fix what's broken—seeing what transcends repair",
    blindSpot:
      "Your repair work points to something beyond fixing. Some wholes can't be broken.",
  },
  "mender-cleareyed": {
    tagline: "You fix what's broken—seeing clearly what's actually wrong",
    blindSpot:
      "Your repair work is diagnostic. You name what's broken before you fix it.",
  },
  "mender-between": {
    tagline: "You fix what's broken—still finding your own wholeness",
    blindSpot:
      "You repair others while working on yourself. The mender is also becoming.",
  },

  // ==========================================
  // THE TRUTH-TELLER (cleareyed) combinations
  // ==========================================
  "cleareyed-citizen": {
    tagline: "You tell the truth—even about systems you trust",
    blindSpot:
      "Your honesty and your optimism coexist carefully. You believe and you don't pretend.",
  },
  "cleareyed-shaper": {
    tagline: "You tell the truth—and you build from it",
    blindSpot:
      "Your honesty informs your building. You create from reality, not fantasy.",
  },
  "cleareyed-architect": {
    tagline: "You tell the truth—especially about collective structures",
    blindSpot:
      "Your honesty is structural. You name what systems actually do, not what they claim.",
  },
  "cleareyed-presence": {
    tagline: "You tell the truth—about what's actually here",
    blindSpot:
      "Your honesty and your presence are aligned. You see and name what's actually happening.",
  },
  "cleareyed-swimmer": {
    tagline: "You tell the truth—about questions that have no answers",
    blindSpot:
      "Your honesty includes uncertainty. You name what you don't know.",
  },
  "cleareyed-alive": {
    tagline: "You tell the truth—about what you actually feel",
    blindSpot:
      "Your honesty is embodied and immediate. You name your experience without editing.",
  },
  "cleareyed-rooted": {
    tagline: "You tell the truth—about the place you've chosen",
    blindSpot:
      "Your honesty is local and specific. You love somewhere and you see it clearly.",
  },
  "cleareyed-conscience": {
    tagline: "You tell the truth—especially about harm",
    blindSpot:
      "Your honesty is ethical. You name what hurts and who's hurt.",
  },
  "cleareyed-embers": {
    tagline: "You tell the truth—about what was really lost",
    blindSpot:
      "Your honesty includes grief. You name the dead and what died with them.",
  },
  "cleareyed-friction": {
    tagline: "You tell the truth—even when it's hard to hear",
    blindSpot:
      "Your honesty is willing to struggle. You'll tell difficult truths to difficult audiences.",
  },
  "cleareyed-unbound": {
    tagline: "You tell the truth—about what's beyond ordinary seeing",
    blindSpot:
      "Your honesty extends to the mystical. You name what you glimpse without pretending to certainty.",
  },
  "cleareyed-mender": {
    tagline: "You tell the truth—as the first step to repair",
    blindSpot:
      "Your honesty serves healing. You name what's broken so it can be fixed.",
  },
  "cleareyed-between": {
    tagline: "You tell the truth—including that you're still figuring it out",
    blindSpot:
      "Your honesty includes uncertainty about yourself. This is integrity.",
  },

  // ==========================================
  // THE LIMINAL (between) combinations
  // ==========================================
  "between-citizen": {
    tagline: "You're still becoming—trusting you'll find your place",
    blindSpot:
      "Your uncertainty and your optimism coexist. You don't know where you're going but you believe it's somewhere good.",
  },
  "between-shaper": {
    tagline: "You're still becoming—and you're building as you go",
    blindSpot:
      "Your uncertainty doesn't stop your creating. You make things while you're still figuring out who's making them.",
  },
  "between-architect": {
    tagline: "You're still becoming—while caring for the collective",
    blindSpot:
      "Your uncertainty is personal, not political. You're figuring out yourself while serving others.",
  },
  "between-presence": {
    tagline: "You're still becoming—staying present to the unfolding",
    blindSpot:
      "Your uncertainty and your presence are compatible. You're here, becoming, watching it happen.",
  },
  "between-swimmer": {
    tagline: "You're still becoming—diving deep into questions",
    blindSpot:
      "Your uncertainty feeds your questioning. You explore because you haven't arrived.",
  },
  "between-alive": {
    tagline: "You're still becoming—feeling every step",
    blindSpot:
      "Your uncertainty is sensory and embodied. You feel your way forward.",
  },
  "between-rooted": {
    tagline: "You're still becoming—in a place you've committed to",
    blindSpot:
      "Your uncertainty is internal; your location is fixed. You're becoming somewhere specific.",
  },
  "between-conscience": {
    tagline: "You're still becoming—while watching for harm",
    blindSpot:
      "Your uncertainty doesn't extend to ethics. You're figuring out who you are but not whether to care.",
  },
  "between-embers": {
    tagline: "You're still becoming—carrying what shaped you",
    blindSpot:
      "Your uncertainty includes grief. The past made you and you're still understanding how.",
  },
  "between-friction": {
    tagline: "You're still becoming—and you want the process to be hard",
    blindSpot:
      "Your uncertainty is deliberate. You're becoming through struggle, not comfort.",
  },
  "between-unbound": {
    tagline: "You're still becoming—reaching toward something beyond",
    blindSpot:
      "Your uncertainty is spiritual. You sense something you can't name yet.",
  },
  "between-mender": {
    tagline: "You're still becoming—repairing yourself along the way",
    blindSpot:
      "Your uncertainty includes healing. You're becoming whole as you become yourself.",
  },
  "between-cleareyed": {
    tagline: "You're still becoming—and you're honest about it",
    blindSpot:
      "Your uncertainty is named and owned. You don't pretend to know who you are.",
  },
};

// Get content for a primary + shadow combination
export function getCombinationContent(
  primary: string,
  shadow: string
): CombinationContent | null {
  const key = `${primary}-${shadow}`;
  return combinationContent[key] || null;
}

// Fallback for any missing combinations
export function getCombinationContentWithFallback(
  primary: string,
  shadow: string,
  primaryName: string,
  shadowName: string
): CombinationContent {
  const content = getCombinationContent(primary, shadow);
  if (content) return content;

  // Generate a basic fallback
  return {
    tagline: `You lead with ${primaryName}—with undertones of ${shadowName}`,
    blindSpot: `Your ${primaryName.toLowerCase()} nature may sometimes conflict with your ${shadowName.toLowerCase()} tendencies. Notice when these create tension.`,
  };
}
