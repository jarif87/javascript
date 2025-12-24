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
