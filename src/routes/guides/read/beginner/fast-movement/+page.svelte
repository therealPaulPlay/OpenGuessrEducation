<script>
	import GuideQuiz from "$lib/components/GuideQuiz.svelte";
</script>

<h1 class="text-4xl font-bold mb-4">Fast movement</h1>
<p class="mb-2">
	Picture this - you're starting a new round and get a location in the middle of nowhere. <b>No hints</b>, not even road
	signs. This is exactly when <b>moving fast</b> can make a tangible difference in determining who comes out victorious.
</p>

<h2 class="text-2xl font-bold mt-8 mb-2">How to "fast-move"</h2>
<p class="mb-2">The trick to move fast is to make use of the focus state of the arrow buttons.</p>
<ol class="mb-4 list-decimal list-inside">
	<li>
		<b>Click</b> on the <b>white arrow</b> to move forward. Don't click anywhere else afterwards.
	</li>
	<li>
		<b>Hold down </b><kbd class="kbd kbd-sm">Space</kbd>, or better yet, hold down <kbd class="kbd kbd-sm">Enter</kbd>,
		which can't lead to any accidental guesses.
	</li>
</ol>

<img alt="example of a selected white arrow" src="/assets/guides/selected_arrow.png" class="rounded-xl w-full" />
<p class="text-center mt-2">A correctly selected arrow.</p>

<GuideQuiz
	question="What should be done after clicking on the white arrow?"
	answerOne="Hold down Enter or Space"
	answerTwo="Hold down any keyboard button"
	answerThree="Click elsewhere, then hold down Space"
	answerFour="Click and drag the white arrow"
	correctAnswer={1}
/>

<h2 class="text-2xl font-bold mt-8 mb-2">How to "teleport"</h2>
<p class="mb-2">Sometimes, teleporting can be used to <b>jump to places</b> that would otherwise be hard to reach.</p>
<ol class="mb-4 list-decimal list-inside">
	<li>
		Position the circular arrow (which moves with your cursor) to a remote location, preferably as <b>far away</b> as possible.
	</li>
	<li>
		<b>Double-click</b> the <b>left mouse button</b> to teleport to that location. Ensure that the circular preview shows
		up underneath your mouse cursor, otherwise, the spot is not available.
	</li>
</ol>

<img alt="example of a selected white arrow" src="/assets/guides/teleport_preview.png" class="rounded-xl w-full" />
