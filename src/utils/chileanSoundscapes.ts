// Motor de Paisajes Sonoros Naturales de Chile usando Web Audio API nativo
// Genera ambientes relajantes de los ecosistemas de la fauna chilena sin depender de archivos externos

export type SoundscapeBiome = 'bosque' | 'oceano' | 'cordillera' | 'quebrada' | 'humedal';

export interface SoundscapePreset {
  id: SoundscapeBiome;
  nombre: string;
  subtitulo: string;
  animalRelacionado: string;
  emoji: string;
  descripcion: string;
  color: string;
  textColor: string;
}

export const SOUNDSCAPE_PRESETS: Record<SoundscapeBiome, SoundscapePreset> = {
  bosque: {
    id: 'bosque',
    nombre: 'Bosque Lluvioso del Sur',
    subtitulo: 'Hábitat del Pudú en Chiloé y Valdivia',
    animalRelacionado: 'Pudú',
    emoji: '🌲',
    descripcion: 'Brisa suave entre robles, gotas de lluvia sobre hojas y tímido trino de chucao.',
    color: 'bg-amber-600',
    textColor: 'text-amber-800',
  },
  oceano: {
    id: 'oceano',
    nombre: 'Océano Austral y Costa',
    subtitulo: 'Hábitat del Pingüino de Humboldt',
    animalRelacionado: 'Pingüino',
    emoji: '🌊',
    descripcion: 'Calmado vaivén de olas marinas rompiendo suavemente en la orilla rocosa.',
    color: 'bg-teal-600',
    textColor: 'text-teal-800',
  },
  cordillera: {
    id: 'cordillera',
    nombre: 'Viento de Altas Cumbres',
    subtitulo: 'Hábitat del Cóndor en los Andes',
    animalRelacionado: 'Cóndor',
    emoji: '🏔️',
    descripcion: 'Brisa fresca y serena que silba entre los macizos nevados de la cordillera.',
    color: 'bg-blue-600',
    textColor: 'text-blue-800',
  },
  quebrada: {
    id: 'quebrada',
    nombre: 'Quebrada Esclerófila',
    subtitulo: 'Hábitat del Puma en la zona central',
    animalRelacionado: 'Puma',
    emoji: '🌿',
    descripcion: 'Viento tibio entre matorrales nativos, ramas secas y grillos al atardecer.',
    color: 'bg-emerald-600',
    textColor: 'text-emerald-800',
  },
  humedal: {
    id: 'humedal',
    nombre: 'Arroyo y Humedal Nativo',
    subtitulo: 'Hábitat de la Ranita de Darwin',
    animalRelacionado: 'Ranita',
    emoji: '💧',
    descripcion: 'Corriente cristalina de agua fluyendo entre piedras y ecos anfibios suaves.',
    color: 'bg-indigo-600',
    textColor: 'text-indigo-800',
  },
};

class ChileanSoundscapesEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isRunning: boolean = false;
  private currentBiome: SoundscapeBiome = 'bosque';
  private currentVolume: number = 0.4; // 0.0 a 1.0

  // Nodos activos
  private activeSources: { stop: () => void }[] = [];
  private periodicInterval: any = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Genera un buffer de ruido rosa/marrón looping de 4 segundos
  private createNoiseBuffer(ctx: AudioContext, type: 'pink' | 'brown' | 'white' = 'pink'): AudioBuffer {
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    if (type === 'white') {
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
    } else if (type === 'pink') {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }
    } else {
      // Brown
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // Gain compensation
      }
    }

    return buffer;
  }

  // Inicia la reproducción de un paisaje sonoro
  public start(biome: SoundscapeBiome = 'bosque', volume?: number) {
    const ctx = this.getContext();
    if (!ctx) return;

    if (volume !== undefined) {
      this.currentVolume = Math.max(0, Math.min(1, volume));
    }

    this.stop(); // Detener cualquier sonido previo
    this.currentBiome = biome;
    this.isRunning = true;

    // Crear master gain
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.001, ctx.currentTime);
    master.gain.exponentialRampToValueAtTime(Math.max(0.01, this.currentVolume), ctx.currentTime + 1.2);
    master.connect(ctx.destination);
    this.masterGain = master;

    // Construir los sintetizadores específicos para cada ecosistema chileno
    switch (biome) {
      case 'bosque':
        this.synthesizeRainforest(ctx, master);
        break;
      case 'oceano':
        this.synthesizeOceanWaves(ctx, master);
        break;
      case 'cordillera':
        this.synthesizeMountainWind(ctx, master);
        break;
      case 'quebrada':
        this.synthesizeSclerophyllCreek(ctx, master);
        break;
      case 'humedal':
        this.synthesizeWetlandStream(ctx, master);
        break;
    }
  }

  // 1. Bosque Lluvioso del Sur (Pudú)
  private synthesizeRainforest(ctx: AudioContext, master: GainNode) {
    // Viento suave en follaje (Ruido rosa filtrado paso banda suave)
    const noiseBuffer = this.createNoiseBuffer(ctx, 'pink');
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);

    // LFO que modula suavemente el viento
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.15, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(180, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const leafGain = ctx.createGain();
    leafGain.gain.setValueAtTime(0.18, ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(leafGain);
    leafGain.connect(master);

    noiseSource.start();
    lfo.start();

    this.activeSources.push({
      stop: () => {
        try {
          noiseSource.stop();
          lfo.stop();
        } catch {}
      },
    });

    // Pequeñas gotas aleatorias sobre hojas (resonat plinks)
    this.periodicInterval = setInterval(() => {
      if (!this.isRunning) return;
      if (Math.random() < 0.65) {
        this.triggerRaindrop(ctx, master);
      }
      // Ocasional canto suave de ave nativa (Chucao)
      if (Math.random() < 0.15) {
        this.triggerChucaoChirp(ctx, master);
      }
    }, 450);
  }

  // 2. Océano Austral y Costa (Pingüino)
  private synthesizeOceanWaves(ctx: AudioContext, master: GainNode) {
    const noiseBuffer = this.createNoiseBuffer(ctx, 'brown');
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Filtro modulado para crear el vaivén de la ola (0.12 Hz ~ 8 segundos por ciclo)
    const waveFilter = ctx.createBiquadFilter();
    waveFilter.type = 'lowpass';
    waveFilter.frequency.setValueAtTime(320, ctx.currentTime);
    waveFilter.Q.setValueAtTime(2.5, ctx.currentTime);

    const waveLfo = ctx.createOscillator();
    waveLfo.type = 'sine';
    waveLfo.frequency.setValueAtTime(0.12, ctx.currentTime);

    const waveLfoGain = ctx.createGain();
    waveLfoGain.gain.setValueAtTime(280, ctx.currentTime);
    waveLfo.connect(waveLfoGain);
    waveLfoGain.connect(waveFilter.frequency);

    // Modulación de volumen de la ola (crece y se retira)
    const waveAmpLfo = ctx.createOscillator();
    waveAmpLfo.type = 'sine';
    waveAmpLfo.frequency.setValueAtTime(0.12, ctx.currentTime);

    const waveAmpGain = ctx.createGain();
    waveAmpGain.gain.setValueAtTime(0.2, ctx.currentTime);
    waveAmpLfo.connect(waveAmpGain);

    const mainWaveGain = ctx.createGain();
    mainWaveGain.gain.setValueAtTime(0.25, ctx.currentTime);

    noiseSource.connect(waveFilter);
    waveFilter.connect(mainWaveGain);
    mainWaveGain.connect(master);

    noiseSource.start();
    waveLfo.start();
    waveAmpLfo.start();

    this.activeSources.push({
      stop: () => {
        try {
          noiseSource.stop();
          waveLfo.stop();
          waveAmpLfo.stop();
        } catch {}
      },
    });

    // Ocasional salpicadura de espuma
    this.periodicInterval = setInterval(() => {
      if (!this.isRunning) return;
      if (Math.random() < 0.25) {
        this.triggerSeaFoam(ctx, master);
      }
    }, 2500);
  }

  // 3. Viento de Altas Cumbres (Cóndor)
  private synthesizeMountainWind(ctx: AudioContext, master: GainNode) {
    const noiseBuffer = this.createNoiseBuffer(ctx, 'pink');
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Filtro pasa banda resonante para el silbido cordillerano
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(500, ctx.currentTime);
    windFilter.Q.setValueAtTime(4.0, ctx.currentTime);

    const windLfo = ctx.createOscillator();
    windLfo.type = 'sine';
    windLfo.frequency.setValueAtTime(0.09, ctx.currentTime); // Ráfagas lentas

    const windLfoGain = ctx.createGain();
    windLfoGain.gain.setValueAtTime(350, ctx.currentTime);
    windLfo.connect(windLfoGain);
    windLfoGain.connect(windFilter.frequency);

    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.28, ctx.currentTime);

    noiseSource.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(master);

    noiseSource.start();
    windLfo.start();

    this.activeSources.push({
      stop: () => {
        try {
          noiseSource.stop();
          windLfo.stop();
        } catch {}
      },
    });
  }

  // 4. Quebrada Esclerófila (Puma)
  private synthesizeSclerophyllCreek(ctx: AudioContext, master: GainNode) {
    const noiseBuffer = this.createNoiseBuffer(ctx, 'pink');
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const breezeFilter = ctx.createBiquadFilter();
    breezeFilter.type = 'lowpass';
    breezeFilter.frequency.setValueAtTime(350, ctx.currentTime);

    const breezeGain = ctx.createGain();
    breezeGain.gain.setValueAtTime(0.14, ctx.currentTime);

    noiseSource.connect(breezeFilter);
    breezeFilter.connect(breezeGain);
    breezeGain.connect(master);

    noiseSource.start();

    this.activeSources.push({
      stop: () => {
        try {
          noiseSource.stop();
        } catch {}
      },
    });

    // Grillos suaves nocturnos periódicos
    this.periodicInterval = setInterval(() => {
      if (!this.isRunning) return;
      if (Math.random() < 0.4) {
        this.triggerCricketChirp(ctx, master);
      }
    }, 1800);
  }

  // 5. Arroyo y Humedal Nativo (Ranita)
  private synthesizeWetlandStream(ctx: AudioContext, master: GainNode) {
    const noiseBuffer = this.createNoiseBuffer(ctx, 'white');
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Agua corriendo: filtro pasa banda dinámico
    const streamFilter = ctx.createBiquadFilter();
    streamFilter.type = 'bandpass';
    streamFilter.frequency.setValueAtTime(800, ctx.currentTime);
    streamFilter.Q.setValueAtTime(1.8, ctx.currentTime);

    const waterLfo = ctx.createOscillator();
    waterLfo.frequency.setValueAtTime(0.35, ctx.currentTime);
    const waterLfoGain = ctx.createGain();
    waterLfoGain.gain.setValueAtTime(250, ctx.currentTime);
    waterLfo.connect(waterLfoGain);
    waterLfoGain.connect(streamFilter.frequency);

    const streamGain = ctx.createGain();
    streamGain.gain.setValueAtTime(0.12, ctx.currentTime);

    noiseSource.connect(streamFilter);
    streamFilter.connect(streamGain);
    streamGain.connect(master);

    noiseSource.start();
    waterLfo.start();

    this.activeSources.push({
      stop: () => {
        try {
          noiseSource.stop();
          waterLfo.stop();
        } catch {}
      },
    });

    // Gotitas de agua y burbujeo suave
    this.periodicInterval = setInterval(() => {
      if (!this.isRunning) return;
      if (Math.random() < 0.7) {
        this.triggerWaterBubble(ctx, master);
      }
    }, 380);
  }

  // Micro-efectos complementarios
  private triggerRaindrop(ctx: AudioContext, target: GainNode) {
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const freq = 1200 + Math.random() * 1400;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.7, now + 0.05);

      gain.gain.setValueAtTime(0.025 + Math.random() * 0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(target);
      osc.start(now);
      osc.stop(now + 0.065);
    } catch {}
  }

  private triggerChucaoChirp(ctx: AudioContext, target: GainNode) {
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      // Trino suave ascendente y descendente
      osc.frequency.setValueAtTime(2200, now);
      osc.frequency.exponentialRampToValueAtTime(3100, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(2400, now + 0.16);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.04, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

      osc.connect(gain);
      gain.connect(target);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch {}
  }

  private triggerSeaFoam(ctx: AudioContext, target: GainNode) {
    try {
      const now = ctx.currentTime;
      const buffer = this.createNoiseBuffer(ctx, 'white');
      const src = ctx.createBufferSource();
      src.buffer = buffer;

      const f = ctx.createBiquadFilter();
      f.type = 'highpass';
      f.frequency.setValueAtTime(1400, now);

      const g = ctx.createGain();
      g.gain.setValueAtTime(0.001, now);
      g.gain.exponentialRampToValueAtTime(0.03, now + 0.3);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      src.connect(f);
      f.connect(g);
      g.connect(target);
      src.start(now);
      src.stop(now + 1.3);
    } catch {}
  }

  private triggerWaterBubble(ctx: AudioContext, target: GainNode) {
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startF = 450 + Math.random() * 300;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(startF, now);
      osc.frequency.exponentialRampToValueAtTime(startF * 1.8, now + 0.07);

      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.connect(gain);
      gain.connect(target);
      osc.start(now);
      osc.stop(now + 0.085);
    } catch {}
  }

  private triggerCricketChirp(ctx: AudioContext, target: GainNode) {
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(4500, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.015, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      osc.connect(gain);
      gain.connect(target);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch {}
  }

  public setVolume(volume: number) {
    this.currentVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
      } catch {}
    }
  }

  public getVolume(): number {
    return this.currentVolume;
  }

  public getBiome(): SoundscapeBiome {
    return this.currentBiome;
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }

  public stop() {
    this.isRunning = false;
    if (this.periodicInterval) {
      clearInterval(this.periodicInterval);
      this.periodicInterval = null;
    }

    this.activeSources.forEach((src) => {
      try {
        src.stop();
      } catch {}
    });
    this.activeSources = [];

    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
      } catch {}
    }
    this.masterGain = null;
  }
}

export const chileanSoundscapes = new ChileanSoundscapesEngine();
