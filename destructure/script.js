let arr = [3, 5, 1, 2, 3, 4, 5, 6, 7, 8, 10];
// let [a, b, c, d, g, h, j, k, i] = arr;
// console.log(a, b, c, d, g, h, j, k, i);

// let [a, , , ...rest] = arr;
// console.log(a, rest);

let { a, b } = { a: 3, b: 7 };
console.log(a, b);
//spread operator
let array = [3, 5, 7];
let obj = { ...array };
console.log(obj);

function sum(q, w, e) {
  return q + w + e;
}
// sum(1, 2, 3);
console.log(sum(...array));
