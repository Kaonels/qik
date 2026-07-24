import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

// ============================================================
// QIK AI — Per-Agent Live Insight Generator
// Generates a fresh, LLM-synthesized insight for a specific agent
// based on public Dominican Republic banking context.
// ============================================================

const AGENT_CONTEXTS: Record<string, { role: string; focus: string }> = {
  "competitor-intel": {
    role: "Analizas continuamente bancos y fintechs de República Dominicana (Banreservas, BHD, Popular, APAP, Scotiabank) y referentes internacionales (Nubank, Revolut, Wise, Monzo, Mercado Pago) detectando movimientos estratégicos públicos.",
    focus: "un movimiento competitivo reciente y una oportunidad concreta de diferenciación para Qik",
  },
  "viral-content": {
    role: "Detectas tendencias virales en TikTok, Instagram, Threads, YouTube Shorts y Facebook y las traduces en contenido educativo y viral para Qik.",
    focus: "una tendencia viral actual adaptable a Qik con hook, formato y CTA específicos",
  },
  "deposit-growth": {
    role: "Diseñas estrategias que incentivan depósitos y mantienen saldos en Cuenta Qik y Certificados Qik vía retos, metas, recompensas y campañas estacionales.",
    focus: "una mecánica de ahorro concreta para Qik con impacto estimado en depósitos",
  },
  "risk-prevention": {
    role: "Predices clientes con riesgo de mora antes de que ocurra y sugieres intervenciones preventivas responsables.",
    focus: "una señal temprana de riesgo y una intervención preventiva de baja fricción",
  },
  "feature-suggestion": {
    role: "Analizas neobancos como Revolut, Nubank, Wise, Monzo y Mercado Pago para detectar features que Qik podría adaptar.",
    focus: "una feature innovadora de un neobanco referente que Qik podría adaptar, con estimación de impacto",
  },
  "banking-innovation": {
    role: "Generas cada día nuevas ideas para productos, servicios y experiencias bancarias para Qik, sin repetir ideas.",
    focus: "una idea nueva de producto o servicio para Qik basada en una necesidad del mercado dominicano",
  },
  "executive-advisor": {
    role: "Entregas cada mañana al CEO un briefing con riesgos, oportunidades, ideas e indicadores clave.",
    focus: "la prioridad #1 que el CEO de Qik debería decidir hoy y por qué",
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const agentId: string = body.agentId || "executive-advisor";
    const ctx = AGENT_CONTEXTS[agentId] || AGENT_CONTEXTS["executive-advisor"];

    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Eres un agente IA del QIK AI COMMAND CENTER para Qik (primer neobanco de República Dominicana, filial del Grupo Popular). ${ctx.role}

Contexto real (público):
- Productos Qik: Cuenta Qik (3-6% rendimiento, sin comisiones, sin saldo mínimo), Tarjeta Qik (cashback), Certificados Qik, Qik Pro, Crea Crédito (historial), "Toque" (P2P con celular)
- Competidores RD: Banreservas (Yappy), BHD (Cuenta Móvil), Popular (matriz de Qik), APAP, Scotiabank
- Macro: BCRD TPM 5.25%, inflación ~3.1%
- Reglas: solo info pública, no incumplir regulaciones, priorizar experiencia del cliente y crecimiento sostenible.

Responde SOLO en JSON válido.`,
        },
        {
          role: "user",
          content: `Genera ${ctx.focus}. Responde en JSON con esta estructura exacta:

{
  "titulo": "string conciso y específico",
  "categoria": "string",
  "prioridad": "critical" | "high" | "medium" | "low",
  "insight": "2-3 oraciones explicando el hallazgo y por qué importa",
  "accion_recomendada": "acción concreta y específica para Qik con timeframe",
  "impacto_esperado": "cuantificación del impacto (ej: +RD$340M, +12%, etc)",
  "confianza": "número 0-100",
  "kpis_relacionados": ["kpi1", "kpi2"]
}

Sé específico al contexto dominicano. Evita generalidades. No repitas ideas obvias.`,
        },
      ],
      thinking: { type: "disabled" },
    });

    const content = completion.choices[0]?.message?.content || "";
    let jsonStr = content.trim();
    const fenceMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) jsonStr = fenceMatch[1].trim();
    const firstBrace = jsonStr.indexOf("{");
    const lastBrace = jsonStr.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      jsonStr = jsonStr.slice(firstBrace, lastBrace + 1);
    }

    const parsed = JSON.parse(jsonStr);

    return NextResponse.json({
      success: true,
      agentId,
      insight: parsed,
      generatedAt: new Date().toISOString(),
      source: "Qik AI Agent · LLM live synthesis",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "QIK AI — Per-Agent Live Insight Generator",
    method: "POST",
    body: { agentId: "string (optional, default: executive-advisor)" },
    availableAgents: Object.keys(AGENT_CONTEXTS),
  });
}
