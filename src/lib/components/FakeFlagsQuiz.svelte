<script>
	import { onMount } from "svelte";
	import BaseOptionsQuiz from "$lib/components/BaseOptionsQuiz.svelte";
	import * as Icon from "svelte-flag-icons";

	let correctAnswer = $state(1);

	let question = $state("Loading...");

	let questionsArray;
	let questionAmount = $state(0);

	let countryCodes;

	let remainingQuestionsArray = [];

	async function fetchQuestionsArray() {
		try {
			if (!questionsArray) {
				questionsArray = await fetch("/json/regions.json");
				questionsArray = await questionsArray.json();
				questionsArray = questionsArray["Asia"].concat(
					questionsArray["Africa"],
					questionsArray["Oceania"],
					questionsArray["Europe"],
					questionsArray["South America"],
					questionsArray["North America"],
				);
				return [...questionsArray];
			}
			return [...questionsArray];
		} catch (error) {
			console.error("Error loading region - likely, that region does not exist. Error:", error);
		}
	}

	async function fetchCountryCodes() {
		try {
			if (!countryCodes) {
				const codes = await fetch("/json/countryCodes.json");
				const jsonCodes = await codes.json();
				return jsonCodes;
			}

			return countryCodes;
		} catch (error) {
			console.error("Error fetching and processing country code json:", error);
		}
	}

	async function startFlagGame() {
		remainingQuestionsArray = await fetchQuestionsArray();
		countryCodes = await fetchCountryCodes();
		shuffleArray(remainingQuestionsArray);
		remainingQuestionsArray.splice(1, remainingQuestionsArray.length - 20);

		questionAmount = remainingQuestionsArray.length;

		setQuizContent();
	}

	let flag1Icon = $state("");
	let flag2Icon = $state("");
	let flag3Icon = $state("");
	let flag4Icon = $state("");

	function setQuizContent() {
		const randomQuestionIndex = Math.floor(Math.random() * remainingQuestionsArray.length);

		const randomQuestion = remainingQuestionsArray[randomQuestionIndex];
		remainingQuestionsArray.splice(randomQuestionIndex, 1); // remove the question

		question = `Which flag belongs to ${randomQuestion}?`;

		correctAnswer = 1 + Math.floor(Math.random() * 4);

		try {
			switch (correctAnswer) {
				case 1:
					flag1Icon = Icon[countryCodes[randomQuestion]];
					break;
				case 2:
					flag2Icon = Icon[countryCodes[randomQuestion]];
					break;
				case 3:
					flag3Icon = Icon[countryCodes[randomQuestion]];
					break;
				case 4:
					flag4Icon = Icon[countryCodes[randomQuestion]];
					break;
			}
		} catch (error) {
			console.warn("Flag doesn't seem to exist:", error);
			IconComponent = undefined;
		}

		let incorrectCountries = [...questionsArray];
		incorrectCountries.splice(incorrectCountries.indexOf(randomQuestion), 1);
		shuffleArray(incorrectCountries);

		for (let i = 1; i < 5; i++) {
			if (i != correctAnswer) {
				switch (i) {
					case 1:
						flag1Icon = Icon[countryCodes[incorrectCountries[i]]];
						break;
					case 2:
						flag2Icon = Icon[countryCodes[incorrectCountries[i]]];
						break;
					case 3:
						flag3Icon = Icon[countryCodes[incorrectCountries[i]]];
						break;
					case 4:
						flag4Icon = Icon[countryCodes[incorrectCountries[i]]];
						break;
				}
			}
		}
	}

	function handleNextQuestion() {
		setQuizContent();
	}

	onMount(() => {
		startFlagGame();
		if (window) {
			adjustDynamicSize();
			window.addEventListener("resize", adjustDynamicSize);
		}
	});

	function adjustDynamicSize() {
		if (window) {
			if (window.innerWidth < 800) {
				dynamicSize = 100;
			} else {
				dynamicSize = 250;
			}
		}
	}

	function shuffleArray(array) {
		for (var i = array.length - 1; i >= 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}

	let dynamicSize = $state(300);
</script>

<BaseOptionsQuiz
	answerOne="1"
	answerTwo="2"
	answerThree="3"
	answerFour="4"
	{questionAmount}
	{question}
	{correctAnswer}
	{handleNextQuestion}
	handleStartGame={startFlagGame}
>
	<div class="w-full flex justify-center items-center flex-col mb-2">
		{#if flag1Icon}
			{@const SvelteComponent = flag1Icon}
			{@const SvelteComponent_1 = flag2Icon}
			<div class="flex gap-5 relative">
				<div class="flex relative">
					<p class="absolute -left-5 top-7">1.</p>
					<SvelteComponent size={dynamicSize} />
				</div>
				<div class="flex relative">
					<p class="absolute -right-7 top-7">2.</p>
					<SvelteComponent_1 size={dynamicSize} />
				</div>
			</div>
			{@const SvelteComponent_2 = flag3Icon}
			{@const SvelteComponent_3 = flag4Icon}
			<div class="flex mt-8 gap-5 relative">
				<div class="margin-adjust relative">
					<p class="absolute -left-5 top-7">3.</p>
					<SvelteComponent_2 size={dynamicSize} />
				</div>
				<div class="margin-adjust relative">
					<p class="absolute -right-7 top-7">4.</p>
					<SvelteComponent_3 size={dynamicSize} />
				</div>
			</div>
		{/if}
	</div>
</BaseOptionsQuiz>

<style>
	.margin-adjust {
		margin-top: -80px;
	}

	@media (max-width: 800px) {
		.margin-adjust {
			margin-top: -40px;
		}
	}
</style>
