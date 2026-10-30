/* Sonidos de la interfaz, sintetizados en el navegador con Web Audio
   (sin archivos: nada que descargar ni derechos que pedir).
   · clic: «tic» corto y cálido, al estilo de los sistemas de los 2000
   · abrir ventana: ola suave de aire + dos notas de cristal
   · cerrar / minimizar: la ola a la inversa, más discreta
   · hilo musical: pad ambiental generativo con campanitas, apagado por defecto */
import { useSyncExternalStore } from 'react';

const read = (k: string, d: boolean) => { try { const v = localStorage.getItem(k); return v === null ? d : v === '1'; } catch { return d; } };
const write = (k: string, v: boolean) => { try { localStorage.setItem(k, v ? '1' : '0'); } catch { /* sin almacenamiento */ } };

let fxOn = read('pg-sfx', true);
let musicOn = false;                     // la música nunca arranca sola
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());

let ctx: AudioContext | null = null;
let out: GainNode, fxBus: GainNode, musicBus: GainNode, verb: ConvolverNode, noiseBuf: AudioBuffer;

function ac() {
  if (!ctx) {
    // sin gesto previo del usuario el navegador no deja sonar: ni lo intentamos
    const ua = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation;
    if (ua && !ua.hasBeenActive) return null;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    out = ctx.createGain(); out.gain.value = 0.75; out.connect(ctx.destination);
    fxBus = ctx.createGain(); fxBus.gain.value = 1; fxBus.connect(out);
    musicBus = ctx.createGain(); musicBus.gain.value = 0; musicBus.connect(out);
    // reverb: respuesta al impulso de ruido que decae (sala amplia y suave)
    const len = ctx.sampleRate * 2.4;
    const ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
    }
    verb = ctx.createConvolver(); verb.buffer = ir;
    const vg = ctx.createGain(); vg.gain.value = 0.35; verb.connect(vg); vg.connect(out);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const n = noiseBuf.getChannelData(0);
    for (let i = 0; i < n.length; i++) n[i] = Math.random() * 2 - 1;
    document.addEventListener('visibilitychange', () => {
      if (!ctx) return;
      if (document.hidden) ctx.suspend(); else ctx.resume();
    });
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

const env = (g: GainNode, t: number, peak: number, a: number, d: number) => {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + a);
  g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
};

function tone(type: OscillatorType, f0: number, f1: number, t: number, peak: number, a: number, d: number, wet = 0, dest?: AudioNode) {
  const c = ctx!;
  const o = c.createOscillator(); o.type = type;
  o.frequency.setValueAtTime(f0, t);
  if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + a + d * 0.6);
  const g = c.createGain(); env(g, t, peak, a, d);
  o.connect(g); g.connect(dest ?? fxBus);
  if (wet) { const w = c.createGain(); w.gain.value = wet; g.connect(w); w.connect(verb); }
  o.start(t); o.stop(t + a + d + 0.05);
}

function swoosh(t: number, from: number, to: number, dur: number, peak: number) {
  const c = ctx!;
  const s = c.createBufferSource(); s.buffer = noiseBuf;
  const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 0.9;
  bp.frequency.setValueAtTime(from, t); bp.frequency.exponentialRampToValueAtTime(to, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + dur * 0.4);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(bp); bp.connect(g); g.connect(fxBus);
  const w = c.createGain(); w.gain.value = 0.5; g.connect(w); w.connect(verb);
  s.start(t); s.stop(t + dur + 0.05);
}

let lastClick = 0;
/* chasquido de ratón: transitorio de ruido filtrado + «cuerpo» de plástico muy corto */
function tick(t: number, band: number, peak: number, body: number) {
  const c = ctx!;
  const s = c.createBufferSource(); s.buffer = noiseBuf;
  const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = band; bp.Q.value = 2.5;
  const g = c.createGain(); env(g, t, peak, 0.0008, 0.011);
  s.connect(bp); bp.connect(g); g.connect(fxBus); s.start(t, Math.random() * 0.5); s.stop(t + 0.03);
  tone('sine', body, body * 0.7, t, peak * 0.45, 0.0008, 0.016);
}
export const sfx = {
  /** al pulsar */
  click() {
    if (!fxOn || !ac()) return;
    const t = ctx!.currentTime;
    if (t - lastClick < 0.04) return;
    lastClick = t;
    tick(t, 2600, 0.22, 1650);
  },
  /** al soltar: más agudo y flojo */
  release() {
    if (!fxOn || !ctx || ctx.currentTime - lastClick > 1.5) return;
    tick(Math.max(ctx.currentTime, lastClick + 0.045), 3700, 0.11, 2300);
  },
  open() {
    if (!fxOn || !ac()) return;
    const t = ctx!.currentTime + 0.02;
    swoosh(t, 260, 2400, 0.6, 0.18);
    tone('sine', 880, 900, t + 0.12, 0.07, 0.01, 0.9, 0.8);       // La5
    tone('sine', 1318.5, 1330, t + 0.2, 0.055, 0.01, 1.1, 0.9);    // Mi6
  },
  close() {
    if (!fxOn || !ac()) return;
    const t = ctx!.currentTime + 0.01;
    swoosh(t, 2000, 300, 0.4, 0.11);
    tone('sine', 987.8, 960, t + 0.05, 0.03, 0.01, 0.6, 0.7);
  },
  min() {
    if (!fxOn || !ac()) return;
    const t = ctx!.currentTime;
    tone('sine', 760, 380, t, 0.05, 0.005, 0.16, 0.3);
  },
};

/* ── hilo musical ── */
const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12);
const chords = [
  [48, 55, 64, 71, 74],  // Cmaj9
  [45, 52, 60, 67, 71],  // Am9
  [41, 53, 57, 64, 67],  // Fmaj9
  [43, 50, 59, 64, 69],  // G6/9
];
const bells = [72, 74, 76, 79, 81, 84, 86, 88];   // pentatónica de Do
let timers: number[] = [];
let step = 0;

function pad(notes: number[], t: number, len: number) {
  const c = ctx!;
  const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900; lp.Q.value = 0.4;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.06, t + 3);
  g.gain.setValueAtTime(0.06, t + len - 1);
  g.gain.exponentialRampToValueAtTime(0.0001, t + len + 3);
  lp.connect(g); g.connect(musicBus);
  const w = c.createGain(); w.gain.value = 0.6; g.connect(w); w.connect(verb);
  for (const m of notes) for (const det of [-5, 5]) {
    const o = c.createOscillator(); o.type = 'triangle';
    o.frequency.value = mtof(m); o.detune.value = det;
    o.connect(lp); o.start(t); o.stop(t + len + 3.2);
  }
}

function bell(t: number) {
  const c = ctx!;
  const m = bells[Math.floor(Math.random() * bells.length)];
  const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = mtof(m);
  const g = c.createGain(); env(g, t, 0.05, 0.005, 2.6);
  o.connect(g); g.connect(musicBus);
  const w = c.createGain(); w.gain.value = 1.1; g.connect(w); w.connect(verb);
  o.start(t); o.stop(t + 2.7);
}

function schedule() {
  if (!musicOn || !ctx) return;
  const len = 9;
  pad(chords[step % chords.length], ctx.currentTime + 0.05, len);
  for (let k = 0; k < 3; k++) if (Math.random() < 0.8) bell(ctx.currentTime + 0.8 + Math.random() * (len - 1.5));
  step++;
  timers.push(window.setTimeout(schedule, len * 1000));
}

export function setMusic(on: boolean) {
  if (on === musicOn) return;
  musicOn = on;
  if (on && ac()) {
    musicBus.gain.cancelScheduledValues(ctx!.currentTime);
    musicBus.gain.setTargetAtTime(0.5, ctx!.currentTime, 1.2);
    schedule();
  } else if (ctx) {
    timers.forEach(clearTimeout); timers = [];
    musicBus.gain.cancelScheduledValues(ctx.currentTime);
    musicBus.gain.setTargetAtTime(0, ctx.currentTime, 0.6);
  }
  emit();
}

export function setFx(on: boolean) {
  fxOn = on; write('pg-sfx', on); emit();
  if (on) sfx.click();
}

export function useSound() {
  return useSyncExternalStore(
    (f) => { subs.add(f); return () => subs.delete(f); },
    () => (fxOn ? 1 : 0) + (musicOn ? 2 : 0),
  );
}

/* clic en cualquier botón o enlace de la página */
let wired = false;
let armed = false;
export function wireClicks() {
  if (wired) return;
  wired = true;
  document.addEventListener('pointerdown', (e) => {
    const el = (e.target as Element | null)?.closest('button, a, [role="button"], input[type="range"], label');
    if (el && !el.closest('[data-nosfx]')) { sfx.click(); armed = true; }
  }, { capture: true });
  document.addEventListener('pointerup', () => { if (armed) { armed = false; sfx.release(); } }, { capture: true });
}
