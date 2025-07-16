<script>
	import { onMount } from "svelte";
	import BaseOptionsQuiz from "$lib/components/BaseOptionsQuiz.svelte";

	let { region, textDataPath = "/json/country-data/country-tld.json" } = $props();

	let answers = $state(["", "", "", ""]);
	let correctAnswer = $state(1);

	function removePlural(word) {
		return word.endsWith("es") ? word.substring(0, word.length - 2) : word.substring(0, word.length - 1);
	}

	let question = `Which country has this ${removePlural(region)}?`;

	let questionsArray;
	let questionAmount = $state(0);

	let textData = $state();
	let remainingQuestionsArray = [];

	async function fetchQuestionsArray() {
		try {
			if (!questionsArray) {
				questionsArray = await fetch("/json/regions.json");
				questionsArray = await questionsArray.json();
				questionsArray = questionsArray[region];
				return [...questionsArray] || [];
			}
			return [...questionsArray];
		} catch (error) {
			console.error("Error loading region - likely, that region does not exist. Error:", error);
		}
	}

	async function fetchTextData() {
		try {
			if (!textData) {
				textData = await fetch(textDataPath);
				textData = await textData.json();
			}
		} catch (error) {
			console.error("Error loading text data. Error:", error);
		}
	}

	async function startTextGame() {
		remainingQuestionsArray = await fetchQuestionsArray();
		await fetchTextData();

		shuffleArray(remainingQuestionsArray);
		remainingQuestionsArray.splice(1, remainingQuestionsArray.length - 10);
		questionAmount = remainingQuestionsArray.length;
		setQuizContent();
	}

	function shuffleArray(array) {
		for (var i = array.length - 1; i >= 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}

	let randomQuestion = $state();

	function setQuizContent() {
		// Select random question
		const randomQuestionIndex = Math.floor(Math.random() * remainingQuestionsArray.length);
		randomQuestion = remainingQuestionsArray[randomQuestionIndex];
		remainingQuestionsArray.splice(randomQuestionIndex, 1);

		// Randomize the correct answer
		correctAnswer = 1 + Math.floor(Math.random() * 4);

		// Pre-filtering the wrong answers
		let wrongAnswersPool = questionsArray.filter((country) => country !== randomQuestion);

		const newAnswers = ["", "", "", ""];
		newAnswers.forEach((_, index) => {
			const answerIndex = index + 1;
			if (answerIndex == correctAnswer) {
				newAnswers[index] = randomQuestion;
			} else {
				const randomCountryIndex = Math.floor(Math.random() * wrongAnswersPool.length);
				const randomCountry = wrongAnswersPool[randomCountryIndex];
				wrongAnswersPool.splice(randomCountryIndex, 1);
				newAnswers[index] = randomCountry;
			}
		});

		answers = newAnswers; // This triggers reactivity properly
	}

	function handleNextQuestion() {
		setQuizContent();
	}

	onMount(() => {
		startTextGame();
	});
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
	handleStartGame={startTextGame}
>
	<div class="w-full flex justify-center items-center mb-4">
		{#if randomQuestion}
			<h3 class="text-5xl font-bold my-5">{textData[randomQuestion]}</h3>
		{/if}
	</div>
</BaseOptionsQuiz>
