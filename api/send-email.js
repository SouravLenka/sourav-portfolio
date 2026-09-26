import { Resend } from 'resend';
import { parseRequestBody, sendResponse } from './utils/serverless.js';

export default async function handler(req, res) {
  const method = req?.method || req?.httpMethod;
  if (method !== 'POST') {
    return sendResponse(res, 405, { error: 'Method not allowed' });
  }

  const body = await parseRequestBody(req);
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return sendResponse(res, 400, { error: 'Missing required fields' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['souravlenka179@gmail.com'],
      subject: `New Portfolio Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Contact Info:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return sendResponse(res, 200, { success: true, data });
  } catch (error) {
    console.error('Email sending error:', error);
    return sendResponse(res, 500, { error: 'Failed to send email' });
  }
}
