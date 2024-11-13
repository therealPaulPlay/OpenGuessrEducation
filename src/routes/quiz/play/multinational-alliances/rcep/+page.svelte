<script module>
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
    import QuizMapGame from "$lib/components/QuizMapGame.svelte";

    export const metadata = {
        title: "RCEP",
        tags: ["Asia"],
        region: "RCEP",
        category: determineCategory(new URL(import.meta.url).pathname),
    };
</script>

<QuizMapGame region={metadata.region} />