// Dom Events
//1. Event Objects
//Event types: click, mouseover, mouseout, mousedown, mouseup, keydown, keyup, keypress, focus, blur, change, submit, load, unload

// let inputVar = document.querySelector("input");
// inputVar.addEventListener("change", changeHandler);

// function changeHandler(event) {
//   console.log(event);
//   console.log(event.type);
//   console.log(event.target);
//   console.log(event.target.value);
//   console.log(event.target.id);
//   console.log(event.target.className);
// }

// let inputVar = document.querySelectorAll("input[type=checkbox]");
// console.log(inputVar);
// Array.from(inputVar).map((inputVar) => {
//   inputVar.addEventListener("change", changeHandler);
// });

// function changeHandler(event) {
//   if (event.target.type === "checkbox") {
//     if (event.target.checked) {
//       console.log(event.target.value + " is checked");
//       console.log(event.target.checked);
//     } else {
//       console.log(event.target.value + " is unchecked");
//       console.log(event.target.checked);
//     }
//   } else {
//     console.log(event);
//     console.log(event.type);
//     console.log(event.target);
//     console.log(event.target.value);
//     console.log(event.target.id);
//     console.log(event.target.className);
//   }
// }

let inputVar = document.querySelector("#department");
console.log(inputVar);

inputVar.addEventListener("change", changeHandler);

function changeHandler(event) {
  console.log(event);
  console.log(event.type);
  console.log(event.target);
  console.log(event.target.value);
  console.log(event.target.id);
  console.log(event.target.className);
}
