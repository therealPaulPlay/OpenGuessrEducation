<script>
    import ArticleTip from "$lib/components/ArticleTip.svelte";
</script>

<h1 class="text-4xl font-bold mb-4">An example guide</h1>
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
    This is a highlighted tip. Please use target="_blank" for links, thank you!
</ArticleTip>

<img
    alt="street view example lining up"
    src="/src/lib/assets/guides/example.jpg"
    class="rounded-xl w-full" />

<p class="text-center mt-2">An image description.</p>

<h2 class="text-2xl font-bold mt-8 mb-2">A second H2 header</h2>
<p class="mb-2">This is a second header with example text.</p>

<h2 class="text-2xl font-bold mt-8 mb-2">A third H2 header</h2>
<p class="mb-2">This is a third with example text.</p>

<h3 class="text-xl font-bold mt-8 mb-2">Example H3 header</h3>
<p class="mb-2">This is an example that shows a H3 header with text.</p>
<ol class="mb-2 list-disc list-inside">
    <li>This is a bullet point.</li>
</ol>
