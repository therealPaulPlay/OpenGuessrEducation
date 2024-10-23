<script module>
    import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
    import QuizMapGame from "$lib/components/QuizMapGame.svelte";

    export const metadata = {
        title: "US States",
        tags: ["North America"],
        region: "US States",
        topoJson: "us-states-10m", // optional property, needed for maps that don't use the default world topojson
        category: determineCategory(new URL(import.meta.url).pathname)
    }
</script>

<QuizMapGame region={metadata.region} topoJsonName={metadata.topoJson} zoom=0.75 minLabelZoom=0.75 />