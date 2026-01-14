// try {
//   hello;
// } catch (error) {
//   console.log(error.name);
//   console.log(error.message);
// }

try {
  let age = prompt("Enter Your Age: ");
  age = Number.parseInt(age);
  if (age > 70) {
    throw new ReferenceError("this is Not True");
  }
} catch (error) {
  console.log(error.name);
  console.log(error.message);
  console.log(error.stack);
}
console.log("Program is still running");
