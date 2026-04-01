"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type CreatedUtopia = {
  slug: string;
  name: string;
};

export default function UtopiaReadyBanner() {
  const [utopia, setUtopia] = useState<CreatedUtopia | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("created-utopia");
    if (stored) {
      try {
        setUtopia(JSON.parse(stored));
        // Clear it so it doesn't show again on refresh
        sessionStorage.removeItem("created-utopia");
      } catch (e) {
        console.error("Failed to parse created-utopia:", e);
      }
    }
  }, []);

  if (!utopia) return null;

  return (
    <div className="utopia-ready-banner">
      <div className="banner-content">
        <div className="banner-icon">✨</div>
        <div className="banner-text">
          <div className="banner-title">Your utopia is ready</div>
          <div className="banner-name">{utopia.name}</div>
        </div>
        <Link href={`/wonder/essay/quiz/utopia/${utopia.slug}`} className="banner-btn">
          Go to your utopia →
        </Link>
      </div>

      <style jsx>{`
        .utopia-ready-banner {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          animation: slideUp 0.5s ease;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        .banner-content {
          display: flex;
          align-items: center;
          gap: 16px;
          background: white;
          border: 2px solid var(--accent-pink, #e8178a);
          border-radius: 16px;
          padding: 16px 24px;
          box-shadow: 0 8px 32px rgba(232, 23, 138, 0.2);
        }
        .banner-icon {
          font-size: 1.5rem;
        }
        .banner-text {
          flex: 1;
        }
        .banner-title {
          font-size: 0.85rem;
          color: var(--text-muted, rgba(45, 42, 38, 0.45));
          margin-bottom: 2px;
        }
        .banner-name {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--text, #2d2a26);
        }
        .banner-btn {
          display: inline-block;
          padding: 10px 20px;
          background: var(--accent-pink, #e8178a);
          color: white;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          border-radius: 50px;
          white-space: nowrap;
          transition: all 0.2s;
        }
        .banner-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(232, 23, 138, 0.3);
        }
        @media (max-width: 600px) {
          .utopia-ready-banner {
            left: 16px;
            right: 16px;
            transform: none;
          }
          .banner-content {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}
