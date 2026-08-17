import SlideShell, { StatCard, Nota } from './SlideShell.jsx';

export default function Slide02Problema() {
  return (
    <SlideShell kicker="El problema" title="La retención de renovaciones se está cayendo" wide>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 20 }}>
        <StatCard value="93% → <89%" label="Retención de renovaciones" sub="Caída sostenida, no un mes puntual." />
        <StatCard value="40%" label="del churn total ocurre en renovación" sub="No es un problema de adquisición, es de retención." />
        <StatCard value="Día 365" label="Momento en que se dispara la alerta" sub="El proceso hoy es 100% reactivo." />
      </div>

      <p style={{ margin: '0 0 12px' }}>
        El equipo de 5 renovadores migró de Excel a HubSpot hace poco: sin contactos bien asignados y sin
        automatizaciones. El link de renovación no ofrece pago en cuotas, así que cualquier pedido de cuotas se
        resuelve con un reembolso manual.
      </p>
      <p style={{ margin: 0 }}>
        Desde octubre, un cambio macro en las tasas del seguro va a hacer los aumentos de precio todavía más
        grandes. Se espera una caída fuerte de renovaciones justo cuando eso pegue.
      </p>

      <Nota>
        <strong>Septiembre es la ventana.</strong> Es el último mes para tener un proceso nuevo funcionando antes de
        que el aumento de octubre golpee la cartera.
      </Nota>
    </SlideShell>
  );
}
