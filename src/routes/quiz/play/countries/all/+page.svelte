<script context="module">
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
    import QuizMapGame from "$lib/components/QuizMapGame.svelte";

    export const metadata = {
        title: "All Countries",
        tags: ["All"],
        region: "World",
        zoom: 1,
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>

<QuizMapGame
    region={metadata.region}
    zoom={metadata.zoom}
    geoJsonPath={metadata.geoJsonPath}
/>