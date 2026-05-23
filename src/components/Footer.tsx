"use client";

import Link from "next/link";

export default function Footer() {
  const handleKofiClick = () => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'kofi_click',
        page: window.location.pathname,
        metadata: { source: 'generic_footer' }
      })
    }).catch(() => {});
  };

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
            href="https://ko-fi.com/livenowclub"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            onClick={handleKofiClick}
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
