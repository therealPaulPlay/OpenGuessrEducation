<script>
    import QuizMap from "$lib/components/QuizMap.svelte";
    import ArticleTip from "$lib/components/ArticleTip.svelte";
</script>

<h1 class="text-4xl font-bold mb-4">Driving Side</h1>

<p class="mb-2">
    Determining the driving side can be an <b>extremely useful clue</b> for finding out where a panorama image was taken. In this guide, we'll first take
    a look at where which side is being used and then it will be explained <b>how the driving side</b> can be determined in a picture.
</p>

<h2 class="text-2xl font-bold mt-8 mb-2">Right side vs. Left side</h2>

<p class="mb-2">
    This map shows countries in which cars drive on the <b>left side</b> in <b>red</b> and countries with <b>right-hand traffic</b> in <b>blue</b>.
</p>


<ArticleTip>
    Zoom into the map to reveal country names!
</ArticleTip>

<QuizMap region="Driving Side" interactive=true showLabels=true minLabelZoom=3 notHighlightedColor="#67999e"/>

<p class="text-center mt-2">Map comparing left-hand and right-hand traffic.</p>