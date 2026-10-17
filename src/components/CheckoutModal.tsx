import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Banknote, CreditCard, Smartphone, AlertTriangle, ArrowRight, Truck } from 'lucide-react';
import { CartItem, PaymentMethod, OrderConfirmation } from '../types';
import { PHARMACY_INFO } from '../data/mockProducts';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  onOrderCompleted: (order: OrderConfirmation) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  deliveryFee,
  discount,
  total,
  onOrderCompleted,
}) => {
  const [customerName, setCustomerName] = useState('أحمد محمد الشريف');
  const [phoneNumber, setPhoneNumber] = useState('01098765432');
  const [district, setDistrict] = useState('الدقي');
  const [streetAddress, setStreetAddress] = useState('شارع التحرير، عمارة 15، الدور الرابع، شقة 8');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);

  if (!isOpen) return null;

  const hasRxItem = items.some((i) => i.product.requiresPrescription);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderNum = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
      const newOrder: OrderConfirmation = {
        orderNumber: orderNum,
        date: new Date().toLocaleDateString('ar-EG', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        items,
        subtotal,
        deliveryFee,
        discount,
        total,
        paymentMethod,
        customerName,
        phoneNumber,
        shippingAddress: `${district} - ${streetAddress}`,
      };

      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
      onOrderCompleted(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-8">
        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {confirmedOrder ? 'تأكيد استلام الطلب' : 'إتمام الشراء وتوصيل الأدوية'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {confirmedOrder
                ? 'شكراً لثقتكم في صيدلية د. مؤمن'
                : 'خدمة التوصيل المنزلي المبرد والسريع (خلال 30-60 دقيقة)'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-xl transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedOrder ? (
          /* Success Screen */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900">
                تم تأكيد طلبك بنجاح!
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                رقم الطلب:{' '}
                <span className="font-mono font-bold text-sky-700">
                  {confirmedOrder.orderNumber}
                </span>
              </p>
            </div>

            {/* Delivery Status Card */}
            <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-sky-950">
                  جارٍ تحضير الأدوية في الصيدلية الآن
                </p>
                <p className="text-sky-700 mt-0.5">
                  المندوب سيصل إلى {confirmedOrder.shippingAddress} خلال 45 دقيقة.
                </p>
              </div>
            </div>

            {/* Receipt Summary */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2.5">
              <div className="flex justify-between pb-2 border-b border-slate-200/80 font-bold text-slate-900">
                <span>الأصناف ({confirmedOrder.items.length})</span>
                <span>المجموع</span>
              </div>
              {confirmedOrder.items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-slate-700">
                  <span className="truncate max-w-[280px]">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-mono">{item.product.price * item.quantity} ج.م</span>
                </div>
              ))}

              <div className="pt-2 border-t border-slate-200/80 flex justify-between font-bold text-slate-900 text-sm">
                <span>المبلغ الإجمالي المستحق:</span>
                <span className="font-mono text-sky-800">{confirmedOrder.total} ج.م</span>
              </div>
              <div className="text-slate-500 text-[11px] pt-1">
                طريقة الدفع المختارة:{' '}
                <span className="font-semibold text-slate-700">
                  {confirmedOrder.paymentMethod === 'cash'
                    ? 'الدفع نقداً عند الاستلام'
                    : confirmedOrder.paymentMethod === 'card'
                    ? 'بطاقة دفع إلكترونية'
                    : 'محفظة إلكترونية (فودافون كاش / إنستاباي)'}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                العودة للتسوق والمتابعة
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            {/* Prescription Warning if applicable */}
            {hasRxItem && (
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">ملاحظة أدوية تتطلب روشتة:</span>
                  <span>
                    سلتك تحتوي على أدوية تستلزم وصفة طبية (Rx). سيطلب الصيدلي أو المندوب الاطلاع على الروشتة أو يمكنك تأكيدها هاتفياً مع صيدلي الفرع.
                  </span>
                </div>
              </div>
            )}

            {/* Recipient Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                1. بيانات المستلم وعنوان التوصيل
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    الاسم بالكامل
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-sky-500 focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    رقم الهاتف المحمول
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-sky-500 focus:bg-white outline-none font-mono text-end"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    المنطقة / الحي
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-sky-500 focus:bg-white outline-none"
                  >
                    <option value="الدقي">الدقي</option>
                    <option value="المهندسين">المهندسين</option>
                    <option value="العجوزة">العجوزة</option>
                    <option value="الزمالك">الزمالك</option>
                    <option value="التجمع الخامس">التجمع الخامس</option>
                    <option value="مدينة نصر">مدينة نصر</option>
                    <option value="المعادي">المعادي</option>
                    <option value="الشيخ زايد">الشيخ زايد</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    العنوان التفصيلي (الشارع، رقم العمارة، الشقة)
                  </label>
                  <input
                    type="text"
                    required
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-sky-500 focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  ملاحظات المندوب (اختياري)
                </label>
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="مثال: يرجى عدم الاتصال بالهاتف بعد 10 مساءً، تسليم الأدوية لأمن العمارة"
                  className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-sky-500 focus:bg-white outline-none"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                2. طريقة الدفع المفضلة
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-3.5 rounded-xl border text-start flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'cash'
                      ? 'border-sky-500 bg-sky-50/70 ring-2 ring-sky-200'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-emerald-600 mb-2" />
                  <span className="text-xs font-bold text-slate-900 block">الدفع عند الاستلام</span>
                  <span className="text-[11px] text-slate-500">كاش للمندوب بعد استلام الفاتورة</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-xl border text-start flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-sky-500 bg-sky-50/70 ring-2 ring-sky-200'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-sky-600 mb-2" />
                  <span className="text-xs font-bold text-slate-900 block">بطاقة بنكية / فيزا</span>
                  <span className="text-[11px] text-slate-500">جهاز POS مع المندوب أو إلكترونياً</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-3.5 rounded-xl border text-start flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'wallet'
                      ? 'border-sky-500 bg-sky-50/70 ring-2 ring-sky-200'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-purple-600 mb-2" />
                  <span className="text-xs font-bold text-slate-900 block">محفظة كاش / إنستاباي</span>
                  <span className="text-[11px] text-slate-500">فودافون كاش أو تحويل InstaPay</span>
                </button>
              </div>
            </div>

            {/* Total Review & Submit Button */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500 block">إجمالي المبلغ المطلوب دفعه:</span>
                <span className="text-xl font-extrabold font-mono text-sky-800 tabular-nums">
                  {total} ج.م
                </span>
                {deliveryFee === 0 && (
                  <span className="text-[11px] text-emerald-600 font-semibold block">
                    (يشمل الشحن المجاني)
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-3 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                >
                  تعديل السلة
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>جاري إرسال الطلب...</span>
                    </>
                  ) : (
                    <>
                      <span>تأكيد الطلب الآن</span>
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
