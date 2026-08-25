# Koltin — De Renovaciones a Retención

Prototipo para el challenge técnico de Growth Engineer en Koltin: un panel de "salud de cartera" para el equipo de renovadores + una presentación navegable que explica el diagnóstico y el sistema propuesto.

## Contexto del challenge

Koltin es una startup mexicana de seguros médicos y salud preventiva para adultos mayores de 64 años. Su retención de renovaciones cayó de 93% a menos de 89%, en un proceso que hoy es 100% reactivo: la alerta se dispara recién el día del vencimiento. Este proyecto propone reencuadrar "renovación" (evento del día 365) como "retención" (proceso que arranca 90 días antes), usando un **Estudio de Longevidad (EDL)** gratuito como gancho de entrada, y un sistema de scoring de **riesgo × engagement** que decide el tono y la oferta de los mensajes automáticos que recibe cada cliente. El repo contiene dos entregables: una app funcional con datos mock (el panel que usaría el equipo de renovación) y una presentación tipo slides que cuenta el razonamiento detrás.

## Estructura del proyecto

```
koltin-challenge/
├── index.html                     # entry HTML de Vite, monta #root
├── package.json
├── vite.config.js                 # config mínima: plugin de React
├── scripts/
│   └── generate-clients.js        # genera src/data/clients.json (dataset mock)
└── src/
    ├── main.jsx                   # bootstrap de React
    ├── App.jsx                    # HashRouter con las 2 rutas de la app
    ├── data/
    │   ├── clients.json           # 100 clientes mock (salida del script generador)
    │   └── constants.js           # fuente única de verdad: etapas, cuadrantes, mensajes, triggers
    ├── pages/
    │   ├── Cartera.jsx            # ruta "/" — el panel de renovadores
    │   └── Presentacion.jsx       # ruta "/presentacion" — el slider
    ├── components/
    │   ├── Header.jsx             # cabecera de Cartera + selector de renovador
    │   ├── FunnelChart.jsx        # gráfico de barras apiladas por etapa/cuadrante
    │   ├── Legend.jsx             # leyenda de los 4 cuadrantes, clickeable como filtro
    │   ├── UrgencyBanner.jsx      # aviso de clientes con <14 días y pago pendiente
    │   ├── ClientTable.jsx        # tabla de clientes filtrada
    │   ├── ClientPanel.jsx        # drawer de detalle + mensaje de WhatsApp copiable
    │   └── slides/
    │       ├── SlideShell.jsx     # layout compartido de las slides (+ StatCard, Nota)
    │       ├── Slide01Portada.jsx
    │       ├── Slide02Problema.jsx
    │       ├── Slide03Hipotesis.jsx
    │       ├── Slide04Reframe.jsx
    │       ├── Slide05Funnel.jsx
    │       ├── Slide07Scoring.jsx
    │       ├── Slide08MVP.jsx
    │       ├── Slide09Octubre.jsx
    │       ├── Slide11Metricas.jsx
    │       └── Slide12Cierre.jsx
    └── styles/
        └── global.css             # variables CSS (paleta, radios, sombra), clases utilitarias
```

Notar que la numeración de archivos de slides salta del `05` al `07` y del `09` al `11` (no existen `Slide06` ni `Slide10`): son slides que existieron en algún momento y se eliminaron (el historial de git muestra un commit *"Remove the 'Plan de septiembre' slide from the presentation"*). Los archivos que quedan no se renombraron.

## Stack técnico real

Tomado de `package.json` y de los imports efectivos en el código:

- **React 18** (`react`, `react-dom`) — toda la UI, sin ningún otro framework de componentes.
- **React Router 6** (`react-router-dom`), con `HashRouter` (no `BrowserRouter`) — ver sección de decisiones de diseño.
- **Vite 5** (`vite`, `@vitejs/plugin-react`) como build tool y dev server.
- **@vercel/analytics** — se importa `<Analytics />` en `App.jsx`; indica que el despliegue vive en Vercel.
- **JavaScript puro (JSX), sin TypeScript.** No hay `tsconfig.json` ni tipos.
- **CSS plano** (`global.css` con variables custom) combinado con estilos inline en cada componente (`style={{...}}`). No hay Tailwind, CSS Modules, styled-components ni ninguna librería de UI.
- No hay librería de gráficos ni de diagramas: el funnel de la app y el diagrama de flujo de la slide 05 están dibujados a mano con `<div>`s posicionados y SVG plano.
- No hay test runner, linter ni formateador configurado en el repo (no hay Jest/Vitest, ESLint ni Prettier).

## Cómo correr el proyecto localmente

```bash
npm install
npm run dev        # levanta Vite en modo desarrollo (por defecto http://localhost:5173)
```

Otros scripts definidos en `package.json`:

```bash
npm run build       # build de producción con Vite (carpeta dist/)
npm run preview      # sirve el build de producción localmente
```

Para regenerar el dataset mock de clientes (ver más abajo):

```bash
node scripts/generate-clients.js > src/data/clients.json
```

## Las dos partes del proyecto

### 1. La app — "Salud de cartera" (`/`)

Es el panel pensado para el equipo de 5 renovadores. Se compone en `src/pages/Cartera.jsx`:

- **Header**: título, badge que aclara *"Mock HubSpot + WhatsApp · corte 17/08/2026 · no es una integración real"*, y un selector para filtrar toda la vista por renovador asignado (o "Todos").
- **Funnel de retención** (`FunnelChart.jsx`): un gráfico de barras apiladas con una columna por cada una de las 7 etapas del ciclo (ver más abajo), cada columna apilada por los 4 cuadrantes de riesgo/engagement. Es clickeable: click en un segmento de color filtra por etapa+cuadrante, click en el título de la columna filtra por toda la etapa. Incluye badges de "Agente 1 de agendamiento" / "Agente 2 de cobranzas" sobre las columnas donde dispara cada trigger automático, con tooltip explicando qué hace ese trigger, y una línea punteada vertical que marca el corte de "vencimiento" entre la etapa de pago pendiente y los dos estados finales.
- **Banner de urgencia** (`UrgencyBanner.jsx`): cuenta cuántos clientes están en "link de pago enviado" con menos de 14 días para vencer, y linkea a ese filtro.
- **Leyenda** (`Legend.jsx`): los 4 cuadrantes, también clickeables como filtro (toggle independiente del filtro por etapa).
- **Tabla de clientes** (`ClientTable.jsx`): lista filtrada con nombre, "qué hacer" (acción sugerida), fecha/días para vencer, % de aumento, estado del EDL, uso de Casa Koltin y monto anual. Clickear una fila abre el detalle.
- **Panel de detalle** (`ClientPanel.jsx`): drawer lateral con todos los datos del cliente, sus dos scores (riesgo/engagement), y el mensaje de WhatsApp que le correspondería según su cuadrante (o su "camino"), con botón para copiarlo al portapapeles (`navigator.clipboard`).

**El dataset mock.** `src/data/clients.json` son 100 clientes generados por `scripts/generate-clients.js` (un script standalone de Node, no se ejecuta desde la app: se corre una vez a mano y su salida por stdout se redirige al `.json`). El script arma nombres al azar, reparte los 100 clientes en las 7 etapas según un plan fijo (`PLAN_ETAPAS`), y por cada cliente calcula edad (con distribución ponderada hacia 64+), monto anual (fórmula que ancla 50 años → $47.000 MXN y 84 años → $131.000 MXN), fechas de vencimiento/contacto coherentes con su etapa, y **los dos scores y el cuadrante que van a quedar grabados en el JSON**.

**La lógica de scoring, tal como está implementada:**
- `scoreRiesgo()`: combina `% de aumento esperado` y `días desde la última interacción`, con pesos que cambian según el bucket de edad — en 64+ pesa más la desconexión (60%) y menos el precio (30%), porque ese segmento no tiene alternativa de mercado; en menores de 64 es al revés (60% precio / 30% desconexión), porque sí pueden cambiarse de seguro. Se le suma ruido aleatorio (±8) y se recorta a un rango 2–98.
- `scoreEngagement()`: toma el máximo entre "haber completado el EDL" (68 pts) y el uso de Casa Koltin (78/42/8 según sea frecuente/ocasional/nunca), con un bono de +12 si se dan ambas cosas a la vez, más ruido (±6), recortado 2–98.
- `cuadranteDe(riesgo, engagement)`: corte fijo en 50/100 en cada eje → `prioridad_maxima` (riesgo alto, engagement bajo), `cuidar_vinculo` (riesgo alto, engagement alto), `meter_en_orbita` (riesgo bajo, engagement bajo), `se_retiene_solo` (riesgo bajo, engagement alto).

Importante: **esta función de scoring solo existe en el script generador.** La app en sí (`Cartera.jsx` y compañía) nunca recalcula `score_riesgo`, `score_engagement` ni `cuadrante` — los lee tal cual vienen grabados en `clients.json`. Es decir, el "motor de scoring" no corre en vivo dentro de la app; es una función que se corrió una sola vez para producir un dataset de ejemplo internamente consistente.

**El funnel de etapas, tal como existe hoy** (definido en `src/data/constants.js`, array `ETAPAS`), son 7 etapas lineales:

1. `vence_90` — Vence en &lt;90 días (entrada automática al funnel)
2. `contactado_edl` — Contactado para EDL, sin agendar
3. `edl_agendado` — EDL agendado, todavía no realizado
4. `edl_completado` — EDL hecho, corresponde ofrecer condiciones de renovación
5. `link_pago_enviado` — Esperando pago
6. `pagado_renovado` — Renovación exitosa (estado final positivo)
7. `vencido_churn` — Venció sin renovar (estado final negativo)

Sobre ese funnel lineal hay una ramificación real: los clientes que llegan a "link de pago enviado" **sin** haber completado el EDL (`esCaminoB()` en `constants.js`) recibieron un mensaje distinto — la oferta de pago anticipado, camino B/fallback — en vez del descuento vinculado al EDL. En el dataset generado, ~1 de cada 5 clientes de esa etapa sigue este camino B (`idx % 5 === 2` en el script generador).

Tres funciones de `constants.js` corren **en vivo**, sobre esos datos ya fijos, cada vez que se renderiza la tabla o el panel:
- `mensajeWhatsapp(cliente)` — arma el texto exacto del mensaje según cuadrante (o camino B), interpolando el primer nombre del cliente.
- `accionSugerida(cliente)` — decide qué texto de "qué hacer" mostrar: alerta urgente si quedan &lt;14 días sin pagar, texto de camino B, o el texto genérico de la etapa.
- Los conteos por etapa/cuadrante y el filtrado de la tabla (todo en `Cartera.jsx`) se recalculan client-side con `useMemo` cada vez que cambia el renovador seleccionado o el filtro.

### 2. La presentación (`/presentacion`)

Slider de **10 diapositivas**, navegable con los botones "Anterior/Siguiente", los puntos de paginación, o el teclado (flechas, `PageUp`/`PageDown`, barra espaciadora). El orden real de aparición (definido en el array `SLIDES` de `Presentacion.jsx`) **no coincide** con el orden numérico de los archivos — el slide de "MVP" se ubica antes que el del funnel, aunque su archivo se llame `Slide08MVP.jsx`:

1. **Portada** (`Slide01Portada`) — título y autoría.
2. **El problema** (`Slide02Problema`) — caída de 93% a &lt;89%, 40% del churn ocurre en renovación, equipo recién migrado a HubSpot sin automatizaciones, cambio de tasas en octubre.
3. **Hipótesis de churn** (`Slide03Hipotesis`) — dos capas: fricción operativa (explica la caída reciente) vs. falta de "órbita" durante el año (explica el piso estructural).
4. **El reframe central** (`Slide04Reframe`) — de "renovación" (evento reactivo día 365) a "retención" (proceso que arranca 90 días antes), con el EDL como gancho.
5. **Producto: MVP** (`Slide08MVP`) — presenta el panel de renovadores y los dos agentes automáticos por WhatsApp (Agente 1 de agendamiento, Agente 2 de cobranzas) y qué dispara cada uno.
6. **El funnel de retención** (`Slide05Funnel`) — diagrama de flujo dibujado a mano (SVG + divs posicionados) con las 7 etapas, la ramificación del camino B y los 5 triggers automáticos, con badges y tooltips por agente.
7. **Cómo funciona el scoring** (`Slide07Scoring`) — diagrama de los dos ejes (riesgo y engagement), sus inputs, el corte en 50/100 y la matriz de 4 cuadrantes resultante. Incluye botón para ir a la app en vivo.
8. **Plan de octubre** (`Slide09Octubre`) — 4 principios para comunicar el aumento de tasas que viene en octubre; el propio kicker de la slide aclara que está *"Fuera del scope del equipo — se documenta igual"*.
9. **Métricas del sistema** (`Slide11Metricas`) — 4 métricas de éxito: % de renovación mensual, % de EDL completado antes del vencimiento, tiempo entre alerta y primer contacto, churn por no-contacto vs. churn por rechazo activo.
10. **Cierre** (`Slide12Cierre`) — agradecimiento + próximo paso sugerido + botón a la app.

`SlideShell.jsx` es el layout compartido (kicker + título + contenido, con variante `wide`) y expone también los componentes reutilizables `StatCard` (tarjetas de métrica) y `Nota` (callout gris).

## Qué es mock y qué es lógica real

Explícito en el propio código (badge del header de la app): *"Mock HubSpot + WhatsApp · no es una integración real"*. En concreto:

**Es mock / estático:**
- Los 100 clientes de `clients.json` (nombres, fechas, montos — todos generados por script).
- `score_riesgo`, `score_engagement` y `cuadrante` de cada cliente: se calculan una única vez al generar el dataset, no en runtime.
- Cualquier integración con HubSpot o WhatsApp: no hay llamadas de red a ninguna API externa; "enviar" un mensaje es copiarlo al portapapeles.
- La fecha "de hoy" (`HOY = '2026-08-17'` en `constants.js`, coincide con la usada por el script generador): es una constante fija, no `Date.now()`.

**Es lógica real que corre en el navegador:**
- La construcción del texto de cada mensaje de WhatsApp (`mensajeWhatsapp`) y de la acción sugerida (`accionSugerida`), a partir de los campos ya fijos del cliente.
- Toda la interacción de filtrado del funnel/tabla/leyenda, el conteo de personas por etapa/cuadrante, y la detección de "camino B" y de urgencia (&lt;14 días sin pagar).
- Copiar al portapapeles (`navigator.clipboard.writeText`).
- Toda la navegación (rutas, slider de presentación, atajos de teclado).

## Decisiones de diseño no obvias

- **`constants.js` como fuente única de verdad**, tal como lo dice su propio comentario de cabecera: la definen así explícitamente para que la app y la presentación "hablen exactamente el mismo idioma" — ambas importan las mismas etapas, cuadrantes, textos de mensajes y triggers, en vez de duplicar esa información.
- **`HashRouter` en vez de `BrowserRouter`**: con rutas basadas en `#/...` no hace falta configurar rewrites en el hosting estático (Vercel/GitHub Pages) para que `/presentacion` no dé 404 al refrescar.
- **El diagrama de flujo de la slide 05 no usa ninguna librería de diagramas.** Está armado a mano con coordenadas en píxeles (`POS`, un objeto por caja) sobre un único sistema de coordenadas, combinando SVG (líneas y el rombo de decisión) con `<div>`s posicionados en `absolute` para cajas/textos/badges — decisión explícita documentada en el propio código como "liviano y fácil de tocar a mano".
- **El "camino B" no es un array de triggers separado.** `TRIGGER_PAGO_ANTICIPADO` y `TRIGGER_ALERTA_URGENCIA` se definen aparte de `TRIGGERS` a propósito: `TRIGGERS` alimenta directamente las columnas del funnel lineal de la app (que no puede mostrar la ramificación), mientras que los otros dos sí se usan en el diagrama de flujo de la presentación, que sí distingue caminos.
- **Los badges de agente se agrupan por agente, no por trigger**: si dos triggers del mismo agente caen en la misma columna (ej. "EDL completado", que agrupa el descuento por EDL y la oferta de camino B), se muestra un solo badge con un tooltip que concatena ambos textos, en vez de mostrar dos badges pegados.
- **Vercel Analytics** está integrado (`<Analytics />` en `App.jsx`) pero es lo único vinculado a un servicio externo real en todo el proyecto; el resto del "backend" (HubSpot, WhatsApp) es enteramente simulado.

## Notas / pendientes

- No existía ningún `README.md` previo en el repo; este documento se armó desde cero leyendo el código actual.
- Los archivos de slides mantienen numeración `01–12` pero solo hay 10 (faltan `06` y `10`, correspondientes a slides que se eliminaron según el historial de git — ej. un "Plan de septiembre" que se sacó de la presentación). El orden de archivos tampoco coincide con el orden real de aparición en el slider (`Slide08MVP` se muestra antes que `Slide05Funnel`). Esto puede confundir a quien navegue el código por primera vez guiándose solo por los nombres de archivo.
- No hay tests, linter ni CI configurados en el repo.
- El scoring de riesgo/engagement es una función que corrió una sola vez para generar el dataset; si el objetivo del challenge era demostrar un motor de scoring corriendo en vivo sobre señales de cada cliente, eso **no** está implementado como tal en la app — la app consume scores ya calculados y congelados en el JSON.
- `scripts/generate-clients.js` no está integrado a ningún script de `package.json` (no hay `npm run generate-data` ni similar); hay que invocarlo a mano con `node` y redirigir la salida.
