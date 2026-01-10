let promise = new Promise(function (resolve, reject) {
  let a = 10;
  let b = 20;
  if (a == b) {
    resolve("promise resolved");
  } else {
    reject("promise rejected");
  }
});

setTimeout(function () {
  console.log("this is setTimeout function");
}, 20000);

console.log("end of script file");
console.log("#".repeat(20));
console.log(promise);
