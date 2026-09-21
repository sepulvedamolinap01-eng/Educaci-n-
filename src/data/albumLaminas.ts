// Definición de Láminas Coleccionables del Álbum de Exploradores de Chile
export interface LaminaColeccionable {
  id: string;
  nombre: string;
  categoria: 'fauna' | 'paisaje' | 'logro';
  icono: string;
  descripcion: string;
  curiosidad: string;
  desbloqueadoPor: string;
  rareza: 'comun' | 'especial' | 'dorada';
}

export const LAMINAS_CATALOGO: LaminaColeccionable[] = [
  {
    id: 'rana_darwin',
    nombre: 'Ranita de Darwin',
    categoria: 'fauna',
    icono: '🐸',
    descripcion: 'Pequeña ranita camuflada con forma de hoja de los bosques del sur de Chile.',
    curiosidad: '¡El papá rana cuida a los renacuajos dentro de su saco bucal hasta que crecen!',
    desbloqueadoPor: 'Jugar o leer en la asignatura de Inglés',
    rareza: 'dorada',
  },
  {
    id: 'pudu_bosque',
    nombre: 'Pudú del Sur',
    categoria: 'fauna',
    icono: '🦌',
    descripcion: 'Uno de los ciervos más pequeños y tímidos del planeta Tierra.',
    curiosidad: 'Vive entre la densa vegetación y da pequeños saltos ágiles cuando se asusta.',
    desbloqueadoPor: 'Completar lecturas en Lenguaje y Comunicación',
    rareza: 'dorada',
  },
  {
    id: 'condor_alturas',
    nombre: 'Cóndor Andino',
    categoria: 'fauna',
    icono: '🦅',
    descripcion: 'El rey de las altas cumbres de la Cordillera de los Andes.',
    curiosidad: 'Puede planear durante horas sin aletear aprovechando las corrientes de aire.',
    desbloqueadoPor: 'Explorar lecciones de Historia y Geografía',
    rareza: 'especial',
  },
  {
    id: 'pinguino_humboldt',
    nombre: 'Pingüino de Humboldt',
    categoria: 'fauna',
    icono: '🐧',
    descripcion: 'Buceador experto de las costas y playas chilenas.',
    curiosidad: 'Sus alas funcionan como aletas submarinas que le permiten nadar a gran velocidad.',
    desbloqueadoPor: 'Resolver desafíos de Matemática',
    rareza: 'especial',
  },
  {
    id: 'puma_cordillera',
    nombre: 'Puma Chileno',
    categoria: 'fauna',
    icono: '🐆',
    descripcion: 'El felino más grande y sigiloso de todo Chile.',
    curiosidad: 'Tiene almohadillas en sus patas que le permiten caminar sin hacer ningún ruido.',
    desbloqueadoPor: 'Aprender sobre la naturaleza en Ciencias Naturales',
    rareza: 'especial',
  },
  {
    id: 'llama_nortina',
    nombre: 'Llama Andina',
    categoria: 'fauna',
    icono: '🦙',
    descripcion: 'Amiga fiel de las comunidades del Altiplano chileno.',
    curiosidad: 'Tiene una lana muy abrigadita para soportar el frío de la noche andina.',
    desbloqueadoPor: 'Avanzar entre diferentes asignaturas',
    rareza: 'comun',
  },
  {
    id: 'volcan_villarrica',
    nombre: 'Volcán Villarrica',
    categoria: 'paisaje',
    icono: '🌋',
    descripcion: 'Imponente volcán nevado con cráter humeante en la Araucanía.',
    curiosidad: 'Los mapuche lo llaman Rucapillán, que significa "la casa de los espíritus".',
    desbloqueadoPor: 'Superar preguntas del cuestionario interactivo',
    rareza: 'especial',
  },
  {
    id: 'desierto_atacama',
    nombre: 'Desierto de Atacama',
    categoria: 'paisaje',
    icono: '🌵',
    descripcion: 'El desierto más árido del mundo con los cielos más limpios para ver estrellas.',
    curiosidad: 'Desde aquí los astrónomos observan galaxias a millones de años luz.',
    desbloqueadoPor: 'Practicar la lectura con audio en voz alta',
    rareza: 'especial',
  },
  {
    id: 'oceano_pacifico',
    nombre: 'Océano Pacífico',
    categoria: 'paisaje',
    icono: '🌊',
    descripcion: 'El inmenso mar que baña de norte a sur todas las costas de Chile.',
    curiosidad: 'Hogar de ballenas jorobadas, delfines y lobos marinos.',
    desbloqueadoPor: 'Unir palabras en el juego interactivo',
    rareza: 'comun',
  },
  {
    id: 'estrella_dorada',
    nombre: 'Estrella de Campeón',
    categoria: 'logro',
    icono: '⭐',
    descripcion: 'Medalla brillante por responder correctamente a la primera.',
    curiosidad: '¡Brilla con más fuerza cada vez que demuestras tu curiosidad!',
    desbloqueadoPor: 'Obtener un puntaje perfecto en una actividad',
    rareza: 'dorada',
  },
  {
    id: 'mochila_magica',
    nombre: 'Mochila del Primer Día',
    categoria: 'logro',
    icono: '🎒',
    descripcion: 'Llena de cuadernos de colores, lápices y sueños de aprender.',
    curiosidad: 'Cada página leída es un paso más en tu viaje como explorador.',
    desbloqueadoPor: 'Comenzar una nueva unidad escolar',
    rareza: 'comun',
  },
  {
    id: 'trofeo_explorador',
    nombre: 'Gran Medalla Mineduc',
    categoria: 'logro',
    icono: '🏆',
    descripcion: 'El máximo reconocimiento para los niños aventureros de Chile.',
    curiosidad: '¡Otorgado a quienes disfrutan aprender y ayudan a sus compañeros!',
    desbloqueadoPor: 'Explorar 5 unidades de cualquier curso',
    rareza: 'dorada',
  },
];

const STORAGE_KEY = 'mineduc_album_laminas_v1';

export function getUnlockedLaminas(): string[] {
  try {
    if (typeof window === 'undefined') return ['rana_darwin', 'mochila_magica'];
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // Regalo inicial para incentivar al niño
      const initial = ['rana_darwin', 'mochila_magica'];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(saved);
  } catch {
    return ['rana_darwin', 'mochila_magica'];
  }
}

export function unlockLamina(id: string): boolean {
  try {
    const current = getUnlockedLaminas();
    if (current.includes(id)) return false; // ya la tiene
    const updated = [...current, id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true; // acaba de desbloquearla
  } catch {
    return false;
  }
}
