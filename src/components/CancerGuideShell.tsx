"use client";

import Link from "next/link";
import Header from "./Header";
import { useScrollDepth } from "@/hooks/useScrollDepth";
import { GUIDE_BASE, GUIDE_PDF } from "@/lib/cancer-guide-paths";

export type GuideNavItem = { slug: string; number: number; title: string; sections?: { id: string; title: string }[] };

type Props = {
  page: string; // path for scroll tracking
  label: string;
  title: string;
  lead?: string;
  bodyHtml: string;
  parts: GuideNavItem[];
  currentSlug?: string;
  prev?: GuideNavItem | null;
  next?: GuideNavItem | null;
  showContentsBlock?: boolean; // full contents on the index page
};

export default function CancerGuideShell({ page, label, title, lead, bodyHtml, parts, currentSlug, prev, next, showContentsBlock }: Props) {
  useScrollDepth(page);
  const current = parts.find((p) => p.slug === currentSlug);

  return (
    <>
      <Header />
      <div className="navigate-container">
        <div className="navigate-breadcrumb">
          <Link href="/navigate/cancer">← Back</Link>
        </div>

        <section className="navigate-hero guide-hero">
          <span className="navigate-label">{label}</span>
          <h1>{title}</h1>
          {lead && <p>{lead}</p>}
        </section>

        <div className="guide-wrap">
          {current && (
            <details className="guide-contents guide-contents--inline">
              <summary>Contents</summary>
              <ol>
                {parts.map((p) => (
                  <li key={p.slug} className={p.slug === currentSlug ? "is-current" : undefined}>
                    <Link href={`${GUIDE_BASE}/${p.slug}`}>{p.title}</Link>
                    {p.slug === currentSlug && p.sections && p.sections.length > 0 && (
                      <ul>
                        {p.sections.map((s) => (
                          <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </details>
          )}

          <article className="essay-content guide-body" dangerouslySetInnerHTML={{ __html: `<p>${bodyHtml}</p>` }} />

          {showContentsBlock && (
            <section className="guide-contents guide-contents--full" aria-label="Contents">
              <h2>Contents</h2>
              <ol>
                {parts.map((p) => (
                  <li key={p.slug}>
                    <Link href={`${GUIDE_BASE}/${p.slug}`} className="guide-contents-part">
                      <span className="guide-contents-num">{String(p.number).padStart(2, "0")}</span>
                      <span>{p.title}</span>
                    </Link>
                    {p.sections && p.sections.length > 0 && (
                      <ul>
                        {p.sections.map((s) => (
                          <li key={s.id}><Link href={`${GUIDE_BASE}/${p.slug}#${s.id}`}>{s.title}</Link></li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
              <p className="guide-pdf"><a href={GUIDE_PDF} target="_blank" rel="noopener noreferrer">Download the PDF</a></p>
            </section>
          )}

          {current && (
            <nav className="guide-pager" aria-label="Chapters">
              <div className="guide-pager-links">
                {prev ? <Link href={`${GUIDE_BASE}/${prev.slug}`} className="guide-pager-prev">← {prev.title}</Link> : <span />}
                {next ? <Link href={`${GUIDE_BASE}/${next.slug}`} className="guide-pager-next">{next.title} →</Link> : <span />}
              </div>
              <p className="guide-pager-home"><Link href={GUIDE_BASE}>Contents</Link> · <a href={GUIDE_PDF} target="_blank" rel="noopener noreferrer">PDF</a></p>
            </nav>
          )}
        </div>
      </div>

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
        .guide-hero { margin-bottom: 40px; }
        .guide-wrap { max-width: 780px; margin: 0 auto; }
        .guide-body { font-size: 18px; line-height: 1.75; color: rgba(45, 42, 38, 0.78); }
        .guide-body :global(p) { margin-bottom: 1.25em; }
        .guide-body :global(h2) { font-size: 1.35rem; font-weight: 400; margin: 2.25rem 0 1rem; color: #2d2a26; scroll-margin-top: 90px; }
        .guide-body :global(h3) { font-size: 1.15rem; font-weight: 400; margin: 1.75rem 0 0.75rem; color: #2d2a26; scroll-margin-top: 90px; }
        .guide-body :global(blockquote) { font-size: 0.95rem; border-left: 2px solid #e8178a; padding: 12px 0 12px 16px; margin: 20px 0; color: #2d2a26; background: rgba(232, 23, 138, 0.02); border-radius: 0 4px 4px 0; line-height: 1.6; }
        .guide-body :global(hr) { border: none; border-top: 1px solid rgba(45, 42, 38, 0.1); margin: 2rem 0; }
        .guide-body :global(strong) { font-weight: 500; color: #e8178a; }
        .guide-body :global(em) { font-style: italic; color: rgba(45, 42, 38, 0.8); }
        .guide-body :global(a) { color: #2d7a7a; text-decoration: underline; text-underline-offset: 3px; }
        .guide-body :global(ul), .guide-body :global(ol) { margin: 1.25em 0; padding-left: 1.5em; }
        .guide-body :global(ul) { list-style-type: disc; }
        .guide-body :global(ol) { list-style-type: decimal; }
        .guide-body :global(li) { margin-bottom: 0.5em; line-height: 1.75; }

        .guide-contents { font-size: 0.95rem; color: rgba(45, 42, 38, 0.8); }
        .guide-contents ol { list-style: none; padding: 0; margin: 0; }
        .guide-contents ul { list-style: none; padding: 0 0 0 1.5em; margin: 6px 0 10px; }
        .guide-contents li { margin: 0; }
        .guide-contents a { color: #2d2a26; text-decoration: none; }
        .guide-contents a:hover { color: #e8178a; }
        .guide-contents ul a { color: rgba(45, 42, 38, 0.6); }

        .guide-contents--inline { margin: 0 0 32px; padding: 12px 16px; border: 1px solid rgba(45, 42, 38, 0.12); border-radius: 4px; }
        .guide-contents--inline summary { cursor: pointer; font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(45, 42, 38, 0.6); }
        .guide-contents--inline ol { margin-top: 12px; }
        .guide-contents--inline > ol > li { padding: 6px 0; }
        .guide-contents--inline li.is-current > a { color: #e8178a; }

        .guide-contents--full { margin-top: 48px; padding-top: 32px; border-top: 1px solid rgba(45, 42, 38, 0.1); }
        .guide-contents--full h2 { font-size: 1.35rem; font-weight: 400; margin: 0 0 1rem; color: #2d2a26; }
        .guide-contents--full > ol > li { padding: 10px 0; border-bottom: 1px solid rgba(45, 42, 38, 0.08); }
        .guide-contents-part { display: flex; gap: 14px; align-items: baseline; font-size: 1.15rem; }
        .guide-contents-num { font-family: var(--font-sans); font-size: 11px; letter-spacing: 0.2em; color: #e8178a; min-width: 28px; flex: none; }
        .guide-pdf { margin-top: 20px; font-size: 0.95rem; }
        .guide-pdf a { color: #2d7a7a; text-decoration: underline; text-underline-offset: 3px; }

        .guide-pager { margin-top: 48px; padding-top: 24px; border-top: 1px solid rgba(45, 42, 38, 0.1); font-size: 0.95rem; }
        .guide-pager-links { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
        .guide-pager-links a { color: #2d2a26; text-decoration: none; max-width: 48%; }
        .guide-pager-links a:hover { color: #e8178a; }
        .guide-pager-next { text-align: right; margin-left: auto; }
        .guide-pager-home { margin-top: 16px; color: rgba(45, 42, 38, 0.6); }
        .guide-pager-home a { color: rgba(45, 42, 38, 0.7); text-decoration: none; }
        .guide-pager-home a:hover { color: #e8178a; }
        @media (max-width: 600px) {
          .guide-body { font-size: 17px; }
          .guide-pager-links a { max-width: 100%; }
          .guide-pager-next { margin-left: 0; text-align: left; }
        }
      `}</style>
    </>
  );
}
