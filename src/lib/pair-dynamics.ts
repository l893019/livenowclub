// src/lib/pair-dynamics.ts
// Rich pair readings for any two archetypes

export type PairReading = {
  whatYouShare: string;
  whereYouPush: string;
  whatYouCreate: string;
  whatsMissing: string;
  missingInGroup: string;
  missingStandalone: string;
};

// Helper to create consistent pair keys (alphabetically sorted)
function getPairKey(a: string, b: string): string {
  return [a, b].sort().join("+");
}

// All 196 pair readings
const pairReadings: Record<string, PairReading> = {
  // ============================================
  // ABUNDANT (citizen) combinations
  // ============================================

  "citizen+citizen": {
    whatYouShare: "You both believe the pie can always be bigger. Neither of you wastes energy on zero-sum thinking — you've done the math, read the projections, and concluded that scarcity is usually a failure of imagination. You trust systems to tend toward good when designed well. In a room of hoarders, you're the two passing out plates.",
    whereYouPush: "You might float. Two optimists can drift so far into possibility that you forget who's drowning below. You'll need to push each other to notice who isn't at the table — abundance shared only among the abundant isn't really abundance. One of you will need to ask: whose access are we still not seeing?",
    whatYouCreate: "Generosity that scales. You're capable of building systems that actually give more than they take, because neither of you is secretly hoarding. When you build together, the architecture tends toward openness.",
    whatsMissing: "Neither of you is naturally suspicious. You might build something beautiful and miss the crack in the foundation.",
    missingInGroup: "Look for a Guardian to stress-test your optimism before you ship.",
    missingStandalone: "Find someone who asks \"what could go wrong?\" — you need their eyes."
  },

  "citizen+shaper": {
    whatYouShare: "You both believe in making things happen. The Abundant trusts that resources will appear; the Builder trusts that rubble can become foundation. Neither of you is waiting for permission. You share an impatience with people who see limits where you see raw material.",
    whereYouPush: "The Builder moves fast and breaks things. The Abundant wants to expand what already works. You'll push each other on timing — the Builder wants to start over when the Abundant wants to scale. The Abundant may feel the Builder discards too quickly; the Builder may feel the Abundant settles for optimization when revolution is needed.",
    whatYouCreate: "Prototypes that actually serve people. The Builder provides momentum; the Abundant ensures the momentum goes toward something worth having. You make things that work and that work for everyone.",
    whatsMissing: "Neither of you is inclined to pause and ask hard questions. You build forward, but someone needs to ask why.",
    missingInGroup: "Find your Deep — they'll slow you down just enough to build something solid.",
    missingStandalone: "Before you ship, ask someone who lives in questions to stress-test your assumptions."
  },

  "architect+citizen": {
    whatYouShare: "You both think in systems. The Abundant sees systems that could generate more; the Architect sees systems that could belong to everyone. Neither of you accepts that the way things are is the way things must be. You share an ability to see the invisible architecture that shapes possibility.",
    whereYouPush: "The Architect builds for collective ownership; the Abundant builds for collective access. These are close but not the same. You'll push each other on who controls what you're creating — access is not governance. The Abundant may feel the Architect slows things down with process; the Architect may feel the Abundant doesn't interrogate who's really in charge.",
    whatYouCreate: "Infrastructure that's both open and owned. When you build together, things tend to be accessible and accountable — the rare combination. Your structures have doors anyone can walk through.",
    whatsMissing: "You're both systems people. Neither of you naturally attends to the individual human in front of you.",
    missingInGroup: "The Present will remind you that people aren't just nodes in your beautiful architecture.",
    missingStandalone: "Make sure someone is watching for the person, not just the pattern."
  },

  "citizen+presence": {
    whatYouShare: "You both believe life can be good. The Abundant trusts that there's enough; the Present trusts that attention is worth giving. Neither of you operates from fear. You share an orientation toward generosity — of resources, of presence, of assuming the best.",
    whereYouPush: "The Abundant thinks in systems and scale. The Present thinks in moments and faces. You'll push each other on where value lives — the Abundant may miss the person in front of them while optimizing for millions; the Present may miss the system while attending to the one. Neither is wrong. You need both scales.",
    whatYouCreate: "Spaces where people feel both resourced and seen. You make rooms that are abundant and intimate — enough for everyone and present to each. Rare combination.",
    whatsMissing: "Neither of you is naturally vigilant about what might go wrong. You trust and attend, but you don't watch for cracks.",
    missingInGroup: "A Guardian can see what you're both too trusting to notice.",
    missingStandalone: "Find someone whose instinct is suspicion — you need their eyes occasionally."
  },

  "citizen+swimmer": {
    whatYouShare: "You both reject premature certainty. The Abundant questions assumed scarcity; the Deep questions assumed answers. Neither of you accepts the obvious frame. You share an intellectual honesty about what isn't yet known.",
    whereYouPush: "The Abundant wants to build on their conclusions; the Deep wants to keep questioning. You'll frustrate each other — the Abundant feels ready to act while the Deep is still unpacking assumptions. The Deep may feel the Abundant moves too fast; the Abundant may feel the Deep never arrives anywhere.",
    whatYouCreate: "Well-examined abundance. When you build together, the Deep ensures the Abundant isn't building on shaky foundations. Your shared work tends to be optimistic AND rigorous.",
    whatsMissing: "You're both comfortable in abstraction. Neither of you is naturally grounded in the embodied and immediate.",
    missingInGroup: "The Rooted or the Present can bring you back to earth.",
    missingStandalone: "Make sure someone in your life pulls you into the actual and physical."
  },

  "citizen+rooted": {
    whatYouShare: "You both believe in enough. The Abundant thinks enough is achievable through expansion; the Rooted thinks enough is available through acceptance. Different paths, same destination: the conviction that the race can stop. You share a fundamental rejection of scarcity-driven striving.",
    whereYouPush: "The Abundant wants to build more access; the Rooted wants to appreciate what's here. You'll push each other on movement versus stillness — the Abundant may feel the Rooted has given up on growth; the Rooted may feel the Abundant can't rest in sufficiency. You're arguing about whether abundance requires activity.",
    whatYouCreate: "Sustainable prosperity. The Abundant prevents the Rooted from withdrawal; the Rooted prevents the Abundant from acceleration addiction. Together, you find the pace that feeds without exhausting.",
    whatsMissing: "Neither of you is drawn to friction or difficulty. Comfort is welcome to both of you — sometimes too welcome.",
    missingInGroup: "A Challenger will push you both out of ease when ease becomes stagnation.",
    missingStandalone: "Find someone who craves difficulty to shake you when you need shaking."
  },

  "citizen+conscience": {
    whatYouShare: "Oddly, you both see systems. The Abundant sees systems that could work; the Guardian sees systems that are failing. You share the ability to look at structure rather than just surface. Neither of you is naive about how things are organized.",
    whereYouPush: "This is your productive tension. The Abundant trusts the architecture; the Guardian tests the walls for cracks. You'll frustrate each other constantly — the Abundant feels exhausted by suspicion; the Guardian feels endangered by trust. Neither is wrong. You're arguing about the default setting: faith or vigilance?",
    whatYouCreate: "Systems with built-in accountability. The Abundant designs for generosity; the Guardian designs for transparency. When you build together, things tend to be both open and honest.",
    whatsMissing: "You're both watchful at different scales. Neither of you is naturally present to the immediate human moment.",
    missingInGroup: "The Present reminds you that systems are made of people who need attention, not just access or accountability.",
    missingStandalone: "Don't forget the person in front of you while you're designing or watching the architecture."
  },

  "citizen+embers": {
    whatYouShare: "You both value what exists. The Abundant wants to expand access to it; the Keeper wants to preserve it. Neither of you is interested in destruction for its own sake. You share a conviction that there's something here worth protecting and sharing.",
    whereYouPush: "The Abundant looks forward; the Keeper looks back. You'll push each other on time orientation — the Abundant may feel the Keeper is stuck in the past; the Keeper may feel the Abundant rushes toward novelty without honoring what worked. The question between you: what deserves to be carried forward?",
    whatYouCreate: "Abundance with memory. The Abundant prevents hoarding; the Keeper prevents forgetting. Together, you build things that are generous AND rooted in what came before.",
    whatsMissing: "Neither of you is naturally drawn to question everything. You both have convictions that might deserve examination.",
    missingInGroup: "The Deep will ask the questions you're both avoiding.",
    missingStandalone: "Find someone who lives in questions — your certainties need testing."
  },

  "citizen+friction": {
    whatYouShare: "You both believe in human capacity. The Abundant trusts that people flourish with resources; the Challenger trusts that people flourish with resistance. Different methods, shared faith: humans are capable of more than we're currently showing.",
    whereYouPush: "This is a fundamental tension. The Abundant wants to make things easier; the Challenger wants to keep things hard. You'll argue about whether struggle is necessary — the Abundant may feel the Challenger manufactures suffering; the Challenger may feel the Abundant is building a comfortable prison. Neither is entirely wrong.",
    whatYouCreate: "Abundance that doesn't soften. The Challenger ensures the Abundant doesn't remove all friction; the Abundant ensures the Challenger doesn't worship difficulty. Together, you build things that support without coddling.",
    whatsMissing: "Neither of you is naturally cautious or conservative. You're both pushing in some direction.",
    missingInGroup: "A Guardian or a Keeper can slow you both down.",
    missingStandalone: "Find someone who asks \"should we?\" when you're both asking \"how far?\""
  },

  "citizen+unbound": {
    whatYouShare: "You both imagine past limits. The Abundant imagines past scarcity; the Transcendent imagines past the self. Neither of you accepts current constraints as permanent. You share an expansive vision that most people find uncomfortable or unrealistic.",
    whereYouPush: "The Abundant expands within the human; the Transcendent expands beyond it. You'll push each other on what to keep — the Abundant may feel the Transcendent abandons too much; the Transcendent may feel the Abundant is still playing inside the box. The question: does transcendence require leaving everything behind?",
    whatYouCreate: "Possibility space. You're both imagining what's next, just at different scales. Together, you create room for futures most people can't yet conceive.",
    whatsMissing: "Neither of you is grounded in the here and now. You're both reaching toward something.",
    missingInGroup: "The Present or the Rooted will remind you what's actually happening on the ground.",
    missingStandalone: "Make sure someone in your life keeps you tethered to the embodied and immediate."
  },

  "alive+citizen": {
    whatYouShare: "You both believe life should be full. The Abundant wants everyone to have access; the Alive wants to feel everything available. You share an orientation toward yes rather than no, toward more rather than less, toward opening rather than closing.",
    whereYouPush: "The Abundant thinks about systems; the Alive thinks about sensations. You'll push each other on what \"more\" means — is it more access or more experience? The Abundant may feel the Alive is self-indulgent; the Alive may feel the Abundant is too abstract, too far from the body.",
    whatYouCreate: "Abundance you can feel. The Abundant ensures it's shared; the Alive ensures it's embodied. Together, you make things that are both accessible and vivid.",
    whatsMissing: "Neither of you is naturally vigilant. You're both oriented toward yes, which means you might miss the warning signs.",
    missingInGroup: "A Guardian can see what you're both too open to notice.",
    missingStandalone: "Find someone who watches the edges while you're enjoying the center."
  },

  "citizen+mender": {
    whatYouShare: "You both believe in fixing things. The Abundant wants to expand access; the Mender wants to repair what's broken. Neither of you is interested in tearing down and starting over when improvement is possible. You share a commitment to making things work better.",
    whereYouPush: "The Abundant builds new systems; the Mender fixes existing ones. You'll push each other on when to repair versus when to replace — the Abundant may feel the Mender is too attached to what exists; the Mender may feel the Abundant abandons too quickly. The tension is about loyalty to what's already here.",
    whatYouCreate: "Systems that work and keep working. The Abundant builds for scale; the Mender ensures ongoing function. Together, you make things that are both ambitious and maintainable.",
    whatsMissing: "Neither of you is naturally questioning. You're both in fix-and-build mode, which can mean moving past assumptions that deserve examination.",
    missingInGroup: "A Deep will slow you down just enough to ask the hard questions.",
    missingStandalone: "Before you fix or build, find someone who asks whether you should."
  },

  "citizen+cleareyed": {
    whatYouShare: "You both reject comfortable lies. The Abundant rejects the lie of scarcity; the Truth-Teller rejects lies in general. Neither of you is interested in pretending things are other than they are. You share a commitment to seeing clearly.",
    whereYouPush: "The Abundant leans toward optimism; the Truth-Teller leans toward honesty, which sometimes means pessimism. You'll push each other on whether hope is a form of clarity or a form of denial. The Abundant may feel the Truth-Teller is unnecessarily harsh; the Truth-Teller may feel the Abundant sugar-coats difficult realities.",
    whatYouCreate: "Honest abundance. The Abundant brings the vision; the Truth-Teller ensures it's grounded in reality. Together, you build optimism that can withstand scrutiny.",
    whatsMissing: "Neither of you is naturally tender. You're both clear-eyed in different ways, but neither prioritizes warmth.",
    missingInGroup: "The Present or the Alive can bring the human warmth you both sometimes forget.",
    missingStandalone: "Don't forget that people need to feel held, not just resourced or informed."
  },

  "between+citizen": {
    whatYouShare: "You both reject false certainties. The Abundant knows scarcity is often constructed; the Liminal knows that most positions are more fluid than they appear. Neither of you is satisfied with the obvious answer. You share an intellectual restlessness.",
    whereYouPush: "The Abundant has arrived at a position (abundance is possible); the Liminal is still arriving. You'll push each other on timing — the Abundant may feel the Liminal is stuck in uncertainty; the Liminal may feel the Abundant has closed too quickly. The question: when is it time to decide?",
    whatYouCreate: "Openness that's still grounded. The Abundant prevents the Liminal from floating forever; the Liminal prevents the Abundant from assuming their frame is final. Together, you hold both possibility and questioning.",
    whatsMissing: "Neither of you is naturally rooted in tradition or memory. You're both forward-facing in different ways.",
    missingInGroup: "A Keeper can remind you what's worth carrying forward from the past.",
    missingStandalone: "Make sure someone in your life holds the memory while you both reach toward what's next."
  },

  // ============================================
  // BUILDER (shaper) combinations
  // ============================================

  "shaper+shaper": {
    whatYouShare: "You both build. Neither of you is waiting for conditions to be perfect. You share an orientation toward action, toward making things exist rather than talking about them existing. In a room of planners, you're the two with sawdust on your hands.",
    whereYouPush: "Two builders can collide over blueprints. You'll push each other on whose vision gets built — neither of you is naturally collaborative in the \"let's talk this through\" sense. You both prefer to prototype and iterate. The risk: parallel construction that never integrates.",
    whatYouCreate: "Things that exist. Two builders produce. The question isn't whether you'll make something; it's whether you'll make one thing together or two things side by side.",
    whatsMissing: "Neither of you is naturally inclined to pause and question. You're both in motion.",
    missingInGroup: "A Deep or a Rooted can slow you down before you build the wrong thing fast.",
    missingStandalone: "Find someone who asks \"should we?\" before you've already shipped."
  },

  "architect+shaper": {
    whatYouShare: "You're both builders, different blueprints. The Builder builds from scratch; the Architect builds for collective ownership. Neither of you accepts the world as it is. You share the conviction that better structures are possible.",
    whereYouPush: "The Builder wants to tear down and rebuild; the Architect wants to redesign while preserving the commons. You'll push each other on destruction versus renovation — the Builder may feel the Architect is too attached to process; the Architect may feel the Builder is too willing to break what works.",
    whatYouCreate: "Structures that are bold and accountable. The Builder provides momentum; the Architect provides governance. Together, you make things that actually change reality while belonging to everyone.",
    whatsMissing: "Neither of you is naturally present to the individual. You're both thinking at the level of systems.",
    missingInGroup: "The Present can remind you that structures are for people, not the other way around.",
    missingStandalone: "Don't forget the human in front of you while you're designing the architecture."
  },

  "presence+shaper": {
    whatYouShare: "You both believe in showing up. The Builder shows up with tools; the Present shows up with attention. Neither of you is abstract about commitment. You share a willingness to be where you are, fully.",
    whereYouPush: "This is creative friction. The Builder wants momentum; the Present wants pause. You'll push each other on timing — the Builder may feel the Present is hesitant; the Present may feel the Builder is rushing past something important. Neither is wrong. You need both speeds.",
    whatYouCreate: "Work that ships and breathes. The Builder gives it form; the Present makes sure the form holds something true. Together, you make things that exist AND matter.",
    whatsMissing: "Neither of you is naturally questioning at the abstract level. You're both oriented toward the concrete.",
    missingInGroup: "A Deep can step back and ask the philosophical questions you're both skipping.",
    missingStandalone: "Find someone who lives in questions to stress-test your assumptions."
  },

  "shaper+swimmer": {
    whatYouShare: "Oddly, you're both rigorous. The Builder builds; the Deep questions. Neither of you accepts surface answers. You share an insistence on going deeper — the Builder through iteration, the Deep through inquiry.",
    whereYouPush: "The Builder wants to build while the Deep is still questioning. You'll frustrate each other — the Builder feels ready to act; the Deep feels the acting is premature. The Builder may call it paralysis; the Deep may call it recklessness. Both are sometimes right.",
    whatYouCreate: "Examined structures. The Builder ensures something gets built; the Deep ensures it's built on solid foundations. Together, you produce things that exist AND withstand scrutiny.",
    whatsMissing: "Neither of you is naturally oriented toward preservation. You're both moving — one toward the new, one toward the deep.",
    missingInGroup: "A Keeper can remember what's worth keeping while you're both pushing forward.",
    missingStandalone: "Find someone who holds the past while you and your collaborators build and question."
  },

  "rooted+shaper": {
    whatYouShare: "You both know what you're about. The Builder commits to building; the Rooted commits to staying. Neither of you is wavering. You share a kind of solidity, though you apply it differently.",
    whereYouPush: "This is your fundamental tension. The Builder can't stop building; the Rooted has chosen to stop. Your stillness looks like stagnation to them; their movement looks like flight to you. You're arguing about the fundamental nature of growth — whether it requires motion.",
    whatYouCreate: "Grounded momentum. The Builder prevents the Rooted from withdrawal; the Rooted prevents the Builder from building for building's sake. Together, you find the pace that builds what matters without racing past meaning.",
    whatsMissing: "Neither of you is naturally drawn to questions or vigilance. You're both certain, just about different things.",
    missingInGroup: "A Deep or Guardian can introduce the doubt you're both avoiding.",
    missingStandalone: "Find someone who questions and watches — your certainties need testing."
  },

  "conscience+shaper": {
    whatYouShare: "You both take things seriously. The Builder takes building seriously; the Guardian takes watching seriously. Neither of you is casual about what matters. You share an intensity that some find exhausting.",
    whereYouPush: "The Builder builds; the Guardian watches for what's wrong. You'll push each other on action versus vigilance — the Builder may feel the Guardian is paranoid; the Guardian may feel the Builder is naive. The Builder wants to create; the Guardian wants to protect. Different instincts, potentially complementary.",
    whatYouCreate: "Accountable structures. The Builder provides the making; the Guardian ensures the making doesn't hide anything harmful. Together, you build things that are both bold and transparent.",
    whatsMissing: "Neither of you is naturally soft or yielding. You're both intense in your orientations.",
    missingInGroup: "The Present or the Alive can bring warmth to your serious work.",
    missingStandalone: "Don't forget that people need tenderness, not just structures and surveillance."
  },

  "embers+shaper": {
    whatYouShare: "You're both committed, but to different time horizons. The Builder looks forward; the Keeper looks back. Neither of you is disengaged. You share a seriousness about what matters.",
    whereYouPush: "This is your tension. The Builder wants to tear down and rebuild; the Keeper guards what came before. Your treasures look like obstacles to them; their innovations look like amnesia to you. You're arguing about what deserves to survive the next revolution.",
    whatYouCreate: "New things with roots. The Builder prevents the Keeper from becoming a fortress; the Keeper prevents the Builder from forgetting. Together, you make things that are both fresh and grounded in what worked.",
    whatsMissing: "Neither of you is naturally questioning in the philosophical sense. You're both doing, just in different temporal directions.",
    missingInGroup: "A Deep can ask the abstract questions you're both avoiding.",
    missingStandalone: "Find someone who sits with hard questions while you both work on your different projects."
  },

  "friction+shaper": {
    whatYouShare: "You both crave action. The Builder builds; the Challenger seeks difficulty. Neither of you is comfortable with stasis. You share a restlessness that some people find exhausting and others find inspiring.",
    whereYouPush: "You're natural allies — the Builder builds, the Challenger pushes. You'll amplify each other, which can be powerful or dangerous. The risk is escalation: building bigger, pushing harder, neither of you willing to stop. Someone needs to ask: is this good?",
    whatYouCreate: "Ambitious structures. You're both oriented toward effort and achievement. Together, you build things that require everything you have to build.",
    whatsMissing: "Neither of you is naturally inclined to pause, question, or soften. You're both going hard.",
    missingInGroup: "A Rooted or Present can slow you down before you burn out.",
    missingStandalone: "Find someone who knows when to stop — you both need that voice in your life."
  },

  "shaper+unbound": {
    whatYouShare: "You both reach beyond what is. The Builder builds toward what could be; the Transcendent imagines past all limits. Neither of you is satisfied with current constraints. You share an expansive orientation.",
    whereYouPush: "The Builder stays embodied; the Transcendent wants to leave the body behind. You'll push each other on what to keep — the Builder may feel the Transcendent abandons too much; the Transcendent may feel the Builder is still playing inside the box. Different scales of ambition.",
    whatYouCreate: "Bridges between here and beyond. The Builder provides the concrete; the Transcendent provides the vision. Together, you make things that actually exist AND point toward something larger.",
    whatsMissing: "Neither of you is naturally rooted in what is. You're both reaching.",
    missingInGroup: "The Rooted or the Present can keep you tethered to the actual.",
    missingStandalone: "Find someone who knows how to stay — you both need grounding."
  },

  "alive+shaper": {
    whatYouShare: "You both engage fully. The Builder builds with everything they have; the Alive feels with everything they have. Neither of you holds back. You share an intensity of engagement that some find overwhelming.",
    whereYouPush: "The Builder lives in action; the Alive lives in sensation. You'll push each other on what matters more — doing or experiencing. The Builder may feel the Alive is self-indulgent; the Alive may feel the Builder misses the texture of being alive.",
    whatYouCreate: "Work that's felt. The Builder ensures something exists; the Alive ensures it's worth experiencing. Together, you make things that are both real and vivid.",
    whatsMissing: "Neither of you is naturally reflective or questioning. You're both in it, just differently.",
    missingInGroup: "A Deep can step back and ask the questions you're both too engaged to notice.",
    missingStandalone: "Find someone who pauses and reflects — you need their perspective."
  },

  "mender+shaper": {
    whatYouShare: "You both fix things. The Builder builds new; the Mender repairs existing. Neither of you leaves things broken. You share a commitment to making things work.",
    whereYouPush: "The Builder wants to tear down and rebuild; the Mender wants to repair. You'll push each other on when to start over versus when to maintain — the Builder may feel the Mender is too attached; the Mender may feel the Builder abandons too easily. The tension is about loyalty to what exists.",
    whatYouCreate: "Things that get built and keep working. The Builder provides the new; the Mender ensures the ongoing. Together, you make structures that are both ambitious and sustainable.",
    whatsMissing: "Neither of you is naturally questioning at the philosophical level. You're both in fix-it mode.",
    missingInGroup: "A Deep can ask why before you've already fixed it.",
    missingStandalone: "Find someone who sits with questions — you need that perspective before you act."
  },

  "cleareyed+shaper": {
    whatYouShare: "You both produce. The Builder produces structures; the Truth-Teller produces clarity. Neither of you hides from what needs to be done or said. You share a bias toward action over deliberation.",
    whereYouPush: "The Builder builds; the Truth-Teller tells. You'll push each other on priorities — the Builder may feel the Truth-Teller is too focused on critique; the Truth-Teller may feel the Builder moves without enough honesty about what they're building.",
    whatYouCreate: "Honest structures. The Builder provides the making; the Truth-Teller ensures nothing false gets built in. Together, you produce things that are both real and true.",
    whatsMissing: "Neither of you is naturally tender or patient. You're both in motion.",
    missingInGroup: "The Present can bring the warmth and patience you're both missing.",
    missingStandalone: "Don't forget that people need tenderness, not just structures and truths."
  },

  "between+shaper": {
    whatYouShare: "You both navigate uncertainty. The Builder builds through it; the Liminal dwells in it. Neither of you requires certainty before engaging. You share a comfort with not knowing — expressed differently.",
    whereYouPush: "The Builder acts; the Liminal waits. You'll push each other on timing — the Builder may feel the Liminal is stuck; the Liminal may feel the Builder decides too quickly. The question: when is uncertainty an invitation to act versus an invitation to wait?",
    whatYouCreate: "Structures that hold uncertainty. The Builder gives form to what the Liminal is still questioning. Together, you make things that exist without pretending to have all the answers.",
    whatsMissing: "Neither of you is naturally oriented toward preservation or memory. You're both forward-facing in different ways.",
    missingInGroup: "A Keeper can hold what's worth keeping while you both navigate what's next.",
    missingStandalone: "Find someone who remembers where you came from while you figure out where you're going."
  },

  // ============================================
  // ARCHITECT combinations
  // ============================================

  "architect+architect": {
    whatYouShare: "You both build systems. Neither of you accepts that the way things are is the way they must be. You share an ability to see the invisible architecture — and a commitment to redesigning it for everyone.",
    whereYouPush: "Two systems thinkers can disagree on which systems matter. You'll push each other on priorities — whose vision of collective ownership wins? The risk: process becomes the product. You might design beautifully together, or you might design forever without shipping.",
    whatYouCreate: "Structures that belong to everyone who uses them. Two Architects produce robust systems. The question is whether they produce one together or two in parallel.",
    whatsMissing: "Neither of you is naturally oriented toward the individual human moment. You're both thinking at scale.",
    missingInGroup: "The Present can remind you that your systems are for people, not the other way around.",
    missingStandalone: "Don't forget the person in front of you while you're perfecting the architecture."
  },

  "architect+presence": {
    whatYouShare: "You both care about what works. The Architect builds systems that work; the Present shows up with attention that works. Neither of you is interested in performance over substance. You share a commitment to things actually mattering.",
    whereYouPush: "The Architect thinks at scale; the Present thinks at the individual level. You'll push each other on where to focus — the Architect may miss the person while designing for millions; the Present may miss the system while attending to one. Neither is wrong. You need both scales.",
    whatYouCreate: "Systems that actually serve people. The Architect provides the structure; the Present ensures the structure doesn't forget who it's for. Together, you build things that are both scalable and human.",
    whatsMissing: "Neither of you is naturally oriented toward disruption or challenge. You're both maintenance-minded in different ways.",
    missingInGroup: "A Challenger can push you both out of your comfort zones when needed.",
    missingStandalone: "Find someone who craves difficulty — you need to be shaken sometimes."
  },

  "architect+swimmer": {
    whatYouShare: "You both think deeply about how things work. The Architect thinks about systems; the Deep thinks about questions. Neither of you accepts surface explanations. You share a rigorous turn of mind.",
    whereYouPush: "The Architect builds on their conclusions; the Deep keeps questioning. You'll push each other on when to stop thinking and start making — the Architect may feel ready while the Deep is still unpacking assumptions. The Architect gives your questions structure; the Deep ensures your structures are built on solid ground.",
    whatYouCreate: "Well-founded systems. The Architect provides the blueprint; the Deep ensures the foundation is solid. Together, you build things that are both functional and examined.",
    whatsMissing: "Neither of you is naturally action-oriented in the scrappy, build-now sense. You're both somewhat cautious.",
    missingInGroup: "A Builder can push you both toward actually shipping something.",
    missingStandalone: "Find someone who builds while you're still thinking — you need their momentum."
  },

  "architect+rooted": {
    whatYouShare: "You both value what lasts. The Architect builds systems that endure; the Rooted chooses patterns that sustain. Neither of you is chasing novelty. You share a long-term orientation.",
    whereYouPush: "The Architect is still building; the Rooted has stopped. You'll push each other on whether more structure is needed — the Architect may feel the Rooted has given up too soon; the Rooted may feel the Architect can't rest in enough.",
    whatYouCreate: "Sustainable systems. The Architect provides the structure; the Rooted provides the wisdom of sufficiency. Together, you build things that last without growing endlessly.",
    whatsMissing: "Neither of you is naturally oriented toward sensation or intensity. You're both somewhat measured.",
    missingInGroup: "The Alive can bring the vivid experience you're both somewhat distant from.",
    missingStandalone: "Don't forget that life includes feeling, not just structuring and settling."
  },

  "architect+conscience": {
    whatYouShare: "You both see systems. The Architect sees systems that could work for everyone; the Guardian sees systems that are failing or hiding something. Neither of you is naive about how power operates. You share a structural awareness that most people lack.",
    whereYouPush: "The Architect designs; the Guardian critiques. You'll push each other on whether to build or watch — the Architect may feel the Guardian only sees problems; the Guardian may feel the Architect is too trusting of their own designs.",
    whatYouCreate: "Accountable architecture. The Architect provides the structure; the Guardian provides the oversight. Together, you build systems that are both functional and transparent.",
    whatsMissing: "Neither of you is naturally warm or intimate. You're both operating at a certain remove.",
    missingInGroup: "The Present or the Alive can bring the human warmth you're both missing.",
    missingStandalone: "Don't forget that people need to feel held, not just housed in good systems."
  },

  "architect+embers": {
    whatYouShare: "You both care about what lasts. The Architect builds structures; the Keeper preserves memory. Neither of you is cavalier about continuity. You share a commitment to things that endure.",
    whereYouPush: "The Architect designs new systems; the Keeper preserves old wisdom. You'll push each other on innovation versus tradition — the Architect may feel the Keeper resists necessary change; the Keeper may feel the Architect ignores what already worked.",
    whatYouCreate: "Systems with memory. The Architect provides the new structure; the Keeper ensures it carries forward what's worth keeping. Together, you build institutions that are both fresh and rooted.",
    whatsMissing: "Neither of you is naturally questioning at the philosophical level. You're both building and keeping, not questioning whether to.",
    missingInGroup: "A Deep can ask the hard questions you're both avoiding.",
    missingStandalone: "Find someone who lives in questions — your certainties deserve examination."
  },

  "architect+friction": {
    whatYouShare: "You both believe in building. The Architect builds systems; the Challenger builds through difficulty. Neither of you is passive. You share an orientation toward making things happen.",
    whereYouPush: "The Architect wants things to work smoothly; the Challenger believes friction is valuable. You'll push each other on ease versus difficulty — the Architect may feel the Challenger manufactures problems; the Challenger may feel the Architect avoids necessary struggle.",
    whatYouCreate: "Robust systems. The Architect provides the structure; the Challenger stress-tests it. Together, you build things that work AND can withstand pressure.",
    whatsMissing: "Neither of you is naturally oriented toward stillness or rest. You're both in motion.",
    missingInGroup: "The Rooted can remind you when enough is enough.",
    missingStandalone: "Find someone who knows when to stop — you both need that voice."
  },

  "architect+unbound": {
    whatYouShare: "You both think beyond current limits. The Architect designs structures that don't yet exist; the Transcendent imagines states of being that don't yet exist. Neither of you is constrained by what is. You share an expansive imagination.",
    whereYouPush: "The Architect stays embodied in structures; the Transcendent wants to transcend structure entirely. You'll push each other on whether liberation requires architecture or escape from it — a fundamental disagreement about what freedom looks like.",
    whatYouCreate: "Bridges between form and beyond-form. The Architect provides the container; the Transcendent points beyond it. Together, you create structures that hold space for transcendence.",
    whatsMissing: "Neither of you is naturally grounded in the simple and immediate. You're both reaching.",
    missingInGroup: "The Present or the Rooted can keep you tethered to actual life.",
    missingStandalone: "Don't forget the embodied moment while you're designing and transcending."
  },

  "alive+architect": {
    whatYouShare: "You both want things to work. The Architect wants systems to work; the Alive wants experience to work. Neither of you is satisfied with dysfunction. You share a commitment to things actually functioning.",
    whereYouPush: "The Architect thinks about structure; the Alive thinks about sensation. You'll push each other on what \"working\" means — does it work if the numbers add up or if people feel alive? The Architect may seem cold to the Alive; the Alive may seem undisciplined to the Architect.",
    whatYouCreate: "Systems that feel good to live in. The Architect provides the structure; the Alive ensures the structure doesn't deaden experience. Together, you build things that are both functional and vivid.",
    whatsMissing: "Neither of you is naturally oriented toward vigilance or critique. You're both building or feeling, not watching for problems.",
    missingInGroup: "A Guardian can see the cracks you're both missing.",
    missingStandalone: "Find someone who watches the edges while you're designing and experiencing."
  },

  "architect+mender": {
    whatYouShare: "You both care about things that work. The Architect designs new systems; the Mender repairs existing ones. Neither of you walks away from dysfunction. You share a commitment to making things actually function.",
    whereYouPush: "The Architect builds new; the Mender fixes old. You'll push each other on when to design from scratch versus when to repair — the Architect may feel the Mender is too attached to what exists; the Mender may feel the Architect abandons too easily.",
    whatYouCreate: "Systems that work and keep working. The Architect provides the design; the Mender provides the maintenance. Together, you build things that are both well-designed and well-maintained.",
    whatsMissing: "Neither of you is naturally oriented toward disruption or transcendence. You're both in the realm of what works.",
    missingInGroup: "A Transcendent or Challenger can push you beyond the functional.",
    missingStandalone: "Find someone who asks \"what if we didn't fix it at all?\" — you need that perspective."
  },

  "architect+cleareyed": {
    whatYouShare: "You both value clarity. The Architect builds clear systems; the Truth-Teller speaks clear truths. Neither of you tolerates muddiness. You share a commitment to things being what they say they are.",
    whereYouPush: "The Architect designs; the Truth-Teller names what's true. You'll push each other on action versus diagnosis — the Architect may feel ready to build while the Truth-Teller is still naming problems; the Truth-Teller may feel the Architect builds over unspoken truths.",
    whatYouCreate: "Honest systems. The Architect provides the structure; the Truth-Teller ensures nothing is hidden inside it. Together, you build things that are both functional and transparent.",
    whatsMissing: "Neither of you is naturally tender or yielding. You're both clear and somewhat hard.",
    missingInGroup: "The Present can bring the warmth you're both missing.",
    missingStandalone: "Don't forget that people need gentleness, not just systems and truths."
  },

  "architect+between": {
    whatYouShare: "You both navigate complexity. The Architect designs systems to handle it; the Liminal holds it without needing to resolve it. Neither of you pretends things are simpler than they are. You share a sophistication about how complicated reality is.",
    whereYouPush: "The Architect structures uncertainty; the Liminal dwells in it. You'll push each other on when to build versus when to wait — the Architect may feel the Liminal is avoiding decision; the Liminal may feel the Architect forecloses too soon.",
    whatYouCreate: "Structures that hold complexity. The Architect gives form to what the Liminal knows is fluid. Together, you build things that function without pretending to have certainty.",
    whatsMissing: "Neither of you is naturally oriented toward action in the scrappy, just-do-it sense. You're both somewhat deliberate.",
    missingInGroup: "A Builder can push you both toward actually shipping something.",
    missingStandalone: "Find someone who builds while you're still structuring and questioning."
  },

  // ============================================
  // PRESENT (presence) combinations
  // ============================================

  "presence+presence": {
    whatYouShare: "You both show up fully. Neither of you is elsewhere when you're here. You share an unusual capacity to actually be in the room. Conversations between you land differently — two people genuinely attending to each other.",
    whereYouPush: "Two people in presence mode might not push enough. You'll both stay, hold space, attend — but who acts? Who breaks the stillness when breaking it is what's needed?",
    whatYouCreate: "Depth of attention. You're capable of a quality of presence that most conversations never reach. Whether anything else happens is the question.",
    whatsMissing: "Neither of you is naturally oriented toward systems-thinking or large-scale change. You're both in the moment.",
    missingInGroup: "An Architect or Builder can think and act at the scale you're both not attending to.",
    missingStandalone: "Find someone who builds while you're both being present — you need their reach."
  },

  "presence+swimmer": {
    whatYouShare: "You both resist rushing. The Present stays in the moment; the Deep stays in the question. Neither of you is grabbed by urgency. You share a willingness to let things unfold rather than forcing resolution.",
    whereYouPush: "The Present attends to what is; the Deep asks about what could be. You'll push each other on attention versus inquiry — the Present may feel the Deep is never satisfied with now; the Deep may feel the Present doesn't think beyond the immediate.",
    whatYouCreate: "Grounded questions. The Present prevents the Deep from floating away; the Deep gives the Present something to think about besides the moment. Together, you hold both presence and inquiry.",
    whatsMissing: "Neither of you is naturally action-oriented. You're both dwelling.",
    missingInGroup: "A Builder can push you both toward actually making something.",
    missingStandalone: "Find someone who builds while you're both staying and questioning."
  },

  "presence+rooted": {
    whatYouShare: "You both stay. The Present stays with attention; the Rooted stays with commitment. Neither of you is running toward what's next. You share an understanding that being here is enough — maybe more than enough.",
    whereYouPush: "You understand each other. The risk is that you understand each other so well you never challenge each other. You might both stay, forever, comfortable, while the world burns. Someone needs to break the stillness occasionally.",
    whatYouCreate: "Genuine stability. You're both grounded in different ways — attention and commitment. Together, you create a kind of peace that most people have forgotten how to find.",
    whatsMissing: "Neither of you is naturally oriented toward disruption, difficulty, or scale. You're both local and present.",
    missingInGroup: "A Challenger or Builder can shake you both when shaking is what's needed.",
    missingStandalone: "Find someone who craves difficulty — you need to be disturbed sometimes."
  },

  "conscience+presence": {
    whatYouShare: "You both see what's actually happening. The Present sees the person; the Guardian sees the system. Neither of you is fooled by surfaces. You share a commitment to what's real.",
    whereYouPush: "The Present attends warmly; the Guardian attends suspiciously. You'll push each other on the stance toward reality — the Present may feel the Guardian is too vigilant; the Guardian may feel the Present is too trusting.",
    whatYouCreate: "Grounded vigilance. The Present provides the warmth; the Guardian provides the watching. Together, you see what's actually happening without losing tenderness.",
    whatsMissing: "Neither of you is naturally oriented toward building or creating at scale. You're both watching, differently.",
    missingInGroup: "A Builder can make something while you're both seeing what's happening.",
    missingStandalone: "Find someone who builds while you both attend — you need their making."
  },

  "embers+presence": {
    whatYouShare: "You both value what's here. The Present values this moment; the Keeper values what came before. Neither of you is chasing what's next. You share an orientation toward what already exists.",
    whereYouPush: "The Present holds now; the Keeper holds then. You'll push each other on time orientation — not as tension, but as complement. The Present can feel the Keeper living in the past; the Keeper can feel the Present not honoring history.",
    whatYouCreate: "Memory and attention together. The Keeper ensures nothing is forgotten; the Present ensures something is felt right now. Together, you hold both past and present.",
    whatsMissing: "Neither of you is naturally oriented toward what's next. You're both backward- or present-facing.",
    missingInGroup: "A Builder or Transcendent can point toward the future you're both not attending to.",
    missingStandalone: "Find someone who reaches forward while you both hold what is and was."
  },

  "friction+presence": {
    whatYouShare: "Oddly, you both believe in full engagement. The Present engages through attention; the Challenger engages through difficulty. Neither of you is half-hearted. You share an intensity, differently directed.",
    whereYouPush: "This is your creative friction. The Present wants pause; the Challenger wants push. You'll frustrate each other — the Present may feel the Challenger can't sit still; the Challenger may feel the Present uses stillness to avoid growth.",
    whatYouCreate: "Challenge that's held. The Present provides the container; the Challenger provides the friction. Together, you create difficulty that doesn't destroy — growth that's witnessed.",
    whatsMissing: "Neither of you is naturally oriented toward systems or scale. You're both in the immediate.",
    missingInGroup: "An Architect can think at the scale you're both not seeing.",
    missingStandalone: "Find someone who thinks in systems while you both engage immediately."
  },

  "presence+unbound": {
    whatYouShare: "Not much on the surface. But you're both committed to your orientation — the Present to being here, the Transcendent to going beyond. You share a seriousness about what matters, even though you locate \"what matters\" differently.",
    whereYouPush: "This is fundamental tension. The Present is committed to being here; the Transcendent is committed to going beyond. You're arguing about what liberation means — staying or leaving, presence or transcendence.",
    whatYouCreate: "A genuine question. You're not going to agree easily. But together, you hold the tension between embodiment and transcendence that most people collapse into one side.",
    whatsMissing: "You're opposites in significant ways. Your common ground is harder to find.",
    missingInGroup: "Others can mediate the tension between you.",
    missingStandalone: "Learning from each other requires genuine effort. Don't skip it."
  },

  "alive+presence": {
    whatYouShare: "You both live in experience. The Present experiences through attention; the Alive experiences through sensation. Neither of you is abstract. You share a commitment to what's actually happening, felt in the body.",
    whereYouPush: "The Present holds steady; the Alive reaches for more. You'll push each other on intensity — the Present may feel the Alive is restless; the Alive may feel the Present doesn't want enough.",
    whatYouCreate: "Full experience. The Present provides the depth; the Alive provides the range. Together, you create a quality of living that most people rush past.",
    whatsMissing: "Neither of you is naturally oriented toward systems or critique. You're both in experience.",
    missingInGroup: "An Architect or Guardian can think and watch at the level you're both not attending to.",
    missingStandalone: "Find someone who thinks structurally — you need their perspective."
  },

  "mender+presence": {
    whatYouShare: "You both show up for what's here. The Present shows up with attention; the Mender shows up with repair. Neither of you is running toward what's next. You share a commitment to tending what exists.",
    whereYouPush: "The Present holds; the Mender fixes. You'll push each other on when to attend versus when to repair — the Present may feel the Mender is too quick to intervene; the Mender may feel the Present doesn't help enough.",
    whatYouCreate: "Tended space. The Present provides the attention; the Mender provides the maintenance. Together, you create spaces that are both held and working.",
    whatsMissing: "Neither of you is naturally oriented toward building something radically new. You're both in the realm of what exists.",
    missingInGroup: "A Builder can create while you both tend what's already here.",
    missingStandalone: "Find someone who builds the new while you care for the present."
  },

  "cleareyed+presence": {
    whatYouShare: "You both care about what's real. The Present attends to what's actually happening; the Truth-Teller names what's actually true. Neither of you is interested in pretense. You share a commitment to seeing and speaking clearly.",
    whereYouPush: "The Present holds with warmth; the Truth-Teller speaks with clarity. You'll push each other on when tenderness and truth conflict — the Present may feel the Truth-Teller is harsh; the Truth-Teller may feel the Present softens what needs to be sharp.",
    whatYouCreate: "Truth held with care. The Present provides the tenderness; the Truth-Teller provides the honesty. Together, you create spaces where hard things can be said and heard.",
    whatsMissing: "Neither of you is naturally oriented toward building at scale. You're both in the immediate human realm.",
    missingInGroup: "An Architect or Builder can think and act at the scale you're both not attending to.",
    missingStandalone: "Find someone who builds systems while you both attend and speak."
  },

  "between+presence": {
    whatYouShare: "You both resist premature closure. The Present stays with what is; the Liminal stays with what's uncertain. Neither of you rushes toward resolution. You share a capacity to hold space without collapsing it.",
    whereYouPush: "The Present has arrived (here); the Liminal is still arriving (anywhere). You'll push each other on groundedness versus openness — the Present may feel the Liminal is unrooted; the Liminal may feel the Present is too certain.",
    whatYouCreate: "Grounded uncertainty. The Present prevents the Liminal from floating; the Liminal prevents the Present from closing too soon. Together, you hold space that's both rooted and open.",
    whatsMissing: "Neither of you is naturally oriented toward building or asserting. You're both holding.",
    missingInGroup: "A Builder can act while you're both staying open.",
    missingStandalone: "Find someone who builds while you both hold space."
  },

  // ============================================
  // DEEP (swimmer) combinations
  // ============================================

  "swimmer+swimmer": {
    whatYouShare: "You both live in questions. Neither of you is satisfied with easy answers. You share a capacity to sit with uncertainty that most people find uncomfortable. Together, you'll explore depths others skip.",
    whereYouPush: "Two Deep might question forever. You'll need to push each other eventually toward decision, toward action, toward committing even without certainty. Or you'll enjoy the questions and never surface.",
    whatYouCreate: "Depth of inquiry. You're capable of a quality of questioning that most conversations never reach. Whether you ever decide anything is the open question.",
    whatsMissing: "Neither of you is naturally action-oriented. You're both dwelling in questions.",
    missingInGroup: "A Builder can act while you're both still questioning.",
    missingStandalone: "Find someone who builds — you need their decisiveness eventually."
  },

  "rooted+swimmer": {
    whatYouShare: "You both reject the obvious answer. The Deep questions it; the Rooted has stopped chasing it. Neither of you is grabbed by conventional ambition. You share a skepticism of the race most people are running.",
    whereYouPush: "The Deep is still seeking; the Rooted has stopped. You'll push each other on when questioning becomes its own attachment — the Deep may feel the Rooted gave up too soon; the Rooted may feel the Deep can't rest.",
    whatYouCreate: "Grounded inquiry. The Rooted prevents the Deep from floating; the Deep prevents the Rooted from closing too soon. Together, you hold depth without either restlessness or stagnation.",
    whatsMissing: "Neither of you is naturally oriented toward building or action. You're both somewhat still.",
    missingInGroup: "A Builder can make something while you're both dwelling and staying.",
    missingStandalone: "Find someone who acts while you're both being — you need their momentum."
  },

  "conscience+swimmer": {
    whatYouShare: "You both see what others miss. The Deep sees the questions no one's asking; the Guardian sees the problems no one's addressing. Neither of you is fooled by surfaces. You share a capacity to notice what's actually happening.",
    whereYouPush: "The Deep questions; the Guardian watches. You'll push each other on orientation — the Deep is more philosophical; the Guardian is more political. The Deep may feel the Guardian is too suspicious; the Guardian may feel the Deep is too abstract.",
    whatYouCreate: "Deep vigilance. The Deep provides the inquiry; the Guardian provides the surveillance. Together, you notice everything — questions, threats, patterns, gaps.",
    whatsMissing: "Neither of you is naturally oriented toward warmth or celebration. You're both somewhat serious.",
    missingInGroup: "The Present or the Alive can bring lightness and warmth.",
    missingStandalone: "Don't forget that life includes joy, not just questions and watching."
  },

  "embers+swimmer": {
    whatYouShare: "You both value what endures. The Deep asks questions that have mattered for millennia; the Keeper preserves wisdom that has mattered for millennia. Neither of you is chasing novelty. You share a long view.",
    whereYouPush: "The Deep questions even old wisdom; the Keeper guards it. You'll push each other on what deserves preservation versus examination — the Deep may feel the Keeper is uncritical; the Keeper may feel the Deep undermines what works.",
    whatYouCreate: "Examined tradition. The Deep ensures nothing is accepted blindly; the Keeper ensures nothing valuable is lost to questioning. Together, you hold wisdom that's both honored and interrogated.",
    whatsMissing: "Neither of you is naturally oriented toward action or creation. You're both in the realm of thinking and keeping.",
    missingInGroup: "A Builder can act on the wisdom you're both holding and questioning.",
    missingStandalone: "Find someone who makes things while you think and preserve."
  },

  "friction+swimmer": {
    whatYouShare: "You both disturb the comfortable. The Deep disturbs with questions; the Challenger disturbs with difficulty. Neither of you lets things settle too easily. You share a productive restlessness.",
    whereYouPush: "The Deep thinks; the Challenger acts. You'll push each other on when to reflect versus when to push — the Deep may feel the Challenger moves without thinking; the Challenger may feel the Deep thinks without moving.",
    whatYouCreate: "Questioned challenge. The Deep ensures the difficulty is meaningful; the Challenger ensures the questions lead somewhere. Together, you create disturbance that serves growth.",
    whatsMissing: "Neither of you is naturally oriented toward warmth or rest. You're both disturbing in different ways.",
    missingInGroup: "The Present or the Rooted can provide the stillness and warmth you're both missing.",
    missingStandalone: "Find someone who knows when to stop and hold — you both need that."
  },

  "swimmer+unbound": {
    whatYouShare: "You're natural allies. The Deep lives in questions; the Transcendent reaches past answers. Neither of you is satisfied with the given. You share a comfort with uncertainty that most people lack.",
    whereYouPush: "You might float together. Both of you are reaching beyond — one into depth, one into beyond. You'll need to push each other toward ground occasionally, toward the embodied and immediate.",
    whatYouCreate: "Expanded possibility. The Deep opens the questions; the Transcendent opens the horizons. Together, you create space for thoughts most people can't yet think.",
    whatsMissing: "Neither of you is naturally grounded or practical. You're both reaching.",
    missingInGroup: "The Present or the Rooted can anchor you both to actual reality.",
    missingStandalone: "Find someone who lives in the embodied moment — you need their gravity."
  },

  "alive+swimmer": {
    whatYouShare: "You both resist reduction. The Deep resists reducing to answers; the Alive resists reducing to concepts. Neither of you accepts the flattened version. You share a commitment to fullness.",
    whereYouPush: "The Deep thinks; the Alive feels. You'll push each other on what knowing looks like — the Deep may feel the Alive avoids rigor; the Alive may feel the Deep avoids embodiment.",
    whatYouCreate: "Full understanding. The Deep provides the inquiry; the Alive provides the felt sense. Together, you know things in multiple registers — thought and sensation.",
    whatsMissing: "Neither of you is naturally oriented toward action or structure. You're both in experience (mental or sensory).",
    missingInGroup: "A Builder or Architect can act and structure while you're both experiencing.",
    missingStandalone: "Find someone who builds while you question and feel."
  },

  "mender+swimmer": {
    whatYouShare: "You both take things seriously. The Deep takes questions seriously; the Mender takes repair seriously. Neither of you is casual about what matters. You share a commitment to doing it right.",
    whereYouPush: "This is productive tension. The Deep wants to understand before acting; the Mender wants to act before everything breaks. You'll frustrate each other — the Deep feels the Mender is hasty; the Mender feels the Deep is slow.",
    whatYouCreate: "Thoughtful repair. The Deep ensures you understand what's broken; the Mender ensures something gets fixed. Together, you repair things that stay repaired.",
    whatsMissing: "Neither of you is naturally oriented toward creation or transcendence. You're both in the realm of what exists.",
    missingInGroup: "A Builder or Transcendent can point toward what doesn't exist yet.",
    missingStandalone: "Find someone who creates the new — you both need that perspective."
  },

  "cleareyed+swimmer": {
    whatYouShare: "You both live in clarity. The Deep seeks clear questions; the Truth-Teller speaks clear truths. Neither of you tolerates muddiness. You share a respect for precision.",
    whereYouPush: "The Deep holds questions open; the Truth-Teller closes on answers. You'll push each other on when to stay open versus when to commit — the Deep may feel the Truth-Teller is too certain; the Truth-Teller may feel the Deep never commits.",
    whatYouCreate: "Examined truth. The Deep ensures truths are earned; the Truth-Teller ensures they're spoken. Together, you produce statements that are both honest and interrogated.",
    whatsMissing: "Neither of you is naturally warm or yielding. You're both in the realm of clarity.",
    missingInGroup: "The Present or the Alive can bring warmth to your precision.",
    missingStandalone: "Don't forget that people need tenderness, not just clarity."
  },

  "between+swimmer": {
    whatYouShare: "You're both comfortable with uncertainty. The Deep lives in questions; the Liminal lives in transitions. Neither of you has arrived at a final position. You share a capacity to hold not-knowing.",
    whereYouPush: "You understand each other deeply. The risk is that you understand each other so well you both float forever. Someone needs to push toward decision eventually.",
    whatYouCreate: "Sophisticated uncertainty. You're both holding complexity without collapsing it. Together, you create space for genuine not-knowing.",
    whatsMissing: "Neither of you is naturally decisive or action-oriented. You're both dwelling.",
    missingInGroup: "A Builder can act while you're both holding questions and uncertainty.",
    missingStandalone: "Find someone who decides — you both need that eventually."
  },

  // ============================================
  // ROOTED combinations
  // ============================================

  "rooted+rooted": {
    whatYouShare: "You both chose to stop. Neither of you is chasing what's next. You share a radical commitment to enough — the conviction that the race can end. Together, you understand something that growth-culture forgets.",
    whereYouPush: "Two in stillness might not push at all. You'll need to watch for when your shared peace becomes shared withdrawal. Someone needs to break the surface occasionally.",
    whatYouCreate: "Genuine peace. You're both grounded in ways that most people aren't. Together, you create a quality of stillness that serves everyone around you.",
    whatsMissing: "Neither of you is naturally oriented toward action, difficulty, or scale. You're both local and still.",
    missingInGroup: "A Builder or Challenger can shake you both when shaking is needed.",
    missingStandalone: "Find someone who moves while you both stay — you need their energy occasionally."
  },

  "conscience+rooted": {
    whatYouShare: "You both see what's actually happening. The Rooted sees what's here; the Guardian sees what's hidden. Neither of you is fooled by performance. You share a commitment to what's real.",
    whereYouPush: "The Rooted has made peace; the Guardian keeps watching. You'll push each other on acceptance versus vigilance — the Rooted may feel the Guardian can't rest; the Guardian may feel the Rooted has surrendered surveillance.",
    whatYouCreate: "Grounded awareness. The Rooted provides the stability; the Guardian provides the watching. Together, you see what's happening without anxiety or denial.",
    whatsMissing: "Neither of you is naturally oriented toward creation or building. You're both in the realm of seeing and staying.",
    missingInGroup: "A Builder can make something while you're both seeing and rooting.",
    missingStandalone: "Find someone who creates while you watch and stay."
  },

  "embers+rooted": {
    whatYouShare: "You both value what endures. The Rooted stays with simplicity; the Keeper stays with memory. Neither of you is chasing novelty. You share an appreciation for what already exists.",
    whereYouPush: "You're natural allies. The main risk is that you both hold onto things too long — the Rooted to stillness, the Keeper to the past. Someone may need to push you toward what's genuinely new.",
    whatYouCreate: "Continuity. The Rooted provides the stability; the Keeper provides the memory. Together, you create a grounding that most contexts desperately need.",
    whatsMissing: "Neither of you is naturally oriented toward the radically new or the transcendent. You're both in the realm of what is or was.",
    missingInGroup: "A Builder or Transcendent can point toward what's next.",
    missingStandalone: "Find someone who reaches forward while you both tend what exists and existed."
  },

  "friction+rooted": {
    whatYouShare: "Almost nothing on the surface. But you're both serious about your orientation — the Rooted about staying, the Challenger about moving. You share an intensity that some people find difficult.",
    whereYouPush: "This is fundamental tension. The Challenger craves difficulty; the Rooted chose stillness. You don't understand each other at all. Your peace looks like surrender to them; their restlessness looks like flight to you.",
    whatYouCreate: "A genuine tension. You're not going to agree. But together, you hold the poles — motion and stillness — that most people collapse into one side. That tension can be productive.",
    whatsMissing: "You're opposites. Finding common ground takes work.",
    missingInGroup: "Others can help mediate your different orientations.",
    missingStandalone: "Learning from each other requires genuine effort. The effort is worth it."
  },

  "rooted+unbound": {
    whatYouShare: "You're both clear about what you want. The Rooted wants to stay; the Transcendent wants to go beyond. Neither of you is wavering. You share a commitment, even though your commitments point in opposite directions.",
    whereYouPush: "This is productive tension. The Rooted grounds; the Transcendent floats. You'll push each other on what's worth keeping versus what's worth leaving — a fundamental question.",
    whatYouCreate: "The full range. Most people live in the middle. You're both at edges — one rooted deep, one reaching beyond. Together, you hold the whole spectrum of human possibility.",
    whatsMissing: "You're opposites. The middle ground doesn't interest either of you much.",
    missingInGroup: "Others can live in the middle you're both transcending or rooting away from.",
    missingStandalone: "The tension between you is itself valuable. Lean into it."
  },

  "alive+rooted": {
    whatYouShare: "You both value experience. The Rooted experiences through stillness; the Alive experiences through sensation. Neither of you is abstract. You share a commitment to actually living, not just thinking about living.",
    whereYouPush: "The Rooted stays still; the Alive reaches for more. You'll push each other on intensity — the Rooted may feel the Alive can't settle; the Alive may feel the Rooted is too restrained.",
    whatYouCreate: "Grounded sensation. The Rooted provides the container; the Alive fills it with experience. Together, you create living that's both rooted and vivid.",
    whatsMissing: "Neither of you is naturally oriented toward building or systems-thinking. You're both in experience.",
    missingInGroup: "An Architect or Builder can think and act at the scale you're both not attending to.",
    missingStandalone: "Find someone who builds while you both live fully in your different ways."
  },

  "mender+rooted": {
    whatYouShare: "You both tend what exists. The Rooted stays; the Mender repairs. Neither of you is chasing what's next. You share a commitment to caring for what's here.",
    whereYouPush: "You're natural allies. The main question is when repair becomes prolonging what should end. Both of you may hold onto things too long — the Rooted to stillness, the Mender to broken things that need releasing.",
    whatYouCreate: "Maintained peace. The Rooted provides the stillness; the Mender ensures things keep working. Together, you create spaces that are both calm and functional.",
    whatsMissing: "Neither of you is naturally oriented toward creation or disruption. You're both in the realm of what exists.",
    missingInGroup: "A Builder or Challenger can push toward the new or difficult.",
    missingStandalone: "Find someone who creates and challenges while you both tend what is."
  },

  "cleareyed+rooted": {
    whatYouShare: "You both live simply. The Rooted in simple living; the Truth-Teller in simple honesty. Neither of you is interested in performance or complexity for its own sake. You share an appreciation for what's essential.",
    whereYouPush: "The Rooted accepts; the Truth-Teller speaks. You'll push each other on when to be quiet versus when to speak — the Rooted may feel the Truth-Teller disrupts peace; the Truth-Teller may feel the Rooted avoids hard conversations.",
    whatYouCreate: "Honest simplicity. The Rooted provides the stability; the Truth-Teller ensures nothing is hidden. Together, you create spaces that are both peaceful and true.",
    whatsMissing: "Neither of you is naturally oriented toward expansion or possibility. You're both in the realm of what is.",
    missingInGroup: "The Abundant or Transcendent can point toward what could be.",
    missingStandalone: "Find someone who imagines possibility while you both hold ground and truth."
  },

  "between+rooted": {
    whatYouShare: "You both reject the conventional race. The Rooted has stopped running; the Liminal is still figuring out whether to run. Neither of you is grabbed by obvious ambition. You share skepticism about the paths most people take.",
    whereYouPush: "The Rooted has arrived; the Liminal is still arriving. You'll push each other on certainty versus openness — the Rooted may feel the Liminal is drifting; the Liminal may feel the Rooted closed too soon.",
    whatYouCreate: "Grounded uncertainty. The Rooted provides the anchor; the Liminal provides the questions. Together, you hold space that's both stable and open.",
    whatsMissing: "Neither of you is naturally oriented toward building or acting. You're both somewhat still.",
    missingInGroup: "A Builder can act while you're both staying and questioning.",
    missingStandalone: "Find someone who builds while you both dwell in your different ways."
  },

  // ============================================
  // GUARDIAN (conscience) combinations
  // ============================================

  "conscience+conscience": {
    whatYouShare: "You both watch. Neither of you is fooled by surfaces. You share a vigilance that most people find exhausting — and that's occasionally necessary. Together, you see everything.",
    whereYouPush: "Two watchers might become paranoid together. You'll need to push each other toward trust occasionally, toward noticing what's working, not just what's broken.",
    whatYouCreate: "Complete surveillance. Nothing escapes you. Whether anyone feels safe around you is the question.",
    whatsMissing: "Neither of you is naturally warm or trusting. You're both in watching mode.",
    missingInGroup: "The Present or the Abundant can bring warmth and trust you're both missing.",
    missingStandalone: "Don't forget that life includes trust and joy, not just vigilance."
  },

  "conscience+embers": {
    whatYouShare: "You both protect. The Guardian protects from hidden threats; the Keeper protects from forgetting. Neither of you lets important things slip away. You share a guardian instinct.",
    whereYouPush: "The Guardian watches forward (what might go wrong); the Keeper watches backward (what was lost). You'll complement each other more than conflict — vigilance and memory together.",
    whatYouCreate: "Protected memory. The Guardian ensures nothing dangerous is forgotten; the Keeper ensures nothing valuable is forgotten. Together, you guard on all fronts.",
    whatsMissing: "Neither of you is naturally oriented toward creation or possibility. You're both in protection mode.",
    missingInGroup: "A Builder or Abundant can create and imagine while you both guard.",
    missingStandalone: "Find someone who builds the new — you need their forward energy."
  },

  "conscience+friction": {
    whatYouShare: "You both stay alert. The Guardian watches for threats; the Challenger seeks friction. Neither of you is comfortable with comfort. You share a productive discomfort with ease.",
    whereYouPush: "The Guardian watches; the Challenger acts. You'll push each other on vigilance versus action — the Guardian may feel the Challenger is reckless; the Challenger may feel the Guardian never moves.",
    whatYouCreate: "Tested vigilance. The Guardian sees the risks; the Challenger tests them. Together, you create awareness that's been pressure-tested.",
    whatsMissing: "Neither of you is naturally warm or restful. You're both on alert.",
    missingInGroup: "The Present or the Rooted can provide the calm you're both missing.",
    missingStandalone: "Find someone who knows how to rest — you both need that."
  },

  "conscience+unbound": {
    whatYouShare: "You both see past surfaces. The Guardian sees what's hidden; the Transcendent sees what's beyond. Neither of you is satisfied with the obvious. You share a capacity to notice what others miss.",
    whereYouPush: "The Guardian watches for danger; the Transcendent reaches for transcendence. You'll push each other on what to do with what you see — the Guardian may feel the Transcendent ignores real threats; the Transcendent may feel the Guardian can't see past problems.",
    whatYouCreate: "Expansive vigilance. The Guardian ensures nothing dangerous is missed; the Transcendent ensures you're not just watching the same old thing. Together, you see widely and deeply.",
    whatsMissing: "Neither of you is naturally warm or grounded. You're both somewhat at a remove.",
    missingInGroup: "The Present can bring warmth and groundedness.",
    missingStandalone: "Find someone who lives in the embodied moment — you need their presence."
  },

  "alive+conscience": {
    whatYouShare: "You both engage fully. The Guardian engages through watching; the Alive engages through feeling. Neither of you is detached. You share an intensity of engagement, differently directed.",
    whereYouPush: "The Guardian asks \"should we feel this?\"; the Alive feels first. You'll push each other on experience versus caution — the Guardian may feel the Alive is reckless; the Alive may feel the Guardian refuses to live.",
    whatYouCreate: "Witnessed experience. The Guardian ensures you're not being manipulated by what you feel; the Alive ensures you're actually feeling something. Together, you experience life with eyes open.",
    whatsMissing: "Neither of you is naturally oriented toward building or structure. You're both in experience (critical or sensory).",
    missingInGroup: "An Architect or Builder can structure what you're both watching and feeling.",
    missingStandalone: "Find someone who builds while you both engage with life."
  },

  "conscience+mender": {
    whatYouShare: "You both care about what's broken. The Guardian sees what's broken; the Mender fixes it. Neither of you ignores dysfunction. You share a commitment to things actually working.",
    whereYouPush: "The Guardian watches; the Mender acts. You'll push each other on timing — the Guardian may feel the Mender fixes too quickly; the Mender may feel the Guardian only sees problems.",
    whatYouCreate: "Repaired systems. The Guardian finds what's broken; the Mender fixes it. Together, you create systems that are both examined and functional.",
    whatsMissing: "Neither of you is naturally oriented toward creation or transcendence. You're both in the realm of what exists.",
    missingInGroup: "A Builder or Transcendent can point toward what doesn't exist yet.",
    missingStandalone: "Find someone who creates the new — you need their forward energy."
  },

  "cleareyed+conscience": {
    whatYouShare: "You're natural allies. The Guardian watches; the Truth-Teller speaks. Neither of you lets lies stand. You share a commitment to honesty that most people find uncomfortable.",
    whereYouPush: "You might amplify each other's hardness. Watching and truth-telling without warmth becomes cold. You'll need to push each other toward tenderness occasionally.",
    whatYouCreate: "Exposed truth. The Guardian sees what's hidden; the Truth-Teller names it. Together, you ensure nothing stays buried that shouldn't.",
    whatsMissing: "Neither of you is naturally warm or optimistic. You're both in clarity mode.",
    missingInGroup: "The Present or the Abundant can bring warmth and trust.",
    missingStandalone: "Don't forget that people need tenderness, not just truth."
  },

  "between+conscience": {
    whatYouShare: "You both see complexity. The Guardian sees what's hidden; the Liminal sees what's uncertain. Neither of you accepts simple answers. You share an appreciation for how complicated reality is.",
    whereYouPush: "The Guardian is certain something's wrong; the Liminal is uncertain about everything. You'll push each other on confidence — the Guardian may feel the Liminal is too relativistic; the Liminal may feel the Guardian is too paranoid.",
    whatYouCreate: "Nuanced awareness. The Guardian ensures you're not naive; the Liminal ensures you're not dogmatic. Together, you see reality in full complexity.",
    whatsMissing: "Neither of you is naturally action-oriented or building-focused. You're both somewhat still, watching.",
    missingInGroup: "A Builder can act while you're both seeing and questioning.",
    missingStandalone: "Find someone who builds while you both assess."
  },

  // ============================================
  // KEEPER (embers) combinations
  // ============================================

  "embers+embers": {
    whatYouShare: "You both guard memory. Neither of you lets important things be forgotten. You share a commitment to continuity that most people lack. Together, you ensure nothing worth keeping is lost.",
    whereYouPush: "Two keepers might preserve too much. You'll need to push each other occasionally toward letting go — toward recognizing that some things should end.",
    whatYouCreate: "Complete archive. The past is very well preserved here. Whether anyone builds anything new is the question.",
    whatsMissing: "Neither of you is naturally oriented toward creation or transcendence. You're both in preservation mode.",
    missingInGroup: "A Builder or Transcendent can create the new while you guard the old.",
    missingStandalone: "Find someone who reaches forward while you both hold what came before."
  },

  "embers+friction": {
    whatYouShare: "You both care about what matters. The Keeper cares about what mattered; the Challenger cares about what challenges. Neither of you is casual. You share an intensity about your orientations.",
    whereYouPush: "The Keeper preserves; the Challenger disrupts. You'll push each other on what deserves to survive — the Keeper may feel the Challenger destroys too easily; the Challenger may feel the Keeper holds too tight.",
    whatYouCreate: "Tested memory. The Keeper ensures you don't forget; the Challenger ensures what you remember deserves remembering. Together, you hold a memory that's been stress-tested.",
    whatsMissing: "Neither of you is naturally warm or restful in the simple sense. You're both serious.",
    missingInGroup: "The Present or the Alive can bring lightness.",
    missingStandalone: "Don't forget that life includes pleasure, not just preservation and challenge."
  },

  "embers+unbound": {
    whatYouShare: "You both think long-term. The Keeper thinks about what came before; the Transcendent thinks about what comes beyond. Neither of you is stuck in the immediate. You share a capacity for temporal scale.",
    whereYouPush: "The Keeper preserves; the Transcendent transcends. You'll push each other on what to keep — the Keeper may feel the Transcendent abandons too much; the Transcendent may feel the Keeper can't let go.",
    whatYouCreate: "Transcendence with memory. The Keeper ensures you don't forget where you came from; the Transcendent ensures you don't stay there. Together, you hold both roots and wings.",
    whatsMissing: "Neither of you is necessarily grounded in the present moment. You're both in different temporal zones.",
    missingInGroup: "The Present can anchor you both to now.",
    missingStandalone: "Find someone who lives in the moment while you both think about other times."
  },

  "alive+embers": {
    whatYouShare: "You both value experience. The Keeper values experiences worth remembering; the Alive values experiences worth having. Neither of you is abstract. You share a commitment to what's actually lived.",
    whereYouPush: "The Keeper looks back; the Alive reaches out. You'll push each other on temporal orientation — the Keeper may feel the Alive doesn't honor what came before; the Alive may feel the Keeper misses what's happening now.",
    whatYouCreate: "Remembered sensation. The Keeper ensures experiences are preserved; the Alive ensures there are experiences worth preserving. Together, you create a life that's both vivid and remembered.",
    whatsMissing: "Neither of you is naturally oriented toward building or systems. You're both in experience.",
    missingInGroup: "An Architect or Builder can structure what you're experiencing and remembering.",
    missingStandalone: "Find someone who builds while you both feel and preserve."
  },

  "embers+mender": {
    whatYouShare: "You both care for what exists. The Keeper preserves memory; the Mender preserves function. Neither of you discards easily. You share a commitment to tending rather than replacing.",
    whereYouPush: "You're natural allies — the museum and the workshop. The main question is when preservation becomes hoarding, when repair becomes refusal to let something die.",
    whatYouCreate: "Working heritage. The Keeper ensures things are remembered; the Mender ensures things still work. Together, you create continuity that functions.",
    whatsMissing: "Neither of you is naturally oriented toward the radically new. You're both in the realm of what exists.",
    missingInGroup: "A Builder or Transcendent can point toward what doesn't exist yet.",
    missingStandalone: "Find someone who creates the new — you need their forward energy."
  },

  "cleareyed+embers": {
    whatYouShare: "You both value what's real. The Keeper values what really happened; the Truth-Teller values what's really true. Neither of you tolerates distortion. You share a commitment to accuracy.",
    whereYouPush: "The Keeper preserves; the Truth-Teller examines. You'll push each other on which truths get kept — the Keeper may preserve things the Truth-Teller would critique; the Truth-Teller may examine things the Keeper would protect.",
    whatYouCreate: "Honest memory. The Keeper ensures nothing is forgotten; the Truth-Teller ensures nothing false is preserved. Together, you guard a memory that's both complete and true.",
    whatsMissing: "Neither of you is naturally warm or playful. You're both serious about your missions.",
    missingInGroup: "The Present or the Alive can bring warmth.",
    missingStandalone: "Don't forget that life includes lightness, not just preservation and truth."
  },

  "between+embers": {
    whatYouShare: "You both navigate uncertainty — the Keeper by holding onto what worked, the Liminal by staying open to what might. Neither of you rushes toward false certainty. You share a sophistication about how much we don't know.",
    whereYouPush: "The Keeper has answers (from the past); the Liminal has questions (about the present). You'll push each other on when to hold versus when to stay open — the Keeper may feel the Liminal is too rootless; the Liminal may feel the Keeper is too attached.",
    whatYouCreate: "Rooted openness. The Keeper provides the anchor; the Liminal provides the questioning. Together, you hold both heritage and exploration.",
    whatsMissing: "Neither of you is naturally action-oriented in the build-now sense. You're both somewhat still.",
    missingInGroup: "A Builder can act while you're both keeping and questioning.",
    missingStandalone: "Find someone who builds while you both dwell in your different ways."
  },

  // ============================================
  // CHALLENGER (friction) combinations
  // ============================================

  "friction+friction": {
    whatYouShare: "You both crave difficulty. Neither of you is satisfied with ease. You share an intensity that most people find exhausting. Together, you'll push further than anyone thought possible.",
    whereYouPush: "Two challengers might escalate together. You'll need to watch for when difficulty becomes masochism, when challenge becomes refusal to rest. Someone needs to call the pause.",
    whatYouCreate: "Serious intensity. You're both going hard. Together, you create spaces where real growth happens — if you don't burn out.",
    whatsMissing: "Neither of you is naturally restful or gentle. You're both pushing.",
    missingInGroup: "The Rooted or the Present can bring the rest you're both avoiding.",
    missingStandalone: "Find someone who knows when to stop — you both need that voice."
  },

  "friction+unbound": {
    whatYouShare: "You both want more. The Challenger wants more difficulty; the Transcendent wants more beyond. Neither of you is satisfied with what is. You share a restlessness that pushes boundaries.",
    whereYouPush: "The Challenger pushes through; the Transcendent reaches beyond. You'll push each other on method — the Challenger may feel the Transcendent floats; the Transcendent may feel the Challenger is still playing within limits.",
    whatYouCreate: "Challenged transcendence. The Challenger ensures transcendence isn't easy; the Transcendent ensures challenge isn't just for its own sake. Together, you reach toward what's beyond through genuine effort.",
    whatsMissing: "Neither of you is naturally grounded or restful. You're both in motion.",
    missingInGroup: "The Rooted or the Present can anchor you both.",
    missingStandalone: "Find someone who knows how to stay and rest — you both need their gravity."
  },

  "alive+friction": {
    whatYouShare: "You both want intensity. The Challenger wants intense difficulty; the Alive wants intense sensation. Neither of you is satisfied with mild. You share a hunger for the full experience.",
    whereYouPush: "The Challenger pushes; the Alive feels. You'll push each other on what intensity looks like — the Challenger may feel the Alive seeks only pleasant intensity; the Alive may feel the Challenger only values hard intensity.",
    whatYouCreate: "Full-spectrum intensity. The Challenger provides the difficulty; the Alive provides the sensation. Together, you create experiences that are both hard and vivid.",
    whatsMissing: "Neither of you is naturally cautious or restful. You're both going full tilt.",
    missingInGroup: "The Rooted or the Guardian can slow you both down.",
    missingStandalone: "Find someone who watches and pauses — you need their caution occasionally."
  },

  "friction+mender": {
    whatYouShare: "You both engage with what's broken. The Challenger breaks through; the Mender repairs. Neither of you leaves things as they are. You share a commitment to improvement, differently expressed.",
    whereYouPush: "The Challenger breaks things (sometimes on purpose); the Mender fixes them. You'll push each other on destruction versus repair — the Challenger may feel the Mender is too careful; the Mender may feel the Challenger creates unnecessary damage.",
    whatYouCreate: "Broken and repaired. The Challenger tests things to breaking; the Mender puts them back together stronger. Together, you create systems that have been stress-tested and rebuilt.",
    whatsMissing: "Neither of you is naturally restful or accepting. You're both working on things.",
    missingInGroup: "The Rooted can provide the acceptance you're both missing.",
    missingStandalone: "Find someone who knows when something is good enough — you both keep working."
  },

  "cleareyed+friction": {
    whatYouShare: "You both disrupt. The Challenger disrupts with difficulty; the Truth-Teller disrupts with honesty. Neither of you lets things stay comfortable. You share a willingness to make things uncomfortable in service of something real.",
    whereYouPush: "The Challenger pushes; the Truth-Teller speaks. You'll push each other on method — the Challenger may feel the Truth-Teller only talks; the Truth-Teller may feel the Challenger creates difficulty without purpose.",
    whatYouCreate: "Truthful challenge. The Challenger ensures growth requires effort; the Truth-Teller ensures the effort is aimed at something real. Together, you create discomfort that serves genuine understanding.",
    whatsMissing: "Neither of you is naturally tender or restful. You're both hard in different ways.",
    missingInGroup: "The Present can bring the warmth and rest you're both missing.",
    missingStandalone: "Don't forget that people need tenderness sometimes, not just challenge and truth."
  },

  "between+friction": {
    whatYouShare: "You both resist settling. The Challenger resists settling for ease; the Liminal resists settling for certainty. Neither of you accepts the obvious answer. You share a productive discomfort with comfort.",
    whereYouPush: "The Challenger wants you to commit to something difficult; the Liminal is still figuring out what to commit to. You'll push each other on action versus uncertainty — the Challenger may feel the Liminal is avoiding; the Liminal may feel the Challenger commits too quickly.",
    whatYouCreate: "Questioned challenge. The Challenger provides the push; the Liminal ensures the push is going somewhere worth going. Together, you create effort that's been examined.",
    whatsMissing: "Neither of you is naturally restful or accepting. You're both somewhat restless.",
    missingInGroup: "The Rooted can provide the stillness you're both lacking.",
    missingStandalone: "Find someone who knows when enough is enough — you both keep moving."
  },

  // ============================================
  // TRANSCENDENT (unbound) combinations
  // ============================================

  "unbound+unbound": {
    whatYouShare: "You both reach beyond. Neither of you is satisfied with the given. You share a willingness to imagine past limits that most people find uncomfortable. Together, you'll go further than anyone else can follow.",
    whereYouPush: "Two transcenders might lose the ground entirely. You'll need to push each other toward embodiment occasionally, toward the actual life you're living in actual bodies.",
    whatYouCreate: "Expanded horizons. You're both seeing past the edges. Together, you create possibility space for thoughts no one else is thinking.",
    whatsMissing: "Neither of you is naturally grounded or present to the immediate. You're both reaching.",
    missingInGroup: "The Present or the Rooted can anchor you both to actual life.",
    missingStandalone: "Find someone who lives in the body and the moment — you need their gravity."
  },

  "alive+unbound": {
    whatYouShare: "You both want more. The Transcendent wants more beyond; the Alive wants more sensation. Neither of you is satisfied with ordinary experience. You share a hunger for the expanded.",
    whereYouPush: "The Transcendent transcends the body; the Alive celebrates it. You'll push each other on embodiment — the Transcendent may feel the Alive is stuck in sensation; the Alive may feel the Transcendent has left experience behind.",
    whatYouCreate: "Embodied transcendence. The Transcendent provides the beyond; the Alive ensures you don't leave sensation behind. Together, you reach for what's past limits without abandoning the body.",
    whatsMissing: "Neither of you is naturally cautious or grounded. You're both reaching, differently.",
    missingInGroup: "The Guardian or the Rooted can slow you both down.",
    missingStandalone: "Find someone who watches and stays — you need their grounding."
  },

  "mender+unbound": {
    whatYouShare: "Oddly, you both care about what works. The Transcendent wants consciousness to work differently; the Mender wants things to work well. Neither of you accepts broken as permanent. You share a commitment to improvement.",
    whereYouPush: "The Transcendent transcends; the Mender repairs. You'll push each other on whether to fix or transcend — the Transcendent may feel the Mender is too attached to the existing; the Mender may feel the Transcendent abandons what's worth saving.",
    whatYouCreate: "Repaired transcendence. The Mender ensures you don't lose what works; the Transcendent ensures you don't get stuck. Together, you create evolution that doesn't discard what was good.",
    whatsMissing: "Neither of you is naturally vigilant about threats. You're both oriented toward improvement.",
    missingInGroup: "A Guardian can watch for what you're both missing.",
    missingStandalone: "Find someone who sees dangers — you need their vigilance."
  },

  "cleareyed+unbound": {
    whatYouShare: "You both seek what's real. The Transcendent seeks reality beyond limits; the Truth-Teller seeks reality as it is. Neither of you is satisfied with comfortable lies. You share a commitment to something genuine.",
    whereYouPush: "The Transcendent reaches; the Truth-Teller names. You'll push each other on what counts as real — the Transcendent may feel the Truth-Teller is too literal; the Truth-Teller may feel the Transcendent is chasing illusions.",
    whatYouCreate: "Honest transcendence. The Truth-Teller ensures you're not fooling yourself; the Transcendent ensures you're not limiting yourself. Together, you reach toward what's beyond while staying honest about what you're reaching toward.",
    whatsMissing: "Neither of you is naturally warm or tender. You're both in clarity mode.",
    missingInGroup: "The Present or the Alive can bring warmth.",
    missingStandalone: "Don't forget that people need tenderness, not just truth and transcendence."
  },

  "between+unbound": {
    whatYouShare: "You both resist closure. The Transcendent reaches past boundaries; the Liminal stays in the space between. Neither of you accepts final positions. You share a comfort with openness that most people lack.",
    whereYouPush: "You're natural allies. The main risk is that you both float — one toward beyond, one in uncertainty. Someone needs to ground you occasionally.",
    whatYouCreate: "Open horizons. The Transcendent reaches; the Liminal holds the space between. Together, you create possibility without premature closure.",
    whatsMissing: "Neither of you is naturally grounded or decisive. You're both somewhat floating.",
    missingInGroup: "The Present or the Builder can anchor and act while you're both reaching and questioning.",
    missingStandalone: "Find someone who builds and stays — you need their grounding."
  },

  // ============================================
  // ALIVE combinations
  // ============================================

  "alive+alive": {
    whatYouShare: "You both feel everything. Neither of you holds back from experience. You share an openness to sensation that most people find overwhelming. Together, you'll experience life more fully than anyone around you.",
    whereYouPush: "Two Alive might feel too much. You'll need to push each other toward integration occasionally — feeling without understanding is just sensation without growth.",
    whatYouCreate: "Full-spectrum experience. You're both open to everything. Together, you create a quality of living most people never touch.",
    whatsMissing: "Neither of you is naturally structured or vigilant. You're both in experience.",
    missingInGroup: "An Architect or Guardian can provide structure and watching.",
    missingStandalone: "Find someone who thinks structurally and watches carefully — you need their perspective."
  },

  "alive+mender": {
    whatYouShare: "You both engage with what's here. The Alive feels what's here; the Mender fixes what's here. Neither of you is abstract. You share a commitment to the actual and present.",
    whereYouPush: "The Alive feels; the Mender acts. You'll push each other on experience versus intervention — the Alive may feel the Mender is too quick to fix; the Mender may feel the Alive just sits with things.",
    whatYouCreate: "Felt repair. The Alive ensures nothing is fixed that shouldn't be (sometimes the feeling needs to be felt); the Mender ensures things actually get better. Together, you tend to life with both presence and action.",
    whatsMissing: "Neither of you is naturally oriented toward systems or scale. You're both in the immediate.",
    missingInGroup: "An Architect can think at the scale you're both not seeing.",
    missingStandalone: "Find someone who thinks in systems while you both feel and fix."
  },

  "alive+cleareyed": {
    whatYouShare: "You both seek what's real. The Alive seeks real experience; the Truth-Teller seeks real truth. Neither of you is satisfied with the fake. You share a commitment to authenticity.",
    whereYouPush: "The Alive feels; the Truth-Teller thinks. You'll push each other on what knowing looks like — the Alive may feel the Truth-Teller is too cold; the Truth-Teller may feel the Alive substitutes sensation for understanding.",
    whatYouCreate: "Felt truth. The Alive ensures truth is embodied; the Truth-Teller ensures experience is honest. Together, you create understanding that's both accurate and alive.",
    whatsMissing: "Neither of you is naturally cautious or structured. You're both direct in your engagements.",
    missingInGroup: "An Architect or Guardian can provide structure and vigilance.",
    missingStandalone: "Find someone who thinks in systems and watches carefully."
  },

  "alive+between": {
    whatYouShare: "You both resist closure. The Alive stays open to sensation; the Liminal stays open to possibility. Neither of you shuts down prematurely. You share an openness that most people find uncomfortable.",
    whereYouPush: "The Alive has arrived (at feeling); the Liminal is still arriving. You'll push each other on certainty versus openness — the Alive knows what they're experiencing; the Liminal is questioning even that.",
    whatYouCreate: "Open experience. The Alive provides the sensation; the Liminal ensures nothing closes too soon. Together, you create living that's both vivid and questioning.",
    whatsMissing: "Neither of you is naturally decisive or structured. You're both open.",
    missingInGroup: "A Builder or Architect can decide and structure while you're both staying open.",
    missingStandalone: "Find someone who builds and decides — you need their direction eventually."
  },

  // ============================================
  // MENDER combinations
  // ============================================

  "mender+mender": {
    whatYouShare: "You both fix things. Neither of you leaves things broken. You share a commitment to repair that most people lack the patience for. Together, everything gets fixed.",
    whereYouPush: "Two menders might never let anything die. You'll need to push each other toward letting go occasionally — some things are better released than repaired.",
    whatYouCreate: "Complete repair. Everything here works. Whether anything new gets created is the question.",
    whatsMissing: "Neither of you is naturally oriented toward creation or transcendence. You're both in repair mode.",
    missingInGroup: "A Builder or Transcendent can create the new while you maintain the existing.",
    missingStandalone: "Find someone who makes new things — you need their forward energy."
  },

  "cleareyed+mender": {
    whatYouShare: "You both care about things being right. The Mender wants things to work right; the Truth-Teller wants things to be said right. Neither of you tolerates dysfunction or dishonesty. You share a commitment to things being as they should be.",
    whereYouPush: "The Mender fixes; the Truth-Teller names. You'll push each other on action versus speaking — the Mender may feel the Truth-Teller just diagnoses without fixing; the Truth-Teller may feel the Mender fixes without addressing root truths.",
    whatYouCreate: "True repair. The Truth-Teller ensures you understand what's broken; the Mender ensures it gets fixed. Together, you create systems that are both honest and functional.",
    whatsMissing: "Neither of you is naturally warm or playful. You're both in serious modes.",
    missingInGroup: "The Present or the Alive can bring warmth and lightness.",
    missingStandalone: "Don't forget that life includes joy, not just fixing and truth-telling."
  },

  "between+mender": {
    whatYouShare: "You both navigate complexity. The Mender fixes complicated things; the Liminal holds complicated positions. Neither of you oversimplifies. You share an appreciation for how hard things actually are.",
    whereYouPush: "The Mender acts; the Liminal waits. You'll push each other on timing — the Mender may feel the Liminal is paralyzed; the Liminal may feel the Mender fixes too quickly.",
    whatYouCreate: "Thoughtful repair. The Mender ensures things get fixed; the Liminal ensures nothing is fixed prematurely or carelessly. Together, you repair things that stay repaired.",
    whatsMissing: "Neither of you is naturally oriented toward creation or transcendence. You're both in the realm of what exists.",
    missingInGroup: "A Builder or Transcendent can create the new while you both tend to and question what exists.",
    missingStandalone: "Find someone who makes new things and reaches beyond — you need their forward energy."
  },

  // ============================================
  // TRUTH-TELLER (cleareyed) combinations
  // ============================================

  "cleareyed+cleareyed": {
    whatYouShare: "You both tell truth. Neither of you lets comfortable lies stand. You share a commitment to honesty that most people find uncomfortable. Together, nothing false survives.",
    whereYouPush: "Two truth-tellers might become harsh together. You'll need to push each other toward tenderness occasionally — truth without love is cruelty.",
    whatYouCreate: "Complete honesty. No one's getting away with anything here. Whether anyone feels loved is the question.",
    whatsMissing: "Neither of you is naturally warm or yielding. You're both in truth mode.",
    missingInGroup: "The Present or the Alive can bring the warmth and softness you're both missing.",
    missingStandalone: "Don't forget that people need tenderness, not just truth."
  },

  "between+cleareyed": {
    whatYouShare: "You both resist false certainty. The Truth-Teller resists false statements; the Liminal resists false closure. Neither of you accepts the easy answer. You share a sophisticated skepticism.",
    whereYouPush: "The Truth-Teller has arrived (at truth); the Liminal is still arriving. You'll push each other on certainty versus openness — the Truth-Teller may feel the Liminal never commits; the Liminal may feel the Truth-Teller closes too soon.",
    whatYouCreate: "Honest uncertainty. The Truth-Teller ensures nothing false is accepted; the Liminal ensures nothing true is claimed prematurely. Together, you hold a sophisticated relationship with what can and can't be known.",
    whatsMissing: "Neither of you is naturally warm or building-oriented. You're both in careful modes.",
    missingInGroup: "The Present and the Builder can bring warmth and action.",
    missingStandalone: "Find someone who builds and loves while you're both being careful about truth and certainty."
  },

  // ============================================
  // LIMINAL (between) combinations
  // ============================================

  "between+between": {
    whatYouShare: "You're both still figuring it out. Neither of you has arrived at a final position. You share a comfort with uncertainty that most people lack. Together, you hold space for genuine not-knowing.",
    whereYouPush: "Two in the in-between might never arrive. You'll need to push each other toward decision eventually — at some point, you have to choose something.",
    whatYouCreate: "Sophisticated uncertainty. You're both holding complexity without forcing resolution. Together, you create space for genuine exploration.",
    whatsMissing: "Neither of you is naturally decisive or building-oriented. You're both still questioning.",
    missingInGroup: "A Builder can act while you're both figuring things out.",
    missingStandalone: "Find someone who builds and decides — you need their direction eventually."
  }
};

// Get a pair reading for any two archetypes
export function getPairReading(archA: string, archB: string): PairReading | null {
  const key = getPairKey(archA, archB);
  return pairReadings[key] || null;
}

// Get all pair readings (for debugging/export)
export function getAllPairReadings(): Record<string, PairReading> {
  return pairReadings;
}

// Count total pair readings
export function getPairReadingsCount(): number {
  return Object.keys(pairReadings).length;
}
