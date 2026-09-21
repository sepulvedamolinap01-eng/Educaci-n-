export interface WordMatchPair {
  id: string;
  en: string;
  es: string;
  icon: string;
  phonetic?: string;
  category?: string;
}

export interface UnitVocabularySet {
  unitKey: string; // e.g. '1-u1', '1-u2', '2-u1'
  title: string;
  pairs: WordMatchPair[];
}

export const INGLES_VOCABULARY_SETS: Record<string, WordMatchPair[]> = {
  // =========================================================================
  // 1° BÁSICO (6 - 7 AÑOS) - Vocabulario básico visual y concreto
  // =========================================================================
  '1-u1': [
    { id: 'red', en: 'Red', es: 'Rojo', icon: '🔴' },
    { id: 'blue', en: 'Blue', es: 'Azul', icon: '🔵' },
    { id: 'yellow', en: 'Yellow', es: 'Amarillo', icon: '🟡' },
    { id: 'green', en: 'Green', es: 'Verde', icon: '🟢' },
    { id: 'pencil', en: 'Pencil', es: 'Lápiz', icon: '✏️' },
    { id: 'book', en: 'Book', es: 'Libro', icon: '📖' },
    { id: 'backpack', en: 'Backpack', es: 'Mochila', icon: '🎒' },
    { id: 'hello', en: 'Hello', es: 'Hola', icon: '👋' },
  ],
  '1-u2': [
    { id: 'eyes', en: 'Eyes', es: 'Ojos', icon: '👀' },
    { id: 'nose', en: 'Nose', es: 'Nariz', icon: '👃' },
    { id: 'mouth', en: 'Mouth', es: 'Boca', icon: '👄' },
    { id: 'ears', en: 'Ears', es: 'Orejas', icon: '👂' },
    { id: 'head', en: 'Head', es: 'Cabeza', icon: '👦' },
    { id: 'hands', en: 'Hands', es: 'Manos', icon: '👏' },
    { id: 'happy', en: 'Happy', es: 'Feliz', icon: '😊' },
    { id: 'water', en: 'Water', es: 'Agua', icon: '💧' },
  ],
  '1-u3': [
    { id: 'dad', en: 'Father / Dad', es: 'Papá', icon: '👨' },
    { id: 'mom', en: 'Mother / Mom', es: 'Mamá', icon: '👩' },
    { id: 'sister', en: 'Sister', es: 'Hermana', icon: '👧' },
    { id: 'brother', en: 'Brother', es: 'Hermano', icon: '👦' },
    { id: 'baby', en: 'Baby', es: 'Bebé', icon: '👶' },
    { id: 'house', en: 'House', es: 'Casa', icon: '🏠' },
    { id: 'garden', en: 'Garden', es: 'Jardín', icon: '🌸' },
    { id: 'love', en: 'Love', es: 'Amor / Cariño', icon: '❤️' },
  ],
  '1-u4': [
    { id: 'dog', en: 'Dog', es: 'Perro', icon: '🐶' },
    { id: 'cat', en: 'Cat', es: 'Gato', icon: '🐱' },
    { id: 'frog', en: 'Frog', es: 'Rana', icon: '🐸' },
    { id: 'bird', en: 'Bird', es: 'Pájaro', icon: '🐦' },
    { id: 'sun', en: 'Sun', es: 'Sol', icon: '☀️' },
    { id: 'tree', en: 'Tree', es: 'Árbol', icon: '🌳' },
    { id: 'grass', en: 'Grass', es: 'Pasto / Hierba', icon: '🌱' },
    { id: 'green', en: 'Green', es: 'Verde', icon: '🟢' },
  ],

  // =========================================================================
  // 2° BÁSICO (7 - 8 AÑOS) - Números, aula, animales chilenos, comida, ropa
  // =========================================================================
  '2-u1': [
    { id: 'one', en: 'One', es: 'Uno (1)', icon: '1️⃣' },
    { id: 'two', en: 'Two', es: 'Dos (2)', icon: '2️⃣' },
    { id: 'three', en: 'Three', es: 'Tres (3)', icon: '3️⃣' },
    { id: 'four', en: 'Four', es: 'Cuatro (4)', icon: '4️⃣' },
    { id: 'five', en: 'Five', es: 'Cinco (5)', icon: '5️⃣' },
    { id: 'student', en: 'Student', es: 'Estudiante / Alumno', icon: '🎒' },
    { id: 'teacher', en: 'Teacher', es: 'Profesor / Profesora', icon: '👩‍🏫' },
    { id: 'dance', en: 'Dance', es: 'Bailar', icon: '💃' },
  ],
  '2-u2': [
    { id: 'condor', en: 'Condor', es: 'Cóndor', icon: '🦅' },
    { id: 'puma', en: 'Puma', es: 'Puma', icon: '🐆' },
    { id: 'penguin', en: 'Penguin', es: 'Pingüino', icon: '🐧' },
    { id: 'frog', en: "Darwin's Frog", es: 'Ranita de Darwin', icon: '🐸' },
    { id: 'mountain', en: 'Mountain', es: 'Montaña', icon: '🏔️' },
    { id: 'forest', en: 'Forest', es: 'Bosque', icon: '🌲' },
    { id: 'ocean', en: 'Ocean', es: 'Océano / Mar', icon: '🌊' },
    { id: 'fish', en: 'Fish', es: 'Pez / Pescado', icon: '🐟' },
  ],
  '2-u3': [
    { id: 'apple', en: 'Apple', es: 'Manzana', icon: '🍎' },
    { id: 'banana', en: 'Banana', es: 'Plátano', icon: '🍌' },
    { id: 'water', en: 'Water', es: 'Agua', icon: '💧' },
    { id: 'milk', en: 'Milk', es: 'Leche', icon: '🥛' },
    { id: 'strawberry', en: 'Strawberry', es: 'Frutilla', icon: '🍓' },
    { id: 'carrot', en: 'Carrot', es: 'Zanahoria', icon: '🥕' },
    { id: 'sandwich', en: 'Sandwich', es: 'Sándwich', icon: '🥪' },
    { id: 'strong', en: 'Strong', es: 'Fuerte', icon: '💪' },
  ],
  '2-u4': [
    { id: 'sunny', en: 'Sunny', es: 'Soleado', icon: '☀️' },
    { id: 'rainy', en: 'Rainy', es: 'Lluvioso', icon: '🌧️' },
    { id: 'cold', en: 'Cold', es: 'Frío', icon: '❄️' },
    { id: 'hot', en: 'Hot', es: 'Caluroso', icon: '🌡️' },
    { id: 'tshirt', en: 'T-shirt', es: 'Polera', icon: '👕' },
    { id: 'shorts', en: 'Shorts', es: 'Pantalón corto', icon: '🩳' },
    { id: 'boots', en: 'Boots', es: 'Botas', icon: '👢' },
    { id: 'umbrella', en: 'Umbrella', es: 'Paraguas', icon: '☂️' },
  ],

  // =========================================================================
  // 3° BÁSICO (8 - 9 AÑOS)
  // =========================================================================
  '3-u1': [
    { id: 'birthday', en: 'Birthday', es: 'Cumpleaños', icon: '🎂' },
    { id: 'swimming', en: 'Swimming', es: 'Natación', icon: '🏊' },
    { id: 'excited', en: 'Excited', es: 'Emocionado', icon: '🤩' },
    { id: 'calm', en: 'Calm', es: 'Tranquilo / Calma', icon: '🧘' },
    { id: 'eight', en: 'Eight', es: 'Ocho (8)', icon: '8️⃣' },
    { id: 'weekend', en: 'Weekend', es: 'Fin de semana', icon: '🏖️' },
  ],
  '3-u2': [
    { id: 'park', en: 'Park', es: 'Parque', icon: '🌳' },
    { id: 'library', en: 'Library', es: 'Biblioteca', icon: '📚' },
    { id: 'bakery', en: 'Bakery', es: 'Panadería', icon: '🥖' },
    { id: 'hospital', en: 'Hospital', es: 'Hospital', icon: '🏥' },
    { id: 'school', en: 'School', es: 'Escuela / Colegio', icon: '🏫' },
    { id: 'square', en: 'Square', es: 'Plaza principal', icon: '🏛️' },
  ],
  '3-u3': [
    { id: 'guitar', en: 'Guitar', es: 'Guitarra', icon: '🎸' },
    { id: 'sing', en: 'Sing', es: 'Cantar', icon: '🎤' },
    { id: 'soccer', en: 'Soccer', es: 'Fútbol', icon: '⚽' },
    { id: 'juggle', en: 'Juggle', es: 'Hacer malabares', icon: '🤹' },
    { id: 'talent', en: 'Talent', es: 'Talento', icon: '✨' },
    { id: 'champion', en: 'Champion', es: 'Campeón', icon: '🏆' },
  ],
  '3-u4': [
    { id: 'summer', en: 'Summer', es: 'Verano', icon: '☀️' },
    { id: 'autumn', en: 'Autumn', es: 'Otoño', icon: '🍂' },
    { id: 'winter', en: 'Winter', es: 'Invierno', icon: '❄️' },
    { id: 'spring', en: 'Spring', es: 'Primavera', icon: '🌸' },
    { id: 'desert', en: 'Desert', es: 'Desierto', icon: '🏜️' },
    { id: 'snow', en: 'Snow', es: 'Nieve', icon: '⛄' },
  ],

  // =========================================================================
  // 4° BÁSICO (9 - 10 AÑOS)
  // =========================================================================
  '4-u1': [
    { id: 'morning', en: 'Morning', es: 'Mañana', icon: '🌅' },
    { id: 'breakfast', en: 'Breakfast', es: 'Desayuno', icon: '🥣' },
    { id: 'homework', en: 'Homework', es: 'Tarea escolar', icon: '📝' },
    { id: 'basketball', en: 'Basketball', es: 'Básquetbol', icon: '🏀' },
    { id: 'sleep', en: 'Sleep', es: 'Dormir', icon: '😴' },
    { id: 'clock', en: "O'clock", es: 'En punto (hora)', icon: '⏰' },
  ],
  '4-u2': [
    { id: 'doctor', en: 'Doctor', es: 'Doctora / Médico', icon: '👩‍⚕️' },
    { id: 'firefighter', en: 'Firefighter', es: 'Bombero', icon: '👨‍🚒' },
    { id: 'teacher4', en: 'Teacher', es: 'Profesora', icon: '👩‍🏫' },
    { id: 'vet', en: 'Vet (Veterinarian)', es: 'Veterinario', icon: '🩺' },
    { id: 'hospital4', en: 'Hospital', es: 'Hospital', icon: '🏥' },
    { id: 'community', en: 'Community', es: 'Comunidad', icon: '🤝' },
  ],
  '4-u3': [
    { id: 'market', en: 'Market', es: 'Feria / Mercado', icon: '🏪' },
    { id: 'orange', en: 'Orange', es: 'Naranja', icon: '🍊' },
    { id: 'tomato', en: 'Tomato', es: 'Tomate', icon: '🍅' },
    { id: 'bag', en: 'Cloth bag', es: 'Bolsa de tela', icon: '🛍️' },
    { id: 'money', en: 'Coins / Pesos', es: 'Monedas / Dinero', icon: '🪙' },
    { id: 'avocado', en: 'Avocado', es: 'Palta / Aguacate', icon: '🥑' },
  ],
  '4-u4': [
    { id: 'glacier', en: 'Glacier', es: 'Glaciar', icon: '🧊' },
    { id: 'island', en: 'Island', es: 'Isla', icon: '🏝️' },
    { id: 'travel', en: 'Travel', es: 'Viajar', icon: '✈️' },
    { id: 'stars', en: 'Starry sky', es: 'Cielo estrellado', icon: '✨' },
    { id: 'sea_lion', en: 'Sea lion', es: 'Lobo marino', icon: '🦭' },
    { id: 'catamaran', en: 'Catamaran', es: 'Catamarán / Barco', icon: '⛵' },
  ],
};

/**
 * Obtiene el set de palabras para emparejar según el nivel y número de unidad
 */
export function getVocabularyPairsForUnit(nivel: string, unitNumberOrName: string): WordMatchPair[] {
  let gradeNum = '1';
  if (nivel.includes('2')) gradeNum = '2';
  else if (nivel.includes('3')) gradeNum = '3';
  else if (nivel.includes('4')) gradeNum = '4';

  let unitNum = 'u1';
  const lower = unitNumberOrName.toLowerCase();
  if (lower.includes('2') || lower.includes('dos')) unitNum = 'u2';
  else if (lower.includes('3') || lower.includes('tres')) unitNum = 'u3';
  else if (lower.includes('4') || lower.includes('cuatro')) unitNum = 'u4';

  const key = `${gradeNum}-${unitNum}`;
  return INGLES_VOCABULARY_SETS[key] || INGLES_VOCABULARY_SETS['1-u1'];
}
