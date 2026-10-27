import { useCallback, useEffect, useRef, useState } from 'react';
import { byId } from '../data/projects';
import { contact, cvUrl } from '../data/about';
import { ui, useLang } from '../i18n';
import { hashToTarget, targetKey, targetToHash, type Open, type Target } from '../nav';
import { AboutView, ContactView } from './AboutView';
import { Gadgets } from './Gadgets';
import { FsHint } from './FsHint';
import { MoreCard } from './Cards';
import { ProjectView } from './ProjectView';
import { Showcase } from './Showcase';
import { Taskbar } from './Taskbar';
import { Window, type WinState } from './Window';

const BAR = 54;
type Win = WinState & { target: Target };

function useArea() {
  const get = () => ({ w: window.innerWidth, h: window.innerHeight - BAR });
  const [a, setA] = useState(get);
  useEffect(() => { const f = () => setA(get()); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f); }, []);
  return a;
}

/* Iconos SVG propios para elementos que no son proyectos */
const starIcon = `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><radialGradient id="a" cx="50%" cy="30%" r="75%"><stop offset="0" stop-color="#d6f9ff"/><stop offset=".5" stop-color="#2aa6f0"/><stop offset="1" stop-color="#0a4fb0"/></radialGradient><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff7b0"/><stop offset="1" stop-color="#ffb300"/></linearGradient></defs><rect width="64" height="64" fill="url(#a)"/><path d="M32 11l6.2 12.6 13.9 2-10 9.8 2.4 13.8L32 42.7l-12.5 6.5 2.4-13.8-10-9.8 13.9-2z" fill="url(#s)" stroke="#c77800" stroke-width="1.5" stroke-linejoin="round"/></svg>`)}`;
const mailIcon = `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8ff9c"/><stop offset=".55" stop-color="#46c93a"/><stop offset="1" stop-color="#16802a"/></linearGradient></defs><rect width="64" height="64" fill="url(#a)"/><rect x="12" y="19" width="40" height="27" rx="4" fill="#fff"/><path d="M13 21l19 14 19-14" fill="none" stroke="#2fa33a" stroke-width="3" stroke-linejoin="round"/></svg>`)}`;
const cvIcon = `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd0c0"/><stop offset=".55" stop-color="#f0603c"/><stop offset="1" stop-color="#b8300f"/></linearGradient></defs><rect width="64" height="64" fill="url(#a)"/><path d="M20 10h17l9 9v35H20z" fill="#fff"/><path d="M37 10v9h9" fill="#ffd9cc"/><text x="33" y="44" text-anchor="middle" font-family="Arial" font-weight="900" font-size="12" fill="#d43a1a">CV</text></svg>`)}`;

const folderSvg = (a: string, b: string, c: string, glyph: string) => `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><rect width="64" height="64" fill="#eaf6ff"/><path d="M8 16h18l5 5h25v31H8z" fill="${c}"/><path d="M8 24h48v28H8z" fill="url(#f)"/><path d="M8 24h48v12H8z" fill="url(#g)"/>${glyph}</svg>`)}`;
const uxIcon = folderSvg('#9fe6ff', '#1ea3ef', '#0a5fc0', '<rect x="22" y="30" width="20" height="15" rx="2" fill="#fff"/><rect x="25" y="33" width="14" height="2.5" rx="1" fill="#1ea3ef"/><rect x="25" y="38" width="9" height="2.5" rx="1" fill="#9fd8f5"/>');
const appsIcon = folderSvg('#ffd9a8', '#ff9a2e', '#d4600a', '<rect x="24" y="29" width="16" height="18" rx="3" fill="#fff"/><circle cx="32" cy="43" r="1.6" fill="#ff9a2e"/><rect x="27" y="32" width="10" height="8" rx="1" fill="#ffd9a8"/>');
const otherIcon = folderSvg('#d8ff9c', '#46c93a', '#16802a', '<circle cx="27" cy="38" r="5" fill="#fff"/><rect x="34" y="33" width="9" height="10" rx="1.5" fill="#fff"/>');

export const folders = {
  uxui: { title: { es: 'Diseño UX/UI', en: 'UX/UI design' }, icon: uxIcon, ids: ['basehub', 'cocoon', 'riftos', 'instalaza'] },
  apps: { title: { es: 'Apps', en: 'Apps' }, icon: appsIcon, ids: ['couchpad', 'bookreader', 'bubblepad'] },
  otros: { title: { es: 'Otros proyectos', en: 'Other projects' }, icon: otherIcon, ids: ['rumex', 'carteles', 'fotografia', 'tfg'] },
} as const;

export const iconFor = (t: Target) =>
  t.kind === 'project' ? byId(t.id)!.icon : t.kind === 'folder' ? folders[t.id].icon : t.kind === 'about' ? 'img/avatar.webp' : t.kind === 'contact' ? mailIcon : starIcon;

function FolderView({ id, open }: { id: 'uxui' | 'apps' | 'otros'; open: Open }) {
  const { tx } = useLang();
  const f = folders[id];
  return (
    <div className="folder">
      <div className="folder__path">{tx(f.title)} · {f.ids.length} {tx(ui.works)}</div>
      <div className="mgrid">
        {f.ids.map((pid) => { const p = byId(pid)!; return <MoreCard key={pid} p={p} onOpen={() => open({ kind: 'project', id: pid })} />; })}
      </div>
    </div>
  );
}

export function Desktop() {
  const { tx, lang } = useLang();
  const area = useArea();
  const [wins, setWins] = useState<Win[]>([]);
  const [focus, setFocus] = useState<string | null>(null);
  const z = useRef(10);
  const winsRef = useRef(wins);
  winsRef.current = wins;

  const iconCols = Math.max(1, Math.ceil(7 / Math.max(1, Math.floor((area.h - 28) / 112))));
  const leftEdge = 14 + iconCols * 102 + 8;
  const gadgetsW = area.w >= 1180 ? (area.w <= 1280 ? 260 : 290) + 32 : 0;

  const titleFor = useCallback((t: Target) => {
    if (t.kind === 'project') { const p = byId(t.id)!; return `${tx(p.title)} — ${tx(p.category)}`; }
    if (t.kind === 'about') return `${tx(ui.about)} — Pablo Grasa`;
    if (t.kind === 'contact') return tx(ui.contact);
    if (t.kind === 'folder') return tx(folders[t.id].title);
    return `${tx(ui.featured)} — Pablo Grasa`;
  }, [tx]);

  const geomFor = useCallback((t: Target, n: number) => {
    const a = area;
    if (t.kind === 'showcase') {
      const w = Math.max(560, a.w - leftEdge - gadgetsW - 8);
      return { x: leftEdge, y: 14, w: Math.min(w, 1400), h: a.h - 28 };
    }
    if (t.kind === 'folder') {
      const w = Math.min(820, a.w - leftEdge - 40), h = Math.min(420, a.h - 60);
      return { x: leftEdge + 30, y: 40, w, h };
    }
    if (t.kind === 'contact') {
      const w = Math.min(520, a.w - 40), h = Math.min(560, a.h - 40);
      return { x: Math.round((a.w - w) / 2), y: Math.round((a.h - h) / 2.4), w, h };
    }
    const w = Math.min(1060, a.w - leftEdge - 30);
    const h = a.h - 40;
    const off = (n % 5) * 26;
    return { x: Math.max(leftEdge - 40, Math.round((a.w - w) / 2) - 60) + off, y: 18 + off * 0.4, w, h: h - off * 0.4 };
  }, [area, leftEdge, gadgetsW]);

  const setHash = (t: Target | null) => {
    const h = t ? targetToHash(t) : '#/';
    if (location.hash !== h) history.replaceState(null, '', h === '#/' ? location.pathname + location.search : h);
  };

  const focusWin = useCallback((key: string) => {
    z.current += 1;
    setWins((ws) => ws.map((w) => (w.key === key ? { ...w, z: z.current, min: false } : w)));
    setFocus(key);
    const w = winsRef.current.find((x) => x.key === key);
    if (w) setHash(w.target);
  }, []);

  const open: Open = useCallback((t) => {
    const key = targetKey(t);
    const exists = winsRef.current.find((w) => w.key === key);
    if (exists) { focusWin(key); return; }
    z.current += 1;
    const g = geomFor(t, winsRef.current.filter((w) => w.target.kind !== 'showcase').length);
    setWins((ws) => [...ws, { key, target: t, ...g, z: z.current, min: false, max: false }]);
    setFocus(key);
    setHash(t);
  }, [focusWin, geomFor]);

  const close = (key: string) => {
    setWins((ws) => {
      const rest = ws.filter((w) => w.key !== key);
      const top = rest.filter((w) => !w.min).sort((a, b) => b.z - a.z)[0];
      setFocus(top?.key ?? null);
      setHash(top?.target ?? null);
      return rest;
    });
  };
  const minimize = (key: string) => {
    setWins((ws) => {
      const next = ws.map((w) => (w.key === key ? { ...w, min: true } : w));
      const top = next.filter((w) => !w.min).sort((a, b) => b.z - a.z)[0];
      setFocus(top?.key ?? null);
      setHash(top?.target ?? null);
      return next;
    });
  };
  const toggleMax = (key: string) => {
    setWins((ws) => ws.map((w) => (w.key === key ? { ...w, max: !w.max, anim: true } : w)));
    setTimeout(() => setWins((ws) => ws.map((w) => (w.key === key ? { ...w, anim: false } : w))), 360);
  };
  const patch = (key: string, p: Partial<Win>) => setWins((ws) => ws.map((w) => (w.key === key ? { ...w, ...p } : w)));

  const onTask = (key: string) => {
    const w = winsRef.current.find((x) => x.key === key);
    if (!w) return;
    if (!w.min && focus === key) minimize(key);
    else focusWin(key);
  };

  // Al entrar: abre los destacados y, si el enlace apunta a un proyecto, también ese proyecto
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const t = hashToTarget(location.hash);
    open({ kind: 'showcase' });
    if (t) setTimeout(() => open(t), 260);
  }, [open]);

  useEffect(() => {
    const f = () => { const t = hashToTarget(location.hash); if (t) open(t); };
    window.addEventListener('hashchange', f);
    return () => window.removeEventListener('hashchange', f);
  }, [open]);

  // Reajusta la ventana de destacados si cambia el tamaño de pantalla
  useEffect(() => {
    setWins((ws) => ws.map((w) => (w.target.kind === 'showcase' && !w.max ? { ...w, ...geomFor(w.target, 0) } : { ...w, x: Math.min(w.x, area.w - 160), y: Math.min(w.y, area.h - 60), h: Math.min(w.h, area.h - 10) })));
  }, [area.w, area.h]); // eslint-disable-line react-hooks/exhaustive-deps

  const icons: { label: string; icon: string; target?: Target; href?: string; contain?: boolean }[] = [
    { label: tx(ui.featured), icon: starIcon, target: { kind: 'showcase' } },
    { label: tx(folders.uxui.title), icon: uxIcon, target: { kind: 'folder', id: 'uxui' } },
    { label: tx(folders.apps.title), icon: appsIcon, target: { kind: 'folder', id: 'apps' } },
    { label: tx(folders.otros.title), icon: otherIcon, target: { kind: 'folder', id: 'otros' } },
    { label: tx(ui.about), icon: 'img/avatar.webp', target: { kind: 'about' } },
    { label: tx(ui.contact), icon: mailIcon, target: { kind: 'contact' } },
    { label: 'CV.pdf', icon: cvIcon, href: cvUrl(lang) },
  ];

  const renderBody = (t: Target) => {
    if (t.kind === 'showcase') return <Showcase open={open} />;
    if (t.kind === 'about') return <AboutView open={open} />;
    if (t.kind === 'contact') return <ContactView />;
    if (t.kind === 'folder') return <FolderView id={t.id} open={open} />;
    return <ProjectView id={t.id} open={open} />;
  };

  return (
    <div className="desk">
      <div className="desk__icons" role="list">
        {icons.map((ic) => {
          const tile = (
            <>
              <span className={`dicon__tile${ic.contain ? ' dicon__tile--contain' : ''}`}><img src={ic.icon} alt="" /></span>
              <span className="dicon__label">{ic.label}</span>
            </>
          );
          return ic.href ? (
            <a key={ic.label} role="listitem" className="dicon" href={ic.href} download style={{ textDecoration: 'none' }}>{tile}</a>
          ) : (
            <button key={ic.label} role="listitem" className="dicon" onClick={() => open(ic.target!)}>{tile}</button>
          );
        })}
      </div>

      {gadgetsW > 0 && <Gadgets open={open} />}

      {wins.map((w) => (
        <Window
          key={w.key}
          st={w}
          title={titleFor(w.target)}
          icon={iconFor(w.target)}
          focused={focus === w.key}
          area={area}
          onFocus={() => focus !== w.key && focusWin(w.key)}
          onClose={() => close(w.key)}
          onMin={() => minimize(w.key)}
          onToggleMax={() => toggleMax(w.key)}
          onMove={(x, y) => patch(w.key, { x, y })}
          onResize={(ww, hh) => patch(w.key, { w: ww, h: hh })}
        >
          {renderBody(w.target)}
        </Window>
      ))}

      <FsHint />
      <Taskbar
        tasks={wins.map((w) => ({ key: w.key, title: w.target.kind === 'project' ? tx(byId(w.target.id)!.title) : titleFor(w.target).split(' — ')[0], icon: iconFor(w.target), min: w.min, focused: focus === w.key }))}
        onTask={onTask}
        open={open}
      />
    </div>
  );
}
