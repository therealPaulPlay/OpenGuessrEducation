<script>
    export let title = "This is an awesome guide.";
    export let description =
        "This guide will teach you the basics of creating guide cards, which is an important skill.";
    export let href = "/";
</script>

<div
    class="card card-side bg-base-200 shadow-md hover:shadow-xl transition-shadow duration-300">
    <figure class="relative">
        <img
            src="/src/lib/assets/guide_preview.png"
            class="h-30 w-48"
            alt="Guide preview" />
        <div class="absolute h-full w-full">
            <div
                class="flex justify-center items-center w-full h-full text-base-200">
                <slot />
            </div>
        </div>
    </figure>
    <div class="card-body max-w-xs">
        <h2 class="card-title">{title}</h2>
        <p class="text-wrap">{description}</p>
        <div class="card-actions justify-end">
            <a class="btn btn-secondary btn-md" {href}>Read</a>
        </div>
    </div>
</div>

<style>
</style>
