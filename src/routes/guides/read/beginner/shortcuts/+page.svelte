<script>
    import ArticleTip from "$lib/components/ArticleTip.svelte";
</script>

<h1 class="text-4xl font-bold mb-4">Keyboard Shortcuts</h1>
<p class="mb-2">
    The compass is a powerful tool for quickly gaining a <b
        >general sense</b>
    for where a location might be and comes in handy when trying to
    <b>pinpoint the exact road</b>.
</p>

<div class="flex gap-10 mt-8 flex-wrap">
    <div class="max-w-xs">
        <h2 class="text-2xl font-bold mb-4">Determining the Hemisphere</h2>
        <ol class="list-decimal list-inside mb-6">
            <li class="mb-2">
                Locate the compass in-game.
            </li>
            <li class="mb-2">Find the sun's position in the sky. Note that the sun is not always visible.</li>
            <li class="mb-2">
                The <b>red end</b> of the compass needle
                always points <b>north</b>.
            </li>
            <li class="mb-2">
                If the <b>sun is in the north</b>,
                you're in the
                <b>southern hemisphere</b>.
            </li>
            <li class="mb-2">
                If the <b>sun is in the south</b>,
                you're in the
                <b>northern hemisphere</b>.
            </li>
        </ol>
    </div>
</div>

<h2 class="text-2xl font-bold mt-8 mb-2">How to "line up"</h2>
<p class="mb-2">
    The compass can help you find out which geographical features you are seeing
    in the streetview. To <b>line up</b> the streetview with the map, rotate the
    camera so that the <b>compass points north</b> and
    then tilt the view so that the ground becomes visible. This way, you can scan for roads, coastlines or other landmarks on the minimap that
    follow the same direction as the geographical feature, because the
    <b>minimap always points north</b>.
</p>

<ArticleTip>
    In OpenGuessr, you can click on the compass to rotate the view to face north!
</ArticleTip>

<img alt="streetview example lining up" src="/src/lib/assets/guides/compass-streetview-example.jpg" class="rounded-xl">

<h2 class="text-2xl font-bold mt-8 mb-2">The two hemispheres</h2>
<p class="mb-2">
    Not everyone is familiar with the earth's two hemispheres, so here is a short explanation. <br>
    The equator splits the planet earth into two halves, a northern (upper) and a southern (lower) half. For example, Europe is located entirely in the northern hemisphere, 
    whereas Oceania sits in the southern hemisphere.
</p>

<style>
    :global(body) {
        background-color: theme("colors.base-200");
    }
</style>
