import { b } from '../i18n';

export const contact = {
  email: 'pablo.grasa@gmail.com',
  linkedin: 'https://www.linkedin.com/in/pablo-grasa-mateo/',
  github: 'https://github.com/civercras',
  instagram: 'https://www.instagram.com/pablog_pic/',
  cv: 'docs/CV_PabloGrasa.pdf',
};

export const strengths = [
  { icon: '🧭', title: b('Diseño centrado en el usuario', 'User-centred design'), text: b('Entrevistas, encuestas, card sorting y testing con usuarios reales. Decido con datos, no con intuiciones.', 'Interviews, surveys, card sorting and testing with real users. I decide with data, not hunches.') },
  { icon: '📐', title: b('Mentalidad de ingeniero', 'Engineering mindset'), text: b('Años de planos, tolerancias y CAD: precisión, sistemas y atención al detalle.', 'Years of drawings, tolerances and CAD: precision, systems thinking and attention to detail.') },
  { icon: '🚀', title: b('Del prototipo al producto', 'From prototype to product'), text: b('No me quedo en Figma: he publicado apps reales como Couchpad y BookReader.', 'I don’t stop at Figma: I’ve shipped real apps like Couchpad and BookReader.') },
];

export const experience = [
  {
    title: b('Ingeniero delineante', 'Draughtsman engineer'),
    company: 'HMY / You3D',
    period: b('Mar 2026 – actualidad', 'Mar 2026 – present'),
    bullets: [
      b('Modelado 3D de mobiliario a medida con SolidEdge', 'Made-to-order 3D furniture modelling with SolidEdge'),
      b('Planos y codificación para fabricación en taller propio', 'Drawings and coding for in-house manufacturing'),
      b('Gestión de pedidos y presupuestos con proveedores y clientes', 'Orders and quotes with suppliers and clients'),
    ],
  },
  {
    title: b('Diseñador gráfico', 'Graphic designer'),
    company: 'Novo Studio',
    period: b('Oct 2025 – ene 2026', 'Oct 2025 – Jan 2026'),
    bullets: [
      b('Mockups, composición y maquetación con Adobe Suite', 'Mockups, composition and layout with Adobe Suite'),
      b('Diseño de presentaciones de producto', 'Product presentation design'),
      b('Página web y piezas promocionales', 'Website and promotional pieces'),
    ],
  },
  {
    title: b('Ingeniero delineante · oficina técnica', 'Draughtsman engineer · technical office'),
    company: 'Vall Estructures',
    period: b('Sep 2024 – abr 2025', 'Sep 2024 – Apr 2025'),
    bullets: [
      b('Planos de montaje de estructuras de acero temporales para obra', 'Assembly drawings for temporary on-site steel structures'),
      b('Listados de materiales y pedidos a proveedores', 'Bills of materials and supplier orders'),
      b('Manejo avanzado de AutoCAD', 'Advanced AutoCAD'),
    ],
  },
  {
    title: b('Delineante · oficina técnica', 'Draughtsman · technical office'),
    company: 'Equimodal',
    period: b('Jun 2023 – feb 2024', 'Jun 2023 – Feb 2024'),
    bullets: [
      b('Planos de montaje muy detallados para obra', 'Highly detailed on-site assembly drawings'),
      b('Plug-in de SolidWorks con formulario y auto-modelado de chapa corrugada para contenedores', 'SolidWorks plug-in with a form and auto-modelling of corrugated sheet for containers'),
      b('TFG puesto en práctica en la empresa: bancada y utillaje para robot de soldadura', 'Thesis put into practice at the company: bench and tooling for a welding robot'),
    ],
  },
  {
    title: b('Diseño de imagen de marca', 'Brand identity design'),
    company: 'Rumex · Grupo Veterinario',
    period: b('Jun 2022', 'Jun 2022'),
    bullets: [
      b('Logotipo e identidad corporativa', 'Logo and corporate identity'),
      b('Preparación para imprenta, merchandising y rotulación', 'Print, merchandise and vehicle-wrap artwork'),
    ],
  },
];

export const education = [
  { degree: b('Máster en Diseño UX/UI y Diseño Gráfico', 'Master’s in UX/UI Design & Graphic Design'), school: 'CEI · Centro de Estudios e Innovación', period: '2025', note: b('Interfaces digitales, arquitectura de la información, prototipado interactivo y pruebas con usuarios.', 'Digital interfaces, information architecture, interactive prototyping and user testing.') },
  { degree: b('Cambridge Advanced C1 · Inglés', 'Cambridge Advanced C1 · English'), school: 'Cambridge Assessment English', period: '2025' },
  { degree: b('Grado en Ingeniería de Diseño Industrial y Desarrollo de Producto', 'BEng Industrial Design Engineering & Product Development'), school: 'Universidad de Zaragoza', period: '2019 – 2024' },
];

export const skills = [
  { group: b('UX/UI y diseño gráfico', 'UX/UI & graphic design'), items: ['Figma', 'FigJam', 'Maze', 'Adobe Illustrator', 'Photoshop', 'InDesign', 'Canva'] },
  { group: b('Métodos', 'Methods'), items: ['User research', 'Card sorting', 'Wireframing', 'Prototyping', 'Usability testing', 'Design systems', 'WCAG'] },
  { group: b('CAD y 3D', 'CAD & 3D'), items: ['SolidWorks', 'SolidEdge', 'Inventor', 'AutoCAD', 'Siemens NX', 'Catia V5', 'Fusion 360', 'KeyShot'] },
  { group: b('3D, animación y vídeo', '3D, animation & video'), items: ['Cinema 4D', 'Unity', 'DaVinci Resolve', b('Impresión 3D (STL/3MF)', '3D printing (STL/3MF)')] },
  { group: b('Código', 'Code'), items: ['HTML5', 'CSS3', 'Java', b('Desarrollo asistido por IA', 'AI-assisted development')] },
];

export const languages = [
  { name: b('Español', 'Spanish'), level: b('Nativo', 'Native') },
  { name: b('Inglés', 'English'), level: b('C1 · Cambridge Advanced', 'C1 · Cambridge Advanced') },
  { name: b('Catalán', 'Catalan'), level: b('Comprensión lectora · oral básico', 'Reading · basic speaking') },
];
