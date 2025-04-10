<script module>
	import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
	import FlagQuiz from "$lib/components/FlagQuiz.svelte";

	export const metadata = {
		title: "North American flags",
		tags: ["North America"],
		region: "North America",
		category: determineCategory(new URL(import.meta.url).pathname),
	};
</script>

<FlagQuiz region={metadata.region} />
