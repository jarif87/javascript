var array_name = ["bangla", "english", "Math", "physics", "chemistry"];
console.log(array_name[2]);

array_name[2] = "bangladesh";
console.log(array_name);

var array_name = ["bangla", "english", "Math", "physics", "chemistry"];
array_name.push("hello_world");
console.log(array_name);

array_name.pop();
console.log(array_name);

var array_name = ["bangla", "english", "Math", "physics", "chemistry"];
array_name.shift();
console.log(array_name);

var array_name = ["bangla", "english", "Math", "physics", "chemistry"];
array_name.unshift("hello_coxsBazar");
console.log(array_name);

var array_name = ["bangla", "english", "Math", "physics", "chemistry"];
var total = array_name.slice(0, 2);
console.log(total);

var friend_name = ["shakib", "tamim", "musfiq", "riyad", "masrafi"];
friend_name.splice(0, 2, "shanto");
console.log(friend_name);

/*
let marks = { shakib: 20, rakib: 30, tamim: 40, riyad: 50 };
for (let i = 0; i < Object.keys(marks).length; i++) {
  console.log(
    "Result : " +
      Object.keys(marks)[i] +
      " Mark is  " +
      marks[Object.keys(marks)[i]]
  );
}
*/

let marks = { shakib: 20, rakib: 30, tamim: 40, riyad: 50 };
for (let i in marks) {
  console.log("Result of :" + i + " is " + marks[i]);
}

let marks_11th = [1, 2, 3, 4, 5, 6, 7, false, true, "hello_world", null];
marks_11th[10] = "bangladesh";
console.log("Length :", marks_11th.length);
console.log(marks_11th);

let marks_12th = [1, 2, 3, 4, 5, 6, 7, false, true, "hello_world", null];
for (x in marks_12th) {
  console.log(marks_12th[x]);
}

let num = [1, 2, 3, 4, 5, 6];
let a = num.toString();
// console.log(a);
let b = num.join("/");
console.log(b);
let c = num.pop();
console.log("#".repeat(50));
console.log(num, c);

//delete
let d = [1, 2, 3, 4, 5, 6];
delete d[0];
console.log(d);
console.log(d.length);

//concat

let d1 = [1, 2, 3, 4, 5, 6, 11, 22, 33, 444, 55, 56, 78, 80];
let d2 = [1, 2, 3, 4, 5, 6, "hello", "bangla", "english", "math"];

let new_array = d1.concat(d2);
console.log(new_array);

//short
let e = [
  1,
  2,
  3,
  4,
  5,
  6,
  9,
  11,
  10,
  7,
  8,
  13,
  12,
  16,
  "hello",
  "bangla",
  "english",
  "math",
];
e.sort();
console.log(e);

function compare(a, b) {
  return a - b;
}

let f = [
  1,
  2,
  3,
  4,
  5,
  6,
  9,
  11,
  10,
  7,
  8,
  13,
  12,
  16,
  "hello",
  "bangla",
  "english",
  "math",
];
f.sort(compare);
console.log(f);

let g = [1, 2, 3, 4, 5, 6, 11, 22, 33, 444, 55, 56, 78, 80];
let i = g.reverse();
console.log(i);
