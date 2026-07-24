import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

// ============================================================
// QIK AI — Live Executive Briefing Generator
// Uses LLM to synthesize a fresh morning briefing for Qik executives
// based on public Dominican Republic banking context.
// ============================================================

const SYSTEM_PROMPT = `Eres el Executive Advisor AI del QIK AI COMMAND CENTER, un sistema de inteligencia para Qik, el primer neobanco de la República Dominicana (filial del Grupo Popular / Banco Popular Dominicano).

Tu rol: cada mañana entregas al CEO un briefing ejecutivo con los 3 riesgos más críticos, 3 oportunidades más relevantes y 3 ideas prioritarias del día, basándote en el contexto público del mercado dominicano.

Contexto real (información pública):
- Qik ofrece: Cuenta Qik (pesos/dólares, 3-6% rendimiento anual, sin comisiones, sin saldo mínimo), Tarjeta de Crédito Qik (cashback), Certificados Qik (tasa 1% mayor), Préstamos personales, Qik Pro, Programa Crea Crédito (construir historial), "Toque" (pagos P2P con número celular)
- Competidores RD: Banreservas (líder, app + Yappy P2P), BHD (Cuenta Móvil BHD digital), Banco Popular Dominicano (Cuenta Digital Libre, banco matriz de Qik), APAP, Scotiabank RD, Santa Cruz, Banco Caribe
- Referentes internacionales: Nubank, Revolut, Wise, Monzo, Mercado Pago
- Macro RD: BCRD tasa de política monetaria (TPM) 5.25% anual, inflación ~3.1%, rango meta 4% ±1%
- Regulación: Superintendencia de Bancos RD (sb.gob.do)

Reglas:
1. Solo información pública y buenas prácticas internacionales. No inventes datos internos.
2. No propongas nada que incumpla regulaciones financieras ni incentive crédito irresponsable.
3. Prioriza experiencia del cliente, eficiencia operativa y crecimiento sostenible.
4. Tono: ejecutivo, conciso, accionable. Como un comité de inversión hablando al CEO.
5. Responde EXCLUSIVAMENTE en JSON válido con la estructura indicada.`;

const USER_PROMPT = `Genera el briefing ejecutivo de HOY para el CEO de Qik. Estructura JSON exacta:

{
  "fecha": "string con fecha legible",
  "titular": "string de una línea con el resumen del día (máx 140 caracteres)",
  "riesgos": [
    {
      "titulo": "string conciso",
      "severidad": "critical" | "high" | "medium",
      "agente": "nombre del agente IA que lo detecta",
      "detalle": "1-2 oraciones explicando causa",
      "accion": "acción concreta recomendada con timeframe"
    }
  ],
  "oportunidades": [
    {
      "titulo": "string conciso",
      "magnitud": "estimación cuantitativa (ej: RD$340M, +12% etc)",
      "agente": "nombre del agente IA",
      "detalle": "1-2 oraciones",
      "accion": "acción concreta con timeframe"
    }
  ],
  "ideas": [
    {
      "titulo": "string",
      "agente": "nombre del agente IA",
      "ice": "número 0-100",
      "detalle": "1 oración"
    }
  ],
  "kpis": [
    { "nombre": "string", "valor": "string", "delta": "string", "tendencia": "up" | "down" | "flat" }
  ],
  "decisiones": [
    { "titulo": "decisión a aprobar hoy", "responsable": "rol", "deadline": "hoy HH:MM" }
  ]
}

Genera 3 riesgos, 3 oportunidades, 3 ideas, 4 KPIs y 3 decisiones. Asegura variedad y realismo basado en el contexto dominicano. No repitas ideas obvias. Piensa como un equipo ejecutivo completo (CEO, CTO, CMO, CPO, Director de Riesgo, etc.).`;

export async function POST(_req: NextRequest) {
  try {
    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: USER_PROMPT },
      ],
      thinking: { type: "disabled" },
    });

    const content = completion.choices[0]?.message?.content || "";

    // Try to extract JSON from the response (LLM may wrap in markdown)
    let jsonStr = content.trim();
    const fenceMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) {
      jsonStr = fenceMatch[1].trim();
    }
    const firstBrace = jsonStr.indexOf("{");
    const lastBrace = jsonStr.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      jsonStr = jsonStr.slice(firstBrace, lastBrace + 1);
    }

    const parsed = JSON.parse(jsonStr);

    return NextResponse.json({
      success: true,
      briefing: parsed,
      generatedAt: new Date().toISOString(),
      source: "Qik Executive Advisor AI · LLM synthesis",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        error: message,
        fallback: "Briefing estático disponible en el dashboard.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "QIK AI — Executive Briefing Generator",
    method: "POST",
    description:
      "Genera un briefing ejecutivo fresco para el CEO de Qik usando LLM, basado en contexto público del mercado dominicano.",
  });
}
