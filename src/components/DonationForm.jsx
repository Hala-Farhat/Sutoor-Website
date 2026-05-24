import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Send, ShieldCheck, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DonationForm({ lang, t, countryName }) {
  const [donorName, setDonorName] = useState("");
  const [donorAmount, setDonorAmount] = useState("");
  const [donorMessage, setDonorMessage] = useState("");
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReceiptFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#2ecc71', '#3498db', '#f1c40f']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#2ecc71', '#3498db', '#f1c40f']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleSubmit = (e) => {
    setErrorMsg("");

    if (!receiptFile) {
      e.preventDefault();
      setErrorMsg(lang === 'en' ? "Please upload your transfer receipt first." : "يرجى رفع صورة وصل التحويل أولاً.");
      return;
    }
    
    if (!donorAmount || !countryName) {
      e.preventDefault();
      setErrorMsg(lang === 'en' ? "Please fill in the required fields (Amount)." : "يرجى تعبئة الحقول المطلوبة (المبلغ).");
      return;
    }

    setIsSubmitting(true);
    setIframeLoaded(false);
    
    // The native form submission will continue, targeting the hidden iframe.
    // We rely on the iframe onLoad to know when it finishes.
  };

  const handleIframeLoad = () => {
    if (isSubmitting) {
      setIsSubmitting(false);
      const uniqueId = `DON-${Math.floor(Math.random() * 1000000)}`;
      setSubmittedData({
        code: uniqueId,
        name: donorName || "فاعل خير",
        country: countryName,
        amount: donorAmount,
        message: donorMessage
      });
      triggerConfetti();
    }
  };

  const resetForm = () => {
    setDonorName("");
    setDonorAmount("");
    setDonorMessage("");
    setReceiptFile(null);
    setReceiptPreview(null);
    setSubmittedData(null);
    setErrorMsg("");
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-2xl relative h-full">
      <div className="absolute top-0 right-0 h-10 w-10 bg-gradient-to-bl from-primary-green/10 to-transparent rounded-tr-3xl" />
      
      <AnimatePresence mode="wait">
        {!submittedData ? (
          <>
            <iframe 
              name="hidden_iframe" 
              id="hidden_iframe" 
              style={{ display: "none" }} 
              onLoad={handleIframeLoad}
            ></iframe>
            <motion.form
              key="form"
              action="https://formsubmit.co/halafarhat446@gmail.com"
              method="POST"
              encType="multipart/form-data"
              target="hidden_iframe"
              onSubmit={handleSubmit}
              className="space-y-5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <input type="hidden" name="_subject" value={`New Donation Alert: ${donorAmount}`} />
              <input type="hidden" name="_captcha" value="false" />
              
              <h3 className="text-lg font-bold text-text-main flex items-center gap-2 border-b border-gray-100 pb-4 mb-4">
              <FileText className="h-5 w-5 text-primary-green" />
              <span>{t.donation.formTitle}</span>
            </h3>

            {/* Error Message */}
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl font-bold">
                {errorMsg}
              </div>
            )}

            {/* Drag and Drop Zone */}
            <div 
              onClick={() => fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors flex flex-col items-center justify-center min-h-[160px] ${
                receiptFile 
                  ? 'border-primary-green bg-primary-green/5' 
                  : 'border-gray-200 hover:border-primary-green/50 bg-gray-50'
              }`}
            >
                <input 
                  type="file" 
                  name="attachment"
                  ref={fileInputRef} 
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden" 
                />
              
              {receiptPreview ? (
                <div className="relative">
                  <img 
                    src={receiptPreview} 
                    alt="Receipt Preview" 
                    className="h-28 w-auto object-contain rounded border border-gray-200 bg-white" 
                  />
                  <span className="block text-xs text-primary-green font-bold mt-2 truncate max-w-xs mx-auto">
                    {receiptFile.name}
                  </span>
                </div>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-gray-300 mb-3 animate-bounce" />
                  <p className="text-xs sm:text-sm text-text-muted leading-normal max-w-xs font-light">
                    {t.donation.fileLabel}
                  </p>
                </>
              )}
            </div>

            {/* Donor Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  {t.donation.nameLabel}
                </label>
                <input
                  type="text"
                  name="Donor_Name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder={t.donation.namePlaceholder}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary-green focus:bg-white font-sans transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  {t.donation.amountLabel}
                </label>
                <input
                  type="text"
                  name="Donation_Amount"
                  value={donorAmount}
                  onChange={(e) => setDonorAmount(e.target.value)}
                  placeholder={t.donation.amountPlaceholder}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary-green focus:bg-white font-sans transition-colors"
                />
                <input type="hidden" name="Transfer_Method" value={countryName || "Unknown"} />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  {t.donation.messageLabel || (lang === 'en' ? "Message (Optional)" : "رسالة (اختياري)")}
                </label>
                <textarea
                  name="Donor_Message"
                  rows={3}
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                  placeholder={t.donation.messagePlaceholder || (lang === 'en' ? "Leave a message..." : "اترك رسالة...")}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-text-main focus:outline-none focus:border-primary-green focus:bg-white transition-colors resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-green hover:bg-primary-green-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-primary-green/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>
                {isSubmitting 
                  ? (lang === 'en' ? "Uploading..." : "جاري الرفع...") 
                  : t.donation.submitBtn}
              </span>
            </button>
            </motion.form>
          </>
        ) : (
          <motion.div
            key="success"
            className="text-center py-6 space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-green/10 border border-primary-green/20 text-primary-green">
              <ShieldCheck className="h-10 w-10 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-text-main">
                {t.donation.successTitle}
              </h3>
              <p className="text-xs sm:text-sm text-text-muted font-light leading-relaxed max-w-sm mx-auto">
                {lang === 'en' 
                  ? "Your donation receipt has been securely submitted to our system." 
                  : "تم إرسال إيصال تبرعك بأمان إلى نظامنا."}
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-2xl text-xs text-left font-sans space-y-2.5 max-w-sm mx-auto border border-gray-200">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-text-muted">{lang === 'en' ? "Reference ID" : "رقم المرجع"}</span>
                <span className="font-bold text-primary-blue font-mono truncate max-w-[120px]">{submittedData.code}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-text-muted">{lang === 'en' ? "Donor Name" : "اسم المتبرع"}</span>
                <span className="font-semibold text-text-main">{submittedData.name}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-text-muted">{lang === 'en' ? "Amount Submitted" : "المبلغ المرسل"}</span>
                <span className="font-semibold text-text-main font-mono">{submittedData.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">{lang === 'en' ? "Country Group" : "جهة التحويل"}</span>
                <span className="font-semibold text-text-main">{submittedData.country}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={resetForm}
                className="text-sm bg-gray-100 hover:bg-gray-200 text-text-main font-bold py-3 px-6 rounded-xl w-full transition-colors"
              >
                {lang === 'en' ? "Submit another receipt" : "إرسال إشعار تبرع آخر"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
