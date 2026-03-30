"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="mobile-menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <span className={`hamburger ${isOpen ? "hamburger--open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {isOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsOpen(false)}>
          <nav className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <Link href="/read" onClick={() => setIsOpen(false)}>Read</Link>
            <Link href="/navigate" onClick={() => setIsOpen(false)}>Navigate</Link>
            <Link href="/wonder" onClick={() => setIsOpen(false)}>Wonder</Link>
            <Link href="/connect" onClick={() => setIsOpen(false)}>Connect</Link>
          </nav>
        </div>
      )}
    </>
  );
}
