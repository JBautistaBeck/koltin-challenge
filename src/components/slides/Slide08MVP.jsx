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

function AgentCard({ icono, titulo, texto, etapas }) {
  return (
    <div className="card" style={{ padding: '16px 18px', flex: 1, minWidth: 260, display: 'flex', gap: 12 }}>
      <div
        style={{
          flexShrink: 0,
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: 'var(--bg)',
          border: '1px solid var(--border-strong)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 17,
        }}
      >
        {icono}
      </div>
      <div>
        <div style={{ fontWeight: 800, fontSize: 13.5, marginBottom: 3 }}>{titulo}</div>
        <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.5, marginBottom: 6 }}>{texto}</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-faint)' }}>{etapas}</div>
      </div>
    </div>
  );
}

export default function Slide08MVP() {
  return (
    <SlideShell kicker="El MVP" title="Producto" wide>
      <p style={{ margin: '0 0 14px' }}>
        Propongo una app de seguimiento del funnel que arranca apenas el cliente entra a la ventana de ≤90 días. A
        partir de ahí, dos agentes automáticos (por WhatsApp) se reparten el trabajo:
      </p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
        <AgentCard
          icono="📅"
          titulo="Agente 1 — el que agenda"
          texto="Informa sobre el Estudio de Longevidad, hace el follow-up a los 7 días si no hubo respuesta, y confirma el turno."
          etapas="Etapas 1→3: vence <90 días · contactado · EDL agendado"
        />
        <AgentCard
          icono="💳"
          titulo="Agente 2 — el que cobra"
          texto="Apenas se completa el EDL (o se cumplen los 14 días sin respuesta), envía el link de pago con la oferta que corresponda y escala a llamada si quedan <14 días sin pagar."
          etapas="Etapa 4→7: EDL completado · link de pago · pagado / vencido"
        />
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 22 }}>
        <Columna
          titulo="✅ REAL (lógica de producto)"
          color="var(--verde)"
          items={[
            'Las 7 etapas del funnel y la ramificación (camino A / camino B)',
            'Qué dispara cada agente y en qué momento',
            'El cálculo de score de riesgo y engagement, y la asignación a cuadrante',
            'La regla de urgencia (link enviado + <14 días)',
            'Los mensajes de WhatsApp por cuadrante y por camino',
          ]}
        />

      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link
          to="/"
          className="btn btn-primary"
          style={{ fontSize: 15.5, padding: '14px 28px', textDecoration: 'none' }}
          target="_blank"
  rel="noopener noreferrer"
        >
          Ver la herramienta en vivo →
        </Link>
      </div>
    </SlideShell>
  );
}
