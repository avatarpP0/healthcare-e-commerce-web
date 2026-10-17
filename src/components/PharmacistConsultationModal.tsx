import React, { useState } from 'react';
import { X, MessageCircle, Send, CheckCircle2, PhoneCall, ShieldCheck } from 'lucide-react';
import { PHARMACY_INFO } from '../data/mockProducts';

interface PharmacistConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export const PharmacistConsultationModal: React.FC<PharmacistConsultationModalProps> = ({
  isOpen,
  onClose,
  initialTopic = '',
}) => {
  const [topic, setTopic] = useState(initialTopic);
  const [patientQuestion, setPatientQuestion] = useState(
    initialTopic ? `أود الاستفسار عن الجرعة والتداخلات الدوائية الخاصة بـ: ${initialTopic}` : ''
  );
  const [patientPhone, setPatientPhone] = useState('01012345678');
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const quickQuestions = [
    'هل يتعارض هذا الدواء مع أدوية الضغط أو السكر؟',
    'ما هي الجرعة الصحيحة للأطفال أو كبار السن؟',
    'هل يتوفر بديل محلي معتمد بنفس الفعالية وبسعر أقل؟',
    'هل هذا الدواء آمن أثناء فترات الحمل والرضاعة؟',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientQuestion.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setSubmitted(false);
    setPatientQuestion('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-8">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-sky-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">استشارة صيدلانية إكلينيكية</h3>
              <p className="text-xs text-slate-500">تحت إشراف: {PHARMACY_INFO.leadPharmacist}</p>
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

        {submitted ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              تم توجيه استشارتك لصيدلي المناوبة
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              سيقوم الصيدلي المختص بالرد عليك برسالة مفصلة عبر تطبيق الواتساب على الرقم ({patientPhone}) خلال دقائق معدودة.
            </p>

            <div className="pt-3 flex flex-col gap-2">
              <a
                href={`https://wa.me/201002345678?text=مرحباً%20صيدلية%20د.%20مؤمن،%20لدي%20استشارة%20طبية%20عاجلة`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>محادثة واتساب مباشرة الآن</span>
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
            {/* Quick questions pills/buttons */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">
                استفسارات صيدلانية شائعة (اضغط للاختيار السريع):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPatientQuestion(q)}
                    className="text-[11px] bg-slate-100 hover:bg-sky-50 hover:text-sky-800 text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors text-start cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Question */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                سؤالك الطبي أو اسم الدواء <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={patientQuestion}
                onChange={(e) => setPatientQuestion(e.target.value)}
                placeholder="اكتب استفسارك بالتفصيل (مثل: هل يمكن تناول الدواء مع الطعام؟ ما الأعراض الجانبية؟)"
                className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-sky-500 focus:bg-white outline-none resize-none"
              />
            </div>

            {/* Phone for reply */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                رقم الهاتف / الواتساب لتلقي الرد الفوري <span className="text-rose-500">*</span>
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

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
              <span>الاستشارات الصيدلانية مجانية بالكامل ومبنية على المراجع الطبية المعتمدة.</span>
            </div>

            {/* Submit */}
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
                disabled={isSending}
                className="flex-2 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70"
              >
                {isSending ? (
                  <span>جاري الإرسال...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 rotate-180" />
                    <span>إرسال الاستشارة للصيدلي</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
