import Link from "next/link";

export const metadata = {
  title: "Make | Living a Creative Life",
  description: "Tools to help you make things.",
};

export default function MakePage() {
  return (
    <>
      <Header />
      <main className="navigate-page">
        <div className="navigate-hero">
          <span className="section-label">Make</span>
          <h1>Living a Creative Life</h1>
          <p>
            Tools to help you make things.
          </p>
        </div>

        <div className="guide-sections">
          <section className="guide-section">
            <h2>Coming Soon</h2>
            <p>
              This section will house creative tools and projects—things I'm building
              to help you live a more creative life.
            </p>
            <p style={{ marginTop: "2rem", fontStyle: "italic", color: "var(--charcoal-light)" }}>
              In the meantime, the best thing you can do is start.
              Make something today, even if it's small.
              The muse rewards showing up.
            </p>
          </section>
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
