// let a = new Date();
// let h = a.getHours();
// let m = a.getMinutes();
// let s = a.getSeconds();
// let d = a.getDate();

// console.log("Hours: " + h);
// console.log("Minutes: " + m);
// console.log("Seconds: " + s);
// console.log("Date: " + d);

function updateClock() {
  let now = new Date();

  // Format numbers to always have two digits (e.g., 05 instead of 5)
  let h = String(now.getHours()).padStart(2, "0");
  let m = String(now.getMinutes()).padStart(2, "0");
  let s = String(now.getSeconds()).padStart(2, "0");

  // Get formatted date
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let d = now.toLocaleDateString(undefined, options);

  // Update the HTML
  document.getElementById("clock").innerHTML = `${h}:${m}:${s}`;
  document.getElementById("date").innerHTML = d;
}

// Call it once immediately, then every 1000ms (1 second)
updateClock();
setInterval(updateClock, 1000);
