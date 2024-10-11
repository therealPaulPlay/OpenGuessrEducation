<script context="module">
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
    import QuizMapGame from "$lib/components/QuizMapGame.svelte";

    export const metadata = {
        title: "North American Countries",
        tags: ["North America"],
        region: "North America",
        category: determineCategory(new URL(import.meta.url).pathname),
    };
</script>

<QuizMapGame region={metadata.region} />