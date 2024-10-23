<script>
    import { ArrowLeftIcon } from "lucide-svelte";
    import { ArrowUp } from "lucide-svelte";
    import { onMount } from "svelte";

    let { children } = $props();

    let showScrollButton = $state(false);

    function checkScrollable() {
        showScrollButton =
            document.documentElement.scrollHeight > window.innerHeight;
    }

    function scrollTop() {
        if (window) {
            window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        }
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

<svelte:window onscroll={checkScrollable} />

<article class="container mx-auto p-6 px-1 max-w-3xl">
    <a
        class="text-lg flex gap-3 justify-items-start items-center hover:opacity-50 transition-opacity w-fit mb-4"
        href="/guides/">
        <ArrowLeftIcon />
        Back
    </a>
    {@render children?.()}
    {#if showScrollButton}
        <div class="w-full flex justify-center mt-12">
            <button class="btn btn-wide btn-accent" onclick={scrollTop}>
                <ArrowUp /> Back to top
            </button>
        </div>
    {/if}
</article>