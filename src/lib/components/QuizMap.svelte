<script>
    import { onMount } from "svelte";
    import { geoPath, geoMercator } from "d3-geo";
    import { feature } from "topojson-client";
    import { createEventDispatcher } from "svelte";

    export let region = "World";
    export let zoom = 1;
    export let width = 800;
    export let height = 400;
    export let interactive = false;
    export let highlightedFeature = null;
    export let showLabels = false;
    export let minLabelZoom = 1;
    export let notHighlightedColor = "rgba(125,125,125, 0.2)";

    let svgElement;
    let mapContainer;
    let features = [];
    let projection = geoMercator();
    let path = geoPath().projection(projection);
    let regionCountries;
    let translateX = 0;
    let translateY = 0;

    let loaded = false;

    const dispatch = createEventDispatcher();

    const MIN_ZOOM = 0.5;
    const MAX_ZOOM = 10;

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

    export function brieflyShowName(featureName) {
        let showLabel = true;
        features = features.map((feature) => {
            if (feature.properties.name === featureName) {
                return { ...feature, showLabel };
            }
            return feature;
        });

        setTimeout(() => {
            showLabel = false;

            features = features.map((feature) => {
                if (feature.properties.name === featureName) {
                    return { ...feature, showLabel };
                }
                return feature;
            });
        }, 500);
    }

    export function disableFeatureInteractions(featureName) {
        const interactive = false;

        features = features.map((feature) => {
            if (feature.properties.name === featureName) {
                return { ...feature, interactive };
            }
            return feature;
        });
    }

    let flashInterval;

    export function flashFeature(featureName) {
        const feature = features.find((f) => f.properties.name === featureName);

        if (feature) {
            let flashCount = 0;

            clearInterval(flashInterval);
            feature.color = "oklch(var(--s))";

            flashInterval = setInterval(() => {
                feature.color =
                    flashCount % 2 == 0 ? "white" : "oklch(var(--s))";
                features = [...features];
                flashCount++;
                if (flashCount >= 4) {
                    clearInterval(flashInterval);
                    feature.color = "oklch(var(--s))";
                    features = [...features];
                }
            }, 300);
        }
    }

    $: {
        if (highlightedFeature) {
            highlightFeature(highlightedFeature, "oklch(var(--p))");
        }
    }

    function handleRegionClick(feature) {
        if (feature.isHighlighted && feature.interactive) {
            dispatch("click", { properties: feature.properties });
        }
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

        const scale = Math.min(width / dx, height / dy) * 0.8 * zoom * 70;

        projection
            .scale(scale)
            .translate([translateX, translateY])
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
                        isHighlighted: isHighlighted,
                        interactive: true,
                        color: isHighlighted
                            ? feature.color || "oklch(var(--s))"
                            : notHighlightedColor,
                    };
                }
                return null;
            })
            .filter((feature) => feature);
    }

    function highlightCountries() {
        const countries = regionCountries[region] || [region];
        return countries;
    }

    let rect;

    function handleZoom(event) {
        if (!interactive) return;
        event.preventDefault();

        rect = mapContainer.getBoundingClientRect();

        // Get cursor position relative to the SVG container
        const cursorX = event.clientX - rect.left;
        const cursorY = event.clientY - rect.top;

        // Determine the zoom direction and factor
        const direction = event.deltaY > 0 ? -1 : 1; // Invert scroll direction for natural zoom
        const zoomFactor = Math.exp(direction * 0.1); // Smaller zoom factor for better control

        // Save the old zoom level before applying the new zoom
        const oldZoom = zoom;

        // Update zoom level, clamping within defined limits
        zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom * zoomFactor));

        // Calculate the new scale after zooming
        const scaleChange = zoom / oldZoom;

        // Adjust translation to keep the point under the mouse fixed in geographical coordinates
        translateX -= (cursorX - translateX) * (scaleChange - 1);
        translateY -= (cursorY - translateY) * (scaleChange - 1);

        // Apply the new translation and scale to the projection
        projection
            .scale(projection.scale() * scaleChange) // Apply the new scale
            .translate([translateX, translateY]); // Update translation

        // Update the projection to generate paths
        generatePaths();
    }

    let isDragging = false;
    let lastX, lastY;

    function handleMouseDown(event) {
        if (!interactive) return;
        isDragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
    }

    function handleMouseMove(event) {
        if (!interactive || !isDragging) return;
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        translateX += dx;
        translateY += dy;
        lastX = event.clientX;
        lastY = event.clientY;
        updateProjection();
        generatePaths();
    }

    function handleMouseUp() {
        isDragging = false;
    }

    function shortenRegionName(name) {
        if (name.length > 14) {
            name = name.substring(0, 10) + "..";
        }

        return name;
    }

    onMount(async () => {
        const geoData = await fetchTopoJSON();
        regionCountries = await fetchContinentCountries();

        if (geoData && regionCountries) {
            features = geoData.features;

            // Initialize translateX and translateY to center the map initially
            const bounds = regionBounds[region] || regionBounds.World;
            const [[x0, y0], [x1, y1]] = bounds;

            // Calculate center of the region to position the map correctly
            const x = (x0 + x1) / 2;
            const y = (y0 + y1) / 2;

            // Calculate initial translate values based on the width and height
            translateX = width / 2;
            translateY = height / 2;

            // Apply initial projection settings
            projection
                .center([x, y])
                .scale(
                    Math.min(width / (x1 - x0), height / (y1 - y0)) * 0.8 * 70,
                ) // Adjust scale for better fitting
                .translate([translateX, translateY]);

            // Update the path generation after setting up the projection
            generatePaths();
            loaded = true;
        }
    });
</script>

<div
    class="map-container rounded-lg"
    bind:this={mapContainer}
    style="width: w-full; height: w-full;"
    id="mapContainer">
    {#if !loaded}
        <div class="skeleton w-full h-full min-h-28 opacity-75 rounded-lg"></div>
    {:else}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <svg
            bind:this={svgElement}
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            on:wheel={handleZoom}
            on:mousedown={handleMouseDown}
            on:mousemove={handleMouseMove}
            on:mouseup={handleMouseUp}
            on:mouseleave={handleMouseUp}
            class="transition-opacity duration-300 {interactive
                ? 'pointer-events-auto'
                : 'pointer-events-none'}">
            <rect {width} {height} fill="oklch(var(--b3))" />

            <g>
                {#each features as feature (feature.uniqueKey)}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <path
                        d={feature.d}
                        fill={feature.color || "oklch(var(--s))"}
                        stroke="oklch(var(--b3))"
                        stroke-width="0.5"
                        vector-effect="non-scaling-stroke"
                        on:click={() => handleRegionClick(feature)}
                        on:mouseenter={() => (feature.isHovered = true)}
                        on:mouseleave={() => (feature.isHovered = false)}
                        style="filter: {feature.isHovered
                            ? 'brightness(1.1)'
                            : 'none'};" />
                {/each}
            </g>

            <g>
                {#each features as feature (feature.uniqueKey)}
                    {#if feature.isHighlighted && (showLabels || feature.showLabel) && zoom >= minLabelZoom}
                        {#if path.centroid(feature)}
                            {@const [x, y] = path.centroid(feature)}
                            {@const text = shortenRegionName(
                                feature.properties.name,
                            )}
                            {@const textLength = text.length * 8}
                            <!-- Approximate width per character -->

                            <g>
                                <!-- Background rectangle with dynamic width -->
                                <rect
                                    x={x - textLength / 2 - 10}
                                    y={y - 12}
                                    width={textLength + 20}
                                    height="24"
                                    rx="5"
                                    ry="5"
                                    opacity="0.85"
                                    pointer-events="none"
                                    fill="oklch(var(--b2))" />

                                <!-- Text label, vertically centered -->
                                <text
                                    {x}
                                    y={y + 1}
                                    text-anchor="middle"
                                    dominant-baseline="middle"
                                    fill="oklch(var(--s))"
                                    font-size="15"
                                    font-weight="bold"
                                    pointer-events="none">
                                    {text}
                                </text>
                            </g>
                        {/if}
                    {/if}
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
        cursor: pointer;
    }

    path:hover {
        color: oklch(var(--p));
    }
</style>
