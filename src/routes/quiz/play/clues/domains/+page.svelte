<script module>
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
    import TextQuiz from "$lib/components/TextQuiz.svelte";

    export const metadata = {
        title: "Top Level Domains",
        tags: ["All"],
        region: "Top Level Domains",
        previewImagePath: "/domains/domain-example.jpg",
        textDataPath: "/src/lib/json/country-data/country-tld.json",
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>

<TextQuiz region={metadata.region} textDataPath={metadata.textDataPath} />