"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

// ============= Animated Counter =============
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1800, bounce: 0 });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  const display = useTransform(spring, (latest) => {
    return prefix + latest.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
  });

  return <motion.span ref={ref} className={className}>{display}</motion.span>;
}

// ============= Sparkline =============
export function Sparkline({
  data,
  color = "#10b981",
  width = 120,
  height = 36,
  fillOpacity = 0.18,
}: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  fillOpacity?: number;
}) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const points = data.map((d, i) => ({
    x: i * step,
    y: height - ((d - min) / range) * (height - 4) - 2,
  }));

  const pathD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x},${p.y}`;
    const prev = points[i - 1];
    const cx = (prev.x + p.x) / 2;
    return acc + ` Q ${cx},${prev.y} ${cx},${(prev.y + p.y) / 2} T ${p.x},${p.y}`;
  }, "");

  const fillD = `${pathD} L ${width},${height} L 0,${height} Z`;
  const gradientId = `spark-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={fillOpacity} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <motion.path
        d={fillD}
        fill={`url(#${gradientId})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
      <motion.circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r={2.5}
        fill={color}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 1.2 }}
      />
    </svg>
  );
}

// ============= Animated Value (string based) =============
export function AnimatedValue({ value, className = "" }: { value: string; className?: string }) {
  return <motion.span
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className={className}
  >{value}</motion.span>;
}

// ============= Glow Card =============
export function GlowCard({
  children,
  className = "",
  accent = "emerald",
  glowOnHover = true,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: "emerald" | "cyan" | "violet" | "amber" | "red" | "gold" | "none";
  glowOnHover?: boolean;
}) {
  const glowMap: Record<string, string> = {
    emerald: "hover:border-emerald-500/40 hover:shadow-[0_0_28px_-6px_rgba(16,185,129,0.35)]",
    cyan: "hover:border-cyan-500/40 hover:shadow-[0_0_28px_-6px_rgba(34,211,238,0.35)]",
    violet: "hover:border-violet-500/40 hover:shadow-[0_0_28px_-6px_rgba(139,92,246,0.35)]",
    amber: "hover:border-amber-500/40 hover:shadow-[0_0_28px_-6px_rgba(251,191,36,0.35)]",
    red: "hover:border-rose-500/40 hover:shadow-[0_0_28px_-6px_rgba(244,63,94,0.35)]",
    gold: "hover:border-yellow-400/40 hover:shadow-[0_0_28px_-6px_rgba(250,204,21,0.35)]",
    none: "",
  };
  return (
    <div
      className={`relative rounded-xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl transition-all duration-300 ${
        glowOnHover ? glowMap[accent] : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ============= Live Status Dot =============
export function StatusDot({ color = "emerald", pulse = true }: { color?: string; pulse?: boolean }) {
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-400",
    cyan: "bg-cyan-400",
    violet: "bg-violet-400",
    amber: "bg-amber-400",
    red: "bg-rose-400",
    gold: "bg-yellow-300",
  };
  return (
    <span className="relative inline-flex h-2 w-2">
      {pulse && (
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${colorMap[color]}`}
          style={{ animationDuration: "2.5s" }}
        />
      )}
      <span className={`relative inline-flex h-2 w-2 rounded-full ${colorMap[color]}`} />
    </span>
  );
}

// ============= Section Title =============
export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  accent = "emerald",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  accent?: "emerald" | "cyan" | "violet" | "amber" | "red" | "gold";
}) {
  const colorMap: Record<string, string> = {
    emerald: "text-emerald-400",
    cyan: "text-cyan-400",
    violet: "text-violet-400",
    amber: "text-amber-400",
    red: "text-rose-400",
    gold: "text-yellow-300",
  };
  return (
    <div className="flex flex-col gap-1">
      {eyebrow && (
        <div className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] ${colorMap[accent]}`}>
          <span className="h-px w-6 bg-current opacity-50" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">{title}</h2>
      {subtitle && <p className="max-w-2xl text-sm text-slate-400">{subtitle}</p>}
    </div>
  );
}
