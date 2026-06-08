// EdgeOne Pages Edge Function — GET /api/collections
// Returns the three signature projects shown in Section 5.

const projects = {
  projects: [
    {
      id: "fuqing-crm",
      acronym: "FUQ",
      title: "Fuqing CRM",
      subtitle: "Enterprise data platform",
      description:
        "10.3M orders routed through one self-serve analytics surface. ETL 10x faster than the prior stack.",
      cta: "View Case Study",
      gradient: "from-[#1a2740] via-[#0d1830] to-[#0a0e1a]",
    },
    {
      id: "dafuyan-rag",
      acronym: "DFY",
      title: "Dafuyan Phrase RAG",
      subtitle: "AI-powered service training",
      description:
        "Phrase retrieval for new agents. Customer service lookup dropped from 30s to 3s — onboarding from 2 weeks to 3 days.",
      cta: "View Case Study",
      gradient: "from-[#1a2a3a] via-[#0e1a2a] to-[#0a0e1a]",
    },
    {
      id: "ai-ops",
      acronym: "OPS",
      title: "AI Ops Workflows",
      subtitle: "Agents in the operations loop",
      description:
        "Composed Claude Code + WorkBuddy into repeatable flows. 3 people shipping the output of 5.",
      cta: "View Case Study",
      gradient: "from-[#1a2030] via-[#0e1428] to-[#0a0e1a]",
    },
  ],
};

export async function onRequestGet() {
  return new Response(JSON.stringify(projects), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=60, s-maxage=300",
    },
  });
}
