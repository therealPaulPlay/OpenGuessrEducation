<script>
    import { Check, ArrowRight } from "lucide-svelte";
    import QuizResult from "./QuizResult.svelte";
    import { onMount } from "svelte";

    export let question = "Default Question";

    export let answerOne = "Default answer";
    export let answerTwo = "Default answer";
    export let answerThree = "Default answer";
    export let answerFour = "Default answer";

    export let correctAnswer = 1;

    export let isCompleted = false;
    export let questionAmount = 15;

    // Use these functions in parent components
    export let handleNextQuestion = () => {};
    export let handleStartGame = () => {};

    let selectedAnswer = -1;
    let currentQuestionIndex = 1;

    let autoNext = true; // Automatically skip to next question after answering last one

    $: answers = [answerOne, answerTwo, answerThree, answerFour];

    function getIndexLetter(i) {
        const letters = ["A", "B", "C", "D"];
        return letters[i];
    }

    let errors = 0;
    let gameOver = false;

    function handleAnswer(index) {
        if (isCompleted) return;

        isCompleted = true;

        selectedAnswer = index;

        if (index === correctAnswer - 1) {
        } else {
            errors++;
        }

        if (autoNext) {
            setTimeout(() => {
                clearAnswersAndNextQuestion();
            }, 1000);
        }
    }

    function manuallyGoToNextQuestion() {
        if (isCompleted) {
            clearAnswersAndNextQuestion();
        }
    }

    function enableAutoNextQuestion() {
        localStorage.setItem("autoNext", autoNext ? "" : "disabled");

        if (autoNext && isCompleted) {
            clearAnswersAndNextQuestion();
        }
    }

    onMount(() => {
        autoNext = localStorage.getItem("autoNext") ? false : true;
    });

    function clearAnswersAndNextQuestion() {
        isCompleted = false;

        if (currentQuestionIndex == questionAmount) {
            gameOver = true;
            return;
        }

        currentQuestionIndex++;

        selectedAnswer = -1;
        handleNextQuestion();
    }

    function startGame() {
        selectedAnswer = -1;
        currentQuestionIndex = 1;
        errors = 0;
        gameOver = false;
        isCompleted = false;

        handleStartGame();
    }
</script>

<div class="w-full bg-base-200 rounded-xl shadow-md my-8 relative">
    <div class="p-4">
        <div class="flex w-full items-center mb-4 flex-wrap gap-3">
            <h2 class="text-xl font-bold ml-1">{question}</h2>
            <span class="rounded-md bg-base-300 px-2 mt-0.5"
                >{currentQuestionIndex}/{questionAmount}</span>
            <div class="flex justify-end ml-auto items-center gap-4">
                <div class="lg:tooltip" data-tip="Disable to manually go to the next question">
                    <label class="label cursor-pointer">
                        <span class="label-text mr-2">Auto</span>
                        <input
                            type="checkbox"
                            bind:checked={autoNext}
                            on:change={enableAutoNextQuestion}
                            class="checkbox checkbox-sm checkbox-accent" />
                    </label>
                </div>
                <button
                    class="btn btn-accent btn-sm {autoNext
                        ? 'opacity-50 pointer-events-none'
                        : ""} {isCompleted ? "" : "opacity-50"}" on:click={manuallyGoToNextQuestion}>
                    Next <ArrowRight />
                </button>
            </div>
        </div>

        <slot />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each answers as answer, index}
                <button
                    class="btn w-full h-auto py-2 px-12 relative text-wrap
                     {index === correctAnswer - 1 &&
                    selectedAnswer === correctAnswer - 1
                        ? 'btn-success opacity-100'
                        : 'btn-accent'}
                     {selectedAnswer == index && index != correctAnswer - 1
                        ? 'btn-error animate-shake'
                        : ''}
                     {isCompleted && index != correctAnswer - 1
                        ? 'opacity-50 pointer-events-none'
                        : ''}"
                    on:click={() => handleAnswer(index)}>
                    {answer}
                    {#if index === correctAnswer - 1 && selectedAnswer != -1}
                        <span class="absolute right-2">
                            <Check size={20} />
                        </span>
                    {/if}
                    <span
                        class="absolute left-2 rounded-full items-center flex justify-center bg-base-200 text-center align-middle w-7 h-7">
                        <p class="opacity-50 text-base-300 invert">
                            {getIndexLetter(index)}
                        </p>
                    </span>
                </button>
            {/each}
        </div>
    </div>
</div>

{#if gameOver}
    <!-- errors x4 because we want errors to count as 1 here, not 0.25 like it is for maps -->
    <QuizResult score={questionAmount} {errors} errorWeight="1" {startGame} />
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
