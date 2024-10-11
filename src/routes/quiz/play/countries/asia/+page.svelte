<script context="module">
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
    import QuizMapGame from "$lib/components/QuizMapGame.svelte";

    export const metadata = {
        title: "Asian Countries",
        tags: ["Asia"],
        region: "Asia",
        category: determineCategory(new URL(import.meta.url).pathname),
    };
</script>

<QuizMapGame region={metadata.region} zoom=0.75 minLabelZoom=0.75 />