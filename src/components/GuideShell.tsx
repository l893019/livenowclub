import Link from "next/link";
import Header from "@/components/Header";
import { GuideInfo, GuideFaq, guideJsonLd } from "@/lib/guides";

// Shared template for practical guide pages (/navigate/cancer/<slug>).
// Guides are visually and structurally distinct from essays: labeled as
// practical references, plain layout, and a standing note pointing to
// /read for the actual writing.

export const GS = {
  wrap: { maxWidth: "720px", margin: "0 auto", padding: "0 20px 80px" } as const,
  h2: { fontSize: "1.6rem", fontWeight: 400, color: "#2d2a26", margin: "48px 0 16px", letterSpacing: "-0.01em" } as const,
  h3: { fontSize: "1.15rem", fontWeight: 500, color: "#2d2a26", margin: "28px 0 10px" } as const,
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

export default function GuideShell({
  guide,
  faqs,
  children,
  goDeeper,
}: {
  guide: GuideInfo;
  faqs: GuideFaq[];
  children: React.ReactNode;
  goDeeper: React.ReactNode;
}) {
  return (
    <>
      {guideJsonLd(guide, faqs).map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}

      <Header />

      <div className="navigate-container">
        <div className="navigate-breadcrumb">
          <Link href="/navigate/cancer">← Back to the Cancer Guide</Link>
        </div>

        <section className="navigate-hero">
          <span className="navigate-label">Practical Guide</span>
          <h1>{guide.title}</h1>
          <p>{guide.tagline}</p>
        </section>

        <article style={GS.wrap}>
          <p style={{ ...GS.p, fontSize: "0.9rem", color: "rgba(45, 42, 38, 0.55)", borderBottom: "1px solid rgba(45, 42, 38, 0.12)", paddingBottom: "16px" }}>
            This is a practical reference page, distilled from my essays into plain
            language so it's easy to find and use. For the writing itself, start{" "}
            <Link href="/read" style={GS.link}>here</Link>.
          </p>

          {children}

          <h2 style={GS.h2}>Common questions</h2>
          <div>
            {faqs.map((faq) => (
              <details key={faq.question} style={{ borderBottom: "1px solid rgba(45, 42, 38, 0.12)", padding: "16px 0" }}>
                <summary style={{ cursor: "pointer", fontSize: "1.05rem", fontWeight: 500, color: "#2d2a26" }}>
                  {faq.question}
                </summary>
                <p style={{ ...GS.p, marginTop: "12px" }}>{faq.answer}</p>
              </details>
            ))}
          </div>

          <h2 style={GS.h2}>Go deeper</h2>
          <ul style={{ paddingLeft: "20px" }}>{goDeeper}</ul>

          <p style={{ ...GS.p, marginTop: "36px", fontStyle: "italic", color: "rgba(45, 42, 38, 0.6)" }}>
            This page is lived experience, not medical advice. I'm a survivor, not a
            doctor. For medical decisions, lean on your care team.
          </p>
        </article>
      </div>
    </>
  );
}
