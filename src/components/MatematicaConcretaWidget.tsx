import React, { useState } from 'react';
import { Calculator, Plus, Minus, Equal, RotateCcw, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { speechReader } from '../utils/speechReader';
import { soundFx } from '../utils/soundEffects';

interface MatematicaConcretaWidgetProps {
  soundEnabled: boolean;
}

export const MatematicaConcretaWidget: React.FC<MatematicaConcretaWidgetProps> = ({ soundEnabled }) => {
  const [numA, setNumA] = useState<number>(4);
  const [numB, setNumB] = useState<number>(3);
  const [operacion, setOperacion] = useState<'+' | '-'>('+');

  const resultado = operacion === '+' ? numA + numB : Math.max(0, numA - numB);

  const presets = [
    { label: '4 + 3 (Manzanas)', a: 4, b: 3, op: '+' as const, desc: '4 manzanas rojas + 3 manzanas verdes = 7' },
    { label: '6 - 2 (Pájaros)', a: 6, b: 2, op: '-' as const, desc: '6 pájaros en la rama - 2 que vuelan = 4' },
    { label: '5 + 5 (Decena)', a: 5, b: 5, op: '+' as const, desc: '5 lápices + 5 lápices = 10 lápices' },
    { label: '7 - 3 (Galletas)', a: 7, b: 3, op: '-' as const, desc: '7 galletas en el plato - 3 comidas = 4' },
    { label: '2 + 6 (Juguetes)', a: 2, b: 6, op: '+' as const, desc: '2 autitos + 6 autitos = 8 en total' },
  ];

  const handleSpeakEquation = () => {
    if (soundEnabled) soundFx.playPop();
    const textoVoz =
      operacion === '+'
        ? `${numA} más ${numB} es igual a ${resultado}.`
        : `${numA} menos ${numB} es igual a ${resultado}.`;

    speechReader.speak(textoVoz, { rate: 0.85 });
  };

  const handleSelectPreset = (p: typeof presets[0]) => {
    setNumA(p.a);
    setNumB(p.b);
    setOperacion(p.op);
    if (soundEnabled) soundFx.playCorrect();
    speechReader.speak(`${p.desc}.`, { rate: 0.85 });
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 rounded-2xl border-2 border-emerald-300/80 p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-black text-stone-900">
                Material Concreto y Pictórico (COPISI • 1° Básico)
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-900 border border-emerald-300/60 uppercase">
                Sumas y Restas de 1 Dígito
              </span>
            </div>
            <p className="text-xs text-stone-600">
              Manipula los números del 0 al 10 para ver la cantidad de elementos agrupados o quitados.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSpeakEquation}
          className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs inline-flex items-center gap-2 transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
          title="Escuchar la operación en voz alta"
        >
          <Volume2 className="w-4 h-4" />
          <span>Escuchar Operación</span>
        </button>
      </div>

      {/* Ejemplos rápidos de 1° Básico */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="font-bold text-stone-600 text-xs shrink-0 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Ejemplos típicos:</span>
        </span>
        {presets.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSelectPreset(p)}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-200 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 shadow-2xs"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Panel interactivo de la operación */}
      <div className="bg-white rounded-xl border border-emerald-200 p-4 shadow-2xs flex flex-col md:flex-row items-center justify-around gap-4">
        {/* Número A */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-bold uppercase text-stone-500">Primer Grupo</span>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => {
                  setNumA(val);
                  if (soundEnabled) soundFx.playPop();
                }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-black text-xs sm:text-sm transition-all cursor-pointer ${
                  numA === val
                    ? 'bg-emerald-700 text-white shadow-xs scale-105'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
          {/* Elementos concretos del grupo A */}
          <div className="flex flex-wrap items-center justify-center gap-1 max-w-[140px] min-h-[36px] p-1.5 bg-emerald-50/60 rounded-lg border border-emerald-200/60">
            {Array.from({ length: numA }).map((_, i) => (
              <span
                key={i}
                className="w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[10px] flex items-center justify-center shadow-2xs animate-in zoom-in-50 duration-150"
                title={`Elemento ${i + 1}`}
              >
                ●
              </span>
            ))}
            {numA === 0 && <span className="text-[11px] text-stone-400 italic">0 elementos</span>}
          </div>
        </div>

        {/* Signo de Operación */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <span className="text-xs font-bold uppercase text-stone-500">Acción</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setOperacion('+');
                if (soundEnabled) soundFx.playPop();
              }}
              className={`p-2.5 rounded-xl font-black text-sm transition-all cursor-pointer inline-flex items-center gap-1 ${
                operacion === '+'
                  ? 'bg-emerald-700 text-white shadow-xs scale-105'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
              title="Sumar (Juntar o agregar)"
            >
              <Plus className="w-4 h-4" />
              <span className="text-xs">Juntar (+)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setOperacion('-');
                if (numA < numB) setNumB(numA); // asegurar que no de negativo en 1° básico
                if (soundEnabled) soundFx.playPop();
              }}
              className={`p-2.5 rounded-xl font-black text-sm transition-all cursor-pointer inline-flex items-center gap-1 ${
                operacion === '-'
                  ? 'bg-amber-600 text-white shadow-xs scale-105'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
              title="Restar (Quitar o separar)"
            >
              <Minus className="w-4 h-4" />
              <span className="text-xs">Quitar (-)</span>
            </button>
          </div>
        </div>

        {/* Número B */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-bold uppercase text-stone-500">
            {operacion === '+' ? 'Segundo Grupo' : 'Cantidad a Quitar'}
          </span>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => {
              const disabled = operacion === '-' && val > numA;
              return (
                <button
                  key={val}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    setNumB(val);
                    if (soundEnabled) soundFx.playPop();
                  }}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-black text-xs sm:text-sm transition-all cursor-pointer ${
                    disabled
                      ? 'opacity-30 cursor-not-allowed bg-stone-100 text-stone-400'
                      : numB === val
                      ? 'bg-emerald-700 text-white shadow-xs scale-105'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                  title={disabled ? 'En 1° Básico no restamos números mayores al primero' : undefined}
                >
                  {val}
                </button>
              );
            })}
          </div>
          {/* Elementos concretos del grupo B */}
          <div className="flex flex-wrap items-center justify-center gap-1 max-w-[140px] min-h-[36px] p-1.5 bg-amber-50/60 rounded-lg border border-amber-200/60">
            {Array.from({ length: numB }).map((_, i) => (
              <span
                key={i}
                className="w-5 h-5 rounded-full bg-amber-600 text-white font-black text-[10px] flex items-center justify-center shadow-2xs animate-in zoom-in-50 duration-150"
                title={`Elemento ${i + 1}`}
              >
                ●
              </span>
            ))}
            {numB === 0 && <span className="text-[11px] text-stone-400 italic">0 elementos</span>}
          </div>
        </div>

        {/* Igual y Resultado Final */}
        <div className="flex flex-col items-center gap-2 pl-2 border-t md:border-t-0 md:border-l border-stone-200 pt-3 md:pt-0">
          <span className="text-xs font-bold uppercase text-stone-500">Resultado</span>
          <div className="flex items-center gap-2.5">
            <Equal className="w-5 h-5 text-stone-400" />
            <div className="px-4 py-2 rounded-xl bg-emerald-100 border-2 border-emerald-400 text-emerald-950 font-black text-2xl shadow-xs">
              {resultado}
            </div>
          </div>
          {/* Fichas totales */}
          <div className="flex flex-wrap items-center justify-center gap-1 max-w-[160px] min-h-[36px] p-1.5 bg-emerald-50 rounded-lg border border-emerald-300">
            {Array.from({ length: resultado }).map((_, i) => (
              <span
                key={i}
                className="w-5 h-5 rounded-full bg-emerald-700 text-white font-black text-[10px] flex items-center justify-center shadow-2xs"
              >
                ★
              </span>
            ))}
            {resultado === 0 && <span className="text-[11px] text-stone-400 italic">Cero elementos</span>}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-stone-600 px-1 pt-1">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>
            {operacion === '+'
              ? `Juntamos ${numA} y ${numB} elementos, obteniendo un total de ${resultado}.`
              : `Teníamos ${numA} elementos y quitamos ${numB}, quedando ${resultado}.`}
          </span>
        </span>
        <span className="text-stone-500 font-semibold hidden sm:inline">
          {resultado === 10 ? '¡Formamos una decena completa (10)!' : `Ámbito: ${resultado} de 10`}
        </span>
      </div>
    </div>
  );
};
