<script>
    import { onMount } from "svelte";
    import { fade, scale } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { Timer, Star } from "lucide-svelte";
    import QuizMap from "$lib/components/QuizMap.svelte";

    export let region = "World";
    export let zoom = 1;

    let quizMap;
    let features = [];
    let currentQuestion;
    let remainingFeatures = [];
    let gameMode = "click"; // 'click', 'type', or 'learn'

    let userInput = "";

    let score = 0;
    let errors = 0;
    let gameOver = false;
    let timer = 0;

    let currentWrongAttempts = 0;

    let timerInterval;
    let highlightedFeature = null;

    let timerRunning = false;

    onMount(async () => {
        await loadFeatures();
        remainingFeatures = [...features];
        startGame();
    });

    async function loadFeatures() {
        let regions;

        try {
            regions = await fetch("/src/lib/json/regions.json");
            regions = await regions.json();

            features = regions[region];
        } catch (error) {
            console.error("Error fetching and processing region json:", error);
        }
    }

    function startGame() {
        gameOver = false;
        score = 0;
        errors = 0;
        timer = 0;
        remainingFeatures = [...features];
        nextQuestion();

        if (!timerRunning) {
            startTimer();
        }
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

    function nextQuestion() {
        if (remainingFeatures.length === 0) {
            endGame();
            return;
        }

        currentWrongAttempts = 0;

        const index = Math.floor(Math.random() * remainingFeatures.length);
        currentQuestion = remainingFeatures[index];
        remainingFeatures.splice(index, 1);

        highlightedFeature = gameMode === "type" ? currentQuestion : null;
    }

    function checkAnswer(answer) {
        if (answer.toLowerCase() === currentQuestion.toLowerCase()) {
            score++;

            quizMap.disableFeatureInteractions(currentQuestion);

            // Highlight region green if hint was not used, highlight yellow if hint was used
            if (currentWrongAttempts >= 3) {
                quizMap.highlightFeature(currentQuestion, "oklch(var(--wa))");
            } else {
                quizMap.highlightFeature(currentQuestion, "oklch(var(--su))");
            }

            nextQuestion();
        } else {
            errors++;
            currentWrongAttempts++;
            quizMap.highlightFeature(answer, "oklch(var(--p))");
            if (gameMode != "learn") quizMap.brieflyShowName(answer);
            setTimeout(() => {
                quizMap.highlightFeature(answer, "oklch(var(--s))");
            }, 500);

            if (currentWrongAttempts >= 3) {
                highlightCorrectAnswer();
            }
        }
    }

    function highlightCorrectAnswer() {
        quizMap.flashFeature(currentQuestion);
    }

    function handleMapClick(event) {
        if (gameMode === "click" || gameMode === "learn") {
            console.log(event.detail.properties.name);
            checkAnswer(event.detail.properties.name);
        }
    }

    function handleInputSubmit() {
        if (gameMode === "type") {
            checkAnswer(userInput);
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

    $: accuracy = gameOver ? Math.round((score / (score + errors)) * 100) : 0;
    $: timeString = `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}`;
    $: stars = Math.min(3, Math.floor(accuracy / 33));
</script>

<div class="quiz-container bg-base-200 p-6 rounded-xl">
    <div class="flex justify-between items-center mb-4 flex-wrap">
        <h2 class="text-2xl font-bold">
            <h2 class="text-2xl font-bold">
                {#if gameOver}
                    Quiz Complete!
                {:else if gameMode === "learn"}
                    Click on <span class="text-secondary"
                        >{currentQuestion}</span>
                {:else if gameMode === "click"}
                    Click on <span class="text-secondary"
                        >{currentQuestion}</span>
                {:else if gameMode === "type"}
                    Enter the name of the highlighted country
                {/if}
            </h2>
        </h2>
        <div class="flex justify-end gap-5">
            <select
                class="menu menu-vertical lg:menu-horizontal bg-base-300 rounded-lg outline-none"
                on:change={(e) => changeGameMode(e.target.value)}>
                <option value="click" selected={gameMode === "click"}
                    >Click Mode</option>
                <option value="type" selected={gameMode === "type"}
                    >Type Mode</option>
                <option value="learn" selected={gameMode === "learn"}
                    >Learn Mode</option>
            </select>
            <div class="flex items-center gap-2">
                <Timer class="w-6 h-6" />
                <span class="text-xl min-w-10 text-center">{timeString}</span>
            </div>
        </div>
    </div>

    <div class="map-wrapper">
        <QuizMap
            bind:this={quizMap}
            {region}
            {zoom}
            width={1000}
            height={750}
            on:click={handleMapClick}
            interactive={true}
            {highlightedFeature}
            showLabels={gameMode === "learn"} />
    </div>

    {#if gameMode === "type"}
        <div class="mt-4">
            <input
                type="text"
                bind:value={userInput}
                on:keypress={(e) => e.key === "Enter" && handleInputSubmit()}
                placeholder="Type your answer here"
                class="input input-bordered w-full" />
            <button class="btn btn-primary mt-2" on:click={handleInputSubmit}
                >Submit</button>
        </div>
    {/if}

    {#if gameOver}
        <div
            class="fixed inset-0 bg-base-300 bg-opacity-75 flex items-center justify-center z-50">
            <div
                class="bg-base-100 p-8 rounded-xl text-center"
                in:scale={{ duration: 300, easing: quintOut }}>
                <h3 class="text-3xl font-bold mb-4">Quiz Complete!</h3>
                <p class="text-xl mb-2">Score: {score}/{score + errors}</p>
                <p class="text-xl mb-2">Accuracy: {accuracy}%</p>
                <p class="text-xl mb-4">Time: {timeString}</p>
                <div class="flex justify-center mb-4">
                    {#each Array(3) as _, i}
                        <div
                            in:scale={{
                                duration: 300,
                                delay: i * 300,
                                easing: quintOut,
                            }}>
                            <Star
                                class="w-8 h-8 {i < stars
                                    ? 'text-warning'
                                    : 'text-base-300'}" />
                        </div>
                    {/each}
                </div>
                <button class="btn btn-primary" on:click={startGame}
                    >Play Again</button>
            </div>
        </div>
    {/if}
</div>

<style>
    .quiz-container {
        position: relative;
        overflow: hidden;
        width: 100%;
    }
    .map-wrapper {
        width: 100%;
    }
</style>
