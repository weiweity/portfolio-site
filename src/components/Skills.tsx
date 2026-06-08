import {
  useEffect,
  useRef,
  useCallback,
  Fragment,
  useState,
} from "react";
import { SKILLS } from "../lib/data";
import {
  Sparkles,
  Cpu,
  Bot,
  Users2,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ─── Category icons ─── */
const CATEGORY_ICONS: Record<string, typeof Sparkles> = {
  "AI Agent 编排": Bot,
  技术: Cpu,
  大模型: Sparkles,
  用户运营: Users2,
  电商工具: ShoppingBag,
};

/* ─── Priority visual config ─── */
const PRIORITY_CFG: Record<
  string,
  { bg: string; text: string; border: string; badgeBg: string; badgeText: string }
> = {
  主力: {
    bg: "var(--brand-orange)",
    text: "#FFFFFF",
    border: "var(--brand-orange)",
    badgeBg: "rgba(255,255,255,0.22)",
    badgeText: "#FFFFFF",
  },
  熟练: {
    bg: "rgba(216, 106, 58, 0.06)",
    text: "var(--brand-orange)",
    border: "var(--brand-orange)",
    badgeBg: "rgba(232, 119, 35, 0.10)",
    badgeText: "var(--brand-orange)",
  },
  了解: {
    bg: "transparent",
    text: "var(--text-tertiary)",
    border: "var(--border-strong)",
    badgeBg: "var(--bg-base)",
    badgeText: "var(--text-tertiary)",
  },
};

/* ═══════════════════════════════════════════════════
   SkillTag — 单个技能标签
   ═══════════════════════════════════════════════════ */
function SkillTag({
  name,
  priority,
  usage,
}: {
  name: string;
  priority: "主力" | "熟练" | "了解";
  usage?: string;
}) {
  const c = PRIORITY_CFG[priority];
  return (
    <span
      className="skill-tag shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium"
      title={usage ? `${name}（${usage}）` : name}
    >
      <span className="font-mono">{name}</span>
      {usage && (
        <span
          className="text-[10px] opacity-70"
          style={{
            color: priority === "主力" ? "rgba(255,255,255,0.85)" : "var(--text-tertiary)",
          }}
        >
          · {usage}
        </span>
      )}
      <span
        className="ml-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded-full whitespace-nowrap"
        style={{ background: c.badgeBg, color: c.badgeText }}
      >
        {priority}
      </span>
    </span>
  );
}

/* ═══════════════════════════════════════════════════
   CategoryHeader — 分类标题胶囊
   ═══════════════════════════════════════════════════ */
function CategoryHeader({ category }: { category: string }) {
  const Icon = CATEGORY_ICONS[category] || Sparkles;
  return (
    <div
      className="shrink-0 inline-flex items-center gap-1.5 pl-2.5 pr-3 py-2 rounded-full"
      style={{
        background: "var(--bg-base)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <Icon className="h-3.5 w-3.5" style={{ color: "var(--brand-orange)" }} />
      <span
        className="text-xs font-semibold whitespace-nowrap"
        style={{ color: "var(--text-primary)" }}
      >
        {category}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ScrollRow — 单行水平滚动 + 自动弹跳动画
   ═══════════════════════════════════════════════════ */
function ScrollRow({
  children,
  speed = 0.5,
  initialDir = 1,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  initialDir?: number;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animRef = useRef(0);
  const dirRef = useRef(initialDir);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragRef = useRef({ x: 0, left: 0 });
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Auto-scroll ── */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return; // 无障碍：尊重用户偏好

    const el = scrollRef.current;
    if (!el) return;

    const tick = () => {
      if (!pausedRef.current && !draggingRef.current) {
        el.scrollLeft += speed * dirRef.current;

        // 弹跳：触边反转
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
          dirRef.current = -1;
        } else if (el.scrollLeft <= 0) {
          dirRef.current = 1;
        }
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [speed]);

  /* ── Drag helpers ── */
  const startDrag = useCallback((x: number) => {
    draggingRef.current = true;
    dragRef.current = { x, left: scrollRef.current?.scrollLeft ?? 0 };
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const moveDrag = useCallback((x: number) => {
    if (!draggingRef.current || !scrollRef.current) return;
    const dx = x - dragRef.current.x;
    scrollRef.current.scrollLeft = dragRef.current.left - dx;
    dirRef.current = dx > 0 ? -1 : 1; // 拖拽方向 → 续动方向
  }, []);

  const endDrag = useCallback(() => {
    draggingRef.current = false;
    // 拖拽结束 800ms 后恢复自动滚动
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      /* 自动恢复 */
    }, 800);
  }, []);

  /* ── Nav arrows ── */
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const obs = new ResizeObserver(() => {
      setShowLeft(el.scrollLeft > 20);
      setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollNav = useCallback(
    (delta: number) => {
      scrollRef.current?.scrollBy({ left: delta, behavior: "smooth" });
      dirRef.current = delta > 0 ? 1 : -1;
    },
    [],
  );

  return (
    <div className={`relative group/row ${className}`}>
      {/* 左侧淡出 */}
      <div
        className="pointer-events-none absolute left-0 inset-y-0 w-10 md:w-16 z-10 transition-opacity duration-300"
        style={{
          background: "linear-gradient(to right, var(--bg-elevated), transparent)",
          opacity: showLeft ? 1 : 0,
        }}
      />
      {/* 右侧淡出 */}
      <div
        className="pointer-events-none absolute right-0 inset-y-0 w-10 md:w-16 z-10 transition-opacity duration-300"
        style={{
          background: "linear-gradient(to left, var(--bg-elevated), transparent)",
          opacity: showRight ? 1 : 0,
        }}
      />

      {/* 左箭头 */}
      {showLeft && (
        <button
          type="button"
          className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-20 h-7 w-7 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-orange)]"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
          onClick={() => scrollNav(-260)}
          aria-label="向左滚动"
        >
          <ChevronLeft className="h-3.5 w-3.5" style={{ color: "var(--text-secondary)" }} />
        </button>
      )}
      {/* 右箭头 */}
      {showRight && (
        <button
          type="button"
          className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-20 h-7 w-7 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-orange)]"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
          onClick={() => scrollNav(260)}
          aria-label="向右滚动"
        >
          <ChevronRight className="h-3.5 w-3.5" style={{ color: "var(--text-secondary)" }} />
        </button>
      )}

      {/* Scroll 容器 */}
      <div
        ref={scrollRef}
        className="flex items-center gap-2.5 overflow-x-auto scrollbar-hide py-2 cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          draggingRef.current = false;
          pausedRef.current = false;
        }}
        onMouseDown={(e) => startDrag(e.pageX)}
        onMouseMove={(e) => moveDrag(e.pageX)}
        onMouseUp={endDrag}
        onDragStart={(e) => e.preventDefault()}
        onTouchStart={(e) => startDrag(e.touches[0].pageX)}
        onTouchMove={(e) => moveDrag(e.touches[0].pageX)}
        onTouchEnd={endDrag}
        onScroll={() => {
          const el = scrollRef.current;
          if (!el) return;
          setShowLeft(el.scrollLeft > 20);
          setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Skills — 主组件
   ═══════════════════════════════════════════════════ */
export function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 md:py-32"
      style={{ background: "var(--bg-elevated)" }}
    >
      <div className="container-shell px-5 md:px-8 lg:px-12">
        {/* ── Header ── */}
        <div className="reveal max-w-2xl">
          <p
            className="text-sm font-mono tracking-widest uppercase"
            style={{ color: "var(--brand-orange)" }}
          >
            / Skills
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter2">
            专业技能<span className="gradient-text">标签</span>
          </h2>
          <p
            className="mt-6 text-base md:text-lg leading-relaxed text-pretty"
            style={{ color: "var(--text-secondary)" }}
          >
            5 大类共 28 项 · 主力 / 熟练 / 了解 三级熟练度 · 与最新 PDF
            简历同步。
          </p>
        </div>

        {/* ── 水平滚动区 ── */}
        <div className="mt-12 space-y-3">
          {/* 第一行：AI Agent + 技术 + 用户运营 */}
          <ScrollRow speed={0.5} initialDir={1}>
            {renderGroup(0)}
            {renderSep()}
            {renderGroup(1)}
            {renderSep()}
            {renderGroup(3)}
          </ScrollRow>

          {/* 第二行：大模型 + 电商工具 */}
          <ScrollRow speed={0.35} initialDir={-1}>
            {renderGroup(2)}
            {renderSep()}
            {renderGroup(4)}
          </ScrollRow>
        </div>

        {/* ── 滚动提示 ── */}
        <p
          className="mt-5 text-center text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          ← 悬停暂停 · 拖拽滑动 · 点击箭头导航 →
        </p>

        {/* ── 教育背景 ── */}
        <Education />
      </div>
    </section>
  );
}

/* ── 渲染辅助 ── */
function renderGroup(idx: number) {
  const group = SKILLS[idx];
  return (
    <Fragment key={group.category}>
      <CategoryHeader category={group.category} />
      {group.items.map((skill) => (
        <SkillTag
          key={skill.name}
          name={skill.name}
          priority={skill.priority}
          usage={skill.usage}
        />
      ))}
    </Fragment>
  );
}

function renderSep() {
  return (
    <span
      className="shrink-0 mx-1 text-sm select-none"
      style={{ color: "var(--border-strong)" }}
    >
      ◆
    </span>
  );
}

/* ═══════════════════════════════════════════════════
   Education — 教育背景（不变）
   ═══════════════════════════════════════════════════ */
function Education() {
  return (
    <div
      className="reveal mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 rounded-2xl p-6 md:p-7"
      style={{
        background: "var(--bg-base)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div
        className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: "var(--brand-orange)",
          color: "#FFFFFF",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3zm0 8.18L5.18 9 12 5.82 18.82 9 12 11.18zM5 13.39v3.7c0 1.5 3.13 2.91 7 2.91s7-1.41 7-2.91v-3.7l-7 3.82-7-3.82z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-xs font-mono tracking-widest uppercase mb-1"
          style={{ color: "var(--brand-orange)" }}
        >
          / Education
        </p>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span
            className="font-display text-lg font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            宁波财经学院
          </span>
          <span
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            · 电子商务（本科）
          </span>
        </div>
      </div>
      <div
        className="font-mono text-sm shrink-0"
        style={{ color: "var(--text-tertiary)" }}
      >
        2020.09 — 2022.06
      </div>
    </div>
  );
}
