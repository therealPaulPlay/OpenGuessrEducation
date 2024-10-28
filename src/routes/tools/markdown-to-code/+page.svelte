<script>
    import {
        Hash,
        ListOrdered,
        Lightbulb,
        Frame,
        LucideGamepad,
        HelpCircle,
        Copy,
    } from "lucide-svelte";

    import { onMount } from "svelte";

    let markdown = $state("");

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
                        code += `<ArticleEmbedPanorama src="${componentContent[0]}" />\n`;
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
                code += `<h3 class="text-xl font-bold mt-8 mb-2">${line.slice(4)}</h3>\n`;
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
        if (imports.ArticleTip)
            importBlock +=
                'import ArticleTip from "$lib/components/ArticleTip.svelte";\n';
        if (imports.GuideQuiz)
            importBlock +=
                'import GuideQuiz from "$lib/components/GuideQuiz.svelte";\n';
        if (imports.ArticleEmbedPanorama)
            importBlock +=
                'import ArticleEmbedPanorama from "$lib/components/ArticleEmbedPanorama.svelte";\n';
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
            case "list":
                insertion = `- ${selectedText}`;
                break;
            case "tip":
                insertion = `[Component ArticleTip]\n${selectedText}\n[/Component]`;
                break;
            case "embed":
                insertion = `[Component ArticleEmbedPanorama]\nhttps://example.com/embed-url\n[/Component]`;
                break;
            case "quiz":
                insertion = `[Component GuideQuiz]\nYour question here\nAnswer 1\nAnswer 2\nAnswer 3\nAnswer 4\nCorrect Answer: 1\n[/Component]`;
                break;
        }

        markdown =
            text.substring(0, start) + insertion + text.substring(end) + "\n";
        textarea.focus();
    }

    async function copyToClipboard() {
        const code = generateCode(markdown);
        await navigator.clipboard.writeText(code);
    }

    let generatedCode = $derived(generateCode(markdown));

    onMount(() => {
        // Keyboard shortcuts
        if (window) {
            window.addEventListener("keydown", (event) => {
                if ((event.ctrlKey || event.metaKey) && event.key === "b") {
                    event.preventDefault();
                    insertMarkdown("bold");
                }
            });
        }
    });
</script>

<div class="container mx-auto p-6">
    <h1 class="text-4xl font-bold mb-8">Markdown-To-Code Converter</h1>

    <p class="mb-2 max-w-2xl">
        Use this markdown editor to create guides and articles without writing
        code. Feel free to ask for help on the <b>Discord Server</b> if you struggle
        with using this converter or don't know how to create a pull request with
        the finished code on GitHub.
    </p>

    <p class="font-bold">Please read:</p>
    <ul class="list list-disc list-inside mb-4">
        <li>
            You can only have <b>one</b> H1 header per article.
        </li>
        <li>
            Only use <b>Guide Quizzes</b> in <b>Guides</b>.
        </li>
        <li>
            Please follow the formatting and structure rules explained in the <a
                class="text-secondary"
                target="_blank"
                href="https://github.com/therealPaulPlay/OpenGuessrEducation/blob/main/README.md"
                >Readme</a> file.
        </li>
    </ul>

    <p class="mb-2 max-w-2xl">
        Please note that this is <b>not a real markdown</b> editor and only uses a <b>simplified version</b> of the markdown syntax. All available features can be accessed
        via the buttons in the tool bar. It is recommended to <b>first select</b> the text that you want to apply a style to and <b>then click</b> the button.
    </p>

    <div class="h-fit pb-1 bg-base-100 rounded-xl bg-base-200 mt-10">
        <div class="flex gap-2 p-4 bg-base-300 rounded-lg">
            <div class="lg:tooltip" data-tip="Heading 1 (large, only one)">
                <button
                    onclick={() => insertMarkdown("h1")}
                    class="btn btn-ghost btn-sm"><Hash size={20} />1</button>
            </div>
            <div class="lg:tooltip" data-tip="Heading 2 (medium)">
                <button
                    onclick={() => insertMarkdown("h2")}
                    class="btn btn-ghost btn-sm"><Hash size={20} />2</button>
            </div>
            <div class="lg:tooltip" data-tip="Heading 3 (small)">
                <button
                    onclick={() => insertMarkdown("h3")}
                    class="btn btn-ghost btn-sm"><Hash size={20} />3</button>
            </div>
            <div class="lg:tooltip" data-tip="Bold">
                <button
                    onclick={() => insertMarkdown("bold")}
                    class="btn btn-ghost btn-sm font-bold">B</button>
            </div>
            <div class="lg:tooltip" data-tip="List">
                <button
                    onclick={() => insertMarkdown("list")}
                    class="btn btn-ghost btn-sm"
                    ><ListOrdered size={20} /></button>
            </div>
            <div class="lg:tooltip" data-tip="Article Tip">
                <button
                    onclick={() => insertMarkdown("tip")}
                    class="btn btn-ghost btn-sm"
                    ><Lightbulb size={20} /></button>
            </div>
            <div class="lg:tooltip" data-tip="Article Embed">
                <button
                    onclick={() => insertMarkdown("embed")}
                    class="btn btn-ghost btn-sm"><Frame size={20} /></button>
            </div>
            <div class="lg:tooltip" data-tip="Guide Quiz">
                <button
                    onclick={() => insertMarkdown("quiz")}
                    class="btn btn-ghost btn-sm"
                    ><LucideGamepad size={20} /></button>
            </div>
        </div>

        <div class="flex flex-1 h-fit pb-14">
            <div class="w-1/2 p-4 h-[calc(100vh-16rem)] relative">
                <h2 class="text-lg font-bold mb-4 h-10">Markdown Editor</h2>
                <textarea
                    bind:value={markdown}
                    class="w-full h-full p-4 bg-base-200 rounded-xl font-mono text-sm overflow-y-auto resize-none bg-base-300"
                    placeholder="Start typing your markdown here..."></textarea>
            </div>

            <div class="w-1/2 p-4 h-[calc(100vh-16rem)] relative">
                <h2 class="text-lg font-bold mb-4 flex items-center h-10">
                    Generated Code
                    <button
                        onclick={copyToClipboard}
                        class="btn btn-accent btn-sm ml-auto"
                        ><Copy size={16} />Copy</button>
                </h2>
                <code
                    class="block w-full h-full p-4 bg-neutral rounded-xl font-mono text-sm whitespace-pre-wrap overflow-y-auto text-white">
                    {generatedCode}
                </code>
            </div>
        </div>
    </div>
</div>
