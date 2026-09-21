export type FaunaSpecies = 'pudu' | 'pinguino' | 'condor' | 'puma' | 'rana';
export type OralDifficulty = '1° Básico' | '2° Básico' | '3° Básico' | '4° Básico';

export interface FaunaOralExercise {
  id: string;
  species: FaunaSpecies;
  animalName: string;
  animalTitle: string;
  asignatura: string;
  nivel: OralDifficulty;
  tipo: 'palabra' | 'frase' | 'parrafo';
  texto: string;
  silabeo?: string;
  pista: string;
  icono: string;
  traduccion?: string; // Para inglés
  desafioExtra?: string;
}

export interface FaunaCompanionMeta {
  species: FaunaSpecies;
  nombre: string;
  apodo: string;
  asignatura: string;
  emoji: string;
  colorTheme: {
    primary: string;
    border: string;
    bgLight: string;
    textDark: string;
    ring: string;
  };
  mensajeBienvenida: Record<OralDifficulty, string>;
}

export const FAUNA_COMPANIONS: Record<FaunaSpecies, FaunaCompanionMeta> = {
  pudu: {
    species: 'pudu',
    nombre: 'Pudú Puduco',
    apodo: 'El Pequeño del Bosque',
    asignatura: 'Lenguaje y Comunicación',
    emoji: '🦌',
    colorTheme: {
      primary: 'bg-amber-600',
      border: 'border-amber-300',
      bgLight: 'bg-amber-50',
      textDark: 'text-amber-950',
      ring: 'ring-amber-200',
    },
    mensajeBienvenida: {
      '1° Básico': '¡Hola! Soy el Pudú. Escucha cada palabra y separa sus sílabas con aplausos.',
      '2° Básico': '¡Vamos a leer frases juntos! Pronuncia con emoción y ritmo tranquilo.',
      '3° Básico': 'Leamos párrafos con comas y puntos. Haz pausas suaves para respirar.',
      '4° Básico': 'Desafío de fluidez y expresión: lee como un verdadero cuentacuentos chileno.',
    },
  },
  pinguino: {
    species: 'pinguino',
    nombre: 'Pingüino Pingui',
    apodo: 'El Nadador Calculador',
    asignatura: 'Matemática',
    emoji: '🐧',
    colorTheme: {
      primary: 'bg-teal-600',
      border: 'border-teal-300',
      bgLight: 'bg-teal-50',
      textDark: 'text-teal-950',
      ring: 'ring-teal-200',
    },
    mensajeBienvenida: {
      '1° Básico': '¡Splash! Cuenta peces conmigo en voz alta: uno, dos, tres...',
      '2° Básico': 'Resolvamos cálculos orales: piensa el resultado y dilo con fuerza.',
      '3° Básico': 'Tablas y multiplicaciones en voz alta: tres por cuatro... ¡doce!',
      '4° Básico': 'Desafíos lógicos y fracciones marinas: habla con precisión matemática.',
    },
  },
  condor: {
    species: 'condor',
    nombre: 'Cóndor Cóndorito',
    apodo: 'El Guardián de la Cordillera',
    asignatura: 'Historia y Geografía',
    emoji: '🦅',
    colorTheme: {
      primary: 'bg-blue-600',
      border: 'border-blue-300',
      bgLight: 'bg-blue-50',
      textDark: 'text-blue-950',
      ring: 'ring-blue-200',
    },
    mensajeBienvenida: {
      '1° Básico': 'Desde las altas cumbres, aprendamos palabras de nuestra tierra y familia.',
      '2° Básico': 'Conozcamos a los pueblos originarios de Chile pronunciando sus nombres con respeto.',
      '3° Básico': 'Recorramos los desiertos, valles y glaciares de las zonas de Chile con tu voz.',
      '4° Básico': 'Grandes civilizaciones de América: narra historias de los mayas e incas.',
    },
  },
  puma: {
    species: 'puma',
    nombre: 'Puma Nahuel',
    apodo: 'El Explorador de la Naturaleza',
    asignatura: 'Ciencias Naturales',
    emoji: '🐆',
    colorTheme: {
      primary: 'bg-emerald-600',
      border: 'border-emerald-300',
      bgLight: 'bg-emerald-50',
      textDark: 'text-emerald-950',
      ring: 'ring-emerald-200',
    },
    mensajeBienvenida: {
      '1° Básico': '¡Grrr! Descubre los órganos de tu cuerpo y los sentidos con tu voz.',
      '2° Básico': 'Imitemos y describamos los hábitats de los animales de Chile.',
      '3° Básico': 'Viajemos al espacio: nombra el Sol, los planetas y la fuerza de gravedad.',
      '4° Básico': 'Cadenas alimentarias y ecosistemas: explica cómo fluye la energía viva.',
    },
  },
  rana: {
    species: 'rana',
    nombre: 'Ranita Darwin',
    apodo: 'La Cantora Bilingüe',
    asignatura: 'Inglés Escolar',
    emoji: '🐸',
    colorTheme: {
      primary: 'bg-indigo-600',
      border: 'border-indigo-300',
      bgLight: 'bg-indigo-50',
      textDark: 'text-indigo-950',
      ring: 'ring-indigo-200',
    },
    mensajeBienvenida: {
      '1° Básico': 'Croac! Welcome to English! Listen to the sound and repeat after me.',
      '2° Básico': 'Simple English phrases! Pronounce clearly and learn their meaning.',
      '3° Básico': 'Questions and answers: practice speaking English like a native frog!',
      '4° Básico': 'Full English sentences: describe animals, weather and hobbies.',
    },
  },
};

// ============================================================================
// BANCO COMPLETO DE EJERCICIOS ORALES POR ANIMAL Y NIVEL
// ============================================================================
export const FAUNA_ORAL_EXERCISES: FaunaOralExercise[] = [
  // --------------------------------------------------------------------------
  // 1. PUDÚ (Lenguaje y Comunicación)
  // --------------------------------------------------------------------------
  // 1° Básico
  {
    id: 'pudu-1-1',
    species: 'pudu',
    animalName: 'Pudú',
    animalTitle: 'Pudú Puduco',
    asignatura: 'Lenguaje',
    nivel: '1° Básico',
    tipo: 'palabra',
    texto: 'Ostra',
    silabeo: 'Os - tra',
    pista: 'Junta suave /os/ y suelta con aire en /tra/.',
    icono: '🦪',
  },
  {
    id: 'pudu-1-2',
    species: 'pudu',
    animalName: 'Pudú',
    animalTitle: 'Pudú Puduco',
    asignatura: 'Lenguaje',
    nivel: '1° Básico',
    tipo: 'palabra',
    texto: 'Caracol',
    silabeo: 'Ca - ra - col',
    pista: 'Tres sílabas alegres: Ca - ra - col.',
    icono: '🐌',
  },
  {
    id: 'pudu-1-3',
    species: 'pudu',
    animalName: 'Pudú',
    animalTitle: 'Pudú Puduco',
    asignatura: 'Lenguaje',
    nivel: '1° Básico',
    tipo: 'palabra',
    texto: 'Sol',
    silabeo: 'Sol',
    pista: 'Una sola emisión de voz brillante y clara.',
    icono: '☀️',
  },
  {
    id: 'pudu-1-4',
    species: 'pudu',
    animalName: 'Pudú',
    animalTitle: 'Pudú Puduco',
    asignatura: 'Lenguaje',
    nivel: '1° Básico',
    tipo: 'palabra',
    texto: 'Mariposa',
    silabeo: 'Ma - ri - po - sa',
    pista: 'Cuatro pasitos suaves con la lengua.',
    icono: '🦋',
  },
  // 2° Básico
  {
    id: 'pudu-2-1',
    species: 'pudu',
    animalName: 'Pudú',
    animalTitle: 'Pudú Puduco',
    asignatura: 'Lenguaje',
    nivel: '2° Básico',
    tipo: 'frase',
    texto: 'El pudú corre veloz entre los helechos verdes.',
    pista: 'Lee con entonación ágil y haz una pequeña pausa al final.',
    icono: '🌿',
  },
  {
    id: 'pudu-2-2',
    species: 'pudu',
    animalName: 'Pudú',
    animalTitle: 'Pudú Puduco',
    asignatura: 'Lenguaje',
    nivel: '2° Básico',
    tipo: 'frase',
    texto: 'La luna redonda ilumina el bosque chileno.',
    pista: 'Pausa suave después de «redonda» para dar melodía.',
    icono: '🌕',
  },
  // 3° Básico
  {
    id: 'pudu-3-1',
    species: 'pudu',
    animalName: 'Pudú',
    animalTitle: 'Pudú Puduco',
    asignatura: 'Lenguaje',
    nivel: '3° Básico',
    tipo: 'parrafo',
    texto: 'En los bosques templados del sur de Chile vive el pudú, el ciervo más pequeño del mundo. Al amanecer, busca brotes tiernos entre los arrayanes y coligües mientras escucha el canto de las aves.',
    pista: 'Respeta la coma después de «Chile» y después de «mundo» para respirar.',
    icono: '🌲',
  },
  // 4° Básico
  {
    id: 'pudu-4-1',
    species: 'pudu',
    animalName: 'Pudú',
    animalTitle: 'Pudú Puduco',
    asignatura: 'Lenguaje',
    nivel: '4° Básico',
    tipo: 'parrafo',
    texto: 'La leyenda de la Pincoya cuenta que una hermosa doncella marina danza sobre las olas del archipiélago de Chiloé. Si baila mirando hacia el océano, anuncia abundancia de peces y mariscos para los pescadores artesanales; si baila de espaldas, los chilotes cuidan sus provisiones con sabiduría.',
    pista: 'Modula la voz con misterio y claridad en el punto y coma.',
    icono: '🧜‍♀️',
  },

  // --------------------------------------------------------------------------
  // 2. PINGÜINO (Matemática)
  // --------------------------------------------------------------------------
  // 1° Básico
  {
    id: 'ping-1-1',
    species: 'pinguino',
    animalName: 'Pingüino',
    animalTitle: 'Pingüino Pingui',
    asignatura: 'Matemática',
    nivel: '1° Básico',
    tipo: 'palabra',
    texto: 'Cinco',
    silabeo: 'Cin - co',
    pista: 'Muestra tus cinco deditos abiertos al decirlo.',
    icono: '🖐️',
  },
  {
    id: 'ping-1-2',
    species: 'pinguino',
    animalName: 'Pingüino',
    animalTitle: 'Pingüino Pingui',
    asignatura: 'Matemática',
    nivel: '1° Básico',
    tipo: 'palabra',
    texto: 'Sumar',
    silabeo: 'Su - mar',
    pista: 'Sumar significa juntar cosas para tener más.',
    icono: '➕',
  },
  {
    id: 'ping-1-3',
    species: 'pinguino',
    animalName: 'Pingüino',
    animalTitle: 'Pingüino Pingui',
    asignatura: 'Matemática',
    nivel: '1° Básico',
    tipo: 'palabra',
    texto: 'Diez',
    silabeo: 'Diez',
    pista: 'Un número de dos dígitos pero una sola sílaba.',
    icono: '🔟',
  },
  // 2° Básico
  {
    id: 'ping-2-1',
    species: 'pinguino',
    animalName: 'Pingüino',
    animalTitle: 'Pingüino Pingui',
    asignatura: 'Matemática',
    nivel: '2° Básico',
    tipo: 'frase',
    texto: 'Ocho más dos es igual a diez.',
    pista: 'Di los números con seguridad y énfasis.',
    icono: '🧮',
  },
  {
    id: 'ping-2-2',
    species: 'pinguino',
    animalName: 'Pingüino',
    animalTitle: 'Pingüino Pingui',
    asignatura: 'Matemática',
    nivel: '2° Básico',
    tipo: 'frase',
    texto: 'Tengo veinte conchitas y regalo cinco, me quedan quince.',
    pista: 'Calcula mentalmente mientras lees con fluidez.',
    icono: '🐚',
  },
  // 3° Básico
  {
    id: 'ping-3-1',
    species: 'pinguino',
    animalName: 'Matemática',
    animalTitle: 'Pingüino Pingui',
    asignatura: 'Matemática',
    nivel: '3° Básico',
    tipo: 'parrafo',
    texto: 'Cuatro grupos de cinco pingüinos están nadando juntos en la orilla del mar. Si multiplicamos cuatro por cinco, descubrimos que hay veinte pingüinos en total compartiendo peces bajo el agua cristalina.',
    pista: 'Enfatiza «cuatro por cinco» y la respuesta «veinte».',
    icono: '🐟',
  },
  // 4° Básico
  {
    id: 'ping-4-1',
    species: 'pinguino',
    animalName: 'Pingüino',
    animalTitle: 'Pingüino Pingui',
    asignatura: 'Matemática',
    nivel: '4° Básico',
    tipo: 'parrafo',
    texto: 'Para calcular el perímetro de un rectángulo sumamos la longitud de sus cuatro lados. Si una cancha de juego mide diez metros de largo por seis metros de ancho, su perímetro total es de treinta y dos metros de recorrido.',
    pista: 'Pronuncia con claridad técnica los términos geométricos.',
    icono: '📐',
  },

  // --------------------------------------------------------------------------
  // 3. CÓNDOR (Historia y Geografía)
  // --------------------------------------------------------------------------
  // 1° Básico
  {
    id: 'cond-1-1',
    species: 'condor',
    animalName: 'Cóndor',
    animalTitle: 'Cóndor Cóndorito',
    asignatura: 'Historia',
    nivel: '1° Básico',
    tipo: 'palabra',
    texto: 'Chile',
    silabeo: 'Chi - le',
    pista: 'Nuestra patria larga y hermosa: ¡Chi - le!',
    icono: '🇨🇱',
  },
  {
    id: 'cond-1-2',
    species: 'condor',
    animalName: 'Cóndor',
    animalTitle: 'Cóndor Cóndorito',
    asignatura: 'Historia',
    nivel: '1° Básico',
    tipo: 'palabra',
    texto: 'Familia',
    silabeo: 'Fa - mi - lia',
    pista: 'Las personas que nos cuidan y quieren con el corazón.',
    icono: '👨‍👩‍👧',
  },
  {
    id: 'cond-1-3',
    species: 'condor',
    animalName: 'Cóndor',
    animalTitle: 'Cóndor Cóndorito',
    asignatura: 'Historia',
    nivel: '1° Básico',
    tipo: 'palabra',
    texto: 'Bandera',
    silabeo: 'Ban - de - ra',
    pista: 'Azul, blanco y rojo con su estrella solitaria.',
    icono: '🚩',
  },
  // 2° Básico
  {
    id: 'cond-2-1',
    species: 'condor',
    animalName: 'Cóndor',
    animalTitle: 'Cóndor Cóndorito',
    asignatura: 'Historia',
    nivel: '2° Básico',
    tipo: 'frase',
    texto: 'Los mapuche llaman a la tierra Mapu y respetan la naturaleza.',
    pista: 'Pronuncia «Mapuche» y «Mapu» con solemnidad y afecto.',
    icono: '🏔️',
  },
  {
    id: 'cond-2-2',
    species: 'condor',
    animalName: 'Cóndor',
    animalTitle: 'Cóndor Cóndorito',
    asignatura: 'Historia',
    nivel: '2° Básico',
    tipo: 'frase',
    texto: 'Los rapanui tallaron los gigantescos moái en la Isla de Pascua.',
    pista: 'Acento firme en la «i» de «moái».',
    icono: '🗿',
  },
  // 3° Básico
  {
    id: 'cond-3-1',
    species: 'condor',
    animalName: 'Cóndor',
    animalTitle: 'Cóndor Cóndorito',
    asignatura: 'Historia',
    nivel: '3° Básico',
    tipo: 'parrafo',
    texto: 'La Cordillera de los Andes recorre todo Chile de norte a sur como una inmensa muralla nevada. Desde el cielo, el cóndor vigila los volcanes, lagos y glaciares que alimentan los ríos de nuestro territorio nacional.',
    pista: 'Imagina que vuelas alto y proyecta tu voz con firmeza.',
    icono: '🦅',
  },
  // 4° Básico
  {
    id: 'cond-4-1',
    species: 'condor',
    animalName: 'Cóndor',
    animalTitle: 'Cóndor Cóndorito',
    asignatura: 'Historia',
    nivel: '4° Básico',
    tipo: 'parrafo',
    texto: 'Los pueblos originarios de América desarrollaron sistemas agrícolas avanzados. Los incas construyeron terrazas de cultivo en las empinadas laderas andinas, aprovechando el agua del deshielo para alimentar a millones de habitantes en su vasto imperio.',
    pista: 'Lee con tono documental y educativo, pausando en cada punto.',
    icono: '🌽',
  },

  // --------------------------------------------------------------------------
  // 4. PUMA (Ciencias Naturales)
  // --------------------------------------------------------------------------
  // 1° Básico
  {
    id: 'puma-1-1',
    species: 'puma',
    animalName: 'Puma',
    animalTitle: 'Puma Nahuel',
    asignatura: 'Ciencias',
    nivel: '1° Básico',
    tipo: 'palabra',
    texto: 'Corazón',
    silabeo: 'Co - ra - zón',
    pista: 'Late bum-bum dentro de tu pecho: ¡Co-ra-zón!',
    icono: '❤️',
  },
  {
    id: 'puma-1-2',
    species: 'puma',
    animalName: 'Puma',
    animalTitle: 'Puma Nahuel',
    asignatura: 'Ciencias',
    nivel: '1° Básico',
    tipo: 'palabra',
    texto: 'Planta',
    silabeo: 'Plan - ta',
    pista: 'Respira aire puro y suelta /plan/ con energía.',
    icono: '🌱',
  },
  {
    id: 'puma-1-3',
    species: 'puma',
    animalName: 'Puma',
    animalTitle: 'Puma Nahuel',
    asignatura: 'Ciencias',
    nivel: '1° Básico',
    tipo: 'palabra',
    texto: 'Sentidos',
    silabeo: 'Sen - ti - dos',
    pista: 'Vista, oído, olfato, gusto y tacto.',
    icono: '👀',
  },
  // 2° Básico
  {
    id: 'puma-2-1',
    species: 'puma',
    animalName: 'Puma',
    animalTitle: 'Puma Nahuel',
    asignatura: 'Ciencias',
    nivel: '2° Básico',
    tipo: 'frase',
    texto: 'El huemul tiene un pelaje café que lo protege del frío invierno.',
    pista: 'Di «huemul» acentuando la última sílaba con dulzura.',
    icono: '🦌',
  },
  {
    id: 'puma-2-2',
    species: 'puma',
    animalName: 'Puma',
    animalTitle: 'Puma Nahuel',
    asignatura: 'Ciencias',
    nivel: '2° Básico',
    tipo: 'frase',
    texto: 'El agua pasa de líquido a vapor cuando se calienta con el sol.',
    pista: 'Entona la frase explicando el ciclo del agua.',
    icono: '💧',
  },
  // 3° Básico
  {
    id: 'puma-3-1',
    species: 'puma',
    animalName: 'Puma',
    animalTitle: 'Puma Nahuel',
    asignatura: 'Ciencias',
    nivel: '3° Básico',
    tipo: 'parrafo',
    texto: 'El Sol es una gran estrella que se encuentra en el centro de nuestro Sistema Solar. La Tierra gira alrededor de él en un viaje que dura trescientos sesenta y cinco días, dando origen a las cuatro estaciones del año.',
    pista: 'Destaca «trescientos sesenta y cinco días» con voz clara.',
    icono: '🪐',
  },
  // 4° Básico
  {
    id: 'puma-4-1',
    species: 'puma',
    animalName: 'Puma',
    animalTitle: 'Puma Nahuel',
    asignatura: 'Ciencias',
    nivel: '4° Básico',
    tipo: 'parrafo',
    texto: 'En un ecosistema equilibrado, las plantas son los organismos productores porque fabrican su propio alimento mediante la fotosíntesis. Los animales herbívoros como el pudú consumen vegetales, mientras que los carnívoros como el puma mantienen el control natural de las poblaciones.',
    pista: 'Pronuncia con seguridad «fotosíntesis» y «herbívoros».',
    icono: '🍃',
  },

  // --------------------------------------------------------------------------
  // 5. RANITA DE DARWIN (Inglés Escolar)
  // --------------------------------------------------------------------------
  // 1° Básico
  {
    id: 'rana-1-1',
    species: 'rana',
    animalName: 'Ranita',
    animalTitle: 'Ranita Darwin',
    asignatura: 'Inglés',
    nivel: '1° Básico',
    tipo: 'palabra',
    texto: 'Hello',
    silabeo: 'He - llo',
    pista: 'Saluda en inglés con una sonrisa: ¡Hello!',
    traduccion: 'Hola',
    icono: '👋',
  },
  {
    id: 'rana-1-2',
    species: 'rana',
    animalName: 'Ranita',
    animalTitle: 'Ranita Darwin',
    asignatura: 'Inglés',
    nivel: '1° Básico',
    tipo: 'palabra',
    texto: 'Blue',
    silabeo: 'Blue',
    pista: 'El color del cielo y del océano: /Blu/.',
    traduccion: 'Azul',
    icono: '🔷',
  },
  {
    id: 'rana-1-3',
    species: 'rana',
    animalName: 'Ranita',
    animalTitle: 'Ranita Darwin',
    asignatura: 'Inglés',
    nivel: '1° Básico',
    tipo: 'palabra',
    texto: 'Friend',
    silabeo: 'Friend',
    pista: 'Tu compañero de juegos en la escuela: /Frend/.',
    traduccion: 'Amigo o amiga',
    icono: '🤝',
  },
  // 2° Básico
  {
    id: 'rana-2-1',
    species: 'rana',
    animalName: 'Ranita',
    animalTitle: 'Ranita Darwin',
    asignatura: 'Inglés',
    nivel: '2° Básico',
    tipo: 'frase',
    texto: 'The sun is bright and yellow.',
    pista: 'Pronuncia la «th» suave con la lengua entre los dientes.',
    traduccion: 'El sol es brillante y amarillo.',
    icono: '☀️',
  },
  {
    id: 'rana-2-2',
    species: 'rana',
    animalName: 'Ranita',
    animalTitle: 'Ranita Darwin',
    asignatura: 'Inglés',
    nivel: '2° Básico',
    tipo: 'frase',
    texto: 'I love animals and nature.',
    pista: 'Entonación alegre y natural: /Ai lov ánimals/.',
    traduccion: 'Amo los animales y la naturaleza.',
    icono: '🐾',
  },
  // 3° Básico
  {
    id: 'rana-3-1',
    species: 'rana',
    animalName: 'Ranita',
    animalTitle: 'Ranita Darwin',
    asignatura: 'Inglés',
    nivel: '3° Básico',
    tipo: 'parrafo',
    texto: 'Good morning my friends! Today is a sunny day in Chile. The little pudu and the penguin are playing together near the green forest. Can you hear the birds singing in the morning?',
    pista: 'Lee con ritmo y haz la pregunta final subiendo la entonación.',
    traduccion: '¡Buenos días amigos! Hoy es un día soleado en Chile...',
    icono: '🌅',
  },
  // 4° Básico
  {
    id: 'rana-4-1',
    species: 'rana',
    animalName: 'Ranita',
    animalTitle: 'Ranita Darwin',
    asignatura: 'Inglés',
    nivel: '4° Básico',
    tipo: 'parrafo',
    texto: 'Chile is a wonderful and diverse country in South America. In the north we have the dry Atacama Desert, while in the south we find cold glaciers and blue lakes. Protecting our native animals is our most important mission.',
    pista: 'Pronuncia con fluidez: «wonderful», «diverse» y «protecting».',
    traduccion: 'Chile es un país maravilloso y diverso en América del Sur...',
    icono: '🌎',
  },
];
