<script module>
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
    import QuizMapGame from "$lib/components/QuizMapGame.svelte";

    export const metadata = {
        title: "Brazilian States (Estados)",
        tags: ["South America"],
        region: "Brazilian States",
        topoJson: "brazilian-states",
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>

<QuizMapGame region={metadata.region} topoJsonName={metadata.topoJson} />