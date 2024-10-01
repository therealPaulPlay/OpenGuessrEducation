<script context="module">
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";

    export const metadata = {
        title: "North American Countries",
        tags: ["North America"],
        region: "North America",
        zoom: 1,
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>
