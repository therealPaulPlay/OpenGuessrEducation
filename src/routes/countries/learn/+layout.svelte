<script>
	import { page } from "$app/state";
	import Map from "$lib/components/Map.svelte";
	import {
		EthernetPort,
		Phone,
		Flag,
		Languages,
		UsersRound,
		CircleDollarSign,
		Compass,
		Info,
		TriangleAlert,
	} from "lucide-svelte";
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
	let allVideos = $state();
	let videoSources = $state();
	let metas = $state({});

	let childrenContainer = $state();

	async function fetchJsonData() {
		if (telephonePrefixes && topLevelDomains) return; // if everything is already loaded, skip
		try {
			[countryCodes, telephonePrefixes, topLevelDomains, countryLanguages, populationData, countryGDP, allVideos] =
				await Promise.all([
					fetch("/json/countryCodes.json").then((response) => response.json()),
					fetch("/json/country-data/telephone-prefixes.json").then((response) => response.json()),
					fetch("/json/country-data/country-tld.json").then((response) => response.json()),
					fetch("/json/country-data/country-languages.json").then((response) => response.json()),
					fetch("/json/country-data/population-data.json").then((response) => response.json()),
					fetch("/json/country-data/country-gdp.json").then((response) => response.json()),
					fetch("/json/country-data/country-videos.json").then((response) => response.json()),
				]);
		} catch (error) {
			console.error("Failed to fetch country json files:", error);
		}
	}

	async function fetchMetas(countryName) {
		try {
			countryName = countryName.toLowerCase().replaceAll(" ", "_");
			const response = await fetch("https://geometas.com/api/metas/countries/" + countryName);
			if (!response.ok) throw new Error(response.status);
			const jsonResponse = await response.json();
			metas = jsonResponse;
		} catch (error) {
			console.error("Failed to fetch metas from Geometas:", error);
		}
	}

	async function loadData() {
		await fetchJsonData(); // Load all json data
		countryNameFromPath = page.url.pathname.replace("/countries/learn/", "").replaceAll("-", " ");
		countryName = Object.keys(countryCodes).find((country) => country.toLowerCase() === countryNameFromPath);
		setTitle("Learn " + countryName);
		videoSources = allVideos[countryName];
		IconComponent = Icon[countryCodes[countryName]];
		jsonDataLoading = false;
		await fetchMetas(countryName);
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

	{#key page.url.pathname}
		{#if countryName}
			<Map
				region={countryName}
				singleCountryRegion={countryName}
				smallDynamicHeight={true}
				showPoints={true}
				class="rounded-2xl!"
			/>
		{/if}
	{/key}

	<!-- statistics and other data -->
	<div
		class="w-full bg-base-300 rounded-2xl border border-accent shadow-sm/5 flex flex-wrap items-center p-2 gap-2 mt-2"
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

	<!-- Metas from Geometas -->
	<h3 class="text-xl font-bold my-4">Metas</h3>
	<div class="flex items-center flex-wrap gap-4 w-full">
		{#if metas?.metas?.length}
			{#each metas.metas as meta}
				<div
					class="flex justify-between gap-4 w-full shadow-sm/5 border border-accent p-4 rounded-2xl max-sm:flex-wrap"
				>
					<div class="space-y-2">
						<span class="badge badge-soft">{meta.category?.name}</span>
						<p>{meta.answer}</p>
						{#if meta.notes}
							<div role="alert" class="alert alert-warning alert-soft">
								<TriangleAlert />
								<span class="text-base-content">{meta.notes}</span>
							</div>
						{/if}
					</div>
					<div
						class="bg-base-200 rounded-md overflow-hidden sm:min-w-fit min-h-40 max-sm:w-full flex justify-center items-center"
					>
						<img alt="meta" class="max-h-40 max-w-90 object-fit" src={meta.image_url} />
					</div>
				</div>
			{/each}
			<ArticleTip class="w-full my-0!"
				>Powered by <a class="text-secondary" href="https://geometas.com" target="_blank">Geometas</a>.</ArticleTip
			>
		{:else}
			<p>There are no featured metas for this country.</p>
		{/if}
	</div>

	<div class="divider mt-8"></div>

	<!-- Video content -->
	<h3 class="text-xl font-bold my-4">Featured videos</h3>
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
