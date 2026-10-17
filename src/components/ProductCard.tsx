import React, { useState } from 'react';
import { ShoppingBag, Check, Eye, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity?: number) => void;
  onViewDetails: (product: Product) => void;
  cartQuantity?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  cartQuantity = 0,
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-sky-300 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Top Media Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
        <ProductImage
          src={product.image}
          alt={product.name}
          category={product.category}
          className="w-full h-full"
        />

        {/* Discount Tag */}
        {product.discountPercent && (
          <div className="absolute top-3 end-3 bg-rose-600 text-white text-[11px] font-bold font-mono px-2 py-0.5 rounded-md shadow-xs">
            خصم {product.discountPercent}%
          </div>
        )}

        {/* Prescription Requirement Tag */}
        {product.requiresPrescription && (
          <div className="absolute top-3 start-3 bg-amber-500/95 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            <span>روشتة</span>
          </div>
        )}

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-3 py-1.5 bg-white/95 text-slate-800 text-xs font-semibold rounded-lg shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            <span>تفاصيل الدواء</span>
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Category & Brand */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
            <span className="font-medium text-sky-700">{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.brand}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-sky-600 transition-colors">
            {product.name}
          </h3>

          {/* Strength / Form */}
          {product.strength && (
            <p className="text-xs text-slate-500 mt-1 font-mono">
              {product.dosageForm} · {product.strength}
            </p>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold font-mono tabular-nums text-slate-900">
                {product.price}
              </span>
              <span className="text-xs text-slate-600 font-medium">ج.م</span>
            </div>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through font-mono">
                {product.originalPrice} ج.م
              </span>
            )}
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleAdd}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              justAdded
                ? 'bg-emerald-600 text-white shadow-xs'
                : cartQuantity > 0
                ? 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200'
                : 'bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white shadow-xs'
            }`}
            aria-label={`إضافة ${product.name} إلى السلة`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>تمت الإضافة</span>
              </>
            ) : cartQuantity > 0 ? (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>في السلة ({cartQuantity})</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>إضافة للسلة</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
