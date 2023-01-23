// import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/highlight.min.js';
// // import ts from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/typescript.min.js';
// // hljs.registerLanguage("typescript", ts)
// hljs.highlightAll()

const codeBlocks = document.getElementsByClassName("code-block")

for (const cb of codeBlocks) {
	const copyItem = cb.firstElementChild
	copyItem.addEventListener("click", item => {
		navigator.clipboard.writeText(cb.textContent.split("⎘")[1].split("\n")[1].trim());
	})
}

const extLink = document.getElementById("external-links")

console.log(extLink)

window.addEventListener("scroll", () => {
	extLink.style.top = `${window.scrollY}px`
})

const menuItems = document.getElementsByClassName("main-menu-item")
for (const menuItem of menuItems) {
	const codeSample = document.getElementById(menuItem.id.split("-")[1])
	const scrollOffset = window.innerHeight * 0.10
	menuItem.addEventListener("click", () => window.scrollTo(0, getOffset(codeSample).top - scrollOffset))
}

function getOffset(el) {
	const rect = el.getBoundingClientRect();
	return {
		left: rect.left + window.scrollX,
		top: rect.top + window.scrollY
	};
}