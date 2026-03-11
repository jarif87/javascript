/*

document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("cardContainer");
  const numberToCheck = 42;
  const url = `https://api.isevenapi.xyz/api/iseven/${numberToCheck}/`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      cardContainer.innerHTML = "";

      const col = document.createElement("div");
      col.className = "col-md-6 mx-auto";

      const isEven = data.iseven;
      const themeColor = isEven ? "success" : "danger";

      col.innerHTML = `
        <div class="card h-100 shadow-sm border-0">
          <div class="bg-${themeColor} py-4 text-white text-center rounded-top">
            <h1 class="mb-0"># ${numberToCheck}</h1>
          </div>
          <div class="card-body text-center">
            <h5 class="card-title text-muted">Analysis Result</h5>
            <h2 class="display-5 fw-bold text-${themeColor}">
              ${isEven ? "EVEN" : "ODD"}
            </h2>
            <p class="card-text small mt-3 p-2 bg-light rounded">
              ${data.ad}
            </p>
          </div>
          <div class="card-footer bg-white border-0 pb-3">
            <a href="https://isevenapi.xyz/" class="btn btn-outline-${themeColor} w-100" target="_blank">
              View API Docs
            </a>
          </div>
        </div>`;

      cardContainer.appendChild(col);
    })
    .catch((error) => {
      cardContainer.innerHTML = `
        <div class="col-12 text-center">
          <div class="alert alert-danger">
            <strong>API Connection Error:</strong><br>
            ${error.message}
          </div>
        </div>`;
    });
});
*/

/*

class Complex {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  add(num) {
    let r = this.real + num.real;
    let i = this.imaginary + num.imaginary;
    return new Complex(r, i);
  }
}

let a = new Complex(5, 6);
let b = new Complex(10, 11);

console.log(a.add(b)); // Complex { real: 15, imaginary: 17 }
console.log(a.real, b.imaginary); // 5 11 (original values unchanged)
*/

// class Human {
//   constructor(name, food) {
//     this.name = name;
//     this.food = food;
//   }
//   walk() {
//     console.log(this.name + " Human Is Walking");
//   }
// }

// class student extends Human {
//   walk() {
//     console.log(this.name + " student is walking");
//   }
// }

// let a = new student("Shakib", "PiZZA");
// a.walk();

// let b = new Human("Rakib", "burger");
// b.walk();

/*
class Complex {
  constructor(real, imaginary) {
    this._real = real;
    this._imaginary = imaginary;
  }

  add(num) {
    let r = this._real + num._real;
    let i = this._imaginary + num._imaginary;
    return new Complex(r, i);
  }

  get real() {
    return this._real;
  }

  get imaginary() {
    return this._imaginary;
  }

  set real(newReal) {
    this._real = newReal;
  }

  set imaginary(newImaginary) {
    this._imaginary = newImaginary;
  }

  toString() {
    return `${this._real} + ${this._imaginary}i`;
  }
}

let a = new Complex(5, 6);
a.real = 19;
a.imaginary = 21;
let b = new Complex(10, 11);

console.log(a.add(b).toString()); // 29 + 32i
console.log(`${a.real} + ${b.imaginary}i`); // 19 + 11i
*/

/*
const a = (text) =>
  new Promise((resolve) => setTimeout(() => resolve(text), 2000));

const run = async () => {
  const res1 = await a("hello");
  console.log(res1);

  const res2 = await a("hello world");
  console.log(res2);
};

run();
*/

/*
function sum(a, b, c) {
  return a + b + c;
}
let x = [1, 2, 3];
console.log(sum(...x));
*/

/*
const a = (text, n = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(text);
    }, n);
  });
};

async function main() {
  let text = await a("hello");
  console.log(text);

  text = await a("hello world");
  console.log(text);
}

main();

*/

// document.body.innerHTML = "hello world";
