<script context="module">
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
    import QuizMapGame from "$lib/components/QuizMapGame.svelte";

    export const metadata = {
        title: "Indonesian Provinces (Provinsi)",
        tags: ["Asia"],
        region: "Indonesian Provinces",
        topoJson: "indonesian-provinces",
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>

<QuizMapGame region={metadata.region} topoJsonName={metadata.topoJson} />