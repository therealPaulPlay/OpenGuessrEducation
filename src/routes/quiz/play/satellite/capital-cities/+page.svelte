<script context="module">
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
    import SatelliteQuiz from "$lib/components/SatelliteQuiz.svelte";

    export const metadata = {
        title: "Capital Cities from above",
        tags: ["All"],
        region: "Capital Cities",
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>

<SatelliteQuiz region={metadata.region}/>