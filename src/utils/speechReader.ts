// Web Speech API wrapper for modern educational reading with speed control and highlighting
export interface SpeechOptions {
  rate?: number; // 0.7 to 1.2
  pitch?: number;
  lang?: string; // 'es-CL' | 'en-US' | etc.
  onBoundary?: (charIndex: number, charLength?: number) => void;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

class SpeechReader {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingState = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  isSupported(): boolean {
    return !!this.synth;
  }

  isSpeaking(): boolean {
    return this.isSpeakingState || (this.synth ? this.synth.speaking : false);
  }

  stop() {
    if (!this.synth) return;
    this.isSpeakingState = false;
    this.currentUtterance = null;
    try {
      this.synth.cancel();
    } catch {
      // Ignored
    }
  }

  pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  speak(text: string, options: SpeechOptions = {}) {
    if (!this.synth || !text) {
      options.onEnd?.();
      return;
    }

    this.stop();

    // Clean text of markdown artifacts for smooth pronunciation
    const cleanText = text
      .replace(/[*_#`~]/g, '')
      .replace(/OA\s*0?(\d+)/gi, 'Objetivo de Aprendizaje $1')
      .replace(/1°/g, 'Primero')
      .replace(/2°/g, 'Segundo')
      .replace(/3°/g, 'Tercero')
      .replace(/4°/g, 'Cuarto');

    const isEnglish = options.lang?.startsWith('en');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = isEnglish ? (options.lang || 'en-US') : 'es-CL';
    utterance.rate = options.rate ?? (isEnglish ? 0.82 : 0.85); // friendly cadence for young Chilean learners
    utterance.pitch = options.pitch ?? 1.05; // warm, encouraging tone for kids

    // Pick a voice based on selected language
    const voices = this.synth.getVoices();
    if (isEnglish) {
      const englishVoice =
        voices.find((v) => v.lang.startsWith('en-US')) ||
        voices.find((v) => v.lang.startsWith('en-GB')) ||
        voices.find((v) => v.lang.startsWith('en'));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
    } else {
      const spanishVoice =
        voices.find((v) => v.lang.startsWith('es-CL')) ||
        voices.find((v) => v.lang.startsWith('es-MX')) ||
        voices.find((v) => v.lang.startsWith('es-US')) ||
        voices.find((v) => v.lang.startsWith('es'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }
    }

    utterance.onstart = () => {
      this.isSpeakingState = true;
      options.onStart?.();
    };

    utterance.onboundary = (event) => {
      if (event.name === 'word' || event.name === 'sentence') {
        options.onBoundary?.(event.charIndex, (event as any).charLength || 5);
      }
    };

    utterance.onend = () => {
      this.isSpeakingState = false;
      this.currentUtterance = null;
      options.onEnd?.();
    };

    utterance.onerror = (e) => {
      this.isSpeakingState = false;
      this.currentUtterance = null;
      options.onError?.(e);
    };

    this.currentUtterance = utterance;
    try {
      this.synth.speak(utterance);
    } catch (e) {
      this.isSpeakingState = false;
      options.onError?.(e);
    }
  }
}

export const speechReader = new SpeechReader();
