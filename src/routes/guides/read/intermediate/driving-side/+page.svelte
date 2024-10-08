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

<h2 class="text-2xl font-bold mt-8 mb-2">Determining the driving direction</h2>

<p class="mb-2">
    Sometimes, determining the driving direction of the capture car can be a bit difficult. Let's go over a <b>few methods</b> that allow you to
    find out whether the car is driving on the <b>right</b> or the <b>left</b> side of the road.
</p>

<ol class="mb-2 list-disc list-inside">
    <li class="mb-2"><b>Other cars:</b> If you can spot other cars in front of or behind the capture car, you can easily determine the traffic direction. Rotate the camera to ensure
    the car is pointing forward and then check on which side you are on.</li>
    <li class="mb-2"><b>Road signs:</b> If you can spot any road signs on the side you are on, you can check in which direction the car should be driving.</li>
    <li class="mb-2"><b>Dust trail:</b> When the ground is dusty, you can often see a <b>trail behind</b> the <b>car</b>.</li>
    <li class="mb-2"><b>Panorama Hints:</b> Sometimes, the front and back of the car are slightly visible in the imagery. Usually, the <b>front</b> side is <b>more noticable</b>.</li>
</ol>