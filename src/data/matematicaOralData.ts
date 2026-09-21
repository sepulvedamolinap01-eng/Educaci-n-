import { syllabifyWord } from '../utils/syllables';
import { OralPracticeItem } from './oralPracticeData';

export const PRESET_MATEMATICA_ORAL_ITEMS: OralPracticeItem[] = [
  // -------------------------------------------------------------
  // 1° BÁSICO - MATEMÁTICA - UNIDAD 1: "Números del 0 al 10 y conteo concreto"
  // -------------------------------------------------------------
  {
    id: 'm-1b-u1-1',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Contar',
    silabeo: 'Con - tar',
    pistaFonema: 'Dos sílabas directas, sonido fuerte en /tar/',
    fraseContexto: 'Sofía aprende a contar manzanas una a una.',
    tipo: 'palabra',
  },
  {
    id: 'm-1b-u1-2',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Número',
    silabeo: 'Nú - me - ro',
    pistaFonema: 'Acento en la primera sílaba /nú/',
    fraseContexto: 'Cada número representa una cantidad de objetos.',
    tipo: 'palabra',
  },
  {
    id: 'm-1b-u1-3',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Cuatro',
    silabeo: 'Cua - tro',
    pistaFonema: 'Diptongo /cua/ y combinación /tro/',
    fraseContexto: 'Hay cuatro manzanas rojas en el canasto.',
    tipo: 'palabra',
  },
  {
    id: 'm-1b-u1-4',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Tres',
    silabeo: 'Tres',
    pistaFonema: 'Monosílabo con sonido inicial /tr/',
    fraseContexto: 'Mateo junta tres manzanas verdes.',
    tipo: 'palabra',
  },
  {
    id: 'm-1b-u1-5',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Juntar',
    silabeo: 'Jun - tar',
    pistaFonema: 'Sonido suave de la jota /jun/',
    fraseContexto: 'Juntar cosas es la base de la suma.',
    tipo: 'palabra',
  },
  {
    id: 'm-1b-u1-6',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Siete',
    silabeo: 'Sie - te',
    pistaFonema: 'Diptongo inicial /sie/',
    fraseContexto: 'Cuatro más tres forman siete frutas.',
    tipo: 'palabra',
  },
  {
    id: 'm-1b-u1-7',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Total',
    silabeo: 'To - tal',
    pistaFonema: 'Cierre con la lengua en el paladar /tal/',
    fraseContexto: 'El total es la cantidad final de elementos.',
    tipo: 'palabra',
  },
  {
    id: 'm-1b-u1-8',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Más',
    silabeo: 'Más',
    pistaFonema: 'Monosílabo con tilde enfática',
    fraseContexto: 'El signo más indica que agregamos elementos.',
    tipo: 'palabra',
  },
  {
    id: 'm-1b-u1-9',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Menos',
    silabeo: 'Me - nos',
    pistaFonema: 'Dos sílabas directas /me/ y /nos/',
    fraseContexto: 'Tres es menos cantidad que cuatro.',
    tipo: 'palabra',
  },
  {
    id: 'm-1b-u1-10',
    nivel: '1° Básico',
    unidad: 'Unidad 1',
    palabra: 'Igual',
    silabeo: 'I - gual',
    pistaFonema: 'Diptongo /gual/ al final',
    fraseContexto: 'El signo igual muestra el resultado final.',
    tipo: 'palabra',
  },

  // -------------------------------------------------------------
  // 1° BÁSICO - MATEMÁTICA - UNIDAD 2: "Sumas y restas simples de un dígito"
  // -------------------------------------------------------------
  {
    id: 'm-1b-u2-1',
    nivel: '1° Básico',
    unidad: 'Unidad 2',
    palabra: 'Sumar',
    silabeo: 'Su - mar',
    pistaFonema: 'Dos sílabas simples /su/ - /mar/',
    fraseContexto: 'Sumar significa agregar o reunir cosas.',
    tipo: 'palabra',
  },
  {
    id: 'm-1b-u2-2',
    nivel: '1° Básico',
    unidad: 'Unidad 2',
    palabra: 'Restar',
    silabeo: 'Res - tar',
    pistaFonema: 'Sonido /res/ y terminación en /tar/',
    fraseContexto: 'Restar significa quitar o separar elementos.',
    tipo: 'palabra',
  },
  {
    id: 'm-1b-u2-3',
    nivel: '1° Básico',
    unidad: 'Unidad 2',
    palabra: 'Quitar',
    silabeo: 'Qui - tar',
    pistaFonema: 'La u no suena en /qui/',
    fraseContexto: 'Al quitar dos pájaros quedaron cuatro en la rama.',
    tipo: 'palabra',
  },
  {
    id: 'm-1b-u2-4',
    nivel: '1° Básico',
    unidad: 'Unidad 2',
    palabra: 'Agregar',
    silabeo: 'A - gre - gar',
    pistaFonema: 'Combinación consonántica /gre/',
    fraseContexto: 'Podemos agregar un pájaro nuevo al árbol.',
    tipo: 'palabra',
  },
  {
    id: 'm-1b-u2-5',
    nivel: '1° Básico',
    unidad: 'Unidad 2',
    palabra: 'Cálculo',
    silabeo: 'Cál - cu - lo',
    pistaFonema: 'Acento esdrújulo en /cál/',
    fraseContexto: 'Hacer cálculo mental ejercita nuestro cerebro.',
    tipo: 'palabra',
  },
  {
    id: 'm-1b-u2-6',
    nivel: '1° Básico',
    unidad: 'Unidad 2',
    palabra: 'Dígito',
    silabeo: 'Dí - gi - to',
    pistaFonema: 'Acento en /dí/ y sonido suave de la ge /gi/',
    fraseContexto: 'Un número de un solo dígito va del 0 al 9.',
    tipo: 'palabra',
  },
  {
    id: 'm-1b-u2-7',
    nivel: '1° Básico',
    unidad: 'Unidad 2',
    palabra: 'Resultado',
    silabeo: 'Re - sul - ta - do',
    pistaFonema: 'Cuatro sílabas claras, énfasis en /ta/',
    fraseContexto: 'El resultado de seis menos dos es cuatro.',
    tipo: 'palabra',
  },

  // -------------------------------------------------------------
  // 1° BÁSICO - MATEMÁTICA - UNIDAD 3: "Números hasta 20 y figuras 2D"
  // -------------------------------------------------------------
  {
    id: 'm-1b-u3-1',
    nivel: '1° Básico',
    unidad: 'Unidad 3',
    palabra: 'Decena',
    silabeo: 'De - ce - na',
    pistaFonema: 'Tres sílabas con sonido /ce/',
    fraseContexto: 'Una decena está compuesta por diez unidades.',
    tipo: 'palabra',
  },
  {
    id: 'm-1b-u3-2',
    nivel: '1° Básico',
    unidad: 'Unidad 3',
    palabra: 'Unidades',
    silabeo: 'U - ni - da - des',
    pistaFonema: 'Cuatro sílabas abiertas',
    fraseContexto: 'En el número quince hay diez y cinco unidades.',
    tipo: 'palabra',
  },
  {
    id: 'm-1b-u3-3',
    nivel: '1° Básico',
    unidad: 'Unidad 3',
    palabra: 'Cuadrado',
    silabeo: 'Cua - dra - do',
    pistaFonema: 'Diptongo /cua/ y combinación /dra/',
    fraseContexto: 'El cuadrado tiene cuatro lados iguales.',
    tipo: 'palabra',
  },
  {
    id: 'm-1b-u3-4',
    nivel: '1° Básico',
    unidad: 'Unidad 3',
    palabra: 'Triángulo',
    silabeo: 'Trián - gu - lo',
    pistaFonema: 'Acento en la combinación /trián/',
    fraseContexto: 'El techo de la casa tiene forma de triángulo.',
    tipo: 'palabra',
  },
  {
    id: 'm-1b-u3-5',
    nivel: '1° Básico',
    unidad: 'Unidad 3',
    palabra: 'Quince',
    silabeo: 'Quin - ce',
    pistaFonema: 'Sonido /quin/ y suave /ce/',
    fraseContexto: 'Diez más cinco suman quince piezas.',
    tipo: 'palabra',
  },

  // -------------------------------------------------------------
  // 2° BÁSICO - MATEMÁTICA
  // -------------------------------------------------------------
  {
    id: 'm-2b-u1-1',
    nivel: '2° Básico',
    unidad: 'Unidad 1',
    palabra: 'Posicional',
    silabeo: 'Po - si - cio - nal',
    pistaFonema: 'Diptongo /cio/ y terminación /nal/',
    fraseContexto: 'El valor posicional depende del lugar de la cifra.',
    tipo: 'palabra',
  },
  {
    id: 'm-2b-u1-2',
    nivel: '2° Básico',
    unidad: 'Unidad 1',
    palabra: 'Cuarenta',
    silabeo: 'Cua - ren - ta',
    pistaFonema: 'Diptongo inicial /cua/',
    fraseContexto: 'Cuatro decenas equivalen a cuarenta unidades.',
    tipo: 'palabra',
  },
  {
    id: 'm-2b-u2-1',
    nivel: '2° Básico',
    unidad: 'Unidad 2',
    palabra: 'Algoritmo',
    silabeo: 'Al - go - rit - mo',
    pistaFonema: 'Corte limpio en /rit/ antes de /mo/',
    fraseContexto: 'El algoritmo nos ayuda a sumar en columnas.',
    tipo: 'palabra',
  },
  {
    id: 'm-2b-u2-2',
    nivel: '2° Básico',
    unidad: 'Unidad 2',
    palabra: 'Diferencia',
    silabeo: 'Di - fe - ren - cia',
    pistaFonema: 'Diptongo final /cia/',
    fraseContexto: 'La diferencia es el resultado de una resta.',
    tipo: 'palabra',
  },
  {
    id: 'm-2b-u3-1',
    nivel: '2° Básico',
    unidad: 'Unidad 3',
    palabra: 'Multiplicar',
    silabeo: 'Mul - ti - pli - car',
    pistaFonema: 'Combinación consonántica /pli/',
    fraseContexto: 'Multiplicar es sumar grupos con igual cantidad.',
    tipo: 'palabra',
  },
  {
    id: 'm-2b-u3-2',
    nivel: '2° Básico',
    unidad: 'Unidad 3',
    palabra: 'Monedas',
    silabeo: 'Mo - ne - das',
    pistaFonema: 'Tres sílabas abiertas /mo/ - /ne/ - /das/',
    fraseContexto: 'Usamos monedas de diez y cincuenta pesos.',
    tipo: 'palabra',
  },
  {
    id: 'm-2b-u4-1',
    nivel: '2° Básico',
    unidad: 'Unidad 4',
    palabra: 'Centímetro',
    silabeo: 'Cen - tí - me - tro',
    pistaFonema: 'Acento en /tí/ y cierre en /tro/',
    fraseContexto: 'La regla mide la longitud en centímetros.',
    tipo: 'palabra',
  },

  // -------------------------------------------------------------
  // 3° BÁSICO - MATEMÁTICA
  // -------------------------------------------------------------
  {
    id: 'm-3b-u1-1',
    nivel: '3° Básico',
    unidad: 'Unidad 1',
    palabra: 'Centena',
    silabeo: 'Cen - te - na',
    pistaFonema: 'Sonido /cen/ y tres sílabas regulares',
    fraseContexto: 'Una centena equivale a cien unidades.',
    tipo: 'palabra',
  },
  {
    id: 'm-3b-u1-2',
    nivel: '3° Básico',
    unidad: 'Unidad 1',
    palabra: 'Estimación',
    silabeo: 'Es - ti - ma - ción',
    pistaFonema: 'Acento agudo en /ción/',
    fraseContexto: 'Hacer una estimación nos acerca al resultado real.',
    tipo: 'palabra',
  },
  {
    id: 'm-3b-u2-1',
    nivel: '3° Básico',
    unidad: 'Unidad 2',
    palabra: 'Distributiva',
    silabeo: 'Dis - tri - bu - ti - va',
    pistaFonema: 'Combinación /tri/ y acentuación en /ti/',
    fraseContexto: 'La propiedad distributiva simplifica el cálculo.',
    tipo: 'palabra',
  },
  {
    id: 'm-3b-u3-1',
    nivel: '3° Básico',
    unidad: 'Unidad 3',
    palabra: 'Dividir',
    silabeo: 'Di - vi - dir',
    pistaFonema: 'Tres sílabas directas con /v/ y /d/',
    fraseContexto: 'Dividir es repartir en partes exactamente iguales.',
    tipo: 'palabra',
  },
  {
    id: 'm-3b-u3-2',
    nivel: '3° Básico',
    unidad: 'Unidad 3',
    palabra: 'Fracción',
    silabeo: 'Frac - ción',
    pistaFonema: 'Doble c: /frac/ y /ción/',
    fraseContexto: 'Una fracción representa una parte de un todo.',
    tipo: 'palabra',
  },
  {
    id: 'm-3b-u4-1',
    nivel: '3° Básico',
    unidad: 'Unidad 4',
    palabra: 'Perímetro',
    silabeo: 'Pe - rí - me - tro',
    pistaFonema: 'Acento en /rí/ y terminación en /tro/',
    fraseContexto: 'El perímetro es la suma de todos los lados de una figura.',
    tipo: 'palabra',
  },

  // -------------------------------------------------------------
  // 4° BÁSICO - MATEMÁTICA
  // -------------------------------------------------------------
  {
    id: 'm-4b-u1-1',
    nivel: '4° Básico',
    unidad: 'Unidad 1',
    palabra: 'Redondear',
    silabeo: 'Re - don - dear',
    pistaFonema: 'Hiato /de/ - /ar/ al final',
    fraseContexto: 'Podemos redondear a la centena más cercana.',
    tipo: 'palabra',
  },
  {
    id: 'm-4b-u2-1',
    nivel: '4° Básico',
    unidad: 'Unidad 2',
    palabra: 'Residuo',
    silabeo: 'Re - si - duo',
    pistaFonema: 'Diptongo final /duo/',
    fraseContexto: 'El residuo es lo que sobra en una división inexacta.',
    tipo: 'palabra',
  },
  {
    id: 'm-4b-u3-1',
    nivel: '4° Básico',
    unidad: 'Unidad 3',
    palabra: 'Decimal',
    silabeo: 'De - ci - mal',
    pistaFonema: 'Tres sílabas con terminación /mal/',
    fraseContexto: 'Un número decimal tiene una parte entera y una decimal.',
    tipo: 'palabra',
  },
  {
    id: 'm-4b-u4-1',
    nivel: '4° Básico',
    unidad: 'Unidad 4',
    palabra: 'Superficie',
    silabeo: 'Su - per - fi - cie',
    pistaFonema: 'Diptongo /cie/ final',
    fraseContexto: 'El área mide la superficie encerrada en una figura.',
    tipo: 'palabra',
  },
  {
    id: 'm-4b-u4-2',
    nivel: '4° Básico',
    unidad: 'Unidad 4',
    palabra: 'Ecuación',
    silabeo: 'E - cua - ción',
    pistaFonema: 'Diptongos /cua/ y /ción/',
    fraseContexto: 'Una ecuación busca encontrar el valor de una incógnita.',
    tipo: 'palabra',
  },
];

export function extractMatematicaWordsFromText(
  text: string,
  nivel: string,
  unitNumero: string
): OralPracticeItem[] {
  if (!text || text.trim().length === 0) return [];

  const rawTokens = text.match(/[A-Za-zÁÉÍÓÚáéíóúÑñ]+/g) || [];
  const mathKeywords = [
    'contar', 'sumar', 'restar', 'agregar', 'quitar', 'total', 'número', 'dígito', 'cálculo', 'resultado',
    'decena', 'unidad', 'centena', 'figura', 'triángulo', 'cuadrado', 'rectángulo', 'patrón', 'longitud',
    'regla', 'metro', 'centímetro', 'multiplicar', 'dividir', 'fracción', 'decimal', 'perímetro', 'área',
    'problema', 'operación', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez',
  ];

  const candidateMap = new Map<string, string>();
  const sentences = text.split(/(?<=[.?!])\s+/);

  for (const token of rawTokens) {
    const lower = token.toLowerCase();
    if (lower.length < 3) continue;
    if (!candidateMap.has(lower)) {
      const foundSentence = sentences.find((s) =>
        new RegExp(`\\b${token}\\b`, 'i').test(s)
      );
      candidateMap.set(lower, (foundSentence || text).trim());
    }
  }

  const prioritizedWords: string[] = [];
  const otherWords: string[] = [];

  for (const [word] of candidateMap.entries()) {
    if (mathKeywords.some((kw) => word.includes(kw) || kw.includes(word))) {
      prioritizedWords.push(word);
    } else {
      otherWords.push(word);
    }
  }

  const selectedWords = [...prioritizedWords, ...otherWords].slice(0, 30);

  return selectedWords.map((word, idx) => {
    const originalToken =
      rawTokens.find((t) => t.toLowerCase() === word) || word;
    const capitalized =
      originalToken.charAt(0).toUpperCase() + originalToken.slice(1);
    const silabeo = syllabifyWord(capitalized).join(' - ');
    const contexto = candidateMap.get(word) || `${capitalized} en el contexto matemático.`;

    return {
      id: `m-dyn-${nivel.charAt(0)}-${unitNumero}-${idx + 1}`,
      nivel,
      unidad: unitNumero,
      palabra: capitalized,
      silabeo,
      pistaFonema: `Pronuncia claramente: ${silabeo}`,
      fraseContexto: contexto.length > 120 ? contexto.substring(0, 117) + '...' : contexto,
      tipo: 'palabra',
    };
  });
}

export function getMatematicaOralPracticeForNivelAndUnit(
  nivel: string,
  unitNumero: string,
  activeText?: string
): OralPracticeItem[] {
  const presets = PRESET_MATEMATICA_ORAL_ITEMS.filter((item) => {
    if (item.nivel !== nivel) return false;
    return (
      item.unidad === unitNumero ||
      unitNumero.includes(item.unidad) ||
      item.unidad.includes(unitNumero)
    );
  });

  if (activeText && activeText.length > 40) {
    const extracted = extractMatematicaWordsFromText(activeText, nivel, unitNumero);
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
    return extractMatematicaWordsFromText(activeText, nivel, unitNumero);
  }

  return [];
}
