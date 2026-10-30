import { useEffect, useMemo, useRef, useState } from 'react';
import { featured, others } from '../data/projects';
import { contact, cvUrl } from '../data/about';
import { ui, useLang } from '../i18n';
import { setFx, setMusic, useSound } from '../sound';
import type { Open } from '../nav';
import { IDownload, IGithub, IGrid, ILinkedin, IMail, IUser } from './Icons';

export type TaskItem = { key: string; title: string; icon: string; min: boolean; focused: boolean };

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 15000); return () => clearInterval(t); }, []);
  return now;
}

const ISpk = ({ on }: { on: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" stroke="none" />
    {on ? <><path d="M15.5 9a4 4 0 0 1 0 6" /><path d="M18 6.5a7.5 7.5 0 0 1 0 11" /></> : <path d="M16 9.5l5 5M21 9.5l-5 5" />}
  </svg>
);
const INote = ({ on }: { on: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M9 17V5.5l10-2V15" /><circle cx="6.5" cy="17" r="2.5" fill="currentColor" stroke="none" /><circle cx="16.5" cy="15" r="2.5" fill="currentColor" stroke="none" />
    {!on && <path d="M3.5 3.5l17 17" />}
  </svg>
);

/** efectos de sonido y hilo musical */
export function SoundToggle() {
  const { lang } = useLang();
  const st = useSound();
  const fx = (st & 1) === 1, mu = (st & 2) === 2;
  const es = lang === 'es';
  const lf = fx ? (es ? 'Silenciar efectos' : 'Mute sound effects') : (es ? 'Activar efectos de sonido' : 'Turn sound effects on');
  const lm = mu ? (es ? 'Parar música' : 'Stop music') : (es ? 'Poner música de fondo' : 'Play background music');
  return (
    <div className="snd" role="group" aria-label={es ? 'Sonido' : 'Sound'}>
      <button aria-pressed={fx} onClick={() => setFx(!fx)} aria-label={lf} title={lf}><ISpk on={fx} /></button>
      <button aria-pressed={mu} className={mu ? 'snd--play' : ''} onClick={() => setMusic(!mu)} aria-label={lm} title={lm}><INote on={mu} /></button>
    </div>
  );
}

export function LangSwitch() {
  const { lang, setLang, tx } = useLang();
  return (
    <div className="lang" role="group" aria-label={tx(ui.language)}>
      <button aria-pressed={lang === 'es'} onClick={() => setLang('es')}>ES</button>
      <button aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
    </div>
  );
}

function StartMenu({ open, onClose }: { open: Open; onClose: () => void }) {
  const { tx, lang } = useLang();
  const [q, setQ] = useState('');
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { input.current?.focus(); }, []);
  const go: Open = (t) => { open(t); onClose(); };
  const filt = useMemo(() => {
    const s = q.trim().toLowerCase();
    const m = (p: (typeof featured)[number]) => !s || `${tx(p.title)} ${tx(p.category)} ${tx(p.short)}`.toLowerCase().includes(s);
    return { f: featured.filter(m), o: others.filter(m) };
  }, [q, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const Item = ({ p }: { p: (typeof featured)[number] }) => (
    <button className="start__item" onClick={() => go({ kind: 'project', id: p.id })}>
      <img src={p.icon} alt="" />
      <div><b>{tx(p.title)}</b><span>{tx(p.category)}</span></div>
    </button>
  );

  return (
    <>
      <div className="start__backdrop" onClick={onClose} />
      <div className="start" role="menu" onKeyDown={(e) => e.key === 'Escape' && onClose()}>
        <div className="start__l">
          <div className="start__list">
            {filt.f.length > 0 && <div className="start__sec">{tx(ui.featured)}</div>}
            {filt.f.map((p) => <Item key={p.id} p={p} />)}
            {filt.o.length > 0 && <div className="start__sec">{tx(ui.moreWork)}</div>}
            {filt.o.map((p) => <Item key={p.id} p={p} />)}
            {!filt.f.length && !filt.o.length && <div className="start__sec">{tx(ui.noResults)}</div>}
          </div>
          <input ref={input} className="start__search" placeholder={tx(ui.menuSearch)} value={q} onChange={(e) => setQ(e.target.value)} aria-label={tx(ui.menuSearch)} />
        </div>
        <div className="start__r">
          <div className="start__me"><img src="img/avatar.webp" alt="" /><b>Pablo Grasa</b></div>
          <button className="start__link" onClick={() => go({ kind: 'showcase' })}><IGrid /> {tx(ui.allProjects)}</button>
          <button className="start__link" onClick={() => go({ kind: 'about' })}><IUser /> {tx(ui.about)}</button>
          <button className="start__link" onClick={() => go({ kind: 'contact' })}><IMail /> {tx(ui.contact)}</button>
          <a className="start__link" href={cvUrl(lang)} download><IDownload /> {tx(ui.downloadCv)}</a>
          <a className="start__link" href={contact.linkedin} target="_blank" rel="noopener noreferrer"><ILinkedin /> LinkedIn</a>
          <a className="start__link" href={contact.github} target="_blank" rel="noopener noreferrer"><IGithub /> GitHub</a>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: '.72rem', opacity: .8, padding: '0 10px' }}>{lang === 'es' ? 'Portfolio v3 · 2026' : 'Portfolio v3 · 2026'}</div>
        </div>
      </div>
    </>
  );
}

export function Taskbar({ tasks, onTask, open }: { tasks: TaskItem[]; onTask: (key: string) => void; open: Open }) {
  const { tx, lang } = useLang();
  const [menu, setMenu] = useState(false);
  const now = useClock();
  const loc = lang === 'es' ? 'es-ES' : 'en-GB';
  return (
    <>
      {menu && <StartMenu open={open} onClose={() => setMenu(false)} />}
      <nav className="bar" aria-label="Taskbar">
        <button className="orb" aria-expanded={menu} aria-label={tx(ui.start)} title={tx(ui.start)} onClick={() => setMenu((m) => !m)}><span>PG</span></button>
        <div className="bar__tasks">
          {tasks.map((t) => (
            <button key={t.key} className={`task${t.focused && !t.min ? ' task--on' : ''}${t.min ? ' task--min' : ''}`} onClick={() => onTask(t.key)} title={t.title}>
              <img src={t.icon} alt="" />
              <span>{t.title}</span>
            </button>
          ))}
        </div>
        <div className="tray">
          <SoundToggle />
          <LangSwitch />
          <div className="tray__clock">
            {now.toLocaleTimeString(loc, { hour: '2-digit', minute: '2-digit' })}
            <small>{now.toLocaleDateString(loc, { day: '2-digit', month: '2-digit', year: 'numeric' })}</small>
          </div>
        </div>
      </nav>
    </>
  );
}
