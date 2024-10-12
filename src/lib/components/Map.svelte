<script>
    import { onMount } from "svelte";
    import { geoPath, geoMercator, geoConicEqualArea, geoAlbersUsa, geoOrthographic } from "d3-geo";
    import { feature } from "topojson-client";
    import { createEventDispatcher } from "svelte";
    import { Plus, Minus } from "lucide-svelte";

    export let region = "World";
    export let zoom = 1;
    export let width = 800;
    export let height = 400;
    export let interactive = false;
    export let highlightedFeature = null; // Used for typing in the highlighted country in quizzes
    export let showLabels = false;
    export let minLabelZoom = 1;
    export let notHighlightedColor = "rgba(125,125,125, 0.2)";

    export let hueRotateDegree = 0;

    export let topoJsonName = "topojson-world-110m"; // Default world geojson (or topojson, which is an extension of geojson), but you can use any geojson that has labels (= a name property)

    export let afterLoad = "";

    let svgElement;
    let mapContainer;
    let features = [];

    let projectionType = "geoMercator";

    const projectionFunctions = {
        "geoMercator": geoMercator(),
        "geoConicEqualArea": geoConicEqualArea(),
        "geoAlbers": geoAlbersUsa(),
        "geoOrthographic": geoOrthographic()
    };

    let projection = projectionFunctions[projectionType];

    let path = geoPath().projection(projection);
    let regionCountries;

    let translateX = 0;
    let translateY = 0;

    let loaded = false;

    const dispatch = createEventDispatcher();

    const MIN_ZOOM = 0.5;
    const MAX_ZOOM = 20;

    let regionSettings = {};

    async function fetchRegionSettings() {
        const regionSettingsJSON = await fetch(
            "/src/lib/json/regionSettings.json",
        );
        return await regionSettingsJSON.json();
    }

    let rect;

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
            highlightFeature(highlightedFeature, "oklch(var(--b1))");
        }
    }

    function handleRegionClick(feature) {
        if (feature.isHighlighted && feature.interactive) {
            dispatch("click", { properties: feature.properties });
        }
    }

    async function fetchTopoJSON() {
        try {
            const formattedTopoJsonName = topoJsonName.replace(".json", "");
            const response = await fetch(`/src/lib/json/${formattedTopoJsonName}.json`);
            const topology = await response.json();

            let featureData;

            // Check if 'topology.objects.countries' exists (TopoJSON format)

            const regionObjects = topology?.objects?.countries || topology?.objects?.states || topology?.objects?.regions || topology?.objects[Object.keys(topology?.objects)[0]]; // Last one is a fallback option, which is the first key in the object

            if (topology && topology.objects && regionObjects) { // There must be some kind of object category
                featureData = feature(topology, regionObjects);
            } else {
                // Fallback if topology is undefined or not in TopoJSON format (assuming GeoJSON)
                featureData = topology; // Already in GeoJSON format
                console.log("Falling back to feature data (geojson) as no valid object names were found, hovewer, the map is built for TopoJSON. Here is the object output:", topology?.objects);
            }

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

    async function updateProjection() {
        if (!regionSettings) return;

        const settings = regionSettings[region] || regionSettings.World;
        const { center, zoom: regionZoom } = settings;

        // Calculate the scale based on the map container size and region zoom
        const minDimension = Math.min(width, height);
        const baseScale = minDimension / 2;
        const scale = baseScale * regionZoom * zoom;

        projection
            .scale(scale)
            .center([center.long, center.lat])
            .translate([translateX, translateY]);

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

    function handleZoom(event) {
        if (!interactive) return;
        event.preventDefault();

        rect = mapContainer.getBoundingClientRect();

        // Get cursor position relative to the SVG container
        const cursorX = (event.clientX - rect.left) * (width / rect.width);
        const cursorY = (event.clientY - rect.top) * (height / rect.height);

        // Determine the zoom direction
        const direction = event.deltaY > 0 ? -1 : 1;

        // Detect if the input is from a touchpad
        const isTouchpad = Math.abs(event.deltaY) < 50;

        // Calculate zoom change based on input type
        let zoomChange;
        if (isTouchpad) {
            // Linear zoom change for touchpad
            zoomChange = 1 + direction * 0.03;
        } else {
            // Exponential zoom change for mouse wheel (unchanged)
            zoomChange = Math.exp(direction * 0.1);
        }

        // Save the old zoom level before applying the new zoom
        const oldZoom = zoom;

        // Update zoom level, clamping within defined limits
        zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom * zoomChange));

        // Calculate the new scale after zooming
        const scaleChange = zoom / oldZoom;

        // Adjust translation to keep the point under the mouse fixed in geographical coordinates
        translateX -= (cursorX - translateX) * (scaleChange - 1);
        translateY -= (cursorY - translateY) * (scaleChange - 1);

        // Apply the new translation and scale to the projection
        updateProjection();

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
        // Store the initial rect for reference
        rect = mapContainer.getBoundingClientRect();
        const dx = (event.clientX - lastX) * (width / rect.width);
        const dy = (event.clientY - lastY) * (height / rect.height);
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

    function handleZoomIn() {
        zoom = Math.min(MAX_ZOOM, zoom * 1.2);
        updateProjection();
        generatePaths();
    }

    function handleZoomOut() {
        zoom = Math.max(MIN_ZOOM, zoom / 1.2);
        updateProjection();
        generatePaths();
    }

    onMount(async () => {
        const geoData = await fetchTopoJSON();
        regionCountries = await fetchContinentCountries();
        regionSettings = await fetchRegionSettings();

        if (geoData && regionCountries && regionSettings) {
            features = geoData.features;

            // Initial translate is the center point
            translateX = width / 2;
            translateY = height / 2;

            // Apply initial projection settings
            updateProjection();
            generatePaths();
            loaded = true;
        }

        if (typeof afterLoad == "function") {
            afterLoad();
        }
    });
</script>

<div
    class="map-container rounded-lg relative grow"
    bind:this={mapContainer}
    id="mapContainer">
    {#if !loaded}
        <div class="skeleton w-full h-full min-h-28 opacity-75 rounded-lg">
        </div>
    {:else}
        <!-- background color -->
        <div class="absolute w-full h-full bg-accent"></div>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <svg
            bind:this={svgElement}
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            style="filter: hue-rotate({hueRotateDegree}deg)"
            on:wheel={handleZoom}
            on:mousedown={handleMouseDown}
            on:mousemove={handleMouseMove}
            on:mouseup={handleMouseUp}
            on:mouseleave={handleMouseUp}
            fill="oklch(var(--a))"
            class="transition-opacity duration-300 relative {interactive
                ? 'pointer-events-auto'
                : 'pointer-events-none'}">
            <g>
                {#each features as feature (feature.uniqueKey)}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <path
                        d={feature.d}
                        fill={feature.color || "oklch(var(--s))"}
                        stroke="oklch(var(--a))"
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
        {#if interactive}
            <div class="absolute bottom-4 right-4 flex flex-col gap-2">
                <button
                    class="btn btn-circle btn-base-200 btn-sm"
                    on:click={handleZoomIn}
                    aria-label="Zoom in">
                    <Plus size={16} />
                </button>
                <button
                    class="btn btn-circle btn-base-200 btn-sm"
                    on:click={handleZoomOut}
                    aria-label="Zoom out">
                    <Minus size={16} />
                </button>
            </div>
        {/if}
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
        cursor: pointer;
    }

    path {
        vector-effect: non-scaling-stroke;
    }

    path:hover {
        color: oklch(var(--p));
    }
</style>
