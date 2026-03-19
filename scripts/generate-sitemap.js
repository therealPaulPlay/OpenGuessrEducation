import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROUTES_DIR = path.join(__dirname, "..", "src", "routes");
const OUTPUT_FILE = path.join(__dirname, "..", "static", "sitemap.xml");
const BASE_URL = "https://education.openguessr.com";

function getRoutes(dir, baseRoute = "") {
	const routes = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const routePath = path.join(baseRoute, entry.name);
		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			routes.push(...getRoutes(fullPath, routePath));
		} else if (entry.name === "+page.svelte") {
			const route = ("/" + routePath.replace(/\+page\.svelte$/, "")).replace(/\/$/, "") || "/";
			// Skip dynamic routes like /my-route/[varName]
			if (!route.includes("[")) routes.push(route);
		}
	}
	return routes;
}

function generateSitemap() {
	if (!fs.existsSync(ROUTES_DIR)) {
		console.error(`Routes directory not found: ${ROUTES_DIR}`);
		process.exit(1);
	}

	const routes = getRoutes(ROUTES_DIR);
	const today = new Date().toISOString().split("T")[0];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Auto-generated - Do not edit manually -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${routes.map((r) => `  <url>\n    <loc>${BASE_URL}${r}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join("\n")}
</urlset>
`;

	fs.writeFileSync(OUTPUT_FILE, sitemap);
	console.log(`Sitemap generated with ${routes.length} routes at ${OUTPUT_FILE}`);
}

generateSitemap();
