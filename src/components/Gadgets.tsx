import { contact, cvUrl } from '../data/about';
import { ui, useLang } from '../i18n';
import type { Open } from '../nav';
import { IDownload, IGithub, ILinkedin, IMail, IUser } from './Icons';
import { useCopyEmail } from './AboutView';

export function Gadgets({ open }: { open: Open }) {
  const { tx, lang } = useLang();
  const { copied, copy } = useCopyEmail();
  const es = lang === 'es';

  return (
    <aside className="gadgets" aria-label={tx(ui.about)}>
      <div className="gadget">
        <div className="prof__top">
          <div className="prof__avatar"><img src="img/avatar.webp" alt="Pablo Grasa" /></div>
          <div>
            <h2 className="prof__name">Pablo Grasa</h2>
            <p className="prof__role">{tx(ui.tagline)}</p>
            <p className="prof__loc">📍 {tx(ui.location)}</p>
          </div>
        </div>
        <div className="prof__status"><span className="dot" /> {tx(ui.available)}</div>
        <p className="prof__pitch">{tx(ui.pitch)}</p>
        <div className="prof__actions">
          <button className="btn btn--sm btn--green" onClick={() => open({ kind: 'about' })}><IUser /> {tx(ui.about)}</button>
          <a className="btn btn--sm btn--glass" href={cvUrl(lang)} download><IDownload /> CV</a>
        </div>
        <div className="prof__links">
          <a className="iconbtn" href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><ILinkedin /></a>
          <a className="iconbtn" href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><IGithub /></a>
          <button className="iconbtn" onClick={copy} aria-label={tx(ui.copyEmail)} title={copied ? tx(ui.copied) : contact.email}>{copied ? '✓' : <IMail />}</button>
        </div>
      </div>

      <div className="gadget gadget--now">
        <h3>{tx(ui.now)}</h3>
        <div className="now__item"><span>🛠️</span><div>{es ? <>Mando PC ahora se llama <b>Couchpad</b> y estrena la v1.2. </> : <>Mando PC is now <b>Couchpad</b>, and v1.2 is out. </>}<button className="now__link" onClick={() => open({ kind: 'project', id: 'couchpad' })}>{es ? 'Ver proyecto' : 'See project'}</button></div></div>
        <div className="now__item"><span>✨</span><div>{es ? <>Estrenando <b>nuevo look</b> del portfolio. ¿Qué te parece? </> : <>Showing off the portfolio’s <b>new look</b>. What do you think? </>}<button className="now__link" onClick={() => open({ kind: 'contact' })}>{es ? 'Cuéntamelo' : 'Tell me'}</button></div></div>
        <div className="now__item"><span>🖨️</span><div>{es ? <>Diseñando modelos para <b>impresión 3D</b>.</> : <>Designing models for <b>3D printing</b>.</>}</div></div>
      </div>
    </aside>
  );
}
