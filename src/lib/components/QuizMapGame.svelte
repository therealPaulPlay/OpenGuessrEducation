<script>
    import { onMount } from "svelte";
    import { fade, scale } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { Timer, Star } from "lucide-svelte";
    import Map from "$lib/components/Map.svelte";

    export let region = "World";

    export let zoom = 1;

    export let minLabelZoom = 1;

    export let topoJsonName;

    let quizMap;
    let features = [];
    let currentQuestion = "loading...";
    let remainingFeatures = [];
    let gameMode = "click"; // 'click', 'type', or 'learn'

    let userInput = "";

    // used as a key to reload and thereby reset the map
    let uniqueMap = {};

    let score = 0;
    let errors = 0;
    let gameOver = false;
    let timer = 0;

    let currentWrongAttempts = 0;

    let timerInterval;
    let highlightedFeature = null;

    let timerRunning = false;

    let inputPlaceholderHint = "Type your answer here...";

    let mapLoaded = false;

    $: validOptions = [currentQuestion].concat(remainingFeatures);

    $: regionNamesAutocomplete =
        validOptions
            .sort()
            .filter((regionName) =>
                regionName
                    .toLowerCase()
                    .startsWith(userInput.toLocaleLowerCase()),
            ) || [];

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

            if (!features) {
                console.log("Features is undefined. This is likely because this region doesn't have an entry in regions.json yet.");
            }
        } catch (error) {
            console.error("Error fetching and processing region json:", error);
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

    function nextQuestion() {
        if (remainingFeatures.length === 0) {
            endGame();
            return;
        }

        currentWrongAttempts = 0;

        inputPlaceholderHint = "Type your answer here..."; // This can become a hint over time

        const index = Math.floor(Math.random() * remainingFeatures.length);
        currentQuestion = remainingFeatures[index];
        remainingFeatures.splice(index, 1);

        highlightedFeature = gameMode == "type" ? currentQuestion : null;
    }

    function checkAnswer(answer) {
        if (answer.toLowerCase() == currentQuestion.toLowerCase()) {
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

            if (currentWrongAttempts >= 3 && gameMode != "type") {
                highlightCorrectAnswer();
            }

            if (gameMode == "type") {
                const correctAnswer = currentQuestion;
                // Create the hint by revealing letters based on wrong attempts
                const revealedLettersCount = Math.min(
                    currentWrongAttempts,
                    correctAnswer.length,
                );

                const revealedHint =
                    correctAnswer.slice(0, revealedLettersCount) +
                    "*".repeat(correctAnswer.length - revealedLettersCount);

                inputPlaceholderHint = `Hint: ${revealedHint}`;
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

    let showTypeAutoComplete = false;

    function handleFocus() {
        showTypeAutoComplete = true;
    }

    function handleBlur() {
        showTypeAutoComplete = false;
    }

    $: accuracy = gameOver ? Math.round((score / (score + errors)) * 100) : 0;
    $: timeString = `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}`;
    $: stars = Math.min(3, Math.floor(accuracy / 33));
</script>

<div class="quiz-container bg-base-200 p-6 rounded-xl">
    <div class="flex justify-between items-center mb-4 gap-3 flex-wrap">
        <h2 class="text-2xl font-bold">
            {#if gameOver}
                Quiz Complete!
            {:else if gameMode === "learn"}
                Click on <span class="text-secondary">{currentQuestion}</span>
            {:else if gameMode === "click"}
                Click on <span class="text-secondary">{currentQuestion}</span>
            {:else if gameMode === "type"}
                Enter the name of the highlighted country
            {/if}
        </h2>
        <div class="flex flex-wrap justify-end gap-3">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-missing-attribute -->
            <!-- svelte-ignore a11y-interactive-supports-focus -->
            <div role="tablist" class="tabs tabs-boxed bg-base-300 custom-tabs">
                <a
                    role="tab"
                    class="tab tab-sm"
                    class:tab-active={gameMode === "click"}
                    on:click={() => changeGameMode("click")}>Click</a>
                <a
                    role="tab"
                    class="tab tab-sm"
                    class:tab-active={gameMode === "type"}
                    on:click={() => changeGameMode("type")}>Type</a>
                <a
                    role="tab"
                    class="tab tab-sm"
                    class:tab-active={gameMode === "learn"}
                    on:click={() => changeGameMode("learn")}>Learn</a>
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
                width={1200}
                height={650}
                on:click={handleMapClick}
                interactive={true}
                {minLabelZoom}
                {highlightedFeature}
                {topoJsonName}
                showLabels={gameMode === "learn"}
                afterLoad={handleMapLoad} />
        {/key}
    </div>

    {#if gameMode === "type"}
        <div class="mt-4 relative">
            <input
                type="text"
                bind:value={userInput}
                on:focus={handleFocus}
                on:blur={handleBlur}
                on:keypress={(e) => e.key === "Enter" && handleInputSubmit()}
                on:keydown={(e) => {
                    if (e.key === "Tab") userInput = regionNamesAutocomplete[0];
                }}
                placeholder={inputPlaceholderHint}
                class="input input-bordered w-full" />
            <button
                class="btn btn-secondary btn-sm mt-2 mb-2 absolute right-2"
                on:click={handleInputSubmit}>Submit</button>
            <div
                class="absolute w-full top-16 bg-accent shadow-lg transition-opacity p-4 flex flex-col gap-2 rounded-lg z-20 max-h-52 overflow-auto outline outline-accent {showTypeAutoComplete
                    ? 'opacity-100'
                    : 'opacity-0'}">
                {#if regionNamesAutocomplete.length > 0}
                    {#each regionNamesAutocomplete as regionName}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div
                            class="rounded-md w-full px-2 bg-base-200 hover:bg-base-100 transition-colors cursor-pointer"
                            on:click={() => {
                                userInput = regionName;
                            }}>
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
    {#if gameOver}
        <div
            class="fixed inset-0 bg-base-300 bg-opacity-75 flex items-center justify-center z-50">
            <div
                class="bg-base-100 p-8 rounded-xl text-center"
                in:scale={{ duration: 300, easing: quintOut }}>
                <h3 class="text-3xl font-bold mb-4">Quiz Complete!</h3>
                <p class="text-xl mb-2">Score: {score - (errors * 0.25)}/{score}</p>
                <p class="text-xl mb-2">Accuracy: {accuracy}%</p>
                <p class="text-xl mb-4">Time: {timeString}</p>
                <div class="flex justify-center mb-4">
                    {#each Array(3) as _, i}
                        {#if i < stars}
                            <div>
                                <Star class="w-8 h-8 text-warning" />
                            </div>
                        {:else}
                            <div>
                                <Star class="w-8 h-8 text-base-300" />
                            </div>
                        {/if}
                    {/each}
                </div>
                <button class="btn btn-secondary" on:click={startGame}
                    >Play Again</button>
            </div>
        </div>
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
        background-color: oklch(var(--s)) !important;
    }
</style>
