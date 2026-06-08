import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../lib/data";

/* ────────────────── v2.1 风格 Works 卡片（3 张，深色主题 + 预览缩略图）────────────────── */

export function Projects() {
  return (
    <section
      id="works"
      className="relative py-24 md:py-32"
      style={{ background: "var(--bg-elevated-2)" }}
    >
      <div className="container-shell px-5 md:px-8 lg:px-12">
        {/* 板块标题 */}
        <div className="reveal max-w-2xl mb-16 md:mb-20">
          <p
            className="text-sm font-mono tracking-widest uppercase"
            style={{ color: "var(--brand-orange)" }}
          >
            / Works
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter2">
            3 个<span className="gradient-text">核心项目</span>，
            <br />
            全在生产环境跑着。
          </h2>
          <p
            className="mt-6 text-base md:text-lg leading-relaxed text-pretty"
            style={{ color: "var(--text-secondary)" }}
          >
            过去 1 年里我作为「业务侧 AI 操盘手」交付的代表性产出。
            点击下方「进入项目详情」可阅读带行号引用的完整技术文档。
          </p>
        </div>

        {/* 3 个深色卡片（v2.1 风格 + 预览缩略图） */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className={`reveal group relative rounded-2xl bg-gradient-to-br ${project.gradient} backdrop-blur-sm border border-white/10 overflow-hidden flex flex-col`}
              style={{
                background:
                  "linear-gradient(135deg, rgba(40, 28, 20, 0.85) 0%, rgba(28, 22, 18, 0.95) 100%)",
              }}
            >
              {/* 项目预览缩略图 */}
              <div className="w-full aspect-video overflow-hidden opacity-60 group-hover:opacity-80 transition-opacity">
                <img
                  src={project.previewImage}
                  alt={`${project.title} 预览`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* 卡片内容 */}
              <div className="p-8 flex flex-col flex-1">
                {/* 顶部小字编号 */}
                <div className="text-xs font-mono text-white/50 mb-3">
                  P{project.number} · {project.acronym}
                </div>

                {/* 标题 */}
                <h3 className="text-2xl font-bold text-white leading-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-white/70 mt-1">{project.subtitle}</p>

                {/* 描述 */}
                <p className="text-sm text-white/80 mt-4 leading-relaxed line-clamp-3">
                  {project.summary}
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/20 text-white/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Spacer 推底部链接到底 */}
                <div className="flex-1" />

                {/* 详情链接 */}
                <Link
                  to={`/projects/${project.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm text-white/90 hover:text-white font-medium transition-colors"
                >
                  进入项目详情
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
