import { MineducQuizResult, QuestionItem, QuestionOption } from '../types';

type OptionKey = 'A' | 'B' | 'C' | 'D';

// Banco de alternativas distractoras inteligentes y verosímiles según temática
const SMART_DISTRACTORS_LENGUAJE: string[] = [
  'Ocurrió de manera imprevista durante el transcurso de la tarde',
  'Para entusiasmar y convencer a los demás personajes de la historia',
  'Porque las condiciones del entorno se transformaron rápidamente',
  'Demuestra la importancia de colaborar con paciencia y perseverancia',
  'A través de un relato transmitido oralmente de generación en generación',
  'Mediante la observación atenta de los fenómenos de la naturaleza',
  'Para resguardar las costumbres y memorias de la comunidad',
  'Porque deseaban emprender un viaje hacia un territorio desconocido',
];

const SMART_DISTRACTORS_HISTORIA: string[] = [
  'A través de un acuerdo alcanzado en el cabildo entre los vecinos',
  'Siguiendo las rutas comerciales trazadas a lo largo de la cordillera',
  'Para asegurar el bienestar, la justicia y la organización ciudadana',
  'Por la influencia del intercambio cultural entre distintas comunidades',
  'Para preservar los recursos naturales y las tradiciones locales',
  'Mediante el respeto a las leyes y las normas democráticas de convivencia',
];

const SMART_DISTRACTORS_MATEMATICA: string[] = [
  'Calculando la mitad del valor total registrado',
  'Sumando una decena adicional a la cantidad inicial',
  'Restando el valor obtenido al total general',
  'Multiplicando el resultado por la cantidad de participantes',
  'Estimando un valor aproximado según el patrón numérico',
];

/**
 * Genera un distractor plausible en caso de que falte la opción D
 */
function getSmartDistractor(
  pregunta: QuestionItem,
  existingTexts: string[],
  asignaturaHint: string
): string {
  // Intentar generar distractor numérico si las opciones son números
  const numericValues = existingTexts
    .map((t) => {
      const match = t.match(/\b\d+\b/);
      return match ? parseInt(match[0], 10) : null;
    })
    .filter((n): n is number => n !== null);

  if (numericValues.length >= 2) {
    const maxVal = Math.max(...numericValues);
    const minVal = Math.min(...numericValues);
    const diff = maxVal - minVal;
    const candidate = maxVal + Math.max(1, Math.round(diff / 2));
    if (!existingTexts.some((t) => t.includes(String(candidate)))) {
      return `${candidate}`;
    }
  }

  // Distractores pedagógicos según asignatura
  const pool =
    asignaturaHint.includes('historia') || pregunta.enunciado.toLowerCase().includes('chile')
      ? SMART_DISTRACTORS_HISTORIA
      : asignaturaHint.includes('matemática') || pregunta.enunciado.toLowerCase().includes('cuánt')
      ? SMART_DISTRACTORS_MATEMATICA
      : SMART_DISTRACTORS_LENGUAJE;

  for (const item of pool) {
    if (!existingTexts.includes(item)) {
      return item;
    }
  }

  return 'Representa una opción alternativa planteada en el relato';
}

/**
 * Mezcla aleatoriamente las opciones de cada pregunta asegurando que la
 * respuesta correcta quede distribuida de manera variada e impredecible entre A, B, C y D.
 * 
 * - Evita categóricamente el patrón donde "todas son la A".
 * - Distribuye las respuestas correctas de forma balanceada (B, C, D, A).
 * - Garantiza que dos preguntas consecutivas no compartan la misma letra correcta.
 * - Incorpora 4 opciones (A, B, C, D) con distractores plausibles.
 * - Asigna un nivel de dificultad progresivo (Fácil, Intermedio, Desafío, Avanzado).
 */
export function randomizeQuizOptions(quiz: MineducQuizResult): MineducQuizResult {
  if (!quiz || !quiz.preguntas || quiz.preguntas.length === 0) {
    return quiz;
  }

  const isLevelWith4Options =
    quiz.nivel.includes('2°') ||
    quiz.nivel.includes('3°') ||
    quiz.nivel.includes('4°');

  const totalPreguntas = quiz.preguntas.length;

  // Generar secuencia balanceada de letras destino donde la respuesta correcta será ubicada.
  // Priorizamos B, C y D al inicio para romper el cliché de la letra A.
  const poolBase: OptionKey[] = isLevelWith4Options
    ? ['B', 'C', 'D', 'A']
    : ['B', 'C', 'A'];

  // Crear una secuencia sin repeticiones consecutivas
  const targetSequence: OptionKey[] = [];
  let lastKey: OptionKey | null = null;

  for (let i = 0; i < totalPreguntas; i++) {
    // Filtrar la última letra usada para que no haya dos consecutivas iguales
    const available = poolBase.filter((k) => k !== lastKey);
    // Elegir aleatoriamente entre las opciones disponibles
    const chosen = available[Math.floor(Math.random() * available.length)];
    targetSequence.push(chosen);
    lastKey = chosen;
  }

  const randomizedPreguntas: QuestionItem[] = quiz.preguntas.map((pregunta, idx) => {
    const rawOpciones = pregunta.opciones || ({} as QuestionOption);

    // 1. Identificar texto de la respuesta correcta original
    const originalCorrectKey = pregunta.respuesta_correcta || 'A';
    const correctText = (
      rawOpciones[originalCorrectKey] ||
      rawOpciones.A ||
      Object.values(rawOpciones)[0] ||
      ''
    ).trim();

    // 2. Extraer distractores existentes (sin la respuesta correcta)
    const existingKeys: OptionKey[] = (['A', 'B', 'C', 'D'] as const).filter(
      (k) => typeof rawOpciones[k] === 'string' && rawOpciones[k]!.trim().length > 0
    );

    const distractors: string[] = [];
    for (const key of existingKeys) {
      if (key !== originalCorrectKey) {
        const text = rawOpciones[key]!.trim();
        if (text && text !== correctText && !distractors.includes(text)) {
          distractors.push(text);
        }
      }
    }

    // 3. Si es de 2°, 3° o 4° Básico y solo tiene 2 distractores (3 opciones en total A, B, C),
    // agregar un 4to distractor inteligente (Opción D) para otorgar la dificultad adecuada
    if (isLevelWith4Options && distractors.length < 3) {
      const needed = 3 - distractors.length;
      for (let d = 0; d < needed; d++) {
        const newDistractor = getSmartDistractor(
          pregunta,
          [correctText, ...distractors],
          quiz.eje_tematico || quiz.unidad || ''
        );
        distractors.push(newDistractor);
      }
    }

    // Determinar las letras finales disponibles para esta pregunta
    const availableKeys: OptionKey[] =
      distractors.length >= 3
        ? ['A', 'B', 'C', 'D']
        : ['A', 'B', 'C'];

    // 4. Seleccionar la letra objetivo para la respuesta correcta
    let targetKey = targetSequence[idx];
    if (!availableKeys.includes(targetKey)) {
      targetKey = availableKeys[Math.floor(Math.random() * availableKeys.length)];
    }

    // 5. Barajar los distractores usando Fisher-Yates
    const shuffledDistractors = [...distractors];
    for (let i = shuffledDistractors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDistractors[i], shuffledDistractors[j]] = [
        shuffledDistractors[j],
        shuffledDistractors[i],
      ];
    }

    // 6. Asignar las opciones finales
    const newOpciones: QuestionOption = {
      A: '',
      B: '',
      C: '',
    };

    // Colocar la respuesta correcta en la posición objetivo asignada
    newOpciones[targetKey] = correctText;

    // Distribuir los distractores en las demás posiciones
    const remainingKeys = availableKeys.filter((k) => k !== targetKey);
    remainingKeys.forEach((key, dIdx) => {
      newOpciones[key] = shuffledDistractors[dIdx] || 'Opción alternativa';
    });

    // 7. Asignar dificultad gradual progresiva pedagógica
    let dificultad: 'Fácil' | 'Intermedio' | 'Desafío' | 'Avanzado' = 'Fácil';
    if (idx === 0) {
      dificultad = 'Fácil';
    } else if (idx === 1) {
      dificultad = 'Intermedio';
    } else if (idx === 2) {
      dificultad = 'Desafío';
    } else {
      dificultad = 'Avanzado';
    }

    return {
      ...pregunta,
      opciones: newOpciones,
      respuesta_correcta: targetKey,
      dificultad,
    };
  });

  return {
    ...quiz,
    preguntas: randomizedPreguntas,
  };
}
