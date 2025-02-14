<script module>
	import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
	import QuizMapGame from "$lib/components/QuizMapGame.svelte";

	export const metadata = {
		title: "20 largest cities (by population)",
		tags: ["All"],
		region: "20 largest cities",
		category: determineCategory(new URL(import.meta.url).pathname),
	};
</script>

<QuizMapGame region={metadata.region} />
