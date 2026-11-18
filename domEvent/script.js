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

// let inputVar = document.querySelector("#department");
// console.log(inputVar);

// inputVar.addEventListener("change", changeHandler);

// function changeHandler(event) {
//   console.log(event);
//   console.log(event.type);
//   console.log(event.target);
//   console.log(event.target.value);
//   console.log(event.target.id);
//   console.log(event.target.className);
// }

//Submit event
// let myForm = document.querySelector("form");
// let myName = myForm.querySelector("div #name");
// console.log(myName);

// let myEmail = myForm.querySelector("div #email");
// console.log(myEmail);
// let myPassword = myForm.querySelector("div #password");
// console.log(myPassword);
// console.log("#".repeat(100));

// myForm.addEventListener("submit", submitHandler);

// function submitHandler(event) {
//   event.preventDefault();
//   console.log("Form Submitted");
//   console.log(myName.value);
//   console.log(myEmail.value);
//   console.log(myPassword.value);

//   const userInfo = {
//     name: myName.value,
//     email: myEmail.value,
//     password: myPassword.value,
//   };
//   console.log(userInfo);
//   myForm.reset();
// }

document.querySelector("#video").addEventListener("play", function () {
  console.log("Video is playing");
});

document.querySelector("#video").addEventListener("canplay", function () {
  console.log("Video can play");
});

document.querySelector("#video").addEventListener("pause", function () {
  console.log("Video is paused");
});

document.querySelector("#video").addEventListener("timeupdate", function () {
  console.log("Video time updated");
});

document.querySelector("#video").addEventListener("playing", function () {
  console.log("Video is playing");
});

document.querySelector("#video").addEventListener("ended", function () {
  console.log("Video has ended Thanks for watching");
});

document.querySelector("#video").addEventListener("volumechange", function () {
  console.log("Video volume changed");
});
