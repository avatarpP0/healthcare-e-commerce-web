import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, RotateCcw, Search, ChevronDown, Check } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { PHARMACY_CATEGORIES } from '../data/mockProducts';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onViewDetails: (product: Product) => void;
  cartItemsMap: Record<string, number>;
  searchQuery: string;
  onClearSearch: () => void;
  onRequestMedicine?: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onViewDetails,
  cartItemsMap,
  searchQuery,
  onClearSearch,
  onRequestMedicine,
}) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [prescriptionFilter, setPrescriptionFilter] = useState<'all' | 'otc' | 'rx'>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }

        // Search Query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = item.name.toLowerCase().includes(q);
          const matchNameEn = item.nameEn.toLowerCase().includes(q);
          const matchBrand = item.brand.toLowerCase().includes(q);
          const matchIngredients = item.activeIngredients?.toLowerCase().includes(q);
          if (!matchName && !matchNameEn && !matchBrand && !matchIngredients) {
            return false;
          }
        }

        // Prescription Filter
        if (prescriptionFilter === 'otc' && item.requiresPrescription) return false;
        if (prescriptionFilter === 'rx' && !item.requiresPrescription) return false;

        // Stock filter
        if (inStockOnly && !item.inStock) return false;

        // Price range
        if (selectedPriceRange === 'under-100' && item.price >= 100) return false;
        if (selectedPriceRange === '100-300' && (item.price < 100 || item.price > 300)) return false;
        if (selectedPriceRange === '300-600' && (item.price < 300 || item.price > 600)) return false;
        if (selectedPriceRange === 'over-600' && item.price <= 600) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default popular (reviewCount)
        return b.reviewCount - a.reviewCount;
      });
  }, [products, selectedCategory, searchQuery, prescriptionFilter, inStockOnly, selectedPriceRange, sortBy]);

  const resetFilters = () => {
    onSelectCategory('all');
    setSelectedPriceRange('all');
    setPrescriptionFilter('all');
    setInStockOnly(false);
    setSortBy('popular');
    onClearSearch();
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedPriceRange !== 'all' ||
    prescriptionFilter !== 'all' ||
    inStockOnly ||
    searchQuery.trim().length > 0;

  return (
    <section id="catalog-section" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 mb-1">
              <span>كتالوج الأدوية والمستلزمات</span>
              <span aria-hidden="true">·</span>
              <span>منتجات مسجلة رسمياً</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              صيدلية الأدوية والمستحضرات الطبية
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              اختر من بين تشكيلتنا المتكاملة من الأدوية، الفيتامينات، ومستحضرات العناية المصرحة.
            </p>
          </div>

          {/* Quick Sort Dropdown, Request Medicine & Mobile filter button */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {onRequestMedicine && (
              <button
                onClick={onRequestMedicine}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-2xs"
              >
                <span>طلب دواء غير متوفر</span>
              </button>
            )}

            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-xs cursor-pointer"
            >
              <Filter className="w-4 h-4 text-sky-600" />
              <span>التصفية والخيارات</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-sky-600" />
              )}
            </button>

            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-xs text-xs font-medium text-slate-700">
              <span className="text-slate-500 whitespace-nowrap">الترتيب:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="ترتيب المنتجات"
                className="bg-transparent border-none text-slate-800 font-semibold focus:outline-none cursor-pointer pe-2"
              >
                <option value="popular">الأكثر طلباً وشعبية</option>
                <option value="price-asc">السعر: من الأقل إلى الأعلى</option>
                <option value="price-desc">السعر: من الأعلى إلى الأقل</option>
                <option value="rating">الأعلى تقييماً</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Grid: Sidebar Filters + Products List */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs sticky top-28 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <SlidersHorizontal className="w-4 h-4 text-sky-600" />
                <span>تصفية النتائج</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>إعادة ضبط</span>
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                الأقسام والخدمات
              </h4>
              <div className="space-y-1">
                {PHARMACY_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => onSelectCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-sky-50 text-sky-800 font-semibold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="font-mono text-[11px] text-slate-400">
                        {cat.id === 'all'
                          ? products.length
                          : products.filter((p) => p.category === cat.id).length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Prescription Requirement Filter */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                نوع الوصفة الطبية
              </h4>
              <div className="space-y-1.5 text-xs text-slate-700">
                <label className="flex items-center gap-2.5 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50">
                  <input
                    type="radio"
                    name="prescription"
                    checked={prescriptionFilter === 'all'}
                    onChange={() => setPrescriptionFilter('all')}
                    className="text-sky-600 focus:ring-sky-500"
                  />
                  <span>جميع الأصناف</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50">
                  <input
                    type="radio"
                    name="prescription"
                    checked={prescriptionFilter === 'otc'}
                    onChange={() => setPrescriptionFilter('otc')}
                    className="text-sky-600 focus:ring-sky-500"
                  />
                  <span>بدون وصفة طبية (OTC)</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50">
                  <input
                    type="radio"
                    name="prescription"
                    checked={prescriptionFilter === 'rx'}
                    onChange={() => setPrescriptionFilter('rx')}
                    className="text-sky-600 focus:ring-sky-500"
                  />
                  <span>أدوية تتطلب روشتة (Rx)</span>
                </label>
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                النطاق السعري
              </h4>
              <div className="space-y-1.5 text-xs text-slate-700">
                {[
                  { id: 'all', label: 'جميع الأسعار' },
                  { id: 'under-100', label: 'أقل من 100 ج.م' },
                  { id: '100-300', label: 'من 100 إلى 300 ج.م' },
                  { id: '300-600', label: 'من 300 إلى 600 ج.م' },
                  { id: 'over-600', label: 'أكثر من 600 ج.م' },
                ].map((tier) => (
                  <label
                    key={tier.id}
                    className="flex items-center gap-2.5 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50"
                  >
                    <input
                      type="radio"
                      name="price-tier"
                      checked={selectedPriceRange === tier.id}
                      onChange={() => setSelectedPriceRange(tier.id)}
                      className="text-sky-600 focus:ring-sky-500"
                    />
                    <span>{tier.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stock Availability */}
            <div className="pt-4 border-t border-slate-100">
              <label className="flex items-center justify-between cursor-pointer p-1 text-xs font-medium text-slate-800">
                <span>المتوفر بالمخزون فقط</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4"
                />
              </label>
            </div>
          </aside>

          {/* Mobile Filter Drawer / Overlay */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <div
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
                onClick={() => setIsMobileFilterOpen(false)}
              />
              <div className="relative ms-auto w-full max-w-xs bg-white h-full p-5 overflow-y-auto z-10 flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="font-bold text-slate-900 text-sm">تصفية المنتجات</span>
                    <button
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="text-xs text-slate-500 hover:text-slate-800 p-1"
                    >
                      إغلاق
                    </button>
                  </div>

                  {/* Mobile Categories */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-2">الأقسام</h4>
                    <div className="space-y-1">
                      {PHARMACY_CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            onSelectCategory(cat.id);
                            setIsMobileFilterOpen(false);
                          }}
                          className={`w-full text-start px-3 py-2 rounded-lg text-xs ${
                            selectedCategory === cat.id
                              ? 'bg-sky-50 text-sky-700 font-bold'
                              : 'text-slate-700'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Tier */}
                  <div className="pt-3 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-slate-900 mb-2">النطاق السعري</h4>
                    <div className="space-y-2 text-xs">
                      {[
                        { id: 'all', label: 'الكل' },
                        { id: 'under-100', label: 'أقل من 100 ج.م' },
                        { id: '100-300', label: '100 - 300 ج.م' },
                        { id: '300-600', label: '300 - 600 ج.م' },
                        { id: 'over-600', label: 'أكثر من 600 ج.م' },
                      ].map((tier) => (
                        <button
                          key={tier.id}
                          onClick={() => setSelectedPriceRange(tier.id)}
                          className={`w-full text-start px-3 py-1.5 rounded-md ${
                            selectedPriceRange === tier.id
                              ? 'bg-slate-100 font-bold text-slate-900'
                              : 'text-slate-600'
                          }`}
                        >
                          {tier.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => {
                      resetFilters();
                      setIsMobileFilterOpen(false);
                    }}
                    className="flex-1 py-2.5 text-xs text-rose-600 border border-rose-200 rounded-xl font-medium"
                  >
                    إعادة ضبط
                  </button>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="flex-1 py-2.5 text-xs text-white bg-sky-600 rounded-xl font-bold"
                  >
                    تطبيق ({filteredProducts.length})
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products List & Status */}
          <div className="lg:col-span-3">
            {/* Active search or filter feedback bar */}
            {searchQuery.trim() && (
              <div className="mb-4 p-3 bg-sky-50 border border-sky-100 rounded-xl flex items-center justify-between text-xs text-sky-800">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-sky-600" />
                  <span>
                    نتائج البحث عن: <strong className="text-sky-950">&quot;{searchQuery}&quot;</strong> ({filteredProducts.length} منتج)
                  </span>
                </div>
                <button
                  onClick={onClearSearch}
                  className="font-medium text-sky-600 hover:text-sky-800 underline cursor-pointer"
                >
                  مسح البحث
                </button>
              </div>
            )}

            {/* Results count text */}
            <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
              <span>عرض {filteredProducts.length} من أصل {products.length} صنف متاح</span>
              {selectedCategory !== 'all' && (
                <span>
                  القسم المختار: {PHARMACY_CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                </span>
              )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onViewDetails={onViewDetails}
                    cartQuantity={cartItemsMap[product.id] || 0}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  لم نتمكن من العثور على أي صنف مطابق لتصفياتك
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mb-5">
                  جرب تغيير كلمات البحث أو إعادة ضبط خيارات التصفية، أو ارفع الروشتة وسنقوم بتوفير الدواء لك مباشرة.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    إعادة ضبط الفلاتر
                  </button>
                  {onRequestMedicine && (
                    <button
                      onClick={onRequestMedicine}
                      className="px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      طلب توفير هذا الصنف خصيصاً
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
