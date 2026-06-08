export const MAX_RECEIPT_BYTES = 50 * 1024 * 1024;
export const EMAIL_ATTACH_MAX_BYTES = 4 * 1024 * 1024;

export function isAllowedReceiptType(mime) {
  return /^(image\/|video\/|application\/pdf)/i.test(mime || '');
}

export function decodeReceiptBase64(receiptBase64) {
  if (!receiptBase64) {
    throw new Error('Receipt file is required');
  }
  const buffer = Buffer.from(receiptBase64, 'base64');
  if (buffer.length > MAX_RECEIPT_BYTES) {
    throw new Error('File too large (max 50MB)');
  }
  return buffer;
}

export function sanitizeFilename(name) {
  return (name || 'receipt').replace(/[^a-zA-Z0-9._-]/g, '_');
}
