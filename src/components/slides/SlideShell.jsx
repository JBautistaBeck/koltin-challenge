export default function SlideShell({ kicker, title, children, wide }) {
  return (
    <div style={{ width: '100%', maxWidth: wide ? 980 : 800, display: 'flex', flexDirection: 'column', gap: 22 }}>
      {kicker && (
        <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: '0.08em', color: 'var(--ink-faint)' }}>
          {kicker.toUpperCase()}
        </div>
      )}
      {title && (
        <h2 style={{ margin: 0, fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.15 }}>
          {title}
        </h2>
      )}
      <div style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--ink-soft)' }}>{children}</div>
    </div>
  );
}

export function Nota({ children }) {
  return (
    <div
      style={{
        marginTop: 4,
        background: '#F1EFE9',
        border: '1px solid var(--border-strong)',
        borderRadius: 12,
        padding: '13px 16px',
        fontSize: 13.5,
        color: 'var(--ink-soft)',
        lineHeight: 1.55,
      }}
    >
      {children}
    </div>
  );
}

export function StatCard({ value, label, sub }) {
  return (
    <div className="card" style={{ padding: '18px 20px', flex: '1 1 180px' }}>
      <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>{value}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginTop: 2 }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--ink-faint)', marginTop: 4, lineHeight: 1.4 }}>{sub}</div>}
    </div>
  );
}
