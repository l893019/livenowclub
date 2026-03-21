import Link from "next/link";

export const metadata = {
  title: "Navigate | Lou's Guide to Cancer",
  description: "Everything I wish someone had told me. Practical guidance for navigating cancer and supporting those who are.",
};

export default function NavigatePage() {
  return (
    <>
      <Header />
      <main className="navigate-page">
        <div className="navigate-hero">
          <span className="section-label">Navigate</span>
          <h1>Lou's Guide to Cancer</h1>
          <p>
            Everything I wish someone had told me. This section is for anyone
            walking through cancer—whether it's your diagnosis or someone you love.
            No battle metaphors. No toxic positivity. Just presence, practical wisdom,
            and the truth that hard things can hold beauty.
          </p>
        </div>

        <div className="guide-sections">
          <a href="https://louiseireland.substack.com/p/expecting-the-unexpected" className="guide-card" target="_blank" rel="noopener noreferrer">
            <h3>Expecting the Unexpected</h3>
            <p>What I wish I had known before diagnosis.</p>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--pink)" }}>
              Read &rarr;
            </span>
          </a>

          <a href="https://louiseireland.substack.com/p/fixing-the-unfixable" className="guide-card" target="_blank" rel="noopener noreferrer">
            <h3>Fixing the Unfixable</h3>
            <p>For those supporting someone with cancer.</p>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--pink)" }}>
              Read &rarr;
            </span>
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header className="header scrolled">
      <Link href="/" className="logo">
        <img src="/images/logo-handwritten.png" alt="The Live Now Club" className="logo-img" />
      </Link>
      <nav className="nav">
        <Link href="/read">Read</Link>
        <Link href="/navigate">Navigate</Link>
        <Link href="/wonder">Wonder</Link>
        <Link href="/make">Make</Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-quote">"What if now is all we have?"</p>
      <nav className="footer-nav">
        <Link href="/read">Read</Link>
        <Link href="/navigate">Navigate</Link>
        <Link href="/wonder">Wonder</Link>
        <Link href="/make">Make</Link>
        <Link href="/about">About</Link>
      </nav>
      <p className="footer-copy">&copy; 2026 Louise Ireland</p>
    </footer>
  );
}
