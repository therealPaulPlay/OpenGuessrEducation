<script>
	import { onMount } from "svelte";
	import BaseOptionsQuiz from "$lib/components/BaseOptionsQuiz.svelte";
	import * as Icon from "svelte-flag-icons";

	let { region } = $props();

	let answers = $state(["", "", "", ""]);
	let correctAnswer = $state(1);
	let question = "Which country has this flag?";
	let questionsArray;
	let questionAmount = $state(0);
	let countryCodes;
	let remainingQuestionsArray = [];

	async function fetchQuestionsArray() {
		try {
			if (!questionsArray) {
				questionsArray = await fetch("/json/regions.json");
				questionsArray = await questionsArray.json();
				questionsArray = questionsArray[region];
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
		questionAmount = remainingQuestionsArray.length;
		setQuizContent();
	}

	let IconComponent = $state();

	function setQuizContent() {
		const randomQuestionIndex = Math.floor(Math.random() * remainingQuestionsArray.length);
		const randomQuestion = remainingQuestionsArray[randomQuestionIndex];
		remainingQuestionsArray.splice(randomQuestionIndex, 1); // remove the question

		try {
			IconComponent = Icon[countryCodes[randomQuestion]];
		} catch (error) {
			console.warn("Flag doesn't seem to exist:", error);
			IconComponent = undefined;
		}

		correctAnswer = 1 + Math.floor(Math.random() * 4);

		// Pre-filtering the wrong answers, excluding only the correct answer from the full questions array
		let wrongAnswersPool = questionsArray.filter((country) => country !== randomQuestion);
		const newAnswers = ["", "", "", ""];

		newAnswers.forEach((_, index) => {
			const answerIndex = index + 1;
			if (answerIndex == correctAnswer) {
				newAnswers[index] = randomQuestion;
			} else {
				const randomCountryIndex = Math.floor(Math.random() * wrongAnswersPool.length);
				const randomCountry = wrongAnswersPool[randomCountryIndex];
				// Splice --> removes entry from actual array, Slice --> removes entry only from new copy of array
				wrongAnswersPool.splice(randomCountryIndex, 1); // Remove that one to avoid duplicates in the 3 wrong options
				newAnswers[index] = randomCountry;
			}
		});

		answers = newAnswers;
	}

	function handleNextQuestion() {
		setQuizContent();
	}

	onMount(() => {
		startFlagGame();
		adjustDynamicSize();
		window.addEventListener("resize", adjustDynamicSize);
	});

	function adjustDynamicSize() {
		if (window.innerWidth < 600) {
			dynamicSize = 150;
		} else {
			dynamicSize = 300;
		}
	}

	let dynamicSize = $state(300);
</script>

<BaseOptionsQuiz
	answerOne={answers[0]}
	answerTwo={answers[1]}
	answerThree={answers[2]}
	answerFour={answers[3]}
	{questionAmount}
	{question}
	{correctAnswer}
	{handleNextQuestion}
	handleStartGame={startFlagGame}
>
	<div class="w-full flex justify-center items-center mb-2">
		{#if IconComponent}
			<IconComponent size={dynamicSize} class="drop-shadow-sm" />
		{/if}
	</div>
</BaseOptionsQuiz>
