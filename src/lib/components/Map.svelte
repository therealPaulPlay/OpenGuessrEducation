<script>
	import { onMount } from "svelte";
	import { geoPath, geoMercator, geoOrthographic, geoGraticule10 } from "d3-geo";
	import { feature } from "topojson-client";
	import { createEventDispatcher } from "svelte";
	import { Plus, Minus } from "lucide-svelte";
	import { tweened } from "svelte/motion";
	import { cubicOut, linear, backInOut } from "svelte/easing";

	let {
		region = "World",
		zoom = $bindable(1),
		width = 800,
		height = 400,
		interactive = false,
		highlightedFeature = null,
		showLabels = false,
		minLabelZoom = 1,
		notHighlightedColor = "rgba(125,125,125, 0.2)",
		dynamicHeight = false,
		smallDynamicHeight = false,
		showPoints = false,
		hueRotateDegree = 0,
		topoJsonName = "topojson-world-110m",
		afterLoad = "",
		projectionType = "geoMercator",
		projectionRotation = 0,
		singleCountryRegion,
		children, // For components that work like layouts (with a render slot, in which HTML can be passed) - children needs to be specified as a prop
	} = $props();

	let mapContainer = $state();
	let features = $state([]);
	let points = $state([]); // New array to store point features

	let projections = {
		geoMercator: geoMercator(),
		geoOrthographic: geoOrthographic().rotate(projectionRotation),
	};

	let backgroundCircle = $state();

	let projection = projections[projectionType];
	let path = $state(geoPath().projection(projection));
	let regionCountries;

	let translateX = 0;
	let translateY = 0;

	let flashingFeature = $state(null);
	let flashCircle = $state(null);
	let flashCircleOpacity = tweened(0, { duration: 400, easing: linear });
	let flashCircleRadius = tweened(0, { duration: 600, easing: backInOut });

	let outlineFeature = $state(null);
	let outlineWidth = tweened(0, { duration: 500, easing: cubicOut });

	let loaded = $state(false);

	const dispatch = createEventDispatcher();

	const MIN_ZOOM = 0.5;
	const MAX_ZOOM = 20;

	let allRegionSettings = {};
	let regionPoints = {};

	async function fetchRegionSettings() {
		const regionSettingsJSON = await fetch("/json/regionSettings.json");
		return await regionSettingsJSON.json();
	}

	let rect;

	export function highlightFeature(featureName, color) {
		features = features.map((feature) => {
			if (feature.properties.name === featureName) {
				return { ...feature, color, flashColor: "" };
			}
			return feature;
		});

		points = points.map((point) => {
			if (point.properties.name === featureName) {
				return { ...point, color, flashColor: "" };
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

	function shortenRegionName(name) {
		if (name.length > 14) {
			name = name.substring(0, 10) + "..";
		}

		return name;
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

	let previousHighlightedFeature;

	$effect(() => {
		if (highlightedFeature && highlightedFeature !== previousHighlightedFeature) {
			highlightFeature(highlightedFeature, "white");
			previousHighlightedFeature = highlightedFeature;
		}
	});

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

		console.log("Coordinates: ", { latitude, longitude }, "Region name: ", feature.properties.name);
	}

	async function fetchTopoJSON() {
		try {
			const formattedTopoJsonName = topoJsonName.replace(".json", "");
			const response = await fetch(`/json/topojson/${formattedTopoJsonName}.json`);
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

	async function fetchRegionCountries() {
		try {
			const regionCountryData = await fetch("/json/regions.json");
			const regionCountries = await regionCountryData.json();
			return regionCountries;
		} catch (error) {
			console.error("Error fetching region json:", error);
		}
	}

	async function updateProjection() {
		if (!allRegionSettings) return;

		const settings = allRegionSettings[region] || allRegionSettings.Default;
		const { center, zoom: regionZoom } = settings;

		// Calculate the scale based on the map container size and region zoom
		const minDimension = Math.min(width, height);
		const baseScale = minDimension / 2;
		const scale = baseScale * regionZoom * zoom;

		if (projectionType === "geoOrthographic") {
			backgroundCircle = geoGraticule10();
		}

		projection.scale(scale).center([center.long, center.lat]).translate([translateX, translateY]);

		path = geoPath().projection(projection);
	}

	function generatePaths() {
		const highlightedCountries = highlightCountries() || [];

		features = features
			.map((feature, index) => {
				const isHighlighted =
					highlightedCountries.some((country) => country == feature.properties.name) ||
					region === "World" ||
					region === "All" ||
					region === "Satellite World";
				const d = path(feature);

				const interactivity = feature.isInteractive == null ? true : feature.isInteractive; // If there is a state defined for it already, it should take that - otherwise default isInteractive to true

				if (d) {
					return {
						...feature,
						uniqueKey: `feature-${index}-${feature.properties.name || "unnamed"}`,
						d,
						isHighlighted: isHighlighted,
						isInteractive: interactivity,
						flashColor: "",
						color: isHighlighted ? feature.color || "var(--color-secondary)" : notHighlightedColor,
					};
				}
				return null;
			})
			.filter((feature) => feature);

		// Generate point features
		points = points.map((point, index) => {
			let [x, y] = projection([point.initX, point.initY]);

			const interactivity = point.isInteractive == null ? true : point.isInteractive;

			return {
				...point,
				uniqueKey: `point-${index}-${point.properties.name}`,
				x,
				y,
				isHighlighted: true,
				isInteractive: interactivity,
				flashColor: "",
				color: point.color || "var(--color-secondary)",
			};
		});
	}

	function returnAllCountries() {
		if (!regionCountries) return;
		return [
			...new Set(
				(regionCountries?.World || []).concat(
					regionCountries?.Europe || [],
					regionCountries?.Asia || [],
					regionCountries?.Africa || [],
					regionCountries?.["South America"] || [],
					regionCountries?.["North America"] || [],
					regionCountries?.Oceania || [],
				),
			),
		];
	}

	function highlightCountries() {
		if (!singleCountryRegion) {
			const countries = region !== "World" ? regionCountries[region] : returnAllCountries();
			return countries;
		} else {
			return [singleCountryRegion];
		}
	}

	// Drag & Zoom --------------------------------------------------------------------------------------------------------------------------

	let isDragging = false;
	let lastX, lastY;

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
		translateX += (event.clientX - lastX) * (width / rect.width);
		translateY += (event.clientY - lastY) * (height / rect.height);
		lastX = event.clientX;
		lastY = event.clientY;
		updateProjection();
		generatePaths();
	}

	function handleMouseUp() {
		isDragging = false;
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

	// Touch Drag and zoom -----------------------------------

	let isTouching = false;
	let lastTouchDistance = null;

	function handleTouchStart(event) {
		if (!interactive) return;
		if (event.touches.length === 1) {
			isTouching = true;
			const touch = event.touches[0];
			lastX = touch.clientX;
			lastY = touch.clientY;
			lastTouchDistance = null;
		} else if (event.touches.length === 2) {
			isTouching = false; // Disable panning on multi-touch
			lastTouchDistance = getTouchDistance(event.touches);
		}
	}

	function handleTouchMove(event) {
		if (!interactive) return;

		if (isTouching && event.touches.length === 1) {
			event.preventDefault(); // Prevent page scroll
			rect = mapContainer.getBoundingClientRect();

			const touch = event.touches[0];
			const deltaX = touch.clientX - lastX;
			const deltaY = touch.clientY - lastY;

			translateX += deltaX * (width / rect.width);
			translateY += deltaY * (height / rect.height);

			lastX = touch.clientX;
			lastY = touch.clientY;

			updateProjection();
			generatePaths();
		} else if (event.touches.length === 2) {
			const currentDistance = getTouchDistance(event.touches);

			if (lastTouchDistance) {
				const distanceChange = currentDistance - lastTouchDistance;
				const zoomFactor = 1 + distanceChange / lastTouchDistance;

				// Calculate the pinch midpoint as the zoom focus point [of the two touches]
				const pinchMidX = (event.touches[0].clientX + event.touches[1].clientX) / 2;
				const pinchMidY = (event.touches[0].clientY + event.touches[1].clientY) / 2;

				// Get bounding rect for accurate translation calculation
				rect = mapContainer.getBoundingClientRect();
				const pinchMidXInMap = (pinchMidX - rect.left) * (width / rect.width);
				const pinchMidYInMap = (pinchMidY - rect.top) * (height / rect.height);

				// Apply zoom limit
				const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom * zoomFactor));
				const scaleChange = newZoom / zoom; // Calculate scale factor change

				// Adjust translation to keep zoom centered on the pinch point
				translateX -= (pinchMidXInMap - translateX) * (scaleChange - 1);
				translateY -= (pinchMidYInMap - translateY) * (scaleChange - 1);

				zoom = newZoom; // Update the zoom level
				updateProjection();
				generatePaths();
			}

			lastTouchDistance = currentDistance;
		}
	}

	function handleTouchEnd(event) {
		isTouching = false;
		lastTouchDistance = null;
	}

	function getTouchDistance(touches) {
		if (!interactive) return;

		const dx = touches[0].clientX - touches[1].clientX;
		const dy = touches[0].clientY - touches[1].clientY;
		return Math.sqrt(dx * dx + dy * dy);
	}

	onMount(() => {
		if (!interactive) return;
		mapContainer.addEventListener("touchstart", handleTouchStart);
		mapContainer.addEventListener("touchmove", handleTouchMove);
		mapContainer.addEventListener("touchend", handleTouchEnd);

		// Disable page zooming on touch gestures
		mapContainer.addEventListener("gesturestart", (e) => e.preventDefault());
		mapContainer.addEventListener("gesturechange", (e) => e.preventDefault());
		mapContainer.addEventListener("gestureend", (e) => e.preventDefault());

		return () => {
			mapContainer.removeEventListener("touchstart", handleTouchStart);
			mapContainer.removeEventListener("touchmove", handleTouchMove);
			mapContainer.removeEventListener("touchend", handleTouchEnd);
		};
	});

	// Mount, draw initial map  --------------------------------------------------------------------------------------------------------------------------

	onMount(async () => {
		const geoData = await fetchTopoJSON();
		regionCountries = await fetchRegionCountries();
		allRegionSettings = await fetchRegionSettings();

		const settings = allRegionSettings[region] || allRegionSettings.Default;
		regionPoints = settings?.points || {};

		if (geoData && regionCountries && allRegionSettings) {
			// Init features
			features = geoData.features;

			// Init points
			points = Object.entries(regionPoints || {}).map(([name, coords], index) => {
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
					color: "var(--color-secondary))",
				};
			});

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
	class="map-container rounded-lg relative grow {dynamicHeight ? 'dynamic-viewport-height' : ''} {smallDynamicHeight
		? 'small-dynamic-viewport-height'
		: ''}"
	bind:this={mapContainer}
	id="mapContainer"
>
	{#if !loaded}
		<div class="skeleton custom-loading-size opacity-75 rounded-lg bg-accent"></div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
	{:else}
		<div class="absolute w-full h-full bg-accent"></div>

		{@render children?.()}

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<svg
			width="100%"
			height="100%"
			viewBox={`0 0 ${width} ${height}`}
			style="filter: hue-rotate({hueRotateDegree}deg)"
			onwheel={handleZoom}
			onmousedown={handleMouseDown}
			onmousemove={handleMouseMove}
			onmouseup={handleMouseUp}
			onmouseleave={handleMouseUp}
			fill="var(--color-secondary)"
			class="relative {interactive ? 'pointer-events-auto' : 'pointer-events-none'}"
		>
			<g>
				{#if projectionType === "geoOrthographic" && backgroundCircle}
					<path d={path({ type: "Sphere" })} fill="rgba(0, 0, 0, 0.075)" stroke="none" class="planet-background" />
				{/if}
				<g>
					{#each features as feature (feature.uniqueKey)}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<path
							d={feature.d}
							fill={feature.flashColor || feature.color || "var(--color-accent)"}
							stroke="var(--color-accent)"
							stroke-width="0.5"
							vector-effect="non-scaling-stroke"
							onclick={(event) => handleRegionClick(feature, event)}
							onmouseenter={() => (feature.isHovered = true)}
							onmouseleave={() => (feature.isHovered = false)}
							class="feature-path"
							style="filter: {feature.isHovered ? 'brightness(1.1)' : 'none'};"
						/>
					{/each}
				</g>

				<g>
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					{#if showPoints}
						{#each points as point (point.uniqueKey)}
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<g
								onclick={(event) => handleRegionClick(point, event)}
								onmouseenter={() => (point.isHovered = true)}
								onmouseleave={() => (point.isHovered = false)}
								class="point-feature"
								stroke="var(--color-base-200)"
								stroke-width="2"
								transform={`translate(${point.x},${point.y})`}
							>
								<circle
									r={5 + (15 * Math.max(width, height)) / 2000}
									fill={point.flashColor || point.color || "var(--color-secondary)"}
									class="point-circle"
									style="filter: drop-shadow(2px 2px 4px rgba(50,50,50,0.3)) {point.isHovered
										? 'brightness(1.2)'
										: ''};"
								/>
							</g>
						{/each}
					{/if}
				</g>

				{#if interactive}
					<!-- text labels (country / region / city name) -->
					<g>
						{#each features as feature (feature.uniqueKey)}
							<!-- check if the feature is even highlighted and part of the map, if all labels or its label should be shown, if the zoom is big enough and if there isn't a point with that label already -->
							{#if feature.isHighlighted && (showLabels || feature.showLabel) && zoom >= minLabelZoom && !points.some((point) => point.properties.name == feature.properties.name)}
								{#if path.centroid(feature)}
									{@const [x, y] = path.centroid(feature)}
									{@const text = shortenRegionName(feature.properties.name)}
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
											fill="var(--color-base-300)"
											class="label-background"
										/>
										<text
											{x}
											y={y + 1}
											text-anchor="middle"
											dominant-baseline="middle"
											fill="var(--color-secondary)"
											font-size="15"
											font-weight="bold"
											pointer-events="none"
											class="label-text"
										>
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
										fill="var(--color-base-300)"
										class="label-background"
									/>
									<text
										y={-30}
										text-anchor="middle"
										dominant-baseline="middle"
										fill="var(--color-secondary)"
										font-size="15"
										font-weight="bold"
										pointer-events="none"
										class="label-text"
									>
										{text}
									</text>
								</g>
							{/if}
						{/each}
					</g>

					{#if flashCircle}
						{@const [cx, cy] =
							flashingFeature.type === "Point"
								? projection([flashingFeature.initX, flashingFeature.initY])
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
								class="flash-circle"
							>
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
								vector-effect="non-scaling-stroke"
							/>
						</g>
					{/if}
				{/if}
			</g>
		</svg>

		{#if interactive}
			<div class="absolute bottom-4 right-4 flex flex-col gap-2">
				<button class="btn btn-circle btn-base-200 btn-sm" onclick={handleZoomIn} aria-label="Zoom in">
					<Plus size={16} />
				</button>
				<button class="btn btn-circle btn-base-200 btn-sm" onclick={handleZoomOut} aria-label="Zoom out">
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

	.custom-loading-size {
		height: 100%;
		width: 100%;
		min-height: 135px;
	}

	svg {
		display: block;
		cursor: pointer;
	}

	path:hover {
		color: var(--color-primary);
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
		height: 50dvh;
	}

	.small-dynamic-viewport-height {
		height: 25dvh;
	}

	.planet-background {
		pointer-events: none;
	}
</style>
