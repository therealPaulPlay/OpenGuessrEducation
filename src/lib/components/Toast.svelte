<script>
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";

	let { message = "", duration = 3000, type = "success", typeClass = $bindable("alert-success") } = $props();

	let visible = $state(false);

	onMount(() => {
		visible = true;
		typeClass = "alert-" + type;
		setTimeout(() => {
			visible = false;
		}, duration);
	});
</script>

{#if visible}
	<div class="toast toast-top toast-end" transition:fade={{ duration: 300 }}>
		<div class="alert {typeClass}">
			<span class="font-bold">{message}</span>
		</div>
	</div>
{/if}
