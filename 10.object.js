var info = {
  name: "shakib",
  address: "dhaka",
  country: "bangladesh",
  mobile: "0127647585905",
};
console.log(info);
console.log(info.address);
console.log(info.mobile);

function helloinfo(name, address, country, mobile) {
  this.name = name;
  this.address = address;
  this.country = country;
  this.mobile = mobile;
}

var object = new helloinfo("rakib", "dhaka", "bangladesh", "0198647");
console.log(object);

function helloinfo(name, address, country, mobile) {
  this.name = name;
  this.address = address;
  this.country = country;
  this.mobile = mobile;
  this.ShowMe = function () {
    console.log(this.name);
    console.log(this.address);
    console.log(this.country);
    console.log(this.mobile);
  };
}

var object = new helloinfo("rakib", "dhaka", "bangladesh", "0198647");
object.ShowMe();
