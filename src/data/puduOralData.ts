// Datos y textos oficiales para el Taller de Expresión Oral y Lectura en Voz Alta con Pudú (Estilo Duolingo)
// Exclusivo para Lenguaje y Comunicación (1° a 4° Básico)

export interface PuduWordItem {
  id: string;
  palabra: string;
  silabeo: string;
  pistaFonema: string;
  ejemplo: string;
  icono: string;
}

export interface PuduPhraseItem {
  id: string;
  frase: string;
  tema: string;
  pista: string;
  icono: string;
}

export interface PuduReadingText {
  id: string;
  titulo: string;
  nivel: '3° Básico' | '4° Básico';
  numLineas: number;
  lineas: string[];
  textoContinuo: string;
  tema: string;
  descripcion: string;
  palabrasObjetivo: number;
}

// ============================================================================
// 1° BÁSICO: REPETICIÓN DE PALABRAS Y SÍLABAS (Leo Primero)
// ============================================================================
export const PUDU_WORDS_1_BASICO: PuduWordItem[] = [
  {
    id: '1b-w1',
    palabra: 'Ostra',
    silabeo: 'Os - tra',
    pistaFonema: 'Junta suave /os/ y suelta con aire en /tra/',
    ejemplo: 'La ostra vivía feliz en el fondo del mar.',
    icono: '🦪',
  },
  {
    id: '1b-w2',
    palabra: 'Perla',
    silabeo: 'Per - la',
    pistaFonema: 'Une tus labios en la /p/ y pronuncia /la/',
    ejemplo: 'La perla brillante alumbraba las olas.',
    icono: '✨',
  },
  {
    id: '1b-w3',
    palabra: 'Sapo',
    silabeo: 'Sa - po',
    pistaFonema: 'Sisea como serpiente en /sa/ y cierra en /po/',
    ejemplo: 'El sapo de Bullock cuida su laguna.',
    icono: '🐸',
  },
  {
    id: '1b-w4',
    palabra: 'Caracol',
    silabeo: 'Ca - ra - col',
    pistaFonema: 'Tres sílabas con ritmo alegre: Ca-ra-col',
    ejemplo: 'El caracol camina despacio con su casita.',
    icono: '🐌',
  },
  {
    id: '1b-w5',
    palabra: 'Sol',
    silabeo: 'Sol',
    pistaFonema: 'Una sola sílaba fuerte y luminosa: /sol/',
    ejemplo: 'El sol de la mañana calienta el bosque.',
    icono: '☀️',
  },
  {
    id: '1b-w6',
    palabra: 'Luna',
    silabeo: 'Lu - na',
    pistaFonema: 'Coloca la lengua en el paladar para /lu/ y abre /na/',
    ejemplo: 'La luna blanca vigila las estrellas.',
    icono: '🌙',
  },
  {
    id: '1b-w7',
    palabra: 'Rana',
    silabeo: 'Ra - na',
    pistaFonema: 'Vibra suave tu lengua en la /r/ para decir /ra/',
    ejemplo: 'La pequeña rana salta sobre las hojas.',
    icono: '🌿',
  },
  {
    id: '1b-w8',
    palabra: 'Flor',
    silabeo: 'Flor',
    pistaFonema: 'Sopla aire entre los labios en /fl/ y termina en /or/',
    ejemplo: 'La flor de copihue crece en la enredadera.',
    icono: '🌺',
  },
  {
    id: '1b-w9',
    palabra: 'Pudú',
    silabeo: 'Pu - dú',
    pistaFonema: 'Acentúa la última vocal con fuerza: /dú/',
    ejemplo: 'El pudú es el ciervo más tierno de Chile.',
    icono: '🦌',
  },
  {
    id: '1b-w10',
    palabra: 'Río',
    silabeo: 'Rí - o',
    pistaFonema: 'Vibra la /r/ con tilde en la /í/ y termina en /o/',
    ejemplo: 'El agua fresca del río baja de la montaña.',
    icono: '💧',
  },
];

// ============================================================================
// 2° BÁSICO: PALABRAS COMPUESTAS Y FRASES BREVES (3 a 5 palabras)
// ============================================================================
export const PUDU_PHRASES_2_BASICO: PuduPhraseItem[] = [
  {
    id: '2b-p1',
    frase: 'El sapo salta en el río cristalino.',
    tema: 'Naturaleza chilena',
    pista: 'Haz una pequeña pausa después de "salta" para respirar bien.',
    icono: '🐸',
  },
  {
    id: '2b-p2',
    frase: 'La luna alumbra el sendero del bosque.',
    tema: 'El cielo nocturno',
    pista: 'Pronuncia clara la palabra "sendero" con tono tranquilo.',
    icono: '🌙',
  },
  {
    id: '2b-p3',
    frase: 'El pequeño pudú come hojas verdes.',
    tema: 'Fauna del sur',
    pista: 'Enfatiza el acento en "pudú" y di con claridad "verdes".',
    icono: '🌿',
  },
  {
    id: '2b-p4',
    frase: 'Las estrellas brillan en la cordillera.',
    tema: 'Montañas de Chile',
    pista: 'Articula bien "cordillera" sintiendo la vibración.',
    icono: '⭐',
  },
  {
    id: '2b-p5',
    frase: 'Mi familia comparte con alegría y cariño.',
    tema: 'Vida escolar y hogar',
    pista: 'Mantén un ritmo fluido sin apurarte.',
    icono: '❤️',
  },
  {
    id: '2b-p6',
    frase: 'El viento sopla suave entre las araucarias.',
    tema: 'Bosque nativo',
    pista: 'Separa mentalmente las palabras para no juntarlas.',
    icono: '🌲',
  },
  {
    id: '2b-p7',
    frase: 'Los pájaros cantan alegres al amanecer.',
    tema: 'Aves de Chile',
    pista: 'Pronuncia cada palabra abriendo bien la boca.',
    icono: '🐦',
  },
  {
    id: '2b-p8',
    frase: 'Una ballena azul nada en el océano.',
    tema: 'Mar chileno',
    pista: 'Haz una pausa breve entre "azul" y "nada".',
    icono: '🐋',
  },
];

// ============================================================================
// 3° BÁSICO: LECTURA EN VOZ ALTA (Texto reducido con pausas claras)
// ============================================================================
export const PUDU_READINGS_3_BASICO: PuduReadingText[] = [
  {
    id: '3b-t1',
    titulo: 'El despertar del pequeño pudú',
    nivel: '3° Básico',
    numLineas: 5,
    textoContinuo:
      'El pequeño pudú vive en los bosques del sur de Chile. Cada mañana come brotes tiernos, bebe agua fresca en el arroyo y descansa tranquilo bajo los árboles nativos.',
    lineas: [
      'El pequeño pudú vive en los bosques del sur de Chile.',
      'Cada mañana come brotes tiernos de canelo.',
      'Bebe agua fresca en el arroyo escondido.',
      'Descansa tranquilo bajo los árboles nativos.',
      'Al atardecer, regresa feliz junto a su familia.',
    ],
    tema: 'Fauna nativa y naturaleza del sur',
    descripcion: 'Texto narrativo breve y continuo para ejercitar pausas en comas y puntos.',
    palabrasObjetivo: 27,
  },
  {
    id: '3b-t2',
    titulo: 'El viaje del picaflor cordillerano',
    nivel: '3° Básico',
    numLineas: 5,
    textoContinuo:
      'El picaflor vuela rápido entre las flores rojas de la cordillera. Con su canto suave y alegre, anuncia la llegada de la primavera a los niños.',
    lineas: [
      'El picaflor vuela rápido entre las flores rojas.',
      'Busca néctar dulce en los valles cordilleranos.',
      'Sus plumas verdes brillan con la luz del sol.',
      'Con su canto suave y alegre anuncia la primavera.',
      'Todos los niños sonríen al verlo volar libre.',
    ],
    tema: 'Aves y estaciones del año',
    descripcion: 'Lectura descriptiva breve con ritmo ágil y entonación expresiva.',
    palabrasObjetivo: 25,
  },
  {
    id: '3b-t3',
    titulo: 'Los delfines en los fiordos de Chiloé',
    nivel: '3° Básico',
    numLineas: 5,
    textoContinuo:
      'En las aguas de los fiordos australes nadan delfines juguetones. Saltan sobre las olas espumosas saludando a los botes de pescadores artesanales.',
    lineas: [
      'En las frías aguas de Chiloé nadan delfines juguetones.',
      'Saltan sobre las olas espumosas con agilidad.',
      'Saludan alegres a los botes de los pescadores.',
      'Cuidan siempre a sus crías en el mar profundo.',
      'Su alegre danza llena de vida nuestros fiordos.',
    ],
    tema: 'Ecosistemas marinos de Chile',
    descripcion: 'Texto informativo breve para modular el volumen y la respiración.',
    palabrasObjetivo: 21,
  },
];

// ============================================================================
// 4° BÁSICO: LECTURA EN VOZ ALTA DE CORRIDO (Texto conciso en una sola pantalla)
// ============================================================================
export const PUDU_READINGS_4_BASICO: PuduReadingText[] = [
  {
    id: '4b-t1',
    titulo: 'La leyenda de la flor de Copihue',
    nivel: '4° Básico',
    numLineas: 10,
    textoContinuo:
      'En los bosques del sur de Chile crece el copihue, una hermosa flor roja y brillante. Con sus campanas entre los árboles nativos, representa el cariño y la memoria de nuestro país.',
    lineas: [
      'En los antiguos bosques del sur de Chile crecen enredaderas altas.',
      'Cuenta la leyenda que dos jóvenes se amaban con sinceridad.',
      'La distancia los mantenía separados por los senderos.',
      'Para recordar su unión, la tierra hizo brotar una campana roja.',
      'Esa flor mágica fue llamada copihue por los pueblos nativos.',
      'Floreció en lo más alto de los árboles milenarios.',
      'Sus pétalos rojos resisten la lluvia y el viento invernal.',
      'Los viajeros contemplan su luz con asombro y alegría.',
      'Hoy representa el valor, la memoria y el cariño de Chile.',
      'Nos invita a cuidar los bosques con orgullo y respeto.',
    ],
    tema: 'Tradición oral, cultura y símbolos nacionales',
    descripcion: 'Texto narrativo de corrido conciso para ejercitar fluidez sin deslizar la pantalla.',
    palabrasObjetivo: 29,
  },
  {
    id: '4b-t2',
    titulo: 'Los cielos limpios del desierto de Atacama',
    nivel: '4° Básico',
    numLineas: 10,
    textoContinuo:
      'El desierto de Atacama tiene los cielos más limpios del planeta. Enormes telescopios giran durante la noche para observar estrellas, planetas desconocidos y galaxias lejanas.',
    lineas: [
      'El desierto de Atacama posee uno de los cielos más limpios.',
      'Los vientos secos evitan que las nubes tapen las estrellas.',
      'Científicos de todo el mundo construyeron observatorios astronómicos.',
      'Enormes telescopios giran lentamente durante la noche.',
      'Capturan la luz dorada de galaxias muy lejanas.',
      'Descubren planetas desconocidos y cometas brillantes.',
      'Las comunidades antiguas ya conocían la llama celestial.',
      'Guiaban sus siembras mirando las constelaciones del desierto.',
      'El silencio nocturno despierta nuestra curiosidad científica.',
      'Los niños de Chile explorarán los misterios del cosmos.',
    ],
    tema: 'Ciencia, astronomía y patrimonio de Chile',
    descripcion: 'Texto expositivo conciso con vocabulario científico y entonación fluida.',
    palabrasObjetivo: 24,
  },
  {
    id: '4b-t3',
    titulo: 'El huemul de la Patagonia chilena',
    nivel: '4° Básico',
    numLineas: 10,
    textoContinuo:
      'En las montañas del sur de Chile habita el huemul, nuestro ciervo cordillerano. Su pelaje café lo protege del frío mientras recorre valles y praderas, simbolizando la nobleza de nuestra fauna.',
    lineas: [
      'En las altas cumbres de la Patagonia habita el huemul.',
      'Su pelaje grueso de color café lo protege de la nieve.',
      'Camina con pasos firmes entre las rocas escarpadas.',
      'En verano sube a las praderas en busca de hierbas frescas.',
      'Bebe agua pura de deshielo en los ríos cristalinos.',
      'Convive en armonía con cóndores que sobrevuelan las cumbres.',
      'Los guardaparques protegen sus manadas con gran dedicación.',
      'Crean senderos seguros para que sus crías crezcan tranquilas.',
      'El huemul simboliza la fortaleza de nuestra fauna silvestre.',
      'Cuidar su hogar es un compromiso de todos los chilenos.',
    ],
    tema: 'Fauna protegida y conservación de la Patagonia',
    descripcion: 'Texto descriptivo conciso de corrido con entonación fluida.',
    palabrasObjetivo: 29,
  },
];
