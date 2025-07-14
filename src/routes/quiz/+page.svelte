<script>
	import {
		ArrowLeft,
		ArrowRight,
		Globe,
		Flag,
		MapPin,
		Building2,
		Satellite,
		Lightbulb,
		Handshake,
	} from "lucide-svelte";
	import { onMount } from "svelte";
	import QuizCard from "$lib/components/QuizCard.svelte";
	import Map from "$lib/components/Map.svelte";
	import FlagStackPreview from "$lib/components/FlagStackPreview.svelte";
	import QuizPreviewImage from "$lib/components/QuizPreviewImage.svelte";
	import { setTitle } from "$lib/utils/pageTitle.svelte.js";

	// Category names have to match the path / folder names
	const categories = [
		{ name: "countries", icon: Globe },
		{ name: "regions", icon: MapPin },
		{ name: "cities", icon: Building2 },
		{ name: "flags", icon: Flag },
		{ name: "satellite", icon: Satellite },
		{ name: "clues", icon: Lightbulb },
		{ name: "multinational-alliances", icon: Handshake },
	];

	let quizCategories = $state([]);
	let selectedTags = $state(new Set());
	let scrollButtonVisibility = $state([]);

	let filteredQuizCategories = $derived(
		quizCategories.map((category) => ({
			...category,
			quizzes: category.quizzes.filter(
				(quiz) => selectedTags.size === 0 || quiz.tags.some((tag) => selectedTags.has(tag)),
			),
		})),
	);

	onMount(async () => {
		setTitle("Discover quizzes");
		const modules = import.meta.glob("/src/routes/quiz/play/**/*.svelte");
		const quizzes = await Promise.all(
			Object.entries(modules).map(async ([path, module]) => {
				const { metadata } = await module();
				const pathParts = path.split("/");
				const category = pathParts[pathParts.length - 3];
				path = path.replace("/src/routes", "");
				return { ...metadata, category, path };
			}),
		);

		// add matching quizzes to each category
		quizCategories = categories.map((category) => ({
			...category,
			quizzes: quizzes.filter((quiz) => quiz.category === category.name.toLocaleLowerCase()),
		}));

		// Initialize button visibility
		scrollButtonVisibility = quizCategories.map(() => ({
			left: false,
			right: false,
		}));

		// Delay visibility update to ensure elements are rendered
		setTimeout(updateAllButtonVisibility, 10);
	});

	let allTags = $derived([
		...new Set(quizCategories.flatMap((category) => category.quizzes.flatMap((quiz) => quiz.tags || []))),
	]);

	function toggleTag(tag) {
		if (selectedTags.has(tag)) selectedTags.delete(tag);
		else selectedTags.add(tag);

		const newSet = selectedTags;
		selectedTags = new Set();
		selectedTags = newSet;

		// Delay visibility update to ensure elements are rendered
		setTimeout(updateAllButtonVisibility, 10);
	}

	function scrollContainer(containerId, scrollAmount) {
		const container = document.getElementById(containerId);
		if (container) {
			const { scrollLeft, scrollWidth, clientWidth } = container;
			const newScrollLeft = Math.max(0, Math.min(scrollLeft + scrollAmount, scrollWidth - clientWidth));

			container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
			setTimeout(() => updateButtonVisibility(containerId), 100);
		}
	}

	function updateButtonVisibility(containerId) {
		try {
			const container = document.getElementById(containerId);
			const { scrollLeft, scrollWidth, clientWidth } = container;

			const index = parseInt(containerId.split("-")[2]);
			scrollButtonVisibility[index].left = scrollLeft > 0;
			scrollButtonVisibility[index].right = scrollLeft < scrollWidth - clientWidth;
		} catch (error) {
			console.error("Error in updateButtonVisability:", error);
		}
	}

	function updateAllButtonVisibility() {
		quizCategories.forEach((_, index) => {
			updateButtonVisibility(`scroll-container-${index}`);
		});
	}

	function formatCategoryName(input) {
		return input
			.replace(/-/g, " ")
			.toLowerCase()
			.split(" ")
			.map((word, index) => {
				return index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word.toLowerCase();
			})
			.join(" ");
	}
</script>

<article class="mx-auto py-6">
	<h1 class="text-5xl font-bold mb-8">Discover quizzes</h1>

	<div class="mb-8">
		<h2 class="text-2xl font-semibold mb-4">Filter by continent:</h2>
		<div class="w-fit max-sm:mask-x-from-93% max-sm:mask-x-to-100% mr-auto max-w-full max-sm:-ml-2">
			<div class="flex gap-2 overflow-x-auto overflow-y-hidden max-sm:px-2">
				{#each allTags as tag}
					{#if tag !== undefined}
						<button
							class="btn btn-sm {selectedTags.has(tag) ? 'btn-secondary' : 'btn-outline'}"
							onclick={() => toggleTag(tag)}
						>
							{tag}
						</button>
					{/if}
				{/each}
			</div>
		</div>
	</div>
	{#each filteredQuizCategories as category, index}
		<section class="mb-6" id={category.name}>
			<h2 class="text-3xl font-semibold mb-2 flex items-center">
				<category.icon class="w-8 h-8 mr-2" />
				{formatCategoryName(category.name)}
			</h2>
			<div class="relative">
				{#if scrollButtonVisibility[index]?.left}
					<button
						class="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-base-300 p-2 rounded-full shadow-lg items-center justify-center"
						onclick={() => scrollContainer(`scroll-container-${index}`, -460)}
					>
						<ArrowLeft />
					</button>
				{/if}
				<div
					id={`scroll-container-${index}`}
					class="scroll-container flex space-x-4 overflow-x-auto flex-nowrap scrollbar-hide"
					onscroll={() => updateButtonVisibility(`scroll-container-${index}`)}
				>
					{#each category.quizzes as quiz (quiz.path)}
						<QuizCard title={quiz.title} tags={quiz.tags || []} path={quiz.path} hueRotateDegree={index * 30}>
							{#if category.name == "countries" || category.name == "cities" || category.name == "regions" || category.name == "satellite" || category.name == "multinational-alliances"}
								<Map
									region={quiz.region}
									width={192}
									height={120}
									countryOutlineColor="var(--color-secondary)"
									hueRotateDegree={index * 30}
									topoJsonName={quiz.topoJson}
									projectionRotation={quiz.projectionRotation || undefined}
									zoom={quiz.previewZoom || undefined}
									projectionType={category.name == "satellite" ? "geoOrthographic" : "geoMercator"}
									showPoints={!(
										category.name.toLowerCase() === "countries" ||
										category.name.toLowerCase() === "regions" ||
										category.name.toLowerCase() === "satellite"
									)}
								/>
							{/if}
							{#if category.name == "flags"}
								<FlagStackPreview region={quiz.region} />
							{/if}
							{#if category.name == "clues"}
								<QuizPreviewImage path={quiz.previewImagePath} />
							{/if}
						</QuizCard>
					{/each}
					{#if category.quizzes.length == 0}
						<p class="p-4">No matching results in this category.</p>
					{/if}
				</div>
				{#if scrollButtonVisibility[index]?.right}
					<button
						class="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-base-300 p-2 rounded-full shadow-lg items-center justify-center"
						onclick={() => scrollContainer(`scroll-container-${index}`, 460)}
					>
						<ArrowRight />
					</button>
				{/if}
				<div
					class="fade-left transition-opacity {scrollButtonVisibility[index]?.left ? 'opacity-100' : 'opacity-0'}"
				></div>
				<div
					class="fade-right transition-opacity {scrollButtonVisibility[index]?.right ? 'opacity-100' : 'opacity-0'}"
				></div>
			</div>
		</section>
	{/each}
</article>

<style>
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}

	.scroll-container {
		padding: 35px 5px;
		padding-top: 20px;
		overflow-x: auto;
		overflow-y: visible;
		white-space: nowrap;
		position: relative; /* Add this for positioning the fade effects */
	}

	.fade-left {
		position: absolute;
		top: 0;
		left: 0;
		width: 12vw;
		height: 100%;
		background: linear-gradient(to right, var(--color-base-100), rgba(255, 255, 255, 0));
		pointer-events: none;
		z-index: 10; /* Ensure it appears above the scroll container */
	}

	.fade-right {
		position: absolute;
		top: 0;
		right: 0;
		width: 12vw;
		height: 100%;
		background: linear-gradient(to left, var(--color-base-100), rgba(255, 255, 255, 0));
		pointer-events: none; /* Prevent interaction */
		z-index: 10; /* Ensure it appears above the scroll container */
	}
</style>
