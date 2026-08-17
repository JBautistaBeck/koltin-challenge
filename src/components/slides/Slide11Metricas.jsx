import SlideShell, { Nota } from './SlideShell.jsx';

const METRICAS = [
  { n: 1, titulo: '% de renovación mensual', detalle: 'Benchmark: 93%. La métrica norte del sistema completo.' },
  { n: 2, titulo: '% de EDL completado antes del vencimiento', detalle: 'Proxy de "en órbita" — mide si el gancho de entrada está funcionando.' },
  { n: 3, titulo: 'Tiempo entre alerta de riesgo y primer contacto', detalle: 'Mide si el equipo de renovadores está desbordado.' },
  { n: 4, titulo: 'Churn "no contactado a tiempo" vs. churn por rechazo activo', detalle: 'Separa el problema operativo del problema de producto.' },
];

export default function Slide11Metricas() {
  return (
    <SlideShell kicker="Cómo se sabe si funciona" title="Métricas del sistema" wide>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
        {METRICAS.map((m) => (
          <div key={m.n} className="card" style={{ padding: '14px 18px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--ink-faint)', flexShrink: 0 }}>0{m.n}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{m.titulo}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 2 }}>{m.detalle}</div>
            </div>
          </div>
        ))}
      </div>

      <Nota>
        En 30 días: la señal temprana de que el sistema funciona es que el % de EDL completado subió y que el % de
        renovación empezó a moverse hacia el 93%.
      </Nota>
    </SlideShell>
  );
}
