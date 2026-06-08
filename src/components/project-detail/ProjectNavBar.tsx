import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Search, Share2, Moon } from "lucide-react";
import type { ProjectDetail } from "../../data/projectDetails";
import { PROJECTS_DETAIL } from "../../data/projectDetails";

export function ProjectNavBar({ project }: { project: ProjectDetail }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-30 h-14 bg-white border-b border-gray-200 flex items-center px-5">
      {/* Left: repo switcher */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-[var(--brand-orange)] transition-colors px-2 py-1.5 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-orange)]"
          aria-label="切换项目"
        >
          <span className="font-mono">{project.repo}</span>
          <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
        </button>

        {open && (
          <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg py-1.5 z-40">
            <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              切换项目
            </div>
            {PROJECTS_DETAIL.map((p) => (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}`}
                onClick={() => setOpen(false)}
                className={`flex flex-col gap-0.5 px-3 py-2 hover:bg-gray-50 transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-orange)] ${
                  p.slug === project.slug ? "bg-amber-50/60" : ""
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    p.slug === project.slug ? "text-[var(--brand-orange)]" : "text-gray-900"
                  }`}
                >
                  {p.title}
                </span>
                <span className="text-xs font-mono text-gray-500">
                  weiweity/{p.slug}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right: search + ask AI + theme + share + avatar */}
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 h-8 w-64 px-3 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-500 cursor-not-allowed">
          <Search className="h-3.5 w-3.5" />
          <span>搜索文档</span>
          <span className="ml-auto text-xs font-mono border border-gray-300 bg-white px-1.5 py-0.5 rounded">
            ⌘K
          </span>
        </div>

        <button
          type="button"
          className="h-8 px-3 rounded-md border border-gray-200 text-gray-400 text-sm font-medium cursor-not-allowed transition-colors"
          aria-label="Ask AI（即将推出）"
          title="即将推出"
          disabled
        >
          Ask AI
        </button>

        <button
          type="button"
          className="h-8 w-8 rounded-md flex items-center justify-center text-gray-500 opacity-50 cursor-not-allowed transition-colors"
          aria-label="切换主题（即将推出）"
          title="即将推出"
          disabled
        >
          <Moon className="h-4 w-4" />
        </button>

        <button
          type="button"
          className="h-8 w-8 rounded-md flex items-center justify-center text-gray-500 opacity-50 cursor-not-allowed transition-colors"
          aria-label="分享（即将推出）"
          title="即将推出"
          disabled
        >
          <Share2 className="h-4 w-4" />
        </button>

        <div
          className="h-8 w-8 rounded-full bg-gradient-to-br from-[var(--brand-orange)] to-[var(--brand-amber)] flex items-center justify-center text-white text-sm font-semibold opacity-50 cursor-not-allowed"
          aria-label="用户头像（占位）"
          title="即将推出"
        >
          👤
        </div>
      </div>
    </nav>
  );
}
