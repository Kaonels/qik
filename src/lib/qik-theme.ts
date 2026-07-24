// ============================================================
// QIK — Accent color system + helper utilities
// ============================================================
import type { Accent, Priority, AgentStatus } from "@/lib/qik-data";

export const ACCENT_COLORS: Record<
  Accent,
  {
    text: string;
    bg: string;
    bgSoft: string;
    border: string;
    borderSoft: string;
    glow: string;
    ring: string;
    from: string;
    to: string;
    dot: string;
    raw: string;
  }
> = {
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/15",
    bgSoft: "bg-emerald-500/[0.06]",
    border: "border-emerald-500/30",
    borderSoft: "border-emerald-500/15",
    glow: "shadow-[0_0_24px_-4px_rgba(16,185,129,0.45)]",
    ring: "ring-emerald-500/40",
    from: "from-emerald-500/20",
    to: "to-emerald-400/5",
    dot: "bg-emerald-400",
    raw: "#10b981",
  },
  cyan: {
    text: "text-cyan-400",
    bg: "bg-cyan-500/15",
    bgSoft: "bg-cyan-500/[0.06]",
    border: "border-cyan-500/30",
    borderSoft: "border-cyan-500/15",
    glow: "shadow-[0_0_24px_-4px_rgba(34,211,238,0.45)]",
    ring: "ring-cyan-500/40",
    from: "from-cyan-500/20",
    to: "to-cyan-400/5",
    dot: "bg-cyan-400",
    raw: "#22d3ee",
  },
  violet: {
    text: "text-violet-400",
    bg: "bg-violet-500/15",
    bgSoft: "bg-violet-500/[0.06]",
    border: "border-violet-500/30",
    borderSoft: "border-violet-500/15",
    glow: "shadow-[0_0_24px_-4px_rgba(139,92,246,0.45)]",
    ring: "ring-violet-500/40",
    from: "from-violet-500/20",
    to: "to-violet-400/5",
    dot: "bg-violet-400",
    raw: "#8b5cf6",
  },
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-500/15",
    bgSoft: "bg-amber-500/[0.06]",
    border: "border-amber-500/30",
    borderSoft: "border-amber-500/15",
    glow: "shadow-[0_0_24px_-4px_rgba(251,191,36,0.45)]",
    ring: "ring-amber-500/40",
    from: "from-amber-500/20",
    to: "to-amber-400/5",
    dot: "bg-amber-400",
    raw: "#fbbf24",
  },
  red: {
    text: "text-rose-400",
    bg: "bg-rose-500/15",
    bgSoft: "bg-rose-500/[0.06]",
    border: "border-rose-500/30",
    borderSoft: "border-rose-500/15",
    glow: "shadow-[0_0_24px_-4px_rgba(244,63,94,0.45)]",
    ring: "ring-rose-500/40",
    from: "from-rose-500/20",
    to: "to-rose-400/5",
    dot: "bg-rose-400",
    raw: "#f43f5e",
  },
  gold: {
    text: "text-yellow-300",
    bg: "bg-yellow-400/15",
    bgSoft: "bg-yellow-400/[0.06]",
    border: "border-yellow-400/30",
    borderSoft: "border-yellow-400/15",
    glow: "shadow-[0_0_24px_-4px_rgba(250,204,21,0.45)]",
    ring: "ring-yellow-400/40",
    from: "from-yellow-400/20",
    to: "to-yellow-300/5",
    dot: "bg-yellow-300",
    raw: "#facc15",
  },
};

export const PRIORITY_CONFIG: Record<
  Priority,
  { label: string; accent: Accent; bg: string; text: string; border: string }
> = {
  critical: { label: "CRÍTICO", accent: "red", bg: "bg-rose-500/15", text: "text-rose-400", border: "border-rose-500/40" },
  high: { label: "ALTA", accent: "amber", bg: "bg-amber-500/15", text: "text-amber-400", border: "border-amber-500/40" },
  medium: { label: "MEDIA", accent: "cyan", bg: "bg-cyan-500/15", text: "text-cyan-400", border: "border-cyan-500/40" },
  low: { label: "BAJA", accent: "emerald", bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/40" },
};

export const STATUS_CONFIG: Record<
  AgentStatus,
  { label: string; dot: string; text: string; bg: string }
> = {
  active: { label: "Activo", dot: "bg-emerald-400", text: "text-emerald-400", bg: "bg-emerald-500/10" },
  analyzing: { label: "Analizando", dot: "bg-cyan-400", text: "text-cyan-400", bg: "bg-cyan-500/10" },
  alert: { label: "Alerta", dot: "bg-rose-400", text: "text-rose-400", bg: "bg-rose-500/10" },
  idle: { label: "Inactivo", dot: "bg-slate-500", text: "text-slate-400", bg: "bg-slate-500/10" },
};

export function formatNumber(n: number): string {
  return n.toLocaleString("es-DO");
}
