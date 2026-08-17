export default function UrgencyBanner({ count, onClick }) {
  if (count === 0) {
    return (
      <div
        style={{
          background: 'var(--verde-suave)',
          border: '1px solid #BFE4D8',
          color: 'var(--verde)',
          borderRadius: 12,
          padding: '11px 16px',
          fontSize: 13.5,
          fontWeight: 600,
        }}
      >
        ✓ Nadie con link de pago está por vencer sin pagar en menos de 14 días.
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        textAlign: 'left',
        background: 'var(--rojo-suave)',
        border: '1px solid #EFC3CB',
        color: 'var(--rojo)',
        borderRadius: 12,
        padding: '11px 16px',
        fontSize: 13.5,
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <span aria-hidden>🚨</span>
      {count} {count === 1 ? 'persona tiene' : 'personas tienen'} link de pago y menos de 14 días: escalar a renovador
      para llamada directa.
    </button>
  );
}
