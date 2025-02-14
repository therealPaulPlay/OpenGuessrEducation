<script module>
	import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
	import QuizMapGame from "$lib/components/QuizMapGame.svelte";

	export const metadata = {
		title: "North American Capitals",
		tags: ["North America"],
		region: "North American Capitals",
		category: determineCategory(new URL(import.meta.url).pathname),
	};
</script>

<QuizMapGame region={metadata.region} />
