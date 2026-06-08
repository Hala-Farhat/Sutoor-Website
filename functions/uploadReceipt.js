import { getStorage } from 'firebase-admin/storage';
import { getApps, initializeApp } from 'firebase-admin/app';
import { randomUUID } from 'node:crypto';
import {
  decodeReceiptBase64,
  isAllowedReceiptType,
  sanitizeFilename,
} from './receiptUtils.js';

export async function uploadDonationReceipt({
  receiptBase64,
  receiptFilename,
  receiptMimeType,
}) {
  if (!getApps().length) {
    initializeApp({ storageBucket: 'sutoor-storage' });
  }

  const contentType = receiptMimeType || 'application/octet-stream';
  if (!isAllowedReceiptType(contentType)) {
    throw new Error('File type not allowed. Use image, video, or PDF.');
  }

  const buffer = decodeReceiptBase64(receiptBase64);
  const safeName = sanitizeFilename(receiptFilename);
  const storagePath = `donation-receipts/${randomUUID()}/${safeName}`;
  const bucket = getStorage().bucket('sutoor-storage');
  const file = bucket.file(storagePath);

  await file.save(buffer, {
    metadata: {
      contentType,
      metadata: {
        source: 'donation-form',
      },
    },
  });

  // رابط موقّع اختياري — بدون signBlob يكمل الإيميل ويبقى الملف في Storage
  let signedUrl = null;
  try {
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });
    signedUrl = url;
  } catch (err) {
    console.warn('[uploadDonationReceipt] signed URL skipped:', err.message);
  }

  return { storagePath, signedUrl, sizeBytes: buffer.length, contentType };
}
