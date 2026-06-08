# نشر الموقع مع Resend على Firebase

> **مشروعك الحالي:** `etkan-f3ba3` — الموقع `https://sutoor.web.app`  
> الإيميل **لا يُرسل** حتى تنشر دالة `sendDonation` (Hosting يوجّه `/api/send-donation` إليها).

## مرة واحدة فقط (الإعداد)

### 1) حساب Resend
- ادخل [resend.com](https://resend.com) وسجّل.
- من **API Keys** انسخ المفتاح (يبدأ بـ `re_`).

### 2) خطة Firebase Blaze على مشروع khabeer
- Cloud Functions تحتاج خطة **Blaze** على **`etkan-f3ba3`** (ليس مشروعاً آخر).
- [Upgrade](https://console.firebase.google.com/project/etkan-f3ba3/usage/details) → Blaze.

### 3) تثبيت Firebase CLI (إذا ما عندك)
```bash
npm install -g firebase-tools
firebase login
```

### 4) حفظ مفتاح Resend كـ Secret على Firebase
من مجلد المشروع (تأكد أن المشروع `etkan-f3ba3`):
```powershell
cd "c:\Users\Pc\Desktop\Sutoor Website"
firebase use etkan-f3ba3
firebase functions:secrets:set RESEND_API_KEY
```
الصق المفتاح `re_...` واضغط Enter.

(اختياري) إيميل الوجهة واسم المرسل كـ params:
```powershell
firebase functions:config:set donation.to="your@email.com"
# أو بعد النشر من Console → Functions → sendDonation → Environment
```
الأسهل: عدّل `functions/.env` ثم انشر (انظر أدناه).

### 5) إيميلات الإرسال (اختياري — القيم الافتراضية جاهزة)
انسخ `functions/.env.example` إلى `functions/.env`:
```bash
copy functions\.env.example functions\.env
```
عدّل إذا بدك:
- `DONATION_TO_EMAIL` — وين يوصل إشعار التبرع
- `RESEND_FROM_EMAIL` — من يبعت (بعد ما تثبّت دومينك في Resend)

### 6) تثبيت مكتبات الـ Functions
```bash
cd functions
npm install
cd ..
```

---

## نشر دالة الإيميل (مرة بعد الإعداد)

```powershell
cd functions
npm install
cd ..
firebase deploy --only functions
```

بعد النجاح، تحقق:
```powershell
firebase functions:list
```
يجب أن تظهر **`sendDonation`** في `europe-west1`.

## كل ما تنشر تحديث للموقع

```powershell
npm run deploy
```

ينشر: الموقع + Functions + قواعد Storage.

**Hosting فقط** (`npm run deploy:hosting`) **لا يفعّل الإيميل**.

---

## تجربة محلية (على جهازك)

1. ملف `.env.local` في جذر المشروع (المفتاح + الإيميلات).
2. `npm run dev`
3. جرّب النموذج على http://localhost:5173

---

## ملاحظة أمان
لا ترفع مفتاح `re_...` على GitHub. استخدم Secret على Firebase و `.env.local` محلياً فقط.
