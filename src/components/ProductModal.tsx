import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RefreshCw,
  Check,
  Sparkles,
} from 'lucide-react';
import { Product, formatCFA } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  selectedCity: string;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  selectedCity,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[Math.min(1, product.sizes.length - 1)] || product.sizes[0]
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || 'Noir Onyx'
  );
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedFeedback, setAddedFeedback] = useState<boolean>(false);

  const images = product.secondaryImage
    ? [product.image, product.secondaryImage]
    : [product.image];

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#F6F4EF] rounded-3xl overflow-hidden shadow-2xl border border-black/10 max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 text-neutral-900 flex items-center justify-center shadow-md hover:bg-[#111111] hover:text-white transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Studio Gallery */}
        <div className="md:w-1/2 bg-[#E6E3DC] relative flex flex-col justify-between p-4 sm:p-6">
          <div className="relative aspect-[4/4.6] w-full rounded-2xl overflow-hidden bg-[#DDD9D0]">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-[#111111] text-white">
                {product.badge}
                {product.discountPercent ? ` ${product.discountPercent}%` : ''}
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex items-center gap-3 mt-4">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(imgUrl)}
                  className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === imgUrl
                      ? 'border-[#111111] scale-105 shadow-sm'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Product Details */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
              <span>{product.category}</span>
              <span>•</span>
              <span>{product.subCategory}</span>
              <span>•</span>
              <span>{product.gender}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111111] mt-1.5">
              {product.name}
            </h2>
            <p className="text-sm text-neutral-600 mt-1">{product.subtitle}</p>

            {/* Rating & Authentic Tag */}
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-bold text-neutral-900 ml-1">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-neutral-500">
                  ({product.reviewsCount} avis clients)
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3" /> En stock
              </span>
            </div>

            {/* Price in FCFA */}
            <div className="flex items-baseline gap-3 mt-5 pb-5 border-b border-black/10">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                {formatCFA(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-neutral-400 line-through">
                  {formatCFA(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Description & Material */}
            <p className="text-sm text-neutral-700 leading-relaxed mt-4">
              {product.description}
            </p>
            <div className="mt-2.5 text-xs text-neutral-500">
              <strong className="text-neutral-800">Matière & Finition :</strong> {product.material}
            </div>

            {/* Color Picker */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-2">
                <span>
                  Couleur : <strong className="text-[#111111]">{selectedColor}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                {product.colors.map((c) => {
                  const active = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        active
                          ? 'border-[#111111] bg-[#111111] text-white shadow-sm'
                          : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      {c.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size / Pointure Picker */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-2">
                <span>
                  {product.category === 'Chaussures'
                    ? 'Choisir la pointure (EU)'
                    : 'Choisir la taille'}
                </span>
                <span className="text-[11px] text-neutral-500 underline">
                  Coupe fidèle à la taille
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[44px] h-10 px-3 rounded-xl text-xs font-bold border transition-all ${
                        active
                          ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                          : 'bg-white text-neutral-800 border-neutral-300 hover:border-[#111111]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quantity + Add to Cart CTA */}
          <div className="mt-6 pt-5 border-t border-black/10">
            <div className="flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center bg-white border border-neutral-300 rounded-xl h-12 px-2">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 text-lg font-bold text-neutral-700 hover:text-black"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 text-lg font-bold text-neutral-700 hover:text-black"
                >
                  +
                </button>
              </div>

              {/* Main Add Button */}
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  addedFeedback
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#111111] text-white hover:bg-neutral-800'
                }`}
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-4 h-4" /> Ajouté au panier !
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Ajouter au panier •{' '}
                    {formatCFA(product.price * quantity)}
                  </>
                )}
              </button>

              {/* Wishlist Toggle */}
              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? 'bg-[#111111] border-[#111111] text-red-400'
                    : 'bg-white border-neutral-300 text-neutral-700 hover:border-[#111111]'
                }`}
                aria-label="Favoris"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Cameroon Delivery & Guarantee Micro-bar */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-black/5 text-[11px] text-neutral-600">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#111111] shrink-0" />
                <span>Livraison {selectedCity} 24h</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#111111] shrink-0" />
                <span>MoMo / Orange / Cash</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-[#111111] shrink-0" />
                <span>Échange taille gratuit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
