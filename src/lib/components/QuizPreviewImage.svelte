<script>
    let { path } = $props();
</script>

<div class="custom-size rounded-lg overflow-hidden grow bg-secondary">
    <img alt="clue quiz preview" class="h-full w-full" src="/src/lib/assets/clues/{path.replace("/src/lib/assets/clues", "")}" />
</div>

<style>
    .custom-size {
        width: 216px;
        height: 135px;
    }
</style>
