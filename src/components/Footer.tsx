import React from 'react';
import { Phone, Clock, MapPin, ShieldCheck, Mail, ArrowUp } from 'lucide-react';
import { PHARMACY_INFO } from '../data/mockProducts';

interface FooterProps {
  onScrollToTop: () => void;
  onOpenConsultation: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToTop,
  onOpenConsultation,
  onSelectCategory,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Pharmacy Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                م
              </div>
              <div>
                <span className="text-xl font-bold text-white block">صيدلية د. مؤمن</span>
                <span className="text-xs text-sky-400 font-mono">DR. MOAMEN PHARMACY</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              صيدلية رائدة تقدم خدمات الرعاية الصيدلانية الشاملة، صرف الأدوية وتوفير النواقص، تجهيز الروشتات الطبية وتوصيلها بأعلى معايير الجودة والسلامة الصحية.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{PHARMACY_INFO.licenseNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>خدمة التوصيل والاستشارات: 24 ساعة طوال أيام الأسبوع</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>الخط الساخن: <strong className="text-white font-mono">{PHARMACY_INFO.phone}</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">أقسام الصيدلية</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onSelectCategory('medicines')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  صيدلية الأدوية والعلاجات
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('vitamins')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  الفيتامينات والمكملات الغذائية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('skincare')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  العناية بالبشرة والجمال
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('devices')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  الأجهزة والمستلزمات الطبية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('baby')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  رعاية الأم والطفل
                </button>
              </li>
            </ul>
          </div>

          {/* Branches & Locations */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white mb-4">فروع صيدلية د. مؤمن</h4>
            <div className="space-y-3 text-xs">
              {PHARMACY_INFO.branches.map((b, i) => (
                <div key={i} className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <div className="flex items-center justify-between text-slate-200 font-bold mb-1">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      {b.name}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-normal">{b.hours}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] ps-5">{b.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} صيدلية د. مؤمن. جميع الحقوق محفوظة لجمهورية مصر العربية.</p>

          <div className="flex items-center gap-4">
            <span>طرق الدفع المعتمدة: كاش عند الاستلام · فيزا · ماستركارد · ميزة · فودافون كاش · إنستاباي</span>
            <button
              onClick={onScrollToTop}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
              aria-label="العودة لأعلى الصفحة"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>للأعلى</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
