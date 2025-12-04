import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUIZ_DIR = path.join(__dirname, '../src/routes/quiz/play');
const OUTPUT = path.join(__dirname, '../static/json/quiz-metadata.json');

function findQuizFiles(dir, files = []) {
	for (const f of fs.readdirSync(dir)) {
		const p = path.join(dir, f);
		if (fs.statSync(p).isDirectory()) findQuizFiles(p, files);
		else if (f === '+page.svelte') files.push(p);
	}
	return files;
}

const quizzes = findQuizFiles(QUIZ_DIR).map(file => {
	const content = fs.readFileSync(file, 'utf-8');
	const match = content.match(/export\s+const\s+metadata\s*=\s*({[\s\S]*?});/);
	if (!match) return null;

	const rel = path.relative(QUIZ_DIR, file).split(path.sep);
	const metaStr = match[1]
		.replace(/determineCategory\(new URL\(import\.meta\.url\)\.pathname\)/g, '""');

	return {
		...eval(`(${metaStr})`),
		category: rel[0],
		path: '/quiz/play/' + rel.slice(0, -1).join('/')
	};
}).filter(Boolean);

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, JSON.stringify(quizzes));
console.log(`Generated metadata for ${quizzes.length} quizzes`);
