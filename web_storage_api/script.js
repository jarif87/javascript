// localStorage.setItem("username", "JohnDoe");
// console.log(localStorage.getItem("username"));

// let username = localStorage.getItem("username");
// let password = localStorage.getItem("password");
// console.log("Username:", username);
// console.log("Password:", password);

// localStorage.setItem("username", "Anisul Islam");
// localStorage.setItem("password", "123456");

// localStorage.removeItem("username");
// localStorage.removeItem("password");

// const countries = ["Bangladesh", "India", "Pakistan", "Nepal", "Bhutan"];
// localStorage.setItem("countries", JSON.stringify(countries));
// let retrievedCountries = localStorage.getItem("countries");
// console.log("Retrieved Countries:", JSON.parse(retrievedCountries));
// localStorage.clear();

//Session Storage
// sessionStorage.setItem("sessionUsername", "JaneDoe");
// console.log(sessionStorage.getItem("sessionUsername"));
// sessionStorage.setItem("sessionUsername", "Anisul Islam");
// sessionStorage.setItem("sessionPassword", "123456");

// let sessionUsername = sessionStorage.getItem("sessionUsername");
// let sessionPassword = sessionStorage.getItem("sessionPassword");
// console.log("Session Username:", sessionUsername);
// console.log("Session Password:", sessionPassword);

// sessionStorage.removeItem("sessionUsername");
// sessionStorage.removeItem("sessionPassword");
// sessionStorage.clear();

let user = {
  name: "Anisul Islam",
  email: "x@example.com",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Dhaka",
    country: "Bangladesh",
  },
};
sessionStorage.setItem("user", JSON.stringify(user));
let retrievedUser = sessionStorage.getItem("user");
console.log("Retrieved User:", JSON.parse(retrievedUser));
