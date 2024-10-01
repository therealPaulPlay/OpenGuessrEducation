<script context="module">
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";

    export const metadata = {
        title: "All Countries",
        tags: ["All"],
        region: "World",
        zoom: 1,
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>