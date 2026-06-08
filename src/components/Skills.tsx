import { SKILLS } from "../lib/data";
import { Sparkles, Cpu, Bot, Users2, ShoppingBag } from "lucide-react";

const ICONS: Record<string, typeof Sparkles> = {
  "AI Agent 编排": Bot,
  "技术": Cpu,
  "大模型": Sparkles,
  "用户运营": Users2,
  "电商工具": ShoppingBag,
};

const PRIORITY_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  "主力": {
    bg: "var(--brand-orange)",
    text: "#FFFFFF",
    border: "var(--brand-orange)",
  },
  "熟练": {
    bg: "transparent",
    text: "var(--brand-orange)",
    border: "var(--brand-orange)",
  },
  "了解": {
    bg: "transparent",
    text: "var(--text-tertiary)",
    border: "var(--border-strong)",
  },
};

export function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 md:py-32"
      style={{ background: "var(--bg-elevated)" }}
    >
      <div className="container-shell px-5 md:px-8 lg:px-12">
        <div className="reveal max-w-2xl">
          <p
            className="text-sm font-mono tracking-widest uppercase"
            style={{ color: "var(--brand-orange)" }}
          >
            / Skills
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter2">
            专业技能<span className="gradient-text">标签</span>
          </h2>
          <p
            className="mt-6 text-base md:text-lg leading-relaxed text-pretty"
            style={{ color: "var(--text-secondary)" }}
          >
            5 大类共 28 项 · 主力 / 熟练 / 了解 三级熟练度 · 与最新 PDF 简历同步。
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILLS.map((group) => {
            const Icon = ICONS[group.category] || Sparkles;
            return (
              <div
                key={group.category}
                className="reveal card-soft p-6 md:p-7"
              >
                <div className="flex items-center gap-2 mb-5">
                  <div
                    className="h-8 w-8 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: "var(--bg-base)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    <Icon
                      className="h-4 w-4"
                      style={{ color: "var(--brand-orange)" }}
                    />
                  </div>
                  <h3
                    className="font-display text-base font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => {
                    const style = PRIORITY_STYLES[skill.priority];
                    return (
                      <span
                        key={skill.name}
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-transform hover:-translate-y-0.5"
                        style={{
                          background: style.bg,
                          color: style.text,
                          border: `1px solid ${style.border}`,
                        }}
                        title={skill.usage ? `${skill.name}（${skill.usage}）` : skill.name}
                      >
                        <span className="font-mono">{skill.name}</span>
                        {skill.usage && (
                          <span
                            className="text-[10px] opacity-80"
                            style={{
                              color:
                                skill.priority === "主力"
                                  ? "rgba(255,255,255,0.85)"
                                  : "var(--text-tertiary)",
                            }}
                          >
                            · {skill.usage}
                          </span>
                        )}
                        <span
                          className="ml-1 text-[10px] font-mono px-1.5 py-0.5 rounded-full"
                          style={{
                            background:
                              skill.priority === "主力"
                                ? "rgba(255,255,255,0.22)"
                                : skill.priority === "熟练"
                                ? "rgba(232, 119, 35, 0.10)"
                                : "var(--bg-base)",
                            color:
                              skill.priority === "主力"
                                ? "#FFFFFF"
                                : skill.priority === "熟练"
                                ? "var(--brand-orange)"
                                : "var(--text-tertiary)",
                          }}
                        >
                          {skill.priority}
                        </span>
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* 教育背景 */}
        <Education />
      </div>
    </section>
  );
}

function Education() {
  return (
    <div
      className="reveal mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 rounded-2xl p-6 md:p-7"
      style={{
        background: "var(--bg-base)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div
        className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: "var(--brand-orange)",
          color: "#FFFFFF",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3zm0 8.18L5.18 9 12 5.82 18.82 9 12 11.18zM5 13.39v3.7c0 1.5 3.13 2.91 7 2.91s7-1.41 7-2.91v-3.7l-7 3.82-7-3.82z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-xs font-mono tracking-widest uppercase mb-1"
          style={{ color: "var(--brand-orange)" }}
        >
          / Education
        </p>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span
            className="font-display text-lg font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            宁波财经学院
          </span>
          <span
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            · 电子商务（本科）
          </span>
        </div>
      </div>
      <div
        className="font-mono text-sm shrink-0"
        style={{ color: "var(--text-tertiary)" }}
      >
        2020.09 — 2022.06
      </div>
    </div>
  );
}
