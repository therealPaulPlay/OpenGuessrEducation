<script>
	import { goto } from "$app/navigation";
	import { onMount, onDestroy } from "svelte";

	let { title = "Default title", path, hueRotateDegree = 0, children } = $props();

	let containerRef;
	let hasBeenVisible = $state(false); // Changed from isVisible to hasBeenVisible
	let observer;

	onMount(() => {
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// Once visible, set to true and disconnect the observer
						hasBeenVisible = true;
						observer.disconnect();
					}
				});
			},
			{
				root: null,
				rootMargin: "50px",
				threshold: 0.1,
			},
		);

		if (containerRef) observer.observe(containerRef);
	});

	onDestroy(() => {
		if (observer) observer.disconnect();
	});
</script>

<div
	bind:this={containerRef}
	class="card w-64 border border-accent shadow-sm/5 flex-shrink-0 hover:shadow-xl transition duration-300 hover:-translate-y-1"
>
	<div class="card-body flex flex-col h-full">
		<div class="flex-grow">
			<h3 class="card-title text-xl mb-6 text-wrap h-10 items-start">
				{title}
			</h3>
			<!-- Render children once it has been visible -->
			{#if hasBeenVisible}
				{@render children?.()}
			{/if}
		</div>
		<div class="card-actions justify-end mt-auto">
			<button
				style="filter: hue-rotate({hueRotateDegree}deg)"
				class="btn btn-secondary btn-md mt-2 w-full"
				onclick={() => {
					goto(path.replace("/+page.svelte", ""));
				}}
			>
				Play
			</button>
		</div>
	</div>
</div>
