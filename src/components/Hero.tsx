import { ArrowRight, Sparkles } from "lucide-react";
import { MacWindow } from "./MacWindow";
import { HERO_STATS } from "../lib/data";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-28 pb-16"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="container-shell relative z-10 px-5 md:px-8 lg:px-12 w-full">
        {/* 顶部小标 */}
        <div className="reveal">
          <span className="badge-pill badge-warm">
            <Sparkles className="h-3 w-3" />
            业务侧 AI Native 操盘手
          </span>
        </div>

        {/* 桌面端布局：左文 + 右窗口 */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* 左：大标题 + 副标题 + 数据 + CTA */}
          <div className="lg:col-span-5">
            <h1 className="reveal font-display text-[2.5rem] md:text-6xl lg:text-[4rem] font-bold leading-[1.05] tracking-tightest text-balance">
              把 AI 揉进
              <br />
              <span className="gradient-text">业务流的人</span>
            </h1>

            <p
              className="reveal mt-6 text-base md:text-lg leading-relaxed text-pretty"
              style={{ color: "var(--text-secondary)" }}
            >
              5 年护肤电商用户运营 + 1 年 AI 落地实战，开发预策ai agent。前芙清，让 3 人编制顶 5 人产出；主导 0-1 搭建企业级数据中台（1030 万订单）、RAG 客服培训系统、AI 赋能工作流矩阵。
            </p>

            {/* 数字徽章 */}
            <div className="reveal mt-8 flex flex-wrap gap-2">
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className={
                    stat.color === "warm"
                      ? "badge-pill badge-warm"
                      : stat.color === "success"
                      ? "badge-pill badge-success"
                      : "badge-pill"
                  }
                >
                  <span
                    className="font-display font-bold text-sm md:text-base"
                    style={{ color: "var(--brand-orange)" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs md:text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="reveal mt-8 flex flex-wrap gap-3">
              <a href="#works" className="btn-primary">
                看 3 个核心项目
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/weiweity"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                aria-label="访问我的 GitHub"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                GitHub
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* 右：MacWindow（Hero 视觉中心） */}
          <div className="reveal lg:col-span-7">
            <MacWindow />
            <p
              className="mt-3 text-xs text-center font-mono"
              style={{ color: "var(--text-tertiary)" }}
            >
              ↓ 点击 tab 切换 · 4s 自动轮播
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
