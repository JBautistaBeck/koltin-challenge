import { ORDEN_CUADRANTES, CUADRANTES } from '../data/constants.js';

export default function Legend({ filtro, onToggle }) {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {ORDEN_CUADRANTES.map((key) => {
        const c = CUADRANTES[key];
        const atenuado = filtro.cuadrante && filtro.cuadrante !== key;
        return (
          <button
            key={key}
            onClick={() => onToggle(key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              opacity: atenuado ? 0.4 : 1,
            }}
            title={c.descripcion}
          >
            <span className="dot" style={{ background: c.color }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-soft)' }}>{c.label}</span>
          </button>
        );
      })}
    </div>
  );
}
