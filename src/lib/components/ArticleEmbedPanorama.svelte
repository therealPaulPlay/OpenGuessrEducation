<script>
	let { src } = $props();
</script>

<!-- iframe with lazy loading, meaning, it will only be loaded if it's in the viewport -->
<iframe
	{src}
	class="w-full rounded-xl mt-4 bg-base-200"
	title="Panorama Images"
	width="600"
	height="400"
	style="border:0;"
	allowfullscreen=""
	loading="lazy"
	referrerpolicy="no-referrer-when-downgrade"
></iframe>
