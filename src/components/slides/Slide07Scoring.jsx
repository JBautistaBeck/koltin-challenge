import SlideShell, { Nota } from './SlideShell.jsx';
import { CUADRANTES } from '../../data/constants.js';

function Eje({ titulo, subtitulo, items }) {
  return (
    <div className="card" style={{ padding: '16px 18px', flex: 1 }}>
      <div style={{ fontWeight: 800, fontSize: 14.5, marginBottom: 2 }}>{titulo}</div>
      <div style={{ fontSize: 12, color: 'var(--ink-faint)', marginBottom: 10 }}>{subtitulo}</div>
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.6 }}>
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

function CeldaMatriz({ cuadrante, riesgoAlto, engagementAlto }) {
  const c = CUADRANTES[cuadrante];
  return (
    <div
      style={{
        background: c.colorSuave,
        border: `1px solid ${c.color}55`,
        borderRadius: 12,
        padding: '14px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 700, color: c.colorTexto }}>
        {riesgoAlto ? 'Riesgo alto' : 'Riesgo bajo'} · {engagementAlto ? 'Engagement alto' : 'Engagement bajo'}
      </div>
      <div style={{ fontSize: 14, fontWeight: 800, color: c.colorTexto }}>
        {c.emoji} {c.label}
      </div>
      <div style={{ fontSize: 12, color: c.colorTexto, lineHeight: 1.4, fontStyle: 'italic' }}>“{c.tono}”</div>
    </div>
  );
}

export default function Slide07Scoring() {
  return (
    <SlideShell kicker="Metodología" title="Cómo funciona el scoring" wide>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
        <Eje
          titulo="Eje riesgo (0-100)"
          subtitulo="Probabilidad de no renovar"
          items={[
            '% de aumento de precio esperado (a mayor aumento, mayor riesgo)',
            'Bucket de edad (64+ sin alternativa de mercado pesa distinto que 18-63)',
            'Días desde la última interacción (a mayor tiempo sin contacto, mayor riesgo)',
          ]}
        />
        <Eje
          titulo="Eje engagement (0-100)"
          subtitulo="Vínculo real con Koltin"
          items={[
            'EDL completado (sí / no)',
            'Frecuencia de uso de Casa Koltin (frecuente / ocasional / nunca)',
            'Alto engagement con EDL completado O uso frecuente — no requiere ambos',
          ]}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
          marginBottom: 14,
        }}
      >
        <CeldaMatriz cuadrante="prioridad_maxima" riesgoAlto engagementAlto={false} />
        <CeldaMatriz cuadrante="cuidar_vinculo" riesgoAlto engagementAlto />
        <CeldaMatriz cuadrante="meter_en_orbita" riesgoAlto={false} engagementAlto={false} />
        <CeldaMatriz cuadrante="se_retiene_solo" riesgoAlto={false} engagementAlto />
      </div>

      <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--ink-faint)' }}>
        Corte: ≥ 50/100 en cada eje.
      </p>

      <Nota>
        Este es un modelo de reglas simples (no un modelo predictivo entrenado con datos históricos). Con acceso a
        data real de renovaciones pasadas, el siguiente paso sería validar qué variables realmente correlacionan con
        no-renovación y ajustar los pesos, o entrenar un modelo simple de scoring.
      </Nota>
    </SlideShell>
  );
}
