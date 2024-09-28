<script>
    import { onMount } from "svelte";

    let message = "Guess where this is!";
    let correct = false;
    let buttons = [];
    const incorrectMessages = [
        "Nope, not it.",
        "Almost, try again.",
        "Close, but incorrect!",
        "That isn't it.",
    ];

    onMount(() => {
        buttons = document.querySelectorAll(".streetview-minigame-button");
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

<div class="container mx-auto p-6 max-w-5xl">
    <img
        src="/src/lib/assets/openguessr_jungle_adventure.png"
        alt="Geography adventure"
        class="w-full rounded-xl mb-10" />
    <h1 class="text-4xl font-bold mb-4 text-secondary">
        Embark on an epic learning-adventure.
    </h1>
    <p class="mb-6">
        Welcome to OpenGuessr Education, the ultimate geography quiz platform
        that will test your knowledge and detective skills. Whether you're a
        geography whiz or just looking for a fun way to learn about the world,
        you'll have a great time (trust me bro). Let's take a quick tour to find
        out what this page has to offer!
    </p>

    <h3 class="text-xl font-semibold mb-2">What is OpenGuessr?</h3>
    <p class="mb-6">
        <a href="https://openguessr.com" target="_blank" class="text-secondary"
            >OpenGuessr</a>
        is an exciting geography game where you guess the location of a street
        view image. Have you heard of GeoGuessr before? OpenGuessr is
        comparable, but with a slightly different feature set, and 100% free!
        <br /><br />
        The closer your guess is to the actual location, the higher your score. Think
        of it as a virtual treasure hunt where the treasure is your newfound knowledge
        of the world.
    </p>

    <div class="game-container flex flex-wrap mb-8">
        <img
            src="/src/lib/assets/streetview_example.png"
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
                    class="btn btn-accent btn-sm streetview-minigame-button"
                    on:click={(event) =>
                        handleGuess("Washington", event.target)}>
                    Washington
                </button>
                <button
                    class="btn btn-accent btn-sm"
                    on:click={(event) => handleGuess("New York", event.target)}>
                    New York
                </button>
                <button
                    class="btn btn-accent btn-sm streetview-minigame-button"
                    on:click={(event) => handleGuess("London", event.target)}>
                    London
                </button>
                <button
                    class="btn btn-accent btn-sm streetview-minigame-button"
                    on:click={(event) =>
                        handleGuess("Las Vegas", event.target)}>
                    Las Vegas
                </button>
            </div>
        </div>
    </div>

    <h3 class="text-xl font-semibold mb-2">
        Got it, but what's OpenGuessr Education?
    </h3>
    <p class="mb-6">
        OpenGuessr Education is a new learning site that helps you get better at
        geoguessing. Want to learn more about <a
            href="/countries/germany"
            class="text-secondary">Germany</a
        >, for example? There is a page for that.
        <a href="/countries/england" class="text-secondary">England</a>? Yup. And there is more - let's take a look at guides and fun quizzes.
    </p>

    <h3 class="text-xl font-semibold mb-2">Understanding Quizzes</h3>
    <p class="mb-6">
        Quizzes on OpenGuessr Education are a great way to test your knowledge
        of different countries. In these quizzes, you'll for example be
        presented with a country name and have to find and click it on the map. Quizzes help you memorize country names, states and country shapes. To start a quiz, visit the <a
            href="/quizzes"
            class="text-secondary">Quizzes</a> page.
    </p>

    <h3 class="text-xl font-semibold mb-2">About Guides</h3>
    <p class="mb-6">
        Want to improve your geoguessing skills and gain knowledge about the game? Check
        out the comprehensive <a href="/guides" class="text-secondary"
            >Guides</a> section. Guides are packed with tips and tricks to help you
        become the next Rainbolt. They are frequently updated, so you'll always have
        the latest strategies at your fingertips. Whether you're looking to score
        more 5ks or just want to learn how to notice important clues in street view
        images, these guides have got you covered.
    </p>

    <h3 class="text-xl font-semibold mb-2">Join the Community</h3>
    <p class="mb-6">
        Connect with other geography enthusiasts and share your experiences.
        Join our <a
            href="https://discord.com/invite/CSc3MbDrZ8"
            target="_blank"
            class="text-secondary">Discord Server</a> to participate in discussions,
        share tips, and compete in challenges. It's like a virtual hangout for geography
        nerds.
    </p>

    <h3 class="text-2xl font-semibold mb-4">Frequently Asked Questions</h3>
    <div class="mb-6">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <div
            tabindex="0"
            class="collapse collapse-arrow bg-base-200 bg-base-100 rounded-box mb-2">
            <div class="collapse-title text-lg font-medium">
                What is geoguessing?
            </div>
            <div class="collapse-content">
                <p>
                    Geoguessing is the activity of guessing the location of a
                    street view image. It involves analyzing the image for clues
                    such as road signs, vegetation, and architectural styles to
                    make an educated guess about the location. It's like being a
                    detective, but for geography!
                </p>
            </div>
        </div>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <div
            tabindex="0"
            class="collapse collapse-arrow bg-base-200 bg-base-100 rounded-box mb-2">
            <div class="collapse-title text-lg font-medium">
                How do I improve my geoguessing skills?
            </div>
            <div class="collapse-content">
                <p>
                    Improving your geoguessing skills takes practice and
                    attention to detail. Use our <a
                        href="/guides"
                        class="text-secondary">Guides</a> to learn about common clues
                    and strategies. Playing regularly and reviewing your guesses
                    will also help you get better over time. Remember, practice makes
                    perfect!
                </p>
            </div>
        </div>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <div
            tabindex="0"
            class="collapse collapse-arrow bg-base-200 bg-base-100 rounded-box mb-2">
            <div class="collapse-title text-lg font-medium">
                Why is OpenGuessr free?
            </div>
            <div class="collapse-content">
                <p>
                    OpenGuessr is funded by ads and supporter purchases. These make it possible for OpenGuessr to be free of charge.
                </p>
            </div>
        </div>
    </div>
</div>

<style>
    .wiggle {
        animation: wiggle 0.5s;
    }

    @keyframes wiggle {
        0%,
        100% {
            transform: rotate(-3deg);
        }
        50% {
            transform: rotate(3deg);
        }
    }

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
