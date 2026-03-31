const fs = require('fs');
const path = require('path');

const API_KEY = process.env.GEMINI_API_KEY || '';
const OUTPUT_DIR = path.join(__dirname, '../public/wonder/essay/quiz/images');

const baseStyle = `A floating spherical planet/world against a pure black background, in the style of a 1970s retro-futuristic sci-fi illustration heavily influenced by Roger Dean's surrealist landscapes. Organic flowing forms, impossible geology, luminous colors, dreamlike atmosphere. The sphere floats in void, self-contained utopia. Square composition, detailed, painterly.`;

const archetypes = [
  {
    key: 'citizen',
    name: 'Citizen of Abundance',
    prompt: `${baseStyle} The floating world contains: A curved orbital habitat interior visible through the sphere, parklands and silver rivers following the curve upward, tiny figures scattered in leisure across verdant landscapes, soft golden light streaming through transparent sections, no factories or workplaces visible - only gardens, amphitheaters, and gathering spaces. Teal and gold color palette.`
  },
  {
    key: 'shaper',
    name: 'Shaper of Change',
    prompt: `${baseStyle} The floating world contains: A city in perpetual construction, organic scaffolding and cranes that look like growing plants, buildings half-formed rising from mist, string lights connecting incomplete structures, warm amber light of eternal golden hour, the landscape itself seems to be shifting and reforming. Orange and copper color palette.`
  },
  {
    key: 'architect',
    name: 'Architect of the Commons',
    prompt: `${baseStyle} The floating world contains: A vast amphitheater carved into rolling green hills, thousands of seats arranged in concentric circles with no center stage - everyone facing each other as equals, no towers or monuments rising above, only horizontal gathering spaces, communal gardens between the rings. Purple and green color palette.`
  },
  {
    key: 'presence',
    name: 'Keeper of Presence',
    prompt: `${baseStyle} The floating world contains: A landscape of intimate spaces, small circular clearings each with just two chairs facing each other, winding paths connecting these meeting places, soft pink light filtering through organic canopy structures, no screens or machines visible, only spaces for human connection. Warm pink and rose color palette.`
  },
  {
    key: 'swimmer',
    name: 'Swimmer in Deep Water',
    prompt: `${baseStyle} The floating world contains: A vast marble plaza open to swirling cosmos above, figures seated in small groups across an endless reflective floor, luminous symbols and equations floating in the air like slow-moving fish, no walls only endless horizon, deep contemplative blue light. Deep blue and silver color palette.`
  },
  {
    key: 'rooted',
    name: 'Rooted in Stillness',
    prompt: `${baseStyle} The floating world contains: A village of handcrafted wooden structures amid lush gardens, dormant robots standing at the perimeter covered in flowering vines like gentle sentinels, a figure at a long table kneading bread, morning mist, smoke from chimneys, no technology visible except the peaceful sleeping machines. Soft green and warm brown color palette.`
  },
  {
    key: 'conscience',
    name: 'Conscience Before Comfort',
    prompt: `${baseStyle} The floating world contains: A city at twilight where the sky dome is filled with softly glowing text - records and decisions scrolling across clouds, figures on crystalline rooftops reading the sky, transparent buildings where nothing can be hidden, watchtowers that look inward not outward. Deep red and slate color palette.`
  },
  {
    key: 'embers',
    name: 'Keeper of Embers',
    prompt: `${baseStyle} The floating world contains: A vast underground cavern visible through the sphere's surface, endless shelves carved into glowing amber rock walls, a single lantern illuminating a figure descending ancient stairs carrying precious books, the archive extends infinitely inward, warm candlelight throughout. Amber and deep brown color palette.`
  },
  {
    key: 'friction',
    name: 'Alive in the Friction',
    prompt: `${baseStyle} The floating world contains: A gleaming peaceful city that ends abruptly at a great wall, beyond which lies wild dangerous terrain - jagged mountains, lightning storms, dense jungle. A single gate stands open with footprints leading both directions. The safe and wild exist together. Orange and electric blue color palette.`
  },
  {
    key: 'unbound',
    name: 'Unbound from Form',
    prompt: `${baseStyle} The floating world contains: Pure abstraction - luminous forms that suggest but don't define, consciousness becoming light becoming geometry, no ground or sky just infinite dimensional space folding into itself, a human silhouette dissolving into pure radiance at the center. Violet, purple, and iridescent color palette.`
  },
  {
    key: 'alive',
    name: 'Alive to Everything',
    prompt: `${baseStyle} The floating world contains: A landscape bathed in light from multiple colored suns - gold, rose, violet - each casting different hues, a figure with arms outstretched on a cliff edge, the terrain below shifts in impossible colors, everything designed for sensation and experience. Hot pink and multicolor sunset palette.`
  },
  {
    key: 'mender',
    name: 'Mender of What Remains',
    prompt: `${baseStyle} The floating world contains: A workshop-world in space, old ships and structures being carefully disassembled and rebuilt with obvious care, a figure at a workbench surrounded by salvaged components, plants growing from every surface, repair as the highest art. Teal green and warm metal color palette.`
  },
  {
    key: 'cleareyed',
    name: 'Clear-Eyed in the Storm',
    prompt: `${baseStyle} The floating world contains: A single white room at the center of the sphere, surrounded by floating screens showing every part of existence, a solitary figure writing by hand in a journal, the truth-teller's sanctum, storms visible in the outer atmosphere but calm at the center. Cool grey and white color palette.`
  },
  {
    key: 'between',
    name: 'In the Space Between',
    prompt: `${baseStyle} The floating world contains: Nearly empty - just raw earth touched by first light of dawn, a single figure standing at the edge looking outward, no structures yet, only the faintest suggestion of what might someday be built, potential energy, the beginning of everything. Soft grey and pale gold dawn color palette.`
  }
];

async function generateImage(archetype) {
  console.log(`Generating: ${archetype.name}...`);

  // Use Gemini Pro Image with generateContent
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

  // Find image in response
  const parts = data.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find(p => p.inlineData);

  if (!imagePart) {
    console.log('Response:', JSON.stringify(data, null, 2));
    throw new Error(`No image in response`);
  }

  const imageData = imagePart.inlineData.data;
  if (!imageData) {
    console.log('Response:', JSON.stringify(data, null, 2));
    throw new Error(`No image data in response`);
  }

  const filename = `utopia-${archetype.key}.png`;
  const filepath = path.join(OUTPUT_DIR, filename);

  fs.writeFileSync(filepath, Buffer.from(imageData, 'base64'));
  console.log(`  Saved: ${filename}`);

  return filename;
}

async function main() {
  console.log('Generating 14 Roger Dean style floating globe utopias...\n');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const results = [];

  for (const archetype of archetypes) {
    try {
      const filename = await generateImage(archetype);
      results.push({ key: archetype.key, filename, success: true });
      // Delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 3000));
    } catch (err) {
      console.error(`  Error: ${err.message}`);
      results.push({ key: archetype.key, success: false, error: err.message });
    }
  }

  console.log('\n--- Results ---');
  const succeeded = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  console.log(`Generated: ${succeeded}/14`);
  if (failed > 0) {
    console.log(`Failed: ${results.filter(r => !r.success).map(r => r.key).join(', ')}`);
  }
}

main().catch(console.error);
