<script>
	import { goto } from "$app/navigation";
	import { onMount, onDestroy } from "svelte";

	let globeElement = $state();
	let globe;
	let isLoading = $state(true);
	let isVisible = false;
	let observer;
	let themeObserver;

	const getThemeTexture = () =>
		document.documentElement.getAttribute("data-theme") === "dark"
			? "/assets/home/earth_dark.jpg"
			: "/assets/home/earth_light.jpg";

	const getGlobeConfig = () => {
		const width = window.innerWidth;
		const isMobile = width <= 768;
		const isTablet = width <= 1024;

		return {
			width: isMobile ? 500 : isTablet ? 1000 : 1400,
			height: isMobile ? 500 : isTablet ? 1000 : 1400,
		};
	};

	const loadGlobe = async () => {
		if (!isVisible || globe || !globeElement) return;

		try {
			const [Globe, response] = await Promise.all([
				import("globe.gl").then((module) => module.default),
				fetch("/json/topojson/globe-data.json"),
			]);

			const countries = await response.json();
			const config = getGlobeConfig();

			globe = Globe()
				.globeImageUrl(getThemeTexture())
				.backgroundColor("rgba(0, 0, 0, 0)")
				.lineHoverPrecision(0)
				.width(config.width)
				.height(config.height)
				.atmosphereColor("red")
				.polygonsData(countries.features)
				.polygonAltitude(0.01)
				.polygonCapColor(() => "rgba(245,85, 85, 0.9)")
				.polygonSideColor(() => "rgba(250, 150, 150, 0.5)")
				.polygonStrokeColor(() => "#111")
				.onPolygonHover((hoverD) => {
					globe
						.polygonAltitude((d) => (d === hoverD ? 0.02 : 0.01))
						.polygonCapColor((d) => (d === hoverD ? "white" : "rgba(245,85, 85, 0.9)"));
				})
				.onPolygonClick((clickedCountry) => {
					if (!clickedCountry) return;
					const countryName = clickedCountry.properties.NAME.toLowerCase().replace(/ /g, "-");
					goto(`/countries/learn/${countryName}`);
				})(globeElement);

			// Configure controls
			const controls = globe.controls();
			controls.autoRotate = true;
			controls.autoRotateSpeed = 0.2;
			controls.enableZoom = false;

			isLoading = false;
		} catch (error) {
			console.error("Failed to load globe:", error);
			isLoading = false;
		}
	};

	const cleanupGlobe = () => {
		if (!globe) return;

		try {
			globe.pauseAnimation();
			globe.controls().dispose();
			globe._destructor();
		} catch (error) {
			console.warn("Globe cleanup error:", error);
		}

		globe = null;

		if (globeElement) {
			while (globeElement.firstChild) {
				globeElement.removeChild(globeElement.firstChild);
			}
		}

		isLoading = true;
	};

	onMount(() => {
		// Intersection observer for lazy loading
		observer = new IntersectionObserver(
			([entry]) => {
				isVisible = entry.isIntersecting;
				if (isVisible) loadGlobe();
			},
			{ threshold: 0.1 },
		);

		if (globeElement) observer.observe(globeElement);

		// Theme change observer
		themeObserver = new MutationObserver(() => {
			if (globe) globe.globeImageUrl(getThemeTexture());
		});

		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"],
		});
	});

	onDestroy(() => {
		observer?.disconnect();
		themeObserver?.disconnect();
		cleanupGlobe();
	});
</script>

<div class="globe-container w-full flex justify-center items-center rounded-xl" bind:this={globeElement}>
	{#if isLoading}
		<div class="loading loading-spinner loading-lg text-base-300"></div>
	{/if}
</div>

<style>
	.globe-container {
		height: 350px;
	}

	@media (max-width: 1024px) {
		.globe-container {
			height: 250px;
		}
	}
</style>
