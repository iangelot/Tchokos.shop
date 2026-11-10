import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TchokosGlassReveal } from '@/components/ui/liquid-glass-logo-reveal';

interface IntroSplashProps {
  onFinish: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onFinish }) => {
  const [exiting, setExiting] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => {
      setTextVisible(true);
    }, 450);

    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 3400);

    const doneTimer = setTimeout(() => {
      onFinish();
    }, 4100);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  const handleSkip = () => {
    setExiting(true);
    setTimeout(() => {
      onFinish();
    }, 450);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#F4F1EC] px-4 py-8 transition-all duration-700 ease-out ${
        exiting
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Top subtle label */}
      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-500">
        <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
        <span>BIENVENUE CHEZ TCHOKOS CAMEROUN</span>
      </div>

      {/* Center WebGL2 Liquid Glass Logo Reveal + Brand Typography */}
      <div className="flex flex-col items-center justify-center w-full max-w-md my-auto">
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
          <TchokosGlassReveal
            loop={false}
            speed={1.05}
            tileSize={260}
            className="w-full h-full rounded-3xl"
          />
        </div>

        <div
          className={`text-center mt-2 transition-all duration-700 ${
            textVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111111]">
            TCHOKOS
          </h1>
          <p className="text-sm sm:text-base font-semibold italic text-neutral-600 mt-1.5">
            C'est difficile mais c'est possible
          </p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-bold mt-3">
            Chaussures • Robes • Vêtements • Sacs • Enfants
          </p>
        </div>
      </div>

      {/* Bottom Enter / Skip Button */}
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleSkip}
          className="px-6 h-11 rounded-full bg-[#111111] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-neutral-800 transition-all shadow-md cursor-pointer"
        >
          <span>Entrer dans la boutique</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
