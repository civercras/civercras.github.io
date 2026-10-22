import { useEffect, useState } from 'react';
import { useLang } from '../i18n';
import { IClose, IMax } from './Icons';

/** Aviso discreto: sugiere pantalla completa y desaparece solo */
export function FsHint() {
  const { lang } = useLang();
  const es = lang === 'es';
  const [show, setShow] = useState(false);
  const [out, setOut] = useState(false);

  useEffect(() => {
    if (!document.fullscreenEnabled || document.fullscreenElement) return;
    try { if (sessionStorage.getItem('pg-fs')) return; } catch { /* nada */ }
    const t1 = setTimeout(() => setShow(true), 2600);
    const t2 = setTimeout(() => setOut(true), 2600 + 9000);
    const t3 = setTimeout(() => setShow(false), 2600 + 9500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const dismiss = () => {
    setOut(true); setTimeout(() => setShow(false), 450);
    try { sessionStorage.setItem('pg-fs', '1'); } catch { /* nada */ }
  };
  const go = () => { document.documentElement.requestFullscreen?.().catch(() => {}); dismiss(); };

  if (!show) return null;
  return (
    <div className={`fshint${out ? ' fshint--out' : ''}`} role="status">
      <IMax className="fshint__ic" />
      <span>{es ? 'Se disfruta más en pantalla completa' : 'Best enjoyed in full screen'}</span>
      <button className="btn btn--sm" onClick={go}>{es ? 'Pantalla completa' : 'Full screen'}</button>
      <button className="fshint__x" onClick={dismiss} aria-label={es ? 'Cerrar' : 'Close'}><IClose /></button>
      <i className="fshint__bar" />
    </div>
  );
}
