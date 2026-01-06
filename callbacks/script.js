/*

//synchonous way
let a = prompt("Enter first number:");
let b = prompt("Enter Your Name:");
let c = prompt("Enter Your Age:");
let d = prompt("Enter Your Country:");
let e = prompt("Enter Your Profession:");

console.log("First Number: " + a);
console.log("Name: " + b);
console.log("Age: " + c);
console.log("Country: " + d);
console.log("Profession: " + e);

//asynchronous way using callbacks
console.log("Asynchronous way using Callbacks:");
console.log("Waiting for 3 seconds to get the first number...");
console.log("#".repeat(100));

setTimeout(function () {
  let a = prompt("Enter first number:");
  console.log("First Number: " + a);
}, 3000);

console.log("Waiting for 3 seconds to get the Name...");
console.log("#".repeat(100));
console.log("End of Script");

*/

function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
}
loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js",
  function () {
    console.log("Lodash library loaded!");
    console.log(_.chunk(["a", "b", "c", "d"], 2));
  }
);

loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js",
  function () {
    console.log("Axios library loaded!");
    alert("Check the console for Axios GET request result.");
    axios.get("https://api.github.com/users/octocat").then(function (response) {
      console.log(response.data);
    });
  }
);
