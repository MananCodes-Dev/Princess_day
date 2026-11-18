/**
 * THE ROYAL EXPERIENCE — Procedural Web Audio Engine
 * Pure synthesized soundscapes and musical chimes via Web Audio API.
 * Requires zero external audio files, operates offline, zero CORS issues.
 */

class RoyalAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // Respect user preferences by default
    this.isPlayingAmbient = false;
    this.ambientNodes = [];
    this.masterGain = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    
    this.ctx = new AudioContextClass();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  ensureContext() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMusic() {
    this.ensureContext();
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbient();
    } else {
      this.startAmbient();
      this.playChime();
    }
    return !this.isMuted;
  }

  // Play a soft, crystalline royal chime (Pentatonic chord arpeggio)
  playChime() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    // Frequencies for a celestial pentatonic chord (D-F#-A-C#-E)
    const notes = [293.66, 369.99, 440.00, 554.37, 659.25, 880.00];
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      // Soft envelope attack and long gentle release
      noteGain.gain.setValueAtTime(0, now + idx * 0.08);
      noteGain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.03);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.8);

      osc.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.9);
    });
  }

  // Tactile wax seal crack sound (noise burst + low resonance thump)
  playSealBreak() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // 1. Low frequency thump
    const thumpOsc = this.ctx.createOscillator();
    const thumpGain = this.ctx.createGain();
    thumpOsc.type = 'triangle';
    thumpOsc.frequency.setValueAtTime(120, now);
    thumpOsc.frequency.exponentialRampToValueAtTime(30, now + 0.25);

    thumpGain.gain.setValueAtTime(0.35, now);
    thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    thumpOsc.connect(thumpGain);
    thumpGain.connect(this.masterGain);
    thumpOsc.start(now);
    thumpOsc.stop(now + 0.26);

    // 2. High snap click
    const clickOsc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    clickOsc.type = 'square';
    clickOsc.frequency.setValueAtTime(1400, now);
    clickOsc.frequency.exponentialRampToValueAtTime(200, now + 0.06);

    clickGain.gain.setValueAtTime(0.18, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    clickOsc.connect(clickGain);
    clickGain.connect(this.masterGain);
    clickOsc.start(now);
    clickOsc.stop(now + 0.07);
  }

  // Coronation fanfare: Majestic resonant golden chord
  playCoronationFanfare() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Majestic Royal Major Triad with Octaves: C4, G4, C5, E5, G5, C6
    const chord = [261.63, 392.00, 523.25, 659.25, 783.99, 1046.50];

    chord.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0, now + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.14, now + idx * 0.05 + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 3.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 3.3);
    });
  }

  // Ethereal ambient harmonic pad generator
  startAmbient() {
    if (this.isPlayingAmbient || !this.ctx) return;
    const now = this.ctx.currentTime;

    // Warm, lush harmonic drone frequencies (Root and Fifths: A2, E3, A3, C#4)
    const baseFreqs = [110, 164.81, 220, 277.18];
    this.ambientNodes = [];

    const padGain = this.ctx.createGain();
    padGain.gain.setValueAtTime(0.001, now);
    padGain.gain.linearRampToValueAtTime(0.08, now + 2.5); // Slow gentle fade-in
    padGain.connect(this.masterGain);

    // Filter to keep it warm, velvety and dreamy
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(550, now);
    filter.connect(padGain);

    baseFreqs.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      // Slight detune for rich choral texture
      osc.frequency.setValueAtTime(freq, now);
      osc.detune.setValueAtTime((i - 1.5) * 5, now);

      osc.connect(filter);
      osc.start(now);
      this.ambientNodes.push(osc);
    });

    this.ambientNodes.push(padGain);
    this.ambientNodes.push(filter);
    this.isPlayingAmbient = true;
  }

  stopAmbient() {
    if (!this.isPlayingAmbient) return;
    if (this.ctx && this.ambientNodes.length > 0) {
      const now = this.ctx.currentTime;
      const padGain = this.ambientNodes[this.ambientNodes.length - 2];
      if (padGain && padGain.gain) {
        padGain.gain.linearRampToValueAtTime(0.0001, now + 1.0);
        setTimeout(() => {
          this.ambientNodes.forEach(node => {
            if (node.stop) {
              try { node.stop(); } catch (e) {}
            }
          });
          this.ambientNodes = [];
          this.isPlayingAmbient = false;
        }, 1100);
      } else {
        this.ambientNodes = [];
        this.isPlayingAmbient = false;
      }
    }
  }
}

// Global audio engine singleton
window.royalAudio = new RoyalAudioEngine();
