// Interactive Child-Friendly Glossary for Mineduc Primary Texts (1° to 4° Básico)
// Explains vocabulary simply with examples and visual icons for universal accessibility

export interface GlossaryEntry {
  palabra: string;
  significado: string;
  ejemplo: string;
  icono: string;
}

export const CHILD_GLOSSARY: Record<string, GlossaryEntry> = {
  cururo: {
    palabra: 'Cururo',
    significado: 'Un roedor chileno pequeño y negro que vive bajo tierra en túneles.',
    ejemplo: 'El cururo cava con sus dientecitos en los campos de Chile.',
    icono: '🦔',
  },
  foye: {
    palabra: 'Foye (Canelo)',
    significado: 'Árbol sagrado mapuche, con flores blancas y hojas verdes aromáticas.',
    ejemplo: 'Bajo el foye se reúnen para cuidar la naturaleza.',
    icono: '🌳',
  },
  canelo: {
    palabra: 'Canelo',
    significado: 'Árbol sagrado del pueblo mapuche, símbolo de paz y respeto.',
    ejemplo: 'El canelo tiene hojas que perfuman el bosque sureño.',
    icono: '🍃',
  },
  coligüe: {
    palabra: 'Coligüe',
    significado: 'Una caña chilena muy resistente y flexible que crece en los bosques del sur.',
    ejemplo: 'Los niños usaron una vara de coligüe para cruzar el arroyo.',
    icono: '🎋',
  },
  chucao: {
    palabra: 'Chucao',
    significado: 'Pajarito chileno del sur que salta en el suelo del bosque con su pecho anaranjado.',
    ejemplo: 'El chucao cantó fuerte entre las ramas de los helechos.',
    icono: '🐦',
  },
  maqui: {
    palabra: 'Maqui',
    significado: 'Un arbusto chileno que da ricas frutitas moradas muy dulces y saludables.',
    ejemplo: 'Comieron maqui fresco recién cosechado del cerro.',
    icono: '🫐',
  },
  cabizbajo: {
    palabra: 'Cabizbajo',
    significado: 'Tener la cabeza inclinada hacia abajo por estar triste o preocupado.',
    ejemplo: 'El conejito caminaba cabizbajo porque no encontraba su zanahoria.',
    icono: '😔',
  },
  cálido: {
    palabra: 'Cálido',
    significado: 'Que entrega calorcito agradable, o que es muy cariñoso y acogedor.',
    ejemplo: 'El sol de la mañana nos dio un abrazo cálido.',
    icono: '☀️',
  },
  antojo: {
    palabra: 'Antojo',
    significado: 'Un deseo muy repentino y regalón de comer o hacer algo especial.',
    ejemplo: 'La abuela tuvo el antojo de comer sopaipillas calientes.',
    icono: '😋',
  },
  refugio: {
    palabra: 'Refugio',
    significado: 'Un lugar seguro donde protegerse del frío, la lluvia o el peligro.',
    ejemplo: 'La pequeña cueva fue un buen refugio para los pajaritos durante la lluvia.',
    icono: '🏡',
  },
  huella: {
    palabra: 'Huella',
    significado: 'La marca que deja un pie, una patita o una rueda en el suelo blando.',
    ejemplo: 'Vimos las huellas del pudú marcadas en el barro del sendero.',
    icono: '🐾',
  },
  picaflor: {
    palabra: 'Picaflor',
    significado: 'El ave más pequeñita de Chile, que mueve sus alas muy rápido y toma néctar de flores.',
    ejemplo: 'El picaflor de Juan Fernández voló como una flechita de colores.',
    icono: '🌸',
  },
  valiente: {
    palabra: 'Valiente',
    significado: 'Persona o animalito que actúa con ánimo frente a lo nuevo, aunque sienta miedo.',
    ejemplo: 'Matías fue muy valiente en su primer día de clases.',
    icono: '🦁',
  },
  compartir: {
    palabra: 'Compartir',
    significado: 'Dar a otros parte de lo que tenemos con alegría y amistad.',
    ejemplo: 'Compartir los lápices de colores hace feliz a todo el curso.',
    icono: '🤝',
  },
  alegría: {
    palabra: 'Alegría',
    significado: 'Sentimiento lindo que nos hace sonreír y sentir el corazón saltando de contento.',
    ejemplo: 'La llegada del gatito llenó la casa de risas y alegría.',
    icono: '⭐',
  },
};

export function findGlossaryTerms(text: string): GlossaryEntry[] {
  const found: GlossaryEntry[] = [];
  const lower = text.toLowerCase();

  for (const [key, entry] of Object.entries(CHILD_GLOSSARY)) {
    // word boundary check
    const regex = new RegExp(`\\b${key}\\w*\\b`, 'i');
    if (regex.test(lower)) {
      found.push(entry);
    }
  }

  return found;
}
