import { b, type T } from '../i18n';

const img = (n: string) => `img/${n}`;
const media = (n: string) => `media/${n}`;

export type Link = { label: T; href: string; kind?: 'figma' | 'github' | 'download' | 'web' | 'slides' | 'instagram' };

export type Block =
  | { t: 'lead'; title?: T; text: T }
  | { t: 'stats'; title?: T; items: { v: string; l: T }[] }
  | { t: 'section'; title: T; text?: T; bullets?: T[] }
  | { t: 'cards'; title: T; items: { icon?: string; title: T; text: T }[]; tone?: 'findings' }
  | { t: 'steps'; title: T; items: { title: T; text: T; result?: T }[] }
  | { t: 'decisions'; title: T; items: { title: T; why: T; how: T }[] }
  | { t: 'quotes'; title: T; items: { q: T; who: T }[] }
  | { t: 'image'; src: string; alt: T; caption?: T; fit?: 'cover' | 'contain'; bg?: string }
  | { t: 'gallery'; title?: T; layout: 'phones' | 'masonry' | 'grid'; items: { src: string; title?: T; text?: T }[] }
  | { t: 'video'; src: string; poster?: string; caption?: T; vertical?: boolean }
  | { t: 'embed'; src: string; title: T; ratio?: string; heading?: T; caption?: T }
  | { t: 'note'; text: T; tone?: 'info' | 'lock' }
  | { t: 'cta'; title: T; text?: T };

export type Project = {
  id: string;
  title: string | T;
  category: T;
  short: T;
  badge?: T;
  year?: string;
  role?: T;
  type?: T;
  tools?: string[];
  tags: T[];
  cover: string;
  coverFit?: 'cover' | 'contain';
  coverBg?: string;
  /** vídeo en bucle para la tarjeta destacada */
  loop?: string;
  icon: string;
  accent: string;
  links?: Link[];
  blocks: Block[];
  featured?: boolean;
};

export const projects: Project[] = [
  /* ───────────────────────── BASEHUB ───────────────────────── */
  {
    id: 'basehub',
    title: 'BaseHub',
    featured: true,
    category: b('UX/UI · App móvil', 'UX/UI · Mobile app'),
    short: b(
      'App para que los nómadas digitales encuentren dónde trabajar en menos de 2 minutos.',
      'An app that helps digital nomads find a place to work in under 2 minutes.'
    ),
    badge: b('SUS 81 · Excelente', 'SUS 81 · Excellent'),
    year: '2025',
    role: b('UX/UI Designer (en solitario)', 'UX/UI Designer (solo)'),
    type: b('Design Sprint · iOS / Android', 'Design Sprint · iOS / Android'),
    tools: ['Figma', 'FigJam', 'Maze'],
    tags: [b('Investigación', 'Research'), b('Testing', 'Testing'), b('Design System', 'Design System')],
    cover: img('basehub-cover.webp'),
    icon: img('basehub-mascot.webp'),
    accent: '#c9852f',
    links: [
      {
        label: b('Probar el prototipo', 'Try the prototype'),
        href: 'https://www.figma.com/proto/6gqHxyPgSo9AZkkAlwnGyI/PabloGrasa-Prototipo-Proyecto-App-N%C3%B3madas-Digitales?node-id=0-1&t=BXvFuq46LlK6ltwz-1',
        kind: 'figma',
      },
    ],
    blocks: [
      {
        t: 'lead',
        title: b('El problema', 'The problem'),
        text: b(
          'Los nómadas digitales pierden entre 30 y 90 minutos al día buscando un sitio donde trabajar. Google Maps o Yelp no dicen nada de la velocidad del WiFi, el ruido, los enchufes o si se puede hacer una videollamada. El resultado: decisiones a ciegas, interrupciones y jornadas perdidas.',
          'Digital nomads lose 30 to 90 minutes a day looking for somewhere to work. Google Maps or Yelp say nothing about WiFi speed, noise, power outlets or whether you can take a video call. The result: blind decisions, interruptions and wasted days.'
        ),
      },
      {
        t: 'embed',
        src: 'https://www.figma.com/embed?embed_host=share&url=' + encodeURIComponent('https://www.figma.com/proto/6gqHxyPgSo9AZkkAlwnGyI/PabloGrasa-Prototipo-Proyecto-App-N%C3%B3madas-Digitales?node-id=0-1&scaling=scale-down&content-scaling=fixed'),
        title: b('Prototipo interactivo de BaseHub', 'BaseHub interactive prototype'),
        heading: b('Pruébala aquí mismo', 'Try it right here'),
        caption: b('Prototipo navegable en Figma: toca los botones como en el móvil.', 'Clickable Figma prototype: tap through it like on a phone.'),
        ratio: '16 / 11',
      },
      {
        t: 'stats',
        title: b('Investigación', 'Research'),
        items: [
          { v: '5', l: b('Entrevistas en profundidad', 'In-depth interviews') },
          { v: '62', l: b('Respuestas a la encuesta', 'Survey responses') },
          { v: '12', l: b('Sesiones de usability testing', 'Usability testing sessions') },
          { v: '3', l: b('Iteraciones del prototipo', 'Prototype iterations') },
        ],
      },
      {
        t: 'cards',
        title: b('Insights clave', 'Key insights'),
        items: [
          { icon: '📶', title: b('El WiFi manda', 'WiFi rules'), text: b('El 78% citó la velocidad de conexión como factor nº1, por encima del precio o la estética. Ninguna app la muestra con claridad.', '78% named connection speed as the #1 factor, above price or looks. No app shows it clearly.') },
          { icon: '😟', title: b('La incertidumbre duele', 'Uncertainty hurts'), text: b('No querían saber que un sitio "estaba bien", sino qué iban a encontrar al llegar.', 'They didn’t want to know a place was "fine" — they wanted to know what they’d find when they got there.') },
          { icon: '💬', title: b('Las reseñas genéricas no sirven', 'Generic reviews are useless'), text: b('"Buen café, ambiente tranquilo" no ayuda. Necesitan enchufes por mesa, ruido, zona de llamadas y Mbps reales.', '"Nice coffee, quiet vibe" doesn’t help. They need outlets per table, noise, call areas and real Mbps.') },
          { icon: '🏅', title: b('La gamificación da confianza', 'Gamification builds trust'), text: b('Confiaban más en reseñas de perfiles con historial verificado.', 'They trusted reviews from profiles with a verified history much more.') },
        ],
      },
      {
        t: 'steps',
        title: b('Proceso de diseño', 'Design process'),
        items: [
          {
            title: b('Definición y mapa de empatía', 'Definition & empathy map'),
            text: b('Agrupé los hallazgos en un affinity diagram: fiabilidad, rapidez de decisión, filtros específicos y comunidad. HMW: ¿cómo podríamos ayudar a los nómadas a decidir con confianza en menos de 2 minutos?', 'I clustered findings in an affinity diagram: reliability, decision speed, specific filters and community. HMW: how might we help nomads choose a space confidently in under 2 minutes?'),
            result: b('HMW validado por 3 usuarios · 12 citas reales en el mapa de empatía', 'HMW validated by 3 users · 12 real quotes in the empathy map'),
          },
          {
            title: b('Arquitectura de información', 'Information architecture'),
            text: b('Card sorting con 8 participantes: organizaban los espacios por "tipo de trabajo" (concentración, reunión, llamada), no por tipo de local. Eso cambió toda la lógica de filtrado.', 'Card sorting with 8 participants: they grouped spaces by "type of work" (focus, meeting, call), not by venue type. That changed the whole filtering logic.'),
            result: b('El filtro por tipo de trabajo pasó a ser el centro de la búsqueda', 'Filtering by type of work became the core of search'),
          },
          {
            title: b('Wireframes lo-fi y mid-fi', 'Lo-fi & mid-fi wireframes'),
            text: b('Bocetos en papel y wireframes en grises. El primer test (4 usuarios) mostró que filtrar costaba 5 toques y que el CTA principal no se veía.', 'Paper sketches and greyscale wireframes. The first test (4 users) showed filtering took 5 taps and the main CTA was hard to see.'),
            result: b('De 5 a 2 toques · éxito en tarea del 58% al 83%', 'From 5 to 2 taps · task success from 58% to 83%'),
          },
          {
            title: b('Diseño visual y componentes', 'Visual design & components'),
            text: b('Paleta de tierras y ocres, estética cartoon retro con mascota propia y sistema de componentes con variantes y Auto Layout.', 'Earthy ochre palette, retro cartoon look with its own mascot and a component system with variants and Auto Layout.'),
            result: b('34 componentes reutilizables con variantes', '34 reusable components with variants'),
          },
          {
            title: b('Prototipo hi-fi y testing final', 'Hi-fi prototype & final testing'),
            text: b('Dos rondas más de testing: reubiqué "Escribir reseña" (invisible para el 75%), añadí confirmación al guardar favoritos y reduje el onboarding de 5 a 3 pantallas.', 'Two more testing rounds: moved "Write review" (invisible to 75%), added feedback when saving favourites and cut onboarding from 5 to 3 screens.'),
            result: b('92% completa el flujo sin ayuda · SUS 81/100', '92% complete the flow unaided · SUS 81/100'),
          },
        ],
      },
      { t: 'image', src: img('basehub-screens.webp'), alt: b('Pantallas de BaseHub', 'BaseHub screens'), fit: 'cover' },
      {
        t: 'decisions',
        title: b('Decisiones de diseño', 'Design decisions'),
        items: [
          { title: b('El mapa es la pantalla principal', 'The map is the home screen'), why: b('El 68% miraba primero la ubicación antes que la descripción o la valoración.', '68% looked at location first, before description or rating.'), how: b('Inicio directo en el mapa con tarjetas flotantes de espacios cercanos.', 'Home opens straight on the map with floating cards of nearby spaces.') },
          { title: b('Métricas antes que el nombre', 'Metrics before the name'), why: b('Los usuarios saltaban directos a los iconos de WiFi, ruido y enchufes.', 'Users jumped straight to the WiFi, noise and outlet icons.'), how: b('Bloque de métricas en la cabecera de cada ficha, con iconografía propia y valores reales.', 'Metrics block at the top of every listing, with custom icons and real values.') },
          { title: b('Reputación visible del revisor', 'Visible reviewer reputation'), why: b('El escepticismo ante reseñas anónimas frenaba la confianza.', 'Scepticism about anonymous reviews was the main trust barrier.'), how: b('Avatar, nº de reseñas y badge de nómada verificado en cada valoración.', 'Avatar, review count and verified-nomad badge on every review.') },
          { title: b('Onboarding de 3 pasos', '3-step onboarding'), why: b('El 60% abandonaba el onboarding original.', '60% dropped out of the original onboarding.'), how: b('Solo pregunta tipo de trabajo y ciudad; el resto se configura después.', 'It only asks for type of work and city; everything else comes later.') },
        ],
      },
      {
        t: 'stats',
        title: b('Resultados', 'Results'),
        items: [
          { v: '92%', l: b('Completitud de la tarea principal', 'Main task completion') },
          { v: '81', l: b('SUS Score (>80 = excelente)', 'SUS score (>80 = excellent)') },
          { v: '−67%', l: b('Pasos para una búsqueda filtrada', 'Steps for a filtered search') },
          { v: '−40%', l: b('Tiempo de decisión (test A/B)', 'Decision time (A/B test)') },
        ],
      },
      {
        t: 'gallery',
        title: b('Identidad', 'Identity'),
        layout: 'grid',
        items: [
          { src: img('basehub-mascot.webp'), title: b('Mascota de la app', 'App mascot') },
          { src: img('poster-basehub.webp'), title: b('Cartel publicitario (Photoshop)', 'Advertising poster (Photoshop)') },
        ],
      },
      {
        t: 'section',
        title: b('Aprendizajes', 'Learnings'),
        bullets: [
          b('La organización mental de los usuarios rara vez coincide con la lógica de negocio: el card sorting fue decisivo.', 'Users’ mental models rarely match business logic — card sorting was decisive.'),
          b('Testear pronto en papel ahorró trabajo: corregir esos fallos en hi-fi habría costado el doble.', 'Testing early on paper saved work: fixing those issues in hi-fi would have cost twice as much.'),
          b('La gamificación funciona cuando resuelve un problema real (la confianza), no cuando se añade por moda.', 'Gamification works when it solves a real problem (trust), not when it’s added because it’s trendy.'),
        ],
      },
      { t: 'cta', title: b('¿Quieres recorrer la app?', 'Want to walk through the app?'), text: b('Prototipo interactivo con todos los flujos navegables en Figma.', 'Interactive prototype with every flow clickable in Figma.') },
    ],
  },

  /* ───────────────────────── COCOON ───────────────────────── */
  {
    id: 'cocoon',
    title: 'Cocoon',
    featured: true,
    category: b('Accesibilidad · Auditoría UX', 'Accessibility · UX audit'),
    short: b(
      'Auditoría express de accesibilidad web con análisis WCAG 2.1 y un plan de mejoras priorizado.',
      'Express web accessibility audit with a WCAG 2.1 analysis and a prioritised improvement plan.'
    ),
    badge: b('WCAG 2.1', 'WCAG 2.1'),
    year: '2025',
    role: b('Auditor UX de accesibilidad', 'UX accessibility auditor'),
    type: b('Auditoría express', 'Express audit'),
    tools: ['WCAG 2.1', 'Figma Slides'],
    tags: [b('Accesibilidad', 'Accessibility'), b('WCAG', 'WCAG'), b('Auditoría', 'Audit')],
    cover: img('cocoon-cover.webp'),
    coverFit: 'contain',
    coverBg: '#ffffff',
    icon: img('cocoon-icon.svg'),
    accent: '#8cbf1f',
    links: [
      { label: b('Ver la presentación completa', 'View the full presentation'), href: 'https://www.figma.com/deck/06SriGJswkvbL1aFTmJtlY/AuditoriaGrupoOnline?node-id=1-32&t=2BpmVejykS2fjl9c-1', kind: 'figma' },
    ],
    blocks: [
      {
        t: 'lead',
        title: b('Sobre el proyecto', 'About the project'),
        text: b(
          'Cocoon es una plataforma web que necesitaba una evaluación integral de accesibilidad. Hice una auditoría express que identificó las barreras y propuso soluciones prácticas para que la web pueda usarla cualquier persona, sean cuales sean sus capacidades.',
          'Cocoon is a web platform that needed a full accessibility review. I ran an express audit that identified the barriers and proposed practical fixes so anyone can use the site, whatever their abilities.'
        ),
      },
      {
        t: 'embed',
        src: 'https://www.figma.com/embed?embed_host=share&url=' + encodeURIComponent('https://www.figma.com/deck/06SriGJswkvbL1aFTmJtlY/AuditoriaGrupoOnline?node-id=1-32'),
        title: b('Presentación de la auditoría de accesibilidad', 'Accessibility audit presentation'),
        heading: b('La auditoría completa', 'The full audit'),
        caption: b('Todos los hallazgos, con capturas, criterios WCAG y propuestas de mejora. Usa las flechas para avanzar.', 'Every finding, with screenshots, WCAG criteria and proposed fixes. Use the arrows to move through it.'),
      },
      {
        t: 'cards',
        title: b('Qué incluye la auditoría', 'What the audit covers'),
        items: [
          { icon: '🔎', title: b('Análisis WCAG 2.1', 'WCAG 2.1 analysis'), text: b('Revisión completa frente a los criterios de las pautas WCAG 2.1.', 'Full review against the WCAG 2.1 success criteria.') },
          { icon: '🚧', title: b('Barreras críticas', 'Critical barriers'), text: b('Identificación de lo que impide acceder a funciones esenciales.', 'Identifying what blocks access to essential features.') },
          { icon: '📋', title: b('Recomendaciones priorizadas', 'Prioritised recommendations'), text: b('Cada problema con su solución, ordenado por impacto.', 'Every issue paired with a fix, ordered by impact.') },
          { icon: '🪜', title: b('Plan paso a paso', 'Step-by-step plan'), text: b('Un plan de implementación claro para el equipo.', 'A clear implementation plan for the team.') },
        ],
      },
      {
        t: 'cards',
        title: b('Cómo se clasifican los hallazgos', 'How findings are classified'),
        tone: 'findings',
        items: [
          { icon: '🔴', title: b('Problemas críticos', 'Critical issues'), text: b('Barreras que impiden el acceso a funcionalidades esenciales.', 'Barriers that block access to essential features.') },
          { icon: '🟠', title: b('Mejoras necesarias', 'Needed improvements'), text: b('Dificultan la experiencia pero no bloquean el acceso.', 'They hurt the experience but don’t block access.') },
          { icon: '🔵', title: b('Recomendaciones', 'Recommendations'), text: b('Sugerencias para optimizar la accesibilidad general.', 'Suggestions to improve overall accessibility.') },
          { icon: '🟢', title: b('Buenas prácticas', 'Good practices'), text: b('Lo que ya cumple los estándares y conviene mantener.', 'What already meets the standards and should be kept.') },
        ],
      },
      { t: 'note', text: b('La accesibilidad no es un extra: una web accesible es mejor para todo el mundo.', 'Accessibility isn’t an extra: an accessible website is better for everyone.') },
      { t: 'cta', title: b('Ver la auditoría completa', 'See the full audit'), text: b('La presentación con todos los hallazgos y capturas está en Figma.', 'The deck with every finding and screenshot is on Figma.') },
    ],
  },

  /* ───────────────────────── RIFTOS ───────────────────────── */
  {
    id: 'riftos',
    title: 'RiftOS',
    featured: true,
    category: b('UX/UI · Gaming', 'UX/UI · Gaming'),
    short: b(
      'App acompañante para League of Legends: matchups, seguimiento de LP y consejos personalizados.',
      'Companion app for League of Legends: matchups, LP tracking and personalised tips.'
    ),
    badge: b('94% éxito en tareas', '94% task success'),
    year: '2025',
    role: b('UX/UI Designer', 'UX/UI Designer'),
    type: b('Design Thinking · App acompañante', 'Design Thinking · Companion app'),
    tools: ['Figma', 'Maze'],
    tags: [b('Gaming', 'Gaming'), b('Diseño UI', 'UI design'), b('Componentes', 'Components')],
    cover: img('riftos-cover.webp'),
    icon: img('riftos-title.webp'),
    accent: '#c8aa6e',
    links: [
      { label: b('Iniciar el prototipo', 'Launch the prototype'), href: 'https://www.figma.com/proto/N1u7VubX98d6tU61YZSASk/PabloGrasa-Prototipo-Proyecto-Final?node-id=3-7&t=BXvFuq46LlK6ltwz-1', kind: 'figma' },
      { label: b('Ver la investigación completa', 'See the full research'), href: 'https://www.figma.com/deck/zpqseEQknou04pFan3Z8u7', kind: 'figma' },
    ],
    blocks: [
      {
        t: 'lead',
        text: b(
          'Un "sistema operativo" acompañante para League of Legends que imita el HUD del cliente del juego para que el jugador se sienta en casa. Añade lo que el juego no ofrece: análisis de matchups con contexto, LP ganados y perdidos y consejos según tu campeón.',
          'A companion "operating system" for League of Legends that mirrors the game client’s HUD so players feel at home. It adds what the game doesn’t offer: matchup analysis with context, LP gained and lost, and tips based on your champion.'
        ),
      },
      {
        t: 'stats',
        items: [
          { v: '5', l: b('Entrevistas', 'Interviews') },
          { v: '40', l: b('Encuestas', 'Surveys') },
          { v: '8', l: b('Tests en Maze', 'Maze tests') },
          { v: '15+', l: b('Jugadores testeados', 'Players tested') },
          { v: '92%', l: b('Satisfacción con el diseño', 'Design satisfaction') },
          { v: '94%', l: b('Éxito en tareas clave', 'Key task success') },
        ],
      },
      {
        t: 'embed',
        src: 'https://www.figma.com/embed?embed_host=share&url=' + encodeURIComponent('https://www.figma.com/deck/zpqseEQknou04pFan3Z8u7'),
        title: b('Presentación: investigación y proceso de RiftOS', 'Presentation: RiftOS research and process'),
        heading: b('Investigación y proceso', 'Research & process'),
        caption: b('Toda la investigación con jugadores, el análisis y la evolución del diseño. Usa las flechas para avanzar.', 'All the player research, analysis and design evolution. Use the arrows to move through it.'),
      },
      {
        t: 'cards',
        title: b('Funcionalidades', 'Features'),
        items: [
          { icon: '🎯', title: b('Selector de campeones', 'Champion select'), text: b('Análisis de matchups en tiempo real y recomendaciones estratégicas.', 'Real-time matchup analysis and strategic recommendations.') },
          { icon: '⚖️', title: b('Ventajas y desventajas', 'Advantages'), text: b('Cada enfrentamiento explicado según estadísticas y meta actual.', 'Each matchup explained from stats and the current meta.') },
          { icon: '📈', title: b('Seguimiento de LP', 'LP tracking'), text: b('Lo que LoL no enseña: cuánto ganas o pierdes en cada partida.', 'What LoL doesn’t show: how much you win or lose each game.') },
          { icon: '⏱️', title: b('Contadores de habilidades', 'Ability timers'), text: b('Cooldowns del rival para optimizar tu juego.', 'Enemy cooldowns to sharpen your play.') },
          { icon: '📱', title: b('Aceptar partida desde el móvil', 'Accept queue from phone'), text: b('Basado en código abierto ya aprobado por Riot.', 'Built on open-source tech already approved by Riot.') },
          { icon: '💡', title: b('Consejos personalizados', 'Personal tips'), text: b('Según tu campeón, estilo y situación de partida.', 'Based on your champion, playstyle and game state.') },
        ],
      },
      {
        t: 'quotes',
        title: b('Lo que dijeron los jugadores', 'What players said'),
        items: [
          { q: b('"Parece que nunca salí del cliente de LoL, se siente totalmente natural."', '"It feels like I never left the LoL client — totally natural."'), who: b('Platino IV', 'Platinum IV') },
          { q: b('"Por fin puedo ver cuántos LP gano o pierdo. Increíble que LoL no lo tenga."', '"Finally I can see how much LP I win or lose. Crazy that LoL doesn’t have it."'), who: b('Oro II', 'Gold II') },
          { q: b('"Los consejos de matchups son súper detallados, no solo números sin contexto."', '"The matchup tips are super detailed, not just numbers without context."'), who: b('Diamante III', 'Diamond III') },
        ],
      },
      {
        t: 'section',
        title: b('Filosofía de diseño y componentes', 'Design philosophy & components'),
        text: b(
          'Cada elemento se diseñó para integrarse con el juego: dorados hextech, azules, tipografía e iconografía del universo de LoL. El uso intensivo de componentes y variantes en Figma fue clave: sistema modular, estados, Auto Layout y prototipos con animaciones avanzadas.',
          'Every element was designed to blend in with the game: hextech golds, blues, typography and iconography from the LoL universe. Heavy use of Figma components and variants was key: a modular system, states, Auto Layout and prototypes with advanced animation.'
        ),
        bullets: [
          b('Análisis de competencia: Blitz, Mobalytics y U.GG', 'Competitive analysis: Blitz, Mobalytics and U.GG'),
          b('Las 5 fases del Design Thinking: empatizar, definir, idear, prototipar y testear', 'All 5 Design Thinking phases: empathise, define, ideate, prototype and test'),
          b('Biblioteca de iconos propia del universo LoL', 'Custom icon library for the LoL universe'),
        ],
      },
      { t: 'cta', title: b('Inicia el sistema', 'Boot the system'), text: b('Prototipo de alta fidelidad navegable y la presentación con toda la investigación, en Figma.', 'The clickable high-fidelity prototype and the deck with all the research, on Figma.') },
    ],
  },

  /* ───────────────────────── MANDO PC ───────────────────────── */
  {
    id: 'couchpad',
    title: 'Couchpad',
    featured: true,
    category: b('App real · Open source', 'Real app · Open source'),
    short: b(
      'Tu móvil como mando a distancia del PC desde el sofá. Diseñada pensando en el pulgar.',
      'Your phone as a couch remote for your PC. Designed around the thumb.'
    ),
    badge: b('v1.4', 'v1.4'),
    year: '2026',
    role: b('Diseño UX/UI y producto', 'UX/UI & product design'),
    type: b('App Windows + web móvil', 'Windows app + mobile web'),
    tools: ['Figma', 'Python', 'HTML/CSS/JS', 'GitHub Actions'],
    tags: [b('Producto real', 'Shipped product'), b('Leyes de UX', 'UX laws'), b('Microinteracciones', 'Micro-interactions')],
    cover: img('mandopc-hero.webp'),
    loop: media('mandopc-showcase.mp4'),
    icon: img('mandopc-icon.png'),
    accent: '#2b9be8',
    links: [
      { label: b('Ver en GitHub', 'View on GitHub'), href: 'https://github.com/civercras/pc-remote-app', kind: 'github' },
      { label: b('Descargar para Windows', 'Download for Windows'), href: 'https://github.com/civercras/pc-remote-app/releases/latest', kind: 'download' },
    ],
    blocks: [
      {
        t: 'lead',
        title: b('La idea', 'The idea'),
        text: b(
          'Couchpad (antes Mando PC) nace de una idea sencilla: controlar el PC desde el sofá o la cama sin levantarse: ratón, teclado, ventanas, volumen y apagado. Escaneas un QR y el móvil se convierte en un mando, por Wi-Fi local, sin cuentas ni servidores externos.',
          'Couchpad (formerly Mando PC) comes from a simple idea: control your PC from the couch or bed without getting up: mouse, keyboard, windows, volume and power. Scan a QR code and your phone becomes a remote — over local Wi-Fi, no accounts, no external servers.'
        ),
      },
      { t: 'video', src: media('mandopc-showcase.mp4'), poster: img('mandopc-poster.jpg'), caption: b('Demo de la app', 'App demo') },
      {
        t: 'cards',
        title: b('Leyes de UX aplicadas', 'UX laws applied'),
        items: [
          { icon: '👍', title: b('Fitts · zona del pulgar', 'Fitts · thumb zone'), text: b('Lo frecuente abajo, bajo el pulgar; lo poco usado arriba. En horizontal, a los lados.', 'Frequent actions at the bottom, under the thumb; rare ones up top. In landscape, on the sides.') },
          { icon: '🎛️', title: b('Hick · menos opciones', 'Hick · fewer choices'), text: b('Botones inteligentes que cambian según la app activa: solo lo que necesitas en cada momento.', 'Smart buttons that change with the active app: only what you need at each moment.') },
          { icon: '🧠', title: b('Miller y revelación progresiva', 'Miller & progressive disclosure'), text: b('Menú radial con 5 acciones; lo avanzado aparece al mantener pulsado.', 'Radial menu with 5 actions; advanced options appear on long press.') },
          { icon: '✨', title: b('Von Restorff y Jakob', 'Von Restorff & Jakob'), text: b('El botón central destaca; los gestos del trackpad son los que ya conoces.', 'The central button stands out; trackpad gestures are the ones you already know.') },
        ],
      },
      {
        t: 'gallery',
        title: b('Pantallas', 'Screens'),
        layout: 'phones',
        items: [
          { src: img('mandopc-home-aero.webp'), title: b('Tema Frutiger Aero', 'Frutiger Aero theme') },
          { src: img('mandopc-home-dark.webp'), title: b('Tema oscuro', 'Dark theme') },
          { src: img('mandopc-radial.webp'), title: b('Menú radial', 'Radial menu') },
          { src: img('mandopc-volume.webp'), title: b('Volumen tipo iOS/Samsung', 'iOS/Samsung-style volume') },
          { src: img('mandopc-screen.webp'), title: b('Modo cine', 'Cinema mode') },
          { src: img('mandopc-tv.webp'), title: b('Sección TV editable', 'Editable TV section') },
          { src: img('mandopc-dial.webp'), title: b('Dial de ventanas', 'Window dial') },
          { src: img('mandopc-tutorial.webp'), title: b('Tutorial interactivo', 'Interactive tutorial') },
          { src: img('mandopc-luna.webp'), title: b('Tema secreto "Luna"', 'Secret "Luna" theme') },
          { src: img('mandopc-settings.webp'), title: b('Ajustes', 'Settings') },
        ],
      },
      {
        t: 'section',
        title: b('Funciones principales', 'Main features'),
        bullets: [
          b('Trackpad con gestos de 1, 2 y 3 dedos, pellizco, scroll en el borde e inercia.', 'Trackpad with 1-, 2- and 3-finger gestures, pinch, edge scroll and inertia.'),
          b('Dial de ventanas: toque = Alt+Tab; mantener y deslizar = carrusel con los iconos reales de las apps.', 'Window dial: tap = Alt+Tab; hold and slide = carousel with the apps’ real icons.'),
          b('Tarjeta de la app activa con botones inteligentes para navegador, vídeo, música, PowerPoint…', 'Active-app card with smart buttons for browser, video, music, PowerPoint…'),
          b('Vista de pantalla ("modo cine") con clic directo, lupa y zoom.', 'Screen view ("cinema mode") with direct click, magnifier and zoom.'),
          b('Energía segura: apagar con pulsación larga y 10 s para cancelar.', 'Safe power: shut down with a long press and 10 s to cancel.'),
          b('Interfaz en español e inglés (desde la v1.1), según el idioma del móvil.', 'Spanish and English interface (since v1.1), following the phone’s language.'),
          b('Doble toque y arrastrar como en el touchpad de un portátil, también en la vista de pantalla (v1.4).', 'Double tap and drag like a laptop touchpad, in screen view too (v1.4).'),
          b('Nombre de red fijo en casa: el acceso directo del móvil ya no se rompe si cambia la IP del PC (v1.3).', 'Fixed network name at home: the phone shortcut no longer breaks when the PC’s IP changes (v1.3).'),
          b('Vibración distinta por acción y respeto a "reducir movimiento".', 'Distinct vibration per action and respect for "reduce motion".'),
        ],
      },
      {
        t: 'note',
        text: b(
          'La programación está asistida por IA. El diseño, la experiencia de usuario y todas las decisiones de producto son mías.',
          'The coding was AI-assisted. The design, the user experience and every product decision are mine.'
        ),
      },
      { t: 'cta', title: b('Pruébala', 'Try it'), text: b('Gratis y de código abierto (MIT). Descarga el .exe y escanea el QR.', 'Free and open source (MIT). Download the .exe and scan the QR code.') },
    ],
  },

  /* ───────────────────────── BOOKREADER ───────────────────────── */
  {
    id: 'bookreader',
    title: 'BookReader',
    featured: true,
    category: b('App Android · Open source', 'Android app · Open source'),
    short: b(
      'Lector de EPUB con lectura rápida ORP: una palabra cada vez, con la letra clave resaltada.',
      'EPUB reader with ORP speed reading: one word at a time, key letter highlighted.'
    ),
    badge: b('Experimental', 'Experimental'),
    role: b('Diseño UX/UI y producto', 'UX/UI & product design'),
    type: b('App Android', 'Android app'),
    tools: ['Figma', 'React Native', 'Expo', 'TypeScript'],
    tags: [b('Gestos', 'Gestures'), b('Háptica', 'Haptics'), b('Privacidad', 'Privacy')],
    cover: img('bookreader-cover.webp'),
    icon: img('bookreader-reader.webp'),
    accent: '#d6303a',
    links: [{ label: b('Ver en GitHub', 'View on GitHub'), href: 'https://github.com/civercras/BookReader-app', kind: 'github' }],
    blocks: [
      {
        t: 'lead',
        text: b(
          'App Android experimental de código abierto para leer EPUB con la técnica ORP (Optimal Recognition Point): resalta en rojo la letra central de cada palabra para fijar la mirada y leer más rápido sin mover los ojos de lado a lado.',
          'An experimental open-source Android app to read EPUBs with the ORP (Optimal Recognition Point) technique: it highlights each word’s central letter in red so your eyes stay fixed and you read faster without side-to-side movement.'
        ),
      },
      {
        t: 'cards',
        title: b('El reto', 'The challenge'),
        items: [
          { icon: '⏱️', title: b('Leer más rápido en el móvil', 'Read faster on a phone'), text: b('La pantalla pequeña obliga a mover mucho los ojos y a hacer scroll constante, lo que cansa y frena la lectura.', 'A small screen means lots of eye movement and constant scrolling, which is tiring and slows reading down.') },
          { icon: '🧠', title: b('Sin perder comprensión', 'Without losing comprehension'), text: b('La lectura rápida suele hacer que pierdas el hilo. Había que ofrecer una forma fácil de volver al texto completo.', 'Speed reading often makes you lose the thread. There had to be an easy way back to the full text.') },
          { icon: '👆', title: b('Control con una mano', 'One-handed control'), text: b('Pausar, retroceder o ajustar la velocidad sin buscar botones pequeños: gestos sobre toda la pantalla.', 'Pause, rewind or change speed without hunting for small buttons: gestures across the whole screen.') },
        ],
      },
      {
        t: 'gallery',
        title: b('Pantallas', 'Screens'),
        layout: 'phones',
        items: [
          { src: img('bookreader-library.webp'), title: b('Biblioteca', 'Library') },
          { src: img('bookreader-reader.webp'), title: b('Lectura ORP', 'ORP reading') },
          { src: img('bookreader-speed.webp'), title: b('Aceleración progresiva', 'Progressive speed') },
          { src: img('bookreader-context.webp'), title: b('Modo contexto', 'Context mode') },
          { src: img('bookreader-settings.webp'), title: b('Ajustes y tema oscuro', 'Settings & dark theme') },
        ],
      },
      { t: 'video', src: media('bookreader-promo.mp4'), poster: img('bookreader-library.webp'), vertical: true, caption: b('Vídeo promocional', 'Promo video') },
      {
        t: 'cards',
        title: b('Funcionalidades', 'Features'),
        items: [
          { icon: '🚀', title: b('Aceleración progresiva', 'Progressive speed-up'), text: b('Curva ease-out que arranca suave y sube hasta tu ritmo objetivo, para no desorientar al empezar.', 'An ease-out curve that starts gently and ramps up to your target pace, so starting isn’t disorienting.') },
          { icon: '👁️', title: b('Modo contexto', 'Context mode'), text: b('Ve el párrafo en lectura tradicional y toca cualquier palabra para retomar desde ahí.', 'See the paragraph in normal reading and tap any word to resume from there.') },
          { icon: '👆', title: b('Control por gestos', 'Gesture control'), text: b('Deslizar como un dial, doble toque para saltar ±10 palabras, mantener para pausar y previsualizar.', 'Swipe like a dial, double-tap to jump ±10 words, hold to pause and preview.') },
          { icon: '📳', title: b('Respuesta háptica', 'Haptic feedback'), text: b('Vibraciones sutiles al cambiar de modo, llegar a límites o pausar.', 'Subtle vibrations when switching modes, hitting limits or pausing.') },
          { icon: '🔒', title: b('Privacidad total', 'Full privacy'), text: b('100% local: sin servidores, sin cuentas y sin recogida de datos.', '100% local: no servers, no accounts, no data collection.') },
        ],
      },
      {
        t: 'section',
        title: b('Decisiones UX', 'UX decisions'),
        bullets: [
          b('Estética minimalista para reducir distracciones durante la lectura.', 'Minimal look to reduce distractions while reading.'),
          b('Vocabulario gestual que imita controles físicos tipo dial o scrubber.', 'Gesture vocabulary that mimics physical dial or scrubber controls.'),
          b('El modo contexto hace de puente entre velocidad y comprensión.', 'Context mode bridges speed and comprehension.'),
          b('Tipografía PF DIN Stencil Pro Bold, coherente con los diseños en Figma.', 'PF DIN Stencil Pro Bold typeface, consistent with the Figma designs.'),
        ],
      },
      { t: 'note', text: b('La programación fue asistida por IA. El diseño, la maquetación y todas las decisiones de UX son de elaboración propia.', 'Coding was AI-assisted. The design, layout and every UX decision are my own.') },
    ],
  },

  /* ───────────────────────── BUBBLEPAD ───────────────────────── */
  {
    id: 'bubblepad',
    title: 'Bubblepad',
    category: b('App real · Open source', 'Real app · Open source'),
    short: b(
      'Soundboard para Windows que mezcla tu micro y tus sonidos en un solo micrófono para Discord y juegos.',
      'Windows soundboard that mixes your mic and your sounds into a single microphone for Discord and games.'
    ),
    badge: b('v0.4 · acceso anticipado', 'v0.4 · early access'),
    year: '2026',
    role: b('Diseño UX/UI y producto', 'UX/UI & product design'),
    type: b('App de escritorio para Windows', 'Windows desktop app'),
    tools: ['Python', 'PySide6', 'HTML/CSS/JS', 'GitHub Actions'],
    tags: [b('Producto real', 'Shipped product'), b('Audio', 'Audio'), b('UI con carácter', 'Characterful UI')],
    cover: img('bubblepad-chrome-day.webp'),
    icon: img('bubblepad-icon.png'),
    accent: '#2f6fd6',
    links: [
      { label: b('Ver en GitHub', 'View on GitHub'), href: 'https://github.com/civercras/bubblepad', kind: 'github' },
      { label: b('Descargar v0.4 (instalador o portable)', 'Download v0.4 (installer or portable)'), href: 'https://github.com/civercras/bubblepad/releases/tag/v0.4.0', kind: 'download' },
    ],
    blocks: [
      {
        t: 'lead',
        title: b('El problema', 'The problem'),
        text: b(
          'Discord y los juegos solo escuchan un micrófono. Para poner sonidos en una llamada necesitas mezclarlos con tu voz, y las soundboards que probé no me dejaban oír los sonidos a mí. Bubblepad se pone en medio: une tu micro real y tus efectos en un micrófono virtual, y a ti te deja oír los sonidos en los cascos sin escuchar tu propia voz.',
          'Discord and games only listen to one microphone. To play sounds in a call you have to mix them with your voice, and the soundboards I tried didn’t let me hear the sounds myself. Bubblepad sits in the middle: it joins your real mic and your effects into one virtual microphone, and lets you hear the sounds in your headphones without hearing your own voice.'
        ),
      },
      { t: 'image', src: img('bubblepad-chrome-day.webp'), alt: b('Bubblepad con el aspecto Chrome', 'Bubblepad with the Chrome look'), caption: b('Aspecto Chrome: un reproductor de los 2000 hecho soundboard', 'Chrome look: a 2000s media player turned soundboard'), fit: 'contain', bg: '#dfe9f7' },
      {
        t: 'section',
        title: b('Novedades de la v0.4', 'What’s new in v0.4'),
        bullets: [
          b('Páginas de sonidos en pestañas (cada una es una subcarpeta). Arrastras un sonido a una pestaña y la pestaña «se lo traga», con un pequeño rebote.', 'Sound pages in tabs (each one is a subfolder). Drag a sound onto a tab and the tab “gulps” it in, with a little spring.'),
          b('Muchos sonidos con pocas teclas: cada página tiene sus propios atajos. Al cambiar de página con un atajo suena un «plop» de burbuja que solo oyes tú (uno para la página 1, dos para la 2…), así sabes dónde estás sin mirar.', 'Many sounds, few keys: each page has its own hotkeys. When you switch page with a hotkey you hear a bubble “pop” only you can hear (one for page 1, two for page 2…), so you know where you are without looking.'),
          b('Los atajos funcionan dentro de League of Legends y otros juegos que bloquean los de las apps, sin ser administrador. Y los del teclado numérico, también con Bloq Num apagado.', 'Hotkeys work inside League of Legends and other games that block app shortcuts, without admin rights. Numpad hotkeys work with Num Lock off too.'),
          b('Puede abrirse al encender el PC, escondida en la bandeja: el micro virtual siempre está listo.', 'It can open when your PC starts, hidden in the tray: the virtual mic is always ready.'),
        ],
      },
      {
        t: 'section',
        title: b('Desde la v0.3: nuevo aspecto Chrome', 'Since v0.3: the new Chrome look'),
        text: b(
          'Chasis plateado de reproductor de los 2000 con pantalla LCD de píxeles, lista de sonidos con su forma de onda real (que se va llenando mientras suena), botones segmentados con iconos grabados y LEDs. El stop va anidado en el botón del micro con un LED rojo mientras algo suena. De noche pasa a grafito con pantallas ámbar. El aspecto Aqua de burbujas sigue disponible en Ajustes.',
          'A silver 2000s media-player chassis with a pixel LCD, a sound list with each sound’s real waveform (it fills up as it plays), segmented buttons with engraved icons and LEDs. Stop is nested into the mic button, with a red LED while anything plays. At night it turns graphite with amber screens. The bubbly Aqua look is still available in Settings.'
        ),
      },
      {
        t: 'gallery',
        title: b('Pantallas', 'Screens'),
        layout: 'grid',
        items: [
          { src: img('bubblepad-chrome-night.webp'), title: b('Modo noche: grafito y ámbar', 'Night mode: graphite and amber') },
          { src: img('bubblepad-chrome-trim.webp'), title: b('Editor de recorte con forma de onda', 'Trim editor with waveform') },
          { src: img('bubblepad-aqua.webp'), title: b('Aspecto Aqua clásico: cada sonido es una burbuja', 'Classic Aqua look: every sound is a bubble') },
        ],
      },
      { t: 'image', src: img('bubblepad-connections-day.webp'), alt: b('Panel de conexiones de Bubblepad', 'Bubblepad connections panel'), caption: b('Panel de conexiones (v0.2): cada aparato se enchufa al pad con su cable, que se ilumina con la señal', 'Connections panel (v0.2): each device plugs into the pad with a cable that lights up with the signal'), fit: 'contain', bg: '#eaf6ff' },
      {
        t: 'note',
        text: b(
          'Recomendable quitar la supresión de ruido en la llamada (Discord, Teams o el juego): confunde tus sonidos con ruido de fondo y los apaga. No pierdes calidad de voz, porque Bubblepad trae su propia reducción de ruido, que limpia tu micro antes de mezclarlo con los sonidos.',
          'It’s best to turn off noise suppression in the call (Discord, Teams or the game): it mistakes your sounds for background noise and mutes them. Your voice doesn’t suffer, because Bubblepad has its own noise reduction that cleans your mic before mixing it with the sounds.'
        ),
      },
      {
        t: 'cards',
        title: b('Decisiones de diseño', 'Design decisions'),
        items: [
          { icon: '📻', title: b('Un objeto, no una ventana', 'An object, not a window'), text: b('Formas atrevidas y materiales físicos (metal, LCD, LEDs) inspirados en los reproductores de música antiguos. Da gusto tocarla y se reconoce de un vistazo.', 'Bold shapes and physical materials (metal, LCD, LEDs) inspired by old music players. It feels nice to use and is recognisable at a glance.') },
          { icon: '🔊', title: b('Feedback que se oye', 'Feedback you can hear'), text: b('En mitad de una partida no miras la app: el «plop» al cambiar de página te dice dónde estás, y la pantalla LCD muestra en directo tu voz, la llamada y lo que oyes tú.', 'Mid-game you don’t look at the app: the page-switch “pop” tells you where you are, and the LCD shows your voice, the call and what you hear, live.') },
          { icon: '🎚️', title: b('Tres volúmenes, no uno', 'Three volumes, not one'), text: b('Tu voz, los sonidos en la llamada y los sonidos para ti se controlan por separado, porque cada uno se oye en un sitio distinto.', 'Your voice, sounds in the call and sounds for you are set separately, because each one is heard somewhere different.') },
          { icon: '🗂️', title: b('Crecer sin liarse', 'Grow without clutter'), text: b('Las páginas son simples carpetas: organizas los sonidos desde la app o desde el explorador de Windows, y los atajos y recortes viajan con cada sonido.', 'Pages are plain folders: organise sounds from the app or from Windows Explorer, and hotkeys and trims travel with each sound.') },
        ],
      },
      {
        t: 'section',
        title: b('Funciones', 'Features'),
        bullets: [
          b('Mezcla micro y soundboard en un solo micro virtual (VB-CABLE, que la app instala con un clic).', 'Mixes mic and soundboard into one virtual mic (VB-CABLE, installed by the app in one click).'),
          b('Reducción de ruido integrada (RNNoise) solo para tu voz, y panel de conexiones visual (v0.2).', 'Built-in noise reduction (RNNoise) for your voice only, and a visual connections panel (v0.2).'),
          b('Editor de recorte no destructivo: tus archivos nunca se modifican.', 'Non-destructive trim editor: your files are never modified.'),
          b('Dos aspectos, Chrome y Aqua, cada uno con modo de día y de noche; búsqueda, orden por atajos y ventana redimensionable.', 'Two looks, Chrome and Aqua, each with day and night modes; search, sort by hotkey and a resizable window.'),
          b('Atajos globales que funcionan con la ventana minimizada o en la bandeja.', 'Global hotkeys that work with the window minimised or in the tray.'),
          b('Se recupera sola si los cascos se suspenden o se reconectan.', 'Recovers by itself if your headset sleeps or reconnects.'),
          b('En español e inglés.', 'In Spanish and English.'),
        ],
      },
      { t: 'note', text: b('La programación está asistida por IA. El diseño, la experiencia de usuario y todas las decisiones de producto son mías.', 'The coding was AI-assisted. The design, the user experience and every product decision are mine.') },
      {
        t: 'section',
        title: b('Dos formas de instalarla', 'Two ways to install it'),
        bullets: [
          b('Instalador (recomendado): Bubblepad-Setup.exe. Se instala para tu usuario, sin permisos de administrador, con acceso directo y desinstalador.', 'Installer (recommended): Bubblepad-Setup.exe. Installs for your user, no admin rights needed, with a shortcut and an uninstaller.'),
          b('Portable: Bubblepad-windows.zip. Lo descomprimes donde quieras y abres Bubblepad.exe; no instala nada.', 'Portable: Bubblepad-windows.zip. Unzip it anywhere and run Bubblepad.exe; nothing gets installed.'),
          b('Al no estar firmada todavía, Windows o el navegador pueden avisar: «Conservar» y después «Más información → Ejecutar de todas formas».', 'As it isn’t code-signed yet, Windows or your browser may warn you: “Keep”, then “More info → Run anyway”.'),
        ],
      },
      { t: 'cta', title: b('Pruébala', 'Try it'), text: b('Gratis y de código abierto (MIT). Versión de acceso anticipado para Windows, con instalador o portable.', 'Free and open source (MIT). Early-access version for Windows, as an installer or portable.') },
    ],
  },

  /* ───────────────────────── INSTALAZA ───────────────────────── */
  {
    id: 'instalaza',
    title: 'Instalaza',
    category: b('Diseño web corporativo', 'Corporate web design'),
    short: b('Web corporativa para una empresa de defensa. Información limitada por confidencialidad.', 'Corporate website for a defence company. Limited information due to confidentiality.'),
    badge: b('Confidencial', 'Confidential'),
    role: b('Diseño UX/UI completo', 'End-to-end UX/UI design'),
    type: b('Sitio web corporativo', 'Corporate website'),
    tools: ['Figma'],
    tags: [b('Web', 'Web'), b('Corporativo', 'Corporate'), b('Responsive', 'Responsive')],
    cover: img('instalaza-logo.webp'),
    coverFit: 'contain',
    coverBg: '#f2f2f2',
    icon: img('instalaza-logo.webp'),
    accent: '#d0202a',
    links: [
      { label: b('Abrir prototipo en Figma', 'Open prototype in Figma'), href: 'https://www.figma.com/proto/xHh0knFb65SyzsOjj4j0ZI/WEB-Instalaza?node-id=1-2&t=BoUxYnUkqSB5PAlf-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2', kind: 'figma' },
    ],
    blocks: [
      {
        t: 'lead',
        text: b(
          'Diseño de interfaz web corporativa moderna, con arquitectura de información estructurada, navegación intuitiva y diseño responsive para varios dispositivos, cumpliendo altos estándares de seguridad y accesibilidad.',
          'A modern corporate web interface with structured information architecture, intuitive navigation and responsive design across devices, meeting high security and accessibility standards.'
        ),
      },
      { t: 'note', tone: 'lock', text: b('El proyecto incluye información sensible. Los detalles completos se compartirán cuando esté terminado y con autorización del cliente.', 'The project involves sensitive information. Full details will be shared once it’s finished and the client approves.') },
      {
        t: 'section',
        title: b('Información disponible', 'Available information'),
        bullets: [
          b('Interfaz web corporativa moderna', 'Modern corporate web interface'),
          b('Arquitectura de información estructurada', 'Structured information architecture'),
          b('Sistema de navegación intuitivo', 'Intuitive navigation system'),
          b('Diseño responsive para varios dispositivos', 'Responsive design for multiple devices'),
        ],
      },
      { t: 'cta', title: b('Ver el prototipo', 'See the prototype'), text: b('Puede tardar unos segundos en cargar. Para verlo mejor, elige "Fit width" en las opciones de escala del visor.', 'It may take a few seconds to load. For the best view, choose "Fit width" in the viewer’s scaling options.') },
    ],
  },

  /* ───────────────────────── RUMEX ───────────────────────── */
  {
    id: 'rumex',
    title: 'Rumex',
    category: b('Identidad visual', 'Visual identity'),
    short: b('Logotipo e identidad de marca para un grupo veterinario, aplicada hasta en la rotulación de vehículos.', 'Logo and brand identity for a veterinary group, applied all the way to vehicle wraps.'),
    badge: b('Cliente real', 'Real client'),
    role: b('Diseñador de marca', 'Brand designer'),
    type: b('Identidad visual y branding', 'Visual identity & branding'),
    tools: ['Illustrator', 'Photoshop'],
    tags: [b('Branding', 'Branding'), b('Logotipo', 'Logo'), b('Rotulación', 'Vehicle wrap')],
    cover: img('rumex-van.webp'),
    icon: img('rumex-icon.webp'),
    accent: '#3aa857',
    links: [{ label: b('Visitar rumexvet.es', 'Visit rumexvet.es'), href: 'https://rumexvet.es/', kind: 'web' }],
    blocks: [
      {
        t: 'lead',
        text: b(
          'Rumex es un grupo veterinario que necesitaba una identidad moderna, profesional y memorable. Diseñé el logotipo, la paleta y la tipografía, y preparé su aplicación en vehículos, merchandising y soportes digitales.',
          'Rumex is a veterinary group that needed a modern, professional and memorable identity. I designed the logo, palette and typography, and prepared it for vehicles, merchandise and digital media.'
        ),
      },
      { t: 'image', src: img('rumex-logo.webp'), alt: b('Logotipo de Rumex', 'Rumex logo'), fit: 'contain', bg: '#ffffff' },
      {
        t: 'section',
        title: b('Logotipo y color', 'Logo & colour'),
        text: b('Un logotipo minimalista que transmite profesionalidad y confianza. El verde evoca naturaleza, vida y salud, y se complementa con negro y blanco para que funcione en cualquier soporte.', 'A minimal logo that conveys professionalism and trust. Green evokes nature, life and health, complemented by black and white so it works anywhere.'),
      },
      {
        t: 'gallery',
        title: b('Aplicaciones', 'Applications'),
        layout: 'grid',
        items: [
          { src: img('rumex-vehicle-plan.webp'), title: b('Plano de rotulación del vehículo', 'Vehicle wrap layout') },
          { src: img('rumex-van.webp'), title: b('Furgoneta rotulada', 'Wrapped van') },
        ],
      },
    ],
  },

  /* ───────────────────────── CARTELES ───────────────────────── */
  {
    id: 'carteles',
    title: b('Cartelería', 'Posters'),
    category: b('Diseño gráfico', 'Graphic design'),
    short: b('Carteles, publicidad y portadas: tipografía, composición e impacto visual.', 'Posters, ads and covers: typography, composition and visual impact.'),
    badge: b('6 piezas', '6 pieces'),
    year: '2024',
    tools: ['Photoshop', 'Illustrator', 'InDesign'],
    tags: [b('Cartel', 'Poster'), b('Publicidad', 'Advertising'), b('Editorial', 'Editorial')],
    cover: img('poster-jazz.webp'),
    icon: img('poster-normi.webp'),
    accent: '#e2552b',
    blocks: [
      {
        t: 'gallery',
        layout: 'masonry',
        items: [
          { src: img('poster-normi.webp'), title: b('NORMI · Marca de ropa', 'NORMI · Clothing brand'), text: b('Branding ficticio para ropa urbana. Trabajo de máster.', 'Fictional streetwear branding. Master’s project.') },
          { src: img('poster-metaquest.webp'), title: b('Meta Quest 3 · Publicidad', 'Meta Quest 3 · Advert'), text: b('Anuncio de realidad virtual con copy persuasivo.', 'VR advert with persuasive copy.') },
          { src: img('poster-jazz.webp'), title: b('Festival Jazz Moon', 'Jazz Moon Festival'), text: b('Cartel para un festival ficticio. Hecho en Illustrator.', 'Poster for a fictional festival. Made in Illustrator.') },
          { src: img('poster-depresion.webp'), title: b('Depresión Sonora · Concierto', 'Depresión Sonora · Gig poster'), text: b('Cartel promocional para el concierto de la banda.', 'Promotional poster for the band’s gig.') },
          { src: img('poster-designforlife.webp'), title: b('Design for Life · Revista', 'Design for Life · Magazine'), text: b('Portada de revista ficticia.', 'Fictional magazine cover.') },
          { src: img('poster-basehub.webp'), title: b('BaseHub · Cartel', 'BaseHub · Poster'), text: b('Cartel para la app de geolocalización. Hecho en Photoshop.', 'Poster for the location app. Made in Photoshop.') },
        ],
      },
    ],
  },

  /* ───────────────────────── FOTOGRAFÍA ───────────────────────── */
  {
    id: 'fotografia',
    title: 'Soledad 101',
    category: b('Fotografía', 'Photography'),
    short: b('Exposición fotográfica sobre la soledad en la vida cotidiana.', 'A photo exhibition about loneliness in everyday life.'),
    badge: b('Exposición', 'Exhibition'),
    tools: ['Canon EOS 750D', 'Photoshop'],
    tags: [b('Documental', 'Documentary'), b('Retrato', 'Portrait')],
    cover: img('photo-1.webp'),
    icon: img('photo-6.webp'),
    accent: '#5b6b7a',
    links: [{ label: b('Más en Instagram', 'More on Instagram'), href: 'https://www.instagram.com/pablog_pic/', kind: 'instagram' }],
    blocks: [
      { t: 'lead', text: b('"Soledad 101" explora la soledad en distintos contextos de la vida cotidiana: el paseo marítimo, el campo, un parque, una calle de la ciudad.', '"Soledad 101" (Loneliness 101) explores solitude across everyday settings: a seafront, the countryside, a park, a city street.') },
      {
        t: 'gallery',
        layout: 'masonry',
        items: [
          { src: img('photo-1.webp'), title: b('Salitre amargo', 'Bitter brine'), text: b('Un pescador se prepara antes de su jornada en el paseo marítimo.', 'A fisherman gets ready for his day on the seafront.') },
          { src: img('photo-2.webp'), title: b('En construcción permanente', 'Permanently under construction'), text: b('Las tareas diarias de la vida rural.', 'The daily chores of rural life.') },
          { src: img('photo-3.webp'), title: b('Ayuda natural', 'Natural help'), text: b('Un momento de reflexión en plena naturaleza.', 'A moment of reflection in nature.') },
          { src: img('photo-4.webp'), title: b('Último recuerdo', 'Last memory'), text: b('Las personas y sus recuerdos, a través de fotografías del pasado.', 'People and their memories, through photos from the past.') },
          { src: img('photo-5.webp'), title: b('Tarde para todo', 'Too late for everything'), text: b('Una mujer con su perro en un parque: compañía en la soledad.', 'A woman and her dog in a park: company in solitude.') },
          { src: img('photo-6.webp'), title: b('Ladrillos ásperos', 'Rough bricks'), text: b('Soledad urbana bajo las señales de la ciudad.', 'Urban loneliness beneath the city’s signs.') },
        ],
      },
    ],
  },

  /* ───────────────────────── TFG ───────────────────────── */
  {
    id: 'tfg',
    title: b('TFG · Bancada y utillaje', 'Thesis · Welding fixture'),
    category: b('Diseño de producto · Ingeniería', 'Product design · Engineering'),
    short: b('Bancada y utillaje para un robot de soldadura que fabrica bases de cajas móviles de 24 pies.', 'Bench and tooling for a welding robot that builds the bases of 24-ft swap bodies.'),
    badge: b('UNIZAR', 'UNIZAR'),
    year: '2024',
    role: b('Trabajo Fin de Grado', 'Bachelor’s thesis'),
    type: b('Ingeniería en Diseño Industrial', 'Industrial Design Engineering'),
    tools: ['SolidWorks', 'AutoCAD', 'KeyShot', 'FEA'],
    tags: [b('CAD 3D', '3D CAD'), b('Robótica', 'Robotics'), b('Fabricación', 'Manufacturing')],
    cover: img('tfg-cover.webp'),
    icon: img('tfg-cover.webp'),
    accent: '#d63b1f',
    links: [{ label: b('Abrir presentación', 'Open presentation'), href: 'https://docs.google.com/presentation/d/1-3ZJULVWEMhOcZ0OPo8vGj1HWKEc34QQ/edit?usp=sharing', kind: 'slides' }],
    blocks: [
      {
        t: 'lead',
        text: b(
          'Diseño de una bancada y su utillaje para producir, con un robot de soldadura, las bases de cajas móviles de 24 pies de forma eficiente y precisa. Tiene en cuenta ergonomía industrial, seguridad, tolerancias de fabricación y compatibilidad con los robots de la planta.',
          'Design of a bench and its tooling so a welding robot can produce the bases of 24-ft swap bodies efficiently and accurately. It accounts for industrial ergonomics, safety, manufacturing tolerances and compatibility with the plant’s robots.'
        ),
      },
      { t: 'embed', src: 'https://docs.google.com/presentation/d/1-3ZJULVWEMhOcZ0OPo8vGj1HWKEc34QQ/embed?start=false&loop=false&delayms=5000', title: b('Presentación del TFG', 'Thesis presentation'), ratio: '16 / 9.4' },
      {
        t: 'steps',
        title: b('Metodología', 'Methodology'),
        items: [
          { title: b('Investigación', 'Research'), text: b('Análisis del proceso productivo, requisitos técnicos y normativa de seguridad industrial.', 'Analysis of the production process, technical requirements and industrial safety regulations.') },
          { title: b('Conceptualización', 'Concept'), text: b('Conceptos, alternativas y selección de la solución con matrices de decisión.', 'Concepts, alternatives and choosing the solution with decision matrices.') },
          { title: b('Desarrollo técnico', 'Technical development'), text: b('Modelado 3D, análisis de elementos finitos, planos y especificaciones de fabricación.', '3D modelling, finite element analysis, drawings and manufacturing specs.') },
          { title: b('Validación', 'Validation'), text: b('Verificación de tolerancias y simulación del proceso de soldadura robotizada.', 'Tolerance checks and simulation of the robotic welding process.') },
        ],
      },
      { t: 'image', src: img('tfg-plan.webp'), alt: b('Plano técnico', 'Technical drawing'), fit: 'contain', bg: '#ffffff', caption: b('Plano técnico', 'Technical drawing') },
      {
        t: 'section',
        title: b('Especificaciones', 'Specifications'),
        bullets: [
          b('Dimensiones adaptadas a cajas de 24 pies', 'Sized for 24-ft swap bodies'),
          b('Acero estructural soldable', 'Weldable structural steel'),
          b('Tolerancias de fabricación industrial', 'Industrial manufacturing tolerances'),
          b('Compatible con robot de soldadura', 'Compatible with the welding robot'),
        ],
      },
    ],
  },
];

export const featured = projects.filter((p) => p.featured);
export const others = projects.filter((p) => !p.featured);
export const byId = (id: string) => projects.find((p) => p.id === id);
