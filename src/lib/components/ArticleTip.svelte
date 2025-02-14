<script>
	// For components that work like layouts (with a slot, in which HTML can be passed) - children needs to be specified as a prop
	let { children } = $props();
</script>

<div
	role="alert"
	class="alert alert-info bg-base-100 outline-accent outline outline-1 border-none text-accent-content mt-4 mb-4"
>
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		></path>
	</svg>
	<span>
		{@render children?.()}
	</span>
</div>
