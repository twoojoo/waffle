import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/highlight.min.js';
// import ts from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/typescript.min.js';
// hljs.registerLanguage("typescript", ts)
hljs.highlightAll()

const codeBlocks = document.getElementsByClassName("code-block")

for (const cb of codeBlocks) {
	const copyItem = cb.firstElementChild
	console.log(copyItem)
	copyItem.addEventListener("click", item => {
		navigator.clipboard.writeText(cb.textContent.split("⎘")[1].split("\n")[1].trim());
	})
}