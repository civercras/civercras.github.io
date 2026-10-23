import { useCallback, useEffect, useState } from 'react';
import { byId, featured, others } from '../data/projects';
import { contact, cvUrl } from '../data/about';
import { ui, useLang } from '../i18n';
import { hashToTarget, targetToHash, type Open, type Target } from '../nav';
import { AboutView, ContactView } from './AboutView';
import { FeaturedCard, MoreCard } from './Cards';
import { IBack, IDownload, IGrid, IMail, IUser } from './Icons';
import { ProjectView } from './ProjectView';
import { LangSwitch } from './Taskbar';

export function Mobile() {
  const { tx, lang } = useLang();
  const [sheet, setSheet] = useState<Target | null>(() => hashToTarget(location.hash));

  const open: Open = useCallback((t) => {
    if (t.kind === 'showcase') { setSheet(null); history.replaceState(null, '', location.pathname + location.search); return; }
    setSheet(t);
    if (history.state?.pg) history.replaceState({ pg: 1 }, '', targetToHash(t));
    else history.pushState({ pg: 1 }, '', targetToHash(t));
  }, []);

  useEffect(() => {
    const f = () => setSheet(hashToTarget(location.hash));
    window.addEventListener('popstate', f);
    window.addEventListener('hashchange', f);
    return () => { window.removeEventListener('popstate', f); window.removeEventListener('hashchange', f); };
  }, []);

  useEffect(() => {
    const el = document.querySelector('.sheet__body');
    if (el) el.scrollTop = 0;
  }, [sheet]);

  const closeSheet = () => {
    if (history.state?.pg) { history.back(); return; }
    setSheet(null);
    history.replaceState(null, '', location.pathname + location.search);
  };

  const sheetTitle = sheet ? (sheet.kind === 'project' ? tx(byId(sheet.id)?.title) : sheet.kind === 'about' ? tx(ui.about) : tx(ui.contact)) : '';

  return (
    <>
      <main className="m">
        <header className="m__hero">
          <div className="m__me">
            <div className="prof__avatar"><img src="img/avatar.webp" alt="Pablo Grasa" /></div>
            <div>
              <h1>Pablo Grasa</h1>
              <p>{tx(ui.tagline)}</p>
            </div>
          </div>
          <div className="m__pitch">
            <div className="prof__status"><span className="dot" /> {tx(ui.available)}</div>
            {tx(ui.pitch)}
            <div className="prof__actions">
              <button className="btn btn--sm btn--green" onClick={() => open({ kind: 'about' })}><IUser /> {tx(ui.about)}</button>
              <a className="btn btn--sm btn--glass" href={cvUrl(lang)} download><IDownload /> CV</a>
            </div>
          </div>
        </header>

        <h2 className="m__h">{tx(ui.featured)}</h2>
        <div className="m__rail">
          {featured.map((p) => <FeaturedCard key={p.id} p={p} onOpen={() => open({ kind: 'project', id: p.id })} />)}
        </div>

        <h2 className="m__h">{tx(ui.moreWork)}</h2>
        <div className="m__grid">
          {others.map((p) => <MoreCard key={p.id} p={p} onOpen={() => open({ kind: 'project', id: p.id })} />)}
        </div>

        <div className="m__sec">
          <ContactView />
        </div>
      </main>

      <nav className="m__dock" aria-label="Menú">
        <button onClick={() => { setSheet(null); document.querySelector('.m')?.scrollTo({ top: 0, behavior: 'smooth' }); }}><IGrid />{tx(ui.allProjects).split(' ')[0]}</button>
        <button onClick={() => open({ kind: 'about' })}><IUser />{tx(ui.about)}</button>
        <button onClick={() => open({ kind: 'contact' })}><IMail />{tx(ui.contact)}</button>
        <LangSwitch />
      </nav>

      {sheet && (
        <div className="sheet" role="dialog" aria-label={sheetTitle}>
          <div className="sheet__bar">
            <button className="btn btn--sm btn--glass" onClick={closeSheet}><IBack /> {tx(ui.back)}</button>
            <b>{sheetTitle}</b>
          </div>
          <div className="sheet__body">
            {sheet.kind === 'project' && <ProjectView id={sheet.id} open={open} />}
            {sheet.kind === 'about' && <AboutView open={open} />}
            {sheet.kind === 'contact' && <ContactView />}
          </div>
        </div>
      )}
    </>
  );
}
