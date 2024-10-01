<script>
  import { onMount } from "svelte";
  import { quizMetadata } from "$lib/stores/quizMetadataStore.js";
  import { ArrowLeftIcon } from "lucide-svelte";
  import QuizCard from "$lib/components/QuizCard.svelte";

  // subscribe to quiz metadata store
  let metadata;
  quizMetadata.subscribe((value) => {
    metadata = value;
  });

  let quizzes = [];
  let loading = true;

  onMount(async () => {
    const modules = import.meta.glob("/src/routes/quiz/**/*.svelte");
    const loadedQuizzes = await Promise.all(
      Object.entries(modules).map(async ([path, module]) => {
        const { metadata } = await module();
        const pathParts = path.split("/");
        const category = pathParts[pathParts.length - 3];
        path = path.replace("/src/routes", "");
        return { ...metadata, category, path };
      }),
    );

    quizzes = loadedQuizzes;
    console.log(quizzes);
    loading = false;
  });
</script>

<article class="container mx-auto p-6 max-w-5xl">
  <a
    class="mt-12 text-lg flex gap-3 justify-items-start items-center hover:opacity-50 transition-opacity w-fit"
    href="/quiz/">
    <ArrowLeftIcon />
    Back
  </a>
  <h1 class="text-4xl font-bold mb-8 mt-4">{metadata.title} Quiz</h1>
  <slot />
  <h3 class="text-2xl font-bold mt-12 mb-4">Similar quizzes:</h3>
  <div
    class="flex flex-wrap justify-start items-stretch gap-5 overflow-visible pb-5">
    {#if loading}
      <p>Loading quizzes...</p>
    {:else if quizzes.length === 0}
      <p>No quizzes available.</p>
    {:else}
      {#each quizzes as quiz (quiz.path)}
        <QuizCard
          title={quiz.title}
          tags={quiz.tags || []}
          region={quiz.region}
          zoom={quiz.zoom}
          path={quiz.path} />
      {/each}
    {/if}
  </div>
</article>
