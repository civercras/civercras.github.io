import { useEffect, useRef } from 'react';
import type { Project } from '../data/projects';
import { ui, useLang } from '../i18n';
import { IArrow } from './Icons';

const reduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Vídeo que solo se reproduce cuando está a la vista */
function LoopVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || reduced()) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" aria-hidden="true" />;
}

export function FeaturedCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const { tx } = useLang();
  const contain = p.coverFit === 'contain';
  return (
    <button className={`fcard${contain ? ' fcard--light' : ''}`} onClick={onOpen} style={contain ? { background: p.coverBg } : undefined} aria-label={`${tx(p.title)} — ${tx(p.short)}`}>
      <div className={`fcard__media${p.loop ? '' : contain ? ' fcard__media--contain' : ' fcard__media--kb'}`}>
        {p.loop ? <LoopVideo src={p.loop} poster={p.cover} /> : <img src={p.cover} alt="" loading="lazy" />}
      </div>
      <div className="fcard__gloss" />
      <div className="fcard__top">
        <span className="fcard__cat">{tx(p.category)}</span>
        {p.badge && <span className="badge">{tx(p.badge)}</span>}
      </div>
      <div className="fcard__info">
        <h3 className="fcard__title">{tx(p.title)}</h3>
        <p className="fcard__short">{tx(p.short)}</p>
        <span className="fcard__go">{tx(ui.viewCase)} <IArrow /></span>
      </div>
    </button>
  );
}

export function MoreCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const { tx } = useLang();
  return (
    <button className="mcard" onClick={onOpen}>
      <div className={`mcard__img${p.coverFit === 'contain' ? ' mcard__img--contain' : ''}`}>
        <img src={p.cover} alt="" loading="lazy" />
      </div>
      <div className="mcard__body">
        <div className="mcard__cat">{tx(p.category)}</div>
        <div className="mcard__title">{tx(p.title)}</div>
        <p className="mcard__short">{tx(p.short)}</p>
      </div>
    </button>
  );
}
