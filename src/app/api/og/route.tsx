import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const archetypes: Record<string, { name: string; utopia: string; color: string }> = {
  citizen: {
    name: "Citizen of Abundance",
    utopia: "Your utopia has no word for \"job.\" They used to, but it fell out of the language three centuries ago.",
    color: "#3db9a4"
  },
  shaper: {
    name: "Shaper of Change",
    utopia: "Your utopia is never finished. Everything is always changing.",
    color: "#f4a03f"
  },
  architect: {
    name: "Architect of the Commons",
    utopia: "Your utopia belongs to everyone and answers to no one.",
    color: "#9b8fef"
  },
  presence: {
    name: "Keeper of Presence",
    utopia: "Your utopia decided that the most valuable thing in the universe was undivided attention.",
    color: "#e8178a"
  },
  swimmer: {
    name: "Swimmer in Deep Water",
    utopia: "Your utopia is a civilization of philosophers.",
    color: "#6b8fef"
  },
  rooted: {
    name: "Rooted in Stillness",
    utopia: "Your utopia returned to a simpler way of life, on purpose.",
    color: "#7ed6a4"
  },
  conscience: {
    name: "Conscience Before Comfort",
    utopia: "Your utopia built accountability into the architecture.",
    color: "#d64545"
  },
  embers: {
    name: "Keeper of Embers",
    utopia: "Your utopia's most protected resource is not water or energy. It's memory.",
    color: "#c97d3a"
  },
  friction: {
    name: "Alive in the Friction",
    utopia: "Your utopia kept one part of the world deliberately dangerous.",
    color: "#ff6b35"
  },
  unbound: {
    name: "Unbound from Form",
    utopia: "Your utopia transcended the physical. You exist as pure consciousness now.",
    color: "#a855f7"
  },
  alive: {
    name: "Alive to Everything",
    utopia: "Your utopia engineered twelve new senses and a sunset that lasts all day.",
    color: "#f472b6"
  },
  mender: {
    name: "Mender of What Remains",
    utopia: "Your utopia decided that the most advanced act of engineering was making what already existed work again.",
    color: "#10b981"
  },
  cleareyed: {
    name: "Clear-Eyed in the Storm",
    utopia: "Your utopia has one person whose only job is to tell the truth.",
    color: "#64748b"
  },
  between: {
    name: "In the Space Between",
    utopia: "Your utopia just started to exist. Nothing is built yet.",
    color: "#8b8b8b"
  }
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const archetype = searchParams.get('archetype') || 'citizen';
  const shadow = searchParams.get('shadow');
  const name = searchParams.get('name');

  const data = archetypes[archetype] || archetypes.citizen;
  const shadowData = shadow ? archetypes[shadow] : null;

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

        {/* Utopia statement */}
        <div
          style={{
            fontSize: shadow ? 40 : 44,
            fontWeight: 400,
            color: '#2d2a26',
            textAlign: 'center',
            lineHeight: 1.3,
            maxWidth: '90%',
            marginBottom: 40,
            fontStyle: 'italic',
          }}
        >
          {data.utopia}
        </div>

        {/* Person's name if provided */}
        {name && (
          <div
            style={{
              fontSize: 20,
              color: 'rgba(45,42,38,0.6)',
              marginBottom: 8,
              letterSpacing: '0.05em',
            }}
          >
            {name} is a
          </div>
        )}

        {/* Archetype name(s) */}
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
          {shadowData && (
            <>
              <div
                style={{
                  fontSize: 24,
                  color: 'rgba(45,42,38,0.5)',
                }}
              >
                with shades of
              </div>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: shadowData.color,
                }}
              />
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 400,
                  color: shadowData.color,
                  fontStyle: 'italic',
                }}
              >
                {shadowData.name}
              </div>
            </>
          )}
        </div>

        {/* CTA - personalized when name is provided */}
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            fontSize: 20,
            color: 'rgba(45,42,38,0.6)',
          }}
        >
          {name ? 'What are you? Take the quiz →' : "What's your post-scarcity worldview? Take the quiz →"}
        </div>

        {/* Accent bar - gradient if shadow exists */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: shadowData
              ? `linear-gradient(90deg, ${data.color} 0%, ${shadowData.color} 100%)`
              : data.color,
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
