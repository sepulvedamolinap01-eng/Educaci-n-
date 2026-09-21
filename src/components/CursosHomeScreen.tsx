import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Award,
  Mic,
  BookOpen,
  Calculator,
  Compass,
  FlaskConical,
  Languages,
} from 'lucide-react';

interface CursosHomeScreenProps {
  onSelectCourse: (nivel: string) => void;
  onOpenCurriculumModal: () => void;
  onOpenOralLab?: () => void;
  soundEnabled?: boolean;
}

interface CourseCardData {
  nivel: string;
  edad: string;
  emoji: string;
  resumen: string;
  colorBorder: string;
  colorBg: string;
  colorBadge: string;
  colorButton: string;
}

const COURSES: CourseCardData[] = [
  {
    nivel: '1° Básico',
    edad: '6 - 7 años',
    emoji: '🎒',
    resumen: 'Lectura inicial, sumas y restas con material concreto, cuerpo humano, seres vivos e inglés básico.',
    colorBorder: 'border-amber-200 hover:border-amber-400',
    colorBg: 'bg-amber-50/40 hover:bg-amber-50/70',
    colorBadge: 'bg-amber-100 text-amber-900 border-amber-200',
    colorButton: 'bg-amber-600 hover:bg-amber-700 text-white',
  },
  {
    nivel: '2° Básico',
    edad: '7 - 8 años',
    emoji: '🌱',
    resumen: 'Fluidez lectora, números hasta el 100, hábitats de animales, pueblos originarios y vocabulario en inglés.',
    colorBorder: 'border-emerald-200 hover:border-emerald-400',
    colorBg: 'bg-emerald-50/40 hover:bg-emerald-50/70',
    colorBadge: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    colorButton: 'bg-emerald-600 hover:bg-emerald-700 text-white',
  },
  {
    nivel: '3° Básico',
    edad: '8 - 9 años',
    emoji: '🔭',
    resumen: 'Mitos y fábulas, multiplicación y fracciones, sistema solar, civilizaciones clásicas y diálogos en inglés.',
    colorBorder: 'border-sky-200 hover:border-sky-400',
    colorBg: 'bg-sky-50/40 hover:bg-sky-50/70',
    colorBadge: 'bg-sky-100 text-sky-900 border-sky-200',
    colorButton: 'bg-sky-600 hover:bg-sky-700 text-white',
  },
  {
    nivel: '4° Básico',
    edad: '9 - 10 años',
    emoji: '🎭',
    resumen: 'Comprensión crítica, cálculo de área y decimales, ecosistemas, civilizaciones americanas y rutinas en inglés.',
    colorBorder: 'border-purple-200 hover:border-purple-400',
    colorBg: 'bg-purple-50/40 hover:bg-purple-50/70',
    colorBadge: 'bg-purple-100 text-purple-900 border-purple-200',
    colorButton: 'bg-purple-600 hover:bg-purple-700 text-white',
  },
];

export const CursosHomeScreen: React.FC<CursosHomeScreenProps> = ({
  onSelectCourse,
  onOpenCurriculumModal,
  onOpenOralLab,
  soundEnabled = true,
}) => {
  return (
    <div className="space-y-6">
      {/* Clean Minimalist Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100/80 text-amber-900 text-[11px] font-black uppercase tracking-wider mb-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Currículum Nacional Mineduc de Chile</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            Selecciona tu curso
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            1° a 4° Básico • Lenguaje, Matemática, Historia, Ciencias e Inglés con guías de fauna chilena
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onOpenOralLab && (
            <button
              type="button"
              id="btn-taller-oral-shortcut"
              onClick={onOpenOralLab}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Taller de Expresión Oral y Lectura en Voz Alta"
            >
              <Mic className="w-3.5 h-3.5 text-emerald-600" />
              <span>Taller Oral 🎙️</span>
            </button>
          )}

          <button
            type="button"
            id="btn-ver-matriz-oas"
            onClick={onOpenCurriculumModal}
            className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-200/80"
            title="Ver Objetivos de Aprendizaje Mineduc"
          >
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Ver OAs Mineduc</span>
          </button>
        </div>
      </div>

      {/* Grid of 4 Grade Tiles - Minimalist, Tactile and Clean */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black uppercase tracking-wider text-stone-400">
            Niveles Escolares
          </span>
          <span className="text-xs text-stone-400 font-medium">5 Asignaturas Oficiales</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {COURSES.map((course) => (
            <div
              key={course.nivel}
              id={`card-curso-${course.nivel.replace('° ', '-').toLowerCase()}`}
              onClick={() => onSelectCourse(course.nivel)}
              className={`group ${course.colorBg} rounded-3xl border-2 ${course.colorBorder} p-5 sm:p-6 transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-sm flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200/80 flex items-center justify-center text-2xl shadow-2xs group-hover:scale-110 transition-transform">
                      {course.emoji}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-stone-900 leading-none">
                        {course.nivel}
                      </h4>
                      <span className="text-xs font-bold text-stone-500 mt-1 inline-block">
                        {course.edad}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${course.colorBadge}`}>
                    Mineduc
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  {course.resumen}
                </p>

                {/* 5 Subject Badges with Native Chilean Animals */}
                <div className="flex items-center gap-1.5 mb-4 text-xs font-semibold text-stone-600 flex-wrap">
                  <span className="inline-flex items-center gap-1 bg-white/90 px-2 py-0.5 rounded-lg border border-stone-200/80 text-[11px]">
                    <BookOpen className="w-3 h-3 text-amber-600" />
                    Lenguaje 🦙
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white/90 px-2 py-0.5 rounded-lg border border-stone-200/80 text-[11px]">
                    <Calculator className="w-3 h-3 text-emerald-600" />
                    Matemática 🐧
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white/90 px-2 py-0.5 rounded-lg border border-stone-200/80 text-[11px]">
                    <Compass className="w-3 h-3 text-sky-600" />
                    Historia 🦅
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white/90 px-2 py-0.5 rounded-lg border border-stone-200/80 text-[11px]">
                    <FlaskConical className="w-3 h-3 text-teal-700" />
                    Ciencias 🐆
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white/90 px-2 py-0.5 rounded-lg border border-stone-200/80 text-[11px]">
                    <Languages className="w-3 h-3 text-indigo-600" />
                    Inglés 🐸
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between">
                <span className="text-xs font-bold text-stone-500 group-hover:text-stone-900 transition-colors">
                  Ver asignaturas y unidades
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCourse(course.nivel);
                  }}
                  className={`px-4 py-2 rounded-xl ${course.colorButton} text-xs font-black inline-flex items-center gap-1.5 transition-all shadow-2xs group-hover:translate-x-0.5 cursor-pointer`}
                >
                  <span>Entrar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
