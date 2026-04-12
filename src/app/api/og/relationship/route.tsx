import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

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

// Simplified pair dynamics for OG cards
const pairGive: Record<string, string> = {
  "embers+shaper": "One races toward tomorrow. The other holds yesterday close.",
  "rooted+shaper": "They keep you grounded. You keep them moving.",
  "citizen+conscience": "They keep you honest. You keep them hopeful.",
  "alive+conscience": "They keep you grounded. You remind them to live.",
  "presence+unbound": "They remind you of what's here. You remind them of what's possible.",
  "mender+swimmer": "They push you to decide. You help them understand why.",
  "friction+rooted": "One craves difficulty. One chose stillness.",
  "architect+shaper": "Both builders, different blueprints.",
  "architect+mender": "One designs new systems, one fixes old ones.",
  "alive+citizen": "Both believe in abundance. A generous worldview.",
  "citizen+swimmer": "The Abundant builds. The Questioner questions.",
  "between+embers": "One knows where we came from. The other isn't sure where we're going.",
  "embers+mender": "One preserves memory, one preserves function.",
  "swimmer+unbound": "Both comfortable with ambiguity.",
  "alive+unbound": "Sensation-seekers, different methods.",
  "cleareyed+conscience": "Truth-tellers both.",
  "cleareyed+swimmer": "Both live in clarity, different kinds.",
  "presence+rooted": "They understand something the others don't.",
  "mender+rooted": "The patient ones.",
  "between+swimmer": "Neither one is sure, and they're fine with that.",
  "shaper+swimmer": "Between them, nothing goes unexamined.",
};

function getPairKey(a: string, b: string): string {
  return [a, b].sort().join("+");
}

function getGiveText(a: string, b: string): string {
  const key = getPairKey(a, b);
  return pairGive[key] || "Together, you see more than either would alone.";
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const arch1 = searchParams.get("arch1") || "shaper";
  const arch2 = searchParams.get("arch2") || "swimmer";
  const name1 = searchParams.get("name1") || "You";
  const name2 = searchParams.get("name2") || "Them";

  const color1 = archetypeColors[arch1] || "#888";
  const color2 = archetypeColors[arch2] || "#888";
  const archName1 = archetypeNames[arch1] || arch1;
  const archName2 = archetypeNames[arch2] || arch2;
  const giveText = getGiveText(arch1, arch2);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          position: "relative",
        }}
      >
        {/* Subtle gradient background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 30% 40%, ${color1}15, transparent 50%), radial-gradient(circle at 70% 60%, ${color2}15, transparent 50%)`,
          }}
        />

        {/* Names with dots */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: color1,
              }}
            />
            <span style={{ fontSize: 36, color: color1, fontWeight: 500 }}>
              {name1}
            </span>
          </div>

          <span style={{ fontSize: 36, color: "rgba(255,255,255,0.4)" }}>×</span>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: color2,
              }}
            />
            <span style={{ fontSize: 36, color: color2, fontWeight: 500 }}>
              {name2}
            </span>
          </div>
        </div>

        {/* Archetype names */}
        <div
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.5)",
            marginBottom: 48,
            letterSpacing: "0.05em",
          }}
        >
          {archName1} × {archName2}
        </div>

        {/* Give text */}
        <div
          style={{
            fontSize: 32,
            color: "rgba(255,255,255,0.9)",
            fontStyle: "italic",
            maxWidth: 800,
            textAlign: "center",
            lineHeight: 1.5,
            padding: "0 48px",
          }}
        >
          "{giveText}"
        </div>

        {/* CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 48,
            padding: "14px 28px",
            background: "#e8178a",
            borderRadius: 50,
            fontSize: 18,
            fontWeight: 500,
            color: "#fff",
          }}
        >
          See your relationship
        </div>

        {/* Brand */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 14,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.1em",
          }}
        >
          THE LIVE NOW CLUB
        </div>

        {/* Color bar at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: `linear-gradient(90deg, ${color1}, ${color2})`,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
