import { rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const firebaseDir = join(process.cwd(), '.firebase');

if (existsSync(firebaseDir)) {
  rmSync(firebaseDir, { recursive: true, force: true });
  console.log('Removed .firebase cache — next deploy uploads fresh.');
} else {
  console.log('No .firebase cache to clear.');
}
