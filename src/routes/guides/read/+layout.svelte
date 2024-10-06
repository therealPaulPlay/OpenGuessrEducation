<script>
    import { ArrowLeftIcon } from "lucide-svelte";
    import { ArrowUp } from "lucide-svelte";
    import { scrollTop } from "svelte-scrolling";
    import { onMount } from "svelte";

    let showScrollButton = false;

    function checkScrollable() {
        showScrollButton =
            document.documentElement.scrollHeight > window.innerHeight;
    }

    onMount(() => {
        if (window && document) {
            checkScrollable();
            window.addEventListener("resize", checkScrollable);
            return () => {
                window.removeEventListener("resize", checkScrollable);
            };
        }
    });
</script>

<article class="container mx-auto p-6 max-w-3xl">
    <a
        class="text-lg flex gap-3 justify-items-start items-center hover:opacity-50 transition-opacity w-fit mb-4"
        href="/guides/">
        <ArrowLeftIcon />
        Back
    </a>
    <slot />
    {#if showScrollButton}
        <div class="w-full flex justify-center mt-12">
            <button class="btn btn-wide btn-accent" on:click={scrollTop}>
                <ArrowUp /> Back to top
            </button>
        </div>
    {/if}
</article>