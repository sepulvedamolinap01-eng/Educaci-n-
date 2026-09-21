import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, RotateCcw, Sparkles, Star, Heart, ArrowRight } from 'lucide-react';
import { WordMatchPair, getVocabularyPairsForUnit } from '../data/inglesVocabulary';
import { speechReader } from '../utils/speechReader';
import { soundFx } from '../utils/soundEffects';
import { unlockLamina } from '../data/albumLaminas';
import confetti from 'canvas-confetti';

interface EnglishWordMatchGameProps {
  nivel: string;
  unidadNombre: string;
  onFinishRound?: () => void;
  onOpenAlbum?: () => void;
}

export const EnglishWordMatchGame: React.FC<EnglishWordMatchGameProps> = ({
  nivel,
  unidadNombre,
  onFinishRound,
  onOpenAlbum,
}) => {
  const [pairs, setPairs] = useState<WordMatchPair[]>([]);
  const [shuffledSpanish, setShuffledSpanish] = useState<WordMatchPair[]>([]);
  const [selectedEnId, setSelectedEnId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongMatch, setWrongMatch] = useState<{ enId: string; esId: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [starsEarned, setStarsEarned] = useState<number>(0);

  // Inicializar pares según nivel y unidad
  const initGame = () => {
    const rawPairs = getVocabularyPairsForUnit(nivel, unidadNombre);
    // Limitamos a 6 palabras por ronda para no sobrecargar a niños de 1° y 2° básico
    const currentRound = rawPairs.slice(0, 6);
    setPairs(currentRound);

    // Barajar la columna en español
    const shuffled = [...currentRound].sort(() => Math.random() - 0.5);
    setShuffledSpanish(shuffled);

    setSelectedEnId(null);
    setMatchedIds([]);
    setWrongMatch(null);
    setIsCompleted(false);
  };

  useEffect(() => {
    initGame();
  }, [nivel, unidadNombre]);

  // Manejar clic en tarjeta de inglés
  const handleSelectEnglish = (pair: WordMatchPair) => {
    if (matchedIds.includes(pair.id)) return;

    soundFx.playBubble();
    setSelectedEnId(pair.id);
    setWrongMatch(null);

    // Reproducir pronunciación en inglés con voz clara y pausada
    speechReader.stop();
    speechReader.speak(pair.en, {
      lang: 'en-US',
      rate: 0.78,
    });
  };

  // Manejar clic en tarjeta de español
  const handleSelectSpanish = (pair: WordMatchPair) => {
    if (matchedIds.includes(pair.id)) return;

    if (!selectedEnId) {
      soundFx.playBubble();
      return;
    }

    if (selectedEnId === pair.id) {
      // ¡Acierto!
      soundFx.playCorrect();
      const nextMatched = [...matchedIds, pair.id];
      setMatchedIds(nextMatched);
      setSelectedEnId(null);
      setWrongMatch(null);
      setStarsEarned((prev) => prev + 1);

      // Si completó todas las palabras
      if (nextMatched.length === pairs.length && pairs.length > 0) {
        setIsCompleted(true);
        soundFx.playCelebration();
        setTimeout(() => soundFx.playMagicStar(), 400);
        unlockLamina('rana_darwin');
        unlockLamina('oceano_pacifico');
        if (onFinishRound) onFinishRound();
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {}
      }
    } else {
      // Error amigable
      soundFx.playIncorrect();
      setWrongMatch({ enId: selectedEnId, esId: pair.id });
      setTimeout(() => {
        setWrongMatch(null);
      }, 1000);
    }
  };

  const isNivel1or2 = nivel.includes('1') || nivel.includes('2');

  return (
    <div className="w-full bg-white rounded-3xl border border-amber-200/80 p-4 sm:p-6 shadow-sm">
      {/* Encabezado amigable para niños pequeños */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shadow-xs">
            👉
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-stone-800">
                ¡Juego de Unir con el Dedito!
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                {isNivel1or2 ? '1° y 2° Básico' : 'Vocabulario'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Toca la palabra en 🇬🇧 <span className="font-semibold text-indigo-700">inglés</span> para escucharla y luego toca su significado en 🇨🇱 <span className="font-semibold text-emerald-700">español</span>.
            </p>
          </div>
        </div>

        {/* Marcador de estrellas */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-2xl border border-amber-200">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="text-xs sm:text-sm font-black text-amber-900">
              {matchedIds.length} / {pairs.length}
            </span>
          </div>

          <button
            type="button"
            onClick={initGame}
            className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            title="Volver a mezclar las palabras"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pantalla de Victoria / Completado */}
      {isCompleted ? (
        <div className="py-8 px-4 text-center bg-gradient-to-b from-amber-50 to-emerald-50 rounded-3xl border border-emerald-200 animate-fadeIn">
          <div className="text-5xl mb-3 animate-bounce">🐸🎉</div>
          <h4 className="text-xl sm:text-2xl font-black text-emerald-900 mb-1">
            ¡Felicitaciones! ¡Lo lograste!
          </h4>
          <p className="text-sm text-stone-600 max-w-md mx-auto mb-4">
            La Ranita de Darwin está muy orgullosa. Uniste todas las palabras de esta unidad con tu dedito.
          </p>

          {/* Recompensa de lámina desbloqueada */}
          <div className="max-w-xs mx-auto mb-6 p-3 rounded-2xl bg-white border-2 border-amber-300 shadow-xs flex items-center gap-3">
            <span className="text-3xl select-none">🐸</span>
            <div className="text-left">
              <span className="text-[10px] font-black uppercase text-amber-600 block">¡Nueva Lámina Desbloqueada!</span>
              <span className="text-xs font-black text-stone-900">Ranita de Darwin dorada</span>
            </div>
            {onOpenAlbum && (
              <button
                type="button"
                onClick={() => {
                  soundFx.playMagicStar();
                  onOpenAlbum();
                }}
                className="ml-auto px-2.5 py-1 rounded-xl bg-amber-500 text-white font-black text-[11px] shadow-2xs hover:bg-amber-600 cursor-pointer"
              >
                Ver Álbum
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={initGame}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>¡Jugar de nuevo (Mezclar)!</span>
            </button>
          </div>
        </div>
      ) : (
        /* Tablero de 2 columnas táctiles */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Columna Izquierda: INGLÉS */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-2 text-xs font-bold text-indigo-900 uppercase tracking-wider">
              <span>🇬🇧 En Inglés (Toca y escucha)</span>
              <span className="text-[11px] font-normal text-stone-400">Paso 1</span>
            </div>

            <div className="space-y-2">
              {pairs.map((item) => {
                const isMatched = matchedIds.includes(item.id);
                const isSelected = selectedEnId === item.id;
                const isWrong = wrongMatch?.enId === item.id;

                return (
                  <button
                    key={`en-${item.id}`}
                    type="button"
                    disabled={isMatched}
                    onClick={() => handleSelectEnglish(item)}
                    className={`w-full text-left p-3 sm:p-4 rounded-2xl transition-all duration-200 flex items-center justify-between gap-3 border cursor-pointer select-none active:scale-[0.98] ${
                      isMatched
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 opacity-80 cursor-default'
                        : isSelected
                        ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-400 shadow-md transform -translate-y-0.5'
                        : isWrong
                        ? 'bg-rose-50 border-rose-400 text-rose-800 animate-shake'
                        : 'bg-stone-50/90 hover:bg-stone-100 border-stone-200 text-stone-800 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl shrink-0 drop-shadow-xs">
                        {item.icon}
                      </span>
                      <div>
                        <div className="font-extrabold text-base sm:text-lg text-stone-900 leading-tight">
                          {item.en}
                        </div>
                        {isSelected && !isMatched && (
                          <div className="text-[11px] font-semibold text-indigo-600 flex items-center gap-1 mt-0.5">
                            <span>Ahora toca su traducción 👉</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isMatched ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            speechReader.stop();
                            speechReader.speak(item.en, { lang: 'en-US', rate: 0.78 });
                          }}
                          className="p-2 rounded-xl bg-white border border-stone-200 text-stone-500 hover:text-indigo-600 hover:border-indigo-200 transition-colors shadow-xs"
                          title={`Pronunciar ${item.en}`}
                        >
                          <Volume2 className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Columna Derecha: ESPAÑOL */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
              <span>🇨🇱 En Español (Busca la pareja)</span>
              <span className="text-[11px] font-normal text-stone-400">Paso 2</span>
            </div>

            <div className="space-y-2">
              {shuffledSpanish.map((item) => {
                const isMatched = matchedIds.includes(item.id);
                const isWrong = wrongMatch?.esId === item.id;

                return (
                  <button
                    key={`es-${item.id}`}
                    type="button"
                    disabled={isMatched}
                    onClick={() => handleSelectSpanish(item)}
                    className={`w-full text-left p-3 sm:p-4 rounded-2xl transition-all duration-200 flex items-center justify-between gap-3 border cursor-pointer select-none active:scale-[0.98] ${
                      isMatched
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 opacity-80 cursor-default'
                        : isWrong
                        ? 'bg-rose-50 border-rose-400 text-rose-800 animate-shake'
                        : selectedEnId
                        ? 'bg-white hover:bg-emerald-50 border-stone-200 hover:border-emerald-400 text-stone-800 shadow-xs'
                        : 'bg-stone-50/70 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl sm:text-2xl shrink-0 opacity-80">
                        {item.icon}
                      </span>
                      <div className="font-bold text-base sm:text-lg text-stone-800 leading-tight">
                        {item.es}
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isMatched ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <div
                          className={`w-3.5 h-3.5 rounded-full border-2 ${
                            selectedEnId ? 'border-emerald-400 bg-emerald-100' : 'border-stone-300'
                          }`}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Nota amigable para los pequeños */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
        <span className="inline-flex items-center gap-1">
          💡 Puedes tocar cada palabra en inglés cuantas veces quieras para escuchar cómo se dice.
        </span>
        {matchedIds.length > 0 && !isCompleted && (
          <span className="text-emerald-700 font-bold">
            ¡Muy bien! Te faltan {pairs.length - matchedIds.length}
          </span>
        )}
      </div>
    </div>
  );
};
