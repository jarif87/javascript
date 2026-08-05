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

/*

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

*/

/*

//Task: Demonstrate the difference between post-decrement and pre-decrement operators
let a = 10;
let b = a--; // Post-decrement operator
console.log(b); // Output: 10
let c = --a;
console.log(c); // Output: 8

let e = ++a; // Pre-increment operator
console.log(e); // Output: 9

const number1 = 10.0122345; // Output: 10.0122345
number1 += 5; // Output: 15.0122345
console.log("Updated number1 is: " + number1); // Output: 15.0122345
number1 -= 3; // Output: 12.0122345
console.log("Updated number1 is: " + number1); // Output: 12.0122345
*/

/*
//Task: Demonstrate addition and subtraction of two numbers and display the results in the output-display div
const number1 = 10.0122345;
const number2 = 1234.56789;
const sum = number1 + number2;
console.log("Sum is: " + sum);
console.log(typeof sum); // Output: number

document.getElementById("output-display").innerText +=
  "\n" + "Sum is: " + sum + "\n" + "Type of sum is: " + typeof sum;

const subtraction = number2 - number1; // display subtraction with Console.log and display in the output-display div
console.log("Subtraction is: " + subtraction);
console.log(typeof subtraction); // Output: number

document.getElementById("output-display").innerText += //display subtraction in the output-display div
  "\n" +
  "Subtraction is: " +
  subtraction +
  "\n" +
  "Type of subtraction is: " +
  typeof subtraction;
*/

/*
// Take input from the user and display the result in the output-display div
// Task: Get user input, convert it to a number, and display it in the output-display div

let userInput = prompt("Enter a number: "); // Prompt the user to enter a number
let userInputNumber = Number(userInput);
document.getElementById("output-display").innerText +=
  "\n" + "You entered: " + userInputNumber;

let userInput2 = prompt("Enter another number: "); // Prompt the user to enter another number
let userInputNumber2 = Number(userInput2);
document.getElementById("output-display").innerText +=
  "\n" + "You entered: " + userInputNumber2;

// Perform addition and display the result in the output-display div
let additionResult = userInputNumber + userInputNumber2;
document.getElementById("output-display").innerText +=
  "\n" + "Addition result is: " + additionResult;

  */

/*
//area of various shapes
//area of rectangle
let length = parseFloat(prompt("Enter the length of the rectangle: "));
let width = parseFloat(prompt("Enter the width of the rectangle: "));
let areaRectangle = length * width;
document.getElementById("output-display").innerText +=
  "\n" + "Area of rectangle is: " + areaRectangle;

//area of triangle
let base = parseFloat(prompt("Enter the base of the triangle: "));
let height = parseFloat(prompt("Enter the height of the triangle: "));
let areaTriangle = 0.5 * base * height;
document.getElementById("output-triangle").innerText +=
  "\n" + "Area of triangle is: " + areaTriangle;

//area of circle
let radius = parseFloat(prompt("Enter the radius of the circle: "));
let areaCircle = Math.PI * radius * radius;
document.getElementById("output-circle").innerText +=
  "\n" + "Area of circle is: " + areaCircle.toFixed(2);
*/

/*
//Task Farenheit to celcious

let farenheight = parseInt(prompt("Enter Farenheight: "));
let cels = ((farenheight - 32) * 5) / 9;
document.getElementById("output-display").innerText +=
  "\n" + "Celsius is: " + cels.toFixed(2);

  */

/*
//Task Celcious to Farenheit
const celsius = parseInt(prompt("Enter Celsius: "));
const faren = (celsius * 9) / 5 + 32;
document.getElementById("output-display").innerText +=
  "\n" + "Farenheit is: " + faren.toFixed(2);
*/
/*
//Task relational and logical operators
let a = parseInt(prompt("Enter first number: "));
let b = parseInt(prompt("Enter second number: "));
if (a > b) {
  document.getElementById("output-display").innerText +=
    "\n" + a + " is greater than " + b; // Display the result in the output-display div
} else if (a < b) {
  document.getElementById("output-display").innerText +=
    "\n" + a + " is less than " + b; // Display the result in the output-display div
} else {
  document.getElementById("output-display").innerText +=
    "\n" + a + " is equal to " + b; // Display the result in the output-display div
}
*/

/*
//Task logical operators
let a = parseInt(prompt("Enter first number: "));
let b = parseInt(prompt("Enter second number: "));
if (a > 0 && b > 0) {
  document.getElementById("output-display").innerText +=
    "\n" + a + " and " + b + " are both positive numbers"; // Display the result in the output-display div
} else if (a < 0 && b < 0) {
  document.getElementById("output-display").innerText +=
    "\n" + a + " and " + b + " are both negative numbers"; // Display the result in the output-display div
} else if (a > 0 || b > 0) {
  document.getElementById("output-display").innerText +=
    "\n" + a + " or " + b + " is a positive number"; // Display the result in the output-display div
} else if (a < 0 || b < 0) {
  document.getElementById("output-display").innerText +=
    "\n" + a + " or " + b + " is a negative number"; // Display the result in the output-display div
} else {
  document.getElementById("output-display").innerText +=
    "\n" + a + " and " + b + " are both zero"; // Display the result in the output-display div
}
    */

/*
// Task: if-else statement to check if a number is even or odd
let a = parseInt(prompt("Enter a number: "));
if (a % 2 === 0) {
  document.getElementById("output-display").innerText +=
    "\n" + a + " is an even number"; // Display the result in the output-display div
} else if (a % 2 !== 0) {
  document.getElementById("output-display").innerText +=
    "\n" + a + " is an odd number"; // Display the result in the output-display div
} else {
  document.getElementById("output-display").innerText +=
    "\n" + a + " is not a valid number"; // Display the result in the output-display div
}

*/

// Task: if-else statement to check the grade based on marks

let marks = parseInt(prompt("Enter your marks: "));
if (marks >= 80 && marks <= 100) {
  document.getElementById("output-display").innerText +=
    "\n" + "Your grade is: A+";
} else if (marks >= 70 && marks < 80) {
  document.getElementById("output-display").innerText +=
    "\n" + "Your grade is: A";
} else if (marks >= 60 && marks < 70) {
  document.getElementById("output-display").innerText +=
    "\n" + "Your grade is: A-";
} else if (marks >= 50 && marks < 60) {
  document.getElementById("output-display").innerText +=
    "\n" + "Your grade is: B";
} else if (marks >= 40 && marks < 50) {
  document.getElementById("output-display").innerText +=
    "\n" + "Your grade is: C";
} else if (marks >= 33 && marks < 40) {
  document.getElementById("output-display").innerText +=
    "\n" + "Your grade is: D";
} else if (marks >= 0 && marks < 33) {
  document.getElementById("output-display").innerText +=
    "\n" + "Your grade is: F";
} else {
  document.getElementById("output-display").innerText +=
    "\n" + "Invalid marks entered. Please enter a number between 0 and 100.";
}
