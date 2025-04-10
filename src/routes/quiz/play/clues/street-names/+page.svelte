<script module>
	import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
	import ClueQuiz from "$lib/components/ClueQuiz.svelte";

	export const metadata = {
		title: "Street names",
		tags: ["All"],
		region: "Streetnames",
		assetFolder: "street-names",
		filePrefix: "streetname",
		previewImagePath: "/street-names/streetname-australia.jpg",
		category: determineCategory(new URL(import.meta.url).pathname),
	};
</script>

<ClueQuiz region={metadata.region} assetFolder={metadata.assetFolder} filePrefix={metadata.filePrefix} />
