import { useState, useEffect, useCallback } from "react";
import { TOKEN_SCREENSHOTS } from "../lib/data";
import { ChevronLeft, ChevronRight, Award, Gift, ExternalLink } from "lucide-react";

function TokenCarousel() {
  const [idx, setIdx] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const total = TOKEN_SCREENSHOTS.length;

  const go = useCallback(
    (dir: number) => {
      setIdx((i) => (i + dir + total) % total);
    },
    [total]
  );

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => go(1), 5000);
    return () => clearInterval(timer);
  }, [go]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart == null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
    setTouchStart(null);
  };

  return (
    <div className="relative">
      <div
        className="overflow-hidden rounded-2xl"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-subtle)",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {TOKEN_SCREENSHOTS.map((img) => (
            <div
              key={img.src}
              className="w-full shrink-0"
            >
              {/* 点击打开大图 */}
              <a
                href={img.src}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative overflow-hidden"
                style={{ background: "var(--bg-elevated-2)" }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full object-contain"
                  style={{ maxHeight: "420px" }}
                  loading="lazy"
                />
                {/* hover 遮罩 + 图标 */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                  <ExternalLink
                    className="h-6 w-6 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300"
                    strokeWidth={2}
                  />
                </div>
              </a>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {img.label}
                  </div>
                  <div
                    className="text-xs font-mono mt-0.5"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {img.date}
                  </div>
                </div>
                <a
                  href={img.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono flex items-center gap-1 px-2 py-1 rounded-md transition-colors"
                  style={{
                    color: "var(--brand-orange)",
                    background: "rgba(216,106,58,0.06)",
                  }}
                >
                  查看大图
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 左右箭头 */}
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="上一张"
        className="absolute left-2 top-[40%] -translate-y-1/2 h-8 w-8 rounded-full flex items-center justify-center transition-all"
        style={{
          background: "rgba(255,255,255,0.85)",
          border: "1px solid var(--border-subtle)",
          color: "var(--text-secondary)",
          backdropFilter: "blur(4px)",
        }}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="下一张"
        className="absolute right-2 top-[40%] -translate-y-1/2 h-8 w-8 rounded-full flex items-center justify-center transition-all"
        style={{
          background: "rgba(255,255,255,0.85)",
          border: "1px solid var(--border-subtle)",
          color: "var(--text-secondary)",
          backdropFilter: "blur(4px)",
        }}
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* 指示点 */}
      <div className="flex justify-center gap-2 mt-3">
        {TOKEN_SCREENSHOTS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIdx(i)}
            aria-label={`第 ${i + 1} 张`}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: i === idx ? "24px" : "8px",
              background:
                i === idx ? "var(--brand-orange)" : "var(--border-strong)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function Evidence() {
  return (
    <section
      id="evidence"
      className="relative py-24 md:py-32"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="container-shell px-5 md:px-8 lg:px-12">
        <div className="reveal max-w-2xl mb-16">
          <p
            className="text-sm font-mono tracking-widest uppercase"
            style={{ color: "var(--brand-orange)" }}
          >
            / Evidence
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter2">
            不只是 PPT，
            <br />
            <span className="gradient-text">有实证截图。</span>
          </h2>
          <p
            className="mt-6 text-base md:text-lg leading-relaxed text-pretty"
            style={{ color: "var(--text-secondary)" }}
          >
            「40 亿+ token」不是一句话，是后台真实消耗的截图。下面 3 张图是 mimo / MiniMax 后台的实际累计数据。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Token 截图轮播 */}
          <div className="reveal lg:col-span-3">
            <p
              className="text-sm font-mono tracking-widest uppercase mb-4"
              style={{ color: "var(--text-tertiary)" }}
            >
              / Token 消耗实证
            </p>
            <TokenCarousel />
          </div>

          {/* mimo 项目激励计划 */}
          <div className="reveal lg:col-span-2">
            <p
              className="text-sm font-mono tracking-widest uppercase mb-4"
              style={{ color: "var(--text-tertiary)" }}
            >
              / mimo 项目激励计划
            </p>
            <div
              className="card-soft overflow-hidden"
              style={{ borderColor: "var(--border-accent)" }}
            >
              {/* 头部 */}
              <div
                className="px-5 py-4 flex items-center gap-3"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(216,106,58,0.08) 0%, rgba(224,160,58,0.06) 100%)",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: "var(--brand-orange)" }}
                >
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div
                    className="text-base font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    659 元获益
                  </div>
                  <div
                    className="text-xs font-mono"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    Xiaomi MiMo Orbit · 创造者激励计划
                  </div>
                </div>
              </div>

              {/* 图片列表 — 完整展示，不裁切 */}
              <div className="p-4 space-y-3">
                <a
                  href="/tokens/mimo-orbit.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-xl"
                  style={{
                    border: "1px solid var(--border-subtle)",
                    background: "var(--bg-elevated-2)",
                  }}
                >
                  <div className="relative overflow-hidden p-2">
                    <img
                      src="/tokens/mimo-orbit.png"
                      alt="入选 Xiaomi MiMo Orbit 创造者激励计划"
                      className="w-full object-contain rounded-lg group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* hover 遮罩 */}
                    <div className="absolute inset-2 flex items-center justify-center rounded-lg bg-black/0 group-hover:bg-black/15 transition-colors duration-300">
                      <ExternalLink
                        className="h-5 w-5 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300"
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                  <div className="px-3 py-2 flex items-center gap-2">
                    <Gift
                      className="h-3.5 w-3.5 shrink-0"
                      style={{ color: "var(--brand-orange)" }}
                    />
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      正式入选百万亿 Token 创造者激励计划
                    </span>
                  </div>
                </a>

                <a
                  href="/tokens/mimo-reward.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-xl"
                  style={{
                    border: "1px solid var(--border-subtle)",
                    background: "var(--bg-elevated-2)",
                  }}
                >
                  <div className="relative overflow-hidden p-2">
                    <img
                      src="/tokens/mimo-reward.png"
                      alt="Token Plan 权益到账"
                      className="w-full object-contain rounded-lg group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-2 flex items-center justify-center rounded-lg bg-black/0 group-hover:bg-black/15 transition-colors duration-300">
                      <ExternalLink
                        className="h-5 w-5 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300"
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                  <div className="px-3 py-2 flex items-center gap-2">
                    <Gift
                      className="h-3.5 w-3.5 shrink-0"
                      style={{ color: "var(--brand-orange)" }}
                    />
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      赠送 Token Plan 权益自动到账
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
