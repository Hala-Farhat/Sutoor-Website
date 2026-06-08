import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { sendDonationEmail as sendEmail } from '../functions/sendDonationEmail.js';

function ensureFirebaseAdmin(env) {
  if (getApps().length) return;

  const json = env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (json) {
    initializeApp({ credential: cert(JSON.parse(json)) });
    return;
  }

  try {
    initializeApp();
  } catch {
    // محلياً بدون حساب خدمة: الإيميل يشتغل، Storage قد يتخطى
  }
}

export async function sendDonationEmail(payload, env = process.env) {
  ensureFirebaseAdmin(env);
  return sendEmail(payload, env);
}
