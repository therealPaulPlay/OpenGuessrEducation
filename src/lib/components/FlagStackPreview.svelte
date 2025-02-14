<script>
	import * as Icon from "svelte-flag-icons";

	let { region = "Europe" } = $props();

	let countryCodes;
	let regionsArray;

	let flagsLoaded = $state(false);

	async function fetchRegions() {
		try {
			if (!regionsArray) {
				regionsArray = await fetch("/json/regions.json");
				regionsArray = await regionsArray.json();
				if (region !== "All") {
					regionsArray = regionsArray[region];
				} else {
					regionsArray = regionsArray?.Europe.concat(
						regionsArray["Africa"],
						regionsArray["Asia"],
						regionsArray["Oceania"],
						regionsArray["South America"],
						regionsArray["North America"],
					);
				}

				shuffleArray(regionsArray);
			}
		} catch (error) {
			console.error("Error loading region - likely, that region does not exist. Error:", error);
		}
	}

	async function fetchCountryCodes() {
		try {
			if (!countryCodes) {
				const codes = await fetch("/json/countryCodes.json");
				countryCodes = await codes.json();
			}
		} catch (error) {
			console.error("Error fetching and processing country code json:", error);
		}
	}

	let Icon1 = $state();
	let Icon2 = $state();
	let Icon3 = $state();
	let Icon4 = $state();

	async function loadPreviewFlags() {
		await fetchRegions();
		await fetchCountryCodes();

		for (let i = 1; i <= 4; i++) {
			assignRandomIcon(i, 0);
		}

		flagsLoaded = true;
	}

	function assignRandomIcon(i, startIndex) {
		const randomRegionIndex = i + startIndex;
		const randomRegion = regionsArray[randomRegionIndex];

		try {
			switch (i) {
				case 1:
					Icon1 = Icon[countryCodes[randomRegion]];
					break;
				case 2:
					Icon2 = Icon[countryCodes[randomRegion]];
					break;
				case 3:
					Icon3 = Icon[countryCodes[randomRegion]];
					break;
				case 4:
					Icon4 = Icon[countryCodes[randomRegion]];
					break;
			}
		} catch (error) {
			console.warn("No flag icon for this region in the flag stack preview available:", error);
		}
	}

	loadPreviewFlags();

	function shuffleArray(array) {
		for (var i = array.length - 1; i >= 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}
</script>

<div class="custom-size rounded-lg overflow-hidden grow bg-base-300 relative">
	{#if flagsLoaded}
		<div class="absolute w-full h-full flex justify-center items-center dark:brightness-75 z-[5]">
			{#if Icon1}
				<Icon1 class="z-50" size="110" />
			{/if}
		</div>
		<div
			class="absolute w-full h-full flex justify-center items-center dark:brightness-50 brightness-75 z-[4] rotate-1"
		>
			{#if Icon2}
				<Icon2 class="z-40 ml-1 mt-1" size="110" />
			{/if}
		</div>
		<div class="absolute w-full h-full flex justify-center items-center dark:brightness-50 brightness-75 z-[3]">
			{#if Icon3}
				<Icon3 class="z-30 ml-2 mt-2" size="110" />
			{/if}
		</div>
		<div
			class="absolute w-full h-full flex justify-center items-center dark:brightness-50 brightness-50 z-[2] rotate-2"
		>
			{#if Icon4}
				<Icon4 class="z-20 ml-3 mt-3" size="110" />
			{/if}
		</div>
	{/if}
</div>

<style>
	.custom-size {
		width: 216px;
		height: 135px;
		background-blend-mode: luminosity;
	}
</style>
