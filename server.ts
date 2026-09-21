import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { getDefaultQuizForNivelAndUnit } from "./src/data/mineducUnits";
import { getDefaultHistoriaQuizForNivelAndUnit } from "./src/data/historiaUnits";
import { getDefaultMatematicaQuizForNivelAndUnit } from "./src/data/matematicaUnits";
import { getDefaultCienciasQuizForNivelAndUnit } from "./src/data/cienciasUnits";
import { getDefaultInglesQuizForNivelAndUnit } from "./src/data/inglesUnits";
import { randomizeQuizOptions } from "./src/utils/quizRandomizer";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// Lazy Google GenAI Client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("La clave GEMINI_API_KEY no está configurada en las variables de entorno.");
    }
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// System instruction matching user requirements exactly
const SYSTEM_INSTRUCTION = `Actúa como un Profesor Experto en el Currículum Nacional de Educación Básica de Chile y Diseñador Instruccional, especializado en la asignatura de Lenguaje y Comunicación (1° a 4° Básico).

Tu objetivo es estructurar una propuesta completa de comprensión lectora según las 4 Unidades Oficiales del Año Escolar del Mineduc de Chile para el curso y la unidad indicados:
- Unidad 1: Adaptación, convivencia escolar, cuentos familiares y rescate de la identidad cercana. Mes estimado: Marzo - Abril.
- Unidad 2: Naturaleza, animales nativos, fábulas y poemas con ritmo y rima. Mes estimado: Mayo - Junio.
- Unidad 3: Textos informativos, artículos breves, reportajes y divulgación sobre el entorno y la ciencia. Mes estimado: Julio - Septiembre.
- Unidad 4: Mitos, leyendas chilenas, tradiciones y relatos de los pueblos originarios de Chile. Mes estimado: Octubre - Diciembre.

Niveles de desarrollo cognitivo curricular:
- 1° Básico: Foco en localización explícita de información obvia, vocabulario básico y oraciones muy directas.
- 2° Básico: Foco en localización de detalles y primeras inferencias causa-efecto simples.
- 3° Básico: Foco en comprensión profunda de narraciones, secuencias y significado de palabras por contexto.
- 4° Básico: Foco en inferencias complejas, análisis de intenciones de personajes y reflexión crítica sobre el mensaje del texto.

Reglas estrictas de generación:
1. Para la unidad y curso seleccionados entrega:
   - El nombre de la unidad, el mes estimado de aplicación y los Objetivos de Aprendizaje (OA) exactos del Mineduc que se abordan.
   - Un título y un fragmento de texto oficial o lectura original adaptada pedagógicamente al nivel de esa unidad específica (si el usuario provee un texto, úsalo; de lo contrario, genera un texto ejemplar del Mineduc para esa unidad).
2. Taxonomía variada obligatoria:
   - Pregunta 1 (id_pregunta: 1): Debe evaluar localización de información explícita.
   - Pregunta 2 (id_pregunta: 2): Debe evaluar inferencia (causa-efecto o relación lógica).
   - Pregunta 3 (id_pregunta: 3): Debe evaluar vocabulario contextual o reflexión sobre el mensaje.
3. Tono y Vocabulario: Usa lenguaje lúdico, cálido y motivador del español de Chile adecuado para la edad (ej: ¡Súper bien!, ¡Qué seco/a!, ¡Casi, casi!, ¡Pucha, estuviste cerquita!).
4. Cero Alucinaciones: Cada pregunta, alternativa correcta y retroalimentación debe sostenerse exclusivamente en el texto entregado o generado.
5. Estructura de opciones y Dificultad:
   - Opciones: Alternativas A, B, C y D (o A, B, C en 1° Básico).
   - ALEATORIEDAD ESTRICTA DE RESPUESTAS: La respuesta correcta DEBE distribuirse aleatoriamente entre las letras A, B, C y D. ¡ESTÁ ESTRICTAMENTE PROHIBIDO que todas las preguntas tengan como respuesta correcta la letra A! Cada pregunta debe tener una letra correcta distinta y variada (por ejemplo Q1: B, Q2: C, Q3: A o D).
   - Dificultad adecuada: Las alternativas distractoras deben ser plausibles e inteligentes, requiriendo que los estudiantes realmente lean el texto para responder correctamente.
6. Retroalimentaciones formativas:
   - retroalimentacion_positiva: Entusiasta y explica exactamente dónde estaba la pista en el relato.
   - retroalimentacion_negativa: Cariñosa, sin frustrar al niño, entregando una pista amigable del texto para reintentar.
7. Formato de Salida: Debes responder ÚNICAMENTE con un objeto JSON válido, sin formato Markdown adicional ni texto introductorio.`;

const SYSTEM_INSTRUCTION_HISTORIA = `Actúa como un Profesor Experto en el Currículum Nacional de Educación Básica de Chile y Diseñador Instruccional, especializado en la asignatura de Historia, Geografía y Ciencias Sociales (1° a 4° Básico).

Tu objetivo es estructurar una propuesta pedagógica completa de análisis de fuentes, comprensión histórica/geográfica y formación ciudadana según las 4 Unidades Oficiales del Año Escolar del Mineduc de Chile para el curso y la unidad indicados:
- 1° Básico: Unidad 1 (Mi tiempo y mi historia personal y familiar), Unidad 2 (Mi comunidad, sus trabajadores e instituciones), Unidad 3 (Mi país: Chile, sus símbolos y tradiciones), Unidad 4 (Los paisajes de Chile y el cuidado del entorno).
- 2° Básico: Unidad 1 (Los planos, mapas y paisajes de Chile), Unidad 2 (Los pueblos originarios de Chile), Unidad 3 (El encuentro entre dos mundos y la herencia mestiza), Unidad 4 (Comunidad democrática, diversidad y derechos del niño).
- 3° Básico: Unidad 1 (La Tierra en el espacio, zonas climáticas y paisajes del mundo), Unidad 2 (La civilización de la Antigua Grecia), Unidad 3 (La civilización de la Antigua Roma), Unidad 4 (Vida en sociedad, normas y derechos en la comunidad).
- 4° Básico: Unidad 1 (Geografía de América: Paisajes, recursos naturales y climas), Unidad 2 (Las grandes civilizaciones de América: Los Mayas), Unidad 3 (Las grandes civilizaciones de América: Los Aztecas y los Incas), Unidad 4 (La organización democrática de Chile y la Constitución).

Reglas estrictas de generación:
1. Para la unidad y curso seleccionados entrega:
   - El nombre de la unidad oficial, el mes estimado de aplicación y los Objetivos de Aprendizaje (OA) exactos del Mineduc de Historia que se abordan.
   - Un título y un fragmento de texto oficial, fuente histórica, relato o crónica geográfica adaptada pedagógicamente al nivel de esa unidad específica.
2. Taxonomía variada obligatoria:
   - Pregunta 1 (id_pregunta: 1): Debe evaluar localización de información explícita en la fuente o texto.
   - Pregunta 2 (id_pregunta: 2): Debe evaluar inferencia, causa-efecto histórico o relación geográfica.
   - Pregunta 3 (id_pregunta: 3): Debe evaluar reflexión ciudadana, valores democráticos, valoración patrimonial o aplicación comunitaria.
3. Tono y Vocabulario: Lenguaje lúdico, cálido, empático y motivador del español de Chile.
4. Cero Alucinaciones: Cada pregunta, alternativa y retroalimentación debe sostenerse exclusivamente en el texto o fuente entregada.
5. Estructura de opciones: Exactamente 3 alternativas (A, B y C). Una correcta, una distractora plausible y una lúdica/absurda.
8. Retroalimentaciones formativas: Entusiastas, afectivas y orientadoras.
7. Formato de Salida: Debes responder ÚNICAMENTE con un objeto JSON válido, sin formato Markdown adicional ni texto introductorio.`;

const SYSTEM_INSTRUCTION_MATEMATICA = `Actúa como un Profesor Experto en el Currículum Nacional de Educación Básica de Chile y Diseñador Instruccional, especializado en la asignatura de Matemática (1° a 4° Básico) según las Bases Curriculares y el programa Sumo Primero del Mineduc.

Tu objetivo es estructurar una propuesta pedagógica completa de resolución de problemas matemáticos contextualizados y modelamiento según las 4 Unidades Oficiales del Año Escolar del Mineduc de Chile para el curso y la unidad indicados:
- 1° Básico:
  * Unidad 1: Conteo del 0 al 10 con material concreto, lectura y escritura de números, comparación de cantidades.
  * Unidad 2: Sumas y restas simples de un solo dígito hasta 10 (juntar/agregar y quitar/separar de un dígito, cálculo mental básico).
  * Unidad 3: Números hasta el 20, formación de la decena (10 + número), sumas y restas simples hasta 20, y figuras geométricas 2D.
  * Unidad 4: Patrones repetitivos, longitud no estandarizada y resolución de problemas cotidianos de suma y resta hasta 20.
  REGLA CRUCIAL PARA 1° BÁSICO: Las operaciones deben ser estrictamente sumas y restas simples de un solo dígito (hasta 10) en las primeras unidades, avanzando paulatinamente hasta el ámbito de 20 al final del año.
- 2° Básico: Unidad 1 (Números hasta 100 y valor posicional D y U), Unidad 2 (Adición y sustracción hasta 100 y cálculo mental), Unidad 3 (Tablas del 2, 5 y 10 como suma repetida y monedas de Chile), Unidad 4 (Geometría, medición en cm y resolución de problemas).
- 3° Básico: Unidad 1 (Números hasta 1.000 y adición/sustracción con algoritmo), Unidad 2 (Tablas del 3, 4, 6 y 8 y cálculo mental), Unidad 3 (División como reparto equitativo y fracciones comunes 1/2, 1/4), Unidad 4 (Perímetro y problemas combinados).
- 4° Básico: Unidad 1 (Números hasta 10.000 y redondeo), Unidad 2 (Multiplicación por dos dígitos y división con resto), Unidad 3 (Fracciones de igual denominador y números decimales 0,1 a 0,9), Unidad 4 (Cálculo de área en cuadrícula y ecuaciones aditivas simples).

Reglas estrictas de generación:
1. Para la unidad y curso seleccionados entrega:
   - El nombre de la unidad oficial, el mes estimado y los Objetivos de Aprendizaje (OA) exactos del Mineduc de Matemática.
   - Un título y una situación matemática o problema cotidiano contextualizado con datos numéricos claros acordes al nivel.
2. Taxonomía de las 3 preguntas:
   - Pregunta 1 (id_pregunta: 1): Localización o representación (identificar datos concretos, lectura de cantidades o comprensión de la situación matemática).
   - Pregunta 2 (id_pregunta: 2): Cálculo de la operación matemática (resolver la suma, resta, cálculo numérico o relación cuantitativa).
   - Pregunta 3 (id_pregunta: 3): Resolución de problemas o interpretación del resultado en la vida cotidiana.
3. Tono y Vocabulario: Lenguaje cálido, empático, lúdico y motivador del español de Chile.
4. Cero Alucinaciones: Los cálculos matemáticos deben ser rigurosamente exactos y coherentes con los datos del enunciado.
5. Estructura de opciones: Exactamente 3 alternativas (A, B y C). Una correcta, una distractora de error de cálculo común y una distractora absurda.
6. Retroalimentaciones formativas: Entusiastas, afectivas y con explicación paso a paso de la operación matemática.
7. Formato de Salida: Debes responder ÚNICAMENTE con un objeto JSON válido, sin formato Markdown adicional ni texto introductorio.`;

const SYSTEM_INSTRUCTION_CIENCIAS = `Actúa como un Profesor Experto en el Currículum Nacional de Educación Básica de Chile y Diseñador Instruccional, especializado en Ciencias Naturales (1° a 4° Básico) guiado por el Puma Chileno (guardián de los ecosistemas).

Tu objetivo es estructurar una propuesta pedagógica completa de indagación científica, exploración de los seres vivos, el cuerpo humano y la materia según las 4 Unidades Oficiales del Año Escolar del Mineduc de Chile para el curso y la unidad indicados:
- 1° Básico: Seres vivos vs cosas inertes, sentidos y hábitos saludables, animales/plantas nativas de Chile, materiales del entorno.
- 2° Básico: Animales vertebrados e invertebrados, ciclos de vida de seres vivos, órganos principales del cuerpo humano, agua y el tiempo atmosférico.
- 3° Básico: Partes y funciones de las plantas, alimentos y hábitos saludables, el Sistema Solar y los planetas, luz y sonido (fuentes y propiedades).
- 4° Básico: Ecosistemas y cadenas tróficas, masa y volumen de la materia, fuerzas y movimiento, capas de la Tierra y sismos.

Reglas estrictas de generación:
1. Nombre de la unidad oficial, mes estimado y Objetivos de Aprendizaje (OA) exactos del Mineduc.
2. Título y fragmento de texto científico escolar claro, atractivo y pedagógico.
3. Taxonomía de las 3 preguntas:
   - Q1: Localización de datos o características científicas explícitas.
   - Q2: Inferencia de causa-efecto biológica, física o experimental.
   - Q3: Reflexión sobre el cuidado del medioambiente, salud o conclusiones del experimento.
4. Tono cálido, motivador y entusiasta del español de Chile. 3 alternativas (A, B y C).
5. Salida estrictamente en JSON válido.`;

const SYSTEM_INSTRUCTION_INGLES = `Actúa como un Profesor Experto en la enseñanza de Idioma Extranjero: Inglés en Educación Básica de Chile (1° a 4° Básico) según los programas de estudio oficiales del Mineduc, guiado por la simpática Rana de Darwin (Darwin's Frog).

Tu objetivo es estructurar una propuesta pedagógica completa en inglés adaptada a niños hispanohablantes chilenos según las 4 Unidades Oficiales del Mineduc:
- 1° Básico: Greetings and school objects, numbers (1-10) and colors, family and feelings, animals and body parts.
- 2° Básico: Daily routines and time, food and preferences (I like / I don't like), clothes and seasons, home and city places.
- 3° Básico: Animals and habitats, healthy habits and hobbies, school subjects and days of the week, weather and celebrations.
- 4° Básico: Professions and community workers, sports and abilities (can / can't), places in town and directions, free time and technological tools.

Reglas estrictas de generación:
1. Nombre de la unidad oficial, mes estimado y OAs de Inglés Mineduc.
2. Texto o diálogo breve en inglés adaptado al nivel (con vocabulario cotidiano y frases claras).
3. Taxonomía de 3 preguntas:
   - Q1: Identificación explícita de vocabulario o información en el texto.
   - Q2: Comprensión global o inferencia simple de situación.
   - Q3: Asociación intercultural, uso comunicativo o significado contextual.
4. Opciones A, B, C en inglés o bilingüe para fácil comprensión de niños.
5. Retroalimentaciones entusiastas y amigables (ej: "¡Awesome! Excelente trabajo", "Good try! Revisa la palabra clave...").
6. Salida estrictamente en JSON válido.`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    nivel: {
      type: Type.STRING,
      description: "Nivel o curso especificado, ej: 3° Básico",
    },
    unidad: {
      type: Type.STRING,
      description: "Nombre oficial de la unidad, ej: Unidad 2: La naturaleza y sus secretos",
    },
    mes_estimado: {
      type: Type.STRING,
      description: "Mes estimado de aplicación en el año escolar chileno, ej: Mayo - Junio",
    },
    objetivos_aprendizaje: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Objetivos de Aprendizaje exactos del Mineduc abordados, ej: ['OA 03', 'OA 04']",
    },
    titulo_texto: {
      type: Type.STRING,
      description: "Título de la lectura oficial o adaptada",
    },
    texto_oficial: {
      type: Type.STRING,
      description: "Fragmento completo del texto de lectura",
    },
    preguntas: {
      type: Type.ARRAY,
      description: "Exactamente 3 preguntas con taxonomía variada",
      items: {
        type: Type.OBJECT,
        properties: {
          id_pregunta: {
            type: Type.INTEGER,
            description: "Número secuencial de la pregunta (1, 2, 3)",
          },
          enunciado: {
            type: Type.STRING,
            description: "Pregunta clara, amigable y lúdica para el niño o niña",
          },
          opciones: {
            type: Type.OBJECT,
            properties: {
              A: { type: Type.STRING },
              B: { type: Type.STRING },
              C: { type: Type.STRING },
              D: { type: Type.STRING },
            },
            required: ["A", "B", "C"],
          },
          respuesta_correcta: {
            type: Type.STRING,
            description: "Letra de la opción correcta ('A', 'B', 'C' o 'D'). Debe ser aleatoria y estar bien distribuida.",
          },
          retroalimentacion_positiva: {
            type: Type.STRING,
            description: "Refuerzo positivo alegre y cálido chileno con la pista del texto",
          },
          retroalimentacion_negativa: {
            type: Type.STRING,
            description: "Retroalimentación formativa y cariñosa con pista amigable",
          },
          pista_pedagogica: {
            type: Type.STRING,
            description: "Pista pedagógica formativa para niños con necesidades de apoyo o que se sienten bloqueados",
          },
          parrafo_clave: {
            type: Type.STRING,
            description: "Fragmento u oración textual exacta del texto donde está la respuesta",
          },
          habilidad: {
            type: Type.STRING,
            description: "Habilidad cognitiva: 'Localizar información', 'Inferir e interpretar', o 'Reflexionar y valorar'",
          },
        },
        required: [
          "id_pregunta",
          "enunciado",
          "opciones",
          "respuesta_correcta",
          "retroalimentacion_positiva",
          "retroalimentacion_negativa",
        ],
      },
    },
  },
  required: [
    "nivel",
    "unidad",
    "mes_estimado",
    "objetivos_aprendizaje",
    "titulo_texto",
    "texto_oficial",
    "preguntas",
  ],
};

const COGNITIVE_INSTRUCTIONS_PER_GRADE: Record<string, string> = {
  "1° Básico": `EXIGENCIA PEDAGÓGICA RIGUROSA PARA 1° BÁSICO (6 a 7 años):
- Etapa: Lectoescritura Inicial y Decodificación.
- Longitud del texto: Muy breve, diáfano y adecuado para atención de 6 años (máximo 60 a 90 palabras).
- Pregunta 1 (Explícita): Localización DIRECTA y OBVIA en el texto (ej: color de un objeto, nombre de un personaje o lugar explícito).
- Pregunta 2 (Inferencia simple): Causa-efecto simple y evidente (¿Por qué se alegró?, ¿Por qué se escondió?).
- Pregunta 3 (Sentido/Vocabulario): Vocabulario visual o sentido general de la lectura.
- Opciones A, B, C: Muy breves (3 a 7 palabras cada una), alternativas claras y sin ambigüedades.
- Retroalimentación: Altamente afectiva, cálida y motivadora ("¡Excelente, amiguito/a!", "¡Qué seco/a!", "¡Casi, revisemos el cuento otra vez!").`,

  "2° Básico": `EXIGENCIA PEDAGÓGICA RIGUROSA PARA 2° BÁSICO (7 a 8 años):
- Etapa: Fluidez Lectora y Comprensión de Detalles Cotidianos.
- Longitud del texto: 100 a 160 palabras. Fábulas, cuentos escolares o textos informativos breves.
- Pregunta 1 (Explícita): Localización de detalles del relato (materiales, lugares, acciones).
- Pregunta 2 (Inferencia): Causa-efecto, intenciones evidentes o relación entre personajes.
- Pregunta 3 (Vocabulario/Moraleja): Significado de palabras por contexto o enseñanza del relato.
- Opciones A, B, C: De 5 a 10 palabras.
- Retroalimentación: Alegre, constructiva y formativa típica de profesores chilenos.`,

  "3° Básico": `EXIGENCIA PEDAGÓGICA RIGUROSA PARA 3° BÁSICO (8 a 9 años):
- Etapa: Comprensión Profunda de Narraciones y Textos Informativos de Divulgación.
- Longitud del texto: 150 a 250 palabras con párrafos estructurados y vocabulario enriquecido.
- Pregunta 1 (Explícita): Localización en párrafos intermedios o finales.
- Pregunta 2 (Inferencia): Motivaciones psicológicas, deducciones lógicas y cadenas causa-efecto.
- Pregunta 3 (Vocabulario/Reflexión): Sentido de expresiones figuradas o reflexión sobre el mensaje del texto.
- Retroalimentación: Precisa, formativa y destacando la evidencia textual.`,

  "4° Básico": `EXIGENCIA PEDAGÓGICA RIGUROSA PARA 4° BÁSICO (9 a 10 años):
- Etapa: Análisis Inferencial Avanzado y Pensamiento Crítico.
- Longitud del texto: 200 a 350 palabras (novela breve, leyendas territoriales, reportajes científicos o patrimonio).
- Pregunta 1 (Explícita): Localización de secuencias, datos técnicos o argumentos específicos.
- Pregunta 2 (Inferencia compleja): Consecuencias no explícitas, análisis de intenciones del autor o personajes.
- Pregunta 3 (Crítica/Patrimonio): Distinción entre hechos y opiniones, propósito comunicativo o valoración ética.
- Retroalimentación: Estimulante, argumentativa y enriquecedora.`
};

const REFERENCE_TEXTS_PER_GRADE_AND_UNIT: Record<string, { titulo: string; text: string; oa: string }> = {
  "1° Básico_Unidad 1": {
    titulo: "La historia de la ostra que perdió su perla",
    oa: "OA 03, OA 04",
    text: `Había una vez una pequeña ostra que vivía en el fondo del mar. Un día, una corriente de agua fría arrastró su perla brillante y la ostra se puso muy triste. Lloraba desconsolada cuando un pececito dorado pasó nadando a su lado y le preguntó por qué lloraba. La ostra le contó su pena. El pececito quiso ayudarla y buscó por todo el océano algo redondo y hermoso: le trajo una piedrita verde, pero era muy áspera; luego una conchita roja, pero era muy dura. Finalmente, el pececito encontró una gota de rocío marino mágica que brillaba bajo la luz del sol. La ostra colocó la gota dentro de su concha y sonrió feliz, agradeciendo a su nuevo amigo por su gran corazón.`,
  },
  "1° Básico_Unidad 2": {
    titulo: "El sapo de Bullock",
    oa: "OA 03, OA 05",
    text: `El sapo de Bullock es un pequeño anfibio que vive únicamente en los bosques del sur de Chile, especialmente en la cordillera de Nahuelbuta. Su piel es rugosa y de color café con manchas oscuras que le permiten camuflarse entre la hojarasca húmeda. A diferencia de otros sapos, no salta grandes distancias, sino que camina lentamente sobre el suelo del bosque. Se alimenta de pequeños insectos y lombrices que caza durante la noche. Como quedan muy pocos sapos de Bullock en nuestro país, es una especie protegida que todos debemos cuidar para que sus bosques sigan existiendo.`,
  },
  "1° Básico_Unidad 3": {
    titulo: "El caracol de jardín",
    oa: "OA 06, OA 07",
    text: `El caracol de jardín es un molusco que lleva su casa a cuestas: una concha en espiral que lo protege del frío, del calor y de los animales que quieren comerlo. En su cabeza tiene cuatro tentáculos; en los dos más largos se encuentran sus ojos, y con los dos más cortos huele y toca el suelo. Para desplazarse, el caracol produce una sustancia babosa y brillante que le permite deslizarse suavemente sobre hojas, ramas y piedras sin lastimarse. Le encanta comer hojas tiernas y sale de paseo cuando el suelo está húmedo después de la lluvia.`,
  },
  "1° Básico_Unidad 4": {
    titulo: "Un regalo para Mili",
    oa: "OA 04, OA 05",
    text: `Hoy es el cumpleaños de Mili y en su casa todos están de fiesta. Mili despierta temprano esperando su sorpresa favorita. Su mamá entra a la pieza con una hermosa caja envuelta en papel brillante con un lazo amarillo. Mili abre el paquete con emoción y encuentra una linda mochila bordada con una luna y estrellas de colores, junto a su libro de cuentos preferido. Mili abraza fuerte a su mamá y le da un beso sonoro en la mejilla, agradecida por el cariño y la dedicación con que prepararon su día especial.`,
  },
  "2° Básico_Unidad 1": {
    titulo: "Ricitos de Oro y los tres osos",
    oa: "OA 03, OA 04",
    text: `Había una vez una niña llamada Ricitos de Oro por sus cabellos rubios y brillantes. Una tarde salió a pasear por el bosque y llegó a una hermosa casita cuya puerta estaba entreabierta. En la cocina vio una mesa con tres tazones de sopa: uno grande, uno mediano y uno pequeño. Probó la sopa del tazón grande, pero estaba muy caliente; probó la del tazón mediano, pero estaba muy fría; probó la del tazón pequeño, y como estaba en su punto, se la tomó todita. Luego fue a la sala donde había tres sillas. La silla grande era muy dura, la mediana muy blanda, y la pequeña era tan cómoda que al sentarse ¡la rompió! Cansada, subió al dormitorio y se acostó en la cama pequeña, quedándose profundamente dormida. Al poco rato regresaron los dueños de casa: Papá Oso, Mamá Osa y el pequeño Osito.`,
  },
  "2° Básico_Unidad 2": {
    titulo: "El pingüino emperador",
    oa: "OA 06, OA 07",
    text: `El pingüino emperador es el más grande y pesado de todos los pingüinos del planeta. Vive en los fríos hielos de la Antártida, donde soplan vientos helados. Para protegerse del clima extremo, tiene cuatro capas de plumas apretadas e impermeables y una gruesa capa de grasa bajo su piel. Aunque es un ave, el pingüino emperador no vuela en el aire, pero es un extraordinario nadador gracias a sus alas en forma de aletas y su cuerpo alargado. Puede sumergirse a más de quinientos metros de profundidad para cazar peces, calamares y krill. Durante el crudo invierno polar, el macho cuida con paciencia el único huevo sobre sus patas, cubriéndolo con un pliegue de su piel tibia mientras la hembra viaja al mar abierto en busca de alimento.`,
  },
  "2° Básico_Unidad 3": {
    titulo: "La cigarra y la hormiga",
    oa: "OA 04, OA 05",
    text: `Durante los cálidos meses de verano, una alegre cigarra cantaba y descansaba tendida sobre una rama verde. A su lado pasaba sin descanso una hormiguita, cargando pesados granos de trigo sobre sus espaldas hacia su hormiguero. "¿Por qué trabajas tanto con este calor?", le decía la cigarra riendo. "Deberías cantar y disfrutar como yo". La hormiga, secándose el sudor, le respondió: "Guardo provisiones para el invierno, y te aconsejo que hagas lo mismo". La cigarra no hizo caso y continuó holgazaneando. Pero cuando llegó el invierno con sus lluvias frías y la nieve cubrió los campos, la cigarra no encontró ni una sola semilla para comer. Temblando de frío y hambre, tocó la puerta de la hormiga rogando por un poco de comida. La hormiga le preguntó: "¿Qué hiciste en el verano mientras yo trabajaba?". "Cantaba feliz", respondió la cigarra. "Pues si cantabas en verano, ahora te toca bailar en invierno", sentenció la hormiga cerrando su puerta.`,
  },
  "2° Básico_Unidad 4": {
    titulo: "La historia de la bicicleta",
    oa: "OA 06, OA 07",
    text: `La bicicleta no siempre fue como la conocemos hoy. Hace más de doscientos años, un inventor alemán creó un vehículo de madera con dos ruedas alineadas llamado draisiana. Esta primera máquina no tenía pedales, ni cadenas, ni frenos: la persona se sentaba en un asiento y debía impulsarse empujando el suelo fuertemente con sus pies, como si fuera corriendo sentado. Años más tarde, otros inventores agregaron pedales conectados directamente a una rueda delantera gigante de metal. Manejarla era peligroso porque los ciclistas caían desde gran altura al perder el equilibrio. Finalmente, a fines del siglo diecinueve, se crearon las bicicletas con ruedas del mismo tamaño, cadena metálica, neumáticos de goma inflados con aire y frenos en el manubrio, convirtiéndose en el medio de transporte limpio, económico y saludable que millones de personas usan hoy en todo el mundo.`,
  },
  "3° Básico_Unidad 1": {
    titulo: "El tigre negro y el venado blanco",
    oa: "OA 03, OA 04",
    text: `El tigre negro y el venado blanco vivían en el mismo bosque y, sin conocerse, ambos decidieron construir una casa en el mismo claro de la selva. El venado blanco llegó primero por la mañana, cortó los árboles y despejó el terreno. Por la tarde llegó el tigre negro, vio el sitio limpio y pensó: "Qué dios tan bondadoso me ha preparado el terreno", y levantó las cuatro paredes de madera. Al día siguiente, el venado regresó, vio los muros y techó la vivienda con hojas de palma. Cuando la casa estuvo lista, ambos llegaron al atardecer y se miraron sorprendidos al descubrir que compartían el mismo techo. Decidieron convivir en paz dividiendo las habitaciones, pero en secreto cada uno desconfiaba del otro. La tensión creció hasta que una noche de tormenta, asustados por ruidos en la oscuridad, ambos salieron huyendo despavoridos en direcciones contrarias, dejando la hermosa casa completamente vacía en medio de la selva.`,
  },
  "3° Básico_Unidad 2": {
    titulo: "La leyenda del copihue",
    oa: "OA 03, OA 04",
    text: `Cuenta la tradición mapuche que hace muchos siglos, en los frondosos bosques del sur de Chile, vivían dos jóvenes pertenecientes a tribus rivales: la hermosa princesa Hues y el valiente príncipe Copih. A pesar de los conflictos entre sus pueblos, ambos se enamoraron profundamente y se encontraban en secreto en un claro junto a una hermosa laguna rodeada de canelos. Enterados los caciques de ambas tribus de estos encuentros clandestinos, los descubrieron y la tragedia alcanzó a los dos enamorados. Arrepentidas por el dolor causado, las familias lloraron durante un año completo. Pasado ese tiempo, los miembros de ambas tribus se reunieron en la laguna y descubrieron enredaderas que trepaban por los árboles altos, de cuyas ramas colgaban flores rojas en forma de campanas alargadas. En memoria del amor de los jóvenes, llamaron a la flor nacional "Copihue", símbolo de paz y unión en la naturaleza chilena.`,
  },
  "3° Básico_Unidad 3": {
    titulo: "La Pincoya: guardiana de los mares de Chiloé",
    oa: "OA 04, OA 05",
    text: `En el archipiélago de Chiloé, los pescadores y mariscadores conocen muy bien a la Pincoya, una sirena mágica de extraordinaria belleza, con larga cabellera dorada y vestida con algas del océano. La Pincoya surge de las profundidades marinas y danza sobre las olas o sobre las rocas de las playas. Si la Pincoya baila mirando hacia el mar abierto y batiendo sus brazos con alegría, anuncia a los chilotes que la temporada de pesca y mariscos será muy abundante en esa caleta. En cambio, si baila de espaldas al mar mirando hacia la tierra, es señal de que los peces escasearán y los pescadores deberán buscar sustento en otros canales. Para conservar la bendición de la Pincoya, los isleños deben pescar con respeto y compartir sus alimentos con generosidad, pues si alguien depreda el mar con egoísmo, la sirena abandona las playas y se lleva la riqueza marina.`,
  },
  "3° Básico_Unidad 4": {
    titulo: "Dame la mano (Gabriela Mistral)",
    oa: "OA 05, OA 06",
    text: `Dame la mano y danzaremos;\ndame la mano y me amarás.\nComo una sola flor seremos,\ncomo una flor, y nada más...\n\nEl mismo verso cantaremos,\nal mismo paso bailarás.\nComo una espiga ondularemos,\ncomo una espiga, y nada más.\n\nTe llamas Rosa y yo Esperanza;\npero tu nombre olvidarás,\nporque seremos una danza\nen la colina y nada más...`,
  },
  "4° Básico_Unidad 1": {
    titulo: "El pequeño escribiente florentino",
    oa: "OA 03, OA 04",
    text: `Julio era un niño de doce años, hijo de un modesto empleado ferroviario en Florencia. Para mantener a la numerosa familia, el anciano padre trabajaba de noche escribiendo direcciones en fajas de periódicos que una imprenta le encargaba. Por cada quinientas fajas le pagaban una suma muy pequeña, y sus ojos cansados apenas podían soportar la luz de la lámpara. Julio le rogó que lo dejara ayudar, pero el padre se negó tajantemente diciendo: "Tu deber es estudiar y descansar". Sabiendo que a medianoche su padre se acostaba rendido, Julio ideó un plan: esperó que la casa durmiera, se levantó en puntillas hacia el despacho, encendió la vela y comenzó a copiar con su hermosa caligrafía las fajas pendientes. Durante semanas, el niño sacrificó su sueño nocturno para duplicar las ganancias de su padre. Aunque en la escuela comenzó a mostrarse somnoliento y su padre le reprochó su cansancio creyendo que era dejadez, Julio guardó silencio hasta que una noche el padre descubrió con lágrimas en los ojos la inmensa nobleza de su hijo.`,
  },
  "4° Básico_Unidad 2": {
    titulo: "La leyenda del Pehuén",
    oa: "OA 03, OA 04",
    text: `Desde tiempos remotos, el pueblo pehuenche habitaba en las faldas de la cordillera de los Andes a la sombra de los imponentes pehuenes o araucarias. Sin embargo, los antiguos creían que los frutos del pehuén, llamados piñones, eran tóxicos y no se podían comer, por lo que únicamente usaban los árboles para refugiarse y rezar. Un invierno fue tan feroz que la nieve cubrió los valles durante meses; los animales murieron de frío y el hambre amenazó con exterminar a la tribu entera. Desesperados, los caciques enviaron a los jóvenes a buscar alimento a zonas distantes. Uno de los muchachos regresaba con las manos vacías cuando se encontró con un anciano de larga barba blanca. El anciano le preguntó: "¿Por qué desprecian el regalo más generoso de la montaña? Los piñones del pehuén son el pan sagrado que Ngenechen dejó para ustedes. Hiérvanlos en abundante agua o tuéstelos al fuego y tendrán un manjar nutritivo". El joven llevó el mensaje al consejo y, tras probar los piñones cocidos, la tribu celebró el fin del hambre y desde entonces se llamaron con orgullo los hombres del pehuén.`,
  },
  "4° Básico_Unidad 3": {
    titulo: "Observatorios astronómicos en el norte de Chile: Mirando al universo",
    oa: "OA 06, OA 07",
    text: `El desierto de Atacama, en el norte de Chile, es reconocido por la comunidad científica mundial como la capital de la astronomía en la Tierra. Esto se debe a una combinación natural única: casi trescientas noches completamente despejadas al año, una atmósfera sumamente seca sin vapor de agua y una mínima contaminación lumínica en los valles alejados de las grandes ciudades. Gracias a estas condiciones privilegiadas, científicos de más de treinta países han construido los telescopios más potentes del planeta en cerros como Paranal, La Silla y el llano de Chajnantor, donde opera el complejo ALMA con sesenta y seis antenas gigantes. A través de estos ojos gigantescos apuntados a la oscuridad del cosmos, los astrónomos descubren nuevos planetas fuera del sistema solar, observan el nacimiento de estrellas a millones de años luz y estudian el origen del universo, posicionando a Chile como una ventana abierta hacia los confines del espacio.`,
  },
  "4° Básico_Unidad 4": {
    titulo: "El rey que no quería bañarse",
    oa: "OA 04, OA 05",
    text: `(La escena transcurre en la gran sala del trono real. Al centro, el REY BOMBO está sentado con una corona torcida y los brazos cruzados, con aspecto malhumorado. Entran el MINISTRO y la REINA sosteniendo una esponja gigante y un balde de agua con espuma perfumada).\n\nMINISTRO: (Con reverencia exagerada). Su Majestad, los músicos reales afinaron las arpas y el agua tibia de manantial está lista en la tina de mármol.\nREY: (Gritando y tapándose las orejas). ¡He dicho cien veces que no me bañaré! El agua moja, el jabón arde en los ojos y el patito de hule hace un chillido espantoso.\nREINA: Pero mi querido rey, hace seis meses que no tocas una gota de jabón. Las moscas del reino te siguen a todas partes y tu corona huele a queso añejo.\nREY: ¡Las moscas son mis súbditas más leales! No me baño y punto.\n(Entra la PRINCESA CLARA con una caña de pescar y un barco de juguete).\nPRINCESA: Papá, no es un baño común y corriente. Hemos llenado la tina con burbujas de colores para hacer una gran expedición de piratas en el océano.\nREY: (Abriendo los ojos con curiosidad infantil). ¿Piratas en el océano? ¿Y podré ser el capitán del barco?\nPRINCESA: ¡Por supuesto! Pero ningún capitán navega con corona sucia.\nREY: (Poniéndose de pie de un salto). ¡Entonces a la bañera, marineros! ¡Preparen los cañones de jabón! (Todos ríen y salen marchando alegremente).`,
  },
};

function getFallbackTextFor(nivel: string, unidadStr: string) {
  let uKey = "Unidad 1";
  const norm = (unidadStr || "").toLowerCase();
  if (norm.includes("unidad 2") || norm.includes("u2")) uKey = "Unidad 2";
  else if (norm.includes("unidad 3") || norm.includes("u3")) uKey = "Unidad 3";
  else if (norm.includes("unidad 4") || norm.includes("u4")) uKey = "Unidad 4";

  const key = `${nivel}_${uKey}`;
  if (REFERENCE_TEXTS_PER_GRADE_AND_UNIT[key]) {
    return REFERENCE_TEXTS_PER_GRADE_AND_UNIT[key];
  }
  return REFERENCE_TEXTS_PER_GRADE_AND_UNIT["3° Básico_Unidad 2"];
}

async function callModelWithTimeout(
  ai: GoogleGenAI,
  model: string,
  prompt: string,
  systemInstruction: string = SYSTEM_INSTRUCTION,
  timeoutMs: number = 10000
) {
  const genPromise = ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction,
      temperature: 0.2, // Low temperature to prevent hallucinations
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
    },
  });

  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Timeout de ${timeoutMs}ms excedido para el modelo ${model}`));
    }, timeoutMs);
  });

  return Promise.race([genPromise, timeoutPromise]);
}

async function callGeminiWithFallback(
  ai: GoogleGenAI,
  prompt: string,
  systemInstruction: string = SYSTEM_INSTRUCTION
) {
  // Cascading fallback strategy: start with high-speed gemini-3.1-flash-lite,
  // then gemini-3.8-flash, then gemini-flash-latest
  const modelsToTry = [
    "gemini-3.1-flash-lite",
    "gemini-3.8-flash",
    "gemini-flash-latest",
  ];
  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      console.log(`[Gemini] Intentando modelo: ${model}...`);
      const response = await callModelWithTimeout(ai, model, prompt, systemInstruction, 10000);
      console.log(`[Gemini] Respuesta exitosa con modelo ${model}`);
      return response;
    } catch (err: any) {
      lastError = err;
      const errString = err?.message || String(err);
      console.warn(`[Gemini] Error o timeout con ${model}:`, errString);
      // Immediately proceed to next model in the cascade
    }
  }

  throw lastError;
}

// POST /api/generate-questions
app.post("/api/generate-questions", async (req: Request, res: Response) => {
  try {
    let { text, nivel, unidad, objetivo, titulo, asignatura = 'lenguaje' } = req.body;

    const isHistoria = asignatura === 'historia';
    const isMatematica = asignatura === 'matematica';
    const isCiencias = asignatura === 'ciencias';
    const isIngles = asignatura === 'ingles';
    const cursoKey = nivel || "3° Básico";
    const cursoStr = `Curso: ${cursoKey}.`;
    const unidadStr = unidad ? `Unidad del Año Escolar: ${unidad}.` : "Unidad del Año Escolar: Unidad 1.";
    const fallbackObj = isHistoria
      ? getDefaultHistoriaQuizForNivelAndUnit(cursoKey, unidadStr)
      : isMatematica
      ? getDefaultMatematicaQuizForNivelAndUnit(cursoKey, unidadStr)
      : isCiencias
      ? getDefaultCienciasQuizForNivelAndUnit(cursoKey, unidadStr)
      : isIngles
      ? getDefaultInglesQuizForNivelAndUnit(cursoKey, unidadStr)
      : getFallbackTextFor(cursoKey, unidadStr);

    const oaStr = objetivo
      ? `Objetivos preferentes: ${objetivo}.`
      : `Objetivos preferentes: ${
          isHistoria || isMatematica || isCiencias || isIngles
            ? (fallbackObj as any).oa || (fallbackObj as any).objetivos_aprendizaje?.join(', ')
            : (fallbackObj as any).oa
        }.`;
    const tituloStr = titulo
      ? `Título sugerido: ${titulo}.`
      : `Título sugerido: ${(fallbackObj as any).titulo || (fallbackObj as any).titulo_texto}.`;
    const cognitiveGuideline = COGNITIVE_INSTRUCTIONS_PER_GRADE[cursoKey] || COGNITIVE_INSTRUCTIONS_PER_GRADE["3° Básico"];

    let textInstruction = "";
    if (text && typeof text === "string" && !text.includes("[Aquí el código de tu app inyecta") && text.trim().length >= 20) {
      textInstruction = `Texto o situación oficial provista:\n---\n${text.trim()}\n---`;
    } else {
      const fbText = (fallbackObj as any).text || (fallbackObj as any).texto_oficial;
      const fbTitle = (fallbackObj as any).titulo || (fallbackObj as any).titulo_texto;
      textInstruction = `Fragmento de referencia o situación auténtica Mineduc para esta unidad (${cursoKey}):\nTítulo: ${fbTitle}\n---\n${fbText}\n---`;
    }

    const ai = getGenAI();
    const systemPromptToUse = isHistoria
      ? SYSTEM_INSTRUCTION_HISTORIA
      : isMatematica
      ? SYSTEM_INSTRUCTION_MATEMATICA
      : isCiencias
      ? SYSTEM_INSTRUCTION_CIENCIAS
      : isIngles
      ? SYSTEM_INSTRUCTION_INGLES
      : SYSTEM_INSTRUCTION;

    const subjectName = isHistoria
      ? 'Historia, Geografía y Ciencias Sociales'
      : isMatematica
      ? 'Matemática'
      : isCiencias
      ? 'Ciencias Naturales'
      : isIngles
      ? 'Idioma Extranjero Inglés'
      : 'Lenguaje y Comunicación';

    const prompt = `Parámetros de trabajo:
Asignatura: ${subjectName}.
${cursoStr}
${unidadStr}
${oaStr}
${tituloStr}

${cognitiveGuideline}

${textInstruction}

Genera la propuesta pedagógica completa estructurada según las 4 Unidades Oficiales del Año Escolar del Mineduc de Chile para este curso específico (${cursoKey}) en la asignatura de ${subjectName}, asegurando contenido 100% único y adaptado estrictamente a su edad y etapa cognitiva:
- Nombre de la unidad oficial
- Mes estimado
- OAs exactos del Mineduc
- Título del texto, problema o situación matemática
- Texto oficial o problema contextualizado
- Las 3 preguntas interactivas con taxonomía variada, 3 opciones (A, B, C) y tono chileno cálido y motivador.

Responde estrictamente en el formato JSON indicado.`;

    let response;
    let usedFallback = false;
    let fallbackCurriculumData = null;

    try {
      response = await callGeminiWithFallback(ai, prompt, systemPromptToUse);
    } catch (genError: any) {
      const errStr = genError?.message || String(genError);
      console.error("[Gemini] Todos los modelos fallaron con error:", errStr);

      // If high demand 503, rate limits or timeouts persist on Google endpoints, gracefully serve the authentic Mineduc curricular quiz
      // so neither the student nor the teacher gets blocked or receives a broken interface
      if (
        errStr.includes("503") ||
        errStr.includes("UNAVAILABLE") ||
        errStr.includes("high demand") ||
        errStr.includes("429") ||
        errStr.includes("RESOURCE_EXHAUSTED") ||
        errStr.includes("Timeout")
      ) {
        console.log(`[Curriculum Fallback] Entregando propuesta oficial calibrada Mineduc para ${cursoKey} - ${unidadStr} (${asignatura})`);
        fallbackCurriculumData = isHistoria
          ? getDefaultHistoriaQuizForNivelAndUnit(cursoKey, unidadStr)
          : isMatematica
          ? getDefaultMatematicaQuizForNivelAndUnit(cursoKey, unidadStr)
          : isCiencias
          ? getDefaultCienciasQuizForNivelAndUnit(cursoKey, unidadStr)
          : isIngles
          ? getDefaultInglesQuizForNivelAndUnit(cursoKey, unidadStr)
          : getDefaultQuizForNivelAndUnit(cursoKey, unidadStr);
        usedFallback = true;
      } else {
        throw genError;
      }
    }

    if (usedFallback && fallbackCurriculumData) {
      const randomizedFallback = randomizeQuizOptions(fallbackCurriculumData);
      return res.json({
        success: true,
        data: randomizedFallback,
        rawJson: JSON.stringify(randomizedFallback, null, 2),
        textEvaluated: randomizedFallback.texto_oficial,
        isHighDemandFallback: true,
        notice: "Los servidores de IA de Google están con alta demanda temporal (503). Se ha cargado la propuesta curricular auténtica y calibrada de nuestro banco oficial Mineduc para esta unidad.",
      });
    }

    const rawText = response.text?.trim() || "";
    let parsedData;
    try {
      parsedData = JSON.parse(rawText);
    } catch (parseError) {
      console.error("Error al parsear JSON devuelto por Gemini:", rawText);
      return res.status(500).json({
        error: "La respuesta generada no tiene formato JSON válido.",
        raw: rawText,
      });
    }

    const randomizedData = randomizeQuizOptions(parsedData);

    return res.json({
      success: true,
      data: randomizedData,
      rawJson: JSON.stringify(randomizedData, null, 2),
      textEvaluated: randomizedData.texto_oficial || text || (fallbackObj as any)?.texto_oficial || (fallbackObj as any)?.text || "",
    });
  } catch (error: any) {
    console.error("Error en /api/generate-questions:", error);
    let userMsg = error?.message || "Ocurrió un error al procesar la propuesta curricular con Gemini.";
    try {
      // If error message is a raw JSON string like {"error":{"message":"..."}}
      const parsedErr = JSON.parse(userMsg);
      if (parsedErr?.error?.message) {
        userMsg = parsedErr.error.message;
      }
    } catch {
      // Not JSON
    }

    return res.status(500).json({
      error: userMsg,
    });
  }
});

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// Setup Vite development middleware or serve static files in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Profesor Mineduc API server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
