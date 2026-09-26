import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables for local dev server execution
  const env = loadEnv(mode, process.cwd(), '');
  if (env.GEMINI_API_KEY) process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
  if (env.GEMINI_MODEL) process.env.GEMINI_MODEL = env.GEMINI_MODEL;
  if (env.RESEND_API_KEY) process.env.RESEND_API_KEY = env.RESEND_API_KEY;

  return {
    plugins: [
      react(),
      {
        name: 'api-serverless-dev-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const url = req.url ? req.url.split('?')[0] : '';
            if (url === '/api/chat') {
              try {
                const { default: chatHandler } = await import('./api/chat.js');
                await chatHandler(req, res);
              } catch (err) {
                console.error('[Vite Dev API] Chat handler error:', err);
                if (!res.headersSent) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Local API execution failed' }));
                }
              }
              return;
            }
            if (url === '/api/send-email') {
              try {
                const { default: emailHandler } = await import('./api/send-email.js');
                await emailHandler(req, res);
              } catch (err) {
                console.error('[Vite Dev API] Send email handler error:', err);
                if (!res.headersSent) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Local API execution failed' }));
                }
              }
              return;
            }
            next();
          });
        }
      }
    ],
  };
});
