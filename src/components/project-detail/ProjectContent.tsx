import { Link } from "react-router-dom";
import type { ProjectDetail, Chapter } from "../../data/projectDetails";
import { PROJECTS_DETAIL } from "../../data/projectDetails";

/** 极简 inline 文本渲染：只处理 **bold** + 换行 + 段落。不处理 markdown 标题/列表/代码块。 */
function renderInlineText(text: string): string {
  const inlineBold = (s: string) =>
    s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  return text
    .split(/\n\n+/)
    .map((para) => {
      const withBreaks = para.split("\n").map(inlineBold).join("<br />");
      return `<p>${withBreaks}</p>`;
    })
    .join("\n");
}

function ChapterSection({
  ch,
  groupName,
  isOverview,
}: {
  ch: Chapter;
  groupName: string;
  isOverview?: boolean;
}) {
  // 第一章 1.1 概述用 project.title 替换「概述」字面；并把 description 注入到内容
  const displayTitle = isOverview ? "项目概述" : ch.title;
  const html = renderInlineText(ch.content);

  return (
    <section
      id={`chapter-${ch.id}`}
      className="mb-16 scroll-mt-20"
    >
      <nav className="text-xs text-gray-600 mb-3 flex items-center gap-1.5">
        <a href="#" className="text-[var(--brand-orange)] hover:underline">
          {groupName}
        </a>
        <span className="text-gray-400">&gt;</span>
        <span className="text-gray-700">{displayTitle}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
        {ch.title}
      </h1>
      {isOverview && (
        <p className="text-base text-gray-600 mb-4">{/* spacer */}</p>
      )}

      <div className="flex items-center gap-3 text-xs text-gray-500 mb-8">
        <span>🕐 {ch.readingTime}</span>
        <span className="text-gray-300">·</span>
        <span>🎖️ 等级:{ch.level}</span>
        <span className="text-gray-300">·</span>
        <span className="font-mono text-gray-400">#{ch.id}</span>
      </div>

      <div
        className="prose prose-gray max-w-none text-[15px] leading-7 text-gray-700 space-y-4 [&_p+p]:mt-4 [&_strong]:text-gray-900 [&_strong]:font-semibold"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {ch.sources.length > 0 && (
        <div className="mt-8 pt-4 border-t border-gray-100 text-xs text-gray-500">
          <span className="font-semibold text-gray-600">来源: </span>
          <span className="font-mono text-gray-600">
            {ch.sources.join(" · ")}
          </span>
        </div>
      )}
    </section>
  );
}

export function ProjectContent({ project }: { project: ProjectDetail }) {
  return (
    <main className="flex-1 min-w-0 bg-white">
      <div className="max-w-3xl mx-auto px-8 py-12">
        {/* Project header */}
        <header className="mb-12 pb-8 border-b border-gray-200">
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--brand-orange)] mb-2">
            {project.repo}
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            {project.title}
          </h1>
          <p className="text-lg text-gray-600 mb-4">{project.subtitle}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>📚 {project.totalReadingTime} · 全文档</span>
            <span className="text-gray-300">·</span>
            <span>共 {project.groups.flatMap((g) => g.chapters).length} 章</span>
          </div>
        </header>

        {/* Architecture Diagrams */}
        {project.archDiagrams && project.archDiagrams.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
              可视化架构方案
            </h2>
            <div className="space-y-8">
              {project.archDiagrams.map((d) => (
                <figure key={d.src} className="rounded-xl border border-gray-200 bg-gray-50/50 overflow-hidden">
                  <img
                    src={d.src}
                    alt={d.label}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  <figcaption className="px-4 py-3 text-sm text-gray-600 border-t border-gray-100 bg-white">
                    {d.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Chapters */}
        {project.groups.map((group) =>
          group.chapters.map((ch) => {
            const isOverview = group.id === 1 && ch.id === "1.1";
            return (
              <ChapterSection
                key={ch.id}
                ch={ch}
                groupName={group.name}
                isOverview={isOverview}
              />
            );
          })
        )}

        <footer className="mt-16 pt-8 border-t border-gray-200 text-sm text-gray-500">
          <p>
            <span className="font-mono">v2.3.0 · Mintlify 风格</span>
          </p>
        </footer>

        {/* 上一篇 / 下一篇 项目导航 */}
        <ProjectNav currentSlug={project.slug} />
      </div>
    </main>
  );
}

function ProjectNav({ currentSlug }: { currentSlug: string }) {
  const idx = PROJECTS_DETAIL.findIndex((p) => p.slug === currentSlug);
  const prev = idx > 0 ? PROJECTS_DETAIL[idx - 1] : null;
  const next = idx < PROJECTS_DETAIL.length - 1 ? PROJECTS_DETAIL[idx + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4">
      {prev ? (
        <Link
          to={`/projects/${prev.slug}`}
          className="group flex flex-col p-4 rounded-lg border border-gray-200 hover:border-[var(--brand-orange)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-orange)]"
        >
          <span className="text-xs text-gray-500 mb-1">← 上一篇</span>
          <span className="text-sm font-medium text-gray-900 group-hover:text-[var(--brand-orange)] transition-colors line-clamp-2">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          to={`/projects/${next.slug}`}
          className="group flex flex-col p-4 rounded-lg border border-gray-200 hover:border-[var(--brand-orange)] transition-colors text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-orange)]"
        >
          <span className="text-xs text-gray-500 mb-1">下一篇 →</span>
          <span className="text-sm font-medium text-gray-900 group-hover:text-[var(--brand-orange)] transition-colors line-clamp-2">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
