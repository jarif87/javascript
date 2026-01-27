class ClassData {
  constructor(name = "") {
    this.name = name;
  }

  fill(name) {
    this.name = name;
  }
  submit() {
    alert(this.name + " Form Submitted");
  }
  cancel() {
    const displayName = this.name ? this.name : "Unnamed Form";
    alert(`${displayName}-This form is Cancelled`);
  }
}

const formA = new ClassData();
formA.fill("name is khan", 1234);
const formB = new ClassData("Form B");
formB.fill("rakib", 420);

formA.submit();
formB.submit();
formB.cancel();
