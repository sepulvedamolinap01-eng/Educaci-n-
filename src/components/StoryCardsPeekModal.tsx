import React, { useState, useEffect } from 'react';
import { DuaSettings } from '../types';
import { speechReader } from '../utils/speechReader';
import { formatTextWithSyllables } from '../utils/syllables';
import { breakIntoChildStoryCards, findStoryCardIndexWithClue } from '../utils/childTextSplitter';
import { FaunaAvatar, FaunaSpecies } from './FaunaAvatars';
import { soundFx } from '../utils/soundEffects';
import {
  Volume2,
  Square,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  X,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface StoryCardsPeekModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  title?: string;
  clue?: string | null;
  settings: DuaSettings;
  guideSpecies?: FaunaSpecies;
}

const CARD_ICONS = ['🌲', '🐾', '☀️', '🌋', '🌊', '⭐', '🦉', '🍃', '🌸', '✨'];

export const StoryCardsPeekModal: React.FC<StoryCardsPeekModalProps> = ({
  isOpen,
  onClose,
  text,
  title,
  clue,
  settings,
  guideSpecies = 'pudu',
}) => {
  const cards = breakIntoChildStoryCards(text);
  const totalCards = cards.length;

  const clueCardIdx = findStoryCardIndexWithClue(cards, clue);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [slideDir, setSlideDir] = useState<'right' | 'left'>('right');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Jump to the clue card when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIdx(clue ? clueCardIdx : 0);
      setIsPlaying(false);
    } else {
      speechReader.stop();
      setIsPlaying(false);
    }
  }, [isOpen, clue]);

  // Stop speech when changing cards
  useEffect(() => {
    speechReader.stop();
    setIsPlaying(false);
  }, [currentIdx]);

  if (!isOpen) return null;

  const currentText = cards[currentIdx] || text;
  const isClueCard = clue && currentIdx === clueCardIdx;

  const handlePrev = () => {
    if (currentIdx > 0) {
      soundFx.playPop();
      setSlideDir('left');
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < totalCards - 1) {
      soundFx.playPop();
      setSlideDir('right');
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handleSpeak = () => {
    if (isPlaying) {
      speechReader.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const rate = settings.speechSpeed === 'slow' ? 0.8 : 1.0;
      speechReader.speak(currentText, {
        rate,
        onEnd: () => setIsPlaying(false),
        onError: () => setIsPlaying(false),
      });
    }
  };

  const handleCloseModal = () => {
    soundFx.playPop();
    speechReader.stop();
    onClose();
  };

  const displayedText = settings.syllableMode
    ? formatTextWithSyllables(currentText)
    : currentText;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-2xs flex items-center justify-center p-3 sm:p-4 select-none animate-fadeIn">
      <div className="bg-white rounded-3xl border-4 border-amber-300 max-w-lg w-full p-4 sm:p-6 shadow-2xl animate-console-step flex flex-col justify-between max-h-[92dvh] overflow-hidden">
        {/* 1. Header */}
        <div className="shrink-0 flex items-center justify-between pb-2 mb-2 border-b-2 border-amber-200">
          <div className="flex items-center gap-2">
            <FaunaAvatar species={guideSpecies} mood="happy" size="xs" className="scale-105 shrink-0" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-stone-950">
                  📖 Recordar Cuento
                </span>
                <span className="text-xs font-bold text-stone-600 hidden sm:inline">
                  {title || 'Lectura de apoyo'}
                </span>
              </div>
              <p className="text-[11px] font-bold text-amber-900">
                Página {currentIdx + 1} de {totalCards}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Audio Button */}
            <button
              type="button"
              onClick={handleSpeak}
              className={`p-2 rounded-xl border text-xs font-black inline-flex items-center gap-1 transition-all cursor-pointer shadow-2xs ${
                isPlaying
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-300'
              }`}
              title="Escuchar esta página"
            >
              {isPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Volume2 className="w-3.5 h-3.5 text-amber-600" />}
              <span className="text-[11px]">{isPlaying ? 'Detener' : 'Voz 🔊'}</span>
            </button>

            <button
              type="button"
              onClick={handleCloseModal}
              className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Clue Banner if this page holds the clue */}
        {isClueCard && (
          <div className="shrink-0 mb-2 p-2 rounded-2xl bg-amber-100 border border-amber-300 text-amber-950 text-xs font-black flex items-center gap-2 animate-bounce">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>⭐ ¡En esta página del cuento está la pista para tu pregunta!</span>
          </div>
        )}

        {/* 2. Slide Carousel: Left Arrow + Slide Card + Right Arrow */}
        <div className="flex-1 min-h-0 flex items-center justify-between gap-2 my-1">
          {/* Left Arrow */}
          <button
            type="button"
            disabled={currentIdx === 0}
            onClick={handlePrev}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-lg transition-all cursor-pointer shrink-0 shadow-sm ${
              currentIdx === 0
                ? 'opacity-20 cursor-not-allowed bg-stone-100 text-stone-400'
                : 'bg-white hover:bg-amber-100 text-amber-900 border-2 border-amber-300 hover:scale-105 active:scale-95'
            }`}
          >
            <ArrowLeft className="w-5 h-5 stroke-[3]" />
          </button>

          {/* Slide Card Content */}
          <div
            key={currentIdx}
            className={`flex-1 h-full bg-amber-50/60 rounded-2xl border-2 border-amber-200 p-4 sm:p-5 flex flex-col items-center justify-center text-center overflow-y-auto ${
              slideDir === 'right' ? 'animate-slide-right' : 'animate-slide-left'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl shadow-inner mb-2 select-none shrink-0">
              {CARD_ICONS[currentIdx % CARD_ICONS.length]}
            </div>

            <p className="font-serif text-sm sm:text-base md:text-lg text-stone-900 leading-relaxed font-medium">
              {displayedText}
            </p>
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            disabled={currentIdx === totalCards - 1}
            onClick={handleNext}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-lg transition-all cursor-pointer shrink-0 shadow-sm ${
              currentIdx === totalCards - 1
                ? 'opacity-20 cursor-not-allowed bg-stone-100 text-stone-400'
                : 'bg-amber-500 hover:bg-amber-400 text-white border-2 border-amber-300 hover:scale-105 active:scale-95'
            }`}
          >
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* 3. Bottom Action Bar: Page Dots & Return Button */}
        <div className="shrink-0 pt-2.5 mt-1 border-t border-amber-200/60 flex items-center justify-between gap-2">
          {/* Page Dots */}
          <div className="flex items-center gap-1">
            {cards.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  soundFx.playPop();
                  setSlideDir(idx > currentIdx ? 'right' : 'left');
                  setCurrentIdx(idx);
                }}
                className={`w-6 h-6 rounded-full text-[10px] font-black transition-all cursor-pointer flex items-center justify-center ${
                  currentIdx === idx
                    ? 'bg-amber-500 text-white shadow-2xs scale-105'
                    : idx === clueCardIdx
                    ? 'bg-amber-300 text-amber-950 font-black ring-1 ring-amber-400'
                    : 'bg-stone-200 text-stone-600'
                }`}
                title={`Página ${idx + 1}`}
              >
                {idx === clueCardIdx ? '⭐' : idx + 1}
              </button>
            ))}
          </div>

          {/* Big Return Button */}
          <button
            type="button"
            onClick={handleCloseModal}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-black text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>¡Ya me acordé! Volver</span>
          </button>
        </div>
      </div>
    </div>
  );
};
