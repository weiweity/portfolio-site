// EdgeOne Pages Edge Function — GET /api/project-doc/:slug
//
// 代理 public/docs/ 下的项目技术深度文档 (markdown)。
// 设计动机：
//   1) 文档文件不进 React bundle，首屏 JS 不膨胀 (3 份共 146KB 不会拖慢加载)
//   2) EdgeOne CDN 边缘缓存，命中后 0 回源
//   3) slug 白名单是软鉴权：未来若加付费墙/水印/版本控制，改这一处即可
//   4) 与 public/docs/ 直链访问并存，作为回退

const SLUG_WHITELIST = new Set([
  "fuqing-crm-analytics",
  "dmp-data-scraper",
  "dafuyan-wording",
]);

const SLUG_RE = /^\/api\/project-doc\/([a-z0-9-]+)$/;

export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const m = url.pathname.match(SLUG_RE);
  if (!m) {
    return new Response("Not Found", { status: 404 });
  }
  const slug = m[1];
  if (!SLUG_WHITELIST.has(slug)) {
    return new Response("Forbidden", {
      status: 403,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  // 同源拉 public 静态资源（EdgeOne 内部走 edge 网络）
  const origin = url.origin;
  let mdRes;
  try {
    mdRes = await fetch(`${origin}/docs/${slug}.md`);
  } catch (err) {
    return new Response(`Upstream fetch failed: ${err}`, { status: 502 });
  }
  if (!mdRes.ok) {
    return new Response(`Upstream returned ${mdRes.status}`, {
      status: mdRes.status === 404 ? 404 : 502,
    });
  }
  const body = await mdRes.text();

  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "x-doc-slug": slug,
      "x-edge-handler": "project-doc",
    },
  });
}
