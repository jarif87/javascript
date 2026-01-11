let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("hello_world");
  }, 2000);
});

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("hello_bangladesh");
    reject(new Error("Error"));
  }, 3000);
});

let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("hi i am ML engineer");
  }, 4000);
});

// p1.then((value) => {
//   console.log(value);
// });

// p2.then((value) => {
//   console.log(value);
// });

// p3.then((value) => {
//   console.log(value);
// });

// let promise_all = Promise.all([p1, p2, p3]);
// promise_all.then((value) => {
//   console.log(value);
// });

/*
let promise_all = Promise.allSettled([p1, p2, p3]);
promise_all.then((value) => {
  console.log(value);
});
*/

// let promise_all = Promise.race([p1, p2, p3]);
// promise_all.then((value) => {
//   console.log(value);
// });

let promise_all = Promise.any([p1, p2, p3]);
promise_all.then((value) => {
  console.log(value);
});
