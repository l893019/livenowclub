"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="flex items-center">
          {/* Logo image - will fall back to text if not found */}
          <Image
            src="/logo.png"
            alt="The Live Now Club"
            width={140}
            height={50}
            className="h-10 w-auto"
            priority
            onError={(e) => {
              // Hide image on error, text fallback shows
              e.currentTarget.style.display = 'none';
            }}
          />
        </Link>
        <div className="nav-links">
          <Link href="/essays" className="nav-link">
            Essays
          </Link>
          <Link href="/about" className="nav-link">
            About
          </Link>
          <a
            href="https://livenowclub.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary text-sm py-2 px-4"
          >
            Subscribe
          </a>
        </div>
      </div>
    </nav>
  );
}
