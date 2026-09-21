import React, { useState, useEffect, useRef } from 'react';
import { getUnitsForNivel, getNivelInfo, MineducUnitDefinition } from '../data/mineducUnits';
import { getSampleTextsForNivel } from '../data/mineducTexts';
import { getHistoriaUnitsForNivel, MINEDUC_HISTORIA_CURRICULUM } from '../data/historiaUnits';
import { getHistoriaSampleTextsForNivel } from '../data/historiaTexts';
import {
  getMatematicaUnitsForNivel,
  MINEDUC_MATEMATICA_CURRICULUM,
  getMatematicaSampleTextsForNivel,
} from '../data/matematicaUnits';
import { getCienciasUnitsForNivel, getCienciasSampleTextsForNivel } from '../data/cienciasUnits';
import { getInglesUnitsForNivel, getInglesSampleTextsForNivel } from '../data/inglesUnits';
import { MatematicaConcretaWidget } from './MatematicaConcretaWidget';
import { CalculadoraEscolar } from './CalculadoraEscolar';
import { FaunaAvatar, FaunaSpecies } from './FaunaAvatars';
import { FaunaGuiaModal } from './FaunaGuiaModal';
import { FaunaUnitComicGuide } from './FaunaUnitComicGuide';
import { MineducQuizResult, SampleMineducText, DuaSettings, AsignaturaType } from '../types';
import { InteractiveQuiz } from './InteractiveQuiz';
import { JsonExportView } from './JsonExportView';
import { EnglishWordMatchGame } from './EnglishWordMatchGame';
import { getBilingualLinesForText } from '../data/inglesTranslations';
import { formatTextWithSyllables } from '../utils/syllables';
import { speechReader } from '../utils/speechReader';
import {
  ArrowLeft,
  BookOpen,
  Compass,
  Calculator,
  Printer,
  Edit3,
  Upload,
  Volume2,
  Square,
  Eye,
  Sliders,
  Check,
  X,
  Sparkles,
  Gamepad2,
  Code2,
  ChevronRight,
  Home,
  FlaskConical,
  Languages,
} from 'lucide-react';

interface CourseDetailViewProps {
  selectedNivel: string;
  selectedUnidad: string;
  selectedObjetivo: string;
  inputText: string;
  quizData: MineducQuizResult;
  rawJson: string;
  isLoading: boolean;
  soundEnabled: boolean;
  duaSettings: DuaSettings;
  onChangeDuaSettings: (settings: DuaSettings | ((prev: DuaSettings) => DuaSettings)) => void;
  onBackToHome: () => void;
  onBackToSubjects: () => void;
  onSelectCourse: (nivel: string, unitNum?: string) => void;
  onSelectUnidad: (unitNameOrNum: string) => void;
  onSelectObjetivo: (oa: string) => void;
  onChangeInputText: (text: string) => void;
  onSelectSampleText: (sample: SampleMineducText) => void;
  onGenerateQuestions: () => void;
  onOpenWorksheet: () => void;
  selectedAsignatura: AsignaturaType;
  onSelectAsignatura: (asignatura: AsignaturaType) => void;
}

const ALL_COURSES = ['1° Básico', '2° Básico', '3° Básico', '4° Básico'];

export const CourseDetailView: React.FC<CourseDetailViewProps> = ({
  selectedNivel,
  selectedUnidad,
  selectedObjetivo,
  inputText,
  quizData,
  rawJson,
  isLoading,
  soundEnabled,
  duaSettings,
  onChangeDuaSettings,
  onBackToHome,
  onBackToSubjects,
  onSelectCourse,
  onSelectUnidad,
  onSelectObjetivo,
  onChangeInputText,
  onSelectSampleText,
  onGenerateQuestions,
  onOpenWorksheet,
  selectedAsignatura,
}) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'json'>('quiz');
  const [showTextEditor, setShowTextEditor] = useState<boolean>(false);
  const [showDuaModal, setShowDuaModal] = useState<boolean>(false);
  const [showCalculadora, setShowCalculadora] = useState<boolean>(false);
  const [showFaunaModal, setShowFaunaModal] = useState<boolean>(false);
  const [isSpeakingReading, setIsSpeakingReading] = useState<boolean>(false);
  const [showEnglishTranslation, setShowEnglishTranslation] = useState<boolean>(true);
  const [englishLangOrder, setEnglishLangOrder] = useState<'en-first' | 'es-first'>('en-first');
  const [showTechnicalCurriculum, setShowTechnicalCurriculum] = useState<boolean>(false);
  const [rulerTop, setRulerTop] = useState<number>(0);
  const [isRulerVisible, setIsRulerVisible] = useState<boolean>(false);

  const isGrade1or2 = selectedNivel === '1° Básico' || selectedNivel === '2° Básico';
  const isEarlyLearningMode =
    duaSettings.earlyLearningMode !== undefined ? duaSettings.earlyLearningMode : isGrade1or2;

  const [englishTab, setEnglishTab] = useState<'game' | 'sentences'>(
    isEarlyLearningMode ? 'game' : 'sentences'
  );

  useEffect(() => {
    if (isEarlyLearningMode) {
      setEnglishTab('game');
    }
  }, [selectedNivel, isEarlyLearningMode]);

  const textContainerRef = useRef<HTMLDivElement>(null);

  const isHistoria = selectedAsignatura === 'historia';
  const isMatematica = selectedAsignatura === 'matematica';
  const isCiencias = selectedAsignatura === 'ciencias';
  const isIngles = selectedAsignatura === 'ingles';

  const guideSpecies: FaunaSpecies = isHistoria
    ? 'condor'
    : isMatematica
    ? 'pinguino'
    : isCiencias
    ? 'puma'
    : isIngles
    ? 'rana'
    : 'llama';

  // Units and samples filtered strictly by active subject
  const unitsForNivel = isHistoria
    ? getHistoriaUnitsForNivel(selectedNivel)
    : isMatematica
    ? getMatematicaUnitsForNivel(selectedNivel)
    : isCiencias
    ? getCienciasUnitsForNivel(selectedNivel)
    : isIngles
    ? getInglesUnitsForNivel(selectedNivel)
    : getUnitsForNivel(selectedNivel);

  const sampleTexts = isHistoria
    ? getHistoriaSampleTextsForNivel(selectedNivel)
    : isMatematica
    ? getMatematicaSampleTextsForNivel(selectedNivel)
    : isCiencias
    ? getCienciasSampleTextsForNivel(selectedNivel)
    : isIngles
    ? getInglesSampleTextsForNivel(selectedNivel)
    : getSampleTextsForNivel(selectedNivel);

  const currentUnitDef =
    unitsForNivel.find(
      (u) =>
        u.nombre === selectedUnidad ||
        u.numero === selectedUnidad ||
        selectedUnidad.includes(u.numero)
    ) || unitsForNivel[0];

  const currentSample = sampleTexts.find((s) => s.unidad === currentUnitDef.numero);

  // Stop active speech when context shifts
  useEffect(() => {
    speechReader.stop();
    setIsSpeakingReading(false);
  }, [selectedNivel, selectedUnidad, selectedAsignatura, inputText]);

  const handleUnitClick = (unitDef: MineducUnitDefinition) => {
    speechReader.stop();
    setIsSpeakingReading(false);
    onSelectUnidad(unitDef.nombre);
    if (unitDef.oas && unitDef.oas.length > 0) {
      onSelectObjetivo(unitDef.oas.join(', '));
    }
    const matchingSample = sampleTexts.find((s) => s.unidad === unitDef.numero);
    if (matchingSample) {
      onSelectSampleText(matchingSample);
    }
  };

  const handleTogglePlayReading = () => {
    if (isSpeakingReading) {
      speechReader.stop();
      setIsSpeakingReading(false);
    } else {
      const rate = duaSettings.speechSpeed === 'slow' ? 0.75 : isIngles ? 0.82 : 1.0;
      speechReader.speak(inputText, {
        rate,
        lang: isIngles ? 'en-US' : 'es-CL',
        onStart: () => setIsSpeakingReading(true),
        onEnd: () => setIsSpeakingReading(false),
        onError: () => setIsSpeakingReading(false),
      });
    }
  };

  const handleToggleSyllables = () => {
    onChangeDuaSettings((prev) => ({
      ...prev,
      syllableMode: !prev.syllableMode,
    }));
  };

  const handleToggleReadingRuler = () => {
    const nextState = !duaSettings.readingRuler;
    onChangeDuaSettings((prev) => ({
      ...prev,
      readingRuler: nextState,
    }));
    if (!nextState) {
      setIsRulerVisible(false);
    }
  };

  const handleMouseMoveText = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duaSettings.readingRuler || !textContainerRef.current) return;
    const rect = textContainerRef.current.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    setRulerTop(Math.max(8, Math.min(rect.height - 36, relativeY - 18)));
    setIsRulerVisible(true);
  };

  const handleMouseLeaveText = () => {
    if (duaSettings.readingRuler) {
      setIsRulerVisible(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          onChangeInputText(text);
        }
      };
      reader.readAsText(file);
    }
  };

  // Font size styles for reading
  const textSizeClass =
    duaSettings.fontSize === 'gigante'
      ? 'text-lg sm:text-xl leading-loose font-serif'
      : duaSettings.fontSize === 'grande'
      ? 'text-base sm:text-lg leading-relaxed font-serif'
      : 'text-sm sm:text-base leading-relaxed font-serif';

  const displayedReadingText = duaSettings.syllableMode
    ? formatTextWithSyllables(inputText)
    : inputText;

  // Modern subject theme
  const theme = isHistoria
    ? {
        primary: 'bg-sky-600 hover:bg-sky-700',
        text: 'text-sky-700',
        badge: 'bg-sky-100 text-sky-900 border-sky-200',
        activePill: 'bg-sky-600 text-white shadow-xs',
        border: 'border-sky-300',
        lightBg: 'bg-sky-50/50',
      }
    : isMatematica
    ? {
        primary: 'bg-emerald-600 hover:bg-emerald-700',
        text: 'text-emerald-700',
        badge: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        activePill: 'bg-emerald-600 text-white shadow-xs',
        border: 'border-emerald-300',
        lightBg: 'bg-emerald-50/50',
      }
    : isCiencias
    ? {
        primary: 'bg-teal-700 hover:bg-teal-800',
        text: 'text-teal-800',
        badge: 'bg-teal-100 text-teal-950 border-teal-300',
        activePill: 'bg-teal-700 text-white shadow-xs',
        border: 'border-teal-300',
        lightBg: 'bg-teal-50/50',
      }
    : isIngles
    ? {
        primary: 'bg-indigo-600 hover:bg-indigo-700',
        text: 'text-indigo-700',
        badge: 'bg-indigo-100 text-indigo-950 border-indigo-300',
        activePill: 'bg-indigo-600 text-white shadow-xs',
        border: 'border-indigo-300',
        lightBg: 'bg-indigo-50/50',
      }
    : {
        primary: 'bg-amber-600 hover:bg-amber-700',
        text: 'text-amber-700',
        badge: 'bg-amber-100 text-amber-900 border-amber-200',
        activePill: 'bg-amber-600 text-white shadow-xs',
        border: 'border-amber-300',
        lightBg: 'bg-amber-50/50',
      };

  return (
    <div className="space-y-5">
      {/* Top Breadcrumb & Clean Back Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-stone-200/80 shadow-xs">
        <nav
          aria-label="Ruta de navegación"
          className="flex items-center gap-1.5 text-xs text-stone-500 font-medium flex-wrap"
        >
          <button
            type="button"
            onClick={onBackToHome}
            className="hover:text-amber-700 transition-colors cursor-pointer inline-flex items-center gap-1 font-semibold text-stone-700 hover:underline"
          >
            <Home className="w-3.5 h-3.5 text-amber-700" />
            <span>Inicio</span>
          </button>
          <ChevronRight className="w-3 h-3 text-stone-300" />
          <button
            type="button"
            onClick={onBackToSubjects}
            className="hover:text-amber-700 transition-colors cursor-pointer font-semibold text-stone-700 hover:underline"
          >
            {selectedNivel}
          </button>
          <ChevronRight className="w-3 h-3 text-stone-300" />
          <span className={`font-bold ${theme.text} flex items-center gap-1`}>
            {isHistoria ? (
              <Compass className="w-3.5 h-3.5" />
            ) : isMatematica ? (
              <Calculator className="w-3.5 h-3.5" />
            ) : isCiencias ? (
              <FlaskConical className="w-3.5 h-3.5" />
            ) : isIngles ? (
              <Languages className="w-3.5 h-3.5" />
            ) : (
              <BookOpen className="w-3.5 h-3.5" />
            )}
            <span>
              {isHistoria
                ? 'Historia'
                : isMatematica
                ? 'Matemática'
                : isCiencias
                ? 'Ciencias Naturales'
                : isIngles
                ? 'Inglés'
                : 'Lenguaje'}
            </span>
          </span>
        </nav>

        {/* Action Buttons: Return Home or Return to Subjects */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            id="btn-back-to-home-bar"
            onClick={onBackToHome}
            className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer border border-amber-200"
            title="Ir al inicio (cursos)"
          >
            <Home className="w-3.5 h-3.5 text-amber-700" />
            <span>Ir a Inicio</span>
          </button>

          <button
            type="button"
            id="btn-back-to-subjects"
            onClick={onBackToSubjects}
            className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-200"
            title={`Volver a las asignaturas de ${selectedNivel}`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al menú</span>
          </button>
        </div>
      </div>

      {/* Streamlined Unit Selector (Compact, Horizontal Pills - Saves Massive Space!) */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-3 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-stone-400">
              Unidades:
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap flex-1 sm:justify-end">
            {unitsForNivel.map((unit) => {
              const isSelected =
                selectedUnidad === unit.nombre ||
                selectedUnidad === unit.numero ||
                selectedUnidad.includes(unit.numero);

              return (
                <button
                  key={unit.numero}
                  type="button"
                  id={`unit-pill-${unit.numero.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleUnitClick(unit)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? `${theme.activePill}`
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70'
                  }`}
                >
                  <span>{unit.numero}</span>
                  <span className="hidden md:inline font-normal text-[11px] opacity-90 truncate max-w-[120px]">
                    {unit.nombre.replace(/^Unidad \d+:\s*/, '')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Fauna Mascot with Comic Thought Bubble */}
      <FaunaUnitComicGuide
        species={guideSpecies}
        asignatura={selectedAsignatura}
        nivel={selectedNivel}
        unidad={currentUnitDef.nombre}
        soundEnabled={true}
      />

      {/* Reading / Interactive Slate */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-7 shadow-xs space-y-4">
        {/* Lesson Header & Child-Friendly Voice/DUA Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <button
              type="button"
              id="btn-lesson-fauna-guide"
              onClick={() => setShowFaunaModal(true)}
              className="hover:scale-105 transition-transform cursor-pointer p-1 rounded-2xl bg-stone-100/80 hover:bg-stone-200/60 border border-stone-200/80 shadow-2xs shrink-0"
              title={`Animal Guía de Chile: ${isHistoria ? 'Cóndor Andino' : isMatematica ? 'Pingüino de Humboldt' : 'Llama Andina'} (clic para conocer)`}
            >
              <FaunaAvatar
                species={guideSpecies}
                size="xs"
                mood={isSpeakingReading ? 'speaking' : 'happy'}
              />
            </button>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${theme.badge}`}>
                  {currentUnitDef.numero}
                </span>
                <h3 className="text-base sm:text-lg font-black text-stone-900">
                  {currentUnitDef.nombre}
                </h3>
                {isIngles && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-[11px] font-black text-indigo-700 shadow-2xs">
                    <span>🇨🇱🇬🇧</span>
                    <span>Modo Bilingüe con Traducción</span>
                  </span>
                )}
              </div>
              {isEarlyLearningMode ? (
                <div className="text-xs text-stone-500 mt-1 flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 font-bold border border-amber-300 shadow-2xs">
                    <span>🧸 Modo Aprendizaje Temprano</span>
                  </span>
                  <span className="text-stone-300">•</span>
                  <button
                    type="button"
                    onClick={() => setShowFaunaModal(true)}
                    className="text-[11px] font-bold text-stone-600 hover:text-amber-800 underline decoration-dotted cursor-pointer transition-colors"
                  >
                    Guía: {isHistoria ? 'Cóndor Andino 🦅' : isMatematica ? 'Pingüino 🐧' : isCiencias ? 'Puma Chileno 🐆' : isIngles ? 'Rana de Darwin 🐸' : 'Llama Andina 🦙'}
                  </button>
                  <span className="text-stone-300">•</span>
                  <button
                    type="button"
                    onClick={() => setShowTechnicalCurriculum((prev) => !prev)}
                    className="text-[10px] text-stone-400 hover:text-stone-600 underline cursor-pointer"
                    title="Mostrar u ocultar código curricular oficial para docentes"
                  >
                    {showTechnicalCurriculum ? 'Ocultar código curricular' : 'Ver código OA (Docente)'}
                  </button>
                  {showTechnicalCurriculum && (
                    <span className="text-[11px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                      OA oficial: <strong>{selectedObjetivo}</strong>
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-xs text-stone-500 mt-0.5 flex items-center gap-1.5 flex-wrap">
                  <span>OA: <strong className="font-semibold text-stone-700">{selectedObjetivo}</strong></span>
                  <span className="text-stone-300">•</span>
                  <button
                    type="button"
                    onClick={() => setShowFaunaModal(true)}
                    className="text-[11px] font-bold text-stone-600 hover:text-amber-800 underline decoration-dotted cursor-pointer transition-colors"
                  >
                    Guía: {isHistoria ? 'Cóndor Andino 🦅' : isMatematica ? 'Pingüino 🐧' : isCiencias ? 'Puma Chileno 🐆' : isIngles ? 'Rana de Darwin 🐸' : 'Llama Andina 🦙'}
                  </button>
                </p>
              )}
            </div>
          </div>

          {/* Child-Friendly Tactile Toolbar */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Early Learning Mode Toggle (1° y 2° Básico) */}
            <button
              type="button"
              id="btn-toggle-early-learning"
              onClick={() => {
                onChangeDuaSettings((prev) => ({
                  ...prev,
                  earlyLearningMode: !isEarlyLearningMode,
                }));
              }}
              className={`px-3 py-2 rounded-2xl text-xs font-black inline-flex items-center gap-1.5 transition-all cursor-pointer border ${
                isEarlyLearningMode
                  ? 'bg-amber-100 text-amber-950 border-amber-400 ring-2 ring-amber-300 shadow-2xs'
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}
              title={
                isEarlyLearningMode
                  ? 'Modo Aprendizaje Temprano ACTIVO (clic para desactivar)'
                  : 'Activar Modo Aprendizaje Temprano (para 1° y 2° básico)'
              }
            >
              <span>🧸 Modo Temprano</span>
              {isEarlyLearningMode && <Check className="w-3 h-3 text-amber-800" />}
            </button>
            {/* Play/Stop Audio Button */}
            <button
              type="button"
              id="btn-voice-reading-toggle"
              onClick={handleTogglePlayReading}
              className={`px-4 py-2 rounded-2xl text-xs font-black inline-flex items-center gap-2 transition-all cursor-pointer shadow-2xs ${
                isSpeakingReading
                  ? 'bg-red-600 text-white ring-2 ring-red-300 animate-pulse'
                  : `${theme.primary} text-white`
              }`}
              title={isSpeakingReading ? 'Detener lectura' : 'Escuchar la lectura en voz alta'}
            >
              {isSpeakingReading ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Detener voz</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Escuchar lectura 🔊</span>
                </>
              )}
            </button>

            {/* Calculadora Escolar button - exclusive to Matemática 1° a 4° Básico */}
            {isMatematica && (
              <button
                type="button"
                id="btn-open-calculadora-toolbar"
                onClick={() => setShowCalculadora(true)}
                className="px-3.5 py-2 rounded-2xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs inline-flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 border border-emerald-500"
                title="Abrir Calculadora Escolar Explicada (1° a 4° Básico)"
              >
                <span>🧮 Calculadora</span>
                <span className="hidden sm:inline">Explicada</span>
              </button>
            )}

            {/* Bilingual Controls for English (Minimalist) */}
            {isIngles && (
              <>
                <button
                  type="button"
                  id="btn-toggle-english-translation"
                  onClick={() => setShowEnglishTranslation((prev) => !prev)}
                  className={`px-3 py-2 rounded-2xl text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer border ${
                    showEnglishTranslation
                      ? 'bg-indigo-50 text-indigo-900 border-indigo-300 ring-1 ring-indigo-200'
                      : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                  }`}
                  title="Mostrar u ocultar la traducción en español de cada frase"
                >
                  <span>🇨🇱 Traducción</span>
                  {showEnglishTranslation && <Check className="w-3 h-3 text-indigo-700" />}
                </button>

                {showEnglishTranslation && (
                  <button
                    type="button"
                    id="btn-toggle-english-order"
                    onClick={() =>
                      setEnglishLangOrder((prev) => (prev === 'en-first' ? 'es-first' : 'en-first'))
                    }
                    className="px-3 py-2 rounded-2xl text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer border bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                    title="Alternar si va primero el inglés o el español"
                  >
                    <span>{englishLangOrder === 'en-first' ? '🇬🇧 Inglés arriba' : '🇨🇱 Español arriba'}</span>
                  </button>
                )}
              </>
            )}

            {/* Syllables Mode */}
            <button
              type="button"
              id="btn-toggle-syllables-reading"
              onClick={handleToggleSyllables}
              className={`px-3 py-2 rounded-2xl text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer border ${
                duaSettings.syllableMode
                  ? 'bg-amber-100 text-amber-950 border-amber-400 ring-1 ring-amber-300'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
              title="Separar sílabas para facilitar la lectura"
            >
              <span>Sílabas</span>
              {duaSettings.syllableMode && <Check className="w-3 h-3 text-amber-800" />}
            </button>

            {/* Reading Focus Ruler */}
            <button
              type="button"
              id="btn-toggle-reading-ruler-reading"
              onClick={handleToggleReadingRuler}
              className={`px-3 py-2 rounded-2xl text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer border ${
                duaSettings.readingRuler
                  ? 'bg-indigo-50 text-indigo-900 border-indigo-300 ring-1 ring-indigo-200'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
              title="Regla para seguir la línea de lectura con la vista"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Regla</span>
              {duaSettings.readingRuler && <Check className="w-3 h-3 text-indigo-700" />}
            </button>

            {/* DUA Speed & Sensory Settings Modal */}
            <button
              type="button"
              id="btn-open-dua-settings-modal"
              onClick={() => setShowDuaModal((prev) => !prev)}
              className={`p-2 rounded-2xl border transition-colors cursor-pointer ${
                showDuaModal
                  ? 'bg-stone-200 border-stone-300 text-stone-900'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
              title="Ajustes de accesibilidad (velocidad de voz y modo calma)"
            >
              <Sliders className="w-4 h-4" />
            </button>

            {/* Edit Text Button (For Teachers / Parents) */}
            <button
              type="button"
              onClick={() => setShowTextEditor((prev) => !prev)}
              className="p-2 rounded-2xl border border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Editar o cargar texto personalizado"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            {/* Generate with AI Button */}
            <button
              type="button"
              id="btn-generate-ai-course-view"
              onClick={onGenerateQuestions}
              disabled={isLoading}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold text-white transition-all cursor-pointer shadow-2xs inline-flex items-center gap-1.5 ${
                isLoading ? 'bg-stone-400 cursor-not-allowed' : `${theme.primary}`
              }`}
              title="Generar nueva propuesta pedagógica con IA"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isLoading ? 'Calibrando...' : 'Nueva IA'}</span>
            </button>
          </div>
        </div>

        {/* Small DUA popover */}
        {showDuaModal && (
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <span className="font-bold text-stone-800 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-stone-600" />
                Ajustes de Accesibilidad DUA
              </span>
              <button
                type="button"
                onClick={() => setShowDuaModal(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-stone-600 block mb-1">
                  Velocidad de Lectura:
                </label>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => onChangeDuaSettings((prev) => ({ ...prev, speechSpeed: 'slow' }))}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold cursor-pointer ${
                      duaSettings.speechSpeed === 'slow'
                        ? 'bg-amber-600 text-white'
                        : 'bg-white border border-stone-200 text-stone-700'
                    }`}
                  >
                    Pausada (1°/2°)
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeDuaSettings((prev) => ({ ...prev, speechSpeed: 'normal' }))}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold cursor-pointer ${
                      duaSettings.speechSpeed === 'normal'
                        ? 'bg-amber-600 text-white'
                        : 'bg-white border border-stone-200 text-stone-700'
                    }`}
                  >
                    Normal (3°/4°)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-600 block mb-1">
                  Modo Sensorial:
                </label>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => onChangeDuaSettings((prev) => ({ ...prev, sensoryMode: 'standard' }))}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold cursor-pointer ${
                      duaSettings.sensoryMode === 'standard'
                        ? 'bg-stone-800 text-white'
                        : 'bg-white border border-stone-200 text-stone-700'
                    }`}
                  >
                    Estándar
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeDuaSettings((prev) => ({ ...prev, sensoryMode: 'calm' }))}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold cursor-pointer ${
                      duaSettings.sensoryMode === 'calm'
                        ? 'bg-emerald-700 text-white'
                        : 'bg-white border border-stone-200 text-stone-700'
                    }`}
                  >
                    Modo Calma Verde
                  </button>
                </div>
              </div>

              <div className="sm:col-span-2 pt-2 border-t border-stone-200">
                <label className="text-[11px] font-bold text-stone-600 block mb-1">
                  Modo de Aprendizaje Temprano (1° y 2° Básico):
                </label>
                <div className="flex items-center justify-between gap-2 p-2 bg-white rounded-xl border border-stone-200">
                  <span className="text-[11px] text-stone-600">
                    Reduce carga de texto, prioriza íconos/juegos táctiles y desactiva gramática técnica.
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onChangeDuaSettings((prev) => ({
                        ...prev,
                        earlyLearningMode: !isEarlyLearningMode,
                      }))
                    }
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isEarlyLearningMode
                        ? 'bg-amber-500 text-white'
                        : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {isEarlyLearningMode ? 'Activado' : 'Desactivado'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Early Learning Mode Reassurance Banner (1° y 2° Básico) */}
        {isEarlyLearningMode && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-100/90 via-orange-50/80 to-amber-100/90 border border-amber-300/80 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-200/90 text-amber-800 flex items-center justify-center text-xl shadow-2xs shrink-0">
                ✨
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm font-black text-amber-950">
                    Modo de Aprendizaje Temprano Activo ({selectedNivel})
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                    Primeros Pasos
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-amber-900/90 mt-0.5">
                  {isIngles
                    ? 'Actividad visual con palabras e íconos para unir con el dedito. Sin sobrecarga de texto ni jerga gramatical.'
                    : 'Texto reducido y espacioso, íconos visuales de apoyo, audio por frase y sin explicaciones gramaticales complejas.'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onChangeDuaSettings((prev) => ({
                  ...prev,
                  earlyLearningMode: false,
                }));
              }}
              className="px-3 py-1.5 rounded-xl text-[11px] font-bold text-amber-900 bg-white/90 hover:bg-white border border-amber-300 transition-all cursor-pointer self-start sm:self-center shrink-0 shadow-2xs"
            >
              Cambiar a modo estándar
            </button>
          </div>
        )}

        {/* Text Area (Editing vs Book-like Reading View) */}
        {showTextEditor ? (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-stone-600">
                Edita o pega un texto oficial para evaluar en {currentUnitDef.numero}:
              </span>
              <label className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold cursor-pointer text-xs">
                <Upload className="w-3.5 h-3.5 text-stone-500" />
                <span>Cargar .txt</span>
                <input type="file" accept=".txt" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => onChangeInputText(e.target.value)}
              rows={5}
              className="w-full p-4 rounded-2xl border border-stone-300 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all resize-y text-stone-800 font-serif leading-relaxed"
              placeholder="Pega aquí el texto que deseas evaluar..."
            />
            <div className="flex justify-between items-center text-xs text-stone-500">
              <span>Palabras: {inputText.trim() ? inputText.trim().split(/\s+/).length : 0}</span>
              {currentSample && (
                <button
                  type="button"
                  onClick={() => {
                    onChangeInputText(currentSample.text);
                    setShowTextEditor(false);
                  }}
                  className="text-amber-700 hover:underline font-semibold cursor-pointer"
                >
                  Restaurar lectura oficial de esta unidad
                </button>
              )}
            </div>
          </div>
        ) : (
          <div
            ref={textContainerRef}
            onMouseMove={handleMouseMoveText}
            onMouseLeave={handleMouseLeaveText}
            className={`relative p-5 sm:p-7 rounded-2xl border transition-all select-text leading-relaxed ${
              duaSettings.sensoryMode === 'calm'
                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                : theme.lightBg + ' border-stone-200 text-stone-800'
            }`}
          >
            {/* Reading Ruler Visual Follower */}
            {duaSettings.readingRuler && isRulerVisible && (
              <div
                className="absolute left-0 right-0 pointer-events-none transition-transform duration-75 z-10"
                style={{ top: `${rulerTop}px` }}
              >
                <div className="h-9 bg-amber-400/25 border-y-2 border-amber-500/70 shadow-2xs flex items-center justify-between px-3">
                  <span className="text-[10px] font-bold text-stone-900 bg-white/90 px-2 py-0.5 rounded shadow-2xs">
                    Línea activa de lectura
                  </span>
                </div>
              </div>
            )}

            {isIngles ? (
              <div className="space-y-4">
                {/* Selector de actividad en inglés para Modo Temprano */}
                {isEarlyLearningMode && (
                  <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-indigo-100">
                    <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                      <span>🌟 Actividad de inglés ({selectedNivel}):</span>
                    </span>
                    <div className="inline-flex p-1 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-bold">
                      <button
                        type="button"
                        id="btn-english-tab-game"
                        onClick={() => setEnglishTab('game')}
                        className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                          englishTab === 'game'
                            ? 'bg-indigo-600 text-white shadow-2xs'
                            : 'text-indigo-800 hover:bg-indigo-100/60'
                        }`}
                      >
                        <span>🎮 Unir con el Dedito</span>
                      </button>
                      <button
                        type="button"
                        id="btn-english-tab-sentences"
                        onClick={() => setEnglishTab('sentences')}
                        className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                          englishTab === 'sentences'
                            ? 'bg-indigo-600 text-white shadow-2xs'
                            : 'text-indigo-800 hover:bg-indigo-100/60'
                        }`}
                      >
                        <span>📖 Oraciones Cortas</span>
                      </button>
                    </div>
                  </div>
                )}

                {isEarlyLearningMode && englishTab === 'game' ? (
                  <EnglishWordMatchGame
                    nivel={selectedNivel}
                    unidadNombre={currentUnitDef.nombre}
                  />
                ) : (
                  <div className={`${textSizeClass} space-y-4`}>
                    {getBilingualLinesForText(inputText).map((item, idx) => {
                      const isEnFirst = englishLangOrder === 'en-first';
                      const topText = isEnFirst ? item.en : (item.es || item.en);
                      const bottomText = isEnFirst ? item.es : item.en;

                      return (
                        <div
                          key={idx}
                          className={`group py-2 px-3 rounded-xl border border-transparent hover:border-indigo-200 hover:bg-white/60 transition-all ${
                            isEarlyLearningMode
                              ? 'bg-white/50 border-stone-200/60 my-2 shadow-2xs'
                              : 'border-b border-stone-100/80 last:border-0'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 space-y-1">
                              {/* Línea principal */}
                              <p className="font-semibold text-stone-900 leading-snug text-base sm:text-lg">
                                {duaSettings.syllableMode ? formatTextWithSyllables(topText) : topText}
                              </p>

                              {/* Traducción directa en la siguiente línea */}
                              {showEnglishTranslation && bottomText && (
                                <p className="text-stone-500 font-normal text-sm sm:text-base leading-snug">
                                  {duaSettings.syllableMode ? formatTextWithSyllables(bottomText) : bottomText}
                                </p>
                              )}
                            </div>

                            {/* Botón sutil para escuchar pronunciación en inglés */}
                            <button
                              type="button"
                              onClick={() => {
                                speechReader.stop();
                                speechReader.speak(item.en, { lang: 'en-US', rate: 0.8 });
                              }}
                              className="p-2 rounded-xl text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors cursor-pointer shrink-0"
                              title={`Escuchar "${item.en}"`}
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : isEarlyLearningMode ? (
              <div className="space-y-3">
                {displayedReadingText
                  .split(/(?<=[.!?])\s+|\n+/)
                  .filter((s) => s.trim().length > 0)
                  .map((sentence, idx) => {
                    const sentenceEmojis = [
                      '🌱',
                      '☀️',
                      '🎒',
                      '🏫',
                      '🍎',
                      '🐶',
                      '🎨',
                      '⭐',
                      '🎈',
                      '🦉',
                      '✨',
                      '🐾',
                    ];
                    const emoji = sentenceEmojis[idx % sentenceEmojis.length];
                    return (
                      <div
                        key={idx}
                        className="p-3.5 sm:p-4 rounded-2xl bg-white border border-stone-200 hover:border-amber-300 transition-all flex items-start justify-between gap-3 shadow-2xs"
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <span
                            className="text-xl sm:text-2xl shrink-0 select-none"
                            role="img"
                            aria-hidden="true"
                          >
                            {emoji}
                          </span>
                          <p className="text-base sm:text-lg font-medium text-stone-900 leading-relaxed pt-0.5">
                            {sentence.trim()}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            speechReader.stop();
                            speechReader.speak(sentence.trim(), {
                              rate: duaSettings.speechSpeed === 'slow' ? 0.8 : 1.0,
                            });
                          }}
                          className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors cursor-pointer shrink-0"
                          title="Escuchar esta oración con voz clara"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className={`${textSizeClass} space-y-3 whitespace-pre-line`}>
                {displayedReadingText}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Calculadora Escolar Quick Launcher for Matemática (1° a 4° Básico) */}
      {isMatematica && (
        <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/5 border border-emerald-300/80 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-xs shrink-0">
              🧮
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-base font-black text-stone-900">
                  Calculadora Escolar Explicada
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                  {selectedNivel}
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-0.5">
                Realiza sumas, restas, multiplicaciones y divisiones con explicación paso a paso, grupos pictóricos y voz.
              </p>
            </div>
          </div>

          <button
            type="button"
            id="btn-open-calculadora-banner"
            onClick={() => setShowCalculadora(true)}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black inline-flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
          >
            <span>Abrir Calculadora</span>
            <span>→</span>
          </button>
        </div>
      )}

      {/* Concrete Manipulatives Widget for Matemática 1° Básico */}
      {isMatematica && selectedNivel === '1° Básico' && (
        <MatematicaConcretaWidget soundEnabled={soundEnabled} />
      )}

      {/* Clean Interactive Challenge Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-stone-400">
              Desafío de Comprensión
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-open-worksheet-course"
              onClick={onOpenWorksheet}
              className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 hover:border-amber-400 text-xs font-bold text-stone-700 inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              title="Ver e imprimir guía para el cuaderno"
            >
              <Printer className="w-3.5 h-3.5 text-stone-500" />
              <span>Imprimir Guía</span>
            </button>

            {/* Switch between Quiz and JSON */}
            <div className="inline-flex p-0.5 rounded-xl bg-stone-100 border border-stone-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('quiz')}
                className={`px-3 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                  activeTab === 'quiz' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500'
                }`}
              >
                <Gamepad2 className="w-3 h-3 text-stone-600" />
                <span>Trivia</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('json')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                  activeTab === 'json' ? 'bg-stone-900 text-white shadow-2xs' : 'text-stone-500'
                }`}
              >
                <Code2 className="w-3 h-3 text-amber-400" />
                <span>JSON</span>
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'quiz' ? (
          <InteractiveQuiz
            quizData={quizData}
            soundEnabled={soundEnabled}
            settings={{ ...duaSettings, earlyLearningMode: isEarlyLearningMode }}
            onResetQuiz={() => {}}
          />
        ) : (
          <JsonExportView
            quizData={quizData}
            rawJson={rawJson}
            onPrintWorksheet={onOpenWorksheet}
          />
        )}
      </div>

      {/* Modal Calculadora Escolar Explicada */}
      <CalculadoraEscolar
        isOpen={showCalculadora}
        onClose={() => setShowCalculadora(false)}
        soundEnabled={soundEnabled}
        selectedNivel={selectedNivel}
      />

      {/* Modal interactivo de Fauna Guía de Chile */}
      <FaunaGuiaModal
        isOpen={showFaunaModal}
        onClose={() => setShowFaunaModal(false)}
        soundEnabled={soundEnabled}
        initialSpecies={guideSpecies}
      />
    </div>
  );
};
