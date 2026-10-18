import React from 'react';

interface PharmacyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon-only';
  lightText?: boolean;
}

export const PharmacyLogo: React.FC<PharmacyLogoProps> = ({
  size = 'md',
  variant = 'full',
  lightText = false,
}) => {
  const iconSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-13 h-13',
  }[size];

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  const subtextSizeClasses = {
    sm: 'text-[10px]',
    md: 'text-[11px]',
    lg: 'text-xs',
  }[size];

  return (
    <div className="flex items-center gap-3 shrink-0 group">
      {/* SVG Icon Emblem */}
      <div
        className={`relative ${iconSizeClasses} rounded-2xl bg-gradient-to-tr from-sky-600 via-sky-500 to-teal-400 p-0.5 shadow-md shadow-sky-500/20 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-sky-500/30 transition-all duration-300 flex items-center justify-center`}
      >
        <svg
          viewBox="0 0 40 40"
          className="w-full h-full p-1.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Pharmacy Cross in Crisp White */}
          <rect x="16" y="8" width="8" height="24" rx="3" fill="#ffffff" />
          <rect x="8" y="16" width="24" height="8" rx="3" fill="#ffffff" />
          {/* Medical Heartbeat Emerald Line */}
          <circle cx="20" cy="20" r="3.5" fill="#10b981" />
          <path
            d="M13 20h3.5l1.5-3 2 6 2-4.5 1.5 1.5H27"
            stroke="#0284c7"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {variant === 'full' && (
        <div className="flex flex-col">
          <span
            className={`font-bold tracking-tight leading-tight transition-colors ${textSizeClasses} ${
              lightText ? 'text-white' : 'text-slate-900 group-hover:text-sky-600'
            }`}
          >
            صيدلية د. مؤمن
          </span>
          <span
            className={`font-medium tracking-wider font-mono ${subtextSizeClasses} ${
              lightText ? 'text-sky-300' : 'text-slate-500'
            }`}
          >
            DR. MOAMEN PHARMACY
          </span>
        </div>
      )}
    </div>
  );
};
