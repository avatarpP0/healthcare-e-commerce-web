import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, User, FileText, X, Plus, Sparkles, ChevronDown } from 'lucide-react';
import { Product } from '../types';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenPrescription: () => void;
  onOpenAccount: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  activeCategory: string;
  onSelectCategory: (catId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenPrescription,
  onOpenAccount,
  searchQuery,
  onSearchChange,
  products,
  onSelectProduct,
  activeCategory,
  onSelectCategory,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Filtered preview matches
  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.activeIngredients && p.activeIngredients.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  // Close search suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'all', label: 'الرئيسية' },
    { id: 'medicines', label: 'الأدوية' },
    { id: 'vitamins', label: 'الفيتامينات' },
    { id: 'skincare', label: 'العناية بالبشرة' },
    { id: 'devices', label: 'الأجهزة والمستلزمات' },
    { id: 'baby', label: 'الأم والطفل' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Bar */}
        <div className="flex items-center justify-between gap-4 md:gap-8 h-20">
          {/* Zone 1: Single element Brand wordmark with medical emblem */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-slate-900 whitespace-nowrap shrink-0 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <span className="font-bold text-xl leading-none">م</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                صيدلية د. مؤمن
              </span>
              <span className="text-[11px] text-slate-500 font-medium tracking-wide">
                DR. MOAMEN PHARMACY
              </span>
            </div>
          </a>

          {/* Central High-Visibility Search Bar */}
          <div ref={searchContainerRef} className="flex-1 max-w-xl relative hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="ابحث عن دواء، مادة فعالة، فيتامينات، أو مستحضرات عناية..."
                className="w-full h-11 ps-11 pe-10 bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-sm text-slate-800 placeholder:text-slate-400 rounded-xl border border-transparent focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all outline-none"
              />
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 end-0 flex items-center pe-3 text-slate-400 hover:text-slate-600"
                  aria-label="مسح البحث"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Search Suggestion Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-full start-0 end-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50">
                <div className="p-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>نتائج البحث المباشرة ({searchResults.length})</span>
                  <button
                    onClick={() => setIsSearchFocused(false)}
                    className="hover:text-slate-800 text-[11px]"
                  >
                    إغلاق
                  </button>
                </div>

                {searchResults.length > 0 ? (
                  <div className="divide-y divide-slate-50 max-h-80 overflow-y-auto">
                    {searchResults.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectProduct(item);
                          setIsSearchFocused(false);
                        }}
                        className="w-full px-4 py-3 text-start flex items-center gap-3 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-slate-100 shrink-0 overflow-hidden flex items-center justify-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate">
                            {item.name}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <span>{item.categoryLabel}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono text-sky-700 font-bold">{item.price} ج.م</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-sm text-slate-500">
                    لم نجد نتائج مطابقة لـ &quot;{searchQuery}&quot;. يمكنك رفع الروشتة لتوفير الدواء لك فوراً.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Zone 3: Actions (Prescription CTA + Account + Cart) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Upload Prescription Button */}
            <button
              onClick={onOpenPrescription}
              className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="hidden sm:inline">ارفع روشتتك</span>
              <span className="sm:hidden">روشتة</span>
            </button>

            {/* Account Status / Profile */}
            <button
              onClick={onOpenAccount}
              className="p-2 sm:px-3 sm:py-2 flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer text-xs sm:text-sm font-medium whitespace-nowrap"
              title="حسابي"
            >
              <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                م
              </div>
              <span className="hidden lg:inline text-slate-800">حسابي</span>
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-xs transition-colors cursor-pointer whitespace-nowrap"
              aria-label="سلة المشتريات"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline font-bold">السلة</span>
              {cartCount > 0 && (
                <span className="min-w-5 h-5 px-1.5 rounded-full bg-white text-sky-700 text-xs font-bold font-mono flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
              {cartTotal > 0 && (
                <span className="hidden md:inline font-mono font-bold text-xs border-s border-sky-400/50 ps-2">
                  {cartTotal} ج.م
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث عن أدوية، فيتامينات، مستحضرات..."
              className="w-full h-10 ps-10 pe-9 bg-slate-100 text-xs text-slate-800 rounded-lg border border-transparent focus:border-sky-500 focus:bg-white outline-none"
            />
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 text-slate-400">
              <Search className="w-3.5 h-3.5" />
            </div>
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 end-0 flex items-center pe-3 text-slate-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Categories Bar Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 scrollbar-none border-t border-slate-100 text-xs sm:text-sm">
          {navLinks.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
          <div className="ms-auto flex items-center gap-4 text-xs text-slate-500 shrink-0 ps-3">
            <span className="hidden md:inline">استشارة مجانية مع الصيدلي طوال اليوم</span>
          </div>
        </nav>
      </div>
    </header>
  );
};
