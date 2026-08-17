import { Link } from 'react-router-dom';
import { HOY, formatFecha } from '../data/constants.js';

export default function Header({ renovadores, renovadorSeleccionado, onChangeRenovador }) {
  return (
    <header style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-card)' }}>
      <div className="container" style={{ padding: '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', color: 'var(--ink-faint)' }}>
              KOLTIN · PROTOTIPO PARA RENOVADORES
            </span>
          </div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em' }}>
            Salud de cartera
          </h1>
          <div className="badge" style={{ width: 'fit-content' }}>
            Mock HubSpot + WhatsApp · corte {formatFecha(HOY)} · no es una integración real
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/presentacion" className="btn">Ver presentación</Link>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: 'var(--ink-soft)', fontWeight: 600 }}>
            Renovador
            <select
              value={renovadorSeleccionado}
              onChange={(e) => onChangeRenovador(e.target.value)}
              style={{
                fontFamily: 'inherit',
                fontSize: 14,
                fontWeight: 600,
                padding: '9px 12px',
                borderRadius: 999,
                border: '1px solid var(--border-strong)',
                background: '#fff',
                color: 'var(--ink)',
                cursor: 'pointer',
                minWidth: 180,
              }}
            >
              <option value="Todos">Todos</option>
              {renovadores.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </header>
  );
}
