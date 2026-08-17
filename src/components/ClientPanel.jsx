import { useEffect, useState } from 'react';
import { CUADRANTES, ETAPA_POR_KEY, accionSugerida, esCaminoB, mensajeWhatsapp, formatFecha, formatMXN } from '../data/constants.js';

export default function ClientPanel({ cliente, onClose }) {
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    setCopiado(false);
  }, [cliente]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!cliente) return null;

  const cuadrante = CUADRANTES[cliente.cuadrante];
  const etapa = ETAPA_POR_KEY[cliente.etapa_actual];
  const caminoB = esCaminoB(cliente);
  const mensaje = mensajeWhatsapp(cliente);
  const urgente = cliente.etapa_actual === 'link_pago_enviado' && cliente.dias_para_vencer < 14;

  async function copiar() {
    try {
      await navigator.clipboard.writeText(mensaje);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1800);
    } catch {
      setCopiado(false);
    }
  }

  return (
    <>
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(32,30,27,0.32)', zIndex: 40 }}
      />
      <aside
        className="scrollbar-thin"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(420px, 100vw)',
          background: '#fff',
          zIndex: 41,
          boxShadow: '-12px 0 40px rgba(0,0,0,0.15)',
          overflowY: 'auto',
          padding: 26,
        }}
      >
        <button
          onClick={onClose}
          className="btn"
          style={{ padding: '6px 12px', fontSize: 13, marginBottom: 18 }}
        >
          ✕ Cerrar
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span className="dot" style={{ background: cuadrante.color }} />
          <span style={{ fontSize: 12.5, fontWeight: 700, color: cuadrante.colorTexto }}>{cuadrante.emoji} {cuadrante.label}</span>
        </div>
        <h2 style={{ margin: '2px 0 2px', fontSize: 21, fontWeight: 800 }}>{cliente.nombre}</h2>
        <div style={{ fontSize: 12.5, color: 'var(--ink-faint)', marginBottom: 16 }}>
          {cliente.id_hubspot} · {cliente.edad} años · {cliente.bucket_edad}
        </div>

        <div
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '12px 14px',
            marginBottom: 16,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-faint)', letterSpacing: '0.03em' }}>ETAPA ACTUAL</span>
            <div style={{ display: 'flex', gap: 8 }}>
              {caminoB && <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--naranja)' }}>CAMINO B · SIN EDL</span>}
              {urgente && <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--rojo)' }}>URGENTE</span>}
            </div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{etapa.label}</div>
          <div style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5 }}>{accionSugerida(cliente)}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
          <MiniStat label="Vence" value={`${formatFecha(cliente.fecha_vencimiento)} (${cliente.dias_para_vencer}d)`} />
          <MiniStat label="Aumento esperado" value={`${cliente.porcentaje_aumento_esperado}%`} />
          <MiniStat label="EDL" value={cliente.edl_completado ? 'Completado' : cliente.edl_agendado ? 'Agendado' : 'No hecho'} />
          <MiniStat label="Casa Koltin" value={cliente.uso_casa_koltin} cap />
          <MiniStat label="Riesgo" value={`${cliente.score_riesgo}/100`} />
          <MiniStat label="Engagement" value={`${cliente.score_engagement}/100`} />
          <MiniStat label="Plata en juego" value={formatMXN(cliente.monto_anual_mxn)} span2 />
          <MiniStat label="Renovador asignado" value={cliente.renovador_asignado} span2 />
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-faint)', letterSpacing: '0.03em', marginBottom: 8 }}>
          MENSAJE DE WHATSAPP ({caminoB ? 'CAMINO B · PAGO ANTICIPADO' : cuadrante.label.toUpperCase()})
        </div>
        <div
          style={{
            background: '#EAF7EF',
            border: '1px solid #CBEAD6',
            borderRadius: 14,
            borderTopLeftRadius: 4,
            padding: '14px 16px',
            fontSize: 13.5,
            lineHeight: 1.55,
            color: '#1C3B2C',
            marginBottom: 12,
          }}
        >
          {mensaje}
        </div>
        <button onClick={copiar} className="btn btn-primary" style={{ width: '100%' }}>
          {copiado ? '✓ Copiado' : 'Copiar mensaje'}
        </button>
      </aside>
    </>
  );
}

function MiniStat({ label, value, span2, cap }) {
  return (
    <div style={{ gridColumn: span2 ? 'span 2' : 'auto' }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--ink-faint)', letterSpacing: '0.03em', marginBottom: 2 }}>
        {label.toUpperCase()}
      </div>
      <div style={{ fontSize: 13.5, fontWeight: 600, textTransform: cap ? 'capitalize' : 'none' }}>{value}</div>
    </div>
  );
}
