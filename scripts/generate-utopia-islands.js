const fs = require('fs');
const path = require('path');

const API_KEY = process.env.GEMINI_API_KEY || '';
const OUTPUT_DIR = path.join(__dirname, '../public/wonder/essay/quiz/images');

const baseStyle = `Digital surrealist illustration in the style of retro-futuristic album art. Symmetrical composition. Floating island or platform in center. Color palette: coral pink, soft peach, teal blue, cream white. Smooth gradient sky from warm pink at horizon to soft blue above. Floating pink/coral orbs scattered in sky. Clean geometric architectural elements in teal and blue. Art deco meets surrealism. Soft diffused lighting. No text. Square format.`;

const archetypes = [
  {
    key: 'citizen',
    name: 'Citizen of Abundance',
    prompt: `${baseStyle} The floating island contains: A gleaming pavilion of teal geometric spires, open gardens with tiny figures at leisure, curved pathways, no walls or barriers. Pink orbs float lazily overhead. The architecture suggests infinite possibility and freedom. Warm golden light bathes everything.`
  },
  {
    key: 'shaper',
    name: 'Shaper of Change',
    prompt: `${baseStyle} The floating island contains: Structures in various states of construction, teal scaffolding and rising geometric forms, cranes that look like abstract sculptures. Some buildings complete, others just beginning. The landscape itself seems to be forming. Orange and coral tones dominate.`
  },
  {
    key: 'architect',
    name: 'Architect of the Commons',
    prompt: `${baseStyle} The floating island contains: A vast circular amphitheater with concentric rings of seating, no center stage - everyone faces each other. Teal and purple geometric forms. Democratic architecture where no point is higher than another. Soft purple and teal palette.`
  },
  {
    key: 'presence',
    name: 'Keeper of Presence',
    prompt: `${baseStyle} The floating island contains: Small intimate pavilions scattered across the surface, each with just two seats facing each other. Connecting pathways of soft pink. Flowering geometric trees. Architecture designed for human connection. Warm pink and rose tones.`
  },
  {
    key: 'swimmer',
    name: 'Swimmer in Deep Water',
    prompt: `${baseStyle} The floating island contains: A vast reflective plaza open to the sky, small figures seated in contemplation, luminous geometric symbols floating in the air like slow-moving constellations. Deep blue and silver teal palette. Architecture of thought and questioning.`
  },
  {
    key: 'rooted',
    name: 'Rooted in Stillness',
    prompt: `${baseStyle} The floating island contains: Simple organic structures among gardens, a central gathering table, dormant geometric robots covered in flowering vines standing peacefully at edges. Soft green and warm coral palette. Architecture of simplicity and presence.`
  },
  {
    key: 'conscience',
    name: 'Conscience Before Comfort',
    prompt: `${baseStyle} The floating island contains: Transparent crystalline buildings where nothing is hidden, figures on viewing platforms looking outward, text-like patterns in the sky dome above. Deep coral red and slate teal palette. Architecture of accountability and witness.`
  },
  {
    key: 'embers',
    name: 'Keeper of Embers',
    prompt: `${baseStyle} The floating island contains: A great library structure with visible shelves through amber-tinted walls, a central lantern tower, stairs descending into glowing depths. Warm amber, coral, and deep brown palette. Architecture of memory and preservation.`
  },
  {
    key: 'friction',
    name: 'Alive in the Friction',
    prompt: `${baseStyle} The floating island is split in two: one half is serene geometric city, the other half is wild jagged terrain with lightning. A single bridge connects them. Orange, electric blue, and coral palette. Architecture of necessary difficulty.`
  },
  {
    key: 'unbound',
    name: 'Unbound from Form',
    prompt: `${baseStyle} The floating island is dissolving at its edges into pure light and geometry, structures becoming abstract, a luminous figure at center transforming into radiance. Violet, iridescent pink, and white palette. Architecture of transcendence.`
  },
  {
    key: 'alive',
    name: 'Alive to Everything',
    prompt: `${baseStyle} The floating island is bathed in light from multiple suns of different colors - coral, gold, violet. Sensory architecture with flowing forms, a figure with arms open on a platform edge. Multicolor sunset palette. Architecture of experience and sensation.`
  },
  {
    key: 'mender',
    name: 'Mender of What Remains',
    prompt: `${baseStyle} The floating island is a workshop-sanctuary, structures being carefully repaired and rebuilt, visible components and tools, plants growing through everything. Teal green and warm copper palette. Architecture of repair and care.`
  },
  {
    key: 'cleareyed',
    name: 'Clear-Eyed in the Storm',
    prompt: `${baseStyle} The floating island has a single white pavilion at center, surrounded by floating screens or mirrors showing distant views, one figure seated writing. Cool grey, white, and soft teal palette. Architecture of truth and witness.`
  },
  {
    key: 'between',
    name: 'In the Space Between',
    prompt: `${baseStyle} The floating island is mostly empty - just raw geometric foundations and the faintest suggestion of future structures, a single figure standing at the edge looking out at dawn light. Soft grey, pale gold, and cream palette. Architecture of potential.`
  }
];

async function generateImage(archetype) {
  console.log(`Generating: ${archetype.name}...`);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `Generate an image: ${archetype.prompt}` }]
        }],
        generationConfig: {
          responseModalities: ["IMAGE", "TEXT"]
        }
      })
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error: ${error}`);
  }

  const data = await response.json();
  const parts = data.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find(p => p.inlineData);

  if (!imagePart) {
    console.log('Response:', JSON.stringify(data, null, 2));
    throw new Error(`No image in response`);
  }

  const imageData = imagePart.inlineData.data;
  if (!imageData) {
    throw new Error(`No image data in response`);
  }

  const filename = `utopia-${archetype.key}.png`;
  const filepath = path.join(OUTPUT_DIR, filename);

  fs.writeFileSync(filepath, Buffer.from(imageData, 'base64'));
  console.log(`  ✓ Saved: ${filename}`);

  return filename;
}

async function main() {
  console.log('Generating 14 floating island utopias (essay style)...\n');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const results = [];

  for (const archetype of archetypes) {
    try {
      const filename = await generateImage(archetype);
      results.push({ key: archetype.key, filename, success: true });
      await new Promise(r => setTimeout(r, 3000));
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
      results.push({ key: archetype.key, success: false, error: err.message });
    }
  }

  console.log('\n--- Results ---');
  const succeeded = results.filter(r => r.success).length;
  console.log(`Generated: ${succeeded}/14`);

  if (succeeded < 14) {
    console.log(`Failed: ${results.filter(r => !r.success).map(r => r.key).join(', ')}`);
  }
}

main().catch(console.error);
