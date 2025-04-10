<script module>
	import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
	import SatelliteQuiz from "$lib/components/SatelliteQuiz.svelte";

	export const metadata = {
		title: "North American cities from above",
		tags: ["North America"],
		region: "North America",
		jsonName: "north-american-cities",
		projectionRotation: [60, 0, 0],
		previewZoom: 1.5,
		category: determineCategory(new URL(import.meta.url).pathname),
	};
</script>

<SatelliteQuiz jsonName={metadata.jsonName} />
