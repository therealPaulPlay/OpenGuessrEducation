<script>
	import { onMount } from "svelte";
	import { Sun } from "lucide-svelte";
	import ArticleBox from "./ArticleBox.svelte";

	let sunPosition = $state("north");
	let hemisphere = $state("Southern");

	function toggleSunPosition() {
		sunPosition = sunPosition === "north" ? "south" : "north";
		hemisphere = sunPosition === "north" ? "Southern" : "Northern";
	}

	onMount(() => {
		const compassElement = document.getElementById("compass");
		compassElement.style.transition = "transform 0.5s ease-in-out";
	});
</script>

<ArticleBox>
	<div class="relative w-24 h-48">
		<img
			id="compass"
			src="/assets/guides/compass_example.png"
			alt="Compass"
			class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 dark:invert"
		/>

		<Sun
			alt="Sun"
			class="absolute left-1/2 transform -translate-x-1/2 w-10 h-10"
			style=" top: {sunPosition === 'north' ? '0' : 'auto'}; bottom: {sunPosition === 'south' ? '0' : 'auto'};"
		/>
	</div>
	<p class="mt-4">
		Hemisphere: <span class="font-bold">{hemisphere}</span>
	</p>
	<div class="card-actions mt-4">
		<button class="btn btn-outline" onclick={toggleSunPosition}> Switch sun position </button>
	</div>
</ArticleBox>
