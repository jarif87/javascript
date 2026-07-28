// function greet(name) {
//   console.log("Hello, " + name + "!");
// }

// greet("Alice");

// const number = 10;
// const function_1 = function greet() {
//   console.log("Hello, World!");
// };

// console.log(function_1);
// console.log(typeof function_1);

// const function_2 = function (name) {
//   console.log("Hello, " + name + "!");
// };

// function_2("Bob");

// const object1 = {
//   Number: 2,
//   fun: function greet() {
//     console.log("Hello, World!");
//   },
// };

// object1.fun();

// function display(parameter) {
//   console.log("This would log:", parameter);
// }
// display(100);

// function returnValue(parameter) {
//   parameter();
// }

// returnValue(function () {
//   console.log("This would log:", "Hello, World!");
// });

// setTimeout(function () {
//   console.log("This would log:", "Hello, World!");
//   console.log("This would log:", "Hello, World2!");
// }, 5000); //5000 mili seconds = 5 second

// console.log("This would log:", "Hello, World3!");

// setInterval(function () {
//   console.log("This would log:", "Hello, World!");
// }, 1000); //1000 mili seconds = 1 second

// console.log("This would log:", "Hello, World4!");

// [
//   "make",
//   "a",
//   "function",
//   "that",
//   "takes",
//   "an",
//   "array",
//   "of",
//   "numbers",
//   "as",
//   "input",
//   "and",
//   "returns",
//   "the",
//   "sum",
//   "of",
//   "all",
//   "the",
//   "numbers",
// ].forEach(function (word, index) {
//   if (word === "array") {
//     console.log("This would log:", "Found the word 'array' at index:", index);
//     return;
//   }
//   //   console.log("This would log:", word);
//   //   console.log("This would log:", index);
// });

/*
const arrowFunctions = () => {
  console.log("This would log:", "Hello, World!");
  console.log("This would log:", "Hello, World2!");
  console.log("This would log:", "Hello, World3!");
};

arrowFunctions();

const arrowFunctions2 = (name, age) => {
  console.log(
    "This would log:",
    "Hello, " + name + "! You are " + age + " years old.",
  );
};

arrowFunctions2("Alice", 30);

const oneParameter = (param1) => {
  console.log("This would log:", "The parameter is:", param1);
};

oneParameter("Hello, World!");

const oneLine = () => {
  return 4 + 9;
};

console.log(oneLine());

*/

/*

const buttonElement = document.querySelector(".btn");

const eventListener = () => {
  console.log("This would log:", "Button clicked!");
};

buttonElement.addEventListener("click", eventListener);

buttonElement.removeEventListener("click", eventListener);

buttonElement.addEventListener("click", () => {
  console.log("This would log:", "hello world!");
});

*/

// [1, -3, 5, 6, -2, 0]
//   .filter((value, index) => {
//     return value > 0;
//   })
//   .forEach((num) => console.log(num));

// [1, -3, 5, 6, -2, 0].filter((value, index) => {
//   console.log(value);
//   console.log(index);
//   return value > 0;
// });

// const newArray = [1, 2, -3, 4, 5].map((value, index) => {
//   console.log("the value is:", value);
//   console.log("the index is:", index);
//   return value * 2;
// });

// console.log("the new array is:", newArray);

//Closure Example

function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log("the outer variable is:", outerVariable);
    console.log("the inner variable is:", innerVariable);
  };
}

const newFunction = outerFunction("outside");
newFunction("inside");
