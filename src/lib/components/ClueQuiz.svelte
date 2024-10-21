<script>
    import { onMount } from "svelte";
    import BaseOptionsQuiz from "$lib/components/BaseOptionsQuiz.svelte";
    import * as Icon from "svelte-flag-icons";

    export let region;

    let [a1, a2, a3, a4] = "";
    const answers = [a1, a2, a3, a4];

    let correctAnswer = 1;

    let question = `Where can you find this ${region.replace("s", "")}?`;

    let questionsArray;
    let questionAmount = 0;

    let remainingQuestionsArray = [];

    async function fetchQuestionsArray() {
        try {
            if (!questionsArray) {
                questionsArray = await fetch("/src/lib/json/regions.json");
                questionsArray = await questionsArray.json();
                questionsArray = questionsArray[region];
                return [...questionsArray];
            }
            return [...questionsArray];
        } catch (error) {
            console.error(
                "Error loading region - likely, that region does not exist. Error:",
                error,
            );
        }
    }

    async function startClueGame() {
        remainingQuestionsArray = await fetchQuestionsArray();
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

    let randomQuestion;

    function setQuizContent() {
        // Select random questoin
        const randomQuestionIndex = Math.floor(
            Math.random() * remainingQuestionsArray.length,
        );

        randomQuestion = remainingQuestionsArray[randomQuestionIndex];
        remainingQuestionsArray.splice(randomQuestionIndex, 1); // remove the question

        // Randomize the correct answer
        correctAnswer = 1 + Math.floor(Math.random() * 4);

        // Pre-filtering the wrong answers, excluding only the correct answer from the full questions array
        let wrongAnswersPool = questionsArray.filter(
            (country) => country !== randomQuestion,
        );

        answers.forEach((_, index) => {
            const answerIndex = index + 1;

            if (answerIndex == correctAnswer) {
                answers[index] = randomQuestion;
            } else {
                const randomCountryIndex = Math.floor(
                    Math.random() * wrongAnswersPool.length,
                );
                
                const randomCountry = wrongAnswersPool[randomCountryIndex];
                // Splice --> removes entry from actual array, Slice --> removes entry only from new copy of array
                wrongAnswersPool.splice(randomCountryIndex, 1); // Remove that one to avoid duplicates in the 3 wrong options

                answers[index] = randomCountry;
            }
        });

        [a1, a2, a3, a4] = answers;
    }

    function handleNextQuestion() {
        setQuizContent();
    }

    onMount(() => {
        startClueGame();
    });
</script>

<BaseOptionsQuiz
    answerOne={a1}
    answerTwo={a2}
    answerThree={a3}
    answerFour={a4}
    {questionAmount}
    {question}
    {correctAnswer}
    {handleNextQuestion}
    handleStartGame={startClueGame}>
    <div class="w-full flex justify-center items-center mb-4">
        {#if randomQuestion}
            <img
                alt="bollard"
                class="h-52 rounded-md"
                src="/src/lib/assets/clues/bollards/bollard-{randomQuestion.replace(
                    ' ',
                    '-',
                )}.jpg" />
        {/if}
    </div>
</BaseOptionsQuiz>
