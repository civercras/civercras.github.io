import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'es' | 'en';
/** Texto bilingüe */
export type T = { es: string; en: string };
export const b = (es: string, en: string): T => ({ es, en });

type Ctx = { lang: Lang; setLang: (l: Lang) => void; tx: (t: T | string | undefined) => string };
const LangCtx = createContext<Ctx | null>(null);

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('pg-lang');
    if (saved === 'es' || saved === 'en') return saved;
  } catch { /* sin almacenamiento */ }
  const nav = (typeof navigator !== 'undefined' && navigator.language) || 'es';
  return nav.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem('pg-lang', l); } catch { /* nada */ }
  };
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const tx = (t: T | string | undefined) => (t == null ? '' : typeof t === 'string' ? t : t[lang]);
  return <LangCtx.Provider value={{ lang, setLang, tx }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const c = useContext(LangCtx);
  if (!c) throw new Error('useLang fuera de LangProvider');
  return c;
}

/** Textos de la interfaz */
export const ui = {
  boot: b('Iniciando portfolio…', 'Starting portfolio…'),
  bootSkip: b('Pulsa para entrar', 'Click to enter'),
  featured: b('Proyectos destacados', 'Featured projects'),
  featuredSub: b('Una selección de mis mejores trabajos. Pulsa cualquiera para ver el caso completo.', 'A selection of my best work. Click any of them to see the full case study.'),
  moreWork: b('Más trabajos', 'More work'),
  moreWorkSub: b('Diseño web, identidad visual, cartelería, fotografía e ingeniería de producto.', 'Web design, visual identity, posters, photography and product engineering.'),
  open: b('Abrir', 'Open'),
  viewCase: b('Ver caso', 'View case'),
  about: b('Sobre mí', 'About me'),
  contact: b('Contacto', 'Contact'),
  cv: b('Currículum', 'Résumé'),
  downloadCv: b('Descargar CV', 'Download CV'),
  viewCv: b('Ver CV', 'View CV'),
  allProjects: b('Todos los proyectos', 'All projects'),
  start: b('Inicio', 'Start'),
  close: b('Cerrar', 'Close'),
  minimize: b('Minimizar', 'Minimize'),
  maximize: b('Maximizar', 'Maximize'),
  restore: b('Restaurar', 'Restore'),
  back: b('Volver', 'Back'),
  role: b('Rol', 'Role'),
  year: b('Año', 'Year'),
  type: b('Tipo', 'Type'),
  tools: b('Herramientas', 'Tools'),
  available: b('Disponible para trabajar en UX/UI', 'Available for UX/UI roles'),
  hello: b('Hola, soy Pablo', "Hi, I'm Pablo"),
  tagline: b('Diseñador UX/UI e ingeniero de diseño industrial', 'UX/UI designer & industrial design engineer'),
  pitch: b(
    'Combino el pensamiento técnico de la ingeniería de producto con el diseño centrado en el usuario. Investigo, prototipo, testeo… y a veces lo convierto en una app real.',
    'I combine the technical thinking of product engineering with user-centred design. I research, prototype, test… and sometimes turn it into a real app.'
  ),
  copyEmail: b('Copiar email', 'Copy email'),
  copied: b('¡Copiado!', 'Copied!'),
  language: b('Cambiar idioma', 'Change language'),
  tipOpen: b('Doble clic para abrir', 'Double-click to open'),
  desktopHint: b('Arrastra las ventanas, ábrelas desde el escritorio o desde Inicio', 'Drag windows around, open them from the desktop or the Start menu'),
  works: b('trabajos', 'works'),
  menuSearch: b('Buscar proyectos…', 'Search projects…'),
  noResults: b('Sin resultados', 'No results'),
  share: b('Copiar enlace', 'Copy link'),
  linkCopied: b('Enlace copiado', 'Link copied'),
  next: b('Siguiente proyecto', 'Next project'),
  location: b('España', 'Spain'),
  now: b('Ahora', 'Now'),
};
