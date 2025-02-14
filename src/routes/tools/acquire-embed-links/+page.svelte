<script>
	import { onMount } from "svelte";
	import { setTitle } from "$lib/utils/pageTitle.svelte.js";

	onMount(() => {
		setTitle("How to Embed Google Street View in an Article");
	});
</script>

<article class="container mx-auto p-6 px-1">
	<h1 class="text-4xl font-bold mb-8">How to get Embed Links from Google Street View</h1>

	<p class="mb-4 max-w-2xl">
		Let's take a quick look at how you can get the <b>correct link</b> to use for embeds in your article from Google Street
		View.
	</p>
	<ul class="list list-decimal list-inside mb-4 max-w-2xl">
		<li>
			First, visit <a href="https://www.google.com/maps/" target="_blank" class="text-secondary">Google Maps</a> on a
			desktop computer and open a Street View.
			<img src="/assets/tools/embed_tutorial_1.png" class="h-40 w-72 object-cover" alt="embed tutorial" />
		</li>
		<li>
			Then, select the <b>embed</b> option from the menu with 3-dots.
			<img src="/assets/tools/embed_tutorial_2.png" class="h-30 w-72 object-cover" alt="embed tutorial" />
		</li>
		<li>
			Now, select the <b>Embed a Map</b> option.
			<img src="/assets/tools/embed_tutorial_3.png" class="h-40 w-72 object-cover" alt="embed tutorial" />
		</li>
		<li>
			Then, copy the HTML.
			<img src="/assets/tools/embed_tutorial_4.png" class="h-7 w-72 object-cover" alt="embed tutorial" />
		</li>
		<li>
			Lastly, extract only the URL ("src", the source) from this code.
			<img src="/assets/tools/embed_tutorial_5.png" class="h-8 w-96 object-cover" alt="embed tutorial" />
		</li>
		<li>
			You can now use this link in the Article Embed Component like so.<br />
			<div class="rounded-lg bg-base-200 p-2 py-1 mt-2">
				[Component ArticleEmbedPanorama]<br />
				https://www.google.com/maps/embed?pb=!4v1730051802424!6m8!1m7!1sVS3kXPSfmU8uR4VtfmZgZA!2m2!1d41.11137968057349!2d20.0819716044217!3f195.42901557805902!4f7.429448022263529!5f2.868877958143495
				<br />
				[/Component]
			</div>
		</li>
	</ul>
</article>

<style>
	li {
		margin-bottom: 2rem;
	}
</style>
