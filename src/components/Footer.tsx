import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="text-caption">
          &copy; {new Date().getFullYear()} Louise Ireland
        </p>
        <div className="footer-links">
          <Link href="/read" className="footer-link">
            Read
          </Link>
          <Link href="/about" className="footer-link">
            About
          </Link>
          <a
            href="https://louiseireland.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Substack
          </a>
          <a
            href="https://ko-fi.com/louiseireland"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Ko-fi
          </a>
        </div>
      </div>
    </footer>
  );
}
