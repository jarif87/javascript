// const loadScript = (src) => {
//   return new Promise((resolve, reject) => {
//     const script = document.createElement("script");
//     script.type = "text/javascript";
//     script.src = src;

//     script.onload = () => {
//       resolve(1);
//     };

//     script.onerror = () => {
//       reject(new Error(`Failed to load script: ${src}`));
//     };

//     document.body.appendChild(script);
//   });
// };

// // Usage
// loadScript("http://localhost:3000/20.promise_chain.js")
//   .then((value) => console.log("Script Loaded Successfully", value))
//   .catch((err) => console.error("Script Loading Failed", err));

// script.js  ← this is the correct version
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;

    script.onload = () => {
      resolve("Script loaded successfully!");
    };

    script.onerror = () => {
      reject(new Error(`Failed to load script: ${src}`));
    };

    document.body.appendChild(script);
  });
};

// Test it (you can change the URL)
loadScript("https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js")
  .then((message) => {
    console.log(message);
    // If successful, you can now use lodash for example:
    console.log(_.VERSION); // should print "4.17.21"
    console.log("hello this script works fine.Thank you!");
  })
  .catch((err) => {
    console.error("Error:", err);
  });
