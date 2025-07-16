<script module>
	import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
	import QuizMapGame from "$lib/components/MapQuiz.svelte";

	export const metadata = {
		title: "GCC",
		tags: ["Asia"],
		region: "GCC",
		category: determineCategory(new URL(import.meta.url).pathname),
	};
</script>

<QuizMapGame region={metadata.region} />
