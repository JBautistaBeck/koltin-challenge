import SlideShell from './SlideShell.jsx';
import { TRIGGERS, TRIGGER_PAGO_ANTICIPADO, TRIGGER_ALERTA_URGENCIA } from '../../data/constants.js';

const triggerPorKey = Object.fromEntries(TRIGGERS.map((t) => [t.key, t]));

// Mismos números/chips azules que aparecen arriba de los nodos en el diagrama
// del funnel (slide siguiente), pero acá el texto se separa en dos niveles:
// disparador (negrita, escaneable) + acción (más liviano, el detalle).
const FILAS_AGENTE_1 = [
  { key: 'invitacion_edl', icono: triggerPorKey.invitacion_edl.icono, label: 'Al entrar a <90 días', detalle: 'WhatsApp invitando al EDL gratuito.' },
  { key: 'fup_7dias', icono: triggerPorKey.fup_7dias.icono, label: 'Si a los 7 días no respondió', detalle: 'WhatsApp de follow-up (FUP).' },
];

const FILAS_AGENTE_2 = [
  { key: 'descuento_msi', icono: triggerPorKey.descuento_msi.icono, label: 'Al completar el EDL', detalle: 'WhatsApp con % de descuento por pago anticipado + MSI.' },
  {
    key: 'pago_anticipado',
    icono: TRIGGER_PAGO_ANTICIPADO.icono,
    label: 'A los 14 días sin respuesta (camino B)',
    detalle: 'Oferta de pago anticipado (2 meses antes) + MSI, link directo sin descuento EDL.',
  },
  {
    key: 'alerta_urgencia',
    icono: TRIGGER_ALERTA_URGENCIA.icono,
    label: 'Si faltan <14 días y no pagó',
    detalle: 'Alerta al equipo de renovación para llamar directo.',
  },
];

function Chip({ children }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        fontSize: 12,
        fontWeight: 700,
        color: 'var(--ink)',
        background: '#F1EFE9',
        border: '1px solid var(--border-strong)',
        borderRadius: 999,
        padding: '5px 12px',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}

function PanelCard() {
  return (
    <div className="card" style={{ padding: '18px 20px', flex: 1, display: 'flex', gap: 14 }}>
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
        📊
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 800, fontSize: 16 }}>Panel del equipo de renovación</div>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink-faint)', marginTop: 3, marginBottom: 10 }}>
          Una sola vista compartida por los 5 renovadores
        </div>
        <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', lineHeight: 1.55, margin: '0 0 14px' }}>
          Cada renovador ve en qué etapa está cada cliente, quién es urgente, y qué mensaje automático ya se le mandó.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <Chip>7 etapas + ramificación</Chip>
          <Chip>Score riesgo × engagement</Chip>
          <Chip>Alertas &lt;14 días</Chip>
          <Chip>Mensajes por cuadrante</Chip>
        </div>
      </div>
    </div>
  );
}

function AgentCard({ icono, titulo, texto, filas }) {
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
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3, flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 800, fontSize: 13.5 }}>{titulo}</span>
          <span
            style={{
              fontSize: 9.5,
              fontWeight: 800,
              color: 'var(--ink-faint)',
              background: 'var(--bg)',
              border: '1px solid var(--border-strong)',
              borderRadius: 999,
              padding: '2px 7px',
              whiteSpace: 'nowrap',
            }}
          >
            usa el scoring
          </span>
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.5, marginBottom: 10 }}>{texto}</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 7,
            paddingTop: 10,
            borderTop: '1px solid var(--border)',
          }}
        >
          {filas.map((f) => (
            <div key={f.key} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 12, flexShrink: 0, lineHeight: 1.5 }}>{f.icono}</span>
              <span style={{ fontSize: 11.5, lineHeight: 1.45 }}>
                <strong style={{ color: 'var(--ink)', fontWeight: 700 }}>{f.label}</strong>{' '}
                <span style={{ color: 'var(--ink-faint)' }}>{f.detalle}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Slide08MVP() {
  return (
    <SlideShell kicker="El MVP" title="Producto: App de funnel + 2 agentes que usan scoring de clientes" wide>
      <p style={{ margin: '0 0 14px' }}>
      Propongo una app de seguimiento del funnel que arranca apenas el cliente entra a la ventana de ≤90 días. A partir de ahí, dos agentes automáticos (por WhatsApp) se reparten el trabajo dentro de ese funnel usando el scoring para decidir con qué tono hablar y qué ofrecer:
      </p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
        <PanelCard />
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
        <AgentCard
          icono="📅"
          titulo="Agente 1 — el que agenda"
          texto="Informa sobre el Estudio de Longevidad, hace el follow-up a los 7 días si no hubo respuesta, y confirma el turno."
          filas={FILAS_AGENTE_1}
        />
        <AgentCard
          icono="💳"
          titulo="Agente 2 — el que cobra"
          texto="Apenas se completa el EDL (o se cumplen los 14 días sin respuesta), envía el link de pago con la oferta que corresponda y escala a llamada si quedan <14 días sin pagar."
          filas={FILAS_AGENTE_2}
        />
      </div>

      <p style={{ margin: 0, fontSize: 14, fontWeight: 600, textAlign: 'center', color: 'var(--ink)' }}>
        Así se ve el funnel completo que recorren estos agentes:
      </p>
    </SlideShell>
  );
}
