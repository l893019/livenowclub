import Link from "next/link";
import GuideShell, { GS } from "@/components/GuideShell";
import { getGuide, guideMetadata, GuideFaq } from "@/lib/guides";

const guide = getGuide("how-to-help-someone-with-cancer");

export const metadata = guideMetadata(guide);

const FAQS: GuideFaq[] = [
  {
    question: "How do I offer help to someone with cancer?",
    answer:
      "Make the offer specific and closed-ended: “Can I take something off your plate this week?” “I'm dropping soup on Thursday, leave a cooler out if you're resting.” “I'll drive you on the 12th.” Open-ended offers like “let me know if you need anything” put the work of coordinating back on the patient, and they will never cash them in.",
  },
  {
    question: "What should I bring or send someone going through chemo?",
    answer:
      "Comfort that respects a changed body: soft blankets or sheets, fuzzy socks, an eye mask, ginger chews for nausea, unscented lotion (scent sensitivity is common during treatment), a heating pad, or a photo of the two of you from better times. Food helps most when it's coordinated through a meal train rather than arriving at random.",
  },
  {
    question: "Should I visit a friend who is in cancer treatment?",
    answer:
      "Be available without pushing. Treatment steals the energy it takes to host, and many patients prefer digital contact for stretches. Follow their energy, not yours: offer, take no gracefully, and don't go quiet just because visits are off the table.",
  },
  {
    question: "What if they never respond to my messages?",
    answer:
      "Keep sending them anyway, with no strings: “thinking of you, no response needed.” Silence is the treatment talking, not the friendship. Thoughtfulness and consistency mean the world even when there's no reply.",
  },
];

export default function HowToHelpPage() {
  return (
    <GuideShell
      guide={guide}
      faqs={FAQS}
      goDeeper={
        <>
          <li style={GS.li}>
            <Link href="/navigate/cancer/what-to-say" style={GS.link}>What to Say to Someone With Cancer</Link>: the
            words companion to this page.
          </li>
          <li style={GS.li}>
            <Link href="/read/it-takes-a-village" style={GS.link}>It Takes a Village</Link>: my
            essay on what my people did for me.
          </li>
          <li style={GS.li}>
            <Link href="/read/expecting-the-unexpected" style={GS.link}>Expecting the Unexpected</Link>: the
            complete guide, including the full caregiver section.{" "}
            <a href="/expecting-the-unexpected-guide.pdf" style={GS.link}>Free PDF here</a>.
          </li>
        </>
      }
    >
      <p style={GS.p}>
        Someone you care about has cancer and you want to do something. That instinct
        is right. I got through two rounds of treatment because people showed up for
        me, and I am eternally grateful to everyone who did, in any way. But I also
        watched people who loved me freeze, unsure what would actually help. This page
        is the answer, from the receiving end.
      </p>

      <h2 style={GS.h2}>The one rule: don't make them coordinate you</h2>
      <p style={GS.p}>
        “Let me know if you need anything” is kind, and useless. It hands the patient
        a job: figure out what you can do, decide if it's too much to ask, and manage
        the logistics of your help. They won't. Flip it. Make offers that can be
        answered yes or no:
      </p>
      <ul style={{ paddingLeft: "20px" }}>
        <li style={GS.li}><span style={GS.say}>“Can I take something off your plate this week?”</span></li>
        <li style={GS.li}><span style={GS.say}>“I'm doing a grocery run Saturday. Text me a list.”</span></li>
        <li style={GS.li}><span style={GS.say}>“I'll drive you to your appointment on the 12th.”</span></li>
        <li style={GS.li}><span style={GS.say}>“Soup on your porch Thursday. No need to come to the door.”</span></li>
      </ul>

      <h2 style={GS.h2}>The weekly text</h2>
      <p style={GS.p}>
        To be honest, there is nothing better than a consistent{" "}
        <span style={GS.say}>“thinking of you, no response needed”</span>, perhaps with
        a photo of you two in better times or something you think they'd enjoy.
        A couple of friends did this for me weekly, and it made my day every time.
        The design matters: it delivers love without creating a debt. And please
        don't feel offended if you don't receive a reply. Thoughtfulness and
        consistency mean the world.
      </p>

      <h2 style={GS.h2}>Take a whole job</h2>
      <p style={GS.p}>
        The biggest gifts I received weren't things. They were jobs that disappeared
        from my list. Pick one and own it end to end:
      </p>
      <ul style={{ paddingLeft: "20px" }}>
        <li style={GS.li}><strong>Rides:</strong> claim specific appointment dates, and be the kind of driver who waits.</li>
        <li style={GS.li}><strong>Food:</strong> set up and run the meal train (<a href="https://www.mealtrain.com/" style={GS.link}>Meal Train</a> exists for this) so meals arrive coordinated, not in a pile.</li>
        <li style={GS.li}><strong>Communication:</strong> be the friend who posts updates when they can't, on <a href="https://www.caringbridge.org/" style={GS.link}>CaringBridge</a> or in the group chat, so they don't repeat hard news twenty times.</li>
        <li style={GS.li}><strong>Noise filtering:</strong> volunteer to field the flood of miracle-cure suggestions and articles from well-meaning acquaintances, so they never see them.</li>
        <li style={GS.li}><strong>Errands:</strong> pharmacy runs, laundry, dog walks, the small recurring things that don't pause for cancer.</li>
      </ul>

      <h2 style={GS.h2}>Show up late, on purpose</h2>
      <p style={GS.p}>
        A lot of people will show up at the start of treatment. Fewer at the midpoint,
        when it's hardest. It's not that people don't care; they just get busy with
        their lives. So be deliberate: put reminders in your calendar for month three
        and month six. Recovery and the fear of recurrence run long after the
        casseroles stop. The friend still checking in at month eight is doing
        something rare.
      </p>

      <h2 style={GS.h2}>Visits: follow their energy</h2>
      <p style={GS.p}>
        I'm usually a very social person, and I lost the capacity to hold space for
        others during treatment. I found visitors exhausting in my first round and
        welcomed them in my second. It varies, week to week and person to person.
        Be available in case they want company, don't push for it, and when you do
        visit, remember they can't entertain you. Sometimes the best visit is sitting
        quietly in the same room while they rest.
      </p>

      <h2 style={GS.h2}>If you feel useless, you're doing it right</h2>
      <p style={GS.p}>
        You cannot fix this, and standing next to something unfixable feels terrible.
        But helping helps the helper too: showing up gives you a way to be close and
        a sense of purpose at a time when everyone feels powerless. You don't need to
        make it better. You need to make it less alone. If you're stuck on the words
        part, that's its own page:{" "}
        <Link href="/navigate/cancer/what-to-say" style={GS.link}>What to Say to Someone With Cancer</Link>.
      </p>
    </GuideShell>
  );
}
