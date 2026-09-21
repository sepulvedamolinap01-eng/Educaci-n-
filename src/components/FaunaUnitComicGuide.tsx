import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, X, ChevronDown, ChevronUp } from 'lucide-react';
import { FaunaAvatar, FaunaSpecies, FAUNA_GUIDES_INFO } from './FaunaAvatars';
import { AsignaturaType } from '../types';
import { speechReader } from '../utils/speechReader';
import { soundFx } from '../utils/soundEffects';

interface FaunaUnitComicGuideProps {
  species: FaunaSpecies;
  asignatura: AsignaturaType;
  nivel: string;
  unidad: string;
  soundEnabled?: boolean;
}

export const FaunaUnitComicGuide: React.FC<FaunaUnitComicGuideProps> = ({
  species,
  asignatura,
  nivel,
  unidad,
  soundEnabled = true,
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const guide = FAUNA_GUIDES_INFO[species];

  // Stop audio if unit changes
  useEffect(() => {
    speechReader.stop();
    setIsSpeaking(false);
  }, [unidad, asignatura, nivel]);

  // Mensaje dinámico tipo cómic según la unidad y asignatura
  const getComicMessage = (): string => {
    const unitLower = unidad.toLowerCase();

    if (species === 'puma') {
      if (unitLower.includes('seres vivos') || unitLower.includes('animal') || unitLower.includes('planta')) {
        return `¡Hola pequeño científico! 🐆 Soy el Puma Chileno. En ${unidad} exploraremos los seres vivos, sus necesidades y cómo se adaptan a su entorno natural. ¡Mira con ojos de investigador!`;
      }
      if (unitLower.includes('cuerpo') || unitLower.includes('salud') || unitLower.includes('sentido') || unitLower.includes('esqueleto')) {
        return `¡Cuidemos nuestro cuerpo! 🐆 Como felino ágil y fuerte, sé lo importante que es hacer ejercicio y alimentarse sano. En ${unidad} descubriremos cómo funcionan nuestros órganos y sentidos.`;
      }
      if (unitLower.includes('universo') || unitLower.includes('tierra') || unitLower.includes('materia') || unitLower.includes('fuerza')) {
        return `¡Asombrosa ciencia! 🐆 La materia, las fuerzas y el universo nos rodean. Lee con atención cada experimento y responde las preguntas con entusiasmo.`;
      }
      return `¡Hola explorador de la naturaleza! 🐆 Como guardián de los ecosistemas chilenos, te guiaré en ${unidad}. ¡Aprender ciencias es una aventura maravillosa!`;
    }

    if (species === 'rana') {
      return `¡Hola! 🐸 Soy la Ranita de Darwin y seré tu guía en inglés. En esta unidad aprenderemos vocabulario y oraciones paso a paso. Recuerda que puedes ver la traducción en español y escuchar la pronunciación cuantas veces quieras. ¡Vamos a aprender juntos!`;
    }

    if (species === 'condor') {
      if (unitLower.includes('civilizaci') || unitLower.includes('unidad 3') || unitLower.includes('griega') || unitLower.includes('maya')) {
        return `¡Hola explorador! 🦅 Desde lo alto de la Cordillera de los Andes te acompaño en ${unidad}. Lee el texto con atención para descubrir cómo vivían estas grandes culturas y responder las preguntas con éxito.`;
      }
      if (unitLower.includes('paisaje') || unitLower.includes('zona') || unitLower.includes('geograf')) {
        return `¡A volar por nuestro territorio! 🦅 Observa los relieves, el clima y los pueblos originarios de Chile. ¡Fíjate bien en las palabras clave del texto!`;
      }
      return `¡Saludos! 🦅 Como cóndor guardián de los Andes, te guío en ${unidad}. Lee el texto con curiosidad y pon a prueba lo que sabes en las preguntas interactivas.`;
    }

    if (species === 'llama') {
      if (unitLower.includes('fábula') || unitLower.includes('cuento') || unitLower.includes('narrat')) {
        return `¡Pakarikama! 🦙 Traigo hermosas historias desde el altiplano. Lee con calma, disfruta el relato y recuerda que puedes activar las sílabas para practicar tu fluidez.`;
      }
      if (unitLower.includes('poes') || unitLower.includes('rima')) {
        return `¡Qué bella poesía! 🦙 Escucha el ritmo de las palabras. Lee en voz alta conmigo para que tus versos suenen con toda la magia del norte.`;
      }
      return `¡Hola amiguito! 🦙 Soy la Llama Andina. Estoy aquí para acompañarte en ${unidad}. Tómate tu tiempo y lee a tu propio ritmo.`;
    }

    if (species === 'pinguino') {
      return `¡A nadar entre los números! 🐧 En ${unidad} resolveremos cada problema paso a paso. Recuerda que si una operación te parece difícil, ¡puedes apoyarte en mi Calculadora Escolar!`;
    }

    return `¡Hola! 🐾 Estoy aquí para acompañarte a aprender jugando en ${unidad}. ¡Tú puedes lograrlo!`;
  };

  const message = getComicMessage();

  const handleSpeak = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isSpeaking) {
      speechReader.stop();
      setIsSpeaking(false);
      return;
    }

    if (soundEnabled) {
      soundFx.playPop();
    }

    speechReader.speak(message, {
      rate: 0.95,
      pitch: species === 'condor' ? 0.9 : species === 'puma' ? 0.92 : species === 'rana' ? 1.1 : species === 'llama' ? 1.05 : 1.0,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const themeClasses =
    species === 'puma'
      ? {
          cardBg: 'bg-teal-50/60 border-teal-200',
          bubbleBg: 'bg-white border-teal-300 text-teal-950',
          tailBorder: 'border-r-teal-300',
          accentBadge: 'bg-teal-100 text-teal-900 border-teal-200',
          buttonVoice: 'bg-teal-700 hover:bg-teal-800 text-white',
        }
      : species === 'rana'
      ? {
          cardBg: 'bg-indigo-50/60 border-indigo-200',
          bubbleBg: 'bg-white border-indigo-300 text-indigo-950',
          tailBorder: 'border-r-indigo-300',
          accentBadge: 'bg-indigo-100 text-indigo-900 border-indigo-200',
          buttonVoice: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        }
      : species === 'condor'
      ? {
          cardBg: 'bg-sky-50/60 border-sky-200',
          bubbleBg: 'bg-white border-sky-300 text-sky-950',
          tailBorder: 'border-r-sky-300',
          accentBadge: 'bg-sky-100 text-sky-900 border-sky-200',
          buttonVoice: 'bg-sky-600 hover:bg-sky-700 text-white',
        }
      : species === 'pinguino'
      ? {
          cardBg: 'bg-emerald-50/60 border-emerald-200',
          bubbleBg: 'bg-white border-emerald-300 text-emerald-950',
          tailBorder: 'border-r-emerald-300',
          accentBadge: 'bg-emerald-100 text-emerald-900 border-emerald-200',
          buttonVoice: 'bg-emerald-600 hover:bg-emerald-700 text-white',
        }
      : {
          cardBg: 'bg-amber-50/60 border-amber-200',
          bubbleBg: 'bg-white border-amber-300 text-amber-950',
          tailBorder: 'border-r-amber-300',
          accentBadge: 'bg-amber-100 text-amber-900 border-amber-200',
          buttonVoice: 'bg-amber-600 hover:bg-amber-700 text-white',
        };

  return (
    <div
      className={`rounded-3xl border ${themeClasses.cardBg} p-3.5 sm:p-4.5 transition-all shadow-2xs`}
    >
      <div className="flex items-start sm:items-center justify-between gap-3">
        {/* Guía Animal + Nube de diálogo Cómic */}
        <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 flex-1">
          {/* Avatar del animal - Grande y visible (w-20 sm:w-24) */}
          <button
            type="button"
            onClick={() => handleSpeak()}
            className="group relative cursor-pointer focus:outline-hidden transition-transform hover:scale-105 shrink-0"
            title={`Toca para escuchar a ${guide.nombre}`}
            aria-label={`Toca para escuchar a ${guide.nombre}`}
          >
            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl bg-white/90 border border-stone-200/80 p-1 flex items-center justify-center shadow-xs">
              <FaunaAvatar
                species={species}
                mood={isSpeaking ? 'speaking' : 'happy'}
                size="md"
                className="scale-110"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-white border border-stone-200 text-[10px] font-black text-stone-600 shadow-2xs flex items-center gap-0.5">
              <span>{guide.emoji}</span>
            </div>
          </button>

          {/* Nube de diálogo de historieta / cómic */}
          <div className="flex-1 relative">
            {/* Cola de la nube de cómic apuntando hacia el animalito (en pantallas sm+) */}
            <div
              className={`hidden sm:block absolute -left-3 top-5 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 ${themeClasses.tailBorder}`}
            />
            <div
              className={`hidden sm:block absolute -left-2 top-5 w-0 h-0 border-t-7 border-t-transparent border-b-7 border-b-transparent border-r-7 border-r-white`}
            />

            <div
              className={`relative rounded-2xl sm:rounded-3xl border-2 p-3 sm:p-4 shadow-xs ${themeClasses.bubbleBg}`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xs sm:text-sm tracking-tight text-stone-900">
                    {guide.nombre}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${themeClasses.accentBadge}`}
                  >
                    Tu guía de {asignatura === 'historia' ? 'Historia' : asignatura === 'matematica' ? 'Matemática' : 'Lenguaje'}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleSpeak}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition-transform active:scale-95 ${themeClasses.buttonVoice}`}
                    title={isSpeaking ? 'Detener voz' : 'Escuchar indicación del guía'}
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 animate-pulse" />
                        <span className="text-[11px]">Silenciar</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Escuchar</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                    title={isCollapsed ? 'Expandir mensaje' : 'Minimizar mensaje'}
                    aria-label={isCollapsed ? 'Expandir mensaje' : 'Minimizar mensaje'}
                  >
                    {isCollapsed ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronUp className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Texto de la nube estilo cómic */}
              {!isCollapsed && (
                <p className="text-xs sm:text-sm leading-relaxed text-stone-700 font-medium">
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
