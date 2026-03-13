// function my_func(theObject) {
//   theObject.make = "Tornedo";
// }

// const myCar = { make: "Honda", model: "Accord", year: 1990 };
// my_func(myCar);
// console.log(myCar);
// console.log(myCar.model);

// function myFunc(theArr) {
//   theArr[0] = 99;
// }

// const arr = [77];
// myFunc(arr);
// console.log(arr);

// let a = myFunc(arr);
// console.log("Result: ", a);

// let square = function (x) {
//   return x * x;
// };
// console.log(square(9));

function map(a, b) {
  const result = new Array(b.length);
  for (let i = 0; i < b.length; i++) {
    result[i] = a(b[i]);
  }
  return result;
}

const num = [0, 1, 2, 3, 4, 5, 20];
const cubeNumbers = map(function (x) {
  return x * x * x;
}, num);

console.log(cubeNumbers);
