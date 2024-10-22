<script context="module">
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
    import ClueQuiz from "$lib/components/ClueQuiz.svelte";

    export const metadata = {
        title: "Utility Poles",
        tags: ["All"],
        region: "Utility Poles",
        assetFolder: "utility-poles",
        filePrefix: "pole",
        previewImagePath: "/utility-poles/pole-indonesia.jpg",
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>

<ClueQuiz region={metadata.region} assetFolder={metadata.assetFolder} filePrefix={metadata.filePrefix} />