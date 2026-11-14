// Dom Events
//1. Event Objects
//Event types: click, mouseover, mouseout, mousedown, mouseup, keydown, keyup, keypress, focus, blur, change, submit, load, unload

let inputVar = document.querySelector("input");
inputVar.addEventListener("change", function (event) {
  console.log("Input field value has changed.");
  console.log("Event type: " + event.type);
  console.log("Event target: " + event.target);
});
