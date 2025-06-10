<script>
	import ScrollUp from "$lib/components/ScrollUp.svelte";
	import { setTitle } from "$lib/utils/pageTitle.svelte.js";
	import { page } from "$app/state";
	import GoBack from "$lib/components/GoBack.svelte";

	let { children } = $props();

	$effect(() => {
		const pathParts = page.url.pathname.split("/").filter(Boolean);
		const guideName = pathParts
			.at(-1)
			.replace(/-/g, " ")
			.replace(/^\w/, (c) => c.toUpperCase());
		setTitle(guideName);
	});
</script>

<article class="container mx-auto p-6 px-1 max-w-3xl">
	<GoBack href="/guides/" />
	{@render children?.()}
	<ScrollUp />
</article>
