import { syllabifyWord } from '../utils/syllables';
import { OralPracticeItem } from './oralPracticeData';

// =========================================================================
// BANCO PREESTABLECIDO DE 30 PALABRAS POR UNIDAD PARA HISTORIA Y GEOGRAFÍA
// =========================================================================

export const PRESET_HISTORIA_ORAL_ITEMS: OralPracticeItem[] = [
  // -------------------------------------------------------------
  // 1° BÁSICO - HISTORIA - UNIDAD 1: "Mi tiempo y mi historia personal"
  // -------------------------------------------------------------
  {
    id: 'h-1b-u1-1',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Tiempo',
    silabeo: 'Tiem - po',
    pistaFonema: 'Diptongo /tiem/ y cierre en /po/',
    fraseContexto: 'Lucas descubrió que el tiempo pasa y nos hace crecer.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-2',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Familia',
    silabeo: 'Fa - mi - lia',
    pistaFonema: 'Tres sílabas con diptongo /lia/ al final',
    fraseContexto: 'Los recuerdos familiares forman parte de su historia.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-3',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Línea',
    silabeo: 'Lí - ne - a',
    pistaFonema: 'Hiato: separa bien /lí/ - /ne/ - /a/',
    fraseContexto: 'Dibujó una línea de tiempo en su cuaderno.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-4',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Recuerdos',
    silabeo: 'Re - cuer - dos',
    pistaFonema: 'Diptongo central /cuer/ pronunciado con claridad',
    fraseContexto: 'Guardamos hermosos recuerdos en fotografías.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-5',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Pasado',
    silabeo: 'Pa - sa - do',
    pistaFonema: 'Tres sílabas abiertas: pa - sa - do',
    fraseContexto: 'El pasado nos enseña cómo vivían los abuelos.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-6',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Presente',
    silabeo: 'Pre - sen - te',
    pistaFonema: 'Grupo /pre/ inicial con energía',
    fraseContexto: 'En el presente aprendemos cosas nuevas en la escuela.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-7',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Futuro',
    silabeo: 'Fu - tu - ro',
    pistaFonema: 'Voz proyectada hacia adelante: fu - tu - ro',
    fraseContexto: 'En el futuro cumpliremos muchos sueños.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-8',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Fotografía',
    silabeo: 'Fo - to - gra - fía',
    pistaFonema: 'Hiato final acentuado: fo - to - gra - fía',
    fraseContexto: 'La abuela le mostró una fotografía antigua.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-9',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Calendario',
    silabeo: 'Ca - len - da - rio',
    pistaFonema: 'Cuatro sílabas terminando en /rio/',
    fraseContexto: 'Miramos el calendario para saber los días.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-10',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Semana',
    silabeo: 'Se - ma - na',
    pistaFonema: 'Tres sílabas suaves: se - ma - na',
    fraseContexto: 'La semana tiene siete días para aprender y descansar.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-11',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Crecemos',
    silabeo: 'Cre - ce - mos',
    pistaFonema: 'Grupo /cre/ al inicio: cre - ce - mos',
    fraseContexto: 'A medida que pasa el tiempo todos crecemos.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-12',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Aprender',
    silabeo: 'A - pren - der',
    pistaFonema: 'Grupo /pren/ en la sílaba central',
    fraseContexto: 'Entramos al colegio para aprender a leer y compartir.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-13',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Momentos',
    silabeo: 'Mo - men - tos',
    pistaFonema: 'Tres sílabas rítmicas: mo - men - tos',
    fraseContexto: 'Momentos importantes de nuestra vida.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-14',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Historia',
    silabeo: 'His - to - ria',
    pistaFonema: 'La h es muda; di /his/: his - to - ria',
    fraseContexto: 'Cada niño tiene su propia y hermosa historia.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-15',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Nacer',
    silabeo: 'Na - cer',
    pistaFonema: 'Dos sílabas directas: na - cer',
    fraseContexto: 'El día de nacer comenzó nuestra vida.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-16',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Abuela',
    silabeo: 'A - bue - la',
    pistaFonema: 'Diptongo /bue/ en medio: a - bue - la',
    fraseContexto: 'Su abuela le contó historias de su niñez.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-17',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Celebrar',
    silabeo: 'Ce - le - brar',
    pistaFonema: 'Grupo /brar/ al final con alegría',
    fraseContexto: 'Celebramos los cumpleaños en familia.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-18',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Caminar',
    silabeo: 'Ca - mi - nar',
    pistaFonema: 'Tres sílabas activas: ca - mi - nar',
    fraseContexto: 'Aprendió a caminar dando sus primeros pasos.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-19',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Meses',
    silabeo: 'Me - ses',
    pistaFonema: 'Dos sílabas suaves: me - ses',
    fraseContexto: 'El año escolar tiene varios meses de estudio.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-20',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Mañana',
    silabeo: 'Ma - ña - na',
    pistaFonema: 'Marca con claridad la /ña/ central',
    fraseContexto: 'Mañana será un nuevo día para jugar.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-21',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Ayer',
    silabeo: 'A - yer',
    pistaFonema: 'Dos sílabas directas: a - yer',
    fraseContexto: 'Ayer jugamos en el patio de la escuela.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-22',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Hoy',
    silabeo: 'Hoy',
    pistaFonema: 'Monosílabo firme con h muda',
    fraseContexto: 'Hoy es el momento presente.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-23',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Antiguo',
    silabeo: 'An - ti - guo',
    pistaFonema: 'Diptongo /guo/ al final',
    fraseContexto: 'Un juguete antiguo de madera.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-24',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Costumbres',
    silabeo: 'Cos - tum - bres',
    pistaFonema: 'Grupo /bres/ en la última sílaba',
    fraseContexto: 'Las costumbres familiares se transmiten con amor.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-25',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Cuaderno',
    silabeo: 'Cua - der - no',
    pistaFonema: 'Diptongo /cua/ inicial',
    fraseContexto: 'En su cuaderno escribió su nombre.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-26',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Afecto',
    silabeo: 'A - fec - to',
    pistaFonema: 'Pronuncia la /c/ antes de la /t/',
    fraseContexto: 'El afecto de nuestros padres y abuelos.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-27',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Identidad',
    silabeo: 'I - den - ti - dad',
    pistaFonema: 'Cuatro sílabas rematando en -dad',
    fraseContexto: 'Nuestra historia forma nuestra identidad.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-28',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Etapas',
    silabeo: 'E - ta - pas',
    pistaFonema: 'Tres sílabas abiertas: e - ta - pas',
    fraseContexto: 'La vida tiene diferentes etapas hermosas.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-29',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Crecer',
    silabeo: 'Cre - cer',
    pistaFonema: 'Grupo /cre/ al inicio: cre - cer',
    fraseContexto: 'Es emocionante crecer y ser cada día más autónomos.',
    tipo: 'palabra',
  },
  {
    id: 'h-1b-u1-30',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Nuestra historia familiar es un tesoro',
    silabeo: 'Nues - tra  his - to - ria  fa - mi - liar  es  un  te - so - ro',
    pistaFonema: 'Frase oral declarativa para practicar dicción y proyección vocal',
    fraseContexto: 'Nuestra historia familiar es un tesoro que debemos cuidar.',
    tipo: 'frase',
  },
];

const STOPWORDS_HISTORIA = new Set([
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'a', 'al', 'en',
  'con', 'por', 'para', 'sin', 'sobre', 'este', 'esta', 'estos', 'estas', 'ese', 'esa',
  'esos', 'esas', 'aquel', 'aquella', 'mi', 'mis', 'tu', 'tus', 'su', 'sus', 'que',
  'pero', 'como', 'cuando', 'donde', 'cada', 'todo', 'toda', 'todos', 'todas', 'otro',
  'otra', 'otros', 'otras', 'mismo', 'misma', 'muy', 'casi', 'solo', 'tambien', 'era',
  'fue', 'son', 'eran', 'habia', 'estar', 'estan', 'estaba', 'hacer', 'hizo', 'tener',
  'tiene', 'dijo', 'algo', 'nada', 'bien', 'mas', 'menos'
]);

export function extractHistoriaWordsFromText(
  text: string,
  nivel: string,
  unidad: string
): OralPracticeItem[] {
  if (!text || text.trim().length === 0) return [];

  const sentences = text
    .replace(/\n+/g, ' ')
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5);

  const rawWords = text.match(/[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+/g) || [];
  const wordFreq = new Map<string, number>();

  rawWords.forEach((raw) => {
    const lower = raw.toLowerCase();
    if (lower.length >= 4 && !STOPWORDS_HISTORIA.has(lower)) {
      wordFreq.set(lower, (wordFreq.get(lower) || 0) + 1);
    }
  });

  const candidates = Array.from(wordFreq.keys())
    .sort((a, b) => b.length - a.length || (wordFreq.get(b) || 0) - (wordFreq.get(a) || 0))
    .slice(0, 30);

  return candidates.map((word, idx) => {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
    const syllables = syllabifyWord(capitalized);
    const silabeoStr = syllables.join(' - ');

    const contextSentence =
      sentences.find((s) => s.toLowerCase().includes(word.toLowerCase())) ||
      `Concepto histórico-geográfico: «${capitalized}».`;

    return {
      id: `hist-custom-${idx + 1}`,
      nivel,
      unidad,
      palabra: capitalized,
      silabeo: silabeoStr,
      pistaFonema: `Pronuncia con firmeza cada sílaba: ${silabeoStr}`,
      fraseContexto:
        contextSentence.length > 120 ? `${contextSentence.slice(0, 117)}...` : contextSentence,
      tipo: 'palabra',
    };
  });
}

export function getHistoriaOralPracticeForNivelAndUnit(
  nivel: string,
  unitNumero: string,
  activeText?: string
): OralPracticeItem[] {
  const presets = PRESET_HISTORIA_ORAL_ITEMS.filter((item) => {
    if (item.nivel !== nivel) return false;
    return (
      item.unidad === unitNumero ||
      unitNumero.includes(item.unidad) ||
      item.unidad.includes(unitNumero)
    );
  });

  if (presets.length >= 20 && !activeText) {
    return presets;
  }

  if (activeText && activeText.length > 40) {
    const extracted = extractHistoriaWordsFromText(activeText, nivel, unitNumero);
    if (extracted.length > 0) {
      const textLower = activeText.toLowerCase();
      const matchingPresets = presets.filter((p) => textLower.includes(p.palabra.toLowerCase()));
      const seen = new Set(matchingPresets.map((p) => p.palabra.toLowerCase()));

      const combined: OralPracticeItem[] = [...matchingPresets];
      for (const item of extracted) {
        if (!seen.has(item.palabra.toLowerCase()) && combined.length < 30) {
          seen.add(item.palabra.toLowerCase());
          combined.push(item);
        }
      }
      if (combined.length >= 10) {
        return combined;
      }
      return extracted;
    }
  }

  if (presets.length > 0) {
    return presets;
  }

  if (activeText) {
    return extractHistoriaWordsFromText(activeText, nivel, unitNumero);
  }

  return [];
}
