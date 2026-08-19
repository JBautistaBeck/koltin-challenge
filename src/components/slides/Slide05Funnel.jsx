import { useState } from 'react';
import SlideShell, { Nota } from './SlideShell.jsx';
import { TRIGGERS, TRIGGER_PAGO_ANTICIPADO, TRIGGER_ALERTA_URGENCIA } from '../../data/constants.js';

// Diagrama de flujo dibujado a mano con SVG (líneas/rombo) + divs superpuestos
// (cajas, textos, íconos), todo sobre el mismo sistema de coordenadas en px.
// Sin librería de diagramas: liviano y fácil de tocar a mano.

const W = 1000;
const H = 340;

const BOX = { w: 130, h: 60 };
const BOX_END = { w: 140, h: 60 }; // cajas finales, un poco más anchas

// Columna 1 (Vence <90 días) queda pegada al borde; todo lo demás se corre
// +30 para que los badges de agente de las columnas 1 y 2 no se choquen.
const POS = {
  vence90: { x: 20, y: 20, ...BOX },
  contactado: { x: 200, y: 20, ...BOX },
  edlAgendado: { x: 370, y: 20, ...BOX },
  edlCompletado: { x: 520, y: 20, ...BOX },
  linkPago: { x: 670, y: 140, w: 150, h: 60 },
  pagado: { x: 840, y: 20, ...BOX_END },
  sinEdl: { x: 370, y: 260, ...BOX },
  vencido: { x: 840, y: 260, ...BOX_END },
};

const DIAMOND_CENTER = { x: 265, y: 170 };
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

// Badge agrupado por agente: mismo color/etiqueta para todos los triggers de
// ese agente, con un "!" que al pasar el mouse explica qué hace ESE trigger.
function AgentBadge({ x, y, agente, trigger, align = 'center', tooltipArriba = false }) {
  const [hover, setHover] = useState(false);
  const color = agente === 1 ? 'var(--azul)' : 'var(--naranja)';
  const bg = agente === 1 ? 'var(--azul-suave)' : 'var(--naranja-suave)';
  const label = agente === 1 ? 'Agente 1 de agendamiento' : 'Agente 2 de cobranzas';
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: 'translateX(-50%)', zIndex: hover ? 30 : 1 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          background: bg,
          border: `1px solid ${color}`,
          borderRadius: 999,
          padding: '2px 7px 2px 8px',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: 9, fontWeight: 800, color }}>{label}</span>
        <span
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={() => setHover(true)}
          onBlur={() => setHover(false)}
          tabIndex={0}
          role="button"
          aria-label={trigger.tooltip}
          style={{
            width: 13,
            height: 13,
            flexShrink: 0,
            borderRadius: '50%',
            background: color,
            color: '#fff',
            fontSize: 9,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'help',
          }}
        >
          !
        </span>
      </div>
      {hover && (
        <div
          style={{
            position: 'absolute',
            ...(tooltipArriba ? { bottom: '100%', marginBottom: 6 } : { top: 22 }),
            left: align === 'left' ? 0 : align === 'right' ? 'auto' : '50%',
            right: align === 'right' ? 0 : 'auto',
            transform: align === 'center' ? 'translateX(-50%)' : 'none',
            background: 'var(--ink)',
            color: '#fff',
            fontSize: 11,
            fontWeight: 500,
            padding: '8px 10px',
            borderRadius: 8,
            width: 210,
            lineHeight: 1.35,
            boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
          }}
        >
          {trigger.tooltip}
        </div>
      )}
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

  const linkEntrada = left(POS.linkPago);
  const linkRight = right(POS.linkPago);

  const paths = [
    linea(right(POS.vence90), left(POS.contactado)),
    linea(bottomCenter(POS.contactado), diamondTop),
    curvaS(diamondRight, left(POS.edlAgendado)),
    curvaS(diamondRight, left(POS.sinEdl)),
    linea(right(POS.edlAgendado), left(POS.edlCompletado)),
    curvaS(right(POS.edlCompletado), linkEntrada),
    curvaS(right(POS.sinEdl), linkEntrada),
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
          <FlowBox box={POS.linkPago} numero={5} label="Esperando pago (Link enviado)" accent="var(--border-strong)" />
          <FlowBox box={POS.pagado} numero={6} label="Pagado / renovado" accent="var(--verde)" />
          <FlowBox box={POS.vencido} numero={7} label="Vencido sin renovar" accent="var(--rojo)" />
          <FlowBox box={POS.sinEdl} letra="B" label="Sin EDL: link directo" accent="var(--naranja)" />

          <AgentBadge x={topCenter(POS.vence90).x} y={POS.vence90.y - 20} agente={1} trigger={triggerPorKey.invitacion_edl} align="left" />
          <AgentBadge x={topCenter(POS.contactado).x} y={POS.contactado.y - 20} agente={1} trigger={triggerPorKey.fup_7dias} />
          <AgentBadge x={topCenter(POS.edlCompletado).x} y={POS.edlCompletado.y - 20} agente={2} trigger={triggerPorKey.descuento_msi} />
          <AgentBadge x={topCenter(POS.sinEdl).x} y={POS.sinEdl.y - 20} agente={2} trigger={TRIGGER_PAGO_ANTICIPADO} tooltipArriba />
          <AgentBadge x={topCenter(POS.linkPago).x} y={POS.linkPago.y - 20} agente={2} trigger={TRIGGER_ALERTA_URGENCIA} />
        </div>
      </div>

      <p style={{ margin: 0, fontSize: 14, fontWeight: 600, textAlign: 'center', color: 'var(--ink)' }}>
        Ambos agentes deciden tono y oferta consultando un score de riesgo × engagement — así es como funciona ese
        cálculo:
      </p>
    </SlideShell>
  );
}
