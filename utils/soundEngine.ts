
import { SoundId, SoundPreset } from '../types';

export const SOUND_PRESETS: SoundPreset[] = [
  { id: 'classic', name: 'Classic Beep', description: 'Standard double digital alarm' },
  { id: 'ethereal', name: 'Nebula', description: 'Soft, rising ambient chord' },
  { id: 'cosmic', name: 'Cosmos', description: 'Futuristic sci-fi sweep' },
  { id: 'zen', name: 'Zen Gong', description: 'Deep, resonant meditation bell' },
  { id: 'digital', name: '8-Bit', description: 'Retro video game success sound' },
];

// Helper to get AudioContext
const getContext = () => {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return null;
  return new AudioContext();
};

export const playTone = (id: SoundId) => {
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  switch (id) {
    case 'classic':
      playClassic(ctx, now);
      break;
    case 'ethereal':
      playEthereal(ctx, now);
      break;
    case 'cosmic':
      playCosmic(ctx, now);
      break;
    case 'zen':
      playZen(ctx, now);
      break;
    case 'digital':
      playDigital(ctx, now);
      break;
  }
};

// --- Sound Generators ---

const playClassic = (ctx: AudioContext, t: number) => {
  // Simple Sine Wave Beep
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, t);
  osc.frequency.exponentialRampToValueAtTime(440, t + 0.1);
  
  gain.gain.setValueAtTime(0.3, t);
  gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);

  osc.start(t);
  osc.stop(t + 0.1);

  // Second beep
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.connect(gain2);
  gain2.connect(ctx.destination);

  osc2.frequency.setValueAtTime(880, t + 0.15);
  osc2.frequency.exponentialRampToValueAtTime(440, t + 0.25);
  gain2.gain.setValueAtTime(0.3, t + 0.15);
  gain2.gain.exponentialRampToValueAtTime(0.01, t + 0.25);

  osc2.start(t + 0.15);
  osc2.stop(t + 0.25);
};

const playEthereal = (ctx: AudioContext, t: number) => {
  // A Major 7 chord swell
  const freqs = [440, 554.37, 659.25, 830.61]; // A4, C#5, E5, G#5
  
  freqs.forEach((f, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'triangle';
    osc.frequency.value = f;
    
    // Slow attack, long release
    const start = t + (i * 0.05);
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.15, start + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 2.5);

    osc.start(start);
    osc.stop(start + 3);
  });
};

const playCosmic = (ctx: AudioContext, t: number) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = 'sawtooth';
  // Sweep frequency down
  osc.frequency.setValueAtTime(1200, t);
  osc.frequency.exponentialRampToValueAtTime(200, t + 0.6);

  // Tremolo effect
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 15;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 500;
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);
  lfo.start(t);

  gain.gain.setValueAtTime(0.1, t);
  gain.gain.linearRampToValueAtTime(0.05, t + 0.3);
  gain.gain.linearRampToValueAtTime(0, t + 0.6);

  osc.start(t);
  osc.stop(t + 0.6);
};

const playZen = (ctx: AudioContext, t: number) => {
  // FM Synthesis for a bell-like tone
  const carrier = ctx.createOscillator();
  const modulator = ctx.createOscillator();
  const modGain = ctx.createGain();
  const masterGain = ctx.createGain();

  modulator.connect(modGain);
  modGain.connect(carrier.frequency);
  carrier.connect(masterGain);
  masterGain.connect(ctx.destination);

  carrier.frequency.value = 200;
  modulator.frequency.value = 280; // Non-integer ratio for metallic sound
  
  modGain.gain.setValueAtTime(300, t);
  modGain.gain.exponentialRampToValueAtTime(1, t + 2);

  masterGain.gain.setValueAtTime(0, t);
  masterGain.gain.linearRampToValueAtTime(0.5, t + 0.05); // Fast attack
  masterGain.gain.exponentialRampToValueAtTime(0.001, t + 4); // Very long decay

  carrier.start(t);
  modulator.start(t);
  carrier.stop(t + 4);
  modulator.stop(t + 4);
};

const playDigital = (ctx: AudioContext, t: number) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = 'square';
  
  // Arpeggio
  osc.frequency.setValueAtTime(523.25, t); // C5
  osc.frequency.setValueAtTime(659.25, t + 0.1); // E5
  osc.frequency.setValueAtTime(783.99, t + 0.2); // G5
  osc.frequency.setValueAtTime(1046.50, t + 0.3); // C6

  gain.gain.value = 0.1;
  gain.gain.setValueAtTime(0.1, t);
  gain.gain.setValueAtTime(0, t + 0.4);

  osc.start(t);
  osc.stop(t + 0.4);
};
