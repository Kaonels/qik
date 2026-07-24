"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  baseColor: string;
  size: number;
}

interface Pulse {
  angle: number; // source angle around sphere
  radius: number; // current radius from center
  color: string;
  life: number;
  maxLife: number;
}

const COLORS = ["#10b981", "#22d3ee", "#8b5cf6", "#fbbf24"];

export function HolographicSphere({ height = 380 }: { height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let width = container.clientWidth;
    let h = height;
    const setSize = () => {
      dpr = window.devicePixelRatio || 1;
      width = container.clientWidth;
      h = height;
      canvas.width = width * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    const cx = () => width / 2;
    const cy = () => h / 2;
    const R = () => Math.min(width, h) * 0.32;

    // Build sphere of particles using fibonacci sphere distribution
    const N = 380;
    const particles: Particle[] = [];
    for (let i = 0; i < N; i++) {
      const k = i + 0.5;
      const phi = Math.acos(1 - (2 * k) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * k;
      const r = 1;
      particles.push({
        x: r * Math.cos(theta) * Math.sin(phi),
        y: r * Math.sin(theta) * Math.sin(phi),
        z: r * Math.cos(phi),
        baseColor: COLORS[i % COLORS.length],
        size: 0.8 + Math.random() * 1.0,
      });
    }

    const pulses: Pulse[] = [];
    let pulseTimer = 0;

    let rotation = 0;
    let frame = 0;
    let raf = 0;

    const render = () => {
      frame++;
      rotation += 0.0035;

      ctx.clearRect(0, 0, width, h);

      // Radial background glow
      const bgGrad = ctx.createRadialGradient(cx(), cy(), 0, cx(), cy(), R() * 1.8);
      bgGrad.addColorStop(0, "rgba(16,185,129,0.08)");
      bgGrad.addColorStop(0.4, "rgba(34,211,238,0.05)");
      bgGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, h);

      // Outer rotating ring
      ctx.save();
      ctx.translate(cx(), cy());
      ctx.rotate(rotation * 1.5);
      ctx.strokeStyle = "rgba(34,211,238,0.18)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(0, 0, R() * 1.25, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Inner counter-rotating ring
      ctx.save();
      ctx.translate(cx(), cy());
      ctx.rotate(-rotation * 2.2);
      ctx.strokeStyle = "rgba(139,92,246,0.22)";
      ctx.lineWidth = 0.8;
      ctx.setLineDash([2, 8]);
      ctx.beginPath();
      ctx.arc(0, 0, R() * 1.12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Equator ellipse
      ctx.save();
      ctx.translate(cx(), cy());
      ctx.strokeStyle = "rgba(16,185,129,0.15)";
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.ellipse(0, 0, R(), R() * 0.18, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Sort particles by z for painter's algorithm
      const rotated = particles.map((p) => {
        // Rotate around Y axis
        const cosY = Math.cos(rotation);
        const sinY = Math.sin(rotation);
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        // Rotate around X axis slightly
        const cosX = Math.cos(rotation * 0.4);
        const sinX = Math.sin(rotation * 0.4);
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        return { ...p, x: x1, y: y1, z: z2 };
      });
      rotated.sort((a, b) => a.z - b.z);

      // Draw particles
      for (const p of rotated) {
        const sx = cx() + p.x * R();
        const sy = cy() + p.y * R();
        const depth = (p.z + 1) / 2; // 0 to 1
        const alpha = 0.25 + depth * 0.75;
        const size = p.size * (0.6 + depth * 0.8);

        // Glow for front particles
        if (depth > 0.65) {
          ctx.beginPath();
          ctx.arc(sx, sy, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = p.baseColor + "22";
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        // Hex to rgba
        const r = parseInt(p.baseColor.slice(1, 3), 16);
        const g = parseInt(p.baseColor.slice(3, 5), 16);
        const b = parseInt(p.baseColor.slice(5, 7), 16);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      }

      // Spawn pulses periodically (incoming agent data)
      pulseTimer++;
      if (pulseTimer > 22) {
        pulseTimer = 0;
        pulses.push({
          angle: Math.random() * Math.PI * 2,
          radius: R() * 2.0,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          life: 0,
          maxLife: 60 + Math.random() * 20,
        });
      }

      // Update + draw pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.life++;
        const t = pulse.life / pulse.maxLife;
        if (t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        // Move from outer toward sphere center
        pulse.radius = R() * 2.0 * (1 - t) + R() * 0.3;
        const px = cx() + Math.cos(pulse.angle) * pulse.radius;
        const py = cy() + Math.sin(pulse.angle) * pulse.radius;

        // Trail
        const trailLen = 30;
        for (let k = 0; k < trailLen; k++) {
          const tt = Math.max(0, t - k * 0.012);
          const tr = R() * 2.0 * (1 - tt) + R() * 0.3;
          const tx = cx() + Math.cos(pulse.angle) * tr;
          const ty = cy() + Math.sin(pulse.angle) * tr;
          const a = (1 - k / trailLen) * (1 - t) * 0.6;
          const r = parseInt(pulse.color.slice(1, 3), 16);
          const g = parseInt(pulse.color.slice(3, 5), 16);
          const b = parseInt(pulse.color.slice(5, 7), 16);
          ctx.beginPath();
          ctx.arc(tx, ty, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
          ctx.fill();
        }

        // Impact ring when reaching center
        if (t > 0.85) {
          const ringT = (t - 0.85) / 0.15;
          const rr = ringT * R() * 0.4;
          const r = parseInt(pulse.color.slice(1, 3), 16);
          const g = parseInt(pulse.color.slice(3, 5), 16);
          const b = parseInt(pulse.color.slice(5, 7), 16);
          ctx.beginPath();
          ctx.arc(cx(), cy(), rr, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - ringT) * 0.6})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      // Center core glow
      const coreGrad = ctx.createRadialGradient(cx(), cy(), 0, cx(), cy(), R() * 0.5);
      coreGrad.addColorStop(0, "rgba(16,185,129,0.45)");
      coreGrad.addColorStop(0.4, "rgba(34,211,238,0.15)");
      coreGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, width, h);

      // Center pulse
      const beatPulse = (Math.sin(frame * 0.04) + 1) / 2;
      ctx.beginPath();
      ctx.arc(cx(), cy(), 3 + beatPulse * 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(16,185,129,${0.6 + beatPulse * 0.4})`;
      ctx.fill();

      raf = requestAnimationFrame(render);
    };
    render();

    const onResize = () => setSize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [height]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height }}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* HUD overlays */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400">Centro de Inteligencia</div>
            <div className="mt-1 text-lg font-semibold text-white">Qik Neural Core</div>
            <div className="text-[11px] text-slate-400">20 agentes · síntesis en tiempo real</div>
          </div>
          <div className="flex flex-col items-end gap-1 text-right">
            <div className="font-mono text-[10px] uppercase tracking-wider text-cyan-400">Throughput</div>
            <div className="font-mono text-sm font-semibold text-white">847 insights/h</div>
            <div className="font-mono text-[10px] text-slate-500">▲ +12% vs ayer</div>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-violet-400">Síntesis activa</div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs text-slate-300">Generando briefing ejecutivo…</span>
            </div>
          </div>
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <div key={c} className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
