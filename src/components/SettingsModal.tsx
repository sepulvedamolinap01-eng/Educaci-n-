import React from 'react';
import { X, Volume2, VolumeX, Type, Award, Sparkles, BookOpen } from 'lucide-react';
import { DuaSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  duaSettings: DuaSettings;
  onChangeDuaSettings: React.Dispatch<React.SetStateAction<DuaSettings>>;
  onOpenCurriculum: () => void;
  onOpenSoundscapes?: () => void;
  soundscapePlaying?: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  soundEnabled,
  onToggleSound,
  duaSettings,
  onChangeDuaSettings,
  onOpenCurriculum,
  onOpenSoundscapes,
  soundscapePlaying = false,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-stone-200 shadow-xl overflow-hidden animate-in slide-in-from-bottom duration-250 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
              ⚙️
            </div>
            <h3 className="font-black text-stone-900 text-base">
              Ajustes y Accesibilidad
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
          {/* Tamaño de texto */}
          <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Type className="w-4 h-4 text-stone-500" />
                <span>Tamaño de letra (DUA)</span>
              </span>
              <span className="text-[11px] font-mono text-stone-500 font-bold">
                {duaSettings.fontSize === 'normal' ? 'Estándar (1x)' : duaSettings.fontSize === 'grande' ? 'Grande (1.5x)' : 'Gigante (2x)'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'grande', 'gigante'] as const).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => onChangeDuaSettings((prev) => ({ ...prev, fontSize: size }))}
                  className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                    duaSettings.fontSize === size
                      ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {size === 'normal' ? '1x' : size === 'grande' ? '1.5x' : '2x'}
                </button>
              ))}
            </div>
          </div>

          {/* Sonido de la app */}
          <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${soundEnabled ? 'bg-amber-100 text-amber-800' : 'bg-stone-200 text-stone-500'}`}>
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </div>
              <div>
                <p className="text-xs font-bold text-stone-800">Efectos de sonido y voz</p>
                <p className="text-[11px] text-stone-500">Lectura asistida y sonidos interactivos</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggleSound}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                soundEnabled
                  ? 'bg-emerald-600 text-white border-emerald-700'
                  : 'bg-stone-200 text-stone-600 border-stone-300'
              }`}
            >
              {soundEnabled ? 'Activo' : 'Silencio'}
            </button>
          </div>

          {/* Modo lectura por sílabas */}
          <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200/80 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-stone-800">Lectura silábica</p>
              <p className="text-[11px] text-stone-500">Destacar separación en sílabas para lectura inicial</p>
            </div>
            <button
              type="button"
              onClick={() => onChangeDuaSettings((prev) => ({ ...prev, syllableMode: !prev.syllableMode }))}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                duaSettings.syllableMode
                  ? 'bg-amber-600 text-white border-amber-700'
                  : 'bg-white text-stone-600 border-stone-300'
              }`}
            >
              {duaSettings.syllableMode ? 'Activado' : 'Normal'}
            </button>
          </div>

          {/* Paisajes Sonoros de Chile (Ambiente Natural Relajante) */}
          {onOpenSoundscapes && (
            <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-base ${soundscapePlaying ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'}`}>
                  🍃
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-800">Paisajes Sonoros de Chile</p>
                  <p className="text-[11px] text-stone-500">
                    {soundscapePlaying ? 'Ambiente natural sonando' : 'Bosques, olas y viento andino (DUA)'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                id="btn-settings-open-soundscapes"
                onClick={() => {
                  onClose();
                  onOpenSoundscapes();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  soundscapePlaying
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-300'
                }`}
              >
                {soundscapePlaying ? 'Ajustar 🔊' : 'Elegir →'}
              </button>
            </div>
          )}

          {/* Currículum Oficial Mineduc */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenCurriculum();
            }}
            className="w-full p-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-950 flex items-center justify-between transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-amber-700 shrink-0" />
              <div>
                <p className="text-xs font-black text-amber-950">Matriz Curricular Oficial Mineduc</p>
                <p className="text-[11px] text-amber-800/80">Objetivos de Aprendizaje (OA) 1° a 4° Básico</p>
              </div>
            </div>
            <span className="text-xs font-black text-amber-800">Ver →</span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-stone-100 bg-stone-50 text-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
