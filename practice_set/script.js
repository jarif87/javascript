document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("cardContainer");
  const numberToCheck = 42;
  const url = `https://api.isevenapi.xyz/api/iseven/${numberToCheck}/`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      cardContainer.innerHTML = "";

      const col = document.createElement("div");
      col.className = "col-md-6 mx-auto";

      const isEven = data.iseven;
      const themeColor = isEven ? "success" : "danger";

      col.innerHTML = `
        <div class="card h-100 shadow-sm border-0">
          <div class="bg-${themeColor} py-4 text-white text-center rounded-top">
            <h1 class="mb-0"># ${numberToCheck}</h1>
          </div>
          <div class="card-body text-center">
            <h5 class="card-title text-muted">Analysis Result</h5>
            <h2 class="display-5 fw-bold text-${themeColor}">
              ${isEven ? "EVEN" : "ODD"}
            </h2>
            <p class="card-text small mt-3 p-2 bg-light rounded">
              ${data.ad}
            </p>
          </div>
          <div class="card-footer bg-white border-0 pb-3">
            <a href="https://isevenapi.xyz/" class="btn btn-outline-${themeColor} w-100" target="_blank">
              View API Docs
            </a>
          </div>
        </div>`;

      cardContainer.appendChild(col);
    })
    .catch((error) => {
      cardContainer.innerHTML = `
        <div class="col-12 text-center">
          <div class="alert alert-danger">
            <strong>API Connection Error:</strong><br>
            ${error.message}
          </div>
        </div>`;
    });
});
