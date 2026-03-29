import Link from "next/link";

export const metadata = {
  title: "Navigate | The Live Now Club",
  description:
    "Guides for navigating life's hardest moments. A cancer survivor's practical wisdom and time-tested principles for living fully.",
  openGraph: {
    title: "Navigate | The Live Now Club",
    description:
      "Guides for navigating life's hardest moments. A cancer survivor's practical wisdom and time-tested principles for living fully.",
    type: "website",
    url: "https://livenowclub.vercel.app/navigate",
  },
};

export default function NavigatePage() {
  return (
    <>
      {/* Header */}
      <header className="header">
        <Link href="/" className="logo">
          <img src="/images/logo-handwritten.png" alt="The Live Now Club" className="logo-img" />
        </Link>
        <nav className="nav">
          <Link href="/read">Read</Link>
          <Link href="/navigate" className="active">Navigate</Link>
          <Link href="/wonder">Wonder</Link>
          <Link href="/connect">Connect</Link>
        </nav>
      </header>

      <div className="navigate-landing">
        {/* Hero */}
        <section className="navigate-landing-hero">
          <span className="navigate-label">Navigate</span>
          <h1>Guides for the journey</h1>
          <p>
            Practical wisdom for navigating life's hardest moments.
            Choose your path.
          </p>
        </section>

        {/* Two Paths */}
        <section className="navigate-paths">
          <Link href="/navigate/cancer" className="navigate-path-card navigate-path-card--cancer">
            <span className="navigate-path-icon">01</span>
            <h2>Navigate Cancer</h2>
            <p>Everything I wish someone had told me at the start.</p>
            <span className="navigate-path-cta">Enter →</span>
          </Link>

          <Link href="/navigate/life" className="navigate-path-card navigate-path-card--life">
            <span className="navigate-path-icon">02</span>
            <h2>Navigate Life</h2>
            <p>My principles for living fully.</p>
            <span className="navigate-path-cta">Enter →</span>
          </Link>
        </section>
      </div>

      {/* Footer */}
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
    </>
  );
}
