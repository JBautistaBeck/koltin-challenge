import { useEffect, useState } from 'react';
import SlideShell, { Nota } from './SlideShell.jsx';

// Cada tarjeta es una categoría del data request; cada ítem muestra solo su
// título corto (el "qué pedí") con un "+". El detalle completo (contexto +
// "para qué") vive en un modal, no inline: así la slide nunca cambia de alto
// sin importar qué se abra.
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

function ItemRow({ item, onOpen }) {
  return (
    <div style={{ borderTop: '1px solid var(--border)' }}>
      <button
        onClick={() => onOpen(item)}
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
          }}
        >
          +
        </span>
      </button>
    </div>
  );
}

function CategoriaCard({ icono, titulo, items, onOpenItem }) {
  return (
    <div className="card" style={{ padding: '16px 18px 6px', flex: '1 1 260px', minWidth: 260 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
        <span style={{ fontSize: 18 }}>{icono}</span>
        <span style={{ fontWeight: 800, fontSize: 14.5 }}>{titulo}</span>
      </div>
      <div>
        {items.map((item, i) => (
          <ItemRow key={i} item={item} onOpen={onOpenItem} />
        ))}
      </div>
    </div>
  );
}

function ItemModal({ item, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!item) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(32,30,27,0.45)', zIndex: 50 }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.completo}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 51,
          width: 'min(520px, calc(100vw - 48px))',
          maxHeight: 'calc(100vh - 96px)',
          overflowY: 'auto',
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
          border: '1px solid var(--border)',
          padding: '22px 24px 24px',
        }}
      >
        <button
          onClick={onClose}
          className="btn"
          style={{ padding: '6px 12px', fontSize: 13, marginBottom: 16 }}
        >
          ✕ Cerrar
        </button>

        <h3 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.35 }}>
          {item.completo}
        </h3>

        {item.contexto && (
          <p style={{ margin: '0 0 12px', fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
            {item.contexto}
          </p>
        )}

        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
          <strong style={{ color: 'var(--ink)' }}>Para qué:</strong> {item.paraQue}
        </p>
      </div>
    </>
  );
}

export default function Slide06DataRequest() {
  const [itemAbierto, setItemAbierto] = useState(null);

  return (
    <SlideShell kicker="Antes de diagnosticar" title="Qué pedí, y por qué" wide>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
        {CATEGORIAS.map((c) => (
          <CategoriaCard
            key={c.key}
            icono={c.icono}
            titulo={c.titulo}
            items={c.items}
            onOpenItem={setItemAbierto}
          />
        ))}
      </div>

      <Nota>
        Esto se pidió por el canal de preguntas del challenge — la Parte 1 (diagnóstico) usa lo que se confirmó, y
        marca explícitamente lo que sigue siendo supuesto. Una vez que esto se ponga en marcha, el paso clave va a
        ser sentarse a hablar mucho con los renovadores: son quienes mejor conocen, en el día a día, dónde se traba
        realmente el proceso — y esa conversación es la que termina de confirmar o corregir lo que acá todavía
        queda como supuesto.
      </Nota>

      <ItemModal item={itemAbierto} onClose={() => setItemAbierto(null)} />
    </SlideShell>
  );
}
