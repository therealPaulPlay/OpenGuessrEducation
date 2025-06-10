<script>
	import { goto } from "$app/navigation";
	import { Search } from "lucide-svelte";

	let searchInput = $state("");
	let searchResults = $state([]);
	let showDropdown = $state(false);

	let sitemapData;
	let URLs;

	// Function to format path segments
	function formatPathSegments(path) {
		// Create a URL object and get just the pathname
		const pathname = new URL(path).pathname
			.replace(/^\//, "") // Remove leading slash
			.replace(/\/$/, ""); // Remove trailing slash

		// If it's the root path (empty after cleaning)
		if (!pathname) {
			return "Home";
		}

		return pathname
			.split("/")
			.map((segment) =>
				segment
					.replace(/-/g, " ")
					.split(" ")
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" "),
			)
			.join(" > ");
	}

	// Function to rank and sort search results
	function rankResults(query, urls) {
		const words = query.toLowerCase().split(" ");

		return urls
			.map((url) => {
				const formattedPath = formatPathSegments(url);

				const normalizedPath = formattedPath.toLowerCase();

				const matchCount = words.reduce((count, word) => (normalizedPath.includes(word) ? count + 1 : count), 0);

				return {
					path: formattedPath,
					url: url,
					rank: matchCount,
				};
			})
			.filter((result) => result.rank > 0)
			.sort((a, b) => b.rank - a.rank)
			.slice(0, 5);
	}

	// Effect to handle search
	$effect(async () => {
		if (!searchInput) {
			searchResults = [];
			showDropdown = false;
			return;
		}

		// Fetch and parse sitemap
		if (!sitemapData) {
			const response = await fetch("/sitemap.xml");
			const responseAsText = await response.text();
			sitemapData = new DOMParser().parseFromString(responseAsText, "text/xml");
			URLs = [...sitemapData.querySelectorAll("url loc")].map((loc) => loc.textContent);
		}

		searchResults = rankResults(searchInput, URLs);
		showDropdown = true;
	});

	function handleResultClick(url) {
		// Extract the path
		const path = new URL(url).pathname;
		goto(`${window.location.origin}${path}`);
		showDropdown = false;
	}

	function handleClickOutside(event) {
		if (!event.target.closest(".search-container")) {
			showDropdown = false;
		}
	}

	function stopPropagation(e) {
		e.stopPropagation();
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="search-container relative mb-3" onclick={stopPropagation}>
	<div class="form-control">
		<label class="input flex items-center gap-2 !outline-none">
			<input
				type="text"
				placeholder="Search"
				class="w-full max-w-xs"
				bind:value={searchInput}
				onkeypress={(e) => {
					if (e.key == "Enter") handleResultClick(searchResults[0].url);
				}}
			/>
			<Search />
		</label>
	</div>

	{#if showDropdown && searchResults.length > 0}
		<div
			class="absolute w-full mt-2 bg-base-100 shadow-lg transition-opacity p-4 flex flex-col gap-2 rounded-2xl z-20 max-h-52 overflow-auto"
		>
			{#each searchResults as result}
				<div
					class="rounded-md w-full px-2 py-1 bg-base-200 hover:bg-base-300 transition-colors cursor-pointer"
					onclick={() => handleResultClick(result.url)}
				>
					<p class="text-sm">{result.path}</p>
				</div>
			{/each}
		</div>
	{:else if showDropdown}
		<div class="absolute w-full mt-2 bg-base-100 shadow-lg p-4 rounded-lg z-20">
			<p class="text-center text-base-content/60">No matching entries.</p>
		</div>
	{/if}
</div>

<svelte:window onclick={handleClickOutside} />
