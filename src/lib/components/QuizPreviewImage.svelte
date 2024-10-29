<script>
    let { path } = $props();
</script>

<div class="custom-size rounded-lg overflow-hidden grow bg-base-300">
    <img alt="clue quiz preview" class="h-full w-full" src="/assets/clues{path.replace("/assets/clues/", "")}" />
</div>

<style>
    .custom-size {
        width: 216px;
        height: 135px;
    }
</style>
