import React, { useState, useEffect, useRef } from 'react';
import { DuaSettings } from '../types';
import { speechReader } from '../utils/speechReader';
import { formatTextWithSyllables } from '../utils/syllables';
import { findGlossaryTerms, CHILD_GLOSSARY, GlossaryEntry } from '../data/glossary';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  BookOpen,
  Sparkles,
  Info,
  X,
  CheckCircle2,
  HelpCircle,
  Eye,
} from 'lucide-react';

interface InteractiveReadingViewProps {
  title?: string;
  text: string;
  genre?: string;
  nivel: string;
  unidad?: string;
  settings: DuaSettings;
  highlightParagraph?: string | null;
}

export const InteractiveReadingView: React.FC<InteractiveReadingViewProps> = ({
  title,
  text,
  genre,
  nivel,
  unidad,
  settings,
  highlightParagraph,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeWordIdx, setActiveWordIdx] = useState<number | null>(null);
  const [selectedGlossary, setSelectedGlossary] = useState<GlossaryEntry | null>(null);
  const [rulerTop, setRulerTop] = useState<number>(0);
  const [isRulerVisible, setIsRulerVisible] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Stop speech when component unmounts or text changes
  useEffect(() => {
    return () => {
      speechReader.stop();
    };
  }, [text]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      if (isPaused) {
        speechReader.resume();
        setIsPaused(false);
      } else {
        speechReader.pause();
        setIsPaused(true);
      }
    } else {
      setIsPlaying(true);
      setIsPaused(false);
      setActiveWordIdx(0);

      const rate = settings.speechSpeed === 'slow' ? 0.8 : 1.0;

      speechReader.speak(text, {
        rate,
        onBoundary: (charIdx) => {
          // approximate word position
          setActiveWordIdx(charIdx);
        },
        onEnd: () => {
          setIsPlaying(false);
          setIsPaused(false);
          setActiveWordIdx(null);
        },
        onError: () => {
          setIsPlaying(false);
          setIsPaused(false);
          setActiveWordIdx(null);
        },
      });
    }
  };

  const handleStop = () => {
    speechReader.stop();
    setIsPlaying(false);
    setIsPaused(false);
    setActiveWordIdx(null);
  };

  const handleSpeakGlossary = (entry: GlossaryEntry) => {
    const speechText = `${entry.palabra}: ${entry.significado}. Por ejemplo: ${entry.ejemplo}`;
    speechReader.speak(speechText, { rate: settings.speechSpeed === 'slow' ? 0.85 : 1.0 });
  };

  // Tracking mouse / touch for reading ruler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!settings.readingRuler || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    setRulerTop(Math.max(10, Math.min(rect.height - 40, relativeY - 20)));
    setIsRulerVisible(true);
  };

  const handleMouseLeave = () => {
    if (settings.readingRuler) {
      setIsRulerVisible(false);
    }
  };

  // Font size mapping
  const textSizeClass =
    settings.fontSize === 'gigante'
      ? 'text-lg sm:text-xl leading-loose tracking-wide'
      : settings.fontSize === 'grande'
      ? 'text-base sm:text-lg leading-relaxed tracking-normal'
      : 'text-sm sm:text-base leading-relaxed';

  // Process text for syllables and interactive glossary terms
  const glossaryList = findGlossaryTerms(text);

  const displayedText = settings.syllableMode ? formatTextWithSyllables(text) : text;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl border p-5 md:p-6 mb-6 transition-all select-text ${
        settings.sensoryMode === 'calm'
          ? 'bg-emerald-50/40 border-emerald-200 text-emerald-950'
          : 'bg-amber-50/30 border-amber-200 text-stone-800'
      }`}
    >
      {/* Reading Ruler Overlay */}
      {settings.readingRuler && isRulerVisible && (
        <div
          className="absolute left-0 right-0 pointer-events-none transition-transform duration-75 z-10"
          style={{ top: `${rulerTop}px` }}
        >
          <div className="h-10 bg-amber-400/20 border-y-2 border-amber-500/60 shadow-sm flex items-center justify-between px-3">
            <span className="text-[10px] font-bold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded shadow-2xs">
              Línea en lectura
            </span>
          </div>
        </div>
      )}

      {/* Header with Title & Audio Playback Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-stone-200/60">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-600" />
              Lectura Oficial ({nivel})
            </span>
            {genre && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                {genre}
              </span>
            )}
            {settings.syllableMode && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-950 border border-amber-300 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Modo Sílabas Activo
              </span>
            )}
          </div>
          {title && (
            <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
              {title}
            </h3>
          )}
        </div>

        {/* Audio Player Controls */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-2xs self-start sm:self-auto">
          <button
            type="button"
            id="btn-play-story-audio"
            onClick={handleTogglePlay}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
              isPlaying
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
            }`}
            title="Escuchar narración del cuento"
          >
            {isPlaying ? (
              isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Continuar</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pausar</span>
                </>
              )
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                <span>Escuchar lectura</span>
              </>
            )}
          </button>

          {isPlaying && (
            <button
              type="button"
              id="btn-stop-story-audio"
              onClick={handleStop}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Detener audio"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </button>
          )}

          <div className="text-[11px] font-semibold text-stone-500 border-l border-stone-200 pl-2">
            {settings.speechSpeed === 'slow' ? '🐢 0.8x' : '🐇 1.0x'}
          </div>
        </div>
      </div>

      {/* Main Text Content */}
      <div className={`relative ${textSizeClass} font-serif whitespace-pre-line text-stone-800`}>
        {displayedText}
      </div>

      {/* Key Paragraph Hint Highlight (triggered by "Pista del Profesor") */}
      {highlightParagraph && (
        <div className="mt-4 p-3.5 rounded-xl bg-amber-100/90 border-2 border-amber-400 text-amber-950 text-xs sm:text-sm animate-fadeIn">
          <div className="flex items-center gap-1.5 font-bold mb-1 text-amber-900">
            <HelpCircle className="w-4 h-4 text-amber-700" />
            <span>Pista Clave en el Texto:</span>
          </div>
          <p className="italic font-serif leading-relaxed">
            "{highlightParagraph}"
          </p>
        </div>
      )}

      {/* Child-Friendly Interactive Vocabulary Chips */}
      {glossaryList.length > 0 && (
        <div className="mt-4 pt-3 border-t border-stone-200/60">
          <div className="text-[11px] font-bold text-stone-600 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Palabras mágicas del cuento (toca para ver qué significan):</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {glossaryList.map((entry) => (
              <button
                key={entry.palabra}
                type="button"
                id={`btn-glossary-${entry.palabra.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedGlossary(entry)}
                className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 hover:border-amber-400 text-xs font-medium text-stone-700 hover:bg-amber-50 inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <span>{entry.icono}</span>
                <span className="font-bold text-amber-900">{entry.palabra}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Glossary Modal / Card */}
      {selectedGlossary && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-stone-200 max-w-sm w-full p-5 shadow-xl animate-scaleIn">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">{selectedGlossary.icono}</span>
                <div>
                  <h4 className="text-base font-bold text-stone-900 leading-snug">
                    {selectedGlossary.palabra}
                  </h4>
                  <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Vocabulario Mineduc
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedGlossary(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 mb-3 text-sm text-stone-800 leading-relaxed">
              <strong className="block text-xs font-bold uppercase text-amber-900 mb-1">
                ¿Qué significa?
              </strong>
              {selectedGlossary.significado}
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 mb-4 text-xs text-stone-600 leading-relaxed">
              <strong className="block font-bold text-stone-700 mb-0.5">Ejemplo en una oración:</strong>
              <span className="italic font-serif">"{selectedGlossary.ejemplo}"</span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                id="btn-speak-glossary-modal"
                onClick={() => handleSpeakGlossary(selectedGlossary)}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-amber-100 text-amber-900 hover:bg-amber-200 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-amber-700" />
                <span>Escuchar significado</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedGlossary(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-stone-900 text-white hover:bg-stone-800 transition-colors cursor-pointer"
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
