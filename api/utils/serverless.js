/**
 * Universal Serverless HTTP Utilities
 * Handles request parsing and response formatting across:
 * - Vercel Serverless Functions ((req, res) with res.status().json())
 * - Netlify Functions v2 (Web standard (Request) => Response)
 * - Netlify Functions v1 ((event, context) => ({ statusCode, body }))
 * - Local Vite dev server / Node HTTP
 */

export async function parseRequestBody(req) {
  if (!req) return {};

  // Vercel or Express with pre-parsed body
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'object') return req.body;
    if (typeof req.body === 'string' && req.body.trim().length > 0) {
      try {
        return JSON.parse(req.body);
      } catch (_) {
        return {};
      }
    }
  }

  // Web Standard Request (Netlify v2 / Fetch Request)
  if (typeof req.json === 'function') {
    try {
      return await req.json();
    } catch (_) {
      return {};
    }
  }

  // Node.js IncomingMessage stream (Vite dev middleware or raw Node)
  if (typeof req.on === 'function') {
    return new Promise((resolve) => {
      let bodyData = '';
      req.on('data', (chunk) => {
        bodyData += chunk;
      });
      req.on('end', () => {
        if (!bodyData.trim()) return resolve({});
        try {
          resolve(JSON.parse(bodyData));
        } catch (_) {
          resolve({});
        }
      });
      req.on('error', () => resolve({}));
    });
  }

  return {};
}

export function getClientIp(req) {
  if (!req) return '127.0.0.1';
  const headers = req.headers || {};
  const xForwardedFor = typeof headers.get === 'function' 
    ? headers.get('x-forwarded-for') 
    : (headers['x-forwarded-for'] || headers['client-ip'] || headers['x-real-ip']);
  
  if (xForwardedFor) {
    return String(xForwardedFor).split(',')[0].trim();
  }
  return req.socket?.remoteAddress || '127.0.0.1';
}

export function sendResponse(res, statusCode, data) {
  // Case 1: Vercel / Express (res.status().json())
  if (res && typeof res.status === 'function') {
    if (typeof res.setHeader === 'function') {
      res.setHeader('Content-Type', 'application/json');
    }
    return res.status(statusCode).json(data);
  }

  // Case 2: Web standard Response (Netlify v2)
  if (typeof Response !== 'undefined') {
    return new Response(JSON.stringify(data), {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Case 3: Netlify v1 / AWS Lambda object return
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
}
