<script module>
	import { determineCategory } from "$lib/utils/quizMetadataHelper.js";
	import TextQuiz from "$lib/components/TextQuiz.svelte";

	export const metadata = {
		title: "Telephone prefixes",
		tags: ["All"],
		region: "Telephone prefixes",
		previewImagePath: "/telephone-prefixes/tel-number-example.jpg",
		textDataPath: "/json/country-data/telephone-prefixes.json",
		category: determineCategory(new URL(import.meta.url).pathname),
	};
</script>

<TextQuiz region={metadata.region} textDataPath={metadata.textDataPath} />
