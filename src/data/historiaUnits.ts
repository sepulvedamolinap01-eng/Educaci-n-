import { MineducQuizResult } from '../types';

export interface HistoriaUnitDefinition {
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

export interface HistoriaNivelInfo {
  titulo: string;
  edad: string;
  resumen: string;
  unidades: HistoriaUnitDefinition[];
}

export const MINEDUC_HISTORIA_CURRICULUM: Record<string, HistoriaNivelInfo> = {
  // =========================================================================
  // 1° BÁSICO - HISTORIA, GEOGRAFÍA Y CIENCIAS SOCIALES
  // =========================================================================
  '1° Básico': {
    titulo: 'Historia, Geografía y Ciencias Sociales 1° Básico',
    edad: '6 a 7 años',
    resumen:
      'Noción del tiempo y secuencia temporal, historia personal y familiar, conocimiento de la comunidad y sus instituciones, símbolos patrios de Chile y valoración de los paisajes naturales y el medio ambiente.',
    unidades: [
      {
        numero: 'Unidad 1',
        nombre: 'Unidad 1: Mi tiempo y mi historia personal y familiar',
        mes: 'Marzo - Abril',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante (Semestre 1)',
        enfoque: 'Noción temporal (ayer, hoy, mañana, días de la semana, meses), línea de vida y familia.',
        oas: ['OA 01', 'OA 02'],
        descripcion:
          'Nombrar y secuenciar días de la semana y meses del año utilizando calendarios, e identificar su historia personal y la de su familia a través de relatos y fotografías.',
        defaultQuiz: {
          nivel: '1° Básico',
          unidad: 'Unidad 1: Mi tiempo y mi historia personal y familiar',
          mes_estimado: 'Marzo - Abril',
          eje_tematico: 'Historia y Orientación Temporal',
          oa: 'OA 01, OA 02: Secuenciar acontecimientos cotidianos y reconocer la historia personal y familiar',
          objetivos_aprendizaje: ['OA 01', 'OA 02'],
          titulo_texto: 'La línea de tiempo de Lucas y su historia familiar',
          texto_oficial: `Lucas tiene seis años y acaba de entrar a primero básico. En su cuaderno, dibujó una línea de tiempo para mostrar momentos importantes de su vida: cuando nació, cuando aprendió a caminar a los doce meses y cuando celebró su primer día de colegio junto a su familia. Su abuela le mostró una fotografía en blanco y negro de cuando ella era niña y le contó cómo jugaban en esa época. Lucas descubrió que el tiempo pasa, que las personas crecen y aprenden cosas nuevas cada día, y que los recuerdos familiares forman parte de su propia historia.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Qué herramienta dibujó Lucas en su cuaderno para mostrar momentos importantes de su vida?',
              opciones: {
                A: 'Un mapa del tesoro escondido.',
                B: 'Una línea de tiempo con recuerdos de su vida.',
                C: 'Un plano de las calles de su ciudad.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Excelente! En el texto se indica claramente que Lucas dibujó una línea de tiempo para registrar su historia.',
              retroalimentacion_negativa: '¡Buen intento! Revisa el primer párrafo: Lucas organizó sus recuerdos en una línea especial de tiempo.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Por qué la abuela le mostró una fotografía antigua a Lucas?',
              opciones: {
                A: 'Para enseñarle cómo jugaban los niños en el pasado y compartir su historia.',
                B: 'Porque quería vender la fotografía a un coleccionista.',
                C: 'Para que Lucas la rompiera y dibujara encima.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Muy bien pensado! La fotografía permitió a Lucas comprender el paso del tiempo y conocer el pasado familiar.',
              retroalimentacion_negativa: '¡Casi! Piensa en lo valioso que es cuando los abuelos nos cuentan cómo eran las cosas cuando ellos eran pequeños.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Por qué es importante conocer los recuerdos de nuestra familia?',
              opciones: {
                A: 'Porque así sabemos quiénes somos y valoramos a las personas que nos cuidan.',
                B: 'Porque nos sirve para ganar dinero en la escuela.',
                C: 'Porque nos obliga a vivir siempre en el pasado sin mirar el futuro.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Extraordinario! Conocer nuestra historia fortalece los lazos de afecto y nuestra identidad personal.',
              retroalimentacion_negativa: '¡Ánimo! La historia familiar nos ayuda a comprender nuestro origen y el cariño de nuestros seres queridos.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 2',
        nombre: 'Unidad 2: Mi comunidad, sus trabajadores e instituciones',
        mes: 'Mayo - Junio',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante (Semestre 1)',
        enfoque: 'Instituciones de la comunidad (escuela, hospital, bomberos, carabineros) y trabajos.',
        oas: ['OA 08', 'OA 09', 'OA 10'],
        descripcion:
          'Identificar la labor que cumplen en beneficio de la comunidad diversas instituciones y trabajadores, y practicar normas de convivencia y seguridad vial.',
        defaultQuiz: {
          nivel: '1° Básico',
          unidad: 'Unidad 2: Mi comunidad, sus trabajadores e instituciones',
          mes_estimado: 'Mayo - Junio',
          eje_tematico: 'Formación Ciudadana y Comunidad',
          oa: 'OA 08, OA 09: Reconocer el rol de instituciones y trabajadores en la comunidad',
          objetivos_aprendizaje: ['OA 08', 'OA 09'],
          titulo_texto: 'Un día en mi comunidad: Los trabajadores que nos ayudan',
          texto_oficial: `En nuestro barrio viven muchas personas que trabajan día a día para que todo funcione bien. Por la mañana, don Carlos, el conductor del furgón escolar, lleva a los estudiantes con su cinturón de seguridad puesto. Cerca de la plaza se ubica el cuartel de Bomberos, cuyos voluntarios están siempre alertas para apagar incendios y rescatar personas sin cobrar dinero. En el consultorio de salud, enfermeras y doctores vacunan a los bebés y cuidan a los enfermos. Cada oficio y profesión es indispensable para nuestra comunidad, y por eso debemos tratarlos con mucho respeto y agradecimiento.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Qué labor solidaria y voluntaria realizan los bomberos en el barrio?',
              opciones: {
                A: 'Vender entradas para el cine del barrio.',
                B: 'Apagar incendios y rescatar personas en emergencias.',
                C: 'Reparar los juguetes rotos de los niños.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Correcto! Los bomberos entregan su tiempo de forma voluntaria para proteger a toda la comunidad.',
              retroalimentacion_negativa: '¡Pista! Los bomberos usan agua y mangueras para protegernos del peligro del fuego.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Por qué don Carlos pide a los niños usar el cinturón de seguridad en el transporte?',
              opciones: {
                A: 'Para cumplir una norma de seguridad vial que protege la vida de los pasajeros.',
                B: 'Porque los cinturones son de adorno y se ven bonitos.',
                C: 'Para que los niños no puedan mirar por la ventana.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Exacto! El cinturón de seguridad es una medida fundamental para prevenir accidentes.',
              retroalimentacion_negativa: '¡Casi! Recuerda que en el tránsito las normas existen para cuidar nuestra integridad física.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Cómo debemos tratar a las personas que trabajan limpiando las calles y atendiendo en nuestra comunidad?',
              opciones: {
                A: 'Con respeto, amabilidad y agradecimiento por su valioso servicio.',
                B: 'Con indiferencia, sin saludarlos ni mirarlos.',
                C: 'Tirando basura al suelo para que tengan más trabajo.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Maravillosa respuesta! Todos los trabajos son dignos e indispensables para vivir en armonía.',
              retroalimentacion_negativa: '¡Buen intento! Todos merecemos un trato cordial y respetuoso por la labor que desempeñamos.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 3',
        nombre: 'Unidad 3: Mi país: Chile, sus símbolos y tradiciones',
        mes: 'Agosto - Septiembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante (Semestre 2)',
        enfoque: 'Ubicación de Chile en el mapa, símbolos patrios (bandera, copihue, escudo) y fiestas patrias.',
        oas: ['OA 05', 'OA 06'],
        descripcion:
          'Conocer los símbolos representativos de Chile (bandera, escudo, himno nacional, copihue) y valorar las expresiones culturales y fiestas tradicionales de nuestro país.',
        defaultQuiz: {
          nivel: '1° Básico',
          unidad: 'Unidad 3: Mi país: Chile, sus símbolos y tradiciones',
          mes_estimado: 'Agosto - Septiembre',
          eje_tematico: 'Identidad Nacional y Patrimonio',
          oa: 'OA 05: Reconocer los símbolos patrios y expresiones de la identidad chilena',
          objetivos_aprendizaje: ['OA 05', 'OA 06'],
          titulo_texto: 'Los símbolos patrios y las fiestas de nuestra patria',
          texto_oficial: `Chile es una larga y angosta faja de tierra que se ubica en el extremo suroeste de América del Sur. Nuestro país tiene hermosos símbolos que nos representan en todo el mundo. La bandera chilena tiene tres colores: el azul del cielo y del mar, el blanco de la nieve de la cordillera y el rojo de la sangre de los patriotas, junto a una estrella solitaria. En el escudo nacional aparecen el huemul y el cóndor, animales protegidos de nuestra fauna. En el mes de septiembre, los chilenos celebramos las Fiestas Patrias bailando cueca, compartiendo empanadas y jugando al trompo y al volantín.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Qué animales nativos chilenos aparecen representados en el escudo nacional?',
              opciones: {
                A: 'El león y el elefante.',
                B: 'El huemul y el cóndor.',
                C: 'El gato y el perro.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Brillante! El huemul (ciervo del sur) y el cóndor (ave de la cordillera) forman nuestro escudo.',
              retroalimentacion_negativa: '¡Revisa el texto! Son dos animales nativos que viven en la cordillera y bosques de Chile.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Qué representa el color blanco en la bandera de Chile según el texto?',
              opciones: {
                A: 'La nieve que cubre las altas cumbres de la cordillera de los Andes.',
                B: 'Las nubes de tormenta del invierno.',
                C: 'La arena blanca de las playas del norte.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Muy bien! El blanco simboliza la nieve eterna de la majestuosa cordillera de los Andes.',
              retroalimentacion_negativa: '¡Casi! Busca en el texto la parte que habla de la cordillera y sus cumbres nevadas.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Por qué es valioso celebrar las Fiestas Patrias con juegos tradicionales y bailes?',
              opciones: {
                A: 'Porque une a las familias y preserva nuestras tradiciones chilenas.',
                B: 'Porque es obligatorio comprar cosas caras en las tiendas.',
                C: 'Porque se prohíbe descansar y jugar.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Excelente reflexión! Las tradiciones nos unen como comunidad y fortalecen nuestro sentido de pertenencia.',
              retroalimentacion_negativa: '¡Ánimo! Celebrar juntos nos ayuda a compartir con cariño nuestras raíces culturales.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 4',
        nombre: 'Unidad 4: Los paisajes de Chile y el cuidado del entorno',
        mes: 'Octubre - Diciembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante (Semestre 2)',
        enfoque: 'Paisajes naturales y culturales de Chile, puntos cardinales básicos y protección ambiental.',
        oas: ['OA 07', 'OA 11'],
        descripcion:
          'Identificar paisajes naturales y elementos creados por el ser humano en Chile, orientarse espacialmente y asumir compromisos de cuidado hacia el entorno natural.',
        defaultQuiz: {
          nivel: '1° Básico',
          unidad: 'Unidad 4: Los paisajes de Chile y el cuidado del entorno',
          mes_estimado: 'Octubre - Diciembre',
          eje_tematico: 'Geografía y Cuidado del Entorno',
          oa: 'OA 07, OA 11: Reconocer paisajes de Chile y valorar el cuidado del medio ambiente',
          objetivos_aprendizaje: ['OA 07', 'OA 11'],
          titulo_texto: 'Los paisajes naturales de Chile: Del desierto a los glaciares',
          texto_oficial: `A lo largo de su territorio, Chile posee una asombrosa diversidad de paisajes. En el norte se extiende el desierto de Atacama, con cielos transparentes y tierras secas donde florecen cactus milenarios. En la zona central encontramos valles verdes y ríos donde se cultivan frutas y verduras. Más al sur, los paisajes se cubren de lagos, volcanes y bosques frondosos donde llueve casi todo el año, hasta llegar al extremo austral con sus gigantescos glaciares de hielo azul. Para que estos maravillosos paisajes no se destruyan, las personas debemos cuidar el agua, evitar tirar plásticos y respetar la vida de las plantas y animales.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Qué paisaje característico se encuentra en el norte de Chile según la lectura?',
              opciones: {
                A: 'El desierto de Atacama con tierras secas y cielos limpios.',
                B: 'Una selva tropical con calor extremo y monos.',
                C: 'Un mar congelado lleno de osos polares.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Exacto! El desierto de Atacama es el más árido del mundo y se ubica en el norte de Chile.',
              retroalimentacion_negativa: '¡Mira el texto! En el segundo párrafo describe el desierto de Atacama con cactus y cielos limpios.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Por qué la zona sur de Chile tiene bosques tan verdes y lagos caudalosos?',
              opciones: {
                A: 'Porque llueve con frecuencia durante casi todo el año en esa región.',
                B: 'Porque la gente usa mangueras gigantes para regar todo el día.',
                C: 'Porque no le llega la luz del sol.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Muy bien deducido! Las abundantes lluvias del sur nutren los frondosos bosques nativos y ríos.',
              retroalimentacion_negativa: '¡Pista! El texto menciona que en el sur llueve casi todo el año, aportando mucha agua natural.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué acción podemos realizar en nuestra vida diaria para cuidar los paisajes naturales de Chile?',
              opciones: {
                A: 'Cuidar el agua, no botar basura y proteger la vegetación.',
                B: 'Llevarse las piedras y plantas del parque a la casa.',
                C: 'Encender fogatas cerca de los árboles secos.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Excelente compromiso ciudadano! Pequeñas acciones cuidan el patrimonio natural de nuestro país.',
              retroalimentacion_negativa: '¡Buen intento! Para proteger la naturaleza debemos reducir la contaminación y cuidar los recursos.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
    ],
  },

  // =========================================================================
  // 2° BÁSICO - HISTORIA, GEOGRAFÍA Y CIENCIAS SOCIALES
  // =========================================================================
  '2° Básico': {
    titulo: 'Historia, Geografía y Ciencias Sociales 2° Básico',
    edad: '7 a 8 años',
    resumen:
      'Lectura de planos y mapas de Chile, zonas naturales (norte, centro, sur y austral), modos de vida de los pueblos originarios (nómades y sedentarios), herencia cultural mestiza y derechos y deberes de la niñez.',
    unidades: [
      {
        numero: 'Unidad 1',
        nombre: 'Unidad 1: Los planos, mapas y paisajes de Chile',
        mes: 'Marzo - Abril',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante (Semestre 1)',
        enfoque: 'Orientación espacial mediante planos y cuadrículas, mapa de Chile y sus macrozonas naturales.',
        oas: ['OA 06', 'OA 07', 'OA 08'],
        descripcion:
          'Ubicar personas y lugares mediante planos utilizando puntos de referencia y puntos cardinales; reconocer la forma de Chile y ubicar la cordillera de los Andes y el océano Pacífico.',
        defaultQuiz: {
          nivel: '2° Básico',
          unidad: 'Unidad 1: Los planos, mapas y paisajes de Chile',
          mes_estimado: 'Marzo - Abril',
          eje_tematico: 'Geografía y Orientación Espacial',
          oa: 'OA 06, OA 07: Leer planos y mapas reconociendo elementos geográficos de Chile',
          objetivos_aprendizaje: ['OA 06', 'OA 07'],
          titulo_texto: 'Cómo orientarse en el espacio: Planos, mapas y las zonas de Chile',
          texto_oficial: `Para no perdernos en un lugar nuevo, las personas utilizamos planos y mapas. Un plano es el dibujo de un espacio pequeño visto desde arriba, como si fuéramos un pájaro volando sobre el techo de una sala de clases o una plaza. En cambio, un mapa representa territorios mucho más grandes, como una región o un país entero. Si observamos el mapa de Chile, notaremos que limita al este con la imponente cordillera de los Andes y al oeste con las aguas azules del océano Pacífico. Los puntos cardinales (Norte, Sur, Este y Oeste) y la rosa de los vientos nos ayudan a guiarnos con precisión.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuál es la principal diferencia entre un plano y un mapa según el texto?',
              opciones: {
                A: 'El plano representa lugares pequeños vistos desde arriba, mientras el mapa muestra territorios grandes.',
                B: 'El plano solo se dibuja con lápiz azul y el mapa con lápiz rojo.',
                C: 'El mapa no sirve para orientarse y el plano sí.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Excelente! Los planos representan espacios acotados (casas, salas), mientras los mapas abarcan países y continentes.',
              retroalimentacion_negativa: '¡Revisa el primer párrafo! Observa cómo describe el tamaño de lo que se dibuja en cada uno.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: 'Si estás parado en la costa mirando hacia la puesta de sol en el mar chileno, ¿hacia qué punto cardinal estás mirando?',
              opciones: {
                A: 'Hacia el Oeste, donde se encuentra el océano Pacífico.',
                B: 'Hacia el Este, donde se ubica la cordillera de los Andes.',
                C: 'Hacia el Polo Norte congelado.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Extraordinario! En Chile el sol se esconde por el Oeste sobre las aguas del océano Pacífico.',
              retroalimentacion_negativa: '¡Recuerda! Al oeste de Chile está el océano Pacífico, donde el sol se oculta cada atardecer.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Por qué es fundamental que todos los niños aprendan a interpretar un plano de evacuación en su colegio?',
              opciones: {
                A: 'Para saber qué rutas seguras seguir con calma ante una emergencia o sismo.',
                B: 'Para ganar una competencia de dibujo en la clase de artes.',
                C: 'Para esconderse de los profesores durante el recreo.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Muy bien! Conocer el plano de evacuación salva vidas y nos ayuda a actuar con serenidad y orden.',
              retroalimentacion_negativa: '¡Casi! Los planos de seguridad escolar sirven para evacuar a zonas seguras en momentos de riesgo.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 2',
        nombre: 'Unidad 2: Los pueblos originarios de Chile',
        mes: 'Mayo - Junio',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante (Semestre 1)',
        enfoque: 'Modos de vida nómade y sedentario; pueblos del norte, centro, sur y zona austral.',
        oas: ['OA 01', 'OA 02', 'OA 03'],
        descripcion:
          'Comparar los modos de vida de los pueblos originarios del territorio chileno actual, distinguiendo entre sociedades nómades y sedentarias en relación con su entorno.',
        defaultQuiz: {
          nivel: '2° Básico',
          unidad: 'Unidad 2: Los pueblos originarios de Chile',
          mes_estimado: 'Mayo - Junio',
          eje_tematico: 'Historia de los Pueblos Originarios',
          oa: 'OA 01, OA 02: Comparar modos de vida nómade y sedentario de los pueblos originarios',
          objetivos_aprendizaje: ['OA 01', 'OA 02'],
          titulo_texto: 'Los primeros habitantes de Chile: Nómades del mar y sedentarios de la tierra',
          texto_oficial: `Mucho antes de la llegada de los españoles, distintos pueblos originarios habitaban el territorio de Chile adaptándose de forma admirable a su medio natural. Algunos pueblos eran nómades: no tenían una casa fija, sino que se desplazaban constantemente en busca de alimento. En los fríos fiordos del sur, los canoeros como los chonos, kawésqar y yaganes navegaban en frágiles canoas cazando lobos marinos y recolectando mariscos. En cambio, otros pueblos eran sedentarios: vivían en aldeas estables hechas de piedra o madera, porque practicaban la agricultura y criaban animales. Entre ellos destacan los atacameños y diaguitas en el norte, que construían terrazas de cultivo para aprovechar el agua escasa, y el pueblo mapuche en la zona centro-sur, respetando a la Ñuke Mapu o Madre Tierra.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuál era la principal característica de los pueblos nómades según el texto?',
              opciones: {
                A: 'No tenían vivienda fija y se trasladaban de un lugar a otro buscando comida.',
                B: 'Vivían en grandes edificios de cemento de varios pisos.',
                C: 'Cultivaban trigo en un solo campo durante toda su vida.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Muy bien! Los nómades viajaban continuamente para cazar, pescar y recolectar sus alimentos.',
              retroalimentacion_negativa: '¡Revisa el segundo párrafo! Nómades son aquellos que se desplazan buscando sustento.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Por qué los pueblos sedentarios como atacameños y diaguitas pudieron construir casas permanentes de piedra?',
              opciones: {
                A: 'Porque al descubrir la agricultura y criar animales ya no necesitaban viajar para alimentarse.',
                B: 'Porque no les gustaba caminar bajo el sol.',
                C: 'Porque tenían carretas a motor para viajar rápido.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Brillante deducción! La agricultura permitió a las comunidades asentarse y fundar aldeas permanentes.',
              retroalimentacion_negativa: '¡Pista! Cuando un pueblo aprende a cultivar plantas y cosechar, puede quedarse en un lugar fijo.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué enseñanza valiosa nos entrega la cosmovisión del pueblo mapuche sobre la naturaleza (Ñuke Mapu)?',
              opciones: {
                A: 'Que debemos cuidar la tierra con respeto y gratitud porque nos da la vida.',
                B: 'Que los bosques deben talarse por completo para construir fábricas.',
                C: 'Que el agua de los ríos debe ensuciarse sin importar las consecuencias.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Extraordinario! El profundo respeto de los pueblos originarios por la naturaleza es un ejemplo ecológico para el presente.',
              retroalimentacion_negativa: '¡Buen intento! Los pueblos originarios nos enseñan a convivir en equilibrio y respeto con nuestro medio ambiente.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 3',
        nombre: 'Unidad 3: El encuentro entre dos mundos y la herencia mestiza',
        mes: 'Agosto - Septiembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante (Semestre 2)',
        enfoque: 'Legado cultural de pueblos originarios y españoles; mestizaje en comidas, idioma y tradiciones.',
        oas: ['OA 04', 'OA 05'],
        descripcion:
          'Reconocer huellas del pasado en nuestro presente a través del idioma (palabras de origen indígena), alimentos, festividades y construcciones coloniales.',
        defaultQuiz: {
          nivel: '2° Básico',
          unidad: 'Unidad 3: El encuentro entre dos mundos y la herencia mestiza',
          mes_estimado: 'Agosto - Septiembre',
          eje_tematico: 'Historia y Patrimonio Cultural',
          oa: 'OA 04, OA 05: Reconocer la herencia cultural mestiza en la sociedad chilena',
          objetivos_aprendizaje: ['OA 04', 'OA 05'],
          titulo_texto: 'Nuestra herencia mestiza: Las raíces de lo que somos hoy',
          texto_oficial: `La sociedad chilena actual nació de un profundo encuentro cultural. Cuando los conquistadores españoles llegaron a estas tierras, trajeron consigo el idioma castellano, la religión católica, animales como el caballo y alimentos como el trigo y la manzana. Al mismo tiempo, los pueblos originarios aportaron sus propios conocimientos milenarios: cultivos como el maíz (choclo), la papa, los porotos y el ají. De la unión entre ambas culturas surgió el pueblo mestizo. Hoy en día usamos cotidianamente muchas palabras de origen indígena, como guagua, pololo, cahuín y pichintún, y compartimos sabrosas comidas típicas que combinan lo mejor de dos mundos.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuáles de estos alimentos eran cultivados por los pueblos originarios antes de la llegada española?',
              opciones: {
                A: 'El trigo y las manzanas traídas en barco.',
                B: 'El maíz (choclo), la papa y los porotos.',
                C: 'Los fideos instantáneos y las gaseosas.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Excelente! La papa, el choclo y el poroto son aportes nutricionales extraordinarios de América al mundo.',
              retroalimentacion_negativa: '¡Revisa el texto! Busca los alimentos nativos que cultivaban los pueblos antes de que llegaran los españoles.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Por qué se dice que palabras como «guagua» o «pichintún» demuestran que somos una cultura mestiza?',
              opciones: {
                A: 'Porque provienen de lenguas indígenas y hoy las usamos con naturalidad al hablar español.',
                B: 'Porque las inventó un programa de televisión infantil.',
                C: 'Porque se prohíbe usarlas en las escuelas.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Exacto! Palabras como guagua (del quechua) o cahuín (del mapudungun) demuestran nuestra rica mezcla cultural.',
              retroalimentacion_negativa: '¡Casi! Estas palabras nacieron en lenguas indígenas y se incorporaron al español chileno.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué valor tiene reconocer la diversidad de nuestras raíces culturales?',
              opciones: {
                A: 'Nos ayuda a valorar a todas las personas y a sentir orgullo de nuestra identidad compartida.',
                B: 'Sirve para discutir sobre qué cultura era superior a la otra.',
                C: 'No tiene ningún valor en la vida actual.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Hermosa reflexión! La diversidad cultural nos enriquece como seres humanos y fortalece la paz.',
              retroalimentacion_negativa: '¡Buen intento! Reconocer nuestras raíces nos ayuda a ser más inclusivos y respetuosos con todos.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 4',
        nombre: 'Unidad 4: Comunidad democrática, diversidad y derechos del niño',
        mes: 'Octubre - Diciembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante (Semestre 2)',
        enfoque: 'Derechos de las niñas y niños, deberes en la escuela y el hogar, resolución pacífica de conflictos.',
        oas: ['OA 11', 'OA 12', 'OA 14'],
        descripcion:
          'Identificar los derechos de los niños consagrados en la Convención Internacional, relacionarlos con sus responsabilidades cotidianas y aplicar el diálogo para resolver conflictos.',
        defaultQuiz: {
          nivel: '2° Básico',
          unidad: 'Unidad 4: Comunidad democrática, diversidad y derechos del niño',
          mes_estimado: 'Octubre - Diciembre',
          eje_tematico: 'Formación Ciudadana y Derechos Humanos',
          oa: 'OA 11, OA 12: Reconocer los derechos y deberes de la infancia en la vida cotidiana',
          objetivos_aprendizaje: ['OA 11', 'OA 12'],
          titulo_texto: 'Nuestros derechos y deberes: Construyendo una escuela con respeto',
          texto_oficial: `Todas las niñas y niños del mundo tienen derechos fundamentales que los protegen y aseguran su bienestar. Entre ellos destacan el derecho a tener un nombre y una nacionalidad, recibir educación de calidad, jugar en un ambiente seguro, tener atención médica cuando se enferman y expresar libremente sus opiniones. Junto a estos derechos, los estudiantes tienen deberes importantes: respetar a sus profesores y compañeros, cuidar los espacios comunes, estudiar con responsabilidad y resolver los desacuerdos mediante el diálogo y la empatía, sin recurrir a burlas ni agresiones físicas.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuál de los siguientes es un derecho fundamental de los niños según la lectura?',
              opciones: {
                A: 'Trabajar largas horas en una fábrica antes de aprender a leer.',
                B: 'Recibir educación, tener atención de salud y jugar en un espacio seguro.',
                C: 'Comprar teléfonos caros en el centro comercial.',
              },
              respuesta_correcta: 'B',
              retroalimentacion_positiva: '¡Muy bien! La educación, la salud, la protección y el juego son derechos garantizados para toda la infancia.',
              retroalimentacion_negativa: '¡Revisa el primer párrafo! Busca los derechos que aseguran el bienestar y desarrollo infantil.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Por qué cada derecho que tenemos viene acompañado de un deber o responsabilidad?',
              opciones: {
                A: 'Porque para que los derechos de todos se respeten, cada persona debe actuar con cuidado hacia los demás.',
                B: 'Porque a los adultos les gusta inventar tareas aburridas.',
                C: 'Porque los derechos solo se consiguen pagando dinero.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Brillante! Por ejemplo, si tenemos derecho a la educación, nuestro deber es estudiar y respetar la clase.',
              retroalimentacion_negativa: '¡Pista! Si todos ejercemos derechos sin respetar los del vecino, no podríamos convivir en paz.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: 'Cuando dos compañeros tienen una diferencia o discusión durante el recreo, ¿cuál es la forma correcta de solucionarlo?',
              opciones: {
                A: 'Conversar con calma, escuchar la postura del otro y pedir ayuda a un adulto si es necesario.',
                B: 'Empujar y gritar más fuerte para demostrar quién tiene la razón.',
                C: 'Dejar de hablarse para siempre e insultarse en silencio.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Excelente lección ciudadana! El diálogo y la empatía son las herramientas más poderosas de la convivencia.',
              retroalimentacion_negativa: '¡Ánimo! La resolución pacífica de conflictos se logra mediante la palabra y el respeto mutuo.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
    ],
  },

  // =========================================================================
  // 3° BÁSICO - HISTORIA, GEOGRAFÍA Y CIENCIAS SOCIALES
  // =========================================================================
  '3° Básico': {
    titulo: 'Historia, Geografía y Ciencias Sociales 3° Básico',
    edad: '8 a 9 años',
    resumen:
      'Coordenadas geográficas, líneas imaginarias de la Tierra y zonas climáticas; civilización griega en el Mediterráneo (polis, mitos y democracia); civilización romana (vida cotidiana, acueductos, derecho) y vida en comunidad.',
    unidades: [
      {
        numero: 'Unidad 1',
        nombre: 'Unidad 1: La Tierra en el espacio, zonas climáticas y paisajes del mundo',
        mes: 'Marzo - Abril',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante (Semestre 1)',
        enfoque: 'Líneas imaginarias (Ecuador, trópicos, círculos polares), paralelos y zonas climáticas.',
        oas: ['OA 06', 'OA 07', 'OA 08'],
        descripcion:
          'Ubicar personas y lugares utilizando líneas de referencia en la cuadrícula geográfica e identificar las tres grandes zonas climáticas de la Tierra y su influencia en la vida humana.',
        defaultQuiz: {
          nivel: '3° Básico',
          unidad: 'Unidad 1: La Tierra en el espacio, zonas climáticas y paisajes del mundo',
          mes_estimado: 'Marzo - Abril',
          eje_tematico: 'Geografía Mundial y Zonas Climáticas',
          oa: 'OA 07, OA 08: Identificar las zonas climáticas de la Tierra y la adaptación del ser humano',
          objetivos_aprendizaje: ['OA 07', 'OA 08'],
          titulo_texto: 'Las grandes zonas climáticas del planeta Tierra y la adaptación humana',
          texto_oficial: `La Tierra tiene una forma casi esférica y está inclinada en el espacio. Debido a esto, los rayos del sol no llegan con la misma intensidad a todas partes de su superficie. Alrededor de la línea del Ecuador, los rayos solares caen directamente, formando la zona cálida o tropical, donde hace calor constante y abundan las selvas húmedas y sabanas. Hacia el norte y hacia el sur se extienden las zonas templadas, donde los rayos caen de manera inclinada; allí las cuatro estaciones del año están muy bien marcadas y vive gran parte de la población mundial, incluyendo la mayor parte de Chile. Finalmente, en los extremos norte y sur se ubican las zonas frías o polares, donde las temperaturas son bajísimas y el hielo cubre el terreno durante casi todo el año. Los seres humanos han desarrollado ingeniosas formas de vestimenta, viviendas y cultivos para adaptarse a cada uno de estos climas.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Por qué los rayos del sol no calientan con la misma intensidad en todas las regiones del planeta?',
              opciones: {
                A: 'Debido a la forma esférica de la Tierra y a su inclinación en el espacio.',
                B: 'Porque el sol se apaga durante varias horas al día.',
                C: 'Porque la luna se interpone entre la Tierra y el sol todos los días.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Muy bien! La curvatura de la Tierra y su eje inclinado determinan la distribución del calor solar.',
              retroalimentacion_negativa: '¡Revisa el primer párrafo! Explica cómo influye la forma esférica y la inclinación terrestre.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿En qué zona climática se ubica la mayor parte de Chile continental?',
              opciones: {
                A: 'En la zona templada del hemisferio sur, con estaciones del año bien diferenciadas.',
                B: 'En la zona tropical cálida con selvas lluviosas permanentes.',
                C: 'En la zona polar ártica junto al Polo Norte.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Exacto! Gran parte de Chile se ubica en la zona templada, lo que permite la agricultura y cuatro estaciones.',
              retroalimentacion_negativa: '¡Pista! En el texto se menciona que en la zona templada vive la mayor parte de la población chilena.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué nos enseña la capacidad del ser humano para vivir tanto en desiertos cálidos como en zonas frías?',
              opciones: {
                A: 'La admirable creatividad humana para idear soluciones tecnológicas y convivir con su entorno.',
                B: 'Que el clima no influye en la ropa ni en la alimentación de las personas.',
                C: 'Que todos los seres humanos deben mudarse al mismo lugar del planeta.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Excelente reflexión geográfica! La adaptación cultural demuestra la resiliencia y el ingenio de la humanidad.',
              retroalimentacion_negativa: '¡Buen intento! Cada sociedad diseña casas, ropas y herramientas según las condiciones de su medio natural.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 2',
        nombre: 'Unidad 2: La civilización de la Antigua Grecia',
        mes: 'Mayo - Junio',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante (Semestre 1)',
        enfoque: 'Espacio geográfico del mar Egeo/Mediterráneo, polis (Atenas y Esparta), mitos y democracia.',
        oas: ['OA 01', 'OA 02', 'OA 03'],
        descripcion:
          'Caracterizar el modo de vida de los antiguos griegos, valorando su legado cultural en la arquitectura, la filosofía, el teatro, los Juegos Olímpicos y el nacimiento de la democracia en Atenas.',
        defaultQuiz: {
          nivel: '3° Básico',
          unidad: 'Unidad 2: La civilización de la Antigua Grecia',
          mes_estimado: 'Mayo - Junio',
          eje_tematico: 'Historia Universal y Legado Clásico',
          oa: 'OA 01, OA 02: Describir el legado de la civilización griega en la vida contemporánea',
          objetivos_aprendizaje: ['OA 01', 'OA 02'],
          titulo_texto: 'La vida cotidiana en la Antigua Grecia: Polis, mitos y democracia',
          texto_oficial: `Hace más de dos mil quinientos años, a orillas del mar Mediterráneo, floreció la civilización griega. Como el territorio de Grecia era montañoso y con pocas tierras planas para cultivar, los griegos se organizaron en polis o ciudades-estado independientes, cada una con sus propias leyes, ejército y gobierno. Las dos polis más célebres fueron Atenas, famosa por sus sabios y por inventar la democracia (el gobierno de los ciudadanos), y Esparta, conocida por la estricta disciplina militar de sus guerreros. Aunque eran ciudades distintas, a todos los griegos los unía el mismo idioma, la devoción por los dioses del monte Olimpo como Zeus y Atenea, las representaciones teatrales al aire libre y la celebración cada cuatro años de los Juegos Olímpicos en honor a sus deidades.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Qué gran invento político nació en la polis de Atenas y sigue vigente en el mundo actual?',
              opciones: {
                A: 'La democracia, donde los ciudadanos participan en las decisiones públicas.',
                B: 'La dictadura militar sin elecciones.',
                C: 'El reinado de un faraón con poder absoluto.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Extraordinario! En Atenas nació la palabra "democracia" (demos = pueblo, kratos = gobierno).',
              retroalimentacion_negativa: '¡Revisa el texto! Busca la polis de Atenas y el sistema donde los ciudadanos votaban.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Por qué el mar Mediterráneo y la navegación fueron tan importantes para los griegos?',
              opciones: {
                A: 'Porque el terreno era muy montañoso y el mar les permitía comerciar y fundar colonias.',
                B: 'Porque no les gustaba caminar por la tierra plana.',
                C: 'Porque tenían submarinos mecánicos para viajar por el fondo del agua.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Brillante análisis geográfico! La escasez de tierras agrícolas impulsó a los griegos a ser expertos marinos y comerciantes.',
              retroalimentacion_negativa: '¡Pista! El relieve montañoso dificultaba el transporte terrestre, por lo que el mar fue su principal vía de comunicación.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué valor cívico de los antiguos griegos sigue siendo un ejemplo para nuestra sociedad?',
              opciones: {
                A: 'La importancia de dialogar, debatir ideas con respeto y participar en los asuntos comunes.',
                B: 'Entrenar únicamente para pelear en guerras sangrientas.',
                C: 'Dejar que una sola persona mande sin escuchar a los demás.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Magnífica conclusión! El debate democrático y la búsqueda de la verdad son pilares del legado helénico.',
              retroalimentacion_negativa: '¡Ánimo! El legado griego nos enseña el valor del diálogo público y la participación ciudadana.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 3',
        nombre: 'Unidad 3: La civilización de la Antigua Roma',
        mes: 'Agosto - Septiembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante (Semestre 2)',
        enfoque: 'Península itálica, vida en Roma, acueductos, calzadas, coliseo, idioma latín y derecho romano.',
        oas: ['OA 03', 'OA 04'],
        descripcion:
          'Caracterizar el modo de vida de los antiguos romanos, su organización republicana e imperial, y reconocer su legado en las leyes, la ingeniería civil y las lenguas romances.',
        defaultQuiz: {
          nivel: '3° Básico',
          unidad: 'Unidad 3: La civilización de la Antigua Roma',
          mes_estimado: 'Agosto - Septiembre',
          eje_tematico: 'Historia Universal y Legado Clásico',
          oa: 'OA 03, OA 04: Analizar el legado de la civilización romana en el mundo actual',
          objetivos_aprendizaje: ['OA 03', 'OA 04'],
          titulo_texto: 'La civilización romana: Acueductos, calzadas y la vida en la gran ciudad',
          texto_oficial: `En el centro de la península Itálica, a orillas del río Tíber, surgió una pequeña aldea de pastores que llegó a convertirse en el imperio más poderoso de la Antigüedad: Roma. Los romanos fueron maestros excepcionales de la ingeniería y la arquitectura. Para abastecer de agua fresca a sus ciudades construyeron majestuosos acueductos de piedra que transportaban el agua desde montañas lejanas. Además, crearon una extensa red de caminos o calzadas empedradas que conectaban todas las provincias del imperio, lo que dio origen al famoso refrán "todos los caminos conducen a Roma". En el centro de la ciudad se reunían en el Foro para comerciar y debatir leyes. Su legado perdura hasta el día de hoy en el idioma español (que deriva del latín) y en el Derecho, base de nuestras leyes actuales.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Qué gran obra de ingeniería construyeron los romanos para llevar agua limpia a las ciudades?',
              opciones: {
                A: 'Los acueductos de piedra.',
                B: 'Tuberías de plástico flexible.',
                C: 'Torres eólicas de viento.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Excelente! Los acueductos transportaban agua por kilómetros usando únicamente la gravedad y pendientes precisas.',
              retroalimentacion_negativa: '¡Busca en el texto! Menciona construcciones de piedra con arcos que llevaban agua fresca.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Por qué las calzadas o caminos de piedra fueron cruciales para el éxito del Imperio Romano?',
              opciones: {
                A: 'Porque permitían transportar mercaderías rápidamente y movilizar a sus ejércitos para proteger el territorio.',
                B: 'Porque eran pistas de carreras para autos modernos.',
                C: 'Porque servían únicamente para que los emperadores salieran a pasear los domingos.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Brillante! La red vial conectaba más de 80.000 kilómetros facilitando el comercio y la administración imperial.',
              retroalimentacion_negativa: '¡Pista! Una red de caminos bien comunicada permite trasladar productos y personas con rapidez.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Cuál de los siguientes elementos de nuestra vida diaria proviene directamente del legado de Roma?',
              opciones: {
                A: 'El idioma español (que viene del latín) y las leyes basadas en el Derecho.',
                B: 'Las pirámides con momias y jeroglíficos.',
                C: 'Los teléfonos celulares con pantallas táctiles.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Extraordinario! Nuestro idioma y nuestros tribunales de justicia tienen raíces profundas en Roma.',
              retroalimentacion_negativa: '¡Casi! Recuerda que el latín dio origen al español y el Derecho romano a nuestras leyes.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 4',
        nombre: 'Unidad 4: Vida en sociedad, normas y derechos en la comunidad',
        mes: 'Octubre - Diciembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante (Semestre 2)',
        enfoque: 'Organización democrática, instituciones públicas, derechos y deberes ciudadanos.',
        oas: ['OA 11', 'OA 12', 'OA 13'],
        descripcion:
          'Reconocer que los niños tienen derechos y deberes, identificar las principales autoridades e instituciones públicas de Chile y valorar la participación ciudadana pacífica.',
        defaultQuiz: {
          nivel: '3° Básico',
          unidad: 'Unidad 4: Vida en sociedad, normas y derechos en la comunidad',
          mes_estimado: 'Octubre - Diciembre',
          eje_tematico: 'Formación Ciudadana y Democracia',
          oa: 'OA 11, OA 12: Reconocer la importancia de las normas e instituciones en la sociedad democrática',
          objetivos_aprendizaje: ['OA 11', 'OA 12'],
          titulo_texto: 'La organización de la sociedad: Normas, instituciones y participación',
          texto_oficial: `Para que miles de personas puedan convivir en paz en una ciudad, es indispensable contar con normas claras y autoridades elegidas democráticamente. En Chile, la máxima autoridad de la República es el Presidente, quien es elegido por voto ciudadano cada cuatro años. En cada comuna, el Alcalde o Alcaldesa y los concejales lideran la Municipalidad, encargándose del alumbrado público, las plazas, la recolección de basura y la salud primaria. Las normas de convivencia no son castigos, sino acuerdos que nos protegen a todos. Cuando participamos en nuestra junta de vecinos, en el centro de alumnos del colegio o simplemente respetando los turnos y el medio ambiente, estamos construyendo una mejor democracia.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Quién es la máxima autoridad de la comuna que administra los servicios municipales según el texto?',
              opciones: {
                A: 'El Alcalde o Alcaldesa de la Municipalidad.',
                B: 'El capitán de un barco pesquero.',
                C: 'El director de un equipo de fútbol profesional.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Correcto! Las municipalidades son lideradas por los alcaldes junto a sus concejales comunales.',
              retroalimentacion_negativa: '¡Revisa el segundo párrafo! Menciona la autoridad que lidera la comuna y cuida las plazas y colegios.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Por qué se afirma en el texto que las normas de convivencia son acuerdos protectores y no castigos?',
              opciones: {
                A: 'Porque permiten ordenar la vida compartida, evitando abusos y asegurando el bienestar de todos.',
                B: 'Porque a nadie le gusta tener derechos.',
                C: 'Porque las leyes se hicieron para que nadie salga de su casa.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Muy bien deducido! Las leyes y normas protegen a los más débiles y garantizan la justicia.',
              retroalimentacion_negativa: '¡Pista! Piensa qué pasaría si no existieran los semáforos: reinaría el desorden y el peligro.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Cómo puede un estudiante de 3° básico practicar la democracia en su propia escuela?',
              opciones: {
                A: 'Participando en la elección de su directiva de curso y respetando las opiniones de todos.',
                B: 'Imponiendo sus deseos a la fuerza sin escuchar a los demás.',
                C: 'No participando en ninguna actividad escolar.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Extraordinaria lección cívica! La democracia se aprende y se practica todos los días en la escuela.',
              retroalimentacion_negativa: '¡Ánimo! Votar por delegados y dialogar en el aula son formas reales de vivir en democracia.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
    ],
  },

  // =========================================================================
  // 4° BÁSICO - HISTORIA, GEOGRAFÍA Y CIENCIAS SOCIALES
  // =========================================================================
  '4° Básico': {
    titulo: 'Historia, Geografía y Ciencias Sociales 4° Básico',
    edad: '9 a 10 años',
    resumen:
      'Geografía de América (paisajes, recursos y coordenadas geográficas de latitud/longitud); civilización Maya (ciudades-estado, ciencia, calendario); civilizaciones Azteca e Inca (Tenochtitlán, Tahuantinsuyo, chinampas y terrazas) y organización democrática de Chile.',
    unidades: [
      {
        numero: 'Unidad 1',
        nombre: 'Unidad 1: Geografía de América: Paisajes, recursos naturales y climas',
        mes: 'Marzo - Abril',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante (Semestre 1)',
        enfoque: 'Continente americano, coordenadas latitud/longitud, recursos naturales y desarrollo sostenible.',
        oas: ['OA 07', 'OA 08', 'OA 09'],
        descripcion:
          'Localizar el continente americano en el mapamundi utilizando paralelos y meridianos, caracterizar sus principales paisajes y recursos naturales, y proponer medidas de desarrollo sostenible.',
        defaultQuiz: {
          nivel: '4° Básico',
          unidad: 'Unidad 1: Geografía de América: Paisajes, recursos naturales y climas',
          mes_estimado: 'Marzo - Abril',
          eje_tematico: 'Geografía del Continente Americano',
          oa: 'OA 07, OA 08: Caracterizar los paisajes y recursos naturales de América',
          objetivos_aprendizaje: ['OA 07', 'OA 08'],
          titulo_texto: 'El continente americano: Paisajes fascinantes y recursos naturales',
          texto_oficial: `América es el segundo continente más grande del planeta, extendiéndose prácticamente desde el Polo Norte hasta muy cerca de la Antártida en el extremo sur. Debido a su enorme longitud territorial, América posee casi todos los climas de la Tierra. A lo largo de su territorio sobresalen accidentes geográficos imponentes, como la cordillera de los Andes en América del Sur y las Montañas Rocosas en América del Norte. Entre sus paisajes más biodiversos se encuentra la selva amazónica, conocida como el pulmón verde del planeta por su colosal riqueza de flora y fauna. El continente cuenta con abundantes recursos naturales renovables, como bosques, aguas dulces y suelos fértiles, y recursos no renovables como minerales (cobre, oro y litio) y petróleo. Cuidar estos recursos mediante el desarrollo sostenible es un desafío urgente para asegurar el futuro de las próximas generaciones.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuál es la cordillera montañosa más importante que recorre América del Sur de norte a sur?',
              opciones: {
                A: 'La cordillera de los Andes.',
                B: 'Los Montes Himalaya.',
                C: 'Los Alpes suizos.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Correcto! La cordillera de los Andes es la cadena montañosa continental más larga del planeta.',
              retroalimentacion_negativa: '¡Revisa el texto! Busca la cordillera que recorre los países sudamericanos, incluyendo a Chile.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Por qué la selva del Amazonas es llamada frecuentemente el "pulmón verde" del planeta Tierra?',
              opciones: {
                A: 'Porque su inmensa masa de árboles y vegetación produce gran cantidad de oxígeno y regula el clima.',
                B: 'Porque tiene forma física parecida al pulmón humano.',
                C: 'Porque allí se fabrican medicamentos para curar la tos.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Brillante deducción ecológica! El Amazonas absorbe dióxido de carbono y genera humedad para todo el planeta.',
              retroalimentacion_negativa: '¡Pista! Piensa en el rol de los árboles de absorber carbono y liberar oxígeno puro a la atmósfera.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué significa el concepto de "desarrollo sostenible" aplicado a los recursos naturales de América?',
              opciones: {
                A: 'Satisfacer nuestras necesidades actuales sin agotar ni destruir los recursos para las generaciones futuras.',
                B: 'Extraer y vender todo el cobre y petróleo lo más rápido posible sin importar la contaminación.',
                C: 'Prohibir todo tipo de agricultura y pesca en el continente.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Extraordinaria visión de futuro! El desarrollo sostenible equilibra el crecimiento con la protección ambiental.',
              retroalimentacion_negativa: '¡Ánimo! El desarrollo sostenible busca que los recursos duren en el tiempo y no se extingan.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 2',
        nombre: 'Unidad 2: Las grandes civilizaciones de América: Los Mayas',
        mes: 'Mayo - Junio',
        semestre: '1° Semestre',
        tomo: 'Texto del Estudiante (Semestre 1)',
        enfoque: 'Mesoamérica, selva de Yucatán, ciudades-estado, agricultura de roza, pirámides y calendario.',
        oas: ['OA 01', 'OA 02'],
        descripcion:
          'Analizar la civilización maya, considerando su ubicación geográfica en Mesoamérica, su organización política en ciudades-estado, sus avances científicos (matemáticas y astronomía) y su cosmovisión.',
        defaultQuiz: {
          nivel: '4° Básico',
          unidad: 'Unidad 2: Las grandes civilizaciones de América: Los Mayas',
          mes_estimado: 'Mayo - Junio',
          eje_tematico: 'Civilizaciones Originarias de América',
          oa: 'OA 01, OA 02: Analizar los logros y la cosmovisión de la civilización maya',
          objetivos_aprendizaje: ['OA 01', 'OA 02'],
          titulo_texto: 'Los Mayas: Los sabios de la selva y las pirámides astronómicas',
          texto_oficial: `En las densas selvas tropicales de Mesoamérica, en territorios que hoy corresponden al sur de México, Guatemala, Belice y Honduras, floreció la civilización maya. Los mayas nunca formaron un imperio unificado bajo un solo emperador; en su lugar, construyeron magníficas ciudades-estado independientes como Tikal, Palenque y Chichén Itzá, cada una gobernada por su propio rey o Halach Uinic. Para cultivar en la tupida selva, inventaron el sistema de tala y roza. Los mayas fueron extraordinarios científicos: crearon un sistema de numeración vigesimal que incluía el concepto del cero (mucho antes que en Europa) y observaron el movimiento de los planetas con tanta exactitud que diseñaron un calendario solar de 365 días casi perfecto. En la cima de sus colosales pirámides escalonadas de piedra, los sacerdotes se comunicaban con los dioses de la naturaleza como Chaac, el dios de la lluvia.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuál fue un adelanto matemático fundamental creado por los mayas mucho antes que en Europa?',
              opciones: {
                A: 'El uso del número cero dentro de su sistema de numeración.',
                B: 'La calculadora electrónica de baterías solares.',
                C: 'Los números arábigos con teclado táctil.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Excelente! Los mayas fueron una de las poquísimas civilizaciones antiguas que descubrieron el valor del cero.',
              retroalimentacion_negativa: '¡Revisa el texto! Busca en el tercer párrafo los logros científicos en matemáticas.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Por qué los mayas no se consideraban un imperio unificado como los romanos o los incas?',
              opciones: {
                A: 'Porque estaban organizados en ciudades-estado independientes con sus propios reyes y leyes.',
                B: 'Porque no hablaban ningún idioma común.',
                C: 'Porque no sabían construir fortalezas de piedra.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Muy bien analizado! Al igual que los griegos, los mayas eran ciudades-estado autónomas con cultura común.',
              retroalimentacion_negativa: '¡Pista! El texto menciona que cada ciudad (como Tikal o Chichén Itzá) tenía su propio gobernante.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué nos enseña la precisión del calendario y la astronomía de los antiguos mayas?',
              opciones: {
                A: 'El asombroso valor del conocimiento científico de los pueblos originarios de América.',
                B: 'Que los mayas tenían telescopios espaciales modernos.',
                C: 'Que observar las estrellas no servía para la agricultura.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Extraordinaria valoración! Los mayas alcanzaron cumbres científicas observando pacientemente el cosmos a simple vista.',
              retroalimentacion_negativa: '¡Buen intento! Nos demuestra la alta sofisticación intelectual de las civilizaciones americanas.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 3',
        nombre: 'Unidad 3: Las grandes civilizaciones de América: Los Aztecas y los Incas',
        mes: 'Agosto - Septiembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante (Semestre 2)',
        enfoque: 'Imperio Azteca (Tenochtitlán y chinampas) e Imperio Inca (Tahuantinsuyo, terrazas, Qhapaq Ñan).',
        oas: ['OA 03', 'OA 04', 'OA 05'],
        descripcion:
          'Comparar los imperios azteca e inca, considerando sus sistemas agrícolas innovadores (chinampas y terrazas), su arquitectura monumental, sus redes de comunicación y su legado en el presente.',
        defaultQuiz: {
          nivel: '4° Básico',
          unidad: 'Unidad 3: Las grandes civilizaciones de América: Los Aztecas y los Incas',
          mes_estimado: 'Agosto - Septiembre',
          eje_tematico: 'Grandes Imperios Americanos',
          oa: 'OA 03, OA 04: Comparar la civilización azteca e inca y sus innovaciones',
          objetivos_aprendizaje: ['OA 03', 'OA 04'],
          titulo_texto: 'Imperios del Sol: El esplendor de los Aztecas y los Incas',
          texto_oficial: `En el valle de México, los aztecas construyeron su capital, Tenochtitlán, sobre una isla en medio del lago Texcoco. Para cultivar alimentos sobre el agua, crearon las chinampas: islas flotantes hechas con barro, cañas y raíces que eran extremadamente fértiles. Por su parte, en los Andes sudamericanos, los incas fundaron el mayor imperio de América: el Tahuantinsuyo, con su capital sagrada en el Cusco. Para vencer las empinadas laderas de la cordillera, los incas tallaron terrazas de cultivo en las faldas de los cerros con canales de riego de piedra. Además, unieron miles de kilómetros desde Colombia hasta el centro de Chile a través del Qhapaq Ñan o Camino del Inca, por donde los chasquis (mensajeros veloces) corrían llevando noticias oficiales. Ambas civilizaciones adoraban al dios Sol y nos legaron admirables maravillas como Machu Picchu.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Qué ingenioso sistema inventaron los aztecas para cultivar sobre las aguas del lago Texcoco?',
              opciones: {
                A: 'Las chinampas o islas artificiales de cultivo.',
                B: 'Tractores submarinos de vapor.',
                C: 'Invernaderos de vidrio templado.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Exacto! Las chinampas flotantes eran huertos súper productivos construidos en el lago.',
              retroalimentacion_negativa: '¡Revisa el primer párrafo! Busca cómo se llamaban las islas de barro y caña creadas en el lago.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Por qué las terrazas de cultivo fueron una solución genial de los incas en la cordillera de los Andes?',
              opciones: {
                A: 'Porque permitían aplanar las faldas de los cerros empinados para sembrar y evitar la erosión del agua.',
                B: 'Porque servían como escaleras gigantes para subir a los aviones.',
                C: 'Porque a los incas no les gustaba comer papas ni maíz.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Brillante análisis técnico! Las terrazas escalonadas permitieron transformar laderas rocosas en campos agrícolas fértiles.',
              retroalimentacion_negativa: '¡Pista! La cordillera es muy empinada; al hacer escalones planos se puede retener la tierra y el agua.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Qué valor tiene el Camino del Inca (Qhapaq Ñan) que aún atraviesa parte del territorio de Chile?',
              opciones: {
                A: 'Es un extraordinario patrimonio cultural de la humanidad que demuestra la unión y sabiduría territorial andina.',
                B: 'Es una pista olvidada que no tiene importancia histórica.',
                C: 'Una muralla construida para que los pueblos no pudieran comunicarse.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Excelente valoración patrimonial! El Qhapaq Ñan fue declarado Patrimonio Mundial por la UNESCO.',
              retroalimentacion_negativa: '¡Ánimo! El Camino del Inca conectaba a miles de pueblos y hoy es un tesoro arqueológico de nuestra historia.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
      {
        numero: 'Unidad 4',
        nombre: 'Unidad 4: La organización democrática de Chile y la Constitución',
        mes: 'Octubre - Diciembre',
        semestre: '2° Semestre',
        tomo: 'Texto del Estudiante (Semestre 2)',
        enfoque: 'División de los tres poderes del Estado (Ejecutivo, Legislativo, Judicial), elecciones y Constitución.',
        oas: ['OA 11', 'OA 12', 'OA 13'],
        descripcion:
          'Comprender la organización democrática de Chile basada en la división de los poderes del Estado, la importancia de la Constitución Política y el respeto irrestricto a los Derechos Humanos.',
        defaultQuiz: {
          nivel: '4° Básico',
          unidad: 'Unidad 4: La organización democrática de Chile y la Constitución',
          mes_estimado: 'Octubre - Diciembre',
          eje_tematico: 'Formación Ciudadana y Democracia',
          oa: 'OA 11, OA 12: Comprender la división de los poderes del Estado y la Constitución',
          objetivos_aprendizaje: ['OA 11', 'OA 12'],
          titulo_texto: 'La república democrática de Chile: Los tres poderes del Estado y la Constitución',
          texto_oficial: `Chile es una república democrática gobernada por leyes que emanan de la Constitución Política, la ley fundamental del país. Para evitar que una sola persona concentre todo el poder, el gobierno se divide en tres poderes independientes. El Poder Ejecutivo lo encabeza el Presidente de la República junto a sus ministros, administrando el Estado y gobernando el país. El Poder Legislativo reside en el Congreso Nacional (Senadores y Diputados), cuya misión principal es discutir, redactar y aprobar las leyes que rigen a la sociedad. El Poder Judicial está integrado por los tribunales de justicia y la Corte Suprema, encargados de aplicar las leyes y administrar justicia con imparcialidad. Los ciudadanos eligen a sus representantes mediante el sufragio universal y secreto, asegurando que el poder resida en el pueblo soberano.`,
          preguntas: [
            {
              id_pregunta: 1,
              enunciado: '¿Cuál es la función principal del Poder Legislativo (Congreso Nacional) según el texto?',
              opciones: {
                A: 'Discutir, redactar y aprobar las leyes que rigen a la sociedad chilena.',
                B: 'Dirigir los barcos de la Armada en el mar.',
                C: 'Construir estadios de fútbol y canchas de básquetbol.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Exacto! El Congreso Nacional (Cámara de Diputadas/os y Senado) es donde se debaten democráticamente las leyes.',
              retroalimentacion_negativa: '¡Revisa el texto! Busca la parte donde se explica qué hacen los senadores y diputados en el Congreso.',
              habilidad: 'Localizar información',
            },
            {
              id_pregunta: 2,
              enunciado: '¿Por qué en una democracia el poder se divide en tres ramas independientes en lugar de estar en una sola persona?',
              opciones: {
                A: 'Para que los poderes se controlen mutuamente y evitar abusos autoritarios o tiranías.',
                B: 'Porque a nadie le gusta trabajar solo.',
                C: 'Para que los edificios públicos no queden vacíos.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Brillante pensamiento cívico! La separación de poderes ideada por Montesquieu garantiza la libertad ciudadana.',
              retroalimentacion_negativa: '¡Pista! Si un solo gobernante pudiera hacer las leyes, gobernar y juzgar al mismo tiempo, no habría libertad ni justicia.',
              habilidad: 'Inferir e interpretar',
            },
            {
              id_pregunta: 3,
              enunciado: '¿Por qué el voto ciudadano libre y secreto es el corazón de una sociedad democrática?',
              opciones: {
                A: 'Porque permite a todos los ciudadanos elegir pacíficamente a sus autoridades y expresar su voluntad.',
                B: 'Porque es una fiesta obligatoria donde se regalan premios a los votantes.',
                C: 'Porque solo los reyes pueden votar.',
              },
              respuesta_correcta: 'A',
              retroalimentacion_positiva: '¡Extraordinario valor democrático! El sufragio es el derecho ciudadano supremo que sostiene la vida republicana.',
              retroalimentacion_negativa: '¡Buen intento! Mediante el voto, cada ciudadana y ciudadano participa en el destino de su país.',
              habilidad: 'Reflexionar y valorar',
            },
          ],
        },
      },
    ],
  },
};

export function getHistoriaUnitsForNivel(nivel: string): HistoriaUnitDefinition[] {
  return MINEDUC_HISTORIA_CURRICULUM[nivel]?.unidades || [];
}

export function getDefaultHistoriaQuizForNivelAndUnit(
  nivel: string,
  unitNumero: string
): MineducQuizResult {
  const units = getHistoriaUnitsForNivel(nivel);
  const found =
    units.find(
      (u) =>
        u.numero === unitNumero ||
        unitNumero.includes(u.numero) ||
        u.nombre.includes(unitNumero)
    ) || units[0];

  return found.defaultQuiz;
}
