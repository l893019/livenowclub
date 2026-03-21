import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="text-caption">
          &copy; {new Date().getFullYear()} Louise Ireland
        </p>
        <div className="footer-links">
          <Link href="/essays" className="footer-link">
            Essays
          </Link>
          <Link href="/about" className="footer-link">
            About
          </Link>
          <a
            href="https://livenowclub.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Substack
          </a>
        </div>
      </div>
    </footer>
  );
}
