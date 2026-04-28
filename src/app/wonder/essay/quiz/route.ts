import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const htmlPath = path.join(process.cwd(), 'public/wonder/essay/quiz/index.html');
    const htmlContent = await fs.readFile(htmlPath, 'utf-8');

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
