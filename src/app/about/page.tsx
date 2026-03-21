import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | The Live Now Club",
  description: "About Louise Ireland - writer, entrepreneur, cancer survivor writing about what it means to live fully when time is uncertain.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />

      <main className="pt-24 pb-16">
        <article className="container-body">
          <header className="mb-12">
            <p className="text-tag mb-4">About</p>
            <h1 className="text-section">Louise Ireland</h1>
          </header>

          <div className="prose">
            <p>
              I write about what it means to live fully when time is uncertain.
            </p>

            <p>
              After a cancer diagnosis with a median two-year prognosis, I stopped living not to die—and started living to live. My friend Alex reframed it for me: the question isn't about survival, it's about presence.
            </p>

            <p>
              Susan Sontag wrote that "illness is the night-side of life." I've found that the night-side has its own luminosity—not the harsh light of battle, but something softer. The glow of figs ripening in August. The warmth of a Roman sunset. The taste of truffle tagliatelle when you're determined not to waste a single thread.
            </p>

            <h2>The Live Now Club</h2>

            <p>
              This is a space where mortality and joy coexist. Where we ask the question: What would you do if you knew your time was short?
            </p>

            <p>
              I named it after a conversation with my doctor. Not the "I'm Going to Beat This" club, because I reject the battle metaphors. Not the "Everything Happens for a Reason" club, because some things just happen. The Live Now Club—because now is all we have.
            </p>

            <h2>Before This</h2>

            <p>
              I've built companies, spoken at the World Economic Forum, been profiled in Forbes, and worked with venture capital. None of that matters as much as what I'm building now: a body of work that might help someone else navigate the night-side.
            </p>

            <p>
              Cancer hasn't shrunk my life. It has skimmed it—reduced it to essence, like the best fig jam you've ever tasted.
            </p>
          </div>

          {/* Subscribe CTA */}
          <div className="mt-16 card bg-bg2 border-0 text-center py-12">
            <h2 className="text-section mb-4">Join the Club</h2>
            <p className="text-body mb-6">New essays delivered to your inbox.</p>
            <a
              href="https://livenowclub.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Subscribe on Substack
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
