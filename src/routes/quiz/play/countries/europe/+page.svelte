<script context="module">
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";

    export const metadata = {
        title: "European Countries",
        tags: ["Europe"],
        region: "Europe",
        zoom: 1,
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>
