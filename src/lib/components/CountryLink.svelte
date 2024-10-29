<script>
    import { onMount } from "svelte";
    import * as Icon from "svelte-flag-icons";
    let { country } = $props();

    let IconComponent = $state();

    let countryCodes;

    async function fetchCountryCodes() {
        try {
            if (!countryCodes) {
                const codes = await fetch("/json/countryCodes.json");
                const jsonCodes = await codes.json();
                return jsonCodes;
            }

            return countryCodes;
        } catch (error) {
            console.error(
                "Error fetching and processing country code json:",
                error,
            );
        }
    }

    onMount(async () => {
        countryCodes = await fetchCountryCodes();
        IconComponent = Icon[countryCodes[country]] || undefined;
    });
</script>

<a
    class="px-2 py-1 bg-base-200 rounded-md hover:scale-95 transition-all cursor-pointer"
    href="/countries/learn/{country.toLowerCase().replaceAll(' ', '-')}">
    <div class="flex gap-4 items-center">
        <p class="text-lg">
            {country}
        </p>
        {#if IconComponent}
            <IconComponent />
        {:else} 
            <div class="h-3 w-5">
                <span class="loading loading-dots loading-sm"></span>
            </div>
        {/if}
    </div>
</a>