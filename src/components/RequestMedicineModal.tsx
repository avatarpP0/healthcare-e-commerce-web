import React, { useState } from 'react';
import { X, SearchCheck, CheckCircle2, PhoneCall, Clock, AlertCircle } from 'lucide-react';
import { PHARMACY_INFO } from '../data/mockProducts';

interface RequestMedicineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestMedicineModal: React.FC<RequestMedicineModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [medName, setMedName] = useState('');
  const [formStrength, setFormStrength] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [patientPhone, setPatientPhone] = useState('01149556339');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedTicket = 'REQ-' + Math.floor(10000 + Math.random() * 90000);
      setTicketNumber(generatedTicket);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleReset = () => {
    setTicketNumber(null);
    setMedName('');
    setFormStrength('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-8">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-sky-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
              <SearchCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">خدمة توفير الأدوية الناقصة والمستوردة</h3>
              <p className="text-xs text-slate-500">نبحث لك في كافة المستودعات والشركات الدوائية</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {ticketNumber ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              تم تسجيل طلب توفير الدواء بنجاح
            </h4>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
              <p className="text-slate-500">رقم طلب التوفير:</p>
              <p className="text-base font-bold font-mono text-sky-700 mt-0.5">{ticketNumber}</p>
            </div>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              يقوم مسؤولو المشتريات في صيدلية د. مؤمن بالتواصل مع مخازن التوزيع وسنتصل بك على الرقم ({patientPhone}) فور تأكيد توفر الدواء خلال ساعات.
            </p>

            <div className="pt-3 flex flex-col gap-2">
              <a
                href={`https://wa.me/201149556339?text=مرحباً%20صيدلية%20د.%20مؤمن،%20أستفسر%20عن%20طلب%20توفير%20دواء%20رقم%20${ticketNumber}%20(${encodeURIComponent(medName)})`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>متابعة الطلب عبر الواتساب (01149556339)</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full py-2.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer font-medium"
              >
                إغلاق
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 text-xs text-sky-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span>
                إذا لم تجد دواءك أو علاجك المزمن في الكتالوج، سجل اسمه وسنقوم بتوفيره لك خصيصاً بأسرع وقت.
              </span>
            </div>

            {/* Medicine name */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                اسم الدواء المطلوب <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={medName}
                onChange={(e) => setMedName(e.target.value)}
                placeholder="مثال: جلوكوفاج، سينكولين، سيروم سيرافي، بخاخ..."
                className="w-full h-11 px-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:border-sky-500 focus:bg-white outline-none"
              />
            </div>

            {/* Strength and quantity */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  التركيز أو الشكل (اختياري)
                </label>
                <input
                  type="text"
                  value={formStrength}
                  onChange={(e) => setFormStrength(e.target.value)}
                  placeholder="مثال: 500 مجم / أقراص"
                  className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-sky-500 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  العدد المطلوب
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-sky-500 focus:bg-white outline-none font-mono"
                >
                  <option value="1">علبة واحدة (1)</option>
                  <option value="2">علبتان (2)</option>
                  <option value="3">3 علب</option>
                  <option value="4">4 علب أو أكثر</option>
                </select>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                رقم هاتفك للتواصل والتأكيد <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                dir="ltr"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="010XXXXXXXX"
                className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-sky-500 focus:bg-white outline-none font-mono text-end"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                ملاحظات إضافية (الشركة المنتجة، بدائل مقبولة...)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="مثال: يرجى توفير الدواء المستورد الأصلي فقط، أو لا مانع من بديل مصري بنفس المادة..."
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-sky-500 focus:bg-white outline-none resize-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 text-xs font-semibold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-2 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>جاري تسجيل الطلب...</span>
                ) : (
                  <span>طلب توفير الدواء الآن</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
