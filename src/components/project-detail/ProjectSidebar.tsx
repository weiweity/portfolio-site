import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronDown, Menu, BookOpen } from "lucide-react";
import type { ProjectDetail, Chapter } from "../../data/projectDetails";

export function ProjectSidebar({ project }: { project: ProjectDetail }) {
  const location = useLocation();
  const [activeId, setActiveId] = useState<string>("1.1");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scrollspy: 找出当前视口中可见的 chapter
  useEffect(() => {
    const ids = project.groups.flatMap((g) => g.chapters.map((c) => c.id));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const id = visible[0].target.id.replace("chapter-", "");
          setActiveId(id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(`chapter-${id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [project]);

  // Hash 变化时立即更新
  useEffect(() => {
    if (location.hash.startsWith("#chapter-")) {
      setActiveId(location.hash.replace("#chapter-", ""));
    }
  }, [location.hash]);

  // 找当前活跃章节标题（给移动端下拉用）
  const activeChapter = project.groups
    .flatMap((g) => g.chapters)
    .find((c) => c.id === activeId);

  const chapterList = (
    <div className="px-3 py-3">
      {project.groups.map((group) => (
        <div key={group.id} className="mb-2">
          <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1 mt-4 px-3">
            {group.name}
          </div>
          <ul>
            {group.chapters.map((ch: Chapter) => {
              const isActive = activeId === ch.id;
              return (
                <li key={ch.id}>
                  <a
                    href={`#chapter-${ch.id}`}
                    onClick={() => {
                      setActiveId(ch.id);
                      setMobileOpen(false);
                    }}
                    className={`block text-sm px-3 py-1.5 border-l-2 transition-colors truncate focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-orange)] focus-visible:ring-offset-1 rounded-r-md ${
                      isActive
                        ? "bg-amber-50/80 border-[var(--brand-orange)] text-gray-900 font-medium"
                        : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <span className="font-mono text-xs text-gray-500 mr-1.5">
                      {ch.id}
                    </span>
                    {ch.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* ─── 移动端章节导航（< lg）─── */}
      <div className="lg:hidden sticky top-14 z-20 bg-white border-b border-gray-200">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand-orange)]"
          aria-label="展开章节目录"
        >
          <span className="flex items-center gap-2">
            <Menu className="h-4 w-4 text-[var(--brand-orange)]" />
            {activeChapter ? (
              <>
                <span className="font-mono text-xs text-gray-500">
                  {activeChapter.id}
                </span>
                {activeChapter.title}
              </>
            ) : (
              "章节目录"
            )}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform ${
              mobileOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {mobileOpen && (
          <div className="max-h-[60vh] overflow-y-auto bg-white border-t border-gray-100">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2 text-xs text-gray-600">
              <BookOpen className="h-3.5 w-3.5 text-[var(--brand-orange)]" />
              <span>共 {project.groups.flatMap((g) => g.chapters).length} 章 · {project.totalReadingTime}</span>
            </div>
            {chapterList}
          </div>
        )}
      </div>

      {/* ─── 桌面端侧边栏（≥ lg）─── */}
      <aside
        className="hidden lg:block sticky top-14 h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-gray-200 bg-white"
        aria-label="项目目录"
      >
        <div className="px-5 py-5 flex items-center gap-2 text-xs text-gray-600">
          <BookOpen className="h-3.5 w-3.5 text-[var(--brand-orange)]" />
          <span>共 {project.groups.flatMap((g) => g.chapters).length} 章 · {project.totalReadingTime}</span>
        </div>

        <div className="border-t border-gray-200" />

        {chapterList}
      </aside>
    </>
  );
}
