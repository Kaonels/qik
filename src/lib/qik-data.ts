// ============================================================
// QIK AI COMMAND CENTER — Central Data Layer
// Based on public information about Qik (qik.do) and the
// Dominican Republic banking sector. No internal bank data.
// ============================================================

export type AgentStatus = "active" | "analyzing" | "alert" | "idle";
export type Priority = "critical" | "high" | "medium" | "low";
export type Accent = "emerald" | "cyan" | "violet" | "amber" | "red" | "gold";

export interface AIAgent {
  id: string;
  index: number;
  name: string;
  shortName: string;
  category: string;
  accent: Accent;
  status: AgentStatus;
  priority: Priority;
  icon: string; // lucide icon name
  objective: string;
  dataSources: string[];
  reasoning: string;
  outputs: string[];
  alerts: string[];
  recommendations: string[];
  automations: string[];
  valueToBank: string;
  kpis: { name: string; value: string; trend: "up" | "down" | "flat" }[];
  liveMetric: { label: string; value: string; sub: string };
  confidence: number; // 0-100
  lastInsight: string;
}

// ============================================================
// THE 20 AI AGENTS
// ============================================================
export const AGENTS: AIAgent[] = [
  {
    id: "competitor-intel",
    index: 1,
    name: "Competitor Intelligence AI",
    shortName: "Competitor Intel",
    category: "Inteligencia Competitiva",
    accent: "cyan",
    status: "active",
    priority: "high",
    icon: "Radar",
    objective:
      "Monitorear 24/7 a los bancos y fintechs de República Dominicana (Banreservas, BHD, Popular, APAP, Scotiabank, Santa Cruz, Caribe, BDI, Ademi) y referentes internacionales (Nubank, Revolut, Wise, Monzo, Mercado Pago) para detectar movimientos estratégicos antes que impacten el mercado.",
    dataSources: [
      "Sitios web públicos de 12+ bancos RD",
      "Apps móviles (Google Play / App Store) — cambios de versión y release notes",
      "Redes sociales: Instagram, TikTok, Threads, Facebook, YouTube",
      "Portal Superintendencia de Bancos (sb.gob.do)",
      "Banco Central RD — reportes de tasas y MPR",
      "Medios: Acento, Listín Diario, Diario Libre, Hoy, N Digital",
      "Reviews públicos en stores (rating, quejas, solicitudes)",
      "Planes de lealtad y promociones publicadas",
    ],
    reasoning:
      "Aplica análisis diferencial: extrae el cambio reciente de cada competidor, lo clasifica (producto / tasa / campaña / feature / UX), estima el impacto en adquisición o retención, y lo compara contra la posición actual de Qik. Modela la 'brecha competitiva' y la 'ventana de reacción' (días hasta que el movimiento afecte share).",
    outputs: [
      "Feed cronológico de movimientos competitivos con score de relevancia",
      "Matriz comparativa de productos, tasas y features vs. Qik",
      "Brechas competitivas priorizadas por impacto/coste de cierre",
      "Ventanas de oportunidad (rangos de días para reaccionar)",
    ],
    alerts: [
      "Banreservas reduce comisión de transferencia — ventana 72h",
      "BHD lanza certificado digital a tasa superior — evaluar respuesta",
      "Competidor lanza campaña de cashback agresiva en redes",
    ],
    recommendations: [
      "Publicar comparativo transparente Cuenta Qik vs. Cuenta Móvil BHD en landing",
      "Activar micro-campaña defensiva en TikTok destacando rendimiento 3-6% de Cuenta Qik",
      "Solicitar al equipo de producto evaluar feature de 'Toque' similar al Toke de Qik en Banreservas Yappy",
    ],
    automations: [
      "Daily scrape de homepages y páginas de producto de competidores",
      "Alerta Slack/email cuando un competidor cambia tasa >25bps",
      "Reporte semanal automático al CMO con delta competitivo",
    ],
    valueToBank:
      "Reduce el tiempo de reacción a movimientos competitivos de semanas a horas, defendiendo share y capturando oportunidades de diferenciación que de otro modo se perderían.",
    kpis: [
      { name: "Movimientos detectados (7d)", value: "47", trend: "up" },
      { name: "Brechas críticas", value: "3", trend: "flat" },
      { name: "Tiempo de reacción", value: "11h", trend: "down" },
      { name: "Share defendido", value: "94%", trend: "up" },
    ],
    liveMetric: { label: "Escaneando", value: "12", sub: "competidores en vivo" },
    confidence: 92,
    lastInsight:
      "BHD reduce requisito de saldo en Cuenta Móvil — Qik mantiene ventaja al no requerir saldo mínimo desde el inicio.",
  },
  {
    id: "viral-content",
    index: 2,
    name: "Viral Content AI",
    shortName: "Viral Content",
    category: "Marketing & Growth",
    accent: "violet",
    status: "analyzing",
    priority: "high",
    icon: "Sparkles",
    objective:
      "Detectar tendencias virales en TikTok, Instagram Reels, Threads, YouTube Shorts y Facebook, y traducirlas en contenido educativo y viral para Qik que aumente alcance orgánico y captación.",
    dataSources: [
      "TikTok trending sounds y hashtags (RD y LatAm)",
      "Instagram Reels top performing en nicho financiero",
      "Threads conversaciones de comunidad financiera RD",
      "YouTube Shorts creators de finanzas personales RD",
      "Creator economy dominicano (backupfinanciero.rd, etc.)",
      "Calendario cultural RD: jornadas, festividades, fechas clave",
    ],
    reasoning:
      "Detecta patrones de enganche (hooks, ritmo, duración, hooks visuales) en contenido viral financiero, los mapea a una 'plantilla de gancho' y los combina con insights de producto de Qik (cashback, Toque, Crea Crédito). Prioriza por potencial de alcance estimado + alineación con marca + adecuación regulatoria (no prometer retornos).",
    outputs: [
      "Calendario semanal de contenido con 14+ ideas priorizadas",
      "Banco de hooks (50+ templates) categorizados por objetivo",
      "Guiones completos con estructura hook→valor→CTA",
      "Conceptos de miniaturas y primeros 3 segundos",
      "Ideas de contenido educativo (#FinanzasConQik) por semana",
    ],
    alerts: [
      "Tendencia emergente 'presupuesto semanal en efectivo' crece 340% en RD",
      "Sonido viral adaptable a finanzas — 2.1M usos en 48h",
    ],
    recommendations: [
      "Serie TikTok 5 videos: 'Toque vs. Yappy vs. transferencia tradicional'",
      "Reel educativo: 'Cómo pasar de 0 historial a tu primera tarjeta con Crea Crédito'",
      "Colaboración con creator @backupfinanciero.rd para review de Tarjeta Qik",
    ],
    automations: [
      "Generación semanal automática del calendario de contenido",
      "Brief auto-generado para creators aliados",
      "Tracking de performance por pieza y feedback al modelo",
    ],
    valueToBank:
      "Multiplica el alcance orgánico sin incremento proporcional de presupuesto pagado, posicionando a Qik como referencia cultural en finanzas para la generación dominicana digital-first.",
    kpis: [
      { name: "Ideas generadas (mes)", value: "186", trend: "up" },
      { name: "Reach orgánico estimado", value: "2.4M", trend: "up" },
      { name: "Tendencias captadas <24h", value: "73%", trend: "up" },
      { name: "Tasa de uso de ideas", value: "61%", trend: "up" },
    ],
    liveMetric: { label: "Tendencias activas", value: "23", sub: "analizadas hoy" },
    confidence: 88,
    lastInsight:
      "Formato 'dueto de respuesta' con creators educativos domina en RD — Qik puede participar con micro-contenido sobre el programa Crea Crédito.",
  },
  {
    id: "creative-analyzer",
    index: 3,
    name: "Creative Analyzer AI",
    shortName: "Creative Analyzer",
    category: "Marketing & Growth",
    accent: "amber",
    status: "active",
    priority: "medium",
    icon: "ScanEye",
    objective:
      "Evaluar anuncios, landing pages, banners y videos de Qik y de la competencia usando principios de psicología, claridad, confianza y conversión, y entregar mejoras accionables.",
    dataSources: [
      "Meta Ads Library — anuncios activos de competidores",
      "Landing pages públicas (qik.do y competencia)",
      "Banners display y creativos pagados",
      "Videos promocionales y reels pagados",
      "Datos de performance de campañas previas (cuando disponibles)",
    ],
    reasoning:
      "Descompone cada creativo en 24 dimensiones (jerarquía visual, copy principal, prueba social, urgencia, reducción de fricción, confianza percibida, CTA, contraste, legibilidad móvil). Aplica heurísticas de persuasion (Cialdini) y principios de conversion design. Compara contra benchmarks de la categoría fintech.",
    outputs: [
      "Score de cada creativo (0-100) por dimensión y global",
      "Top 5 mejoras priorizadas por impacto esperado",
      "Variantes A/B sugeridas con hipótesis explícita",
      "Heatmap predictivo de atención (basado en contraste/posición)",
    ],
    alerts: [
      "Landing de Cuenta Qik pierde 38% de usuarios en paso 2 del onboarding",
      "Banner de Tarjeta de Crédito tiene CTA con bajo contraste en móvil",
    ],
    recommendations: [
      "Mover tasa 3-6% arriba del fold en landing Cuenta Qik",
      "Añadir prueba social (rating App Store 4.7) en hero de Tarjeta",
      "Simplificar copy de Crea Crédito a 8 palabras en primera vista",
    ],
    automations: [
      "Auditoría semanal automática de todas las landings activas",
      "Alerta si un creativo baja de score 70 tras cambios",
      "Benchmark mensual creativo vs. competencia",
    ],
    valueToBank:
      "Aumenta la conversión de tráfico existente sin aumentar inversión publicitaria, generando mejor CAC y mejor LTV/CAC en cada campaña.",
    kpis: [
      { name: "Creativos auditados", value: "312", trend: "up" },
      { name: "Score promedio", value: "78/100", trend: "up" },
      { name: "Lift conversión estimado", value: "+18%", trend: "up" },
      { name: "Tiempo a insight", value: "4m", trend: "down" },
    ],
    liveMetric: { label: "Auditando", value: "47", sub: "creativos en cola" },
    confidence: 90,
    lastInsight:
      "Hero de qik.do/portada omite 'sin comisiones ni saldo mínimo' en primera vista — añadirlo aumenta trust score +14 puntos.",
  },
  {
    id: "social-listening",
    index: 4,
    name: "Social Listening AI",
    shortName: "Social Listening",
    category: "Reputación & CX",
    accent: "cyan",
    status: "active",
    priority: "high",
    icon: "MessageSquareHeart",
    objective:
      "Escuchar conversaciones públicas sobre Qik y competidores para detectar quejas, solicitudes, frustraciones, preguntas frecuentes, ideas y sentimiento general — antes de que escalen.",
    dataSources: [
      "Menciones @qikbanco en Threads, Instagram, X, TikTok",
      "Reviews en App Store y Google Play (RD)",
      "Foros: Reddit r/Dominican, Facebook Groups financieros RD",
      "Comentarios en videos de creators que mencionan Qik",
      "WhatsApp Business mensajes anónimos agregados (si disponible)",
      "Medios digitales RD (Acento, Listín, Diario Libre, Hoy)",
    ],
    reasoning:
      "Aplica NLP multilingüe (español dominicano + spanglish) para clasificar cada mención por intención (queja / solicitud / idea / pregunta / elogio), tema (app, tarjeta, atención, tasas, Toque), sentimiento (-1 a +1) y urgencia. Detecta clusters emergentes y anomalías (pico de quejas en ventana de 6h).",
    outputs: [
      "Mapa de sentimiento diario por tema y producto",
      "Top 10 fricciones reportadas por clientes (ranking semanal)",
      "Banco de ideas surgidas de la comunidad",
      "Alertas tempranas de crisis de reputación",
    ],
    alerts: [
      "Pico de quejas sobre demoras en activación de Tarjeta Qik (últimas 12h)",
      "Solicitud recurrente: 'podrían agregar metas de ahorro compartido'",
    ],
    recommendations: [
      "Activar FAQ proactiva en app sobre tiempos de activación de tarjeta",
      "Escalar 3 ideas de comunidad al equipo de producto (metas compartidas, widgets, dark mode)",
      "Responder a 14 menciones no atendidas en Threads",
    ],
    automations: [
      "Clasificación automática de cada mención entrante",
      "Routing de quejas críticas al equipo de CX en <5 min",
      "Resumen diario de sentimiento al CMO y Director de CX",
    ],
    valueToBank:
      "Convierte la voz pública del cliente en una ventaja competitiva: reduce churn por fricción no detectada y alimenta el roadmap con demanda real validada.",
    kpis: [
      { name: "Menciones analizadas (7d)", value: "8,412", trend: "up" },
      { name: "Sentimiento neto", value: "+0.34", trend: "up" },
      { name: "Tiempo respuesta crisis", value: "23m", trend: "down" },
      { name: "Ideas al roadmap", value: "11", trend: "up" },
    ],
    liveMetric: { label: "Menciones hoy", value: "1,287", sub: "procesadas" },
    confidence: 89,
    lastInsight:
      "Comunidad pide consistentemente 'modo oscuro' y 'widget de saldo' en reviews — alta demanda, baja complejidad.",
  },
  {
    id: "referral-growth",
    index: 5,
    name: "Referral Growth AI",
    shortName: "Referral Growth",
    category: "Growth & Adquisición",
    accent: "emerald",
    status: "active",
    priority: "high",
    icon: "Users",
    objective:
      "Maximizar el crecimiento orgánico vía referidos detectando usuarios con mayor probabilidad de invitar y diseñando incentivos escalonados, retos y campañas que multipliquen las invitaciones.",
    dataSources: [
      "Datos de uso de app (frecuencia, sessions, features usadas)",
      "Historial de referidos previos por usuario",
      "Patrón de invitaciones y conversiones",
      "Cohortes por antigüedad y nivel de lealtad",
      "Calendario de eventos y festividades RD",
    ],
    reasoning:
      "Modela para cada usuario un 'propensity to refer score' basado en engagement, satisfacción (NPS proxy), antigüedad, conectividad social estimada y éxito previo de referidos. Segmenta en 5 tiers de propensity y diseña mecánicas distintas por tier: retos, bonificaciones escalonadas, eventos especiales, etc.",
    outputs: [
      "Ranking diario de top 1,000 usuarios con mayor propensity to refer",
      "Diseño de mecánica de incentivo por segmento",
      "Calendario de campañas de referido estacional",
      "Proyección de captación neta por campaña",
    ],
    alerts: [
      "Cohorte de usuarios 6-12 meses tiene propensity 2.3x mayor que el promedio",
      "Caída de 18% en conversión de referidos en últimos 14 días",
    ],
    recommendations: [
      "Lanzar reto 'Invita 3, gana RD$500' para tier alto de propensity",
      "Bonificación escalonada: 1er referido RD$100, 2do RD$150, 3ro RD$250",
      "Evento especial 'Día del Qiker' con double rewards por 24h",
    ],
    automations: [
      "Push notification personalizada a top propensity semanalmente",
      "Tracking de conversión de referido end-to-end",
      "Reporte semanal de coeficiente viral (K-factor) al growth team",
    ],
    valueToBank:
      "Reduce el CAC hasta en un 60% vs. publicidad pagada, captando clientes con mayor LTV por venir de fuentes de confianza.",
    kpis: [
      { name: "K-factor viral", value: "0.42", trend: "up" },
      { name: "Referidos / cliente / mes", value: "0.31", trend: "up" },
      { name: "Conversión referido", value: "27%", trend: "up" },
      { name: "CAC referido", value: "RD$84", trend: "down" },
    ],
    liveMetric: { label: "Invitaciones hoy", value: "1,847", sub: "enviadas" },
    confidence: 87,
    lastInsight:
      "Usuarios que activan Toque dentro de 7 días tienen 3.1x más probabilidad de referir — momento óptimo para pedir referido.",
  },
  {
    id: "retention",
    index: 6,
    name: "Customer Retention AI",
    shortName: "Retention",
    category: "Fidelización & Retención",
    accent: "emerald",
    status: "analyzing",
    priority: "high",
    icon: "HeartHandshake",
    objective:
      "Detectar usuarios con disminución de actividad y diseñar campañas personalizadas que reactiven el uso, incentiven el ahorro, mantengan saldos activos y fortalezcan la relación con el banco.",
    dataSources: [
      "Sessions y DAU/MAU por usuario",
      "Saldos promedios y movimientos",
      "Uso de features (Toque, Crea Crédito, metas)",
      "Frecuencia de apertura y tiempo en app",
      "Cohortes por antigüedad y canal de adquisición",
      "Eventos de fricción reportados (login fails, errores)",
    ],
    reasoning:
      "Calcula un 'health score' por usuario (0-100) combinando recencia, frecuencia, monetización (saldos, transacciones) y engagement de features. Detecta cambios de trayectoria (decreasing, flat, increasing) y predice riesgo de churn a 30/60/90 días. Recomienda intervención óptima por segmento de riesgo.",
    outputs: [
      "Lista diaria de usuarios en riesgo de churn con score y causa raíz",
      "Trayectorias de decaimiento clasificadas",
      "Campañas de reactivación personalizadas por segmento",
      "Proyección de retención a 90 días por cohort",
    ],
    alerts: [
      "8.2% de usuarios con 30+ días sin abrir app — ventana crítica",
      "Cohorte de Black Friday muestra retención 12pts por debajo del promedio",
    ],
    recommendations: [
      "Push personalizado: 'Tu cuenta Qik sigue generando rendimiento'",
      "Meta de ahorro sugerida basada en patrón de gasto del usuario",
      "Recordatorio de Toque para usuarios que lo usaron una vez y abandonaron",
    ],
    automations: [
      "Trigger automático de mensaje cuando health score baja de 60",
      "Reactivación programada por canal (push, email, in-app)",
      "Daily churn risk dashboard al equipo de CX",
    ],
    valueToBank:
      "Retener un cliente cuesta 5x menos que captar uno nuevo. Cada punto de retención se traduce directamente en LTV y en reducción de CAC efectivo.",
    kpis: [
      { name: "Retención D30", value: "78%", trend: "up" },
      { name: "Retención D90", value: "61%", trend: "up" },
      { name: "Churn mensual", value: "3.2%", trend: "down" },
      { name: "Reactivaciones", value: "1,204", trend: "up" },
    ],
    liveMetric: { label: "En riesgo (30d)", value: "8,932", sub: "usuarios monitoreados" },
    confidence: 91,
    lastInsight:
      "Usuarios que activan una meta de ahorro en primeros 14 días retienen 2.4x más a 90 días.",
  },
  {
    id: "deposit-growth",
    index: 7,
    name: "Deposit Growth AI",
    shortName: "Deposit Growth",
    category: "Growth & Depósitos",
    accent: "emerald",
    status: "active",
    priority: "critical",
    icon: "PiggyBank",
    objective:
      "Diseñar estrategias que incentiven depósitos y mantengan saldos en Cuenta Qik y Certificados Qik, vía retos de ahorro, metas personales, recompensas, insignias, ranking opcional y campañas estacionales.",
    dataSources: [
      "Saldos y flujos de depósitos por tipo de cuenta",
      "Patrones de ahorro por cohorte y demografía",
      "Performance de retos y campañas previas",
      "Calendario RD: quincenas, bonificaciones, navidad, regreso a clases",
      "Tasas de competencia y BCRD (TPM 5.25%)",
    ],
    reasoning:
      "Segmenta a los clientes por 'perfil de ahorro' (ahorrador activo / pasivo / nómina / transaccional) y modela elasticidad de depósito a incentivos. Diseña mecánicas gamificadas con teoría de metas (Locke) y economía conductual (endowment effect, goal-gradient). Estima lift de depósito por mecánica y coste de recompensa.",
    outputs: [
      "Catálogo de retos de ahorro personalizados por segmento",
      "Calendario estacional de campañas de depósito",
      "Sistema de insignias y ranking opcional",
      "Proyección de lift de depósitos por campaña",
    ],
    alerts: [
      "Saldos promedios bajan 4.2% en cohorte de nómina post-quincena",
      "Ventana de oportunidad: certificados a 6 meses sobre 5.25% TPM",
    ],
    recommendations: [
      "Reto 'Ahorra RD$5,000 en 8 semanas' con insignia + tasa bonus 0.5%",
      "Cuenta regresiva: 'Faltan 14 días para tu meta' (goal-gradient)",
      "Bonus de rendimiento por 3 meses consecutivos ahorrando",
    ],
    automations: [
      "Sugerencia automática de meta basada en flujo de ingresos",
      "Notificación de progreso de meta semanal",
      "Reporte de saldos diarios al CFO y equipo de Tesorería",
    ],
    valueToBank:
      "El depósito es el combustible del banco. Cada peso adicional en saldos promedios reduce el coste de fondeo y amplía el margen de intermediación.",
    kpis: [
      { name: "Depósitos totales", value: "RD$4.82B", trend: "up" },
      { name: "Saldo promedio", value: "RD$8,143", trend: "up" },
      { name: "Metas activas", value: "32,108", trend: "up" },
      { name: "Lift por reto", value: "+12.4%", trend: "up" },
    ],
    liveMetric: { label: "Depósitos hoy", value: "RD$18.4M", sub: "netos acumulados" },
    confidence: 93,
    lastInsight:
      "Usuarios con meta activa mantienen saldo 2.8x mayor — activar metas en onboarding es palanca de depósito más eficiente que subir tasa.",
  },
  {
    id: "loyalty-rewards",
    index: 8,
    name: "Loyalty & Rewards AI",
    shortName: "Loyalty & Rewards",
    category: "Fidelización & Retención",
    accent: "gold",
    status: "active",
    priority: "high",
    icon: "Crown",
    objective:
      "Diseñar un sistema de fidelización basado en comportamiento financiero responsable que asigne niveles (Bronce, Plata, Oro, Platino, Diamante) con beneficios escalonados que refuercen hábitos sanos.",
    dataSources: [
      "Antigüedad del cliente",
      "Puntualidad en pagos de tarjeta y préstamos",
      "Uso de productos (cantidad y diversidad)",
      "Depósitos y ahorro constante",
      "Actividad en app y Toque",
      "Referidos exitosos",
      "Participación en retos y campañas",
    ],
    reasoning:
      "Construye un score de 'comportamiento financiero responsable' ponderando puntualidad (35%), profundidad de relación (25%), ahorro constante (20%), actividad (10%), referidos (10%). Mapea a niveles con umbrales claros y beneficios incrementales. Aplica economía conductual: status, endowment, sunk-cost positivo.",
    outputs: [
      "Asignación automática de nivel por usuario",
      "Catálogo de beneficios por nivel",
      "Reglas de ascenso y descenso de nivel",
      "Comunicaciones de progresión por nivel",
    ],
    alerts: [
      "3,420 usuarios a 50 pts de subir a Oro — palanca de retención inmediata",
      "Caída de nivel suele anticipar churn en 45 días",
    ],
    recommendations: [
      "Bronce: 1% cashback en categorías + acceso a retos",
      "Plata: 1.5% cashback + sin comisión de mantenimiento",
      "Oro: 2% cashback + acceso temprano a productos",
      "Platino: 2.5% cashback + experiencias exclusivas",
      "Diamante: 3% cashback + tasa bonus 0.5% + gerente dedicado",
    ],
    automations: [
      "Cálculo de score mensual automático",
      "Notificación de ascenso de nivel con celebración en app",
      "Reporte de distribución de niveles al equipo de Fidelización",
    ],
    valueToBank:
      "Convierte la lealtad en un activo medible. Los clientes de nivel alto tienen 4-7x mayor LTV y son la base de advocacy orgánico.",
    kpis: [
      { name: "Clientes en niveles", value: "78%", trend: "up" },
      { name: "Oro y superior", value: "12.4%", trend: "up" },
      { name: "LTV Oro+ vs Bronce", value: "5.2x", trend: "up" },
      { name: "Ascensos / mes", value: "3,847", trend: "up" },
    ],
    liveMetric: { label: "Nivel más activo", value: "Plata", sub: "42% de base" },
    confidence: 90,
    lastInsight:
      "Mostrar progreso al siguiente nivel ('te faltan 120 pts para Oro') triplica la actividad dirigida en 30 días.",
  },
  {
    id: "smart-payment-reminder",
    index: 9,
    name: "Smart Payment Reminder AI",
    shortName: "Payment Reminder",
    category: "Cobros & Pagos",
    accent: "cyan",
    status: "active",
    priority: "medium",
    icon: "BellRing",
    objective:
      "Generar recordatorios personalizados para pagos próximos al vencimiento, eligiendo el mejor momento y mensaje por cliente para maximizar la probabilidad de pago sin resultar invasivo.",
    dataSources: [
      "Historial de pagos anteriores (días y horas habituales)",
      "Preferencias de canal del cliente (push, email, SMS)",
      "Apertura y respuesta a mensajes previos",
      "Calendario de vencimientos por producto",
      "Patrones de conducta (mañanero, vespertino, nocturno)",
    ],
    reasoning:
      "Modela la probabilidad de pago condicional al canal, momento y tono del recordatorio, usando histórico del cliente. Optimiza por probabilidad de pago × invasividad percibida (maximiza la primera, minimiza la segunda). Personaliza tono yCopy según etapa del ciclo y comportamiento previo.",
    outputs: [
      "Calendario óptimo de recordatorios por cliente",
      "Mensajes personalizados por canal y momento",
      "Predicción de pago por cliente y ventana",
      "Score de 'fatiga de notificación' para evitar spam",
    ],
    alerts: [
      "12,400 clientes con vencimiento en 72h sin recordatorio enviado",
      "Canal push saturado en cohorte de nómina — alternar con email",
    ],
    recommendations: [
      "Recordatorio T-3 días por push, T-1 día por email, T-0 por push matinal",
      "Tono positivo: 'Tu pago de RD$X vence el Y. ¿Lo programamos ahora?'",
      "Botón de acción directa en el recordatorio (programar pago)",
    ],
    automations: [
      "Envío automático según calendario óptimo calculado",
      "Ajuste dinámico si el cliente paga antes",
      "Reporte de lift de puntualidad al equipo de Cobros",
    ],
    valueToBank:
      "Reduce morosidad temprana sin deteriorar la experiencia. Cada día de adelanto en pago promedio mejora el coste de fondeo y reduce provisiones.",
    kpis: [
      { name: "Puntualidad de pago", value: "87%", trend: "up" },
      { name: "Días de pago adelantados", value: "+1.8", trend: "up" },
      { name: "Tasa de apertura", value: "62%", trend: "up" },
      { name: "Opt-out", value: "0.4%", trend: "down" },
    ],
    liveMetric: { label: "Recordatorios hoy", value: "14,208", sub: "personalizados" },
    confidence: 88,
    lastInsight:
      "Recordatorios T-3 días por la mañana tienen 2.1x más conversión que T-1 día en la noche.",
  },
  {
    id: "smart-recovery",
    index: 10,
    name: "Smart Recovery AI",
    shortName: "Smart Recovery",
    category: "Cobros & Riesgo",
    accent: "amber",
    status: "analyzing",
    priority: "high",
    icon: "LifeBuoy",
    objective:
      "Cuando un cliente presenta retrasos, analizar su historial y proponer estrategias de recuperación acordes a políticas del banco — recordatorios, opciones de pago, planes de regularización y beneficios por mantener pagos consecutivos al día.",
    dataSources: [
      "Historial completo de pagos del cliente",
      "Monto y antigüedad de la mora",
      "Comportamiento previo de recuperación",
      "Capacidad de pago estimada (flujos de cuenta)",
      "Preferencias de contacto y respuesta histórica",
      "Planes de regularización previos exitosos/fallidos",
    ],
    reasoning:
      "Clasifica al cliente moroso en 4 perfiles (situacional, estructural temporal, voluntario, crónico) y diseña estrategia distinta por perfil. Estima propensión a recuperación por cada palanca (recordatorio, plan, oferta, beneficio futuro). Respeta políticas de cobranza responsable y regulación de Superintendencia de Bancos RD.",
    outputs: [
      "Perfil de cliente moroso y estrategia recomendada",
      "Planes de regularización personalizados (monto, plazo, condiciones)",
      "Secuencia de contacto óptima (canal, momento, tono)",
      "Beneficios futuros por mantener pagos consecutivos al día",
    ],
    alerts: [
      "Cohorte DPO 30-60 crece 8% — ventana de recuperación óptima ahora",
      "Plan de regularización con 0% interés por 3 meses muestra 64% de éxito",
    ],
    recommendations: [
      "Para mora situacional: plan de pago a 3 cuotas sin interés adicional",
      "Beneficio futuro: 6 pagos consecutivos al día → upgrade de nivel en lealtad",
      "Para mora crónica: oferta de liquidación con quita controlada (sujeta a política)",
    ],
    automations: [
      "Asignación automática de estrategia por perfil",
      "Tracking de cumplimiento del plan de regularización",
      "Reporte de recuperación al Director de Cobros y Riesgo",
    ],
    valueToBank:
      "Recupera capital en mora de forma responsable, reduciendo provisiones y rehabilitando la relación con el cliente — preferible siempre a la vía judicial.",
    kpis: [
      { name: "Tasa de recuperación", value: "41%", trend: "up" },
      { name: "DPO promedio resuelto", value: "23 días", trend: "down" },
      { name: "Planes cumplidos", value: "78%", trend: "up" },
      { name: "Coste de recuperación", value: "RD$312", trend: "down" },
    ],
    liveMetric: { label: "En recuperación", value: "2,847", sub: "clientes activos" },
    confidence: 84,
    lastInsight:
      "Beneficio de 'upgrade de nivel por 6 pagos consecutivos' tiene 2.3x más éxito que descuentos de intereses en mora situacional.",
  },
  {
    id: "risk-prevention",
    index: 11,
    name: "Risk Prevention AI",
    shortName: "Risk Prevention",
    category: "Riesgo & Cobros",
    accent: "red",
    status: "alert",
    priority: "critical",
    icon: "ShieldAlert",
    objective:
      "Predecir clientes con riesgo de entrar en mora antes de que ocurra y sugerir intervenciones preventivas tempranas que eviten el deterioro de la cartera.",
    dataSources: [
      "Patrones de uso y transaccionalidad reciente",
      "Cambios en saldos promedios y flujos",
      "Comportamiento de pago histórico",
      "Eventos de fricción (login fails, intentos fallidos)",
      "Datos macro RD (tasa desempleo, inflación, temporada)",
      "Reducción de actividad en app (early warning)",
    ],
    reasoning:
      "Combina modelos de clasificación (Gradient Boosting) sobre features temporales y conductuales para estimar probabilidad de mora a 30/60/90 días. Detecta early signals (caída de saldos, retraso de 1 día, baja actividad) y recomienda intervención preventiva baja fricción antes de que escale.",
    outputs: [
      "Score de riesgo de mora por cliente (0-100) a 30/60/90 días",
      "Lista diaria de clientes en zona de alerta temprana",
      "Intervenciones preventivas sugeridas por nivel de riesgo",
      "Proyección de mora esperada por cohorte y producto",
    ],
    alerts: [
      "1,247 clientes con score de riesgo subiendo 20+ pts en 14 días",
      "Cohorte de préstamos Q3 muestra señal de deterioro temprano",
    ],
    recommendations: [
      "Intervención preventiva: oferta de reestructuración proactiva",
      "Recordatorio de pago con opción a programar (fricción cero)",
      "Educación financiera in-app: 'Cómo evitar retrasos en tus pagos'",
    ],
    automations: [
      "Recálculo diario del score de riesgo",
      "Trigger automático de intervención preventiva para riesgo alto",
      "Dashboard de mora esperada al Director de Riesgo",
    ],
    valueToBank:
      "Cada peso de mora evitado vale 3-5 pesos en recuperación. La prevención temprana es la palanca más rentable de gestión de cartera.",
    kpis: [
      { name: "Mora evitada (mes)", value: "RD$4.2M", trend: "up" },
      { name: "Falsos positivos", value: "12%", trend: "down" },
      { name: "Anticipación media", value: "21 días", trend: "up" },
      { name: "Mora proyectada 90d", value: "2.1%", trend: "down" },
    ],
    liveMetric: { label: "En alerta temprana", value: "1,247", sub: "clientes monitoreados" },
    confidence: 86,
    lastInsight:
      "Caída de 30%+ en sesiones de app en 14 días anticipa mora con 71% de precisión a 60 días.",
  },
  {
    id: "feature-suggestion",
    index: 12,
    name: "Feature Suggestion AI",
    shortName: "Feature Suggestion",
    category: "Innovación & Producto",
    accent: "violet",
    status: "active",
    priority: "medium",
    icon: "Lightbulb",
    objective:
      "Analizar bancos como Revolut, Nubank, Wise, Monzo y Mercado Pago para detectar funciones innovadoras que Qik podría adaptar, priorizadas por impacto, costo y complejidad.",
    dataSources: [
      "Apps y changelogs de Revolut, Nubank, Wise, Monzo, Mercado Pago",
      "Reviews de usuarios de esos bancos en stores",
      "Análisis de UX público (screenshots, demos)",
      "Reportes de prensa sobre features nuevas",
      "Comunidad de usuarios en Reddit/X sobre neobancos",
    ],
    reasoning:
      "Extrae features diferenciales de cada referente, los clasifica (adquisición / engagement / monetización / eficiencia), estima impacto esperado en KPIs de Qik, coste de implementación (S/M/L/XL) y complejidad técnica. Aplica framework ICE (Impact × Confidence × Ease) para priorizar el roadmap.",
    outputs: [
      "Banco de ideas priorizadas (ICE score) por trimestre",
      "Comparativo de features Qik vs. referentes internacionales",
      "Estimación de esfuerzo por feature (story points)",
      "Secuencia recomendada de implementación",
    ],
    alerts: [
      "Nubank lanza 'cajita' de ahorro automático — feature de alto impacto",
      "Revolut añade suscripciones agrupadas — palanca de retención",
    ],
    recommendations: [
      "Sprint 1: Metas de ahorro compartidas (Mercado Pago) — alto impacto, coste M",
      "Sprint 2: Subcuentas automáticas (Revolut) — medio impacto, coste L",
      "Sprint 3: Cashback por categorías elegibles (Nubank) — alto impacto, coste M",
    ],
    automations: [
      "Monitoreo semanal de changelogs de referentes",
      "Reporte mensual al CPO con top 10 features priorizadas",
      "Tracking de features implementadas vs. impacto real",
    ],
    valueToBank:
      "Acelera la innovación basada en evidencia internacional, evitando reinventar la rueda y capturando aprendizajes de neobancos con mayor madurez digital.",
    kpis: [
      { name: "Features analizadas", value: "284", trend: "up" },
      { name: "Features al roadmap", value: "23", trend: "up" },
      { name: "Time-to-market", value: "8 sem", trend: "down" },
      { name: "Adopción post-launch", value: "34%", trend: "up" },
    ],
    liveMetric: { label: "Features en cola", value: "47", sub: "priorizadas por ICE" },
    confidence: 89,
    lastInsight:
      "Feature de 'redondeo de compras a ahorro' de Mercado Pago tiene 91% de adopción en LatAm — alta demanda en reviews RD.",
  },
  {
    id: "promotion-generator",
    index: 13,
    name: "Promotion Generator AI",
    shortName: "Promotion Gen",
    category: "Marketing & Growth",
    accent: "amber",
    status: "active",
    priority: "medium",
    icon: "Gift",
    objective:
      "Generar campañas automáticamente según temporadas, festividades, eventos deportivos, vacaciones, regreso a clases, navidad, black friday y días de pago — adaptadas al contexto dominicano.",
    dataSources: [
      "Calendario cultural y deportivo RD (béisbol, basket, carnaval)",
      "Ciclo económico RD: quincenas, bonificaciones, aguinaldo (diciembre)",
      "Eventos estacionales: regreso a clases (agosto-sep), black friday (nov), navidad (dic)",
      "Performance histórica de campañas por temporada",
      "Tendencias de consumo por temporada",
    ],
    reasoning:
      "Detecta ventanas estacionales con mayor propensión a gasto o ahorro, diseña mecánicas de campaña (descuento, cashback, bonus, reto), define segmento objetivo y canal óptimo, y proyecta ROI esperado. Aprende de campañas previas para refinar timing y copy.",
    outputs: [
      "Calendario anual de campañas con 60+ oportunidades",
      "Briefs de campaña completos (segmento, mecánica, canal, KPI)",
      "Proyección de ROI por campaña",
      "Variantes A/B de copy y creativo por campaña",
    ],
    alerts: [
      "Aguinaldo diciembre: ventana de captación de depósitos RD$2.4B proyectada",
      "Black Friday: 4 días pico de transaccionalidad — prepara soporte",
    ],
    recommendations: [
      "Agosto: 'Regreso a clases con Qik' — cashback 2% en librerías",
      "Noviembre: 'Black Friday Qik' — offers exclusivas con aliados",
      "Diciembre: 'Aguinaldo rinde más' — certificado bonus 0.5% por 6 meses",
    ],
    automations: [
      "Generación mensual de calendario de campañas",
      "Setup automático de segmentos y triggers",
      "Reporte post-campaña con lift vs. baseline",
    ],
    valueToBank:
      "Captura la demanda estacional con precisión, multiplicando la efectividad del gasto en marketing en los momentos de mayor elasticidad.",
    kpis: [
      { name: "Campañas activas", value: "14", trend: "up" },
      { name: "ROI promedio", value: "4.2x", trend: "up" },
      { name: "Lift estacional capturado", value: "67%", trend: "up" },
      { name: "Time-to-launch", value: "3 días", trend: "down" },
    ],
    liveMetric: { label: "Próxima campaña", value: "12 días", sub: "Regreso a clases" },
    confidence: 87,
    lastInsight:
      "Campañas de cashback en categorías estacionales rinden 3.4x más que descuentos generales.",
  },
  {
    id: "executive-advisor",
    index: 14,
    name: "Executive Advisor AI",
    shortName: "Executive Advisor",
    category: "Ejecutivo",
    accent: "emerald",
    status: "active",
    priority: "critical",
    icon: "Briefcase",
    objective:
      "Entregar cada mañana al CEO un informe ejecutivo con riesgos, oportunidades, competencia, ideas prioritarias e indicadores clave — listo para decisiones del día.",
    dataSources: [
      "Síntesis de todos los demás agentes (19 fuentes)",
      "KPIs consolidados del banco",
      "Eventos macro RD y regulatorios",
      "Alertas críticas del día anterior",
      "Calendario de juntas y entregables ejecutivos",
    ],
    reasoning:
      "Agrega la señal más relevante de cada agente en una narrativa ejecutiva priorizada (3 riesgos, 3 oportunidades, 3 ideas, 3 KPIs). Aplica framework de priorización ejecutiva (urgencia × impacto × reversibilidad). Lenguaje conciso, accionable, sin ruido.",
    outputs: [
      "Morning Briefing diario (1 página, 5 min de lectura)",
      "Top 3 riesgos / oportunidades / ideas / KPIs del día",
      "Calendario de decisiones recomendadas",
      "Tracking de decisiones previas y outcome",
    ],
    alerts: [
      "Riesgo crítico: cohorte de mora D30 subiendo 8% en 14 días",
      "Oportunidad: ventanas de captación de depósitos en diciembre",
    ],
    recommendations: [
      "Decisión hoy: aprobar plan de regularización con 0% interés 3 meses",
      "Decisión hoy: lanzar campaña 'Aguinaldo rinde más' el 15 de noviembre",
      "Decisión hoy: revisar posición competitiva vs. BHD en cuenta móvil",
    ],
    automations: [
      "Generación automática del briefing a las 6:00 AM diarias",
      "Envío por email + disponible en dashboard + push al CEO",
      "Síntesis de seguimiento al final del día",
    ],
    valueToBank:
      "Convierte 24h de análisis de 19 agentes en 5 minutos de lectura accionable. Es la palanca que multiplica la calidad de las decisiones ejecutivas diarias.",
    kpis: [
      { name: "Decisiones/día informadas", value: "7", trend: "up" },
      { name: "Tiempo a insight", value: "5 min", trend: "down" },
      { name: "Acciones ejecutadas", value: "82%", trend: "up" },
      { name: "ROI decisiones", value: "+18%", trend: "up" },
    ],
    liveMetric: { label: "Briefing listo", value: "06:00", sub: "AM, todos los días" },
    confidence: 94,
    lastInsight:
      "Hoy: prioridad 1 es plan de regularización de mora D30 — ventana de 72h para maximizar recuperación.",
  },
  {
    id: "dashboard-metrics",
    index: 15,
    name: "Dashboard Metrics AI",
    shortName: "Metrics Explainer",
    category: "Ejecutivo",
    accent: "cyan",
    status: "active",
    priority: "high",
    icon: "BarChart3",
    objective:
      "No mostrar solo gráficos. Explicar qué ocurrió, por qué ocurrió, qué puede pasar y qué decisión tomar — convirtiendo cada métrica en narrativa accionable.",
    dataSources: [
      "Todos los KPIs del banco (adquisición, depósitos, retención, mora, NPS)",
      "Datos de cohortes y funnels",
      "Eventos externos (campañas, macro, competencia)",
      "Predicciones de los demás agentes",
    ],
    reasoning:
      "Para cada métrica relevante: (1) describe el cambio observado, (2) identifica causa raíz más probable por análisis causal, (3) predice trayectoria a 30/60 días, (4) recomienda decisión con criterios. Aplica narrativa tipo 'Bloomberg Terminal commentary' — densa, precisa, accionable.",
    outputs: [
      "Comentario narrativo por cada métrica del dashboard",
      "Análisis causal de cambios relevantes",
      "Predicción de trayectoria con banda de confianza",
      "Recomendación de decisión con criterio explícito",
    ],
    alerts: [
      "Depósitos cayeron 4.2% — causa: post-quincena, recuperación esperada 5 días",
      "NPS subió 8 pts — causa: activación Toque en cohorte nueva",
    ],
    recommendations: [
      "Métrica en rojo → acción recomendada con 1 click",
      "Métrica en verde → amplificar lo que funciona",
      "Métrica plana → experimentar con hipótesis explícita",
    ],
    automations: [
      "Comentario automático en cada KPI del dashboard",
      "Alerta cuando métrica se desvía >2σ del baseline",
      "Resumen ejecutivo semanal con narrative arc",
    ],
    valueToBank:
      "Convierte dashboards pasivos en dashboards inteligentes. El ejecutivo no solo ve qué pasó — entiende por qué y qué hacer al respecto.",
    kpis: [
      { name: "Métricas narradas", value: "247", trend: "up" },
      { name: "Decisiones derivadas", value: "38", trend: "up" },
      { name: "Precisión causal", value: "84%", trend: "up" },
      { name: "Tiempo a insight", value: "30s", trend: "down" },
    ],
    liveMetric: { label: "Métricas activas", value: "247", sub: "monitoreadas 24/7" },
    confidence: 91,
    lastInsight:
      "Caída de depósitos post-quincena es estacional y auto-recuperable — no requiere acción, solo comunicación al CFO.",
  },
  {
    id: "ux-auditor",
    index: 16,
    name: "UX Auditor AI",
    shortName: "UX Auditor",
    category: "Producto & UX",
    accent: "violet",
    status: "analyzing",
    priority: "medium",
    icon: "MousePointerClick",
    objective:
      "Analizar continuamente la experiencia de usuario de la app Qik y la web, detectar fricciones y proponer mejoras priorizadas por impacto en conversión y retención.",
    dataSources: [
      "Heatmaps y session recordings (cuando disponibles)",
      "Funnel de onboarding y activación",
      "Reviews en stores con menciones de UX",
      "Tickets de soporte con tags de UX",
      "A/B tests en curso y pasados",
      "Comparación UX vs. competencia",
    ],
    reasoning:
      "Detecta drop-off points en cada funnel, los clasifica por severidad (impacto en conversión) y frecuencia. Aplica heurísticas de Nielsen y principios de Friction Mapping. Prioriza por impacto × facilidad. Sugiere experimentos A/B con hipótesis y métrica primaria.",
    outputs: [
      "Mapa de fricciones por pantalla y funnel",
      "Top 10 mejoras priorizadas por impacto",
      "Hipótesis de experimentos A/B listas para correr",
      "Benchmark UX mensual vs. competencia",
    ],
    alerts: [
      "Onboarding pierde 38% en paso 'verificación de identidad'",
      "Flujo de Toque tiene 4 pasos cuando podría tener 2",
    ],
    recommendations: [
      "Reducir KYC a 3 pantallas (de 7) con autofill de OCR",
      "Toque: eliminar paso de confirmación para montos <RD$500",
      "Añadir tooltip '¿Qué es Crea Crédito?' en primera vista",
    ],
    automations: [
      "Auditoría semanal automática de cada pantalla principal",
      "Alerta cuando drop-off supera umbral por pantalla",
      "Reporte mensual al CPO con top fricciones",
    ],
    valueToBank:
      "Cada punto de fricción eliminado se traduce directamente en conversión y retención. La UX es el producto en un neobanco.",
    kpis: [
      { name: "Fricciones detectadas", value: "127", trend: "up" },
      { name: "Fricciones resueltas", value: "84", trend: "up" },
      { name: "Lift conversión onboarding", value: "+22%", trend: "up" },
      { name: "NPS UX", value: "+47", trend: "up" },
    ],
    liveMetric: { label: "Pantallas auditadas", value: "67", sub: "de la app Qik" },
    confidence: 88,
    lastInsight:
      "Pantalla de 'verificación de identidad' tiene 38% drop-off — OCR + autofill podría reducirlo a <15%.",
  },
  {
    id: "banking-innovation",
    index: 17,
    name: "Banking Innovation AI",
    shortName: "Banking Innovation",
    category: "Innovación & Producto",
    accent: "violet",
    status: "active",
    priority: "medium",
    icon: "Brain",
    objective:
      "Generar cada día nuevas ideas para productos, servicios y experiencias bancarias — nunca repetir ideas — alimentando un pipeline de innovación continua.",
    dataSources: [
      "Tendencias fintech globales (CB Insights, McKinsey, BCG)",
      "Patentes y nuevas tecnologías (blockchain, biometría, IA)",
      "Insights de los demás agentes (especialmente Social Listening y Feature Suggestion)",
      "Macro RD: inclusión financiera, remesas, economía informal",
      "Modelos de negocio de neobancos exitosos globalmente",
    ],
    reasoning:
      "Combina creativamente insights de múltiples fuentes (trends + necesidades RD + capacidades Qik + regulación). Genera ideas en formato 'How might we…' con hipótesis de impacto, viabilidad y adecuación. Mantiene un registro de ideas generadas para no repetir y para nutrir el roadmap a largo plazo.",
    outputs: [
      "1 idea nueva por día en formato ejecutivo (1 página)",
      "Pipeline de innovación trimestral con 60+ ideas",
      "Mapa de ideas por categoría (producto / servicio / experiencia)",
      "Tracking de ideas que pasan al roadmap",
    ],
    alerts: [
      "Tecnología de biometría de voz madura — oportunidad para Qik",
      "Remesas RD-US: USD$10B/año mercado, baja penetración digital",
    ],
    recommendations: [
      "Idea del día: 'Cuenta conjunta familiar' con controles parentales",
      "Idea del día: 'Qik Emprende' — cuenta + tools para micro-negocios RD",
      "Idea del día: 'Remesas Qik' con tipo de cambio transparente",
    ],
    automations: [
      "Generación automática diaria a las 9 AM",
      "Publicación en canal interno de innovación",
      "Tracking de reacciones y propuestas al roadmap",
    ],
    valueToBank:
      "Mantiene a Qik en la frontera de innovación fintech. En un mercado donde el primero en moverse captura share desproporcionado, este agente es ventaja competitiva sostenida.",
    kpis: [
      { name: "Ideas generadas", value: "284", trend: "up" },
      { name: "Ideas al roadmap", value: "18", trend: "up" },
      { name: "Tasa de no-repetición", value: "100%", trend: "flat" },
      { name: "Ideas implementadas", value: "4", trend: "up" },
    ],
    liveMetric: { label: "Idea de hoy", value: "#284", sub: "generada a las 9 AM" },
    confidence: 82,
    lastInsight:
      "Mercado de remesas RD-US de USD$10B/año con baja penetración digital — oportunidad de USD$200M en comisiones para Qik.",
  },
  {
    id: "automation-center",
    index: 18,
    name: "AI Automation Center",
    shortName: "Automation Center",
    category: "Eficiencia Operativa",
    accent: "cyan",
    status: "active",
    priority: "medium",
    icon: "Workflow",
    objective:
      "Detectar tareas repetitivas que podrían automatizarse para ahorrar tiempo y reducir errores, calculando el ROI de cada automatización propuesta.",
    dataSources: [
      "Tickets de soporte repetitivos",
      "Tareas manuales reportadas por equipos",
      "Procesos de back office (conciliación, reportes)",
      "Flujos de trabajo documentados",
      "Time-tracking de equipos operativos",
    ],
    reasoning:
      "Identifica patrones repetitivos (misma tarea, >X veces/semana), estima horas/año ahorradas, coste de implementación, riesgo de automatizar. Prioriza por ROI. Diseña la automatización con fallback humano y monitoreo de excepciones.",
    outputs: [
      "Catálogo de tareas automatizables con ROI estimado",
      "Prototipos de automatización (workflows, scripts, bots)",
      "Plan de implementación por trimestre",
      "Tracking de horas ahorradas post-implementación",
    ],
    alerts: [
      "1,847 tickets/mes son 'reset password' — 100% automatizable",
      "Reporte de conciliación manual consume 80h/mes — RPA viable",
    ],
    recommendations: [
      "Bot de autogestión de password reset (savings: 1,847h/año)",
      "Automatización de reporte diario de saldos al BCRD (savings: 240h/año)",
      "RPA para conciliación interbancaria (savings: 960h/año)",
    ],
    automations: [
      "Detección automática de patrones repetitivos",
      "Cálculo de ROI por automatización",
      "Reporte trimestral al COO con top automatizaciones",
    ],
    valueToBank:
      "Libera tiempo del equipo para tareas de mayor valor. Cada hora automatizada es una hora reasignable a experiencia del cliente o innovación.",
    kpis: [
      { name: "Horas ahorradas (mes)", value: "3,847", trend: "up" },
      { name: "Automatizaciones activas", value: "47", trend: "up" },
      { name: "ROI promedio", value: "8.2x", trend: "up" },
      { name: "Errores evitados", value: "1,204", trend: "down" },
    ],
    liveMetric: { label: "Horas ahorradas hoy", value: "127", sub: "automatizaciones activas" },
    confidence: 90,
    lastInsight:
      "Top 3 automatizaciones (password reset, conciliación, reportes BCRD) liberan 5,000+ horas/año.",
  },
  {
    id: "reputation",
    index: 19,
    name: "Reputation AI",
    shortName: "Reputation",
    category: "Reputación & CX",
    accent: "gold",
    status: "analyzing",
    priority: "high",
    icon: "Star",
    objective:
      "Medir diariamente la reputación de Qik y de sus competidores, generando alertas tempranas sobre cambios de percepción en redes, reviews y medios.",
    dataSources: [
      "Reviews App Store y Google Play (RD)",
      "Menciones en redes sociales",
      "Medios digitales RD",
      "Foros y comunidades (Reddit, Facebook Groups)",
      "Calificación en Google Business",
      "Sentiment analysis de menciones",
    ],
    reasoning:
      "Construye un índice diario de reputación (0-100) combinando rating en stores, sentimiento en redes, tono en medios y velocidad de respuesta. Compara contra competencia. Detecta anomalías (caída >5 pts en 24h) y emite alerta temprana con causa raíz probable.",
    outputs: [
      "Índice de reputación diario por marca",
      "Ranking competitivo de reputación",
      "Alertas tempranas de cambios de percepción",
      "Resumen semanal de narrativa de marca",
    ],
    alerts: [
      "Rating App Store Qik baja de 4.7 a 4.5 en 7 días — investigar",
      "Mención negativa en medio grande RD — window de respuesta 4h",
    ],
    recommendations: [
      "Responder reviews negativas en <24h con tono empático",
      "Activar campaña de reviews positivas post-experiencia exitosa",
      "Preparar holding statement para temas sensibles (seguridad, tasas)",
    ],
    automations: [
      "Cálculo diario del índice de reputación",
      "Alerta si delta >5pts en 24h",
      "Reporte semanal al CMO y Director de Comunicación",
    ],
    valueToBank:
      "La reputación es el activo intangible más valioso de un banco digital. Detectar deterioro temprano es la diferencia entre una chrise menor y un evento de marca mayor.",
    kpis: [
      { name: "Índice reputación Qik", value: "82/100", trend: "up" },
      { name: "Ranking vs. competencia", value: "#2", trend: "up" },
      { name: "Tiempo respuesta críticos", value: "1.8h", trend: "down" },
      { name: "NPS", value: "+47", trend: "up" },
    ],
    liveMetric: { label: "Menciones hoy", value: "847", sub: "procesadas en vivo" },
    confidence: 89,
    lastInsight:
      "Qik sube al #2 en reputación digital RD — impulsado por activación de Toque y respuesta rápida en redes.",
  },
  {
    id: "product-roadmap",
    index: 20,
    name: "Product Roadmap AI",
    shortName: "Roadmap",
    category: "Innovación & Producto",
    accent: "violet",
    status: "active",
    priority: "high",
    icon: "Map",
    objective:
      "Priorizar nuevas funciones considerando impacto, costo, complejidad, tiempo de desarrollo y beneficio esperado — manteniendo el roadmap óptimo y dinámico.",
    dataSources: [
      "Pipeline de ideas (Banking Innovation + Feature Suggestion)",
      "Demandas detectadas (Social Listening, UX Auditor)",
      "Capacidad del equipo de ingeniería",
      "Dependencias técnicas y regulatorias",
      "Estimación de impacto en KPIs por feature",
    ],
    reasoning:
      "Aplica framework RICE (Reach × Impact × Confidence / Effort) a cada feature candidata. Optimiza el roadmap como un problema de mochila (knapsack) con restricciones de capacidad y dependencias. Recalcula semanalmente con nueva información. Balancea corto plazo (quick wins) y largo plazo (apuestas grandes).",
    outputs: [
      "Roadmap trimestral optimizado por RICE",
      "Secuencia de sprints con features priorizadas",
      "Estimación de impacto por feature en KPIs",
      "Tracking de features entregadas vs. impacto real",
    ],
    alerts: [
      "Capacidad ingeniería Q4: 320 story points — roadmap sobredimensionado en 18%",
      "Feature X bloqueada por dependencia regulatoria — ventana 2 meses",
    ],
    recommendations: [
      "Sprint 1: Metas de ahorro compartidas (RICE 87) — quick win",
      "Sprint 2: Subcuentas automáticas (RICE 74) — retención",
      "Sprint 3: Cashback categorías (RICE 81) — adquisición",
    ],
    automations: [
      "Recálculo semanal del roadmap óptimo",
      "Alerta si capacidad vs. compromiso se desvía >10%",
      "Reporte semanal al CPO con roadmap actualizado",
    ],
    valueToBank:
      "Maximiza el retorno de cada hora de ingeniería. Un roadmap óptimo puede multiplicar 2-3x el impacto del equipo de producto sin añadir recursos.",
    kpis: [
      { name: "Features entregadas / trim", value: "14", trend: "up" },
      { name: "Roadmap adherence", value: "88%", trend: "up" },
      { name: "Impacto vs. estimado", value: "92%", trend: "up" },
      { name: "Time-to-market", value: "8 sem", trend: "down" },
    ],
    liveMetric: { label: "Features en roadmap", value: "23", sub: "para próximos 2 trimestres" },
    confidence: 90,
    lastInsight:
      "Rebalancear roadmap: adelantar 'Cashback categorías' (RICE 81) posterga 'Subcuentas' (RICE 74) sin afectar trimestre.",
  },
];

// ============================================================
// EXECUTIVE KPIS (Command Center overview)
// ============================================================
export const EXECUTIVE_KPIS = [
  {
    id: "depositos",
    label: "Depósitos Totales",
    value: "RD$4.82B",
    delta: "+8.4%",
    trend: "up" as const,
    accent: "emerald" as Accent,
    sub: "vs. mes anterior",
    sparkline: [42, 44, 43, 46, 48, 47, 50, 52, 54, 56, 58, 62],
    narrative: "Crecimiento sostenido impulsado por activación de metas de ahorro.",
  },
  {
    id: "clientes",
    label: "Clientes Activos",
    value: "592,481",
    delta: "+12,847",
    trend: "up" as const,
    accent: "cyan" as Accent,
    sub: "nuevos en 30 días",
    sparkline: [380, 395, 410, 425, 440, 455, 470, 485, 500, 530, 560, 592],
    narrative: "Aceleración por campaña de referidos en cohorte de agosto.",
  },
  {
    id: "app-usage",
    label: "MAU App Qik",
    value: "487,209",
    delta: "+6.2%",
    trend: "up" as const,
    accent: "violet" as Accent,
    sub: "usuarios mensuales",
    sparkline: [320, 340, 360, 380, 400, 410, 430, 450, 460, 470, 478, 487],
    narrative: "Activación de Toque impulsa frecuencia de uso +14%.",
  },
  {
    id: "mora",
    label: "Mora 30+ días",
    value: "2.3%",
    delta: "-0.4 pts",
    trend: "down" as const,
    accent: "amber" as Accent,
    sub: "cartera vigente",
    sparkline: [3.2, 3.1, 3.0, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.4, 2.3, 2.3],
    narrative: "Prevención temprana reduce mora esperada a 90 días.",
  },
  {
    id: "retencion",
    label: "Retención D90",
    value: "61%",
    delta: "+3.1 pts",
    trend: "up" as const,
    accent: "emerald" as Accent,
    sub: "cohort nuevo",
    sparkline: [48, 50, 52, 54, 55, 56, 57, 58, 59, 60, 60, 61],
    narrative: "Programa de lealtad y metas de ahorro elevan retención.",
  },
  {
    id: "nps",
    label: "NPS",
    value: "+47",
    delta: "+8 pts",
    trend: "up" as const,
    accent: "gold" as Accent,
    sub: "Net Promoter Score",
    sparkline: [28, 30, 32, 34, 36, 38, 40, 42, 44, 45, 46, 47],
    narrative: "Mejora por UX de Toque y respuesta rápida en redes.",
  },
  {
    id: "k-factor",
    label: "K-factor Viral",
    value: "0.42",
    delta: "+0.08",
    trend: "up" as const,
    accent: "violet" as Accent,
    sub: "coeficiente de referidos",
    sparkline: [0.18, 0.20, 0.22, 0.24, 0.26, 0.28, 0.30, 0.32, 0.35, 0.38, 0.40, 0.42],
    narrative: "Mecánicas escalonadas de referido aceleran captación orgánica.",
  },
  {
    id: "cac",
    label: "CAC Blend",
    value: "RD$184",
    delta: "-12%",
    trend: "down" as const,
    accent: "cyan" as Accent,
    sub: "coste adquisición",
    sparkline: [280, 270, 260, 250, 240, 230, 220, 210, 200, 195, 190, 184],
    narrative: "Referidos y contenido orgánico reducen dependencia de pago.",
  },
];

// ============================================================
// LIVE ALERT FEED (Centro de Alertas)
// ============================================================
export interface AlertItem {
  id: string;
  time: string;
  agentId: string;
  agentName: string;
  priority: Priority;
  accent: Accent;
  title: string;
  description: string;
  recommendation: string;
  category: string;
}

export const ALERTS: AlertItem[] = [
  {
    id: "a1",
    time: "hace 4 min",
    agentId: "risk-prevention",
    agentName: "Risk Prevention AI",
    priority: "critical",
    accent: "red",
    category: "Riesgo",
    title: "1,247 clientes con score de riesgo subiendo 20+ pts en 14 días",
    description: "Cohorte de préstamos Q3 muestra señal de deterioro temprano. Predicción de mora a 60 días sube de 2.1% a 2.8% si no se interviene.",
    recommendation: "Activar intervención preventiva: oferta de reestructuración proactiva para top 200 clientes de mayor riesgo.",
  },
  {
    id: "a2",
    time: "hace 18 min",
    agentId: "competitor-intel",
    agentName: "Competitor Intelligence AI",
    priority: "high",
    accent: "cyan",
    category: "Competencia",
    title: "BHD reduce requisito de saldo en Cuenta Móvil",
    description: "BHD elimina saldo mínimo de RD$500 en Cuenta Móvil. Qik mantiene ventaja al no requerir saldo mínimo desde el inicio, pero ventana de diferenciación se estrecha.",
    recommendation: "Publicar comparativo transparente en landing y activar micro-campaña en TikTok destacando 'sin comisiones ni saldo mínimo'.",
  },
  {
    id: "a3",
    time: "hace 32 min",
    agentId: "social-listening",
    agentName: "Social Listening AI",
    priority: "high",
    accent: "cyan",
    category: "CX",
    title: "Pico de quejas sobre demoras en activación de Tarjeta Qik",
    description: "12 quejas en las últimas 12h sobre demoras de 5-7 días en activación de tarjeta. Sentimiento neto cae 0.15 puntos en cohorte afectada.",
    recommendation: "Activar FAQ proactiva en app, comunicación por email a afectados con nuevo ETA, y revisar proceso de activación con operaciones.",
  },
  {
    id: "a4",
    time: "hace 1 h",
    agentId: "deposit-growth",
    agentName: "Deposit Growth AI",
    priority: "high",
    accent: "emerald",
    category: "Depósitos",
    title: "Saldos promedios bajan 4.2% en cohorte de nómina post-quincena",
    description: "Patrón estacional esperado pero de magnitud superior al histórico. Recuperación estimada en 5 días. Ventana para fidelizar depósitos con certificado bonus.",
    recommendation: "Lanzar oferta de Certificado Qik 6 meses con tasa bonus 0.5% para clientes de nómina — ventana de 72h.",
  },
  {
    id: "a5",
    time: "hace 1 h 24 min",
    agentId: "viral-content",
    agentName: "Viral Content AI",
    priority: "medium",
    accent: "violet",
    category: "Marketing",
    title: "Tendencia emergente 'presupuesto semanal en efectivo' crece 340% en RD",
    description: "Hashtag #PresupuestoSemanalRD en TikTok con 2.1M vistas en 48h. Tendencia alineada con propuesta educativa de Qik.",
    recommendation: "Producir serie de 3 videos educativos: 'Cómo hacer tu presupuesto semanal con Qik'. Brief listo en el agente.",
  },
  {
    id: "a6",
    time: "hace 2 h",
    agentId: "smart-recovery",
    agentName: "Smart Recovery AI",
    priority: "high",
    accent: "amber",
    category: "Cobros",
    title: "Cohorte DPO 30-60 crece 8% — ventana de recuperación óptima",
    description: "Plan de regularización con 0% interés por 3 meses muestra 64% de éxito histórico. Cohorte actual tiene alta propensión a recuperación.",
    recommendation: "Aprobar plan de regularización masivo para 1,847 clientes en mora D30-60 — proyección de recuperación RD$4.2M.",
  },
  {
    id: "a7",
    time: "hace 3 h",
    agentId: "loyalty-rewards",
    agentName: "Loyalty & Rewards AI",
    priority: "medium",
    accent: "gold",
    category: "Fidelización",
    title: "3,420 usuarios a 50 pts de subir a Oro",
    description: "Palanca de retención inmediata: communication de progreso puede acelerar ascensos y reducir churn en cohorte de alto valor.",
    recommendation: "Push personalizado: 'Te faltan 120 pts para Oro. Descubre cómo llegar' — esperado +18% en actividad dirigida.",
  },
  {
    id: "a8",
    time: "hace 4 h",
    agentId: "reputation",
    agentName: "Reputation AI",
    priority: "medium",
    accent: "gold",
    category: "Reputación",
    title: "Rating App Store Qik baja de 4.7 a 4.5 en 7 días",
    description: "Caída concentrada en reviews sobre activación de tarjeta. Window de respuesta 4h antes de que se amplifique en medios.",
    recommendation: "Responder reviews negativos en <24h con tono empático + resolver causa raíz con operaciones.",
  },
];

// ============================================================
// RECOMMENDATIONS CENTER (Centro de Recomendaciones)
// ============================================================
export interface Recommendation {
  id: string;
  agentId: string;
  agentName: string;
  accent: Accent;
  priority: Priority;
  title: string;
  rationale: string;
  expectedImpact: string;
  effort: "S" | "M" | "L" | "XL";
  timeframe: string;
  category: string;
  status: "pending" | "approved" | "in-progress" | "done";
}

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: "r1",
    agentId: "smart-recovery",
    agentName: "Smart Recovery AI",
    accent: "amber",
    priority: "critical",
    title: "Aprobar plan de regularización 0% interés por 3 meses para mora D30-60",
    rationale: "Plan con 64% de éxito histórico. Cohorte actual tiene propensión 1.4x mayor al promedio. Mora evitada RD$4.2M proyectada.",
    expectedImpact: "Recuperación de RD$4.2M + rehabilitación de 1,847 clientes",
    effort: "S",
    timeframe: "Esta semana",
    category: "Cobros",
    status: "pending",
  },
  {
    id: "r2",
    agentId: "deposit-growth",
    agentName: "Deposit Growth AI",
    accent: "emerald",
    priority: "critical",
    title: "Lanzar Certificado Qik 6 meses con tasa bonus 0.5% para clientes de nómina",
    rationale: "Ventana de 72h post-quincena. Lift de depósitos esperado +RD$340M. Coste de recompensa amortizado en 90 días.",
    expectedImpact: "+RD$340M en depósitos + reducción de fondeo",
    effort: "S",
    timeframe: "72 horas",
    category: "Depósitos",
    status: "pending",
  },
  {
    id: "r3",
    agentId: "referral-growth",
    agentName: "Referral Growth AI",
    accent: "emerald",
    priority: "high",
    title: "Lanzar reto 'Invita 3, gana RD$500' para tier alto de propensity",
    rationale: "Cohorte 6-12 meses tiene propensity 2.3x mayor. K-factor proyectado 0.58 (+38%). CAC referido RD$84 vs. pago RD$240.",
    expectedImpact: "+12,400 nuevos clientes en 30 días vía referidos",
    effort: "M",
    timeframe: "2 semanas",
    category: "Growth",
    status: "pending",
  },
  {
    id: "r4",
    agentId: "ux-auditor",
    agentName: "UX Auditor AI",
    accent: "violet",
    priority: "high",
    title: "Reducir KYC a 3 pantallas (de 7) con OCR + autofill",
    rationale: "Pantalla de verificación de identidad tiene 38% drop-off. Benchmark neobancos LatAm: <15%. Implementación con OCR maduro.",
    expectedImpact: "+22% conversión en onboarding = +2,800 clientes/mes",
    effort: "M",
    timeframe: "4 semanas",
    category: "Producto",
    status: "pending",
  },
  {
    id: "r5",
    agentId: "feature-suggestion",
    agentName: "Feature Suggestion AI",
    accent: "violet",
    priority: "high",
    title: "Sprint: Metas de ahorro compartidas (estilo Mercado Pago)",
    rationale: "Feature con 91% de adopción en LatAm. Alta demanda en reviews RD. Coste M, impacto alto en retención y depósitos.",
    expectedImpact: "+8% retención D90 + RD$180M depósitos",
    effort: "M",
    timeframe: "6 semanas",
    category: "Producto",
    status: "pending",
  },
  {
    id: "r6",
    agentId: "competitor-intel",
    agentName: "Competitor Intelligence AI",
    accent: "cyan",
    priority: "high",
    title: "Publicar comparativo transparente Cuenta Qik vs. Cuenta Móvil BHD",
    rationale: "BHD elimina saldo mínimo, estrechando ventana de diferenciación. Comparativo transparente refuerza posicionamiento de confianza.",
    expectedImpact: "+8% conversión landing + defensión de share",
    effort: "S",
    timeframe: "1 semana",
    category: "Marketing",
    status: "pending",
  },
  {
    id: "r7",
    agentId: "viral-content",
    agentName: "Viral Content AI",
    accent: "violet",
    priority: "medium",
    title: "Serie TikTok 5 videos: 'Toque vs. Yappy vs. transferencia tradicional'",
    rationale: "Formato comparativo domina en RD. Toque es diferenciador clave de Qik. Reach orgánico estimado 800K vistas.",
    expectedImpact: "+800K alcance + 14K clicks a app",
    effort: "S",
    timeframe: "2 semanas",
    category: "Marketing",
    status: "pending",
  },
  {
    id: "r8",
    agentId: "automation-center",
    agentName: "AI Automation Center",
    accent: "cyan",
    priority: "medium",
    title: "Bot de autogestión de password reset",
    rationale: "1,847 tickets/mes son 'reset password' — 100% automatizable. ROI 12x en primer año.",
    expectedImpact: "1,847h/año liberadas + mejora NPS de CX",
    effort: "S",
    timeframe: "3 semanas",
    category: "Operaciones",
    status: "pending",
  },
];

// ============================================================
// COMPETITORS (Banca digital RD + referentes internacionales)
// ============================================================
export interface Competitor {
  id: string;
  name: string;
  type: "local" | "international";
  category: string;
  accent: Accent;
  digitalAccount: string;
  keyFeature: string;
  rate: string;
  fees: string;
  appRating: string;
  marketPosition: string;
  threat: "high" | "medium" | "low";
  strengths: string[];
  weaknesses: string[];
  recentMove: string;
}

export const COMPETITORS: Competitor[] = [
  {
    id: "banreservas",
    name: "Banreservas",
    type: "local",
    category: "Banco líder RD",
    accent: "emerald",
    digitalAccount: "Cuenta Digital Banreservas",
    keyFeature: "Yappy (P2P dominante)",
    rate: "Variable",
    fees: "Sin comisiones",
    appRating: "4.6",
    marketPosition: "Líder del sistema financiero RD. Mayor red de oficinas. App Banreservas con Yappy como líder P2P.",
    threat: "high",
    strengths: ["Marca confianza", "Yappy red P2P", "Red física amplia", "Respaldo estatal"],
    weaknesses: ["UX legacy", "Onboarding largo", "App pesada"],
    recentMove: "Expansión Yappy a comercios + cuenta digital sin sucursal",
  },
  {
    id: "bhd",
    name: "BHD",
    type: "local",
    category: "Banco múltiple",
    accent: "cyan",
    digitalAccount: "Cuenta Móvil BHD",
    keyFeature: "Onboarding 100% digital",
    rate: "Variable",
    fees: "Sin comisiones de apertura",
    appRating: "4.5",
    marketPosition: "Segundo mayor banco RD. Fuerte en banca digital corporativa y personal.",
    threat: "high",
    strengths: ["App madura", "Banca corporativa fuerte", "Marca consolidada"],
    weaknesses: ["Menos agresivo en tasas", "Sin producto P2P dominante"],
    recentMove: "Eliminó saldo mínimo en Cuenta Móvil — acercándose a propuesta Qik",
  },
  {
    id: "popular",
    name: "Banco Popular Dominicano",
    type: "local",
    category: "Banco matriz de Qik",
    accent: "violet",
    digitalAccount: "Cuenta Digital Libre",
    keyFeature: "App Popular + red de agentes",
    rate: "Variable",
    fees: "Sin comisiones con uso de débito",
    appRating: "4.7",
    marketPosition: "Banco matriz de Qik (Grupo Popular). Mayor banco privado RD. App Popular muy valorada.",
    threat: "medium",
    strengths: ["Marca líder", "App top-rated", "Red de agentes", "Cofundador de Qik"],
    weaknesses: ["Onboarding aún con fricción", "Sin enfoque neobanco"],
    recentMove: "Cuenta Digital Libre con sin comisiones al usar débito",
  },
  {
    id: "apap",
    name: "APAP",
    type: "local",
    category: "Asociación de ahorros",
    accent: "amber",
    digitalAccount: "Cuenta de ahorro digital",
    keyFeature: "Certificados y préstamos",
    rate: "Competitiva en plazos",
    fees: "Variables por producto",
    appRating: "4.3",
    marketPosition: "Asociación de ahorros y préstamos líder en RD. Fuerte en hipotecas y consumo.",
    threat: "medium",
    strengths: ["Tasas a plazo atractivas", "Banca seguros", "Remesas"],
    weaknesses: ["App menos fluida", "UX legacy", "Menos enfocada en digital-first"],
    recentMove: "Modernización gradual de app y nuevos certificados digitales",
  },
  {
    id: "scotia",
    name: "Scotiabank RD",
    type: "local",
    category: "Banco internacional",
    accent: "red",
    digitalAccount: "Cuenta digital Scotia",
    keyFeature: "Red internacional + rewards",
    rate: "Variable",
    fees: "Variables",
    appRating: "4.4",
    marketPosition: "Banco internacional con presencia RD. Fuerte en tarjetas y rewards.",
    threat: "medium",
    strengths: ["Marca global", "Programa rewards consolidado", "Banca internacional"],
    weaknesses: ["Menos ágil en digital", "Mayor fricción en onboarding"],
    recentMove: "Refresh de app y rewards digitalizados",
  },
  {
    id: "santa-cruz",
    name: "Banco Santa Cruz",
    type: "local",
    category: "Banco comercial",
    accent: "cyan",
    digitalAccount: "Banca digital Santa Cruz",
    keyFeature: "Banca personalizada",
    rate: "Competitiva",
    fees: "Variables",
    appRating: "4.2",
    marketPosition: "Banco mediano RD con enfoque en servicio personalizado.",
    threat: "low",
    strengths: ["Servicio al cliente", "Banca corporativa mediana"],
    weaknesses: ["Menor escala digital", "App menos robusta"],
    recentMove: "Mejoras incrementales en banca digital",
  },
  {
    id: "nubank",
    name: "Nubank (referente)",
    type: "international",
    category: "Neobanco LatAm",
    accent: "violet",
    digitalAccount: "Nu Conta",
    keyFeature: "UX best-in-class",
    rate: "CDI + 1%",
    fees: "Sin comisiones",
    appRating: "4.8",
    marketPosition: "Neobanco más grande de LatAm. Referente absoluto de UX y engagement.",
    threat: "low",
    strengths: ["UX premium", "Engagement altísimo", "Comunidad fuerte", "Escala"],
    weaknesses: ["No en RD", "Modelo de negocio distinto"],
    recentMove: "Expansión a México y Colombia + productos de inversión",
  },
  {
    id: "revolut",
    name: "Revolut (referente)",
    type: "international",
    category: "Neobanco global",
    accent: "cyan",
    digitalAccount: "Revolut Personal",
    keyFeature: "Multi-currency + subcuentas",
    rate: "Variables por plan",
    fees: "Plan free + premium",
    appRating: "4.7",
    marketPosition: "Neobanco global multi-currency. Referente en subcuentas y gestión de dinero.",
    threat: "low",
    strengths: ["Multi-currency", "Subcuentas automáticas", "Cripto", "Plan premium"],
    weaknesses: ["No en RD", "Complejo para cliente base"],
    recentMove: "Lanzamiento de suscripciones agrupadas y savings vaults",
  },
  {
    id: "mercado-pago",
    name: "Mercado Pago (referente)",
    type: "international",
    category: "Wallet LatAm",
    accent: "amber",
    digitalAccount: "Cuenta Mercado Pago",
    keyFeature: "Metas compartidas + redondeo",
    rate: "Competitiva",
    fees: "Bajas comisiones",
    appRating: "4.6",
    marketPosition: "Wallet dominante en LatAm. Metas de ahorro compartidas con 91% de adopción.",
    threat: "medium",
    strengths: ["Metas compartidas", "Redondeo de compras", "Ecosistema Mercado Libre"],
    weaknesses: ["No es banco", "Confianza limitada en depósitos grandes"],
    recentMove: "Expansión de productos de crédito y ahorro automatizado",
  },
];

// ============================================================
// MORNING BRIEFING (Executive Advisor AI output)
// ============================================================
export const MORNING_BRIEFING = {
  date: "Hoy — Briefing 06:00 AM",
  headline: "Día con 3 decisiones críticas: mora D30, depósitos post-quincena, y respuesta competitiva a BHD.",
  topRisks: [
    {
      title: "Mora D30 acelerando en cohorte Q3",
      severity: "critical" as Priority,
      agent: "Risk Prevention AI",
      detail: "1,247 clientes con score subiendo 20+ pts en 14 días. Mora proyectada a 60 días sube de 2.1% a 2.8%.",
      action: "Aprobar plan de regularización con 0% interés por 3 meses — ventana 72h.",
    },
    {
      title: "Rating App Store en tendencia bajista",
      severity: "high" as Priority,
      agent: "Reputation AI",
      detail: "Caída de 4.7 → 4.5 en 7 días, concentrada en activación de tarjeta.",
      action: "Responder reviews en <24h + resolver causa raíz con operaciones.",
    },
  ],
  topOpportunities: [
    {
      title: "Ventana de captación de depósitos post-quincena",
      magnitude: "RD$340M proyectado",
      agent: "Deposit Growth AI",
      detail: "Saldos promedios bajaron 4.2%. Cohorte de nómina receptiva a certificados con bonus.",
      action: "Lanzar Certificado Qik 6 meses con tasa bonus 0.5% — ventana 72h.",
    },
    {
      title: "Tendencia TikTok 'presupuesto semanal'",
      magnitude: "2.1M vistas en 48h",
      agent: "Viral Content AI",
      detail: "Hashtag #PresupuestoSemanalRD alineado con propuesta educativa de Qik.",
      action: "Producir serie 3 videos educativos esta semana.",
    },
  ],
  topIdeas: [
    {
      title: "Metas de ahorro compartidas (estilo Mercado Pago)",
      agent: "Feature Suggestion AI",
      ice: 87,
      detail: "91% de adopción en LatAm. Alta demanda en reviews RD.",
    },
    {
      title: "Subcuentas automáticas (estilo Revolut)",
      agent: "Feature Suggestion AI",
      ice: 74,
      detail: "Retención +8% esperada. Coste L, complejidad media.",
    },
  ],
  topKPIs: [
    { name: "Depósitos totales", value: "RD$4.82B", delta: "+8.4%", trend: "up" as const },
    { name: "Clientes activos", value: "592,481", delta: "+12,847", trend: "up" as const },
    { name: "Retención D90", value: "61%", delta: "+3.1 pts", trend: "up" as const },
    { name: "Mora 30+", value: "2.3%", delta: "-0.4 pts", trend: "down" as const },
  ],
  decisions: [
    { title: "Aprobar plan de regularización mora D30-60", by: "Director de Riesgo + CFO", deadline: "Hoy 12:00" },
    { title: "Aprobar Certificado Qik bonus post-quincena", by: "CFO + Director de Producto", deadline: "Hoy 14:00" },
    { title: "Aprobar respuesta competitiva a BHD", by: "CMO + Director de Marketing", deadline: "Mañana 10:00" },
  ],
};
