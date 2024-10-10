<script>
    import ArticleTip from "$lib/components/ArticleTip.svelte";
    import GuideQuiz from "$lib/components/GuideQuiz.svelte";
    import Map from "$lib/components/Map.svelte";
</script>

<h1 class="text-4xl font-bold mb-4">European Guardrails</h1>

<p class="mb-2">
    Guardrails, often overlooked, can be a <b>valuable clue </b>for guessing the
    country. This guide focuses on <b>three main types</b> of guardrails found
    in Europe: the<b>A-Profile, B-Profile, and Thin B-Profile</b> .
</p>

<h2 class="text-2xl font-bold mt-8 mb-2">Why focus on Europe?</h2>

<p class="mb-4">
    Unlike <b>many parts of the world</b> where guardrail types
    <b>vary widely</b>
    even within countries, <b>European nations</b> tend to use specific
    <b>types consistently</b>. This makes European guardrails particularly
    useful for narrowing down your location in OpenGuessr or GeoGuessr.
</p>

<h2 class="text-2xl font-bold mt-8 mb-2">A-Profile (Armco Flex Beam)</h2>

<p class="mb-4">
    The A-Profile, also known as the Armco flex beam, is characterized by a <b
        >single, continuous wave</b> pattern. It's commonly found in most of Europe.
</p>

<div class="flex flex-wrap justify-evenly items-center gap-5 mb-4">
    <Map region="A-Profile" interactive="true" />
    <img
        alt="A-profile"
        src="/src/lib/assets/guides/a-profile-guardrail.png"
        class="rounded-lg h-44" />
</div>

<p class="text-center mt-2 mb-4">
    Map showing countries that use A-Profile guardrails.
</p>

<p class="mb-4">
    Note that a key identifier is the combination of A-Profile guardrails with <b
        >black and white posts</b
    >, which is a decent indicator of German-speaking countries.
</p>

<ArticleTip>
    Germany and Ireland sometimes utilize the B-Profile as well.
</ArticleTip>

<h2 class="text-2xl font-bold mt-8 mb-2">B-Profile (Bethlehem Safety Beam)</h2>

<p class="mb-2">
    The B-Profile, or Bethlehem Safety Beam, features <b>two waves stacked</b>
    on top of each other, creating a more <b>complex pattern</b>. It's
    frequently seen in:
</p>

<ul class="list-disc pl-6 mb-4">
    <li>Poland</li>
    <li>Denmark</li>
    <li>Croatia</li>
    <li>Serbia</li>
</ul>

<div class="flex flex-wrap justify-evenly items-center gap-5 mb-4">
    <Map region="B-Profile" interactive="true" />
    <img
        alt="B-profile"
        src="/src/lib/assets/guides/b-profile-guardrail.png"
        class="rounded-lg h-44" />
</div>

<p class="text-center mt-2 mb-4">
    Map showing countries that use B-Profile guardrails.
</p>

<p class="mb-4">
    The B-Profile is designed to handle heavier impacts, making it common on
    highways and major roads in these countries.
</p>

<h2 class="text-2xl font-bold mt-8 mb-2">Thin B-Profile</h2>

<p class="mb-2">
    The Thin B-Profile is similar to the standard B-Profile but noticeably <b
        >thinner</b> with a <b>higher center part</b>
    and often <b>shinier</b>. It's a distinctive feature in:
</p>

<ul class="list-disc pl-6 mb-4">
    <li>Slovakia</li>
    <li>Czechia</li>
</ul>

<GuideQuiz
    question="Where in Europe is this guardrail common?"
    answerOne="Germany"
    answerTwo="Poland"
    answerThree="Czechia"
    answerFour="Denmark"
    correctAnswer={3}>
    <img
        alt="Thin B-profile"
        src="/src/lib/assets/guides/b-profile-thin-guardrail.png"
        class="rounded-lg h-44 mb-4 mx-auto" />
</GuideQuiz>
