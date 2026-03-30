import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const archetypes: Record<string, { name: string; shareText: string; color: string }> = {
  culture: {
    name: "Culture Citizen",
    shareText: "I believe we'll keep working even when we don't have to.",
    color: "#3db9a4"
  },
  earthseed: {
    name: "Earthseed Shaper",
    shareText: "I believe the future isn't something that happens to you — it's something you shape.",
    color: "#f4a03f"
  },
  anarres: {
    name: "Anarres Builder",
    shareText: "I believe even the best people will recreate the old hierarchies if the structures allow it.",
    color: "#9b8fef"
  },
  diamond: {
    name: "Diamond Reader",
    shareText: "I believe the thing that changes a life is a person choosing to be present for another.",
    color: "#e8178a"
  },
  solaris: {
    name: "Solaris Dreamer",
    shareText: "I believe some questions are worth more than their answers.",
    color: "#6b8fef"
  },
  wild: {
    name: "Wild Monk",
    shareText: "I believe the most radical act is to stop — not from exhaustion, but from clarity.",
    color: "#7ed6a4"
  }
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const archetype = searchParams.get('archetype') || 'culture';

  const data = archetypes[archetype] || archetypes.culture;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#faf6f1',
          padding: '60px',
        }}
      >
        {/* Quote mark */}
        <div
          style={{
            fontSize: 120,
            color: data.color,
            opacity: 0.3,
            position: 'absolute',
            top: 40,
            left: 60,
            fontFamily: 'Georgia',
          }}
        >
          "
        </div>

        {/* Belief statement */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 400,
            color: '#2d2a26',
            textAlign: 'center',
            lineHeight: 1.3,
            maxWidth: '90%',
            marginBottom: 40,
          }}
        >
          {data.shareText}
        </div>

        {/* Archetype name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: data.color,
            }}
          />
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: '#2d2a26',
              letterSpacing: '0.05em',
            }}
          >
            {data.name}
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            fontSize: 20,
            color: 'rgba(45,42,38,0.6)',
          }}
        >
          What's your post-scarcity worldview? Take the quiz →
        </div>

        {/* Accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundColor: data.color,
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
