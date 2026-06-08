# Portfolio Site — 交接文档

> 生成时间：2026-06-04 00:24
> 作者：WorkBuddy（前序 Agent）
> 用途：供后续 Agent 接管前端迭代任务

---

## 1. 项目定位

个人作品集前端页面，用于转行求职（用户运营 → AI 方向）。单页应用，5 个内容区块，极简设计风格。

核心受众：招聘方技术负责人 / HR
核心目标：用一页证明「业务侧的 AI Native 操盘手」能力

---

## 2. 技术栈

| 层级 | 技术 |
|------|------|
| 构建工具 | Vite 6.x |
| 框架 | React 19 + TypeScript |
| 样式 | Tailwind CSS 3.x |
| 字体 | Cormorant Garamond（标题衬线）+ Manrope（正文无衬线） |
| 图标 | Lucide React |
| 动画 | Framer Motion |

---

## 3. 目录结构

```
portfolio-site/
├── dist/                    # 构建产物（当前可直接部署）
│   ├── index.html           # ✅ 入口（已修复相对路径）
│   ├── assets/              # JS/CSS 打包文件
│   └── favicon.svg
├── src/
│   ├── main.tsx             # React 入口
│   ├── App.tsx              # 根组件
│   ├── index.css            # Tailwind 指令 + 自定义样式
│   └── components/
│       ├── HeroSection.tsx       # 首屏：姓名 + 定位 + 数据指标
│       ├── AboutSection.tsx      # 关于：3 句话自我介绍
│       ├── ProjectsSection.tsx   # 项目：6 张卡片
│       ├── MetricsSection.tsx    # 数据：4 个核心指标
│       └── ContactSection.tsx    # 联系：邮箱 + GitHub + 文案
├── index.html               # 开发模式入口（不要直接打开）
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── HANDOFF.md               # 本文件
```

---

## 4. 构建与预览

```bash
# 进入项目目录
cd /Users/hutou/Desktop/简历/portfolio-site

# 安装依赖
npm install

# 开发模式（带热更新）
npm run dev

# 生产构建（输出到 dist/）
npm run build
```

**重要**：构建后预览必须用 HTTP 服务，不能用 `file://` 直接打开：

```bash
# 方式一：Python 内置服务器
cd dist && python3 -m http.server 8768

# 方式二：npx serve
npx serve dist
```

然后访问 `http://localhost:8768`

> ⚠️ 直接双击 `dist/index.html` 会因 CORS 策略导致 JS/CSS 加载失败。

---

## 5. 已修复的问题记录

| 问题 | 原因 | 修复方式 |
|------|------|---------|
| CORS 报错，页面空白 | Vite 构建产物使用绝对路径 `/assets/...`，在 `file://` 协议下被视为跨域 | 将 `dist/index.html` 中的 3 处路径改为相对路径：`./assets/...` 和 `./favicon.svg` |
| 用户误开根目录 index.html | 根目录 `index.html` 是 Vite 开发入口，含 `<script src="/src/main.tsx">`，仅用于 `npm run dev` | 已明确告知用户必须打开 `dist/index.html` |

**当前状态**：dist 目录已可正常通过 HTTP 服务访问，页面渲染正常。

---

## 6. 待办清单（后续迭代方向）

### P0 — 内容更新
- [ ] **项目卡片文案**：目前用的是占位描述，需根据 `简历v2.0.md` 中的 6 个项目 STAR 替换为真实内容
- [ ] **数据指标更新**：MetricsSection 中的 4 个数字目前是占位值，需填入真实数据
- [ ] **About 文案**：目前 3 句话为通用模板，需根据用户实际经历定制

### P1 — 功能增强
- [ ] **项目详情页/弹窗**：点击卡片后展开完整 STAR 描述（目前卡片只有摘要）
- [ ] **深色模式切换**：当前只有 light 模式，考虑增加 dark mode toggle
- [ ] **响应式优化**：移动端布局需进一步测试和微调
- [ ] **SEO 优化**：补充 Open Graph meta 标签、结构化数据

### P2 — 部署
- [ ] **静态部署**：可部署到 Vercel / Cloudflare Pages / GitHub Pages
- [ ] **自定义域名**：如有需要可绑定个人域名

### P3 — 体验优化
- [ ] **加载动画**：首屏数据指标可增加数字递增动画
- [ ] **图片懒加载**：如有项目截图，需加懒加载
- [ ] **性能优化**：Lighthouse 评分优化（当前未测）

---

## 7. 关键数据来源

前端内容需要引用以下已完成的文档：

| 内容 | 来源文件 |
|------|---------|
| 6 个项目 STAR | `/Users/hutou/Desktop/简历/简历v2.0.md` — 正文「项目经历」部分 |
| 数据指标（40亿token、3→1人效等） | `/Users/hutou/Desktop/简历/工作汇报材料/人效提升与AI工具价值汇报.md` |
| 用户画像与技术栈 | `/Users/hutou/Desktop/简历/.workbuddy/memory/MEMORY.md` |
| 设计规范与配色 | 当前代码中已定义：主色 `#1a1a2e`、强调色 `#e07a5f`、背景 `#f8f5f2` |

---

## 8. 用户偏好（必须遵守）

- **极简设计**：不要花哨，留白要足
- **行动导向**：文案要结果导向，不要堆砌过程
- **不要 AI 味**：如有大段文本，用 `anti-distill` skill 去味
- **中文为主**：页面面向国内招聘方

---

## 9. 已知限制

- 当前为单页应用，无路由
- 无后端，纯静态
- 项目卡片无展开/详情功能
- 未接入任何分析工具（GA/Clarity 等）

---

## 10. 快速开始（给接手 Agent）

```bash
# 1. 读取本文件，了解上下文
# 2. 读取简历内容，准备替换文案
cat /Users/hutou/Desktop/简历/简历v2.0.md

# 3. 启动开发服务器
cd /Users/hutou/Desktop/简历/portfolio-site
npm run dev

# 4. 修改 src/components/ 下的组件文件
# 5. 构建并预览
npm run build
cd dist && python3 -m http.server 8768
```

---

如有疑问，先读 `/Users/hutou/Desktop/简历/.workbuddy/memory/MEMORY.md` 了解用户画像。
