<script>
    import Globe from "$lib/components/Globe.svelte";
    import { Users, MapPin, Info } from "lucide-svelte";

    let progress = 75;
</script>

<div class="container mx-auto px-4 py-8">
    <div class="mb-12">
        <Globe />
    </div>

    <h1 class="text-5xl font-bold mb-4 text-center">
        Welcome to OpenGuessr Education
    </h1>
    <p class="text-xl text-center mb-8">
        Explore geography and have fun learning!
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Learn GeoGuessr Skills</h2>
                <p>
                    Master the art of location guessing with our comprehensive
                    guides and tutorials.
                </p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Start Learning</button>
                </div>
            </div>
        </div>

        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Interactive Quizzes</h2>
                <p>
                    Test your knowledge with our engaging quizzes and track your
                    progress.
                </p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Take a Quiz</button>
                </div>
            </div>
        </div>

        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Pro Player Strategies</h2>
                <p>
                    Learn advanced techniques from top players like Rainbolt to
                    elevate your game.
                </p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Discover Strategies</button>
                </div>
            </div>
        </div>
    </div>

    <div class="stats shadow w-full mb-12">
        <div class="stat">
            <div class="stat-figure text-primary">
                <Users size={36} />
            </div>
            <div class="stat-title">Active Learners</div>
            <div class="stat-value text-primary">25.6K</div>
            <div class="stat-desc">21% more than last month</div>
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

    <div class="card bg-base-100 shadow-xl mb-12">
        <div class="card-body">
            <h2 class="card-title">Your Learning Progress</h2>
            <progress
                class="progress progress-primary w-full"
                value={progress}
                max="100"></progress>
            <p>
                You've completed {progress}% of the beginner course. Keep it up!
            </p>
        </div>
    </div>

    <div class="alert alert-info shadow-lg">
        <div>
            <Info />
            <span
                >New course on European landmarks coming next week! Stay tuned!</span>
        </div>
    </div>
</div>
