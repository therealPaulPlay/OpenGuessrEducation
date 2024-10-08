<script>
    import { onMount } from 'svelte';
    import { Check } from 'lucide-svelte';
    import Toast from './Toast.svelte';
  
    export let question = '';
    export let answerOne = '';
    export let answerTwo = '';
    export let answerThree = '';
    export let answerFour = '';
    export let correctAnswer = 1;
  
    let selectedAnswer = null;
    let isCompleted = false;
    let showToast = false;
    let quizId = '';
  
    $: answers = [answerOne, answerTwo, answerThree, answerFour];
  
    onMount(() => {
      quizId = `${window.location.pathname}_${question.substring(0, 2)}`;
      isCompleted = localStorage.getItem(quizId) === 'completed';
      if (isCompleted) {
        selectedAnswer = correctAnswer - 1;
      }
    });
  
    function handleAnswer(index) {
      if (isCompleted) return;
  
      selectedAnswer = index;
  
      if (index === correctAnswer - 1) {
        isCompleted = true;
        localStorage.setItem(quizId, 'completed');
        showToast = true;
        console.log('Earned 500 XP!');
        console.log(isCompleted, correctAnswer, selectedAnswer);
      }
    }
  </script>
  
  <div class="w-full p-4 bg-base-200 rounded-lg shadow-md mt-4">
    <h2 class="text-xl font-bold mb-4">{question}</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {#each answers as answer, index}
        <button
          class="btn w-full h-auto py-2 px-4 relative
                 {index === correctAnswer - 1 && isCompleted ? 'btn-success opacity-100' : 'btn-accent'}
                 {selectedAnswer == index && index != correctAnswer - 1 ? 'btn-error animate-shake' : ''}
                 {isCompleted && index != correctAnswer - 1 ? 'opacity-50 pointer-events-none' : ''}"
          on:click={() => handleAnswer(index)}
        >
          {answer}
          {#if isCompleted && index === correctAnswer - 1}
            <span class="absolute right-2">
              <Check size={20} />
            </span>
          {/if}
        </button>
      {/each}
    </div>
  </div>
  
  {#if showToast}
    <Toast message="500 XP earned!" type="success" />
  {/if}
  
  <style>
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
  
    .animate-shake {
      animation: shake 0.5s;
    }
  </style>  