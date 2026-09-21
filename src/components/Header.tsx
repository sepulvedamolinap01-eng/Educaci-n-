import React from 'react';
import { BookOpen, Volume2, VolumeX, Award, Type, Mic, Home } from 'lucide-react';
import { PuduAvatar } from './PuduAvatar';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenCurriculum: () => void;
  onGoHome?: () => void;
  onOpenOralLab?: () => void;
  currentScreen?: 'home' | 'subjects' | 'course' | 'oral';
  fontSize?: 'normal' | 'grande' | 'gigante';
  onChangeFontSize?: (size: 'normal' | 'grande' | 'gigante') => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenCurriculum,
  onGoHome,
  onOpenOralLab,
  currentScreen = 'home',
  fontSize = 'normal',
  onChangeFontSize,
}) => {
  return (
    <header className="border-b border-stone-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-2xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand identity - Friendly & Clean */}
        <div
          onClick={onGoHome}
          className={`flex items-center gap-2.5 ${onGoHome ? 'cursor-pointer select-none group' : ''}`}
          title={onGoHome ? 'Ir al inicio de cursos' : undefined}
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-300/60 flex items-center justify-center p-1 group-hover:scale-105 transition-transform shrink-0">
            <PuduAvatar mood="happy" size="sm" showSpeechBubble={false} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-black text-stone-900 tracking-tight group-hover:text-amber-700 transition-colors">
                Pudú Mineduc
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                1° a 4° Básico
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-medium hidden sm:block">
              Aprender jugando • Currículum Nacional Chile
            </p>
          </div>
        </div>

        {/* Center Mode Switcher Pills (Kid-Friendly App Navigation) */}
        <nav className="flex items-center gap-1 bg-stone-100 p-1 rounded-2xl border border-stone-200/80">
          <button
            type="button"
            id="nav-btn-courses"
            onClick={onGoHome}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
              currentScreen === 'home'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/80'
            }`}
            title="Volver a la pantalla principal de cursos"
          >
            <Home className="w-3.5 h-3.5 text-amber-600" />
            <span>Inicio</span>
          </button>

          {onOpenOralLab && (
            <button
              type="button"
              id="nav-btn-oral-lab"
              onClick={onOpenOralLab}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                currentScreen === 'oral'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
              title="Taller de Expresión Oral y Lectura con Pudú"
            >
              <Mic className={`w-3.5 h-3.5 ${currentScreen === 'oral' ? 'text-white' : 'text-emerald-600'}`} />
              <span className="hidden xs:inline">Taller Oral</span>
              <span className="xs:hidden">Voz</span>
            </button>
          )}
        </nav>

        {/* Right utility cluster: Clean discrete controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Font Size DUA Toggle (Minimalist 2-state or 3-state) */}
          {onChangeFontSize && (
            <div className="flex items-center bg-stone-100 rounded-xl p-0.5 border border-stone-200/80 text-xs">
              <button
                type="button"
                id="btn-font-toggle"
                onClick={() => {
                  const next = fontSize === 'normal' ? 'grande' : fontSize === 'grande' ? 'gigante' : 'normal';
                  onChangeFontSize(next);
                }}
                className="px-2 py-1 rounded-lg text-xs font-bold text-stone-700 hover:text-stone-900 cursor-pointer inline-flex items-center gap-1"
                title="Cambiar tamaño de letra (Accesibilidad DUA)"
              >
                <Type className="w-3.5 h-3.5 text-stone-500" />
                <span className="font-mono text-[11px] font-black">
                  {fontSize === 'normal' ? '1x' : fontSize === 'grande' ? '1.5x' : '2x'}
                </span>
              </button>
            </div>
          )}

          {/* Sound Toggle */}
          <button
            type="button"
            id="btn-toggle-sound"
            onClick={onToggleSound}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
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

          {/* Teacher/Parent OAs Curriculum Modal */}
          <button
            type="button"
            id="btn-curriculum-guide"
            onClick={onOpenCurriculum}
            className="p-2 rounded-xl text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors cursor-pointer"
            title="Ver matriz curricular oficial Mineduc (OAs)"
            aria-label="Ver matriz curricular oficial Mineduc"
          >
            <Award className="w-4 h-4 text-amber-600" />
          </button>
        </div>
      </div>
    </header>
  );
};
