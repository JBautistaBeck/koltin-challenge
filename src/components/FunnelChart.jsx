import { useState } from 'react';
import { ETAPAS, TRIGGERS, ORDEN_CUADRANTES, CUADRANTES } from '../data/constants.js';

const CHART_HEIGHT = 260;

export default function FunnelChart({ conteos, maxTotal, filtro, onSegmentClick, onColumnClick }) {
  const [hoverTrigger, setHoverTrigger] = useState(null);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, position: 'relative' }}>
        {ETAPAS.map((etapa) => {
          const trigger = TRIGGERS.find((t) => t.antesDeEtapa === etapa.key);
          const etapaConteo = conteos[etapa.key] || { total: 0 };
          const total = etapaConteo.total || 0;
          const colHeight = maxTotal > 0 ? Math.max((total / maxTotal) * CHART_HEIGHT, total > 0 ? 6 : 0) : 0;
          const etapaSeleccionada = filtro.etapa === etapa.key;

          return (
            <div key={etapa.key} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
              <div style={{ height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {trigger && (
                  <button
                    onMouseEnter={() => setHoverTrigger(trigger.key)}
                    onMouseLeave={() => setHoverTrigger(null)}
                    onFocus={() => setHoverTrigger(trigger.key)}
                    onBlur={() => setHoverTrigger(null)}
                    title={trigger.tooltip}
                    style={{
                      position: 'absolute',
                      left: -6,
                      top: -2,
                      border: 'none',
                      background: 'transparent',
                      cursor: 'help',
                      fontSize: 15,
                      padding: 2,
                      lineHeight: 1,
                    }}
                    aria-label={trigger.tooltip}
                  >
                    {trigger.icono}
                    {hoverTrigger === trigger.key && (
                      <span
                        style={{
                          position: 'absolute',
                          top: 22,
                          left: -10,
                          zIndex: 20,
                          background: 'var(--ink)',
                          color: '#fff',
                          fontSize: 11,
                          fontWeight: 500,
                          padding: '7px 10px',
                          borderRadius: 8,
                          width: 190,
                          lineHeight: 1.35,
                          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                        }}
                      >
                        {trigger.tooltip}
                      </span>
                    )}
                  </button>
                )}
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
                        }}
                      />
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
                  }}
                >
                  {etapa.label}
                </span>
                <span style={{ fontSize: 11, color: 'var(--ink-faint)', fontWeight: 600 }}>{total}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
