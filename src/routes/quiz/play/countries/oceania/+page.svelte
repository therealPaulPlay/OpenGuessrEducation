<script context="module">
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";

    export const metadata = {
        title: "Oceanian Countries",
        tags: ["Oceania"],
        region: "Oceania",
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>
