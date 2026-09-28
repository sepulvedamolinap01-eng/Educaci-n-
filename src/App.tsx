import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { SettingsModal } from './components/SettingsModal';
import { AlbumLaminasModal } from './components/AlbumLaminasModal';
import { CursosHomeScreen } from './components/CursosHomeScreen';
import { CourseSubjectsMenu } from './components/CourseSubjectsMenu';
import { CourseDetailView } from './components/CourseDetailView';
import { WorksheetPrintView } from './components/WorksheetPrintView';
import { CurriculumInfoModal } from './components/CurriculumInfoModal';
import { PuduOralLab } from './components/PuduOralLab';
import { SoundscapesModal } from './components/SoundscapesModal';
import {
  chileanSoundscapes,
  SoundscapeBiome,
} from './utils/chileanSoundscapes';
import { getUnlockedLaminas } from './data/albumLaminas';
import { getUnitsForNivel, getDefaultQuizForNivelAndUnit } from './data/mineducUnits';
import { getSampleTextForNivelAndUnit } from './data/mineducTexts';
import { getHistoriaUnitsForNivel, getDefaultHistoriaQuizForNivelAndUnit } from './data/historiaUnits';
import { getHistoriaSampleTextForNivelAndUnit } from './data/historiaTexts';
import {
  getMatematicaUnitsForNivel,
  getDefaultMatematicaQuizForNivelAndUnit,
  getMatematicaSampleTextForNivelAndUnit,
} from './data/matematicaUnits';
import {
  getCienciasUnitsForNivel,
  getDefaultCienciasQuizForNivelAndUnit,
  getCienciasSampleTextForNivelAndUnit,
} from './data/cienciasUnits';
import {
  getInglesUnitsForNivel,
  getDefaultInglesQuizForNivelAndUnit,
  getInglesSampleTextForNivelAndUnit,
} from './data/inglesUnits';
import { randomizeQuizOptions } from './utils/quizRandomizer';
import { speechReader } from './utils/speechReader';
import { MineducQuizResult, SampleMineducText, DuaSettings, AsignaturaType } from './types';
import { AlertCircle, RefreshCw } from 'lucide-react';

const INITIAL_NIVEL = '1° Básico';
const INITIAL_UNIDAD = 'Unidad 1: Mi colegio, mi familia y nuevos amigos';
const INITIAL_QUIZ = randomizeQuizOptions(getDefaultQuizForNivelAndUnit('1° Básico', 'Unidad 1'));
const INITIAL_SAMPLE = getSampleTextForNivelAndUnit('1° Básico', 'Unidad 1');

// Safe browser history state helper (avoids crashes in sandboxed iframes)
const safePushState = (state: any) => {
  try {
    if (typeof window !== 'undefined' && window.history && typeof window.history.pushState === 'function') {
      window.history.pushState(state, '');
    }
  } catch {
    // Ignore in sandboxed environment
  }
};

const safeReplaceState = (state: any) => {
  try {
    if (typeof window !== 'undefined' && window.history && typeof window.history.replaceState === 'function') {
      window.history.replaceState(state, '');
    }
  } catch {
    // Ignore in sandboxed environment
  }
};

// Unified curricular data resolvers across all 5 subjects
export const getCurricularUnits = (asignatura: AsignaturaType, nivel: string) => {
  if (asignatura === 'historia') return getHistoriaUnitsForNivel(nivel);
  if (asignatura === 'matematica') return getMatematicaUnitsForNivel(nivel);
  if (asignatura === 'ciencias') return getCienciasUnitsForNivel(nivel);
  if (asignatura === 'ingles') return getInglesUnitsForNivel(nivel);
  return getUnitsForNivel(nivel);
};

export const getCurricularSampleText = (asignatura: AsignaturaType, nivel: string, unitNum: string) => {
  if (asignatura === 'historia') return getHistoriaSampleTextForNivelAndUnit(nivel, unitNum);
  if (asignatura === 'matematica') return getMatematicaSampleTextForNivelAndUnit(nivel, unitNum);
  if (asignatura === 'ciencias') return getCienciasSampleTextForNivelAndUnit(nivel, unitNum);
  if (asignatura === 'ingles') return getInglesSampleTextForNivelAndUnit(nivel, unitNum);
  return getSampleTextForNivelAndUnit(nivel, unitNum);
};

export const getCurricularDefaultQuiz = (asignatura: AsignaturaType, nivel: string, unitNumOrName: string) => {
  if (asignatura === 'historia') return getDefaultHistoriaQuizForNivelAndUnit(nivel, unitNumOrName);
  if (asignatura === 'matematica') return getDefaultMatematicaQuizForNivelAndUnit(nivel, unitNumOrName);
  if (asignatura === 'ciencias') return getDefaultCienciasQuizForNivelAndUnit(nivel, unitNumOrName);
  if (asignatura === 'ingles') return getDefaultInglesQuizForNivelAndUnit(nivel, unitNumOrName);
  return getDefaultQuizForNivelAndUnit(nivel, unitNumOrName);
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'subjects' | 'course' | 'oral'>('home');
  const [selectedAsignatura, setSelectedAsignatura] = useState<AsignaturaType>('lenguaje');

  const [inputText, setInputText] = useState<string>(
    INITIAL_SAMPLE?.text || INITIAL_QUIZ.texto_oficial
  );
  const [selectedNivel, setSelectedNivel] = useState<string>(INITIAL_NIVEL);
  const [selectedUnidad, setSelectedUnidad] = useState<string>(INITIAL_UNIDAD);
  const [selectedObjetivo, setSelectedObjetivo] = useState<string>('OA 03, OA 04');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Universal Design for Learning (DUA / PIE) accessibility state
  const [duaSettings, setDuaSettings] = useState<DuaSettings>({
    fontSize: 'normal',
    syllableMode: false,
    readingRuler: false,
    speechSpeed: 'slow',
    sensoryMode: 'standard',
  });

  const [quizData, setQuizData] = useState<MineducQuizResult>(INITIAL_QUIZ);
  const [rawJson, setRawJson] = useState<string>(JSON.stringify(INITIAL_QUIZ, null, 2));

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showWorksheet, setShowWorksheet] = useState<boolean>(false);
  const [showCurriculumModal, setShowCurriculumModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showAlbumModal, setShowAlbumModal] = useState<boolean>(false);
  const [unlockedLaminas, setUnlockedLaminas] = useState<string[]>(() => getUnlockedLaminas());

  // Chilean Natural Soundscapes (Ecosistemas DUA) state
  const [showSoundscapesModal, setShowSoundscapesModal] = useState<boolean>(false);
  const [soundscapePlaying, setSoundscapePlaying] = useState<boolean>(() => chileanSoundscapes.getIsRunning());
  const [soundscapeBiome, setSoundscapeBiome] = useState<SoundscapeBiome>(() => chileanSoundscapes.getBiome());

  const handleToggleSoundscape = (biome?: SoundscapeBiome) => {
    const target = biome || soundscapeBiome;
    if (soundscapePlaying) {
      chileanSoundscapes.stop();
      setSoundscapePlaying(false);
    } else {
      chileanSoundscapes.start(target);
      setSoundscapeBiome(target);
      setSoundscapePlaying(true);
    }
  };

  const handleSelectSoundscapeBiome = (biome: SoundscapeBiome) => {
    setSoundscapeBiome(biome);
    if (soundscapePlaying) {
      chileanSoundscapes.start(biome);
    }
  };

  // Soporte nativo para el botón Atrás del teléfono móvil y del navegador
  useEffect(() => {
    safeReplaceState({ screen: 'home' });

    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (!state || state.screen === 'home') {
        setCurrentScreen('home');
      } else if (state.screen === 'subjects') {
        if (state.nivel) setSelectedNivel(state.nivel);
        setCurrentScreen('subjects');
      } else if (state.screen === 'course') {
        if (state.nivel) setSelectedNivel(state.nivel);
        if (state.asignatura) setSelectedAsignatura(state.asignatura);
        setCurrentScreen('course');
      } else if (state.screen === 'oral') {
        if (state.nivel) setSelectedNivel(state.nivel);
        setCurrentScreen('oral');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // When clicking a grade card from the minimal home screen -> opens subjects menu for that grade
  const handleSelectGradeFromHome = (nivel: string) => {
    speechReader.stop();
    setSelectedNivel(nivel);
    setError(null);
    setCurrentScreen('subjects');
    safePushState({ screen: 'subjects', nivel });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When clicking one of the 5 subject cards for the active grade
  const handleSelectAsignaturaAndOpen = (newAsignatura: AsignaturaType) => {
    speechReader.stop();
    setSelectedAsignatura(newAsignatura);
    setError(null);

    const units = getCurricularUnits(newAsignatura, selectedNivel);
    const firstUnit = units[0];
    setSelectedUnidad(firstUnit.nombre);
    setSelectedObjetivo(firstUnit.oas.join(', '));

    const sample = getCurricularSampleText(newAsignatura, selectedNivel, firstUnit.numero);
    if (sample) {
      setInputText(sample.text);
    }

    if (selectedNivel === '1° Básico') {
      setDuaSettings((prev) => ({
        ...prev,
        speechSpeed: 'slow',
      }));
    }

    const defaultQuiz = randomizeQuizOptions(
      getCurricularDefaultQuiz(newAsignatura, selectedNivel, firstUnit.numero)
    );

    setQuizData(defaultQuiz);
    setRawJson(JSON.stringify(defaultQuiz, null, 2));

    setCurrentScreen('course');
    safePushState({ screen: 'course', nivel: selectedNivel, asignatura: newAsignatura });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSubjects = () => {
    speechReader.stop();
    setError(null);
    setShowCurriculumModal(false);
    setShowWorksheet(false);
    setCurrentScreen('subjects');
    safePushState({ screen: 'subjects', nivel: selectedNivel });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    speechReader.stop();
    setError(null);
    setShowCurriculumModal(false);
    setShowWorksheet(false);
    setCurrentScreen('home');
    safePushState({ screen: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    speechReader.stop();
    setError(null);
    setShowCurriculumModal(false);
    setShowWorksheet(false);
    setCurrentScreen('home');
    safePushState({ screen: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenOralLab = (nivel?: string) => {
    speechReader.stop();
    const targetNivel = nivel || selectedNivel;
    setSelectedNivel(targetNivel);
    setError(null);
    setCurrentScreen('oral');
    safePushState({ screen: 'oral', nivel: targetNivel });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick switch between subjects while inside workspace (if needed)
  const handleSelectAsignatura = (newAsignatura: AsignaturaType) => {
    handleSelectAsignaturaAndOpen(newAsignatura);
  };

  // When clicking or opening a course from quick selector
  const handleOpenCourse = (
    nivel: string,
    unitNumberOrName?: string,
    asignatura?: AsignaturaType
  ) => {
    speechReader.stop();
    setSelectedNivel(nivel);
    setError(null);

    const targetAsignatura = asignatura || selectedAsignatura;
    setSelectedAsignatura(targetAsignatura);

    const units = getCurricularUnits(targetAsignatura, nivel);
    let targetUnit = units[0];

    if (unitNumberOrName) {
      const found = units.find(
        (u) =>
          u.numero === unitNumberOrName ||
          u.nombre === unitNumberOrName ||
          u.nombre.includes(unitNumberOrName) ||
          unitNumberOrName.includes(u.numero)
      );
      if (found) targetUnit = found;
    }

    setSelectedUnidad(targetUnit.nombre);
    setSelectedObjetivo(targetUnit.oas.join(', '));

    const sample = getCurricularSampleText(targetAsignatura, nivel, targetUnit.numero);
    if (sample) {
      setInputText(sample.text);
    }

    if (nivel === '1° Básico') {
      setDuaSettings((prev) => ({
        ...prev,
        speechSpeed: 'slow',
      }));
    }

    const defaultQuiz = randomizeQuizOptions(
      getCurricularDefaultQuiz(targetAsignatura, nivel, targetUnit.numero)
    );

    setQuizData(defaultQuiz);
    setRawJson(JSON.stringify(defaultQuiz, null, 2));

    setCurrentScreen('course');
    safePushState({ screen: 'course', nivel, asignatura: targetAsignatura });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When the teacher or student chooses a specific unit within the current grade
  const handleSelectUnidad = (unitNameOrNum: string) => {
    speechReader.stop();
    setSelectedUnidad(unitNameOrNum);
    setError(null);

    const units = getCurricularUnits(selectedAsignatura, selectedNivel);
    const foundUnit =
      units.find(
        (u) =>
          u.nombre === unitNameOrNum ||
          u.numero === unitNameOrNum ||
          unitNameOrNum.includes(u.numero)
      ) || units[0];

    setSelectedObjetivo(foundUnit.oas.join(', '));

    const sample = getCurricularSampleText(selectedAsignatura, selectedNivel, foundUnit.numero);
    if (sample) {
      setInputText(sample.text);
    }

    const defaultQuiz = randomizeQuizOptions(
      getCurricularDefaultQuiz(selectedAsignatura, selectedNivel, foundUnit.numero)
    );

    setQuizData(defaultQuiz);
    setRawJson(JSON.stringify(defaultQuiz, null, 2));
  };

  // When clicking one of the 4 unit-specific readings for the active grade
  const handleSelectSampleText = (sample: SampleMineducText) => {
    speechReader.stop();
    setInputText(sample.text);
    setSelectedNivel(sample.nivel);
    setError(null);

    const units = getCurricularUnits(selectedAsignatura, sample.nivel);
    const matchedUnit =
      units.find((u) => u.numero === sample.unidad || sample.title.includes(u.numero)) || units[0];
    setSelectedUnidad(matchedUnit.nombre);

    if (sample.oa) {
      setSelectedObjetivo(sample.oa);
    }

    const defaultQuiz = randomizeQuizOptions(
      getCurricularDefaultQuiz(selectedAsignatura, sample.nivel, sample.unidad)
    );

    setQuizData(defaultQuiz);
    setRawJson(JSON.stringify(defaultQuiz, null, 2));
  };

  // API Call to generate or customize quiz via Gemini AI
  const handleGenerateQuestions = async () => {
    setIsLoading(true);
    setError(null);

    let textToSend = inputText;
    if (textToSend.includes('[Aquí el código de tu app inyecta') || textToSend.trim().length < 20) {
      const sample = getCurricularSampleText(selectedAsignatura, selectedNivel, selectedUnidad);
      if (sample) {
        textToSend = sample.text;
        setInputText(sample.text);
      }
    }

    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: textToSend,
          nivel: selectedNivel,
          unidad: selectedUnidad,
          objetivo: selectedObjetivo,
          asignatura: selectedAsignatura,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'No se pudo generar las preguntas con el Profesor Mineduc.');
      }

      const receivedQuiz: MineducQuizResult = randomizeQuizOptions({
        ...data.data,
        oa: selectedObjetivo,
        unidad: data.data.unidad || selectedUnidad,
        nivel: data.data.nivel || selectedNivel,
      });

      setQuizData(receivedQuiz);
      setRawJson(JSON.stringify(receivedQuiz, null, 2));

      if (data.isHighDemandFallback) {
        setError(
          data.notice ||
            'Aviso: Los servidores de IA están con alta demanda temporal (503). Se ha cargado la propuesta curricular auténtica y calibrada de nuestro banco oficial Mineduc para esta unidad.'
        );
      } else {
        setError(null);
      }

      if (data.textEvaluated && data.textEvaluated !== inputText) {
        setInputText(data.textEvaluated);
      }
    } catch (err: any) {
      console.error('Error al generar preguntas:', err);
      let rawMsg = err?.message || 'Ocurrió un error al contactar al Profesor Mineduc.';

      try {
        if (rawMsg.includes('{') && rawMsg.includes('}')) {
          const jsonStart = rawMsg.indexOf('{');
          const jsonEnd = rawMsg.lastIndexOf('}');
          const jsonSub = rawMsg.substring(jsonStart, jsonEnd + 1);
          const parsed = JSON.parse(jsonSub);
          if (parsed?.error?.message) {
            rawMsg = parsed.error.message;
          }
        }
      } catch {
        // keep rawMsg
      }

      if (
        rawMsg.includes('503') ||
        rawMsg.includes('high demand') ||
        rawMsg.includes('UNAVAILABLE')
      ) {
        setError(
          'Los servidores de inteligencia artificial están experimentando una alta demanda temporal (Error 503). Puedes reintentar con el botón "Reintentar propuesta".'
        );
      } else {
        setError(rawMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`${
        currentScreen === 'course'
          ? 'h-[100dvh] max-h-[100dvh] flex flex-col overflow-hidden'
          : 'min-h-screen flex flex-col w-full overflow-x-hidden'
      } font-sans transition-colors ${
        duaSettings.sensoryMode === 'calm'
          ? 'bg-emerald-50/40 text-emerald-950 selection:bg-emerald-200'
          : 'bg-[#fafaf8] text-stone-800 selection:bg-amber-200'
      }`}
    >
      {/* App Header (Clean & Minimalist - Hidden on mobile during course game console) */}
      <div className={currentScreen === 'course' ? 'hidden sm:block' : 'block'}>
        <Header
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((prev) => !prev)}
          onOpenSettings={() => setShowSettingsModal(true)}
          onGoHome={handleGoHome}
          onOpenOralLab={() => handleOpenOralLab()}
          onOpenSoundscapes={() => setShowSoundscapesModal(true)}
          soundscapePlaying={soundscapePlaying}
          currentScreen={currentScreen}
        />
      </div>

      {/* Main Container */}
      <main
        className={
          currentScreen === 'course'
            ? 'flex-1 min-h-0 w-full max-w-5xl mx-auto px-2 sm:px-4 py-1 flex flex-col overflow-hidden'
            : 'flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-3 sm:py-6 pb-24 sm:pb-8'
        }
      >
        {/* Error notification banner */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm shadow-xs">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-amber-900">Aviso del Asistente Pedagógico:</strong>
                <span className="text-amber-900/90">{error}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={handleGenerateQuestions}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Reintentar propuesta</span>
              </button>
              <button
                type="button"
                onClick={() => setError(null)}
                className="px-2.5 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Descartar
              </button>
            </div>
          </div>
        )}

        {/* Screen Switching: Home Screen (4 Cursos) vs Menú de Asignaturas (3 Banners) vs Taller Oral con Pudú vs Espacio de Trabajo */}
        {currentScreen === 'home' ? (
          <CursosHomeScreen
            onSelectCourse={handleSelectGradeFromHome}
            onOpenCurriculumModal={() => setShowCurriculumModal(true)}
            onOpenOralLab={() => handleOpenOralLab()}
            soundEnabled={soundEnabled}
          />
        ) : currentScreen === 'subjects' ? (
          <CourseSubjectsMenu
            selectedNivel={selectedNivel}
            onSelectAsignatura={handleSelectAsignaturaAndOpen}
            onBackToHome={handleBackToHome}
            onOpenOralLab={() => handleOpenOralLab(selectedNivel)}
            soundEnabled={soundEnabled}
          />
        ) : currentScreen === 'oral' ? (
          <PuduOralLab
            initialNivel={selectedNivel}
            initialSpecies={
              selectedAsignatura === 'matematica'
                ? 'pinguino'
                : selectedAsignatura === 'historia'
                ? 'condor'
                : selectedAsignatura === 'ciencias'
                ? 'puma'
                : selectedAsignatura === 'ingles'
                ? 'rana'
                : 'pudu'
            }
            soundEnabled={soundEnabled}
            onBackToHome={handleBackToHome}
          />
        ) : (
          <CourseDetailView
            selectedNivel={selectedNivel}
            selectedUnidad={selectedUnidad}
            selectedObjetivo={selectedObjetivo}
            inputText={inputText}
            quizData={quizData}
            rawJson={rawJson}
            isLoading={isLoading}
            soundEnabled={soundEnabled}
            duaSettings={duaSettings}
            onChangeDuaSettings={setDuaSettings}
            onBackToHome={handleBackToHome}
            onBackToSubjects={handleBackToSubjects}
            onSelectCourse={(nivel, unitNum) => handleOpenCourse(nivel, unitNum, selectedAsignatura)}
            onSelectUnidad={handleSelectUnidad}
            onSelectObjetivo={setSelectedObjetivo}
            onChangeInputText={(text) => {
              setInputText(text);
              if (error) setError(null);
            }}
            onSelectSampleText={handleSelectSampleText}
            onGenerateQuestions={handleGenerateQuestions}
            onOpenWorksheet={() => setShowWorksheet(true)}
            selectedAsignatura={selectedAsignatura}
            onSelectAsignatura={handleSelectAsignatura}
            onOpenOralLab={() => handleOpenOralLab(selectedNivel)}
            onOpenSoundscapes={() => setShowSoundscapesModal(true)}
            soundscapePlaying={soundscapePlaying}
          />
        )}
      </main>

      {/* Footer */}
      {currentScreen !== 'course' && (
        <footer className="border-t border-stone-200 bg-white/70 py-4 text-center text-xs text-stone-600">
          <p>
            Profesor Experto en Currículum Nacional Mineduc de Chile • Lenguaje, Matemática, Historia, Ciencias e Inglés (1° a 4° Básico) • DUA / PIE
          </p>
        </footer>
      )}

      {/* Print Worksheet Modal */}
      {showWorksheet && (
        <WorksheetPrintView
          quizData={quizData}
          text={inputText}
          onClose={() => setShowWorksheet(false)}
          asignatura={selectedAsignatura}
        />
      )}

      {/* Curriculum Alignment Modal */}
      {showCurriculumModal && (
        <CurriculumInfoModal onClose={() => setShowCurriculumModal(false)} />
      )}

      {/* Centralized Settings & Accessibility Modal */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        duaSettings={duaSettings}
        onChangeDuaSettings={setDuaSettings}
        onOpenCurriculum={() => setShowCurriculumModal(true)}
        onOpenSoundscapes={() => setShowSoundscapesModal(true)}
        soundscapePlaying={soundscapePlaying}
      />

      {/* Chilean Natural Soundscapes Modal (Ecosistemas DUA) */}
      <SoundscapesModal
        isOpen={showSoundscapesModal}
        onClose={() => setShowSoundscapesModal(false)}
        activeBiome={soundscapeBiome}
        isPlaying={soundscapePlaying}
        onTogglePlay={handleToggleSoundscape}
        onSelectBiome={handleSelectSoundscapeBiome}
      />

      {/* Collectible Fauna Album Modal */}
      <AlbumLaminasModal
        isOpen={showAlbumModal}
        onClose={() => setShowAlbumModal(false)}
        unlockedIds={unlockedLaminas}
      />

      {/* Mobile Bottom Navigation Bar (Persistent and Touch-Friendly) */}
      {currentScreen !== 'course' && (
        <BottomNav
          currentScreen={currentScreen}
          onGoHome={handleGoHome}
          onOpenOralLab={() => handleOpenOralLab()}
          onOpenAlbum={() => {
            setUnlockedLaminas(getUnlockedLaminas());
            setShowAlbumModal(true);
          }}
          onOpenSettings={() => setShowSettingsModal(true)}
        />
      )}
    </div>
  );
}
