<script>
	import { Star } from "lucide-svelte";
	import { onMount } from "svelte";
	import * as Icon from "svelte-flag-icons";
	let { country } = $props();

	let IconComponent = $state();

	let countryCodes;
	let favoriteCountries = $state();

	async function fetchCountryCodes() {
		try {
			if (!countryCodes) {
				const codes = await fetch("/json/countryCodes.json");
				const jsonCodes = await codes.json();
				return jsonCodes;
			}

			return countryCodes;
		} catch (error) {
			console.error("Error fetching and processing country code json:", error);
		}
	}

	async function fetchFavorites() {
		try {
			if (!favoriteCountries) {
				const favorites = await fetch("/json/country-data/favorite-countries.json");
				const parsedFavorites = await favorites.json();
				return parsedFavorites?.favorites;
			}

			return favoriteCountries;
		} catch (error) {
			console.error("Error fetching and processing country code json:", error);
		}
	}

	onMount(async () => {
		countryCodes = await fetchCountryCodes();
		favoriteCountries = await fetchFavorites();
		IconComponent = Icon[countryCodes[country]] || undefined;
	});

	let isFavorite = $derived(
		favoriteCountries && favoriteCountries?.find((element) => element?.toLowerCase() == country?.toLowerCase()),
	);
</script>

<a
	class="px-2 py-1 bg-base-200 rounded-md hover:scale-95 transition-all cursor-pointer box-border m-0.5 {isFavorite
		? 'outline outline-1 outline-secondary'
		: ''}"
	href="/countries/learn/{country.toLowerCase().replaceAll(' ', '-')}"
>
	<div class="flex gap-2 items-center">
		{#if isFavorite}
			<div class="p-1 flex items-center justify-center text-secondary">
				<Star strokeWidth={1.5} />
			</div>
		{/if}
		<p class="text-lg">
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
