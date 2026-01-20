async function getTodo(id) {
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    option,
  );
  const data = await response.json();
  return data;
}

async function createTodo() {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "hello",
      body: "i aM from bangladesh",
      userId: 1,
    }),
  };

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
    option,
  );
  const data = await response.json();
  return data;
}

async function mainFunction() {
  try {
    const todo = await getTodo(1);
    console.log("Got todo:", todo);

    const newTodo = await createTodo();
    console.log("Created todo:", newTodo);
  } catch (err) {
    console.error("Error:", err);
  }
}

mainFunction();
