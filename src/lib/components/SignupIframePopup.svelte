<script>
	import { onMount } from "svelte";
	import { X } from "lucide-svelte";
	import { isAuthenticated, username, supporterLevel, experience, signupPopupOpen } from "$lib/stores/accountData.js";

	let error = $state("No error");
	let showError = $state(false);
	let loadIframeSource = $state(false);

	// Global function that changes everything to logged in or signed out
	async function checkAuthenticationStatus() {
		const bearerToken = localStorage.getItem("bearer");

		if (bearerToken) {
			if (isTokenExpired(bearerToken)) {
				isAuthenticated.set(false);
				localStorage.removeItem("bearer");
				localStorage.removeItem("id");
				displayError("Your auth token has expired. Please log in again.");
			} else {
				isAuthenticated.set(true);

				const user = await getUser(Number(localStorage.getItem("id")) || null);

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
			return Date.now() >= exp * 1000;
		} catch {
			return false;
		}
	}

	function displayError(errorParam) {
		error = errorParam;
		showError = true;
		setTimeout(() => (showError = false), 2000);
	}

	async function getUser(userId) {
		try {
			const response = await fetch(`https://accounts.openguessr.com/accounts/user/${userId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("bearer")}`,
				},
			});

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

	function closeModal() {
		signupPopupOpen.set(false);
		loadIframeSource = false;
	}

	// Reactive effect to handle popup state changes
	$effect(() => {
		if ($signupPopupOpen) loadIframeSource = true;
	});

	onMount(() => {
		checkAuthenticationStatus();

		// Iframe messages
		window.onmessage = function (e) {
			try {
				const data = String(e.data);

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

{#if showError}
	<div class="toast toast-top toast-end max-w-2/3">
		<div class="alert alert-error">
			<span>Error: {error}</span>
		</div>
	</div>
{/if}

<dialog class="modal" class:modal-open={$signupPopupOpen}>
	<div class="modal-box max-w-2xl w-full h-full max-h-200 p-0 relative overflow-hidden">
		<div class="flex items-center justify-between p-4 border-b border-base-300 bg-base-100 flex-shrink-0">
			<h3 class="text-lg font-semibold">Login or Sign Up</h3>
			<button class="btn btn-sm btn-ghost btn-circle" onclick={closeModal}>
				<X class="w-4 h-4" />
			</button>
		</div>

		<div class="w-full flex-1 overflow-hidden" style="height: calc(100% - 4rem);">
			<iframe
				src={loadIframeSource ? "https://openguessr.com/signup" : ""}
				class="w-full h-full {loadIframeSource ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 border-0"
				title="Login and Sign up"
				referrerpolicy="no-referrer-when-downgrade"
			></iframe>
		</div>
	</div>

	<form method="dialog" class="modal-backdrop">
		<button onclick={closeModal}>close</button>
	</form>
</dialog>
