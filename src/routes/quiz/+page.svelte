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
                const category = pathParts[pathParts.length - 3]; // Assuming /quiz/category/quiz-name/+page.svelte structure
                return { ...metadata, category, path };
            }),
        );

        quizCategories = categories.map((category) => ({
            ...category,
            quizzes: quizzes.filter(
                (quiz) => quiz.category === category.folder,
            ),
        }));
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
</script>

<article class="container mx-auto p-6">
    <h1 class="text-5xl font-bold mb-12">Discover Quizzes</h1>

    <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Filter by Tag:</h2>
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
                <button
                    id="left-button-{index}"
                    class="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-base-300 p-2 rounded-full shadow-lg hidden items-center justify-center">
                    <ArrowLeft />
                </button>
                <div
                    id="left-fade-{index}"
                    class="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-base-100 to-transparent z-10 pointer-events-none opacity-0 transition-opacity duration-300"></div>
                </div>
                <div
                    class="scroll-container flex space-x-4 overflow-x-auto flex-nowrap scrollbar-hide">
                    {#each category.quizzes as quiz}
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
                                        height={120} />
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
                <div
                    id="right-fade-{index}"
                    class="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-base-100 to-transparent z-10 pointer-events-none opacity-0 transition-opacity duration-300">
                </div>
                <button
                    id="right-button-{index}"
                    class="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-base-300 p-2 rounded-full shadow-lg hidden items-center justify-center">
                    <ArrowRight />
                </button>
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
        margin-left: -15px;
        overflow-x: auto;
        overflow-y: visible;
        white-space: nowrap;
    }
    .card {
        display: inline-block;
        vertical-align: top;
        white-space: normal;
    }
</style>
