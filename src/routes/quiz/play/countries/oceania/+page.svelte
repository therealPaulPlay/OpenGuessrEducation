<script module>
	import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
	import QuizMapGame from "$lib/components/MapQuiz.svelte";
	import ExploreInOpenGuessr from "$lib/components/ExploreInOpenGuessr.svelte";

	export const metadata = {
		title: "Oceanian countries",
		tags: ["Oceania"],
		region: "Oceania",
		category: determineCategory(new URL(import.meta.url).pathname),
	};
</script>

<QuizMapGame region={metadata.region} />

<ExploreInOpenGuessr mapName="Oceania" />
