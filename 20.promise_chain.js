// let p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("Resolving first promise...");
//     resolve(105975);
//   }, 1000);
// });
// p1.then((value) => {
//   console.log("First promise resolved with value:", value);
//   let p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("Second Promise");
//     }, 2000);
//   });
//   return p2;
// })
//   .then((value) => {
//     console.log("Done");
//     return 9;
//   })
//   .then((value) => {
//     console.log("Finally We are Done.");
//   });

/*
const load_script = () => {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;

    script.onload = () => {
      resolve(1);
    };

    script.onerror = () => {
      reject(new Error("Failed to Load Script: ${src}"));
    };
    document.body.appendChild(script);
  });
};

load_script("http://localhost:3000/20.promise_chain.js")
  .then((value) => {
    console.log("Script Loaded Successfully", value);
  })
  .catch((err) => {
    console.error("Script Loading Failed", err);
  });
*/

let p1 = new Promise((resolve, reject) => {
  console.log("Hey there..................");
  setTimeout(() => {
    resolve("hello world");
  }, 2000);
});
p1.then(() => {
  console.log("Congratulations this Promise is now Resolved");
});

p1.then(() => {
  console.log("hello this result is from p2");
});

p1.then(() => {
  console.log("i am learning javascript from youtube");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hello_bangladesh");
    }, 5000);
  }).then((value) => {
    console.log(value);
  });
});
