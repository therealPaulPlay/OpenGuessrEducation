<script>
    import { Check } from "lucide-svelte";
    import QuizResult from "./QuizResult.svelte";

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

        setTimeout(() => {
            clearAnswersAndNextQuestion();
        }, 1000);
    }

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
        <div class="flex justify-content items-center mb-4 flex-wrap gap-3">
            <h2 class="text-xl font-bold">{question}</h2>
            <span class="rounded-md bg-base-300 px-2 mt-0.5"
                >{currentQuestionIndex}/{questionAmount}</span>
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
                        <p class="opacity-50">{getIndexLetter(index)}</p>
                    </span>
                </button>
            {/each}
        </div>
    </div>
</div>

{#if gameOver}
    <QuizResult score={questionAmount} {errors} {startGame} />
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
