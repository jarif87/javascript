let age = prompt("whats your age?");
age = Number.parseInt(age);

if (isNaN(age)) {
  alert("Invalid Input! Please Enter Number.");
} else if (age < 0) {
  alert("this is an invalid age");
} else if (age < 18) {
  alert("You are not an adult");
} else {
  alert("you are an adult");
}
