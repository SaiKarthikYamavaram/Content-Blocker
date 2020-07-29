var butn = document.querySelector("#addButton");
var input = document.querySelector("input");
var keyword = document.querySelector("#keywords-list");

butn.addEventListener("click", () => {
	keyword.innerHTML += (input.value + "<br>");
});
