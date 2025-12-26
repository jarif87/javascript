let arr = [1, 2, 3, 4, 5, 6, 7, 8, 19, 11, 122, 344];

let a = arr.map(function (value, index, array) {
  console.log(value, index, array);
  return value + 1;
});

console.log(a);

//filter method

let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 19, 11, 122, 344];
let b = arr2.filter(function (a) {
  return a > 10;
});
console.log(b);

//reduce method

let c = [1, 2, 3, 4, 5];
let d = c.reduce(function (h1, h2) {
  return h1 + h2;
});
console.log(d);
