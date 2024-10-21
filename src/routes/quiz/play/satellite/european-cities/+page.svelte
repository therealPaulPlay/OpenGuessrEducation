<script context="module">
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
    import SatelliteQuiz from "$lib/components/SatelliteQuiz.svelte";

    export const metadata = {
        title: "European Cities from above",
        tags: ["Europe"],
        region: "Europe",
        jsonName:"european-cities",
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>

<SatelliteQuiz region={metadata.region} jsonName={metadata.jsonName} />