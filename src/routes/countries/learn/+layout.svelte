<script>
	import { page } from "$app/stores"; // To get the current URL
	import Map from "$lib/components/Map.svelte";
	import {
		ArrowLeftIcon,
		EthernetPort,
		Phone,
		Flag,
		Languages,
		UsersRound,
		CircleDollarSign,
		Compass,
	} from "lucide-svelte";
	import ArticleEditButton from "$lib/components/ArticleEditButton.svelte";
	import * as Icon from "svelte-flag-icons";
	import { onMount } from "svelte";
	import ScrollUp from "$lib/components/ScrollUp.svelte";
	import { setTitle } from "$lib/utils/pageTitle.svelte.js";

	let { children } = $props();

	let countryNameFromPath;

	let countryName = $state("Loading...");

	let IconComponent = $state();

	// JSON data
	let jsonDataLoading = $state(true);
	let countryCodes = $state();
	let telephonePrefixes = $state();
	let topLevelDomains = $state();
	let countryLanguages = $state();
	let populationData = $state();
	let countryGDP = $state();
	let videoSources = $state();

	let childrenContainer = $state();

	async function fetchCountryCodes() {
		if (countryCodes) return;
		countryCodes = await fetch("/json/countryCodes.json").then((response) => response.json());
	}

	async function fetchJsonData() {
		if (telephonePrefixes && topLevelDomains) return; // if everything is already loaded, skip

		try {
			[telephonePrefixes, topLevelDomains, countryLanguages, populationData, countryGDP, videoSources] =
				await Promise.all([
					fetch("/json/country-data/telephone-prefixes.json").then((response) => response.json()),
					fetch("/json/country-data/country-tld.json").then((response) => response.json()),
					fetch("/json/country-data/country-languages.json").then((response) => response.json()),
					fetch("/json/country-data/population-data.json").then((response) => response.json()),
					fetch("/json/country-data/country-gdp.json").then((response) => response.json()),
					fetch("/json/country-data/country-videos.json").then((response) =>
						response.json().then((response) => response[countryName]),
					),
				]);
		} catch (error) {
			console.error("Failed to fetch country json files:", error);
		}
	}

	// Fetch this all on the server
	onMount(async () => {
		countryNameFromPath = $page.url.pathname.replace("/countries/learn/", "").replaceAll("-", " ");

		await fetchCountryCodes(); // Fetch this first, to load the name quickly

		countryName = Object.keys(countryCodes).find((country) => country.toLowerCase() === countryNameFromPath);

		setTitle("Learn " + countryName);

		IconComponent = Icon[countryCodes[countryName]];

		await fetchJsonData(); // Then load all json data
		jsonDataLoading = false;
	});

	// Derived value for child content presence
	let childHasNoContent = $state(false);

	$effect(() => {
		if (!childrenContainer) return;
		childHasNoContent =
			[...childrenContainer.childNodes].find((node) => node.nodeType !== Node.COMMENT_NODE)?.outerHTML == null;
	});
</script>

<article class="container mx-auto p-6 px-1 max-w-3xl">
	<a
		class="text-lg flex gap-3 justify-items-start items-center hover:opacity-50 transition-opacity w-fit mb-4"
		href="/countries/"
	>
		<ArrowLeftIcon />
		Back
	</a>

	{#if countryName}
		<Map region={countryName} singleCountryRegion={countryName} smallDynamicHeight="true" showPoints="true" />
	{/if}

	<!-- statistics and other data -->
	<div class="w-full bg-base-300 rounded-lg flex flex-wrap items-center p-2 gap-2 mt-2">
		{#if !jsonDataLoading}
			{#if topLevelDomains}
				<div class="stat-pill">
					<EthernetPort />
					{topLevelDomains[countryName] || "-"}
				</div>
			{/if}
			{#if telephonePrefixes}
				<div class="stat-pill">
					<Phone />
					{telephonePrefixes[countryName] || "-"}
				</div>
			{/if}
			{#if populationData}
				<div class="stat-pill">
					<UsersRound />
					{populationData[countryName] || "-"}
				</div>
			{/if}
			{#if countryLanguages}
				<div class="stat-pill">
					<Languages />
					{countryLanguages[countryName] || "-"}
				</div>
			{/if}
			{#if countryGDP}
				<div class="stat-pill">
					<CircleDollarSign />
					{countryGDP[countryName] || "-"} Bn. USD
				</div>
			{/if}
		{/if}
		<a
			class="btn btn-secondary btn-sm custom-btn-height {jsonDataLoading ? 'invisible' : ''}"
			href="https://openguessr.com/?play-map={countryName.replaceAll(' ', '_')}"
			target="_blank"
		>
			<Compass size="25" /> Explore
		</a>
	</div>

	<div class="flex flex-wrap items-end mt-8 mb-3 gap-4">
		<h1 class="text-4xl font-bold">{countryName || "Not defined"}</h1>
		{#if IconComponent}
			<IconComponent size="40" />
		{/if}
		<div class="ml-auto mb-0.5">
			<ArticleEditButton path={$page.url.pathname} />
		</div>
	</div>

	<!-- Page Content -->
	<article bind:this={childrenContainer} class="w-full" id="children-container">
		{@render children?.()}
	</article>

	{#if childHasNoContent}
		<p class="w-fit mx-auto text-center my-5 italic mt-14">
			There is no article for "{countryName}" yet. Feel free to
			<b>edit this page</b> and contribute content.
		</p>
	{/if}

	<!-- Video content -->
	{#if videoSources}
		<h3 class="text-xl font-bold ml-1 mt-14 mb-4">Featured videos:</h3>
		<div class="rounded-lg bg-base-200 p-2 w-fit max-w-full">
			<div class="flex items-center flex-wrap gap-2 overflow-hidden">
				{#each videoSources as src}
					<iframe
						class="rounded-md"
						width="356"
						height="200"
						{src}
						title="Video"
						frameborder="0"
						referrerpolicy="strict-origin-when-cross-origin"
						allowfullscreen
					></iframe>
				{/each}
			</div>
		</div>
	{/if}

	<ScrollUp />
</article>

<style>
	.stat-pill {
		background-color: oklch(var(--b2));
		border-radius: 0.25rem;
		padding: 0.25rem;
		padding-inline: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}

	.custom-btn-height {
		flex-grow: 1;
		height: 2.3rem;
		border-radius: 0.25rem;
	}
</style>
