import SlideShell from './SlideShell.jsx';

const PRINCIPIOS = [
  {
    n: 1,
    titulo: 'Anticipar',
    texto: 'Semanas antes del vencimiento, no el día que vence — dentro del flujo de retención de 90 días.',
  },
  {
    n: 2,
    titulo: 'Framear el valor',
    texto: 'Parte de lo que ya vivió este año (comunidad, prevención), no una suba aislada.',
  },
  {
    n: 3,
    titulo: 'EDL como palanca',
    texto: 'Descuento visible desde el primer mensaje, no a mitad de la negociación.',
  },
  {
    n: 4,
    titulo: 'Cuotas visibles',
    texto: 'Desde el inicio, no después de que el cliente ya dudó del precio.',
  },
];

function Principio({ n, titulo, texto }) {
  return (
    <div className="card" style={{ padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <div
        style={{
          flexShrink: 0,
          width: 30,
          height: 30,
          borderRadius: '50%',
          background: 'var(--ink)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: 13,
        }}
      >
        {n}
      </div>
      <div>
        <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{titulo}</div>
        <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.5 }}>{texto}</div>
      </div>
    </div>
  );
}

export default function Slide09Octubre() {
  return (
    <SlideShell kicker="Fuera del scope del equipo — se documenta igual" title="Plan de octubre: cómo comunicar el aumento" wide>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {PRINCIPIOS.map((p) => (
          <Principio key={p.n} {...p} />
        ))}
      </div>
    </SlideShell>
  );
}
