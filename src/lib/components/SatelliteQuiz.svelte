<script>
    import { onMount } from "svelte";
    import BaseOptionsQuiz from "$lib/components/BaseOptionsQuiz.svelte";
    import "ol/ol.css";
    import { Map, View } from "ol";
    import TileLayer from "ol/layer/Tile";
    import XYZ from "ol/source/XYZ";
    import { fromLonLat, toLonLat } from "ol/proj";

    let { jsonName = "capital-cities", regionType = "city" } = $props();

    let [a1, a2, a3, a4] = $state("");
    
    // svelte-ignore state_referenced_locally
    let answers = [a1, a2, a3, a4];
    let correctAnswer = $state(1);
    let question = `Which ${regionType} does this image show?`;

    let locationsArray = [];
    let questionAmount = $state(0);
    let remainingLocationsArray = [];
    let currentLocation;
    let map;
    let currentExtent;

    async function fetchRegions() {
        try {
            jsonName.replace(".json", ""); // In case the .json is included, strip it out

            const response = await fetch(
                `/json/satellite/${jsonName}.json`,
            );
            const data = await response.json();
            locationsArray = data["Locations"];
            return [...locationsArray];
        } catch (error) {
            console.error("Error loading region locations:", error);
            return [];
        }
    }

    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled;
    }

    async function startSatelliteGame() {
        await fetchRegions();

        if (locationsArray.length === 0) {
            console.error("No locations loaded");
            return;
        }
        remainingLocationsArray = shuffleArray(locationsArray).slice(0, 10);
        questionAmount = remainingLocationsArray.length;
        setQuizContent();
    }

    function setQuizContent() {
        if (remainingLocationsArray.length === 0) {
            return;
        }
        currentLocation = remainingLocationsArray.pop();

        const otherLocations = shuffleArray(
            locationsArray.filter((loc) => loc.name !== currentLocation.name),
        ).slice(0, 3);

        const allOptions = shuffleArray([currentLocation, ...otherLocations]);

        correctAnswer =
            allOptions.findIndex((loc) => loc.name === currentLocation.name) +
            1;

        [a1, a2, a3, a4] = allOptions.map((loc) => loc.name);

        answers = [a1, a2, a3, a4];

        updateMap(currentLocation.lat, currentLocation.long);
    }

    function handleNextQuestion() {
        if (remainingLocationsArray.length > 0) {
            setQuizContent();
        }
    }

    function loadMap() {
        if (map) {
            map = undefined;
            if (document) {
                document.getElementById("map").innerHTML = "";
            }
        }
        map = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                        attributions:
                            "© Esri, Maxar, Earthstar Geographics, and the GIS User Community",
                    }),
                }),
            ],
            view: new View({
                center: [0, 0],
                zoom: 2,
                minZoom: 12,
                maxZoom: 17,
            }),
        });
    }

    function constrainCenter(center, extent) {
        const [x, y] = center;
        const [minX, minY, maxX, maxY] = extent;
        return [
            Math.max(minX, Math.min(x, maxX)),
            Math.max(minY, Math.min(y, maxY)),
        ];
    }

    function updateMap(lat, long) {
        if (!map) return;

        loadMap();

        const view = map.getView();
        view.setCenter(fromLonLat([long, lat]));
        view.setZoom(12);

        // Create a bounding box around the city
        const boxWidth = 0.2; // Approximately 11km at the equator
        const boxHeight = 0.2;
        currentExtent = [
            long - boxWidth / 2,
            lat - boxHeight / 2,
            long + boxWidth / 2,
            lat + boxHeight / 2,
        ];

        // Remove previous listener if exists
        if (view.getProperties().centerConstraint) {
            view.un("change:center", view.getProperties().centerConstraint);
        }

        // Set up the view with constraints
        const centerConstraint = function () {
            const currentCenter = view.getCenter();
            const [longitude, latitude] = toLonLat(currentCenter);

            if (
                longitude < currentExtent[0] ||
                longitude > currentExtent[2] ||
                latitude < currentExtent[1] ||
                latitude > currentExtent[3]
            ) {
                const constrainedLonLat = constrainCenter(
                    [longitude, latitude],
                    currentExtent,
                );
                const constrainedCenter = fromLonLat(constrainedLonLat);
                view.setCenter(constrainedCenter);
            }
        };

        view.on("change:center", centerConstraint);
        view.setProperties({ centerConstraint: centerConstraint });
    }

    onMount(() => {
        loadMap();
        startSatelliteGame();
    });
</script>

<BaseOptionsQuiz
    answerOne={a1}
    answerTwo={a2}
    answerThree={a3}
    answerFour={a4}
    {questionAmount}
    {question}
    {correctAnswer}
    {handleNextQuestion}
    handleStartGame={startSatelliteGame}>
    <div class="w-full h-full mb-4 rounded-lg overflow-hidden">
        <div id="map" class="custom-size"></div>
    </div>
</BaseOptionsQuiz>

<style>
    .custom-size {
        width: 100%;
        height: 40dvh;
    }

    @media (max-width: 700px) {
        .custom-size {
            height: 20dvh;
        }
    }
</style>
