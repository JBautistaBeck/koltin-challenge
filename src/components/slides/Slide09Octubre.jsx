import SlideShell, { Nota } from './SlideShell.jsx';

export default function Slide09Octubre() {
  return (
    <SlideShell kicker="Fuera del scope del equipo — se documenta igual" title="Plan de octubre: cómo comunicar el aumento">
      <ul style={{ margin: '0 0 4px', paddingLeft: 20, lineHeight: 1.75 }}>
        <li>
          <strong>Anticipar, nunca el día del vencimiento.</strong> La conversación sobre el aumento arranca semanas
          antes, dentro del mismo flujo de retención de 90 días.
        </li>
        <li>
          <strong>Framear el aumento como parte del valor ya recibido</strong> (comunidad, prevención, no haber
          pisado el hospital), no como una suba aislada y desconectada del año que pasó.
        </li>
        <li>
          <strong>El EDL como palanca visible de descuento</strong> desde el primer mensaje, no como un dato que se
          menciona a mitad de la negociación.
        </li>
        <li>
          <strong>Cuotas visibles desde el inicio</strong>, no como algo que hay que pedir después de que el cliente
          ya dudó del precio.
        </li>
      </ul>

      <Nota>
        Esto excede lo que el equipo de renovadores puede ejecutar solo — necesita alineación con Marketing/Comms
        sobre el mensaje del aumento. Se documenta acá porque octubre es el momento en que el sistema de retención
        se pone a prueba de verdad.
      </Nota>
    </SlideShell>
  );
}
