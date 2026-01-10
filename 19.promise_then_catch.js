// let p = new Promise((resolve, reject) => {
//   console.log("Promise is pending...");
//   setTimeout(() => {
//     console.log("This will not run because the promise is already settled.");
//     // resolve("Promise is resolved!");
//     reject("Promise is rejected!");
//   }, 1000);
// });

// p.then((res) => console.log(res)).catch((err) => console.log(err));
// console.log("End of script.");

//a promise can be settled only once, either resolved or rejected. Any subsequent calls to resolve or reject are ignored.

let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise is resolved!");
  }, 2000); // 2 seconds later
});

p.then((res) => console.log(res));
console.log("#".repeat(50));
console.log(p);
console.log("End of script.");
// After 2 seconds, the promise will be resolved and "Promise is resolved!" will be logged to the console.
