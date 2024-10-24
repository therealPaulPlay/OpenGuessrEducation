<script>
    import CountryLink from "$lib/components/CountryLink.svelte";
    import { Info } from "lucide-svelte";
</script>

<article class="container mx-auto p-6 px-1">
    <h1 class="text-5xl font-bold mb-6">Country Data</h1>

    <div class="outline outline-1 px-4 py-2 rounded-lg w-fit opacity-75 flex items-center justify-center gap-3 mb-10 leading-snug">
        <Info></Info>Use the search field in the sidebar to quickly find a country!
    </div>

    <div class="collapse collapse-arrow mb-10">
        <input type="checkbox" checked="true" />
        <div class="collapse-title p-0">
            <h2 class="text-3xl font-semibold">Europe</h2>
        </div>
        <div class="collapse-content p-0">
            <div class="flex flex-wrap w-full gap-3">
                <CountryLink country="Albania" />
                <CountryLink country="Andorra" />
                <CountryLink country="Austria" />
                <CountryLink country="Belarus" />
                <CountryLink country="Belgium" />
                <CountryLink country="Bosnia and Herzegovina" />
                <CountryLink country="Bulgaria" />
                <CountryLink country="Croatia" />
                <CountryLink country="Czechia" />
                <CountryLink country="Denmark" />
                <CountryLink country="Estonia" />
                <CountryLink country="Finland" />
                <CountryLink country="France" />
                <CountryLink country="Germany" />
                <CountryLink country="Greece" />
                <CountryLink country="Hungary" />
                <CountryLink country="Iceland" />
                <CountryLink country="Ireland" />
                <CountryLink country="Italy" />
                <CountryLink country="Kosovo" />
                <CountryLink country="Latvia" />
                <CountryLink country="Liechtenstein" />
                <CountryLink country="Lithuania" />
                <CountryLink country="Luxembourg" />
                <CountryLink country="Malta" />
                <CountryLink country="Moldova" />
                <CountryLink country="Monaco" />
                <CountryLink country="Montenegro" />
                <CountryLink country="Netherlands" />
                <CountryLink country="North Macedonia" />
                <CountryLink country="Norway" />
                <CountryLink country="Poland" />
                <CountryLink country="Portugal" />
                <CountryLink country="Romania" />
                <CountryLink country="San Marino" />
                <CountryLink country="Serbia" />
                <CountryLink country="Slovakia" />
                <CountryLink country="Slovenia" />
                <CountryLink country="Spain" />
                <CountryLink country="Sweden" />
                <CountryLink country="Switzerland" />
                <CountryLink country="United Kingdom" />
                <CountryLink country="Ukraine" />
                <CountryLink country="Vatican City" />
            </div>
        </div>
    </div>

    <div class="collapse collapse-arrow mb-10">
        <input type="checkbox" checked="true" />
        <div class="collapse-title p-0">
            <h2 class="text-3xl font-semibold">Asia</h2>
        </div>
        <div class="collapse-content p-0">
            <div class="flex flex-wrap w-full gap-3">
                <div class="flex flex-wrap w-full gap-3">
                    <CountryLink country="Afghanistan" />
                    <CountryLink country="Armenia" />
                    <CountryLink country="Azerbaijan" />
                    <CountryLink country="Bangladesh" />
                    <CountryLink country="Bhutan" />
                    <CountryLink country="Brunei" />
                    <CountryLink country="Cambodia" />
                    <CountryLink country="China" />
                    <CountryLink country="Cyprus" />
                    <CountryLink country="Georgia" />
                    <CountryLink country="India" />
                    <CountryLink country="Indonesia" />
                    <CountryLink country="Iran" />
                    <CountryLink country="Iraq" />
                    <CountryLink country="Israel" />
                    <CountryLink country="Japan" />
                    <CountryLink country="Jordan" />
                    <CountryLink country="Kazakhstan" />
                    <CountryLink country="Kuwait" />
                    <CountryLink country="Kyrgyzstan" />
                    <CountryLink country="Laos" />
                    <CountryLink country="Lebanon" />
                    <CountryLink country="Malaysia" />
                    <CountryLink country="Maldives" />
                    <CountryLink country="Mongolia" />
                    <CountryLink country="Myanmar" />
                    <CountryLink country="Nepal" />
                    <CountryLink country="North Korea" />
                    <CountryLink country="Oman" />
                    <CountryLink country="Pakistan" />
                    <CountryLink country="Palestine" />
                    <CountryLink country="Philippines" />
                    <CountryLink country="Qatar" />
                    <CountryLink country="Russia" />
                    <CountryLink country="Saudi Arabia" />
                    <CountryLink country="Singapore" />
                    <CountryLink country="South Korea" />
                    <CountryLink country="Sri Lanka" />
                    <CountryLink country="Syria" />
                    <CountryLink country="Taiwan" />
                    <CountryLink country="Tajikistan" />
                    <CountryLink country="Thailand" />
                    <CountryLink country="Timor-Leste" />
                    <CountryLink country="Turkey" />
                    <CountryLink country="Turkmenistan" />
                    <CountryLink country="United Arab Emirates" />
                    <CountryLink country="Uzbekistan" />
                    <CountryLink country="Vietnam" />
                    <CountryLink country="Yemen" />
                </div>
            </div>
        </div>
    </div>

    <div class="collapse collapse-arrow mb-10">
        <input type="checkbox" checked="true" />
        <div class="collapse-title p-0">
            <h2 class="text-3xl font-semibold">Africa</h2>
        </div>
        <div class="collapse-content p-0">
            <div class="flex flex-wrap w-full gap-3">
                <div class="flex flex-wrap w-full gap-3">
                    <CountryLink country="Algeria" />
                    <CountryLink country="Angola" />
                    <CountryLink country="Benin" />
                    <CountryLink country="Botswana" />
                    <CountryLink country="Burkina Faso" />
                    <CountryLink country="Burundi" />
                    <CountryLink country="Cameroon" />
                    <CountryLink country="Cape Verde" />
                    <CountryLink country="Central African Republic" />
                    <CountryLink country="Chad" />
                    <CountryLink country="Congo" />
                    <CountryLink country="Comoros" />
                    <CountryLink country="Democratic Republic of the Congo" />
                    <CountryLink country="Djibouti" />
                    <CountryLink country="Egypt" />
                    <CountryLink country="Equatorial Guinea" />
                    <CountryLink country="Eritrea" />
                    <CountryLink country="Eswatini" />
                    <CountryLink country="Ethiopia" />
                    <CountryLink country="Gabon" />
                    <CountryLink country="Gambia" />
                    <CountryLink country="Ghana" />
                    <CountryLink country="Guinea" />
                    <CountryLink country="Guinea-Bissau" />
                    <CountryLink country="Ivory Coast" />
                    <CountryLink country="Kenya" />
                    <CountryLink country="Lesotho" />
                    <CountryLink country="Liberia" />
                    <CountryLink country="Libya" />
                    <CountryLink country="Madagascar" />
                    <CountryLink country="Mauritius" />
                    <CountryLink country="Malawi" />
                    <CountryLink country="Mali" />
                    <CountryLink country="Mauritania" />
                    <CountryLink country="Morocco" />
                    <CountryLink country="Mozambique" />
                    <CountryLink country="Namibia" />
                    <CountryLink country="Niger" />
                    <CountryLink country="Nigeria" />
                    <CountryLink country="Rwanda" />
                    <CountryLink country="São Tomé and Príncipe" />
                    <CountryLink country="Senegal" />
                    <CountryLink country="Sierra Leone" />
                    <CountryLink country="Somalia" />
                    <CountryLink country="South Africa" />
                    <CountryLink country="Sudan" />
                    <CountryLink country="South Sudan" />
                    <CountryLink country="Seychelles" />
                    <CountryLink country="Tanzania" />
                    <CountryLink country="Togo" />
                    <CountryLink country="Western Sahara" />
                    <CountryLink country="Tunisia" />
                    <CountryLink country="Uganda" />
                    <CountryLink country="Zambia" />
                    <CountryLink country="Zimbabwe" />
                </div>
            </div>
        </div>
    </div>

    <div class="collapse collapse-arrow mb-10">
        <input type="checkbox" checked="true" />
        <div class="collapse-title p-0">
            <h2 class="text-3xl font-semibold">North America</h2>
        </div>
        <div class="collapse-content p-0">
            <div class="flex flex-wrap w-full gap-3">
                <div class="flex flex-wrap w-full gap-3">
                    <CountryLink country="Bahamas" />
                    <CountryLink country="Belize" />
                    <CountryLink country="Canada" />
                    <CountryLink country="Costa Rica" />
                    <CountryLink country="Cuba" />
                    <CountryLink country="Dominican Republic" />
                    <CountryLink country="El Salvador" />
                    <CountryLink country="Guatemala" />
                    <CountryLink country="Haiti" />
                    <CountryLink country="Honduras" />
                    <CountryLink country="Jamaica" />
                    <CountryLink country="Mexico" />
                    <CountryLink country="Nicaragua" />
                    <CountryLink country="Panama" />
                    <CountryLink country="United States" />
                </div>
            </div>
        </div>
    </div>

    <div class="collapse collapse-arrow mb-10">
        <input type="checkbox" checked="true" />
        <div class="collapse-title p-0">
            <h2 class="text-3xl font-semibold">South America</h2>
        </div>
        <div class="collapse-content p-0">
            <div class="flex flex-wrap w-full gap-3">
                <div class="flex flex-wrap w-full gap-3">
                    <CountryLink country="Argentina" />
                    <CountryLink country="Bolivia" />
                    <CountryLink country="Brazil" />
                    <CountryLink country="Chile" />
                    <CountryLink country="Colombia" />
                    <CountryLink country="Ecuador" />
                    <CountryLink country="Guyana" />
                    <CountryLink country="Paraguay" />
                    <CountryLink country="Peru" />
                    <CountryLink country="Suriname" />
                    <CountryLink country="Uruguay" />
                    <CountryLink country="Venezuela" />
                </div>
            </div>
        </div>
    </div>

    <div class="collapse collapse-arrow mb-20">
        <input type="checkbox" checked="true" />
        <div class="collapse-title p-0">
            <h2 class="text-3xl font-semibold">Oceania</h2>
        </div>
        <div class="collapse-content p-0">
            <div class="flex flex-wrap w-full gap-3">
                <div class="flex flex-wrap w-full gap-3">
                    <CountryLink country="Australia" />
                    <CountryLink country="Fiji" />
                    <CountryLink country="Marshall Islands" />
                    <CountryLink country="Micronesia" />
                    <CountryLink country="Nauru" />
                    <CountryLink country="New Caledonia" />
                    <CountryLink country="New Zealand" />
                    <CountryLink country="Palau" />
                    <CountryLink country="Papua New Guinea" />
                    <CountryLink country="Solomon Islands" />
                    <CountryLink country="Tuvalu" />
                    <CountryLink country="Vanuatu" />
                </div>
            </div>
        </div>
    </div>
</article>

<style>
</style>
