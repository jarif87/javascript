async function hello() {
  const p1 = new Promise((resolve) => {
    setTimeout(() => {
      resolve("this is me from Bangladesh");
    }, 3000);
  });

  const p2 = new Promise((resolve) => {
    setTimeout(() => {
      resolve("this is me from Japan");
    }, 5000);
  });

  console.log("#".repeat(50));
  console.log("Waiting for first value...");
  const hello_p1 = await p1;

  console.log("#".repeat(50));
  console.log("Waiting for second value...");
  const hello_p2 = await p2;

  return [hello_p1, hello_p2];
}

hello()
  .then((values) => {
    console.log("Results:", values);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

console.log("Program is done");

// async function hello() {
//   return 10;
// }

// hello().then((y) => {
//   console.log(y);
// });
