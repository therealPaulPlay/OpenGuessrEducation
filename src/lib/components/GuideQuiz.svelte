<script>
	import { onMount, onDestroy } from "svelte";
	import { Check } from "lucide-svelte";
	import Toast from "./Toast.svelte";
	import { isAuthenticated } from "$lib/stores/accountData.js";
	import { addExperience } from "$lib/utils/addExperience.js";
	import { playSound } from "$lib/utils/playSound";

	let {
		question = "",
		answerOne = "",
		answerTwo = "",
		answerThree = "",
		answerFour = "",
		correctAnswer = 1,
		children, // For components that work like layouts (with a render slot, in which HTML can be passed) - children needs to be specified as a prop
	} = $props();

	let selectedAnswer = $state(null);
	let isCompleted = $state(false);
	let showToast = $state(false);
	let quizId = "";
	let isLoggedIn = $state(false);
	const unsubscribe = isAuthenticated.subscribe((value) => {
		isLoggedIn = value;
	});

	let answers = $derived([answerOne, answerTwo, answerThree, answerFour]);

	onMount(() => {
		quizId = `${window.location.pathname}_${question.substring(0, 10)}`; // don't change this, would mess up all quiz saves
		isCompleted = localStorage.getItem(quizId) === "completed";
		if (isCompleted) selectedAnswer = correctAnswer - 1;
	});

	onDestroy(() => {
		unsubscribe();
	});

	function getIndexLetter(i) {
		const letters = ["A", "B", "C", "D"];
		return letters[i];
	}

	function handleAnswer(index) {
		if (isCompleted) return;

		selectedAnswer = index;

		if (index === correctAnswer - 1) {
			isCompleted = true;
			localStorage.setItem(quizId, "completed");
			showToast = true;

			// Guide quizzes can only be done when logged in, so no check needed here
			addExperience(500);
			playSound("answer_correct");
		} else {
			playSound("answer_wrong");
		}
	}
</script>

<div class="w-full border border-accent rounded-2xl shadow-sm/5 my-8 relative">
	{#if !isLoggedIn}
		<div class="absolute w-full h-full backdrop-blur-sm z-20 rounded-xl">
			<div class="w-full h-full rounded-xl bg-base-200 opacity-75 absolute p-4"></div>
			<div class="flex w-full h-full justify-center items-center">
				<p class="text-center z-10 mx-4">
					<b>Log in</b> to earn experience through guide quizzes.
				</p>
			</div>
		</div>
	{/if}

	<div class="p-4">
		<div class="flex justify-content items-center mb-4 flex-wrap gap-3">
			<h2 class="text-xl font-bold">{question}</h2>
		</div>

		{@render children?.()}

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			{#each answers as answer, index}
				<button
					class="btn btn-outline text-base-content w-full h-auto py-2 px-12 relative text-wrap
                   {index === correctAnswer - 1 && isCompleted ? 'btn-success opacity-100' : 'btn-accent'}
                   {selectedAnswer == index && index != correctAnswer - 1 ? 'btn-error animate-shake' : ''}
                   {isCompleted && index != correctAnswer - 1 ? 'opacity-50 pointer-events-none' : ''}"
					onclick={() => handleAnswer(index)}
				>
					{answer}
					{#if isCompleted && index === correctAnswer - 1}
						<span class="absolute right-2">
							<Check size={20} />
						</span>
					{/if}
					<span class="absolute left-2 rounded-full items-center flex justify-center text-center w-7 h-7">
						<p class="opacity-50">{getIndexLetter(index)}</p>
					</span>
				</button>
			{/each}
		</div>
	</div>
</div>

{#if showToast}
	<Toast message="500 XP earned!" />
{/if}

<style>
	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-5px);
		}
		75% {
			transform: translateX(5px);
		}
	}

	.animate-shake {
		animation: shake 0.5s;
	}
</style>
