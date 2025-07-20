<script>
	import Globe from "$lib/components/Globe.svelte";
	import { goto } from "$app/navigation";
	import { Compass, Award, Map, Gamepad2, ArrowRight } from "lucide-svelte";
	import { onMount } from "svelte";
	import { setTitle } from "$lib/utils/pageTitle.svelte.js";
	import { username } from "$lib/stores/accountData";

	let isHovered = $state(false);

	onMount(() => {
		setTitle("");
	});
</script>

<article class="container mx-auto py-8 max-md:pt-0 max-md:-mt-5">
	<!-- Hero Section -->
	<div class="mt-6">
		<div class="mx-auto text-center relative h-15 lg:h-42">
			<h1
				class="inset-0 absolute sm:text-9xl text-8xl scale-102 max-sm:scale-103 text-nowrap truncate font-black mb-2 leading-tight text-primary/15"
			>
				Know the world
			</h1>
			<h1 class="inset-0 absolute sm:text-9xl text-8xl text-nowrap truncate font-black mb-2 leading-tight">Know the world</h1>
		</div>
		<p class="sm:text-xl max-w-105 mx-auto w-7/9 text-center sm:leading-8">
			Master geography through interactive articles, challenging quizzes, and clever metas.
		</p>
		<div class="relative max-sm:mb-3 sm:max-h-100 max-h-45 overflow-hidden lg:pt-90 sm:pt-70 pt-20 mask-b-from-30% mask-b-to-95% mask-x-from-95% mask-x-to-100%">
			<Globe />
		</div>
	</div>

	<!-- Feature Cards -->
	<div class="flex flex-wrap gap-8 mb-8">
		<div
			class="card shadow-sm/5 border border-accent hover:shadow-xl rounded-lg transition-all hover:-translate-y-1 flex-1 min-w-80"
		>
			<div class="card-body">
				<img
					alt="country icon"
					src="/assets/home/learn_countries_icon.png"
					class="h-15 w-15 xl:h-20 xl:w-20 drop-shadow-md drop-shadow-primary/25"
				/>
				<h2 class="card-title text-xl">Study countries</h2>
				<p class="text-base-content mb-4">Study country metas, common locations and regions with country articles.</p>
				<div class="card-actions justify-end mt-auto">
					<button class="btn btn-secondary group" onclick={() => goto("/countries")}>
						See countries
						<ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
					</button>
				</div>
			</div>
		</div>

		<div
			class="card shadow-sm/5 hover:shadow-xl border border-accent transition-all rounded-lg hover:-translate-y-1 flex-1 min-w-80"
		>
			<div class="card-body">
				<img
					alt="country icon"
					src="/assets/home/play_quizzes_icon.png"
					class="h-15 w-15 xl:h-20 xl:w-20 drop-shadow-md drop-shadow-primary/25"
				/>
				<h2 class="card-title text-xl">Play quizzes</h2>
				<p class="text-base-content mb-4">
					Challenge yourself in engaging geography quizzes. Why not give it a go now?
				</p>
				<div class="card-actions justify-end mt-auto">
					<button class="btn btn-secondary group" onclick={() => goto("/quiz")}>
						Take a quiz
						<ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
					</button>
				</div>
			</div>
		</div>

		<div
			class="card shadow-sm/5 hover:shadow-xl border border-accent transition-all rounded-lg hover:-translate-y-1 flex-1 min-w-80"
		>
			<div class="card-body">
				<img
					alt="country icon"
					src="/assets/home/guides_icon.png"
					class="h-15 w-15 xl:h-20 xl:w-20 drop-shadow-md drop-shadow-primary/25"
				/>
				<h2 class="card-title text-xl">Discover guides</h2>
				<p class="text-base-content mb-4">
					Learn to geo-guess and discover new tricks and strategies to elevate your game.
				</p>
				<div class="card-actions justify-end mt-auto">
					<button class="btn btn-secondary group" onclick={() => goto("/guides")}>
						Discover guides
						<ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Features Section -->
	<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-8">
		<div class="text-center group border border-accent p-8 rounded-lg shadow-sm/5">
			<h3 class="text-xl font-semibold mb-3">Explore the world</h3>
			<p class="text-base-content leading-relaxed">
				Dive into our educational (but fun!) content to learn about different locations, continents, capitals, and
				landmarks.
			</p>
		</div>

		<div class="text-center group border border-accent p-8 rounded-lg shadow-sm/5">
			<h3 class="text-xl font-semibold mb-3">Learn through play</h3>
			<p class="text-base-content leading-relaxed">
				The platform makes learning fun and exciting through various quizzes and trivia challenges.
			</p>
		</div>

		<div class="text-center group border border-accent p-8 rounded-lg shadow-sm/5">
			<h3 class="text-xl font-semibold mb-3">Master Geo-Guessing</h3>
			<p class="text-base-content leading-relaxed">
				Whether you're a fan of GeoGuessr, OpenGuessr, or Geotastic, you'll find something that suits your needs.
			</p>
		</div>

		<div class="text-center group border border-accent p-8 rounded-lg shadow-sm/5">
			<h3 class="text-xl font-semibold mb-3">Join the community</h3>
			<p class="text-base-content leading-relaxed">
				Become a staple of the geography community. The Discord is full of like-minded people.
			</p>
		</div>
	</div>

	<!-- Final CTA -->
	<div class="text-center bg-secondary/90 rounded-lg p-12">
		<h2 class="text-4xl md:text-5xl font-bold mb-4 text-secondary-content">Ready to become a pro?</h2>
		<p class="text-lg text-base-content mb-10 text-secondary-content">The journey will be legendary.</p>
		<button
			class="btn btn-lg relative overflow-hidden group"
			onmouseenter={() => (isHovered = true)}
			onmouseleave={() => (isHovered = false)}
			onclick={() => goto("/get-started")}
		>
			<span class="mr-2">Start learning</span>
			<div class="w-8 h-8 relative">
				<img
					src="/assets/home/noob_player.png"
					alt="Beginner"
					class="w-full h-full object-contain absolute transition-all {isHovered
						? 'opacity-0 scale-75'
						: 'opacity-100 scale-100'}"
				/>
				<img
					src="/assets/home/chad_moai.png"
					alt="Pro"
					class="w-full h-full object-contain absolute transition-all {isHovered
						? 'opacity-100 scale-100'
						: 'opacity-0 scale-125'}"
				/>
			</div>
		</button>
	</div>
</article>
