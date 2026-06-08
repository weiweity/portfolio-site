// EdgeOne Pages Edge Function — GET /api/health
// Liveness probe. Useful for uptime monitoring.

export async function onRequestGet() {
  return new Response(
    JSON.stringify({ ok: true, ts: new Date().toISOString() }),
    {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    }
  );
}
