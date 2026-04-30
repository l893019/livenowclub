import Link from "next/link";

export const metadata = {
  title: "Philosophy | The Live Now Club",
  description:
    "My rules for living fully. I've tested these against mortality, heartbreak, and starting over.",
  keywords: [
    "life principles",
    "rules for living",
    "core values",
    "self-love",
    "personal philosophy",
    "living fully",
    "mindfulness",
    "wisdom",
  ],
  openGraph: {
    title: "Philosophy",
    description:
      "My rules for living fully.",
    type: "website",
    url: "https://livenowclub.vercel.app/philosophy",
  },
};

// Content from the design doc
const CORE_VALUES = {
  love: "My motto for life is \"Do it with love.\" I am love. My actions are defined by love.",
  yin: ["Nature grounding", "Calm", "Routine and structure", "Tradition", "Family loyalty", "Ritual"],
  yang: ["Beauty", "Curiosity", "Creativity", "Playfulness", "Health and vitality", "Sensuality", "Spontaneity"],
  questions: [
    "When did you stop dancing?",
    "When did you stop singing?",
    "When did you stop being enchanted by stories?",
    "When did you stop being comforted by the sweet territory of silence?",
  ],
};

const COMMANDMENTS = [
  { title: "Me", text: "I am the most special, sacred, magical, brilliant, caring, wonderful, loveable human I know. I live every second fully like I will die tomorrow." },
  { title: "My Body", text: "My body is divine. I treat myself as such. I focus on what nourishes me and enables me to feel my best energetically." },
  { title: "My Mind", text: "My mind is sacred. I learn like I will live forever. I take care of the information I absorb. I let the spark of curiosity guide me." },
  { title: "My Light", text: "I am a light to help others, but I must maintain myself first. I prioritize friendships that are mutual. I carve out space for Lou Time." },
  { title: "My Creativity", text: "I let my creativity flow as it will, and encourage whatever form it takes. I protect my state above all." },
  { title: "My Roots", text: "I am of the earth, the ocean, the air, and fire, and I need them all to survive and thrive fully. When I am in doubt, I get outside." },
  { title: "My Darkness", text: "I will treat joy and sadness as one. Things will come, and things will go. Everything is temporary and transitory." },
  { title: "My Magic", text: "I infuse my life with joyful and playful magic. No one can love me as well as I can love me." },
  { title: "My Love", text: "Love is always the answer. I lead with loving-kindness. I have an enormous and limitless heart." },
  { title: "My Choice", text: "I always turn to the light. Darkness and temptation will always be present, but I can make the conscious choice to choose light and love every time." },
];

const RULES_FOR_ROOTING = [
  "Be the creator, not the consumer, of your life. Do not live in default mode.",
  "The certainty of death is clarifying. Let mortality sharpen your priorities daily.",
  "Spend more time excavating your own mind than scrolling through others.",
  "You can't write your own story if you only ever say yes (or no).",
  "Flow trumps force. Work with your energy rhythms, not artificial deadlines.",
  "Wherever your body is, bring your mind. Half-presence is the thief of all experience.",
  "Let silence punctuate your days; without it, nothing has weight.",
  "The past is fact, but the beliefs you formed about it are fiction.",
  "Live your life in tune with nature. Avoid anything that disturbs your body's natural rhythm.",
  "Your body is a system; view it holistically.",
  "Pay attention to how you feel after you leave someone. That's the truth of the relationship.",
  "Where you place your attention, your life will follow.",
  "Amor Fati. Love your fate and commit to your becoming.",
  "Approach the world without the urge to classify or contain.",
  "Every moment you notice the birds, the wind, the trees, you are co-creating the world with it.",
  "Do not confuse stimulation with nourishment.",
  "Curate your environments as carefully as your thoughts.",
  "Seek thresholds and liminal spaces. The discomfort of transition is the price of transformation.",
  "Think in loops, not lines. What you put out will come back to you.",
  "Compassion is systems-thinking applied to people.",
  "Life lives in patterns. The micro is the macro in miniature.",
  "Feeling everything is better than feeling nothing. What you numb in yourself, you cannot heal.",
  "Do not get lost in the form. All religions, all art, all thought are prisms of the same source.",
  "The most personal truths are the most universal.",
  "Generosity is a system, not an act.",
  "Live the questions rather than forcing answers.",
  "Create without attachment to outcome. The act of making is the reward.",
  "If you want to change the world, focus first on yourself.",
  "Scarcity holds, abundance circulates. Life thrives in flow, not in grasping.",
  "To hold space well, you must clear your own.",
  "Without boredom and rest, imagination has no space to appear.",
  "To speak only in your voice is to live in coherence.",
  "The quality of your questions determines the quality of your life.",
  "Your dreams are your unconscious mind's way of processing what your waking mind cannot integrate.",
  "Learn to distinguish between what drains your energy and what transforms it.",
];

const BUILDING_BLOCKS = [
  { title: "Blood", text: "Do you have too much in your system or too little? Are your cells functioning as they should?" },
  { title: "Light", text: "We are meant to live with the sun. Our bodies need light in the morning to regulate themselves. And we need the inverse: the darkness of sleep, and the rest it brings." },
  { title: "Water", text: "How much exhaustion and mental fatigue can be attributed to dehydration? It is an easy way to kill a flower." },
  { title: "Food", text: "The healthiest diet for you is the one you can most easily digest and turn into lasting energy. It's back to whole foods, back to nature." },
  { title: "Breath", text: "How quickly we forget about the breath that sustains us. How grounding it is to breathe deeply, to focus on the exhale, then the inhale." },
  { title: "Spirit", text: "There is no biohack for the joy of having grass in your toes, wind in your face, staring up into the crown shyness of trees. You are more than your body, and yet you live humbly within it." },
];

const MANIFESTO_RULES = [
  "Any ideas or notions are half-baked, at best, and presented in their rawest un-edited form",
  "Write without judgment or ambition for anything other than an extension of my journal",
  "Any thematic writing should evolve naturally without being forced",
  "Maintain a questioning mindset (you will likely offend many along the way, including your future self)",
  "Write out of love for all parts of your being, no matter how ugly or uncool or idiotic they may be",
];

export default function PhilosophyPage() {
  return (
    <>
      {/* Header */}
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

      <div className="life-container">
        {/* Hero */}
        <section className="life-hero">
          <span className="life-label">Philosophy</span>
          <h1>The inputs that shape me</h1>
          <p>
            My rules for living fully.
            I've tested these against mortality, heartbreak, and starting over.
          </p>
        </section>

        {/* Quick Nav */}
        <nav className="life-nav">
          <a href="#the-root">The Root</a>
          <a href="#foundations">Foundations</a>
          <a href="#rules-for-rooting">Rules</a>
          <a href="#building-a-body">Body</a>
        </nav>

        {/* Section 1: The Root */}
        <section id="the-root" className="life-section">
          <div className="life-section-header">
            <span className="life-section-number">01</span>
            <h2>The Root</h2>
            <p className="life-section-subtitle">Core Values</p>
          </div>

          <div className="life-section-content">
            <p className="life-intro">
              My values form a living, cyclical system. The dance between softness and growth,
              with love as the trunk connecting them.
            </p>

            <div className="value-tree">
              <div className="value-tree-trunk">
                <h3>Love</h3>
                <p className="value-subtitle">the trunk, the center, the through-line</p>
                <blockquote>{CORE_VALUES.love}</blockquote>
              </div>

              <div className="value-tree-branches">
                <div className="value-branch value-branch--yin">
                  <h4>Softness / Yin</h4>
                  <p className="value-subtitle">what roots me</p>
                  <ul>
                    {CORE_VALUES.yin.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="value-branch value-branch--yang">
                  <h4>Growth / Yang</h4>
                  <p className="value-subtitle">what elevates me</p>
                  <ul>
                    {CORE_VALUES.yang.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="life-questions">
              <h4>The Questions</h4>
              <p>Four questions to guide you back to when you were last completely yourself:</p>
              <ol>
                {CORE_VALUES.questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ol>
            </div>

            <p className="life-source">
              From "Now That You No Longer Have to Be Perfect, You Can Just Be Good" — {" "}
              <Link href="/read/now-that-you-no-longer-have-to-be-perfect-you-can-just-be-good">
                Read the full essay →
              </Link>
            </p>
          </div>
        </section>

        {/* Section 2: Foundations */}
        <section id="foundations" className="life-section life-section--alt">
          <div className="life-section-header">
            <span className="life-section-number">02</span>
            <h2>Foundations</h2>
            <p className="life-section-subtitle">The 10 Commandments of Lou</p>
          </div>

          <div className="life-section-content">
            <p className="life-intro">
              Before I got sick, I married myself. These are the vows, my framework for loving
              myself and showing up consciously each day.
            </p>

            <ol className="commandments-list">
              {COMMANDMENTS.map((cmd, i) => (
                <li key={i} className="commandment">
                  <strong>{cmd.title}:</strong> {cmd.text}
                </li>
              ))}
            </ol>

            <p className="life-source">
              From "I Love Lou" — {" "}
              <Link href="/read/i-love-lou">Read the full essay →</Link>
            </p>
          </div>
        </section>

        {/* Section 3: Rules for Rooting */}
        <section id="rules-for-rooting" className="life-section">
          <div className="life-section-header">
            <span className="life-section-number">03</span>
            <h2>Rules for Rooting</h2>
            <p className="life-section-subtitle">35 Rules for the Next 35 Years</p>
          </div>

          <div className="life-section-content">
            <p className="life-intro">
              I wrote my 10 Commandments to learn how to love myself. These 35 rules came later,
              as I turned 35, crossing from climbing toward self-improvement to rooting into self-becoming.
            </p>

            <ol className="rules-list">
              {RULES_FOR_ROOTING.map((rule, i) => (
                <li key={i}>{rule}</li>
              ))}
            </ol>

            <p className="life-source">
              From "All I Want for My Birthday Is Another Shot at Life" — {" "}
              <Link href="/read/all-i-want-for-my-birthday-is-another-shot-at-life">
                Read the full essay →
              </Link>
            </p>
          </div>
        </section>

        {/* Section 4: Building a Body */}
        <section id="building-a-body" className="life-section life-section--alt">
          <div className="life-section-header">
            <span className="life-section-number">04</span>
            <h2>Building a Body</h2>
            <p className="life-section-subtitle">The 6 Building Blocks</p>
          </div>

          <div className="life-section-content">
            <p className="life-intro">
              A mantra that came to me during treatment, when I realized how much of our
              biohacking, supplement-obsessed culture misses the point:
            </p>

            <blockquote className="life-pull-quote">
              All that matters is blood, light, water, food, breath, and spirit.
            </blockquote>

            <div className="building-blocks">
              {BUILDING_BLOCKS.map((block, i) => (
                <div key={i} className="building-block">
                  <h4>{block.title}</h4>
                  <p>{block.text}</p>
                </div>
              ))}
            </div>

            <p className="life-source">
              From "Things I've Learned Lately" — {" "}
              <Link href="/read/things-ive-learned-lately">Read the full essay →</Link>
            </p>
          </div>
        </section>

        {/* Section 5: Ground Rules */}
        <section id="ground-rules" className="life-section">
          <div className="life-section-header">
            <span className="life-section-number">05</span>
            <h2>Ground Rules</h2>
            <p className="life-section-subtitle">The Manifesto</p>
          </div>

          <div className="life-section-content">
            <p className="life-intro">
              Before I wrote about cancer, before the diagnosis, I set down rules for how
              I wanted to create and share.
            </p>

            <ol className="manifesto-list">
              {MANIFESTO_RULES.map((rule, i) => (
                <li key={i}>{rule}</li>
              ))}
            </ol>

            <p className="life-source">
              From "Manifesto" — {" "}
              <Link href="/read/manifesto">Read the full essay →</Link>
            </p>
          </div>
        </section>

        {/* Closing */}
        <section className="life-closing">
          <p className="life-closing-statement">Love + Growth + Softness</p>
          <a
            href="https://louiseireland.substack.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            Subscribe to follow the journey
          </a>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-quote">What if now is all we have?</p>
        <nav className="footer-nav">
          <Link href="/read">Read</Link>
          <Link href="/navigate">Navigate</Link>
          <Link href="/wonder">Wonder</Link>
          <Link href="/connect">Connect</Link>
        </nav>
        <p className="footer-copy">&copy; 2026 Louise Ireland</p>
      </footer>
    </>
  );
}
