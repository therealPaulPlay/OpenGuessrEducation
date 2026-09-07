<script>
	import ArticleTip from "$lib/components/ArticleTip.svelte";
	import GuideQuiz from "$lib/components/GuideQuiz.svelte";
</script>

<h1 class="text-4xl font-bold mb-4">How to play GeoGuessr for free</h1>
<p class="mb-4">
	Since the beginning of 2024, GeoGuessr has been a paid experience. Before, playing for free meant putting up with
	tight time limits, but most features and modes were accessible. Now, that landscape has changed – and with it, a
	market for free alternatives has emerged. In this guide we'll explore the best ways that you can still play GeoGuessr
	without paying in {new Date().getFullYear()}.
</p>

<img alt="GeoGuessr pricing tiers" src="/assets/guides/geoguessr_pricing.jpg" class="rounded-xl w-full" />

<p class="text-center mt-2 mb-4">GeoGuessr pricing (Source: geoguessr.com).</p>

<h2 class="text-2xl font-bold mt-8 mb-2">Challenge links</h2>
<p class="mb-2">
	When you create a challenge in GeoGuessr, which is comparable to OpenGuessr competitions, you can invite people to
	play it – they do not require a subscription, but an account is needed. An innovative website called <a
		class="text-secondary"
		href="https://geochallenges.me"
		target="_blank">Geochallenges</a
	> provides a database of active challenge links, which is a great way to get a taste for the game without paying.
</p>

<h2 class="text-2xl font-bold mt-8 mb-2">Party invitations</h2>
<p class="mb-4">
	If you have friends with a paid plan, they can invite you to play with them free of charge. Sometimes you'll also find
	streamers on platforms such as Twitch that you can join. Just note that not all features or game modes of GeoGuessr
	are available in parties, and that you don't have the full control over the room.
</p>

<img alt="GeoGuessr parties" src="/assets/guides/geoguessr_parties.jpg" class="rounded-xl w-full" />

<p class="text-center mt-2 mb-4">GeoGuessr parties (Source: geoguessr.com).</p>

<h2 class="text-2xl font-bold mt-8 mb-2">Free alternatives</h2>
<p class="mb-2">
	Various free alternatives to GeoGuessr exist. We believe that <a
		class="text-secondary"
		href="https://openguessr.com"
		target="_blank">OpenGuessr</a
	>
	is the most polished one with a solid set of features. Play multiplayer, competitions, invite friends, discover thousands
	of maps – all for free with little advertising. There are more alternatives than that. For a larger list, check out
	<a class="text-secondary" href="https://autoguessr.com/articles/alternatives-to-geoguessr-free" target="_blank"
		>this comprehensive article</a
	> from AutoGuessr.
</p>

<h2 class="text-2xl font-bold mt-8 mb-2">Daily challenge</h2>
<p class="mb-2">
	With just an account you can play the GeoGuessr daily challenge without paying, which offers 3 locations to guess
	every day. It also includes a leaderboard so that you can see how you stack up against others.
</p>

<GuideQuiz
	question="What mode can you play for free in GeoGuessr?"
	answerOne="Battle Royale"
	answerTwo="Daily challenge"
	answerThree="Duels"
	answerFour="Singleplayer"
	correctAnswer={2}
/>

<h2 class="text-2xl font-bold mt-8 mb-2">Discounts</h2>
<p class="mb-2">
	If you're fine with a monthly subscription, but the current pricing is too steep for you, you're in luck. GeoGuessr
	frequently runs promotions, such as during the World Cup, where you can get as much as 25% off the regular charge. Do
	note that these usually only go for the first year, after which you'll have to pay the full non-discounted amount.
</p>
