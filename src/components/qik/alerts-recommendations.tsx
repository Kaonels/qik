"use client";

import { motion } from "framer-motion";
import {
  Bell, AlertTriangle, ArrowRight, Filter, CheckCircle2, Clock, Zap, X,
} from "lucide-react";
import { useState } from "react";
import { ALERTS, RECOMMENDATIONS } from "@/lib/qik-data";
import { ACCENT_COLORS, PRIORITY_CONFIG } from "@/lib/qik-theme";
import { SectionTitle, StatusDot } from "./shared";

export function AlertsCenter() {
  const [filter, setFilter] = useState<string>("all");
  const categories = ["all", ...Array.from(new Set(ALERTS.map((a) => a.category)))];
  const filtered = filter === "all" ? ALERTS : ALERTS.filter((a) => a.category === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionTitle
          eyebrow="Centro de Alertas"
          title="Alertas priorizadas en tiempo real"
          subtitle="Cada alerta incluye causa, impacto esperado y recomendación accionable. Routing automático al responsable."
          accent="red"
        />
        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-slate-500" />
          <div className="flex flex-wrap gap-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                  filter === c
                    ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400"
                    : "border-white/[0.06] bg-white/[0.02] text-slate-500 hover:text-slate-300"
                }`}
              >
                {c === "all" ? "Todas" : c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary tiles */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {(["critical", "high", "medium", "low"] as const).map((p) => {
          const count = ALERTS.filter((a) => a.priority === p).length;
          const cfg = PRIORITY_CONFIG[p];
          return (
            <div key={p} className={`rounded-xl border ${cfg.border} ${cfg.bg} p-4`}>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono uppercase tracking-wider ${cfg.text}`}>{cfg.label}</span>
                <AlertTriangle className={`h-3.5 w-3.5 ${cfg.text}`} />
              </div>
              <div className="mt-1 font-mono text-2xl font-bold text-white">{count}</div>
              <div className="text-[10px] text-slate-500">alertas activas</div>
            </div>
          );
        })}
      </div>

      {/* Alert timeline */}
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 via-cyan-500/30 to-transparent" />
        <div className="space-y-3">
          {filtered.map((a, i) => {
            const accent = ACCENT_COLORS[a.accent];
            const priority = PRIORITY_CONFIG[a.priority];
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="relative pl-12"
              >
                <div className={`absolute left-2.5 top-3 flex h-4 w-4 items-center justify-center rounded-full ${accent.bg} ${accent.border} border`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                </div>
                <div className={`rounded-xl border ${accent.borderSoft} bg-white/[0.025] p-4 backdrop-blur-xl transition-colors hover:bg-white/[0.04]`}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${priority.bg} ${priority.text} ${priority.border}`}>
                        {priority.label}
                      </span>
                      <span className={`text-[10px] font-mono uppercase tracking-wider ${accent.text}`}>{a.agentName}</span>
                      <span className="text-[10px] text-slate-500">· {a.category}</span>
                    </div>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-slate-500">
                      <Clock className="h-3 w-3" />{a.time}
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-white">{a.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">{a.description}</p>
                  <div className="mt-3 flex items-start gap-2 rounded-lg border border-emerald-500/15 bg-emerald-500/[0.04] px-3 py-2">
                    <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-wider text-emerald-400">Recomendación</div>
                      <p className="text-xs text-emerald-50">{a.recommendation}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button className="flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20">
                      <CheckCircle2 className="h-3 w-3" /> Aprobar acción
                    </button>
                    <button className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-slate-400 transition-colors hover:text-white">
                      Asignar a equipo <ArrowRight className="h-3 w-3" />
                    </button>
                    <button className="ml-auto rounded-md p-1 text-slate-500 hover:text-white">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============= Recommendations Center =============
export function RecommendationsCenter() {
  const effortColors: Record<string, string> = {
    S: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    M: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    L: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    XL: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Centro de Recomendaciones"
        title="Decisiones accionables priorizadas"
        subtitle="Cada recomendación incluye rationale, impacto esperado, esfuerzo y timeframe. Listas para aprobación ejecutiva."
        accent="amber"
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Pendientes</div>
          <div className="mt-1 font-mono text-2xl font-bold text-amber-400">8</div>
          <div className="text-[10px] text-slate-500">esperando approval</div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">En progreso</div>
          <div className="mt-1 font-mono text-2xl font-bold text-cyan-400">14</div>
          <div className="text-[10px] text-slate-500">implementándose</div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Completadas</div>
          <div className="mt-1 font-mono text-2xl font-bold text-emerald-400">147</div>
          <div className="text-[10px] text-slate-500">últimos 30 días</div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">ROI promedio</div>
          <div className="mt-1 font-mono text-2xl font-bold text-violet-400">4.2x</div>
          <div className="text-[10px] text-slate-500">últimos 90 días</div>
        </div>
      </div>

      <div className="space-y-3">
        {RECOMMENDATIONS.map((r, i) => {
          const accent = ACCENT_COLORS[r.accent];
          const priority = PRIORITY_CONFIG[r.priority];
          return (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl border ${accent.borderSoft} bg-white/[0.025] p-4 backdrop-blur-xl transition-colors hover:bg-white/[0.04]`}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start">
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className={`rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${priority.bg} ${priority.text} ${priority.border}`}>
                      {priority.label}
                    </span>
                    <span className={`text-[10px] font-mono uppercase tracking-wider ${accent.text}`}>{r.agentName}</span>
                    <span className="text-[10px] text-slate-500">· {r.category}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white">{r.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">{r.rationale}</p>
                  <div className="mt-2 flex items-center gap-2 rounded-md border border-emerald-500/15 bg-emerald-500/[0.04] px-2.5 py-1.5">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400">Impacto esperado</span>
                    <span className="text-xs text-emerald-50">{r.expectedImpact}</span>
                  </div>
                </div>
                <div className="flex shrink-0 flex-row items-center gap-2 md:flex-col md:items-end">
                  <div className={`rounded-md border px-2 py-1 font-mono text-[10px] ${effortColors[r.effort]}`}>
                    Esfuerzo {r.effort}
                  </div>
                  <div className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1 font-mono text-[10px] text-slate-400">
                    {r.timeframe}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 border-t border-white/[0.05] pt-3">
                <button className="flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Aprobar
                </button>
                <button className="rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] text-slate-400 transition-colors hover:text-white">
                  Postergar
                </button>
                <button className="rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] text-slate-400 transition-colors hover:text-white">
                  Ver análisis
                </button>
                <div className="ml-auto flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                  <StatusDot color="amber" pulse={false} />
                  Pendiente
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
