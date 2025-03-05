<script>
	import { ArrowUp } from "lucide-svelte";

	let showScrollButton = $state(false);

	function checkScrollable() {
		showScrollButton = document.documentElement.scrollHeight > window.innerHeight;
	}

	function scrollTop() {
		if (window) {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
	}

	$effect(() => {
		checkScrollable();
	});
</script>

<svelte:window onscroll={checkScrollable} />

{#if showScrollButton}
	<div class="w-full flex justify-center mt-12">
		<button class="btn btn-wide btn-accent" onclick={scrollTop}>
			<ArrowUp /> Back to top
		</button>
	</div>
{/if}
