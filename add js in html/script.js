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
/*

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
*/

/*
let x = 10;
// let result = x > 5 ? "x is greater than 5" : "x is less than or equal to 5";
// document.getElementById("output-display").innerText += "\n" + result;

if (x > 5) {
  document.getElementById("output-display").innerText +=
    "\n" + "x is greater than 5";
} else if (x <= 5) {
  document.getElementById("output-display").innerText +=
    "\n" + "x is less than or equal to 5";
} else if (x === 5) {
  document.getElementById("output-display").innerText +=
    "\n" + "x is equal to 5";
} else {
  document.getElementById("output-display").innerText +=
    "\n" + "x is not a number";
}
*/

//Ternary operator
/*
let x = 10;
let result = x > 5 ? "x is greater than 5" : "x is less than or equal to 5";
document.getElementById("output-display").innerText += "\n" + result;
*/

/*
let number = parseInt(prompt("Enter a number: "));
let numberResult =
  number > 0 ? "The number is positive" : "The number is not positive";
document.getElementById("output-display").innerText += "\n" + numberResult;
*/

/*
let number = 3;
let numberResult =
  number > 0
    ? "The number is positive"
    : number < 0
      ? "The number is negative"
      : "The number is zero";
document.getElementById("output-display").innerText += "\n" + numberResult;
*/

/*

//Switch statement

let digit = parseInt(prompt("Enter a digit (0-9): "));
switch (digit) {
  case 0:
    document.getElementById("output-display").innerText +=
      "\n" + "You entered zero";
    break;
  case 1:
    document.getElementById("output-display").innerText +=
      "\n" + "You entered one";
    break;
  case 2:
    document.getElementById("output-display").innerText +=
      "\n" + "You entered two";
    break;
  case 3:
    document.getElementById("output-display").innerText +=
      "\n" + "You entered three";
    break;
  case 4:
    document.getElementById("output-display").innerText +=
      "\n" + "You entered four";
    break;
  case 5:
    document.getElementById("output-display").innerText +=
      "\n" + "You entered five";
    break;
  case 6:
    document.getElementById("output-display").innerText +=
      "\n" + "You entered six";
    break;
  case 7:
    document.getElementById("output-display").innerText +=
      "\n" + "You entered seven";
    break;
  case 8:
    document.getElementById("output-display").innerText +=
      "\n" + "You entered eight";
    break;
  case 9:
    document.getElementById("output-display").innerText +=
      "\n" + "You entered nine";
    break;
  default:
    document.getElementById("output-display").innerText +=
      "\n" + "Invalid digit entered";
}
*/

/*

// Task : For loop to print numbers from 1 to 10
for (let i = 1; i <= 10; i++) {
  document.getElementById("output-display").innerText += "\n" + i;
}
document.getElementById("output-display").innerText +=
  "\n" + "-------------------------" + "\n" + "For loop completed";

//Task: display odd numbers from 1 to 20 using for loop
for (let i = 1; i <= 20; i += 2) {
  document.getElementById("output-display").innerText += "\n" + i;
}

document.getElementById("output-display").innerText +=
  "\n" + "-------------------------" + "\n" + "For loop completed";

//Task: display even numbers from 1 to 20 using for loop
for (let i = 2; i <= 20; i += 2) {
  document.getElementById("output-display").innerText += "\n" + i;
}
document.getElementById("output-display").innerText +=
  "\n" + "-------------------------" + "\n" + "For loop completed";
*/

/*
// Task: Summation of numbers from 1 to n using for loop
let n = parseInt(prompt("Enter a number: "));
let sum = 0;

for (let i = 1; i <= n; i++) {
  sum += i; // Add the current number to the sum
  document.getElementById("output-display").innerText +=
    "\n" + "Current number: " + i + ", Current sum: " + sum;
}
document.getElementById("output-display").innerText +=
  "\n" + "The sum of numbers from 1 to " + n + " is: " + sum;
*/

/*

let m = parseInt(prompt("Enter a number: "));
let n = parseInt(prompt("Enter another number: "));
let sum = 0;
for (let i = m; i <= n; i++) {
  sum += i;
  document.getElementById("output-display").innerText +=
    "\n" + "Current number: " + i + ", Current sum: " + sum;
}
document.getElementById("output-display").innerText +=
  "\n" + "The sum of numbers from " + m + " to " + n + " is: " + sum;


*/

//Task: While Loop
/*
let i = 1;
while (i <= 10) {
  document.getElementById("output-display").innerText += "\n" + i;
  i++;
}

//For loop to print numbers from 1 to 10
for (let i = 1; i <= 10; i++) {
  document.getElementById("output-display").innerText += "\n" + i;
}
*/
/*
let i = 1;
let sum = 0;
while (i <= 10) {
  sum += i;
  document.getElementById("output-display").innerText +=
    "\n" + "Current number: " + i + ", Current sum: " + sum;
  i++;
}
document.getElementById("output-display").innerText +=
  "\n" + "The sum of numbers from 1 to 10 is: " + sum;

//Write a program sum of all the numbers  that are divisible by 3 and 5 between 1 to 100
let totalSum = 0;
for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    totalSum += i;
    document.getElementById("output-display").innerText +=
      "\n" + "Current number: " + i + ", Current total sum: " + totalSum;
  }
}
document.getElementById("output-display").innerText +=
  "\n" +
  "The sum of numbers divisible by 3 and 5 from 1 to 100 is: " +
  totalSum;
  */

/*
// Task: Do while Loop

let i = 1;
do {
  document.getElementById("output-display").innerText += "\n" + i;
  document.getElementById("output-display").innerText +=
    "\n" + "Current number: " + i + ", Current sum: " + (i * (i + 1)) / 2;
  i++;
} while (i <= 10);
document.getElementById("output-display").innerText +=
  "\n" + "-------------------------" + "\n" + "Do while loop completed";
*/

//Task Break and Continue
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    document.getElementById("output-display").innerText +=
      "\n" + "Breaking the loop at i = " + i;
    break; // Exit the loop when i is 5
  }
  document.getElementById("output-display").innerText += "\n" + i;
}
document.getElementById("output-display").innerText +=
  "\n" + "-------------------------" + "\n" + "For loop completed";

for (let j = 1; j <= 10; j++) {
  if (j === 5) {
    document.getElementById("output-display").innerText +=
      "\n" + "Skipping the iteration at j = " + j;
    continue; // Skip the current iteration when j is 5
  }
  document.getElementById("output-display").innerText += "\n" + j;
}
document.getElementById("output-display").innerText +=
  "\n" + "-------------------------" + "\n" + "For loop completed";
