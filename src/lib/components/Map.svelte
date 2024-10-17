<script>
    import { onMount } from "svelte";
    import { geoPath, geoMercator } from "d3-geo";
    import { feature } from "topojson-client";
    import { createEventDispatcher } from "svelte";
    import { Plus, Minus } from "lucide-svelte";
    import { tweened } from "svelte/motion";
    import { cubicOut, linear, backInOut } from "svelte/easing";

    export let region = "World";
    export let zoom = 1;
    export let width = 800;
    export let height = 400;
    export let interactive = false;
    export let highlightedFeature = null;
    export let showLabels = false;
    export let minLabelZoom = 1;
    export let notHighlightedColor = "rgba(125,125,125, 0.2)";
    export let dynamicHeight = false; // Dynamically adjust height to the screen size, used for Quizzes
    export let showPoints = false;

    export let hueRotateDegree = 0;

    export let topoJsonName = "topojson-world-110m";

    export let afterLoad = "";

    let svgElement;
    let mapContainer;
    let features = [];
    let points = []; // New array to store point features

    let projection = geoMercator();
    let path = geoPath().projection(projection);
    let regionCountries;

    let translateX = 0;
    let translateY = 0;

    let flashingFeature = null;
    let flashCircle = null;
    let flashCircleOpacity = tweened(0, { duration: 400, easing: linear });
    let flashCircleRadius = tweened(0, { duration: 600, easing: backInOut });

    let outlineFeature = null;
    let outlineWidth = tweened(0, { duration: 500, easing: cubicOut });

    let loaded = false;

    const dispatch = createEventDispatcher();

    const MIN_ZOOM = 0.5;
    const MAX_ZOOM = 20;

    let allRegionSettings = {};
    let regionPoints = {};

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

        points = points.map((point) => {
            if (point.properties.name === featureName) {
                return { ...point, color };
            }
            return point;
        });
    }

    export function highlightFeatureOutline(featureName) {
        const feature = features.find((f) => f.properties.name === featureName);
        if (feature) {
            outlineFeature = feature;
            outlineWidth.set(10);
            setTimeout(() => {
                outlineWidth.set(0);
            }, 50);
        }
    }

    export function brieflyShowName(featureName) {
        let showLabel = true;
        let pointExists = false;

        points = points.map((point) => {
            if (point.properties.name === featureName) {
                pointExists = true;
                return { ...point, showLabel };
            }
            return point;
        });

        if (!pointExists) {
            features = features.map((feature) => {
                if (feature.properties.name === featureName) {
                    return { ...feature, showLabel };
                }
                return feature;
            });
        }

        setTimeout(() => {
            showLabel = false;

            features = features.map((feature) => {
                if (feature.properties.name === featureName) {
                    return { ...feature, showLabel };
                }
                return feature;
            });
            points = points.map((point) => {
                if (point.properties.name === featureName) {
                    return { ...point, showLabel };
                }
                return point;
            });
        }, 500);
    }

    export function disableFeatureInteractions(featureName) {
        const isInteractive = false;

        features = features.map((feature) => {
            if (feature.properties.name === featureName) {
                return { ...feature, isInteractive };
            }
            return feature;
        });

        points = points.map((point) => {
            if (point.properties.name === featureName) {
                return { ...point, isInteractive };
            }
            return point;
        });
    }

    let flashInterval;

    export function flashFeature(featureName) {
        const feature = features.find((f) => f.properties.name === featureName);
        const point = points.find((p) => p.properties.name === featureName);

        /* If there is both a feature and a point to highlight (e.g. a very small region with a point above it to make it more accessible),
        flash the point only. Flashing both would lead to issues. */
        if (feature && !point) {
            clearInterval(flashInterval);
            flashingFeature = feature;
            let flashCount = 0;

            feature.flashColor = "";

            flashCircle = feature;
            let radius = Number(Math.sqrt(path.area(feature) / Math.PI));

            if (radius < 20) {
                flashCircleOpacity.set(0.5);
                flashCircleRadius.set(50);
            }

            flashInterval = setInterval(() => {
                feature.flashColor = flashCount % 2 == 0 ? "white" : "";
                features = [...features];
                flashCount++;
                if (flashCount >= 4) {
                    clearInterval(flashInterval);
                    feature.flashColor = "";

                    flashCircleOpacity.set(0);
                    flashCircleRadius.set(20);

                    setTimeout(() => {
                        flashingFeature = null;
                        flashCircle = null;
                    }, 600);
                }
            }, 150);
        }

        if (point) {
            clearInterval(flashInterval);
            flashingFeature = point;
            let flashCount = 0;
            flashCircle = point;

            flashCircleOpacity.set(0.5);
            flashCircleRadius.set(50);

            flashInterval = setInterval(() => {
                point.flashColor = flashCount % 2 == 0 ? "white" : "";
                points = [...points];
                flashCount++;
                if (flashCount >= 4) {
                    clearInterval(flashInterval);
                    point.color = "";

                    flashCircleOpacity.set(0);
                    flashCircleRadius.set(20);

                    setTimeout(() => {
                        flashingFeature = null;
                        flashCircle = null;
                    }, 600);
                }
            }, 150);
        }
    }

    $: {
        if (highlightedFeature) {
            highlightFeature(highlightedFeature, "white");
        }
    }

    function handleRegionClick(feature, event) {
        if (feature.isHighlighted && feature.isInteractive) {
            dispatch("click", { properties: feature.properties });
        }

        rect = mapContainer.getBoundingClientRect();

        const x = (event.clientX - rect.left) * (width / rect.width);
        const y = (event.clientY - rect.top) * (height / rect.height);

        // Invert the projection to get the longitude and latitude
        let [longitude, latitude] = projection.invert([x, y]);
        latitude = Math.round(latitude * 100) / 100;
        longitude = Math.round(longitude * 100) / 100;

        console.log(
            "Coordinates: ",
            { latitude, longitude },
            "Region name: ",
            feature.properties.name,
        );
    }

    async function fetchTopoJSON() {
        try {
            const formattedTopoJsonName = topoJsonName.replace(".json", "");
            const response = await fetch(
                `/src/lib/json/topojson/${formattedTopoJsonName}.json`,
            );
            const topology = await response.json();

            let featureData;
            // Check if 'topology.objects.countries' exists (TopoJSON format)
            const regionObjects =
                topology?.objects?.countries ||
                topology?.objects?.states ||
                topology?.objects?.regions ||
                topology?.objects[Object.keys(topology?.objects)[0]];

            // There must be some kind of object category
            if (topology && topology.objects && regionObjects) {
                featureData = feature(topology, regionObjects);
            } else {
                // Fallback if topology is undefined or not in TopoJSON format (assuming GeoJSON)
                featureData = topology;
                console.log(
                    "Falling back to feature data (geojson) as no valid object names were found, however, the map is built for TopoJSON. Here is the object output:",
                    topology?.objects,
                );
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
        if (!allRegionSettings) return;

        const settings = allRegionSettings[region] || allRegionSettings.World;
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

                const interactivity =
                    feature.isInteractive == null
                        ? true
                        : feature.isInteractive; // If there is a state defined for it already, it should take that - otherwise default isInteractive to true

                if (d) {
                    return {
                        ...feature,
                        uniqueKey: `feature-${index}-${feature.properties.name || "unnamed"}`,
                        d,
                        isHighlighted: isHighlighted,
                        isInteractive: interactivity,
                        flashColor: "",
                        color: isHighlighted
                            ? feature.color || "oklch(var(--s))"
                            : notHighlightedColor,
                    };
                }
                return null;
            })
            .filter((feature) => feature);

        // Generate point features
        points = points.map((point, index) => {
            let [x, y] = projection([point.initX, point.initY]);

            const interactivity =
                point.isInteractive == null ? true : point.isInteractive;

            return {
                ...point,
                uniqueKey: `point-${index}-${point.properties.name}`,
                x,
                y,
                isHighlighted: true,
                isInteractive: interactivity,
                flashColor: "",
                color: point.color || "oklch(var(--s))",
            };
        });
    }

    function returnAllCountries() {
        if (!regionCountries) return;
        return regionCountries?.World.concat(
            regionCountries.Europe,
            regionCountries.Asia,
            regionCountries.Africa,
            regionCountries["South America"],
            regionCountries["North America"],
            regionCountries.Oceania,
        );
    }

    function highlightCountries() {
        const countries =
            region !== "World" ? regionCountries[region] : returnAllCountries();
        return countries;
    }

    function handleZoom(event) {
        if (!interactive) return;
        event.preventDefault();

        rect = mapContainer.getBoundingClientRect();

        const cursorX = (event.clientX - rect.left) * (width / rect.width);
        const cursorY = (event.clientY - rect.top) * (height / rect.height);

        const direction = event.deltaY > 0 ? -1 : 1;

        const isTouchpad = Math.abs(event.deltaY) < 50;

        let zoomChange;

        if (isTouchpad) {
            zoomChange = 1 + direction * 0.05;
        } else {
            zoomChange = Math.exp(direction * 0.1);
        }

        const oldZoom = zoom;

        zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom * zoomChange));

        const scaleChange = zoom / oldZoom;

        translateX -= (cursorX - translateX) * (scaleChange - 1);
        translateY -= (cursorY - translateY) * (scaleChange - 1);

        updateProjection();

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
        allRegionSettings = await fetchRegionSettings();

        const settings = allRegionSettings[region] || allRegionSettings.World;
        regionPoints = settings?.points || {};

        if (geoData && regionCountries && allRegionSettings) {
            // Init features
            features = geoData.features;

            // Init points
            points = Object.entries(regionPoints || {}).map(
                ([name, coords], index) => {
                    const [x, y] = projection([coords.long, coords.lat]);
                    const initX = coords.long;
                    const initY = coords.lat;

                    return {
                        type: "Point",
                        properties: { name },
                        uniqueKey: `point-${index}-${name}`,
                        x,
                        y,
                        initX,
                        initY,
                        isHighlighted: true,
                        isInteractive: true,
                        flashColor: "",
                        color: "oklch(var(--s))",
                    };
                },
            );

            translateX = width / 2;
            translateY = height / 2;

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
    class="map-container rounded-lg relative grow {dynamicHeight
        ? 'dynamic-viewport-height'
        : ''}"
    bind:this={mapContainer}
    id="mapContainer">
    {#if !loaded}
        <div class="skeleton w-full h-full min-h-28 opacity-75 rounded-lg">
        </div>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
    {:else}
        <div class="absolute w-full h-full bg-accent"></div>

        <slot />

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
            class="relative {interactive
                ? 'pointer-events-auto'
                : 'pointer-events-none'}">
            <g>
                {#each features as feature (feature.uniqueKey)}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <path
                        d={feature.d}
                        fill={feature.flashColor ||
                            feature.color ||
                            "oklch(var(--s))"}
                        stroke="oklch(var(--a))"
                        stroke-width="0.5"
                        vector-effect="non-scaling-stroke"
                        on:click={(event) => handleRegionClick(feature, event)}
                        on:mouseenter={() => (feature.isHovered = true)}
                        on:mouseleave={() => (feature.isHovered = false)}
                        class="feature-path"
                        style="filter: {feature.isHovered
                            ? 'brightness(1.1)'
                            : 'none'};" />
                {/each}
            </g>

            <g>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                {#if showPoints}
                    {#each points as point (point.uniqueKey)}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <g
                            on:click={(event) =>
                                handleRegionClick(point, event)}
                            on:mouseenter={() => (point.isHovered = true)}
                            on:mouseleave={() => (point.isHovered = false)}
                            class="point-feature"
                            stroke="oklch(var(--b2))"
                            stroke-width="2"
                            transform={`translate(${point.x},${point.y})`}>
                            <circle
                                r={5 + (10 * width) / 2000}
                                fill={point.flashColor ||
                                    point.color ||
                                    "oklch(var(--s))"}
                                class="point-circle"
                                style="filter: drop-shadow(2px 2px 4px rgba(50,50,50,0.3)) {point.isHovered
                                    ? 'brightness(1.2)'
                                    : ''};" />
                        </g>
                    {/each}
                {/if}
            </g>

            <!-- text labels (country / region / city name) -->
            <g>
                {#each features as feature (feature.uniqueKey)}
                    <!-- check if the feature is even highlighted and part of the map, if all labels or its label should be shown, if the zoom is big enough and if there isn't a point with that label already -->
                    {#if feature.isHighlighted && (showLabels || feature.showLabel) && zoom >= minLabelZoom && !points.some((point) => point.properties.name == feature.properties.name)}
                        {#if path.centroid(feature)}
                            {@const [x, y] = path.centroid(feature)}
                            {@const text = shortenRegionName(
                                feature.properties.name,
                            )}
                            {@const textLength = text.length * 8}
                            <g>
                                <rect
                                    x={x - textLength / 2 - 10}
                                    y={y - 12}
                                    width={textLength + 20}
                                    height="24"
                                    rx="10"
                                    ry="10"
                                    opacity="0.85"
                                    pointer-events="none"
                                    fill="oklch(var(--b2))"
                                    class="label-background" />
                                <text
                                    {x}
                                    y={y + 1}
                                    text-anchor="middle"
                                    dominant-baseline="middle"
                                    fill="oklch(var(--s))"
                                    font-size="15"
                                    font-weight="bold"
                                    pointer-events="none"
                                    class="label-text">
                                    {text}
                                </text>
                            </g>
                        {/if}
                    {/if}
                {/each}

                {#each points as point (point.uniqueKey)}
                    {#if point.isHighlighted && (showLabels || point.showLabel) && zoom >= minLabelZoom}
                        {@const text = shortenRegionName(point.properties.name)}
                        {@const textLength = text.length * 8}
                        <g transform={`translate(${point.x},${point.y})`}>
                            <rect
                                x={-textLength / 2 - 10}
                                y={-43}
                                width={textLength + 20}
                                height="24"
                                rx="10"
                                ry="10"
                                opacity="0.85"
                                pointer-events="none"
                                fill="oklch(var(--b2))"
                                class="label-background" />
                            <text
                                y={-30}
                                text-anchor="middle"
                                dominant-baseline="middle"
                                fill="oklch(var(--s))"
                                font-size="15"
                                font-weight="bold"
                                pointer-events="none"
                                class="label-text">
                                {text}
                            </text>
                        </g>
                    {/if}
                {/each}
            </g>

            {#if flashCircle}
                {@const [cx, cy] =
                    flashingFeature.type === "Point"
                        ? projection([
                              flashingFeature.initX,
                              flashingFeature.initY,
                          ])
                        : path.centroid(flashingFeature)}
                <g style="pointer-events: none">
                    <circle
                        {cx}
                        {cy}
                        r={$flashCircleRadius}
                        fill="none"
                        stroke="white"
                        stroke-width="4"
                        opacity={$flashCircleOpacity}
                        class="flash-circle">
                    </circle>
                </g>
            {/if}

            {#if outlineFeature}
                <g>
                    <path
                        d={path(outlineFeature)}
                        fill="none"
                        stroke="white"
                        stroke-width={$outlineWidth}
                        class="pointer-events-none"
                        vector-effect="non-scaling-stroke" />
                </g>
            {/if}
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

    path:hover {
        color: oklch(var(--p));
    }

    .feature-path {
        transition:
            fill 0.1s ease,
            filter 0.1s ease;
    }

    .label-background,
    .label-text {
        transition: opacity 0.1s ease;
    }

    .flash-circle {
        vector-effect: non-scaling-stroke;
    }

    .point-circle {
        transition:
            fill 0.1s ease,
            filter 0.1s ease;
    }

    .dynamic-viewport-height {
        height: 60dvh;
    }
</style>
