const hello = (name) => {
  console.log("hello worlds " + name);
};

const a = {
  name: "shakib",
  role: "crickter",
  experience: 20,
  show() {
    console.log(`this name is ${this.name}`);
  },
};
// hello("jackie chan");

// console.log(x.name, x.experience, x.role);
a.show();
