import React, { useState } from 'react';
import { getSampleTextsForNivel, SAMPLE_MINEDUC_TEXTS } from '../data/mineducTexts';
import { getUnitsForNivel, getNivelInfo, MineducUnitDefinition } from '../data/mineducUnits';
import { SampleMineducText } from '../types';
import {
  Sparkles,
  BookMarked,
  RefreshCw,
  AlertCircle,
  FileText,
  CheckCircle2,
  Calendar,
  Layers,
  Upload,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Brain,
  GraduationCap,
} from 'lucide-react';

interface TextInputSectionProps {
  inputText: string;
  onChangeInputText: (text: string) => void;
  selectedNivel: string;
  onSelectNivel: (nivel: string) => void;
  selectedUnidad: string;
  onSelectUnidad: (unidad: string) => void;
  selectedObjetivo: string;
  onSelectObjetivo: (oa: string) => void;
  onSelectSampleText?: (sample: SampleMineducText) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const NIVELES = [
  { label: '1° Básico', sub: '6 - 7 años', badge: 'Lectoescritura Inicial' },
  { label: '2° Básico', sub: '7 - 8 años', badge: 'Fluidez y Detalles' },
  { label: '3° Básico', sub: '8 - 9 años', badge: 'Comprensión Profunda' },
  { label: '4° Básico', sub: '9 - 10 años', badge: 'Análisis Inferencial' },
];

export const TextInputSection: React.FC<TextInputSectionProps> = ({
  inputText,
  onChangeInputText,
  selectedNivel,
  onSelectNivel,
  selectedUnidad,
  onSelectUnidad,
  selectedObjetivo,
  onSelectObjetivo,
  onSelectSampleText,
  onGenerate,
  isLoading,
}) => {
  const [showCustomTextEditor, setShowCustomTextEditor] = useState<boolean>(true);

  // Dynamic units and cognitive info according to the active grade
  const nivelInfo = getNivelInfo(selectedNivel);
  const unitsForCurrentNivel = getUnitsForNivel(selectedNivel);
  const sampleTextsForCurrentNivel = getSampleTextsForNivel(selectedNivel);

  const currentUnitDef =
    unitsForCurrentNivel.find(
      (u) => u.nombre === selectedUnidad || u.numero === selectedUnidad || selectedUnidad.includes(u.numero)
    ) || unitsForCurrentNivel[0];

  const handleSelectUnit = (unitDef: MineducUnitDefinition) => {
    onSelectUnidad(unitDef.nombre);
    if (unitDef.oas && unitDef.oas.length > 0) {
      onSelectObjetivo(unitDef.oas.join(', '));
    }

    // Pick matching sample text for this unit
    const matchingSample = sampleTextsForCurrentNivel.find(
      (s) => s.id === unitDef.default_sample_id || s.unidad === unitDef.numero
    );
    if (matchingSample) {
      if (onSelectSampleText) {
        onSelectSampleText(matchingSample);
      } else {
        onChangeInputText(matchingSample.text);
      }
    }
  };

  const handleSelectSample = (sample: SampleMineducText) => {
    if (onSelectSampleText) {
      onSelectSampleText(sample);
    } else {
      onChangeInputText(sample.text);
      onSelectNivel(sample.nivel);
      if (sample.oa) {
        onSelectObjetivo(sample.oa);
      }
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

  const isPlaceholderInput = inputText.includes('[Aquí el código de tu app inyecta');
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const charCount = inputText.length;

  return (
    <section className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 md:p-6 mb-6">
      {/* Header with Title & Pedagogy Badges */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-amber-600" />
            Propuesta Curricular Mineduc por Cursos y Unidades
          </h2>
          <p className="text-sm text-stone-600 mt-0.5">
            Contenidos, textos y preguntas 100% específicos para cada nivel escolar (1° a 4° Básico).
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 text-[11px] font-medium text-stone-600">
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Cero Repetición
          </span>
          <span className="px-2.5 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200 inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-amber-600" />
            Tono Lúdico Chileno
          </span>
          <span className="px-2.5 py-1 bg-sky-50 text-sky-800 rounded-full border border-sky-200 inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-sky-600" />
            Taxonomía 3 Niveles
          </span>
        </div>
      </div>

      {/* 1. Grade Level Selector */}
      <div className="mb-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2 flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4 text-amber-600" />
          <span>1. Selecciona el Curso:</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {NIVELES.map((n) => {
            const isSelected = selectedNivel === n.label;
            return (
              <button
                key={n.label}
                type="button"
                id={`btn-select-nivel-${n.label.replace('° ', '-').toLowerCase()}`}
                onClick={() => onSelectNivel(n.label)}
                className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs ring-1 ring-amber-500'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-amber-50/50 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="font-bold text-sm leading-snug">{n.label}</span>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                      isSelected ? 'bg-amber-700 text-amber-100' : 'bg-stone-200/80 text-stone-600'
                    }`}
                  >
                    {n.sub}
                  </span>
                </div>
                <div className={`text-xs truncate ${isSelected ? 'text-amber-100' : 'text-stone-500'}`}>
                  {n.badge}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cognitive Stage Profile Banner */}
      <div className="mb-5 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
              <span>Etapa Cognitiva ({nivelInfo.nivel}):</span>
              <span className="font-semibold text-amber-800">{nivelInfo.etapa_cognitiva}</span>
            </div>
            <p className="text-xs text-amber-900/80 mt-0.5 leading-relaxed">
              {nivelInfo.enfoque_lenguaje}
            </p>
          </div>
        </div>
        <div className="shrink-0 text-right sm:self-center">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white text-amber-900 border border-amber-200 shadow-2xs inline-block">
            {nivelInfo.edad}
          </span>
        </div>
      </div>

      {/* 2. Official Mineduc Units for the Selected Grade */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>2. Unidades Oficiales del Año Escolar ({selectedNivel}):</span>
          </label>
          <span className="text-xs text-stone-500 font-medium">4 Unidades Oficiales</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {unitsForCurrentNivel.map((u) => {
            const isSelected =
              selectedUnidad === u.nombre ||
              selectedUnidad === u.numero ||
              selectedUnidad.includes(u.numero);
            return (
              <button
                key={u.id}
                type="button"
                id={`btn-unit-${u.id}`}
                onClick={() => handleSelectUnit(u)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-400/80 shadow-xs'
                    : 'bg-stone-50/70 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-xs uppercase text-amber-800">{u.numero}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white text-stone-600 border border-stone-200 inline-flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5 text-stone-400" />
                      {u.mes_estimado}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-stone-900 leading-snug mb-1 line-clamp-2">
                    {u.nombre}
                  </h4>
                  <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                    {u.enfoque}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[10px]">
                  <span className="text-stone-500 font-medium">OAs:</span>
                  <span className="font-bold text-amber-800">{u.oas.join(', ')}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Text Reading Excerpt / Upload Section */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={() => setShowCustomTextEditor((prev) => !prev)}
            className="text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-amber-800 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>3. Lectura de {selectedNivel} ({currentUnitDef.numero}):</span>
            {showCustomTextEditor ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Cargar .txt</span>
              <input type="file" accept=".txt" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        </div>

        {showCustomTextEditor && (
          <div className="space-y-3">
            {/* Quick Samples filtered specifically for the active grade */}
            <div>
              <div className="text-[11px] font-semibold text-stone-500 mb-1.5 flex items-center justify-between">
                <span>Lecturas del Mineduc preparadas para {selectedNivel} (1 por cada Unidad):</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
                {sampleTextsForCurrentNivel.map((sample) => {
                  const isCurrent = inputText === sample.text;
                  return (
                    <button
                      key={sample.id}
                      id={`btn-sample-${sample.id}`}
                      type="button"
                      onClick={() => handleSelectSample(sample)}
                      className={`p-2.5 rounded-xl text-left border text-xs transition-all cursor-pointer flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-amber-100/80 border-amber-500 text-amber-950 font-medium ring-1 ring-amber-400 shadow-2xs'
                          : 'bg-stone-50/80 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[10px] font-bold uppercase text-amber-800">
                            {sample.unidad || 'Unidad'}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-white text-stone-600 border border-stone-200 shrink-0">
                            {sample.oa}
                          </span>
                        </div>
                        <div className="font-bold text-stone-900 leading-snug line-clamp-1 mb-0.5">
                          {sample.title}
                        </div>
                        <p className="text-[10px] text-stone-500 line-clamp-1 italic">
                          {sample.genre}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Textarea */}
            <div className="relative">
              <textarea
                id="mineduc-text-input"
                value={inputText}
                onChange={(e) => {
                  onChangeInputText(e.target.value);
                }}
                placeholder={`Pega aquí el extracto del texto para ${selectedNivel} o déjalo con la lectura oficial de la unidad...`}
                rows={5}
                className="w-full p-4 rounded-xl border border-stone-300 bg-stone-50/50 text-stone-800 text-sm leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 focus:border-amber-600 transition-all font-sans resize-y"
              />

              {isPlaceholderInput && (
                <div className="mt-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>
                      <strong>Marcador detectado:</strong> Al presionar "Generar Propuesta", el sistema inyectará la lectura oficial de {selectedNivel}.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const sample = sampleTextsForCurrentNivel[0];
                      if (sample) handleSelectSample(sample);
                    }}
                    className="text-xs font-bold text-amber-800 underline hover:text-amber-950 cursor-pointer shrink-0 ml-2"
                  >
                    Inyectar lectura
                  </button>
                </div>
              )}

              {/* Text stats */}
              <div className="flex flex-wrap items-center justify-between text-xs text-stone-600 mt-2 px-1">
                <div className="flex items-center gap-3">
                  <span>
                    <strong>{wordCount}</strong> palabras
                  </span>
                  <span>•</span>
                  <span>
                    <strong>{charCount}</strong> caracteres
                  </span>
                  {charCount < 20 && charCount > 0 && !isPlaceholderInput && (
                    <span className="text-amber-800 inline-flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Puedes escribir más texto o presionar una de las lecturas oficiales
                    </span>
                  )}
                </div>
                {inputText && (
                  <button
                    type="button"
                    id="btn-clear-text"
                    onClick={() => onChangeInputText('')}
                    className="text-stone-600 hover:text-stone-800 hover:underline cursor-pointer"
                  >
                    Limpiar texto
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Primary Action Button */}
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-100">
        <div className="text-xs text-stone-600 flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            Generará la propuesta oficial para <strong>{selectedNivel}</strong> • {currentUnitDef.numero}
          </span>
        </div>

        <button
          type="button"
          id="btn-generate-questions"
          onClick={onGenerate}
          disabled={isLoading}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
            isLoading
              ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
              : 'bg-amber-600 hover:bg-amber-700 text-white hover:shadow-md active:scale-98'
          }`}
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>Estructurando propuesta curricular...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Generar con Profesor Mineduc ({selectedNivel})</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};
