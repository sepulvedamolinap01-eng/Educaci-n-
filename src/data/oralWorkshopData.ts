export interface OralLevelItem {
  id: string;
  nivel: '1° Básico' | '2° Básico' | '3° Básico' | '4° Básico';
  tipo: 'palabra' | 'frase' | 'parrafo_5' | 'texto_10';
  titulo: string;
  subtitulo: string;
  historiaPuduco: string; // Lo que Puduco cuenta de qué se trata
  contenido: string; // Texto a leer
  silabas?: string[]; // Para 1° básico
  lineasAprox: number;
  tiempoRecomendadoSegundos: number;
  consejoLectura: string;
}

export const ORAL_WORKSHOP_LEVELS: {
  nivel: '1° Básico' | '2° Básico' | '3° Básico' | '4° Básico';
  titulo: string;
  descripcion: string;
  meta: string;
  badge: string;
  color: string;
  bgLight: string;
}[] = [
  {
    nivel: '1° Básico',
    titulo: 'Repetición de Palabras Clave',
    descripcion: 'Vocalización clara, sílaba a sílaba, de palabras cotidianas y de la naturaleza.',
    meta: '1 palabra con ritmo y sílabas',
    badge: '1° Básico • Fonemas',
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50 border-emerald-200 text-emerald-950',
  },
  {
    nivel: '2° Básico',
    titulo: 'Frases Breves Guiadas',
    descripcion: 'Lectura de oraciones cortas de 3 a 5 palabras con entonación expresiva.',
    meta: 'Frases de 3 a 5 palabras',
    badge: '2° Básico • Frases',
    color: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50 border-amber-200 text-amber-950',
  },
  {
    nivel: '3° Básico',
    titulo: 'Párrafo de 5 Líneas',
    descripcion: 'Lectura fluida en voz alta de un texto de 5 líneas respetando pausas en comas y puntos.',
    meta: 'Párrafo de 5 líneas con pausas',
    badge: '3° Básico • 5 Líneas',
    color: 'from-sky-500 to-blue-600',
    bgLight: 'bg-sky-50 border-sky-200 text-sky-950',
  },
  {
    nivel: '4° Básico',
    titulo: 'Lectura Fluida de 10 Líneas',
    descripcion: 'Lectura expresiva de un texto de 10 líneas para evaluar dicción, ritmo y modulación.',
    meta: 'Texto de 10 líneas fluido',
    badge: '4° Básico • 10 Líneas',
    color: 'from-purple-500 to-indigo-600',
    bgLight: 'bg-purple-50 border-purple-200 text-purple-950',
  },
];

export const ORAL_WORKSHOP_ITEMS: OralLevelItem[] = [
  // ================= 1° BÁSICO: REPETIR PALABRAS CLAVE =================
  {
    id: '1b-sol',
    nivel: '1° Básico',
    tipo: 'palabra',
    titulo: 'El Sol',
    subtitulo: 'Palabra de 1 sílaba',
    historiaPuduco: '¡Hola amiguito! El sol nos da calor y luz todas las mañanas. Vamos a decir su nombre bien clarito.',
    contenido: 'Sol',
    silabas: ['Sol'],
    lineasAprox: 1,
    tiempoRecomendadoSegundos: 5,
    consejoLectura: 'Abre bien la boca y haz sonar la "S" suave como el viento: Sss-ol.',
  },
  {
    id: '1b-mama',
    nivel: '1° Básico',
    tipo: 'palabra',
    titulo: 'Mamá',
    subtitulo: 'Palabra de 2 sílabas',
    historiaPuduco: '¡Qué hermosa palabra! Junta los labios para el sonido "Mmm" y carga la voz al final: ma-má.',
    contenido: 'Mamá',
    silabas: ['ma', 'má'],
    lineasAprox: 1,
    tiempoRecomendadoSegundos: 5,
    consejoLectura: 'Di primero "ma" y luego "má" con fuerza en la última letra.',
  },
  {
    id: '1b-gato',
    nivel: '1° Básico',
    tipo: 'palabra',
    titulo: 'Gato',
    subtitulo: 'Palabra de 2 sílabas',
    historiaPuduco: 'Los gatitos dicen miau y caminan despacio. Repitamos juntos su nombre.',
    contenido: 'Gato',
    silabas: ['ga', 'to'],
    lineasAprox: 1,
    tiempoRecomendadoSegundos: 5,
    consejoLectura: 'Marca bien la "g" de garganta: ga - to.',
  },
  {
    id: '1b-luna',
    nivel: '1° Básico',
    tipo: 'palabra',
    titulo: 'Luna',
    subtitulo: 'Palabra de 2 sílabas',
    historiaPuduco: 'La luna ilumina la noche como un gran farol de plata en el cielo.',
    contenido: 'Luna',
    silabas: ['lu', 'na'],
    lineasAprox: 1,
    tiempoRecomendadoSegundos: 5,
    consejoLectura: 'Sube la lengua al paladar para la letra "L": lu - na.',
  },
  {
    id: '1b-perro',
    nivel: '1° Básico',
    tipo: 'palabra',
    titulo: 'Perro',
    subtitulo: 'Sonido "rr" fuerte',
    historiaPuduco: '¡Este desafío tiene la "rr" que vibra! Haz cosquillas en tu lengua como el motor de un autito.',
    contenido: 'Perro',
    silabas: ['pe', 'rro'],
    lineasAprox: 1,
    tiempoRecomendadoSegundos: 6,
    consejoLectura: 'Haz vibrar la lengua con fuerza: pe - rro.',
  },
  {
    id: '1b-escuela',
    nivel: '1° Básico',
    tipo: 'palabra',
    titulo: 'Escuela',
    subtitulo: 'Palabra de 3 sílabas',
    historiaPuduco: 'La escuela es el lugar mágico donde aprendemos a leer y compartimos con amigos.',
    contenido: 'Escuela',
    silabas: ['es', 'cue', 'la'],
    lineasAprox: 1,
    tiempoRecomendadoSegundos: 7,
    consejoLectura: 'Di cada pedacito con calma: es - cue - la.',
  },
  {
    id: '1b-mariposa',
    nivel: '1° Básico',
    tipo: 'palabra',
    titulo: 'Mariposa',
    subtitulo: 'Palabra de 4 sílabas',
    historiaPuduco: 'Una mariposa vuela de flor en flor agitando sus alas de colores.',
    contenido: 'Mariposa',
    silabas: ['ma', 'ri', 'po', 'sa'],
    lineasAprox: 1,
    tiempoRecomendadoSegundos: 8,
    consejoLectura: 'Cuenta cuatro aplausos al decir: ma - ri - po - sa.',
  },

  // ================= 2° BÁSICO: FRASES BREVES GUIADAS =================
  {
    id: '2b-perro-feliz',
    nivel: '2° Básico',
    tipo: 'frase',
    titulo: 'El perro juguetón',
    subtitulo: 'Frase de 4 palabras',
    historiaPuduco: 'Imagina a un perrito que mueve la cola contento en el patio. ¡Leamos esta linda frase!',
    contenido: 'El perro corre muy feliz.',
    lineasAprox: 1,
    tiempoRecomendadoSegundos: 8,
    consejoLectura: 'Lee palabra por palabra sin apurarte, terminando con voz alegre.',
  },
  {
    id: '2b-leer-cuentos',
    nivel: '2° Básico',
    tipo: 'frase',
    titulo: 'Amor por los libros',
    subtitulo: 'Frase de 5 palabras',
    historiaPuduco: 'A mí me fascina abrir un libro antes de dormir. ¿Qué te gusta leer a ti?',
    contenido: 'Me gusta mucho leer cuentos.',
    lineasAprox: 1,
    tiempoRecomendadoSegundos: 8,
    consejoLectura: 'Pronuncia clarito cada palabra: "Me - gusta - mucho - leer - cuentos".',
  },
  {
    id: '2b-condor-alto',
    nivel: '2° Básico',
    tipo: 'frase',
    titulo: 'El vuelo del cóndor',
    subtitulo: 'Frase de 5 palabras',
    historiaPuduco: 'El cóndor abre sus alas gigantes sobre la cordillera nevada. ¡Siente cómo se eleva!',
    contenido: 'El cóndor vuela muy alto.',
    lineasAprox: 1,
    tiempoRecomendadoSegundos: 8,
    consejoLectura: 'Toma aire antes de empezar y di la frase de un solo viaje suave.',
  },
  {
    id: '2b-luna-cielo',
    nivel: '2° Básico',
    tipo: 'frase',
    titulo: 'Noche estrellada',
    subtitulo: 'Frase de 5 palabras',
    historiaPuduco: 'Miremos la noche tranquila por la ventana. Todo duerme en paz.',
    contenido: 'La luna ilumina la noche.',
    lineasAprox: 1,
    tiempoRecomendadoSegundos: 8,
    consejoLectura: 'Recuerda hacer una pequeña pausa después de "luna".',
  },

  // ================= 3° BÁSICO: TEXTO DE 5 LÍNEAS CON PAUSAS =================
  {
    id: '3b-pudu-sur',
    nivel: '3° Básico',
    tipo: 'parrafo_5',
    titulo: 'El pequeño Pudú del sur',
    subtitulo: 'Texto guiado de 5 líneas • Pausas en comas y puntos',
    historiaPuduco: '¡Este cuento habla sobre mi familia! Somos tímidos, nos encantan las hojas tiernas y cuidamos el bosque nativo.',
    contenido:
      'El pudú es un ciervo muy pequeño que vive en los bosques del sur de Chile.\nTiene un pelaje café rojizo y le encanta comer hojas verdes y frutas silvestres.\nDurante el día se esconde entre los arbustos para protegerse de los peligros.\nAl atardecer, sale con paso silencioso a buscar agua fresca en los arroyos.\nEs un tesoro natural que todos debemos cuidar y proteger con cariño.',
    lineasAprox: 5,
    tiempoRecomendadoSegundos: 25,
    consejoLectura: 'Cuando veas una coma (,), haz una pequeña pausa de un segundo para tomar aire. En el punto final (.), baja la voz con calma.',
  },
  {
    id: '3b-arrayanes',
    nivel: '3° Básico',
    tipo: 'parrafo_5',
    titulo: 'El bosque mágico de arrayanes',
    subtitulo: 'Texto guiado de 5 líneas • Entonación suave',
    historiaPuduco: '¿Has tocado alguna vez un árbol de arrayán? Su tronco es fresco como la nieve y suave como la seda.',
    contenido:
      'En el sur de nuestro país crecen árboles mágicos llamados arrayanes.\nSu tronco es de un color canela suave y siempre se siente muy frío al tocarlo.\nEn la primavera, sus ramas se llenan de flores blancas con dulce perfume.\nLas abejas y los picaflores visitan sus copas para recolectar el néctar.\nCaminar bajo su sombra es como entrar a un cuento de hadas encantado.',
    lineasAprox: 5,
    tiempoRecomendadoSegundos: 25,
    consejoLectura: 'Lee a velocidad constante, pronunciando bien los finales de cada palabra.',
  },
  {
    id: '3b-ballena-azul',
    nivel: '3° Básico',
    tipo: 'parrafo_5',
    titulo: 'La reina de los mares del sur',
    subtitulo: 'Texto guiado de 5 líneas • Respiración y ritmo',
    historiaPuduco: 'La ballena azul es más grande que tres buses juntos, pero nada con una delicadeza asombrosa por el mar chileno.',
    contenido:
      'La ballena azul es el animal más grande que ha existido en el planeta Tierra.\nSurca las frías aguas del océano austral alimentándose de diminutos seres marinos.\nCuando sale a la superficie para respirar, expulsa un chorro de agua muy alto.\nA pesar de su gigantesco tamaño, es una criatura pacífica y nadadora elegante.\nEscuchar su canto submarino es uno de los misterios más hermosos del mar.',
    lineasAprox: 5,
    tiempoRecomendadoSegundos: 25,
    consejoLectura: 'Haz las pausas en cada línea para mantener el aire en tus pulmones.',
  },

  // ================= 4° BÁSICO: TEXTO DE 10 LÍNEAS FLUIDO =================
  {
    id: '4b-moais-rapanui',
    nivel: '4° Básico',
    tipo: 'texto_10',
    titulo: 'El enigma de los gigantes de Rapa Nui',
    subtitulo: 'Lectura fluida de 10 líneas • Expresividad, ritmo y pausas',
    historiaPuduco: 'Viajemos imaginariamente a Rapa Nui. Gigantescos moáis de piedra guardan los secretos de un pueblo navegante extraordinario.',
    contenido:
      'En medio del inmenso océano Pacífico se encuentra Rapa Nui, una isla llena de misterios y leyendas ancestrales.\nAllí se levantan gigantescas estatuas de piedra volcánica llamadas moáis, que miran hacia el interior de los pueblos.\nLos antiguos habitantes construyeron estos monumentos para honrar la memoria y la energía de sus antepasados más sabios.\nMover estas moles de varias toneladas a lo largo de colinas sin ruedas modernas fue una verdadera hazaña comunitaria.\nLos ancianos de la isla cuentan que las estatuas caminaban impulsadas por el mana, una fuerza espiritual sagrada.\nCada figura posee rasgos únicos, orejas alargadas y algunas coronas de roca roja sobre sus cabezas.\nHoy en día, científicos de todo el mundo viajan para descubrir las técnicas exactas que utilizaron los escultores.\nSin embargo, el secreto mejor guardado sigue descansando en el corazón de los acantilados y el viento marino.\nCuidar este patrimonio de la humanidad es una responsabilidad de todas las generaciones presentes y futuras.\nCuando visites la isla, recuerda guardar silencio y escuchar el susurro de la historia en cada piedra.',
    lineasAprox: 10,
    tiempoRecomendadoSegundos: 50,
    consejoLectura: 'En 4° básico buscamos lectura viva: no corras. Haz que el que te escucha sienta el misterio y la emoción de la historia.',
  },
  {
    id: '4b-condor-guardian',
    nivel: '4° Básico',
    tipo: 'texto_10',
    titulo: 'El guardián de las altas cumbres andinas',
    subtitulo: 'Lectura fluida de 10 líneas • Modulación de voz y pausas',
    historiaPuduco: 'El cóndor es el rey del aire cordillerano. Esta lectura pondrá a prueba tu respiración, dicción y volumen.',
    contenido:
      'En las altas cumbres de la cordillera de los Andes reina una de las aves más imponentes del mundo: el cóndor andino.\nCon sus alas abiertas que alcanzan más de tres metros de envergadura, parece flotar sin mover una sola pluma.\nAprovecha las corrientes de aire caliente que suben por los valles para planear durante horas enteras sin cansarse.\nSu mirada aguda puede divisar el movimiento en la tierra desde alturas donde el aire es escaso y muy helado.\nPosee un elegante collar de plumas blancas alrededor de su cuello y un plumaje oscuro que brilla con el sol cordillerano.\nPara los pueblos originarios de los Andes, el cóndor simbolizaba el mensajero directo de las montañas y el cielo.\nLamentablemente, la destrucción de su hábitat natural ha puesto en alerta a los biólogos y defensores de la fauna.\nActualmente existen santuarios dedicados a proteger sus nidos en los peñascos más inaccesibles de la montaña.\nAprender a convivir en equilibrio con la naturaleza permite que este emblema nacional siga surcando nuestros cielos libres.\nCada vez que mires hacia la cordillera nevada, imagina la sombra serena del cóndor vigilando su hogar milenario.',
    lineasAprox: 10,
    tiempoRecomendadoSegundos: 50,
    consejoLectura: 'Modula la voz con energía en las oraciones descriptivas y descansa en los puntos seguidos.',
  },
];
