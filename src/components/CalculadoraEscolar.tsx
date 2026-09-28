import React, { useState } from 'react';
import {
  X,
  Volume2,
  RotateCcw,
  Delete,
  Sparkles,
  Equal,
  HelpCircle,
  Lightbulb,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { speechReader } from '../utils/speechReader';
import { soundFx } from '../utils/soundEffects';
import { FaunaAvatar } from './FaunaAvatars';
import { MatematicaConcretaWidget } from './MatematicaConcretaWidget';

interface CalculadoraEscolarProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  selectedNivel?: string;
}

interface OperationExplanation {
  titulo: string;
  pasos: string;
  significadoPedagogico: string;
  visualGroups?: { count: number; itemsPerGroup: number; itemColor: string; remainder?: number };
}

export const CalculadoraEscolar: React.FC<CalculadoraEscolarProps> = ({
  isOpen,
  onClose,
  soundEnabled,
  selectedNivel = '1° Básico',
}) => {
  const [activeTab, setActiveTab] = useState<'calculadora' | 'concreto'>('calculadora');
  const [display, setDisplay] = useState<string>('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<'+' | '-' | '×' | '÷' | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);
  const [historyText, setHistoryText] = useState<string>('');
  const [explanation, setExplanation] = useState<OperationExplanation | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  if (!isOpen) return null;

  const playClick = () => {
    if (soundEnabled) soundFx.playPop();
  };

  const handleDigit = (digit: string) => {
    playClick();
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleClear = () => {
    playClick();
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setHistoryText('');
    setExplanation(null);
    speechReader.stop();
    setIsSpeaking(false);
  };

  const handleBackspace = () => {
    playClick();
    if (waitingForSecondOperand) return;
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const explainCalculation = (a: number, op: '+' | '-' | '×' | '÷', b: number, res: number): OperationExplanation => {
    switch (op) {
      case '+': {
        const decenas = Math.floor(res / 10);
        const unidades = res % 10;
        const descomponer = res >= 10 ? ` Formas ${decenas} decena(s) y ${unidades} unidad(es).` : '';
        return {
          titulo: `Suma: Juntar cantidades (${a} + ${b})`,
          pasos: `Tienes un primer grupo de ${a} y agregas ${b} más. En total obtienes ${res}.${descomponer}`,
          significadoPedagogico: `La suma representa unir o juntar dos colecciones de objetos.`,
          visualGroups: {
            count: 2,
            itemsPerGroup: Math.min(a, 12),
            itemColor: 'bg-emerald-500',
          },
        };
      }
      case '-': {
        return {
          titulo: `Resta: Quitar o comparar (${a} - ${b})`,
          pasos: `Empiezas con ${a} objetos y quitas ${b}. Te quedan ${res} unidades. También significa: ¿cuánto le falta a ${b} para llegar a ${a}? Faltan ${res}.`,
          significadoPedagogico: `La resta modela situaciones de quitar, retroceder o encontrar la diferencia.`,
          visualGroups: {
            count: 1,
            itemsPerGroup: Math.min(a, 15),
            itemColor: 'bg-orange-500',
          },
        };
      }
      case '×': {
        const sumasRepetidas = Array(Math.min(a, 6)).fill(b).join(' + ');
        const textoSumas = a <= 6 ? ` Es lo mismo que sumar repetido: ${sumasRepetidas} = ${res}.` : '';
        return {
          titulo: `Multiplicación: Grupos iguales (${a} × ${b})`,
          pasos: `Significa "${a} veces ${b}". Tienes ${a} cajitas o grupos, y en cada uno hay ${b} cosas.${textoSumas}`,
          significadoPedagogico: `La multiplicación es una suma iterada abreviada de grupos con igual cantidad.`,
          visualGroups: {
            count: Math.min(a, 6),
            itemsPerGroup: Math.min(b, 6),
            itemColor: 'bg-sky-500',
          },
        };
      }
      case '÷': {
        if (b === 0) {
          return {
            titulo: `¡Cuidado! División entre Cero`,
            pasos: `En matemáticas no es posible repartir objetos en 0 grupos. ¡Siempre debemos tener al menos 1 grupo!`,
            significadoPedagogico: `La división entre 0 no está definida.`,
          };
        }
        const cociente = Math.floor(a / b);
        const resto = a % b;
        const textoResto = resto === 0
          ? `¡Es un reparto exacto sin que sobre nada!`
          : `A cada uno le tocan ${cociente} y sobran ${resto} (resto).`;

        return {
          titulo: `División: Repartir equitativamente (${a} ÷ ${b})`,
          pasos: `Repartes ${a} cosas en ${b} partes iguales. A cada parte le corresponden ${cociente}.${textoResto}`,
          significadoPedagogico: `La división modela el reparto en partes iguales y la formación de grupos.`,
          visualGroups: {
            count: Math.min(b, 6),
            itemsPerGroup: Math.min(cociente, 6),
            remainder: resto,
            itemColor: 'bg-purple-500',
          },
        };
      }
    }
  };

  const handleOperator = (nextOp: '+' | '-' | '×' | '÷') => {
    playClick();
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
      setHistoryText(`${display} ${nextOp}`);
    } else if (operator) {
      const current = prevValue;
      let result = 0;
      if (operator === '+') result = current + inputValue;
      else if (operator === '-') result = current - inputValue;
      else if (operator === '×') result = current * inputValue;
      else if (operator === '÷') result = inputValue === 0 ? 0 : current / inputValue;

      setPrevValue(result);
      setDisplay(String(result));
      setHistoryText(`${result} ${nextOp}`);

      const expl = explainCalculation(current, operator, inputValue, result);
      setExplanation(expl);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOp);
  };

  const handleEqual = () => {
    if (operator === null || prevValue === null) return;
    const inputValue = parseFloat(display);
    let result = 0;

    if (operator === '+') result = prevValue + inputValue;
    else if (operator === '-') result = prevValue - inputValue;
    else if (operator === '×') result = prevValue * inputValue;
    else if (operator === '÷') {
      if (inputValue === 0) {
        setDisplay('Error');
        setExplanation(explainCalculation(prevValue, '÷', 0, 0));
        setPrevValue(null);
        setOperator(null);
        setWaitingForSecondOperand(true);
        if (soundEnabled) soundFx.playIncorrect();
        return;
      }
      result = prevValue / inputValue;
      // If decimal, round to 2 decimals for kids
      result = Math.round(result * 100) / 100;
    }

    if (soundEnabled) soundFx.playCorrect();
    const finalHistory = `${prevValue} ${operator} ${inputValue} =`;
    setHistoryText(finalHistory);
    setDisplay(String(result));

    const expl = explainCalculation(prevValue, operator, inputValue, result);
    setExplanation(expl);

    setPrevValue(null);
    setOperator(null);
    setWaitingForSecondOperand(true);
  };

  const handleSpeakExplanation = () => {
    if (!explanation) return;
    if (isSpeaking) {
      speechReader.stop();
      setIsSpeaking(false);
    } else {
      const speechText = `${explanation.titulo}. ${explanation.pasos} ${explanation.significadoPedagogico}`;
      speechReader.speak(speechText, {
        rate: 0.85,
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    }
  };

  // Quick Preset buttons for kids
  const quickPresets = [
    { label: '5 + 5 (Decena)', a: 5, op: '+' as const, b: 5 },
    { label: '10 - 4 (Resta)', a: 10, op: '-' as const, b: 4 },
    { label: '3 × 4 (Tabla)', a: 3, op: '×' as const, b: 4 },
    { label: '12 ÷ 3 (Reparto)', a: 12, op: '÷' as const, b: 3 },
  ];

  const applyPreset = (preset: typeof quickPresets[0]) => {
    playClick();
    setPrevValue(preset.a);
    setOperator(preset.op);
    setHistoryText(`${preset.a} ${preset.op}`);
    setDisplay(String(preset.b));
    setWaitingForSecondOperand(false);

    let res = 0;
    if (preset.op === '+') res = preset.a + preset.b;
    if (preset.op === '-') res = preset.a - preset.b;
    if (preset.op === '×') res = preset.a * preset.b;
    if (preset.op === '÷') res = preset.a / preset.b;

    setTimeout(() => {
      setHistoryText(`${preset.a} ${preset.op} ${preset.b} =`);
      setDisplay(String(res));
      setExplanation(explainCalculation(preset.a, preset.op, preset.b, res));
      setWaitingForSecondOperand(true);
      setPrevValue(null);
      setOperator(null);
    }, 150);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: Clean, Kid-friendly */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center p-0.5 shadow-xs shrink-0">
              <FaunaAvatar species="pinguino" size="xs" mood="happy" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-base text-white leading-none">
                  Calculadora Escolar Explicada
                </h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-stone-950">
                  {selectedNivel}
                </span>
              </div>
              <p className="text-xs text-emerald-100 font-medium mt-0.5">
                Con tu guía el Pingüino de Humboldt 🐧 • Paso a paso pedagógico
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
            title="Cerrar calculadora"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 p-2 bg-emerald-50 border-b border-emerald-100">
          <button
            type="button"
            onClick={() => {
              playClick();
              setActiveTab('calculadora');
            }}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'calculadora'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-emerald-950 border border-emerald-200'
            }`}
          >
            <span>🧮 Calculadora Explicada</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playClick();
              setActiveTab('concreto');
            }}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'concreto'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-emerald-950 border border-emerald-200'
            }`}
          >
            <span>🍎 Material Concreto (COPISI)</span>
          </button>
        </div>

        {activeTab === 'concreto' ? (
          <div className="p-3 sm:p-4 overflow-y-auto">
            <MatematicaConcretaWidget soundEnabled={soundEnabled} />
          </div>
        ) : (
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Quick Examples Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-bold text-stone-500 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Probar:
            </span>
            {quickPresets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPreset(p)}
                className="px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-200 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Calculator Screen / Display */}
          <div className="bg-stone-900 rounded-2xl p-4 text-right shadow-inner border border-stone-800 space-y-1">
            <div className="text-xs font-mono text-emerald-400 min-h-[16px] tracking-wider">
              {historyText || (operator ? `${prevValue} ${operator}` : ' ')}
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight truncate">
              {display}
            </div>
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-4 gap-2.5">
            {/* Row 1 */}
            <button
              type="button"
              onClick={handleClear}
              className="py-3 rounded-2xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-black text-sm transition-all active:scale-95 cursor-pointer border border-rose-200 shadow-2xs"
            >
              C
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              className="py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-black text-sm transition-all active:scale-95 cursor-pointer border border-stone-200 shadow-2xs flex items-center justify-center"
              title="Borrar último dígito"
            >
              <Delete className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleOperator('÷')}
              className={`py-3 rounded-2xl font-black text-lg transition-all active:scale-95 cursor-pointer border shadow-2xs ${
                operator === '÷'
                  ? 'bg-purple-700 text-white border-purple-800'
                  : 'bg-purple-100 hover:bg-purple-200 text-purple-900 border-purple-200'
              }`}
              title="Dividir / Repartir en partes iguales"
            >
              ÷
            </button>
            <button
              type="button"
              onClick={() => handleOperator('×')}
              className={`py-3 rounded-2xl font-black text-lg transition-all active:scale-95 cursor-pointer border shadow-2xs ${
                operator === '×'
                  ? 'bg-sky-700 text-white border-sky-800'
                  : 'bg-sky-100 hover:bg-sky-200 text-sky-900 border-sky-200'
              }`}
              title="Multiplicar / Grupos iguales"
            >
              ×
            </button>

            {/* Row 2 */}
            <button
              type="button"
              onClick={() => handleDigit('7')}
              className="py-3 rounded-2xl bg-stone-50 hover:bg-stone-100 text-stone-900 font-black text-lg border border-stone-200/80 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              7
            </button>
            <button
              type="button"
              onClick={() => handleDigit('8')}
              className="py-3 rounded-2xl bg-stone-50 hover:bg-stone-100 text-stone-900 font-black text-lg border border-stone-200/80 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              8
            </button>
            <button
              type="button"
              onClick={() => handleDigit('9')}
              className="py-3 rounded-2xl bg-stone-50 hover:bg-stone-100 text-stone-900 font-black text-lg border border-stone-200/80 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              9
            </button>
            <button
              type="button"
              onClick={() => handleOperator('-')}
              className={`py-3 rounded-2xl font-black text-lg transition-all active:scale-95 cursor-pointer border shadow-2xs ${
                operator === '-'
                  ? 'bg-orange-600 text-white border-orange-700'
                  : 'bg-orange-100 hover:bg-orange-200 text-orange-900 border-orange-200'
              }`}
              title="Restar / Quitar o hallar diferencia"
            >
              -
            </button>

            {/* Row 3 */}
            <button
              type="button"
              onClick={() => handleDigit('4')}
              className="py-3 rounded-2xl bg-stone-50 hover:bg-stone-100 text-stone-900 font-black text-lg border border-stone-200/80 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              4
            </button>
            <button
              type="button"
              onClick={() => handleDigit('5')}
              className="py-3 rounded-2xl bg-stone-50 hover:bg-stone-100 text-stone-900 font-black text-lg border border-stone-200/80 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              5
            </button>
            <button
              type="button"
              onClick={() => handleDigit('6')}
              className="py-3 rounded-2xl bg-stone-50 hover:bg-stone-100 text-stone-900 font-black text-lg border border-stone-200/80 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              6
            </button>
            <button
              type="button"
              onClick={() => handleOperator('+')}
              className={`py-3 rounded-2xl font-black text-lg transition-all active:scale-95 cursor-pointer border shadow-2xs ${
                operator === '+'
                  ? 'bg-emerald-700 text-white border-emerald-800'
                  : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-emerald-200'
              }`}
              title="Sumar / Juntar o agregar"
            >
              +
            </button>

            {/* Row 4 */}
            <button
              type="button"
              onClick={() => handleDigit('1')}
              className="py-3 rounded-2xl bg-stone-50 hover:bg-stone-100 text-stone-900 font-black text-lg border border-stone-200/80 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              1
            </button>
            <button
              type="button"
              onClick={() => handleDigit('2')}
              className="py-3 rounded-2xl bg-stone-50 hover:bg-stone-100 text-stone-900 font-black text-lg border border-stone-200/80 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              2
            </button>
            <button
              type="button"
              onClick={() => handleDigit('3')}
              className="py-3 rounded-2xl bg-stone-50 hover:bg-stone-100 text-stone-900 font-black text-lg border border-stone-200/80 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              3
            </button>
            <button
              type="button"
              onClick={handleEqual}
              className="row-span-2 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-2xl transition-all active:scale-95 cursor-pointer shadow-xs border border-amber-400 flex items-center justify-center"
              title="Calcular resultado"
            >
              =
            </button>

            {/* Row 5 */}
            <button
              type="button"
              onClick={() => handleDigit('0')}
              className="col-span-2 py-3 rounded-2xl bg-stone-50 hover:bg-stone-100 text-stone-900 font-black text-lg border border-stone-200/80 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              0
            </button>
            <button
              type="button"
              onClick={() => {
                if (!display.includes('.')) {
                  handleDigit('.');
                }
              }}
              className="py-3 rounded-2xl bg-stone-50 hover:bg-stone-100 text-stone-900 font-black text-lg border border-stone-200/80 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              .
            </button>
          </div>

          {/* Step-by-Step Educational Explanation ("Explicadita") */}
          {explanation ? (
            <div className="bg-gradient-to-br from-amber-50/80 to-emerald-50/40 rounded-2xl border border-amber-200 p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FaunaAvatar species="pinguino" size="xs" mood={isSpeaking ? 'speaking' : 'happy'} />
                  <div>
                    <span className="text-xs font-black text-stone-900 block leading-tight">
                      {explanation.titulo}
                    </span>
                    <span className="text-[10px] text-teal-800 font-bold">
                      Pingüino de Humboldt te explica
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSpeakExplanation}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer border ${
                    isSpeaking
                      ? 'bg-red-600 text-white border-red-700 animate-pulse'
                      : 'bg-white hover:bg-amber-100 text-amber-900 border-amber-300'
                  }`}
                  title="Escuchar explicación en voz alta"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isSpeaking ? 'Detener' : 'Escuchar 🔊'}</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                {explanation.pasos}
              </p>

              {/* Concrete visual representation (dots/groups) */}
              {explanation.visualGroups && (
                <div className="pt-2 border-t border-amber-200/60">
                  <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 block mb-1.5">
                    Representación concreta (COPISI):
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {Array.from({ length: explanation.visualGroups.count }).map((_, gIdx) => (
                      <div
                        key={gIdx}
                        className="bg-white/90 border border-stone-200 rounded-xl px-2 py-1.5 flex items-center gap-1 shadow-2xs"
                      >
                        <span className="text-[10px] font-bold text-stone-400 mr-0.5">
                          G{gIdx + 1}:
                        </span>
                        {Array.from({ length: explanation.visualGroups!.itemsPerGroup }).map((_, iIdx) => (
                          <span
                            key={iIdx}
                            className={`w-2.5 h-2.5 rounded-full ${explanation.visualGroups!.itemColor} inline-block`}
                          />
                        ))}
                      </div>
                    ))}
                    {explanation.visualGroups.remainder !== undefined && explanation.visualGroups.remainder > 0 && (
                      <div className="bg-rose-50 border border-rose-200 rounded-xl px-2 py-1.5 flex items-center gap-1 text-[10px] font-bold text-rose-800">
                        <span>Resto:</span>
                        {Array.from({ length: explanation.visualGroups.remainder }).map((_, rIdx) => (
                          <span key={rIdx} className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="text-[11px] text-stone-500 italic flex items-center gap-1 pt-1">
                <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
                <span>{explanation.significadoPedagogico}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-2 text-xs text-stone-400 font-medium">
              💡 Realiza cualquier operación para ver su explicación paso a paso con grupos y voz.
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  );
};
