import SlideShell, { Nota } from './SlideShell.jsx';
import { CUADRANTES } from '../../data/constants.js';

const SIZE = 420;
const HALF = SIZE / 2;

// Muestra real tomada del dataset de clientes (src/data/clients.json):
// ~6 por cuadrante, elegidos para cubrir bien el rango de cada eje — no son
// inventados, son (riesgo, engagement, cuadrante) de clientes fake reales.
const PUNTOS = [
  { r: 60, e: 6, q: 'prioridad_maxima' },
  { r: 64, e: 10, q: 'prioridad_maxima' },
  { r: 50, e: 11, q: 'prioridad_maxima' },
  { r: 63, e: 15, q: 'prioridad_maxima' },
  { r: 82, e: 38, q: 'prioridad_maxima' },
  { r: 58, e: 47, q: 'prioridad_maxima' },
  { r: 75, e: 62, q: 'cuidar_vinculo' },
  { r: 56, e: 67, q: 'cuidar_vinculo' },
  { r: 63, e: 72, q: 'cuidar_vinculo' },
  { r: 55, e: 77, q: 'cuidar_vinculo' },
  { r: 65, e: 84, q: 'cuidar_vinculo' },
  { r: 52, e: 91, q: 'cuidar_vinculo' },
  { r: 38, e: 7, q: 'meter_en_orbita' },
  { r: 16, e: 11, q: 'meter_en_orbita' },
  { r: 13, e: 15, q: 'meter_en_orbita' },
  { r: 35, e: 37, q: 'meter_en_orbita' },
  { r: 40, e: 42, q: 'meter_en_orbita' },
  { r: 35, e: 47, q: 'meter_en_orbita' },
  { r: 46, e: 62, q: 'se_retiene_solo' },
  { r: 41, e: 67, q: 'se_retiene_solo' },
  { r: 21, e: 69, q: 'se_retiene_solo' },
  { r: 4, e: 71, q: 'se_retiene_solo' },
  { r: 49, e: 73, q: 'se_retiene_solo' },
  { r: 44, e: 89, q: 'se_retiene_solo' },
];

const xFor = (engagement) => (engagement / 100) * SIZE;
const yFor = (riesgo) => SIZE - (riesgo / 100) * SIZE;

const QUADRANT_LABEL_POS = {
  prioridad_maxima: { x: 14, y: 24, anchor: 'start' },
  cuidar_vinculo: { x: SIZE - 14, y: 24, anchor: 'end' },
  meter_en_orbita: { x: 14, y: SIZE - 16, anchor: 'start' },
  se_retiene_solo: { x: SIZE - 14, y: SIZE - 16, anchor: 'end' },
};

export default function Slide07Scoring() {
  return (
    <SlideShell kicker="Metodología" title="Cómo funciona el scoring" wide>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 150, textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 800 }}>Riesgo →</div>
            <div style={{ fontSize: 10.5, color: 'var(--ink-faint)', marginTop: 2, lineHeight: 1.4 }}>
              % aumento, edad, inactividad
            </div>
          </div>

          <div>
            <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-strong)' }}>
              <svg width={SIZE} height={SIZE} style={{ display: 'block' }}>
                <rect x={0} y={0} width={HALF} height={HALF} fill={CUADRANTES.prioridad_maxima.colorSuave} />
                <rect x={HALF} y={0} width={HALF} height={HALF} fill={CUADRANTES.cuidar_vinculo.colorSuave} />
                <rect x={0} y={HALF} width={HALF} height={HALF} fill={CUADRANTES.meter_en_orbita.colorSuave} />
                <rect x={HALF} y={HALF} width={HALF} height={HALF} fill={CUADRANTES.se_retiene_solo.colorSuave} />

                <line x1={HALF} y1={0} x2={HALF} y2={SIZE} style={{ stroke: 'var(--border-strong)', strokeWidth: 1.5, strokeDasharray: '4 4' }} />
                <line x1={0} y1={HALF} x2={SIZE} y2={HALF} style={{ stroke: 'var(--border-strong)', strokeWidth: 1.5, strokeDasharray: '4 4' }} />

                {Object.entries(QUADRANT_LABEL_POS).map(([qKey, pos]) => (
                  <text
                    key={qKey}
                    x={pos.x}
                    y={pos.y}
                    textAnchor={pos.anchor}
                    style={{ fontSize: 12.5, fontWeight: 800, fill: CUADRANTES[qKey].colorTexto }}
                  >
                    {CUADRANTES[qKey].label}
                  </text>
                ))}

                {PUNTOS.map((p, i) => (
                  <circle
                    key={i}
                    cx={xFor(p.e)}
                    cy={yFor(p.r)}
                    r={5.5}
                    style={{ fill: CUADRANTES[p.q].color, stroke: '#fff', strokeWidth: 1.5 }}
                  />
                ))}
              </svg>
            </div>

            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <div style={{ fontSize: 13.5, fontWeight: 800 }}>Engagement →</div>
              <div style={{ fontSize: 10.5, color: 'var(--ink-faint)', marginTop: 2 }}>EDL, uso de Casa Koltin</div>
            </div>
          </div>
        </div>
      </div>

      <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--ink-faint)', textAlign: 'center' }}>
        Corte: ≥ 50/100 en cada eje. Cada punto es un cliente real del dataset del prototipo.
      </p>

      <Nota>
        Este es un modelo de reglas simples (no un modelo predictivo entrenado con datos históricos). Con acceso a
        data real de renovaciones pasadas, el siguiente paso sería validar qué variables realmente correlacionan con
        no-renovación y ajustar los pesos, o entrenar un modelo simple de scoring.
      </Nota>
    </SlideShell>
  );
}
