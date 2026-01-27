let a = { country: "bangladesh", city: "Dhaka" };
console.log(a);

let p = {
  run: () => {
    alert("hello world");
  },
};

p.__proto__ = { name: "hell_bangladesh" };
a.__proto__ = p;
a.run();
console.log(a.name);
