import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Evidence } from "./components/Evidence";
import { Contact } from "./components/Contact";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PortfolioHome() {
  // 滚动渐入
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative min-h-screen"
      style={{
        background: "var(--bg-base)",
        color: "var(--text-primary)",
      }}
    >
      <NavBar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Evidence />
        <Contact />
      </main>
      <footer
        className="py-8 mt-16"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        <div className="container-shell px-5 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
          <p style={{ color: "var(--text-tertiary)" }}>
            © 2026 魏炜 · Weiwei — Built with React + Vite + Tailwind
          </p>
          <p
            className="font-mono text-xs"
            style={{ color: "var(--text-tertiary)" }}
          >
            v2.3.0 · 把 AI 揉进业务流的人
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
