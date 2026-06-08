import { useEffect, useState, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { NAV_ITEMS, CONTACT, PROJECT_NAV_DROPDOWN } from "../lib/data";
import { cn } from "../lib/utils";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimer.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="container-shell px-5 md:px-8 lg:px-12">
        <div
          className={cn(
            "flex items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-300",
            scrolled ? "nav-bar-scrolled" : "bg-transparent"
          )}
        >
          {/* Logo */}
          <a
            href="#top"
            aria-label="回到首页"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display font-bold text-sm transition-transform hover:scale-105"
            style={{
              background: "var(--brand-orange)",
              color: "#FFFFFF",
            }}
          >
            W
          </a>

          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center gap-1">
            <ul className="flex items-center gap-1 rounded-full px-2 py-1">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={
                    item.label === "项目集" ? handleDropdownEnter : undefined
                  }
                  onMouseLeave={
                    item.label === "项目集" ? handleDropdownLeave : undefined
                  }
                >
                  {item.label === "项目集" ? (
                    <>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
                        style={{ color: "var(--text-secondary)" }}
                        onClick={() => setDropdownOpen((v) => !v)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "var(--text-primary)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "var(--text-secondary)";
                        }}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform",
                            dropdownOpen && "rotate-180"
                          )}
                        />
                      </button>
                      {dropdownOpen && (
                        <div
                          className="absolute left-0 top-full mt-2 w-56 rounded-xl py-2 shadow-lg"
                          style={{
                            background: "var(--bg-elevated)",
                            border: "1px solid var(--border-subtle)",
                            boxShadow:
                              "0 12px 32px -8px rgba(120, 80, 30, 0.18)",
                          }}
                        >
                          {PROJECT_NAV_DROPDOWN.map((p) => (
                            <Link
                              key={p.slug}
                              to={`/projects/${p.slug}`}
                              className="mx-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                              style={{ color: "var(--text-secondary)" }}
                              onClick={() => setDropdownOpen(false)}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "var(--bg-elevated-2)";
                                e.currentTarget.style.color =
                                  "var(--text-primary)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "transparent";
                                e.currentTarget.style.color =
                                  "var(--text-secondary)";
                              }}
                            >
                              <span
                                className="h-1.5 w-1.5 rounded-full shrink-0"
                                style={{
                                  background: "var(--brand-orange)",
                                }}
                              />
                              {p.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
                      style={{ color: "var(--text-secondary)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--text-primary)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--text-secondary)";
                      }}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA — GitHub 图标 */}
          <div className="flex items-center gap-2">
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub 主页"
              title={CONTACT.github}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:-translate-y-0.5"
              style={{
                borderColor: "var(--border-strong)",
                color: "var(--text-primary)",
                background: "var(--bg-elevated)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--brand-orange)";
                e.currentTarget.style.borderColor = "var(--brand-orange)";
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--bg-elevated)";
                e.currentTarget.style.borderColor = "var(--border-strong)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
            >
              {/* GitHub Mark — 官方 SVG */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-[18px] w-[18px]"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
                />
              </svg>
            </a>
            <button
              type="button"
              aria-label="切换菜单"
              onClick={() => setOpen((o) => !o)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
              style={{
                borderColor: "var(--border-strong)",
                color: "var(--text-secondary)",
              }}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* 移动菜单 */}
        {open && (
          <div
            className="md:hidden mt-3 rounded-2xl p-4"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  {item.label === "项目集" ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => setDropdownOpen((v) => !v)}
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            dropdownOpen && "rotate-180"
                          )}
                        />
                      </button>
                      {dropdownOpen && (
                        <div className="mt-1 ml-4 flex flex-col gap-1">
                          {PROJECT_NAV_DROPDOWN.map((p) => (
                            <Link
                              key={p.slug}
                              to={`/projects/${p.slug}`}
                              onClick={() => {
                                setOpen(false);
                                setDropdownOpen(false);
                              }}
                              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
                              style={{ color: "var(--text-tertiary)" }}
                            >
                              <span
                                className="h-1 w-1 rounded-full shrink-0"
                                style={{ background: "var(--brand-orange)" }}
                              />
                              {p.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-sm font-medium transition-colors"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  GitHub 主页
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
