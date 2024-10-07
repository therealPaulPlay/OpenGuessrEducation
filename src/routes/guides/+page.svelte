<script>
    import {
        Sprout,
        Keyboard,
        Lightbulb,
        Compass,
        Rabbit,
        Map,
        Camera,
        Move
    } from "lucide-svelte";
    import GuideCard from "$lib/components/GuideCard.svelte";
</script>

<article class="container mx-auto p-6">
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
        <div class="w-full flex space-x-4 flex-wrap scrollbar-hide">
            <!-- Cards here -->
        </div>
    </div>
</article>

<style>
</style>
