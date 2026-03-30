import Link from "next/link";
import Header from "@/components/Header";

export const metadata = {
  title: "After Abundance | The Live Now Club",
  description: "An interactive exploration of human purpose when scarcity ends. Coming soon.",
};

export default function AfterAbundanceEssay() {
  return (
    <>
      <Header />
      <div className="wonder-container" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "100px 24px" }}>
        <span className="wonder-label" style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 400, letterSpacing: "0.3em", textTransform: "uppercase", color: "#E8178A", marginBottom: "24px" }}>Coming Soon</span>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 300, lineHeight: 1.2, letterSpacing: "-0.02em", color: "var(--charcoal)", marginBottom: "16px" }}>After Abundance</h1>
        <p style={{ fontSize: "1.125rem", color: "var(--text-dim)", lineHeight: 1.6, maxWidth: "500px", marginBottom: "32px" }}>
          An interactive exploration of what more than 200 science fiction books reveal about human purpose when scarcity ends.
        </p>
        <Link href="/wonder" style={{ color: "var(--pink)", textDecoration: "none" }}>← Back to Wonder</Link>
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
    </>
  );
}
