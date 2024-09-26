<!-- src/lib/components/AccountButton.svelte -->
<script>
  let isLoggedIn = true;
  let user = { name: 'John Doe', xp: 500 };

  function logout() {
    isLoggedIn = false;
  }
</script>

<div class="absolute top-4 right-4">
  {#if isLoggedIn}
    <div class="dropdown dropdown-left">
      <button class="btn btn-base-200">{user.name} (500 XP)</button>
      <ul class="dropdown-content p-2 shadow bg-base-100 rounded-box w-52">
        <li><a on:click={logout}>Log out</a></li>
      </ul>
    </div>
  {/if}

  {#if !isLoggedIn}
    <button class="btn btn-primary">Log in</button>
  {/if}
</div>