<!-- src/lib/components/AccountButton.svelte -->
<script>
  import { onMount } from "svelte";
  import { CircleUserRound, LogIn } from "lucide-svelte";
  import { isAuthenticated } from "$lib/stores/accountData.js";

  let username = $state("Guest");
  let userId = "-1";
  let experience = $state("0");
  let supporterLevel = $state(0);

  let error = $state("No error");
  let showError = $state(false);
  let loadIframeSource = $state(false);

  // Global function that changes everything to logged in or signed out (all other sign-in functions are related to this)
  async function checkAuthenticationStatus() {
    let bearerToken = localStorage.getItem("bearer");

    if (bearerToken) {
      if (isTokenExpired(bearerToken)) {
        isAuthenticated.set(false);
        resetLocalSave();
      } else {
        // Set store data
        isAuthenticated.set(true);

        userId = localStorage.getItem("id") || "-1";

        // Load basic details
        const user = await getUser();

        if (user) {
          experience = user?.experience;
          username = user?.userName;
          supporterLevel = user?.supporter_level;
          username = user?.userName;
        }

        // Save certain user values to localstorage
        localStorage.setItem("username", username);
        localStorage.setItem("experience", experience);
        localStorage.setItem("supporterLevel", supporterLevel);
      }
    } else {
      isAuthenticated.set(false);
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
    localStorage.removeItem("supporterLevel");
  }

  function logOut() {
    isAuthenticated.set(false);
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

  function showModal() {
    loadIframeSource = true;
    login_modal.showModal();
  }

  onMount(() => {
    checkAuthenticationStatus();

    // Iframe messages
    window.onmessage = function (e) {
      try {
        const data = String(e.data); // Ensure data is a string

        switch (true) {
          case data === "close":
            login_modal.close();
            loadIframeSource = false;
            break;
          case data.includes("token"):
            localStorage.setItem("bearer", data.replace("token ", ""));
            break;
          case data.includes("id"):
            localStorage.setItem("id", data.replace("id ", ""));
            break;
          case data == "loadAccountStatus":
            setTimeout(() => {
              checkAuthenticationStatus();
            }, 200);
            break;
        }
      } catch (error) {
        console.error("Error processing window message: " + error);
      }
    };
  });
</script>

{#if $isAuthenticated}
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
          <div class="badge badge-outline text-xs mt-0.5">
            TIER {supporterLevel} SUPPORTER
          </div>
        {/if}
      </div>
      <div class="bg-base-200 rounded-lg p-2 text-center mb-3">
        View and manage your account on <a
          href="https://openguessr.com"
          target="_blank"
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

{#if !$isAuthenticated}
  <button class="btn btn-accent" onclick={showModal}>Log in <LogIn /></button>
{/if}

{#if showError}
  <div class="toast toast-top toast-start">
    <div class="alert alert-error">
      <span>Error: {error}</span>
    </div>
  </div>
{/if}

<dialog id="login_modal" class="modal h-full w-[calc(100vw-1rem)] mx-2 p-0">
  <dialog id="my_modal_2" class="modal"></dialog>
  <div class="modal-box h-[98%] max-h-full w-full p-0 bg-base-200">
    <iframe
      src={loadIframeSource ? "https://openguessr.com/signup" : ""}
      class="w-full h-full {loadIframeSource
        ? 'opacity-100'
        : 'opacity-0'} transition-opacity duration-500"
      title="Login and Sign up"
      referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
</dialog>
