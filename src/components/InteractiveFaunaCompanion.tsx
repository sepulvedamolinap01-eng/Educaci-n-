import React, { useState } from 'react';
import { FaunaSpecies, FaunaMood, FaunaAvatar } from './FaunaAvatars';
import { soundFx } from '../utils/soundEffects';
import { speechReader } from '../utils/speechReader';
import { Volume2, Sparkles, X, MessageCircle } from 'lucide-react';

interface InteractiveFaunaCompanionProps {
  species: FaunaSpecies;
  subjectName: string;
  onOpenAlbum?: () => void;
}

const COMPANION_DATA: Record<
  FaunaSpecies,
  {
    name: string;
    tagline: string;
    greeting: string;
    phrases: string[];
    themeColor: string;
  }
> = {
  rana: {
    name: 'Ranita de Darwin',
    tagline: 'Guía de Inglés y Sonidos',
    greeting: '¡Hello friend! ¡Soy la Ranita de Darwin de los bosques del sur! Toca las palabras para jugar.',
    phrases: [
      '¡Great job! ¡Lo estás haciendo súper bien!',
      '¡Me encanta saltar entre las palabras en inglés!',
      '¿Sabías que en el sur de Chile canto en los bosques lluviosos? ¡Ribbit!',
      '¡Toca el parlante para escuchar la pronunciación mágica!',
    ],
    themeColor: 'from-emerald-400 to-green-600',
  },
  pudu: {
    name: 'Pudú del Sur',
    tagline: 'Compañero de Lectura',
    greeting: '¡Hola! Soy el pequeño Pudú de los bosques nativos. ¡Me encanta descubrir cuentos contigo!',
    phrases: [
      '¡Qué lindo lees! Cada palabra te hace más sabio.',
      'Si una palabra te cuesta, ¡podemos escucharla juntos!',
      'En los bosques del sur me escondo entre los helechos.',
      '¡Sigue adelante, eres un gran lector!',
    ],
    themeColor: 'from-amber-500 to-orange-600',
  },
  pinguino: {
    name: 'Pingüino de Humboldt',
    tagline: 'Maestro de Números',
    greeting: '¡Hola! Soy el Pingüino de Humboldt de nuestras costas. ¡Los números son como nadar en el mar!',
    phrases: [
      '¡Contar y resolver es facilísimo cuando practicamos!',
      '¡Buceo rápido en el Océano Pacífico de Chile!',
      '¡Excelente razonamiento matemático!',
      '¡Tú puedes resolver cualquier desafío!',
    ],
    themeColor: 'from-cyan-400 to-blue-600',
  },
  condor: {
    name: 'Cóndor Andino',
    tagline: 'Vigía de la Historia',
    greeting: '¡Saludos, explorador! Desde las altas cumbres de los Andes te acompaño a conocer Chile.',
    phrases: [
      '¡La historia de nuestro país está llena de aventuras!',
      'Desde lo alto de la cordillera todo se ve maravilloso.',
      '¡Gran trabajo conociendo nuestras regiones y comunidades!',
      '¡Aprender nos da alas para volar muy alto!',
    ],
    themeColor: 'from-red-400 to-rose-600',
  },
  puma: {
    name: 'Puma Chileno',
    tagline: 'Científico de la Naturaleza',
    greeting: '¡Hola! Soy el Puma Chileno. ¡La ciencia y la naturaleza de Chile son increíbles!',
    phrases: [
      '¡Observa con curiosidad como un felino explorador!',
      'Los animales y las plantas tienen superpoderes naturales.',
      '¡Cada pregunta científica nos acerca a la verdad!',
      '¡Tus sentidos son tu mejor laboratorio!',
    ],
    themeColor: 'from-amber-400 to-yellow-600',
  },
  llama: {
    name: 'Llama Andina',
    tagline: 'Amiga de las Alturas',
    greeting: '¡Hola amigo! Desde el Altiplano chileno te mando un abrazo abrigadito.',
    phrases: [
      '¡Qué alegría verte aprender hoy!',
      '¡Paso a pasito se llega a la cima de la montaña!',
      '¡Sonríe y disfruta cada actividad!',
    ],
    themeColor: 'from-purple-400 to-indigo-600',
  },
};

export const InteractiveFaunaCompanion: React.FC<InteractiveFaunaCompanionProps> = ({
  species,
  subjectName,
  onOpenAlbum,
}) => {
  const companion = COMPANION_DATA[species] || COMPANION_DATA.pudu;
  const [mood, setMood] = useState<FaunaMood>('idle');
  const [currentBubbleText, setCurrentBubbleText] = useState<string>(companion.greeting);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [phraseIdx, setPhraseIdx] = useState<number>(0);
  const [isJumping, setIsJumping] = useState<boolean>(false);

  const handleTapMascot = () => {
    soundFx.playBoing();
    soundFx.playAnimalCheer();
    setMood('celebrating');
    setIsJumping(true);

    // Cambiar de frase pedagógica
    const nextIdx = (phraseIdx + 1) % companion.phrases.length;
    setPhraseIdx(nextIdx);
    const newText = companion.phrases[nextIdx];
    setCurrentBubbleText(newText);

    // Leer con voz en tono amigable
    speechReader.stop();
    speechReader.speak(newText, { rate: 0.95 });

    setTimeout(() => {
      setMood('idle');
      setIsJumping(false);
    }, 1200);
  };

  if (isMinimized) {
    return (
      <button
        type="button"
        onClick={() => {
          soundFx.playBubble();
          setIsMinimized(false);
        }}
        className="fixed bottom-4 right-4 z-40 p-2 rounded-full bg-white shadow-xl border-3 border-amber-400 hover:scale-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer animate-bounce"
        title={`Abrir compañero ${companion.name}`}
      >
        <div className="w-10 h-10 overflow-hidden rounded-full bg-amber-50 flex items-center justify-center">
          <FaunaAvatar species={species} size="xs" mood="idle" />
        </div>
        <span className="text-xs font-black text-stone-800 pr-2">{companion.name}</span>
      </button>
    );
  }

  return (
    <div className="p-3 sm:p-4 rounded-3xl bg-gradient-to-r from-amber-50 via-orange-50/50 to-emerald-50/50 border-2 border-amber-300 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn relative">
      {/* Botón de minimizar sutil */}
      <button
        type="button"
        onClick={() => {
          soundFx.playPop();
          setIsMinimized(true);
        }}
        className="absolute top-2 right-2 p-1 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
        title="Ocultar personaje temporalmente"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      <div className="flex items-center gap-3 sm:gap-4 flex-1 w-full">
        {/* Mascota ilustrada original de fauna chilena con física interactiva de salto */}
        <button
          type="button"
          onClick={handleTapMascot}
          className={`relative p-1.5 sm:p-2 rounded-3xl bg-white shadow-xs border-2 border-amber-300 flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 shrink-0 select-none ${
            isJumping
              ? 'animate-bounce ring-4 ring-amber-400 -translate-y-2'
              : 'hover:border-amber-400 hover:shadow-md'
          }`}
          title="¡Tócame para hablar y saltar!"
        >
          {/* Ilustración SVG vectorial detallada del animal nativo */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <FaunaAvatar species={species} size="sm" mood={mood} />
          </div>

          {/* Destellos lúdicos cuando salta */}
          {isJumping && (
            <span className="absolute -top-1 -right-1 text-sm animate-ping">
              ✨
            </span>
          )}
        </button>

        {/* Bocadillo de diálogo auténtico (Speech Bubble) */}
        <div className="flex-1 space-y-1.5 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs sm:text-sm font-black text-stone-900 flex items-center gap-1.5">
              <span>{companion.name}</span>
              <span className="text-xs text-amber-700 font-semibold hidden md:inline">
                • {companion.tagline}
              </span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200/90 text-amber-950 shadow-2xs">
              ¡Tócame para saltar! 🐾
            </span>
          </div>

          {/* Globo de diálogo estilizado con flecha apuntando a la mascota */}
          <div className="relative bg-white border border-amber-200 rounded-2xl px-3.5 py-2 shadow-xs text-left max-w-xl">
            {/* Flecha del bocadillo */}
            <div className="hidden sm:block absolute left-[-7px] top-3.5 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[7px] border-r-amber-200" />
            <div className="hidden sm:block absolute left-[-6px] top-3.5 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[6px] border-r-white" />

            <p className="text-xs sm:text-sm text-stone-800 leading-snug font-medium">
              "{currentBubbleText}"
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center mt-1 sm:mt-0">
        {/* Botón para escuchar la frase con voz */}
        <button
          type="button"
          onClick={() => {
            soundFx.playBubble();
            speechReader.stop();
            speechReader.speak(currentBubbleText, { rate: 0.95 });
          }}
          className="p-2 sm:p-2.5 rounded-2xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 transition-all cursor-pointer shadow-2xs active:scale-95"
          title="Escuchar a tu compañero"
        >
          <Volume2 className="w-4 h-4 text-amber-800" />
        </button>

        {/* Botón para ver álbum coleccionable */}
        {onOpenAlbum && (
          <button
            type="button"
            onClick={() => {
              soundFx.playMagicStar();
              onOpenAlbum();
            }}
            className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs inline-flex items-center gap-1.5 transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ver Mi Álbum</span>
          </button>
        )}
      </div>
    </div>
  );
};
