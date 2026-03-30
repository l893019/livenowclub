"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="header">
      <Link href="/" className="logo">
        <img src="/images/logo-handwritten.png" alt="The Live Now Club" className="logo-img" />
      </Link>
      <nav className="nav">
        <Link href="/read" className={pathname === "/read" ? "active" : ""}>
          Read
        </Link>
        <Link href="/navigate" className={pathname?.startsWith("/navigate") ? "active" : ""}>
          Navigate
        </Link>
        <Link href="/wonder" className={pathname === "/wonder" ? "active" : ""}>
          Wonder
        </Link>
        <Link href="/connect" className={pathname === "/connect" ? "active" : ""}>
          Connect
        </Link>
      </nav>
      <MobileMenu />
    </header>
  );
}
