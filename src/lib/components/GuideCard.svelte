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
		mobile = window.matchMedia("(max-width: 1280px)").matches;
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
		: 'card-side'} bg-base-300 shadow-md hover:shadow-xl transition-shadow overflow-hidden duration-300 max-h-58 {mobile
		? 'max-h-42'
		: ''}"
>
	<figure class="relative h-full {mobile ? 'brightness-30' : ''}">
		<img
			src="/assets/home/guide_preview.png"
			class="h-full w-48"
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
		<p
			class="text-wrap overflow-hidden {mobile ? 'mask-b-from-50% mask-b-to-100% leading-5' : ''} {mobile
				? 'max-h-10'
				: 'max-h-20'}"
		>
			{description}
		</p>
		<div class="card-actions justify-end mt-auto -mb-1">
			<a class="btn btn-secondary btn-md" style="filter: hue-rotate({hueRotate}deg)" {href}>Read</a>
		</div>
	</div>
</div>
