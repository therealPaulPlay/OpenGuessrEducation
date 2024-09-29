<script>
    import { onMount } from "svelte";
    import { geoPath, geoMercator } from "d3-geo";
    import { feature } from "topojson-client";

    export let region = "World";
    export let zoom = 1;
    export let width = 800; // Width of the map
    export let height = 400; // Height of the map

    let svgElement;
    let features = [];
    let projection = geoMercator();
    let path = geoPath().projection(projection);
    let selectedFeature = null; // To keep track of the selected feature
    let regionCountries;

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

    async function fetchTopoJSON() {
        try {
            const response = await fetch("src/lib/json/countries-110m.json");
            const topology = await response.json();
            const featureData = feature(topology, topology.objects.countries);
            console.log(featureData);
            return featureData;
        } catch(error) {
            console.error("Error fetching topo json:", error);
        }
    }

    async function fetchContinentCountries() {
        try {
            const regionCountryData = await fetch("src/lib/json/continent-countries.json");
            const regionCountries = await regionCountryData.json();
            return regionCountries;
        } catch(error) {
            console.error("Error fetching continent country json:", error);
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
                if (
                    highlightedCountries.includes(feature.properties.name) ||
                    region === "World"
                ) {
                    const d = path(feature);
                    if (d) {
                        console.log(
                            `Generated path for ${feature.properties.name}`,
                        );
                        return {
                            ...feature,
                            uniqueKey: `feature-${index}-${feature.properties.name || "unnamed"}`,
                            d,
                        };
                    }
                }
                return null; // Filter out invalid paths
            })
            .filter(Boolean);
    }

    function handleCountryClick(country) {
        selectedFeature = country; // Set selected feature
        alert(`You clicked on: ${country.properties.name}`);
        // Additional logic can go here
    }

    function highlightCountries() {
        const countries = regionCountries[region] || [region];
        console.log(`Highlighted countries for region ${region}:`, countries);
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
        }
    });
</script>

<div class="map-container rounded-xl" style="width: {width}px; height: {height}px;">
    <svg
        bind:this={svgElement}
        {width}
        {height}
        viewBox={`0 0 ${width} ${height}`}>
        <rect {width} {height} fill="oklch(var(--b3))" />
        <g>
            {#each features as feature (feature.uniqueKey)}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <path
                    d={feature.d}
                    fill="oklch(var(--s))"
                    stroke="oklch(var(--b3))"
                    stroke-width="0.5"
                    vector-effect="non-scaling-stroke"
                    on:click={() => handleCountryClick(feature)} />
            {/each}
        </g>
    </svg>
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
</style>
