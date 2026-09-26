import { parseRequestBody, sendResponse, getClientIp } from './utils/serverless.js';
import { retrievePortfolioContext } from '../src/utils/portfolioRetriever.js';
import { generateGeminiResponse } from './providers/gemini.js';
import { queryOmen } from '../src/utils/omenEngine.js';

// Simple in-memory rate limiter for serverless instance (20 requests per minute per IP)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.startTime > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, startTime: now });
    return false;
  }

  record.count += 1;
  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  return false;
}

// Cleanup stale rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now - record.startTime > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000).unref?.();

/**
 * Universal Serverless Handler for OMEN Chat API (/api/chat)
 * Supports:
 * - Vercel / Express (req, res)
 * - Netlify Functions v2 (Request, context)
 * - Netlify Functions v1 (event, context)
 */
export default async function handler(req, res) {
  const method = req?.method || req?.httpMethod;

  // 1. Method verification
  if (method !== 'POST') {
    return sendResponse(res, 405, { error: 'Method not allowed. Only POST is supported.' });
  }

  // 2. Rate limit verification
  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return sendResponse(res, 429, {
      error: 'Rate limit exceeded. Please wait a moment before sending more messages.'
    });
  }

  // 3. Body parsing and validation
  const body = await parseRequestBody(req);
  const rawMessage = body.message || body.query;
  const history = Array.isArray(body.history) ? body.history.slice(-8) : [];

  if (!rawMessage || typeof rawMessage !== 'string' || !rawMessage.trim()) {
    return sendResponse(res, 400, { error: 'Query message cannot be empty.' });
  }

  const message = rawMessage.trim().slice(0, 600);

  // 4. Retrieve portfolio context
  const retrieval = retrievePortfolioContext(message, history);

  // 5. Try Gemini AI Provider with automatic fallback
  try {
    if (!process.env.GEMINI_API_KEY) {
      // If API key is not configured, fall back to local OMEN engine immediately
      const localResult = await queryOmen(message);
      return sendResponse(res, 200, {
        success: true,
        title: localResult.title,
        text: localResult.text,
        actions: localResult.actions || [],
        source: 'local_fallback'
      });
    }

    const aiResult = await generateGeminiResponse({
      query: message,
      history,
      contextText: retrieval.contextText,
      suggestedActions: retrieval.suggestedActions
    });

    return sendResponse(res, 200, {
      success: true,
      title: aiResult.title,
      text: aiResult.text,
      actions: aiResult.actions,
      source: 'gemini'
    });
  } catch (err) {
    // Log safely without exposing keys or credentials
    console.warn('[OMEN] Gemini generation fallback triggered:', err.message || err);

    // Fall back smoothly to local deterministic OMEN engine
    const localResult = await queryOmen(message);
    return sendResponse(res, 200, {
      success: true,
      title: localResult.title,
      text: localResult.text,
      actions: localResult.actions || [],
      source: 'local_fallback'
    });
  }
}
