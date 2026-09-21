import React from 'react';
import { Home, Mic, Award, Settings } from 'lucide-react';

interface BottomNavProps {
  currentScreen: 'home' | 'subjects' | 'course' | 'oral';
  onGoHome: () => void;
  onOpenOralLab: () => void;
  onOpenAlbum: () => void;
  onOpenSettings: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onGoHome,
  onOpenOralLab,
  onOpenAlbum,
  onOpenSettings,
}) => {
  return (
    <nav
      id="mobile-bottom-nav"
      aria-label="Navegación principal móvil"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 px-3 py-1.5 flex items-center justify-around shadow-lg"
    >
      {/* 1. Inicio / Cursos */}
      <button
        type="button"
        id="bottom-nav-home"
        onClick={onGoHome}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
          currentScreen === 'home' || currentScreen === 'subjects' || currentScreen === 'course'
            ? 'text-amber-700 font-black'
            : 'text-stone-500 hover:text-stone-800 font-semibold'
        }`}
      >
        <Home className={`w-5 h-5 ${currentScreen === 'home' || currentScreen === 'subjects' || currentScreen === 'course' ? 'text-amber-600' : 'text-stone-400'}`} />
        <span className="text-[11px] mt-0.5">Cursos</span>
      </button>

      {/* 2. Taller de Voz */}
      <button
        type="button"
        id="bottom-nav-oral"
        onClick={onOpenOralLab}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
          currentScreen === 'oral'
            ? 'text-emerald-700 font-black'
            : 'text-stone-500 hover:text-stone-800 font-semibold'
        }`}
      >
        <Mic className={`w-5 h-5 ${currentScreen === 'oral' ? 'text-emerald-600' : 'text-stone-400'}`} />
        <span className="text-[11px] mt-0.5">Taller Voz</span>
      </button>

      {/* 3. Mi Álbum de Láminas */}
      <button
        type="button"
        id="bottom-nav-album"
        onClick={onOpenAlbum}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-stone-500 hover:text-stone-800 font-semibold transition-all cursor-pointer"
      >
        <Award className="w-5 h-5 text-amber-500" />
        <span className="text-[11px] mt-0.5">Álbum</span>
      </button>

      {/* 4. Ajustes / Docente */}
      <button
        type="button"
        id="bottom-nav-settings"
        onClick={onOpenSettings}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-stone-500 hover:text-stone-800 font-semibold transition-all cursor-pointer"
      >
        <Settings className="w-5 h-5 text-stone-400" />
        <span className="text-[11px] mt-0.5">Ajustes</span>
      </button>
    </nav>
  );
};
