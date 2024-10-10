<script>
    import ArticleTip from "$lib/components/ArticleTip.svelte";
    import GuideQuiz from "$lib/components/GuideQuiz.svelte";
</script>

<h1 class="text-4xl font-bold mb-4">Street View Coverage</h1>

<p class="mb-4">
    Something that curently most <b>geography guessing games</b> like GeoGuessr
    or OpenGuessr have in common, is that they
    <b>rely on imagery from Google</b>
    - known as Street View. In this guide, we will take a look at how these
    3D-Panoramas are <b>being made</b>, what kind of technology is being used
    and a few other interesting details.
</p>

<iframe
    src="https://sv-map.netlify.app/"
    class="w-full h-96 rounded-xl"
    title="Coverage map"></iframe>
<p class="text-center mt-2 mb-6">Coverage map (Source: sv-map.netlify.app).</p>

<ArticleTip>
    While alternatives are mentioned briefly, this guide focuses on Google
    Street View.
</ArticleTip>

<h2 class="text-2xl font-bold mt-8 mb-2">Official Coverage</h2>

<p class="mb-2">
    Currently, <b>4 camera generations</b> exist. Let's quickly go over these:
</p>

<ol class="mb-4 list-decimal list-inside">
    <li class="mb-2">
        Gen 1 camera is easy to detect by its very <b
            >low quality and compression artifacts</b
        >. It is only seen in the US, Australia, and New Zealand.
    </li>
    <li class="mb-2">
        Gen 2 camera is best known for its distinctive <b>"halo"</b>, which is a
        visible <b>lens flare</b> around the sun. It was an upgrade on gen 1, but
        the images still are rather low-quality. Gen 2 coverage often times has a
        circular purplish blur around the car, which can be seen when looking down.
    </li>
    <li class="mb-2">
        Gen 3 has improved quality and resolution over Gen 2. <b
            >Text is a lot clearer</b> and easier to read.
    </li>
    <li class="mb-2">
        Gen 4 has the highest quality and the <b>brightest colours</b>, as old
        coverage is getting renewed, it's getting more and <b>more common</b>.
    </li>
</ol>

<GuideQuiz
    question="Which camera generation is this?"
    answerOne="Gen 1 because the quality is poor"
    answerTwo="Gen 2 because of the purple halo"
    answerThree="Gen 3 because it's sharp"
    answerFour="Gen 4 as it's vibrant and high-res"
    correctAnswer={2}>
    <iframe
        src="https://www.google.com/maps/embed?pb=!4v1728514755294!6m8!1m7!1sp911ZWRxZVoLHeygG-nrEA!2m2!1d37.42310335412409!2d-122.0837562418647!3f129.23931806705627!4f-8.671825203818074!5f0.7820865974627469"
        loading="lazy"
        class="mb-4 rounded-lg w-full h-64"
        title="Example panorama"
        referrerpolicy="no-referrer-when-downgrade"></iframe>
</GuideQuiz>

<img
    alt="Street View Camera Generations"
    src="/src/lib/assets/guides/coverage_types.png"
    class="rounded-xl w-full" />

<p class="text-center mt-2 mb-4">Camera Generations (Source: geodummy.com).</p>

<img
    alt="Street View Generations Map"
    src="/src/lib/assets/guides/coverage_gen_map.png"
    class="rounded-xl w-full" />

<p class="text-center mt-2 mb-4">
    Generations map (Source: geodummy.com, edited).
</p>

<h2 class="text-2xl font-bold mt-8 mb-2">Unofficial Coverage</h2>

<p class="mb-2">
    A lot of imagery comes from third-party contributors through different
    means. The <b>modern way to contribue</b> 3D imagery is to use a
    <b>supported 360 camera</b>
    and then upload images or videos to <b>Street View Studio</b>. Additionally,
    with selected Android devices, it is possible to capture and publish
    <b>photospheres</b>, which are simply 360-degree images that don't offer the
    possibility to move around. Especially in african countries or remote
    locations, unofficial coverage is common.
</p>

<p class="mb-2">
    Determining if a panorama has been captured by Google or a third-party is
    pretty simple, as the attribution of the image reveals its author.
</p>

<img
    alt="Street View attribution - detecting unofficial coverage"
    src="/src/lib/assets/guides/detect_official_coverage.png"
    class="rounded-xl w-full" />

<p class="text-center mt-2">Street View attribution.</p>

<h2 class="text-2xl font-bold mt-8 mb-2">What is "Ari" coverage?</h2>

<p class="mb-4">
    The name Ari comes from Ari Immonen, who is the head of the Digitalization
    Consulting devision at Autori, a finnish company that specializes in
    capturing imagery for Street View. Sometimes, "Ari" is being used to
    describe unofficial coverage.
</p>

<img
    alt="Ari coverage"
    src="/src/lib/assets/guides/autori_streetview.png"
    class="rounded-xl w-full" />

<p class="text-center mt-2">A car from Autori (Source: Google).</p>

<h2 class="text-2xl font-bold mt-8 mb-2">Google Streetview Alternatives</h2>

<p class="mb-2">
    Currently, there are two main Street View competitors that both have their
    shortcomings.
</p>

<ol class="mb-2 list-disc list-inside">
    <li>
        <b>Mapillary</b>, acquired by Meta in 2020, holds a massive image
        collection from roads around the world. Moreover, they are pushing an
        "open" solution to panorama images that is also being used by
        <a
            href="https://www.openstreetmap.org/"
            target="_blank"
            class="text-secondary">OpenStreetMap</a> to improve their map. The main
        shortcoming of Mapillary for map games is, that &gt95% of their images are
        not 360 degrees and lower quality, as most of their imagery comes from third-party
        contributors.
    </li>
    <li>
        <b>Apple Look Around</b> is Apple's solution to image-mapping and it's
        currently being expanded rapidly. They have a
        <a
            href="https://maps.apple.com/imagecollection/locations/at"
            target="_blank"
            class="text-secondary">site</a>
        that shows which regions will be added next. Their 3D images are of highest
        quality, but there is little coverage of Asia (as of October, 2024) yet.
        Furthermore, Look Around is only available in native Apple Maps applications,
        but they are currently developing
        <a
            href="https://beta.maps.apple.com/"
            target="_blank"
            class="text-secondary">Apple Maps on the web</a
        >.
    </li>
</ol>
