// import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/highlight.min.js';
// // import ts from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/typescript.min.js';
// // hljs.registerLanguage("typescript", ts)
// hljs.highlightAll()

;

const codeBlocks = document.getElementsByClassName("code-block")

for (const cb of codeBlocks) {
	const copyItem = cb.firstElementChild
	copyItem.addEventListener("click", item => {
		navigator.clipboard.writeText(cb.textContent.split("⎘")[1].split("\n")[1].trim());
	})
}

const extLink = document.getElementById("external-links")

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

var string = "A Fastify wrapper that makes HTTP servers stupidly easy."

// var string = "CodeHim is one of the BEST developer websites that provide web designers and developers with a simple way to preview and download a variety of free code & scripts.";
var str = string.split("");
var el = document.getElementById('main-subtitle');
(function animate() {
	if (el.innerHTML[el.innerHTML.length - 1] == ".") {
		clearTimeout(running)
		return
	}
	el.innerHTML = el.innerHTML.slice(0, -1)
	str.length > 0 ? el.innerHTML += str.shift() + "|" : clearTimeout(running); 
	const time = Math.random() * 100; + 40
	// console.log(time)
	var running = setTimeout(animate, time);
})();


const scrollItems = [
	"home",
	"installation",
	"ping",
	"rest",
	"hooks"
]

let scrollPosition = "home"

document.addEventListener("keydown", e => {
	const currentIndex = scrollItems.indexOf(scrollPosition)
	const scrollOffset = window.innerHeight * 0.10

	if (e.keyCode == 38) {
		e.preventDefault();
		if (currentIndex == 0) return
		scrollPosition = scrollItems[currentIndex - 1]
		const el = document.getElementById(scrollPosition)
		window.scrollTo(0, getOffset(el).top - scrollOffset)
	}

	else if (e.keyCode == 40) {
		e.preventDefault();
		if (currentIndex == scrollItems.length - 1) return
		scrollPosition = scrollItems[currentIndex + 1]
		const el = document.getElementById(scrollPosition)
		window.scrollTo(0, getOffset(el).top - scrollOffset)
	}
})

