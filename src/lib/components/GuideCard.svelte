<script>
    import { onMount } from "svelte";
    import { onDestroy } from "svelte";

    export let title = "This is an awesome guide.";
    export let description =
        "This guide will teach you the basics of creating guide cards, which is an important skill.";
    export let href = "/";

    export let hueRotate = 0;

    let mobile = false;

    const handleResize = () => {
        mobile = window.matchMedia("(max-width: 600px)").matches;
    };

    onMount(() => {
        if (window) {
            handleResize(); // Check on mount
            window.addEventListener("resize", handleResize); // Listen to resize
        }
    });
</script>

<div
    class="card {mobile
        ? 'image-full'
        : 'card-side'} bg-base-200 shadow-md hover:shadow-xl transition-shadow duration-300">
    <figure class="relative">
        <img
            src="/src/lib/assets/guide_preview.png"
            class="h-full {mobile ? 'w-64' : 'w-48'} dark:opacity-90"
            style="filter: hue-rotate({hueRotate}deg)"
            alt="Guide preview" />
        <div class="absolute h-full w-full">
            <div
                class="flex justify-center items-center w-full h-full text-base-200">
                <slot />
            </div>
        </div>
    </figure>
    <div class="card-body max-w-64">
        <h2 class="card-title text-ellipsis">{title}</h2>
        <p class="text-wrap max-h-24 text-clip">{description}</p>
        <div class="card-actions justify-end mt-auto -mb-1">
            <a
                class="btn btn-secondary btn-md"
                style="filter: hue-rotate({hueRotate}deg)"
                {href}>Read</a>
        </div>
    </div>
</div>
