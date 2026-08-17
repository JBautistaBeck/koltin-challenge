import SlideShell from './SlideShell.jsx';

function Bloque({ titulo, color, items }) {
  return (
    <div className="card" style={{ padding: '16px 18px', flex: 1, minWidth: 220 }}>
      <div style={{ fontWeight: 800, fontSize: 13.5, color, marginBottom: 8 }}>{titulo}</div>
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Slide10Septiembre() {
  return (
    <SlideShell kicker="Ejecución" title="Plan de septiembre" wide>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
        <Bloque
          titulo="✅ Se shipea semana 1"
          color="var(--verde)"
          items={[
            'El funnel de 7 etapas y el scoring corriendo en HubSpot',
            'Los 3 triggers automáticos de WhatsApp (invitación, FUP, descuento+MSI)',
            'La regla de urgencia de 14 días escalando a los renovadores',
            'La vista de "Salud de cartera" como tablero diario del equipo',
          ]}
        />
        <Bloque
          titulo="📏 Se mide desde el día 1"
          color="var(--azul)"
          items={[
            '% de EDL completado antes del vencimiento',
            'Tiempo entre alerta de riesgo y primer contacto',
            '% de renovación mensual',
          ]}
        />
        <Bloque
          titulo="🚫 NO se hace en septiembre"
          color="var(--rojo)"
          items={[
            'No se entrena un modelo predictivo — el scoring es de reglas simples',
            'No se cambia el pricing ni la comunicación del aumento de octubre',
            'No se automatiza la llamada humana: sigue siendo decisión del renovador',
          ]}
        />
      </div>

      <p style={{ margin: 0 }}>
        La razón del recorte: septiembre es una ventana corta y el equipo no es técnico. Mejor un sistema simple
        funcionando de punta a punta que uno sofisticado a medio terminar cuando llegue octubre.
      </p>
    </SlideShell>
  );
}
