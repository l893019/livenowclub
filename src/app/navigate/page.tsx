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

      <div className="navigate-question">
        <p className="navigate-question-prompt">What are you navigating?</p>

        <div className="navigate-question-options">
          <Link href="/navigate/cancer" className="navigate-option navigate-option--cancer">
            <span className="navigate-option-answer">A diagnosis</span>
          </Link>

          <Link href="/navigate/life" className="navigate-option navigate-option--life">
            <span className="navigate-option-answer">Life itself</span>
          </Link>
        </div>
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
