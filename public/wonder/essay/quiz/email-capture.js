// Email Capture for Quiz Results
function createEmailCapture(identity, quizAnswers) {
  const container = document.createElement('div');
  container.className = 'email-capture-container';
  container.style.cssText = `
    max-width: 500px;
    margin: 40px auto;
    padding: 32px;
    background: #fff;
    border: 2px solid #e8178a;
    border-radius: 12px;
  `;

  container.innerHTML = `
    <div class="email-capture-content" style="text-align: center;">
      ${identity ? `
        <div style="margin-bottom: 20px; padding: 12px; background: #faf6f1; border-radius: 8px;">
          <span style="font-size: 14px; color: #666; margin-right: 8px;">Your Identity:</span>
          <span style="font-size: 18px; font-weight: 600; color: #e8178a;">${identity}</span>
        </div>
      ` : ''}
      <h3 style="font-size: 24px; font-weight: 600; margin: 0 0 12px; color: #2d2a26;">
        Want deeper insights?
      </h3>
      <p style="font-size: 16px; color: #666; margin: 0 0 24px; line-height: 1.6;">
        Get essays and reflections delivered to your inbox.
      </p>

      <form id="email-capture-form" style="display: flex; gap: 8px; margin-bottom: 16px;">
        <input
          type="email"
          id="email-input"
          placeholder="your@email.com"
          required
          style="
            flex: 1;
            padding: 14px 16px;
            font-size: 16px;
            border: 2px solid #e8178a;
            border-radius: 6px;
            outline: none;
            font-family: inherit;
          "
        />
        <button
          type="submit"
          id="email-submit-btn"
          style="
            padding: 14px 28px;
            font-size: 16px;
            font-weight: 600;
            color: #fff;
            background: #e8178a;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-family: inherit;
            transition: background 0.2s;
          "
          onmouseover="this.style.background='#c01470'"
          onmouseout="this.style.background='#e8178a'"
        >
          Subscribe
        </button>
      </form>

      <p style="font-size: 13px; color: #999; margin: 0;">
        No spam. Unsubscribe anytime.
      </p>

      <div id="email-message" style="margin-top: 16px; display: none;"></div>
    </div>
  `;

  const form = container.querySelector('#email-capture-form');
  const emailInput = container.querySelector('#email-input');
  const submitBtn = container.querySelector('#email-submit-btn');
  const messageDiv = container.querySelector('#email-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Subscribing...';

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          identity,
          quizAnswers,
          referrer: document.referrer,
        }),
      });

      const data = await response.json();

      if (data.success) {
        showMessage(data.message, 'success');

        // Track email signup event
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'email_signup',
            page: window.location.pathname,
            identity,
            context: 'quiz-result',
          }),
        }).catch(() => {});

        // Show fallback link if provided
        if (data.substackUrl) {
          setTimeout(() => {
            const fallbackDiv = document.createElement('div');
            fallbackDiv.style.cssText = `
              margin-top: 24px;
              padding: 20px;
              background: #faf6f1;
              border-radius: 8px;
            `;
            fallbackDiv.innerHTML = `
              <p style="margin: 0 0 16px; color: #666;">
                Click below to complete your subscription:
              </p>
              <a
                href="${data.substackUrl}"
                target="_blank"
                rel="noopener noreferrer"
                style="
                  display: inline-block;
                  padding: 12px 24px;
                  font-size: 16px;
                  font-weight: 600;
                  color: #fff;
                  background: #e8178a;
                  border-radius: 6px;
                  text-decoration: none;
                  transition: background 0.2s;
                "
                onmouseover="this.style.background='#c01470'"
                onmouseout="this.style.background='#e8178a'"
              >
                Complete Subscription →
              </a>
            `;
            messageDiv.appendChild(fallbackDiv);
          }, 1000);
        }

        form.style.display = 'none';
      } else {
        showMessage(data.error || 'Something went wrong. Please try again.', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Subscribe';
      }
    } catch (error) {
      showMessage('Failed to subscribe. Please try again.', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Subscribe';
    }
  });

  function showMessage(text, type) {
    messageDiv.style.display = 'block';
    if (type === 'success') {
      messageDiv.style.cssText = `
        margin-top: 16px;
        display: block;
        text-align: center;
      `;
      messageDiv.innerHTML = `
        <div style="
          width: 60px;
          height: 60px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          color: #fff;
          background: #0a0;
          border-radius: 50%;
        ">✓</div>
        <h3 style="font-size: 20px; color: #2d2a26; margin: 0;">${text}</h3>
      `;
    } else {
      messageDiv.style.cssText = `
        margin-top: 16px;
        padding: 12px;
        background: #fee;
        color: #c00;
        border-radius: 6px;
        font-size: 14px;
        display: block;
      `;
      messageDiv.textContent = text;
    }
  }

  return container;
}

// Make it available globally
window.createEmailCapture = createEmailCapture;
