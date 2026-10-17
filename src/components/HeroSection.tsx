import React from 'react';
import { ArrowDown, Upload, ShieldCheck, Zap, Stethoscope, CreditCard } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockProducts';

interface HeroSectionProps {
  onScrollToCatalog: () => void;
  onScrollToPrescription: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToCatalog,
  onScrollToPrescription,
}) => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200">
      {/* Background ambient medical glow */}
      <div className="absolute top-0 end-1/4 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 start-10 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left / Start column (Text & CTAs) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Pharmacy Credential Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 mb-3 tracking-wide">
              <span>صيدلية معتمدة</span>
              <span aria-hidden="true">·</span>
              <span>إشراف طبي وصيدلاني مباشر</span>
              <span aria-hidden="true">·</span>
              <span>ترخيص وزارة الصحة</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.25] tracking-tight mb-4" style={{ textWrap: 'balance' }}>
              رعايتكم الصحية تبدأ بخطوة موثوقة مع{' '}
              <span className="text-sky-600 inline-block">صيدلية د. مؤمن</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
              نوفر جميع الأدوية الأصلية، الفيتامينات العالمية، ومستحضرات العناية الطبية، مع إمكانية رفع الروشتة للمراجعة الفورية وتوصيل دوائي مبرد وسريع حتى باب منزلك.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onScrollToCatalog}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-semibold text-sm sm:text-base rounded-xl shadow-md shadow-sky-600/20 transition-all cursor-pointer"
              >
                <span>تصفح صيدلية الأدوية</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToPrescription}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold text-sm sm:text-base rounded-xl transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4 text-emerald-600" />
                <span>رفع الروشتة الطبية</span>
              </button>
            </div>

            {/* Delivery & Assurance Subtext */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-800">توصيل آمن:</span>
                <span>حقائب نقل مبردة لحفظ الأدوية الحساسة</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-800">الضمان:</span>
                <span>فواتير ضريبية وأرقام تشغيلات مصنعية</span>
              </div>
            </div>
          </div>

          {/* Right / End column (Hero Photography) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-xl shadow-slate-200/50 bg-slate-100 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
              <img
                src={HERO_IMAGE}
                alt="فريق صيدلية د. مؤمن في الصيدلية مع مريض"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {/* Subtle glass reassurance overlay card */}
              <div className="absolute bottom-4 start-4 end-4 p-3.5 bg-white/95 backdrop-blur-md rounded-xl border border-white/60 shadow-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">مراجعة صيدلانية دقيقة</p>
                    <p className="text-slate-500 text-[11px]">مراجعة التداخلات الدوائية والجرعات مجاناً</p>
                  </div>
                </div>
                <div className="text-end font-mono text-[11px] font-semibold text-sky-700">
                  فريق د. مؤمن
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Reassuring Trust Indicators Strip */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50/70 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">أدوية أصلية 100%</h4>
              <p className="text-xs text-slate-500 mt-0.5">مباشرة من كبرى شركات ومستودعات الأدوية المعتمدة</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50/70 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">توصيل سريع ومبرد</h4>
              <p className="text-xs text-slate-500 mt-0.5">خلال 30 إلى 60 دقيقة في جميع مناطق التغطية</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50/70 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">استشارة صيدلي 24/7</h4>
              <p className="text-xs text-slate-500 mt-0.5">إجابة فورية عن الجرعات والبدائل الدوائية</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50/70 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">دفع آمن ومتعدد</h4>
              <p className="text-xs text-slate-500 mt-0.5">الدفع عند الاستلام، بطاقات بنكية، ومحافظ كاش</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
