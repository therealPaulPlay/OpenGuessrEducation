<script>
	import ArticleTip from "$lib/components/ArticleTip.svelte";
	import GuideQuiz from "$lib/components/GuideQuiz.svelte";
</script>

<h1 class="text-4xl font-bold mb-4">Highway Designations</h1>

<p class="mb-2">
	Understanding highway naming conventions is crucial for navigation and geographical identification.<br />
	This guide covers the naming systems used in <b>North America</b> (USA and Canada), <b>Brazil</b>, <b>Australia</b>
	and some from
	<b>around the world</b>, highlighting state abbreviations and unique identifiers.
</p>

<ArticleTip>
	Keep in mind that highway naming conventions can vary significantly between regions, so it's essential to familiarize
	yourself with local practices.
</ArticleTip>

<!-- Abbreviations for Road Types Worldwide -->
<h2 id="world-wide" class="text-xl font-bold mt-4 mb-2">Highway Designations Worldwide</h2>
<p class="mb-2">
	All countries and areas of the world have some kind of designation for the names of their highways and roads.<br />
	Please note that many of these <b>worldwide</b> abbreviations can be used
	<b>in multiple regions!</b><br />
	These <b>are not</b> definitive indicators of a specific country.<br />
	Some of them are listed here:
</p>

<div class="overflow-x-auto">
	<table class="table">
		<thead>
			<tr>
				<th>Abbreviation</th>
				<th>Area</th>
				<th>Type</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><b>I</b></td><td><b>USA</b></td><td>Continental</td><td>Interstate</td></tr>
			<tr><td><b>US</b></td><td><b>USA</b></td><td>Continental</td><td>United States Route</td></tr>
			<tr><td><b>S</b></td><td><b>USA</b></td><td>Continental</td><td>State Route</td></tr>
			<tr><td><b>PTH</b></td><td><b>Canada</b></td><td>Continental</td><td>Provincial Trunk Highway</td></tr>
			<tr><td><b>BR</b></td><td><b>Brazil</b></td><td>Continental</td><td>Brazilian Federal Highway</td></tr>
			<tr><td><b>SP</b></td><td><b>Brazil</b></td><td>Continental</td><td>São Paulo State Highway</td></tr>
			<tr><td><b>M</b></td><td><b>Australia</b></td><td>Worldwide</td><td>Motorway</td></tr>
			<tr><td><b>RP</b></td><td><b>Argentina</b></td><td>Country</td><td>Ruta Provincial</td></tr>
			<tr
				><td><b>RPXXX</b></td><td><b>Argentina</b></td><td>Country</td><td
					>Ruta National Missing the brazil typical <b>-</b>.</td
				></tr
			>
			<tr><td><b>E</b></td><td><b>Europe</b></td><td>Worldwide</td><td>European Route</td></tr>
			<tr><td><b>A</b></td><td><b>Germany</b></td><td>Worldwide</td><td>Germany Autobahn</td></tr>
			<tr><td><b>BR-</b></td><td><b>Brazil</b></td><td>Continental</td><td>Federal Roads (e.g., BR-101)</td></tr>
			<tr
				><td><b>AL-</b></td><td><b>Alabama, USA</b></td><td>Continental</td><td
					>State Route (commonly used in southern states)</td
				></tr
			>
			<tr><td><b>R</b></td><td><b>Russia</b></td><td>Country</td><td>Russian Federal Roads (e.g., R-123)</td></tr>
			<tr><td><b>NH</b></td><td><b>India</b></td><td>Country</td><td>National Highway (e.g., NH-44)</td></tr>
			<tr><td><b>S</b></td><td><b>South Africa</b></td><td>Worldwide</td><td>Secondary Roads (e.g., S1)</td></tr>
			<tr
				><td><b>Rv</b></td><td><b>Norway</b></td><td>Country</td><td>Stands for "Riksvei," meaning National Road.</td
				></tr
			>
			<tr
				><td><b>Fv</b></td><td><b>Norway</b></td><td>Country</td><td
					>County Roads (Fylkesvei), often smaller and regional roads.</td
				></tr
			>
			<tr
				><td><b>CH</b></td><td><b>Chile</b></td><td>Country</td><td
					>Carreteras, national highways designated by numbers (e.g., CH-5).</td
				></tr
			>
			<tr
				><td><b>SH</b></td><td><b>New Zealand</b></td><td>Country</td><td
					>State Highways, the primary highway network in New Zealand.</td
				></tr
			>
		</tbody>
	</table>
</div>
<hr class="my-4 border-t-2 border-gray-300" />

<!-- Australian Highways -->
<h2 id="australia" class="text-2xl font-bold mt-8 mb-2">Australia</h2>
<p class="mb-2">
	Australian highways are designated using a <b>combination of letters and numbers.</b><br />
	<b>Major highways</b> are often prefixed with an
	<b>"M" for motorway</b>
	or <b>"A" for national routes.</b><br />
	<i>Keep in mind that <b>A</b> is used in a lot of areas of the world! For example: </i>
</p>

<div class="overflow-x-auto">
	<table class="table">
		<thead>
			<tr>
				<th>Abbreviation</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><b>M1</b></td><td>The major motorway connecting cities along <b>Australia's east coast.</b></td></tr>
			<tr><td><b>A1</b></td><td>The national route that <b>circumnavigates Australia.</b></td></tr>
			<tr><td><b>B100</b></td><td>A regional road designation.</td></tr>
		</tbody>
	</table>
</div>

<p class="mb-2">
	Each state may also have its own numbering system for local roads, which can include state abbreviations (e.g., "NSW"
	for New South Wales).
</p>

<h3 class="text-lg font-bold mt-4">Australia Abbreviation List</h3>
<div class="overflow-x-auto">
	<table class="table-sm">
		<thead>
			<tr>
				<th>Abbreviation</th>
				<th>State/Province</th>
				<th>Region</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><b>ACT</b></td><td>Australian Capital Territory</td><td>Southeast</td></tr>
			<tr><td><b>NSW</b></td><td>New South Wales</td><td>Southeast</td></tr>
			<tr><td><b>NT</b></td><td>Northern Territory</td><td>North</td></tr>
			<tr><td><b>QLD</b></td><td>Queensland</td><td>Northeast</td></tr>
			<tr><td><b>SA</b></td><td>South Australia</td><td>South</td></tr>
			<tr><td><b>TAS</b></td><td>Tasmania</td><td>South</td></tr>
			<tr><td><b>VIC</b></td><td>Victoria</td><td>Southeast</td></tr>
			<tr><td><b>WA</b></td><td>Western Australia</td><td>West</td></tr>
		</tbody>
	</table>
</div>
<hr class="my-4 border-t-2 border-gray-300" />

<!-- Brazilian Highways -->
<h2 id="brazil" class="text-2xl font-bold mt-8 mb-2">Brazil</h2>
<p class="mb-2">
	In Brazil, <b>federal highways</b> are designated with the prefix
	<b>BR</b>, followed by <b>a number</b> (e.g., <b>BR-101</b>).<br />
	<b>State highways</b> typically follow the format of <b>YY-XXX</b>, where YY is the state's abbreviation and XXX is a
	number.<br />
	For example:
</p>

<div class="overflow-x-auto">
	<table class="table">
		<thead>
			<tr>
				<th>Abbreviation</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><b>SP-280</b></td><td>São Paulo State Highway 280.</td></tr>
			<tr><td><b>RJ-116</b></td><td>Rio de Janeiro State Highway 116.</td></tr>
			<tr><td><b>PR-323</b></td><td>Paraná State Highway 323.</td></tr>
		</tbody>
	</table>
</div>

<p class="mb-2">
	The first digit of the number can indicate its category within the National Road System.<br />
	For instance, numbers <b>below 50</b> are typically located
	<b>east of Brasília</b>,<br />
	while those <b>above 50</b> are found to <b>the west.</b><br /><br />
	Understanding these numbering conventions can greatly assist in identifying your location while navigating Brazilian roads.
	Specifically:
</p>

<div class="overflow-x-auto">
	<table class="table">
		<thead>
			<tr>
				<th>Abbreviation</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><b>000-099</b></td><td>Radial highways that run <b>from Brasília to the edges</b> of the country.</td></tr
			>
			<tr><td><b>100-199</b></td><td>Longitudinal highways that run in a <b>north-south direction.</b></td></tr>
			<tr><td><b>200-299</b></td><td>Transversal highways that run in an <b>east-west direction.</b></td></tr>
			<tr
				><td><b>300-399</b></td><td
					><b>Diagonal highways</b> that cross the country in two ways:
					<b>northwest-southeast or northeast-southwest.</b></td
				></tr
			>
			<tr><td><b>400-499</b></td><td><b>Connecting highways</b> that interconnect two major highways.</td></tr>
		</tbody>
	</table>
</div>

<p class="my-2">
	For example, the <b>BR-101</b> is a major <b>longitudinal highway</b>
	running along the <b>eastern coast</b>,<br />
	while the <b>BR-230</b> (Transamazônica) runs from
	<b>east to west across northern Brazil</b>.<br /><br />
	Additionally, some states, like <b>Santa Catarina (SC)</b>, have their
	<b>local numbering systems</b> that align with national ones, creating a sequence of numbers for easier navigation.
</p>

<ArticleTip>
	Highways with <b>RNXXX</b> (ex: RN127) are located in Argentina, not in
	<b>Rio Grande do Norte</b>.</ArticleTip
>

<h3 class="text-lg font-bold mt-4">Brazil Abbreviation List</h3>
<div class="overflow-x-auto">
	<table class="table-sm">
		<thead>
			<tr>
				<th>Abbreviation</th>
				<th>State/Province</th>
				<th>Region</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><b>AC</b></td><td>Acre</td><td>North-West</td></tr>
			<tr><td><b>AL</b></td><td>Alagoas</td><td>North-East</td></tr>
			<tr><td><b>AP</b></td><td>Amapá</td><td>North</td></tr>
			<tr><td><b>AM</b></td><td>Amazonas</td><td>North</td></tr>
			<tr><td><b>BA</b></td><td>Bahia</td><td>North-East</td></tr>
			<tr><td><b>CE</b></td><td>Ceará</td><td>North-East</td></tr>
			<tr><td><b>DF</b></td><td>Distrito Federal</td><td>Central-West</td></tr>
			<tr><td><b>ES</b></td><td>Espírito Santo</td><td>Southeast</td></tr>
			<tr><td><b>GO</b></td><td>Goiás</td><td>Central-West</td></tr>
			<tr><td><b>MA</b></td><td>Maranhão</td><td>North-East</td></tr>
			<tr><td><b>MT</b></td><td>Mato Grosso</td><td>Central-West</td></tr>
			<tr><td><b>MS</b></td><td>Mato Grosso do Sul</td><td>Central-West</td></tr>
			<tr><td><b>MG</b></td><td>Minas Gerais</td><td>Southeast</td></tr>
			<tr><td><b>PA</b></td><td>Pará</td><td>North</td></tr>
			<tr><td><b>PB</b></td><td>Paraíba</td><td>North-East</td></tr>
			<tr><td><b>PR</b></td><td>Paraná</td><td>South</td></tr>
			<tr><td><b>PE</b></td><td>Pernambuco</td><td>North-East</td></tr>
			<tr><td><b>PI</b></td><td>Piauí</td><td>North-East</td></tr>
			<tr><td><b>RJ</b></td><td>Rio de Janeiro</td><td>Southeast</td></tr>
			<tr><td><b>RS</b></td><td>Rio Grande do Sul</td><td>South</td></tr>
			<tr><td><b>SC</b></td><td>Santa Catarina</td><td>South</td></tr>
			<tr><td><b>SP</b></td><td>São Paulo</td><td>Southeast</td></tr>
			<tr><td><b>SE</b></td><td>Sergipe</td><td>North-East</td></tr>
			<tr><td><b>TO</b></td><td>Tocantins</td><td>North</td></tr>
		</tbody>
	</table>
</div>
<hr class="my-4 border-t-2 border-gray-300" />

<!-- Canadian Highways -->
<h2 id="canada" class="text-xl font-bold mt-4 mb-2">Canada</h2>
<p class="mb-2">
	Canadian highways follow a <b>similar convention to the United States</b>
	but often <b>include the province's abbreviation.</b><br />
	For example:
</p>

<div class="overflow-x-auto">
	<table class="table">
		<thead>
			<tr>
				<th>Abbreviation</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><b>ON-401</b></td><td>Ontario Highway 401, one of the busiest highways in North America.</td></tr>
			<tr><td><b>AB-2</b></td><td>Alberta Highway 2, a major north-south route.</td></tr>
			<tr><td><b>PTH 1</b></td><td>Provincial Trunk Highway 1 in Manitoba, part of the Trans-Canada Highway.</td></tr>
		</tbody>
	</table>
</div>

<p class="mb-2">
	<br />The Trans-Canada Highway is a significant route that crosses all provinces, marked as <b>TCH</b>.<br />
	Provincial highways often use different designations depending on the province (e.g., <b>"Hwy"</b> or <b>"Rte"</b>).
</p>

<h3 class="text-lg font-bold mt-4">Canada Abbreviation List</h3>
<div class="overflow-x-auto">
	<table class="table-sm">
		<thead>
			<tr>
				<th>Abbreviation</th>
				<th>State/Province</th>
				<th>Region</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><b>AB</b></td><td>Alberta</td><td>West</td></tr>
			<tr><td><b>BC</b></td><td>British Columbia</td><td>West</td></tr>
			<tr><td><b>MB</b></td><td>Manitoba</td><td>Central Canada</td></tr>
			<tr><td><b>NB</b></td><td>New Brunswick</td><td>East Canada</td></tr>
			<tr><td><b>NL</b></td><td>Newfoundland and Labrador</td><td>East Canada</td></tr>
			<tr><td><b>NT</b></td><td>Northwest Territories</td><td>North Canada</td></tr>
			<tr><td><b>NS</b></td><td>Nova Scotia</td><td>East Canada</td></tr>
			<tr><td><b>NU</b></td><td>Nunavut</td><td>North Canada</td></tr>
			<tr><td><b>ON</b></td><td>Ontario</td><td>Central Canada</td></tr>
			<tr><td><b>PE</b></td><td>Prince Edward Island</td><td>East Canada</td></tr>
			<tr><td><b>QC</b></td><td>Quebec</td><td>East Canada</td></tr>
			<tr><td><b>SK</b></td><td>Saskatchewan</td><td>Central Canada</td></tr>
			<tr><td><b>YT</b></td><td>Yukon Territory</td><td>North Canada</td></tr>
		</tbody>
	</table>
</div>

<hr class="my-4 border-t-2 border-gray-300" />

<!-- United States Highways -->
<h2 id="united-states" class="text-xl font-bold mt-4 mb-2">United States</h2>
<p class="mb-2">
	In the United States, <b>highways</b> are typically designated by
	<b>a number</b>, often preceded by <b>a letter or two</b> indicating the
	<b>type of road</b>
	or <b>the state</b> they are in.<br />
	For example:
</p>

<div class="overflow-x-auto">
	<table class="table-sm">
		<thead>
			<tr>
				<th>Abbreviation</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><b>I-95</b></td><td>Interstate 95 runs along the East Coast.</td></tr>
			<tr><td><b>US 66</b></td><td>Historic Route 66, known as "Main Street of America."</td></tr>
			<tr><td><b>SR 520</b></td><td>State Route 520 in Washington State.</td></tr>
			<tr><td><b>AR-15</b></td><td>Arkansas Highway 15.</td></tr>
		</tbody>
	</table>
</div>

<p class="mb-2">
	<br /><b>Highways</b> are often numbered such that
	<b>odd numbers run north-south</b>
	and <b>even numbers run east-west.</b><br />
	<b>State highways</b> may also include the state abbreviation, such as
	<b>CA-1</b>
	for California Highway 1.
</p>

<h3 class="text-xl font-bold mt-4 mb-2">United States Abbreviation List</h3>
<div class="overflow-x-auto">
	<table class="table-sm">
		<thead>
			<tr>
				<th>Abbreviation</th>
				<th>State/Province</th>
				<th>Region</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><b>AL</b></td><td>Alabama</td><td>South</td></tr>
			<tr><td><b>AK</b></td><td>Alaska</td><td>West</td></tr>
			<tr><td><b>AZ</b></td><td>Arizona</td><td>West</td></tr>
			<tr><td><b>AR</b></td><td>Arkansas</td><td>South</td></tr>
			<tr><td><b>CA</b></td><td>California</td><td>West</td></tr>
			<tr><td><b>CO</b></td><td>Colorado</td><td>West</td></tr>
			<tr><td><b>CT</b></td><td>Connecticut</td><td>Northeast</td></tr>
			<tr><td><b>DE</b></td><td>Delaware</td><td>South</td></tr>
			<tr><td><b>FL</b></td><td>Florida</td><td>South</td></tr>
			<tr><td><b>GA</b></td><td>Georgia</td><td>South</td></tr>
			<tr><td><b>HI</b></td><td>Hawaii</td><td>West</td></tr>
			<tr><td><b>ID</b></td><td>Idaho</td><td>West</td></tr>
			<tr><td><b>IL</b></td><td>Illinois</td><td>Midwest</td></tr>
			<tr><td><b>IN</b></td><td>Indiana</td><td>Midwest</td></tr>
			<tr><td><b>IA</b></td><td>Iowa</td><td>Midwest</td></tr>
			<tr><td><b>KS</b></td><td>Kansas</td><td>Midwest</td></tr>
			<tr><td><b>KY</b></td><td>Kentucky</td><td>South</td></tr>
			<tr><td><b>LA</b></td><td>Louisiana</td><td>South</td></tr>
			<tr><td><b>ME</b></td><td>Maine</td><td>Northeast</td></tr>
			<tr><td><b>MD</b></td><td>Maryland</td><td>South</td></tr>
			<tr><td><b>MA</b></td><td>Massachusetts</td><td>Northeast</td></tr>
			<tr><td><b>MI</b></td><td>Michigan</td><td>Midwest</td></tr>
			<tr><td><b>MN</b></td><td>Minnesota</td><td>Midwest</td></tr>
			<tr><td><b>MS</b></td><td>Mississippi</td><td>South</td></tr>
			<tr><td><b>MO</b></td><td>Missouri</td><td>Midwest</td></tr>
			<tr><td><b>MT</b></td><td>Montana</td><td>West</td></tr>
			<tr><td><b>NE</b></td><td>Nebraska</td><td>Midwest</td></tr>
			<tr><td><b>NV</b></td><td>Nevada</td><td>West</td></tr>
			<tr><td><b>NH</b></td><td>New Hampshire</td><td>Northeast</td></tr>
			<tr><td><b>NJ</b></td><td>New Jersey</td><td>Northeast</td></tr>
			<tr><td><b>NM</b></td><td>New Mexico</td><td>West</td></tr>
			<tr><td><b>NY</b></td><td>New York</td><td>Northeast</td></tr>
			<tr><td><b>NC</b></td><td>North Carolina</td><td>South</td></tr>
			<tr><td><b>ND</b></td><td>North Dakota</td><td>Midwest</td></tr>
			<tr><td><b>OH</b></td><td>Ohio</td><td>Midwest</td></tr>
			<tr><td><b>OK</b></td><td>Oklahoma</td><td>South</td></tr>
			<tr><td><b>OR</b></td><td>Oregon</td><td>West</td></tr>
			<tr><td><b>PA</b></td><td>Pennsylvania</td><td>Northeast</td></tr>
			<tr><td><b>RI</b></td><td>Rhode Island</td><td>Northeast</td></tr>
			<tr><td><b>SC</b></td><td>South Carolina</td><td>South</td></tr>
			<tr><td><b>SD</b></td><td>South Dakota</td><td>Midwest</td></tr>
			<tr><td><b>TN</b></td><td>Tennessee</td><td>South</td></tr>
			<tr><td><b>TX</b></td><td>Texas</td><td>South</td></tr>
			<tr><td><b>UT</b></td><td>Utah</td><td>West</td></tr>
			<tr><td><b>VT</b></td><td>Vermont</td><td>Northeast</td></tr>
			<tr><td><b>VA</b></td><td>Virginia</td><td>South</td></tr>
			<tr><td><b>WA</b></td><td>Washington</td><td>West</td></tr>
			<tr><td><b>WV</b></td><td>West Virginia</td><td>South</td></tr>
			<tr><td><b>WI</b></td><td>Wisconsin</td><td>Midwest</td></tr>
			<tr><td><b>WY</b></td><td>Wyoming</td><td>West</td></tr>
		</tbody>
	</table>
</div>
<hr class="my-4 border-t-2 border-gray-300" />

<GuideQuiz
	question="Where could the highway 'NY-8' be located?"
	answerOne="North Carolina"
	answerTwo="Kansas"
	answerThree="New York"
	answerFour="Texas"
	correctAnswer={3}
></GuideQuiz>

<p class="italic mt-4">Written by w0lfzk1nd from the Discord Server</p>
