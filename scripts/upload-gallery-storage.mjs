/**
 * رفع صور/فيديو المعرض وملف PDF إلى Firebase Storage (مجلد gallery/).
 * الاستخدام: npm run upload:gallery
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const bucketName = process.env.FIREBASE_STORAGE_BUCKET || "sutoor-storage";

const MEDIA_EXT = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".mp4", ".mov", ".webm"]);
const PDF_EXT = new Set([".pdf"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

function storagePath(localPath, baseDir, prefix) {
  const rel = path.relative(baseDir, localPath).replace(/\\/g, "/");
  return `${prefix}/${rel}`;
}

async function uploadFile(bucket, localPath, dest) {
  const info = await stat(localPath);
  if (!info.isFile()) return;
  const ext = path.extname(localPath).toLowerCase();
  if (!MEDIA_EXT.has(ext) && !PDF_EXT.has(ext)) return;

  const token = await bucket.file(dest).exists();
  if (token[0]) {
    console.log(`skip (exists): ${dest}`);
    return;
  }

  const buf = await readFile(localPath);
  const contentType =
    ext === ".pdf"
      ? "application/pdf"
      : ext === ".mp4"
        ? "video/mp4"
        : ext === ".mov"
          ? "video/quicktime"
          : ext === ".webm"
            ? "video/webm"
            : `image/${ext.slice(1) === "jpg" ? "jpeg" : ext.slice(1)}`;

  await bucket.file(dest).save(buf, {
    metadata: { contentType, cacheControl: "public, max-age=31536000" },
  });
  console.log(`uploaded: ${dest}`);
}

initializeApp({
  credential: applicationDefault(),
  projectId: "etkan-f3ba3",
  storageBucket: bucketName, // gs://sutoor-storage
});

const bucket = getStorage().bucket();

const imagesDir = path.join(root, "sutoor-images");
const pdfDir = path.join(root, "public", "assets");

const imageFiles = await walk(imagesDir);
const pdfFiles = (await walk(pdfDir)).filter((f) => path.extname(f).toLowerCase() === ".pdf");

console.log(`Bucket: gs://${bucketName}`);
console.log(`Files: ${imageFiles.length} media, ${pdfFiles.length} pdf`);

for (const file of imageFiles) {
  const ext = path.extname(file).toLowerCase();
  if (!MEDIA_EXT.has(ext)) continue;
  await uploadFile(bucket, file, storagePath(file, imagesDir, "gallery"));
}

for (const file of pdfFiles) {
  const name = path.basename(file);
  await uploadFile(bucket, file, `gallery/documents/${name}`);
}

console.log("Done.");
