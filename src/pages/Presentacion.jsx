import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Slide01Portada from '../components/slides/Slide01Portada.jsx';
import Slide02Problema from '../components/slides/Slide02Problema.jsx';
import Slide06DataRequest from '../components/slides/Slide06DataRequest.jsx';
import Slide03Hipotesis from '../components/slides/Slide03Hipotesis.jsx';
import Slide04Reframe from '../components/slides/Slide04Reframe.jsx';
import Slide08MVP from '../components/slides/Slide08MVP.jsx';
import Slide05Funnel from '../components/slides/Slide05Funnel.jsx';
import Slide07Scoring from '../components/slides/Slide07Scoring.jsx';
import Slide09Octubre from '../components/slides/Slide09Octubre.jsx';
import Slide11Metricas from '../components/slides/Slide11Metricas.jsx';
import Slide12Cierre from '../components/slides/Slide12Cierre.jsx';

const SLIDES = [
  Slide01Portada,
  Slide02Problema,
  Slide06DataRequest,
  Slide03Hipotesis,
  Slide04Reframe,
  Slide08MVP,
  Slide05Funnel,
  Slide07Scoring,
  Slide09Octubre,
  Slide11Metricas,
  Slide12Cierre,
];

export default function Presentacion() {
  const [i, setI] = useState(0);
  const total = SLIDES.length;

  const goTo = useCallback(
    (n) => setI(Math.max(0, Math.min(total - 1, n))),
    [total]
  );
  const next = useCallback(() => goTo(i + 1), [goTo, i]);
  const prev = useCallback(() => goTo(i - 1), [goTo, i]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prev();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const Slide = SLIDES[i];

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 28px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-card)',
        }}
      >
        <Link to="/" className="btn" style={{ fontSize: 12.5, padding: '7px 13px', textDecoration: 'none' }}>
          ← Volver a la app
        </Link>
        <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', color: 'var(--ink-faint)' }}>
          KOLTIN · DE RENOVACIONES A RETENCIÓN
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-soft)', minWidth: 46, textAlign: 'right' }}>
          {i + 1} / {total}
        </span>
      </header>

      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 28px',
          overflow: 'auto',
        }}
      >
        <Slide />
      </main>

      <footer
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
          padding: '18px 28px 30px',
        }}
      >
        <div style={{ display: 'flex', gap: 7 }}>
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Ir a la diapositiva ${idx + 1}`}
              style={{
                width: idx === i ? 22 : 8,
                height: 8,
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                background: idx === i ? 'var(--ink)' : 'var(--border-strong)',
                transition: 'width 0.18s ease, background 0.18s ease',
                padding: 0,
              }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={prev} disabled={i === 0} className="btn" style={{ padding: '9px 20px' }}>
            ← Anterior
          </button>
          <button onClick={next} disabled={i === total - 1} className="btn btn-primary" style={{ padding: '9px 20px' }}>
            Siguiente →
          </button>
        </div>
      </footer>
    </div>
  );
}
