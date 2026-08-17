import SlideShell from './SlideShell.jsx';

export default function Slide04Reframe() {
  return (
    <SlideShell kicker="El reframe central" title="De renovación a retención" wide>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          justifyContent: 'center',
          margin: '8px 0 26px',
          flexWrap: 'wrap',
        }}
      >
        <div className="card" style={{ padding: '18px 24px', textAlign: 'center', flex: '1 1 260px' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-faint)', letterSpacing: '0.05em', marginBottom: 8 }}>
            HOY
          </div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>Renovación</div>
          <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 6 }}>
            Evento reactivo del día 365. La alerta llega cuando ya venció.
          </div>
        </div>
        <div style={{ fontSize: 26, color: 'var(--ink-faint)' }}>→</div>
        <div className="card" style={{ padding: '18px 24px', textAlign: 'center', flex: '1 1 260px', borderColor: 'var(--verde)', borderWidth: 2, borderStyle: 'solid' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--verde)', letterSpacing: '0.05em', marginBottom: 8 }}>
            PROPUESTA
          </div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>Retención</div>
          <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 6 }}>
            Proceso proactivo que arranca 90 días antes del vencimiento.
          </div>
        </div>
      </div>

      <p style={{ margin: 0 }}>
        El gancho de entrada es el <strong>Estudio de Longevidad (EDL)</strong>: es gratis, lo cubre el seguro, y
        completarlo modera el aumento de precio en la renovación. Es la excusa perfecta para generar el primer
        contacto real del año antes de que el precio entre en la conversación.
      </p>
    </SlideShell>
  );
}
