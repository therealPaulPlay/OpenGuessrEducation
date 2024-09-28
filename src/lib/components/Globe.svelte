<script>
    import { onMount } from "svelte";

    let globeElement;
    let globe;

    onMount(async () => {
        const Globe = (await import("globe.gl")).default;

        // Function to determine the current globe texture based on the data-theme attribute
        const getThemeTexture = () => {
            return document.documentElement.getAttribute('data-theme') === 'dark'
                ? "/src/lib/assets/earth_dark.jpg" // Dark mode texture
                : "/src/lib/assets/earth_light.jpg"; // Light mode texture
        };

        globe = Globe()
            .globeImageUrl(getThemeTexture())
            .backgroundColor("rgba(0, 0, 0, 0)")
            .lineHoverPrecision(0)
            .width(800)
            .height(500)(globeElement)
            .atmosphereColor("red");

        // Add country polygons
        const response = await fetch(
            "https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson",
        );
        const countries = await response.json();

        globe
            .polygonsData(countries.features)
            .polygonAltitude(0.01)
            .polygonCapColor(() => "rgba(255, 8, 8, 0.5)")
            .polygonSideColor(() => "rgba(255, 8, 8, 0.5)")
            .polygonStrokeColor(() => "#111")
            .onPolygonHover((hoverD) => {
                globe
                    .polygonAltitude((d) => (d === hoverD ? 0.02 : 0.01))
                    .polygonCapColor((d) =>
                        d === hoverD
                            ? "rgba(255, 255, 255, 0.8)"
                            : "rgba(255, 8, 8, 0.5)",
                    );
            })
            .onPolygonClick((clickedCountry) => {
                if (clickedCountry) {
                    const countryName =
                        clickedCountry.properties.NAME.toLowerCase().replace(
                            / /g,
                            "-",
                        );
                    window.location.href = `/countries/${countryName}`;
                }
            });

        // Auto-rotate
        globe.controls().autoRotate = true;
        globe.controls().autoRotateSpeed = 0.5;
        globe.controls().enableZoom = false;

        // Apply low-poly effect
        globe
            .polygonStrokeColor(() => "#111");

        // Listen for theme changes by observing the data-theme attribute
        const observer = new MutationObserver(() => {
            globe.globeImageUrl(getThemeTexture());
        });

        // Observe changes to the attributes of the html element
        observer.observe(document.documentElement, { attributes: true });
    });
</script>

<div
    class="globe-container w-full flex justify-center items-center rounded-xl"
    bind:this={globeElement}>
</div>

<style>
    .globe-container {
        height: 400px;
    }

    :global(.scene-container) {
        background-color: transparent !important;
    }
</style>
