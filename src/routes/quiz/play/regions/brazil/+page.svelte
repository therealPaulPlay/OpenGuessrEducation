<script module>
	import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
	import QuizMapGame from "$lib/components/MapQuiz.svelte";

	export const metadata = {
		title: "Brazilian states (Estados)",
		tags: ["South America"],
		region: "Brazilian States",
		topoJson: "brazilian-states",
		category: determineCategory(new URL(import.meta.url).pathname),
	};
</script>

<QuizMapGame region={metadata.region} topoJsonName={metadata.topoJson} />
