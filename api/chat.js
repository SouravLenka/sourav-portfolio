import { parseRequestBody, sendResponse, getClientIp } from './utils/serverless.js';
import { retrievePortfolioContext } from '../src/utils/portfolioRetriever.js';
import { generateGeminiResponse } from './providers/gemini.js';
import { queryOmen } from '../src/utils/omenEngine.js';

// Simple in-memory rate limiter (20 requests per minute per IP)
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
  return record.count > MAX_REQUESTS_PER_WINDOW;
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
 * OMEN Chat API Handler (/api/chat)
 *
 * Flow:
 *   1. Validate request method and body
 *   2. Apply IP rate limiting
 *   3. Retrieve targeted portfolio context
 *   4. If GEMINI_API_KEY is set → call Gemini for dynamic AI response
 *   5. If Gemini fails or key is missing → fall back to local omenEngine.js
 *
 * Supports: Vercel, Netlify Functions v1/v2, and Vite dev middleware.
 */
export default async function handler(req, res) {
  const method = req?.method || req?.httpMethod;

  // 1. Method guard
  if (method !== 'POST') {
    return sendResponse(res, 405, { error: 'Method not allowed. Only POST is supported.' });
  }

  // 2. Rate limiting
  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return sendResponse(res, 429, {
      error: 'Rate limit exceeded. Please wait a moment before sending more messages.'
    });
  }

  // 3. Parse and validate request body
  let body;
  try {
    body = await parseRequestBody(req);
  } catch (_) {
    body = {};
  }

  const rawMessage = body?.message || body?.query;
  const history = Array.isArray(body?.history) ? body.history.slice(-8) : [];

  if (!rawMessage || typeof rawMessage !== 'string' || !rawMessage.trim()) {
    return sendResponse(res, 400, { error: 'Query message cannot be empty.' });
  }

  const message = rawMessage.trim().slice(0, 600);

  // 4. Retrieve targeted portfolio context (always executed, even for fallback)
  let retrieval;
  try {
    retrieval = retrievePortfolioContext(message, history);
  } catch (retrievalErr) {
    console.warn('[OMEN] Retrieval error (non-fatal):', retrievalErr?.message || retrievalErr);
    retrieval = { contextText: '', relevantProjects: [], relevantSkills: [], suggestedActions: [] };
  }

  // 5. Primary path: Gemini AI
  const apiKey = (process.env.GEMINI_API_KEY || '').trim();

  if (apiKey) {
    try {
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
    } catch (geminiErr) {
      // Log safe error details (never log the API key)
      console.warn('[OMEN] Gemini fallback triggered:', geminiErr?.message || geminiErr);
    }
  } else {
    console.log('[OMEN] GEMINI_API_KEY not configured — using local fallback');
  }

  // 6. Fallback path: local deterministic OMEN engine
  try {
    const localResult = await queryOmen(message, history);
    return sendResponse(res, 200, {
      success: true,
      title: localResult.title,
      text: localResult.text,
      actions: localResult.actions || [],
      source: 'local_fallback'
    });
  } catch (localErr) {
    console.error('[OMEN] Local engine also failed:', localErr?.message || localErr);
    return sendResponse(res, 200, {
      success: true,
      title: 'OMEN // SYSTEM NOTICE',
      text: "I'm having trouble reaching my AI backend right now. You can still explore Sourav's projects, skills, and resume below.",
      actions: [
        { label: 'View Projects', actionType: 'scroll', target: 'projects' },
        { label: '📄 Resume', actionType: 'link', target: '/resume.pdf', download: true },
        { label: 'Contact Sourav', actionType: 'scroll', target: 'contact' }
      ],
      source: 'error_fallback'
    });
  }
}
