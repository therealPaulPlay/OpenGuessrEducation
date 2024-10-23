<script module>
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
    import SatelliteQuiz from "$lib/components/SatelliteQuiz.svelte";

    export const metadata = {
        title: "South American Cities from above",
        tags: ["South America"],
        region: "South America",
        jsonName:"south-american-cities",
        projectionRotation: [40, 20, 20],
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>

<SatelliteQuiz jsonName={metadata.jsonName} />