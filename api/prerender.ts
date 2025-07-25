// Vercel Serverless Function: Prerender handler for bots
// Uses ES Module syntax and standard Request/Response objects for compatibility

const getFetch = async () => {
  if (typeof globalThis.fetch === 'function') return globalThis.fetch;
  const { default: fetch } = await import('node-fetch');
  return fetch;
};

const BOT_UA_REGEX = /Googlebot|Bingbot|Yahoo|facebookexternalhit|Twitterbot|LinkedInBot|Slackbot/i;

export default async function handler(req, res) {
  try {
    const userAgent = req.headers['user-agent'] || '';
    if (typeof userAgent === 'string' && BOT_UA_REGEX.test(userAgent)) {
      const fetch = await getFetch();
      const prerenderUrl = `https://service.prerender.io${req.url}`;
      const prerenderRes = await fetch(prerenderUrl, {
        headers: {
          'X-Prerender-Token': 'sBsEfTu7OJ0A4MDhzpl8',
          'User-Agent': userAgent,
        },
      });
      const html = await prerenderRes.text();
      res.status(prerenderRes.status).setHeader('content-type', 'text/html').send(html);
      return;
    }
    // For normal users, serve the SPA as usual
    res.status(307).redirect(req.url || '/');
  } catch (err) {
    console.error('Prerender API error:', err);
    res.status(500).send('Internal Server Error');
  }
} 