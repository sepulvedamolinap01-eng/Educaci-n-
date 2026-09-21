import React, { useState } from 'react';
import { X, Volume2, Sparkles, MapPin, Compass } from 'lucide-react';
import { FaunaAvatar, FaunaSpecies, FAUNA_GUIDES_INFO } from './FaunaAvatars';
import { speechReader } from '../utils/speechReader';
import { soundFx } from '../utils/soundEffects';

interface FaunaGuiaModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  initialSpecies?: FaunaSpecies;
}

export const FaunaGuiaModal: React.FC<FaunaGuiaModalProps> = ({
  isOpen,
  onClose,
  soundEnabled,
  initialSpecies = 'pudu',
}) => {
  const [selectedSpecies, setSelectedSpecies] = useState<FaunaSpecies>(initialSpecies);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentGuide = FAUNA_GUIDES_INFO[selectedSpecies];

  const handleSelect = (sp: FaunaSpecies) => {
    if (soundEnabled) soundFx.playPop();
    setSelectedSpecies(sp);
    speechReader.stop();
    setIsSpeaking(false);
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      speechReader.stop();
      setIsSpeaking(false);
    } else {
      const speechText = `${currentGuide.nombre}. Soy el guía de ${currentGuide.rol}. Vivo en ${currentGuide.region}. ${currentGuide.saludo}`;
      speechReader.speak(speechText, {
        rate: 0.9,
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-stone-900 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🇨🇱</span>
            <div>
              <h3 className="font-black text-sm text-white leading-none">
                Guías de la Fauna Chilena
              </h3>
              <p className="text-[11px] text-stone-300 mt-0.5 font-medium">
                6 animalitos nativos que te acompañan en tu aprendizaje
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mascot Selector Tabs */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 p-2 bg-stone-100 border-b border-stone-200">
          {(['llama', 'pinguino', 'condor', 'puma', 'rana', 'pudu'] as FaunaSpecies[]).map((sp) => {
            const info = FAUNA_GUIDES_INFO[sp];
            const isSelected = selectedSpecies === sp;
            return (
              <button
                key={sp}
                type="button"
                onClick={() => handleSelect(sp)}
                className={`py-2 px-1 rounded-2xl flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white shadow-xs border border-stone-300 scale-102'
                    : 'hover:bg-stone-200/60 opacity-80'
                }`}
              >
                <FaunaAvatar species={sp} size="xs" mood={isSelected ? 'happy' : 'idle'} />
                <span className={`text-[10px] font-black truncate max-w-[70px] ${isSelected ? 'text-stone-900' : 'text-stone-600'}`}>
                  {info.nombre.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Guide Details */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className={`${currentGuide.colorBg} rounded-3xl border ${currentGuide.colorBorder} p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left`}>
            <FaunaAvatar
              species={selectedSpecies}
              size="lg"
              mood={isSpeaking ? 'speaking' : 'happy'}
            />
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                <h4 className="text-lg font-black text-stone-900 leading-none">
                  {currentGuide.nombre}
                </h4>
                <span className="text-[10px] italic text-stone-500">
                  ({currentGuide.especie})
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 justify-center sm:justify-start">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{currentGuide.region}</span>
              </div>

              <div className="pt-1">
                <span className={`text-xs font-black px-2.5 py-1 rounded-full ${currentGuide.colorPill} inline-block shadow-2xs`}>
                  {currentGuide.rol}
                </span>
              </div>
            </div>
          </div>

          {/* Guide's Message */}
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Mensaje de {currentGuide.nombre}:
              </span>
              <button
                type="button"
                onClick={handleSpeak}
                className={`px-3 py-1 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer border ${
                  isSpeaking
                    ? 'bg-red-600 text-white border-red-700 animate-pulse'
                    : 'bg-white hover:bg-stone-100 text-stone-800 border-stone-300'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                <span>{isSpeaking ? 'Detener' : 'Escuchar voz 🔊'}</span>
              </button>
            </div>

            <p className="text-sm font-medium text-stone-800 leading-relaxed italic bg-white p-3 rounded-xl border border-stone-200/80">
              "{currentGuide.saludo}"
            </p>

            <div className="text-[11px] text-stone-500 flex items-center gap-1 pt-1">
              <Compass className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>Encontrarás a este guía acompañándote en cada lección y desafío de su materia.</span>
            </div>
          </div>
        </div>

        {/* Footer Button */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            ¡Entendido, vamos a aprender!
          </button>
        </div>
      </div>
    </div>
  );
};
