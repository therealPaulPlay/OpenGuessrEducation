<script>
    import { onMount } from "svelte";
    import { setTitle } from '$lib/utils/pageTitle.svelte.js';

    let message = $state("Guess where this is!");
    let correct = $state(false);
    let buttons = [];
    
    const incorrectMessages = [
        "Nope, not it.",
        "Almost, try again.",
        "Close, but incorrect!",
        "That isn't it.",
    ];

    onMount(() => {
        buttons = document.querySelectorAll(".streetview-minigame-button");
        setTitle("Get started");
    });

    function handleGuess(guess, button) {
        if (guess === "New York") {
            message = "Correct!";
            correct = true;
            buttons.forEach((btn) => {
                if (btn !== button) {
                    btn.style.pointerEvents = "none";
                    btn.style.opacity = "0.5";
                }
            });
        } else {
            message =
                incorrectMessages[
                    Math.floor(Math.random() * incorrectMessages.length)
                ];
            correct = false;
        }
    }
</script>

<article class="container mx-auto p-6 px-1 max-w-4xl">
    <img
        src="/assets/openguessr_jungle_adventure.png"
        alt="Geography adventure"
        class="w-full rounded-xl mb-10" />
    <h1 class="text-4xl font-bold mb-4">
        Embark on an epic learning-adventure.
    </h1>
    <p class="mb-6">
        <b>Welcome to OpenGuessr Education</b>, the
        <b>ultimate geography platform</b>
        that will test your knowledge and sharpen up your geography guessing skills.
        Let's take a <b>quick tour</b> to find out what this site has to offer!
    </p>

    <h2 class="text-2xl font-semibold mb-2">What is OpenGuessr?</h2>
    <p class="mb-6">
        <a href="https://openguessr.com" target="_blank" class="text-secondary"
            >OpenGuessr</a>
        is an exciting geography game where you guess the location of a street view
        image. Have you heard of <b>GeoGuessr</b> before? OpenGuessr is
        <b>comparable</b>, but with a slightly different feature set, and
        <b>100% free</b>!
        <br /><br />
        The closer your guess is to the actual location, the higher your score. Think
        of it as a virtual treasure hunt where the treasure is your newfound knowledge
        of the world.
    </p>

    <div class="game-container flex flex-wrap mb-8">
        <img
            src="/assets/streetview_example.png"
            alt="Street View Example"
            class="rounded-xl mb-6 w-96" />

        <div class="info-container flex flex-col ml-4">
            <h3
                class="text-lg font-semibold mb-4 {correct
                    ? 'text-secondary'
                    : ''}">
                {message}
            </h3>
            <div class="buttons-container flex flex-col space-y-2">
                <button
                    class="btn btn-outline btn-sm streetview-minigame-button"
                    onclick={(event) =>
                        handleGuess("Washington", event.target)}>
                    Washington
                </button>
                <button
                    class="btn btn-outline btn-sm"
                    onclick={(event) => handleGuess("New York", event.target)}>
                    New York
                </button>
                <button
                    class="btn btn-outline btn-sm streetview-minigame-button"
                    onclick={(event) => handleGuess("London", event.target)}>
                    London
                </button>
                <button
                    class="btn btn-outline btn-sm streetview-minigame-button"
                    onclick={(event) => handleGuess("Las Vegas", event.target)}>
                    Las Vegas
                </button>
            </div>
        </div>
    </div>

    <h2 class="text-2xl font-semibold mb-2">
        Got it, but what's OpenGuessr Education?
    </h2>
    <p class="mb-6">
        <b>OpenGuessr Education</b> is a new <b>learning site</b> by OpenGuessr
        that helps you get better at geoguessing. Want to learn more about
        <a href="/countries/learn/germany" class="text-secondary">Germany</a>, for
        example? There is a page for that.
        <a href="/countries/learn/united-kingdom" class="text-secondary">United Kingdom</a>? Yup.
        And there is more - let's take a look at guides and fun quizzes.
    </p>

    <h3 class="text-xl font-semibold mb-2">Understanding Quizzes</h3>
    <p class="mb-6">
        <b>Quizzes</b> on OpenGuessr Education are a great way to
        <b>test your knowledge</b>
        of different countries. In these quizzes, you'll for example be presented
        with a country name and have to select it on the map. Quizzes help you
        <b>memorize</b>
        country <b>names, shapes, states, flags, cities</b> and more depending
        on the quiz type. To start a quiz, visit the
        <a href="/quiz" class="text-secondary">Quizzes</a> page.
    </p>

    <h3 class="text-xl font-semibold mb-2">About Guides</h3>
    <p class="mb-6">
        Want to <b>improve</b> your <b>geo-guessing skills</b> and gain
        knowledge about the game? <b>Check out</b>
        the comprehensive <a href="/guides" class="text-secondary">Guides</a>
        section. Guides are <b>packed with tips</b> and tricks to help you
        become the next Rainbolt. They are frequently updated, so you'll always
        have the latest strategies at your fingertips. Whether you're looking to
        <b>score more 5ks</b>, win more duels or want to learn how to use the
        compass effectively, these guides have got you covered.
    </p>

    <h3 class="text-xl font-semibold mb-2">Join the Community</h3>
    <p class="mb-6">
        <b>Connect</b> with other <b>geography enthusiasts</b> and share your
        experiences. Join the
        <a
            href="https://discord.com/invite/CSc3MbDrZ8"
            target="_blank"
            class="text-secondary">Discord Server</a> to participate in discussions,
        share tips, and compete in challenges. It's a virtual hangout for geography
        nerds - chances are, you'll like it there!
    </p>

    <h3 class="text-2xl font-semibold mb-4">Frequently Asked Questions</h3>
    <div class="mb-6">
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <div
            class="collapse collapse-arrow bg-base-200 bg-base-100 rounded-box mb-2">
            <input type="checkbox" />
            <div class="collapse-title text-lg font-medium">
                What is "geoguessing"?
            </div>
            <div class="collapse-content">
                <p>
                    Geo-Guessing is the activity of guessing the location of a
                    panorama image. It involves analyzing the image for clues
                    such as road signs, vegetation, and architectural styles to
                    find out where the image was taken. It's like being a
                    detective, but for geography!
                </p>
            </div>
        </div>
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <div
            class="collapse collapse-arrow bg-base-200 bg-base-100 rounded-box mb-2">
            <input type="checkbox" />
            <div class="collapse-title text-lg font-medium">
                Why is OpenGuessr free?
            </div>
            <div class="collapse-content">
                <p>
                    OpenGuessr is funded by ads and supporter purchases. These
                    make it possible for OpenGuessr to be free of charge.
                </p>
            </div>
        </div>
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <div
            class="collapse collapse-arrow bg-base-200 bg-base-100 rounded-box mb-2">
            <input type="checkbox" />
            <div class="collapse-title text-lg font-medium">
                Where can I learn to play GeoGuessr?
            </div>
            <div class="collapse-content">
                <p>
                    OpenGuessr Education is a great place to learn new geography
                    and GeoGuessr metas. Moreover, sites such as <a
                        class="text-secondary"
                        href="https://plonkit.net"
                        target="_blank">Plonk It</a
                    >,
                    <a
                        class="text-secondary"
                        href="https://geotips.net/"
                        target="_blank">GeoTips</a>
                    and
                    <a
                        class="text-secondary"
                        href="https://geohints.com/"
                        target="_blank">GeoHints</a> are other amazing resources.
                </p>
            </div>
        </div>
    </div>
</article>

<style>
    .game-container {
        display: flex;
        align-items: flex-start;
    }

    .buttons-container {
        display: flex;
        flex-direction: column;
    }

    .info-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
</style>
