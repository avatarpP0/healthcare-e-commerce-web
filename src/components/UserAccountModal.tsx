import React, { useState } from 'react';
import { X, User, MapPin, FileText, Package, Bell, Check, Phone } from 'lucide-react';
import { PrescriptionSubmission, OrderConfirmation } from '../types';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentPrescriptions: PrescriptionSubmission[];
  recentOrders: OrderConfirmation[];
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  isOpen,
  onClose,
  recentPrescriptions,
  recentOrders,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'prescriptions' | 'orders'>('profile');
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-8">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
              م
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">ملف المريض والحساب الشخصي</h3>
              <p className="text-xs text-slate-500">صيدلية د. مؤمن · سجل الرعاية الصحية</p>
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

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-100 px-6 pt-3 gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            البيانات والعناوين
          </button>
          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'prescriptions'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>روشتاتي الطبية</span>
            {recentPrescriptions.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] flex items-center justify-center font-mono">
                {recentPrescriptions.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>الطلبات السابقة</span>
            {recentOrders.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-800 text-[10px] flex items-center justify-center font-mono">
                {recentOrders.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 space-y-4">
          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                  <span className="font-bold text-slate-900">المريض المسجل</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                    حساب موثق
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-slate-600">
                  <div>
                    <span className="text-slate-400 block text-[11px]">الاسم:</span>
                    <span className="font-bold text-slate-800">أحمد محمد الشريف</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">الهاتف:</span>
                    <span className="font-bold text-slate-800 font-mono">01098765432</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block text-[11px]">العنوان المعتمد:</span>
                    <span className="text-slate-800 font-medium">
                      الدقي، شارع التحرير، عمارة 15، الدور الرابع، شقة 8
                    </span>
                  </div>
                </div>
              </div>

              {/* Medication Reminder Toggle */}
              <div className="p-4 bg-sky-50/60 border border-sky-100 rounded-2xl flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <Bell className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      خدمة التذكير الدوري بالأدوية المزمنة
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      رسالة واتساب تذكيرية قبل نفاد عبوات الأدوية الشهرية بـ 3 أيام.
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={remindersEnabled}
                  onChange={(e) => setRemindersEnabled(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500 w-5 h-5 cursor-pointer"
                />
              </div>
            </div>
          )}

          {activeTab === 'prescriptions' && (
            <div className="space-y-3 text-xs">
              {recentPrescriptions.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p>لا توجد روشتات مسجلة بعد.</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    يمكنك رفع الروشتة في أي وقت من زر &quot;ارفع روشتتك&quot; في الصفحة الرئيسية.
                  </p>
                </div>
              ) : (
                recentPrescriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sky-800 text-xs">
                          {sub.ticketNumber}
                        </span>
                        <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                          قيد المراجعة
                        </span>
                      </div>
                      <p className="text-slate-700 font-semibold mt-1">{sub.fileName}</p>
                      <p className="text-[11px] text-slate-400">بتاريخ: {sub.submittedAt}</p>
                    </div>

                    <a
                      href={`https://wa.me/201149556339?text=استفسار%20عن%20الروشتة%20${sub.ticketNumber}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-sky-600 hover:text-sky-700 font-bold p-2 cursor-pointer"
                    >
                      متابعة (01149556339)
                    </a>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-3 text-xs">
              {recentOrders.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p>لا توجد طلبات سابقة حتى الآن.</p>
                </div>
              ) : (
                recentOrders.map((ord) => (
                  <div
                    key={ord.orderNumber}
                    className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-900">{ord.orderNumber}</span>
                      <span className="text-[11px] text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md font-semibold">
                        جاري التوصيل
                      </span>
                    </div>
                    <div className="text-slate-600 text-[11px]">
                      <span>{ord.items.length} أصناف</span>
                      <span className="mx-2">·</span>
                      <span className="font-mono font-bold text-slate-900">{ord.total} ج.م</span>
                      <span className="mx-2">·</span>
                      <span>{ord.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
