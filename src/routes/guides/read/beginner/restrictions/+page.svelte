<script>
    import GuideQuiz from "$lib/components/GuideQuiz.svelte";
</script>

<h1 class="text-4xl font-bold mb-4">Restrictions & NMPZ</h1>

<p class="mb-2">
    This guide will explain the term <b>NMPZ</b> as well as the specific ways to control a panorama. Moreover, we will be going over different <b>restrictions</b> for matches. Taking away some or all of these ways is often <b>favored by
        professional players</b> to increase the difficulty and ensure that every player sees the same hints.
</p>

<h2 class="text-2xl font-bold mt-8 mb-2">The term "NMPZ"</h2>

<p class="mb-2">
    NMPZ stands for <b>No Move, no Pan and no Zoom</b>. Let's quickly go over these three controls.
</p>

<ol class="mb-2 list-disc list-inside">
    <li class="mb-2"><b>Move:</b> Move refers to moving around in the panorama using the controls. You can learn how to use them effectively in the guides on <a class="text-secondary" href="/guides/read/beginner/fast-movement">fast movement</a>
    and <a class="text-secondary" href="/guides/read/beginner/shortcuts">keyboard shortcuts</a>.</li>
    <li class="mb-2"><b>Pan:</b> Pan refers to the action of changing the view or angle of the 360-degree image.</li>
    <li class="mb-2"><b>Zoom:</b> This describes the action of zooming in or out of the image using the mouse wheel or + and - buttons.</li>
</ol>

<p class="mb-2"> Oftentimes, these controls are being enabled or disabled to make for interesting restrictions. Especially "No-Move" is quite popular in the GeoGuessr community.</p>

<GuideQuiz
  question='What does NMPZ stand for?'
  answerOne="No move, No pan, No zoom"
  answerTwo="No mods, No pins, No zoom"
  answerThree="Never mark pins as zero"
  answerFour="No map, No places, No zones"
  correctAnswer={1}
/>

<h2 class="text-2xl font-bold mt-8 mb-2">Restrictions</h2>

<p class="mb-2">There are a bunch more restrictions available in <a href="https://openguessr.com" target="_blank" class="text-secondary">OpenGuessr</a>.
These are the ones that are exclusive:</p>

<ol class="mb-4 list-disc list-inside">
    <li><b>Grayscale:</b> As the name says, the imagery is black and white.</li>
    <li><b>Invert Colors:</b> The colors of the imagery are inverted.</li>
    <li><b>Hue Shift:</b> Colors are being changed randomly.</li>
    <li><b>Blink (Fade):</b> Like blinking with your eyes, the panorama will fade between being visible and black.</li>
</ol>

<img
    alt="OpenGuessr restrictions"
    src="/assets/guides/openguessr_restrictions.png"
    class="rounded-xl w-full" />

<p class="text-center mt-2">Restrictions in OpenGuessr.</p>
