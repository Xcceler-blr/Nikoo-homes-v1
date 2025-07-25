import type { VercelRequest, VercelResponse } from '@vercel/node';

const BOT_UA_REGEX = /Googlebot|Bingbot|Yahoo|facebookexternalhit|Twitterbot|LinkedInBot|Slackbot/i;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const userAgent = req.headers['user-agent'] || '';
  if (typeof userAgent === 'string' && BOT_UA_REGEX.test(userAgent)) {
    const prerenderUrl = `https://service.prerender.io${req.url}`;
    const prerenderRes = await fetch(prerenderUrl, {
      headers: {
        'X-Prerender-Token': 'sBsEfTu7OJ0A4MDhzpl8', // Your Prerender.io token
        'User-Agent': userAgent,
      },
    });
    const html = await prerenderRes.text();
    res.status(prerenderRes.status).setHeader('content-type', 'text/html').send(html);
    return;
  }
  // For normal users, serve the SPA as usual
  res.status(307).redirect(req.url || '/');
} 