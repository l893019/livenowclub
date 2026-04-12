// src/lib/shared-utopia.ts
// Content for "What You'd Build Together" relationship view

export type SharedUtopiaContent = {
  whatYoudBuild: string;
  whatWouldBeStrong: string;
  whatWouldBeMissing: string;
  questionYoureAnswering: string;
};

// Keys are sorted alphabetically: "archetype1_archetype2" where archetype1 < archetype2
// This ensures we only store each pair once
export const sharedUtopiaContent: Record<string, SharedUtopiaContent> = {

  // ============================================
  // QUESTIONER (swimmer) PAIRINGS
  // ============================================

  // Questioner × Questioner
  "swimmer_swimmer": {
    whatYoudBuild: `A life of depth. You'd create spaces—intellectual, emotional, physical—where questions are more valued than answers. Nothing would be rushed to resolution. Everything would be examined, turned over, considered from angles others don't think to try.

You'd build understanding that goes deeper than most people have patience for. Research projects, philosophical frameworks, therapeutic practices, educational approaches—anything that requires sitting with complexity rather than simplifying it away.`,
    whatWouldBeStrong: `Depth. Patience. Genuine intellectual partnership. You'd never have to apologize for taking something seriously or wanting to understand it more fully. The other person gets it.

You'd avoid the shallow answers that most people settle for. Whatever you build together would be well-considered, carefully examined, built on actual understanding rather than assumptions.`,
    whatWouldBeMissing: `Action. Momentum. At some point, understanding has to become doing—and neither of you is naturally wired to make that jump. You could spend years in perfect, beautiful deliberation while the window for acting closes.

You might also miss perspectives that don't come from questioning. Sometimes the right move is obvious and the work is just doing it.`,
    questionYoureAnswering: `When does understanding become enough to act on?`
  },

  // Questioner × Builder (shaper)
  "shaper_swimmer": {
    whatYoudBuild: `Things that are both real and right. The Builder makes sure it exists. The Questioner makes sure it matters.

You'd create products, projects, or ways of living where nothing ships that shouldn't—where everything that gets built has been examined for whether it's worth building. At the same time, things that matter would actually become real, not stay trapped in endless deliberation.`,
    whatWouldBeStrong: `You'd avoid the two most common failures: endless deliberation that never becomes anything, and rushed action that misses the point.

The Builder prevents the Questioner from disappearing into abstraction. The Questioner prevents the Builder from constructing something pointless. Together, you'd have both traction and direction.`,
    whatWouldBeMissing: `Patience for those who want to neither build nor question. You might dismiss people who just want to maintain, rest, or enjoy what already exists. Not everything needs to be constructed or examined.

The dynamic could also become exhausting—one always pushing forward, one always pulling back to reconsider.`,
    questionYoureAnswering: `Can something be both urgent and considered?`
  },

  // Questioner × Abundant (citizen)
  "citizen_swimmer": {
    whatYoudBuild: `A future that's both optimistic and examined. The Abundant trusts that good things are possible. The Questioner makes sure that trust is grounded in actual understanding, not wishful thinking.

You'd build systems, communities, or projects that expand access and possibility—but with built-in reflection about who's still being missed, what's still being assumed, what the real costs are.`,
    whatWouldBeStrong: `The Abundant brings energy and genuine hope. The Questioner brings depth and honest examination. Together, you'd avoid both naive optimism and paralyzing skepticism.

You'd create things that are genuinely generous—not just in intention but in execution. The Questioner would catch the places where good intentions aren't actually landing.`,
    whatWouldBeMissing: `Urgency about specific injustices. The Abundant sees the big picture of possibility; the Questioner examines rather than acts. Neither of you is naturally wired for the urgent, targeted intervention when something is wrong right now.

You might also drift toward abstraction—big ideas about possibility, deep questions about meaning—while missing concrete, immediate needs.`,
    questionYoureAnswering: `Can vision be both expansive and rigorous?`
  },

  // Questioner × Architect
  "architect_swimmer": {
    whatYoudBuild: `Systems that actually serve what they're meant to serve. The Architect thinks in structures. The Questioner asks whether those structures are built on real understanding or just efficient assumptions.

You'd create institutions, organizations, or frameworks that are both functional and wise—designed well and grounded in genuine insight about what people actually need.`,
    whatWouldBeStrong: `The Architect brings structural thinking and concern for the collective. The Questioner brings depth and resistance to premature closure. Together, you'd build things that last because they're built on understanding, not just efficiency.

You'd catch the places where elegant design masks shallow assumptions. The systems you create would actually work because they're based on truth about how people are, not how you wish they were.`,
    whatWouldBeMissing: `Speed. Sometimes you just need to act, build, implement—and both of you are inclined to keep refining, keep questioning, keep designing. You might over-engineer and under-deliver.

You might also miss emotional and embodied needs. Both of you think in abstractions—systems and questions—and real people have bodies and feelings that don't fit neatly into either.`,
    questionYoureAnswering: `Can structure emerge from genuine understanding, not just efficiency?`
  },

  // Questioner × Present (presence)
  "presence_swimmer": {
    whatYoudBuild: `Spaces where depth and presence coexist. The Questioner lives in ideas and inquiry. The Present lives in attention and connection. Together, you'd create environments—therapeutic, educational, relational—where people can both think deeply and be fully there.

You'd build practices, relationships, or communities where reflection doesn't become disconnection, and presence doesn't become anti-intellectual.`,
    whatWouldBeStrong: `The Questioner brings depth. The Present brings warmth. Together, you'd avoid both cold abstraction and comfortable avoidance of hard truths.

Your combination creates rare spaces: places where people can ask the hardest questions while still feeling held, where understanding and connection happen together rather than competing.`,
    whatWouldBeMissing: `Drive. Neither of you is naturally oriented toward building, changing, achieving. You might create beautiful depth together but struggle to manifest it in the world—a relationship or practice that's profound but never quite becomes anything others can access.

You might also enable each other's avoidance of difficult action. Presence can be an escape from decision; questioning can be an escape from commitment.`,
    questionYoureAnswering: `Can understanding and presence happen together?`
  },

  // Questioner × Rooted
  "rooted_swimmer": {
    whatYoudBuild: `A life that's both deep and still. The Questioner dives into understanding. The Rooted knows when to stop. Together, you'd create something rare: inquiry that doesn't become anxious grasping, stillness that doesn't become intellectual laziness.

You'd build homes, practices, or communities where depth is valued but completeness isn't demanded—where questions can be held without needing to be resolved.`,
    whatWouldBeStrong: `You'd both resist the culture's pressure to produce, perform, and move on. The Rooted says "enough" when the Questioner might spiral into endless inquiry. The Questioner gives the Rooted's stillness intellectual substance.

Together, you'd model a different pace: serious without being frantic, thoughtful without being restless.`,
    whatWouldBeMissing: `Engagement with the world's urgency. When something requires action, building, or intervention, neither of you naturally moves in that direction. Your depth and stillness might become a retreat from problems that need active response.

You might also reinforce each other's tendency toward withdrawal—the Questioner into ideas, the Rooted into removal.`,
    questionYoureAnswering: `Can you be still and still be seeking?`
  },

  // Questioner × Witness (conscience)
  "conscience_swimmer": {
    whatYoudBuild: `Truth that goes all the way down. The Witness spots what's hidden. The Questioner asks why. Together, you'd uncover things others miss—patterns of harm, buried assumptions, the real story beneath the official one.

You'd build investigative practices, critical frameworks, or communities committed to seeing clearly. Nothing would be taken at face value.`,
    whatWouldBeStrong: `You'd be nearly impossible to fool. The Witness catches what others prefer to ignore. The Questioner won't accept easy answers. Together, you'd create genuine understanding of what's actually happening, not just what's being presented.

Your combination is rare: most people either question OR watch, but you do both simultaneously.`,
    whatWouldBeMissing: `Trust. Joy. Celebration. You're both oriented toward seeing what's wrong, what's hidden, what hasn't been examined. You might struggle to appreciate what's simply good, to rest in what's working, to celebrate without immediately looking for the flaw.

You might also exhaust each other and everyone around you with relentless examination.`,
    questionYoureAnswering: `How deep does the truth go?`
  },

  // Questioner × Keeper (embers)
  "embers_swimmer": {
    whatYoudBuild: `Wisdom that remembers where it came from. The Keeper holds what mattered. The Questioner asks why it mattered. Together, you'd create understanding that's both rooted in history and genuinely examined—not accepting tradition blindly, but not discarding it carelessly either.

You'd build archives, practices, or educational approaches that honor the past while subjecting it to real inquiry.`,
    whatWouldBeStrong: `You'd avoid both blind worship of the past and careless destruction of it. The Questioner prevents the Keeper from calcifying into nostalgia. The Keeper prevents the Questioner from reinventing wheels that were already built.

Together, you'd know which wisdom to carry forward and which assumptions to leave behind.`,
    whatWouldBeMissing: `The new. Both of you are oriented backward—the Keeper to what was, the Questioner to why things are the way they are. You might miss genuinely novel possibilities, things that don't fit in the archive or the question set you've inherited.

You might also become conservative in the deepest sense: focused on preserving and understanding, not creating or risking.`,
    questionYoureAnswering: `What deserves to be remembered, and why?`
  },

  // Questioner × Challenger (friction)
  "friction_swimmer": {
    whatYoudBuild: `Understanding forged under pressure. The Challenger craves difficulty. The Questioner craves depth. Together, you'd create spaces where hard truths are faced, hard questions are asked, and the discomfort isn't avoided but used as fuel.

You'd build practices, trainings, or relationships where growth happens because you're willing to face what's hard—intellectually and experientially.`,
    whatWouldBeStrong: `Neither of you flinches from difficulty. The Challenger seeks resistance; the Questioner seeks truth. You'd go places together that most people avoid because they're uncomfortable, confusing, or demanding.

Your combination has unusual rigor: you'd question everything AND test everything. Nothing would be accepted without being examined and stress-tested.`,
    whatWouldBeMissing: `Rest. Ease. Acceptance. You're both oriented toward difficulty—one seeks it, one examines it. You might struggle to let things be, to appreciate without analyzing, to rest without feeling like you're avoiding something.

The partnership could become exhausting, always another question, always another challenge.`,
    questionYoureAnswering: `What truths only emerge under pressure?`
  },

  // Questioner × Transcendent (unbound)
  "swimmer_unbound": {
    whatYoudBuild: `Questions that reach past the edges. The Questioner goes deep. The Transcendent goes beyond. Together, you'd explore the territory where human categories start to break down—consciousness, identity, what's possible for minds and beings like us.

You'd build philosophical frameworks, speculative projects, or practices that take the biggest questions seriously and refuse to stop at conventional boundaries.`,
    whatWouldBeStrong: `Neither of you is limited by common sense or convention. The Questioner asks what others don't think to ask. The Transcendent imagines what others can't conceive. Together, you'd see further than almost anyone.

Your combination is genuinely visionary: not just reaching for the unknown but understanding why it matters.`,
    whatWouldBeMissing: `The ground. Both of you are oriented upward and outward—one into questions, one into transcendence. You might lose touch with ordinary concerns, embodied life, the people who aren't on this journey with you.

You might build cathedrals of thought that no one else can enter or use.`,
    questionYoureAnswering: `What lies beyond what we can currently conceive?`
  },

  // Questioner × Feeler (alive)
  "alive_swimmer": {
    whatYoudBuild: `Experience that's fully understood. The Feeler opens to everything. The Questioner examines what's opened. Together, you'd create lives, practices, or art where sensation and meaning interweave—where experience isn't just consumed but comprehended.

You'd build approaches to life where feeling deeply and understanding deeply aren't in tension but are aspects of the same engagement.`,
    whatWouldBeStrong: `You'd avoid both intellectualism divorced from experience and experience divorced from meaning. The Feeler keeps the Questioner embodied. The Questioner gives the Feeler's experiences depth and integration.

Together, you'd actually digest what life offers rather than either consuming or analyzing without absorbing.`,
    whatWouldBeMissing: `Closure. Decision. Both of you are oriented toward receiving rather than acting. The Feeler receives sensation; the Questioner receives complexity. Neither naturally moves toward resolution, completion, or building something external.

You might become very rich internally while creating little that others can see or use.`,
    questionYoureAnswering: `Can you feel everything and understand it too?`
  },

  // Questioner × Mender
  "mender_swimmer": {
    whatYoudBuild: `Repair that understands what broke. The Mender fixes. The Questioner asks why it broke in the first place. Together, you'd create approaches to healing—personal, social, systemic—that don't just patch problems but address their roots.

You'd build therapeutic practices, restorative systems, or communities where repair is both practical and wise.`,
    whatWouldBeStrong: `You'd avoid both mindless fixing and endless analyzing. The Mender insists on doing something. The Questioner insists on understanding before acting. Together, you'd repair things in ways that actually stick.

Your combination is effective and thoughtful: things get fixed, and they get fixed right.`,
    whatWouldBeMissing: `The courage to let things break. Sometimes things need to end, not be repaired. Sometimes the question to ask is whether something should exist at all. Both of you are oriented toward continuation—fixing and understanding what is—rather than accepting necessary endings.

You might prolong what should be released.`,
    questionYoureAnswering: `What broke, and what does it need to heal?`
  },

  // Questioner × Truth-Teller (cleareyed)
  "cleareyed_swimmer": {
    whatYoudBuild: `Clarity that goes to the roots. The Truth-Teller says what's real. The Questioner asks what's really real. Together, you'd create understanding that doesn't stop at first truths but keeps going until you've reached something solid.

You'd build practices of inquiry—journalistic, philosophical, therapeutic—that combine unflinching honesty with genuine depth.`,
    whatWouldBeStrong: `You'd cut through comfortable lies and lazy assumptions with unusual precision. The Truth-Teller says the hard thing. The Questioner asks the hard question. Neither of you accepts what's convenient over what's true.

Your combination has rare integrity: you'd actually get to the bottom of things.`,
    whatWouldBeMissing: `Tenderness. Mercy. Letting things be. You're both oriented toward truth at all costs—one speaks it, one seeks it. You might struggle to hold space for feelings that aren't rational, for people who need comfort more than clarity, for situations where truth isn't the most important value.

Your relentless honesty could become exhausting or even cruel.`,
    questionYoureAnswering: `What's true underneath what's true?`
  },

  // Questioner × Liminal (between)
  "between_swimmer": {
    whatYoudBuild: `A home in uncertainty. The Questioner lives in questions. The Liminal lives in transitions. Neither of you demands premature resolution. Together, you'd create spaces—intellectual, emotional, physical—where not-knowing is welcomed rather than rushed past.

You'd build practices, communities, or ways of living that honor the time between, the state of still-working-it-out.`,
    whatWouldBeStrong: `You'd never force answers that aren't ready. Neither of you panics in uncertainty. Together, you'd model patience with the unknown that most people can't sustain.

Your combination creates genuine tolerance for ambiguity: you'd be able to hold complexity without collapsing it, wait without rushing, not-know without faking certainty.`,
    whatWouldBeMissing: `Arrival. At some point, questions need answers and transitions need destinations. Both of you are comfortable in the between, which can become a way of avoiding commitment, decision, or the vulnerability of claiming something as true.

You might perfect the art of not-knowing while never actually knowing.`,
    questionYoureAnswering: `When is not-knowing the wisest stance?`
  },

  // ============================================
  // BUILDER (shaper) PAIRINGS
  // (questioner × builder already done above)
  // ============================================

  // Builder × Builder
  "shaper_shaper": {
    whatYoudBuild: `Everything. You'd be a force of transformation, constantly making, remaking, adapting, building. Nothing would stay static. Every obstacle would become material for the next construction.

You'd create projects, organizations, or lives that are always in motion—never finished because finished isn't the point. The building is the point.`,
    whatWouldBeStrong: `Momentum. When both of you are oriented toward making, things happen. You'd never get stuck in analysis or nostalgia. Whatever needs to exist, you'd bring it into being.

You'd inspire each other. Two builders together generate energy that draws others into the construction site.`,
    whatWouldBeMissing: `Reflection. Preservation. Rest. Neither of you naturally stops to ask whether what you're building should exist, whether what you're tearing down should be preserved, or whether you need to pause. You could build and build and build while missing why you're building at all.

You might exhaust each other and everyone around you with endless transformation.`,
    questionYoureAnswering: `How much can we make real before we stop?`
  },

  // Builder × Abundant
  "citizen_shaper": {
    whatYoudBuild: `Possibility made real. The Abundant sees what could exist. The Builder makes it exist. Together, you'd turn visions of expansion and access into actual structures, products, systems, or ways of living.

You'd create things that are both optimistic and tangible—real manifestations of the belief that more is possible.`,
    whatWouldBeStrong: `The Abundant brings expansive vision. The Builder brings relentless execution. Together, you'd make ambitious things happen that neither could accomplish alone.

You'd avoid both idle dreaming and meaningless productivity. Things would get built, and they'd be worth building.`,
    whatWouldBeMissing: `Caution. Critique. Slowness. Neither of you naturally pauses to ask whether this should be built, who might be harmed, what might be lost. You're both oriented toward expansion and action. You might build fast and big while missing important warning signs.

You might also have trouble with maintenance—both of you prefer creating to sustaining.`,
    questionYoureAnswering: `How fast can we make the better future real?`
  },

  // Builder × Architect
  "architect_shaper": {
    whatYoudBuild: `Structures that adapt. The Architect thinks in systems. The Builder iterates constantly. Together, you'd create organizations, institutions, or frameworks that are both well-designed and capable of evolution.

You'd build things meant to last but not meant to calcify—systems that can change because change was designed in from the beginning.`,
    whatWouldBeStrong: `You'd combine structural thinking with execution energy. The Architect ensures things are designed well. The Builder ensures they actually get built. Together, you'd avoid both over-planning and under-thinking.

Your combination has unusual durability: things get made AND they work.`,
    whatWouldBeMissing: `Spontaneity. Simplicity. Both of you think in terms of systems and structures. You might over-engineer, creating elaborate frameworks when a simpler approach would serve better.

You might also miss individuals in favor of systems. Both of you think at scale; personal needs might get lost in the architecture.`,
    questionYoureAnswering: `Can what we build keep changing without falling apart?`
  },

  // Builder × Present
  "presence_shaper": {
    whatYoudBuild: `Presence in motion. The Builder transforms; the Present stays. Together, you'd create ways of building that don't sacrifice being here for what's next—action that's grounded, transformation that doesn't forget to arrive.

You'd build practices, relationships, or environments where making things happen and being fully present aren't in tension.`,
    whatWouldBeStrong: `You'd balance each other. The Builder pulls toward the next thing; the Present anchors in this thing. Together, you'd avoid both distracted production and static presence.

The things you build would have a quality of attention in them—made with care, not just speed.`,
    whatWouldBeMissing: `Pure depth. The Builder keeps moving; the Present, while grounded, doesn't naturally go deep into questions or complexity. You might create beautiful things together without ever stopping to fully understand what you've created or why.

You might also frustrate each other—one always building, one always asking to be here now.`,
    questionYoureAnswering: `Can we build without leaving?`
  },

  // Builder × Rooted
  "rooted_shaper": {
    whatYoudBuild: `This is your fundamental tension. The Builder can't stop building. The Rooted knows when to stop. What you create together depends entirely on how you navigate this opposition.

At best, you'd build things worth building and then actually finish—creating what needs to exist and then letting it exist without endless renovation. At worst, you'd frustrate each other completely.`,
    whatWouldBeStrong: `If you find your rhythm, you'd avoid both compulsive building and total stagnation. The Rooted would say "enough" at the right moment. The Builder would say "not yet" when more was truly needed.

Together, you could model completion—something that starts, develops, and ends—rather than endless iteration.`,
    whatWouldBeMissing: `Easy compatibility. You're opposites on a fundamental axis: motion vs. stillness. You'll spend a lot of energy just negotiating pace. Whatever you build together will be shaped by that ongoing tension.

If you don't manage it, you'll either tear each other apart or one of you will simply yield to the other's rhythm.`,
    questionYoureAnswering: `When is something actually done?`
  },

  // Builder × Witness
  "conscience_shaper": {
    whatYoudBuild: `Things that can withstand scrutiny. The Builder makes. The Witness watches for what's hidden in what gets made. Together, you'd create with accountability built in—structures, products, or systems designed to be examined.

You'd build things that don't rely on ignorance or hidden costs because the Witness won't let those through.`,
    whatWouldBeStrong: `You'd avoid building things that cause harm you didn't notice. The Witness catches what the Builder might miss while building fast. Together, you'd create things that are both real and honest about their impacts.

Your combination has integrity: things get made, and they're made right.`,
    whatWouldBeMissing: `Ease. Trust. The Builder wants to move; the Witness wants to verify. You'll spend significant energy on this negotiation. The Builder may feel watched; the Witness may feel overrun.

You might also become exhausting to be around—everything built, everything scrutinized, all the time.`,
    questionYoureAnswering: `Can we build something that survives honest examination?`
  },

  // Builder × Keeper
  "embers_shaper": {
    whatYoudBuild: `This is another fundamental tension. The Builder tears down and rebuilds. The Keeper preserves. What you create together depends on how you navigate this opposition.

At best, you'd build new things that carry forward what deserves to survive—innovation rooted in memory, transformation that doesn't forget what was valuable. At worst, constant conflict.`,
    whatWouldBeStrong: `If you find your rhythm, you'd avoid both reckless destruction and stubborn preservation. The Keeper would save what matters. The Builder would create what's needed next. Together, you'd have evolution rather than either revolution or stagnation.

The things you build would have roots—connected to history while still growing.`,
    whatWouldBeMissing: `Agreement about what to keep and what to discard. This is your central negotiation. The Builder sees obstacles where the Keeper sees treasures. The Keeper sees amnesia where the Builder sees progress.

You'll spend energy on this conflict regardless of how well you manage it.`,
    questionYoureAnswering: `What do we carry forward, and what do we leave behind?`
  },

  // Builder × Challenger
  "friction_shaper": {
    whatYoudBuild: `Hard things, fast. The Builder creates relentlessly. The Challenger craves difficulty. Together, you'd take on projects that others find too demanding—building ambitious, difficult, transformative things without flinching from the struggle.

You'd create through friction: things forged under pressure, made real through resistance.`,
    whatWouldBeStrong: `You're both oriented toward action and challenge. Neither of you quits when things get hard. Together, you'd accomplish things that require both endurance and momentum—breaking through obstacles that would stop others.

You'd respect each other's drive. Two forces pushing in the same direction.`,
    whatWouldBeMissing: `Rest. Reflection. Gentleness. Neither of you naturally slows down, softens, or pauses to consider whether the struggle is necessary. You could burn through yourselves and everyone around you pursuing difficult goals without asking whether they're the right goals.

You might build impressive things that nobody actually needs.`,
    questionYoureAnswering: `How hard can we push before we break?`
  },

  // Builder × Transcendent
  "shaper_unbound": {
    whatYoudBuild: `The next form of things. The Builder makes things real. The Transcendent imagines beyond current limits. Together, you'd create things that push boundaries—not just incremental improvements but genuine leaps into what's barely conceivable.

You'd build futures that others can't imagine yet, making transcendent visions tangible.`,
    whatWouldBeStrong: `You'd combine vision with execution. The Transcendent reaches for what's beyond; the Builder makes it manifest. Together, you'd turn impossible-seeming ideas into real things people can use.

Your combination is genuinely innovative: you'd make things that didn't exist before.`,
    whatWouldBeMissing: `The wisdom to know when not to build. Both of you are oriented toward expansion—one through action, one through imagination. Neither naturally asks whether this should exist, who it serves, what it displaces.

You might create powerful things without sufficient care about their consequences.`,
    questionYoureAnswering: `Can we make the impossible real?`
  },

  // Builder × Feeler
  "alive_shaper": {
    whatYoudBuild: `Experience made manifest. The Builder creates. The Feeler experiences. Together, you'd make things designed to be felt—environments, products, art, events that engage the senses fully.

You'd build things that are both real and resonant—not just functional but experiential.`,
    whatWouldBeStrong: `The Feeler brings sensitivity to what's being created; the Builder brings it into existence. Together, you'd avoid both sterile functionality and formless sensation. Things would be made, and they'd feel like something.

Your combination produces work that people actually want to engage with.`,
    whatWouldBeMissing: `Depth of meaning. Both of you are oriented toward the immediate—building what's next, feeling what's here. Neither naturally pauses for the deeper questions about why something matters or whether it should exist.

You might create beautiful, engaging things that are ultimately hollow.`,
    questionYoureAnswering: `Can what we build actually make people feel something?`
  },

  // Builder × Mender
  "mender_shaper": {
    whatYoudBuild: `Things that work. The Builder makes new things. The Mender makes existing things work again. Together, you'd create with unusual durability—building what needs to exist while caring for what already exists.

You'd build organizations, products, or systems where creation and maintenance are both valued.`,
    whatWouldBeStrong: `You'd avoid both neglecting the new and neglecting the existing. The Builder ensures things get made. The Mender ensures they keep working. Together, you'd have functional longevity.

Your combination produces things that actually last—created with care, maintained with attention.`,
    whatWouldBeMissing: `Willingness to let things end. Both of you are oriented toward continuation—building more, fixing what's there. Neither naturally asks whether something should cease to exist. You might keep building and mending things that should be allowed to die.

You might also dilute energy between new creation and constant repair.`,
    questionYoureAnswering: `Can we create things that last without calcifying?`
  },

  // Builder × Truth-Teller
  "cleareyed_shaper": {
    whatYoudBuild: `Things that hold up to the truth. The Builder creates. The Truth-Teller says what's real. Together, you'd build with unusual honesty—no self-deception about what you're making, no comfortable lies about impact or purpose.

You'd create things that can survive examination because they were built without illusion.`,
    whatWouldBeStrong: `The Builder acts; the Truth-Teller clarifies. Together, you'd avoid building things based on comfortable fictions or wishful thinking. What you make would be grounded in what's actually true.

Your combination has integrity: you'd build things you can actually defend.`,
    whatWouldBeMissing: `Tenderness with the process. Building is vulnerable; truth-telling can be harsh. You might struggle to create in ways that allow for experimentation, failure, and growth without judgment.

The Truth-Teller might critique the building before it has a chance to develop; the Builder might feel constantly exposed.`,
    questionYoureAnswering: `Can we build something that's completely honest about what it is?`
  },

  // Builder × Liminal
  "between_shaper": {
    whatYoudBuild: `This is a challenging combination. The Builder wants to create; the Liminal isn't sure what wants to be created. What you make together depends on whether the Builder can wait and the Liminal can eventually commit.

At best, the Builder gives form to what the Liminal is discovering; at worst, the Builder builds without the Liminal or the Liminal never joins the construction.`,
    whatWouldBeStrong: `If you find your rhythm, the Builder could manifest what the Liminal is still exploring—giving shape to uncertainty, creating containers for transition. Together, you might build things that help others navigate in-between states.

The Builder's bias toward action could help the Liminal actually move.`,
    whatWouldBeMissing: `Shared timing. You're working at fundamentally different paces. The Builder wants to act; the Liminal wants to wait. You'll spend energy negotiating this difference.

The Liminal might feel rushed into forms that don't fit; the Builder might feel endlessly stalled by uncertainty.`,
    questionYoureAnswering: `Can we build something before we know what it is?`
  },

  // ============================================
  // ABUNDANT (citizen) PAIRINGS
  // (questioner × abundant, builder × abundant already done)
  // ============================================

  // Abundant × Abundant
  "citizen_citizen": {
    whatYoudBuild: `A world of possibility without scarcity thinking. You'd both trust that there's enough—resources, time, opportunity—and build from that premise. Together, you'd create expansive systems, generous projects, communities built on the assumption that abundance is possible.

Nothing would feel zero-sum. Every collaboration would assume that everyone can benefit.`,
    whatWouldBeStrong: `You'd never exhaust each other with suspicion or competition. Both of you see possibility where others see limitation. Together, you'd dream bigger and reach further than those constrained by scarcity mindsets.

You'd attract others with your generosity and optimism—people want to be part of what you're building.`,
    whatWouldBeMissing: `Critical examination of who's actually benefiting. Both of you trust that expanding access serves everyone, but access isn't the same as equity. You might build generous systems that still leave people out—and neither of you is naturally wired to notice.

You might also miss real constraints, assuming abundance where scarcity is genuine.`,
    questionYoureAnswering: `What becomes possible when scarcity isn't the starting assumption?`
  },

  // Abundant × Architect
  "architect_citizen": {
    whatYoudBuild: `Systems that expand access for everyone. The Abundant sees possibility. The Architect builds structures to realize it. Together, you'd create institutions, platforms, or organizations designed to distribute good things widely.

You'd build the infrastructure of abundance—systems that make generosity scalable.`,
    whatWouldBeStrong: `The Abundant brings vision of what's possible; the Architect brings the structural thinking to make it work. Together, you'd avoid both naive dreaming and soulless engineering. Things would get built that actually serve the vision.

Your combination creates things that work and matter at scale.`,
    whatWouldBeMissing: `The view from below. Both of you think in terms of systems, and systems can miss individuals. The person who falls through the cracks of your generous, well-designed structure might be invisible to both of you.

You might also create bureaucracy in the name of abundance—processes that slow access rather than enable it.`,
    questionYoureAnswering: `Can we build systems that make abundance real for everyone?`
  },

  // Abundant × Present
  "citizen_presence": {
    whatYoudBuild: `Plenty that's actually enjoyed. The Abundant creates conditions of possibility. The Present ensures those conditions are actually inhabited, not just accessed. Together, you'd build environments where good things exist AND people are present enough to receive them.

You'd create spaces—physical, social, temporal—where abundance meets attention.`,
    whatWouldBeStrong: `The Abundant expands what's possible; the Present grounds it in actual experience. Together, you'd avoid both abundance that nobody enjoys and presence that's limited to scarcity.

Your combination makes generosity real in people's lives, not just as a system feature.`,
    whatWouldBeMissing: `Urgency about injustice. Neither of you is naturally oriented toward conflict, criticism, or difficult intervention. You might create beautiful, abundant, present spaces while ignoring the places where people are suffering and need active help, not just expanded access.

You might enable each other's avoidance of the hard parts.`,
    questionYoureAnswering: `What good is abundance if nobody is present to enjoy it?`
  },

  // Abundant × Rooted
  "citizen_rooted": {
    whatYoudBuild: `Enough, known and appreciated. The Abundant sees possibility for more. The Rooted knows when to stop. Together, you'd create spaces where expansion doesn't mean endless accumulation—where "more is possible" and "this is enough" can coexist.

You'd build lives, communities, or practices where abundance doesn't become compulsion.`,
    whatWouldBeStrong: `You'd balance each other. The Abundant prevents the Rooted from settling for too little. The Rooted prevents the Abundant from always reaching for more. Together, you'd find the right amount.

Your combination models a different relationship with plenty: appreciating it without grasping.`,
    whatWouldBeMissing: `The energy of ambition. The Abundant expands possibilities; the Rooted contracts action. Together, you might create pleasant stasis—comfortable but not transformative. Neither of you naturally drives toward difficult achievement.

You might settle into comfort that serves you but doesn't serve others who still need change.`,
    questionYoureAnswering: `How do we know when we have enough?`
  },

  // Abundant × Witness
  "citizen_conscience": {
    whatYoudBuild: `This is a productive tension. The Abundant trusts systems; the Witness watches them for hidden costs. What you create depends on whether you can integrate optimism with vigilance.

At best, you'd build things that are both generous and accountable—expansive systems with built-in scrutiny. At worst, you'd exhaust each other.`,
    whatWouldBeStrong: `If you find your rhythm, the Witness catches the places where the Abundant's optimism is naive, and the Abundant helps the Witness see what's working alongside what's broken.

Together, you could create systems that are both trusting and accountable—rare combination.`,
    whatWouldBeMissing: `Easy agreement. The Abundant's trust conflicts with the Witness's suspicion. You'll spend energy negotiating this tension. The Abundant may feel constantly doubted; the Witness may feel constantly overridden.

One of you will likely have to yield somewhat for collaboration to work.`,
    questionYoureAnswering: `Can we trust systems while still watching them?`
  },

  // Abundant × Keeper
  "citizen_embers": {
    whatYoudBuild: `Expansion that remembers its roots. The Abundant sees forward to what's possible. The Keeper looks back to what worked. Together, you'd create things that are both innovative and historically grounded—progress with memory.

You'd build institutions or practices that grow without forgetting what made them worth growing.`,
    whatWouldBeStrong: `The Abundant prevents the Keeper from becoming stuck in the past. The Keeper prevents the Abundant from discarding what deserves to continue. Together, you'd have evolution rather than either revolution or stagnation.

Your combination creates things with both future and past—sustainable growth.`,
    whatWouldBeMissing: `Urgency for change. Neither of you naturally confronts, disrupts, or tears down. The Abundant prefers to expand around obstacles; the Keeper prefers to preserve what exists. When something needs to be actively dismantled, neither of you naturally moves that direction.

You might be too gentle with systems that need more than reform.`,
    questionYoureAnswering: `Can we expand into the future without losing the past?`
  },

  // Abundant × Challenger
  "citizen_friction": {
    whatYoudBuild: `Abundance that isn't soft. The Abundant creates conditions of plenty. The Challenger insists that ease isn't enough—that meaning requires friction. Together, you'd build environments where resources are available AND there's still room for struggle, growth, and earned achievement.

You'd create abundance that doesn't atrophy the spirit.`,
    whatWouldBeStrong: `The Abundant provides the resources; the Challenger provides the resistance. Together, you'd avoid both scarcity that's cruel and comfort that's hollow.

Your combination addresses one of the real problems with abundance: what do we struggle for when survival is solved?`,
    whatWouldBeMissing: `Rest for those who need it. The Abundant creates plenty; the Challenger demands struggle within it. But some people just need rest, healing, ease—not more challenges. Your combination might be exhausting to those who aren't seeking friction.

You might also judge those who simply want comfort.`,
    questionYoureAnswering: `Can we have abundance that still demands something of us?`
  },

  // Abundant × Transcendent
  "citizen_unbound": {
    whatYoudBuild: `Possibility without limits. The Abundant expands access. The Transcendent expands conception of what's possible at all. Together, you'd dream and build at the furthest edges—not just more of what exists but entirely new categories of experience and being.

You'd create visions and experiments that go beyond current human limitations.`,
    whatWouldBeStrong: `Neither of you is constrained by conventional boundaries. The Abundant thinks in systems; the Transcendent thinks beyond them. Together, you'd imagine and work toward things others can't conceive.

Your combination is genuinely visionary—high risk, potentially transformative.`,
    whatWouldBeMissing: `The ground. Both of you are oriented toward expansion—one of access, one of form itself. You might create ideas and experiments so far out that nobody can use them yet, or that cause harm to people you've stopped seeing.

You might lose touch with ordinary human needs in your reach for the extraordinary.`,
    questionYoureAnswering: `What becomes possible when we stop accepting current limits?`
  },

  // Abundant × Feeler
  "alive_citizen": {
    whatYoudBuild: `Every possible experience. The Abundant creates conditions for more. The Feeler wants to feel it all. Together, you'd build lives, events, spaces optimized for the full range of experience—sensation, emotion, connection—made available widely.

You'd create worlds where feeling everything is possible and encouraged.`,
    whatWouldBeStrong: `The Abundant expands access; the Feeler ensures it's worth accessing. Together, you'd avoid both abundance that nobody enjoys and experience that's limited by scarcity.

Your combination creates conditions for genuine flourishing—plenty of opportunities to feel alive.`,
    whatWouldBeMissing: `Depth. Both of you are oriented toward more rather than deeper. The Abundant wants expanded access; the Feeler wants expanded sensation. You might create breadth without depth—many experiences, none fully processed or understood.

You might also enable each other's avoidance of hard questions about meaning.`,
    questionYoureAnswering: `What if we could feel everything that's possible?`
  },

  // Abundant × Mender
  "citizen_mender": {
    whatYoudBuild: `Systems that repair themselves. The Abundant creates conditions of plenty. The Mender fixes what breaks. Together, you'd build things that are both generously provisioned AND carefully maintained—abundance that lasts because someone's tending it.

You'd create sustainable abundance—not just plenty, but plenty that keeps working.`,
    whatWouldBeStrong: `The Abundant provides resources; the Mender ensures they're cared for. Together, you'd avoid both neglected systems and resource-starved maintenance.

Your combination creates the rare thing: abundance that's actually sustained over time.`,
    whatWouldBeMissing: `Disruption when it's needed. Neither of you naturally tears things down. The Abundant expands around problems; the Mender repairs them. When something needs to end, not be fixed or expanded, neither of you naturally moves that way.

You might prolong systems that should be replaced entirely.`,
    questionYoureAnswering: `Can we build abundance that maintains itself?`
  },

  // Abundant × Truth-Teller
  "citizen_cleareyed": {
    whatYoudBuild: `Honest abundance. The Abundant trusts that plenty is possible. The Truth-Teller insists on seeing what's actually happening. Together, you'd build systems that are both generous and honest—not claiming abundance where it doesn't exist, not hiding costs.

You'd create plenty that can survive examination.`,
    whatWouldBeStrong: `The Abundant brings optimism; the Truth-Teller brings clarity. Together, you'd avoid both naive trust and cynical dismissal. What you build would be genuinely good AND honestly assessed.

Your combination has integrity: you'd expand what's possible while telling the truth about what's real.`,
    whatWouldBeMissing: `Comfort with ambiguity. The Abundant trusts things will work out; the Truth-Teller needs to see clearly. Between you, there's pressure to resolve every uncertainty—either into optimism or into hard truth. Sitting with not-knowing might be difficult.

You might also be hard on people who aren't as clear-eyed or optimistic as you.`,
    questionYoureAnswering: `Can we create abundance without lying about what it costs?`
  },

  // Abundant × Liminal
  "between_citizen": {
    whatYoudBuild: `Possibility for those in transition. The Abundant creates conditions of plenty. The Liminal inhabits the spaces between. Together, you'd build resources, spaces, and support for people who are still figuring it out—abundance that doesn't require certainty.

You'd create generous environments for uncertainty.`,
    whatWouldBeStrong: `The Abundant provides without demanding resolution. The Liminal models that not-knowing is okay. Together, you'd create rare spaces: plenty that doesn't pressure people to become something yet.

Your combination serves people in transition better than most.`,
    whatWouldBeMissing: `Direction. The Abundant expands possibilities; the Liminal doesn't choose among them. Together, you might create supportive environments that never help people actually move forward—endless transition enabled by endless resources.

You might also frustrate people who are ready for commitment.`,
    questionYoureAnswering: `Can we have abundance that doesn't demand resolution?`
  },

  // ============================================
  // ARCHITECT PAIRINGS
  // (already done: questioner, builder, abundant)
  // ============================================

  // Architect × Architect
  "architect_architect": {
    whatYoudBuild: `Systems that build systems. You'd both think in structures, processes, collective ownership. Together, you'd create elaborate, well-designed institutions—organizations, platforms, frameworks—where everything is thought through.

Nothing would be accidental. Every piece would serve the whole.`,
    whatWouldBeStrong: `You'd understand each other immediately. Both of you see the invisible architecture; both of you care about how things work at scale. Together, you'd design things of genuine complexity and elegance.

Your combination produces sophisticated systems that actually function.`,
    whatWouldBeMissing: `The individual. Both of you think in systems, and systems can forget people. The person who doesn't fit your structures, who needs exception, who is irreducible to their function—you might miss them together.

You might also over-engineer, creating bureaucracy when simplicity would serve better.`,
    questionYoureAnswering: `How sophisticated can we make the architecture?`
  },

  // Architect × Present
  "architect_presence": {
    whatYoudBuild: `Systems that enable presence. The Architect thinks in structures. The Present values attention and being-here. Together, you'd build organizations, spaces, or practices where the structure exists to support connection, not to replace it.

You'd create systems that serve presence rather than compete with it.`,
    whatWouldBeStrong: `The Architect designs the container; the Present ensures it serves human connection. Together, you'd avoid both cold systems and unstructured chaos. Things would be well-designed AND inhabited by present people.

Your combination creates organizations that actually feel good to be in.`,
    whatWouldBeMissing: `Drive. Neither of you is naturally oriented toward achievement, growth, or building new things. The Architect maintains systems; the Present maintains attention. You might create beautiful, well-functioning spaces that never evolve or expand.

You might serve the people already inside your structures while ignoring those outside.`,
    questionYoureAnswering: `Can systems make presence easier instead of harder?`
  },

  // Architect × Rooted
  "architect_rooted": {
    whatYoudBuild: `Stable structures. The Architect thinks in systems. The Rooted values stillness and enough. Together, you'd build things designed to last—not to grow endlessly, but to function well for a long time.

You'd create institutions or practices that serve their purpose without compulsive expansion.`,
    whatWouldBeStrong: `You'd both value sustainability over growth. The Architect designs for longevity; the Rooted knows when to stop adding. Together, you'd create things that are genuinely stable—functioning systems that don't need constant change.

Your combination produces durability that most partnerships can't achieve.`,
    whatWouldBeMissing: `Adaptation. Both of you value stability—one in systems, one in stillness. When the environment changes and your structures need to evolve, neither of you naturally moves that direction.

You might create things that outlast their usefulness because neither of you initiates the change they need.`,
    questionYoureAnswering: `Can we build something that doesn't need to keep growing?`
  },

  // Architect × Witness
  "architect_conscience": {
    whatYoudBuild: `Accountable systems. The Architect builds structures. The Witness watches for what they hide. Together, you'd create institutions with built-in transparency—systems designed to be examined, with accountability as a feature rather than an afterthought.

You'd build the structures of honesty at scale.`,
    whatWouldBeStrong: `The Architect provides structural thinking; the Witness provides vigilance. Together, you'd avoid both naively trusting systems and paranoid rejection of them. Your structures would be worth trusting because they were built to be watched.

Your combination produces institutions that can actually earn trust.`,
    whatWouldBeMissing: `Speed and warmth. The Architect designs carefully; the Witness examines thoroughly. Neither of you moves fast or prioritizes comfort. Your structures might be excellent but slow to build and demanding to inhabit.

You might also miss the human element—the parts of life that don't fit into accountable systems.`,
    questionYoureAnswering: `Can we build systems that deserve trust?`
  },

  // Architect × Keeper
  "architect_embers": {
    whatYoudBuild: `Structures that remember. The Architect builds systems. The Keeper preserves what matters. Together, you'd create institutions with living memory—organizations or practices that evolve while maintaining connection to their origins.

You'd build things that know where they came from.`,
    whatWouldBeStrong: `The Architect provides structural thinking; the Keeper provides historical grounding. Together, you'd avoid both amnesia and stagnation. Your systems would adapt without forgetting.

Your combination creates institutions with unusual depth—functioning in the present while rooted in the past.`,
    whatWouldBeMissing: `Radical innovation. Both of you are oriented toward continuity—one through structure, one through memory. When something genuinely new is needed, neither of you naturally makes the leap.

You might preserve and structure what exists while missing what needs to be invented.`,
    questionYoureAnswering: `Can our structures carry memory forward without becoming museums?`
  },

  // Architect × Challenger
  "architect_friction": {
    whatYoudBuild: `Systems that demand something. The Architect thinks in structures. The Challenger craves difficulty. Together, you'd create institutions or practices that are both well-designed and challenging—systems that work well precisely because they ask something of the people in them.

You'd build the architecture of growth through difficulty.`,
    whatWouldBeStrong: `The Architect provides structure; the Challenger provides rigor. Together, you'd avoid both chaotic struggle and empty process. Your systems would actually develop people because challenge is built into the design.

Your combination produces demanding excellence—institutions that make people better.`,
    whatWouldBeMissing: `Ease for those who need it. Both of you value rigor—one structural, one personal. People who need rest, healing, or simple support might not find it in what you build together.

You might create systems that are excellent for the strong and harsh for the struggling.`,
    questionYoureAnswering: `Can we design systems that make us stronger?`
  },

  // Architect × Transcendent
  "architect_unbound": {
    whatYoudBuild: `This is a fundamental tension. The Architect creates structures. The Transcendent wants to transcend them. What you build depends on whether you can integrate containment with expansion.

At best, you'd create structures that enable transcendence—architectures for liberation. At worst, you'd constantly oppose each other.`,
    whatWouldBeStrong: `If you find your rhythm, the Architect could build containers for the Transcendent's expansion—launchpads rather than cages. Together, you might create things that help others transcend limits through well-designed support.

Your combination could make transcendence accessible rather than chaotic.`,
    whatWouldBeMissing: `Easy compatibility. The Architect wants to structure; the Transcendent wants to dissolve structure. You'll spend energy negotiating this tension.

One of you will likely need to compromise significantly for collaboration to work.`,
    questionYoureAnswering: `Can structure set us free instead of constraining us?`
  },

  // Architect × Feeler
  "alive_architect": {
    whatYoudBuild: `Systems for experience. The Architect thinks in structures. The Feeler wants to feel everything. Together, you'd create environments—physical, social, institutional—designed to maximize experience. The structure would serve sensation.

You'd build the architecture of feeling alive.`,
    whatWouldBeStrong: `The Architect designs the container; the Feeler ensures it's worth experiencing. Together, you'd avoid both cold systems and formless sensation. Experiences would be available because they're structurally enabled.

Your combination creates environments that feel good by design.`,
    whatWouldBeMissing: `Depth. The Architect thinks in systems; the Feeler opens to sensation. Neither naturally pauses for deep reflection on meaning or purpose. You might create elaborate structures for experience without ever asking what it's all for.

You might produce beautiful, functional emptiness.`,
    questionYoureAnswering: `Can we design systems that help people feel alive?`
  },

  // Architect × Mender
  "architect_mender": {
    whatYoudBuild: `Systems that heal. The Architect thinks in structures. The Mender fixes what's broken. Together, you'd create institutions or practices designed for repair—restorative systems that help things (and people) function again.

You'd build the infrastructure of mending at scale.`,
    whatWouldBeStrong: `The Architect provides structural thinking; the Mender provides care for what exists. Together, you'd create things designed for sustainable function—not just working but maintained, not just built but tended.

Your combination produces systems that actually last because repair is built in.`,
    whatWouldBeMissing: `Disruption. Both of you are oriented toward function—making things work or keeping them working. When something needs to end, not be repaired or restructured, neither of you naturally moves that direction.

You might preserve what should be replaced.`,
    questionYoureAnswering: `Can we build systems that repair themselves?`
  },

  // Architect × Truth-Teller
  "architect_cleareyed": {
    whatYoudBuild: `Honest structures. The Architect thinks in systems. The Truth-Teller says what's real. Together, you'd create institutions that don't lie—systems designed with clear-eyed understanding of how things actually work, not how you wish they worked.

You'd build structures grounded in truth.`,
    whatWouldBeStrong: `The Architect provides structural thinking; the Truth-Teller provides honesty. Together, you'd avoid systems built on comfortable fictions or wishful thinking. What you create would actually work because it's based on reality.

Your combination produces institutions that tell the truth about themselves.`,
    whatWouldBeMissing: `Warmth. Both of you are oriented toward clarity—structural and verbal. The soft, ambiguous, emotional parts of life might not fit well in what you build together.

You might create excellent, honest systems that people don't want to be in because they feel cold.`,
    questionYoureAnswering: `Can we build systems that don't deceive?`
  },

  // Architect × Liminal
  "architect_between": {
    whatYoudBuild: `Structures for transition. The Architect thinks in systems. The Liminal inhabits the in-between. Together, you'd create institutions or practices that support people in transition—architectures that don't demand resolution, that hold uncertainty.

You'd build the infrastructure of becoming.`,
    whatWouldBeStrong: `The Architect provides structure; the Liminal ensures it serves people who aren't sure yet. Together, you'd create rare things: organized support for uncertainty, well-designed containers for not-knowing.

Your combination serves people in transition better than most structures can.`,
    whatWouldBeMissing: `Drive toward completion. The Architect creates systems; the Liminal stays in between. Neither of you naturally pushes toward resolution or achievement. You might create holding environments that never help people actually move.

You might perfect the architecture of waiting.`,
    questionYoureAnswering: `Can we build structures that support not-knowing?`
  },

// ============================================
  // PRESENT (presence) PAIRINGS
  // (already done: questioner, builder, abundant, architect)
  // ============================================

  // Present × Present
  "presence_presence": {
    whatYoudBuild: `A life of full attention. You'd both be completely here, completely now. Together, you'd create spaces and relationships where distraction is the exception, where being together means actually being together.

Nothing would be performed or half-present. Every moment would be genuinely inhabited.`,
    whatWouldBeStrong: `Connection. When both people are fully present, intimacy happens naturally. You'd never have to compete with phones, plans, or the next thing. Together, you'd model a different way of being in relationship.

Your combination creates rare depth—most relationships have at least one person who's elsewhere.`,
    whatWouldBeMissing: `Action. Building. Progress. Both of you are oriented toward being here, not moving forward. Projects might languish, ambitions might wait, things that need doing might not get done.

You might create a beautiful, present life together that produces nothing beyond itself.`,
    questionYoureAnswering: `What happens when two people are fully here with each other?`
  },

  // Present × Rooted
  "presence_rooted": {
    whatYoudBuild: `Stillness together. The Present shows up fully. The Rooted stops. Together, you'd create a life or practice of genuine peace—not seeking, not building, not reaching, just being here completely.

You'd build (or unbuild) a way of living that most people can't imagine.`,
    whatWouldBeStrong: `Neither of you would pressure the other to produce, achieve, or become something else. You'd accept each other completely. The stillness you'd create together would be genuinely rare in a world optimized for motion.

Your combination offers sanctuary from the culture of more.`,
    whatWouldBeMissing: `Engagement with the world. Both of you are oriented inward—toward presence, toward stillness. The world outside your shared peace might not receive your gifts, and problems that need addressing might go unaddressed.

You might create a beautiful retreat that serves only yourselves.`,
    questionYoureAnswering: `What exists in complete stillness and presence?`
  },

  // Present × Witness
  "conscience_presence": {
    whatYoudBuild: `Attention that sees what's hidden. The Present shows up fully. The Witness watches for what's being concealed. Together, you'd create a practice or life where nothing is missed—both what's here and what's being hidden.

You'd be impossible to deceive because you're both paying complete attention.`,
    whatWouldBeStrong: `The Present brings warmth and attention; the Witness brings vigilance and discernment. Together, you'd notice what others miss AND care about what you notice.

Your combination creates unusual perception: seeing clearly and being moved by what you see.`,
    whatWouldBeMissing: `Trust and ease. The Witness is always watching for threats; constant presence can become constant examination. You might exhaust yourselves with attention that never relaxes.

You might struggle to simply enjoy anything without watching for its hidden costs.`,
    questionYoureAnswering: `What do we see when we pay complete attention?`
  },

  // Present × Keeper
  "embers_presence": {
    whatYoudBuild: `Memory that's fully inhabited. The Present shows up now. The Keeper guards what was. Together, you'd create spaces or practices where the past is genuinely alive in the present—not nostalgically but with full attention.

You'd build living memory rather than archived memory.`,
    whatWouldBeStrong: `The Keeper brings the past forward; the Present receives it with full attention. Together, you'd avoid both amnesia and dead reverence. What you remember would be actually felt, not just recorded.

Your combination creates unusual continuity: memory that lives because it's present.`,
    whatWouldBeMissing: `The future. Both of you are oriented toward what is (present) or what was (memory). Innovation, building, becoming something new—these might not happen.

You might create a life richly connected to the past but not growing toward anything.`,
    questionYoureAnswering: `How do we remember in a way that's alive?`
  },

  // Present × Challenger
  "friction_presence": {
    whatYoudBuild: `Struggle that's fully experienced. The Present shows up completely. The Challenger seeks difficulty. Together, you'd engage challenges without avoidance—fully present to whatever friction arises.

You'd build practices or relationships where difficulty is faced, not escaped or numbed.`,
    whatWouldBeStrong: `The Present prevents the Challenger from using struggle as escape. The Challenger prevents the Present from avoiding necessary difficulty. Together, you'd face what needs facing, completely.

Your combination creates unusual courage: the willingness to be present to hard things.`,
    whatWouldBeMissing: `Ease. Rest. The Challenger seeks friction; the Present demands full attention. Together, you might exhaust yourselves being completely present to constant challenge.

You might need more gentleness than either of you naturally offers.`,
    questionYoureAnswering: `What happens when we're fully present to difficulty?`
  },

  // Present × Transcendent
  "presence_unbound": {
    whatYoudBuild: `This is a fundamental tension. The Present is committed to being here. The Transcendent reaches beyond here. What you create depends on whether you can integrate grounding with expansion.

At best, transcendence that's embodied—reaching beyond while still being here. At worst, constant opposition.`,
    whatWouldBeStrong: `If you find your rhythm, the Present could ground the Transcendent's expansion, and the Transcendent could show the Present that being here includes reaching beyond.

Together, you might create embodied transcendence—rare and valuable.`,
    whatWouldBeMissing: `Easy compatibility. The Present says "be here." The Transcendent says "go beyond here." You'll spend energy negotiating this tension.

One of you will likely need to significantly accommodate the other for collaboration to work.`,
    questionYoureAnswering: `Can we transcend and still be here?`
  },

  // Present × Feeler
  "alive_presence": {
    whatYoudBuild: `Full experience. The Present shows up completely. The Feeler opens to everything. Together, you'd create lives rich with fully-felt sensation—nothing buffered, nothing half-experienced.

You'd build (or simply live) a way of being that takes everything in.`,
    whatWouldBeStrong: `You'd both receive life fully. Neither avoids through distraction; neither numbs through busyness. Together, you'd experience more in a day than most people do in a year.

Your combination creates unusual aliveness—completely present to everything.`,
    whatWouldBeMissing: `Production. Achievement. Direction. Both of you are oriented toward receiving rather than producing. You might live richly while creating nothing external. The world might not see your gifts.

You might enable each other's avoidance of the harder work of making things.`,
    questionYoureAnswering: `What does it feel like to be completely here and completely open?`
  },

  // Present × Mender
  "mender_presence": {
    whatYoudBuild: `Healing through attention. The Present shows up fully. The Mender repairs what's broken. Together, you'd create therapeutic spaces or relationships where being present IS the healing—where attention itself mends.

You'd build practices of repair that work through presence.`,
    whatWouldBeStrong: `The Present brings full attention; the Mender brings intention to heal. Together, you'd offer something rare: complete attention to what's wounded, which is often what wounds need most.

Your combination heals by noticing—many broken things just need someone to see them.`,
    whatWouldBeMissing: `Transformation. Both of you work with what is—being present to it, repairing it. Neither naturally creates something new or challenges what exists. You might mend things that should be replaced.

You might preserve what needs to end, tenderly.`,
    questionYoureAnswering: `Can presence itself be healing?`
  },

  // Present × Truth-Teller
  "cleareyed_presence": {
    whatYoudBuild: `Presence that speaks truth. The Present shows up fully. The Truth-Teller says what's real. Together, you'd create relationships or spaces where both attention and honesty are complete—nothing hidden, nothing performed.

You'd build a way of being together that's completely real.`,
    whatWouldBeStrong: `The Present ensures attention; the Truth-Teller ensures honesty. Together, you'd avoid both distracted kindness and harsh disconnection. You'd be fully here AND completely honest.

Your combination creates unusually trustworthy spaces—nowhere to hide, no reason to hide.`,
    whatWouldBeMissing: `Softness. The Present demands full attention; the Truth-Teller demands honesty. This can become intense, even exhausting. Sometimes people need to be seen without being clarified.

You might struggle to hold space for comfortable illusions that people aren't ready to give up.`,
    questionYoureAnswering: `What happens when we're fully present and completely honest?`
  },

  // Present × Liminal
  "between_presence": {
    whatYoudBuild: `Presence in transition. The Present shows up fully. The Liminal inhabits the in-between. Together, you'd create spaces or practices for being completely here during uncertainty—present to not-knowing.

You'd build ways of being that don't require resolution to be real.`,
    whatWouldBeStrong: `The Present brings full attention; the Liminal brings comfort with uncertainty. Together, you'd be able to be completely here without demanding that "here" be settled or clear.

Your combination creates rare patience: fully attending to what hasn't resolved yet.`,
    whatWouldBeMissing: `Direction. Movement. Both of you are oriented toward inhabiting rather than progressing. The Present stays; the Liminal waits. You might create beautiful stasis—fully present to endless transition.

You might need external force to ever move anywhere.`,
    questionYoureAnswering: `Can we be fully present to what's not yet resolved?`
  },

  // ============================================
  // ROOTED PAIRINGS
  // (already done: questioner, builder, abundant, architect, present)
  // ============================================

  // Rooted × Rooted
  "rooted_rooted": {
    whatYoudBuild: `Complete stillness together. You'd both stop, stay, and be. Nothing would need to change or grow. Together, you'd create a way of living that resists every pressure to become something else.

You'd model sufficiency in a world that demands more.`,
    whatWouldBeStrong: `Neither of you would push the other. The culture's demands for growth, productivity, and becoming would find no purchase. Together, you'd demonstrate that stopping is possible.

Your combination offers sanctuary for anyone exhausted by the expectation of endless becoming.`,
    whatWouldBeMissing: `Everything that requires action. Neither of you naturally moves, builds, or changes. When the world needs your engagement, you might not offer it. Your stillness could become withdrawal.

You might perfect the art of staying while the world you could help passes by.`,
    questionYoureAnswering: `What exists in complete stillness?`
  },

  // Rooted × Witness
  "conscience_rooted": {
    whatYoudBuild: `Watchful stillness. The Rooted stays; the Witness watches. Together, you'd create a practice or life of quiet vigilance—not moving, but seeing everything.

You'd build nothing but you'd notice everything.`,
    whatWouldBeStrong: `The Rooted provides stability; the Witness provides awareness. Together, you'd see what moves around you without being swept up in it. Your stillness would be alert, not asleep.

Your combination creates unusual clarity: seeing from a fixed point.`,
    whatWouldBeMissing: `Action. Both of you are oriented toward perceiving rather than doing. The Rooted stays; the Witness watches. When intervention is needed, neither of you naturally moves.

You might see everything and do nothing.`,
    questionYoureAnswering: `What do we see when we stay still and watch?`
  },

  // Rooted × Keeper
  "embers_rooted": {
    whatYoudBuild: `Memory held in stillness. The Rooted stays; the Keeper remembers. Together, you'd create spaces or practices where the past is preserved through staying—not through museums or archives but through simply not leaving.

You'd build continuity by being the continuity.`,
    whatWouldBeStrong: `The Rooted doesn't move on; the Keeper doesn't forget. Together, you'd maintain connection to what was through the simplest means: still being here, still remembering.

Your combination creates living tradition through presence rather than effort.`,
    whatWouldBeMissing: `The new. Both of you are oriented backward—toward staying, toward remembering. Innovation, change, becoming something different—these wouldn't happen.

You might become guardians of the past while the future forms without you.`,
    questionYoureAnswering: `What do we remember by simply staying?`
  },

  // Rooted × Challenger
  "friction_rooted": {
    whatYoudBuild: `This is your fundamental tension. The Rooted stops; the Challenger seeks difficulty. What you create depends entirely on how you navigate this opposition.

At best, you'd discover that stillness can be its own difficulty—that staying is hard. At worst, mutual incomprehension.`,
    whatWouldBeStrong: `If you find your rhythm, the Challenger might discover the difficulty of not-doing, and the Rooted might discover that staying still in a moving world requires strength.

Together, you could model that peace takes discipline.`,
    whatWouldBeMissing: `Easy compatibility. The Challenger wants friction; the Rooted wants stillness. You'll spend significant energy negotiating this fundamental difference.

One of you will likely need to significantly accommodate the other, or you'll simply frustrate each other.`,
    questionYoureAnswering: `Is stillness its own form of difficulty?`
  },

  // Rooted × Transcendent
  "rooted_unbound": {
    whatYoudBuild: `This is an interesting opposition. The Rooted stays here; the Transcendent reaches beyond. Yet both resist the conventional push-forward of achievement culture.

At best, you'd create a tension between grounding and expansion that keeps each in check. At worst, complete disconnection.`,
    whatWouldBeStrong: `Both of you reject the standard story about progress and achievement. The Rooted through staying; the Transcendent through going beyond. You might find unexpected kinship in your shared skepticism of conventional motion.

Together, you'd model alternative relationships with ambition.`,
    whatWouldBeMissing: `Common ground for building. The Rooted stays; the Transcendent transcends. Neither is naturally in the middle space where most collaboration happens.

You might admire each other from distance without finding much to do together.`,
    questionYoureAnswering: `What do staying and transcending have in common?`
  },

  // Rooted × Feeler
  "alive_rooted": {
    whatYoudBuild: `Sensation without seeking. The Rooted stays; the Feeler opens. Together, you'd create a way of experiencing that doesn't require chasing—receiving what comes while staying still.

You'd build a life of passive intensity: deeply felt, never grasping.`,
    whatWouldBeStrong: `The Rooted prevents the Feeler from chasing sensation; the Feeler prevents the Rooted from becoming numb. Together, you'd experience deeply without the anxiety of pursuit.

Your combination creates unusual richness: still, but not dead.`,
    whatWouldBeMissing: `Expansion. Adventure. Both of you receive rather than pursue. The experiences that require going somewhere might never come. You might create a small, deep life instead of a large, varied one.

You might miss what can only be found by moving.`,
    questionYoureAnswering: `What can we feel without leaving where we are?`
  },

  // Rooted × Mender
  "mender_rooted": {
    whatYoudBuild: `Care in place. The Rooted stays; the Mender fixes. Together, you'd create a life or practice of tending what's here—not seeking new things to fix but repairing what's in front of you, over and over.

You'd build durability through attention to the local.`,
    whatWouldBeStrong: `The Rooted provides continuity; the Mender provides care. Together, you'd maintain things that others abandon. Your commitment to what's here would produce unusual longevity.

Your combination creates things that last because someone stayed and tended them.`,
    whatWouldBeMissing: `Scope. Both of you are oriented toward the local and existing. The problems beyond your immediate environment might not receive your gifts. You might perfect one small place while larger things break.

You might need to expand your circle of care.`,
    questionYoureAnswering: `What happens when we stay and mend the same place forever?`
  },

  // Rooted × Truth-Teller
  "cleareyed_rooted": {
    whatYoudBuild: `Truth that stays. The Rooted doesn't move; the Truth-Teller sees clearly. Together, you'd create a practice or life of clear-eyed presence—neither running from truth nor chasing it.

You'd build honesty without drama: seeing what's here while staying here.`,
    whatWouldBeStrong: `The Rooted grounds truth-telling in stability; the Truth-Teller keeps the Rooted from hiding in stillness. Together, you'd face reality without flinching or fleeing.

Your combination creates unusual steadiness: seeing the hard things and staying anyway.`,
    whatWouldBeMissing: `Response. Both of you are oriented toward perceiving rather than acting. The Rooted stays; the Truth-Teller sees. When truth demands action, neither of you naturally moves.

You might see everything clearly and do nothing about it.`,
    questionYoureAnswering: `What truths emerge only in stillness?`
  },

  // Rooted × Liminal
  "between_rooted": {
    whatYoudBuild: `Stillness in transition. The Rooted stays; the Liminal waits in the between. Together, you'd create spaces or practices for patient uncertainty—staying put while not-knowing.

You'd build containers for extended transition without pressure to resolve.`,
    whatWouldBeStrong: `The Rooted provides stillness; the Liminal provides comfort with uncertainty. Together, you'd create rare patience: staying in place while nothing is clear.

Your combination supports people who need time more than direction.`,
    whatWouldBeMissing: `Movement toward anything. The Rooted stays; the Liminal doesn't commit. Neither of you naturally moves forward. You might create endless, comfortable uncertainty.

You might perfect waiting without ever arriving.`,
    questionYoureAnswering: `Can we stay still in the in-between?`
  },

  // ============================================
  // WITNESS (conscience) PAIRINGS
  // (already done: questioner, builder, abundant, architect, present, rooted)
  // ============================================

  // Witness × Witness
  "conscience_conscience": {
    whatYoudBuild: `Eyes everywhere. You'd both watch, both spot what's hidden, both refuse to look away. Together, you'd create a practice or life of complete vigilance—nothing would escape notice.

You'd build accountability through relentless attention.`,
    whatWouldBeStrong: `Nothing would be hidden from your combined gaze. You'd catch what single watchers miss. Together, you'd create spaces where deception is impossible and accountability is complete.

Your combination produces thorough oversight: every angle covered.`,
    whatWouldBeMissing: `Trust. Rest. Joy. Both of you are watching for what's wrong. Neither naturally celebrates what's working or rests in what's good. Your constant vigilance could become exhausting cynicism.

You might see every problem and appreciate nothing.`,
    questionYoureAnswering: `What happens when nothing can be hidden?`
  },

  // Witness × Keeper
  "conscience_embers": {
    whatYoudBuild: `Memory of what was hidden. The Witness sees what's concealed; the Keeper preserves what matters. Together, you'd create archives of truth—records of what others want forgotten.

You'd build the memory of accountability.`,
    whatWouldBeStrong: `The Witness catches what's hidden; the Keeper ensures it's not forgotten. Together, you'd prevent historical amnesia about wrongs and costs. Nothing swept under the rug would stay there.

Your combination creates durable truth: seeing and remembering.`,
    whatWouldBeMissing: `The future. Both of you are oriented toward what happened (the Keeper) or what's being hidden (the Witness). Neither naturally builds toward what could be. You might perfect the record of the past without creating anything new.

You might become curators of wrongs rather than builders of right.`,
    questionYoureAnswering: `What must we remember that others want forgotten?`
  },

  // Witness × Challenger
  "conscience_friction": {
    whatYoudBuild: `Difficult truth. The Witness sees what's hidden; the Challenger demands difficulty. Together, you'd create a practice of facing hard truths—not just seeing them but wrestling with them.

You'd build the discipline of uncomfortable honesty.`,
    whatWouldBeStrong: `The Witness finds what's wrong; the Challenger doesn't flinch from engaging it. Together, you'd go places others avoid—seeing and struggling with the hardest realities.

Your combination creates unusual courage: finding the problem and fighting it.`,
    whatWouldBeMissing: `Ease. Enjoyment. Both of you are oriented toward what's difficult—finding it, facing it. You might exhaust yourselves and everyone around you with relentless engagement with problems.

You might struggle to appreciate or celebrate anything.`,
    questionYoureAnswering: `What happens when we face the hardest truths directly?`
  },

  // Witness × Transcendent
  "conscience_unbound": {
    whatYoudBuild: `This is a productive tension. The Witness watches for hidden costs; the Transcendent reaches beyond. Together, you'd either check each other's tendencies or frustrate each other completely.

At best, transcendence that's accountable. At worst, constant opposition.`,
    whatWouldBeStrong: `If you find your rhythm, the Witness keeps the Transcendent grounded in real costs, and the Transcendent shows the Witness that there's more than watching.

Together, you might create expansion that doesn't leave harm behind.`,
    whatWouldBeMissing: `Easy collaboration. The Witness suspects; the Transcendent reaches. You'll spend energy negotiating these different orientations.

One of you may need to significantly yield for partnership to work.`,
    questionYoureAnswering: `Can we reach beyond while still watching the costs?`
  },

  // Witness × Feeler
  "alive_conscience": {
    whatYoudBuild: `This is a productive tension. The Witness asks if experience should be trusted; the Feeler opens to all experience. Together, you'd either moderate each other or frustrate each other completely.

At best, feeling that's wise. At worst, constant opposition.`,
    whatWouldBeStrong: `If you find your rhythm, the Witness keeps the Feeler from consuming dangerous experiences, and the Feeler helps the Witness actually live instead of just watching.

Together, you might create rich experience with built-in discernment.`,
    whatWouldBeMissing: `Easy agreement. The Witness suspects; the Feeler opens. You'll spend energy negotiating when to open and when to close.

Your different orientations toward experience may create constant friction.`,
    questionYoureAnswering: `Can we feel everything while still watching for harm?`
  },

  // Witness × Mender
  "conscience_mender": {
    whatYoudBuild: `Repair with accountability. The Witness sees what's broken (including what broke it); the Mender fixes. Together, you'd create approaches to healing that include honest accounting of what caused the harm.

You'd build repair that names the wound.`,
    whatWouldBeStrong: `The Witness provides honest diagnosis; the Mender provides care. Together, you'd avoid both blind fixing and cynical watching. Things would get repaired AND understood.

Your combination creates thorough healing: named, addressed, mended.`,
    whatWouldBeMissing: `Mercy. The Witness sees fault; the Mender works to fix. But some things need forgiveness more than fixing, acceptance more than analysis. You might struggle with wounds that can't be honestly assigned.

You might pursue accountability when letting go would serve better.`,
    questionYoureAnswering: `Can we repair while telling the truth about what broke?`
  },

  // Witness × Truth-Teller
  "cleareyed_conscience": {
    whatYoudBuild: `Complete honesty. The Witness sees what's hidden; the Truth-Teller says what's real. Together, you'd create spaces where nothing is concealed—everything seen, everything said.

You'd build environments of total transparency.`,
    whatWouldBeStrong: `Nothing would survive your combined scrutiny. You'd see it AND say it. Together, you'd create accountability that's impossible to escape.

Your combination produces trustworthy spaces: nowhere to hide, no tolerance for lies.`,
    whatWouldBeMissing: `Warmth. Safety. Mercy. Both of you prioritize truth over comfort. Some people need kindness more than clarity. Your relentless honesty might drive away those who aren't ready for it.

You might create spaces that only the strong can inhabit.`,
    questionYoureAnswering: `What survives complete honesty?`
  },

  // Witness × Liminal
  "between_conscience": {
    whatYoudBuild: `Watching the in-between. The Witness sees what's hidden; the Liminal inhabits transition. Together, you'd see what happens in the cracks—the places people pass through without examining.

You'd build attention to liminal spaces others ignore.`,
    whatWouldBeStrong: `The Witness provides scrutiny; the Liminal provides access to overlooked spaces. Together, you'd see what nobody else notices—the transitions, the in-betweens, the margins.

Your combination creates unusual sight: watching where nobody watches.`,
    whatWouldBeMissing: `Resolution. The Witness watches; the Liminal waits. Neither moves toward definite conclusions or actions. You might see everything in the in-between and do nothing with what you see.

You might become specialists in uncertainty without ever arriving anywhere.`,
    questionYoureAnswering: `What's hidden in the spaces between?`
  },

  // ============================================
  // KEEPER (embers) PAIRINGS
  // (already done: questioner, builder, abundant, architect, present, rooted, witness)
  // ============================================

  // Keeper × Keeper
  "embers_embers": {
    whatYoudBuild: `Memory together. You'd both guard what came before, both insist on continuity. Together, you'd create archives, traditions, practices that carry the past forward with unusual fidelity.

Nothing would be forgotten on your watch.`,
    whatWouldBeStrong: `You'd understand each other's devotion to memory. Neither would pressure the other to "move on" or "get over it." Together, you'd preserve what deserves preserving with complete dedication.

Your combination creates durability of memory: reinforced continuity.`,
    whatWouldBeMissing: `The future. Both of you are oriented backward. Innovation, creation, becoming something new—these wouldn't come naturally. You might perfect memory while missing what needs to be invented.

You might become curators of a world that no longer exists.`,
    questionYoureAnswering: `What must never be forgotten?`
  },

  // Keeper × Challenger
  "embers_friction": {
    whatYoudBuild: `This is a productive tension. The Keeper preserves; the Challenger disrupts. Together, you'd either find the balance between memory and change or frustrate each other completely.

At best, tradition that grows. At worst, constant conflict.`,
    whatWouldBeStrong: `If you find your rhythm, the Keeper ensures the Challenger doesn't destroy what deserves to live, and the Challenger ensures the Keeper doesn't preserve what deserves to die.

Together, you might create selective continuity: keeping what matters, changing what must.`,
    whatWouldBeMissing: `Easy agreement. The Keeper protects; the Challenger pushes. You'll spend energy negotiating what to keep and what to challenge.

Your different orientations toward the past may create constant friction.`,
    questionYoureAnswering: `What deserves to survive the disruption?`
  },

  // Keeper × Transcendent
  "embers_unbound": {
    whatYoudBuild: `This is a fundamental tension. The Keeper guards what was; the Transcendent reaches beyond what is. What you create depends on whether you can integrate memory with transcendence.

At best, transcendence that remembers where it came from. At worst, opposition.`,
    whatWouldBeStrong: `If you find your rhythm, the Keeper reminds the Transcendent what's worth carrying forward, and the Transcendent shows the Keeper that there's more than the past.

Together, you might create expansion that doesn't forget its origins.`,
    whatWouldBeMissing: `Common ground. The Keeper looks back; the Transcendent looks beyond. You may struggle to find shared territory.

You might admire each other from distance without finding much to do together.`,
    questionYoureAnswering: `What do we carry with us when we transcend?`
  },

  // Keeper × Feeler
  "alive_embers": {
    whatYoudBuild: `Memory that's felt. The Keeper guards what was; the Feeler experiences fully. Together, you'd create ways of remembering that are alive—not archived but embodied, not recorded but felt.

You'd build living memory through sensation.`,
    whatWouldBeStrong: `The Keeper brings the past forward; the Feeler ensures it's felt, not just known. Together, you'd avoid both dead archives and amnesia. Memory would be alive because it's experienced.

Your combination creates unusual connection to history: remembered in the body.`,
    whatWouldBeMissing: `The genuinely new. Both of you are oriented toward receiving rather than creating. The Keeper receives the past; the Feeler receives sensation. Genuine innovation might not happen.

You might create rich experience of what was without making what could be.`,
    questionYoureAnswering: `How do we remember with our whole selves?`
  },

  // Keeper × Mender
  "embers_mender": {
    whatYoudBuild: `Repair of what was. The Keeper guards what mattered; the Mender fixes what's broken. Together, you'd restore things—not just fix them but return them to what they were meant to be.

You'd build restoration rather than innovation.`,
    whatWouldBeStrong: `The Keeper knows what things should be; the Mender knows how to return them there. Together, you'd avoid both abandoning the old and blindly fixing toward the new.

Your combination creates thoughtful restoration: repair guided by memory.`,
    whatWouldBeMissing: `Creation of the new. Both of you are oriented toward what already exists. The Keeper preserves it; the Mender repairs it. Genuine innovation—making something that never was—might not happen.

You might perfect restoration while missing what needs to be invented.`,
    questionYoureAnswering: `Can we repair things to what they were meant to be?`
  },

  // Keeper × Truth-Teller
  "cleareyed_embers": {
    whatYoudBuild: `Honest memory. The Keeper guards what was; the Truth-Teller insists on what's real. Together, you'd create records of the past that are both preserved and honest—memory without nostalgia.

You'd build truth about history.`,
    whatWouldBeStrong: `The Keeper ensures memory; the Truth-Teller ensures accuracy. Together, you'd avoid both forgetting and romanticizing. What you remember would be real.

Your combination creates reliable history: what actually happened, kept alive.`,
    whatWouldBeMissing: `Gentleness with the past. Both of you prioritize truth—preserved truth, spoken truth. But some memories need kindness more than accuracy. You might struggle with histories that need healing more than recording.

You might pursue honest memory when compassionate interpretation would serve better.`,
    questionYoureAnswering: `What's the truth about what we've been through?`
  },

  // Keeper × Liminal
  "between_embers": {
    whatYoudBuild: `Memory of transitions. The Keeper guards what was; the Liminal inhabits the in-between. Together, you'd create records of what's being passed through—memory of thresholds, not just destinations.

You'd build attention to transformative moments others forget.`,
    whatWouldBeStrong: `The Keeper brings memory; the Liminal brings access to transitions. Together, you'd remember what others forget: the becoming, not just the becoming-what.

Your combination creates unusual history: how things change, not just what they change to.`,
    whatWouldBeMissing: `Arrival. The Keeper looks back; the Liminal stays between. Neither moves toward definite conclusions. You might remember every transition without ever completing one.

You might become archivists of uncertainty.`,
    questionYoureAnswering: `What do we remember about how we changed?`
  },

  // ============================================
  // CHALLENGER (friction) PAIRINGS
  // (already done: questioner, builder, abundant, architect, present, rooted, witness, keeper)
  // ============================================

  // Challenger × Challenger
  "friction_friction": {
    whatYoudBuild: `Difficulty squared. You'd both seek friction, both crave resistance. Together, you'd push harder than anyone thought possible—challenging yourselves and each other relentlessly.

You'd build (or become) something forged through extreme pressure.`,
    whatWouldBeStrong: `Neither would tell the other to slow down or take it easy. You'd match each other's intensity. Together, you'd accomplish things that require unusual endurance and willingness to struggle.

Your combination creates achievements born of difficulty embraced.`,
    whatWouldBeMissing: `Rest. Ease. Gentleness. Both of you seek friction; neither naturally softens. You might burn through yourselves and everyone near you. Even your love would be a demanding one.

You might need external forces to ever rest.`,
    questionYoureAnswering: `How much can we endure together?`
  },

  // Challenger × Transcendent
  "friction_unbound": {
    whatYoudBuild: `Transcendence through difficulty. The Challenger seeks friction; the Transcendent reaches beyond. Together, you'd push past limits not around them—growing through resistance rather than avoiding it.

You'd build paths to transcendence that go through difficulty, not around it.`,
    whatWouldBeStrong: `The Challenger provides intensity; the Transcendent provides direction beyond. Together, you'd pursue growth that doesn't avoid hard parts. Your expansion would be earned.

Your combination creates unusual achievement: reaching beyond through going through.`,
    whatWouldBeMissing: `The ordinary. Both of you are oriented toward intensity—friction or transcendence. Regular life, simple pleasures, quiet contentment—these might feel like failure.

You might exhaust yourselves pursuing extraordinary when ordinary would serve.`,
    questionYoureAnswering: `Can we transcend by going through instead of around?`
  },

  // Challenger × Feeler
  "alive_friction": {
    whatYoudBuild: `Intense experience. The Challenger seeks difficulty; the Feeler wants to feel everything. Together, you'd create lives of high intensity—feeling deeply, struggling fully.

You'd build (or simply live) at the edges of experience.`,
    whatWouldBeStrong: `Neither of you avoids intensity. The Challenger seeks it in struggle; the Feeler seeks it in sensation. Together, you'd never go numb.

Your combination creates lives of unusual vividness: difficult and deeply felt.`,
    whatWouldBeMissing: `Peace. Both of you orient toward more, harder, deeper. Neither naturally rests in quiet contentment. You might live vividly while never knowing simple peace.

Your intensity might exhaust everyone around you, including eventually yourselves.`,
    questionYoureAnswering: `What does it feel like to struggle fully?`
  },

  // Challenger × Mender
  "friction_mender": {
    whatYoudBuild: `This is a productive tension. The Challenger breaks; the Mender repairs. What you create depends on whether you can integrate destruction and restoration.

At best, growth through rupture—breaking what needs breaking, healing what can be healed. At worst, endless conflict.`,
    whatWouldBeStrong: `If you find your rhythm, the Challenger creates productive breakdowns, and the Mender ensures they become opportunities for stronger repair.

Together, you might create antifragility: stronger because of what you've broken and healed.`,
    whatWouldBeMissing: `Easy compatibility. The Challenger disrupts; the Mender maintains. You'll spend energy negotiating when to break and when to repair.

Your different orientations might create constant friction (which the Challenger might actually enjoy).`,
    questionYoureAnswering: `What gets stronger when it breaks and heals?`
  },

  // Challenger × Truth-Teller
  "cleareyed_friction": {
    whatYoudBuild: `Hard truth. The Challenger seeks difficulty; the Truth-Teller says what's real. Together, you'd face and speak the hardest realities—no avoidance, no softening.

You'd build a practice of unflinching honesty.`,
    whatWouldBeStrong: `The Challenger doesn't avoid hard things; the Truth-Teller doesn't avoid hard truths. Together, you'd go where others can't—seeing clearly and struggling fully.

Your combination creates unusual courage: facing and naming what's difficult.`,
    whatWouldBeMissing: `Mercy. Softness. Both of you prioritize hardness—of experience, of truth. Some situations need gentleness more than courage. You might push when holding would serve better.

Your relentless difficulty might be cruel to those who need kindness.`,
    questionYoureAnswering: `What truth can only be found through struggle?`
  },

  // Challenger × Liminal
  "between_friction": {
    whatYoudBuild: `This is a fundamental tension. The Challenger wants commitment to difficulty; the Liminal resists commitment. What you create depends on whether you can integrate pressure with uncertainty.

At best, the Challenger learns that waiting is hard too. At worst, mutual frustration.`,
    whatWouldBeStrong: `If you find your rhythm, the Challenger might help the Liminal commit to something (even something hard), and the Liminal might show the Challenger that not-knowing is its own difficulty.

Together, you might discover that uncertainty is a struggle worth respecting.`,
    whatWouldBeMissing: `Obvious common ground. The Challenger wants friction; the Liminal wants space. You'll spend energy negotiating these different needs.

The Challenger may exhaust the Liminal; the Liminal may frustrate the Challenger.`,
    questionYoureAnswering: `Can uncertainty be its own form of difficulty?`
  },

  // ============================================
  // TRANSCENDENT (unbound) PAIRINGS
  // (already done: questioner, builder, abundant, architect, present, rooted, witness, keeper, challenger)
  // ============================================

  // Transcendent × Transcendent
  "unbound_unbound": {
    whatYoudBuild: `The beyond beyond. You'd both reach past limits, both refuse conventional boundaries. Together, you'd push further into the unknown than anyone alone could go.

You'd build (or become) something genuinely unprecedented.`,
    whatWouldBeStrong: `Neither would pull the other back. You'd understand each other's reaching, validate each other's visions. Together, you'd achieve genuine transcendence of ordinary limitations.

Your combination creates possibility at the furthest edges.`,
    whatWouldBeMissing: `The ground. Both of you leave behind; neither naturally stays. You might transcend together into spaces nobody else can reach or use. Your achievements might be invisible to those you've left behind.

You might need someone to anchor you to the world you came from.`,
    questionYoureAnswering: `What exists beyond all the boundaries we know?`
  },

  // Transcendent × Feeler
  "alive_unbound": {
    whatYoudBuild: `Experience beyond limits. The Transcendent reaches beyond; the Feeler opens to everything. Together, you'd pursue sensation and experience at the furthest edges—feeling what lies past ordinary human capacity.

You'd build (or simply experience) states most people can't conceive.`,
    whatWouldBeStrong: `Neither limits the other. The Transcendent expands what's possible; the Feeler receives whatever becomes possible. Together, you'd experience more than most humans ever do.

Your combination creates unusual access to altered states, edge experiences, beyond-ordinary sensation.`,
    whatWouldBeMissing: `The ordinary. Both of you orient toward the extraordinary. Simple pleasures, everyday contentment, regular life—these might feel like failure.

You might pursue transcendent experience while missing ordinary presence.`,
    questionYoureAnswering: `What can we feel beyond the edges of ordinary experience?`
  },

  // Transcendent × Mender
  "mender_unbound": {
    whatYoudBuild: `This is a productive tension. The Transcendent reaches beyond; the Mender works with what is. What you create depends on whether you can integrate expansion with repair.

At best, healing that includes transcendence—mending that doesn't just restore but elevates. At worst, disconnection.`,
    whatWouldBeStrong: `If you find your rhythm, the Transcendent shows the Mender that fixing can include transformation, and the Mender grounds the Transcendent in care for what exists.

Together, you might create healing that's also evolution.`,
    whatWouldBeMissing: `Common focus. The Transcendent looks beyond; the Mender looks here. You'll spend energy finding shared territory.

The Transcendent may feel limited by the Mender's focus; the Mender may feel abandoned by the Transcendent's reach.`,
    questionYoureAnswering: `Can healing include transcendence?`
  },

  // Transcendent × Truth-Teller
  "cleareyed_unbound": {
    whatYoudBuild: `Clear-eyed transcendence. The Transcendent reaches beyond; the Truth-Teller insists on what's real. Together, you'd pursue expansion without self-deception—seeing clearly even as you reach past limits.

You'd build honest visionary practice.`,
    whatWouldBeStrong: `The Transcendent provides vision; the Truth-Teller provides clarity. Together, you'd avoid both grounded cynicism and ungrounded fantasy. Your reaching would be honest.

Your combination creates unusual integrity: visionary but not deluded.`,
    whatWouldBeMissing: `Comfort with mystery. The Truth-Teller wants clarity; transcendence often dissolves clarity. You might struggle when the beyond resists being honestly named.

You might limit transcendence to what can be clearly described.`,
    questionYoureAnswering: `Can we transcend without deceiving ourselves?`
  },

  // Transcendent × Liminal
  "between_unbound": {
    whatYoudBuild: `The transcendence of not-knowing. The Transcendent reaches beyond; the Liminal inhabits uncertainty. Together, you'd create comfort with radical unknowing—not just transcending limits but transcending the need for resolution.

You'd build presence in boundless uncertainty.`,
    whatWouldBeStrong: `Both of you are comfortable with what can't be pinned down. The Transcendent exceeds categories; the Liminal sits between them. Together, you'd model unusual tolerance for groundlessness.

Your combination creates capacity for genuine mystery.`,
    whatWouldBeMissing: `Something to hold onto. Both of you release: the Transcendent releases limits; the Liminal releases certainty. You might transcend together into spaces that can't support others who need more ground.

You might need each other to have anyone who understands.`,
    questionYoureAnswering: `What lies beyond the need to know?`
  },

  // ============================================
  // FEELER (alive) PAIRINGS
  // (already done: questioner, builder, abundant, architect, present, rooted, witness, keeper, challenger, transcendent)
  // ============================================

  // Feeler × Feeler
  "alive_alive": {
    whatYoudBuild: `Everything felt, together. You'd both open completely, both want to experience everything. Together, you'd create lives of maximum sensation—nothing filtered, nothing avoided.

You'd build (or simply live) intensity doubled.`,
    whatWouldBeStrong: `Neither would ask the other to calm down or close off. You'd validate each other's hunger for experience. Together, you'd feel more than seems possible.

Your combination creates unusual richness: two open channels receiving everything.`,
    whatWouldBeMissing: `Discernment. Both of you open; neither naturally filters. You might overwhelm yourselves with sensation, unable to distinguish what matters from what's merely intense.

You might need external forces to ever close or rest.`,
    questionYoureAnswering: `What happens when nothing is filtered out?`
  },

  // Feeler × Mender
  "alive_mender": {
    whatYoudBuild: `Healing through feeling. The Feeler opens to everything; the Mender works to repair. Together, you'd create therapeutic spaces where healing happens through fully feeling what's wounded.

You'd build emotional repair through sensation.`,
    whatWouldBeStrong: `The Feeler provides access to what hurts; the Mender provides care for it. Together, you'd avoid both numb fixing and unfocused feeling. Wounds would be felt AND tended.

Your combination creates deep healing: fully experienced and carefully mended.`,
    whatWouldBeMissing: `Distance. Both of you engage closely—the Feeler with sensation, the Mender with repair. When something needs to be left alone, neither naturally steps back.

You might over-engage with wounds that need space, not attention.`,
    questionYoureAnswering: `Can we heal by fully feeling what's hurt?`
  },

  // Feeler × Truth-Teller
  "alive_cleareyed": {
    whatYoudBuild: `This is a productive tension. The Feeler opens to everything; the Truth-Teller insists on clarity. What you create depends on whether you can integrate feeling with clear-eyed honesty.

At best, feeling that's wise—sensation with discernment. At worst, constant opposition.`,
    whatWouldBeStrong: `If you find your rhythm, the Truth-Teller helps the Feeler distinguish meaningful sensation from noise, and the Feeler helps the Truth-Teller actually experience what they see so clearly.

Together, you might create rich experience that's also honest.`,
    whatWouldBeMissing: `Easy agreement. The Feeler opens; the Truth-Teller clarifies (which can close). You'll spend energy negotiating when to feel and when to analyze.

Your different orientations might create constant friction.`,
    questionYoureAnswering: `Can we feel everything and still see clearly?`
  },

  // Feeler × Liminal
  "alive_between": {
    whatYoudBuild: `Feeling the in-between. The Feeler opens to everything; the Liminal inhabits transitions. Together, you'd create sensitivity to what's changing—fully experiencing the states between states.

You'd build awareness of threshold sensations others miss.`,
    whatWouldBeStrong: `The Feeler provides openness; the Liminal provides access to overlooked territories. Together, you'd feel what others skip past—the transitions, the becomings, the subtle shifts.

Your combination creates unusual sensitivity: feeling what's barely there.`,
    whatWouldBeMissing: `Solidity. Both of you are oriented toward the fluid—sensation, transition. Neither grounds in the definite. You might feel everything while holding nothing.

You might need external forces to ever stabilize.`,
    questionYoureAnswering: `What does it feel like to be in transition?`
  },

  // ============================================
  // MENDER PAIRINGS
  // (already done: questioner, builder, abundant, architect, present, rooted, witness, keeper, challenger, transcendent, feeler)
  // ============================================

  // Mender × Mender
  "mender_mender": {
    whatYoudBuild: `Care doubled. You'd both fix, both tend, both repair. Together, you'd create environments of unusual maintenance—everything attended to, everything functioning.

You'd build a world that works because someone's always mending it.`,
    whatWouldBeStrong: `You'd understand each other's orientation toward repair. Neither would ask why you keep fixing things. Together, you'd maintain what others abandon.

Your combination creates unusual durability: constant care applied everywhere.`,
    whatWouldBeMissing: `Ending. Both of you fix; neither naturally lets things die. You might prolong what should be released, repair what should be replaced.

You might need external forces to ever let go.`,
    questionYoureAnswering: `What can we make last through constant care?`
  },

  // Mender × Truth-Teller
  "cleareyed_mender": {
    whatYoudBuild: `Honest repair. The Mender fixes what's broken; the Truth-Teller sees what's real. Together, you'd create healing that includes honest diagnosis—mending that knows what actually broke and why.

You'd build repair that tells the truth.`,
    whatWouldBeStrong: `The Mender provides care; the Truth-Teller provides clarity. Together, you'd avoid both blind fixing and harsh judgment. Repair would be informed by honest understanding.

Your combination creates thorough healing: truthful and tended.`,
    whatWouldBeMissing: `Letting be. Both of you engage—the Mender to fix, the Truth-Teller to clarify. When something needs to be left alone, neither naturally steps back.

You might diagnose and repair when acceptance would serve better.`,
    questionYoureAnswering: `Can we repair with complete honesty about what broke?`
  },

  // Mender × Liminal
  "between_mender": {
    whatYoudBuild: `Care for transitions. The Mender fixes what's broken; the Liminal inhabits the in-between. Together, you'd create support for people in passage—tending the wounds that happen in transformation.

You'd build care for what's becoming, not just what is.`,
    whatWouldBeStrong: `The Mender provides care; the Liminal provides access to transitional states. Together, you'd tend what others overlook—the breakages that happen in changing.

Your combination creates unusual support: mending for those in flux.`,
    whatWouldBeMissing: `Direction. The Mender maintains; the Liminal waits. Neither naturally moves forward. You might care for transition indefinitely without ever completing it.

You might perfect support for passage while never arriving anywhere.`,
    questionYoureAnswering: `How do we care for what's still becoming?`
  },

  // ============================================
  // TRUTH-TELLER (cleareyed) PAIRINGS
  // (already done: questioner, builder, abundant, architect, present, rooted, witness, keeper, challenger, transcendent, feeler, mender)
  // ============================================

  // Truth-Teller × Truth-Teller
  "cleareyed_cleareyed": {
    whatYoudBuild: `Complete clarity. You'd both see clearly, both speak truly. Together, you'd create environments where nothing is hidden or softened—total honesty in both directions.

You'd build spaces where reality is faced completely.`,
    whatWouldBeStrong: `Neither would ask the other to soften or hide. You'd validate each other's commitment to truth. Together, you'd create unusual clarity.

Your combination produces spaces of complete honesty: nowhere to hide, no tolerance for lies.`,
    whatWouldBeMissing: `Mercy. Softness. Both of you prioritize truth over comfort. Some people, including maybe you, need kindness more than clarity sometimes. Your relentless honesty might become exhausting or even cruel.

You might need others to model gentleness.`,
    questionYoureAnswering: `What survives when everything is seen and said?`
  },

  // Truth-Teller × Liminal
  "between_cleareyed": {
    whatYoudBuild: `Truth about uncertainty. The Truth-Teller says what's real; the Liminal inhabits not-knowing. Together, you'd create honesty about what isn't clear—speaking truly about uncertainty itself.

You'd build truthful relationship with what can't be pinned down.`,
    whatWouldBeStrong: `The Truth-Teller provides honesty; the Liminal provides comfort with uncertainty. Together, you'd avoid both false certainty and vague mysticism. You'd say what's true about what isn't known.

Your combination creates unusual integrity: honest about the limits of honesty.`,
    whatWouldBeMissing: `Definite conclusions. The Truth-Teller sees clearly; the Liminal stays uncertain. Together, you might circle endlessly—seeing clearly that nothing is clear, speaking truly about not-knowing.

You might perfect honest uncertainty without ever arriving at truth.`,
    questionYoureAnswering: `What's the truth about what we don't know?`
  },

  // ============================================
  // LIMINAL (between) PAIRINGS
  // (already done: questioner, builder, abundant, architect, present, rooted, witness, keeper, challenger, transcendent, feeler, mender, truth-teller)
  // ============================================

  // Liminal × Liminal
  "between_between": {
    whatYoudBuild: `Shared uncertainty. You'd both wait, both stay in the between. Together, you'd create unusual comfort with not-knowing—neither pressuring the other to resolve or become.

You'd build a home in transition.`,
    whatWouldBeStrong: `Neither would push the other to decide, commit, or become something definite. You'd understand each other's timing. Together, you'd model patience with uncertainty that most people can't sustain.

Your combination creates rare acceptance: being with not-knowing together.`,
    whatWouldBeMissing: `Movement. Both of you wait; neither naturally progresses. You might perfect the in-between while never arriving anywhere. Without external force, you might stay uncertain forever.

You might need others to help you move.`,
    questionYoureAnswering: `What exists in permanent uncertainty?`
  },

};

// Helper function to get content for any archetype pair
export function getSharedUtopia(archetypeA: string, archetypeB: string): SharedUtopiaContent | null {
  // Sort alphabetically to get consistent key
  const sorted = [archetypeA, archetypeB].sort();
  const key = `${sorted[0]}_${sorted[1]}`;
  return sharedUtopiaContent[key] || null;
}
