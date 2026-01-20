console.log("Cookies before:", document.cookie);

document.cookie = "test=hello";

let key = prompt("Enter your key:");
let value = prompt("Enter your value:");

if (key && value) {
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
}

console.log("Cookies after:", document.cookie);
