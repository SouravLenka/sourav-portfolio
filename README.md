# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## OMEN AI Configuration

OMEN is Sourav Lenka's autonomous cyber AI portfolio assistant. It uses a hybrid architecture: powered by **Google Gemini** on the backend with targeted contextual RAG retrieval, and backed by a local deterministic fallback engine to guarantee 100% uptime.

### Required Environment Variables

Configure these variables in your deployment platform dashboard (Netlify/Vercel) and locally in `.env`:

| Variable         | Description                                            | Default                |
| :--------------- | :----------------------------------------------------- | :--------------------- |
| `GEMINI_API_KEY` | Google AI Studio Gemini API key (**Server-side only**) | _Required for AI mode_ |
| `GEMINI_MODEL`   | Supported Gemini Flash model ID                        | `gemini-1.5-flash`     |
| `RESEND_API_KEY` | Resend API key for contact form submissions            | _Optional_             |

### Local Development Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Add your `GEMINI_API_KEY` obtained from [Google AI Studio](https://aistudio.google.com/).
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The built-in Vite dev middleware automatically proxies `/api/chat` calls to the Gemini provider locally.

### Production Setup (Netlify / Vercel)

The `/api/chat` endpoint is built as a universal serverless function supporting both **Netlify Functions** and **Vercel Serverless Functions**.

- **Netlify**: Go to **Site Configuration** > **Environment variables** > Add `GEMINI_API_KEY` and optionally `GEMINI_MODEL`.
- **Vercel**: Go to **Project Settings** > **Environment Variables** > Add `GEMINI_API_KEY` and optionally `GEMINI_MODEL`.

_Note: After adding environment variables on your deployment dashboard, trigger a new deployment for the changes to take effect._

### Reliability & Local Fallback

- If the Gemini API reaches its rate limit, encounters a timeout (8s), or has no configured key, OMEN automatically and seamlessly falls back to the deterministic local knowledge engine (`omenEngine.js`).
- If the browser cannot reach `/api/chat` due to network conditions, client-side fallback activates immediately.
- Visitors always receive a helpful, structured answer without UI crashes or endless loading indicators.

### Security Note

- **Never** prefix the Gemini API key with `VITE_`.
- The key is strictly executed on the server side in serverless functions and never bundled into client JavaScript.
