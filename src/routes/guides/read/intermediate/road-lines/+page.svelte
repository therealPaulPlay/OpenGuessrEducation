<script>
    import ArticleTip from "$lib/components/ArticleTip.svelte";
    import GuideQuiz from "$lib/components/GuideQuiz.svelte";
</script>

<h1 class="text-4xl font-bold mb-4">Road Lines</h1>

<p class="mb-2">
    Learning road line types is a very <b>effective</b> and, at the same time, beginner-friendly way to quickly gasp a general idea of where an
    image was taken. In this guide, we will take a look at the <b>center lines</b> as well as the <b>outer lines</b>.
</p>


<h2 class="text-2xl font-bold mt-8 mb-2">White road lines</h2>

<p class="mb-4">
    In general, <b>Europe</b> has white center lines. Moreover, <b>Chile</b>, as the only country in South America, commonly uses white center lines (often double) as well.
    Keep in mind that <b>Norway and Finland</b> regularly use <b>yellow center lines</b>, usually when there is more than one center line. A tip to tell <b>Sweden</b> apart 
    from <b>Finland</b> is to look at the <b>outer lines</b>, which are, if they aren't solid, <b>short</b> lines in <b>Sweden</b> and <b>long</b> in <b>Finland</b>. Moreover, <b>Ireland</b> uses
    outlines very similar to <b>Sweden</b>. <b>Estland</b> often uses similar dashed outer lines, though, with a <b>wider margin</b> to the edges.
</p>

<img
    alt="Sweden road"
    src="/assets/guides/swedish_road.png"
    class="rounded-xl w-full" />

<p class="text-center mt-2 mb-4">White road lines in Sweden.</p>

<p class="mb-4">
    <b>Double solid white</b> center road lines are most apparent near the Mediterranean sea in countries such as <b>Greece</b>, but they are also common in <b>Poland</b> and <b>Denmark</b>.
    Another great tip is that <b>Ireland and New Zealand</b> frequently have <b>yellow dashed outer lines</b> with <b>white center lines</b>. <b>Malaysia</b> often uses double white center lines as well.
</p>

<img
    alt="Ireland road"
    src="/assets/guides/ireland_road.png"
    class="rounded-xl w-full" />

<p class="text-center mt-2 mb-4">Dashed yellow outer lines in Ireland.</p>

<h2 class="text-2xl font-bold mt-8 mb-2">Yellow center lines</h2>

<p class="mb-2">
    In general, <b>North- and South America</b> have yellow center lines. In the US, there are usually <b>two center lines</b>, whereas a <b>single center line</b> is more common
    in <b>Canada</b> or <b>Mexico</b>. However, there are exceptions. While <b>Chile</b> often uses white center lines, there are rare occasions in which <b>all lines are yellow </b> (center & outer), which is 
    rather <b>exclusive</b> to Chile. Other notable countries with yellow center lines are <b>Thailand</b> and <b>Cambodia</b>.
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
    <b>Argentina</b> frequently uses <b>white lines </b>, although <b>yellow</b> ones are more common. <b>Uruguay</b> oftentimes uses a combination of white and yellow for their center line, which
    is also common in the <b>Phillipines</b>.
</p>

<img
    alt="Uruguay road"
    src="/assets/guides/uruguay_road.png"
    class="rounded-xl w-full" />

<p class="text-center mt-2">Roads in the Phillipines and Uruguay sometimes combine yellow and white.</p>

<h2 class="text-2xl font-bold mt-8 mb-2">Yellow border lines</h2>

<p class="mb-4">
    Yellow border lines are a good indicator that the imagery was captured in <b>South Africa, Lesotho, Botswana or Eswatini</b>. Moreover, in the <b>UAE, Quatar or Jordan</b> often use
    yellow outer lines. It's also notable that in many scenarios, no border lines exist.
</p>

<img
    alt="Eswatini road"
    src="/assets/guides/eswatini_road.png"
    class="rounded-xl w-full" />

<p class="text-center mt-2">A road in Eswatini featuring yellow outer lines.</p>

