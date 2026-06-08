// EdgeOne Pages Edge Function — POST /api/contact
// Accepts a contact form submission. Returns a synthetic request id.
// In production this would forward to an email service or queue; for the
// portfolio MVP we validate and echo.

function isEmail(s) {
  return typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function genRequestId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MSG-${ts}-${rand}`;
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export async function onRequestPost({ request }) {
  const body = await readJson(request);
  if (!body) {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid JSON body" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  const { name, email, message } = body;

  if (!name || typeof name !== "string" || name.length < 1 || name.length > 120) {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid name" }),
      { status: 422, headers: { "content-type": "application/json" } }
    );
  }
  if (!isEmail(email)) {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid email" }),
      { status: 422, headers: { "content-type": "application/json" } }
    );
  }
  if (!message || typeof message !== "string" || message.length < 1 || message.length > 4000) {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid message" }),
      { status: 422, headers: { "content-type": "application/json" } }
    );
  }

  // TODO: forward to email service / queue. For now, log + echo.
  console.log(`[contact] received from ${email} (${name}): ${message.slice(0, 80)}...`);

  return new Response(
    JSON.stringify({ success: true, requestId: genRequestId() }),
    { status: 200, headers: { "content-type": "application/json; charset=utf-8" } }
  );
}

// Reject other methods explicitly.
export async function onRequest({ request }) {
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      { status: 405, headers: { "content-type": "application/json", allow: "POST" } }
    );
  }
  return onRequestPost({ request });
}
