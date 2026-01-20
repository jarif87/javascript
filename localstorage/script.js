let key = prompt("Enter your key: ");
let value = prompt("Enter your value: ");
localStorage.setItem(key, value);

console.log(localStorage.getItem(key));

if (key == "green" || key == "blue") {
  localStorage.removeItem(key);
}
