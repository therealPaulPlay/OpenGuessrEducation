<script>
	import { onMount } from "svelte";
	import { page } from "$app/state";

	const GA_ID = "G-DXD64B7ZDX";

	let showBanner = $state(false);

	// Instead of a banner, if a TCF-enabled CMP already exists, use TCF instead
	// via window["gtag_enable_tcf_support"] = true;
	function gtag() {
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push(arguments);
	}

	onMount(() => {
		// Load cookie acceptance state
		const consent = localStorage.getItem("cookieConsent");
		if (consent === "true") loadGoogleAnalytics(true);
		else if (consent === "false") loadGoogleAnalytics(false);
		else {
			// New user, show banner
			showBanner = true;
			loadGoogleAnalytics(false);
		}
	});

	function loadGoogleAnalytics(hasConsent) {
		try {
			setConsent(hasConsent, false); // Set consent before JS init (required)
			gtag("js", new Date());
			gtag("config", GA_ID, {
				page_title: document.title,
				page_path: page.url.pathname,
				cookie_domain: page.url.hostname,
				cookie_flags: "SameSite=None; Secure",
			});
		} catch (error) {
			console.error("Error loading Google Analytics:", error);
		}
	}

	function setConsent(hasConsent, isUpdate = false) {
		const consentState = hasConsent ? "granted" : "denied";
		// Apply consent state
		gtag("consent", isUpdate ? "update" : "default", {
			ad_storage: consentState,
			ad_personalization: consentState,
			ad_user_data: consentState,
			analytics_storage: consentState,
		});
	}
</script>

<svelte:head>
	<script src="https://www.googletagmanager.com/gtag/js?id={GA_ID}" async></script>
</svelte:head>

{#if showBanner}
	<div
		role="alert"
		class="alert fixed w-fit m-4 bottom-0 bg-base-100 right-0 z-50 shadow-lg flex flex-wrap border border-accent pr-3!"
	>
		<span class="text-base"
			>This website uses cookies according to its <a
				href="https://openguessr.com/legal"
				class="text-secondary text-base">privacy policy</a
			>.</span
		>
		<div class="flex flex-wrap gap-2">
			<button
				onclick={() => {
					// Deny
					localStorage.setItem("cookieConsent", "false");
					showBanner = false;
				}}
				class="btn">Only essential</button
			>
			<button
				onclick={() => {
					// Accept
					localStorage.setItem("cookieConsent", "true");
					showBanner = false;
					setConsent(true, true);
				}}
				class="btn btn-secondary">Accept</button
			>
		</div>
	</div>
{/if}
