import { NextRequest, NextResponse } from 'next/server';

const BOT_UA_REGEX = /Googlebot|Bingbot|Yahoo|facebookexternalhit|Twitterbot|LinkedInBot|Slackbot/i;

export async function middleware(req: NextRequest) {
  const userAgent = req.headers.get('user-agent') || '';
  if (BOT_UA_REGEX.test(userAgent)) {
    const prerenderUrl = `https://service.prerender.io${req.nextUrl.pathname}${req.nextUrl.search}`;
    const prerenderRes = await fetch(prerenderUrl, {
      headers: {
        'X-Prerender-Token': 'sBsEfTu7OJ0A4MDhzpl8', // <-- Replace with your Prerender.io token
        'User-Agent': userAgent,
      },
    });
    const html = await prerenderRes.text();
    return new NextResponse(html, {
      status: prerenderRes.status,
      headers: { 'content-type': 'text/html' },
    });
  }
  // For normal users, continue as usual
  return NextResponse.next();
} 