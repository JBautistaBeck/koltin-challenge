import { useState } from 'react';
import SlideShell, { Nota } from './SlideShell.jsx';

// Cada tarjeta es una categoría del data request; cada ítem es un acordeón
// independiente. Colapsado: título corto (el "qué pedí"). Expandido: el
// texto completo original + el "para qué" — nada se pierde, solo se oculta
// por default para que la slide se lea de un vistazo en vivo.
const CATEGORIAS = [
  {
    key: 'proceso',
    icono: '🔄',
    titulo: 'Proceso de renovación',
    items: [
      {
        corto: 'Volumen real de renovaciones',
        completo: 'Volumen real de renovaciones mensuales',
        contexto:
          'El brief menciona ~500-600 clientes con renovación anual, pero no queda claro si es la base total o el promedio mensual.',
        paraQue: 'Dimensionar si el problema es de volumen manejable por 5 personas o si están desbordados por diseño.',
      },
      {
        corto: 'Historial mensual de renovación',
        completo: 'Historial mensual de tasa de renovación (12-18 meses)',
        contexto: 'No solo el dato agregado de 93% a 89%.',
        paraQue:
          'Entender si la caída fue gradual o hay un quiebre puntual (por ejemplo, coincidiendo con la migración a HubSpot), lo cual separa la hipótesis de fricción operativa de la de valor percibido.',
      },
      {
        corto: 'Si el EDL modera el precio',
        completo: 'Si el EDL efectivamente modera el aumento de precio',
        contexto: 'El brief menciona que hay bugs que a veces impiden que se aplique.',
        paraQue:
          'Es la pieza central de todo el sistema propuesto; si el incentivo no funciona de forma confiable en producción, cambia toda la estrategia de comunicarlo.',
      },
      {
        corto: '% de churn evitable',
        completo: '% de churn evitable vs. no evitable',
        contexto: 'Separar causas no evitables (fallecimiento, mudanza) de churn por decisión activa del cliente.',
        paraQue:
          'Dimensionar el piso real de retención posible, que nunca va a ser 100%, del margen donde el sistema puede mover la aguja.',
      },
    ],
  },
  {
    key: 'hubspot',
    icono: '🗂️',
    titulo: 'HubSpot',
    items: [
      {
        corto: 'Campos clave por cliente',
        completo: 'Fecha de vencimiento, % de aumento, última interacción, estado de EDL y renovador asignado, por cliente',
        paraQue: 'Son los campos que alimentan directamente el scoring de riesgo × engagement.',
      },
      {
        corto: 'Historial de pagos',
        completo: 'Historial de pagos (contado / cuotas / reembolso)',
        paraQue: 'Dimensionar cuánta fricción real genera hoy la falta de pago en cuotas en el link self-service.',
      },
    ],
  },
  {
    key: 'no_existe',
    icono: '🆕',
    titulo: 'No existe todavía',
    items: [
      {
        corto: 'Asistencia a Casa Koltin',
        completo: 'Asistencia a Casa Koltin (frecuencia, últimas visitas)',
        paraQue:
          'Es la otra mitad del eje de engagement en el scoring; sin esto, el modelo se apoya solo en el EDL.',
      },
      {
        corto: 'Uso efectivo del seguro',
        completo: 'Uso efectivo del seguro (consultas, siniestros)',
        paraQue:
          'Un cliente que usó el seguro y tuvo buena experiencia probablemente tiene un perfil de riesgo distinto al que nunca lo tocó.',
      },
    ],
  },
  {
    key: 'equipo',
    icono: '👥',
    titulo: 'Equipo de renovadores',
    items: [
      {
        corto: 'Asignación actual de clientes',
        completo: 'Cómo se asignan hoy los clientes a cada uno de los 5 renovadores',
        paraQue:
          'Afecta directamente cómo se diseña la cola priorizada del MVP, para respetar la forma en que ya trabajan y no imponerles un esquema nuevo.',
      },
    ],
  },
];

function AccordionItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderTop: '1px solid var(--border)' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '10px 2px',
          textAlign: 'left',
          font: 'inherit',
        }}
      >
        <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3 }}>{item.corto}</span>
        <span
          aria-hidden
          style={{
            flexShrink: 0,
            width: 18,
            height: 18,
            borderRadius: '50%',
            border: '1px solid var(--border-strong)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 800,
            color: 'var(--ink-faint)',
            transform: open ? 'rotate(45deg)' : 'none',
            transition: 'transform 0.18s ease',
          }}
        >
          +
        </span>
      </button>

      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 0.22s ease' }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ padding: '0 2px 14px', fontSize: 12.5, lineHeight: 1.55, color: 'var(--ink-soft)' }}>
            {item.completo !== item.corto && (
              <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{item.completo}</div>
            )}
            {item.contexto && <div style={{ marginBottom: 6 }}>{item.contexto}</div>}
            <div>
              <strong style={{ color: 'var(--ink)' }}>Para qué:</strong> {item.paraQue}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoriaCard({ icono, titulo, items }) {
  return (
    <div className="card" style={{ padding: '16px 18px 4px', flex: '1 1 260px', minWidth: 260 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
        <span style={{ fontSize: 18 }}>{icono}</span>
        <span style={{ fontWeight: 800, fontSize: 14.5 }}>{titulo}</span>
      </div>
      <div>
        {items.map((item, i) => (
          <AccordionItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function Slide06DataRequest() {
  return (
    <SlideShell kicker="Antes de diagnosticar" title="Qué pedí, y por qué" wide>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
        {CATEGORIAS.map((c) => (
          <CategoriaCard key={c.key} icono={c.icono} titulo={c.titulo} items={c.items} />
        ))}
      </div>

      <Nota>
        Esto se pidió por el canal de preguntas del challenge — la Parte 1 (diagnóstico) usa lo que se confirmó, y
        marca explícitamente lo que sigue siendo supuesto.
      </Nota>
    </SlideShell>
  );
}
