<script>
	import { onMount } from "svelte";
	import { CircleUserRound, LogIn, X } from "lucide-svelte";
	import { experience, isAuthenticated, supporterLevel, username } from "$lib/stores/accountData.js";

	let userId = null;
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
				displayError("Your auth token has expired. Please log in again.");
			} else {
				// Set store data
				isAuthenticated.set(true);
				userId = Number(localStorage.getItem("id")) || null;

				// Load basic details
				const user = await getUser();

				// Save certain user values to localstorage
				if (user?.userName) username.set(user.userName);
				if (user?.supporterLevel) supporterLevel.set(user.supporterLevel);
				if (user?.experience) experience.set(user.experience);
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
	}

	function logOut() {
		isAuthenticated.set(false);
		resetLocalSave();
	}

	function displayError(errorParam) {
		error = errorParam;
		showError = true;
		setTimeout(() => (showError = false), 2000);
	}

	export async function getUser() {
		try {
			const response = await fetch(`https://accounts.openguessr.com/accounts/user/${userId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("bearer")}`,
				},
			});

			// Check if the response is successful
			if (response.ok) {
				const data = await response.json();
				return data?.user;
			} else {
				console.error("Fetch failed:", response.status);
				displayError(response.status);
			}
		} catch (error) {
			console.error("Error occurred while fetching the user: ", error);
			displayError(error);
		}
	}

	function showModal() {
		loadIframeSource = true;
		login_modal.showModal();
	}

	function closeModal() {
		login_modal.close();
		loadIframeSource = false;
	}

	onMount(() => {
		checkAuthenticationStatus();

		// Iframe messages
		window.onmessage = function (e) {
			try {
				const data = String(e.data); // Ensure data is a string

				switch (true) {
					case data === "close":
						closeModal();
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
						}, 250);
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
		<div tabindex="0" role="button" class="btn bg-base-300">
			<CircleUserRound />
		</div>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow-md mb-3">
			<div class="flex justify-center items-center mb-5 flex-col gap-x-2">
				<h3 class="font-bold text-lg text-wrap truncate max-w-36 text-center">
					Hey, {$username}
				</h3>
				<p>{$experience.toLocaleString()} XP</p>
				{#if $supporterLevel > 0}
					<div class="badge badge-outline text-xs mt-0.5">
						TIER {$supporterLevel} SUPPORTER
					</div>
				{/if}
			</div>
			<div class="bg-base-200 rounded-md p-2 text-center mb-3">
				View and manage your account on <a href="https://openguessr.com" target="_blank" class="text-secondary"
					>OpenGuessr</a
				>.
			</div>
			<li>
				<button class="btn btn-primary text-white" onclick={logOut}> Log out </button>
			</li>
		</ul>
	</div>
{/if}

{#if !$isAuthenticated}
	<button class="btn bg-base-300" onclick={showModal}>Log in <LogIn /></button>
{/if}

{#if showError}
	<div class="toast toast-top toast-start max-w-2/3">
		<div class="alert alert-error">
			<span>Error: {error}</span>
		</div>
	</div>
{/if}

<dialog id="login_modal" class="modal">
	<div class="modal-box max-w-2xl w-full h-full max-h-200 p-0 relative overflow-hidden">
		<!-- Header with close button -->
		<div class="flex items-center justify-between p-4 border-b border-base-300 bg-base-100 flex-shrink-0">
			<h3 class="text-lg font-semibold">Login or Sign Up</h3>
			<button class="btn btn-sm btn-ghost btn-circle" onclick={closeModal}>
				<X class="w-4 h-4" />
			</button>
		</div>

		<!-- iframe content -->
		<div class="w-full flex-1 overflow-hidden" style="height: calc(100% - 4rem);">
			<iframe
				src={loadIframeSource ? "https://openguessr.com/signup" : ""}
				class="w-full h-full {loadIframeSource ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 border-0"
				title="Login and Sign up"
				referrerpolicy="no-referrer-when-downgrade"
			></iframe>
		</div>
	</div>

	<!-- Backdrop - clicking outside closes modal -->
	<form method="dialog" class="modal-backdrop">
		<button onclick={closeModal}>close</button>
	</form>
</dialog>
