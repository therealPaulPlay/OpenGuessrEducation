<script>
	import { onMount } from "svelte";
	import { onDestroy } from "svelte";

	let {
		title = "This is an awesome guide.",
		description = "This guide will teach you the basics of creating guide cards, which is an important skill.",
		href = "/",
		hueRotate = 0,
		children, // For components that work like layouts (with a slot, in which HTML can be passed) - children needs to be specified as a prop
	} = $props();

	let mobile = $state(false);

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
		: 'card-side'} bg-base-200 shadow-md hover:shadow-xl transition-shadow duration-300 {mobile
		? 'max-h-64'
		: ''} overflow-hidden"
>
	<figure class="relative {mobile ? 'max-h-64' : ''} {mobile ? 'dark:brightness-50' : 'dark:opacity-80'}">
		<img
			src="/assets/guide_preview.png"
			class="h-full {mobile ? 'w-64' : 'w-48'}"
			style="filter: hue-rotate({hueRotate}deg)"
			alt="Guide preview"
		/>
		<div class="absolute h-full w-full">
			<div class="flex justify-center items-center w-full h-full text-base-200">
				{@render children?.()}
				<!-- formerly <slot /> in Svelte 4 -->
			</div>
		</div>
	</figure>
	<div class="card-body max-w-64">
		<h2 class="card-title text-ellipsis">{title}</h2>
		<p class="text-wrap max-h-24 text-clip">{description}</p>
		<div class="card-actions justify-end mt-auto -mb-1">
			<a class="btn btn-secondary btn-md" style="filter: hue-rotate({hueRotate}deg)" {href}>Read</a>
		</div>
	</div>
</div>
