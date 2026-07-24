"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, AlertTriangle, Zap, Target, Lightbulb, BarChart3, Briefcase, Clock, RefreshCw } from "lucide-react";

interface LiveBriefing {
  fecha: string;
  titular: string;
  riesgos: { titulo: string; severidad: string; agente: string; detalle: string; accion: string }[];
  oportunidades: { titulo: string; magnitud: string; agente: string; detalle: string; accion: string }[];
  ideas: { titulo: string; agente: string; ice: number; detalle: string }[];
  kpis: { nombre: string; valor: string; delta: string; tendencia: string }[];
  decisiones: { titulo: string; responsable: string; deadline: string }[];
}

const severityConfig: Record<string, { label: string; bg: string; text: string; border: string }> = {
  critical: { label: "CRÍTICO", bg: "bg-rose-500/15", text: "text-rose-400", border: "border-rose-500/40" },
  high: { label: "ALTA", bg: "bg-amber-500/15", text: "text-amber-400", border: "border-amber-500/40" },
  medium: { label: "MEDIA", bg: "bg-cyan-500/15", text: "text-cyan-400", border: "border-cyan-500/40" },
};

export function LiveBriefingGenerator() {
  const [briefing, setBriefing] = useState<LiveBriefing | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/briefing", { method: "POST" });
      const data = await res.json();
      if (data.success && data.briefing) {
        setBriefing(data.briefing);
        setGeneratedAt(data.generatedAt);
      } else {
        setError(data.error || "No se pudo generar el briefing");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.06] to-transparent p-5 backdrop-blur-xl">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-emerald-400">
            <Sparkles className="h-3 w-3" />
            Executive Advisor AI · Live Synthesis
          </div>
          <h3 className="text-base font-semibold text-white">Briefing ejecutivo generado en vivo por LLM</h3>
          <p className="mt-0.5 text-xs text-slate-400">
            Síntesis fresca de los 19 agentes en un briefing de 5 min para el CEO. Basado en contexto público del mercado dominicano.
          </p>
        </div>
        <button
          onClick={generate}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3 py-2 text-xs font-medium text-emerald-300 transition-colors hover:bg-emerald-500/25 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : briefing ? <RefreshCw className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
          {loading ? "Generando…" : briefing ? "Regenerar briefing" : "Generar briefing en vivo"}
        </button>
      </div>

      {error && (
        <div className="mb-3 flex items-start gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
          <div>
            <div className="text-xs font-medium text-rose-300">No se pudo generar el briefing en vivo</div>
            <div className="text-[11px] text-rose-200/80">{error}</div>
            <div className="mt-1 text-[10px] text-rose-200/60">El briefing estático del panel sigue disponible arriba.</div>
          </div>
        </div>
      )}

      {generatedAt && briefing && (
        <div className="mb-3 flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-slate-500">
          <Clock className="h-3 w-3" />
          Generado: {new Date(generatedAt).toLocaleString("es-DO")}
        </div>
      )}

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 animate-pulse rounded-lg bg-white/[0.04]" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {briefing && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Titular */}
            <div className="rounded-lg border border-emerald-500/20 bg-black/30 p-3">
              <div className="text-[9px] font-mono uppercase tracking-wider text-slate-500">{briefing.fecha}</div>
              <div className="mt-1 text-sm font-medium text-emerald-50">{briefing.titular}</div>
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {/* Riesgos */}
              <div className="rounded-lg border border-rose-500/15 bg-rose-500/[0.03] p-3">
                <div className="mb-2 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-rose-400">
                  <AlertTriangle className="h-3 w-3" /> Riesgos
                </div>
                <div className="space-y-2">
                  {briefing.riesgos?.map((r, i) => {
                    const cfg = severityConfig[r.severidad] || severityConfig.medium;
                    return (
                      <div key={i} className="rounded-md border border-white/[0.05] bg-black/30 p-2">
                        <div className="mb-1 flex items-center gap-1.5">
                          <span className={`rounded border px-1 py-0.5 font-mono text-[8px] uppercase ${cfg.bg} ${cfg.text} ${cfg.border}`}>{cfg.label}</span>
                          <span className="text-[9px] text-slate-500">{r.agente}</span>
                        </div>
                        <div className="text-xs font-medium text-white">{r.titulo}</div>
                        <p className="mt-0.5 text-[10px] text-slate-400">{r.detalle}</p>
                        <div className="mt-1 flex items-start gap-1 text-[10px] text-emerald-200">
                          <Zap className="mt-0.5 h-2.5 w-2.5 shrink-0 text-emerald-400" />{r.accion}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Oportunidades */}
              <div className="rounded-lg border border-emerald-500/15 bg-emerald-500/[0.03] p-3">
                <div className="mb-2 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                  <Target className="h-3 w-3" /> Oportunidades
                </div>
                <div className="space-y-2">
                  {briefing.oportunidades?.map((o, i) => (
                    <div key={i} className="rounded-md border border-white/[0.05] bg-black/30 p-2">
                      <div className="mb-1 flex items-center gap-1.5">
                        <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-1 py-0.5 font-mono text-[8px] uppercase text-emerald-400">{o.magnitud}</span>
                        <span className="text-[9px] text-slate-500">{o.agente}</span>
                      </div>
                      <div className="text-xs font-medium text-white">{o.titulo}</div>
                      <p className="mt-0.5 text-[10px] text-slate-400">{o.detalle}</p>
                      <div className="mt-1 flex items-start gap-1 text-[10px] text-emerald-200">
                        <Zap className="mt-0.5 h-2.5 w-2.5 shrink-0 text-emerald-400" />{o.accion}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Ideas + KPIs + Decisiones */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
              <div className="rounded-lg border border-violet-500/15 bg-violet-500/[0.03] p-3">
                <div className="mb-2 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-violet-400">
                  <Lightbulb className="h-3 w-3" /> Ideas
                </div>
                <div className="space-y-1.5">
                  {briefing.ideas?.map((idea, i) => (
                    <div key={i} className="rounded-md border border-white/[0.05] bg-black/30 p-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] text-slate-500">{idea.agente}</span>
                        <span className="rounded border border-violet-500/30 bg-violet-500/10 px-1 py-0.5 font-mono text-[8px] text-violet-400">ICE {idea.ice}</span>
                      </div>
                      <div className="mt-0.5 text-[11px] font-medium text-white">{idea.titulo}</div>
                      <div className="text-[10px] text-slate-400">{idea.detalle}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-cyan-500/15 bg-cyan-500/[0.03] p-3">
                <div className="mb-2 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                  <BarChart3 className="h-3 w-3" /> KPIs
                </div>
                <div className="space-y-1.5">
                  {briefing.kpis?.map((k, i) => (
                    <div key={i} className="flex items-center justify-between rounded-md border border-white/[0.05] bg-black/30 p-2">
                      <span className="text-[10px] text-slate-400">{k.nombre}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-white">{k.valor}</span>
                        <span className={`font-mono text-[9px] ${k.tendencia === "up" ? "text-emerald-400" : k.tendencia === "down" ? "text-rose-400" : "text-slate-500"}`}>
                          {k.tendencia === "up" ? "▲" : k.tendencia === "down" ? "▼" : "■"} {k.delta}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-amber-500/15 bg-amber-500/[0.03] p-3">
                <div className="mb-2 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-amber-400">
                  <Briefcase className="h-3 w-3" /> Decisiones hoy
                </div>
                <div className="space-y-1.5">
                  {briefing.decisiones?.map((d, i) => (
                    <div key={i} className="rounded-md border border-white/[0.05] bg-black/30 p-2">
                      <div className="text-[11px] font-medium text-white">{d.titulo}</div>
                      <div className="mt-0.5 flex items-center justify-between text-[9px] text-slate-500">
                        <span>{d.responsable}</span>
                        <span className="font-mono text-amber-400">{d.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!briefing && !loading && !error && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-white/[0.08] bg-black/20 p-8 text-center">
          <Sparkles className="mb-2 h-6 w-6 text-emerald-400/60" />
          <div className="text-sm text-slate-400">Genera un briefing fresco con un click</div>
          <div className="mt-1 text-[11px] text-slate-500">
            El LLM sintetizará riesgos, oportunidades, ideas y decisiones para el CEO de Qik.
          </div>
        </div>
      )}
    </div>
  );
}
