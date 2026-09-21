import { MineducQuizResult } from '../types';

export interface MineducUnitDefinition {
  id: string;
  numero: string;
  nombre: string;
  mes_estimado: string;
  enfoque: string;
  oas: string[];
  default_sample_id: string;
}

export interface NivelInfo {
  nivel: string;
  edad: string;
  etapa_cognitiva: string;
  enfoque_lenguaje: string;
  unidades: MineducUnitDefinition[];
}

export const MINEDUC_CURRICULUM_POR_NIVEL: Record<string, NivelInfo> = {
  '1° Básico': {
    nivel: '1° Básico',
    edad: '6 a 7 años',
    etapa_cognitiva: 'Lectoescritura inicial y decodificación guiada',
    enfoque_lenguaje: 'Textos canónicos de Leo Primero (Tomos 1 al 4), conciencia fonológica, vocabulario ilustrado y preguntas explícitas directas.',
    unidades: [
      {
        id: '1b-u1',
        numero: 'Unidad 1',
        nombre: 'Unidad 1: Primeros pasos en la lectura (Leo Primero Tomo 1)',
        mes_estimado: 'Marzo - Abril',
        enfoque: 'Lectura de narraciones canónicas ("La ostra que perdió su perla"), reconocimiento de vocales y consonantes iniciales.',
        oas: ['OA 03', 'OA 04'],
        default_sample_id: '1-basico-u1-ostra',
      },
      {
        id: '1b-u2',
        numero: 'Unidad 2',
        nombre: 'Unidad 2: Animales de nuestro país (Leo Primero Tomo 2)',
        mes_estimado: 'Mayo - Junio',
        enfoque: 'Textos informativos oficiales sobre fauna nativa chilena ("El sapo de Bullock") y hábitats del sur.',
        oas: ['OA 03', 'OA 05'],
        default_sample_id: '1-basico-u2-sapo-bullock',
      },
      {
        id: '1b-u3',
        numero: 'Unidad 3',
        nombre: 'Unidad 3: Seres vivos y curiosidades del entorno (Leo Primero Tomo 3)',
        mes_estimado: 'Julio - Septiembre',
        enfoque: 'Textos informativos de ciencias naturales escolares ("El caracol de jardín"), características y cuidados.',
        oas: ['OA 06', 'OA 07'],
        default_sample_id: '1-basico-u3-caracol',
      },
      {
        id: '1b-u4',
        numero: 'Unidad 4',
        nombre: 'Unidad 4: Celebraciones, familia y afectos (Leo Primero Tomo 4)',
        mes_estimado: 'Octubre - Diciembre',
        enfoque: 'Cuentos escolares de fin de año ("Un regalo para Mili"), empatía familiar y gratitud.',
        oas: ['OA 04', 'OA 05'],
        default_sample_id: '1-basico-u4-mili',
      },
    ],
  },

  '2° Básico': {
    nivel: '2° Básico',
    edad: '7 a 8 años',
    etapa_cognitiva: 'Fluidez lectora, secuencialidad y comprensión de textos reales',
    enfoque_lenguaje: 'Textos canónicos de Leo Primero (Tomos 1 al 6): fábulas tradicionales, cuentos clásicos y artículos informativos de divulgación.',
    unidades: [
      {
        id: '2b-u1',
        numero: 'Unidad 1',
        nombre: 'Unidad 1: Cuentos clásicos y secuencias (Leo Primero Tomo 1)',
        mes_estimado: 'Marzo - Abril',
        enfoque: 'Lectura canónica de "Ricitos de Oro y los tres osos", orden temporal de acciones y localización de detalles explícitos.',
        oas: ['OA 03', 'OA 04'],
        default_sample_id: '2-basico-u1-ricitos',
      },
      {
        id: '2b-u2',
        numero: 'Unidad 2',
        nombre: 'Unidad 2: Vida polar y textos informativos (Leo Primero Tomos 1 y 2)',
        mes_estimado: 'Mayo - Junio',
        enfoque: 'Lectura del texto científico oficial "El pingüino emperador", hábitat antártico y características anatómicas.',
        oas: ['OA 06', 'OA 07'],
        default_sample_id: '2-basico-u2-pinguino',
      },
      {
        id: '2b-u3',
        numero: 'Unidad 3',
        nombre: 'Unidad 3: Fábulas y enseñanzas de vida (Leo Primero Tomo 2)',
        mes_estimado: 'Julio - Septiembre',
        enfoque: 'Lectura de "La cigarra y la hormiga", comprensión de moralejas, previsión y valor del trabajo constante.',
        oas: ['OA 04', 'OA 05'],
        default_sample_id: '2-basico-u3-cigarra',
      },
      {
        id: '2b-u4',
        numero: 'Unidad 4',
        nombre: 'Unidad 4: Inventos, transporte y vida cotidiana (Leo Primero Tomo 3)',
        mes_estimado: 'Octubre - Diciembre',
        enfoque: 'Lectura del artículo "La historia de la bicicleta", evolución de los medios de transporte y tecnología escolar.',
        oas: ['OA 06', 'OA 07'],
        default_sample_id: '2-basico-u4-bicicleta',
      },
    ],
  },

  '3° Básico': {
    nivel: '3° Básico',
    edad: '8 a 9 años',
    etapa_cognitiva: 'Comprensión inferencial, cuentos tradicionales y mitología',
    enfoque_lenguaje: 'Textos del Estudiante Mineduc: cuentos tradicionales de animales, leyendas originarias, tradiciones costeras y poesía lírica.',
    unidades: [
      {
        id: '3b-u1',
        numero: 'Unidad 1',
        nombre: 'Unidad 1: Historias tradicionales y astucia en el bosque',
        mes_estimado: 'Marzo - Abril',
        enfoque: 'Lectura de "El tigre negro y el venado blanco", análisis de personajes antagónicos y resolución de conflictos.',
        oas: ['OA 03', 'OA 04'],
        default_sample_id: '3-basico-u1-tigre-venado',
      },
      {
        id: '3b-u2',
        numero: 'Unidad 2',
        nombre: 'Unidad 2: Leyendas de nuestra tierra y pueblos originarios',
        mes_estimado: 'Mayo - Junio',
        enfoque: 'Lectura de "La leyenda del copihue", tradición mapuche y significado cultural de los símbolos naturales.',
        oas: ['OA 03', 'OA 04'],
        default_sample_id: '3-basico-u2-copihue-leyenda',
      },
      {
        id: '3b-u3',
        numero: 'Unidad 3',
        nombre: 'Unidad 3: El mar de Chile, mitos y patrimonio de Chiloé',
        mes_estimado: 'Julio - Septiembre',
        enfoque: 'Lectura de "La Pincoya: guardiana de los mares de Chiloé", pesca artesanal, respeto ecológico y creencias isleñas.',
        oas: ['OA 04', 'OA 05'],
        default_sample_id: '3-basico-u3-pincoya',
      },
      {
        id: '3b-u4',
        numero: 'Unidad 4',
        nombre: 'Unidad 4: Poesía chilena y rimas del corazón',
        mes_estimado: 'Octubre - Diciembre',
        enfoque: 'Lectura e interpretación de poemas de Gabriela Mistral ("Dame la mano"), lenguaje figurado y fraternidad.',
        oas: ['OA 05', 'OA 06'],
        default_sample_id: '3-basico-u4-dame-la-mano',
      },
    ],
  },

  '4° Básico': {
    nivel: '4° Básico',
    edad: '9 a 10 años',
    etapa_cognitiva: 'Análisis inferencial avanzado, reportajes y pensamiento crítico',
    enfoque_lenguaje: 'Textos del Estudiante Mineduc: novelas breves de autores clásicos, leyendas de la Araucanía, reportajes astronómicos y obras dramáticas.',
    unidades: [
      {
        id: '4b-u1',
        numero: 'Unidad 1',
        nombre: 'Unidad 1: Relatos de esfuerzo, nobleza y familia',
        mes_estimado: 'Marzo - Abril',
        enfoque: 'Lectura de "El pequeño escribiente florentino" (Edmondo de Amicis), dilemas éticos y amor filial.',
        oas: ['OA 03', 'OA 04'],
        default_sample_id: '4-basico-u1-escribiente',
      },
      {
        id: '4b-u2',
        numero: 'Unidad 2',
        nombre: 'Unidad 2: Mitos y cosmovisión de los pueblos originarios',
        mes_estimado: 'Mayo - Junio',
        enfoque: 'Lectura de "La leyenda del Pehuén", pueblo pehuenche, flora nativa andina y superación comunitaria.',
        oas: ['OA 03', 'OA 04'],
        default_sample_id: '4-basico-u2-pehuen',
      },
      {
        id: '4b-u3',
        numero: 'Unidad 3',
        nombre: 'Unidad 3: Ciencia, astronomía y el Desierto de Atacama',
        mes_estimado: 'Julio - Septiembre',
        enfoque: 'Lectura del reportaje "Observatorios astronómicos en el norte de Chile", avances científicos y divulgación.',
        oas: ['OA 06', 'OA 07'],
        default_sample_id: '4-basico-u3-astronomia',
      },
      {
        id: '4b-u4',
        numero: 'Unidad 4',
        nombre: 'Unidad 4: Textos dramáticos y teatro escolar',
        mes_estimado: 'Octubre - Diciembre',
        enfoque: 'Lectura de la obra "El rey que no quería bañarse", acotaciones teatrales, personajes cómicos y diálogos.',
        oas: ['OA 04', 'OA 05'],
        default_sample_id: '4-basico-u4-teatro',
      },
    ],
  },
};

export function getUnitsForNivel(nivel: string): MineducUnitDefinition[] {
  const info = MINEDUC_CURRICULUM_POR_NIVEL[nivel] || MINEDUC_CURRICULUM_POR_NIVEL['2° Básico'];
  return info.unidades;
}

export function getNivelInfo(nivel: string): NivelInfo {
  return MINEDUC_CURRICULUM_POR_NIVEL[nivel] || MINEDUC_CURRICULUM_POR_NIVEL['2° Básico'];
}

// 16 Authentic quizzes calibrated to the official Chilean school textbooks:
export const DEFAULT_QUIZZES_BY_GRADE_AND_UNIT: Record<string, MineducQuizResult> = {
  // ==================== 1° BÁSICO (LEO PRIMERO) ====================
  '1° Básico_Unidad 1': {
    nivel: '1° Básico',
    unidad: 'Unidad 1: Primeros pasos en la lectura (Leo Primero Tomo 1)',
    mes_estimado: 'Marzo - Abril',
    objetivos_aprendizaje: ['OA 03', 'OA 04'],
    titulo_texto: 'La historia de la ostra que perdió su perla',
    texto_oficial: `Había una vez una pequeña ostra que vivía en el fondo del mar. Un día, una corriente de agua fría arrastró su perla brillante y la ostra se puso muy triste. Lloraba desconsolada cuando un pececito dorado pasó nadando a su lado y le preguntó por qué lloraba. La ostra le contó su pena. El pececito quiso ayudarla y buscó por todo el océano algo redondo y hermoso: le trajo una piedrita verde, pero era muy áspera; luego una conchita roja, pero era muy dura. Finalmente, el pececito encontró una gota de rocío marino mágica que brillaba bajo la luz del sol. La ostra colocó la gota dentro de su concha y sonrió feliz, agradeciendo a su nuevo amigo por su gran corazón.`,
    eje_tematico: 'Comprensión Lectora',
    oa: 'OA 03: Comprender textos breves y familiares',
    preguntas: [
      {
        id_pregunta: 1,
        enunciado: '¿Qué perdió la pequeña ostra en el fondo del mar?',
        opciones: {
          A: 'Su concha',
          B: 'Su perla brillante',
          C: 'Su comida',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Muy bien! El texto dice que una corriente de agua arrastró su perla brillante.',
        retroalimentacion_negativa: 'Vuelve a mirar el comienzo: la ostra lloraba porque perdió su perla.',
      },
      {
        id_pregunta: 2,
        enunciado: '¿Quién ayudó a la ostra a buscar un nuevo tesoro?',
        opciones: {
          A: 'Un pececito dorado',
          B: 'Un cangrejo gigante',
          C: 'Un pulpo dormilón',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Excelente! Un pececito dorado pasó nadando y buscó objetos para animar a la ostra.',
        retroalimentacion_negativa: 'Recuerda el amigo que nadó por todo el océano para ayudarla.',
      },
      {
        id_pregunta: 3,
        enunciado: '¿Por qué la ostra no se quedó con la conchita roja que le trajo el pez?',
        opciones: {
          A: 'Porque era muy dura',
          B: 'Porque era fea',
          C: 'Porque se cayó a la arena',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Gran atención! La conchita roja era muy dura para guardarla dentro.',
        retroalimentacion_negativa: 'El texto menciona que la conchita roja era demasiado dura.',
      },
      {
        id_pregunta: 4,
        enunciado: '¿Cómo era la actitud del pececito con la ostra?',
        opciones: {
          A: 'Enojona y gritona',
          B: 'Bondadosa, solidaria y paciente',
          C: 'Burlona',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Maravilloso! El pez demostró tener un gran corazón al no rendirse hasta verla feliz.',
        retroalimentacion_negativa: 'Piensa en todo lo que hizo el pececito para que la ostra dejara de llorar.',
      },
    ],
  },

  '1° Básico_Unidad 2': {
    nivel: '1° Básico',
    unidad: 'Unidad 2: Animales de nuestro país (Leo Primero Tomo 2)',
    mes_estimado: 'Mayo - Junio',
    objetivos_aprendizaje: ['OA 03', 'OA 05'],
    titulo_texto: 'El sapo de Bullock',
    texto_oficial: `El sapo de Bullock es un pequeño anfibio que vive únicamente en los bosques del sur de Chile, especialmente en la cordillera de Nahuelbuta. Su piel es rugosa y de color café con manchas oscuras que le permiten camuflarse entre la hojarasca húmeda. A diferencia de otros sapos, no salta grandes distancias, sino que camina lentamente sobre el suelo del bosque. Se alimenta de pequeños insectos y lombrices que caza durante la noche. Como quedan muy pocos sapos de Bullock en nuestro país, es una especie protegida que todos debemos cuidar para que sus bosques sigan existiendo.`,
    eje_tematico: 'Textos Informativos',
    oa: 'OA 05: Extraer información de textos no literarios',
    preguntas: [
      {
        id_pregunta: 1,
        enunciado: '¿En qué lugar de Chile habita el sapo de Bullock?',
        opciones: {
          A: 'En las playas de Arica',
          B: 'En los bosques del sur, en la cordillera de Nahuelbuta',
          C: 'En el centro de la ciudad',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Correcto! Es un animal endémico que habita en la cordillera de Nahuelbuta.',
        retroalimentacion_negativa: 'Revisa el primer párrafo del texto donde se indica su hogar en el sur de Chile.',
      },
      {
        id_pregunta: 2,
        enunciado: '¿Cómo se desplaza el sapo de Bullock según la lectura?',
        opciones: {
          A: 'Camina lentamente sobre el suelo',
          B: 'Vuela entre los árboles',
          C: 'Da saltos gigantes por el aire',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Muy bien! A diferencia de otros sapos, este camina despacito.',
        retroalimentacion_negativa: 'El texto explica que no salta grandes distancias, sino que camina lentamente.',
      },
      {
        id_pregunta: 3,
        enunciado: '¿Para qué le sirve el color café y con manchas oscuras de su piel?',
        opciones: {
          A: 'Para asustar a los niños',
          B: 'Para camuflarse y esconderse entre las hojas húmedas',
          C: 'Para nadar más rápido',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Excelente deducción! Su color le permite pasar desapercibido entre la hojarasca.',
        retroalimentacion_negativa: 'Piensa en cómo se esconden los animales que tienen el mismo color que la tierra y las hojas.',
      },
      {
        id_pregunta: 4,
        enunciado: '¿Por qué se dice que el sapo de Bullock es una "especie protegida"?',
        opciones: {
          A: 'Porque quedan muy pocos y debemos cuidar su bosque para que no desaparezca',
          B: 'Porque vive dentro de una jaula en una casa',
          C: 'Porque duerme todo el año',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Extraordinario! Proteger a una especie significa cuidar su vida y su entorno.',
        retroalimentacion_negativa: 'El texto advierte que quedan muy poquitos y por eso debemos cuidar sus bosques.',
      },
    ],
  },

  '1° Básico_Unidad 3': {
    nivel: '1° Básico',
    unidad: 'Unidad 3: Seres vivos y curiosidades del entorno (Leo Primero Tomo 3)',
    mes_estimado: 'Julio - Septiembre',
    objetivos_aprendizaje: ['OA 06', 'OA 07'],
    titulo_texto: 'El caracol de jardín',
    texto_oficial: `El caracol de jardín es un molusco que lleva su casa a cuestas: una concha en espiral que lo protege del frío, del calor y de los animales que quieren comerlo. En su cabeza tiene cuatro tentáculos; en los dos más largos se encuentran sus ojos, y con los dos más cortos huele y toca el suelo. Para desplazarse, el caracol produce una sustancia babosa y brillante que le permite deslizarse suavemente sobre hojas, ramas y piedras sin lastimarse. Le encanta comer hojas tiernas y sale de paseo cuando el suelo está húmedo después de la lluvia.`,
    eje_tematico: 'Comprensión de Ciencias',
    oa: 'OA 06: Leer textos informativos sencillos',
    preguntas: [
      {
        id_pregunta: 1,
        enunciado: '¿Dónde tiene ubicados sus ojos el caracol de jardín?',
        opciones: {
          A: 'En su cola',
          B: 'En los dos tentáculos más largos de su cabeza',
          C: 'En su concha',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Exacto! El caracol tiene sus ojos en los tentáculos superiores más largos.',
        retroalimentacion_negativa: 'Revisa con cuidado la parte que describe los cuatro tentáculos de su cabeza.',
      },
      {
        id_pregunta: 2,
        enunciado: '¿Qué función cumple la sustancia babosa que produce el caracol?',
        opciones: {
          A: 'Le permite deslizarse suavemente sin herirse con las piedras',
          B: 'Sirve para regar las plantas',
          C: 'La usa para tomar agua',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Muy bien! Esa baba protectora cuida su cuerpo blandito del suelo áspero.',
        retroalimentacion_negativa: 'El texto señala que le ayuda a deslizarse sobre ramas y piedras sin lastimarse.',
      },
      {
        id_pregunta: 3,
        enunciado: '¿Cuándo prefiere salir a pasear el caracol de jardín?',
        opciones: {
          A: 'Al mediodía con mucho sol',
          B: 'Cuando el suelo está húmedo después de la lluvia',
          C: 'Durante tormentas de nieve',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Correcto! A los caracoles les fascina la humedad que deja la lluvia en el suelo.',
        retroalimentacion_negativa: 'Revisa la última oración del texto: menciona cuándo sale de paseo.',
      },
      {
        id_pregunta: 4,
        enunciado: '¿Para qué le sirve la concha en espiral al caracol?',
        opciones: {
          A: 'Para volar de flor en flor',
          B: 'Como un refugio protector contra el frío, el calor y los depredadores',
          C: 'Para hacer sonar música',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Excelente! Su concha es como su propia casita donde se esconde para estar a salvo.',
        retroalimentacion_negativa: 'El caracol entra en su concha cuando hay peligro o clima extremo.',
      },
    ],
  },

  '1° Básico_Unidad 4': {
    nivel: '1° Básico',
    unidad: 'Unidad 4: Celebraciones, familia y afectos (Leo Primero Tomo 4)',
    mes_estimado: 'Octubre - Diciembre',
    objetivos_aprendizaje: ['OA 04', 'OA 05'],
    titulo_texto: 'Un regalo para Mili',
    texto_oficial: `Hoy es el cumpleaños de Mili y en su casa todos están de fiesta. Mili despierta temprano esperando su sorpresa favorita. Su mamá entra a la pieza con una hermosa caja envuelta en papel brillante con un lazo amarillo. Mili abre el paquete con emoción y encuentra una linda mochila bordada con una luna y estrellas de colores, junto a su libro de cuentos preferido. Mili abraza fuerte a su mamá y le da un beso sonoro en la mejilla, agradecida por el cariño y la dedicación con que prepararon su día especial.`,
    eje_tematico: 'Lectura Narrativa',
    oa: 'OA 04: Demostrar comprensión de narraciones',
    preguntas: [
      {
        id_pregunta: 1,
        enunciado: '¿Qué acontecimiento especial se celebra hoy en la casa de Mili?',
        opciones: {
          A: 'La llegada del verano',
          B: 'El cumpleaños de Mili',
          C: 'El regreso de un viaje',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Muy bien! Es el cumpleaños de Mili y su familia preparó una sorpresa.',
        retroalimentacion_negativa: 'Lee con atención la primera frase del texto: "Hoy es el cumpleaños de Mili...".',
      },
      {
        id_pregunta: 2,
        enunciado: '¿Qué regalos venían dentro del paquete sorpresa?',
        opciones: {
          A: 'Una mochila bordada con lunas y estrellas, y un libro de cuentos',
          B: 'Una bicicleta azul y unos patines',
          C: 'Solo una caja de chocolates',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Exacto! El regalo era una mochila bordada especial y su libro preferido.',
        retroalimentacion_negativa: 'Vuelve a revisar la descripción de lo que encontró Mili al abrir el paquete.',
      },
      {
        id_pregunta: 3,
        enunciado: '¿Cómo reaccionó Mili al recibir el regalo de su mamá?',
        opciones: {
          A: 'Se puso a llorar de enojo',
          B: 'La abrazó fuerte y le dio un beso cariñoso en la mejilla',
          C: 'Salió corriendo a la calle',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Excelente! Mili demostró su felicidad y agradecimiento con un abrazo y un beso.',
        retroalimentacion_negativa: 'Observa la reacción afectuosa de Mili al final del cuento.',
      },
      {
        id_pregunta: 4,
        enunciado: '¿Qué valor familiar se destaca principalmente en este cuento?',
        opciones: {
          A: 'El amor, el agradecimiento y el cariño compartido en familia',
          B: 'El egoísmo de guardar las cosas solo para uno',
          C: 'El apuro por salir temprano',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Qué hermosa respuesta! La historia resalta los lazos de cariño y gratitud familiar.',
        retroalimentacion_negativa: 'Piensa en el amor con el que la mamá preparó el regalo y la gratitud de Mili.',
      },
    ],
  },

  // ==================== 2° BÁSICO (LEO PRIMERO) ====================
  '2° Básico_Unidad 1': {
    nivel: '2° Básico',
    unidad: 'Unidad 1: Cuentos clásicos y secuencias (Leo Primero Tomo 1)',
    mes_estimado: 'Marzo - Abril',
    objetivos_aprendizaje: ['OA 03', 'OA 04'],
    titulo_texto: 'Ricitos de Oro y los tres osos',
    texto_oficial: `Había una vez una niña llamada Ricitos de Oro por sus cabellos rubios y brillantes. Una tarde salió a pasear por el bosque y llegó a una hermosa casita cuya puerta estaba entreabierta. En la cocina vio una mesa con tres tazones de sopa: uno grande, uno mediano y uno pequeño. Probó la sopa del tazón grande, pero estaba muy caliente; probó la del tazón mediano, pero estaba muy fría; probó la del tazón pequeño, y como estaba en su punto, se la tomó todita. Luego fue a la sala donde había tres sillas. La silla grande era muy dura, la mediana muy blanda, y la pequeña era tan cómoda que al sentarse ¡la rompió! Cansada, subió al dormitorio y se acostó en la cama pequeña, quedándose profundamente dormida. Al poco rato regresaron los dueños de casa: Papá Oso, Mamá Osa y el pequeño Osito.`,
    eje_tematico: 'Comprensión Lectora - Cuento Canónico',
    oa: 'OA 04: Secuencia y localización de información explícita e implícita',
    preguntas: [
      {
        id_pregunta: 1,
        enunciado: '¿Por qué Ricitos de Oro eligió tomarse la sopa del tazón pequeño?',
        opciones: {
          A: 'Porque estaba en su punto ideal (ni muy caliente ni muy fría)',
          B: 'Porque era la más grande de la mesa',
          C: 'Porque era de color verde',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Excelente! Ricitos probó las tres sopas y la del tazón pequeño era la que tenía la temperatura perfecta.',
        retroalimentacion_negativa: 'Recuerda que la grande estaba muy caliente y la mediana muy fría; la pequeña estaba en su punto justo.',
      },
      {
        id_pregunta: 2,
        enunciado: '¿Qué le ocurrió a la silla del Osito cuando Ricitos de Oro se sentó en ella?',
        opciones: {
          A: 'Se cayó por la ventana',
          B: 'Se rompió porque no resistió su peso',
          C: 'Se convirtió en un columpio',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Muy bien! El texto dice expresamente que la sillita era tan pequeña y cómoda que ¡la rompió!',
        retroalimentacion_negativa: 'Vuelve al momento en que Ricitos entra a la sala y prueba las tres sillas.',
      },
      {
        id_pregunta: 3,
        enunciado: '¿Cuál es la secuencia correcta de lo que hizo Ricitos de Oro en la casa de los osos?',
        opciones: {
          A: 'Durmió en la cama, probó las sopas y después rompió la silla',
          B: 'Probó las sopas en la cocina, probó las sillas en la sala y se durmió en la cama pequeña',
          C: 'Esperó a los osos en la puerta y merendó con ellos',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Brillante orden cronológico! Primero fue la cocina (sopas), luego la sala (sillas) y por último el dormitorio (camas).',
        retroalimentacion_negativa: 'Fíjate en las habitaciones que Ricitos fue recorriendo una tras otra en el relato.',
      },
      {
        id_pregunta: 4,
        enunciado: '¿Qué opinas del comportamiento de Ricitos de Oro al entrar a una casa ajena y usar las cosas de los osos?',
        opciones: {
          A: 'Estuvo mal, porque entró sin permiso a una casa que no era suya y dañó pertenencias ajenas',
          B: 'Estuvo muy bien, porque tenía hambre y cualquiera puede entrar a una casa ajena',
          C: 'Dio lo mismo porque los osos no estaban',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Excelente reflexión ética! En la convivencia escolar y social debemos respetar los hogares y pertenencias de los demás.',
        retroalimentacion_negativa: 'Piensa en cómo te sentirías si una persona desconocida entrara a tu casa sin permiso y rompiera tus cosas.',
      },
    ],
  },

  '2° Básico_Unidad 2': {
    nivel: '2° Básico',
    unidad: 'Unidad 2: Vida polar y textos informativos (Leo Primero Tomos 1 y 2)',
    mes_estimado: 'Mayo - Junio',
    objetivos_aprendizaje: ['OA 06', 'OA 07'],
    titulo_texto: 'El pingüino emperador',
    texto_oficial: `El pingüino emperador es el más grande y pesado de todos los pingüinos del planeta. Vive en los fríos hielos de la Antártida, donde soplan vientos helados. Para protegerse del clima extremo, tiene cuatro capas de plumas apretadas e impermeables y una gruesa capa de grasa bajo su piel. Aunque es un ave, el pingüino emperador no vuela en el aire, pero es un extraordinario nadador gracias a sus alas en forma de aletas y su cuerpo alargado. Puede sumergirse a más de quinientos metros de profundidad para cazar peces, calamares y krill. Durante el crudo invierno polar, el macho cuida con paciencia el único huevo sobre sus patas, cubriéndolo con un pliegue de su piel tibia mientras la hembra viaja al mar abierto en busca de alimento.`,
    eje_tematico: 'Texto Informativo de Ciencias Naturales',
    oa: 'OA 06: Leer comprensivamente textos informativos del texto escolar',
    preguntas: [
      {
        id_pregunta: 1,
        enunciado: '¿Dónde vive naturalmente el pingüino emperador?',
        opciones: {
          A: 'En la selva amazónica',
          B: 'En los hielos de la Antártida',
          C: 'En el desierto caluroso',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Correcto! El pingüino emperador habita en el continente antártico.',
        retroalimentacion_negativa: 'Revisa el primer párrafo: vive en los hielos de la Antártida con clima helado.',
      },
      {
        id_pregunta: 2,
        enunciado: '¿Qué adaptaciones físicas le permiten al pingüino soportar el frío polar extremo?',
        opciones: {
          A: 'Usa bufandas de lana',
          B: 'Tiene cuatro capas de plumas impermeables y una gruesa capa de grasa bajo la piel',
          C: 'Enciende pequeñas fogatas en el hielo',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Muy bien! Sus plumas densas e impermeables y su grasa corporal aíslan el calor.',
        retroalimentacion_negativa: 'Vuelve a leer el segundo enunciado sobre sus capas de plumas y grasa.',
      },
      {
        id_pregunta: 3,
        enunciado: '¿Qué labor asume el macho durante el crudo invierno antártico?',
        opciones: {
          A: 'Viaja de vacaciones a zonas cálidas',
          B: 'Cuida el huevo sobre sus patas protegiéndolo con un pliegue de su piel',
          C: 'Construye un nido con ramas altas en los árboles',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Excelente! El macho cuida el huevo con inmenso amor y paciencia sobre sus patas para que no toque el hielo.',
        retroalimentacion_negativa: 'Observa la última oración del texto sobre el cuidado del huevo por parte del padre.',
      },
      {
        id_pregunta: 4,
        enunciado: 'A pesar de ser un ave, ¿por qué el pingüino emperador se desplaza nadando en lugar de volar?',
        opciones: {
          A: 'Porque sus alas evolucionaron en aletas adaptadas para bucear a gran profundidad en el océano',
          B: 'Porque le da miedo el cielo',
          C: 'Porque tiene sueño',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Impresionante deducción biológica! Sus alas funcionan como poderosos remos submarinos.',
        retroalimentacion_negativa: 'El texto explica que sus alas tienen forma de aletas para nadar y cazar peces bajo el agua.',
      },
    ],
  },

  '2° Básico_Unidad 3': {
    nivel: '2° Básico',
    unidad: 'Unidad 3: Fábulas y enseñanzas de vida (Leo Primero Tomo 2)',
    mes_estimado: 'Julio - Septiembre',
    objetivos_aprendizaje: ['OA 04', 'OA 05'],
    titulo_texto: 'La cigarra y la hormiga',
    texto_oficial: `Durante los cálidos meses de verano, una alegre cigarra cantaba y descansaba tendida sobre una rama verde. A su lado pasaba sin descanso una hormiguita, cargando pesados granos de trigo sobre sus espaldas hacia su hormiguero. "¿Por qué trabajas tanto con este calor?", le decía la cigarra riendo. "Deberías cantar y disfrutar como yo". La hormiga, secándose el sudor, le respondió: "Guardo provisiones para el invierno, y te aconsejo que hagas lo mismo". La cigarra no hizo caso y continuó holgazaneando. Pero cuando llegó el invierno con sus lluvias frías y la nieve cubrió los campos, la cigarra no encontró ni una sola semilla para comer. Temblando de frío y hambre, tocó la puerta de la hormiga rogando por un poco de comida. La hormiga le preguntó: "¿Qué hiciste en el verano mientras yo trabajaba?". "Cantaba feliz", respondió la cigarra. "Pues si cantabas en verano, ahora te toca bailar en invierno", sentenció la hormiga cerrando su puerta.`,
    eje_tematico: 'Fábula Tradicional Escolar',
    oa: 'OA 05: Interpretar fábulas y comprender la moraleja',
    preguntas: [
      {
        id_pregunta: 1,
        enunciado: '¿Qué hacía la hormiga durante todo el verano mientras la cigarra cantaba?',
        opciones: {
          A: 'Dormía largas siestas a la sombra',
          B: 'Trabajaba sin descanso acarreando granos de trigo hacia su hormiguero',
          C: 'Nadaba en los charcos de agua',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Excelente! La hormiga recolectaba y guardaba provisiones para cuando llegara el invierno.',
        retroalimentacion_negativa: 'Revisa las acciones de la hormiga en el primer párrafo del texto.',
      },
      {
        id_pregunta: 2,
        enunciado: '¿Qué le ocurrió a la cigarra cuando llegó el invierno frío y la nieve?',
        opciones: {
          A: 'Tenía abundantes frutos y semillas en su casa',
          B: 'No encontró nada para comer y temblaba de frío y hambre',
          C: 'Construyó un nuevo refugio caliente',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Muy bien! Como no previó nada, la cigarra se quedó sin alimentos ni abrigo.',
        retroalimentacion_negativa: 'Vuelve al momento en que el invierno cubre los campos con nieve.',
      },
      {
        id_pregunta: 3,
        enunciado: 'Cuando la hormiga le dice: "Si cantabas en verano, ahora te toca bailar en invierno", significa que:',
        opciones: {
          A: 'La invita a una fiesta de baile en la nieve',
          B: 'Debe asumir las difíciles consecuencias de haber perdido el tiempo sin prepararse',
          C: 'Quiere que le enseñe una nueva coreografía',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Magnífica comprensión del lenguaje figurado! La frase es un reproche por su falta de previsión y esfuerzo.',
        retroalimentacion_negativa: 'Piensa en el sentido de la respuesta: no es una fiesta real, sino una lección dura por no haber trabajado.',
      },
      {
        id_pregunta: 4,
        enunciado: '¿Cuál es la enseñanza o moraleja principal de esta fábula?',
        opciones: {
          A: 'Que es bueno descansar siempre y esperar que otros nos den comida',
          B: 'El valor de la previsión, el esfuerzo constante y la responsabilidad ante el futuro',
          C: 'Que no hay que cantar nunca',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Extraordinario! La moraleja enseña que quien trabaja con previsión tendrá seguridad en los momentos difíciles.',
        retroalimentacion_negativa: 'Reflexiona sobre lo que nos enseña la comparación entre la actitud de la hormiga y la cigarra.',
      },
    ],
  },

  '2° Básico_Unidad 4': {
    nivel: '2° Básico',
    unidad: 'Unidad 4: Inventos, transporte y vida cotidiana (Leo Primero Tomo 3)',
    mes_estimado: 'Octubre - Diciembre',
    objetivos_aprendizaje: ['OA 06', 'OA 07'],
    titulo_texto: 'La historia de la bicicleta',
    texto_oficial: `La bicicleta no siempre fue como la conocemos hoy. Hace más de doscientos años, un inventor alemán creó un vehículo de madera con dos ruedas alineadas llamado draisiana. Esta primera máquina no tenía pedales, ni cadenas, ni frenos: la persona se sentaba en un asiento y debía impulsarse empujando el suelo fuertemente con sus pies, como si fuera corriendo sentado. Años más tarde, otros inventores agregaron pedales conectados directamente a una rueda delantera gigante de metal. Manejarla era peligroso porque los ciclistas caían desde gran altura al perder el equilibrio. Finalmente, a fines del siglo diecinueve, se crearon las bicicletas con ruedas del mismo tamaño, cadena metálica, neumáticos de goma inflados con aire y frenos en el manubrio, convirtiéndose en el medio de transporte limpio, económico y saludable que millones de personas usan hoy en todo el mundo.`,
    eje_tematico: 'Texto Informativo de Tecnología y Sociedad',
    oa: 'OA 06: Comprender textos informativos sobre inventos y evolución',
    preguntas: [
      {
        id_pregunta: 1,
        enunciado: '¿Cómo se impulsaba la "draisiana", el primer antepasado de la bicicleta?',
        opciones: {
          A: 'Con un motor a bencina',
          B: 'Empujando el suelo con los pies, corriendo sentado en el asiento de madera',
          C: 'Con pedales en las dos ruedas',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Exacto! Como no tenía pedales ni cadena, el conductor se impulsaba caminando o corriendo con sus propios pies.',
        retroalimentacion_negativa: 'Lee con atención la descripción de la máquina de madera inventada por el alemán.',
      },
      {
        id_pregunta: 2,
        enunciado: '¿Por qué las bicicletas con rueda delantera gigante eran peligrosas para los ciclistas?',
        opciones: {
          A: 'Porque iban a más de cien kilómetros por hora',
          B: 'Porque si perdían el equilibrio, caían desde gran altura al suelo',
          C: 'Porque se pinchaban los neumáticos a cada rato',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Muy bien localizado! La rueda era tan alta que cualquier caída resultaba muy peligrosa.',
        retroalimentacion_negativa: 'Revisa el segundo párrafo donde se explica por qué los ciclistas se caían de gran altura.',
      },
      {
        id_pregunta: 3,
        enunciado: '¿Qué elementos modernos hicieron que la bicicleta fuera mucho más segura y cómoda a fines del siglo diecinueve?',
        opciones: {
          A: 'Ruedas del mismo tamaño, neumáticos inflados con aire, cadena y frenos en el manubrio',
          B: 'Ruedas de piedra y timón de barco',
          C: 'Alas de tela para planear en las bajadas',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Gran precisión! Esos inventos transformaron la bicicleta en el vehículo seguro que usamos hoy.',
        retroalimentacion_negativa: 'Revisa las mejoras mencionadas hacia el final del texto.',
      },
      {
        id_pregunta: 4,
        enunciado: '¿Por qué hoy en día la bicicleta es considerada un medio de transporte muy positivo?',
        opciones: {
          A: 'Porque no contamina el aire (limpio), es económico y hace bien para la salud',
          B: 'Porque usa mucha gasolina cara',
          C: 'Porque hace mucho ruido en las calles',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Excelente conclusión ciudadana! La bicicleta cuida el medio ambiente y fortalece nuestro cuerpo.',
        retroalimentacion_negativa: 'Piensa en las tres ventajas que destaca el autor en la última oración del texto.',
      },
    ],
  },

  // ==================== 3° BÁSICO (TEXTO DEL ESTUDIANTE MINEDUC) ====================
  '3° Básico_Unidad 1': {
    nivel: '3° Básico',
    unidad: 'Unidad 1: Historias tradicionales y astucia en el bosque',
    mes_estimado: 'Marzo - Abril',
    objetivos_aprendizaje: ['OA 03', 'OA 04'],
    titulo_texto: 'El tigre negro y el venado blanco',
    texto_oficial: `El tigre negro y el venado blanco vivían en el mismo bosque y, sin conocerse, ambos decidieron construir una casa en el mismo claro de la selva. El venado blanco llegó primero por la mañana, cortó los árboles y despejó el terreno. Por la tarde llegó el tigre negro, vio el sitio limpio y pensó: "Qué dios tan bondadoso me ha preparado el terreno", y levantó las cuatro paredes de madera. Al día siguiente, el venado regresó, vio los muros y techó la vivienda con hojas de palma. Cuando la casa estuvo lista, ambos llegaron al atardecer y se miraron sorprendidos al descubrir que compartían el mismo techo. Decidieron convivir en paz dividiendo las habitaciones, pero en secreto cada uno desconfiaba del otro. La tensión creció hasta que una noche de tormenta, asustados por ruidos en la oscuridad, ambos salieron huyendo despavoridos en direcciones contrarias, dejando la hermosa casa completamente vacía en medio de la selva.`,
    eje_tematico: 'Cuento Tradicional',
    oa: 'OA 04: Analizar la trama y motivaciones de los personajes',
    preguntas: [
      {
        id_pregunta: 1,
        enunciado: '¿Cómo lograron construir la casa entre el tigre y el venado sin haberse conocido antes?',
        opciones: {
          A: 'Contrataron a un castor carpintero',
          B: 'Cada uno trabajaba en horarios distintos creyendo que un dios bondadoso le ayudaba',
          C: 'Siguieron un plano dibujado en una piedra',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Excelente! El venado trabajaba en la mañana y el tigre en la tarde, completando la obra por coincidencia.',
        retroalimentacion_negativa: 'Observa cómo el venado despejó el suelo, el tigre levantó las paredes y el venado puso el techo sin verse.',
      },
      {
        id_pregunta: 2,
        enunciado: '¿Por qué ninguno de los dos animales pudo vivir tranquilo en la casa compartida?',
        opciones: {
          A: 'Porque la casa era demasiado helada',
          B: 'Porque en secreto desconfiaban y se temían el uno al otro',
          C: 'Porque la comida se llenó de hormigas',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Muy bien! A pesar de su acuerdo de paz, el miedo mutuo y la falta de confianza no los dejaba dormir en calma.',
        retroalimentacion_negativa: 'El texto señala que "en secreto cada uno desconfiaba del otro".',
      },
      {
        id_pregunta: 3,
        enunciado: '¿Qué provocó el desenlace final donde ambos abandonan la vivienda?',
        opciones: {
          A: 'Un incendio forestal',
          B: 'Los ruidos de una noche de tormenta que asustaron a ambos haciéndolos huir despavoridos',
          C: 'La llegada de un cazador',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Gran comprensión de la causa y efecto! El pánico provocado por la tormenta desató la huida en sentidos opuestos.',
        retroalimentacion_negativa: 'Revisa lo que ocurre la noche de tormenta en la casa compartida.',
      },
      {
        id_pregunta: 4,
        enunciado: '¿Qué lección podemos extraer sobre la importancia de la comunicación sincera en la convivencia?',
        opciones: {
          A: 'Que cuando no hay confianza ni diálogo verdadero, el miedo infundado termina destruyendo los proyectos comunes',
          B: 'Que es mejor no construir casas nunca',
          C: 'Que los tigres siempre ganan',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Extraordinario pensamiento crítico! Sin diálogo honesto y confianza, la convivencia se vuelve insostenible.',
        retroalimentacion_negativa: 'Piensa en qué habría pasado si ambos hubieran conversado con franqueza en lugar de temerse en silencio.',
      },
    ],
  },

  '3° Básico_Unidad 2': {
    nivel: '3° Básico',
    unidad: 'Unidad 2: Leyendas de nuestra tierra y pueblos originarios',
    mes_estimado: 'Mayo - Junio',
    objetivos_aprendizaje: ['OA 03', 'OA 04'],
    titulo_texto: 'La leyenda del copihue',
    texto_oficial: `Cuenta la tradición mapuche que hace muchos siglos, en los frondosos bosques del sur de Chile, vivían dos jóvenes pertenecientes a tribus rivales: la hermosa princesa Hues y el valiente príncipe Copih. A pesar de los conflictos entre sus pueblos, ambos se enamoraron profundamente y se encontraban en secreto en un claro junto a una hermosa laguna rodeada de canelos. Enterados los caciques de ambas tribus de estos encuentros clandestinos, los descubrieron y la tragedia alcanzó a los dos enamorados. Arrepentidas por el dolor causado, las familias lloraron durante un año completo. Pasado ese tiempo, los miembros de ambas tribus se reunieron en la laguna y descubrieron enredaderas que trepaban por los árboles altos, de cuyas ramas colgaban flores rojas en forma de campanas alargadas. En memoria del amor de los jóvenes, llamaron a la flor nacional "Copihue", símbolo de paz y unión en la naturaleza chilena.`,
    eje_tematico: 'Leyenda Tradicional de Pueblos Originarios',
    oa: 'OA 04: Comprender el origen mítico de fenómenos y símbolos naturales',
    preguntas: [
      {
        id_pregunta: 1,
        enunciado: '¿De dónde provienen los nombres que dieron origen a la palabra "Copihue"?',
        opciones: {
          A: 'De dos pueblos cercanos al mar',
          B: 'De la unión de los nombres de los jóvenes enamorados: Copih y Hues',
          C: 'De una antigua palabra española',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Exacto! La tradición explica que "Copihue" une el nombre del príncipe Copih y la princesa Hues.',
        retroalimentacion_negativa: 'Revisa los nombres de los dos protagonistas mapuches presentados al inicio.',
      },
      {
        id_pregunta: 2,
        enunciado: '¿Por qué los jóvenes debían reunirse en secreto en el bosque junto a la laguna?',
        opciones: {
          A: 'Porque pertenecían a tribus que estaban en conflicto y rivalidad',
          B: 'Porque no les gustaba hablar con la gente',
          C: 'Porque la laguna era muy lejana para sus amigos',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Muy bien! Sus pueblos estaban enemistados y sus familias no aprobaban su relación.',
        retroalimentacion_negativa: 'Fíjate en el motivo del conflicto entre los caciques de ambas tribus.',
      },
      {
        id_pregunta: 3,
        enunciado: '¿Qué fenómeno mágico ocurrió en la laguna un año después del llanto de las tribus?',
        opciones: {
          A: 'El agua se secó completamente',
          B: 'Brotaron enredaderas con hermosas flores rojas con forma de campana en los árboles',
          C: 'Apareció un volcán nuevo',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Excelente! Las flores rojas que colgaron de los canelos eran la manifestación del amor y el recuerdo de los jóvenes.',
        retroalimentacion_negativa: 'Observa lo que descubrieron las tribus cuando se reunieron un año después junto a la laguna.',
      },
      {
        id_pregunta: 4,
        enunciado: '¿Qué significado de convivencia entrega esta leyenda a las comunidades?',
        opciones: {
          A: 'Que las enemistades absurdas solo traen dolor y que la paz y el amor unen a los pueblos',
          B: 'Que nunca hay que ir al bosque',
          C: 'Que las flores rojas son peligrosas',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Qué gran reflexión valórica! La leyenda concluye consagrando la flor como un símbolo de reconciliación y paz.',
        retroalimentacion_negativa: 'Piensa en el arrepentimiento de las familias y en cómo el copihue se convirtió en símbolo de unión.',
      },
    ],
  },

  '3° Básico_Unidad 3': {
    nivel: '3° Básico',
    unidad: 'Unidad 3: El mar de Chile, mitos y patrimonio de Chiloé',
    mes_estimado: 'Julio - Septiembre',
    objetivos_aprendizaje: ['OA 04', 'OA 05'],
    titulo_texto: 'La Pincoya: guardiana de los mares de Chiloé',
    texto_oficial: `En el archipiélago de Chiloé, los pescadores y mariscadores conocen muy bien a la Pincoya, una sirena mágica de extraordinaria belleza, con larga cabellera dorada y vestida con algas del océano. La Pincoya surge de las profundidades marinas y danza sobre las olas o sobre las rocas de las playas. Si la Pincoya baila mirando hacia el mar abierto y batiendo sus brazos con alegría, anuncia a los chilotes que la temporada de pesca y mariscos será muy abundante en esa caleta. En cambio, si baila de espaldas al mar mirando hacia la tierra, es señal de que los peces escasearán y los pescadores deberán buscar sustento en otros canales. Para conservar la bendición de la Pincoya, los isleños deben pescar con respeto y compartir sus alimentos con generosidad, pues si alguien depreda el mar con egoísmo, la sirena abandona las playas y se lleva la riqueza marina.`,
    eje_tematico: 'Mito y Patrimonio Cultural de Chile',
    oa: 'OA 05: Interpretar relatos tradicionales y su vínculo con la ecología local',
    preguntas: [
      {
        id_pregunta: 1,
        enunciado: '¿Qué anuncia la Pincoya cuando baila mirando alegremente hacia el mar abierto?',
        opciones: {
          A: 'Que habrá una gran tormenta con truenos',
          B: 'Que la temporada de pesca y mariscos será sumamente abundante en esa playa',
          C: 'Que el agua estará congelada',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Muy bien! Su danza hacia el mar es símbolo tradicional de abundancia marina para los pescadores.',
        retroalimentacion_negativa: 'Vuelve al párrafo donde se contrastan las dos formas en que danza la Pincoya.',
      },
      {
        id_pregunta: 2,
        enunciado: '¿Qué ocurre si la Pincoya danza de espaldas al mar mirando hacia los cerros y la tierra?',
        opciones: {
          A: 'Significa que los peces escasearán en esa zona y habrá poca pesca',
          B: 'Que habrá fiesta en la plaza del pueblo',
          C: 'Que comenzará la primavera',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Exacto! Indica escasez y advierte a la comunidad que no encontrarán peces allí.',
        retroalimentacion_negativa: 'Revisa la señal que da cuando baila mirando a tierra firme.',
      },
      {
        id_pregunta: 3,
        enunciado: '¿Qué condición exige la Pincoya para mantener la riqueza de peces en las costas de Chiloé?',
        opciones: {
          A: 'Que los pescadores construyan barcos de oro',
          B: 'Que pesquen con respeto, no depreden con avaricia y compartan generosamente con su comunidad',
          C: 'Que nadie se acerque a la playa',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Gran comprensión ecológica! El mito chilote promueve el cuidado del medio marino y la solidaridad comunitaria.',
        retroalimentacion_negativa: 'Lee el final del relato: se enfatiza pescar con moderación y compartir sin egoísmo.',
      },
      {
        id_pregunta: 4,
        enunciado: '¿Cuál es el valor cultural de leyendas como la Pincoya para la identidad chilena?',
        opciones: {
          A: 'Mantener viva la sabiduría ancestral, el respeto por la naturaleza y la riqueza del folclor marítimo',
          B: 'Asustar a la gente para que no coma mariscos',
          C: 'Reemplazar las ciencias del colegio',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Sobresaliente! El patrimonio inmaterial de Chiloé enseña principios éticos profundos sobre la relación humana con el mar.',
        retroalimentacion_negativa: 'Piensa en el rol que cumplen las historias tradicionales en la cultura y cuidado del territorio.',
      },
    ],
  },

  '3° Básico_Unidad 4': {
    nivel: '3° Básico',
    unidad: 'Unidad 4: Poesía chilena y rimas del corazón',
    mes_estimado: 'Octubre - Diciembre',
    objetivos_aprendizaje: ['OA 05', 'OA 06'],
    titulo_texto: 'Dame la mano (Gabriela Mistral)',
    texto_oficial: `Dame la mano y danzaremos;\ndame la mano y me amarás.\nComo una sola flor seremos,\ncomo una flor, y nada más...\n\nEl mismo verso cantaremos,\nal mismo paso bailarás.\nComo una espiga ondularemos,\ncomo una espiga, y nada más.\n\nTe llamas Rosa y yo Esperanza;\npero tu nombre olvidarás,\nporque seremos una danza\nen la colina y nada más...`,
    eje_tematico: 'Lírica Escolar Canónica',
    oa: 'OA 05: Comprender poemas y recursos del lenguaje figurado',
    preguntas: [
      {
        id_pregunta: 1,
        enunciado: '¿A qué invita la hablante lírica en los versos del poema?',
        opciones: {
          A: 'A pelear por una colina',
          B: 'A darse la mano, cantar el mismo verso y danzar juntas como una sola flor',
          C: 'A salir corriendo para no bailar',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Muy bien! Es una invitación poética a la fraternidad, la ronda y la unión infantil.',
        retroalimentacion_negativa: 'Fíjate en las primeras estrofas: "Dame la mano y danzaremos...".',
      },
      {
        id_pregunta: 2,
        enunciado: 'En el verso "Como una espiga ondularemos", ¿qué imagen de la naturaleza se utiliza para describir el baile?',
        opciones: {
          A: 'El movimiento suave y armónico del trigo mecido por el viento',
          B: 'La caída pesada de una roca en la montaña',
          C: 'El vuelo apurado de un avispón',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Excelente interpretación lírica! La espiga se mueve al compás del viento, igual que los niños en la ronda.',
        retroalimentacion_negativa: 'Piensa en cómo se balancean las espigas doradas en un trigal con la brisa.',
      },
      {
        id_pregunta: 3,
        enunciado: '¿Por qué dice la autora: "Te llamas Rosa y yo Esperanza, pero tu nombre olvidarás"?',
        opciones: {
          A: 'Porque tienen mala memoria',
          B: 'Porque en la ronda todos somos iguales y nos fundimos en una sola hermandad',
          C: 'Porque se cambiaron de colegio',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Brillante! Gabriela Mistral muestra que en el juego y la fraternidad desaparecen las diferencias individuales.',
        retroalimentacion_negativa: 'Reflexiona sobre cómo al tomarnos de las manos somos todos parte de un mismo sentimiento.',
      },
      {
        id_pregunta: 4,
        enunciado: '¿Quién es la autora de este célebre poema presente en los textos escolares de Chile?',
        opciones: {
          A: 'Gabriela Mistral, Premio Nobel chilena de Literatura',
          B: 'Marcelo Bielsa',
          C: 'Pablo de Rokha',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Extraordinario! Gabriela Mistral es una de las figuras cumbres de nuestra poesía escolar y universal.',
        retroalimentacion_negativa: 'Recuerda a la gran poetisa y profesora de Elqui que ganó el primer Premio Nobel para Chile.',
      },
    ],
  },

  // ==================== 4° BÁSICO (TEXTO DEL ESTUDIANTE MINEDUC) ====================
  '4° Básico_Unidad 1': {
    nivel: '4° Básico',
    unidad: 'Unidad 1: Grandes relatos de esfuerzo, familia y nobleza',
    mes_estimado: 'Marzo - Abril',
    objetivos_aprendizaje: ['OA 03', 'OA 04'],
    titulo_texto: 'El pequeño escribiente florentino',
    texto_oficial: `Julio era un niño de doce años, hijo de un modesto empleado ferroviario en Florencia. Para mantener a la numerosa familia, el anciano padre trabajaba de noche escribiendo direcciones en fajas de periódicos que una imprenta le encargaba. Por cada quinientas fajas le pagaban una suma muy pequeña, y sus ojos cansados apenas podían soportar la luz de la lámpara. Julio le rogó que lo dejara ayudar, pero el padre se negó tajantemente diciendo: "Tu deber es estudiar y descansar". Sabiendo que a medianoche su padre se acostaba rendido, Julio ideó un plan: esperó que la casa durmiera, se levantó en puntillas hacia el despacho, encendió la vela y comenzó a copiar con su hermosa caligrafía las fajas pendientes. Durante semanas, el niño sacrificó su sueño nocturno para duplicar las ganancias de su padre. Aunque en la escuela comenzó a mostrarse somnoliento y su padre le reprochó su cansancio creyendo que era dejadez, Julio guardó silencio hasta que una noche el padre descubrió con lágrimas en los ojos la inmensa nobleza de su hijo.`,
    eje_tematico: 'Lectura Narrativa Clásica',
    oa: 'OA 04: Analizar motivaciones, dilemas éticos y evolución de personajes',
    preguntas: [
      {
        id_pregunta: 1,
        enunciado: '¿Por qué el padre de Julio trabajaba hasta tan tarde escribiendo fajas para la imprenta?',
        opciones: {
          A: 'Porque era su pasatiempo favorito',
          B: 'Para ganar un dinero extra indispensable para mantener a su numerosa familia',
          C: 'Porque la imprenta le obligaba a no dormir',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Muy bien! El padre realizaba ese sobreesfuerzo para cubrir las necesidades económicas del hogar.',
        retroalimentacion_negativa: 'Revisa el inicio: su sueldo de ferroviario era modesto y la familia era numerosa.',
      },
      {
        id_pregunta: 2,
        enunciado: '¿Por qué Julio decidió ayudar a su padre a escondidas y en silencio nocturno?',
        opciones: {
          A: 'Porque su padre le había prohibido tajantemente trabajar para que priorizara sus estudios',
          B: 'Porque quería comprarse juguetes caros',
          C: 'Porque le gustaba trasnochar con velas',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Gran comprensión del conflicto! El padre anteponía el estudio de su hijo, por lo que Julio tuvo que actuar en secreto por amor filial.',
        retroalimentacion_negativa: 'El padre le había dicho: "Tu deber es estudiar y descansar". Por eso Julio actuó en secreto.',
      },
      {
        id_pregunta: 3,
        enunciado: '¿Qué consecuencia negativa experimentó Julio debido a su sacrificio nocturno?',
        opciones: {
          A: 'Perdió sus lápices en el tren',
          B: 'Se quedaba dormido en clases y su padre le reprochó su rendimiento creyendo que era flojera',
          C: 'Le dolió la espalda para siempre',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Excelente atención a la trama! Julio soportó el dolor del reproche injusto sin quejarse para seguir ayudando.',
        retroalimentacion_negativa: 'Observa qué pasó en la escuela al no dormir durante semanas.',
      },
      {
        id_pregunta: 4,
        enunciado: '¿Qué emoción embargó al padre cuando finalmente descubrió a Julio escribiendo las fajas?',
        opciones: {
          A: 'Una profunda conmoción, ternura y lágrimas de admiración ante la inmensa generosidad de su hijo',
          B: 'Una rabia incontrolable que lo llevó a castigarlo',
          C: 'Indiferencia total',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Conmovedor análisis ético! El padre comprendió el verdadero motivo del cansancio y reconoció el amor incondicional de Julio.',
        retroalimentacion_negativa: 'Lee el final del texto: el padre llora al descubrir la nobleza de su hijo.',
      },
    ],
  },

  '4° Básico_Unidad 2': {
    nivel: '4° Básico',
    unidad: 'Unidad 2: Mitos y cosmovisión de los pueblos originarios',
    mes_estimado: 'Mayo - Junio',
    objetivos_aprendizaje: ['OA 03', 'OA 04'],
    titulo_texto: 'La leyenda del Pehuén',
    texto_oficial: `Desde tiempos remotos, el pueblo pehuenche habitaba en las faldas de la cordillera de los Andes a la sombra de los imponentes pehuenes o araucarias. Sin embargo, los antiguos creían que los frutos del pehuén, llamados piñones, eran tóxicos y no se podían comer, por lo que únicamente usaban los árboles para refugiarse y rezar. Un invierno fue tan feroz que la nieve cubrió los valles durante meses; los animales murieron de frío y el hambre amenazó con exterminar a la tribu entera. Desesperados, los caciques enviaron a los jóvenes a buscar alimento a zonas distantes. Uno de los muchachos regresaba con las manos vacías cuando se encontró con un anciano de larga barba blanca. El anciano le preguntó: "¿Por qué desprecian el regalo más generoso de la montaña? Los piñones del pehuén son el pan sagrado que Ngenechen dejó para ustedes. Hiérvanlos en abundante agua o tuéstelos al fuego y tendrán un manjar nutritivo". El joven llevó el mensaje al consejo y, tras probar los piñones cocidos, la tribu celebró el fin del hambre y desde entonces se llamaron con orgullo los hombres del pehuén.`,
    eje_tematico: 'Cosmovisión Indígena y Tradición Oral',
    oa: 'OA 04: Comprender relatos míticos fundacionales y su valor histórico',
    preguntas: [
      {
        id_pregunta: 1,
        enunciado: '¿Por qué los antiguos pehuenches no comían los piñones de las araucarias antes de la visita del anciano?',
        opciones: {
          A: 'Porque no les gustaba el sabor',
          B: 'Porque creían erróneamente que eran tóxicos y peligrosos',
          C: 'Porque los pájaros se los comían todos',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Muy bien! Existía la falsa creencia de que los piñones hacían daño.',
        retroalimentacion_negativa: 'Revisa el inicio de la leyenda: creían que los frutos eran tóxicos y no se podían comer crudos.',
      },
      {
        id_pregunta: 2,
        enunciado: '¿Qué crisis amenazó con hacer desaparecer a la comunidad cordillerana?',
        opciones: {
          A: 'Un feroz invierno con nieve prolongada que provocó la muerte de animales y una hambruna extrema',
          B: 'Una invasión de piratas en la cordillera',
          C: 'Una inundación marina en las cumbres',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Exacto! El crudo invierno andino agotó todas las fuentes habituales de alimento.',
        retroalimentacion_negativa: 'Fíjate en las condiciones climáticas del invierno que se describe en el texto.',
      },
      {
        id_pregunta: 3,
        enunciado: '¿Qué secreto de preparación gastronómica reveló el anciano enviado por Ngenechen para hacer comestible el piñón?',
        opciones: {
          A: 'Congelarlo bajo la nieve durante un mes',
          B: 'Hervirlo en abundante agua o tostarlo al fuego',
          C: 'Molerlo con tierra de volcán',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Excelente! Al cocinarlo con agua hirviendo o al rescoldo del fuego, el piñón se vuelve un alimento blando, delicioso y altamente nutritivo.',
        retroalimentacion_negativa: 'Revisa las palabras textuales del anciano sabio al joven viajero.',
      },
      {
        id_pregunta: 4,
        enunciado: '¿Qué revela esta leyenda sobre la estrecha relación entre los pueblos originarios y la naturaleza andina?',
        opciones: {
          A: 'Que la cordillera ofrece todo lo necesario para la vida si aprendemos a conocer, respetar y aprovechar sus dones con sabiduría',
          B: 'Que los árboles solo sirven para dar sombra',
          C: 'Que el invierno no tiene fin',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Sobresaliente! El relato explica cómo el pehuén se convirtió en el árbol sagrado y base alimentaria del pueblo.',
        retroalimentacion_negativa: 'Reflexiona sobre el orgullo con el que el pueblo pasó a llamarse Pehuenche (gente del pehuén).',
      },
    ],
  },

  '4° Básico_Unidad 3': {
    nivel: '4° Básico',
    unidad: 'Unidad 3: Ciencia, astronomía y el Desierto de Atacama',
    mes_estimado: 'Julio - Septiembre',
    objetivos_aprendizaje: ['OA 06', 'OA 07'],
    titulo_texto: 'Observatorios astronómicos en el norte de Chile: Mirando al universo',
    texto_oficial: `El desierto de Atacama, en el norte de Chile, es reconocido por la comunidad científica mundial como la capital de la astronomía en la Tierra. Esto se debe a una combinación natural única: casi trescientas noches completamente despejadas al año, una atmósfera sumamente seca sin vapor de agua y una mínima contaminación lumínica en los valles alejados de las grandes ciudades. Gracias a estas condiciones privilegiadas, científicos de más de treinta países han construido los telescopios más potentes del planeta en cerros como Paranal, La Silla y el llano de Chajnantor, donde opera el complejo ALMA con sesenta y seis antenas gigantes. A través de estos ojos gigantescos apuntados a la oscuridad del cosmos, los astrónomos descubren nuevos planetas fuera del sistema solar, observan el nacimiento de estrellas a millones de años luz y estudian el origen del universo, posicionando a Chile como una ventana abierta hacia los confines del espacio.`,
    eje_tematico: 'Reportaje de Divulgación Científica Mineduc',
    oa: 'OA 06: Leer reportajes y sintetizar información científica',
    preguntas: [
      {
        id_pregunta: 1,
        enunciado: '¿Cuáles son las tres condiciones naturales que convierten al Desierto de Atacama en un lugar ideal para la astronomía?',
        opciones: {
          A: 'Cielos despejados (300 noches al año), atmósfera muy seca y casi nula contaminación lumínica',
          B: 'Mucha lluvia, viento polar y árboles gigantes',
          C: 'Grandes ciudades con muchos focos encendidos',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Excelente síntesis! Esos tres factores permiten que la luz de las estrellas llegue nítida a los telescopios.',
        retroalimentacion_negativa: 'Vuelve al primer párrafo donde se enumeran las tres razones científicas del desierto.',
      },
      {
        id_pregunta: 2,
        enunciado: '¿Qué complejo astronómico con 66 antenas gigantes opera en el llano de Chajnantor?',
        opciones: {
          A: 'El observatorio ALMA',
          B: 'La nave Apolo',
          C: 'El telescopio de madera',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Exacto! ALMA es el mayor proyecto astronómico terrestre del mundo y está en Chile.',
        retroalimentacion_negativa: 'Revisa el nombre del complejo ubicado en Chajnantor con 66 antenas.',
      },
      {
        id_pregunta: 3,
        enunciado: 'En la frase "estos ojos gigantescos apuntados a la oscuridad del cosmos", ¿a qué se refiere la metáfora?',
        opciones: {
          A: 'A los ojos de los científicos con lentes grandes',
          B: 'A las enormes lentes y antenas de los telescopios que captan la luz del universo',
          C: 'A los focos de los automóviles',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Brillante interpretación del lenguaje no literal! Los telescopios funcionan como gigantescos ojos tecnológicos para la humanidad.',
        retroalimentacion_negativa: 'Piensa en qué instrumento capta la luz en un observatorio astronómico.',
      },
      {
        id_pregunta: 4,
        enunciado: '¿Qué aporte realizan estos observatorios instalados en Chile al conocimiento de toda la humanidad?',
        opciones: {
          A: 'Permiten descubrir nuevos planetas, comprender el nacimiento de estrellas y estudiar los orígenes del cosmos',
          B: 'Sirven para pronosticar el tráfico de las carreteras',
          C: 'Muestran cómo construir edificios altos',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Extraordinario! Posiciona a Chile como líder en la investigación espacial y el avance científico global.',
        retroalimentacion_negativa: 'Revisa los descubrimientos que se mencionan al final del reportaje.',
      },
    ],
  },

  '4° Básico_Unidad 4': {
    nivel: '4° Básico',
    unidad: 'Unidad 4: Textos dramáticos y teatro escolar',
    mes_estimado: 'Octubre - Diciembre',
    objetivos_aprendizaje: ['OA 04', 'OA 05'],
    titulo_texto: 'El rey que no quería bañarse',
    texto_oficial: `(La escena transcurre en la gran sala del trono real. Al centro, el REY BOMBO está sentado con una corona torcida y los brazos cruzados, con aspecto malhumorado. Entran el MINISTRO y la REINA sosteniendo una esponja gigante y un balde de agua con espuma perfumada).\n\nMINISTRO: (Con reverencia exagerada). Su Majestad, los músicos reales afinaron las arpas y el agua tibia de manantial está lista en la tina de mármol.\nREY: (Gritando y tapándose las orejas). ¡He dicho cien veces que no me bañaré! El agua moja, el jabón arde en los ojos y el patito de hule hace un chillido espantoso.\nREINA: Pero mi querido rey, hace seis meses que no tocas una gota de jabón. Las moscas del reino te siguen a todas partes y tu corona huele a queso añejo.\nREY: ¡Las moscas son mis súbditas más leales! No me baño y punto.\n(Entra la PRINCESA CLARA con una caña de pescar y un barco de juguete).\nPRINCESA: Papá, no es un baño común y corriente. Hemos llenado la tina con burbujas de colores para hacer una gran expedición de piratas en el océano.\nREY: (Abriendo los ojos con curiosidad infantil). ¿Piratas en el océano? ¿Y podré ser el capitán del barco?\nPRINCESA: ¡Por supuesto! Pero ningún capitán navega con corona sucia.\nREY: (Poniéndose de pie de un salto). ¡Entonces a la bañera, marineros! ¡Preparen los cañones de jabón! (Todos ríen y salen marchando alegremente).`,
    eje_tematico: 'Texto Dramático / Teatro Infantil',
    oa: 'OA 04: Analizar obras dramáticas, diálogos y acotaciones teatrales',
    preguntas: [
      {
        id_pregunta: 1,
        enunciado: '¿Por qué el Rey Bombo se negaba obstinadamente a bañarse?',
        opciones: {
          A: 'Porque decía que el agua mojaba, el jabón le ardía en los ojos y el patito de hule chillaba',
          B: 'Porque no había agua en el castillo',
          C: 'Porque la tina estaba rota',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Muy bien localizado! El rey ponía pretextos cómicos e infantiles para evitar el agua y el jabón.',
        retroalimentacion_negativa: 'Revisa las quejas directas que grita el Rey Bombo tapándose las orejas.',
      },
      {
        id_pregunta: 2,
        enunciado: '¿Qué función cumplen los textos entre paréntesis como "(Con reverencia exagerada)" o "(Gritando)" en la obra?',
        opciones: {
          A: 'Son acotaciones que indican a los actores cómo deben actuar, moverse o entonar su voz',
          B: 'Son errores de imprenta del libro',
          C: 'Son palabras que el público debe gritar',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Excelente conocimiento dramático! En el teatro, las acotaciones guían la puesta en escena y la actuación.',
        retroalimentacion_negativa: 'Recuerda que en los textos de teatro los paréntesis señalan los gestos y movimientos de los personajes.',
      },
      {
        id_pregunta: 3,
        enunciado: '¿Cómo logró la Princesa Clara convencer al Rey de meterse a la bañera?',
        opciones: {
          A: 'Lo amenazó con quitarle su corona',
          B: 'Transformó el baño en un juego de piratas en el océano donde él sería el capitán del barco',
          C: 'Le empujó sin que se diera cuenta',
        },
        respuesta_correcta: 'B',
        retroalimentacion_positiva: '¡Gran análisis de la psicología del personaje! La princesa apeló a la imaginación y al juego lúdico.',
        retroalimentacion_negativa: 'Fíjate en la propuesta creativa que hace la princesa con el barco de juguete y las burbujas.',
      },
      {
        id_pregunta: 4,
        enunciado: '¿Qué enseñanza entrega la actitud de la princesa para resolver desacuerdos familiares?',
        opciones: {
          A: 'Que con empatía, juego, ingenio y cariño se logran mejores acuerdos que con discusiones y gritos',
          B: 'Que es mejor no bañarse nunca',
          C: 'Que los reyes no deben obedecer a nadie',
        },
        respuesta_correcta: 'A',
        retroalimentacion_positiva: '¡Brillante reflexión de convivencia! El ingenio positivo y el afecto resolvieron un conflicto donde la insistencia rígida había fracasado.',
        retroalimentacion_negativa: 'Compara el resultado de la discusión de los adultos con la solución imaginativa de la niña.',
      },
    ],
  },
};

export function getDefaultQuizForNivelAndUnit(nivel: string, unitNameOrNum: string): MineducQuizResult {
  const cleanNivel = nivel.trim();
  const directKey = `${cleanNivel}_${unitNameOrNum}`;
  if (DEFAULT_QUIZZES_BY_GRADE_AND_UNIT[directKey]) {
    return DEFAULT_QUIZZES_BY_GRADE_AND_UNIT[directKey];
  }

  const matchKey = Object.keys(DEFAULT_QUIZZES_BY_GRADE_AND_UNIT).find((k) => {
    if (!k.startsWith(cleanNivel)) return false;
    const unitPart = k.split('_')[1];
    return unitNameOrNum.includes(unitPart) || unitPart.includes(unitNameOrNum);
  });

  if (matchKey && DEFAULT_QUIZZES_BY_GRADE_AND_UNIT[matchKey]) {
    return DEFAULT_QUIZZES_BY_GRADE_AND_UNIT[matchKey];
  }

  return DEFAULT_QUIZZES_BY_GRADE_AND_UNIT[`${cleanNivel}_Unidad 1`] || DEFAULT_QUIZZES_BY_GRADE_AND_UNIT['2° Básico_Unidad 1'];
}
