const fs = require('fs');
const path = require('path');

const API_KEY = process.env.GEMINI_API_KEY || '';
const OUTPUT_DIR = path.join(__dirname, '../public/wonder/essay/quiz/images');

const styleGuide = "Illustration style: warm cream and terracotta tones with soft pink and teal accents, soft ethereal lighting, minimal linework, editorial illustration for a literary magazine, slightly dreamy and hopeful atmosphere";

const archetypes = [
  {
    key: 'citizen',
    name: 'Citizen of Abundance',
    prompt: `A sprawling orbital habitat seen from within, parklands and rivers curving upward in the distance following the curve of the station, people scattered across the landscape doing a hundred different things - reading, gardening, playing, talking - none of them working. Soft warm light streams through. ${styleGuide}`
  },
  {
    key: 'shaper',
    name: 'Shaper of Change',
    prompt: `A city mid-construction, cranes and scaffolding everywhere, but people are eating dinner on the scaffolding, living in the becoming. String lights hang between construction beams. Golden hour light, hopeful atmosphere. ${styleGuide}`
  },
  {
    key: 'architect',
    name: 'Architect of the Commons',
    prompt: `An enormous open-air amphitheater carved into a green hillside, thousands of seats arranged in concentric circles with no stage and no podium at the center, everyone facing each other as equals. Soft natural daylight. ${styleGuide}`
  },
  {
    key: 'presence',
    name: 'Keeper of Presence',
    prompt: `A small circular marketplace where every stall is just two chairs facing each other. No goods, no screens, no displays. People sitting across from each other in quiet conversation. Vast futuristic architecture rises in the soft background. ${styleGuide}`
  },
  {
    key: 'swimmer',
    name: 'Swimmer in Deep Water',
    prompt: `A vast contemplative space open to the sky, figures seated in small groups across an endless pale marble floor, holographic equations and philosophical symbols floating gently in the air around them, no walls, no ceiling, just thought and horizon. ${styleGuide}`
  },
  {
    key: 'rooted',
    name: 'Rooted in Stillness',
    prompt: `A village of handmade wooden structures surrounded by lush gardens, a figure kneading bread at a long wooden table outside, dormant robots standing peacefully at the perimeter like retired sentinels, covered in flowering ivy. Morning light. ${styleGuide}`
  },
  {
    key: 'conscience',
    name: 'Conscience Before Comfort',
    prompt: `A city at dusk where the clouds above are filled with softly glowing scrolling text - records of decisions made. People on rooftops reading the sky, bearing witness. Accountability projected onto the atmosphere. ${styleGuide}`
  },
  {
    key: 'embers',
    name: 'Keeper of Embers',
    prompt: `A vast underground chamber lit by a single warm lantern, ancient shelves carved into rock walls disappearing into shadow in every direction, a solitary figure descending a worn stone staircase carrying a precious book. ${styleGuide}`
  },
  {
    key: 'friction',
    name: 'Alive in the Friction',
    prompt: `A gleaming serene city that ends abruptly at a massive wall. Beyond the wall, dense wilderness, jagged mountains, visible lightning in storm clouds. A single gate stands open. Footprints lead through it in both directions. ${styleGuide}`
  },
  {
    key: 'unbound',
    name: 'Unbound from Form',
    prompt: `A luminous abstract form, vaguely human in suggestion but dissolving and dispersing at every edge into light, drifting through a space of impossible colors and geometries that fold in on themselves. No ground, no sky, no horizon. Transcendent. ${styleGuide}`
  },
  {
    key: 'alive',
    name: 'Alive to Everything',
    prompt: `A figure standing on a cliff edge with arms open wide, bathed in light from multiple suns on the horizon, each sun a different color - gold, rose, violet. The landscape below shifts in hue. Pure joy and sensation. ${styleGuide}`
  },
  {
    key: 'mender',
    name: 'Mender of What Remains',
    prompt: `A vast workshop floating in space, an old ship being carefully disassembled and rebuilt piece by piece with love, a figure at a workbench surrounded by salvaged components organized with obvious care, plants growing from the walls and shelves. ${styleGuide}`
  },
  {
    key: 'cleareyed',
    name: 'Clear-Eyed in the Storm',
    prompt: `A solitary figure sitting in an empty white room, surrounded by floating screens showing the unfiltered state of every part of the world - news, data, faces. They write observations in a journal by hand. Witness. ${styleGuide}`
  },
  {
    key: 'between',
    name: 'In the Space Between',
    prompt: `An empty landscape at dawn, first light touching raw earth, a single figure standing at the edge looking out toward the horizon, no structures, no roads, just open ground and the faintest suggestion of where something might someday be built. Beginning. ${styleGuide}`
  }
];

async function generateImage(archetype) {
  console.log(`Generating: ${archetype.name}...`);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ prompt: archetype.prompt }],
        parameters: {
          sampleCount: 1,
          aspectRatio: "16:9"
        }
      })
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error for ${archetype.key}: ${error}`);
  }

  const data = await response.json();

  // Imagen returns predictions array
  const predictions = data.predictions || [];
  if (predictions.length === 0) {
    console.log('Response:', JSON.stringify(data, null, 2));
    throw new Error(`No image in response for ${archetype.key}`);
  }

  const imageData = predictions[0].bytesBase64Encoded;
  if (!imageData) {
    console.log('Response:', JSON.stringify(data, null, 2));
    throw new Error(`No image data in response for ${archetype.key}`);
  }

  const ext = 'png';

  const filename = `utopia-${archetype.key}.${ext}`;
  const filepath = path.join(OUTPUT_DIR, filename);

  fs.writeFileSync(filepath, Buffer.from(imageData, 'base64'));
  console.log(`  Saved: ${filename}`);

  return filename;
}

async function main() {
  console.log('Generating 14 utopia illustrations...\n');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const results = [];

  for (const archetype of archetypes) {
    try {
      const filename = await generateImage(archetype);
      results.push({ key: archetype.key, filename, success: true });
      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 2000));
    } catch (err) {
      console.error(`  Error: ${err.message}`);
      results.push({ key: archetype.key, success: false, error: err.message });
    }
  }

  console.log('\n--- Results ---');
  results.forEach(r => {
    if (r.success) {
      console.log(`✓ ${r.key}: ${r.filename}`);
    } else {
      console.log(`✗ ${r.key}: ${r.error}`);
    }
  });
}

main().catch(console.error);
