<script>
    import * as Icon from "svelte-flag-icons";

    export let region = "Europe";
    export let hueRotateDegree = 0;

    let countryCodes;
    let regionsArray;

    let flagsLoaded = false;

    async function fetchRegions() {
        try {
            if (!regionsArray) {
                regionsArray = await fetch("/src/lib/json/regions.json");
                regionsArray = await regionsArray.json();
                regionsArray = regionsArray[region];
            }
        } catch (error) {
            console.error(
                "Error loading region - likely, that region does not exist. Error:",
                error,
            );
        }
    }

    async function fetchCountryCodes() {
        try {
            if (!countryCodes) {
                const codes = await fetch("/src/lib/json/countryCodes.json");
                countryCodes = await codes.json();
            }
        } catch (error) {
            console.error(
                "Error fetching and processing country code json:",
                error,
            );
        }
    }

    let Icon1;
    let Icon2;
    let Icon3;
    let Icon4;
    let Icon5;
    let Icon6;
    let Icon7;
    let Icon8;
    let Icon9;

    async function loadPreviewFlags() {
        await fetchRegions();
        await fetchCountryCodes();

        for (let i = 1; i <= 9; i++) {
            assignRandomIcon(i, 0);
        }

        flagsLoaded = true;
    }

    function assignRandomIcon(i, startIndex) {
        const randomRegionIndex = i + startIndex;
        const randomRegion = regionsArray[randomRegionIndex];

        try {
            switch (i) {
                case 1:
                    Icon1 = Icon[countryCodes[randomRegion]];
                    break;
                case 2:
                    Icon2 = Icon[countryCodes[randomRegion]];
                    break;
                case 3:
                    Icon3 = Icon[countryCodes[randomRegion]];
                    break;
                case 4:
                    Icon4 = Icon[countryCodes[randomRegion]];
                    break;
                case 5:
                    Icon5 = Icon[countryCodes[randomRegion]];
                    break;
                case 6:
                    Icon6 = Icon[countryCodes[randomRegion]];
                    break;
                case 7:
                    Icon7 = Icon[countryCodes[randomRegion]];
                    break;
                case 8:
                    Icon8 = Icon[countryCodes[randomRegion]];
                    break;
                case 9:
                    Icon9 = Icon[countryCodes[randomRegion]];
                    break;
            }
        } catch (error) {
            console.warn(
                "No flag icon for this region in the flag stack preview available:",
                error,
            );
        }
    }

    loadPreviewFlags();
</script>

<div
    class="custom-size rounded-lg overflow-hidden grow bg-secondary"
    style="filter: hue-rotate({hueRotateDegree}deg)">
    {#if flagsLoaded}
        <div
            class="relative flex flex-wrap dark:brightness-75 grayscale opacity-70">
            {#if Icon1}
                <div class="half-negative-margin bg-grey-500">
                    <svelte:component this={Icon1} size="72" />
                </div>
            {/if}
            {#if Icon2}
                <div class="half-negative-margin bg-grey-500">
                    <svelte:component this={Icon2} size="72" />
                </div>
            {/if}
            {#if Icon3}
                <div class="half-negative-margin bg-grey-500">
                    <svelte:component this={Icon3} size="72" />
                </div>
            {/if}
            {#if Icon4}
                <div class="negative-margin bg-grey-500">
                    <svelte:component this={Icon4} size="72" />
                </div>
            {/if}
            {#if Icon5}
                <div class="negative-margin bg-grey-500">
                    <svelte:component this={Icon5} size="72" />
                </div>
            {/if}
            {#if Icon6}
                <div class="negative-margin bg-grey-500">
                    <svelte:component this={Icon6} size="72" />
                </div>
            {/if}
            {#if Icon7}
                <div class="negative-margin bg-grey-500">
                    <svelte:component this={Icon7} size="72" />
                </div>
            {/if}
            {#if Icon8}
                <div class="negative-margin bg-grey-500">
                    <svelte:component this={Icon8} size="72" />
                </div>
            {/if}
            {#if Icon9}
                <div class="negative-margin bg-grey-500">
                    <svelte:component this={Icon9} size="72" />
                </div>
            {/if}
        </div>
    {/if}
</div>

<style>
    .custom-size {
        width: 216px;
        height: 135px;
        background-blend-mode: luminosity;
    }

    .negative-margin {
        margin-top: -26px;
    }

    .half-negative-margin {
        margin-top: -13px;
    }
</style>
