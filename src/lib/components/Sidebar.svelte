<script>
    import DarkModeToggle from "./DarkModeToggle.svelte";
    import AccountButton from "$lib/components/AccountButton.svelte";
    import HamburgerToggle from "$lib/components/HamburgerToggle.svelte";
    import { page } from "$app/stores"; // To access the current path

    let showCountries = false;
    let countries = ["England", "Germany", "USA", "Japan"];
    let activeButton = ""; // Track the active button

    // Set active button based on the current path on component mount
    $: {
        const currentPath = $page.url.pathname;
        if (currentPath === "/") {
            activeButton = "home";
        } else if (currentPath === "/starter-guide") {
            activeButton = "starter-guide";
        } else if (currentPath === "/map-creation") {
            activeButton = "map-creation";
        } else if (currentPath.startsWith("/learn-countries")) {
            const country = currentPath.split("/").pop(); // Get the last part of the URL
            activeButton = country.toLowerCase(); // Set active to the corresponding country
        }
    }

    // Function to handle navigation and set the active button
    function switchSelection(buttonId) {
        activeButton = buttonId; // Set the active button
    }

    function toggleCountries() {
        showCountries = !showCountries;
    }
</script>

<!-- button to open drawer -->
<HamburgerToggle forProp={"navigation-drawer"}/>

<div class="drawer lg:drawer-open h-full">
    <!-- hidden checkbox that handles the state -->
    <input id="navigation-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side h-full">
        <label
            for="navigation-drawer"
            aria-label="close sidebar"
            class="drawer-overlay">
        </label>

        <!-- Navigation Links -->
        <nav class="flex h-full justify-between flex-col">
            <!-- Logo -->
            <div class="h-1/6 flex justify-center items-center">
                <img
                    src="/src/lib/assets/openguessr_icon.png"
                    alt="OpenGuessr Logo"
                    class="w-16 h-16 rounded-full p-2 bg-base-200" />
            </div>
            <div
                class="rounded-tr-2xl p-4 bg-base-200 h-full flex justify-between flex-col">
                <ul class="menu w-full space-y-4 p-0">
                    <li>
                        <a
                            class="btn normal-case text-lg {activeButton ===
                            'home'
                                ? 'btn-primary text-white'
                                : 'btn-accent'}"
                            href="/"
                            on:click={(e) => switchSelection(e)}>Home</a>
                    </li>
                    <li>
                        <a
                            class="btn normal-case text-lg {activeButton ===
                            'starter-guide'
                                ? 'btn-primary text-white'
                                : 'btn-accent'}"
                            href="/starter-guide"
                            on:click={(e) => switchSelection(e)}
                            >Starter Guide</a>
                    </li>
                    <li>
                        <a
                            class="btn normal-case text-lg {activeButton ===
                            'map-creation'
                                ? 'btn-primary text-white'
                                : 'btn-accent'}"
                            href="/map-creation"
                            on:click={(e) => switchSelection(e)}
                            >Map Creation</a>
                    </li>
                    <li class="w-full">
                        <button
                            class="btn w-full normal-case text-lg {activeButton ===
                            'learn-countries'
                                ? 'btn-primary text-white'
                                : 'btn-accent'}"
                            on:click={toggleCountries}>
                            Learn Countries
                        </button>
                        {#if showCountries}
                            <ul class="ml-4 space-y-3 mt-4">
                                {#each countries as country}
                                    <li>
                                        <a
                                            class="btn btn-sm w-full {activeButton ===
                                            country.toLowerCase()
                                                ? 'btn-primary text-white'
                                                : 'btn-accent'}"
                                            href={"/learn-countries/" +
                                                country.toLowerCase()}
                                            on:click={(e) =>
                                                switchSelection(e)}>
                                            {country}
                                        </a>
                                    </li>
                                {/each}
                            </ul>
                        {/if}
                    </li>
                </ul>
                <div class="flex justify-around">
                    <!-- Light/Dark Mode Toggle -->
                    <DarkModeToggle />
                    <!-- Account button at the top-right -->
                    <AccountButton />
                </div>
            </div>
        </nav>
    </div>
</div>
