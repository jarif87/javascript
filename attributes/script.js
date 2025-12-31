let a = first.getAttribute("class");
console.log(a);
console.log(first.hasAttribute("style"));
console.log(first.hasAttribute("class"));
let b = document.getElementById("first");
console.log(b);
// let c = first.setAttribute("class", "hello_bangladesh");
// console.log(c);

// first.setAttribute("class", "hello_bangladesh");
first.removeAttribute("class");
console.log(first.attributes);
console.log("New Attributes: ", first.getAttribute);
console.log(first.dataset);
console.log(first.dataset.game);
console.log(first.dataset.player);
