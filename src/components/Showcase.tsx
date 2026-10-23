import { featured, others } from '../data/projects';
import { contact, cvUrl } from '../data/about';
import { ui, useLang } from '../i18n';
import type { Open } from '../nav';
import { FeaturedCard, MoreCard } from './Cards';
import { IArrow, IDownload, IUser } from './Icons';

export function Showcase({ open }: { open: Open }) {
  const { tx, lang } = useLang();
  return (
    <div className="show">
      <div className="show__hello">
        <div>
          <h1>
            {tx(ui.hello)}. <em>{lang === 'es' ? 'Diseño experiencias que la gente entiende.' : 'I design experiences people understand.'}</em>
          </h1>
        </div>
        <div className="show__actions">
          <button className="btn btn--sm btn--green" onClick={() => open({ kind: 'about' })}><IUser /> {tx(ui.about)}</button>
          <a className="btn btn--sm btn--glass" href={cvUrl(lang)} download><IDownload /> {tx(ui.downloadCv)}</a>
        </div>
      </div>

      <div className="show__h show__h--first">
        <h2>{tx(ui.featured)}</h2>
        <p>{tx(ui.featuredSub)}</p>
      </div>
      <div className="bento">
        {featured.map((p) => (
          <FeaturedCard key={p.id} p={p} onOpen={() => open({ kind: 'project', id: p.id })} />
        ))}
      </div>

      <div className="show__h">
        <h2>{tx(ui.moreWork)}</h2>
        <p>{tx(ui.moreWorkSub)}</p>
      </div>
      <div className="mgrid">
        {others.map((p) => (
          <MoreCard key={p.id} p={p} onOpen={() => open({ kind: 'project', id: p.id })} />
        ))}
      </div>

      <div className="aboutstrip">
        <img src="img/avatar.webp" alt="" />
        <p>
          <b>{lang === 'es' ? 'Ingeniero de diseño que se pasó al UX.' : 'A design engineer who moved into UX.'}</b>{' '}
          {lang === 'es'
            ? 'Vengo de los planos y el CAD, y eso se nota en cómo diseño: con precisión, sistemas y datos.'
            : 'I come from technical drawings and CAD, and it shows in how I design: with precision, systems and data.'}
        </p>
        <button className="btn btn--sm" onClick={() => open({ kind: 'about' })}>{tx(ui.about)} <IArrow /></button>
      </div>
    </div>
  );
}
