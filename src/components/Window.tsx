import { useRef, type ReactNode } from 'react';
import { ui, useLang } from '../i18n';
import { IClose, IMax, IMin, IRestore } from './Icons';

export type WinState = {
  key: string;
  x: number; y: number; w: number; h: number;
  z: number;
  min: boolean;
  max: boolean;
  anim?: boolean;
};

type Props = {
  st: WinState;
  title: string;
  icon: string;
  focused: boolean;
  area: { w: number; h: number };
  onFocus: () => void;
  onClose: () => void;
  onMin: () => void;
  onToggleMax: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (w: number, h: number) => void;
  children: ReactNode;
};

export function Window({ st, title, icon, focused, area, onFocus, onClose, onMin, onToggleMax, onMove, onResize, children }: Props) {
  const { tx } = useLang();
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
  const rs = useRef<{ sx: number; sy: number; ow: number; oh: number } | null>(null);

  const pos = st.max ? { left: 0, top: 0, width: area.w, height: area.h } : { left: st.x, top: st.y, width: st.w, height: st.h };

  const onBarDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    onFocus();
    if (st.max) return;
    drag.current = { sx: e.clientX, sy: e.clientY, ox: st.x, oy: st.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onBarMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const nx = Math.min(Math.max(d.ox + e.clientX - d.sx, -st.w + 120), area.w - 120);
    const ny = Math.min(Math.max(d.oy + e.clientY - d.sy, 0), area.h - 44);
    onMove(nx, ny);
  };
  const onBarUp = () => { drag.current = null; };

  const onRsDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    onFocus();
    rs.current = { sx: e.clientX, sy: e.clientY, ow: st.w, oh: st.h };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onRsMove = (e: React.PointerEvent) => {
    const r = rs.current;
    if (!r) return;
    onResize(Math.max(380, r.ow + e.clientX - r.sx), Math.max(280, r.oh + e.clientY - r.sy));
  };
  const onRsUp = () => { rs.current = null; };

  return (
    <section
      className={`win${focused ? '' : ' win--blur'}${st.min ? ' win--min' : ''}${st.anim ? ' win--anim' : ''}`}
      style={{ ...pos, zIndex: st.z, borderRadius: st.max ? 0 : undefined }}
      onPointerDown={onFocus}
      role="dialog"
      aria-label={title}
      aria-hidden={st.min || undefined}
      onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
    >
      <div className="win__bar" onPointerDown={onBarDown} onPointerMove={onBarMove} onPointerUp={onBarUp} onDoubleClick={onToggleMax}>
        <div className="win__icon"><img src={icon} alt="" /></div>
        <div className="win__title">{title}</div>
        <div className="win__btns">
          <button className="wbtn" onClick={onMin} aria-label={tx(ui.minimize)} title={tx(ui.minimize)}><IMin /></button>
          <button className="wbtn" onClick={onToggleMax} aria-label={tx(st.max ? ui.restore : ui.maximize)} title={tx(st.max ? ui.restore : ui.maximize)}>{st.max ? <IRestore /> : <IMax />}</button>
          <button className="wbtn wbtn--close" onClick={onClose} aria-label={tx(ui.close)} title={tx(ui.close)}><IClose /></button>
        </div>
      </div>
      <div className="win__body">{children}</div>
      {!st.max && <div className="win__resize" onPointerDown={onRsDown} onPointerMove={onRsMove} onPointerUp={onRsUp} />}
    </section>
  );
}
