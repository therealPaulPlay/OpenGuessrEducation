<script>
    export let title = "Default title";
    export let path;
    export let tags = [];
</script>

<div
    class="card w-64 bg-base-200 shadow-md flex-shrink-0 hover:shadow-xl transition-shadow duration-300">
    <div class="card-body flex flex-col h-full">
        <div class="flex-grow">
            <h3 class="card-title text-xl mb-6 text-wrap h-10 items-start">
                {title}
            </h3>
            <div class="flex flex-wrap gap-2 mb-2">
                {#each tags || [] as tag}
                    <span class="badge badge-accent">{tag}</span>
                {/each}
            </div>
            <slot />
        </div>
        <div class="card-actions justify-end mt-auto">
            <a
                href={path.replace("/+page.svelte", "")}
                class="btn btn-secondary btn-md -mb-1 mt-2">Start Quiz</a>
        </div>
    </div>
</div>

