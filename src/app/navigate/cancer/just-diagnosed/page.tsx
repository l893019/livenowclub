import Link from "next/link";
import GuideShell, { GS } from "@/components/GuideShell";
import { getGuide, guideMetadata, GuideFaq } from "@/lib/guides";

const guide = getGuide("just-diagnosed");

export const metadata = guideMetadata(guide);

const FAQS: GuideFaq[] = [
  {
    question: "Should I get a second opinion after a cancer diagnosis?",
    answer:
      "Cancer care is standardized nationwide based on the grading of your cancer, but doctors can interpret scans differently if you're borderline, and small liberties in the treatment process are life-changing. A second opinion is reasonable and common. One practical tip: get the actual slides from the lab, not just the report, so other hospitals can review quickly.",
  },
  {
    question: "How do I choose a hospital for cancer treatment?",
    answer:
      "Start where you'd want to end up: the best possible care for your specific cancer, in case anything goes wrong. Call the main line on hospital websites to set up consultations. And if you can, choose a hospital with a cancer-specific ER. Not all have one, and it makes a massive difference if you need it.",
  },
  {
    question: "Should I look at cancer survival statistics?",
    answer:
      "No. Do not go down a Google rabbit hole, and do not look at statistics. You are not a number. Statistics are averages of other people's stories, with other bodies, other timing, and other care. It's worth being realistic about what you're facing, but do not let a number define you.",
  },
  {
    question: "How do I tell people I have cancer?",
    answer:
      "On your terms, with a system. Decide how you'll deliver updates, who gets the private version, and what you need from people. I used public writing for broad updates and a private group for friends, with an FAQ doc for the questions I didn't want to keep answering. And designate a friend who can post updates when you can't. People can't show up for you if you don't tell them what's happening.",
  },
  {
    question: "What about clinical trials?",
    answer:
      "Be realistic about timing. Most trials aren't available unless you've failed standard-of-care treatment first, and compassionate use or mutation-targeted options typically come later, once your team knows how your cancer responds. Standard of care is usually the fastest path to controlling the disease, and it's what qualifies you for anything more cutting-edge afterward.",
  },
];

export default function JustDiagnosedPage() {
  return (
    <GuideShell
      guide={guide}
      faqs={FAQS}
      goDeeper={
        <>
          <li style={GS.li}>
            <Link href="/read/expecting-the-unexpected" style={GS.link}>Expecting the Unexpected</Link>: the
            complete guide, from care team through survivorship.{" "}
            <a href="/expecting-the-unexpected-guide.pdf" style={GS.link}>Free PDF here</a>.
          </li>
          <li style={GS.li}>
            <Link href="/read/embracing-free-fall" style={GS.link}>Embracing Free Fall</Link>: what
            I wrote the week I was diagnosed.
          </li>
          <li style={GS.li}>
            <Link href="/navigate/cancer/how-to-prepare-for-chemo" style={GS.link}>How to Prepare for Chemotherapy</Link>: the
            next page to read once your treatment plan exists.
          </li>
        </>
      }
    >
      <p style={GS.p}>
        If you were just diagnosed, I'm sorry you're here, and I'm glad you found this.
        I was diagnosed at 34. I didn't know what to ask, what to prepare for, or how
        to let people help me. This page is the short version of what I'd tell you over
        coffee: the handful of moves that matter in the first weeks, in order. You do
        not have to figure out everything today.
      </p>

      <h2 style={GS.h2}>1. Build your care team</h2>
      <p style={GS.p}>
        Cancer staging and protocols are universal, but doctors take small, and
        life-changing, liberties through the treatment process. It's an art, not just
        a science. So start where you'd want to end up: the best possible hospital and
        doctors for your specific cancer. We moved cities for mine. You may not need
        to go that far, but take the choice seriously.
      </p>
      <ul style={{ paddingLeft: "20px" }}>
        <li style={GS.li}>Call the main phone line on hospital websites to set up consultations. That's genuinely how it works.</li>
        <li style={GS.li}>Prefer a hospital with a cancer-specific ER. It makes a massive difference if you end up needing it.</li>
        <li style={GS.li}>Consider a second opinion, especially if your case is borderline. Get the actual slides from the lab to speed up review elsewhere.</li>
        <li style={GS.li}>Be realistic about clinical trials and concierge medicine. Most trials only open up after standard of care, and standard of care is usually the fastest path to controlling the disease.</li>
      </ul>

      <h2 style={GS.h2}>2. Designate your advocate</h2>
      <p style={GS.p}>
        You need one person who is with you at every appointment. I found it very
        difficult to process or remember anything doctors said in the room. Your
        advocate takes notes, tracks the treatment plan, and ideally helps manage
        medications. My mom played this role for me. Some hospitals also offer patient
        advocates as a service. Then line up backup roles behind them: who handles
        rides, who runs the meal train, who does pharmacy runs.
      </p>

      <h2 style={GS.h2}>3. Find a mentor with your cancer type</h2>
      <p style={GS.p}>
        Someone a year or two ahead of you, with your diagnosis, is worth more than a
        hundred web pages. We were lucky to know a few people who'd been through
        cervical cancer, and trading notes with them shaped decisions no pamphlet
        covered. If you don't know anyone,{" "}
        <a href="https://imermanangels.org/" style={GS.link}>Imerman Angels</a> matches
        you with a mentor who had your cancer, free.
      </p>

      <h2 style={GS.h2}>4. Reduce the information coming in</h2>
      <p style={GS.p}>
        There is a LOT of noise out there: alternative treatments, miracle cures,
        terrifying statistics. Protect your mind like it's part of the treatment plan,
        because it is.
      </p>
      <ul style={{ paddingLeft: "20px" }}>
        <li style={GS.li}>Do not go down a Google rabbit hole, and do not look at statistics. You are not a number.</li>
        <li style={GS.li}>Designate one friend or family member to field the miracle-cure suggestions that will pour in, or set up a separate email account to collect them.</li>
        <li style={GS.li}>Chemotherapy and radiation may be barbaric, but they are effective, proven therapies. The intriguing new thing is usually not available until standard treatment has been tried anyway.</li>
        <li style={GS.li}>Take a break from social media and the news. I cut out almost everything that wasn't about getting better, and it helped a lot.</li>
      </ul>

      <h2 style={GS.h2}>5. Plan how information flows out</h2>
      <p style={GS.p}>
        My first instinct was to handle it alone. I'm strong enough, I've been sick
        before, I can handle this. Here's what I learned instead: it could be much
        harder than you expect, people don't know how to show up for you if you don't
        tell them, and helping helps the helper. Letting people in gives them purpose
        at a time when everyone around you feels powerless.
      </p>
      <p style={GS.p}>
        So build a simple system before you're too tired to. Decide how you'll deliver
        updates and who gets which version. I used public writing for broad updates
        and a private WhatsApp community for friends, with an announcements channel,
        a photos-only "moments of joy" channel, and a shared FAQ doc for the questions
        I didn't want to keep answering. Ask a friend to post updates when you can't.
        And plan for continuity: everyone shows up at the start, so frequent updates
        are how people stay with you at the midpoint, when you'll need them most.
      </p>

      <h2 style={GS.h2}>What you don't have to do yet</h2>
      <p style={GS.p}>
        You don't have to understand your whole prognosis, respond to every message,
        decide how brave you're going to be, or have a philosophy about any of this.
        Those come later, if at all. Build the team, protect your head, set up the
        support. That's the whole first assignment.
      </p>
    </GuideShell>
  );
}
