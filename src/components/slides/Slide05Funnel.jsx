import SlideShell, { Nota } from './SlideShell.jsx';
import { TRIGGERS, TRIGGER_PAGO_ANTICIPADO } from '../../data/constants.js';

// Diagrama de flujo dibujado a mano con SVG (líneas/rombo) + divs superpuestos
// (cajas, textos, íconos), todo sobre el mismo sistema de coordenadas en px.
// Sin librería de diagramas: liviano y fácil de tocar a mano.

const W = 970;
const H = 340;

const BOX = { w: 130, h: 60 };
const BOX_END = { w: 140, h: 60 }; // cajas finales, un poco más anchas

// A partir del punto de decisión se deja más aire (col3 en adelante) para que
// las curvas de la ramificación no queden pegadas al borde de "Contactado".
const POS = {
  vence90: { x: 20, y: 20, ...BOX },
  contactado: { x: 170, y: 20, ...BOX },
  edlAgendado: { x: 340, y: 20, ...BOX },
  edlCompletado: { x: 490, y: 20, ...BOX },
  linkPago: { x: 640, y: 90, w: 150, h: 160 },
  pagado: { x: 810, y: 20, ...BOX_END },
  sinEdl: { x: 340, y: 260, ...BOX },
  vencido: { x: 810, y: 260, ...BOX_END },
};

const DIAMOND_CENTER = { x: 235, y: 170 };
const DIAMOND = { hw: 55, hh: 45 }; // half-width, half-height

const triggerPorKey = Object.fromEntries(TRIGGERS.map((t) => [t.key, t]));

function right(box) {
  return { x: box.x + box.w, y: box.y + box.h / 2 };
}
function left(box) {
  return { x: box.x, y: box.y + box.h / 2 };
}
function bottomCenter(box) {
  return { x: box.x + box.w / 2, y: box.y + box.h };
}
function topCenter(box) {
  return { x: box.x + box.w / 2, y: box.y };
}

function FlowBox({ box, numero, letra, label, accent, sub }) {
  return (
    <div
      className="card"
      style={{
        position: 'absolute',
        left: box.x,
        top: box.y,
        width: box.w,
        height: box.h,
        borderTop: `3px solid ${accent}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4px 8px',
        gap: 2,
      }}
    >
      {(numero || letra) && (
        <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--ink-faint)' }}>
          {numero ? numero : `Camino ${letra}`}
        </span>
      )}
      <span style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>{label}</span>
      {sub && <span style={{ fontSize: 10, color: 'var(--ink-faint)', lineHeight: 1.2 }}>{sub}</span>}
    </div>
  );
}

function TriggerBadge({ x, y, trigger }) {
  return (
    <div
      title={trigger.tooltip}
      style={{
        position: 'absolute',
        left: x - 11,
        top: y,
        fontSize: 15,
        cursor: 'help',
        lineHeight: 1,
      }}
      aria-label={trigger.tooltip}
    >
      {trigger.icono}
    </div>
  );
}

// Curva "S": sale horizontal desde el origen y entra horizontal al destino.
function curvaS(from, to) {
  const midX = (from.x + to.x) / 2;
  return `M${from.x},${from.y} C${midX},${from.y} ${midX},${to.y} ${to.x},${to.y}`;
}
function linea(from, to) {
  return `M${from.x},${from.y} L${to.x},${to.y}`;
}

export default function Slide05Funnel() {
  const diamondRight = { x: DIAMOND_CENTER.x + DIAMOND.hw, y: DIAMOND_CENTER.y };
  const diamondTop = { x: DIAMOND_CENTER.x, y: DIAMOND_CENTER.y - DIAMOND.hh };
  const diamondBottom = { x: DIAMOND_CENTER.x, y: DIAMOND_CENTER.y + DIAMOND.hh };
  const diamondLeft = { x: DIAMOND_CENTER.x - DIAMOND.hw, y: DIAMOND_CENTER.y };

  const linkTop = { x: POS.linkPago.x, y: POS.linkPago.y + 40 };
  const linkBottom = { x: POS.linkPago.x, y: POS.linkPago.y + POS.linkPago.h - 40 };
  const linkRight = { x: POS.linkPago.x + POS.linkPago.w, y: POS.linkPago.y + POS.linkPago.h / 2 };

  const paths = [
    linea(right(POS.vence90), left(POS.contactado)),
    linea(bottomCenter(POS.contactado), diamondTop),
    curvaS(diamondRight, left(POS.edlAgendado)),
    curvaS(diamondRight, left(POS.sinEdl)),
    linea(right(POS.edlAgendado), left(POS.edlCompletado)),
    curvaS(right(POS.edlCompletado), linkTop),
    curvaS(right(POS.sinEdl), linkBottom),
    curvaS(linkRight, left(POS.pagado)),
    curvaS(linkRight, left(POS.vencido)),
  ];

  return (
    <SlideShell kicker="El sistema" title="El funnel de retención, con su ramificación" wide>
      <div style={{ position: 'relative', width: W, maxWidth: '100%', height: H, margin: '4px 0 18px', overflowX: 'auto' }}>
        <div style={{ position: 'relative', width: W, height: H }}>
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
            <defs>
              <marker id="flecha" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" style={{ fill: '#9C9689' }} />
              </marker>
            </defs>
            {paths.map((d, i) => (
              <path key={i} d={d} fill="none" style={{ stroke: '#9C9689', strokeWidth: 2 }} markerEnd="url(#flecha)" />
            ))}
            <polygon
              points={`${diamondTop.x},${diamondTop.y} ${diamondRight.x},${diamondRight.y} ${diamondBottom.x},${diamondBottom.y} ${diamondLeft.x},${diamondLeft.y}`}
              style={{ fill: '#F1EFE9', stroke: '#9C9689', strokeWidth: 1.75 }}
            />
            <text x={DIAMOND_CENTER.x + 14} y={DIAMOND_CENTER.y - 14} style={{ fontSize: 11, fontWeight: 800, fill: 'var(--verde)' }}>
              Sí
            </text>
            <text x={DIAMOND_CENTER.x + 14} y={DIAMOND_CENTER.y + 26} style={{ fontSize: 11, fontWeight: 800, fill: 'var(--naranja)' }}>
              No
            </text>
          </svg>

          <div
            style={{
              position: 'absolute',
              left: DIAMOND_CENTER.x - 40,
              top: DIAMOND_CENTER.y - 27,
              width: 80,
              height: 54,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: 9.5,
              fontWeight: 700,
              lineHeight: 1.2,
              color: 'var(--ink)',
              pointerEvents: 'none',
            }}
          >
            ¿Respondió el EDL en 14 días?
          </div>

          <FlowBox box={POS.vence90} numero={1} label="Vence en <90 días" accent="var(--border-strong)" />
          <FlowBox box={POS.contactado} numero={2} label="Contactado para EDL" accent="var(--border-strong)" />
          <FlowBox box={POS.edlAgendado} numero={3} label="EDL agendado" accent="var(--border-strong)" />
          <FlowBox box={POS.edlCompletado} numero={4} label="EDL completado" accent="var(--border-strong)" />
          <FlowBox box={POS.linkPago} numero={5} label="Esperando pago (Link enviado)" accent="var(--ink)" sub="convergen los dos caminos" />
          <FlowBox box={POS.pagado} numero={6} label="Pagado / renovado" accent="var(--verde)" />
          <FlowBox box={POS.vencido} numero={7} label="Vencido sin renovar" accent="var(--rojo)" />
          <FlowBox box={POS.sinEdl} letra="B" label="Sin EDL: link directo" accent="var(--naranja)" />

          <TriggerBadge x={topCenter(POS.vence90).x} y={POS.vence90.y - 20} trigger={triggerPorKey.invitacion_edl} />
          <TriggerBadge x={topCenter(POS.contactado).x} y={POS.contactado.y - 20} trigger={triggerPorKey.fup_7dias} />
          <TriggerBadge x={topCenter(POS.edlCompletado).x} y={POS.edlCompletado.y - 20} trigger={triggerPorKey.descuento_msi} />
          <TriggerBadge x={topCenter(POS.sinEdl).x} y={POS.sinEdl.y - 20} trigger={TRIGGER_PAGO_ANTICIPADO} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 12, color: 'var(--ink-soft)', marginBottom: 16 }}>
        {[...TRIGGERS, TRIGGER_PAGO_ANTICIPADO].map((t) => (
          <div key={t.key} style={{ display: 'flex', alignItems: 'center', gap: 6, maxWidth: 260 }}>
            <span>{t.icono}</span>
            <span>{t.tooltip}</span>
          </div>
        ))}
      </div>

      <Nota>
        <strong>Regla de urgencia transversal:</strong> si a alguien le quedan menos de 14 días para vencer y todavía
        no pagó el link, se marca como urgente para que un renovador lo llame directamente. Es la única salida
        manual del sistema — todo lo demás corre por WhatsApp automático.
      </Nota>
    </SlideShell>
  );
}
