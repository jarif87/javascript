/*
class ClassData {
  constructor(name = "", trainno = null, address, time) {
    console.log("Constructor Called");
    this.name = name;
    this.trainno = trainno;
    this.address = address;
    this.time = time;
  }
  preview() {
    alert(
      this.name +
        ": Your form is for train Number: " +
        this.trainno +
        " and your address is: " +
        this.address +
        " : Your Time is: " +
        this.time,
    );
  }
  submit() {
    alert(this.name + "  Form Submitted");
  }

  cancel() {
    const displayName = this.name ? this.name : "Unnamed Form";
    alert(`${displayName} - This form is Cancelled` + this.trainno);
    this.trainno = 0;
  }
}

// Usage
const formA = new ClassData("khan", 1234, "Dhaka,bangladesh", 10.3);
const formB = new ClassData("rakib", 420, "Mirpur-10,Bangladesh", 12.1);
formA.preview();
formA.submit();
formB.preview();
formB.submit();
formB.cancel();
*/

/*

class Employee {
  login() {
    console.log("Employee has Logged in");
  }
  logout() {
    console.log("Employee Logged Out");
  }
  requestLeaves(leaves) {
    console.log("Employee has request ${leaves} leaves");
  }
}

class Programmer extends Employee {
  requestCoffe(x) {
    console.log("Employee Has requested ${x} Coffes");
  }

  requestLeaves(leaves) {
    super.requestLeaves();
    console.log("Employee has request ${leaves+1} leaves one Extra guranted");
  }
}

// let e = new Employee();
// e.login();
// e.requestLeaves();

let f = new Programmer();
f.login();
f.requestLeaves();
*/

class Employee {
  constructor(name) {
    console.log("Employee Constructor is Here");
    this.name = name;
  }
  login() {
    console.log("Employee has Logged in");
  }
  logout() {
    console.log("Employee Logged Out");
  }
  requestLeaves(leaves) {
    console.log("Employee has request ${leaves} leaves");
  }
}

class Programmer extends Employee {
  constructor(name) {
    super(name);
    console.log(this.name + " -- Programmers Constructor is Here");
    this.name = name;
  }
  requestCoffe(x) {
    console.log("Employee Has requested ${x} Coffes");
  }

  requestLeaves(leaves) {
    super.requestLeaves();
    console.log("Employee has request ${leaves+1} leaves one Extra guranted");
  }
}

// let e = new Employee();
// e.login();
// e.requestLeaves();

let f = new Programmer("Snowden");
f.login();
f.requestLeaves();
