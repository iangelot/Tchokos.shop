import React, { useState } from 'react';
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Smartphone,
  Banknote,
  Tag,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { Product, formatCFA, CAMEROON_CITIES } from '../data/products';
import { UserAccount } from './AccountModal';

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  user: UserAccount | null;
  onOpenAccountModal: () => void;
  onAutoCreateAccount: (account: UserAccount) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  selectedCity,
  onSelectCity,
  user,
  onOpenAccountModal,
  onAutoCreateAccount,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [createAccountOnPay, setCreateAccountOnPay] = useState(true);
  const [quarter, setQuarter] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'mtn' | 'orange' | 'cod'>('mtn');
  const [orderRef, setOrderRef] = useState('');

  if (!isOpen) return null;

  const cityObj =
    CAMEROON_CITIES.find((c) => c.city === selectedCity) || CAMEROON_CITIES[0];

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 25000;
  const discount = appliedPromo ? Math.round(subtotal * 0.1) : 0;
  const deliveryFee =
    items.length === 0 || subtotal >= freeShippingThreshold ? 0 : cityObj.deliveryFee;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'TCHOKOS10' || code === 'VIP237' || code === 'BIENVENUE') {
      setAppliedPromo(code);
    }
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    setOrderRef(`TCH237${randomNum}`);
    if (!user && createAccountOnPay) {
      onAutoCreateAccount({
        name: customerName || 'Client Tchokos',
        phone: phone || '6 90 00 00 00',
        email: email || 'client@tchokos.cm',
        city: selectedCity,
      });
    }
    setStep('success');
    onClearCart();
  };

  const resetAndClose = () => {
    setStep('cart');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-xs"
      onClick={resetAndClose}
    >
      <div
        className="w-full max-w-md bg-[#F6F4EF] h-full flex flex-col justify-between shadow-2xl border-l border-black/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-5 bg-white border-b border-black/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#111111] text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#111111]">
                {step === 'cart'
                  ? 'Votre Panier TCHOKOS'
                  : step === 'checkout'
                  ? 'Finaliser la Commande'
                  : 'Commande Confirmée'}
              </h3>
              <p className="text-xs text-neutral-500">
                {items.reduce((s, i) => s + i.quantity, 0)} article(s) • Devise : FCFA
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="w-9 h-9 rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center hover:bg-[#111111] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        {step === 'cart' && (
          <>
            {/* Free Shipping Progress Bar */}
            <div className="px-6 py-3 bg-[#ECE9E2] border-b border-black/5">
              {subtotal >= freeShippingThreshold ? (
                <p className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Félicitations ! Vous bénéficiez de la livraison gratuite à {selectedCity}.
                </p>
              ) : (
                <div>
                  <p className="text-xs text-neutral-700">
                    Plus que{' '}
                    <strong className="text-[#111111]">
                      {formatCFA(freeShippingThreshold - subtotal)}
                    </strong>{' '}
                    pour la livraison gratuite !
                  </p>
                  <div className="w-full h-1.5 bg-neutral-300 rounded-full overflow-hidden mt-1.5">
                    <div
                      className="h-full bg-[#111111] transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-[#E6E3DC] mx-auto flex items-center justify-center text-neutral-500 mb-4">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-[#111111]">
                    Votre panier est vide
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                    Explorez nos chaussures, robes, ensembles textiles et sacs à main pour
                    composer votre style TCHOKOS.
                  </p>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="flex gap-3.5 bg-white p-3.5 rounded-2xl border border-black/5 shadow-xs"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-24 rounded-xl object-cover bg-[#E6E3DC] shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-[#111111] truncate">
                            {item.product.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(idx)}
                            className="text-neutral-400 hover:text-red-600 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5">
                          {item.product.category === 'Chaussures' ? 'Pointure' : 'Taille'}:{' '}
                          <strong className="text-neutral-800">{item.size}</strong> •{' '}
                          {item.color}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-neutral-200 rounded-lg bg-[#F6F4EF]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(idx, -1)}
                            className="w-7 h-7 text-xs font-bold text-neutral-700 hover:text-black"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-xs font-bold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(idx, 1)}
                            className="w-7 h-7 text-xs font-bold text-neutral-700 hover:text-black"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-extrabold text-[#111111]">
                          {formatCFA(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Promo Code Input */}
              {items.length > 0 && (
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                    Code privilège (Essayez : TCHOKOS10)
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="TCHOKOS10"
                        className="w-full h-10 pl-8 pr-3 rounded-xl bg-white border border-neutral-300 text-xs font-semibold uppercase focus:outline-none focus:border-[#111111]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 h-10 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-700 transition-colors"
                    >
                      Appliquer
                    </button>
                  </div>
                  {appliedPromo && (
                    <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                      Code {appliedPromo} activé : 10% de réduction immédiate !
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Bottom Summary */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-black/10 space-y-3">
                <div className="space-y-1.5 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span className="font-semibold text-neutral-900">
                      {formatCFA(subtotal)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Remise ({appliedPromo})</span>
                      <span>Moins {formatCFA(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Livraison ({selectedCity})</span>
                    <span className="font-semibold text-neutral-900">
                      {deliveryFee === 0 ? 'OFFERTE' : formatCFA(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-[#111111] pt-2 border-t border-black/10">
                    <span>Total à payer</span>
                    <span>{formatCFA(total)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('checkout')}
                  className="w-full h-12 rounded-xl bg-[#111111] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-lg"
                >
                  Commander maintenant <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Step 2: Cameroon Checkout Form */}
        {step === 'checkout' && (
          <form
            onSubmit={handleConfirmOrder}
            className="flex-1 overflow-y-auto p-6 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="text-xs font-semibold text-neutral-600 hover:text-black underline"
              >
                ← Retour au panier
              </button>

              {/* Account status or quick login banner at checkout */}
              {user ? (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-900">
                  <UserCheck className="w-4 h-4 shrink-0" />
                  <span>
                    Connecté en tant que <strong>{user.name}</strong> (+237 {user.phone})
                  </span>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-white border border-black/10 flex items-center justify-between gap-2">
                  <div className="text-xs text-neutral-700">
                    <span className="font-bold text-[#111111] block">
                      Vous avez déjà un compte ?
                    </span>
                    <span>Connectez-vous ou créez votre compte en payant.</span>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenAccountModal}
                    className="px-3 py-1.5 rounded-lg bg-[#111111] text-white text-[11px] font-bold shrink-0 cursor-pointer"
                  >
                    Connexion
                  </button>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Nom complet
                </label>
                <input
                  type="text"
                  required
                  value={customerName || user?.name || ''}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ex: Sorelle Kamga / Franck Ndjock"
                  className="w-full h-11 px-3.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Téléphone (WhatsApp / Appel +237)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl bg-[#E6E3DC] border border-r-0 border-neutral-300 text-xs font-bold text-neutral-800">
                    +237
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone || user?.phone || ''}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="6 99 00 11 22"
                    className="w-full h-11 px-3.5 rounded-r-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              {!user && (
                <label className="flex items-start gap-2.5 p-3 rounded-xl bg-[#ECE9E2] cursor-pointer text-xs text-neutral-800">
                  <input
                    type="checkbox"
                    checked={createAccountOnPay}
                    onChange={(e) => setCreateAccountOnPay(e.target.checked)}
                    className="mt-0.5 accent-[#111111]"
                  />
                  <span>
                    <strong>Créer mon compte client TCHOKOS</strong> automatiquement pour
                    suivre ma commande et enregistrer mon adresse.
                  </span>
                </label>
              )}

              {/* City & Quarter */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Ville de livraison
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      onSelectCity(e.target.value);
                      setQuarter('');
                    }}
                    className="w-full h-11 px-3 rounded-xl bg-white border border-neutral-300 text-sm font-medium focus:outline-none focus:border-[#111111]"
                  >
                    {CAMEROON_CITIES.map((c) => (
                      <option key={c.city} value={c.city}>
                        {c.city}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Quartier / Repère
                  </label>
                  <select
                    value={quarter}
                    onChange={(e) => setQuarter(e.target.value)}
                    required
                    className="w-full h-11 px-3 rounded-xl bg-white border border-neutral-300 text-sm font-medium focus:outline-none focus:border-[#111111]"
                  >
                    <option value="">Choisir un quartier</option>
                    {cityObj.zones.map((z) => (
                      <option key={z} value={z}>
                        {z}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#ECE9E2] flex items-center gap-2.5 text-xs text-neutral-700">
                <MapPin className="w-4 h-4 text-[#111111] shrink-0" />
                <span>
                  <strong>{cityObj.city} :</strong> {cityObj.eta}
                </span>
              </div>

              {/* Payment Mode */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                  Mode de paiement au Cameroun
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mtn')}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                      paymentMethod === 'mtn'
                        ? 'border-[#111111] bg-white shadow-xs'
                        : 'border-neutral-300 bg-white/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-amber-400 text-black font-extrabold text-[10px] flex items-center justify-center">
                        MoMo
                      </span>
                      <div>
                        <div className="text-xs font-bold text-[#111111]">
                          MTN Mobile Money
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Validation rapide via *126# sur votre mobile
                        </div>
                      </div>
                    </div>
                    <Smartphone className="w-4 h-4 text-neutral-500" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('orange')}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                      paymentMethod === 'orange'
                        ? 'border-[#111111] bg-white shadow-xs'
                        : 'border-neutral-300 bg-white/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-orange-500 text-white font-extrabold text-[10px] flex items-center justify-center">
                        OM
                      </span>
                      <div>
                        <div className="text-xs font-bold text-[#111111]">
                          Orange Money Cameroun
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Paiement sécurisé #150# sans frais supplémentaires
                        </div>
                      </div>
                    </div>
                    <Smartphone className="w-4 h-4 text-neutral-500" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#111111] bg-white shadow-xs'
                        : 'border-neutral-300 bg-white/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-neutral-900 text-white font-extrabold text-[10px] flex items-center justify-center">
                        CASH
                      </span>
                      <div>
                        <div className="text-xs font-bold text-[#111111]">
                          Paiement à la livraison
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Vérifiez votre article avant de régler au livreur
                        </div>
                      </div>
                    </div>
                    <Banknote className="w-4 h-4 text-neutral-500" />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 space-y-3">
              <div className="flex justify-between text-base font-extrabold text-[#111111]">
                <span>Total net (FCFA)</span>
                <span>{formatCFA(total)}</span>
              </div>
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#111111] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-lg"
              >
                <ShieldCheck className="w-4 h-4" /> Confirmer ma commande ({formatCFA(total)})
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Order Confirmed */}
        {step === 'success' && (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
              TCHOKOS • C'EST DIFFICILE MAIS C'EST POSSIBLE
            </span>
            <h4 className="font-display text-2xl font-bold text-[#111111] mt-1">
              Merci {customerName || user?.name || 'cher client'} !
            </h4>
            <p className="text-xs text-neutral-600 mt-2 max-w-xs leading-relaxed">
              Votre commande <strong className="text-[#111111]">{orderRef}</strong> a bien
              été enregistrée pour <strong>{selectedCity}</strong> ({quarter || 'Centre'}).
              Notre service client vous contactera au <strong>+237 {phone}</strong> dans
              les 15 minutes.
            </p>
            <button
              type="button"
              onClick={resetAndClose}
              className="mt-6 px-6 h-11 rounded-xl bg-[#111111] text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              Continuer mes achats
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
