// EdgeOne Pages Edge Function — GET /api/site-content
// Returns all static text/copy for the portfolio. Splitting copy out of the
// React bundle lets us iterate on wording without a redeploy of the SPA.

const siteContent = {
  brand: {
    monogram: "W",
    fullName: "Weiwei",
    chineseName: "魏炜",
    tagline: "Where Operations Meets AI",
    prestigeLine: "Operations. AI. Outcomes.",
  },
  nav: [
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Craft", href: "#craft" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    badge: "AI-NATIVE OPERATOR",
    heading: "Where Operations Meets AI",
    subtext:
      "A user-operator who built AI workflows that compressed 3 people's workload into 1 — and kept 100+ hours/month flowing back to business.",
    ctaPrimary: "View Projects",
    ctaSecondary: "Get in Touch",
  },
  about: {
    badge: "About",
    heading: "From operations desk to AI pipelines.",
    body:
      "Years of running user operations taught me where the friction lives. Then I started wiring AI into the friction — RAG for service teams, DuckDB for analytics, Claude Code for the work that used to eat my evenings. This site is the receipt.",
    cta: "Read full story",
  },
  builtWithHeading: "Built With",
  builtWithItems: [
    "React", "Vite", "TypeScript", "Tailwind", "shadcn/ui",
    "DuckDB", "FastAPI", "Python", "RAG", "FAISS",
  ],
  projectsHeading: "Signature Projects",
  projectsSubheading:
    "Three systems that turned operational drag into compounding leverage.",
  skillsHeading: "The Craft",
  skillsSubheading:
    "Tools and patterns refined across 40B+ tokens, 10.3M orders, and one very persistent team.",
  statsHeading: "Precision you can feel before you can name it.",
  statsSubtext:
    "Numbers from real systems, not vanity metrics. Each one paid for itself in the quarter it shipped.",
  stats: [
    { value: "40B+", label: "Tokens", caption: "Consumed across LLMs in a single year" },
    { value: "10.3M", label: "Orders", caption: "Processed through the CRM platform" },
    { value: "67%", label: "Uplift", caption: "3 → 5 person output via AI agents" },
    { value: "3s", label: "Lookup", caption: "Customer service from 30 seconds" },
  ],
  highlightsHeading: "Outcomes, not outputs.",
  highlights: [
    {
      quote: "Built a CRM that 80% of the team now self-serves for analytics.",
      source: "Fuqing CRM",
    },
    {
      quote: "Trained a RAG system that cut customer service onboarding from 2 weeks to 3 days.",
      source: "Dafuyan Phrase",
    },
    {
      quote: "Composed a 722-line internal AI training doc, delivered to management.",
      source: "2026-03-28 Workshop",
    },
  ],
  contact: {
    heading: "Let's build something.",
    subtext: "Looking for an AI-native operator to ship in your team?",
    ctaPrimary: "Get in Touch",
    ctaSecondary: "Download Resume",
  },
  footer: {
    copyright: "© 2026 Weiwei",
    links: [
      { label: "Email", href: "mailto:hello@weiwei.example" },
      { label: "GitHub", href: "https://github.com/" },
      { label: "LinkedIn", href: "https://linkedin.com/" },
    ],
  },
};

export async function onRequestGet() {
  return new Response(JSON.stringify(siteContent), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=60, s-maxage=300",
    },
  });
}
