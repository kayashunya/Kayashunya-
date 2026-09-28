/**
 * Serene Meditation Bell Synthesizer using Web Audio API
 * Generates an authentic singing bowl chime at 528 Hz with warm harmonics
 */
export function playMeditationBell() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const now = ctx.currentTime;
    
    // Fundamental: 528 Hz (Solfeggio frequency associated with peace/transformation)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(528, now);
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

    // First Harmonic: 1056 Hz (pure shimmer)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1056, now);
    gain2.gain.setValueAtTime(0.12, now);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    // Deep resonance tone: 264 Hz
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(264, now);
    gain3.gain.setValueAtTime(0.18, now);
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + 4.0);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc3.connect(gain3);
    gain3.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    osc1.stop(now + 4.0);
    osc2.stop(now + 2.5);
    osc3.stop(now + 4.2);
  } catch {
    // Non-critical sound fallback
  }
}
