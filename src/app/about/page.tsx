import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | The Live Now Club",
  description:
    "About Louise Ireland - writer, founder, investor, painter, experience designer. Creating conversations around life, loss, illness, and the choice to choose joy every time.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />

      <main className="about-page">
        {/* Hero with photo */}
        <section className="about-hero">
          <div className="about-hero-image">
            <img src="/images/louise-about.jpg" alt="Louise Ireland" />
          </div>
          <div className="about-hero-intro">
            <p className="about-label">About</p>
            <h1>Louise Ireland</h1>
            <p className="about-tagline">
              I'm <Link href="/">Louise</Link>. I am a person of many verbs (writer, founder,
              investor, painter, experience designer) who is working on being just a noun (human).
            </p>
            <p className="about-tagline">
              I created this space to start more conversations around life, loss, illness, and the
              choice to choose joy every time.
            </p>
          </div>
        </section>

        {/* Story */}
        <article className="about-content">
          <section className="about-section">
            <h2>My Story</h2>

            <p>
              In February 2025, my world was turned upside down. At age 34, I was diagnosed with
              Stage III cervical cancer out of nowhere, my only symptom being an abnormal period. I
              underwent a brutal round of external and internal radiation and chemotherapy that
              completely debilitated me, only to learn a few months after that it hadn't completely
              worked. My cancer had progressed across my body. I was given less than two years to
              live.
            </p>

            <p>
              I went through another round of several chemotherapies, immunotherapies, and an
              experimental vaccine. I received news in early 2026 that I no longer have active
              cancer in my body, but I am aware of the statistics around recurrence, so I am holding
              everything lightly.
            </p>

            <p className="about-link-para">
              You can read more about my journey with cancer here:{" "}
              <Link href="/navigate/cancer">Navigate</Link>
            </p>
          </section>

          <section className="about-section">
            <h2>Self-Love</h2>

            <p>
              I believe deeply that the purpose of our lives is to find peace in our souls. I made a
              pact with myself on February 13, 2022, that I would do whatever it would take.
            </p>

            <p className="about-link-para">
              You can read more about my journey to self-love here:{" "}
              <Link href="/read/i-love-lou">I Love Lou</Link>
            </p>
          </section>

          <section className="about-section">
            <h2>This Space</h2>

            <p>
              I write primarily for myself, but it means the world to know that it helps others in
              some way. I try to write bi-weekly, sometimes weekly, most often on Sundays, but
              sometimes it slips. I wax poetic about life, love, and the magic of the world. I am
              endlessly curious and always creating something, so this is a hub for anything that
              sparks my fancy.
            </p>

            <p className="about-link-para">
              You can read more about who I am at my core and how I live life here:{" "}
              <Link href="/navigate/life">Navigate Life</Link>
            </p>

            <p>
              I am most often found between San Francisco, airplanes, somewhere in the woods, the
              liminal spaces of hospitals, events I am creating, and the Pacific and Atlantic
              oceans.
            </p>
          </section>

          {/* Subscribe CTA */}
          <section className="about-cta">
            <h2>Join the Club</h2>
            <p>New essays delivered to your inbox.</p>
            <a
              href="https://louiseireland.substack.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              Subscribe on Substack
            </a>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
