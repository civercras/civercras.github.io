import { useState } from 'react';
import { contact, cvUrl, education, experience, languages, skills, strengths } from '../data/about';
import { ui, useLang } from '../i18n';
import type { Open } from '../nav';
import { ICopy, IDownload, IGithub, ILinkedin, IMail } from './Icons';

export function useCopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = contact.email; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch { /* nada */ }
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return { copied, copy };
}

export function AboutView({ open }: { open: Open }) {
  const { tx, lang } = useLang();
  const { copied, copy } = useCopyEmail();
  const es = lang === 'es';

  return (
    <article className="ab">
      <header className="ab__hero">
        <div className="ab__avatar"><img src="img/avatar.webp" alt="Pablo Grasa" /></div>
        <div>
          <h1>Pablo Grasa</h1>
          <p className="role">{tx(ui.tagline)}</p>
          <p className="bio">
            {es
              ? 'Ingeniero de diseño industrial especializado en UX/UI. Combino el pensamiento técnico de la ingeniería de producto con la visión centrada en el usuario del diseño de interfaces: prototipado de alta fidelidad, investigación con usuarios y sistemas de componentes en Figma.'
              : 'Industrial design engineer specialised in UX/UI. I combine the technical thinking of product engineering with the user-centred view of interface design: high-fidelity prototyping, user research and component systems in Figma.'}
          </p>
          <div className="ab__btns">
            <a className="btn btn--green" href={cvUrl(lang)} download><IDownload /> {tx(ui.downloadCv)}</a>
            <a className="btn btn--glass" href={contact.linkedin} target="_blank" rel="noopener noreferrer"><ILinkedin /> LinkedIn</a>
            <button className="btn btn--glass" onClick={copy}>{copied ? '✓ ' + tx(ui.copied) : <><IMail /> {contact.email}</>}</button>
          </div>
        </div>
      </header>

      <div className="pv__wrap">
        <section className="blk">
          <h3 className="blk__h">{es ? 'Qué aporto' : 'What I bring'}</h3>
          <div className="cards">
            {strengths.map((s, i) => (
              <div className="card" key={i}><div className="card__icon" aria-hidden="true">{s.icon}</div><h4>{tx(s.title)}</h4><p>{tx(s.text)}</p></div>
            ))}
          </div>
        </section>

        <section className="blk">
          <h3 className="blk__h">{es ? 'Experiencia' : 'Experience'}</h3>
          <div className="tl">
            {experience.map((e, i) => (
              <div className="tl__i" key={i}>
                <div className="tl__top">
                  <div><h4>{tx(e.title)}</h4><div className="tl__co">{e.company}</div></div>
                  <span className="tl__p">{tx(e.period)}</span>
                </div>
                <ul>{e.bullets.map((x, j) => <li key={j}>{tx(x)}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <section className="blk">
          <h3 className="blk__h">{es ? 'Formación' : 'Education'}</h3>
          <div className="edu">
            {education.map((e, i) => (
              <div key={i}><div><b>{tx(e.degree)}</b><span>{e.school}</span>{'note' in e && e.note && <span style={{ display: 'block', marginTop: 4 }}>{tx(e.note)}</span>}</div><span className="tl__p">{e.period}</span></div>
            ))}
          </div>
        </section>

        <section className="blk">
          <h3 className="blk__h">{es ? 'Herramientas y habilidades' : 'Tools & skills'}</h3>
          <div className="skills">
            {skills.map((g, i) => (
              <div key={i}>
                <h4>{tx(g.group)}</h4>
                <div className="chips">{g.items.map((s, j) => <span className="chip" key={j}>{tx(s)}</span>)}</div>
              </div>
            ))}
            <div>
              <h4>{es ? 'Idiomas' : 'Languages'}</h4>
              <div className="chips">{languages.map((l, j) => <span className="chip" key={j}><b>{tx(l.name)}</b>&nbsp;· {tx(l.level)}</span>)}</div>
            </div>
          </div>
        </section>

        <section className="blk">
          <h3 className="blk__h">{tx(ui.cv)}</h3>
          <p className="txt" style={{ marginBottom: 12 }}>
            {es ? 'Disponible en ' : 'Available in '}
            <a href={contact.cv} download>{es ? 'español' : 'Spanish'}</a>{es ? ' e ' : ' and '}<a href={contact.cvEn} download>{es ? 'inglés' : 'English'}</a>.
          </p>
          <div className="cvpages">
            {(lang === 'en' ? ['img/cv-1-en.webp', 'img/cv-2-en.webp'] : ['img/cv-1.webp', 'img/cv-2.webp']).map((src, i) => (
              <a key={src} className="gitem" href={cvUrl(lang)} target="_blank" rel="noopener noreferrer" aria-label={`${tx(ui.viewCv)} ${i + 1}`}>
                <img src={src} alt={`CV ${i + 1}/2`} loading="lazy" />
              </a>
            ))}
          </div>
        </section>

        <section className="blk">
          <div className="cta">
            <div>
              <h3>{es ? '¿Hablamos?' : 'Shall we talk?'}</h3>
              <p>{es ? 'Si te interesa mi trabajo o quieres colaborar en un proyecto, escríbeme.' : "If you like my work or want to collaborate on a project, get in touch."}</p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn btn--glass" onClick={copy}><ICopy /> {copied ? tx(ui.copied) : tx(ui.copyEmail)}</button>
              <a className="btn btn--glass" href={contact.github} target="_blank" rel="noopener noreferrer"><IGithub /> GitHub</a>
              <button className="btn btn--glass" onClick={() => open({ kind: 'showcase' })}>{tx(ui.allProjects)}</button>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

export function ContactView() {
  const { tx, lang } = useLang();
  const { copied, copy } = useCopyEmail();
  const es = lang === 'es';
  const grad = (a: string, b2: string) => ({ background: `linear-gradient(180deg, ${a}, ${b2})` });
  return (
    <div className="ct">
      <h2>{tx(ui.contact)}</h2>
      <p>{es ? 'Si tienes una pregunta o quieres trabajar juntos, escríbeme. Suelo responder en 24–48 h.' : 'If you have a question or want to work together, get in touch. I usually reply within 24–48 h.'}</p>
      <div className="ct__row">
        <div className="ct__ic" style={grad('#5fd8ff', '#0a6fd6')}><IMail /></div>
        <div><b>Email</b><span>{contact.email}</span></div>
        <button className="btn btn--sm" onClick={copy}>{copied ? tx(ui.copied) : tx(ui.copyEmail)}</button>
      </div>
      <a className="ct__row" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
        <div className="ct__ic" style={grad('#4aa8ff', '#0a59b0')}><ILinkedin /></div>
        <div><b>LinkedIn</b><span>/in/pablo-grasa-mateo</span></div>
      </a>
      <a className="ct__row" href={contact.github} target="_blank" rel="noopener noreferrer">
        <div className="ct__ic" style={grad('#6c7f95', '#1f2c3a')}><IGithub /></div>
        <div><b>GitHub</b><span>github.com/civercras</span></div>
      </a>
      <a className="ct__row" href={cvUrl(lang)} download>
        <div className="ct__ic" style={grad('#b8f56a', '#16902a')}><IDownload /></div>
        <div><b>{tx(ui.downloadCv)}</b><span>{lang === 'en' ? 'CV_PabloGrasa_EN.pdf' : 'CV_PabloGrasa.pdf'}</span></div>
      </a>
      <p style={{ fontSize: '.88rem', color: 'var(--ink-3)' }}>📍 {tx(ui.location)}</p>
    </div>
  );
}
