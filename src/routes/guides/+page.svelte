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
		Tag,
	} from "lucide-svelte";
	import GuideCard from "$lib/components/GuideCard.svelte";
	import { onMount } from "svelte";
	import { setTitle } from "$lib/utils/pageTitle.svelte.js";

	onMount(() => {
		setTitle("Guides");
	});
</script>

<article class="container mx-auto py-6 custom-width">
	<h1 class="text-5xl font-bold mb-12">Guides</h1>

	<div class="mb-8">
		<h2 class="text-3xl font-semibold mb-4 flex items-center">
			<Sprout class="w-8 h-8 mr-2" />
			Beginner
		</h2>
		<!-- Beginner Guides-->
		<div class="w-full flex gap-8 flex-wrap scrollbar-hide">
			<!-- Cards here -->
			<GuideCard
				title="The compass"
				description="Learn how to use the compass to determine the hemisphere."
				href="/guides/read/beginner/compass"
				hueRotate="0"
			>
				<Compass class="w-28 h-28"></Compass>
			</GuideCard>
			<GuideCard
				title="Keyboard shortcuts"
				description="A cheat sheet for keyboard shortcuts in GeoGuessr."
				href="/guides/read/beginner/shortcuts"
				hueRotate="20"
			>
				<Keyboard class="w-28 h-28"></Keyboard>
			</GuideCard>
			<GuideCard
				title="Fast movement"
				description="Find out how to move a lot more quickly inside of the Street View."
				href="/guides/read/beginner/fast-movement"
				hueRotate="40"
			>
				<Rabbit class="w-28 h-28"></Rabbit>
			</GuideCard>
			<GuideCard
				title="Map basics"
				description="Learn what maps are, what coverage is and how they differ."
				href="/guides/read/beginner/map-basics"
				hueRotate="60"
			>
				<Map class="w-28 h-28"></Map>
			</GuideCard>
			<GuideCard
				title="Street View coverage"
				description="Find out how to differentiate between camera generations."
				href="/guides/read/beginner/coverage"
				hueRotate="80"
			>
				<Camera class="w-28 h-28"></Camera>
			</GuideCard>
			<GuideCard
				title="Restrictions & NMPZ"
				description="Learn about game controls and discover restrictions."
				href="/guides/read/beginner/restrictions"
				hueRotate="100"
			>
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
				hueRotate="120"
			>
				<ArrowDownUp class="w-28 h-28"></ArrowDownUp>
			</GuideCard>
			<GuideCard
				title="Road lines"
				description="Distinguish road lines from another and learn where to find which colors."
				href="/guides/read/intermediate/road-lines"
				hueRotate="140"
			>
				<TrafficCone class="w-28 h-28"></TrafficCone>
			</GuideCard>
			<GuideCard
				title="Alphabets"
				description="Find out which alphabets and languages are in use and where."
				href="/guides/read/intermediate/alphabets"
				hueRotate="160"
			>
				<BookA class="w-28 h-28"></BookA>
			</GuideCard>
			<GuideCard
				title="Trekker coverage"
				description="Learn what Trekker coverage refers to and how Pro's use it."
				href="/guides/read/intermediate/trekker"
				hueRotate="180"
			>
				<Footprints class="w-28 h-28"></Footprints>
			</GuideCard>
			<GuideCard
				title="European guardrails"
				description="Find out which types of guardrails exist where in Europe."
				href="/guides/read/intermediate/european-guardrails"
				hueRotate="200"
			>
				<Fence class="w-28 h-28"></Fence>
			</GuideCard>
			<GuideCard
				title="Follow cars"
				description="This guide explains how follow cars can be used as hints."
				href="/guides/read/intermediate/follow-cars"
				hueRotate="220"
			>
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
				title="Map creation"
				description="Discover the tools that professional map creators use."
				href="/guides/read/advanced/map-creation"
				hueRotate="240"
			>
				<MapPinned class="w-28 h-28"></MapPinned>
			</GuideCard>
			<GuideCard
				title="Cups & competitions"
				description="Learn how you can put your skills to the test in cups and competitions."
				href="/guides/read/advanced/cups-and-competitions"
				hueRotate="260"
			>
				<Trophy class="w-28 h-28"></Trophy>
			</GuideCard>
			<GuideCard
				title="Highway designations"
				description="Designations of Highways in Canada, America and Australia."
				href="/guides/read/advanced/highway-designations"
				hueRotate="280"
			>
				<Tag class="w-28 h-28"></Tag>
			</GuideCard>
		</div>
	</div>
</article>

<style>
	.custom-width {
		max-width: 1055px;
	}
</style>
