class Animal {
  constructor(name) {
    this.name = Animal.capitalize(name);
  }
  walk() {
    console.log("Animal" + this.name + " is walking");
  }
  static capitalize() {
    return (
      this.name.charAt(0).toUpperCase() + this.name.substr(1, this.name.length)
    );
  }
}

let j = new Animal(" Tiger");
j.walk();
