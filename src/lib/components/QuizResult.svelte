<!-- result screen / end screen for quizzes from the quiz page -->
<script>
    import { onMount } from "svelte";
    import { Star, ArrowLeft } from "lucide-svelte";
    import { scale } from "svelte/transition";
    import { quintOut } from "svelte/easing";

    import Toast from "$lib/components/Toast.svelte";

    // Experience
    import { isAuthenticated } from "$lib/stores/accountData.js";
    import { addExperience } from "$lib/utils/addExperience.js";

    export let score = 0;
    export let errors = 0;
    export let timeString = undefined;
    export let startGame;

    let achievedScore = Math.max(score - errors * 0.25, 0);
    let experience = Math.floor(achievedScore * 50);
    let showToast = false;

    onMount(() => {
        if ($isAuthenticated && achievedScore != 0) {
            addExperience(experience);
            showToast = true;
        }
    });

    $: stars = Math.min(3, Math.floor(accuracy / 33));
    $: accuracy =
        score + errors ? Math.round((score / (score + errors)) * 100) : 0; // avoid divide by zero error with first check
</script>

<div
    class="fixed inset-0 bg-base-300 bg-opacity-75 flex items-center justify-center z-50">
    <div
        class="bg-base-100 p-8 rounded-xl text-center"
        in:scale={{ duration: 300, easing: quintOut }}>
        <h3 class="text-3xl font-bold mb-4">Quiz Complete!</h3>
        <div
            class="flex justify-center flex-col items-center rounded-lg bg-base-200 my-4 mb-3 py-4">
            <p class="text-xl mb-2">
                Score: {achievedScore}/{score}
            </p>
            <p class="text-xl mb-2">Accuracy: {accuracy}%</p>
            {#if timeString}
            <p class="text-xl mb-4">Time: {timeString}</p>
            {/if}
            <div class="flex justify-center">
                {#each Array(3) as _, i}
                    {#if i < stars}
                        <div>
                            <Star class="w-8 h-8 text-warning" />
                        </div>
                    {:else}
                        <div>
                            <Star class="w-8 h-8 text-accent" />
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
        <div class="flex flex-col">
            {#if $isAuthenticated}
                <div class="badge badge-success mx-auto mb-8">
                    <p>Earned {experience.toLocaleString()} XP!</p>
                </div>
            {:else}
                <div class="badge badge-ghost mx-auto mb-8">
                    <p>
                        <a
                            href="https://openguessr.com/signup"
                            class="text-secondary">Log in</a> to claim XP!
                    </p>
                </div>
            {/if}
            <button class="btn btn-secondary mb-2" on:click={startGame}
                >Play Again</button>
            <a class="btn btn-sm" href="/quiz/"
                ><ArrowLeft class="w-4 h-4" />Return to discover page</a>
        </div>
    </div>
</div>
{#if showToast}
    <Toast message="{experience} XP earned!" />
{/if}
