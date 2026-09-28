import React, { useState, useEffect } from 'react';
import { getUnitsForNivel, MineducUnitDefinition } from '../data/mineducUnits';
import { getSampleTextsForNivel } from '../data/mineducTexts';
import { getHistoriaUnitsForNivel } from '../data/historiaUnits';
import { getHistoriaSampleTextsForNivel } from '../data/historiaTexts';
import {
  getMatematicaUnitsForNivel,
  getMatematicaSampleTextsForNivel,
} from '../data/matematicaUnits';
import { getCienciasUnitsForNivel, getCienciasSampleTextsForNivel } from '../data/cienciasUnits';
import { getInglesUnitsForNivel, getInglesSampleTextsForNivel } from '../data/inglesUnits';
import { CalculadoraEscolar } from './CalculadoraEscolar';
import { FaunaAvatar, FaunaSpecies } from './FaunaAvatars';
import { FaunaGuiaModal } from './FaunaGuiaModal';
import { MineducQuizResult, SampleMineducText, DuaSettings, AsignaturaType } from '../types';
import { InteractiveReadingView } from './InteractiveReadingView';
import { InteractiveQuiz } from './InteractiveQuiz';
import { JsonExportView } from './JsonExportView';
import { EnglishWordMatchGame } from './EnglishWordMatchGame';
import { AlbumLaminasModal } from './AlbumLaminasModal';
import { DocentePanelModal } from './DocentePanelModal';
import { getUnlockedLaminas } from '../data/albumLaminas';
import { soundFx } from '../utils/soundEffects';
import { speechReader } from '../utils/speechReader';
import {
  ArrowLeft,
  BookOpen,
  Volume2,
  Square,
  Star,
  Award,
  Sliders,
  Sparkles,
  Trophy,
  Home,
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
  onOpenOralLab?: () => void;
  onOpenSoundscapes?: () => void;
  soundscapePlaying?: boolean;
}

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
  onOpenOralLab,
  onOpenSoundscapes,
  soundscapePlaying = false,
}) => {
  // Wizard state machine:
  // 0 = Cuento en Diapositivas (Story Cards)
  // 1 .. totalQuestions = Desafíos de Trivia
  // totalQuestions + 1 = Gran Fiesta de Recompensas
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [activeTab, setActiveTab] = useState<'quiz' | 'json'>('quiz');
  const [showCalculadora, setShowCalculadora] = useState<boolean>(false);
  const [showFaunaModal, setShowFaunaModal] = useState<boolean>(false);
  const [isSpeakingReading, setIsSpeakingReading] = useState<boolean>(false);
  const [showAlbumModal, setShowAlbumModal] = useState<boolean>(false);
  const [showDocenteModal, setShowDocenteModal] = useState<boolean>(false);
  const [unlockedLaminas, setUnlockedLaminas] = useState<string[]>(() => getUnlockedLaminas());

  useEffect(() => {
    setCurrentStep(0);
    speechReader.stop();
    setIsSpeakingReading(false);
  }, [selectedUnidad, selectedNivel, selectedAsignatura]);

  const handleOpenAlbum = () => {
    soundFx.playMagicStar();
    setUnlockedLaminas(getUnlockedLaminas());
    setShowAlbumModal(true);
  };

  const isGrade1or2 = selectedNivel === '1° Básico' || selectedNivel === '2° Básico';
  const isEarlyLearningMode =
    duaSettings.earlyLearningMode !== undefined ? duaSettings.earlyLearningMode : isGrade1or2;

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

  const currentUnits: any[] = isHistoria
    ? getHistoriaUnitsForNivel(selectedNivel)
    : isMatematica
    ? getMatematicaUnitsForNivel(selectedNivel)
    : isCiencias
    ? getCienciasUnitsForNivel(selectedNivel)
    : isIngles
    ? getInglesUnitsForNivel(selectedNivel)
    : getUnitsForNivel(selectedNivel);

  const currentUnitDef =
    currentUnits.find(
      (u: any) =>
        u.nombre.toLowerCase().includes(selectedUnidad.toLowerCase()) ||
        selectedUnidad.toLowerCase().includes(u.numero.toLowerCase())
    ) || currentUnits[0];

  const currentSamples: any[] = isHistoria
    ? getHistoriaSampleTextsForNivel(selectedNivel)
    : isMatematica
    ? getMatematicaSampleTextsForNivel(selectedNivel)
    : isCiencias
    ? getCienciasSampleTextsForNivel(selectedNivel)
    : isIngles
    ? getInglesSampleTextsForNivel(selectedNivel)
    : getSampleTextsForNivel(selectedNivel);

  const currentSample = currentSamples.find(
    (s: any) => s.unidad === currentUnitDef.numero || s.title.includes(currentUnitDef.numero)
  );

  const totalQuestions = quizData.preguntas?.length || 3;

  const handleTogglePlayReading = () => {
    if (isSpeakingReading) {
      speechReader.stop();
      setIsSpeakingReading(false);
    } else {
      setIsSpeakingReading(true);
      const rate = duaSettings.speechSpeed === 'slow' ? 0.8 : 1.0;
      speechReader.speak(inputText, {
        rate,
        onEnd: () => setIsSpeakingReading(false),
        onError: () => setIsSpeakingReading(false),
      });
    }
  };

  const theme = isHistoria
    ? { badge: 'bg-amber-100 text-amber-900 border-amber-300', title: 'Historia' }
    : isMatematica
    ? { badge: 'bg-emerald-100 text-emerald-900 border-emerald-300', title: 'Matemática' }
    : isCiencias
    ? { badge: 'bg-teal-100 text-teal-900 border-teal-300', title: 'Ciencias' }
    : isIngles
    ? { badge: 'bg-indigo-100 text-indigo-900 border-indigo-300', title: 'Inglés' }
    : { badge: 'bg-amber-100 text-amber-900 border-amber-300', title: 'Lenguaje' };

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-5xl mx-auto overflow-hidden select-none">
      {/* 1. Playful Top HUD Bar: Compact single row on all devices */}
      <header className="shrink-0 bg-white/95 backdrop-blur-md border border-amber-300/90 rounded-2xl px-2 sm:px-3 py-1.5 mb-1.5 shadow-2xs flex items-center justify-between gap-1.5">
        {/* Back button & Subject Badge */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            id="btn-back-to-home-hud"
            onClick={() => {
              soundFx.playPop();
              speechReader.stop();
              onBackToHome();
            }}
            className="p-1 sm:px-2 sm:py-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-black inline-flex items-center gap-1 transition-all cursor-pointer active:scale-95 border border-stone-200 shadow-2xs"
            title="Volver a la portada de cursos"
          >
            <Home className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">Inicio</span>
          </button>

          <button
            type="button"
            id="btn-back-to-subjects"
            onClick={() => {
              soundFx.playPop();
              speechReader.stop();
              onBackToSubjects();
            }}
            className="px-2.5 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-black inline-flex items-center gap-1 transition-all cursor-pointer active:scale-95 border border-amber-300 shadow-2xs"
            title="Volver a elegir asignatura"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[3]" />
            <span className="hidden sm:inline">Volver</span>
          </button>

          <span className={`px-2 py-0.5 rounded-lg border text-[11px] font-black shrink-0 ${theme.badge}`}>
            {theme.title}
          </span>
        </div>

        {/* Child-Friendly Adventure Trail (Caminito de Huellitas) */}
        <div className="flex items-center gap-1 bg-amber-50/80 px-2 py-0.5 rounded-xl border border-amber-200 text-xs font-black shrink-0">
          {/* Step 1: Cuento */}
          <button
            type="button"
            onClick={() => {
              soundFx.playPop();
              speechReader.stop();
              setCurrentStep(0);
            }}
            className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
              currentStep === 0
                ? 'bg-amber-500 text-white shadow-2xs scale-105'
                : 'text-stone-600 hover:text-amber-800'
            }`}
          >
            <span>📖 Cuento</span>
          </button>

          <span className="text-amber-300 text-[10px] select-none">🐾</span>

          {/* Step 2: Desafíos */}
          <button
            type="button"
            onClick={() => {
              soundFx.playPop();
              speechReader.stop();
              setCurrentStep(1);
            }}
            className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
              currentStep >= 1 && currentStep <= totalQuestions
                ? 'bg-amber-500 text-white shadow-2xs scale-105'
                : 'text-stone-600 hover:text-amber-800'
            }`}
          >
            <span>🎯 Trivia</span>
          </button>

          <span className="text-amber-300 text-[10px] select-none">🐾</span>

          {/* Step 3: Recompensas */}
          <button
            type="button"
            onClick={() => {
              soundFx.playPop();
              speechReader.stop();
              setCurrentStep(totalQuestions + 1);
            }}
            className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
              currentStep > totalQuestions
                ? 'bg-emerald-600 text-white shadow-2xs scale-105'
                : 'text-stone-600 hover:text-emerald-800'
            }`}
          >
            <span>🏆 Premio</span>
          </button>
        </div>

        {/* Quick HUD Tool Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Audio Toggle */}
          <button
            type="button"
            id="btn-voice-reading-hud"
            onClick={handleTogglePlayReading}
            className={`px-2 py-1 rounded-xl text-xs font-black inline-flex items-center gap-1 transition-all cursor-pointer ${
              isSpeakingReading
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
            }`}
            title="Escuchar con voz"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden md:inline">Voz</span>
          </button>

          {/* Calculadora (Math only) */}
          {isMatematica && (
            <button
              type="button"
              id="btn-open-calculadora-hud"
              onClick={() => {
                soundFx.playBoing();
                setShowCalculadora(true);
              }}
              className="px-2 py-1 rounded-xl text-xs font-black bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 inline-flex items-center gap-1 cursor-pointer active:scale-95"
            >
              <span>🧮</span>
            </button>
          )}

          {/* Álbum de Láminas */}
          <button
            type="button"
            id="btn-open-album-hud"
            onClick={handleOpenAlbum}
            className="px-2 py-1 rounded-xl text-xs font-black bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 inline-flex items-center gap-1 cursor-pointer active:scale-95"
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-600" />
            <span className="hidden sm:inline">({unlockedLaminas.length})</span>
          </button>

          {/* Teacher & DUA Settings */}
          <button
            type="button"
            id="btn-open-tools-hud"
            onClick={() => {
              soundFx.playPop();
              setShowDocenteModal(true);
            }}
            className="p-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold inline-flex items-center cursor-pointer"
            title="Ajustes DUA y profesor"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 2. Main Game Console Screen (No Page Scroll, Carousel / Step Experience) */}
      <main className="flex-1 min-h-0 flex flex-col justify-center overflow-hidden py-0.5">
        {activeTab === 'json' ? (
          <div className="h-full overflow-y-auto bg-stone-900 rounded-3xl p-4 text-white">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-amber-400">JSON Curricular</span>
              <button
                type="button"
                onClick={() => setActiveTab('quiz')}
                className="text-xs bg-amber-500 px-3 py-1 rounded-xl text-white font-bold"
              >
                Volver
              </button>
            </div>
            <JsonExportView
              quizData={quizData}
              rawJson={rawJson}
              onPrintWorksheet={onOpenWorksheet}
            />
          </div>
        ) : currentStep === 0 ? (
          /* =========================================================================
             PANTALLA 1: Cuento Interactivo en Diapositivas (Story Cards Carousel)
             ========================================================================= */
          <div className="w-full flex-1 flex flex-col justify-center">
            {isIngles && isEarlyLearningMode ? (
              <div className="bg-white rounded-3xl border-4 border-indigo-200 p-4 sm:p-6 shadow-sm flex flex-col justify-between flex-1 animate-console-step">
                <EnglishWordMatchGame
                  nivel={selectedNivel}
                  unidadNombre={currentUnitDef.nombre}
                  onOpenAlbum={handleOpenAlbum}
                />
                <div className="pt-3 border-t border-stone-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playPop();
                      setCurrentStep(1);
                    }}
                    className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm inline-flex items-center gap-2 shadow-md cursor-pointer active:scale-95"
                  >
                    <span>¡A Jugar la Trivia! 🚀</span>
                  </button>
                </div>
              </div>
            ) : (
              <InteractiveReadingView
                title={currentSample?.title || quizData.titulo_texto}
                text={inputText}
                genre={(currentSample as any)?.genero || (currentSample as any)?.genre || quizData.eje_tematico}
                nivel={selectedNivel}
                unidad={currentUnitDef.nombre}
                settings={{ ...duaSettings, earlyLearningMode: isEarlyLearningMode }}
                guideSpecies={guideSpecies}
                onNext={() => {
                  soundFx.playCelebration();
                  speechReader.stop();
                  setCurrentStep(1);
                }}
                nextButtonLabel="¡A Jugar la Trivia! 🚀"
              />
            )}
          </div>
        ) : (
          /* =========================================================================
             PANTALLAS INTERMEDIAS (Trivia 1 pregunta por pantalla) + PANTALLA FINAL
             ========================================================================= */
          <div className="w-full flex-1 flex flex-col justify-center">
            <InteractiveQuiz
              quizData={quizData}
              soundEnabled={soundEnabled}
              settings={{ ...duaSettings, earlyLearningMode: isEarlyLearningMode }}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
              onBackToIntro={() => {
                soundFx.playPop();
                speechReader.stop();
                setCurrentStep(0);
              }}
              guideSpecies={guideSpecies}
              readingText={inputText}
              readingTitle={currentSample?.title || quizData.titulo_texto}
              onOpenAlbum={handleOpenAlbum}
              onOpenWorksheet={onOpenWorksheet}
            />
          </div>
        )}
      </main>

      {/* Modals (Calculadora, Fauna, Álbum, Docente) */}
      <CalculadoraEscolar
        isOpen={showCalculadora}
        onClose={() => setShowCalculadora(false)}
        soundEnabled={soundEnabled}
        selectedNivel={selectedNivel}
      />

      <FaunaGuiaModal
        isOpen={showFaunaModal}
        onClose={() => setShowFaunaModal(false)}
        soundEnabled={soundEnabled}
        initialSpecies={guideSpecies}
      />

      <AlbumLaminasModal
        isOpen={showAlbumModal}
        onClose={() => setShowAlbumModal(false)}
        unlockedIds={unlockedLaminas}
      />

      <DocentePanelModal
        isOpen={showDocenteModal}
        onClose={() => setShowDocenteModal(false)}
        selectedNivel={selectedNivel}
        selectedUnidad={selectedUnidad}
        selectedObjetivo={selectedObjetivo}
        inputText={inputText}
        onChangeInputText={onChangeInputText}
        duaSettings={duaSettings}
        onChangeDuaSettings={onChangeDuaSettings}
        onGenerateQuestions={onGenerateQuestions}
        isLoading={isLoading}
        onOpenWorksheet={onOpenWorksheet}
        onViewJson={() => {
          setShowDocenteModal(false);
          setActiveTab('json');
        }}
      />
    </div>
  );
};
