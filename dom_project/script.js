const button = document.createElement("button");
let isSubscribed = false;
button.style.padding = "10px 20px";
button.style.fontSize = "16px";
button.style.cursor = "pointer";

button.textContent = "Subscribe";
button.addEventListener("click", function () {
  isSubscribed = !isSubscribed;
  if (isSubscribed) {
    button.textContent = "Subscribed";
    button.style.backgroundColor = "green";
  } else {
    button.textContent = "Subscribe";
    button.style.backgroundColor = "red";
  }
});

document.body.appendChild(button);
