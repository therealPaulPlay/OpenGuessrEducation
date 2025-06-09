<script>
	import { Compass } from "lucide-svelte";
	let { mapName } = $props();
</script>

<div class="rounded-xl bg-base-200 mt-4 p-4 gap-2 flex justify-between items-center flex-wrap">
	<h3 class="font-bold text-lg px-2 grow-10 grow">Explore {mapName} in OpenGuessr.</h3>
	<a
		href="https://openguessr.com/?play-map={mapName.replaceAll(' ', '_')}"
		target="_blank"
		class="btn btn-accent grow"><Compass size="20" /> Explore</a
	>
</div>
