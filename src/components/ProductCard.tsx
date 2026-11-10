import React, { useState } from 'react';
import { Heart, ShoppingBag, Star, Eye, Check } from 'lucide-react';
import { Product, formatCFA } from '../data/products';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onQuickView: (product: Product) => void;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  compact = false,
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Noir Onyx');
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[Math.min(1, product.sizes.length - 1)] || product.sizes[0];
    onAddToCart(product, defaultSize, selectedColor);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div
      className="group flex flex-col cursor-pointer min-w-0 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onQuickView(product)}
    >
      {/* Studio Image Frame (ELEVN & FORMA style) */}
      <div
        className={`relative w-full ${
          compact ? 'aspect-[4/4.6]' : 'aspect-[4/4.8]'
        } rounded-2xl bg-[#E6E3DC] overflow-hidden mb-3.5 transition-all duration-500 shadow-[0_2px_10px_rgba(0,0,0,0.03)] group-hover:shadow-[0_14px_30px_rgba(0,0,0,0.08)]`}
      >
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle vignette overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges (FORMA & Mixtas style) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span
              className={`px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full backdrop-blur-md ${
                product.badge === 'PROMO'
                  ? 'bg-[#9E2A2B] text-white'
                  : product.badge === 'ÉDITION LIMITÉE'
                  ? 'bg-[#111111] text-[#E8D3B9] border border-[#E8D3B9]/30'
                  : product.badge === 'NOUVEAU'
                  ? 'bg-white/95 text-[#111111]'
                  : 'bg-[#111111]/90 text-white'
              }`}
            >
              {product.badge}
              {product.discountPercent ? ` ${product.discountPercent}%` : ''}
            </span>
          )}
        </div>

        {/* Top Right Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          aria-label="Ajouter aux favoris"
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
            isWishlisted
              ? 'bg-[#111111] text-white shadow-md scale-105'
              : 'bg-white/85 text-[#111111] hover:bg-white shadow-sm'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-red-400' : ''}`} />
        </button>

        {/* Quick Sizes Pill Bar on Hover */}
        <div className="absolute bottom-3 left-3 right-3 z-10 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl shadow-sm overflow-hidden max-w-[78%]">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 mr-1 shrink-0">
              {product.category === 'Chaussures' ? 'Pointures:' : 'Tailles:'}
            </span>
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {product.sizes.slice(0, 5).map((sz) => (
                <span
                  key={sz}
                  className="text-[11px] font-semibold text-neutral-900 px-1.5 py-0.5 rounded bg-neutral-100"
                >
                  {sz}
                </span>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            title="Aperçu rapide"
            className="w-8 h-8 rounded-xl bg-white/95 text-neutral-900 flex items-center justify-center shadow-sm hover:bg-black hover:text-white transition-colors shrink-0"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Details (ELEVN + Guza + FORMA synthesis) */}
      <div className="flex items-start justify-between gap-2 px-0.5">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500 mb-0.5">
            {product.subCategory}
          </div>
          <h3 className="text-sm sm:text-[15px] font-semibold text-neutral-900 truncate group-hover:text-neutral-700 transition-colors">
            {product.name}
          </h3>

          {/* Price in FCFA */}
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mt-1">
            <span className="text-sm sm:text-[15px] font-bold text-[#111111]">
              {formatCFA(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                {formatCFA(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Rating + Color Swatches Row */}
          <div className="flex items-center justify-between gap-2 mt-2">
            {/* Color Swatches (Guza & FORMA style) */}
            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              {product.colors.map((swatch) => {
                const active = selectedColor === swatch.name;
                return (
                  <button
                    key={swatch.name}
                    type="button"
                    title={swatch.name}
                    onClick={() => setSelectedColor(swatch.name)}
                    className={`w-3.5 h-3.5 rounded-full transition-transform ${
                      active
                        ? 'ring-2 ring-offset-2 ring-[#111111] scale-110'
                        : 'ring-1 ring-black/15 hover:scale-110'
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                  />
                );
              })}
            </div>

            {/* Star rating (ELEVN style) */}
            <div className="flex items-center gap-1 text-[11px] text-neutral-500">
              <div className="flex items-center text-amber-500">
                <Star className="w-3 h-3 fill-current" />
              </div>
              <span className="font-semibold text-neutral-700">{product.rating.toFixed(1)}</span>
              <span>({product.reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* ELEVN-style Quick Add Bag Button */}
        <button
          type="button"
          onClick={handleQuickAdd}
          title="Ajouter au panier"
          className={`mt-1 w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-200 shrink-0 ${
            justAdded
              ? 'bg-emerald-700 border-emerald-700 text-white scale-105'
              : 'border-neutral-300 bg-white/80 text-neutral-800 hover:bg-[#111111] hover:border-[#111111] hover:text-white'
          }`}
        >
          {justAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
