import { RadarChart } from "./RadarChart";
import { TIMELINE } from "../lib/data";
import { Briefcase } from "lucide-react";

export function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="container-shell px-5 md:px-8 lg:px-12">
        {/* 区块标题 */}
        <div className="reveal max-w-2xl">
          <p
            className="text-sm font-mono tracking-widest uppercase"
            style={{ color: "var(--brand-orange)" }}
          >
            / About
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter2">
            比业务更懂 AI，
            <br />
            <span className="gradient-text">比 AI 更懂业务。</span>
          </h2>
          <p
            className="mt-6 text-base md:text-lg leading-relaxed text-pretty"
            style={{ color: "var(--text-secondary)" }}
          >
            我是从用户运营一线走出来的 AI 赋能型操盘手。在芙清用 AI Agent 顶替 2 个招不到的 HC，让 3 人编制顶 5 人产出；给管理层搭数据看板、给客服搭话术搜索系统。一年累计用 AI 消耗 40 亿+ token 完成真实业务交付。
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* 雷达图 */}
          <div className="reveal flex flex-col items-center lg:items-start">
            <p
              className="text-sm font-mono tracking-widest uppercase mb-6 self-start"
              style={{ color: "var(--text-tertiary)" }}
            >
              / 能力图谱
            </p>
            <RadarChart />
            <p
              className="mt-6 text-sm max-w-md text-center lg:text-left"
              style={{ color: "var(--text-tertiary)" }}
            >
              6 维能力评估 · 强项在「AI 落地 / 业务 sense / 数据」，弱项在「线上稳定性 SLA」—— 面试时我会主动讲清楚。
            </p>
          </div>

          {/* 时间线 */}
          <div className="reveal">
            <p
              className="text-sm font-mono tracking-widest uppercase mb-6"
              style={{ color: "var(--text-tertiary)" }}
            >
              / 工作经历
            </p>
            <div className="space-y-6">
              {TIMELINE.map((item, i) => (
                <div
                  key={i}
                  className="relative pl-8 transition-colors"
                  style={{ borderLeft: "1px solid var(--border-subtle)" }}
                >
                  <div
                    className="absolute -left-2 top-1.5 h-4 w-4 rounded-full flex items-center justify-center"
                    style={{
                      background: "var(--bg-base)",
                      border: "2px solid var(--brand-orange)",
                    }}
                  >
                    <Briefcase
                      className="h-2 w-2"
                      style={{ color: "var(--brand-orange)" }}
                    />
                  </div>
                  <div
                    className="font-mono text-xs mb-1"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {item.year}
                  </div>
                  <div
                    className="font-display text-lg font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.role}
                  </div>
                  <div
                    className="text-sm mt-0.5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.company}
                  </div>
                  <div
                    className="text-sm mt-1.5"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {item.highlight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
