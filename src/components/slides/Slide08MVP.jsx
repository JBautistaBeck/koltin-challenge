import { Link } from 'react-router-dom';
import SlideShell from './SlideShell.jsx';

function Columna({ titulo, color, items }) {
  return (
    <div className="card" style={{ padding: '16px 18px', flex: 1, minWidth: 220 }}>
      <div style={{ fontWeight: 800, fontSize: 13.5, color, marginBottom: 8 }}>{titulo}</div>
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Slide08MVP() {
  return (
    <SlideShell kicker="El MVP" title="Qué se construyó" wide>
      <p style={{ margin: '0 0 16px' }}>
        Un prototipo funcional de la vista "Salud de cartera": el mismo funnel, scoring y mensajes de este deck,
        pero clickeable, con 100 clientes simulados.
      </p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 22 }}>
        <Columna
          titulo="✅ REAL (lógica de producto)"
          color="var(--verde)"
          items={[
            'Las 7 etapas del funnel y sus transiciones',
            'El cálculo de score de riesgo y engagement',
            'La asignación a cuadrante y su cruce',
            'La regla de urgencia (link enviado + <14 días)',
            'Los 4 mensajes de WhatsApp por cuadrante',
          ]}
        />
        <Columna
          titulo="🔧 MOCK (no conectado)"
          color="var(--naranja)"
          items={[
            '100 clientes fake (nombres, fechas, montos)',
            'No hay integración real con HubSpot',
            'Los WhatsApp no se envían, solo se simulan',
            '"Copiar mensaje" es la única acción real',
          ]}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link
          to="/"
          className="btn btn-primary"
          style={{ fontSize: 15.5, padding: '14px 28px', textDecoration: 'none' }}
        >
          Ver la herramienta en vivo →
        </Link>
      </div>
    </SlideShell>
  );
}
