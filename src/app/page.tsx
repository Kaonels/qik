"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { Sidebar, Topbar, type NavSection } from "@/components/qik/sidebar";
import { CommandCenter } from "@/components/qik/command-center";
import { AgentGrid } from "@/components/qik/agent-grid";
import { AlertsCenter, RecommendationsCenter } from "@/components/qik/alerts-recommendations";
import {
  CompetitorsPanel,
  MarketingPanel,
  LoyaltyPanel,
  RiskPanel,
  InnovationPanel,
  ExecutivePanel,
  SavingsPanel,
} from "@/components/qik/panels";

export default function Home() {
  const [section, setSection] = useState<NavSection>("command");
  const [introDone, setIntroDone] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), 2800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const el = document.getElementById("qik-live-clock");
      if (el) {
        el.textContent = new Date().toLocaleTimeString("es-DO", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleNavChange(s: NavSection) {
    setSection(s);
    setMobileNavOpen(false);
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AnimatePresence>
        {!introDone && <IntroOverlay />}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar active={section} onChange={handleNavChange} />
      </div>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileNavOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="fixed left-0 top-0 z-50 h-full md:hidden"
            >
              <Sidebar active={section} onChange={handleNavChange} />
              <button
                onClick={() => setMobileNavOpen(false)}
                className="absolute -right-12 top-3 rounded-lg border border-white/10 bg-black/60 p-2 text-slate-400 backdrop-blur"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-h-screen flex-1 flex-col">
        {/* Mobile top bar with hamburger */}
        <div className="flex h-12 items-center gap-3 border-b border-border bg-background/70 px-4 backdrop-blur-2xl md:hidden">
          <button
            onClick={() => setMobileNavOpen(true)}
            className="rounded-lg border border-border bg-card p-1.5 text-muted-foreground"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-emerald-400 to-violet-500 font-mono text-[10px] font-bold text-black">
              Q
            </div>
            <span className="text-xs font-semibold text-foreground">QIK AI Command Center</span>
          </div>
        </div>

        <Topbar />
        <main className="flex-1 overflow-x-hidden p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {section === "command" && <CommandCenter />}
              {section === "agents" && (
                <div className="space-y-6">
                  <div className="mb-3 flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-400">
                      <span className="h-px w-6 bg-current opacity-50" />
                      20 Agentes IA · Sistema de Inteligencia
                    </div>
                    <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                      Agentes IA — Operando 24/7
                    </h2>
                    <p className="max-w-2xl text-sm text-slate-400">
                      Cada agente tiene objetivo, datos que analiza, cómo razona, resultados, alertas,
                      recomendaciones, automatizaciones y KPIs. Click en cualquier tarjeta para ver el detalle completo.
                    </p>
                  </div>
                  <AgentGrid />
                </div>
              )}
              {section === "alerts" && <AlertsCenter />}
              {section === "recommendations" && <RecommendationsCenter />}
              {section === "savings" && <SavingsPanel />}
              {section === "competitors" && <CompetitorsPanel />}
              {section === "marketing" && <MarketingPanel />}
              {section === "loyalty" && <LoyaltyPanel />}
              {section === "risk" && <RiskPanel />}
              {section === "innovation" && <InnovationPanel />}
              {section === "executive" && <ExecutivePanel />}
            </motion.div>
          </AnimatePresence>

          <Footer />
        </main>
      </div>
    </div>
  );
}

// ============= Intro Overlay (Animation 1) =============
function IntroOverlay() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06070A]"
    >
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative flex flex-col items-center">
        {/* Animated logo mark */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1.2 }}
          className="relative mb-6 flex h-20 w-20 items-center justify-center"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-violet-500 blur-2xl opacity-60" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-violet-500">
            <span className="font-mono text-3xl font-bold text-black">Q</span>
          </div>
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-emerald-400"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.32em] text-emerald-400">
            Qik · Banco Digital Dominicano
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            AI Command Center
          </h1>
          <div className="mt-1 text-xs text-slate-500">Inicializando 20 agentes de inteligencia…</div>
        </motion.div>

        {/* Boot progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="mt-6 w-72"
        >
          <div className="h-1 overflow-hidden rounded-full bg-white/[0.05]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-500"
            />
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-slate-500">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="text-emerald-400">●</span> Competitor Intelligence online
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              <span className="text-cyan-400">●</span> Neural Core ready
            </motion.span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============= Footer =============
function Footer() {
  return (
    <footer className="mt-10 border-t border-border pt-5">
      <div className="flex flex-col items-start justify-between gap-3 text-[10px] text-muted-foreground md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <span className="font-mono uppercase tracking-wider text-foreground/80">
            QIK AI COMMAND CENTER · v3.3.0
          </span>
          <span className="hidden md:inline">·</span>
          <span className="hidden md:inline">
            Demo ejecutiva basada en información pública · No usa datos internos del banco
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/qik-ai-command-center-propuesta.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono uppercase tracking-wider text-emerald-500 transition-colors hover:bg-emerald-500/20"
          >
            <Download className="h-3 w-3" />
            Descargar propuesta PDF
          </a>
          <span className="hidden items-center gap-1.5 md:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="font-mono uppercase tracking-wider text-emerald-400">Sistema operativo</span>
          </span>
          <span className="hidden text-muted-foreground/60 md:inline">·</span>
          <span className="hidden font-mono md:inline">20 agentes · 847 insights/h · 24/7</span>
        </div>
      </div>
    </footer>
  );
}
