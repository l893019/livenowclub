"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";

export default function ConnectPage() {
  const [storySubmitted, setStorySubmitted] = useState(false);
  const [messageSubmitted, setMessageSubmitted] = useState(false);

  const handleStorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // TODO: Replace with your Formspree endpoint
    // Sign up at formspree.io and create a form to get your endpoint
    const response = await fetch("https://formspree.io/f/YOUR_STORY_FORM_ID", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setStorySubmitted(true);
      form.reset();
    }
  };

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // TODO: Replace with your Formspree endpoint
    const response = await fetch("https://formspree.io/f/YOUR_MESSAGE_FORM_ID", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setMessageSubmitted(true);
      form.reset();
    }
  };

  return (
    <>
      <Header />

      <div className="connect-container">
        {/* Hero */}
        <section className="connect-hero">
          <span className="connect-label">Connect</span>
          <h1>You're not alone in this.</h1>
          <p>
            Whether you have a story to share or just want to say hello,
            this is a space for real connection.
          </p>
        </section>

        {/* Two Column Layout */}
        <div className="connect-grid">
          {/* Share Your Story */}
          <section className="connect-form-section">
            <div className="connect-form-header">
              <h2>Share Your Story</h2>
              <p>
                Have you faced something that changed how you see time?
                Your story might help someone else feel less alone.
              </p>
            </div>

            {storySubmitted ? (
              <div className="connect-success">
                <p>Thank you for sharing. Your story matters.</p>
              </div>
            ) : (
              <form onSubmit={handleStorySubmit} className="connect-form">
                <div className="form-group">
                  <label htmlFor="story-name">Name (or anonymous)</label>
                  <input
                    type="text"
                    id="story-name"
                    name="name"
                    placeholder="What should I call you?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="story-email">Email</label>
                  <input
                    type="email"
                    id="story-email"
                    name="email"
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="story-content">Your Story</label>
                  <textarea
                    id="story-content"
                    name="story"
                    required
                    rows={8}
                    placeholder="Tell me what happened, what you learned, or what you're still figuring out..."
                  />
                </div>

                <div className="form-group form-checkbox">
                  <input
                    type="checkbox"
                    id="story-share"
                    name="canShare"
                    value="yes"
                  />
                  <label htmlFor="story-share">
                    You may share this story publicly (with my permission on specifics)
                  </label>
                </div>

                <button type="submit" className="btn btn--primary">
                  Share My Story
                </button>
              </form>
            )}
          </section>

          {/* Write to Louise */}
          <section className="connect-form-section">
            <div className="connect-form-header">
              <h2>Write to Louise</h2>
              <p>
                Questions, thoughts, or just want to say hello?
                I read everything.
              </p>
            </div>

            {messageSubmitted ? (
              <div className="connect-success">
                <p>Message sent. I'll be in touch.</p>
              </div>
            ) : (
              <form onSubmit={handleMessageSubmit} className="connect-form">
                <div className="form-group">
                  <label htmlFor="message-name">Name</label>
                  <input
                    type="text"
                    id="message-name"
                    name="name"
                    required
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message-email">Email</label>
                  <input
                    type="email"
                    id="message-email"
                    name="email"
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message-content">Message</label>
                  <textarea
                    id="message-content"
                    name="message"
                    required
                    rows={6}
                    placeholder="What's on your mind?"
                  />
                </div>

                <button type="submit" className="btn btn--primary">
                  Send Message
                </button>
              </form>
            )}
          </section>
        </div>

        {/* Newsletter CTA */}
        <section className="connect-newsletter">
          <h3>Want to stay connected?</h3>
          <p>Join me on this journey. Essays on mortality and joy, delivered to your inbox.</p>
          <iframe
            src="https://louiseireland.substack.com/embed"
            width="100%"
            height="150"
            style={{ border: "none", background: "transparent" }}
            frameBorder="0"
            scrolling="no"
          />
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

      <style jsx>{`
        .connect-container {
          min-height: 100vh;
          background: var(--cream, #faf6f1);
          padding: 100px 24px 48px;
        }

        .connect-hero {
          max-width: 600px;
          margin: 0 auto 40px;
          text-align: center;
        }

        .connect-label {
          display: block;
          font-family: "Space Grotesk", sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #E8178A;
          margin-bottom: 24px;
        }

        .connect-hero h1 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 300;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: #2d2a26;
          margin-bottom: 16px;
        }

        .connect-hero p {
          font-size: 1.125rem;
          color: rgba(45, 42, 38, 0.7);
          line-height: 1.6;
        }

        .connect-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          max-width: 900px;
          margin: 0 auto 48px;
        }

        .connect-form-section {
          background: white;
          padding: 28px;
          border: 1px solid rgba(0, 0, 0, 0.06);
        }

        .connect-form-header {
          margin-bottom: 24px;
        }

        .connect-form-header h2 {
          font-size: 1.5rem;
          font-weight: 300;
          letter-spacing: -0.01em;
          color: #2d2a26;
          margin-bottom: 12px;
        }

        .connect-form-header p {
          font-size: 0.95rem;
          color: rgba(45, 42, 38, 0.6);
          line-height: 1.6;
        }

        .connect-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-family: "Space Grotesk", sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(45, 42, 38, 0.6);
        }

        .form-group input,
        .form-group textarea {
          padding: 14px 16px;
          font-size: 1rem;
          font-family: inherit;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: var(--cream, #faf6f1);
          color: var(--charcoal, #1a1a1a);
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--pink, #e84a8a);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(45, 42, 38, 0.4);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-checkbox {
          flex-direction: row;
          align-items: flex-start;
          gap: 12px;
        }

        .form-checkbox input {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          accent-color: var(--pink, #e84a8a);
        }

        .form-checkbox label {
          font-family: inherit;
          font-size: 0.9rem;
          text-transform: none;
          letter-spacing: 0;
          color: rgba(45, 42, 38, 0.7);
          line-height: 1.5;
        }

        .connect-success {
          background: rgba(122, 139, 114, 0.1);
          padding: 32px;
          text-align: center;
          border: 1px solid rgba(122, 139, 114, 0.2);
        }

        .connect-success p {
          color: var(--sage, #7a8b72);
          font-size: 1.125rem;
        }

        .connect-newsletter {
          max-width: 500px;
          margin: 0 auto;
          text-align: center;
          padding: 60px 0;
          border-top: 1px solid rgba(45, 42, 38, 0.1);
        }

        .connect-newsletter h3 {
          font-size: 1.25rem;
          font-weight: 400;
          color: #2d2a26;
          margin-bottom: 8px;
        }

        .connect-newsletter p {
          color: rgba(45, 42, 38, 0.6);
          margin-bottom: 24px;
        }

        .btn--secondary {
          display: inline-block;
          padding: 14px 28px;
          font-family: "Space Grotesk", sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: 1px solid #2d2a26;
          color: #2d2a26;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn--secondary:hover {
          background: var(--charcoal, #1a1a1a);
          color: white;
        }

        @media (max-width: 768px) {
          .connect-container {
            padding: 100px 16px 32px;
          }

          .connect-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .connect-form-section {
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
}
