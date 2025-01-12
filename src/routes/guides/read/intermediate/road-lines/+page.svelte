<script>
    import ArticleTip from "$lib/components/ArticleTip.svelte";
    import GuideQuiz from "$lib/components/GuideQuiz.svelte";
</script>

<h1 class="text-4xl font-bold mb-4">Road Lines</h1>

<p class="mb-2">
    Learning about road line types is a very <b>effective</b> and beginner-friendly way to quickly grasp a general idea of where an image was taken. In this guide, we will take a look at the <b>center lines</b> as well as the <b>outer lines</b>.
</p>

<h2 class="text-2xl font-bold mt-8 mb-2">White Road Lines</h2>

<p class="mb-4">
    In general, <b>Europe</b> has white center lines. Moreover, <b>Chile</b>, as the only country in South America, commonly uses white center lines (often double) as well. Keep in mind that <b>Norway and Finland</b> regularly use <b>yellow center lines</b>, usually when there is more than one center line. A tip to tell <b>Sweden</b> apart from <b>Finland</b> is to look at the <b>outer lines</b>, which are, if they aren't solid, <b>short</b> lines in <b>Sweden</b> and <b>long</b> in <b>Finland</b>. Moreover, <b>Ireland</b> uses outlines very similar to <b>Sweden</b>. <b>Estonia</b> often uses similar dashed outer lines, though with a <b>wider margin</b> to the edges.
</p>

<img
    alt="Sweden road"
    src="/assets/guides/swedish_road.png"
    class="rounded-xl w-full" />

<p class="text-center mt-2 mb-4">White road lines in Sweden.</p>

<p class="mb-4">
    <b>Double solid white</b> center road lines are most apparent near the Mediterranean Sea in countries such as <b>Greece</b>, but they are also common in <b>Poland</b> and <b>Denmark</b>. Another great tip is that <b>Ireland and New Zealand</b> frequently have <b>yellow dashed outer lines</b> with <b>white center lines</b>. Additionally, <b>Malaysia</b> often uses double white center lines as well.
</p>

<img
    alt="Ireland road"
    src="/assets/guides/ireland_road.png"
    class="rounded-xl w-full" />

<p class="text-center mt-2 mb-4">Dashed yellow outer lines in Ireland.</p>

<h2 class="text-2xl font-bold mt-8 mb-2">Yellow Center Lines</h2>

<p class="mb-2">
    In general, <b>North and South America</b> have yellow center lines. In the US, there are usually <b>two center lines</b>, whereas a <b>single center line</b> is more common in <b>Canada</b> or <b>Mexico</b>. Two yellow lines can also be found in <b>Brazil</b>.<br> However, there are exceptions. While <b>Chile</b> often uses white center lines, there are rare occasions in which all lines are yellow (center & outer), which is rather exclusive to Chile. Other notable countries with yellow center lines include <b>Thailand</b>, and parts of <b>Cambodia.</b>
</p>

<GuideQuiz
  question='Where in South America was this image captured?'
  answerOne="Brasil"
  answerTwo="Uruguay"
  answerThree="Argentina"
  answerFour="Chile"
  correctAnswer={4}>
  <img
    alt="Chile road"
    src="/assets/guides/chile_road.png"
    class="rounded-lg w-full mb-4" />
</GuideQuiz>

<p class="mb-4">
    <b>Argentina</b> frequently uses <strong><i>white lines </i></strong>, although yellow ones are more common. Meanwhile, <strong><i>Uruguay </i></strong>&nbsp;oftentimes employs a combination of white and yellow for their center line, which is also common in the &nbsp;<strong><i>Philippines.</i></strong>
.</p>

<img
    alt="Uruguay road"
    src="/assets/guides/uruguay_road.png"
    class="rounded-xl w-full" />

<p class="text-center mt-2">Roads in the Philippines and Uruguay sometimes combine yellow and white.</p>

<h2 class="text-2xl font-bold mt-8 mb-2">Yellow Border Lines</h2>

<p class="mb-4">
    Yellow border lines are a good indicator that the imagery was captured in countries like <strong><i>South Africa, Lesotho, Botswana or Eswatini.</i></strong>&nbsp;Moreover, in the &nbsp;<strong><i>UAE, Qatar or Jordan </i></strong>&nbsp;often use yellow outer lines. It's also notable that in many scenarios, no border lines exist.
</p>

<img
    alt="Eswatini road"
    src="/assets/guides/eswatini_road.png"
    class="rounded-xl w-full" />

<p class="text-center mt-2">A road in Eswatini featuring yellow outer lines.</p>

<h2 class="text-2xl font-bold mt-8 mb-2">Mixed Road Line Colors in Asia and Africa</h2>

<p class="mb-4">
    In regions like <b><i>Asia</i></b> and <b><i>Africa</i></b>, you will often encounter <b>mixed line colors</b>.<br>
    For example, countries like the <b><i>Philippines and Thailand</i></b> frequently use <b>concrete roads</b> that can help identify their location.<br>
    <b><i>In Malaysia</i></b>, you will typically find only <b>white lines</b> with frequent use of <b>double white center lines</b>.<br>
    <b><i>Indonesia</i></b> often features a mix of both <b>yellow and white lines</b>.
</p>

<h3 class="text-xl font-bold mt-4 mb-2">Additional Tips for Identification:</h3>
<ul class="mb-2 list-disc list-inside">
    <li>The absence of outer lines does not exclude countries with characteristic outer lines.</li>
    <li><strong><i>Estonia </i></strong>&nbsp;often has <b>short dashed outer lines</b> similar to Sweden but with <b>more space</b> from the roadside.</li>
    <li><b>Paved concrete roads in Southeast Asia</b> often indicate locations like the <b><i>Philippines or Thailand.</i></b></li>
</ul>

<p class="italic mt-4">Edited by w0lfzk1nd from Discord Server</p>
