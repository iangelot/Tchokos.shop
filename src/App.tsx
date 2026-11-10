import React, { useState, useMemo } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  MapPin,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  ArrowRight,
  Sparkles,
  Check,
  X,
  LayoutGrid,
  Columns3,
  Columns2,
  PhoneCall,
  User,
  Menu,
} from 'lucide-react';
import {
  PRODUCTS,
  Product,
  ProductCategory,
  COLOR_FILTERS,
  CAMEROON_CITIES,
  formatCFA,
} from './data/products';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { AccountModal, UserAccount } from './components/AccountModal';
import { IntroSplash } from './components/IntroSplash';

const HERO_SLIDES = [
  {
    id: 1,
    title: 'NOUVELLE COLLECTION',
    subtitle:
      'Des pièces textiles d’exception, chaussures couture, robes fluides et maroquinerie pensées pour votre élégance quotidienne.',
    cta: 'Découvrir la collection',
    targetCategory: 'Tout' as const,
    bgClass: 'bg-[#E7E3DA]',
    textColor: 'text-[#111111]',
    image:
      'https://images.unsplash.com/photo-1603400521630-9f2de124b33b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    badgeText: 'Dès 1 000 FCFA',
  },
  {
    id: 2,
    title: 'Chaussures & Vestes pour Esprits Modernes',
    subtitle:
      'Sneakers en cuir souple, mocassins cousus main et surchemises structurées. Livraison express à Douala et Yaoundé.',
    cta: 'Explorer les chaussures',
    targetCategory: 'Chaussures' as const,
    bgClass: 'bg-[#1D2D44]',
    textColor: 'text-white',
    image:
      'https://images.unsplash.com/photo-1625860191460-10a66c7384fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    badgeText: 'Femme, Homme & Enfant',
  },
  {
    id: 3,
    title: 'Robes Satinées & Maroquinerie Fine',
    subtitle:
      'Sublimez chaque soirée et événement avec nos robes coupe midi et nos sacs à main structurés aux finitions dorées.',
    cta: 'Voir les robes & sacs',
    targetCategory: 'Robes' as const,
    bgClass: 'bg-[#231F1E]',
    textColor: 'text-white',
    image:
      'https://images.unsplash.com/photo-1542892770-3e6a09c7a7da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    badgeText: 'Édition Limitée Tchokos',
  },
];

const QUICK_TABS = [
  { label: 'TOUT', value: 'Tout' },
  { label: 'NOUVEAUTÉS', value: 'Nouveautés' },
  { label: 'MEILLEURES VENTES', value: 'Populaire' },
  { label: 'CHAUSSURES', value: 'Chaussures' },
  { label: 'ROBES', value: 'Robes' },
  { label: 'VÊTEMENTS & VESTES', value: 'Vêtements' },
  { label: 'SACS À MAIN', value: 'Sacs' },
  { label: 'ENFANTS', value: 'Enfant' },
  { label: 'ACCESSOIRES', value: 'Accessoires' },
];

const ALL_SIZES = [
  { label: 'XS', count: 14 },
  { label: 'S', count: 28 },
  { label: 'M', count: 36 },
  { label: 'L', count: 31 },
  { label: 'XL', count: 22 },
  { label: '4 ans', count: 12 },
  { label: '6 ans', count: 15 },
  { label: '8 ans', count: 18 },
  { label: '10 ans', count: 14 },
  { label: '30', count: 11 },
  { label: '34', count: 16 },
  { label: '38', count: 24 },
  { label: '40', count: 32 },
  { label: '42', count: 25 },
  { label: '44', count: 14 },
];

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [heroIndex, setHeroIndex] = useState(0);
  const [showcaseTab, setShowcaseTab] = useState<string>('Tout');

  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([]);
  const [selectedGender, setSelectedGender] = useState<string>('Tous');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'new'>('popular');
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  const [selectedCity, setSelectedCity] = useState<string>('Douala');
  const [userAccount, setUserAccount] = useState<UserAccount | null>(null);
  const [accountModalOpen, setAccountModalOpen] = useState<boolean>(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      size: '41',
      color: 'Blanc Craie',
      quantity: 1,
    },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['tch-02', 'tch-03']);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [wishlistModalOpen, setWishlistModalOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  };

  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(id);
      const prod = PRODUCTS.find((p) => p.id === id);
      if (exists) {
        triggerToast(`Retiré des favoris : ${prod?.name || ''}`);
        return prev.filter((item) => item !== id);
      } else {
        triggerToast(`Ajouté aux favoris : ${prod?.name || ''}`);
        return [...prev, id];
      }
    });
  };

  const handleAddToCart = (
    product: Product,
    size: string,
    color: string,
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color === color
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { product, size, color, quantity }];
    });
    triggerToast(`${product.name} (${size}) ajouté au panier`);
  };

  const handleUpdateCartQty = (index: number, delta: number) => {
    setCartItems((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return prev.filter((_, idx) => idx !== index);
      }
      updated[index] = { ...updated[index], quantity: newQty };
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const showcaseProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (showcaseTab === 'Tout') return true;
      if (showcaseTab === 'Nouveautés') return p.isNew;
      if (showcaseTab === 'Populaire') return p.isBestSeller;
      if (showcaseTab === 'Enfant') return p.gender === 'Enfant';
      return p.category === showcaseTab;
    }).slice(0, 8);
  }, [showcaseTab]);

  const catalogProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(p.category)
      ) {
        return false;
      }
      if (
        selectedGender !== 'Tous' &&
        p.gender !== selectedGender &&
        p.gender !== 'Unisexe'
      ) {
        return false;
      }
      if (selectedSize && !p.sizes.includes(selectedSize)) {
        return false;
      }
      if (
        selectedColor &&
        !p.colors.some((c) => c.name === selectedColor)
      ) {
        return false;
      }
      if (p.price > maxPrice) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'new') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return b.reviewsCount - a.reviewsCount;
    });
  }, [
    selectedCategories,
    selectedGender,
    selectedSize,
    selectedColor,
    maxPrice,
    sortBy,
    searchQuery,
  ]);

  const toggleCategoryFilter = (cat: ProductCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const resetAllFilters = () => {
    setSelectedCategories([]);
    setSelectedGender('Tous');
    setSelectedSize(null);
    setSelectedColor(null);
    setMaxPrice(25000);
    setSearchQuery('');
  };

  const jumpToCategory = (cat: ProductCategory | 'Tout' | 'Enfant') => {
    setMobileMenuOpen(false);
    if (cat === 'Tout') {
      setSelectedCategories([]);
      setSelectedGender('Tous');
    } else if (cat === 'Enfant') {
      setSelectedCategories([]);
      setSelectedGender('Enfant');
    } else {
      setSelectedCategories([cat]);
    }
    const el = document.getElementById('catalogue-complet');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalCartAmount = cartItems.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const currentHero = HERO_SLIDES[heroIndex];

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F4F1EC] text-[#111111] flex flex-col selection:bg-[#111111] selection:text-white">
      {showIntro && <IntroSplash onFinish={() => setShowIntro(false)} />}

      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#111111] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold border border-white/15">
          <span className="w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. STICKY BRAND HEADER WITH OFFICIAL TCHOKOS LOGO */}
      <header className="sticky top-0 z-40 w-full bg-[#F4F1EC]/95 backdrop-blur-md border-b border-black/8">
        {/* Top Bar: Left Logo + TCHOKOS + Motto | Right: City, Search, Compte, Favoris, Panier */}
        <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2">
          {/* Left: Official TCHOKOS Logo + Brand Name + Slogan (Never hidden) */}
          <a
            href="#accueil"
            onClick={() => setShowIntro(true)}
            title="Cliquer pour revoir l'animation d'ouverture TCHOKOS"
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
          >
            <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-full overflow-hidden bg-black p-0.5 shadow-md ring-2 ring-black/10 shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="/assets/tchokos-logo.png"
                alt="TCHOKOS"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="shrink-0">
              <span className="font-display text-base sm:text-2xl font-extrabold tracking-tight text-[#111111] block leading-none">
                TCHOKOS
              </span>
              <span className="text-[10px] sm:text-xs font-semibold italic text-neutral-600 block mt-0.5 leading-tight">
                C'est difficile mais c'est possible
              </span>
            </div>
          </a>

          {/* Right Action Icons: Always 100% visible */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 bg-white/90 border border-black/10 rounded-full px-3 py-1.5 text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#111111] shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                aria-label="Ville de livraison au Cameroun"
                className="bg-transparent font-bold text-[#111111] focus:outline-none cursor-pointer text-xs"
              >
                {CAMEROON_CITIES.map((c) => (
                  <option key={c.city} value={c.city}>
                    {c.city}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => setSearchOpen((prev) => !prev)}
              aria-label="Rechercher"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 border border-black/10 flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setAccountModalOpen(true)}
              aria-label="Mon compte"
              title={userAccount ? `Connecté : ${userAccount.name}` : 'Connexion / Créer un compte'}
              className={`h-8 sm:h-10 px-2.5 sm:px-3.5 rounded-full border flex items-center justify-center gap-1.5 text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                userAccount
                  ? 'bg-emerald-800 text-white border-emerald-800'
                  : 'bg-white/90 border-black/10 text-[#111111] hover:bg-[#111111] hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">
                {userAccount ? userAccount.name.split(' ')[0] : 'Compte'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setWishlistModalOpen(true)}
              aria-label="Favoris"
              className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 border border-black/10 flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <Heart className="w-4 h-4" />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#111111] text-white text-[9px] font-bold flex items-center justify-center border border-[#F4F1EC]">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label="Panier"
              className="flex items-center gap-2 h-8 sm:h-10 px-2.5 sm:px-3.5 rounded-full bg-[#111111] text-white hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer shrink-0"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber-400 text-black text-[9px] font-extrabold flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-xs font-bold tracking-tight">
                {formatCFA(totalCartAmount)}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Menu"
              className="md:hidden w-8 h-8 rounded-full bg-white/90 border border-black/10 flex items-center justify-center text-[#111111] shrink-0"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Second Row: Centered Navigation Links (Never collides with logo or icons) */}
        <div className="hidden md:block border-t border-black/6 bg-[#EFECE6]/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-center gap-6 lg:gap-8 text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-700">
            <a
              href="#accueil"
              className="text-[#111111] hover:opacity-70 transition-opacity"
            >
              Accueil
            </a>
            <a
              href="#collection-elevn"
              onClick={() => setShowcaseTab('Tout')}
              className="hover:text-[#111111] transition-colors"
            >
              Collection
            </a>
            <button
              type="button"
              onClick={() => jumpToCategory('Chaussures')}
              className="hover:text-[#111111] transition-colors uppercase cursor-pointer"
            >
              Chaussures
            </button>
            <button
              type="button"
              onClick={() => jumpToCategory('Robes')}
              className="hover:text-[#111111] transition-colors uppercase cursor-pointer"
            >
              Robes
            </button>
            <button
              type="button"
              onClick={() => jumpToCategory('Vêtements')}
              className="hover:text-[#111111] transition-colors uppercase cursor-pointer"
            >
              Vêtements
            </button>
            <button
              type="button"
              onClick={() => jumpToCategory('Sacs')}
              className="hover:text-[#111111] transition-colors uppercase cursor-pointer"
            >
              Sacs
            </button>
            <button
              type="button"
              onClick={() => jumpToCategory('Enfant')}
              className="hover:text-[#111111] transition-colors uppercase cursor-pointer"
            >
              Enfants
            </button>
            <a
              href="#catalogue-complet"
              className="px-3 py-1 rounded-full bg-[#111111] text-white text-[10px] hover:bg-neutral-800 transition-colors"
            >
              Catalogue & Filtres
            </a>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-black/10 px-4 py-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-black/8">
              <div className="flex items-center gap-2 text-xs font-bold text-[#111111]">
                <MapPin className="w-4 h-4" />
                <span>Ville de livraison :</span>
              </div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-[#F4F1EC] px-3 py-1.5 rounded-lg text-xs font-bold text-[#111111]"
              >
                {CAMEROON_CITIES.map((c) => (
                  <option key={c.city} value={c.city}>
                    {c.city}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => jumpToCategory('Tout')}
                className="p-3 rounded-xl bg-[#F4F1EC] text-left"
              >
                Tout le Catalogue
              </button>
              <button
                type="button"
                onClick={() => jumpToCategory('Chaussures')}
                className="p-3 rounded-xl bg-[#F4F1EC] text-left"
              >
                Chaussures
              </button>
              <button
                type="button"
                onClick={() => jumpToCategory('Robes')}
                className="p-3 rounded-xl bg-[#F4F1EC] text-left"
              >
                Robes
              </button>
              <button
                type="button"
                onClick={() => jumpToCategory('Vêtements')}
                className="p-3 rounded-xl bg-[#F4F1EC] text-left"
              >
                Vêtements
              </button>
              <button
                type="button"
                onClick={() => jumpToCategory('Sacs')}
                className="p-3 rounded-xl bg-[#F4F1EC] text-left"
              >
                Sacs à Main
              </button>
              <button
                type="button"
                onClick={() => jumpToCategory('Enfant')}
                className="p-3 rounded-xl bg-[#111111] text-white text-left"
              >
                Mode Enfant
              </button>
            </div>
          </div>
        )}

        {searchOpen && (
          <div className="border-t border-black/10 bg-white px-4 py-3">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-4 h-4 text-neutral-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  const el = document.getElementById('catalogue-complet');
                  if (el && e.target.value.length > 1) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                placeholder="Rechercher chaussures, robes, mode enfant, sacs dès 1 000 FCFA..."
                className="w-full text-sm text-[#111111] placeholder:text-neutral-400 focus:outline-none"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-neutral-500 hover:text-black"
                >
                  Effacer
                </button>
              )}
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1 text-neutral-500 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      <main id="accueil" className="flex-1 w-full min-w-0 overflow-x-hidden">
        {/* 2. HERO BANNER SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
          <div
            className={`relative rounded-3xl overflow-hidden ${currentHero.bgClass} ${currentHero.textColor} transition-colors duration-500 shadow-[0_12px_40px_rgba(0,0,0,0.06)]`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] sm:min-h-[480px] items-center">
              <div className="lg:col-span-6 p-7 sm:p-12 lg:p-14 z-10 flex flex-col justify-between">
                <div>
                  <h1 className="font-display text-3xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight leading-[1.06]">
                    {currentHero.title}
                  </h1>

                  <p className="mt-4 text-sm sm:text-base opacity-85 max-w-lg leading-relaxed">
                    {currentHero.subtitle}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-3.5">
                    <button
                      type="button"
                      onClick={() => jumpToCategory(currentHero.targetCategory)}
                      className={`px-7 h-12 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-md cursor-pointer ${
                        currentHero.textColor === 'text-white'
                          ? 'bg-white text-[#111111] hover:bg-neutral-200'
                          : 'bg-[#111111] text-white hover:bg-neutral-800'
                      }`}
                    >
                      <span>{currentHero.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href="#collection-elevn"
                      className={`px-5 h-12 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center border transition-all ${
                        currentHero.textColor === 'text-white'
                          ? 'border-white/30 text-white hover:bg-white/10'
                          : 'border-black/20 text-[#111111] hover:bg-black/5'
                      }`}
                    >
                      Voir les meilleures ventes
                    </a>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-current/10 grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <div className="font-extrabold text-base sm:text-lg">Dès 1 000 FCFA</div>
                    <div className="opacity-70 text-[11px]">Pour tous les budgets</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-base sm:text-lg">Famille</div>
                    <div className="opacity-70 text-[11px]">Femme, Homme & Enfant</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-base sm:text-lg">24h à 48h</div>
                    <div className="opacity-70 text-[11px]">Livraison Douala & Yaoundé</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 relative h-[320px] sm:h-[420px] lg:h-[510px] w-full overflow-hidden">
                <img
                  src={currentHero.image}
                  alt={currentHero.title}
                  className="w-full h-full object-cover object-center transition-all duration-700"
                />
                <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 bg-white/95 backdrop-blur-md text-[#111111] p-3 pr-4 rounded-2xl shadow-xl flex items-center gap-3 border border-black/10">
                  <img
                    src="/assets/tchokos-logo.png"
                    alt="TCHOKOS"
                    className="w-11 h-11 rounded-full object-contain bg-black p-0.5"
                  />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                      Authenticité Garantie
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-[#111111]">
                      {currentHero.badgeText}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setHeroIndex((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
              }
              aria-label="Diapositive précédente"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-[#111111] shadow-md hidden sm:flex items-center justify-center hover:bg-[#111111] hover:text-white transition-colors z-20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setHeroIndex((i) => (i + 1) % HERO_SLIDES.length)}
              aria-label="Diapositive suivante"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-[#111111] shadow-md hidden sm:flex items-center justify-center hover:bg-[#111111] hover:text-white transition-colors z-20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 right-6 flex items-center gap-2 z-20">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setHeroIndex(idx)}
                  aria-label={`Aller à la bannière ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    heroIndex === idx ? 'w-7 bg-white' : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 4. SECTION "BOUTIQUE COLLECTION" */}
        <section
          id="collection-elevn"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
        >
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-500">
              TCHOKOS • SÉLECTION OFFICIELLE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111] mt-1.5 uppercase">
              BOUTIQUE COLLECTION
            </h2>
            <p className="text-sm text-neutral-600 mt-1.5">
              Trouvez la pièce parfaite pour chaque occasion : Chaussures, Robes, Enfant, Vestes & Sacs
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {QUICK_TABS.map((tab) => {
              const active = showcaseTab === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setShowcaseTab(tab.value)}
                  className={`px-3.5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    active
                      ? 'bg-[#111111] text-white shadow-sm'
                      : 'bg-transparent text-neutral-600 hover:text-[#111111] hover:bg-black/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7 mt-8">
            {showcaseProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </section>

        {/* 5. MID-PAGE FULL-WIDTH CAPSULE BANNER */}
        <section className="w-full bg-[#D8CBB8] overflow-hidden my-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative min-h-[380px] sm:min-h-[450px] grid grid-cols-1 lg:grid-cols-12 items-center py-10 gap-8">
              <div className="lg:col-span-4 h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg relative">
                <img
                  src="https://images.unsplash.com/photo-1584983806622-8f73015b7ed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900"
                  alt="Collection Capsule Tchokos"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="lg:col-span-4 text-center z-10 flex flex-col items-center">
                <img
                  src="/assets/tchokos-logo.png"
                  alt="Logo Tchokos"
                  className="w-14 h-14 rounded-full bg-black p-0.5 mb-3 shadow-md"
                />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-800">
                  C'EST DIFFICILE MAIS C'EST POSSIBLE
                </span>
                <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm mt-2 uppercase">
                  TCHOKOS UNION
                </h2>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-neutral-900 mt-3">
                  CAPSULE TEXTILE & CHAUSSURES • JUSQU’À 40% DE RÉDUCTION
                </p>
                <button
                  type="button"
                  onClick={() => jumpToCategory('Tout')}
                  className="mt-6 px-8 py-3 border-2 border-white text-white bg-black/25 hover:bg-[#111111] hover:border-[#111111] text-xs font-bold uppercase tracking-[0.2em] rounded-lg transition-all cursor-pointer"
                >
                  ACHETER MAINTENANT
                </button>
              </div>

              <div className="lg:col-span-4 h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg relative">
                <img
                  src="https://images.unsplash.com/photo-1779406166699-662a041a12a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900"
                  alt="Silhouette Tchokos"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 6. ASYMMETRIC PROMOTIONAL BENTO GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-500">
                UNIVERS TEXTILE & CHAUSSURES
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111111] mt-1">
                Nos Collections par Catégorie
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-md">
              Des créations pensées pour les femmes et les hommes qui recherchent l’alliance
              du confort et du prestige.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden bg-[#E5E3E0] min-h-[420px] sm:min-h-[520px] flex flex-col justify-between p-7 sm:p-9 group">
              <img
                src="https://images.unsplash.com/photo-1586447853141-5d62abeb77af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Où le Rêve Rencontre la Couture"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

              <div className="relative z-10 max-w-xs text-white">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-200">
                  ÉLÉGANCE CONTEMPORAINE
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight mt-2">
                  Où le Rêve Rencontre la Couture
                </h3>
                <button
                  type="button"
                  onClick={() => jumpToCategory('Vêtements')}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-white text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
                >
                  Explorer les Vêtements
                </button>
              </div>

              <div className="relative z-10 text-white/90 text-xs font-medium">
                T-shirts, Vestes, Surchemises & Hoodies dès <strong>2 500 FCFA</strong>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2 relative rounded-3xl overflow-hidden bg-[#EAE6DF] min-h-[250px] p-7 sm:p-9 flex flex-col justify-center group">
                <img
                  src="https://images.unsplash.com/photo-1562894369-193bedce28e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Des Styles Enchanteurs pour Chaque Femme"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
                <div className="relative z-10 max-w-sm text-white">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-200">
                    RÊVERIE RADIEUSE • ROBES
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight mt-1.5">
                    Des Styles Enchanteurs pour Chaque Femme
                  </h3>
                  <p className="text-xs text-neutral-200 mt-1.5">
                    Robes satinées, coupes midi et tenues de cérémonie.
                  </p>
                  <button
                    type="button"
                    onClick={() => jumpToCategory('Robes')}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-white text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    Découvrir les Robes
                  </button>
                </div>
              </div>

              <div className="relative rounded-3xl overflow-hidden bg-[#E6E3DC] min-h-[250px] p-6 flex flex-col justify-between group">
                <img
                  src="https://images.unsplash.com/photo-1645784127380-77aeb81be500?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900"
                  alt="Chaussures Chic pour la Vie Citadine"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="relative z-10">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 text-[#111111] text-[10px] font-bold uppercase tracking-wider">
                    PAS CITADINS
                  </span>
                </div>
                <div className="relative z-10 text-white">
                  <h3 className="font-display text-xl font-bold leading-snug">
                    Chaussures Chic pour la Vie Citadine
                  </h3>
                  <button
                    type="button"
                    onClick={() => jumpToCategory('Chaussures')}
                    className="mt-3 px-4 py-2 rounded-xl bg-white text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    Voir les Chaussures
                  </button>
                </div>
              </div>

              <div className="relative rounded-3xl overflow-hidden bg-[#263849] min-h-[250px] p-6 flex flex-col justify-between text-white group">
                <img
                  src="https://images.unsplash.com/photo-1691480150204-66dd1eb77391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900"
                  alt="Sacs Tendance pour Elle"
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-35 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
                    MAROQUINERIE FINE
                  </span>
                  <h3 className="font-display text-lg font-bold mt-1">
                    Sacs Tendance pour Elle
                  </h3>
                </div>

                <div className="relative z-10 my-2">
                  <div className="font-editorial text-5xl sm:text-6xl font-bold text-white leading-none">
                    40%
                  </div>
                  <p className="text-[11px] text-neutral-200 mt-1">
                    De remise sur une sélection de sacs & cabas
                  </p>
                </div>

                <div className="relative z-10">
                  <button
                    type="button"
                    onClick={() => jumpToCategory('Sacs')}
                    className="px-5 py-2 rounded-xl bg-white text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    Voir les Sacs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. "POUR ELLE / POUR LUI / POUR LES ENFANTS" SPOTLIGHT BLOCKS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 shadow-xs flex flex-col justify-between gap-5">
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  SÉLECTION DAME
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#111111] mt-1">
                  Styles Chic & Confort pour Elle
                </h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  Découvrez la mode TCHOKOS : robes fluides, escarpins, sandales à talons et
                  sacs à main de caractère.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedGender('Femme');
                      const el = document.getElementById('catalogue-complet');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#111111] flex items-center gap-1.5 hover:underline cursor-pointer"
                  >
                    <span>Explorer la collection Femme</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="w-full h-48 rounded-2xl overflow-hidden bg-[#E6E3DC] shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1713845784497-fe3d7ed176d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                  alt="Mode Femme Tchokos"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 shadow-xs flex flex-col justify-between gap-5">
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  SÉLECTION HOMME
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#111111] mt-1">
                  Allure Urbaine & Gentleman pour Lui
                </h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  Sneakers minimalistes, mocassins en cuir véritable, surchemises lourdes et
                  hoodies coupe boxy.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedGender('Homme');
                      const el = document.getElementById('catalogue-complet');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#111111] flex items-center gap-1.5 hover:underline cursor-pointer"
                  >
                    <span>Explorer la collection Homme</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="w-full h-48 rounded-2xl overflow-hidden bg-[#E6E3DC] shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1588713611500-8bf627fd3fb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                  alt="Mode Homme Tchokos"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 shadow-xs flex flex-col justify-between gap-5">
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  SÉLECTION ENFANT
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#111111] mt-1">
                  Tenues & Chaussures pour Enfants
                </h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  Robes de fête, ensembles en coton doux et baskets confortables pour habiller
                  vos enfants avec style dès 3 500 FCFA.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedGender('Enfant');
                      const el = document.getElementById('catalogue-complet');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#111111] flex items-center gap-1.5 hover:underline cursor-pointer"
                  >
                    <span>Explorer la collection Enfant</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="w-full h-48 rounded-2xl overflow-hidden bg-[#E6E3DC] shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1724365309223-89899d9e9845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                  alt="Mode Enfant Tchokos"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 8. FULL CATALOG WITH LEFT SIDEBAR FILTERS & COLUMN SWITCHER (FORMA & Guza style) */}
        <section
          id="catalogue-complet"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-black/10"
        >
          <div className="lg:hidden mb-4">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen((prev) => !prev)}
              className="w-full h-11 rounded-2xl bg-white border border-black/10 px-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#111111]"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                {mobileFiltersOpen ? 'Masquer les filtres' : 'Afficher les filtres (Catégorie, Enfant, Budget dès 1 000 FCFA)'}
              </span>
              <span>{mobileFiltersOpen ? '▲' : '▼'}</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <aside
              className={`w-full lg:w-68 shrink-0 bg-white rounded-3xl p-6 border border-black/6 shadow-xs space-y-6 ${
                mobileFiltersOpen ? 'block' : 'hidden lg:block'
              }`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-black/8">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#111111]" />
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[#111111]">
                    FILTRES
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-xs font-semibold text-neutral-500 hover:text-[#111111] underline cursor-pointer"
                >
                  Réinitialiser
                </button>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                  Catégorie
                </h4>
                <div className="space-y-2">
                  {(
                    [
                      'Chaussures',
                      'Robes',
                      'Vêtements',
                      'Sacs',
                      'Accessoires',
                    ] as ProductCategory[]
                  ).map((cat) => {
                    const checked = selectedCategories.includes(cat);
                    const count = PRODUCTS.filter((p) => p.category === cat).length;
                    return (
                      <label
                        key={cat}
                        onClick={() => toggleCategoryFilter(cat)}
                        className="flex items-center justify-between text-xs text-neutral-700 cursor-pointer select-none py-1 hover:text-black"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                              checked
                                ? 'bg-[#111111] border-[#111111] text-white'
                                : 'border-neutral-300 bg-white'
                            }`}
                          >
                            {checked && <Check className="w-3 h-3" />}
                          </span>
                          <span className={checked ? 'font-bold text-[#111111]' : ''}>
                            {cat}
                          </span>
                        </div>
                        <span className="text-[11px] text-neutral-400 font-medium">
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-black/8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                  Collection
                </h4>
                <div className="grid grid-cols-2 gap-1.5">
                  {['Tous', 'Femme', 'Homme', 'Enfant', 'Unisexe'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setSelectedGender(g)}
                      className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        selectedGender === g
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-[#F4F1EC] text-neutral-700 border-transparent hover:border-neutral-300'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-black/8">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    Taille / Pointure
                  </h4>
                  {selectedSize && (
                    <button
                      type="button"
                      onClick={() => setSelectedSize(null)}
                      className="text-[11px] text-neutral-500 hover:text-black"
                    >
                      Tout voir
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {ALL_SIZES.map((sz) => {
                    const active = selectedSize === sz.label;
                    return (
                      <button
                        key={sz.label}
                        type="button"
                        onClick={() =>
                          setSelectedSize(active ? null : sz.label)
                        }
                        className={`py-1.5 px-2 rounded-lg text-xs font-semibold border flex items-center justify-between transition-all cursor-pointer ${
                          active
                            ? 'bg-[#111111] text-white border-[#111111]'
                            : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        <span>{sz.label}</span>
                        <span
                          className={`text-[10px] ${
                            active ? 'text-neutral-300' : 'text-neutral-400'
                          }`}
                        >
                          {sz.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-black/8">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    Couleur
                  </h4>
                  {selectedColor && (
                    <button
                      type="button"
                      onClick={() => setSelectedColor(null)}
                      className="text-[11px] text-neutral-500 hover:text-black"
                    >
                      Effacer
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {COLOR_FILTERS.map((c) => {
                    const active = selectedColor === c.name;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() =>
                          setSelectedColor(active ? null : c.name)
                        }
                        className={`w-full flex items-center justify-between py-1 px-2 rounded-lg text-xs transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#F4F1EC] font-bold text-[#111111]'
                            : 'text-neutral-700 hover:bg-neutral-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-4 h-4 rounded-full border ${
                              active
                                ? 'ring-2 ring-offset-1 ring-[#111111]'
                                : 'border-black/20'
                            }`}
                            style={{ backgroundColor: c.hex }}
                          />
                          <span>{c.name}</span>
                        </div>
                        {active && <Check className="w-3.5 h-3.5 text-[#111111]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-black/8">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    Budget Max (FCFA)
                  </h4>
                  <span className="text-xs font-extrabold text-[#111111]">
                    {formatCFA(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={25000}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#111111] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                  <span>1 000 FCFA</span>
                  <span>25 000 FCFA</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 mt-3">
                  {[
                    { label: '≤ 2 000', val: 2000 },
                    { label: '≤ 5 000', val: 5000 },
                    { label: 'Tout', val: 25000 },
                  ].map((b) => (
                    <button
                      key={b.val}
                      type="button"
                      onClick={() => setMaxPrice(b.val)}
                      className={`py-1 px-2 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                        maxPrice === b.val
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-[#F4F1EC] text-neutral-700 border-transparent hover:border-neutral-300'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <div className="flex-1 w-full min-w-0">
              <div className="bg-white rounded-2xl px-5 py-4 border border-black/6 shadow-xs flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-baseline gap-2.5">
                  <h2 className="font-display text-lg sm:text-xl font-extrabold text-[#111111]">
                    Tous les articles
                  </h2>
                  <span className="text-xs text-neutral-500 font-medium">
                    Trouvés : <strong>{catalogProducts.length}</strong> pièce(s)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-neutral-500 hidden sm:inline">Trier par :</span>
                    <select
                      value={sortBy}
                      onChange={(e) =>
                        setSortBy(
                          e.target.value as 'popular' | 'price-asc' | 'price-desc' | 'new'
                        )
                      }
                      className="h-9 px-3 rounded-xl bg-[#F4F1EC] border border-black/10 text-xs font-bold text-[#111111] focus:outline-none cursor-pointer"
                    >
                      <option value="popular">Popularité</option>
                      <option value="new">Nouveautés</option>
                      <option value="price-asc">Prix croissant (FCFA)</option>
                      <option value="price-desc">Prix décroissant (FCFA)</option>
                    </select>
                  </div>

                  <div className="hidden md:flex items-center gap-1 bg-[#F4F1EC] p-1 rounded-xl border border-black/8">
                    <button
                      type="button"
                      onClick={() => setGridCols(2)}
                      title="2 colonnes"
                      className={`p-1.5 rounded-lg transition-colors ${
                        gridCols === 2
                          ? 'bg-[#111111] text-white'
                          : 'text-neutral-500 hover:text-black'
                      }`}
                    >
                      <Columns2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setGridCols(3)}
                      title="3 colonnes"
                      className={`p-1.5 rounded-lg transition-colors ${
                        gridCols === 3
                          ? 'bg-[#111111] text-white'
                          : 'text-neutral-500 hover:text-black'
                      }`}
                    >
                      <Columns3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setGridCols(4)}
                      title="4 colonnes"
                      className={`p-1.5 rounded-lg transition-colors ${
                        gridCols === 4
                          ? 'bg-[#111111] text-white'
                          : 'text-neutral-500 hover:text-black'
                      }`}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {(selectedCategories.length > 0 ||
                selectedGender !== 'Tous' ||
                selectedSize ||
                selectedColor ||
                maxPrice < 25000 ||
                searchQuery) && (
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  {selectedCategories.map((cat) => (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111] text-white text-xs font-semibold"
                    >
                      {cat}
                      <button
                        type="button"
                        onClick={() => toggleCategoryFilter(cat)}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {selectedGender !== 'Tous' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111] text-white text-xs font-semibold">
                      Collection : {selectedGender}
                      <button
                        type="button"
                        onClick={() => setSelectedGender('Tous')}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedSize && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111] text-white text-xs font-semibold">
                      Taille/Pointure : {selectedSize}
                      <button type="button" onClick={() => setSelectedSize(null)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedColor && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111] text-white text-xs font-semibold">
                      {selectedColor}
                      <button type="button" onClick={() => setSelectedColor(null)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {maxPrice < 25000 && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111] text-white text-xs font-semibold">
                      Max : {formatCFA(maxPrice)}
                      <button type="button" onClick={() => setMaxPrice(25000)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}

              {catalogProducts.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-black/6">
                  <p className="font-display text-lg font-bold text-[#111111]">
                    Aucun article ne correspond à ces critères
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Essayez d’élargir votre budget FCFA ou de réinitialiser les filtres.
                  </p>
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Réinitialiser tous les filtres
                  </button>
                </div>
              ) : (
                <div
                  className={`grid gap-5 sm:gap-6 ${
                    gridCols === 2
                      ? 'grid-cols-1 sm:grid-cols-2'
                      : gridCols === 4
                      ? 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4'
                      : 'grid-cols-2 md:grid-cols-3'
                  }`}
                >
                  {catalogProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={wishlistIds.includes(product.id)}
                      onToggleWishlist={handleToggleWishlist}
                      onAddToCart={handleAddToCart}
                      onQuickView={setQuickViewProduct}
                      compact={gridCols === 4}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 9. 4-COLUMN TRUST & SERVICE BAR (FORMA bottom bar tribute) */}
        <section className="bg-white border-y border-black/8 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F4F1EC] flex items-center justify-center text-[#111111] shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#111111]">
                    Livraison gratuite
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Dès 25 000 FCFA à Douala & Yaoundé
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F4F1EC] flex items-center justify-center text-[#111111] shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#111111]">
                    Échange & retour faciles
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    14 jours pour échanger taille ou pointure
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F4F1EC] flex items-center justify-center text-[#111111] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#111111]">
                    Garantie de qualité
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Chaque pièce textile & chaussure est contrôlée
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F4F1EC] flex items-center justify-center text-[#111111] shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#111111]">
                    Support client 24/7
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Conseils style & pointures sur WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 10. DARK EDITORIAL FOOTER (Guza & ELEVN tribute) */}
      <footer className="bg-[#0E0E0E] text-white pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/tchokos-logo.png"
                  alt="TCHOKOS Logo"
                  className="w-14 h-14 rounded-full bg-black p-0.5 border border-white/20"
                />
                <div>
                  <span className="font-display text-2xl font-extrabold tracking-tight block">
                    TCHOKOS
                  </span>
                  <span className="text-xs font-semibold italic text-neutral-300">
                    C'est difficile mais c'est possible
                  </span>
                </div>
              </div>

              <h4 className="text-base sm:text-lg font-bold leading-snug pt-2">
                Recevez un code exclusif de{' '}
                <span className="text-red-400">20% de réduction</span> lors de votre
                inscription.
              </h4>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterEmail) {
                    setNewsletterSuccess(true);
                    setNewsletterEmail('');
                  }
                }}
                className="flex items-center border-b border-white/30 pb-2 max-w-sm"
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Entrez votre adresse e-mail..."
                  className="bg-transparent text-xs text-white placeholder:text-neutral-500 flex-1 focus:outline-none"
                />
                <button
                  type="submit"
                  className="text-xs font-bold uppercase tracking-wider text-white hover:text-amber-300 transition-colors cursor-pointer"
                >
                  S’abonner
                </button>
              </form>
              {newsletterSuccess && (
                <p className="text-xs text-emerald-400 font-semibold">
                  Bienvenue chez TCHOKOS ! Utilisez le code TCHOKOS10 dans votre panier.
                </p>
              )}
            </div>

            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs">
              <div>
                <h5 className="font-bold uppercase tracking-wider text-white mb-4">
                  Boutique
                </h5>
                <ul className="space-y-2.5 text-neutral-400">
                  <li>
                    <button
                      type="button"
                      onClick={() => jumpToCategory('Chaussures')}
                      className="hover:text-white transition-colors"
                    >
                      Chaussures & Sneakers
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => jumpToCategory('Robes')}
                      className="hover:text-white transition-colors"
                    >
                      Robes & Soirée
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => jumpToCategory('Vêtements')}
                      className="hover:text-white transition-colors"
                    >
                      Vestes & Ensembles
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => jumpToCategory('Sacs')}
                      className="hover:text-white transition-colors"
                    >
                      Sacs & Maroquinerie
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => jumpToCategory('Enfant')}
                      className="hover:text-white transition-colors"
                    >
                      Mode & Chaussures Enfant
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold uppercase tracking-wider text-white mb-4">
                  Maison Tchokos
                </h5>
                <ul className="space-y-2.5 text-neutral-400">
                  <li>Notre Histoire</li>
                  <li>Savoir-Faire « Made in Africa »</li>
                  <li>Showroom Douala (Bonapriso)</li>
                  <li>Showroom Yaoundé (Bastos)</li>
                  <li>Carrières & Partenariats</li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold uppercase tracking-wider text-white mb-4">
                  Service Client
                </h5>
                <ul className="space-y-2.5 text-neutral-400">
                  <li>Guide des Pointures & Tailles</li>
                  <li>Suivre ma Commande</li>
                  <li>Livraison dans les 10 Régions</li>
                  <li>Échanges & Retours</li>
                  <li className="flex items-center gap-1.5 text-white font-semibold pt-1">
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>+237 6 90 00 23 70</span>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold uppercase tracking-wider text-white mb-4">
                  Suivez-nous
                </h5>
                <ul className="space-y-2.5 text-neutral-400">
                  <li>Instagram (@tchokos.cm)</li>
                  <li>TikTok (@tchokos_official)</li>
                  <li>Facebook</li>
                  <li>WhatsApp Catalogue VIP</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-white text-base">
                TCHOKOS
              </span>
              <span>© {new Date().getFullYear()} TCHOKOS Cameroun. Tous droits réservés.</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-amber-400 text-black font-extrabold text-[10px]">
                MTN MoMo
              </span>
              <span className="px-2.5 py-1 rounded bg-orange-500 text-white font-extrabold text-[10px]">
                Orange Money
              </span>
              <span className="px-2.5 py-1 rounded bg-white/10 text-white font-bold text-[10px]">
                PAIEMENT À LA LIVRAISON
              </span>
              <span className="px-2.5 py-1 rounded border border-white/20 text-white font-bold text-[10px]">
                FR • CAMEROUN
              </span>
              <span className="px-2.5 py-1 rounded border border-white/20 text-amber-300 font-bold text-[10px]">
                FCFA (XAF)
              </span>
            </div>
          </div>
        </div>
      </footer>

      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={
          quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false
        }
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        selectedCity={selectedCity}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        user={userAccount}
        onOpenAccountModal={() => {
          setCartOpen(false);
          setAccountModalOpen(true);
        }}
        onAutoCreateAccount={(acc) => {
          setUserAccount(acc);
          triggerToast(`Compte TCHOKOS créé pour ${acc.name}`);
        }}
      />

      <AccountModal
        isOpen={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
        user={userAccount}
        onLoginSuccess={(acc) => {
          setUserAccount(acc);
          setSelectedCity(acc.city);
          triggerToast(`Bienvenue chez TCHOKOS, ${acc.name} !`);
        }}
        onLogout={() => {
          setUserAccount(null);
          triggerToast('Vous êtes déconnecté');
        }}
        defaultCity={selectedCity}
      />

      {wishlistModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setWishlistModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-[#F6F4EF] rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/10 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <div className="flex items-center gap-2.5">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
                <h3 className="font-display text-xl font-bold text-[#111111]">
                  Vos Favoris TCHOKOS ({wishlistIds.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setWishlistModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-neutral-700 hover:bg-black hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {wishlistIds.length === 0 ? (
              <p className="text-sm text-neutral-500 py-12 text-center">
                Vous n’avez pas encore ajouté de coup de cœur. Cliquez sur le cœur d’un
                article pour le retrouver ici.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                {PRODUCTS.filter((p) => wishlistIds.includes(p.id)).map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center gap-3.5 bg-white p-3 rounded-2xl border border-black/5"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-20 h-24 rounded-xl object-cover bg-[#E6E3DC]"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#111111] truncate">
                        {prod.name}
                      </h4>
                      <div className="text-sm font-extrabold text-[#111111] mt-1">
                        {formatCFA(prod.price)}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setWishlistModalOpen(false);
                            setQuickViewProduct(prod);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#111111] text-white text-[11px] font-bold"
                        >
                          Choisir la taille
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleWishlist(prod.id)}
                          className="text-[11px] text-neutral-400 hover:text-red-600"
                        >
                          Retirer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
