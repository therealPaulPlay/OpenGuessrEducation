<script>
    import Globe from "$lib/components/Globe.svelte";
    import { goto } from '$app/navigation';
    import {
        MapPin,
        Info,
        Users,
        Globe as GlobeIcon,
        Book,
        Trophy,
        Compass,
        Flag,
        Award,
        Map,
        Gamepad2,
        ArrowRight,
    } from "lucide-svelte";
    import DollarSign from "$lib/components/DollarSign.svelte";
    import { onMount } from "svelte";

    let welcomeText = "Master your geography skills.";
    let yourName;
    let isHovered = false;



    onMount(() => (yourName = ", " + localStorage.getItem("username") || "."));
</script>

<article class="container mx-auto px-4 py-8">
    <div class="mb-12">
        <Globe />
    </div>

    <h1 class="text-5xl font-bold mb-4 text-center">
        {welcomeText}
    </h1>
    <p class="text-xl text-center mb-8">
        Welcome to OpenGuessr Education{yourName}.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div
            class="card bg-base-200 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div class="card-body">
                <Book class="w-12 h-12 text-secondary mb-4" />
                <h2 class="card-title">Learn GeoGuessing</h2>
                <p>
                    Master the art of location guessing with concise guides, articles and fun quizzes.
                </p>
                <div class="card-actions justify-end">
                    <button class="btn btn-secondary" on:click={() => { goto("/get-started")} }>Get started</button>
                </div>
            </div>
        </div>

        <div
            class="card bg-base-200 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div class="card-body">
                <Gamepad2 class="w-12 h-12 text-secondary mb-4" />
                <h2 class="card-title">Quizzes</h2>
                <p>
                    Challenge yourself in engaging geography quizzes. Why not give it a go now?
                </p>
                <div class="card-actions justify-end">
                    <button class="btn btn-secondary" on:click={() => { goto("/quiz")} }>Take a Quiz</button>
                </div>
            </div>
        </div>

        <div
            class="card bg-base-200 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div class="card-body">
                <Trophy class="w-12 h-12 text-secondary mb-4" />
                <h2 class="card-title">Professional Guides</h2>
                <p>
                    Learn to play and discover tricks from top players to elevate
                    your game.
                </p>
                <div class="card-actions justify-end">
                    <button class="btn btn-secondary" on:click={() => { goto("/guides")} }
                        >Discover Guides</button>
                </div>
            </div>
        </div>
    </div>

    <div class="text-focused-section mb-16 mt-16 flex justify-center flex-col">
        <h2 class="text-4xl font-bold mb-8 text-center">
            The place to learn it all.
        </h2>

        <div class="grid md:grid-cols-2 gap-8 w-5/6 mx-auto">
            <div class="space-y-6">
                <div class="flex items-start">
                    <Compass
                        class="w-8 h-8 text-secondary mr-4 mt-1 flex-shrink-0" />
                    <div>
                        <h3 class="text-xl font-semibold mb-2">
                            Explore the World
                        </h3>
                        <p class="text-base">
                            Dive into our <b>educational (but fun!) content</b> to learn
                            about different <b>locations</b>, <b>continents</b>,
                            <b>capitals</b>, and <b>landmarks</b>.
                        </p>
                    </div>
                </div>

                <div class="flex items-start">
                    <Flag
                        class="w-8 h-8 text-secondary mr-4 mt-1 flex-shrink-0" />
                    <div>
                        <h3 class="text-xl font-semibold mb-2">
                            Learn through Play
                        </h3>
                        <p class="text-base">
                            The platform makes learning <b>fun</b> and
                            <b>exciting</b>
                            through various <b>quizzes</b> and
                            <b>trivia challenges</b>.
                        </p>
                    </div>
                </div>
            </div>

            <div class="space-y-6">
                <div class="flex items-start">
                    <Award
                        class="w-8 h-8 text-secondary mr-4 mt-1 flex-shrink-0" />
                    <div>
                        <h3 class="text-xl font-semibold mb-2">
                            Master GeoGuessing
                        </h3>
                        <p class="text-base">
                            Whether you're a fan of <b>GeoGuessr</b>,
                            <b>OpenGuessr</b>, or <b>Geotastic</b>, you'll find something that suits your needs.
                        </p>
                    </div>
                </div>

                <div class="flex items-start">
                    <Map
                        class="w-8 h-8 text-secondary mr-4 mt-1 flex-shrink-0" />
                    <div>
                        <h3 class="text-xl font-semibold mb-2">
                            Become a Geography Expert
                        </h3>
                        <p class="text-base">
                            Become a staple of the geography <b>community</b>.
                            The discord is full of cool nerds that want to learn more about our planet.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="stats outline outline-1 outline-base-300 w-full mb-12">
        <div class="stat">
            <div class="stat-figure text-secondary">
                <Users size={36} />
            </div>
            <div class="stat-title">Active Players</div>
            <div class="stat-value text-secondary">800,000+</div>
            <div class="stat-desc">Learn from a large community.</div>
        </div>

        <div class="stat">
            <div class="stat-figure text-secondary">
                <MapPin size={36} />
            </div>
            <div class="stat-title">Countries Covered</div>
            <div class="stat-value text-secondary">83</div>
            <div class="stat-desc">Out of 83 countries with Street View.</div>
        </div>

        <div class="stat">
            <div class="stat-figure text-secondary">
                <DollarSign size={36} />
            </div>
            <div class="stat-title">Cost</div>
            <div class="stat-value text-secondary">Free</div>
            <div class="stat-desc">OpenGuessr is committed to being free.</div>
        </div>
    </div>

    <div class="mb-12 text-center">
        <h2 class="text-4xl font-bold mb-2 text-center">
            Ready to become a pro?
        </h2>
        <p class="text-xl mb-6">
            The journey will be legendary.
        </p>
        <button 
            class="btn btn-secondary btn-lg relative overflow-hidden"
            on:mouseenter={() => isHovered = true}
            on:mouseleave={() => isHovered = false}
            on:click={() => {goto("/get-started")} }
        >
            <span class="mr-2">Start geo-maxxing</span>
            <div class="w-10 h-10 relative">
                <img
                    src="src/lib/assets/noob_player.png"
                    alt="Beginner"
                    class="w-full h-full object-contain absolute transition-opacity duration-300 ease-in-out"
                    style="opacity: {isHovered ? 0 : 1}"
                />
                <img
                    src="src/lib/assets/chad_moai.png"
                    alt="Pro"
                    class="w-full h-full object-contain absolute transition-opacity duration-300 ease-in-out"
                    style="opacity: {isHovered ? 1 : 0}"
                />
            </div>
        </button>
    </div>
</article>

<style>
    .text-secondary {
        color: var(--secondary-color);
    }

    .text-focused-section {
        line-height: 1.6;
    }
</style>
