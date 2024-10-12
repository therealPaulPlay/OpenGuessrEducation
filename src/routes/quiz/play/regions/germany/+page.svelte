<script context="module">
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
    import QuizMapGame from "$lib/components/QuizMapGame.svelte";

    export const metadata = {
        title: "German States (Bundesländer)",
        tags: ["Europe"],
        region: "German States",
        topoJson: "german-states",
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>

<QuizMapGame region={metadata.region} topoJsonName={metadata.topoJson} />