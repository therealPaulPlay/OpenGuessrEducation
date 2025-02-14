<script module>
	import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
	import QuizMapGame from "$lib/components/QuizMapGame.svelte";

	export const metadata = {
		title: "Australian States & Territories",
		tags: ["Oceania"],
		region: "Australian States",
		topoJson: "au-states-topo",
		category: determineCategory(new URL(import.meta.url).pathname),
	};
</script>

<QuizMapGame region={metadata.region} topoJsonName={metadata.topoJson} />
