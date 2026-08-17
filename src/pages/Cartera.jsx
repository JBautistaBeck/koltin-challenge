import { useMemo, useState } from 'react';
import clientesRaw from '../data/clients.json';
import Header from '../components/Header.jsx';
import FunnelChart from '../components/FunnelChart.jsx';
import UrgencyBanner from '../components/UrgencyBanner.jsx';
import Legend from '../components/Legend.jsx';
import ClientTable from '../components/ClientTable.jsx';
import ClientPanel from '../components/ClientPanel.jsx';
import { ETAPAS, ETAPA_POR_KEY, CUADRANTES } from '../data/constants.js';

const RENOVADORES = [...new Set(clientesRaw.map((c) => c.renovador_asignado))].sort();

export default function Cartera() {
  const [renovador, setRenovador] = useState('Todos');
  const [filtro, setFiltro] = useState({ etapa: null, cuadrante: null });
  const [seleccionado, setSeleccionado] = useState(null);

  const clientes = useMemo(() => {
    if (renovador === 'Todos') return clientesRaw;
    return clientesRaw.filter((c) => c.renovador_asignado === renovador);
  }, [renovador]);

  const conteos = useMemo(() => {
    const acc = {};
    for (const etapa of ETAPAS) acc[etapa.key] = { total: 0 };
    for (const c of clientes) {
      const bucket = acc[c.etapa_actual];
      if (!bucket) continue;
      bucket.total += 1;
      bucket[c.cuadrante] = (bucket[c.cuadrante] || 0) + 1;
    }
    return acc;
  }, [clientes]);

  const maxTotal = Math.max(1, ...Object.values(conteos).map((v) => v.total));

  const urgentes = useMemo(
    () => clientes.filter((c) => c.etapa_actual === 'link_pago_enviado' && c.dias_para_vencer < 14),
    [clientes]
  );

  const clientesFiltrados = useMemo(() => {
    if (!filtro.etapa) return clientes;
    return clientes.filter(
      (c) => c.etapa_actual === filtro.etapa && (filtro.cuadrante === null || c.cuadrante === filtro.cuadrante)
    );
  }, [clientes, filtro]);

  function onSegmentClick(etapaKey, cuadranteKey) {
    setFiltro((prev) =>
      prev.etapa === etapaKey && prev.cuadrante === cuadranteKey
        ? { etapa: null, cuadrante: null }
        : { etapa: etapaKey, cuadrante: cuadranteKey }
    );
  }

  function onColumnClick(etapaKey) {
    setFiltro((prev) => (prev.etapa === etapaKey && prev.cuadrante === null ? { etapa: null, cuadrante: null } : { etapa: etapaKey, cuadrante: null }));
  }

  function onToggleCuadrante(cuadranteKey) {
    setFiltro((prev) => ({ etapa: prev.etapa, cuadrante: prev.cuadrante === cuadranteKey ? null : cuadranteKey }));
  }

  function limpiarFiltro() {
    setFiltro({ etapa: null, cuadrante: null });
  }

  const etapaSeleccionadaLabel = filtro.etapa ? ETAPA_POR_KEY[filtro.etapa]?.label : null;

  return (
    <div style={{ minHeight: '100%', paddingBottom: 80 }}>
      <Header renovadores={RENOVADORES} renovadorSeleccionado={renovador} onChangeRenovador={setRenovador} />

      <main className="container" style={{ paddingTop: 28, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <section className="card" style={{ padding: '24px 26px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', marginBottom: 18 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Funnel de retención</h2>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--ink-faint)' }}>
                Clickeá un color para ver a esas personas · clickeá el título de una etapa para verlas a todas.
              </p>
            </div>
            <Legend filtro={filtro} onToggle={onToggleCuadrante} />
          </div>

          <FunnelChart
            conteos={conteos}
            maxTotal={maxTotal}
            filtro={filtro}
            onSegmentClick={onSegmentClick}
            onColumnClick={onColumnClick}
          />

          <div style={{ marginTop: 20 }}>
            <UrgencyBanner count={urgentes.length} onClick={() => setFiltro({ etapa: 'link_pago_enviado', cuadrante: null })} />
          </div>
        </section>

        <section className="card" style={{ padding: '22px 26px 26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
            <div style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>
              Mostrando{' '}
              <strong style={{ color: 'var(--ink)' }}>
                {filtro.etapa
                  ? `${etapaSeleccionadaLabel}${filtro.cuadrante ? ` · ${CUADRANTES[filtro.cuadrante].label}` : ''}`
                  : 'todas las etapas'}
              </strong>{' '}
              ({clientesFiltrados.length} {clientesFiltrados.length === 1 ? 'persona' : 'personas'})
            </div>
            {filtro.etapa && (
              <button onClick={limpiarFiltro} className="btn" style={{ padding: '6px 14px', fontSize: 12.5 }}>
                Ver todos
              </button>
            )}
          </div>
          <ClientTable clientes={clientesFiltrados} onSelect={setSeleccionado} />
        </section>
      </main>

      <ClientPanel cliente={seleccionado} onClose={() => setSeleccionado(null)} />
    </div>
  );
}
