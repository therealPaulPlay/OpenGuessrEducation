<script>
    import ArticleTip from "$lib/components/ArticleTip.svelte";
    import GuideQuiz from "$lib/components/GuideQuiz.svelte";
</script>

<h1 class="text-4xl font-bold mb-4">Follow cars</h1>
<p class="mb-2">
    Especially in <b>Nigeria</b> and <b>Kenya</b>, a lot of panorama images show a <b>"Follow car"</b> behind the main capture car. There are few more
    of these cars that are known in the geo-guessing community, however, most of them are only present on certain roads.
</p>

<GuideQuiz
  question="Where can you find this follow car?"
  answerOne="Kenya"
  answerTwo="Tunesia"
  answerThree="Ghana"
  answerFour="Nigeria"
  correctAnswer={4}
>
<img
    alt="Follow car (Kenya)"
    src="/src/lib/assets/guides/nigeria_follow_car_2.png"
    class="rounded-lg w-full mb-4" />
</GuideQuiz>

<h2 class="text-2xl font-bold mt-8 mb-2">Follow car in Nigeria</h2>
<p class="mb-2">
    Nigeria has a <b>high crime rate</b>, which is why the Street View car is being followed and <b>protected by a police car</b> - usually a <b>Toyota Hilux</b>. This applies
    to some other companies that operate in that country too, for example, NGOs. Note that the car is <b>not always recognizable</b> as a <b>police car</b>.
</p>

<img
    alt="Follow car (Nigeria)"
    src="/src/lib/assets/guides/nigeria_follow_car_1.png"
    class="rounded-xl w-full" />

<p class="text-center mt-2">The Nigerian follow car (Source: geohints.com).</p>

<ArticleTip>
    Don't confuse the Nigerian follow car with the (rare) Tunisian military-looking follow car.
</ArticleTip>

<h2 class="text-2xl font-bold mt-8 mb-2">Follow car in Kenya</h2>
<p class="mb-2">
    In Kenya, you'll frequently see a follow car as well, which is oftentimes <b>silver</b>. There is some overlap between Nigeria and Kenya, as there are instances where
    you will encounter a similar-looking silver car in Nigeria - therefore, a silver follow car is <b>not</b> a <b>clear indication</b>. 
</p>

<img
    alt="Follow car (Kenya)"
    src="/src/lib/assets/guides/kenya_follow_car.png"
    class="rounded-xl w-full" />

<p class="text-center mt-2">The follow car in Kenya (Source: geohints.com).</p>