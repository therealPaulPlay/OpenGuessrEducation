<script module>
	import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
	import QuizMapGame from "$lib/components/MapQuiz.svelte";
	import ExploreInOpenGuessr from "$lib/components/ExploreInOpenGuessr.svelte";

	export const metadata = {
		title: "North American countries",
		tags: ["North America"],
		region: "North America",
		category: determineCategory(new URL(import.meta.url).pathname),
	};
</script>

<QuizMapGame region={metadata.region} />

<ExploreInOpenGuessr mapName="North America" />
