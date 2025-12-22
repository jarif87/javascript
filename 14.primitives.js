let f = Symbol("hello world");
console.log(f);
console.log(typeof f);
console.log("#".repeat(100));

let a = "bangla";
let b = "english";
let c = 30;
let total = (a = b + c);
console.log(total);
console.log("#".repeat(100));
console.log(typeof total);

const object = { name: "hello", address: "Dhaka", mobile: "0182736" };
object["name"] = "hello_bangladesh";
console.log(object["name"]);

const dict = {
  Resilient:
    "Able to recover quickly from difficulties; strong in tough situations.",
  Curious: "Eager to learn or know something new.",
  Honest: "Truthful and sincere; not lying or cheating.",
  Brilliant: "Very bright or very intelligent; excellent",
  Peaceful: "Calm and free from disturbance or conflict.",
};
console.log(dict.Honest);
