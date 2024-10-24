<script>
    import { page } from "$app/stores";

    $effect(() => {
        if (typeof gtag !== "undefined") {
            gtag("config", "G-DXD64B7ZDX", {
                page_title: document.title,
                page_path: $page.url.pathname,
                cookie_domain: location.hostname,
                cookie_flags: "SameSite=None; Secure",
            });
        }
    });
</script>

<svelte:head>
    <script
        src="https://www.googletagmanager.com/gtag/js?id=G-DXD64B7ZDX"
        async></script>
    <script>
        try {
            window.dataLayer = window.dataLayer || [];
            window["gtag_enable_tcf_support"] = true; // TFC support means, that GA4 will communicate with other consent screens / CMPs

            function gtag() {
                dataLayer.push(arguments);
            }

            gtag("js", new Date());
            gtag("config", "G-DXD64B7ZDX", {
                cookie_domain: location.hostname,
                cookie_flags: "SameSite=None; Secure",
            });
        } catch (error) {
            console.error("Error loading Google Analytics:", error);
        }
    </script>
</svelte:head>
