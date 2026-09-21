import { MineducQuizResult, SampleMineducText } from '../types';
import { MineducUnitDefinition } from './mineducUnits';

export interface CienciasUnitDefinition {
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

export interface CienciasNivelInfo {
  titulo: string;
  edad: string;
  resumen: string;
  unidades: CienciasUnitDefinition[];
}

export const MINEDUC_CIENCIAS_CURRICULUM: Record<string, CienciasNivelInfo> = {
  // =========================================================================
  // 1° BÁSICO - CIENCIAS NATURALES
  // =========================================================================
  '1° Básico': {
    titulo: 'Ciencias Naturales 1° Básico',
    edad: '6 a 7 años',
    resumen:
      'Reconocimiento de seres vivos y lo no vivo, exploración de los cinco sentidos, hábitos de vida saludable, animales y plantas nativas de Chile y materiales del entorno cotidiano.',
    unidades: [
      {
        numero: 'Unidad 1',
        nombre: 'Unidad 1: Los seres vivos de mi entorno',
        mes: 'Marzo - Abril',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Ciencias Naturales 1°',
        enfoque: 'Diferencia entre seres vivos y elementos inertes (lo que no tiene vida), necesidades de agua, alimento y aire.',
        oas: ['OA 01', 'OA 02'],
        descripcion:
          'Reconocer y observar, por medio de la exploración, que los seres vivos crecen, responden a estímulos del medio, se reproducen y necesitan agua, alimento y aire para vivir.',
        defaultQuiz: {
          nivel: '1° Básico',
          unidad: 'Unidad 1: Los seres vivos de mi entorno',
          mes_estimado: 'Marzo - Abril',
          eje_tematico: 'Ciencias de la Vida',
          oa: 'OA 01, OA 02: Reconocer seres vivos y sus necesidades vitales',
          objetivos_aprendizaje: ['OA 01', 'OA 02'],
          titulo_texto: 'La pequeña chinita en el jardín de la escuela',
          texto_oficial: `Sofía encontró una pequeña chinita roja sobre una hoja verde en el patio de la escuela. Observó con una lupa que la chinita caminaba despacio buscando gotas de agua fresca para beber. Al lado de la planta había una piedra redonda y gris. Sofía se dio cuenta de que la chinita es un ser vivo porque se mueve por sí misma, necesita agua para vivir y crece con el tiempo. En cambio, la piedra no come, no bebe agua ni tiene crías, porque es un elemento sin vida. Sofía cuidó con mucho cariño la plantita para que la chinita tuviera un hogar seguro.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Qué buscaba la chinita sobre la hoja verde?',
              opciones: {
                A: 'Un trozo de pan seco.',
                B: 'Gotas de agua fresca para beber.',
                C: 'Una moneda brillante.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Muy bien observado! El texto dice claramente que la chinita buscaba gotas de agua fresca.',
              retroalimentacion_negativa: 'Revisa el texto: la chinita caminaba despacio buscando agua para calmar su sed.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Por qué la piedra del patio es un elemento sin vida?',
              opciones: {
                A: 'Porque no necesita agua, no come ni tiene crías.',
                B: 'Porque es de color verde brillante.',
                C: 'Porque puede volar por el aire.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Excelente deducción científica! Las piedras no tienen vida porque no crecen ni se alimentan.',
              retroalimentacion_negativa: 'Piensa en lo que hacen los seres vivos: nacen, crecen y se alimentan. Las piedras no hacen eso.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué acción de Sofía demuestra cuidado por la naturaleza?',
              opciones: {
                A: 'Pisar la planta para que la chinita vuele.',
                B: 'Cuidar con cariño la plantita para proteger el hogar de la chinita.',
                C: 'Llevarse la piedra a la sala de clases.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Hermosa actitud ecológica! Proteger las plantas asegura refugio y vida para los insectos.',
              retroalimentacion_negativa: 'Revisa el final del texto: Sofía protegió la plantita con mucho respeto y cariño.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 2',
        nombre: 'Unidad 2: Mis sentidos y el cuidado del cuerpo',
        mes: 'Mayo - Junio',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Ciencias Naturales 1°',
        enfoque: 'Los 5 sentidos (visión, audición, tacto, olfato, gusto) y hábitos de higiene personal.',
        oas: ['OA 06', 'OA 07'],
        descripcion:
          'Identificar y describir la ubicación y la función de los sentidos proponiendo medidas para protegerlos y prevenir situaciones de riesgo.',
        defaultQuiz: {
          nivel: '1° Básico',
          unidad: 'Unidad 2: Mis sentidos y el cuidado del cuerpo',
          mes_estimado: 'Mayo - Junio',
          eje_tematico: 'Cuerpo Humano y Salud',
          oa: 'OA 06, OA 07: Identificar los sentidos y el cuidado corporal',
          objetivos_aprendizaje: ['OA 06', 'OA 07'],
          titulo_texto: 'Una tarde de exploración con los cinco sentidos',
          texto_oficial: `Tomás y su abuelo salieron a caminar por la huerta después de la lluvia. Con sus ojos, Tomás vio las flores amarillas llenas de luz. Con su nariz, olió el rico perfume a tierra mojada. Con sus oídos, escuchó el canto melodioso de una bandurria en los árboles. Luego, con la piel de sus manos, sintió la suave textura de una manzana fresca, y al darle un mordisco, con su lengua sintió su sabor dulce y crujiente. Su abuelo le recordó que para cuidar los sentidos no debemos meter objetos en los oídos, ni frotarnos los ojos con las manos sucias.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Con qué órgano Tomás pudo oler el perfume a tierra mojada?',
              opciones: {
                A: 'Con sus ojos.',
                B: 'Con su nariz mediante el sentido del olfato.',
                C: 'Con sus rodillas.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Correcto! Usamos la nariz y el olfato para percibir todos los olores del entorno.',
              retroalimentacion_negativa: 'Piensa en qué parte de la cara usamos para sentir los aromas y perfumes.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Qué sentido permitió a Tomás disfrutar el sabor dulce de la manzana?',
              opciones: {
                A: 'El sentido del tacto en los codos.',
                B: 'El sentido de la vista en las pestañas.',
                C: 'El sentido del gusto ubicado en la lengua.',
              },
              respuesta_correcta: 'C',
              retroalimentacion_positiva: '¡Muy bien! Las papilas gustativas de la lengua nos permiten reconocer lo dulce, salado y ácido.',
              retroalimentacion_negativa: 'El sabor de los alimentos se percibe en la boca gracias a la lengua y el sentido del gusto.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Cuál de los siguientes consejos cuida nuestros órganos de los sentidos?',
              opciones: {
                A: 'No introducir objetos puntiagudos en los oídos y lavarse las manos.',
                B: 'Mirar directamente al sol sin lentes oscuros.',
                C: 'Escuchar música con el volumen al máximo todo el día.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Excelente medida preventiva! Mantener los oídos limpios sin objetos peligrosos previene lesiones.',
              retroalimentacion_negativa: 'Recuerda lo que aconsejó el abuelo para no lastimar los ojos ni los oídos.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 3',
        nombre: 'Unidad 3: Animales y plantas de Chile',
        mes: 'Julio - Septiembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Ciencias Naturales 1°',
        enfoque: 'Hábitats, cubiertas corporales (pelos, plumas, escamas) y flora y fauna nativa.',
        oas: ['OA 03', 'OA 05'],
        descripcion:
          'Observar e identificar animales nativos de Chile, sus estructuras corporales y hábitats, promoviendo su protección.',
        defaultQuiz: {
          nivel: '1° Básico',
          unidad: 'Unidad 3: Animales y plantas de Chile',
          mes_estimado: 'Julio - Septiembre',
          eje_tematico: 'Ciencias de la Vida',
          oa: 'OA 03, OA 05: Conocer la fauna y flora nativa de Chile y sus adaptaciones',
          objetivos_aprendizaje: ['OA 03', 'OA 05'],
          titulo_texto: 'El pudú y la araucaria en los bosques del sur',
          texto_oficial: `En el sur de Chile llueve mucho y crecen bosques verdes y frondosos. En estos bosques vive el pudú, uno de los ciervos más pequeños del planeta. Su cuerpo está cubierto de un pelaje café espeso que lo abriga del frío y lo esconde entre los arbustos. Cerca de él se elevan las araucarias milenarias, árboles con hojas duras y puntiagudas que resisten la nieve y el viento. El pudú se alimenta de hojas tiernas, ramitas y frutos caídos. Como este ciervo es tímido y está en peligro, los guardaparques cuidan su hábitat para que nadie tale los árboles ni contamine los arroyos.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿De qué está cubierto el cuerpo del pudú para abrigarse del frío?',
              opciones: {
                A: 'De plumas de colores.',
                B: 'De un pelaje café espeso.',
                C: 'De escamas brillantes como los peces.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Exacto! El pelaje espeso de los mamíferos como el pudú los aísla de las bajas temperaturas.',
              retroalimentacion_negativa: 'Vuelve a leer: el pudú es un mamífero con pelaje café que lo abriga.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Por qué las hojas de la araucaria son duras y puntiagudas?',
              opciones: {
                A: 'Para que los pájaros no puedan dormir en ellas.',
                B: 'Porque están hechas de metal fundido.',
                C: 'Para resistir el viento frío y el peso de la nieve en la montaña.',
              },
              respuesta_correcta: 'C',
              retroalimentacion_positiva: '¡Magnífica deducción adaptativa! Las plantas de climas fríos tienen hojas resistentes a la nieve.',
              retroalimentacion_negativa: 'Fíjate en el clima donde viven las araucarias: la nieve y el viento moldean sus hojas.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué podemos hacer para proteger al pudú y su hábitat?',
              opciones: {
                A: 'Cuidar los bosques nativos, no botar basura y evitar la tala de árboles.',
                B: 'Llevar perros sueltos al bosque para que persigan a los animales.',
                C: 'Encender fogatas cerca de los árboles secos.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Gran compromiso ecológico! Preservar los bosques nativos asegura que el pudú siga viviendo en paz.',
              retroalimentacion_negativa: 'Piensa en las acciones que ayudan a los animales silvestres sin alterar su hogar natural.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 4',
        nombre: 'Unidad 4: Los materiales que nos rodean',
        mes: 'Octubre - Diciembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Ciencias Naturales 1°',
        enfoque: 'Propiedades de los materiales (madera, vidrio, metal, plástico, goma) y su uso.',
        oas: ['OA 08', 'OA 09'],
        descripcion:
          'Explorar y describir las propiedades de diversos materiales de uso cotidiano (fragilidad, flexibilidad, transparencia, impermeabilidad) clasificándolos según sus usos.',
        defaultQuiz: {
          nivel: '1° Básico',
          unidad: 'Unidad 4: Los materiales que nos rodean',
          mes_estimado: 'Octubre - Diciembre',
          eje_tematico: 'Ciencias Físicas y Químicas',
          oa: 'OA 08, OA 09: Identificar y describir propiedades de los materiales',
          objetivos_aprendizaje: ['OA 08', 'OA 09'],
          titulo_texto: 'Los objetos de la sala de clases y sus materiales',
          texto_oficial: `En la sala de clases, Mateo y Camila clasificaron diferentes objetos según el material del que están fabricados. La ventana es de vidrio transparente, lo que permite que la luz del sol entre a la sala y podamos ver hacia el patio. Las patas de la mesa son de metal resistente para soportar el peso de los cuadernos. La regla de Camila es de plástico flexible que se puede doblar un poco sin romperse. Y los lápices están hechos de madera suave fácil de sacar punta. Mateo aprendió que cada material se elige por sus propiedades especiales para cumplir una función útil.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Por qué la ventana de la sala está hecha de vidrio transparente?',
              opciones: {
                A: 'Porque no deja pasar nada de luz.',
                B: 'Porque es transparente y permite que entre la luz del sol.',
                C: 'Porque es suave como una almohada.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Excelente! La transparencia del vidrio permite iluminar las habitaciones de forma natural.',
              retroalimentacion_negativa: 'Piensa en lo que pasa cuando miras por una ventana de vidrio: puedes ver hacia afuera.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: 'Si necesitamos fabricar un paraguas para la lluvia, ¿qué propiedad del material es indispensable?',
              opciones: {
                A: 'Que sea impermeable para que el agua no traspase la tela.',
                B: 'Que sea de vidrio pesado y duro.',
                C: 'Que sea de papel absorbente.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Muy bien pensado! Un material impermeable impide el paso del agua y nos mantiene secos.',
              retroalimentacion_negativa: 'Si el agua pudiera pasar a través del paraguas, nos mojaríamos. Necesitamos impermeabilidad.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Por qué es importante reciclar objetos de plástico y vidrio?',
              opciones: {
                A: 'Para que no contaminen los ríos y se puedan volver a utilizar.',
                B: 'Porque ocupan mucho espacio en las mochilas.',
                C: 'Porque cambian de color con el calor.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Maravillosa conciencia ambiental! Reciclar reduce la basura en la naturaleza y ahorra recursos.',
              retroalimentacion_negativa: 'Reciclar ayuda a cuidar el planeta evitando que los plásticos dañen a los animales marinos.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
    ],
  },

  // =========================================================================
  // 2° BÁSICO - CIENCIAS NATURALES
  // =========================================================================
  '2° Básico': {
    titulo: 'Ciencias Naturales 2° Básico',
    edad: '7 a 8 años',
    resumen:
      'Órganos vitales del cuerpo humano (corazón, pulmones, estómago, esqueleto y músculos), clasificación de animales vertebrados e invertebrados, ciclos de vida y el agua en la Tierra.',
    unidades: [
      {
        numero: 'Unidad 1',
        nombre: 'Unidad 1: Mi cuerpo y los órganos vitales',
        mes: 'Marzo - Abril',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Ciencias Naturales 2°',
        enfoque: 'Ubicación y función de corazón, pulmones, estómago, esqueleto y músculos.',
        oas: ['OA 07', 'OA 08'],
        descripcion:
          'Identificar la ubicación y explicar la función del corazón, los pulmones, el estómago, el esqueleto y los músculos en el cuerpo humano.',
        defaultQuiz: {
          nivel: '2° Básico',
          unidad: 'Unidad 1: Mi cuerpo y los órganos vitales',
          mes_estimado: 'Marzo - Abril',
          eje_tematico: 'Cuerpo Humano y Salud',
          oa: 'OA 07, OA 08: Describir órganos vitales y hábitos de vida activa',
          objetivos_aprendizaje: ['OA 07', 'OA 08'],
          titulo_texto: 'El motor del cuerpo: el corazón y los pulmones',
          texto_oficial: `Durante la clase de educación física, Matías corrió alrededor de la cancha. Al detenerse, sintió que en su pecho latía un tambor con fuerza y que respiraba más rápido. Su profesora le explicó que el corazón es un músculo incansable ubicado en el tórax que bombea sangre a todo el cuerpo para transportar oxígeno y nutrientes. Al mismo tiempo, los pulmones se llenan de aire fresco al inhalar y expulsan dióxido de carbono al exhalar. Para que nuestros órganos funcionen sanos, debemos realizar ejercicio diario, beber suficiente agua y comer frutas y verduras.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuál es la función principal del corazón en nuestro cuerpo?',
              opciones: {
                A: 'Masticar la comida que comemos en el almuerzo.',
                B: 'Bombear sangre a todo el cuerpo transportando oxígeno y nutrientes.',
                C: 'Sostener los huesos de las piernas.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Exacto! El corazón bombea la sangre día y noche sin descanso por todas nuestras venas y arterias.',
              retroalimentacion_negativa: 'Vuelve al texto: el corazón actúa como una bomba muscular que envía sangre a todo el organismo.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Por qué Matías respiraba más rápido después de correr por la cancha?',
              opciones: {
                A: 'Porque sus músculos necesitaban más oxígeno para reponer energía.',
                B: 'Porque hacía mucho frío en el patio de la escuela.',
                C: 'Porque sus pulmones se habían quedado dormidos.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Gran comprensión biológica! Al correr, el cuerpo demanda más oxígeno, aumentando el ritmo respiratorio.',
              retroalimentacion_negativa: 'Cuando hacemos actividad física vigorosa, el cuerpo necesita más aire y oxígeno con rapidez.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué hábito diario ayuda a mantener fuerte y saludable nuestro corazón?',
              opciones: {
                A: 'Pasar todo el día sentado jugando videojuegos sin moverse.',
                B: 'Hacer actividad física, jugar al aire libre y comer sano.',
                C: 'Tomar bebidas con mucha azúcar todos los días.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Muy bien! El movimiento corporal fortalece el corazón y nos llena de energía.',
              retroalimentacion_negativa: 'El corazón es un músculo: se beneficia del ejercicio aeróbico regular y la buena nutrición.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 2',
        nombre: 'Unidad 2: Animales vertebrados e invertebrados',
        mes: 'Mayo - Junio',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Ciencias Naturales 2°',
        enfoque: 'Columna vertebral y esqueleto interno; grupos de vertebrados (mamíferos, aves, reptiles, anfibios, peces).',
        oas: ['OA 01', 'OA 02'],
        descripcion:
          'Observar, describir y clasificar a los animales vertebrados según su cubierta corporal, respiración y reproducción.',
        defaultQuiz: {
          nivel: '2° Básico',
          unidad: 'Unidad 2: Animales vertebrados e invertebrados',
          mes_estimado: 'Mayo - Junio',
          eje_tematico: 'Ciencias de la Vida',
          oa: 'OA 01, OA 02: Clasificar vertebrados e invertebrados',
          objetivos_aprendizaje: ['OA 01', 'OA 02'],
          titulo_texto: 'Los vertebrados de la cordillera y el mar chileno',
          texto_oficial: `Los animales vertebrados se caracterizan por tener un esqueleto interno con columna vertebral que sostiene su cuerpo y protege sus órganos internos. En Chile encontramos cinco grandes grupos de vertebrados: los mamíferos como el puma, que tienen pelo y maman leche al nacer; las aves como el cóndor, que tienen plumas y nacen por huevos; los peces como el jurel, que respiran por branquias en el mar; los anfibios como la ranita de Darwin, que tienen piel húmeda; y los reptiles como la lagartija esbelta, con escamas secas. En cambio, los invertebrados, como las mariposas y los cangrejos, no poseen columna vertebral.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Qué característica comparten todos los animales vertebrados?',
              opciones: {
                A: 'Tienen un esqueleto interno formado por columna vertebral.',
                B: 'Vuelan por el cielo con alas de plumas.',
                C: 'Viven únicamente dentro del agua salada.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Exactamente! La presencia de columna vertebral y esqueleto interno define a los vertebrados.',
              retroalimentacion_negativa: 'Revisa el primer párrafo: los vertebrados tienen huesos y columna vertebral por dentro.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Por qué el puma se clasifica en el grupo de los mamíferos?',
              opciones: {
                A: 'Porque respira bajo el agua con branquias.',
                B: 'Porque tiene el cuerpo con pelo y sus crías se alimentan de leche materna.',
                C: 'Porque pone huevos en la arena caliente.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Excelente! Los mamíferos amamantan a sus crías y poseen pelaje protector.',
              retroalimentacion_negativa: 'Piensa en cómo nacen y se alimentan los cachorros de puma cuando son pequeños.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Cuál de los siguientes animales es un invertebrado sin columna vertebral?',
              opciones: {
                A: 'La mariposa monarca.',
                B: 'El cóndor andino.',
                C: 'El delfín chileno.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Muy bien! Los insectos como las mariposas son invertebrados: no tienen huesos ni columna vertebral.',
              retroalimentacion_negativa: 'El cóndor y el delfín tienen esqueleto interno con huesos; las mariposas pertenecen a los invertebrados.',
              habilidad: 'Inferir e interpretar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 3',
        nombre: 'Unidad 3: Ciclos de vida en la naturaleza',
        mes: 'Julio - Septiembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Ciencias Naturales 2°',
        enfoque: 'Nacimiento, desarrollo, reproducción y muerte en mamíferos, aves, anfibios e insectos.',
        oas: ['OA 03', 'OA 04'],
        descripcion:
          'Observar y comparar las etapas de los ciclos de vida de distintos seres vivos, reconociendo metamorfosis y desarrollo directo.',
        defaultQuiz: {
          nivel: '2° Básico',
          unidad: 'Unidad 3: Ciclos de vida en la naturaleza',
          mes_estimado: 'Julio - Septiembre',
          eje_tematico: 'Ciencias de la Vida',
          oa: 'OA 03, OA 04: Comparar ciclos de vida en seres vivos',
          objetivos_aprendizaje: ['OA 03', 'OA 04'],
          titulo_texto: 'La asombrosa transformación del sapo y la mariposa',
          texto_oficial: `Todos los seres vivos cumplen un ciclo de vida: nacen, crecen, se reproducen y mueren. Algunos animales experimentan grandes cambios en su forma corporal llamados metamorfosis. La mariposa pone un diminuto huevo sobre una hoja; del huevo nace una oruga comilona que luego se encierra en una crisálida o capullo. Tras varios días, ¡emerge una hermosa mariposa con alas! De manera similar, los sapos ponen huevos en el agua, de los cuales nacen renacuajos con cola que respiran por branquias. Poco a poco desarrollan patas, pierden la cola y se transforman en sapos adultos capaces de vivir en la tierra húmeda.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cómo se llama la transformación profunda que experimentan animales como la mariposa y el sapo?',
              opciones: {
                A: 'Invernación.',
                B: 'Metamorfosis.',
                C: 'Evaporación.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Muy bien! La metamorfosis es el cambio de forma que sufren durante su ciclo vital.',
              retroalimentacion_negativa: 'Revisa el texto: el cambio asombroso de cuerpo se denomina metamorfosis.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿En qué lugar nacen y respiran los renacuajos antes de convertirse en sapos adultos?',
              opciones: {
                A: 'En el agua, donde respiran mediante branquias.',
                B: 'En lo alto de las ramas de un árbol seco.',
                C: 'Bajo la arena caliente del desierto.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Correcto! Los renacuajos son acuáticos y usan branquias hasta desarrollar pulmones.',
              retroalimentacion_negativa: 'Los huevos de sapo se depositan en el agua de charcas y lagunas.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Por qué es fundamental que cuidemos las lagunas y esteros donde se reproducen los anfibios?',
              opciones: {
                A: 'Porque si secamos o ensuciamos el agua, los renacuajos no pueden nacer ni completar su ciclo de vida.',
                B: 'Porque las piedras del río necesitan sombra.',
                C: 'Porque los anfibios comen plástico.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Excelente reflexión ecológica! El agua limpia es el hogar imprescindible para los anfibios.',
              retroalimentacion_negativa: 'Sin agua limpia, los huevos de los anfibios no sobreviven y la especie desaparece.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 4',
        nombre: 'Unidad 4: El agua y el tiempo atmosférico',
        mes: 'Octubre - Diciembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Ciencias Naturales 2°',
        enfoque: 'Estados físicos del agua (sólido, líquido, gaseoso), ciclo del agua y estaciones del año.',
        oas: ['OA 09', 'OA 11'],
        descripcion:
          'Observar y describir los cambios del agua en la naturaleza, el ciclo hidrológico y las características del tiempo atmosférico a lo largo del año.',
        defaultQuiz: {
          nivel: '2° Básico',
          unidad: 'Unidad 4: El agua y el tiempo atmosférico',
          mes_estimado: 'Octubre - Diciembre',
          eje_tematico: 'Ciencias de la Tierra y el Universo',
          oa: 'OA 09, OA 11: Describir los estados del agua y el ciclo hidrológico',
          objetivos_aprendizaje: ['OA 09', 'OA 11'],
          titulo_texto: 'El viaje del agua desde la cordillera al mar',
          texto_oficial: `El agua es un recurso vital que se presenta en tres estados en nuestro país: sólido en la nieve y glaciares de la cordillera; líquido en los ríos, lagos y el inmenso océano Pacífico; y gaseoso como vapor invisible en el aire y formando nubes. El calor del sol calienta el agua de los mares, haciendo que se evapore y suba al cielo. Allí arriba, el frío la condensa en gotas diminutas que forman nubes. Cuando las nubes se enfrían aún más, cae lluvia o nieve sobre las montañas, alimentando los ríos que vuelven a viajar hacia el mar en un ciclo continuo sin fin.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿En qué estado se encuentra el agua en los glaciares y la nieve de la cordillera?',
              opciones: {
                A: 'Estado gaseoso.',
                B: 'Estado sólido.',
                C: 'Estado líquido.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Exacto! El hielo y la nieve representan el estado sólido del agua.',
              retroalimentacion_negativa: 'El hielo es agua congelada y firme, lo que corresponde al estado sólido.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Qué fenómeno permite que el agua del mar suba al cielo para formar nubes?',
              opciones: {
                A: 'La evaporación provocada por el calor del sol.',
                B: 'El viento que empuja a los peces hacia la orilla.',
                C: 'La congelación nocturna de la arena.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Muy bien! El calor solar transforma el agua líquida en vapor de agua ascendente.',
              retroalimentacion_negativa: 'El sol calienta el agua y la transforma en vapor, proceso llamado evaporación.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Por qué debemos cuidar el agua cerrando la llave mientras nos lavamos los dientes?',
              opciones: {
                A: 'Porque el agua dulce disponible para beber es escasa y vital para todos los seres vivos.',
                B: 'Porque a los cepillos de dientes no les gusta el agua.',
                C: 'Porque las cañerías se enfrían.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Gran conciencia ambiental! Solo una pequeña parte del agua del planeta es dulce y bebible.',
              retroalimentacion_negativa: 'El agua dulce es un tesoro limitado que debemos proteger evitando su desperdicio.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
    ],
  },

  // =========================================================================
  // 3° BÁSICO - CIENCIAS NATURALES
  // =========================================================================
  '3° Básico': {
    titulo: 'Ciencias Naturales 3° Básico',
    edad: '8 a 9 años',
    resumen:
      'Partes de las plantas y fotosíntesis, alimentación saludable y pirámide alimentaria, propiedades de la luz y el sonido, y el Sistema Solar.',
    unidades: [
      {
        numero: 'Unidad 1',
        nombre: 'Unidad 1: El mundo de las plantas y la fotosíntesis',
        mes: 'Marzo - Abril',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Ciencias Naturales 3°',
        enfoque: 'Estructuras de las plantas (raíz, tallo, hojas, flor, fruto) y proceso de fotosíntesis.',
        oas: ['OA 01', 'OA 03', 'OA 04'],
        descripcion:
          'Observar y describir las partes de una planta y sus funciones, explicando la fotosíntesis y la importancia de los vegetales como productores de oxígeno y alimento.',
        defaultQuiz: {
          nivel: '3° Básico',
          unidad: 'Unidad 1: El mundo de las plantas y la fotosíntesis',
          mes_estimado: 'Marzo - Abril',
          eje_tematico: 'Ciencias de la Vida',
          oa: 'OA 01, OA 03: Describir partes de las plantas y fotosíntesis',
          objetivos_aprendizaje: ['OA 01', 'OA 03'],
          titulo_texto: 'Las hojas verdes: fábricas naturales de oxígeno y alimento',
          texto_oficial: `Las plantas son seres vivos autótrofos, lo que significa que producen su propio alimento a través de un proceso llamado fotosíntesis. A través de la raíz absorben agua y minerales disueltos en la tierra, los cuales viajan por el tallo hasta llegar a las hojas. En las hojas existe una sustancia verde llamada clorofila que atrapa la energía de la luz solar. Con esta energía, la planta combina el agua con el dióxido de carbono del aire para fabricar glucosa (su alimento) y liberar oxígeno puro que los animales y seres humanos respiramos. Sin las plantas, la vida en la Tierra no sería posible.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Qué sustancia verde presente en las hojas permite capturar la energía de la luz solar?',
              opciones: {
                A: 'El dióxido de carbono.',
                B: 'La clorofila.',
                C: 'La sal marina.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Exacto! La clorofila es el pigmento verde que capta la luz solar para la fotosíntesis.',
              retroalimentacion_negativa: 'Vuelve al texto: en las hojas verdes se encuentra la clorofila que atrapa la luz del sol.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Qué gas indispensable para la respiración de los seres humanos liberan las plantas durante la fotosíntesis?',
              opciones: {
                A: 'Oxígeno puro.',
                B: 'Monóxido de carbono.',
                C: 'Humo denso.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Brillante! Las plantas purifican el aire liberando el oxígeno vital que respiramos.',
              retroalimentacion_negativa: 'Las plantas absorben dióxido de carbono y entregan oxígeno limpio a la atmósfera.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Por qué la reforestación con árboles nativos en Chile beneficia a todo el planeta?',
              opciones: {
                A: 'Porque absorben el exceso de calor y liberan oxígeno, conservando la biodiversidad.',
                B: 'Porque impiden que llueva en los campos.',
                C: 'Porque vuelven las piedras más blandas.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Excelente reflexión ecológica! Los árboles mitigan el cambio climático y protegen el suelo.',
              retroalimentacion_negativa: 'Plantar árboles limpia el aire, protege la fauna y regula el clima de nuestra comunidad.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 2',
        nombre: 'Unidad 2: Alimentación saludable y nutrientes',
        mes: 'Mayo - Junio',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Ciencias Naturales 3°',
        enfoque: 'Grupos de alimentos, pirámide alimenticia, sellos "Altos en" y prevención de enfermedades.',
        oas: ['OA 06', 'OA 07'],
        descripcion:
          'Clasificar los alimentos distinguiendo sus aportes nutricionales y proponiendo dietas balanceadas para mantener una vida activa y saludable.',
        defaultQuiz: {
          nivel: '3° Básico',
          unidad: 'Unidad 2: Alimentación saludable y nutrientes',
          mes_estimado: 'Mayo - Junio',
          eje_tematico: 'Cuerpo Humano y Salud',
          oa: 'OA 06, OA 07: Identificar nutrientes y promover alimentación equilibrada',
          objetivos_aprendizaje: ['OA 06', 'OA 07'],
          titulo_texto: 'El plato saludable: energía y crecimiento para aprender',
          texto_oficial: `Para que nuestro cuerpo crezca fuerte y tengamos energía para jugar y estudiar, debemos consumir una variedad equilibrada de alimentos. Las proteínas, presentes en legumbres como las lentejas, huevos y carnes magras, construyen y reparan los músculos. Los carbohidratos, como la avena y el arroz integral, nos dan energía diaria. Las frutas y verduras aportan vitaminas, minerales y agua que protegen nuestro sistema inmunológico contra los resfriados. Por el contrario, los alimentos ultraprocesados con muchos sellos negros de advertencia (altos en azúcares, sodio y grasas saturadas) dañan los dientes y aumentan el riesgo de sobrepeso.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Qué nutrientes nos aportan principalmente las legumbres, los huevos y las carnes magras?',
              opciones: {
                A: 'Azúcar refinada.',
                B: 'Proteínas que construyen y reparan los músculos.',
                C: 'Grasas saturadas nocivas.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Muy bien! Las proteínas son los ladrillos biológicos que forman y fortalecen los músculos.',
              retroalimentacion_negativa: 'Revisa el texto: las proteínas están en legumbres y huevos y ayudan al crecimiento muscular.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Para qué sirven los sellos negros de advertencia en los envases de alimentos en Chile?',
              opciones: {
                A: 'Para decorar el paquete con figuras geométricas.',
                B: 'Para advertir a los consumidores que el producto tiene exceso de azúcares, grasas o sodio.',
                C: 'Para indicar la fecha de cumpleaños del fabricante.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Exacto! La ley de etiquetado nutricional de Chile ayuda a elegir alimentos más saludables.',
              retroalimentacion_negativa: 'Los sellos alertan cuando un alimento contiene cantidades poco saludables de azúcar, sal o grasas.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Cuál de las siguientes opciones representa una colación escolar equilibrada y saludable?',
              opciones: {
                A: 'Una manzana fresca picada con un puñado de nueces y agua pura.',
                B: 'Un paquete grande de papas fritas saladas y una bebida gaseosa.',
                C: 'Tres barras de chocolate con caramelo.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Elección perfecta! Las frutas frescas y frutos secos entregan vitaminas, fibra y energía duradera.',
              retroalimentacion_negativa: 'Una colación nutritiva debe evitar los sellos negros y privilegiar frutas naturales y agua.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 3',
        nombre: 'Unidad 3: La luz y el sonido',
        mes: 'Julio - Septiembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Ciencias Naturales 3°',
        enfoque: 'Propiedades de la luz (propagación rectilínea, reflexión, refracción) y del sonido (vibración, tono, intensidad).',
        oas: ['OA 08', 'OA 09', 'OA 10'],
        descripcion:
          'Investigar experimentalmente y explicar las propiedades de la luz y el sonido, aplicando conceptos a situaciones de la vida cotidiana.',
        defaultQuiz: {
          nivel: '3° Básico',
          unidad: 'Unidad 3: La luz y el sonido',
          mes_estimado: 'Julio - Septiembre',
          eje_tematico: 'Ciencias Físicas y Químicas',
          oa: 'OA 08, OA 09, OA 10: Investigar propiedades de la luz y el sonido',
          objetivos_aprendizaje: ['OA 08', 'OA 09', 'OA 10'],
          titulo_texto: 'El reflejo del lago y el eco de las montañas',
          texto_oficial: `La luz viaja en línea recta y a una velocidad asombrosa. Cuando un rayo de luz choca contra una superficie lisa y brillante, como un espejo o las aguas mansas de un lago del sur, rebota cambiando de dirección. Este fenómeno se llama reflexión y nos permite ver nuestro rostro en el espejo. El sonido, por su parte, se produce cuando los objetos vibran: al tocar las cuerdas de una guitarra, estas vibran rápidamente moviendo las partículas del aire hasta llegar a nuestros tímpanos. Cuando el sonido viaja y rebota en una pared rocosa lejana, regresa a nuestros oídos produciendo el famoso eco.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cómo se llama el fenómeno en que la luz choca contra una superficie lisa y rebota?',
              opciones: {
                A: 'Evaporación luminosa.',
                B: 'Reflexión de la luz.',
                C: 'Digestión solar.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Excelente! La reflexión ocurre cuando la luz rebota en superficies pulidas como espejos o agua quieta.',
              retroalimentacion_negativa: 'Revisa el texto: el rebote de la luz sobre un espejo se llama reflexión.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Qué causa que se produzca el sonido de una guitarra al tocarla?',
              opciones: {
                A: 'La rápida vibración de las cuerdas que transmite ondas por el aire.',
                B: 'La pintura de colores que tiene la madera.',
                C: 'El silencio absoluto dentro de la sala.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Muy bien! Todo sonido proviene de la vibración mecánica de un cuerpo físico.',
              retroalimentacion_negativa: 'Todo sonido nace cuando algo vibra: en la guitarra vibran las cuerdas al pulsarlas.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Por qué debemos evitar exponernos a ruidos excesivamente fuertes en audífonos o conciertos?',
              opciones: {
                A: 'Porque las vibraciones muy intensas pueden dañar las delicadas células del tímpano y oído interno.',
                B: 'Porque la batería del celular se gasta más rápido.',
                C: 'Porque la luz del sol se apaga con el ruido.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Cuidado auditivo impecable! El volumen moderado protege nuestra capacidad de escuchar por toda la vida.',
              retroalimentacion_negativa: 'El tímpano es muy sensible: los sonidos estruendosos causan pérdida auditiva irreversible.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 4',
        nombre: 'Unidad 4: La Tierra en el Sistema Solar',
        mes: 'Octubre - Diciembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Ciencias Naturales 3°',
        enfoque: 'El Sol, los ocho planetas, la Luna, movimientos de rotación (día/noche) y traslación (estaciones).',
        oas: ['OA 11', 'OA 12', 'OA 13'],
        descripcion:
          'Describir las características del Sistema Solar, el movimiento de rotación que origina el día y la noche, y el de traslación que genera las estaciones del año.',
        defaultQuiz: {
          nivel: '3° Básico',
          unidad: 'Unidad 4: La Tierra en el Sistema Solar',
          mes_estimado: 'Octubre - Diciembre',
          eje_tematico: 'Ciencias de la Tierra y el Universo',
          oa: 'OA 11, OA 12, OA 13: Explicar el Sistema Solar y movimientos terrestres',
          objetivos_aprendizaje: ['OA 11', 'OA 12', 'OA 13'],
          titulo_texto: 'El baile cósmico: rotación y traslación de nuestro planeta',
          texto_oficial: `Nuestro planeta Tierra es el tercer planeta del Sistema Solar y gira alrededor de una estrella gigante y brillante: el Sol. La Tierra realiza dos movimientos principales en el espacio. El movimiento de rotación consiste en girar sobre su propio eje imaginario, tardando 24 horas (un día completo), lo que origina la sucesión del día y la noche según la cara que recibe la luz solar. El movimiento de traslación es el viaje que realiza la Tierra alrededor del Sol, demorando 365 días (un año). Debido a la inclinación del eje terrestre, este viaje da origen a las cuatro estaciones: primavera, verano, otoño e invierno.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuánto tiempo demora la Tierra en dar una vuelta completa sobre su propio eje en el movimiento de rotación?',
              opciones: {
                A: 'Una semana completa.',
                B: '24 horas (un día).',
                C: 'Un mes entero.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Exacto! 24 horas es la duración del día terrestre debido al giro sobre su propio eje.',
              retroalimentacion_negativa: 'La rotación completa dura exactamente un día, equivalente a 24 horas.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Qué fenómeno se produce gracias al movimiento de rotación de la Tierra?',
              opciones: {
                A: 'La alternancia continua entre el día y la noche.',
                B: 'La formación de los anillos de Saturno.',
                C: 'La erupción de los volcanes.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Muy bien! A medida que la Tierra gira, una mitad recibe luz (día) y la otra queda en sombra (noche).',
              retroalimentacion_negativa: 'La rotación hace que diferentes partes del planeta queden iluminadas por el sol de forma alternada.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Por qué los telescopios astronómicos internacionales se instalan en el norte de Chile?',
              opciones: {
                A: 'Porque los cielos del desierto de Atacama son despejados, secos y con bajísima contaminación lumínica.',
                B: 'Porque en el desierto hace mucho frío en la noche.',
                C: 'Porque la luna pasa más cerca de los volcanes.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Orgullo científico nacional! Chile es la capital mundial de la astronomía por sus cielos limpios.',
              retroalimentacion_negativa: 'La sequedad y ausencia de nubes en Atacama permite a los científicos ver el universo con nitidez.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
    ],
  },

  // =========================================================================
  // 4° BÁSICO - CIENCIAS NATURALES
  // =========================================================================
  '4° Básico': {
    titulo: 'Ciencias Naturales 4° Básico',
    edad: '9 a 10 años',
    resumen:
      'Ecosistemas y cadenas tróficas, la materia y sus propiedades (masa, volumen, temperatura), fuerzas en la vida cotidiana (roce, peso, magnética) y la estructura de la Tierra (sismos y volcanes).',
    unidades: [
      {
        numero: 'Unidad 1',
        nombre: 'Unidad 1: Ecosistemas y redes tróficas',
        mes: 'Marzo - Abril',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Ciencias Naturales 4°',
        enfoque: 'Componentes bióticos y abióticos, productores, consumidores y descomponedores, cadenas alimentarias.',
        oas: ['OA 01', 'OA 02', 'OA 03'],
        descripcion:
          'Reconocer, por medio de la exploración, que un ecosistema está compuesto por elementos vivos y no vivos que interactúan entre sí, modelando el flujo de energía en cadenas alimentarias.',
        defaultQuiz: {
          nivel: '4° Básico',
          unidad: 'Unidad 1: Ecosistemas y redes tróficas',
          mes_estimado: 'Marzo - Abril',
          eje_tematico: 'Ciencias de la Vida',
          oa: 'OA 01, OA 02: Analizar cadenas tróficas y equilibrio en ecosistemas',
          objetivos_aprendizaje: ['OA 01', 'OA 02'],
          titulo_texto: 'El equilibrio trófico en el bosque esclerófilo de la zona central',
          texto_oficial: `En los bosques esclerófilos de la zona central de Chile conviven componentes bióticos (seres vivos como quillayes, zorros culpeo y conejos) y abióticos (agua, luz solar, aire y rocas). El flujo de energía comienza con las plantas y árboles nativos, llamados productores, que capturan la luz solar mediante fotosíntesis para fabricar su alimento. Los conejos y roedores, que son consumidores primarios o herbívoros, se alimentan de sus hojas y semillas. A su vez, el zorro culpeo y el puma actúan como consumidores secundarios o carnívoros. Finalmente, hongos y bacterias descomponen los restos orgánicos, devolviendo minerales fértiles al suelo. Si un eslabón se extingue, toda la red ecológica se desestabiliza.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Qué rol fundamental cumplen las plantas como el quillay en la cadena trófica?',
              opciones: {
                A: 'Son descomponedores que comen restos de carne.',
                B: 'Son productores que capturan la energía solar para fabricar su propio alimento.',
                C: 'Son consumidores terciarios carnívoros.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Exacto! Las plantas inician el flujo energético del ecosistema como organismos productores.',
              retroalimentacion_negativa: 'Las plantas son el primer eslabón productor: generan alimento a partir de la luz del sol.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Qué ocurriría en este ecosistema si desaparecieran los descomponedores (hongos y bacterias)?',
              opciones: {
                A: 'La materia orgánica muerta se acumularía y el suelo perdería nutrientes esenciales para las plantas.',
                B: 'Los zorros culpeo aprenderían a volar como aves rapaces.',
                C: 'El sol brillaría con mayor intensidad.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Gran pensamiento sistémico! Los descomponedores reciclan la materia orgánica cerrando el ciclo de nutrientes.',
              retroalimentacion_negativa: 'Sin descomponedores, los restos no se desintegran y el suelo se empobrece de minerales.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Por qué la introducción de especies exóticas invasoras altera el equilibrio ecológico en Chile?',
              opciones: {
                A: 'Porque compiten por alimento y territorio con las especies nativas, pudiendo llevarlas a la extinción.',
                B: 'Porque las especies exóticas hacen que los ríos cambien de color.',
                C: 'Porque traen monedas de otros países.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Excelente juicio biológico! Las especies foráneas desplazan a la fauna local alterando las redes tróficas.',
              retroalimentacion_negativa: 'Las especies invasoras no tienen depredadores naturales y consumen los recursos de los animales nativos.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 2',
        nombre: 'Unidad 2: La materia, sus estados y propiedades',
        mes: 'Mayo - Junio',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Ciencias Naturales 4°',
        enfoque: 'Masa, volumen y temperatura; instrumentos de medición (balanza, probeta, termómetro).',
        oas: ['OA 09', 'OA 10', 'OA 11'],
        descripcion:
          'Demostrar que la materia tiene masa y ocupa espacio, midiendo masa, volumen y temperatura con instrumentos adecuados.',
        defaultQuiz: {
          nivel: '4° Básico',
          unidad: 'Unidad 2: La materia, sus estados y propiedades',
          mes_estimado: 'Mayo - Junio',
          eje_tematico: 'Ciencias Físicas y Químicas',
          oa: 'OA 09, OA 10, OA 11: Medir masa, volumen y temperatura en la materia',
          objetivos_aprendizaje: ['OA 09', 'OA 10', 'OA 11'],
          titulo_texto: 'El laboratorio escolar: pesando y midiendo la materia',
          texto_oficial: `Todo lo que nos rodea en el universo, desde una roca sólida hasta el aire invisible que infla un globo, es materia. La materia tiene dos propiedades generales esenciales: tiene masa (la cantidad de sustancia que contiene un cuerpo, medida en kilogramos o gramos usando una balanza) y ocupa un volumen (el espacio tridimensional que utiliza, medido en litros o mililitros con probetas graduadas). Además, la materia posee temperatura, que mide el grado de agitación térmica de sus partículas usando un termómetro en grados Celsius. Los gases tienen volumen variable y se expanden, mientras que los sólidos mantienen forma y volumen definidos.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Qué instrumento de laboratorio se utiliza para medir con precisión la masa de un objeto?',
              opciones: {
                A: 'Una regla métrica de madera.',
                B: 'Una balanza o báscula.',
                C: 'Un telescopio de largo alcance.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Muy bien! La balanza determina la masa en gramos o kilogramos comparando fuerzas.',
              retroalimentacion_negativa: 'Revisa el texto: la masa se mide en kilogramos o gramos utilizando una balanza.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: 'Si sumergimos una piedra en una probeta con agua y el nivel del líquido sube de 50 ml a 70 ml, ¿qué propiedad de la piedra estamos midiendo?',
              opciones: {
                A: 'El volumen de la piedra, que corresponde al espacio que ocupa (20 ml).',
                B: 'La temperatura caliente de la piedra.',
                C: 'La edad histórica de la roca.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Brillante aplicación del método de inmersión! El líquido desplazado es exactamente igual al volumen del objeto sólido.',
              retroalimentacion_negativa: 'El aumento de nivel de agua indica el espacio físico o volumen que ocupa la piedra sumergida.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Por qué los globos inflados con aire demuestran que los gases son materia?',
              opciones: {
                A: 'Porque el aire encerrado ocupa un espacio (volumen) y agrega masa medible al globo.',
                B: 'Porque los globos cambian de sabor con el sol.',
                C: 'Porque los gases no existen en la Tierra.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Gran demostración experimental! Aunque sea transparente, el aire tiene masa y ocupa volumen.',
              retroalimentacion_negativa: 'Un globo inflado pesa más que uno desinflado y ocupa espacio: el aire es materia con masa y volumen.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 3',
        nombre: 'Unidad 3: Las fuerzas en la vida cotidiana',
        mes: 'Julio - Septiembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Ciencias Naturales 4°',
        enfoque: 'Fuerza de roce (fricción), fuerza de peso (gravedad), fuerzas magnéticas y elásticas.',
        oas: ['OA 12', 'OA 13'],
        descripcion:
          'Demostrar, por medio de la investigación experimental, los efectos de la fuerza de roce, la fuerza gravitatoria y las fuerzas magnéticas sobre el movimiento de los cuerpos.',
        defaultQuiz: {
          nivel: '4° Básico',
          unidad: 'Unidad 3: Las fuerzas en la vida cotidiana',
          mes_estimado: 'Julio - Septiembre',
          eje_tematico: 'Ciencias Físicas y Químicas',
          oa: 'OA 12, OA 13: Experimentar con fuerzas de roce, peso y magnetismo',
          objetivos_aprendizaje: ['OA 12', 'OA 13'],
          titulo_texto: 'Fuerzas en acción: patines, frenos y gravedad',
          texto_oficial: `Una fuerza es una interacción entre dos o más cuerpos que puede modificar su estado de movimiento o deformarlos. Cuando lanzamos una pelota al aire, la fuerza de gravedad o peso ejercida por la Tierra la atrae hacia el centro del planeta, haciéndola caer al suelo. Al andar en bicicleta y accionar los frenos, las gomas frotan las ruedas produciendo fuerza de roce o fricción, la cual se opone al movimiento hasta detener la bicicleta. La fuerza de roce es mayor sobre superficies rugosas como el pasto o la tierra, y menor sobre superficies lisas como el hielo o una pista pulida. Además, los imanes ejercen fuerza magnética capaz de atraer objetos de hierro a distancia.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Qué fuerza atrae a todos los objetos hacia la superficie de la Tierra cuando caen?',
              opciones: {
                A: 'La fuerza de roce.',
                B: 'La fuerza de gravedad o peso.',
                C: 'La fuerza magnética de una brújula.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Correcto! La gravedad terrestre nos mantiene con los pies en la Tierra y hace caer los objetos.',
              retroalimentacion_negativa: 'Vuelve al texto: la atracción ejercida por nuestro planeta se llama fuerza de gravedad.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Por qué un auto de juguete se detiene mucho más rápido al rodar sobre una alfombra peluda que sobre un piso de baldosas lisas?',
              opciones: {
                A: 'Porque la superficie rugosa de la alfombra genera mayor fuerza de roce que frena el movimiento.',
                B: 'Porque en la alfombra no existe la gravedad.',
                C: 'Porque el piso de baldosa empuja el auto hacia arriba.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Excelente razonamiento físico! A mayor rugosidad entre superficies en contacto, mayor es la fricción.',
              retroalimentacion_negativa: 'La rugosidad aumenta la fricción u oposición al movimiento, haciendo que el auto se frene antes.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Por qué los neumáticos de los automóviles tienen surcos y dibujos en relieve?',
              opciones: {
                A: 'Para asegurar un buen agarre y fuerza de roce con el pavimento mojado, evitando resbalones peligrosos.',
                B: 'Para que el automóvil pese menos kilogramos.',
                C: 'Para que las ruedas hagan música al girar.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Gran aplicación de la física a la seguridad vial! El agarre evita accidentes en días lluviosos.',
              retroalimentacion_negativa: 'Los surcos aumentan la fricción y evacúan el agua para que el auto frene con seguridad.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 4',
        nombre: 'Unidad 4: Capas de la Tierra, sismos y volcanes',
        mes: 'Octubre - Diciembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Ciencias Naturales 4°',
        enfoque: 'Geosfera (corteza, manto, núcleo), placas tectónicas (Nazca y Sudamericana), sismicidad y prevención.',
        oas: ['OA 15', 'OA 16', 'OA 17'],
        descripcion:
          'Describir la estructura interna de la Tierra, explicando cómo el movimiento de las placas tectónicas origina sismos, tsunamis y erupciones volcánicas en Chile, proponiendo medidas de seguridad.',
        defaultQuiz: {
          nivel: '4° Básico',
          unidad: 'Unidad 4: Capas de la Tierra, sismos y volcanes',
          mes_estimado: 'Octubre - Diciembre',
          eje_tematico: 'Ciencias de la Tierra y el Universo',
          oa: 'OA 15, OA 16, OA 17: Explicar sismos, volcanes y medidas preventivas',
          objetivos_aprendizaje: ['OA 15', 'OA 16', 'OA 17'],
          titulo_texto: 'Chile, tierra de volcanes y placas en movimiento',
          texto_oficial: `La geosfera o parte sólida de la Tierra está formada por tres capas concéntricas: la corteza exterior donde vivimos, el manto caliente con rocas fundidas o magma, y el núcleo central de hierro y níquel a altísimas temperaturas. La corteza terrestre no es continua; está dividida en grandes bloques llamados placas tectónicas que flotan sobre el manto. Chile se ubica en el límite de choque entre la Placa de Nazca y la Placa Sudamericana. Al chocar y rozar entre sí, se acumula una enorme tensión que al liberarse bruscamente genera sismos y terremotos. Asimismo, el magma puede ascender por fracturas de la corteza, dando origen a los imponentes volcanes de la Cordillera de los Andes. Ante un sismo, siempre debemos mantener la calma y acudir a las zonas de seguridad.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuáles son las dos placas tectónicas cuyo choque constante origina los sismos en Chile?',
              opciones: {
                A: 'La Placa Africana y la Placa del Caribe.',
                B: 'La Placa de Nazca y la Placa Sudamericana.',
                C: 'La Placa Antártica y la Placa Euroasiática.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Exacto! El límite convergente entre la Placa de Nazca y la Sudamericana explica la sismicidad chilena.',
              retroalimentacion_negativa: 'Revisa el texto: Chile se ubica en la zona de choque entre la Placa de Nazca y la Sudamericana.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Cómo se forman los volcanes en la Cordillera de los Andes?',
              opciones: {
                A: 'Por el ascenso de magma caliente desde el manto a través de fracturas en la corteza terrestre.',
                B: 'Por la acumulación de nieve congelada durante el invierno.',
                C: 'Por el viento del océano que amontona arena.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Muy bien! El magma fundido asciende por fisuras de la corteza creando conos volcánicos.',
              retroalimentacion_negativa: 'El magma del manto sube por grietas de la corteza originando volcanes activos.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Cuál es la conducta más segura que debemos tener en el colegio durante un temblor o sismo fuerte?',
              opciones: {
                A: 'Mantener la calma, protegerse bajo la mesa (operación mochila) y evacuar con orden a la zona de seguridad.',
                B: 'Correr gritando hacia las escaleras empujando a los compañeros.',
                C: 'Asomarse por las ventanas de vidrio para mirar.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Excelente cultura sísmica preventiva! La calma y la protección ordenada salvan vidas en caso de emergencia.',
              retroalimentacion_negativa: 'Nunca se debe correr ni empujar; hay que buscar zonas seguras y alejarse de vidrios y estantes.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
    ],
  },
};

// =========================================================================
// HELPER FUNCTIONS
// =========================================================================

export function getCienciasUnitsForNivel(nivel: string): MineducUnitDefinition[] {
  const cleanNivel = nivel.trim();
  const nivelData = MINEDUC_CIENCIAS_CURRICULUM[cleanNivel] || MINEDUC_CIENCIAS_CURRICULUM['1° Básico'];

  return nivelData.unidades.map((u, idx) => ({
    id: `ciencias-${cleanNivel.toLowerCase().replace(/[^a-z0-9]/g, '')}-u${idx + 1}`,
    numero: u.numero,
    nombre: u.nombre,
    mes_estimado: u.mes,
    enfoque: u.enfoque,
    oas: u.oas,
    default_sample_id: `ciencias-sample-${cleanNivel.toLowerCase().replace(/[^a-z0-9]/g, '')}-u${idx + 1}`,
  }));
}

export function getCienciasSampleTextsForNivel(nivel: string): SampleMineducText[] {
  const cleanNivel = nivel.trim();
  const nivelData = MINEDUC_CIENCIAS_CURRICULUM[cleanNivel] || MINEDUC_CIENCIAS_CURRICULUM['1° Básico'];

  return nivelData.unidades.map((u, idx) => ({
    id: `ciencias-sample-${cleanNivel.toLowerCase().replace(/[^a-z0-9]/g, '')}-u${idx + 1}`,
    title: u.defaultQuiz.titulo_texto || u.nombre,
    nivel: cleanNivel as any,
    unidad: u.numero as any,
    oa: u.oas.join(', '),
    source: 'Texto del Estudiante Ciencias Naturales Mineduc',
    text: u.defaultQuiz.texto_oficial || '',
    genre: 'Reportaje Científico',
  }));
}

export function getCienciasSampleTextForNivelAndUnit(nivel: string, unitNum: string): SampleMineducText | undefined {
  const samples = getCienciasSampleTextsForNivel(nivel);
  return samples.find((s) => s.unidad === unitNum || unitNum.includes(s.unidad));
}

export function getDefaultCienciasQuizForNivelAndUnit(nivel: string, unitNumOrName: string): MineducQuizResult {
  const cleanNivel = nivel.trim();
  const nivelData = MINEDUC_CIENCIAS_CURRICULUM[cleanNivel] || MINEDUC_CIENCIAS_CURRICULUM['1° Básico'];

  const match = nivelData.unidades.find(
    (u) =>
      u.numero === unitNumOrName ||
      u.nombre === unitNumOrName ||
      unitNumOrName.includes(u.numero) ||
      u.numero.includes(unitNumOrName)
  );

  return (match || nivelData.unidades[0]).defaultQuiz;
}
