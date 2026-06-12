import { useState } from 'react';
import { Copy, Check, AlertCircle, Smartphone, Download, Heart, PauseCircle } from 'lucide-react';
import DonationForm from './DonationForm';

function CountryFlag({ code, size = 'md', fallback }) {
  const sizes = {
    sm: 'w-9 h-6',
    md: 'w-11 h-8',
    lg: 'w-14 h-10',
  };

  if (!code) {
    return (
      <span className={`${sizes[size]} flex items-center justify-center text-2xl leading-none`}>
        {fallback}
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/w80/${code}.png`}
      srcSet={`https://flagcdn.com/w160/${code}.png 2x`}
      alt=""
      className={`${sizes[size]} object-cover rounded-md shadow-sm border border-gray-200/60`}
      loading="lazy"
    />
  );
}

const donationMethods = [
  {
    id: "morocco",
    countryCode: "ma",
    titleEn: "Morocco",
    titleAr: "المغرب",
    options: [
      {
        type: "bank",
        bankNameEn: "Attijari Bank",
        bankNameAr: "تجاري بنك",
        holder: "SOULAYMAN BENNAY",
        rib: "007720000757430040270789",
        notesEn: "Account affiliated with Al-Ghoula Office. DO NOT write any notes. DO NOT write 'Gaza' or 'Palestine' in the transaction.",
        notesAr: "الحساب التابع لمكتب الغول. ممنوع كتابة أي ملاحظات. ممنوع كتابة غزة أو فلسطين."
      }
    ]
  },
  {
    id: "egypt",
    countryCode: "eg",
    titleEn: "Egypt",
    titleAr: "مصر",
    options: [
      {
        type: "wallet",
        walletNameEn: "Vodafone Cash",
        walletNameAr: "فودافون كاش",
        numbers: [
          "01003883273",
          "01091190937",
          "01023304052",
          "01025209011",
          "01093247895",
          "01002576503",
          "01021771805",
          "01097347511"
        ],
        holderEn: "Nidal Al-Ghoula Office",
        holderAr: "مكتب نضال الغول",
        notesEn: "Please send the transfer date with the receipt to facilitate processing.",
        notesAr: "الرجاء إرسال تاريخ الإرسال مع الوصل لتسهيل المعاملة."
      }
    ]
  },
  {
    id: "uae",
    countryCode: "ae",
    titleEn: "UAE",
    titleAr: "الإمارات",
    options: [
      {
        type: "bank",
        bankNameEn: "Abu Dhabi Commercial Bank PJSC",
        bankNameAr: "بنك أبوظبي التجاري",
        holder: "KAREM WAHED GOUDA MOUSA KHALIL",
        accountNum: "14011814920001",
        iban: "AE570030014011814920001",
        swift: "ADCBAEAA",
        currency: "AED",
        notesEn: "DO NOT write any transaction notes.",
        notesAr: "يمنع منعاً باتاً كتابة أي ملاحظات في التحويل."
      }
    ]
  },
  {
    id: "qatar",
    countryCode: "qa",
    titleEn: "Qatar",
    titleAr: "قطر",
    options: [
      {
        type: "bank",
        bankNameEn: "Doha Bank",
        bankNameAr: "بنك الدوحة",
        holder: "Hassana Umaru Ibrahi",
        accountNum: "022002289220010020000",
        iban: "QA61 DOHB 0220 0228 9220 0100 2000 0",
        cliq: "hassanau",
        qrCode: "/assets/images/transform/qatar-account.jpeg",
        notesEn: "Valid for amounts under 9,000 Qatari Riyals.",
        notesAr: "الحساب الأول للمبالغ أقل من 9000 ريال قطري."
      }
    ]
  },
  {
    id: "jordan",
    countryCode: "jo",
    titleEn: "Jordan",
    titleAr: "الأردن",
    options: [
      {
        type: "wallet",
        walletNameEn: "CliQ / Union Bank",
        walletNameAr: "كليك (بنك الاتحاد)",
        holderEn: "Nour El-Din Ibrahim Hussein",
        holderAr: "نور الدين ابراهيم حسين",
        cliq: "Dexter1998",
        notesEn: "Instant CliQ transfer. Do not write transfer notes.",
        notesAr: "تحويل فوري عبر نظام كليك. يمنع كتابة الملاحظات."
      },
      {
        type: "wallet",
        walletNameEn: "CliQ / Safwa Bank — Al-Ghoula Office",
        walletNameAr: "كليك (بنك صفوة) — مكتب الغول",
        holderEn: "Ayman Al-Bahrat",
        holderAr: "أيمن البحرات",
        cliq: "Ayman56565",
        notesEn: "Jordan account affiliated with Al-Ghoula Office. Do not write transfer notes.",
        notesAr: "حساب الأردن الخاص بمكتب الغول. يمنع كتابة الملاحظات."
      }
    ]
  },
  {
    id: "europe",
    countryCode: "gr",
    titleEn: "European Account",
    titleAr: "الحساب الأوروبي",
    options: [
      {
        type: "bank",
        bankNameEn: "Piraeus Bank (Greece)",
        bankNameAr: "بنك بيربوس (اليونان)",
        holder: "IHSAN ALJAB",
        holderAr: "احسان عصام الجعب",
        iban: "GR8401727530005753111870671",
        notesEn: "Do not write any notes in transfer. Sender name is required with every transaction.",
        notesAr: "يمنع كتابة أي ملاحظات بشكل مطلق. يجب إرسال اسم المرسل مع كل حركة."
      }
    ]
  },
  {
    id: "tunisia",
    countryCode: "tn",
    titleEn: "Tunisia",
    titleAr: "تونس",
    options: [
      {
        type: "baridimob",
        walletNameEn: "Active Tunisia Card Accounts",
        walletNameAr: "حسابات تونس الفعالة",
        cardNumbers: [
          { name: "عامر", nameEn: "Amer", card: "5359403636264428" },
          { name: "محمد", nameEn: "Mohamed", card: "5359403634265815" },
          { name: "زكية", nameEn: "Zakia", card: "5359403635876206" },
          { name: "محمد", nameEn: "Mohamed", card: "5359407115680327" },
          { name: "عامر", nameEn: "Amer", card: "5359401733885236" },
          { name: "زكية", nameEn: "Zakia", card: "5359401735151199" },
          { name: "سامية", nameEn: "Samia", card: "5359401729217774" }
        ],
        notesEn: "Priority follows the listed order (top to bottom). Do not write any notes.",
        notesAr: "الأولوية حسب الترتيب من الأول إلى الأخير. يمنع كتابة الملاحظات."
      }
    ]
  },
  {
    id: "algeria",
    countryCode: "dz",
    titleEn: "Algeria",
    titleAr: "الجزائر",
    options: [
      {
        type: "baridimob",
        walletNameEn: "BaridiMob — Al-Ghoula Office",
        walletNameAr: "بريد موب — مكتب الغول",
        holderEn: "Abdul Jalil Al-Ghoul",
        holderAr: "عبد الجليل الغول",
        rip: "00799999002545260806",
        notesEn: "BaridiMob account affiliated with Al-Ghoula Office. Do not write any notes.",
        notesAr: "حساب بريد موب التابع لمكتب الغول. يمنع كتابة أي ملاحظات."
      }
    ]
  },
  {
    id: "oman",
    countryCode: "om",
    titleEn: "Oman",
    titleAr: "عمان",
    options: [
      {
        type: "bank",
        bankNameEn: "Sohar International",
        bankNameAr: "بنك صحار الدولي",
        holder: "Mohammed Ishaq Khalil Alaloul",
        accountNum: "208020102821",
        swift: "BSHROMRUXXX",
        iban: "OM280300000208020102821",
        notesEn: "Minimum deposit is 10 Omani Rials. STRICTLY NO NOTES ALLOWED.",
        notesAr: "الحد الأدنى للإيداع هو 10 ريالات عمانية. يمنع منعاً باتاً كتابة أي ملاحظات في التحويل."
      }
    ]
  },
  {
    id: "yemen",
    countryCode: "ye",
    titleEn: "Yemen",
    titleAr: "اليمن",
    options: [
      {
        type: "network",
        networkNameEn: "Northern Networks",
        networkNameAr: "شبكات المحافظ الشمالية (صنعاء)",
        recipientEn: "Ahmed Mohamed Abdullah Al-Hammadi",
        recipientAr: "احمد محمد عبدالله الحمادي",
        phone: "774448103",
        senderNameEn: "Yasser Abdulrahman Mohamed Al-Samei",
        senderNameAr: "ياسر عبدالرحمن محمد السامعي",
        senderPhone: "780900059",
        notesEn: "Valid for Najm, Hazmi, Imtiaz, Akwaa, etc. Make sure names match exactly.",
        notesAr: "تشمل شبكات (نجم - حزمي - امتياز - أكوع... إلخ). يرجى مطابقة الأسماء تماماً."
      },
      {
        type: "network",
        networkNameEn: "Southern Networks",
        networkNameAr: "شبكات المحافظ الجنوبية (عدن)",
        recipientEn: "Ahmed Mohamed Abdullah Al-Hammadi",
        recipientAr: "احمد محمد عبدالله الحمادي",
        phone: "774448103",
        senderNameEn: "Yasser Abdulrahman Mohamed Al-Samei",
        senderNameAr: "ياسر عبدالرحمن محمد السامعي",
        senderPhone: "780900059",
        notesEn: "Valid for Qutaibi, Lahzat, Dowal, Express, Unified Network, etc.",
        notesAr: "تشمل شبكات (قطيبي - لحظات - دول - اكسبرس - الشبكة الموحدة للأموال... إلخ)."
      }
    ]
  },
  {
    id: "iraq",
    countryCode: "iq",
    titleEn: "Iraq",
    titleAr: "العراق",
    options: [
      {
        type: "wallet",
        walletNameEn: "Zain Cash",
        walletNameAr: "زين كاش",
        qrCode: "/assets/images/transform/zain-cash-iraq.jpeg",
        notesEn: "Scan the Zain Cash QR code to transfer directly.",
        notesAr: "امسح رمز الاستجابة السريع للتحويل المباشر عبر محفظة زين كاش العراق."
      }
    ]
  },
  {
    id: "syria",
    countryCode: "sy",
    titleEn: "Syria",
    titleAr: "سوريا",
    options: [
      {
        type: "wallet",
        walletNameEn: "Sham Cash",
        walletNameAr: "شام كاش",
        qrCode: "/assets/images/transform/syria-sham-cash.jpeg",
        walletAddress: "617aae1176c5bd8537b6a2fa0c94c9ae",
        notesEn: "STRICTLY NO NOTES ALLOWED. Send transfer verification.",
        notesAr: "يمنع منعاً باتاً كتابة أي ملاحظات في الوصل لتفادي تجميد الخدمة."
      }
    ]
  },
  {
    id: "paypal",
    countryCode: "us",
    titleEn: "PayPal / Cards",
    titleAr: "باي بال والبطاقات",
    options: [
      {
        type: "paypal",
        walletNameEn: "Direct Link",
        walletNameAr: "لينك مباشر",
        paypalLink: "https://www.paypal.me/besbes94",
        notesEn: "DO NOT write any transaction notes.",
        notesAr: "يمنع منعاً باتاً كتابة أي ملاحظات."
      },
      {
        type: "paypal",
        walletNameEn: "Donation Link",
        walletNameAr: "لينك تبرعات",
        paypalLink: "https://www.paypal.com/donate/?business=A5V9R7AQ3DL2C&no_recurring=0&currency_code=USD",
        notesEn: "DO NOT write any transaction notes.",
        notesAr: "يمنع منعاً باتاً كتابة أي ملاحظات."
      },
      {
        type: "paypal",
        walletNameEn: "Friend Account Only",
        walletNameAr: "صديق حصراً فقط",
        paypalLink: "https://paypal.me/Ghanaima",
        notesEn: "Friends only. DO NOT write any transaction notes.",
        notesAr: "للأصدقاء حصراً. يمنع كتابة أي ملاحظات."
      },
      {
        type: "paypal",
        walletNameEn: "Mohannad Alameer — Visa / Mastercard",
        walletNameAr: "مهند الأمير — فيزا / ماستر",
        visaLink: "https://www.paypal.com/ncp/payment/KRZEWYQ924QYL",
        notesEn: "DO NOT write any transaction notes.",
        notesAr: "يمنع منعاً باتاً كتابة أي ملاحظات."
      },
      {
        type: "paypal",
        walletNameEn: "Direct Link",
        walletNameAr: "لينك مباشر",
        paypalLink: "https://paypal.me/ALAMEERJO",
        notesEn: "DO NOT write any transaction notes.",
        notesAr: "يمنع منعاً باتاً كتابة أي ملاحظات."
      }
    ]
  },
  {
    id: "binance",
    countryCode: null,
    flagFallback: "🪙",
    titleEn: "Binance (Crypto)",
    titleAr: "العملات الرقمية (USDT)",
    options: [
      {
        type: "crypto",
        walletNameEn: "USDT TRC20 Address",
        walletNameAr: "محفظة USDT (شبكة TRC20)",
        address: "TCQFwNrwF5nrJuyekEFaveWZdRViN7dP7w",
        binanceId: "1144340194",
        qrCode: "/assets/images/transform/USTD.jpeg",
        notesEn: "Priority method as listed. Ensure you select TRC-20 network for USDT transfers.",
        notesAr: "الأولوية حسب الترتيب من الأول إلى الأخير. تأكد من اختيار شبكة TRC-20 عند تحويل USDT."
      }
    ]
  }
];

export default function Donation({ lang, t }) {
  const [selectedCountry, setSelectedCountry] = useState(donationMethods[0].id);
  const [copiedKey, setCopiedKey] = useState(null);

  const activeCountryData = donationMethods.find(m => m.id === selectedCountry);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const downloadImage = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="donate" className="relative py-24 bg-bg-light overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute inset-0 bg-kufiya-net opacity-[0.05]" />
      <div className="absolute left-10 top-1/3 w-80 h-80 bg-primary-green/10 rounded-full filter blur-[100px]" />
      <div className="absolute right-10 bottom-1/4 w-80 h-80 bg-primary-blue/10 rounded-full filter blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block border border-primary-green/30 px-4 py-1.5 rounded-full text-xs font-bold text-primary-green uppercase tracking-widest bg-primary-green/5 mb-3">
            {lang === 'en' ? "Support Gaza" : "ساند طلاب غزة"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight">
            {t.donation.title}
          </h2>
          <p className="mt-4 text-base text-text-muted font-light">
            {t.donation.subtitle}
          </p>
        </div>

        {/* GoFundMe Paused — context for direct transfer methods */}
        <div className="max-w-5xl mx-auto mb-12 bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative bg-gray-50 p-6 sm:p-8 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold w-fit mb-4">
                <PauseCircle className="h-3.5 w-3.5" />
                <span>{t.donation.gofundmeBadge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-text-main leading-snug mb-4">
                {t.donation.gofundmeTitle}
              </h3>
              <div className="space-y-3 text-sm text-text-muted leading-relaxed font-light">
                <p>{t.donation.gofundmeBody1}</p>
                <p>{t.donation.gofundmeBody2}</p>
                <p className="text-primary-green font-medium">{t.donation.gofundmeBody3}</p>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <span className="inline-flex items-center gap-1.5 bg-primary-green/10 text-primary-green text-xs font-bold px-3 py-1.5 rounded-full">
                  <Heart className="h-3.5 w-3.5 fill-current" />
                  {t.donation.gofundmeRaised}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-primary-blue/10 text-primary-blue text-xs font-bold px-3 py-1.5 rounded-full">
                  {t.donation.gofundmeDonors}
                </span>
              </div>
            </div>
            <div className="relative p-4 sm:p-6 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
              <figure className="w-full">
                <img
                  src="/assets/images/gofundme-paused.png"
                  alt={t.donation.gofundmeCaption}
                  className="w-full rounded-2xl border border-gray-200 shadow-lg object-cover object-top"
                />
                <figcaption className="text-[11px] text-text-muted text-center mt-3 font-medium">
                  {t.donation.gofundmeCaption}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* Major Donation Notice */}
        <div className="max-w-4xl mx-auto mb-12 bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
          <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-red-700 uppercase tracking-wider">
              {t.donation.noticeTitle}
            </h4>
            <p className="text-xs sm:text-sm text-red-600 mt-1 leading-relaxed font-medium">
              {t.donation.noticeBody}
            </p>
          </div>
        </div>

        {/* Main Donation Layout: Split selection and receipt upload */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Selector & Details (Lg: 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Country Cards Grid Selector */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {donationMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedCountry(method.id)}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer ${
                    selectedCountry === method.id
                      ? "bg-primary-green border-primary-green text-white"
                      : "bg-white border-gray-200 text-text-muted hover:border-primary-green/50"
                  }`}
                >
                  <CountryFlag
                    code={method.countryCode}
                    size="sm"
                    fallback={method.flagFallback}
                  />
                  <span className="text-xs font-bold font-sans">
                    {lang === 'en' ? method.titleEn : method.titleAr}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Country Details Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xl min-h-[380px]">
              
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
                <CountryFlag
                  code={activeCountryData.countryCode}
                  size="lg"
                  fallback={activeCountryData.flagFallback}
                />
                <div>
                  <h3 className="text-xl font-bold text-text-main">
                    {lang === 'en' ? activeCountryData.titleEn : activeCountryData.titleAr}
                  </h3>
                  <p className="text-xs text-text-muted uppercase tracking-widest font-mono">
                    {lang === 'en' ? "Transfer Coordinates" : "بيانات الحساب والتحويل"}
                  </p>
                </div>
              </div>

              {/* Listing country-specific details */}
              <div className="space-y-8">
                {activeCountryData.options.map((opt, oIdx) => (
                  <div key={oIdx} className="space-y-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    
                    {/* Sub-header e.g. CIH Bank / Vodafone Cash */}
                    <span className="inline-block px-3 py-1 rounded bg-primary-blue/10 text-xs font-bold text-primary-blue">
                      {opt.type === 'bank' && (lang === 'en' ? opt.bankNameEn : opt.bankNameAr)}
                      {opt.type === 'wallet' && (lang === 'en' ? opt.walletNameEn : opt.walletNameAr)}
                      {opt.type === 'baridimob' && (lang === 'en' ? opt.walletNameEn : opt.walletNameAr)}
                      {opt.type === 'ccp' && (lang === 'en' ? opt.walletNameEn : opt.walletNameAr)}
                      {opt.type === 'network' && (lang === 'en' ? opt.networkNameEn : opt.networkNameAr)}
                      {opt.type === 'paypal' && (lang === 'en' ? opt.walletNameEn : opt.walletNameAr)}
                      {opt.type === 'crypto' && (lang === 'en' ? opt.walletNameEn : opt.walletNameAr)}
                    </span>

                    {/* Displaying details with Copy buttons */}
                    <div className="grid grid-cols-1 gap-4 font-sans text-sm">
                      
                      {/* Beneficiary Name */}
                      {(opt.holder || opt.holderEn) && (
                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <div>
                            <span className="text-xs text-text-muted block">{t.donation.fields.holder}</span>
                            <span className="text-sm font-semibold text-text-main">
                              {opt.holder || (lang === 'en' ? opt.holderEn : opt.holderAr)}
                            </span>
                            {opt.holderAr && opt.holder && (
                              <span className="text-xs text-text-muted block mt-1">{opt.holderAr}</span>
                            )}
                          </div>
                          <button
                            onClick={() => handleCopy(opt.holder || (lang === 'en' ? opt.holderEn : opt.holderAr), `holder-${oIdx}`)}
                            className="text-text-muted hover:text-primary-blue p-2"
                          >
                            {copiedKey === `holder-${oIdx}` ? <Check className="h-4 w-4 text-primary-green" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                      )}

                      {/* Currency */}
                      {opt.currency && (
                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <div>
                            <span className="text-xs text-text-muted block">{lang === 'en' ? 'Currency' : 'العملة'}</span>
                            <span className="text-sm font-semibold text-text-main font-mono">{opt.currency}</span>
                          </div>
                          <button
                            onClick={() => handleCopy(opt.currency, `currency-${oIdx}`)}
                            className="text-text-muted hover:text-primary-blue p-2"
                          >
                            {copiedKey === `currency-${oIdx}` ? <Check className="h-4 w-4 text-primary-green" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                      )}

                      {/* Account Number */}
                      {opt.accountNum && (
                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <div>
                            <span className="text-xs text-text-muted block">{t.donation.fields.accountNum}</span>
                            <span className="text-sm font-semibold text-text-main font-mono">{opt.accountNum}</span>
                          </div>
                          <button
                            onClick={() => handleCopy(opt.accountNum, `acc-${oIdx}`)}
                            className="text-text-muted hover:text-primary-blue p-2"
                          >
                            {copiedKey === `acc-${oIdx}` ? <Check className="h-4 w-4 text-primary-green" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                      )}

                      {/* RIB (Morocco Account) */}
                      {opt.rib && (
                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <div>
                            <span className="text-xs text-text-muted block">{t.donation.fields.rib}</span>
                            <span className="text-sm font-semibold text-text-main font-mono">{opt.rib}</span>
                          </div>
                          <button
                            onClick={() => handleCopy(opt.rib, `rib-${oIdx}`)}
                            className="text-text-muted hover:text-primary-blue p-2"
                          >
                            {copiedKey === `rib-${oIdx}` ? <Check className="h-4 w-4 text-primary-green" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                      )}

                      {/* IBAN */}
                      {opt.iban && (
                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <div>
                            <span className="text-xs text-text-muted block">{t.donation.fields.iban}</span>
                            <span className="text-sm font-semibold text-text-main font-mono break-all">{opt.iban}</span>
                          </div>
                          <button
                            onClick={() => handleCopy(opt.iban, `iban-${oIdx}`)}
                            className="text-text-muted hover:text-primary-blue p-2"
                          >
                            {copiedKey === `iban-${oIdx}` ? <Check className="h-4 w-4 text-primary-green" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                      )}

                      {/* Swift Code */}
                      {opt.swift && (
                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <div>
                            <span className="text-xs text-text-muted block">{t.donation.fields.swift}</span>
                            <span className="text-sm font-semibold text-text-main font-mono">{opt.swift}</span>
                          </div>
                          <button
                            onClick={() => handleCopy(opt.swift, `swift-${oIdx}`)}
                            className="text-text-muted hover:text-primary-blue p-2"
                          >
                            {copiedKey === `swift-${oIdx}` ? <Check className="h-4 w-4 text-primary-green" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                      )}

                      {/* CliQ alias / Fawran ID */}
                      {opt.cliq && (
                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <div>
                            <span className="text-xs text-text-muted block">
                              {selectedCountry === 'qatar' ? t.donation.fields.fawran : t.donation.fields.cliq}
                            </span>
                            <span className="text-sm font-semibold text-text-main font-mono">{opt.cliq}</span>
                          </div>
                          <button
                            onClick={() => handleCopy(opt.cliq, `cliq-${oIdx}`)}
                            className="text-text-muted hover:text-primary-blue p-2"
                          >
                            {copiedKey === `cliq-${oIdx}` ? <Check className="h-4 w-4 text-primary-green" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                      )}

                      {/* Egypt Wallet Numbers */}
                      {opt.numbers && opt.numbers.map((num, nIdx) => (
                        <div key={nIdx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <div>
                            <span className="text-xs text-text-muted block">
                              {t.donation.fields.phone} {nIdx + 1}
                            </span>
                            <span className="text-sm font-semibold text-text-main font-mono">{num}</span>
                          </div>
                          <button
                            onClick={() => handleCopy(num, `num-${oIdx}-${nIdx}`)}
                            className="text-text-muted hover:text-primary-blue p-2"
                          >
                            {copiedKey === `num-${oIdx}-${nIdx}` ? <Check className="h-4 w-4 text-primary-green" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                      ))}

                      {/* Algeria Post (BaridiMob RIP & Card Numbers) */}
                      {opt.rip && (
                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <div>
                            <span className="text-xs text-text-muted block">{t.donation.fields.rip}</span>
                            <span className="text-sm font-semibold text-text-main font-mono">{opt.rip}</span>
                          </div>
                          <button
                            onClick={() => handleCopy(opt.rip, `rip-${oIdx}`)}
                            className="text-text-muted hover:text-primary-blue p-2"
                          >
                            {copiedKey === `rip-${oIdx}` ? <Check className="h-4 w-4 text-primary-green" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                      )}

                      {/* Gold card numbers */}
                      {opt.cardNumbers && (
                        <div className="space-y-2">
                          <span className="text-xs text-text-muted font-semibold block">{t.donation.fields.cardNum}</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {opt.cardNumbers.map((cObj, cIdx) => (
                              <div key={cIdx} className="flex justify-between items-center bg-gray-50 p-2.5 rounded-lg border border-gray-100 text-xs">
                                <div>
                                  <span className="text-text-muted font-medium font-sans block">
                                    {lang === 'en' ? (cObj.nameEn || cObj.name) : cObj.name}
                                  </span>
                                  <span className="font-semibold font-mono text-text-main">{cObj.card}</span>
                                </div>
                                <button
                                  onClick={() => handleCopy(cObj.card, `card-${oIdx}-${cIdx}`)}
                                  className="text-text-muted hover:text-primary-blue p-1.5"
                                >
                                  {copiedKey === `card-${oIdx}-${cIdx}` ? <Check className="h-3.5 w-3.5 text-primary-green" /> : <Copy className="h-3.5 w-3.5" />}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CCP Account */}
                      {opt.ccp && (
                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <div>
                            <span className="text-xs text-text-muted block">{t.donation.fields.ccp}</span>
                            <span className="text-sm font-semibold text-text-main font-mono">{opt.ccp}</span>
                          </div>
                          <button
                            onClick={() => handleCopy(opt.ccp, `ccp-${oIdx}`)}
                            className="text-text-muted hover:text-primary-blue p-2"
                          >
                            {copiedKey === `ccp-${oIdx}` ? <Check className="h-4 w-4 text-primary-green" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                      )}

                      {/* Yemen Networks (Holder Details) */}
                      {opt.recipientEn && (
                        <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs sm:text-sm">
                          <div className="flex justify-between">
                            <span className="text-text-muted">{t.donation.fields.recipient}</span>
                            <span className="font-bold text-text-main text-right">{lang === 'en' ? opt.recipientEn : opt.recipientAr}</span>
                          </div>
                          <div className="flex justify-between border-t border-gray-200 pt-2">
                            <span className="text-text-muted">{t.donation.fields.phone}</span>
                            <span className="font-semibold text-text-main font-mono">{opt.phone}</span>
                          </div>
                          <div className="flex justify-between border-t border-gray-200 pt-2">
                            <span className="text-text-muted">{t.donation.fields.senderName}</span>
                            <span className="font-bold text-text-main text-right">{lang === 'en' ? opt.senderNameEn : opt.senderNameAr}</span>
                          </div>
                          <div className="flex justify-between border-t border-gray-200 pt-2">
                            <span className="text-text-muted">{t.donation.fields.senderPhone}</span>
                            <span className="font-semibold text-text-main font-mono">{opt.senderPhone}</span>
                          </div>
                        </div>
                      )}

                      {/* Syria / Sham Cash Wallet code */}
                      {opt.walletAddress && (
                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <div>
                            <span className="text-xs text-text-muted block">{t.donation.fields.number}</span>
                            <span className="text-sm font-semibold text-text-main font-mono break-all">{opt.walletAddress}</span>
                          </div>
                          <button
                            onClick={() => handleCopy(opt.walletAddress, `waddr-${oIdx}`)}
                            className="text-text-muted hover:text-primary-blue p-2"
                          >
                            {copiedKey === `waddr-${oIdx}` ? <Check className="h-4 w-4 text-primary-green" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                      )}

                      {/* PayPal Payment Links */}
                      {(opt.paypalLink || opt.visaLink) && (
                        <div className="space-y-3">
                          <div className="flex flex-col sm:flex-row gap-3">
                            {opt.paypalLink && (
                              <a
                                href={opt.paypalLink}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-primary-blue hover:bg-primary-blue-light text-white p-3 rounded-xl shadow-md text-xs font-bold transition-all text-center"
                              >
                                <Smartphone className="h-4 w-4" />
                                <span>{lang === 'en' ? 'PayPal Link' : 'رابط باي بال'}</span>
                              </a>
                            )}

                            {opt.visaLink && (
                              <a
                                href={opt.visaLink}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-xl shadow-md text-xs font-bold transition-all text-center"
                              >
                                <Smartphone className="h-4 w-4" />
                                <span>{lang === 'en' ? 'Visa / Mastercard' : 'فيزا / ماستر'}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Crypto Address TRC20 */}
                      {opt.address && (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <div>
                              <span className="text-xs text-text-muted block">{t.donation.fields.address}</span>
                              <span className="text-xs font-semibold text-text-main font-mono break-all">{opt.address}</span>
                            </div>
                            <button
                              onClick={() => handleCopy(opt.address, `addr-${oIdx}`)}
                              className="text-text-muted hover:text-primary-blue p-2 flex-shrink-0"
                            >
                              {copiedKey === `addr-${oIdx}` ? <Check className="h-4 w-4 text-primary-green" /> : <Copy className="h-4 w-4" />}
                            </button>
                          </div>
                          
                          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm">
                            <div>
                              <span className="text-xs text-text-muted block">{t.donation.fields.binanceId}</span>
                              <span className="font-semibold text-text-main font-mono">{opt.binanceId}</span>
                            </div>
                            <button
                              onClick={() => handleCopy(opt.binanceId, `bin-${oIdx}`)}
                              className="text-text-muted hover:text-primary-blue p-2"
                            >
                              {copiedKey === `bin-${oIdx}` ? <Check className="h-4 w-4 text-primary-green" /> : <Copy className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Displaying QR Code as an Elegant Barcode Card */}
                    {opt.qrCode && (
                      <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-200 mt-6 shadow-sm">
                        <div className="flex-shrink-0 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                          <img
                            src={opt.qrCode}
                            alt="Donation QR Code"
                            className="h-32 w-32 object-contain"
                          />
                        </div>
                        <div className="flex flex-col gap-3 w-full text-center md:text-start">
                          <div>
                            <h4 className="text-sm font-bold text-text-main">
                              {lang === 'en' ? "Verification Barcode" : "باركود التحويل"}
                            </h4>
                            <p className="text-xs text-text-muted mt-1">
                              {lang === 'en' ? "Scan this code to transfer directly." : "امسح هذا الرمز للتحويل المباشر بشكل آمن."}
                            </p>
                          </div>
                          <div className="flex gap-2 justify-center md:justify-start">
                            <button
                              onClick={() => downloadImage(opt.qrCode, `barcode-${opt.type}.jpg`)}
                              className="flex items-center gap-1.5 px-4 py-2 bg-primary-green/10 text-primary-green hover:bg-primary-green hover:text-white rounded-lg text-xs font-bold transition-colors"
                            >
                              <Download className="w-4 h-4" />
                              {lang === 'en' ? "Download" : "تحميل"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Section Instructions / Notes */}
                    {opt.notesEn && (
                      <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-primary-blue text-xs leading-relaxed text-blue-900 mt-4">
                        <span className="font-bold block mb-1">
                          {t.donation.fields.notes}:
                        </span>
                        {lang === 'en' ? opt.notesEn : opt.notesAr}
                      </div>
                    )}

                  </div>
                ))}
              </div>
            </div>
            
          </div>

          {/* Right Column: Receipt Uploader (Lg: 5 cols) */}
          <div className="lg:col-span-5 h-full">
            <DonationForm 
              lang={lang} 
              t={t} 
              countryName={lang === 'en' ? activeCountryData.titleEn : activeCountryData.titleAr} 
            />
          </div>

        </div>

      </div>
    </section>
  );
}
