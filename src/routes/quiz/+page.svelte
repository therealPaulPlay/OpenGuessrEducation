<script>
    import {
        ArrowLeft,
        ArrowRight,
        Globe,
        Flag,
        MapPin,
        Building2,
    } from "lucide-svelte";
    import { onMount } from "svelte";
    import QuizMap from "$lib/components/QuizMap.svelte";

    const categories = [
        { name: "Countries", icon: Globe, folder: "countries" },
        { name: "Regions", icon: MapPin, folder: "regions" },
        { name: "Cities", icon: Building2, folder: "cities" },
        { name: "Flags", icon: Flag, folder: "flags" },
    ];

    let quizCategories = [];
    let selectedTags = new Set();
    let scrollButtonVisibility = [];

    $: filteredQuizCategories = quizCategories.map((category) => ({
        ...category,
        quizzes: category.quizzes.filter(
            (quiz) =>
                selectedTags.size === 0 ||
                quiz.tags.some((tag) => selectedTags.has(tag)),
        ),
    }));

    onMount(async () => {
        const modules = import.meta.glob("/src/routes/quiz/**/*.svelte");
        const quizzes = await Promise.all(
            Object.entries(modules).map(async ([path, module]) => {
                const { metadata } = await module();
                const pathParts = path.split("/");
                const category = pathParts[pathParts.length - 3];
                path = path.replace("/src/routes", "");
                return { ...metadata, category, path };
            }),
        );

        quizCategories = categories.map((category) => ({
            ...category,
            quizzes: quizzes.filter(
                (quiz) => quiz.category === category.folder,
            ),
        }));

        // Initialize button visibility
        scrollButtonVisibility = quizCategories.map(() => ({
            left: false,
            right: false,
        }));

        // Delay visibility update to ensure elements are rendered
        setTimeout(updateAllButtonVisibility, 100);
    });

    function toggleTag(tag) {
        if (selectedTags.has(tag)) {
            selectedTags.delete(tag);
        } else {
            selectedTags.add(tag);
        }
        selectedTags = selectedTags; // Trigger reactivity
    }

    $: allTags = [
        ...new Set(
            quizCategories.flatMap((category) =>
                category.quizzes.flatMap((quiz) => quiz.tags || []),
            ),
        ),
    ];

    function scrollContainer(containerId, scrollAmount) {
        const container = document.getElementById(containerId);
        if (container) {
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
            updateButtonVisibility(containerId);
        }
    }

    function updateButtonVisibility(containerId) {
        const container = document.getElementById(containerId);
        const { scrollLeft, scrollWidth, clientWidth } = container;

        const index = parseInt(containerId.split("-")[2]);
        scrollButtonVisibility[index].left = scrollLeft > 0;
        scrollButtonVisibility[index].right =
            scrollLeft < scrollWidth - clientWidth;
    }

    function updateAllButtonVisibility() {
        quizCategories.forEach((_, index) => {
            updateButtonVisibility(`scroll-container-${index}`);
        });
    }
</script>

<article class="container mx-auto p-6">
    <h1 class="text-5xl font-bold mb-12">Discover Quizzes</h1>

    <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Filter by Continent:</h2>
        <div class="flex flex-wrap gap-2">
            {#each allTags as tag}
                {#if tag !== undefined}
                    <button
                        class="btn btn-sm {selectedTags.has(tag)
                            ? 'btn-secondary'
                            : 'btn-outline'}"
                        on:click={() => toggleTag(tag)}>
                        {tag}
                    </button>
                {/if}
            {/each}
        </div>
    </div>

    {#each filteredQuizCategories as category, index}
        <div class="mb-12">
            <h2 class="text-3xl font-semibold mb-4 flex items-center">
                <svelte:component this={category.icon} class="w-8 h-8 mr-2" />
                {category.name}
            </h2>
            <div class="relative">
                {#if scrollButtonVisibility[index]?.left}
                    <button
                        class="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-base-300 p-2 rounded-full shadow-lg items-center justify-center"
                        on:click={() =>
                            scrollContainer(`scroll-container-${index}`, -450)}>
                        <ArrowLeft />
                    </button>
                {/if}
                <div
                    id={`scroll-container-${index}`}
                    class="scroll-container flex space-x-4 overflow-x-auto flex-nowrap scrollbar-hide"
                    on:scroll={() =>
                        updateButtonVisibility(`scroll-container-${index}`)}>
                    {#each category.quizzes as quiz (quiz.path)}
                        <div
                            class="card w-64 bg-base-200 shadow-md flex-shrink-0 hover:shadow-xl transition-shadow duration-300">
                            <div class="card-body flex flex-col h-full">
                                <div class="flex-grow">
                                    <h3 class="card-title text-lg mb-4">
                                        {quiz.title}
                                    </h3>
                                    <div class="flex flex-wrap gap-2 mt-2 mb-4">
                                        {#each quiz.tags || [] as tag}
                                            <span class="badge badge-accent"
                                                >{tag}</span>
                                        {/each}
                                    </div>
                                    <QuizMap
                                        region={quiz.region}
                                        zoom={quiz.zoom}
                                        width={192}
                                        height={120}
                                        key={quiz.path} />
                                </div>
                                <div class="card-actions justify-end mt-auto">
                                    <a
                                        href={quiz.path.replace(
                                            "/+page.svelte",
                                            "",
                                        )}
                                        class="btn btn-secondary btn-sm"
                                        >Start Quiz</a>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
                {#if scrollButtonVisibility[index]?.right}
                    <button
                        class="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-base-300 p-2 rounded-full shadow-lg items-center justify-center"
                        on:click={() =>
                            scrollContainer(`scroll-container-${index}`, 450)}>
                        <ArrowRight />
                    </button>
                {/if}
                <div
                    class="fade-left transition-opacity {scrollButtonVisibility[
                        index
                    ]?.left
                        ? 'opacity-100'
                        : 'opacity-0'}">
                </div>
                <div
                    class="fade-right transition-opacity {scrollButtonVisibility[
                        index
                    ]?.right
                        ? 'opacity-100'
                        : 'opacity-0'}">
                </div>
            </div>
        </div>
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
        padding: 35px 15px;
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
        width: 100px;
        height: 100%;
        background: linear-gradient(
            to right,
            oklch(var(--b1)),
            rgba(255, 255, 255, 0)
        );
        pointer-events: none;
        z-index: 10; /* Ensure it appears above the scroll container */
    }

    .fade-right {
        position: absolute;
        top: 0;
        right: 0;
        width: 100px;
        height: 100%;
        background: linear-gradient(
            to left,
            oklch(var(--b1)),
            rgba(255, 255, 255, 0)
        );
        pointer-events: none; /* Prevent interaction */
        z-index: 10; /* Ensure it appears above the scroll container */
    }

    .card {
        display: inline-block;
        vertical-align: top;
        white-space: normal;
    }
</style>
