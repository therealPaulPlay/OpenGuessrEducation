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
		if (countryCodes) IconComponent = Icon[countryCodes[country]] || undefined;
	});
</script>

<a
	class="btn border-accent btn-sm btn-outline relative {isFavorite ? 'border-secondary' : ''}"
	href="/countries/learn/{country.toLowerCase().replaceAll(' ', '-')}"
>
	<div class="flex gap-2 items-center mx-auto overflow-hidden flex justify-center">
		<p class="truncate text-nowrap max-w-6/9">
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
