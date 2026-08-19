import { Fragment, useState } from 'react';
import { ETAPAS, TRIGGERS, TRIGGER_PAGO_ANTICIPADO, TRIGGER_ALERTA_URGENCIA, ORDEN_CUADRANTES, CUADRANTES } from '../data/constants.js';

const triggerPorKey = Object.fromEntries(TRIGGERS.map((t) => [t.key, t]));

// Un solo badge por agente y por columna. "EDL completado" agrupa los dos
// triggers de oferta (descuento por EDL vs. pago anticipado del camino B) en
// un único badge, porque acá el funnel es lineal y no muestra la ramificación.
const BADGES_POR_ETAPA = {
  vence_90: { agente: 1, tooltip: triggerPorKey.invitacion_edl.tooltip, tooltipAlign: 'left' },
  contactado_edl: { agente: 1, tooltip: triggerPorKey.fup_7dias.tooltip },
  edl_completado: {
    agente: 2,
    tooltip: `${triggerPorKey.descuento_msi.tooltip} Si en cambio pasaron 14 días sin respuesta (camino B): ${TRIGGER_PAGO_ANTICIPADO.tooltip.replace(/^Trigger automático \(camino B\): /, '')}`,
  },
  link_pago_enviado: { agente: 2, tooltip: TRIGGER_ALERTA_URGENCIA.tooltip },
};

// Separador invisible: da aire entre columnas cuya cabecera tiene badge de
// agente, para que dos badges vecinos no se toquen (no cuenta como etapa).
function Spacer() {
  return <div style={{ flexShrink: 0, width: 26 }} />;
}

const ICON_ROW_HEIGHT = 34;
const CHART_HEIGHT = 260;

// Badge agrupado por agente (mismo color/etiqueta para todos sus triggers),
// con un "!" que al pasar el mouse explica qué dispara en esa columna.
function AgentBadge({ agente, tooltip, tooltipAlign = 'center' }) {
  const [hover, setHover] = useState(false);
  const color = agente === 1 ? 'var(--azul)' : 'var(--naranja)';
  const bg = agente === 1 ? 'var(--azul-suave)' : 'var(--naranja-suave)';
  const label = agente === 1 ? 'Agente 1 de agendamiento' : 'Agente 2 de cobranzas';
  return (
    <div
      style={{
        position: 'absolute',
        top: 13,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: hover ? 30 : 1,
      }}
    >
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
          aria-label={tooltip}
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
            top: 22,
            left: tooltipAlign === 'left' ? 0 : '50%',
            transform: tooltipAlign === 'left' ? 'none' : 'translateX(-50%)',
            background: 'var(--ink)',
            color: '#fff',
            fontSize: 11,
            fontWeight: 500,
            padding: '8px 10px',
            borderRadius: 8,
            width: 230,
            lineHeight: 1.35,
            textAlign: 'left',
            boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
          }}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
}

// Línea punteada que marca el corte entre "todavía puede pasar cualquier
// cosa" (esperando pago) y el vencimiento en sí (pagado o vencido).
function VencimientoDivider() {
  return (
    <div
      style={{
        flexShrink: 0,
        width: 20,
        height: ICON_ROW_HEIGHT + CHART_HEIGHT,
        alignSelf: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ height: ICON_ROW_HEIGHT, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 1 }}>
        <span
          style={{
            fontSize: 9.5,
            fontWeight: 800,
            color: 'var(--ink-faint)',
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
          }}
        >
          VENCIMIENTO
        </span>
      </div>
      <div style={{ flex: 1, borderLeft: '2px dashed var(--border-strong)' }} />
    </div>
  );
}

export default function FunnelChart({ conteos, maxTotal, filtro, onSegmentClick, onColumnClick }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, position: 'relative' }}>
        {ETAPAS.map((etapa) => {
          const badge = BADGES_POR_ETAPA[etapa.key];
          const etapaConteo = conteos[etapa.key] || { total: 0 };
          const total = etapaConteo.total || 0;
          const colHeight = maxTotal > 0 ? Math.max((total / maxTotal) * CHART_HEIGHT, total > 0 ? 6 : 0) : 0;
          const etapaSeleccionada = filtro.etapa === etapa.key;

          return (
            <Fragment key={etapa.key}>
              {etapa.key === 'contactado_edl' && <Spacer />}
              {etapa.key === 'pagado_renovado' && <VencimientoDivider />}
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
              <div style={{ height: ICON_ROW_HEIGHT, position: 'relative' }}>
                {badge && <AgentBadge agente={badge.agente} tooltip={badge.tooltip} tooltipAlign={badge.tooltipAlign} />}
              </div>

              <div
                style={{
                  height: CHART_HEIGHT,
                  display: 'flex',
                  flexDirection: 'column-reverse',
                  justifyContent: 'flex-start',
                  border: '1px dashed var(--border)',
                  borderBottom: '2px solid var(--border-strong)',
                  borderRadius: 6,
                  overflow: 'hidden',
                }}
              >
                <div style={{ height: colHeight, display: 'flex', flexDirection: 'column-reverse', width: '100%' }}>
                  {ORDEN_CUADRANTES.map((cKey) => {
                    const count = etapaConteo[cKey] || 0;
                    if (count === 0) return null;
                    const cuadrante = CUADRANTES[cKey];
                    const activo = filtro.etapa === etapa.key && filtro.cuadrante === cKey;
                    const atenuado = filtro.etapa && !(filtro.etapa === etapa.key && (filtro.cuadrante === null || filtro.cuadrante === cKey));
                    const segHeight = total > 0 ? (count / total) * colHeight : 0;
                    return (
                      <button
                        key={cKey}
                        onClick={() => onSegmentClick(etapa.key, cKey)}
                        title={`${cuadrante.label}: ${count} personas en "${etapa.label}"`}
                        style={{
                          flex: count,
                          minHeight: 3,
                          width: '100%',
                          background: cuadrante.color,
                          border: 'none',
                          borderTop: '1px solid rgba(255,255,255,0.35)',
                          cursor: 'pointer',
                          opacity: atenuado ? 0.35 : 1,
                          outline: activo ? '2px solid var(--ink)' : 'none',
                          outlineOffset: -2,
                          transition: 'opacity 0.12s ease',
                          padding: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {segHeight >= 12 && (
                          <span
                            style={{
                              fontSize: 10.5,
                              fontWeight: 800,
                              color: '#fff',
                              textShadow: '0 1px 2px rgba(0,0,0,0.35)',
                              lineHeight: 1,
                              pointerEvents: 'none',
                            }}
                          >
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => onColumnClick(etapa.key)}
                style={{
                  marginTop: 10,
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: '6px 2px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  width: '100%',
                }}
              >
                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: etapaSeleccionada ? 800 : 600,
                    color: etapaSeleccionada ? 'var(--ink)' : 'var(--ink-soft)',
                    textAlign: 'center',
                    lineHeight: 1.25,
                    textDecoration: etapaSeleccionada ? 'underline' : 'none',
                    textUnderlineOffset: 3,
                    whiteSpace: etapa.key === 'link_pago_enviado' ? 'nowrap' : 'normal',
                  }}
                >
                  {etapa.key === 'link_pago_enviado' ? etapa.labelCorto : etapa.label}
                </span>
                <span style={{ fontSize: 11, color: 'var(--ink-faint)', fontWeight: 600 }}>{total}</span>
              </button>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
