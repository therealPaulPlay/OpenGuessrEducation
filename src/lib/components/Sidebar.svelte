<script>
    import DarkModeToggle from "./DarkModeToggle.svelte";
    import AccountButton from "$lib/components/AccountButton.svelte";
    import { page } from "$app/stores";
    import { onMount } from 'svelte';

    export let isOpen = false;

    let showCountries = false;
    let showGuides = false;

    let countries = ["England", "Germany", "USA", "Japan"];
    let guides = ["Create Maps", "Land a 5K"];

    let activeButton = "";
    let mounted = false;

    onMount(() => {
        mounted = true;
    });

    $: {
        const currentPath = $page.url.pathname;
        if (currentPath === "/") {
            activeButton = "home";
        } else if (currentPath === "/get-started") {
            activeButton = "get-started";
        } else if (currentPath.startsWith("/guides")) {
            activeButton = "guides";
        } else if (currentPath.startsWith("/quiz")) {
            activeButton = "quiz";
        } else if (currentPath.startsWith("/countries")) {
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

    function toggleGuides() {
        showGuides = !showGuides;
    }
</script>

<aside class="bg-base-200 w-64 h-full overflow-y-auto fixed left-0 top-0 bottom-0 z-[100] transition-transform duration-300 ease-in-out lg:translate-x-0"
       class:translate-x-0={isOpen}
       class:-translate-x-full={!isOpen && mounted}>
    <nav class="flex h-full flex-col justify-between p-4">
        <!-- Logo -->
        <div class="flex justify-center items-center mb-6 mt-5">
            <img
                src="/src/lib/assets/openguessr_icon.png"
                alt="OpenGuessr Logo"
                class="w-16 h-16 rounded-full p-2 bg-base-300" />
        </div>

        <!-- Navigation Links -->
        <ul class="menu w-full space-y-4 p-0 mt-20">
            <li>
                <a
                    class="btn normal-case text-lg {activeButton === 'home' ? 'btn-primary text-white' : 'btn-accent'}"
                    href="/"
                    on:click={() => switchSelection('home')}>Home</a>
            </li>
            <li>
                <a
                    class="btn normal-case text-lg {activeButton === 'get-started' ? 'btn-primary text-white' : 'btn-accent'}"
                    href="/get-started"
                    on:click={() => switchSelection('get-started')}>Get started</a>
            </li>
            <li>
                <a
                    class="btn normal-case text-lg {activeButton === 'quiz' ? 'btn-primary text-white' : 'btn-accent'}"
                    href="/quiz"
                    on:click={() => switchSelection('quiz')}>Quizzes</a>
            </li>
            <li class="w-full">
                <button
                    class="btn w-full normal-case text-lg {activeButton === 'guides' ? 'btn-primary text-white' : 'btn-accent'}"
                    on:click={toggleGuides}>
                    Guides
                </button>
                {#if showGuides}
                    <ul class="ml-4 space-y-3 mt-4">
                        {#each guides as guide}
                            <li>
                                <a
                                    class="btn btn-sm w-full {activeButton === guide.toLowerCase() ? 'btn-primary text-white' : 'btn-accent'}"
                                    href={"/guides/" + guide.toLowerCase()}
                                    on:click={() => switchSelection(guide.toLowerCase())}>
                                    {guide}
                                </a>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </li>
            <li class="w-full">
                <button
                    class="btn w-full normal-case text-lg {activeButton === 'countries' ? 'btn-primary text-white' : 'btn-accent'}"
                    on:click={toggleCountries}>
                    Learn Countries
                </button>
                {#if showCountries}
                    <ul class="ml-4 space-y-3 mt-4">
                        {#each countries as country}
                            <li>
                                <a
                                    class="btn btn-sm w-full {activeButton === country.toLowerCase() ? 'btn-primary text-white' : 'btn-accent'}"
                                    href={"/countries/" + country.toLowerCase()}
                                    on:click={() => switchSelection(country.toLowerCase())}>
                                    {country}
                                </a>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </li>
            <div class="divider">OR</div>
            <li>
                <a
                    class="btn normal-case text-lg btn-accent"
                    href="https://openguessr.com" target="_blank">
                    Play OpenGuessr</a>
            </li>
        </ul>

        <div class="flex justify-between mt-auto">
            <DarkModeToggle />
            <AccountButton />
        </div>
    </nav>
</aside>

<!-- Overlay for mobile -->
{#if isOpen}
    <button class="fixed inset-0 bg-black bg-opacity-50 z-[99] lg:hidden" on:click={() => isOpen = false}></button>
{/if}