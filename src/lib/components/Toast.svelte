<script>
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";

    export let message = "";
    export let duration = 3000;
    export let type = "success";

    export let typeClass = "alert-" + type;

    let visible = false;

    onMount(() => {
        visible = true;
        setTimeout(() => {
            visible = false;
        }, duration);
    });
</script>

{#if visible}
    <div
        class="toast toast-top toast-end"
        transition:fade={{ duration: 300 }}>
        <div class="alert {typeClass}">
            <span class="font-bold">{message}</span>
        </div>
    </div>
{/if}
