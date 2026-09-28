/**
 * Evaluador fonético y de pronunciación para el Taller de Comunicación Oral.
 * Diseñado especialmente para español de Chile (seseo, yeísmo, b/v indiferenciada).
 * Aplica reglas estrictas de coincidencia fonética y distancia de Levenshtein,
 * distinguiendo con precisión palabras correctas, aproximaciones cercanas y palabras incorrectas/inexistentes.
 */

export interface SpeechEvaluationResult {
  status: 'correct' | 'close' | 'incorrect' | 'silence';
  score: number; // 0 to 1
  bestMatchWord: string;
  transcript: string;
  targetWord: string;
  message: string;
}

// Normalización de texto en español
export function normalizeSpanish(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Quita tildes
    .replace(/[^a-z0-9\s]/g, '') // Quita signos de puntuación y admiración
    .trim();
}

// Conversión fonética adaptada a Chile y Latinoamérica
// (Seseo: z/ce/ci -> s, Yeísmo: ll/y -> y, b/v -> b, h muda eliminada)
export function toChileanPhonetic(text: string): string {
  let s = normalizeSpanish(text);

  // Reemplazos fonéticos estándar
  s = s.replace(/h/g, ''); // hache muda
  s = s.replace(/v/g, 'b'); // b y v suenan igual
  s = s.replace(/z/g, 's'); // seseo chileno
  s = s.replace(/ce/g, 'se');
  s = s.replace(/ci/g, 'si');
  s = s.replace(/ll/g, 'y'); // yeísmo
  s = s.replace(/qu([ei])/g, 'k$1');
  s = s.replace(/c([aou])/g, 'k$1');
  s = s.replace(/x/g, 'ks');
  s = s.replace(/gu([ei])/g, 'g$1');

  // Reducir letras dobles repetidas (salvo 'rr')
  s = s.replace(/([^r])\1+/g, '$1');

  return s;
}

// Distancia de Levenshtein
export function levenshteinDistance(a: string, b: string): number {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) return bn;
  if (bn === 0) return an;

  const matrix = Array.from({ length: bn + 1 }, () => new Array(an + 1).fill(0));

  for (let i = 0; i <= an; i++) matrix[0][i] = i;
  for (let j = 0; j <= bn; j++) matrix[j][0] = j;

  for (let j = 1; j <= bn; j++) {
    for (let i = 1; i <= an; i++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[j][i] = matrix[j - 1][i - 1];
      } else {
        matrix[j][i] = Math.min(
          matrix[j - 1][i - 1] + 1, // sustitución
          matrix[j][i - 1] + 1,     // inserción
          matrix[j - 1][i] + 1      // eliminación
        );
      }
    }
  }

  return matrix[bn][an];
}

// Similitud entre dos cadenas de 0 (nada) a 1 (idénticas)
export function calculateSimilarity(a: string, b: string): number {
  const normA = normalizeSpanish(a);
  const normB = normalizeSpanish(b);

  if (normA === normB) return 1.0;
  if (!normA || !normB) return 0.0;

  // Comparación ortográfica normalizada
  const maxLen = Math.max(normA.length, normB.length);
  const dist = levenshteinDistance(normA, normB);
  const orthoScore = 1 - dist / maxLen;

  // Comparación fonética chilena
  const phA = toChileanPhonetic(a);
  const phB = toChileanPhonetic(b);
  const maxPhLen = Math.max(phA.length, phB.length);
  const phDist = levenshteinDistance(phA, phB);
  const phScore = maxPhLen > 0 ? 1 - phDist / maxPhLen : 0;

  // Si fonéticamente es idéntico (ej: "corazon" vs "corazón", "baca" vs "vaca") es 100%
  if (phA === phB) return 1.0;

  // Tolerancia pedagógica infantil: singular/plural (ej: "ostras" vs "ostra", "perros" vs "perro")
  if (
    (normA.endsWith('s') && normA.slice(0, -1) === normB) ||
    (normB.endsWith('s') && normB.slice(0, -1) === normA) ||
    (normA.endsWith('es') && normA.slice(0, -2) === normB) ||
    (normB.endsWith('es') && normB.slice(0, -2) === normA)
  ) {
    return 0.95;
  }

  // Tolerancia infantil a diminutivos cariñosos (ej: "gatito" vs "gato", "perrito" vs "perro")
  if (
    (normA.endsWith('ito') && normA.replace(/ito$/, 'o') === normB) ||
    (normA.endsWith('ita') && normA.replace(/ita$/, 'a') === normB)
  ) {
    return 0.92;
  }

  return Math.max(orthoScore, phScore);
}

// Palabras de relleno comunes en habla espontánea de niños
const FILLER_WORDS = new Set([
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
  'de', 'del', 'a', 'al', 'en', 'es', 'son', 'dice', 'palabra',
  'yo', 'tu', 'mi', 'me', 'se', 'que', 'con', 'para', 'por', 'y', 'o'
]);

/**
 * Evalúa estrictamente la pronunciación de un estudiante.
 * @param transcript Lo que el reconocimiento de voz capturó del micrófono
 * @param target Palabra u oración objetivo que el niño debía decir
 * @param phoneticHint Pista fonética opcional para guiar la corrección
 */
export function evaluateOralPronunciation(
  transcript: string,
  target: string,
  phoneticHint?: string
): SpeechEvaluationResult {
  const cleanTranscript = transcript.trim();
  if (!cleanTranscript) {
    return {
      status: 'silence',
      score: 0,
      bestMatchWord: '',
      transcript: '',
      targetWord: target,
      message: 'No alcanzamos a escuchar tu voz. Acércate un poquito al micrófono y vuelve a intentarlo.',
    };
  }

  const normTarget = normalizeSpanish(target);
  const isTargetPhrase = normTarget.includes(' ');

  // Si el objetivo es una frase completa (ej: "compartir en paz")
  if (isTargetPhrase) {
    const fullSim = calculateSimilarity(cleanTranscript, target);
    if (fullSim >= 0.80) {
      return {
        status: 'correct',
        score: fullSim,
        bestMatchWord: cleanTranscript,
        transcript: cleanTranscript,
        targetWord: target,
        message: `¡Extraordinario! Pronunciaste la frase con gran claridad y ritmo: «${target}».`,
      };
    } else if (fullSim >= 0.55) {
      return {
        status: 'close',
        score: fullSim,
        bestMatchWord: cleanTranscript,
        transcript: cleanTranscript,
        targetWord: target,
        message: `¡Casi! Escuchamos «${cleanTranscript}». La frase completa es «${target}». ¡Pruébalo otra vez!`,
      };
    } else {
      return {
        status: 'incorrect',
        score: fullSim,
        bestMatchWord: cleanTranscript,
        transcript: cleanTranscript,
        targetWord: target,
        message: `No está bien pronunciada. Escuchamos «${cleanTranscript}», pero la frase es «${target}». Escucha al profesor y repite con calma.`,
      };
    }
  }

  // Si el objetivo es una palabra individual (ej: "Ostra", "Perla", "Pingüino")
  // Separar lo que dijo el niño en palabras individuales y descartar palabras de relleno
  const spokenTokens = cleanTranscript
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0);

  let maxScore = 0;
  let bestCandidate = spokenTokens[0] || cleanTranscript;

  // 1. Evaluar si toda la frase hablada coincide directamente
  const wholeSim = calculateSimilarity(cleanTranscript, target);
  if (wholeSim > maxScore) {
    maxScore = wholeSim;
    bestCandidate = cleanTranscript;
  }

  // 2. Evaluar cada palabra dicha (por si dijo "la ostra", "es ostra", "creo que ostra")
  for (const token of spokenTokens) {
    const sim = calculateSimilarity(token, target);
    if (sim > maxScore) {
      maxScore = sim;
      bestCandidate = token;
    }
  }

  // 3. Evaluar palabras sin rellenos comunes
  const meaningfulTokens = spokenTokens.filter((w) => !FILLER_WORDS.has(normalizeSpanish(w)));
  if (meaningfulTokens.length === 1) {
    const singleSim = calculateSimilarity(meaningfulTokens[0], target);
    if (singleSim > maxScore) {
      maxScore = singleSim;
      bestCandidate = meaningfulTokens[0];
    }
  }

  // VERIFICACIÓN ESTRICTA:
  // - Correcto: score >= 0.85 (permite variaciones menores de captura de micrófono)
  // - Cercano: 0.55 <= score < 0.85 (estuvo cerca, pero falta precisión)
  // - Incorrecto: score < 0.55 (palabra diferente o inexistente como "cenisejo")
  if (maxScore >= 0.85) {
    return {
      status: 'correct',
      score: maxScore,
      bestMatchWord: bestCandidate,
      transcript: cleanTranscript,
      targetWord: target,
      message: `¡Excelente pronunciación! Dijiste «${target}» de forma muy clara y correcta.`,
    };
  } else if (maxScore >= 0.55) {
    return {
      status: 'close',
      score: maxScore,
      bestMatchWord: bestCandidate,
      transcript: cleanTranscript,
      targetWord: target,
      message: `¡Estuviste muy cerca! Escuchamos «${bestCandidate}», pero la palabra es «${target}». ${
        phoneticHint ? `Pista: ${phoneticHint}. ` : ''
      }¡Vuelve a intentarlo con entusiasmo!`,
    };
  } else {
    return {
      status: 'incorrect',
      score: maxScore,
      bestMatchWord: bestCandidate,
      transcript: cleanTranscript,
      targetWord: target,
      message: `No está bien pronunciada. Escuchamos «${cleanTranscript}», pero la palabra correcta es «${target}». Escucha cómo la dice el profesor e inténtalo de nuevo.`,
    };
  }
}

export interface WordMatchStatus {
  word: string;
  matched: boolean;
  score: number;
}

export interface ParagraphEvaluationResult {
  scorePercent: number;
  totalTargetWords: number;
  matchedWordsCount: number;
  wordStatuses: WordMatchStatus[];
  transcript: string;
  status: 'correct' | 'close' | 'incorrect' | 'silence';
  message: string;
}

/**
 * Evalúa la lectura fluida en voz alta de un párrafo o texto continuo (3° y 4° básico).
 * Compara las palabras esperadas del texto con las palabras captadas por el micrófono,
 * calculando el porcentaje de palabras leídas con éxito y destacando cada una.
 */
export function evaluateParagraphReading(
  transcript: string,
  targetText: string
): ParagraphEvaluationResult {
  const cleanTranscript = transcript.trim();
  if (!cleanTranscript) {
    return {
      scorePercent: 0,
      totalTargetWords: 0,
      matchedWordsCount: 0,
      wordStatuses: [],
      transcript: '',
      status: 'silence',
      message: 'No escuchamos tu lectura. Presiona el botón con tu dedito y lee en voz alta frente a la pantalla.',
    };
  }

  // Tokenizar las palabras del texto meta (ignorando puntuación para la comparación pero guardando la palabra original)
  const rawWords = targetText.split(/\s+/).filter((w) => w.trim().length > 0);
  const spokenTokens = cleanTranscript.split(/\s+/).map((w) => normalizeSpanish(w)).filter((w) => w.length > 0);

  let matchedCount = 0;
  // Conjunto de índices hablados ya consumidos para no emparejar la misma palabra repetida
  const consumedSpokenIdx = new Set<number>();

  const wordStatuses: WordMatchStatus[] = rawWords.map((originalWord) => {
    const normWord = normalizeSpanish(originalWord);
    if (!normWord) {
      return { word: originalWord, matched: true, score: 1 };
    }

    // Buscar la mejor coincidencia en los tokens hablados
    let bestSim = 0;
    let bestIdx = -1;

    for (let i = 0; i < spokenTokens.length; i++) {
      if (consumedSpokenIdx.has(i)) continue;
      const sim = calculateSimilarity(normWord, spokenTokens[i]);
      if (sim > bestSim) {
        bestSim = sim;
        bestIdx = i;
      }
    }

    const isMatched = bestSim >= 0.70;
    if (isMatched && bestIdx >= 0) {
      consumedSpokenIdx.add(bestIdx);
      matchedCount++;
    }

    return {
      word: originalWord,
      matched: isMatched,
      score: bestSim,
    };
  });

  const totalWords = rawWords.length;
  const scorePercent = totalWords > 0 ? Math.round((matchedCount / totalWords) * 100) : 0;

  let status: 'correct' | 'close' | 'incorrect' = 'incorrect';
  let message = '';

  if (scorePercent >= 75) {
    status = 'correct';
    message = `¡Lectura fantástica! Leíste el ${scorePercent}% de las palabras con gran fluidez y claridad.`;
  } else if (scorePercent >= 45) {
    status = 'close';
    message = `¡Muy buen esfuerzo! Lograste leer el ${scorePercent}% del texto. Respira con calma y fíjate en las palabras que faltaron.`;
  } else {
    status = 'incorrect';
    message = `Alcanzamos a registrar el ${scorePercent}% de las palabras. Escucha el audio del profesor y vuelve a leerlo despacito.`;
  }

  return {
    scorePercent,
    totalTargetWords: totalWords,
    matchedWordsCount: matchedCount,
    wordStatuses,
    transcript: cleanTranscript,
    status,
    message,
  };
}

