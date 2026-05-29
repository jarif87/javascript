// let a = [1, 2, 3, 4, 5];
// for (let i = 0; i < a.length; i++) {
//   console.log("This would log:", a[i]);
// }
// console.log("#".repeat(100));
// a[0] = 10;
// for (let i = 0; i < a.length; i++) {
//   console.log("This would log:", a[i]);
// }

a = [
  1,
  2,
  3,
  4,
  5,
  true,
  "string",
  { name: "object" },
  [1, 2, 3],
  { name: "pen", price: 10, color: "blue", isNew: true },
];

// for (let i = 0; i < a.length; i++) {
//   console.log("This would log:", a[i]);
// }

// a.push("new item");

// for (let i = 0; i < a.length; i++) {
//   console.log("This would log:", a[i]);
// }

// a.splice(0, 1);
// console.log("#".repeat(100));

// for (let i = 0; i < a.length; i++) {
//   console.log("This would log:", a[i]);
// }

// let sum = 10;
// while (sum < 100) {
//   sum += 10;
//   console.log("This would log:", sum);
// }

// console.log("#".repeat(100));
// for (let i = 0; i < 10; i++) {
//   console.log("This would log:", i);
// }

// let randomNumber = 0;
// while (randomNumber < 0.5) {
//   randomNumber = Math.random();
//   console.log("This would log:", randomNumber);
// }

/*
let todoList = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Clean the house", completed: true },
  { id: 3, title: "Pay bills", completed: false },
];

for (let i = 0; i < todoList.length; i++) {
  const todo = todoList[i];
  console.log(
    "This would log:",
    `Todo: ${todo.title}, Completed: ${todo.completed}`,
  );
}

const newTodo = [
  "make_dinner",
  "go_for_a_walk",
  "read_a_book",
  "exercise",
  "learn_javascript",
  "watch_a_movie",
  "call_a_friend",
  "write_a_blog_post",
  "plan_a_trip",
  "organize_a_party",
];

for (let i = 0; i < newTodo.length; i++) {
  const todo = newTodo[i];
  console.log("This would log:", `Todo: ${todo}`);
}
*/

// let num = [1, 2, 3, 4, 5];
// let sum = 0;
// for (let i = 0; i < num.length; i++) {
//   sum += num[i];
// }
// console.log("This would log:", sum);

// const num1 = [1, 2, 3, 4, 5];
const num2 = [6, 7, 8, 9, 10];
// const [first_value1, second_value1, ...rest_values1] = [1, 2, 3, 4, 5];
// const [first_value2, second_value2, ...rest_values2] = [6, 7, 8, 9, 10];

// console.log("This would log:", first_value1, second_value1, rest_values1);
// console.log("This would log:", first_value2, second_value2, rest_values2);
// console.log("This would log first value1 :", first_value1);
// console.log("This would log first value2 :", first_value2);
// console.log("This would log second value1 :", second_value1);
// console.log("This would log second value2 :", second_value2);
// console.log("This would log rest values1 :", rest_values1);
// console.log("This would log rest values2 :", rest_values2);

let num1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let i = 0; i < num1.length; i++) {
  console.log("This would log:", num1[i]);
  if (num1[i] === 5) {
    console.log("This would log: Skipping number 5");
    continue;
  }
  if (num1[i] === 8) {
    console.log("This would log: Stopping the loop at number 8");
    break;
  }
}
