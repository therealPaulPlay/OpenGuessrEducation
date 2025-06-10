<script>
	import { ArrowLeftIcon } from "lucide-svelte";
	let { href } = $props();
</script>

<a class="flex text-lg gap-3 justify-items-start items-center hover:opacity-50 transition-opacity w-fit mb-4" {href}>
	<ArrowLeftIcon />
	Back
</a>
