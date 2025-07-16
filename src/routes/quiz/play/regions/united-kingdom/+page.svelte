<script module>
	import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
	import QuizMapGame from "$lib/components/MapQuiz.svelte";

	export const metadata = {
		title: "United Kingdom regions",
		tags: ["Europe"],
		region: "United Kingdom Regions",
		topoJson: "uk-regions",
		category: determineCategory(new URL(import.meta.url).pathname),
	};
</script>

<QuizMapGame region={metadata.region} topoJsonName={metadata.topoJson} />
