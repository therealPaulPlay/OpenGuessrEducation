<script module>
	import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
	import QuizMapGame from "$lib/components/QuizMapGame.svelte";
	import ExploreInOpenGuessr from "$lib/components/ExploreInOpenGuessr.svelte";

	export const metadata = {
		title: "African countries",
		tags: ["Africa"],
		region: "Africa",
		category: determineCategory(new URL(import.meta.url).pathname),
	};
</script>

<QuizMapGame region={metadata.region} />

<ExploreInOpenGuessr mapName="Africa" />
