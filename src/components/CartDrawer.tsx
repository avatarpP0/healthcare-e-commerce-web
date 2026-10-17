import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ShieldCheck, Tag, Check } from 'lucide-react';
import { CartItem } from '../types';
import { PHARMACY_INFO } from '../data/mockProducts';
import { ProductImage } from './ProductImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  onBrowseCatalog: () => void;
  appliedDiscount: number; // percentage, e.g. 10
  onApplyPromoCode: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onBrowseCatalog,
  appliedDiscount,
  onApplyPromoCode,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeDelivery = subtotal >= PHARMACY_INFO.freeDeliveryThreshold;
  const deliveryFee = subtotal === 0 ? 0 : isFreeDelivery ? 0 : PHARMACY_INFO.deliveryFee;
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const amountToFreeDelivery = Math.max(0, PHARMACY_INFO.freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / PHARMACY_INFO.freeDeliveryThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const success = onApplyPromoCode(promoInput.trim());
    if (success) {
      setPromoMessage({ text: 'تم تطبيق كود الخصم بنجاح (-10%)', isError: false });
    } else {
      setPromoMessage({ text: 'كود غير صحيح. جرب كود: MOAMEN10', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 end-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">سلة المشتريات</h3>
                <span className="text-xs text-slate-500">
                  {items.length === 0
                    ? 'السلة فارغة حالياً'
                    : `${items.reduce((acc, i) => acc + i.quantity, 0)} أصناف مضافة`}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && (
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
              <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
                {isFreeDelivery ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>مبروك! طلبيتك مؤهلة للشحن المبرد المجاني</span>
                  </span>
                ) : (
                  <span>
                    أضف بـ <strong className="font-mono text-sky-700 font-bold">{amountToFreeDelivery} ج.م</strong> إضافية للشحن المجاني
                  </span>
                )}
                <span className="font-mono text-slate-500 text-[11px]">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isFreeDelivery ? 'bg-emerald-500' : 'bg-sky-500'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">سلتك لا تحتوي على أي أدوية</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    تصفح تشكيلة الأدوية والفيتامينات أو استخدم ميزة رفع الروشتة لتجهيز علاجك.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onBrowseCatalog();
                  }}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  تصفح المنتجات الآن
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3 bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 flex items-center gap-3 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                    <ProductImage
                      src={item.product.image}
                      alt={item.product.name}
                      category={item.product.category}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {item.product.name}
                    </h5>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span>{item.product.dosageForm}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-sky-700 font-bold">
                        {item.product.price} ج.م
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-white rounded transition-colors cursor-pointer"
                          aria-label="إنقاص الكمية"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-white rounded transition-colors cursor-pointer"
                          aria-label="زيادة الكمية"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-slate-900">
                          {item.product.price * item.quantity} ج.م
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                          aria-label="حذف الصنف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Totals & Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="كود الخصم (جرب MOAMEN10)"
                    className="w-full h-9 ps-8 pe-3 bg-white border border-slate-200 rounded-lg text-xs font-mono uppercase focus:border-sky-500 outline-none"
                  />
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute inset-y-0 start-2.5 my-auto" />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  تطبيق
                </button>
              </form>

              {promoMessage && (
                <p
                  className={`text-[11px] ${
                    promoMessage.isError ? 'text-rose-600' : 'text-emerald-600 font-semibold'
                  }`}
                >
                  {promoMessage.text}
                </p>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200/80">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-800">
                    {subtotal} ج.م
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>رسوم التوصيل المبرد:</span>
                  <span className="font-mono tabular-nums font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold">مجاني</span>
                    ) : (
                      `${deliveryFee} ج.م`
                    )}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>خصم الكوبون ({appliedDiscount}%):</span>
                    <span className="font-mono tabular-nums">-{discountAmount} ج.م</span>
                  </div>
                )}

                <div className="flex justify-between text-sm sm:text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>الإجمالي الكلي:</span>
                  <span className="font-mono tabular-nums text-sky-800 font-bold">
                    {total} ج.م
                  </span>
                </div>
              </div>

              {/* Security badge */}
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>دفع آمن معتمد عند الاستلام أو بالبطاقات الإلكترونية.</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold text-sm rounded-xl shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>متابعة إتمام الطلب</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
