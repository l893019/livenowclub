import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || '');

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email');

  if (!email) {
    return new NextResponse('Missing email parameter', { status: 400 });
  }

  try {
    // Add email to unsubscribed set
    await redis.sadd('unsubscribed', email.toLowerCase());

    // Return a simple HTML page confirming unsubscribe
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unsubscribed | The Live Now Club</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background: #faf6f1;
      color: #2d2a26;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      margin: 0;
    }
    .container {
      text-align: center;
      max-width: 400px;
    }
    h1 {
      font-size: 1.5rem;
      font-weight: 400;
      margin-bottom: 16px;
    }
    p {
      color: rgba(45,42,38,0.7);
      line-height: 1.6;
      margin-bottom: 24px;
    }
    a {
      color: #e8178a;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>You've been unsubscribed</h1>
    <p>You won't receive any more notification emails from The Live Now Club.</p>
    <a href="/">Return to The Live Now Club</a>
  </div>
</body>
</html>
    `.trim();

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('[Unsubscribe] Error:', error);
    return new NextResponse('Something went wrong', { status: 500 });
  }
}
