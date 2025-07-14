<script>
	import Globe from "$lib/components/Globe.svelte";
	import { goto } from "$app/navigation";
	import { Book, Trophy, Compass, Flag, Award, Map, Gamepad2, ArrowRight } from "lucide-svelte";
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
	<div class="text-center mb-18">
		<div class="mb-6 py-4">
			<Globe />
		</div>

		<h1 class="text-6xl md:text-7xl font-black mb-2 leading-tight">Know your world</h1>

		<p class="text-lg md:text-xl text-base-content max-w-lg mx-auto leading-relaxed">
			Master geography through interactive learning, challenging quizzes, and professional metas.
		</p>
	</div>

	<!-- Feature Cards -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-30">
		<div class="card bg-base-300 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
			<div class="card-body">
				<Book class="w-12 h-12 text-secondary mb-4" />
				<h2 class="card-title text-xl">Recognize countries</h2>
				<p class="text-base-content mb-4">
					Study country metas, common locations and regions with comprehensive country articles.
				</p>
				<div class="card-actions justify-end mt-auto">
					<button class="btn btn-secondary group" onclick={() => goto("/countries")}>
						See countries
						<ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
					</button>
				</div>
			</div>
		</div>

		<div class="card bg-base-300 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
			<div class="card-body">
				<Gamepad2 class="w-12 h-12 text-secondary mb-4" />
				<h2 class="card-title text-xl">Quizzes</h2>
				<p class="text-base-content mb-4">
					Challenge yourself in engaging geography quizzes. Why not give it a go now?
				</p>
				<div class="card-actions justify-end mt-auto">
					<button class="btn btn-secondary group" onclick={() => goto("/quiz")}>
						Take a quiz
						<ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
					</button>
				</div>
			</div>
		</div>

		<div class="card bg-base-300 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
			<div class="card-body">
				<Trophy class="w-12 h-12 text-secondary mb-4" />
				<h2 class="card-title text-xl">Professional guides</h2>
				<p class="text-base-content mb-4">
					Learn to geo-guess and discover new tricks and strategies to elevate your game.
				</p>
				<div class="card-actions justify-end mt-auto">
					<button class="btn btn-secondary group" onclick={() => goto("/guides")}>
						Discover guides
						<ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Features Section -->
	<div class="mb-30">
		<h2 class="text-4xl md:text-5xl font-bold sm:mb-4 mb-2 text-center">The place to learn it all</h2>
		<p class="text-lg text-base-content text-center mb-16 mx-auto">Everything you need to become an expert.</p>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
			<div class="text-center group">
				<div class="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
					<Compass class="w-8 h-8 text-secondary-content" />
				</div>
				<h3 class="text-xl font-semibold mb-3">Explore the world</h3>
				<p class="text-base-content leading-relaxed">
					Dive into our educational (but fun!) content to learn about different locations, continents, capitals, and
					landmarks.
				</p>
			</div>

			<div class="text-center group">
				<div class="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
					<Flag class="w-8 h-8 text-secondary-content" />
				</div>
				<h3 class="text-xl font-semibold mb-3">Learn through play</h3>
				<p class="text-base-content leading-relaxed">
					The platform makes learning fun and exciting through various quizzes and trivia challenges.
				</p>
			</div>

			<div class="text-center group">
				<div class="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
					<Award class="w-8 h-8 text-secondary-content" />
				</div>
				<h3 class="text-xl font-semibold mb-3">Master Geo-Guessing</h3>
				<p class="text-base-content leading-relaxed">
					Whether you're a fan of GeoGuessr, OpenGuessr, or Geotastic, you'll find something that suits your needs.
				</p>
			</div>

			<div class="text-center group">
				<div class="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
					<Map class="w-8 h-8 text-secondary-content" />
				</div>
				<h3 class="text-xl font-semibold mb-3">Become a geography expert</h3>
				<p class="text-base-content leading-relaxed">
					Become a staple of the geography community. The discord is full of cool nerds that want to learn more about
					our planet.
				</p>
			</div>
		</div>
	</div>

	<!-- Final CTA -->
	<div class="text-center bg-radial from-secondary/80 to-secondary rounded-2xl p-12 border border-secondary/20">
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
					class="w-full h-full object-contain absolute transition-all duration-300 {isHovered
						? 'opacity-0 scale-75'
						: 'opacity-100 scale-100'}"
				/>
				<img
					src="/assets/home/chad_moai.png"
					alt="Pro"
					class="w-full h-full object-contain absolute transition-all duration-300 {isHovered
						? 'opacity-100 scale-100'
						: 'opacity-0 scale-125'}"
				/>
			</div>
		</button>
	</div>
</article>
