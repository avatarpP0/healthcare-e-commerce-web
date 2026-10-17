import React, { useState } from 'react';
import { Pill, Sparkles, HeartPulse, Activity, Baby, ImageOff } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  category?: string;
  className?: string;
  aspectRatio?: 'square' | 'wide' | 'tall';
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  category = 'medicines',
  className = '',
  aspectRatio = 'square',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getCategoryIcon = () => {
    switch (category) {
      case 'medicines':
        return <Pill className="w-10 h-10 text-sky-500" strokeWidth={1.5} />;
      case 'vitamins':
        return <Sparkles className="w-10 h-10 text-amber-500" strokeWidth={1.5} />;
      case 'skincare':
        return <HeartPulse className="w-10 h-10 text-emerald-500" strokeWidth={1.5} />;
      case 'devices':
        return <Activity className="w-10 h-10 text-blue-600" strokeWidth={1.5} />;
      case 'baby':
        return <Baby className="w-10 h-10 text-pink-500" strokeWidth={1.5} />;
      default:
        return <ImageOff className="w-10 h-10 text-slate-400" strokeWidth={1.5} />;
    }
  };

  const getCategoryBg = () => {
    switch (category) {
      case 'medicines':
        return 'from-sky-50 to-blue-100/50';
      case 'vitamins':
        return 'from-amber-50 to-orange-100/50';
      case 'skincare':
        return 'from-emerald-50 to-teal-100/50';
      case 'devices':
        return 'from-slate-100 to-sky-100/50';
      case 'baby':
        return 'from-rose-50 to-pink-100/50';
      default:
        return 'from-slate-50 to-slate-100';
    }
  };

  return (
    <div className={`relative overflow-hidden bg-slate-50 flex items-center justify-center ${className}`}>
      {/* Loading Skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center">
          <span className="sr-only">جاري تحميل الصورة...</span>
        </div>
      )}

      {/* Styled Fallback Container if Error */}
      {hasError ? (
        <div className={`w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br ${getCategoryBg()}`}>
          <div className="p-3 bg-white/90 rounded-2xl shadow-xs border border-white/80">
            {getCategoryIcon()}
          </div>
          <span className="text-xs font-medium text-slate-600 mt-2 text-center line-clamp-1 max-w-[90%]">
            {alt}
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5">منتج صيدلاني معتمد</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}
    </div>
  );
};
