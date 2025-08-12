'use strict';

const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requests = {};

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow: 'POST' },
      body: 'Method Not Allowed',
    };
  }

  const ip =
    event.headers['x-nf-client-connection-ip'] ||
    event.headers['x-forwarded-for'] ||
    'unknown';

  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  requests[ip] = (requests[ip] || []).filter((ts) => ts > windowStart);
  if (requests[ip].length >= RATE_LIMIT_MAX) {
    return { statusCode: 429, body: 'Too Many Requests' };
  }
  requests[ip].push(now);

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { name, email, message, website } = data;

  if (website) {
    return { statusCode: 400, body: 'Spam detected' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string' ||
    name.trim() === '' ||
    email.trim() === '' ||
    message.trim() === '' ||
    name.length > 100 ||
    email.length > 320 ||
    message.length > 2000 ||
    !emailRegex.test(email)
  ) {
    return { statusCode: 400, body: 'Invalid payload' };
  }

  const payload = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_PUBLIC_KEY,
    accessToken: process.env.EMAILJS_PRIVATE_KEY,
    template_params: {
      from_name: name.trim(),
      from_email: email.trim(),
      message: message.trim(),
    },
  };

  try {
    const response = await fetch(
      'https://api.emailjs.com/api/v1.0/email/send',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      return { statusCode: 502, body: 'Email service error' };
    }
    return { statusCode: 200, body: 'Email sent' };
  } catch (err) {
    return { statusCode: 500, body: 'Server error' };
  }
}
