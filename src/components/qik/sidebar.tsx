"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Bot,
  Radar,
  Megaphone,
  Crown,
  ShieldAlert,
  Lightbulb,
  Bell,
  Sparkles,
  Briefcase,
  Activity,
  ChevronRight,
  Menu,
  X,
  Download,
  PiggyBank,
} from "lucide-react";
import { useState } from "react";
import { StatusDot } from "./shared";
import { ThemeToggle } from "./theme-toggle";

export type NavSection =
  | "command"
  | "agents"
  | "competitors"
  | "marketing"
  | "loyalty"
  | "risk"
  | "innovation"
  | "alerts"
  | "recommendations"
  | "executive"
  | "savings";

interface NavItem {
  id: NavSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
  group: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "command", label: "Command Center", icon: LayoutDashboard, group: "Principal" },
  { id: "executive", label: "Briefing Ejecutivo", icon: Briefcase, badge: "06:00", badgeColor: "emerald", group: "Principal" },
  { id: "agents", label: "Agentes IA", icon: Bot, badge: "20", badgeColor: "cyan", group: "Inteligencia" },
  { id: "alerts", label: "Centro de Alertas", icon: Bell, badge: "8", badgeColor: "red", group: "Inteligencia" },
  { id: "recommendations", label: "Recomendaciones", icon: Sparkles, badge: "8", badgeColor: "amber", group: "Inteligencia" },
  { id: "savings", label: "Centro de Ahorro", icon: PiggyBank, badge: "ROI", badgeColor: "emerald", group: "Inteligencia" },
  { id: "competitors", label: "Competencia", icon: Radar, group: "Paneles" },
  { id: "marketing", label: "Marketing", icon: Megaphone, group: "Paneles" },
  { id: "loyalty", label: "Fidelización", icon: Crown, group: "Paneles" },
  { id: "risk", label: "Riesgo & Cobros", icon: ShieldAlert, group: "Paneles" },
  { id: "innovation", label: "Innovación", icon: Lightbulb, group: "Paneles" },
];

const badgeColorMap: Record<string, string> = {
  emerald: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  cyan: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  red: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  amber: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

export function Sidebar({ active, onChange }: { active: NavSection; onChange: (s: NavSection) => void }) {
  // Precompute which items should show a group header (first of their group)
  const itemsWithGroupFlag = NAV_ITEMS.map((item, idx) => ({
    ...item,
    showGroupHeader: idx === 0 || NAV_ITEMS[idx - 1].group !== item.group,
  }));

  return (
    <aside className="flex h-full w-[244px] flex-col border-r border-border bg-sidebar/80 backdrop-blur-2xl">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-5">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 via-cyan-400 to-violet-500">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-400 to-violet-500 blur-md opacity-50" />
          <span className="relative font-mono text-sm font-bold text-black">Q</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-emerald-400">Qik</span>
          <span className="text-[13px] font-semibold tracking-tight text-foreground">AI Command Center</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
        {itemsWithGroupFlag.map((item) => {
          const isActive = active === item.id;
          const Icon = item.icon;
          return (
            <div key={item.id}>
              {item.showGroupHeader && (
                <div className="mb-1.5 mt-4 px-3 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground first:mt-0">
                  {item.group}
                </div>
              )}
              <button
                onClick={() => onChange(item.id)}
                className={`group relative mb-0.5 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-emerald-400 to-cyan-400"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <Icon className={`h-4 w-4 ${isActive ? "text-emerald-400" : ""}`} />
                <span className="flex-1 text-left font-medium">{item.label}</span>
                {item.badge && (
                  <span
                    className={`rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
                      badgeColorMap[item.badgeColor || "emerald"]
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
              </button>
            </div>
          );
        })}
      </nav>

      {/* Live status footer */}
      <div className="border-t border-border px-4 py-4">
        <div className="mb-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <StatusDot color="emerald" />
            System Online
          </span>
          <span className="text-muted-foreground">v3.2.1</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-md bg-sidebar-accent/60 py-1.5">
            <div className="font-mono text-xs font-semibold text-emerald-400">20</div>
            <div className="text-[9px] uppercase tracking-wide text-muted-foreground">Agentes</div>
          </div>
          <div className="rounded-md bg-sidebar-accent/60 py-1.5">
            <div className="font-mono text-xs font-semibold text-cyan-400">24/7</div>
            <div className="text-[9px] uppercase tracking-wide text-muted-foreground">Live</div>
          </div>
          <div className="rounded-md bg-sidebar-accent/60 py-1.5">
            <div className="font-mono text-xs font-semibold text-violet-400">847</div>
            <div className="text-[9px] uppercase tracking-wide text-muted-foreground">Insights</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ============= Topbar =============
export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b border-border bg-background/70 px-6 backdrop-blur-2xl">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Sistema</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium text-foreground">QIK AI Command Center</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Market indicators */}
        <div className="hidden items-center gap-3 lg:flex">
          <MarketChip label="TPM BCRD" value="5.25%" trend="flat" color="cyan" />
          <MarketChip label="Inflación RD" value="3.1%" trend="down" color="emerald" />
          <MarketChip label="USD/DOP" value="58.42" trend="up" color="amber" />
        </div>

        <div className="h-6 w-px bg-border" />

        {/* Live clock */}
        <LiveClock />

        {/* Download proposal PDF */}
        <a
          href="/qik-ai-command-center-propuesta.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-2 text-[11px] font-medium text-emerald-500 transition-colors hover:bg-emerald-500/20 md:flex"
          title="Descargar propuesta ejecutiva (PDF)"
        >
          <Download className="h-3.5 w-3.5" />
          Propuesta PDF
        </a>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <button className="relative rounded-lg border border-border bg-card p-2 text-muted-foreground transition-colors hover:text-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
            8
          </span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2.5 rounded-lg border border-border bg-card py-1 pl-1 pr-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-emerald-400 to-cyan-500 text-xs font-bold text-black">
            EA
          </div>
          <div className="hidden flex-col md:flex">
            <span className="text-[11px] font-medium leading-tight text-foreground">Executive Access</span>
            <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">Qik · CEO</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function MarketChip({
  label,
  value,
  trend,
  color,
}: {
  label: string;
  value: string;
  trend: "up" | "down" | "flat";
  color: string;
}) {
  const trendIcon = trend === "up" ? "▲" : trend === "down" ? "▼" : "■";
  const colorMap: Record<string, string> = {
    emerald: "text-emerald-400",
    cyan: "text-cyan-400",
    amber: "text-amber-400",
  };
  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1">
      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className={`font-mono text-xs font-semibold ${colorMap[color]}`}>{value}</span>
      <span className={`text-[9px] ${colorMap[color]}`}>{trendIcon}</span>
    </div>
  );
}

function LiveClock() {
  return (
    <div className="hidden items-center gap-2 font-mono text-xs sm:flex">
      <Activity className="h-3.5 w-3.5 text-emerald-400" />
      <span className="text-muted-foreground" id="qik-live-clock">
        {new Date().toLocaleTimeString("es-DO", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
      </span>
      <span className="text-muted-foreground/60">·</span>
      <span className="text-muted-foreground hidden xl:inline">Santo Domingo</span>
    </div>
  );
}
