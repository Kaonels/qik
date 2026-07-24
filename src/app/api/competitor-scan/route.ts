import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

// ============================================================
// QIK AI — Live Competitor Intelligence Scan
// Uses web search to fetch recent public moves of Dominican
// Republic banks and fintechs, then summarizes them.
// ============================================================

const QUERIES = [
  "Banreservas Republica Dominicana nuevo producto app digital 2025",
  "BHD banco digital cuenta movil Republica Dominicana 2025",
  "Banco Popular Dominicano cuenta digital app 2025",
  "APAP asociacion ahorros prestamos Republica Dominicana noticias 2025",
];

export async function POST(_req: NextRequest) {
  try {
    const zai = await ZAI.create();

    // Run searches in parallel
    const searchResults = await Promise.all(
      QUERIES.map(async (q) => {
        try {
          const results = await zai.functions.invoke("web_search", {
            query: q,
            num: 5,
          });
          return { query: q, results: Array.isArray(results) ? results : [] };
        } catch {
          return { query: q, results: [] };
        }
      })
    );

    // Collect all results
    const allResults = searchResults.flatMap((sr) =>
      sr.results.map((r: { name: string; snippet: string; url: string; host_name: string; date: string }) => ({
        query: sr.query,
        title: r.name,
        snippet: r.snippet,
        url: r.url,
        host: r.host_name,
        date: r.date,
      }))
    );

    // Use LLM to synthesize the findings into a brief
    const context = allResults
      .slice(0, 20)
      .map((r, i) => `${i + 1}. [${r.host}] ${r.title}\n${r.snippet}`)
      .join("\n\n");

    const synthesis = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Eres el Competitor Intelligence AI del QIK AI COMMAND CENTER. Analizas movimientos públicos de bancos dominicanos y produces un brief ejecutivo para Qik (primer neobanco RD, filial del Grupo Popular). Responde SOLO en JSON válido.",
        },
        {
          role: "user",
          content: `Analiza estos resultados públicos de web search sobre bancos dominicanos y produce un brief de inteligencia competitiva.

Resultados de búsqueda:
${context}

Responde en JSON con esta estructura exacta:
{
  "resumen": "1-2 oraciones con el panorama competitivo actual",
  "movimientos": [
    {
      "banco": "nombre del banco",
      "movimiento": "qué hizo/novió (conciso)",
      "impacto_para_qik": "alto | medio | bajo",
      "ventana_reaccion": "horas/días estimados",
      "recomendacion": "acción concreta para Qik"
    }
  ],
  "oportunidades": [
    "oportunidad específica 1",
    "oportunidad específica 2"
  ]
}

Genera 4-6 movimientos y 2-3 oportunidades. Sé específico y accionable. Solo basado en la información pública mostrada.`,
        },
      ],
      thinking: { type: "disabled" },
    });

    const content = synthesis.choices[0]?.message?.content || "";
    let jsonStr = content.trim();
    const fenceMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) jsonStr = fenceMatch[1].trim();
    const firstBrace = jsonStr.indexOf("{");
    const lastBrace = jsonStr.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      jsonStr = jsonStr.slice(firstBrace, lastBrace + 1);
    }

    let parsed: unknown = null;
    try {
      parsed = JSON.parse(jsonStr);
    } catch {
      parsed = { resumen: "Síntesis no disponible", movimientos: [], oportunidades: [] };
    }

    return NextResponse.json({
      success: true,
      synthesis: parsed,
      rawSources: allResults.slice(0, 12).map((r) => ({
        title: r.title,
        host: r.host,
        url: r.url,
        date: r.date,
      })),
      scannedAt: new Date().toISOString(),
      source: "Qik Competitor Intelligence AI · web search + LLM",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message, fallback: "Datos competitivos estáticos disponibles en el panel." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "QIK AI — Competitor Intelligence Live Scan",
    method: "POST",
    description:
      "Escanea en tiempo real (web search) movimientos públicos de bancos dominicanos y los sintetiza con LLM en un brief competitivo.",
  });
}
