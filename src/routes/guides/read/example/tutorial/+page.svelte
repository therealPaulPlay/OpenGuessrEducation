<script>
    import ArticleTip from "$lib/components/ArticleTip.svelte";
    import GuideQuiz from "$lib/components/GuideQuiz.svelte";
    import ArticleEmbedPanorama from "$lib/components/ArticleEmbedPanorama.svelte";
</script>

<!-- main h1 header (only one per page) -->
<h1 class="text-4xl font-bold mb-4">A guide example</h1>
<p class="mb-2">
    This guide is a good <b>example</b> of how a finished guide should look like.
    Use this when you want to get into writing articles yourself.
</p>

<h2 class="text-2xl font-bold mt-8 mb-2">Example h2 header</h2>
<p class="mb-2">
    Pay attention to the <b>margins</b> used. A normal paragraph usually has a margin-bottom
    of 2 (mb-2 class). H2 headers use a margin-top of 8.
</p>

<ArticleTip>
    This is a highlighted Article Tip. Please use target="_blank" for external links, thank you!
</ArticleTip>

<img
    alt="street view example lining up"
    src="/src/lib/assets/guides/example.jpg"
    class="rounded-xl w-full" />

<!-- image description -->
<p class="text-center mt-2">A paragraph before an image should use mb-4.</p>

<h2 class="text-2xl font-bold mt-8 mb-2">A second H2 header</h2>
<p class="mb-2">This is a second header with example text.</p>

<GuideQuiz
  question="How many Guide Quizzes can a guide include?"
  answerOne="A single one"
  answerTwo="Up to ten"
  answerThree="At least one"
  answerFour="There is no minimum or maximum"
  correctAnswer={4}
/>

<h2 class="text-2xl font-bold mt-8 mb-2">A third H2 header</h2>
<p class="mb-2">This is a third with example text.</p>

<ArticleEmbedPanorama src="https://www.google.com/maps/embed?pb=!4v1730052032179!6m8!1m7!1sm67yOELuY_ilVgXXbmMRPQ!2m2!1d40.70986804443505!2d-73.99006038502898!3f203.5393579945816!4f5.933099209797788!5f0.7820865974627469" />
<p class="text-center mt-2">An example Article Embed. These embeds have a mt-4 by default.</p>

<h3 class="text-xl font-bold mt-8 mb-2">Example H3 header</h3>
<p class="mb-2">This is an example that shows a H3 header with text.</p>
<ol class="mb-2 list-disc list-inside">
    <li>This is a bullet point.</li>
</ol>
