<script module>
	import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
	import FlagQuiz from "$lib/components/FlagQuiz.svelte";

	export const metadata = {
		title: "European Flags",
		tags: ["Europe"],
		region: "Europe",
		category: determineCategory(new URL(import.meta.url).pathname),
	};
</script>

<FlagQuiz region={metadata.region} />
