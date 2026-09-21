import React, { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Mic,
  Volume2,
  Sparkles,
  Star,
  ChevronLeft,
  ChevronRight,
  Heart,
  Award,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Keyboard,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { getOralPracticeForNivelAndUnit, OralPracticeItem } from '../data/oralPracticeData';
import { getHistoriaOralPracticeForNivelAndUnit } from '../data/historiaOralData';
import { getMatematicaOralPracticeForNivelAndUnit } from '../data/matematicaOralData';
import { AsignaturaType } from '../types';
import { speechReader } from '../utils/speechReader';
import { soundFx } from '../utils/soundEffects';
import { evaluateOralPronunciation, SpeechEvaluationResult } from '../utils/speechEvaluator';

interface OralPracticeSectionProps {
  nivel: string;
  unidadNumero: string;
  unitTitle: string;
  inputText?: string;
  soundEnabled: boolean;
  speechSpeed?: 'slow' | 'normal';
  asignatura?: AsignaturaType;
}

export const OralPracticeSection: React.FC<OralPracticeSectionProps> = ({
  nivel,
  unidadNumero,
  unitTitle,
  inputText = '',
  soundEnabled,
  speechSpeed = 'slow',
  asignatura = 'lenguaje',
}) => {
  // Obtener las 30 palabras directamente del texto de esta unidad según la asignatura
  const items = useMemo(() => {
    if (asignatura === 'historia') {
      return getHistoriaOralPracticeForNivelAndUnit(nivel, unidadNumero, inputText);
    }
    if (asignatura === 'matematica') {
      return getMatematicaOralPracticeForNivelAndUnit(nivel, unidadNumero, inputText);
    }
    return getOralPracticeForNivelAndUnit(nivel, unidadNumero, inputText);
  }, [nivel, unidadNumero, inputText, asignatura]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [spokenTranscript, setSpokenTranscript] = useState<string>('');
  const [lastEvaluation, setLastEvaluation] = useState<SpeechEvaluationResult | null>(null);
  const [isSpeakingTeacher, setIsSpeakingTeacher] = useState<boolean>(false);
  const [micSupported, setMicSupported] = useState<boolean>(true);
  const [completedWordIds, setCompletedWordIds] = useState<Set<string>>(new Set());
  const [filterMode, setFilterMode] = useState<'all' | 'pending' | 'completed'>('all');
  const [showManualTestInput, setShowManualTestInput] = useState<boolean>(false);
  const [manualInputText, setManualInputText] = useState<string>('');

  const recognitionRef = useRef<any>(null);

  // Filtrado de palabras
  const filteredItems = useMemo(() => {
    if (filterMode === 'completed') {
      return items.filter((it) => completedWordIds.has(it.id));
    }
    if (filterMode === 'pending') {
      return items.filter((it) => !completedWordIds.has(it.id));
    }
    return items;
  }, [items, filterMode, completedWordIds]);

  const activeItem: OralPracticeItem | undefined =
    filteredItems[currentIndex] || filteredItems[0] || items[0];

  // Reiniciar estado al cambiar nivel o unidad
  useEffect(() => {
    setCurrentIndex(0);
    setSpokenTranscript('');
    setLastEvaluation(null);
    speechReader.stop();
  }, [nivel, unidadNumero]);

  // Reiniciar transcripción al cambiar de palabra
  useEffect(() => {
    setSpokenTranscript('');
    setLastEvaluation(null);
    setManualInputText('');
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignorar
      }
      setIsListening(false);
    }
  }, [currentIndex]);

  // Reproducir cómo se pronuncia la palabra
  const handleHearTeacher = () => {
    if (!activeItem) return;
    speechReader.stop();
    setIsSpeakingTeacher(true);

    const textToSpeak =
      activeItem.tipo === 'frase'
        ? activeItem.palabra
        : `${activeItem.palabra}. ${activeItem.fraseContexto}`;
    const rate = speechSpeed === 'slow' ? 0.75 : 0.92;

    speechReader.speak(textToSpeak, {
      rate,
      onEnd: () => setIsSpeakingTeacher(false),
      onError: () => setIsSpeakingTeacher(false),
    });
  };

  // Evaluar estrictamente lo que dijo el niño o lo que se ingresó
  const processTranscriptEvaluation = (transcript: string) => {
    if (!activeItem) return;
    setSpokenTranscript(transcript);

    const result = evaluateOralPronunciation(
      transcript,
      activeItem.palabra,
      activeItem.pistaFonema
    );

    setLastEvaluation(result);

    if (result.status === 'correct') {
      // ✅ CORRECTO: Celebración con estrellitas y fanfarria
      setCompletedWordIds((prev) => {
        const next = new Set(prev);
        next.add(activeItem.id);
        return next;
      });

      if (soundEnabled) {
        soundFx.playFanfare();
      }

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } else if (result.status === 'close') {
      // ⚠️ CERCANO: Casi, pero no correcto. Retroalimentación constructiva
      if (soundEnabled) {
        soundFx.playTryAgain();
      }
    } else {
      // ❌ INCORRECTO: Palabra diferente o inexistente (ej: "cenisejo"). Estricto pero empático
      if (soundEnabled) {
        soundFx.playTryAgain();
      }
    }
  };

  // Iniciar / Detener escucha con el micrófono
  const handleToggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Ignorar
        }
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicSupported(false);
      setShowManualTestInput(true);
      setLastEvaluation({
        status: 'silence',
        score: 0,
        bestMatchWord: '',
        transcript: '',
        targetWord: activeItem ? activeItem.palabra : '',
        message:
          'Tu navegador no tiene activo el reconocimiento de voz web. Puedes usar el botón de prueba escrita o abrir la app en Google Chrome o Microsoft Edge.',
      });
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-CL';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 3;

      recognition.onstart = () => {
        setIsListening(true);
        setSpokenTranscript('');
        setLastEvaluation(null);
        if (soundEnabled) soundFx.playPop();
      };

      recognition.onresult = (event: any) => {
        setIsListening(false);
        const transcript = event.results[0][0].transcript;
        processTranscriptEvaluation(transcript);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        const errorType = event.error;
        if (errorType === 'no-speech') {
          setLastEvaluation({
            status: 'silence',
            score: 0,
            bestMatchWord: '',
            transcript: '',
            targetWord: activeItem ? activeItem.palabra : '',
            message:
              'No logramos escuchar tu voz. Acércate un poquito más al micrófono y vuelve a presionar el botón rojo para intentarlo.',
          });
        } else {
          setLastEvaluation({
            status: 'silence',
            score: 0,
            bestMatchWord: '',
            transcript: '',
            targetWord: activeItem ? activeItem.palabra : '',
            message:
              'El micrófono requiere permiso en el navegador. Haz clic en el candado de la barra de direcciones para habilitar el micrófono.',
          });
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
      setShowManualTestInput(true);
    }
  };

  const handleManualTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInputText.trim()) return;
    processTranscriptEvaluation(manualInputText.trim());
  };

  if (!activeItem || items.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-stone-200">
        <p className="text-stone-600 text-sm">Cargando las palabras del texto...</p>
      </div>
    );
  }

  const syllableParts = activeItem.silabeo.split('-').map((s) => s.trim());
  const completedCount = items.filter((it) => completedWordIds.has(it.id)).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs space-y-5">
      {/* Header del Taller de Expresión Oral */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center shadow-xs shrink-0">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-base text-stone-900">
                Taller de Modulación y Comunicación Oral
              </h3>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                Eje Mineduc: Comunicación Oral
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                Evaluador Fonético Estricto y Empático
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-700 inline" />
              <span>
                30 palabras preestablecidas extraídas directamente del texto de {nivel} ({unidadNumero}).
              </span>
            </p>
          </div>
        </div>

        {/* Barra de Progreso y Navegación */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 self-start lg:self-center">
          {/* Contador y barra */}
          <div className="text-left sm:text-right">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-700">
                Palabra {currentIndex + 1} de {filteredItems.length}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                {completedCount} de {items.length} logradas ({progressPercent}%)
              </span>
            </div>
            <div className="w-36 h-2 bg-stone-100 rounded-full overflow-hidden mt-1 border border-stone-200">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Botones Anterior / Siguiente */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              type="button"
              id="btn-prev-oral-item"
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
              title="Palabra anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              id="btn-next-oral-item"
              onClick={() => setCurrentIndex((prev) => Math.min(filteredItems.length - 1, prev + 1))}
              disabled={currentIndex >= filteredItems.length - 1}
              className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
              title="Siguiente palabra"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tarjeta Principal de Pronunciación */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Columna Izquierda: La palabra, sus sílabas y contexto */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-amber-50/80 to-amber-50/40 border border-amber-200 text-center relative overflow-hidden shadow-2xs">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-2">
              <span>Palabra del texto oficial</span>
              {completedWordIds.has(activeItem.id) ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Lograda
                </span>
              ) : (
                <span className="text-stone-400">Por practicar</span>
              )}
            </div>

            {/* Palabra objetivo destacada */}
            <div className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight font-serif my-3">
              «{activeItem.palabra}»
            </div>

            {/* Desglose en sílabas grandes */}
            <div className="my-4">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-2">
                Desglose silábico para repetir:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {syllableParts.map((syllable, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-xl bg-white border-2 border-amber-300 text-amber-950 font-black text-xl sm:text-2xl shadow-xs"
                  >
                    {syllable}
                  </span>
                ))}
              </div>
            </div>

            {/* Pista fonológica de pronunciación */}
            {activeItem.pistaFonema && (
              <div className="p-3 rounded-xl bg-white/80 border border-amber-200 text-xs text-stone-700 max-w-lg mx-auto mt-4 text-left flex items-start gap-2">
                <span className="text-amber-600 font-bold shrink-0">💡 Fonética:</span>
                <span>{activeItem.pistaFonema}</span>
              </div>
            )}

            {/* Frase en contexto del texto */}
            <div className="mt-4 pt-3.5 border-t border-amber-200/70 text-xs text-stone-700 text-left">
              <span className="font-bold text-amber-950">Aparición en la lectura:</span>{' '}
              <span className="italic">«{activeItem.fraseContexto}»</span>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Controles de Audio y Micrófono Estricto */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* 1. Botón: Escuchar la voz del profesor */}
          <button
            type="button"
            id="btn-hear-teacher-oral"
            onClick={handleHearTeacher}
            disabled={isSpeakingTeacher}
            className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer shadow-2xs ${
              isSpeakingTeacher
                ? 'bg-amber-600 text-white border-amber-700 ring-2 ring-amber-400'
                : 'bg-white text-stone-800 border-stone-200 hover:bg-stone-50 hover:border-amber-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isSpeakingTeacher
                    ? 'bg-amber-700 text-white animate-pulse'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                <Volume2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-bold text-xs sm:text-sm text-stone-900">
                  {isSpeakingTeacher
                    ? 'Escuchando pronunciación del profesor...'
                    : '1. Escuchar al profesor'}
                </div>
                <div className="text-[11px] text-stone-500">
                  Modulación pausada y articulación clara
                </div>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-800 px-2.5 py-1 rounded-md bg-amber-50 shrink-0">
              {isSpeakingTeacher ? 'Sonando' : 'Escuchar'}
            </span>
          </button>

          {/* 2. Botón: Grabar la voz del estudiante (Evaluación Estricta) */}
          <button
            type="button"
            id="btn-record-child-voice"
            onClick={handleToggleListening}
            className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer shadow-xs ${
              isListening
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white border-blue-600 ring-4 ring-sky-200 shadow-md animate-pulse'
                : 'bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-800 hover:brightness-105'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                {isListening ? (
                  <Mic className="w-5 h-5 animate-bounce text-white" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </div>
              <div className="text-left">
                <div className="font-bold text-xs sm:text-sm">
                  {isListening
                    ? '¡Te estoy escuchando! 🎙️ Di la palabra...'
                    : '2. Presiona y di la palabra'}
                </div>
                <div className={`text-[11px] ${isListening ? 'text-sky-100 font-medium' : 'text-amber-100'}`}>
                  {isListening
                    ? `Pronuncia con calma: «${activeItem.palabra}»`
                    : 'Evaluación de dicción en tiempo real'}
                </div>
              </div>
            </div>
            <span className="text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-lg bg-white/25 shrink-0 shadow-2xs">
              {isListening ? 'Escuchando...' : 'Repetir 🎙️'}
            </span>
          </button>

          {/* Retroalimentación Estricta y Empática */}
          {lastEvaluation && (
            <div
              className={`p-4 rounded-xl border transition-all text-xs animate-in fade-in duration-200 ${
                lastEvaluation.status === 'correct'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs'
                  : lastEvaluation.status === 'close'
                  ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-xs'
                  : 'bg-red-50/95 border-2 border-red-500 text-red-950 shadow-md ring-2 ring-red-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {lastEvaluation.status === 'correct' ? (
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                ) : lastEvaluation.status === 'close' ? (
                  <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                )}

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-black text-[11px] uppercase tracking-wider px-2 py-0.5 rounded ${
                        lastEvaluation.status === 'correct'
                          ? 'bg-emerald-200 text-emerald-900'
                          : lastEvaluation.status === 'close'
                          ? 'bg-amber-200 text-amber-900'
                          : 'bg-red-600 text-white shadow-2xs'
                      }`}
                    >
                      {lastEvaluation.status === 'correct'
                        ? '¡Pronunciación Correcta!'
                        : lastEvaluation.status === 'close'
                        ? 'Casi en el punto'
                        : '❌ No coincide la palabra • Inténtalo de nuevo'}
                    </span>
                    {lastEvaluation.status === 'correct' && (
                      <span className="text-[11px] font-bold text-emerald-700">★ 100%</span>
                    )}
                    {lastEvaluation.status === 'incorrect' && (
                      <span className="text-[11px] font-bold text-red-700">Reintentar</span>
                    )}
                  </div>

                  <p className={`font-semibold text-xs leading-relaxed ${lastEvaluation.status === 'incorrect' ? 'text-red-900 font-bold' : ''}`}>
                    {lastEvaluation.message}
                  </p>

                  {lastEvaluation.transcript && (
                    <div className={`pt-2 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] ${
                      lastEvaluation.status === 'incorrect'
                        ? 'border-red-200 bg-red-100/70 p-2 rounded-lg text-red-900'
                        : 'border-stone-200/60 text-stone-600'
                    }`}>
                      <span>
                        Voz escuchada:{' '}
                        <strong className={lastEvaluation.status === 'incorrect' ? 'text-red-700 underline decoration-red-400' : 'text-stone-900 underline decoration-stone-300'}>
                          «{lastEvaluation.transcript}»
                        </strong>
                      </span>
                      <span>
                        Palabra esperada:{' '}
                        <strong className={lastEvaluation.status === 'incorrect' ? 'text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded' : 'text-stone-900'}>
                          «{lastEvaluation.targetWord}»
                        </strong>
                      </span>
                    </div>
                  )}

                  {lastEvaluation.status === 'incorrect' && (
                    <div className="text-[11px] text-red-800 font-medium pt-0.5">
                      💡 <strong>Consejo:</strong> Presiona arriba <em>"Escuchar al profesor"</em> para oír el sonido exacto y repite despacito cada sílaba.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Desplegable para probar manualmente con teclado (útil en pruebas y computadores sin mic) */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowManualTestInput((prev) => !prev)}
              className="text-[11px] text-stone-500 hover:text-stone-800 font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <Keyboard className="w-3.5 h-3.5 text-stone-400" />
              <span>{showManualTestInput ? 'Ocultar prueba escrita' : '¿Quieres probar escribiendo una palabra?'}</span>
            </button>

            {showManualTestInput && (
              <form onSubmit={handleManualTestSubmit} className="mt-2 flex gap-1.5">
                <input
                  type="text"
                  value={manualInputText}
                  onChange={(e) => setManualInputText(e.target.value)}
                  placeholder={`Ej: prueba escribir "${activeItem.palabra}" o "cenisejo"`}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 cursor-pointer"
                >
                  Evaluar
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Carrusel / Parrilla de las 30 Palabras del Texto */}
      <div className="pt-4 border-t border-stone-100 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Las 30 palabras de esta lectura:
            </span>
            <span className="text-[11px] text-stone-500">
              (Haz clic en cualquiera para practicarla)
            </span>
          </div>

          {/* Filtros: Todas, Por practicar, Logradas */}
          <div className="inline-flex p-0.5 rounded-lg bg-stone-100 border border-stone-200 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => {
                setFilterMode('all');
                setCurrentIndex(0);
              }}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Todas ({items.length})
            </button>
            <button
              type="button"
              onClick={() => {
                setFilterMode('pending');
                setCurrentIndex(0);
              }}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                filterMode === 'pending'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Pendientes ({items.length - completedCount})
            </button>
            <button
              type="button"
              onClick={() => {
                setFilterMode('completed');
                setCurrentIndex(0);
              }}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                filterMode === 'completed'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Logradas ({completedCount})
            </button>
          </div>
        </div>

        {/* Lista de píldoras numeradas */}
        <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-1 rounded-xl bg-stone-50 border border-stone-200/80">
          {filteredItems.map((it, idx) => {
            const isSelected = it.id === activeItem.id;
            const isCompleted = completedWordIds.has(it.id);

            return (
              <button
                key={it.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-700 text-white shadow-xs ring-2 ring-amber-400'
                    : isCompleted
                    ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200 border border-emerald-300'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span className="text-[10px] opacity-70 font-mono">
                  {idx + 1}.
                </span>
                <span>{it.palabra}</span>
                {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-700" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
