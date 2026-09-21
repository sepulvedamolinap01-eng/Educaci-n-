export type AsignaturaType = 'lenguaje' | 'historia' | 'matematica' | 'ciencias' | 'ingles';

export interface QuestionOption {
  A: string;
  B: string;
  C: string;
  D?: string;
}

export interface QuestionItem {
  id_pregunta: number;
  enunciado: string;
  opciones: QuestionOption;
  respuesta_correcta: 'A' | 'B' | 'C' | 'D';
  retroalimentacion_positiva: string;
  retroalimentacion_negativa: string;
  pista_pedagogica?: string;
  parrafo_clave?: string;
  habilidad?:
    | 'Localizar información'
    | 'Inferir e interpretar'
    | 'Reflexionar y valorar'
    | 'Representar y modelar'
    | 'Calcular'
    | 'Resolver problemas'
    | string;
  dificultad?: 'Fácil' | 'Intermedio' | 'Desafío' | 'Avanzado';
}

export interface MineducQuizResult {
  nivel: string;
  unidad?: string;
  mes_estimado?: string;
  objetivos_aprendizaje?: string[];
  titulo_texto?: string;
  texto_oficial?: string;
  eje_tematico?: string;
  oa?: string;
  preguntas: QuestionItem[];
}

export interface SampleMineducText {
  id: string;
  title: string;
  nivel: '1° Básico' | '2° Básico' | '3° Básico' | '4° Básico';
  unidad: 'Unidad 1' | 'Unidad 2' | 'Unidad 3' | 'Unidad 4';
  oa: string;
  source: string;
  text: string;
  genre:
    | 'Cuento'
    | 'Cuento Tradicional'
    | 'Fábula'
    | 'Texto Informativo'
    | 'Poema'
    | 'Leyenda'
    | 'Leyenda Chilota'
    | 'Leyenda Pehuenche'
    | 'Reportaje Científico'
    | 'Obra Dramática'
    | string;
}

export interface DuaSettings {
  fontSize: 'normal' | 'grande' | 'gigante';
  syllableMode: boolean; // Modo sílabas para 1° y 2° básico
  readingRuler: boolean; // Regla de enfoque para TDAH / dislexia
  speechSpeed: 'slow' | 'normal'; // 0.8x vs 1.0x
  sensoryMode: 'standard' | 'calm'; // Modo calma para hipersensibilidad sensorial
  earlyLearningMode?: boolean; // Modo de Aprendizaje Temprano para 1° y 2° básico: reduce carga de texto, prioriza visuales e interactivos y desactiva gramática compleja
}
