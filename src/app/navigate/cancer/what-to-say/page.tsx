import Link from "next/link";
import GuideShell, { GS } from "@/components/GuideShell";
import { getGuide, guideMetadata, GuideFaq } from "@/lib/guides";

const guide = getGuide("what-to-say");

export const metadata = guideMetadata(guide);

const FAQS: GuideFaq[] = [
  {
    question: "What is the best thing to say to someone diagnosed with cancer?",
    answer:
      "Keep it simple and honest: “I love you. I’m here.” “I’m thinking of you every day.” “I don’t know what to say, but I want to be with you in this.” You are not trying to solve anything. You are keeping them company inside something that can’t be solved.",
  },
  {
    question: "What should you not say to someone with cancer?",
    answer:
      "Avoid silver linings (“at least…”), miracle cures, other people’s cancer stories, and “you’re a fighter” or “you’ve got this.” Survival is not a matter of willpower, and that framing makes dying feel like failure. Don’t ask how it happened, and don’t ask how treatment is going. They often don’t know for weeks or months.",
  },
  {
    question: "What can I do for a cancer patient besides talking?",
    answer:
      "Be specific and consistent. A weekly “thinking of you, no response needed” text. “Can I take something off your plate this week?” instead of “let me know if you need anything.” Handle a whole job, like a ride to an appointment or a meal drop-off, without making them coordinate it. And keep showing up after the crisis fades, when everyone else has moved on.",
  },
  {
    question: "Should I visit someone going through chemotherapy?",
    answer:
      "Follow their energy, not yours. Be available in case they want a visit, but don’t push for one. Treatment is exhausting and they won’t have the energy to entertain. Don’t be offended by silence or a no. Thoughtfulness and consistency mean the world even when they can’t respond.",
  },
];

export default function WhatToSayPage() {
  return (
    <GuideShell
      guide={guide}
      faqs={FAQS}
      goDeeper={
        <>
          <li style={GS.li}>
            <Link href="/read/fixing-the-unfixable" style={GS.link}>Fixing the Unfixable</Link>: the
            essay behind this page, on why we say the wrong things and what presence really means.
          </li>
          <li style={GS.li}>
            <Link href="/read/expecting-the-unexpected" style={GS.link}>Expecting the Unexpected</Link>: my
            complete practical cancer guide, with a full section for caregivers.{" "}
            <a href="/expecting-the-unexpected-guide.pdf" style={GS.link}>Free PDF here</a>.
          </li>
          <li style={GS.li}>
            <Link href="/navigate/cancer/how-to-help-someone-with-cancer" style={GS.link}>How to Help Someone With Cancer</Link>: the
            doing companion to this page.
          </li>
        </>
      }
    >
      <p style={GS.p}>
        Someone you love has cancer, and you are terrified of saying the wrong thing.
        Maybe you’ve already typed a message and deleted it three times. Maybe you’ve
        gone quiet, telling yourself you’ll reach out when you know what to say.
      </p>
      <p style={GS.p}>
        I was diagnosed with cancer at 34, and over two rounds of treatment I heard
        every version of what people say when they don’t know what to say. I wrote
        this page for the people around a patient: the friends, family, and coworkers
        who want to help and are afraid of doing it badly. It’s drawn from two longer
        pieces,{" "}
        <Link href="/read/fixing-the-unfixable" style={GS.link}>Fixing the Unfixable</Link>,
        on why these conversations are so hard, and my{" "}
        <Link href="/read/expecting-the-unexpected" style={GS.link}>complete cancer guide</Link>,
        which has a full section for caregivers.
      </p>

      <h2 style={GS.h2}>First: you cannot fix this, and you don’t have to</h2>
      <p style={GS.p}>
        Almost every problem in life rewards action. Someone is hungry, you feed them.
        Someone is in pain, you find medicine. So when someone you love gets cancer,
        every instinct says <em>do something, say the thing that makes it better</em>.
        But serious illness is a different kind of problem, the unfixable kind, and
        the usual calculus does not apply. That mismatch is why so many well-meant
        words land wrong. They are attempts to fix something that cannot be fixed,
        and the patient can feel the difference immediately.
      </p>
      <blockquote style={GS.quote}>
        “There is nothing you can say that will solve it. But there is much you can
        say that will keep someone company inside of it.”
        <br />from <Link href="/read/fixing-the-unfixable" style={GS.link}>Fixing the Unfixable</Link>
      </blockquote>
      <p style={GS.p}>
        Everything below follows from that. Your job is not to fix. Your job is company.
      </p>

      <h2 style={GS.h2}>What to say</h2>
      <ul style={{ paddingLeft: "20px" }}>
        <li style={GS.li}><span style={GS.say}>“I love you. I’m here.”</span></li>
        <li style={GS.li}><span style={GS.say}>“I’m thinking of you every day.”</span></li>
        <li style={GS.li}><span style={GS.say}>“I don’t know what to say, but I want to be with you in this.”</span> Naming your own speechlessness is honest, and honesty is a relief.</li>
        <li style={GS.li}><span style={GS.say}>“I’m not going anywhere.”</span></li>
        <li style={GS.li}><span style={GS.say}>“You don’t have to be strong with me.”</span> This gives the patient permission to stop performing. Almost no one else offers them that.</li>
        <li style={GS.li}><span style={GS.say}>“Can I take something off your plate this week?”</span> Specific and answerable, unlike “let me know if you need anything.”</li>
        <li style={GS.li}><span style={GS.say}>“Do you want to talk about it, or should we talk about something else?”</span> Let them steer.</li>
        <li style={GS.li}>Something that will bring them joy. A photo from better times, a meme, a memory. It doesn’t have to be about the illness at all.</li>
        <li style={GS.li}>Nothing. Sit with them and let them rest. Silence in good company is rest.</li>
      </ul>

      <h2 style={GS.h2}>What not to say (and why)</h2>
      <ul style={{ paddingLeft: "20px" }}>
        <li style={GS.li}><span style={GS.say}>“At least…”</span> Any sentence that starts this way minimizes what they are living through. There is no silver lining they haven’t already searched for themselves.</li>
        <li style={GS.li}><span style={GS.say}>“Have you tried [miracle cure]?”</span> They have a medical team. Unsolicited treatment advice adds pressure and implies they aren’t doing enough.</li>
        <li style={GS.li}><span style={GS.say}>“My [relative] had cancer and…”</span> Every cancer, every body, and every outcome is different. Other people’s stories, whatever the ending, are a weight to carry.</li>
        <li style={GS.li}><span style={GS.say}>“You’re a fighter.” “You’ve got this.” “You’re so strong.”</span> This has nothing to do with strength. If survival is a matter of will, then dying becomes a failure, and the patient hears that implication even when you don’t intend it.</li>
        <li style={GS.li}><span style={GS.say}>“How did it happen?”</span> Don’t ask for specifics unless they’re offered. Replaying the same story is traumatic, and the question hints they did something to deserve it.</li>
        <li style={GS.li}><span style={GS.say}>“How is treatment going?”</span> They usually don’t know. Depending on the treatment, they may not know for weeks or months. The question forces them to either lie or hand you their fear.</li>
        <li style={GS.li}><span style={GS.say}>“You look great! How are you feeling?”</span> This can be triggering mid-treatment. Try “It’s so nice to see you” or “It’s nice to be with you” instead.</li>
      </ul>

      <h2 style={GS.h2}>What to do when words fail</h2>
      <p style={GS.p}>
        The most valuable thing I received during treatment wasn’t a perfect sentence.
        It was consistency. A couple of friends sent a weekly{" "}
        <span style={GS.say}>“thinking of you, no response needed”</span> text, sometimes
        with a photo of us in better times, and it made my day every single time.
        The “no response needed” part matters. It delivers love without creating a debt.
      </p>
      <p style={GS.p}>
        Don’t be offended if you never get a reply. And don’t make them coordinate
        your help. Take a whole job off their plate instead: drive them to an
        appointment, set up the meal train, handle the pharmacy run. Be available
        for a visit without pushing for one, and follow their energy when you’re
        there. They won’t have the capacity to entertain. What they need matters
        more than what you need to give.
      </p>
      <p style={GS.p}>
        Most of all, keep showing up after the crisis fades. There is a flood of
        support at diagnosis, and then everyone’s life resumes. Treatment, recovery,
        and the fear of recurrence go on for months and years. A text in month eight
        says more than anything you could have said in week one.
      </p>

      <h2 style={GS.h2}>Hope, without the pressure</h2>
      <p style={GS.p}>
        You don’t have to abandon hope to be honest. Hope just changes shape.
        Instead of hope for a guaranteed outcome, hope for dignity. For moments of
        beauty. For pain to be held, not hidden. For not walking into the dark alone.
        When you stop insisting on a happy ending, you become someone the patient
        doesn’t have to protect. That is what keeps a person company.
      </p>
    </GuideShell>
  );
}
