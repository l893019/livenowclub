"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isNavigateActive = pathname?.startsWith("/navigate");

  return (
    <header className="header">
      <Link href="/" className="logo">
        <img src="/images/logo-handwritten.png" alt="The Live Now Club" className="logo-img" />
      </Link>
      <nav className="nav">
        <Link href="/read" className={pathname === "/read" ? "active" : ""}>
          Read
        </Link>

        {/* Navigate Dropdown */}
        <div className="nav-dropdown">
          <button className={`nav-dropdown-trigger ${isNavigateActive ? "active" : ""}`}>
            Navigate
          </button>
          <div className="nav-dropdown-menu">
            <Link href="/navigate/cancer">Cancer Guide</Link>
            <span className="coming-soon">Life (coming soon)</span>
          </div>
        </div>

        <Link href="/wonder" className={pathname === "/wonder" ? "active" : ""}>
          Wonder
        </Link>
        <Link href="/connect" className={pathname === "/connect" ? "active" : ""}>
          Connect
        </Link>
      </nav>
    </header>
  );
}
