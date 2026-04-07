'use client';

import { useEffect, useState } from 'react';

type Scores = Record<string, number>;

const archetypeNames: Record<string, string> = {
  citizen: "The Abundant",
  shaper: "The Builder",
  architect: "The Architect",
  presence: "The Present",
  swimmer: "The Questioner",
  rooted: "The Rooted",
  conscience: "The Witness",
  embers: "The Keeper",
  friction: "The Challenger",
  unbound: "The Transcendent",
  alive: "The Feeler",
  mender: "The Mender",
  cleareyed: "The Truth-Teller",
  between: "The Liminal",
};

const archetypeColors: Record<string, string> = {
  citizen: "#3db9a4",
  shaper: "#f4a03f",
  architect: "#9b8fef",
  presence: "#e8178a",
  swimmer: "#6b8fef",
  rooted: "#7ed6a4",
  conscience: "#d64545",
  embers: "#c97d3a",
  friction: "#ff6b35",
  unbound: "#a855f7",
  alive: "#f472b6",
  mender: "#10b981",
  cleareyed: "#64748b",
  between: "#8b8b8b",
};

export default function ScoreBreakdown({ currentArchetype }: { currentArchetype: string }) {
  const [scores, setScores] = useState<Scores | null>(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('quiz-user-result');
      if (stored) {
        const result = JSON.parse(stored);
        // Only show if this is your own result
        if (result.archetype === currentArchetype && result.scores) {
          setScores(result.scores);
          setIsOwner(true);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [currentArchetype]);

  if (!isOwner || !scores) return null;

  // Sort and get top 4
  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const maxScore = sorted[0][1];

  return (
    <div className="score-breakdown">
      <div className="score-label">Your Scores</div>
      <div className="score-bars">
        {sorted.map(([key, score], i) => {
          const pct = Math.round((score / maxScore) * 100);
          const name = archetypeNames[key] || key;
          const color = archetypeColors[key] || '#888';
          return (
            <div key={key} className="score-row">
              <div className="score-name">{name}</div>
              <div className="score-bar-container">
                <div
                  className="score-bar"
                  style={{
                    width: `${pct}%`,
                    background: i === 0 ? color : `${color}66`
                  }}
                />
                <span className="score-pct">{pct}%</span>
              </div>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .score-breakdown {
          max-width: 500px;
          margin-bottom: 40px;
          width: 100%;
        }
        .score-label {
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(45,42,38,0.45);
          margin-bottom: 16px;
          text-align: center;
        }
        .score-bars {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .score-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .score-name {
          font-size: 0.85rem;
          color: rgba(45,42,38,0.7);
        }
        .score-bar-container {
          display: flex;
          align-items: center;
          gap: 12px;
          height: 24px;
          background: rgba(0,0,0,0.03);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }
        .score-bar {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease-out;
        }
        .score-pct {
          position: absolute;
          right: 8px;
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(45,42,38,0.7);
        }
      `}</style>
    </div>
  );
}
