console.log("hello_world");

let a = "apple";
let b = "ball";
console.log(a.concat(" hello_world ", b));

f = "      friend     ";
console.log(f.trim());

let x = "hello world";
for (let i = 0; i < x.length; i++) {
  console.log(x[i]);
}

let y = "hello world";
for (let m in y) {
  console.log(y[m]);
}

// string practice
let h = 'bangladesh"';
console.log(h.length);

const sentence = "bangla is a good country";
const word = "hello world";
//turnery operator
console.log(sentence.includes(word));
console.log(
  `The word "${word}" ${
    sentence.includes(word) ? "is" : "is not"
  } in the sentence`
);

let str = "this is a small amount of money 1000";
let result = str.slice("this is a small amount of money".length); //31
console.log(result);

//alternative way
let parts = str.split(" ");
let lastWord = parts[parts.length - 1];

console.log(lastWord); // 1000

//string cannot change it is immutable
