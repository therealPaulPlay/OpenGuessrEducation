<script>
	import { ArrowLeftIcon } from "lucide-svelte";
	import QuizCard from "$lib/components/QuizCard.svelte";
	import FlagStackPreview from "$lib/components/FlagStackPreview.svelte";
	import Map from "$lib/components/Map.svelte";
	import { page } from "$app/stores"; // To get the current URL
	import QuizPreviewImage from "$lib/components/QuizPreviewImage.svelte";
	import { setTitle } from "$lib/utils/pageTitle.svelte.js";

	let { children } = $props();

	let currentRoute = $state();

	let metadata = $state({}); // Metadata of the current quiz
	let quizzes = []; // All quizzes
	let quizzesWithSimilarityScore = $state([]); // Quizzes sorted by similarity
	let loading = $state(true); // Loading flag

	async function loadSimilarQuizzes() {
		const modules = import.meta.glob("/src/routes/quiz/play/**/*.svelte");
		const currentQuizPath = $page.url.pathname.replace("src/routes", "");

		quizzesWithSimilarityScore = [];

		quizzes = await Promise.all(
			Object.entries(modules).map(async ([path, module]) => {
				const quizModule = await module();
				const quizMetadata = quizModule.metadata;
				const pathParts = path.split("/");
				const category = pathParts[pathParts.length - 3];
				const formattedPath = path.replace("/src/routes", "").replace("+page.svelte", "");

				// Check if this is the current quiz
				if (path.includes(currentQuizPath)) {
					metadata = quizMetadata; // Set metadata for the current quiz
				}

				return { ...quizMetadata, category, path: formattedPath };
			}),
		);

		setTitle(metadata.title + " Quiz"); // Set page title based on current quiz title

		// Calculate similarity scores for other quizzes
		quizzes.forEach((quiz) => {
			try {
				let similarityScore = 0;

				// Increase similarity score if quiz is in the same category
				similarityScore = quiz.category === metadata.category ? similarityScore + 2 : 0;

				// Increase similarity for each shared tag
				metadata.tags.forEach((tag) => {
					if (quiz.tags.includes(tag)) {
						similarityScore++;
					}
				});

				// Avoid recommending the current quiz
				if (quiz.title === metadata.title) {
					similarityScore = -1;
				}

				quizzesWithSimilarityScore.push([quiz, similarityScore]);
			} catch (error) {
				console.error("Error processing similarity for quizzes:", error);
			}
		});

		// Sort quizzes by similarity score
		quizzesWithSimilarityScore.sort((a, b) => b[1] - a[1]);

		// Keep top 6 most similar quizzes
		quizzesWithSimilarityScore = quizzesWithSimilarityScore.slice(0, 6).map(([quiz]) => quiz);

		loading = false;
	}

	$effect(() => {
		currentRoute = $page.url.pathname; // Current path, if it changes, re-load similar quizzes
	});

	$effect(() => {
		if (currentRoute) {
			loadSimilarQuizzes();
		}
	});
</script>

<article class="container mx-auto p-6 px-1 max-w-5xl">
	<a
		class="text-lg flex gap-3 justify-items-start items-center hover:opacity-50 transition-opacity w-fit"
		href="/quiz/"
	>
		<ArrowLeftIcon />
		Back
	</a>

	<!-- Display the current quiz title -->
	<h1 class="text-4xl font-bold mb-8 mt-4">{metadata.title} Quiz</h1>

	<!-- Slot for quiz content -->
	{@render children?.()}

	<!-- Similar quizzes section -->
	<h3 class="text-2xl font-bold mt-12 mb-4">Similar quizzes:</h3>
	<div class="flex flex-wrap justify-start items-stretch gap-5 overflow-visible pb-5">
		{#if loading}
			<p>Loading quizzes...</p>
		{:else if quizzesWithSimilarityScore.length === 0}
			<p>No quizzes available.</p>
		{:else}
			{#each quizzesWithSimilarityScore as quiz (quiz.path)}
				<QuizCard title={quiz.title} tags={quiz.tags || []} path={quiz.path}>
					{#if quiz.category == "countries" || quiz.category == "cities" || quiz.category == "regions" || quiz.category == "satellite" || quiz.category == "multinational-alliances"}
						<Map
							region={quiz.region}
							width={192}
							height={120}
							topoJsonName={quiz.topoJson}
							zoom={quiz.previewZoom || undefined}
							projectionType={quiz.category == "satellite" ? "geoOrthographic" : "geoMercator"}
							projectionRotation={quiz.projectionRotation || undefined}
							showPoints={!(quiz.category == "countries" || quiz.category == "regions" || quiz.category == "satellite")}
						/>
					{/if}
					{#if quiz.category == "flags"}
						<FlagStackPreview region={quiz.region} />
					{/if}
					{#if quiz.category == "clues"}
						<QuizPreviewImage path={quiz.previewImagePath} />
					{/if}
				</QuizCard>
			{/each}
		{/if}
	</div>
</article>
