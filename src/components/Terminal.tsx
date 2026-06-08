import { useEffect, useState } from "react";

const LINES: { type: "cmd" | "output" | "comment"; text: string }[] = [
  { type: "cmd", text: "$ whoami" },
  { type: "output", text: "weiwei — AI 赋能型操盘手" },
  { type: "cmd", text: "$ cat profile.json" },
  {
    type: "output",
    text: '{ "years_ops": 5, "years_ai": 1, "projects": 6, "tokens": "4B+", "stack": ["Python", "FastAPI", "RAG", "DuckDB", "Vue3"] }',
  },
  { type: "comment", text: "# 上线状态：随时可聊，可面谈，可演示 demo" },
];

export function Terminal() {
  const [displayed, setDisplayed] = useState<{ type: string; text: string }[]>([]);
  const [line, setLine] = useState(0);
  const [char, setChar] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (line >= LINES.length) return;

    const current = LINES[line];
    if (char < current.text.length) {
      const timer = setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev];
          const slice = current.text.slice(0, char + 1);
          if (next[line]) {
            next[line] = { type: current.type, text: slice };
          } else {
            next.push({ type: current.type, text: slice });
          }
          return next;
        });
        setChar((c) => c + 1);
      }, 18);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setLine((l) => l + 1);
        setChar(0);
      }, 180);
      return () => clearTimeout(timer);
    }
  }, [line, char, started]);

  return (
    <div className="terminal inline-block w-full max-w-2xl">
      <div className="flex items-center gap-1.5 mb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-ink-muted">weiwei@portfolio: ~</span>
      </div>
      <div className="space-y-1.5">
        {displayed.map((l, i) => {
          if (l.type === "cmd") {
            return (
              <div key={i}>
                <span className="terminal-prompt">$</span>{" "}
                <span className="terminal-cmd">{l.text.replace(/^\$\s?/, "")}</span>
              </div>
            );
          }
          if (l.type === "comment") {
            return <div key={i} className="text-ink-muted">{l.text}</div>;
          }
          return <div key={i} className="terminal-output pl-4">{l.text}</div>;
        })}
        {line < LINES.length && (
          <span className="inline-block w-2 h-3.5 bg-ink-primary align-middle ml-1 animate-blink" />
        )}
      </div>
    </div>
  );
}
