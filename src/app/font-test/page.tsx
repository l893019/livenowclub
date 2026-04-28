export default function FontTest() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&display=swap" rel="stylesheet" />
      <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet" />

      <style>{`
        :root {
          --cream: #FAF6F1;
          --charcoal: #2D2A26;
          --pink: #E8178A;
          --text-dim: rgba(45, 42, 38, 0.7);

          --font-display: 'Libre Caslon Display', serif;
          --font-sans: 'Satoshi', -apple-system, sans-serif;
        }

        body {
          font-family: var(--font-sans);
          font-size: 19px;
          line-height: 1.8;
          color: var(--charcoal);
          background: var(--cream);
        }

        .font-test-container {
          padding: 60px 24px;
          max-width: 680px;
          margin: 0 auto;
        }

        .font-test-container h1,
        .font-test-container h2,
        .font-test-container h3,
        .font-test-container h4 {
          font-family: var(--font-display);
          font-weight: 400;
          line-height: 1.2;
          margin-bottom: 24px;
        }

        .font-test-container h1 {
          font-size: 56px;
          margin-bottom: 12px;
        }

        .font-test-container h2 {
          font-size: 42px;
          margin-top: 60px;
        }

        .font-test-container h3 {
          font-size: 32px;
          margin-top: 48px;
        }

        .font-test-container p {
          margin-bottom: 24px;
        }

        .subtitle {
          font-family: var(--font-sans);
          font-size: 21px;
          color: var(--text-dim);
          margin-bottom: 48px;
        }

        .font-test-container blockquote {
          font-family: var(--font-display);
          font-size: 28px;
          line-height: 1.6;
          color: var(--charcoal);
          margin: 48px 0;
          padding: 32px;
          border-left: 3px solid var(--pink);
          background: rgba(232, 23, 138, 0.03);
        }

        .nav {
          font-family: var(--font-display);
          font-size: 18px;
          display: flex;
          gap: 32px;
          margin-bottom: 60px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(45, 42, 38, 0.1);
        }

        .nav a {
          color: var(--charcoal);
          text-decoration: none;
        }

        .nav a:hover {
          color: var(--pink);
        }

        .button {
          display: inline-block;
          padding: 16px 32px;
          background: var(--pink);
          color: white;
          text-decoration: none;
          font-family: var(--font-sans);
          font-weight: 500;
          border-radius: 4px;
          margin-top: 24px;
        }

        .comparison {
          margin-top: 80px;
          padding-top: 40px;
          border-top: 2px solid var(--charcoal);
        }

        .comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-top: 40px;
        }

        .current h4 {
          font-family: 'Satoshi', sans-serif;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .proposed h4 {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 400;
          margin-bottom: 16px;
        }

        .label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-dim);
          margin-bottom: 8px;
        }

        @media (max-width: 640px) {
          .font-test-container h1 {
            font-size: 42px;
          }
          .font-test-container h2 {
            font-size: 32px;
          }
          .comparison-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="font-test-container">
        <nav className="nav">
          <a href="#">Read</a>
          <a href="#">Navigate</a>
          <a href="#">Wonder</a>
          <a href="#">Connect</a>
        </nav>

        <h1>The Live Now Club</h1>
        <p className="subtitle">Essays and poems on life, love, cancer, and the relentless pursuit of joy.</p>

        <p>I started writing to leave a mark in case I don't survive. Now I write to live.</p>

        <p>Facing my mortality has revealed how much of my life I spent curating myself into smallness. Living now has become my spiritual practice, my rebellion.</p>

        <h2>Playing Reindeer Games</h2>

        <p>I think the hardest thing in the world is to be a mother, and perhaps the second hardest is to fathom how none of this would exist without them. It's impossible to imagine.</p>

        <p>She has manufactured every possible way for me to live my happiest life, regardless of my physical circumstance, surrounding me with beauty and joy, frequent trips to nature, opportunities to swim once I was physically able, and constant visits from my closest friends.</p>

        <blockquote>
          "Cancer hasn't shrunk my life. It has skimmed it."
        </blockquote>

        <h3>God is in the Trees</h3>

        <p>I wanted to burn something to make something, the elements of carbon rearranging themselves from destruction to life. Years ago, on a solo walk in the woods, I stopped in a circle of redwoods and sat for hours in silence.</p>

        <p>Creative compulsion is a bodily thing. It arrives like constipation, an uneasy pressure, requiring my full life force to emerge. I wonder if this is what pregnancy feels like, something slowly kicking against the walls of you, demanding to exist.</p>

        <a href="#" className="button">Join the Newsletter</a>

        <div className="comparison">
          <h2>Side-by-Side Comparison</h2>

          <div className="comparison-grid">
            <div className="current">
              <p className="label">Current (Satoshi)</p>
              <h4 style={{fontFamily: "'Satoshi', sans-serif", fontWeight: 700}}>The Live Now Club</h4>
              <h4 style={{fontFamily: "'Satoshi', sans-serif", fontWeight: 700}}>Playing Reindeer Games</h4>
              <h4 style={{fontFamily: "'Satoshi', sans-serif", fontWeight: 700}}>God is in the Trees</h4>
            </div>

            <div className="proposed">
              <p className="label">Proposed (Libre Caslon Display)</p>
              <h4>The Live Now Club</h4>
              <h4>Playing Reindeer Games</h4>
              <h4>God is in the Trees</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
