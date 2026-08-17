import SlideShell, { Nota } from './SlideShell.jsx';

function Capa({ numero, titulo, texto, color }) {
  return (
    <div className="card" style={{ padding: '20px 22px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div
        style={{
          flexShrink: 0,
          width: 34,
          height: 34,
          borderRadius: '50%',
          background: color,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: 14,
        }}
      >
        {numero}
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 4 }}>{titulo}</div>
        <div style={{ fontSize: 14, lineHeight: 1.55 }}>{texto}</div>
      </div>
    </div>
  );
}

export default function Slide03Hipotesis() {
  return (
    <SlideShell kicker="Diagnóstico" title="Hipótesis de churn: dos capas" wide>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
        <Capa
          numero={1}
          color="var(--naranja)"
          titulo="Fricción operativa — explica la caída reciente"
          texto="Equipo recién migrado a HubSpot, sin contactos bien asignados ni automatizaciones. El link de renovación no ofrece pago en cuotas, lo que fuerza un proceso manual de reembolso cuando alguien lo pide."
        />
        <Capa
          numero={2}
          color="var(--azul)"
          titulo='Falta de "órbita" durante el año — explica el piso estructural'
          texto="El cliente solo tiene contacto con Koltin en la venta y en la renovación. Si nunca completó el EDL ni pisó Casa Koltin, al día 365 Koltin es un gasto anual, no algo que vive."
        />
      </div>

      <p style={{ margin: '0 0 4px' }}>
        Se separa por bucket de edad porque el peso relativo cambia: en <strong>64+</strong> (sin alternativa de
        mercado) pesa más el valor percibido que el precio; en el segmento más joven (nietos, familiares agregados),
        con alternativas de seguro, pesa más el precio.
      </p>

      <Nota>
        Esto es hipótesis basada en la info compartida; se validaría hablando con los 5 renovadores antes de asumir
        nada.
      </Nota>
    </SlideShell>
  );
}
