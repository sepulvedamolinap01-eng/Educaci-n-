import React from 'react';
import { DuaSettings } from '../types';
import {
  Sparkles,
  Type,
  Maximize2,
  Minimize2,
  Volume2,
  Eye,
  Sliders,
  HeartHandshake,
  Check,
  RotateCcw,
} from 'lucide-react';

interface DuaToolbarProps {
  settings: DuaSettings;
  onChangeSettings: (newSettings: DuaSettings) => void;
  selectedNivel: string;
}

export const DuaToolbar: React.FC<DuaToolbarProps> = ({
  settings,
  onChangeSettings,
  selectedNivel,
}) => {
  const isEarlyGrade = selectedNivel === '1° Básico' || selectedNivel === '2° Básico';

  const updateSetting = <K extends keyof DuaSettings>(key: K, value: DuaSettings[K]) => {
    onChangeSettings({
      ...settings,
      [key]: value,
    });
  };

  const handleReset = () => {
    onChangeSettings({
      fontSize: 'normal',
      syllableMode: false,
      readingRuler: false,
      speechSpeed: 'slow',
      sensoryMode: 'standard',
    });
  };

  const hasCustomSettings =
    settings.fontSize !== 'normal' ||
    settings.syllableMode ||
    settings.readingRuler ||
    settings.speechSpeed !== 'slow' ||
    settings.sensoryMode !== 'standard';

  return (
    <div
      className={`rounded-2xl border p-4 mb-5 transition-all shadow-xs ${
        settings.sensoryMode === 'calm'
          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
          : 'bg-white border-amber-200/90 text-stone-800'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-stone-200/60">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-xl text-white flex items-center justify-center shadow-2xs ${
              settings.sensoryMode === 'calm' ? 'bg-emerald-600' : 'bg-amber-600'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold tracking-tight text-stone-900">
                Herramientas de Inclusión y Apoyo (DUA - PIE)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                Para Todos los Ritmos
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              Adaptaciones accesibles para que ningún niño se quede atrás, desde 1° Básico con necesidades de apoyo hasta lectores avanzados.
            </p>
          </div>
        </div>

        {hasCustomSettings && (
          <button
            type="button"
            id="btn-reset-dua-settings"
            onClick={handleReset}
            className="text-xs font-bold text-stone-500 hover:text-stone-800 inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Restablecer apoyos</span>
          </button>
        )}
      </div>

      {/* Control Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 text-xs">
        {/* 1. Font Size Control */}
        <div className="p-2 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
          <span className="font-bold text-stone-600 text-[11px] mb-1.5 flex items-center gap-1">
            <Type className="w-3.5 h-3.5 text-amber-600" />
            Tamaño de Letra
          </span>
          <div className="grid grid-cols-3 gap-1 bg-white p-0.5 rounded-lg border border-stone-200">
            {(['normal', 'grande', 'gigante'] as const).map((size) => {
              const active = settings.fontSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  id={`btn-fontsize-${size}`}
                  onClick={() => updateSetting('fontSize', size)}
                  className={`py-1 rounded text-center font-bold text-xs transition-all cursor-pointer ${
                    active
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                  title={`Tamaño ${size}`}
                >
                  {size === 'normal' ? 'A' : size === 'grande' ? 'A+' : 'A++'}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Syllable Mode Toggle (especially vital for 1° and 2° Básico) */}
        <button
          type="button"
          id="btn-toggle-syllables"
          onClick={() => updateSetting('syllableMode', !settings.syllableMode)}
          className={`p-2 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
            settings.syllableMode
              ? 'bg-amber-500 text-white border-amber-600 shadow-2xs ring-1 ring-amber-400'
              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[11px] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Modo Sílabas
            </span>
            {isEarlyGrade && (
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                  settings.syllableMode ? 'bg-amber-700 text-amber-100' : 'bg-amber-100 text-amber-800'
                }`}
              >
                1° Básico
              </span>
            )}
          </div>
          <div
            className={`text-[11px] leading-tight font-medium ${
              settings.syllableMode ? 'text-amber-100' : 'text-stone-500'
            }`}
          >
            {settings.syllableMode ? 'Ma·tí·as le·e fá·cil' : 'Separa sílabas (fonético)'}
          </div>
        </button>

        {/* 3. Reading Ruler (Focus Guide for ADHD / Dyslexia / Early readers) */}
        <button
          type="button"
          id="btn-toggle-reading-ruler"
          onClick={() => updateSetting('readingRuler', !settings.readingRuler)}
          className={`p-2 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
            settings.readingRuler
              ? 'bg-indigo-600 text-white border-indigo-700 shadow-2xs ring-1 ring-indigo-400'
              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[11px] flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              Regla de Enfoque
            </span>
            {settings.readingRuler && <Check className="w-3 h-3 text-indigo-200" />}
          </div>
          <div
            className={`text-[11px] leading-tight font-medium ${
              settings.readingRuler ? 'text-indigo-100' : 'text-stone-500'
            }`}
          >
            {settings.readingRuler ? 'Guía visual activa' : 'Sigue la línea al leer'}
          </div>
        </button>

        {/* 4. Speech Speed (slow for 1° and students who need more processing time) */}
        <div className="p-2 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
          <span className="font-bold text-stone-600 text-[11px] mb-1.5 flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5 text-amber-600" />
            Voz del Profesor
          </span>
          <div className="grid grid-cols-2 gap-1 bg-white p-0.5 rounded-lg border border-stone-200">
            <button
              type="button"
              id="btn-speech-speed-slow"
              onClick={() => updateSetting('speechSpeed', 'slow')}
              className={`py-1 rounded text-center font-bold text-[11px] transition-all cursor-pointer ${
                settings.speechSpeed === 'slow'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
              title="Lectura pausada y clara para 1° Básico"
            >
              🐢 Pausado
            </button>
            <button
              type="button"
              id="btn-speech-speed-normal"
              onClick={() => updateSetting('speechSpeed', 'normal')}
              className={`py-1 rounded text-center font-bold text-[11px] transition-all cursor-pointer ${
                settings.speechSpeed === 'normal'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
              title="Lectura a ritmo estándar"
            >
              🐇 Normal
            </button>
          </div>
        </div>

        {/* 5. Sensory Calm Mode (for sensory sensitivity / Autism Spectrum) */}
        <button
          type="button"
          id="btn-toggle-sensory-mode"
          onClick={() =>
            updateSetting('sensoryMode', settings.sensoryMode === 'calm' ? 'standard' : 'calm')
          }
          className={`p-2 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer col-span-2 sm:col-span-1 ${
            settings.sensoryMode === 'calm'
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs ring-1 ring-emerald-400'
              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[11px] flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5" />
              Modo Calma
            </span>
            {settings.sensoryMode === 'calm' && <Check className="w-3 h-3 text-emerald-200" />}
          </div>
          <div
            className={`text-[11px] leading-tight font-medium ${
              settings.sensoryMode === 'calm' ? 'text-emerald-100' : 'text-stone-500'
            }`}
          >
            {settings.sensoryMode === 'calm' ? 'Tonos suaves activos' : 'Colores relajantes (TEA)'}
          </div>
        </button>
      </div>
    </div>
  );
};
