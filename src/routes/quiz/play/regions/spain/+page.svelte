<script module>
	import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
	import QuizMapGame from "$lib/components/MapQuiz.svelte";

	export const metadata = {
		title: "Spanish regiones autónomas",
		tags: ["Europe"],
		region: "Spanish Regions",
		topoJson: "spanish-regions",
		category: determineCategory(new URL(import.meta.url).pathname),
	};
</script>

<QuizMapGame region={metadata.region} topoJsonName={metadata.topoJson} />
