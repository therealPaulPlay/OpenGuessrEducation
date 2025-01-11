<script>
    import ArticleTip from "$lib/components/ArticleTip.svelte";
    import GuideQuiz from "$lib/components/GuideQuiz.svelte";
</script>

<h1 class="text-4xl font-bold mb-4">Highway Naming Conventions in Kanada, North America, Brazil and Australia</h1>

<p class="mb-2">
    Understanding highway naming conventions is crucial for navigation and geographical identification. This guide covers the naming systems used in <b>North America</b> (USA and Canada), <b>Brazil</b>, and <b>Australia</b>, highlighting state abbreviations and unique identifiers.
</p>

<ArticleTip>
    Keep in mind that highway naming conventions can vary significantly between regions, so it's essential to familiarize yourself with local practices.
</ArticleTip>

<h2 class="text-2xl font-bold mt-8 mb-2">North America</h2>

<h3 class="text-xl font-bold mt-4 mb-2">United States</h3>
<p class="mb-2">
    In the United States, highways are typically designated by a number, often preceded by a letter indicating the type of road. For example:
</p>
<ul class="mb-2 list-disc list-inside">
    <li><b>I-95:</b> Interstate 95 runs along the East Coast.</li>
    <li><b>US 66:</b> Historic Route 66, known as "Main Street of America."</li>
    <li><b>SR 520:</b> State Route 520 in Washington State.</li>
    <li><b>AR-15:</b> Arkansas Highway 15.</li>
</ul>
<p class="mb-2">
    Highways are often numbered such that odd numbers run north-south and even numbers run east-west. State highways may also include the state abbreviation, such as <b>CA-1</b> for California Highway 1.
</p>

<h3 class="text-xl font-bold mt-4 mb-2">Canada</h3>
<p class="mb-2">
    Canadian highways follow a similar convention to the United States but often include the province's abbreviation. For example:
</p>
<ul class="mb-2 list-disc list-inside">
    <li><b>ON-401:</b> Ontario Highway 401, one of the busiest highways in North America.</li>
    <li><b>AB-2:</b> Alberta Highway 2, a major north-south route.</li>
    <li><b>PTH 1:</b> Provincial Trunk Highway 1 in Manitoba, part of the Trans-Canada Highway.</li>
</ul>
<p class="mb-2">
    The Trans-Canada Highway is a significant route that crosses all provinces, marked as <b>TCH</b>. Provincial highways often use different designations depending on the province (e.g., "Hwy" or "Rte").
</p>

<h2 class="text-2xl font-bold mt-8 mb-2">Brazil</h2>
<p class="mb-2">
    In Brazil, federal highways are designated with the prefix <b>BR</b>, followed by a number (e.g., <b>BR-101</b>). State highways typically follow the format of <b>YY-XXX</b>, where YY is the state's abbreviation and XXX is a number. For example:
</p>
<ul class="mb-2 list-disc list-inside">
    <li><b>SP-280:</b> São Paulo State Highway 280.</li>
    <li><b>RJ-116:</b> Rio de Janeiro State Highway 116.</li>
    <li><b>PR-323:</b> Paraná State Highway 323.</li>
</ul>
<p class="mb-2">
    The first digit of the number can indicate its category within the National Road System. For instance, numbers below 50 are typically located east of Brasília, while those above are found to the west. Specifically:
</p>
<ul class="mb-2 list-disc list-inside">
    <li><b>000-099:</b> Radial highways that run from Brasília to the edges of the country.</li>
    <li><b>100-199:</b> Longitudinal highways that run in a north-south direction.</li>
    <li><b>200-299:</b> Transversal highways that run in an east-west direction.</li>
    <li><b>300-399:</b> Diagonal highways that cross the country in two ways: northwest-southeast or northeast-southwest.</li>
    <li><b>400-499:</b> Connecting highways that interconnect two major highways.</li>
</ul>
<p class="mb-2">
    For example, the BR-101 is a major longitudinal highway running along the eastern coast, while the BR-230 (Transamazônica) runs from east to west across northern Brazil. Additionally, some states, like Santa Catarina (SC), have their local numbering systems that align with national ones, creating a sequence of numbers for easier navigation.
</p>
<p class="mb-2">
    Understanding these numbering conventions can greatly assist in identifying your location while navigating Brazilian roads.
</p>

<h2 class="text-2xl font-bold mt-8 mb-2">Australia</h2>
<p class="mb-2">
    Australian highways are designated using a combination of letters and numbers. Major highways are often prefixed with an "M" for motorway or "A" for national routes. For example:
</p>
<ul class="mb-2 list-disc list-inside">
    <li><b>M1:</b> The major motorway connecting cities along Australia's east coast.</li>
    <li><b>A1:</b> The national route that circumnavigates Australia.</li>
    <li><b>B100:</b> A regional road designation.</li>
</ul>
<p class="mb-2">
    Each state may also have its own numbering system for local roads, which can include state abbreviations (e.g., "NSW" for New South Wales).
</p>

<h3 class="text-xl font-bold mt-4 mb-2">Exceptions and Unique Cases</h3>
<p class="mb-2">
    While most highways follow these conventions, there are exceptions. For instance:
</p>
<ul class="mb-2 list-disc list-inside">
    <li><b>RP</b>: In Argentina, this designation refers to provincial routes that do not fit into a state system due to the country's administrative structure.</li>
    <li><b>BR</b>: While Brazil has a structured system, some roads may not follow typical conventions based on local regulations or historical reasons.</li>
</ul>

<h3 class="text-xl font-bold mt-4 mb-2">Common Abbreviations for Highways Worldwide</h3>
<ul class="mb-2 list-disc list-inside">
    <li><b>I:</b> Interstate (USA)</li>
    <li><b>US:</b> United States Route (USA)</li>
    <li><b>S:</b> State Route (USA)</li>
    <li><b>PTH:</b> Provincial Trunk Highway (Canada)</li>
    <li><b>ON:</b> Ontario (Canada)</li>
    <li><b>AB:</b> Alberta (Canada)</li>
    <li><b>BR:</b> Brazilian Federal Highway (Brazil)</li>
    <li><b>SP:</b> São Paulo State Highway (Brazil)</li>
    <li><b>M:</b> Motorway (Australia)</li>
    <li><b>A:</b> National Route (Australia)</li>
    <li><b>RP:</b> Ruta Provincial (Argentina)</li>
    <li><b>E:</b> European Route (Europe)</li>
</ul>

<h3 class="text-xl font-bold mt-4 mb-2">State Abbreviations for Highways</h3>
<ul class="mb-2 list-disc list-inside">
    <b>United States:</b>
        <li><b>AL:</b> Alabama</li>
        <li><b>AK:</b> Alaska</li>
        <li><b>AZ:</b> Arizona</li>
        <li><b>AR:</b> Arkansas</li>
        <li><b>CA:</b> California</li>
        <li><b>CO:</b> Colorado</li>
        <li><b>CT:</b> Connecticut</li>
        <li><b>DE:</b> Delaware</li>
        <li><b>FL:</b> Florida</li>
        <li><b>GA:</b> Georgia</li>
        <li><b>HI:</b> Hawaii</li>
        <li><b>ID:</b> Idaho</li>
        <li><b>IL:</b> Illinois</li>
        <li><b>IN:</b> Indiana</li>
        <li><b>IA:</b> Iowa</li>
        <li><b>KS:</b> Kansas</li>
        <li><b>KY:</b> Kentucky</li>
        <li><b>LA:</b> Louisiana</li>
        <li><b>ME:</b> Maine</li>
        <li><b>MD:</b> Maryland</li>
        <li><b>MA:</b> Massachusetts</li>
        <li><b>MI:</b> Michigan</li>
        <li><b>MN:</b> Minnesota</li>
        <li><b>MS:</b> Mississippi</li>
        <li><b>MO:</b> Missouri</li>
        <li><b>MT:</b> Montana</li>
        <li><b>NE:</b> Nebraska</li>
        <li><b>NV:</b> Nevada</li>
        <li><b>NH:</b> New Hampshire</li>
        <li><b>NJ:</b> New Jersey</li>
        <li><b>NM:</b> New Mexico</li>
        <li><b>NY:</b> New York</li>
        <li><b>NC:</b> North Carolina</li>
        <li><b>ND:</b> North Dakota</li>
        <li><b>OH:</b> Ohio</li>
        <li><b>OK:</b> Oklahoma</li>
        <li><b>OR:</b> Oregon</li>
        <li><b>PA:</b> Pennsylvania</li>
        <li><b>RI:</b> Rhode Island</li>
        <li><b>SC:</b> South Carolina</li>
        <li><b>SD:</b> South Dakota</li>
        <li><b>TN:</b> Tennessee</li>
        <li><b>TX:</b> Texas</li>
        <li><b>UT:</b> Utah</li>
        <li><b>VT:</b> Vermont</li>
        <li><b>VA:</b> Virginia</li>
        <li><b>WA:</b> Washington</li>
        <li><b>WV:</b> West Virginia</li>
        <li><b>WI:</b> Wisconsin</li>
        <li><b>WY:</b> Wyoming</li>

    <b>Canada:</b>
        <li><b>AB:</b> Alberta</li>
        <li><b>BC:</b> British Columbia</li>
        <li><b>MB:</b> Manitoba</li>
        <li><b>NB:</b> New Brunswick</li>
        <li><b>NL:</b> Newfoundland and Labrador</li>
        <li><b>NT:</b> Northwest Territories</li>
        <li><b>NS:</b> Nova Scotia</li>
        <li><b>NU:</b> Nunavut</li>
        <li><b>ON:</b> Ontario</li>
        <li><b>PE:</b> Prince Edward Island</li>
        <li><b>PQ:</b> Quebec</li>
        <li><b>SK:</b> Saskatchewan</li>
        <li><b>YT:</b> Yukon Territory</li>

    <b>Brazil:</b>
        <li><b>AC:</b> Acre</li>
        <li><b>AL:</b> Alagoas</li>
        <li><b>AP:</b> Amapá</li>
        <li><b>AM:</b> Amazonas</li>
        <li><b>BA:</b> Bahia</li>
        <li><b>CE:</b> Ceará</li>
        <li><b>DF:</b> Distrito Federal</li>
        <li><b>ES:</b> Espírito Santo</li>
        <li><b>GO:</b> Goiás</li>
        <li><b>MA:</b> Maranhão</li>
        <li><b>MT:</b> Mato Grosso</li>
        <li><b>MS:</b> Mato Grosso do Sul</li>
        <li><b>MG:</b> Minas Gerais</li>
        <li><b>PA:</b> Pará</li>
        <li><b>PB:</b> Paraíba</li>
        <li><b>PR:</b> Paraná</li>
        <li><b>PE:</b> Pernambuco</li>
        <li><b>PI:</b> Piauí</li>
        <li><b>RJ:</b> Rio de Janeiro</li>
        <li><b>RS:</b> Rio Grande do Sul</li>
        <li><b>SC:</b> South Carolina</li>
        <li><b>SP:</b> São Paulo</li>
        <li><b>SE:</b> Sergipe</li>
        <li><b>TO:</b> Tocantins</li>
</ul>

<GuideQuiz
    question="Where could the highway 'NY-8' be located?"
    answerOne="North Carolina"
    answerTwo="Kansas"
    answerThree="New York"
    answerFour="Texas"
    correctAnswer={3}>
</GuideQuiz>

<p class="italic mt-4">This guide aims to provide an overview of highway naming conventions across different regions. Always check local resources for specific information related to highway navigation.</p>

<p class="italic mt-4">Written by w0lfzk1nd from the Discord Server</p>
