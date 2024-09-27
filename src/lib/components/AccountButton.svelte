<!-- src/lib/components/AccountButton.svelte -->
<script>
  let isLoggedIn = true;
  let accountText = "Log in";

  function logout() {
    isLoggedIn = false;
  }
</script>

{#if isLoggedIn}
  <div class="dropdown dropdown-left">
    <button class="btn btn-accent">{accountText}</button>
  </div>
{/if}

{#if !isLoggedIn}
  <button class="btn btn-primary">Log in</button>
{/if}
