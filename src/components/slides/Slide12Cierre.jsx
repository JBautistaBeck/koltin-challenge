export default function Slide12Cierre() {
  return (
    <div style={{ width: '100%', maxWidth: 720, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <div className="badge">CIERRE</div>
      <h2 style={{ margin: 0, fontSize: 'clamp(26px, 4.5vw, 38px)', fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
        Todo esto es hipótesis con datos incompletos
      </h2>
      <p style={{ margin: 0, fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
        El diagnóstico, el scoring y el plan de octubre se construyeron con la información compartida en el
        challenge, no con data histórica real de Koltin. El primer paso real sería sentarme con los 5 renovadores y
        con los datos de renovaciones pasadas, y ajustar desde ahí.
      </p>
      <p style={{ margin: '10px 0 0', fontSize: 14.5, color: 'var(--ink-faint)' }}>
        Gracias por la lectura y por el tiempo.
      </p>
    </div>
  );
}
