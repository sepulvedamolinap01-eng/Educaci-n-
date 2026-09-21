import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MineducQuizResult, QuestionItem, DuaSettings } from '../types';
import { soundFx } from '../utils/soundEffects';
import { speechReader } from '../utils/speechReader';
import { formatTextWithSyllables } from '../utils/syllables';
import { randomizeQuizOptions } from '../utils/quizRandomizer';
import { InteractiveReadingView } from './InteractiveReadingView';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  Star,
  ThumbsUp,
  BookOpen,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Volume2,
  Lightbulb,
  Sparkles,
  Heart,
  Smile,
  GraduationCap,
} from 'lucide-react';

interface InteractiveQuizProps {
  quizData: MineducQuizResult;
  soundEnabled: boolean;
  settings: DuaSettings;
  onResetQuiz: () => void;
}

type QuizOptionKey = 'A' | 'B' | 'C' | 'D';

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({
  quizData,
  soundEnabled,
  settings,
  onResetQuiz,
}) => {
  const [activeQuiz, setActiveQuiz] = useState<MineducQuizResult>(() => randomizeQuizOptions(quizData));
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, QuizOptionKey>>({});
  const [showReadingText, setShowReadingText] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [activeHintParagraph, setActiveHintParagraph] = useState<string | null>(null);
  const [speakingItem, setSpeakingItem] = useState<string | null>(null);

  // Sync and re-randomize when quizData changes
  useEffect(() => {
    setActiveQuiz(randomizeQuizOptions(quizData));
    setUserAnswers({});
    setCurrentIdx(0);
  }, [quizData]);

  const questions = activeQuiz.preguntas || [];
  const currentQuestion: QuestionItem | undefined = questions[currentIdx];

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = questions.filter(
    (q) => userAnswers[q.id_pregunta] === q.respuesta_correcta
  ).length;

  // Reset hint state when navigating questions
  useEffect(() => {
    setShowHint(false);
    setActiveHintParagraph(null);
    speechReader.stop();
    setSpeakingItem(null);
  }, [currentIdx, activeQuiz]);

  const handleSelectOption = (qId: number, optionKey: QuizOptionKey) => {
    const isCorrect = currentQuestion?.respuesta_correcta === optionKey;
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: optionKey,
    }));

    const updatedAnswers = { ...userAnswers, [qId]: optionKey };
    const willBeAllAnswered = Object.keys(updatedAnswers).length === totalQuestions;

    if (isCorrect) {
      if (soundEnabled) {
        soundFx.playCorrect();
      }

      // El confeti y celebración SOLO deben lanzarse cuando la respuesta fue correcta
      if (willBeAllAnswered) {
        if (soundEnabled) {
          setTimeout(() => soundFx.playCelebration(), 400);
        }
        try {
          confetti({
            particleCount: 75,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'],
          });
        } catch {
          // Ignored
        }
      }
    } else {
      // Respuesta incorrecta: sonido de error y NINGÚN confeti
      if (soundEnabled) {
        soundFx.playIncorrect();
      }
    }
  };

  const handleResetAnswers = () => {
    setActiveQuiz(randomizeQuizOptions(quizData));
    setUserAnswers({});
    setCurrentIdx(0);
    setShowHint(false);
    setActiveHintParagraph(null);
    onResetQuiz();
  };

  // Text-to-speech for question prompt
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

  // Text-to-speech for individual option
  const handleSpeakOption = (key: QuizOptionKey, text: string) => {
    const rate = settings.speechSpeed === 'slow' ? 0.8 : 1.0;
    setSpeakingItem(`option-${key}`);
    speechReader.speak(`Opción ${key}: ${text}`, {
      rate,
      onEnd: () => setSpeakingItem(null),
      onError: () => setSpeakingItem(null),
    });
  };

  // Teacher Pedagogical Hint trigger
  const handleToggleHint = () => {
    if (!showHint && currentQuestion) {
      setShowHint(true);
      if (currentQuestion.parrafo_clave) {
        setActiveHintParagraph(currentQuestion.parrafo_clave);
      } else {
        // Fallback extract relevant sentence from reading
        setActiveHintParagraph(currentQuestion.pista_pedagogica || null);
      }

      if (currentQuestion.pista_pedagogica) {
        const rate = settings.speechSpeed === 'slow' ? 0.85 : 1.0;
        speechReader.speak(`Pista del profesor: ${currentQuestion.pista_pedagogica}`, { rate });
      }
    } else {
      setShowHint(false);
      setActiveHintParagraph(null);
    }
  };

  if (!currentQuestion) {
    return null;
  }

  const selectedAnswer = userAnswers[currentQuestion.id_pregunta];
  const hasAnsweredCurrent = selectedAnswer !== undefined;
  const isCurrentCorrect = selectedAnswer === currentQuestion.respuesta_correcta;

  // Dynamic font sizing
  const questionSizeClass =
    settings.fontSize === 'gigante'
      ? 'text-xl md:text-2xl leading-snug'
      : settings.fontSize === 'grande'
      ? 'text-lg md:text-xl leading-snug'
      : 'text-base md:text-lg leading-snug';

  const optionSizeClass =
    settings.fontSize === 'gigante'
      ? 'text-base sm:text-lg leading-relaxed'
      : settings.fontSize === 'grande'
      ? 'text-sm sm:text-base leading-relaxed'
      : 'text-sm leading-relaxed';

  // Format text with syllables if syllableMode is on
  const formatMaybeSyllables = (str: string) =>
    settings.syllableMode ? formatTextWithSyllables(str) : str;

  // Question skill level badge
  const skillLabel = settings.earlyLearningMode
    ? '🌟 Desafío entretenido'
    : currentQuestion.habilidad ||
      (currentIdx === 0
        ? 'Localizar información'
        : currentIdx === 1
        ? 'Inferir e interpretar'
        : 'Reflexionar y valorar');

  return (
    <div className="space-y-6">
      {/* 1. Official Reading Excerpt Component with DUA tools & Audio TTS */}
      {quizData.texto_oficial && showReadingText && (
        <InteractiveReadingView
          title={quizData.titulo_texto}
          text={quizData.texto_oficial}
          genre={quizData.eje_tematico || 'Lectura escolar'}
          nivel={quizData.nivel}
          unidad={quizData.unidad}
          settings={settings}
          highlightParagraph={activeHintParagraph}
        />
      )}

      {/* 2. Main Question Card */}
      <div
        className={`rounded-3xl border p-5 md:p-7 transition-all shadow-xs ${
          settings.sensoryMode === 'calm'
            ? 'bg-white border-emerald-200'
            : 'bg-white border-stone-200/80'
        }`}
      >
        {/* Clean Kid-Friendly Header: Stars + Question Nav */}
        <div className="pb-4 mb-4 border-b border-stone-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-stone-700">
              Desafío {currentIdx + 1} de {totalQuestions}
            </span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
              {skillLabel}
            </span>
            {currentQuestion?.dificultad && (
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1 shadow-2xs ${
                  currentQuestion.dificultad === 'Fácil'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : currentQuestion.dificultad === 'Intermedio'
                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                    : currentQuestion.dificultad === 'Desafío'
                    ? 'bg-orange-50 text-orange-900 border-orange-300'
                    : 'bg-purple-50 text-purple-900 border-purple-300'
                }`}
              >
                <span>
                  {currentQuestion.dificultad === 'Fácil'
                    ? '🟢 Fácil'
                    : currentQuestion.dificultad === 'Intermedio'
                    ? '🟡 Medio'
                    : currentQuestion.dificultad === 'Desafío'
                    ? '🟠 Desafío'
                    : '🟣 Desafío Avanzado'}
                </span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Joyful Star Counter */}
            <div className="flex items-center gap-1 text-amber-800 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200 text-xs font-black shadow-2xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 animate-pulse" />
              <span>{correctCount}/{totalQuestions} ⭐</span>
            </div>

            {/* Question Step Pills */}
            <div className="flex items-center gap-1">
              {questions.map((q, idx) => {
                const ans = userAnswers[q.id_pregunta];
                const isGood = ans === q.respuesta_correcta;
                return (
                  <button
                    key={q.id_pregunta}
                    id={`btn-nav-question-${idx + 1}`}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-7 h-7 rounded-xl text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                      currentIdx === idx
                        ? 'bg-stone-900 text-white shadow-xs scale-105'
                        : ans === undefined
                        ? 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        : isGood
                        ? 'bg-emerald-500 text-white'
                        : 'bg-amber-400 text-stone-900'
                    }`}
                    title={`Ir al desafío ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Question Prompt with Audio Button and Hint Button */}
        <div className="mb-5 flex items-start justify-between gap-3 bg-stone-50/70 p-4 rounded-xl border border-stone-200/80">
          <div className="flex items-start gap-3 flex-1">
            {/* Audio Button for Question */}
            <button
              type="button"
              id="btn-speak-question-prompt"
              onClick={handleSpeakQuestion}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer shrink-0 mt-0.5 shadow-2xs ${
                speakingItem === 'question'
                  ? 'bg-amber-600 text-white border-amber-700 ring-2 ring-amber-400 animate-pulse'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50 hover:text-amber-900'
              }`}
              title="Escuchar la pregunta en voz alta"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            <h3 className={`font-bold text-stone-900 ${questionSizeClass}`}>
              {formatMaybeSyllables(currentQuestion.enunciado)}
            </h3>
          </div>

          {/* Teacher Hint Button ("Dame una Pista") */}
          <button
            type="button"
            id="btn-teacher-hint"
            onClick={handleToggleHint}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-2xs ${
              showHint
                ? 'bg-amber-500 text-white border border-amber-600'
                : 'bg-white text-amber-900 border border-amber-300 hover:bg-amber-50'
            }`}
            title="Pedir una pista al profesor si te sientes trabado"
          >
            <Lightbulb className={`w-3.5 h-3.5 ${showHint ? 'fill-current' : 'text-amber-600'}`} />
            <span className="hidden sm:inline">
              {showHint ? 'Ocultar pista' : 'Pedir una pista 💡'}
            </span>
          </button>
        </div>

        {/* Active Hint Banner */}
        {showHint && (
          <div className="mb-5 p-4 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-950 text-xs sm:text-sm animate-fadeIn shadow-2xs flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong className="block font-bold text-amber-900 uppercase text-[11px] tracking-wider mb-0.5">
                {settings.earlyLearningMode ? '💡 Pista Amigable:' : 'Pista Pedagógica del Profesor:'}
              </strong>
              <p className="leading-relaxed">
                {currentQuestion.pista_pedagogica ||
                  (settings.earlyLearningMode
                    ? 'Escucha de nuevo el texto o fíjate en las palabras y dibujos.'
                    : 'Vuelve a leer con atención el cuento: fíjate en los detalles y nombres de los personajes.')}
              </p>
            </div>
          </div>
        )}

        {/* Options A, B, C, D with Audio Buttons */}
        <div className="space-y-3 mb-6">
          {(['A', 'B', 'C', 'D'] as const)
            .filter((key) => !!currentQuestion.opciones?.[key])
            .map((key) => {
              const optionText = currentQuestion.opciones[key]!;

              const isSelected = selectedAnswer === key;
              const isCorrect = currentQuestion.respuesta_correcta === key;

            let cardStyle =
              'bg-stone-50/80 border-stone-200 text-stone-800 hover:bg-amber-50/60 hover:border-amber-300';
            let letterStyle = 'bg-stone-200 text-stone-700';

            if (hasAnsweredCurrent) {
              if (isSelected && isCorrect) {
                cardStyle =
                  'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium ring-2 ring-emerald-400/80 shadow-xs';
                letterStyle = 'bg-emerald-500 text-white';
              } else if (isSelected && !isCorrect) {
                cardStyle =
                  'bg-amber-50/90 border-amber-400 text-amber-950 ring-2 ring-amber-300 shadow-xs';
                letterStyle = 'bg-amber-500 text-white';
              } else if (isCorrect && !isCurrentCorrect) {
                cardStyle = 'bg-emerald-50/40 border-emerald-300 text-emerald-900';
                letterStyle = 'bg-emerald-200 text-emerald-800';
              }
            }

            return (
              <div
                key={key}
                className={`w-full rounded-2xl border flex items-center gap-2 p-2 transition-all active:scale-[0.99] ${cardStyle}`}
              >
                {/* Audio speaker button for option */}
                <button
                  type="button"
                  id={`btn-speak-option-${currentQuestion.id_pregunta}-${key}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeakOption(key, optionText);
                  }}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
                    speakingItem === `option-${key}`
                      ? 'bg-amber-600 text-white border-amber-700 ring-2 ring-amber-400 animate-pulse'
                      : 'bg-white text-stone-500 border-stone-200 hover:bg-amber-50 hover:text-amber-800'
                  }`}
                  title={`Escuchar opción ${key}`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>

                {/* Main Option Click Area */}
                <button
                  id={`option-${currentQuestion.id_pregunta}-${key}`}
                  type="button"
                  onClick={() => handleSelectOption(currentQuestion.id_pregunta, key)}
                  className="flex-1 p-1.5 text-left flex items-start gap-3 transition-all cursor-pointer"
                >
                  <div
                    className={`w-8 h-8 rounded-xl text-xs font-black flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${letterStyle}`}
                  >
                    {key}
                  </div>
                  <div className={`flex-1 font-medium ${optionSizeClass}`}>
                    {formatMaybeSyllables(optionText)}
                  </div>
                  {hasAnsweredCurrent && isSelected && (
                    <div className="shrink-0 self-center pl-1">
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

        {/* Pedagogical Formative Feedback Box */}
        {hasAnsweredCurrent && (
          <div
            className={`p-4 rounded-xl border mb-6 transition-all animate-fadeIn shadow-xs ${
              isCurrentCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-amber-50/90 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCurrentCorrect ? (
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                  <ThumbsUp className="w-5 h-5" />
                </div>
              ) : (
                <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
              )}
              <div className="flex-1">
                <div className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                  <span>
                    {isCurrentCorrect
                      ? (settings.earlyLearningMode ? '¡Súper bien hecho! 🌟' : '¡Excelente comprensión lectora!')
                      : (settings.earlyLearningMode ? '¡Inténtalo otra vez! 😊' : 'Orientación del Profesor Mineduc:')}
                  </span>
                  {isCurrentCorrect && (
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-200 text-emerald-900">
                      +1 Estrella ⭐
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed">
                  {isCurrentCorrect
                    ? (settings.earlyLearningMode
                        ? '¡Genial! Tocaste la opción correcta. ¡Sigue así!'
                        : currentQuestion.retroalimentacion_positiva)
                    : (settings.earlyLearningMode
                        ? '¡Casi! Escucha el audio con el parlante 🔊 y vuelve a tocar la opción que creas correcta.'
                        : currentQuestion.retroalimentacion_negativa)}
                </p>

                {!isCurrentCorrect && !settings.earlyLearningMode && (
                  <div className="mt-2.5 pt-2 border-t border-amber-200 flex items-center gap-2 text-xs font-semibold text-amber-900">
                    <Smile className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>
                      ¡No te preocupes! Puedes volver a leer el texto o probar otra alternativa. En el aprendizaje, cada intento cuenta.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-stone-100">
          <button
            type="button"
            id="btn-prev-question"
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
              currentIdx === 0
                ? 'text-stone-300 cursor-not-allowed'
                : 'text-stone-700 bg-stone-100 hover:bg-stone-200'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Anterior</span>
          </button>

          {answeredCount === totalQuestions && (
            <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 hidden sm:flex items-center gap-1.5 shadow-2xs animate-bounce">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>
                ¡Desafío completado con éxito! ({correctCount}/{totalQuestions} estrellas)
              </span>
            </div>
          )}

          {currentIdx < totalQuestions - 1 ? (
            <button
              type="button"
              id="btn-next-question"
              onClick={() => setCurrentIdx((prev) => Math.min(totalQuestions - 1, prev + 1))}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-98"
            >
              <span>Siguiente desafío</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              id="btn-restart-quiz"
              onClick={handleResetAnswers}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Practicar de nuevo</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
