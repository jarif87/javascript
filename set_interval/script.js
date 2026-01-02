// alert("Hello, World!");

/*

setInterval(function () {
  console.log("This message is logged every 2 seconds.");
}, 2000);
*/

/*

let a = setTimeout(function () {
  console.log("This message is logged after a 5-second delay.");
}, 5000);

clearTimeout(a);
console.log(a);
*/

/*
alert("Please enter a number between 0 and 100:");
let a = setTimeout(function () {
  alert("Inside setTimeout function");
}, 3000);

let b = prompt("Enter your number: ");
b = Number.parseInt(b);

if (isNaN(b)) {
  alert("Please enter a valid number.");
} else if (b < 0) {
  alert("Please enter a positive number.");
} else if (b > 100) {
  clearTimeout(a);
  alert("Number is too large, timer cleared.");
} else {
  alert("You entered: " + b);
}

console.log(b);
*/
// function sum(a, b) {
//   return a + b;
// }

// alert("i am trying to open alert after 3 second");
// setTimeout(function () {
//   alert("The sum is: " + sum(5, 10));
// }, 3000);

setInterval(function () {
  let d = new Date();
  console.log(d.toLocaleTimeString());
}, 3000);
