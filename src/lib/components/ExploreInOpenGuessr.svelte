<script>
	import { Compass } from "lucide-svelte";
	let { mapName } = $props();
</script>

<div class="rounded-xl bg-base-200 mt-4 p-2 gap-2 flex justify-between items-center flex-wrap">
	<h3 class="font-bold text-md px-2 opacity-75 grow-[10] grow">Explore {mapName} in OpenGuessr.</h3>
	<a
		href="https://openguessr.com/?play-map={mapName.replaceAll(' ', '_')}"
		target="_blank"
		class="btn btn-sm btn-accent grow"><Compass size="20" /> Explore</a
	>
</div>
