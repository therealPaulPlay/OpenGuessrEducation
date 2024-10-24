<script>
    import { onMount } from "svelte";
    import BaseOptionsQuiz from "$lib/components/BaseOptionsQuiz.svelte";

    let { region, textDataPath = "/src/lib/json/country-data/country-tld.json" } = $props();

    let [a1, a2, a3, a4] = $state("");

    // svelte-ignore state_referenced_locally
    const answers = [a1, a2, a3, a4];

    let correctAnswer = $state(1);

    let question = `Which country has this ${region.substring(0, region.length - 1)}?`;

    let questionsArray;
    let questionAmount = $state(0);
    
    // svelte-ignore non_reactive_update
    let textData;

    let remainingQuestionsArray = [];

    async function fetchQuestionsArray() {
        try {
            if (!questionsArray) {
                questionsArray = await fetch("/src/lib/json/regions.json");
                questionsArray = await questionsArray.json();
                questionsArray = questionsArray[region];
                return [...questionsArray] || [];
            }
            return [...questionsArray];
        } catch (error) {
            console.error(
                "Error loading region - likely, that region does not exist. Error:",
                error,
            );
        }
    }

    async function fetchTextData() {
        try {
            if (!textData) {
                textData = await fetch(textDataPath);
                textData = await textData.json();
            }
        } catch (error) {
            console.error(
                "Error loading text data. Error:",
                error,
            );
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
        startTextGame();
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
    handleStartGame={startTextGame}>
    <div class="w-full flex justify-center items-center mb-4">
        {#if randomQuestion}
        <h3 class="text-5xl font-bold my-5">{textData[randomQuestion]}</h3>
        {/if}
    </div>
</BaseOptionsQuiz>