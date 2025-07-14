<script>
	import "../app.css";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import Analytics from "$lib/components/Analytics.svelte";
	import { onMount } from "svelte";
	
	let { children } = $props();

	let isDrawerOpen = $state(false);

	onMount(() => {
		const mediaQuery = window.matchMedia("(min-width: 1024px)");
		isDrawerOpen = mediaQuery.matches;

		const handleMediaQueryChange = (e) => {
			isDrawerOpen = e.matches;
		};

		mediaQuery.addEventListener("change", handleMediaQueryChange);

		return () => {
			mediaQuery.removeEventListener("change", handleMediaQueryChange);
		};
	});

	function toggleDrawer() {
		isDrawerOpen = !isDrawerOpen;
	}
</script>

<div class="flex flex-col h-screen bg-base-100 dark:bg-base-900">
	<!-- Sidebar -->
	<Sidebar bind:isOpen={isDrawerOpen} />

	<!-- Main Content Area -->
	<div class="flex-1 flex flex-col lg:ml-64">
		<!-- Hamburger toggle for smaller screens -->
		<button
			class="lg:hidden fixed top-4 left-4 z-[60] btn btn-square btn-accent"
			aria-label="Floating Sidebar toggle"
			onclick={toggleDrawer}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block w-5 h-5 stroke-current"
				><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg
			>
		</button>

		<!-- The main content where route content will be displayed -->
		<main class="flex-1 lg:p-12 p-4 overflow-y-auto w-full mt-16 lg:mt-0 overflow-x-hidden">
			{@render children?.()}
		</main>

		<!-- Footer -->
		<Footer />
	</div>
</div>

<!-- Google Analytics (just code)-->
<Analytics />
