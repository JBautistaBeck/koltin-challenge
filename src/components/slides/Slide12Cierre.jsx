import { Link } from 'react-router-dom';

export default function Slide12Cierre() {
  return (
    <div style={{ width: '100%', maxWidth: 720, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <div className="badge">CIERRE</div>
      <h2 style={{ margin: 0, fontSize: 'clamp(26px, 4.5vw, 38px)', fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
        Muchas gracias
      </h2>
      <p style={{ margin: 0, fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
        El primer paso, ya trabajando adentro de la empresa, sería clave: hablar con el equipo de renovadores para
        entender cómo trabajan hoy.
      </p>

      <Link
        to="/"
        className="btn btn-primary"
        style={{ fontSize: 15.5, padding: '14px 28px', textDecoration: 'none', marginTop: 8 }}
        target="_blank"
        rel="noopener noreferrer"
      >
        Ir a ver la app →
      </Link>
    </div>
  );
}
