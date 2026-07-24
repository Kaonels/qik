"use client";

import { motion } from "framer-motion";
import {
  TrendingUp, TrendingDown, ArrowUpRight, Activity, Zap, Target, Sparkles,
  AlertTriangle, Cpu, Layers, Radio,
} from "lucide-react";
import { EXECUTIVE_KPIS, ALERTS, AGENTS } from "@/lib/qik-data";
import { ACCENT_COLORS } from "@/lib/qik-theme";
import { AnimatedValue, Sparkline, StatusDot, SectionTitle } from "./shared";
import { RDMapAnimation } from "./rd-map";
import { HolographicSphere } from "./holographic-sphere";

const accentRaw: Record<string, string> = {
  emerald: "#10b981",
  cyan: "#22d3ee",
  violet: "#8b5cf6",
  amber: "#fbbf24",
  red: "#f43f5e",
  gold: "#facc15",
};

export function CommandCenter() {
  return (
    <div className="space-y-6">
      {/* Hero: Map + Neural Core */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative lg:col-span-7"
        >
          <div className="relative h-[360px] overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#0a0d16] via-[#0c1020] to-[#0a0d16] md:h-[440px]">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative h-full w-full p-4">
              <RDMapAnimation />
            </div>
            {/* Title overlay */}
            <div className="absolute left-5 top-5 z-10">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-emerald-400">
                <Radio className="h-3 w-3" />
                <span>Live Intelligence Grid</span>
              </div>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                QIK <span className="text-gradient-emerald">AI Command Center</span>
              </h1>
              <p className="mt-1 max-w-md text-xs text-slate-400 md:text-sm">
                20 agentes IA analizando información pública 24/7 para impulsar
                crecimiento, depósitos, retención e innovación en el primer neobanco dominicano.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Neural Core */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative lg:col-span-5"
        >
          <div className="relative h-[360px] overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#0a0d16] via-[#0c1020] to-[#0a0d16] md:h-[440px]">
            <HolographicSphere height={440} />
          </div>
        </motion.div>
      </div>

      {/* Executive KPIs */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <SectionTitle
            eyebrow="Executive Overview"
            title="Indicadores clave del banco"
            subtitle="Métricas consolidadas en tiempo real con narrativa accionable."
            accent="emerald"
          />
          <div className="hidden items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 md:flex">
            <StatusDot color="emerald" />
            Actualizado hace 12 segundos
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {EXECUTIVE_KPIS.map((kpi, i) => {
            const raw = accentRaw[kpi.accent];
            const isPositiveTrend = kpi.trend === "up";
            return (
              <motion.div
                key={kpi.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.025] p-4 backdrop-blur-xl transition-colors hover:border-white/[0.12]"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-60"
                  style={{ background: raw }}
                />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">{kpi.label}</span>
                    <span
                      className={`flex items-center gap-0.5 text-[10px] font-mono ${
                        kpi.trend === "up" ? "text-emerald-400" : kpi.trend === "down" ? "text-rose-400" : "text-slate-400"
                      }`}
                    >
                      {kpi.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {kpi.delta}
                    </span>
                  </div>
                  <div className="mt-1.5">
                    <AnimatedValue value={kpi.value} className="font-mono text-2xl font-bold text-white" />
                  </div>
                  <div className="mt-0.5 text-[10px] text-slate-500">{kpi.sub}</div>
                  <div className="mt-2">
                    <Sparkline data={kpi.sparkline} color={raw} width={180} height={32} />
                  </div>
                  <div className="mt-2 border-t border-white/[0.05] pt-2 text-[10px] leading-snug text-slate-400">
                    <span className="font-mono text-slate-500">why:</span> {kpi.narrative}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Three-column: Live Agents / Alerts / Recommendations preview */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Live agent activity */}
        <div className="lg:col-span-5">
          <ActivityFeed />
        </div>
        {/* Critical alerts */}
        <div className="lg:col-span-4">
          <CriticalAlertsPreview />
        </div>
        {/* System health */}
        <div className="lg:col-span-3">
          <SystemHealth />
        </div>
      </section>

      {/* Decision pipeline (animated connections) */}
      <DecisionPipeline />
    </div>
  );
}

// ============= Live Activity Feed =============
function ActivityFeed() {
  const events = [
    { agent: "Competitor Intelligence", accent: "cyan", text: "BHD reduce saldo mínimo en Cuenta Móvil", time: "12:42:08" },
    { agent: "Risk Prevention", accent: "red", text: "1,247 clientes con score de riesgo subiendo", time: "12:38:51" },
    { agent: "Viral Content", accent: "violet", text: "Tendencia #PresupuestoSemanalRD +340%", time: "12:31:14" },
    { agent: "Social Listening", accent: "cyan", text: "Pico de quejas: activación de Tarjeta Qik", time: "12:24:09" },
    { agent: "Deposit Growth", accent: "emerald", text: "Saldos promedios -4.2% post-quincena", time: "12:18:42" },
    { agent: "Loyalty & Rewards", accent: "gold", text: "3,420 usuarios a 50 pts de Oro", time: "12:11:33" },
    { agent: "Reputation", accent: "gold", text: "Rating App Store 4.7 → 4.5 (7d)", time: "12:04:18" },
    { agent: "Smart Recovery", accent: "amber", text: "Cohorte DPO 30-60 crece 8%", time: "11:58:02" },
  ];

  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">Actividad en vivo</h3>
        </div>
        <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-emerald-400">
          <StatusDot color="emerald" />
          streaming
        </span>
      </div>
      <div className="scrollbar-thin -mr-2 flex-1 space-y-1 overflow-y-auto pr-2" style={{ maxHeight: 380 }}>
        {events.map((e, i) => {
          const accent = ACCENT_COLORS[e.accent as keyof typeof ACCENT_COLORS];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-2.5 rounded-lg border border-white/[0.04] bg-white/[0.015] px-2.5 py-2"
            >
              <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${accent.text}`}>{e.agent}</span>
                  <span className="font-mono text-[9px] text-slate-500">{e.time}</span>
                </div>
                <p className="mt-0.5 text-xs leading-snug text-slate-300">{e.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ============= Critical Alerts Preview =============
function CriticalAlertsPreview() {
  const topAlerts = ALERTS.slice(0, 5);
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-white">Alertas críticas</h3>
        </div>
        <span className="rounded border border-rose-500/30 bg-rose-500/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-rose-400">
          8 activas
        </span>
      </div>
      <div className="scrollbar-thin -mr-2 flex-1 space-y-2 overflow-y-auto pr-2" style={{ maxHeight: 380 }}>
        {topAlerts.map((a, i) => {
          const accent = ACCENT_COLORS[a.accent];
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-lg border ${accent.borderSoft} ${accent.bgSoft} px-2.5 py-2`}
            >
              <div className="mb-1 flex items-center justify-between">
                <span className={`text-[9px] font-mono uppercase tracking-wider ${accent.text}`}>{a.agentName}</span>
                <span className="font-mono text-[9px] text-slate-500">{a.time}</span>
              </div>
              <p className="text-xs leading-snug text-slate-200 line-clamp-2">{a.title}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ============= System Health =============
function SystemHealth() {
  const agents = AGENTS.filter((a) => a.status !== "idle");
  const stats = {
    active: AGENTS.filter((a) => a.status === "active").length,
    analyzing: AGENTS.filter((a) => a.status === "analyzing").length,
    alert: AGENTS.filter((a) => a.status === "alert").length,
    avgConfidence: Math.round(AGENTS.reduce((s, a) => s + a.confidence, 0) / AGENTS.length),
  };
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 backdrop-blur-xl">
      <div className="mb-3 flex items-center gap-2">
        <Cpu className="h-4 w-4 text-cyan-400" />
        <h3 className="text-sm font-semibold text-white">System health</h3>
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <HealthTile label="Activos" value={stats.active} accent="emerald" />
          <HealthTile label="Analizando" value={stats.analyzing} accent="cyan" />
          <HealthTile label="En alerta" value={stats.alert} accent="red" />
          <HealthTile label="Confianza" value={`${stats.avgConfidence}%`} accent="violet" />
        </div>
        <div className="rounded-lg border border-white/[0.05] bg-black/30 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Throughput</span>
            <span className="font-mono text-xs text-emerald-400">847/h</span>
          </div>
          <div className="flex h-8 items-end gap-0.5">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${20 + Math.random() * 80}%` }}
                transition={{ delay: i * 0.02, duration: 0.4 }}
                className="flex-1 rounded-sm bg-gradient-to-t from-emerald-500/30 to-cyan-400/60"
              />
            ))}
          </div>
          <div className="mt-1 flex justify-between font-mono text-[9px] text-slate-500">
            <span>00h</span>
            <span>12h</span>
            <span>24h</span>
          </div>
        </div>
        <div className="rounded-lg border border-white/[0.05] bg-black/30 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-500">
              <Layers className="h-3 w-3" /> Latencia
            </span>
            <span className="font-mono text-xs text-cyan-400">187ms</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "23%" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function HealthTile({ label, value, accent }: { label: string; value: string | number; accent: string }) {
  const colorMap: Record<string, string> = {
    emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/[0.04]",
    cyan: "text-cyan-400 border-cyan-500/20 bg-cyan-500/[0.04]",
    red: "text-rose-400 border-rose-500/20 bg-rose-500/[0.04]",
    violet: "text-violet-400 border-violet-500/20 bg-violet-500/[0.04]",
  };
  return (
    <div className={`rounded-lg border ${colorMap[accent]} p-2`}>
      <div className="text-[9px] font-mono uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-0.5 font-mono text-lg font-semibold">{value}</div>
    </div>
  );
}

// ============= Decision Pipeline (animated connection lines) =============
function DecisionPipeline() {
  // Animation 2: agent detects opportunity → light line connects to executive card
  return (
    <section>
      <div className="mb-3">
        <SectionTitle
          eyebrow="Decision Pipeline"
          title="De detección a decisión accionable"
          subtitle="Cuando un agente detecta una oportunidad, una línea luminosa la conecta con una tarjeta ejecutiva con problema, impacto y recomendación."
          accent="cyan"
        />
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#0a0d16] to-[#0c1020] p-5">
        <div className="absolute inset-0 dot-bg opacity-30" />
        <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pipeline-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 60,80 Q 280,80 480,140 T 920,180"
            fill="none"
            stroke="url(#pipeline-line)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
          />
          <motion.path
            d="M 60,160 Q 300,160 520,180 T 920,200"
            fill="none"
            stroke="url(#pipeline-line)"
            strokeWidth="1"
            strokeDasharray="4 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 2.4, delay: 0.4, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
          />
          <motion.path
            d="M 60,240 Q 320,240 540,220 T 920,220"
            fill="none"
            stroke="url(#pipeline-line)"
            strokeWidth="1"
            strokeDasharray="4 8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 2.8, delay: 0.8, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
          />
        </svg>

        <div className="relative grid grid-cols-1 gap-4 md:grid-cols-[1fr_1.4fr_1fr] md:items-center">
          {/* Left: Agents */}
          <div className="space-y-2">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-cyan-400">Agentes IA detectan</div>
            {[
              { name: "Deposit Growth AI", accent: "emerald", text: "Saldos bajan 4.2% post-quincena" },
              { name: "Risk Prevention AI", accent: "red", text: "1,247 clientes con riesgo subiendo" },
              { name: "Competitor Intelligence", accent: "cyan", text: "BHD reduce saldo mínimo" },
            ].map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.025] px-2.5 py-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accentRaw[a.accent] }} />
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">{a.name}</div>
                  <div className="text-[11px] text-slate-300">{a.text}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center: Executive cards */}
          <div className="space-y-2">
            <div className="mb-2 text-center font-mono text-[10px] uppercase tracking-wider text-violet-400">
              Síntesis ejecutiva → decisión
            </div>
            {[
              {
                problem: "Riesgo de mora acelerando en cohorte Q3",
                opportunity: "Plan de regularización 0% interés por 3 meses",
                impact: "Recuperación RD$4.2M + 1,847 clientes rehabilitados",
                accent: "amber",
              },
              {
                problem: "Depósitos post-quincana bajan 4.2%",
                opportunity: "Certificado Qik 6m con bonus 0.5% nómina",
                impact: "+RD$340M depósitos en 72h",
                accent: "emerald",
              },
            ].map((c, i) => {
              const accent = ACCENT_COLORS[c.accent as keyof typeof ACCENT_COLORS];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.3 }}
                  className={`rounded-xl border ${accent.border} ${accent.bgSoft} p-3`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Target className={`h-3.5 w-3.5 ${accent.text}`} />
                    <span className={`text-[10px] font-mono uppercase tracking-wider ${accent.text}`}>
                      Recomendación {i + 1}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex gap-2 text-xs">
                      <span className="font-mono text-[9px] uppercase text-rose-400">Problema</span>
                      <span className="text-slate-300">{c.problem}</span>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className={`font-mono text-[9px] uppercase ${accent.text}`}>Oportunidad</span>
                      <span className="text-slate-200">{c.opportunity}</span>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className="font-mono text-[9px] uppercase text-emerald-400">Impacto</span>
                      <span className="text-slate-200">{c.impact}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Decisions */}
          <div className="space-y-2">
            <div className="mb-2 text-right font-mono text-[10px] uppercase tracking-wider text-emerald-400">
              Decisión ejecutiva
            </div>
            {[
              { label: "Aprobado — CFO", text: "Plan de regularización mora D30-60", time: "Hoy 12:00", accent: "emerald" },
              { label: "Aprobado — Director Producto", text: "Certificado Qik bonus 0.5%", time: "Hoy 14:00", accent: "emerald" },
              { label: "Pendiente — CMO", text: "Respuesta competitiva a BHD", time: "Mañana 10:00", accent: "amber" },
            ].map((d, i) => {
              const accent = ACCENT_COLORS[d.accent as keyof typeof ACCENT_COLORS];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.15 }}
                  className={`rounded-lg border ${accent.borderSoft} ${accent.bgSoft} px-2.5 py-1.5`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-mono uppercase tracking-wider ${accent.text}`}>{d.label}</span>
                    <span className="font-mono text-[9px] text-slate-500">{d.time}</span>
                  </div>
                  <div className="text-[11px] text-slate-200">{d.text}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
