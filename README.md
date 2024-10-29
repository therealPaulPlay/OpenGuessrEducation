![OpenGuessr Education cover image](src/static/assets/openguessr_jungle_adventure.png?raw=true)

# OpenGuessr Education
[OpenGuessr Education](https://education.openguessr.com) is a knowledge hub and quiz page for geography enthusiasts, created and managed by [PaulPlay](https://paulplay.studio)👋 The goal of the project is to build a site that teaches players how to improve their skills in geography-guessing games such as OpenGuessr, GeoGuessr or Geotastic and appeals to general geography fans as well.
The unique combination of minigames, interactive guides and extensive country data should make learning about the world fun and exciting.

## Getting started
This project uses Svelte (UI Framework) with SvelteKit (Web development framework). You can check out their [official docs](https://svelte.dev/) to get started.
Moreover, Tailwind CSS (which is dependent on PostCSS) is used for utility classes. If you need help, feel free to consult the Discord Server (Link found in the footer area on OpenGuessr Education or OpenGuessr).

## License
This project is licensed under the MIT License (with the Commons Clause) - see the [LICENSE](LICENSE) file for details.
**Note**: This license permits non-commercial use only.

### Prerequisites

+ Have [Node.js](https://nodejs.org/en/download/package-manager) version >=16 installed
+ Install NPM (Node package manager) - usually installs together with Node.js
+ Install a Code Editor (Visual Studio Code, WebStorm, NeoVim etc.)

## How to contribute
Contributions to the project are greatly appreciated.

If you have a suggestion that would enhance the project, please fork the repo and create a pull request. Giving the project a star would be appreciated ⭐️

1. Fork the Project
2. Create your Feature Branch (git checkout -b suggestion/newSuggestion)
3. Commit your Changes (git commit -m 'Commit message that describes the changes')
4. Push to the Branch (git push origin suggestion/newSuggestion)
5. Open a Pull Request to the suggestion branch (not main!)

### Contribution Rules
+ The contribution must fit the project and the geography context
+ Information has to be factual, articles solely written by AI are not permitted
+ Contributions that change the name, the dependencies or any other core aspects of the page usually won't be accepted
+ Please adhere to the code formatting standards used by the project 
+ Rather than submitting large contributions, split them up into smaller changes that can be reviewed more easily. Thank you.

## Creating a guide
1. Guides are located in the ```/src/routes/guides/read/``` folders. Ensure to pick the right difficulty level for your guide - most will fall into the ```intermediate``` category, meaning the root folder for your guide would be ```/src/routes/guides/read/intermediate```. 
If needed, more difficulty levels can be added, e.g. advanced, professional etc. This would simply invovle adding these on the quiz page with appropriate lucide-svelte icons.
2. In that directory, create a subfolder that uses a simple, easily-distinguishable name for the route that your guide should have. Use ```-``` to connect two words, for example ```nmpz-strategies```. This would make the path ```/src/routes/guides/read/intermediate/nmpz-strategies```, in which your ```+page.svelte``` would be located. 
3. You can refer to ```/src/routes/guides/read/example/tutorial``` for a guide template.
4. After creating the guide, add it to the main guides page located under ```/src/routes/guides/+page.svelte```. This works by adding a new GuideCard component with an appropriate icon (see example below). Note that the compass component is a [lucide](https://lucide.dev/icons/) icon, you can simply import one that fits your guide. Moreover, you can adjust the coloring of your guide using the ```hueRotate``` property (takes a number between 0 - 360 as the input, will be converted in degrees).
```
<GuideCard
    title="NMPZ Strategies"
    description="Learn the best strategies for the NMPZ game mode."
    href="/guides/read/intermediate/nmpz-strategies/"
    hueRotate="0">
    <Compass class="w-28 h-28"></Compass>
</GuideCard>
```

Make sure that the title matches the ```<h1>``` title from the page! Moreover, ensure that the folder path matches these names in a simpler form as well - For example, the path for a guide named "The Compass" is ```/compass/```.

### Guide Structure Rules
+ Please follow the structure seen in ```/src/routes/guides/read/example/tutorial```
+ Use proper spacing. Usually at least ```mb-2``` after text, ```mt-8``` for subheadings, ```mb-4``` on text if an image follows it etc. The guide tutorial shows this. 
+ Headings should **not** have a ```:``` at the end
+ Answers for Quizzes should **not** end in a ```., ? or !````
+ Highlight important words in **bold** using ```<b>word</b>```. As a rule of thumb, every concept should be understandable by just reading the words in bold.
+ Make use of article tips and article guides, but don't put too many inside of a guide. Ensure that content > components.

## Writing a Country Article
Country Articles are quite similar to Guides. Therefore, please refer to the ```Guide Structure Rules``` from the previous paragraph. Now, country pages are located in ```/src/routes/countries/learn/$countryName```. From there, you can edit
the +page file. Note that this can be empty - all the surrounding info will be added through the layout. However, there are some differences compard to Guides:
+ Don't include Guide Quizzes: Guide Quizzes are **not** meant for Country Articles.
+ Don't use a H1 heading. The name of the country will be added as a H1 automatically.

## Markdown-To-Code Converter
To write Guides or Articles more easily and to get to know the structure rules, you can try out the [Markdown-To-Code editor](https://education.openguessr.com/tools/markdown-to-code). 

## The Map
The map component (Map.svelte) has a bunch of parameters. Let's go over the most important ones:

+ **region**: The region refers to the highlighted parts on the map. Regions are stored in ```/json/regions.json``` as arrays inside of a JSON file. For example, the region Europe includes, and will therefore 
highlight, all european countries on the map. Moreover, the region settings will be taken from ```/json/regionSettings.json```. The region settings control, for example, the map center point (lat, long), zoom level and 
points on the map (e. g. cities, that are so small, that they wouldn't be displayed at all or hard to see).
+ **zoom**: The zoom property controls the base zoom level of the map. Note that the zoom can be changed dynamically by the user.
+ **width & height**: These control the canvas size (svg viewbox) of the map, not its size on the page. Larger canvas sizes result in smaller labels etc.
+ **interactive**: Interactive maps can be zoomed and panned. When false, the map can not be interacted with at all and appears as a static image. This should, in most scenarios, only be used for previews and not in guides.
+ **showLabels**: Controls whether or not all labels should be shown by default. For example, this is true in the "Learn mode".
+ **minLabelZoom**: Controls the minimum zoom stage at which labels become visible / invisible.
+ **dynamicHeight**: Should only be true for Quizzes on the quiz-page, basically. Makes the map adjust to the screen size.
+ **showPoints**: Controls whether or not points from ```regionSettings.json``` should be displayed. 
+ **topoJsonName**: A ```topojson```is a special file that holds geometry data for regions. This is used to load the actual map data. A topojson for OpenGuessr Education will usually include a name property for all features, so that map highlights etc. work.

## Country Names
Some countries have names that can be written differently. OpenGuessr Education uses the follwing ones:
+ United States (not USA, not United States of America, not United States Of America)
+ Czechia (not Czech Republic)
+ Bosnia and Herzegovina (not just Bosnia or without the "and")
+ Generally the full name, e.g. Democratic Republic of the Congo, Central African Republic (not C. A. R, not Central African Rep, not W. Sahara etc.)

## About Svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

### Creating a project

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

### Developing

Once you've installed dependencies with `npm install`, start a development server.

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

As seen in the ```package.json```, the command was modified to use the port 3000 (use localhost:3000 as the URL).

### Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.