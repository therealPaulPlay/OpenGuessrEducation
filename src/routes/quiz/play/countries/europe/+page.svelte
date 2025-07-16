<script module>
	import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
	import QuizMapGame from "$lib/components/MapQuiz.svelte";
	import ExploreInOpenGuessr from "$lib/components/ExploreInOpenGuessr.svelte";

	export const metadata = {
		title: "European countries",
		tags: ["Europe"],
		region: "Europe",
		category: determineCategory(new URL(import.meta.url).pathname),
	};
</script>

<QuizMapGame region={metadata.region} />

<ExploreInOpenGuessr mapName="Europe" />
