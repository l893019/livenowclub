"use client";

import { ReadingPage } from "./ReadingPage";

type ResultPageClientProps = {
  archetypeKey: string;
  archetypeColor: string;
  compareUserId?: string;
  identityKey?: string;
};

export function ResultPageClient({
  archetypeKey,
  archetypeColor,
  compareUserId,
  identityKey,
}: ResultPageClientProps) {
  return (
    <>
      <style>{`
        :root {
          --bg-deep: #faf6f1;
          --bg: #fffbf7;
          --text: #2d2a26;
          --text-dim: rgba(45,42,38,0.7);
          --text-muted: rgba(45,42,38,0.45);
          --accent-pink: #e8178a;
          --accent-color: ${archetypeColor};
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          background: var(--bg-deep);
          color: var(--text);
          font-family: 'Satoshi', system-ui, sans-serif;
          font-size: 17px;
          line-height: 1.75;
          font-weight: 300;
          min-height: 100vh;
        }
      `}</style>

      <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet" />

      <ReadingPage archetypeKey={archetypeKey} compareUserId={compareUserId} identityKey={identityKey} />
    </>
  );
}
