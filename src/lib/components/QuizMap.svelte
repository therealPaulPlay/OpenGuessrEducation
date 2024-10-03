<script>
    import { onMount } from "svelte";
    import { geoPath, geoMercator } from "d3-geo";
    import { feature } from "topojson-client";
    import { mapClickValue } from "$lib/stores/quizMap.js";
    import { createEventDispatcher } from "svelte";

    export let region = "World";
    export let zoom = 1;
    export let width = 800; // Width of the map
    export let height = 400; // Height of the map
    export let interactive = false;
    export let highlightedFeature = null;

    let svgElement;
    let features = [];
    let projection = geoMercator();
    let path = geoPath().projection(projection);
    let selectedFeature = null; // To keep track of the selected feature
    let regionCountries;

    let loaded = false;

    const dispatch = createEventDispatcher();

    const regionBounds = {
        World: [
            [-180, -90],
            [180, 90],
        ],
        Europe: [
            [-45, 50],
            [60, 60],
        ],
        Asia: [
            [15, -20],
            [180, 120],
        ],
        Africa: [
            [-20, -50],
            [45, 50],
        ],
        "North America": [
            [-200, 40],
            [-20, 65],
        ],
        "South America": [
            [-90, -70],
            [-30, 15],
        ],
        Oceania: [
            [90, -60],
            [180, 10],
        ],
    };

    export function highlightFeature(featureName, color) {
        features = features.map((feature) => {
            if (feature.properties.name === featureName) {
                return { ...feature, color };
            }
            return feature;
        });
    }

    $: {
        if (highlightedFeature) {
            highlightFeature(highlightedFeature, "white");
        }
    }

    function handleCountryClick(country) {
        selectedFeature = country;
        mapClickValue.set(country);
        dispatch("click", { properties: country.properties });
    }

    async function fetchTopoJSON() {
        try {
            const response = await fetch(
                "/src/lib/json/geojson-world-110m.json",
            );
            const topology = await response.json();
            const featureData = feature(topology, topology.objects.countries);
            return featureData;
        } catch (error) {
            console.error("Error fetching topo json:", error);
        }
    }

    async function fetchContinentCountries() {
        try {
            const regionCountryData = await fetch("/src/lib/json/regions.json");
            const regionCountries = await regionCountryData.json();
            return regionCountries;
        } catch (error) {
            console.error("Error fetching region json:", error);
        }
    }

    function updateProjection() {
        const bounds = regionBounds[region] || regionBounds.World;
        const [[x0, y0], [x1, y1]] = bounds;

        const dx = x1 - x0;
        const dy = y1 - y0;
        const x = (x0 + x1) / 2;
        const y = (y0 + y1) / 2;

        // Update the scale to ensure proper visibility
        const scale = Math.min(width / dx, height / dy) * 0.8 * zoom * 70;

        projection
            .scale(scale)
            .translate([width / 2, height / 2])
            .center([x, y]);

        path = geoPath().projection(projection);
    }

    function generatePaths() {
        const highlightedCountries = highlightCountries();
        features = features
            .map((feature, index) => {
                const isHighlighted =
                    highlightedCountries.includes(feature.properties.name) ||
                    region === "World" ||
                    region === "All";
                const d = path(feature);
                if (d) {
                    return {
                        ...feature,
                        uniqueKey: `feature-${index}-${feature.properties.name || "unnamed"}`,
                        d,
                        color: isHighlighted
                            ? feature.color || "oklch(var(--s))" // Highlighted countries use the normal color
                            : "rgba(125,125,125, 0.2)"
                    };
                }
                return null; // Filter out invalid paths
            })
            .filter(
                (feature) =>
                    feature,
            );
    }

    function highlightCountries() {
        const countries = regionCountries[region] || [region];
        return countries;
    }

    // Load the map on mount
    onMount(async () => {
        const geoData = await fetchTopoJSON();
        regionCountries = await fetchContinentCountries();

        if (geoData && regionCountries) {
            features = geoData.features;
            updateProjection();
            generatePaths();
            loaded = true;
        }
    });
</script>

<div
    class="map-container rounded-xl" style="width: w-full h-full;">
    {#if !loaded}
        <div class="skeleton w-full h-full opacity-75"></div>
    {:else}
        <svg
            bind:this={svgElement}
            width="100%" height="100%"
            viewBox={`0 0 ${width} ${height}`}
            class="transition-opacity duration-300 {interactive
                ? 'pointer-events-auto'
                : 'pointer-events-none'}">
            <rect {width} {height} fill="oklch(var(--b3))" />
            <g>
                {#each features as feature (feature.uniqueKey)}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <path
                        d={feature.d}
                        fill={feature.color || "oklch(var(--s))"}
                        stroke="oklch(var(--b3))"
                        stroke-width="0.5"
                        vector-effect="non-scaling-stroke"
                        on:click={() => handleCountryClick(feature)} />
                {/each}
            </g>
        </svg>
    {/if}
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
    }

    .map-container {
        position: relative;
        overflow: hidden;
    }

    svg {
        display: block;
    }

    path {
        vector-effect: non-scaling-stroke;
        cursor: pointer; /* Change cursor for better interactivity */
    }

    path:hover {
        color: oklch(var(--p));
    }
</style>