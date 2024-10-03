<script>
    import { onMount } from "svelte";
    import { fade, scale } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import {
        Timer,
        ThermometerSnowflake,
        Thermometer,
        ThermometerSun,
    } from "lucide-svelte";
    import QuizMap from "$lib/components/QuizMap.svelte";

    export let region = "World";
    export let zoom = 1;

    let quizMap;
    let features = [];
    let currentQuestion;
    let remainingFeatures = [];
    let gameMode = "click"; // 'click' or 'type'

    let userInput = "";
    let feedback = "";
    let feedbackColor = "";
    let feedbackIcon = null;

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
        console.log(currentQuestion);
        remainingFeatures.splice(index, 1);
        
        userInput = "";
        feedback = "";
        feedbackColor = "";
        feedbackIcon = null;
        highlightedFeature = null;
    }

    function checkAnswer(answer) {
        if (answer.toLowerCase() === currentQuestion.toLowerCase()) {
            score++;
            feedback = "Correct!";
            feedbackColor = "text-success";
            quizMap.highlightFeature(currentQuestion, "oklch(var(--p))");
            nextQuestion();
        } else {
            errors++;
            currentWrongAttempts++;

            if (currentWrongAttempts >= 3) {
                highlightCorrectAnswer();
            }
        }
    }

    function highlightCorrectAnswer() {
        highlightedFeature = currentQuestion;
        setTimeout(() => {
            highlightedFeature = null;
        }, 2000);
    }

    function calculateSimilarity(str1, str2) {
        const len1 = str1.length;
        const len2 = str2.length;
        const matrix = Array(len1 + 1)
            .fill()
            .map(() => Array(len2 + 1).fill(0));

        for (let i = 0; i <= len1; i++) matrix[i][0] = i;
        for (let j = 0; j <= len2; j++) matrix[0][j] = j;

        for (let i = 1; i <= len1; i++) {
            for (let j = 1; j <= len2; j++) {
                const cost =
                    str1[i - 1].toLowerCase() !== str2[j - 1].toLowerCase()
                        ? 1
                        : 0;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + cost,
                );
            }
        }

        return 1 - matrix[len1][len2] / Math.max(len1, len2);
    }

    function handleMapClick(event) {
        if (gameMode === "click") {
            console.log(event.detail.properties.name);
            checkAnswer(event.detail.properties.name);
        }
    }

    function handleInputSubmit() {
        if (gameMode === "type") {
            checkAnswer(userInput);
        }
    }

    function endGame() {
        gameOver = true;
        stopTimer();
    }

    function toggleGameMode() {
        gameMode = gameMode === "click" ? "type" : "click";
    }

    $: accuracy = gameOver ? Math.round((score / (score + errors)) * 100) : 0;
    $: timeString = `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}`;
</script>

<div class="quiz-container bg-base-200 p-6 rounded-xl">
    <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">
            {#if gameOver}
                Quiz Complete!
            {:else}
                Click on <span class="text-secondary">{currentQuestion}</span>
            {/if}
        </h2>
        <div class="flex items-center gap-2">
            <Timer class="w-6 h-6" />
            <span class="text-xl">{timeString}</span>
        </div>
    </div>

    <div class="mb-4">
        <select
            class="select select-bordered w-full max-w-xs"
            on:change={toggleGameMode}>
            <option value="click" selected={gameMode === "click"}
                >Click Mode</option>
            <option value="type" selected={gameMode === "type"}
                >Type Mode</option>
        </select>
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
            {highlightedFeature} />
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

    {#if feedback}
        <div
            class="mt-4 text-center text-xl {feedbackColor}"
            in:scale={{ duration: 300, easing: quintOut }}>
            {#if feedbackIcon}
                <svelte:component
                    this={feedbackIcon}
                    class="inline-block mr-2" />
            {/if}
            {feedback}
        </div>
    {/if}

    {#if gameOver}
        <div
            class="mt-8 text-center"
            in:scale={{ duration: 300, easing: quintOut }}>
            <h3 class="text-3xl font-bold mb-4">Game Over!</h3>
            <p class="text-xl">Score: {score}/{score + errors}</p>
            <p class="text-xl">Accuracy: {accuracy}%</p>
            <p class="text-xl">Time: {timeString}</p>
            <button class="btn btn-primary mt-4" on:click={startGame}
                >Play Again</button>
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
