import React, { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Volume2,
  Square,
  Mic,
  RotateCcw,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Keyboard,
  Clock,
  Heart,
  Star,
} from 'lucide-react';
import { PuducoMascot } from './PuducoMascot';
import {
  ORAL_WORKSHOP_LEVELS,
  ORAL_WORKSHOP_ITEMS,
  OralLevelItem,
} from '../data/oralWorkshopData';
import { speechReader } from '../utils/speechReader';
import { soundFx } from '../utils/soundEffects';
import {
  evaluateOralPronunciation,
  evaluateParagraphReading,
  ParagraphEvaluationResult,
  SpeechEvaluationResult,
} from '../utils/speechEvaluator';

interface OralWorkshopViewProps {
  initialNivel?: string;
  soundEnabled: boolean;
  onBackToHome: () => void;
}

export const OralWorkshopView: React.FC<OralWorkshopViewProps> = ({
  initialNivel = '1° Básico',
  soundEnabled,
  onBackToHome,
}) => {
  // Active level selection (1° a 4° básico)
  const [selectedNivel, setSelectedNivel] = useState<'1° Básico' | '2° Básico' | '3° Básico' | '4° Básico'>(
    (initialNivel as any) || '1° Básico'
  );

  // Items for the current level
  const levelItems = useMemo(() => {
    return ORAL_WORKSHOP_ITEMS.filter((item) => item.nivel === selectedNivel);
  }, [selectedNivel]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentItem: OralLevelItem = levelItems[currentIndex] || levelItems[0];

  // Recording and evaluation states
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeakingTeacher, setIsSpeakingTeacher] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [micSupported, setMicSupported] = useState<boolean>(true);
  const [silenceCountdown, setSilenceCountdown] = useState<number | null>(null);

  // Results
  const [singleEval, setSingleEval] = useState<SpeechEvaluationResult | null>(null);
  const [paragraphEval, setParagraphEval] = useState<ParagraphEvaluationResult | null>(null);

  // Progress tracking
  const [completedItemIds, setCompletedItemIds] = useState<Set<string>>(new Set());

  // Manual fallback input for environments without mic
  const [showManualInput, setShowManualInput] = useState<boolean>(false);
  const [manualText, setManualText] = useState<string>('');

  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<any>(null);
  const lastSpeechTimeRef = useRef<number>(0);

  // Determine current active level config
  const activeLevelConfig = useMemo(() => {
    return (
      ORAL_WORKSHOP_LEVELS.find((l) => l.nivel === selectedNivel) ||
      ORAL_WORKSHOP_LEVELS[0]
    );
  }, [selectedNivel]);

  // Mascot mood
  const mascotMood = useMemo(() => {
    if (isListening) return 'listening';
    if (
      (singleEval && singleEval.status === 'correct') ||
      (paragraphEval && paragraphEval.status === 'correct')
    ) {
      return 'celebrating';
    }
    if (
      (singleEval && singleEval.status === 'close') ||
      (paragraphEval && paragraphEval.status === 'close')
    ) {
      return 'encouraging';
    }
    return 'happy';
  }, [isListening, singleEval, paragraphEval]);

  // Check speech recognition support on mount
  useEffect(() => {
    const SpeechRec =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      setMicSupported(false);
    }
  }, []);

  // Reset states when changing item or level
  useEffect(() => {
    handleStopListening();
    speechReader.stop();
    setIsSpeakingTeacher(false);
    setTranscript('');
    setSingleEval(null);
    setParagraphEval(null);
    setManualText('');
  }, [selectedNivel, currentIndex]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      handleStopListening();
      speechReader.stop();
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    };
  }, []);

  // Listen to teacher voice model
  const handleTogglePlayTeacher = () => {
    if (isSpeakingTeacher) {
      speechReader.stop();
      setIsSpeakingTeacher(false);
      return;
    }

    handleStopListening();
    setIsSpeakingTeacher(true);

    // 1° and 2° use slower speech, 3° and 4° use normal rate
    const speedRate = selectedNivel === '1° Básico' || selectedNivel === '2° Básico' ? 0.78 : 0.88;

    speechReader.speak(currentItem.contenido, {
      onEnd: () => {
        setIsSpeakingTeacher(false);
      },
      rate: speedRate,
    });
  };

  // Evaluate the captured speech
  const evaluateSpeechResult = (finalText: string) => {
    if (!finalText.trim()) {
      if (currentItem.tipo === 'palabra' || currentItem.tipo === 'frase') {
        setSingleEval({
          status: 'silence',
          score: 0,
          bestMatchWord: '',
          transcript: '',
          targetWord: currentItem.contenido,
          message: 'No logramos captar tu voz. Toca con tu dedito el botón verde y lee en voz alta.',
        });
      } else {
        setParagraphEval({
          scorePercent: 0,
          totalTargetWords: currentItem.contenido.split(/\s+/).length,
          matchedWordsCount: 0,
          wordStatuses: [],
          transcript: '',
          status: 'silence',
          message: 'No logramos captar tu voz. Toca con tu dedito el botón verde y lee con calma frente a la pantalla.',
        });
      }
      return;
    }

    if (currentItem.tipo === 'palabra' || currentItem.tipo === 'frase') {
      const result = evaluateOralPronunciation(finalText, currentItem.contenido);
      setSingleEval(result);

      if (result.status === 'correct') {
        if (soundEnabled) soundFx.playCorrect();
        confetti({ particleCount: 65, spread: 60, origin: { y: 0.7 } });
        setCompletedItemIds((prev) => new Set(prev).add(currentItem.id));
      } else if (result.status === 'close') {
        if (soundEnabled) soundFx.playAttempt();
      } else {
        if (soundEnabled) soundFx.playAttempt();
      }
    } else {
      // 3° and 4° basic: Paragraph / 10-line text evaluation
      const result = evaluateParagraphReading(finalText, currentItem.contenido);
      setParagraphEval(result);

      if (result.status === 'correct') {
        if (soundEnabled) soundFx.playCorrect();
        confetti({ particleCount: 85, spread: 70, origin: { y: 0.65 } });
        setCompletedItemIds((prev) => new Set(prev).add(currentItem.id));
      } else {
        if (soundEnabled) soundFx.playAttempt();
      }
    }
  };

  // Start microphone
  const handleStartListening = () => {
    speechReader.stop();
    setIsSpeakingTeacher(false);
    setSingleEval(null);
    setParagraphEval(null);
    setTranscript('');

    const SpeechRec =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      setMicSupported(false);
      return;
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }

      const recognition = new SpeechRec();
      recognition.lang = 'es-CL';
      // For longer texts in 3° and 4°, continuous recognition is crucial
      recognition.continuous = currentItem.tipo === 'parrafo_5' || currentItem.tipo === 'texto_10';
      recognition.interimResults = true;
      recognition.maxAlternatives = 3;

      let accumulatedTranscript = '';
      lastSpeechTimeRef.current = Date.now();

      // Reset auto-stop silence timer (3 seconds of silence after speech)
      const resetSilenceTimer = () => {
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = setTimeout(() => {
          // If 3.2 seconds pass with no new speech and we already have some transcript
          if (accumulatedTranscript.trim().length > 0) {
            handleStopListening();
          }
        }, 3200);
      };

      recognition.onstart = () => {
        setIsListening(true);
        if (soundEnabled) soundFx.playClick();
      };

      recognition.onresult = (event: any) => {
        let currentText = '';
        for (let i = 0; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript + ' ';
        }
        accumulatedTranscript = currentText.trim();
        setTranscript(accumulatedTranscript);
        lastSpeechTimeRef.current = Date.now();

        // 3-second auto-stop silence detection
        resetSilenceTimer();
      };

      recognition.onspeechend = () => {
        // If it's a single word (1° básico), close promptly
        if (currentItem.tipo === 'palabra') {
          setTimeout(() => {
            handleStopListening();
          }, 800);
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error !== 'no-speech' && event.error !== 'aborted') {
          console.warn('Speech recognition warning:', event.error);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (accumulatedTranscript.trim()) {
          evaluateSpeechResult(accumulatedTranscript);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Error starting recognition:', err);
      setIsListening(false);
    }
  };

  // Stop microphone (by user touch or auto-stop timer)
  const handleStopListening = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
  };

  // Toggle button (dedito tap)
  const handleFingerTapMic = () => {
    if (isListening) {
      handleStopListening();
    } else {
      handleStartListening();
    }
  };

  // Evaluate manual fallback
  const handleTestManual = () => {
    if (!manualText.trim()) return;
    setTranscript(manualText.trim());
    evaluateSpeechResult(manualText.trim());
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Top Breadcrumb and Back Button */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          id="btn-back-from-oral"
          onClick={onBackToHome}
          className="px-3.5 py-2 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 text-stone-700 hover:text-stone-900 font-extrabold text-xs inline-flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Volver a Cursos</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-stone-600 bg-white px-3 py-1.5 rounded-full border border-stone-200 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Taller de Expresión Oral y Lectura</span>
        </div>
      </div>

      {/* Grade Selector Tabs (Duolingo Style Pill Tabs) */}
      <div className="bg-white rounded-3xl border border-stone-200 p-2 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {ORAL_WORKSHOP_LEVELS.map((lvl) => {
            const isSelected = selectedNivel === lvl.nivel;
            return (
              <button
                key={lvl.nivel}
                type="button"
                id={`btn-oral-level-${lvl.nivel.replace('° ', '-').toLowerCase()}`}
                onClick={() => {
                  setSelectedNivel(lvl.nivel);
                  setCurrentIndex(0);
                }}
                className={`py-2.5 px-3 rounded-2xl font-black text-xs sm:text-sm transition-all text-center flex flex-col items-center gap-0.5 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-white shadow-md scale-[1.02]'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <span>{lvl.nivel}</span>
                <span
                  className={`text-[10px] font-semibold ${
                    isSelected ? 'text-amber-100' : 'text-stone-400'
                  }`}
                >
                  {lvl.nivel === '1° Básico'
                    ? 'Palabras'
                    : lvl.nivel === '2° Básico'
                    ? 'Frases'
                    : lvl.nivel === '3° Básico'
                    ? '5 Líneas'
                    : '10 Líneas'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Duolingo-Styled Activity Card */}
      <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-sm p-6 sm:p-8 space-y-6 relative overflow-hidden">
        {/* Level Banner & Progress Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${activeLevelConfig.bgLight}`}>
                {activeLevelConfig.badge}
              </span>
              <span className="text-xs font-bold text-stone-500">
                Desafío {currentIndex + 1} de {levelItems.length}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
              {currentItem.titulo}
            </h2>
            <p className="text-xs text-stone-500">{currentItem.subtitulo}</p>
          </div>

          {/* Navigation between items of this level */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <button
              type="button"
              id="btn-prev-oral-item"
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="p-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              title="Lectura anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-stone-700 px-2">
              {currentIndex + 1} / {levelItems.length}
            </span>
            <button
              type="button"
              id="btn-next-oral-item"
              onClick={() => setCurrentIndex((prev) => Math.min(levelItems.length - 1, prev + 1))}
              disabled={currentIndex === levelItems.length - 1}
              className="p-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              title="Siguiente lectura"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mascot Puduco Dialog (Duolingo Style) */}
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
          <PuducoMascot mood={mascotMood} size="sm" />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-black text-xs text-amber-900">Puduco el Lector:</span>
              {completedItemIds.has(currentItem.id) && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  ¡Completado!
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
              «{currentItem.historiaPuduco}»
            </p>
            <p className="text-[11px] text-amber-800 font-semibold pt-0.5 flex items-center gap-1">
              <span>💡 Consejo:</span>
              <span>{currentItem.consejoLectura}</span>
            </p>
          </div>
        </div>

        {/* Text to Read Display Area */}
        <div className="bg-stone-50 rounded-2xl border-2 border-stone-200/80 p-5 sm:p-6 text-center space-y-4">
          {/* If 1° Básico Word with Syllables */}
          {currentItem.tipo === 'palabra' && currentItem.silabas && (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {currentItem.silabas.map((syl, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-2xl bg-white border-2 border-emerald-300 text-emerald-950 font-black text-3xl sm:text-4xl shadow-xs tracking-wide"
                  >
                    {syl}
                  </span>
                ))}
              </div>
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Palabra completa: <span className="text-stone-900 font-black">{currentItem.contenido}</span>
              </p>
            </div>
          )}

          {/* If 2° Básico Phrase */}
          {currentItem.tipo === 'frase' && (
            <div className="py-2">
              <p className="text-2xl sm:text-3xl font-black text-stone-900 leading-snug">
                «{currentItem.contenido}»
              </p>
            </div>
          )}

          {/* If 3° or 4° Básico Paragraph (5 or 10 lines) */}
          {(currentItem.tipo === 'parrafo_5' || currentItem.tipo === 'texto_10') && (
            <div className="text-left bg-white rounded-xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100 text-xs text-stone-500">
                <span className="font-bold flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                  Texto a leer en voz alta ({currentItem.lineasAprox} líneas aprox.):
                </span>
                <span className="font-semibold text-stone-400">
                  Pausas en comas (,) y puntos (.)
                </span>
              </div>

              {/* Text rendering: if evaluated, highlight words */}
              {paragraphEval && paragraphEval.wordStatuses.length > 0 ? (
                <div className="text-sm sm:text-base leading-relaxed text-stone-800 whitespace-pre-line font-medium">
                  {paragraphEval.wordStatuses.map((ws, i) => (
                    <span
                      key={i}
                      className={`inline-block mr-1 my-0.5 px-1 py-0.5 rounded transition-colors ${
                        ws.matched
                          ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-300'
                          : 'text-stone-400'
                      }`}
                    >
                      {ws.word}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm sm:text-base leading-relaxed text-stone-800 whitespace-pre-line font-medium">
                  {currentItem.contenido}
                </p>
              )}
            </div>
          )}

          {/* Model Audio Player Button */}
          <div className="flex items-center justify-center pt-1">
            <button
              type="button"
              id="btn-listen-teacher-model"
              onClick={handleTogglePlayTeacher}
              className={`px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer ${
                isSpeakingTeacher
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-stone-200 hover:bg-stone-300 text-stone-800'
              }`}
            >
              {isSpeakingTeacher ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Detener voz modelo</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Escuchar cómo se lee</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Large Tactile Recording Button (Duolingo Style Dedito Tap) */}
        <div className="flex flex-col items-center justify-center pt-2 space-y-3">
          <button
            type="button"
            id="btn-finger-mic-action"
            onClick={handleFingerTapMic}
            className={`w-full sm:w-auto min-w-[280px] sm:min-w-[340px] py-4 px-6 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-3 transition-all cursor-pointer shadow-md active:translate-y-1 ${
              isListening
                ? 'bg-sky-500 hover:bg-sky-600 text-white ring-4 ring-sky-200 animate-pulse'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
            }`}
          >
            {isListening ? (
              <>
                <Square className="w-5 h-5 fill-current animate-bounce" />
                <span>⏹️ ¡Te escucho! Toca con tu dedito para terminar</span>
              </>
            ) : (
              <>
                <Mic className="w-5 h-5" />
                <span>🎙️ Toca aquí con tu dedito para leer</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-stone-500 text-center font-medium">
            {isListening
              ? '✨ Habla con calma. Si guardas silencio por 3 segundos, se detendrá automáticamente.'
              : '👉 Puedes detener la grabación cuando quieras tocando de nuevo con tu dedito.'}
          </p>
        </div>

        {/* Live Listening Indicator */}
        {isListening && (
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 text-center space-y-2 animate-in fade-in">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping"></span>
              <span className="text-xs font-bold text-sky-800">
                Micrófono activo • Leyendo en tiempo real...
              </span>
            </div>
            {transcript && (
              <p className="text-sm font-semibold text-stone-800 italic">
                «{transcript}»
              </p>
            )}
          </div>
        )}

        {/* Evaluation Results Card */}
        {/* A. Single word or phrase evaluation (1° y 2° Básico) */}
        {singleEval && (
          <div
            className={`rounded-2xl border-2 p-5 space-y-3 transition-all ${
              singleEval.status === 'correct'
                ? 'bg-emerald-50/70 border-emerald-400 text-emerald-950'
                : singleEval.status === 'close'
                ? 'bg-amber-50/70 border-amber-400 text-amber-950'
                : 'bg-red-50/70 border-red-300 text-red-950'
            }`}
          >
            <div className="flex items-center gap-3">
              {singleEval.status === 'correct' ? (
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 fill-current" />
                </div>
              ) : singleEval.status === 'close' ? (
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
              )}
              <div>
                <h4 className="font-black text-sm sm:text-base">
                  {singleEval.status === 'correct'
                    ? '¡Excelente lectura y pronunciación!'
                    : singleEval.status === 'close'
                    ? '¡Muy cerca! Sigamos practicando'
                    : '¡Buen intento! Escuchemos de nuevo'}
                </h4>
                <p className="text-xs leading-relaxed mt-0.5">{singleEval.message}</p>
              </div>
            </div>

            {singleEval.transcript && (
              <div className="pt-2 border-t border-stone-200/50 flex items-center justify-between text-xs flex-wrap gap-2">
                <div>
                  <span className="font-semibold text-stone-500">Escuchamos: </span>
                  <span className="font-bold text-stone-800">«{singleEval.transcript}»</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-500">Objetivo: </span>
                  <span className="font-bold text-emerald-700">«{singleEval.targetWord}»</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* B. Paragraph evaluation (3° y 4° Básico) */}
        {paragraphEval && (
          <div
            className={`rounded-2xl border-2 p-5 space-y-3 transition-all ${
              paragraphEval.status === 'correct'
                ? 'bg-emerald-50/70 border-emerald-400 text-emerald-950'
                : paragraphEval.status === 'close'
                ? 'bg-amber-50/70 border-amber-400 text-amber-950'
                : 'bg-red-50/70 border-red-300 text-red-950'
            }`}
          >
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0 ${
                    paragraphEval.scorePercent >= 75
                      ? 'bg-emerald-600'
                      : paragraphEval.scorePercent >= 45
                      ? 'bg-amber-600'
                      : 'bg-red-600'
                  }`}
                >
                  {paragraphEval.scorePercent}%
                </div>
                <div>
                  <h4 className="font-black text-sm sm:text-base">
                    {paragraphEval.status === 'correct'
                      ? '¡Gran fluidez lectora!'
                      : paragraphEval.status === 'close'
                      ? '¡Muy buen avance en lectura!'
                      : '¡A seguir practicando la lectura!'}
                  </h4>
                  <p className="text-xs leading-relaxed mt-0.5">{paragraphEval.message}</p>
                </div>
              </div>

              <div className="text-xs font-bold text-stone-600 bg-white px-3 py-1 rounded-xl border border-stone-200">
                {paragraphEval.matchedWordsCount} de {paragraphEval.totalTargetWords} palabras
              </div>
            </div>

            {paragraphEval.transcript && (
              <div className="pt-2 border-t border-stone-200/50 text-xs text-stone-600">
                <span className="font-bold text-stone-700">Lo que leyó tu voz: </span>
                <span className="italic">«{paragraphEval.transcript}»</span>
              </div>
            )}
          </div>
        )}

        {/* Mic not supported alert or Manual Fallback button */}
        {!micSupported && (
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">
                Reconocimiento de voz no disponible directamente en este navegador.
              </p>
              <p className="mt-0.5 text-amber-800">
                Puedes probar escribiendo lo que dirías usando la prueba con teclado a continuación.
              </p>
            </div>
          </div>
        )}

        {/* Manual Test Mode Toggle (For teacher or testing in iframe) */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <button
            type="button"
            id="btn-toggle-manual-speech-test"
            onClick={() => setShowManualInput((prev) => !prev)}
            className="text-[11px] font-bold text-stone-500 hover:text-stone-800 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>{showManualInput ? 'Ocultar prueba manual' : 'Prueba manual con teclado (si no tienes micrófono)'}</span>
          </button>

          <span className="text-[11px] text-stone-400 font-medium">
            Mineduc DUA • Lenguaje
          </span>
        </div>

        {showManualInput && (
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <label className="text-xs font-bold text-stone-700 block">
              Escribe lo que dijo el estudiante para evaluar:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="input-manual-speech-test"
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder={currentItem.contenido}
                className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-stone-900"
              />
              <button
                type="button"
                id="btn-eval-manual-speech-test"
                onClick={handleTestManual}
                className="px-3 py-1.5 rounded-lg bg-stone-800 text-white font-bold text-xs hover:bg-stone-900 cursor-pointer"
              >
                Evaluar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
