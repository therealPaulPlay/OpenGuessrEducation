<script>
	import { Edit, ArrowRight } from "lucide-svelte";
	let { path } = $props();
</script>

<div class="dropdown dropdown-top dropdown-end">
	<div tabindex="0" role="button" class="btn btn-accent btn-sm overflow-hidden h-fit flex gap-1 p-2">
		<Edit size="20" />
		<p class="hide-on-mobile text-sm">Edit this page</p>
	</div>
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-md mb-3">
		<div class="flex items-center flex-col gap-x-2">
			<div class="bg-base-200 flex justify-center items-center flex-col gap-x-2 rounded-lg p-2 w-full">
				<h2 class="font-bold text-base mb-3">Are you a developer?</h2>
				<a
					class="btn btn-accent mb-2 w-full"
					target="_blank"
					href="https://github.com/therealPaulPlay/OpenGuessrEducation/blob/main/README.md"
				>
					Readme <ArrowRight />
					<p class="absolute left-6 text-xs text-center leading-relaxed bg-base-100 rounded-full w-5 h-5">1.</p>
				</a>
				<a
					class="btn btn-accent w-full"
					target="_blank"
					href="https://github.com/therealPaulPlay/OpenGuessrEducation/tree/main/src/routes{path}/%2Bpage.svelte"
				>
					Edit on GitHub <ArrowRight />
					<p class="absolute left-6 text-xs text-center leading-relaxed bg-base-100 rounded-full w-5 h-5">2.</p>
				</a>
			</div>
			<div class="divider">OR</div>
			<div class="bg-base-200 flex justify-center items-center flex-col gap-x-2 rounded-lg p-2 w-full">
				<h2 class="font-bold text-base mb-2 text-left">Not a developer?</h2>
				<a class="btn btn-accent w-full leading-regular" href="/tools/markdown-to-code">
					Text-to-code tool <ArrowRight />
				</a>
			</div>
		</div>
	</ul>
</div>

<style>
	@media all and (max-width: 800px) {
		.hide-on-mobile {
			display: none;
		}
	}
</style>
