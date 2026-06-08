import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { PROJECTS } from "../lib/data";

/**
 * MacWindow — Hero 核心：macOS 风格应用窗口
 * 显示 3 个项目 tab，可自动轮播 / 点击切换
 */
export function MacWindow() {
  const [active, setActive] = useState(0);

  // 自动轮播（4s）
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % PROJECTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const project = PROJECTS[active];

  return (
    <div
      className="mac-window w-full"
      role="region"
      aria-label="项目预览窗口"
    >
      {/* 标题栏（macOS 三色窗控） */}
      <div className="mac-titlebar">
        <span
          className="mac-dot"
          style={{ background: "#FF5F57" }}
          aria-hidden="true"
        />
        <span
          className="mac-dot"
          style={{ background: "#FEBC2E" }}
          aria-hidden="true"
        />
        <span
          className="mac-dot"
          style={{ background: "#28C840" }}
          aria-hidden="true"
        />
        <span className="ml-3 text-xs font-mono text-[var(--text-tertiary)]">
          weiwei-portfolio.app
        </span>
      </div>

      {/* Tab 栏 */}
      <div
        className="flex items-center gap-1 px-3 py-2 border-b overflow-x-auto"
        style={{ borderColor: "var(--border-subtle)" }}
        role="tablist"
      >
        {PROJECTS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            data-active={i === active}
            onClick={() => setActive(i)}
            className="mac-tab flex items-center gap-1.5 whitespace-nowrap"
          >
            <span className="font-mono text-[10px] opacity-60">
              {p.number}
            </span>
            <span>{p.title}</span>
          </button>
        ))}
      </div>

      {/* 内容区 */}
      <div
        key={active}
        className="p-5 md:p-7 min-h-[300px] md:min-h-[340px] animate-tab-fade"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 md:h-12 md:w-12 rounded-xl flex items-center justify-center font-display font-bold text-base md:text-lg"
              style={{
                background: "var(--bg-elevated-2)",
                color: "var(--brand-orange)",
              }}
            >
              {project.acronym}
            </div>
            <div>
              <div className="font-mono text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider">
                Project {project.number} · {project.tags[0]}
              </div>
              <h3 className="font-display text-base md:text-lg font-semibold text-[var(--text-primary)] leading-tight mt-0.5">
                {project.title}
              </h3>
            </div>
          </div>
        </div>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
          {project.subtitle}
        </p>

        {/* 2 个核心数据（紧凑网格） */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {project.result.slice(0, 2).map((r) => (
            <div
              key={r.metric}
              className="rounded-lg p-3"
              style={{
                background: "var(--bg-elevated-2)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div
                className="font-display text-lg md:text-xl font-bold"
                style={{ color: "var(--brand-orange)" }}
              >
                {r.value}
              </div>
              <div className="text-[11px] text-[var(--text-tertiary)] mt-0.5">
                {r.metric}
              </div>
            </div>
          ))}
        </div>

        {/* 进度条（视觉装饰） */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-tertiary)]">
            <span>项目成熟度</span>
            <span>{85 + active * 5}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${85 + active * 5}%` }}
            />
          </div>
        </div>

        {/* 行动项数量 */}
        <div className="mt-5 flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
          <ChevronRight className="h-3.5 w-3.5" />
          <span>
            {project.action.length} 项关键行动 · {project.techStack.length} 项技术栈
          </span>
        </div>
      </div>

      {/* 状态栏 */}
      <div className="mac-statusbar">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "#28C840" }}
            aria-hidden="true"
          />
          <span>
            {active + 1} / {PROJECTS.length} · 持续更新
          </span>
        </div>
        <span>weiwei.dev · 2026</span>
      </div>
    </div>
  );
}
