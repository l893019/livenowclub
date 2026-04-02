import type { Metadata } from "next";
import Link from "next/link";
import ShareButton from "./ShareButton";
import CreateUtopiaSection from "./CreateUtopiaSection";
import UtopiaReadyBanner from "./UtopiaReadyBanner";
import { ResultPageClient } from "./ResultPageClient";
import { RadarChart } from "@/components/RadarChart";

// Map compatibility descriptions to archetype keys
const compatibilityMap: Record<string, string> = {
  "the one who wants to feel everything": "alive",
  "the one who's watching for what's being hidden": "conscience",
  "the one who craves difficulty": "friction",
  "the one who chose stillness": "rooted",
  "the one who guards what came before": "embers",
  "the one who fixes what's broken": "mender",
  "the one who left the body behind": "unbound",
  "the one who lives in questions": "swimmer",
  "the one who values presence above all": "presence",
  "the one who builds collective structures": "architect",
  "the one who can't stop building": "shaper",
  "the one who tells the truth": "cleareyed",
  "the one who's made peace with abundance": "citizen",
  "the one still figuring it out": "between",
};

const archetypes: Record<string, {
  name: string;
  description: string;
  utopia: string;
  blindSpot: string;
  color: string;
  books: { title: string; author: string; reason: string }[];
  compatibility: { ally: string; tension: string; need: string };
}> = {
  citizen: {
    name: "Citizen of Abundance",
    description: "Let the machines handle the drudgery. You have better things to do with being alive. You know how power works and you know that utopia still needs someone watching the edges. You also trust that intelligence, properly distributed, tends toward good. Too much freedom will always be preferable to too little. Comfort doesn't frighten you. Boredom does.",
    utopia: "Your utopia has no word for \"job.\" They used to, but it fell out of the language three centuries ago.",
    blindSpot: "You sometimes mistake access for equity. Everyone having options is not the same as everyone being free.",
    color: "#3db9a4",
    books: [
      { title: "The Player of Games", author: "Banks", reason: "The Culture at its most playful—a civilization where games become the highest art because survival has been solved." },
      { title: "Accelerando", author: "Stross", reason: "What happens when abundance accelerates past human comprehension, and the economy becomes incomprehensible to its creators." },
      { title: "Down and Out in the Magic Kingdom", author: "Doctorow", reason: "Post-scarcity as actually lived: messy, political, and still full of people trying to figure out what matters." }
    ],
    compatibility: {
      ally: "the one who wants to feel everything",
      tension: "the one who's watching for what's being hidden",
      need: "the one who craves difficulty"
    }
  },
  shaper: {
    name: "Shaper of Change",
    description: "You don't trust stillness. The moment you stop adapting, you start calcifying, and you've seen it happen to every institution, every relationship, every version of yourself you've held onto too long. The transition ahead is raw material. The future is something you build with whatever is at hand, including the wreckage. You've probably already started.",
    utopia: "Your utopia is never finished. Everything is always changing.",
    blindSpot: "You sometimes mistake movement for progress. Tearing something down and building something new can be its own form of running away.",
    color: "#f4a03f",
    books: [
      { title: "Parable of the Sower", author: "Butler", reason: "Building a new belief system from the ruins. Change as spiritual practice." },
      { title: "Red Mars", author: "Robinson", reason: "Terraforming as philosophy—every technical choice is a political one, and the planet pushes back." },
      { title: "The Diamond Age", author: "Stephenson", reason: "Education as revolution. The primer doesn't just teach—it transforms who you can become." }
    ],
    compatibility: {
      ally: "the one who craves difficulty",
      tension: "the one who chose stillness",
      need: "the one who guards what came before"
    }
  },
  architect: {
    name: "Architect of the Commons",
    description: "You focus on the structures. Because the best people in the world will still reproduce the old hierarchies if the structures allow it. You'd rather build something imperfect and collectively owned than something elegant and controlled by a few. Mutual aid is a practice, and it requires showing up. You show up.",
    utopia: "Your utopia belongs to everyone and answers to no one. It doesn't work perfectly but it belongs to the people inside it.",
    blindSpot: "You sometimes love the system more than the people inside it. The meeting can become more important than what the meeting was for.",
    color: "#9b8fef",
    books: [
      { title: "The Dispossessed", author: "Le Guin", reason: "The ambiguous utopia. Anarchism as lived practice, with all its frustrations and freedoms." },
      { title: "Pacific Edge", author: "Robinson", reason: "Utopia is zoning laws and water rights. The quiet work of making a good society actually function." },
      { title: "Four Ways to Forgiveness", author: "Le Guin", reason: "Liberation is not a moment but a generation. The slow, painful work of building freedom after slavery." }
    ],
    compatibility: {
      ally: "the one who fixes what's broken",
      tension: "the one who left the body behind",
      need: "the one who lives in questions"
    }
  },
  presence: {
    name: "Keeper of Presence",
    description: "You keep coming back to the same realization: that the thing that actually changes a life is a person choosing to be present for another person. You appreciate what machines can do. You also know the difference between capability and care, and you've never confused the two. Someone's life is different because you showed up. You may not even know whose.",
    utopia: "Your utopia decided that the most valuable thing in the universe was undivided attention, and built its entire economy around it.",
    blindSpot: "You sometimes use care as a way to avoid confrontation. Staying in the room is not always the brave choice. Sometimes the brave choice is leaving it.",
    color: "#e8178a",
    books: [
      { title: "The Diamond Age", author: "Stephenson", reason: "A hired actress becomes a surrogate mother through a machine. Presence transmitted through technology but never replaced by it." },
      { title: "Klara and the Sun", author: "Ishiguro", reason: "An AI friend who sees everything and is seen by almost no one. The quiet devastation of being present for someone who doesn't stay." },
      { title: "The Lifecycle of Software Objects", author: "Chiang", reason: "Raising digital beings requires the same thing as raising children: showing up, year after year, when it's no longer novel." }
    ],
    compatibility: {
      ally: "the one who chose stillness",
      tension: "the one who left the body behind",
      need: "the one who tells the truth"
    }
  },
  swimmer: {
    name: "Swimmer in Deep Water",
    description: "You resist the urge to resolve. Most people see a problem and want to solve it. You see a question and want to live inside it. The edges of understanding are where the interesting things happen, and you've always been drawn there. You are comfortable with ambiguity in a world that punishes it, and you suspect that this comfort is its own form of wisdom.",
    utopia: "Your utopia is a civilization of philosophers. Their single ambition is to reach the deepest level of questioning ever achieved.",
    blindSpot: "You can sit with a question so long that it becomes an excuse to never act. At some point, not-knowing becomes its own form of cowardice.",
    color: "#6b8fef",
    books: [
      { title: "Solaris", author: "Lem", reason: "An ocean that may be conscious but refuses to be understood. Contact as permanent mystery." },
      { title: "Blindsight", author: "Watts", reason: "What if consciousness is a bug, not a feature? The deepest questions have no comfortable answers." },
      { title: "Story of Your Life", author: "Chiang", reason: "Learning an alien language that reveals time differently. Knowing the ending doesn't diminish the living." }
    ],
    compatibility: {
      ally: "the one who left the body behind",
      tension: "the one who fixes what's broken",
      need: "the one who builds collective structures"
    }
  },
  rooted: {
    name: "Rooted in Stillness",
    description: "You've arrived at something most people spend their lives running from: the possibility that you don't need a reason to be here. Purpose is a construct. Productivity is a habit. The most radical thing you can do in a world optimized for output is to stop, and mean it. You pour the tea. You notice what's in front of you. You find that it's enough.",
    utopia: "Your utopia returned to a simpler way of life, on purpose, with full knowledge of what it was giving up.",
    blindSpot: "Your stillness can look a lot like withdrawal to the people who need you. Choosing to stop is a luxury not everyone can afford.",
    color: "#7ed6a4",
    books: [
      { title: "A Psalm for the Wild-Built", author: "Chambers", reason: "A monk and a robot ask what we're for. The answer might be: nothing, and that's okay." },
      { title: "Always Coming Home", author: "Le Guin", reason: "A civilization that chose not to progress. The anthropology of people who stayed put." },
      { title: "Piranesi", author: "Clarke", reason: "A man who has forgotten the world and found peace in a house with no exit. Presence without purpose." }
    ],
    compatibility: {
      ally: "the one who values presence above all",
      tension: "the one who can't stop building",
      need: "the one who wants to feel everything"
    }
  },
  conscience: {
    name: "Conscience Before Comfort",
    description: "You see what others prefer to ignore. The comfortable prison. The soft erosion. The hierarchy that rebrands itself as community. You believe in what humans can be. You also refuse to look away from what they become when no one is paying attention. Someone has to watch the watchers. You've always known it would be you.",
    utopia: "Your utopia built accountability into the architecture. Every leader's decisions are projected onto the sky the day they leave office.",
    blindSpot: "You can become so focused on what's wrong that you forget to notice what's working. Permanent suspicion is its own kind of prison.",
    color: "#d64545",
    books: [
      { title: "1984", author: "Orwell", reason: "The nightmare that taught us to recognize the signs. Big Brother wasn't a prediction—it was a warning." },
      { title: "Brave New World", author: "Huxley", reason: "The dystopia that seduces. Comfort as control. The soma we choose over the truth we can't bear." },
      { title: "The Handmaid's Tale", author: "Atwood", reason: "Everything in this book has happened somewhere. The power of witness against forgetting." }
    ],
    compatibility: {
      ally: "the one who tells the truth",
      tension: "the one who's made peace with abundance",
      need: "the one who values presence above all"
    }
  },
  embers: {
    name: "Keeper of Embers",
    description: "Everyone else is racing forward. You keep looking back, because you have this stubborn conviction that we've already figured most of this out and keep forgetting. Oral traditions, old religions, indigenous knowledge, the grandmother's hand on the child's head. The most dangerous thing about acceleration is amnesia. The answers aren't in the next technology. They're in the last ten thousand years.",
    utopia: "Your utopia's most protected resource is not water or energy. It's memory.",
    blindSpot: "You can love what was so deeply that you become hostile to what could be. The archive becomes a fortress. The past becomes an identity.",
    color: "#c97d3a",
    books: [
      { title: "A Canticle for Leibowitz", author: "Miller", reason: "Monks preserving fragments of knowledge through a dark age. Memory as sacred duty." },
      { title: "Always Coming Home", author: "Le Guin", reason: "A future that remembers how to live. The Kesh didn't lose the old ways—they chose them." },
      { title: "Parable of the Talents", author: "Butler", reason: "Building a religion from what survives. The ember that becomes a fire." }
    ],
    compatibility: {
      ally: "the one who builds collective structures",
      tension: "the one who can't stop building",
      need: "the one still figuring it out"
    }
  },
  friction: {
    name: "Alive in the Friction",
    description: "Ease is more dangerous than difficulty. Something in us requires resistance. The act of pushing against something is how we know we're alive, and you've always known this in your bones. Take away every problem and you don't get paradise. You get a species that has forgotten how to want. You'd rather build the boat in a storm than float in still water.",
    utopia: "Your utopia kept one part of the world deliberately dangerous, because the people who built it believed that too much safety would kill something essential in the species.",
    blindSpot: "You can mistake difficulty for meaning. Not everything that's hard is worth doing. Sometimes the easy path is the right one and you can't accept that.",
    color: "#ff6b35",
    books: [
      { title: "The Stars My Destination", author: "Bester", reason: "Revenge as rocket fuel. A man who burns through every obstacle because stopping would mean facing himself." },
      { title: "The Moon Is a Harsh Mistress", author: "Heinlein", reason: "Revolution as engineering problem. Free people building freedom from scratch, with math." },
      { title: "The Evolutionary Void", author: "Hamilton", reason: "Post-human and still striving. Even with god-like powers, there's always another frontier." }
    ],
    compatibility: {
      ally: "the one who can't stop building",
      tension: "the one who chose stillness",
      need: "the one who values presence above all"
    }
  },
  unbound: {
    name: "Unbound from Form",
    description: "You look at the species and see a draft. A first attempt. You're curious about what comes next. Uploading, merging, subliming, evolving. The vocabulary doesn't matter. The boundary of the self is simply not where you stop. Most people find this frightening. You find it the most interesting question there is.",
    utopia: "Your utopia transcended the physical. You exist as pure consciousness now, moving through dimensions that don't have names.",
    blindSpot: "You left so much behind that you may not recognize what was worth keeping until it's too late. Evolution without memory is just forgetting with better marketing.",
    color: "#a855f7",
    books: [
      { title: "Childhood's End", author: "Clarke", reason: "The last generation of humans watches their children become something unrecognizable. Evolution as transcendence and loss." },
      { title: "Diaspora", author: "Egan", reason: "Minds running on quantum computers, exploring mathematical universes. What's left when the body is optional?" },
      { title: "The Hydrogen Sonata", author: "Banks", reason: "A civilization preparing to Sublime—to leave the material universe entirely. The party at the end of history." }
    ],
    compatibility: {
      ally: "the one who lives in questions",
      tension: "the one who values presence above all",
      need: "the one who guards what came before"
    }
  },
  alive: {
    name: "Alive to Everything",
    description: "You don't need a reason. You need a body, a world, and enough time. Change your form, change your perspective, taste every experience, climb every mountain, love every person who'll have you, and when you've done all of it, start again. The universe gave you everything. The least you can do is feel it. You suspect that most philosophies of meaning are elaborate ways of avoiding pleasure.",
    utopia: "Your utopia engineered twelve new senses and a sunset that lasts all day.",
    blindSpot: "Sensation can become consumption. Feeling everything is not the same as understanding anything. The twelfth sense doesn't help if the first five are numb from overuse.",
    color: "#f472b6",
    books: [
      { title: "Surface Detail", author: "Banks", reason: "Virtual heavens and hells. The Culture debates whether experience without consequence still counts." },
      { title: "Trouble on Triton", author: "Delany", reason: "Change your body, your gender, your neighborhood, your self. Freedom as endless reconfiguration." },
      { title: "Schismatrix Plus", author: "Sterling", reason: "Humanity splinters into a thousand experiments. Every faction trying to feel more, differently, longer." }
    ],
    compatibility: {
      ally: "the one who's made peace with abundance",
      tension: "the one who's watching for what's being hidden",
      need: "the one who tells the truth"
    }
  },
  mender: {
    name: "Mender of What Remains",
    description: "You look at the stars and feel nothing pulling you toward them. The work is here. The soil, the water, the damaged systems, the fraying relationships. While everyone else is building arks and uploading their consciousness, you're fixing the thing in front of you. The most radical act in an age of acceleration is to stay, to repair, to solve the specific problem that no one else cares about. The future is the next thing that needs doing.",
    utopia: "Your utopia decided that the most advanced act of engineering was making what already existed work again instead of building something new.",
    blindSpot: "You can become so focused on repair that you miss when something needs to die. Not everything should be saved. Some things are broken because they should be.",
    color: "#10b981",
    books: [
      { title: "The Ministry for the Future", author: "Robinson", reason: "Climate repair as political thriller. Every chapter a different tool for fixing what we broke." },
      { title: "New York 2140", author: "Robinson", reason: "The city floods and people stay anyway. Adaptation as stubborn hope." },
      { title: "Station Eleven", author: "Mandel", reason: "After collapse, someone has to remember Shakespeare. Art as repair of the spirit." }
    ],
    compatibility: {
      ally: "the one who builds collective structures",
      tension: "the one who lives in questions",
      need: "the one who craves difficulty"
    }
  },
  cleareyed: {
    name: "Clear-Eyed in the Storm",
    description: "You have one job: to see what is actually happening and say it out loud. The version that's true. The one that makes people uncomfortable. Most people don't want this from you. Civilizations survive by the quality of their honest observers, though, and collapse when the honest observers go quiet. You won't be the one who goes quiet.",
    utopia: "Your utopia has one person whose only job is to tell the truth. They answer to no one. They are the most feared and most respected person in the civilization.",
    blindSpot: "Honesty without tenderness is cruelty. You can see everything clearly and still miss the most important thing in the room, which is how your truth lands on the person hearing it.",
    color: "#64748b",
    books: [
      { title: "Slaughterhouse-Five", author: "Vonnegut", reason: "So it goes. The only honest response to war is to say what happened and not look away." },
      { title: "His Master's Voice", author: "Lem", reason: "Scientists trying to decode an alien message and mostly decoding their own limitations." },
      { title: "The Road", author: "McCarthy", reason: "No hope, no rescue, no meaning—just a father and son walking. The truth stripped to bone." }
    ],
    compatibility: {
      ally: "the one who's watching for what's being hidden",
      tension: "the one who wants to feel everything",
      need: "the one who chose stillness"
    }
  },
  between: {
    name: "In the Space Between",
    description: "This isn't a philosophy you chose. It's a condition you're living in. The old world shifted and left you standing in a place you don't recognize. You're figuring out how to breathe in a room with no familiar walls. Everyone else on this list has a position. You have a question. And you're still here, which might be the bravest thing on this list.",
    utopia: "Your utopia just started to exist. Nothing is built yet. It's the beginning of an idea.",
    blindSpot: "The space between can become a permanent address. At some point, not knowing what you are becomes a way of avoiding the risk of choosing.",
    color: "#8b8b8b",
    books: [
      { title: "Never Let Me Go", author: "Ishiguro", reason: "Knowing your fate doesn't prepare you for it. The space between knowledge and acceptance." },
      { title: "Station Eleven", author: "Mandel", reason: "The before and the after, and the people caught in the middle trying to remember who they were." },
      { title: "The Left Hand of Darkness", author: "Le Guin", reason: "An envoy on a world without gender, learning that everything he knew was local. The space between cultures." }
    ],
    compatibility: {
      ally: "the one who guards what came before",
      tension: "the one who craves difficulty",
      need: "the one who can't stop building"
    }
  }
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const archetypeKey = (typeof params.a === 'string' ? params.a : 'citizen') as string;
  const shadowKey = (typeof params.s === 'string' ? params.s : null) as string | null;
  const data = archetypes[archetypeKey] || archetypes.citizen;

  const title = "What's your post-scarcity worldview?";
  const ogImage = `https://livenowclub.vercel.app/wonder/essay/quiz/images/utopia-${archetypeKey}.png`;

  const pageUrl = shadowKey
    ? `https://livenowclub.vercel.app/wonder/essay/quiz/result?a=${archetypeKey}&s=${shadowKey}`
    : `https://livenowclub.vercel.app/wonder/essay/quiz/result?a=${archetypeKey}`;

  return {
    title: `${data.name} | Sci-Fi Worldview Quiz`,
    description: data.utopia,
    openGraph: {
      title,
      description: data.utopia,
      images: [ogImage],
      url: pageUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: data.utopia,
      images: [ogImage],
    },
  };
}

export default async function QuizResultPage({ searchParams }: Props) {
  const params = await searchParams;
  const archetypeKey = (typeof params.a === 'string' ? params.a : 'citizen') as string;
  const shadowKey = (typeof params.s === 'string' ? params.s : null) as string | null;
  const data = archetypes[archetypeKey] || archetypes.citizen;
  const shadowData = shadowKey && archetypes[shadowKey] ? archetypes[shadowKey] : null;

  const shareText = shadowData
    ? `"${data.utopia}"\n\nI'm a ${data.name} with shades of ${shadowData.name}.\n\nWhat's your post-scarcity worldview?`
    : `"${data.utopia}"\n\nI'm a ${data.name}.\nWhat's your post-scarcity worldview?`;
  const shareUrl = shadowKey
    ? `https://livenowclub.vercel.app/wonder/essay/quiz/result?a=${archetypeKey}&s=${shadowKey}`
    : `https://livenowclub.vercel.app/wonder/essay/quiz/result?a=${archetypeKey}`;

  const imageUrl = `/wonder/essay/quiz/images/utopia-${archetypeKey}.png`;

  return (
    <ResultPageClient
      archetypeName={data.name}
      archetypeColor={data.color}
      utopiaText={data.utopia}
      imageUrl={imageUrl}
    >
      <style>{`
        :root {
          --bg-deep: #faf6f1;
          --bg: #fffbf7;
          --text: #2d2a26;
          --text-dim: rgba(45,42,38,0.7);
          --text-muted: rgba(45,42,38,0.45);
          --accent-pink: #e8178a;
          --accent-color: ${data.color};
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
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 32px;
          background: rgba(250, 247, 242, 0.95);
          backdrop-filter: blur(20px);
        }
        .logo-img { height: 40px; width: auto; }
        .nav { display: flex; gap: 24px; }
        .nav a {
          font-size: 12px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-dim);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav a:hover { color: var(--accent-pink); }
        .result-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 120px 24px 80px;
          text-align: center;
        }
        .result-label {
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--accent-color);
          margin-bottom: 24px;
        }
        .result-name {
          font-size: 2.5rem;
          font-weight: 300;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }
        .result-name-link {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
        }
        .result-name-link:hover {
          color: var(--accent-color);
          text-decoration: underline;
          text-underline-offset: 4px;
        }
        .result-shadow {
          font-size: 1.1rem;
          font-weight: 300;
          color: var(--text-muted);
          margin-bottom: 32px;
        }
        .utopia-card {
          background: white;
          border-radius: 16px;
          padding: 0;
          max-width: 520px;
          margin-bottom: 40px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          overflow: hidden;
        }
        .utopia-image {
          width: 100%;
          height: auto;
          display: block;
        }
        .utopia-card .utopia-label,
        .utopia-card .utopia-text {
          padding: 0 32px;
        }
        .utopia-card .utopia-label {
          padding-top: 24px;
        }
        .utopia-card .utopia-text {
          padding-bottom: 32px;
        }
        .utopia-label {
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        .utopia-text {
          font-size: 1.2rem;
          font-style: italic;
          line-height: 1.7;
          color: var(--text);
        }
        .result-description {
          max-width: 600px;
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--text);
          margin-bottom: 40px;
        }
        .radar-section {
          margin-bottom: 40px;
          text-align: center;
        }
        .radar-label {
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          margin-bottom: 16px;
        }
        .blind-spot {
          max-width: 500px;
          padding: 24px;
          background: rgba(0,0,0,0.03);
          border-radius: 12px;
          margin-bottom: 40px;
        }
        .blind-spot-label {
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .blind-spot-text {
          font-size: 0.95rem;
          color: var(--text-dim);
          line-height: 1.7;
        }
        .compatibility {
          max-width: 500px;
          margin-bottom: 40px;
          text-align: left;
        }
        .compatibility-label {
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          margin-bottom: 16px;
          text-align: center;
        }
        .compatibility-item {
          padding: 12px 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .compatibility-item:last-child { border-bottom: none; }
        .compatibility-type {
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent-color);
          margin-bottom: 4px;
        }
        .compatibility-text {
          font-size: 0.95rem;
          color: var(--text);
        }
        .books-section {
          margin-bottom: 48px;
          max-width: 520px;
        }
        .books-label {
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          margin-bottom: 16px;
        }
        .books-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .book-item {
          text-align: left;
          padding: 16px 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .book-header {
          font-size: 1rem;
          color: var(--text-dim);
          margin-bottom: 8px;
        }
        .book-title {
          font-style: italic;
          color: var(--text);
          font-weight: 400;
        }
        .book-reason {
          font-size: 0.9rem;
          color: var(--text-dim);
          line-height: 1.6;
          margin-bottom: 8px;
        }
        .book-link {
          font-size: 0.8rem;
          color: var(--accent-pink);
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .book-link:hover {
          opacity: 0.7;
        }
        .compatibility-link {
          color: var(--text);
          text-decoration: none;
          transition: color 0.2s;
        }
        .compatibility-link:hover {
          color: var(--accent-pink);
        }
        .cta-primary {
          margin-bottom: 48px;
        }
        .cta-tertiary {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 48px;
        }
        .cta-link {
          font-size: 0.95rem;
          color: var(--text-dim);
          text-decoration: none;
          transition: color 0.2s;
        }
        .cta-link:hover {
          color: var(--accent-pink);
        }
        .cta-divider {
          color: var(--text-muted);
        }
        .footer-newsletter {
          margin-bottom: 24px;
        }
        .footer-newsletter a {
          font-size: 0.9rem;
          color: var(--text-dim);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-newsletter a:hover {
          color: var(--accent-pink);
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          border-radius: 50px;
          transition: all 0.3s;
          cursor: pointer;
          border: none;
          font-family: inherit;
        }
        .btn-primary {
          background: var(--accent-pink);
          color: white;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(232,23,138,0.3);
        }
        .btn-secondary {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--text-muted);
        }
        .btn-secondary:hover {
          border-color: var(--accent-pink);
          color: var(--accent-pink);
        }
        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .footer {
          padding: 60px 24px;
          text-align: center;
          border-top: 1px solid rgba(232,23,138,0.1);
        }
        .footer-quote {
          font-size: 1rem;
          font-style: italic;
          color: var(--text-dim);
          margin-bottom: 24px;
        }
        .footer-nav {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-bottom: 24px;
        }
        .footer-nav a {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-dim);
          text-decoration: none;
        }
        .footer-copy {
          font-size: 12px;
          color: var(--text-muted);
        }
        @media (max-width: 640px) {
          .result-name { font-size: 1.8rem; }
          .header { padding: 12px 16px; }
          .nav { gap: 16px; }
          .nav a { font-size: 10px; }
          .utopia-card { padding: 24px; }
          .utopia-text { font-size: 1.1rem; }
        }
      `}</style>

      <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet" />

      <header className="header">
        <Link href="/" className="logo">
          <img src="/images/logo-handwritten.png" alt="The Live Now Club" className="logo-img" />
        </Link>
        <nav className="nav">
          <Link href="/read">Read</Link>
          <Link href="/navigate">Navigate</Link>
          <Link href="/wonder">Wonder</Link>
          <Link href="/connect">Connect</Link>
        </nav>
      </header>

      <main className="result-container">
        <div className="result-label">You are</div>
        <h1 className="result-name">
          <Link href={`/wonder/essay/quiz/explore/#${archetypeKey}`} className="result-name-link">{data.name}</Link>
        </h1>
        {shadowData && shadowKey && (
          <p className="result-shadow">with a streak of <Link href={`/wonder/essay/quiz/result?a=${shadowKey}`} style={{ color: shadowData.color, fontStyle: 'italic', textDecoration: 'none' }}>{shadowData.name}</Link></p>
        )}

        <div className="utopia-card">
          <img
            src={`/wonder/essay/quiz/images/utopia-${archetypeKey}.png`}
            alt={`${data.name} utopia illustration`}
            className="utopia-image"
          />
          <div className="utopia-label">Your Utopia</div>
          <p className="utopia-text">{data.utopia}</p>
        </div>

        <div className="radar-section">
          <div className="radar-label">Your Position</div>
          <RadarChart size={280} highlightArchetype={archetypeKey} />
        </div>

        <p className="result-description">{data.description}</p>

        <div className="blind-spot">
          <div className="blind-spot-label">What you might miss</div>
          <p className="blind-spot-text">{data.blindSpot}</p>
        </div>


        <div className="compatibility">
          <div className="compatibility-label">Your People</div>
          <div className="compatibility-item">
            <div className="compatibility-type">You'll click with</div>
            <div className="compatibility-text">
              <Link href={`/wonder/essay/quiz/result?a=${compatibilityMap[data.compatibility.ally]}`} className="compatibility-link">
                {archetypes[compatibilityMap[data.compatibility.ally]]?.name || data.compatibility.ally}
              </Link>
            </div>
          </div>
          <div className="compatibility-item">
            <div className="compatibility-type">You'll clash with</div>
            <div className="compatibility-text">
              <Link href={`/wonder/essay/quiz/result?a=${compatibilityMap[data.compatibility.tension]}`} className="compatibility-link">
                {archetypes[compatibilityMap[data.compatibility.tension]]?.name || data.compatibility.tension}
              </Link>
            </div>
          </div>
          <div className="compatibility-item">
            <div className="compatibility-type">You secretly need</div>
            <div className="compatibility-text">
              <Link href={`/wonder/essay/quiz/result?a=${compatibilityMap[data.compatibility.need]}`} className="compatibility-link">
                {archetypes[compatibilityMap[data.compatibility.need]]?.name || data.compatibility.need}
              </Link>
            </div>
          </div>
        </div>

        <div className="books-section">
          <div className="books-label">Books for You</div>
          <div className="books-list">
            {data.books.map((book, i) => (
              <div key={i} className="book-item">
                <div className="book-header">
                  <span className="book-title">{book.title}</span> ({book.author})
                </div>
                <div className="book-reason">{book.reason}</div>
                <a
                  href={`https://bookshop.org/search?keywords=${encodeURIComponent(book.title + ' ' + book.author)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="book-link"
                >
                  Find on Bookshop.org →
                </a>
              </div>
            ))}
          </div>
        </div>


        <div className="cta-primary">
          <ShareButton shareText={shareText} shareUrl={shareUrl} />
        </div>

        <CreateUtopiaSection archetypeKey={archetypeKey} />

        <div className="cta-tertiary">
          <Link href="/wonder/essay/quiz" className="cta-link">Retake Quiz</Link>
          <span className="cta-divider">·</span>
          <Link href="/wonder/essay" className="cta-link">Read the Essay</Link>
        </div>
      </main>

      <footer className="footer">
        <p className="footer-quote">What if now is all we have?</p>
        <p className="footer-newsletter">
          <a href="https://louiseireland.substack.com/subscribe" target="_blank" rel="noopener noreferrer">
            Subscribe for essays on meaning, mortality, and what comes next
          </a>
        </p>
        <nav className="footer-nav">
          <Link href="/read">Read</Link>
          <Link href="/navigate">Navigate</Link>
          <Link href="/wonder">Wonder</Link>
          <Link href="/connect">Connect</Link>
        </nav>
        <p className="footer-copy">&copy; 2026 Louise Ireland</p>
      </footer>

      <UtopiaReadyBanner />
    </ResultPageClient>
  );
}
