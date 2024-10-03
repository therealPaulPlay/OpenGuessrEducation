<script>
    import { page } from "$app/stores";

    $: {
        if (typeof gtag !== "undefined") {
            gtag("config", "G-DXD64B7ZDX", {
                page_title: document.title,
                page_path: $page.url.pathname,
                cookie_domain: location.hostname,
                cookie_flags: "SameSite=None; Secure",
            });
        }
    }
</script>

<svelte:head>
    <script src="https://www.googletagmanager.com/gtag/js?id=G-DXD64B7ZDX" async></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag("js", new Date());
        gtag("config", "G-DXD64B7ZDX", {
            cookie_domain: location.hostname,
            cookie_flags: "SameSite=None; Secure",
        });
    </script>
</svelte:head>
