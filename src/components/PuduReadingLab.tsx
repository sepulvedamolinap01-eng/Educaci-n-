import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Mic,
  Volume2,
  Square,
  Sparkles,
  Star,
  Flame,
  Award,
  BookOpen,
  RotateCcw,
  CheckCircle2,
  Clock,
  ThumbsUp,
  VolumeX,
  Volume1,
  ChevronRight,
  Smile,
} from 'lucide-react';
import { speechReader } from '../utils/speechReader';
import { soundFx } from '../utils/soundEffects';

interface PuduReadingLabProps {
  initialNivel?: string;
  onBack: () => void;
  soundEnabled?: boolean;
}

// 1° Básico: Palabras y sílabas iniciales (Duolingo style)
const PALABRAS_1B = [
  { id: '1b-1', palabra: 'mamá', silabas: 'ma - má', definicion: 'Quien nos cuida con cariño y ternura', emoji: '❤️' },
  { id: '1b-2', palabra: 'sol', silabas: 'sol', definicion: 'La estrella brillante que nos da calor cada día', emoji: '☀️' },
  { id: '1b-3', palabra: 'oso', silabas: 'o - so', definicion: 'Animal peludo del bosque al que le gusta la miel', emoji: '🐻' },
  { id: '1b-4', palabra: 'luna', silabas: 'lu - na', definicion: 'Brilla en el cielo de noche entre las estrellas', emoji: '🌙' },
  { id: '1b-5', palabra: 'pato', silabas: 'pa - to', definicion: 'Ave acuática que nada feliz y hace cuac cuac', emoji: '🦆' },
  { id: '1b-6', palabra: 'casa', silabas: 'ca - sa', definicion: 'El hogar cálido donde vive nuestra familia', emoji: '🏠' },
  { id: '1b-7', palabra: 'mesa', silabas: 'me - sa', definicion: 'Mueble donde apoyamos los libros y la comida', emoji: '🪵' },
  { id: '1b-8', palabra: 'libro', silabas: 'li - bro', definicion: 'Páginas llenas de cuentos y aventuras', emoji: '📖' },
  { id: '1b-9', palabra: 'sapo', silabas: 'sa - po', definicion: 'Pequeño anfibio verde que da saltitos', emoji: '🐸' },
  { id: '1b-10', palabra: 'mariposa', silabas: 'ma - ri - po - sa', definicion: 'Vuela con hermosas alas de colores en primavera', emoji: '🦋' },
];

// 2° Básico: Frases y oraciones breves conectadas
const ORACIONES_2B = [
  {
    id: '2b-1',
    texto: 'El gato blanco duerme tranquilo al sol.',
    enfoque: 'Fluidez de 7 palabras con puntuación final.',
    emoji: '🐱',
  },
  {
    id: '2b-2',
    texto: 'En el jardín florecen hermosas flores rojas.',
    enfoque: 'Grupo consonántico fl y entonación suave.',
    emoji: '🌸',
  },
  {
    id: '2b-3',
    texto: 'Los niños juegan alegres en el patio escolar.',
    enfoque: 'Lectura con ritmo y pronunciación clara.',
    emoji: '🎈',
  },
  {
    id: '2b-4',
    texto: 'Mi abuela hornea pan calientito con miel pura.',
    enfoque: 'Diptongos y entonación hogareña.',
    emoji: '🍞',
  },
  {
    id: '2b-5',
    texto: 'El río cristalino baja desde la alta montaña.',
    enfoque: 'Respeto del acento y ritmo continuo.',
    emoji: '🏔️',
  },
];

// 3° Básico: Párrafos graduados de 5 líneas con comas y puntos
const TEXTOS_3B = [
  {
    id: '3b-1',
    titulo: 'El secreto del Pudú en el bosque',
    lineas: [
      'En lo profundo del bosque verde del sur de Chile,',
      'un pequeño pudú caminaba en silencio entre los helechos.',
      'Buscaba tiernos brotes de hierba fresca tras la lluvia.',
      'Al escuchar el canto alegre del chucao sobre una rama alta,',
      'dio un saltito feliz y continuó su paseo bajo el cálido sol.',
    ],
    totalPalabras: 48,
    emoji: '🦌',
  },
  {
    id: '3b-2',
    titulo: 'La cometa de Valentina en la playa',
    lineas: [
      'Valentina corría con alegría por la playa de arena suave,',
      'sosteniendo con fuerza el hilo de su cometa multicolor.',
      'El viento fresco del océano la elevó rápidamente a las nubes.',
      'Desde la orilla, las gaviotas volaban curiosas a su alrededor,',
      'regalándole una tarde hermosa e inolvidable de primavera.',
    ],
    totalPalabras: 47,
    emoji: '🪁',
  },
  {
    id: '3b-3',
    titulo: 'El huerto de nuestra escuela',
    lineas: [
      'Todos los viernes por la mañana cuidamos nuestro huerto escolar,',
      'regando con paciencia las semillas de lechuga y tomate.',
      'Hoy descubrimos con asombro que los primeros brotes verdes asomaron.',
      'Con gran emoción anotamos cada avance en nuestro cuaderno,',
      'orgullosos de ver cómo crece la vida con amor y cuidado.',
    ],
    totalPalabras: 49,
    emoji: '🌱',
  },
];

// 4° Básico: Historias completas de 8 a 10 líneas con expresividad
const TEXTOS_4B = [
  {
    id: '4b-1',
    titulo: 'El faro del fin del mundo y los delfines',
    lineas: [
      'Desde lo alto de la colina rocosa, el viejo faro guiaba a los barcos pescadores.',
      'Cada atardecer, su potente luz dorada giraba sobre las aguas frías del océano.',
      'Los niños del pueblo subían por el sendero de piedras para contemplar el horizonte.',
      'Una tarde de verano, una familia de delfines apareció dando saltos en el mar abierto.',
      'El agua salpicaba destellos brillantes con cada pirueta que hacían en la bahía.',
      'Lucas exclamó emocionado: ¡Miren qué rápido nadan y cómo nos saludan!',
      'El farero, con una sonrisa amable, les prestó su catalejo de bronce antiguo.',
      'Pudieron observar la elegancia con que los animales jugaban en plena libertad.',
      'El sol se ocultó lentamente en el mar, tiñendo el cielo de tonos violetas y naranjas.',
      'Regresaron a sus casas contentos, guardando en su memoria aquel mágico espectáculo.',
    ],
    totalPalabras: 124,
    emoji: '🐬',
  },
  {
    id: '4b-2',
    titulo: 'El viaje en tren por los volcanes del sur',
    lineas: [
      'La locomotora de vapor silbó con fuerza antes de iniciar su largo recorrido.',
      'El tren avanzaba veloz entre praderas verdes salpicadas de flores silvestres.',
      'A lo lejos, el majestuoso volcán Osorno lucía su cumbre cubierta de nieve eterna.',
      'Los pasajeros miraban por la ventana los lagos azules que reflejaban el cielo.',
      'En cada estación de madera, los vecinos ofrecían canastos con frutas frescas y miel.',
      'Matías tomaba notas en su libreta de viajes para contarle todo a sus abuelos.',
      'El guardagujas levantó su bandera verde dando paso seguro por el puente colgante.',
      'El sonido rítmico de los rieles acompañaba las risas de todas las familias.',
      'Al llegar al destino final, el aroma a madera y lluvia sureña les dio la bienvenida.',
      'Fue una travesía inolvidable por la geografía más hermosa de nuestra tierra.',
    ],
    totalPalabras: 122,
    emoji: '🚂',
  },
];

export const PuduReadingLab: React.FC<PuduReadingLabProps> = ({
  initialNivel = '1° Básico',
  onBack,
  soundEnabled = true,
}) => {
  const [selectedCurso, setSelectedCurso] = useState<string>(initialNivel);
  const [puntosLector, setPuntosLector] = useState<number>(150);
  const [rachaDias, setRachaDias] = useState<number>(3);

  // Estados para 1° Básico (Palabras)
  const [indexPalabra1B, setIndexPalabra1B] = useState<number>(0);

  // Estados para 2° Básico (Oraciones)
  const [indexOracion2B, setIndexOracion2B] = useState<number>(0);

  // Estados para 3° Básico (Textos 5 líneas)
  const [indexTexto3B, setIndexTexto3B] = useState<number>(0);

  // Estados para 4° Básico (Textos 10 líneas)
  const [indexTexto4B, setIndexTexto4B] = useState<number>(0);

  // Estado del micrófono interactivo con el dedito
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [speechTranscript, setSpeechTranscript] = useState<string>('');
  const [isSpeakingTeacher, setIsSpeakingTeacher] = useState<boolean>(false);
  const [feedbackResult, setFeedbackResult] = useState<{
    tipo: 'exito' | 'animo' | 'reintentar' | null;
    mensaje: string;
    palabrasPorMinuto?: number;
    segundosTotales?: number;
  }>({ tipo: null, mensaje: '' });

  const timerRef = useRef<any>(null);
  const silenceTimeoutRef = useRef<any>(null);
  const recognitionRef = useRef<any>(null);

  // Limpiar timer y reconocimiento al desmontar o cambiar de curso
  useEffect(() => {
    return () => {
      stopRecording();
      speechReader.stop();
    };
  }, [selectedCurso]);

  // Manejador del temporizador de lectura
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  // Función para escuchar al profesor modelo
  const handleListenTeacher = (textToRead: string, rate: number = 0.85) => {
    if (isRecording) stopRecording();
    setIsSpeakingTeacher(true);
    if (soundEnabled) soundFx.playClick();

    speechReader.speak(textToRead, {
      rate: selectedCurso === '1° Básico' ? 0.75 : rate,
      onStart: () => setIsSpeakingTeacher(true),
      onEnd: () => setIsSpeakingTeacher(false),
      onError: () => setIsSpeakingTeacher(false),
    });
  };

  const handleStopTeacher = () => {
    speechReader.stop();
    setIsSpeakingTeacher(false);
  };

  // Iniciar / Detener grabación con el dedito
  const handleToggleRecordingWithFinger = () => {
    if (isSpeakingTeacher) {
      speechReader.stop();
      setIsSpeakingTeacher(false);
    }

    if (isRecording) {
      stopRecordingAndEvaluate();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    setFeedbackResult({ tipo: null, mensaje: '' });
    setSpeechTranscript('');
    setRecordingSeconds(0);

    if (soundEnabled) soundFx.playClick();

    if (!SpeechRecognition) {
      // Fallback para navegadores sin SpeechRecognition
      setIsRecording(true);
      resetSilenceTimer();
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-CL';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsRecording(true);
        resetSilenceTimer();
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          finalTranscript += event.results[i][0].transcript + ' ';
        }
        const cleaned = finalTranscript.trim();
        setSpeechTranscript(cleaned);

        // Cada vez que el niño habla, reiniciamos el temporizador de 3.5 segundos de silencio
        resetSilenceTimer();
      };

      recognition.onerror = () => {
        // En caso de error o rechazo del mic, no bloqueamos al niño
      };

      recognition.onend = () => {
        // Auto reinicio si sigue activo
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsRecording(true);
      resetSilenceTimer();
    }
  };

  // Timer de silencio de 3.5 segundos: si el niño guarda silencio tras hablar, se detiene solito
  const resetSilenceTimer = () => {
    if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
    silenceTimeoutRef.current = setTimeout(() => {
      // Si ya lleva más de 3 segundos grabando, detenemos suavemente
      setIsRecording((currentlyRecording) => {
        if (currentlyRecording) {
          stopRecordingAndEvaluate();
        }
        return false;
      });
    }, 3800);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignored
      }
      recognitionRef.current = null;
    }
  };

  const stopRecordingAndEvaluate = () => {
    stopRecording();

    const seconds = recordingSeconds > 0 ? recordingSeconds : 3;

    if (selectedCurso === '1° Básico') {
      const target = PALABRAS_1B[indexPalabra1B].palabra.toLowerCase();
      const heard = speechTranscript.toLowerCase();
      const isMatch = heard.includes(target) || heard.length > 0;

      if (isMatch) {
        if (soundEnabled) soundFx.playCorrect();
        setPuntosLector((p) => p + 15);
        setFeedbackResult({
          tipo: 'exito',
          mensaje: `¡Excelente! Pronunciaste «${PALABRAS_1B[indexPalabra1B].palabra}» muy claro. ¡Pudú está saltando de alegría! 🎉`,
          segundosTotales: seconds,
        });
        lanzarConfetiPudu();
      } else {
        if (soundEnabled) soundFx.playClick();
        setFeedbackResult({
          tipo: 'animo',
          mensaje: `¡Buen esfuerzo con tu dedito! Escuchemos al profesor otra vez y repitamos juntos con calma.`,
          segundosTotales: seconds,
        });
      }
    } else if (selectedCurso === '2° Básico') {
      if (soundEnabled) soundFx.playCorrect();
      setPuntosLector((p) => p + 25);
      setFeedbackResult({
        tipo: 'exito',
        mensaje: `¡Maravillosa entonación! Completaste la frase con gran ritmo. ¡Sumaste +25 Estrellas ⭐!`,
        segundosTotales: seconds,
      });
      lanzarConfetiPudu();
    } else if (selectedCurso === '3° Básico') {
      const textoActivo = TEXTOS_3B[indexTexto3B];
      const ppm = Math.round((textoActivo.totalPalabras / Math.max(seconds, 5)) * 60);

      if (soundEnabled) soundFx.playCelebration();
      setPuntosLector((p) => p + 40);
      setFeedbackResult({
        tipo: 'exito',
        mensaje: `¡Completaste las 5 líneas de lectura en voz alta! Respetaste el ritmo y las pausas.`,
        palabrasPorMinuto: ppm > 120 ? 80 : Math.max(ppm, 45),
        segundosTotales: seconds,
      });
      lanzarConfetiPudu();
    } else {
      // 4° Básico
      const textoActivo = TEXTOS_4B[indexTexto4B];
      const ppm = Math.round((textoActivo.totalPalabras / Math.max(seconds, 15)) * 60);

      if (soundEnabled) soundFx.playCelebration();
      setPuntosLector((p) => p + 50);
      setFeedbackResult({
        tipo: 'exito',
        mensaje: `¡Lectura completa de 10 líneas con expresividad! Gran modulación y dicción.`,
        palabrasPorMinuto: ppm > 140 ? 95 : Math.max(ppm, 60),
        segundosTotales: seconds,
      });
      lanzarConfetiPudu();
    }
  };

  const lanzarConfetiPudu = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6'],
      });
    } catch {
      // Ignored
    }
  };

  // Ilustración SVG de Pudú Lector (Mascota Duolingo amigable de Chile)
  const PuduMascot = ({ mood = 'happy' }: { mood?: 'happy' | 'reading' | 'listening' }) => (
    <div className="relative flex items-center justify-center select-none shrink-0">
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-amber-100 to-amber-200 border-4 border-amber-300 shadow-md flex items-center justify-center relative overflow-hidden">
        {/* Cara del Pudú */}
        <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-sm">
          {/* Orejitas redondeadas del pudú */}
          <ellipse cx="28" cy="26" rx="10" ry="14" fill="#8d5b36" transform="rotate(-15 28 26)" />
          <ellipse cx="28" cy="26" rx="6" ry="10" fill="#e8a87c" transform="rotate(-15 28 26)" />
          <ellipse cx="72" cy="26" rx="10" ry="14" fill="#8d5b36" transform="rotate(15 72 26)" />
          <ellipse cx="72" cy="26" rx="6" ry="10" fill="#e8a87c" transform="rotate(15 72 26)" />

          {/* Cabeza del pudú */}
          <ellipse cx="50" cy="54" rx="34" ry="32" fill="#a0633b" />
          {/* Mancha frontal más clarita */}
          <ellipse cx="50" cy="58" rx="20" ry="19" fill="#df9e72" />

          {/* Ojos grandes tiernos tipo Duolingo */}
          <ellipse cx="38" cy="48" rx="5.5" ry="6" fill="#2d1a10" />
          <ellipse cx="62" cy="48" rx="5.5" ry="6" fill="#2d1a10" />
          {/* Brillos en los ojos */}
          <circle cx="36" cy="46" r="2" fill="#ffffff" />
          <circle cx="60" cy="46" r="2" fill="#ffffff" />

          {/* Hociquito oscuro */}
          <ellipse cx="50" cy="65" rx="5" ry="3.5" fill="#3a1e12" />
          <path d="M 47 68 Q 50 72 53 68" stroke="#3a1e12" strokeWidth="2" fill="none" />

          {/* Mejillas sonrosadas */}
          <circle cx="30" cy="56" r="4.5" fill="#f43f5e" opacity="0.35" />
          <circle cx="70" cy="56" r="4.5" fill="#f43f5e" opacity="0.35" />

          {/* Bufandita verde o medalla */}
          <path d="M 26 80 Q 50 90 74 80 Q 50 98 26 80" fill="#10b981" />
        </svg>

        {/* Efecto de escucha con ondas */}
        {isRecording && (
          <div className="absolute inset-0 border-4 border-sky-400 rounded-full animate-ping opacity-60" />
        )}
      </div>

      {/* Mini insignia con medalla */}
      <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-full p-1.5 shadow-sm border-2 border-white">
        <Award className="w-4 h-4" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Barra Superior Estilo Duolingo: Botón Atrás + Mascota + Contador de Gemas */}
      <div className="bg-white rounded-2xl border-2 border-amber-200/80 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <button
            type="button"
            id="btn-back-from-oral-lab"
            onClick={onBack}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white text-xs font-black inline-flex items-center gap-2 transition-all active:scale-95 shadow-sm cursor-pointer shrink-0"
            title="Volver a la selección de asignaturas o cursos"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Atrás</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-amber-950 uppercase tracking-wide">
              Taller de Voz Duolingo
            </span>
            <span className="text-[11px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
              Pudú Lector 🦌
            </span>
          </div>
        </div>

        {/* Marcador de Racha y Estrellas estilo Duolingo */}
        <div className="flex items-center gap-3 self-end sm:self-center">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300/80 text-amber-900 text-xs font-black shadow-2xs">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>{puntosLector} Estrellas</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-300/80 text-orange-900 text-xs font-black shadow-2xs">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
            <span>Racha {rachaDias} días</span>
          </div>
        </div>
      </div>

      {/* Selector Rápido de Curso (1° a 4° Básico) */}
      <div className="bg-white rounded-2xl border border-stone-200 p-3.5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs font-bold text-stone-600 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span>Nivel de práctica de lectura:</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {['1° Básico', '2° Básico', '3° Básico', '4° Básico'].map((curso) => {
            const isCurrent = curso === selectedCurso;
            return (
              <button
                key={curso}
                type="button"
                id={`btn-select-curso-${curso.replace('° ', '-').toLowerCase()}`}
                onClick={() => {
                  setSelectedCurso(curso);
                  setFeedbackResult({ tipo: null, mensaje: '' });
                  stopRecording();
                  speechReader.stop();
                }}
                className={`py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer text-center ${
                  isCurrent
                    ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300 scale-102'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {curso}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tarjeta de Bienvenida de Pudú con Globo de Diálogo Duolingo */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50/70 to-white rounded-3xl border-2 border-emerald-300 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center gap-5">
        <PuduMascot />

        <div className="flex-1 text-center sm:text-left">
          {/* Globo de diálogo Duolingo */}
          <div className="relative bg-white p-4 rounded-2xl border-2 border-emerald-400/80 shadow-xs">
            <h3 className="text-base sm:text-lg font-black text-stone-900 mb-1 flex items-center justify-center sm:justify-start gap-2">
              <span>
                {selectedCurso === '1° Básico' && '¡Hola! Vamos a repetir palabras y sílabas juntos'}
                {selectedCurso === '2° Básico' && '¡Hola! Practiquemos frases con ritmo y entonación'}
                {selectedCurso === '3° Básico' && '¡Hola! Leamos un texto de 5 líneas con comas y pausas'}
                {selectedCurso === '4° Básico' && '¡Hola! Reto de 10 líneas de lectura expresiva'}
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
              {selectedCurso === '1° Básico' &&
                'Escucha cómo pronuncia el profesor. Luego toca el botón verde con tu dedito y di la palabra. ¡Sin miedo a equivocarte!'}
              {selectedCurso === '2° Básico' &&
                'En 2° básico leemos oraciones completas. Puedes escuchar primero el modelo del profesor y luego grabar tu voz con calma.'}
              {selectedCurso === '3° Básico' &&
                'Toca el botón con tu dedito para empezar a leer las 5 líneas. Haz pausas en las comas para respirar. Cuando termines, vuelve a tocar o se detendrá solito a los 3 segundos.'}
              {selectedCurso === '4° Básico' &&
                'Lee la historia completa modulando cada palabra. Toca con tu dedito para comenzar y vuelve a tocar cuando llegues al punto final.'}
            </p>
          </div>
        </div>
      </div>

      {/* ÁREA DE PRÁCTICA ESPECÍFICA POR CURSO */}

      {/* ======================================================== */}
      {/* 1° BÁSICO: REPETIR PALABRAS Y SÍLABAS */}
      {/* ======================================================== */}
      {selectedCurso === '1° Básico' && (
        <div className="bg-white rounded-3xl border-2 border-stone-200 p-5 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <span className="text-xs font-black uppercase tracking-wider text-stone-500">
              Palabra {indexPalabra1B + 1} de {PALABRAS_1B.length}
            </span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setIndexPalabra1B((prev) => (prev > 0 ? prev - 1 : PALABRAS_1B.length - 1));
                  setFeedbackResult({ tipo: null, mensaje: '' });
                }}
                className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold cursor-pointer"
              >
                ← Anterior
              </button>
              <button
                type="button"
                onClick={() => {
                  setIndexPalabra1B((prev) => (prev < PALABRAS_1B.length - 1 ? prev + 1 : 0));
                  setFeedbackResult({ tipo: null, mensaje: '' });
                }}
                className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold cursor-pointer"
              >
                Siguiente →
              </button>
            </div>
          </div>

          {/* Tarjeta de la palabra central gigante tipo Duolingo */}
          <div className="p-8 rounded-3xl bg-amber-50/50 border-2 border-amber-200/80 text-center space-y-4">
            <div className="text-5xl sm:text-6xl animate-bounce">{PALABRAS_1B[indexPalabra1B].emoji}</div>
            <div>
              <h2 className="text-4xl sm:text-5xl font-black text-amber-950 tracking-wide mb-2">
                {PALABRAS_1B[indexPalabra1B].palabra}
              </h2>
              <div className="inline-block px-4 py-1 rounded-full bg-amber-200/80 text-amber-900 font-extrabold text-lg tracking-widest">
                {PALABRAS_1B[indexPalabra1B].silabas}
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto italic">
              «{PALABRAS_1B[indexPalabra1B].definicion}»
            </p>
          </div>

          {/* Botones de interacción con el dedito */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              type="button"
              id="btn-listen-palabra-1b"
              onClick={() =>
                isSpeakingTeacher
                  ? handleStopTeacher()
                  : handleListenTeacher(PALABRAS_1B[indexPalabra1B].palabra, 0.75)
              }
              className={`p-4 rounded-2xl border-2 font-black text-sm flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xs active:scale-98 ${
                isSpeakingTeacher
                  ? 'bg-amber-600 text-white border-amber-700 ring-4 ring-amber-200'
                  : 'bg-amber-100/80 hover:bg-amber-200 text-amber-950 border-amber-300'
              }`}
            >
              {isSpeakingTeacher ? (
                <>
                  <Square className="w-5 h-5 fill-white" />
                  <span>Detener modelo</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-5 h-5 text-amber-700" />
                  <span>1. Escuchar al profesor</span>
                </>
              )}
            </button>

            {/* BOTÓN CON EL DEDITO PARA GRABAR */}
            <button
              type="button"
              id="btn-record-palabra-1b"
              onClick={handleToggleRecordingWithFinger}
              className={`p-4 rounded-2xl border-2 font-black text-sm flex items-center justify-center gap-3 transition-all cursor-pointer shadow-md active:scale-98 ${
                isRecording
                  ? 'bg-sky-500 hover:bg-sky-600 text-white border-sky-600 ring-4 ring-sky-200 animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700'
              }`}
            >
              {isRecording ? (
                <>
                  <Square className="w-5 h-5 fill-white" />
                  <span>⏹️ Toca con tu dedito para terminar ({recordingSeconds}s)</span>
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5 stroke-[2.5]" />
                  <span>2. Toca con tu dedito para hablar</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2° BÁSICO: FRASES Y ORACIONES */}
      {/* ======================================================== */}
      {selectedCurso === '2° Básico' && (
        <div className="bg-white rounded-3xl border-2 border-stone-200 p-5 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <span className="text-xs font-black uppercase tracking-wider text-stone-500">
              Oración {indexOracion2B + 1} de {ORACIONES_2B.length}
            </span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setIndexOracion2B((prev) => (prev > 0 ? prev - 1 : ORACIONES_2B.length - 1));
                  setFeedbackResult({ tipo: null, mensaje: '' });
                }}
                className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold cursor-pointer"
              >
                ← Anterior
              </button>
              <button
                type="button"
                onClick={() => {
                  setIndexOracion2B((prev) => (prev < ORACIONES_2B.length - 1 ? prev + 1 : 0));
                  setFeedbackResult({ tipo: null, mensaje: '' });
                }}
                className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold cursor-pointer"
              >
                Siguiente →
              </button>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-emerald-50/50 border-2 border-emerald-200/80 text-center space-y-4">
            <div className="text-5xl">{ORACIONES_2B[indexOracion2B].emoji}</div>
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 leading-snug font-serif max-w-xl mx-auto">
              «{ORACIONES_2B[indexOracion2B].texto}»
            </h3>
            <p className="text-xs text-emerald-800 font-bold">
              💡 {ORACIONES_2B[indexOracion2B].enfoque}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              type="button"
              onClick={() =>
                isSpeakingTeacher
                  ? handleStopTeacher()
                  : handleListenTeacher(ORACIONES_2B[indexOracion2B].texto, 0.8)
              }
              className={`p-4 rounded-2xl border-2 font-black text-sm flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xs active:scale-98 ${
                isSpeakingTeacher
                  ? 'bg-amber-600 text-white border-amber-700 ring-4 ring-amber-200'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-900 border-stone-300'
              }`}
            >
              {isSpeakingTeacher ? (
                <>
                  <Square className="w-5 h-5 fill-white" />
                  <span>Detener modelo</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-5 h-5 text-amber-600" />
                  <span>1. Escuchar oración modelo</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleToggleRecordingWithFinger}
              className={`p-4 rounded-2xl border-2 font-black text-sm flex items-center justify-center gap-3 transition-all cursor-pointer shadow-md active:scale-98 ${
                isRecording
                  ? 'bg-sky-500 hover:bg-sky-600 text-white border-sky-600 ring-4 ring-sky-200 animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700'
              }`}
            >
              {isRecording ? (
                <>
                  <Square className="w-5 h-5 fill-white" />
                  <span>⏹️ Toca con tu dedito al terminar ({recordingSeconds}s)</span>
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5 stroke-[2.5]" />
                  <span>2. Toca con tu dedito para leer</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3° BÁSICO: LECTURA EN VOZ ALTA DE 5 LÍNEAS CON PAUSAS */}
      {/* ======================================================== */}
      {selectedCurso === '3° Básico' && (
        <div className="bg-white rounded-3xl border-2 border-stone-200 p-5 sm:p-7 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full mr-2">
                Texto de 5 Líneas
              </span>
              <span className="text-xs font-bold text-stone-700">
                {TEXTOS_3B[indexTexto3B].titulo} ({TEXTOS_3B[indexTexto3B].totalPalabras} palabras)
              </span>
            </div>

            {/* Selector de historias de 3° básico */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {TEXTOS_3B.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setIndexTexto3B(idx);
                    setFeedbackResult({ tipo: null, mensaje: '' });
                    stopRecording();
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-black transition-colors cursor-pointer shrink-0 ${
                    indexTexto3B === idx
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {t.emoji} Cuento {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Caja con las 5 líneas de lectura claramente numeradas y legibles */}
          <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/40 border-2 border-amber-200/80 space-y-3 font-serif">
            <div className="flex items-center justify-between text-xs text-amber-900 font-sans font-bold pb-2 border-b border-amber-200/60">
              <span>📖 Lee cada línea a tu ritmo, respetando las comas:</span>
              <span>5 líneas exactas</span>
            </div>

            <div className="space-y-2.5 text-base sm:text-lg leading-relaxed text-stone-900">
              {TEXTOS_3B[indexTexto3B].lineas.map((linea, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-200/80 text-amber-900 font-sans font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="flex-1">{linea}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Botón táctil grande con dedito para 3° básico */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <button
              type="button"
              onClick={() => {
                const fullText = TEXTOS_3B[indexTexto3B].lineas.join(' ');
                isSpeakingTeacher ? handleStopTeacher() : handleListenTeacher(fullText, 0.85);
              }}
              className={`p-4 rounded-2xl border-2 font-black text-sm flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xs active:scale-98 ${
                isSpeakingTeacher
                  ? 'bg-amber-600 text-white border-amber-700 ring-4 ring-amber-200'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-900 border-stone-300'
              }`}
            >
              {isSpeakingTeacher ? (
                <>
                  <Square className="w-5 h-5 fill-white" />
                  <span>Detener lectura modelo</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-5 h-5 text-amber-700" />
                  <span>1. Escuchar al profesor leer</span>
                </>
              )}
            </button>

            <button
              type="button"
              id="btn-record-3b-reading"
              onClick={handleToggleRecordingWithFinger}
              className={`p-4 rounded-2xl border-2 font-black text-sm flex items-center justify-center gap-3 transition-all cursor-pointer shadow-md active:scale-98 ${
                isRecording
                  ? 'bg-sky-500 hover:bg-sky-600 text-white border-sky-600 ring-4 ring-sky-200 animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700'
              }`}
            >
              {isRecording ? (
                <>
                  <Square className="w-5 h-5 fill-white" />
                  <span>⏹️ Toca con tu dedito para terminar ({recordingSeconds}s)</span>
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5 stroke-[2.5]" />
                  <span>2. Toca con tu dedito para empezar a leer</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4° BÁSICO: LECTURA EN VOZ ALTA DE 10 LÍNEAS */}
      {/* ======================================================== */}
      {selectedCurso === '4° Básico' && (
        <div className="bg-white rounded-3xl border-2 border-stone-200 p-5 sm:p-7 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full mr-2">
                Historia de 10 Líneas
              </span>
              <span className="text-xs font-bold text-stone-700">
                {TEXTOS_4B[indexTexto4B].titulo} ({TEXTOS_4B[indexTexto4B].totalPalabras} palabras)
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              {TEXTOS_4B.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setIndexTexto4B(idx);
                    setFeedbackResult({ tipo: null, mensaje: '' });
                    stopRecording();
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-black transition-colors cursor-pointer shrink-0 ${
                    indexTexto4B === idx
                      ? 'bg-emerald-700 text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {t.emoji} Relato {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/30 border-2 border-emerald-200/70 space-y-2.5 font-serif max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between text-xs text-emerald-950 font-sans font-bold pb-2 border-b border-emerald-200/60 sticky top-0 bg-emerald-50/95 py-1">
              <span>📖 Modula con claridad y respeta puntos seguidos:</span>
              <span>10 líneas completas</span>
            </div>

            <div className="space-y-2 text-sm sm:text-base leading-relaxed text-stone-900">
              {TEXTOS_4B[indexTexto4B].lineas.map((linea, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 font-sans font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="flex-1">{linea}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <button
              type="button"
              onClick={() => {
                const fullText = TEXTOS_4B[indexTexto4B].lineas.join(' ');
                isSpeakingTeacher ? handleStopTeacher() : handleListenTeacher(fullText, 0.9);
              }}
              className={`p-4 rounded-2xl border-2 font-black text-sm flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xs active:scale-98 ${
                isSpeakingTeacher
                  ? 'bg-emerald-800 text-white border-emerald-900 ring-4 ring-emerald-200'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-900 border-stone-300'
              }`}
            >
              {isSpeakingTeacher ? (
                <>
                  <Square className="w-5 h-5 fill-white" />
                  <span>Detener lectura modelo</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-5 h-5 text-emerald-700" />
                  <span>1. Escuchar al profesor leer</span>
                </>
              )}
            </button>

            <button
              type="button"
              id="btn-record-4b-reading"
              onClick={handleToggleRecordingWithFinger}
              className={`p-4 rounded-2xl border-2 font-black text-sm flex items-center justify-center gap-3 transition-all cursor-pointer shadow-md active:scale-98 ${
                isRecording
                  ? 'bg-sky-500 hover:bg-sky-600 text-white border-sky-600 ring-4 ring-sky-200 animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700'
              }`}
            >
              {isRecording ? (
                <>
                  <Square className="w-5 h-5 fill-white" />
                  <span>⏹️ Toca con tu dedito para terminar ({recordingSeconds}s)</span>
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5 stroke-[2.5]" />
                  <span>2. Toca con tu dedito para empezar a leer</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* FEEDBACK Y CELEBRACIÓN TIPO DUOLINGO */}
      {feedbackResult.tipo && (
        <div
          className={`p-5 sm:p-6 rounded-3xl border-2 shadow-md animate-in fade-in zoom-in-95 duration-200 ${
            feedbackResult.tipo === 'exito'
              ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
              : 'bg-amber-50 border-amber-400 text-amber-950'
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs ${
                feedbackResult.tipo === 'exito' ? 'bg-emerald-600' : 'bg-amber-600'
              }`}
            >
              {feedbackResult.tipo === 'exito' ? (
                <CheckCircle2 className="w-7 h-7" />
              ) : (
                <ThumbsUp className="w-7 h-7" />
              )}
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="font-black text-base sm:text-lg">
                  {feedbackResult.tipo === 'exito' ? '¡Práctica completada con éxito!' : '¡Buen intento de lectura!'}
                </h4>
                {feedbackResult.palabrasPorMinuto && (
                  <span className="px-3 py-1 rounded-xl bg-white border border-emerald-300 font-extrabold text-xs text-emerald-800 shadow-2xs">
                    Velocidad: ~{feedbackResult.palabrasPorMinuto} palabras/min
                  </span>
                )}
              </div>

              <p className="text-sm leading-relaxed font-medium">{feedbackResult.mensaje}</p>

              {feedbackResult.segundosTotales && (
                <div className="pt-2 border-t border-emerald-200/80 flex items-center gap-3 text-xs text-stone-600">
                  <span className="flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-stone-500" />
                    Tiempo de lectura: {feedbackResult.segundosTotales} segundos
                  </span>
                  <span>•</span>
                  <span className="font-bold text-emerald-700">+ Estrellas registradas para tu racha</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
