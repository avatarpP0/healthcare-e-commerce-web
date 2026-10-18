import React from 'react';
import { Phone, Clock, Truck, MessageCircle, ShieldCheck } from 'lucide-react';
import { PHARMACY_INFO } from '../data/mockProducts';

interface TopUtilityBarProps {
  onOpenConsultation: () => void;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({ onOpenConsultation }) => {
  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
        {/* Contact info & hours */}
        <div className="flex items-center flex-wrap gap-4 text-slate-300">
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5 text-sky-400" />
            <span>الخط الساخن:</span>
            <span className="font-mono font-bold tracking-wider text-sky-400">{PHARMACY_INFO.phone}</span>
          </div>

          <span className="hidden sm:inline text-slate-700">|</span>

          <a
            href="https://wa.me/201149556339"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            <span>واتساب:</span>
            <span className="font-mono font-bold tracking-wider text-emerald-400">01149556339</span>
          </a>

          <span className="hidden md:inline text-slate-700">|</span>

          <div className="hidden md:flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>{PHARMACY_INFO.licenseNumber}</span>
          </div>
        </div>

        {/* Free shipping & Quick Pharmacist Chat & Developer Credit */}
        <div className="flex items-center gap-3 sm:gap-4 me-auto sm:me-0 flex-wrap">
          <div className="hidden lg:flex items-center gap-1.5 text-sky-300 bg-sky-950/70 border border-sky-800/80 px-2.5 py-0.5 rounded-lg font-medium text-[11px]">
            <span>صنع بواسطة المبرمج محمد تامر</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-400">
            <Truck className="w-3.5 h-3.5" />
            <span>شحن مجاني للطلبات فوق {PHARMACY_INFO.freeDeliveryThreshold} ج.م</span>
          </div>

          <span className="text-slate-700 hidden sm:inline">|</span>

          <button
            onClick={onOpenConsultation}
            className="flex items-center gap-1.5 text-sky-300 hover:text-sky-200 font-medium transition-colors cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>استشارة صيدلي فورية</span>
          </button>
        </div>
      </div>
    </div>
  );
};
