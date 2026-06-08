import { Resend } from 'resend';
import { uploadDonationReceipt } from './uploadReceipt.js';
import {
  decodeReceiptBase64,
  EMAIL_ATTACH_MAX_BYTES,
  isAllowedReceiptType,
} from './receiptUtils.js';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function sendDonationEmail(payload, env) {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const {
    donorName,
    donorAmount,
    donorMessage,
    countryName,
    receiptBase64,
    receiptFilename,
    receiptMimeType,
  } = payload;

  if (!donorAmount || !countryName) {
    throw new Error('Missing required fields');
  }

  const contentType = receiptMimeType || 'application/octet-stream';
  if (!isAllowedReceiptType(contentType)) {
    throw new Error('File type not allowed. Use image, video, or PDF.');
  }

  const buffer = decodeReceiptBase64(receiptBase64);
  let storage = null;
  try {
    storage = await uploadDonationReceipt({
      receiptBase64,
      receiptFilename,
      receiptMimeType: contentType,
    });
  } catch (err) {
    console.warn('[sendDonationEmail] storage upload failed:', err.message);
  }

  const resend = new Resend(apiKey);
  const to = env.DONATION_TO_EMAIL || 'halafarhat446@gmail.com';
  const from = env.RESEND_FROM_EMAIL || 'Sutoor Donations <onboarding@resend.dev>';
  const safeName = donorName?.trim() || 'فاعل خير';
  const subject = `تبرع جديد — ${donorAmount} — ${countryName}`;
  const filename = receiptFilename || 'receipt';

  const storageRow = storage
    ? storage.signedUrl
      ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>رابط الملف (Firebase)</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="${escapeHtml(storage.signedUrl)}">فتح / تحميل</a></td></tr>`
      : `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>مسار الملف (Firebase)</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><code>${escapeHtml(storage.storagePath)}</code></td></tr>`
    : '';

  const fileNote = storage
    ? 'الملف محفوظ على Firebase Storage. للصور الصغيرة قد يكون مرفقاً أيضاً.'
    : 'الملف مرفق مع هذا البريد.';

  const html = `
    <div dir="rtl" style="font-family: Cairo, Arial, sans-serif; line-height: 1.6; color: #111;">
      <h2 style="color: #1a7f4e;">إشعار تبرع جديد — سطور</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 520px;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>اسم المتبرع</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(safeName)}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>المبلغ</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(donorAmount)}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>طريقة / الدولة</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(countryName)}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>نوع الملف</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(contentType)}</td></tr>
        ${storageRow}
        <tr><td style="padding: 8px; vertical-align: top;"><strong>الرسالة</strong></td><td style="padding: 8px;">${escapeHtml(donorMessage?.trim() || '—')}</td></tr>
      </table>
      <p style="margin-top: 16px; color: #666; font-size: 13px;">${fileNote}</p>
    </div>
  `;

  const canAttach =
    contentType.startsWith('image/') && buffer.length <= EMAIL_ATTACH_MAX_BYTES;

  const emailPayload = {
    from,
    to: [to],
    subject,
    html,
  };

  if (canAttach) {
    emailPayload.attachments = [
      {
        filename,
        content: receiptBase64,
        contentType,
      },
    ];
  }

  const { data, error } = await resend.emails.send(emailPayload);

  if (error) {
    throw new Error(error.message || 'Resend failed to send email');
  }

  return { ...data, storagePath: storage?.storagePath ?? null };
}
