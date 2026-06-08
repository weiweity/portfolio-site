import { useParams, Link } from "react-router-dom";
import { findProjectBySlug } from "../data/projectDetails";
import { ProjectNavBar } from "../components/project-detail/ProjectNavBar";
import { ProjectSidebar } from "../components/project-detail/ProjectSidebar";
import { ProjectContent } from "../components/project-detail/ProjectContent";

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? findProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-3">
            404 · Not Found
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            没找到这个项目
          </h1>
          <p className="text-gray-600 mb-6">
            slug <code className="font-mono text-sm bg-gray-100 px-2 py-0.5 rounded">{slug}</code>{" "}
            不在 3 个项目清单里。
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-md bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            ← 返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ProjectNavBar project={project} />
      <div className="flex-1 flex">
        <ProjectSidebar project={project} />
        <ProjectContent project={project} />
      </div>
    </div>
  );
}
