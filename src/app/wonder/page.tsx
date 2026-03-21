import Link from "next/link";

export const metadata = {
  title: "Wonder | Exploring the Future",
  description: "AI, post-scarcity, and the questions that keep me up at night.",
};

export default function WonderPage() {
  return (
    <>
      <Header />
      <main className="navigate-page">
        <div className="navigate-hero">
          <span className="section-label">Wonder</span>
          <h1>Exploring the Future</h1>
          <p>
            AI, post-scarcity, and the questions that keep me up at night.
            What happens when machines can do everything humans once had to do?
            What do we choose to do then?
          </p>
        </div>

        <div className="guide-sections">
          <section className="guide-section">
            <h2>Coming Soon</h2>
            <p>
              This section will house my research and writing on post-scarcity futures,
              AI and human meaning, and the philosophical questions raised by abundance.
            </p>
            <p>
              In the meantime, you can explore the <Link href="https://post-scarcity-compass.vercel.app" style={{ color: "var(--pink)" }}>Post-Scarcity Compass</Link>—an
              interactive exploration of 216 works of sci-fi and what they imagine
              about human purpose after automation.
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
