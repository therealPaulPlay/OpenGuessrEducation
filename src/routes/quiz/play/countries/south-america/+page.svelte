<script module>
	import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
	import QuizMapGame from "$lib/components/MapQuiz.svelte";
	import ExploreInOpenGuessr from "$lib/components/ExploreInOpenGuessr.svelte";

	export const metadata = {
		title: "South American countries",
		tags: ["South America"],
		region: "South America",
		category: determineCategory(new URL(import.meta.url).pathname),
	};
</script>

<QuizMapGame region={metadata.region} />

<ExploreInOpenGuessr mapName="South America" />
