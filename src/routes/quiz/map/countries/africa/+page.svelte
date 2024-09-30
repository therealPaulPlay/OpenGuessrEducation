<script context="module">
    import { quizMetadata } from "$lib/stores/quizMetadataStore.js";

    export const metadata = {
        title: "African Countries",
        tags: ["Africa"],
        region: "Africa",
        zoom: 1,
    };

    quizMetadata.set(metadata);
</script>
