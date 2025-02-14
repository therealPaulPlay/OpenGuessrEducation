<script module>
	import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
	import SatelliteQuiz from "$lib/components/SatelliteQuiz.svelte";

	export const metadata = {
		title: "Capital Cities from above",
		tags: ["All"],
		region: "Satellite World",
		jsonName: "capital-cities",
		category: determineCategory(new URL(import.meta.url).pathname),
	};
</script>

<SatelliteQuiz jsonName={metadata.jsonName} />
