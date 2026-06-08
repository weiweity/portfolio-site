// 三个项目的「GitHub 项目分享」风格详情页内容
// 每项目 5 章结构：背景 → 架构方案 → 核心技术挑战 → 工程亮点 → 结果与影响
// 第一人称叙事，300-400 字/章，面向招聘官和同行

export type ChapterLevel = "入门" | "中级" | "高级";

export interface Chapter {
  id: string;
  groupId: number;
  groupName: string;
  title: string;
  level: ChapterLevel;
  readingTime: string;
  content: string;
  sources: string[];
}

export interface ProjectGroup {
  id: number;
  name: string;
  chapters: Chapter[];
}

export interface ProjectDetail {
  slug: string;
  repo: string;
  title: string;
  subtitle: string;
  totalReadingTime: string;
  description: string;
  indexedAt: string;
  groups: ProjectGroup[];
  /** 可视化架构方案：架构图 + 流程图 */
  archDiagrams: { label: string; src: string }[];
}

const readingTime = (charCount: number): string => {
  const mins = Math.max(1, Math.ceil(charCount / 300));
  return `${mins} 分钟`;
};

/* =========================================================================
 * Project 1: fuqing-crm-analytics — 5 chapters
 * ========================================================================= */

const f1: Chapter = {
  id: "1.1",
  groupId: 1,
  groupName: "项目故事",
  title: "为什么做这个系统",
  level: "入门",
  readingTime: "",
  content:
    "在芙清做用户运营时，我每天上午都需要从多个 Excel 里拉数据，拼出一份运营日报再发到群里。同样一个「复购率」，三个同事能算出三个结果——因为每个人对\"有效订单\"的定义不一样。**口径不统一、SQL 到处复制粘贴、数据散落各处**，一个简单的分析要花半天。\n\n更麻烦的是，大促期间（618、双11）需要 T+1 看到前一天的单品表现来调整策略，但手动跑数根本来不及。团队编制 3 人 + 计划招 2 个 HC 一直没到位——这个痛点靠加人是解决不了的，必须靠系统。\n\n于是我在 2025 年中开始从零搭建这个 CRM 分析系统。目标很明确：**一个地方存所有数据，一套口径出所有指标，每天 9 点自动推送到飞书**，运营打开手机就能看。",
  sources: [],
};
f1.readingTime = readingTime(f1.content.length);

const f2: Chapter = {
  id: "1.2",
  groupId: 1,
  groupName: "项目故事",
  title: "整体架构怎么设计的",
  level: "中级",
  readingTime: "",
  content:
    "系统采用 **三段式架构**：**语义层 / 契约层 / 服务层**，这是我从这个项目学到的最有价值的设计模式。\n\n**语义层**是系统的唯一真实数据源——所有业务口径（GSV 怎么算、YOY 是除法还是减法、新老客怎么定义）都写在这里。任何服务层要造 SQL，必须从语义层取口径，禁止硬编码。这意味着改一个定义，全局生效，不会出现\"三个同事算出三个复购率\"的问题。\n\n**契约层**用 Pydantic 定义了 135+ 个 Schema 类，FastAPI 自动生成 OpenAPI 文档，前端 TypeScript 类型可以从后端契约自动同步——后端改字段，编译报错，不会到运行时才发现。\n\n**数据层**选了 DuckDB 单文件数据库（55GB），省去了 MySQL/PostgreSQL 的运维负担。配合 DuckDB-KV 缓存 + Manifest 失效机制，RFM 分析这种原来要算几分钟的查询，现在缓存命中后毫秒级返回。",
  sources: [],
};
f2.readingTime = readingTime(f2.content.length);

const f3: Chapter = {
  id: "1.3",
  groupId: 1,
  groupName: "项目故事",
  title: "踩过最深的坑",
  level: "高级",
  readingTime: "",
  content:
    "**第一个坑：DuckDB 并发写入的数据竞态。** 数据量上来后，ETL 批量写入和前端 API 查询可能同时发生。DuckDB 的文件级锁导致 `UNIQUE INDEX` 在高并发下出现 race condition，新数据写不进去。试了同步锁、读写分离都不行，最后通过**拆分事务**（把一个大的 upsert 拆成 2 个独立 transaction）规避了这个问题。锁了 DuckDB 版本在 1.5.2，因为 1.5.3 对这个 bug 并没有修。\n\n**第二个坑：ETL 孤儿文件吃满磁盘。** AI 编程工具在执行调试时频繁 `shutil.copy2` 复制 55GB 的 DuckDB 文件到 `/tmp` 做沙盒测试，但进程退出后不清理。发现时 `/tmp` 已经有 440GB 的孤儿文件。为此设计了**磁盘治理 6 层防护**：从 atexit 钩子到 launchd 定时清理，再到 zshrc 启动告警——每一层防一种漏网场景。这是这个项目里最具实用价值的工程创新。",
  sources: [],
};
f3.readingTime = readingTime(f3.content.length);

const f4: Chapter = {
  id: "1.4",
  groupId: 1,
  groupName: "项目故事",
  title: "这些地方做得比较讲究",
  level: "中级",
  readingTime: "",
  content:
    "**测试覆盖**：后端 **391+ 个 pytest 测试用例**（12 个 skip 的是 DuckDB 版本相关的已知限制），覆盖语义层计算规则、ETL 数据清洗、RFM 区间分配等核心逻辑。pre-commit hook 会拦截 bare except、强制更新 CHANGELOG、检查 import 完整性——这是我给自己设置的工程纪律，保证凌晨改代码不会引入低级错误。\n\n**数据质量**：ETL pipeline 内置 **6 道门禁**——日期合理性、跨日连续性、API 健康检查、业务平滑性、去重验证、壁钟标准差。任何一道门禁报警，飞书群里自动发通知。这让我不用每天手动检查数据有没有跑对。\n\n**部署自动化**：macOS launchd 调度 4 个定时任务（ETL 每日 8:30 / DuckDB 备份 03:30 / 备份清理每周日 / /tmp 孤儿清理每小时），配合 Docker 一键部署。Windows Server 也有对应的 NSSM 配置。",
  sources: [],
};
f4.readingTime = readingTime(f4.content.length);

const f5: Chapter = {
  id: "1.5",
  groupId: 1,
  groupName: "项目故事",
  title: "上线后的变化",
  level: "入门",
  readingTime: "",
  content:
    "系统上线后，最直观的变化是**运营日报从手工 2 小时变为零——每天 9 点飞书自动推送**。运营团队打开手机就能看到前一天的 GMV/GSV、复购率、新老客占比、品类分布、流失预警。经理做周报时点一下「导出 PPT」，不用再到处凑数据。\n\n数据层面，截至 Sprint 8 收口时处理了 **1030 万订单 / 410 万用户**（2020-2026 年），DuckDB 文件 55GB。前端有 17 个分析页面，覆盖老客健康、市场对焦、品类洞察、地域分布、RFM 流转、派样 ROI 等场景。\n\n这个项目也成了我在公司内部分享 AI 工程化的典型案例——一个人用 AI 工具搭建了原来需要半个数据团队才能维护的系统。",
  sources: [],
};
f5.readingTime = readingTime(f5.content.length);

/* =========================================================================
 * Project 2: dafuyan-wording — 5 chapters
 * ========================================================================= */

const d1: Chapter = {
  id: "2.1",
  groupId: 1,
  groupName: "项目故事",
  title: "为什么做这个系统",
  level: "入门",
  readingTime: "",
  content:
    "达肤妍的客服团队每天要回复几百条咨询——从产品成分、使用顺序到过敏处理、售后政策。虽然有标准话术文档，但客服在对接客户时没法快速翻到对应内容，常常凭记忆回答，质量参差不齐。**话术师辛苦维护的知识库，在实战场景里用不起来**。\n\n培训新客服的成本也高：要背几百条话术、记住各种肤质和成分的对应关系、学会判断客户意图。一个新人上手至少要两周。\n\n我的目标是做一个**「客服身边的搜索引擎」**——输入一句话（比如\"客户问我用 B5 面膜过敏了怎么办\"），3 秒内返回最匹配的标准话术，客服直接复制回复。不仅要快，还要安全——过敏场景下不能推荐促销话术，敏感词（\"根治\"\"100%\"）要自动过滤。",
  sources: [],
};
d1.readingTime = readingTime(d1.content.length);

const d2: Chapter = {
  id: "2.2",
  groupId: 1,
  groupName: "项目故事",
  title: "检索方案怎么设计的",
  level: "中级",
  readingTime: "",
  content:
    "核心检索采用 **四路 RRF 融合**（Reciprocal Rank Fusion），这是典型的混合检索架构：\n\n- **语义向量召回（权重 0.45）**：用 `text2vec-base-chinese` 模型把话术 encode 成 768 维向量，FAISS 做余弦相似度检索。客服打的自然语言不需要精确匹配关键词，语义相近就行。\n- **BM25 关键词召回（权重 0.25）**：传统倒排索引，k1=1.5, b=0.75, 2-gram 分词。补语义检索对精确术语（如\"传明酸\"）不够敏感的问题。\n- **search_questions 精确匹配（权重 0.20）**：每条话术附带话术师预先写好的\"客户可能这么问\"，精准对应高频场景。\n- **TF-IDF 稀疏向量（权重 0.10）**：兜底通道，8163 词词典。\n\n四路结果 RRF 融合后，再叠加 **ReRank 语义重排**（lambda=0.4），最终选 Top20 展示。整个过程在浏览器内完成——前端引擎用 Vanilla JS 实现了完整的搜索 pipeline，不依赖后端接口，几乎零延迟。",
  sources: [],
};
d2.readingTime = readingTime(d2.content.length);

const d3: Chapter = {
  id: "2.3",
  groupId: 1,
  groupName: "项目故事",
  title: "最棘手的三个技术问题",
  level: "高级",
  readingTime: "",
  content:
    "**1. 异构数据结构的统一**：话术来自飞书 Excel，转换后存为 JSON。但售前 SOP、产品 QA、明星专项三种内容用了不同的数据结构——产品 QA 是 `{products: {name: {qaList: []}}}`，明星专项有 `celebrityId` 字段，其他 SOP 是 `{data: [{nodeId, content}]}`。我在 DataStore 层写了三个 `_parse_*` 方法，全部归一化为统一的 `ScriptItem` 内存模型，上游无感知。\n\n**2. 前端搜索引擎的懒加载与降级**：BM25、TFIDF、ReRank 三个引擎要串行初始化（ReRank 依赖 BM25 的 tokenizer），任何一个失败都不能阻塞整个搜索——降级到纯 Pipeline 模式，用户至少能搜到结果。\n\n**3. 过敏场景的安全过滤**：这是业务刚需——客户说\"过敏了\"的时候，系统绝对不能推荐\"您可以试试我们的 XX 产品\"。我在 filter 层做了两道防护：过敏关键词触发后，自动过滤含\"推荐/试试/很适合您\"的话术；同时全局敏感词黑名单过滤\"根治/绝对/100%有效\"等。",
  sources: [],
};
d3.readingTime = readingTime(d3.content.length);

const d4: Chapter = {
  id: "2.4",
  groupId: 1,
  groupName: "项目故事",
  title: "设计上花了心思的地方",
  level: "中级",
  readingTime: "",
  content:
    "**意图识别 + 同义词扩展**：客服说的是口语（\"太贵了\"\"脸红\"\"换一个\"），标准话术写的是书面语（\"优惠\"\"过敏\"\"退款\"）。我在 QueryParser 里内置了 6 个实体词典 + 1 个同义词映射，自动把口语转成标准术语再搜。同时还做了意图分类（成分咨询 / 产品推荐 / 用法咨询 / 售后 / 价格 / 效果 / 对比 / 一般），在搜索结果卡片上显示意图标签，帮助客服确认方向。\n\n**平台前缀**：客服输入 `/tm 过敏` 自动只检索天猫平台的话术，`/jd`、`/dy`、`/pdd` 同理。各平台话术可能不一样（天猫和抖音的活动政策就不同），这个细节在实际使用中很关键。\n\n**审批流**：客服可以在话术库页面点「申请修改」→ 进入 `pending_approvals.json` → 管理员审批后自动写回原始 JSON 并重新加载。比\"在群里 @话术师改\"高效得多。",
  sources: [],
};
d4.readingTime = readingTime(d4.content.length);

const d5: Chapter = {
  id: "2.5",
  groupId: 1,
  groupName: "项目故事",
  title: "实际使用效果",
  level: "入门",
  readingTime: "",
  content:
    "系统上线后话术库从 521 条增长到 **1072 条**（经过一次 Excel 批量清洗 + 6 大分类整理），覆盖售前、售后、产品 QA、活动话术、皮肤知识、明星专项。客服平均 **3 秒内** 找到对应话术，远快于之前的翻文档。\n\n除了搜索，系统还整合了话术库浏览、收藏夹、学习路径、测验系统、场景模拟器、客户画像等模块——这是一个围绕「客服日常」打造的一体化工作站，不只是一个搜索引擎。\n\n纯前端搜索架构让服务部署成本极低：一个 FastAPI + 一个 HTML 文件夹，双击 `start.command` 就启动，不需要 Docker、不需要 Redis、不需要云端。单品牌（达肤妍）、本地部署（localhost:8767），零运维负担。",
  sources: [],
};
d5.readingTime = readingTime(d5.content.length);

/* =========================================================================
 * Project 3: dmp-data-scraper — 5 chapters
 * ========================================================================= */

const p1: Chapter = {
  id: "3.1",
  groupId: 1,
  groupName: "项目故事",
  title: "为什么要做爬虫",
  level: "入门",
  readingTime: "",
  content:
    "在天猫运营中，达摩盘（DMP）是核心的数据工具——可以看到品牌人群资产的 AIPL 分布、各阶段的流转数据、每个单品的资产诊断。但 DMP 后台是 SPA 页面，没有导出按钮，每天手动截图、手动记数、手动填表——效率低、容易出错，而且 T+1 数据可能在下午才更新，运营决策滞后。\n\n我需要一套自动化的数据采集 pipeline：每天自动打开达摩盘 → 抓取资产诊断、流转数据、15 个单品的资产指标 → 写入本地 CSV → 同步到前端看板。\n\n技术选型上，选择了 **Playwright + Chromium 持久化上下文**，而不是直接调 API。原因很简单：达摩盘的 API 有复杂的签名和反爬机制，用浏览器自动化模拟真实用户行为是更可控的方案。代价是需要处理 SPA 渲染延迟、反检测、登录态维护等问题——这些正是这个项目最有挑战的部分。",
  sources: [],
};
p1.readingTime = readingTime(p1.content.length);

const p2: Chapter = {
  id: "3.2",
  groupId: 1,
  groupName: "项目故事",
  title: "爬虫架构怎么搭的",
  level: "中级",
  readingTime: "",
  content:
    "整体采用 **三层架构**：\n\n**Master 调度层**（`dmp_master.py`）：统一入口，管理浏览器生命周期、失败重试、模块调度。输入一个命令（`--assets` / `--flow` / `--items`），输出对应的 CSV 文件。浏览器崩溃时自动重建 page + 重新登录，60 秒后重试。\n\n**三个独立 Scraper**：资产诊断用 Y 轴锚点 + 距离优先 DOM 提取；流转数据用 API 拦截（拦截 `transfer/channel` 接口响应）；单品洞察用 API 拦截 + 锚点定位双轨，四阶段轮询（早期数据 → 稳定轮询 → 最终取值 → Date Sanity 验证）。\n\n**公共层**（`dmp_common.py`）：浏览器管理（`launch_persistent_context` 保活登录态）、千牛登录、缺失日期检测、CSV 工具函数。10 层反检测全在这一层（`navigator.webdriver` 注入、插件列表填充、贝塞尔曲线鼠标移动等）。",
  sources: [],
};
p2.readingTime = readingTime(p2.content.length);

const p3: Chapter = {
  id: "3.3",
  groupId: 1,
  groupName: "项目故事",
  title: "三个让人抓狂的 bug",
  level: "高级",
  readingTime: "",
  content:
    "**Bug 1：SPA date picker 状态错位。** 达摩盘的 URL 里带了 `endDate=2026-05-23` 参数，但我发现 SPA 内部完全**忽略**这个参数——真正的查询日期是 date picker 组件的内部状态。URL 显示 5/23，实际抓到的却是 5/26。花了两天逆向 DMP 的 React date picker DOM（那些随机 class 名 `dKqGwkfJca`、`dKqGwkfJcd`），最终通过读 title 属性 + 确保月份导航点击到了目标月才解决。\n\n**Bug 2：Codex 的 span-click fallback 触发假日期。** AI 代码助手自动加了一个\"月导航失败就点击 span\"的兜底逻辑，但在当前视图里点击的 span 对应的是其他月份的日期格——看起来月导航成功了，实际上 endDate 状态没变。\n\n**Bug 3：全同值陷阱。** 距离算法最初用 `max()` 找最近数字，但页面加载未完成时所有数字都是同一个初始值（28,150,296），`max()` 选出的就是它，导致连续多天写入全相同数据。改成 `nearest()` 取欧氏距离最小的唯一值才修好。",
  sources: [],
};
p3.readingTime = readingTime(p3.content.length);

const p4: Chapter = {
  id: "3.4",
  groupId: 1,
  groupName: "项目故事",
  title: "数据质量的工程防线",
  level: "中级",
  readingTime: "",
  content:
    "爬虫跑出来的数据不能直接拿来用，必须过质量检查。我设计了 **6 道门禁**，每道挡一种典型的数据问题：\n\n- **业务平滑性**：环比波动 >30% 触发飞书告警（不阻塞写入，可能是真实业务波动）\n- **基础校验**：子字段和不能大于总量、不能全 0\n- **复制日检测**：如果 6 个字段和前一天完全相同，很可能是 DMP 的 T+1 数据还没生成，标记 `likely-wrong` 仍写入\n- **API 健康**：子字段和 > 总量 × 1.5 直接拒绝\n- **跨日校验**：跌幅 >50% 或涨幅 >100% 拒绝写入（这 4 条被拒的数据有单独备份）\n- **Date Sanity**：SPA 显示日期 ≠ 目标日期 → 重试\n\n此外 **data3.csv 严格 append-only**——5614 行之后没有任何覆盖操作。任何数据修复必须先备份（历史上有 6 个 `data3_pre_*.csv` 备份链）。断点续传协议用 `completed_items.json` 记录已完成的任务，崩溃重启后从断点继续。",
  sources: [],
};
p4.readingTime = readingTime(p4.content.length);

const p5: Chapter = {
  id: "3.5",
  groupId: 1,
  groupName: "项目故事",
  title: "跑起来之后的效果",
  level: "入门",
  readingTime: "",
  content:
    "系统每天 T+1 自动产出三份数据：**资产诊断（data2.csv）** 追踪品牌 AIPL 8 阶段分布，**流转数据（data.csv）** 展示人群在各阶段间的流入流出，**单品洞察（data3.csv）** 覆盖 15 个核心 SKU 的 6 项资产指标（资产总量/浅种草/深种草/首购/复购/连带）。数据采集完成后自动同步到前端 CRM 看板，和芙清 CRM 系统打通。\n\n到 2026 年 6 月，data3.csv 已累积 **7040 行 × 9 列** 的单品数据，18 行被标记为 `likely-wrong`（主要是 DMP 延迟导致的复制日），其余全部 verified。\n\n反检测方面，10 层反检测 + 贝塞尔曲线鼠标轨迹 + 正态分布延迟，跑了一年零封号。配置档位分「速度优先」和「安全优先」两套，生产环境用安全档（10-30 秒延迟 / 单次最多 5 商品 / 每日 50 次请求上限），内部测试用速度档。",
  sources: [],
};
p5.readingTime = readingTime(p5.content.length);

/* =========================================================================
 * 组装项目详情
 * ========================================================================= */

export const PROJECTS_DETAIL: ProjectDetail[] = [
  {
    slug: "fuqing-crm-analytics",
    repo: "fuqing-crm-analytics",
    title: "芙清 CRM 客户分析系统",
    subtitle: "处理 1030 万订单 / 410 万用户 · 三段式架构 · 每日自动推送运营洞察",
    totalReadingTime: "6 分钟",
    description: "为电商运营团队打造的内部数据中台",
    indexedAt: "2026-06-08",
    archDiagrams: [
      { label: "系统架构图", src: "/projects/fuqing-crm-arch.svg" },
      { label: "ETL 数据流图", src: "/projects/fuqing-crm-flow.svg" },
    ],
    groups: [
      {
        id: 1,
        name: "项目故事",
        chapters: [f1, f2, f3, f4, f5],
      },
    ],
  },
  {
    slug: "dafuyan-wording",
    repo: "dafuyan-wording",
    title: "达肤妍客服话术检索系统",
    subtitle: "1072 条话术 · 四路 RRF 融合 · 浏览器内搜索引擎 · 3 秒响应",
    totalReadingTime: "6 分钟",
    description: "面向客服团队的话术库 + RAG 检索 + 培训一体化工作站",
    indexedAt: "2026-06-08",
    archDiagrams: [
      { label: "系统架构图", src: "/projects/dafuyan-arch.svg" },
      { label: "搜索流程图", src: "/projects/dafuyan-flow.svg" },
    ],
    groups: [
      {
        id: 1,
        name: "项目故事",
        chapters: [d1, d2, d3, d4, d5],
      },
    ],
  },
  {
    slug: "dmp-data-scraper",
    repo: "dmp-data-scraper",
    title: "达摩盘 DMP 数据自动化",
    subtitle: "10 层反检测 · 6 道门禁 · 7040 行单品数据 · append-only 增量",
    totalReadingTime: "6 分钟",
    description: "Playwright + Chromium SPA 数据自动采集框架",
    indexedAt: "2026-06-08",
    archDiagrams: [
      { label: "系统架构图", src: "/projects/dmp-arch.svg" },
      { label: "采集流程图", src: "/projects/dmp-flow.svg" },
    ],
    groups: [
      {
        id: 1,
        name: "项目故事",
        chapters: [p1, p2, p3, p4, p5],
      },
    ],
  },
];

export function findProjectBySlug(slug: string): ProjectDetail | undefined {
  return PROJECTS_DETAIL.find((p) => p.slug === slug);
}
