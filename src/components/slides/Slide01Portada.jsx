export default function Slide01Portada() {
  return (
    <div style={{ width: '100%', maxWidth: 800, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <div className="badge">KOLTIN · GROWTH ENGINEER CHALLENGE</div>
      <h1 style={{ margin: 0, fontSize: 'clamp(34px, 6vw, 56px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.08 }}>
        De Renovaciones a Retención
      </h1>
      <p style={{ margin: 0, fontSize: 17, color: 'var(--ink-soft)', maxWidth: 520, lineHeight: 1.5 }}>
        Un sistema proactivo para que renovar deje de ser un evento del día 365 y pase a ser un proceso que arranca
        90 días antes.
      </p>
      <div style={{ marginTop: 14, fontSize: 13.5, color: 'var(--ink-faint)' }}>
        Juan Bautista Beck · 17 de agosto de 2026
      </div>
    </div>
  );
}
