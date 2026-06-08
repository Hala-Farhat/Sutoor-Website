# Firebase Hosting — خطوات النشر (مشروع سطور)

المشروع **مهيّأ مسبقاً**. اتبع الخطوات بالترتيب.

---

## الخطوة 1 — تثبيت Firebase CLI

**على جهازك (مرة واحدة):**

```powershell
npm install -g firebase-tools
```

**أو بدون تثبيت عالمي** (يستخدم النسخة داخل المشروع):

```powershell
cd "c:\Users\Pc\Desktop\Sutoor Website"
npx firebase --version
```

ثم تسجيل الدخول:

```powershell
firebase login
```

يفتح المتصفح — سجّل دخول بحساب Google اللي فيه مشروع **etkan-f3ba3** (موقع Hosting: **sutoor**).

---

## الخطوة 2 — Initialize (مهيّأ عندك)

`firebase init` **ما تحتاج تعيده من الصفر** — الملفات موجودة:

| ملف | الغرض |
|-----|--------|
| `.firebaserc` | المشروع: `etkan-f3ba3` — موقع Hosting: `sutoor` |
| `firebase.json` | Hosting → مجلد `dist` + Functions + Storage |
| `storage.rules` | قواعد رفع الملفات |

إذا Firebase Console طلب منك Initialize، اختر:

- **Hosting** → Use an existing project → `etkan-f3ba3` → site **sutoor**
- Public directory: **`dist`**
- Single-page app: **Yes**
- GitHub deploy: حسب رغبتك

لا تستبدل `firebase.json` إذا سألك — الملف الحالي فيه إعدادات Resend والـ API.

---

## الخطوة 3 — Deploy

### قبل أول نشر

1. **Blaze plan** (لـ Cloud Functions — إرسال الإيميل ورفع الملفات)
2. حفظ مفتاح Resend:

```powershell
firebase functions:secrets:set RESEND_API_KEY
```

3. مكتبات الـ Functions:

```powershell
cd functions
npm install
cd ..
```

### النشر

**أولاً** (مرة إذا انتهت الجلسة):

```powershell
firebase login --reauth
```

**ثم:**

```powershell
npm run deploy
```

أو:

```powershell
firebase deploy
```

> Firebase يقول `public` — مشروعك يستخدم **`dist`** (بعد `npm run build`). هذا مضبوط في `firebase.json`.

(`firebase.json` يشغّل `npm run build` تلقائياً قبل Hosting)

### نشر Hosting فقط (بدون Functions)

```powershell
npm run deploy:hosting
```

**إذا ظهر خطأ `Converting circular structure to JSON` / `TLSSocket`:**
1. أمر `npm run deploy:hosting` يمسح كاش `.firebase` ويرفع بتوازي أقل (3 ملفات).
2. كرّر الأمر 2–3 مرات — كل مرة قد يكمل ملفات إضافية.
3. اتصال إنترنت مستقر؛ تجنّب VPN إن أمكن.
4. تحذير `punycode` من Node — **يمكن تجاهله**.

---

## إضافة Firebase JavaScript SDK للموقع

**عندك جاهز:**

1. الحزمة مثبتة: `firebase` في `package.json`
2. الإعداد في `src/firebase.js`
3. التشغيل من `src/main.jsx` عبر `import './firebase.js'`

### استخدام Firestore أو Storage من أي ملف

```javascript
import { db, storage } from './firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
```

### إضافة خدمات لاحقاً (مثال Authentication)

```powershell
npm install firebase
```

```javascript
import { getAuth } from 'firebase/auth';
import { app } from './firebase.js';

export const auth = getAuth(app);
```

---

## روابط بعد النشر

- **الموقع:** https://sutoor.web.app  
- **أو:** https://sutoor.firebaseapp.com  

### رفع الصور والفيديو وPDF إلى `gs://sutoor-storage`

```powershell
firebase deploy --only storage
# مرة واحدة (يتطلب Google Cloud SDK):
gcloud auth application-default login
npm run upload:gallery
```

بدون gcloud: ارفع يدوياً من [Storage → sutoor-storage](https://console.firebase.google.com/project/etkan-f3ba3/storage/sutoor-storage/files) إلى مجلد `gallery/`.

(الموقع الحالي يعرض الصور من ملفات البناء في Hosting؛ Storage للنسخ الاحتياطي أو استخدام لاحق من الكود.)

---

## أوامر مفيدة

```powershell
firebase projects:list
firebase hosting:sites:list
firebase deploy --only hosting,functions,storage
```

---

## ملاحظة Resend

نموذج التبرع يحتاج **Functions** على Firebase. `firebase deploy --only hosting` وحده **ما يكفي** لإرسال الإيميل.
