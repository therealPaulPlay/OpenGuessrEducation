<script>
    import { ArrowLeftIcon } from "lucide-svelte";
    import ScrollUp from "$lib/components/ScrollUp.svelte";
    import { setTitle } from '$lib/utils/pageTitle.svelte.js';
    import { page } from "$app/stores"; 

    let { children } = $props();

    $effect(() => {    
        const pathParts = $page.url.pathname.split('/').filter(Boolean);
        const guideName = pathParts.at(-1).replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

        setTitle(guideName);
    });

</script>

<article class="container mx-auto p-6 px-1 max-w-3xl">
    <a
        class="text-lg flex gap-3 justify-items-start items-center hover:opacity-50 transition-opacity w-fit mb-4"
        href="/guides/">
        <ArrowLeftIcon />
        Back
    </a>
    {@render children?.()}
    <ScrollUp />
</article>