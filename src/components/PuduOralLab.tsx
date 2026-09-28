import React, { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Mic,
  Square,
  Volume2,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Star,
  Keyboard,
  Sparkles,
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
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
  const [micErrorMessage, setMicErrorMessage] = useState<string | null>(null);

  const [wordEvaluation, setWordEvaluation] = useState<SpeechEvaluationResult | null>(null);
  const [paragraphEvaluation, setParagraphEvaluation] = useState<ParagraphEvaluationResult | null>(null);

  const [showManualInput, setShowManualInput] = useState<boolean>(false);
  const [manualText, setManualText] = useState<string>('');

  const recognitionRef = useRef<any>(null);
  const silenceTimeoutRef = useRef<any>(null);
  const maxDurationTimeoutRef = useRef<any>(null);
  const timerIntervalRef = useRef<any>(null);
  const latestTranscriptRef = useRef<string>('');
  const hasEvaluatedRef = useRef<boolean>(false);

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

  // Generate child-friendly simulated options for fast 1-tap testing & voice practice
  const simulatedOptions = useMemo(() => {
    const text = (currentExercise.texto || '').trim();
    if (currentExercise.tipo === 'parrafo') {
      return {
        correct: text,
        close: text.slice(0, Math.max(10, Math.floor(text.length * 0.75))),
        wrong: 'Había una vez en otro lugar lejano...',
      };
    }
    if (currentExercise.tipo === 'frase') {
      const words = text.split(' ');
      const close = words.length > 2 ? words.slice(0, -1).join(' ') + ' ...' : text + ' casi';
      return {
        correct: text,
        close: close,
        wrong: 'El gato duerme tranquilo',
      };
    }
    // palabra
    let close = text.replace(/r/gi, 'l').replace(/s/gi, 'x');
    if (close.toLowerCase() === text.toLowerCase()) {
      close = text.slice(0, -1) + 'a';
    }
    const wrong = text.toLowerCase() === 'sol' ? 'Luna' : 'Pez';
    return {
      correct: text,
      close: close,
      wrong: wrong,
    };
  }, [currentExercise]);

  // Stop listening safely and optionally trigger evaluation
  const stopListeningAndEvaluate = (skipEvaluation = false) => {
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
    if (maxDurationTimeoutRef.current) {
      clearTimeout(maxDurationTimeoutRef.current);
      maxDurationTimeoutRef.current = null;
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

    if (!skipEvaluation && !hasEvaluatedRef.current) {
      hasEvaluatedRef.current = true;
      const textToEvaluate = latestTranscriptRef.current;
      processEvaluation(textToEvaluate);
    }
  };

  // Reset states when changing animal or level
  useEffect(() => {
    speechReader.stop();
    stopListeningAndEvaluate(true);
    setSpokenTranscript('');
    setWordEvaluation(null);
    setParagraphEvaluation(null);
    setMicErrorMessage(null);
    setIsSpeakingModel(false);
    setCurrentIndex(0);
    setAnimalMood('idle');
  }, [selectedSpecies, selectedNivel]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      speechReader.stop();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
      if (maxDurationTimeoutRef.current) clearTimeout(maxDurationTimeoutRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const handlePlayModelAudio = () => {
    if (isListening) stopListeningAndEvaluate(true);

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

  const handleToggleListening = () => {
    speechReader.stop();
    setIsSpeakingModel(false);

    // If currently listening, clicking the button immediately stops and evaluates!
    if (isListening) {
      if (soundEnabled) soundFx.playPop();
      stopListeningAndEvaluate(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicErrorMessage(
        'Tu navegador no tiene activo el reconocimiento por voz web directo. ¡No te preocupes! Puedes escribir tu respuesta abajo para evaluarla y ganar tus estrellas ⭐'
      );
      setShowManualInput(true);
      setAnimalMood('thinking');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      const isEnglish = selectedSpecies === 'rana';
      recognition.lang = isEnglish ? 'en-US' : 'es-CL';
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 3;

      latestTranscriptRef.current = '';
      hasEvaluatedRef.current = false;
      setSpokenTranscript('');
      setWordEvaluation(null);
      setParagraphEvaluation(null);
      setMicErrorMessage(null);
      setRecordingSeconds(0);

      // Timer counter
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);

      // Max recording duration safeguard
      const maxSeconds = currentExercise.tipo === 'parrafo' ? 25000 : 12000;
      maxDurationTimeoutRef.current = setTimeout(() => {
        stopListeningAndEvaluate(false);
      }, maxSeconds);

      const resetSilenceTimer = () => {
        if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
        const delay = currentExercise.tipo === 'parrafo' ? 5000 : 3500;
        silenceTimeoutRef.current = setTimeout(() => {
          stopListeningAndEvaluate(false);
        }, delay);
      };

      recognition.onstart = () => {
        setIsListening(true);
        setAnimalMood('listening');
        if (soundEnabled) soundFx.playPop();
      };

      recognition.onresult = (event: any) => {
        let interimText = '';
        let finalText = '';

        for (let i = 0; i < event.results.length; i++) {
          const res = event.results[i];
          const chunk = res[0]?.transcript || '';
          if (res.isFinal) {
            finalText += chunk + ' ';
          } else {
            interimText += chunk + ' ';
          }
        }

        const combined = (finalText + interimText).trim();
        if (combined) {
          latestTranscriptRef.current = combined;
          setSpokenTranscript(combined);
        }

        // For single word exercises (like "Ostra"), when spoken, allow a natural pause before evaluation
        if (currentExercise.tipo === 'palabra' && combined) {
          if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
          silenceTimeoutRef.current = setTimeout(() => {
            stopListeningAndEvaluate(false);
          }, 2000);
        } else {
          resetSilenceTimer();
        }
      };

      recognition.onerror = (event: any) => {
        const error = event.error;
        if (error === 'not-allowed' || error === 'service-not-allowed') {
          stopListeningAndEvaluate(true);
          setMicErrorMessage(
            'El micrófono está bloqueado o requiere permisos en tu navegador. Puedes habilitarlo haciendo clic en el ícono del candado o la cámara en la barra de direcciones, o probar escribiendo abajo.'
          );
          setShowManualInput(true);
          setAnimalMood('thinking');
          if (soundEnabled) soundFx.playTryAgain();
        } else if (error === 'no-speech') {
          stopListeningAndEvaluate(false);
        } else {
          stopListeningAndEvaluate(false);
        }
      };

      recognition.onend = () => {
        stopListeningAndEvaluate(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      stopListeningAndEvaluate(true);
      setMicErrorMessage(
        'No se pudo activar el micrófono. Puedes utilizar la prueba escrita por teclado para evaluar la pronunciación y ganar estrellas ⭐'
      );
      setShowManualInput(true);
    }
  };

  const processEvaluation = (transcript: string) => {
    const cleanTranscript = (transcript || '').trim();
    setSpokenTranscript(cleanTranscript);

    if (currentExercise.tipo === 'parrafo') {
      const result = evaluateParagraphReading(cleanTranscript, currentExercise.texto);
      setParagraphEvaluation(result);
      setWordEvaluation(null);

      if (result.status === 'correct') {
        setAnimalMood('celebrating');
        setStars((prev) => prev + 2);
        if (soundEnabled) {
          soundFx.playCelebration();
          soundFx.playCorrect();
        }
        confetti({ particleCount: 75, spread: 80, origin: { y: 0.65 } });
        speechReader.speak(`¡Excelente lectura! Lograste el ${result.scorePercent} por ciento de precisión.`);
      } else if (result.status === 'close') {
        setAnimalMood('thinking');
        if (soundEnabled) soundFx.playTryAgain();
        speechReader.speak(`¡Buen esfuerzo! Lograste el ${result.scorePercent} por ciento. Inténtalo de nuevo.`);
      } else if (result.status === 'silence') {
        setAnimalMood('thinking');
        if (soundEnabled) soundFx.playTryAgain();
        speechReader.speak('No logramos escuchar tu voz. Acércate al micrófono y lee en voz alta.');
      } else {
        setAnimalMood('thinking');
        if (soundEnabled) soundFx.playIncorrect();
        speechReader.speak('Escucha el audio modelo y vuelve a leerlo con calma.');
      }
    } else {
      const result = evaluateOralPronunciation(
        cleanTranscript,
        currentExercise.texto,
        currentExercise.pista
      );
      setWordEvaluation(result);
      setParagraphEvaluation(null);

      if (result.status === 'correct') {
        setAnimalMood('celebrating');
        setStars((prev) => prev + 1);
        if (soundEnabled) {
          soundFx.playCelebration();
          soundFx.playCorrect();
        }
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.65 } });
        speechReader.speak(`¡Muy bien! Pronunciaste excelente ${currentExercise.texto}.`);
      } else if (result.status === 'close') {
        setAnimalMood('thinking');
        if (soundEnabled) soundFx.playTryAgain();
        speechReader.speak(`¡Casi! Dijiste ${result.bestMatchWord || cleanTranscript}. La palabra es ${currentExercise.texto}.`);
      } else if (result.status === 'silence') {
        setAnimalMood('thinking');
        if (soundEnabled) soundFx.playTryAgain();
        speechReader.speak(`No alcanzamos a escuchar tu voz. Acércate al micrófono y di ${currentExercise.texto}.`);
      } else {
        setAnimalMood('thinking');
        if (soundEnabled) soundFx.playIncorrect();
        speechReader.speak(`Escuchamos ${cleanTranscript || 'otra palabra'}, pero la palabra correcta es ${currentExercise.texto}. ¡Escucha cómo suena e inténtalo otra vez!`);
      }
    }
  };

  const handleSimulatedPronunciation = (simulatedText: string) => {
    speechReader.stop();
    stopListeningAndEvaluate(true);
    setMicErrorMessage(null);
    latestTranscriptRef.current = simulatedText;
    hasEvaluatedRef.current = true;
    processEvaluation(simulatedText);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualText.trim()) return;
    stopListeningAndEvaluate(true);
    latestTranscriptRef.current = manualText.trim();
    hasEvaluatedRef.current = true;
    processEvaluation(manualText.trim());
  };

  const handleNextItem = () => {
    speechReader.stop();
    stopListeningAndEvaluate(true);
    setSpokenTranscript('');
    setWordEvaluation(null);
    setParagraphEvaluation(null);
    setMicErrorMessage(null);
    setManualText('');
    setAnimalMood('idle');
    setCurrentIndex((prev) => (prev + 1) % availableExercises.length);
  };

  const handlePrevItem = () => {
    speechReader.stop();
    stopListeningAndEvaluate(true);
    setSpokenTranscript('');
    setWordEvaluation(null);
    setParagraphEvaluation(null);
    setMicErrorMessage(null);
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

        {/* Live Audio Visualizer Banner when listening */}
        {isListening && (
          <div className="p-3.5 bg-rose-50 border-2 border-rose-300 rounded-2xl text-center space-y-2 animate-pulse shadow-xs">
            <div className="flex items-center justify-center gap-2 text-rose-700 font-black text-xs sm:text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping inline-block" />
              <span>🎙️ Grabando tu voz ({recordingSeconds}s)... Di en voz alta: «{currentExercise.texto}»</span>
            </div>
            {spokenTranscript ? (
              <div className="text-xs font-bold text-rose-900 bg-white/90 py-1.5 px-3 rounded-xl inline-block border border-rose-200 shadow-2xs">
                Escuchando: «{spokenTranscript}»
              </div>
            ) : (
              <p className="text-[11px] text-rose-600 italic">
                Habla cerca del micrófono. Evaluaremos tu pronunciación automáticamente.
              </p>
            )}
          </div>
        )}

        {/* Mic Error Banner if permissions are blocked */}
        {micErrorMessage && (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-start gap-2.5 text-left">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <p className="font-bold">Aviso del micrófono:</p>
              <p className="opacity-90">{micErrorMessage}</p>
            </div>
          </div>
        )}

        {/* Modern Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
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
                ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse ring-4 ring-rose-200 shadow-md'
                : `${currentCompanion.colorTheme.primary} hover:opacity-95 text-white`
            }`}
          >
            {isListening ? (
              <>
                <Square className="w-4 h-4 fill-current" />
                <span>Detener y Evaluar ({recordingSeconds}s)</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span>Practicar con mi voz</span>
              </>
            )}
          </button>
        </div>

        {/* Interactive Simulated Pronunciation Chips (Guaranteed instant success & practice) */}
        <div className="pt-2 pb-1 border-t border-stone-100 space-y-1.5 text-center">
          <div className="flex items-center justify-center gap-1.5 text-stone-600 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>O practica pronunciando con 1 toque táctil:</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              id="btn-oral-say-correct"
              onClick={() => handleSimulatedPronunciation(simulatedOptions.correct)}
              className="px-3.5 py-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-black text-xs border-2 border-emerald-400 shadow-2xs active:scale-95 cursor-pointer inline-flex items-center gap-1.5 transition-all"
              title={`Decir correctamente: «${simulatedOptions.correct}»`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Decir «{simulatedOptions.correct}» ⭐</span>
            </button>

            <button
              type="button"
              id="btn-oral-say-close"
              onClick={() => handleSimulatedPronunciation(simulatedOptions.close)}
              className="px-3 py-2 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs border border-amber-300 shadow-2xs active:scale-95 cursor-pointer inline-flex items-center gap-1.5 transition-all"
              title={`Probar pronunciación aproximada: «${simulatedOptions.close}»`}
            >
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Probar «{simulatedOptions.close}»</span>
            </button>

            <button
              type="button"
              id="btn-oral-say-wrong"
              onClick={() => handleSimulatedPronunciation(simulatedOptions.wrong)}
              className="px-3 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-950 font-bold text-xs border border-rose-300 shadow-2xs active:scale-95 cursor-pointer inline-flex items-center gap-1.5 transition-all"
              title={`Probar palabra diferente: «${simulatedOptions.wrong}»`}
            >
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Probar «{simulatedOptions.wrong}»</span>
            </button>
          </div>
        </div>

        {/* Word Evaluation feedback card */}
        {wordEvaluation && (
          <div
            className={`p-4 sm:p-5 rounded-2xl border text-left space-y-3 transition-all animate-in zoom-in-95 duration-200 shadow-xs ${
              wordEvaluation.status === 'correct'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 ring-2 ring-emerald-200'
                : wordEvaluation.status === 'close'
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : wordEvaluation.status === 'silence'
                ? 'bg-sky-50 border-sky-300 text-sky-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            {/* Header with status badge */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 font-black text-sm sm:text-base">
                {wordEvaluation.status === 'correct' && (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-emerald-800">🎉 ¡Muy bien pronunciado! (+1 ⭐)</span>
                  </>
                )}
                {wordEvaluation.status === 'close' && (
                  <>
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <span className="text-amber-800">⚠️ ¡Estuviste muy cerca!</span>
                  </>
                )}
                {wordEvaluation.status === 'silence' && (
                  <>
                    <Mic className="w-5 h-5 text-sky-600" />
                    <span className="text-sky-800">🎤 No alcanzamos a escuchar tu voz</span>
                  </>
                )}
                {wordEvaluation.status === 'incorrect' && (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span className="text-rose-800">❌ Vamos a corregir juntos</span>
                  </>
                )}
              </div>

              {(spokenTranscript || wordEvaluation.transcript) && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/80 border border-stone-200 text-stone-800">
                  Dijiste: «{spokenTranscript || wordEvaluation.transcript}»
                </span>
              )}
            </div>

            {/* Message & phonetic feedback */}
            <div className="text-xs sm:text-sm leading-relaxed space-y-1.5">
              <p className="font-medium">{wordEvaluation.message}</p>
              {wordEvaluation.status !== 'correct' && currentExercise.pista && (
                <p className="text-xs font-semibold opacity-90">
                  💡 Pista de apoyo: {currentExercise.pista}
                </p>
              )}
            </div>

            {/* Quick Action buttons */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              {wordEvaluation.status === 'correct' ? (
                <button
                  type="button"
                  onClick={handleNextItem}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <span>Siguiente desafío</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handlePlayModelAudio}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Escuchar modelo</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleToggleListening}
                    className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Intentar otra vez</span>
                  </button>
                </>
              )}
            </div>

            {/* Fallback confirmation if mic had silence */}
            {wordEvaluation.status === 'silence' && (
              <div className="pt-2">
                <button
                  type="button"
                  id="btn-confirm-word-fallback"
                  onClick={() => handleSimulatedPronunciation(currentExercise.texto)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-md inline-flex items-center justify-center gap-2 active:scale-95 cursor-pointer transition-all animate-bounce"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>¿Dijiste «{currentExercise.texto}»? ¡Toca aquí para ganar tu estrella! ⭐</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Paragraph Evaluation feedback card */}
        {paragraphEvaluation && (
          <div
            className={`p-4 sm:p-5 rounded-2xl border text-left space-y-3 transition-all animate-in zoom-in-95 duration-200 shadow-xs ${
              paragraphEvaluation.status === 'correct'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 ring-2 ring-emerald-200'
                : paragraphEvaluation.status === 'close'
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : paragraphEvaluation.status === 'silence'
                ? 'bg-sky-50 border-sky-300 text-sky-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 font-black text-sm sm:text-base">
                {paragraphEvaluation.status === 'correct' && (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-emerald-800">
                      🎉 ¡Lectura fantástica! ({paragraphEvaluation.scorePercent}% de precisión)
                    </span>
                  </>
                )}
                {paragraphEvaluation.status === 'close' && (
                  <>
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <span className="text-amber-800">
                      ⚠️ ¡Buen esfuerzo! ({paragraphEvaluation.scorePercent}% de precisión)
                    </span>
                  </>
                )}
                {paragraphEvaluation.status === 'silence' && (
                  <>
                    <Mic className="w-5 h-5 text-sky-600" />
                    <span className="text-sky-800">🎤 No alcanzamos a escuchar tu lectura</span>
                  </>
                )}
                {paragraphEvaluation.status === 'incorrect' && (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span className="text-rose-800">
                      📖 Sigamos practicando ({paragraphEvaluation.scorePercent}% registrado)
                    </span>
                  </>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm font-medium leading-relaxed">
              {paragraphEvaluation.message}
            </p>

            {paragraphEvaluation.wordStatuses && paragraphEvaluation.wordStatuses.length > 0 && (
              <div className="p-3 bg-white/80 rounded-xl border border-stone-200 flex flex-wrap gap-1.5 text-xs">
                {paragraphEvaluation.wordStatuses.map((ws, i) => (
                  <span
                    key={i}
                    className={`px-1.5 py-0.5 rounded font-medium ${
                      ws.matched
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-rose-100 text-rose-800 line-through opacity-70'
                    }`}
                  >
                    {ws.word}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 pt-1 flex-wrap">
              {paragraphEvaluation.status === 'correct' ? (
                <button
                  type="button"
                  onClick={handleNextItem}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <span>Siguiente texto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handlePlayModelAudio}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Escuchar modelo</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleToggleListening}
                    className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Leer otra vez</span>
                  </button>
                </>
              )}
            </div>

            {/* Fallback confirmation for paragraph if mic had silence */}
            {paragraphEvaluation.status === 'silence' && (
              <div className="pt-2">
                <button
                  type="button"
                  id="btn-confirm-paragraph-fallback"
                  onClick={() => handleSimulatedPronunciation(currentExercise.texto)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-md inline-flex items-center justify-center gap-2 active:scale-95 cursor-pointer transition-all animate-bounce"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>¡Toca aquí si leíste el texto para registrar tu avance y estrellas! ⭐</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Accessible Keyboard Fallback */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => setShowManualInput((prev) => !prev)}
          className="text-[11px] font-medium text-stone-500 hover:text-stone-800 inline-flex items-center gap-1 cursor-pointer transition-colors"
        >
          <Keyboard className="w-3.5 h-3.5" />
          <span>{showManualInput ? 'Cerrar prueba por teclado' : '¿Sin micrófono? Escribir por teclado'}</span>
        </button>

        {showManualInput && (
          <form onSubmit={handleManualSubmit} className="mt-3 p-3 bg-white rounded-2xl border border-stone-200 text-left flex gap-2 shadow-2xs">
            <input
              type="text"
              value={manualText}
              onChange={(e) => setManualText(e.target.value)}
              placeholder={`Escribe aquí «${currentExercise.texto}» para probar...`}
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
