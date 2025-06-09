<script>
	import { onMount, onDestroy } from "svelte";

	let globeElement = $state();
	let globe;
	let isLoading = $state(true);
	let isVisible = false;
	let observer;

	// Function to determine the current globe texture based on the data-theme attribute
	const getThemeTexture = () => {
		return document.documentElement.getAttribute("data-theme") === "dark"
			? "/assets/home/earth_dark.jpg" // Dark mode texture
			: "/assets/home/earth_light.jpg"; // Light mode texture
	};

	const loadGlobe = async () => {
		if (!isVisible || globe) return;

		const Globe = (await import("globe.gl")).default;

		const isMobile = window.innerWidth <= 768;
		const globeWidth = isMobile ? 500 : 800;
		const globeHeight = isMobile ? 350 : 470;

		globe = Globe()
			.globeImageUrl(getThemeTexture())
			.backgroundColor("rgba(0, 0, 0, 0)")
			.lineHoverPrecision(0)
			.width(globeWidth)
			.height(globeHeight)(globeElement)
			.atmosphereColor("red");

		// Add country polygons
		const response = await fetch("/json/topojson/globe-data.json");
		const countries = await response.json();

		globe
			.polygonsData(countries.features)
			.polygonAltitude(0.01)
			.polygonCapColor(() => "rgba(255, 8, 8, 0.6)")
			.polygonSideColor(() => "rgba(255, 8, 8, 0.6)")
			.polygonStrokeColor(() => "#111")
			.onPolygonHover((hoverD) => {
				globe
					.polygonAltitude((d) => (d === hoverD ? 0.02 : 0.01))
					.polygonCapColor((d) => (d === hoverD ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 8, 8, 0.6)"));
			})
			.onPolygonClick((clickedCountry) => {
				if (clickedCountry) {
					const countryName = clickedCountry.properties.NAME.toLowerCase().replace(/ /g, "-");
					window.location.href = `/countries/learn/${countryName}`;
				}
			});

		// Auto-rotate
		globe.controls().autoRotate = true;
		globe.controls().autoRotateSpeed = 0.5;
		globe.controls().enableZoom = false;

		// Apply low-poly effect
		globe.polygonStrokeColor(() => "#111");

		isLoading = false;
	};

	const cleanupGlobe = () => {
		if (globe) {
			globe.pauseAnimation();
			globe.controls().dispose();
			globe._destructor();
			globe = null;
		}
		if (globeElement) {
			while (globeElement.firstChild) {
				globeElement.removeChild(globeElement.firstChild);
			}
		}
		isLoading = true;
	};

	onMount(() => {
		observer = new IntersectionObserver(
			([entry]) => {
				isVisible = entry.isIntersecting;
				if (isVisible) {
					loadGlobe();
				}
			},
			{ threshold: 0.1 },
		);

		if (globeElement) observer.observe(globeElement);

		// Theme change observer
		const themeObserver = new MutationObserver(() => {
			if (globe) {
				globe.globeImageUrl(getThemeTexture());
			}
		});

		themeObserver.observe(document.documentElement, { attributes: true });

		return () => {
			themeObserver.disconnect();
		};
	});

	onDestroy(() => {
		if (observer) observer.disconnect();
		cleanupGlobe();
	});
</script>

<div class="globe-container w-full flex justify-center items-center rounded-xl" bind:this={globeElement}>
	{#if isLoading}
		<div class="loading loading-spinner loading-lg text-base-200"></div>
	{/if}
</div>

<style>
	.globe-container {
		height: 350px;
	}
	:global(.scene-container) {
		background-color: transparent !important;
	}

	/* disable on small phones to allow for scrolling without spinning the globe */
	@media all and (max-width: 768px) {
		.globe-container {
			height: 250px;
		}
	}
</style>
