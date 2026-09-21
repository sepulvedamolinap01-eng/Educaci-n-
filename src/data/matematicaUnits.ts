import { MineducQuizResult, SampleMineducText } from '../types';

export interface MatematicaUnitDefinition {
  numero: string;
  nombre: string;
  mes: string;
  semestre: '1° Semestre' | '2° Semestre';
  tomo: string;
  enfoque: string;
  oas: string[];
  descripcion: string;
  defaultQuiz: MineducQuizResult;
}

export interface MatematicaNivelInfo {
  titulo: string;
  edad: string;
  resumen: string;
  unidades: MatematicaUnitDefinition[];
}

export const MINEDUC_MATEMATICA_CURRICULUM: Record<string, MatematicaNivelInfo> = {
  // =========================================================================
  // 1° BÁSICO - MATEMÁTICA (PROGRAMA SUMO PRIMERO / BASES CURRICULARES)
  // Operaciones simples de un solo dígito (0 a 10) y cierre hasta 20
  // =========================================================================
  '1° Básico': {
    titulo: 'Matemática 1° Básico',
    edad: '6 a 7 años',
    resumen:
      'Conteo del 0 al 10 con material concreto, lectura y escritura de números, sumas y restas simples de un solo dígito (juntar y quitar), figuras geométricas 2D y nociones de longitud.',
    unidades: [
      {
        numero: 'Unidad 1',
        nombre: 'Unidad 1: Números del 0 al 10 y conteo concreto',
        mes: 'Marzo - Abril',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Sumo Primero (Tomo 1)',
        enfoque: 'Conteo de uno en uno, correspondencia uno a uno, comparar cantidades (más que, menos que) y números del 0 al 10.',
        oas: ['OA 01', 'OA 03'],
        descripcion:
          'Contar números del 0 al 10 hacia adelante y hacia atrás, comparar y ordenar cantidades de elementos cotidianos utilizando objetos concretos y dibujos.',
        defaultQuiz: {
          nivel: '1° Básico',
          unidad: 'Unidad 1: Números del 0 al 10 y conteo concreto',
          mes_estimado: 'Marzo - Abril',
          eje_tematico: 'Números y Operaciones',
          oa: 'OA 01, OA 03: Contar, representar y comparar números del 0 al 10',
          objetivos_aprendizaje: ['OA 01', 'OA 03'],
          titulo_texto: 'Las manzanas de Sofía y Mateo',
          texto_oficial: `Sofía tiene 4 manzanas rojas en su canasto. Su hermano Mateo junta 3 manzanas verdes en su mesa. Juntos quieren contar cuántas frutas tienen antes de compartirlas en el almuerzo familiar. Sofía cuenta con su dedito: uno, dos, tres y cuatro. Luego Mateo añade sus manzanas verdes: cinco, seis y siete. Descubren que cuatro y tres manzanas juntas forman un total de siete deliciosas frutas.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuántas manzanas rojas tiene Sofía en su canasto?',
              opciones: {
                A: '4 manzanas rojas.',
                B: '2 manzanas rojas.',
                C: '6 manzanas rojas.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Muy bien! Sofía tiene exactamente 4 manzanas rojas en su canasto.',
              retroalimentacion_negativa: '¡Ánimo! Vuelve a leer el inicio: Sofía tiene 4 manzanas rojas.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: 'Si juntamos las 4 manzanas de Sofía con las 3 manzanas de Mateo, ¿cuántas manzanas hay en total? (4 + 3)',
              opciones: {
                A: '5 manzanas.',
                B: '7 manzanas.',
                C: '9 manzanas.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Excelente cálculo! 4 + 3 es igual a 7 manzanas.',
              retroalimentacion_negativa: '¡Sigue contando! Si tienes 4 y agregas 3 más con tus dedos: 5, 6 y 7.',
              habilidad: 'Calcular',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Para qué contaron Sofía y Mateo sus manzanas con el dedito?',
              opciones: {
                A: 'Para saber la cantidad total antes de compartirlas en el almuerzo.',
                B: 'Para botarlas a la basura en el patio.',
                C: 'Porque querían venderlas en el almacén.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Correcto! Querían conocer la cantidad exacta para compartir en familia.',
              retroalimentacion_negativa: '¡Revisa el texto! Los hermanos querían compartir sus ricas frutas.',
              habilidad: 'Resolver problemas',
            },
          ],
        },
      },
      {
        numero: 'Unidad 2',
        nombre: 'Unidad 2: Sumas y restas simples de un solo dígito (hasta 10)',
        mes: 'Mayo - Julio',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Sumo Primero (Tomo 1)',
        enfoque: 'Adición como juntar o agregar (+), sustracción como quitar o separar (-) en el ámbito numérico del 0 al 10.',
        oas: ['OA 08', 'OA 09'],
        descripcion:
          'Demostrar que comprende la adición y la sustracción de números de un solo dígito de manera concreta, pictórica y simbólica resolviendo problemas de la vida cotidiana.',
        defaultQuiz: {
          nivel: '1° Básico',
          unidad: 'Unidad 2: Sumas y restas simples de un solo dígito (hasta 10)',
          mes_estimado: 'Mayo - Julio',
          eje_tematico: 'Números y Operaciones',
          oa: 'OA 08, OA 09: Adición y sustracción simple de números de un dígito hasta 10',
          objetivos_aprendizaje: ['OA 08', 'OA 09'],
          titulo_texto: 'Los pajaritos en la rama del quillay',
          texto_oficial: `En una rama de un árbol de quillay había 6 pajaritos cantando bajo el sol de la mañana. Al escuchar el viento, 2 pajaritos levantaron el vuelo y se fueron a buscar semillas al jardín. Los demás pajaritos se quedaron tranquilos en la rama. Más tarde, llegó 1 pajarito nuevo a acompañarlos. Los niños del colegio observaron cómo la cantidad de pájaros cambiaba al volar y al regresar.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: 'Si había 6 pajaritos en la rama y se fueron 2, ¿cuántos pajaritos quedaron? (6 - 2)',
              opciones: {
                A: '3 pajaritos.',
                B: '4 pajaritos.',
                C: '5 pajaritos.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Muy bien restado! 6 menos 2 pajaritos es igual a 4.',
              retroalimentacion_negativa: '¡Prueba con tus dedos! Pon 6 dedos y baja 2: te quedan 4.',
              habilidad: 'Calcular',
            },
            {
              id_pregunta: 2,
              enunciado: 'A los 4 pajaritos que quedaron en la rama, llegó 1 pajarito nuevo. ¿Cuántos hay ahora? (4 + 1)',
              opciones: {
                A: '5 pajaritos.',
                B: '6 pajaritos.',
                C: '7 pajaritos.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Excelente suma! 4 más 1 es igual a 5 pajaritos.',
              retroalimentacion_negativa: '¡Casi! Al número 4 le sumamos 1 y obtenemos 5.',
              habilidad: 'Calcular',
            },
            {
              id_pregunta: 3,
              enunciado: 'En esta situación matemática, ¿qué acción representa la resta?',
              opciones: {
                A: 'Cuando los 2 pajaritos se van volando (quitar).',
                B: 'Cuando sale el sol en el cielo.',
                C: 'Cuando el árbol crece hojas nuevas.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Perfecto! La resta significa quitar, separar o que algunos elementos se van.',
              retroalimentacion_negativa: '¡Recuerda! Restar es quitar o apartar elementos de un grupo.',
              habilidad: 'Representar y modelar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 3',
        nombre: 'Unidad 3: Números hasta el 20 y figuras 2D',
        mes: 'Agosto - Septiembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Sumo Primero (Tomo 2)',
        enfoque: 'Formación de la decena (10 + número), cálculo mental hasta 20 y reconocimiento de formas geométricas (círculo, cuadrado, triángulo, rectángulo).',
        oas: ['OA 04', 'OA 09', 'OA 14'],
        descripcion:
          'Leer y escribir números hasta el 20, componer y descomponer una decena y unidades, y reconocer figuras geométricas de dos dimensiones en el entorno.',
        defaultQuiz: {
          nivel: '1° Básico',
          unidad: 'Unidad 3: Números hasta el 20 y figuras 2D',
          mes_estimado: 'Agosto - Septiembre',
          eje_tematico: 'Números, Operaciones y Geometría',
          oa: 'OA 04, OA 14: Números hasta el 20 y figuras geométricas 2D',
          objetivos_aprendizaje: ['OA 04', 'OA 14'],
          titulo_texto: 'El mural de figuras de la sala de clases',
          texto_oficial: `Para decorar la sala, la profesora entregó 10 papeles cuadrados y 5 papeles triangulares. Julián formó una decena completa con los 10 cuadrados. Luego sumó los 5 triángulos para saber el total de figuras: 10 más 5 es igual a 15 piezas de colores. Con entusiasmo, los niños pegaron las figuras en el mural formando casas con techos triangulares y ventanas cuadradas.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuántas figuras cuadradas usó Julián para armar una decena completa?',
              opciones: {
                A: '10 figuras.',
                B: '5 figuras.',
                C: '20 figuras.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Muy bien! Una decena está formada exactamente por 10 unidades.',
              retroalimentacion_negativa: '¡Recuerda! La palabra decena viene de diez: son 10 figuras.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: 'Si tenemos 10 cuadrados y agregamos 5 triángulos, ¿cuál es el total? (10 + 5)',
              opciones: {
                A: '12 figuras.',
                B: '15 figuras.',
                C: '18 figuras.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Exacto! 10 más 5 forman el número 15.',
              retroalimentacion_negativa: '¡Suma paso a paso! 10 más 5 es igual a 15.',
              habilidad: 'Calcular',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué figuras geométricas con tres lados usaron los niños para hacer los techos de las casas?',
              opciones: {
                A: 'Triángulos.',
                B: 'Círculos.',
                C: 'Cuadrados.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Excelente! Los triángulos tienen tres esquinas y tres lados rectos.',
              retroalimentacion_negativa: '¡Observa la forma! Los techos en punta se hicieron con triángulos.',
              habilidad: 'Representar y modelar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 4',
        nombre: 'Unidad 4: Patrones, longitud y problemas hasta 20',
        mes: 'Octubre - Diciembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Sumo Primero (Tomo 2)',
        enfoque: 'Patrones repetitivos, medición no estandarizada (pasos, lápices, clips) y resolución de sumas y restas simples de cierre de año.',
        oas: ['OA 11', 'OA 18', 'OA 09'],
        descripcion:
          'Identificar y crear patrones repetitivos, medir longitudes con unidades no estandarizadas y resolver problemas cotidianos de adición y sustracción hasta 20.',
        defaultQuiz: {
          nivel: '1° Básico',
          unidad: 'Unidad 4: Patrones, longitud y problemas hasta 20',
          mes_estimado: 'Octubre - Diciembre',
          eje_tematico: 'Patrones, Medición y Resolución de Problemas',
          oa: 'OA 11, OA 18: Patrones y medición de longitud con unidades cotidianas',
          objetivos_aprendizaje: ['OA 11', 'OA 18'],
          titulo_texto: 'El collar de patrones y la regla de lápices',
          texto_oficial: `Camila está diseñando un collar con semillas de la plaza. Para que quede ordenado, sigue un patrón repetitivo: pone dos semillas redondas y luego una alargada, dos redondas y una alargada. Después, Camila mide el largo de su cuaderno usando lápices de mina como regla: el cuaderno mide exactamente 3 lápices de largo. Su compañera suma 12 semillas rojas y 6 semillas azules para su propio collar, completando 18 semillas en total.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuántos lápices de mina mide el cuaderno de Camila?',
              opciones: {
                A: '3 lápices de largo.',
                B: '5 lápices de largo.',
                C: '8 lápices de largo.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Muy bien! El cuaderno mide 3 lápices de largo según el texto.',
              retroalimentacion_negativa: '¡Revisa el texto! Camila midió su cuaderno con 3 lápices.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: 'Si una compañera junta 12 semillas rojas y 6 semillas azules, ¿cuántas tiene en total? (12 + 6)',
              opciones: {
                A: '16 semillas.',
                B: '18 semillas.',
                C: '20 semillas.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Excelente! 12 + 6 es igual a 18 semillas.',
              retroalimentacion_negativa: '¡Cuenta con calma! A 12 le sumas 6: 13, 14, 15, 16, 17 y 18.',
              habilidad: 'Calcular',
            },
            {
              id_pregunta: 3,
              enunciado: 'En el patrón de Camila (dos redondas, una alargada), ¿qué semillas vienen después de una alargada?',
              opciones: {
                A: 'Dos semillas redondas.',
                B: 'Una estrella de madera.',
                C: 'Tres botones azules.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Correcto! El patrón se repite siempre con dos redondas y una alargada.',
              retroalimentacion_negativa: '¡Sigue el ritmo! El patrón es: dos redondas, una alargada, dos redondas...',
              habilidad: 'Representar y modelar',
            },
          ],
        },
      },
    ],
  },

  // =========================================================================
  // 2° BÁSICO - MATEMÁTICA
  // Ámbito numérico hasta 100, suma/resta con dos dígitos y tablas del 2, 5 y 10
  // =========================================================================
  '2° Básico': {
    titulo: 'Matemática 2° Básico',
    edad: '7 a 8 años',
    resumen:
      'Números hasta el 100 y valor posicional (decenas y unidades), adición y sustracción de dos dígitos con y sin reserva, inicio de la multiplicación (tablas del 2, 5 y 10) y uso de monedas chilenas.',
    unidades: [
      {
        numero: 'Unidad 1',
        nombre: 'Unidad 1: Números hasta el 100 y valor posicional',
        mes: 'Marzo - Abril',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Sumo Primero (Tomo 1)',
        enfoque: 'Lectura, escritura, orden hasta 100 y descomposición en decenas y unidades.',
        oas: ['OA 01', 'OA 05', 'OA 07'],
        descripcion:
          'Contar, leer, representar y comparar números hasta 100, identificando el valor posicional de cada dígito en decenas y unidades.',
        defaultQuiz: {
          nivel: '2° Básico',
          unidad: 'Unidad 1: Números hasta el 100 y valor posicional',
          mes_estimado: 'Marzo - Abril',
          eje_tematico: 'Números y Operaciones',
          oa: 'OA 01, OA 05: Números hasta 100 y valor posicional',
          objetivos_aprendizaje: ['OA 01', 'OA 05'],
          titulo_texto: 'La colección de autitos de Diego y las decenas',
          texto_oficial: `Diego colecciona autitos de juguete y los guarda ordenados en cajas de 10 unidades para no perderlos. Esta semana completó 4 cajas llenas de autitos y le quedaron 7 autitos sueltos en su repisa. Diego calculó: 4 decenas equivalen a 40 autitos, más los 7 sueltos, tiene un total de 47 autitos. Para su cumpleaños, su tía le regaló 10 autitos más, completando una nueva caja y alcanzando 57 autitos en su colección.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuántas decenas y unidades formó Diego al tener 47 autitos?',
              opciones: {
                A: '4 decenas y 7 unidades.',
                B: '7 decenas y 4 unidades.',
                C: '40 decenas y 7 unidades.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Excelente! En 47, el dígito 4 representa 4 decenas y el 7 representa 7 unidades.',
              retroalimentacion_negativa: '¡Revisa el valor posicional! El primer dígito son las decenas (4) y el segundo las unidades (7).',
              habilidad: 'Representar y modelar',
            },
            {
              id_pregunta: 2,
              enunciado: 'Si Diego tenía 47 autitos y recibió 10 más de regalo, ¿cuántos tiene ahora? (47 + 10)',
              opciones: {
                A: '50 autitos.',
                B: '57 autitos.',
                C: '67 autitos.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Muy bien calculado! Al sumar una decena a 47 obtenemos 57.',
              retroalimentacion_negativa: '¡Suma 10! Solo cambia la cifra de las decenas: de 4 decenas pasa a 5 decenas, resultando 57.',
              habilidad: 'Calcular',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Por qué Diego agrupa sus juguetes en cajas de 10 autitos?',
              opciones: {
                A: 'Porque formar decenas facilita contar y organizar colecciones grandes.',
                B: 'Porque las cajas de 10 son solo para autitos de color azul.',
                C: 'Porque se lo prohibieron en el colegio.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Correcto! Agrupar de a 10 (en decenas) permite contar con mayor rapidez y precisión.',
              retroalimentacion_negativa: '¡Piensa en la ventaja! Agrupar en decenas hace que el conteo sea más fácil y ordenado.',
              habilidad: 'Resolver problemas',
            },
          ],
        },
      },
      {
        numero: 'Unidad 2',
        nombre: 'Unidad 2: Adición y sustracción hasta 100 y cálculo mental',
        mes: 'Mayo - Julio',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Sumo Primero (Tomo 1)',
        enfoque: 'Estrategias de cálculo mental, suma vertical y resta con y sin reagrupación en el ámbito hasta 100.',
        oas: ['OA 09', 'OA 10'],
        descripcion:
          'Demostrar que comprende la adición y la sustracción de números de dos dígitos aplicando el algoritmo tradicional y estrategias de cálculo mental.',
        defaultQuiz: {
          nivel: '2° Básico',
          unidad: 'Unidad 2: Adición y sustracción hasta 100 y cálculo mental',
          mes_estimado: 'Mayo - Julio',
          eje_tematico: 'Números y Operaciones',
          oa: 'OA 09, OA 10: Suma y resta hasta 100 con resolución de problemas',
          objetivos_aprendizaje: ['OA 09', 'OA 10'],
          titulo_texto: 'La venta de volantines de la kermés escolar',
          texto_oficial: `En la fiesta de la kermés de la escuela, el curso de 2° básico preparó 65 volantines tricolor para vender. Durante la primera hora de la mañana, vendieron 23 volantines a las familias del barrio. Por la tarde, un apoderado trajo 15 volantines más para colaborar con la venta. Los estudiantes registraron en una tabla los volantines que salían y los que ingresaban para saber cuántos quedaban disponibles.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: 'Si había 65 volantines y se vendieron 23, ¿cuántos volantines quedaron en la mesa? (65 - 23)',
              opciones: {
                A: '32 volantines.',
                B: '42 volantines.',
                C: '52 volantines.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Muy bien restado! 65 - 23 = 42 volantines (5 - 3 = 2 unidades; 6 - 2 = 4 decenas).',
              retroalimentacion_negativa: '¡Resta columna por columna! Unidades: 5 - 3 = 2. Decenas: 6 - 2 = 4. Resultado: 42.',
              habilidad: 'Calcular',
            },
            {
              id_pregunta: 2,
              enunciado: 'A los 42 volantines que quedaron, se agregaron 15 volantines nuevos. ¿Cuál es el nuevo total? (42 + 15)',
              opciones: {
                A: '57 volantines.',
                B: '60 volantines.',
                C: '55 volantines.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Excelente suma! 42 + 15 = 57 volantines disponibles.',
              retroalimentacion_negativa: '¡Suma paso a paso! 2 + 5 = 7 unidades, y 4 + 1 = 5 decenas. Da 57.',
              habilidad: 'Calcular',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué operación matemática se debe usar cuando se venden productos y la cantidad disminuye?',
              opciones: {
                A: 'Una sustracción o resta.',
                B: 'Una suma o adición.',
                C: 'Un dibujo libre.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Perfecto! Cuando se venden o quitan cosas de un stock, se utiliza la resta.',
              retroalimentacion_negativa: '¡Recuerda! Al vender productos la cantidad disminuye, por eso se resta.',
              habilidad: 'Representar y modelar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 3',
        nombre: 'Unidad 3: Introducción a la multiplicación y dinero chileno',
        mes: 'Agosto - Septiembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Sumo Primero (Tomo 2)',
        enfoque: 'Multiplicación como suma reiterada (grupos iguales), tablas del 2, 5 y 10, y valor del dinero (monedas de $10, $50 y $100).',
        oas: ['OA 11', 'OA 13'],
        descripcion:
          'Demostrar que comprende la multiplicación mediante representaciones concretas y pictóricas, y resolver problemas que involucren el uso de monedas chilenas.',
        defaultQuiz: {
          nivel: '2° Básico',
          unidad: 'Unidad 3: Introducción a la multiplicación y dinero chileno',
          mes_estimado: 'Agosto - Septiembre',
          eje_tematico: 'Operaciones y Educación Financiera',
          oa: 'OA 11, OA 13: Tablas del 2, 5 y 10 y uso del dinero nacional',
          objetivos_aprendizaje: ['OA 11', 'OA 13'],
          titulo_texto: 'Los paquetes de galletas y las monedas en el recreo',
          texto_oficial: `Ignacio fue al kiosco del colegio con 4 monedas de $10 y 1 moneda de $50. Quería comprar paquetes de galletas de avena que venían en bolsas de 5 galletas cada una. Si Ignacio compra 3 bolsas, puede calcular la cantidad total sumando 5 + 5 + 5, lo que equivale a multiplicar 3 veces 5 (3 × 5 = 15 galletas). Ignacio pagó justo con sus monedas y compartió las galletas con sus amigos.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuánto dinero en total llevaba Ignacio con 4 monedas de $10 y 1 moneda de $50? (40 + 50)',
              opciones: {
                A: '$70 pesos.',
                B: '$90 pesos.',
                C: '$100 pesos.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Muy bien calculado! 4 monedas de $10 son $40, más $50 son $90 pesos en total.',
              retroalimentacion_negativa: '¡Suma las monedas! $10 + $10 + $10 + $10 = $40. Y $40 + $50 = $90 pesos.',
              habilidad: 'Calcular',
            },
            {
              id_pregunta: 2,
              enunciado: 'Si cada bolsa tiene 5 galletas y compró 3 bolsas, ¿cuántas galletas tiene en total? (3 × 5)',
              opciones: {
                A: '12 galletas.',
                B: '15 galletas.',
                C: '20 galletas.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Excelente multiplicación! 3 veces 5 es igual a 15 galletas (5 + 5 + 5 = 15).',
              retroalimentacion_negativa: '¡Suma 3 veces el número 5! 5 + 5 = 10, y 10 + 5 = 15.',
              habilidad: 'Calcular',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué significa la multiplicación en esta situación cotidiana?',
              opciones: {
                A: 'Sumar varias veces la misma cantidad (grupos iguales de galletas).',
                B: 'Romper las bolsas en pedacitos pequeños.',
                C: 'Olvidar el dinero en la mochila.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Exacto! Multiplicar es sumar repetidamente grupos con igual número de elementos.',
              retroalimentacion_negativa: '¡Recuerda! La multiplicación representa la suma reiterada de cantidades iguales.',
              habilidad: 'Representar y modelar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 4',
        nombre: 'Unidad 4: Geometría, medición en cm y resolución de problemas',
        mes: 'Octubre - Diciembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Sumo Primero (Tomo 2)',
        enfoque: 'Cuerpos y figuras geométricas (vértices, caras, aristas), medición de longitud estandarizada en centímetros (cm) y metros (m).',
        oas: ['OA 14', 'OA 19'],
        descripcion:
          'Describir figuras y cuerpos geométricos reconociendo sus características, y medir objetos del entorno escolar utilizando el centímetro como unidad de medida.',
        defaultQuiz: {
          nivel: '2° Básico',
          unidad: 'Unidad 4: Geometría, medición en cm y resolución de problemas',
          mes_estimado: 'Octubre - Diciembre',
          eje_tematico: 'Geometría y Medición',
          oa: 'OA 14, OA 19: Cuerpos geométricos y medición en centímetros',
          objetivos_aprendizaje: ['OA 14', 'OA 19'],
          titulo_texto: 'El proyecto del puente de madera y la regla graduada',
          texto_oficial: `En la clase de Tecnología y Matemática, los estudiantes construyeron una maqueta de un puente con palos de madera y bloques cúbicos. Con una regla graduada en centímetros, midieron el largo del puente: medía 28 centímetros de longitud. El camino de acceso medía 14 centímetros. Al sumar ambas partes (28 + 14 = 42 cm), comprobaron que la maqueta cabía perfectamente en la mesa de exhibición de la sala.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuál es la longitud total del puente y su camino de acceso? (28 + 14)',
              opciones: {
                A: '40 centímetros.',
                B: '42 centímetros.',
                C: '52 centímetros.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Excelente cálculo con reagrupación! 8 + 4 = 12 (1 de reserva), 2 + 1 + 1 = 4. Resultado: 42 cm.',
              retroalimentacion_negativa: '¡Suma con reserva! 28 + 10 = 38, y 38 + 4 = 42 centímetros.',
              habilidad: 'Calcular',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Qué instrumento utilizaron los estudiantes para medir con precisión en centímetros?',
              opciones: {
                A: 'Una regla graduada.',
                B: 'Un termómetro ambiental.',
                C: 'Un reloj de arena.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Correcto! La regla es la herramienta estandarizada para medir longitudes en centímetros.',
              retroalimentacion_negativa: '¡Revisa el texto! Se utilizó una regla graduada en centímetros.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 3,
              enunciado: 'Los bloques cúbicos utilizados como pilares del puente, ¿qué tipo de figura o cuerpo son?',
              opciones: {
                A: 'Cuerpos geométricos 3D con caras cuadradas iguales.',
                B: 'Líneas curvas planas.',
                C: 'Círculos sin grosor.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Muy bien! Un cubo tiene 6 caras cuadradas iguales, 8 vértices y 12 aristas.',
              retroalimentacion_negativa: '¡Recuerda los cuerpos 3D! Un cubo tiene volumen y caras cuadradas.',
              habilidad: 'Representar y modelar',
            },
          ],
        },
      },
    ],
  },

  // =========================================================================
  // 3° BÁSICO - MATEMÁTICA
  // Ámbito hasta 1.000, tablas del 3, 4, 6, 8, división y fracciones iniciales
  // =========================================================================
  '3° Básico': {
    titulo: 'Matemática 3° Básico',
    edad: '8 a 9 años',
    resumen:
      'Números hasta el 1.000, suma y resta con algoritmo y reserva, consolidación de la multiplicación (tablas del 3, 4, 6 y 8), división como reparto equitativo, fracciones comunes (1/2, 1/4, 3/4) y perímetro.',
    unidades: [
      {
        numero: 'Unidad 1',
        nombre: 'Unidad 1: Números hasta el 1.000 y adición/sustracción',
        mes: 'Marzo - Abril',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Sumo Primero (Tomo 1)',
        enfoque: 'Centenas, decenas y unidades, redondeo a la decena/centena más cercana y resolución de problemas aditivos hasta 1.000.',
        oas: ['OA 01', 'OA 03'],
        descripcion:
          'Contar, leer, representar y componer números hasta 1.000, y resolver problemas aditivos aplicando algoritmos formales y estimaciones.',
        defaultQuiz: {
          nivel: '3° Básico',
          unidad: 'Unidad 1: Números hasta el 1.000 y adición/sustracción',
          mes_estimado: 'Marzo - Abril',
          eje_tematico: 'Números y Operaciones',
          oa: 'OA 01, OA 03: Números hasta 1.000 y adición con algoritmos',
          objetivos_aprendizaje: ['OA 01', 'OA 03'],
          titulo_texto: 'La campaña de reciclaje de botellas del colegio',
          texto_oficial: `Los estudiantes de 3° básico organizaron una campaña comunitaria de reciclaje. En la primera semana reunieron 340 botellas plásticas y en la segunda semana recolectaron 285 botellas más. El profesor les pidió calcular el total sumando centenas con centenas, decenas con decenas y unidades con unidades: 340 + 285 = 625 botellas. Si la meta final del colegio era alcanzar 800 botellas, los niños calcularon cuántas les faltaban mediante una resta.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuántas botellas plásticas reunieron en total durante las dos primeras semanas? (340 + 285)',
              opciones: {
                A: '525 botellas.',
                B: '625 botellas.',
                C: '725 botellas.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Excelente suma con reserva! 0 + 5 = 5; 4 + 8 = 12 (reserva 1); 3 + 2 + 1 = 6. Da 625 botellas.',
              retroalimentacion_negativa: '¡Suma con cuidado! 340 + 200 = 540, + 85 = 625 botellas.',
              habilidad: 'Calcular',
            },
            {
              id_pregunta: 2,
              enunciado: 'Si la meta era de 800 botellas y ya tienen 625, ¿cuántas botellas faltan para completar la meta? (800 - 625)',
              opciones: {
                A: '175 botellas.',
                B: '185 botellas.',
                C: '275 botellas.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Muy bien restado con canje! 800 - 625 = 175 botellas restantes.',
              retroalimentacion_negativa: '¡Calcula la diferencia! De 625 a 700 faltan 75, y de 700 a 800 faltan 100: 175 botellas.',
              habilidad: 'Calcular',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Cuál es el valor del dígito 6 en el número 625 botellas?',
              opciones: {
                A: '600 (6 centenas).',
                B: '60 (6 decenas).',
                C: '6 (6 unidades).',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Exacto! Ocupa la posición de las centenas, por lo que su valor es 600 unidades.',
              retroalimentacion_negativa: '¡Revisa la posición! Centena (6), Decena (2), Unidad (5). El 6 vale 600.',
              habilidad: 'Representar y modelar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 2',
        nombre: 'Unidad 2: Multiplicación (tablas del 3, 4, 6 y 8) y problemas',
        mes: 'Mayo - Julio',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Sumo Primero (Tomo 1)',
        enfoque: 'Propiedad distributiva de la multiplicación, matrices de puntos, tablas extendidas y resolución de problemas.',
        oas: ['OA 08', 'OA 09'],
        descripcion:
          'Demostrar que comprende las tablas de multiplicar hasta el 10 mediante arreglos bidimensionales, descomposición y cálculo mental.',
        defaultQuiz: {
          nivel: '3° Básico',
          unidad: 'Unidad 2: Multiplicación (tablas del 3, 4, 6 y 8) y problemas',
          mes_estimado: 'Mayo - Julio',
          eje_tematico: 'Números y Operaciones',
          oa: 'OA 08, OA 09: Tablas de multiplicar y resolución de problemas',
          objetivos_aprendizaje: ['OA 08', 'OA 09'],
          titulo_texto: 'Las bandejas de almácigos del huerto escolar',
          texto_oficial: `Para el huerto del colegio, el club de ciencias plantó semillas de lechuga en bandejas agrícolas. Cada bandeja tiene 6 filas con 8 espacios para almácigos en cada fila. Sofía calculó rápidamente el total multiplicando 6 × 8 = 48 plantas por bandeja. Si el curso preparó 4 bandejas idénticas, multiplicaron 4 × 48 descomponiendo: (4 × 40 = 160) y (4 × 8 = 32), obteniendo un total de 192 plantitas listas para trasplantar a la tierra.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuántos almácigos tiene una bandeja de 6 filas y 8 espacios por fila? (6 × 8)',
              opciones: {
                A: '42 almácigos.',
                B: '48 almácigos.',
                C: '54 almácigos.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Excelente memoria y cálculo! 6 × 8 = 48 almácigos.',
              retroalimentacion_negativa: '¡Revisa la tabla del 6 o del 8! 6 × 8 es igual a 48.',
              habilidad: 'Calcular',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Qué estrategia usaron los estudiantes para multiplicar 4 × 48 mentalmente?',
              opciones: {
                A: 'Descomponer 48 en 40 y 8, multiplicar cada parte y luego sumar los resultados.',
                B: 'Adivinar el número más grande que encontraron.',
                C: 'Restarle 10 al resultado final.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Correcto! La propiedad distributiva facilita multiplicar números de dos dígitos desglosando en decenas y unidades.',
              retroalimentacion_negativa: '¡Revisa el texto! Descompusieron 48 en 40 + 8.',
              habilidad: 'Representar y modelar',
            },
            {
              id_pregunta: 3,
              enunciado: 'Si en otra bandeja tienen 7 filas con 4 almácigos cada una, ¿cuántos hay en total? (7 × 4)',
              opciones: {
                A: '24 almácigos.',
                B: '28 almácigos.',
                C: '32 almácigos.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Muy bien! 7 × 4 = 28 almácigos.',
              retroalimentacion_negativa: '¡Aplica la tabla del 4! 7 veces 4 es 28.',
              habilidad: 'Calcular',
            },
          ],
        },
      },
      {
        numero: 'Unidad 3',
        nombre: 'Unidad 3: División como reparto y fracciones iniciales',
        mes: 'Agosto - Septiembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Sumo Primero (Tomo 2)',
        enfoque: 'División exacta como reparto equitativo y agrupación, fracciones comunes (1/2, 1/4, 1/8) en contextos concretos.',
        oas: ['OA 09', 'OA 11'],
        descripcion:
          'Demostrar que comprende la división con dividendos de dos dígitos y divisores de un dígito, e identificar fracciones como partes de un todo o conjunto.',
        defaultQuiz: {
          nivel: '3° Básico',
          unidad: 'Unidad 3: División como reparto y fracciones iniciales',
          mes_estimado: 'Agosto - Septiembre',
          eje_tematico: 'Operaciones y Fracciones',
          oa: 'OA 09, OA 11: División y representación de fracciones comunes',
          objetivos_aprendizaje: ['OA 09', 'OA 11'],
          titulo_texto: 'El reparto de manzanas y la pizza fraccionada',
          texto_oficial: `La profesora llevó 24 manzanas frescas para repartirlas en partes iguales entre 6 grupos de trabajo. Cada grupo recibió exactamente 4 manzanas, porque 24 dividido por 6 es igual a 4 (24 : 6 = 4). En la hora de colación, Martín compartió una pizza dividida en 4 porciones iguales. Si comió 1 porción, representó en su cuaderno que había consumido 1/4 (un cuarto) de la pizza, dejando 3/4 para sus compañeros.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: 'Al repartir 24 manzanas en partes iguales entre 6 grupos, ¿cuántas manzanas recibió cada grupo? (24 : 6)',
              opciones: {
                A: '3 manzanas.',
                B: '4 manzanas.',
                C: '5 manzanas.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Excelente división! 24 dividido en 6 es igual a 4 manzanas exactas.',
              retroalimentacion_negativa: '¡Piensa en la multiplicación inversa! ¿Qué número multiplicado por 6 da 24? El 4.',
              habilidad: 'Calcular',
            },
            {
              id_pregunta: 2,
              enunciado: 'Si una pizza se corta en 4 trozos iguales y se come 1 trozo, ¿qué fracción representa lo que se comió?',
              opciones: {
                A: '1/2 (un medio).',
                B: '1/4 (un cuarto).',
                C: '3/4 (tres cuartos).',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Exacto! 1 trozo de un total de 4 partes iguales es 1/4.',
              retroalimentacion_negativa: '¡Recuerda el numerador y denominador! 1 parte tomada de 4 partes totales es 1/4.',
              habilidad: 'Representar y modelar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Cuánta pizza quedó disponible para los compañeros de Martín después de que comió 1/4?',
              opciones: {
                A: '2/4 de la pizza.',
                B: '3/4 de la pizza.',
                C: '4/4 de la pizza.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Muy bien! Del entero (4/4), si quitas 1/4 te quedan 3/4 de la pizza.',
              retroalimentacion_negativa: '¡Resta al entero! 4/4 menos 1/4 son 3/4.',
              habilidad: 'Resolver problemas',
            },
          ],
        },
      },
      {
        numero: 'Unidad 4',
        nombre: 'Unidad 4: Perímetro de figuras y resolución combinada',
        mes: 'Octubre - Diciembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Sumo Primero (Tomo 2)',
        enfoque: 'Cálculo de perímetro sumando la longitud de los lados en figuras 2D (cuadrados, rectángulos) y problemas de dos pasos.',
        oas: ['OA 15', 'OA 21'],
        descripcion:
          'Demostrar que comprende la medición del perímetro en figuras regulares e irregulares y resolver problemas matemáticos de dos o más pasos.',
        defaultQuiz: {
          nivel: '3° Básico',
          unidad: 'Unidad 4: Perímetro de figuras y resolución combinada',
          mes_estimado: 'Octubre - Diciembre',
          eje_tematico: 'Geometría, Medición y Resolución de Problemas',
          oa: 'OA 15, OA 21: Perímetro y resolución de problemas combinados',
          objetivos_aprendizaje: ['OA 15', 'OA 21'],
          titulo_texto: 'El cerco de la huerta rectangular',
          texto_oficial: `Los estudiantes quieren poner una cerca de madera alrededor de la huerta de la escuela para proteger las verduras. La huerta tiene forma de rectángulo: mide 5 metros de largo y 3 metros de ancho. Para calcular cuántos metros de madera necesitan en total, deben sumar todos sus lados: 5 m + 3 m + 5 m + 3 m = 16 metros de perímetro. Con esta información, compraron tablas de 2 metros cada una.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuál es el perímetro total de la huerta rectangular de 5 metros de largo y 3 metros de ancho?',
              opciones: {
                A: '15 metros.',
                B: '16 metros.',
                C: '18 metros.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Excelente! Sumaste los cuatro lados: 5 + 3 + 5 + 3 = 16 metros de contorno.',
              retroalimentacion_negativa: '¡Suma todos los lados del rectángulo! Dos lados de 5 m y dos lados de 3 m: 10 + 6 = 16 m.',
              habilidad: 'Calcular',
            },
            {
              id_pregunta: 2,
              enunciado: 'Si cada tabla de madera mide 2 metros de largo, ¿cuántas tablas necesitan para cubrir los 16 metros? (16 : 2)',
              opciones: {
                A: '6 tablas.',
                B: '8 tablas.',
                C: '10 tablas.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Muy bien resuelto! 16 metros dividido en tablas de 2 metros da 8 tablas exactas.',
              retroalimentacion_negativa: '¡Divide 16 en 2! La mitad de 16 es 8 tablas.',
              habilidad: 'Resolver problemas',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué es el perímetro en una figura geométrica plana?',
              opciones: {
                A: 'La suma de las longitudes de todos sus lados (el contorno).',
                B: 'El peso total del objeto en kilogramos.',
                C: 'El color con que se pinta la figura.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Correcto! El perímetro es la medida de la frontera o contorno exterior de una figura.',
              retroalimentacion_negativa: '¡Recuerda la definición! El perímetro es la suma de los lados exteriores.',
              habilidad: 'Representar y modelar',
            },
          ],
        },
      },
    ],
  },

  // =========================================================================
  // 4° BÁSICO - MATEMÁTICA
  // Ámbito hasta 10.000, multiplicación por 2 dígitos, división con resto, decimales y área
  // =========================================================================
  '4° Básico': {
    titulo: 'Matemática 4° Básico',
    edad: '9 a 10 años',
    resumen:
      'Números hasta 10.000, algoritmos de multiplicación por 2 dígitos, división con y sin residuo, fracciones equivalentes y números decimales (décimos y centésimos), cálculo de área y ecuaciones simples.',
    unidades: [
      {
        numero: 'Unidad 1',
        nombre: 'Unidad 1: Números hasta 10.000 y redondeo',
        mes: 'Marzo - Abril',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Sumo Primero (Tomo 1)',
        enfoque: 'Lectura, escritura, valor posicional (UM, C, D, U), redondeo a la decena, centena y mil más cercano, y adición/sustracción hasta 10.000.',
        oas: ['OA 01', 'OA 03'],
        descripcion:
          'Representar y describir números hasta 10.000, estimar sumas y diferencias usando redondeo, y resolver problemas aditivos contextualizados.',
        defaultQuiz: {
          nivel: '4° Básico',
          unidad: 'Unidad 1: Números hasta 10.000 y redondeo',
          mes_estimado: 'Marzo - Abril',
          eje_tematico: 'Números y Operaciones',
          oa: 'OA 01, OA 03: Valor posicional hasta 10.000 y estimaciones',
          objetivos_aprendizaje: ['OA 01', 'OA 03'],
          titulo_texto: 'El recuento de asistentes al festival deportivo escolar',
          texto_oficial: `El sábado se celebró el gran festival deportivo escolar de la comuna. Al estadio ingresaron 3.480 personas por la puerta norte y 2.750 personas por la puerta sur. El comité organizador calculó la asistencia total sumando ambas cifras: 3.480 + 2.750 = 6.230 personas. Para los periódicos locales, estimaron la cifra redondeando a la centena más cercana: 6.230 se redondea a 6.200 asistentes.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuál fue el total exacto de personas que asistieron al festival deportivo? (3.480 + 2.750)',
              opciones: {
                A: '5.130 personas.',
                B: '6.230 personas.',
                C: '6.330 personas.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Excelente algoritmo de la adición! 3.480 + 2.750 = 6.230 personas.',
              retroalimentacion_negativa: '¡Suma respetando las reservas! 0+0=0, 8+5=13 (reserva 1), 4+7+1=12 (reserva 1), 3+2+1=6. Da 6.230.',
              habilidad: 'Calcular',
            },
            {
              id_pregunta: 2,
              enunciado: 'Si redondeamos el número 6.230 a la centena más cercana, ¿cuál es el valor estimado?',
              opciones: {
                A: '6.200.',
                B: '6.300.',
                C: '6.000.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Muy bien! Como la decena es 3 (menor a 5), la centena se mantiene en 2, resultando 6.200.',
              retroalimentacion_negativa: '¡Aplica la regla de redondeo! La decena 30 está más cerca de 00 que de 100, por tanto es 6.200.',
              habilidad: 'Representar y modelar',
            },
            {
              id_pregunta: 3,
              enunciado: 'En el número 3.480, ¿qué valor tiene el dígito 4 según su posición?',
              opciones: {
                A: '4 unidades de mil (4.000).',
                B: '4 centenas (400).',
                C: '4 decenas (40).',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Correcto! El 4 está en el lugar de las centenas, por lo que equivale a 400 unidades.',
              retroalimentacion_negativa: '¡Revisa la tabla posicional! UM: 3, C: 4, D: 8, U: 0. El 4 vale 400.',
              habilidad: 'Representar y modelar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 2',
        nombre: 'Unidad 2: Multiplicación por 2 dígitos y división con resto',
        mes: 'Mayo - Julio',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Sumo Primero (Tomo 1)',
        enfoque: 'Multiplicación de dos dígitos por dos dígitos, división con dividendos de tres dígitos y residuo, y comprobación.',
        oas: ['OA 05', 'OA 06'],
        descripcion:
          'Demostrar que comprende la multiplicación y división de números naturales aplicando algoritmos y estrategias de cálculo en situaciones reales.',
        defaultQuiz: {
          nivel: '4° Básico',
          unidad: 'Unidad 2: Multiplicación por 2 dígitos y división con resto',
          mes_estimado: 'Mayo - Julio',
          eje_tematico: 'Números y Operaciones',
          oa: 'OA 05, OA 06: Multiplicación y división con residuos',
          objetivos_aprendizaje: ['OA 05', 'OA 06'],
          titulo_texto: 'El embalaje de cajas de duraznos en el packing',
          texto_oficial: `En una cooperativa agrícola de la zona central, los trabajadores embalan duraznos seleccionados en bandejas de 12 unidades cada una. Si arman 25 bandejas durante la jornada, calculan la producción multiplicando 25 × 12 = 300 duraznos embalados. Al final del día, tenían 75 duraznos sueltos para repartir equitativamente entre 7 hogares de ancianos: 75 dividido en 7 da 10 duraznos por hogar y sobran 5 duraznos de resto (75 = 7 × 10 + 5).`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuántos duraznos hay en total en 25 bandejas de 12 unidades cada una? (25 × 12)',
              opciones: {
                A: '250 duraznos.',
                B: '300 duraznos.',
                C: '350 duraznos.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Excelente multiplicación! 25 × 10 = 250, y 25 × 2 = 50. 250 + 50 = 300 duraznos.',
              retroalimentacion_negativa: '¡Multiplica paso a paso! 25 × 12 = 300.',
              habilidad: 'Calcular',
            },
            {
              id_pregunta: 2,
              enunciado: 'Al dividir 75 duraznos entre 7 hogares, ¿cuántos duraznos sobraron de resto? (75 : 7)',
              opciones: {
                A: '3 duraznos.',
                B: '5 duraznos.',
                C: '7 duraznos.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Muy bien identificado el resto! 7 × 10 = 70, sobran exactamente 5 duraznos.',
              retroalimentacion_negativa: '¡Comprueba la división! 7 por 10 es 70. Para llegar a 75 faltan 5.',
              habilidad: 'Calcular',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué fórmula permite comprobar que una división con resto está bien resuelta?',
              opciones: {
                A: 'Dividendo = (Divisor × Cociente) + Resto.',
                B: 'Dividendo = Divisor + Resto.',
                C: 'Cociente = Resto × 2.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Correcto! Multiplicar el divisor por el cociente y sumar el resto debe dar exactamente el dividendo.',
              retroalimentacion_negativa: '¡Recuerda el algoritmo de comprobación! (Divisor × Cociente) + Resto = Dividendo.',
              habilidad: 'Representar y modelar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 3',
        nombre: 'Unidad 3: Fracciones y números decimales (décimos y centésimos)',
        mes: 'Agosto - Septiembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Sumo Primero (Tomo 2)',
        enfoque: 'Fracciones equivalentes, suma/resta de fracciones de igual denominador, y números decimales en la recta numérica y mediciones.',
        oas: ['OA 08', 'OA 11'],
        descripcion:
          'Demostrar que comprende las fracciones con denominadores 2, 3, 4, 5, 6, 8, 10 y 100, y relacionar fracciones decimales con números decimales.',
        defaultQuiz: {
          nivel: '4° Básico',
          unidad: 'Unidad 3: Fracciones y números decimales (décimos y centésimos)',
          mes_estimado: 'Agosto - Septiembre',
          eje_tematico: 'Fracciones y Números Decimales',
          oa: 'OA 08, OA 11: Fracciones equivalentes y números decimales',
          objetivos_aprendizaje: ['OA 08', 'OA 11'],
          titulo_texto: 'Las medidas de la huerta y los bidones de agua',
          texto_oficial: `Para regar las plantas medicinales, Tomás utilizó un bidón graduado de 1 litro de capacidad. Llenó 3/10 (tres décimos) de litro con agua de lluvia y luego agregó 4/10 de litro más. En total, Tomás calculó que tenía 7/10 de litro (3/10 + 4/10 = 7/10). Su profesora le explicó que 7/10 se escribe también como número decimal: 0,7 litros. Para completar el litro entero (1,0 L), Tomás descubrió que solo faltaban 3 décimos (0,3 L).`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuánta agua en total juntó Tomás sumando 3/10 y 4/10 de litro? (3/10 + 4/10)',
              opciones: {
                A: '7/20 de litro.',
                B: '7/10 de litro.',
                C: '1/10 de litro.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Excelente suma de fracciones con igual denominador! Se suman los numeradores: 3 + 4 = 7, y se mantiene el 10.',
              retroalimentacion_negativa: '¡Cuidado con el denominador! Al tener igual denominador (10), solo se suman los números de arriba (3 + 4 = 7/10).',
              habilidad: 'Calcular',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Cómo se escribe la fracción 7/10 en formato de número decimal?',
              opciones: {
                A: '0,07.',
                B: '0,7.',
                C: '7,0.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Muy bien! Siete décimos corresponde a 0 enteros y 7 décimos: 0,7.',
              retroalimentacion_negativa: '¡Recuerda los decimales! El primer lugar después de la coma son los décimos: 0,7.',
              habilidad: 'Representar y modelar',
            },
            {
              id_pregunta: 3,
              enunciado: 'Si tenemos 0,7 litros en el bidón, ¿cuántos litros decimales faltan para completar 1,0 litro?',
              opciones: {
                A: '0,3 litros.',
                B: '0,5 litros.',
                C: '0,2 litros.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Correcto! 1,0 - 0,7 = 0,3 litros restantes.',
              retroalimentacion_negativa: '¡Resta mentalmente! De 7 décimos para llegar al entero (10 décimos) faltan 3 décimos (0,3).',
              habilidad: 'Resolver problemas',
            },
          ],
        },
      },
      {
        numero: 'Unidad 4',
        nombre: 'Unidad 4: Cálculo de área en cuadrícula y resolución',
        mes: 'Octubre - Diciembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Sumo Primero (Tomo 2)',
        enfoque: 'Área de cuadrados y rectángulos mediante cuadrículas y multiplicación (largo × ancho), y ecuaciones de un paso.',
        oas: ['OA 14', 'OA 23'],
        descripcion:
          'Demostrar que comprende el concepto de área en cuadrículas y figuras compuestas, y resolver problemas que involucren ecuaciones aditivas simples.',
        defaultQuiz: {
          nivel: '4° Básico',
          unidad: 'Unidad 4: Cálculo de área en cuadrícula y resolución',
          mes_estimado: 'Octubre - Diciembre',
          eje_tematico: 'Geometría, Medición y Álgebra',
          oa: 'OA 14, OA 23: Cálculo de área y ecuaciones simples',
          objetivos_aprendizaje: ['OA 14', 'OA 23'],
          titulo_texto: 'El diseño del piso de cerámica de la biblioteca',
          texto_oficial: `La municipalidad renovará el piso de la biblioteca comunal con baldosas cuadradas de 1 metro cuadrado cada una. La sala de lectura es rectangular: mide 8 metros de largo por 6 metros de ancho. El arquitecto explicó que para calcular el área de la superficie, se multiplican las dos dimensiones: 8 × 6 = 48 metros cuadrados. Para saber cuántas cajas de cerámica faltaban, plantearon la ecuación: x + 20 = 48, concluyendo que necesitaban 28 baldosas más.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuál es el área total de la sala rectangular de 8 metros de largo por 6 metros de ancho? (8 × 6)',
              opciones: {
                A: '28 metros cuadrados.',
                B: '48 metros cuadrados.',
                C: '56 metros cuadrados.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Excelente cálculo de área! Largo × ancho: 8 × 6 = 48 m².',
              retroalimentacion_negativa: '¡Multiplica ambas dimensiones! 8 metros por 6 metros es igual a 48 m².',
              habilidad: 'Calcular',
            },
            {
              id_pregunta: 2,
              enunciado: 'Si ya tienen 20 baldosas y la ecuación es x + 20 = 48, ¿cuántas baldosas faltan? (48 - 20)',
              opciones: {
                A: '18 baldosas.',
                B: '28 baldosas.',
                C: '38 baldosas.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Muy bien resuelta la ecuación! 48 - 20 = 28 baldosas.',
              retroalimentacion_negativa: '¡Despeja la incógnita! Resta 20 a 48: 48 - 20 = 28.',
              habilidad: 'Resolver problemas',
            },
            {
              id_pregunta: 3,
              enunciado: '¿En qué se diferencia el área del perímetro?',
              opciones: {
                A: 'El área mide la superficie interior plana (en m²), mientras que el perímetro mide el contorno exterior.',
                B: 'El área mide el tiempo en minutos y el perímetro mide la masa en kilos.',
                C: 'No hay ninguna diferencia, son exactamente lo mismo.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Perfecto! El perímetro es la línea exterior y el área es toda la superficie cubierta por dentro.',
              retroalimentacion_negativa: '¡Recuerda los conceptos! Perímetro es contorno; área es la superficie interior.',
              habilidad: 'Representar y modelar',
            },
          ],
        },
      },
    ],
  },
};

export function getMatematicaUnitsForNivel(nivel: string): MatematicaUnitDefinition[] {
  const info = MINEDUC_MATEMATICA_CURRICULUM[nivel];
  return info ? info.unidades : [];
}

export function getMatematicaUnit(
  nivel: string,
  unitNumberOrName: string
): MatematicaUnitDefinition | undefined {
  const units = getMatematicaUnitsForNivel(nivel);
  return units.find(
    (u) =>
      u.numero === unitNumberOrName ||
      u.nombre === unitNumberOrName ||
      u.nombre.includes(unitNumberOrName) ||
      unitNumberOrName.includes(u.numero)
  );
}

export function getDefaultMatematicaQuizForNivelAndUnit(
  nivel: string,
  unitNumber: string
): MineducQuizResult {
  const unit = getMatematicaUnit(nivel, unitNumber);
  if (unit) return unit.defaultQuiz;
  const units = getMatematicaUnitsForNivel(nivel);
  if (units.length > 0) return units[0].defaultQuiz;
  return MINEDUC_MATEMATICA_CURRICULUM['1° Básico'].unidades[0].defaultQuiz;
}

export function getMatematicaSampleTextForNivelAndUnit(
  nivel: string,
  unitNumber: string
): { title: string; text: string; source: string; oa: string } | null {
  const unit = getMatematicaUnit(nivel, unitNumber);
  if (!unit) return null;
  return {
    title: unit.defaultQuiz.titulo_texto || unit.nombre,
    text: unit.defaultQuiz.texto_oficial || '',
    source: `Currículum Nacional de Matemática • Programa Sumo Primero • ${unit.tomo}`,
    oa: unit.oas.join(', '),
  };
}

export function getMatematicaSampleTextsForNivel(nivel: string): SampleMineducText[] {
  const units = getMatematicaUnitsForNivel(nivel);
  return units.map((u) => ({
    id: `mat-${nivel.replace(/[^0-9]/g, '')}-${u.numero.toLowerCase().replace(/\s+/g, '-')}`,
    nivel: nivel as any,
    unidad: u.numero as any,
    title: u.defaultQuiz.titulo_texto || u.nombre,
    source: `Currículum Nacional de Matemática • Programa Sumo Primero • ${u.tomo}`,
    genre: 'Problema Matemático y Situación Cotidiana',
    oa: u.oas.join(', '),
    text: u.defaultQuiz.texto_oficial || '',
  }));
}

export function getMatematicaVocabularyWordsForUnit(
  nivel: string,
  unitNumber: string
): string[] {
  const bank: Record<string, Record<string, string[]>> = {
    '1° Básico': {
      'Unidad 1': [
        'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez',
        'contar', 'número', 'manzana', 'canasto', 'juntar', 'frutas', 'dedo', 'total',
        'más', 'menos', 'igual', 'mesa', 'hermano', 'ordenar', 'primero', 'grupo', 'cantidad', 'dibujo', 'almuerzo', 'familia',
      ],
      'Unidad 2': [
        'sumar', 'restar', 'agregar', 'quitar', 'pájaro', 'rama', 'viento', 'semilla',
        'jardín', 'seis', 'dos', 'cuatro', 'cinco', 'uno', 'más', 'menos',
        'igual', 'árbol', 'quillay', 'sol', 'mañana', 'volar', 'quedar', 'llegar', 'colegio', 'cálculo', 'operación', 'resultado', 'total', 'grupo',
      ],
      'Unidad 3': [
        'decena', 'unidades', 'diez', 'cinco', 'quince', 'veinte', 'cuadrado', 'triángulo',
        'figura', 'mural', 'techo', 'casa', 'ventana', 'papel', 'pegar', 'colores',
        'forma', 'lado', 'esquina', 'vértice', 'sumar', 'total', 'sala', 'clases', 'profesora', 'julián', 'grupo', 'número', 'rectángulo', 'círculo',
      ],
      'Unidad 4': [
        'patrón', 'repetir', 'collar', 'semilla', 'redonda', 'alargada', 'regla', 'lápiz',
        'cuaderno', 'largo', 'medir', 'doce', 'seis', 'dieciocho', 'total', 'sumar',
        'longitud', 'orden', 'diseño', 'compañera', 'camila', 'plaza', 'roja', 'azul', 'mesa', 'tamaño', 'paso', 'resultado', 'contar', 'figura',
      ],
    },
    '2° Básico': {
      'Unidad 1': [
        'decena', 'unidad', 'cuarenta', 'siete', 'cincuenta', 'cien', 'autito', 'caja',
        'repisa', 'colección', 'valor', 'posición', 'diego', 'cumpleaños', 'tía', 'regalo',
        'contar', 'agrupar', 'ordenar', 'comparar', 'mayor', 'menor', 'número', 'total', 'juguete', 'diez', 'suelto', 'sumar', 'cálculo', 'tabla',
      ],
      'Unidad 2': [
        'sesenta', 'veintitrés', 'cuarenta', 'dos', 'quince', 'cincuenta', 'siete', 'volantín',
        'kermés', 'escuela', 'vender', 'tabla', 'colaborar', 'familia', 'mañana', 'tarde',
        'restar', 'sumar', 'disminuir', 'aumentar', 'diferencia', 'total', 'reserva', 'unidad', 'decena', 'algoritmo', 'vertical', 'resultado', 'apoderado', 'curso',
      ],
      'Unidad 3': [
        'multiplicar', 'veces', 'galleta', 'paquete', 'bolsa', 'cinco', 'tres', 'quince',
        'moneda', 'peso', 'diez', 'cincuenta', 'noventa', 'kiosco', 'recreo', 'ignacio',
        'pagar', 'compartir', 'suma', 'reiterada', 'grupo', 'igual', 'dinero', 'comprar', 'avena', 'amigos', 'total', 'operación', 'cálculo', 'valor',
      ],
      'Unidad 4': [
        'centímetro', 'metro', 'longitud', 'regla', 'medir', 'puente', 'madera', 'cubo',
        'veintiocho', 'catorce', 'cuarenta', 'dos', 'maqueta', 'bloque', 'pilar', 'camino',
        'tecnología', 'matemática', 'suma', 'reserva', 'cuerpo', 'figura', 'cara', 'vértice', 'arista', 'precisión', 'estándar', 'herramienta', 'sala', 'total',
      ],
    },
    '3° Básico': {
      'Unidad 1': [
        'centena', 'decena', 'unidad', 'trescientos', 'doscientos', 'ochocientos', 'seiscientos', 'veinticinco',
        'botella', 'plástico', 'reciclaje', 'campaña', 'comunidad', 'colegio', 'meta', 'semana',
        'sumar', 'restar', 'canje', 'reserva', 'algoritmo', 'estimar', 'redondear', 'diferencia', 'total', 'profesor', 'estudiantes', 'posición', 'cálculo', 'valor',
      ],
      'Unidad 2': [
        'multiplicar', 'fila', 'almácigo', 'bandeja', 'lechuga', 'huerto', 'seis', 'ocho',
        'cuarenta', 'ocho', 'cuatro', 'ciento', 'noventa', 'dos', 'descomponer', 'distributiva',
        'semilla', 'tierra', 'plantar', 'sofía', 'club', 'ciencias', 'matriz', 'tabla', 'producto', 'factor', 'cálculo', 'mental', 'trasplantar', 'total',
      ],
      'Unidad 3': [
        'dividir', 'repartir', 'equitativo', 'veinticuatro', 'seis', 'cuatro', 'manzana', 'grupo',
        'fracción', 'entero', 'medio', 'cuarto', 'pizza', 'porción', 'trozo', 'martín',
        'colación', 'numerador', 'denominador', 'parte', 'todo', 'sobrar', 'exacto', 'profesora', 'compañero', 'compartir', 'operación', 'cociente', 'dividendo', 'total',
      ],
      'Unidad 4': [
        'perímetro', 'rectángulo', 'huerta', 'metro', 'cinco', 'tres', 'dieciséis', 'contorno',
        'cerca', 'madera', 'tabla', 'dos', 'ocho', 'lado', 'suma', 'longitud',
        'verdura', 'proteger', 'escuela', 'estudiantes', 'comprar', 'geometría', 'figura', 'regular', 'exterior', 'medir', 'paso', 'problema', 'total', 'resultado',
      ],
    },
    '4° Básico': {
      'Unidad 1': [
        'unidad', 'mil', 'centena', 'decena', 'tres', 'dos', 'seis', 'doscientos',
        'treinta', 'asistente', 'estadio', 'festival', 'deportivo', 'puerta', 'norte', 'sur',
        'redondear', 'estimación', 'aproximar', 'periódico', 'cifra', 'comuna', 'comité', 'algoritmo', 'reserva', 'exacto', 'posición', 'valor', 'sumar', 'total',
      ],
      'Unidad 2': [
        'multiplicar', 'dividir', 'bandeja', 'durazno', 'veinticinco', 'doce', 'trescientos', 'setenta',
        'cinco', 'siete', 'diez', 'cinco', 'resto', 'residuo', 'cociente', 'dividendo',
        'divisor', 'embalaje', 'cooperativa', 'agrícola', 'hogar', 'ancianos', 'comprobar', 'fórmula', 'algoritmo', 'jornada', 'producción', 'trabajadores', 'resultado', 'total',
      ],
      'Unidad 3': [
        'fracción', 'decimal', 'décimo', 'centésimo', 'litro', 'bidón', 'agua', 'lluvia',
        'tres', 'cuatro', 'siete', 'diez', 'cero', 'coma', 'recta', 'planta',
        'tomás', 'profesora', 'completar', 'sumar', 'denominador', 'numerador', 'equivalente', 'graduado', 'capacidad', 'medir', 'medicinal', 'formato', 'entero', 'total',
      ],
      'Unidad 4': [
        'área', 'superficie', 'perímetro', 'metro', 'cuadrado', 'baldosa', 'rectángulo', 'biblioteca',
        'ocho', 'seis', 'cuarenta', 'ocho', 'veinte', 'veintiocho', 'ecuación', 'incógnita',
        'largo', 'ancho', 'multiplicar', 'arquitecto', 'piso', 'cerámica', 'municipalidad', 'dimensión', 'plana', 'interior', 'contorno', 'caja', 'sala', 'total',
      ],
    },
  };

  const gradeBank = bank[nivel] || bank['1° Básico'];
  const unitBank = gradeBank[unitNumber] || gradeBank['Unidad 1'];
  return unitBank;
}
