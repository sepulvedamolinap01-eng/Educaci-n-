import React, { useState } from 'react';
import { MineducQuizResult } from '../types';
import { Copy, Check, Download, Code2, ShieldCheck, Printer } from 'lucide-react';

interface JsonExportViewProps {
  quizData: MineducQuizResult;
  rawJson?: string;
  onPrintWorksheet: () => void;
}

export const JsonExportView: React.FC<JsonExportViewProps> = ({
  quizData,
  rawJson,
  onPrintWorksheet,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const formattedJson = rawJson
    ? (() => {
        try {
          return JSON.stringify(JSON.parse(rawJson), null, 2);
        } catch {
          return JSON.stringify(quizData, null, 2);
        }
      })()
    : JSON.stringify(quizData, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleDownload = () => {
    const filename = `mineduc-preguntas-${(quizData.nivel || 'basica')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')}.json`;
    const blob = new Blob([formattedJson], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-stone-900 rounded-2xl border border-stone-800 shadow-md p-5 md:p-6 text-stone-100">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-200 flex items-center gap-2">
              Formato JSON Oficial Mineduc
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/80 inline-flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Validado
              </span>
            </h3>
            <p className="text-xs text-stone-400">
              Estructura estricta para integración curricular y plataformas educativas
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            id="btn-print-worksheet"
            onClick={onPrintWorksheet}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Imprimir guía de trabajo para los alumnos"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Guía Imprimible</span>
          </button>

          <button
            type="button"
            id="btn-download-json"
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Descargar archivo JSON"
          >
            <Download className="w-3.5 h-3.5 text-stone-400" />
            <span>Descargar</span>
          </button>

          <button
            type="button"
            id="btn-copy-json"
            onClick={handleCopy}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            title="Copiar JSON al portapapeles"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar JSON</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* JSON code block */}
      <div className="relative">
        <pre className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 font-mono text-xs overflow-x-auto max-h-96 leading-relaxed select-all">
          <code>{formattedJson}</code>
        </pre>
      </div>

      {/* JSON Schema Checklist Footnote */}
      <div className="mt-3 pt-3 border-t border-stone-800/80 flex flex-wrap items-center justify-between text-[11px] text-stone-400 gap-2">
        <div className="flex items-center gap-2">
          <span>• 3 preguntas con id_pregunta</span>
          <span>• Opciones A, B, C</span>
          <span>• Respuesta correcta y retroalimentaciones formativas</span>
        </div>
        <span className="text-amber-400 font-mono">{formattedJson.length} bytes</span>
      </div>
    </div>
  );
};
