<script context="module">
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
    import QuizMapGame from "$lib/components/QuizMapGame.svelte";

    export const metadata = {
        title: "European Capitals",
        tags: ["Europe"],
        region: "European Capitals",
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>

<QuizMapGame region={metadata.region} />