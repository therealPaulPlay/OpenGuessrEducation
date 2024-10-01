<script context="module">
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";

    export const metadata = {
        title: "African Countries",
        tags: ["Africa"],
        region: "Africa",
        zoom: 1,
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>
