import React from 'react';
import { Volume2, VolumeX, Settings, Home, Mic } from 'lucide-react';
import { PuduAvatar } from './PuduAvatar';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  onGoHome?: () => void;
  onOpenOralLab?: () => void;
  onOpenSoundscapes?: () => void;
  soundscapePlaying?: boolean;
  currentScreen?: 'home' | 'subjects' | 'course' | 'oral';
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenSettings,
  onGoHome,
  onOpenOralLab,
  onOpenSoundscapes,
  soundscapePlaying = false,
  currentScreen = 'home',
}) => {
  return (
    <header className="border-b border-stone-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-2xs w-full">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 w-full">
        {/* Brand identity - Minimalist & Never overflowing */}
        <div
          onClick={onGoHome}
          className={`flex items-center gap-2 shrink-0 select-none ${
            onGoHome ? 'cursor-pointer group' : ''
          }`}
          title="Ir al inicio de cursos"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-300/60 flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform shrink-0 overflow-hidden">
            <PuduAvatar mood="happy" size="xs" showSpeechBubble={false} />
          </div>
          <div>
            <span className="text-sm sm:text-base font-black text-stone-900 tracking-tight group-hover:text-amber-700 transition-colors">
              Pudú Mineduc
            </span>
            <span className="text-[9px] font-black uppercase ml-1.5 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 hidden md:inline-block">
              1° a 4° Básico
            </span>
          </div>
        </div>

        {/* Center navigation pills (Visible on tablet & desktop, hidden on mobile in favor of bottom nav) */}
        <nav className="hidden sm:flex items-center gap-1 bg-stone-100 p-1 rounded-2xl border border-stone-200/80 shrink-0">
          <button
            type="button"
            id="nav-btn-courses"
            onClick={onGoHome}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
              currentScreen === 'home' || currentScreen === 'subjects' || currentScreen === 'course'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Cursos</span>
          </button>

          {onOpenOralLab && (
            <button
              type="button"
              id="nav-btn-oral-lab"
              onClick={onOpenOralLab}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                currentScreen === 'oral'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <Mic className={`w-3.5 h-3.5 shrink-0 ${currentScreen === 'oral' ? 'text-white' : 'text-emerald-600'}`} />
              <span>Taller de Voz</span>
            </button>
          )}
        </nav>

        {/* Right utility cluster: Soundscapes, Sound Toggle & Settings */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Paisajes Sonoros de Chile (Ambientes Naturales DUA) */}
          {onOpenSoundscapes && (
            <button
              type="button"
              id="btn-open-soundscapes"
              onClick={onOpenSoundscapes}
              className={`h-8 sm:h-9 px-2 sm:px-2.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-2xs shrink-0 text-xs font-bold ${
                soundscapePlaying
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-2 ring-emerald-200'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-600 border-stone-200'
              }`}
              title="Paisajes Sonoros de Chile (Ambientes de concentración)"
              aria-label="Abrir paisajes sonoros"
            >
              <span className="text-sm select-none">🍃</span>
              <span className="hidden md:inline">
                {soundscapePlaying ? 'Ambiente Activo' : 'Paisaje Sonoro'}
              </span>
              {soundscapePlaying && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </button>
          )}

          {/* Sound Toggle (Parlante) */}
          <button
            type="button"
            id="btn-toggle-sound"
            onClick={onToggleSound}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs shrink-0 ${
              soundEnabled
                ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                : 'bg-stone-100 text-stone-400 border-stone-200 hover:bg-stone-200'
            }`}
            title={soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
            aria-label={soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-amber-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-400" />
            )}
          </button>

          {/* Settings & Accessibility Hub */}
          <button
            type="button"
            id="btn-open-settings"
            onClick={onOpenSettings}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-200 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs shrink-0"
            title="Ajustes de accesibilidad (letra, sonido, currículum)"
            aria-label="Abrir ajustes"
          >
            <Settings className="w-4 h-4 text-stone-600" />
          </button>
        </div>
      </div>
    </header>
  );
};
