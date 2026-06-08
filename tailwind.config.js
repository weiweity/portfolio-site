/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        md: "2rem",
        lg: "3rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // 暖色浅色主题（cCSwitch / macOS 暖米色风格）
        base: "#FAF3E7",            // 暖米色背景
        elevated: "#FFFFFF",         // 卡片白
        "elevated-2": "#F5EBD8",     // 暖色次级背景
        overlay: "#FFFAF0",          // 最浅暖白
        ink: {
          primary: "#1F1A14",        // 近黑暖色
          secondary: "#5C5347",      // 中性暖灰
          tertiary: "#8A7F6E",       // 暖灰
          muted: "#B5AB99",          // 浅暖灰
        },
        brand: {
          orange: "#D86A3A",         // 主品牌色：暖橙
          amber: "#E0A03A",          // 辅：暖琥珀
          rust: "#B14A20",           // 深：铁锈红
          cream: "#FAF3E7",          // 米色
        },
        accent: {
          warm: "#D86A3A",           // 暖橙
          success: "#2D8659",        // 墨绿
          info: "#3A6D9F",           // 暖蓝
        },
        // macOS 窗控色
        mac: {
          red: "#FF5F57",
          yellow: "#FEBC2E",
          green: "#28C840",
        },
      },
      fontFamily: {
        sans: ['"Inter"', '"PingFang SC"', '"Noto Sans SC"', "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Inter"', '"PingFang SC"', '"Noto Sans SC"', "sans-serif"],
        mono: ['"JetBrains Mono"', '"Fira Code"', '"SF Mono"', "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter2: "-0.02em",
      },
      maxWidth: {
        shell: "1200px",
      },
      boxShadow: {
        // 暖色阴影（替代冷色蓝黑阴影）
        sm: "0 1px 2px 0 rgba(120, 80, 30, 0.06)",
        DEFAULT: "0 2px 4px 0 rgba(120, 80, 30, 0.08)",
        md: "0 4px 12px -2px rgba(120, 80, 30, 0.10)",
        lg: "0 12px 32px -8px rgba(120, 80, 30, 0.14)",
        xl: "0 24px 48px -12px rgba(120, 80, 30, 0.18)",
        "mac-window": "0 30px 60px -20px rgba(120, 80, 30, 0.25), 0 10px 20px -8px rgba(120, 80, 30, 0.12)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "tab-fade": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "progress-grow": {
          "0%": { width: "0%" },
          "100%": { width: "var(--progress, 0%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out forwards",
        "tab-fade": "tab-fade 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
