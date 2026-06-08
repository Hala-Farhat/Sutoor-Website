import { onRequest } from 'firebase-functions/v2/https';

export const sendDonation = onRequest(
  {
    cors: true,
    region: 'europe-west1',
    memory: '1GiB',
    timeoutSeconds: 120,
    maxInstances: 10,
  },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ ok: false, error: 'Method not allowed' });
      return;
    }

    try {
      const { sendDonationEmail } = await import('./sendDonationEmail.js');
      const data = await sendDonationEmail(req.body, {
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        DONATION_TO_EMAIL: process.env.DONATION_TO_EMAIL,
        RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
      });
      res.status(200).json({ ok: true, id: data?.id, storagePath: data?.storagePath ?? null });
    } catch (err) {
      console.error('[sendDonation]', err);
      const isClientError =
        err.message?.includes('Missing') ||
        err.message?.includes('required') ||
        err.message?.includes('too large') ||
        err.message?.includes('not allowed') ||
        err.message?.includes('not configured');
      res.status(isClientError ? 400 : 500).json({
        ok: false,
        error: err.message || 'Send failed',
      });
    }
  }
);
