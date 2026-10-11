"use client";

import Link from "next/link";
import Header from "./Header";
import { useScrollDepth } from "@/hooks/useScrollDepth";
import { GUIDE_BASE, GUIDE_PDF } from "@/lib/cancer-guide-paths";

export type GuideNavItem = { slug: string; number: number; title: string; sections?: { id: string; title: string }[] };

type Props = {
  page: string;
  label: string;
  title: string;
  bodyHtml: string;
  parts: GuideNavItem[];
  currentSlug?: string;
  prev?: GuideNavItem | null;
  next?: GuideNavItem | null;
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function CancerGuideShell({ page, label, title, bodyHtml, parts, currentSlug, prev, next }: Props) {
  useScrollDepth(page);
  const current = parts.find((p) => p.slug === currentSlug);
  const isIndex = !current;

  return (
    <>
      <Header />
      <div className="navigate-container guide-page">
        <div className="navigate-breadcrumb">
          <Link href="/navigate/cancer">← Back</Link>
        </div>

        <section className="navigate-hero guide-hero">
          {isIndex ? (
            <span className="navigate-label">{label}</span>
          ) : (
            <Link href={GUIDE_BASE} className="navigate-label guide-label-link">{label}</Link>
          )}
          <h1>{title}</h1>
        </section>

        <div className="guide-wrap">
          {/* Index: chapter list first, intro after */}
          {isIndex && (
            <nav className="guide-chapters" aria-label="Chapters">
              <ol>
                {parts.map((p) => (
                  <li key={p.slug}>
                    <Link href={`${GUIDE_BASE}/${p.slug}`}>
                      <span className="guide-chapters-num">{pad(p.number)}</span>
                      <span className="guide-chapters-title">{p.title}</span>
                      <span className="guide-chapters-arrow">→</span>
                    </Link>
                  </li>
                ))}
              </ol>
              <p className="guide-pdf">
                Prefer paper? <a href={GUIDE_PDF} target="_blank" rel="noopener noreferrer">Download the PDF</a>
              </p>
            </nav>
          )}

          {/* Chapter: what's in it, always visible */}
          {current && current.sections && current.sections.length > 0 && (
            <nav className="guide-inthis" aria-label="In this chapter">
              <p className="guide-inthis-label">In this chapter</p>
              <ol>
                {current.sections.map((s) => (
                  <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
                ))}
              </ol>
            </nav>
          )}

          <article className="guide-body" dangerouslySetInnerHTML={{ __html: `<p>${bodyHtml}</p>` }} />

          {current && (
            <nav className="guide-pager" aria-label="Chapters">
              {next && (
                <Link href={`${GUIDE_BASE}/${next.slug}`} className="guide-pager-card guide-pager-card--next">
                  <span className="guide-pager-kicker">Next · Part {next.number} of {parts.length}</span>
                  <span className="guide-pager-title">{next.title} →</span>
                </Link>
              )}
              {prev && (
                <Link href={`${GUIDE_BASE}/${prev.slug}`} className="guide-pager-card">
                  <span className="guide-pager-kicker">Previous · Part {prev.number} of {parts.length}</span>
                  <span className="guide-pager-title">← {prev.title}</span>
                </Link>
              )}
              <ol className="guide-pager-all">
                {parts.map((p) => (
                  <li key={p.slug} className={p.slug === currentSlug ? "is-current" : undefined}>
                    <Link href={`${GUIDE_BASE}/${p.slug}`}><span className="guide-chapters-num">{pad(p.number)}</span>{p.title}</Link>
                  </li>
                ))}
              </ol>
              <p className="guide-pdf"><a href={GUIDE_PDF} target="_blank" rel="noopener noreferrer">Download the PDF</a></p>
            </nav>
          )}
        </div>
      </div>

      {/* Phone-only chapter bar */}
      {current && (
        <nav className="guide-bar" aria-label="Chapter navigation">
          {prev ? <Link href={`${GUIDE_BASE}/${prev.slug}`}>← Previous</Link> : <span />}
          <Link href={GUIDE_BASE}>Contents</Link>
          {next ? <Link href={`${GUIDE_BASE}/${next.slug}`}>Next →</Link> : <span />}
        </nav>
      )}

      <footer className="footer">
        <p className="footer-quote">What if now is all we have?</p>
        <nav className="footer-nav">
          <Link href="/read">Read</Link>
          <Link href="/navigate">Navigate</Link>
          <Link href="/wonder">Wonder</Link>
          <Link href="/connect">Connect</Link>
        </nav>
        <p className="footer-copy">&copy; 2026 Louise Ireland</p>
      </footer>

      <style jsx>{`
        .guide-hero { margin-bottom: 28px; }
        .guide-hero h1 { margin-bottom: 0; }
        .guide-label-link { text-decoration: none; }
        .guide-wrap { max-width: 720px; margin: 0 auto; }

        /* Index chapter list */
        .guide-chapters ol { list-style: none; margin: 0 0 40px; padding: 0; border-top: 1px solid rgba(45, 42, 38, 0.12); }
        .guide-chapters li { border-bottom: 1px solid rgba(45, 42, 38, 0.12); }
        .guide-chapters ol a { display: flex; align-items: baseline; gap: 16px; padding: 18px 4px; color: #2d2a26; text-decoration: none; font-size: 1.2rem; }
        .guide-chapters ol a:hover .guide-chapters-title { color: #e8178a; }
        .guide-chapters-num { font-family: var(--font-sans); font-size: 11px; letter-spacing: 0.2em; color: #e8178a; min-width: 28px; flex: none; }
        .guide-chapters-title { flex: 1; }
        .guide-chapters-arrow { color: rgba(45, 42, 38, 0.4); flex: none; }
        .guide-pdf { font-size: 0.95rem; color: rgba(45, 42, 38, 0.65); margin: 0 0 8px; }
        .guide-pdf a { color: #2d7a7a; text-decoration: underline; text-underline-offset: 3px; }

        /* In this chapter */
        .guide-inthis { margin: 0 0 36px; padding: 16px 18px; background: rgba(45, 42, 38, 0.035); border-radius: 4px; }
        .guide-inthis-label { font-family: var(--font-sans); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(45, 42, 38, 0.55); margin: 0 0 10px; }
        .guide-inthis ol { list-style: none; margin: 0; padding: 0; columns: 2; column-gap: 24px; }
        .guide-inthis li { break-inside: avoid; padding: 4px 0; font-size: 0.95rem; line-height: 1.4; }
        .guide-inthis a { color: #2d2a26; text-decoration: none; }
        .guide-inthis a:hover { color: #e8178a; }

        /* Body typography */
        .guide-body { font-size: 17px; line-height: 1.7; color: rgba(45, 42, 38, 0.8); }
        .guide-body :global(p) { margin: 0 0 1.1em; }
        .guide-body :global(h2) { font-size: 1.5rem; font-weight: 500; line-height: 1.25; margin: 2.5em 0 0.6em; padding-top: 1.2em; border-top: 1px solid rgba(45, 42, 38, 0.12); color: #2d2a26; scroll-margin-top: 96px; }
        .guide-body :global(h2:first-child), .guide-body :global(p:first-child + h2) { margin-top: 0; padding-top: 0; border-top: none; }
        .guide-body :global(h3) { font-size: 1.12rem; font-weight: 500; line-height: 1.3; margin: 1.8em 0 0.5em; color: #2d2a26; scroll-margin-top: 96px; }
        .guide-body :global(h3.g-principle) { font-size: 1rem; letter-spacing: 0.04em; margin: 1.6em 0 0.6em; }
        .guide-body :global(p.g-label) { font-family: var(--font-sans); font-size: 11.5px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(45, 42, 38, 0.55); margin: 1.8em 0 0.5em; }
        .guide-body :global(p.g-note) { font-style: italic; color: rgba(45, 42, 38, 0.7); border-left: 2px solid rgba(232, 23, 138, 0.5); padding: 2px 0 2px 14px; margin: 0.6em 0 1.4em; }
        .guide-body :global(hr) { border: none; border-top: 1px solid rgba(45, 42, 38, 0.1); margin: 2rem 0; }
        .guide-body :global(hr.g-dots) { border: none; text-align: center; margin: 2.2em 0; height: 1em; }
        .guide-body :global(hr.g-dots::after) { content: "• • •"; color: rgba(45, 42, 38, 0.35); letter-spacing: 0.4em; font-size: 0.8em; }
        .guide-body :global(blockquote) { font-size: 0.95rem; border-left: 2px solid #e8178a; padding: 12px 0 12px 16px; margin: 20px 0; color: #2d2a26; background: rgba(232, 23, 138, 0.02); border-radius: 0 4px 4px 0; line-height: 1.6; }
        .guide-body :global(strong) { font-weight: 500; color: #2d2a26; }
        .guide-body :global(em) { font-style: italic; }
        .guide-body :global(a) { color: #2d7a7a; text-decoration: underline; text-underline-offset: 3px; }
        .guide-body :global(ul), .guide-body :global(ol) { margin: 0.4em 0 1.2em; padding-left: 1.25em; }
        .guide-body :global(ul) { list-style-type: disc; }
        .guide-body :global(ol) { list-style-type: decimal; }
        .guide-body :global(li) { margin-bottom: 0.45em; line-height: 1.6; padding-left: 2px; }

        /* Chapter pager */
        .guide-pager { margin-top: 56px; padding-top: 28px; border-top: 1px solid rgba(45, 42, 38, 0.12); }
        .guide-pager-card { display: block; padding: 16px 18px; margin-bottom: 12px; border: 1px solid rgba(45, 42, 38, 0.14); border-radius: 4px; text-decoration: none; color: #2d2a26; }
        .guide-pager-card--next { border-color: rgba(232, 23, 138, 0.45); }
        .guide-pager-card:hover { border-color: #e8178a; }
        .guide-pager-kicker { display: block; font-family: var(--font-sans); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(45, 42, 38, 0.55); margin-bottom: 6px; }
        .guide-pager-title { display: block; font-size: 1.15rem; line-height: 1.3; }
        .guide-pager-all { list-style: none; margin: 28px 0 12px; padding: 0; border-top: 1px solid rgba(45, 42, 38, 0.12); }
        .guide-pager-all li { border-bottom: 1px solid rgba(45, 42, 38, 0.1); }
        .guide-pager-all a { display: flex; gap: 14px; align-items: baseline; padding: 10px 4px; color: rgba(45, 42, 38, 0.75); text-decoration: none; font-size: 1rem; }
        .guide-pager-all li.is-current a { color: #2d2a26; font-weight: 500; }
        .guide-pager-all a:hover { color: #e8178a; }

        /* Phone-only bottom bar */
        .guide-bar { display: none; }
        @media (max-width: 700px) {
          .guide-page { padding-bottom: 96px; }
          .guide-inthis ol { columns: 1; }
          .guide-bar { position: fixed; left: 0; right: 0; bottom: 0; z-index: 90; display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 12px 20px calc(12px + env(safe-area-inset-bottom, 0px)); background: rgba(250, 248, 244, 0.96); backdrop-filter: blur(8px); border-top: 1px solid rgba(45, 42, 38, 0.12); font-family: var(--font-sans); font-size: 13px; letter-spacing: 0.04em; }
          .guide-bar a { color: #2d2a26; text-decoration: none; }
          .guide-bar > * { flex: 1; } .guide-bar > :nth-child(2) { text-align: center; } .guide-bar > :last-child { text-align: right; }
          .guide-bar a:nth-child(2) { color: rgba(45, 42, 38, 0.55); letter-spacing: 0.14em; text-transform: uppercase; font-size: 11px; }
        }
      `}</style>
    </>
  );
}
