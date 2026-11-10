import React, { useState } from 'react';
import { X, User, Lock, Phone, Mail, MapPin, CheckCircle2, LogOut, Sparkles } from 'lucide-react';
import { CAMEROON_CITIES } from '../data/products';

export interface UserAccount {
  name: string;
  phone: string;
  email: string;
  city: string;
}

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount | null;
  onLoginSuccess: (account: UserAccount) => void;
  onLogout: () => void;
  defaultCity: string;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  user,
  onLoginSuccess,
  onLogout,
  defaultCity,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState(defaultCity);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName =
      mode === 'register' && name.trim()
        ? name.trim()
        : email.split('@')[0] || 'Client Tchokos';
    onLoginSuccess({
      name: finalName,
      phone: phone.trim() || '6 90 00 00 00',
      email: email.trim() || 'client@tchokos.cm',
      city,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#F6F4EF] rounded-3xl overflow-hidden shadow-2xl border border-black/10 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-neutral-700 flex items-center justify-center hover:bg-[#111111] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with Logo */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src="/assets/tchokos-logo.png"
            alt="TCHOKOS"
            className="w-12 h-12 rounded-full bg-black p-0.5 object-contain"
          />
          <div>
            <h3 className="font-display text-xl font-extrabold text-[#111111]">
              {user ? 'Mon Espace TCHOKOS' : 'Compte Client TCHOKOS'}
            </h3>
            <p className="text-xs text-neutral-500">
              C'est difficile mais c'est possible
            </p>
          </div>
        </div>

        {user ? (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-black/8 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Compte actif et vérifié</span>
              </div>
              <div className="text-sm font-bold text-[#111111]">{user.name}</div>
              <div className="text-xs text-neutral-600 space-y-1">
                <div>Téléphone : +237 {user.phone}</div>
                <div>Email : {user.email}</div>
                <div>Ville préférée : {user.city}</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#ECE9E2] text-xs text-neutral-700 space-y-1">
              <div className="font-bold text-[#111111] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Avantages Membre TCHOKOS
              </div>
              <p>
                Vos coordonnées sont préremplies lors du paiement et vous bénéficiez du
                suivi rapide de vos commandes sur WhatsApp.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full h-11 rounded-xl border border-red-300 bg-white text-red-700 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Se déconnecter
            </button>
          </div>
        ) : (
          <>
            {/* Mode Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#E6E3DC] rounded-xl mb-5">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-[#111111]'
                }`}
              >
                Connexion
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-[#111111]'
                }`}
              >
                Créer un compte
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'register' && (
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Nom complet
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Sorelle Kamga"
                      className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Numéro de téléphone (+237)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="6 99 00 11 22"
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@email.com"
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Ville au Cameroun
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#111111]"
                    >
                      {CAMEROON_CITIES.map((c) => (
                        <option key={c.city} value={c.city}>
                          {c.city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#111111] text-white font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-md mt-2 cursor-pointer"
              >
                {mode === 'login' ? 'Se connecter' : 'Créer mon compte TCHOKOS'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
