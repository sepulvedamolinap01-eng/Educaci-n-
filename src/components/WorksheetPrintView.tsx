import React from 'react';
import { MineducQuizResult, AsignaturaType } from '../types';
import { Printer, ArrowLeft } from 'lucide-react';

interface WorksheetPrintViewProps {
  quizData: MineducQuizResult;
  text: string;
  onClose: () => void;
  asignatura?: AsignaturaType;
}

export const WorksheetPrintView: React.FC<WorksheetPrintViewProps> = ({
  quizData,
  text,
  onClose,
  asignatura = 'lenguaje',
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:static print:bg-white print:z-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 sm:p-10 text-stone-900 border border-stone-200 print:shadow-none print:border-none print:p-4 my-auto">
        {/* Print toolbar (hidden during actual paper print) */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200 print:hidden">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500">Formato para imprimir o fotocopiar</span>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Guía</span>
            </button>
          </div>
        </div>

        {/* Worksheet Header */}
        <div className="border-b-2 border-stone-800 pb-4 mb-5">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-stone-900 uppercase">
                {asignatura === 'historia'
                  ? 'GUÍA DE APRENDIZAJE • HISTORIA, GEOGRAFÍA Y CIENCIAS SOCIALES'
                  : asignatura === 'matematica'
                  ? 'GUÍA DE APRENDIZAJE • MATEMÁTICA'
                  : 'GUÍA DE COMPRENSIÓN LECTORA • LENGUAJE Y COMUNICACIÓN'}
              </h2>
              <div className="text-xs font-medium text-stone-600 mt-0.5">
                Currículum Nacional de Educación Básica • Mineduc Chile
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                {quizData.unidad && (
                  <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {quizData.unidad}
                  </span>
                )}
                {quizData.mes_estimado && (
                  <span className="font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                    Mes: {quizData.mes_estimado}
                  </span>
                )}
                {quizData.objetivos_aprendizaje && (
                  <span className="font-semibold text-stone-600">
                    OAs: {quizData.objetivos_aprendizaje.join(', ')}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 rounded-md text-xs font-bold bg-stone-100 border border-stone-300">
                {quizData.nivel || 'Educación Básica'}
              </span>
            </div>
          </div>

          {/* Student Fields */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
            <div className="col-span-2">
              <span className="font-semibold">Nombre: </span>
              <span className="inline-block border-b border-stone-400 w-3/4"></span>
            </div>
            <div>
              <span className="font-semibold">Curso: </span>
              <span className="inline-block border-b border-stone-400 w-1/2"></span>
            </div>
            <div>
              <span className="font-semibold">Fecha: </span>
              <span className="inline-block border-b border-stone-400 w-1/2"></span>
            </div>
          </div>
        </div>

        {/* Reading Text Excerpt */}
        <div className="mb-6 p-4 rounded-xl bg-stone-50 border border-stone-200">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
            {asignatura === 'matematica'
              ? 'Lee con atención la siguiente situación o problema:'
              : 'Lee con atención el siguiente fragmento:'}
          </div>
          <p className="text-sm text-stone-800 leading-relaxed font-serif whitespace-pre-wrap">
            {text}
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-5 mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-700">
            Responde marcando con una X la alternativa correcta:
          </div>

          {quizData.preguntas?.map((q, idx) => (
            <div key={q.id_pregunta} className="text-sm">
              <div className="font-bold text-stone-900 mb-2">
                {idx + 1}. {q.enunciado}
              </div>
              <div className="space-y-1.5 pl-3">
                {(['A', 'B', 'C', 'D'] as const)
                  .filter((letra) => !!q.opciones?.[letra])
                  .map((letra) => (
                    <div key={letra} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full border border-stone-500 inline-flex items-center justify-center text-xs font-bold text-stone-700">
                        {letra}
                      </span>
                      <span className="text-stone-800 text-xs sm:text-sm">{q.opciones[letra]}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer for teacher score */}
        <div className="pt-4 border-t border-dashed border-stone-300 flex justify-between items-center text-xs text-stone-500">
          <div>Puntaje obtenido: ____ / {quizData.preguntas?.length || 3} puntos</div>
          <div>Firma profesor/a: ____________________</div>
        </div>
      </div>
    </div>
  );
};
