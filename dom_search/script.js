// const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
// const appendAlert = (message, type) => {
//   const wrapper = document.createElement("div");
//   wrapper.innerHTML = [
//     `<div class="alert alert-${type} alert-dismissible" role="alert">`,
//     `   <div>${message}</div>`,
//     '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
//     "</div>",
//   ].join("");

//   alertPlaceholder.append(wrapper);
// };

// const alertTrigger = document.getElementById("liveAlertBtn");
// if (alertTrigger) {
//   alertTrigger.addEventListener("click", () => {
//     appendAlert("Nice, you triggered this alert message!", "success");
//   });
// }

/*
let title = document.getElementsByClassName("card-title")[0];
let new_title = document.getElementById("hello_card");
new_title.style.color = "green";

let first_title = document.querySelectorAll(".card-title");
console.log(first_title);
console.log(document.getElementsByTagName("a"));
*/

document.body.innerHTML += "<h1> Hello World </h1>";
document.title = "DOM Search";
