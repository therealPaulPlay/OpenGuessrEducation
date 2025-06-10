<script>
	import { Hash, ListOrdered, Lightbulb, Frame, LucideGamepad, HelpCircle, Captions, X, Copy } from "lucide-svelte";

	import { onMount } from "svelte";
	import { setTitle } from "$lib/utils/pageTitle.svelte.js";

	let markdown = $state("");

	let showPreview = $state(false);

	function generateCode(markdown) {
		if (!markdown.trim()) return "";

		const imports = {
			ArticleTip: false,
			GuideQuiz: false,
			ArticleEmbedPanorama: false,
		};
		let code = "";
		const lines = markdown.split("\n");
		let inComponent = false;
		let componentContent = [];
		let currentComponent = "";
		let isInList = false;
		let hasH1 = false;

		lines.forEach((line) => {
			// Handle bold text replacement first
			line = line.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

			if (line.startsWith("[Component ")) {
				inComponent = true;
				currentComponent = line.match(/\[Component (.*?)\]/)[1];
				imports[currentComponent] = true;
				return;
			}
			if (line === "[/Component]") {
				inComponent = false;
				switch (currentComponent) {
					case "ArticleTip":
						code += `<ArticleTip>\n${componentContent.join("\n")}\n</ArticleTip>\n`;
						break;
					case "GuideQuiz":
						const [question, ...answers] = componentContent;
						code += `<GuideQuiz\n  question="${question}"\n  answerOne="${answers[0]}"\n  answerTwo="${answers[1]}"\n  answerThree="${answers[2]}"\n  answerFour="${answers[3]}"\n  correctAnswer={${answers[4]?.replace("Correct Answer: ", "") || 1}}\n/>\n`;
						break;
					case "ArticleEmbedPanorama":
						code += `<ArticleEmbedPanorama src="${componentContent[0]}"></ArticleEmbedPanorama>\n`;
						break;
				}
				componentContent = [];
				return;
			}
			if (inComponent) {
				componentContent.push(line);
				return;
			}

			// Handle headings and other markdown syntax
			if (line.startsWith("# ")) {
				if (!hasH1) {
					code += `<h1 class="text-4xl font-bold mb-4">${line.slice(2)}</h1>\n`;
					hasH1 = true;
				}
			} else if (line.startsWith("## ")) {
				code += `<h2 class="text-2xl font-bold mt-8 mb-2">${line.slice(3)}</h2>\n`;
			} else if (line.startsWith("### ")) {
				code += `<h3 class="text-xl font-bold mt-6 mb-1">${line.slice(4)}</h3>\n`;
			} else if (line.startsWith("__ ")) {
				code += `<p class="text-center mt-2">${line.slice(3)}</p>\n`;
			} else if (line.startsWith("- ")) {
				if (!isInList) {
					code += `<ul class="mb-2 list-disc list-inside">\n`;
					isInList = true;
				}
				code += `<li>${line.slice(2)}</li>\n`;
			} else {
				if (isInList) {
					code += `</ul>\n`;
					isInList = false;
				}
				if (line.trim()) {
					code += `<p class="mb-2">${line}</p>\n`;
				}
			}
		});
		if (isInList) {
			code += `</ul>\n`;
		}

		let importBlock = "<script>\n";
		if (imports.ArticleTip) importBlock += 'import ArticleTip from "$lib/components/ArticleTip.svelte";\n';
		if (imports.GuideQuiz) importBlock += 'import GuideQuiz from "$lib/components/GuideQuiz.svelte";\n';
		if (imports.ArticleEmbedPanorama)
			importBlock += 'import ArticleEmbedPanorama from "$lib/components/ArticleEmbedPanorama.svelte";\n';
		importBlock += "</\script>\n\n";
		return importBlock.trimStart() + code.trimStart();
	}

	function insertMarkdown(type) {
		const textarea = document.querySelector("textarea");
		if (!textarea) return;
		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const text = textarea.value;
		const selectedText = text.substring(start, end);

		let insertion = "";
		switch (type) {
			case "h1":
				insertion = `# ${selectedText}`;
				break;
			case "h2":
				insertion = `## ${selectedText}`;
				break;
			case "h3":
				insertion = `### ${selectedText}`;
				break;
			case "bold":
				insertion = `**${selectedText}**`;
				break;
			case "caption":
				insertion = `__ ${selectedText}`;
				break;
			case "list":
				insertion = `- ${selectedText}`;
				break;
			case "tip":
				insertion = `[Component ArticleTip]\n${selectedText}\n[/Component]`;
				break;
			case "embed":
				insertion = `[Component ArticleEmbedPanorama]\nhttps://example.com/\n[/Component]`;
				break;
			case "quiz":
				insertion = `[Component GuideQuiz]\nYour question here\nAnswer 1\nAnswer 2\nAnswer 3\nAnswer 4\nCorrect Answer: 1\n[/Component]`;
				break;
		}

		markdown = text.substring(0, start) + insertion + text.substring(end) + "\n";
		textarea.focus();
	}

	async function copyToClipboard() {
		const code = generateCode(markdown);
		await navigator.clipboard.writeText(code);
	}

	let generatedCode = $derived(generateCode(markdown));

	// Function to close the preview modal
	function closePreview() {
		showPreview = false;
	}

	function openPreview() {
		showPreview = true;
	}

	function saveMarkdownToStorage() {
		if (localStorage) {
			localStorage.setItem("markdownToCodeInput", markdown);
		}
	}

	onMount(() => {
		setTitle("Markdown-To-Code");

		// Keyboard shortcuts
		if (window) {
			markdown = localStorage.getItem("markdownToCodeInput") || ""; // Load input from storage
			window.addEventListener("keydown", (event) => {
				if ((event.ctrlKey || event.metaKey) && event.key === "b") {
					event.preventDefault();
					insertMarkdown("bold");
				}
			});
		}
	});
</script>

<div class="container mx-auto p-6 px-1">
	<h1 class="text-4xl font-bold mb-8">Markdown-To-Code converter</h1>

	<p class="mb-4 max-w-2xl">
		Use this markdown editor to create guides and articles without writing code. Feel free to ask for help on the <b
			>Discord server</b
		>
		(link down below in the footer) if you struggle with using this converter or don't know how to create a pull request
		with the finished code on GitHub. You could also
		<b>send your finished article code</b> to experienced people there, who can create the Fork with your changes and a Pull
		Request to the OpenGuessr Education Repository for you.
	</p>

	<p class="font-bold">Please read:</p>
	<ul class="list list-disc list-inside mb-4 max-w-2xl">
		<li>
			You can only have <b>one</b> H1 header per article.
		</li>
		<li>
			Country Articles should <b>not</b> have a <b>H1 header</b>, as the country name will be added as such
			automatically.
		</li>
		<li>
			For embedding Panoramas using Google Maps, please refer to <a
				class="text-secondary"
				href="/tools/acquire-embed-links">this guide</a
			>.
		</li>
		<li>
			Please <b>don't</b> create nested headers, so for example, don't put an <b>H3 after an H2 without any text</b> in
			<b>between</b>.
		</li>
		<li>
			Please mark important words in <b>bold</b>.
		</li>
		<li>
			Only use <b>Guide Quizzes</b> in <b>Guides</b>.
		</li>
		<li>
			Please follow the formatting and structure rules explained in the <a
				class="text-secondary"
				target="_blank"
				href="https://github.com/therealPaulPlay/OpenGuessrEducation/blob/main/README.md">Readme</a
			> file.
		</li>
		<li>
			Check out this example guide with <b>all components</b>
			<a class="text-secondary" target="_blank" href="/guides/read/example/tutorial/">here</a>.
		</li>
	</ul>

	<p class="mb-2 max-w-2xl">
		Please note that this only uses a <b>simplified version</b> of the markdown syntax. All available features can be
		accessed via the tool bar. It is recommended to <b>first select</b> the text that you want to apply a style to and
		<b>then click</b> the button. Thank you!
	</p>

	<div class="h-fit pb-1 bg-base-100 rounded-3xl bg-base-200 mt-10">
		<div class="flex gap-2 p-4 bg-base-300 rounded-3xl flex-wrap">
			<div class="lg:tooltip" data-tip="Heading 1 (large, only one)">
				<button onclick={() => insertMarkdown("h1")} class="btn btn-ghost btn-sm">H1</button>
			</div>
			<div class="lg:tooltip" data-tip="Heading 2 (medium)">
				<button onclick={() => insertMarkdown("h2")} class="btn btn-ghost btn-sm">H2</button>
			</div>
			<div class="lg:tooltip" data-tip="Heading 3 (small)">
				<button onclick={() => insertMarkdown("h3")} class="btn btn-ghost btn-sm">H3</button>
			</div>
			<div class="lg:tooltip" data-tip="Bold">
				<button onclick={() => insertMarkdown("bold")} class="btn btn-ghost btn-sm font-bold">B</button>
			</div>
			<div class="lg:tooltip" data-tip="List">
				<button onclick={() => insertMarkdown("list")} class="btn btn-ghost btn-sm"><ListOrdered size={20} /></button>
			</div>
			<div class="lg:tooltip" data-tip="Caption (For Article Embed or Images)">
				<button onclick={() => insertMarkdown("caption")} class="btn btn-ghost btn-sm"><Captions size={20} /></button>
			</div>
			<div class="lg:tooltip" data-tip="Article Tip">
				<button onclick={() => insertMarkdown("tip")} class="btn btn-ghost btn-sm"><Lightbulb size={20} /></button>
			</div>
			<div class="lg:tooltip" data-tip="Article Embed">
				<button onclick={() => insertMarkdown("embed")} class="btn btn-ghost btn-sm"><Frame size={20} /></button>
			</div>
			<div class="lg:tooltip" data-tip="Guide Quiz">
				<button onclick={() => insertMarkdown("quiz")} class="btn btn-ghost btn-sm"><LucideGamepad size={20} /></button>
			</div>
		</div>

		<div class="flex flex-1 h-fit pb-14 flex-wrap gap-y-12">
			<div class="w-1/2 p-4 min-w-52 grow h-[calc(100vh-16rem)] relative pr-2">
				<h2 class="text-lg font-bold mb-4 h-10 flex items-center">Markdown editor</h2>
				<textarea
					bind:value={markdown}
					oninput={saveMarkdownToStorage}
					class="w-full h-full p-4 bg-base-200 rounded-xl font-mono text-sm overflow-y-auto resize-none bg-base-300"
					placeholder="Start typing your pseudo-markdown text here..."
				></textarea>
			</div>

			<div class="w-1/2 p-4 min-w-52 grow h-[calc(100vh-16rem)] relative pl-2">
				<h2 class="text-lg font-bold mb-4 flex items-center h-10">
					Code
					<button class="btn btn-accent btn-sm ml-auto" onclick={openPreview}> Preview </button>
					<button onclick={copyToClipboard} class="btn btn-accent btn-sm ml-2"><Copy size={16} />Copy</button>
				</h2>
				<code
					class="block w-full h-full p-4 bg-neutral rounded-xl font-mono text-sm whitespace-pre-wrap overflow-y-auto text-white"
				>
					{generatedCode}
				</code>
			</div>
		</div>
	</div>

	<!-- Modal for Preview -->
	{#if showPreview}
		<div class="fixed inset-0 flex overflow-auto items-center justify-center bg-black/50">
			<div class="bg-base-100 max-h-[80dvh] overflow-auto rounded-lg p-4 w-11/12 md:w-3/4 lg:w-1/2">
				<div class="flex justify-between items-center">
					<h2 class="text-lg font-bold">Preview</h2>
					<button onclick={closePreview} class="btn btn-ghost">
						<X size={20} />
					</button>
				</div>
				<p class="mb-2">
					Please note that this is not an exact preview, just roughly how your article will look like. Components cannot
					be displayed properly, e.g. Guide Quizzes will not be rendered here at all.
				</p>
				<div class="mt-4 p-4 border rounded outline outline-accent border-none">
					{@html generatedCode
						.replaceAll("<ArticleTip>", "<mark>")
						.replaceAll("</ArticleTip>", "</mark>")
						.replaceAll("<ArticleEmbedPanorama", `<iframe style="width: 100%; height: 400px;"`)
						.replaceAll("</ArticleEmbedPanorama>", "</iframe>")}
					<!-- Render the generated code as HTML -->
				</div>
			</div>
		</div>
	{/if}
</div>
