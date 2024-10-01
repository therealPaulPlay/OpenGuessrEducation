<script context="module">
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";

    export const metadata = {
        title: "Asian Countries",
        tags: ["Asia"],
        region: "Asia",
        zoom: 1,
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>

