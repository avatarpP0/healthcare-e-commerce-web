import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Trash2, Camera, Shield, Clock, PhoneCall, Check } from 'lucide-react';
import { PrescriptionSubmission } from '../types';

interface PrescriptionUploadModuleProps {
  onPrescriptionSubmitted?: (submission: PrescriptionSubmission) => void;
}

export const PrescriptionUploadModule: React.FC<PrescriptionUploadModuleProps> = ({
  onPrescriptionSubmitted,
}) => {
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [allowGenericSubstitutes, setAllowGenericSubstitutes] = useState(true);

  const [selectedFile, setSelectedFile] = useState<{
    file: File | null;
    name: string;
    size: string;
    previewUrl?: string;
  } | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<PrescriptionSubmission | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' بايت';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' ك.ب';
    return (bytes / (1024 * 1024)).toFixed(1) + ' م.ب';
  };

  const handleFileProcess = (file: File) => {
    setErrorMessage(null);
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      setErrorMessage('يرجى اختيار صورة واضحة (JPG, PNG) أو ملف PDF للروشتة.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('حجم الملف كبير جداً. الحد الأقصى المسموح به 10 ميجابايت.');
      return;
    }

    let previewUrl: string | undefined = undefined;
    if (file.type.startsWith('image/')) {
      previewUrl = URL.createObjectURL(file);
    }

    setSelectedFile({
      file,
      name: file.name,
      size: formatFileSize(file.size),
      previewUrl,
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileProcess(e.target.files[0]);
    }
  };

  // Sample preset prescription helper for instant testing
  const loadDemoPrescription = () => {
    setPatientName('محمود عبد الرحمن');
    setPhoneNumber('01012345678');
    setAddress('الدقي - شارع مصدق - عمارة 24');
    setNotes('أرجو مراجعة الجرعة الخاصة بضغط الدم، وتوفير قطرة مرطبة للعين إن أمكن.');
    setSelectedFile({
      file: null,
      name: 'روشتة_طبية_باطنة_د_أحمد_شاهين.jpg',
      size: '1.4 م.ب',
      previewUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
    });
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!selectedFile) {
      setErrorMessage('يرجى إرفاق صورة الروشتة أو الملف أولاً.');
      return;
    }

    if (!patientName.trim()) {
      setErrorMessage('يرجى كتابة اسم المريض أو مقدم الطلب.');
      return;
    }

    if (!phoneNumber.trim() || phoneNumber.length < 8) {
      setErrorMessage('يرجى كتابة رقم هاتف صحيح للتواصل معك.');
      return;
    }

    setIsSubmitting(true);

    // Simulate clinical pharmacist intake workflow
    setTimeout(() => {
      const ticketNum = 'RX-' + Math.floor(10000 + Math.random() * 90000);
      const newSubmission: PrescriptionSubmission = {
        id: 'sub-' + Date.now(),
        ticketNumber: ticketNum,
        patientName,
        phoneNumber,
        address,
        notes: notes + (allowGenericSubstitutes ? ' (موافق على البدائل الدوائية المعتمدة)' : ' (الدواء الأصلي فقط)'),
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        previewUrl: selectedFile.previewUrl,
        submittedAt: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        status: 'reviewing',
      };

      setSubmittedData(newSubmission);
      setIsSubmitting(false);

      if (onPrescriptionSubmitted) {
        onPrescriptionSubmitted(newSubmission);
      }
    }, 1200);
  };

  const resetForm = () => {
    setSubmittedData(null);
    setSelectedFile(null);
    setPatientName('');
    setPhoneNumber('');
    setAddress('');
    setNotes('');
    setErrorMessage(null);
  };

  return (
    <section id="prescription-section" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700 mb-2">
            <span>خدمة صيدلانية معتمدة</span>
            <span aria-hidden="true">·</span>
            <span>مراجعة فورية 24/7</span>
            <span aria-hidden="true">·</span>
            <span>تجهيز الأدوية وتوصيلها</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            خدمة رفع ومراجعة الروشتة الطبية
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            صوّر روشتتك أو تقريرك الطبي وسيقوم الصيدلي بمراجعتها والتأكد من توافر كافة الأصناف وتداخلاتها الدوائية ثم التواصل معك هاتفياً قبل التوصيل.
          </p>
        </div>

        {submittedData ? (
          /* Confirmation Ticket Card */
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-200/80">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    تم استلام الروشتة بنجاح وجارٍ مراجعتها
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    رقم التذكرة المرجعية:{' '}
                    <span className="font-mono font-bold text-emerald-700">{submittedData.ticketNumber}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 bg-white px-3.5 py-2 rounded-xl border border-emerald-200 shrink-0">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>وقت الاتصال المتوقع: خلال 15 دقيقة</span>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="py-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">اسم المريض</span>
                <span className="font-bold text-slate-800 text-sm">{submittedData.patientName}</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">رقم الهاتف</span>
                <span className="font-bold text-slate-800 text-sm font-mono">{submittedData.phoneNumber}</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">الملف المرفوع</span>
                <span className="font-bold text-slate-800 text-sm truncate block" title={submittedData.fileName}>
                  {submittedData.fileName}
                </span>
              </div>
            </div>

            {/* Next steps advice */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2">
              <p className="font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-sky-600" />
                <span>ماذا يحدث الآن؟</span>
              </p>
              <ul className="space-y-1.5 list-disc list-inside text-slate-600 ps-1">
                <li>يقوم صيدلي الكلينيكال بمراجعة خط الطبيب والجرعات المسجلة بدقة.</li>
                <li>سنتصل بك لتأكيد الأسعار وتوافر الأدوية وتحديد الموعد الأنسب للتوصيل.</li>
                <li>يتم حفظ الروشتة في ملفك الطبي لتسهيل تكرار الأدوية المزمنة لاحقاً.</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-emerald-200/60">
              <button
                onClick={resetForm}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                رفع روشتة جديدة أو مريض آخر
              </button>

              <a
                href={`https://wa.me/201149556339?text=مرحباً%20صيدلية%20د.%20مؤمن،%20أستفسر%20عن%20الروشتة%20رقم%20${submittedData.ticketNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>متابعة الروشتة عبر الواتساب فوراً (01149556339)</span>
              </a>
            </div>
          </div>
        ) : (
          /* Prescription Upload Form */
          <form
            onSubmit={handleSubmit}
            className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs"
          >
            {/* Error Message if any */}
            {errorMessage && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-xs text-rose-800">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left / Drag and Drop Area */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-900 block">
                      صورة أو ملف الروشتة الطبية <span className="text-rose-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={loadDemoPrescription}
                      className="text-[11px] font-semibold text-sky-600 hover:text-sky-700 underline cursor-pointer"
                    >
                      تجربة نموذج روشتة جاهز
                    </button>
                  </div>

                  {/* Drop Area */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative rounded-2xl border-2 border-dashed p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[220px] ${
                      isDragging
                        ? 'border-sky-500 bg-sky-50/70'
                        : selectedFile
                        ? 'border-emerald-400 bg-emerald-50/40'
                        : 'border-slate-300 hover:border-slate-400 bg-white'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {selectedFile ? (
                      <div className="w-full flex flex-col items-center">
                        {selectedFile.previewUrl ? (
                          <div className="w-24 h-24 rounded-xl overflow-hidden border border-slate-200 mb-3 shadow-xs">
                            <img
                              src={selectedFile.previewUrl}
                              alt="معاينة الروشتة"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                            <FileText className="w-8 h-8" />
                          </div>
                        )}

                        <p className="text-xs font-bold text-slate-800 line-clamp-1 max-w-[200px]">
                          {selectedFile.name}
                        </p>
                        <span className="text-[11px] text-slate-400 font-mono mt-0.5">
                          {selectedFile.size}
                        </span>

                        <div className="mt-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFile(null);
                            }}
                            className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium bg-white px-2.5 py-1 rounded-lg border border-slate-200"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>حذف وتغيير</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
                          <UploadCloud className="w-6 h-6" />
                        </div>
                        <p className="text-xs font-bold text-slate-800">
                          اسحب صورة الروشتة إلى هنا أو اضغط للاختيار
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1">
                          يدعم صور الهاتف الواضحة (JPG, PNG) أو ملفات PDF (حتى 10 م.ب)
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-xs text-sky-600 font-medium bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-100">
                          <Camera className="w-3.5 h-3.5" />
                          <span>التقاط صورة بكاميرا الهاتف</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>بياناتك الطبية مشفرة ومحفوظة بسرية تامة طبقاً لتعليمات نقابة الصيادلة.</span>
                </div>
              </div>

              {/* Right / Patient Information & Notes Form */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  {/* Name field */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      اسم المريض بالكامل <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="مثال: د. طارق محمود المنشاوي"
                      className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white text-slate-900 border border-slate-200 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                    />
                  </div>

                  {/* Phone & Address in 2 cols */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">
                        رقم الهاتف / الواتساب <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="010XXXXXXXX"
                        className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white text-slate-900 border border-slate-200 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all font-mono text-end"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">
                        المنطقة أو العنوان
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="مثال: الدقي، الجيزة، شارع التحرير"
                        className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white text-slate-900 border border-slate-200 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Notes / Instructions for Pharmacist */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      ملاحظات خاصة بالروشتة للصيدلي (اختياري)
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="مثال: أحتاج علبتين من الدواء الأول، أو يرجى مراجعة الصيدلي للتأكد من تعارض دواء السكر..."
                      className="w-full p-3 text-xs sm:text-sm bg-white text-slate-900 border border-slate-200 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Generic Substitute Consent */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="generic-consent"
                      checked={allowGenericSubstitutes}
                      onChange={(e) => setAllowGenericSubstitutes(e.target.checked)}
                      className="mt-1 rounded text-sky-600 focus:ring-sky-500 w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="generic-consent" className="text-xs text-slate-700 cursor-pointer">
                      <span className="font-semibold text-slate-900 block">
                        السماح بتقديم بدائل دوائية مصرية مكافئة علمياً
                      </span>
                      <span>
                        في حال نقص أحد الأصناف المستوردة، يقوم الصيدلي باقتراح البديل المعتمد بنفس المادة الفعالة بعد مراجعتك هاتفياً.
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>جاري إرسال الروشتة وتوجيهها للصيدلي المناوب...</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4" />
                        <span>إرسال الروشتة للمراجعة والتسعير الفوري</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
