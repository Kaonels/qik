"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Simplified but recognizable Dominican Republic silhouette path
// (eastern 2/3 of Hispaniola — Punta Cana pointing right, Samaná peninsula north-east)
const RD_PATH = "M 28,140 L 45,128 L 62,118 L 78,108 L 92,98 L 102,84 L 115,72 L 132,64 L 152,60 L 174,58 L 196,60 L 218,66 L 232,72 L 244,68 L 256,62 L 268,66 L 272,80 L 268,94 L 282,102 L 298,108 L 318,116 L 340,124 L 362,134 L 380,146 L 392,160 L 388,176 L 372,188 L 352,196 L 328,202 L 302,208 L 276,214 L 248,218 L 218,220 L 188,220 L 158,216 L 130,210 L 104,202 L 82,192 L 62,180 L 46,166 L 34,154 Z";

// Major cities with approximate relative positions on the SVG viewBox
const CITIES = [
  { id: "sd", name: "Santo Domingo", x: 218, y: 212, weight: 1.0, accent: "#10b981" },
  { id: "stgo", name: "Santiago", x: 132, y: 88, weight: 0.85, accent: "#22d3ee" },
  { id: "lr", name: "La Romana", x: 286, y: 196, weight: 0.55, accent: "#8b5cf6" },
  { id: "pc", name: "Punta Cana", x: 372, y: 162, weight: 0.6, accent: "#fbbf24" },
  { id: "sm", name: "Samaná", x: 256, y: 80, weight: 0.45, accent: "#22d3ee" },
  { id: "pp", name: "Puerto Plata", x: 168, y: 64, weight: 0.5, accent: "#22d3ee" },
  { id: "bch", name: "Barahona", x: 92, y: 192, weight: 0.4, accent: "#fbbf24" },
  { id: "hg", name: "Higüey", x: 332, y: 156, weight: 0.5, accent: "#fbbf24" },
  { id: "moca", name: "Moca", x: 138, y: 100, weight: 0.4, accent: "#8b5cf6" },
  { id: "sc", name: "San Cristóbal", x: 196, y: 210, weight: 0.4, accent: "#10b981" },
];

export function RDMapAnimation() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => setPhase(3), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 420 260" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="rd-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.14" />
          </linearGradient>
          <linearGradient id="rd-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <radialGradient id="city-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <filter id="blur-glow">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {/* Background grid */}
        <g opacity="0.18">
          {Array.from({ length: 21 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="260" stroke="#22d3ee" strokeWidth="0.3" />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 20} x2="420" y2={i * 20} stroke="#22d3ee" strokeWidth="0.3" />
          ))}
        </g>

        {/* DR silhouette — animated draw + fill */}
        <motion.path
          d={RD_PATH}
          fill="url(#rd-fill)"
          stroke="url(#rd-stroke)"
          strokeWidth="1.2"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />

        {/* Inner glow stroke */}
        <motion.path
          d={RD_PATH}
          fill="none"
          stroke="#10b981"
          strokeWidth="0.6"
          strokeOpacity="0.5"
          filter="url(#blur-glow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 1 }}
        />

        {/* Connection lines between cities (network) */}
        {phase >= 2 && (
          <g>
            {[
              ["sd", "stgo"],
              ["sd", "lr"],
              ["sd", "sc"],
              ["sd", "moca"],
              ["stgo", "pp"],
              ["stgo", "moca"],
              ["lr", "pc"],
              ["lr", "hg"],
              ["pc", "hg"],
              ["sm", "stgo"],
              ["sd", "bch"],
              ["pp", "sm"],
            ].map(([a, b], i) => {
              const ca = CITIES.find((c) => c.id === a)!;
              const cb = CITIES.find((c) => c.id === b)!;
              return (
                <motion.line
                  key={i}
                  x1={ca.x}
                  y1={ca.y}
                  x2={cb.x}
                  y2={cb.y}
                  stroke="#22d3ee"
                  strokeWidth="0.4"
                  strokeOpacity="0.4"
                  strokeDasharray="2 2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 0.8, delay: 0.05 * i }}
                />
              );
            })}
          </g>
        )}

        {/* Pulsing data flow along main spine SD -> STGO */}
        {phase >= 3 && (
          <motion.circle
            r="2"
            fill="#10b981"
            initial={{ cx: 218, cy: 212, opacity: 0 }}
            animate={{
              cx: [218, 132],
              cy: [212, 88],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
        {phase >= 3 && (
          <motion.circle
            r="1.8"
            fill="#fbbf24"
            initial={{ cx: 218, cy: 212, opacity: 0 }}
            animate={{
              cx: [218, 372],
              cy: [212, 162],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
        )}
        {phase >= 3 && (
          <motion.circle
            r="1.6"
            fill="#8b5cf6"
            initial={{ cx: 132, cy: 88, opacity: 0 }}
            animate={{
              cx: [132, 256],
              cy: [88, 80],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          />
        )}

        {/* City nodes */}
        {CITIES.map((city, i) => (
          <motion.g
            key={city.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.12, duration: 0.5, ease: "easeOut" }}
            style={{ color: city.accent }}
          >
            {/* Glow ring */}
            <motion.circle
              cx={city.x}
              cy={city.y}
              r={6 * city.weight}
              fill="url(#city-glow)"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Pulsing ring */}
            <motion.circle
              cx={city.x}
              cy={city.y}
              r={3}
              fill="none"
              stroke={city.accent}
              strokeWidth="0.6"
              animate={{ r: [3, 8, 3], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: i * 0.3 }}
            />
            {/* Core */}
            <circle cx={city.x} cy={city.y} r={1.8 * city.weight + 0.8} fill={city.accent} />
            {/* Label */}
            <text
              x={city.x + 5}
              y={city.y - 4}
              fill="#94a3b8"
              fontSize="6"
              fontFamily="monospace"
              className="select-none"
            >
              {city.name}
            </text>
          </motion.g>
        ))}

        {/* Floating scan beam */}
        {phase >= 1 && (
          <motion.line
            x1="0"
            y1="0"
            x2="420"
            y2="0"
            stroke="url(#rd-stroke)"
            strokeWidth="0.8"
            strokeOpacity="0.4"
            initial={{ y1: 0, y2: 0 }}
            animate={{ y1: [0, 260, 0], y2: [0, 260, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </svg>

      {/* Overlay UI */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex items-start justify-between">
          <div className="rounded-md border border-white/[0.08] bg-black/50 px-2.5 py-1.5 backdrop-blur">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400">Geographic Intelligence</div>
            <div className="text-[10px] text-slate-400">República Dominicana · Live Network</div>
          </div>
          <div className="rounded-md border border-white/[0.08] bg-black/50 px-2.5 py-1.5 text-right backdrop-blur">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-400">Cobertura</div>
            <div className="font-mono text-xs font-semibold text-white">10 / 32 provincias</div>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex gap-3">
            <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 backdrop-blur">
              <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400">● Live</span>
            </div>
            <div className="rounded-md border border-white/[0.08] bg-black/50 px-2 py-1 backdrop-blur">
              <span className="font-mono text-[9px] text-slate-400">20 agentes · 24/7</span>
            </div>
          </div>
          <div className="rounded-md border border-white/[0.08] bg-black/50 px-2.5 py-1.5 backdrop-blur">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-violet-400">Sede</div>
            <div className="text-[10px] text-slate-300">Santo Domingo · Qik HQ</div>
          </div>
        </div>
      </div>
    </div>
  );
}
