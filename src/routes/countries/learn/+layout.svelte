<script>
	import { page } from "$app/state";
	import Map from "$lib/components/Map.svelte";
	import { EthernetPort, Phone, Flag, Languages, UsersRound, CircleDollarSign, Compass, Info } from "lucide-svelte";
	import ArticleEditButton from "$lib/components/ArticleEditButton.svelte";
	import * as Icon from "svelte-flag-icons";
	import { onMount } from "svelte";
	import ScrollUp from "$lib/components/ScrollUp.svelte";
	import { setTitle } from "$lib/utils/pageTitle.svelte.js";
	import GoBack from "$lib/components/GoBack.svelte";
	import ArticleTip from "$lib/components/ArticleTip.svelte";

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

	async function loadData() {
		countryNameFromPath = page.url.pathname.replace("/countries/learn/", "").replaceAll("-", " ");
		await fetchCountryCodes(); // Fetch this first, to load the name quickly
		countryName = Object.keys(countryCodes).find((country) => country.toLowerCase() === countryNameFromPath);
		setTitle("Learn " + countryName);
		IconComponent = Icon[countryCodes[countryName]];
		await fetchJsonData(); // Then load all json data
		jsonDataLoading = false;
	}

	// Fetch this all on the server
	$effect(() => {
		if (page.url.pathname) loadData();
	});

	// Derived value for child content presence
	let childHasNoContent = $state(false);

	$effect(() => {
		childHasNoContent =
			[...childrenContainer.childNodes].find((node) => node.nodeType !== Node.COMMENT_NODE)?.outerHTML == null;
	});
</script>

<article class="container mx-auto py-6 max-w-3xl">
	<GoBack href="/countries/" />

	{#if countryName}
		<Map
			region={countryName}
			singleCountryRegion={countryName}
			smallDynamicHeight={true}
			showPoints={true}
			extraRounded={true}
		/>
	{/if}

	<!-- statistics and other data -->
	<div
		class="w-full bg-base-300 rounded-xl border border-accent shadow-sm/5 flex flex-wrap items-center p-2 gap-2 mt-2"
	>
		{#if !jsonDataLoading}
			{#if topLevelDomains}
				<div class="stat-pill text-sm">
					<EthernetPort />
					{topLevelDomains[countryName] || "-"}
				</div>
			{/if}
			{#if telephonePrefixes}
				<div class="stat-pill text-sm">
					<Phone />
					{telephonePrefixes[countryName] || "-"}
				</div>
			{/if}
			{#if populationData}
				<div class="stat-pill text-sm">
					<UsersRound />
					{populationData[countryName] || "-"}
				</div>
			{/if}
			{#if countryLanguages}
				<div class="stat-pill text-sm">
					<Languages />
					{countryLanguages[countryName] || "-"}
				</div>
			{/if}
			{#if countryGDP}
				<div class="stat-pill text-sm">
					<CircleDollarSign />
					{countryGDP[countryName] || "-"} Bn. USD
				</div>
			{/if}
		{/if}
		<ArticleEditButton path={page.url.pathname} />
		<a
			class="btn btn-secondary custom-btn-height {jsonDataLoading ? 'invisible' : ''}"
			href="https://openguessr.com/?play-map={countryName.replaceAll(' ', '_')}"
			target="_blank"
		>
			Explore
		</a>
	</div>

	<div class="flex flex-wrap items-end mt-8 mb-3 gap-4">
		<h1 class="text-4xl font-bold">{countryName || "Not defined"}</h1>
		{#if IconComponent}
			<IconComponent size="40" class="drop-shadow-sm" />
		{/if}
	</div>

	<!-- Page Content -->
	<article bind:this={childrenContainer} class="w-full" id="children-container">
		{@render children?.()}
	</article>

	{#if childHasNoContent}
		<ArticleTip class="my-4!"
			>There is no article for {countryName} yet. Feel free to edit this page and submit one.</ArticleTip
		>
	{/if}

	<div class="divider mt-8"></div>

	<!-- Video content -->
	<h3 class="text-xl font-bold my-4">Featured videos:</h3>
	<div class="flex items-center flex-wrap gap-4">
		{#if videoSources}
			{#each videoSources as src}
				<iframe
					class="rounded-xl bg-base-200 skeleton shadow-sm/5"
					width="356"
					height="200"
					{src}
					title="Video"
					frameborder="0"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
			{/each}
		{:else}
			<p>There are no curated videos for this country.</p>
		{/if}
	</div>

	<ScrollUp />
</article>

<style>
	.stat-pill {
		background-color: var(--color-base-200);
		border-radius: 0.25rem;
		padding: 0.25rem;
		padding-inline: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		flex-grow: 1;
	}

	.custom-btn-height {
		flex-grow: 1;
		height: 2rem;
		border-radius: 0.25rem;
	}
</style>
