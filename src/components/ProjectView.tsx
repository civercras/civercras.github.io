import { useState } from 'react';
import { byId, projects, type Block, type Project } from '../data/projects';
import { ui, useLang, type T } from '../i18n';
import type { Open } from '../nav';
import { IArrow, LinkIcon } from './Icons';

type LB = { src: string; title?: string } | null;

function Links({ p, big }: { p: Project; big?: boolean }) {
  const { tx } = useLang();
  if (!p.links?.length) return null;
  return (
    <>
      {p.links.map((l, i) => (
        <a key={l.href} className={`btn${i > 0 ? ' btn--glass' : ''}${big ? '' : ''}`} href={l.href} target="_blank" rel="noopener noreferrer">
          <LinkIcon kind={l.kind} /> {tx(l.label)}
        </a>
      ))}
    </>
  );
}

const findingColors = ['#e5352b', '#f08c1a', '#0a8ee8', '#2fb52f'];

function BlockView({ blk, p, onZoom }: { blk: Block; p: Project; onZoom: (lb: LB) => void }) {
  const { tx } = useLang();
  const H = ({ t }: { t?: T }) => (t ? <h3 className="blk__h">{tx(t)}</h3> : null);

  switch (blk.t) {
    case 'lead':
      return <section className="blk lead"><H t={blk.title} /><p>{tx(blk.text)}</p></section>;
    case 'stats':
      return (
        <section className="blk"><H t={blk.title} />
          <div className="stats">
            {blk.items.map((s, i) => <div className="stat" key={i}><div className="stat__v">{s.v}</div><div className="stat__l">{tx(s.l)}</div></div>)}
          </div>
        </section>
      );
    case 'section':
      return (
        <section className="blk"><H t={blk.title} />
          {blk.text && <p className="txt">{tx(blk.text)}</p>}
          {blk.bullets && <ul className="list">{blk.bullets.map((x, i) => <li key={i}>{tx(x)}</li>)}</ul>}
        </section>
      );
    case 'cards':
      return (
        <section className="blk"><H t={blk.title} />
          <div className={`cards${blk.tone === 'findings' ? ' cards--findings' : ''}`}>
            {blk.items.map((c, i) => (
              <div className="card" key={i} style={blk.tone === 'findings' ? ({ '--c': findingColors[i % 4] } as React.CSSProperties) : undefined}>
                {c.icon && <div className="card__icon" aria-hidden="true">{c.icon}</div>}
                <h4>{tx(c.title)}</h4>
                <p>{tx(c.text)}</p>
              </div>
            ))}
          </div>
        </section>
      );
    case 'steps':
      return (
        <section className="blk"><H t={blk.title} />
          <div className="steps">
            {blk.items.map((s, i) => (
              <div className="step" key={i}>
                <div>
                  <h4>{tx(s.title)}</h4>
                  <p>{tx(s.text)}</p>
                  {s.result && <div className="step__res">✓ {tx(s.result)}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    case 'decisions':
      return (
        <section className="blk"><H t={blk.title} />
          <div className="decisions">
            {blk.items.map((d, i) => (
              <div className="decision" key={i}>
                <h4>{tx(d.title)}</h4>
                <dl>
                  <div><dt>{tx({ es: 'Por qué', en: 'Why' })}</dt><dd>{tx(d.why)}</dd></div>
                  <div><dt>{tx({ es: 'Cómo', en: 'How' })}</dt><dd>{tx(d.how)}</dd></div>
                </dl>
              </div>
            ))}
          </div>
        </section>
      );
    case 'quotes':
      return (
        <section className="blk"><H t={blk.title} />
          <div className="quotes">
            {blk.items.map((q, i) => <blockquote className="quote" key={i}><p>{tx(q.q)}</p><footer>— {tx(q.who)}</footer></blockquote>)}
          </div>
        </section>
      );
    case 'image':
      return (
        <section className="blk">
          <figure className={`figure${blk.fit === 'contain' ? ' figure--contain' : ''}`} style={blk.bg ? { background: blk.bg } : undefined}>
            <button style={{ all: 'unset', cursor: 'zoom-in', display: 'block', width: '100%' }} onClick={() => onZoom({ src: blk.src, title: tx(blk.caption ?? blk.alt) })} aria-label={tx(blk.alt)}>
              <img src={blk.src} alt={tx(blk.alt)} loading="lazy" />
            </button>
            {blk.caption && <figcaption>{tx(blk.caption)}</figcaption>}
          </figure>
        </section>
      );
    case 'gallery':
      return (
        <section className="blk"><H t={blk.title} />
          <div className={`gallery--${blk.layout}`}>
            {blk.items.map((g, i) => (
              <figure className="gitem" key={i}>
                <button onClick={() => onZoom({ src: g.src, title: tx(g.title) })} aria-label={tx(g.title) || tx(p.title)}>
                  <img src={g.src} alt={tx(g.title)} loading="lazy" />
                </button>
                {(g.title || g.text) && (
                  <figcaption>
                    {g.title && <span className="gitem__t">{tx(g.title)}</span>}
                    {g.text && blk.layout !== 'phones' && <span>{tx(g.text)}</span>}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      );
    case 'video':
      return (
        <section className="blk">
          <div className={`video${blk.vertical ? ' video--vertical' : ''}`}>
            <video src={blk.src} poster={blk.poster} controls playsInline preload="metadata" />
          </div>
          {blk.caption && <div className="video__cap">{tx(blk.caption)}</div>}
        </section>
      );
    case 'embed':
      return (
        <section className="blk"><H t={blk.heading} />
          {blk.caption && <p className="txt" style={{ marginBottom: 14 }}>{tx(blk.caption)}</p>}
          <div className="embed" style={{ aspectRatio: blk.ratio ?? '16 / 9' }}>
            <iframe src={blk.src} title={tx(blk.title)} loading="lazy" allowFullScreen />
          </div>
        </section>
      );
    case 'note':
      return (
        <section className="blk">
          <div className="note"><span className="note__i" aria-hidden="true">{blk.tone === 'lock' ? '🔒' : '💡'}</span><div>{tx(blk.text)}</div></div>
        </section>
      );
    case 'cta':
      return (
        <section className="blk">
          <div className="cta">
            <div><h3>{tx(blk.title)}</h3>{blk.text && <p>{tx(blk.text)}</p>}</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {p.links?.map((l) => (
                <a key={l.href} className="btn btn--glass" href={l.href} target="_blank" rel="noopener noreferrer"><LinkIcon kind={l.kind} /> {tx(l.label)}</a>
              ))}
            </div>
          </div>
        </section>
      );
  }
}

export function ProjectView({ id, open }: { id: string; open: Open }) {
  const { tx } = useLang();
  const p = byId(id);
  const [lb, setLb] = useState<LB>(null);
  if (!p) return null;
  const idx = projects.findIndex((x) => x.id === id);
  const next = projects[(idx + 1) % projects.length];
  const contain = p.coverFit === 'contain';

  const meta = [
    p.role && { k: ui.role, v: tx(p.role) },
    p.year && { k: ui.year, v: p.year },
    p.type && { k: ui.type, v: tx(p.type) },
    p.tools && { k: ui.tools, v: p.tools.join(' · ') },
  ].filter(Boolean) as { k: T; v: string }[];

  return (
    <article className="pv">
      <header className={`pv__hero${contain ? ' pv__hero--contain' : ''}`} style={contain ? { background: p.coverBg } : undefined}>
        {p.loop ? <video src={p.loop} poster={p.cover} muted loop autoPlay playsInline aria-hidden="true" /> : <img src={p.cover} alt="" />}
        <div className="pv__heroin">
          <div className="pv__cat">{tx(p.category)}</div>
          <h2 className="pv__title">{tx(p.title)}</h2>
          <p className="pv__short">{tx(p.short)}</p>
        </div>
      </header>
      <div className="pv__wrap">
        {meta.length > 0 && (
          <dl className="pv__meta">
            {meta.map((m, i) => <div key={i}><dt>{tx(m.k)}</dt><dd>{m.v}</dd></div>)}
          </dl>
        )}
        <div className="pv__links">
          <Links p={p} />
          <div className="pv__tags">{p.tags.map((t, i) => <span className="chip" key={i}>{tx(t)}</span>)}</div>
        </div>

        {p.blocks.map((blk, i) => <BlockView key={i} blk={blk} p={p} onZoom={setLb} />)}

        <nav className="nextp">
          <button className="btn btn--glass" onClick={() => open({ kind: 'showcase' })}>{tx(ui.allProjects)}</button>
          <button className="btn" onClick={() => open({ kind: 'project', id: next.id })}>{tx(ui.next)}: {tx(next.title)} <IArrow /></button>
        </nav>
      </div>

      {lb && (
        <div className="lightbox" onClick={() => setLb(null)} role="dialog" aria-label={lb.title}>
          <div>
            <img src={lb.src} alt={lb.title ?? ''} />
            {lb.title && <p>{lb.title}</p>}
          </div>
        </div>
      )}
    </article>
  );
}
