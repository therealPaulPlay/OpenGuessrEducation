<script module>
	import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
	import QuizMapGame from "$lib/components/QuizMapGame.svelte";

	export const metadata = {
		title: "EU-27",
		tags: ["Europe"],
		region: "European Union",
		category: determineCategory(new URL(import.meta.url).pathname),
	};
</script>

<QuizMapGame region={metadata.region} />
