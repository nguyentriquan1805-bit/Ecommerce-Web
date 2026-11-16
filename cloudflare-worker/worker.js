const MODEL = "@cf/black-forest-labs/flux-2-klein-4b";
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, "Content-Type": "application/json; charset=utf-8" },
  });
}

function integer(value, fallback, min, max) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) ? Math.max(min, Math.min(max, parsed)) : fallback;
}

async function fluxMultipart(form, env) {
  const prompt = String(form.get("prompt") || "").trim();
  if (!prompt) throw new Error("Prompt is required");

  const outbound = new FormData();
  outbound.append("prompt", prompt);
  outbound.append("width", String(integer(form.get("width"), 1024, 256, 1920)));
  outbound.append("height", String(integer(form.get("height"), 768, 256, 1920)));
  outbound.append("seed", String(integer(form.get("seed"), 1, 1, 2147483647)));

  for (let index = 0; index < 4; index += 1) {
    const image = form.get(`input_image_${index}`);
    if (image && typeof image.arrayBuffer === "function") {
      outbound.append(`input_image_${index}`, image, image.name || `reference_${index}.png`);
    }
  }

  const encoded = new Response(outbound);
  return env.AI.run(MODEL, {
    multipart: {
      body: encoded.body,
      contentType: encoded.headers.get("content-type"),
    },
  });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });

    const auth = request.headers.get("Authorization");
    if (!env.API_KEY || auth !== `Bearer ${env.API_KEY}`) return json({ error: "Unauthorized" }, 401);

    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/") return json({ error: "Not allowed" }, 405);
    if (!env.AI) return json({ error: "Missing Workers AI binding named AI" }, 500);

    try {
      const contentType = String(request.headers.get("content-type") || "").toLowerCase();
      let form;
      if (contentType.includes("multipart/form-data")) {
        form = await request.formData();
      } else if (contentType.includes("application/json")) {
        const body = await request.json();
        form = new FormData();
        Object.entries(body || {}).forEach(([key, value]) => value !== undefined && form.append(key, String(value)));
      } else {
        return json({ error: "Use multipart/form-data or application/json" }, 415);
      }

      const result = await fluxMultipart(form, env);
      if (result && typeof result === "object" && typeof result.image === "string") {
        return json({ image: result.image, model: MODEL });
      }
      return json(result, 200);
    } catch (error) {
      return json({ error: "Image generation failed", details: String(error?.message || error) }, 400);
    }
  },
};
