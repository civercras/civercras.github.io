import { useEffect, useState } from 'react';
import { ui, useLang } from '../i18n';

/** Pantalla de arranque breve (solo la primera vez por sesión) */
export function Boot({ onDone }: { onDone: () => void }) {
  const { tx } = useLang();
  const [out, setOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setOut(true), 1650);
    const t2 = setTimeout(onDone, 2350);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  const skip = () => { setOut(true); setTimeout(onDone, 500); };

  return (
    <div className={`boot${out ? ' boot--out' : ''}`} onClick={skip} role="status" aria-live="polite">
      <div className="boot__inner">
        <div className="boot__orb">
          <div className="boot__ring" />
          <span>PG</span>
        </div>
        <div className="boot__bar"><i /></div>
        <div className="boot__text">{tx(ui.boot)}</div>
        <div className="boot__skip">{tx(ui.bootSkip)}</div>
      </div>
    </div>
  );
}
