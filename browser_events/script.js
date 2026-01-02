/*

let a = document.getElementsByClassName("container")[0];
a.onclick = function () {
  alert("Container clicked");
  let b = document.getElementsByClassName("eventButton")[0];
  b.innerHTML = "Clicked!";
};


*/

/*
let eventButton = document.getElementById("eventButton");

let b = function (e) {
  alert("Container clicked");
};

let c = function (e) {
  alert("Button clicked");
};

eventButton.addEventListener("click", b);

eventButton.addEventListener("click", c);

let a = prompt("Enter your Number: ");
a = Number.parseInt(a);

if (a == 2) {
  eventButton.removeEventListener("click", c);
}
*/

let hello = function (event) {
  console.log("#".padEnd(50, "#"));

  console.log("Hello World");
  console.log(event.target);
  console.log(event.type);
  console.log(event.bubbles);
  console.log(event.clientX);
  console.log(event.clientY);
  console.log("#".padEnd(50, "#"));
};

let hi = function (et) {
  console.log("#".padEnd(50, "#"));
  console.log("Hi sonia");
  console.log(et);
  console.log(et.type);
  console.log("------------------");
  console.log("#".padEnd(50, "#"));
};

eventButton.addEventListener("click", hello);
eventButton.addEventListener("click", hi);
