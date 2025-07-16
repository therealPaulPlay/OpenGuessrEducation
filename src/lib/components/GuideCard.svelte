<script>
	import { onMount } from "svelte";
	import { onDestroy } from "svelte";

	let {
		title = "This is an awesome guide.",
		description = "This guide will teach you the basics of creating guide cards.",
		href = "/",
		hueRotate = 0,
		children, // For components that work like layouts (with a slot, in which HTML can be passed) - children needs to be specified as a prop
	} = $props();

	onMount(() => {
		if (window) {
			handleResize(); // Check on mount
			window.addEventListener("resize", handleResize); // Listen to resize
		}
	});
</script>

<div
	class="card shadow-sm/5 border image-full border-accent hover:shadow-xl transition hover:-translate-y-1 overflow-hidden duration-300 max-h-68 flex-1 min-w-60"
>
	<figure class="relative h-full rounded-none!">
		<div class="h-full w-full min-w-48 bg-secondary/20" style="filter: hue-rotate({hueRotate}deg);">
			<div class="flex justify-center items-center w-full h-full text-base-100/35">
				{@render children?.()}
				<!-- formerly <slot /> in Svelte 4 -->
			</div>
		</div>
	</figure>
	<div class="card-body">
		<h2 class="card-title text-ellipsis text-base-content">{title}</h2>
		<p class="text-wrap overflow-hidden leading-5 text-base-content">
			{description}
		</p>
		<div class="card-actions justify-end mt-4">
			<a class="btn btn-secondary btn-md" style="filter: hue-rotate({hueRotate}deg)" {href}>Read</a>
		</div>
	</div>
</div>
