export interface BilingualLine {
  en: string;
  es: string;
}

// Mapeo curado de frases para todas las unidades de Inglés de 1° a 4° Básico
export const INGLES_UNIT_TRANSLATIONS: Record<string, BilingualLine[]> = {
  // -------------------------------------------------------------------------
  // 1° BÁSICO
  // -------------------------------------------------------------------------
  '1-u1': [
    { en: 'Good morning! My name is Tommy.', es: '¡Buenos días! Mi nombre es Tommy.' },
    { en: 'Today is my first day of school.', es: 'Hoy es mi primer día de clases.' },
    { en: 'I have a red backpack, a blue pencil and a yellow book.', es: 'Tengo una mochila roja, un lápiz azul y un libro amarillo.' },
    { en: 'My teacher says: "Hello Tommy! Welcome to class!"', es: 'Mi profesora dice: "¡Hola Tommy! ¡Bienvenido a clases!"' },
    { en: 'I smile and say: "Hello teacher!"', es: 'Yo sonrío y digo: "¡Hola profesora!"' },
    { en: 'In our classroom, we sing songs, learn colors and play with blocks.', es: 'En nuestra sala cantamos canciones, aprendemos colores y jugamos con bloques.' },
    { en: 'At the end of the day, we wave our hands and say: "Goodbye friends, see you tomorrow!"', es: 'Al final del día, movemos las manos y decimos: "¡Adiós amigos, nos vemos mañana!"' },
  ],
  '1-u2': [
    { en: 'Look at my face!', es: '¡Mira mi rostro!' },
    { en: 'I have two brown eyes to see the sunshine.', es: 'Tengo dos ojos cafés para ver la luz del sol.' },
    { en: 'I have one small nose to smell flowers.', es: 'Tengo una nariz pequeña para oler las flores.' },
    { en: 'I have a mouth to sing and smile, and two ears to listen to music.', es: 'Tengo una boca para cantar y sonreír, y dos orejas para escuchar música.' },
    { en: 'When I play with my friends, I feel very happy.', es: 'Cuando juego con mis amigos, me siento muy feliz.' },
    { en: 'Clap your hands and touch your head!', es: '¡Aplaude con tus manos y toca tu cabeza!' },
    { en: 'Taking care of my body with fresh water and fruit makes me grow strong every day.', es: 'Cuidar mi cuerpo con agua fresca y fruta me hace crecer fuerte cada día.' },
  ],
  '1-u3': [
    { en: 'This is my family portrait.', es: 'Este es el retrato de mi familia.' },
    { en: 'My father is tall and wears glasses.', es: 'Mi papá es alto y usa anteojos.' },
    { en: 'My mother is kind and bakes delicious cookies.', es: 'Mi mamá es cariñosa y prepara galletas deliciosas.' },
    { en: 'I have a little sister named Emma; she is two years old and loves to play with dolls.', es: 'Tengo una hermanita llamada Emma; tiene dos años y le encanta jugar con muñecas.' },
    { en: 'In the garden, my grandfather waters the plants.', es: 'En el jardín, mi abuelo riega las plantas.' },
    { en: 'We live in a cozy house with a red roof.', es: 'Vivimos en una casa acogedora con techo rojo.' },
    { en: 'I love my family very much!', es: '¡Amo mucho a mi familia!' },
  ],
  '1-u4': [
    { en: 'There are many happy animals in the green garden!', es: '¡Hay muchos animales felices en el jardín verde!' },
    { en: 'A brown dog runs on the grass and barks: "Woof!"', es: 'Un perro café corre en el pasto y ladra: "¡Guau!"' },
    { en: 'A soft white cat sleeps under the warm sun.', es: 'Un suave gato blanco duerme bajo el sol tibio.' },
    { en: 'Near the pond, a green frog jumps: "Ribbit, ribbit!"', es: 'Cerca del estanque, una rana verde salta: "¡Croac, croac!"' },
    { en: 'Up in the tall tree, a blue bird sings a sweet song.', es: 'Arriba en el árbol alto, un pájaro azul canta una dulce canción.' },
    { en: 'Nature is colorful and full of life.', es: 'La naturaleza es colorida y está llena de vida.' },
    { en: 'We must protect all animals and treat them with kindness.', es: 'Debemos proteger a todos los animales y tratarlos con cariño.' },
  ],

  // -------------------------------------------------------------------------
  // 2° BÁSICO
  // -------------------------------------------------------------------------
  '2-u1': [
    { en: 'Welcome back to our English classroom!', es: '¡Bienvenidos de regreso a nuestra sala de inglés!' },
    { en: 'Our teacher, Miss Clara, says: "Please sit down and open your English books to page ten."', es: 'Nuestra profesora, la señorita Clara, dice: "Por favor tomen asiento y abran sus libros de inglés en la página diez".' },
    { en: 'There are twenty students in our class: ten girls and ten boys.', es: 'Hay veinte estudiantes en nuestra clase: diez niñas y diez niños.' },
    { en: 'When Miss Clara plays music, we stand up and dance.', es: 'Cuando la señorita Clara pone música, nos ponemos de pie y bailamos.' },
    { en: 'When she raises her hand, we listen carefully and raise our hand to speak.', es: 'Cuando ella levanta su mano, escuchamos con atención y levantamos la mano para hablar.' },
    { en: 'Learning English is fun when we respect our classmates and share our colored pencils!', es: '¡Aprender inglés es entretenido cuando respetamos a nuestros compañeros y compartimos nuestros lápices de colores!' },
  ],
  '2-u2': [
    { en: 'Chile is home to wonderful wild animals.', es: 'Chile es hogar de maravillosos animales silvestres.' },
    { en: 'In the high mountains of the Andes, the giant condor flies with its huge black wings.', es: 'En las altas montañas de los Andes, el cóndor gigante vuela con sus enormes alas negras.' },
    { en: 'In the forest, the agile puma walks silently.', es: 'En el bosque, el ágil puma camina en silencio.' },
    { en: 'The puma is strong, fast and has beautiful golden fur.', es: 'El puma es fuerte, veloz y tiene un hermoso pelaje dorado.' },
    { en: 'In the cold waters of the Pacific Ocean, the Humboldt penguin swims quickly to catch fish.', es: 'En las frías aguas del Océano Pacífico, el pingüino de Humboldt nada veloz para atrapar peces.' },
    { en: "And in the damp southern woods, the tiny Darwin's frog hides among green leaves.", es: 'Y en los húmedos bosques del sur, la diminuta ranita de Darwin se esconde entre las hojas verdes.' },
    { en: 'Every animal is unique and important for nature!', es: '¡Cada animal es único e importante para la naturaleza!' },
  ],
  '2-u3': [
    { en: 'On Saturday morning, Ben and Sofia have a picnic in the park.', es: 'El sábado por la mañana, Ben y Sofía hacen un picnic en el parque.' },
    { en: 'Sofia opens the basket and smiles: "I like red apples and sweet bananas! They give me energy to run."', es: 'Sofía abre la canasta y sonríe: "¡Me gustan las manzanas rojas y los plátanos dulces! Me dan energía para correr".' },
    { en: 'Ben says: "I like cold water and fresh milk, but I don\'t like soda because it has too much sugar."', es: 'Ben dice: "Me gusta el agua fría y la leche fresca, pero no me gusta la bebida gaseosa porque tiene demasiada azúcar".' },
    { en: 'They share strawberries, carrots and whole wheat sandwiches.', es: 'Comparten frutillas, zanahorias y sándwiches de pan integral.' },
    { en: 'Eating fruits and vegetables every day keeps our body happy and strong!', es: '¡Comer frutas y verduras todos los días mantiene nuestro cuerpo alegre y fuerte!' },
  ],
  '2-u4': [
    { en: 'Today in Santiago it is very sunny and hot!', es: '¡Hoy en Santiago está muy soleado y caluroso!' },
    { en: 'Lucas is wearing a yellow T-shirt, blue shorts and a sun hat to protect his face.', es: 'Lucas viste una polera amarilla, shorts azules y un gorro de sol para proteger su rostro.' },
    { en: 'But in Puerto Montt in the south, it is rainy and cold.', es: 'Pero en Puerto Montt en el sur, está lluvioso y frío.' },
    { en: "Lucas's cousin, Camila, wears a warm jacket, wool socks and yellow rain boots.", es: 'La prima de Lucas, Camila, viste una chaqueta abrigada, calcetines de lana y botas de agua amarillas.' },
    { en: "She carries an umbrella so she doesn't get wet.", es: 'Lleva un paraguas para no mojarse.' },
    { en: 'Choosing the right clothes helps us stay comfortable in any weather!', es: '¡Elegir la ropa adecuada nos ayuda a estar cómodos con cualquier clima!' },
  ],

  // -------------------------------------------------------------------------
  // 3° BÁSICO
  // -------------------------------------------------------------------------
  '3-u1': [
    { en: 'Hello everyone! My name is Diego.', es: '¡Hola a todos! Mi nombre es Diego.' },
    { en: 'I am eight years old and I live in Antofagasta, near the Pacific Ocean.', es: 'Tengo ocho años y vivo en Antofagasta, cerca del Océano Pacífico.' },
    { en: 'My birthday is in September, the month of Chilean Independence!', es: '¡Mi cumpleaños es en septiembre, el mes de la Independencia de Chile!' },
    { en: 'On Mondays and Wednesdays, I go to swimming practice; I feel excited and energized.', es: 'Los lunes y miércoles voy a práctica de natación; me siento emocionado y con energía.' },
    { en: 'On Fridays after school, I feel relaxed and happy because the weekend is coming.', es: 'Los viernes después de clases me siento relajado y contento porque viene el fin de semana.' },
    { en: 'When I face a difficult math problem, I take a deep breath and stay calm.', es: 'Cuando enfrento un problema difícil de matemática, respiro hondo y mantengo la calma.' },
    { en: 'Being positive helps me learn better every day.', es: 'Ser positivo me ayuda a aprender mejor cada día.' },
  ],
  '3-u2': [
    { en: 'Our neighborhood is a friendly and peaceful place.', es: 'Nuestro barrio es un lugar amigable y tranquilo.' },
    { en: 'In the main square, there is a big green park with swings and benches.', es: 'En la plaza principal hay un gran parque verde con columpios y bancas.' },
    { en: 'Next to the park, there is the public library where we borrow storybooks.', es: 'Junto al parque está la biblioteca pública donde pedimos libros de cuentos.' },
    { en: 'Opposite the library, you can find the bakery; every morning it smells like fresh warm bread.', es: 'Frente a la biblioteca se encuentra la panadería; cada mañana huele a pan recién horneado.' },
    { en: 'The hospital is two blocks away, keeping everyone safe.', es: 'El hospital está a dos cuadras, cuidando a toda la comunidad.' },
    { en: 'My school is between the post office and the community garden.', es: 'Mi escuela está entre el correo y el huerto comunitario.' },
    { en: 'I love walking around my town with my family!', es: '¡Me encanta pasear por mi ciudad con mi familia!' },
  ],
  '3-u3': [
    { en: 'Next Friday our school will celebrate the Annual Talent Show!', es: '¡El próximo viernes nuestra escuela celebrará el Festival Anual de Talentos!' },
    { en: 'Everyone is practicing their special abilities.', es: 'Todos están practicando sus habilidades especiales.' },
    { en: 'Valentina says: "I can play the acoustic guitar and sing Chilean folk songs."', es: 'Valentina dice: "Puedo tocar la guitarra acústica y cantar canciones tradicionales chilenas".' },
    { en: 'Martin says: "I can juggle three balls and do funny tricks!"', es: 'Martín dice: "¡Puedo hacer malabares con tres pelotas y hacer trucos divertidos!"' },
    { en: 'Gabriel adds: "I can\'t sing, but I can run very fast and play soccer like a champion."', es: 'Gabriel agrega: "No puedo cantar, pero puedo correr muy rápido y jugar fútbol como un campeón".' },
    { en: 'We all have different talents.', es: 'Todos tenemos talentos diferentes.' },
    { en: 'When we practice with perseverance, we can improve our skills and have a wonderful time together.', es: 'Cuando practicamos con perseverancia, mejoramos nuestras destrezas y lo pasamos maravilloso juntos.' },
  ],
  '3-u4': [
    { en: 'Chile is a long and narrow country where each season brings magic.', es: 'Chile es un país largo y angosto donde cada estación trae magia.' },
    { en: 'In Summer (December to February), the sun shines bright on the Pacific beaches and the Atacama Desert.', es: 'En Verano (diciembre a febrero), el sol brilla radiante en las playas del Pacífico y en el Desierto de Atacama.' },
    { en: 'In Autumn (March to May), the leaves turn golden, red and brown in the southern vineyards.', es: 'En Otoño (marzo a mayo), las hojas se vuelven doradas, rojas y castañas en los viñedos del sur.' },
    { en: 'In Winter (June to August), white snow covers the majestic Andes Mountains, inviting skiers and families to play.', es: 'En Invierno (junio a agosto), la nieve blanca cubre la majestuosa Cordillera de los Andes, invitando a jugar en familia.' },
    { en: 'In Spring (September to November), flowers bloom across the valleys and green meadows.', es: 'En Primavera (septiembre a noviembre), las flores florecen a lo largo de los valles y praderas verdes.' },
    { en: 'Nature in Chile is a treasure we must cherish and conserve forever!', es: '¡La naturaleza en Chile es un tesoro que debemos cuidar y proteger para siempre!' },
  ],

  // -------------------------------------------------------------------------
  // 4° BÁSICO
  // -------------------------------------------------------------------------
  '4-u1': [
    { en: 'Every morning, Lucas wakes up at seven o\'clock.', es: 'Cada mañana, Lucas se despierta a las siete en punto.' },
    { en: 'First, he makes his bed and washes his face with cool water.', es: 'Primero, hace su cama y se lava la cara con agua fresca.' },
    { en: 'At half past seven, he has a nutritious breakfast with oatmeal, sliced kiwi and a glass of milk.', es: 'A las siete y media, toma un desayuno nutritivo con avena, kiwi en rodajas y un vaso de leche.' },
    { en: 'At eight o\'clock sharp, his morning classes begin at school.', es: 'A las ocho en punto comienzan sus clases en la escuela.' },
    { en: 'In the afternoon at four o\'clock, Lucas plays basketball with his friends in the school yard.', es: 'En la tarde a las cuatro en punto, Lucas juega básquetbol con sus amigos en el patio de la escuela.' },
    { en: 'After that, he does his homework and reads twenty pages of an adventure book.', es: 'Después de eso, hace sus tareas y lee veinte páginas de un libro de aventuras.' },
    { en: 'Finally, at nine o\'clock, he brushes his teeth and goes to sleep.', es: 'Finalmente, a las nueve en punto, se lava los dientes y se va a dormir.' },
    { en: 'Maintaining an organized schedule gives him energy and peace of mind.', es: 'Mantener un horario ordenado le da energía y tranquilidad.' },
  ],
  '4-u2': [
    { en: 'Every day, dedicated workers build a safe and prosperous community.', es: 'Cada día, trabajadoras y trabajadores dedicados construyen una comunidad segura y próspera.' },
    { en: 'Dr. Ramirez is a pediatrician; she works at the city hospital helping sick children recover their smiles.', es: 'La Dra. Ramírez es pediatra; trabaja en el hospital de la ciudad ayudando a niños enfermos a recuperar su sonrisa.' },
    { en: 'Mr. Soto is a brave volunteer firefighter (bombero); he extinguishes fires and rescues people from emergencies.', es: 'El Sr. Soto es un valiente bombero voluntario; apaga incendios y rescata personas de emergencias.' },
    { en: 'Miss Andrea is a passionate science teacher who inspires students to love nature and experiment in the lab.', es: 'La señorita Andrea es una profesora de ciencias apasionada que inspira a sus estudiantes a amar la naturaleza.' },
    { en: 'And Don Carlos is a vet (veterinarian) who cares for domestic pets and injured wild animals.', es: 'Y Don Carlos es un veterinario que cuida mascotas del hogar y animales silvestres heridos.' },
    { en: 'When we grow up, our work will also help our country thrive!', es: '¡Cuando seamos grandes, nuestro trabajo también ayudará a que nuestro país prospere!' },
  ],
  '4-u3': [
    { en: 'On Saturday morning, Felipe accompanies his mother to the local farmers market (feria libre).', es: 'El sábado por la mañana, Felipe acompaña a su madre a la feria libre.' },
    { en: 'The stalls are filled with vibrant fresh produce: crunchy lettuce, juicy tomatoes, sweet strawberries and golden avocados.', es: 'Los puestos están repletos de frutas y verduras frescas: lechuga crujiente, tomates jugosos, frutillas dulces y paltas doradas.' },
    { en: 'Felipe asks a friendly vendor: "Good morning! How much is one kilo of sweet oranges?"', es: 'Felipe le pregunta a un amable casero: "¡Buenos días! ¿Cuánto vale el kilo de naranjas dulces?"' },
    { en: 'The vendor replies: "It is one thousand pesos, my boy."', es: 'El vendedor responde: "Cuesta mil pesos, jovencito".' },
    { en: 'Felipe pays with exact coins and places the oranges in a reusable cloth bag.', es: 'Felipe paga con monedas exactas y guarda las naranjas en una bolsa de tela reutilizable.' },
    { en: 'His mother explains that using cloth bags instead of plastic protects our rivers and reduces waste.', es: 'Su madre explica que usar bolsas de tela en vez de plástico protege nuestros ríos y reduce la basura.' },
  ],
  '4-u4': [
    { en: 'Dear Penpal, Greetings from Chile!', es: 'Querido amigo por correspondencia, ¡saludos desde Chile!' },
    { en: 'Last summer, my family travelled across this wonderful country.', es: 'El verano pasado, mi familia viajó por este maravilloso país.' },
    { en: 'In the north, we visited the Atacama Desert; at night, the starry sky looked like a diamond blanket!', es: 'En el norte visitamos el Desierto de Atacama; ¡de noche, el cielo estrellado parecía un manto de diamantes!' },
    { en: 'Then we flew south to Chiloé Island, famous for its colorful wooden stilt houses (palafitos) and mystical legends.', es: 'Luego volamos al sur a la Isla de Chiloé, famosa por sus coloridos palafitos de madera y leyendas mágicas.' },
    { en: 'Finally, we sailed in a catamaran near the blue glaciers of Patagonia, where we saw sea lions and black-necked swans playing in the pristine waters.', es: 'Finalmente navegamos en catamarán cerca de los glaciares de la Patagonia, donde vimos lobos marinos y cisnes de cuello negro en aguas puras.' },
    { en: 'Chile has diverse landscapes that leave you breathless.', es: 'Chile tiene paisajes tan diversos que te dejan sin aliento.' },
    { en: 'I hope you can visit us soon!', es: '¡Espero que puedas visitarnos pronto!' },
  ],
};

/**
 * Obtiene las líneas bilingües para un texto dado.
 * Si coincide con alguna unidad oficial, entrega la traducción curada exacta.
 * Si es un texto personalizado, separa por oraciones para mantener formato limpio.
 */
export function getBilingualLinesForText(text: string): BilingualLine[] {
  const trimmed = text.trim();

  // Buscar coincidencia por fragmento en unidades oficiales
  for (const key of Object.keys(INGLES_UNIT_TRANSLATIONS)) {
    const list = INGLES_UNIT_TRANSLATIONS[key];
    if (list.length > 0) {
      const firstEn = list[0].en;
      if (trimmed.includes(firstEn.slice(0, 20))) {
        return list;
      }
    }
  }

  // Fallback para textos editados manualmente: dividir limpiamente por puntos o saltos
  const parts = trimmed
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return parts.map((part) => ({
    en: part,
    es: '', // Texto original
  }));
}
