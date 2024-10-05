<script>
    import { ArrowLeftIcon } from "lucide-svelte";
</script>

<article class="container mx-auto p-6 max-w-3xl">
    <a
        class="text-lg flex gap-3 justify-items-start items-center hover:opacity-50 transition-opacity w-fit mb-4"
        href="/guides/">
        <ArrowLeftIcon />
        Back
    </a>
    <slot />
</article>
