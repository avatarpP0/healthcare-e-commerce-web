import React, { useState } from 'react';
import { MessageCircle, Phone, X, ShieldAlert } from 'lucide-react';
import { PHARMACY_INFO } from '../data/mockProducts';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 start-6 z-40 flex flex-col items-start gap-2">
      {/* Expanded quick contact card */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 w-72 mb-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-900">صيدلية د. مؤمن (متاحون الآن)</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 my-2.5 leading-relaxed">
            مرحباً بك! فريق الصيدلية متاح لمساعدتك في صرف الروشتات، التأكد من أسعار الأدوية، أو الاستشارات العاجلة.
          </p>

          <div className="space-y-2 pt-1">
            <a
              href={`https://wa.me/201149556339?text=مرحباً%20صيدلية%20د.%20مؤمن،%20أريد%20الاستفسار%20عن%20دواء`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>محادثة واتساب: 01149556339</span>
            </a>

            <a
              href="tel:01149556339"
              className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              <span>اتصال مباشر: 01149556339</span>
            </a>
          </div>
        </div>
      )}

      {/* Main floating pill button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-full shadow-lg shadow-emerald-600/30 transition-all cursor-pointer group"
        aria-label="تواصل مع الصيدلي عبر واتساب"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5" />
          <span className="absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-emerald-600" />
        </div>
        <span className="text-xs font-bold whitespace-nowrap">
          {isOpen ? 'إغلاق المساعدة' : 'تحدث مع الصيدلي 24/7'}
        </span>
      </button>
    </div>
  );
};
