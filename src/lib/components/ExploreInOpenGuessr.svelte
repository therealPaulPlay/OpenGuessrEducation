<script>
	let { mapName } = $props();
</script>

<div class="rounded-2xl mt-4 flex flex-wrap justify-center border border-accent shadow-sm/5 p-2 px-4 w-full gap-x-2">
	<p class="text-center">Want to explore {mapName} in OpenGuessr?</p>
	<a href="https://openguessr.com/?play-map={mapName.replaceAll(' ', '_')}" target="_blank" class="text-secondary">
		Play the map!</a
	>
</div>
