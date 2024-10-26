<script>
    import { page } from "$app/stores"; // To get the current URL
    import Map from "$lib/components/Map.svelte";
    import { ArrowLeftIcon, EthernetPort, Phone, Flag, Languages, UsersRound, CircleDollarSign, Compass } from "lucide-svelte";
    import * as Icon from "svelte-flag-icons";
    import { onMount } from "svelte";
    import ScrollUp from "$lib/components/ScrollUp.svelte";
    import { setTitle } from '$lib/utils/pageTitle.svelte.js';
    
    let { children } = $props();

    let countryNameFromPath;

    let countryName = $state("Loading...");

    let IconComponent = $state();

    // JSON data
    let countryCodes = $state();
    let telephonePrefixes = $state();
    let topLevelDomains = $state();
    let countryLanguages = $state();
    let populationData = $state();
    let countryGDP = $state();

    async function fetchCountryCodes() {
        if (countryCodes) return;
        countryCodes = await fetch("/src/lib/json/countryCodes.json").then(response => response.json());
    }

    async function fetchJsonData() {
        if (telephonePrefixes && topLevelDomains) return // if everything is already loaded, skip

        telephonePrefixes = await fetch("/src/lib/json/country-data/telephone-prefixes.json").then(response => response.json());
        topLevelDomains = await fetch("/src/lib/json/country-data/country-tld.json").then(response => response.json());
        countryLanguages = await fetch("/src/lib/json/country-data/country-languages.json").then(response => response.json());
        populationData = await fetch("/src/lib/json/country-data/population-data.json").then(response => response.json());
        countryGDP = await fetch("/src/lib/json/country-data/country-gdp.json").then(response => response.json());
    }

    // Fetch this all on the server
    onMount(async () => {
        countryNameFromPath = $page.url.pathname.replace("/countries/learn/", "").replaceAll("-", " ");

        await fetchCountryCodes(); // Fetch this first, to load the name quickly
        
        countryName = Object.keys(countryCodes).find(
            country => country.toLowerCase() === countryNameFromPath
            );

        setTitle("Learn " + countryName);

        IconComponent = Icon[countryCodes[countryName]];

        await fetchJsonData(); // Then load all json data
    });

</script>

<article class="container mx-auto p-6 px-1 max-w-3xl">
    <a
        class="text-lg flex gap-3 justify-items-start items-center hover:opacity-50 transition-opacity w-fit mb-4"
        href="/countries/">
        <ArrowLeftIcon />
        Back
    </a>

    {#if countryName}
    <Map region={countryName} singleCountryRegion={countryName} smallDynamicHeight=true />
    {/if}

        <!-- statistics and other data -->
    <div class="w-full bg-base-300 rounded-lg flex flex-wrap items-center p-2 gap-2 mt-2">
            {#if topLevelDomains}
            <div class="stat-pill"><EthernetPort /> {topLevelDomains[countryName] || "-"}</div>
            {/if}
            {#if telephonePrefixes}
            <div class="stat-pill"><Phone /> {telephonePrefixes[countryName] || "-"}</div>
            {/if}
            {#if populationData}
            <div class="stat-pill"><UsersRound /> {populationData[countryName] || "-"}</div>
            {/if}
            {#if countryLanguages}
            <div class="stat-pill"><Languages /> {countryLanguages[countryName] || "-"}</div>
            {/if}
            {#if countryGDP}
            <div class="stat-pill"><CircleDollarSign /> {countryGDP[countryName] || "-"}Bln. USD</div>
            {/if}
            <a class="btn btn-secondary btn-sm custom-btn-height" href="https://openguessr.com/?play-map={countryName}" target="_blank">
                <Compass size=25 /> Explore
            </a>
    </div>

    <div class="flex items-end mt-8 mb-3 gap-2">
        <h1 class="text-4xl font-bold">{countryName || "Not defined"}</h1>
        {#if IconComponent}
            <IconComponent size=40 />
        {/if}
    </div>

    {@render children?.()}

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