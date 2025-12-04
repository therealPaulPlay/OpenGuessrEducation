<script>
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { geoPath, geoOrthographic, geoGraticule10 } from "d3-geo";
	import { feature } from "topojson-client";

	let countries = $state([]);

	const width = 2000;
	const height = 2000;
	const projection = geoOrthographic()
		.scale(950)
		.translate([width / 2, height / 2])
		.rotate([-10, -10, 0])
		.clipAngle(90);

	const graticule = geoGraticule10();
	const path = geoPath().projection(projection);

	function handleCountryClick(countryName) {
		const formattedName = countryName.toLowerCase().replace(/ /g, "-");
		goto(`/countries/learn/${formattedName}`);
	}

	async function loadGlobeData() {
		const response = await fetch("/json/topojson/topojson-world-110m.json");
		const topology = await response.json();
		const geoData = feature(topology, topology.objects.countries);
		countries = geoData.features;
	}

	onMount(() => {
		loadGlobeData();
	});
</script>

<div class="globe-container w-full flex justify-center items-center">
	<svg {width} {height} viewBox="0 0 {width} {height}" class="globe-svg">
		<defs>
			<radialGradient id="sphere-gradient">
				<stop offset="0%" stop-color="rgba(255, 255, 255, 0.95)" />
				<stop offset="100%" stop-color="rgba(255, 255, 255, 0.85)" />
			</radialGradient>
			<filter id="glow">
				<feGaussianBlur stdDeviation="8" result="coloredBlur" />
				<feMerge>
					<feMergeNode in="coloredBlur" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>

		<!-- Background sphere -->
		<circle cx={width / 2} cy={height / 2} r={950} fill="url(#sphere-gradient)" filter="url(#glow)" />

		<!-- Graticule (grid lines) -->
		<path d={path(graticule)} fill="none" stroke="rgba(200, 200, 200, 0.2)" stroke-width="0.5" />

		<!-- Countries -->
		{#each countries as country, i (`${country.properties.name}-${i}`)}
			{@const d = path(country)}
			{#if d}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<path
					{d}
					fill="var(--color-secondary)"
					stroke="#8B0000"
					stroke-width="1"
					class="country-path"
					onclick={() => handleCountryClick(country.properties.name)}
				/>
			{/if}
		{/each}
	</svg>
</div>

<style>
	.globe-container {
		height: 900px;
		overflow: visible;
		margin-top: -290px;
	}

	@media (max-width: 1024px) {
		.globe-container {
			height: 800px;
			margin-top: -250px;
		}
	}

	@media (max-width: 640px) {
		.globe-container {
			height: 400px;
			margin-top: -30px;
		}
	}

	@media (max-width: 400px) {
		.globe-container {
			height: 400px;
			margin-top: -40px;
		}
	}

	.globe-svg {
		max-width: 100%;
		max-height: 100%;
		filter: drop-shadow(0 0 30px var(--color-secondary));
	}

	.country-path {
		cursor: pointer;
		transition: fill 0.15s;
	}

	.country-path:hover {
		fill: white;
	}
</style>
