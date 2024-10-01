<script context="module">
    import { quizMetadata } from "$lib/stores/quizMetadataStore.js";

    // Determine the category from the module URL
    const modulePath = new URL(import.meta.url).pathname;
    const pathParts = modulePath.split("/");
    const category = pathParts[pathParts.length - 3];

    export const metadata = {
        title: "African Countries",
        tags: ["Africa"],
        region: "Africa",
        zoom: 1,
        category: category
    };

    quizMetadata.set(metadata);
</script>
