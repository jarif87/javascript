message = "good_global";

function hello_world() {
  message = "good";
  {
    let message = " bangladesh";
    console.log("hello " + message);
  }
  //   console.log(message);
  let f = function hello_world_2() {
    console.log("there are two function 1 inside another");
  };
  return f;
}
g = hello_world();
g();
