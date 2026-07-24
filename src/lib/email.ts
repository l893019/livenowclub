import { Resend } from 'resend';
import Redis from 'ioredis';
import { archetypes } from './archetypes';

// Lazy initialization to avoid build-time errors
let resend: Resend | null = null;
function getResend(): Resend {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

let redis: Redis | null = null;
function getRedis(): Redis {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL || '');
  }
  return redis;
}

async function isUnsubscribed(email: string): Promise<boolean> {
  return (await getRedis().sismember('unsubscribed', email.toLowerCase())) === 1;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://livenowclub.com';

// Convert second person ("You believe...") to third person ("They believe...")
function toThirdPerson(text: string): string {
  return text
    .replace(/\bYou\b/g, 'They')
    .replace(/\byou\b/g, 'they')
    .replace(/\byou['’]re\b/gi, "they’re")
    .replace(/\byou['’]d\b/gi, "they’d")
    .replace(/\byour\b/gi, 'their');
}

type JoinNotificationParams = {
  toEmail: string;
  toName: string;
  joinerName: string;
  joinerArchetype: string;
  utopiaName: string;
  utopiaSlug: string;
  joinerId: string;
  founderId: string;
};

export async function sendJoinNotification({
  toEmail,
  toName,
  joinerName,
  joinerArchetype,
  utopiaName,
  utopiaSlug,
  joinerId,
  founderId,
}: JoinNotificationParams): Promise<{ success: boolean; error?: string }> {
  // Check if user has unsubscribed
  if (await isUnsubscribed(toEmail)) {
    console.log('[Email] User has unsubscribed:', toEmail);
    return { success: true };
  }

  const archetype = archetypes[joinerArchetype];
  const archetypeName = archetype?.name || joinerArchetype;
  const archetypeTagline = toThirdPerson(archetype?.oneSentence || '');

  const relationshipUrl = `${BASE_URL}/wonder/essay/quiz/utopia/${utopiaSlug}?view=relationship&you=${founderId}&them=${joinerId}`;
  const essayUrl = `${BASE_URL}/wonder/essay`;
  const unsubscribeUrl = `${BASE_URL}/api/unsubscribe?email=${encodeURIComponent(toEmail)}`;

  const html = generateEmailHtml({
    toName,
    joinerName,
    archetypeName,
    archetypeTagline,
    utopiaName,
    relationshipUrl,
    essayUrl,
    unsubscribeUrl,
  });

  try {
    const { error } = await getResend().emails.send({
      from: 'The Live Now Club <onboarding@resend.dev>',
      to: toEmail,
      subject: `${joinerName} joined ${utopiaName}`,
      html,
    });

    if (error) {
      console.error('[Email] Send failed:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('[Email] Error:', err);
    return { success: false, error: 'Failed to send email' };
  }
}

type EmailTemplateParams = {
  toName: string;
  joinerName: string;
  archetypeName: string;
  archetypeTagline: string;
  utopiaName: string;
  relationshipUrl: string;
  essayUrl: string;
  unsubscribeUrl: string;
};

function generateEmailHtml({
  joinerName,
  archetypeName,
  archetypeTagline,
  utopiaName,
  relationshipUrl,
  essayUrl,
  unsubscribeUrl,
}: EmailTemplateParams): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${joinerName} joined ${utopiaName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #faf6f1; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #faf6f1;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 500px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <img
                src="${BASE_URL}/images/logo-handwritten.png"
                alt="The Live Now Club"
                width="180"
                style="display: block; max-width: 180px; height: auto;"
              />
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
                <tr>
                  <td style="padding: 40px 32px; text-align: center;">

                    <!-- Announcement -->
                    <h1 style="margin: 0 0 8px; font-size: 24px; font-weight: 400; color: #2d2a26; letter-spacing: -0.01em;">
                      ${joinerName} joined ${utopiaName}
                    </h1>

                    <p style="margin: 0 0 8px; font-size: 18px; color: #e8178a; font-style: italic;">
                      They’re ${archetypeName}.
                    </p>

                    ${archetypeTagline ? `
                    <p style="margin: 0 0 32px; font-size: 15px; color: rgba(45,42,38,0.7); line-height: 1.5;">
                      ${archetypeTagline}
                    </p>
                    ` : '<div style="height: 24px;"></div>'}

                    <!-- CTA Button -->
                    <a
                      href="${relationshipUrl}"
                      style="display: inline-block; background-color: #e8178a; color: #ffffff; font-size: 16px; font-weight: 500; text-decoration: none; padding: 16px 32px; border-radius: 50px; box-shadow: 0 4px 20px rgba(232,23,138,0.25);"
                    >
                      See What You’d Build Together
                    </a>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Essay Section -->
          <tr>
            <td style="padding: 32px 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
                <tr>
                  <td style="padding: 32px; text-align: center;">

                    <p style="margin: 0 0 8px; font-size: 13px; color: rgba(45,42,38,0.45); text-transform: uppercase; letter-spacing: 0.1em;">
                      The essay behind the quiz
                    </p>

                    <h2 style="margin: 0 0 12px; font-size: 20px; font-weight: 400; color: #2d2a26;">
                      When Purpose Is All We Have Left
                    </h2>

                    <p style="margin: 0 0 20px; font-size: 15px; color: rgba(45,42,38,0.7); line-height: 1.5;">
                      What happens when scarcity ends?
                    </p>

                    <a
                      href="${essayUrl}"
                      style="color: #e8178a; font-size: 15px; text-decoration: none; font-weight: 500;"
                    >
                      Read the essay &rarr;
                    </a>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 24px 0;">

              <!-- Nav Links -->
              <p style="margin: 0 0 16px; font-size: 12px;">
                <a href="${BASE_URL}/read" style="color: rgba(45,42,38,0.7); text-decoration: none; margin: 0 12px;">Read</a>
                <a href="${BASE_URL}/navigate" style="color: rgba(45,42,38,0.7); text-decoration: none; margin: 0 12px;">Navigate</a>
                <a href="${BASE_URL}/wonder" style="color: rgba(45,42,38,0.7); text-decoration: none; margin: 0 12px;">Wonder</a>
                <a href="${BASE_URL}/connect" style="color: rgba(45,42,38,0.7); text-decoration: none; margin: 0 12px;">Connect</a>
              </p>

              <!-- Unsubscribe -->
              <p style="margin: 0; font-size: 12px; color: rgba(45,42,38,0.45);">
                <a href="${unsubscribeUrl}" style="color: rgba(45,42,38,0.45); text-decoration: underline;">Unsubscribe</a>
              </p>

            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

type ReadingEmailParams = {
  toEmail: string;
  identityKey: string;
  identityName: string;
  identityColor: string;
  coreBeliefs: string[];
  superpower: string;
  pattern: string;
  gifts: string;
  movement: string;
  tradeoff: string | null;
};

// Sends a quiz-taker their worldview reading. This is the earned version of a
// subscribe ask: they keep something they made, and the club comes with it.
export async function sendReadingEmail(p: ReadingEmailParams): Promise<{ success: boolean; error?: string }> {
  if (await isUnsubscribed(p.toEmail)) {
    return { success: true };
  }

  const resultUrl = `${BASE_URL}/wonder/essay/quiz/result?i=${encodeURIComponent(p.identityKey)}`;
  const essayUrl = `${BASE_URL}/wonder/essay`;
  const substackUrl = `https://louiseireland.substack.com/subscribe?email=${encodeURIComponent(p.toEmail)}&utm_source=reading-email`;
  const unsubscribeUrl = `${BASE_URL}/api/unsubscribe?email=${encodeURIComponent(p.toEmail)}`;

  const section = (title: string, body: string) => `
    <tr><td style="padding: 0 32px;">
      <p style="margin: 24px 0 6px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #e8178a;">${title}</p>
      <p style="margin: 0; font-size: 15px; color: rgba(45,42,38,0.85); line-height: 1.7; text-align: left;">${body}</p>
    </td></tr>`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your reading: ${p.identityName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #faf6f1; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #faf6f1;">
    <tr><td align="center" style="padding: 40px 20px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 520px;">
        <tr><td align="center" style="padding-bottom: 32px;">
          <img src="${BASE_URL}/images/logo-handwritten.png" alt="The Live Now Club" width="180" style="display: block; max-width: 180px; height: auto;" />
        </td></tr>
        <tr><td>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
            <tr><td style="padding: 40px 32px 0; text-align: center;">
              <p style="margin: 0 0 4px; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(45,42,38,0.5);">Your worldview</p>
              <h1 style="margin: 0; font-size: 28px; font-weight: 400; color: ${p.identityColor || '#e8178a'}; letter-spacing: -0.01em;">${p.identityName}</h1>
            </td></tr>
            ${section('Your pattern', p.pattern)}
            ${section('What this gives you', p.gifts)}
            ${section('How you’ll move', p.movement)}
            ${p.tradeoff ? section('The tradeoff', p.tradeoff) : ''}
            ${section('Your superpower', p.superpower)}
            ${section('You likely believe', p.coreBeliefs.map((b) => '• ' + b).join('<br/>'))}
            <tr><td align="center" style="padding: 32px;">
              <a href="${resultUrl}" style="display: inline-block; background-color: #e8178a; color: #ffffff; font-size: 15px; font-weight: 500; text-decoration: none; padding: 14px 28px; border-radius: 50px;">Revisit your full reading</a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td align="center" style="padding: 28px 12px 0;">
          <p style="margin: 0 0 8px; font-size: 14px; color: rgba(45,42,38,0.7); line-height: 1.6;">
            This reading came from <a href="${essayUrl}" style="color: #e8178a;">an essay about what we do when machines can do everything</a>.
            I write one most weeks. <a href="${substackUrl}" style="color: #e8178a;">Join the club</a> if you want them.
          </p>
          <p style="margin: 16px 0 0; font-size: 12px; color: rgba(45,42,38,0.45);">
            <a href="${unsubscribeUrl}" style="color: rgba(45,42,38,0.45);">Unsubscribe</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim();

  try {
    const { error } = await getResend().emails.send({
      from: process.env.EMAIL_FROM || 'The Live Now Club <onboarding@resend.dev>',
      to: p.toEmail,
      subject: `Your reading: ${p.identityName}`,
      html,
    });
    if (error) {
      console.error('[Email] Reading send failed:', error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    console.error('[Email] Reading error:', err);
    return { success: false, error: 'Failed to send email' };
  }
}
