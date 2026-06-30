let audioCtx = null;
let soundMuted = false;
let ambientOsc1 = null;
let ambientOsc2 = null;
let ambientGain = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  return audioCtx;
};

export const startAmbientHum = () => {
  if (soundMuted) return;
  try {
    const ctx = getAudioContext();
    if (ambientGain) return; // already active
    
    ambientGain = ctx.createGain();
    ambientGain.gain.setValueAtTime(0.012, ctx.currentTime); // extremely quiet and subtle
    
    ambientOsc1 = ctx.createOscillator();
    ambientOsc1.type = "sine";
    ambientOsc1.frequency.setValueAtTime(55, ctx.currentTime); // Low 55Hz bass
    
    ambientOsc2 = ctx.createOscillator();
    ambientOsc2.type = "triangle";
    ambientOsc2.frequency.setValueAtTime(55.3, ctx.currentTime); // Phasing offset
    
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(90, ctx.currentTime); // Remove mids/highs for a deep hum
    
    ambientOsc1.connect(filter);
    ambientOsc2.connect(filter);
    filter.connect(ambientGain);
    ambientGain.connect(ctx.destination);
    
    ambientOsc1.start();
    ambientOsc2.start();
  } catch (e) {
    console.warn("AudioContext blocked or ambient hum failed to start:", e);
  }
};

export const stopAmbientHum = () => {
  try {
    if (ambientOsc1) {
      ambientOsc1.stop();
      ambientOsc1.disconnect();
      ambientOsc1 = null;
    }
    if (ambientOsc2) {
      ambientOsc2.stop();
      ambientOsc2.disconnect();
      ambientOsc2 = null;
    }
    if (ambientGain) {
      ambientGain.disconnect();
      ambientGain = null;
    }
  } catch (e) {
    // Ignore errors
  }
};

export const toggleMute = () => {
  soundMuted = !soundMuted;
  if (soundMuted) {
    stopAmbientHum();
  } else {
    startAmbientHum();
  }
  return soundMuted;
};

export const isMuted = () => soundMuted;

// 1. Soft mechanical click tick
export const playClickSound = () => {
  if (soundMuted) return;

  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";

    osc.frequency.setValueAtTime(2000, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      1800,
      ctx.currentTime + 0.06
    );

    // Increased volume
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + 0.06
    );

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {
    console.warn("Audio Context blocked or unsupported:", e);
  }
};

// 2. Ambient ascending arpeggio notification chime
export const playLevelUpSound = () => {
  if (soundMuted) return;

  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const notes = [1046.5, 1318.51, 1567.98, 2093.0];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      // Increased volume
      gain.gain.setValueAtTime(0.0, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(
        0.15,
        now + idx * 0.06 + 0.02
      );
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + idx * 0.06 + 0.35
      );

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.35);
    });
  } catch (e) {
    console.warn("Audio Context blocked or unsupported:", e);
  }
};

// 3. Cybernetic unlock/upward frequency sweep
export const playBreakSound = () => {
  if (soundMuted) return;

  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";

    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      1800,
      ctx.currentTime + 0.12
    );

    // Increased volume
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + 0.12
    );

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {
    console.warn("Audio Context blocked or unsupported:", e);
  }
};

// 4. Futuristic digital matrix boot sound
export const playBootSound = () => {
  if (soundMuted) return;

  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // A low power hum followed by a quick crystal chime arpeggio
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(80, now);
    osc1.frequency.linearRampToValueAtTime(150, now + 0.3);
    
    gain1.gain.setValueAtTime(0.08, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.3);

    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + 0.15 + idx * 0.04);

      gain.gain.setValueAtTime(0.0, now + 0.15 + idx * 0.04);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.15 + idx * 0.04 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15 + idx * 0.04 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + 0.15 + idx * 0.04);
      osc.stop(now + 0.15 + idx * 0.04 + 0.4);
    });
  } catch (e) {
    console.warn("Audio Context blocked or unsupported:", e);
  }
};