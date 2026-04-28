import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Fetch the static HTML from the public CDN
    const baseUrl = new URL(request.url).origin;
    const response = await fetch(`${baseUrl}/wonder/essay/quiz/index.html`);

    if (!response.ok) {
      throw new Error(`Failed to fetch HTML: ${response.status}`);
    }

    const htmlContent = await response.text();

    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error serving quiz HTML:', error);
    return new NextResponse('Quiz page not found', { status: 404 });
  }
}
