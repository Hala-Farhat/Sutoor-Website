# المساهمة | Contributing

شكراً لاهتمامك بالمساهمة في مبادرة سطور! 🙏

Thank you for your interest in contributing to Sutoor Initiative! 🙏

---

## كيفية المساهمة | How to Contribute

### الإبلاغ عن الأخطاء | Reporting Bugs

إذا وجدت خللاً في الموقع:

1. تحقق من أنه لم يتم الإبلاغ عنه بالفعل
2. انشئ issue جديد مع:
   - وصف واضح للمشكلة
   - خطوات إعادة إنتاج الخطأ
   - سكينة شاشة إن أمكن
   - بيئتك (المتصفح، الجهاز، النظام)

### اقتراح ميزات جديدة | Suggesting Features

لاقتراح ميزة جديدة:

1. تأكد من أنها تتوافق مع رؤيتنا
2. انشئ issue مع العنوان `[Feature Request]`
3. اشرح الفائدة والحالة الاستخدامية

### المساهمة بالكود | Code Contributions

#### المتطلبات الأساسية
- معرفة بـ React و Tailwind CSS
- فهم بسيط لـ Git و GitHub
- الالتزام بمعايير الكود

#### خطوات المساهمة

1. **استنسخ المشروع**
```bash
git clone https://github.com/yourusername/sutoor-initiative.git
cd sutoor-initiative
```

2. **أنشئ فرع للميزة**
```bash
git checkout -b feature/اسم-الميزة
```

3. **قم بالتغييرات**
   - اكتب كود نظيف وسهل الفهم
   - اتبع أسلوب الكود الموجود
   - أضف التعليقات عند الضرورة

4. **اختبر التغييرات**
```bash
npm run dev
```

5. **قم بالـ Commit**
```bash
git add .
git commit -m "feat: وصف الميزة الجديدة"
```

استخدم البادئات:
- `feat:` - ميزة جديدة
- `fix:` - إصلاح خطأ
- `docs:` - تعديلات التوثيق
- `style:` - تعديلات التنسيق
- `refactor:` - إعادة هيكلة
- `perf:` - تحسين الأداء

6. **ادفع إلى فرعك**
```bash
git push origin feature/اسم-الميزة
```

7. **انشئ Pull Request**
   - اشرح ما الذي تغير ولماذا
   - أضف لقطات شاشة إن أمكن
   - ربط أي issues ذات صلة

---

## معايير الكود | Code Standards

### المكونات | Components
- استخدم Function Components مع Hooks
- اكتب prop types واضحة
- أضف تعليقات للمنطق المعقد
- تجنب state management المعقد

### الأنماط | Styling
- استخدم Tailwind CSS فقط
- اتبع النظام اللوني الموجود
- اجعل الأنماط مستجيبة (Responsive)

### التسميات | Naming
```javascript
// المكونات - PascalCase
const MyComponent = () => {}

// المتغيرات والدوال - camelCase
const myVariable = 'value'
const myFunction = () => {}

// الثوابت - UPPER_SNAKE_CASE
const API_URL = 'https://...'
```

---

## اختبار قبل الرفع | Before Submitting

- [ ] اختبرت على متصفحات مختلفة
- [ ] تحققت من الاستجابة على الموبايل
- [ ] اختبرت اللغة العربية والإنجليزية
- [ ] لا توجد أخطاء في الـ Console
- [ ] اتبعت معايير الكود
- [ ] وثقت التغييرات

---

## معلومات إضافية | Additional Info

- **الفرع الرئيسي | Main Branch**: `main`
- **فرع التطوير | Dev Branch**: `develop`
- **الدعم | Support**: info@sutoor.com

---

شكراً مجدداً على مساهمتك! ❤️

Thank you again for your contribution! ❤️
