import { MineducQuizResult, SampleMineducText } from '../types';
import { MineducUnitDefinition } from './mineducUnits';

export interface InglesUnitDefinition {
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

export interface InglesNivelInfo {
  titulo: string;
  edad: string;
  resumen: string;
  unidades: InglesUnitDefinition[];
}

export const MINEDUC_INGLES_CURRICULUM: Record<string, InglesNivelInfo> = {
  // =========================================================================
  // 1° BÁSICO - INGLÉS
  // =========================================================================
  '1° Básico': {
    titulo: 'Inglés 1° Básico (English Starter)',
    edad: '6 a 7 años',
    resumen:
      'Iniciación al idioma inglés a través de saludos cotidianos, colores, números del 1 al 10, partes del cuerpo, miembros de la familia y animales favoritos con apoyo visual y fonético.',
    unidades: [
      {
        numero: 'Unidad 1',
        nombre: 'Unit 1: Welcome to School! (Greetings and Colors)',
        mes: 'Marzo - Abril',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Inglés 1°',
        enfoque: 'Saludos (Hello, Good morning, Goodbye), colores básicos (red, blue, yellow, green) y útiles escolares (pencil, book).',
        oas: ['OA 01', 'OA 04'],
        descripcion:
          'Comprender y usar expresiones cotidianas muy breves de saludo, identificación de colores primarios y objetos del aula de clases.',
        defaultQuiz: {
          nivel: '1° Básico',
          unidad: 'Unit 1: Welcome to School! (Greetings and Colors)',
          mes_estimado: 'Marzo - Abril',
          eje_tematico: 'Oral Communication & Vocabulary',
          oa: 'OA 01, OA 04: Recognise greetings, classroom objects and basic colors',
          objetivos_aprendizaje: ['OA 01', 'OA 04'],
          titulo_texto: 'Hello School! Welcome Tommy and Lisa',
          texto_oficial: `Good morning! My name is Tommy. Today is my first day of school. I have a red backpack, a blue pencil and a yellow book. My teacher says: "Hello Tommy! Welcome to class!" I smile and say: "Hello teacher!" In our classroom, we sing songs, learn colors and play with blocks. At the end of the day, we wave our hands and say: "Goodbye friends, see you tomorrow!"`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿De qué color es la mochila (backpack) de Tommy?',
              opciones: {
                A: 'Green (verde).',
                B: 'Red (roja).',
                C: 'Pink (rosada).',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Great job! Tommy dice claramente: "I have a red backpack" (tengo una mochila roja).',
              retroalimentacion_negativa: 'Revisa la primera parte: Tommy describe su mochila como "red" (roja).',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Qué palabra en inglés decimos al despedirnos al final del día escolar?',
              opciones: {
                A: 'Goodbye (adiós / hasta luego).',
                B: 'Apple (manzana).',
                C: 'Window (ventana).',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Wonderful! "Goodbye" es la palabra en inglés para despedirse cordialmente.',
              retroalimentacion_negativa: 'Al despedirse, los niños mueven la mano diciendo "Goodbye".',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué significa la frase "Good morning" cuando entramos a la sala de clases?',
              opciones: {
                A: '¡Buenos días!',
                B: '¡Buenas noches a dormir!',
                C: '¡Hora de almorzar!',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Excellent! "Good morning" es el saludo amable de la mañana.',
              retroalimentacion_negativa: 'En la mañana saludamos a profesores y compañeros diciendo "Good morning" (¡Buenos días!).',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 2',
        nombre: 'Unit 2: My Body and Face',
        mes: 'Mayo - Junio',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Inglés 1°',
        enfoque: 'Partes de la cara y el cuerpo (head, eyes, nose, mouth, ears, hands) y sentimientos (happy, sad).',
        oas: ['OA 02', 'OA 05'],
        descripcion:
          'Identificar palabras de las partes del cuerpo y la cara a través de canciones infantiles y rimas gestuales.',
        defaultQuiz: {
          nivel: '1° Básico',
          unidad: 'Unit 2: My Body and Face',
          mes_estimado: 'Mayo - Junio',
          eje_tematico: 'Vocabulary & Listening',
          oa: 'OA 02, OA 05: Identify parts of the face and body',
          objetivos_aprendizaje: ['OA 02', 'OA 05'],
          titulo_texto: 'Point to Your Eyes and Smile!',
          texto_oficial: `Look at my face! I have two brown eyes to see the sunshine. I have one small nose to smell flowers. I have a mouth to sing and smile, and two ears to listen to music. When I play with my friends, I feel very happy. Clap your hands and touch your head! Taking care of my body with fresh water and fruit makes me grow strong every day.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuántos ojos (eyes) tiene el personaje del texto?',
              opciones: {
                A: 'One (uno).',
                B: 'Two (dos).',
                C: 'Four (cuatro).',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Very good! Tenemos dos ojos: "two brown eyes to see the sunshine".',
              retroalimentacion_negativa: 'Cuenta tus propios ojos: en inglés decimos "two eyes" (dos ojos).',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Qué palabra en inglés significa "feliz" en la oración: "I feel very happy"?',
              opciones: {
                A: 'Cold.',
                B: 'Happy.',
                C: 'Blue.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Awesome! "Happy" significa feliz y alegre.',
              retroalimentacion_negativa: 'Cuando sonreímos y estamos alegres decimos que estamos "happy".',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué parte del cuerpo tocamos cuando la canción dice "Touch your head"?',
              opciones: {
                A: 'La cabeza.',
                B: 'Los pies.',
                C: 'La espalda.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Brilliant! "Head" significa cabeza.',
              retroalimentacion_negativa: 'Head, shoulders, knees and toes... "Head" es la cabeza.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 3',
        nombre: 'Unit 3: My Family and My Home',
        mes: 'Julio - Septiembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Inglés 1°',
        enfoque: 'Miembros familiares (mother, father, brother, sister, baby, grandmother) y espacios del hogar.',
        oas: ['OA 03', 'OA 06'],
        descripcion:
          'Reconocer y nombrar a los miembros de la familia nuclear y extendida en descripciones orales y escritas ilustradas.',
        defaultQuiz: {
          nivel: '1° Básico',
          unidad: 'Unit 3: My Family and My Home',
          mes_estimado: 'Julio - Septiembre',
          eje_tematico: 'Reading & Family Vocabulary',
          oa: 'OA 03, OA 06: Recognise family members and house rooms',
          objetivos_aprendizaje: ['OA 03', 'OA 06'],
          titulo_texto: 'A Sunny Day with My Family',
          texto_oficial: `This is my family portrait. My father is tall and wears glasses. My mother is kind and bakes delicious cookies. I have a little sister named Emma; she is two years old and loves to play with dolls. In the garden, my grandfather waters the plants. We live in a cozy house with a red roof. I love my family very much!`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Quién es Emma en el relato?',
              opciones: {
                A: 'The teacher.',
                B: 'The little sister (la hermanita).',
                C: 'The big brother.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Correct! Emma es "a little sister named Emma" (una hermanita pequeña).',
              retroalimentacion_negativa: 'Revisa el texto: Emma tiene dos años y es la hermanita pequeña ("little sister").',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Qué palabra en inglés nombra a la mamá?',
              opciones: {
                A: 'Pencil.',
                B: 'Mother (or Mom).',
                C: 'Chair.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Super! "Mother" o "Mom" es mamá en inglés.',
              retroalimentacion_negativa: 'Mother es la madre cariñosa de la familia.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué sentimiento expresa la frase "I love my family"?',
              opciones: {
                A: 'Amor y cariño profundo hacia la familia.',
                B: 'Miedo a la oscuridad.',
                C: 'Ganas de comer helado.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Heartwarming! "I love my family" significa "Amo a mi familia".',
              retroalimentacion_negativa: 'La palabra "love" significa amor y gratitud hacia los seres queridos.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 4',
        nombre: 'Unit 4: Animals and Nature',
        mes: 'Octubre - Diciembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Inglés 1°',
        enfoque: 'Mascotas y animales de la naturaleza (dog, cat, bird, frog, fish) y elementos naturales (tree, flower, sun).',
        oas: ['OA 03', 'OA 07'],
        descripcion:
          'Identificar nombres de animales comunes y sonidos que emiten, asociándolos a su hábitat natural.',
        defaultQuiz: {
          nivel: '1° Básico',
          unidad: 'Unit 4: Animals and Nature',
          mes_estimado: 'Octubre - Diciembre',
          eje_tematico: 'Animals & Nature Vocabulary',
          oa: 'OA 03, OA 07: Identify animals and natural elements',
          objetivos_aprendizaje: ['OA 03', 'OA 07'],
          titulo_texto: 'Animals in the Green Garden',
          texto_oficial: `There are many happy animals in the green garden! A brown dog runs on the grass and barks: "Woof!" A soft white cat sleeps under the warm sun. Near the pond, a green frog jumps: "Ribbit, ribbit!" Up in the tall tree, a blue bird sings a sweet song. Nature is colorful and full of life. We must protect all animals and treat them with kindness.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Qué animal salta cerca del estanque (pond) diciendo "Ribbit, ribbit"?',
              opciones: {
                A: 'A green frog (una rana verde).',
                B: 'A big elephant.',
                C: 'A purple lion.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Awesome! "A green frog jumps: Ribbit, ribbit" (una rana verde salta).',
              retroalimentacion_negativa: 'El texto menciona a la ranita verde: "green frog".',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Qué animal duerme bajo el sol cálido en el jardín?',
              opciones: {
                A: 'A white cat (un gato blanco suave).',
                B: 'A green frog.',
                C: 'A flying fish.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Great! "A soft white cat sleeps under the warm sun" (un gato blanco suave duerme bajo el sol).',
              retroalimentacion_negativa: 'Revisa el relato: el gato blanco ("white cat") duerme relajado.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué mensaje nos deja la frase final "We must protect all animals"?',
              opciones: {
                A: 'Debemos cuidar y proteger a todos los animales con respeto y cariño.',
                B: 'Los animales no deben comer.',
                C: 'Hay que asustar a los pájaros.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Beautiful value! Proteger y respetar a los animales demuestra empatía y conciencia ambiental.',
              retroalimentacion_negativa: '"Protect all animals" significa cuidar y defender a las criaturas vivas.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
    ],
  },

  // =========================================================================
  // 2° BÁSICO - INGLÉS
  // =========================================================================
  '2° Básico': {
    titulo: 'Inglés 2° Básico (English Explorer)',
    edad: '7 a 8 años',
    resumen:
      'Ampliación del vocabulario comunicativo: rutinas y comandos escolares, animales salvajes y de granja, alimentos nutritivos y vestimenta según el clima.',
    unidades: [
      {
        numero: 'Unidad 1',
        nombre: 'Unit 1: Back to School & Actions',
        mes: 'Marzo - Abril',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Inglés 2°',
        enfoque: 'Acciones e instrucciones de clase (stand up, sit down, listen, read, write) y números del 1 al 20.',
        oas: ['OA 01', 'OA 04'],
        descripcion:
          'Comprender y responder a instrucciones de aula, asociando verbos de acción con su ejecución práctica y reconociendo números hasta el 20.',
        defaultQuiz: {
          nivel: '2° Básico',
          unidad: 'Unit 1: Back to School & Actions',
          mes_estimado: 'Marzo - Abril',
          eje_tematico: 'Classroom Language & Numbers',
          oa: 'OA 01, OA 04: Follow classroom commands and count to 20',
          objetivos_aprendizaje: ['OA 01', 'OA 04'],
          titulo_texto: 'Classroom Rules: Listen and Learn Together!',
          texto_oficial: `Welcome back to our English classroom! Our teacher, Miss Clara, says: "Please sit down and open your English books to page ten." There are twenty students in our class: ten girls and ten boys. When Miss Clara plays music, we stand up and dance. When she raises her hand, we listen carefully and raise our hand to speak. Learning English is fun when we respect our classmates and share our colored pencils!`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuántos estudiantes (students) hay en total en la clase?',
              opciones: {
                A: 'Five (5).',
                B: 'Twenty (20: diez niñas y diez niños).',
                C: 'Fifty (50).',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Excellent! "There are twenty students in our class" (hay veinte estudiantes).',
              retroalimentacion_negativa: 'Suma diez niñas más diez niños: en inglés se dice "twenty" (20).',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Qué acción en inglés deben hacer los estudiantes al escuchar la orden "stand up"?',
              opciones: {
                A: 'Ponerse de pie.',
                B: 'Cerrar los ojos y dormir.',
                C: 'Guardar la mochila.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Well done! "Stand up" es ponerse de pie, mientras que "sit down" es sentarse.',
              retroalimentacion_negativa: '"Stand up" significa levantarse o ponerse de pie.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Por qué es importante levantar la mano ("raise your hand") antes de hablar en la sala?',
              opciones: {
                A: 'Para respetar los turnos de los demás y escuchar con atención sin interrumpir.',
                B: 'Para mostrar los anillos de los dedos.',
                C: 'Porque se cansa el brazo.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Great classroom etiquette! Levantar la mano fomenta el orden y el respeto mutuo.',
              retroalimentacion_negativa: 'Pedir la palabra levantando la mano permite que todos puedan ser escuchados.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 2',
        nombre: 'Unit 2: Animals of Chile and the World',
        mes: 'Mayo - Junio',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Inglés 2°',
        enfoque: 'Animales nativos y salvajes (puma, penguin, condor, frog, horse) y adjetivos descriptivos (big, small, fast).',
        oas: ['OA 02', 'OA 05'],
        descripcion:
          'Describir animales usando oraciones simples con adjetivos de tamaño y velocidad en contextos locales y globales.',
        defaultQuiz: {
          nivel: '2° Básico',
          unidad: 'Unit 2: Animals of Chile and the World',
          mes_estimado: 'Mayo - Junio',
          eje_tematico: 'Descriptive Vocabulary & Wildlife',
          oa: 'OA 02, OA 05: Describe wild animals using simple adjectives',
          objetivos_aprendizaje: ['OA 02', 'OA 05'],
          titulo_texto: 'The Amazing Wildlife of Chile',
          texto_oficial: `Chile is home to wonderful wild animals. In the high mountains of the Andes, the giant condor flies with its huge black wings. In the forest, the agile puma walks silently. The puma is strong, fast and has beautiful golden fur. In the cold waters of the Pacific Ocean, the Humboldt penguin swims quickly to catch fish. And in the damp southern woods, the tiny Darwin's frog hides among green leaves. Every animal is unique and important for nature!`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cómo describe el texto al puma en inglés?',
              opciones: {
                A: 'Slow and sleepy.',
                B: 'Strong, fast and with beautiful golden fur.',
                C: 'Tiny with green feathers.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Awesome! "The puma is strong, fast and has beautiful golden fur" (fuerte, rápido y con pelaje dorado).',
              retroalimentacion_negativa: 'Revisa la descripción del puma: es fuerte y rápido ("strong and fast").',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Dónde nada rápidamente el pingüino de Humboldt para atrapar peces?',
              opciones: {
                A: 'In the cold waters of the Pacific Ocean.',
                B: 'On top of a tree.',
                C: 'In the sand of the desert.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Great reading! Nada en las frías aguas del océano Pacífico.',
              retroalimentacion_negativa: 'Los pingüinos nadan en el mar: "In the cold waters of the Pacific Ocean".',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué adjetivo en inglés describe el tamaño de la rana de Darwin ("the tiny Darwin\'s frog")?',
              opciones: {
                A: 'Tiny (diminuto / muy pequeñito).',
                B: 'Enormous (gigante).',
                C: 'Heavy (muy pesado).',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Super! "Tiny" significa muy pequeñito, justo como la ranita de Darwin.',
              retroalimentacion_negativa: '"Tiny" se usa para seres muy pequeños como esta ranita chilena.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 3',
        nombre: 'Unit 3: Yummy Food & Healthy Drinks',
        mes: 'Julio - Septiembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Inglés 2°',
        enfoque: 'Frutas, verduras y bebidas saludables (apple, banana, orange, milk, water); expresar gustos: "I like / I don\'t like".',
        oas: ['OA 03', 'OA 06'],
        descripcion:
          'Expresar preferencias personales sobre comidas y bebidas saludables usando estructuras simples afirmativas y negativas.',
        defaultQuiz: {
          nivel: '2° Básico',
          unidad: 'Unit 3: Yummy Food & Healthy Drinks',
          mes_estimado: 'Julio - Septiembre',
          eje_tematico: 'Food Vocabulary & Expressing Likes',
          oa: 'OA 03, OA 06: Express food preferences using I like / I don\'t like',
          objetivos_aprendizaje: ['OA 03', 'OA 06'],
          titulo_texto: 'A Healthy Picnic in the Park',
          texto_oficial: `On Saturday morning, Ben and Sofia have a picnic in the park. Sofia opens the basket and smiles: "I like red apples and sweet bananas! They give me energy to run." Ben says: "I like cold water and fresh milk, but I don't like soda because it has too much sugar." They share strawberries, carrots and whole wheat sandwiches. Eating fruits and vegetables every day keeps our body happy and strong!`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Qué frutas le gustan a Sofia según el texto?',
              opciones: {
                A: 'Pizza and French fries.',
                B: 'Red apples and sweet bananas.',
                C: 'Ice cream and candy.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Spot on! Sofia dice: "I like red apples and sweet bananas!" (manzanas rojas y plátanos dulces).',
              retroalimentacion_negativa: 'Vuelve a revisar: Sofia prefiere las manzanas rojas y los plátanos.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Por qué Ben dice "I don\'t like soda"?',
              opciones: {
                A: 'Because it has too much sugar (porque tiene demasiada azúcar).',
                B: 'Because it is too cold.',
                C: 'Because it is green.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Smart health choice! Las bebidas gaseosas tienen exceso de azúcar perjudicial.',
              retroalimentacion_negativa: 'Ben rechaza las bebidas de fantasía por su alto contenido de azúcar.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Cómo se dice en inglés "Me gusta la leche fresca"?',
              opciones: {
                A: 'I like fresh milk.',
                B: 'I don\'t like water.',
                C: 'Goodbye banana.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Great English expression! "I like fresh milk" expresa agrado por la leche.',
              retroalimentacion_negativa: 'Para decir "me gusta" usamos la frase "I like", seguida del alimento.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 4',
        nombre: 'Unit 4: Clothes and the Weather',
        mes: 'Octubre - Diciembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Inglés 2°',
        enfoque: 'Prendas de vestir (jacket, pants, t-shirt, boots, hat) y estados del tiempo (sunny, rainy, cloudy, cold, hot).',
        oas: ['OA 04', 'OA 07'],
        descripcion:
          'Reconocer prendas de vestir y asociarlas con las condiciones climáticas y estaciones del año en conversaciones guiadas.',
        defaultQuiz: {
          nivel: '2° Básico',
          unidad: 'Unit 4: Clothes and the Weather',
          mes_estimado: 'Octubre - Diciembre',
          eje_tematico: 'Clothes & Weather Vocabulary',
          oa: 'OA 04, OA 07: Match clothes with weather conditions',
          objetivos_aprendizaje: ['OA 04', 'OA 07'],
          titulo_texto: 'Dressing for Sunny and Rainy Days',
          texto_oficial: `Today in Santiago it is very sunny and hot! Lucas is wearing a yellow T-shirt, blue shorts and a sun hat to protect his face. But in Puerto Montt in the south, it is rainy and cold. Lucas's cousin, Camila, wears a warm jacket, wool socks and yellow rain boots. She carries an umbrella so she doesn't get wet. Choosing the right clothes helps us stay comfortable in any weather!`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cómo está el clima (weather) hoy en Santiago?',
              opciones: {
                A: 'Very snowy and freezing.',
                B: 'Very sunny and hot (muy soleado y caluroso).',
                C: 'Windy and dark.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Correct! El texto indica que en Santiago está "very sunny and hot".',
              retroalimentacion_negativa: 'Lee la primera línea: en Santiago hace sol y calor ("sunny and hot").',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Qué prenda lleva Camila en los pies para los días de lluvia en Puerto Montt?',
              opciones: {
                A: 'Yellow rain boots (botas de lluvia amarillas).',
                B: 'Roller skates.',
                C: 'Swimming goggles.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Very good! Camila usa "yellow rain boots" para no mojarse los pies.',
              retroalimentacion_negativa: 'Para la lluvia se usan botas especiales: "rain boots".',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Por qué Lucas usa un "sun hat" en los días soleados?',
              opciones: {
                A: 'To protect his face from the sun (para proteger su rostro de los rayos solares).',
                B: 'Para guardar monedas adentro.',
                C: 'Porque le gusta bailar bajo la lluvia.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Sun safety champion! Usar sombrero o gorro previene insolaciones y quemaduras.',
              retroalimentacion_negativa: 'El sombrero de sol protege nuestra piel contra la radiación UV.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
    ],
  },

  // =========================================================================
  // 3° BÁSICO - INGLÉS
  // =========================================================================
  '3° Básico': {
    titulo: 'Inglés 3° Básico (English Adventurer)',
    edad: '8 a 9 años',
    resumen:
      'Consolidación de oraciones completas: descripciones personales, la ciudad y lugares comunitarios, habilidades y talentos ("I can..."), y las cuatro estaciones en los paisajes chilenos.',
    unidades: [
      {
        numero: 'Unidad 1',
        nombre: 'Unit 1: All About Me and My Feelings',
        mes: 'Marzo - Abril',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Inglés 3°',
        enfoque: 'Presentación personal (name, age, city, birthday), días de la semana y estados de ánimo (excited, proud, tired, calm).',
        oas: ['OA 01', 'OA 05'],
        descripcion:
          'Producir textos orales y escritos breves presentándose a sí mismos y expresando sentimientos y rutinas semanales.',
        defaultQuiz: {
          nivel: '3° Básico',
          unidad: 'Unit 1: All About Me and My Feelings',
          mes_estimado: 'Marzo - Abril',
          eje_tematico: 'Self-Expression & Feelings',
          oa: 'OA 01, OA 05: Introduce oneself and express emotions',
          objetivos_aprendizaje: ['OA 01', 'OA 05'],
          titulo_texto: 'Meet Diego from Antofagasta!',
          texto_oficial: `Hello everyone! My name is Diego. I am eight years old and I live in Antofagasta, near the Pacific Ocean. My birthday is in September, the month of Chilean Independence! On Mondays and Wednesdays, I go to swimming practice; I feel excited and energized. On Fridays after school, I feel relaxed and happy because the weekend is coming. When I face a difficult math problem, I take a deep breath and stay calm. Being positive helps me learn better every day.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿En qué ciudad de Chile vive Diego y cuántos años tiene?',
              opciones: {
                A: 'In Punta Arenas and he is twelve.',
                B: 'In Antofagasta and he is eight years old.',
                C: 'In London and he is six.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Spot on! Diego dice: "I am eight years old and I live in Antofagasta".',
              retroalimentacion_negativa: 'Revisa las dos primeras frases de la presentación de Diego.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Qué significa la palabra "excited" cuando Diego va a natación los lunes y miércoles?',
              opciones: {
                A: 'Entusiasmado y lleno de energía.',
                B: 'Enojado y con sueño.',
                C: 'Aburrido sin ganas de hacer nada.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Great vocabulary grasp! "Excited" significa emocionado y entusiasmado.',
              retroalimentacion_negativa: '"Excited" describe alegría y expectación positiva antes de una actividad.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué estrategia saludable utiliza Diego cuando enfrenta una tarea difícil?',
              opciones: {
                A: 'Toma una respiración profunda y mantiene la calma ("stay calm").',
                B: 'Rompe sus cuadernos y grita.',
                C: 'Se rinde y no vuelve a estudiar.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Excellent emotional maturity! Respirar hondo y calmarse ayuda a pensar con claridad.',
              retroalimentacion_negativa: 'El texto dice: "I take a deep breath and stay calm" para superar el reto.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 2',
        nombre: 'Unit 2: In the Town & My Community',
        mes: 'Mayo - Junio',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Inglés 3°',
        enfoque: 'Lugares de la ciudad (school, park, hospital, library, supermarket, bakery) y preposiciones de lugar (next to, opposite, between).',
        oas: ['OA 02', 'OA 06'],
        descripcion:
          'Identificar y localizar lugares clave en un mapa barrial usando preposiciones simples de posición.',
        defaultQuiz: {
          nivel: '3° Básico',
          unidad: 'Unit 2: In the Town & My Community',
          mes_estimado: 'Mayo - Junio',
          eje_tematico: 'Town Places & Prepositions',
          oa: 'OA 02, OA 06: Name public places and give simple directions',
          objetivos_aprendizaje: ['OA 02', 'OA 06'],
          titulo_texto: 'A Tour Around Our Neighborhood',
          texto_oficial: `Our neighborhood is a friendly and peaceful place. In the main square, there is a big green park with swings and benches. Next to the park, there is the public library where we borrow storybooks. Opposite the library, you can find the bakery; every morning it smells like fresh warm bread. The hospital is two blocks away, keeping everyone safe. My school is between the post office and the community garden. I love walking around my town with my family!`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Qué lugar público se encuentra al lado del parque ("next to the park")?',
              opciones: {
                A: 'The public library (la biblioteca pública).',
                B: 'An airport runway.',
                C: 'A train station.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Very good! "Next to the park, there is the public library" (al lado del parque está la biblioteca).',
              retroalimentacion_negativa: 'Fíjate en la segunda frase: la biblioteca está justo al lado del parque.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Por qué la panadería ("the bakery") es un lugar popular cada mañana?',
              opciones: {
                A: 'Because it smells like fresh warm bread (huele a pan calientito y crujiente).',
                B: 'Because they sell books in English.',
                C: 'Because doctors work there.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Yummy! En la panadería hornean el pan fresco de cada día.',
              retroalimentacion_negativa: 'El texto destaca el aroma a pan recién horneado cada mañana.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Cómo podemos colaborar los vecinos para mantener lindo el barrio según los valores comunitarios?',
              opciones: {
                A: 'Cuidando las áreas verdes, no botando basura y saludando con respeto a los vecinos.',
                B: 'Pintando las paredes de las casas ajenas.',
                C: 'Dejando bolsas de basura en el suelo de la plaza.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Responsible citizenship! La buena convivencia vecinal crea un barrio seguro y limpio.',
              retroalimentacion_negativa: 'Cuidar los parques y no ensuciar mantiene nuestro entorno hermoso para todos.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 3',
        nombre: 'Unit 3: Hobbies, Sports and Talents',
        mes: 'Julio - Septiembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Inglés 3°',
        enfoque: 'Habilidades con modal "Can / Can\'t" (I can swim, I can play guitar, I can ride a bike), instrumentos musicales y deportes.',
        oas: ['OA 03', 'OA 07'],
        descripcion:
          'Expresar habilidades personales y deportivas utilizando "can" y "can\'t" en oraciones declarativas e interrogativas.',
        defaultQuiz: {
          nivel: '3° Básico',
          unidad: 'Unit 3: Hobbies, Sports and Talents',
          mes_estimado: 'Julio - Septiembre',
          eje_tematico: 'Abilities (Can/Can\'t) & Sports',
          oa: 'OA 03, OA 07: Express abilities and hobbies using can/can\'t',
          objetivos_aprendizaje: ['OA 03', 'OA 07'],
          titulo_texto: 'Talent Show at School: What Can You Do?',
          texto_oficial: `Next Friday our school will celebrate the Annual Talent Show! Everyone is practicing their special abilities. Valentina says: "I can play the acoustic guitar and sing Chilean folk songs." Martin says: "I can juggle three balls and do funny tricks!" Gabriel adds: "I can't sing, but I can run very fast and play soccer like a champion." We all have different talents. When we practice with perseverance, we can improve our skills and have a wonderful time together.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Qué talento especial presentará Valentina en el festival escolar?',
              opciones: {
                A: 'She can drive a motorcycle.',
                B: 'She can play the acoustic guitar and sing folk songs.',
                C: 'She can bake pizza.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Brilliant! Valentina puede tocar la guitarra acústica y cantar.',
              retroalimentacion_negativa: 'Revisa lo que dice Valentina sobre la guitarra y las canciones folclóricas.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Qué significa la frase de Gabriel: "I can\'t sing, but I can run very fast"?',
              opciones: {
                A: 'No sé cantar, pero puedo correr muy rápido.',
                B: 'Canto todos los días y no me gusta correr.',
                C: 'No quiero ir al colegio.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Exact grammatical comprehension! "Can\'t" indica imposibilidad y "can" indica habilidad.',
              retroalimentacion_negativa: '"Can\'t" es negativo (no poder) y "can" es afirmativo (poder).',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué valor destaca el texto para mejorar nuestras habilidades y aprender cosas nuevas?',
              opciones: {
                A: 'La perseverancia y la práctica constante con alegría.',
                B: 'Burlarse de los que se equivocan.',
                C: 'Rendirse al primer intento.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Growth mindset! La perseverancia y el esfuerzo permiten desarrollar cualquier talento.',
              retroalimentacion_negativa: 'Practicar con dedicación es la clave para dominar un deporte o instrumento.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 4',
        nombre: 'Unit 4: Four Seasons and Chilean Nature',
        mes: 'Octubre - Diciembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Inglés 3°',
        enfoque: 'Estaciones del año (spring, summer, autumn, winter), meses, paisajes (mountains, desert, ocean, forest).',
        oas: ['OA 04', 'OA 08'],
        descripcion:
          'Describir el clima y las estaciones en distintas regiones de Chile a través de postales y textos informativos breves.',
        defaultQuiz: {
          nivel: '3° Básico',
          unidad: 'Unit 4: Four Seasons and Chilean Nature',
          mes_estimado: 'Octubre - Diciembre',
          eje_tematico: 'Seasons & Nature of Chile',
          oa: 'OA 04, OA 08: Describe seasons and geographical landscapes',
          objetivos_aprendizaje: ['OA 04', 'OA 08'],
          titulo_texto: 'A Journey Through the Four Seasons in Chile',
          texto_oficial: `Chile is a long and narrow country where each season brings magic. In Summer (December to February), the sun shines bright on the Pacific beaches and the Atacama Desert. In Autumn (March to May), the leaves turn golden, red and brown in the southern vineyards. In Winter (June to August), white snow covers the majestic Andes Mountains, inviting skiers and families to play. In Spring (September to November), flowers bloom across the valleys and green meadows. Nature in Chile is a treasure we must cherish and conserve forever!`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Qué cubre las montañas de los Andes durante el invierno (Winter)?',
              opciones: {
                A: 'Yellow sand.',
                B: 'White snow (nieve blanca).',
                C: 'Green plastic.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Great job! "White snow covers the majestic Andes Mountains" (nieve blanca cubre la cordillera).',
              retroalimentacion_negativa: 'En invierno la cordillera se viste de nieve: "white snow".',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿En qué meses ocurre la primavera (Spring) en Chile?',
              opciones: {
                A: 'September to November (septiembre a noviembre).',
                B: 'June to August.',
                C: 'January only.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Accurate! En el hemisferio sur la primavera va de septiembre a noviembre.',
              retroalimentacion_negativa: 'Revisa el texto: "In Spring (September to November)..."',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Por qué debemos proteger los paisajes naturales de Chile durante todas las estaciones?',
              opciones: {
                A: 'Porque albergan ecosistemas únicos, agua pura y biodiversidad irreemplazable.',
                B: 'Porque ocupan mucho mapa.',
                C: 'Porque a las montañas no les gusta la gente.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Inspiring ecological commitment! Nuestros paisajes naturales son el patrimonio de las futuras generaciones.',
              retroalimentacion_negativa: 'La conservación asegura agua, aire puro y hábitat para la flora y fauna nativa.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
    ],
  },

  // =========================================================================
  // 4° BÁSICO - INGLÉS
  // =========================================================================
  '4° Básico': {
    titulo: 'Inglés 4° Básico (English Champion)',
    edad: '9 a 10 años',
    resumen:
      'Comprensión y producción comunicativa integral: rutinas diarias y la hora ("What time is it?"), profesiones y colaboradores de la comunidad, compras y precios en el mercado, y relatos de viajes por Chile.',
    unidades: [
      {
        numero: 'Unidad 1',
        nombre: 'Unit 1: Daily Routines and Telling Time',
        mes: 'Marzo - Abril',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Inglés 4°',
        enfoque: 'Rutinas cotidianas (wake up, brush teeth, have breakfast, do homework), partes del día y la hora en punto y media hora (o\'clock, half past).',
        oas: ['OA 01', 'OA 05'],
        descripcion:
          'Preguntar y decir la hora, secuenciando actividades diarias con conectores temporales (first, then, after that, finally).',
        defaultQuiz: {
          nivel: '4° Básico',
          unidad: 'Unit 1: Daily Routines and Telling Time',
          mes_estimado: 'Marzo - Abril',
          eje_tematico: 'Daily Routines & Telling Time',
          oa: 'OA 01, OA 05: Sequence daily activities and tell the time',
          objetivos_aprendizaje: ['OA 01', 'OA 05'],
          titulo_texto: 'A Busy and Healthy Day in the Life of Lucas',
          texto_oficial: `Every morning, Lucas wakes up at seven o'clock. First, he makes his bed and washes his face with cool water. At half past seven, he has a nutritious breakfast with oatmeal, sliced kiwi and a glass of milk. At eight o'clock sharp, his morning classes begin at school. In the afternoon at four o'clock, Lucas plays basketball with his friends in the school yard. After that, he does his homework and reads twenty pages of an adventure book. Finally, at nine o'clock, he brushes his teeth and goes to sleep. Maintaining an organized schedule gives him energy and peace of mind.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿A qué hora se despierta Lucas en la mañana ("wake up")?',
              opciones: {
                A: 'At ten o\'clock.',
                B: 'At seven o\'clock (a las siete en punto).',
                C: 'At noon.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Exact! "Lucas wakes up at seven o\'clock" (Lucas se despierta a las 7:00 en punto).',
              retroalimentacion_negativa: 'Revisa la primera oración: la rutina matutina comienza a las siete en punto.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Qué deporte practica Lucas en la tarde después de clases?',
              opciones: {
                A: 'He plays basketball with his friends (juega básquetbol con sus amigos).',
                B: 'He goes scuba diving in the river.',
                C: 'He plays chess in silence.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Great reading! Juega básquetbol a las 4:00 de la tarde en el patio escolar.',
              retroalimentacion_negativa: 'Vuelve al texto: a las cuatro de la tarde Lucas practica basketball.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Por qué tener un horario organizado y dormir ocho a nueve horas diarias es importante para un estudiante?',
              opciones: {
                A: 'Porque permite descansar el cerebro, consolidar lo aprendido y tener energía para el día siguiente.',
                B: 'Porque los relojes se desgastan si no los miramos.',
                C: 'Para no tener tiempo de jugar.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Outstanding sleep hygiene value! El descanso reparador es vital para el desarrollo cerebral y la memoria.',
              retroalimentacion_negativa: 'Dormir a tiempo y organizar el día asegura salud mental y física.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 2',
        nombre: 'Unit 2: Jobs, Occupations & Community Helpers',
        mes: 'Mayo - Junio',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante Inglés 4°',
        enfoque: 'Profesiones y oficios (doctor, teacher, firefighter, police officer, vet, architect, farmer), preguntas: "What do you do? / Where do you work?".',
        oas: ['OA 02', 'OA 06'],
        descripcion:
          'Identificar profesiones, lugares de trabajo y herramientas asociadas, valorando el aporte de cada trabajador a la sociedad.',
        defaultQuiz: {
          nivel: '4° Básico',
          unidad: 'Unit 2: Jobs, Occupations & Community Helpers',
          mes_estimado: 'Mayo - Junio',
          eje_tematico: 'Jobs & Community Occupations',
          oa: 'OA 02, OA 06: Describe jobs and work places in the community',
          objetivos_aprendizaje: ['OA 02', 'OA 06'],
          titulo_texto: 'Heroes in Our Town: The People Who Help Us',
          texto_oficial: `Every day, dedicated workers build a safe and prosperous community. Dr. Ramirez is a pediatrician; she works at the city hospital helping sick children recover their smiles. Mr. Soto is a brave volunteer firefighter (bombero); he extinguishes fires and rescues people from emergencies. Miss Andrea is a passionate science teacher who inspires students to love nature and experiment in the lab. And Don Carlos is a vet (veterinarian) who cares for domestic pets and injured wild animals. When we grow up, our work will also help our country thrive!`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuál es la profesión de Miss Andrea y qué enseña con pasión?',
              opciones: {
                A: 'She is a pilot of airplanes.',
                B: 'She is a passionate science teacher (profesora de ciencias).',
                C: 'She is a pastry chef.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Excellent! Miss Andrea es profesora de ciencias en el laboratorio.',
              retroalimentacion_negativa: 'Revisa el párrafo sobre Miss Andrea: "passionate science teacher".',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Qué labor realiza Don Carlos como veterinario (vet)?',
              opciones: {
                A: 'Cares for domestic pets and injured wild animals (atiende mascotas y animales silvestres heridos).',
                B: 'Repairs broken bicycles.',
                C: 'Builds brick houses.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Spot on! Un veterinario cura y protege a los animales con cariño médico.',
              retroalimentacion_negativa: 'Los veterinarios ("vets") se dedican al cuidado y curación de animales.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Por qué la labor de los bomberos en Chile es admirada por toda la ciudadanía?',
              opciones: {
                A: 'Porque sirven con valentía, compromiso desinteresado y vocación solidaria ante emergencias.',
                B: 'Porque tienen camiones rojos grandes.',
                C: 'Porque no les gusta el agua.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Proud Chilean value! Los bomberos de Chile son un ejemplo mundial de voluntariado y nobleza.',
              retroalimentacion_negativa: 'Su entrega desinteresada y valentía rescatan vidas y protegen a la comunidad.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 3',
        nombre: 'Unit 3: At the Market & Smart Shopping',
        mes: 'Julio - Septiembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Inglés 4°',
        enfoque: 'Comprar alimentos, precios ("How much is it? / How much are they?"), números hasta 100 y hábitos de consumo responsable.',
        oas: ['OA 03', 'OA 07'],
        descripcion:
          'Simular transacciones de compra en mercados y tiendas, preguntando y respondiendo sobre cantidades y precios en inglés.',
        defaultQuiz: {
          nivel: '4° Básico',
          unidad: 'Unit 3: At the Market & Smart Shopping',
          mes_estimado: 'Julio - Septiembre',
          eje_tematico: 'Shopping & Asking Prices',
          oa: 'OA 03, OA 07: Ask for prices and simulate shopping conversations',
          objetivos_aprendizaje: ['OA 03', 'OA 07'],
          titulo_texto: 'Saturday Morning at the Local Farmers Market',
          texto_oficial: `On Saturday morning, Felipe accompanies his mother to the local farmers market (feria libre). The stalls are filled with vibrant fresh produce: crunchy lettuce, juicy tomatoes, sweet strawberries and golden avocados. Felipe asks a friendly vendor: "Good morning! How much is one kilo of sweet oranges?" The vendor replies: "It is one thousand pesos, my boy." Felipe pays with exact coins and places the oranges in a reusable cloth bag. His mother explains that using cloth bags instead of plastic protects our rivers and reduces waste.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Qué pregunta en inglés utilizó Felipe para saber el precio de las naranjas?',
              opciones: {
                A: '"What time is it?"',
                B: '"How much is one kilo of sweet oranges?" (¿Cuánto cuesta un kilo de naranjas?).',
                C: '"Where is my dog?"',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Brilliant! "How much is...?" es la pregunta clave en inglés para saber el precio.',
              retroalimentacion_negativa: 'Para averiguar el costo de un producto se pregunta "How much is...?"',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Por qué la mamá de Felipe prefiere utilizar bolsas de tela reutilizables en vez de bolsas plásticas?',
              opciones: {
                A: 'Porque reduce los residuos plásticos y evita la contaminación de ríos y mares.',
                B: 'Porque las bolsas de plástico pesan cien kilos.',
                C: 'Porque a las frutas no les gusta la tela.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Eco-friendly consumer! Las bolsas reutilizables evitan miles de plásticos de un solo uso.',
              retroalimentacion_negativa: 'Revisa el final del texto: las bolsas de tela cuidan el medio ambiente contra la basura plástica.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué valor económico y social tiene comprar frutas y verduras en las ferias libres locales?',
              opciones: {
                A: 'Apoya directamente a pequeños agricultores locales y permite consumir alimentos frescos a precio justo.',
                B: 'Las ferias son malas para la salud.',
                C: 'En la feria no se habla español.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Smart economic literacy! El comercio local favorece la economía familiar y la agricultura campesina.',
              retroalimentacion_negativa: 'Comprar a productores locales dinamiza el barrio y nos provee de nutrientes frescos.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 4',
        nombre: 'Unit 4: Adventures Across Chile in English',
        mes: 'Octubre - Diciembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante Inglés 4°',
        enfoque: 'Geografía chilena en inglés (desert, lakes, glaciers, islands, mountains), viajes pasados simples y valoración cultural.',
        oas: ['OA 04', 'OA 08'],
        descripcion:
          'Leer y escribir crónicas breves de viaje describiendo atractivos turísticos, flora y fauna de las distintas zonas de Chile.',
        defaultQuiz: {
          nivel: '4° Básico',
          unidad: 'Unit 4: Adventures Across Chile in English',
          mes_estimado: 'Octubre - Diciembre',
          eje_tematico: 'Travel & Chilean Geography',
          oa: 'OA 04, OA 08: Describe travel experiences and Chilean landscapes',
          objetivos_aprendizaje: ['OA 04', 'OA 08'],
          titulo_texto: 'A Postcard Journey: From San Pedro to Patagonia',
          texto_oficial: `Dear Penpal, Greetings from Chile! Last summer, my family travelled across this wonderful country. In the north, we visited the Atacama Desert; at night, the starry sky looked like a diamond blanket! Then we flew south to Chiloé Island, famous for its colorful wooden stilt houses (palafitos) and mystical legends. Finally, we sailed in a catamaran near the blue glaciers of Patagonia, where we saw sea lions and black-necked swans playing in the pristine waters. Chile has diverse landscapes that leave you breathless. I hope you can visit us soon!`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Por qué son famosas las casas de madera de la isla de Chiloé mencionadas en la postal?',
              opciones: {
                A: 'Porque están construidas bajo tierra.',
                B: 'Porque son coloridas casas sobre pilotes llamadas palafitos (wooden stilt houses).',
                C: 'Porque vuelan en globos aerostáticos.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Spot on! Los palafitos de Chiloé son construcciones tradicionales sobre el agua.',
              retroalimentacion_negativa: 'El texto nombra los tradicionales "wooden stilt houses (palafitos)" de Chiloé.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Qué animales observó la familia navegando cerca de los glaciares de la Patagonia?',
              opciones: {
                A: 'Sea lions and black-necked swans (lobos marinos y cisnes de cuello negro).',
                B: 'Tigers and giraffes.',
                C: 'Crocodiles in the sand.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Great comprehension! En la Patagonia habitan lobos marinos y cisnes de cuello negro.',
              retroalimentacion_negativa: 'Revisa la penúltima oración: "we saw sea lions and black-necked swans".',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué ventaja tiene aprender inglés para los niños y niñas de Chile hoy en día?',
              opciones: {
                A: 'Nos conecta con amigos de todo el planeta, abre puertas de conocimiento y permite compartir la belleza de Chile con el mundo.',
                B: 'Solo sirve para los videojuegos.',
                C: 'Hace que olvidemos el español.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Visionary global mindset! El bilingüismo expande horizontes interculturales y oportunidades futuras.',
              retroalimentacion_negativa: 'El inglés es un puente internacional que conecta a nuestros estudiantes con el mundo entero.',
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

export function getInglesUnitsForNivel(nivel: string): MineducUnitDefinition[] {
  const cleanNivel = nivel.trim();
  const nivelData = MINEDUC_INGLES_CURRICULUM[cleanNivel] || MINEDUC_INGLES_CURRICULUM['1° Básico'];

  return nivelData.unidades.map((u, idx) => ({
    id: `ingles-${cleanNivel.toLowerCase().replace(/[^a-z0-9]/g, '')}-u${idx + 1}`,
    numero: u.numero,
    nombre: u.nombre,
    mes_estimado: u.mes,
    enfoque: u.enfoque,
    oas: u.oas,
    default_sample_id: `ingles-sample-${cleanNivel.toLowerCase().replace(/[^a-z0-9]/g, '')}-u${idx + 1}`,
  }));
}

export function getInglesSampleTextsForNivel(nivel: string): SampleMineducText[] {
  const cleanNivel = nivel.trim();
  const nivelData = MINEDUC_INGLES_CURRICULUM[cleanNivel] || MINEDUC_INGLES_CURRICULUM['1° Básico'];

  return nivelData.unidades.map((u, idx) => ({
    id: `ingles-sample-${cleanNivel.toLowerCase().replace(/[^a-z0-9]/g, '')}-u${idx + 1}`,
    title: u.defaultQuiz.titulo_texto || u.nombre,
    nivel: cleanNivel as any,
    unidad: u.numero as any,
    oa: u.oas.join(', '),
    source: 'Texto del Estudiante Idioma Extranjero Inglés Mineduc',
    text: u.defaultQuiz.texto_oficial || '',
    genre: 'Texto Informativo',
  }));
}

export function getInglesSampleTextForNivelAndUnit(nivel: string, unitNum: string): SampleMineducText | undefined {
  const samples = getInglesSampleTextsForNivel(nivel);
  return samples.find((s) => s.unidad === unitNum || unitNum.includes(s.unidad));
}

export function getDefaultInglesQuizForNivelAndUnit(nivel: string, unitNumOrName: string): MineducQuizResult {
  const cleanNivel = nivel.trim();
  const nivelData = MINEDUC_INGLES_CURRICULUM[cleanNivel] || MINEDUC_INGLES_CURRICULUM['1° Básico'];

  const match = nivelData.unidades.find(
    (u) =>
      u.numero === unitNumOrName ||
      u.nombre === unitNumOrName ||
      unitNumOrName.includes(u.numero) ||
      u.numero.includes(unitNumOrName)
  );

  return (match || nivelData.unidades[0]).defaultQuiz;
}
