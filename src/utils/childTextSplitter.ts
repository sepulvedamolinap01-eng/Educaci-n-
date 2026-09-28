// Child-friendly text tokenizer and Story Card splitter
// Prevents incorrect splitting on decimals (3.5), abbreviations (pág., Sr.), and numbered lists (1.)

const ABBREVIATIONS = [
  'pág\\.',
  'págs\\.',
  'sr\\.',
  'sra\\.',
  'dr\\.',
  'dra\\.',
  'ej\\.',
  'vol\\.',
  'cap\\.',
  'núm\\.',
  'num\\.',
  'aprox\\.',
  'art\\.',
  'etc\\.',
  'dept\\.',
  'av\\.',
];

export function breakIntoChildStoryCards(fullText: string): string[] {
  const cleaned = fullText.trim();
  if (!cleaned) return [''];

  // Check if text already has distinct paragraphs (e.g. 2 to 5 short paragraphs)
  const explicitParagraphs = cleaned
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  if (explicitParagraphs.length >= 2 && explicitParagraphs.length <= 6) {
    // Check if paragraphs are reasonably short (under 240 chars each)
    const allShort = explicitParagraphs.every((p) => p.length <= 260);
    if (allShort) {
      return explicitParagraphs;
    }
  }

  // Pre-process: protect decimals (e.g. 3.5 -> 3___DOT___5)
  let processed = cleaned.replace(/(\d+)\.(\d+)/g, '$1___DECIMAL___$2');

  // Protect abbreviations
  ABBREVIATIONS.forEach((abbr, idx) => {
    const regex = new RegExp(`\\b${abbr}`, 'gi');
    processed = processed.replace(regex, `___ABBR${idx}___`);
  });

  // Protect numbered lists at start of line or sentence (e.g. "1. ")
  processed = processed.replace(/(?:^|\n)(\d+)\.\s+/g, '___NUM$1___ ');

  // Split on sentence boundaries: (. ! ?) followed by whitespace and an uppercase letter, exclamation/question, or quote
  const rawSentences = processed
    .split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ¿¡"«])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  // Restore protected tokens in sentences
  const restoreTokens = (str: string): string => {
    let res = str.replace(/___DECIMAL___/g, '.');
    ABBREVIATIONS.forEach((abbr, idx) => {
      const cleanAbbr = abbr.replace(/\\\./g, '.');
      res = res.replace(new RegExp(`___ABBR${idx}___`, 'g'), cleanAbbr);
    });
    res = res.replace(/___NUM(\d+)___ /g, '$1. ');
    return res.trim();
  };

  const sentences = rawSentences.map(restoreTokens);

  if (sentences.length <= 2) {
    return [cleaned];
  }

  // Group sentences into child-sized story cards (1-2 sentences per card, target ~120-180 chars)
  const cards: string[] = [];
  let currentCard: string[] = [];
  let currentLen = 0;

  for (const sentence of sentences) {
    if (currentCard.length === 0) {
      currentCard.push(sentence);
      currentLen = sentence.length;
    } else if (currentCard.length === 1 && currentLen + sentence.length < 180) {
      currentCard.push(sentence);
      currentLen += sentence.length;
    } else {
      cards.push(currentCard.join(' '));
      currentCard = [sentence];
      currentLen = sentence.length;
    }
  }

  if (currentCard.length > 0) {
    // If the last card is tiny (e.g. < 25 chars) and there's a previous card, merge it
    if (cards.length > 0 && currentLen < 25) {
      cards[cards.length - 1] += ' ' + currentCard.join(' ');
    } else {
      cards.push(currentCard.join(' '));
    }
  }

  return cards.length > 0 ? cards : [cleaned];
}

// Finds which card index contains the clue text (parrafo_clave or hint)
export function findStoryCardIndexWithClue(cards: string[], clue?: string | null): number {
  if (!clue || !clue.trim() || cards.length === 0) return 0;
  const clueWords = clue
    .toLowerCase()
    .replace(/[^a-záéíóúñ0-9\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 3);

  if (clueWords.length === 0) return 0;

  let bestIdx = 0;
  let maxMatches = 0;

  cards.forEach((card, idx) => {
    const cardLower = card.toLowerCase();
    let matches = 0;
    clueWords.forEach((word) => {
      if (cardLower.includes(word)) matches++;
    });
    if (matches > maxMatches) {
      maxMatches = matches;
      bestIdx = idx;
    }
  });

  return bestIdx;
}
