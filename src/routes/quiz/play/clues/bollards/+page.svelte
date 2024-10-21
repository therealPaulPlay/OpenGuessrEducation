<script context="module">
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
    import ClueQuiz from "$lib/components/ClueQuiz.svelte";

    export const metadata = {
        title: "Bollards",
        tags: ["All"],
        region: "Bollards",
        previewImagePath: "/bollards/bollard-estonia.jpg",
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>

<ClueQuiz region={metadata.region}/>