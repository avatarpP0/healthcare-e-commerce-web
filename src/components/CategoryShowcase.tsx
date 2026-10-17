import React from 'react';
import { Pill, Sparkles, HeartPulse, Activity, Baby, ArrowUpLeft } from 'lucide-react';
import { PHARMACY_CATEGORIES } from '../data/mockProducts';

interface CategoryShowcaseProps {
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getCategoryMeta = (id: string) => {
    switch (id) {
      case 'medicines':
        return {
          icon: Pill,
          color: 'text-sky-600 bg-sky-50 border-sky-100 hover:border-sky-300',
          desc: 'مسكنات، مضادات حيوية، وأدوية الأمراض المزمنة',
        };
      case 'vitamins':
        return {
          icon: Sparkles,
          color: 'text-amber-600 bg-amber-50 border-amber-100 hover:border-amber-300',
          desc: 'معادن، أوميجا 3، ومكملات المناعة والنشاط',
        };
      case 'skincare':
        return {
          icon: HeartPulse,
          color: 'text-emerald-600 bg-emerald-50 border-emerald-100 hover:border-emerald-300',
          desc: 'سيرومات علاجية، مرطبات وواقيات شمس طبية',
        };
      case 'devices':
        return {
          icon: Activity,
          color: 'text-blue-600 bg-blue-50 border-blue-100 hover:border-blue-300',
          desc: 'أجهزة قياس الضغط، السكر، والحرارة المعايرة',
        };
      case 'baby':
        return {
          icon: Baby,
          color: 'text-pink-600 bg-pink-50 border-pink-100 hover:border-pink-300',
          desc: 'حليب أطفال، حفاضات، ومستحضرات استحمام لطيفة',
        };
      default:
        return {
          icon: Pill,
          color: 'text-slate-600 bg-slate-50 border-slate-100 hover:border-slate-300',
          desc: 'كافة الأقسام والمستلزمات المتاحة',
        };
    }
  };

  const showcaseCategories = PHARMACY_CATEGORIES.filter((c) => c.id !== 'all');

  return (
    <section className="py-10 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-semibold text-sky-700 block mb-1">
              أقسام الصيدلية المتخصصة
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              تصفح حسب الاحتياج الصحي
            </h3>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
          >
            <span>عرض جميع المنتجات ({PHARMACY_CATEGORIES[0].count})</span>
            <ArrowUpLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {showcaseCategories.map((cat) => {
            const meta = getCategoryMeta(cat.id);
            const Icon = meta.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-4 rounded-2xl border text-start flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50/70 ring-2 ring-sky-200 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 border ${meta.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {cat.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {meta.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>{cat.count} صنف</span>
                  <span className="text-sky-600 font-sans font-semibold">تصفح ←</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
