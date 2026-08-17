// Genera ~100 clientes mock para el prototipo "Salud de cartera" de Koltin.
// Uso: node scripts/generate-clients.js > src/data/clients.json

const HOY = new Date('2026-08-17T00:00:00');

const NOMBRES = [
  'María', 'José', 'Guadalupe', 'Juan', 'Margarita', 'Francisco', 'Rosa', 'Roberto',
  'Alejandra', 'Manuel', 'Patricia', 'Carlos', 'Leticia', 'Jorge', 'Elena', 'Ricardo',
  'Gabriela', 'Fernando', 'Adriana', 'Miguel', 'Verónica', 'Alejandro', 'Silvia', 'Arturo',
  'Beatriz', 'Ignacio', 'Teresa', 'Eduardo', 'Norma', 'Raúl', 'Cecilia', 'Sergio',
  'Diana', 'Enrique', 'Isabel', 'Héctor', 'Claudia', 'Alfonso', 'Martha', 'Rodrigo',
  'Lucía', 'Salvador', 'Araceli', 'Antonio', 'Yolanda', 'Ernesto', 'Karla', 'Javier',
  'Mónica', 'Rubén', 'Sofía', 'Emilio', 'Renata', 'Andrés', 'Ximena', 'Pablo',
  'Valentina', 'Diego', 'Camila', 'Mateo'
];

const APELLIDOS = [
  'García', 'Hernández', 'Martínez', 'López', 'González', 'Rodríguez', 'Pérez', 'Sánchez',
  'Ramírez', 'Flores', 'Gómez', 'Díaz', 'Reyes', 'Morales', 'Cruz', 'Ortiz',
  'Gutiérrez', 'Chávez', 'Ramos', 'Jiménez', 'Vázquez', 'Castillo', 'Mendoza', 'Romero',
  'Torres', 'Aguilar', 'Rivera', 'Medina', 'Guerrero', 'Vargas', 'Salazar', 'Contreras'
];

const RENOVADORES = ['Ana Beltrán', 'Luis Ponce', 'Daniela Cordero', 'Mauricio Solís', 'Fernanda Lira'];

// --- utilidades ---
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[randInt(0, arr.length - 1)]; }
function pickWeighted(pairs) {
  // pairs: [[valor, peso], ...]
  const total = pairs.reduce((s, [, w]) => s + w, 0);
  let r = Math.random() * total;
  for (const [v, w] of pairs) { if ((r -= w) <= 0) return v; }
  return pairs[pairs.length - 1][0];
}
function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }
function fmtDate(d) { return d.toISOString().slice(0, 10); }
function addDays(base, days) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}
function bucketEdad(edad) {
  if (edad < 40) return '18-39';
  if (edad < 64) return '40-63';
  return '64+';
}
function montoAnual(edad) {
  // ancla: 50 -> 47000, 84 -> 131000. Para menores de 50, precio decreciente moderado.
  let monto;
  if (edad <= 50) monto = 47000 - (50 - edad) * 300;
  else monto = 47000 + (edad - 50) * 2470.6;
  monto = clamp(monto, 32000, 135000);
  return Math.round(monto / 100) * 100;
}

const usados = new Set();
function idHubspot() {
  let id;
  do { id = 'hs-' + randInt(1000, 9999); } while (usados.has(id));
  usados.add(id);
  return id;
}

function scoreRiesgo({ bucket_edad, porcentaje_aumento, dias_desde_ultima_interaccion }) {
  // 64+ : el precio pesa menos (no tiene alternativa de mercado), la desconexión pesa más.
  // 18-39 / 40-63: el precio pesa más (sí tienen alternativas de seguro).
  const wAumento = bucket_edad === '64+' ? 0.30 : 0.60;
  const wDias = bucket_edad === '64+' ? 0.60 : 0.30;
  const aumentoNorm = (porcentaje_aumento - 5) / (25 - 5); // 0..1
  const diasNorm = clamp(dias_desde_ultima_interaccion / 150, 0, 1);
  const ruido = randInt(-8, 8);
  const score = wAumento * 100 * aumentoNorm + wDias * 100 * diasNorm + ruido;
  return clamp(Math.round(score), 2, 98);
}

function scoreEngagement({ edl_completado, uso_casa_koltin }) {
  const porEdl = edl_completado ? 68 : 12;
  const porCasa = uso_casa_koltin === 'frecuente' ? 78 : uso_casa_koltin === 'ocasional' ? 42 : 8;
  const base = Math.max(porEdl, porCasa);
  const bono = edl_completado && uso_casa_koltin === 'frecuente' ? 12 : 0;
  const ruido = randInt(-6, 6);
  return clamp(Math.round(base + bono + ruido), 2, 98);
}

function cuadranteDe(riesgo, engagement) {
  if (riesgo >= 50 && engagement < 50) return 'prioridad_maxima';
  if (riesgo >= 50 && engagement >= 50) return 'cuidar_vinculo';
  if (riesgo < 50 && engagement < 50) return 'meter_en_orbita';
  return 'se_retiene_solo';
}

// --- plan de distribución por etapa (suma 100) ---
const PLAN_ETAPAS = [
  { etapa: 'vence_90', n: 20 },
  { etapa: 'contactado_edl', n: 15 },
  { etapa: 'edl_agendado', n: 10 },
  { etapa: 'edl_completado', n: 15 },
  { etapa: 'link_pago_enviado', n: 15 },
  { etapa: 'pagado_renovado', n: 15 },
  { etapa: 'vencido_churn', n: 10 },
];

function generarCliente(etapa, idx) {
  const edad = pickWeighted([[randInt(18, 39), 12], [randInt(40, 63), 30], [randInt(64, 88), 58]]);
  const bucket_edad = bucketEdad(edad);
  const nombre = `${pick(NOMBRES)} ${pick(APELLIDOS)} ${pick(APELLIDOS)}`;
  const porcentaje_aumento_esperado = randInt(5, 25);
  const uso_casa_koltin = pickWeighted([['frecuente', 20], ['ocasional', 35], ['nunca', 45]]);

  let dias_para_vencer, edl_agendado = false, edl_completado = false, fecha_contacto_edl = null;
  let dias_desde_ultima_interaccion;

  switch (etapa) {
    case 'vence_90':
      dias_para_vencer = randInt(75, 90);
      dias_desde_ultima_interaccion = randInt(20, 220);
      break;
    case 'contactado_edl':
      dias_para_vencer = randInt(55, 83);
      dias_desde_ultima_interaccion = randInt(7, 130);
      fecha_contacto_edl = fmtDate(addDays(HOY, -randInt(7, 20)));
      break;
    case 'edl_agendado':
      edl_agendado = true;
      dias_para_vencer = randInt(35, 75);
      dias_desde_ultima_interaccion = randInt(1, 90);
      fecha_contacto_edl = fmtDate(addDays(HOY, -randInt(10, 30)));
      break;
    case 'edl_completado':
      edl_agendado = true;
      edl_completado = true;
      dias_para_vencer = randInt(20, 65);
      dias_desde_ultima_interaccion = randInt(0, 100);
      fecha_contacto_edl = fmtDate(addDays(HOY, -randInt(15, 40)));
      break;
    case 'link_pago_enviado': {
      // Camino B (fallback): a los 14 días totales no respondió ni agendó el EDL,
      // así que nunca llega a agendar/completar — se le manda el link directo
      // con la oferta de pago anticipado en vez del descuento por EDL.
      const caminoB = idx % 5 === 2; // ~1 de cada 5, mezcla de casos urgentes y no urgentes
      edl_completado = !caminoB;
      edl_agendado = !caminoB;
      const urgente = idx % 3 === 0; // ~1/3 de este bloque, casos urgentes
      dias_para_vencer = urgente ? randInt(1, 13) : randInt(14, 35);
      dias_desde_ultima_interaccion = randInt(0, 120);
      fecha_contacto_edl = fmtDate(addDays(HOY, -randInt(20, 55)));
      break;
    }
    case 'pagado_renovado':
      edl_completado = Math.random() < 0.75;
      edl_agendado = edl_completado || Math.random() < 0.4;
      dias_para_vencer = randInt(120, 360);
      dias_desde_ultima_interaccion = randInt(0, 110);
      fecha_contacto_edl = fmtDate(addDays(HOY, -randInt(40, 90)));
      break;
    case 'vencido_churn':
      edl_completado = Math.random() < 0.15;
      edl_agendado = edl_completado || Math.random() < 0.25;
      dias_para_vencer = -randInt(1, 45);
      dias_desde_ultima_interaccion = randInt(20, 200);
      break;
  }

  const fecha_vencimiento = fmtDate(addDays(HOY, dias_para_vencer));
  const score_riesgo = scoreRiesgo({ bucket_edad, porcentaje_aumento: porcentaje_aumento_esperado, dias_desde_ultima_interaccion });
  const score_engagement = scoreEngagement({ edl_completado, uso_casa_koltin });
  const cuadrante = cuadranteDe(score_riesgo, score_engagement);

  return {
    id: idHubspot(),
    id_hubspot: undefined, // se sobreescribe abajo, evita doble llamada a idHubspot
    nombre,
    edad,
    bucket_edad,
    fecha_vencimiento,
    dias_para_vencer,
    porcentaje_aumento_esperado,
    edl_agendado,
    edl_completado,
    fecha_contacto_edl,
    uso_casa_koltin,
    dias_desde_ultima_interaccion,
    monto_anual_mxn: montoAnual(edad),
    etapa_actual: etapa,
    score_riesgo,
    score_engagement,
    cuadrante,
    renovador_asignado: pick(RENOVADORES),
  };
}

let clientes = [];
PLAN_ETAPAS.forEach(({ etapa, n }) => {
  for (let i = 0; i < n; i++) clientes.push(generarCliente(etapa, i));
});

// limpieza: usar id_hubspot como único campo id, y quitar duplicados de campo
clientes = clientes.map(c => {
  const { id, id_hubspot, ...rest } = c;
  return { id_hubspot: id, ...rest };
});

console.log(JSON.stringify(clientes, null, 2));
