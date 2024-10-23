<script module>
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
    import FakeFlagsQuiz from "$lib/components/FakeFlagsQuiz.svelte";

    export const metadata = {
        title: "3 Wrong, 1 Correct Flag",
        tags: ["All"],
        region: "All",
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>

<FakeFlagsQuiz />