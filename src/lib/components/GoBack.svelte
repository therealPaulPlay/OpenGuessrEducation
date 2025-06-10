<script>
	import { ArrowLeftIcon } from "lucide-svelte";
	let { href } = $props();
</script>

<a class="flex btn btn-soft btn-secondary w-fit mb-4" {href}>
	<ArrowLeftIcon />
	Back
</a>
