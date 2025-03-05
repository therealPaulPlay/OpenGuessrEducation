<script>
	import ArticleEmbedPanorama from "$lib/components/ArticleEmbedPanorama.svelte";
	import ArticleTip from "$lib/components/ArticleTip.svelte";
</script>

<p class="mb-2">
	Switzerland mostly consists of mountains, with the <b>Alps</b> covering the southern part of the country. The
	<b>Midlands</b>
	are characterized by rolling hills and farmlands, while the <b>Jura Mountains in north west</b>
	are long, folded limestone ridges. The country has four official languages: <b>German</b>, <b>French</b>,
	<b>Italian</b>, and <b>Romansh</b>. It doesn't use Euro (€) but the <b>Swiss Franc (CHF or Fr.)</b>.
</p>

<h2 class="text-2xl font-bold mt-4">Common locations</h2>
<p class="mb-2">These are the regions you need to distinguish in order to recognize the correct region.</p>

<h3 class="text-xl font-bold mb-2">Bern (mid-west)</h3>
<p class="mb-2">Features <b>Bernese houses</b> with <b>steep roofs</b> and <b>historical old town</b>.</p>
<ul class="mb-2 list-disc list-inside">
	<li><b>Capital city:</b> Bern is the de facto capital of Switzerland.</li>
	<li><b>Aare River:</b> The city is built around a distinctive river loop.</li>
	<li><b>Central location:</b> Positioned in the heart of Switzerland.</li>
</ul>
<ArticleEmbedPanorama
	src="https://www.google.com/maps/embed?pb=!4v1740237251696!6m8!1m7!1sCAoSLEFGMVFpcE94d3EtVkZKRmZwZ1Z1YWdYbXFUSDhZV3BjVUZ6eVdDV2JmRmQy!2m2!1d46.60662589907029!2d7.918139956783389!3f101.44839840232052!4f22.24639437432802!5f1.0950687085296957"
/>
<p class="text-center mt-2 mb-4">Bernese style houses.</p>

<h3 class="text-xl font-bold mb-2">Geneva (far-west):</h3>
<p class="mb-2">Located in the <b>French-speaking region</b>, near <b>Lake Geneva</b>.</p>
<ul class="mb-2 list-disc list-inside">
	<li><b>Westernmost major city:</b> Located at the Swiss-French border, part of the <b>French-speaking region.</b></li>
	<li><b>International hub:</b> Hosts many global organizations, including the UN.</li>
	<li><b>Lake Geneva:</b> The city sits on the largest lake in Switzerland.</li>
</ul>
<ArticleEmbedPanorama
	src="https://www.google.com/maps/embed?pb=!4v1740247423944!6m8!1m7!1s07Xgqc3BCanPiUhBQOa_2w!2m2!1d46.20741805862728!2d6.148705375444469!3f13.818336853521735!4f12.15889417100999!5f1.0882722894372399"
/>
<p class="text-center mt-2 mb-4">Lake Geneva in french-speaking region.</p>

<h3 class="text-xl font-bold mb-2">Lucerne (mid):</h3>
<p class="mb-2">Known for <b>Mount Pilatus</b> and the <b>Chapel Bridge</b>.</p>
<ul class="mb-2 list-disc list-inside">
	<li><b>Tourist hotspot:</b> One of Switzerland's most visited cities.</li>
	<li><b>Surrounded by mountains:</b> Located between Mount Pilatus and Rigi.</li>
	<li><b>Lake Lucerne:</b> A scenic lake with fjord-like characteristics.</li>
</ul>
<ArticleEmbedPanorama
	src="https://www.google.com/maps/embed?pb=!4v1740247571983!6m8!1m7!1sCAoSLEFGMVFpcE12RWdwS3hpTEdYbjhRSkJfcDNHUF8xaVN0UkFSZDhlZHZWOGEz!2m2!1d47.05149203037841!2d8.306109129410835!3f63.277774671862325!4f14.348277958875883!5f0.4000000000000002"
/>
<p class="text-center mt-2 mb-4">Chapelbridge in lucerne.</p>

<h3 class="text-xl font-bold mb-2">Ticino (far-south):</h3>
<p class="mb-2"><b>Italian-speaking</b>, with <b>stone houses</b> and <b>Mediterranean influences</b>.</p>
<ul class="mb-2 list-disc list-inside">
	<li><b>Mediterranean-style houses:</b> Architecture resembles <b>Italy</b>.</li>
	<li><b>Different vegetation:</b> Unique compared to the rest of Switzerland.</li>
	<li><b>Feels Italian:</b> If the surroundings seem Italian, it's probably <b>Ticino</b>.</li>
</ul>
<div class="flex justify-center space-x-4 w-full">
	<div class="flex-grow w-full">
		<ArticleEmbedPanorama
			src="https://www.google.com/maps/embed?pb=!4v1740247690303!6m8!1m7!1sCAoSLEFGMVFpcE1wNUJnNjRhOVZIN2FhaXlmZ1ZPdG42b0Z4S3ZqWWxkSnFiVEFu!2m2!1d46.22708547069591!2d8.602791398804767!3f354.3372900000479!4f1.5967223010608507!5f1.088857812671821"
		/>
		<p class="text-center mt-2 mb-4">Stonehouse in Ticino in mediterranean area.</p>
	</div>
	<div class="flex-grow w-full">
		<ArticleEmbedPanorama
			src="https://www.google.com/maps/embed?pb=!4v1740248748391!6m8!1m7!1sCAoSLEFGMVFpcE9kaGdpLVJxX2NUVTJhMW8tNXp2alI5dE54WkZjWnlTTDl6b09X!2m2!1d46.00422690727942!2d8.962976921318477!3f127.4981512733652!4f9.921924172788621!5f0.4000000000000002"
		/>
		<p class="text-center mt-2 mb-4">Italian looking drop in Ticino.</p>
	</div>
</div>
<h3 class="text-xl font-bold mb-2">Grisons (Graubünden, far-south-east):</h3>
<p class="mb-2">Famous for its <b>stone houses</b> and <b>alpine landscapes</b> and italian influence.</p>
<ul class="mb-2 list-disc list-inside">
	<li><b>Largest canton:</b> Graubünden is the biggest Swiss canton by area.</li>
	<li><b>Multilingual:</b> German, Italian, and Romansh are spoken.</li>
	<li><b>High alpine terrain:</b> Features deep valleys and remote villages.</li>
</ul>
<ArticleEmbedPanorama
	src="https://www.google.com/maps/embed?pb=!4v1740247897648!6m8!1m7!1s7EcK4Eo05s1CtsAyDgK5rQ!2m2!1d46.47877745109526!2d9.81164623104785!3f167.78930292283536!4f6.340514039282795!5f0.7820865974627469"
/>
<p class="text-center mt-2 mb-4">Alpine landscape with italian touched village.</p>

<h3 class="text-xl font-bold mb-2">Jura Region (north-west):</h3>
<p class="mb-2">Characterized by <b>limestone ridges</b> and <b>scenic countryside</b>.</p>
<ul class="mb-2 list-disc list-inside">
	<li><b>Border region:</b> Jura borders France with a shared cultural influence.</li>
	<li><b>Less populated:</b> One of the more rural and sparsely populated regions.</li>
	<li><b>Distinct geology:</b> Famous for karst landscapes and deep gorges.</li>
	<li><b>French-speaking:</b> The region is part of the French-speaking area of Switzerland aswell.</li>
</ul>
<ArticleEmbedPanorama
	src="https://www.google.com/maps/embed?pb=!4v1740248509079!6m8!1m7!1sCAoSLEFGMVFpcE5JZkg0aXYxcUdZa0tYeFcxYUNyT2oyNjFlcGlqNEE1ZmdHNVg3!2m2!1d46.93619779381393!2d6.72069773277127!3f104.68682571612345!4f-0.19634548684864228!5f0.7820865974627469"
/>
<p class="text-center mt-2 mb-4">Alpine landscape with italian touched village.</p>

<h2 class="text-2xl font-bold mt-8">Geography</h2>
<p class="mb-2">Let's look at the geographic aspects of Switzerland.</p>
<h3 class="text-xl font-bold mb-2">Regions & Languages</h3>
<div class="flex flex-wrap justify-center items-center">
	<img
		alt="swiss language areas"
		src="/assets/articles/switzerland/switzerland_languages.jpg"
		class="rounded-xl w-full max-w-[600px] aspect-[3/2] mb-2 mt-4"
	/>
</div>
<p class="text-center mb-4">
	Swiss languages 
	<a href="https://commons.wikimedia.org/wiki/File:Map_Languages_CH.png" target="_blank" class="text-secondary">
		(Source: Wikimedia).</a
	>
</p>
<ul class="mb-2 list-disc list-inside">
	<li><b>German-speaking region:</b> Covers the <b>north</b> and <b>center</b> of Switzerland.</li>
	<li><b>French-speaking region:</b> Located in the <b>west</b>, including <b>Geneva</b> and <b>Lausanne</b>.</li>
	<li><b>Italian-speaking region:</b> Found in the <b>south</b>, particularly in <b>Ticino</b>.</li>
	<li><b>Romansh-speaking region:</b> <b>Less common</b>, in <b>southeastern Switzerland</b>.</li>
</ul>

<h3 class="text-xl font-bold mb-1">Architecture & buildings</h3>
<ul class="mb-2 list-disc list-inside">
	<li><b>Bernese houses:</b> <b>Steep roofs</b>, common around <b>Bern</b>.</li>
	<li><b>Wooden chalets:</b> <b>Traditional alpine homes</b>, especially in <b>Valais</b>.</li>
	<li><b>Stone houses:</b> Found in <b>Grisons</b> and <b>Ticino</b>, resembling <b>Italian architecture</b>.</li>
	<li><b>Burnt-style houses:</b> Characteristic of <b>Bern</b> and surrounding regions.</li>
</ul>

<div class="flex flex-wrap justify-center items-center">
	<img
		alt="swiss wooden chalet house"
		src="/assets/articles/switzerland/switzerland_wooden_chalets.jpg"
		class="rounded-xl w-full max-w-[600px] aspect-[5/4] mb-2 mt-4"
	/>
</div>
<p class="text-center mb-4">
	Swiss wooden chalet 
	<a
		href="https://commons.wikimedia.org/wiki/File:Chalet,_Weisstannen-Oberdorf_SG_20220806-jag9889.jpg"
		target="_blank"
		class="text-secondary"
	>
		(Source: Wikimedia).</a
	>
</p>

<h3 class="text-xl font-bold mt-8 mb-2">Landscape & mountains</h3>
<ul class="mb-2 list-disc list-inside">
	<li><b>Alps:</b> <b>Tall</b>, <b>dramatic peaks</b>, often <b>snow-covered</b>.</li>
	<li><b>Jura Mountains:</b> <b>Long</b>, <b>folded limestone ridges</b>.</li>
	<li><b>Midlands:</b> <b>Rolling hills</b> and <b>farmlands</b>.</li>
</ul>

<h3 class="text-xl font-bold mt-8 mb-2">Roads & infrastructure</h3>

<ArticleEmbedPanorama
	src="https://www.google.com/maps/embed?pb=!4v1740238142927!6m8!1m7!1skcO5QVtdEi4FkxmQWoXouQ!2m2!1d46.94931226767469!2d7.393696704986776!3f20.861284051128337!4f5.388007113143985!5f2.4387869201840315"
/>
<p class="text-center mt-2 mb-4">Typical swiss road signs.</p>
<p class="mb-2">
	<b>Swiss road signs:</b> Often <b>white</b> with <b>blue</b> or <b>green backgrounds</b>. Mostly end on:
</p>
<ul class="list-disc list-inside ml-2">
	<li><b>Straße (or Strasse)</b></li>
	<li><b>Gasse</b></li>
	<li><b>Weg</b></li>
</ul>

<p class="mb-2 mt-2">
	<b>Hiking signs:</b> <b>Yellow</b>, showing walking distances in <b>time</b> rather than kilometers. Often found in
	<b>mountainous regions</b>.
</p>
<div class="flex flex-wrap justify-center items-center">
	<img
		alt="swiss postauto bus"
		src="/assets/articles/switzerland/switzerland_postauto_bus.jpg"
		class="rounded-xl w-full max-w-[600px] aspect-[200/139] mb-2 mt-4"
	/>
</div>
<p class="text-center mb-4">
	Typical swiss <b
		>PostAuto Bus 
		<a
			href="https://commons.wikimedia.org/wiki/File:MAN_Lion%27s_City_in_Sion_VS.jpg"
			target="_blank"
			class="text-secondary"
		>
			(Source: Wikimedia).</a
		>
	</b>
</p>
<p class="mb-2">
	<b>Bus cars:</b> <b>Yellow post (PostAuto) buses</b> are common but <b>not useful</b> for location identification. Sometimes can also be <b>green</b> busses.
</p>
<p class="mb-2"><b>Cross Walks: </b>Are always painted yellow in Switzerland. <b>Roadlines for buslines are painted yellow</b> aswell, other roadlines are painted white.</p>

<ArticleEmbedPanorama
	src="https://www.google.com/maps/embed?pb=!4v1740935186858!6m8!1m7!1s4HE_526mhQouIvCeUW439A!2m2!1d47.55906336708236!2d7.599000236224938!3f310.75863344643045!4f-9.002818312533904!5f2.4387869201839716"
/>
<p class="text-left mt-2 mb-4">Typical swiss roadlines and crosswalks.</p>

<h2 class="text-2xl font-bold mt-8 mb-2">License plates & codes</h2>
<div class="flex flex-wrap justify-left items-left">
	<img
		alt="swiss license plate"
		src="/assets/articles/switzerland/switzerland_licenseplate.jpg"
		class="rounded-xl w-1/3 h-1/3 mb-2 mt-4"
	/>
</div>
<p class="text-left mt-2 mb-4 ml-2">
	Licenseplate of switzerland (bern) <a
		href="https://commons.wikimedia.org/wiki/File:Swiss_license_plates_for_dealers.JPG"
		target="_blank"
		class="text-secondary"
	>
		(Source: Wikimedia).</a
	>
</p>
<p>Swiss license plates do not have the blue stripe on the left, like most countries in europe.</p>
<p>Cars in switzerland commonly have a <b>CH</b> sticker on the rear window or on the trunk.</p>

<div class="flex flex-wrap justify-left items-left">
	<img
		alt="swiss ch car sticker"
		src="/assets/articles/switzerland/switzerland_ch_sticker.jpg"
		class="rounded-xl w-1/3 h-1/3 mb-2 mt-4"
	/>
</div>
<p class="text-center mt-2 mb-4 ml-2">
	Swiss CH sticker for cars <a
		href="https://commons.wikimedia.org/wiki/File:CH_international_vehicle_registration_oval.svg"
		target="_blank"
		class="text-secondary"
	>
		(Source: Wikimedia).</a
	>
</p>

<ul class="mb-2 list-disc list-inside">
	<li>
		<b>Swiss plates:</b> Often blurred, but if visible, they show <b>canton abbreviations</b> (e.g., <b>BE</b> for Bern).
	</li>
	<li><b>Private parking signs:</b> Might display the <b>canton abbreviation</b>.</li>
	<li><b>Phone area codes:</b></li>
	<ul class="list-none list-inside ml-4">
		<li><b>02x:</b> Western Switzerland (<b>Geneva: 022</b>, <b>Lausanne: 021</b>).</li>
		<li><b>03x:</b> Bern, Jura, and northwest.</li>
		<li><b>04x:</b> Lucerne, Zurich.</li>
		<li><b>05x:</b> Scattered across the country.</li>
		<li><b>06x-09x:</b> Eastern & southern regions.</li>
	</ul>
</ul>

<p class="italic mt-4">Written by w0lfzk1nd from Discord</p>
