// alert("hello bangladesh");
//multiple comment
/*
alert("hello bangladesh is a small cuuntry");
*/

// document.write("hello bangladesh is a small country");

// console.log("hello bangladesh is a Big country");

// script.js
// const name = "Bangladesh";

// // Target the element by its ID and change its text content
// document.getElementById("country-heading").innerText =
//   `hello ${name} is a small country`;

/*
let number1 = 10.0122345;
console.log(number1.toPrecision(2)); // Output: 10
console.log(number1.toPrecision(3));
console.log(number1.toPrecision(4));
console.log(number1.toPrecision(5));
console.log(number1.toFixed(2)); // Output: 10.01
console.log(number1.toFixed(3)); // Output: 10.012
console.log(number1.toFixed(4)); // Output: 10.0122
console.log(number1.toFixed(5)); // Output: 10.01223

console.log("Exponential Notation:");
let number2 = 1234.56789;
console.log(number2.toExponential(2));
// console.log(number2.toExponential(3));
// console.log(number2.toExponential(4));
// console.log(number2.toExponential(5));


*/

// document.getElementById("output-display").innerText =
//   "hello bangladesh has a small population but a big heart" +
//   " hello Bangladesh is a small country";

// let name = "Bangladesh";
// let lastName = "is a small country";
// let fullName = name + " " + lastName;
// document.getElementById("output-display").innerText = fullName;

// let fullName2 = "Anisul Islam" + " " + "is a good boy";
// document.getElementById("Anisul").innerText = fullName2;

/*
const number1 = 10.0122345;
const number2 = 1234.56789;
document.getElementById("output-display").innerText +=
  "\n" + "Number 1 is: " + number1;
document.getElementById("output-display").innerText +=
  "\n" + "Number 2 is: " + number2;

  */

// let x = "bangladesh";
// document.getElementById("output-display").innerText +=
//   "\n" + "Length of x is: " + x.length;

/*
let x = prompt("Enter your name: ");
document.getElementById("output-display").innerText +=
  "\n" + "Your name is: " + x;

document.getElementById("output-display").innerText +=
  "\n" + "Length of your name is: " + x.length;
document.getElementById("output-display").innerText +=
  "\n" + "Uppercase of your name is: " + x.toUpperCase();
document.getElementById("output-display").innerText +=
  "\n" + "Lowercase of your name is: " + x.toLowerCase();

document.getElementById("output-display").innerText +=
  "\n" + "Your name is: " + x.charAt(0) + " " + x.charAt(x.length - 1);

  */

/*
let a = "hello world";
let b = "hello bangladesh";
let c = a.concat(" ", b);
document.getElementById("output-display").innerText +=
  "\n" + "Concatenated string is: " + c;

const string1 = "Hello, Bangladesh!";
const string2 = string1.slice(7, 17); // Extracts "Bangladesh"
document.getElementById("output-display-2").innerText +=
  "\n" + "Sliced string is: " + string2;

  */

//Task: Get user name and last name, display full name, length of full name, and uppercase version of full name in the output-display div

//get user name and display it in the output-display div
let userName = prompt("Enter your name: ");
document.getElementById("output-display").innerText +=
  "\n" + "Your name is: " + userName;

//get last name and display it in the output-display div
let lastName = prompt("Enter your last name: ");
document.getElementById("output-display").innerText +=
  "\n" + "Your last name is: " + lastName;

//print full name in the output-display div
let fullName = userName + " " + lastName;
document.getElementById("output-display").innerText +=
  "\n" + "Your full name is: " + fullName;

//get total length of full name and display it in the output-display div
let fullNameLength = fullName.length;
document.getElementById("output-display").innerText +=
  "\n" + "Length of your full name is: " + fullNameLength;

// convert full name to uppercase and display it in the output-display div
let fullNameUpperCase = fullName.toUpperCase();
document.getElementById("output-display").innerText +=
  "\n" + "Your full name in uppercase is: " + fullNameUpperCase;
