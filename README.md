# Portfolio · Pablo Grasa (v3 · Frutiger Aero)

Portfolio personal con estética Frutiger Aero: un escritorio con ventanas de cristal, gadgets y casos de estudio.

- **Web:** https://civercras.github.io/
- Enlaces directos a cada proyecto: `#/basehub`, `#/cocoon`, `#/riftos`, `#/mandopc`, `#/bookreader`, `#/instalaza`, `#/rumex`, `#/carteles`, `#/fotografia`, `#/tfg`, `#/sobre-mi`, `#/contacto`
- Español / inglés (se elige según el idioma del navegador y se puede cambiar abajo a la derecha).
- En móvil se muestra una versión adaptada con scroll y fichas a pantalla completa.

## Dónde se cambia cada cosa

| Qué | Archivo |
| --- | --- |
| Textos y datos de los proyectos | `src/data/projects.ts` |
| Experiencia, formación, habilidades y contacto | `src/data/about.ts` |
| Textos de la interfaz (botones, títulos) | `src/i18n.tsx` |
| Imágenes, vídeos y CV | `public/img`, `public/media`, `public/docs` |
| Colores y estilos | `src/styles.css` |

## Publicación

Cada vez que se sube un cambio a la rama `main`, GitHub Actions compila la web y la publica en GitHub Pages
(Settings → Pages → Source: **GitHub Actions**).

Para probarla en local: `npm install` y `npm run dev`.
