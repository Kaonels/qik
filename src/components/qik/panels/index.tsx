"use client";

import { motion } from "framer-motion";
import {
  Radar, TrendingUp, TrendingDown, Star, ArrowRight, Crown, Shield,
  Target, Lightbulb, Sparkles, Briefcase, AlertTriangle, CheckCircle2,
  Clock, Zap, Brain, Users, PiggyBank, LifeBuoy, BellRing, Heart, BarChart3,
} from "lucide-react";
import { COMPETITORS, MORNING_BRIEFING, AGENTS } from "@/lib/qik-data";
import { ACCENT_COLORS, PRIORITY_CONFIG } from "@/lib/qik-theme";
import { SectionTitle, StatusDot, Sparkline, AnimatedValue } from "../shared";
import { LiveBriefingGenerator } from "../live-briefing";

// =====================================================
// COMPETITORS PANEL
// =====================================================
export function CompetitorsPanel() {
  const local = COMPETITORS.filter((c) => c.type === "local");
  const intl = COMPETITORS.filter((c) => c.type === "international");

  const threatConfig: Record<string, { label: string; color: string }> = {
    high: { label: "Amenaza alta", color: "text-rose-400 border-rose-500/30 bg-rose-500/10" },
    medium: { label: "Amenaza media", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
    low: { label: "Referente", color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Panel de Competencia"
        title="Inteligencia competitiva — Banca RD + referentes"
        subtitle="Monitoreo continuo de bancos dominicanos y neobancos internacionales de referencia. Datos de fuentes públicas."
        accent="cyan"
      />

      {/* Competitive matrix overview */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Competidores monitoreados</div>
          <div className="mt-1 font-mono text-2xl font-bold text-cyan-400">9</div>
          <div className="text-[10px] text-slate-500">6 locales + 3 referentes</div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Movimientos (7d)</div>
          <div className="mt-1 font-mono text-2xl font-bold text-emerald-400">47</div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400">
            <TrendingUp className="h-3 w-3" /> +12 vs semana previa
          </div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Brechas críticas</div>
          <div className="mt-1 font-mono text-2xl font-bold text-amber-400">3</div>
          <div className="text-[10px] text-slate-500">con ventana &lt;72h</div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Share defendido</div>
          <div className="mt-1 font-mono text-2xl font-bold text-violet-400">94%</div>
          <Sparkline data={[88, 89, 90, 91, 92, 92, 93, 93, 94, 94, 94, 94]} color="#8b5cf6" width={120} height={28} />
        </div>
      </div>

      {/* Local competitors */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <Radar className="h-4 w-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">Bancos y fintechs de República Dominicana</h3>
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {local.map((c, i) => {
            const accent = ACCENT_COLORS[c.accent];
            const threat = threatConfig[c.threat];
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-xl border ${accent.borderSoft} bg-white/[0.025] p-4 backdrop-blur-xl`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-semibold text-white">{c.name}</h4>
                      <span className={`rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${threat.color}`}>
                        {threat.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{c.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="font-mono text-sm">{c.appRating}</span>
                    </div>
                    <div className="text-[9px] text-slate-500">App Store</div>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-slate-400">{c.marketPosition}</p>

                <div className="mt-3 grid grid-cols-3 gap-2 border-t border-white/[0.05] pt-3">
                  <div>
                    <div className="text-[9px] font-mono uppercase text-slate-500">Cuenta digital</div>
                    <div className="text-[11px] text-slate-300">{c.digitalAccount}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono uppercase text-slate-500">Feature clave</div>
                    <div className="text-[11px] text-slate-300">{c.keyFeature}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono uppercase text-slate-500">Comisiones</div>
                    <div className="text-[11px] text-slate-300">{c.fees}</div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-md border border-emerald-500/10 bg-emerald-500/[0.03] p-2">
                    <div className="text-[9px] font-mono uppercase tracking-wider text-emerald-400">Fortalezas</div>
                    <ul className="mt-1 space-y-0.5">
                      {c.strengths.map((s, j) => (
                        <li key={j} className="flex items-start gap-1 text-[10px] text-slate-300">
                          <CheckCircle2 className="mt-0.5 h-2.5 w-2.5 shrink-0 text-emerald-400" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-md border border-rose-500/10 bg-rose-500/[0.03] p-2">
                    <div className="text-[9px] font-mono uppercase tracking-wider text-rose-400">Debilidades</div>
                    <ul className="mt-1 space-y-0.5">
                      {c.weaknesses.map((s, j) => (
                        <li key={j} className="flex items-start gap-1 text-[10px] text-slate-300">
                          <AlertTriangle className="mt-0.5 h-2.5 w-2.5 shrink-0 text-rose-400" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-3 rounded-md border border-cyan-500/15 bg-cyan-500/[0.04] p-2">
                  <div className="text-[9px] font-mono uppercase tracking-wider text-cyan-400">Movimiento reciente detectado</div>
                  <p className="mt-0.5 text-[11px] text-slate-200">{c.recentMove}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* International references */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <Brain className="h-4 w-4 text-violet-400" />
          <h3 className="text-sm font-semibold text-white">Referentes internacionales</h3>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {intl.map((c, i) => {
            const accent = ACCENT_COLORS[c.accent];
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-xl border ${accent.borderSoft} bg-white/[0.025] p-4 backdrop-blur-xl`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-white">{c.name}</h4>
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                </div>
                <p className="text-[10px] text-slate-500">{c.category}</p>
                <div className="mt-2 text-xs text-slate-400">{c.marketPosition}</div>
                <div className="mt-2 border-t border-white/[0.05] pt-2">
                  <div className="text-[9px] font-mono uppercase text-slate-500">Feature a adaptar</div>
                  <div className={`text-[11px] ${accent.text}`}>{c.keyFeature}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// =====================================================
// MARKETING PANEL
// =====================================================
export function MarketingPanel() {
  const marketingAgents = AGENTS.filter((a) =>
    ["viral-content", "creative-analyzer", "social-listening", "promotion-generator", "reputation"].includes(a.id)
  );

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Panel de Marketing"
        title="Growth orgánico, creativos y reputación"
        subtitle="Contenido viral, auditoría de creativos, social listening, generador de promociones y reputación de marca."
        accent="violet"
      />

      {/* Marketing KPIs */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Reach orgánico (mes)", value: "2.4M", delta: "+34%", accent: "violet" as const, spark: [1.2, 1.4, 1.6, 1.8, 2.0, 2.1, 2.3, 2.4] },
          { label: "Sentimiento neto", value: "+0.34", delta: "+0.08", accent: "cyan" as const, spark: [0.18, 0.20, 0.22, 0.25, 0.28, 0.30, 0.32, 0.34] },
          { label: "CAC blend", value: "RD$184", delta: "-12%", accent: "emerald" as const, spark: [280, 270, 260, 250, 240, 230, 210, 184] },
          { label: "NPS", value: "+47", delta: "+8 pts", accent: "gold" as const, spark: [28, 30, 32, 34, 36, 38, 42, 47] },
        ].map((k, i) => {
          const accent = ACCENT_COLORS[k.accent];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4 backdrop-blur-xl"
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">{k.label}</span>
                <span className={`text-[10px] font-mono ${accent.text}`}>{k.delta}</span>
              </div>
              <div className="mt-1 font-mono text-2xl font-bold text-white">{k.value}</div>
              <div className="mt-2">
                <Sparkline data={k.spark} color={accent.raw} width={140} height={28} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Marketing agents grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {marketingAgents.map((agent, i) => {
          const accent = ACCENT_COLORS[agent.accent];
          const ICON = agent.icon === "Sparkles" ? Sparkles : agent.icon === "ScanEye" ? Target : agent.icon === "MessageSquareHeart" ? Heart : agent.icon === "Gift" ? Zap : Star;
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl border ${accent.borderSoft} bg-white/[0.025] p-4 backdrop-blur-xl`}
            >
              <div className="mb-3 flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent.bg} ${accent.border} border`}>
                  <ICON className={`h-4 w-4 ${accent.text}`} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{agent.name}</div>
                  <div className="text-[10px] text-slate-500">{agent.category}</div>
                </div>
                <span className="ml-auto">
                  <StatusDot color={agent.accent === "gold" ? "gold" : agent.accent} />
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {agent.kpis.map((kpi) => (
                  <div key={kpi.name} className="rounded-md border border-white/[0.04] bg-white/[0.015] px-2 py-1.5">
                    <div className="text-[9px] uppercase tracking-wider text-slate-500">{kpi.name}</div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-white">{kpi.value}</span>
                      {kpi.trend === "up" ? (
                        <TrendingUp className="h-2.5 w-2.5 text-emerald-400" />
                      ) : kpi.trend === "down" ? (
                        <TrendingDown className="h-2.5 w-2.5 text-rose-400" />
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-md border border-white/[0.04] bg-black/30 p-2">
                <div className="text-[9px] font-mono uppercase tracking-wider text-slate-500">Último insight</div>
                <p className="text-[11px] text-slate-300">{agent.lastInsight}</p>
              </div>
              <div className="mt-2 space-y-1">
                {agent.alerts.slice(0, 1).map((a, j) => (
                  <div key={j} className="flex items-start gap-1.5 rounded border border-amber-500/15 bg-amber-500/[0.04] px-2 py-1">
                    <AlertTriangle className="mt-0.5 h-2.5 w-2.5 shrink-0 text-amber-400" />
                    <span className="text-[10px] text-amber-100">{a}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Viral content calendar preview */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-400" />
            <h3 className="text-sm font-semibold text-white">Calendario de contenido — próxima semana</h3>
          </div>
          <span className="rounded border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-violet-400">
            14 ideas priorizadas
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-7">
          {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day, i) => (
            <div key={day} className="rounded-lg border border-white/[0.05] bg-black/30 p-2">
              <div className="mb-1 font-mono text-[9px] uppercase tracking-wider text-slate-500">{day}</div>
              <div className="space-y-1">
                {[
                  "Hook: '3 errores con tu tarjeta'",
                  "Reel: Presupuesto semanal RD",
                  "Toque vs. Yappy vs. transfer",
                  "Crea Crédito explicado en 30s",
                  "Story: cashback categoría",
                  "Review con creator RD",
                  "Tip ahorro: regla 50/30/20",
                ][i] && (
                  <div className="rounded border border-violet-500/15 bg-violet-500/[0.05] px-1.5 py-1 text-[9px] text-violet-100">
                    {["Hook: '3 errores con tu tarjeta'", "Reel: Presupuesto semanal RD", "Toque vs. Yappy vs. transfer", "Crea Crédito explicado en 30s", "Story: cashback categoría", "Review con creator RD", "Tip ahorro: regla 50/30/20"][i]}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =====================================================
// LOYALTY PANEL
// =====================================================
export function LoyaltyPanel() {
  const loyaltyAgents = AGENTS.filter((a) =>
    ["loyalty-rewards", "retention", "deposit-growth", "referral-growth"].includes(a.id)
  );

  const tiers = [
    { name: "Bronce", color: "#a16207", pct: 38, cashback: "1%", benefits: "Acceso a retos + comunidad" },
    { name: "Plata", color: "#94a3b8", pct: 28, cashback: "1.5%", benefits: "Sin comisión mantenimiento + retos exclusivos" },
    { name: "Oro", color: "#facc15", pct: 18, cashback: "2%", benefits: "Acceso temprano a productos + soporte prioritario" },
    { name: "Platino", color: "#22d3ee", pct: 11, cashback: "2.5%", benefits: "Experiencias exclusivas + cashback expandido" },
    { name: "Diamante", color: "#a78bfa", pct: 5, cashback: "3%", benefits: "Tasa bonus 0.5% + gerente dedicado" },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Panel de Fidelización"
        title="Lealtad, retención y depósitos"
        subtitle="Sistema de niveles por comportamiento financiero responsable + retención + growth de depósitos + referidos."
        accent="gold"
      />

      {/* Loyalty tiers */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2">
          <Crown className="h-4 w-4 text-yellow-300" />
          <h3 className="text-sm font-semibold text-white">Niveles de lealtad — Distribución actual</h3>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative overflow-hidden rounded-xl border border-white/[0.06] p-3"
              style={{ background: `linear-gradient(180deg, ${t.color}15, transparent)` }}
            >
              <div className="absolute right-2 top-2 h-2 w-2 rounded-full" style={{ background: t.color }} />
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Nivel</div>
              <div className="text-base font-semibold" style={{ color: t.color }}>{t.name}</div>
              <div className="mt-2 font-mono text-2xl font-bold text-white">{t.pct}%</div>
              <div className="text-[10px] text-slate-500">de la base</div>
              <div className="mt-2 border-t border-white/[0.05] pt-2">
                <div className="text-[9px] font-mono uppercase text-slate-500">Cashback</div>
                <div className="text-sm font-semibold" style={{ color: t.color }}>{t.cashback}</div>
                <div className="mt-1 text-[9px] leading-snug text-slate-400">{t.benefits}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Loyalty agents */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {loyaltyAgents.map((agent, i) => {
          const accent = ACCENT_COLORS[agent.accent];
          const ICON = agent.icon === "Crown" ? Crown : agent.icon === "HeartHandshake" ? Heart : agent.icon === "PiggyBank" ? PiggyBank : Users;
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl border ${accent.borderSoft} bg-white/[0.025] p-4 backdrop-blur-xl`}
            >
              <div className="mb-3 flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent.bg} ${accent.border} border`}>
                  <ICON className={`h-4 w-4 ${accent.text}`} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{agent.name}</div>
                  <div className="text-[10px] text-slate-500">{agent.category}</div>
                </div>
                <span className="ml-auto">
                  <StatusDot color={agent.accent === "gold" ? "gold" : agent.accent} />
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {agent.kpis.map((kpi) => (
                  <div key={kpi.name} className="rounded-md border border-white/[0.04] bg-white/[0.015] px-2 py-1.5">
                    <div className="text-[9px] uppercase tracking-wider text-slate-500">{kpi.name}</div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-white">{kpi.value}</span>
                      {kpi.trend === "up" ? (
                        <TrendingUp className="h-2.5 w-2.5 text-emerald-400" />
                      ) : kpi.trend === "down" ? (
                        <TrendingDown className="h-2.5 w-2.5 text-rose-400" />
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-md border border-emerald-500/15 bg-emerald-500/[0.04] p-2">
                <div className="text-[9px] font-mono uppercase tracking-wider text-emerald-400">Recomendación activa</div>
                <p className="text-[11px] text-emerald-50">{agent.recommendations[0]}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// =====================================================
// RISK PANEL
// =====================================================
export function RiskPanel() {
  const riskAgents = AGENTS.filter((a) =>
    ["risk-prevention", "smart-recovery", "smart-payment-reminder"].includes(a.id)
  );

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Panel de Riesgo & Cobros"
        title="Prevención, recuperación y puntualidad"
        subtitle="Predicción de mora, estrategias de recuperación responsables y recordatorios inteligentes de pago."
        accent="red"
      />

      {/* Risk metrics */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Mora 30+", value: "2.3%", delta: "-0.4 pts", accent: "emerald" as const },
          { label: "Mora evitada (mes)", value: "RD$4.2M", delta: "+18%", accent: "emerald" as const },
          { label: "En alerta temprana", value: "1,247", delta: "+8%", accent: "red" as const },
          { label: "Tasa de recuperación", value: "41%", delta: "+3 pts", accent: "cyan" as const },
        ].map((k, i) => {
          const accent = ACCENT_COLORS[k.accent];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4 backdrop-blur-xl"
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">{k.label}</span>
                <span className={`text-[10px] font-mono ${accent.text}`}>{k.delta}</span>
              </div>
              <div className="mt-1 font-mono text-2xl font-bold text-white">{k.value}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Risk agents */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {riskAgents.map((agent, i) => {
          const accent = ACCENT_COLORS[agent.accent];
          const ICON = agent.icon === "ShieldAlert" ? Shield : agent.icon === "LifeBuoy" ? LifeBuoy : BellRing;
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl border ${accent.borderSoft} bg-white/[0.025] p-4 backdrop-blur-xl`}
            >
              <div className="mb-3 flex items-center gap-2">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${accent.bg} ${accent.border} border`}>
                  <ICON className={`h-4 w-4 ${accent.text}`} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{agent.shortName}</div>
                  <div className="text-[10px] text-slate-500">{agent.category}</div>
                </div>
                <StatusDot color={agent.accent === "red" ? "red" : agent.accent} />
              </div>

              <div className="mb-3 rounded-md border border-white/[0.04] bg-black/30 p-2">
                <div className="text-[9px] font-mono uppercase tracking-wider text-slate-500">{agent.liveMetric.label}</div>
                <div className={`font-mono text-lg font-semibold ${accent.text}`}>{agent.liveMetric.value}</div>
                <div className="text-[9px] text-slate-500">{agent.liveMetric.sub}</div>
              </div>

              <div className="space-y-1">
                {agent.alerts.slice(0, 2).map((a, j) => (
                  <div key={j} className="flex items-start gap-1.5 rounded border border-rose-500/15 bg-rose-500/[0.04] px-2 py-1">
                    <AlertTriangle className="mt-0.5 h-2.5 w-2.5 shrink-0 text-rose-400" />
                    <span className="text-[10px] text-rose-100">{a}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-md border border-amber-500/15 bg-amber-500/[0.04] p-2">
                <div className="text-[9px] font-mono uppercase tracking-wider text-amber-400">Recomendación</div>
                <p className="text-[10px] text-amber-50">{agent.recommendations[0]}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Risk prevention funnel */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2">
          <Shield className="h-4 w-4 text-rose-400" />
          <h3 className="text-sm font-semibold text-white">Funnel de prevención de mora</h3>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
          {[
            { stage: "Base vigente", count: "592K", pct: 100, color: "#10b981" },
            { stage: "Alerta temprana", count: "1,247", pct: 0.21, color: "#fbbf24" },
            { stage: "Intervención preventiva", count: "847", pct: 0.14, color: "#22d3ee" },
            { stage: "Mora evitada", count: "682", pct: 0.12, color: "#10b981" },
            { stage: "Mora D30+", count: "165", pct: 0.03, color: "#f43f5e" },
          ].map((s, i) => (
            <motion.div
              key={s.stage}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden rounded-lg border border-white/[0.06] bg-black/30 p-3"
            >
              <div className="absolute bottom-0 left-0 h-1" style={{ width: `${s.pct}%`, background: s.color }} />
              <div className="text-[9px] font-mono uppercase tracking-wider text-slate-500">Etapa {i + 1}</div>
              <div className="text-xs font-semibold text-white">{s.stage}</div>
              <div className="mt-1 font-mono text-lg font-bold" style={{ color: s.color }}>{s.count}</div>
              <div className="text-[9px] text-slate-500">{s.pct}% de la base</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =====================================================
// INNOVATION PANEL
// =====================================================
export function InnovationPanel() {
  const innovationAgents = AGENTS.filter((a) =>
    ["feature-suggestion", "banking-innovation", "product-roadmap", "ux-auditor", "automation-center", "dashboard-metrics"].includes(a.id)
  );

  const ideas = [
    { title: "Metas de ahorro compartidas", source: "Mercado Pago", ice: 87, effort: "M", impact: "Retención +8%, depósitos +RD$180M" },
    { title: "Subcuentas automáticas", source: "Revolut", ice: 74, effort: "L", impact: "Retención +6%, engagement +14%" },
    { title: "Cashback por categorías", source: "Nubank", ice: 81, effort: "M", impact: "Adquisición +12%, transaccionalidad +18%" },
    { title: "Redondeo de compras a ahorro", source: "Mercado Pago", ice: 79, effort: "S", impact: "Ahorro +RD$92M, engagement +22%" },
    { title: "Cuenta conjunta familiar", source: "Innovación IA", ice: 68, effort: "L", impact: "Cuentas +8%, retención familiar" },
    { title: "Remesas Qik RD-US", source: "Innovación IA", ice: 92, effort: "XL", impact: "Mercado USD$200M en comisiones" },
  ];

  const effortColors: Record<string, string> = {
    S: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    M: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    L: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    XL: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Panel de Innovación"
        title="Pipeline de producto y roadmap"
        subtitle="Sugerencia de features, innovación bancaria diaria, roadmap priorizado por RICE y auditoría UX continua."
        accent="violet"
      />

      {/* Innovation agents */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {innovationAgents.map((agent, i) => {
          const accent = ACCENT_COLORS[agent.accent];
          const ICON = agent.icon === "Lightbulb" ? Lightbulb : agent.icon === "Brain" ? Brain : agent.icon === "Map" ? Target : agent.icon === "MousePointerClick" ? Zap : agent.icon === "Workflow" ? Zap : BarChart3Icon;
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl border ${accent.borderSoft} bg-white/[0.025] p-4 backdrop-blur-xl`}
            >
              <div className="mb-3 flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent.bg} ${accent.border} border`}>
                  <ICON className={`h-4 w-4 ${accent.text}`} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{agent.shortName}</div>
                  <div className="text-[10px] text-slate-500">{agent.category}</div>
                </div>
                <StatusDot color={agent.accent} />
              </div>
              <div className="rounded-md border border-white/[0.04] bg-black/30 p-2">
                <div className="text-[9px] font-mono uppercase tracking-wider text-slate-500">{agent.liveMetric.label}</div>
                <div className={`font-mono text-base font-semibold ${accent.text}`}>{agent.liveMetric.value}</div>
              </div>
              <div className="mt-2 text-[11px] text-slate-400 line-clamp-2">{agent.lastInsight}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Innovation pipeline table */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-violet-400" />
            <h3 className="text-sm font-semibold text-white">Pipeline de innovación — priorizado por ICE</h3>
          </div>
          <span className="rounded border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-violet-400">
            284 ideas generadas
          </span>
        </div>
        <div className="space-y-2">
          {ideas.map((idea, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-12 items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.015] px-3 py-2.5"
            >
              <div className="col-span-12 flex items-center gap-2 md:col-span-5">
                <span className="font-mono text-[10px] text-slate-500">#{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm font-medium text-white">{idea.title}</span>
              </div>
              <div className="col-span-4 md:col-span-2">
                <span className="text-[10px] text-slate-500">Origen: </span>
                <span className="text-[11px] text-slate-300">{idea.source}</span>
              </div>
              <div className="col-span-4 md:col-span-3">
                <span className="text-[10px] text-slate-500">Impacto: </span>
                <span className="text-[11px] text-emerald-300">{idea.impact}</span>
              </div>
              <div className="col-span-2 md:col-span-1">
                <span className={`rounded border px-1.5 py-0.5 font-mono text-[9px] ${effortColors[idea.effort]}`}>
                  {idea.effort}
                </span>
              </div>
              <div className="col-span-2 md:col-span-1 text-right">
                <div className="font-mono text-base font-bold text-violet-400">{idea.ice}</div>
                <div className="text-[8px] uppercase tracking-wider text-slate-500">ICE</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BarChart3Icon({ className }: { className?: string }) {
  return <Target className={className} />;
}

// =====================================================
// EXECUTIVE BRIEFING PANEL
// =====================================================
export function ExecutivePanel() {
  const b = MORNING_BRIEFING;
  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Briefing Ejecutivo · Executive Advisor AI"
        title={b.headline}
        subtitle={`${b.date} · Síntesis de los 19 agentes en 5 minutos de lectura accionable.`}
        accent="emerald"
      />

      {/* Live LLM-generated briefing */}
      <LiveBriefingGenerator />

      {/* Decisions today */}
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5 backdrop-blur-xl">
        <div className="mb-3 flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">Decisiones recomendadas para hoy</h3>
        </div>
        <div className="space-y-2">
          {b.decisions.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-2 rounded-lg border border-white/[0.06] bg-black/30 p-3 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/15 font-mono text-xs font-bold text-emerald-400">
                  {i + 1}
                </span>
                <div>
                  <div className="text-sm font-medium text-white">{d.title}</div>
                  <div className="text-[10px] text-slate-400">Responsable: {d.by}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-amber-400" />
                <span className="font-mono text-[11px] text-amber-400">Deadline: {d.deadline}</span>
                <button className="ml-2 rounded-md border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-300 hover:bg-emerald-500/25">
                  Aprobar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Two-column: Risks + Opportunities */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Risks */}
        <div className="rounded-2xl border border-rose-500/15 bg-rose-500/[0.03] p-5 backdrop-blur-xl">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-400" />
            <h3 className="text-sm font-semibold text-white">Top riesgos del día</h3>
          </div>
          <div className="space-y-3">
            {b.topRisks.map((r, i) => {
              const cfg = PRIORITY_CONFIG[r.severity];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-lg border border-white/[0.06] bg-black/30 p-3"
                >
                  <div className="mb-1 flex items-center gap-2">
                    <span className={`rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                      {cfg.label}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{r.agent}</span>
                  </div>
                  <div className="text-sm font-semibold text-white">{r.title}</div>
                  <p className="mt-1 text-xs text-slate-400">{r.detail}</p>
                  <div className="mt-2 flex items-start gap-1.5 rounded border border-emerald-500/15 bg-emerald-500/[0.04] px-2 py-1">
                    <Zap className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
                    <span className="text-[11px] text-emerald-50">{r.action}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Opportunities */}
        <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.03] p-5 backdrop-blur-xl">
          <div className="mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Top oportunidades del día</h3>
          </div>
          <div className="space-y-3">
            {b.topOpportunities.map((o, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-lg border border-white/[0.06] bg-black/30 p-3"
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-emerald-400">
                    {o.magnitude}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{o.agent}</span>
                </div>
                <div className="text-sm font-semibold text-white">{o.title}</div>
                <p className="mt-1 text-xs text-slate-400">{o.detail}</p>
                <div className="mt-2 flex items-start gap-1.5 rounded border border-emerald-500/15 bg-emerald-500/[0.04] px-2 py-1">
                  <Zap className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
                  <span className="text-[11px] text-emerald-50">{o.action}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Ideas + KPIs */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-violet-500/15 bg-violet-500/[0.03] p-5 backdrop-blur-xl lg:col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-violet-400" />
            <h3 className="text-sm font-semibold text-white">Top ideas del día para el roadmap</h3>
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {b.topIdeas.map((idea, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-lg border border-white/[0.06] bg-black/30 p-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">{idea.agent}</span>
                  <span className="rounded border border-violet-500/30 bg-violet-500/10 px-1.5 py-0.5 font-mono text-[9px] text-violet-400">
                    ICE {idea.ice}
                  </span>
                </div>
                <div className="mt-1 text-sm font-semibold text-white">{idea.title}</div>
                <p className="mt-1 text-[11px] text-slate-400">{idea.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-500/15 bg-cyan-500/[0.03] p-5 backdrop-blur-xl">
          <div className="mb-3 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">KPIs del día</h3>
          </div>
          <div className="space-y-2">
            {b.topKPIs.map((k, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-black/30 p-2.5"
              >
                <span className="text-xs text-slate-400">{k.name}</span>
                <div className="flex items-center gap-2">
                  <AnimatedValue value={k.value} className="font-mono text-sm font-bold text-white" />
                  <span className={`font-mono text-[10px] ${k.trend === "up" ? "text-emerald-400" : "text-rose-400"}`}>
                    {k.trend === "up" ? "▲" : "▼"} {k.delta}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// SAVINGS PANEL — ROI / FTE replacement tracker
// =====================================================

interface FTERow {
  agentId: string;
  agentName: string;
  shortName: string;
  accent: Accent;
  role: string;
  fte: number;
  costPerFTE: number; // RD$ millions/year
  annualSavings: number; // RD$ millions/year
  mode: "replace" | "augment" | "partial";
  category: string;
}

type Accent = "emerald" | "cyan" | "violet" | "amber" | "red" | "gold";

const FTE_DATA: FTERow[] = [
  { agentId: "competitor-intel", agentName: "Competitor Intelligence AI", shortName: "Competitor Intel", accent: "cyan", role: "Analistas competitivos senior", fte: 2.0, costPerFTE: 1.2, annualSavings: 2.4, mode: "replace", category: "Inteligencia" },
  { agentId: "viral-content", agentName: "Viral Content AI", shortName: "Viral Content", accent: "violet", role: "Creadores de contenido junior", fte: 1.5, costPerFTE: 0.8, annualSavings: 1.2, mode: "augment", category: "Marketing" },
  { agentId: "creative-analyzer", agentName: "Creative Analyzer AI", shortName: "Creative Analyzer", accent: "amber", role: "Analista de creativos + agencia", fte: 1.0, costPerFTE: 1.8, annualSavings: 1.8, mode: "replace", category: "Marketing" },
  { agentId: "social-listening", agentName: "Social Listening AI", shortName: "Social Listening", accent: "cyan", role: "Community manager + analista CX", fte: 2.0, costPerFTE: 0.7, annualSavings: 1.4, mode: "replace", category: "CX" },
  { agentId: "referral-growth", agentName: "Referral Growth AI", shortName: "Referral Growth", accent: "emerald", role: "Growth manager", fte: 1.0, costPerFTE: 0.9, annualSavings: 0.9, mode: "augment", category: "Growth" },
  { agentId: "retention", agentName: "Customer Retention AI", shortName: "Retention", accent: "emerald", role: "Analistas de CX/retención", fte: 2.0, costPerFTE: 0.8, annualSavings: 1.6, mode: "replace", category: "CX" },
  { agentId: "deposit-growth", agentName: "Deposit Growth AI", shortName: "Deposit Growth", accent: "emerald", role: "Equipo de producto", fte: 1.0, costPerFTE: 1.1, annualSavings: 1.1, mode: "augment", category: "Producto" },
  { agentId: "loyalty-rewards", agentName: "Loyalty & Rewards AI", shortName: "Loyalty", accent: "gold", role: "Gestor de programa de lealtad", fte: 1.0, costPerFTE: 1.2, annualSavings: 1.2, mode: "replace", category: "Fidelización" },
  { agentId: "smart-payment-reminder", agentName: "Smart Payment Reminder AI", shortName: "Payment Reminder", accent: "cyan", role: "Cobradores + notificaciones", fte: 2.0, costPerFTE: 0.9, annualSavings: 1.8, mode: "replace", category: "Cobros" },
  { agentId: "smart-recovery", agentName: "Smart Recovery AI", shortName: "Smart Recovery", accent: "amber", role: "Gestores de recuperación + legal", fte: 2.0, costPerFTE: 1.3, annualSavings: 2.6, mode: "replace", category: "Cobros" },
  { agentId: "risk-prevention", agentName: "Risk Prevention AI", shortName: "Risk Prevention", accent: "red", role: "Analista de riesgo + provisiones", fte: 1.5, costPerFTE: 2.5, annualSavings: 3.8, mode: "replace", category: "Riesgo" },
  { agentId: "feature-suggestion", agentName: "Feature Suggestion AI", shortName: "Feature Suggestion", accent: "violet", role: "Product researcher", fte: 1.0, costPerFTE: 1.0, annualSavings: 1.0, mode: "replace", category: "Producto" },
  { agentId: "promotion-generator", agentName: "Promotion Generator AI", shortName: "Promotion Gen", accent: "amber", role: "Marketing ops", fte: 1.0, costPerFTE: 0.9, annualSavings: 0.9, mode: "replace", category: "Marketing" },
  { agentId: "executive-advisor", agentName: "Executive Advisor AI", shortName: "Exec Advisor", accent: "emerald", role: "Analista ejecutivo del CEO", fte: 1.0, costPerFTE: 1.5, annualSavings: 1.5, mode: "augment", category: "Ejecutivo" },
  { agentId: "dashboard-metrics", agentName: "Dashboard Metrics AI", shortName: "Metrics Explainer", accent: "cyan", role: "BI analyst", fte: 1.0, costPerFTE: 1.3, annualSavings: 1.3, mode: "replace", category: "Ejecutivo" },
  { agentId: "ux-auditor", agentName: "UX Auditor AI", shortName: "UX Auditor", accent: "violet", role: "UX researcher + agencia", fte: 1.2, costPerFTE: 1.2, annualSavings: 1.4, mode: "partial", category: "Producto" },
  { agentId: "banking-innovation", agentName: "Banking Innovation AI", shortName: "Innovation", accent: "violet", role: "Innovation lead", fte: 1.0, costPerFTE: 0.9, annualSavings: 0.9, mode: "partial", category: "Producto" },
  { agentId: "automation-center", agentName: "AI Automation Center", shortName: "Automation", accent: "cyan", role: "Ops + RPA externo", fte: 3.0, costPerFTE: 1.0, annualSavings: 3.1, mode: "replace", category: "Operaciones" },
  { agentId: "reputation", agentName: "Reputation AI", shortName: "Reputation", accent: "gold", role: "PR analyst", fte: 1.0, costPerFTE: 1.0, annualSavings: 1.0, mode: "replace", category: "CX" },
  { agentId: "product-roadmap", agentName: "Product Roadmap AI", shortName: "Roadmap", accent: "violet", role: "Product lead", fte: 0.8, costPerFTE: 1.0, annualSavings: 0.8, mode: "augment", category: "Producto" },
];

const MODE_CONFIG: Record<string, { label: string; bg: string; text: string; border: string }> = {
  replace: { label: "Reemplaza", bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/30" },
  augment: { label: "Potencia", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  partial: { label: "Parcial", bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
};

export function SavingsPanel() {
  const totalFTE = FTE_DATA.reduce((s, r) => s + r.fte, 0);
  const totalSavings = FTE_DATA.reduce((s, r) => s + r.annualSavings, 0);
  const replaced = FTE_DATA.filter((r) => r.mode === "replace").reduce((s, r) => s + r.fte, 0);
  const augmented = FTE_DATA.filter((r) => r.mode === "augment").reduce((s, r) => s + r.fte, 0);
  const partial = FTE_DATA.filter((r) => r.mode === "partial").reduce((s, r) => s + r.fte, 0);

  // Top 5 by savings
  const top5 = [...FTE_DATA].sort((a, b) => b.annualSavings - a.annualSavings).slice(0, 5);
  const maxSavings = Math.max(...FTE_DATA.map((r) => r.annualSavings));

  // By category
  const byCategory = FTE_DATA.reduce((acc, r) => {
    if (!acc[r.category]) acc[r.category] = { fte: 0, savings: 0 };
    acc[r.category].fte += r.fte;
    acc[r.category].savings += r.annualSavings;
    return acc;
  }, {} as Record<string, { fte: number; savings: number }>);

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Centro de Ahorro · ROI de la plataforma"
        title="Capacidad liberada y ahorro estimado por agente IA"
        subtitle="Cada agente asume o potencia funciones humanas especializadas. La meta no es reemplazar personas por reemplazar — es reasignar talento a tareas de mayor valor y escalar sin contratación proporcional."
        accent="emerald"
      />

      {/* Headline savings tiles */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.06] p-4"
        >
          <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Ahorro anual estimado</div>
          <div className="mt-1 font-mono text-3xl font-bold text-white">RD$32.7M</div>
          <div className="text-[10px] text-slate-400">≈ USD$560K · estimación ilustrativa</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-xl border border-cyan-500/30 bg-cyan-500/[0.06] p-4"
        >
          <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">FTE liberado/aumentado</div>
          <div className="mt-1 font-mono text-3xl font-bold text-white">{totalFTE.toFixed(1)}</div>
          <div className="text-[10px] text-slate-400">equivalentes full-time</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-violet-500/30 bg-violet-500/[0.06] p-4"
        >
          <div className="text-[10px] font-mono uppercase tracking-wider text-violet-400">Payback estimado</div>
          <div className="mt-1 font-mono text-3xl font-bold text-white">6-9 m</div>
          <div className="text-[10px] text-slate-400">implementación + operación</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl border border-amber-500/30 bg-amber-500/[0.06] p-4"
        >
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400">ROI año 1</div>
          <div className="mt-1 font-mono text-3xl font-bold text-white">3.4x</div>
          <div className="text-[10px] text-slate-400">vs. costo de plataforma</div>
        </motion.div>
      </div>

      {/* Mode breakdown */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className={`rounded-xl border ${MODE_CONFIG.replace.border} ${MODE_CONFIG.replace.bg} p-4`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-mono uppercase tracking-wider ${MODE_CONFIG.replace.text}`}>Reemplazo directo</span>
            <span className={`font-mono text-2xl font-bold ${MODE_CONFIG.replace.text}`}>{replaced.toFixed(1)}</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            Funciones que el agente asume completamente. Talento humano se reasigna a tareas estratégicas de mayor valor.
          </div>
        </div>
        <div className={`rounded-xl border ${MODE_CONFIG.augment.border} ${MODE_CONFIG.augment.bg} p-4`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-mono uppercase tracking-wider ${MODE_CONFIG.augment.text}`}>Potencia equipo</span>
            <span className={`font-mono text-2xl font-bold ${MODE_CONFIG.augment.text}`}>{augmented.toFixed(1)}</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            El agente multiplica la productividad del equipo existente. No se reemplaza, se elimina la necesidad de contratar más.
          </div>
        </div>
        <div className={`rounded-xl border ${MODE_CONFIG.partial.border} ${MODE_CONFIG.partial.bg} p-4`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-mono uppercase tracking-wider ${MODE_CONFIG.partial.text}`}>Cobertura parcial</span>
            <span className={`font-mono text-2xl font-bold ${MODE_CONFIG.partial.text}`}>{partial.toFixed(1)}</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            El agente cubre una parte del rol; reduce dependencia de agencias externas y consultores puntuales.
          </div>
        </div>
      </div>

      {/* Top 5 savings bar chart */}
      <div className="rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-foreground">Top 5 agentes por ahorro anual estimado</h3>
        </div>
        <div className="space-y-3">
          {top5.map((row, i) => {
            const accent = ACCENT_COLORS[row.accent];
            const pct = (row.annualSavings / maxSavings) * 100;
            return (
              <motion.div
                key={row.agentId}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="w-32 shrink-0 text-xs text-foreground truncate">{row.shortName}</div>
                <div className="flex-1">
                  <div className="h-7 overflow-hidden rounded-md border border-border bg-background">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                      className="flex h-full items-center justify-end rounded-md bg-gradient-to-r from-emerald-500/60 to-emerald-400/80 pr-2"
                    >
                      <span className="font-mono text-[10px] font-semibold text-black">RD${row.annualSavings.toFixed(1)}M</span>
                    </motion.div>
                  </div>
                </div>
                <div className="w-16 shrink-0 text-right font-mono text-xs text-muted-foreground">{row.fte.toFixed(1)} FTE</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* By category */}
      <div className="rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2">
          <PiggyBank className="h-4 w-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-foreground">Ahorro por categoría funcional</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-7">
          {Object.entries(byCategory).map(([cat, data], i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-lg border border-border bg-background/60 p-3"
            >
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{cat}</div>
              <div className="mt-1 font-mono text-lg font-bold text-emerald-400">RD${data.savings.toFixed(1)}M</div>
              <div className="text-[10px] text-muted-foreground">{data.fte.toFixed(1)} FTE</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full FTE replacement table */}
      <div className="rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-foreground">Detalle por agente — función humana que asume/potencia</h3>
          </div>
          <span className="rounded border border-border bg-background/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            20 agentes
          </span>
        </div>
        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                <th className="px-2 py-2">Agente IA</th>
                <th className="px-2 py-2">Función humana</th>
                <th className="px-2 py-2 text-center">Modo</th>
                <th className="px-2 py-2 text-right">FTE</th>
                <th className="px-2 py-2 text-right">Costo/FTE</th>
                <th className="px-2 py-2 text-right">Ahorro anual</th>
              </tr>
            </thead>
            <tbody>
              {FTE_DATA.map((row, i) => {
                const accent = ACCENT_COLORS[row.accent];
                const mode = MODE_CONFIG[row.mode];
                return (
                  <motion.tr
                    key={row.agentId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="border-b border-border/60 hover:bg-background/40"
                  >
                    <td className="px-2 py-2">
                      <div className="flex items-center gap-2">
                        <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                        <span className="font-medium text-foreground">{row.shortName}</span>
                      </div>
                    </td>
                    <td className="px-2 py-2 text-muted-foreground">{row.role}</td>
                    <td className="px-2 py-2 text-center">
                      <span className={`rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${mode.bg} ${mode.text} ${mode.border}`}>
                        {mode.label}
                      </span>
                    </td>
                    <td className="px-2 py-2 text-right font-mono text-foreground">{row.fte.toFixed(1)}</td>
                    <td className="px-2 py-2 text-right font-mono text-muted-foreground">RD${row.costPerFTE.toFixed(1)}M</td>
                    <td className="px-2 py-2 text-right font-mono font-semibold text-emerald-400">RD${row.annualSavings.toFixed(1)}M</td>
                  </motion.tr>
                );
              })}
              <tr className="border-t-2 border-border bg-background/40">
                <td className="px-2 py-3 font-semibold text-foreground" colSpan={3}>TOTAL ANUAL ESTIMADO</td>
                <td className="px-2 py-3 text-right font-mono font-bold text-foreground">{totalFTE.toFixed(1)}</td>
                <td className="px-2 py-3"></td>
                <td className="px-2 py-3 text-right font-mono text-base font-bold text-emerald-400">RD${totalSavings.toFixed(1)}M</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ROI calculation */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5 backdrop-blur-xl">
          <div className="mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-foreground">Modelo ROI</h3>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Ahorro anual estimado</span>
              <span className="font-mono font-semibold text-emerald-400">+ RD$32.7M</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Mora evitada (adicional)</span>
              <span className="font-mono font-semibold text-emerald-400">+ RD$4.2M</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Lift en depósitos (gamificación)</span>
              <span className="font-mono font-semibold text-emerald-400">+ RD$340M saldo</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Costo plataforma año 1</span>
              <span className="font-mono font-semibold text-rose-400">− RD$9.6M</span>
            </div>
            <div className="flex justify-between pt-2 text-sm">
              <span className="font-semibold text-foreground">Neto año 1</span>
              <span className="font-mono font-bold text-emerald-400">+ RD$27.5M</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-5 backdrop-blur-xl">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-foreground">Disclaimers importantes</h3>
          </div>
          <ul className="space-y-1.5 text-[11px] leading-relaxed text-slate-400">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
              <span>Estimaciones ilustrativas basadas en salarios promedio del sector bancario RD y buenas prácticas internacionales.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
              <span>Los números reales se calibran tras autorización y acceso a la estructura organizacional actual de Qik.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
              <span>El objetivo es <strong className="text-foreground">reasignar talento</strong>, no despedir. Cada FTE liberado se redistribuye a iniciativa estratégica.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
              <span>Las decisiones automatizadas respetan políticas de cobranza responsable y regulación de la Superintendencia de Bancos RD.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
              <span>Ninguna decisión de crédito se ejecuta sin gobernanza humana (human-in-the-loop).</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
