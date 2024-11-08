<script>
    import {
        Sprout,
        Keyboard,
        Lightbulb,
        Compass,
        Rabbit,
        Map,
        Camera,
        Move,
        ArrowDownUp,
        TrafficCone,
        BookA,
        Footprints,
        Fence,
        CarFront,
        FlaskConical,
        MapPinned,
        Trophy,
    } from "lucide-svelte";
    import GuideCard from "$lib/components/GuideCard.svelte";
    import { onMount } from "svelte";
    import { setTitle } from "$lib/utils/pageTitle.svelte.js";

    onMount(() => {
        setTitle("Guides");
    });
</script>

<article class="container mx-auto p-6 px-1 custom-width">
    <h1 class="text-5xl font-bold mb-12">Guides</h1>

    <div class="mb-12">
        <h2 class="text-3xl font-semibold mb-4 flex items-center">
            <Sprout class="w-8 h-8 mr-2" />
            Beginner
        </h2>
        <!-- Beginner Guides-->
        <div class="w-full flex gap-8 flex-wrap scrollbar-hide">
            <!-- Cards here -->
            <GuideCard
                title="The Compass"
                description="Learn how to use the compass, determine the hemisphere and line up."
                href="/guides/read/beginner/compass"
                hueRotate="0">
                <Compass class="w-28 h-28"></Compass>
            </GuideCard>
            <GuideCard
                title="Keyboard Shortcuts"
                description="A cheat sheet for the most useful keyboard shortcuts in GeoGuessr."
                href="/guides/read/beginner/shortcuts"
                hueRotate="20">
                <Keyboard class="w-28 h-28"></Keyboard>
            </GuideCard>
            <GuideCard
                title="Fast Movement"
                description="Find out how to move a lot more quickly inside of the Street View."
                href="/guides/read/beginner/fast-movement"
                hueRotate="40">
                <Rabbit class="w-28 h-28"></Rabbit>
            </GuideCard>
            <GuideCard
                title="Map Basics"
                description="Learn what maps are, what coverage is and how community maps differ."
                href="/guides/read/beginner/map-basics"
                hueRotate="60">
                <Map class="w-28 h-28"></Map>
            </GuideCard>
            <GuideCard
                title="Street View Coverage"
                description="Find out where coverage exist, which cameras where used and what generations are."
                href="/guides/read/beginner/coverage"
                hueRotate="80">
                <Camera class="w-28 h-28"></Camera>
            </GuideCard>
            <GuideCard
                title="Restrictions & NMPZ"
                description="Learn about game controls, like Zoom, Move and Pan, and discover restrictions."
                href="/guides/read/beginner/restrictions"
                hueRotate="100">
                <Move class="w-28 h-28"></Move>
            </GuideCard>
        </div>
        <!-- Intermediate Guides -->
        <h2 class="text-3xl font-semibold mb-4 mt-12 flex items-center">
            <Lightbulb class="w-8 h-8 mr-2" />
            Intermediate
        </h2>
        <div class="w-full flex gap-8 flex-wrap scrollbar-hide">
            <!-- Cards here -->
            <GuideCard
                title="Driving side"
                description="Learn in which countries people drive on the left or right side of the road."
                href="/guides/read/intermediate/driving-side"
                hueRotate="120">
                <ArrowDownUp class="w-28 h-28"></ArrowDownUp>
            </GuideCard>
            <GuideCard
                title="Road lines"
                description="Distinguish road lines from another, differentiate between white and yellow lines."
                href="/guides/read/intermediate/road-lines"
                hueRotate="140">
                <TrafficCone class="w-28 h-28"></TrafficCone>
            </GuideCard>
            <GuideCard
                title="Alphabets"
                description="Find out which alphabets and languages are in use and where."
                href="/guides/read/intermediate/alphabets"
                hueRotate="160">
                <BookA class="w-28 h-28"></BookA>
            </GuideCard>
            <GuideCard
                title="Trekker Coverage"
                description="Learn what Trekker coverage refers to and how it could be useful for guessing."
                href="/guides/read/intermediate/trekker"
                hueRotate="180">
                <Footprints class="w-28 h-28"></Footprints>
            </GuideCard>
            <GuideCard
                title="European Guardrails"
                description="Find out which types of guardrails exist in Europe and where they are common."
                href="/guides/read/intermediate/european-guardrails"
                hueRotate="200">
                <Fence class="w-28 h-28"></Fence>
            </GuideCard>
            <GuideCard
                title="Follow Cars"
                description="This guide explains how follow cars can be used as hints."
                href="/guides/read/intermediate/follow-cars"
                hueRotate="220">
                <CarFront class="w-28 h-28"></CarFront>
            </GuideCard>
        </div>
        <!-- Advanced Guides -->
        <h2 class="text-3xl font-semibold mb-4 mt-12 flex items-center">
            <FlaskConical class="w-8 h-8 mr-2" />
            Advanced
        </h2>
        <div class="w-full flex gap-8 flex-wrap scrollbar-hide">
            <GuideCard
                title="Map Creation"
                description="Discover the tools that professional map creators use and become one yourself."
                href="/guides/read/advanced/map-creation"
                hueRotate="240">
                <MapPinned class="w-28 h-28"></MapPinned>
            </GuideCard>
            <GuideCard
            title="Cups & Competitions"
            description="Learn how you can put your skills to the test in cups and competitions."
            href="/guides/read/advanced/cups-and-competitions"
            hueRotate="260">
            <Trophy class="w-28 h-28"></Trophy>
        </GuideCard>
        </div>
    </div>

    <div class="w-full">
        <div
            class="rounded-xl p-2 px-6 flex items-center justify-center bg-base-200 bg-opacity-50 mx-auto w-fit">
            <p class="text-wrap">
                More guides coming soon! Feel free to <a
                    class="text-secondary"
                    href="https://github.com/therealPaulPlay/OpenGuessrEducation"
                    target="_blank">contribute</a> on Github.
            </p>
        </div>
    </div>
</article>

<style>
    .custom-width {
        max-width: 1055px;
    }
</style>
