import Link from "next/link";
import Header from "@/components/Header";

export const metadata = {
  title: "What to Say to Someone With Cancer — From a Survivor | The Live Now Club",
  description:
    "What to say to someone with cancer, what not to say, and what to do when words fail — practical guidance from a cancer survivor. Real phrases that help, the common sayings that hurt, and why showing up matters more than saying the perfect thing.",
  alternates: {
    canonical: "https://livenowclub.com/navigate/cancer/what-to-say",
  },
  openGraph: {
    title: "What to Say to Someone With Cancer — From a Survivor",
    description:
      "Real phrases that help, the common sayings that hurt, and what to do when words fail. Written by a cancer survivor.",
    type: "article",
    url: "https://livenowclub.com/navigate/cancer/what-to-say",
    siteName: "The Live Now Club",
    images: [{ url: "https://livenowclub.com/images/fixing-the-unfixable.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What to Say to Someone With Cancer — From a Survivor",
    description: "Real phrases that help, the common sayings that hurt, and what to do when words fail.",
    images: ["https://livenowclub.com/images/fixing-the-unfixable.jpg"],
  },
};

const FAQS = [
  {
    question: "What is the best thing to say to someone diagnosed with cancer?",
    answer:
      "Simple presence beats clever words: “I love you. I’m here.” “I’m thinking of you every day.” “I don’t know what to say, but I want to be with you in this.” You are not trying to solve anything — you are keeping them company inside something unsolvable.",
  },
  {
    question: "What should you not say to someone with cancer?",
    answer:
      "Avoid silver linings (“at least…”), miracle cures, other people’s cancer stories, and “you’re a fighter” or “you’ve got this” — survival is not a matter of willpower, and that framing makes dying feel like failure. Don’t ask how it happened, and don’t ask how treatment is going; they often don’t know for weeks or months.",
  },
  {
    question: "What can I do for a cancer patient besides talking?",
    answer:
      "Be specific and consistent. A weekly “thinking of you, no response needed” text. “Can I take something off your plate this week?” instead of “let me know if you need anything.” Handle a logistics job — a ride to an appointment, a meal drop-off — without making them coordinate it. And keep showing up after the crisis fades, when everyone else has moved on.",
  },
  {
    question: "Should I visit someone going through chemotherapy?",
    answer:
      "Follow their energy, not yours. Be available in case they want a visit, but don’t push for one — treatment is exhausting and they won’t have the energy to entertain. Don’t be offended by silence or a “no”; thoughtfulness and consistency mean the world even when they can’t respond.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What to Say to Someone With Cancer — From a Survivor",
  description:
    "What to say, what not to say, and what to do when words fail — practical guidance from a cancer survivor.",
  url: "https://livenowclub.com/navigate/cancer/what-to-say",
  datePublished: "2026-07-07",
  dateModified: "2026-07-07",
  author: {
    "@type": "Person",
    name: "Louise Ireland",
    description: "Cancer survivor and author of The Live Now Club",
    url: "https://livenowclub.com/about",
  },
  publisher: {
    "@type": "Organization",
    name: "The Live Now Club",
    url: "https://livenowclub.com",
  },
  image: "https://livenowclub.com/images/fixing-the-unfixable.jpg",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Cancer Guide", item: "https://livenowclub.com/navigate/cancer" },
    { "@type": "ListItem", position: 2, name: "What to Say to Someone With Cancer", item: "https://livenowclub.com/navigate/cancer/what-to-say" },
  ],
};

// Shared inline styles for the article layout
const S = {
  wrap: { maxWidth: "720px", margin: "0 auto", padding: "0 20px 80px" } as const,
  h2: { fontSize: "1.6rem", fontWeight: 400, color: "#2d2a26", margin: "48px 0 16px", letterSpacing: "-0.01em" } as const,
  p: { lineHeight: 1.75, color: "rgba(45, 42, 38, 0.85)", margin: "0 0 18px", fontSize: "1.05rem" } as const,
  li: { lineHeight: 1.7, color: "rgba(45, 42, 38, 0.85)", margin: "0 0 12px", fontSize: "1.05rem" } as const,
  say: { fontStyle: "italic", color: "#2d2a26" } as const,
  quote: {
    borderLeft: "2px solid rgba(232, 23, 138, 0.4)",
    padding: "4px 0 4px 20px",
    margin: "28px 0",
    fontStyle: "italic",
    color: "rgba(45, 42, 38, 0.75)",
    lineHeight: 1.7,
  } as const,
  link: { color: "#2d7a7a", textDecoration: "underline", textUnderlineOffset: "3px" } as const,
};

export default function WhatToSayPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <Header />

      <div className="navigate-container">
        <div className="navigate-breadcrumb">
          <Link href="/navigate/cancer">← Back to the Cancer Guide</Link>
        </div>

        <section className="navigate-hero">
          <span className="navigate-label">From the Cancer Guide</span>
          <h1>What to Say to Someone With Cancer</h1>
          <p>
            The phrases that help, the ones that hurt, and what to do when there are
            no words — from someone who has been on the receiving end of all of them.
          </p>
        </section>

        <article style={S.wrap}>
          <p style={S.p}>
            Someone you love has cancer, and you are terrified of saying the wrong thing.
            Maybe you’ve already typed a message and deleted it three times. Maybe you’ve
            gone quiet, telling yourself you’ll reach out when you know what to say.
          </p>
          <p style={S.p}>
            I was diagnosed with cancer at 34, and over two rounds of treatment I heard
            every version of what people say when they don’t know what to say. I wrote
            this page for the people around a patient — the friends, family, and coworkers
            who want to help and are afraid of doing it badly. It’s drawn from two longer
            pieces:{" "}
            <Link href="/read/fixing-the-unfixable" style={S.link}>Fixing the Unfixable</Link>,
            on why these conversations are so hard, and my{" "}
            <Link href="/read/expecting-the-unexpected" style={S.link}>complete cancer guide</Link>,
            which has a full section for caregivers.
          </p>

          <h2 style={S.h2}>First: you cannot fix this, and you don’t have to</h2>
          <p style={S.p}>
            Almost every problem in life rewards action. Someone is hungry, you feed them;
            someone is in pain, you find medicine. So when someone you love gets cancer,
            every instinct says <em>do something, say the thing that makes it better</em>.
            But serious illness belongs to a different category — the unfixable kind —
            and the usual calculus doesn’t apply. That mismatch is why so many well-meant
            words land wrong: they’re attempts to fix something that cannot be fixed,
            and the patient can feel the difference immediately.
          </p>
          <blockquote style={S.quote}>
            “There is nothing you can say that will solve it. But there is much you can
            say that will keep someone company inside of it.”
            <br />— from <Link href="/read/fixing-the-unfixable" style={S.link}>Fixing the Unfixable</Link>
          </blockquote>
          <p style={S.p}>
            That’s the reframe that makes everything below make sense. Your job is not
            to fix. Your job is company.
          </p>

          <h2 style={S.h2}>What to say</h2>
          <ul style={{ paddingLeft: "20px" }}>
            <li style={S.li}><span style={S.say}>“I love you. I’m here.”</span></li>
            <li style={S.li}><span style={S.say}>“I’m thinking of you every day.”</span></li>
            <li style={S.li}><span style={S.say}>“I don’t know what to say, but I want to be with you in this.”</span> — Naming your own speechlessness is honest, and honesty is a relief.</li>
            <li style={S.li}><span style={S.say}>“I’m not going anywhere.”</span></li>
            <li style={S.li}><span style={S.say}>“You don’t have to be strong with me.”</span> — This one gives the patient permission to stop performing, which almost no one else offers them.</li>
            <li style={S.li}><span style={S.say}>“Can I take something off your plate this week?”</span> — Specific and answerable, unlike “let me know if you need anything.”</li>
            <li style={S.li}><span style={S.say}>“Do you want to talk about it, or should we talk about something else?”</span> — Let them steer.</li>
            <li style={S.li}>Something that will bring them joy — a photo from better times, a meme, a memory. It doesn’t have to be about the illness at all.</li>
            <li style={S.li}>Nothing. Sit with them and let them rest. Silence in good company is not awkward; it’s rest.</li>
          </ul>

          <h2 style={S.h2}>What not to say (and why)</h2>
          <ul style={{ paddingLeft: "20px" }}>
            <li style={S.li}><span style={S.say}>“At least…”</span> — Any sentence that starts this way minimizes what they’re living through. There is no silver lining they haven’t already searched for themselves.</li>
            <li style={S.li}><span style={S.say}>“Have you tried [miracle cure]?”</span> — They have a medical team. Unsolicited treatment advice adds pressure and implies they aren’t doing enough.</li>
            <li style={S.li}><span style={S.say}>“My [relative] had cancer and…”</span> — Every cancer, body, and outcome is different. Other people’s stories — good or bad endings — are weight, not comfort.</li>
            <li style={S.li}><span style={S.say}>“You’re a fighter.” “You’ve got this.” “You’re so strong.”</span> — This has nothing to do with strength. If survival is a matter of will, then dying becomes a failure — and the patient hears that implication even when you don’t intend it.</li>
            <li style={S.li}><span style={S.say}>“How did it happen?”</span> — Don’t ask for specifics unless they’re offered. Replaying the same story is traumatic, and the question hints they did something to deserve it.</li>
            <li style={S.li}><span style={S.say}>“How is treatment going?”</span> — They usually don’t know. Depending on the treatment, they may not know for weeks or months. The question forces them to either lie or hand you their fear.</li>
            <li style={S.li}><span style={S.say}>“You look great! How are you feeling?”</span> — This can be triggering mid-treatment. Try “It’s so nice to see you” or “It’s nice to be with you” instead.</li>
          </ul>

          <h2 style={S.h2}>What to do when words fail</h2>
          <p style={S.p}>
            The most valuable thing I received during treatment wasn’t a perfect sentence.
            It was consistency. A couple of friends sent a weekly{" "}
            <span style={S.say}>“thinking of you, no response needed”</span> text — sometimes
            with a photo of us in better times — and it made my day every single time.
            The “no response needed” part matters: it delivers love without creating a debt.
          </p>
          <p style={S.p}>
            Don’t be offended if you never get a reply. And don’t make them coordinate
            your help — take a whole job off their plate instead. Drive them to an
            appointment. Set up the meal train. Handle the pharmacy run. Be available
            for a visit without pushing for one, and follow their energy when you’re
            there: they won’t have the capacity to entertain, and being attuned to what
            they need — not what you need to give — is the whole skill.
          </p>
          <p style={S.p}>
            Most of all: keep showing up after the crisis fades. There is a flood of
            support at diagnosis, and then everyone’s life resumes. Treatment, recovery,
            and the fear of recurrence go on for months and years. The person still
            texting in month eight is the one who is actually saying something.
          </p>

          <h2 style={S.h2}>Hope, without the pressure</h2>
          <p style={S.p}>
            You don’t have to abandon hope to be honest — hope just changes shape.
            Instead of hope for a guaranteed outcome, hope for dignity. For moments of
            beauty. For pain to be held, not hidden. For not walking into the dark alone.
            When you stop insisting on a happy ending, you become the rare person the
            patient doesn’t have to protect — and unconditional presence, not conditional
            hope, is what actually keeps someone company.
          </p>

          <h2 style={S.h2}>Common questions</h2>
          <div>
            {FAQS.map((faq) => (
              <details key={faq.question} style={{ borderBottom: "1px solid rgba(45, 42, 38, 0.12)", padding: "16px 0" }}>
                <summary style={{ cursor: "pointer", fontSize: "1.05rem", fontWeight: 500, color: "#2d2a26" }}>
                  {faq.question}
                </summary>
                <p style={{ ...S.p, marginTop: "12px" }}>{faq.answer}</p>
              </details>
            ))}
          </div>

          <h2 style={S.h2}>Go deeper</h2>
          <ul style={{ paddingLeft: "20px" }}>
            <li style={S.li}>
              <Link href="/read/fixing-the-unfixable" style={S.link}>Fixing the Unfixable</Link> — the
              essay behind this page: why we say the wrong things, and what presence really means.
            </li>
            <li style={S.li}>
              <Link href="/read/expecting-the-unexpected" style={S.link}>Expecting the Unexpected</Link> — my
              complete practical cancer guide, with a full section for caregivers.{" "}
              <a href="/expecting-the-unexpected-guide.pdf" style={S.link}>Free PDF here</a>.
            </li>
            <li style={S.li}>
              <Link href="/navigate/cancer" style={S.link}>The Cancer Guide hub</Link> — everything
              on this site for patients, survivors, and the people who love them.
            </li>
          </ul>

          <p style={{ ...S.p, marginTop: "36px", fontStyle: "italic", color: "rgba(45, 42, 38, 0.6)" }}>
            This page is lived experience, not medical advice. I’m a survivor, not a
            doctor — for medical decisions, lean on your care team.
          </p>
        </article>
      </div>
    </>
  );
}
