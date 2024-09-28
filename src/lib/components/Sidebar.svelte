<script>
    import DarkModeToggle from "./DarkModeToggle.svelte";
    import AccountButton from "$lib/components/AccountButton.svelte";
    import { page } from "$app/stores";
    import { onMount } from 'svelte';

    export let isOpen = false;

    let showCountries = false;
    let countries = ["England", "Germany", "USA", "Japan"];
    let activeButton = "";
    let mounted = false;

    onMount(() => {
        mounted = true;
    });

    $: {
        const currentPath = $page.url.pathname;
        if (currentPath === "/") {
            activeButton = "home";
        } else if (currentPath === "/starter-guide") {
            activeButton = "starter-guide";
        } else if (currentPath === "/map-creation") {
            activeButton = "map-creation";
        } else if (currentPath.startsWith("/learn-countries")) {
            const country = currentPath.split("/").pop();
            activeButton = country.toLowerCase();
        }
    }

    function switchSelection(buttonId) {
        activeButton = buttonId;
        if (window.innerWidth < 1024) {
            isOpen = false;
        }
    }

    function toggleCountries() {
        showCountries = !showCountries;
    }
</script>

<aside class="bg-base-200 w-64 h-full overflow-y-auto fixed left-0 top-0 bottom-0 z-30 transition-transform duration-300 ease-in-out lg:translate-x-0"
       class:translate-x-0={isOpen}
       class:-translate-x-full={!isOpen && mounted}>
    <nav class="flex h-full flex-col justify-between p-4">
        <!-- Logo -->
        <div class="flex justify-center items-center mb-6">
            <img
                src="/src/lib/assets/openguessr_icon.png"
                alt="OpenGuessr Logo"
                class="w-16 h-16 rounded-full p-2 bg-base-300" />
        </div>

        <!-- Navigation Links -->
        <ul class="menu w-full space-y-4 p-0">
            <li>
                <a
                    class="btn normal-case text-lg {activeButton === 'home' ? 'btn-primary text-white' : 'btn-accent'}"
                    href="/"
                    on:click={() => switchSelection('home')}>Home</a>
            </li>
            <li>
                <a
                    class="btn normal-case text-lg {activeButton === 'starter-guide' ? 'btn-primary text-white' : 'btn-accent'}"
                    href="/starter-guide"
                    on:click={() => switchSelection('starter-guide')}>Starter Guide</a>
            </li>
            <li>
                <a
                    class="btn normal-case text-lg {activeButton === 'map-creation' ? 'btn-primary text-white' : 'btn-accent'}"
                    href="/map-creation"
                    on:click={() => switchSelection('map-creation')}>Map Creation</a>
            </li>
            <li class="w-full">
                <button
                    class="btn w-full normal-case text-lg {activeButton === 'learn-countries' ? 'btn-primary text-white' : 'btn-accent'}"
                    on:click={toggleCountries}>
                    Learn Countries
                </button>
                {#if showCountries}
                    <ul class="ml-4 space-y-3 mt-4">
                        {#each countries as country}
                            <li>
                                <a
                                    class="btn btn-sm w-full {activeButton === country.toLowerCase() ? 'btn-primary text-white' : 'btn-accent'}"
                                    href={"/learn-countries/" + country.toLowerCase()}
                                    on:click={() => switchSelection(country.toLowerCase())}>
                                    {country}
                                </a>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </li>
        </ul>

        <div class="flex justify-around mt-auto">
            <DarkModeToggle />
            <AccountButton />
        </div>
    </nav>
</aside>

<!-- Overlay for mobile -->
{#if isOpen}
    <div class="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" on:click={() => isOpen = false}></div>
{/if}