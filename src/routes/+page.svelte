<script>
	import Globe from "$lib/components/Globe.svelte";
	import { goto } from "$app/navigation";
	import { Book, Trophy, Compass, Flag, Award, Map, Gamepad2 } from "lucide-svelte";
	import { onMount } from "svelte";
	import { setTitle } from "$lib/utils/pageTitle.svelte.js";
	import { username } from "$lib/stores/accountData";

	let welcomeText = "Master your geography skills.";
	let yourNameString = $state("");
	let isHovered = $state(false);

	onMount(() => {
		setTitle("");

		if ($username && $username !== "Guest") yourNameString = ", " + $username;
		else yourNameString = "";
	});
</script>

<article class="container mx-auto px-4 py-8 max-md:pt-0 max-md:-mt-5">
	<div class="mb-12">
		<Globe />
	</div>

	<h1 class="text-5xl font-bold mb-4 text-center">
		{welcomeText}
	</h1>
	<p class="text-xl text-center mb-8">
		Welcome to OpenGuessr Education{yourNameString}.
	</p>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 mt-12">
		<div class="card bg-base-300 shadow-md hover:shadow-xl transition-shadow duration-300">
			<div class="card-body">
				<Book class="w-12 h-12 text-secondary mb-4" />
				<h2 class="card-title">Recognize countries</h2>
				<p>Study country metas, common locations and regions with country articles.</p>
				<div class="card-actions justify-end mt-2">
					<button
						class="btn btn-secondary"
						onclick={() => {
							goto("/countries");
						}}>See countries</button
					>
				</div>
			</div>
		</div>

		<div class="card bg-base-300 shadow-md hover:shadow-xl transition-shadow duration-300">
			<div class="card-body">
				<Gamepad2 class="w-12 h-12 text-secondary mb-4" />
				<h2 class="card-title">Quizzes</h2>
				<p>Challenge yourself in engaging geography quizzes. Why not give it a go now?</p>
				<div class="card-actions justify-end mt-2">
					<button
						class="btn btn-secondary"
						onclick={() => {
							goto("/quiz");
						}}>Take a quiz</button
					>
				</div>
			</div>
		</div>

		<div class="card bg-base-300 shadow-md hover:shadow-xl transition-shadow duration-300">
			<div class="card-body">
				<Trophy class="w-12 h-12 text-secondary mb-4" />
				<h2 class="card-title">Professional guides</h2>
				<p>Learn to geo-guess and discover new tricks and strategies to elevate your game.</p>
				<div class="card-actions justify-end mt-2">
					<button
						class="btn btn-secondary"
						onclick={() => {
							goto("/guides");
						}}>Discover guides</button
					>
				</div>
			</div>
		</div>
	</div>

	<div class="text-focused-section mb-20 mt-28 flex justify-center flex-col">
		<h2 class="text-4xl font-bold mb-10 text-center">The place to learn it all.</h2>

		<div class="grid md:grid-cols-2 gap-8 w-5/6 mx-auto max-w-6xl">
			<div class="space-y-6">
				<div class="flex items-start">
					<Compass class="w-8 h-8 text-secondary mr-4 mt-1 flex-shrink-0" />
					<div>
						<h3 class="text-xl font-semibold mb-2">Explore the world</h3>
						<p class="text-base">
							Dive into our <b>educational (but fun!) content</b>
							to learn about different <b>locations</b>,
							<b>continents</b>,
							<b>capitals</b>, and <b>landmarks</b>.
						</p>
					</div>
				</div>

				<div class="flex items-start">
					<Flag class="w-8 h-8 text-secondary mr-4 mt-1 flex-shrink-0" />
					<div>
						<h3 class="text-xl font-semibold mb-2">Learn through play</h3>
						<p class="text-base">
							The platform makes learning <b>fun</b> and
							<b>exciting</b>
							through various <b>quizzes</b> and
							<b>trivia challenges</b>.
						</p>
					</div>
				</div>
			</div>

			<div class="space-y-6">
				<div class="flex items-start">
					<Award class="w-8 h-8 text-secondary mr-4 mt-1 flex-shrink-0" />
					<div>
						<h3 class="text-xl font-semibold mb-2">Master Geo-Guessing</h3>
						<p class="text-base">
							Whether you're a fan of <b>GeoGuessr</b>,
							<b>OpenGuessr</b>, or <b>Geotastic</b>, you'll find something that suits your needs.
						</p>
					</div>
				</div>

				<div class="flex items-start">
					<Map class="w-8 h-8 text-secondary mr-4 mt-1 flex-shrink-0" />
					<div>
						<h3 class="text-xl font-semibold mb-2">Become a geography expert</h3>
						<p class="text-base">
							Become a staple of the geography <b>community</b>. The discord is full of cool nerds that want to learn
							more about our planet.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mb-8 text-center">
		<h2 class="text-4xl font-bold mb-2 text-center">Ready to become a pro?</h2>
		<p class="text-lg mb-6">The journey will be legendary.</p>
		<button
			class="btn btn-secondary btn-lg relative overflow-hidden"
			onmouseenter={() => (isHovered = true)}
			onmouseleave={() => (isHovered = false)}
			onclick={() => {
				goto("/get-started");
			}}
		>
			<span class="mr-2">Start learning</span>
			<div class="w-8 h-8 relative">
				<img
					src="/assets/home/noob_player.png"
					alt="Beginner"
					class="w-full h-full object-contain absolute transition-opacity duration-300 ease-in-out"
					style="opacity: {isHovered ? 0 : 1}"
				/>
				<img
					src="/assets/home/chad_moai.png"
					alt="Pro"
					class="w-full h-full object-contain absolute transition-opacity duration-300 ease-in-out"
					style="opacity: {isHovered ? 1 : 0}"
				/>
			</div>
		</button>
	</div>
</article>

<style>
	.text-focused-section {
		line-height: 1.6;
	}
</style>
