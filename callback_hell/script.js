function loadscript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = function () {
    console.log(`Script with src ${src} has been loaded.`);
    callback();
  };

  script.onerror = function () {
    console.log(`Error loading script with src ${src}.`);
  };
  document.head.appendChild(script);
}

function hello(error, src) {
  if (error) {
    console.log(error);
    return;
  }
  alert(`Hello from ${src}`);
}

loadscript(
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js",
  function hell_bangladesh(error, src) {
    if (error) {
      console.log(error);
      sendemergencyalert();
      return;
    }

    loadscript(
      "https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js",
      function hell_india(error, src) {
        if (error) {
          console.log(error);
          sendemergencyalert();
          return;
        }
        loadscript(
          "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js",
          function hell_pakistan(error, src) {
            if (error) {
              console.log(error);
              sendemergencyalert();
              return;
            }

            loadscript(
              "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js",
              function hell_srilanka(error, src) {
                if (error) {
                  console.log(error);
                  sendemergencyalert();
                  return;
                }
                alert("All scripts loaded successfully!");
                console.log("All libraries are ready to use.");
              }
            );
          }
        );
      }
    );
  }
);

function sendemergencyalert() {
  alert(
    "An error occurred while loading scripts. Please check the console for details."
  );
}
