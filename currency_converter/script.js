const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const fromAmount = document.getElementById("from-amount");
const toAmount = document.getElementById("to-amount");
const rateInfo = document.getElementById("rate-info");
const swapBtn = document.getElementById("swap");
const themeToggle = document.getElementById("theme-toggle");
const addFavoriteBtn = document.getElementById("add-favorite");

let chart;
let favorites = JSON.parse(localStorage.getItem("currencyFavorites")) || [];

// Currency Full Names
const currencyNames = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  INR: "Indian Rupee",
  BDT: "Bangladeshi Taka",
  JPY: "Japanese Yen",
  CNY: "Chinese Yuan",
  RUB: "Russian Ruble",
  SAR: "Saudi Riyal",
  AED: "UAE Dirham",
  CAD: "Canadian Dollar",
  AUD: "Australian Dollar",
  CHF: "Swiss Franc",
  TRY: "Turkish Lira",
  // Add more if needed
};

const API_BASE =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

async function loadCurrencies() {
  try {
    const res = await fetch(`${API_BASE}/usd.json`);
    const data = await res.json();
    const currencies = Object.keys(data.usd).sort();

    currencies.forEach((code) => {
      const opt1 = new Option(code, code);
      const opt2 = new Option(code, code);
      fromCurrency.add(opt1);
      toCurrency.add(opt2);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "BDT";
    convert();
    renderFavorites();
  } catch (err) {
    console.error(err);
  }
}

async function convert() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = parseFloat(fromAmount.value) || 0;

  if (!from || !to) return;

  try {
    const res = await fetch(`${API_BASE}/${from.toLowerCase()}.json`);
    const data = await res.json();
    const rate = data[from.toLowerCase()][to.toLowerCase()];

    toAmount.value = (amount * rate).toFixed(4);
    rateInfo.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;

    loadHistoricalData(from, to);
  } catch (err) {
    rateInfo.textContent = "❌ Error fetching rates";
  }
}

function getCurrencyName(code) {
  return currencyNames[code] || code;
}

function addToFavorites() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const pair = `${from}-${to}`;

  if (favorites.includes(pair)) {
    alert("This pair is already in favorites!");
    return;
  }

  favorites.unshift(pair);
  if (favorites.length > 12) favorites.pop();

  localStorage.setItem("currencyFavorites", JSON.stringify(favorites));
  renderFavorites();

  addFavoriteBtn.textContent = "✅ Added!";
  setTimeout(() => (addFavoriteBtn.textContent = "★ Add to Favorites"), 1500);
}

function renderFavorites() {
  const container = document.getElementById("favorites-list");
  container.innerHTML = "";

  favorites.forEach((pair) => {
    const [from, to] = pair.split("-");
    const fromName = getCurrencyName(from);
    const toName = getCurrencyName(to);

    const div = document.createElement("div");
    div.className = "favorite-item";
    div.innerHTML = `
      <span><strong>${from}</strong> ${fromName} → <strong>${to}</strong> ${toName}</span>
      <button class="remove-fav" data-pair="${pair}">✕</button>
    `;

    div.addEventListener("click", (e) => {
      if (!e.target.classList.contains("remove-fav")) {
        fromCurrency.value = from;
        toCurrency.value = to;
        convert();
      }
    });

    container.appendChild(div);
  });
}

// Remove favorite
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-fav")) {
    const pair = e.target.dataset.pair;
    favorites = favorites.filter((p) => p !== pair);
    localStorage.setItem("currencyFavorites", JSON.stringify(favorites));
    renderFavorites();
  }
});

async function loadHistoricalData(base, target) {
  const labels = ["6d ago", "5d", "4d", "3d", "2d", "Yesterday", "Today"];
  const rates = Array(7)
    .fill(0)
    .map(() => 1 + Math.random() * 0.08);

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("rateChart"), {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: `${base} to ${target}`,
          data: rates,
          borderColor: "#4a6bdf",
          tension: 0.4,
        },
      ],
    },
    options: { responsive: true },
  });
}

// Event Listeners
fromAmount.addEventListener("input", convert);
fromCurrency.addEventListener("change", convert);
toCurrency.addEventListener("change", convert);

swapBtn.addEventListener("click", () => {
  [fromCurrency.value, toCurrency.value] = [
    toCurrency.value,
    fromCurrency.value,
  ];
  convert();
});

addFavoriteBtn.addEventListener("click", addToFavorites);

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "light" : "dark",
  );
  themeToggle.innerHTML = isDark
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});

// Initialize
loadCurrencies();
