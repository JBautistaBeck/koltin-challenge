import { Link } from 'react-router-dom';
import SlideShell, { Nota } from './SlideShell.jsx';
import { CUADRANTES } from '../../data/constants.js';

function Chip({ children }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        fontSize: 11.5,
        fontWeight: 700,
        color: 'var(--ink)',
        background: '#F1EFE9',
        border: '1px solid var(--border-strong)',
        borderRadius: 999,
        padding: '4px 10px',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}

function Medidor() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ fontSize: 9.5, color: 'var(--ink-faint)', fontWeight: 700 }}>0</span>
      <div
        style={{
          flex: 1,
          height: 7,
          borderRadius: 999,
          background: 'linear-gradient(90deg, #F1EFE9, var(--ink))',
          border: '1px solid var(--border-strong)',
        }}
      />
      <span style={{ fontSize: 9.5, color: 'var(--ink-faint)', fontWeight: 700 }}>100</span>
    </div>
  );
}

function EjeBlock({ titulo, chips, nota, width }) {
  return (
    <div className="card" style={{ padding: '16px 18px', width, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontWeight: 800, fontSize: 14 }}>{titulo}</div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {chips.map((c) => (
          <Chip key={c}>{c}</Chip>
        ))}
      </div>
      {nota && <div style={{ fontSize: 11, color: 'var(--ink-faint)', fontStyle: 'italic' }}>{nota}</div>}
    </div>
  );
}

function Flecha({ direccion, texto }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '0 4px' }}>
      <span style={{ fontSize: 20, lineHeight: 1, color: 'var(--ink-faint)' }}>{direccion === 'abajo' ? '↓' : '→'}</span>
      <span
        style={{
          fontSize: 9.5,
          fontWeight: 700,
          color: 'var(--ink-faint)',
          textAlign: 'center',
          lineHeight: 1.25,
          maxWidth: 76,
        }}
      >
        {texto}
      </span>
    </div>
  );
}

function Celda({ q }) {
  const c = CUADRANTES[q];
  return (
    <div
      style={{
        background: c.colorSuave,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 10,
      }}
    >
      <span style={{ fontSize: 13.5, fontWeight: 800, color: c.colorTexto, lineHeight: 1.25 }}>{c.label}</span>
    </div>
  );
}

export default function Slide07Scoring() {
  return (
    <SlideShell kicker="Metodología" title="Cómo funciona el scoring" wide>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto auto auto auto',
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: 10,
            columnGap: 6,
          }}
        >
          {/* fila 1: nada bajo Riesgo/flecha/eje-Y, el bloque Engagement arriba de la matriz */}
          <div />
          <div />
          <div />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <EjeBlock
              titulo="Eje Engagement (0-100)"
              chips={['EDL completado', 'Uso de Casa Koltin']}
              nota="alcanza con una de las dos"
              width={320}
            />
            <Flecha direccion="abajo" texto="define el eje horizontal" />
          </div>

          {/* fila 2: bloque Riesgo → flecha → "Riesgo ↑" → matriz, todo centrado verticalmente */}
          <div style={{ alignSelf: 'center' }}>
            <EjeBlock
              titulo="Eje Riesgo (0-100)"
              chips={['% aumento de precio', 'Edad (bucket)', 'Días sin interacción']}
              width={190}
            />
          </div>
          <div style={{ alignSelf: 'center' }}>
            <Flecha direccion="arriba" texto="define el eje vertical" />
          </div>
          <div style={{ alignSelf: 'stretch', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                fontSize: 13,
                fontWeight: 800,
                color: 'var(--ink)',
                whiteSpace: 'nowrap',
              }}
            >
              Riesgo →
            </span>
          </div>
          <div>
            <div
              style={{
                width: 320,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr 1fr',
                gap: 2,
                aspectRatio: '2 / 1.15',
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid var(--border-strong)',
              }}
            >
              <Celda q="prioridad_maxima" />
              <Celda q="cuidar_vinculo" />
              <Celda q="meter_en_orbita" />
              <Celda q="se_retiene_solo" />
            </div>
          </div>

          {/* fila 3: etiqueta del eje X, debajo de la matriz */}
          <div />
          <div />
          <div />
          <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 800 }}>Engagement →</div>
        </div>
      </div>

      <p style={{ margin: '18px 0 12px', fontSize: 13, color: 'var(--ink-faint)', textAlign: 'center' }}>
        Corte: ≥ 50/100 en cada eje.
      </p>

      <Nota>
        El cuadrante que resulta de este cruce es lo que decide, para cada cliente, en qué tono se le habla y qué se
        le ofrece (EDL, descuento, cuotas) — no es un número que se archiva.
      </Nota>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
        <Link
          to="/"
          className="btn btn-primary"
          style={{ fontSize: 15.5, padding: '14px 28px', textDecoration: 'none' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver la herramienta en vivo →
        </Link>
      </div>
    </SlideShell>
  );
}
