<script module>
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
    import SatelliteQuiz from "$lib/components/SatelliteQuiz.svelte";

    export const metadata = {
        title: "African Cities from above",
        tags: ["Africa"],
        region: "Africa",
        jsonName:"african-cities",
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>

<SatelliteQuiz jsonName={metadata.jsonName} />