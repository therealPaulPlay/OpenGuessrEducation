// routes/sitemap.xml/+server.js
import fs from 'fs';
import path from 'path';

export async function GET() {
    const filePath = path.resolve('src/routes/sitemap.xml/sitemap.xml');
    const xml = fs.readFileSync(filePath, 'utf-8');

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml' }
    });
}
