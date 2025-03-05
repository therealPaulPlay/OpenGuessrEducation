<script>
	// For components that work like layouts (with a slot, in which HTML can be passed) - children needs to be specified as a prop
	let { children } = $props();
</script>

<div class="card w-full max-w-xs bg-base-100 outline outline-1 outline-accent card-body items-center">
	{@render children?.()}
</div>
