import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), "dist");
const previewPort = Number(process.env.GOI_THUONG_PREVIEW_PORT || 4174);
const types = { ".html":"text/html; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".css":"text/css; charset=utf-8", ".json":"application/json" };

createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    const requested = normalize(join(root, pathname === "/" ? "index.html" : pathname));
    const safe = requested.startsWith(root) ? requested : join(root, "index.html");
    const file = extname(safe) ? safe : join(root, "index.html");
    const body = await readFile(file).catch(() => readFile(join(root, "index.html")));
    res.writeHead(200, { "content-type": types[extname(file)] || "text/html; charset=utf-8", "cache-control":"no-store" });
    res.end(body);
  } catch (error) {
    res.writeHead(500, { "content-type":"text/plain; charset=utf-8" });
    res.end("Preview server error");
  }
}).listen(previewPort, "127.0.0.1", () => console.log(`http://127.0.0.1:${previewPort}`));
