import { memo } from 'react';

// Posiciones fijas (pseudoaleatorias) para que el fondo sea siempre igual
const bubbles = Array.from({ length: 16 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return { left: r(1) * 100, size: 14 + r(2) * 62, dur: 16 + r(3) * 22, delay: -r(4) * 30 };
});
const clouds = [
  { top: 6, w: 260, t: 140, d: -20 }, { top: 14, w: 180, t: 110, d: -70 }, { top: 24, w: 320, t: 170, d: -120 },
  { top: 10, w: 220, t: 130, d: -95 }, { top: 32, w: 160, t: 100, d: -40 },
];
const sparks = Array.from({ length: 12 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 7.13 + n * 3.7) * 9999.1) % 1 + 1) % 1;
  return { left: 8 + r(1) * 84, top: 6 + r(2) * 55, delay: -r(3) * 4, scale: 0.6 + r(4) * 1.1 };
});

function WallpaperBase() {
  return (
    <div className="wall" aria-hidden="true">
      <div className="wall__sky" />
      <div className="wall__flare" />
      {clouds.map((c, i) => (
        <span key={i} className="cp-cloud" style={{ top: `${c.top}%`, ['--w' as string]: `${c.w}px`, ['--t' as string]: `${c.t}s`, ['--d' as string]: `${c.d}s` } as React.CSSProperties} />
      ))}

      {/* Cintas de luz tipo aurora */}
      <svg className="wall__aurora" viewBox="0 0 1440 600" preserveAspectRatio="none">
        <defs>
          <linearGradient id="au1" x1="0" x2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset=".35" stopColor="#bdf7ff" stopOpacity=".55" />
            <stop offset=".7" stopColor="#c6ff9a" stopOpacity=".45" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="au2" x1="0" x2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset=".5" stopColor="#ffffff" stopOpacity=".5" />
            <stop offset="1" stopColor="#7fe2ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-50 380 C 260 250, 520 470, 820 330 S 1300 210, 1500 300 L 1500 340 C 1260 270, 1100 420, 820 380 S 300 320, -50 430 Z" fill="url(#au1)" />
        <path d="M-50 300 C 300 200, 600 380, 900 260 S 1300 160, 1500 220 L 1500 236 C 1280 190, 1150 300, 900 286 S 320 240, -50 320 Z" fill="url(#au2)" />
        <path d="M-50 460 C 360 380, 700 540, 1000 420 S 1350 360, 1500 400 L 1500 412 C 1350 380, 1200 470, 1000 450 S 380 420, -50 480 Z" fill="url(#au2)" opacity=".7" />
      </svg>

      {/* Colinas verdes brillantes */}
      <svg className="wall__hills" viewBox="0 0 1440 420" preserveAspectRatio="none">
        <defs>
          <linearGradient id="h1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c8ff7a" />
            <stop offset=".25" stopColor="#6fdc3c" />
            <stop offset=".8" stopColor="#1f9a2c" />
            <stop offset="1" stopColor="#0f6d1d" />
          </linearGradient>
          <linearGradient id="h2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9be8ff" stopOpacity=".9" />
            <stop offset=".4" stopColor="#38c8b8" stopOpacity=".85" />
            <stop offset="1" stopColor="#11866a" />
          </linearGradient>
          <linearGradient id="hl" x1="0" x2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".45" stopColor="#fff" stopOpacity=".95" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 210 C 260 120, 520 150, 760 200 S 1220 170, 1440 120 L 1440 420 L 0 420 Z" fill="url(#h2)" />
        <g className="wall__grass">
          <path d="M0 290 C 300 190, 640 250, 900 290 S 1300 260, 1440 230 L 1440 420 L 0 420 Z" fill="url(#h1)" />
          <path d="M0 290 C 300 190, 640 250, 900 290 S 1300 260, 1440 230" fill="none" stroke="url(#hl)" strokeWidth="3" />
        </g>
        <path d="M0 360 C 360 320, 760 380, 1440 330 L 1440 420 L 0 420 Z" fill="#0f6d1d" opacity=".35" />
      </svg>

      {bubbles.map((b, i) => (
        <span key={i} className="bubble" style={{ left: `${b.left}%`, width: b.size, height: b.size, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }} />
      ))}
      {sparks.map((s, i) => (
        <span key={i} className="spark" style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s`, scale: `${s.scale}` }} />
      ))}
    </div>
  );
}

export const Wallpaper = memo(WallpaperBase);
