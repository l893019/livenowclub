import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

type UtopiaMember = {
  id: string;
  name: string;
  archetype: string;
  joinedAt: string;
};

type UtopiaRoom = {
  slug: string;
  name: string;
  createdBy: string;
  members: UtopiaMember[];
  createdAt: string;
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Fetch utopia data via API (ioredis doesn't work in Edge runtime)
  const origin = request.nextUrl.origin;
  const response = await fetch(`${origin}/api/utopia/${slug}`);
  const data = await response.json();
  const room: UtopiaRoom | null = data.utopia || null;

  if (!room) {
    // Return a fallback image
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
            backgroundColor: "#1a1a2e",
          }}
        >
          <div style={{ fontSize: 48, color: "#fff" }}>Utopia not found</div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  // Get unique archetypes for the planet
  const archetypes = [...new Set(room.members.map((m) => m.archetype))];
  const memberCount = room.members.length;

  // Calculate segments for the planet
  const segments = archetypes.map((arch, i) => {
    const angle = (360 / archetypes.length) * i;
    return {
      archetype: arch,
      angle,
      color: archetypeColors[arch] || "#666",
    };
  });

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
          backgroundColor: "#1a1a2e",
          position: "relative",
        }}
      >
        {/* Stars background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.3,
          }}
        >
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                backgroundColor: "#fff",
                borderRadius: "50%",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Planet */}
        <div
          style={{
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #2a2a3e, #1a1a2e)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            marginBottom: 40,
            boxShadow: "0 0 60px rgba(232, 23, 138, 0.2)",
          }}
        >
          {/* Archetype segments */}
          {segments.map((segment, i) => {
            const segmentAngle = 360 / segments.length;
            const rotation = segment.angle;

            return (
              <div
                key={segment.archetype}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  background: `conic-gradient(from ${rotation}deg, ${segment.color} 0deg, ${segment.color} ${segmentAngle}deg, transparent ${segmentAngle}deg)`,
                  opacity: 0.6,
                }}
              />
            );
          })}

          {/* Highlight */}
          <div
            style={{
              position: "absolute",
              top: 30,
              left: 40,
              width: 80,
              height: 50,
              background:
                "radial-gradient(ellipse, rgba(255,255,255,0.15), transparent)",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Star name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 300,
            color: "#fff",
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          {room.name}
        </div>

        {/* Member count */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
            marginBottom: 40,
          }}
        >
          {memberCount} {memberCount === 1 ? "person" : "people"}
        </div>

        {/* CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 32px",
            background: "#e8178a",
            borderRadius: 50,
            fontSize: 20,
            fontWeight: 500,
            color: "#fff",
          }}
        >
          Build a utopia with me
        </div>

        {/* Accent gradient at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background:
              segments.length > 1
                ? `linear-gradient(90deg, ${segments.map((s) => s.color).join(", ")})`
                : segments[0]?.color || "#e8178a",
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
