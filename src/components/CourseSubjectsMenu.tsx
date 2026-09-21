import React from 'react';
import { AsignaturaType } from '../types';
import { FaunaAvatar } from './FaunaAvatars';
import {
  ArrowRight,
  BookOpen,
  Compass,
  Calculator,
  ChevronRight,
  Home,
  FlaskConical,
  Languages,
} from 'lucide-react';

interface CourseSubjectsMenuProps {
  selectedNivel: string;
  onSelectAsignatura: (asignatura: AsignaturaType) => void;
  onBackToHome: () => void;
  onOpenOralLab?: () => void;
  soundEnabled?: boolean;
}

export const CourseSubjectsMenu: React.FC<CourseSubjectsMenuProps> = ({
  selectedNivel,
  onSelectAsignatura,
  onBackToHome,
  onOpenOralLab,
  soundEnabled = true,
}) => {
  // Nivel emojis & brief description
  const nivelMeta: Record<string, { emoji: string; edad: string; subtitulo: string }> = {
    '1° Básico': {
      emoji: '🎒',
      edad: '6 - 7 años',
      subtitulo: 'Lectoescritura inicial, sumas y restas con material concreto, cuerpo y salud, e inglés introductorio.',
    },
    '2° Básico': {
      emoji: '🌱',
      edad: '7 - 8 años',
      subtitulo: 'Fluidez lectora, operaciones hasta 100, hábitats naturales, pueblos originarios y vocabulario en inglés.',
    },
    '3° Básico': {
      emoji: '🔭',
      edad: '8 - 9 años',
      subtitulo: 'Mitos y fábulas, multiplicación y fracciones, sistema solar, civilizaciones clásicas y conversaciones en inglés.',
    },
    '4° Básico': {
      emoji: '🎭',
      edad: '9 - 10 años',
      subtitulo: 'Comprensión crítica, cálculo de área y decimales, ecosistemas, civilizaciones de América y diálogos en inglés.',
    },
  };

  const currentMeta = nivelMeta[selectedNivel] || {
    emoji: '📚',
    edad: 'Educación Básica',
    subtitulo: 'Currículum Nacional Oficial Mineduc',
  };

  return (
    <div className="space-y-6">
      {/* Sleek Breadcrumb & Header */}
      <div className="flex items-center justify-between gap-3">
        <nav
          aria-label="Ruta de navegación"
          className="flex items-center gap-2 text-xs text-stone-500 font-medium"
        >
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1 hover:text-amber-700 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Inicio</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
          <span className="font-bold text-stone-900 flex items-center gap-1">
            <span>{currentMeta.emoji}</span>
            <span>{selectedNivel}</span>
          </span>
        </nav>

        <button
          type="button"
          id="btn-back-to-home"
          onClick={onBackToHome}
          className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-200 shadow-2xs"
          title="Volver a la selección de cursos"
        >
          <Home className="w-3.5 h-3.5 text-amber-700" />
          <span>Volver a Cursos</span>
        </button>
      </div>

      {/* Grade Title Banner */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-3xl shadow-2xs shrink-0">
            {currentMeta.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                {selectedNivel}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                {currentMeta.edad}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5 max-w-xl">
              {currentMeta.subtitulo}
            </p>
          </div>
        </div>

        {onOpenOralLab && (
          <button
            type="button"
            onClick={onOpenOralLab}
            className="px-3.5 py-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-black inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <FaunaAvatar species="pudu" size="xs" mood="happy" />
            <span>Taller Oral con Pudú 🎙️</span>
          </button>
        )}
      </div>

      {/* 5 Main Subject Cards - Minimalist, Playful, and Clear */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black uppercase tracking-wider text-stone-400">
            Elige una Asignatura
          </span>
          <span className="text-xs text-stone-400 font-medium">
            5 asignaturas con sus guías de la fauna nativa chilena 🇨🇱
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. LENGUAJE */}
          <div
            id="banner-lenguaje"
            onClick={() => onSelectAsignatura('lenguaje')}
            className="group bg-gradient-to-b from-amber-50/70 to-white rounded-3xl border-2 border-amber-200 hover:border-amber-400 p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-sm relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-[11px] font-black shadow-2xs">
                    <FaunaAvatar species="llama" size="xs" mood="happy" />
                    <span>Llama 🦙</span>
                  </div>
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                    4 Unidades
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-black text-stone-900 group-hover:text-amber-700 transition-colors mb-2">
                Lenguaje y Comunicación
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                Lecturas oficiales, fábulas andinas, cuentos, separación de sílabas y preguntas guiadas por la <strong className="text-amber-900">Llama del Altiplano</strong>.
              </p>
            </div>

            <div className="pt-4 border-t border-amber-100 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900">Entrar a Lenguaje</span>
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-2xs group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 2. MATEMÁTICA */}
          <div
            id="banner-matematica"
            onClick={() => onSelectAsignatura('matematica')}
            className="group bg-gradient-to-b from-emerald-50/70 to-white rounded-3xl border-2 border-emerald-200 hover:border-emerald-400 p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-sm relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <Calculator className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-[11px] font-black shadow-2xs">
                    <FaunaAvatar species="pinguino" size="xs" mood="happy" />
                    <span>Pingüino 🐧</span>
                  </div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                    🧮 Calculadora
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-black text-stone-900 group-hover:text-emerald-700 transition-colors mb-2">
                Matemática
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                Resolución de problemas, repartos y calculadora explicada guiados por el <strong className="text-emerald-900">Pingüino de Humboldt</strong>.
              </p>
            </div>

            <div className="pt-4 border-t border-emerald-100 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900">Entrar a Matemática</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-2xs group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 3. HISTORIA */}
          <div
            id="banner-historia"
            onClick={() => onSelectAsignatura('historia')}
            className="group bg-gradient-to-b from-sky-50/70 to-white rounded-3xl border-2 border-sky-200 hover:border-sky-400 p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-sm relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-100/90 border border-sky-300 text-sky-900 text-[11px] font-black shadow-2xs">
                    <FaunaAvatar species="condor" size="xs" mood="happy" />
                    <span>Cóndor 🦅</span>
                  </div>
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                    4 Unidades
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-black text-stone-900 group-hover:text-sky-700 transition-colors mb-2">
                Historia y Geografía
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                Comunidad escolar, paisajes de Chile, pueblos originarios y ciudadanía guiados por el majestuoso <strong className="text-sky-900">Cóndor Andino</strong>.
              </p>
            </div>

            <div className="pt-4 border-t border-sky-100 flex items-center justify-between">
              <span className="text-xs font-bold text-sky-900">Entrar a Historia</span>
              <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-2xs group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 4. CIENCIAS NATURALES */}
          <div
            id="banner-ciencias"
            onClick={() => onSelectAsignatura('ciencias')}
            className="group bg-gradient-to-b from-teal-50/70 to-white rounded-3xl border-2 border-teal-200 hover:border-teal-400 p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-sm relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-700 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <FlaskConical className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-100/90 border border-teal-300 text-teal-950 text-[11px] font-black shadow-2xs">
                    <FaunaAvatar species="puma" size="xs" mood="happy" />
                    <span>Puma 🐆</span>
                  </div>
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                    4 Unidades
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-black text-stone-900 group-hover:text-teal-800 transition-colors mb-2">
                Ciencias Naturales
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                Seres vivos, cuerpo humano, hábitos saludables, materia y el universo guiados por el ágil <strong className="text-teal-900">Puma Chileno</strong>.
              </p>
            </div>

            <div className="pt-4 border-t border-teal-100 flex items-center justify-between">
              <span className="text-xs font-bold text-teal-900">Entrar a Ciencias</span>
              <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center shadow-2xs group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 5. INGLÉS */}
          <div
            id="banner-ingles"
            onClick={() => onSelectAsignatura('ingles')}
            className="group bg-gradient-to-b from-indigo-50/70 to-white rounded-3xl border-2 border-indigo-200 hover:border-indigo-400 p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-sm relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <Languages className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-100/90 border border-indigo-300 text-indigo-950 text-[11px] font-black shadow-2xs">
                    <FaunaAvatar species="rana" size="xs" mood="happy" />
                    <span>Rana Darwin 🐸</span>
                  </div>
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                    4 Unidades
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-black text-stone-900 group-hover:text-indigo-700 transition-colors mb-2">
                Inglés (English)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                Greetings, classroom words, animals, feelings, food and landscapes guiados por la simpática <strong className="text-indigo-900">Rana de Darwin</strong>.
              </p>
            </div>

            <div className="pt-4 border-t border-indigo-100 flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900">Entrar a Inglés</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-2xs group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
