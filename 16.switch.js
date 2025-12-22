const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What is your age: ", function (input) {
  let age = parseInt(input);
  switch (age) {
    case 12:
      console.log("you are a kid");
      break;
    case 15:
      console.log("you are still kid");
      break;
    case 18:
      console.log("you are an adult");
      break;
    default:
      console.log("your age is not acceptable");
  }
  rl.close();
});
