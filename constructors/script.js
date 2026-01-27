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
