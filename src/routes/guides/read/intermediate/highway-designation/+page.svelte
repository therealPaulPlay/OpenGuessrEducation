<script>
    import ArticleTip from "$lib/components/ArticleTip.svelte";
    import GuideQuiz from "$lib/components/GuideQuiz.svelte";
</script>

<h1 class="text-4xl font-bold mb-4">Highway Designations</h1>

<p class="mb-2">
    Understanding highway naming conventions is crucial for navigation and geographical identification.<br>
    This guide covers the naming systems used in <b>North America</b> (USA and Canada), <b>Brazil</b>, and <b>Australia</b>, highlighting state abbreviations and unique identifiers.
</p>

<ArticleTip>
    Keep in mind that highway naming conventions can vary significantly between regions, so it's essential to familiarize yourself with local practices.
</ArticleTip>

<h2 class="text-2xl font-bold mt-8 mb-2">North America</h2>

<h3 class="text-xl font-bold mt-4 mb-2">United States</h3>
<p class="mb-2">
    In the United States, highways are typically designated by a number, often preceded by a letter indicating the type of road.<br>
    For example:
</p>
<ul class="mb-2 list-disc list-inside">
    <li><b>I-95:</b> Interstate 95 runs along the East Coast.</li>
    <li><b>US 66:</b> Historic Route 66, known as "Main Street of America."</li>
    <li><b>SR 520:</b> State Route 520 in Washington State.</li>
    <li><b>AR-15:</b> Arkansas Highway 15.</li>
</ul>
<p class="mb-2">
    Highways are often numbered such that <b>odd numbers run north-south</b> and <b>even numbers run east-west.</b><br>
    State highways may also include the state abbreviation, such as <b>CA-1</b> for California Highway 1.
</p>

<h3 class="text-xl font-bold mt-4 mb-2">Canada</h3>
<p class="mb-2">
    Canadian highways follow a <b><i>similar convention to the United States</i></b> but often <b>include the province's abbreviation.</b><br>
    For example:
</p>
<ul class="mb-2 list-disc list-inside">
    <li><b>ON-401:</b> Ontario Highway 401, one of the busiest highways in North America.</li>
    <li><b>AB-2:</b> Alberta Highway 2, a major north-south route.</li>
    <li><b>PTH 1:</b> Provincial Trunk Highway 1 in Manitoba, part of the Trans-Canada Highway.</li>
</ul>
<p class="mb-2">
    The Trans-Canada Highway is a significant route that crosses all provinces, marked as <b>TCH</b>.<br>
    Provincial highways often use different designations depending on the province <i>(e.g., "Hwy" or "Rte")</i>.
</p>

<h2 class="text-2xl font-bold mt-8 mb-2">Brazil</h2>
<p class="mb-2">
    In Brazil, <b><i>federal highways</i></b> are designated with the prefix <b>BR</b>, followed by <b>a number</b> <i>(e.g., <b>BR-101</b>)</i>.<br>
    <b><i>State highways</i></b> typically follow the format of <b>YY-XXX</b>, where YY is the state's abbreviation and XXX is a number.<br>
    For example:
</p>
<ul class="mb-2 list-disc list-inside">
    <li><b>SP-280:</b> São Paulo State Highway 280.</li>
    <li><b>RJ-116:</b> Rio de Janeiro State Highway 116.</li>
    <li><b>PR-323:</b> Paraná State Highway 323.</li>
</ul>
<p class="mb-2">
    The first digit of the number can indicate its category within the National Road System.<br>
    For instance, numbers <b><i>below 50</i></b> are typically located <b>east of Brasília</b>,<br>
    while those <b><i>above 50</i></b> are found to <b>the west.</b><br>
    Specifically:
</p>
<ul class="mb-2 list-disc list-inside">
    <li><b>000-099:</b> Radial highways that run <b>from Brasília to the edges</b> of the country.</li>
    <li><b>100-199:</b> Longitudinal highways that run in a <b>north-south direction.</b></li>
    <li><b>200-299:</b> Transversal highways that run in an <b>east-west direction.</b></li>
    <li><b>300-399:</b> <b>Diagonal highways</b> that cross the country <i>in two ways</i>: <b><i>northwest-southeast or northeast-southwest.</i></b></li>
    <li><b>400-499:</b> <b>Connecting highways</b> that interconnect two major highways.</li>
</ul>
<p class="mb-2">
    For example, the <b><i>BR-101</i></b> is a major <b>longitudinal highway</b> running along the <b>eastern coast</b>,<br>
    while the <b><i>BR-230</i></b> <i>(Transamazônica)</i> runs from <b>east to west across northern Brazil</b>.<br>
    Additionally, some states, like <b><i>Santa Catarina (SC)</i></b>, have their <b>local numbering systems</b> that align with national ones, creating a sequence of numbers for easier navigation.
</p>
<p class="mb-2">
    Understanding these numbering conventions can greatly assist in identifying your location while navigating Brazilian roads.
</p>

<h2 class="text-2xl font-bold mt-8 mb-2">Australia</h2>
<p class="mb-2">
    Australian highways are designated using a <b>combination of letters and numbers.</b><br>
    <b>Major highways</b> are often prefixed with an <b><i>"M" for motorway</i></b> or <b><i>"A" for national routes.</i></b><br>
    For example:
</p>
<ul class="mb-2 list-disc list-inside">
    <li><b>M1:</b> The major motorway connecting cities along <b>Australia's east coast.</b></li>
    <li><b>A1:</b> The national route that <b>circumnavigates Australia.</b></li>
    <li><b>B100:</b> A regional road designation.</li>
</ul>
<p class="mb-2">
    Each state may also have its own numbering system for local roads, which can include state abbreviations <i>(e.g., "NSW" for New South Wales)</i>.
</p>

<h3 class="text-xl font-bold mt-4 mb-2">Exceptions and Unique Cases</h3>
<p class="mb-2">
    While most highways follow these conventions, there are exceptions. For instance:
</p>
<ul class="mb-2 list-disc list-inside">
    <li><b>RP</b>: In <b>Argentina</b>, this designation refers to provincial routes that do not fit into a state system due to the country's administrative structure.</li>
    <li><b>BR</b>: While <b>Brazil</b> has a structured system, some roads may <b><i>not follow typical conventions</i></b> based on local regulations or historical reasons.</li>
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
        <li><b>AL:</b> Alabama <i>(South)</i></li>
        <li><b>AK:</b> Alaska <i>(West)</i></li>
        <li><b>AZ:</b> Arizona <i>(West)</i></li>
        <li><b>AR:</b> Arkansas <i>(South)</i></li>
        <li><b>CA:</b> California <i>(West)</i></li>
        <li><b>CO:</b> Colorado <i>(West)</i></li>
        <li><b>CT:</b> Connecticut <i>(Northeast)</i></li>
        <li><b>DE:</b> Delaware <i>(South)</i></li>
        <li><b>FL:</b> Florida <i>(South)</i></li>
        <li><b>GA:</b> Georgia <i>(South)</i></li>
        <li><b>HI:</b> Hawaii <i>(West)</i></li>
        <li><b>ID:</b> Idaho <i>(West)</i></li>
        <li><b>IL:</b> Illinois <i>(Midwest)</i></li>
        <li><b>IN:</b> Indiana <i>(Midwest)</i></li>
        <li><b>IA:</b> Iowa <i>(Midwest)</i></li>
        <li><b>KS:</b> Kansas <i>(Midwest)</i></li>
        <li><b>KY:</b> Kentucky <i>(South)</i></li>
        <li><b>LA:</b> Louisiana <i>(South)</i></li>
        <li><b>ME:</b> Maine <i>(Northeast)</i></li>
        <li><b>MD:</b> Maryland <i>(South)</i></li>
        <li><b>MA:</b> Massachusetts <i>(Northeast)</i></li>
        <li><b>MI:</b> Michigan <i>(Midwest)</i></li>
        <li><b>MN:</b> Minnesota <i>(Midwest)</i></li>
        <li><b>MS:</b> Mississippi <i>(South)</i></li>
        <li><b>MO:</b> Missouri <i>(Midwest)</i></li>
        <li><b>MT:</b> Montana <i>(West)</i></li>
        <li><b>NE:</b> Nebraska <i>(Midwest)</i></li>
        <li><b>NV:</b> Nevada <i>(West)</i></li>
        <li><b>NH:</b> New Hampshire <i>(Northeast)</i></li>
        <li><b>NJ:</b> New Jersey <i>(Northeast)</i></li>
        <li><b>NM:</b> New Mexico <i>(West)</i></li>
        <li><b>NY:</b> New York <i>(Northeast)</i></li>
        <li><b>NC:</b> North Carolina <i>(South)</i></li>
        <li><b>ND:</b> North Dakota <i>(Midwest)</i></li>
        <li><b>OH:</b> Ohio <i>(Midwest)</i></li>
        <li><b>OK:</b> Oklahoma <i>(South)</i></li>
        <li><b>OR:</b> Oregon <i>(West)</i></li>
        <li><b>PA:</b> Pennsylvania <i>(Northeast)</i></li>
        <li><b>RI:</b> Rhode Island <i>(Northeast)</i></li>
        <li><b>SC:</b> South Carolina <i>(South)</i></li>
        <li><b>SD:</b> South Dakota <i>(Midwest)</i></li>
        <li><b>TN:</b> Tennessee <i>(South)</i></li>
        <li><b>TX:</b> Texas <i>(South)</i></li>
        <li><b>UT:</b> Utah <i>(West)</i></li>
        <li><b>VT:</b> Vermont <i>(Northeast)</i></li>
        <li><b>VA:</b> Virginia <i>(South)</i></li>
        <li><b>WA:</b> Washington <i>(West)</i></li>
        <li><b>WV:</b> West Virginia <i>(South)</i></li>
        <li><b>WI:</b> Wisconsin <i>(Midwest)</i></li>
        <li><b>WY:</b> Wyoming <i>(West)</i></li>

    <b>Canada:</b>
        <li><b>AB:</b> Alberta <i>(West)</i></li>
        <li><b>BC:</b> British Columbia <i>(West)</i></li>
        <li><b>MB:</b> Manitoba <i>(Central Canada)</i></li>
        <li><b>NB:</b> New Brunswick <i>(East Canada)</i></li>
        <li><b>NL:</b> Newfoundland and Labrador <i>(East Canada)</i></li>
        <li><b>NT:</b> Northwest Territories <i>(North Canada)</i></li>
        <li><b>NS:</b> Nova Scotia <i>(East Canada)</i></li>
        <li><b>NU:</b> Nunavut <i>(North Canada)</i></li>
        <li><b>ON:</b> Ontario <i>(Central Canada)</i></li>
        <li><b>PE:</b> Prince Edward Island <i>(East Canada)</i></li>
        <li><b>QC:</b> Quebec <i>(East Canada)</i></li>
        <li><b>SK:</b> Saskatchewan <i>(Central Canada)</i></li>
        <li><b>YT:</b> Yukon Territory <i>(North Canada)</i></li>

    <b>Brazil:</b>
        <li><b>AC:</b> Acre <i>(North-West)</i></li>
        <li><b>AL:</b> Alagoas <i>(North-East)</i></li>
        <li><b>AP:</b> Amapá <i>(North)</i></li>
        <li><b>AM:</b> Amazonas <i>(North)</i></li>
        <li><b>BA:</b> Bahia <i>(North-East)</i></li>
        <li><b>CE:</b> Ceará <i>(North-East)</i></li>
        <li><b>DF:</b> Distrito Federal <i>(Central-West)</i></li>
        <li><b>ES:</b> Espírito Santo <i>(Southeast)</i></li>
        <li><b>GO:</b> Goiás <i>(Central-West)</i></li>
        <li><b>MA:</b> Maranhão <i>(North-East)</i></li>
        <li><b>MT:</b> Mato Grosso <i>(Central-West)</i></li>
        <li><b>MS:</b> Mato Grosso do Sul <i>(Central-West)</i></li>
        <li><b>MG:</b> Minas Gerais <i>(Southeast)</i></li>
        <li><b>PA:</b> Pará <i>(North)</i></li>
        <li><b>PB:</b> Paraíba <i>(North-East)</i></li>
        <li><b>PR:</b> Paraná <i>(South)</i></li>
        <li><b>PE:</b> Pernambuco <i>(North-East)</i></li>
        <li><b>PI:</b> Piauí <i>(North-East)</i></li>
        <li><b>RJ:</b> Rio de Janeiro <i>(Southeast)</i></li>
        <li><b>RS:</b> Rio Grande do Sul <i>(South)</i></li>
        <li><b>SC:</b> Santa Catarina <i>(South)</i></li>
        <li><b>SP:</b> São Paulo <i>(Southeast)</i></li>
        <li><b>SE:</b> Sergipe <i>(North-East)</i></li>
        <li><b>TO:</b> Tocantins <i>(North)</i></li>
</ul>

<GuideQuiz
    question="Where could the highway 'NY-8' be located?"
    answerOne="North Carolina"
    answerTwo="Kansas"
    answerThree="New York"
    answerFour="Texas"
    correctAnswer={3}>
</GuideQuiz>

<p class="italic mt-4">Written by w0lfzk1nd from the Discord Server</p>