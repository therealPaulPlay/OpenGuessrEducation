<script>
    import { Download, ArrowDown } from "lucide-svelte";

    import { onMount } from "svelte";
    import { setTitle } from "$lib/utils/pageTitle.svelte.js";

    onMount(() => {
        setTitle("Map Converter");
    });

    let errorMessage = $state();

    function handleFileSelect(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const inputJson = event.target.result;
            document.getElementById("inputJson").value = inputJson;
        };

        reader.readAsText(file);
    }

    function convertJSON() {
        let inputJson = document.getElementById("inputJson").value.trim();

        try {
            let jsonData = JSON.parse(inputJson);

            // Check if jsonData is an array
            if (!Array.isArray(jsonData)) {
                throw new Error("Input JSON is not an array");
            }

            let newJson = jsonData.map(function (coordinate) {
                if (!coordinate.lat || !coordinate.lng) {
                    throw new Error(
                        "Missing lat or lng in one of the coordinate pairs",
                    );
                }

                return [coordinate.lat, coordinate.lng];
            });

            var convertedJson = JSON.stringify({ locations: newJson }, null, 2);

            document.getElementById("outputJson").value = convertedJson;
        } catch (error) {
            console.error(error);
            errorMessage = error;
        }
    }

    function downloadConvertedJSON() {
        var convertedJson = document.getElementById("outputJson").value;

        var blob = new Blob([convertedJson], { type: "application/json" });

        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "converted_coordinates.json";
        a.click();
    }
</script>

<div class="container mx-auto p-6">
    <h1 class="text-4xl font-bold mb-8">Map Converter</h1>

    <p class="mb-4 max-w-2xl">
        This tool allows to convert maps from sources like <a
            class="text-secondary"
            target="_blank"
            href="https://map-generator.vercel.app/">Map-Generator</a> to the OpenGuessr
        format.
    </p>

    {#if errorMessage}
        <p class="mb-2 max-w-2xl text-error outline outline-1 p-2 rounded-xl">
            An error occured during conversion: {errorMessage}
        </p>
    {/if}

    <div class="flex items-center flex-col justify-start w-fit mt-8">
        <div class="bg-base-200 rounded-xl p-4 flex justify-center gap-4 flex-wrap">
            <input
                type="file"
                id="fileInput"
                class="file-input file-input-bordered w-full max-w-xs"
                accept=".json"
                onchange={handleFileSelect} />

            <div class="divider">OR</div>

            <textarea
                id="inputJson"
                rows="1"
                cols="5"
                class="textarea textarea-bordered custom-screen-width"
                placeholder="...paste your JSON directly here"></textarea>
        </div>

        <button class="btn btn-secondary my-4" onclick={convertJSON}>Convert <ArrowDown /></button>

        <div class="bg-base-200 rounded-xl p-4 flex justify-center gap-4 flex-wrap">
            <textarea
                id="outputJson"
                rows="1"
                cols="5"
                class="textarea textarea-bordered custom-screen-width"
                placeholder="Converted JSON will appear here"></textarea>
            <button onclick={downloadConvertedJSON} class="btn btn-accent"
                >Download JSON <Download /></button>
        </div>
    </div>
</div>

<style>
    .custom-screen-width {
        width: 20vw;
    }
</style>
