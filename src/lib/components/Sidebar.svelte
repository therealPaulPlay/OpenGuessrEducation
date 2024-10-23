<script>
    import { run } from 'svelte/legacy';

    import DarkModeToggle from "./DarkModeToggle.svelte";
    import AccountButton from "$lib/components/AccountButton.svelte";
    import { page } from "$app/stores";
    import { onMount } from 'svelte';

    let { isOpen = $bindable(false) } = $props();

    let showCountries = false;
    let showGuides = false;

    let countries = ["England", "Germany", "USA", "Japan"];
    let guides = ["Create Maps", "Land a 5K"];

    let activeButton = $state("");
    let mounted = $state(false);

    onMount(() => {
        mounted = true;
    });

    run(() => {
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
    });

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
        <ul class="menu w-full space-y-4 p-0 mt-10 mb-5">
            <li>
                <a
                    class="btn normal-case text-lg {activeButton === 'home' ? 'btn-primary text-white' : 'btn-accent'}"
                    href="/"
                    onclick={() => switchSelection('home')}>Home</a>
            </li>
            <li>
                <a
                    class="btn normal-case text-lg {activeButton === 'get-started' ? 'btn-primary text-white' : 'btn-accent'}"
                    href="/get-started"
                    onclick={() => switchSelection('get-started')}>Get started</a>
            </li>
            <li>
                <a
                    class="btn normal-case text-lg {activeButton === 'quiz' ? 'btn-primary text-white' : 'btn-accent'}"
                    href="/quiz"
                    onclick={() => switchSelection('quiz')}>Quizzes</a>
            </li>
            <li>
                <a
                    class="btn normal-case text-lg {activeButton === 'guides' ? 'btn-primary text-white' : 'btn-accent'}"
                    href="/guides"
                    onclick={() => switchSelection('guides')}>Guides</a>
            </li>
            <li>
                <a
                    class="btn normal-case text-lg {activeButton === 'countries' ? 'btn-primary text-white' : 'btn-accent'}"
                    href="/countries"
                    onclick={() => switchSelection('countries')}>Learn Countries</a>
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
    <button class="fixed inset-0 bg-black bg-opacity-50 z-[99] lg:hidden" onclick={() => isOpen = false}></button>
{/if}