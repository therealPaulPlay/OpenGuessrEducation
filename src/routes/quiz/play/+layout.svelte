<script>
  import { onMount } from "svelte";
  import { quizMetadata } from "$lib/stores/quizMetadataStore.js";
  import { ArrowLeftIcon } from "lucide-svelte";
  import QuizCard from "$lib/components/QuizCard.svelte";
  import QuizMap from "$lib/components/QuizMap.svelte";

  // subscribe to quiz metadata store
  let metadata;
  quizMetadata.subscribe((value) => {
    metadata = value;
  });

  let quizzes = [];

  // Filter through quizzes to find ones that are as similar as possible
  let quizzesWithSimilarityScore = [];
  let loading = true;

  onMount(async () => {
    const modules = import.meta.glob("/src/routes/quiz/play/**/*.svelte");

    quizzes = await Promise.all(
      Object.entries(modules).map(async ([path, module]) => {
        const quizModule = await module();
        const metadata = quizModule.metadata;
        const pathParts = path.split("/");
        const category = pathParts[pathParts.length - 3];
        path = path.replace("/src/routes", "");
        return { ...metadata, category, path };
      }),
    );

    quizzes.forEach((quiz) => {
      try {
        let similarityScore = 0;

        // If the quiz has the same category as the current quiz, increase its similarity
        similarityScore =
          quiz.category == metadata.category ? similarityScore + 2 : 0;

        // For each tag that the quiz shares with the current quiz, increase its similarity
        metadata.tags.forEach((tag) => {
          if (quiz.tags.includes(tag)) {
            similarityScore++;
          }
        });

        // If the quiz is the current quiz (would be silly to recommend a user to play the same quiz again), set the similarity to -1
        if (quiz.title == metadata.title) {
          similarityScore = -1;
        }

        quizzesWithSimilarityScore.push([quiz, similarityScore]);
      } catch (error) {
        console.error("Error processing similarity for quizzes:", error);
      }
    });

    // Sort the quizzes by similarity score in descending order (b-a flips the order)
    quizzesWithSimilarityScore.sort((a, b) => b[1] - a[1]);

    // Keep only the top 6 quizzes with the highest similarity scores
    quizzesWithSimilarityScore = quizzesWithSimilarityScore
      .slice(0, 6)
      .map(([quiz, score]) => quiz);
  });

  loading = false;
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
    {:else if quizzesWithSimilarityScore.length === 0}
      <p>No quizzes available.</p>
    {:else}
      {#each quizzesWithSimilarityScore as quiz (quiz.path)}
        <QuizCard title={quiz.title} tags={quiz.tags || []} path={quiz.path}>
          <QuizMap
            region={quiz.region}
            zoom={quiz.zoom}
            width={192}
            height={120} />
        </QuizCard>
      {/each}
    {/if}
  </div>
</article>
