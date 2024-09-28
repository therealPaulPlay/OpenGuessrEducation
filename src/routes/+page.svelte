<script>
    import Globe from "$lib/components/Globe.svelte";
    import { Users, MapPin, Info } from "lucide-svelte";
    import { onMount } from "svelte";

    let progress = 75;

    let welcomeText = "Master your geography skills."

    let yourName;

    onMount(() => yourName = localStorage.getItem("username") || "you");
</script>

<div class="container mx-auto px-4 py-8">
    <div class="mb-12">
        <Globe />
    </div>

    <h1 class="text-5xl font-bold mb-4 text-center">
        {welcomeText}
    </h1>
    <p class="text-xl text-center mb-8">
        A new Geography Champion was born. It's {yourName}.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Learn GeoGuessing</h2>
                <p>
                    Master the art of location guessing with interactive, straightforward guides.
                </p>
                <div class="card-actions justify-end">
                    <button class="btn btn-accent">Start Learning</button>
                </div>
            </div>
        </div>

        <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Quizzes</h2>
                <p>
                    Challenge yourself in engaging geography quizzes. Try it out!
                </p>
                <div class="card-actions justify-end">
                    <button class="btn btn-accent">Take a Quiz</button>
                </div>
            </div>
        </div>

        <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Pro-Player Strategies</h2>
                <p>
                    Learn strats from top players like Rainbolt to
                    elevate your game.
                </p>
                <div class="card-actions justify-end">
                    <button class="btn btn-accent">Discover Strategies</button>
                </div>
            </div>
        </div>
    </div>

    <div class="stats shadow w-full mb-12 bg-base-200">
        <div class="stat">
            <div class="stat-figure text-primary">
                <Users size={36} />
            </div>
            <div class="stat-title">Active Players</div>
            <div class="stat-value text-primary">800.000+</div>
            <div class="stat-desc">Learn from real Gigachads.</div>
        </div>

        <div class="stat">
            <div class="stat-figure text-secondary">
                <MapPin size={36} />
            </div>
            <div class="stat-title">Countries Covered</div>
            <div class="stat-value text-secondary">196</div>
            <div class="stat-desc">Out of 196 recognized countries</div>
        </div>

        <div class="stat">
            <div class="stat-figure text-secondary">
                <div class="avatar">
                    <div class="w-16 rounded-full">
                        <img src="/api/placeholder/64/64" alt="User Avatar" />
                    </div>
                </div>
            </div>
            <div class="stat-value">86%</div>
            <div class="stat-title">Tasks completed</div>
            <div class="stat-desc text-secondary">31 tasks remaining</div>
        </div>
    </div>
</div>
