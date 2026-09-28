import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MineducQuizResult, QuestionItem, DuaSettings } from '../types';
import { soundFx } from '../utils/soundEffects';
import { speechReader } from '../utils/speechReader';
import { unlockLamina } from '../data/albumLaminas';
import { saveUnitProgress } from '../data/studentProgress';
import { formatTextWithSyllables } from '../utils/syllables';
import { randomizeQuizOptions } from '../utils/quizRandomizer';
import { FaunaAvatar, FaunaSpecies } from './FaunaAvatars';
import { StoryCardsPeekModal } from './StoryCardsPeekModal';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  Star,
  ThumbsUp,
  BookOpen,
  Volume2,
  Lightbulb,
  Sparkles,
  Smile,
  X,
  Printer,
  Trophy,
} from 'lucide-react';

interface InteractiveQuizProps {
  quizData: MineducQuizResult;
  soundEnabled: boolean;
  settings: DuaSettings;
  onResetQuiz?: () => void;
  onOpenAlbum?: () => void;
  onOpenWorksheet?: () => void;
  onRequestShowReading?: () => void;
  onCompleteQuiz?: (score: number, total: number) => void;
  currentStep?: number;
  onStepChange?: (step: number) => void;
  onBackToIntro?: () => void;
  guideSpecies?: FaunaSpecies;
  readingText?: string;
  readingTitle?: string;
}

type QuizOptionKey = 'A' | 'B' | 'C' | 'D';

const OPTION_COLORS: Record<QuizOptionKey, { border: string; bg: string; badge: string }> = {
  A: {
    border: 'border-rose-300 hover:border-rose-400',
    bg: 'bg-rose-50/90 hover:bg-rose-100',
    badge: 'bg-rose-500 text-white',
  },
  B: {
    border: 'border-sky-300 hover:border-sky-400',
    bg: 'bg-sky-50/90 hover:bg-sky-100',
    badge: 'bg-sky-500 text-white',
  },
  C: {
    border: 'border-amber-300 hover:border-amber-400',
    bg: 'bg-amber-50/90 hover:bg-amber-100',
    badge: 'bg-amber-500 text-white',
  },
  D: {
    border: 'border-emerald-300 hover:border-emerald-400',
    bg: 'bg-emerald-50/90 hover:bg-emerald-100',
    badge: 'bg-emerald-500 text-white',
  },
};

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({
  quizData,
  soundEnabled,
  settings,
  onResetQuiz,
  onOpenAlbum,
  onOpenWorksheet,
  onRequestShowReading,
  onCompleteQuiz,
  currentStep: externalStep,
  onStepChange,
  onBackToIntro,
  guideSpecies = 'pudu',
  readingText,
  readingTitle,
}) => {
  const [activeQuiz, setActiveQuiz] = useState<MineducQuizResult>(() => randomizeQuizOptions(quizData));
  const [internalStep, setInternalStep] = useState<number>(1);
  const [userAnswers, setUserAnswers] = useState<Record<number, QuizOptionKey>>({});
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showReadingPeek, setShowReadingPeek] = useState<boolean>(false);
  const [speakingItem, setSpeakingItem] = useState<string | null>(null);

  const currentStep = externalStep !== undefined ? externalStep : internalStep;

  const setStep = (newStep: number) => {
    if (onStepChange) {
      onStepChange(newStep);
    }
    setInternalStep(newStep);
  };

  useEffect(() => {
    setActiveQuiz(randomizeQuizOptions(quizData));
    setUserAnswers({});
    setStep(1);
  }, [quizData]);

  const questions = activeQuiz.preguntas || [];
  const totalQuestions = questions.length;

  const currentIdx = Math.max(0, Math.min(totalQuestions - 1, currentStep - 1));
  const currentQuestion: QuestionItem | undefined = questions[currentIdx];
  const isFinalScreen = currentStep > totalQuestions;

  const correctCount = questions.filter(
    (q) => userAnswers[q.id_pregunta] === q.respuesta_correcta
  ).length;

  useEffect(() => {
    setShowHint(false);
    speechReader.stop();
    setSpeakingItem(null);
  }, [currentStep]);

  useEffect(() => {
    if (isFinalScreen) {
      unlockLamina('volcan_villarrica');
      unlockLamina('estrella_dorada');
      if (quizData.nivel && quizData.unidad) {
        saveUnitProgress(
          quizData.nivel,
          quizData.eje_tematico || 'general',
          quizData.unidad,
          correctCount,
          totalQuestions
        );
      }
      if (soundEnabled) {
        soundFx.playCelebration();
        setTimeout(() => soundFx.playMagicStar(), 600);
      }
      try {
        confetti({
          particleCount: 100,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'],
        });
      } catch {
        // Ignored
      }
      if (onCompleteQuiz) {
        onCompleteQuiz(correctCount, totalQuestions);
      }
    }
  }, [isFinalScreen]);

  const handleSelectOption = (qId: number, optionKey: QuizOptionKey) => {
    const isCorrect = currentQuestion?.respuesta_correcta === optionKey;
    if (soundEnabled) {
      soundFx.playBubble();
    }
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: optionKey,
    }));

    if (isCorrect) {
      if (soundEnabled) {
        soundFx.playCorrect();
      }
    } else {
      if (soundEnabled) {
        soundFx.playIncorrect();
      }
    }
  };

  const handleNextStep = () => {
    soundFx.playPop();
    speechReader.stop();
    setStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    soundFx.playPop();
    speechReader.stop();
    if (currentStep <= 1) {
      if (onBackToIntro) {
        onBackToIntro();
      }
    } else {
      setStep(currentStep - 1);
    }
  };

  const handleResetAnswers = () => {
    soundFx.playMagicStar();
    setActiveQuiz(randomizeQuizOptions(quizData));
    setUserAnswers({});
    setShowHint(false);
    speechReader.stop();
    setStep(1);
    if (onResetQuiz) {
      onResetQuiz();
    }
  };

  const handleSpeakQuestion = () => {
    if (!currentQuestion) return;
    const rate = settings.speechSpeed === 'slow' ? 0.8 : 1.0;
    setSpeakingItem('question');
    speechReader.speak(currentQuestion.enunciado, {
      rate,
      onEnd: () => setSpeakingItem(null),
      onError: () => setSpeakingItem(null),
    });
  };

  const handleSpeakOption = (key: QuizOptionKey, text: string) => {
    const rate = settings.speechSpeed === 'slow' ? 0.8 : 1.0;
    setSpeakingItem(`option-${key}`);
    speechReader.speak(`Opción ${key}: ${text}`, {
      rate,
      onEnd: () => setSpeakingItem(null),
      onError: () => setSpeakingItem(null),
    });
  };

  const handleToggleHint = () => {
    if (!showHint && currentQuestion) {
      setShowHint(true);
      if (currentQuestion.pista_pedagogica) {
        const rate = settings.speechSpeed === 'slow' ? 0.85 : 1.0;
        speechReader.speak(`Pista: ${currentQuestion.pista_pedagogica}`, { rate });
      }
    } else {
      setShowHint(false);
    }
  };

  const formatMaybeSyllables = (str: string) =>
    settings.syllableMode ? formatTextWithSyllables(str) : str;

  // =========================================================================
  // PANTALLA FINAL: Gran Fiesta de Recompensas (Fits in 100dvh)
  // =========================================================================
  if (isFinalScreen) {
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 100;
    const isPerfect = correctCount === totalQuestions;

    return (
      <div className="w-full h-full max-h-full flex flex-col justify-between rounded-3xl border-3 border-amber-300 bg-gradient-to-b from-amber-50/90 via-white to-amber-100/40 p-4 sm:p-6 shadow-xl animate-console-step text-center max-w-3xl mx-auto select-none overflow-y-auto">
        <div className="shrink-0 flex items-center justify-center gap-2 mb-1">
          <Trophy className="w-6 h-6 text-amber-500 animate-bounce" />
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-3.5 py-0.5 rounded-full border border-amber-400 shadow-2xs">
            ¡Misión Cumplida! • Recompensas
          </span>
          <Trophy className="w-6 h-6 text-amber-500 animate-bounce" />
        </div>

        <div className="py-1 flex flex-col items-center justify-center shrink-0">
          <FaunaAvatar
            species={guideSpecies}
            mood="celebrating"
            size="md"
            className="scale-105 drop-shadow-sm"
          />
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
            {isPerfect ? '¡Increíble! ¡Puntaje Perfecto! 🌟' : '¡Excelente trabajo explorando! 👏'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto font-bold">
            {isPerfect
              ? '¡Respondiste todo a la perfección! Eres un súper explorador de Chile.'
              : 'Has terminado todos los desafíos. ¡Cada intento te hace más sabio!'}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2.5 my-2 shrink-0">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-amber-50 border-2 border-amber-300 shadow-2xs flex flex-col items-center justify-center">
            <span className="text-[10px] sm:text-xs font-black text-amber-800 uppercase">Estrellas</span>
            <div className="text-xl sm:text-2xl font-black text-amber-600 mt-0.5 flex items-center gap-1">
              <span>{correctCount}/{totalQuestions}</span>
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
            </div>
            <span className="text-[10px] font-bold text-amber-700">{percentage}% acierto</span>
          </div>

          <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-50 border-2 border-emerald-300 shadow-2xs flex flex-col items-center justify-center">
            <span className="text-[10px] sm:text-xs font-black text-emerald-800 uppercase">Medalla</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5">
              {isPerfect ? '🥇 Oro' : percentage >= 60 ? '🥈 Plata' : '🥉 Bronce'}
            </div>
            <span className="text-[10px] font-bold text-emerald-700">Explorador</span>
          </div>

          <div className="p-2.5 sm:p-3 rounded-2xl bg-indigo-50 border-2 border-indigo-300 shadow-2xs flex flex-col items-center justify-center">
            <span className="text-[10px] sm:text-xs font-black text-indigo-800 uppercase">Láminas</span>
            <div className="text-xl sm:text-2xl font-black text-indigo-600 mt-0.5">
              +2 📜
            </div>
            {onOpenAlbum && (
              <button
                type="button"
                onClick={() => {
                  soundFx.playMagicStar();
                  onOpenAlbum();
                }}
                className="text-[10px] font-black text-indigo-700 underline mt-0.5 hover:text-indigo-900 cursor-pointer"
              >
                Abrir Álbum ➜
              </button>
            )}
          </div>
        </div>

        <div className="shrink-0 pt-2 border-t border-stone-200 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            id="btn-play-again-final"
            onClick={handleResetAnswers}
            className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-white font-black text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Jugar de nuevo</span>
          </button>

          {onBackToIntro && (
            <button
              type="button"
              id="btn-re-read-final"
              onClick={() => {
                soundFx.playPop();
                onBackToIntro();
              }}
              className="px-4 py-2.5 rounded-2xl bg-white hover:bg-stone-100 active:scale-95 text-stone-800 font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 border border-stone-300 transition-all cursor-pointer shadow-2xs"
            >
              <BookOpen className="w-4 h-4 text-stone-600" />
              <span>Leer cuento</span>
            </button>
          )}

          {onOpenWorksheet && (
            <button
              type="button"
              onClick={onOpenWorksheet}
              className="px-4 py-2.5 rounded-2xl bg-white hover:bg-stone-100 active:scale-95 text-stone-800 font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 border border-stone-300 transition-all cursor-pointer shadow-2xs"
            >
              <Printer className="w-4 h-4 text-stone-500" />
              <span>Imprimir</span>
            </button>
          )}

          {onOpenAlbum && (
            <button
              type="button"
              onClick={() => {
                soundFx.playMagicStar();
                onOpenAlbum();
              }}
              className="px-4 py-2.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 active:scale-95 text-indigo-950 font-black text-xs sm:text-sm inline-flex items-center gap-1.5 border border-indigo-300 transition-all cursor-pointer shadow-2xs"
            >
              <Award className="w-4 h-4 text-indigo-600" />
              <span>Ver Álbum</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // PANTALLAS INTERMEDIAS: Exactamente UNA pregunta por pantalla estilo Consola
  // (Zero cut-off, Action buttons pinned at bottom!)
  // =========================================================================
  if (!currentQuestion) {
    return null;
  }

  const selectedAnswer = userAnswers[currentQuestion.id_pregunta];
  const hasAnsweredCurrent = selectedAnswer !== undefined;
  const isCurrentCorrect = selectedAnswer === currentQuestion.respuesta_correcta;

  return (
    <div className="w-full h-full max-h-full flex flex-col justify-between rounded-3xl border-3 border-stone-200/90 bg-white p-3 sm:p-5 shadow-lg animate-console-step select-none overflow-hidden">
      {/* 1. TOP HEADER: Step Indicator & Peek Story */}
      <div className="shrink-0 pb-1.5 border-b border-stone-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FaunaAvatar
            species={guideSpecies}
            mood={hasAnsweredCurrent ? (isCurrentCorrect ? 'celebrating' : 'thinking') : 'idle'}
            size="xs"
            className="shrink-0 scale-105"
          />
          <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-lg bg-amber-400 text-stone-950 shadow-2xs">
            Pregunta {currentStep} de {totalQuestions}
          </span>
          <span className="text-[11px] font-bold text-stone-500 hidden sm:inline">
            {currentQuestion.habilidad || 'Comprensión'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {(readingText || onRequestShowReading) && (
            <button
              type="button"
              id="btn-peek-reading"
              onClick={() => {
                soundFx.playBubble();
                if (onRequestShowReading) {
                  onRequestShowReading();
                } else {
                  setShowReadingPeek(true);
                }
              }}
              className="px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 text-xs font-black inline-flex items-center gap-1 border border-amber-300 cursor-pointer shadow-2xs active:scale-95"
              title="Recordar el cuento"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span>Recordar Cuento</span>
            </button>
          )}

          <div className="flex items-center gap-1 text-amber-800 bg-amber-100/70 px-2 py-1 rounded-xl border border-amber-300 text-xs font-black">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{correctCount}/{totalQuestions} ⭐</span>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE QUESTION & OPTIONS AREA: Auto-fits and scrolls internally if tiny screen */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain py-1.5 space-y-2 pr-0.5">
        {/* Question Prompt */}
        <div className="flex items-start justify-between gap-2 bg-gradient-to-r from-amber-50/70 to-orange-50/40 p-2.5 sm:p-3.5 rounded-2xl border border-amber-200 shadow-2xs">
          <div className="flex items-start gap-2 flex-1">
            <button
              type="button"
              id="btn-speak-question-prompt"
              onClick={handleSpeakQuestion}
              className={`p-2 rounded-xl border transition-all cursor-pointer shrink-0 shadow-2xs active:scale-95 ${
                speakingItem === 'question'
                  ? 'bg-amber-600 text-white border-amber-700 ring-2 ring-amber-400 animate-pulse'
                  : 'bg-white hover:bg-amber-100 text-amber-900 border-amber-300'
              }`}
              title="Escuchar la pregunta en voz alta"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug pt-0.5">
              {formatMaybeSyllables(currentQuestion.enunciado)}
            </h3>
          </div>

          <button
            type="button"
            id="btn-teacher-hint"
            onClick={handleToggleHint}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-black inline-flex items-center gap-1 transition-all cursor-pointer shrink-0 shadow-2xs active:scale-95 border ${
              showHint
                ? 'bg-amber-500 text-white border-amber-600'
                : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-50'
            }`}
            title="Pedir una pista"
          >
            <Lightbulb className={`w-3.5 h-3.5 ${showHint ? 'fill-current' : 'text-amber-600'}`} />
            <span>Pista</span>
          </button>
        </div>

        {/* Hint Alert if Active */}
        {showHint && (
          <div className="p-2.5 rounded-2xl bg-amber-100 border border-amber-300 text-amber-950 text-xs animate-fadeIn flex items-start gap-2 shadow-2xs">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong className="block font-black text-amber-900 text-[11px] uppercase mb-0.5">
                Pista del Profesor:
              </strong>
              <p className="leading-snug">
                {currentQuestion.pista_pedagogica ||
                  'Vuelve a leer el cuento: fíjate en lo que le pasó a los personajes.'}
              </p>
            </div>
          </div>
        )}

        {/* Options A, B, C, D */}
        <div className="space-y-1.5">
          {(['A', 'B', 'C', 'D'] as const)
            .filter((key) => !!currentQuestion.opciones?.[key])
            .map((key) => {
              const optionText = currentQuestion.opciones[key]!;
              const isSelected = selectedAnswer === key;
              const isCorrect = currentQuestion.respuesta_correcta === key;
              const colorDef = OPTION_COLORS[key];

              let cardStyle = `${colorDef.bg} ${colorDef.border}`;
              let letterStyle = colorDef.badge;

              if (hasAnsweredCurrent) {
                if (isSelected && isCorrect) {
                  cardStyle = 'bg-emerald-100 border-emerald-500 ring-2 ring-emerald-400 shadow-xs scale-[1.01]';
                  letterStyle = 'bg-emerald-600 text-white animate-bounce';
                } else if (isSelected && !isCorrect) {
                  cardStyle = 'bg-amber-100/90 border-amber-400 ring-1 ring-amber-300 shadow-2xs';
                  letterStyle = 'bg-amber-500 text-white';
                } else if (isCorrect && !isCurrentCorrect) {
                  cardStyle = 'bg-emerald-50 border-emerald-400';
                  letterStyle = 'bg-emerald-500 text-white';
                } else {
                  cardStyle = 'opacity-60 bg-stone-50 border-stone-200';
                }
              }

              return (
                <div
                  key={key}
                  className={`w-full rounded-2xl border-2 flex items-center gap-1.5 p-1.5 transition-all active:translate-y-0.5 shadow-2xs ${cardStyle}`}
                >
                  <button
                    type="button"
                    id={`btn-speak-option-${currentQuestion.id_pregunta}-${key}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeakOption(key, optionText);
                    }}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer shrink-0 ${
                      speakingItem === `option-${key}`
                        ? 'bg-amber-600 text-white border-amber-700 animate-pulse'
                        : 'bg-white text-stone-600 border-stone-200 hover:bg-amber-100'
                    }`}
                    title={`Escuchar opción ${key}`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    id={`option-${currentQuestion.id_pregunta}-${key}`}
                    type="button"
                    onClick={() => handleSelectOption(currentQuestion.id_pregunta, key)}
                    className="flex-1 p-0.5 text-left flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <div
                      className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 shadow-2xs ${letterStyle}`}
                    >
                      {key}
                    </div>
                    <div className="flex-1 font-bold text-xs sm:text-sm text-stone-900 leading-snug">
                      {formatMaybeSyllables(optionText)}
                    </div>
                    {hasAnsweredCurrent && isSelected && (
                      <div className="shrink-0 pr-1">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 animate-bounce" />
                        ) : (
                          <XCircle className="w-5 h-5 text-amber-600" />
                        )}
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
        </div>

        {/* Compact Formative Feedback Banner */}
        {hasAnsweredCurrent && (
          <div
            className={`p-2.5 rounded-2xl border transition-all animate-fadeIn shadow-2xs flex items-center gap-2 ${
              isCurrentCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            {isCurrentCorrect ? (
              <div className="p-1 rounded-lg bg-emerald-200 text-emerald-800 shrink-0">
                <ThumbsUp className="w-4 h-4" />
              </div>
            ) : (
              <div className="p-1 rounded-lg bg-amber-200 text-amber-800 shrink-0">
                <Smile className="w-4 h-4" />
              </div>
            )}
            <div className="flex-1">
              <div className="text-[11px] font-black uppercase flex items-center gap-1.5">
                <span>{isCurrentCorrect ? '¡Muy bien hecho! 🌟' : '¡Vamos, tú puedes! 😊'}</span>
                {isCurrentCorrect && (
                  <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-emerald-200 text-emerald-900">
                    +1 Estrella ⭐
                  </span>
                )}
              </div>
              <p className="text-xs font-medium leading-snug">
                {isCurrentCorrect
                  ? currentQuestion.retroalimentacion_positiva || '¡Genial! Has acertado la respuesta.'
                  : currentQuestion.retroalimentacion_negativa || '¡Casi! Escucha el audio o vuelve a intentarlo.'}
              </p>
              {!isCurrentCorrect && readingText && (
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playBubble();
                    setShowReadingPeek(true);
                  }}
                  className="mt-1.5 px-2.5 py-1 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-950 font-black text-[11px] inline-flex items-center gap-1 shadow-2xs active:scale-95 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                  <span>Ver la pista en el cuento 📖</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. BOTTOM PINNED NAVIGATION BAR: ALWAYS VISIBLE, NEVER CUT OFF! */}
      <div className="shrink-0 pt-2 border-t border-stone-200 bg-white flex items-center justify-between gap-2 z-10">
        <button
          type="button"
          id="btn-quiz-prev-step"
          onClick={handlePrevStep}
          className="px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black text-stone-700 bg-stone-100 hover:bg-stone-200 active:scale-95 inline-flex items-center gap-1 transition-all cursor-pointer border border-stone-200 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentStep === 1 ? 'Cuento' : 'Anterior'}</span>
        </button>

        {hasAnsweredCurrent ? (
          <button
            type="button"
            id="btn-quiz-next-step"
            onClick={handleNextStep}
            className="px-6 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-95 text-white font-black text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-md transition-all cursor-pointer animate-bounce"
          >
            <span>
              {currentStep < totalQuestions ? 'Siguiente Pregunta ➡️' : '¡Ver Recompensas! 🏆'}
            </span>
          </button>
        ) : (
          <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-stone-600 bg-amber-50 px-3 py-2 rounded-xl border border-amber-200">
            <span>Toca una alternativa para continuar 👆</span>
          </div>
        )}
      </div>

      {/* Story Cards Peek Modal (Bite-sized story cards, never a raw wall of text!) */}
      <StoryCardsPeekModal
        isOpen={showReadingPeek}
        onClose={() => setShowReadingPeek(false)}
        text={readingText || ''}
        title={readingTitle || 'Recordar Cuento'}
        clue={currentQuestion?.parrafo_clave || currentQuestion?.pista_pedagogica}
        settings={settings}
        guideSpecies={guideSpecies}
      />
    </div>
  );
};
