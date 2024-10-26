<!-- src/lib/components/AccountButton.svelte -->
<script>
  import { onMount } from "svelte";
  import { CircleUserRound } from "lucide-svelte";
  import { isAuthenticated } from "$lib/stores/accountData.js";

  let isLoggedIn = $state(false);

  let username = $state("Guest");
  let userId = "-1";
  let experience = $state("0");
  let supporterLevel = $state(0);

  let error = $state("No error");

  let showError = $state(false);

  // Global function that changes everything to logged in or signed out (all other sign-in functions are related to this)
  async function checkAuthenticationStatus() {
    let bearerToken = localStorage.getItem("bearer");

    if (bearerToken != null && bearerToken != "") {
      if (isTokenExpired(bearerToken)) {
        isLoggedIn = false;
        resetLocalSave();
      } else {
        isLoggedIn = true;
        userId = localStorage.getItem("id") || "-1";
        username = localStorage.getItem("username") || "Guest";

        // Set store data
        isAuthenticated.set(true);

        // Load basic details
        const user = await getUser();
        
        if (user) {
          experience = user?.experience;
          username = user?.userName;
          supporterLevel = user?.supporter_level;
        }

        // Save experience to localstorage
        localStorage.setItem("experience", experience);
        localStorage.setItem("supporterLevel", supporterLevel);
      }
    } else {
      isLoggedIn = false;
    }
  }

  function isTokenExpired(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );

    try {
      const { exp } = JSON.parse(jsonPayload);
      const expired = Date.now() >= exp * 1000;
      return expired;
    } catch {
      expired = false;
      return expired;
    }
  }

  function resetLocalSave() {
    localStorage.removeItem("bearer");
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("experience");
  }

  function logOut() {
    isLoggedIn = false;
    resetLocalSave();
  }

  function displayError() {
    showError = true;

    setTimeout(() => (showError = false), 2000);
  }

  export async function getUser() {
    try {
      const response = await fetch(
        `https://accounts.openguessr.com/accounts/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("bearer")}`,
          },
        },
      );

      // Check if the response is successful
      if (response.ok) {
        const data = await response.json();
        return data?.user;
      } else {
        console.error("Fetch failed:", response.status);
        error = response.status;
        displayError();
      }
    } catch (error) {
      console.error("Error occurred while fetching the user: ", error);
      error = error;
      displayError();
    }
  }

  onMount(() => {
    checkAuthenticationStatus();
  });
</script>

{#if isLoggedIn}
  <div class="dropdown dropdown-top dropdown-end">
    <div tabindex="0" role="button" class="btn btn-accent">
      <CircleUserRound />
    </div>
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <ul
      tabindex="0"
      class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-md mb-3">
      <div class="flex justify-center items-center mb-5 flex-col gap-x-2">
        <h3 class="font-bold text-lg text-wrap truncate max-w-36 text-center">
          Hey, {username}
        </h3>
        <p>{experience.toLocaleString()} XP</p>
        {#if supporterLevel > 0}
        <div class="badge badge-outline text-xs mt-0.5">TIER {supporterLevel} SUPPORTER</div>
        {/if}
      </div>
      <div class="bg-base-200 rounded-lg p-2 text-center mb-3">
        View and manage your account on <a
          href="https://openguessr.com"
          class="text-secondary">OpenGuessr</a
        >.
      </div>
      <li>
        <button class="btn btn-sm btn-primary text-white" onclick={logOut}>
          Log out
        </button>
      </li>
    </ul>
  </div>
{/if}

{#if !isLoggedIn}
  <a class="btn btn-accent" href="https://openguessr.com/signup">Log in</a>
{/if}

{#if showError}
  <div class="toast toast-top toast-start">
    <div class="alert alert-error">
      <span>Error: {error}</span>
    </div>
  </div>
{/if}
