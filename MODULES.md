# 作品集官网 · 模块说明

> 每个文件就是一个**独立可调的功能块**，改任何一块都不会影响其他模块。
> 所有静态数据（项目 / 联系方式 / 时间线）集中在 `src/lib/data.ts`，改一处全站生效。

---

## 📁 文件结构

```
src/
├── App.tsx                  # 主布局：拼装 5 个 section
├── main.tsx                 # 入口
├── index.css                # 设计 token（CSS 变量 + 工具类）
│
├── lib/
│   ├── data.ts              # ⭐ 集中数据：PROJECTS / NAV_ITEMS / CONTACT / HERO_STATS
│   └── utils.ts             # cn() class 合并工具
│
└── components/              # 每个 .tsx = 1 个功能模块
    ├── NavBar.tsx           # 顶部导航（fixed, 滚动变白底）
    ├── Hero.tsx             # 首屏：左文案 + 右 MacWindow
    ├── MacWindow.tsx        # ⭐ Hero 核心：macOS 风格窗口 + 3 tab 自动轮播
    ├── About.tsx            # "比业务更懂 AI" + 雷达图 + 工作经历
    ├── Projects.tsx         # 3 列项目网格 + Modal 状态管理
    ├── ProjectCard.tsx      # 单个项目卡片
    ├── ProjectModal.tsx     # 屏幕居中 Modal：完整 STAR 详情
    ├── Evidence.tsx         # Token 截图 + 项目交付里程碑
    ├── Contact.tsx          # 联系信息 + 简历下载
    ├── RadarChart.tsx       # 纯 SVG 雷达图（无依赖）
    └── Terminal.tsx         # （备用）终端打字动画，未在 Hero 中启用
```

---

## 🎨 设计 Token（在 `index.css` 改，全站生效）

```css
:root {
  --bg-base: #FAF3E7;        /* 暖米色背景 */
  --bg-elevated: #FFFFFF;     /* 卡片白 */
  --bg-elevated-2: #F5EBD8;   /* 暖色次级背景 */
  --text-primary: #1F1A14;    /* 主文字 */
  --brand-orange: #D86A3A;    /* 主品牌色（暖橙） */
  --brand-amber: #E0A03A;     /* 辅：琥珀 */
  --brand-rust: #B14A20;      /* 深：铁锈红 */
  --accent-success: #2D8659;  /* 墨绿 */
  --accent-info: #3A6D9F;     /* 暖蓝 */
}
```

要改主色，只改 `--brand-orange` 即可。

---

## 🔧 想调整某个模块？看这里

| 想改的内容 | 改哪个文件 | 改什么 |
|---|---|---|
| **3 个项目的内容** | `src/lib/data.ts` | `PROJECTS` 数组的每个对象（title / situation / action / result / techStack） |
| **导航 4 个菜单** | `src/lib/data.ts` | `NAV_ITEMS` 数组 |
| **顶部联系方式** | `src/lib/data.ts` | `CONTACT` 对象 |
| **Hero 3 个数字徽章** | `src/lib/data.ts` | `HERO_STATS` 数组 |
| **Hero 大标题文案** | `src/components/Hero.tsx` | 第 28 行的 `<h1>` 标签内文字 |
| **MacWindow 轮播速度** | `src/components/MacWindow.tsx` | 第 13 行的 `4000` 毫秒数 |
| **MacWindow 顶部窗口名** | `src/components/MacWindow.tsx` | 第 41 行的 `weiwei-portfolio.app` |
| **雷达图 6 维分数** | `src/lib/data.ts` | `RADAR_DIMENSIONS` 数组 |
| **工作经历时间线** | `src/lib/data.ts` | `TIMELINE` 数组 |
| **主色（暖橙 → 其他）** | `src/index.css` | `:root` 中的 `--brand-orange` |
| **背景色（暖米 → 其他）** | `src/index.css` | `:root` 中的 `--bg-base` |
| **字体** | `src/index.css` | `body` 的 `font-family` + `tailwind.config.js` 的 `fontFamily` |
| **整站布局顺序** | `src/App.tsx` | `<main>` 内的 5 个 section 顺序 |

---

## 🚀 本地开发

```bash
cd /Users/hutou/Desktop/简历/portfolio-site
npm run dev      # 起本地服务器（默认 5173 端口）
npm run build    # 产出 dist/ 目录
npm run preview  # 预览 build 产物
```

部署：执行 `npm run build` 后用 `workbuddy_cloudstudio_deploy` 上传 `dist/` 目录。

---

## ✅ 当前部署

线上预览：https://c7058823401340faa4b052e75d973aad.app.codebuddy.work

| 区块 | 状态 |
|---|---|
| NavBar 滚动变白 | ✅ |
| Hero MacWindow 自动轮播 | ✅ |
| Hero MacWindow 点击 tab 切换 | ✅ |
| Projects 3 列卡片 | ✅ |
| ProjectModal 屏幕居中 + ESC 关闭 | ✅ |
| RadarChart 6 维 | ✅ |
| Evidence Token 截图 3 张 + 第 4 占位 | ✅ |
| Contact 邮箱/手机/地址/简历下载 | ✅ |
| 暗色模式 | ❌ 锁死浅色（按方案决策） |
| 移动端 | ✅ 单列自适应 |

---

**下一步可以调的事（你直接说）**：
- [ ] 把 3 个项目换成别的（如需补充第 4 个项目）
- [ ] 加一个"AI 培训"独立 section（从 About 中拆出来）
- [ ] 加英文版 / i18n 切换
- [ ] 加 iPad 横向布局
- [ ] 加上 meta tag（SEO / 分享卡片）
