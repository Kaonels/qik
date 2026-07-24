"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Radar, Sparkles, ScanEye, MessageSquareHeart, Users, HeartHandshake, PiggyBank,
  Crown, BellRing, LifeBuoy, ShieldAlert, Lightbulb, Gift, Briefcase, BarChart3,
  MousePointerClick, Brain, Workflow, Star, Map, X, ArrowRight, AlertTriangle,
  TrendingUp, TrendingDown, Zap, Target, Database, Cpu, Gauge, Bot,
} from "lucide-react";
import { useState } from "react";
import { AGENTS, type AIAgent } from "@/lib/qik-data";
import { ACCENT_COLORS, PRIORITY_CONFIG, STATUS_CONFIG } from "@/lib/qik-theme";
import { GlowCard, StatusDot } from "./shared";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Radar, Sparkles, ScanEye, MessageSquareHeart, Users, HeartHandshake, PiggyBank,
  Crown, BellRing, LifeBuoy, ShieldAlert, Lightbulb, Gift, Briefcase, BarChart3,
  MousePointerClick, Brain, Workflow, Star, Map,
};

export function AgentGrid() {
  const [selected, setSelected] = useState<AIAgent | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {AGENTS.map((agent, i) => (
          <AgentCard key={agent.id} agent={agent} index={i} onClick={() => setSelected(agent)} />
        ))}
      </div>
      <AnimatePresence>
        {selected && <AgentDetail agent={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}

function AgentCard({ agent, index, onClick }: { agent: AIAgent; index: number; onClick: () => void }) {
  const Icon = ICONS[agent.icon] || Bot;
  const accent = ACCENT_COLORS[agent.accent];
  const status = STATUS_CONFIG[agent.status];
  const priority = PRIORITY_CONFIG[agent.priority];

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      whileHover={{ y: -2 }}
      className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.025] p-4 text-left backdrop-blur-xl transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
    >
      {/* Accent corner glow */}
      <div className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full ${accent.bg} opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-80`} />

      <div className="relative">
        {/* Header */}
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={`relative flex h-9 w-9 items-center justify-center rounded-lg ${accent.bg} ${accent.border} border`}>
              <Icon className={`h-4 w-4 ${accent.text}`} />
              <span className={`absolute -right-0.5 -top-0.5 flex h-2 w-2`}>
                <StatusDot color={agent.accent === "gold" ? "gold" : agent.accent === "red" ? "red" : agent.accent} />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] text-slate-500">#{String(agent.index).padStart(2, "0")}</span>
                <span className={`font-mono text-[9px] uppercase tracking-wider ${status.text}`}>· {status.label}</span>
              </div>
              <div className="text-sm font-semibold leading-tight text-white">{agent.shortName}</div>
              <div className="text-[10px] text-slate-500">{agent.category}</div>
            </div>
          </div>
          <div className={`rounded border px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider ${priority.bg} ${priority.text} ${priority.border}`}>
            {priority.label}
          </div>
        </div>

        {/* Objective (truncated) */}
        <p className="mb-3 line-clamp-2 text-[11px] leading-relaxed text-slate-400">{agent.objective}</p>

        {/* Live metric */}
        <div className="mb-3 flex items-center justify-between rounded-md border border-white/[0.05] bg-black/30 px-2.5 py-1.5">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-slate-500">{agent.liveMetric.label}</div>
            <div className={`font-mono text-sm font-semibold ${accent.text}`}>{agent.liveMetric.value}</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[9px] text-slate-500">{agent.liveMetric.sub}</div>
            <div className="mt-0.5 flex items-center justify-end gap-1">
              <Gauge className="h-3 w-3 text-slate-600" />
              <span className="font-mono text-[10px] text-slate-400">{agent.confidence}%</span>
            </div>
          </div>
        </div>

        {/* KPIs mini */}
        <div className="grid grid-cols-2 gap-1.5">
          {agent.kpis.slice(0, 2).map((kpi) => (
            <div key={kpi.name} className="rounded border border-white/[0.04] bg-white/[0.015] px-2 py-1">
              <div className="truncate text-[9px] text-slate-500">{kpi.name}</div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold text-white">{kpi.value}</span>
                {kpi.trend === "up" ? (
                  <TrendingUp className="h-2.5 w-2.5 text-emerald-400" />
                ) : kpi.trend === "down" ? (
                  <TrendingDown className="h-2.5 w-2.5 text-rose-400" />
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-3 flex items-center justify-between border-t border-white/[0.05] pt-2.5">
          <div className="flex items-center gap-1.5">
            <Zap className={`h-3 w-3 ${accent.text}`} />
            <span className="text-[10px] text-slate-400 line-clamp-1">{agent.lastInsight}</span>
          </div>
          <ArrowRight className={`h-3.5 w-3.5 ${accent.text} opacity-0 transition-opacity group-hover:opacity-100`} />
        </div>
      </div>
    </motion.button>
  );
}

// ============= Agent Detail Modal =============
function AgentDetail({ agent, onClose }: { agent: AIAgent; onClose: () => void }) {
  const Icon = ICONS[agent.icon] || Bot;
  const accent = ACCENT_COLORS[agent.accent];
  const status = STATUS_CONFIG[agent.status];
  const priority = PRIORITY_CONFIG[agent.priority];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto scrollbar-thin rounded-2xl border border-white/[0.08] bg-[#0a0d16] shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/[0.06] bg-[#0a0d16]/95 p-6 backdrop-blur-xl">
          <div className="flex items-start gap-4">
            <div className={`relative flex h-14 w-14 items-center justify-center rounded-xl ${accent.bg} ${accent.border} border`}>
              <Icon className={`h-6 w-6 ${accent.text}`} />
              <span className="absolute -right-1 -top-1">
                <StatusDot color={agent.accent === "gold" ? "gold" : agent.accent === "red" ? "red" : agent.accent} />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-slate-500">AGENTE #{String(agent.index).padStart(2, "0")}</span>
                <span className={`rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${status.bg} ${status.text}`}>{status.label}</span>
                <span className={`rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${priority.bg} ${priority.text} ${priority.border}`}>{priority.label}</span>
              </div>
              <h2 className="mt-1 text-xl font-semibold text-white">{agent.name}</h2>
              <p className="text-xs text-slate-400">{agent.category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-2 text-slate-400 transition-colors hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          {/* Objective */}
          <DetailSection icon={Target} title="Objetivo" accent={accent.text}>
            <p className="text-sm leading-relaxed text-slate-300">{agent.objective}</p>
          </DetailSection>

          {/* Data Sources */}
          <DetailSection icon={Database} title="Datos que analiza" accent={accent.text}>
            <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2">
              {agent.dataSources.map((d, i) => (
                <div key={i} className="flex items-start gap-2 rounded-md border border-white/[0.04] bg-white/[0.015] px-2.5 py-1.5">
                  <span className={`mt-1 h-1 w-1 shrink-0 rounded-full ${accent.dot}`} />
                  <span className="text-xs text-slate-300">{d}</span>
                </div>
              ))}
            </div>
          </DetailSection>

          {/* Reasoning */}
          <DetailSection icon={Cpu} title="Cómo razona" accent={accent.text}>
            <p className="text-sm leading-relaxed text-slate-300">{agent.reasoning}</p>
          </DetailSection>

          {/* Outputs */}
          <DetailSection icon={Gauge} title="Qué resultados entrega" accent={accent.text}>
            <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2">
              {agent.outputs.map((o, i) => (
                <div key={i} className="flex items-start gap-2 rounded-md border border-white/[0.04] bg-white/[0.015] px-2.5 py-1.5">
                  <ArrowRight className={`mt-0.5 h-3 w-3 shrink-0 ${accent.text}`} />
                  <span className="text-xs text-slate-300">{o}</span>
                </div>
              ))}
            </div>
          </DetailSection>

          {/* Alerts */}
          <DetailSection icon={AlertTriangle} title="Alertas activas" accent="text-amber-400">
            <div className="space-y-1.5">
              {agent.alerts.map((a, i) => (
                <div key={i} className="flex items-start gap-2 rounded-md border border-amber-500/15 bg-amber-500/[0.04] px-2.5 py-1.5">
                  <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-amber-400" />
                  <span className="text-xs text-amber-100">{a}</span>
                </div>
              ))}
            </div>
          </DetailSection>

          {/* Recommendations */}
          <DetailSection icon={Sparkles} title="Recomendaciones" accent={accent.text}>
            <div className="space-y-1.5">
              {agent.recommendations.map((r, i) => (
                <div key={i} className="flex items-start gap-2 rounded-md border border-white/[0.04] bg-white/[0.015] px-2.5 py-1.5">
                  <span className={`mt-0.5 font-mono text-[10px] font-bold ${accent.text}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-xs text-slate-300">{r}</span>
                </div>
              ))}
            </div>
          </DetailSection>

          {/* Automations */}
          <DetailSection icon={Workflow} title="Automatizaciones posibles" accent={accent.text}>
            <div className="space-y-1.5">
              {agent.automations.map((a, i) => (
                <div key={i} className="flex items-start gap-2 rounded-md border border-cyan-500/10 bg-cyan-500/[0.03] px-2.5 py-1.5">
                  <Workflow className="mt-0.5 h-3 w-3 shrink-0 text-cyan-400" />
                  <span className="text-xs text-slate-300">{a}</span>
                </div>
              ))}
            </div>
          </DetailSection>

          {/* Value */}
          <DetailSection icon={TrendingUp} title="Valor para el banco" accent={accent.text}>
            <p className="rounded-md border border-emerald-500/15 bg-emerald-500/[0.04] px-3 py-2 text-sm leading-relaxed text-emerald-50">{agent.valueToBank}</p>
          </DetailSection>

          {/* KPIs */}
          <DetailSection icon={BarChart3} title="KPIs relacionados" accent={accent.text}>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {agent.kpis.map((kpi) => (
                <div key={kpi.name} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">{kpi.name}</div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-mono text-lg font-semibold text-white">{kpi.value}</span>
                    {kpi.trend === "up" ? (
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                    ) : kpi.trend === "down" ? (
                      <TrendingDown className="h-3.5 w-3.5 text-rose-400" />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </DetailSection>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DetailSection({
  icon: Icon,
  title,
  accent,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <div className="mb-3 flex items-center gap-2">
        <Icon className={`h-3.5 w-3.5 ${accent}`} />
        <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400">{title}</h3>
        <div className="h-px flex-1 bg-white/[0.05]" />
      </div>
      {children}
    </section>
  );
}
