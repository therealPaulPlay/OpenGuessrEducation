<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { AlertCircle } from "lucide-svelte";

    let showBanner = $state(false);
    let cookieConsent = false;

    // Instead of a banner, if one CMP already exists (e.g. for Ads), use TFC instead to listen to the consent from there
    // window["gtag_enable_tcf_support"] = true;

    onMount(() => {
        // Check if the user has already accepted cookies
        const consent = localStorage.getItem("cookieConsent");
        if (consent) {
            cookieConsent = true;
            loadGoogleAnalytics(true);
        } else {
            showBanner = true;
            loadGoogleAnalytics(false);
        }
    });

    function loadGoogleAnalytics(hasConsent) {
        try {
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", "G-DXD64B7ZDX", {
                page_title: document.title,
                page_path: $page.url.pathname,
                cookie_domain: location.hostname,
                cookie_flags: "SameSite=None; Secure",
                // Deny data collection by default
                ad_storage: "denied",
                ad_personalization: "denied",
                ad_user_data: "denied",
                analytics_storage: "denied",
            });

            // Grant permissions if the user has accepted
            if (hasConsent) {
                gtag("config", "G-DXD64B7ZDX", {
                    ad_storage: "granted",
                    ad_personalization: "granted",
                    ad_user_data: "granted",
                    analytics_storage: "granted",
                });
            }
        } catch (error) {
            console.error("Error loading Google Analytics:", error);
        }
    }

    function handleAccept() {
        cookieConsent = true;
        localStorage.setItem("cookieConsent", "true");
        loadGoogleAnalytics(true);
        showBanner = false;
    }

    function handleDeny() {
        cookieConsent = false;
        localStorage.setItem("cookieConsent", "false");
        showBanner = false;
    }
</script>

<svelte:head>
    <script
        src="https://www.googletagmanager.com/gtag/js?id=G-DXD64B7ZDX"
        async></script>
</svelte:head>

{#if showBanner}
    <div
        role="alert"
        class="alert fixed w-fit m-4 bottom-0 bg-base-100 right-0 z-50 shadow-lg">
        <AlertCircle />
        <span
            >This website uses cookies according to its <a
                href="https://openguessr.com/legal"
                class="text-secondary">privacy policy</a
            >.</span>
        <div class="flex flex-wrap gap-2">
            <button onclick={handleDeny} class="btn btn-sm btn-accent"
                >Only essential</button>
            <button onclick={handleAccept} class="btn btn-sm btn-secondary"
                >Accept</button>
        </div>
    </div>
{/if}
