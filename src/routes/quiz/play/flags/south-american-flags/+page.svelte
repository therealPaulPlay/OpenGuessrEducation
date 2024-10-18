<script context="module">
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
    import FlagQuiz from "$lib/components/FlagQuiz.svelte";

    export const metadata = {
        title: "South American Flags",
        tags: ["South America"],
        region: "South America",
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>

<FlagQuiz region={metadata.region}/>