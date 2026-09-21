import React, { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Mic,
  Square,
  Volume2,
  Sparkles,
  Star,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  BookOpen,
  Keyboard,
  Award,
  ArrowLeft,
  Pause,
  Play,
  Clock,
  ThumbsUp,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { PuduAvatar, PuduMood } from './PuduAvatar';
import {
  PUDU_WORDS_1_BASICO,
  PUDU_PHRASES_2_BASICO,
  PUDU_READINGS_3_BASICO,
  PUDU_READINGS_4_BASICO,
  PuduWordItem,
  PuduPhraseItem,
  PuduReadingText,
} from '../data/puduOralData';
import { speechReader } from '../utils/speechReader';
import { soundFx } from '../utils/soundEffects';
import {
  evaluateOralPronunciation,
  evaluateParagraphReading,
  SpeechEvaluationResult,
  ParagraphEvaluationResult,
} from '../utils/speechEvaluator';

interface PuduOralLabProps {
  initialNivel?: string;
  soundEnabled: boolean;
  onBackToHome: () => void;
}

type OralLevel = '1° Básico' | '2° Básico' | '3° Básico' | '4° Básico';

export const PuduOralLab: React.FC<PuduOralLabProps> = ({
  initialNivel = '1° Básico',
  soundEnabled,
  onBackToHome,
}) => {
  // Nivel seleccionado (1° a 4° Básico)
  const [selectedNivel, setSelectedNivel] = useState<OralLevel>(() => {
    if (['1° Básico', '2° Básico', '3° Básico', '4° Básico'].includes(initialNivel)) {
      return initialNivel as OralLevel;
    }
    return '1° Básico';
  });

  // Estado del Pudú
  const [puduMood, setPuduMood] = useState<PuduMood>('idle');
  const [puduMessage, setPuduMessage] = useState<string>('');

  // Puntuación y racha estilo Duolingo
  const [stars, setStars] = useState<number>(0);
  const [gems, setGems] = useState<number>(15);

  // Estados de ejercicio para 1° y 2° básico
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0);

  // Estados de ejercicio para 3° y 4° básico (Lecturas de 5 y 10 líneas)
  const [selectedReadingIndex, setSelectedReadingIndex] = useState<number>(0);

  // Estados de audio y grabación
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeakingModel, setIsSpeakingModel] = useState<boolean>(false);
  const [spokenTranscript, setSpokenTranscript] = useState<string>('');
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);

  // Evaluaciones
  const [wordEvaluation, setWordEvaluation] = useState<SpeechEvaluationResult | null>(null);
  const [paragraphEvaluation, setParagraphEvaluation] = useState<ParagraphEvaluationResult | null>(null);

  // Accesibilidad / Entrada manual por teclado
  const [showManualInput, setShowManualInput] = useState<boolean>(false);
  const [manualText, setManualText] = useState<string>('');

  // Refs de SpeechRecognition y temporizador de silencio (3 segundos)
  const recognitionRef = useRef<any>(null);
  const silenceTimeoutRef = useRef<any>(null);
  const timerIntervalRef = useRef<any>(null);
  const isStoppingRef = useRef<boolean>(false);

  // --------------------------------------------------------------------------
  // Datos reactivos según el nivel
  // --------------------------------------------------------------------------
  const currentWord: PuduWordItem = PUDU_WORDS_1_BASICO[currentWordIndex] || PUDU_WORDS_1_BASICO[0];
  const currentPhrase: PuduPhraseItem = PUDU_PHRASES_2_BASICO[currentPhraseIndex] || PUDU_PHRASES_2_BASICO[0];

  const readings3rd = PUDU_READINGS_3_BASICO;
  const currentReading3rd: PuduReadingText = readings3rd[selectedReadingIndex] || readings3rd[0];

  const readings4th = PUDU_READINGS_4_BASICO;
  const currentReading4th: PuduReadingText = readings4th[selectedReadingIndex] || readings4th[0];

  // Configurar mensaje del Pudú según el nivel
  useEffect(() => {
    speechReader.stop();
    stopListening();
    setSpokenTranscript('');
    setWordEvaluation(null);
    setParagraphEvaluation(null);
    setIsSpeakingModel(false);

    if (selectedNivel === '1° Básico') {
      setPuduMood('idle');
      setPuduMessage('¡Hola! Soy Pudú. Escucha cómo digo la palabra y luego repítela tocando el botón con tu dedito.');
    } else if (selectedNivel === '2° Básico') {
      setPuduMood('idle');
      setPuduMessage('¡Excelente! En 2° básico leemos frases breves. Escucha el ritmo y dilo con tu voz clara.');
    } else if (selectedNivel === '3° Básico') {
      setPuduMood('idle');
      setPuduMessage('¡Desafío de 3° básico! Lee este texto de 5 líneas en voz alta. Toma aire en las comas y haz una pausa en los puntos.');
    } else if (selectedNivel === '4° Básico') {
      setPuduMood('idle');
      setPuduMessage('¡Nivel Maestro de 4° básico! Lee este texto de 10 líneas con expresividad, volumen y entonación. ¡Tú puedes!');
    }
  }, [selectedNivel]);

  // Limpiar temporizadores al desmontar
  useEffect(() => {
    return () => {
      speechReader.stop();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Ignorar
        }
      }
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // --------------------------------------------------------------------------
  // Reproducir voz modelo del Pudú / Profesor
  // --------------------------------------------------------------------------
  const handlePlayModelAudio = () => {
    speechReader.stop();

    if (isSpeakingModel) {
      setIsSpeakingModel(false);
      setPuduMood('idle');
      return;
    }

    let textToSpeak = '';
    let rate = 0.85;

    if (selectedNivel === '1° Básico') {
      textToSpeak = `${currentWord.palabra}. ${currentWord.silabeo}. ${currentWord.ejemplo}`;
      rate = 0.78;
    } else if (selectedNivel === '2° Básico') {
      textToSpeak = currentPhrase.frase;
      rate = 0.82;
    } else if (selectedNivel === '3° Básico') {
      textToSpeak = currentReading3rd.textoContinuo || currentReading3rd.lineas.join('. ');
      rate = 0.88;
    } else {
      textToSpeak = currentReading4th.textoContinuo || currentReading4th.lineas.join('. ');
      rate = 0.92;
    }

    setIsSpeakingModel(true);
    setPuduMood('speaking');

    speechReader.speak(textToSpeak, {
      rate,
      onStart: () => {
        setIsSpeakingModel(true);
        setPuduMood('speaking');
      },
      onEnd: () => {
        setIsSpeakingModel(false);
        setPuduMood('idle');
      },
      onError: () => {
        setIsSpeakingModel(false);
        setPuduMood('idle');
      },
    });
  };

  // --------------------------------------------------------------------------
  // Detener la grabación (Llamada con el dedito o automáticamente a los 3 seg de silencio)
  // --------------------------------------------------------------------------
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
        // Ignorar
      }
    }

    setIsListening(false);
    isStoppingRef.current = true;
  };

  // --------------------------------------------------------------------------
  // Iniciar / Detener grabación con el micrófono
  // --------------------------------------------------------------------------
  const handleToggleListening = () => {
    speechReader.stop();
    setIsSpeakingModel(false);

    if (isListening) {
      // El niño tocó el botón gigante con su dedito para detener
      stopListening();
      if (soundEnabled) soundFx.playPop();
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setShowManualInput(true);
      setPuduMood('thinking');
      setPuduMessage(
        'Tu navegador no tiene activo el micrófono web. Puedes escribir tu respuesta con el teclado en la caja de texto inferior.'
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-CL';
      // En 3° y 4° básico necesitamos continuous = true para leer párrafos largos
      recognition.continuous = selectedNivel === '3° Básico' || selectedNivel === '4° Básico';
      recognition.interimResults = true;
      recognition.maxAlternatives = 2;

      isStoppingRef.current = false;
      setSpokenTranscript('');
      setWordEvaluation(null);
      setParagraphEvaluation(null);
      setRecordingSeconds(0);

      // Iniciar cronómetro de grabación
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);

      // Función para resetear el temporizador de silencio de 3 segundos
      const resetSilenceTimer = (currentTranscript: string) => {
        if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);

        // Si ya capturó algo significativo, esperar 3 segundos de silencio para detener automáticamente
        silenceTimeoutRef.current = setTimeout(() => {
          if (!isStoppingRef.current) {
            stopListening();
            if (currentTranscript.trim()) {
              processEvaluation(currentTranscript);
            }
          }
        }, 3000); // 3 segundos de silencio automático
      };

      recognition.onstart = () => {
        setIsListening(true);
        setPuduMood('listening');
        setPuduMessage('¡Te escucho atentamente! Lee frente a la pantalla o toca el botón con tu dedito al terminar.');
        if (soundEnabled) soundFx.playPop();

        // Si pasan 7 segundos sin decir nada al principio, detener
        silenceTimeoutRef.current = setTimeout(() => {
          if (!isStoppingRef.current) {
            stopListening();
            setPuduMood('thinking');
            setPuduMessage('No alcancé a escuchar tu voz. Acércate un poquito más al micrófono y vuelve a tocar el botón.');
          }
        }, 7000);
      };

      let accumulatedText = '';

      recognition.onresult = (event: any) => {
        let interimText = '';
        let finalText = '';

        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalText += result[0].transcript + ' ';
          } else {
            interimText += result[0].transcript;
          }
        }

        const currentLive = (finalText + interimText).trim();
        accumulatedText = currentLive;
        setSpokenTranscript(currentLive);

        // Reiniciar el temporizador de 3 segundos de silencio tras cada palabra detectada
        resetSilenceTimer(currentLive);
      };

      recognition.onerror = (event: any) => {
        stopListening();
        if (event.error === 'no-speech') {
          setPuduMood('thinking');
          setPuduMessage('No detecté sonido de voz. Toca el botón verde e inténtalo de nuevo.');
        } else {
          setPuduMood('thinking');
          setPuduMessage('Permiso de micrófono no otorgado. Puedes usar la casilla de teclado abajo.');
          setShowManualInput(true);
        }
      };

      recognition.onend = () => {
        stopListening();
        if (accumulatedText.trim()) {
          processEvaluation(accumulatedText);
        } else {
          setPuduMood('idle');
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      stopListening();
      setShowManualInput(true);
    }
  };

  // --------------------------------------------------------------------------
  // Procesamiento y Calificación según el Nivel
  // --------------------------------------------------------------------------
  const processEvaluation = (transcript: string) => {
    const cleanText = transcript.trim();
    if (!cleanText) return;

    if (selectedNivel === '1° Básico') {
      const result = evaluateOralPronunciation(cleanText, currentWord.palabra, currentWord.pistaFonema);
      setWordEvaluation(result);

      if (result.status === 'correct') {
        setPuduMood('celebrating');
        setPuduMessage(`¡Maravilloso! Pronunciaste «${currentWord.palabra}» a la perfección. ¡Ganaste una estrella! ⭐`);
        setStars((prev) => prev + 1);
        setGems((prev) => prev + 2);
        if (soundEnabled) soundFx.playFanfare();
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } else if (result.status === 'close') {
        setPuduMood('thinking');
        setPuduMessage(`¡Muy cerca! Escuché «${cleanText}». La palabra es «${currentWord.palabra}». ${currentWord.pistaFonema}.`);
        if (soundEnabled) soundFx.playTryAgain();
      } else {
        setPuduMood('thinking');
        setPuduMessage(`No te preocupes. Escucha cómo lo digo yo con el botón amarillo y repítelo con calma.`);
        if (soundEnabled) soundFx.playTryAgain();
      }
    } else if (selectedNivel === '2° Básico') {
      const result = evaluateOralPronunciation(cleanText, currentPhrase.frase, currentPhrase.pista);
      setWordEvaluation(result);

      if (result.status === 'correct') {
        setPuduMood('celebrating');
        setPuduMessage(`¡Extraordinario! Leíste toda la frase con gran ritmo y claridad. ⭐`);
        setStars((prev) => prev + 1);
        setGems((prev) => prev + 3);
        if (soundEnabled) soundFx.playFanfare();
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } else {
        setPuduMood('thinking');
        setPuduMessage(`¡Buen intento! Escuché «${cleanText}». Vuelve a escuchar la frase y dilo de nuevo.`);
        if (soundEnabled) soundFx.playTryAgain();
      }
    } else if (selectedNivel === '3° Básico') {
      const targetText = currentReading3rd.textoContinuo || currentReading3rd.lineas.join(' ');
      const result = evaluateParagraphReading(cleanText, targetText);
      setParagraphEvaluation(result);

      if (result.scorePercent >= 70) {
        setPuduMood('celebrating');
        setPuduMessage(`¡Lectura brillante! Leíste el ${result.scorePercent}% del texto respetando las pausas. ¡Gran lector! 🏆`);
        setStars((prev) => prev + 2);
        setGems((prev) => prev + 5);
        if (soundEnabled) soundFx.playFanfare();
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.65 } });
      } else {
        setPuduMood('thinking');
        setPuduMessage(`¡Muy buen esfuerzo! Registramos el ${result.scorePercent}% del texto. Escucha el audio modelo y vuelve a leerlo con pausas.`);
        if (soundEnabled) soundFx.playTryAgain();
      }
    } else {
      // 4° Básico (Lectura de corrido)
      const targetText = currentReading4th.textoContinuo || currentReading4th.lineas.join(' ');
      const result = evaluateParagraphReading(cleanText, targetText);
      setParagraphEvaluation(result);

      if (result.scorePercent >= 65) {
        setPuduMood('celebrating');
        setPuduMessage(`¡Impresionante! Completaste la lectura de 10 líneas con un ${result.scorePercent}% de fluidez y precisión. ¡Nivel experto! 🌟`);
        setStars((prev) => prev + 3);
        setGems((prev) => prev + 8);
        if (soundEnabled) soundFx.playFanfare();
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      } else {
        setPuduMood('thinking');
        setPuduMessage(`¡Buen camino! Leíste el ${result.scorePercent}% del texto de 10 líneas. Tómate tu tiempo para respirar en cada punto.`);
        if (soundEnabled) soundFx.playTryAgain();
      }
    }
  };

  // Envío manual por teclado
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualText.trim()) return;
    setSpokenTranscript(manualText);
    processEvaluation(manualText);
  };

  // Cambiar de palabra / frase / lectura
  const handleNextItem = () => {
    speechReader.stop();
    setSpokenTranscript('');
    setWordEvaluation(null);
    setParagraphEvaluation(null);
    setManualText('');
    setPuduMood('idle');

    if (selectedNivel === '1° Básico') {
      setCurrentWordIndex((prev) => (prev + 1) % PUDU_WORDS_1_BASICO.length);
      setPuduMessage('¡Siguiente palabra! Escucha y repite conmigo.');
    } else if (selectedNivel === '2° Básico') {
      setCurrentPhraseIndex((prev) => (prev + 1) % PUDU_PHRASES_2_BASICO.length);
      setPuduMessage('¡Siguiente frase! Escucha el ritmo y la entonación.');
    } else if (selectedNivel === '3° Básico') {
      setSelectedReadingIndex((prev) => (prev + 1) % readings3rd.length);
      setPuduMessage('¡Nueva lectura de 5 líneas lista! Prepárate para leer en voz alta.');
    } else {
      setSelectedReadingIndex((prev) => (prev + 1) % readings4th.length);
      setPuduMessage('¡Nuevo texto de 10 líneas listo! Concéntrate en tu respiración y fluidez.');
    }
  };

  const handlePrevItem = () => {
    speechReader.stop();
    setSpokenTranscript('');
    setWordEvaluation(null);
    setParagraphEvaluation(null);
    setManualText('');
    setPuduMood('idle');

    if (selectedNivel === '1° Básico') {
      setCurrentWordIndex((prev) => (prev - 1 + PUDU_WORDS_1_BASICO.length) % PUDU_WORDS_1_BASICO.length);
    } else if (selectedNivel === '2° Básico') {
      setCurrentPhraseIndex((prev) => (prev - 1 + PUDU_PHRASES_2_BASICO.length) % PUDU_PHRASES_2_BASICO.length);
    } else if (selectedNivel === '3° Básico') {
      setSelectedReadingIndex((prev) => (prev - 1 + readings3rd.length) % readings3rd.length);
    } else {
      setSelectedReadingIndex((prev) => (prev - 1 + readings4th.length) % readings4th.length);
    }
  };

  return (
    <div className="space-y-2.5 sm:space-y-4 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Barra superior estilo Duolingo: Progreso, Estrellas, Gemas y Salir */}
      <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-stone-200 p-2 sm:p-3 shadow-xs flex items-center justify-between gap-2">
        <button
          type="button"
          id="btn-pudu-back-home"
          onClick={onBackToHome}
          className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-extrabold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer border border-stone-200 shrink-0"
          title="Volver a los cursos y asignaturas"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span className="hidden sm:inline">Volver a Cursos</span>
          <span className="sm:hidden">Salir</span>
        </button>

        {/* Nivel Selector Tabs Estilo Duolingo */}
        <div className="flex items-center gap-1 p-0.5 sm:p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs font-black overflow-x-auto">
          {(['1° Básico', '2° Básico', '3° Básico', '4° Básico'] as OralLevel[]).map((nivel) => {
            const isSelected = selectedNivel === nivel;
            return (
              <button
                key={nivel}
                type="button"
                id={`tab-pudu-level-${nivel.replace('° ', '-').toLowerCase()}`}
                onClick={() => setSelectedNivel(nivel)}
                className={`px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer text-[11px] sm:text-xs ${
                  isSelected
                    ? 'bg-emerald-500 text-white shadow-xs font-black'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                }`}
              >
                <span>{nivel}</span>
              </button>
            );
          })}
        </div>

        {/* Estrellas y Gemas ganadas */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-black">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-400" />
            <span>{stars}</span>
          </div>
          <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-black">
            <span className="text-xs sm:text-sm">💎</span>
            <span>{gems}</span>
          </div>
        </div>
      </div>

      {/* Banner compacto del Pudú Pedagógico (optimizado para pantalla completa móvil) */}
      <div className="bg-gradient-to-r from-emerald-50 via-emerald-100/40 to-amber-50/40 rounded-xl sm:rounded-2xl border border-emerald-200/90 p-2 sm:p-2.5 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center">
            <PuduAvatar
              mood={puduMood}
              size="sm"
              showSpeechBubble={false}
              className="w-11 h-11 sm:w-12 sm:h-12"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider">
                {selectedNivel}
              </span>
              <span className="text-[11px] font-extrabold text-stone-700 truncate">
                {selectedNivel === '1° Básico' && 'Palabras y Sílabas'}
                {selectedNivel === '2° Básico' && 'Frases con Entonación'}
                {selectedNivel === '3° Básico' && 'Lectura Breve con Pausas'}
                {selectedNivel === '4° Básico' && 'Lectura de Corrido'}
              </span>
            </div>
            <p className="text-xs font-semibold text-emerald-950 mt-0.5 truncate">
              {puduMessage}
            </p>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* CASO 1: 1° BÁSICO (REPETICIÓN DE PALABRAS Y SÍLABAS)                   */}
      {/* ===================================================================== */}
      {selectedNivel === '1° Básico' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-stone-200 p-3.5 sm:p-5 shadow-xs space-y-3 sm:space-y-4 text-center">
          {/* Indicador de palabra actual */}
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold px-1">
            <span>Palabra {currentWordIndex + 1} de {PUDU_WORDS_1_BASICO.length}</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={handlePrevItem}
                className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                title="Palabra anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextItem}
                className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                title="Siguiente palabra"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tarjeta de la palabra central estilo Duolingo */}
          <div className="py-4 px-3 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-2">
            <div className="text-4xl">{currentWord.icono}</div>
            <h3 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-wide">
              {currentWord.palabra}
            </h3>
            <div className="inline-block px-3 py-1 rounded-full bg-white border border-amber-300 text-amber-900 font-black text-xs sm:text-sm tracking-widest shadow-2xs">
              {currentWord.silabeo}
            </div>
            <p className="text-xs text-stone-600 font-medium italic">
              «{currentWord.ejemplo}»
            </p>
            <p className="text-[11px] text-amber-800 font-bold">
              💡 Pista: {currentWord.pistaFonema}
            </p>
          </div>

          {/* Botones de acción estilo Duolingo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {/* Botón 1: Escuchar al Pudú */}
            <button
              type="button"
              id="btn-pudu-hear-word"
              onClick={handlePlayModelAudio}
              disabled={isListening}
              className={`w-full py-2.5 px-4 rounded-xl border-b-4 text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                isSpeakingModel
                  ? 'bg-amber-500 border-amber-700 text-white animate-pulse'
                  : 'bg-amber-400 hover:bg-amber-500 active:translate-y-1 active:border-b-0 border-amber-600 text-stone-900'
              }`}
            >
              <Volume2 className="w-4 h-4 stroke-[2.5] shrink-0" />
              <span>{isSpeakingModel ? 'Pudú hablando...' : 'Escuchar cómo se dice'}</span>
            </button>

            {/* Botón 2: Botón de grabación con micrófono (Tocar con el dedito) */}
            <button
              type="button"
              id="btn-pudu-record-word"
              onClick={handleToggleListening}
              disabled={isSpeakingModel}
              className={`w-full py-2.5 px-4 rounded-xl border-b-4 text-sm sm:text-base font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                isListening
                  ? 'bg-rose-500 hover:bg-rose-600 active:translate-y-1 active:border-b-0 border-rose-700 text-white animate-pulse ring-4 ring-rose-200'
                  : 'bg-emerald-500 hover:bg-emerald-600 active:translate-y-1 active:border-b-0 border-emerald-700 text-white'
              }`}
            >
              {isListening ? (
                <>
                  <Square className="w-4 h-4 fill-current shrink-0" />
                  <span>Detener con mi dedito ✋🛑</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 stroke-[2.5] shrink-0" />
                  <span>Hablar con mi dedito 🎙️</span>
                </>
              )}
            </button>
          </div>

          {/* Temporizador o indicador de silencio automático */}
          {isListening && (
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-2 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0"></span>
              <span>Grabando ({recordingSeconds}s)... Habla claro con tu dedito.</span>
            </div>
          )}

          {/* Resultado de la evaluación */}
          {wordEvaluation && (
            <div
              className={`p-4 rounded-2xl border-2 text-left space-y-1 transition-all ${
                wordEvaluation.status === 'correct'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : wordEvaluation.status === 'close'
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-sm flex items-center gap-2">
                  {wordEvaluation.status === 'correct' && '🎉 ¡Excelente pronunciación!'}
                  {wordEvaluation.status === 'close' && '⚠️ ¡Muy cerquita!'}
                  {wordEvaluation.status === 'incorrect' && '🔄 Intentemos de nuevo'}
                </span>
                <span className="text-xs font-bold bg-white/80 px-2 py-0.5 rounded border border-stone-200">
                  Escuchamos: «{spokenTranscript || wordEvaluation.transcript}»
                </span>
              </div>
              <p className="text-xs font-medium leading-relaxed">{wordEvaluation.message}</p>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* CASO 2: 2° BÁSICO (FRASES CORTAS DE 3 A 5 PALABRAS)                    */}
      {/* ===================================================================== */}
      {selectedNivel === '2° Básico' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-stone-200 p-3.5 sm:p-5 shadow-xs space-y-3 sm:space-y-4 text-center">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold px-1">
            <span>Frase {currentPhraseIndex + 1} de {PUDU_PHRASES_2_BASICO.length}</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={handlePrevItem}
                className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                title="Frase anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextItem}
                className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                title="Siguiente frase"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="py-4 px-3 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 space-y-2">
            <div className="text-4xl">{currentPhrase.icono}</div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 leading-snug">
              «{currentPhrase.frase}»
            </h3>
            <span className="inline-block px-3 py-0.5 rounded-full bg-white border border-emerald-300 text-emerald-900 font-bold text-xs">
              Tema: {currentPhrase.tema}
            </span>
            <p className="text-xs text-stone-600 font-medium">
              💡 {currentPhrase.pista}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              id="btn-pudu-hear-phrase"
              onClick={handlePlayModelAudio}
              disabled={isListening}
              className={`w-full py-2.5 px-4 rounded-xl border-b-4 text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                isSpeakingModel
                  ? 'bg-amber-500 border-amber-700 text-white animate-pulse'
                  : 'bg-amber-400 hover:bg-amber-500 active:translate-y-1 active:border-b-0 border-amber-600 text-stone-900'
              }`}
            >
              <Volume2 className="w-4 h-4 stroke-[2.5] shrink-0" />
              <span>{isSpeakingModel ? 'Pudú hablando...' : 'Escuchar la frase'}</span>
            </button>

            <button
              type="button"
              id="btn-pudu-record-phrase"
              onClick={handleToggleListening}
              disabled={isSpeakingModel}
              className={`w-full py-2.5 px-4 rounded-xl border-b-4 text-sm sm:text-base font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                isListening
                  ? 'bg-rose-500 hover:bg-rose-600 active:translate-y-1 active:border-b-0 border-rose-700 text-white animate-pulse ring-4 ring-rose-200'
                  : 'bg-emerald-500 hover:bg-emerald-600 active:translate-y-1 active:border-b-0 border-emerald-700 text-white'
              }`}
            >
              {isListening ? (
                <>
                  <Square className="w-4 h-4 fill-current shrink-0" />
                  <span>Detener con mi dedito ✋🛑</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 stroke-[2.5] shrink-0" />
                  <span>Decir la frase con mi dedito 🎙️</span>
                </>
              )}
            </button>
          </div>

          {isListening && (
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-2 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0"></span>
              <span>Grabando ({recordingSeconds}s)... Habla claro con tu dedito.</span>
            </div>
          )}

          {wordEvaluation && (
            <div
              className={`p-3 rounded-xl border text-left space-y-1 ${
                wordEvaluation.status === 'correct'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-sm">
                  {wordEvaluation.status === 'correct' ? '🎉 ¡Frase excelente!' : '⚠️ Probemos de nuevo'}
                </span>
                <span className="text-xs font-bold bg-white/80 px-2 py-0.5 rounded border border-stone-200">
                  Escuchamos: «{spokenTranscript || wordEvaluation.transcript}»
                </span>
              </div>
              <p className="text-xs font-medium leading-relaxed">{wordEvaluation.message}</p>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* CASO 3: 3° BÁSICO (LECTURA BREVE EN EL MISMO RECUADRO)                  */}
      {/* ===================================================================== */}
      {selectedNivel === '3° Básico' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-stone-200 p-3 sm:p-5 shadow-xs space-y-2.5 sm:space-y-3">
          {/* Selector de historias */}
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-stone-100">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-900 border border-sky-300 text-[10px] font-black uppercase">
                  Lectura Breve
                </span>
                <span className="text-[11px] font-bold text-stone-500">
                  {selectedReadingIndex + 1}/{readings3rd.length}
                </span>
                <span className="text-[11px] font-semibold text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
                  {currentReading3rd.palabrasObjetivo} palabras
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-stone-900 truncate mt-0.5">
                {currentReading3rd.titulo}
              </h3>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handlePrevItem}
                className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer inline-flex items-center gap-1"
                title="Texto anterior"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Anterior</span>
              </button>
              <button
                type="button"
                onClick={handleNextItem}
                className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer inline-flex items-center gap-1"
                title="Siguiente texto"
              >
                <span className="hidden sm:inline">Siguiente</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RECUADRO INTEGRADO 3° BÁSICO: TEXTO DE CORRIDO + MICRÓFONO EN EL MISMO LUGAR */}
          <div className="p-3 sm:p-4 rounded-xl bg-stone-50/90 border border-stone-200 shadow-2xs space-y-2.5">
            {/* Texto de corrido con comas y puntos destacados */}
            <div className="p-3 sm:p-4 rounded-lg bg-white border border-stone-200 shadow-2xs">
              <p className="font-serif text-base sm:text-lg text-stone-900 leading-snug sm:leading-relaxed tracking-normal">
                {currentReading3rd.textoContinuo.split(/([,.])/).map((part, pIdx) => {
                  if (part === ',') {
                    return (
                      <span key={pIdx} className="text-amber-700 font-black bg-amber-100/80 px-1 rounded mx-0.5" title="Pausa breve para respirar (coma)">
                        ,
                      </span>
                    );
                  }
                  if (part === '.') {
                    return (
                      <span key={pIdx} className="text-indigo-700 font-black bg-indigo-100/80 px-1 rounded mx-0.5" title="Pausa completa (punto)">
                        .
                      </span>
                    );
                  }
                  return <span key={pIdx}>{part}</span>;
                })}
              </p>
            </div>

            {/* Aviso visual en vivo mientras graba */}
            {isListening && (
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg p-2 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping shrink-0"></span>
                <span>
                  Grabando ({recordingSeconds}s) • Lee con tranquilidad. Toca el botón rojo al terminar.
                </span>
              </div>
            )}

            {/* Botones de acción integrados directamente en el mismo recuadro */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
              <button
                type="button"
                id="btn-pudu-record-3b"
                onClick={handleToggleListening}
                disabled={isSpeakingModel}
                className={`w-full py-3 px-4 rounded-xl border-b-4 text-sm sm:text-base font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                  isListening
                    ? 'bg-rose-500 hover:bg-rose-600 active:translate-y-1 active:border-b-0 border-rose-700 text-white animate-pulse ring-4 ring-rose-200'
                    : 'bg-emerald-500 hover:bg-emerald-600 active:translate-y-1 active:border-b-0 border-emerald-700 text-white'
                }`}
              >
                {isListening ? (
                  <>
                    <Square className="w-4 h-4 fill-current shrink-0" />
                    <span>Detener mi lectura con el dedito ✋🛑</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 stroke-[2.5] shrink-0" />
                    <span>Presionar para leer con mi dedito 🎙️</span>
                  </>
                )}
              </button>

              <button
                type="button"
                id="btn-pudu-hear-3b"
                onClick={handlePlayModelAudio}
                disabled={isListening}
                className={`w-full py-3 px-4 rounded-xl border-b-4 text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                  isSpeakingModel
                    ? 'bg-amber-500 border-amber-700 text-white animate-pulse'
                    : 'bg-amber-400 hover:bg-amber-500 active:translate-y-1 active:border-b-0 border-amber-600 text-stone-900'
                }`}
              >
                <Volume2 className="w-4 h-4 stroke-[2.5] shrink-0" />
                <span>{isSpeakingModel ? 'Detener voz modelo' : 'Escuchar lectura modelo con pausas 🔊'}</span>
              </button>
            </div>
          </div>

          {/* Evaluación del párrafo para 3° básico */}
          {paragraphEvaluation && (
            <div className="p-3 sm:p-4 rounded-xl border-2 bg-stone-50 border-stone-300 space-y-3 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-200">
                <div>
                  <span className="text-xs font-bold text-stone-500 uppercase">Resultado de tu lectura</span>
                  <h4 className="text-sm sm:text-base font-black text-stone-900">
                    {paragraphEvaluation.scorePercent >= 70
                      ? '⭐ ¡Gran fluidez lectora!'
                      : '👍 ¡Muy buen entrenamiento de lectura!'}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-950 font-black text-xs border border-emerald-300">
                    {paragraphEvaluation.scorePercent}% precisión
                  </div>
                </div>
              </div>

              <p className="text-xs font-bold text-stone-700">{paragraphEvaluation.message}</p>

              {/* Mapa de palabras con resaltado verde de aciertos */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-stone-500 uppercase">
                  Palabras capturadas (verde = leída con éxito):
                </span>
                <div className="p-2.5 bg-white rounded-lg border border-stone-200 text-xs sm:text-sm leading-relaxed flex flex-wrap gap-1 font-serif max-h-36 overflow-y-auto">
                  {paragraphEvaluation.wordStatuses.map((ws, i) => (
                    <span
                      key={i}
                      className={`px-1 rounded ${
                        ws.matched
                          ? 'bg-emerald-100 text-emerald-950 font-semibold'
                          : 'text-stone-400'
                      }`}
                    >
                      {ws.word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* CASO 4: 4° BÁSICO (LECTURA DE CORRIDO EN EL MISMO RECUADRO)            */}
      {/* ===================================================================== */}
      {selectedNivel === '4° Básico' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-stone-200 p-3 sm:p-5 shadow-xs space-y-2.5 sm:space-y-3">
          {/* Cabecera del texto y navegación */}
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-stone-100">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-300 text-[10px] font-black uppercase">
                  Lectura de Corrido
                </span>
                <span className="text-[11px] font-bold text-stone-500">
                  {selectedReadingIndex + 1}/{readings4th.length}
                </span>
                <span className="text-[11px] font-semibold text-purple-800 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                  {currentReading4th.palabrasObjetivo} palabras
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-stone-900 truncate mt-0.5">
                {currentReading4th.titulo}
              </h3>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handlePrevItem}
                className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer inline-flex items-center gap-1"
                title="Texto anterior"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Anterior</span>
              </button>
              <button
                type="button"
                onClick={handleNextItem}
                className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer inline-flex items-center gap-1"
                title="Siguiente texto"
              >
                <span className="hidden sm:inline">Siguiente</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RECUADRO INTEGRADO: TEXTO DE CORRIDO + BOTÓN DE VOZ EN EL MISMO LUGAR */}
          <div className="p-3 sm:p-4 rounded-xl bg-stone-50/90 border border-stone-200 shadow-2xs space-y-2.5">
            {/* Texto de corrido con puntuación clara */}
            <div className="p-3 sm:p-4 rounded-lg bg-white border border-stone-200 shadow-2xs">
              <p className="font-serif text-base sm:text-lg text-stone-900 leading-snug sm:leading-relaxed tracking-normal">
                {currentReading4th.textoContinuo.split(/([,.])/).map((part, pIdx) => {
                  if (part === ',') {
                    return (
                      <span key={pIdx} className="text-amber-700 font-bold bg-amber-100/70 px-0.5 rounded mx-0.5" title="Coma: pausa breve">
                        ,
                      </span>
                    );
                  }
                  if (part === '.') {
                    return (
                      <span key={pIdx} className="text-purple-700 font-bold bg-purple-100/70 px-0.5 rounded mx-0.5" title="Punto: pausa completa">
                        .
                      </span>
                    );
                  }
                  return <span key={pIdx}>{part}</span>;
                })}
              </p>
            </div>

            {/* Aviso visual en vivo mientras graba */}
            {isListening && (
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg p-2 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping shrink-0"></span>
                <span>
                  Grabando ({recordingSeconds}s) • Lee con tranquilidad. Toca el botón rojo al terminar.
                </span>
              </div>
            )}

            {/* Botones de acción integrados directamente en el mismo recuadro */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
              {/* Botón principal de voz accesible con el dedo */}
              <button
                type="button"
                id="btn-pudu-record-4b"
                onClick={handleToggleListening}
                disabled={isSpeakingModel}
                className={`w-full py-3 px-4 rounded-xl border-b-4 text-sm sm:text-base font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                  isListening
                    ? 'bg-rose-500 hover:bg-rose-600 active:translate-y-1 active:border-b-0 border-rose-700 text-white animate-pulse ring-4 ring-rose-200'
                    : 'bg-emerald-500 hover:bg-emerald-600 active:translate-y-1 active:border-b-0 border-emerald-700 text-white'
                }`}
              >
                {isListening ? (
                  <>
                    <Square className="w-4 h-4 fill-current shrink-0" />
                    <span>Detener lectura con mi dedito ✋🛑</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 stroke-[2.5] shrink-0" />
                    <span>Presionar para leer con mi dedito 🎙️</span>
                  </>
                )}
              </button>

              {/* Botón para escuchar al modelo */}
              <button
                type="button"
                id="btn-pudu-hear-4b"
                onClick={handlePlayModelAudio}
                disabled={isListening}
                className={`w-full py-3 px-4 rounded-xl border-b-4 text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                  isSpeakingModel
                    ? 'bg-amber-500 border-amber-700 text-white animate-pulse'
                    : 'bg-amber-400 hover:bg-amber-500 active:translate-y-1 active:border-b-0 border-amber-600 text-stone-900'
                }`}
              >
                <Volume2 className="w-4 h-4 stroke-[2.5] shrink-0" />
                <span>{isSpeakingModel ? 'Detener voz modelo' : 'Escuchar lectura modelo 🔊'}</span>
              </button>
            </div>
          </div>

          {paragraphEvaluation && (
            <div className="p-3 sm:p-4 rounded-xl border-2 bg-stone-50 border-stone-300 space-y-3 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-200">
                <div>
                  <span className="text-xs font-bold text-stone-500 uppercase">Evaluación de Fluidez 4° Básico</span>
                  <h4 className="text-sm sm:text-base font-black text-stone-900">
                    {paragraphEvaluation.scorePercent >= 65
                      ? '🌟 ¡Lectura sobresaliente y expresiva!'
                      : '📖 ¡Gran práctica de lectura de corrido!'}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-950 font-black text-xs border border-purple-300">
                    {paragraphEvaluation.scorePercent}% precisión
                  </div>
                </div>
              </div>

              <p className="text-xs font-bold text-stone-700">{paragraphEvaluation.message}</p>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-stone-500 uppercase">
                  Seguimiento de lectura (verde = palabra reconocida):
                </span>
                <div className="p-2.5 bg-white rounded-lg border border-stone-200 text-xs sm:text-sm leading-relaxed flex flex-wrap gap-1 font-serif max-h-36 overflow-y-auto">
                  {paragraphEvaluation.wordStatuses.map((ws, i) => (
                    <span
                      key={i}
                      className={`px-1 rounded ${
                        ws.matched
                          ? 'bg-emerald-100 text-emerald-950 font-semibold'
                          : 'text-stone-400'
                      }`}
                    >
                      {ws.word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Opción accesible de prueba manual con teclado (DUA) */}
      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={() => setShowManualInput((prev) => !prev)}
          className="text-xs font-bold text-stone-500 hover:text-stone-800 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Keyboard className="w-3.5 h-3.5 text-stone-400" />
          <span>{showManualInput ? 'Ocultar prueba por teclado' : '¿Sin micrófono? Probar con teclado (DUA)'}</span>
        </button>

        {showManualInput && (
          <form onSubmit={handleManualSubmit} className="mt-3 p-4 bg-white rounded-2xl border border-stone-200 text-left space-y-3 max-w-xl mx-auto shadow-2xs">
            <label className="text-xs font-bold text-stone-700 block">
              Escribe lo que leíste o dijiste para probar la evaluación sin micrófono:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder="Escribe aquí las palabras..."
                className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-xl focus:border-emerald-500 outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Evaluar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
