import { CUADRANTES, accionSugerida, esCaminoB, formatFecha, formatMXN } from '../data/constants.js';

const thStyle = {
  textAlign: 'left',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.04em',
  color: 'var(--ink-faint)',
  padding: '0 14px 10px',
  whiteSpace: 'nowrap',
};

const tdStyle = {
  padding: '12px 14px',
  fontSize: 13.5,
  color: 'var(--ink)',
  verticalAlign: 'top',
  borderTop: '1px solid var(--border)',
};

export default function ClientTable({ clientes, onSelect }) {
  if (clientes.length === 0) {
    return (
      <div style={{ padding: '32px 8px', textAlign: 'center', color: 'var(--ink-faint)', fontSize: 13.5 }}>
        No hay clientes para este filtro.
      </div>
    );
  }

  return (
    <div className="scrollbar-thin" style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 780 }}>
        <thead>
          <tr>
            <th style={thStyle}>Cliente</th>
            <th style={thStyle}>Qué hacer</th>
            <th style={thStyle}>Vence</th>
            <th style={thStyle}>Aumento</th>
            <th style={thStyle}>EDL</th>
            <th style={thStyle}>Casa Koltin</th>
            <th style={{ ...thStyle, textAlign: 'right' }}>Plata en juego</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => {
            const cuadrante = CUADRANTES[c.cuadrante];
            const urgente = c.etapa_actual === 'link_pago_enviado' && c.dias_para_vencer < 14;
            const caminoB = esCaminoB(c);
            return (
              <tr
                key={c.id_hubspot}
                onClick={() => onSelect(c)}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#FBFAF7')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span className="dot" style={{ background: cuadrante.color, marginTop: 5 }} title={cuadrante.label} />
                    <div>
                      <div style={{ fontWeight: 700 }}>{c.nombre}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--ink-faint)' }}>
                        {c.edad} años · {c.bucket_edad} · {c.id_hubspot}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  style={{
                    ...tdStyle,
                    maxWidth: 280,
                    color: urgente ? 'var(--rojo)' : caminoB ? 'var(--naranja)' : 'var(--ink-soft)',
                    fontWeight: urgente || caminoB ? 700 : 400,
                  }}
                >
                  {accionSugerida(c)}
                </td>
                <td style={tdStyle}>
                  <div>{formatFecha(c.fecha_vencimiento)}</div>
                  <div style={{ fontSize: 11.5, color: urgente ? 'var(--rojo)' : 'var(--ink-faint)', fontWeight: urgente ? 700 : 400 }}>
                    {c.dias_para_vencer < 0 ? `venció hace ${Math.abs(c.dias_para_vencer)}d` : `en ${c.dias_para_vencer}d`}
                  </div>
                </td>
                <td style={tdStyle}>{c.porcentaje_aumento_esperado}%</td>
                <td style={tdStyle}>
                  {c.edl_completado ? 'Sí' : c.edl_agendado ? 'Agendado' : 'No'}
                </td>
                <td style={{ ...tdStyle, textTransform: 'capitalize' }}>{c.uso_casa_koltin}</td>
                <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  {formatMXN(c.monto_anual_mxn)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
