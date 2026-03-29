"use client";

import { useState, useEffect } from "react";

export default function ExitIntentCard() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if we've shown this in the past week
    const lastShown = localStorage.getItem("exitIntentLastShown");
    if (lastShown) {
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      if (parseInt(lastShown) > weekAgo) {
        return; // Don't show if shown within the past week
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves toward the top of the page
      if (e.clientY <= 5 && !dismissed) {
        setShow(true);
        localStorage.setItem("exitIntentLastShown", Date.now().toString());
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    setShow(false);
  };

  if (!show) return null;

  return (
    <>
      <div className="exit-card">
        <button className="exit-card-close" onClick={handleDismiss} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <p className="exit-card-text">Before you go...</p>
        <p className="exit-card-subtext">Join me on this journey?</p>
        <a
          href="https://louiseireland.substack.com/subscribe"
          target="_blank"
          rel="noopener noreferrer"
          className="exit-card-button"
        >
          Subscribe
        </a>
      </div>

      <style jsx>{`
        .exit-card {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: white;
          border: 1px solid rgba(45, 42, 38, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          padding: 24px;
          max-width: 280px;
          z-index: 1000;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .exit-card-close {
          position: absolute;
          top: 12px;
          right: 12px;
          background: none;
          border: none;
          color: rgba(45, 42, 38, 0.4);
          cursor: pointer;
          padding: 4px;
          transition: color 0.2s;
        }

        .exit-card-close:hover {
          color: rgba(45, 42, 38, 0.8);
        }

        .exit-card-text {
          font-size: 1.1rem;
          font-weight: 400;
          color: #2d2a26;
          margin-bottom: 4px;
        }

        .exit-card-subtext {
          font-size: 0.95rem;
          font-weight: 300;
          color: rgba(45, 42, 38, 0.6);
          margin-bottom: 16px;
        }

        .exit-card-button {
          display: block;
          width: 100%;
          padding: 12px 24px;
          background: #e8178a;
          color: white;
          font-family: "Space Grotesk", sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-align: center;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .exit-card-button:hover {
          background: #c9146f;
        }

        @media (max-width: 480px) {
          .exit-card {
            left: 16px;
            right: 16px;
            bottom: 16px;
            max-width: none;
          }
        }
      `}</style>
    </>
  );
}
