<script>
	import DarkModeToggle from "./DarkModeToggle.svelte";
	import AccountButton from "./AccountButton.svelte";
	import GlobalSearch from "./GlobalSearch.svelte";
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	let { isOpen = $bindable(false) } = $props();

	let activeButton = $state("");
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	$effect(() => {
		const currentPath = $page.url.pathname;
		if (currentPath === "/") {
			activeButton = "home";
		} else if (currentPath === "/get-started") {
			activeButton = "get-started";
		} else if (currentPath.startsWith("/guides")) {
			activeButton = "guides";
		} else if (currentPath.startsWith("/quiz")) {
			activeButton = "quiz";
		} else if (currentPath.startsWith("/countries")) {
			activeButton = "countries";
		}
	});

	function switchSelection(buttonId) {
		activeButton = buttonId;
		if (window.innerWidth < 1024) {
			isOpen = false;
		}
	}
</script>

<aside
	class="bg-base-200 w-64 h-full overflow-y-auto fixed left-0 top-0 bottom-0 z-[100] transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-x-hidden"
	class:translate-x-0={isOpen}
	class:-translate-x-full={!isOpen || !mounted}
>
	<nav class="flex h-full flex-col justify-between p-4">
		<!-- Logo -->
		<div class="flex justify-center items-center mb-2 mt-8">
			<img src="/assets/home/openguessr_icon.png" alt="OpenGuessr Logo" class="w-16 h-16 rounded-lg p-2 bg-base-300" />
		</div>

		<!-- Navigation Links -->
		<div class="custom-max-height mt-10 mb-5">
			<ul class="menu w-full space-y-4 p-0">
				<GlobalSearch />
				<li>
					<a
						class="btn normal-case text-lg {activeButton === 'home' ? 'btn-primary text-white' : 'bg-base-300'}"
						href="/"
						onclick={() => switchSelection("home")}>Home</a
					>
				</li>
				<li>
					<a
						class="btn normal-case text-lg {activeButton === 'quiz' ? 'btn-primary text-white' : 'bg-base-300'}"
						href="/quiz"
						onclick={() => switchSelection("quiz")}>Quizzes</a
					>
				</li>
				<li>
					<a
						class="btn normal-case text-lg {activeButton === 'guides' ? 'btn-primary text-white' : 'bg-base-300'}"
						href="/guides"
						onclick={() => switchSelection("guides")}>Guides</a
					>
				</li>
				<li>
					<a
						class="btn normal-case text-lg {activeButton === 'countries' ? 'btn-primary text-white' : 'bg-base-300'}"
						href="/countries"
						onclick={() => switchSelection("countries")}>Countries</a
					>
				</li>
				<div class="divider">OR</div>
				<li>
					<a class="btn normal-case text-lg bg-base-300" href="https://openguessr.com" target="_blank">
						Play OpenGuessr</a
					>
				</li>
			</ul>
		</div>

		<div class="flex justify-between mt-auto">
			<DarkModeToggle />
			<AccountButton />
		</div>
	</nav>
</aside>

<!-- Overlay for mobile -->
{#if isOpen}
	<button
		class="fixed inset-0 bg-black opacity-50 z-99 lg:hidden transition"
		onclick={() => (isOpen = false)}
		aria-label="Toggle Sidebar"
	></button>
{/if}

<style>
	.custom-max-height {
		max-height: 70dvh;
		overflow-y: auto;
		overflow-x: hidden;
	}
</style>
