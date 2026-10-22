import { useEffect, useState } from 'react';
import { contact } from '../data/about';
import { ui, useLang } from '../i18n';
import type { Open } from '../nav';
import { IDownload, IGithub, ILinkedin, IMail, IUser } from './Icons';
import { useCopyEmail } from './AboutView';

function AnalogClock({ now }: { now: Date }) {
  const s = now.getSeconds(), m = now.getMinutes() + s / 60, h = (now.getHours() % 12) + m / 60;
  const hand = (deg: number, len: number, w: number, c: string) => (
    <line x1="50" y1="50" x2={50 + len * Math.sin((deg * Math.PI) / 180)} y2={50 - len * Math.cos((deg * Math.PI) / 180)} stroke={c} strokeWidth={w} strokeLinecap="round" />
  );
  return (
    <svg className="clock__face" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id="cf" cx="50%" cy="35%" r="70%"><stop offset="0" stopColor="#ffffff" /><stop offset=".7" stopColor="#dff3ff" /><stop offset="1" stopColor="#9fd4f5" /></radialGradient>
        <linearGradient id="cr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9ff3ff" /><stop offset="1" stopColor="#0a6fd6" /></linearGradient>
        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".9" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      </defs>
      <circle cx="50" cy="50" r="47" fill="url(#cr)" />
      <circle cx="50" cy="50" r="41" fill="url(#cf)" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return <circle key={i} cx={50 + 34 * Math.sin(a)} cy={50 - 34 * Math.cos(a)} r={i % 3 === 0 ? 2.4 : 1.3} fill="#2a6aa8" />;
      })}
      {hand(h * 30, 20, 4, '#0b2744')}
      {hand(m * 6, 29, 3, '#0b2744')}
      {hand(s * 6, 32, 1.4, '#2fb52f')}
      <circle cx="50" cy="50" r="3.5" fill="#2fb52f" stroke="#fff" strokeWidth="1.2" />
      <ellipse cx="50" cy="30" rx="30" ry="17" fill="url(#cg)" />
    </svg>
  );
}

export function Gadgets({ open }: { open: Open }) {
  const { tx, lang } = useLang();
  const [now, setNow] = useState(() => new Date());
  const { copied, copy } = useCopyEmail();
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  const loc = lang === 'es' ? 'es-ES' : 'en-GB';
  const es = lang === 'es';

  return (
    <aside className="gadgets" aria-label={tx(ui.about)}>
      <div className="gadget">
        <div className="prof__top">
          <div className="prof__avatar"><img src="img/avatar.webp" alt="Pablo Grasa" /></div>
          <div>
            <h2 className="prof__name">Pablo Grasa</h2>
            <p className="prof__role">{tx(ui.tagline)}</p>
          </div>
        </div>
        <div className="prof__status"><span className="dot" /> {tx(ui.available)}</div>
        <p className="prof__pitch">{tx(ui.pitch)}</p>
        <div className="prof__actions">
          <button className="btn btn--sm btn--green" onClick={() => open({ kind: 'about' })}><IUser /> {tx(ui.about)}</button>
          <a className="btn btn--sm btn--glass" href={contact.cv} download><IDownload /> CV</a>
        </div>
        <div className="prof__links">
          <a className="iconbtn" href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><ILinkedin /></a>
          <a className="iconbtn" href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><IGithub /></a>
          <button className="iconbtn" onClick={copy} aria-label={tx(ui.copyEmail)} title={copied ? tx(ui.copied) : contact.email}>{copied ? '✓' : <IMail />}</button>
        </div>
      </div>

      <div className="gadget">
        <div className="clock">
          <AnalogClock now={now} />
          <div>
            <div className="clock__time">{now.toLocaleTimeString(loc, { hour: '2-digit', minute: '2-digit' })}</div>
            <div className="clock__date">{now.toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'long' })}</div>
            <div className="clock__loc">📍 {tx(ui.location)}</div>
          </div>
        </div>
      </div>

      <div className="gadget gadget--now">
        <h3>{tx(ui.now)}</h3>
        <div className="now__item"><span>🛠️</span><div>{es ? <>Publicada la <b>v1.0 de Mando PC</b>, mi app de mando a distancia para el PC.</> : <>Shipped <b>Mando PC v1.0</b>, my phone-as-PC-remote app.</>}</div></div>
        <div className="now__item"><span>🎯</span><div>{es ? <>Buscando mi <b>primer puesto UX/UI</b>.</> : <>Looking for my <b>first UX/UI role</b>.</>}</div></div>
        <div className="now__item"><span>🖨️</span><div>{es ? <>Diseñando modelos para <b>impresión 3D</b>.</> : <>Designing models for <b>3D printing</b>.</>}</div></div>
      </div>
    </aside>
  );
}
