<script>
	import ArticleTip from "$lib/components/ArticleTip.svelte";
	import GuideQuiz from "$lib/components/GuideQuiz.svelte";
	import ArticleEmbedPanorama from "$lib/components/ArticleEmbedPanorama.svelte";
</script>

<h1 class="text-4xl font-bold mb-4">Map creation</h1>
<p class="mb-2">
	In OpenGuessr, making maps by <b>uploading a few Street View links</b> is easy, however, professional map-makers use
	more <b>sophisticated tools</b> for their efforts. These allow them to create <b>larger maps</b> using generators and pick
	out the best locations more elegantly. In this guide, you will learn how to create GeoGuessr and OpenGuessr maps yourself.
</p>

<h2 class="text-2xl font-bold mt-8 mb-2">Finding locations</h2>
<p class="mb-2">
	As we learned in the beginner <a href="/guides/read/beginner/map-basics">guide on maps</a>, we have to differentiate
	between <b>arbitrarily generated</b> and <b>handpicked</b> locations. The latter is rather straightforward, as it
	involes <b>finding locations</b> on the <b>Maps platform</b> and then extracting the coordinates from the <b>URL</b>.
</p>

<p class="mb-2">
	Here is an example: https://www.google.at/maps/@<b>38.6755154,39.2217219</b>,3a... [Latitude, Longitude]
</p>

<h2 class="text-2xl font-bold mt-8 mb-2">The Map-Generator</h2>
<p class="mb-2">
	<a class="text-secondary" target="_blank" href="https://map-generator.vercel.app/">Map-Generator</a> is currently the
	most popular tool for generating locations. There is also a <b>NSJ</b> variant of the same software, that was forked
	and modified by the Github user NSJ. It offers <b>slightly different features</b>, but is fundamentally similar.
</p>

<img alt="Map Generator (non-NSJ)" src="/assets/guides/map-generator-example.png" class="rounded-xl w-full" />

<p class="text-center mt-2">The Map-Generator website.</p>

<p class="mb-2">
	You can click on countries to select them, or use the selection tools from the <b>bottom left-hand corner</b> to
	<b>draw a polygon shape</b>
	or a square. After that, you can change the <b>amount of locations</b> that will be generated in the menu on the left.
	Then, click on <b>start</b> to kick-off the generation.
</p>

<img alt="Map Generator Export" src="/assets/guides/map-generator-export.png" class="rounded-xl w-full" />

<p class="text-center mt-2 mb-2">Export options on the Map-Generator.</p>

<p class="mb-2">
	You can then export the coordinates as <b>JSON</b> in the GeoGuessr format. Other options include GeoJSON, which also
	saves region data or a CSV, which is used for spreadsheets (comma-separated-values). For OpenGuessr, you can then use
	<a class="text-secondary" href="/tools/map-converter">the official converter</a> to create a OpenGuessr Location JSON from
	that.
</p>

<p class="mb-2">
	As seen in the image, there are a lot of <b>options to choose from</b>. Let's go over some:
</p>

<ol class="mb-2 list-disc list-inside">
	<li><b>Reject unofficial:</b> Enabled by default, this excludes unofficial Panorama images.</li>
	<li>
		<b>Reject locations without description:</b> This prevents trekker locations. It is recommended to partially disable
		this for balanced maps.
	</li>
	<li>
		<b>Prefer Intersections:</b> This setting will help you get more urban locations, as intersections are usually in more
		populated areas.
	</li>
	<li>
		<b>Export panoId:</b> The panoId ensures that this exact panorama will be shown, even if newer panoramas for that location
		exist (or will be made).
	</li>
</ol>

<GuideQuiz
	question="Which option increases the likelihood of urban locations?"
	answerOne="Prefer Intersections"
	answerTwo="Reject locations without description"
	answerThree="Dead ends only"
	answerFour="Reject unofficial"
	correctAnswer={1}
/>

<h2 class="text-2xl font-bold mt-8 mb-2">The Map-Maker</h2>

<p class="mb-2">
	The <a target="blank" href="https://map-making.app" class="text-secondary">Map-Making-App</a> is awesome for working
	with generated locations. It allows you to easily <b>add tags</b>, remove places, pick different camera generations
	(if available) and apply <b>advanced filters</b> to ensure that all locations fit your map.
</p>

<img alt="Map-Making-App" src="/assets/guides/map-making-app-example.png" class="rounded-xl w-full" />

<p class="text-center mt-2 mb-2">The Map-Making-App.</p>
