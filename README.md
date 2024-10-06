# OpenGuessr Education
[OpenGuessr Education](https://education.openguessr.com) is a knowledge hub and quiz page for geography enthusiasts, created and managed by [PaulPlay](https://paulplay.studio)👋 The focus of the project is on teaching  players how to improve their skills in geography-guessing games such as OpenGuessr, GeoGuessr or Geotastic. 
The unique combination of minigames, interactive guides and extensive country data should make learning about the world fun and exciting.

## Getting started
This project uses Svelte (UI Framework) with SvelteKit (Web development framework). You can check out their [official docs](https://svelte.dev/) to get started.

## How to contribute
Contributions to the project are greatly appreciated.

If you have a suggestion that would enhance the project, please fork the repo and create a pull request. Giving the project a star would be appreciated ⭐️

1. Fork the Project
2. Create your Feature Branch (git checkout -b suggestion/newSuggestion)
3. Commit your Changes (git commit -m 'Commit message that describes the changes')
4. Push to the Branch (git push origin suggestion/newSuggestion)
5. Open a Pull Request

### Contribution Rules
+ The contribution must fit the project and the geography context
+ Information has to be factual, articles solely written by AI are not permitted
+ Contributions that change the name, the dependencies or any other core aspects of the page usually won't be accepted
+ Please adhere to the code formatting standards used by the project 
+ Rather than submitting large contributions, split them up into smaller changes that can be reviewed more easily. Thank you.

## Creating a guide
1. Guides are located in the ```/src/routes/guides/read/``` folders. Ensure to pick the right difficulty level for your guide - most will fall into the ```intermediate``` category, meaning the root folder for your guide would be ```/src/routes/guides/read/intermediate```.
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