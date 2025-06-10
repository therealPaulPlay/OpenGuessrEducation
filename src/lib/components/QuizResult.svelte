<!-- result screen / end screen for quizzes from the quiz page -->
<script>
	import { onMount } from "svelte";
	import { Star, ArrowLeft } from "lucide-svelte";
	import { scale } from "svelte/transition";
	import { quintOut } from "svelte/easing";
	import { supporterLevel } from "$lib/stores/accountData.js";

	import Toast from "$lib/components/Toast.svelte";

	// Experience
	import { isAuthenticated } from "$lib/stores/accountData.js";
	import { addExperience } from "$lib/utils/addExperience.js";

	let { score = 0, errors = 0, timeString = undefined, startGame, errorWeight = 0.25 } = $props();

	let achievedScore = Math.max(score - errors * errorWeight, 0);
	let earnedExperience = $derived(
		$supporterLevel ? Math.floor(achievedScore * 50 * (1 + supporterBoostFactor)) : Math.floor(achievedScore * 50),
	);
	let showToast = $state(false);

	let supporterBoostFactor = $derived($supporterLevel * 0.05 + 0.05);

	onMount(() => {
		if ($isAuthenticated && achievedScore != 0) {
			addExperience(earnedExperience);
			showToast = true;
		}
	});

	let accuracy = $derived(score + errors ? Math.max(Math.round((1 - (errors * errorWeight) / score) * 100), 0) : 0); // avoid divide by zero error with first check
	let stars = $derived(Math.min(3, Math.floor(accuracy / 33)));
</script>

<div class="fixed inset-0 bg-base-300/75 flex items-center justify-center z-50">
	<div class="bg-base-100 p-8 rounded-xl text-center" in:scale={{ duration: 300, easing: quintOut }}>
		<h3 class="text-3xl font-bold mb-4">Quiz complete!</h3>
		<div class="flex justify-center flex-col items-center rounded-lg bg-base-200 my-4 mb-3 py-4">
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
					<p>
						Earned {earnedExperience.toLocaleString()} XP!
						{#if $supporterLevel != 0}
							(+{supporterBoostFactor * 100}%)
						{/if}
					</p>
				</div>
			{:else}
				<div class="badge badge-ghost mx-auto mb-8">
					<p>Log in to claim XP!</p>
				</div>
			{/if}
			<button class="btn btn-secondary mb-2" onclick={startGame}>Play again</button>
			<a class="btn btn-sm" href="/quiz/"><ArrowLeft class="w-4 h-4" />Return to discover page</a>
		</div>
	</div>
</div>
{#if showToast}
	<Toast message="{earnedExperience} XP earned!" />
{/if}
