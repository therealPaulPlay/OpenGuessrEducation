<script context="module">
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";

    export const metadata = {
        title: "South American Countries",
        tags: ["South America"],
        region: "South America",
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>
