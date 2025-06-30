import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.join(__dirname, "..");
const ROUTES_DIR = path.join(PROJECT_ROOT, "src", "routes");
const OUTPUT_FILE = path.join(PROJECT_ROOT, "static", "sitemap.xml");
const BASE_URL = "https://education.openguessr.com";

function getRoutes(dir, baseRoute = "") {
	let routes = [];
	const entries = fs.readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		const routePath = path.join(baseRoute, entry.name);
		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			routes = routes.concat(getRoutes(fullPath, routePath));
		} else if (entry.isFile() && entry.name.startsWith("+page")) {
			let route =
				routePath
					.replace(/\.svelte$/, "")
					.replace(/\+page\.js$/, "")
					.replace(/\+page$/, "")
					.replace(/\/index$/, "") || "/";
			if (route !== "/") {
				route = "/" + route;
			}
			routes.push(route);
		}
	}

	return routes;
}

function generateSitemap() {
	console.log(`Searching for routes in: ${ROUTES_DIR}`);
	if (!fs.existsSync(ROUTES_DIR)) {
		console.error(`Routes directory not found: ${ROUTES_DIR}`);
		process.exit(1);
	}

	const routes = getRoutes(ROUTES_DIR);
	console.log(`Found ${routes.length} routes:`);
	routes.forEach((route) => console.log(` - ${route}`));

	let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

	for (const route of routes) {
		sitemap += `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </url>
`;
	}

	sitemap += "</urlset>";

	fs.writeFileSync(OUTPUT_FILE, sitemap);
	console.log(`Sitemap generated at ${OUTPUT_FILE}`);
}

generateSitemap();
