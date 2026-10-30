import { useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/figtree';
import './styles.css';
import { LangProvider } from './i18n';
import { Wallpaper } from './components/Wallpaper';
import { Boot } from './components/Boot';
import { Desktop } from './components/Desktop';
import { Mobile } from './components/Mobile';
import { wireClicks } from './sound';

wireClicks();

const MQ = '(max-width: 820px), (max-height: 520px)';

function useIsMobile() {
  const [m, setM] = useState(() => window.matchMedia(MQ).matches);
  useEffect(() => {
    const mq = window.matchMedia(MQ);
    const f = () => setM(mq.matches);
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);
  return m;
}

function shouldBoot() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try { return !sessionStorage.getItem('pg-booted'); } catch { return true; }
}

function App() {
  const mobile = useIsMobile();
  const [boot, setBoot] = useState(shouldBoot);
  const done = useCallback(() => {
    setBoot(false);
    try { sessionStorage.setItem('pg-booted', '1'); } catch { /* nada */ }
  }, []);

  return (
    <LangProvider>
      <Wallpaper />
      {mobile ? <Mobile /> : <Desktop />}
      {boot && <Boot onDone={done} />}
    </LangProvider>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
