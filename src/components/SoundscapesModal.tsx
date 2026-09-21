import React, { useState, useEffect } from 'react';
import { X, Play, Square, Volume2, Sparkles, Wind, Waves, Trees, Droplets, Mountain } from 'lucide-react';
import {
  chileanSoundscapes,
  SOUNDSCAPE_PRESETS,
  SoundscapeBiome,
} from '../utils/chileanSoundscapes';
import { soundFx } from '../utils/soundEffects';

interface SoundscapesModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeBiome: SoundscapeBiome;
  isPlaying: boolean;
  onTogglePlay: (biome?: SoundscapeBiome) => void;
  onSelectBiome: (biome: SoundscapeBiome) => void;
}

export const SoundscapesModal: React.FC<SoundscapesModalProps> = ({
  isOpen,
  onClose,
  activeBiome,
  isPlaying,
  onTogglePlay,
  onSelectBiome,
}) => {
  const [volume, setVolume] = useState<number>(() => Math.round(chileanSoundscapes.getVolume() * 100));

  useEffect(() => {
    setVolume(Math.round(chileanSoundscapes.getVolume() * 100));
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPreset = SOUNDSCAPE_PRESETS[activeBiome];

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setVolume(val);
    chileanSoundscapes.setVolume(val / 100);
  };

  const biomesList: { id: SoundscapeBiome; icon: any }[] = [
    { id: 'bosque', icon: Trees },
    { id: 'oceano', icon: Waves },
    { id: 'cordillera', icon: Mountain },
    { id: 'quebrada', icon: Wind },
    { id: 'humedal', icon: Droplets },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl border border-stone-200 shadow-xl overflow-hidden animate-in slide-in-from-bottom duration-250 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center font-black text-lg">
              🍃
            </div>
            <div>
              <h3 className="font-black text-stone-900 text-base leading-tight">
                Paisajes Sonoros de Chile
              </h3>
              <p className="text-[11px] text-stone-500">
                Sonidos naturales ambientales para la concentración y la calma (DUA)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
          {/* Main Active Landscape Card */}
          <div
            className={`p-4 sm:p-5 rounded-3xl border text-center transition-all shadow-xs ${
              isPlaying
                ? 'bg-gradient-to-b from-stone-900 to-stone-800 text-white border-stone-900'
                : 'bg-stone-50 text-stone-900 border-stone-200'
            }`}
          >
            <div className="text-4xl sm:text-5xl mb-2 select-none animate-bounce">
              {currentPreset.emoji}
            </div>
            <h4 className="text-lg font-black tracking-tight">{currentPreset.nombre}</h4>
            <p className={`text-xs mt-0.5 ${isPlaying ? 'text-stone-300' : 'text-stone-500'}`}>
              {currentPreset.subtitulo}
            </p>

            <p className={`text-xs italic mt-2 max-w-sm mx-auto leading-relaxed ${isPlaying ? 'text-stone-400' : 'text-stone-600'}`}>
              «{currentPreset.descripcion}»
            </p>

            {/* Play/Stop Master Button */}
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                id="btn-soundscape-toggle-play"
                onClick={() => {
                  soundFx.playPop();
                  onTogglePlay(activeBiome);
                }}
                className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm inline-flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95 ${
                  isPlaying
                    ? 'bg-rose-500 hover:bg-rose-600 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Square className="w-4 h-4 fill-current" />
                    <span>Pausar Paisaje Sonoro</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Reproducir Ambiente</span>
                  </>
                )}
              </button>
            </div>

            {/* Visualizer waves indicator */}
            {isPlaying && (
              <div className="flex items-center justify-center gap-1.5 mt-3">
                <span className="w-1.5 h-3 bg-emerald-400 rounded-full animate-pulse" />
                <span className="w-1.5 h-6 bg-emerald-400 rounded-full animate-pulse delay-75" />
                <span className="w-1.5 h-4 bg-emerald-400 rounded-full animate-pulse delay-150" />
                <span className="w-1.5 h-7 bg-emerald-400 rounded-full animate-pulse delay-100" />
                <span className="w-1.5 h-3 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-[10px] text-emerald-400 font-bold ml-1 uppercase tracking-wider">
                  Sonando en vivo
                </span>
              </div>
            )}
          </div>

          {/* Biome Selection Grid */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block px-1">
              Elige un Ecosistema de Chile:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {biomesList.map(({ id, icon: Icon }) => {
                const preset = SOUNDSCAPE_PRESETS[id];
                const isSelected = activeBiome === id;
                return (
                  <button
                    key={id}
                    type="button"
                    id={`biome-select-${id}`}
                    onClick={() => {
                      soundFx.playPop();
                      onSelectBiome(id);
                      if (isPlaying) {
                        chileanSoundscapes.start(id);
                      }
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-200'
                        : 'bg-white hover:bg-stone-50 border-stone-200'
                    }`}
                  >
                    <span className="text-2xl select-none">{preset.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-stone-900 truncate">
                          {preset.nombre}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-black text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-md shrink-0">
                            Activo
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 truncate mt-0.5">
                        {preset.animalRelacionado} • {preset.subtitulo.split(' ')[0]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Volume Slider */}
          <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-stone-500" />
                <span>Volumen ambiental</span>
              </span>
              <span className="font-mono text-stone-500">{volume}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-medium">
              <span>Suave (estudio)</span>
              <span>Medio</span>
              <span>Inmersivo</span>
            </div>
          </div>

          {/* DUA Pedagogical Benefit Note */}
          <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-200/80 text-[11px] text-blue-950 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Beneficio DUA / PIE:</strong> Los sonidos suaves de la naturaleza atenúan los ruidos distractores de la sala o el hogar, favoreciendo el ritmo cardíaco sereno y el foco atencional en niños durante la lectura y el cálculo.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-stone-100 bg-stone-50 text-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
