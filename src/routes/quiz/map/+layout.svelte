<script>
  import { quizMetadata } from '$lib/stores/quizMetadataStore.js';
  import { ArrowLeftIcon } from 'lucide-svelte';

let metadata;
quizMetadata.subscribe(value => {
  metadata = value;
});
</script>

<article class="container mx-auto p-6 max-w-5xl">
    <a class="mt-12 text-lg flex gap-3 justify-start items-center hover:opacity-50 transition-opacity w-fit" href="/quiz/">
        <ArrowLeftIcon />
        Back
    </a>
    <h1 class="text-4xl font-bold mb-8 mt-4">{metadata.title} Quiz</h1>
    <slot />
    <h3 class="text-2xl font-bold mt-12 mb-4">Other quizzes you might like:</h3>
</article>
