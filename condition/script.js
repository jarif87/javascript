/*

let age = prompt("whats your age?");
age = Number.parseInt(age);

if (isNaN(age)) {
  alert("Invalid Input! Please Enter Number.");
} else if (age < 0) {
  alert("this is an invalid age");
} else if (age < 18) {
  alert("You are not an adult");
} else {
  alert("you are an adult");
}
*/

/*

let num = prompt("Enter your Number: ");
num = parseInt(num);
if (isNaN(num)) {
  alert("Enter valid Number");
}
if (num % 2 == 0 && num % 3 == 0) {
  alert("your number is divisible by 2 and 3");
} else {
  alert("your number is not divisible by 2 and 3");
}
*/

sum = 0;
let n = prompt("Enter Your Number: ");
n = parseInt(n);
for (let i = 0; i < n; i++) {
  sum += i + 1;
}
alert("sum of first :" + n + "natural number is :" + sum);
