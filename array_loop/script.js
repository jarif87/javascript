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
