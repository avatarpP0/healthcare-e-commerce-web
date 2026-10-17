import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, AlertCircle, ShieldCheck, Check, MessageSquare } from 'lucide-react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenConsultation: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenConsultation,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 z-10 p-2 text-slate-400 hover:text-slate-700 bg-white/80 hover:bg-white rounded-xl shadow-xs transition-colors cursor-pointer"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Product Media Column */}
          <div className="md:col-span-5 bg-slate-50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-e border-slate-100">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-xs border border-slate-100">
              <ProductImage
                src={product.image}
                alt={product.name}
                category={product.category}
                className="w-full h-full"
              />
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200/60 text-xs text-slate-500 space-y-1.5">
              <div className="flex justify-between">
                <span>كود الصنف (SKU):</span>
                <span className="font-mono text-slate-700 font-bold">{product.sku}</span>
              </div>
              <div className="flex justify-between">
                <span>الشركة المصنعة:</span>
                <span className="font-semibold text-slate-700">{product.brand}</span>
              </div>
              <div className="flex justify-between">
                <span>حالة المخزون:</span>
                <span className="text-emerald-700 font-bold">متوفر في صيدلية د. مؤمن</span>
              </div>
            </div>
          </div>

          {/* Product Details & Actions Column */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Badge */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span className="font-semibold text-sky-700">{product.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{product.brand}</span>
                {product.requiresPrescription && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-700 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      روشتة مطلوبة
                    </span>
                  </>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {product.name}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5" dir="ltr">
                {product.nameEn}
              </p>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold font-mono text-sky-800 tabular-nums">
                  {product.price}
                </span>
                <span className="text-xs font-semibold text-slate-600">ج.م</span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through font-mono">
                    {product.originalPrice} ج.م
                  </span>
                )}
              </div>

              {/* Dosage Form & Strength */}
              <div className="mt-2 text-xs text-slate-600 font-medium">
                الشكل الدوائي: <span className="text-slate-900">{product.dosageForm}</span>
                {product.strength && <span> ({product.strength})</span>}
              </div>

              {/* Clinical Description */}
              <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Active Ingredients & Instructions */}
              <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-2">
                {product.activeIngredients && (
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">المادة الفعالة:</span>
                    <span className="text-slate-700 font-mono">{product.activeIngredients}</span>
                  </div>
                )}

                {product.usageDirections && (
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">طريقة الاستعمال والجرعة:</span>
                    <span className="text-slate-600">{product.usageDirections}</span>
                  </div>
                )}

                {product.warnings && (
                  <div className="pt-1 text-amber-800">
                    <span className="font-bold block mb-0.5">تنبيهات هامة:</span>
                    <span>{product.warnings}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity and Add to Cart Action */}
            <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 font-medium">الكمية:</span>
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      aria-label="إنقاص"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-mono font-bold text-xs text-slate-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      aria-label="زيادة"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-end">
                  <span className="text-[11px] text-slate-400 block">الإجمالي</span>
                  <span className="text-base font-bold font-mono text-slate-900">
                    {product.price * quantity} ج.م
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white shadow-md shadow-sky-600/20'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>تمت الإضافة للسلة</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>إضافة {quantity > 1 ? `(${quantity}) ` : ''}إلى السلة</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenConsultation(product.name);
                  }}
                  className="px-3.5 py-3 border border-slate-200 text-slate-700 hover:text-sky-700 hover:bg-sky-50 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="استشر الصيدلي بخصوص هذا الدواء"
                >
                  <MessageSquare className="w-4 h-4 text-sky-600" />
                  <span className="hidden sm:inline">استشر الصيدلي</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
