"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const [hasQuizId, setHasQuizId] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("quiz-user-id");
    setHasQuizId(!!userId);
  }, []);

  const isYourWorld = pathname === "/me";

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
        {hasQuizId && (
          <Link
            href="/me"
            className={isYourWorld ? "active your-world" : "your-world"}
          >
            Your World
          </Link>
        )}
      </nav>
      <MobileMenu />
    </header>
  );
}
