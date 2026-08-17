// Fuente única de verdad para etapas, cuadrantes y mensajes.
// La usan tanto la app ("Salud de cartera") como la presentación, para
// que ambas hablen exactamente el mismo idioma.

export const HOY = '2026-08-17';

export const ETAPAS = [
  {
    key: 'vence_90',
    orden: 1,
    label: 'Vence en <90 días',
    labelCorto: '<90 días',
    quePasa: 'Punto de entrada automático al funnel de retención.',
    accion: 'Invitación automática al Estudio de Longevidad (EDL) ya enviada por WhatsApp. Esperar respuesta.',
  },
  {
    key: 'contactado_edl',
    orden: 2,
    label: 'Contactado para EDL',
    labelCorto: 'Contactado',
    quePasa: 'Se le invitó al EDL pero no agendó turno.',
    accion: 'Si pasaron 7+ días sin respuesta, se dispara un WhatsApp de follow-up. Si ya se envió, esperar o llamar.',
  },
  {
    key: 'edl_agendado',
    orden: 3,
    label: 'EDL agendado',
    labelCorto: 'Agendado',
    quePasa: 'Tiene turno para el Estudio de Longevidad, todavía no lo hizo.',
    accion: 'Confirmar el turno un día antes. No requiere otra acción hasta que se presente.',
  },
  {
    key: 'edl_completado',
    orden: 4,
    label: 'EDL completado',
    labelCorto: 'EDL hecho',
    quePasa: 'Hizo el estudio. Corresponde ofrecer las condiciones de renovación.',
    accion: 'Se dispara automáticamente el % de descuento por pago anticipado + oferta de meses sin intereses (MSI).',
  },
  {
    key: 'link_pago_enviado',
    orden: 5,
    label: 'Link de pago enviado',
    labelCorto: 'Link enviado',
    quePasa: 'Está esperando pagar la renovación.',
    accion: 'Si quedan menos de 14 días para vencer y no pagó, escalar a llamada directa del renovador (urgente).',
  },
  {
    key: 'pagado_renovado',
    orden: 6,
    label: 'Pagado / renovado',
    labelCorto: 'Renovado',
    quePasa: 'Renovación exitosa. Estado final positivo.',
    accion: 'Sin acción. Mantenerlo en órbita durante el año (Casa Koltin, EDL del próximo ciclo).',
  },
  {
    key: 'vencido_churn',
    orden: 7,
    label: 'Vencido sin renovar',
    labelCorto: 'Churn',
    quePasa: 'Venció sin renovar. Estado final negativo (churn).',
    accion: 'Analizar causa: ¿no se lo contactó a tiempo (operativo) o rechazó activamente (producto/precio)?',
  },
];

export const ETAPA_POR_KEY = Object.fromEntries(ETAPAS.map((e) => [e.key, e]));

// Triggers automáticos que se muestran como íconos entre columnas del funnel.
export const TRIGGERS = [
  {
    key: 'invitacion_edl',
    antesDeEtapa: 'vence_90',
    icono: '1️⃣',
    label: 'Invitación automática',
    tooltip: 'Trigger automático: al entrar a <90 días, WhatsApp invitando al EDL gratuito.',
  },
  {
    key: 'fup_7dias',
    antesDeEtapa: 'contactado_edl',
    icono: '2️⃣',
    label: 'FUP a 7 días',
    tooltip: 'Trigger automático: si a los 7 días no respondió ni agendó, WhatsApp de follow-up.',
  },
  {
    key: 'descuento_msi',
    antesDeEtapa: 'edl_completado',
    icono: '3️⃣',
    label: 'Descuento + MSI',
    tooltip: 'Trigger automático: al completar el EDL, WhatsApp con % de descuento por pago anticipado y oferta de meses sin intereses.',
  },
];

// Trigger del camino B (fallback sin EDL). Se usa en el diagrama de flujo de la
// presentación; no se agrega a TRIGGERS porque ese array alimenta las columnas
// del funnel lineal de la app y ese gráfico no distingue camino A / camino B.
export const TRIGGER_PAGO_ANTICIPADO = {
  key: 'pago_anticipado',
  icono: '4️⃣',
  label: 'Oferta pago anticipado',
  tooltip:
    'Trigger automático (camino B): si a los 14 días totales no respondió ni agendó el EDL, WhatsApp con oferta de pago anticipado (2 meses antes del vencimiento) + MSI, con el link de pago enviado directo — sin el descuento vinculado al EDL.',
};

// Orden de apilado de los segmentos de color en cada columna (de abajo hacia arriba).
export const ORDEN_CUADRANTES = ['prioridad_maxima', 'cuidar_vinculo', 'meter_en_orbita', 'se_retiene_solo'];

export const CUADRANTES = {
  prioridad_maxima: {
    key: 'prioridad_maxima',
    label: 'Prioridad máxima',
    subtitulo: 'Alto riesgo · bajo engagement',
    descripcion: 'No tiene vínculo con Koltin y probablemente no renueva.',
    tono: 'Directo y resolutivo: ofrecé todo (EDL + descuento + cuotas) en el primer mensaje, sin dar vueltas.',
    emoji: '🔴',
    color: '#9F1D34',
    colorSuave: '#F7E4E8',
    colorTexto: '#6E1425',
    mensaje: (nombre) =>
      `Hola ${nombre}, le escribe el equipo de Koltin. Faltan pocos días para su renovación. Queremos que la renueve en las mejores condiciones: si aún no hizo su Estudio de Longevidad, todavía llegamos a agendarlo y eso trae descuentos para su renovación. También tiene la opción de pagar en cuotas sin intereses. Cuéntenos qué prefiere y lo ayudamos.`,
  },
  cuidar_vinculo: {
    key: 'cuidar_vinculo',
    label: 'Cuidar el vínculo',
    subtitulo: 'Alto riesgo · alto engagement',
    descripcion: 'Ya tiene vínculo, pero el aumento de precio lo pone en riesgo.',
    tono: 'Cálido y reconocedor: hablale como a alguien que ya es parte de Koltin, no como a un prospecto.',
    emoji: '🟠',
    color: '#C56A1F',
    colorSuave: '#FBEBDA',
    colorTexto: '#8A4A12',
    mensaje: (nombre) =>
      `Hola ${nombre}, le escribe el equipo de Koltin. Ya es parte de Koltin y queremos que su renovación le quede en las mejores condiciones. Si aún no hizo su Estudio de Longevidad, podemos agendarlo por aquí: es gratis y eso trae descuentos para su renovación. También puede pagar en cuotas sin intereses. Cuéntenos qué prefiere y lo armamos.`,
  },
  meter_en_orbita: {
    key: 'meter_en_orbita',
    label: 'Meter en órbita',
    subtitulo: 'Bajo riesgo · bajo engagement',
    descripcion: 'No está en riesgo inmediato, pero tampoco tiene vínculo real.',
    tono: 'Invitación abierta, sin presión de venta: el objetivo es generar el primer contacto real, no cerrar nada.',
    emoji: '🔵',
    color: '#2563AC',
    colorSuave: '#DFEAF8',
    colorTexto: '#1B4372',
    mensaje: (nombre) =>
      `Hola ${nombre}, le escribe el equipo de Koltin. Queremos invitarle a su Estudio de Longevidad: es gratis, lo cubre su seguro, y completarlo trae descuentos para su renovación. Si le interesa, también hay tai chi, pintura y baile en Casa Koltin. ¿Le agendamos el Estudio esta semana o la que viene?`,
  },
  se_retiene_solo: {
    key: 'se_retiene_solo',
    label: 'Se retiene solo',
    subtitulo: 'Bajo riesgo · alto engagement',
    descripcion: 'Automatización mínima. Casi no necesita intervención.',
    tono: 'Agradecido y liviano: es el mensaje que menos "vende" de los cuatro, casi solo un aviso de cortesía.',
    emoji: '🟢',
    color: '#1F8A70',
    colorSuave: '#DDF1EA',
    colorTexto: '#155F4D',
    mensaje: (nombre) =>
      `Hola ${nombre}, le escribe el equipo de Koltin. Gracias por estar tan cerca este año. Si todavía no hizo su Estudio de Longevidad, se lo dejamos agendado cuando guste: es gratis y trae descuentos para su renovación. Cuando le toque renovar, puede hacerla de contado o en cuotas sin intereses. Contéstenos por aquí y lo dejamos listo.`,
  },
};

// Camino B: llegó a "link de pago enviado" sin haber completado (ni agendado)
// el EDL — el fallback que se dispara a los 14 días totales sin respuesta.
export function esCaminoB(cliente) {
  return cliente.etapa_actual === 'link_pago_enviado' && !cliente.edl_completado;
}

export function mensajePagoAnticipado(nombre) {
  return `Hola ${nombre}, le escribe el equipo de Koltin. Se acerca su renovación. Si paga con 2 meses de anticipación, le dejamos un beneficio especial. También puede hacerlo en cuotas sin intereses. Cuéntenos qué prefiere y lo ayudamos.`;
}

// El mensaje real que le llega a cada cliente: camino B tiene un único texto
// (oferta de pago anticipado, no depende del cuadrante); el resto usa el
// mensaje de su cuadrante, como siempre.
export function mensajeWhatsapp(cliente) {
  const nombrePila = cliente.nombre.split(' ')[0];
  if (esCaminoB(cliente)) return mensajePagoAnticipado(nombrePila);
  return CUADRANTES[cliente.cuadrante].mensaje(nombrePila);
}

export function accionSugerida(cliente) {
  if (cliente.etapa_actual === 'link_pago_enviado' && cliente.dias_para_vencer < 14) {
    return '🚨 Urgente: llamar directo, quedan menos de 14 días y no pagó.';
  }
  if (esCaminoB(cliente)) {
    return 'Camino B (sin EDL): se envió oferta de pago anticipado (2 meses antes) + MSI. Esperar pago.';
  }
  return ETAPA_POR_KEY[cliente.etapa_actual]?.accion ?? '';
}

export function formatMXN(n) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);
}

export function formatFecha(iso) {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}
