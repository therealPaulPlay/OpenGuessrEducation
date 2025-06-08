<script>
	import { onMount } from "svelte";
	import * as Icon from "svelte-flag-icons";
	import { countryStore } from "$lib/stores/countryStore";

	let { country } = $props();
	let IconComponent = $state();

	let countryCodes = $derived($countryStore.countryCodes);
	let favoriteCountries = $derived($countryStore.favoriteCountries);

	let isFavorite = $derived(favoriteCountries.some((element) => element?.toLowerCase() === country?.toLowerCase()));

	$effect(() => {
		if (countryCodes) {
			IconComponent = Icon[countryCodes[country]] || undefined;
		}
	});
</script>

<a
	class="px-2 py-1 bg-base-300 rounded-md hover:scale-95 transition-all cursor-pointer box-border m-0.5 {isFavorite
		? 'outline outline-1 outline-secondary'
		: ''}"
	href="/countries/learn/{country.toLowerCase().replaceAll(' ', '-')}"
>
	<div class="flex gap-2 items-center">
		<p>
			{country}
		</p>
		{#if IconComponent}
			<IconComponent />
		{:else}
			<div class="h-3 w-5">
				<span class="loading loading-dots loading-sm"></span>
			</div>
		{/if}
	</div>
</a>
