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

  // Deep × Deep
  "swimmer_swimmer": {
    whatYoudBuild: `A life spent in the depths. Nothing would be resolved quickly. Everything would be examined, questioned, turned over, held up to light from angles no one else would think to try.

You'd build understanding. Not products, not institutions—understanding. Whether that becomes a research practice, a philosophical framework, or just very long conversations over dinner, the core is the same: you'd go deeper than almost anyone.`,
    whatWouldBeStrong: `Depth. Patience. Genuine intellectual partnership. You'd never have to apologize for taking something too seriously.

The other Deep actually wants to keep going. That's rare.`,
    whatWouldBeMissing: `Action. Momentum. Someone needs to eventually say "we understand enough—now we do something." Neither of you is wired for that moment. You could understand a problem beautifully and completely and never lift a finger to solve it.

You might also miss joy. The unexamined moment might be worth having.`,
    questionYoureAnswering: `How deep can understanding go?`
  },

  // Deep × Builder (shaper)
  "shaper_swimmer": {
    whatYoudBuild: `The thing that actually matters AND actually exists. This is one of the best pairings for making something real.

The Builder makes sure it ships. The Deep makes sure it's worth shipping. Together: things that are both real and right.`,
    whatWouldBeStrong: `You'd avoid the two most common failures: endless deliberation that never becomes anything, and rushed action that misses the point.

The Builder will get impatient. The Deep will slow things down at inconvenient moments. You'll have the same argument repeatedly: "We need to ship this" versus "We need to understand this first." That argument is the point. Neither of you wins—you both sharpen.`,
    whatWouldBeMissing: `Patience for maintenance. Neither of you is naturally oriented toward just keeping things running. You might build something good, move on, and let it decay.

You might also dismiss anyone who isn't building or questioning. The maintainers, the administrators, the people who just want to enjoy what exists—they could feel invisible to you.`,
    questionYoureAnswering: `Can something be both urgent and considered?`
  },

  // Deep × Abundant (citizen)
  "citizen_swimmer": {
    whatYoudBuild: `Optimism that can defend itself. The Abundant genuinely believes good things are possible. The Deep tests whether that belief holds up.

Together: hope that's been through the fire. Vision that survives examination.`,
    whatWouldBeStrong: `The Abundant brings energy and possibility. The Deep brings rigor. This combination makes things that last because they're built on genuine insight, not wishful thinking.

The Deep will ask hard questions. The Abundant won't take it as attack—they'll see it as care. That's a good dynamic.`,
    whatWouldBeMissing: `Urgency about specific injustices. You're both somewhat abstract—one thinks about big possibilities, the other thinks about deep questions. When something is wrong right now and someone needs to do something about it right now, neither of you naturally moves.

You might also miss the small and local. Both of you default to broad scope.`,
    questionYoureAnswering: `Can optimism survive examination?`
  },

  // Deep × Architect
  "architect_swimmer": {
    whatYoudBuild: `Systems that actually serve what they claim to serve. The Architect thinks in structures. The Deep asks whether those structures are built on truth.

This is a good pairing for building institutions, organizations, or frameworks that work because they understand people, not just efficiency.`,
    whatWouldBeStrong: `The Architect brings structural thinking. The Deep brings depth. Together: systems that last because they're based on genuine understanding of how things actually work—not models, not assumptions, actual understanding.

You'd catch the places where elegant design hides shallow thinking.`,
    whatWouldBeMissing: `Speed. You'll keep refining and questioning when you should ship. You'll design the perfect system and delay implementing it because one more question arose.

You might also miss that people have bodies and feelings. Both of you live in abstractions—systems, questions—and sometimes what's needed is just warmth.`,
    questionYoureAnswering: `Can a system emerge from actual understanding?`
  },

  // Deep × Present (presence)
  "presence_swimmer": {
    whatYoudBuild: `Depth and warmth in the same room. The Deep goes deep. The Present stays close. Together: spaces where people can think hard AND feel held.

Therapeutic practices, certain kinds of teaching, the best kind of friendship.`,
    whatWouldBeStrong: `The Deep brings substance. The Present brings attention. Together, you avoid both cold intellectualism and comfortable avoidance.

You'd create rare spaces: places where people can ask the hardest questions while still feeling connected.`,
    whatWouldBeMissing: `Drive. Neither of you is oriented toward building or achieving. You might go deep together and make nothing anyone else can see or use.

You might also enable each other's avoidance. Presence can be an escape from decision; questioning can be an escape from commitment.`,
    questionYoureAnswering: `Can understanding and connection happen together?`
  },

  // Deep × Rooted
  "rooted_swimmer": {
    whatYoudBuild: `Inquiry that knows when to stop. The Deep digs. The Rooted says "enough."

This is a good pairing. The Deep can spiral into endless examination; the Rooted provides a floor. The Rooted can become static; the Deep keeps them alive.`,
    whatWouldBeStrong: `You'd both resist the culture's demand for shallow answers and constant motion. The Rooted's stillness gives the Deep's depth a container. The Deep's aliveness keeps the Rooted from calcifying.

Together: thoughtful without being frantic, serious without being anxious.`,
    whatWouldBeMissing: `Urgency. When the world is burning, neither of you naturally runs toward the fire. The Deep wants to understand the fire. The Rooted stays where they are.

You might build a beautiful, deep life together and completely miss something that needed you.`,
    questionYoureAnswering: `Can you stay still and still seek?`
  },

  // Deep × Guardian (conscience)
  "conscience_swimmer": {
    whatYoudBuild: `Truth all the way down. The Guardian spots what's hidden. The Deep asks why it's hidden.

Together: you'd see more than almost anyone. Investigative practices, accountability systems, the kind of friendship where nothing stays buried.`,
    whatWouldBeStrong: `You're nearly impossible to fool. The Guardian catches what's being concealed; the Deep won't accept the first explanation. Together, you'd actually understand what's happening, not just the story being told.

Your combination has rare integrity. You don't look away AND you don't stop asking.`,
    whatWouldBeMissing: `Trust. Joy. The willingness to appreciate without examining. You're both oriented toward finding what's wrong. The thing that's simply good might not survive your gaze.

You could exhaust each other and everyone around you. Sometimes people just want to enjoy something.`,
    questionYoureAnswering: `What's hidden underneath what's hidden?`
  },

  // Deep × Keeper (embers)
  "embers_swimmer": {
    whatYoudBuild: `Understanding of where we came from and whether it was right. The Keeper holds what mattered. The Deep asks whether it should still matter.

Archives, educational practices, thoughtful tradition-keeping—anything that honors the past while subjecting it to real examination.`,
    whatWouldBeStrong: `You'd avoid both blind reverence and careless destruction. The Deep prevents the Keeper from worshipping what shouldn't be worshipped. The Keeper prevents the Deep from reinventing every wheel.

Together, you'd know which wisdom to carry forward and which to leave behind.`,
    whatWouldBeMissing: `The genuinely new. Both of you are oriented backward—one to preserve, one to examine. Novel possibilities that don't fit existing frames might pass you by.

You might become conservative in the deep sense: so focused on understanding what was that you miss what could be.`,
    questionYoureAnswering: `What from the past deserves to survive?`
  },

  // Deep × Challenger (friction)
  "friction_swimmer": {
    whatYoudBuild: `Understanding forged under pressure. The Challenger craves difficulty. The Deep craves depth. Together: you'd go places most people avoid because they're hard AND confusing.

Training, certain kinds of research, relationships that grow through hard conversations.`,
    whatWouldBeStrong: `Neither of you flinches. The Challenger seeks resistance; the Deep seeks truth. You'd question everything AND test everything. Nothing would be accepted that hasn't been examined and stress-tested.

This pairing has unusual rigor. You'd actually know what you know.`,
    whatWouldBeMissing: `Rest. Acceptance. The willingness to let things be good enough. You're both oriented toward pushing—one toward difficulty, one toward depth. The simple appreciation of what's working might elude you.

You might exhaust each other. Always another question, always another challenge.`,
    questionYoureAnswering: `What truths only emerge under pressure?`
  },

  // Deep × Transcendent (unbound)
  "swimmer_unbound": {
    whatYoudBuild: `Questions that reach beyond the edges of what we know. The Deep goes deep. The Transcendent goes beyond. Together: inquiry into the biggest possible things—consciousness, existence, what minds like ours could become.

This pairing is visionary in the real sense. Not just imagining—understanding why the imagination matters.`,
    whatWouldBeStrong: `Neither of you is limited by common sense. The Deep asks what others don't think to ask; the Transcendent imagines what others can't conceive. Together, you'd see further than almost anyone.

You'd build frameworks or practices that expand what it's possible to think.`,
    whatWouldBeMissing: `The ground. Both of you are reaching upward and outward—one into questions, one into transcendence. Ordinary life, embodied concerns, the people who aren't on this journey—they might feel far away.

You might build cathedrals of thought no one else can enter.`,
    questionYoureAnswering: `What lies beyond what we can currently think?`
  },

  // Deep × Alive (alive)
  "alive_swimmer": {
    whatYoudBuild: `Experience that's both felt and understood. The Alive opens to everything. The Deep examines what's opened.

Lives, practices, art where sensation and meaning interweave—where feeling deeply and understanding deeply aren't in tension.`,
    whatWouldBeStrong: `You'd avoid both intellectualism divorced from life and experience divorced from meaning. The Alive keeps the Deep embodied. The Deep gives the Alive's experiences integration.

Together, you'd actually digest what life offers rather than consuming or analyzing without absorbing.`,
    whatWouldBeMissing: `Closure. Decision. Both of you receive rather than act. The Alive receives sensation; the Deep receives complexity. Neither naturally moves toward resolution or building.

You might become very rich internally while creating nothing others can see.`,
    questionYoureAnswering: `Can you feel everything and understand it too?`
  },

  // Deep × Mender
  "mender_swimmer": {
    whatYoudBuild: `Repair that understands what actually broke. The Mender fixes. The Deep asks why it broke.

Therapeutic practices, restorative systems, approaches to healing that don't just patch but address roots.`,
    whatWouldBeStrong: `You'd avoid both mindless fixing and endless analyzing. The Mender acts; the Deep understands first. Things get fixed AND they get fixed right.

Your combination is effective and thoughtful. Repairs that stick.`,
    whatWouldBeMissing: `The courage to let things die. Sometimes things should end, not be repaired. Both of you are oriented toward continuation—fixing and understanding what is—rather than accepting necessary endings.

You might prolong what should be released.`,
    questionYoureAnswering: `What actually broke, and what does it need?`
  },

  // Deep × Truth-Teller (cleareyed)
  "cleareyed_swimmer": {
    whatYoudBuild: `Clarity that goes to the roots. The Truth-Teller says what's real. The Deep asks what's really real.

Journalism, philosophy, therapy—anything that requires both honesty and depth. You'd cut through comfortable lies AND shallow truths.`,
    whatWouldBeStrong: `You'd actually get to the bottom of things. The Truth-Teller says the hard thing; the Deep asks the hard question. Neither accepts convenience over truth.

Your combination has rare integrity: unflinching AND thorough.`,
    whatWouldBeMissing: `Mercy. Tenderness. The willingness to hold space for things that don't make sense. You're both oriented toward truth at all costs. Feelings that aren't rational, needs that aren't logical—you might steamroll them.

Your honesty could become unkind.`,
    questionYoureAnswering: `What's true underneath the obvious truth?`
  },

  // Deep × Liminal (between)
  "between_swimmer": {
    whatYoudBuild: `Inquiry that doesn't rush to resolve. The Deep explores. The Liminal waits in uncertainty. Together: understanding that can sit with not-knowing for as long as it takes.

Research, contemplative practices, the kind of friendship that can hold confusion for years.`,
    whatWouldBeStrong: `Neither of you needs quick answers. The Deep's exploration finds a companion who won't demand conclusions. The Liminal's uncertainty finds someone who sees it as interesting, not wrong.

You'd build patience for complexity that most people can't tolerate.`,
    whatWouldBeMissing: `Arrival. Ever. Both of you are comfortable staying in process. The Deep always has another question; the Liminal hasn't yet resolved. You might never actually land anywhere.

Beautiful inquiry that produces nothing.`,
    questionYoureAnswering: `How long can we not-know together?`
  },

  // ============================================
  // BUILDER (shaper) PAIRINGS
  // (already done: Deep)
  // ============================================

  // Builder × Builder
  "shaper_shaper": {
    whatYoudBuild: `A lot. Maybe too much. Two Builders together will create constantly—projects, businesses, systems, interventions. The question isn't whether you'll make things, but whether you'll ever stop.

Startups, rapid prototyping, building campaigns—anything that rewards momentum.`,
    whatWouldBeStrong: `Pure momentum. Neither of you slows down. The thing that kills most projects—loss of energy—isn't your problem. You'll push through obstacles by outbuilding them.

When you agree on direction, you'll move faster than almost anyone.`,
    whatWouldBeMissing: `Reflection. Purpose-checking. The pause to ask whether you're building the right thing. You might construct an empire and realize too late it wasn't worth constructing.

You might also exhaust each other through competition rather than collaboration.`,
    questionYoureAnswering: `How much can we build?`
  },

  // Builder × Abundant
  "citizen_shaper": {
    whatYoudBuild: `Things that expand access and possibility. The Builder makes; the Abundant sees abundance everywhere. Together: products, systems, or projects that assume there's enough to share.

Good pairing for social enterprises, cooperative models, generous tech.`,
    whatWouldBeStrong: `The Builder's momentum meets the Abundant's generosity. You'd create things that work AND that include people. Neither of you is oriented toward scarcity—you both assume more is possible.

The Abundant provides vision; the Builder makes it real.`,
    whatWouldBeMissing: `Critical examination. Both of you lean optimistic. The Builder wants to build; the Abundant assumes it'll work out. Hard questions about whether you should, or whether you're missing something, might go unasked.

You might build something big that has a fundamental flaw you both overlooked.`,
    questionYoureAnswering: `Can we build abundance for everyone?`
  },

  // Builder × Architect
  "architect_shaper": {
    whatYoudBuild: `Systems that actually ship. The Builder creates; the Architect designs for the collective. Together: things that are both functional and scaled.

Infrastructure, platforms, institutions—anything that needs to be both made and organized.`,
    whatWouldBeStrong: `The Builder brings speed; the Architect brings structure. You'd create things that are built well AND designed to last. Neither of you accepts "good enough"—the Builder wants it done, the Architect wants it right.

Strong pairing for building things at scale.`,
    whatWouldBeMissing: `The personal. Both of you think in systems. Individual needs, emotional textures, the things that don't scale—you might miss them entirely.

You might build something efficient and comprehensive that no one actually wants to use.`,
    questionYoureAnswering: `Can we build what serves everyone?`
  },

  // Builder × Present
  "presence_shaper": {
    whatYoudBuild: `This is a tension that can be productive. The Builder moves; the Present stays. The question is whether you can integrate momentum with attention.

At best: things created with genuine presence, built mindfully. At worst: constant frustration.`,
    whatWouldBeStrong: `The Present could slow the Builder down enough to build things that matter. The Builder could give the Present's attention something to focus on. You'd create things with both craft and aliveness.

When it works, it works beautifully: creation that's also connection.`,
    whatWouldBeMissing: `Easy compatibility. You want different things. The Builder wants to make; the Present wants to be. You'll spend energy negotiating this difference.

One of you might feel constantly rushed or constantly held back.`,
    questionYoureAnswering: `Can we build and be present at the same time?`
  },

  // Builder × Rooted
  "rooted_shaper": {
    whatYoudBuild: `Things that last. The Builder brings momentum; the Rooted brings staying power. You'd find a version of building that doesn't require constant novelty.

Renovation. Improvement of existing things. Building depth in one place rather than breadth across many. The rare combination of energy and patience.`,
    whatWouldBeStrong: `The Rooted gives the Builder stability. The Builder gives the Rooted aliveness. Together: things with both momentum and roots.

You might build something that actually lasts because someone stayed with it.`,
    whatWouldBeMissing: `Easy agreement. Your instincts pull different directions. The Builder sees stagnation; the Rooted sees unnecessary disruption. You'll negotiate about pace.

You're learning what it means to move together when your natural speeds differ.`,
    questionYoureAnswering: `Can we build without leaving?`
  },

  // Builder × Guardian
  "conscience_shaper": {
    whatYoudBuild: `Things that hold up to scrutiny. The Builder makes; the Guardian watches for what's hidden. Together: products or systems that don't have dirty secrets.

Accountability technology. Transparent organizations. Ethical business.`,
    whatWouldBeStrong: `The Builder brings momentum; the Guardian brings vigilance. You'd build things faster than most AND catch problems earlier than most. The Guardian spots what the Builder might miss in the rush.

You'd create things you don't have to apologize for later.`,
    whatWouldBeMissing: `Easy trust. The Guardian's vigilance might feel like suspicion to the Builder. The Builder's speed might feel like carelessness to the Guardian. You'll need to work on assuming good faith.

You might also miss joy. Neither of you is oriented toward celebration.`,
    questionYoureAnswering: `Can we build something we don't have to hide?`
  },

  // Builder × Keeper
  "embers_shaper": {
    whatYoudBuild: `Things that honor what came before while creating what comes next. The Builder makes new; the Keeper holds the old. Together: innovation rooted in tradition.

Architecture that references history. Technology that preserves culture. New forms that carry old meaning.`,
    whatWouldBeStrong: `The Builder prevents the Keeper from becoming a museum. The Keeper prevents the Builder from destroying what matters. Together, you'd create things that move forward without losing the thread.

You'd build in a way that earns the trust of those who came before.`,
    whatWouldBeMissing: `Speed. The Keeper will slow things down to honor what was. The Builder will chafe at this. You'll argue about how much deference the past deserves.

You might also miss the genuinely new—things that don't fit in any tradition.`,
    questionYoureAnswering: `Can we build the future from what we've inherited?`
  },

  // Builder × Challenger
  "friction_shaper": {
    whatYoudBuild: `Hard things. The Builder makes; the Challenger craves difficulty. Together: projects that scare other people, problems no one else will touch.

Startups in impossible markets. Expeditions. Anything that requires both creation and struggle.`,
    whatWouldBeStrong: `You'd both lean into resistance. The Builder's momentum meets the Challenger's appetite for difficulty. Together, you'd tackle things that stop other teams.

Your collaboration would have unusual grit: building when it's hard, especially when it's hard.`,
    whatWouldBeMissing: `Rest. Easy wins. The willingness to do something simple. You're both oriented toward difficulty—one creates it, one seeks it. You might exhaust yourselves and everyone around you.

You might also miss that some things should be easy. Not everything needs to be hard.`,
    questionYoureAnswering: `What can we build that seems impossible?`
  },

  // Builder × Transcendent
  "shaper_unbound": {
    whatYoudBuild: `Things that reach beyond current limits. The Builder makes; the Transcendent imagines past the edges. Together: technology, art, or practices that expand what's possible.

This pairing creates things that didn't exist in anyone's imagination before.`,
    whatWouldBeStrong: `The Transcendent provides vision; the Builder makes it real. You'd create things that actually exist AND that push boundaries. Neither of you accepts current limits.

Your collaboration would be genuinely innovative: ideas that get built.`,
    whatWouldBeMissing: `Grounding. Both of you reach upward—one into transcendence, one into creation. The question of whether anyone needs what you're building might go unasked.

You might create marvels no one uses.`,
    questionYoureAnswering: `What can we build that doesn't exist yet?`
  },

  // Builder × Alive
  "alive_shaper": {
    whatYoudBuild: `Things with texture and sensation. The Builder makes; the Alive experiences fully. Together: products, spaces, or art where the sensory matters as much as the functional.

Design that feels good. Technology with soul. Spaces that come alive.`,
    whatWouldBeStrong: `The Builder brings structure; the Alive brings sensitivity. You'd make things that work AND that feel right. The Alive catches when something is technically correct but lifeless.

Your work would have unusual aliveness—built things that pulse.`,
    whatWouldBeMissing: `Efficiency. The Alive will slow things down to feel them. The Builder will want to move. You'll negotiate constantly between pace and sensitivity.

You might also miss the abstract and structural. Both of you live in the tangible.`,
    questionYoureAnswering: `Can built things feel alive?`
  },

  // Builder × Mender
  "mender_shaper": {
    whatYoudBuild: `Things that heal. The Builder makes; the Mender repairs. Together: systems, products, or practices designed to fix what's broken.

Restorative technology. Organizations that repair communities. Tools for healing.`,
    whatWouldBeStrong: `The Builder's creation meets the Mender's care. You'd make things specifically designed to help. Neither of you accepts brokenness as permanent.

Your collaboration creates functional repair: things that actually fix things.`,
    whatWouldBeMissing: `The courage to not fix. Sometimes things should stay broken—should end, should be let go. Both of you default to fixing: one by building new, one by repairing old.

You might prolong what should end.`,
    questionYoureAnswering: `Can we build what heals?`
  },

  // Builder × Truth-Teller
  "cleareyed_shaper": {
    whatYoudBuild: `Things that tell the truth. The Builder makes; the Truth-Teller sees clearly. Together: products, organizations, or systems built on honesty.

Journalism platforms. Transparent institutions. Technology that doesn't deceive.`,
    whatWouldBeStrong: `The Builder provides momentum; the Truth-Teller provides clarity. You'd build fast AND you'd build honestly. The Truth-Teller catches where the Builder might cut corners with reality.

Your work would be both shipped and true.`,
    whatWouldBeMissing: `Patience for ambiguity. Both of you want resolution—one through building, one through clarity. Complex situations that resist both action and simple truth might frustrate you.

You might force clarity where confusion was honest.`,
    questionYoureAnswering: `Can we build something true?`
  },

  // Builder × Liminal
  "between_shaper": {
    whatYoudBuild: `This is a fundamental tension. The Builder wants to create; the Liminal isn't ready to commit. What happens depends on whether the Builder can tolerate uncertainty and the Liminal can tolerate momentum.

At best: things built with unusual openness, not locked into premature form. At worst: frustration.`,
    whatWouldBeStrong: `The Liminal could prevent the Builder from solidifying too soon. The Builder could help the Liminal actually produce something. If you find your rhythm, you'd make things with unusual flexibility.

You might build things that can change—that aren't locked into one shape.`,
    whatWouldBeMissing: `Easy compatibility. Your instincts oppose. The Builder says "make it"; the Liminal says "not yet." One of you will feel rushed; one will feel held back.

You'll spend energy just on the negotiation.`,
    questionYoureAnswering: `Can we build while staying open?`
  },

  // ============================================
  // ABUNDANT (citizen) PAIRINGS
  // (already done: Deep, Builder)
  // ============================================

  // Abundant × Abundant
  "citizen_citizen": {
    whatYoudBuild: `A world that assumes there's enough. Two people who both believe in abundance would create expansive things—communities, projects, systems designed for sharing rather than hoarding.

Generous by default. Inclusive by instinct.`,
    whatWouldBeStrong: `Neither of you operates from scarcity. Together, you'd assume the best about what's possible and build accordingly. Your optimism would be reinforced rather than questioned.

You'd create things with unusual openness and trust.`,
    whatWouldBeMissing: `Critical examination. What if your optimism is wrong? What if there actually isn't enough of something specific? Neither of you naturally asks these questions.

You might build something beautiful on a faulty foundation.`,
    questionYoureAnswering: `What becomes possible when we both trust abundance?`
  },

  // Abundant × Architect
  "architect_citizen": {
    whatYoudBuild: `Systems designed for shared flourishing. The Abundant sees possibility; the Architect builds structures for the collective. Together: institutions that actually serve everyone.

This is a strong pairing for building things at scale that don't become extractive.`,
    whatWouldBeStrong: `The Abundant's generous vision meets the Architect's structural thinking. You'd design systems that include people, that assume enough, that are built to serve rather than exploit.

Your combination creates scalable generosity.`,
    whatWouldBeMissing: `The individual. Both of you think in systems and aggregates. Personal needs, edge cases, the person who doesn't fit the structure—they might get lost.

You might build an inclusive system that somehow excludes specific people.`,
    questionYoureAnswering: `Can we build systems that serve everyone?`
  },

  // Abundant × Present
  "citizen_presence": {
    whatYoudBuild: `Generous attention. The Abundant sees possibility everywhere; the Present offers full attention here. Together: relationships, practices, or communities where people feel both seen and supported.

This pairing creates warm, expansive spaces.`,
    whatWouldBeStrong: `The Abundant brings breadth; the Present brings depth of attention. Together, you'd offer people both possibility and presence—the sense that the world is good AND that someone is actually here for them.

Your combination creates spaces of unusual warmth.`,
    whatWouldBeMissing: `Critical edge. Both of you tend toward acceptance. The hard question, the uncomfortable truth, the challenge that would actually help—you might avoid them to preserve warmth.

You might create comfortable spaces that don't push anyone.`,
    questionYoureAnswering: `Can we offer presence and possibility together?`
  },

  // Abundant × Rooted
  "citizen_rooted": {
    whatYoudBuild: `Abundance in place. The Abundant sees possibility everywhere; the Rooted stays where they are. Together: making one place as rich as possible rather than seeking richness elsewhere.

Local abundance. Deep community. Bloom where planted.`,
    whatWouldBeStrong: `The Rooted grounds the Abundant's expansiveness in one place. The Abundant shows the Rooted that staying doesn't mean settling for less. Together, you'd find abundance without seeking.

You'd make home generous.`,
    whatWouldBeMissing: `The wider world. Both of you, for different reasons, focus on what's here. The opportunities, needs, or people beyond your immediate circle might not receive your attention.

You might perfect your corner and ignore everything else.`,
    questionYoureAnswering: `Can abundance come from staying still?`
  },

  // Abundant × Guardian
  "citizen_conscience": {
    whatYoudBuild: `This is a productive tension. The Abundant sees possibility; the Guardian sees what's hidden. Together: hope that's been tested against reality.

Movements, organizations, or approaches that are both optimistic and accountable.`,
    whatWouldBeStrong: `The Guardian prevents the Abundant from naive optimism. The Abundant prevents the Guardian from pure cynicism. Together, you'd see both what's possible and what's wrong—and work with both.

Your combination creates grounded hope.`,
    whatWouldBeMissing: `Easy agreement. You see the world differently. The Abundant sees abundance; the Guardian sees hidden costs. You'll spend energy reconciling these views.

One of you might feel naively positive; one might feel needlessly negative.`,
    questionYoureAnswering: `Can hope survive examination?`
  },

  // Abundant × Keeper
  "citizen_embers": {
    whatYoudBuild: `Abundance that remembers. The Abundant sees future possibility; the Keeper holds past wisdom. Together: vision that's rooted in what's been learned.

Institutions or practices that are both forward-looking and historically grounded.`,
    whatWouldBeStrong: `The Keeper gives the Abundant's optimism historical depth. The Abundant gives the Keeper's preservation purpose. Together, you'd build things that move forward without losing what mattered.

Your combination creates historically informed hope.`,
    whatWouldBeMissing: `The genuinely new. The Keeper looks back; the Abundant looks everywhere. But neither of you is specifically wired for radical novelty that honors nothing.

You might build creative conservatism rather than true innovation.`,
    questionYoureAnswering: `Can abundance learn from what came before?`
  },

  // Abundant × Challenger
  "citizen_friction": {
    whatYoudBuild: `Abundance tested. The Abundant assumes good; the Challenger seeks difficulty. Together: optimism that's been stress-tested.

Ventures that are both ambitious and rigorous. Hope that can take a punch.`,
    whatWouldBeStrong: `The Challenger prevents the Abundant from soft optimism. The Abundant prevents the Challenger from pursuing difficulty for its own sake. Together, you'd be both ambitious and tough.

Your combination creates resilient hope.`,
    whatWouldBeMissing: `Ease. The Challenger complicates everything; the Abundant's simple trust won't survive unchanged. You might lose the lightness that made the Abundant's vision appealing.

You might also just argue a lot.`,
    questionYoureAnswering: `Can optimism survive challenge?`
  },

  // Abundant × Transcendent
  "citizen_unbound": {
    whatYoudBuild: `Abundance without limits. The Abundant sees plenty; the Transcendent sees beyond current forms. Together: vision that imagines not just more but different.

Radical possibility. New shapes for human flourishing.`,
    whatWouldBeStrong: `Neither of you is limited by current reality. The Abundant assumes more is possible; the Transcendent assumes new is possible. Together, you'd imagine further than most.

Your combination creates ambitious vision.`,
    whatWouldBeMissing: `Grounding. Both of you reach outward and upward. The question of what's actually needed here and now might go unasked. You might imagine abundance no one can use.

You might also miss the people who just want ordinary life.`,
    questionYoureAnswering: `What abundance haven't we imagined yet?`
  },

  // Abundant × Alive
  "alive_citizen": {
    whatYoudBuild: `Abundance felt. The Abundant sees plenty; the Alive experiences fully. Together: lives rich in both possibility and sensation.

Practices, relationships, or communities where generosity and aliveness interweave.`,
    whatWouldBeStrong: `You'd both receive life fully—the Abundant receives possibility, the Alive receives experience. Together, you'd create spaces of unusual richness and openness.

Your combination is deeply celebratory.`,
    whatWouldBeMissing: `Discernment. Both of you say yes easily. The no that's actually needed—the boundary, the rejection, the discrimination between good and less good—might elude you.

You might drown in abundance, unable to choose.`,
    questionYoureAnswering: `What does abundance feel like?`
  },

  // Abundant × Mender
  "citizen_mender": {
    whatYoudBuild: `Repair that assumes wholeness is possible. The Abundant believes in possibility; the Mender fixes what's broken. Together: healing that doesn't get stuck in scarcity.

Restorative practices, community repair, approaches to fixing that aren't resigned.`,
    whatWouldBeStrong: `The Mender provides practical care; the Abundant provides hope. Together, you'd fix things while believing they can be made fully whole—not just patched.

Your combination creates repair without resignation.`,
    whatWouldBeMissing: `The hardness to let things end. Both of you are oriented toward continuation—one by fixing, one by seeing possibility. Things that should die might be kept alive.

You might repair what should be released.`,
    questionYoureAnswering: `Can we mend toward abundance?`
  },

  // Abundant × Truth-Teller
  "citizen_cleareyed": {
    whatYoudBuild: `Honest optimism. The Abundant sees possibility; the Truth-Teller sees what's real. Together: hope that can withstand honesty.

Movements, organizations, or relationships that are both positive and true.`,
    whatWouldBeStrong: `The Truth-Teller prevents the Abundant from comfortable delusion. The Abundant prevents the Truth-Teller from stark despair. Together, you'd see things clearly AND still believe.

Your combination creates tested hope.`,
    whatWouldBeMissing: `Easy compatibility. Your default tones differ. The Abundant's warmth might feel naive to the Truth-Teller; the Truth-Teller's bluntness might feel harsh to the Abundant.

You'll work to understand each other.`,
    questionYoureAnswering: `Can truth and abundance coexist?`
  },

  // Abundant × Liminal
  "between_citizen": {
    whatYoudBuild: `Abundance in uncertainty. The Abundant sees possibility; the Liminal waits in the between. Together: trust that good things come even when the path isn't clear.

Practices or relationships that combine openness with patience.`,
    whatWouldBeStrong: `The Abundant reassures the Liminal that uncertainty isn't emptiness. The Liminal shows the Abundant that waiting is sometimes the right form of trust. Together, you'd hold space for not-knowing without fear.

Your combination creates patient hope.`,
    whatWouldBeMissing: `Direction. The Liminal doesn't commit; the Abundant doesn't discriminate. Neither of you naturally chooses. You might wander generously forever.

You might have abundant uncertainty.`,
    questionYoureAnswering: `Can we trust abundance without knowing the path?`
  },

  // ============================================
  // ARCHITECT PAIRINGS
  // (already done: Deep, Builder, Abundant)
  // ============================================

  // Architect × Architect
  "architect_architect": {
    whatYoudBuild: `Systems upon systems. Two Architects together would create comprehensive structures—organizations, frameworks, institutions designed for the collective at scale.

This pairing has unusual structural capacity.`,
    whatWouldBeStrong: `You'd think in the same language. Both of you see systems, patterns, how things fit together. Together, you'd design things with unusual coherence and comprehensiveness.

Your structures would actually work because both of you know how.`,
    whatWouldBeMissing: `The individual. Both of you think at system level. Personal needs, exceptions, the person who doesn't fit your schema—they might fall through.

You might build a perfect system that dehumanizes.`,
    questionYoureAnswering: `What system comprehends everything?`
  },

  // Architect × Present
  "architect_presence": {
    whatYoudBuild: `Systems with soul. The Architect designs for the collective; the Present offers full attention. Together: structures that somehow don't lose the human.

Institutions that feel alive. Systems that serve without crushing.`,
    whatWouldBeStrong: `The Present humanizes the Architect's structures. The Architect gives the Present's attention scalable form. Together, you'd create things that work at scale AND that feel personal.

Your combination is rare: systems that don't dehumanize.`,
    whatWouldBeMissing: `Speed. Both of you are thorough—the Architect with structure, the Present with attention. The quick and dirty solution won't come from you.

You might also miss the people who don't want attention or systems.`,
    questionYoureAnswering: `Can systems serve without losing souls?`
  },

  // Architect × Rooted
  "architect_rooted": {
    whatYoudBuild: `Local structure. The Architect thinks in systems; the Rooted stays in place. Together: systems designed for one place, not exported everywhere.

Community-specific institutions. Local governance. Structure that respects context.`,
    whatWouldBeStrong: `The Rooted grounds the Architect's tendency toward universal systems. The Architect gives the Rooted's staying structural form. Together, you'd build things that fit where they are.

Your combination creates appropriate structure.`,
    whatWouldBeMissing: `Scale. Neither of you is oriented toward expanding beyond your context. Good ideas might stay local when they could help elsewhere.

You might build something perfect for here and useless everywhere else.`,
    questionYoureAnswering: `What structure fits this specific place?`
  },

  // Architect × Guardian
  "architect_conscience": {
    whatYoudBuild: `Accountable systems. The Architect designs for the collective; the Guardian watches for what's hidden. Together: institutions that police themselves.

Oversight built into structure. Self-correcting organizations. Transparent systems.`,
    whatWouldBeStrong: `The Guardian catches what systems hide; the Architect can build the watching into the structure itself. Together, you'd create systems that are accountable by design.

Your combination builds institutional integrity.`,
    whatWouldBeMissing: `Trust. Warmth. Both of you are vigilant—one about structure, one about shadows. The system might be so well-watched that no one wants to be in it.

You might create perfectly accountable misery.`,
    questionYoureAnswering: `Can we build systems that watch themselves?`
  },

  // Architect × Keeper
  "architect_embers": {
    whatYoudBuild: `Systems that remember. The Architect builds structure; the Keeper holds what mattered. Together: institutions that carry wisdom forward.

Archives, educational systems, organizations that don't forget their purpose.`,
    whatWouldBeStrong: `The Keeper ensures the Architect's structures serve continuity. The Architect gives the Keeper's preservation institutional form. Together, you'd build things that last because they remember.

Your combination creates durable meaning.`,
    whatWouldBeMissing: `Revolution. Both of you are oriented toward what exists—one as structure, one as memory. The genuinely disruptive might not come from you.

You might build beautiful conservatism.`,
    questionYoureAnswering: `Can systems carry memory?`
  },

  // Architect × Challenger
  "architect_friction": {
    whatYoudBuild: `Structures that demand growth. The Architect designs systems; the Challenger craves difficulty. Together: institutions, programs, or approaches that challenge people by design.

Training systems. Growth frameworks. Structures that don't let you stay comfortable.`,
    whatWouldBeStrong: `The Architect makes challenge systematic; the Challenger ensures the system has teeth. Together, you'd create things that reliably produce growth through struggle.

Your combination creates structured challenge.`,
    whatWouldBeMissing: `Rest. Gentleness. The system might be relentless because both of you value difficulty. People who need care more than challenge might suffer.

You might build systems that exhaust.`,
    questionYoureAnswering: `Can we systematize growth?`
  },

  // Architect × Transcendent
  "architect_unbound": {
    whatYoudBuild: `Structures for transcendence. The Architect designs for the collective; the Transcendent reaches beyond current limits. Together: systems that enable going beyond.

Spiritual traditions with structure. Innovation systems. Frameworks for transcendence.`,
    whatWouldBeStrong: `The Architect gives the Transcendent's vision institutional form. The Transcendent gives the Architect's structures purpose beyond efficiency. Together, you'd build things that serve transformation.

Your combination creates structured transcendence.`,
    whatWouldBeMissing: `The ordinary. Both of you are oriented toward the higher—one through systems, one through reaching. People who just want normal life might feel unseen.

You might build institutions that judge the satisfied.`,
    questionYoureAnswering: `Can we build structures for transcendence?`
  },

  // Architect × Alive
  "alive_architect": {
    whatYoudBuild: `Systems with sensation. The Architect thinks in structures; the Alive experiences fully. Together: designs that feel good, institutions that have life.

Experience design. Human-centered systems. Structures that pulse.`,
    whatWouldBeStrong: `The Alive catches where systems lose their life; the Architect can redesign accordingly. Together, you'd create structures that work AND that feel right.

Your combination creates systems people want to be in.`,
    whatWouldBeMissing: `Easy compatibility. The Architect abstracts; the Alive embodies. You'll work to understand each other's language.

You might also move slowly—the Architect structuring, the Alive feeling.`,
    questionYoureAnswering: `Can systems feel alive?`
  },

  // Architect × Mender
  "architect_mender": {
    whatYoudBuild: `Systems of repair. The Architect designs for the collective; the Mender fixes what's broken. Together: institutions, approaches, or structures dedicated to healing at scale.

Restorative justice systems. Community repair infrastructure. Healing made institutional.`,
    whatWouldBeStrong: `The Architect gives repair structural form; the Mender ensures the structure actually heals. Together, you'd create systems that reliably fix what's broken.

Your combination creates repair infrastructure.`,
    whatWouldBeMissing: `The courage to dissolve. Both of you are oriented toward continuation—one through structure, one through repair. Systems that should end might be preserved.

You might systematize prolongation.`,
    questionYoureAnswering: `Can we build systems that heal?`
  },

  // Architect × Truth-Teller
  "architect_cleareyed": {
    whatYoudBuild: `Honest systems. The Architect designs structures; the Truth-Teller sees clearly. Together: institutions built on truth, systems that don't deceive.

Transparent organizations. Structures that can't hide. Honest by design.`,
    whatWouldBeStrong: `The Truth-Teller ensures the Architect's systems are built on reality. The Architect gives truth structural form. Together, you'd create institutions that can withstand scrutiny.

Your combination creates structural integrity.`,
    whatWouldBeMissing: `Warmth. Flexibility. Both of you prioritize function over feeling. Systems might be truthful and structural and cold.

You might build something honest that no one loves.`,
    questionYoureAnswering: `Can we build structures that tell the truth?`
  },

  // Architect × Liminal
  "architect_between": {
    whatYoudBuild: `This is a fundamental tension. The Architect builds definite structures; the Liminal resists definition. What happens depends on whether you can find structures that embrace uncertainty.

At best: flexible systems, structures with room for the unfinished. At worst: frustration.`,
    whatWouldBeStrong: `The Liminal could prevent the Architect from premature closure. The Architect could give the Liminal's uncertainty a container. If you find your rhythm, you'd build things that can hold ambiguity.

You might create structures that breathe.`,
    whatWouldBeMissing: `Easy compatibility. Your instincts oppose. The Architect wants completion; the Liminal isn't ready. One of you will feel rushed; one will feel impatient.

You'll spend energy negotiating form itself.`,
    questionYoureAnswering: `Can structure embrace uncertainty?`
  },

  // ============================================
  // PRESENT (presence) PAIRINGS
  // (already done: Deep, Builder, Abundant, Architect)
  // ============================================

  // Present × Present
  "presence_presence": {
    whatYoudBuild: `Deep presence. Two people both committed to being here would create spaces of unusual attention—therapeutic practices, contemplative communities, relationships where nothing is buffered.

Full attention, fully shared.`,
    whatWouldBeStrong: `Neither of you escapes into doing. Together, you'd create spaces where people are actually seen, actually met. The quality of attention would be extraordinary.

Your combination creates presence that heals just by existing.`,
    whatWouldBeMissing: `Product. Direction. Both of you are oriented toward being rather than doing. The world might need something from you that you never create.

You might be beautifully present together and make nothing.`,
    questionYoureAnswering: `What happens when two people are fully here?`
  },

  // Present × Rooted
  "presence_rooted": {
    whatYoudBuild: `Being here completely. The Present is fully attentive; the Rooted is fully staying. Together: depth in place. Nothing moves, everything deepens.

Contemplative practices. Deep local community. Presence that persists.`,
    whatWouldBeStrong: `You'd both resist the world's demand to move on, produce, perform. Together, you'd create spaces where people can stay and be—nothing more, nothing less.

Your combination creates unusual stillness.`,
    whatWouldBeMissing: `Expansion. Adventure. Neither of you is oriented outward. The world beyond your immediate presence might not receive your gifts.

You might perfect presence in one place and miss everything else.`,
    questionYoureAnswering: `What happens when we fully stay and fully attend?`
  },

  // Present × Guardian
  "conscience_presence": {
    whatYoudBuild: `Presence to what's hidden. The Present offers full attention; the Guardian spots what's concealed. Together: seeing what others miss, fully.

Therapeutic practices. Investigative attention. Holding space for hard truths.`,
    whatWouldBeStrong: `The Present brings attention; the Guardian brings sight. Together, you'd see more and see it more fully. Nothing would be hidden from your combined gaze.

Your combination creates thorough, compassionate seeing.`,
    whatWouldBeMissing: `Action. Both of you are oriented toward perceiving rather than doing. When something needs to change, neither of you naturally moves.

You might see everything clearly and do nothing about it.`,
    questionYoureAnswering: `Can we be present to what's hidden?`
  },

  // Present × Keeper
  "embers_presence": {
    whatYoudBuild: `Attention to what was. The Present offers full attention; the Keeper holds what mattered. Together: honoring the past with complete presence.

Memorial practices. Living history. Being fully here with what came before.`,
    whatWouldBeStrong: `The Keeper brings what needs attention; the Present attends fully. Together, you'd create spaces where the past is genuinely honored—not just remembered but met.

Your combination creates living memory.`,
    whatWouldBeMissing: `The future. Both of you are oriented toward what exists—one to presence, one to the past. The genuinely new might not receive your attention.

You might become curators of presence to history.`,
    questionYoureAnswering: `Can we be present to what came before?`
  },

  // Present × Challenger
  "friction_presence": {
    whatYoudBuild: `Presence to difficulty. The Present is fully here; the Challenger craves struggle. Together: facing hard things completely, without flinching or fleeing.

Training practices. Therapeutic confrontation. Being present to what's hard.`,
    whatWouldBeStrong: `The Present prevents the Challenger from using difficulty as escape. The Challenger prevents the Present from avoiding necessary struggle. Together, you'd face what needs facing completely.

Your combination creates courageous presence.`,
    whatWouldBeMissing: `Ease. Rest. The Challenger seeks friction; the Present demands full attention. Together, you might exhaust yourselves being fully present to constant struggle.

You might need more gentleness than either naturally offers.`,
    questionYoureAnswering: `Can we be fully present to difficulty?`
  },

  // Present × Transcendent
  "presence_unbound": {
    whatYoudBuild: `This is a fundamental tension. The Present is committed to being here; the Transcendent reaches beyond here. What you create depends on whether you can integrate grounding with expansion.

At best: embodied transcendence. At worst: constant disagreement about where attention belongs.`,
    whatWouldBeStrong: `The Present could ground the Transcendent's reaching. The Transcendent could show the Present that being here includes reaching beyond. If you find your rhythm, transcendence that stays embodied.

Your combination, when it works, creates rare integration.`,
    whatWouldBeMissing: `Easy compatibility. The Present says "be here"; the Transcendent says "go beyond here." You'll spend energy negotiating this tension.

One of you will likely accommodate the other.`,
    questionYoureAnswering: `Can we transcend while staying here?`
  },

  // Present × Alive
  "alive_presence": {
    whatYoudBuild: `Full experience. The Present is fully here; the Alive opens to everything. Together: lives rich with fully-felt sensation—nothing buffered, nothing half-experienced.

This pairing is pure reception.`,
    whatWouldBeStrong: `You'd both receive life fully. Neither avoids through distraction or numbs through busyness. Together, you'd experience more in a day than most people do in a year.

Your combination creates unusual aliveness.`,
    whatWouldBeMissing: `Production. Direction. Both of you are oriented toward receiving. You might live richly while creating nothing. The world might not see your gifts.

You might enable each other's avoidance of the harder work of making things.`,
    questionYoureAnswering: `What does it feel like to be completely here and completely open?`
  },

  // Present × Mender
  "mender_presence": {
    whatYoudBuild: `Healing through attention. The Present is fully here; the Mender repairs what's broken. Together: spaces where being present IS the healing—where attention mends.

Therapeutic practices. Presence as care.`,
    whatWouldBeStrong: `The Present brings full attention; the Mender brings intention to heal. Together, you'd offer something rare: complete attention to what's wounded.

Your combination heals by seeing—many broken things just need someone to notice.`,
    whatWouldBeMissing: `Transformation. Both of you work with what is—being present to it, repairing it. Neither creates something genuinely new.

You might mend what should be replaced.`,
    questionYoureAnswering: `Can presence itself be healing?`
  },

  // Present × Truth-Teller
  "cleareyed_presence": {
    whatYoudBuild: `Truth held. The Present offers full attention; the Truth-Teller says what's real. Together: spaces where hard truths are faced with compassion—seen clearly and held gently.

Therapeutic honesty. Kind truth.`,
    whatWouldBeStrong: `The Truth-Teller brings clarity; the Present brings attention. Together, you'd face reality without fleeing from it—the truth, fully met.

Your combination creates honest care.`,
    whatWouldBeMissing: `Action. Both of you are oriented toward perceiving—one seeing clearly, one being present. When truth demands response, neither naturally moves.

You might hold truth beautifully and do nothing about it.`,
    questionYoureAnswering: `Can we be present to hard truths?`
  },

  // Present × Liminal
  "between_presence": {
    whatYoudBuild: `Presence in uncertainty. The Present is fully here; the Liminal waits in the between. Together: being completely present to not-knowing—uncertainty fully inhabited.

Transitions honored. Waiting attended to.`,
    whatWouldBeStrong: `The Present brings attention; the Liminal brings comfort with uncertainty. Together, you'd create spaces where people can wait without rushing—fully present to the in-between.

Your combination creates patient presence.`,
    whatWouldBeMissing: `Direction. Movement. Neither of you is oriented toward resolution. You might be perfectly present to endless transition.

You might perfect waiting and never arrive.`,
    questionYoureAnswering: `Can we be fully present to uncertainty?`
  },

  // ============================================
  // ROOTED PAIRINGS
  // (already done: Deep, Builder, Abundant, Architect, Present)
  // ============================================

  // Rooted × Rooted
  "rooted_rooted": {
    whatYoudBuild: `Deep roots in one place. Two Rooted people would create unusual stability—a life, a home, a practice that goes nowhere and deepens forever.

This pairing is anchor upon anchor.`,
    whatWouldBeStrong: `Neither of you would be tempted to leave. Together, you'd create something with extraordinary continuity. What you build in ten years would be there in fifty.

Your combination creates permanence.`,
    whatWouldBeMissing: `Movement. Change. Expansion. Both of you stay. The world beyond your place might not exist for you. When change is necessary, neither of you will initiate.

You might calcify together, beautifully.`,
    questionYoureAnswering: `How deep can roots go?`
  },

  // Rooted × Guardian
  "conscience_rooted": {
    whatYoudBuild: `Vigilance in place. The Rooted stays; the Guardian watches for what's hidden. Together: seeing clearly what's here, nowhere else.

Local accountability. Community watching. Staying and seeing.`,
    whatWouldBeStrong: `The Rooted provides stability; the Guardian provides sight. Together, you'd know your place completely—including what it hides.

Your combination creates thorough local knowledge.`,
    whatWouldBeMissing: `Scope. Both of you focus on what's immediate—one by staying, one by watching. Problems beyond your vicinity might not receive your attention.

You might see everything here and ignore everything there.`,
    questionYoureAnswering: `What's hidden where we are?`
  },

  // Rooted × Keeper
  "embers_rooted": {
    whatYoudBuild: `Memory in place. The Rooted stays; the Keeper preserves. Together: a location where the past is kept alive—not just remembered but lived with.

Living archives. Historical places. Memory that stays.`,
    whatWouldBeStrong: `Both of you are oriented toward continuity. Together, you'd create something with unusual depth of time—what happened here fifty years ago would still matter.

Your combination creates living history.`,
    whatWouldBeMissing: `The new. Both of you face backward—one to place, one to time. Genuine innovation might pass you by entirely.

You might perfect preservation and miss the future.`,
    questionYoureAnswering: `Can a place hold memory?`
  },

  // Rooted × Challenger
  "friction_rooted": {
    whatYoudBuild: `This is a fundamental tension. The Rooted stays still; the Challenger seeks difficulty through movement and resistance. What happens depends on whether difficulty can be found in place.

At best: depth through struggle without leaving. At worst: incompatibility.`,
    whatWouldBeStrong: `The Challenger might find that stillness is its own kind of difficulty. The Rooted might find aliveness through the Challenger's energy. If you integrate, you'd create growth in place.

Your combination, when it works, creates rooted struggle.`,
    whatWouldBeMissing: `Easy compatibility. Your instincts pull opposite directions. The Challenger wants motion; the Rooted wants stillness.

One of you will likely feel trapped or dragged.`,
    questionYoureAnswering: `Can struggle happen in one place?`
  },

  // Rooted × Transcendent
  "rooted_unbound": {
    whatYoudBuild: `This is a fundamental tension. The Rooted stays; the Transcendent goes beyond. These instincts oppose directly.

At best: transcendence grounded in place—rare and valuable. At worst: no common ground.`,
    whatWouldBeStrong: `The Rooted could ground the Transcendent's reaching. The Transcendent could show the Rooted that staying doesn't mean limitation. If you find integration, it would be extraordinary.

Your combination, when it works, creates embodied transcendence.`,
    whatWouldBeMissing: `Easy compatibility. You want different things. Negotiations will be constant.

You might admire each other from distance without finding much to do together.`,
    questionYoureAnswering: `Can we transcend while staying put?`
  },

  // Rooted × Alive
  "alive_rooted": {
    whatYoudBuild: `Feeling without seeking. The Rooted stays; the Alive opens. Together: receiving what comes while staying still—sensation without grasping.

A life of passive intensity: deeply felt, never chasing.`,
    whatWouldBeStrong: `The Rooted prevents the Alive from chasing sensation endlessly. The Alive prevents the Rooted from becoming numb. Together, you'd experience deeply without the anxiety of pursuit.

Your combination creates rich stillness.`,
    whatWouldBeMissing: `Adventure. Expansion. Both of you receive rather than seek. Experiences that require going somewhere might never come.

You might create a small, deep life rather than a large one.`,
    questionYoureAnswering: `What can we feel without leaving?`
  },

  // Rooted × Mender
  "mender_rooted": {
    whatYoudBuild: `Care in place. The Rooted stays; the Mender fixes what's here. Together: tending the same place forever—not seeking new things to fix but repairing what's in front of you.

Durability through local attention.`,
    whatWouldBeStrong: `The Rooted provides continuity; the Mender provides care. Together, you'd maintain things others abandon. Your commitment creates unusual longevity.

Your combination creates things that last because someone stayed.`,
    whatWouldBeMissing: `Scope. Both of you focus on what's immediate. Problems elsewhere might not receive your gifts.

You might perfect one small place while larger things break.`,
    questionYoureAnswering: `What happens when we stay and mend forever?`
  },

  // Rooted × Truth-Teller
  "cleareyed_rooted": {
    whatYoudBuild: `Truth in place. The Rooted stays; the Truth-Teller sees clearly. Together: honest presence—neither running from truth nor chasing it elsewhere.

Seeing what's here without flinching or fleeing.`,
    whatWouldBeStrong: `The Rooted grounds truth-telling in stability. The Truth-Teller keeps the Rooted from hiding in stillness. Together, you'd face reality without leaving.

Your combination creates steady honesty.`,
    whatWouldBeMissing: `Response. Both of you are oriented toward perceiving rather than acting. When truth demands change, neither moves naturally.

You might see everything clearly and do nothing about it.`,
    questionYoureAnswering: `What truths live where we stay?`
  },

  // Rooted × Liminal
  "between_rooted": {
    whatYoudBuild: `Stillness in transition. The Rooted stays; the Liminal waits in the between. Together: patient uncertainty—staying put while not-knowing.

Containers for extended transition without pressure to resolve.`,
    whatWouldBeStrong: `The Rooted provides stillness; the Liminal provides comfort with uncertainty. Together, you'd create rare patience: staying while nothing is clear.

Your combination supports people who need time more than direction.`,
    whatWouldBeMissing: `Movement toward anything. Neither moves forward. You might create endless, comfortable uncertainty.

You might perfect waiting without ever arriving.`,
    questionYoureAnswering: `Can we stay still in the in-between?`
  },

  // ============================================
  // WITNESS (conscience) PAIRINGS
  // (already done: Deep, Builder, Abundant, Architect, Present, Rooted)
  // ============================================

  // Guardian × Guardian
  "conscience_conscience": {
    whatYoudBuild: `Eyes everywhere. Two Guardianes would miss nothing—every shadow examined, every hidden thing surfaced. Together: complete vigilance.

Accountability systems. Investigative practices. Nothing concealed.`,
    whatWouldBeStrong: `Nothing would be hidden from your combined gaze. You'd catch what single watchers miss. Deception would be impossible in your presence.

Your combination produces thorough oversight.`,
    whatWouldBeMissing: `Trust. Rest. Joy. Both of you watch for what's wrong. Neither celebrates what's working. Your vigilance could become exhausting cynicism.

You might see every problem and appreciate nothing.`,
    questionYoureAnswering: `What happens when nothing can hide?`
  },

  // Guardian × Keeper
  "conscience_embers": {
    whatYoudBuild: `Memory of what was hidden. The Guardian sees what's concealed; the Keeper preserves what matters. Together: records of truth others want forgotten.

Archives of accountability. Memory against amnesia.`,
    whatWouldBeStrong: `The Guardian catches what's hidden; the Keeper ensures it's not forgotten. Together, you'd prevent historical erasure of wrongs.

Your combination creates durable truth.`,
    whatWouldBeMissing: `The future. Both of you are oriented toward what happened or what's being hidden. Building toward what could be might feel foreign.

You might become curators of wrongs rather than builders of right.`,
    questionYoureAnswering: `What must we remember that others want forgotten?`
  },

  // Guardian × Challenger
  "conscience_friction": {
    whatYoudBuild: `Confrontation with what's hidden. The Guardian sees; the Challenger engages difficulty. Together: not just exposing truth but wrestling with it.

Investigative practices that go all the way. Accountability with teeth.`,
    whatWouldBeStrong: `The Guardian finds what's wrong; the Challenger doesn't flinch from engaging it. Together, you'd go places others avoid—seeing hard truths and struggling with them.

Your combination creates courageous accountability.`,
    whatWouldBeMissing: `Ease. Mercy. Both of you are oriented toward difficulty—one seeing it, one seeking it. Rest, appreciation, letting things be—these might elude you.

You might exhaust each other and everyone around you.`,
    questionYoureAnswering: `Can we face what's hidden without flinching?`
  },

  // Guardian × Transcendent
  "conscience_unbound": {
    whatYoudBuild: `Watching from beyond. The Guardian spots what's concealed; the Transcendent reaches past limits. Together: seeing what's hidden about things no one else is even looking at.

Vision that transcends AND sees clearly.`,
    whatWouldBeStrong: `The Guardian grounds the Transcendent's reaching in honest seeing. The Transcendent expands what the Guardian thinks to look at. Together, you'd see further and more honestly than most.

Your combination creates transcendent clarity.`,
    whatWouldBeMissing: `The ordinary. Both of you reach toward the hidden or the beyond. Ordinary, unhidden, ground-level life might bore you.

You might miss the people who just want to live without being watched or transcended.`,
    questionYoureAnswering: `What's hidden in the beyond?`
  },

  // Guardian × Alive
  "alive_conscience": {
    whatYoudBuild: `Feeling what's hidden. The Guardian sees what's concealed; the Alive experiences fully. Together: experiencing the shadows, not just seeing them.

Practices that go into dark places with open hearts.`,
    whatWouldBeStrong: `The Guardian finds what's hidden; the Alive experiences it fully. Together, you wouldn't just know what's wrong—you'd feel it. This creates unusual moral depth.

Your combination creates embodied conscience.`,
    whatWouldBeMissing: `Lightness. Joy. Both of you are oriented toward intensity—one watching shadows, one feeling everything. The simple pleasure might not survive your gaze.

You might feel all the world's pain together.`,
    questionYoureAnswering: `What does the hidden feel like?`
  },

  // Guardian × Mender
  "conscience_mender": {
    whatYoudBuild: `Repair of what was hidden. The Guardian sees what's wrong; the Mender fixes it. Together: healing that starts with honest diagnosis.

Restorative practices that begin with truth.`,
    whatWouldBeStrong: `The Guardian identifies what's actually broken; the Mender addresses it. Together, you'd fix the real problem, not the presenting symptom.

Your combination creates accurate repair.`,
    whatWouldBeMissing: `Acceptance. Both of you are oriented toward what's wrong. The thing that's simply okay might not receive your attention.

You might fix everything that's broken and never appreciate what's whole.`,
    questionYoureAnswering: `Can we mend what was hidden?`
  },

  // Guardian × Truth-Teller
  "cleareyed_conscience": {
    whatYoudBuild: `Relentless truth. The Guardian sees what's hidden; the Truth-Teller says what's real. Together: nothing concealed, nothing euphemized.

Complete honesty. Nothing survives that can't withstand light.`,
    whatWouldBeStrong: `The Guardian finds; the Truth-Teller speaks. Together, you'd be unstoppable truth-generators. Comfortable lies have no chance.

Your combination creates thorough exposure.`,
    whatWouldBeMissing: `Mercy. Patience. Space for growth. You're both relentless about truth. Sometimes people need room to be wrong without being called out.

Your honesty might become a weapon.`,
    questionYoureAnswering: `What happens when nothing is hidden and nothing is softened?`
  },

  // Guardian × Liminal
  "between_conscience": {
    whatYoudBuild: `Watching in uncertainty. The Guardian sees what's hidden; the Liminal waits in the between. Together: seeing clearly without rushing to judgment.

Patient vigilance. Watching without premature conclusion.`,
    whatWouldBeStrong: `The Liminal prevents the Guardian from rushing to judgment. The Guardian gives the Liminal's waiting something concrete to observe. Together, you'd see clearly and conclude slowly.

Your combination creates careful seeing.`,
    whatWouldBeMissing: `Action. Both of you are oriented toward perceiving without acting. When what you see requires response, neither moves naturally.

You might watch forever and do nothing.`,
    questionYoureAnswering: `What can we see without concluding?`
  },

  // ============================================
  // KEEPER (embers) PAIRINGS
  // (already done: Deep, Builder, Abundant, Architect, Present, Rooted, Guardian)
  // ============================================

  // Keeper × Keeper
  "embers_embers": {
    whatYoudBuild: `A fortress of memory. Two Keepers would preserve everything—nothing lost, nothing forgotten, the past completely held.

Archives upon archives. Living history.`,
    whatWouldBeStrong: `Neither of you forgets. Together, you'd create something with extraordinary historical depth. What mattered a century ago would still matter.

Your combination creates perfect preservation.`,
    whatWouldBeMissing: `The future. Both of you face backward. New things that don't fit existing categories might be ignored or lost because they don't seem worth preserving.

You might become keepers of a dead world.`,
    questionYoureAnswering: `Can everything that mattered be remembered?`
  },

  // Keeper × Challenger
  "embers_friction": {
    whatYoudBuild: `This is a productive tension. The Keeper preserves; the Challenger disrupts. What happens depends on whether preservation can include difficulty.

At best: traditions that make you grow. At worst: opposition.`,
    whatWouldBeStrong: `The Challenger tests whether what the Keeper holds is worth keeping. The Keeper gives the Challenger's struggle historical context. If you integrate, you'd preserve what's tested and discard what isn't.

Your combination creates honest tradition.`,
    whatWouldBeMissing: `Easy compatibility. The Keeper guards; the Challenger pushes. You'll argue about what deserves to survive.

One of you might feel precious; one might feel destructive.`,
    questionYoureAnswering: `What from the past can survive challenge?`
  },

  // Keeper × Transcendent
  "embers_unbound": {
    whatYoudBuild: `Memory that reaches beyond. The Keeper holds what was; the Transcendent goes beyond what is. Together: wisdom traditions—preservation that serves transcendence.

Spiritual lineages. Wisdom transmitted and transcended.`,
    whatWouldBeStrong: `The Keeper grounds the Transcendent's reaching in what's been learned. The Transcendent gives the Keeper's preservation purpose beyond nostalgia. Together, you'd carry wisdom forward.

Your combination creates living tradition.`,
    whatWouldBeMissing: `The present. One looks back; one looks beyond. What's simply here and now might not receive attention.

You might miss ordinary life in favor of history and transcendence.`,
    questionYoureAnswering: `What wisdom should be carried as we go beyond?`
  },

  // Keeper × Alive
  "alive_embers": {
    whatYoudBuild: `Feeling the past. The Keeper holds what mattered; the Alive experiences fully. Together: not just remembering but reliving—the past felt, not just known.

Memorial practices with heart. Living connection to what was.`,
    whatWouldBeStrong: `The Keeper provides content; the Alive provides experience. Together, you'd create genuine connection to the past—not academic, but felt.

Your combination creates embodied memory.`,
    whatWouldBeMissing: `Forward motion. Both of you receive rather than create. The past might hold you so completely that the future never comes.

You might live in what was.`,
    questionYoureAnswering: `What does the past feel like?`
  },

  // Keeper × Mender
  "embers_mender": {
    whatYoudBuild: `Preservation through repair. The Keeper holds what matters; the Mender fixes what's broken. Together: keeping things alive by maintaining them—restoration rather than replacement.

Conservation. Repair as honoring.`,
    whatWouldBeStrong: `The Keeper knows what matters; the Mender knows how to keep it alive. Together, you'd maintain things that others would discard and replace.

Your combination creates careful continuity.`,
    whatWouldBeMissing: `The genuinely new. Both of you are oriented toward what exists—one preserving, one repairing. Things that should be created fresh might get repaired instead.

You might preserve what should be replaced.`,
    questionYoureAnswering: `Can we mend what matters into the future?`
  },

  // Keeper × Truth-Teller
  "cleareyed_embers": {
    whatYoudBuild: `Honest history. The Keeper preserves what was; the Truth-Teller sees clearly. Together: the past without myth—remembered accurately, not romantically.

Archives of what actually happened. History without lies.`,
    whatWouldBeStrong: `The Truth-Teller prevents the Keeper from nostalgic distortion. The Keeper gives truth historical depth. Together, you'd remember what actually happened, not what we wish had.

Your combination creates accurate memory.`,
    whatWouldBeMissing: `Myth. Meaning. Sometimes the story matters more than the fact. Both of you prioritize accuracy over narrative. The inspiring version might get sacrificed.

Your history might be true and lifeless.`,
    questionYoureAnswering: `Can we remember the truth about what was?`
  },

  // Keeper × Liminal
  "between_embers": {
    whatYoudBuild: `Memory in transition. The Keeper holds what was; the Liminal waits in the between. Together: carrying the past through uncertainty—not knowing where you're going but knowing what you carry.

Traditions in transition. Memory in flux.`,
    whatWouldBeStrong: `The Keeper provides continuity; the Liminal provides openness about the future. Together, you'd carry what matters without demanding to know where it's going.

Your combination creates flexible preservation.`,
    whatWouldBeMissing: `Arrival. Neither of you is oriented toward resolution. You might carry memory forever without ever landing anywhere to use it.

You might preserve for no one.`,
    questionYoureAnswering: `Can we carry memory through uncertainty?`
  },

  // ============================================
  // CHALLENGER (friction) PAIRINGS
  // (already done: Deep, Builder, Abundant, Architect, Present, Rooted, Guardian, Keeper)
  // ============================================

  // Challenger × Challenger
  "friction_friction": {
    whatYoudBuild: `Difficulty upon difficulty. Two Challengers would create something relentlessly hard—a practice, a venture, a life where nothing is easy and that's the point.

Extreme training. Hard ventures. Struggle as lifestyle.`,
    whatWouldBeStrong: `Neither of you backs down. Together, you'd push through obstacles that stop everyone else. Your tolerance for difficulty would be extraordinary.

Your combination creates relentless momentum.`,
    whatWouldBeMissing: `Rest. Ease. The simple pleasure. You're both wired for friction. When rest is needed—and it will be—neither of you will initiate.

You might burn out together, spectacularly.`,
    questionYoureAnswering: `How much difficulty can we sustain?`
  },

  // Challenger × Transcendent
  "friction_unbound": {
    whatYoudBuild: `Transcendence through struggle. The Challenger craves difficulty; the Transcendent reaches beyond. Together: going beyond limits through friction—growth via struggle.

Extreme spiritual practices. Transformation through challenge.`,
    whatWouldBeStrong: `The Challenger provides the method; the Transcendent provides the purpose. Together, you'd reach for transcendence through difficulty rather than comfort.

Your combination creates earned transcendence.`,
    whatWouldBeMissing: `Ordinary life. Both of you reach for the extraordinary—one through struggle, one through transcendence. The pleasures of normal existence might bore you.

You might miss the life that's already here.`,
    questionYoureAnswering: `Can we transcend through struggle?`
  },

  // Challenger × Alive
  "alive_friction": {
    whatYoudBuild: `Intense experience. The Challenger craves difficulty; the Alive experiences fully. Together: feeling the hard things completely—intensity that doesn't flinch.

Extreme experiences. Embodied challenge.`,
    whatWouldBeStrong: `The Challenger provides intensity; the Alive receives it fully. Together, you'd go into experiences others avoid and actually feel them.

Your combination creates full-contact living.`,
    whatWouldBeMissing: `Gentleness. Both of you are oriented toward intensity. The soft, the easy, the pleasant—you might dismiss them as weak.

You might miss the quiet pleasures.`,
    questionYoureAnswering: `What does difficulty feel like, fully felt?`
  },

  // Challenger × Mender
  "friction_mender": {
    whatYoudBuild: `This is a productive tension. The Challenger breaks things; the Mender fixes them. Together: stress-testing and repair—finding what's weak by testing it.

Quality assurance. Resilience through breaking and fixing.`,
    whatWouldBeStrong: `The Challenger finds the cracks; the Mender repairs them. Together, you'd make things stronger by exposing and addressing weakness.

Your combination creates antifragile systems.`,
    whatWouldBeMissing: `Peace. The Challenger will keep finding things to break; the Mender will keep fixing them. The cycle might never end.

You might never let anything just be.`,
    questionYoureAnswering: `Can breaking and mending make things stronger?`
  },

  // Challenger × Truth-Teller
  "cleareyed_friction": {
    whatYoudBuild: `Hard truth. The Challenger seeks difficulty; the Truth-Teller speaks clearly. Together: truths that are hard to hear, delivered without softening.

Confrontational honesty. Challenge through clarity.`,
    whatWouldBeStrong: `The Truth-Teller provides content; the Challenger ensures it's delivered without cushioning. Together, you'd tell people things they need to hear in ways they can't ignore.

Your combination creates uncomfortable honesty.`,
    whatWouldBeMissing: `Mercy. Timing. Both of you lean toward confrontation. The person who needs truth delivered gently might get harmed instead of helped.

Your honesty might become a weapon.`,
    questionYoureAnswering: `What truths can only be delivered hard?`
  },

  // Challenger × Liminal
  "between_friction": {
    whatYoudBuild: `This is a fundamental tension. The Challenger moves toward difficulty; the Liminal waits in uncertainty. What happens depends on whether struggle can happen in the in-between.

At best: active waiting—wrestling with uncertainty itself. At worst: frustration.`,
    whatWouldBeStrong: `The Liminal might show the Challenger that uncertainty is its own struggle. The Challenger might give the Liminal's waiting energy and purpose.

If you integrate, struggle with the in-between itself.`,
    whatWouldBeMissing: `Easy compatibility. Your instincts differ. The Challenger wants to engage; the Liminal isn't ready.

One might feel impatient; one might feel pushed.`,
    questionYoureAnswering: `Can we struggle with uncertainty itself?`
  },

  // ============================================
  // TRANSCENDENT (unbound) PAIRINGS
  // (already done: Deep, Builder, Abundant, Architect, Present, Rooted, Guardian, Keeper, Challenger)
  // ============================================

  // Transcendent × Transcendent
  "unbound_unbound": {
    whatYoudBuild: `Beyond upon beyond. Two Transcendents would reach further than anyone—past every limit, into territory no one has mapped.

Pure vision. The edge of what minds can conceive.`,
    whatWouldBeStrong: `Neither of you is limited by current reality. Together, you'd imagine further and reach higher than almost any pairing. Your vision would be genuinely boundless.

Your combination creates maximum expansion.`,
    whatWouldBeMissing: `The ground. Both of you reach up and out. Ordinary life, embodied concerns, the people who aren't on this journey—they might become invisible.

You might transcend together and leave everyone behind.`,
    questionYoureAnswering: `How far can two minds reach?`
  },

  // Transcendent × Alive
  "alive_unbound": {
    whatYoudBuild: `Felt transcendence. The Transcendent reaches beyond; the Alive experiences fully. Together: going beyond AND actually experiencing it—transcendence that's embodied, not just imagined.

Spiritual experiences. Ecstatic practices.`,
    whatWouldBeStrong: `The Transcendent provides direction; the Alive provides experience. Together, you'd actually feel what you reach toward, not just think it.

Your combination creates embodied transcendence.`,
    whatWouldBeMissing: `Ordinary life. Both of you are oriented toward intensity—one reaching, one feeling. The mundane might bore you both.

You might live in peak experience and miss the valleys.`,
    questionYoureAnswering: `What does transcendence feel like?`
  },

  // Transcendent × Mender
  "mender_unbound": {
    whatYoudBuild: `Healing toward transcendence. The Mender fixes what's broken; the Transcendent reaches beyond. Together: repair that aims for transformation, not just restoration.

Healing that doesn't just restore but elevates.`,
    whatWouldBeStrong: `The Mender provides practical care; the Transcendent provides vision. Together, you'd fix things in ways that make them better than before.

Your combination creates transformative repair.`,
    whatWouldBeMissing: `Acceptance of limits. Both of you believe things can be more than they are. Sometimes repair should just restore; sometimes limits are real.

You might reach for transformation when stability was needed.`,
    questionYoureAnswering: `Can mending be transcendence?`
  },

  // Transcendent × Truth-Teller
  "cleareyed_unbound": {
    whatYoudBuild: `Clear vision of the beyond. The Transcendent reaches past limits; the Truth-Teller sees clearly. Together: seeing the unreachable accurately—not just imagining but knowing.

Vision grounded in truth. Transcendence that doesn't deceive.`,
    whatWouldBeStrong: `The Truth-Teller keeps the Transcendent honest about what's actually being seen. The Transcendent expands what the Truth-Teller thinks to look at. Together, you'd see beyond—clearly.

Your combination creates honest vision.`,
    whatWouldBeMissing: `Comfort with mystery. The Truth-Teller wants clarity; some transcendent territory may resist it. You might demand more certainty than the beyond offers.

You might mistake clarity for truth in domains where both are questionable.`,
    questionYoureAnswering: `Can we see the beyond clearly?`
  },

  // Transcendent × Liminal
  "between_unbound": {
    whatYoudBuild: `Transcendence without arrival. The Transcendent reaches beyond; the Liminal waits in the between. Together: going beyond without demanding to arrive anywhere.

Open-ended transcendence. Reaching without grasping.`,
    whatWouldBeStrong: `The Liminal prevents the Transcendent from premature arrival. The Transcendent gives the Liminal's uncertainty direction. Together, you'd reach for beyond while staying open.

Your combination creates patient transcendence.`,
    whatWouldBeMissing: `Arrival. Neither of you is oriented toward landing. You might reach forever and never get anywhere.

Beautiful aspiration that produces nothing.`,
    questionYoureAnswering: `Can we reach beyond without arriving?`
  },

  // ============================================
  // FEELER (alive) PAIRINGS
  // (already done: Deep, Builder, Abundant, Architect, Present, Rooted, Guardian, Keeper, Challenger, Transcendent)
  // ============================================

  // Alive × Alive
  "alive_alive": {
    whatYoudBuild: `A life drenched in sensation. Two Alives would create something extraordinarily rich—every moment experienced, nothing buffered, full intensity always.

Pure experience. Life at maximum volume.`,
    whatWouldBeStrong: `Neither of you turns down the volume. Together, you'd experience more than almost anyone. Nothing would be wasted—every moment would be fully felt.

Your combination creates extraordinary aliveness.`,
    whatWouldBeMissing: `Stability. Direction. Both of you receive rather than steer. When life needs structure or decision, neither naturally provides it.

You might drown in sensation without making anything of it.`,
    questionYoureAnswering: `How much can we feel?`
  },

  // Alive × Mender
  "alive_mender": {
    whatYoudBuild: `Healing through feeling. The Alive experiences fully; the Mender repairs what's broken. Together: repair that includes feeling—healing that isn't just fixed but felt.

Embodied healing. Repair with heart.`,
    whatWouldBeStrong: `The Mender provides care; the Alive provides feeling. Together, you'd heal things in ways that include the whole experience—not just fixing but feeling fixed.

Your combination creates embodied repair.`,
    whatWouldBeMissing: `Efficiency. Neither of you values speed over depth. When quick fixes would serve, you might not offer them.

You might heal slowly when fast was fine.`,
    questionYoureAnswering: `What does healing feel like?`
  },

  // Alive × Truth-Teller
  "alive_cleareyed": {
    whatYoudBuild: `Truth felt. The Alive experiences fully; the Truth-Teller sees clearly. Together: feeling what's real—experiencing truth, not just knowing it.

Embodied honesty. Truth you can feel.`,
    whatWouldBeStrong: `The Truth-Teller provides clarity; the Alive provides experience. Together, you'd actually feel truth, not just think it—which makes it real in a different way.

Your combination creates experienced truth.`,
    whatWouldBeMissing: `Comfort. Both of you are unfiltered—one feels everything, one speaks everything. Together you might have no cushioning at all.

Your honesty might overwhelm.`,
    questionYoureAnswering: `What does truth feel like?`
  },

  // Alive × Liminal
  "alive_between": {
    whatYoudBuild: `Feeling uncertainty. The Alive experiences fully; the Liminal waits in the between. Together: actually experiencing the in-between—feeling what waiting feels like.

Transitions fully inhabited. Uncertainty as experience.`,
    whatWouldBeStrong: `The Liminal provides the space; the Alive fills it with experience. Together, you'd actually feel the in-between rather than just enduring it.

Your combination creates experienced uncertainty.`,
    whatWouldBeMissing: `Resolution. Neither of you is oriented toward conclusion. You might feel uncertainty forever without resolving it.

Beautiful waiting that never ends.`,
    questionYoureAnswering: `What does the in-between feel like?`
  },

  // ============================================
  // MENDER PAIRINGS
  // (already done: Deep, Builder, Abundant, Architect, Present, Rooted, Guardian, Keeper, Challenger, Transcendent, Alive)
  // ============================================

  // Mender × Mender
  "mender_mender": {
    whatYoudBuild: `Repair upon repair. Two Menders would fix everything—a life or practice dedicated completely to healing what's broken.

Total care. Nothing stays broken.`,
    whatWouldBeStrong: `Neither of you gives up on broken things. Together, you'd maintain and repair with extraordinary dedication. What others abandon, you'd save.

Your combination creates persistent care.`,
    whatWouldBeMissing: `Creation. Both of you fix rather than make. Genuinely new things might not emerge because you're so busy repairing.

You might also keep alive what should die.`,
    questionYoureAnswering: `What happens when no one gives up on broken things?`
  },

  // Mender × Truth-Teller
  "cleareyed_mender": {
    whatYoudBuild: `Honest repair. The Mender fixes what's broken; the Truth-Teller sees clearly. Together: fixing what's actually wrong, not what you wish was wrong.

Accurate healing. Repair based on truth.`,
    whatWouldBeStrong: `The Truth-Teller diagnoses accurately; the Mender addresses what's found. Together, you'd fix the real problem rather than the comfortable problem.

Your combination creates effective repair.`,
    whatWouldBeMissing: `Comfort with mystery. Both of you want clarity—one in seeing, one in fixing. When what's broken is unclear, you might force premature diagnosis.

You might fix the wrong thing confidently.`,
    questionYoureAnswering: `Can we fix what's truly broken?`
  },

  // Mender × Liminal
  "between_mender": {
    whatYoudBuild: `Care in uncertainty. The Mender fixes what's broken; the Liminal waits in the between. Together: repair that doesn't rush—fixing while staying open to what's emerging.

Patient healing. Repair without premature closure.`,
    whatWouldBeStrong: `The Liminal prevents the Mender from fixing too fast. The Mender gives the Liminal's uncertainty something to do. Together, you'd heal slowly and carefully.

Your combination creates spacious repair.`,
    whatWouldBeMissing: `Speed. Neither of you rushes. When quick repair would serve, you might not provide it.

You might heal so slowly that new breaks happen while you're still fixing old ones.`,
    questionYoureAnswering: `Can we mend without rushing?`
  },

  // ============================================
  // TRUTH-TELLER (cleareyed) PAIRINGS
  // (already done: Deep, Builder, Abundant, Architect, Present, Rooted, Guardian, Keeper, Challenger, Transcendent, Alive, Mender)
  // ============================================

  // Truth-Teller × Truth-Teller
  "cleareyed_cleareyed": {
    whatYoudBuild: `Relentless clarity. Two Truth-Tellers would create something without any comfortable lies—every deception exposed, every truth spoken.

Total honesty. Nothing softened.`,
    whatWouldBeStrong: `Neither of you accepts convenient delusion. Together, you'd see and speak with extraordinary clarity. Lies have no chance in your presence.

Your combination creates pure honesty.`,
    whatWouldBeMissing: `Mercy. Grace. The willingness to let things be. You're both oriented toward truth at all costs. Feelings, needs for comfort, space for growth—you might sacrifice them.

Your honesty might become cruel.`,
    questionYoureAnswering: `What happens when nothing is softened?`
  },

  // Truth-Teller × Liminal
  "between_cleareyed": {
    whatYoudBuild: `Truth in uncertainty. The Truth-Teller sees clearly; the Liminal waits in the between. Together: speaking what's true without pretending to more certainty than you have.

Honest uncertainty. Clarity about not knowing.`,
    whatWouldBeStrong: `The Liminal prevents the Truth-Teller from premature certainty. The Truth-Teller gives the Liminal's uncertainty honest expression. Together, you'd be truthful about what you don't know.

Your combination creates honest doubt.`,
    whatWouldBeMissing: `Confident action. Neither of you commits easily. When action requires certainty you don't have, you might both hesitate.

You might tell the truth about uncertainty forever.`,
    questionYoureAnswering: `Can we tell the truth about not knowing?`
  },

  // ============================================
  // LIMINAL (between) PAIRINGS
  // (already done: Deep, Builder, Abundant, Architect, Present, Rooted, Guardian, Keeper, Challenger, Transcendent, Alive, Mender, Truth-Teller)
  // ============================================

  // Liminal × Liminal
  "between_between": {
    whatYoudBuild: `Shared uncertainty. Two people both in the in-between would create something that never resolves—a life, practice, or relationship comfortable with permanent incompleteness.

The waiting room as home.`,
    whatWouldBeStrong: `Neither of you demands arrival. Together, you'd create extraordinary patience for uncertainty. The pressure to resolve would be absent.

Your combination creates rare tolerance for not-knowing.`,
    whatWouldBeMissing: `Everything that requires commitment. You might wait together forever. The things that need someone to decide, to commit, to arrive—you might never do them.

Beautiful waiting that never ends.`,
    questionYoureAnswering: `How long can we not-know together?`
  }

};

// Helper function to get content for any pair of archetypes
// Takes archetype keys in any order and returns the content
export function getSharedUtopia(archetypeA: string, archetypeB: string): SharedUtopiaContent | null {
  // Sort alphabetically to get consistent key
  const sorted = [archetypeA, archetypeB].sort();
  const key = `${sorted[0]}_${sorted[1]}`;
  return sharedUtopiaContent[key] || null;
}
