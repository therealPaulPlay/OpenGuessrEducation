<script module>
	import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
	import ClueQuiz from "$lib/components/ClueQuiz.svelte";

	export const metadata = {
		title: "License plates",
		tags: ["All"],
		region: "License plates",
		assetFolder: "license-plates",
		filePrefix: "license-plate",
		previewImagePath: "/license-plates/license-plate-thailand.jpg",
		category: determineCategory(new URL(import.meta.url).pathname),
	};
</script>

<ClueQuiz region={metadata.region} assetFolder={metadata.assetFolder} filePrefix={metadata.filePrefix} />
