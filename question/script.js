// let age = prompt("Enter your age: ");
// age = parseInt(age);
// if (age > 10 && age < 20) {
//   alert("your age is correct");
// } else {
//   alert("age is not correct");
// }

/*
document.getElementById("goole").addEventListener("click", function () {
  let url = "http://google.com";
  window.location = url;
});

setInterval(async function () {
  let url = "https://jsonplaceholder.typicode.com/todos/1";
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
}, 3000);
*/

setInterval(async function () {
  document.querySelector("#hello").classList.toggle("hello");
}, 300);
