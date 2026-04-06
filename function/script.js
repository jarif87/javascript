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

/*
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

*/

//auto-boxing

console.log("Hello World".length);
console.log("Hello World".toUpperCase());
console.log("Hello World".toLowerCase());
console.log("Hello World".indexOf("o"));
console.log("Hello World".lastIndexOf("o"));
console.log("Hello World".slice(0, 5));
console.log("Hello World".substring(0, 5));
console.log("Hello World".substr(0, 5));

const object1 = { message: "Hello World" };
console.log(object1.message.length);
console.log(object1.message.toUpperCase());
console.log(object1.message.toLowerCase());
console.log(object1.message.indexOf("o"));
console.log(object1.message.lastIndexOf("o"));
console.log(object1.message.slice(0, 5));
console.log(object1.message.substring(0, 5));
console.log(object1.message.substr(0, 5));

const object2 = object1;
console.log(object2.message.length);

object2.message = "Hello JavaScript";
console.log(object1.message);

const object3 = { message: "Hello World", price: 1000 };
console.log(object3.message);

const object4 = { message: "Hello World" };

console.log(object3 === object4); //==>false

const object5 = { message: "Hello World" };
const object6 = object3;

console.log(object5 === object6); // ✅ true

//destructureing assignment
const { message } = object3;
console.log(message);

const { price } = object3;
console.log(price);

//short hand property
const name = "John";
const age = 30;
const city = "New York";
const person = { name, age, city };
console.log(person);
