// Spanish syllabification algorithm tailored for early readers (1° and 2° Básico)
// Follows standard Spanish vowel and consonant cluster rules

const VOWELS = 'aáeéiíoóuúüAÁEÉIÍOÓUÚÜ';
const STRONG_VOWELS = 'aáeéoóAÁEÉOÓ';
const WEAK_VOWELS = 'iíuúüIÍUÚÜ';

// Consonant clusters that do not separate in Spanish
const INSEPARABLE_CLUSTERS = new Set([
  'bl', 'cl', 'fl', 'gl', 'kl', 'pl',
  'br', 'cr', 'dr', 'fr', 'gr', 'kr', 'pr', 'tr',
  'ch', 'll', 'rr'
]);

export function syllabifyWord(word: string): string[] {
  // Strip punctuation but remember it
  const match = word.match(/^([^a-zA-ZáéíóúüÁÉÍÓÚÜ]*)(.*?)([^a-zA-ZáéíóúüÁÉÍÓÚÜ]*)$/);
  if (!match) return [word];
  const [, prefix, core, suffix] = match;
  if (!core || core.length <= 3) {
    return [word];
  }

  const isVowel = (c: string) => VOWELS.includes(c);
  const isStrong = (c: string) => STRONG_VOWELS.includes(c);

  const letters = core.split('');
  const n = letters.length;
  const cuts: number[] = [];

  // Find vowel positions
  const vowelIndices: number[] = [];
  for (let i = 0; i < n; i++) {
    if (isVowel(letters[i])) {
      vowelIndices.push(i);
    }
  }

  if (vowelIndices.length <= 1) {
    return [word];
  }

  for (let vi = 0; vi < vowelIndices.length - 1; vi++) {
    const v1 = vowelIndices[vi];
    const v2 = vowelIndices[vi + 1];
    const consonantsBetween = v2 - v1 - 1;

    if (consonantsBetween === 0) {
      // Two consecutive vowels: Hiatus vs Diphthong
      const c1 = letters[v1].toLowerCase();
      const c2 = letters[v2].toLowerCase();
      const c1Accented = 'áéíóú'.includes(c1);
      const c2Accented = 'áéíóú'.includes(c2);

      // Two strong vowels always separate (hiatus)
      if (isStrong(c1) && isStrong(c2)) {
        cuts.push(v1 + 1);
      }
      // Accented weak vowel + strong vowel separates (hiatus)
      else if ((c1 === 'í' || c1 === 'ú') && isStrong(c2)) {
        cuts.push(v1 + 1);
      } else if (isStrong(c1) && (c2 === 'í' || c2 === 'ú')) {
        cuts.push(v1 + 1);
      }
      // identical vowels separate
      else if (c1 === c2) {
        cuts.push(v1 + 1);
      }
    } else if (consonantsBetween === 1) {
      // Single consonant between vowels goes with the second vowel
      cuts.push(v1 + 1);
    } else if (consonantsBetween === 2) {
      // Two consonants: check if inseparable cluster
      const cluster = (letters[v1 + 1] + letters[v1 + 2]).toLowerCase();
      if (INSEPARABLE_CLUSTERS.has(cluster)) {
        cuts.push(v1 + 1);
      } else {
        // Separates in between
        cuts.push(v1 + 2);
      }
    } else if (consonantsBetween === 3) {
      // Three consonants: usually 1 + 2 or 2 + 1
      const cluster = (letters[v1 + 2] + letters[v1 + 3]).toLowerCase();
      if (INSEPARABLE_CLUSTERS.has(cluster)) {
        cuts.push(v1 + 2);
      } else {
        cuts.push(v1 + 3);
      }
    } else {
      cuts.push(v1 + 2);
    }
  }

  // Slice core word by cuts
  const syllables: string[] = [];
  let prev = 0;
  for (const cut of cuts) {
    syllables.push(core.slice(prev, cut));
    prev = cut;
  }
  syllables.push(core.slice(prev));

  // Re-attach prefix and suffix
  if (prefix) syllables[0] = prefix + syllables[0];
  if (suffix) syllables[syllables.length - 1] = syllables[syllables.length - 1] + suffix;

  return syllables;
}

export function formatTextWithSyllables(text: string): string {
  // Replace words with hyphenated syllables for visual reading support
  return text.replace(/([a-zA-ZáéíóúüÁÉÍÓÚÜ]{3,})/g, (word) => {
    const syls = syllabifyWord(word);
    return syls.join('·');
  });
}
