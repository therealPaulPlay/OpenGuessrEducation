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
                // Disable data collection if the user hasn't consented
                ad_storage: hasConsent ? "granted" : "denied",
                ad_personalization: hasConsent ? "granted" : "denied",
                ad_user_data: hasConsent ? "granted" : "denied",
                analytics_storage: hasConsent ? "granted" : "denied",
            });
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
        loadGoogleAnalytics(false);
        showBanner = false;
    }
</script>

<svelte:head>
    <script
        src="https://www.googletagmanager.com/gtag/js?id=G-DXD64B7ZDX" async>
    </script>
</svelte:head>

{#if showBanner}
    <div role="alert" class="alert fixed w-fit m-2 bottom-2 right-2">
        <AlertCircle className="stroke-info h-6 w-6 shrink-0" />
        <span>This website uses cookies according to these <a href="https://openguessr.com/legal/" class="text-secondary">policies</a>.</span>
        <div class="flex flex-wrap gap-2">
            <button onclick={handleDeny} class="btn btn-sm btn-accent"
                >Only essential</button>
            <button onclick={handleAccept} class="btn btn-sm btn-secondary"
                >Accept</button>
        </div>
    </div>
{/if}
