/*

const loadscript = async (src) => {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(src + "   script Loaded Successfully");
    };
    document.head.append(script);
  });
};

const main = async () => {
  console.log(new Date());
  let a = await loadscript(
    "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
  );
  console.log(new Date());
  console.log(a);
};

main();
*/

/*
const loadscript = async (src) => {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(src + "   script Loaded Successfully");
    };
    document.head.append(script);
  });
};


let a = loadscript(
  "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
);
a.then((value) => {
  console.log(value);
});
*/

/*
let p = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("this is wrong"));
    }, 5000);
  });
};

let a = async () => {
  try {
    let c = await p();
    console.log(c);
  } catch (error) {
    console.log("Error Won't Show");
  }
};

a();
*/

let p1 = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hello this is Promise 1");
    }, 2000);
  });
};

let p2 = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hello this is Promise 2");
    }, 3000);
  });
};

let p3 = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hello this is Promise 3");
    }, 4000);
  });
};

const run = async () => {
  console.time("run");
  //   let a = await p1();
  //   let b = await p2();
  //   let c = await p3();
  //   console.log(a, b, c);

  let d = p1();
  let e = p2();
  let f = p3();
  let def = await Promise.all([d, e, f]);
  console.log(def);

  console.timeEnd("run");
};

run();
