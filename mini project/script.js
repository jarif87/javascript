/*

let userinput_1 = prompt("User Input 1:");
let userinput_2 = prompt("user Input 2:");
userinput_1 = parseInt(userinput_1);
userinput_2 = parseInt(userinput_2);

const result = userinput_1 + userinput_2;

document.write(userinput_1 + "<br>");
document.write(userinput_2 + "<br>");
document.write("Result: " + result);
*/

/*
let correct_number = 10;
let i;
while (i != correct_number) {
  console.log("Try Again");
  i = prompt("Enter a Number: ");
}
console.log("you have entered correct number");
*/
/*
const mean = (a, b, c) => {
  return (a + b + c) / 3;
};
console.log(mean(1, 2, 3));
*/

/*
function average_abc() {
  let a = Number(prompt("ENter first Number: "));
  let b = Number(prompt("Enter second Number: "));
  let c = Number(prompt("Enter third Number: "));
  let total = (a + b + c) / 3;

  return total;
}

console.log(average_abc());
*/

/*
let a = [1, 2, 3, 4, 5, 6, 66];
let b = prompt("Enter Your Number: ");
b = Number.parseInt(b);
a.push(b);
console.log(b);
*/

/*
let arr = [1, 2, 3, 4, 5, 6, 7, 83];
let a;

do {
  a = Number.parseInt(prompt("Enter a number"));
  arr.push(a);
} while (a !== 0);

arr.pop(); // remove 0
console.log(arr);
*/

/*
let arr = [1, 2, 3, 4, 5, 6, 7, 83, 10, 20, 30, 40];

function hello_world(x) {
  return x % 2 === 0;
}

console.log(arr.map(hello_world));
*/

/*

let arr = [1, 2, 3, 4, 5, 6, 7, 83, 10, 20, 30, 40];
function square(a) {
  return a * a;
}
console.log(arr.map(square));
*/

/*

let my_array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function hello_reduce(x1, x2) {
  return x1 * x2;
}
console.log(my_array.reduce(hello_reduce));
*/
