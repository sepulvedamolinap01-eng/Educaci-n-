import React, { useState, useEffect, useRef } from 'react';
import { DuaSettings } from '../types';
import { speechReader } from '../utils/speechReader';
import { formatTextWithSyllables } from '../utils/syllables';
import { findGlossaryTerms, GlossaryEntry } from '../data/glossary';
import { breakIntoChildStoryCards } from '../utils/childTextSplitter';
import { FaunaAvatar, FaunaSpecies } from './FaunaAvatars';
import { soundFx } from '../utils/soundEffects';
import {
  Volume2,
  Square,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  X,
  Rocket,
  Play,
  Pause,
} from 'lucide-react';

interface InteractiveReadingViewProps {
  title?: string;
  text: string;
  genre?: string;
  nivel: string;
  unidad?: string;
  settings: DuaSettings;
  highlightParagraph?: string | null;
  guideSpecies?: FaunaSpecies;
  onNext?: () => void;
  nextButtonLabel?: string;
}

const CARD_ICONS = ['🌲', '🐾', '☀️', '🌋', '🌊', '⭐', '🦉', '🍃', '🌸', '✨'];

export const InteractiveReadingView: React.FC<InteractiveReadingViewProps> = ({
  title,
  text,
  genre,
  nivel,
  unidad,
  settings,
  highlightParagraph,
  guideSpecies = 'pudu',
  onNext,
  nextButtonLabel = '¡A Jugar la Trivia! 🚀',
}) => {
  const cards = breakIntoChildStoryCards(text);
  const totalCards = cards.length;

  const [currentCardIdx, setCurrentCardIdx] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left'>('right');
  const [isPlayingCurrent, setIsPlayingCurrent] = useState<boolean>(false);
  const [selectedGlossary, setSelectedGlossary] = useState<GlossaryEntry | null>(null);

  // Reset card on text change
  useEffect(() => {
    setCurrentCardIdx(0);
    speechReader.stop();
    setIsPlayingCurrent(false);
  }, [text]);

  // Stop speech when changing cards
  useEffect(() => {
    speechReader.stop();
    setIsPlayingCurrent(false);
  }, [currentCardIdx]);

  const currentCardText = cards[currentCardIdx] || text;
  const isLastCard = currentCardIdx === totalCards - 1;
  const isFirstCard = currentCardIdx === 0;

  const handleNextCard = () => {
    if (isLastCard) {
      soundFx.playCelebration();
      speechReader.stop();
      if (onNext) onNext();
    } else {
      soundFx.playPop();
      setSlideDirection('right');
      setCurrentCardIdx((prev) => prev + 1);
    }
  };

  const handlePrevCard = () => {
    if (!isFirstCard) {
      soundFx.playPop();
      setSlideDirection('left');
      setCurrentCardIdx((prev) => prev - 1);
    }
  };

  const handleSpeakCard = () => {
    if (isPlayingCurrent) {
      speechReader.stop();
      setIsPlayingCurrent(false);
    } else {
      setIsPlayingCurrent(true);
      const rate = settings.speechSpeed === 'slow' ? 0.8 : 1.0;
      speechReader.speak(currentCardText, {
        rate,
        onEnd: () => setIsPlayingCurrent(false),
        onError: () => setIsPlayingCurrent(false),
      });
    }
  };

  const displayedText = settings.syllableMode
    ? formatTextWithSyllables(currentCardText)
    : currentCardText;

  const glossaryTerms = findGlossaryTerms(currentCardText);

  // Dynamic font sizing
  const textSizeClass =
    settings.fontSize === 'gigante'
      ? 'text-xl sm:text-2xl md:text-3xl leading-relaxed tracking-wide'
      : settings.fontSize === 'grande'
      ? 'text-lg sm:text-xl md:text-2xl leading-relaxed tracking-normal'
      : 'text-base sm:text-lg md:text-xl leading-relaxed';

  return (
    <div className="w-full h-full max-h-full flex flex-col justify-between rounded-3xl border-3 sm:border-4 border-amber-300/80 bg-gradient-to-b from-amber-50/70 via-white to-amber-50/40 p-3 sm:p-5 shadow-lg relative overflow-hidden select-none">
      {/* 1. Header: Animal Companion Greeting & Slide Footprints */}
      <div className="shrink-0 flex items-center justify-between gap-2 pb-2 border-b-2 border-amber-200/60 mb-1">
        <div className="flex items-center gap-2">
          <FaunaAvatar
            species={guideSpecies}
            mood={isPlayingCurrent ? 'speaking' : isLastCard ? 'celebrating' : 'happy'}
            size="xs"
            className="shrink-0 scale-105"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-stone-900 shadow-2xs">
                📖 Cuento Ilustrado
              </span>
              <span className="text-xs font-bold text-stone-600 hidden sm:inline">
                {title || 'Lectura Oficial'}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-black text-amber-900 mt-0.5">
              {isLastCard
                ? '¡Llegaste al final! ¿Listo para el desafío? 🌟'
                : `Página ${currentCardIdx + 1} de ${totalCards}: Lee o escucha con atención 👇`}
            </p>
          </div>
        </div>

        {/* Audio Speaker for Current Slide */}
        <button
          type="button"
          id="btn-play-card-audio"
          onClick={handleSpeakCard}
          className={`px-2.5 py-1.5 rounded-2xl text-xs font-black inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 ${
            isPlayingCurrent
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-white hover:bg-amber-100 text-amber-900 border-2 border-amber-300'
          }`}
          title="Escuchar esta página en voz alta"
        >
          {isPlayingCurrent ? (
            <>
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Detener</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-amber-600" />
              <span>Voz 🔊</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Main Story Card with Left/Right Giant Touch Arrows (Carousel Stage) */}
      <div className="flex-1 min-h-0 flex items-center justify-between gap-2 sm:gap-4 my-1 relative">
        {/* Giant Left Arrow ⬅️ */}
        <button
          type="button"
          id="btn-card-prev"
          disabled={isFirstCard}
          onClick={handlePrevCard}
          className={`w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-lg sm:text-xl transition-all cursor-pointer shrink-0 shadow-sm ${
            isFirstCard
              ? 'opacity-20 cursor-not-allowed bg-stone-100 text-stone-400'
              : 'bg-white hover:bg-amber-100 text-amber-900 border-2 border-amber-300 hover:scale-105 active:scale-90'
          }`}
          title="Página anterior"
        >
          <ArrowLeft className="w-5 h-5 sm:w-7 sm:h-7 stroke-[3]" />
        </button>

        {/* Center Animated Slide Card */}
        <div
          key={currentCardIdx}
          className={`flex-1 h-full max-h-full bg-white/95 rounded-2xl sm:rounded-3xl border-2 border-amber-200 p-3 sm:p-6 shadow-sm flex flex-col justify-center items-center text-center relative overflow-y-auto ${
            slideDirection === 'right' ? 'animate-slide-right' : 'animate-slide-left'
          }`}
        >
          {/* Fun Thematic Icon */}
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-amber-100/80 border border-amber-300 flex items-center justify-center text-2xl sm:text-3xl shadow-inner mb-2 select-none shrink-0">
            {CARD_ICONS[currentCardIdx % CARD_ICONS.length]}
          </div>

          {/* Text: Friendly font for children */}
          <p className={`${textSizeClass} font-serif font-medium text-stone-900 max-w-2xl leading-relaxed`}>
            {displayedText}
          </p>

          {/* Key Paragraph Hint Highlight (if active) */}
          {highlightParagraph && currentCardText.includes(highlightParagraph.slice(0, 15)) && (
            <div className="mt-2 px-2.5 py-1 rounded-xl bg-amber-100 border border-amber-400 text-amber-950 text-xs font-bold animate-pulse">
              ⭐ ¡Aquí está la pista del cuento!
            </div>
          )}

          {/* Interactive Vocabulary Chips on this card */}
          {glossaryTerms.length > 0 && (
            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5">
              <span className="text-[10px] sm:text-[11px] font-bold text-amber-800 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Palabras mágicas:
              </span>
              {glossaryTerms.map((term) => (
                <button
                  key={term.palabra}
                  type="button"
                  onClick={() => {
                    soundFx.playBubble();
                    setSelectedGlossary(term);
                  }}
                  className="px-2 py-0.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-[11px] font-black text-amber-950 inline-flex items-center gap-1 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer transition-all"
                >
                  <span>{term.icono}</span>
                  <span>{term.palabra}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Giant Right Arrow ➡️ or Golden "Play Trivia" Button */}
        {isLastCard ? (
          <button
            type="button"
            id="btn-card-launch-trivia"
            onClick={handleNextCard}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 active:scale-95 text-white border-2 border-amber-200 flex flex-col items-center justify-center shadow-md transition-all cursor-pointer shrink-0 animate-bounce"
            title="¡Comenzar la Trivia!"
          >
            <Rocket className="w-5 h-5 sm:w-7 sm:h-7" />
            <span className="text-[9px] font-black uppercase mt-0.5">Jugar</span>
          </button>
        ) : (
          <button
            type="button"
            id="btn-card-next"
            onClick={handleNextCard}
            className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-90 text-white border-2 border-amber-300 hover:scale-105 flex items-center justify-center text-lg sm:text-xl transition-all cursor-pointer shrink-0 shadow-sm animate-pulse"
            title="Siguiente página del cuento"
          >
            <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 stroke-[3]" />
          </button>
        )}
      </div>

      {/* 3. Bottom Footprint Trail & Next Button Banner: Pinned at bottom */}
      <div className="shrink-0 pt-1.5 flex items-center justify-between gap-2 border-t border-amber-200/50">
        {/* Footprints / Page Dots */}
        <div className="flex items-center gap-1.5">
          {cards.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                soundFx.playPop();
                setSlideDirection(idx > currentCardIdx ? 'right' : 'left');
                setCurrentCardIdx(idx);
              }}
              className={`transition-all rounded-full cursor-pointer flex items-center justify-center ${
                currentCardIdx === idx
                  ? 'w-7 h-7 bg-amber-500 text-white font-black text-xs shadow-2xs scale-105'
                  : idx < currentCardIdx
                  ? 'w-6 h-6 bg-amber-200 text-amber-900 font-bold text-[11px]'
                  : 'w-6 h-6 bg-stone-200 text-stone-500 font-bold text-[11px]'
              }`}
              title={`Ir a página ${idx + 1}`}
            >
              {idx < currentCardIdx ? '✓' : idx + 1}
            </button>
          ))}
        </div>

        {/* Big Golden Action Banner if on last page */}
        {isLastCard ? (
          <button
            type="button"
            id="btn-reading-next-step"
            onClick={handleNextCard}
            className="px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-black text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer animate-pulse"
          >
            <span>{nextButtonLabel}</span>
            <Rocket className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNextCard}
            className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs inline-flex items-center gap-1 cursor-pointer transition-all active:scale-95"
          >
            <span>Página {currentCardIdx + 2}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Vocabulary Card Modal */}
      {selectedGlossary && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-3 border-amber-300 max-w-sm w-full p-5 shadow-2xl animate-console-step">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{selectedGlossary.icono}</span>
                <h4 className="text-base font-black text-stone-900">{selectedGlossary.palabra}</h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedGlossary(null)}
                className="p-1 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-stone-800 leading-relaxed mb-2 bg-amber-50 p-3 rounded-2xl border border-amber-200">
              {selectedGlossary.significado}
            </p>
            <p className="text-xs text-stone-500 italic mb-3">"{selectedGlossary.ejemplo}"</p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedGlossary(null)}
                className="px-4 py-2 rounded-xl text-xs font-black bg-stone-900 text-white cursor-pointer"
              >
                ¡Entendido!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
