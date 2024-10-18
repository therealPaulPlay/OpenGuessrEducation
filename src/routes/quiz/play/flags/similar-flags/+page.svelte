<script context="module">
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
    import FlagQuiz from "$lib/components/FlagQuiz.svelte";

    export const metadata = {
        title: "Flags that look alike",
        tags: ["All"],
        region: "Similar Flags",
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>

<FlagQuiz region={metadata.region}/>