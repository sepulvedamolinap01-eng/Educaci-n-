import React, { useState } from 'react';
import { DuaSettings, MineducQuizResult } from '../types';
import { soundFx } from '../utils/soundEffects';
import {
  X,
  Sliders,
  Edit3,
  Sparkles,
  BookOpen,
  Code2,
  Printer,
  Check,
  Eye,
  Volume2,
  RotateCcw,
} from 'lucide-react';

interface DocentePanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNivel: string;
  selectedUnidad: string;
  selectedObjetivo: string;
  inputText: string;
  onChangeInputText: (text: string) => void;
  duaSettings: DuaSettings;
  onChangeDuaSettings: (settings: DuaSettings | ((prev: DuaSettings) => DuaSettings)) => void;
  onGenerateQuestions: () => void;
  isLoading: boolean;
  onOpenWorksheet: () => void;
  onViewJson: () => void;
}

export const DocentePanelModal: React.FC<DocentePanelModalProps> = ({
  isOpen,
  onClose,
  selectedNivel,
  selectedUnidad,
  selectedObjetivo,
  inputText,
  onChangeInputText,
  duaSettings,
  onChangeDuaSettings,
  onGenerateQuestions,
  isLoading,
  onOpenWorksheet,
  onViewJson,
}) => {
  const [tab, setTab] = useState<'dua' | 'editor' | 'oa'>('dua');
  const [tempText, setTempText] = useState<string>(inputText);

  if (!isOpen) return null;

  const handleSaveText = () => {
    soundFx.playCorrect();
    onChangeInputText(tempText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="bg-stone-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl text-amber-400">
              💼
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                Rincón Docente y Ajustes
              </h2>
              <p className="text-xs text-stone-400">
                Herramientas pedagógicas, diseño universal (DUA) y gestión de texto
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundFx.playPop();
              onClose();
            }}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 p-3 bg-stone-100 border-b border-stone-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              soundFx.playPop();
              setTab('dua');
            }}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              tab === 'dua'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-600 hover:bg-stone-200/70'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Accesibilidad DUA</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playPop();
              setTab('editor');
            }}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              tab === 'editor'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-600 hover:bg-stone-200/70'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editar Texto de Lectura</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playPop();
              setTab('oa');
            }}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              tab === 'oa'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-600 hover:bg-stone-200/70'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Currículum Mineduc</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {tab === 'dua' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <span className="font-bold block mb-1">
                  Principio DUA (Decreto 83 / Mineduc Chile):
                </span>
                Proporciona múltiples formas de representación y compromiso para que todos los
                estudiantes puedan acceder al aprendizaje.
              </div>

              {/* Modo Aprendizaje Temprano */}
              <div className="p-3.5 rounded-2xl bg-white border border-stone-200 flex items-center justify-between gap-3 shadow-2xs">
                <div>
                  <h4 className="text-xs font-black text-stone-900">
                    Modo Aprendizaje Temprano (1° y 2° Básico)
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    Reduce la sobrecarga de lectura, activa juegos táctiles de unir y desactiva explicaciones gramaticales complejas.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onChangeDuaSettings((prev) => ({
                      ...prev,
                      earlyLearningMode: !prev.earlyLearningMode,
                    }))
                  }
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    duaSettings.earlyLearningMode
                      ? 'bg-amber-500 text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-600 border border-stone-300'
                  }`}
                >
                  {duaSettings.earlyLearningMode ? 'Activado' : 'Desactivado'}
                </button>
              </div>

              {/* Velocidad de Audio */}
              <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-2xs">
                <h4 className="text-xs font-black text-stone-900">
                  Velocidad de Lectura por Voz:
                </h4>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onChangeDuaSettings((prev) => ({ ...prev, speechSpeed: 'slow' }))
                    }
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      duaSettings.speechSpeed === 'slow'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    🐢 Pausada (Recomendada para 1° y 2°)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onChangeDuaSettings((prev) => ({ ...prev, speechSpeed: 'normal' }))
                    }
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      duaSettings.speechSpeed === 'normal'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    🐇 Normal (3° y 4°)
                  </button>
                </div>
              </div>

              {/* Opciones visuales */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Sílabas */}
                <div className="p-3 rounded-2xl bg-white border border-stone-200 flex items-center justify-between gap-2 shadow-2xs">
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">
                      Segmentación en Sílabas
                    </span>
                    <span className="text-[10px] text-stone-500">
                      Ej: ca-mi-no, mar-i-po-sa
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onChangeDuaSettings((prev) => ({
                        ...prev,
                        syllableMode: !prev.syllableMode,
                      }))
                    }
                    className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                      duaSettings.syllableMode
                        ? 'bg-amber-600 text-white'
                        : 'bg-stone-100 text-stone-600 border border-stone-300'
                    }`}
                  >
                    {duaSettings.syllableMode ? 'Sí' : 'No'}
                  </button>
                </div>

                {/* Regla de lectura */}
                <div className="p-3 rounded-2xl bg-white border border-stone-200 flex items-center justify-between gap-2 shadow-2xs">
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">
                      Regla Focal de Lectura
                    </span>
                    <span className="text-[10px] text-stone-500">
                      Sigue la línea con el cursor
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onChangeDuaSettings((prev) => ({
                        ...prev,
                        readingRuler: !prev.readingRuler,
                      }))
                    }
                    className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                      duaSettings.readingRuler
                        ? 'bg-indigo-600 text-white'
                        : 'bg-stone-100 text-stone-600 border border-stone-300'
                    }`}
                  >
                    {duaSettings.readingRuler ? 'Sí' : 'No'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {tab === 'editor' && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-stone-800 block">
                Texto base para la clase ({selectedNivel}):
              </label>
              <textarea
                value={tempText}
                onChange={(e) => setTempText(e.target.value)}
                rows={9}
                className="w-full p-3.5 rounded-2xl border border-stone-300 bg-stone-50 font-mono text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Escribe o pega el texto que trabajarán los estudiantes..."
              />

              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] text-stone-500">
                  {tempText.split(/\s+/).filter(Boolean).length} palabras
                </span>
                <button
                  type="button"
                  onClick={handleSaveText}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
                >
                  Guardar texto para la clase
                </button>
              </div>
            </div>
          )}

          {tab === 'oa' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Unidad Actual
                  </span>
                  <span className="text-xs font-black text-stone-900 bg-white px-2 py-0.5 rounded-lg border border-stone-200">
                    {selectedUnidad}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold text-stone-500 block mb-1">
                    Objetivos de Aprendizaje (OA Oficiales Mineduc):
                  </span>
                  <p className="text-xs font-bold text-stone-800 bg-white p-3 rounded-xl border border-stone-200">
                    {selectedObjetivo}
                  </p>
                </div>
              </div>

              {/* Acciones de exportación docente */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onOpenWorksheet();
                    onClose();
                  }}
                  className="p-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Printer className="w-4 h-4 text-amber-700" />
                  <span>Imprimir Guía de Trabajo</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onViewJson();
                    onClose();
                  }}
                  className="p-3.5 rounded-2xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Code2 className="w-4 h-4 text-stone-700" />
                  <span>Ver Formato Técnico JSON</span>
                </button>
              </div>

              {/* Botón de re-calibrar con IA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onGenerateQuestions();
                    onClose();
                  }}
                  disabled={isLoading}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {isLoading ? 'Calibrando con IA...' : 'Generar Nuevas Preguntas con IA'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
