function finally_clause() {
  try {
    let a = 0;
    console.log(hello);
    console.log("Program run Successfully");
    return;
  } catch (error) {
    console.log("this is an error");
    console.log(world);
  } finally {
    console.log("this code run from finally");
  }
}

finally_clause();
console.log("Program End");
