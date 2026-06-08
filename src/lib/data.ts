// 静态数据 — 不依赖远程 API
// 部署时整站纯静态，构建产物可放在任何 CDN/EdgeOne Pages

export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "项目集", href: "#works" },
  { label: "关于", href: "#about" },
  { label: "技能", href: "#skills" },
  { label: "实证", href: "#evidence" },
  { label: "联系", href: "#contact" },
];

export type Project = {
  id: string;
  /** 详情页路由 slug，与 projectDetails.ts 的 slug 一致 */
  slug: string;
  number: string;
  acronym: string;
  title: string;
  subtitle: string;
  /** 一句话电梯演讲（用于紧凑场景，如 MacWindow / Hero） */
  summary: string;
  tags: string[];
  situation: string;
  task: string;
  action: string[];
  result: { metric: string; value: string }[];
  techStack: string[];
  reflection: string[];
  /** Markdown 技术文档的静态路径（public/docs/），用于「查看完整技术文档」弹窗 */
  docPath: string;
  /** 文档字数（用于按钮上展示"全文 X 行"） */
  docLineCount?: number;
  /** 项目预览缩略图（public/projects/） */
  previewImage: string;
  gradient: string;
  accent: "indigo" | "violet" | "pink";
};

export const PROJECTS: Project[] = [
  {
    id: "fuqing-crm",
    slug: "fuqing-crm-analytics",
    number: "01",
    acronym: "CRM",
    title: "芙清 CRM 客户分析系统",
    subtitle: "企业级数据中台 · 0-1 主力 · 1030 万订单 / 410 万用户",
    summary: "皮肤学护肤品牌的内部数据中台：1030 万订单 / 410 万用户，单人维护，ETL 提速 10x。",
    tags: ["数据中台", "ETL", "自助分析", "FastAPI", "DuckDB"],
    docPath: "/docs/fuqing-crm.md",
    previewImage: "/projects/fuqing-crm.svg",
    situation:
      "芙清作为皮肤学级护肤品牌，2020-2026 年累计沉淀 1030 万订单 / 410 万用户。原 BI 系统只能给固定报表，每次新需求都要排队等数据团队，运营 70% 时间花在「等数据」上。",
    task: "从 0 到 1 设计并主导开发一套企业级数据中台，让业务方（运营 / 客服 / 管理层）能自助做老客健康、RFM、人群流转、品类分析等多维分析。",
    action: [
      "0-1 主导架构：FastAPI + Vue3 + DuckDB 1.5.2（钉死版本）+ Pydantic v2，语义层 / 契约层 / 服务层三段式分层",
      "设计 12 步 Git 工作流（commit 前 review / push 前 pytest / merge 前 qa）+ CI/CD 防线",
      "ETL 增量更新从 10 分钟优化到 1 分钟（RFM 3x 加速，GROUPING SETS 减半扫描次数）",
      "6 道 ETL 门禁 + 6 层磁盘治理（55GB DuckDB 不爆盘），149 个单元测试全绿 / 391+ passed",
      "每日 9 点自动推送运营洞察至飞书（launchd 调度 com.fuqing.etl.daily）",
      "输出 7 份架构文档（CLAUDE.md / PRD-v3.0 / 飞书版架构文档 / CHANGELOG）",
    ],
    result: [
      { metric: "业务自助取数", value: "0% → 80%+" },
      { metric: "ETL 提速", value: "10x" },
      { metric: "后端代码量", value: "16,395 行" },
      { metric: "测试用例", value: "391+ 通过" },
    ],
    techStack: [
      "Python 3.13+",
      "FastAPI",
      "Vue 3 + Vite 5",
      "DuckDB 1.5.2",
      "ECharts 5",
      "Pydantic v2",
      "pytest",
      "ruff",
      "macOS launchd",
    ],
    reflection: [
      "RFM 缓存陈旧 bug：ETL 续传后行数变了但缓存没刷 → 缓存失效要三重检测（mtime + 行数 + TTL）",
      "DuckDB 并发崩溃：多线程访问同一连接 → 自己写 ThreadSafeConnection 包装器",
      "修复引入新 bug：workflow audit 必须从 5 个并行 agent 视角反向验证",
    ],
    gradient: "from-indigo-500/20 via-violet-500/20 to-pink-500/20",
    accent: "indigo",
  },
  {
    id: "dafuyan-wording",
    slug: "dafuyan-wording",
    number: "02",
    acronym: "RAG",
    title: "达肤妍客服话术检索系统",
    subtitle: "本地化 RAG 工具 · 4 路 RRF 融合 · 3 秒找话术",
    summary: "单品牌客服培训工具：4 路 RRF 融合检索，521 条话术，3 秒内找到精准回复。",
    tags: ["RAG", "RRF 融合", "FastAPI", "本地化", "FAISS"],
    docPath: "/docs/dafuyan-wording.md",
    previewImage: "/projects/dafuyan-wording.svg",
    situation:
      "达肤妍客服每天处理 200+ 询单，平均响应 30 秒+。客户问「敏感肌可以用吗」对应 7 个话术片段，找话术比回答还慢。飞书文档全文搜索召回率 < 40%，客服宁愿问老员工。",
    task: "设计并开发一个本地化 RAG 检索系统，让客服 3 秒内找到精准话术，并把新人培训周期从 2 周压到 3 天。",
    action: [
      "核心创新：4 路 RRF 融合检索（FAISS 语义向量 + BM25 关键词 + search_questions 精确问题匹配 + TF-IDF 稀疏向量），权重经反复实验调优",
      "7 大分类话术库（售前/售后/产品 QA/皮肤知识/快捷短语/平台专属/SOP），合并 521 条",
      "多维打分器 × 8 + 过滤器 × 4 + ReRank 语义重排（lambda=0.4），TopK 选 20 留重排空间",
      "皮肤知识库接入 PubMed（皮肤科学论文检索，提供差异化卖点）",
      "完整工程化：Git 12 步 + module.json + Schema 三同步 + 6 道门禁 + 飞书 webhook 告警",
      "前端覆盖搜索/收藏/学习路径/测验/场景模拟/管理后台/审批流程全链路",
    ],
    result: [
      { metric: "找话术时间", value: "30s → 3s (10x)" },
      { metric: "召回率", value: "40% → 90%+" },
      { metric: "新人培训", value: "2 周 → 3 天" },
      { metric: "本地化部署", value: "0 云依赖" },
    ],
    techStack: [
      "Python 3.13+",
      "FastAPI",
      "FAISS 1.7+",
      "text2vec-base-chinese",
      "BM25",
      "TF-IDF",
      "Vanilla JS",
      "PubMed API",
    ],
    reflection: [
      "Dense 检索权重不能太高 → 高于阈值反而把长尾 query 拉偏，权重是反复实验调出来的",
      "业务元数据设计 > 模型选择：search_questions 字段（精确问题）比 content 召回精准 2 倍",
      "3 秒响应是硬约束：再准但慢，客服不会用 → 性能 vs 精度要 trade-off",
    ],
    gradient: "from-violet-500/20 via-pink-500/20 to-rose-500/20",
    accent: "violet",
  },
  {
    id: "dmp-scraper",
    slug: "dmp-data-scraper",
    number: "03",
    acronym: "DMP",
    title: "达摩盘 DMP 数据自动化",
    subtitle: "Playwright 浏览器自动化 · 6 道门禁 · T+1 每日 0 干预",
    summary: "千牛/达摩盘 SPA 自动化：15 个商品 + 8 阶段流转，T+1 每日自动抓取，6 道门禁保证数据干净。",
    tags: ["Playwright", "反检测", "数据采集", "T+1 自动化"],
    docPath: "/docs/dmp-scraper.md",
    previewImage: "/projects/dmp-scraper.svg",
    situation:
      "品牌方在达摩盘后台有 3 块核心数据资产（人群诊断 AIPL / 7 阶段流转 / 14 个核心单品）。原来每次都要运营手动登录、选日期、截图、Excel 整理，平均一个数据产品 1.5 小时，3 块 = 半天没了。",
    task: "把 3 块数据产品全部自动化，做到 T+1 每日 0 干预，输出干净 CSV 给前端看板用。",
    action: [
      "Playwright + launch_persistent_context 保活登录态（chrome_profile/ 持久化 cookie），T+1 自动跳过登录",
      "三大模块：资产诊断 (--assets) / 流转数据 (--flow) / 单品洞察 (--items) → data2.csv / data.csv / data3.csv",
      "单品洞察 15 个 SKU（含 1 个新品「传明酸面膜」），data3.csv 累计 7040 行 × 9 列",
      "10 层反检测：add_init_script 注入 navigator.webdriver = false（早于所有页面 JS，无法被检测为「注入」）",
      "6 道数据门禁：API 健康 / 业务平滑性 / 跨日合理性 / 复制日检测 / 子字段不超总量 / 历史回填补抓",
      "浏览器崩溃静默恢复 + 60 秒延迟重试，断点续传 completed_items.json",
    ],
    result: [
      { metric: "数据产品", value: "3 块全自动化" },
      { metric: "单品覆盖", value: "15 个 SKU" },
      { metric: "data3.csv", value: "7040 行 × 9 列" },
      { metric: "运行模式", value: "T+1 0 干预" },
    ],
    techStack: [
      "Python 3.13+",
      "Playwright 1.40+",
      "Chromium 持久化",
      "lark-cli",
      "PyYAML",
      "numpy",
      "ruff",
    ],
    reflection: [
      "CSV 是不可变历史：data3.csv 只追加不覆盖，历史上留了 6 个 data3_pre_*.csv 备份链",
      "5/15 商品清单是硬约束：商品 ID 不可增删，CLAUDE.md 红线",
      "反检测要早于页面 JS：add_init_script 在 navigation 之前注入，否则会被识别为「注入」",
    ],
    gradient: "from-pink-500/20 via-rose-500/20 to-orange-500/20",
    accent: "pink",
  },
];

// 能力雷达图数据
export const RADAR_DIMENSIONS = [
  { name: "AI 落地", value: 9 },
  { name: "业务 sense", value: 8 },
  { name: "工程能力", value: 7 },
  { name: "数据能力", value: 8 },
  { name: "培训赋能", value: 8 },
  { name: "表达协作", value: 7 },
];

// 工作时间线
export const TIMELINE = [
  {
    year: "2025.06 - 至今",
    role: "会员运营 & AI 业务赋能师",
    company: "芙清生物科技（线上事业部）",
    highlight: "3 人顶 5 人编制 / 6 大项目 / 40 亿+ token / 培训 40+ 人",
  },
  {
    year: "2022.09 - 2025.06",
    role: "用户运营",
    company: "乐麦信息技术（杭州）",
    highlight: "娇兰/SK-II 私域 / 短信 ROI 1:5→1:15 / 双 11 止损 230 万",
  },
  {
    year: "2021.04 - 2022.08",
    role: "会员运营",
    company: "杭州壹网壹创",
    highlight: "欧珀莱 / 派样 TOP13 / 入会 +19% / 新客率 8%→25%",
  },
  {
    year: "2020.03 - 2020.09",
    role: "运营助理（实习）",
    company: "杭州湃沃",
    highlight: "天猫服装 / 生意参谋复盘",
  },
];

// 教育背景
export const EDUCATION = {
  school: "宁波财经学院",
  major: "电子商务（本科）",
  period: "2020.09 - 2022.06",
};

// 联系方式
export const CONTACT = {
  email: "zjhzweiw@163.com",
  city: "杭州 · 西湖区",
  expectedSalary: "期望 20K",
  phone: "13735239043",
  github: "https://github.com/weiweity",
  resumeUrl: "/resume.pdf",
};

// 专业技能（按 PDF v3 校准）
export type Skill = {
  name: string;
  usage?: string;
  priority: "主力" | "熟练" | "了解";
};

export const SKILLS: { category: string; items: Skill[] }[] = [
  {
    category: "AI Agent 编排",
    items: [
      { name: "WorkBuddy", usage: "办公", priority: "主力" },
      { name: "Claude Code", usage: "编程", priority: "主力" },
      { name: "Codex", usage: "审核", priority: "熟练" },
      { name: "Marvis", usage: "文档", priority: "熟练" },
    ],
  },
  {
    category: "技术",
    items: [
      { name: "Python", priority: "主力" },
      { name: "SQL", priority: "主力" },
      { name: "FastAPI", priority: "主力" },
      { name: "Vue3", priority: "熟练" },
      { name: "DuckDB", priority: "主力" },
      { name: "RAG 检索", priority: "主力" },
      { name: "Prompt Engineering", priority: "主力" },
    ],
  },
  {
    category: "大模型",
    items: [
      { name: "MiniMax", usage: "主力", priority: "主力" },
      { name: "Kimi", priority: "熟练" },
      { name: "GLM", priority: "熟练" },
      { name: "DeepSeek", priority: "熟练" },
      { name: "Mimo", priority: "熟练" },
      { name: "GPT", priority: "熟练" },
      { name: "Qwen", priority: "熟练" },
    ],
  },
  {
    category: "用户运营",
    items: [
      { name: "RFM 分层", priority: "主力" },
      { name: "AB 测试", priority: "主力" },
      { name: "跨渠道增长", priority: "熟练" },
      { name: "会员体系搭建", priority: "主力" },
      { name: "SOP 搭建", priority: "主力" },
    ],
  },
  {
    category: "电商工具",
    items: [
      { name: "达摩盘", priority: "熟练" },
      { name: "数云", priority: "熟练" },
      { name: "生意参谋", priority: "主力" },
      { name: "客道 CRM", priority: "主力" },
      { name: "数据赢家", priority: "熟练" },
    ],
  },
];

// Token 实证截图
export const TOKEN_SCREENSHOTS = [
  { src: "/tokens/mimo.png", label: "mimo 后台 · 2亿+ token", date: "2025 Q4", ratio: "16/8" as const },
  { src: "/tokens/mimo2.png", label: "mimo 后台 · 累计消耗 9亿+", date: "2026 Q1", ratio: "16/5" as const },
  { src: "/tokens/minimax.png", label: "MiniMax · 长期项目消耗 32亿+", date: "2026 Q2", ratio: "16/5" as const },
];

// 项目集导航下拉菜单
export const PROJECT_NAV_DROPDOWN = [
  { label: "芙清 CRM 客户分析系统", slug: "fuqing-crm-analytics" },
  { label: "达肤妍客服话术检索系统", slug: "dafuyan-wording" },
  { label: "达摩盘 DMP 数据自动化", slug: "dmp-data-scraper" },
];

// Hero 区数字徽章
export const HERO_STATS = [
  { value: "40亿+", label: "AI token 真实消耗", color: "violet" as const },
  { value: "3 = 5", label: "3 人顶 5 人编制（2HC 招不到，AI 顶替）", color: "warm" as const },
  { value: "1030万", label: "订单数据治理", color: "success" as const },
];
