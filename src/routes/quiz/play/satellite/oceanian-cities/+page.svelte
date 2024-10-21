<script context="module">
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
    import SatelliteQuiz from "$lib/components/SatelliteQuiz.svelte";

    export const metadata = {
        title: "Oceanian Cities from above",
        tags: ["Oceania"],
        region: "Oceania",
        jsonName:"oceanian-cities",
        projectionRotation: [-110, -5, 10],
        previewZoom: 1.2,
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>

<SatelliteQuiz jsonName={metadata.jsonName} />