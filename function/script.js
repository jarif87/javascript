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

// function map(a, b) {
//   const result = new Array(b.length);
//   for (let i = 0; i < b.length; i++) {
//     result[i] = a(b[i]);
//   }
//   return result;
// }

// const num = [0, 1, 2, 3, 4, 5, 20];
// const cubeNumbers = map(function (x) {
//   return x * x * x;
// }, num);

// console.log(cubeNumbers);

// const product = {
//   name: "pen",
//   price: 100,
//   address: "Mirpur-1,Dhaka,Bangladesh",
//   price: 120,
//   delivery: "2 days",
//   preview: function () {
//     console.log("function is previewing");
//     console.log(typeof console.log);
//   },
// };
// console.log(product);
// console.log(product.name);

// product.name = "hello world";
// console.log(product.preview());
// console.log(typeof console.log);

const person = {
  name: "John",
  age: 30,
  city: "New York",
  greet: function () {
    console.log("Hello, my name is " + this.name);
  },
  address: "123 Main St, New York, NY",
  mobile: "123-456-7890",
  email: "xyz@gmail.com",
};

console.log(person);
console.log(JSON.stringify(person));
const personCopy = JSON.parse(JSON.stringify(person));
console.log("#".repeat(100));
console.log("Json Parse: ", personCopy);

console.log("#".repeat(100));
localStorage.setItem("person", JSON.stringify(person));
const storedPerson = JSON.parse(localStorage.getItem("person"));
console.log(storedPerson);

console.log("#".repeat(100));
console.log("Local Storage: ", localStorage);
const retriveLocal = JSON.parse(localStorage.getItem("person"));
console.log(retriveLocal);
