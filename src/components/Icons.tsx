type P = { className?: string };
const S = (d: string, fill = false) =>
  function Icon({ className }: P) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill={fill ? 'currentColor' : 'none'} stroke={fill ? 'none' : 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    );
  };

export const IArrow = S('M5 12h14M13 6l6 6-6 6');
export const IBack = S('M19 12H5M11 6l-6 6 6 6');
export const IClose = S('M6 6l12 12M18 6L6 18');
export const IMin = S('M5 17h14');
export const IMax = S('M5 5h14v14H5z');
export const IRestore = S('M8 4h12v12M4 8h12v12H4z');
export const IDownload = S('M12 4v11M7 10l5 5 5-5M5 20h14');
export const IExternal = S('M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5');
export const IMail = S('M3 6h18v12H3zM3 7l9 7 9-7');
export const IUser = S('M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0');
export const IFile = S('M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6');
export const IGrid = S('M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z');
export const IHome = S('M4 11l8-7 8 7M6 10v10h12V10');
export const ILink = S('M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1');
export const IStar = S('M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z');
export const ICopy = S('M9 9h11v11H9zM5 15V4h11');
export const IPlay = S('M7 4l13 8-13 8z', true);

export const IGithub = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
  </svg>
);
export const ILinkedin = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1v5.46h-4v-4.84c0-1.15-.02-2.64-1.6-2.64-1.62 0-1.86 1.26-1.86 2.56v4.92h-4z" />
  </svg>
);
export const IInstagram = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);
export const IFigma = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M8.5 2h3.5v6.5H8.5a3.25 3.25 0 0 1 0-6.5zM12 2h3.5a3.25 3.25 0 0 1 0 6.5H12zM8.5 8.5H12V15H8.5a3.25 3.25 0 0 1 0-6.5zM15.5 8.5a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5zM8.5 15H12v3.25A3.25 3.25 0 1 1 8.5 15z" opacity=".95" />
  </svg>
);

export function LinkIcon({ kind }: { kind?: string }) {
  if (kind === 'github') return <IGithub />;
  if (kind === 'figma') return <IFigma />;
  if (kind === 'download') return <IDownload />;
  if (kind === 'instagram') return <IInstagram />;
  return <IExternal />;
}
