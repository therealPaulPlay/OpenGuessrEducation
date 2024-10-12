<script context="module">
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
    import QuizMapGame from "$lib/components/QuizMapGame.svelte";

    export const metadata = {
        title: "United Kingdom Regions",
        tags: ["Europe"],
        region: "United Kingdom Regions",
        topoJson: "uk-regions",
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>

<QuizMapGame region={metadata.region} topoJsonName={metadata.topoJson} />