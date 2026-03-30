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

// Sharp combination lines
const synthesisLines: Record<string, string> = {
  culture_earthseed: "You'll automate the revolution and optimize the resistance.",
  culture_anarres: "You trust the machines more than you trust the committees — but you want both to succeed.",
  culture_diamond: "You'll be the last to trust the AI caretaker — and the first to ask if it's lonely.",
  culture_solaris: "You'd live forever just to see what questions we haven't thought to ask yet.",
  culture_wild: "You want abundance so badly you might forget to enjoy it.",
  earthseed_culture: "You'll build the future they automate — and wonder if it was worth the sweat.",
  earthseed_anarres: "You'll tear down the system by building something better beside it.",
  earthseed_diamond: "You shape the world for people who didn't ask to be shaped — and that keeps you up at night.",
  earthseed_solaris: "You're drawn to edges you know you shouldn't try to cross.",
  earthseed_wild: "You build so hard you sometimes forget you're allowed to stop.",
  anarres_culture: "You design systems that could run without you — and worry they will.",
  anarres_earthseed: "You want to change everything except the collective's power to resist change.",
  anarres_diamond: "You'll build the commune and then stay up wondering if anyone actually feels at home.",
  anarres_solaris: "You organize the resistance while secretly hoping someone will explain what we're resisting toward.",
  anarres_wild: "You've built the alternative — now you're not sure you want to live there.",
  diamond_culture: "You trust people over systems — until the system is full of people you trust.",
  diamond_earthseed: "You know presence matters most, but you're not sure you can stay present through the change.",
  diamond_anarres: "You put people first, then wonder if the structure would do it better.",
  diamond_solaris: "You reach out to connect — and find the other side reaching back with questions, not answers.",
  diamond_wild: "You believe in presence so deeply you've forgotten to be present to yourself.",
  solaris_culture: "You question everything except your right to keep questioning.",
  solaris_earthseed: "You sit with uncertainty while secretly building toward certainty.",
  solaris_anarres: "You embrace the mystery but wish someone else would organize the search party.",
  solaris_diamond: "You'd rather sit in silence with someone than solve them.",
  solaris_wild: "You've stopped asking why — and you're not sure that's an answer.",
  wild_culture: "You've found peace — now you're restless about how much work went into finding it.",
  wild_earthseed: "You stopped building to rest — and woke up building again.",
  wild_anarres: "You stepped off the wheel — and it keeps turning toward you.",
  wild_diamond: "You're so present you've forgotten that others are still arriving.",
  wild_solaris: "You found the answer in stopping — and now you're suspicious of it."
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const archetype = searchParams.get('archetype') || 'culture';
  const shadow = searchParams.get('shadow');

  const data = archetypes[archetype] || archetypes.culture;
  const shadowData = shadow ? archetypes[shadow] : null;

  // Get synthesis line if shadow exists
  const synthesisKey = shadow ? `${archetype}_${shadow}` : null;
  const synthesis = synthesisKey && synthesisLines[synthesisKey] ? synthesisLines[synthesisKey] : data.shareText;

  // Display text depends on whether we have a shadow
  const displayText = shadow ? synthesis : data.shareText;
  const displayName = shadowData
    ? `${data.name} · ${shadowData.name}`
    : data.name;

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

        {/* Belief/synthesis statement */}
        <div
          style={{
            fontSize: shadow ? 44 : 48,
            fontWeight: 400,
            color: '#2d2a26',
            textAlign: 'center',
            lineHeight: 1.3,
            maxWidth: '90%',
            marginBottom: 40,
          }}
        >
          {displayText}
        </div>

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
