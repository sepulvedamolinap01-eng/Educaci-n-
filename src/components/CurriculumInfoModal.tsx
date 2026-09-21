import React, { useState } from 'react';
import { X, Award, BookOpen, Target, CheckCircle, Compass, Calculator } from 'lucide-react';

interface CurriculumInfoModalProps {
  onClose: () => void;
}

export const CurriculumInfoModal: React.FC<CurriculumInfoModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'lenguaje' | 'historia' | 'matematica'>('lenguaje');

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 sm:p-8 text-stone-900 border border-stone-200 my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Award className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Alineación Curricular Mineduc Chile
              </h3>
              <p className="text-xs text-stone-500">
                Bases Curriculares Oficiales de Educación Básica (1° a 4° Básico)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Asignatura Switcher inside Modal */}
        <div className="flex items-center gap-2 mb-4 p-1 bg-stone-100 rounded-xl border border-stone-200">
          <button
            type="button"
            onClick={() => setActiveTab('lenguaje')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'lenguaje'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Lenguaje</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('historia')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'historia'
                ? 'bg-sky-700 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Historia</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('matematica')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'matematica'
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Matemática</span>
          </button>
        </div>

        {activeTab === 'lenguaje' ? (
          <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
              <h4 className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-amber-700" />
                Ejes: Lectura y Comunicación Oral
              </h4>
              <p className="text-xs text-amber-800">
                Las preguntas y actividades orales se alinean rigurosamente con los textos oficiales y programas del Mineduc (Leo Primero y Textos del Estudiante).
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl border border-stone-200 bg-stone-50/60">
                <div className="font-bold text-stone-900 mb-0.5 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  1° Básico • Conciencia Fonológica y Comprensión Explícita
                </div>
                <p className="text-xs text-stone-600">
                  Localización de personajes, hechos directos y expresión oral con vocabulario familiar y cotidiano.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-stone-200 bg-stone-50/60">
                <div className="font-bold text-stone-900 mb-0.5 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  2° Básico • Comprensión Narrativa e Inferencias Simples
                </div>
                <p className="text-xs text-stone-600">
                  Secuencia cronológica, causa-efecto directa y significado de palabras según el contexto del relato.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-stone-200 bg-stone-50/60">
                <div className="font-bold text-stone-900 mb-0.5 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  3° y 4° Básico • Mitos, Artículos y Reflexión Crítica
                </div>
                <p className="text-xs text-stone-600">
                  Extracción de información explícita e implícita, propósito comunicativo y fundamentación de opiniones personales.
                </p>
              </div>
            </div>
          </div>
        ) : activeTab === 'historia' ? (
          <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200">
              <h4 className="font-bold text-sky-900 mb-1 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-sky-700" />
                Ejes: Historia, Geografía y Formación Ciudadana
              </h4>
              <p className="text-xs text-sky-800">
                Desarrollo de la noción de tiempo, orientación espacial con mapas, conocimiento de los pueblos originarios y valoración de la convivencia democrática.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl border border-stone-200 bg-stone-50/60">
                <div className="font-bold text-stone-900 mb-0.5 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-sky-600" />
                  1° Básico • Tiempo Personal, Familia y Comunidad
                </div>
                <p className="text-xs text-stone-600">
                  Nociones de ayer, hoy y mañana; árbol genealógico, trabajadores e instituciones de la comunidad, símbolos patrios y paisajes de Chile.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-stone-200 bg-stone-50/60">
                <div className="font-bold text-stone-900 mb-0.5 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-sky-600" />
                  2° Básico • Planos, Pueblos Originarios y Mestizaje
                </div>
                <p className="text-xs text-stone-600">
                  Ubicación de Chile en el globo y mapa, pueblos originarios (nómades y sedentarios), herencia cultural mestiza y derechos del niño.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-stone-200 bg-stone-50/60">
                <div className="font-bold text-stone-900 mb-0.5 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-sky-600" />
                  3° Básico • Zonas Climáticas, Grecia y Roma Antigua
                </div>
                <p className="text-xs text-stone-600">
                  Líneas imaginarias y climas de la Tierra, legado cultural de Grecia (polis, democracia) y Roma (derecho, calzadas) y vida en sociedad.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-stone-200 bg-stone-50/60">
                <div className="font-bold text-stone-900 mb-0.5 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-sky-600" />
                  4° Básico • América, Civilizaciones Precolombinas y Democracia
                </div>
                <p className="text-xs text-stone-600">
                  Paisajes y recursos de América, civilizaciones Maya, Azteca e Inca, y organización democrática de la República de Chile y sus poderes.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <h4 className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-emerald-700" />
                Ejes: Números y Operaciones • Enfoque COPISI
              </h4>
              <p className="text-xs text-emerald-800">
                Alineado con el Programa Sumo Primero Mineduc: progresión desde lo concreto (fichas), pictórico (dibujos) hasta lo simbólico (cifras y algoritmos).
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl border border-stone-200 bg-stone-50/60">
                <div className="font-bold text-stone-900 mb-0.5 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  1° Básico • Conteo 0-20 y Sumas/Restas de 1 Dígito
                </div>
                <p className="text-xs text-stone-600">
                  Conteo concreto, lectura hasta 20 y adición/sustracción simple de un dígito (0 a 10) representando juntar o quitar elementos.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-stone-200 bg-stone-50/60">
                <div className="font-bold text-stone-900 mb-0.5 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  2° Básico • Ámbito hasta 100, Valor Posicional e Inicio de Multiplicación
                </div>
                <p className="text-xs text-stone-600">
                  Decenas y unidades, adición y sustracción de 2 dígitos y la suma reiterada como base de la multiplicación.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-stone-200 bg-stone-50/60">
                <div className="font-bold text-stone-900 mb-0.5 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  3° Básico • Ámbito hasta 1.000, Tablas y Fracciones Simples
                </div>
                <p className="text-xs text-stone-600">
                  Centenas, multiplicación formal hasta la tabla del 10, división como reparto equitativo y fracciones concretas.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-stone-200 bg-stone-50/60">
                <div className="font-bold text-stone-900 mb-0.5 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  4° Básico • Ámbito hasta 10.000, Algoritmos y Decimales
                </div>
                <p className="text-xs text-stone-600">
                  Resolución de problemas con las 4 operaciones, fracciones impropias, números mixtos y primeros decimales (décimos/centésimos).
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-5 p-3 rounded-xl bg-stone-100 text-stone-600 text-xs">
          <strong>Taxonomía Pedagógica Mineduc:</strong> Se evalúan 3 preguntas interactivas (Datos explícitos/operación directa, Estrategia/modelo, y Argumentación/comprobación) adaptadas al nivel escolar.
        </div>

        <div className="mt-5 pt-3 border-t border-stone-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer ${
              activeTab === 'historia'
                ? 'bg-sky-700 hover:bg-sky-800'
                : activeTab === 'matematica'
                ? 'bg-emerald-700 hover:bg-emerald-800'
                : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
