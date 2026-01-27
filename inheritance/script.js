class Animal {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
  run() {
    console.log(this.name + "   is running");
  }
  shout() {
    console.log(this.name + "   is shouting");
  }
}

class Donkey extends Animal {
  eatbanana() {
    console.log(this.name + "   is eating Banana");
  }
  hide() {
    console.log(this.name + "   is hiding");
  }
}

let a = new Animal("tiger", "darkorange");
let b = new Donkey("lion", "yellow");

a.shout();
b.eatbanana();
b.hide();
