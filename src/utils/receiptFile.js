export const MAX_RECEIPT_BYTES = 50 * 1024 * 1024;

const ALLOWED_PREFIXES = ['image/', 'video/', 'application/pdf'];

export function isAllowedReceiptFile(file) {
  if (!file) return false;
  const type = file.type || '';
  if (ALLOWED_PREFIXES.some((p) => type.startsWith(p))) return true;
  return /\.(jpe?g|png|gif|webp|mp4|mov|webm|pdf)$/i.test(file.name || '');
}

export function isImageFile(file) {
  return file?.type?.startsWith('image/') || /\.(jpe?g|png|gif|webp)$/i.test(file?.name || '');
}

export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
