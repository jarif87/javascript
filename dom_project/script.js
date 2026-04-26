const subscriberCount = document.getElementById("id1");
subscriberCount.style.fontSize = "24px";
subscriberCount.style.fontWeight = "bold";
subscriberCount.style.color = "red";
subscriberCount.style.marginBottom = "20px";
const button = document.createElement("button");
let isSubscribed = false;

button.style.padding = "10px 20px";
button.style.fontSize = "16px";
button.style.cursor = "pointer";
button.style.borderRadius = "20px";

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

const input = document.getElementById("input1");
const darazOrderCost = document.getElementById("id2");
const br = document.createElement("br");
document.body.appendChild(br);

darazOrderCost.style.display = "inline-block";
darazOrderCost.style.fontSize = "20px";
darazOrderCost.style.fontWeight = "bold";
darazOrderCost.style.color = "blue";
darazOrderCost.style.marginTop = "20px";
darazOrderCost.style.marginRight = "20px";

input.placeholder = "Cost of Order";
input.style.display = "inline-block";
input.style.marginTop = "20px";
input.style.padding = "10px";
input.style.fontSize = "16px";
input.style.borderRadius = "19px";
input.style.textAlign = "center";
document.body.appendChild(input);

document.body.appendChild(darazOrderCost);
document.body.appendChild(input);
