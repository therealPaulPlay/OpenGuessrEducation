<script>
	import { onMount } from "svelte";
	import { Check, Timer } from "lucide-svelte";
	import Map from "$lib/components/Map.svelte";
	import QuizResult from "./QuizResult.svelte";
	import { playSound } from "$lib/utils/playSound";

	import * as Icon from "svelte-flag-icons";

	let { region = "World", zoom = 1, minLabelZoom = 1, topoJsonName = undefined } = $props();

	let screenWidth = $state(1200);
	let screenHeight = $state(650);

	let quizMap = $state();
	let features = [];
	let currentQuestion = $state("loading...");
	let remainingFeatures = $state([]);
	let gameMode = $state("click"); // 'click', 'type', or 'learn'

	let userInput = $state("");

	// used as a key to reload and thereby reset the map
	let uniqueMap = $state({});

	let score = $state(0);
	let errors = $state(0);
	let gameOver = $state(false);
	let timer = $state(0);

	let countryCodes;
	let IconComponent = $state();

	let currentWrongAttempts = 0;

	let timerInterval;
	let highlightedFeature = $state(null);

	let timerRunning = false;

	let inputPlaceholderHint = $state("Type your answer...");

	let mapLoaded = false;

	let validOptions = $derived([currentQuestion].concat(remainingFeatures));

	let regionNamesAutocomplete = $derived(
		validOptions.sort().filter((regionName) =>
			regionName
				.normalize("NFD") // Decompose letters with diacritics
				.replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
				.toLowerCase()
				.startsWith(
					userInput
						.normalize("NFD")
						.replace(/[\u0300-\u036f]/g, "")
						.toLowerCase(),
				),
		) || [],
	);

	onMount(async () => {
		await loadFeatures();
		remainingFeatures = [...features];
		startGame();

		screenHeight = Math.min(window.innerHeight * 0.6, 1200);
		screenWidth = Math.min(window.innerWidth * 0.6, 1200);
		window.addEventListener("resize", () => {
			screenHeight = Math.min(window.innerHeight * 0.6, 1200);
			screenWidth = Math.min(window.innerWidth * 0.6, 1200);
		});
	});

	async function loadFeatures() {
		let regions;

		try {
			regions = await fetch("/json/regions.json");
			regions = await regions.json();

			// Current region or entire World
			if (region !== "World") {
				features = regions[region];
			} else {
				features = [
					...new Set(
						(regions?.World || []).concat(
							regions?.Europe || [],
							regions?.Asia || [],
							regions?.Africa || [],
							regions?.["South America"] || [],
							regions?.["North America"] || [],
							regions?.Oceania || [],
						),
					),
				];
			}

			if (!features) {
				console.log(
					"Features is undefined. This is likely because this region doesn't have an entry in regions.json yet.",
				);
			}
		} catch (error) {
			console.error("Error fetching and processing region json:", error);
		}

		try {
			countryCodes = await fetch("/json/countryCodes.json");
			countryCodes = await countryCodes.json();
		} catch (error) {
			console.error("Error fetching and processing country code json:", error);
		}
	}

	let firstStart = true; // Don't reset the map if it's the first start

	function startGame() {
		if (!firstStart) resetMap();
		firstStart = false;
		currentQuestion = "loading...";
		gameOver = false;
		score = 0;
		errors = 0;
		timer = 0;
		remainingFeatures = [...features];

		if (mapLoaded) {
			nextQuestion();
		}

		if (!timerRunning) {
			startTimer();
		}
	}

	function resetMap() {
		uniqueMap = {};
		mapLoaded = false;
	}

	function handleMapLoad() {
		mapLoaded = true;
		nextQuestion();
	}

	function startTimer() {
		timerRunning = true;

		timerInterval = setInterval(() => {
			timer++;
		}, 1000);
	}

	function stopTimer() {
		clearInterval(timerInterval);
		timerRunning = false;
	}

	async function nextQuestion() {
		if (remainingFeatures.length === 0) {
			endGame();
			return;
		}

		currentWrongAttempts = 0;

		inputPlaceholderHint = "Your answer..."; // This can become a hint over time

		const index = Math.floor(Math.random() * remainingFeatures.length);
		currentQuestion = remainingFeatures[index];
		remainingFeatures.splice(index, 1);

		highlightedFeature = gameMode == "type" ? currentQuestion : null;

		// Load flag if available
		try {
			IconComponent = Icon[countryCodes[currentQuestion]];
		} catch (error) {
			console.warn("Flag doesn't seem to exist:", error);
			IconComponent = undefined;
		}
	}

	function checkAnswer(answer) {
		if (answer.toLowerCase() == currentQuestion.toLowerCase()) {
			// Correct Answer
			playSound("answer_correct");

			score++;

			quizMap.disableFeatureInteractions(currentQuestion);
			quizMap.highlightFeatureOutline(currentQuestion);

			// Highlight region green if hint was not used, highlight yellow if hint was used
			if (currentWrongAttempts >= 3) {
				quizMap.highlightFeature(currentQuestion, "var(--color-warning)");
			} else {
				quizMap.highlightFeature(currentQuestion, "var(--color-success)");
			}

			nextQuestion();
		} else {
			// Wrong Answer
			playSound("answer_wrong");

			errors++;
			currentWrongAttempts++;

			quizMap.highlightFeature(answer, "var(--color-primary)");

			if (gameMode != "learn") quizMap.brieflyShowName(answer);

			setTimeout(() => {
				quizMap.highlightFeature(answer, "var(--color-secondary)");
			}, 500);

			if (currentWrongAttempts >= 3 && gameMode != "type") {
				highlightCorrectAnswer();
			}

			if (gameMode == "type") {
				const correctAnswer = currentQuestion;
				// Create the hint by revealing letters based on wrong attempts
				const revealedLettersCount = Math.min(currentWrongAttempts, correctAnswer.length);

				const revealedHint =
					correctAnswer.slice(0, revealedLettersCount) + "*".repeat(correctAnswer.length - revealedLettersCount);

				inputPlaceholderHint = `Hint: ${revealedHint}`;
			}
		}
	}

	function highlightCorrectAnswer() {
		quizMap.flashFeature(currentQuestion);
	}

	function handleMapClick(event) {
		if (gameMode === "click" || gameMode === "learn") {
			checkAnswer(event.detail.properties.name);
		}
	}

	function handleInputSubmit() {
		if (gameMode === "type") {
			checkAnswer(regionNamesAutocomplete[0] || "");
			userInput = "";
		}
	}

	function endGame() {
		gameOver = true;
		stopTimer();
	}

	function changeGameMode(mode) {
		gameMode = mode;
		startGame();
	}

	let showTypeAutoComplete = $state(false);

	function handleFocus() {
		showTypeAutoComplete = true;
	}

	function handleBlur() {
		showTypeAutoComplete = false;
	}

	let timeString = $derived(`${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}`);
</script>

<div class="quiz-container bg-base-200 p-4 rounded-3xl">
	<div class="flex justify-between items-center mb-4 gap-3 flex-wrap">
		<h2 class="text-2xl font-bold">
			{#if gameOver}
				Quiz completed.
			{:else if gameMode === "learn"}
				Click on <span class="text-secondary">{currentQuestion}</span>.
			{:else if gameMode === "click"}
				Click on <span class="text-secondary">{currentQuestion}</span>.
			{:else if gameMode === "type"}
				Which region is highlighted?
			{/if}
		</h2>
		<div class="flex flex-wrap justify-end gap-3">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_missing_attribute -->
			<!-- svelte-ignore a11y_interactive_supports_focus -->
			<div role="tablist" class="tabs tabs-box bg-base-300 custom-tabs">
				<a role="tab" class="tab tab-sm" class:tab-active={gameMode === "click"} onclick={() => changeGameMode("click")}
					>Click</a
				>
				<a role="tab" class="tab tab-sm" class:tab-active={gameMode === "type"} onclick={() => changeGameMode("type")}
					>Type</a
				>
				<a role="tab" class="tab tab-sm" class:tab-active={gameMode === "learn"} onclick={() => changeGameMode("learn")}
					>Learn</a
				>
			</div>
			<div class="flex items-center gap-2 bg-base-300 rounded-lg p-1">
				<Timer class="w-5 h-5" />
				<span class="text-base min-w-10 text-center">{timeString}</span>
			</div>
		</div>
	</div>

	<div class="map-wrapper">
		{#key uniqueMap}
			<Map
				bind:this={quizMap}
				{region}
				{zoom}
				width={screenWidth}
				height={screenHeight}
				on:click={handleMapClick}
				interactive={true}
				{minLabelZoom}
				{highlightedFeature}
				{topoJsonName}
				dynamicHeight="true"
				showPoints="true"
				showLabels={gameMode === "learn"}
				afterLoad={handleMapLoad}
			>
				{#if IconComponent}
					<div class="absolute z-20 top-3 right-3 rounded-md bg-base-200 py-0 p-1.5">
						<IconComponent size="50" />
					</div>
				{/if}
			</Map>
		{/key}
	</div>

	{#if gameMode === "type"}
		<div class="mt-4 relative">
			<input
				type="text"
				bind:value={userInput}
				onfocus={handleFocus}
				onblur={handleBlur}
				onkeypress={(e) => e.key === "Enter" && handleInputSubmit()}
				onkeydown={(e) => {
					if (e.key === "Tab") userInput = regionNamesAutocomplete[0];
				}}
				placeholder={inputPlaceholderHint}
				class="input input-bordered w-full"
			/>
			<button class="btn btn-secondary btn-sm mt-1 mb-1 absolute right-1" onclick={handleInputSubmit}><Check /></button>
			<div
				class="absolute w-full top-16 bg-accent shadow-lg transition-opacity p-4 flex flex-col gap-2 rounded-2xl z-20 max-h-52 overflow-auto outline outline-accent {showTypeAutoComplete
					? 'opacity-100'
					: 'opacity-0'}"
			>
				{#if regionNamesAutocomplete.length > 0}
					{#each regionNamesAutocomplete as regionName}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="rounded-md w-full px-2 bg-base-200 hover:bg-base-100 transition-colors cursor-pointer"
							onclick={() => {
								userInput = regionName;
							}}
						>
							<p>{regionName}</p>
						</div>
					{/each}
				{:else}
					<p class="text-center">No matching entries.</p>
				{/if}
			</div>
		</div>
	{/if}
	<!-- result screen -->
	<!-- replace gameOver with true for testing -->
	{#if gameOver}
		<QuizResult {score} {errors} {timeString} {startGame} />
	{/if}
</div>

<style>
	.quiz-container {
		position: relative;
		width: 100%;
	}

	.map-wrapper {
		width: 100%;
	}

	.custom-tabs {
		padding: 0.25rem;
	}

	.custom-tabs .tab {
		height: 2rem;
		font-size: 0.875rem;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		border-radius: 0.4rem;
	}

	.custom-tabs .tab-active {
		background-color: var(--color-secondary) !important;
	}
</style>
