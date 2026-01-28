class Lion {
  constructor(name) {
    this._name = name;
  }
  fly() {
    console.log("The Lion King is Running fast");
  }
  get name() {
    return this._name;
  }
  set name(newName) {
    this._name = newName;
  }
}

class rabbit extends Lion {
  eatCarrot() {
    console.log("Eating carrot");
  }
}

// let a = new Lion("thomas");
// a.fly();
// console.log(a.name);
// a.name = "AlVi";
// console.log(a.name);

let a = new rabbit("thomas");
a.fly();
console.log(a.name);
a.name = "AlVi";
console.log(a.name);
