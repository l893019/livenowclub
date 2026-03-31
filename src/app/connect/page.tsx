"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";

export default function ConnectPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // TODO: Replace with your Formspree endpoint
    const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setSubmitted(true);
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
          <h1>Leave a mark</h1>
          <p className="connect-subtitle">
            I read everything, but am admittedly not always good at replying in a timely manner. I very much appreciate your reading my words. Feel free to let me know what landed, what you'd like more of, what you're dealing with, anything that would be helpful to share! It is difficult for me to support people on a 1-1 basis, but I want to be there for you as much as I can.
          </p>
        </section>

        {/* Single Form */}
        <section className="connect-form-section">
          {submitted ? (
            <div className="connect-success">
              <p>Thank you. It landed.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="connect-form">
              <div className="form-group">
                <label htmlFor="message">What resonated?</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell me what landed, what you're sitting with, or just say hello..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Name (optional)</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="What should I call you?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email (optional)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Only if you'd like a response"
                />
              </div>

              <button type="submit" className="btn btn--primary">
                Leave it here
              </button>
            </form>
          )}
        </section>

        {/* Newsletter CTA */}
        <section className="connect-newsletter">
          <h3>Stay connected</h3>
          <p>Essays on mortality and joy, delivered to your inbox.</p>
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
          max-width: 500px;
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

        .connect-subtitle {
          font-size: 1rem;
          color: rgba(45, 42, 38, 0.7);
          line-height: 1.7;
        }

        .connect-form-section {
          max-width: 480px;
          margin: 0 auto 48px;
          background: white;
          padding: 32px;
          border: 1px solid rgba(0, 0, 0, 0.06);
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
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(45, 42, 38, 0.5);
        }

        .form-group input,
        .form-group textarea {
          padding: 14px 16px;
          font-size: 1rem;
          font-family: inherit;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: var(--cream, #faf6f1);
          color: var(--charcoal, #2d2a26);
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--pink, #E8178A);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(45, 42, 38, 0.35);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 140px;
        }

        .connect-success {
          background: rgba(122, 139, 114, 0.1);
          padding: 48px 32px;
          text-align: center;
          border: 1px solid rgba(122, 139, 114, 0.2);
        }

        .connect-success p {
          color: var(--sage, #7a8b72);
          font-size: 1.25rem;
          font-style: italic;
        }

        .connect-newsletter {
          max-width: 480px;
          margin: 0 auto;
          text-align: center;
          padding: 48px 0;
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

        @media (max-width: 768px) {
          .connect-container {
            padding: 100px 16px 32px;
          }

          .connect-form-section {
            padding: 24px;
          }
        }
      `}</style>
    </>
  );
}
