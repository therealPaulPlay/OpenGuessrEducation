<script>
	import { ArrowRight } from "lucide-svelte";
	let { path } = $props();
</script>

<div class="dropdown dropdown-top dropdown-end">
	<button class="btn btn-accent btn-sm text-sm"> Edit page </button>
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<ul
		tabindex="0"
		class="dropdown-content menu bg-base-100 rounded-lg z-1 w-56 p-2 shadow-md border border-accent mb-4"
	>
		<div class="flex items-center flex-col gap-x-2">
			<div class="flex justify-center items-center flex-col gap-2 w-full">
				<h2 class="font-bold text-base">Are you a developer?</h2>
				<a
					class="btn mb-2 w-full"
					target="_blank"
					href="https://github.com/therealPaulPlay/OpenGuessrEducation/blob/main/README.md"
				>
					Readme <ArrowRight />
					<p class="absolute left-6 text-xs text-center leading-relaxed bg-base-100 rounded-full w-5 h-5">1.</p>
				</a>
				<a
					class="btn w-full"
					target="_blank"
					href="https://github.com/therealPaulPlay/OpenGuessrEducation/tree/main/src/routes{path}/%2Bpage.svelte"
				>
					Edit on GitHub <ArrowRight />
					<p class="absolute left-6 text-xs text-center leading-relaxed bg-base-100 rounded-full w-5 h-5">2.</p>
				</a>
			</div>
			<div class="divider">OR</div>
			<div class="flex justify-center items-center flex-col gap-x-2 rounded-lg w-full">
				<h2 class="font-bold text-base mb-2 text-left">Not a developer?</h2>
				<a class="btn w-full leading-regular" href="/tools/markdown-to-code">
					Text-to-code tool <ArrowRight />
				</a>
			</div>
		</div>
	</ul>
</div>
