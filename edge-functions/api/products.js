// EdgeOne Pages Edge Function — GET /api/products
// Returns the six skill cards shown in Section 6.
// The endpoint is named "products" for parity with the original jewelry brief
// but the payload is a "skills" array (icon names map client-side via lucide-react).

const skills = {
  skills: [
    { id: "rag",       icon: "Database",     title: "RAG Architecture",     oneLiner: "4-way RRF fusion over chunked corpora",              badge: "Core" },
    { id: "etl",       icon: "Workflow",     title: "ETL Pipelines",         oneLiner: "DuckDB + incremental caching for daily refreshes" },
    { id: "agents",    icon: "Bot",          title: "AI Agent Workflows",   oneLiner: "Claude Code + WorkBuddy composed into repeatable flows" },
    { id: "quality",   icon: "ShieldCheck",  title: "Data Quality Gates",   oneLiner: "Six-gate validation before anything reaches a dashboard" },
    { id: "enablement",icon: "Users",        title: "Team Enablement",      oneLiner: "AI training doc, 722 lines, delivered 2026-03-28" },
    { id: "viz",       icon: "LineChart",    title: "Visualization",        oneLiner: "Design tokens reused from web into Excel reports" },
  ],
};

export async function onRequestGet() {
  return new Response(JSON.stringify(skills), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=60, s-maxage=300",
    },
  });
}
