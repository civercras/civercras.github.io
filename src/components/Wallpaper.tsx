import { memo, useEffect, useRef } from 'react';

/* Fondo marino de playa: cielo arriba, línea de agua ondulada y fondo de arena
   con reflejos de luz (cáusticas) animados. Se pinta con un shader WebGL a
   media resolución; si no hay WebGL queda el degradado CSS de .wall__sky. */

const FRAG = `
precision mediump float;
uniform vec2 R;
uniform float T;
#define TAU 6.28318530718

float caustic(vec2 uv, float time) {
  vec2 p = mod(uv * TAU, TAU) - 250.0;
  vec2 i = p;
  float c = 1.0;
  float inten = .005;
  for (int n = 0; n < 5; n++) {
    float t = time * (1.0 - (3.5 / float(n + 1)));
    i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
    c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));
  }
  c /= 5.0;
  c = 1.17 - pow(c, 1.4);
  return pow(abs(c), 11.0);
}

void main() {
  vec2 f = gl_FragCoord.xy / R;
  float y = 1.0 - f.y;                       // 0 arriba, 1 abajo
  float x = (f.x - 0.5) * R.x / R.y;
  float wl = (R.y > R.x ? 0.085 : 0.215) + 0.03 * sin(x * 1.5 + T * 0.32) + 0.008 * sin(x * 4.6 - T * 0.55);
  vec3 col;

  if (y < wl) {
    // cielo
    float s = y / wl;
    col = mix(vec3(0.07, 0.31, 0.82), vec3(0.36, 0.66, 0.96), s * s);
    // cresta de la ola vista a contraluz
    col = mix(col, vec3(0.62, 0.93, 0.95), smoothstep(wl - 0.05, wl, y) * 0.55);
  } else {
    float hz = 0.44;                          // horizonte de bruma
    vec3 haze = vec3(0.22, 0.74, 0.80);
    if (y > hz) {
      // arena del fondo en perspectiva
      float d = y - hz;
      float z = 0.30 / d;
      vec2 w = vec2(x * z * 0.9, z + T * 0.02);
      float c = caustic(w * 2.6, T * 0.45);
      float c2 = caustic(w * 2.6 + 0.012, T * 0.45);   // leve aberración: borde cian
      float near = smoothstep(0.0, 0.5, d);
      vec3 sand = mix(vec3(0.20, 0.76, 0.80), vec3(0.47, 0.88, 0.87), near);
      float amt = (0.2 + 1.0 * near) * smoothstep(0.02, 0.20, d);
      col = sand + vec3(c * 0.85, c2 * 0.95 + c * 0.1, c2 + c * 0.1) * amt;
      col = mix(haze, col, clamp(d * 5.0, 0.0, 1.0));
    } else {
      // cara inferior de la superficie
      float d = hz - y;
      float z = 0.10 / max(d, 0.004);
      vec2 w = vec2(x * z * 0.9, z - T * 0.03);
      float c = caustic(w * 3.0, T * 0.35);
      vec3 under = mix(vec3(0.27, 0.80, 0.83), vec3(0.50, 0.90, 0.90), smoothstep(0.0, hz - 0.2, d));
      col = under + c * 0.22 * smoothstep(0.03, 0.14, d);
      col = mix(haze, col, clamp(d * 6.0, 0.0, 1.0));
    }
    // lente de la línea de agua: banda clara + filo blanco
    float b = y - wl;
    col = mix(col, vec3(0.50, 0.90, 0.92), exp(-b * 30.0) * 0.55);
    col += vec3(1.0) * exp(-b * 90.0) * 0.5;
  }
  gl_FragColor = vec4(col, 1.0);
}`;

const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';

function useSea(ref: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const gl = cv.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return;
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = sh(gl.VERTEX_SHADER, VERT);
    const fs = sh(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const pr = gl.createProgram()!;
    gl.attachShader(pr, vs);
    gl.attachShader(pr, fs);
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(pr, 'R');
    const uT = gl.getUniformLocation(pr, 'T');

    const scale = innerWidth < 820 ? 0.5 : 0.75;   // resolución reducida: suave y barato
    const size = () => {
      cv.width = Math.max(2, Math.round(innerWidth * scale));
      cv.height = Math.max(2, Math.round(innerHeight * scale));
      gl.viewport(0, 0, cv.width, cv.height);
    };
    size();
    addEventListener('resize', size);
    cv.classList.add('sea--on');

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, last = 0;
    const t0 = performance.now();
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (document.hidden || now - last < 33) return;     // ~30 fps
      last = now;
      gl.uniform2f(uR, cv.width, cv.height);
      gl.uniform1f(uT, still ? 12 : (now - t0) / 1000 + 12);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (still) cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', size); };
  }, [ref]);
}

const bubbles = Array.from({ length: 14 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return { left: r(1) * 100, size: 8 + r(2) * 34, dur: 14 + r(3) * 18, delay: -r(4) * 30 };
});
const clouds = [
  { top: 2, w: 200, t: 150, d: -20 }, { top: 7, w: 130, t: 120, d: -70 }, { top: 4, w: 240, t: 180, d: -120 },
  { top: 9, w: 110, t: 110, d: -40 },
];
// peces: y = altura en %, s = tamaño, t = duración del cruce, d = desfase, r = sentido
const fish = [
  { y: 58, s: 34, t: 70, d: -10, r: false }, { y: 63, s: 28, t: 82, d: -45, r: false }, { y: 55, s: 24, t: 95, d: -70, r: true },
  { y: 78, s: 58, t: 55, d: -30, r: true }, { y: 84, s: 50, t: 60, d: -5, r: false }, { y: 72, s: 42, t: 66, d: -52, r: false },
  { y: 90, s: 68, t: 50, d: -38, r: true },
];

const Fish = () => (
  <svg viewBox="0 0 64 44" aria-hidden="true">
    <path d="M50 22 L63 11 L61 22 L63 33 Z" fill="#f3d21c" />
    <path d="M4 22 C 10 6, 32 2, 50 16 L 50 28 C 32 42, 10 38, 4 22 Z" fill="#f4f7f8" />
    <path d="M17 7.5 C 15 16, 15 28, 17 36.5 L 22 37.8 C 20 28, 20 16, 22 6.2 Z" fill="#1d2430" />
    <path d="M29 4.6 C 27 14, 27 30, 29 39.4 L 34 38.6 C 32 30, 32 14, 34 5.4 Z" fill="#1d2430" />
    <path d="M42 10 C 41 17, 41 27, 42 34 L 50 28 L 50 16 Z" fill="#f3d21c" />
    <circle cx="10" cy="19" r="2" fill="#1d2430" />
    <path d="M8 13 C 16 7, 30 6, 44 12" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="1.5" />
  </svg>
);

function WallpaperBase() {
  const cv = useRef<HTMLCanvasElement>(null);
  useSea(cv);
  return (
    <div className="wall" aria-hidden="true">
      <div className="wall__sky" />
      <canvas ref={cv} className="sea" />
      {clouds.map((c, i) => (
        <span key={i} className="cp-cloud" style={{ top: `${c.top}%`, ['--w' as string]: `${c.w}px`, ['--t' as string]: `${c.t}s`, ['--d' as string]: `${c.d}s` } as React.CSSProperties} />
      ))}
      {fish.map((f, i) => (
        <span key={i} className={`fish${f.r ? ' fish--r' : ''}`}
          style={{ top: `${f.y}%`, width: f.s, ['--t' as string]: `${f.t}s`, ['--d' as string]: `${f.d}s`, opacity: 0.55 + (f.y - 50) / 90 } as React.CSSProperties}>
          <Fish />
        </span>
      ))}
      <div className="wall__deep">
        {bubbles.map((b, i) => (
          <span key={i} className="bubble" style={{ left: `${b.left}%`, width: b.size, height: b.size, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }} />
        ))}
      </div>
    </div>
  );
}

export const Wallpaper = memo(WallpaperBase);
