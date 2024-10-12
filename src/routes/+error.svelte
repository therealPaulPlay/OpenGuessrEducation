<script>
    import { page } from "$app/stores";
</script>

<article class="container mx-auto p-6 max-w-5xl h-full">
    <main class="flex h-full w-full items-center justify-center flex-col">
        {#if $page.status != 404}
        <h1 class="text-4xl font-bold mb-4 text-primary text-center">
            An error occured: {$page.status}
        </h1>
        <p class="text-xl text-center">
            We searched the entire planet but couldn't find a solution.
        </p>
        {:else}
        <h1 class="text-4xl font-bold mb-4 text-primary text-center">
            There's no page for that yet.
        </h1>
        <p class="text-xl text-center">
            If were looking for a country, it likely has no streetview coverage. <br>
            Maybe this will be a page in the future!
        </p>
        {/if}
    </main>
</article>
