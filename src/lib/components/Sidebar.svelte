<script>
    import DarkModeToggle from "./DarkModeToggle.svelte";
    let showCountries = false;
    let countries = ["England", "Germany", "USA", "Japan"];

    function toggleCountries() {
        showCountries = !showCountries;
    }
</script>

<aside class="w-60 p-4 bg-base-200 h-full flex flex-col items-start">
    <!-- Logo -->
    <div class="mb-4">
        <img
            src="/src/lib/assets/openguessr_icon.png"
            alt="OpenGuessr Logo"
            class="w-12 h-12 rounded-full"
        />
    </div>

    <!-- Navigation Links -->
    <nav class="mt-10 flex-grow">
        <ul class="menu w-full space-y-2">
            <li>
                <a class="btn btn-ghost normal-case text-lg bg-white" href="/">Home</a>
            </li>
            <li>
                <a
                    class="btn btn-ghost normal-case text-lg bg-white"
                    href="/starter-guide">Starter Guide</a
                >
            </li>
            <li>
                <a
                    class="btn btn-ghost normal-case text-lg bg-white"
                    href="/map-creation">Map Creation</a
                >
            </li>
            <li class="w-full">
                <button
                    class="btn btn-ghost w-full normal-case text-lg bg-white"
                    on:click={toggleCountries}
                >
                    Learn Countries
                </button>
                {#if showCountries}
                    <ul class="ml-4 space-y-2 mt-2">
                        {#each countries as country}
                            <li>
                                <a
                                    class="btn btn-outline btn-sm"
                                    href={"/learn-countries/" +
                                        country.toLowerCase()}>{country}</a
                                >
                            </li>
                        {/each}
                    </ul>
                {/if}
            </li>
        </ul>
    </nav>

    <!-- Light/Dark Mode Toggle -->
    <DarkModeToggle />
</aside>
