"use client";

import { useState } from "react";
import { RevealAnimation } from "./RevealAnimation";

type ResultPageClientProps = {
  archetypeName: string;
  archetypeColor: string;
  utopiaText: string;
  imageUrl: string;
  children: React.ReactNode;
};

export function ResultPageClient({
  archetypeName,
  archetypeColor,
  utopiaText,
  imageUrl,
  children,
}: ResultPageClientProps) {
  const [showReveal, setShowReveal] = useState(true);

  return (
    <>
      {showReveal && (
        <RevealAnimation
          archetypeName={archetypeName}
          archetypeColor={archetypeColor}
          utopiaText={utopiaText}
          imageUrl={imageUrl}
          onComplete={() => setShowReveal(false)}
        />
      )}
      <div style={{ visibility: showReveal ? "hidden" : "visible" }}>
        {children}
      </div>
    </>
  );
}
