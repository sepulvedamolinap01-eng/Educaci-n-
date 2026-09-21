import React, { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Mic,
  Square,
  Volume2,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Star,
  Keyboard,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { FaunaAvatar, FaunaSpecies, FaunaMood } from './FaunaAvatars';
import {
  FAUNA_COMPANIONS,
  FAUNA_ORAL_EXERCISES,
  FaunaOralExercise,
  OralDifficulty,
} from '../data/faunaOralData';
import { speechReader } from '../utils/speechReader';
import { soundFx } from '../utils/soundEffects';
import {
  evaluateOralPronunciation,
  evaluateParagraphReading,
  SpeechEvaluationResult,
  ParagraphEvaluationResult,
} from '../utils/speechEvaluator';
import {
  chileanSoundscapes,
  SOUNDSCAPE_PRESETS,
  SoundscapeBiome,
} from '../utils/chileanSoundscapes';

const SPECIES_TO_BIOME: Record<FaunaSpecies, SoundscapeBiome> = {
  pudu: 'bosque',
  pinguino: 'oceano',
  condor: 'cordillera',
  llama: 'cordillera',
  puma: 'quebrada',
  rana: 'humedal',
};

interface PuduOralLabProps {
  initialNivel?: string;
  initialSpecies?: FaunaSpecies;
  soundEnabled: boolean;
  onBackToHome: () => void;
}

export const PuduOralLab: React.FC<PuduOralLabProps> = ({
  initialNivel = '1° Básico',
  initialSpecies = 'pudu',
  soundEnabled,
  onBackToHome,
}) => {
  const [selectedSpecies, setSelectedSpecies] = useState<FaunaSpecies>(() => {
    if (['pudu', 'pinguino', 'condor', 'puma', 'rana'].includes(initialSpecies)) {
      return initialSpecies;
    }
    return 'pudu';
  });

  const [isSoundscapeActive, setIsSoundscapeActive] = useState<boolean>(() => chileanSoundscapes.getIsRunning());

  const [selectedNivel, setSelectedNivel] = useState<OralDifficulty>(() => {
    if (['1° Básico', '2° Básico', '3° Básico', '4° Básico'].includes(initialNivel)) {
      return initialNivel as OralDifficulty;
    }
    return '1° Básico';
  });

  const [animalMood, setAnimalMood] = useState<FaunaMood>('idle');
  const [stars, setStars] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeakingModel, setIsSpeakingModel] = useState<boolean>(false);
  const [spokenTranscript, setSpokenTranscript] = useState<string>('');
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);

  const [wordEvaluation, setWordEvaluation] = useState<SpeechEvaluationResult | null>(null);
  const [paragraphEvaluation, setParagraphEvaluation] = useState<ParagraphEvaluationResult | null>(null);

  const [showManualInput, setShowManualInput] = useState<boolean>(false);
  const [manualText, setManualText] = useState<string>('');

  const recognitionRef = useRef<any>(null);
  const silenceTimeoutRef = useRef<any>(null);
  const timerIntervalRef = useRef<any>(null);
  const isStoppingRef = useRef<boolean>(false);

  const currentCompanion = FAUNA_COMPANIONS[selectedSpecies] || FAUNA_COMPANIONS.pudu;

  // Filter exercises by chosen animal and grade level
  const availableExercises: FaunaOralExercise[] = useMemo(() => {
    const list = FAUNA_ORAL_EXERCISES.filter(
      (item) => item.species === selectedSpecies && item.nivel === selectedNivel
    );
    if (list.length > 0) return list;

    // Fallback if specific grade has fewer items
    return (
      FAUNA_ORAL_EXERCISES.filter((item) => item.species === selectedSpecies) || [
        FAUNA_ORAL_EXERCISES[0],
      ]
    );
  }, [selectedSpecies, selectedNivel]);

  const currentExercise: FaunaOralExercise =
    availableExercises[currentIndex] || availableExercises[0] || FAUNA_ORAL_EXERCISES[0];

  // Dynamic greeting from the companion
  const companionMessage = useMemo(() => {
    return currentCompanion.mensajeBienvenida[selectedNivel];
  }, [currentCompanion, selectedNivel]);

  // Reset states when changing animal or level
  useEffect(() => {
    speechReader.stop();
    stopListening();
    setSpokenTranscript('');
    setWordEvaluation(null);
    setParagraphEvaluation(null);
    setIsSpeakingModel(false);
    setCurrentIndex(0);
    setAnimalMood('idle');
  }, [selectedSpecies, selectedNivel]);

  const handlePlayModelAudio = () => {
    if (isListening) stopListening();

    if (isSpeakingModel) {
      speechReader.stop();
      setIsSpeakingModel(false);
      setAnimalMood('idle');
      return;
    }

    setIsSpeakingModel(true);
    setAnimalMood('speaking');

    const isEnglish = selectedSpecies === 'rana';
    const lang = isEnglish ? 'en-US' : 'es-CL';
    const rate = selectedNivel === '1° Básico' ? 0.75 : selectedNivel === '2° Básico' ? 0.8 : 0.85;

    speechReader.speak(currentExercise.texto, {
      lang,
      rate,
      onEnd: () => {
        setIsSpeakingModel(false);
        setAnimalMood('idle');
      },
      onError: () => {
        setIsSpeakingModel(false);
        setAnimalMood('idle');
      },
    });
  };

  const stopListening = () => {
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Safe ignore
      }
    }
    setIsListening(false);
    isStoppingRef.current = true;
  };

  const handleToggleListening = () => {
    speechReader.stop();
    setIsSpeakingModel(false);

    if (isListening) {
      stopListening();
      if (soundEnabled) soundFx.playPop();
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setShowManualInput(true);
      setAnimalMood('thinking');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      const isEnglish = selectedSpecies === 'rana';
      recognition.lang = isEnglish ? 'en-US' : 'es-CL';
      recognition.continuous = selectedNivel === '3° Básico' || selectedNivel === '4° Básico';
      recognition.interimResults = true;
      recognition.maxAlternatives = 2;

      isStoppingRef.current = false;
      setSpokenTranscript('');
      setWordEvaluation(null);
      setParagraphEvaluation(null);
      setRecordingSeconds(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);

      const resetSilenceTimer = (currentTranscript: string) => {
        if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = setTimeout(() => {
          if (!isStoppingRef.current) {
            stopListening();
            if (currentTranscript.trim()) {
              processEvaluation(currentTranscript);
            }
          }
        }, 3000);
      };

      recognition.onstart = () => {
        setIsListening(true);
        setAnimalMood('listening');
        if (soundEnabled) soundFx.playPop();

        silenceTimeoutRef.current = setTimeout(() => {
          if (!isStoppingRef.current) {
            stopListening();
            setAnimalMood('thinking');
          }
        }, 8000);
      };

      recognition.onresult = (event: any) => {
        let fullTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          fullTranscript += event.results[i][0].transcript + ' ';
        }
        fullTranscript = fullTranscript.trim();
        setSpokenTranscript(fullTranscript);
        resetSilenceTimer(fullTranscript);
      };

      recognition.onerror = (event: any) => {
        stopListening();
        if (event.error === 'no-speech') {
          setAnimalMood('thinking');
        } else {
          setShowManualInput(true);
          setAnimalMood('thinking');
        }
      };

      recognition.onend = () => {
        stopListening();
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      stopListening();
      setShowManualInput(true);
    }
  };

  const processEvaluation = (transcript: string) => {
    if (currentExercise.tipo === 'parrafo') {
      const result = evaluateParagraphReading(transcript, currentExercise.texto);
      setParagraphEvaluation(result);
      if (result.scorePercent >= 60) {
        setAnimalMood('celebrating');
        setStars((prev) => prev + 2);
        if (soundEnabled) soundFx.playCorrect();
        confetti({ particleCount: 45, spread: 65, origin: { y: 0.65 } });
      } else {
        setAnimalMood('thinking');
        if (soundEnabled) soundFx.playIncorrect();
      }
    } else {
      const result = evaluateOralPronunciation(transcript, currentExercise.texto);
      setWordEvaluation(result);
      if (result.status === 'correct') {
        setAnimalMood('celebrating');
        setStars((prev) => prev + 1);
        if (soundEnabled) soundFx.playCorrect();
        confetti({ particleCount: 35, spread: 55, origin: { y: 0.7 } });
      } else {
        setAnimalMood('thinking');
        if (soundEnabled) soundFx.playIncorrect();
      }
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualText.trim()) return;
    setSpokenTranscript(manualText);
    processEvaluation(manualText);
  };

  const handleNextItem = () => {
    speechReader.stop();
    setSpokenTranscript('');
    setWordEvaluation(null);
    setParagraphEvaluation(null);
    setManualText('');
    setAnimalMood('idle');
    setCurrentIndex((prev) => (prev + 1) % availableExercises.length);
  };

  const handlePrevItem = () => {
    speechReader.stop();
    setSpokenTranscript('');
    setWordEvaluation(null);
    setParagraphEvaluation(null);
    setManualText('');
    setAnimalMood('idle');
    setCurrentIndex((prev) => (prev - 1 + availableExercises.length) % availableExercises.length);
  };

  const companionSpeciesList: { species: FaunaSpecies; label: string; subject: string; emoji: string }[] = [
    { species: 'pudu', label: 'Pudú', subject: 'Lenguaje', emoji: '🦌' },
    { species: 'pinguino', label: 'Pingüino', subject: 'Matemática', emoji: '🐧' },
    { species: 'condor', label: 'Cóndor', subject: 'Historia', emoji: '🦅' },
    { species: 'puma', label: 'Puma', subject: 'Ciencias', emoji: '🐆' },
    { species: 'rana', label: 'Ranita', subject: 'Inglés', emoji: '🐸' },
  ];

  return (
    <div className="space-y-4 max-w-3xl mx-auto pb-16 sm:pb-4 animate-in fade-in duration-300">
      {/* 1. Header Bar: Navigation, Companion Guide Badge & Stars */}
      <div className="flex items-center justify-between gap-2 bg-white rounded-2xl border border-stone-200 p-2.5 sm:p-3 shadow-2xs">
        <button
          type="button"
          id="btn-oral-back-home"
          onClick={onBackToHome}
          className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-200 shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Volver a Cursos</span>
          <span className="sm:hidden">Volver</span>
        </button>

        {/* Grade difficulty selector */}
        <div className="flex items-center gap-0.5 sm:gap-1 p-0.5 bg-stone-100 rounded-xl border border-stone-200 text-xs font-bold overflow-x-auto">
          {(['1° Básico', '2° Básico', '3° Básico', '4° Básico'] as OralDifficulty[]).map((nivel) => {
            const isSelected = selectedNivel === nivel;
            return (
              <button
                key={nivel}
                type="button"
                onClick={() => setSelectedNivel(nivel)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg whitespace-nowrap text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? `${currentCompanion.colorTheme.primary} text-white shadow-2xs`
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {nivel}
              </button>
            );
          })}
        </div>

        {/* Stars counter */}
        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-black text-xs shrink-0">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>{stars}</span>
        </div>
      </div>

      {/* 2. Animal Companion Selector (Interactive Chilean Fauna Bar) */}
      <div className="bg-white border border-stone-200 rounded-2xl p-2 sm:p-2.5 shadow-2xs">
        <div className="flex items-center justify-between gap-1 mb-1.5 px-1">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
            Elige tu Animal Guía:
          </span>
          <span className="text-[11px] font-medium text-stone-400">
            {currentCompanion.asignatura}
          </span>
        </div>

        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {companionSpeciesList.map((item) => {
            const isSelected = selectedSpecies === item.species;
            return (
              <button
                key={item.species}
                type="button"
                id={`animal-tab-${item.species}`}
                onClick={() => {
                  setSelectedSpecies(item.species);
                  if (soundEnabled) soundFx.playPop();
                  if (isSoundscapeActive) {
                    chileanSoundscapes.start(SPECIES_TO_BIOME[item.species]);
                  }
                }}
                className={`py-2 px-1.5 sm:px-2 rounded-xl text-center transition-all cursor-pointer border flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <span className="text-xl sm:text-2xl leading-none mb-1 select-none">
                  {item.emoji}
                </span>
                <span className="text-[11px] font-black leading-tight block truncate w-full">
                  {item.label}
                </span>
                <span className={`text-[9px] font-medium block truncate w-full ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                  {item.subject}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Mascot Dialogue Bar */}
      <div className={`${currentCompanion.colorTheme.bgLight} border ${currentCompanion.colorTheme.border} rounded-2xl p-3 flex items-center gap-3`}>
        <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200/80 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
          <FaunaAvatar species={selectedSpecies} mood={animalMood} size="xs" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-xs font-black ${currentCompanion.colorTheme.textDark}`}>
              {currentCompanion.nombre}
            </span>
            <span className="text-[10px] font-medium text-stone-500">
              • {currentCompanion.apodo}
            </span>
          </div>
          <p className="text-xs font-medium text-stone-700 leading-snug mt-0.5">
            {companionMessage}
          </p>
        </div>

        {/* Botón de Sonido del Hábitat Natural */}
        <div className="shrink-0 flex items-center">
          <button
            type="button"
            id="btn-oral-toggle-soundscape"
            onClick={() => {
              const targetBiome = SPECIES_TO_BIOME[selectedSpecies];
              if (isSoundscapeActive) {
                chileanSoundscapes.stop();
                setIsSoundscapeActive(false);
              } else {
                chileanSoundscapes.start(targetBiome);
                setIsSoundscapeActive(true);
              }
              if (soundEnabled) soundFx.playPop();
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-2xs active:scale-95 ${
              isSoundscapeActive
                ? 'bg-emerald-600 text-white border-emerald-700 ring-2 ring-emerald-300'
                : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-300'
            }`}
            title={`Sonido del hábitat: ${SOUNDSCAPE_PRESETS[SPECIES_TO_BIOME[selectedSpecies]].nombre}`}
          >
            <span>{isSoundscapeActive ? '🔊' : '🍃'}</span>
            <span className="hidden sm:inline">
              {isSoundscapeActive ? 'Hábitat Activo' : 'Sonido Hábitat'}
            </span>
            <span className="text-xs select-none">
              {SOUNDSCAPE_PRESETS[SPECIES_TO_BIOME[selectedSpecies]].emoji}
            </span>
          </button>
        </div>
      </div>

      {/* 4. Main Speaking Card */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-xs space-y-5 text-center">
        {/* Navigation & Progress Header */}
        <div className="flex items-center justify-between text-xs font-bold text-stone-500 pb-3 border-b border-stone-100">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-base">{currentExercise.icono}</span>
            <span>
              {currentExercise.asignatura} • Desafío {currentIndex + 1} de {availableExercises.length}
            </span>
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrevItem}
              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer transition-colors"
              title="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextItem}
              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer transition-colors"
              title="Siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Display Area */}
        {currentExercise.tipo === 'palabra' && (
          <div className="py-4 space-y-3">
            <div className="text-5xl select-none">{currentExercise.icono}</div>
            <h3 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-wide font-serif">
              {currentExercise.texto}
            </h3>

            {/* Syllables chips */}
            {currentExercise.silabeo && (
              <div className="flex items-center justify-center gap-2 pt-1">
                {currentExercise.silabeo.split('-').map((syl, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-xl ${currentCompanion.colorTheme.bgLight} border ${currentCompanion.colorTheme.border} ${currentCompanion.colorTheme.textDark} font-black text-sm`}
                  >
                    {syl.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Translation if English */}
            {currentExercise.traduccion && (
              <div className="inline-block px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-bold text-stone-700">
                🇨🇱 Significa: «{currentExercise.traduccion}»
              </div>
            )}

            <p className="text-xs text-stone-500 italic max-w-sm mx-auto">
              💡 {currentExercise.pista}
            </p>
          </div>
        )}

        {currentExercise.tipo === 'frase' && (
          <div className="py-4 space-y-3">
            <div className="text-4xl select-none">{currentExercise.icono}</div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 leading-snug font-serif max-w-lg mx-auto">
              «{currentExercise.texto}»
            </h3>

            {currentExercise.traduccion && (
              <div className="inline-block px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-bold text-stone-700">
                🇨🇱 En español: «{currentExercise.traduccion}»
              </div>
            )}

            <p className="text-xs text-stone-500 italic max-w-md mx-auto">
              💡 {currentExercise.pista}
            </p>
          </div>
        )}

        {currentExercise.tipo === 'parrafo' && (
          <div className="py-2 space-y-3 text-left">
            <div className={`p-4 sm:p-5 rounded-2xl ${currentCompanion.colorTheme.bgLight} border ${currentCompanion.colorTheme.border}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{currentExercise.icono}</span>
                <h4 className={`text-xs font-black uppercase tracking-wide ${currentCompanion.colorTheme.textDark}`}>
                  Lectura Guiada con {currentCompanion.nombre}
                </h4>
              </div>
              <p className="font-serif text-base sm:text-lg text-stone-900 leading-relaxed">
                {currentExercise.texto}
              </p>
              {currentExercise.traduccion && (
                <div className="mt-3 pt-3 border-t border-stone-200/60 text-xs text-stone-600 italic">
                  🇨🇱 {currentExercise.traduccion}
                </div>
              )}
            </div>
            <p className="text-xs text-stone-500 italic text-center">
              💡 {currentExercise.pista}
            </p>
          </div>
        )}

        {/* Modern Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* 1. Listen model */}
          <button
            type="button"
            onClick={handlePlayModelAudio}
            disabled={isListening}
            className={`py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border ${
              isSpeakingModel
                ? `${currentCompanion.colorTheme.primary} text-white shadow-xs`
                : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300 shadow-2xs'
            }`}
          >
            <Volume2 className="w-4 h-4 text-stone-700" />
            <span>{isSpeakingModel ? 'Pausar audio' : 'Escuchar cómo suena'}</span>
          </button>

          {/* 2. Speak with mic */}
          <button
            type="button"
            onClick={handleToggleListening}
            disabled={isSpeakingModel}
            className={`py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
              isListening
                ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse ring-4 ring-rose-100'
                : `${currentCompanion.colorTheme.primary} hover:opacity-95 text-white`
            }`}
          >
            {isListening ? (
              <>
                <Square className="w-4 h-4 fill-current" />
                <span>Escuchando... Toca para finalizar ({recordingSeconds}s)</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span>Practicar con mi voz</span>
              </>
            )}
          </button>
        </div>

        {/* Evaluation feedback card */}
        {wordEvaluation && (
          <div
            className={`p-4 rounded-2xl border text-left space-y-1 transition-all ${
              wordEvaluation.status === 'correct'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-black text-xs sm:text-sm flex items-center gap-1.5">
                {wordEvaluation.status === 'correct' ? '🎉 ¡Muy bien pronunciado!' : '💡 Consejo del animal'}
              </span>
              <span className="text-[11px] font-medium opacity-80">
                Dijiste: «{spokenTranscript || wordEvaluation.transcript}»
              </span>
            </div>
            <p className="text-xs leading-relaxed opacity-90">{wordEvaluation.message}</p>
          </div>
        )}

        {paragraphEvaluation && (
          <div className="p-4 rounded-2xl border bg-stone-50 border-stone-200 text-left space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-stone-900">
                Resultado de lectura: {paragraphEvaluation.scorePercent}% de precisión
              </span>
            </div>
            <p className="text-xs text-stone-700">{paragraphEvaluation.message}</p>
          </div>
        )}
      </div>

      {/* Accessible Keyboard Fallback */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => setShowManualInput((prev) => !prev)}
          className="text-[11px] font-medium text-stone-400 hover:text-stone-700 inline-flex items-center gap-1 cursor-pointer transition-colors"
        >
          <Keyboard className="w-3.5 h-3.5" />
          <span>{showManualInput ? 'Cerrar prueba por teclado' : '¿Sin micrófono? Escribir por teclado'}</span>
        </button>

        {showManualInput && (
          <form onSubmit={handleManualSubmit} className="mt-3 p-3 bg-white rounded-2xl border border-stone-200 text-left flex gap-2">
            <input
              type="text"
              value={manualText}
              onChange={(e) => setManualText(e.target.value)}
              placeholder="Escribe aquí tu palabra o frase..."
              className="flex-1 px-3 py-2 text-xs border border-stone-200 rounded-xl outline-none focus:border-stone-500"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-stone-900 text-white font-bold text-xs rounded-xl cursor-pointer hover:bg-stone-800"
            >
              Evaluar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
